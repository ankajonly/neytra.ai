import { Button } from '../common/Button';

export function CTASection() {
  return (
    <section className="container-shell py-24">
      <div className="glass-panel neon-ring overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Ready To Build</p>
        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Launch a site that sells trust now and grows into a platform later.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Neytr.ai’s foundation is set up for premium positioning, protected user flows, scalable APIs, and future content expansion without redesigning the stack.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button as="link" to="/contact">
              Book Discovery
            </Button>
            <Button as="link" to="/services" variant="secondary">
              View Capabilities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}