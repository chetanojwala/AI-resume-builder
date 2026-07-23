import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Senior Product Manager @ Stripe',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      text: 'ResumAI helped me format my product accomplishments with exact metric figures. Landed 4 interviews within 48 hours!',
    },
    {
      name: 'David Chen',
      role: 'Full Stack Developer @ Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'The ATS score analyzer gave me instant feedback on missing keywords. The PDF output renders flawlessly with zero page break glitches.',
    },
    {
      name: 'Elena Rostova',
      role: 'Data Analyst @ Airbnb',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: 'The AI Bullet Point Enhancer turned my simple job tasks into quantitative achievements. Highly recommended!',
    },
  ];

  return (
    <section className="py-16 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Loved by Candidates at Top Tech Companies</h2>
          <p className="text-xs text-slate-500 mt-2">Join thousands of job seekers who landed dream offers using ResumAI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-brand-500/30" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
