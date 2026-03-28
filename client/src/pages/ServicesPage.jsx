import { FeatureGrid } from '../components/common/FeatureGrid';
import { PageHero } from '../components/common/PageHero';
import { CTASection } from '../components/sections/CTASection';
import { differentiators, services } from '../utils/siteData';

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Strategy, design, and system architecture that create momentum instead of maintenance overhead."
        description="Neytr.ai combines clear positioning with production-ready delivery, giving ambitious teams a strong front-end presence and a scalable backend core from the same foundation."
      />
      <section className="container-shell py-20">
        <FeatureGrid items={services} />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item} className="glass-panel rounded-3xl p-6 text-sm leading-7 text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

export default ServicesPage;