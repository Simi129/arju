'use client';

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
      {/* Digital Marketing Visual Card */}
      <article className="relative col-span-1 md:col-span-1 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 group slide-up animate-delay-400">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-neutral-900/60 hover:bg-neutral-900/50 transition-colors"></div>
        <div className="p-8 h-full flex flex-col justify-end relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v-6M6 20V10M18 20V4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-1">{servicesTranslations.marketing.title}</h3>
          <p className="text-sm text-neutral-300">{servicesTranslations.marketing.subtitle}</p>
        </div>
      </article>

      {/* Marketing Automation Card (Large) */}
      <article
        id="solutions"
        className="relative col-span-1 md:col-span-2 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 flex flex-col md:flex-row slide-up animate-delay-500"
      >
        <div className="p-8 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-pink-500/10 text-pink-400 tracking-wide uppercase">
              {servicesTranslations.marketingAutomation.integrations}
            </span>
          </div>
          <h3 className="text-2xl font-medium text-white mb-3">
            {servicesTranslations.marketingAutomation.title}
          </h3>
          <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
            {servicesTranslations.marketingAutomation.description}
          </p>
        </div>
        <div className="p-8 flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
          <div className="mb-4">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
              {technologiesTranslations.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {['HubSpot', 'Salesforce', 'Mailchimp', 'ActiveCampaign', 'SendGrid', 'Intercom'].map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Stats Card */}
      <article className="col-span-1 md:col-span-3 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 slide-up animate-delay-500">
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.clientsScaled}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1,200+</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.hoursSaved}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99.8%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {statsTranslations.systemUptime}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">340%</div>
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