import { Dog, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12">

          {/* Logo y Description */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-bold text-xl hover:text-yellow-400 transition"
            >
              <Dog size={24} />
              Veterinaria
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cuidado profesional y amor por tus mascotas. Gestiona la salud de
              tus compañeros en un solo lugar.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:ml-50">
            <h3 className="text-base font-semibold text-indigo-400 mb-4 uppercase tracking-wider">
              Contacto
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <span>+506 1234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span>info@veterinaria.com</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>San José, Costa Rica</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-base font-semibold text-indigo-400 mb-4 uppercase tracking-wider">
              Información
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/pets"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
                Mis Mascotas
              </Link>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
                Perfil del Cliente
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-8" />
        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-xs leading-relaxed">
            © {new Date().getFullYear()} Veterinaria. Todos los derechos
            reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Desarrollado por:{" "}
            <span className="text-indigo-400">Arwy Antonio Zamora Segura</span>,{" "}
            <span className="text-indigo-400">Dariel Andrés Calvo Brenes</span>,{" "}
            <span className="text-indigo-400">José Daniel Bolaños Alfaro</span>,{" "}
            <span className="text-indigo-400">
              Marvin Vinicio Castro González
            </span>
            ,{" "}
            <span className="text-indigo-400">Gerald José Urbina Quesada</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
