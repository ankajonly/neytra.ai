import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { navLinks } from '../../utils/siteData';
import { useAuthStore } from '../../store/authStore';

const linkClass = ({ isActive }) =>
  `text-sm transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="container-shell">
        <div className="glass-panel mx-auto flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} className={linkClass} to={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button as="link" to={isAuthenticated ? '/dashboard' : '/login'} variant="secondary">
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </Button>
            <Button as="link" to="/contact">
              Start a Project
            </Button>
          </div>
          <button className="inline-flex rounded-full border border-white/10 p-2 text-white lg:hidden" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open ? (
          <div className="glass-panel mt-3 rounded-3xl p-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} className={linkClass} to={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <Button as="link" to={isAuthenticated ? '/dashboard' : '/login'} variant="secondary" onClick={() => setOpen(false)}>
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </Button>
              <Button as="link" to="/contact" onClick={() => setOpen(false)}>
                Start a Project
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}