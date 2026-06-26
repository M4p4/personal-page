'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from 'lib/contactSchema';
import Field from 'components/ui/Field';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const [serverError, setServerError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (form: ContactInput) => {
    setServerError('');
    setShowMessage(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setShowMessage(true);
      reset();
    } catch {
      setServerError('Network error. Please try again.');
    }
  };

  return (
    <>
      <p>
        If you have any questions, please feel free to contact me via the
        following form.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 flex flex-col justify-center space-y-1"
      >
        {/* Honeypot — hidden from users, bots tend to fill it in. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register('botcheck')}
        />

        <Field
          label="Subject"
          id="subject"
          type="text"
          placeholder="Your subject"
          error={errors.subject}
          {...register('subject')}
        />

        <Field
          label="Email"
          id="email"
          type="text"
          placeholder="Your email"
          error={errors.email}
          {...register('email')}
        />

        <Field
          label="Message"
          id="message"
          multiline
          rows={5}
          placeholder="Your message..."
          style={{ resize: 'none' }}
          error={errors.message}
          {...register('message')}
        />

        <div className="w-full pt-3">
          {serverError ? (
            <div className="mb-3 text-red-800 dark:text-red-600">
              {serverError}
            </div>
          ) : null}
          {showMessage ? (
            <div className="mb-3 text-green-800 dark:text-green-600">
              Thank you, your email has been sent successfully!
            </div>
          ) : null}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-orange-600 p-2 text-slate-100 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
