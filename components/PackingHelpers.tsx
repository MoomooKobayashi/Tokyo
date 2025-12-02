import React, { useState } from 'react';
import { PackingItem } from '../types';

export const PackingListView: React.FC<{ items: PackingItem[], onToggle: (id: string) => void, onAdd: (t: string, c: string) => void, onDelete: (id: string) => void }> = ({ items, onToggle, onAdd, onDelete }) => {
    const [newItemText, setNewItemText] = useState('');
    
    const grouped = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, PackingItem[]>);

    const progress = items.length > 0 ? Math.round((items.filter(i => i.checked).length / items.length) * 100) : 0;

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemText.trim()) {
            onAdd(newItemText, '自訂');
            setNewItemText('');
        }
    };

    return (
        <div className="px-6 pb-32 pt-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-subtle mb-8">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-lg font-bold text-charcoal">行李清單</h2>
                    <span className="text-2xl font-mono font-bold text-matcha">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-matcha transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <form onSubmit={handleQuickAdd} className="mb-8 relative">
                <input 
                    type="text" 
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="新增物品..."
                    className="w-full bg-rice border border-subtle rounded-xl py-3 pl-4 pr-12 focus:border-matcha focus:bg-white transition-all outline-none"
                />
                <button type="submit" className="absolute right-2 top-2 w-8 h-8 bg-matcha text-white rounded-lg flex items-center justify-center active:scale-95 transition-transform">
                    <i className="fa-solid fa-plus text-xs"></i>
                </button>
            </form>

            <div className="space-y-8">
                {Object.entries(grouped).map(([category, groupItems]) => (
                    <div key={category}>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">{category}</h3>
                        <div className="bg-white rounded-2xl overflow-hidden border border-subtle divide-y divide-subtle">
                            {groupItems.map(item => (
                                <div 
                                    key={item.id} 
                                    className="p-4 flex items-center group relative"
                                >
                                    <div 
                                        className="flex-1 flex items-center cursor-pointer"
                                        onClick={() => onToggle(item.id)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors flex-shrink-0 ${item.checked ? 'bg-matcha border-matcha' : 'border-slate-300'}`}>
                                            {item.checked && <i className="fa-solid fa-check text-white text-xs"></i>}
                                        </div>
                                        <span className={`flex-1 font-medium transition-opacity ${item.checked ? 'text-slate-400 line-through opacity-70' : 'text-charcoal'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => onDelete(item.id)}
                                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};