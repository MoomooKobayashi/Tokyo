import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AppData, Day, Event, TransportDetail, generateId, Reservation, PackingItem, Expense, RestaurantOption } from './types';
import { DEFAULT_DATA, LOCATIONS } from './constants';
import ItineraryView from './components/ItineraryView';
import EventModal from './components/EventModal';
import DetailModal from './components/DetailModal';
import TransportModal from './components/TransportModal';
import MealModal from './components/MealModal';

// Simplified internal components for Views
import { ReservationModal, InfoView } from './components/InfoViewHelpers';
import { PackingListView } from './components/PackingHelpers';
import { MoneyView } from './components/MoneyHelpers';

const App = () => {
    const STORAGE_KEY = 'tokyoTripFinal_V7_Bundle';
    const [view, setView] = useState<'itinerary' | 'info' | 'money' | 'packing'>('itinerary');
    const [data, setData] = useState<AppData>(DEFAULT_DATA);
    const [currentDayIdx, setCurrentDayIdx] = useState(0);
    const [currency, setCurrency] = useState<'JPY' | 'TWD'>('JPY');
    const [liveWeather, setLiveWeather] = useState<{ temp: number, code: number } | null>(null);

    // Modal States
    const [detailEvent, setDetailEvent] = useState<{ dayIdx: number; event: Event } | null>(null);
    const [editingEvent, setEditingEvent] = useState<{ dayIdx: number; eventId?: string } | null>(null);
    const [editingTransport, setEditingTransport] = useState<{ dayIdx: number; eventId: string } | null>(null);
    const [editingMeal, setEditingMeal] = useState<{ dayIdx: number; type: 'breakfast' | 'lunch' | 'dinner'; option?: RestaurantOption } | null>(null);
    
    // Other Views State
    const [editingReservation, setEditingReservation] = useState<{ id?: string, initial?: Reservation } | null>(null);

    // --- Persistence ---
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Simple migration logic
                if (parsed.days) {
                    parsed.days.forEach((day: Day) => {
                        if (!day.mealOptions) day.mealOptions = { breakfast: [], lunch: [], dinner: [] };
                        day.events.forEach((ev: Event) => {
                             if (!ev.subItems) ev.subItems = [];
                        });
                    });
                }
                setData({ ...DEFAULT_DATA, ...parsed });
            } catch (e) {
                console.error("Data load failed", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    // --- Weather ---
    useEffect(() => {
        const currentDay = data.days[currentDayIdx];
        if (currentDay && currentDay.locationKey) {
            const loc = LOCATIONS[currentDay.locationKey];
            if (loc) {
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true`)
                    .then(res => res.json())
                    .then(d => {
                         if(d.current_weather) {
                             setLiveWeather({ temp: Math.round(d.current_weather.temperature), code: d.current_weather.weathercode });
                         }
                    })
                    .catch(e => console.error(e));
            }
        }
    }, [currentDayIdx, data.days]);

    const getWeatherIcon = (code: number) => {
        if (code === 0) return 'fa-sun';
        if (code >= 1 && code <= 3) return 'fa-cloud-sun';
        if (code >= 45 && code <= 48) return 'fa-smog';
        if (code >= 51 && code <= 67) return 'fa-cloud-rain';
        if (code >= 71 && code <= 77) return 'fa-snowflake';
        if (code >= 95) return 'fa-bolt';
        return 'fa-cloud';
    };

    // --- Handlers: Events ---
    const handleSaveEvent = (eventData: Partial<Event>) => {
        if (!editingEvent) return;
        const newData = { ...data };
        if (editingEvent.eventId) {
            const dayEvents = newData.days[editingEvent.dayIdx].events;
            const idx = dayEvents.findIndex(e => e.id === editingEvent.eventId);
            if (idx >= 0) dayEvents[idx] = { ...dayEvents[idx], ...eventData } as Event;
        } else {
            newData.days[editingEvent.dayIdx].events.push({ ...eventData, id: generateId() } as Event);
            newData.days[editingEvent.dayIdx].events.sort((a, b) => a.time.localeCompare(b.time));
        }
        setData(newData);
        setEditingEvent(null);
        setDetailEvent(null);
    };

    const handleDeleteEvent = () => {
        if (!editingEvent?.eventId) return;
        Swal.fire({
            title: '確定刪除?', icon: 'warning', showCancelButton: true,
            confirmButtonText: '刪除', cancelButtonText: '取消', confirmButtonColor: '#ef4444'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = { ...data };
                newData.days[editingEvent.dayIdx].events = newData.days[editingEvent.dayIdx].events.filter(e => e.id !== editingEvent.eventId);
                setData(newData);
                setEditingEvent(null);
            }
        });
    };

    // --- Handlers: Transport ---
    const handleSaveTransport = (transportData: TransportDetail | undefined) => {
        if (!editingTransport) return;
        const newData = { ...data };
        const dayEvents = newData.days[editingTransport.dayIdx].events;
        const idx = dayEvents.findIndex(e => e.id === editingTransport.eventId);
        if (idx >= 0) {
            dayEvents[idx].transitToNext = transportData;
        }
        setData(newData);
        setEditingTransport(null);
    };

    // --- Handlers: Meals ---
    const handleSaveMeal = (mealData: RestaurantOption) => {
        if (!editingMeal) return;
        const newData = { ...data };
        const dayMeals = newData.days[editingMeal.dayIdx].mealOptions!;
        const list = dayMeals[editingMeal.type];
        
        if (editingMeal.option) {
            // Edit
            const idx = list.findIndex(m => m.id === editingMeal.option!.id);
            if (idx >= 0) list[idx] = mealData;
        } else {
            // Add
            list.push(mealData);
        }
        setData(newData);
        setEditingMeal(null);
    };

    const handleDeleteMeal = () => {
        if (!editingMeal?.option) return;
         Swal.fire({
            title: '確定刪除?', icon: 'warning', showCancelButton: true,
            confirmButtonText: '刪除', cancelButtonText: '取消', confirmButtonColor: '#ef4444'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = { ...data };
                const list = newData.days[editingMeal.dayIdx].mealOptions![editingMeal.type];
                newData.days[editingMeal.dayIdx].mealOptions![editingMeal.type] = list.filter(m => m.id !== editingMeal.option!.id);
                setData(newData);
                setEditingMeal(null);
            }
        });
    }

    // --- Handlers: Reservations (Info View) ---
    const handleSaveReservation = (resData: any) => {
        const newData = { ...data };
        if (editingReservation?.id) {
            const idx = newData.reservations.findIndex(r => r.id === editingReservation.id);
            if (idx >= 0) newData.reservations[idx] = { ...newData.reservations[idx], ...resData };
        } else {
            newData.reservations.push({ ...resData, id: generateId() });
        }
        setData(newData);
        setEditingReservation(null);
    };

    const handleDeleteReservation = () => {
        if (!editingReservation?.id) return;
        Swal.fire({
            title: '確定刪除?', icon: 'warning', showCancelButton: true,
            confirmButtonText: '刪除', cancelButtonText: '取消', confirmButtonColor: '#ef4444'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = { ...data };
                newData.reservations = newData.reservations.filter(r => r.id !== editingReservation.id);
                setData(newData);
                setEditingReservation(null);
            }
        });
    };

    // --- Handlers: Packing ---
    const handleTogglePacking = (id: string) => {
        const newData = { ...data };
        const item = newData.packingList.find(i => i.id === id);
        if (item) item.checked = !item.checked;
        setData(newData);
    };
    const handleAddPackingItem = (text: string, category: string) => {
        const newData = { ...data };
        newData.packingList.push({ id: generateId(), text, category, checked: false });
        setData(newData);
    };
    const handleDeletePackingItem = (id: string) => {
        const newData = { ...data };
        newData.packingList = newData.packingList.filter(i => i.id !== id);
        setData(newData);
    };

    // --- Handlers: Money ---
    const handleAddExpense = async () => {
         const { value: formValues } = await Swal.fire({
            title: '<span class="text-charcoal font-bold">新增支出 (JPY)</span>',
            html: `
                <div class="space-y-4 text-left">
                    <input id="swal-item" class="w-full p-2 border-b border-subtle outline-none font-medium" placeholder="項目 (如: 晚餐)">
                    <input id="swal-amount" type="number" class="w-full p-2 border-b border-subtle outline-none font-mono font-bold" placeholder="金額 (日幣)">
                    <div class="pt-2">
                         <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">先付者</label>
                        <select id="swal-payer" class="w-full p-2 border-b border-subtle outline-none bg-transparent font-medium mt-1">
                            ${data.members.map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `,
            focusConfirm: false, showCancelButton: true,
            confirmButtonText: '新增', cancelButtonText: '取消',
            confirmButtonColor: '#6a7f60',
            preConfirm: () => {
                const item = (document.getElementById('swal-item') as HTMLInputElement).value;
                const amount = (document.getElementById('swal-amount') as HTMLInputElement).value;
                const payer = (document.getElementById('swal-payer') as HTMLSelectElement).value;
                return [item, amount, payer];
            }
        });

        if (formValues) {
            const [title, amount, payer] = formValues;
            if (!title || !amount) return;
            const newExpense: Expense = {
                id: generateId(), title, amount: parseInt(amount), payer, involved: data.members, date: new Date().toISOString()
            };
            setData({ ...data, expenses: [...data.expenses, newExpense] });
        }
    };

    const handleDeleteExpense = (id: string) => {
        setData({ ...data, expenses: data.expenses.filter(e => e.id !== id) });
    };

    return (
        <div className="min-h-screen bg-rice font-sans text-charcoal">
            {/* Header */}
            <header className="fixed top-0 w-full z-40 bg-rice/95 backdrop-blur-md transition-all duration-300 pt-safe border-b border-subtle">
                <div className="flex justify-between items-end px-6 py-4 pb-3">
                    <div>
                        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase mb-1">Tokyo Trip</p>
                        <h1 className="text-2xl font-bold tracking-wide text-charcoal">東京七日</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {liveWeather ? (
                            <div className="text-sm font-medium text-slate-500 flex items-center bg-slate-100 px-3 py-1 rounded-full">
                                <i className={`fa-solid ${getWeatherIcon(liveWeather.code)} text-slate-400 mr-2`}></i>
                                <span>{data.days[currentDayIdx].locationKey === 'tokyo' ? '東京' : LOCATIONS[data.days[currentDayIdx].locationKey].name} {liveWeather.temp}°C</span>
                            </div>
                        ) : (
                            <div className="text-sm font-medium text-slate-300"><i className="fa-solid fa-spinner fa-spin"></i></div>
                        )}
                        <button 
                            onClick={() => setCurrency(c => c === 'JPY' ? 'TWD' : 'JPY')} 
                            className="text-xs border border-subtle text-slate-500 px-3 py-1.5 rounded-full font-bold active:bg-slate-100 transition-colors tracking-wider"
                        >
                            {currency}
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-24 max-w-lg mx-auto">
                {view === 'itinerary' && (
                    <ItineraryView 
                        days={data.days} 
                        currentDayIdx={currentDayIdx} 
                        onDaySelect={setCurrentDayIdx}
                        onEventClick={(dIdx, ev) => setDetailEvent({ dayIdx: dIdx, event: ev })}
                        onTransportClick={(dIdx, eId) => setEditingTransport({ dayIdx: dIdx, eventId: eId })}
                        onAddEvent={(dIdx) => setEditingEvent({ dayIdx: dIdx })}
                        onAddMeal={(dIdx, type) => setEditingMeal({ dayIdx: dIdx, type })}
                        onEditMeal={(dIdx, type, option) => setEditingMeal({ dayIdx: dIdx, type, option })}
                    />
                )}
                {view === 'info' && (
                    <InfoView 
                        reservations={data.reservations} 
                        onEdit={(res) => setEditingReservation({ id: res.id, initial: res })}
                        onAdd={() => setEditingReservation({})}
                    />
                )}
                {view === 'money' && (
                    <MoneyView 
                        expenses={data.expenses} 
                        members={data.members} 
                        currencyRate={data.currencyRate}
                        currentCurrency={currency}
                        onDelete={handleDeleteExpense}
                    />
                )}
                {view === 'packing' && (
                    <PackingListView 
                        items={data.packingList} 
                        onToggle={handleTogglePacking} 
                        onAdd={handleAddPackingItem}
                        onDelete={handleDeletePackingItem}
                    />
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full bg-rice/95 backdrop-blur-md border-t border-subtle pb-safe z-30 max-w-lg mx-auto left-0 right-0">
                <div className="flex justify-around items-center h-[60px]">
                    <button onClick={() => setView('itinerary')} className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${view === 'itinerary' ? 'text-matcha' : 'text-slate-400'}`}>
                        <i className="fa-solid fa-map text-xl mb-0.5"></i>
                        <span className="text-[9px] font-bold tracking-wider">行程</span>
                    </button>
                    <button onClick={() => setView('packing')} className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${view === 'packing' ? 'text-matcha' : 'text-slate-400'}`}>
                        <i className="fa-solid fa-suitcase text-xl mb-0.5"></i>
                        <span className="text-[9px] font-bold tracking-wider">行李</span>
                    </button>
                    <button onClick={() => setView('info')} className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${view === 'info' ? 'text-matcha' : 'text-slate-400'}`}>
                        <i className="fa-solid fa-book text-xl mb-0.5"></i>
                        <span className="text-[9px] font-bold tracking-wider">資訊</span>
                    </button>
                    <button onClick={() => setView('money')} className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${view === 'money' ? 'text-matcha' : 'text-slate-400'}`}>
                        <i className="fa-solid fa-coins text-xl mb-0.5"></i>
                        <span className="text-[9px] font-bold tracking-wider">分帳</span>
                    </button>
                </div>
            </nav>

            {/* FAB */}
             {view === 'itinerary' && (
                <button 
                    onClick={() => setEditingEvent({ dayIdx: currentDayIdx })}
                    className="fixed bottom-24 right-6 w-14 h-14 rounded-2xl bg-matcha shadow-xl shadow-matcha/40 flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
                >
                    <i className="fa-solid fa-plus text-xl"></i>
                </button>
            )}
            {view === 'money' && (
                <button 
                    onClick={handleAddExpense}
                    className="fixed bottom-24 right-6 w-14 h-14 rounded-2xl bg-matcha shadow-xl shadow-matcha/40 flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
                >
                    <i className="fa-solid fa-plus text-xl"></i>
                </button>
            )}

            {/* Modals */}
            <EventModal 
                isOpen={!!editingEvent} 
                initialData={editingEvent?.eventId ? data.days[editingEvent.dayIdx].events.find(e => e.id === editingEvent.eventId) : undefined}
                onClose={() => setEditingEvent(null)}
                onSave={handleSaveEvent}
                onDelete={editingEvent?.eventId ? handleDeleteEvent : undefined}
            />

            <DetailModal 
                event={detailEvent ? detailEvent.event : null}
                onClose={() => setDetailEvent(null)}
                onEdit={() => {
                   if(detailEvent) {
                       setEditingEvent({ dayIdx: detailEvent.dayIdx, eventId: detailEvent.event.id });
                       setDetailEvent(null);
                   }
                }}
            />

            <TransportModal 
                isOpen={!!editingTransport}
                initialData={editingTransport ? data.days[editingTransport.dayIdx].events.find(e => e.id === editingTransport.eventId)?.transitToNext : undefined}
                onClose={() => setEditingTransport(null)}
                onSave={handleSaveTransport}
            />

            <ReservationModal
                isOpen={!!editingReservation}
                initialData={editingReservation?.initial}
                onClose={() => setEditingReservation(null)}
                onSave={handleSaveReservation}
                onDelete={editingReservation?.id ? handleDeleteReservation : undefined}
            />

            {editingMeal && (
                <MealModal 
                    isOpen={true}
                    type={editingMeal.type}
                    initialData={editingMeal.option}
                    onClose={() => setEditingMeal(null)}
                    onSave={handleSaveMeal}
                    onDelete={editingMeal.option ? handleDeleteMeal : undefined}
                />
            )}
        </div>
    );
};

export default App;