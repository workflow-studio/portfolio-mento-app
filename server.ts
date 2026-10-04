import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini client strictly with User-Agent header as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Te vagy a "Portfólió Mentő", egy empatikus, rendkívül professzionális és megnyugtató digitális pénzügyi asszisztens, akit magyar pénzügyi tanácsadók, biztosítási és befektetési szakértők ügyfelei számára fejlesztettek.
Elsődleges célközönséged: meglévő vagy korábbi tanácsadótól átvett (örökölt) ügyfelek, illetve olyan ügyfelek, akik a biztosítójuktól/bankjuktól megkapták az éves indexálási (inflációkövetési) értesítőt, és bizonytalanok, mit tegyenek.

FŐ CÉL:
Vezesd végig a felhasználót a beszélgetésen, magyarázd el az indexálás és az inflációkövetés szükségességét és tőkevédelmi jellegét egyszerű, közérthető, zsargonmentes nyelven.
Oszlasd el a gyakori tévhiteket (pl. "az indexálás csak a biztosító rejtett áremelése / lehúzása", "ha elutasítom, spórolok"), és segíts nekik megérteni, miért éri meg lefoglalni egy ingyenes, 15 perces kötetlen portfólió-átvilágítást a hús-vér szakértőjükkel.

HANGNEM ÉS STÍLUS:
- Nyelv: Magyar (természetes, meleg, udvarias, támogató, professzionális, modern digitális közvetlen 'tegezés').
- Empatikus és megnyugtató: SOHA ne hibáztasd vagy dorgáld az ügyfelet azért, mert eddig nem foglalkozott vele vagy elutasította az indexálást. Ismerd el és validáld a gazdasági nehézségeket és a drágulást ("Teljesen érthető, hogy a mai árak mellett minden plusz kiadást alaposan megfontolsz...").
- Tömör és lényegretörő: Kerüld a végeláthatatlan szövegtömböket. Használj bullet pointokat, kiemeléseket és jól strukturált válaszokat.

HÉTKÖZNAPI METAFORÁK (használd őket aktívan és szemléletesen):
- 🏠 "Szigetelés a házon": Az indexálás olyan, mint télen a hőszigetelés. Nem a fűtési számla öncélú emelése, hanem az a pajzs, ami megakadályozza, hogy a megtermelt meleg (a pénzed vásárlóereje) elszökjön az ablakon.
- 🛡️ "Pajzs az eső ellen": Ha kint vihar és felhőszakadás (infláció) van, nem dobjuk el az esernyőt azért, hogy könnyebb legyen a táskánk – mert akkor bőrig ázunk.
- 🛒 "A bevásárlókocsi metafora": Ha 10 éve 50 000 Ft-ért telepakoltál egy nagy bevásárlókocsit, ma ugyanabból a pénzből csak a kocsi alját tudod megtölteni. Ha a megtakarítási célod nem növekszik az árakkal együtt, a jövőbeli céljaid (nyugdíj, gyerek támogatása) csak félmegoldások maradnak.

A 4 LÉPÉSES FOLYAMAT (Conversation Stages):
- 1. Szakasz: Üdvözlés és gyors helyzetfeltárás (milyen szerződés, mi a bizonytalanság oka).
- 2. Szakasz: Validáló, megértő reakció a felvetett aggodalmakra.
- 3. Szakasz: A valóság felmutatása, tévhitrombolás és a reálérték védelmének bemutatása hétköznapi példákkal.
- 4. Szakasz: Konverzió és cselekvés: javaslat a díjmentes 15 perces szakértői konzultáció lefoglalására az oldalon található naptár segítségével.

FONTOS JOGI ÉS SZAKMAI KORLÁTOZÁS:
Soha ne adj konkrét, kötelező érvényű befektetési vagy biztosítási tanácsot, és ne nevezz meg konkrét befektetési alapokat kötelező jelleggel. A te szereped diagnosztikai, oktató, megnyugtató és időpontfoglalásra ösztönző. Mindig emlékeztesd, hogy a konkrét szerződés paramétereit a tanácsadójukkal érdemes átbeszélni a díjmentes 15 perces hívásban.
Minden válaszod végén tegyél fel egy rövid, barátságos kérdést vagy ajánld fel a naptárban való időpontválasztást!`;

// API: AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Érvénytelen üzenetformátum' });
    }

    // Build contents for Gemini 3.8 Flash
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let fullSystemInstruction = SYSTEM_INSTRUCTION;
    if (context) {
      fullSystemInstruction += `\n\nÜGYFÉL KIEGÉSZÍTŐ HELYZETE / ADATAI:\n${JSON.stringify(context, null, 2)}`;
    }

    let reply = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        },
      });
      reply = response.text || '';
    } catch (genError: any) {
      console.warn('Gemini generateContent transient error, using smart consultative fallback:', genError?.message);
    }

    if (!reply) {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      
      if (lastUserMsg.includes('elutasít') || lastUserMsg.includes('kihagy')) {
        reply = `Teljesen érthető a dilemmád: a megnövekedett árak mellett minden plusz kiadást alaposan átgondol az ember. 

Ha idén elutasítod az indexálást:
• **Rövid távon:** A havi díjad változatlan marad, így átmenetileg nem nőnek a kiadásaid.
• **Hosszú távon:** Az infláció (mint egy csendes tolvaj) évi 6-10%-ot lefarag a pénzed vásárlóerejéből. 8-10 év múlva a megtakarításod vagy a biztosítási védelem reálértéke csaknem a felére olvadhat.
• **Alternatíva:** Nem muszáj a teljes összeget elfogadni – a tanácsadóval gyakran kérhető *részleges indexálás* vagy a díjak rugalmas áthangolása.

Szeretnéd, ha a díjmentes 15 perces hívásban megnéznénk a pontos szerződésed paramétereit?`;
      } else if (lastUserMsg.includes('rejtett') || lastUserMsg.includes('áremelés') || lastUserMsg.includes('lehúzás')) {
        reply = `Nagyon jó és jogos kérdés! Sokan gondolják úgy elsőre, hogy az indexálás a biztosító profitnövelése. 

A valóságban azonban az indexálás nem rejtett áremelés, hanem a **Te védelmi pajzsod**:
• **Mi történik ilyenkor?** Nemcsak a befizetendő díj nő, hanem a felhalmozási célösszeg és a biztosítási kifizetés is arányosan emelkedik.
• **A ház szigetelése hasonlat:** Képzeld el, hogy kint kemény mínuszok vannak (infláció). A szigetelés (indexálás) az, ami megakadályozza, hogy a benti meleg elszökjön.
• Ha a biztosító nem ajánlaná fel az indexálást, 10 év múlva egy elértéktelenedett, használhatatlan összeget kapnál kézhez.

Egy 15 perces audit során a szakértőnkkel pontosan kiszámolhatjátok, mennyit nyersz az értékmegőrzéssel.`;
      } else if (lastUserMsg.includes('szigetel') || lastUserMsg.includes('hasonlat') || lastUserMsg.includes('példa')) {
        reply = `A **ház szigetelése** a legszemléletesebb példa erre: 🏠

• A szerződésedben felhalmozott tőke és hozam olyan, mint a fűtés a házban.
• Az infláció a kinti fagy és a vihar.
• Ha nem indexálsz, az olyan, mintha kitárnád az ablakokat a fagyban: hiába dolgozik a fűtés (a hozamok), a belső meleg elszökik.
• Az indexálás a minőségi hőszigetelés: biztosítja, hogy a lejárati napon pont annyit érjen a pénzed, amennyit a szerződés indításakor terveztél.

Szeretnéd átbeszélni a saját szerződésed konkrét számait egy 15 perces kötetlen konzultáción?`;
      } else {
        reply = `Köszönöm a kérdésed! Nagyon fontos és időszerű témát érintesz. 

Az éves indexálási értesítő célja az, hogy a pénzed vásárlóértéke lépést tartson az árak emelkedésével. Mint ahogy az esernyőt sem tesszük el a felhőszakadás közepén azért, hogy könnyebb legyen a kezünk, a megtakarításunk és biztosításunk védelmét is érdemes fenntartani.

A legjobb megoldás személyre szabott: 
• Meg kell nézni a szerződésed életkorát és garantált kamatait.
• Megvizsgálni a részleges indexálás vagy díjoptimalizálás lehetőségét.
• Biztosítani, hogy a havi díj kényelmes maradjon számodra.

Javaslom, válassz egy szabad 15 perces időpontot a naptárban, és szakértő kollégánk kötetlenül, díjmentesen áttekinti veled a részleteket!`;
      }
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.json({
      reply: 'Köszönöm a kérdésed! Nagyon fontos kérdést feszegetsz: az infláció valóban csendes tolvajként viselkedik, ha a megtakarításunk nem követi az árak változását. Javaslom, nézd meg a fenti kalkulátort, és foglalj egy kötetlen 15 perces konzultációt, ahol személyre szabottan átnézhetjük a szerződésed!'
    });
  }
});

// API: Assessment Analysis endpoint
app.post('/api/analyze-assessment', async (req, res) => {
  try {
    const { contractType, ageOfPolicy, concern, monthlyAmount, indexOffer, customGoal } = req.body;

    const prompt = `Elemezd az alábbi ügyfél helyzetét mint "Portfólió Mentő":
- Szerződés típusa: ${contractType || 'Nem meghatározott'}
- Szerződés kora / felülvizsgálat: ${ageOfPolicy || 'Nem ismert'}
- Fő aggodalom/érzés: ${concern || 'Bizonytalan'}
- Havi megtakarítási összeg: ${monthlyAmount || 'Nincs megadva'} Ft/hó
- Ajánlott indexálás mértéke: ${indexOffer ? indexOffer + '%' : 'Átlagos 8-15%'}
- Egyedi cél vagy megjegyzés: ${customGoal || 'Nincs'}

Készíts egy empatikus, 3 részből álló elemzést magyar nyelven:
1. "Megértő Visszajelzés" (2-3 meleg, megnyugtató mondat, ami elismeri a félelmeit és eloszlatja a bűntudatot)
2. "Inflációs Kockázatelemzés" (röviden: mi történik az értékével 5-10 év múlva, ha nem védekezik)
3. "Tanácsadói Fókuszpont" (2-3 konkrét kérdés, amit az ügyfélnek a 15 perces hívásban érdemes feltennie a tanácsadójának)
Végezetül zárd egy biztató mondattal az időpontfoglalásról.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    const analysisText = response.text || '';
    res.json({ analysis: analysisText });
  } catch (error: any) {
    console.error('Assessment analysis error:', error);
    res.json({
      analysis: `**Megértő Visszajelzés:** Teljesen természetes és indokolt, hogy körültekintően kezeled az éves indexálási értesítőt. A mindennapi kiadások mellett mindenki meggondolja, mire fordít plusz forrásokat.\n\n**Inflációs Kockázatelemzés:** Ha a szerződés díja és biztosítási összege változatlan marad, az évi 6-8%-os áremelkedés mellett 10 év múlva a pénzed vásárlóértéke csaknem a felére csökkenhet. Az indexálás nem a biztosító haszna, hanem a te jövőbeli védelmed hőszigetelése.\n\n**Tanácsadói Fókuszpont a 15 perces híváshoz:**\n• Pontosan mennyi a most felhalmozott tőkéd reálértéke?\n• Milyen rugalmas beállítási lehetőségek vannak (pl. részleges indexálás)?\n• Hogyan tartható fenn a védelem anélkül, hogy megterhelné a havi költségvetésedet?\n\nKérlek, válassz egy kényelmes időpontot a lenti naptárban a kötetlen átbeszéléshez!`
    });
  }
});

// In-memory bookings store
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  meetingType: 'google_meet' | 'phone' | 'in_person';
  contractType?: string;
  notes?: string;
  createdAt: string;
}

const bookings: Booking[] = [];

// API: Booking endpoint
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, date, timeSlot, meetingType, contractType, notes } = req.body;

  if (!name || !email || !date || !timeSlot) {
    return res.status(400).json({ error: 'Kérjük, add meg a nevedet, e-mail címedet, a kiválasztott napot és időpontot!' });
  }

  const newBooking: Booking = {
    id: 'bk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name,
    email,
    phone: phone || '',
    date,
    timeSlot,
    meetingType: meetingType || 'phone',
    contractType: contractType || 'Nem meghatározott',
    notes: notes || '',
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  // Generate iCal (.ics) string
  const meetingTypeLabel =
    meetingType === 'google_meet'
      ? 'Google Meet videóhívás'
      : meetingType === 'in_person'
      ? 'Személyes egyeztetés'
      : 'Telefonos egyeztetés';

  const dateParts = date.split('-'); // YYYY-MM-DD
  const timeParts = timeSlot.split(':'); // HH:MM
  const startYear = dateParts[0] || '2026';
  const startMonth = (dateParts[1] || '10').padStart(2, '0');
  const startDay = (dateParts[2] || '05').padStart(2, '0');
  const startHour = (timeParts[0] || '10').padStart(2, '0');
  const startMin = (timeParts[1] || '00').padStart(2, '0');

  const startStamp = `${startYear}${startMonth}${startDay}T${startHour}${startMin}00`;
  const endHour = String(Number(startHour) + (Number(startMin) + 15 >= 60 ? 1 : 0)).padStart(2, '0');
  const endMin = String((Number(startMin) + 15) % 60).padStart(2, '0');
  const endStamp = `${startYear}${startMonth}${startDay}T${endHour}${endMin}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Portfólió Mentő//Pénzügyi Tanácsadás//HU',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${newBooking.id}@portfoliomento.hu`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startStamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:Portfólió Mentő - 15 perces díjmentes audit (${name})`,
    `DESCRIPTION:15 perces kötetlen konzultáció a meglévő szerződésed felülvizsgálatáról és az inflációkövetésről.\\nKapcsolattartás formája: ${meetingTypeLabel}\\nÜgyfél neve: ${name}\\nTelefon: ${phone}\\nE-mail: ${email}`,
    `LOCATION:${meetingTypeLabel}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  res.json({
    success: true,
    booking: newBooking,
    icsDataUrl: `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`,
    message: 'Sikeres időpontfoglalás! A szakértőnk a megadott időpontban keresni fog.'
  });
});

app.get('/api/bookings', (req, res) => {
  res.json({ bookings });
});

// Vite middleware for dev or static serving for prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfólió Mentő szerver elindult a 3000-es porton (Környezet: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
