'use client';

import React, { useState } from 'react';

const initFormState = {
  message: '',
  subject: '',
  email: '',
  botcheck: '',
};

type ContactForm = {
  message: string;
  subject: string;
  email: string;
  botcheck: string;
};

const ContactForm = () => {
  const [form, setForm] = useState<ContactForm>(initFormState);
  const [errors, setErrors] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const hasErrors = errors.length !== 0;

  const sendMessage = async () => {
    setErrors([]);
    setShowMessage(false);
    const validationErrors = [];
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (form.subject.length === 0)
      validationErrors.push("Subject can't be empty!");
    if (form.email.length === 0) validationErrors.push("Email can't be empty!");
    if (!emailRegex.test(form.email))
      validationErrors.push('Email has invalid format');
    if (form.message.length === 0)
      validationErrors.push("Message can't be empty!");

    if (validationErrors.length !== 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setErrors([data.error || 'Something went wrong. Please try again.']);
        return;
      }

      setShowMessage(true);
      setForm(initFormState);
    } catch {
      setErrors(['Network error. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <p>
        If you have any questions, please feel free to contact me via the
        following form.
      </p>

      <div className="flex flex-col justify-center mt-5 space-y-1">
        {/* Honeypot — hidden from users, bots tend to fill it in. */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          value={form.botcheck}
          onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
        />

        <label className="font-semibold pt-2">Subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={form.subject}
          placeholder="Your subject"
          className="px-3 py-2 rounded-md bg-orange-100 dark:bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <label className="font-semibold pt-2">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={form.email}
          placeholder="Your email"
          className="px-3 py-2 rounded-md bg-orange-100 dark:bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="font-semibold pt-2">Message</label>
        <textarea
          style={{ resize: 'none' }}
          rows={5}
          value={form.message}
          placeholder="Your message..."
          className="px-3 py-2 rounded-md bg-orange-100 dark:bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <div className="pt-3 w-full">
          {hasErrors ? (
            <div className="mb-3 dark:text-red-600 text-red-800">
              <p className="font-semibold">Please fix the following errors...</p>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </div>
          ) : null}
          {showMessage ? (
            <div className="mb-3 dark:text-green-600 text-green-800">
              Thank you, your email has been sent successfully!
            </div>
          ) : null}
          <button
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed p-2 rounded-xl text-slate-100 w-full"
            onClick={sendMessage}
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
