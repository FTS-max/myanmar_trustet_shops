'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function AuthButtons() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Welcome, {user.name}</span>
        <a
          href="/api/auth/logout"
          className="text-purple-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors duration-200"
        >
          Log out
        </a>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <a
        href="/api/auth/login"
        className="text-purple-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors duration-200"
      >
        Log in
      </a>
      <a
        href="/api/auth/login?screen_hint=signup"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        Sign up
      </a>
    </div>
  );
}