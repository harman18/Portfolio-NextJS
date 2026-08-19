import { experiences } from "@/app/data/portfolio";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Reveal id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle index="03" title="experience" />

      <div className="relative mt-12 pl-8">
        <span className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-accent/70 via-accent/20 to-transparent" />
        {experiences.map((exp) => (
          <div key={exp.title + exp.date} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-base shadow-glow" />
            <div className="rounded-2xl border border-line bg-surface/60 p-6 transition hover:border-accent/40">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-lg font-semibold text-fg">
                  {exp.title}{" "}
                  <span className="text-accent">@ {exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">{exp.date}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {exp.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-sm leading-relaxed text-soft"
                  >
                    <span className="mt-1 text-accent">▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
