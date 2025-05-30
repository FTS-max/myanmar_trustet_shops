# OpenAI Integration for Myanmar Trusted Shop

This document provides instructions for setting up and using the OpenAI integration in the Myanmar Trusted Shop chat feature.

## Setup

1. **Install OpenAI Package**

   ```bash
   npm install openai
   ```

2. **Configure Environment Variables**

   Create or update your `.env.local` file in the project root with your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key.

3. **Restart Development Server**

   After setting up the environment variables, restart your development server:

   ```bash
   npm run dev
   ```

## Usage

The chat feature is now integrated with OpenAI's API. When users send messages through the chat bubble, the application will:

1. Send the user's message to OpenAI's API
2. Display a loading indicator while waiting for a response
3. Show the AI-generated response in the chat interface

## Customization

### Modifying the System Prompt

You can customize the AI's behavior by modifying the system prompt in `src/lib/openai.ts`. Look for the following code:

```typescript
{
  role: 'system',
  content: 'You are a helpful assistant for Myanmar Trusted Shop, providing information about verified businesses in Myanmar.'
}
```

### Changing the Model

By default, the integration uses the `gpt-3.5-turbo` model. You can change this by modifying the `model` parameter in the `getChatCompletion` function in `src/lib/openai.ts`.

### Adjusting Response Parameters

You can adjust parameters like `temperature` and `max_tokens` in the `getChatCompletion` function to control the AI's response characteristics.

## Troubleshooting

- **API Key Issues**: Ensure your API key is correctly set in the `.env.local` file and that you've restarted the development server after making changes.
- **Rate Limiting**: If you encounter rate limiting issues, consider implementing a queueing system or adding retry logic.
- **Error Handling**: The current implementation includes basic error handling. You may want to enhance this for production use.

## Security Considerations

- Never expose your API key in client-side code
- The current implementation uses server-side API calls via Next.js API routes
- Consider implementing additional security measures for production use
