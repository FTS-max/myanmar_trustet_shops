import { getSession } from '@auth0/nextjs-auth0/server';
import { useUser } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';

export const useAuth = () => {
  const { user, error, isLoading } = useUser();
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
  };
};

export const requireAuth = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context.req, context.res);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export const getUserProfile = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context.req, context.res);
  return session?.user || null;
};