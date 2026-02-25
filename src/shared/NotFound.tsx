export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <span className="inline-flex items-center rounded-full bg-indigo-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Error 404
        </span>

        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Página no encontrada
        </h1>

        <p className="mt-4 text-gray-400">
          La página que estás buscando no existe o fue movida.
        </p>
      </div>
    </div>
  );
}
