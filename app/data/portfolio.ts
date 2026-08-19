export type Experience = {
  title: string;
  company: string;
  date: string;
  points: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Social = {
  name: string;
  handle: string;
  link: string;
};

export const profile = {
  name: "Harmanjot Singh",
  handle: "hsingh",
  roles: [
    "Software Development Engineer",
    "Network Test Automation",
    "Security & Pentesting",
    "Infra-Agnostic Tooling",
  ],
  tagline:
    "Building infrastructure-independent automation for core networks — and breaking things (ethically) to make them safer.",
  about:
    "I'm a Software Development Engineer focused on network testing, automation, and security. At Zscaler I architect infrastructure-independent tooling for core networks, design pipelines that trigger/monitor automation, and build Python/Bash frameworks that help DevTest and QA teams validate production nodes. Outside of shipping reliable automation, I explore offensive security and pentesting to understand systems from an attacker's perspective.",
  location: "India",
  email: "you@example.com", // TODO: replace with your real email
  available: true,
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Bash", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "Network & Testing",
    items: [
      "Network Test Automation",
      "Core Network Protocols",
      "Packet Analysis",
      "CI/CD Pipelines",
      "Infra-Agnostic Tooling",
    ],
  },
  {
    label: "Security & Pentesting",
    items: [
      "Recon & Enumeration",
      "Web App Security",
      "Vulnerability Assessment",
      "Exploit Dev (learning)",
      "Wireshark / tcpdump",
    ],
  },
  {
    label: "Web & Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Node.js", "Three.js"],
  },
  {
    label: "Platform / Ops",
    items: ["Git", "Docker", "MongoDB", "Linux", "Cloud (AWS/GCP)"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Associate Software Engineer",
    company: "Zscaler",
    date: "Aug 2023 - Present",
    points: [
      "Architecting infrastructure-independent automation tools for core networks.",
      "Designing the UI for triggering, monitoring, and maintaining automation pipelines.",
      "Developing internal automation tooling in Python/Bash as part of the framework.",
      "Building network tools that help DevTest/QA teams test production nodes.",
    ],
  },
  {
    title: "Intern, Zscaler",
    company: "Zscaler",
    date: "Feb 2023 - Aug 2023",
    points: [
      "Writing efficient automation for product testing.",
      "Collaborating with Backend engineers and Product Managers to build robust enhancement mechanisms.",
      "Authoring new Python modules to accelerate DevTest/QA testing.",
    ],
  },
  {
    title: "Front End Developer, Intern",
    company: "WEB Micro",
    date: "Feb 2022 - June 2022",
    points: [
      "Designing client frontends in React, Bootstrap, and HTML.",
      "Collaborating with cross-functional teams to ship high-quality products.",
      "Implementing responsive, cross-browser-compatible designs.",
      "Participating in code reviews and mentoring feedback loops.",
    ],
  },
  {
    title: "Web Developer",
    company: "Freelancer",
    date: "Jan 2021 - Dec 2022",
    points: [
      "Designing full-stack websites for clients (HTML, Bootstrap, MySQL, PHP).",
      "Supporting early-stage startups across multiple industries with technical work.",
    ],
  },
];

export const projects = [
  {
    name: "Core Network Automation Framework",
    desc: "Infrastructure-independent Python/Bash framework that automates testing and validation of production network nodes across teams.",
    stack: ["Python", "Bash", "CI/CD", "Linux"],
  },
  {
    name: "Pipeline Control UI",
    desc: "Web interface to trigger, monitor, and maintain large-scale automation pipelines for network testing.",
    stack: ["React", "TypeScript", "Node.js"],
  },
  {
    name: "Network Test Tooling",
    desc: "Developer-facing tools that let DevTest/QA teams profile, probe, and verify different production nodes quickly.",
    stack: ["Python", "Networking", "Wireshark"],
  },
  {
    name: "Security / Pentest Lab",
    desc: "Self-hosted lab for recon, enumeration, and web-app vulnerability assessment — used to learn offensive security hands-on.",
    stack: ["Linux", "Burp Suite", "Metasploit", "Docker"],
  },
];

export const socials: Social[] = [
  { name: "GitHub", handle: "@harmanjot", link: "https://github.com/" }, // TODO
  { name: "LinkedIn", handle: "in/harmanjot", link: "https://linkedin.com/" }, // TODO
  { name: "Twitter", handle: "@harmanjot", link: "https://twitter.com/" }, // TODO
  { name: "Email", handle: "you@example.com", link: "mailto:you@example.com" }, // TODO
];

export const navLinks = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];
