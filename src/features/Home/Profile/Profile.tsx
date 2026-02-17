import { useEffect, useState } from "react";
import type { Customer } from "../../../models/Customers.model";
import { getCustomer } from "../../../services/Customers.service"; // ← agregar

export function Profile() {
  const [profile, setProfile] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomer()             
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return <div className="text-white">Cargando perfil...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img1.wallspic.com/crops/7/6/3/8/6/168367/168367-tablet-asus-hdmi-frecuencia_de_actualizacion-naturaleza-3840x2160.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-xl shadow-2xl p-8 w-full max-w-lg text-center border border-red-600">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-32 h-32 rounded-full border-4 border-red-600 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-4xl font-extrabold text-red-500 mb-2 tracking-wide">
          {profile.name}
        </h1>
        <p className="text-sm text-gray-400 mb-2">
          <span className="font-semibold text-red-400">Email:</span> {profile.email}
        </p>
        <p className="text-sm text-gray-400 mb-6">
          <span className="font-semibold text-red-400">Teléfono:</span> {profile.phone}
        </p>
        </div>
      </div>
  );
}