"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/app/data/portfolio";
import SectionTitle from "./SectionTitle";

function levelFor(i: number) {
  // deterministic, varied proficiency (70–96%) so bars look natural
  return 70 + ((i * 13) % 27);
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let idx = 0;

  return (
    <div ref={ref} id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle index="02" title="skills" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-line bg-surface/60 p-6 transition hover:border-accent/40"
          >
            <div className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold text-accent">
              <span className="text-muted">$</span> {group.label}
            </div>
            <div className="space-y-3">
              {group.items.map((item) => {
                const lvl = levelFor(idx++);
                return (
                  <div key={item}>
                    <div className="mb-1 flex items-center justify-between font-mono text-xs text-soft">
                      <span>{item}</span>
                      <span className="text-muted">{lvl}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent2))] shadow-glow"
                        style={{
                          width: shown ? `${lvl}%` : "0%",
                          transition: "width 0.9s cubic-bezier(.2,.8,.2,1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
