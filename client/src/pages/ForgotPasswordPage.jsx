import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';

const schema = z.object({ email: z.string().email('Enter a valid email address.') });

function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    setMessage('');
    try {
      const res = await authService.forgotPassword(values);
      setMessage(res.message || 'If an account exists, a reset email was sent.');
    } catch (err) {
      setMessage(err.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <PageHero eyebrow="Forgot Password" title="Reset your password" description="Enter your email to receive password reset instructions." />
      <section className="container-shell py-20">
        <div className="mx-auto max-w-md glass-panel rounded-[2rem] p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input className="input-field" {...register('email')} />
              {errors.email ? <span className="mt-2 block text-xs text-rose-300">{errors.email.message}</span> : null}
            </label>
            {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
            <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Sending...' : 'Send reset link'}</Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPasswordPage;
