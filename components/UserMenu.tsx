'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-1 text-sm font-bold text-white focus:outline-none"
        aria-label="User menu"
      >
        {user.imageUrl ? (
          <Image src={user.imageUrl} alt={user.username} width={36} height={36} className="rounded-full object-cover" />
        ) : (
          initials
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-dark-1 py-2 shadow-xl ring-1 ring-white/10">
          <p className="truncate px-4 py-1 text-xs text-gray-400">{user.email}</p>
          <p className="truncate px-4 pb-2 text-sm font-semibold text-white">{user.username}</p>
          <hr className="border-white/10" />
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
