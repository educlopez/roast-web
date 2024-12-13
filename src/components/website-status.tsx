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
      {totalSubmissions >= 10 ? (
        <p>
          Únete a los ya más de <strong>{totalSubmissions}</strong> proyectos
          rediseñados.
        </p>
      ) : null}
    </div>
  );
}
