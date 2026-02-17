import type { Customer } from "../models/Customers.model";

const BASE_URL = "/Customers.json";

export async function getCustomer(): Promise<Customer> {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error(`Error al cargar el perfil: ${res.status}`);
    }

    const data: Customer = await res.json();
    return data;
  } catch (error) {
    console.error("Error en getCustomer:", error);
    throw error;
  }
}