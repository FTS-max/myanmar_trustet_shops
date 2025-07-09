import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

/**
 * API route to test MongoDB connection
 */
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    
    if (!mongoose.connection.db) {
      throw new Error("Database not connected");
    }
    // Check if we can get the admin database
    const adminDb = mongoose.connection.db.admin();
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
