export default function Construction({remainingMs, message, day}: {remainingMs: number, message: string, day: string}) {
  const pad = (value: number) => value.toString().padStart(2, "0");
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
            This page is currently under construction. {message}
          </p>

          <div className="timer">
            <div className="timer-header">Countdown to {day} midnight</div>
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
      </main>
    </div>
  );
}