import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Pet } from "../../models/Pets.model";
import { getAllPets } from "../../services/Pets.service";
import PetCard from "./PetCard";

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPets()
      .then((data) => {
        setPets(data);
        setFilteredPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar las mascotas");
        setLoading(false);
      });
  }, []);

  // Filtrar mascotas por nombre
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPets(filtered);
    }
  }, [searchTerm, pets]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg">Cargando mascotas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            MIS MASCOTAS
          </h1>
          <p className="mt-4 text-gray-400">
            Gestiona y consulta la información de todas tus mascotas
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar mascota por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-white/10 pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </div>
        </div>

        {/* Grid de mascotas */}
        {filteredPets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No se encontraron mascotas con ese nombre
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
