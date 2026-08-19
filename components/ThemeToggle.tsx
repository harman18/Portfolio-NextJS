"use client";

import { themeList, useUI, type Theme } from "./Providers";

const ACCENT_COLORS: Record<Theme, string> = {
  cyan: "#22d3ee",
  matrix: "#39ff14",
  synth: "#ff2bd6",
  amber: "#ffb000",
};

export default function ThemeToggle() {
  const { mode, toggleMode, theme, setTheme } = useUI();

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface/80 p-1.5 backdrop-blur-md shadow-glow">
        <button
          onClick={toggleMode}
          aria-label="Toggle light/dark mode"
          title={mode === "dark" ? "Switch to light" : "Switch to dark"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-fg transition hover:bg-accent/15"
        >
          {mode === "dark" ? "☀" : "☾"}
        </button>
        <span className="h-5 w-px bg-line" />
        <div className="flex items-center gap-1 pr-1">
          {themeList.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              aria-label={`Set ${t} accent`}
              title={`${t} accent`}
              className={`h-4 w-4 rounded-full transition ${
                theme === t
                  ? "ring-2 ring-offset-2 ring-offset-surface"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                background: ACCENT_COLORS[t],
                // @ts-expect-error css var for ring color
                "--tw-ring-color": ACCENT_COLORS[t],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
