export function FeatureGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="glass-panel rounded-3xl p-7">
          <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
          {item.points ? (
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {item.points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}