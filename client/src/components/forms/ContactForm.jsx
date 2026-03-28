import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { contactService } from '../../services/contactService';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Tell us your name.'),
  email: z.string().email('Add a valid email address.'),
  company: z.string().min(2, 'Company name helps us tailor the project.'),
  projectType: z.string().min(2, 'Choose the type of engagement.'),
  message: z.string().min(20, 'Share a little more detail so we can help.'),
});

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      projectType: 'Agency Website',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setServerMessage('');
    setServerError('');

    try {
      const response = await contactService.createInquiry(values);
      setServerMessage(response.message || 'Inquiry sent successfully.');
      reset();
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <form className="glass-panel rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input className="input-field" placeholder="Aarav Kapoor" {...register('fullName')} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className="input-field" placeholder="hello@company.com" {...register('email')} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input className="input-field" placeholder="Your company" {...register('company')} />
        </Field>
        <Field label="Project Type" error={errors.projectType?.message}>
          <select className="input-field" {...register('projectType')}>
            <option>Agency Website</option>
            <option>AI Product MVP</option>
            <option>Client Portal</option>
            <option>Automation System</option>
          </select>
        </Field>
      </div>
      <Field className="mt-5" label="Project Vision" error={errors.message?.message}>
        <textarea className="input-field min-h-36 resize-none" placeholder="Tell us what you're building, where you're stuck, and what success looks like." {...register('message')} />
      </Field>
      {serverMessage ? <p className="mt-5 text-sm text-emerald-300">{serverMessage}</p> : null}
      {serverError ? <p className="mt-5 text-sm text-rose-300">{serverError}</p> : null}
      <Button className="mt-6" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </Button>
    </form>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}