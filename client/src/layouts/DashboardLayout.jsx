import { Outlet } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';

export function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6">
      <div className="container-shell">
        <div className="glass-panel flex items-center justify-between rounded-3xl px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">Secure Space</p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white">Client Dashboard Foundation</h1>
          </div>
          <Button variant="secondary" onClick={() => logout()}>
            Sign Out
          </Button>
        </div>
        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}