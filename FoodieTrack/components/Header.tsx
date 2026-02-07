import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Utensils } from 'lucide-react';
import Login from './LoginButton';
import Logout from './LogoutButton';

export default function Header() {
  const { isAuthenticated } = useAuth0();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#4C7C4C] p-1.5 rounded-lg">
            <Utensils className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">FoodieTrack</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-[#4C7C4C]">Features</a>
          <a href="#how-it-works" className="hover:text-[#4C7C4C]">How It Works</a>
          <a href="#testimonials" className="hover:text-[#4C7C4C]">Testimonials</a>
        </div>

        <div>
          {isAuthenticated ? (
            <Logout className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold hover:bg-slate-50 transition-all" />
          ) : (
            <Login className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold hover:bg-slate-50 transition-all" />
          )}
        </div>
      </div>
    </nav>
  );
}