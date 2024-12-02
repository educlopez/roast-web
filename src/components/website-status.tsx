import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface WebsiteSubmission {
  id: number;
  status: "pending" | "done";
}

export function WebsiteStatus() {
  const [submissions, setSubmissions] = useState<WebsiteSubmission[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState<number>(0);
  const maxSpots = 5;
  const [availableSpots, setAvailableSpots] = useState<number>(maxSpots);

  useEffect(() => {
    async function fetchSubmissions() {
      const { data, error } = await supabase
        .from("website_submissions")
        .select("*");

      if (error) {
        console.error("Error fetching submissions:", error);
      } else {
        setSubmissions(data || []);
        setTotalSubmissions(data?.length || 0);
      }
    }

    fetchSubmissions();
  }, []);

  useEffect(() => {
    const pendingCount = submissions.filter(
      (submission) => submission.status === "pending"
    ).length;

    setAvailableSpots(maxSpots - pendingCount);
  }, [submissions]);

  return (
    <div className="flex flex-col">
      <p>
        Spots libres:{" "}
        <strong>{Math.max(0, maxSpots - totalSubmissions)}</strong> de{" "}
        <strong>{maxSpots}</strong>
      </p>
      {availableSpots === 0 ? (
        <p className="text-red-500">
          Estamos con mucha carga, no hay spots disponibles.
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
