"use client";

import { useEffect, useState } from "react";

const pad = (value: number) => value.toString().padStart(2, "0");

const getNextFridayMidnight = (now: Date) => {
  const target = new Date(now);
  const friday = 5;
  const day = now.getDay();
  const daysUntilFriday = (friday - day + 7) % 7;

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target;
};

export default function YesPage() {
  const [target, setTarget] = useState<Date | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    const nextTarget = getNextFridayMidnight(new Date());
    setTarget(nextTarget);
    setRemainingMs(Math.max(0, nextTarget.getTime() - Date.now()));

    const timer = window.setInterval(() => {
      setRemainingMs(Math.max(0, nextTarget.getTime() - Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="construction-bg">
      <div className="construction-overlay" aria-hidden="true" />
      <main className="construction-shell">
        <div className="tape tape-top" aria-hidden="true" />
        <div className="tape tape-bottom" aria-hidden="true" />

        <div className="construction-card">
          <h1 className="construction-title">CAUTION</h1>
          <p className="construction-copy">
            This page is currently under construction. Come back on Friday to unlock the start of Valentine's Day Weekend!
          </p>

          <div className="timer">
            <div className="timer-header">Countdown to Friday midnight</div>
            <div className="timer-grid">
              <div className="timer-segment">
                <span className="timer-value">{pad(days)}</span>
                <span className="timer-label">Days</span>
              </div>
              <div className="timer-segment">
                <span className="timer-value">{pad(hours)}</span>
                <span className="timer-label">Hours</span>
              </div>
              <div className="timer-segment">
                <span className="timer-value">{pad(minutes)}</span>
                <span className="timer-label">Minutes</span>
              </div>
              <div className="timer-segment">
                <span className="timer-value">{pad(seconds)}</span>
                <span className="timer-label">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        <div className="construction-sign" aria-hidden="true">
        </div>
      </main>
    </div>
  );
}
