import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft, AlertCircle, Calendar } from "lucide-react";
import type { Pet } from "../../models/Pets.model";
import { getPetById } from "../../services/Pets.service";

export function PetConsultations() {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
      setError("ID inválido.");
      setLoading(false);
      return;
    }
    getPetById(numericId)
      .then((data) => setPet(data))
      .catch(() => setError("No se encontró la mascota."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg animate-pulse">
          Cargando historial...
        </p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-800 px-6">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-white text-xl font-semibold">{error}</p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Navegación superior */}

        <Link
          to={`/pet/${id}`}
          className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition w-fit"
        >
          <ArrowLeft size={16} />
          Volver al perfil de {pet.name}
        </Link>

        {/* Header de la sección */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Expediente Clínico
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Historial de Consultas
          </h1>
        </div>

        {/* Listado de Consultas */}
        <div className="grid gap-6">
          {pet.consultations.length === 0 ? (
            <div className="rounded-2xl bg-gray-900 outline outline-white/10 p-12 text-center">
              <p className="text-gray-400 text-sm">
                No hay consultas registradas para esta mascota.
              </p>
            </div>
          ) : (
            pet.consultations.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden"
              >
                <div className="h-1 w-full bg-indigo-600" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-600/20">
                      <Calendar size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                        Fecha de visita
                      </p>
                      <p className="text-white font-medium">
                        {new Date(c.date + "T00:00:00").toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-5 border border-white/5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Diagnóstico / Observaciones
                    </p>
                    <p className="text-gray-200 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
