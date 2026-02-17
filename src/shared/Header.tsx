import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>HEADER</h1>
      <nav>
        <Link to="/mis-mascotas">
          <button>Mis Mascotas</button>
        </Link>
        <Link to="/perfil-cliente">
          <button>Perfil del Cliente</button>
        </Link>
      </nav>
    </header>
  );
}
