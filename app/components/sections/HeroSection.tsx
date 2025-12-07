'use client';

import { ArrowRight } from 'lucide-react';
import { HeroTranslations } from '../../types/translations';

interface HeroSectionProps {
  translations: HeroTranslations;
}

export default function HeroSection({ translations }: HeroSectionProps) {
  return (
    <article className="relative group col-span-1 md:col-span-2 row-span-2 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-all duration-500 slide-up animate-delay-100">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
        <div className="flex justify-between items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
            <span className="animate-pulse h-2 w-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-medium text-white tracking-wide uppercase">
              {translations.status}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4 leading-[1.1]">
            {translations.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white">
              {translations.title2}
            </span>
          </h1>
          <p className="max-w-md text-lg text-neutral-300 font-light mb-8">
            {translations.description}
          </p>

          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-neutral-950 hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6" />
            </button>
            <span className="text-sm font-medium text-white">{translations.cta}</span>
          </div>
        </div>
      </div>
    </article>
  );
}