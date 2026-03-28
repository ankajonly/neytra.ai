import { PageHero } from '../components/common/PageHero';

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An AI-native agency foundation designed to feel precise, minimal, and deeply credible."
        description="Neytr.ai is structured for teams that want modern interfaces, intelligent automations, and long-term technical flexibility without the clutter of disconnected tooling."
      />
      <section className="container-shell py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-[2rem] p-8 text-sm leading-8 text-slate-300">
            <p>
              The project foundation separates display, state, service, and routing concerns on the client while keeping the server organized around config, middleware, validators, controllers, and models. That makes it easier to add future modules like a blog, CRM, reporting suite, or private portal without unraveling the original codebase.
            </p>
            <p className="mt-6">
              The visual system leans dark, premium, and conversion-focused, with room for stronger brand personalization later through content CMS integration, richer animations, and dynamic data components.
            </p>
          </article>
          <article className="glass-panel rounded-[2rem] p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Principles</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              <li>Scalable folder boundaries</li>
              <li>Reusable presentation primitives</li>
              <li>Protected routes and auth-ready API flow</li>
              <li>Deployment and CI support from the outset</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

export default AboutPage;