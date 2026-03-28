import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { OAuthButtons } from '../components/auth/OAuthButtons';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password should be at least 8 characters.'),
});

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const consumeToken = useAuthStore((state) => state.consumeToken);
  const hydrate = useAuthStore((state) => state.hydrate);
  const storeError = useAuthStore((state) => state.error);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      return;
    }

    consumeToken(token);
    hydrate().then(() => {
      setSearchParams({});
      navigate('/dashboard', { replace: true });
    });
  }, [consumeToken, hydrate, navigate, searchParams, setSearchParams]);

  const onSubmit = async (values) => {
    await login(values);
    navigate(location.state?.from || '/dashboard');
  };

  return (
    <>
      <PageHero
        eyebrow="Sign In"
        title="Protected access for future dashboards, CRM views, and client workspaces."
        description="JWT auth and OAuth scaffolding are already connected in the project foundation so secure product surfaces can expand naturally."
      />
      <section className="container-shell py-20">
        <div className="mx-auto max-w-xl glass-panel rounded-[2rem] p-8 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input className="input-field" placeholder="founder@neytr.ai" {...register('email')} />
              {errors.email ? <span className="mt-2 block text-xs text-rose-300">{errors.email.message}</span> : null}
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
              <input className="input-field" placeholder="••••••••" type="password" {...register('password')} />
              {errors.password ? <span className="mt-2 block text-xs text-rose-300">{errors.password.message}</span> : null}
            </label>
            {storeError ? <p className="mt-5 text-sm text-rose-300">{storeError}</p> : null}
            <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <OAuthButtons />
        </div>
      </section>
    </>
  );
}

export default LoginPage;