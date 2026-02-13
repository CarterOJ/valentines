"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "@/components/messageContext";
import { messages } from "@/utils/messages";

interface DogPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scaleX: number;
}

export default function Home() {
  const { index } = useMessage();
  const isGiantYes = index % messages.length === 3;
  const isDarkStage = index % messages.length === 4;
  const isDogStage = index % messages.length === 6;
  const [isLightOn, setIsLightOn] = useState(false);
  const isLastMessage = index % messages.length === messages.length - 1;
  const isEvasive = index % messages.length === messages.length - 3;
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [baoPos, setBaoPos] = useState<DogPosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scaleX: 1,
  });
  const [mushuPos, setMushuPos] = useState<DogPosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scaleX: 1,
  });
  const noWrapperRef = useRef<HTMLSpanElement | null>(null);
  const noRectRef = useRef<DOMRect | null>(null);
  const noBoundsRef = useRef<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);
  const baoRef = useRef<DogPosition>({ x: 0, y: 0, targetX: 0, targetY: 0, scaleX: 1 });
  const mushuRef = useRef<DogPosition>({ x: 0, y: 0, targetX: 0, targetY: 0, scaleX: 1 });

  const generateRandomPoint = () => {
    return {
      x: Math.random() * (window.innerWidth - 229),
      y: Math.random() * (window.innerHeight - 200),
    };
  };

  const createDogAnimation = (
    dogRef: React.MutableRefObject<DogPosition>,
    setDogPos: React.Dispatch<React.SetStateAction<DogPosition>>
  ) => {
    const animate = () => {
      const dog = dogRef.current;
      const speed = 2.5;
      const distance = Math.sqrt(
        Math.pow(dog.targetX - dog.x, 2) + Math.pow(dog.targetY - dog.y, 2)
      );

      if (distance < 10) {
        // Reached target, pick new one
        const newTarget = generateRandomPoint();
        dog.targetX = newTarget.x;
        dog.targetY = newTarget.y;
      }

      const angle = Math.atan2(dog.targetY - dog.y, dog.targetX - dog.x);
      dog.x += Math.cos(angle) * speed;
      dog.y += Math.sin(angle) * speed;

      // Determine direction and flip sprite based on movement direction
      dog.scaleX = dog.targetX > dog.x ? 1 : -1;

      setDogPos({ ...dog });
      requestAnimationFrame(animate);
    };

    // Initialize target
    const initialTarget = generateRandomPoint();
    const dog = dogRef.current;
    dog.targetX = initialTarget.x;
    dog.targetY = initialTarget.y;
    setDogPos({ ...dog });

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isDarkStage) {
      setIsLightOn(false);
    }
  }, [isDarkStage]);

  useEffect(() => {
    if (isDogStage) {
      createDogAnimation(baoRef, setBaoPos);
    }
  }, [isDogStage]);

  useEffect(() => {
    if (isDogStage) {
      createDogAnimation(mushuRef, setMushuPos);
    }
  }, [isDogStage]);

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
      {isDogStage && (
        <>
          <div
            className="dog-runner"
            aria-hidden="true"
            style={{
              transform: `translate(${baoPos.x}px, ${baoPos.y}px) scaleX(${baoPos.scaleX})`,
            }}
          />
          <div
            className="dog-runner-mushu"
            aria-hidden="true"
            style={{
              transform: `translate(${mushuPos.x}px, ${mushuPos.y}px) scaleX(${mushuPos.scaleX})`,
            }}
          />
        </>
      )}
      <main
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center"
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
          Will you be my Valentine?
        </h1>
        <p className="fade-up delay-2 stage-hidden mt-6 max-w-2xl text-base leading-7 text-rose-900/70 sm:text-lg">
          Cause I guess I still gotta ask you apparently? I've got plans for us this Valentine's Day weekend, and this website is gonna play a part. Keep checking back. Who know's what might appear here.
        </p>

        <div className="fade-up delay-3 mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            className={`primary-cta${isGiantYes ? " primary-cta-giant" : ""}${isDarkStage && !isLightOn ? " primary-cta-spotlight" : ""}`}
            href="/friday"
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
              href={isLastMessage ? "/friday" : "/no"}
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
