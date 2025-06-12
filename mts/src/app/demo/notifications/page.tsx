import React from 'react';
import NotificationDemo from '@/components/demo/NotificationDemo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notification System Demo | Myanmar Trusted Shop',
  description: 'Test and explore the notification system features of Myanmar Trusted Shop.',
};

const NotificationDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notification System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the comprehensive notification system that keeps users informed about orders, 
            shop updates, payments, and important alerts in real-time.
          </p>
        </div>
        
        <NotificationDemo />
        
        <div className="mt-12 bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification System Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Real-time Notifications</h3>
              <p className="text-sm text-blue-800">
                Instant notifications for orders, payments, shop updates, and system alerts.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Persistent Storage</h3>
              <p className="text-sm text-green-800">
                Notifications are stored in MongoDB and synced across devices and sessions.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Smart Categorization</h3>
              <p className="text-sm text-purple-800">
                Different notification types with appropriate icons, colors, and actions.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Interactive UI</h3>
              <p className="text-sm text-yellow-800">
                Bell icon with unread count, dropdown preview, and dedicated notifications page.
              </p>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Action Links</h3>
              <p className="text-sm text-red-800">
                Notifications can include action URLs to navigate users to relevant pages.
              </p>
            </div>
            
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Service Integration</h3>
              <p className="text-sm text-indigo-800">
                Easy-to-use notification service for triggering notifications from anywhere in the app.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Technical Implementation</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Frontend:</strong> React Context API for state management</li>
              <li>• <strong>Backend:</strong> Next.js API routes with MongoDB integration</li>
              <li>• <strong>Authentication:</strong> Auth0 integration for user-specific notifications</li>
              <li>• <strong>UI Components:</strong> Tailwind CSS with responsive design</li>
              <li>• <strong>Icons:</strong> React Icons (Feather Icons) for consistent iconography</li>
              <li>• <strong>Persistence:</strong> Local storage backup with API synchronization</li>
              <li>• <strong>Auto-refresh:</strong> Periodic updates every 30 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemoPage;