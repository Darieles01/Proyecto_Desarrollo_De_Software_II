import { useEffect, useState } from "react";
import { Camera, Pencil } from "lucide-react";
import type { Customer } from "../../../models/Customers.model";
import { getCustomer } from "../../../services/Customers.service";

export function Profile() {
  const [profile, setProfile] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomer()
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-lg">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-16 px-6">
      <div className="mx-auto max-w-5xl">

        <div className="relative rounded-2xl bg-gray-900 outline outline-white/10 shadow-xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-2 w-full bg-indigo-600" />

          <div className="p-10 flex flex-col sm:flex-row gap-10">

            {/* Left — avatar */}
            <div className="flex flex-col items-center gap-4 sm:w-52 shrink-0">
              <div className="relative group">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-44 h-44 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
                />
                <button className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </button>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 text-white text-sm font-semibold">
                <Camera size={15} />
                Cambiar Foto
              </button>
            </div>

            {/* Right — info */}
            <div className="flex-1 flex flex-col">

              {/* Header — edit button hidden on mobile */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                    Perfil del Cliente
                  </p>
                  <h1 className="mt-2 text-4xl font-bold text-white tracking-tight">
                    {profile.name}
                  </h1>
                </div>
                {/* Edit button — only visible on sm+ */}
                <button className="hidden sm:flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 text-white text-sm font-semibold">
                  <Pencil size={15} />
                  Editar Perfil
                </button>
              </div>

              <div className="border-t border-white/10 mb-8" />

              {/* Fields grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Nombre:</p>
                  <p className="text-white text-base font-medium">{profile.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Teléfono:</p>
                  <p className="text-white text-base font-medium">{profile.phone}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Email:</p>
                  <p className="text-gray-300 text-base">{profile.email}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Tarjeta profesional:</p>
                  <p className="text-gray-300 text-base">{profile.professionalCard}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Dirección:</p>
                  <p className="text-gray-300 text-base">{profile.address}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">Firma:</p>
                  <p className="text-gray-300 text-base whitespace-pre-line italic">{profile.signature}</p>
                </div>

              </div>

              {/* Edit button — only visible on mobile, at the very bottom */}
              <div className="mt-10 sm:hidden">
                <button className="flex items-center justify-center gap-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition px-5 py-3 text-white text-sm font-semibold">
                  <Pencil size={15} />
                  Editar Perfil
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}