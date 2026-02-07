import React from 'react';
import { Sparkles, Mic, Heart, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Create Account',
      description: 'Sign up in seconds and set your dietary preferences',
      icon: <Sparkles className="w-6 h-6 text-[#4C7C4C]" />,
    },
    {
      id: '02',
      title: 'Tell Us Your Mood',
      description: 'Use voice or text to share how you\'re feeling today',
      icon: <Mic className="w-6 h-6 text-[#4C7C4C]" />,
    },
    {
      id: '03',
      title: 'Get Recommendations',
      description: 'Receive personalized meal suggestions instantly',
      icon: <Heart className="w-6 h-6 text-[#4C7C4C]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#EFEEEA]/50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How it works</h2>
          <p className="text-slate-500">Three simple steps to better eating</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center group">
              <div className="relative inline-block mb-8">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {step.id}
                </div>
                {idx < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 text-slate-300" />
                )}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-slate-500 text-sm max-w-[200px] mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}