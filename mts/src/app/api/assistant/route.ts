import { NextRequest, NextResponse } from 'next/server';
import { getChatCompletion } from '@/lib/openai';
import { generateShopContextPrompt } from '@/lib/shopAssistant';

export async function POST(request: NextRequest) {
  try {
    const { message, shopId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate shop-specific context prompt if shopId is provided
    const systemPrompt = shopId 
      ? generateShopContextPrompt(shopId) 
      : 'You are a helpful assistant for Myanmar Trusted Shop, helping users find trusted businesses in Myanmar.';

    // Get response from OpenAI
    const response = await getChatCompletion(message, systemPrompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Assistant API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
