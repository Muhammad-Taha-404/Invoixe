'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PleaseVerifyEmail({ email = 'user@example.com' }: { email?: string }) {
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Cooldown timer logic for resend button
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    setIsResending(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to resend verification email');

      setMessage({ type: 'success', text: 'A new verification link has been sent!' });
      setCooldown(60); // 60-second lockout to prevent spam
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center">
        
        {/* Animated Icon Header */}
        <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 ring-8 ring-blue-50/50 dark:ring-blue-900/10">
          <Mail className="w-8 h-8 animate-pulse" />
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
          We sent a verification link to <br />
          <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
        </p>

        {/* Status Alerts */}
        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium mb-6 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Quick Email App Button */}
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm mb-4"
        >
          Open Gmail
        </a>

        {/* Resend Action */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Didn&apos;t receive the email? Check your spam folder or
          </p>
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? `Resend email in ${cooldown}s` : 'Click to resend'}
          </button>
        </div>

        {/* Navigation Link */}
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}