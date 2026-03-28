import React from 'react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('UI error boundary caught an error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="glass-panel neon-ring max-w-lg rounded-3xl p-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Recovery Mode</p>
            <h1 className="mt-4 font-display text-3xl font-semibold text-white">Something broke in the interface.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Refresh the page to continue. If the issue persists, the current session likely needs a small fix in the client layer.
            </p>
            <Button className="mt-8" onClick={() => window.location.reload()}>
              Reload Experience
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}