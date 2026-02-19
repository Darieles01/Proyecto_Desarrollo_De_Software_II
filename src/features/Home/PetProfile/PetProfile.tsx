import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Syringe, ClipboardList, ArrowLeft, AlertCircle } from "lucide-react";
import type { Pet } from "../../../models/Pets.model";
import { getPetById } from "../../../services/Pets.service";

// ─── Species icon helper ────────────────────────────────────────────────────
function speciesEmoji(species: string) {
  const map: Record<string, string> = {
    Dog: "🐶",
    Cat: "🐱",
    Horse: "🐴",
    Bird: "🐦",
    Rabbit: "🐰",
  };
  return map[species] ?? "🐾";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
        {label}
      </p>
      <p className="text-white text-base font-medium">{value}</p>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden">
      <div className="h-1 w-full bg-indigo-600" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function PetProfile() {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("ID de mascota no proporcionado.");
      setLoading(false);
      return;
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      setError("ID de mascota inválido.");
      setLoading(false);
      return;
    }

    getPetById(numericId)
      .then((data) => setPet(data))
      .catch(() => setError("No se encontró ninguna mascota con ese ID."))
      .finally(() => setLoading(false));
  }, [id]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg animate-pulse">Cargando perfil...</p>
      </div>
    );
  }

  // ── Not found / error ──────────────────────────────────────────────────────
  if (error || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-800 px-6">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-white text-xl font-semibold text-center">
          {error ?? "Mascota no encontrada"}
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 text-white text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    );
  }

  // ── Profile ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition w-fit"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        {/* ── Header card ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden">
          <div className="h-2 w-full bg-indigo-600" />
          <div className="p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0 w-28 h-28 rounded-full bg-indigo-900/60 border-4 border-indigo-500 flex items-center justify-center text-6xl shadow-lg select-none">
              {speciesEmoji(pet.species)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Perfil de Mascota
              </p>
              <h1 className="mt-1 text-4xl font-bold text-white tracking-tight">
                {pet.name}
              </h1>

              <div className="mt-1 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-600/30 border border-indigo-500/40 px-3 py-0.5 text-xs font-semibold text-indigo-300">
                  {pet.species}
                </span>
                {pet.breed && (
                  <span className="rounded-full bg-gray-700 border border-white/10 px-3 py-0.5 text-xs font-semibold text-gray-300">
                    {pet.breed}
                  </span>
                )}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5">
                {pet.age != null && (
                  <InfoBadge label="Edad" value={`${pet.age} años`} />
                )}
                {pet.weight != null && (
                  <InfoBadge label="Peso" value={`${pet.weight} kg`} />
                )}
                {pet.allergies && pet.allergies.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                      Alergias
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pet.allergies.map((a) => (
                        <span
                          key={a}
                          className="rounded-full bg-red-900/40 border border-red-500/40 px-3 py-0.5 text-xs font-semibold text-red-300"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {pet.allergies && pet.allergies.length === 0 && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                      Alergias
                    </p>
                    <p className="text-gray-400 text-sm">
                      Sin alergias conocidas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Vaccines ────────────────────────────────────────────────────── */}
        <SectionCard
          title="Vacunas"
          icon={<Syringe size={20} className="text-indigo-400" />}
        >
          {pet.vaccines.length === 0 ? (
            <p className="text-gray-400 text-sm">Sin vacunas registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      #
                    </th>
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Vacuna
                    </th>
                    <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pet.vaccines.map((v, i) => (
                    <tr
                      key={v.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition"
                    >
                      <td className="py-3 pr-4 text-gray-500 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 pr-4 text-white font-medium">
                        {v.name}
                      </td>
                      <td className="py-3 text-gray-400">
                        {new Date(v.date + "T00:00:00").toLocaleDateString(
                          "es-ES",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        {/* ── Consultations ───────────────────────────────────────────────── */}
        <SectionCard
          title="Historial de Consultas"
          icon={<ClipboardList size={20} className="text-indigo-400" />}
        >
          {pet.consultations.length === 0 ? (
            <p className="text-gray-400 text-sm">Sin consultas registradas.</p>
          ) : (
            <ol className="relative border-l border-indigo-800/50 ml-3 flex flex-col gap-6">
              {pet.consultations.map((c) => (
                <li key={c.id} className="pl-6">
                  {/* Timeline dot */}
                  <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600 outline outline-4 outline-gray-900" />
                  <p className="text-xs font-semibold text-indigo-400 mb-1">
                    {new Date(c.date + "T00:00:00").toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                  <p className="text-white text-sm font-medium">
                    {c.description}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
