import { faqs } from '../../utils/siteData';
import { SectionHeading } from '../common/SectionHeading';
import { useState } from 'react';

export function FAQSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" description="Short answers to common questions so you can move faster." />
      <div className="mt-8 grid gap-4">
        {faqs.map((f, idx) => (
          <Accordion key={f.q} index={idx} item={f} />
        ))}
      </div>
    </section>
  );
}

function Accordion({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="glass-panel rounded-2xl p-5">
      <button type="button" className="w-full text-left" onClick={() => setOpen((v) => !v)}>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-semibold text-white">{item.q}</p>
          <span className="text-slate-400">{open ? '−' : '+'}</span>
        </div>
      </button>
      {open ? <p className="mt-4 text-sm text-slate-300">{item.a}</p> : null}
    </div>
  );
}
