'use client';

import { FAQTranslations } from '../../types/translations';

interface FAQSectionProps {
  translations: FAQTranslations;
}

export default function FAQSection({ translations }: FAQSectionProps) {
  return (
    <section id="faq" className="mt-20">
      <div className="text-center mb-12 slide-up">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
          {translations.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          {translations.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* FAQ Item 1 */}
        <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
          <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
            <span>{translations.q1.question}</span>
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
            {translations.q1.answer}
          </div>
        </details>

        {/* FAQ Item 2 */}
        <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
          <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
            <span>{translations.q2.question}</span>
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
            {translations.q2.answer}
          </div>
        </details>

        {/* FAQ Item 3 */}
        <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
          <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
            <span>{translations.q3.question}</span>
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
            {translations.q3.answer}
          </div>
        </details>

        {/* FAQ Item 4 */}
        <details className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 open:bg-neutral-900/60 open:border-white/10 transition-all duration-300">
          <summary className="flex justify-between items-center font-medium cursor-pointer text-neutral-200 hover:text-white">
            <span>{translations.q4.question}</span>
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
            {translations.q4.answer}
          </div>
        </details>
      </div>
    </section>
  );
}