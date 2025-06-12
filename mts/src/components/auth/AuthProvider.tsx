'use client';

import { ReactNode, useEffect, createContext, useContext, useState } from 'react';

// Define the Auth user type
interface AuthUser {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

// Define the Auth context type
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that manages authentication state
 * and provides login/logout functions
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch the current user
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
        // Sync with our database
        await fetch('/api/auth/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = () => {
    window.location.href = '/api/auth/login';
  };

  // Logout function
  const logout = () => {
    window.location.href = '/api/auth/logout';
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
