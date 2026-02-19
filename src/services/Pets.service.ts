import type { Pet } from "../models/Pets.model";

const BASE_URL = "/Pets.json";

export async function getPetById(id: number): Promise<Pet> {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Error al cargar las mascotas: ${res.status}`);
    }

    const pets: Pet[] = await res.json();
    const pet = pets.find((p) => p.id === id);
    if (!pet) {
      throw new Error(`Mascota con id ${id} no encontrada`);
    }

    return pet;
  } catch (error) {
    console.error("Error en getPetById:", error);
    throw error;
  }
}

//función para obtener todas las mascotas
export async function getAllPets(): Promise<Pet[]> {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Error al cargar las mascotas: ${res.status}`);
    }

    const pets: Pet[] = await res.json();
    return pets;
  } catch (error) {
    console.error("Error en getAllPets:", error);
    throw error;
  }
}
