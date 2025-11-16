"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  REGISTRATION_END_EXCLUSIVE,
  REGISTRATION_START,
} from "@/lib/registration-dates";

type DateContextType = {
  isDateReached: boolean;
  isSubmissionEnabled: boolean;
  currentPhase: "active" | "ended";
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DateContextType>({
    isDateReached: false,
    isSubmissionEnabled: false,
    currentPhase: "active",
  });

  useEffect(() => {
    function updateState() {
      const currentDate = new Date();
      const isAfterEnd = currentDate >= REGISTRATION_END_EXCLUSIVE;
      const isBeforeStart = currentDate < REGISTRATION_START;
      const isWithinWindow = !(isBeforeStart || isAfterEnd);

      setState({
        isDateReached: isAfterEnd,
        isSubmissionEnabled: isWithinWindow,
        currentPhase: isAfterEnd ? "ended" : "active",
      });
    }

    // Initial check
    updateState();

    // Check every hour (optional, but helps if user keeps the page open)
    const interval = setInterval(updateState, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return <DateContext.Provider value={state}>{children}</DateContext.Provider>;
}

export function useDateContext() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
}
