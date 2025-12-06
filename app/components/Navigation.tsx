'use client';

import { useState, useEffect } from 'react';
import { Menu, Globe, ChevronDown, X } from 'lucide-react';
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

  // Close mobile menu when language selector opens
  useEffect(() => {
    if (isLanguageOpen && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isLanguageOpen, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fade-in sticky top-4 z-[100] px-4">
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
            className="lg:hidden rounded-full p-2.5 transition-all hover:bg-white/10 text-white hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
          <div className="relative z-[110]">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="relative group cursor-pointer overflow-hidden rounded-full p-[1px] transition-all hover:scale-105 active:scale-95"
              aria-label="Select language"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#312E81_50%,#E2E8F0_100%)]"></span>
              <span className="flex h-10 px-4 items-center justify-center gap-2 rounded-full bg-neutral-950 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-neutral-900">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{languageFlags[language]} {languageNames[language]}</span>
                <span className="sm:hidden">{languageFlags[language]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {/* Language Dropdown */}
            {isLanguageOpen && (
              <>
                <div
                  className="fixed inset-0 z-[105]"
                  onClick={() => setIsLanguageOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl overflow-hidden z-[110] animate-slideDown">
                  {/* Liquid Glass Effect Container */}
                  <div className="relative bg-neutral-900/40 backdrop-blur-2xl border border-white/10">
                    {/* Glass shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    
                    {languages.map((lang, index) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 animate-fadeInItem relative group ${
                          language === lang
                            ? 'bg-indigo-500/20 text-white'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {/* Hover glass effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <span className="text-xl relative z-10">{languageFlags[lang]}</span>
                        <span className="text-sm font-medium relative z-10">{languageNames[lang]}</span>
                        
                        {language === lang && (
                          <span className="ml-auto text-indigo-400 relative z-10">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay & Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu - Liquid Glass Effect */}
          <div className="fixed top-[88px] left-4 right-4 z-[95] animate-slideDown">
            <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
              {/* Liquid Glass Container */}
              <div className="relative bg-neutral-900/40 backdrop-blur-2xl border border-white/10">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none animate-pulse"></div>
                
                {/* Glass shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative p-6">
                  <ul className="space-y-2">
                    {[
                      { href: '#expertise', label: t.nav.expertise },
                      { href: '#solutions', label: t.nav.solutions },
                      { href: '#faq', label: t.nav.faq },
                    ].map((item, index) => (
                      <li key={item.href} style={{ animationDelay: `${index * 80}ms` }} className="animate-fadeInItem">
                        <a
                          href={item.href}
                          className="block py-4 px-6 text-base font-medium text-neutral-300 hover:text-white transition-all duration-300 rounded-2xl hover:bg-white/5 group relative overflow-hidden"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* Hover shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          
                          <span className="relative z-10 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            {item.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInItem {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-fadeInItem {
          animation: fadeInItem 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}