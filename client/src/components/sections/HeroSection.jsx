import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { heroStats } from '../../utils/siteData';

export function HeroSection() {
  return (
    <section className="container-shell pt-32 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200/80"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <Sparkles size={14} />
            Premium Digital Acceleration
          </motion.p>
          <motion.h1
            className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05 }}
          >
            Design, automation, and AI systems built to feel
            <span className="text-gradient"> ahead of the curve</span>.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            Neytr.ai crafts high-trust websites, internal tools, and conversion systems for ambitious brands that want premium execution without bloated complexity.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            <Button as="link" to="/contact">
              Start a Project
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button as="link" to="/work" variant="secondary">
              Explore Selected Work
            </Button>
          </motion.div>
          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
          >
            {heroStats.map((item) => (
              <div key={item.label} className="glass-panel rounded-2xl p-5">
                <p className="font-display text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-10 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="glass-panel neon-ring relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/75">Launch Matrix</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white">Agency operating system</h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Live Ready
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  'Acquisition funnels',
                  'Client dashboards',
                  'Offer landing pages',
                  'Internal CRM workflows',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-5 text-sm leading-7 text-slate-200">
                <div className="flex items-center gap-3 text-cyan-200">
                  <ShieldCheck size={18} />
                  Secure, scalable, auth-ready architecture from day one.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}