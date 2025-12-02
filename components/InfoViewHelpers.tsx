import React, { useState, useEffect } from 'react';
import { Reservation } from '../types';

export const InfoView: React.FC<{ reservations: Reservation[], onEdit: (res: Reservation) => void, onAdd: () => void }> = ({ reservations, onEdit, onAdd }) => {
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'booked': return 'bg-matcha/10 text-matcha';
            case 'to-book': return 'bg-orange-100 text-orange-500';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'booked': return '已預訂';
            case 'to-book': return '待預訂';
            default: return '處理中';
        }
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'flight': return 'fa-plane';
            case 'hotel': return 'fa-bed';
            case 'restaurant': return 'fa-utensils';
            default: return 'fa-ticket';
        }
    };

    return (
        <div className="px-6 space-y-6 pb-24 tracking-wide pt-6">
            <div className="grid grid-cols-2 gap-4">
                <a href="https://vjw-lp.digital.go.jp/zh-hant/" target="_blank" rel="noreferrer" className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center active:scale-95 transition-transform border border-blue-100">
                    <i className="fa-solid fa-qrcode text-2xl text-blue-500 mb-2"></i>
                    <span className="text-xs font-bold text-blue-900">Visit Japan Web</span>
                </a>
                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="bg-green-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center active:scale-95 transition-transform border border-green-100">
                    <i className="fa-solid fa-map-location-dot text-2xl text-green-600 mb-2"></i>
                    <span className="text-xs font-bold text-green-900">Google Maps</span>
                </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-subtle">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">緊急聯絡</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                        <div>
                            <div className="font-bold text-charcoal">旅外國人急難救助</div>
                            <div className="text-xs text-slate-400 mt-1">日本境內直撥</div>
                        </div>
                        <a href="tel:08010097179" className="text-red-500 font-mono font-bold text-lg">080-1009-7179</a>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <div><span className="text-xs text-slate-400 block">報警</span><span className="font-bold text-xl">110</span></div>
                            <div><span className="text-xs text-slate-400 block">救護</span><span className="font-bold text-xl">119</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-subtle">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">預訂與票券</h3>
                    <button 
                        onClick={onAdd}
                        className="text-xs bg-[#f4f1e8] text-matcha px-3 py-1 rounded-full font-bold hover:bg-subtle transition-colors"
                    >
                        <i className="fa-solid fa-plus mr-1"></i>新增
                    </button>
                </div>
                <div className="space-y-6">
                    {reservations.map(res => (
                        <div key={res.id} onClick={() => onEdit(res)} className="relative pl-4 border-l-2 border-slate-100 cursor-pointer active:opacity-70 transition-opacity group">
                            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-matcha transition-colors"></div>
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                    <i className={`fa-solid ${getTypeIcon(res.type)} text-[10px]`}></i> {res.type}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(res.status)}`}>
                                    {getStatusText(res.status)}
                                </span>
                            </div>
                            <div className="text-base font-bold text-charcoal">{res.name}</div>
                            <div className="text-sm text-slate-500 mt-1 font-mono">{res.dateTime}</div>
                            {res.refNumber && <div className="text-xs font-mono text-slate-400 mt-1">REF: {res.refNumber}</div>}
                            {res.notes && <div className="text-xs text-matcha mt-1 bg-matcha/5 p-2 rounded">{res.notes}</div>}
                        </div>
                    ))}
                    {reservations.length === 0 && <div className="text-center text-slate-300 text-sm py-2">尚無預訂紀錄</div>}
                </div>
            </div>
        </div>
    );
};

export const ReservationModal: React.FC<{ isOpen: boolean, initialData?: Reservation, onClose: () => void, onSave: (d: any) => void, onDelete?: () => void }> = ({ isOpen, initialData, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Partial<Reservation>>({
        type: 'ticket', name: '', status: 'pending', dateTime: '', refNumber: '', notes: '', url: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || { type: 'ticket', name: '', status: 'pending', dateTime: '', refNumber: '', notes: '', url: '' });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-x-0 bottom-0 z-10 bg-rice rounded-t-[24px] p-8 pb-safe shadow-2xl transform transition-transform duration-300 max-h-[90vh] flex flex-col overflow-y-auto animate-slide-up">
                <div className="w-10 h-1 bg-slate-200/70 rounded-full mx-auto mb-8 flex-shrink-0"></div>
                <h3 className="text-xl font-bold text-charcoal mb-6 tracking-wide flex-shrink-0">
                    {initialData ? '編輯預訂' : '新增預訂'}
                </h3>
                
                <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar pb-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs uppercase font-bold text-slate-400 block mb-2">類型</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                                className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                            >
                                <option value="flight">✈️ 航班</option>
                                <option value="hotel">🏨 住宿</option>
                                <option value="restaurant">🍽️ 餐廳</option>
                                <option value="ticket">🎫 票券</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs uppercase font-bold text-slate-400 block mb-2">狀態</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                            >
                                <option value="booked">✅ 已預訂</option>
                                <option value="pending">⏳ 處理中</option>
                                <option value="to-book">⚠️ 待預訂</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">名稱</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="例如：Skyliner 車票" 
                            className="w-full bg-transparent border-b border-subtle py-2 text-lg font-medium focus:border-matcha outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">時間 / 日期</label>
                        <input 
                            type="text" 
                            value={formData.dateTime}
                            onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                            placeholder="例如：1/28 14:00"
                            className="w-full bg-transparent border-b border-subtle py-2 text-base focus:border-matcha outline-none"
                        />
                    </div>
                    {/* Simplified remaining fields for brevity in this helper file */}
                    <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">參考編號 (選填)</label>
                        <input type="text" value={formData.refNumber || ''} onChange={(e) => setFormData({...formData, refNumber: e.target.value})} className="w-full bg-transparent border-b border-subtle py-2 text-base font-mono focus:border-matcha outline-none" />
                    </div>
                     <div>
                        <label className="text-xs uppercase font-bold text-slate-400 block mb-2">備註</label>
                        <textarea value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full bg-transparent border-b border-subtle py-2 text-base resize-none focus:border-matcha outline-none" />
                    </div>
                </div>

                <div className="mt-8 flex gap-4 flex-shrink-0">
                    {initialData && onDelete && (
                        <button type="button" onClick={onDelete} className="flex-1 text-red-400 font-bold py-3.5 rounded-2xl border border-subtle active:bg-red-50 transition-colors tracking-wider">刪除</button>
                    )}
                    <button type="button" onClick={() => onSave(formData)} className="flex-[2] bg-matcha text-white font-bold py-3.5 rounded-2xl active:scale-[0.98] transition-transform tracking-wider shadow-lg shadow-matcha/20">儲存</button>
                </div>
            </div>
        </div>
    );
};