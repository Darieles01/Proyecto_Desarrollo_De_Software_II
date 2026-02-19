export interface Vaccine {
  id: number;
  name: string;
  date: string;
}

export interface Consultation {
  id: number;
  date: string;
  description: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  allergies?: string[];
  vaccines: Vaccine[];
  consultations: Consultation[];
}
