import { AdvisorProfile } from '../types';

export const defaultAdvisor: AdvisorProfile = {
  name: 'Kovács Péter',
  title: 'Független Pénzügyi Szakértő & Vagyontervező',
  firm: 'Pénzügyi Partner Hálózat',
  experience: '14 év szakmai tapasztalat, 620+ kezelt ügyfélcsalád',
  registrationNumber: 'MNB Reg. sz.: 112089456213',
  phone: '+36 30 458 9214',
  email: 'peter.kovacs@penzugyipartner.hu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Hivatásom, hogy érthető, átlátható és sallangmentes válaszokat adjak a családi megtakarítások és biztosítások védelmére. Az infláció nem válogat, de egy jó felülvizsgálattal megvédhetjük a pénzed vásárlóértékét anélkül, hogy túlfizetnél.'
};

export const CONTRACT_TYPE_OPTIONS = [
  {
    id: 'pension',
    title: 'Nyugdíj-megtakarítás',
    desc: 'Nyugdíjbiztosítás, ÖNYP vagy NYESZ számla',
    badge: 'Kiemelten érinti az infláció',
    icon: 'ShieldCheck',
  },
  {
    id: 'life_savings',
    title: 'Megtakarításos Életbiztosítás',
    desc: 'Rendszeres díjas unit-linked vagy hagyományos tőkegyűjtés',
    badge: 'Éves indexálási értesítő',
    icon: 'TrendingUp',
  },
  {
    id: 'term_life',
    title: 'Kockázati Védelem & Egészség',
    desc: 'Élet-, baleset- és kritikus betegség biztosítási fedezet',
    badge: 'A térítési összeg elolvadhat',
    icon: 'HeartHandshake',
  },
  {
    id: 'child_education',
    title: 'Gyermekcélú Gondoskodás',
    desc: 'Induló tőke életkezdésre, egyetemi évekre',
    badge: '10-18 éves időtáv',
    icon: 'GraduationCap',
  },
  {
    id: 'inherited_legacy',
    title: 'Átvett / Örökölt Szerződés',
    desc: 'Korábbi tanácsadó elment, régóta nem volt hozzáérve',
    badge: 'Azonnali átvilágítás javasolt',
    icon: 'FolderSync',
  },
];

export const POLICY_AGE_OPTIONS = [
  { id: '1_to_3_years', label: '1 - 3 éve indult', sub: 'Még friss szerződés, kezdeti költséglevonási fázis után' },
  { id: '4_to_7_years', label: '4 - 7 éve indult', sub: 'Érett fázis, ahol az infláció hatása már látványosan felgyorsul' },
  { id: '8_plus_years', label: '8 évnél régebbi', sub: 'Régóta érintetlen, a vásárlóerő jelentős része védtelen lehet' },
  { id: 'not_sure', label: 'Nem emlékszem pontosan / nem találom a kötvényt', sub: 'A tanácsadói audit során díjmentesen kikérjük a biztosítótól' },
];

export const CONCERN_OPTIONS = [
  {
    id: 'hidden_fee',
    title: 'Félek, hogy ez csak rejtett áremelés',
    detail: 'Úgy érzem, a biztosító csak több pénzt akar kihúzni a zsebemből anélkül, hogy többet adna.',
    tag: '1. Leggyakoribb tévhit',
  },
  {
    id: 'too_expensive',
    title: 'Drágállom a havi díjat a mai árak mellett',
    detail: 'A megélhetési költségek is nőttek, minden kiadást kétszer is meg kell fontolnom.',
    tag: 'Költségvetési szempont',
  },
  {
    id: 'unclear_returns',
    title: 'Nem látom a valós hozamokat és a lejárati értéket',
    detail: 'Nem egyértelmű számomra, hogy a befizetett összeg a jövőben mennyit fog valójában érni.',
    tag: 'Átláthatósági igény',
  },
  {
    id: 'protect_value',
    title: 'Szeretném, ha a pénzem megőrizné a vásárlóértékét',
    detail: 'Tisztában vagyok a drágulással, és szeretném a legokosabb megoldást választani a jövőm védelmére.',
    tag: 'Tudatos tőkévédelem',
  },
];
