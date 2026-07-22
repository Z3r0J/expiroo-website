'use client';

import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/config';
import type { Dictionary } from '@/lib/i18n';

// Public by design; empty during local dev / before the key is set.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'text-body block w-full rounded-none border-0 border-b-2 border-outline-variant bg-transparent px-0 py-2.5 text-on-surface transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-0';

export function ContactForm({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return; // honeypot tripped — silently drop
    if (!ACCESS_KEY) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          from_name: 'Expiroo website',
          subject: 'New message from expiroo.app',
        }),
      });
      const json: { success?: boolean } = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const submitting = status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 rounded-3xl bg-surface-container-lowest p-6 md:p-10"
    >
      {/* Web3Forms honeypot — hidden from users, catches bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="group">
        <label
          htmlFor="name"
          className="text-label mb-2 block text-on-surface-variant group-focus-within:text-primary"
        >
          {c.name}
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div className="group">
        <label
          htmlFor="email"
          className="text-label mb-2 block text-on-surface-variant group-focus-within:text-primary"
        >
          {c.email}
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="text-label mb-2 block text-on-surface-variant group-focus-within:text-primary"
        >
          {c.message}
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} min-h-32 resize-y`} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-linear-to-b from-primary to-primary-dim px-10 font-bold text-on-primary motion-safe:transition motion-safe:duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {submitting && (
          <svg
            viewBox="0 0 24 24"
            className="size-5 animate-spin motion-reduce:animate-none"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {submitting ? c.sending : c.send}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <div className="flex gap-3 rounded-2xl bg-fresh-container p-5 text-on-fresh-container motion-safe:animate-[reveal-in_0.3s_var(--ease-reveal)]">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <p className="text-sm leading-relaxed">
              <strong className="font-semibold">{c.successTitle}.</strong> {c.successBody}
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="flex gap-3 rounded-2xl bg-expired-container p-5 text-on-expired-container motion-safe:animate-[reveal-in_0.3s_var(--ease-reveal)]">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-sm leading-relaxed">
              <strong className="font-semibold">{c.errorTitle}.</strong> {c.errorBody}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
