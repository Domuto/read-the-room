"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/private-events", label: "Private Events" },
  { href: "/contact", label: "Contact" },
  { href: "/tour", label: "3D Tour" },
  { href: "/crate", label: "The Crate" },
];

// Hamburger menu for small screens — the top nav is hidden below `sm`.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink/30 text-paper backdrop-blur-sm transition hover:border-ember hover:text-ember"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-md">
          <div className="flex items-center justify-end px-5 py-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition hover:border-ember hover:text-ember"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.3em] text-paper/70 transition hover:text-ember"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
