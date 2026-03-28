import { cn } from '../../utils/cn';

export function SectionHeading({ eyebrow, title, description, align = 'left', className }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}