"use client";

import { createContext, useContext, useState } from "react";

type MessageContextType = {
  index: number;
  increment: () => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(-1);

  return (
    <MessageContext.Provider
      value={{
        index,
        increment: () => setIndex((i) => i + 1),
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return ctx;
}