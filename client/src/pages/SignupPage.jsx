import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { OAuthButtons } from '../components/auth/OAuthButtons';
import { useAuthStore } from '../store/authStore';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name.'),
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

function SignupPage() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const { register: rf, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values) => {
    await register(values);
    navigate('/dashboard');
  };

  return (
    <>
      <PageHero eyebrow="Create Account" title="Sign up to start projects and access client tools" description="Create a Neytr.ai account to manage projects, invoices, and client portals." />
      <section className="container-shell py-20">
        <div className="mx-auto max-w-md glass-panel rounded-[2rem] p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Full name</span>
              <input className="input-field" {...rf('fullName')} />
              {errors.fullName ? <span className="mt-2 block text-xs text-rose-300">{errors.fullName.message}</span> : null}
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input className="input-field" {...rf('email')} />
              {errors.email ? <span className="mt-2 block text-xs text-rose-300">{errors.email.message}</span> : null}
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
              <input className="input-field" type="password" {...rf('password')} />
              {errors.password ? <span className="mt-2 block text-xs text-rose-300">{errors.password.message}</span> : null}
            </label>
            <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Signing up...' : 'Create account'}</Button>
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

export default SignupPage;
