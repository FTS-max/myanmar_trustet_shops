import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

/**
 * API route to sync Auth0 user data with our MongoDB database
 * This is called after successful login/registration with Auth0
 */
export async function POST(req: NextRequest) {
  try {
    // Get the current Auth0 session
    const session = await getSession();
    
    // If no session, user is not authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    const auth0User = session.user;
    
    // Try to find the user in our database
    let user = await User.findOne({ auth0Id: auth0User.sub });
    
    if (user) {
      // Update existing user with latest Auth0 data
      user.name = auth0User.name || '';
      user.email = auth0User.email || '';
      user.picture = auth0User.picture || '';
      await user.save();
    } else {
      // Create a new user record
      user = await User.create({
        auth0Id: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
        picture: auth0User.picture,
        favoriteShops: []
      });
    }

    // Return the user data (without sensitive information)
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        favoriteShops: user.favoriteShops
      }
    });
  } catch (error) {
    console.error('Error syncing user data:', error);
    return NextResponse.json(
      { error: 'Failed to sync user data' },
      { status: 500 }
    );
  }
}
