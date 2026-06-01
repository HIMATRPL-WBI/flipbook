import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import "./flipbook.css";

const PAGES = [
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286364/1_seuhep.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286364/2_j2jgdl.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286383/3_xnqvvo.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286368/4_usmdls.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286367/5_xpwzni.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286374/6_tqi63i.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286373/7_otgvdg.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286376/8_xtyqim.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286377/9_krtmee.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286380/10_v7p1d4.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286367/11_q9pqzz.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286362/12_xycrbb.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286362/13_rmm7jg.png",
  "https://res.cloudinary.com/dwfvqbhiv/image/upload/v1780286375/14_giagjs.png",
];

function BookInstance({ fullscreen }: { fullscreen?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const pages = Array.from(root.getElementsByClassName("page")) as HTMLElement[];
    pages.forEach((page, i) => {
      if (i % 2 === 0) page.style.zIndex = String(pages.length - i);
    });
    const handlers: Array<() => void> = [];
    pages.forEach((page, i) => {
      const pageNum = i + 1;
      const onClick = () => {
        if (pageNum % 2 === 0) {
          page.classList.remove("flipped");
          (page.previousElementSibling as HTMLElement | null)?.classList.remove("flipped");
        } else {
          page.classList.add("flipped");
          (page.nextElementSibling as HTMLElement | null)?.classList.add("flipped");
        }
      };
      page.addEventListener("click", onClick);
      handlers.push(() => page.removeEventListener("click", onClick));
    });
    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <div className={`book ${fullscreen ? "book-fs" : ""}`} ref={ref}>
      <div className="pages">
        {PAGES.map((src, i) => (
          <div key={i} className="page" style={{ backgroundImage: `url('${src}')` }} />
        ))}
      </div>
    </div>
  );
}

export default function Flipbook() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="flipbook-wrap relative">
        <BookInstance />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-2 right-2 z-10 flex items-center gap-2 bg-card border border-border paper-shadow px-3 py-1.5 font-caveat text-lg rotate-[2deg] hover:rotate-0 hover:bg-[var(--mustard)] transition-all"
          aria-label="Buka flipbook fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
          full page
        </button>
      </div>

      {open && (
        <div className="flipbook-fs-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-card border border-border paper-shadow px-3 py-1.5 font-caveat text-xl rotate-[-2deg] hover:rotate-0 hover:bg-[var(--mustard)] transition-all"
            aria-label="Tutup fullscreen"
          >
            <X className="w-4 h-4" />
            close
          </button>
          <p className="absolute top-5 left-6 font-marker text-xl sm:text-2xl text-foreground rotate-[-3deg] select-none">
            MAKRAB <span className="text-[var(--slate-violet)]">2026</span>
          </p>
          <div className="flipbook-fs-inner">
            <BookInstance fullscreen />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-caveat text-xl text-foreground/70">
            klik halaman untuk flip · tekan ESC untuk keluar
          </p>
        </div>
      )}
    </>
  );
}
