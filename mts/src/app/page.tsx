import Image from 'next/image';
import Link from 'next/link';
import ChatBubble from '@/components/Assistant/ChatBubble';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Chat Bubble Component */}
      <ChatBubble />
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Myanmar Trusted Shop
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover verified and trustworthy shops in Myanmar. Building trust in Myanmar's digital economy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/directory" className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg">
                Explore Shops
              </Link>
              <Link href="/about" className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              {/* Placeholder for hero image - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-blue-500/30 z-10"></div>
              <div className="absolute inset-0 bg-purple-900/20 flex items-center justify-center z-0">
                <span className="text-white/70 text-lg">Trusted Shop Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Trusted Shops?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Verified Businesses</h3>
              <p className="text-gray-600">All shops in our directory are verified for authenticity and reliability.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Discovery</h3>
              <p className="text-gray-600">Find trusted shops easily with our searchable and filterable directory.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-100 hover:border-indigo-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Direct Contact</h3>
              <p className="text-gray-600">Connect directly with businesses through verified contact information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shops Preview */}
      <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Shops</h2>
            <Link href="/directory" className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Shop Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100 hover:border-purple-200">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Shop Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Verified</span>
                  <span className="ml-2 text-sm text-gray-500">Retail</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Myanmar Fashion Hub</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Quality clothing and accessories from local designers with nationwide delivery.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Yangon, Myanmar</span>
                  <Link href="/shop/1" className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Shop Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100 hover:border-blue-200">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Shop Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Verified</span>
                  <span className="ml-2 text-sm text-gray-500">Electronics</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tech Valley Myanmar</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Authorized dealer for premium electronics with warranty and after-sales support.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Mandalay, Myanmar</span>
                  <Link href="/shop/2" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Shop Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100 hover:border-indigo-200">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Shop Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Verified</span>
                  <span className="ml-2 text-sm text-gray-500">Food & Beverage</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Taste of Myanmar</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Authentic Myanmar cuisine ingredients and prepared foods with hygienic packaging.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Naypyidaw, Myanmar</span>
                  <Link href="/shop/3" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Trusted Shops?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Explore our directory of verified businesses in Myanmar and shop with confidence.
          </p>
          <Link href="/shops" className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-lg font-medium text-lg transition duration-300 inline-block shadow-md hover:shadow-lg">
            Browse Directory
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-8 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Myanmar Trusted Shop</h3>
              <p className="text-gray-400 mt-1">Building trust in Myanmar's digital economy</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition duration-300">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Myanmar Trusted Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
