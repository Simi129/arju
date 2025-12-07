'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Language } from '../../locales';
import { ChatTranslations } from '../../types/translations';

type Message = {
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
};

interface ChatBotProps {
  language: Language;
  translations: ChatTranslations;
}

export default function ChatBot({ language, translations }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [userName] = useState('Website Visitor');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Генерация уникального ID пользователя
  useEffect(() => {
    let id = localStorage.getItem('chatUserId');
    if (!id) {
      id = `user${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatUserId', id);
    }
    setUserId(id);

    // Загрузка сохраненных сообщений
    const savedMessages = localStorage.getItem(`chatMessages_${id}`);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })));
    }
  }, []);

  // POLLING - опрос сервера каждые 2 секунды для получения новых сообщений
  useEffect(() => {
    if (!userId || !isOpen) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chat/response?userId=${userId}`);
        const data = await response.json();
        
        if (data.success && data.messages && data.messages.length > 0) {
          // Добавляем новые сообщения от admin в чат
          data.messages.forEach((msg: any) => {
            setMessages(prev => {
              const newMessage = {
                text: msg.text,
                sender: 'admin' as const,
                timestamp: new Date(msg.timestamp)
              };
              const updated = [...prev, newMessage];
              
              // Сохраняем в localStorage
              localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(updated));
              
              return updated;
            });
          });
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [userId, isOpen]);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(updated));
      return updated;
    });
    
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          userId: userId,
          userName: userName,
          language: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        text: translations.errorSending,
        sender: 'admin',
        timestamp: new Date(),
      };
      
      setMessages(prev => {
        const updated = [...prev, errorMessage];
        localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(updated));
        return updated;
      });
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
        aria-label={translations.openChat}
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
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-[600px] flex flex-col">
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
              <h3 className="text-white font-semibold text-sm">{translations.chatWithUs}</h3>
              <p className="text-neutral-400 text-xs">{translations.onlineNow}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={translations.closeChat}
          >
            <X className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-neutral-400 mt-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-sm">{translations.welcomeMessage}</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
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
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
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

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 text-neutral-200 rounded-2xl px-4 py-2.5">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
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
              placeholder={translations.typeMessage}
              className="flex-1 bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label={translations.sendMessage}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}