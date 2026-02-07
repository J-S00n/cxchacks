import React from 'react';
import { Utensils } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-xs text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#4C7C4C] p-1 rounded-md">
              <Utensils className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-slate-900">FoodieTrack</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering campus dining with AI. Join thousands of students eating smarter every day.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div>
            <h5 className="font-bold text-sm mb-6 text-slate-900">Product</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-[#4C7C4C]">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-[#4C7C4C]">How It Works</a></li>
              <li><a href="#" className="hover:text-[#4C7C4C]">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-6 text-slate-900">Company</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#4C7C4C]">About</a></li>
              <li><a href="#" className="hover:text-[#4C7C4C]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#4C7C4C]">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} FoodieTrack. All rights reserved.
      </div>
    </footer>
  );
}