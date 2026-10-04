/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssessmentFlow } from './components/AssessmentFlow';
import { InflationSimulator } from './components/InflationSimulator';
import { MythBuster } from './components/MythBuster';
import { BookingCalendar } from './components/BookingCalendar';
import { AIChatDrawer } from './components/AIChatDrawer';
import { AdvisorCustomizerModal } from './components/AdvisorCustomizerModal';
import { Footer } from './components/Footer';
import { defaultAdvisor } from './data/mockAdvisor';
import { AdvisorProfile, AssessmentData } from './types';
import { MessageSquareText, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [advisor, setAdvisor] = useState<AdvisorProfile>(defaultAdvisor);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteAssessment = (data: AssessmentData) => {
    setAssessmentData(data);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        advisor={advisor}
        onOpenAdvisorModal={() => setIsAdvisorModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          advisor={advisor}
          onStartAssessment={() => scrollToSection('assessment')}
          onOpenSimulator={() => scrollToSection('simulator')}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* 4-Stage Interactive Assessment Flow */}
        <AssessmentFlow
          advisor={advisor}
          onCompleteAndBook={handleCompleteAssessment}
        />

        {/* Purchasing Power & Inflation Simulator */}
        <InflationSimulator
          onScrollToBooking={() => scrollToSection('booking')}
        />

        {/* Myth Buster (Tévhitromboló) */}
        <MythBuster
          onScrollToBooking={() => scrollToSection('booking')}
        />

        {/* 15-Minute Booking Calendar */}
        <BookingCalendar
          advisor={advisor}
          initialAssessment={assessmentData}
        />
      </main>

      {/* Footer */}
      <Footer
        advisor={advisor}
        onOpenAdvisorModal={() => setIsAdvisorModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/40"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquareText className="w-4 h-4 text-white" />
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <div className="text-xs font-extrabold leading-tight">Portfólió Mentő AI</div>
            <div className="text-[10px] text-emerald-200 leading-tight">Azonnali válaszok • Kattints ide!</div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </button>
      </div>

      {/* AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        advisor={advisor}
        onScrollToBooking={() => {
          setIsChatOpen(false);
          scrollToSection('booking');
        }}
      />

      {/* Advisor Customization Modal */}
      <AdvisorCustomizerModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        advisor={advisor}
        onSaveAdvisor={(updated) => setAdvisor(updated)}
      />

    </div>
  );
}
