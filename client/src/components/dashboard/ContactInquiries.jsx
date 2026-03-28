import React, { useEffect, useState } from 'react';
import { contactService } from '../../services/contactService';

export function ContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await contactService.getInquiries();
        if (!mounted) return;
        setInquiries(res.data?.inquiries || res.inquiries || []);
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

  if (loading) return <div className="glass-panel p-4">Loading inquiries...</div>;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Contact inquiries</p>
      <div className="mt-4 space-y-3">
        {inquiries.length === 0 ? (
          <p className="text-sm text-slate-400">No inquiries yet.</p>
        ) : (
          inquiries.slice(0, 6).map((iq) => (
            <div key={iq._id} className="rounded-md border border-white/6 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{iq.fullName}</p>
                  <p className="text-xs text-slate-400">{iq.email} • {new Date(iq.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-sm text-slate-300">{iq.projectType}</div>
              </div>
              <p className="mt-2 text-sm text-slate-300">{iq.message.slice(0, 120)}{iq.message.length > 120 ? '…' : ''}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
