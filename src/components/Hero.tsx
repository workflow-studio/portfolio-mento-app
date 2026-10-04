import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Calculator, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { AdvisorProfile } from '../types';

interface HeroProps {
  advisor: AdvisorProfile;
  onStartAssessment: () => void;
  onOpenSimulator: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  advisor,
  onStartAssessment,
  onOpenSimulator,
  onOpenChat,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white">
      
      {/* Background visual glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Döntéstámogató Portfólió-Átvilágítás • 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Ne engedd, hogy a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">csendes tolvaj</span> elolvassza a pénzed értékét.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Indexálási levelet kaptál a biztosítódtól és nem tudod, mit tegyél? Vagy évekre magára maradt egy régi megtakarításod? 
              Segítünk tisztán látni a számokat – <span className="text-white font-semibold">ügynöki nyomás és szakzsargon nélkül</span>.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartAssessment}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 transition-all shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>3 perces Ingyenes Diagnosztika</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>

              <button
                onClick={onOpenSimulator}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-base bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span>Inflációs Szimulátor</span>
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-xs text-slate-400 border-t border-white/10 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% díjmentes & független</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Érthető hétköznapi példák</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15 perces szakértői konzultáció</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Card top badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Személyes Portfólió Pajzs</div>
                    <div className="text-xs text-emerald-300">Aktív védelem bekapcsolva</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Élő diagnosztika
                </span>
              </div>

              {/* Loss vs Protected Visual Snippet */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs">
                  <span className="text-rose-200">Védelem nélkül (10 év múlva):</span>
                  <span className="font-extrabold text-rose-300 text-sm">-35% és -45% vásárlóerő</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <span className="text-emerald-100">Indexálással (Védett):</span>
                  <span className="font-extrabold text-emerald-300 text-sm">100% reálérték megőrzés</span>
                </div>
              </div>

              {/* Advisor endorsement preview */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-sm border-2 border-emerald-400">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-white text-sm">{advisor.name}</div>
                  <div className="text-slate-300">{advisor.title}</div>
                  <div className="text-emerald-400 font-medium">{advisor.firm}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 italic">
                „Az indexálás olyan, mint télen a ház szigetelése. Nem a fűtésszámla emelése, hanem a meleg megtartása.”
              </div>

              <button
                onClick={onOpenChat}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kérdezd a Portfólió Mentő AI-t kötetlenül!</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
