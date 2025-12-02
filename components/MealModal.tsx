import React, { useState, useEffect } from 'react';
import { RestaurantOption, generateId } from '../types';

interface MealModalProps {
    isOpen: boolean;
    initialData?: RestaurantOption;
    type: 'breakfast' | 'lunch' | 'dinner';
    onClose: () => void;
    onSave: (data: RestaurantOption) => void;
    onDelete?: () => void;
}

const MealModal: React.FC<MealModalProps> = ({ isOpen, initialData, type, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Partial<RestaurantOption>>({
        name: '', dish: '', priceLevel: '', note: '', url: '', locationUrl: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || { name: '', dish: '', priceLevel: '', note: '', url: '', locationUrl: '' });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const typeLabel = type === 'breakfast' ? '早餐' : type === 'lunch' ? '午餐' : '晚餐';

    return (
        <div className="fixed inset-0 z-[80]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>
            <div className="fixed inset-x-0 bottom-0 z-10 bg-rice rounded-t-[24px] p-8 pb-safe shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                <div className="w-10 h-1 bg-slate-200/70 rounded-full mx-auto mb-8"></div>
                <h3 className="text-xl font-bold text-charcoal mb-6 tracking-wide">
                    {initialData ? `編輯${typeLabel}選擇` : `新增${typeLabel}選擇`}
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">餐廳名稱</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="例如：一蘭拉麵" 
                            className="w-full bg-transparent border-b border-subtle py-2 text-lg font-medium focus:border-matcha outline-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-[2]">
                            <label className="text-xs uppercase font-bold text-slate-400 block mb-2">推薦餐點</label>
                            <input 
                                type="text" 
                                value={formData.dish}
                                onChange={(e) => setFormData({...formData, dish: e.target.value})}
                                placeholder="例如：豚骨拉麵"
                                className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs uppercase font-bold text-slate-400 block mb-2">價位</label>
                            <input 
                                type="text" 
                                value={formData.priceLevel}
                                onChange={(e) => setFormData({...formData, priceLevel: e.target.value})}
                                placeholder="¥1000"
                                className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none font-mono"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">Google Maps 連結 (選填)</label>
                        <input 
                            type="text" 
                            value={formData.locationUrl || ''}
                            onChange={(e) => setFormData({...formData, locationUrl: e.target.value})}
                            placeholder="https://maps..."
                            className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">網站/食記連結 (選填)</label>
                        <input 
                            type="text" 
                            value={formData.url || ''}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            placeholder="https://..."
                            className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">筆記</label>
                        <textarea 
                            value={formData.note || ''}
                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                            rows={2} 
                            placeholder="必點、排隊攻略..." 
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
                        onClick={() => {
                            if (!formData.name) return;
                            onSave({
                                id: initialData?.id || generateId(),
                                name: formData.name!,
                                dish: formData.dish || '',
                                priceLevel: formData.priceLevel || '',
                                note: formData.note,
                                url: formData.url,
                                locationUrl: formData.locationUrl
                            } as RestaurantOption);
                        }}
                        className="flex-[2] bg-matcha text-white font-bold py-3.5 rounded-2xl active:scale-[0.98] transition-transform tracking-wider shadow-lg shadow-matcha/20"
                    >
                        儲存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealModal;