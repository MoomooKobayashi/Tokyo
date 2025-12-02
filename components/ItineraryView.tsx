import React, { useEffect, useRef } from 'react';
import { Day, Event, RestaurantOption } from '../types';
import EventCard from './EventCard';
import TransportConnector from './TransportConnector';
import MealOptions from './MealOptions';

interface ItineraryViewProps {
    days: Day[];
    currentDayIdx: number;
    onDaySelect: (idx: number) => void;
    onEventClick: (dayIdx: number, event: Event) => void;
    onTransportClick: (dayIdx: number, eventId: string) => void;
    onAddEvent: (dayIdx: number) => void;
    // Meal Handlers
    onAddMeal: (dayIdx: number, type: 'breakfast' | 'lunch' | 'dinner') => void;
    onEditMeal: (dayIdx: number, type: 'breakfast' | 'lunch' | 'dinner', option: RestaurantOption) => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ 
    days, currentDayIdx, onDaySelect, onEventClick, onTransportClick, onAddEvent,
    onAddMeal, onEditMeal
}) => {
    
    // Use a ref to track if the scroll is triggered by a click to avoid "fighting"
    const isManualScroll = useRef(false);

    // Scroll Spy Effect
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (isManualScroll.current) return;

            // Find the element that is most visible in the viewport
            // We use a threshold of 0.3 meaning 30% visibility
            const visibleDay = entries.find(e => e.isIntersecting);
            
            if (visibleDay) {
                const id = visibleDay.target.id;
                const idx = parseInt(id.replace('day-', ''));
                if (!isNaN(idx) && idx !== currentDayIdx) {
                    // Update the state but don't scroll again
                    onDaySelect(idx); 
                }
            }
        }, {
            root: null,
            rootMargin: '-40% 0px -50% 0px', // Trigger when element is near center of screen
            threshold: 0
        });

        days.forEach((_, idx) => {
            const el = document.getElementById(`day-${idx}`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [days, currentDayIdx, onDaySelect]);

    const handleDayClick = (idx: number) => {
        isManualScroll.current = true;
        onDaySelect(idx);
        const el = document.getElementById(`day-${idx}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Reset manual scroll lock after animation (approx 500ms)
            setTimeout(() => { isManualScroll.current = false; }, 600);
        }
    };

    return (
        <div className="px-6 pb-32">
             {/* Day Tabs */}
            <div className="flex overflow-x-auto gap-5 py-4 hide-scrollbar sticky top-[60px] z-30 bg-rice/95 backdrop-blur -mx-6 px-6 mb-6 transition-all">
                {days.map((day, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleDayClick(idx)} 
                        className={`flex-shrink-0 text-center min-w-[48px] transition-all duration-300 group ${currentDayIdx === idx ? 'text-matcha scale-110' : 'text-slate-400 opacity-70'}`}
                    >
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1">{day.weekday}</div>
                        <div className="text-xl font-bold font-mono relative">
                            {day.date.split('/')[1] || day.date}
                            {currentDayIdx === idx && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-matcha"></div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="space-y-12">
                {days.map((day, dIdx) => (
                    <div id={`day-${dIdx}`} key={dIdx} className="scroll-mt-40 transition-opacity duration-500">
                        {/* Day Header */}
                        <div className="mb-6 px-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">{day.date} · {day.weekday}</span>
                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                    <i className="fa-solid fa-cloud-sun mr-1"></i>
                                    {day.weather}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-charcoal mt-2 tracking-wide">{day.title}</h2>
                        </div>
                        
                        {/* Meal Options Section */}
                        <MealOptions 
                            mealData={day.mealOptions} 
                            onAdd={(type) => onAddMeal(dIdx, type)}
                            onEdit={(type, option) => onEditMeal(dIdx, type, option)}
                        />

                        {/* Timeline */}
                        <div className="relative ml-2.5 pl-8 space-y-0 pb-4">
                            {/* Vertical Line Background */}
                            <div className="absolute left-[10px] top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

                            {day.events.map((ev, eIdx) => (
                                <div key={ev.id}>
                                    <EventCard 
                                        event={ev} 
                                        onClick={() => onEventClick(dIdx, ev)} 
                                    />
                                    
                                    {/* Transport Connector */}
                                    {eIdx < day.events.length - 1 && (
                                        <TransportConnector 
                                            data={ev.transitToNext} 
                                            onClick={() => onTransportClick(dIdx, ev.id)}
                                        />
                                    )}
                                </div>
                            ))}
                            
                            {/* Add Event Button at the end */}
                            <div className="h-8 border-l-2 border-slate-100 ml-[10px]"></div>
                            <button 
                                onClick={() => onAddEvent(dIdx)}
                                className="w-full py-4 border-2 border-dashed border-subtle rounded-xl text-slate-400 text-sm font-bold hover:border-matcha hover:text-matcha transition-colors"
                            >
                                + 新增行程
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItineraryView;