import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';

function Footer() {
  return (
    <footer className="border-t border-white/8 pb-10 pt-16">
      <div className="container-shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-white">Neytr.ai</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            Premium digital systems for agencies and AI-native brands ready to move with more clarity, speed, and trust.
          </p>
        </div>
        <p className="text-sm text-slate-500">Designed for scale across marketing, product, and client experience.</p>
      </div>
    </footer>
  );
}

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}