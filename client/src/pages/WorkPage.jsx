import { PageHero } from '../components/common/PageHero';
import { caseStudies } from '../utils/siteData';

function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="A modular work showcase ready for featured stories, testimonials, and proof-driven selling."
        description="This starter page already uses a reusable case study data structure so the site can expand into a richer editorial and portfolio system without rewriting the presentation layer."
      />
      <section className="container-shell py-20">
        <div className="grid gap-6 xl:grid-cols-3">
          {caseStudies.map((item) => (
            <article key={item.title} className="glass-panel rounded-[1.75rem] p-7">
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">{item.category}</p>
              <h2 className="mt-5 font-display text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.summary}</p>
              <div className="mt-8 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-4 py-3 text-sm text-cyan-200">
                {item.impact}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default WorkPage;