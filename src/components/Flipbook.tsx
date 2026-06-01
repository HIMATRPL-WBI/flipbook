import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import "./flipbook.css";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

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
  return (
    <div className="flipbook-wrap relative">
      <BookInstance />

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="absolute top-2 right-2 z-10 flex items-center gap-2 bg-card border border-border paper-shadow px-3 py-1.5 font-caveat text-lg rotate-[2deg] hover:rotate-0 hover:bg-[var(--mustard)] transition-all"
            aria-label="Buka flipbook fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
            view larger
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {/* Header in Pop-up */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 pointer-events-none z-50">
              <p className="font-marker text-2xl text-white rotate-[-2deg] drop-shadow-md">
                MAKRAB <span className="text-[var(--mustard)]">2026</span>
              </p>
              <DialogClose asChild>
                <button
                  type="button"
                  className="pointer-events-auto bg-white text-black border-2 border-black paper-shadow px-3 py-1 font-caveat text-xl hover:bg-[var(--mustard)] transition-all"
                >
                  CLOSE
                </button>
              </DialogClose>
            </div>

            {/* Flipbook Content */}
            <div className="w-full h-full flex items-center justify-center overflow-visible">
              <BookInstance fullscreen />
            </div>

            {/* Footer in Pop-up */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-sm px-6 py-1.5 rounded-full border border-white/10 pointer-events-none">
              <p className="font-caveat text-xl text-white/90">
                klik halaman untuk membalik · ESC untuk tutup
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
