import { Film } from "lucide-react";
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
            <Film size={22} />
            Veterinaria
          </Link>
        </div>

        <div className="flex gap-8">
          <Link
            to="/movies"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition"
          >
            Perfil cliente
          </Link>

          <button className="text-sm font-semibold text-white opacity-60 cursor-default">
            Example 1
          </button>

          <button className="text-sm font-semibold text-white opacity-60 cursor-default">
            Example 2
          </button>
        </div>

        <div className="lg:flex-1" />
      </nav>
    </header>
  );
}