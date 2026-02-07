import React from 'react';
import { Sparkles, Play, ArrowRight, Star, Mic, Heart } from 'lucide-react';
import SignUp from './SignUpButton';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <div className="flex items-center gap-2 bg-[#E8F0E8] w-fit px-3 py-1 rounded-full border border-[#D0E0D0] mb-6">
            <Sparkles className="w-4 h-4 text-[#4C7C4C]" />
            <span className="text-xs font-bold text-[#4C7C4C] uppercase tracking-widest">AI-Powered Campus Dining</span>
          </div>
          
          <h1 className="text-6xl font-bold leading-tight mb-6 text-slate-900">
            Eat smarter.<br />
            <span className="text-[#4C7C4C]">Feel better.</span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-10 max-w-md leading-relaxed">
            Voice-powered recommendations that understand your mood, dietary needs, and nutrition goals.
          </p>

          <div className="flex gap-4 mb-16">
            {/* The scrollable/rounded button style from image 1 */}
            <SignUp className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-black transition-all" />
            <button className="bg-white border border-slate-200 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all">
              <div className="bg-slate-100 p-1 rounded-full"><Play className="w-3 h-3 fill-slate-600 text-slate-600" /></div>
              Watch demo
            </button>
          </div>

          <div className="flex gap-10 border-t border-slate-100 pt-8">
            <div><div className="text-2xl font-bold">2,400+</div><div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Active users</div></div>
            <div className="border-l border-slate-100 pl-10"><div className="text-2xl font-bold">50K+</div><div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Meals tracked</div></div>
            <div className="border-l border-slate-100 pl-10"><div className="text-2xl font-bold flex items-center gap-1">4.9 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /></div><div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Rating</div></div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-2">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" alt="Food" className="w-full aspect-[4/5] object-cover" />
          </div>
          {/* Floating UI Badges from image 1 */}
          <div className="absolute top-20 -left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-xl"><Mic className="w-5 h-5 text-green-600" /></div>
            <div className="text-xs font-bold">Voice Analysis<br/><span className="text-slate-400 font-normal">Mood: Energetic</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}