"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "@/components/flowers.scss";
import Construction from "@/components/construction";
import { SwitchPageProvider, useSwitchPage } from "@/components/switchPageContext";

export default function SaturdayWrapper() {
  return (
    <SwitchPageProvider targetDate={new Date("2026-02-14T00:00:00")}>
      <Saturday />
    </SwitchPageProvider>
  );
}

export function Saturday() {
  const { switchPage, remainingMs } = useSwitchPage();

  return switchPage ? <Valentine /> : <Construction remainingMs={remainingMs} message={"Come back on Friday to unlock the start of Valentine's Day weekend!"} day={"Friday"} />;
}

function Valentine() {
  const [letterOpen, setLetterOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (letterRef.current && !letterRef.current.contains(e.target as Node)) {
        setLetterOpen(false);
      }
    }
    if (letterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [letterOpen]);

  return (
    <div className="valentine-page">
      <Link href="/friday" className="magic-link nav-link nav-left" aria-label="Go to Friday">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-icon arrow-left">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      <Link href="/sunday" className="magic-link nav-link nav-right" aria-label="Go to Sunday">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-icon">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      {/* Chandelier */}
      <div className="chandelier">
        <div className="chain"></div>
        
        <div className="chandelier-body">
          <div className="ch-group left">
            <div className="ch-candle">
              <div className="flame"></div>
            </div>
            <div className="ch-candle">
              <div className="flame"></div>
            </div>
          </div>
        
          <div className="ch-group right">
            <div className="ch-candle">
              <div className="flame"></div>
            </div>
            <div className="ch-candle">
              <div className="flame"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Falling Petals */}
      <div className="petals">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${5 + i * 4}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${12 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Happy Valentine's Day</h1>
        <h2 className="subtitle">I wrote you something...</h2>

        <p><i>Hint: Under the soft glow of candlelight, with petals drifting through the air, tonight belongs only to us.</i></p>

        {/* Button to open letter */}
        <button className="scroll-closed" onClick={() => setLetterOpen(true)}>
          View Letter
        </button>

        {/* Centered Absolute Letter */}
        {letterOpen && (
          <div className="letter-content absolute-center" ref={letterRef}>
            <p>Dear Chesney,</p>
            <br></br>
            <p>Look how fancy this font is! It's so fancy and small, it's almost impossible to read! Anyways, I'll keep this short, but I just wanted to say that I love you. Creating this project with you in mind has been so much fun and so rewarding for me. You mean the world to me and hopefully you can see that based on the amount of hours I put into creating this site for you, haha.</p>
            <br></br>
            <p>P.S. I bet you can't guess what we're doing tonight...</p>
            <br></br>
            <p>Sincerely,</p>
            <p>Carter</p>
          </div>
        )}
      </div>

      {/* Bottom Scene */}
      <div className="bottom-scene">
        {/* Plates */}
        <div className="plate left-plate"></div>
        <div className="plate right-plate"></div>

        {/* Three Center Candles */}
        <div className="three-candles">
          <div className="candle small">
            <div className="flame"></div>
          </div>

          <div className="candle center">
            <div className="flame"></div>
          </div>

          <div className="candle small">
            <div className="flame"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --rose: #f8d7da;
          --deep-red: #6b0f1a;
          --dark-red: #4a0d14;
          --cream: #fff8f2;
        }

        body {
          margin: 0;
          font-family: "Georgia", serif;
        }
      `}</style>

      <style jsx>{`
        .valentine-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: radial-gradient(
              circle at top,
              #fff5f6 0%,
              #f3c6cf 40%,
              #d88fa1 100%
            );
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .valentine-page::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          top: -200px;
          right: -200px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.5),
            transparent 70%
          );
          filter: blur(80px);
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 2;
          animation: float 6s ease-in-out infinite;
          padding: 2rem;
          max-width: 700px;
        }

        h1 {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: var(--deep-red);
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 1.5rem;
          color: var(--dark-red);
          margin-bottom: 1.5rem;
        }

        p {
          font-size: 1.1rem;
          color: #3a1a1f;
          line-height: 1.6;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .scroll-closed {
          background: linear-gradient(to bottom, #e8d3b9, #d7b98f);
          padding: 12px 28px;
          border-radius: 40px;
          display: inline-block;
          font-weight: bold;
          color: #4a2c1a;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          border: none;
          font-size: 1rem;
          margin-top: 2rem;
        }

        .letter-content.absolute-center {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scaleY(0.2);
          padding: 2rem;
          background: linear-gradient(to bottom, #fdf6e3, #f1e4c6);
          border-radius: 8px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          font-family: "Brush Script MT", cursive;
          font-size: 1.3rem;
          color: #4a2c1a;
          text-align: left;
          animation: unroll 0.6s ease forwards;
          z-index: 999;
          width: 600px;
        }

        @keyframes unroll {
          from {
            transform: translate(-50%, -50%) scaleY(0.2);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scaleY(1);
            opacity: 1;
          }
        }

        /* PETALS */
        .petals {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .petal {
          position: absolute;
          top: -80px;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #ff6b81 0%, #c9184a 100%);
          border-radius: 50% 50% 50% 0;
          opacity: 0.8;
          transform: rotate(45deg);
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.8; }
        }

        /* BOTTOM SCENE */
        .bottom-scene {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 200px;
          pointer-events: none;
        }

        .plate {
          position: absolute;
          bottom: 30px;
          width: 120px;   /* smaller */
          height: 20px;   /* slightly thinner */
          background: linear-gradient(to bottom, #ffffff, #e6e6e6);
          border-radius: 50%;
          box-shadow: 0 8px 14px rgba(0,0,0,0.25);
        }

        .left-plate {
          left: 3%;
        }

        .right-plate {
          right: 3%;
        }

        /* Center candle */
        .center-candle {
          position: absolute;
          bottom: 90px;
          width: 26px;
          height: 110px;
          background: linear-gradient(to bottom, #fff8f2, #e6d3c5);
          border-radius: 8px;
        }

        .three-candles {
          position: absolute;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: flex-end;
          gap: 20px;   /* was 40px — now tighter */
          pointer-events: none;
        }

        .candle {
          position: relative;
          width: 26px;
          height: 110px;
          background: linear-gradient(to bottom, #fff8f2, #e6d3c5);
          border-radius: 8px;
        }

        .candle.small {
          height: 80px;
          width: 20px;
          border-radius: 6px;
        }

        .candle.center {
          height: 130px;
          width: 32px;
        }

        /* Glow */
        .candle::after {
          content: "";
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 160px;
          background: radial-gradient(
            circle,
            rgba(255, 200, 120, 0.4),
            transparent 70%
          );
          filter: blur(30px);
        }

        .flame {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 28px;
          background: radial-gradient(
            circle at 50% 20%,
            #fff 0%,
            #ffb703 40%,
            #fb8500 80%
          );
          border-radius: 50%;
          animation: flicker 0.15s infinite alternate;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.08); }
        }


        .flame {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 28px;
          background: radial-gradient(circle at 50% 20%, #fff 0%, #ffb703 40%, #fb8500 80%);
          border-radius: 50%;
          animation: flicker 0.15s infinite alternate;
        }

        /* =========================
           CHANDELIER
        ========================== */

        .chandelier {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: sway 6s ease-in-out infinite;
          pointer-events: none;
        }

        .chain {
          width: 4px;
          height: 80px;
          background: linear-gradient(to bottom, #caa85e, #8f6b2e);
        }

        .chandelier-body {
          width: 220px;
          height: 60px;
          border: 6px solid #d4af37;
          border-top: none;
          border-radius: 0 0 120px 120px;
          display: flex;
          justify-content: space-between; /* pushes groups apart */
          align-items: flex-start;
          padding: 10px 25px 0 25px; /* spacing from edges */
          position: relative;
        }

        .ch-group {
          display: flex;
          gap: 8px; /* candles close together */
          z-index: -1;
        }

        .chandelier-body::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 20px;
          background: #d4af37;
          border-radius: 0 0 10px 10px;
        }

        .ch-candle {
          position: relative;
          width: 16px;
          height: 45px;
          background: linear-gradient(to bottom, #fff8f2, #e6d3c5);
          border-radius: 6px;
        }

        .ch-candle::after {
          content: "";
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(
            circle,
            rgba(255, 220, 150, 0.35),
            transparent 70%
          );
          filter: blur(20px);
        }

        @keyframes sway {
          0% { transform: translateX(-50%) rotate(-2deg); }
          50% { transform: translateX(-50%) rotate(2deg); }
          100% { transform: translateX(-50%) rotate(-2deg); }
        }

        :global(.magic-link.nav-link) {
          top: 50%;
          background: linear-gradient(135deg, #f7e1b5, #d3a15d);
          box-shadow: 0 0 22px rgba(255, 214, 170, 0.95), 0 0 40px rgba(255, 200, 140, 0.7);
          filter: drop-shadow(0 0 12px rgba(255, 210, 150, 0.9));
        }

        :global(.magic-link.nav-left) {
          left: 20px;
          right: auto;
        }

        :global(.magic-link.nav-right) {
          right: 20px;
          left: auto;
        }

        :global(.magic-link.nav-link:hover) {
          box-shadow: 0 0 32px rgba(255, 214, 170, 1), 0 0 52px rgba(255, 200, 140, 0.9);
          filter: drop-shadow(0 0 16px rgba(255, 210, 150, 1));
        }

        .arrow-left {
          transform: rotate(180deg);
        }


      `}</style>
    </div>
  );
}
