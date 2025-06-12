# Notification System Dependencies

To complete the notification system setup, you need to install the following dependencies:

## Required Dependencies

```bash
npm install date-fns react-icons
```

### Dependencies Explanation:

1. **date-fns** - For formatting notification timestamps (e.g., "2 minutes ago")
2. **react-icons** - For notification icons (FiBell, FiCheck, etc.)

## Already Available Dependencies

The following dependencies are already available in your project:
- `@auth0/nextjs-auth0` - For user authentication
- `mongodb` - For notification storage
- `next` - For API routes and React framework
- `react` - For React components
- `tailwindcss` - For styling

## Installation Command

Run this command in your project root directory:

```bash
cd c:\Users\HP\OneDrive\Myanmar_Trusted_Shop\mts
npm install date-fns react-icons
```

## Verification

After installation, you can verify the dependencies are installed by checking your `package.json` file or running:

```bash
npm list date-fns react-icons
```

## Next Steps

Once dependencies are installed:
1. Start your development server: `npm run dev`
2. Visit `/demo/notifications` to test the notification system
3. Check the notification bell in the header
4. Visit `/notifications` for the full notifications page

## File Structure Created

```
src/
├── components/
│   ├── notifications/
│   │   ├── NotificationProvider.tsx
│   │   └── NotificationBell.tsx
│   └── demo/
│       └── NotificationDemo.tsx
├── hooks/
│   └── useNotifications.ts
├── services/
│   └── notificationService.ts
├── app/
│   ├── api/
│   │   └── notifications/
│   │       └── route.ts
│   ├── notifications/
│   │   └── page.tsx
│   └── demo/
│       └── notifications/
│           └── page.tsx
└── layout.tsx (updated)
```