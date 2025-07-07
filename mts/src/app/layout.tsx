import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import AuthButtons from "@/components/auth/AuthButtons";
import AuthProvider from "@/components/auth/AuthProvider";
import NotificationProvider from "@/components/notifications/NotificationProvider";
import NotificationBell from "@/components/notifications/NotificationBell";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export const metadata: Metadata = {
  title: "Myanmar Trusted Shop | Verified Businesses in Myanmar",
  description: "Discover verified and trustworthy shops in Myanmar. Building trust in Myanmar's digital economy.",
  keywords: "Myanmar, trusted shops, verified businesses, online directory, Myanmar businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NotificationProvider>
            <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Myanmar Trusted Shop</span>
                </Link>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-8">
                {/* Navigation links removed as requested */}
              </nav>
              
              {/* Notifications and Auth */}
              <div className="flex items-center space-x-4">
                <NotificationBell />
                <AuthButtons />
              </div>

            </div>
          </div>
            </header>
            {children}
          </NotificationProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
