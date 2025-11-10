import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAvailableSpots() {
  const [spots, setSpots] = useState<{
    availableSpots: number;
    pendingSpots: number;
    totalSubmissions: number;
  }>({
    availableSpots: 0,
    pendingSpots: 0,
    totalSubmissions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const maxSpots = 5;

  useEffect(() => {
    async function fetchSubmissions() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("website_submissions")
        .select("*");

      if (error) {
        console.error("Error fetching submissions:", error);
        setIsLoading(false);
        return;
      }

      const pendingCount =
        data?.filter((submission) => submission.status === "pending").length ||
        0;

      const availableCount = maxSpots - pendingCount;
      const totalSubmissions = data.length;
      setSpots({
        availableSpots: Math.max(0, availableCount),
        pendingSpots: pendingCount,
        totalSubmissions,
      });
      setIsLoading(false);
    }

    fetchSubmissions();
  }, []);

  return { ...spots, isLoading };
}
