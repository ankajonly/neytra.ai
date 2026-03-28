import { SectionHeading } from '../common/SectionHeading';
import { processSteps } from '../../utils/siteData';

export function ProcessSection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Process"
        title="Clear phases, fast momentum, and room to scale into a deeper delivery operation."
        description="The project structure supports rapid execution now while leaving clean seams for future modules like blogs, dashboards, CRM features, and authenticated client workspaces."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {processSteps.map((item) => (
          <article key={item.step} className="glass-panel rounded-[1.75rem] p-7">
            <p className="font-display text-4xl font-semibold text-cyan-200/85">{item.step}</p>
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}