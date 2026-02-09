import Link from "next/link";

export default function Home() {
  return (
    <div className="valentine-bg">
      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="glow-orb glow-orb-left" aria-hidden="true" />
        <div className="glow-orb glow-orb-right" aria-hidden="true" />

        <p className="fade-up text-xs uppercase tracking-[0.3em] text-rose-700/80">
          Hey, pal
        </p>
        <h1 className="fade-up delay-1 mt-6 max-w-3xl font-title text-5xl font-semibold leading-[1.05] text-rose-950 sm:text-6xl">
          Would you be my Valentine?
        </h1>
        <p className="fade-up delay-2 mt-6 max-w-2xl text-base leading-7 text-rose-900/70 sm:text-lg">
          I've got plans for us this Valentine's Day, and this website is gonna play a big role. Keep checking back. Who know's what might appear here.
        </p>

        <div className="fade-up delay-3 mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="primary-cta" type="button">
            Yes
          </button>
          <Link className="secondary-cta" href="/no">
            No
          </Link>
        </div>

        <p className="fade-up delay-4 mt-10 text-sm text-rose-900/60">
          P.S. You better not say no.
        </p>
      </main>
    </div>
  );
}
