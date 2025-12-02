import React from 'react';
import { Expense } from '../types';

export const MoneyView: React.FC<{ expenses: Expense[], members: string[], currencyRate: number, currentCurrency: string, onDelete: (id: string) => void }> = ({ expenses, members, currencyRate, currentCurrency, onDelete }) => {
    const balances: Record<string, number> = {};
    members.forEach(m => balances[m] = 0);
    
    let totalSpent = 0;

    expenses.forEach(ex => {
        totalSpent += ex.amount;
        balances[ex.payer] += ex.amount;
        const share = ex.amount / ex.involved.length;
        ex.involved.forEach(p => {
            balances[p] -= share;
        });
    });

    const formatMoney = (amount: number) => {
        if (currentCurrency === 'JPY') return `¥${Math.round(amount).toLocaleString()}`;
        return `NT$${Math.round(amount * currencyRate).toLocaleString()}`;
    };

    return (
        <div className="px-6 pb-32 tracking-wide pt-6">
            <div className="mb-10 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">Total Expenses</span>
                <div className="text-4xl font-black mt-2 text-charcoal font-mono">
                    ¥{totalSpent.toLocaleString()}
                </div>
                <div className="text-sm text-slate-500 mt-2 font-medium">
                    ≈ NT${Math.round(totalSpent * currencyRate).toLocaleString()}
                </div>
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Balances</h3>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {Object.keys(balances).map(m => {
                    const bal = balances[m];
                    const isPos = bal >= 0;
                    return (
                        <div key={m} className={`rounded-xl p-4 text-center border border-subtle ${isPos ? 'bg-[#f0f4ef]' : 'bg-red-50'}`}>
                            <div className="text-xs text-slate-500 font-bold mb-2">{m}</div>
                            <div className={`font-bold text-base font-mono ${isPos ? 'text-matcha' : 'text-red-400'}`}>
                                {formatMoney(Math.abs(bal))}
                            </div>
                            <div className={`text-[10px] opacity-70 mt-1 font-medium ${isPos ? 'text-matcha' : 'text-red-400'}`}>
                                {isPos ? '收' : '付'}
                            </div>
                        </div>
                    );
                })}
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">History</h3>
            <div className="bg-white rounded-2xl border border-subtle divide-y divide-subtle">
                {expenses.length === 0 ? (
                    <div className="text-center text-slate-300 py-8 text-sm font-medium">尚無消費紀錄</div>
                ) : (
                    [...expenses].reverse().map((ex) => (
                        <div key={ex.id} className="flex justify-between items-center p-4">
                            <div>
                                <div className="font-bold text-charcoal text-base">{ex.title}</div>
                                <div className="text-xs text-slate-400 mt-1 font-medium">由 <span className="text-slate-600">{ex.payer}</span> 支付</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-charcoal font-mono">¥{ex.amount.toLocaleString()}</div>
                                <button 
                                    onClick={() => onDelete(ex.id)}
                                    className="text-xs text-slate-300 mt-2 px-2 py-1 hover:text-red-400 transition-colors"
                                >
                                    刪除
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};