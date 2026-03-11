import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Heart, Sparkles, Instagram, Mail } from "lucide-react";
// AuthGuard import removed

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 via-orange-50/30 to-emerald-50 flex flex-col">
      <style>
        {`
            :root {
              --sage: #87a96b;
              --sage-light: #a8c085;
              --sage-dark: #6b8054;
              --cream: #faf8f3;
              --warm-gray: #8b7355;
            }
            
            /* Additional warm gradient backgrounds */
            .warm-gradient-1 {
              background: linear-gradient(135deg, #fef7ed 0%, #fff7ed 25%, #fef3c7 50%, #ecfdf5 100%);
            }
            
            .warm-gradient-2 {
              background: linear-gradient(to bottom right, #f5f5f4 0%, #fef3c7 25%, #fed7aa 50%, #f0fdf4 100%);
            }
          `}
      </style>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Search")} className="flex items-center gap-3 group">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb05cf46a_NotBoughtLogo.png" 
                alt="NotBought Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">NotBought</h1>
                <p className="text-xs text-stone-500 -mt-0.5">PE-Free Business Finder</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to={createPageUrl("Search")} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === createPageUrl("Search") 
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                    : 'text-stone-600 hover:text-emerald-600 hover:bg-amber-50'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="font-medium">Search</span>
              </Link>
              <Link 
                to={createPageUrl("Favorites")} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === createPageUrl("Favorites") 
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                    : 'text-stone-600 hover:text-emerald-600 hover:bg-amber-50'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="font-medium">Favorites</span>
              </Link>
            </nav>

            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-4">
              <Link 
                to={createPageUrl("Search")} 
                className={`p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === createPageUrl("Search") 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-stone-600 hover:bg-amber-100'
                }`}
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link 
                to={createPageUrl("Favorites")} 
                className={`p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === createPageUrl("Favorites") 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-stone-600 hover:bg-amber-100'
                }`}
              >
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-amber-900 to-stone-900 text-amber-50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb05cf46a_NotBoughtLogo.png" 
                  alt="NotBought Logo" 
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
                <h2 className="text-xl font-bold text-white tracking-tight">NotBought</h2>
              </div>
              <p className="text-amber-200">
                Supporting independent local businesses and keeping money in your community.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="https://x.com/NotBoughtAI" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-white transition-colors flex items-center justify-center w-5 h-5">
                  <span className="font-bold text-lg">𝕏</span>
                </a>
                <a href="https://www.instagram.com/notbought.ai" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="mailto:info@200lab.co" className="text-amber-300 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Discover</h3>
              <ul className="space-y-3 text-amber-200">
                <li><a href="#" className="hover:text-white transition-colors">Browse Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Featured Businesses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Listings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Local Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">For Businesses</h3>
              <ul className="space-y-3 text-amber-200">
                <li><a href="#" className="hover:text-white transition-colors">List Your Business</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Verification Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <ul className="space-y-3 text-amber-200">
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Why Independent?</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-stone-900 py-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-amber-300">
            <p>&copy; {new Date().getFullYear()} NotBought. Supporting independent businesses everywhere.</p>
            <p className="flex items-center gap-2 mt-2 sm:mt-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Private equity-free since day one
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}