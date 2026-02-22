import { useEffect, useState } from "react";
import { Camera, Pencil, PawPrint, Syringe, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import type { Customer } from "../../models/Customers.model";
import type { Pet } from "../../models/Pets.model";
import { getCustomer } from "../../services/Customers.service";
import { getAllPets } from "../../services/Pets.service";
import { speciesEmoji } from "../../utils/speciesEmoji";

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex-1 rounded-2xl bg-gray-900 outline outline-white/10 shadow-lg p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function Profile() {
  const [profile, setProfile] = useState<Customer | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    getCustomer()
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    getAllPets()
      .then((data) => setPets(data))
      .catch((err) => console.error(err));
  }, []);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  // Stats derivados del JSON de pets
  const totalVaccines = pets.reduce((acc, p) => acc + p.vaccines.length, 0);
  const totalConsultations = pets.reduce(
    (acc, p) => acc + p.consultations.length,
    0
  );

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6">
      {/* Toast */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl bg-gray-900 border border-indigo-500/40 shadow-2xl px-6 py-3.5">
          <span className="text-2xl">🚧</span>
          <p className="text-white text-sm font-semibold">Por implementar</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl flex flex-col gap-6">

        {/* ── Profile card ──────────────────────────────────────────────── */}
        <div className="relative rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden">
          <div className="h-2 w-full bg-indigo-600" />

          <div className="p-10 flex flex-col sm:flex-row gap-10">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 sm:w-52 shrink-0">
              <div className="relative group">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-44 h-44 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
                />
                <button
                  onClick={showToast}
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  <Camera size={24} className="text-white" />
                </button>
              </div>
              <button
                onClick={showToast}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 text-white text-sm font-semibold"
              >
                <Camera size={15} />
                Cambiar Foto
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                    Perfil del Cliente
                  </p>
                  <h1 className="mt-2 text-4xl font-bold text-white tracking-tight">
                    {profile.name}
                  </h1>
                </div>
                <button
                  onClick={showToast}
                  className="hidden sm:flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 text-white text-sm font-semibold"
                >
                  <Pencil size={15} />
                  Editar Perfil
                </button>
              </div>

              <div className="border-t border-white/10 mb-8" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Nombre:
                  </p>
                  <p className="text-white text-base font-medium">
                    {profile.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Teléfono:
                  </p>
                  <p className="text-white text-base font-medium">
                    {profile.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Email:
                  </p>
                  <p className="text-gray-300 text-base">{profile.email}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Tarjeta de Cliente:
                  </p>
                  <p className="text-gray-300 text-base">
                    {profile.customerCard}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Dirección:
                  </p>
                  <p className="text-gray-300 text-base">{profile.address}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                    Firma:
                  </p>
                  <p className="text-gray-300 text-base whitespace-pre-line italic">
                    {profile.signature}
                  </p>
                </div>
              </div>

              {/* Edit button mobile */}
              <div className="mt-10 sm:hidden">
                <button
                  onClick={showToast}
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-3 text-white text-sm font-semibold"
                >
                  <Pencil size={15} />
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats — calculados desde Pets.json ────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            icon={<PawPrint size={20} className="text-indigo-400" />}
            label="Mascotas"
            value={pets.length}
          />
          <StatCard
            icon={<Syringe size={20} className="text-indigo-400" />}
            label="Vacunas aplicadas"
            value={totalVaccines}
          />
          <StatCard
            icon={<ClipboardList size={20} className="text-indigo-400" />}
            label="Consultas realizadas"
            value={totalConsultations}
          />
        </div>

        {/* ── Pets — emoji, nombre, raza y pills desde Pets.json ────────── */}
        {pets.length > 0 && (
          <div className="rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-indigo-600" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <PawPrint size={20} className="text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Mis Mascotas
                  </h2>
                </div>
                <Link
                  to="/pets"
                  className="text-xs font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition"
                >
                  Ver todas →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pets.map((pet) => (
                  <Link
                    key={pet.id}
                    to={`/pet/${pet.id}`}
                    className="group flex items-center gap-4 rounded-xl bg-gray-800 border border-white/5 hover:border-indigo-500/40 hover:bg-gray-800/80 transition-all duration-200 p-4"
                  >
                    {/* Emoji viene de pet.species del JSON */}
                    <div className="w-12 h-12 rounded-full bg-indigo-600/20 border-2 border-indigo-500/50 flex items-center justify-center text-2xl shrink-0 group-hover:border-indigo-400 transition">
                      {speciesEmoji(pet.species)}
                    </div>

                    {/* nombre y raza del JSON */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {pet.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {pet.breed ?? pet.species}
                      </p>
                    </div>

                    {/* vacunas y edad del JSON */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-indigo-300 bg-indigo-900/40 border border-indigo-500/20 rounded-full px-2 py-0.5">
                        {pet.vaccines.length} vacunas
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-700/50 border border-white/5 rounded-full px-2 py-0.5">
                        {pet.age != null ? `${pet.age} años` : "—"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}