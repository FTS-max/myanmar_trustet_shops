'use client';

import { ReactNode } from 'react';

// Try to import Auth0's UserProvider, but handle the case where it's not installed
let UserProvider: React.ComponentType<{children: ReactNode}> | null = null;

try {
  // Dynamic import to avoid build errors when the package is not installed
  UserProvider = require('@auth0/nextjs-auth0').UserProvider;
} catch (error) {
  console.warn('Auth0 package not installed. Authentication will be mocked.');
  // UserProvider remains null
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // If Auth0 is installed, use UserProvider, otherwise just return children
  if (UserProvider) {
    return <UserProvider>{children}</UserProvider>;
  }
  
  // Fallback when Auth0 is not installed
  return <>{children}</>;
}
