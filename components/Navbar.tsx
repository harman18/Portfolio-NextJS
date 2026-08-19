"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/data/portfolio";
import { useUI } from "./Providers";

export default function Navbar() {
  const { openTerminal, navigate } = useUI();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    window.addEventListener("scroll", onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
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

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
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

        <button
          onClick={openTerminal}
          className="neon-border rounded-md px-3 py-1.5 font-mono text-sm font-medium text-accent transition hover:bg-accent/10"
        >
          &gt;_ terminal
        </button>
      </nav>
    </header>
  );
}
