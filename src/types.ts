export type ContractType = 
  | 'pension' // Nyugdíjbiztosítás / önkéntes nyugdíjpénztár
  | 'life_savings' // Megtakarításos életbiztosítás / unit-linked
  | 'term_life' // Kockázati élet-, baleset- és egészségbiztosítás
  | 'child_education' // Gyermekcélú megtakarítás
  | 'inherited_legacy' // Korábbi / örökölt szerződés
  | 'other';

export type PolicyAge = 
  | '1_to_3_years'
  | '4_to_7_years'
  | '8_plus_years'
  | 'not_sure';

export type PrimaryConcern = 
  | 'hidden_fee' // "Félek, hogy csak rejtett díjemelés a biztosító részéről"
  | 'too_expensive' // "Túl magas a havi díj a mostani megélhetési költségek mellett"
  | 'unclear_returns' // "Nem látom át a reális hozamokat és a lejáratkori vásárlóerőt"
  | 'protect_value' // "Szeretném, ha a pénzem megőrizné a valódi vásárlóértékét"
  | 'inherited_uncertain'; // "Nem ismerem a szerződésem pontos részleteit / elárvult szerződés"

export interface AssessmentData {
  contractType: ContractType;
  ageOfPolicy: PolicyAge;
  concern: PrimaryConcern;
  monthlyAmount: number; // HUF
  receivedIndexLetter: boolean;
  offeredIndexRate: number; // e.g. 12%
  notes?: string;
}

export interface AdvisorProfile {
  name: string;
  title: string;
  firm: string;
  experience: string;
  registrationNumber: string;
  phone: string;
  email: string;
  avatarUrl: string;
  bio: string;
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  meetingType: 'google_meet' | 'phone' | 'in_person';
  contractType?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
