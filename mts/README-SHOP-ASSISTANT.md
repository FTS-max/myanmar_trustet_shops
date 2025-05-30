# Shop Assistant Integration for Myanmar Trusted Shop

## Overview

The Shop Assistant is an AI-powered chat interface that provides contextual information about specific shops to users. It enhances the user experience by offering personalized assistance based on the shop being viewed.

## Features

- **Shop-Specific Context**: The assistant uses detailed information about the current shop to provide relevant responses
- **Trust Level Explanations**: Helps users understand what different trust levels mean
- **Navigation Assistance**: Guides users on how to find the shop using Google Maps
- **Social Media Connections**: Assists users in connecting with shops on various platforms
- **Product & Service Information**: Provides details about what the shop offers

## Components

1. **ShopAssistant.tsx**: The main chat interface component that displays messages and handles user input
2. **ShopAssistantButton.tsx**: A floating button component that toggles the chat interface
3. **shopAssistant.ts**: Helper functions for generating shop-specific context for the AI

## Implementation

The shop assistant has been integrated into the shop detail pages. When a user views a specific shop, they'll see a chat button in the bottom-right corner that opens the assistant.

### How It Works

1. When a user opens the chat on a shop page, the assistant retrieves the shop ID from the URL
2. The `generateShopContextPrompt` function creates a detailed context about the shop
3. This context is sent to the OpenAI API as a system prompt
4. The assistant then provides responses that are specific to that shop

## Customization

### Modifying the System Prompt

You can customize how the assistant responds by editing the `generateShopContextPrompt` function in `src/lib/shopAssistant.ts`.

### Styling

The chat interface uses Tailwind CSS for styling. You can modify the appearance by editing the class names in the component files.

## Security Considerations

- The OpenAI API key is stored in environment variables
- For production, consider implementing a server-side API route for OpenAI calls
- Review the OpenAI usage policies to ensure compliance

## Future Enhancements

- Add support for image recognition to help users identify products
- Implement multi-language support for Myanmar's diverse population
- Add voice input/output capabilities
- Integrate with the shop's inventory system for real-time product availability

## Troubleshooting

### Common Issues

1. **Assistant not appearing**: Ensure the ShopAssistantButton component is properly imported and added to the shop detail page
2. **API errors**: Check that your OpenAI API key is correctly set in the environment variables
3. **Context not working**: Verify that the shop ID is being correctly passed to the ShopAssistant component

## Dependencies

- OpenAI API
- React
- Next.js
- Tailwind CSS
