import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Allow browser usage for client components
});

/**
 * Send a message to OpenAI and get a response
 * @param message The user's message
 * @param systemPrompt Optional custom system prompt (e.g., for shop-specific context)
 * @returns The AI response
 */
export async function getChatCompletion(message: string, systemPrompt?: string): Promise<string> {
  try {
    // Default system prompt if none provided
    const defaultSystemPrompt = 'You are a helpful assistant for Myanmar Trusted Shop. Help users: \n- Understand what shops offer\n- Verify shop trustworthiness (based on trust level)\n- Navigate to shops (using Google Map)\n- Connect with shops on social media (Facebook, Viber, Telegram, etc.)\n- Learn more about location, reviews, and contact methods\n\nNever make guarantees about safety, but offer safety tips and how to verify trust.\n\nBe polite, clear, and localized for Myanmar culture and users.';
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt || defaultSystemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 800, // Increased token limit for more detailed responses
    });

    return response.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Sorry, there was an error processing your request. Please try again later.';
  }
}
