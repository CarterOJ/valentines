"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SwitchPageContextType {
  switchPage: boolean;
  setSwitchPage: (value: boolean) => void;
}

const SwitchPageContext = createContext<SwitchPageContextType | undefined>(undefined);

export function SwitchPageProvider({ children }: { children: ReactNode }) {
  const [switchPage, setSwitchPage] = useState(false);

  return (
    <SwitchPageContext.Provider value={{ switchPage, setSwitchPage }}>
      {children}
    </SwitchPageContext.Provider>
  );
}

export function useSwitchPage() {
  const context = useContext(SwitchPageContext);
  if (!context) throw new Error("useSwitchPage must be used within a SwitchPageProvider");
  return context;
}