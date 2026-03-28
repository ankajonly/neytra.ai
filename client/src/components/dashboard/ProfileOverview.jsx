import React from 'react';
import { useAuthStore } from '../../store/authStore';

export function ProfileOverview() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="glass-panel rounded-[1.5rem] p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Profile</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-white/6" />
        <div>
          <p className="font-display text-lg font-semibold text-white">{user?.fullName || 'Your name'}</p>
          <p className="mt-1 text-sm text-slate-400">{user?.email || 'you@company.com'}</p>
        </div>
      </div>
    </div>
  );
}
