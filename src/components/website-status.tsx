import { useAvailableSpots } from "@/hooks/use-available-spots";

export function WebsiteStatus() {
  const { pendingSpots, totalSubmissions, isLoading } = useAvailableSpots();
  const maxSpots = 5;

  return (
    <div className={`flex flex-col ${isLoading ? "blur-sm" : ""}`}>
      <p>
        Spots libres: <strong>{Math.max(0, maxSpots - pendingSpots)}</strong> de{" "}
        <strong>{maxSpots}</strong>
      </p>
      {pendingSpots >= 5 ? (
        <p className="text-red-500">
          Actualmente no hay spots disponibles.
          <br /> Por favor, vuelve más tarde para enviar tu proyecto.
        </p>
      ) : null}

      {totalSubmissions >= 10 ? (
        <p>
          Únete a los ya más de <strong>{totalSubmissions}</strong> en nuestra
          plataforma.
        </p>
      ) : null}
    </div>
  );
}
