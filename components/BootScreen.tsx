"use client";

import { useEffect, useState } from "react";

const LINES = [
  "booting harmanjot.os ...",
  "loading modules ............ [ok]",
  "mounting /portfolio ........ [ok]",
  "establishing secure link ... [ok]",
  "render complete ✓",
];

export default function BootScreen() {
  const [shown, setShown] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const step = 240;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= LINES.length) clearInterval(id);
    }, step);

    const hideAt = step * LINES.length + 450;
    const t1 = setTimeout(() => setHidden(true), hideAt);
    const t2 = setTimeout(() => setRemoved(true), hideAt + 600);

    return () => {
      clearInterval(id);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  const pct = Math.min(100, Math.round((shown / LINES.length) * 100));

  return (
    <div
      className={`boot-screen fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="scanlines absolute inset-0 opacity-40" />

      <div className="relative w-[min(90vw,440px)] rounded-xl border border-accent/40 bg-[var(--panel)] p-5 font-mono text-sm shadow-glow">
        <div className="text-accent">visitor@harmanjot:~$ ./launch --portfolio</div>

        <div className="mt-3 space-y-1">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className="text-[var(--text-soft)]">
              <span className="text-muted">›</span> {l}
            </div>
          ))}
          {shown < LINES.length && (
            <div className="text-accent">
              <span className="animate-blink">▋</span>
            </div>
          )}
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent2))] shadow-glow transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 text-right text-[11px] text-muted">
          {pct}% · initializing
        </div>
      </div>
    </div>
  );
}
