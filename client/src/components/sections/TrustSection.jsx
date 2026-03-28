import { trustLogos, trustStats } from '../../utils/siteData';

export function TrustSection() {
  return (
    <section className="container-shell py-12">
      <div className="glass-panel rounded-[2rem] p-6">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {trustLogos.map((logo) => (
              <div key={logo.name} className="h-8 w-32 opacity-60 grayscale">
                {/* placeholder svg or img; assets may be added later */}
                <div className="h-full w-full rounded-md bg-white/3" />
              </div>
            ))}
          </div>
          <div className="hidden sm:flex sm:items-center sm:gap-8">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-semibold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
