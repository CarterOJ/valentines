export default function Home() {
  return (
    <div className="valentine-bg">
      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="glow-orb glow-orb-left" aria-hidden="true" />
        <div className="glow-orb glow-orb-right" aria-hidden="true" />

        <p className="fade-up text-xs uppercase tracking-[0.3em] text-rose-700/80">
          a little question
        </p>
        <h1 className="fade-up delay-1 mt-6 max-w-3xl font-title text-5xl font-semibold leading-[1.05] text-rose-950 sm:text-6xl">
          Would you be my Valentine?
        </h1>
        <p className="fade-up delay-2 mt-6 max-w-2xl text-base leading-7 text-rose-900/70 sm:text-lg">
          I want this to be the first page in a gift that keeps growing. Today,
          it starts with a simple yes.
        </p>

        <div className="fade-up delay-3 mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="primary-cta" type="button">
            Yes
          </button>
          <button className="secondary-cta" type="button">
            No
          </button>
        </div>

        <p className="fade-up delay-4 mt-10 text-sm text-rose-900/60">
          P.S. I am planning snacks, flowers, and a playlist.
        </p>
      </main>
    </div>
  );
}
