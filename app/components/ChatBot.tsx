'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { translations, Language } from '../translations';

interface ChatBotProps {
  language: Language;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot({ language }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'ru' 
        ? 'Здравствуйте! Чем могу помочь?' 
        : language === 'lv'
        ? 'Sveiki! Kā es varu palīdzēt?'
        : 'Hello! How can I help you?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🆕 Polling для получения новых сообщений от оператора
  useEffect(() => {
    if (!isOpen) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chat/response?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.messages && data.messages.length > 0) {
            // Добавляем новые сообщения от оператора
            const newMessages = data.messages.map((msg: any, index: number) => ({
              id: Date.now() + index,
              text: msg.text,
              sender: 'bot' as const,
              timestamp: new Date(msg.timestamp),
            }));
            
            setMessages((prev) => [...prev, ...newMessages]);
          }
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 3000); // Проверяем каждые 3 секунды

    return () => clearInterval(pollInterval);
  }, [isOpen, userId]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Отправляем сообщение в n8n
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          userId: userId,
          userName: 'Website Visitor',
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Показываем сообщение о том, что сообщение отправлено
      const botMessage: Message = {
        id: messages.length + 2,
        text: language === 'ru'
          ? 'Спасибо за ваше сообщение! Наш специалист получил его и ответит вам в ближайшее время.'
          : language === 'lv'
          ? 'Paldies par jūsu ziņojumu! Mūsu speciālists to saņēma un atbildēs tuvākajā laikā.'
          : 'Thank you for your message! Our specialist received it and will reply shortly.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Показываем сообщение об ошибке
      const errorMessage: Message = {
        id: messages.length + 2,
        text: language === 'ru'
          ? 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.'
          : language === 'lv'
          ? 'Atvainojiet, radās kļūda. Lūdzu, mēģiniet vēlāk.'
          : 'Sorry, an error occurred. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-950 animate-pulse"></div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? 'w-80' : 'w-96'
      }`}
    >
      <div
        className={`bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{t.chat.title}</h3>
              <p className="text-neutral-400 text-xs">
                {language === 'ru' ? 'Обычно отвечаем за 2 мин' : language === 'lv' ? 'Parasti atbildam 2 min laikā' : 'Usually replies in 2 min'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={t.chat.minimize}
            >
              <Minimize2 className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={t.chat.close}
            >
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-neutral-800 text-neutral-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-indigo-200'
                          : 'text-neutral-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString(language, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 rounded-2xl px-4 py-2.5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.chat.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
