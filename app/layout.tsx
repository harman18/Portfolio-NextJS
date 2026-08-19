import type { Metadata } from "next";
import "./globals.css";
import BootScreen from "@/components/BootScreen";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  personSchema,
  websiteSchema,
  jsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Harmanjot Singh",
    "Network Security Engineer",
    "SDE at Zscaler",
    "Network Test Automation",
    "Security & Pentesting",
    "Python Automation",
    "SSL TLS testing",
    "IPSEC testing",
    "Wireshark",
    "Vulnerability Assessment",
    "Core Network Protocols",
    "Infrastructure Tooling",
    "Distributed Systems",
  ],
  authors: [{ name: "Harmanjot Singh", url: SITE_URL }],
  creator: "Harmanjot Singh",
  publisher: "Harmanjot Singh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Harmanjot Singh — Network Security & Pentesting Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: "@harmanjotsingh",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "application-ld+json": JSON.stringify(personSchema),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cyan" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050816" />
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
        <script
          dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
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
