export type Language = 'en' | 'ru' | 'lv';

export interface NavigationTranslations {
  expertise: string;
  solutions: string;
  faq: string;
}

export interface HeroTranslations {
  status: string;
  title1: string;
  title2: string;
  description: string;
  cta: string;
}

export interface ServiceTranslations {
  title: string;
  description: string;
}

export interface MarketingServiceTranslations extends ServiceTranslations {
  subtitle: string;
}

export interface MarketingAutomationTranslations extends ServiceTranslations {
  integrations: string;
}

export interface ServicesTranslations {
  automation: ServiceTranslations;
  ai: ServiceTranslations;
  marketing: MarketingServiceTranslations;
  marketingAutomation: MarketingAutomationTranslations;
}

export interface TechnologiesTranslations {
  title: string;
}

export interface StatsTranslations {
  clients: string;
  automated: string;
  satisfaction: string;
  clientsScaled: string;
  hoursSaved: string;
  systemUptime: string;
  avgROI: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQTranslations {
  title: string;
  subtitle: string;
  q1: FAQItem;
  q2: FAQItem;
  q3: FAQItem;
  q4: FAQItem;
}

export interface FooterTranslations {
  description: string;
  services: string;
  servicesList: {
    automation: string;
    ai: string;
    marketing: string;
    consulting: string;
  };
  connect: string;
  copyright: string;
  privacy: string;
  terms: string;
}

export interface ChatTranslations {
  title: string;
  placeholder: string;
  send: string;
  minimize: string;
  close: string;
  openChat: string;
  closeChat: string;
  chatWithUs: string;
  onlineNow: string;
  welcomeMessage: string;
  typeMessage: string;
  sendMessage: string;
  errorSending: string;
}

export interface Translations {
  nav: NavigationTranslations;
  hero: HeroTranslations;
  services: ServicesTranslations;
  technologies: TechnologiesTranslations;
  stats: StatsTranslations;
  faq: FAQTranslations;
  footer: FooterTranslations;
  chat: ChatTranslations;
}