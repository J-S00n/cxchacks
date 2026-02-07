import React from 'react';
import { Zap, Heart, Utensils, ShieldCheck, Star, Mic } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
        <p className="text-slate-500 italic">Smart features that make healthy eating effortless</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Large Green Card */}
        <div className="md:col-span-2 bg-[#4C7C4C] rounded-[32px] p-10 text-white relative group overflow-hidden">
          <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-8"><Zap /></div>
          <h3 className="text-3xl font-bold mb-4">Voice-Powered AI</h3>
          <p className="text-green-50 max-w-sm leading-relaxed">Simply tell us how you're feeling. Our AI analyzes your voice to detect mood and energy levels.</p>
          <Mic className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Small White Cards */}
        <div className="bg-[#EFEEEA] rounded-[32px] p-8 border border-white">
          <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6"><Heart className="text-orange-600" /></div>
          <h4 className="font-bold text-xl mb-2">Nutrition Tracking</h4>
          <p className="text-slate-500 text-sm italic">Track calories, macros, and allergens effortlessly.</p>
        </div>
      </div>
    </section>
  );
}