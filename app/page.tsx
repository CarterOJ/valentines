"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "./messageContext";
import { messages } from "./messages";

export default function Home() {
  const { index } = useMessage();
  const isGiantYes = index % messages.length === 3;
  const isDarkStage = index % messages.length === 4;
  const [isLightOn, setIsLightOn] = useState(false);
  const isLastMessage = index % messages.length === messages.length - 1;
  const isEvasive = index % messages.length === messages.length - 2;
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const noWrapperRef = useRef<HTMLSpanElement | null>(null);
  const noRectRef = useRef<DOMRect | null>(null);
  const noBoundsRef = useRef<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);

  useEffect(() => {
    if (!isDarkStage) {
      setIsLightOn(false);
    }
  }, [isDarkStage]);

  useEffect(() => {
    if (!isEvasive) {
      setNoOffset({ x: 0, y: 0 });
      return;
    }

    const updateBounds = () => {
      if (!noWrapperRef.current) {
        return;
      }
      const rect = noWrapperRef.current.getBoundingClientRect();
      noRectRef.current = rect;
      noBoundsRef.current = {
        minX: -rect.left,
        maxX: window.innerWidth - rect.left - rect.width,
        minY: -rect.top,
        maxY: window.innerHeight - rect.top - rect.height,
      };
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, [isEvasive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isEvasive || !noRectRef.current || !noBoundsRef.current) {
      return;
    }

    const rect = noRectRef.current;
    const bounds = noBoundsRef.current;

    setNoOffset((prev) => {
      const centerX = rect.left + rect.width / 2 + prev.x;
      const centerY = rect.top + rect.height / 2 + prev.y;
      const dx = centerX - event.clientX;
      const dy = centerY - event.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const threshold = 220;

      if (distance > threshold) {
        return prev;
      }

      const safeDistance = distance || 1;
      const intensity = (threshold - distance) / threshold;
      const step = 110 * intensity;
      const perp = 0.35 * intensity;
      const moveX = (dx / safeDistance) * step + (dy / safeDistance) * step * perp;
      const moveY = (dy / safeDistance) * step - (dx / safeDistance) * step * perp;

      const nextX = Math.max(bounds.minX, Math.min(bounds.maxX, prev.x + moveX));
      const nextY = Math.max(bounds.minY, Math.min(bounds.maxY, prev.y + moveY));
      return { x: nextX, y: nextY };
    });
  };

  return (
    <div className={`valentine-bg${isDarkStage && !isLightOn ? " dark-stage" : ""}`}>
      <main
        className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setNoOffset({ x: 0, y: 0 })}
      >
        {isDarkStage && (
          <button
            className={`light-switch${isLightOn ? " is-on" : ""}`}
            type="button"
            onClick={() => setIsLightOn((prev) => !prev)}
            aria-pressed={isLightOn}
            aria-label="Toggle lights"
          >
            <span className="light-switch-plate">
              <span className="light-switch-screw light-switch-screw-top" />
              <span className="light-switch-toggle" />
              <span className="light-switch-screw light-switch-screw-bottom" />
            </span>
          </button>
        )}
        <div className="glow-orb glow-orb-left" aria-hidden="true" />
        <div className="glow-orb glow-orb-right" aria-hidden="true" />

        <p className="fade-up stage-hidden text-xs uppercase tracking-[0.3em] text-rose-700/80">
          Hey, pal
        </p>
        <h1 className="fade-up delay-1 stage-hidden mt-6 max-w-3xl font-title text-5xl font-semibold leading-[1.05] text-rose-950 sm:text-6xl">
          Would you be my Valentine?
        </h1>
        <p className="fade-up delay-2 stage-hidden mt-6 max-w-2xl text-base leading-7 text-rose-900/70 sm:text-lg">
          I've got plans for us this Valentine's Day, and this website is gonna play a big role. Keep checking back. Who know's what might appear here.
        </p>

        <div className="fade-up delay-3 mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            className={`primary-cta${isGiantYes ? " primary-cta-giant" : ""}${isDarkStage && !isLightOn ? " primary-cta-spotlight" : ""}`}
            href="/yes"
          >
            Yes
          </Link>
          <span
            ref={noWrapperRef}
            className="no-float stage-hidden"
            style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
          >
            <Link
              className={isLastMessage ? "primary-cta" : "secondary-cta"}
              href={isLastMessage ? "/yes" : "/no"}
            >
              {isLastMessage ? "Yes" : "No"}
            </Link>
          </span>
        </div>

        <p className="fade-up delay-4 stage-hidden mt-10 text-sm text-rose-900/60">
          P.S. You better not say no.
        </p>
      </main>
    </div>
  );
}
