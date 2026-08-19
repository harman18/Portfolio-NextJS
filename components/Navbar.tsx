"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/data/portfolio";
import { useUI } from "./Providers";

export default function Navbar() {
  const { openTerminal, navigate } = useUI();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // progressive responsive: how many links stay inline + whether terminal btn shows
  const [inline, setInline] = useState(navLinks.length);
  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) {
        setInline(6);
        setShowTerminal(true);
        setMenuOpen(false);
      } else if (w >= 1024) {
        setInline(5);
        setShowTerminal(true);
      } else if (w >= 768) {
        setInline(4);
        setShowTerminal(true);
      } else if (w >= 640) {
        setInline(3);
        setShowTerminal(false);
      } else {
        setInline(0);
        setShowTerminal(false);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // highlight the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // close drawer on Escape + lock scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showHamburger = inline < navLinks.length;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-base/70 border-b border-line" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("home")}
            className="font-mono text-lg font-bold tracking-tight"
          >
            <span className="neon">{profile.handle}</span>
            <span className="text-muted">@sde</span>
            <span className="animate-blink text-accent">_</span>
          </button>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 sm:flex">
              {navLinks.slice(0, inline).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => navigate(l.id)}
                    className={`rounded px-3 py-1.5 font-mono text-sm transition-colors hover:text-fg ${
                      active === l.id ? "neon" : "text-muted"
                    }`}
                  >
                    <span className="opacity-50">/</span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            {showTerminal && (
              <button
                onClick={openTerminal}
                className="neon-border hidden rounded-md px-3 py-1.5 font-mono text-sm font-medium text-accent transition hover:bg-accent/10 sm:block"
              >
                &gt;_ terminal
              </button>
            )}

            {showHamburger && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-accent"
              >
                <span className="font-mono text-lg leading-none">
                  {menuOpen ? "✕" : "≡"}
                </span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* side drawer (sibling of header so it isn't clipped by the header's backdrop-blur) */}
      {(showHamburger || menuOpen) && (
        <div
          className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col border-l border-line bg-surface p-5 shadow-glow transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg">
                <span className="neon">{profile.handle}</span>
                <span className="text-muted">@sde</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-xl text-accent"
              >
                ✕
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.slice(inline).map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    navigate(l.id);
                    setMenuOpen(false);
                  }}
                  className={`rounded-md px-4 py-2.5 text-left font-mono text-sm transition-colors hover:text-fg ${
                    active === l.id ? "neon bg-accent/10" : "text-muted"
                  }`}
                >
                  <span className="opacity-50">/</span>
                  {l.label}
                </button>
              ))}
            </nav>

            {!showTerminal && (
              <button
                onClick={() => {
                  openTerminal();
                  setMenuOpen(false);
                }}
                className="mt-4 rounded-md border border-line px-4 py-2.5 text-left font-mono text-sm font-medium text-accent transition hover:bg-accent/10"
              >
                &gt;_ open terminal
              </button>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
