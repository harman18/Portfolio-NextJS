"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/app/data/portfolio";
import { useUI } from "./Providers";
import type { Theme } from "./Providers";

type Item = { label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const { openTerminal, navigate, setTheme, toggleMode } = useUI();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = [
    ...navLinks.map((l) => ({
      label: `go /${l.label}`,
      hint: "section",
      run: () => navigate(l.id),
    })),
    { label: "term: open terminal", hint: "ui", run: openTerminal },
    { label: "theme: toggle light / dark", hint: "ui", run: toggleMode },
    ...(["cyan", "matrix", "synth", "amber"] as const).map(
      (t: Theme) =>
        ({
          label: `theme: ${t}`,
          hint: "accent",
          run: () => setTheme(t),
        }) as Item
    ),
  ];

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(q.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const choose = (i: Item) => {
    i.run();
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
      onMouseDown={(e) =>
        e.target === e.currentTarget && setOpen(false)
      }
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-accent/40 bg-[var(--panel)] shadow-glow">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSel((s) => Math.min(s + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSel((s) => Math.max(s - 1, 0));
            } else if (e.key === "Enter") {
              if (filtered[sel]) choose(filtered[sel]);
            }
          }}
          placeholder="Type a command or section…  (↑↓ enter · esc)"
          className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm text-fg outline-none placeholder:text-muted"
        />
        <div className="max-h-72 overflow-y-auto">
          {filtered.map((i, idx) => (
            <button
              key={i.label}
              onMouseEnter={() => setSel(idx)}
              onClick={() => choose(i)}
              className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-sm ${
                idx === sel
                  ? "bg-accent/15 text-accent"
                  : "text-[var(--text-soft)]"
              }`}
            >
              <span>{i.label}</span>
              <span className="text-[10px] text-muted">{i.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-3 font-mono text-sm text-muted">
              no match
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
