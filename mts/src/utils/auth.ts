import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

// User type that matches Auth0 user structure
type User = {
  name?: string;
  email?: string;
  sub?: string;
  picture?: string;
};

// Try to import Auth0 hooks, but handle the case where it's not installed
let auth0UseUser: () => { user: User | null | undefined; error: Error | undefined; isLoading: boolean } | null = null;
let auth0GetSession: (req: any, res: any) => Promise<{ user: User | null | undefined }> | null = null;

try {
  // Dynamic import to avoid build errors when the package is not installed
  const auth0 = require('@auth0/nextjs-auth0');
  auth0UseUser = auth0.useUser;
  auth0GetSession = auth0.getSession;
} catch (error) {
  console.warn('Auth0 package not installed. Authentication will be mocked.');
  // Functions remain null
}

// Hook to get current user
export const useAuth = () => {
  // If Auth0 is installed, use its hook
  if (auth0UseUser) {
    const { user, error, isLoading } = auth0UseUser();
    return {
      user,
      isAuthenticated: !!user,
      isLoading,
      error
    };
  }
  
  // Mock implementation when Auth0 is not installed
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    user: null,
    isAuthenticated: false,
    isLoading,
    error: null
  };
};

// Server-side function to check authentication
export const requireAuth = async (context: GetServerSidePropsContext) => {
  // If Auth0 is installed, use its session
  if (auth0GetSession) {
    try {
      const session = await auth0GetSession(context.req, context.res);
      
      // If user is authenticated, return nothing (continue)
      if (session?.user) {
        return { props: {} };
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }
  
  // If not authenticated or Auth0 is not installed, redirect to home
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

// Function to get user profile
export const getUserProfile = async (context: GetServerSidePropsContext) => {
  // If Auth0 is installed, use its session
  if (auth0GetSession) {
    try {
      const session = await auth0GetSession(context.req, context.res);
      return session?.user || null;
    } catch (error) {
      console.error('Error getting user profile:', error);
    }
  }
  
  // If Auth0 is not installed, return null
  return null;
};
