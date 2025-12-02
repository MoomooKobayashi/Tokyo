import React from 'react';
import { Event } from '../types';

interface DetailModalProps {
    event: Event | null;
    onClose: () => void;
    onEdit: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ event, onClose, onEdit }) => {
    if (!event) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>
            <div className="fixed inset-x-0 bottom-0 z-10 bg-white rounded-t-[24px] overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto animate-slide-up">
                <div className="relative h-72">
                    <img 
                        src={event.image || 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop'} 
                        className="w-full h-full object-cover" 
                        alt={event.title}
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/eceae6/a0a09e?text=NO+IMAGE'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
                    <button onClick={onClose} className="absolute top-5 right-5 bg-black/20 text-white/90 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md active:bg-black/40 transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="absolute bottom-6 left-6 text-white pr-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded mb-3 inline-block tracking-wider uppercase">
                            {event.type}
                        </span>
                        <h2 className="text-3xl font-bold leading-tight tracking-wide drop-shadow-md">{event.title}</h2>
                        <p className="text-sm opacity-90 mt-2 font-medium flex items-center">
                            <i className="fa-solid fa-location-dot mr-1.5 text-xs"></i>
                            {event.loc || '未知地點'}
                        </p>
                    </div>
                    <button 
                        onClick={onEdit} 
                        className="absolute -bottom-6 right-6 bg-matcha text-white rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg active:scale-95 transition-transform z-20"
                    >
                        <i className="fa-solid fa-pen"></i>
                    </button>
                </div>
                
                <div className="p-8 pt-12 pb-28 space-y-6 bg-rice">
                    {/* Sub Items (Must Buy/Eat) Display */}
                    {event.subItems && event.subItems.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">必做清單</h4>
                            <div className="space-y-2">
                                {event.subItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-subtle">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${item.checked ? 'bg-matcha text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {item.checked && <i className="fa-solid fa-check"></i>}
                                        </div>
                                        <span className={`text-sm ${item.checked ? 'line-through text-slate-400' : 'text-charcoal'}`}>
                                            {item.type === 'buy' ? '🛍️' : item.type === 'eat' ? '🍴' : '✨'} {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {event.tags && (
                        <div className="flex flex-wrap gap-2">
                            {event.tags.map(tag => (
                                <span key={tag} className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold tracking-wider">#{tag}</span>
                            ))}
                        </div>
                    )}
                    
                    <div className="text-charcoal leading-relaxed tracking-wide">
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">關於</h4>
                        <p className="whitespace-pre-line">{event.desc || '暫無詳細描述。'}</p>
                    </div>

                    {event.note && (
                        <div className="bg-[#f4f1e8] p-4 rounded-xl border-l-2 border-matcha">
                            <p className="text-xs font-bold text-matcha uppercase mb-1 tracking-widest">TIPS</p>
                            <p className="text-sm text-charcoal/80">{event.note}</p>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((event.loc || '') + ' ' + event.title)}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 border border-subtle text-charcoal py-3.5 rounded-2xl font-bold text-center active:bg-slate-50 transition-colors text-sm tracking-wider"
                        >
                            導航
                        </a>
                        <a 
                            href={`https://www.google.com/search?q=${encodeURIComponent(event.title)}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 bg-charcoal text-white py-3.5 rounded-2xl font-bold text-center active:bg-charcoal/90 transition-colors text-sm tracking-wider"
                        >
                            搜尋
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;