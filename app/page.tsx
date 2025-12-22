'use client';

import { useState } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ChatBot from './components/ui/ChatBot';
import HeroSection from './components/sections/HeroSection';
import ExpertiseSection from './components/sections/ExpertiseSection';
import SolutionsSection from './components/sections/SolutionsSection';
import FAQSection from './components/sections/FAQSection';
import { Language, translations } from './locales';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <div className="min-h-full">
      {/* Ambient Background - Оптимизировано для мобильных */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-neutral-950">
        {/* Убрали grainy texture для мобильных */}
        <div className="hidden md:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        {/* Уменьшили blur для мобильных */}
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[40px] md:blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-600/10 rounded-full blur-[30px] md:blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <Navigation 
        language={language} 
        setLanguage={setLanguage}
        translations={t.nav}
      />

      {/* Main Grid Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] lg:auto-rows-[340px] gap-4">
          {/* Hero Section */}
          <HeroSection translations={t.hero} />

          {/* Expertise Section */}
          <ExpertiseSection translations={t.services} />

          {/* Solutions Section */}
          <SolutionsSection 
            servicesTranslations={t.services}
            technologiesTranslations={t.technologies}
            statsTranslations={t.stats}
          />
        </section>

        {/* FAQ Section */}
        <FAQSection translations={t.faq} />

        {/* Footer */}
        <Footer translations={t.footer} />
      </main>

      {/* ChatBot */}
      <ChatBot language={language} translations={t.chat} />
    </div>
  );
}