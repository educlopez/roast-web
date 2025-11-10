import { useAvailableSpots } from "@/hooks/use-available-spots";

export function WebsiteStatus() {
  const { totalSubmissions, isLoading } = useAvailableSpots();

  return (
    <div className={`flex flex-col text-sm ${isLoading ? "blur-xs" : ""}`}>
      <p>
        Más de <strong> {isLoading ? "0" : totalSubmissions}</strong> proyectos
        rediseñados.
      </p>
    </div>
  );
}
