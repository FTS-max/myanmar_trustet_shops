# Google Maps Integration Setup

## Overview
This project uses Google Maps to display shop locations. The integration is implemented using the Google Maps Embed API, which allows for simple map embedding without requiring complex JavaScript libraries.

## Setup Instructions

### 1. Get a Google Maps API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to APIs & Services > Library
4. Enable the following APIs:
   - Maps JavaScript API
   - Maps Embed API
5. Go to APIs & Services > Credentials
6. Create an API key
7. (Optional but recommended) Restrict the API key to only the Maps Embed API and your website's domain

### 2. Configure the API Key in the Project
1. Open the `.env.local` file in the project root
2. Replace the placeholder value for `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Save the file
4. Restart the development server if it's running

## Usage
The Google Maps integration is used in the `ShopDetail.tsx` component to display the location of each shop. The map is centered on the shop's coordinates and includes a marker at that location.

## Troubleshooting
- If the map doesn't appear, check that your API key is correctly set in the `.env.local` file
- Ensure that the Maps Embed API is enabled for your project in the Google Cloud Console
- Check the browser console for any error messages related to the Google Maps API

## Future Enhancements
- Add custom markers for shop locations
- Implement directions functionality
- Add street view option
- Display multiple shop locations on a single map
