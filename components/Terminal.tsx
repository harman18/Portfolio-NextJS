"use client";

import { useEffect, useRef, useState } from "react";
import {
  experiences,
  profile,
  projects,
  skills,
  socials,
} from "@/app/data/portfolio";
import { themeList, useUI, type Theme } from "./Providers";

type Line = { text: string; cls?: string };

const prompt = "visitor@harmanjot:~$";

const BANNER = [
  "  _   _   _    _   _ ___ ___ ___ ",
  " | | | | /_\\  | | | / __| __/ __|",
  " | |_| |/ _ \\ | |_| \\__ \\ _|\\__ \\",
  "  \\___//_/ \\_\\ \\___/|___/___|___/",
  "",
  "  // interactive portfolio shell — type 'help'",
];

export default function Terminal() {
  const { terminalOpen, closeTerminal, setTheme, navigate, theme } = useUI();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const [booted, setBooted] = useState(false);

  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      inputRef.current?.focus();
      if (!booted) {
        setBooted(true);
        setLines([
          ...BANNER.map((t) => ({ text: t, cls: "text-accent" })),
          { text: "" },
          {
            text: `session started · theme=${theme} · type 'help' for commands`,
            cls: "text-muted",
          },
          { text: "" },
        ]);
      }
    }
  }, [terminalOpen, booted, theme]);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  const print = (newLines: Line | Line[]) =>
    setLines((p) => [...p, ...(Array.isArray(newLines) ? newLines : [newLines])]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    print({ text: `${prompt} ${cmd}`, cls: "text-white" });

    if (!cmd) return;

    setHistory((h) => [cmd, ...h].slice(0, 50));

    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    switch (name.toLowerCase()) {
      case "help":
      case "?":
        print([
          { text: "Available commands:", cls: "text-accent" },
          { text: "  help              show this list" },
          { text: "  about | info      who I am + quick facts" },
          { text: "  whoami            identity" },
          { text: "  skills            tech / network / security stack" },
          { text: "  resume | exp      work experience" },
          { text: "  projects          things I've built" },
          { text: "  contact | social  how to reach me" },
          { text: "  ls                list page sections" },
          { text: "  open <section>    jump to a section (e.g. open skills)" },
          { text: "  theme [name]      switch theme (theme list)" },
          { text: "  banner            print the logo" },
          { text: "  date              current date/time" },
          { text: "  echo <text>       print text" },
          { text: "  sudo              ;)" },
          { text: "  clear             clear the screen" },
          { text: "  exit | close      close the terminal" },
        ]);
        break;

      case "about":
      case "info":
        print([
          { text: `name   : ${profile.name}`, cls: "text-accent" },
          { text: `role   : Software Development Engineer`, cls: "text-accent" },
          { text: `handle : ${profile.handle}@sde`, cls: "text-accent" },
          { text: `loc    : ${profile.location}`, cls: "text-accent" },
          { text: "" },
          { text: profile.about, cls: "text-[#c7cde6]" },
        ]);
        break;

      case "whoami":
        print([
          { text: `${profile.name} — ${profile.roles.join(" / ")}`, cls: "text-accent" },
        ]);
        break;

      case "skills":
        skills.forEach((g) =>
          print([
            { text: `$ ${g.label}`, cls: "text-accent" },
            { text: `  ${g.items.join("  ·  ")}`, cls: "text-[#c7cde6]" },
          ])
        );
        break;

      case "resume":
      case "exp":
      case "experience":
        experiences.forEach((e) =>
          print([
            { text: `${e.title} @ ${e.company}  (${e.date})`, cls: "text-accent" },
            ...e.points.map((p) => ({ text: `  ▹ ${p}`, cls: "text-[#c7cde6]" })),
            { text: "" },
          ])
        );
        break;

      case "projects":
        projects.forEach((p) =>
          print([
            { text: `▸ ${p.name}`, cls: "text-accent" },
            { text: `  ${p.desc}`, cls: "text-[#c7cde6]" },
            { text: `  [${p.stack.join(", ")}]`, cls: "text-muted" },
            { text: "" },
          ])
        );
        break;

      case "contact":
      case "social":
        print([
          { text: `email : ${profile.email}`, cls: "text-accent" },
          ...socials.map((s) => ({
            text: `  ${s.name.padEnd(9)} ${s.handle}`,
            cls: "text-[#c7cde6]",
          })),
        ]);
        break;

      case "ls":
        print([
          { text: "home  about  skills  experience  projects  contact", cls: "text-accent" },
        ]);
        break;

      case "open": {
        const target = arg.toLowerCase();
        const ids = ["home", "about", "skills", "experience", "projects", "contact"];
        if (!target || !ids.includes(target)) {
          print([{ text: `usage: open <section>  (${ids.join(" | ")})`, cls: "text-yellow-400" }]);
        } else {
          print([{ text: `navigating → #${target}`, cls: "text-accent" }]);
          navigate(target);
        }
        break;
      }

      case "theme": {
        if (!arg || arg === "list") {
          print([
            { text: `themes: ${themeList.join("  ")}`, cls: "text-accent" },
            { text: `current: ${theme}`, cls: "text-muted" },
          ]);
        } else if (themeList.includes(arg as (typeof themeList)[number])) {
          setTheme(arg as Theme);
          print([{ text: `theme set → ${arg}`, cls: "text-accent" }]);
        } else {
          print([{ text: `unknown theme '${arg}'. try: theme list`, cls: "text-yellow-400" }]);
        }
        break;
      }

      case "banner":
        BANNER.forEach((t) => print({ text: t, cls: "text-accent" }));
        break;

      case "date":
        print([{ text: new Date().toString(), cls: "text-accent" }]);
        break;

      case "echo":
        print([{ text: arg }]);
        break;

      case "sudo":
        print([
          { text: "harmanjot is not in the sudoers file. This incident will be reported. 😈", cls: "text-yellow-400" },
          { text: "(just kidding — but no root for you)", cls: "text-muted" },
        ]);
        break;

      case "clear":
      case "cls":
        setLines([]);
        return;

      case "exit":
      case "close":
      case "q":
        print([{ text: "bye 👋", cls: "text-muted" }]);
        setTimeout(() => closeTerminal(), 250);
        return;

      default:
        print([
          { text: `command not found: ${name}`, cls: "text-yellow-400" },
          { text: "type 'help' to see available commands", cls: "text-muted" },
        ]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = Math.min(hIndex + 1, history.length - 1);
      setHIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndex <= 0) {
        setHIndex(-1);
        setInput("");
      } else {
        const i = hIndex - 1;
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  if (!terminalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeTerminal();
      }}
    >
      <div
        className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-accent/40 bg-[#060814]/95 shadow-glow backdrop-blur"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-muted">
            bash — visitor@harmanjot
          </span>
          <button
            onClick={closeTerminal}
            className="ml-auto font-mono text-xs text-muted transition hover:text-accent"
          >
            [ esc ]
          </button>
        </div>

        {/* output */}
        <div
          ref={outRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <div key={i} className={l.cls ?? "text-[#c7cde6] whitespace-pre-wrap"}>
              {l.text || " "}
            </div>
          ))}

          {/* input line */}
          <div className="mt-1 flex items-center gap-2">
            <span className="shrink-0 text-accent">{prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent font-mono text-[13px] text-white caret-accent outline-none"
            />
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-1.5 font-mono text-[11px] text-muted">
          tip: press <span className="text-accent">`</span> to toggle · ↑/↓ for
          history · <span className="text-accent">ctrl+l</span> to clear
        </div>
      </div>
    </div>
  );
}
