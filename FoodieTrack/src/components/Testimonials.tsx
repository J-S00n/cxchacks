import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah K.",
      role: "Engineering Student",
      quote: "FoodieTrack completely changed how I eat on campus. The voice feature is so intuitive!",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Marcus T.",
      role: "Business Major",
      quote: "Finally an app that understands my dietary restrictions. No more guessing games at the cafeteria.",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    {
      name: "Emily R.",
      role: "Pre-Med Student",
      quote: "The nutrition tracking helps me stay on top of my health goals while managing a busy schedule.",
      avatar: "https://i.pravatar.cc/150?u=emily"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
      <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
        See what our community has to say
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-600 mb-8 italic leading-relaxed text-sm">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} className="w-10 h-10 rounded-full bg-slate-200" alt={t.name} />
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}