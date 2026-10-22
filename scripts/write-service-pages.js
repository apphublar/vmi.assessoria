const fs = require("fs");
const path = require("path");

const pages = [
  {
    slug: "importacao",
    title: "Importação | VMI Assessoria Empresarial",
    description: "Assessoria em importação: planejamento, classificação fiscal, licenças, DUIMP e logística internacional até a entrega no Brasil."
  },
  {
    slug: "exportacao",
    title: "Exportação | VMI Assessoria Empresarial",
    description: "Assessoria em exportação: estruturação da operação, DUE, documentação e logística até o comprador no exterior."
  },
  {
    slug: "despacho-aduaneiro",
    title: "Despacho Aduaneiro | VMI Assessoria Empresarial",
    description: "Despacho aduaneiro com acompanhamento junto à Receita Federal e órgãos anuentes, do registro da declaração à liberação da carga."
  }
];

const tail = `  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    var vmiConsent = "denied";
    try { vmiConsent = localStorage.getItem("vmi-consent") === "granted" ? "granted" : "denied"; } catch (e) {}
    gtag("consent", "default", {
      ad_storage: vmiConsent,
      analytics_storage: vmiConsent,
      ad_user_data: vmiConsent,
      ad_personalization: vmiConsent
    });
  </script>
  <script src="/tracking.js"></script>
</head>
<body data-page="SLUG">
  <div id="root"></div>
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
  <script src="/assets/icons.js" defer></script>
  <script src="/assets/app.js" defer></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      if (!window.VMIApp || !window.ReactDOM) return;
      ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(window.VMIApp));
    });
  </script>
</body>
</html>
`;

for (const page of pages) {
  const url = `https://www.vmiass.com/${page.slug}/`;
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/png" href="/assets/favicon.png" />
  <link rel="apple-touch-icon" href="/assets/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="VMI Assessoria Empresarial" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://www.vmiass.com/assets/hero-porto.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.description}" />
  <meta name="twitter:image" content="https://www.vmiass.com/assets/hero-porto.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "${page.title.split("|")[0].trim()}",
    "provider": { "@id": "https://www.vmiass.com/#organization" },
    "areaServed": "BR",
    "url": "${url}",
    "description": "${page.description}"
  }
  </script>
${tail.replace("SLUG", page.slug)}`;
  const dir = path.join(__dirname, "..", page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log("wrote", page.slug);
}
