# OpenAI Integration Update

## Changes Made

1. Modified `src/lib/openai.ts` to:
   - Allow browser usage by setting `dangerouslyAllowBrowser: true`
   - Use the `NEXT_PUBLIC_` prefixed environment variable

2. Updated `.env.local` to use `NEXT_PUBLIC_OPENAI_API_KEY` instead of `OPENAI_API_KEY`

## Important Notes About Environment Variables in Next.js

### Client-Side vs Server-Side Environment Variables

In Next.js, environment variables work differently depending on where they're accessed:

- **Server-side only**: Regular environment variables (without `NEXT_PUBLIC_` prefix) are only available on the server side and are not exposed to the browser.

- **Client-side accessible**: Variables prefixed with `NEXT_PUBLIC_` are embedded into the JavaScript bundle during build time and are accessible in browser code.

### Security Considerations

- Using `NEXT_PUBLIC_OPENAI_API_KEY` means your API key is exposed in the client-side code and can be viewed by anyone inspecting your site's JavaScript.

- For production, consider implementing a more secure approach:
  1. Create a server-side API route that makes OpenAI calls
  2. Call this route from your client components instead of directly calling OpenAI
  3. Keep your API key secure on the server side

### Example of a More Secure Implementation

1. Create an API route (e.g., `pages/api/chat.js` or `app/api/chat/route.js`)
2. Move OpenAI calls to this server-side route
3. Call this route from your client components

## Restart Required

After changing environment variables, you need to restart your Next.js development server for the changes to take effect.

```bash
# Stop the current server (Ctrl+C) and restart it
npm run dev
# or
yarn dev
# or
pnpm dev
```
