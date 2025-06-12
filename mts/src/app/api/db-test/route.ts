import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

/**
 * API route to test MongoDB connection
 */
export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Check if we can get the admin database
    const adminDb = db.admin();
    const result = await adminDb.serverStatus();
    
    // Return success response
    return NextResponse.json({
      status: 'success',
      message: 'Connected to MongoDB',
      version: result.version
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
