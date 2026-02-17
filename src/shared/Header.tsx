import { Dog } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-lg hover:text-yellow-400 transition"
          >
            <Dog size={22} />
            Veterinaria
          </Link>
        </div>

        <div className="flex gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition"
          >
            Home
          </Link>

          <Link
            to="/notfound"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition"
          >
            Mis Mascotas
          </Link>

          <Link
            to="/notfound"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition"
          >
            Perfil del Cliente
          </Link>
        </div>

        <div className="lg:flex-1" />
      </nav>
    </header>
  );
}