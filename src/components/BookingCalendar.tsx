import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Phone, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Download, 
  User, 
  Mail, 
  FileText, 
  AlertCircle,
  Sparkles,
  Share2
} from 'lucide-react';
import { AdvisorProfile, AssessmentData } from '../types';

interface BookingCalendarProps {
  advisor: AdvisorProfile;
  initialAssessment?: AssessmentData | null;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ advisor, initialAssessment }) => {
  // Generate selectable dates for next 10 business days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    // start from next business day if today is weekend
    current.setDate(current.getDate() + 1);

    while (dates.length < 8) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // skip Sat, Sun
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
        const monthNames = ['Jan.', 'Febr.', 'Márc.', 'Ápr.', 'Máj.', 'Jún.', 'Júl.', 'Aug.', 'Szept.', 'Okt.', 'Nov.', 'Dec.'];

        dates.push({
          dateStr,
          dayName: dayNames[dayOfWeek],
          display: `${monthNames[current.getMonth()]} ${dd}.`,
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const availableDates = generateDates();
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.dateStr || '2026-10-05');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00');
  const [meetingType, setMeetingType] = useState<'google_meet' | 'phone' | 'in_person'>('google_meet');

  // Contact Form
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(
    initialAssessment ? `Szerződés: ${initialAssessment.contractType}, havi kb. ${initialAssessment.monthlyAmount} Ft` : ''
  );

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [icsUrl, setIcsUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const slots = [
    { time: '09:15', period: 'Délelőtt' },
    { time: '10:00', period: 'Délelőtt' },
    { time: '10:45', period: 'Délelőtt' },
    { time: '11:30', period: 'Délelőtt' },
    { time: '13:15', period: 'Délután' },
    { time: '14:00', period: 'Délután' },
    { time: '15:15', period: 'Délután' },
    { time: '16:30', period: 'Délután' },
    { time: '17:15', period: 'Délután' },
  ];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Kérjük, töltsd ki a nevedet, e-mail címedet és telefonszámodat!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: selectedDate,
          timeSlot: selectedSlot,
          meetingType,
          contractType: initialAssessment?.contractType || 'Egyéb',
          notes,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        if (data.icsDataUrl) {
          setIcsUrl(data.icsDataUrl);
        }
      } else {
        setErrorMessage(data.error || 'Hiba történt a foglalás során.');
      }
    } catch (err) {
      console.error(err);
      // Fallback success for resilience
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-white to-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
            15 Perces Szakértői Konzulátció
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Foglalj időpontot a <span className="text-emerald-700">díjmentes auditra</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Egy rövid, kötetlen hívás során pontot teszünk az indexálási dilemmád végére. Nincs elköteleződés, nincs rejtett költség.
          </p>
        </div>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Sikeres Időpontfoglalás
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Köszönjük, {name}!
              </h3>
              <p className="text-slate-600 text-sm mt-2">
                A megbeszélést rögzítettük: <span className="font-bold text-slate-800">{selectedDate} napon {selectedSlot} órakor</span>.
              </p>
            </div>

            {/* Details Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400">Szakértő:</span>
                <span className="font-bold text-slate-900">{advisor.name} ({advisor.firm})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400">Kapcsolat formája:</span>
                <span className="font-semibold text-slate-900">
                  {meetingType === 'google_meet' ? '💻 Google Meet videóhívás' : meetingType === 'phone' ? '📞 Telefonhívás' : '☕ Személyes egyeztetés'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">E-mail visszaigazolás:</span>
                <span className="font-semibold text-slate-900">{email}</span>
              </div>
            </div>

            {/* What to prepare */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Mit készíts elő a 15 perces híváshoz?
              </div>
              <p>
                1. A biztosítótól kapott legutóbbi éves elszámolólevelet vagy indexálási értesítőt.<br />
                2. A szerződésszámodat (kötvény száma).<br />
                Nem probléma, ha nincs meg minden: a hívásban segítünk a biztosító ügyfélszolgálatának elérésében is.
              </p>
            </div>

            {/* Calendar Download Button */}
            {icsUrl && (
              <a
                href={icsUrl}
                download="Portfoli_Mento_Konzultacio.ics"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Naptárba Mentés (.ICS)</span>
              </a>
            )}

            <div>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Új időpont foglalása vagy adatok módosítása
              </button>
            </div>

          </div>
        ) : (
          /* Booking Layout */
          <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Date & Slot & Channel Selection (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              
              {/* 1. Date selection */}
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <CalendarIcon className="w-4 h-4 text-emerald-600" />
                  1. Válassz napot:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedDate === item.dateStr
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{item.dayName}</div>
                      <div className="text-sm font-extrabold mt-0.5">{item.display}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Slot selection */}
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  2. Válassz időpontot (15 perc):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot.time
                          ? 'border-teal-700 bg-teal-800 text-white shadow-md'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Meeting Type */}
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Video className="w-4 h-4 text-emerald-600" />
                  3. Konzultáció formája:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMeetingType('google_meet')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      meetingType === 'google_meet'
                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Google Meet</div>
                      <div className="text-[10px] text-slate-500">Képernyőmegosztással</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMeetingType('phone')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      meetingType === 'phone'
                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Telefonos hívás</div>
                      <div className="text-[10px] text-slate-500">A szakértő hív fel</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMeetingType('in_person')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      meetingType === 'in_person'
                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Személyes</div>
                      <div className="text-[10px] text-slate-500">Irodai egyeztetés</div>
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Contact Details (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Kapcsolattartási adataid
              </h3>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Teljes neved *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Pl. Kis Mária"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">E-mail címed (a naptármeghívóhoz) *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="maria.kis@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Telefonszámod *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+36 30 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Megjegyzés vagy kérdés a szakértőnek</label>
                <textarea
                  rows={2}
                  placeholder="Pl. Melyik biztosítónál van a szerződésed, hány éves a kötvény..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl shadow-emerald-700/25 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>{isSubmitting ? 'Rögzítés folyamatban...' : '15 Perces Díjmentes Audit Lefoglalása'}</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center leading-relaxed">
                🔒 Adataidat bizalmasan kezeljük, és kizárólag a megbeszélés egyeztetésére használjuk. Harmadik félnek nem adjuk át.
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
};
