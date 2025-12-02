import React, { useState, useEffect } from 'react';
import { TransportDetail } from '../types';

interface TransportModalProps {
    isOpen: boolean;
    initialData?: TransportDetail;
    onClose: () => void;
    onSave: (data: TransportDetail | undefined) => void;
}

const TransportModal: React.FC<TransportModalProps> = ({ isOpen, initialData, onClose, onSave }) => {
    const [formData, setFormData] = useState<TransportDetail>({
        mode: 'train',
        duration: '10m',
        note: '',
        url: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || { mode: 'train', duration: '15m', note: '', url: '' });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[75]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>
            <div className="fixed inset-x-0 bottom-0 z-10 bg-rice rounded-t-[24px] p-6 pb-safe shadow-2xl animate-slide-up">
                 <div className="w-10 h-1 bg-slate-200/70 rounded-full mx-auto mb-6"></div>
                <h3 className="text-lg font-bold text-charcoal mb-6">交通方式</h3>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-400 block mb-1">方式</label>
                            <select 
                                value={formData.mode}
                                onChange={(e) => setFormData({...formData, mode: e.target.value as any})}
                                className="w-full bg-white p-3 rounded-xl border border-subtle outline-none"
                            >
                                <option value="train">電車/地鐵</option>
                                <option value="walk">步行</option>
                                <option value="taxi">計程車</option>
                                <option value="bus">巴士</option>
                                <option value="other">其他</option>
                            </select>
                        </div>
                        <div className="flex-1">
                             <label className="text-xs font-bold text-slate-400 block mb-1">預估時間</label>
                             <input 
                                type="text" 
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                className="w-full bg-white p-3 rounded-xl border border-subtle outline-none"
                                placeholder="ex: 15m"
                            />
                        </div>
                    </div>
                    <div>
                         <label className="text-xs font-bold text-slate-400 block mb-1">說明</label>
                         <input 
                            type="text" 
                            value={formData.note || ''}
                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                            className="w-full bg-white p-3 rounded-xl border border-subtle outline-none"
                            placeholder="ex: 山手線 (外回)"
                        />
                    </div>
                     <div>
                         <label className="text-xs font-bold text-slate-400 block mb-1">Google Maps 連結</label>
                         <input 
                            type="text" 
                            value={formData.url || ''}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            className="w-full bg-white p-3 rounded-xl border border-subtle outline-none text-sm"
                            placeholder="https://maps.app.goo.gl/..."
                        />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                        {formData.url && (
                             <a href={formData.url} target="_blank" rel="noreferrer" className="flex-1 border border-subtle text-slate-500 py-3 rounded-xl font-bold text-center">
                                開啟地圖
                             </a>
                        )}
                        <button onClick={() => onSave(undefined)} className="flex-1 text-red-400 border border-red-100 py-3 rounded-xl font-bold">
                            清除
                        </button>
                         <button onClick={() => onSave(formData)} className="flex-[2] bg-matcha text-white py-3 rounded-xl font-bold shadow-lg shadow-matcha/20">
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportModal;