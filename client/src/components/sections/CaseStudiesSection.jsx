import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SectionHeading } from '../common/SectionHeading';
import { caseStudies } from '../../utils/siteData';

export function CaseStudiesSection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Selected Outcomes"
        title="A showcase layer that feels premium now and can evolve into a full case-study engine later."
        description="Swiper is already wired into the foundation so featured work, testimonials, and insights can scale without reworking the content system."
      />
      <div className="mt-12">
        <Swiper breakpoints={{ 0: { slidesPerView: 1.05 }, 768: { slidesPerView: 2.1 }, 1200: { slidesPerView: 3 } }} spaceBetween={24}>
          {caseStudies.map((item) => (
            <SwiperSlide key={item.title}>
              <article className="glass-panel h-full rounded-[1.75rem] p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/75">{item.category}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.summary}</p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-cyan-200">
                  {item.impact}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}