import { SectionHeading } from '../common/SectionHeading';
import { FeatureGrid } from '../common/FeatureGrid';
import { services } from '../../utils/siteData';

export function ServicesSection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Capabilities"
        title="Built for agencies that need strong design and stronger systems."
        description="The foundation supports polished marketing pages today and deeper operational products tomorrow, from case studies to private client portals."
      />
      <div className="mt-12">
        <FeatureGrid items={services} />
      </div>
    </section>
  );
}