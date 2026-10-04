import React, { useState } from 'react';
import { TrendingDown, Shield, AlertTriangle, ArrowRight, Sparkles, CheckCircle2, Flame, Layers } from 'lucide-react';

interface InflationSimulatorProps {
  onScrollToBooking: () => void;
}

export const InflationSimulator: React.FC<InflationSimulatorProps> = ({ onScrollToBooking }) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(35000);
  const [years, setYears] = useState<number>(10);
  const [inflationRate, setInflationRate] = useState<number>(7.5);
  const [activeMetaphor, setActiveMetaphor] = useState<'insulation' | 'shield' | 'cart'>('insulation');

  // Calculations
  const r = inflationRate / 100;
  
  // Total nominal deposited if unindexed
  const totalNominalUnindexed = monthlyPayment * 12 * years;
  
  // Purchasing power of the fixed payments discounted back to present value
  let totalRealUnindexed = 0;
  for (let y = 1; y <= years; y++) {
    // Each year's 12 payments discounted by inflation factor
    const discountFactor = Math.pow(1 + r, y);
    totalRealUnindexed += (monthlyPayment * 12) / discountFactor;
  }

  // Value lost to inflation (purchasing power gap)
  const purchasingPowerLoss = Math.max(0, totalNominalUnindexed - totalRealUnindexed);
  const lossPercentage = Math.round((purchasingPowerLoss / totalNominalUnindexed) * 100);

  // Purchasing power of the monthly contribution at the end of the term (in today's money)
  const endMonthlyRealPower = Math.round(monthlyPayment / Math.pow(1 + r, years));

  // If indexed: monthly payment in final year
  const endMonthlyIndexed = Math.round(monthlyPayment * Math.pow(1 + r, years));

  const formatHUF = (val: number) => {
    return new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 }).format(Math.round(val)) + ' Ft';
  };

  return (
    <section id="simulator" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Interaktív Értékvesztési Kalkulátor
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mennyit ér a pénzed, ha <span className="text-rose-600 underline decoration-rose-200 underline-offset-8">nem véded meg</span> az inflációtól?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Az infláció egy „csendes tolvaj”: a szerződéseden a számok változatlanok maradnak, miközben a valódi vásárlóerő évről évre elolvad. Próbáld ki a szimulátort!
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Szerződésed paraméterei
            </h3>

            {/* Slider 1: Havi díj */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Havi megtakarítás / díj:</label>
                <span className="text-lg font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                  {formatHUF(monthlyPayment)} / hó
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>10 000 Ft</span>
                <span>75 000 Ft</span>
                <span>150 000 Ft</span>
              </div>
            </div>

            {/* Slider 2: Időtáv */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Tervezett időtáv (évek):</label>
                <span className="text-lg font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-100">
                  {years} év múlva
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYears(y)}
                    className={`py-2 rounded-xl text-sm font-bold transition-all ${
                      years === y
                        ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {y} év
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Várható infláció */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Várható átlagos éves infláció:</label>
                <span className="text-lg font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  évi {inflationRate}%
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>4% (Óvatos)</span>
                <span>7.5% (Történelmi átlag)</span>
                <span>14% (Magas)</span>
              </div>
            </div>

            {/* Micro alert note */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Gyakorlati tény:</span> A KSH adatai szerint a 2022-2024-es kumulált infláció meghaladta a 35%-ot. Ha egy szerződés nem követte az árakat, az akkori megtakarítás ma már alig több mint felét éri.
              </div>
            </div>

          </div>

          {/* Results Comparison (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Side-by-Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card A: Unindexed (Loss) */}
              <div className="bg-white rounded-3xl p-6 border-2 border-rose-200/90 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-20 h-20 bg-rose-50 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-3">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                    Indexálás NÉLKÜL (Elutasítva)
                  </div>
                  <div className="text-sm text-slate-500 font-medium">Befizetett nominális összeg:</div>
                  <div className="text-2xl font-bold text-slate-800 mb-4">{formatHUF(totalNominalUnindexed)}</div>

                  <div className="pt-4 border-t border-rose-100">
                    <div className="text-xs text-rose-700 font-semibold uppercase tracking-wider">Mai vásárlóértéken kifejezve:</div>
                    <div className="text-3xl font-extrabold text-rose-600 mt-1">{formatHUF(totalRealUnindexed)}</div>
                    <p className="text-xs text-slate-500 mt-2">
                      A szerződésedből <span className="font-bold text-rose-700">{formatHUF(purchasingPowerLoss)}</span> vásárlóérték elpárolog a drágulás miatt!
                    </p>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-rose-50 text-rose-900 text-xs font-medium flex items-center justify-between">
                  <span>Havi {formatHUF(monthlyPayment)} mai értéke a {years}. évben:</span>
                  <span className="font-bold text-rose-700">{formatHUF(endMonthlyRealPower)}</span>
                </div>
              </div>

              {/* Card B: Protected with Indexation */}
              <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 border-2 border-emerald-500/50 shadow-xl shadow-emerald-950/20 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    Inflációkövetéssel (Megvédett Portfólió)
                  </div>
                  <div className="text-sm text-emerald-100/70 font-medium">Valódi vásárlóerő a lejáratkor:</div>
                  <div className="text-2xl font-bold text-emerald-300 mb-4">100%-ban megőrizve</div>

                  <div className="pt-4 border-t border-emerald-700/60">
                    <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">A Védelem Hatása:</div>
                    <div className="text-3xl font-extrabold text-white mt-1">Nincs Értékvesztés</div>
                    <p className="text-xs text-emerald-100/80 mt-2">
                      Az éves indexálás biztosítja, hogy a lejáró megtakarításodból pontosan azt vehesd meg, amit eredetileg terveztél.
                    </p>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-white/10 text-emerald-200 text-xs font-medium flex items-center justify-between">
                  <span>Havi díj a {years}. évben az inflációhoz igazítva:</span>
                  <span className="font-bold text-white">{formatHUF(endMonthlyIndexed)}</span>
                </div>
              </div>

            </div>

            {/* Visual Loss Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Elveszített Vásárlóerő Indexálás Nélkül:
                </span>
                <span className="text-sm font-extrabold text-rose-600">
                  -{lossPercentage}% veszteség
                </span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${100 - lossPercentage}%` }}
                  title="Megmaradó valós érték"
                />
                <div 
                  className="bg-rose-500 h-full transition-all duration-500 animate-pulse-subtle"
                  style={{ width: `${lossPercentage}%` }}
                  title="Elolvadt vásárlóerő"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span className="text-emerald-700 font-semibold">Megtartott reálérték: {100 - lossPercentage}%</span>
                <span className="text-rose-700 font-semibold">Elveszett vásárlóerő: {lossPercentage}%</span>
              </div>
            </div>

            {/* Interactive Metaphor Selector */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Közérthető metaforák – Miért működik így a pénz?
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveMetaphor('insulation')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeMetaphor === 'insulation'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏠 Szigetelés a házon
                </button>
                <button
                  onClick={() => setActiveMetaphor('shield')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeMetaphor === 'shield'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🛡️ Pajzs az eső ellen
                </button>
                <button
                  onClick={() => setActiveMetaphor('cart')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeMetaphor === 'cart'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🛒 A teli bevásárlókocsi
                </button>
              </div>

              {/* Metaphor explanation card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-sm text-slate-700 space-y-2">
                {activeMetaphor === 'insulation' && (
                  <>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>🏠 Szigetelés a házon:</span>
                    </div>
                    <p>
                      Képzeld el, hogy a szerződésed egy meleg családi ház. A befektetési hozamok termelik a meleget. Ha nem szigeteled le a falakat (nem indexálsz), a kinti hideg (az infláció) pillanatok alatt kihűti a lakást. Az indexálás nem öncélú költség, hanem a vastag szigetelés, ami bent tartja az értéket.
                    </p>
                  </>
                )}

                {activeMetaphor === 'shield' && (
                  <>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>🛡️ Pajzs az eső ellen:</span>
                    </div>
                    <p>
                      Ha kint tombol a felhőszakadás, nem tesszük le az esernyőt csak azért, mert elfárad a kezünk – különben bőrig ázunk. A biztosítási összeg indexálása azért elengedhetetlen, mert ha egy betegség vagy tragédia esetén 10 évvel ezelőtti összeget kap a családod, abból ma feleannyi ideig tudnának talpon maradni.
                    </p>
                  </>
                )}

                {activeMetaphor === 'cart' && (
                  <>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>🛒 A teli bevásárlókocsi:</span>
                    </div>
                    <p>
                      10 évvel ezelőtt egy 50 000 Ft-os bevásárlással púpozottan meg lehetett tölteni a hipermarketes kocsit. Ma ugyanezért a pénzért alig a feléig ér az áru. Nem a kosár lett kisebb, hanem a pénz vásárol kevesebbet. Ha a megtakarításod nem nő a kosár árával, a nyugdíjad idején hiányozni fog az életszínvonal.
                    </p>
                  </>
                )}
              </div>

              {/* CTA button inside simulator */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Kíváncsi vagy a te meglévő szerződésed pontos számaira?
                </div>
                <button
                  onClick={onScrollToBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-sm"
                >
                  <span>15 perces szerződés-átvilágítás</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
