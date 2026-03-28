import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60';

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-glow hover:scale-[1.02] hover:shadow-[0_0_65px_rgba(56,189,248,0.28)]',
  secondary: 'glass-panel text-slate-100 hover:border-cyan-400/30 hover:bg-white/10',
  ghost: 'text-slate-200 hover:bg-white/5',
};

export function Button({ as = 'button', className, variant = 'primary', to, href, children, ...props }) {
  const classes = cn(baseStyles, variants[variant], className);

  if (as === 'link') {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (as === 'anchor') {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}