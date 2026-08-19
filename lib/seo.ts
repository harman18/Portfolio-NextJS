// Centralized SEO helpers: structured data (JSON-LD) + metadata strings.

export const SITE_URL = "https://harmanjotsingh.site";
export const SITE_NAME = "Harmanjot Singh";
export const DEFAULT_TITLE =
  "Harmanjot Singh — Network Security & Pentesting Engineer | SDE @ Zscaler";
export const DEFAULT_DESCRIPTION =
  "Software Development Engineer at Zscaler specializing in network test automation, security & pentesting. Expert in Python/Bash automation, SSL/TLS, IPSEC testing, and vulnerability assessment. Portfolio of network security projects.";
export const OG_IMAGE = `${SITE_URL}/og.png`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harmanjot Singh",
  url: SITE_URL,
  jobTitle: "Software Development Engineer",
  worksFor: { "@type": "Organization", name: "Zscaler" },
  knowsAbout: [
    "Network Test Automation",
    "Network Security & Pentesting",
    "Python",
    "Bash",
    "SSL/TLS",
    "IPSEC",
    "Vulnerability Assessment",
    "Wireshark",
    "Core Network Protocols",
  ],
  sameAs: [
    "https://github.com/harman18",
    "https://www.linkedin.com/in/harmanjot--singh/",
    "mailto:harman062001@gmail.com",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/#q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const skillsSchema = (groups: { label: string; items: string[] }[]) => ({
  "@context": "https://schema.org",
  "@type": "Skills",
  name: "Technical Skills",
  skills: groups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "DefinedTerm",
      name: item,
      inDefinedTermSet: g.label,
    }))
  ),
});

export function jsonLd(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
