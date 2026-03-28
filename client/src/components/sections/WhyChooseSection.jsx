import { differentiators } from '../../utils/siteData';
import { SectionHeading } from '../common/SectionHeading';

export function WhyChooseSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading eyebrow="Why Neytr.ai" title="Why clients choose us" description="A focused delivery approach that balances design, speed, and long-term scalability." />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => (
          <div key={item} className="glass-panel rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-white">{item.split(',')[0]}</h3>
            <p className="mt-3 text-sm text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
