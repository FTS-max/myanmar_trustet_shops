# Auth0 Authentication Setup Guide

This guide explains how to set up and use the Auth0 authentication system in the Myanmar Trusted Shop application.

## Prerequisites

1. Node.js and npm installed
2. An Auth0 account (you can sign up for free at [Auth0](https://auth0.com/))

## Setup Steps

### 1. Install Dependencies

Install the Auth0 Next.js SDK:

```bash
npm install @auth0/nextjs-auth0
```

### 2. Configure Auth0

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new application or select an existing one
3. Set the application type to "Regular Web Application"
4. Configure the following URLs:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`

### 3. Set Environment Variables

Create a `.env.local` file in the root of your project with the following variables (copy from `.env.local.example`):

```
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
```

Replace the placeholder values with your actual Auth0 credentials.

### 4. Understanding the Authentication Flow

1. **Login Process**:
   - User clicks the "Login" button
   - A popup asks if they are a partnership shop
   - If they click "Yes", they proceed to the Auth0 login page
   - After successful authentication, they are redirected to the dashboard

2. **Registration Process**:
   - User clicks the "Register" button
   - A popup form collects shop information
   - After form submission, they are redirected to Auth0 signup
   - After successful registration, they are redirected to the dashboard

### 5. Protecting Routes

To protect routes and ensure only authenticated users can access them, use the `useAuth` hook from `@/utils/auth`.

Example usage in a page component:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/auth';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Rest of your component
}
```

## Components Overview

### AuthProvider

Wraps your application with Auth0's UserProvider to enable authentication throughout the app.

### LoginPopup

Displays a popup asking if the user is a partnership shop before proceeding to Auth0 login.

### RegisterPopup

Displays a form to collect shop information before redirecting to Auth0 signup.

## Security Considerations

1. **Environment Variables**: Never commit your `.env.local` file to version control.
2. **Content Security Policy**: The application includes security headers to protect against common web vulnerabilities.
3. **HTTPS**: Always use HTTPS in production environments.
4. **Token Handling**: Auth0 SDK handles token storage and validation securely.

## Customization

### Styling

The authentication components use Tailwind CSS for styling. You can customize the appearance by modifying the class names in the component files.

### Auth0 Rules

You can add custom logic to the authentication process using Auth0 Rules, Actions, or Hooks in your Auth0 Dashboard.

## Troubleshooting

1. **Callback URL Errors**: Ensure your callback URLs are correctly configured in Auth0.
2. **Session Issues**: Check that your AUTH0_SECRET is properly set and is at least 32 characters long.
3. **API Access**: If you need to access Auth0 Management API, you'll need to set up additional permissions.

## Additional Resources

- [Auth0 Next.js SDK Documentation](https://auth0.github.io/nextjs-auth0/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
