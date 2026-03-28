import { HeroSection } from '../components/sections/HeroSection';
import { TrustSection } from '../components/sections/TrustSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { WhyChooseSection } from '../components/sections/WhyChooseSection';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { CTASection } from '../components/sections/CTASection';

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <WhyChooseSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

export default HomePage;