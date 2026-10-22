const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public");
const files = ["index.html", "styles.css", "tracking.js", "robots.txt", "sitemap.xml"];
const dirs = ["assets", "importacao", "exportacao", "despacho-aduaneiro", "gestao"];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

for (const dir of dirs) {
  fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
}
