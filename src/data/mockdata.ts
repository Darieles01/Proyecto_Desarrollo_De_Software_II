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

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

//Datos ficticios

export const clients: Client[] = [
  {
    id: 1,
    name: "Dariel",
    email: "dariel@example.com",
    phone: "123-456-7890",
  },
];

export const pets: Pet[] = [
  {
    id: 1,
    name: "Cerberus",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 25,
    allergies: ["Chicken"],
    vaccines: [
      { id: 1, name: "Rabies", date: "2025-01-10" },
      { id: 2, name: "Parvovirus", date: "2025-02-15" },
    ],
    consultations: [
      { id: 1, date: "2025-03-01", description: "General checkup" },
    ],
  },
  {
    id: 2,
    name: "Gatorade",
    species: "Cat",
    breed: "Oriental Shorthair",
    age: 2,
    vaccines: [{ id: 1, name: "Feline Leukemia", date: "2025-01-20" }],
    consultations: [],
  },

  {
    id: 3,
    name: "Spirit",
    species: "Horse",
    breed: "Arabian",
    age: 5,
    weight: 450,
    allergies: [],
    vaccines: [
      { id: 1, name: "Tetanus", date: "2025-02-10" },
      { id: 2, name: "Influenza", date: "2025-04-05" },
    ],
    consultations: [
      {
        id: 1,
        date: "2025-05-12",
        description: "Hoof inspection and dental check",
      },
    ],
  },
];
