'use client';

import { Workflow, Bot } from 'lucide-react';
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
        className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-all duration-500 slide-up animate-delay-200"
      >
        {/* Оптимизированное фоновое изображение */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 md:group-hover:scale-110 transition-transform duration-700 bg-[url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=60&w=800&auto=format&fit=crop')] md:bg-[url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop')]"></div>
        {/* Градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-neutral-900/70 to-neutral-900/90 group-hover:from-indigo-900/30 transition-colors"></div>
        
        <div className="p-8 h-full flex flex-col justify-between relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 md:group-hover:scale-110 transition-transform backdrop-blur-sm">
            <Workflow size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">{translations.automation.title}</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {translations.automation.description}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-300 backdrop-blur-sm">Zapier</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-300 backdrop-blur-sm">Make</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-300 backdrop-blur-sm">Python</span>
          </div>
        </div>
      </article>

      {/* AI Integration Card */}
      <article className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-all duration-500 slide-up animate-delay-300">
        {/* Оптимизированное фоновое изображение */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 md:group-hover:scale-110 transition-transform duration-700 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=60&w=800&auto=format&fit=crop')] md:bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop')]"></div>
        {/* Градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-neutral-900/70 to-neutral-900/90 group-hover:from-purple-900/30 transition-colors"></div>
        
        <div className="p-8 h-full flex flex-col justify-between relative z-10">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 md:group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Bot size={24} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded backdrop-blur-sm border border-purple-400/20">HOT</span>
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">{translations.ai.title}</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {translations.ai.description}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}