import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';

export function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await projectService.getProjects();
        if (!mounted) return;
        setProjects(res.data?.projects || res.projects || []);
      } catch (err) {
        // ignore for now
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="glass-panel p-4">Loading projects...</div>;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Projects</p>
      <div className="mt-4 space-y-3">
        {projects.length === 0 ? (
          <p className="text-sm text-slate-400">No projects yet.</p>
        ) : (
          projects.slice(0, 6).map((p) => (
            <div key={p._id} className="rounded-md border border-white/6 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{p.title}</p>
                  <p className="text-xs text-slate-400">{p.clientName || '—'}</p>
                </div>
                <div className="text-sm text-slate-300">{p.status}</div>
              </div>
              <p className="mt-2 text-sm text-slate-300">{p.summary?.slice(0, 120) || ''}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
