import React from 'react';

export function StatusCards() {
  const cards = [
    { title: 'Active projects', value: '3' },
    { title: 'Open inquiries', value: '5' },
    { title: 'Pending proposals', value: '1' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.title} className="glass-panel rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-400">{c.title}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-white">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
