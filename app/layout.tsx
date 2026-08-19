import type { Metadata } from "next";
import "./globals.css";
import BootScreen from "@/components/BootScreen";

export const metadata: Metadata = {
  title: "Harmanjot Singh | SDE — Network & Security Engineer",
  description:
    "Software Development Engineer specializing in Computer Networking, infrastructure-independent tooling in distributed system and interest in offensive security / pentesting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cyan" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);var m=localStorage.getItem('mode');if(m){document.documentElement.setAttribute('data-mode',m);}else{document.documentElement.setAttribute('data-mode',window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`.boot-screen{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <BootScreen />
        {children}
      </body>
    </html>
  );
}
