import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAvailableSpots() {
  const [availableSpots, setAvailableSpots] = useState<number>(0);
  const maxSpots = 5;

  useEffect(() => {
    async function fetchSubmissions() {
      const { data, error } = await supabase
        .from("website_submissions")
        .select("*");

      if (error) {
        console.error("Error fetching submissions:", error);
        return;
      }

      const pendingCount = data?.filter(
        (submission) => submission.status === "pending"
      ).length;

      setAvailableSpots(maxSpots - (pendingCount || 0));
    }

    fetchSubmissions();
  }, []);

  return availableSpots;
}
