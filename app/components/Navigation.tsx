'use client';

import { useState } from 'react';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import { Language, languageNames, languageFlags, translations } from '../translations';

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  const languages: Language[] = ['en', 'ru', 'lv'];

  return (
    <header className="bg-transparent fade-in sticky top-4 z-40 px-4">
      <nav className="flex max-w-5xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-neutral-900/60 border border-white/5 rounded-full backdrop-blur-xl items-center justify-between p-2 pl-6 pr-2">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo1.png" 
            alt="Arju Media" 
            className="h-8 w-auto"
          />
        </div>

        <button
          id="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden rounded-full p-2.5 transition-colors hover:bg-white/10 text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <ul className="hidden lg:flex items-center gap-8 px-8">
          <li>
            <a href="#expertise" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {t.nav.expertise}
            </a>
          </li>
          <li>
            <a href="#solutions" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {t.nav.solutions}
            </a>
          </li>
          <li>
            <a href="#faq" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {t.nav.faq}
            </a>
          </li>
        </ul>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="relative group cursor-pointer overflow-hidden rounded-full p-[1px] transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#312E81_50%,#E2E8F0_100%)]"></span>
            <span className="flex h-10 px-4 items-center justify-center gap-2 rounded-full bg-neutral-950 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-neutral-900">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{languageFlags[language]} {languageNames[language]}</span>
              <span className="sm:hidden">{languageFlags[language]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Dropdown */}
          {isLanguageOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLanguageOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                      language === lang
                        ? 'bg-indigo-600/20 text-white'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{languageFlags[lang]}</span>
                    <span className="text-sm font-medium">{languageNames[lang]}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4">
          <ul className="space-y-3">
            <li>
              <a
                href="#expertise"
                className="block py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.expertise}
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                className="block py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.solutions}
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="block py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.faq}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}