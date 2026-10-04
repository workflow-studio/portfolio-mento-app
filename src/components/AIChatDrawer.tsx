import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  MessageSquare,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, AdvisorProfile } from '../types';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  advisor: AdvisorProfile;
  onScrollToBooking: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  advisor,
  onScrollToBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: `Szia! A **Portfólió Mentő** digitális asszisztens vagyok. 👋

Teljesen megértem, ha az éves indexálási levél láttán az első gondolatod az, hogy miért kellene többet fizetned a meglévő szerződésedért. A mai árak mellett mindenki óvatosan nyúl a pénztárcájához.

Szívesen elmagyarázom közérthetően az inflációkövetés működését (például a *hőszigetelés* vagy a *vásárlókocsi* hasonlatával), és segítek felkészülni a 15 perces kötetlen konzultációdra ${advisor.name} kollégámmal.

Milyen kérdés foglalkoztat most a leginkább?`,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Mi történik, ha idén elutasítom az indexálást?',
    'Miért nem rejtett áremelés az indexálás?',
    'Hogyan működik a ház hőszigetelése hasonlat?',
    'Mit érdemes megkérdeznem a 15 perces hívásban?',
    'Örökölt/elárvult a szerződésem, mit tegyek?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: 'ast_' + Date.now(),
        role: 'assistant',
        content: data.reply || data.fallbackReply || 'Köszönöm a kérdésed! Nagyon fontos a tőkéd megóvása. Javaslom, hogy egyeztessünk egy 15 perces díjmentes időpontot a szakértőnkkel!',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: 'ast_err_' + Date.now(),
        role: 'assistant',
        content: `Köszönöm a gondolatot! A legfontosabb, hogy az indexálást ne a biztosító terheként, hanem a saját pénzed védelmi szigeteléseként lásd. Ha a szerződésed nem növekszik az árakkal, az infláció csendes tolvajként elcseni az érték egyharmadát.\n\nSzeretnéd, hogy ${advisor.name} díjmentesen átvilágítsa a szerződésed konkrét számait egy 15 perces hívásban?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slideLeft"
        style={{ maxHeight: '100dvh' }}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">Portfólió Mentő AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-xs text-emerald-200/80">Empatikus Pénzügyi Támogató</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Advisor Partner Bar */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <span>Szakértői partner:</span>
            <span className="font-bold text-slate-800 truncate">{advisor.name}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onScrollToBooking();
            }}
            className="text-emerald-700 font-bold hover:underline shrink-0"
          >
            Naptár megnyitása &rarr;
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-1 ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 pl-9">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Portfólió Mentő gépel...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(promptText)}
              className="text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 px-3 py-1.5 rounded-full border border-slate-200 transition-colors shrink-0 whitespace-nowrap"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Kérdezz bátran az indexálásról, megtakarításról..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Micro Legal Note */}
          <p className="text-[10px] text-slate-400 text-center mt-2 leading-tight">
            Nem minősül hivatalos befektetési tanácsadásnak. A konkrét szerződésed részleteit a 15 perces szakértői hívásban beszélheted át.
          </p>
        </div>

      </div>
    </div>
  );
};
