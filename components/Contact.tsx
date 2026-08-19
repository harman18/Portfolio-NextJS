import { profile, socials } from "@/app/data/portfolio";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <Reveal id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle index="05" title="contact" />

      <div className="mt-10 rounded-2xl neon-border bg-surface/60 p-8 text-center">
        <h3 className="font-mono text-2xl font-bold text-fg">
          Let&apos;s build / break something.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Open to SDE roles in network testing, platform tooling, and security.
          Reach out via the terminal or the links below.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block rounded-md bg-accent/10 px-6 py-3 font-mono text-sm font-medium text-accent neon-border transition hover:bg-accent/20"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-line px-4 py-2 font-mono text-sm text-soft transition hover:border-accent hover:text-accent"
            >
              {s.name}
              <span className="ml-2 text-muted">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-16 border-t border-line pt-6 text-center font-mono text-xs text-muted">
        <span className="neon">{profile.handle}</span>@sde — built with Next.js
        &amp; a lot of <span className="text-accent">sudo</span>. ©{" "}
        {new Date().getFullYear()}
      </footer>
    </Reveal>
  );
}
