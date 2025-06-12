import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

/**
 * API route to handle user registration
 * This will create a new user in our MongoDB database
 */
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get user data from request body
    const userData = await req.json();
    
    // Validate required fields
    const requiredFields = ['email', 'name'];
    for (const field of requiredFields) {
      if (!userData[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create a new user
    // Note: In a real implementation, we would create the user in Auth0 first
    // and then store the Auth0 ID in our database
    const newUser = new User({
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      role: userData.role || 'user', // Default to 'user' role
    });
    
    // Save the user to the database
    await newUser.save();
    
    // Return success response
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
