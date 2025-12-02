import React from 'react';
import { Event } from '../types';

interface EventCardProps {
    event: Event;
    onClick: () => void;
}

const typeColors: Record<string, string> = {
    transport: 'text-blue-400',
    food: 'text-orange-400',
    hotel: 'text-indigo-400',
    sight: 'text-matcha'
};

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <div onClick={onClick} className="relative group cursor-pointer bg-white/50 rounded-2xl p-3 border border-transparent hover:border-matcha/30 hover:bg-white/80 transition-all duration-300">
            {/* Timeline Dot */}
            <div className="absolute -left-[45px] top-6 w-5 h-5 rounded-full border-4 border-rice bg-slate-300 group-hover:bg-matcha transition-colors shadow-sm z-10"></div>
            
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono text-sm font-bold text-slate-500">{event.time}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${typeColors[event.type] || 'text-slate-400'} opacity-80`}>
                            {event.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal leading-tight mb-1">{event.title}</h3>
                    <p className="text-sm text-slate-500 font-medium truncate tracking-wide flex items-center">
                         <i className="fa-solid fa-location-dot text-xs mr-1 opacity-70"></i>
                        {event.loc}
                    </p>

                    {/* Sub Items Preview (New Feature) */}
                    {event.subItems && event.subItems.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {event.subItems.slice(0, 3).map(item => (
                                <span key={item.id} className={`text-[10px] px-2 py-0.5 rounded-md border ${item.checked ? 'bg-matcha text-white border-matcha' : 'bg-white text-slate-500 border-slate-200'}`}>
                                    {item.type === 'buy' ? '🛍️' : item.type === 'eat' ? '🍴' : '✨'} {item.text}
                                </span>
                            ))}
                            {event.subItems.length > 3 && <span className="text-[10px] text-slate-400">+...</span>}
                        </div>
                    )}
                </div>
                {event.image && (
                    <img 
                        src={event.image} 
                        className="w-20 h-20 rounded-xl object-cover shadow-sm opacity-90 group-hover:opacity-100 transition-opacity bg-slate-200 flex-shrink-0" 
                        loading="lazy" 
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                )}
            </div>
        </div>
    );
};

export default EventCard;