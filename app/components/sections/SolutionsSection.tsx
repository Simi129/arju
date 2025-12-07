'use client';

import { BarChart3, MessageSquare } from 'lucide-react';
import { ServicesTranslations, TechnologiesTranslations, StatsTranslations } from '../../types/translations';

interface SolutionsSectionProps {
  servicesTranslations: ServicesTranslations;
  technologiesTranslations: TechnologiesTranslations;
  statsTranslations: StatsTranslations;
}

export default function SolutionsSection({ 
  servicesTranslations, 
  technologiesTranslations,
  statsTranslations 
}: SolutionsSectionProps) {
  return (
    <>
      {/* Business Automation Card */}
      <article className="relative col-span-1 md:col-span-1 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 group transition-all duration-500 slide-up animate-delay-400">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
        {/* Градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-neutral-900/60 to-neutral-900/90 group-hover:from-blue-900/30 transition-colors duration-500"></div>
        
        <div className="p-8 h-full flex flex-col justify-end relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-auto group-hover:scale-110 transition-transform duration-300">
            <BarChart3 size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-medium text-white mb-1">{servicesTranslations.marketing.title}</h3>
          <p className="text-sm text-neutral-300">{servicesTranslations.marketing.subtitle}</p>
        </div>
      </article>

      {/* Marketing Automation Card (Large) - Теперь с анимацией! */}
      <article
        id="solutions"
        className="relative col-span-1 md:col-span-2 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 flex flex-col md:flex-row group transition-all duration-500 slide-up animate-delay-500"
      >
        {/* Фоновое изображение с анимацией */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
        {/* Градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-neutral-900/70 to-neutral-900/90 group-hover:from-pink-900/20 transition-colors duration-500"></div>
        
        <div className="p-8 flex-1 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400 backdrop-blur-sm border border-pink-500/20 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare size={20} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-pink-500/10 text-pink-400 tracking-wide uppercase backdrop-blur-sm border border-pink-500/20">
              {servicesTranslations.marketingAutomation.integrations}
            </span>
          </div>
          <h3 className="text-2xl font-medium text-white mb-3">
            {servicesTranslations.marketingAutomation.title}
          </h3>
          <p className="text-sm text-neutral-300 max-w-md leading-relaxed">
            {servicesTranslations.marketingAutomation.description}
          </p>
        </div>
        
        <div className="p-8 flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 relative z-10">
          <div className="mb-4">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">
              {technologiesTranslations.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {['HubSpot', 'Salesforce', 'Mailchimp', 'ActiveCampaign', 'SendGrid', 'Intercom'].map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-neutral-300 hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Stats Card */}
      <article className="col-span-1 md:col-span-3 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-all duration-500 slide-up animate-delay-600">
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group/stat">
              <div className="text-3xl font-bold text-white mb-1 group-hover/stat:scale-110 transition-transform duration-300">25+</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.clientsScaled}
              </div>
            </div>
            <div className="text-center group/stat">
              <div className="text-3xl font-bold text-white mb-1 group-hover/stat:scale-110 transition-transform duration-300">1,200+</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.hoursSaved}
              </div>
            </div>
            <div className="text-center group/stat">
              <div className="text-3xl font-bold text-white mb-1 group-hover/stat:scale-110 transition-transform duration-300">99.8%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.systemUptime}
              </div>
            </div>
            <div className="text-center group/stat">
              <div className="text-3xl font-bold text-white mb-1 group-hover/stat:scale-110 transition-transform duration-300">340%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.avgROI}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}