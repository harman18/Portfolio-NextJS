import { projects } from "@/app/data/portfolio";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <Reveal id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle index="04" title="projects" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-6 transition hover:border-accent/50 hover:shadow-glow"
          >
            <div className="font-mono text-xs text-muted">~/projects</div>
            <h3 className="mt-2 font-mono text-lg font-semibold text-fg transition group-hover:text-accent">
              {p.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-soft">
              {p.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-[11px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
