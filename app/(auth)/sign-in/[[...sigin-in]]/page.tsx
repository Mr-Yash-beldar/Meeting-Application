'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-dark-2">
      <div className="w-full max-w-md rounded-2xl bg-dark-1 p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Image src="/icons/logo.svg" width={48} height={48} alt="logo" />
          <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
          <p className="text-sm text-sky-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-sky-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg bg-dark-3 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 ring-dark-3 focus:ring-blue-1 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-sky-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg bg-dark-3 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 ring-dark-3 focus:ring-blue-1 transition"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-blue-1 py-3 font-semibold text-white transition hover:bg-blue-1/90 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-blue-1 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
