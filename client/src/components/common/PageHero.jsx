export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="container-shell pt-28 sm:pt-32">
      <div className="glass-panel neon-ring overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}