import React from 'react';
import { ShieldCheck, Calendar, Sparkles, UserCheck, MessageSquareText, Calculator } from 'lucide-react';
import { AdvisorProfile } from '../types';

interface NavbarProps {
  advisor: AdvisorProfile;
  onOpenAdvisorModal: () => void;
  onOpenChat: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  advisor,
  onOpenAdvisorModal,
  onOpenChat,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onScrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-slate-900 tracking-tight">Portfólió Mentő</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AI & Szakértői Pajzs
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Inflációkövetési & Indexálási Döntéstámogató</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onScrollToSection('assessment')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              3 perces Teszt
            </button>
            <button
              onClick={() => onScrollToSection('simulator')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-teal-600" />
              Inflációs Szimulátor
            </button>
            <button
              onClick={() => onScrollToSection('myths')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              Tévhitromboló
            </button>
            <button
              onClick={onOpenChat}
              className="px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-600" />
              AI Kérdezz-Felelek
            </button>
          </nav>

          {/* Advisor info & Booking CTA */}
          <div className="flex items-center gap-3">
            {/* Advisor mini-card / Settings trigger */}
            <button
              onClick={onOpenAdvisorModal}
              title="Kattints a tanácsadói profil megtekintéséhez vagy szerkesztéséhez"
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                {advisor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <span>{advisor.name}</span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-slate-500 truncate max-w-[130px]">{advisor.firm}</div>
              </div>
            </button>

            {/* Direct Booking Button */}
            <button
              onClick={() => onScrollToSection('booking')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>15p Ingyenes Audit</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
