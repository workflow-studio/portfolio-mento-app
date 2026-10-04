import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';

interface MythBusterProps {
  onScrollToBooking: () => void;
}

export const MythBuster: React.FC<MythBusterProps> = ({ onScrollToBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const myths = [
    {
      id: 1,
      myth: '„Az indexálás csak a biztosító vagy a pénzintézet rejtett áremelése / lehúzása.”',
      reality: 'Az indexálás NEM a biztosító profitnövelése, hanem a Te vagyonod védelmi pajzsa.',
      explanation: 'Gondolj a ház szigetelésére: amikor beköszönt a kemény tél (magas infláció), a szigetelés óvja meg a belső meleget. Az indexálás során a biztosítási összegek és a megtakarítási célok is arányosan emelkednek. Ha a biztosító nem ajánlaná fel az indexálást, 10 év múlva a családod egy elértéktelenedett, használhatatlan kifizetést kapna.',
      consultantTip: 'A tanácsadói konzultáción áttekintheted, hogy a felajánlott indexálási arány pontosan hogyan növeli meg a lejáratkori célösszeget.',
    },
    {
      id: 2,
      myth: '„Ha most visszautasítom az indexálást, havonta több ezer forintot spórolok a családi kasszának.”',
      reality: 'Rövid távú látszat-spórolás, ami hosszú távon több millió forintos reálveszteséget okoz.',
      explanation: 'Ha nem fogadod el az évi néhány ezer forintos díjigazítást, a havi költségvetésed pillanatnyilag fellélegezhet. De az infláció csendes tolvajként minden évben elcsen 6-10%-ot a pénzed vásárlóerejéből. 8-10 év múlva a befizetett millióid már alig érnek majd valamit a leendő nyugdíjkorhatár elérésekor.',
      consultantTip: 'Létezik lehetőség részleges indexálásra vagy egyedi díjbeállításra is, hogy a védelem megmaradjon, mégse terhelje túl a zsebedet.',
    },
    {
      id: 3,
      myth: '„A régi vagy örökölt szerződésemhez jobb nem hozzányúlni, hátha elrontom a feltételeket.”',
      reality: 'Egy 5-10 éve magára hagyott szerződés olyan, mint egy olajcsere nélkül futó autó.',
      explanation: 'Sokan tartanak attól, hogy ha átvilágítják a szerződésüket, valami rosszabb lép a helyébe. A valóságban a szakértői átvilágítás semmilyen kötelezettséggel nem jár. Megvizsgáljuk, hogy a régi konstrukció értékei megtarthatók-e, miközben korszerűsítjük az alapokat és a védelmet.',
      consultantTip: 'Ha a korábbi tanácsadód már nem elérhető („elárvult ügyfél” vagy), most díjmentesen kaphatsz egy megbízható, dedikált szakértőt.',
    },
    {
      id: 4,
      myth: '„Ha egyszer elfogadom az indexálást, onnantól fogva kötelező lesz és soha többé nem csökkenthetem a díjat.”',
      reality: 'A korszerű szerződések rendkívül rugalmasak: az indexálás nem egyirányú csapda.',
      explanation: 'Az indexálás évről évre választható opció. Ha idén elfogadod a védelmet, de jövőre váratlan kiadásod adódna, bármikor kérheted a díj változatlanul hagyását, mérséklését vagy akár a díjfizetés átmeneti szüneteltetését is.',
      consultantTip: 'A 15 perces hívásban tisztázzuk a szerződésed rugalmassági szabályait és vésztartalék-funkcióit.',
    },
    {
      id: 5,
      myth: '„A befektetési alapok hozamai úgyis ellensúlyozzák az inflációt, nem kell több pénzt betennem.”',
      reality: 'A hozam önmagában ritkán pótolja a befizetések elmaradó reálértékét.',
      explanation: 'A reálhozam a tényleges hozam és az infláció különbsége. Ha egy alap évi 9%-ot hoz, de az infláció 7%, a valódi gyarapodás mindössze 2%. Ha a havi befizetés nem növekszik az árakkal, a vagyonépítés üteme drasztikusan lelassul.',
      consultantTip: 'Megnézzük a jelenlegi eszközalap-összetételedet és a kockázati profilodnak megfelelő optimális portfóliót.',
    },
  ];

  return (
    <section id="myths" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-200">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            Tévhitek & Szakmai Tények
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            5 tipikus tévhit az indexálásról, ami <span className="text-rose-600">milliókba kerülhet</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Az indexálási levél láttán az első ösztönös gondolat gyakran a tiltakozás. Nézzük meg a tévhitek mögötti valóságot!
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {myths.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-emerald-300 bg-emerald-50/20 shadow-md ring-1 ring-emerald-200' 
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                        Tévhit #{item.id}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.myth}
                      </h3>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4">
                    {/* Reality Box */}
                    <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-start gap-3 text-emerald-950">
                      <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                          A Szakmai Valóság:
                        </div>
                        <div className="font-semibold text-sm sm:text-base mt-0.5 text-emerald-900">
                          {item.reality}
                        </div>
                      </div>
                    </div>

                    {/* Full Explanation */}
                    <div className="text-sm sm:text-base text-slate-700 leading-relaxed pl-1">
                      {item.explanation}
                    </div>

                    {/* Consultant tip */}
                    <div className="p-3.5 rounded-xl bg-slate-100/90 text-slate-800 text-xs sm:text-sm flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Mit tehetsz most? </span>
                        {item.consultantTip}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Nem vagy biztos a saját szerződésedben?</h4>
            <p className="text-slate-300 text-sm">
              Egyetlen rossz döntéssel sem kell kockáztatnod. Egy 15 perces díjmentes átvilágítás tiszta képet ad.
            </p>
          </div>
          <button
            onClick={onScrollToBooking}
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>Időpontfoglalás a Szakértőhöz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
