"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DateContextType {
  isDateReached: boolean;
  isSubmissionEnabled: boolean;
  currentPhase: "active" | "ended";
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DateContextType>({
    isDateReached: false,
    isSubmissionEnabled: true,
    currentPhase: "active",
  });

  useEffect(() => {
    function updateState() {
      const targetDate = new Date("2025-01-01");
      const currentDate = new Date();
      const isReached = currentDate >= targetDate;

      setState({
        isDateReached: isReached,
        isSubmissionEnabled: !isReached,
        currentPhase: isReached ? "ended" : "active",
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
