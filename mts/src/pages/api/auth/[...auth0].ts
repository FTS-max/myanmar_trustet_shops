import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    returnTo: '/dashboard'
  }),
  callback: handleCallback({
    redirectUri: '/api/auth/callback'
  }),
  logout: handleLogout({
    returnTo: '/'
  })
});
