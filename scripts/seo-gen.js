// Generates public/sitemap.xml and public/robots.txt from your static routes.
// Run: node scripts/seo-gen.js
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://harmanjotsingh.site";
const ROUTES = ["/", "/#about", "/#skills", "/#experience", "/#projects", "/#contact"];

const today = new Date().toISOString().slice(0, 10);

function buildSitemap() {
  const urls = ROUTES.map(
    (r) =>
      `  <url>\n` +
      `    <loc>${SITE_URL}${r}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n` +
      `    <priority>${r === "/" ? "1.0" : "0.6"}</priority>\n` +
      `  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;
}

function buildRobots() {
  return `# https://www.robotstxt.org/\n` +
    `User-agent: *\n` +
    `Allow: /\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n`;
}

const pub = path.join(__dirname, "..", "public");
if (!fs.existsSync(pub)) fs.mkdirSync(pub, { recursive: true });

fs.writeFileSync(path.join(pub, "sitemap.xml"), buildSitemap());
fs.writeFileSync(path.join(pub, "robots.txt"), buildRobots());

console.log("Wrote public/sitemap.xml and public/robots.txt");
