import React from 'react';
import { TransportDetail } from '../types';

interface TransportConnectorProps {
    data?: TransportDetail;
    onClick: () => void;
}

const getTransportIcon = (mode: string) => {
    switch(mode) {
        case 'train': return 'fa-train-subway';
        case 'walk': return 'fa-person-walking';
        case 'taxi': return 'fa-taxi';
        case 'bus': return 'fa-bus';
        default: return 'fa-arrow-right';
    }
};

const TransportConnector: React.FC<TransportConnectorProps> = ({ data, onClick }) => {
    // If no data, show a clickable placeholder to add transport info
    if (!data) {
        return (
            <div 
                className="relative h-12 ml-[10px] border-l-2 border-dotted border-slate-300 my-1 group cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
                <div className="absolute top-1/2 -left-[10px] -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-300 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:border-matcha hover:text-matcha active:scale-95">
                    <i className="fa-solid fa-plus text-[10px]"></i>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-16 ml-[10px] border-l-2 border-dashed border-slate-300 my-1 group">
            <button 
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="absolute top-1/2 -left-[14px] -translate-y-1/2 flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-full hover:border-matcha hover:text-matcha transition-all z-20 active:scale-95 max-w-[180px]"
            >
                <i className={`fa-solid ${getTransportIcon(data.mode)} text-xs text-slate-400 group-hover:text-matcha flex-shrink-0`}></i>
                <div className="flex flex-col items-start text-left overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap group-hover:text-matcha leading-tight">
                        {data.duration}
                    </span>
                    {data.note && (
                        <span className="text-[9px] text-slate-400 truncate w-full group-hover:text-matcha/70 leading-tight">
                            {data.note}
                        </span>
                    )}
                </div>
            </button>
        </div>
    );
};

export default TransportConnector;