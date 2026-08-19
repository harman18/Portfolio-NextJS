"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const THEMES = ["cyan", "matrix", "synth", "amber"] as const;
export type Theme = (typeof THEMES)[number];
export const themeList = THEMES;

const MODES = ["dark", "light"] as const;
export type Mode = (typeof MODES)[number];
export const modeList = MODES;

type UIContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  navigate: (id: string) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cyan");
  const [mode, setModeState] = useState<Mode>("dark");
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (t && THEMES.includes(t)) setThemeState(t);
    const m = document.documentElement.getAttribute("data-mode") as Mode | null;
    if (m && MODES.includes(m)) setModeState(m);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    if (!THEMES.includes(t)) return;
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
    setThemeState(t);
  }, []);

  const setMode = useCallback((m: Mode) => {
    if (!MODES.includes(m)) return;
    document.documentElement.setAttribute("data-mode", m);
    try {
      localStorage.setItem("mode", m);
    } catch {}
    setModeState(m);
  }, []);

  const toggleMode = useCallback(
    () => setMode(mode === "dark" ? "light" : "dark"),
    [mode, setMode]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);
  const toggleTerminal = useCallback(() => setTerminalOpen((v) => !v), []);

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing =
        tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;
      if (e.key === "`") {
        if (typing) return;
        e.preventDefault();
        toggleTerminal();
      }
      if (e.key === "Escape" && terminalOpen) setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, terminalOpen, toggleTerminal]);

  return (
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        mode,
        setMode,
        toggleMode,
        terminalOpen,
        openTerminal,
        closeTerminal,
        toggleTerminal,
        navigate,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
