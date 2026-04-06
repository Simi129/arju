'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { ContactTranslations } from '../../types/translations';

interface ContactSectionProps {
  translations: ContactTranslations;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection({ translations }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTopicSelect = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
    setIsTopicOpen(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.topic || !formData.message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', topic: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const selectedTopic = translations.topics.find(t => t.value === formData.topic);

  const inputClass =
    'w-full bg-neutral-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-neutral-900/80 transition-all duration-300';

  return (
    <section id="contact" className="mt-20">
      <div className="text-center mb-12 slide-up">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
          {translations.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          {translations.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-neutral-900/30 border border-white/5 p-6 md:p-8 space-y-5">

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {translations.firstName} <span className="text-indigo-400">*</span>
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={translations.firstNamePlaceholder}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {translations.lastName}
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={translations.lastNamePlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          {/* Email + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {translations.email} <span className="text-indigo-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={translations.emailPlaceholder}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {translations.company}
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={translations.companyPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          {/* Topic dropdown */}
          <div className="space-y-2 relative">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              {translations.topic} <span className="text-indigo-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => setIsTopicOpen(!isTopicOpen)}
              className="w-full bg-neutral-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between focus:outline-none focus:border-indigo-500/50 focus:bg-neutral-900/80 transition-all duration-300 hover:border-white/10"
            >
              <span className={selectedTopic ? 'text-neutral-200' : 'text-neutral-600'}>
                {selectedTopic ? selectedTopic.label : translations.topicPlaceholder}
              </span>
              <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isTopicOpen ? 'rotate-180' : ''}`} />
            </button>

            {isTopicOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsTopicOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 z-20 rounded-xl overflow-hidden border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl">
                  {translations.topics.map((topic) => (
                    <button
                      key={topic.value}
                      type="button"
                      onClick={() => handleTopicSelect(topic.value)}
                      className={`w-full px-4 py-3 text-sm text-left transition-all duration-200 flex items-center gap-3 ${
                        formData.topic === topic.value
                          ? 'bg-indigo-500/20 text-white'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{topic.icon}</span>
                      {topic.label}
                      {formData.topic === topic.value && (
                        <span className="ml-auto text-indigo-400 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              {translations.message} <span className="text-indigo-400">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={translations.messagePlaceholder}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="text-xs text-neutral-600">{translations.required}</p>
            <button
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-900/30"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {translations.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {translations.send}
                </>
              )}
            </button>
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-fadeIn">
              <CheckCircle className="w-5 h-5 shrink-0" />
              {translations.successMessage}
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {translations.errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}