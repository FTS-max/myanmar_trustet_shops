import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Collection, ObjectId } from 'mongodb';
import { getSession } from '@auth0/nextjs-auth0';

interface Notification {
  _id?: ObjectId;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'shop';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

interface NotificationFilter {
  userId: string;
  read?: boolean;
}

// GET - Fetch notifications for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request, new NextResponse());
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const skip = (page - 1) * limit;

    const { db } = await dbConnect();
    const collection = db.collection<Notification>('notifications');

    const filter: NotificationFilter = { userId: session.user.sub };
    if (unreadOnly) {
      filter.read = false;
    }

    const notifications = await collection
      .find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(filter);
    const unreadCount = await collection.countDocuments({
      userId: session.user.sub,
      read: false
    });

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request, new NextResponse());
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, message, type = 'info', actionUrl, metadata, targetUserId } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const { db } = await dbConnect();
    const collection = db.collection<Notification>('notifications');

    const notification: Notification = {
      userId: targetUserId || session.user.sub, // Allow creating notifications for other users (admin feature)
      title,
      message,
      type,
      read: false,
      timestamp: new Date(),
      ...(actionUrl && { actionUrl }),
      ...(metadata && { metadata })
    };

    const result = await collection.insertOne(notification);
    const createdNotification = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json(createdNotification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PATCH - Update notification (mark as read/unread)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession(request, new NextResponse());
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notificationId, read, markAllAsRead } = body;

    const { db } = await dbConnect();
    const collection = db.collection<Notification>('notifications');

    if (markAllAsRead) {
      // Mark all notifications as read for the user
      const result = await collection.updateMany(
        { userId: session.user.sub, read: false },
        { $set: { read: true } }
      );
      
      return NextResponse.json({ 
        message: 'All notifications marked as read',
        modifiedCount: result.modifiedCount 
      });
    }

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    const result = await collection.updateOne(
      { 
        _id: new ObjectId(notificationId),
        userId: session.user.sub // Ensure user can only update their own notifications
      },
      { $set: { read: read !== undefined ? read : true } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Notification updated successfully' });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// DELETE - Delete notification(s)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession(request, new NextResponse());
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');
    const clearAll = searchParams.get('clearAll') === 'true';

    const { db } = await dbConnect();
    const collection = db.collection<Notification>('notifications');

    if (clearAll) {
      // Delete all notifications for the user
      const result = await collection.deleteMany({
        userId: session.user.sub
      });
      
      return NextResponse.json({ 
        message: 'All notifications cleared',
        deletedCount: result.deletedCount 
      });
    }

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(notificationId),
      userId: session.user.sub // Ensure user can only delete their own notifications
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}