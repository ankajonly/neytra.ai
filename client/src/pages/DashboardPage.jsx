import { ProfileOverview } from '../components/dashboard/ProfileOverview';
import { StatusCards } from '../components/dashboard/StatusCards';
import { ContactInquiries } from '../components/dashboard/ContactInquiries';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ProjectsList } from '../components/dashboard/ProjectsList';
import { NotificationsList } from '../components/dashboard/NotificationsList';
import { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { caseStudies, services } from '../utils/siteData';

function DashboardPage() {
  const ref = useRef(null);
  useGsapReveal(ref);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6" ref={ref}>
        <ProfileOverview />
        <div className="glass-panel rounded-[1.5rem] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Overview</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white">Workspace Dashboard</h2>
          <p className="mt-2 text-sm text-slate-300">Quick access to recent requests, project status, and communications.</p>
          <div className="mt-6">
            <StatusCards />
          </div>
        </div>

        <section data-reveal>
          <h3 className="mb-4 font-display text-xl font-semibold text-white">Active Modules</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[...services, ...caseStudies].slice(0, 4).map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description || item.summary}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ProjectsList />
          <NotificationsList />
        </div>
      </div>

      <aside className="space-y-6">
        <ContactInquiries />
        <RecentActivity />
      </aside>
    </div>
  );
}

export default DashboardPage;