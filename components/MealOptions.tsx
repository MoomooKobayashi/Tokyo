import React, { useState } from 'react';
import { MealPlan, RestaurantOption } from '../types';

interface MealOptionsProps {
    mealData?: MealPlan;
    onAdd: (type: 'breakfast' | 'lunch' | 'dinner') => void;
    onEdit: (type: 'breakfast' | 'lunch' | 'dinner', option: RestaurantOption) => void;
}

const RestaurantCard: React.FC<{ item: RestaurantOption, onClick: () => void }> = ({ item, onClick }) => (
    <div 
        onClick={onClick}
        className="min-w-[220px] bg-white rounded-xl p-3 border border-subtle shadow-sm flex flex-col snap-start active:scale-95 transition-transform cursor-pointer relative group"
    >
        <div className="absolute top-2 right-2 text-slate-300 group-hover:text-matcha transition-colors">
            <i className="fa-solid fa-pen-to-square text-xs"></i>
        </div>
        <div className="flex justify-between items-start mb-2 pr-4">
            <h4 className="font-bold text-charcoal text-sm line-clamp-1">{item.name}</h4>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.priceLevel}</span>
        </div>
        <div className="text-xs text-slate-500 mb-1">
            <span className="text-orange-400 font-bold">★ 推:</span> {item.dish}
        </div>
        {item.note && <p className="text-[10px] text-slate-400 line-clamp-2 mb-3 bg-slate-50 p-1 rounded">{item.note}</p>}
        <div className="mt-auto flex gap-2">
            {item.locationUrl ? (
                <a href={item.locationUrl} onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" className="flex-1 py-1.5 text-center bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600 transition-colors">
                    <i className="fa-solid fa-map-location-dot mr-1"></i> 地圖
                </a>
            ) : <div className="flex-1"></div>}
            {item.url ? (
                <a href={item.url} onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" className="flex-1 py-1.5 text-center bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600 transition-colors">
                    <i className="fa-brands fa-google mr-1"></i> 搜
                </a>
            ) : <div className="flex-1"></div>}
        </div>
    </div>
);

const AddCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div 
        onClick={onClick}
        className="min-w-[50px] flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-matcha hover:bg-matcha/5 transition-colors active:scale-95"
    >
        <i className="fa-solid fa-plus text-slate-400"></i>
    </div>
);

const MealOptions: React.FC<MealOptionsProps> = ({ mealData, onAdd, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!mealData) return null;

    const hasData = mealData.breakfast.length > 0 || mealData.lunch.length > 0 || mealData.dinner.length > 0;

    return (
        <div className="mb-8 px-1">
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white border border-orange-100 p-3 rounded-xl shadow-sm mb-4 active:bg-orange-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <i className="fa-solid fa-utensils text-sm"></i>
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-charcoal">美食備案 & 推薦</div>
                        <div className="text-[10px] text-slate-400">
                            {isOpen ? '點擊收合' : (hasData ? '點擊展開查看周邊餐廳' : '點擊新增餐廳口袋名單')}
                        </div>
                    </div>
                </div>
                <i className={`fa-solid fa-chevron-down text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isOpen && (
                <div className="space-y-6 animate-fade-in pl-2">
                    {/* Breakfast */}
                    <div>
                        <div className="flex items-center justify-between mb-2 pr-2">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">早餐</h5>
                        </div>
                        <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar snap-x min-h-[100px]">
                            {mealData.breakfast.map(m => (
                                <RestaurantCard key={m.id} item={m} onClick={() => onEdit('breakfast', m)} />
                            ))}
                            <AddCard onClick={() => onAdd('breakfast')} />
                        </div>
                    </div>

                    {/* Lunch */}
                    <div>
                         <div className="flex items-center justify-between mb-2 pr-2">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">午餐</h5>
                        </div>
                        <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar snap-x min-h-[100px]">
                            {mealData.lunch.map(m => (
                                <RestaurantCard key={m.id} item={m} onClick={() => onEdit('lunch', m)} />
                            ))}
                            <AddCard onClick={() => onAdd('lunch')} />
                        </div>
                    </div>

                    {/* Dinner */}
                    <div>
                         <div className="flex items-center justify-between mb-2 pr-2">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">晚餐</h5>
                        </div>
                        <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar snap-x min-h-[100px]">
                            {mealData.dinner.map(m => (
                                <RestaurantCard key={m.id} item={m} onClick={() => onEdit('dinner', m)} />
                            ))}
                            <AddCard onClick={() => onAdd('dinner')} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealOptions;