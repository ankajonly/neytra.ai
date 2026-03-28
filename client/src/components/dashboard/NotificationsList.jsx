import React, { useEffect, useState } from 'react';
import { notificationService } from '../../services/notificationService';

export function NotificationsList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await notificationService.getNotifications();
        if (!mounted) return;
        setNotes(res.data?.notifications || res.notifications || []);
      } catch (err) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="glass-panel p-4">Loading notifications...</div>;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Notifications</p>
      <ul className="mt-4 space-y-2">
        {notes.length === 0 ? (
          <li className="text-sm text-slate-400">No notifications.</li>
        ) : (
          notes.slice(0, 6).map((n) => (
            <li key={n._id} className="flex items-start gap-3">
              <div className={`h-2 w-2 rounded-full ${n.level === 'critical' ? 'bg-rose-400' : n.level === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
              <div>
                <p className="text-sm text-white">{n.title}</p>
                <p className="mt-1 text-xs text-slate-400">{n.body?.slice(0, 120)}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
