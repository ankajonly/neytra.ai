import { Button } from '../components/common/Button';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-lg rounded-[2rem] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/75">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">Page not found.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          The route exists in the architecture, but this address does not map to an active page yet.
        </p>
        <Button as="link" className="mt-8" to="/">
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;