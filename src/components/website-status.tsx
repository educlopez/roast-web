import { useAvailableSpots } from "@/hooks/use-available-spots";

export function WebsiteStatus() {
  const { totalSubmissions, isLoading } = useAvailableSpots();

  return (
    <div className={`flex flex-col text-sm ${isLoading ? "blur-sm" : ""}`}>
      <p>
        Únete a los ya más de{" "}
        <strong> {!isLoading ? totalSubmissions : "0"}</strong> proyectos
        rediseñados.
      </p>
    </div>
  );
}
