import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link className="group inline-flex items-center gap-3" to="/">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/5 text-lg font-bold text-white shadow-glass transition group-hover:border-cyan-300/40 group-hover:bg-white/10">
        N
      </span>
      <div>
        <p className="font-display text-lg font-semibold tracking-wide text-white">Neytr.ai</p>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">AI Agency Systems</p>
      </div>
    </Link>
  );
}