const fs = require("fs");
const files = ["index.html", "importacao/index.html", "exportacao/index.html", "despacho-aduaneiro/index.html"];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((match) => JSON.parse(match[1]));
  console.log(file, "json-ok", blocks.length, "conteudo", html.includes('id="conteudo"'));
}
