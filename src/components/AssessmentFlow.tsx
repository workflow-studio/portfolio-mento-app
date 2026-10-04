import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  AlertCircle, 
  Calendar, 
  Layers, 
  TrendingUp,
  HeartHandshake,
  GraduationCap,
  FolderSync,
  Clock,
  Send,
  Loader2
} from 'lucide-react';
import { AssessmentData, ContractType, PolicyAge, PrimaryConcern, AdvisorProfile } from '../types';
import { CONTRACT_TYPE_OPTIONS, POLICY_AGE_OPTIONS, CONCERN_OPTIONS } from '../data/mockAdvisor';

interface AssessmentFlowProps {
  advisor: AdvisorProfile;
  onCompleteAndBook: (assessmentData: AssessmentData) => void;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ advisor, onCompleteAndBook }) => {
  // Current stage: 1 = Questions, 2 = AI Reaction/Diagnosis, 3 = The Insight, 4 = Final CTA / Summary
  const [stage, setStage] = useState<number>(1);
  const [questionStep, setQuestionStep] = useState<number>(1);

  // Form State
  const [contractType, setContractType] = useState<ContractType>('life_savings');
  const [ageOfPolicy, setAgeOfPolicy] = useState<PolicyAge>('4_to_7_years');
  const [concern, setConcern] = useState<PrimaryConcern>('hidden_fee');
  const [monthlyAmount, setMonthlyAmount] = useState<number>(35000);
  const [receivedIndexLetter, setReceivedIndexLetter] = useState<boolean>(true);
  const [offeredIndexRate, setOfferedIndexRate] = useState<number>(11.5);
  const [customGoal, setCustomGoal] = useState<string>('');

  // AI Analysis result
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Trigger analysis when moving to Stage 2
  const handleProceedToStage2 = async () => {
    setStage(2);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractType,
          ageOfPolicy,
          concern,
          monthlyAmount,
          indexOffer: offeredIndexRate,
          customGoal,
        }),
      });

      if (!response.ok) {
        throw new Error('Hálózati hiba');
      }

      const data = await response.json();
      setAiAnalysis(data.analysis || '');
    } catch (err) {
      console.error(err);
      // Fallback empathetic analysis
      setAiAnalysis(
        `**Megértő Visszajelzés:** Teljesen érthető a reakciód. A mindennapi kiadások mellett teljesen természetes és indokolt, hogy óvatosan kezeled az indexálási értesítőt.\n\n**Inflációs Kockázatelemzés:** A jelenlegi szerződésednél a ${monthlyAmount.toLocaleString('hu-HU')} Ft-os havi díj indexálás nélkül 8-10 év alatt elveszítheti vásárlóerejének csaknem 40%-át. Az indexálás nem díjemelés a biztosító javára, hanem a te pénzed hőszigetelése.\n\n**Fókuszpont a 15 perces híváshoz:**\n• Pontosan mekkora a felhalmozott tőkéd mai reálértéke?\n• Milyen rugalmas beállítási módok léteznek (pl. részleges indexálás)?\n• Hogyan tartható fenn a védelem a költségvetésed túlterhelése nélkül?`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getContractIcon = (type: string) => {
    switch (type) {
      case 'pension': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'life_savings': return <TrendingUp className="w-5 h-5 text-teal-600" />;
      case 'term_life': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'child_education': return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      default: return <FolderSync className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="assessment" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Tracker */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500 mb-2">
            <span className={stage >= 1 ? 'text-emerald-700' : ''}>1. Helyzetfelmérés</span>
            <span className={stage >= 2 ? 'text-emerald-700' : ''}>2. Empatikus Diagnózis</span>
            <span className={stage >= 3 ? 'text-emerald-700' : ''}>3. A Pajzs & Metafora</span>
            <span className={stage >= 4 ? 'text-emerald-700' : ''}>4. Audit & Időpont</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(stage / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-10 relative">

          {/* ============================================================== */}
          {/* STAGE 1: QUESTIONS & INPUTS                                   */}
          {/* ============================================================== */}
          {stage === 1 && (
            <div className="space-y-8">
              
              {/* Step 1 of 3: Contract Type */}
              {questionStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      1. Kérdés a 3-ból • 1 perc
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Milyen jellegű pénzügyi szerződésről van szó?
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      Válaszd ki azt a típust, amellyel kapcsolatban felülvizsgálatot vagy indexálási levelet kaptál.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {CONTRACT_TYPE_OPTIONS.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setContractType(item.id as ContractType)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          contractType === item.id
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-1 ring-emerald-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-slate-100 shrink-0">
                          {getContractIcon(item.id)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setQuestionStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-700/20"
                    >
                      <span>Tovább a részletekhez</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 of 3: Policy Age & Monthly Amount */}
              {questionStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      2. Kérdés a 3-ból • 1 perc
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Mikor indult a szerződés és mekkora a havi díja?
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      Nem szükséges hajszálpontos összeget tudnod, egy becslés is tökéletesen elegendő.
                    </p>
                  </div>

                  {/* Policy Age options */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-800">A szerződés kora vagy utolsó felülvizsgálata:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {POLICY_AGE_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setAgeOfPolicy(opt.id as PolicyAge)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            ageOfPolicy === opt.id
                              ? 'border-emerald-600 bg-emerald-50 text-slate-900'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="font-bold text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly amount slider */}
                  <div className="space-y-3 pt-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-800">Hozzávetőleges havi díj / megtakarítás:</label>
                      <span className="font-extrabold text-emerald-700 text-base bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                        {monthlyAmount.toLocaleString('hu-HU')} Ft / hó
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="120000"
                      step="5000"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>10 000 Ft</span>
                      <span>50 000 Ft</span>
                      <span>120 000 Ft+</span>
                    </div>
                  </div>

                  {/* Index letter question */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Érkezett mostanában hivatalos indexálási értesítő?</div>
                      <div className="text-xs text-slate-500">Postai levélben vagy e-mailben a biztosítótól</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setReceivedIndexLetter(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          receivedIndexLetter ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border'
                        }`}
                      >
                        Igen, kaptam
                      </button>
                      <button
                        type="button"
                        onClick={() => setReceivedIndexLetter(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          !receivedIndexLetter ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border'
                        }`}
                      >
                        Nem / Nem biztos
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setQuestionStep(1)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Vissza
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuestionStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-700/20"
                    >
                      <span>Tovább az érzéseidhez</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 of 3: Primary Concern & Hesitation */}
              {questionStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      3. Kérdés a 3-ból • Fő kétség vagy aggodalom
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Mi a legfőbb érzésed vagy kétséged az indexálás kapcsán?
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      Nincs rossz válasz! A célunk, hogy pontosan a Te helyzetedre adjunk megnyugtató választ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {CONCERN_OPTIONS.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setConcern(item.id as PrimaryConcern)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          concern === item.id
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-1 ring-emerald-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</div>
                          <div className="text-xs sm:text-sm text-slate-600 mt-1">{item.detail}</div>
                        </div>
                        <span className="shrink-0 px-2 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Optional custom note */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Egyéb megjegyzés vagy konkrét kérdés (opcionális):
                    </label>
                    <input
                      type="text"
                      placeholder="Pl. Hány év van még hátra a lejáratig, mi történt a korábbi tanácsadóval..."
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setQuestionStep(2)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Vissza
                    </button>
                    <button
                      type="button"
                      onClick={handleProceedToStage2}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white transition-all shadow-lg shadow-emerald-700/25 active:scale-98"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Diagnózis & Elemzés Kérése</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================== */}
          {/* STAGE 2: EMPATHETIC REACTION & MICRO-FEEDBACK                 */}
          {/* ============================================================== */}
          {stage === 2 && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                  🛡️
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    2. Szakasz • Portfólió Mentő Értékelése
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Személyre szabott helyzetelemzés & megnyugtató válasz
                  </h3>
                </div>
              </div>

              {isAnalyzing ? (
                <div className="py-16 text-center space-y-4">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
                  <div className="font-bold text-slate-800 text-lg">
                    Portfólió Mentő elemzi a megadott paramétereket...
                  </div>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Kiszámoljuk az inflációs hatást és a szerződésed biztonsági profilját.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Analysis Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200/90 text-slate-800 leading-relaxed space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Portfólió Mentő Visszajelzése:
                    </div>
                    
                    {/* Rendered content */}
                    <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 whitespace-pre-line font-normal">
                      {aiAnalysis}
                    </div>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <div className="text-xs text-slate-500 font-medium">Becsült havi díj:</div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">{monthlyAmount.toLocaleString('hu-HU')} Ft/hó</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                      <div className="text-xs text-rose-700 font-medium">Inflációs kitettség védelem nélkül:</div>
                      <div className="text-lg font-bold text-rose-700 mt-0.5">Magas (35-45% reálveszteség)</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <div className="text-xs text-emerald-700 font-medium">Indexálási javaslat:</div>
                      <div className="text-lg font-bold text-emerald-800 mt-0.5">Értékmegőrző pajzs aktiválása</div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStage(1)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Módosítom az adatokat
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage(3)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-700/20"
                    >
                      <span>Hogyan véd meg az indexálás? (3. Lépés)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================== */}
          {/* STAGE 3: THE INSIGHT / METAPHOR & DISPELLING MYTHS             */}
          {/* ============================================================== */}
          {stage === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  3. Szakasz • A Valóság és a Metafora
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Miért az indexálás a szerződésed „hőszigetelése”?
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Amikor a biztosító indexálási levelet küld, nem többet vesz el tőled, hanem a jövőbeli céljaid védelmét kínálja fel.
                </p>
              </div>

              {/* Visual Metaphor Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Metaphor 1: House Insulation */}
                <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                    🏠
                  </div>
                  <h4 className="text-lg font-bold text-white">A ház szigetelése télen</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A megtakarításod hozama a kazán, ami fűti a házat. Ha kint tombol az orkán és a mínuszok (az infláció), de nincsenek leszigetelve a falak (nem indexálsz), a meleg azonnal kiszökik. Az indexálás nem öncélú díjemelés, hanem az a vastag szigetelés, ami bent tartja a tőke reálértékét.
                  </p>
                </div>

                {/* Metaphor 2: The Umbrella */}
                <div className="p-6 rounded-3xl bg-teal-900 text-white space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-teal-400/20 text-teal-300 flex items-center justify-center font-bold text-xl">
                    🛡️
                  </div>
                  <h4 className="text-lg font-bold text-white">Pajzs az eső ellen</h4>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Ha felhőszakadásban sétálsz az utcán, nem teszed el a hátizsákodba az esernyőt csak azért, hogy könnyebb legyen a kezed. Ha a biztosítási összeg 10 évvel ezelőtti szinten ragad, egy baj esetén a családod a mai árak mellett feleannyi ideig tudna biztonságban élni belőle.
                  </p>
                </div>

              </div>

              {/* What happens during the 15-minute call? */}
              <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Mit vizsgálunk meg a díjmentes 15 perces hívásban?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-900">
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200">
                    <span className="font-bold block mb-1">1. Tőke-átvilágítás:</span>
                    Megnézzük a pontos felhalmozott tőkét és a levonások utáni valós reálhozamokat.
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200">
                    <span className="font-bold block mb-1">2. Rugalmas indexálás:</span>
                    Kiderítjük, hogy lehetséges-e részleges indexálás vagy a díj átmeneti optimalizálása.
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-amber-200">
                    <span className="font-bold block mb-1">3. Költségmentes tanács:</span>
                    Nem adunk el felesleges új terméket, a meglévő szerződésed védelme az elsődleges cél.
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStage(2)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Vissza a diagnózishoz
                </button>
                <button
                  type="button"
                  onClick={() => setStage(4)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white transition-all shadow-lg shadow-emerald-700/25 active:scale-98"
                >
                  <span>Cselekvési Terv & Időpontválasztás</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* STAGE 4: ACTION PLAN & DIRECT BOOKING TRIGGER                 */}
          {/* ============================================================== */}
          {stage === 4 && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="text-center max-w-xl mx-auto space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
                  ✨
                </div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  4. Szakasz • Cselekvési Terv
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Készen állsz a 15 perces független portfólió-auditodra!
                </h3>
                <p className="text-slate-600 text-sm">
                  Összegyűjtöttük az adataidat, hogy a szakértői egyeztetés a lehető leghatékonyabb és legcélzottabb legyen.
                </p>
              </div>

              {/* Consultant preview card */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shrink-0">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    Független Pénzügyi Szakértő
                  </div>
                  <h4 className="text-xl font-bold">{advisor.name}</h4>
                  <p className="text-slate-300 text-xs">
                    {advisor.firm} • {advisor.experience} • {advisor.registrationNumber}
                  </p>
                  <p className="text-slate-400 text-xs italic pt-1">
                    „Nem adok el semmit a fejed felett. Átnézzük a meglévő szerződésedet, és megmentjük a pénzed vásárlóértékét.”
                  </p>
                </div>
              </div>

              {/* Client Brief Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="font-bold text-slate-900 text-sm">A Te Portfólió Mentő Összefoglalód:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 block">Szerződés:</span>
                    <span className="font-semibold text-slate-800">{contractType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Becsült díj:</span>
                    <span className="font-semibold text-slate-800">{monthlyAmount.toLocaleString('hu-HU')} Ft</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Futamidő fázis:</span>
                    <span className="font-semibold text-slate-800">{ageOfPolicy}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fő aggodalom:</span>
                    <span className="font-semibold text-slate-800">{concern}</span>
                  </div>
                </div>
              </div>

              {/* Big Action Button */}
              <div className="pt-2 text-center space-y-3">
                <button
                  type="button"
                  onClick={() => onCompleteAndBook({
                    contractType,
                    ageOfPolicy,
                    concern,
                    monthlyAmount,
                    receivedIndexLetter,
                    offeredIndexRate,
                    notes: customGoal
                  })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl shadow-emerald-700/30 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Időpont Kiválasztása a Naptárban (Díjmentes)</span>
                </button>
                <div className="text-xs text-slate-500">
                  🔒 Nincs elköteleződés • Nincs ügynöki rámenősség • 100% független szakmai audit
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
