import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { authService } from '../services/authService';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [message, setMessage] = useState('Verifying...');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await authService.verifyEmail(token);
        if (!mounted) return;
        setMessage('Email verified! Redirecting to sign in...');
        setTimeout(() => navigate('/login'), 1200);
      } catch (err) {
        if (!mounted) return;
        setMessage(err.message || 'Verification failed or token expired.');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, navigate]);

  return (
    <>
      <PageHero eyebrow="Verify Email" title="Confirming your email" description="We are validating your verification link." />
      <section className="container-shell py-20">
        <div className="mx-auto max-w-lg glass-panel rounded-[2rem] p-8">
          <p className="text-sm text-slate-300">{message}</p>
        </div>
      </section>
    </>
  );
}

export default VerifyEmailPage;
