import { ContactForm } from '../components/forms/ContactForm';
import { PageHero } from '../components/common/PageHero';

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a clear brief. Leave with a site and system foundation built to scale."
        description="Use the inquiry form to kick off a website, AI product MVP, client portal, or internal automation system."
      />
      <section className="container-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">What We Need</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              <li>Your current growth stage and offer</li>
              <li>What the website or platform should unlock</li>
              <li>Any constraints around timeline, content, or integrations</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default ContactPage;