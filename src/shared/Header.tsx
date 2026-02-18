import { useState } from "react";
import { Dog, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-lg hover:text-yellow-400 transition"
          >
            <Dog size={22} />
            Veterinaria
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="/pets" className="text-sm font-semibold text-white hover:text-indigo-400 transition">
              Mis Mascotas
            </Link>
            <Link to="/profile" className="text-sm font-semibold text-white hover:text-indigo-400 transition">
              Perfil del Cliente
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            <Link
              to="/pets"
              className="text-sm font-semibold text-white hover:text-indigo-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Mis Mascotas
            </Link>
            <Link
              to="/profile"
              className="text-sm font-semibold text-white hover:text-indigo-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Perfil del Cliente
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
