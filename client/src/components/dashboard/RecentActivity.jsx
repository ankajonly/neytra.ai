import React from 'react';

const items = [
  { id: 1, text: 'Proposal sent to Velocity Health', time: '2h' },
  { id: 2, text: 'New contact inquiry from Sofia Reyes', time: '8h' },
  { id: 3, text: 'Deployment successful (prod)', time: '1d' },
];

export function RecentActivity() {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Recent activity</p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between">
            <p className="text-sm text-slate-300">{it.text}</p>
            <p className="text-xs text-slate-500">{it.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
