'use client';

import { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

type Message = {
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
};

type Language = 'en' | 'ru' | 'lv';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState('Website Visitor');
  const [language, setLanguage] = useState<Language>('en');
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

    // Определяем язык браузера
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ru')) {
      setLanguage('ru');
    } else if (browserLang.startsWith('lv')) {
      setLanguage('lv');
    } else {
      setLanguage('en');
    }
  }, []);

  // POLLING - опрос сервера каждые 2 секунды для получения новых сообщений
  useEffect(() => {
    if (!userId || !isOpen) return;

    console.log('Starting polling for userId:', userId);

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chat/response?userId=${userId}`);
        const data = await response.json();
        
        if (data.success && data.messages && data.messages.length > 0) {
          console.log('Received messages from server:', data.messages);
          
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
    }, 2000); // опрос каждые 2 секунды

    return () => {
      console.log('Stopping polling');
      clearInterval(interval);
    };
  }, [userId, isOpen]);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const t = translations[language];

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

      console.log('Message sent successfully:', data);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        text: t.chat.errorSending,
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

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
          aria-label={t.chat.openChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{t.chat.chatWithUs}</h3>
              <p className="text-xs text-blue-100">{t.chat.onlineNow}</p>
            </div>
            <div className="flex gap-2 items-center">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-blue-500 text-white text-sm rounded px-2 py-1 border-none outline-none cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="lv">LV</option>
              </select>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-500 rounded-full p-1 transition-colors"
                aria-label={t.chat.closeChat}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>{t.chat.welcomeMessage}</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString(language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.chat.typeMessage}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
                aria-label={t.chat.sendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}