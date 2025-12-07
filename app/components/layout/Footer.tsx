'use client';

import { Linkedin, Twitter } from 'lucide-react';
import { FooterTranslations } from '../../types/translations';

interface FooterProps {
  translations: FooterTranslations;
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-white/5 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <img 
            src="/logo1.png" 
            alt="Arju Media" 
            className="h-8 w-auto mb-4"
          />
          <p className="text-neutral-400 max-w-sm text-sm">
            {translations.description}
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{translations.services}</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                {translations.servicesList.automation}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                {translations.servicesList.ai}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                {translations.servicesList.marketing}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                {translations.servicesList.consulting}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{translations.connect}</h4>
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
        <p>{translations.copyright}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-neutral-300">
            {translations.privacy}
          </a>
          <a href="#" className="hover:text-neutral-300">
            {translations.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}