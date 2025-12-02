import React, { useState, useEffect } from 'react';
import { Event, SubItem, generateId } from '../types';

interface EventModalProps {
    isOpen: boolean;
    initialData?: Event;
    onClose: () => void;
    onSave: (data: Partial<Event>) => void;
    onDelete?: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, initialData, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Partial<Event>>({
        time: '09:00',
        type: 'sight',
        title: '',
        loc: '',
        image: '',
        desc: '',
        subItems: []
    });
    
    // SubItem Input State
    const [newSubText, setNewSubText] = useState('');
    const [newSubType, setNewSubType] = useState<'buy' | 'eat' | 'do'>('buy');

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || { 
                time: '09:00', type: 'sight', title: '', loc: '', image: '', desc: '', subItems: [] 
            });
            setNewSubText('');
        }
    }, [isOpen, initialData]);

    const handleAddSubItem = () => {
        if (!newSubText.trim()) return;
        const newItem: SubItem = {
            id: generateId(),
            type: newSubType,
            text: newSubText,
            checked: false
        };
        setFormData(prev => ({ ...prev, subItems: [...(prev.subItems || []), newItem] }));
        setNewSubText('');
    };

    const removeSubItem = (id: string) => {
        setFormData(prev => ({ ...prev, subItems: (prev.subItems || []).filter(i => i.id !== id) }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-x-0 bottom-0 z-10 bg-rice rounded-t-[24px] p-8 pb-safe shadow-2xl transform transition-transform duration-300 h-[90vh] flex flex-col animate-slide-up">
                <div className="w-10 h-1 bg-slate-200/70 rounded-full mx-auto mb-8"></div>
                <h3 className="text-xl font-bold text-charcoal mb-8 tracking-wide">
                    {initialData ? '編輯行程' : '新增行程'}
                </h3>
                
                <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar">
                    {/* Basic Fields */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                           <label className="text-xs uppercase font-bold text-slate-400 block mb-2">時間</label>
                           <input 
                                type="time" 
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="w-full bg-transparent border-b border-subtle py-2 font-mono text-lg focus:border-matcha outline-none transition-colors"
                           />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs uppercase font-bold text-slate-400 block mb-2">類型</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                                className="w-full bg-transparent border-b border-subtle py-2 text-lg focus:border-matcha outline-none"
                            >
                                <option value="sight">📷 景點</option>
                                <option value="food">🍜 美食</option>
                                <option value="transport">🚅 交通</option>
                                <option value="hotel">🏨 住宿</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">標題</label>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="請輸入標題" 
                            className="w-full bg-transparent border-b border-subtle py-2 text-lg font-medium focus:border-matcha outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">地點</label>
                        <input 
                            type="text" 
                            value={formData.loc}
                            onChange={(e) => setFormData({...formData, loc: e.target.value})}
                            placeholder="例如：淺草"
                            className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                        />
                    </div>

                    {/* New Feature: Sub Items (Must Do/Buy) */}
                    <div className="bg-white p-4 rounded-xl border border-subtle">
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-3">子項目 (必吃/必買)</label>
                        <div className="flex gap-2 mb-3">
                             <select 
                                value={newSubType}
                                onChange={(e) => setNewSubType(e.target.value as any)}
                                className="bg-slate-100 rounded-lg text-xs p-2 outline-none"
                            >
                                <option value="buy">🛍️</option>
                                <option value="eat">🍴</option>
                                <option value="do">✨</option>
                            </select>
                            <input 
                                type="text"
                                value={newSubText}
                                onChange={(e) => setNewSubText(e.target.value)}
                                placeholder="新增子項目..."
                                className="flex-1 bg-slate-50 border-b border-subtle px-2 text-sm focus:border-matcha outline-none"
                            />
                            <button onClick={handleAddSubItem} type="button" className="text-matcha font-bold px-2">+</button>
                        </div>
                        <div className="space-y-2">
                            {formData.subItems?.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded">
                                    <span>{item.type === 'buy' ? '🛍️' : item.type === 'eat' ? '🍴' : '✨'} {item.text}</span>
                                    <button type="button" onClick={() => removeSubItem(item.id)} className="text-red-400"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">筆記</label>
                        <textarea 
                            value={formData.desc || ''}
                            onChange={(e) => setFormData({...formData, desc: e.target.value})}
                            rows={3} 
                            placeholder="寫點什麼..." 
                            className="w-full bg-transparent border-b border-subtle py-2 text-base resize-none focus:border-matcha outline-none"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    {initialData && onDelete && (
                        <button 
                            type="button" 
                            onClick={onDelete}
                            className="flex-1 text-red-400 font-bold py-3.5 rounded-2xl border border-subtle active:bg-red-50 transition-colors tracking-wider"
                        >
                            刪除
                        </button>
                    )}
                    <button 
                        type="button" 
                        onClick={() => onSave(formData)}
                        className="flex-[2] bg-matcha text-white font-bold py-3.5 rounded-2xl active:scale-[0.98] transition-transform tracking-wider shadow-lg shadow-matcha/20"
                    >
                        儲存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;