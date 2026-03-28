import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';
import { useState } from 'react';

const schema = z.object({ password: z.string().min(8, 'Password must be 8+ characters') });

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await authService.resetPassword({ token, password: values.password });
      setMessage('Password updated. Redirecting to sign in...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMessage(err.message || 'Invalid or expired token.');
    }
  };

  return (
    <>
      <PageHero eyebrow="Reset Password" title="Create a new password" description="Choose a secure password to get back into your account." />
      <section className="container-shell py-20">
        <div className="mx-auto max-w-md glass-panel rounded-[2rem] p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">New password</span>
              <input className="input-field" type="password" {...register('password')} />
              {errors.password ? <span className="mt-2 block text-xs text-rose-300">{errors.password.message}</span> : null}
            </label>
            {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
            <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Updating...' : 'Update password'}</Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ResetPasswordPage;
