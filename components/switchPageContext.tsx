// switchPageContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define context shape
interface SwitchPageContextType {
  switchPage: boolean;
  setSwitchPage: (value: boolean) => void;
  remainingMs: number;
}

const SwitchPageContext = createContext<SwitchPageContextType | undefined>(undefined);

export const useSwitchPage = () => {
  const context = useContext(SwitchPageContext);
  if (!context) throw new Error("useSwitchPage must be used within SwitchPageProvider");
  return context;
};

interface ProviderProps {
  children: ReactNode;
  targetDate?: Date; // optionally pass the Friday date
}

export const SwitchPageProvider = ({ children, targetDate }: ProviderProps) => {
  const now = Date.now();
  const nextTarget = targetDate ? targetDate.getTime() : new Date("2026-02-13T00:00:00").getTime();

  // **synchronously initialize state based on current time**
  const [switchPage, setSwitchPage] = useState(now >= nextTarget);
  const [remainingMs, setRemainingMs] = useState(Math.max(0, nextTarget - now));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSwitchPage(now >= nextTarget);
      setRemainingMs(Math.max(0, nextTarget - now));
    }, 250);

    return () => clearInterval(timer);
  }, [nextTarget]);

  return (
    <SwitchPageContext.Provider value={{ switchPage, setSwitchPage, remainingMs }}>
      {children}
    </SwitchPageContext.Provider>
  );
};
