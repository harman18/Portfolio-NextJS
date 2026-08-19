import { skills } from "@/app/data/portfolio";
import { SectionTitle } from "./About";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Reveal id="skills" className="mx-auto max-w-6xl px-6 py-24">
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
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line bg-base/50 px-2.5 py-1 font-mono text-xs text-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
