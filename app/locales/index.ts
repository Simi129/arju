import { Language, Translations } from '../types/translations';
import { en } from './en';
import { ru } from './ru';
import { lv } from './lv';

export const translations: Record<Language, Translations> = {
  en,
  ru,
  lv,
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
  lv: 'Latviešu',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  lv: '🇱🇻',
};

export type { Language, Translations };