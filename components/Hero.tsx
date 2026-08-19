"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/data/portfolio";
import { useUI } from "./Providers";
import ParticleField from "./ParticleField";

export default function Hero() {
  const { openTerminal, navigate } = useUI();
  const [role, setRole] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    const full = profile.roles;
    const current = full[ri % full.length];
    const timer = setTimeout(() => {
      if (ci < current.length) {
        setRole(current.slice(0, ci + 1));
        setCi(ci + 1);
      } else {
        setTimeout(() => {
          setCi(0);
          setRole("");
          setRi(ri + 1);
        }, 1600);
      }
    }, 55);
    return () => clearTimeout(timer);
  }, [role, ci, ri]);

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleField />
      </div>

      <div className="font-mono text-sm text-muted">
        <span className="neon">$</span> whoami
        <span className="ml-2 animate-blink text-accent">▋</span>
      </div>

      <h1 className="mt-4 font-mono text-4xl font-extrabold leading-tight text-fg sm:text-6xl lg:text-7xl">
        Hi, I&apos;m{" "}
        <span className="neon glitch" data-text={profile.name.split(" ")[0]}>
          {profile.name.split(" ")[0]}
        </span>
      </h1>

      <p className="mt-3 font-mono text-xl text-soft sm:text-2xl">
        <span className="text-muted">~/role: </span>
        <span className="neon caret">{role || " "}</span>
      </p>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          onClick={() => navigate("about")}
          className="neon-border rounded-md bg-accent/10 px-5 py-2.5 font-mono text-sm font-medium text-accent transition hover:bg-accent/20"
        >
          ./view_profile
        </button>
        <button
          onClick={openTerminal}
          className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
        >
          &gt;_ open terminal
        </button>
        {profile.available && (
          <span className="ml-1 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            available for opportunities
          </span>
        )}
      </div>
    </section>
  );
}
