'use client';

import { ServicesTranslations } from '../../types/translations';

interface ExpertiseSectionProps {
  translations: ServicesTranslations;
}

export default function ExpertiseSection({ translations }: ExpertiseSectionProps) {
  return (
    <>
      {/* Business Automation Card */}
      <article
        id="expertise"
        className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 slide-up animate-delay-200"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-8 h-full flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="8" height="8" x="3" y="3" rx="2"></rect>
              <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
              <rect width="8" height="8" x="13" y="13" rx="2"></rect>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">{translations.automation.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {translations.automation.description}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Zapier</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Make</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Python</span>
          </div>
        </div>
      </article>

      {/* AI Integration Card */}
      <article className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 slide-up animate-delay-300">
        <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="p-8 h-full flex flex-col justify-between relative z-10">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            </div>
            <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded">HOT</span>
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">{translations.ai.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {translations.ai.description}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}