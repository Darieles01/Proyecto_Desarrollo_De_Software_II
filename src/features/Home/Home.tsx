import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [clientName, setClientName] = useState("Cliente");
  const [petsCount, setPetsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await fetch('/Customers.json');
        const customerData = await customerResponse.json();
        setClientName(customerData.name);

        const petsResponse = await fetch('/Pets.json');
        const petsData = await petsResponse.json();
        setPetsCount(petsData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-24 sm:py-32 w-full">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400">
            Menú Principal
          </h2>

          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Bienvenido de nuevo {clientName} 👋
          </p>

          <p className="mt-4 text-gray-400">
            Gestiona tus mascotas, historial médico y vacunas en un solo lugar.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-px rounded-2xl bg-gray-800"></div>

          <div className="relative flex flex-col items-center text-center rounded-2xl p-10">
            <h3 className="text-2xl font-semibold text-white">
              Resumen general
            </h3>

            <p className="mt-4 text-gray-400">Total de mascotas registradas</p>

            <p className="mt-2 text-5xl font-bold text-indigo-400">
              {petsCount}
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/pets"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
              >
                Mis mascotas
              </Link>

              <Link
                to="/profile"
                className="rounded-lg border border-gray-600 px-6 py-3 text-white font-medium hover:bg-gray-700 transition"
              >
                Tu cuenta
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-px rounded-2xl shadow-sm outline outline-white/10"></div>
        </div>
      </div>
    </div>
  );
}