import { createFileRoute } from "@tanstack/react-router";
import Flipbook from "@/components/Flipbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAKRAB HIMATRPL 2026" },
      { name: "description", content: "Makrab HIMATRPL 2026 — Digital scrapbook & flipbook kenangan keakraban mahasiswa." },
      { property: "og:title", content: "MAKRAB HIMATRPL 2026" },
      { property: "og:description", content: "Lebih dari sekadar kumpul, ini core memory pertama kita." },
    ],
  }),
  component: Index,
});

function Doodle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block ${className}`}>{children}</span>;
}

function StickyNote({
  text,
  className,
  color = "mustard",
  rotate = "-3deg",
  tape = "default",
  float = "float-slow",
}: {
  text: string;
  className?: string;
  color?: "mustard" | "violet" | "kraft" | "white";
  rotate?: string;
  tape?: "default" | "violet" | "kraft";
  float?: string;
}) {
  const bg = {
    mustard: "bg-[oklch(0.9_0.12_90)]",
    violet: "bg-[oklch(0.85_0.06_285)]",
    kraft: "bg-[oklch(0.85_0.06_70)]",
    white: "bg-[oklch(0.98_0.005_90)]",
  }[color];
  return (
    <div
      className={`sticky-note ${bg} ${float} max-w-[220px] ${className ?? ""}`}
      style={{ ["--r" as never]: rotate, transform: `rotate(${rotate})` }}
    >
      <span className={`washi-tape ${tape !== "default" ? tape : ""} -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]`} />
      <p className="font-kalam text-[15px] leading-snug text-foreground">{text}</p>
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="relative z-20 flex items-start justify-between px-4 sm:px-8 pt-6">
        <div className="font-marker text-sm sm:text-base bg-card paper-shadow px-3 py-2 rotate-[-4deg] border border-border">
          WBI Politeknik
        </div>
        <div className="font-marker text-sm sm:text-base bg-card paper-shadow px-3 py-2 rotate-[3deg] border border-border">
          HIMATRPL
        </div>
      </header>

      {/* Title */}
      <section className="relative z-10 mt-8 sm:mt-12 px-4 text-center">
        <div className="inline-block relative">
          <span className="washi-tape violet -top-4 -left-6 rotate-[-12deg]" />
          <span className="washi-tape kraft -top-4 -right-6 rotate-[15deg]" />
          <h1 className="font-marker text-5xl sm:text-7xl md:text-8xl tracking-wide text-foreground rotate-[-2deg] leading-none px-4 py-3">
            MAKRAB <br className="sm:hidden" />
            <span className="text-[var(--mustard)]">HIMATRPL</span> 2026
          </h1>
          <Doodle className="absolute -top-10 -right-10 text-4xl rotate-12 float-slower">
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
              <path d="M4 32 L14 8 L22 28 L28 6 L34 28 L42 8 L52 32 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="oklch(0.82 0.14 85)" className="text-foreground" />
            </svg>
          </Doodle>
          <p className="font-caveat text-2xl sm:text-3xl text-[var(--slate-violet)] mt-3 rotate-[1deg]">
            ~ a little scrapbook of our story ~
          </p>
          <svg className="mx-auto mt-2" width="180" height="14" viewBox="0 0 180 14">
            <path d="M2 8 Q 20 2, 40 8 T 80 8 T 120 8 T 160 8 T 178 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* Floating sticky notes around */}
      <StickyNote
        text="More than just a gathering, it's our first core memory."
        className="absolute left-4 sm:left-10 top-[260px] sm:top-[300px] z-10"
        color="mustard"
        rotate="-6deg"
        tape="violet"
      />
      <StickyNote
        text="Awal dari semuanya."
        className="absolute right-4 sm:right-12 top-[280px] sm:top-[320px] z-10 hidden sm:block"
        color="violet"
        rotate="5deg"
        tape="kraft"
        float="float-slower"
      />

      {/* Doodles floating */}
      <div className="pointer-events-none absolute left-[8%] top-[480px] text-foreground float-slowest" style={{ ["--r" as never]: "10deg", transform: "rotate(10deg)" }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" fill="oklch(0.82 0.14 85)" />
          <circle cx="20" cy="22" r="1.5" fill="currentColor" />
          <circle cx="28" cy="22" r="1.5" fill="currentColor" />
          <path d="M19 27 Q24 31 29 27" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Crown doodle */}
      <div className="pointer-events-none absolute right-[6%] top-[520px] float-slow" style={{ ["--r" as never]: "-8deg", transform: "rotate(-8deg)" }}>
        <svg width="60" height="44" viewBox="0 0 60 44" fill="none">
          <path d="M5 38 L10 14 L20 28 L30 8 L40 28 L50 14 L55 38 Z" stroke="oklch(0.22 0.012 260)" strokeWidth="2.5" fill="oklch(0.82 0.14 85)" strokeLinejoin="round" />
          <circle cx="10" cy="14" r="2.5" fill="oklch(0.62 0.08 280)" />
          <circle cx="30" cy="8" r="2.5" fill="oklch(0.62 0.08 280)" />
          <circle cx="50" cy="14" r="2.5" fill="oklch(0.62 0.08 280)" />
        </svg>
      </div>

      {/* Flipbook container */}
      <section className="relative z-10 mt-72 sm:mt-80 px-4 sm:px-8 pb-24">
        <div className="mx-auto max-w-5xl">
          <p className="font-caveat text-3xl text-center text-foreground mb-6 rotate-[-1deg]">
            flip the pages → relive the moments ✨
          </p>

          <div className="relative mx-auto">
            {/* Washi tapes around the polaroid frame */}
            <span className="washi-tape -top-4 left-8 rotate-[-8deg] z-20" />
            <span className="washi-tape violet -top-4 right-12 rotate-[10deg] z-20" />
            <span className="washi-tape kraft -bottom-4 left-1/2 -translate-x-1/2 rotate-[3deg] z-20" />

            {/* Polaroid frame */}
            <div className="bg-card paper-shadow border border-border p-3 sm:p-5 pb-12 sm:pb-16 rotate-[-1deg]">
              <div
                id="flipbook-container"
                className="relative w-full bg-[oklch(0.94_0.015_120)] border border-border overflow-hidden"
              >
                <Flipbook />
              </div>
              <p className="font-caveat text-2xl text-center text-foreground/70 mt-3">
                — our flipbook lives here —
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More sticky notes */}
      <section className="relative z-10 px-4 sm:px-8 pb-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
          <StickyNote
            text="Bukan sekedar kegiatan, tapi rumah kedua."
            color="kraft"
            rotate="-4deg"
            tape="violet"
          />
          <StickyNote
            text="Cape? iya. Nyesel? engga. Seru? gila."
            color="white"
            rotate="3deg"
            tape="default"
            float="float-slower"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pb-12 text-center px-4">
        <svg className="mx-auto mb-3" width="220" height="14" viewBox="0 0 220 14">
          <path d="M2 8 Q 20 2, 40 8 T 80 8 T 120 8 T 160 8 T 200 8 T 218 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <p className="font-caveat text-2xl sm:text-3xl text-foreground rotate-[-1deg] inline-block">
          Kenangan yang nggak akan kita lupain. <span className="text-[var(--slate-violet)]">— 2026</span>
        </p>
      </footer>
    </div>
  );
}
