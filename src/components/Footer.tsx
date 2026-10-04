import React from 'react';
import { ShieldCheck, Phone, Mail, Award, Lock, ExternalLink } from 'lucide-react';
import { AdvisorProfile } from '../types';

interface FooterProps {
  advisor: AdvisorProfile;
  onOpenAdvisorModal: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ advisor, onOpenAdvisorModal, onOpenChat }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Advisor (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Portfólió Mentő</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empatikus, független és közérthető döntéstámogató platform magyar megtakarítási és életbiztosítási ügyfelek számára.
            </p>
            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div className="font-bold text-slate-300">Szakértői Megbízott Partner:</div>
              <div>{advisor.name} – {advisor.title}</div>
              <div>{advisor.firm} • {advisor.registrationNumber}</div>
              <div>Kapcsolat: {advisor.phone} • {advisor.email}</div>
            </div>
          </div>

          {/* Quick links & tools (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold text-slate-200 text-sm uppercase tracking-wider">Modulok & Eszközök</div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#assessment" className="hover:text-emerald-400 transition-colors">
                  3 perces Portfólió Check-up
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-emerald-400 transition-colors">
                  Vásárlóérték & Inflációs Kalkulátor
                </a>
              </li>
              <li>
                <a href="#myths" className="hover:text-emerald-400 transition-colors">
                  Tévhitromboló (Top 5 tévhit az indexálásról)
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-emerald-400 transition-colors">
                  15 perces Díjmentes Időpontfoglalás
                </a>
              </li>
              <li>
                <button onClick={onOpenChat} className="hover:text-emerald-400 transition-colors text-left">
                  Portfólió Mentő AI Kérdezz-Felelek
                </button>
              </li>
            </ul>
          </div>

          {/* Consultant settings trigger (4 cols) */}
          <div className="md:col-span-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="font-bold text-slate-200 text-sm">Pénzügyi Tanácsadó Vagy?</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ezt az oldalt a saját nevedre szabhatod, és kiküldheted az indexálási értesítőt kapott vagy örökölt ügyfeleidnek.
            </p>
            <button
              onClick={onOpenAdvisorModal}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
            >
              Tanácsadói profil testreszabása &rarr;
            </button>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-[11px] leading-relaxed text-slate-500 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Fontos jogi tájékoztató és felelősségkizárás:</span>
          </div>
          <p>
            A Portfólió Mentő egy tájékoztató, szemléltető és edukációs célú digitális asszisztens rendszer. 
            Az oldalon megjelenő számítások, szimulációk és megállapítások nem minősülnek a Befektetési vállalkozásokról szóló törvény (Bszt.), a Biztosítási tevékenységről szóló törvény (Bit.), illetve a Hitelintézetekről szóló törvény (Hpt.) szerinti kötelező érvényű befektetési, pénzügyi vagy biztosítási ajánlattételnek, sem konkrét termékértékesítési felhívásnak. 
            Minden szerződés egyedi feltételekkel (biztosítási szabályzat, ügyféltájékoztató, TKM mutató, garantált kamatok, eszközalap-kockázatok) rendelkezik. 
            A végső döntések előtt elengedhetetlen a meglévő szerződési feltételek és a személyes élethelyzet részletes szakértői felülvizsgálata a díjmentes 15 perces konzultáció során.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 pt-6 border-t border-slate-900">
          <div>
            © {new Date().getFullYear()} Portfólió Mentő. Minden jog fenntartva.
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Adatvédelem (GDPR)</span>
            <span>Felhasználási Feltételek</span>
            <span>MNB Etikai Kódex</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
