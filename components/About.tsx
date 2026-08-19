import { profile } from "@/app/data/portfolio";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <Reveal id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle index="01" title="about" />

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-line bg-surface/60 p-8 neon-border">
          <p className="text-[17px] leading-[30px] text-soft">
            {profile.about}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["Role", "SDE"],
              ["Focus", "Network Security"],
              ["Interest", "Security / Pentest"],
              ["Location", profile.location],
              ["Experience", "Zscaler"],
              ["Status", profile.available ? "Open" : "Closed"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg border border-line bg-base/40 p-3"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-muted">
                  {k}
                </div>
                <div className="mt-1 font-mono text-sm text-accent">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-2xl neon-border">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base to-surface">
              <div className="text-center font-mono">
                <div className="text-6xl font-extrabold neon">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted">
                  {profile.handle}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center font-mono text-xs text-muted">
            
            {/* <div className="relative" info="Profile Pic placement" alt="Profile Image">
              <div className="aspect-square overflow-hidden rounded-2xl neon-border">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 text-center font-mono text-xs text-muted">
                // {profile.handle}
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </Reveal>
  );
}
