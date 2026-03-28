import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { testimonials } from '../../utils/siteData';
import { SectionHeading } from '../common/SectionHeading';

export function TestimonialsSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading eyebrow="Testimonials" title="What clients say" description="Real feedback from partners and product leaders we've worked with." />
      <div className="mt-8">
        <Swiper breakpoints={{ 0: { slidesPerView: 1.05 }, 768: { slidesPerView: 2.1 } }} spaceBetween={20}>
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="glass-panel rounded-2xl p-6">
                <p className="text-sm leading-7 text-slate-300">“{t.quote}”</p>
                <div className="mt-6">
                  <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{t.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
