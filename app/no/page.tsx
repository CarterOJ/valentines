"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMessage } from "@/components/messageContext";
import { messages } from "@/utils/messages";

export default function NoPage() {
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const { index, increment } = useMessage();

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setShowText(true), 1000);
    const redirectTimer = window.setTimeout(() => {router.push("/")}, 3500);
    increment();

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="valentine-bg">
      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="glow-orb glow-orb-left" aria-hidden="true" />
        <div className="glow-orb glow-orb-right" aria-hidden="true" />

        {showText && (
          <h1 className="fade-up mt-6 max-w-3xl font-title text-5xl font-semibold leading-[1.05] text-rose-950 sm:text-6xl">
            {messages[index % messages.length]}
          </h1>
        )}
      </main>
    </div>
  );
}
