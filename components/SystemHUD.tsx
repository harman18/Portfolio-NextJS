"use client";

import { useEffect, useRef, useState } from "react";

function Bar({ label, value, max, unit }: {
  label: string;
  value: number;
  max: number;
  unit: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between font-mono text-[10px] text-muted">
        <span>{label}</span>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent2))]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function SystemHUD() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [lat, setLat] = useState(0);
  const [load, setLoad] = useState(0);
  const start = useRef<number>(0);

  useEffect(() => {
    start.current = Date.now();
    setMounted(true);
    setNow(new Date());
    setLat(8 + Math.round(Math.random() * 34));
    setLoad(20 + Math.round(Math.random() * 55));
    const id = setInterval(() => {
      setNow(new Date());
      setLat(8 + Math.round(Math.random() * 34));
      setLoad(20 + Math.round(Math.random() * 55));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const up = mounted ? Math.floor((Date.now() - start.current) / 1000) : 0;
  const uptime = `${String(Math.floor(up / 60)).padStart(2, "0")}:${String(
    up % 60
  ).padStart(2, "0")}`;
  const clock = now ? now.toTimeString().slice(0, 8) : "--:--:--";

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 hidden font-mono text-[11px] text-muted sm:block">
      <div className="rounded-lg border border-line bg-surface/80 px-3 py-2 backdrop-blur shadow-glow">
        <div className="flex items-center justify-between gap-5">
          <span className="text-accent">● sys</span>
          <span>{clock}</span>
        </div>
        <div className="mt-1 text-[10px]">uptime {uptime}</div>
        <Bar label="lat" value={lat} max={42} unit="ms" />
        <Bar label="cpu" value={load} max={75} unit="%" />
      </div>
    </div>
  );
}
