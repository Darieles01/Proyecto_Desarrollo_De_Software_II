import { Link } from "react-router-dom";
import type { Pet } from "../../models/Pets.model";
import { speciesEmoji } from "../../utils/speciesEmoji";

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="relative rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden hover:outline-indigo-500/50 transition-all duration-300">
      <div className="h-2 w-full bg-indigo-600" />

      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 rounded-full bg-indigo-600/20 border-4 border-indigo-500 flex items-center justify-center text-5xl shadow-lg">
          {speciesEmoji(pet.species)}
        </div>

        {/* Nombre */}
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {pet.name}
        </h3>

        {/* Información básica */}
        <div className="w-full space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider text-xs">
              Especie:
            </span>
            <span className="text-gray-300 font-medium">{pet.species}</span>
          </div>

          {pet.breed && (
            <div className="flex justify-between items-center">
              <span className="text-indigo-400 font-semibold uppercase tracking-wider text-xs">
                Raza:
              </span>
              <span className="text-gray-300 font-medium">{pet.breed}</span>
            </div>
          )}
        </div>

        {/* Botón */}
        <Link
          to={`/pet/${pet.id}`}
          className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 text-white text-sm font-semibold"
        >
          VER MASCOTA
        </Link>
      </div>
    </div>
  );
}