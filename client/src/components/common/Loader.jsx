import { APP_NAME } from '../../utils/constants';

export function Loader({ fullScreen = false, label = 'Loading experience' }) {
  return (
    <div className={fullScreen ? 'flex min-h-screen items-center justify-center' : 'flex items-center justify-center py-20'}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute h-16 w-16 animate-pulseSoft rounded-full border border-cyan-300/30" />
          <span className="h-5 w-5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-500 shadow-glow" />
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">{APP_NAME}</p>
          <p className="mt-2 text-sm text-slate-300">{label}</p>
        </div>
      </div>
    </div>
  );
}