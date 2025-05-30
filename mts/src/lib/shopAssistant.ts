import { Shop, getShopById, TrustLevel } from './data';

/**
 * Generates a context-aware system prompt for the OpenAI assistant based on the current shop
 * @param shopId The ID of the shop being viewed
 * @returns A customized system prompt with shop-specific information
 */
export function generateShopContextPrompt(shopId: string): string {
  const shop = getShopById(shopId);
  
  if (!shop) {
    return 'You are a helpful assistant for Myanmar Trusted Shop. Help users find verified and trustworthy shops in Myanmar.';
  }
  
  // Create a detailed context about the shop for the AI
  const trustLevelInfo = getTrustLevelDescription(shop.trustLevel);
  
  return `You are a helpful assistant for Myanmar Trusted Shop, currently providing information about ${shop.name}.

Shop Information:
- Name: ${shop.name}
- Description: ${shop.description}
- Trust Level: ${shop.trustLevel} (${trustLevelInfo})
- Verified Since: ${shop.verificationDate}
- Categories: ${shop.categories.join(', ')}
- Products: ${shop.products.join(', ')}
- Services: ${shop.services.join(', ')}
- Location: ${shop.location.address}, ${shop.location.township}, ${shop.location.city}, ${shop.location.state}
- Business Hours: ${formatBusinessHours(shop.businessHours)}
- Average Rating: ${shop.averageRating} (from ${shop.reviewCount} reviews)

Help users:
- Understand what this shop offers (products and services)
- Verify if the shop is trustworthy based on its trust level
- Navigate to the shop using Google Maps (${shop.location.googleMapsUrl})
- Connect with the shop on social media (${formatSocialMedia(shop.contactInfo.socialMedia)})
- Learn more about the shop's location, reviews, and contact methods

Never make guarantees about safety, but offer safety tips and how to verify trust.

Be polite, clear, and localized for Myanmar culture and users.`;
}

/**
 * Provides a description of what each trust level means
 * @param trustLevel The trust level enum value
 * @returns A description of the trust level
 */
function getTrustLevelDescription(trustLevel: TrustLevel): string {
  switch (trustLevel) {
    case TrustLevel.BRONZE:
      return 'Basic verification completed. The shop has been verified for contact information and physical location.';
    case TrustLevel.SILVER:
      return 'Intermediate verification. The shop has been operating for at least 1 year with positive customer feedback.';
    case TrustLevel.GOLD:
      return 'Advanced verification. The shop has a strong track record, verified business registration, and excellent customer service.';
    case TrustLevel.PLATINUM:
      return 'Highest verification level. The shop has been thoroughly vetted, has an exceptional reputation, and meets all quality standards.';
    default:
      return 'Verification status unknown.';
  }
}

/**
 * Formats business hours into a readable string
 * @param hours The business hours object
 * @returns A formatted string of business hours
 */
function formatBusinessHours(hours: any): string {
  if (!hours) return 'Not available';
  
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const formattedHours = daysOfWeek
    .filter(day => hours[day])
    .map(day => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours[day]}`)
    .join(', ');
  
  return formattedHours || 'Not available';
}

/**
 * Formats social media links into a readable string
 * @param socialMedia The social media object
 * @returns A formatted string of social media platforms
 */
function formatSocialMedia(socialMedia: any): string {
  if (!socialMedia) return 'Not available';
  
  const platforms = Object.keys(socialMedia)
    .filter(platform => socialMedia[platform])
    .map(platform => platform.charAt(0).toUpperCase() + platform.slice(1))
    .join(', ');
  
  return platforms || 'Not available';
}
