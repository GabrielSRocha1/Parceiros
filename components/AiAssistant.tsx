import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { askBodesAssistant } from '../services/gemini';
import { useLanguage } from '../contexts/LanguageContext';

const AiAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: t('ai.greeting') }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Atualizar mensagem inicial quando o idioma mudar
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', text: t('ai.greeting') }]);
    }
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await askBodesAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'assistant', text: t('ai.error') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-dark-800 border border-gray-700 w-80 md:w-96 h-[450px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-dark-900 p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/Gemini_Generated_Image_a6pntqa6pntqa6pn.png" alt="AI Assistant" className="w-8 h-8 rounded-full object-cover border border-gold-500" />
              <span className="text-white font-bold">Suporte BodeCoin</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                  ? 'bg-gold-600 text-black rounded-tr-none'
                  : 'bg-dark-700 text-gray-200 rounded-tl-none border border-gray-600'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 text-gray-400 p-3 rounded-lg rounded-tl-none border border-gray-600 text-xs italic">
                  {t('ai.loading')}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-dark-900 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('ai.placeholder')}
              className="flex-1 bg-dark-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gold-600 hover:bg-gold-500 text-black p-2 rounded-lg disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gold-500 hover:bg-gold-400 text-black p-0 rounded-full shadow-lg shadow-gold-500/20 transition-transform hover:scale-110 overflow-hidden w-16 h-16 flex items-center justify-center border-2 border-gold-500"
      >
        <img src="/Gemini_Generated_Image_a6pntqa6pntqa6pn.png" alt="AI Chat" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default AiAssistant;