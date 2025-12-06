'use client';

import { useState } from 'react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import { Language, translations } from './translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <div className="min-h-full">
      {/* Ambient Background */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-neutral-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Main Grid Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] lg:auto-rows-[340px] gap-4">
          {/* 1. Hero Card (Large) */}
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
                    {t.hero.status}
                  </span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4 leading-[1.1]">
                  {t.hero.title1} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white">
                    {t.hero.title2}
                  </span>
                </h1>
                <p className="max-w-md text-lg text-neutral-300 font-light mb-8">
                  {t.hero.description}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-neutral-950 hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  <span className="text-sm font-medium text-white">{t.hero.cta}</span>
                </div>
              </div>
            </div>
          </article>

          {/* 2. Business Automation Card */}
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
                <h3 className="text-xl font-medium text-white mb-2">{t.services.automation.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t.services.automation.description}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Zapier</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Make</span>
                <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-400">Python</span>
              </div>
            </div>
          </article>

          {/* 3. AI Integration Card */}
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
                <h3 className="text-xl font-medium text-white mb-2">{t.services.ai.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t.services.ai.description}
                </p>
              </div>
            </div>
          </article>

          {/* 4. Digital Marketing Visual Card */}
          <article className="relative col-span-1 md:col-span-1 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 group slide-up animate-delay-400">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-neutral-900/60 hover:bg-neutral-900/50 transition-colors"></div>
            <div className="p-8 h-full flex flex-col justify-end relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6M6 20V10M18 20V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-1">{t.services.marketing.title}</h3>
              <p className="text-sm text-neutral-300">{t.services.marketing.subtitle}</p>
            </div>
          </article>

          {/* 5. Marketing Automation Card (Large) */}
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
                <h3 className="text-xl font-medium text-white">{t.services.marketingAutomation.title}</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-6 max-w-sm">
                {t.services.marketingAutomation.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[10px] text-white">Hub</div>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[10px] text-white">SF</div>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[10px] text-white">Mail</div>
                </div>
                <span className="text-xs text-neutral-500">{t.services.marketingAutomation.integrations}</span>
              </div>
            </div>
            <div className="md:w-1/2 h-48 md:h-auto bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50 md:opacity-80">
              <div className="w-full h-full bg-gradient-to-l from-transparent to-neutral-900"></div>
            </div>
          </article>

          {/* 6. Technologies Bar */}
          <article className="col-span-1 md:col-span-3 rounded-[2rem] border border-white/10 bg-neutral-900/30 backdrop-blur-sm p-6 flex flex-wrap items-center justify-between gap-6 slide-up animate-delay-500">
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">{t.technologies.title}</span>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">OpenAI</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">Anthropic</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">Zapier</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">Make.com</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">HubSpot</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-default">Shopify</div>
            </div>
          </article>
        </section>

        {/* Stats Section */}
        <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-neutral-900/20 border border-white/5 text-center">
            <div className="text-3xl font-semibold text-white mb-1">50+</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wide">{t.stats.clientsScaled}</div>
          </div>
          <div className="p-6 rounded-3xl bg-neutral-900/20 border border-white/5 text-center">
            <div className="text-3xl font-semibold text-white mb-1">10k+</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wide">{t.stats.hoursSaved}</div>
          </div>
          <div className="p-6 rounded-3xl bg-neutral-900/20 border border-white/5 text-center">
            <div className="text-3xl font-semibold text-white mb-1">24/7</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wide">{t.stats.systemUptime}</div>
          </div>
          <div className="p-6 rounded-3xl bg-neutral-900/20 border border-white/5 text-center">
            <div className="text-3xl font-semibold text-white mb-1">3x</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wide">{t.stats.avgROI}</div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-20">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{t.faq.title}</h2>
            <p className="text-neutral-400">{t.faq.subtitle}</p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
              <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
                <span>{t.faq.q1.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="text-neutral-400 mt-4 text-sm leading-relaxed">
                {t.faq.q1.answer}
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
              <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
                <span>{t.faq.q2.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="text-neutral-400 mt-4 text-sm leading-relaxed">
                {t.faq.q2.answer}
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
              <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
                <span>{t.faq.q3.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="text-neutral-400 mt-4 text-sm leading-relaxed">
                {t.faq.q3.answer}
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
              <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
                <span>{t.faq.q4.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="text-neutral-400 mt-4 text-sm leading-relaxed">
                {t.faq.q4.answer}
              </div>
            </details>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/5 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <img 
                src="/logo1.png" 
                alt="Arju Media" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-neutral-400 max-w-sm text-sm">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    {t.footer.servicesList.automation}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    {t.footer.servicesList.ai}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    {t.footer.servicesList.marketing}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors">
                    {t.footer.servicesList.consulting}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">{t.footer.connect}</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8 text-xs text-neutral-500">
            <p>{t.footer.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-300">
                {t.footer.privacy}
              </a>
              <a href="#" className="hover:text-neutral-300">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}