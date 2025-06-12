import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Simple Auth0 API route handler for Pages Router
 * This is a placeholder to fix build errors with Auth0 SDK
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the auth0 path parameter
  const { auth0 } = req.query;
  
  // Handle different auth routes
  if (Array.isArray(auth0)) {
    const action = auth0[0];
    
    switch (action) {
      case 'login':
        // Redirect to App Router auth endpoint
        res.redirect('/api/auth/login');
        break;
        
      case 'callback':
        // Redirect to App Router callback endpoint
        res.redirect('/api/auth/callback');
        break;
        
      case 'logout':
        // Redirect to App Router logout endpoint
        res.redirect('/api/auth/logout');
        break;
        
      case 'me':
        // Redirect to App Router me endpoint
        res.redirect('/api/auth/me');
        break;
        
      default:
        res.status(400).json({ error: 'Invalid auth route' });
    }
  } else {
    res.status(400).json({ error: 'Invalid auth route' });
  }
}
