(() => {
  const { useState, useEffect, useRef } = React;
  const I = window.VMIIcons;
  const WHATSAPP = "https://wa.me/5511969287540";
  const EMAIL = "operacional@vmiass.com";
  const PHONE = "(11) 96928-7540";
  const LINKEDIN = "https://www.linkedin.com/company/vmi-assessoria-empresarial-ltda";
  const LINKEDIN_HANDLE = "vmi-assessoria-empresarial-ltda";
  const INSTAGRAM = "https://instagram.com/vmiassessoria";
  const INSTAGRAM_HANDLE = "@vmiassessoria";
  const HQ_STREET = "Av. Paulista";
  const HQ_CITY = "S\xE3o Paulo, SP";
  const CONTACT_API = "/api/contact";
  const PAGE = document.body && document.body.dataset.page || "home";
  const IS_HOME = PAGE === "home";
  function siteHref(hash) {
    return IS_HOME ? hash : `/${hash}`;
  }
  function trackEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }
  const VOLUME_OPTIONS = [
    { value: "", label: "Selecione o volume mensal" },
    { value: "pessoal", label: "Compra pessoal ou ainda sem opera\xE7\xE3o" },
    { value: "ate-5", label: "At\xE9 US$ 5 mil por m\xEAs" },
    { value: "5-20", label: "De US$ 5 mil a US$ 20 mil por m\xEAs" },
    { value: "20-100", label: "De US$ 20 mil a US$ 100 mil por m\xEAs" },
    { value: "acima-100", label: "Acima de US$ 100 mil por m\xEAs" }
  ];
  const TOPIC_BY_PAGE = {
    importacao: "Importa\xE7\xE3o",
    exportacao: "Exporta\xE7\xE3o",
    "despacho-aduaneiro": "Assessoria aduaneira"
  };
  const SITE_CONFIG = {
    stats: [
      { value: "+30", label: "Anos de experi\xEAncia" },
      { value: "+20", label: "Pa\xEDses atendidos" },
      { value: "+12", label: "Escrit\xF3rios no Brasil" },
      { value: "100%", label: "Foco em conformidade e seguran\xE7a" }
    ],
    heroTrust: [
      "Opera\xE7\xF5es nacionais e internacionais",
      "Equipe especializada",
      "Presen\xE7a em 12 cidades estrat\xE9gicas",
      "Atendimento personalizado"
    ],
    processSteps: [
      ["Target", "Diagn\xF3stico da opera\xE7\xE3o", "Analisamos sua opera\xE7\xE3o e identificamos oportunidades, riscos e requisitos."],
      ["Doc", "Planejamento estrat\xE9gico", "Estruturamos a melhor rota aduaneira, fiscal e log\xEDstica para seu neg\xF3cio."],
      ["Stamp", "Execu\xE7\xE3o aduaneira e log\xEDstica", "Operacionalizamos importa\xE7\xE3o, exporta\xE7\xE3o e toda a cadeia com precis\xE3o."],
      ["Shield", "Acompanhamento completo", "Monitoramos cada etapa junto \xE0 Receita Federal e \xF3rg\xE3os anuentes."],
      ["Hands", "Entrega e suporte cont\xEDnuo", "Garantimos a entrega no destino final com suporte permanente \xE0 opera\xE7\xE3o."]
    ],
    awardMedia: [
      {
        type: "video",
        src: "/assets/premiacao/ctf-awards.mp4",
        caption: "Cerim\xF4nia do CTF Awards",
        orient: "portrait"
      },
      {
        type: "image",
        src: "/assets/premiacao/ctf-trofeu.webp",
        alt: "Equipe da VMI com o trof\xE9u do CTF Awards na categoria Innovation",
        caption: "Categoria Innovation",
        orient: "landscape",
        featured: true
      },
      {
        type: "image",
        src: "/assets/premiacao/ctf-entrega.webp",
        alt: "Momento da entrega do CTF Awards no palco",
        caption: "Entrega do pr\xEAmio",
        orient: "landscape"
      },
      {
        type: "image",
        src: "/assets/premiacao/ctf-equipe.webp",
        alt: "Equipe da VMI Assessoria no Comex Tech Forum",
        caption: "Equipe VMI no evento",
        orient: "landscape"
      },
      {
        type: "image",
        src: "/assets/premiacao/ctf-palestra.webp",
        alt: "Isabella Martins no palco do Comex Tech Forum",
        caption: "No palco do CTF",
        orient: "portrait"
      },
      {
        type: "image",
        src: "/assets/premiacao/ctf-forum.webp",
        alt: "Registro da VMI no Comex Tech Forum",
        caption: "Comex Tech Forum",
        orient: "portrait"
      }
    ]
  };
  function BrandMark({ size = "nav" }) {
    return /* @__PURE__ */ React.createElement("div", { className: `brand brand--${size}` }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/logo-vmi.svg",
        alt: "VMI",
        className: "brand-logo"
      }
    ));
  }
  function WorldMap() {
    const dots = [];
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 30; j++) {
        const x = j * 24 + i % 2 * 12;
        const y = i * 24 + 12;
        const inLand = j > 4 && j < 9 && i > 3 && i < 9 || j > 5 && j < 11 && i > 1 && i < 5 || j > 13 && j < 17 && i > 1 && i < 4 || j > 14 && j < 18 && i > 4 && i < 9 || j > 18 && j < 26 && i > 1 && i < 6 || j > 22 && j < 26 && i > 7 && i < 10;
        if (inLand) dots.push(/* @__PURE__ */ React.createElement("circle", { key: `${i}-${j}`, cx: x, cy: y, r: "2" }));
      }
    }
    return /* @__PURE__ */ React.createElement("svg", { className: "world-map", viewBox: "0 0 720 280", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("g", { fill: "var(--accent)" }, dots));
  }
  function Reveal({ children, as: Tag = "div", delay = 0, className = "", ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.unobserve(el);
          }
        }),
        { rootMargin: "-40px" }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, [delay]);
    return /* @__PURE__ */ React.createElement(Tag, { ref, className: `reveal ${shown ? "in" : ""} ${className}`, ...rest }, children);
  }
  function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const links = [
      ["Quem Somos", siteHref("#quem-somos")],
      ["Reconhecimento", siteHref("#reconhecimento")],
      ["Servi\xE7os", siteHref("#servicos")],
      ["Diferenciais", siteHref("#diferenciais")],
      ["Contato", siteHref("#contato")]
    ];
    return /* @__PURE__ */ React.createElement("header", { className: `nav ${scrolled ? "is-scrolled" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "container nav-inner" }, /* @__PURE__ */ React.createElement("a", { href: IS_HOME ? "#top" : "/", "aria-label": "VMI" }, /* @__PURE__ */ React.createElement(BrandMark, null)), /* @__PURE__ */ React.createElement("nav", { className: "nav-links" }, links.map(([l, h]) => /* @__PURE__ */ React.createElement("a", { key: h, href: h }, l))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", className: "cta primary" }, "Fale agora ", /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" })), /* @__PURE__ */ React.createElement("button", { className: "nav-toggle", "aria-label": "Menu", onClick: () => setMenuOpen(!menuOpen) }, menuOpen ? /* @__PURE__ */ React.createElement(I.Close, null) : /* @__PURE__ */ React.createElement(I.Menu, null)))), /* @__PURE__ */ React.createElement("div", { className: `mobile-panel ${menuOpen ? "open" : ""}` }, links.map(([l, h]) => /* @__PURE__ */ React.createElement("a", { key: h, href: h, onClick: () => setMenuOpen(false) }, l))));
  }
  function Hero() {
    return /* @__PURE__ */ React.createElement("section", { className: "hero", id: "top" }, /* @__PURE__ */ React.createElement("div", { className: "flyer-curve", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative" } }, /* @__PURE__ */ React.createElement(WorldMap, null), /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Com\xE9rcio Exterior & Log\xEDstica Internacional"), /* @__PURE__ */ React.createElement("h1", null, "Habilitamos opera\xE7\xF5es internacionais com ", /* @__PURE__ */ React.createElement("span", { className: "accent" }, "seguran\xE7a, agilidade e intelig\xEAncia.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Assessoria completa em importa\xE7\xE3o, exporta\xE7\xE3o e log\xEDstica internacional. Da busca por fornecedores at\xE9 a entrega da mercadoria."), /* @__PURE__ */ React.createElement("div", { className: "hero-meta" }, /* @__PURE__ */ React.createElement("a", { href: "#contato", className: "cta primary" }, "Solicite uma proposta ", /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" })), /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", className: "cta ghost" }, "Falar com Especialista")), /* @__PURE__ */ React.createElement("ul", { className: "hero-trust", "aria-label": "Diferenciais de confian\xE7a" }, SITE_CONFIG.heroTrust.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, /* @__PURE__ */ React.createElement("span", { className: "hero-trust-mark", "aria-hidden": "true" }, "\u2713"), item)))), /* @__PURE__ */ React.createElement(PortVisual, null))));
  }
  function PortVisual() {
    return /* @__PURE__ */ React.createElement("div", { className: "hero-visual hero-visual--photo" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/hero-porto.webp",
        alt: "Navio porta-cont\xEAineres no porto ao p\xF4r do sol",
        width: "800",
        height: "1000",
        fetchPriority: "high",
        decoding: "async"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "hero-quote" }, /* @__PURE__ */ React.createElement("span", { className: "qmark" }, '"'), /* @__PURE__ */ React.createElement("p", null, "Especialistas em com\xE9rcio exterior. Parceiros no crescimento do seu neg\xF3cio.")));
  }
  function SocialProof() {
    return /* @__PURE__ */ React.createElement("section", { className: "social-proof", id: "resultados" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Resultados"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Experi\xEAncia que", /* @__PURE__ */ React.createElement("br", null), "gera resultados.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "N\xFAmeros que refletem nossa atua\xE7\xE3o em com\xE9rcio exterior e log\xEDstica internacional.")), /* @__PURE__ */ React.createElement("div", { className: "stats-grid" }, SITE_CONFIG.stats.map(({ value, label }, i) => /* @__PURE__ */ React.createElement(Reveal, { key: label, as: "article", className: "stat-card", delay: i * 70 }, /* @__PURE__ */ React.createElement("span", { className: "stat-card__value" }, value), /* @__PURE__ */ React.createElement("span", { className: "stat-card__label" }, label))))));
  }
  function TrustStrip() {
    return /* @__PURE__ */ React.createElement("div", { className: "strip" }, /* @__PURE__ */ React.createElement("div", { className: "container strip-row" }, /* @__PURE__ */ React.createElement("span", null, "Importa\xE7\xE3o ", /* @__PURE__ */ React.createElement("span", { className: "dot" }), " Exporta\xE7\xE3o ", /* @__PURE__ */ React.createElement("span", { className: "dot" }), " Log\xEDstica Integrada ", /* @__PURE__ */ React.createElement("span", { className: "dot" }), " DUIMP"), /* @__PURE__ */ React.createElement("span", { className: "strip-cta" }, "Envie o local do seu interesse para avaliarmos a possibilidade")));
  }
  const OFFICES = [
    ["S\xE3o Paulo", "SP", "Matriz, Av. Paulista"],
    ["Guarulhos", "SP"],
    ["Viracopos", "SP"],
    ["Santos", "SP"],
    ["Rio de Janeiro", "RJ"],
    ["Curitiba", "PR"],
    ["Goi\xE2nia", "GO"],
    ["Uruguaiana", "RS"],
    ["Chu\xED", "RS"],
    ["Itaja\xED", "SC"],
    ["Florian\xF3polis", "SC"],
    ["Salvador", "BA"]
  ];
  function About() {
    return /* @__PURE__ */ React.createElement("section", { id: "quem-somos", className: "theme-light" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "about-grid" }, /* @__PURE__ */ React.createElement(Reveal, { className: "about-copy" }, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Quem Somos"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Solu\xE7\xF5es completas,", /* @__PURE__ */ React.createElement("br", null), "da origem ao destino final."), /* @__PURE__ */ React.createElement("p", { className: "lede", style: { marginTop: 22 } }, "A VMI Assessoria foi criada para oferecer solu\xE7\xF5es completas em Com\xE9rcio Exterior, desde a busca por fornecedores at\xE9 a entrega da mercadoria no destino final. Atua com excel\xEAncia, agilidade e seguran\xE7a em todas as etapas dos processos de importa\xE7\xE3o e/ou exporta\xE7\xE3o."), /* @__PURE__ */ React.createElement("p", { style: { marginTop: 16, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6, maxWidth: "56ch" } }, "Nossa miss\xE3o \xE9 simplificar opera\xE7\xF5es internacionais e gerar resultados para os clientes. Presen\xE7a estrat\xE9gica nos principais polos log\xEDsticos, aeroportos, portos e fronteiras do Brasil.")), /* @__PURE__ */ React.createElement(Reveal, { as: "div", className: "about-offices", delay: 120 }, /* @__PURE__ */ React.createElement("div", { className: "ao-head" }, /* @__PURE__ */ React.createElement("span", { className: "ao-n" }, "12"), /* @__PURE__ */ React.createElement("span", { className: "ao-t" }, "escrit\xF3rios em pontos estrat\xE9gicos", /* @__PURE__ */ React.createElement("br", null), "do territ\xF3rio nacional")), /* @__PURE__ */ React.createElement("div", { className: "ao-chips" }, OFFICES.map(([c, uf, tag]) => /* @__PURE__ */ React.createElement("span", { className: "ao-chip", key: c + uf }, c, " ", /* @__PURE__ */ React.createElement("em", null, tag || uf))))))));
  }
  function Award() {
    const media = SITE_CONFIG.awardMedia;
    const featured = media.find((item) => item.featured) || media[0];
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    const openGallery = (index) => {
      setViewIndex(index);
      setGalleryOpen(true);
    };
    useEffect(() => {
      if (!galleryOpen) return void 0;
      const onKey = (ev) => {
        if (ev.key === "Escape") setGalleryOpen(false);
        if (ev.key === "ArrowRight") setViewIndex((i) => (i + 1) % media.length);
        if (ev.key === "ArrowLeft") setViewIndex((i) => (i - 1 + media.length) % media.length);
      };
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }, [galleryOpen, media.length]);
    const current = media[viewIndex];
    const featuredIndex = media.indexOf(featured);
    return /* @__PURE__ */ React.createElement("section", { id: "reconhecimento", className: "award" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Reconhecimento"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Premiados no CTF Awards.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Na categoria Innovation, a VMI Assessoria foi reconhecida por ser inovadora no com\xE9rcio exterior. \xC9 um pr\xEAmio que refor\xE7a nossa forma de conduzir opera\xE7\xF5es internacionais com intelig\xEAncia e precis\xE3o.")), /* @__PURE__ */ React.createElement("div", { className: "award-meta", "aria-label": "Detalhes da premia\xE7\xE3o" }, /* @__PURE__ */ React.createElement("span", null, "CTF Awards"), /* @__PURE__ */ React.createElement("span", null, "Categoria Innovation")), /* @__PURE__ */ React.createElement("figure", { className: "award-hero" }, /* @__PURE__ */ React.createElement("img", { src: featured.src, alt: featured.alt }), /* @__PURE__ */ React.createElement("figcaption", null, featured.caption)), /* @__PURE__ */ React.createElement("div", { className: "award-controls" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "cta ghost", onClick: () => openGallery(featuredIndex) }, "Ver mais"))), galleryOpen && current && /* @__PURE__ */ React.createElement("div", { className: "award-modal", role: "dialog", "aria-modal": "true", "aria-label": "Galeria CTF Awards" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "award-modal__backdrop", onClick: () => setGalleryOpen(false), "aria-label": "Fechar" }), /* @__PURE__ */ React.createElement("div", { className: "award-modal__panel" }, /* @__PURE__ */ React.createElement("div", { className: "award-modal__head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "CTF Awards"), /* @__PURE__ */ React.createElement("p", null, current.caption)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "award-modal__close", onClick: () => setGalleryOpen(false), "aria-label": "Fechar" }, /* @__PURE__ */ React.createElement(I.Close, null))), /* @__PURE__ */ React.createElement("div", { className: "award-modal__view" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "award-modal__nav award-modal__nav--prev",
        onClick: () => setViewIndex((i) => (i - 1 + media.length) % media.length),
        "aria-label": "Anterior"
      },
      /* @__PURE__ */ React.createElement(I.Arrow, null)
    ), current.type === "video" ? /* @__PURE__ */ React.createElement("video", { key: current.src, src: current.src, controls: true, playsInline: true, preload: "metadata", title: current.caption }, "Seu navegador n\xE3o reproduz v\xEDdeo.") : /* @__PURE__ */ React.createElement("img", { src: current.src, alt: current.alt }), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "award-modal__nav award-modal__nav--next",
        onClick: () => setViewIndex((i) => (i + 1) % media.length),
        "aria-label": "Pr\xF3xima"
      },
      /* @__PURE__ */ React.createElement(I.Arrow, null)
    )), /* @__PURE__ */ React.createElement("div", { className: "award-modal__thumbs", role: "tablist", "aria-label": "Fotos e v\xEDdeo" }, media.map((item, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.src,
        type: "button",
        role: "tab",
        "aria-selected": i === viewIndex,
        className: `award-modal__thumb ${i === viewIndex ? "is-active" : ""} ${item.type === "video" ? "is-video" : ""}`,
        onClick: () => setViewIndex(i),
        "aria-label": item.caption
      },
      item.type === "video" ? /* @__PURE__ */ React.createElement("span", { className: "award-modal__video-mark" }, "V\xEDdeo") : /* @__PURE__ */ React.createElement("img", { src: item.src, alt: "" })
    ))))));
  }
  const SERVICES = [
    ["Exchange", "Importa\xE7\xE3o", "Gest\xE3o completa do seu processo de importa\xE7\xE3o, do planejamento \xE0 nacionaliza\xE7\xE3o.", "/importacao/"],
    ["Plane", "Exporta\xE7\xE3o", "Estrutura\xE7\xE3o e opera\xE7\xE3o de exporta\xE7\xF5es com seguran\xE7a e competitividade.", "/exportacao/"],
    ["Stamp", "Assessoria aduaneira", "Suporte t\xE9cnico junto \xE0 Receita Federal e \xF3rg\xE3os anuentes em todas as etapas.", "/despacho-aduaneiro/"],
    ["Truck", "Log\xEDstica integrada", "Coordena\xE7\xE3o de toda a cadeia log\xEDstica, da origem ao destino final."],
    ["Doc", "Cat\xE1logo de Produtos", "Elabora\xE7\xE3o e gest\xE3o do Cat\xE1logo de Produtos no Portal \xDAnico Siscomex."],
    ["Tag", "Emiss\xE3o de DI / DUIMP / DUE", "Registro preciso das declara\xE7\xF5es de importa\xE7\xE3o e exporta\xE7\xE3o."],
    ["Doc", "Emiss\xE3o de LI / LPCO", "Licenciamento e tratamento administrativo junto aos \xF3rg\xE3os competentes."],
    ["Calculator", "Classifica\xE7\xE3o fiscal", "Enquadramento correto de NCM para reduzir custos e evitar riscos."],
    ["Ship", "Agenciamento de cargas", "Cota\xE7\xE3o e contrata\xE7\xE3o das melhores rotas e modais para sua carga."],
    ["Shield", "Seguro internacional", "Prote\xE7\xE3o da sua mercadoria durante todo o trajeto internacional."],
    ["Box", "Transporte Nacional", "Movimenta\xE7\xE3o da carga em territ\xF3rio nacional com rastreabilidade."],
    ["Dollar", "Ex tarif\xE1rio", "Redu\xE7\xE3o de al\xEDquotas de importa\xE7\xE3o para bens sem similar nacional."],
    ["Globe", "Regimes especiais", "Aplica\xE7\xE3o de drawback, Entreposto e demais regimes aduaneiros vantajosos."],
    ["Dollar", "Benef\xEDcios fiscais e incentivos", "Identifica\xE7\xE3o de incentivos fiscais estaduais e federais aplic\xE1veis."]
  ];
  function Services() {
    return /* @__PURE__ */ React.createElement("section", { id: "servicos", className: "services-section theme-light alt" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Nossos Servi\xE7os"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Tudo o que sua opera\xE7\xE3o", /* @__PURE__ */ React.createElement("br", null), "internacional precisa.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Da busca por fornecedores \xE0 entrega no destino final, cuidamos de cada etapa do seu com\xE9rcio exterior com precis\xE3o t\xE9cnica e atendimento pr\xF3ximo.")), /* @__PURE__ */ React.createElement("div", { className: "services" }, SERVICES.map(([icon, title, desc, href], idx) => {
      const Ico = I[icon];
      return /* @__PURE__ */ React.createElement(Reveal, { key: title, as: "article", className: "svc", delay: idx % 3 * 60 }, /* @__PURE__ */ React.createElement("span", { className: "svc-icon" }, /* @__PURE__ */ React.createElement(Ico, null)), /* @__PURE__ */ React.createElement("div", { className: "svc-body" }, /* @__PURE__ */ React.createElement("h3", null, href ? /* @__PURE__ */ React.createElement("a", { href }, title) : title), /* @__PURE__ */ React.createElement("p", null, desc)));
    }))));
  }
  function HowItWorks() {
    return /* @__PURE__ */ React.createElement("section", { id: "como-funciona", className: "process-section" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Como funciona"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Como apoiamos sua opera\xE7\xE3o internacional")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Um processo claro e transparente, do diagn\xF3stico inicial ao suporte cont\xEDnuo da sua opera\xE7\xE3o.")), /* @__PURE__ */ React.createElement("div", { className: "process-steps" }, SITE_CONFIG.processSteps.map(([icon, title, desc], i) => {
      const Ico = I[icon];
      return /* @__PURE__ */ React.createElement(Reveal, { key: title, as: "article", className: "process-step", delay: i * 60 }, /* @__PURE__ */ React.createElement("span", { className: "process-step__num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { className: "process-step__icon" }, /* @__PURE__ */ React.createElement(Ico, null)), /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("p", null, desc));
    }))));
  }
  const SEGMENTS = [
    "M\xE1quinas e equipamentos",
    "Produtos eletr\xF4nicos",
    "M\xF3veis",
    "T\xEAxtil",
    "Autope\xE7as",
    "Autom\xF3veis",
    "Embarca\xE7\xF5es",
    "Produtos qu\xEDmicos",
    "Cosm\xE9ticos"
  ];
  function Segments() {
    return /* @__PURE__ */ React.createElement("section", { id: "segmentos", className: "theme-light alt" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Segmentos atendidos"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Experi\xEAncia em diversos", /* @__PURE__ */ React.createElement("br", null), "setores da economia.")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Atuamos com empresas de diferentes segmentos, oferecendo solu\xE7\xF5es personalizadas em com\xE9rcio exterior para cada opera\xE7\xE3o.")), /* @__PURE__ */ React.createElement(Reveal, { delay: 80 }, /* @__PURE__ */ React.createElement("div", { className: "segment-chips" }, SEGMENTS.map((segment) => /* @__PURE__ */ React.createElement("span", { className: "segment-chip", key: segment }, segment))))));
  }
  const WHY = [
    ["Target", "Foco em resultados", "Estrat\xE9gias eficientes que impulsionam o crescimento e a lucratividade do seu neg\xF3cio."],
    ["User", "Equipe especializada", "Profissionais experientes e qualificados prontos para oferecer as melhores solu\xE7\xF5es."],
    ["Shield", "Seguran\xE7a e conformidade", "Atua\xE7\xE3o 100% alinhada \xE0s normas e legisla\xE7\xF5es, garantindo seguran\xE7a e tranquilidade para sua empresa."],
    ["Globe", "Atua\xE7\xE3o global", "Solu\xE7\xF5es completas para importa\xE7\xE3o e exporta\xE7\xE3o com abrang\xEAncia internacional."],
    ["Bars", "Solu\xE7\xF5es personalizadas", "Projetos sob medida para atender \xE0s necessidades espec\xEDficas do seu neg\xF3cio."],
    ["Hands", "Parceria e confian\xE7a", "Relacionamento transparente e duradouro, baseado em \xE9tica, compromisso e resultados."]
  ];
  function Why() {
    return /* @__PURE__ */ React.createElement("section", { id: "diferenciais", className: "why" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "why-highlight" }, /* @__PURE__ */ React.createElement("span", { className: "why-highlight__eyebrow" }, "Diferenciais da VMI"), /* @__PURE__ */ React.createElement("h2", null, "Por que empresas escolhem a VMI?"), /* @__PURE__ */ React.createElement("p", null, "Solu\xE7\xF5es estrat\xE9gicas e personalizadas que geram resultados reais para o seu neg\xF3cio.")), /* @__PURE__ */ React.createElement("div", { className: "why-grid" }, WHY.map(([ico, t, d], i) => {
      const Ico = I[ico];
      return /* @__PURE__ */ React.createElement(Reveal, { key: t, as: "div", className: "why-card", delay: i % 3 * 70 }, /* @__PURE__ */ React.createElement("span", { className: "why-icon" }, /* @__PURE__ */ React.createElement(Ico, null)), /* @__PURE__ */ React.createElement("h4", null, t), /* @__PURE__ */ React.createElement("p", null, d));
    }))));
  }
  function CtaBlock() {
    return /* @__PURE__ */ React.createElement("section", { style: { paddingTop: 0 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { as: "div", className: "cta-block" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "ring" }, /* @__PURE__ */ React.createElement(I.Globe, null)), /* @__PURE__ */ React.createElement("h2", { className: "cta-headline" }, "V\xC1 MAIS LONGE.", /* @__PURE__ */ React.createElement("br", null), "A GENTE CUIDA ", /* @__PURE__ */ React.createElement("span", { className: "accent-word" }, "DO CAMINHO.")), /* @__PURE__ */ React.createElement("p", { className: "lede", style: { marginTop: 22 } }, "Deixe a burocracia com quem entende. Foque no que realmente importa: fazer seu neg\xF3cio crescer.")), /* @__PURE__ */ React.createElement("div", { className: "cta-actions" }, /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", className: "cta primary" }, /* @__PURE__ */ React.createElement(I.Wpp, { style: { width: 16, height: 16 } }), " Falar com Especialista"), /* @__PURE__ */ React.createElement("a", { href: "#contato", className: "cta ghost" }, "Solicitar proposta por e-mail ", /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "var(--muted)", marginTop: 6, letterSpacing: "0.04em" } }, "Atendimento de segunda a sexta, das 9h \xE0s 18h")))));
  }
  function formatCnpj(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 14);
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  }
  function isValidCnpj(value) {
    const cnpj = String(value || "").replace(/\D/g, "");
    if (!/^\d{14}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
    const digit = (length) => {
      let sum = 0;
      let pos = length - 7;
      for (let i = length; i >= 1; i -= 1) {
        sum += Number(cnpj[length - i]) * pos;
        pos -= 1;
        if (pos < 2) pos = 9;
      }
      const result = sum % 11;
      return result < 2 ? 0 : 11 - result;
    };
    return digit(12) === Number(cnpj[12]) && digit(13) === Number(cnpj[13]);
  }
  function emptyForm() {
    return {
      name: "",
      email: "",
      company: "",
      cnpj: "",
      topic: TOPIC_BY_PAGE[PAGE] || "Importa\xE7\xE3o",
      product: "",
      ncm: "",
      volume: "",
      cargo: "",
      phone: "",
      msg: ""
    };
  }
  function Contact() {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [sending, setSending] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const validate = () => {
      const e = {};
      if (!form.name.trim()) e.name = "Informe seu nome.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "E-mail inv\xE1lido.";
      if (!form.company.trim()) e.company = "Informe a empresa.";
      if (!isValidCnpj(form.cnpj)) e.cnpj = "Informe um CNPJ v\xE1lido.";
      if (form.product.trim().length < 2) e.product = "Informe o produto.";
      if (!form.ncm.trim()) e.ncm = "Informe o NCM ou escreva N\xE3o sei informar.";
      if (!form.volume) e.volume = "Selecione o volume mensal.";
      if (form.cargo.trim().length < 2) e.cargo = "Informe o volume da carga.";
      if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um WhatsApp com DDD.";
      if (!form.msg.trim() || form.msg.trim().length < 10) e.msg = "Descreva sua necessidade (10+ caracteres).";
      setErrors(e);
      return Object.keys(e).length === 0;
    };
    const submit = async (ev) => {
      var _a;
      ev.preventDefault();
      if (!validate()) return;
      const formEl = ev.currentTarget;
      if ((_a = formEl.botcheck) == null ? void 0 : _a.checked) return;
      if (form.volume === "pessoal") {
        setBlocked(true);
        trackEvent("lead_unqualified", { volume: form.volume, topic: form.topic, page: PAGE });
        return;
      }
      setSending(true);
      setSubmitError("");
      try {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          cnpj: form.cnpj.trim(),
          topic: form.topic,
          product: form.product.trim(),
          ncm: form.ncm.trim(),
          volume: form.volume,
          cargo: form.cargo.trim(),
          phone: form.phone.trim(),
          message: form.msg.trim(),
          page: PAGE
        };
        const res = await fetch(CONTACT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSent(true);
          trackEvent("generate_lead", { topic: form.topic, volume: form.volume, page: PAGE });
        } else if (data.qualified === false) {
          setBlocked(true);
          trackEvent("lead_unqualified", { volume: form.volume, topic: form.topic, page: PAGE });
        } else {
          setSubmitError(data.message || "N\xE3o foi poss\xEDvel enviar. Tente novamente ou use o WhatsApp.");
        }
      } catch (e) {
        setSubmitError("Erro de conex\xE3o. Tente novamente ou fale conosco pelo WhatsApp.");
      } finally {
        setSending(false);
      }
    };
    const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const resetForm = () => {
      setSent(false);
      setBlocked(false);
      setSubmitError("");
      setForm(emptyForm());
    };
    return /* @__PURE__ */ React.createElement("section", { id: "contato", className: "theme-light" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(Reveal, { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, "Contato"), /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 18 } }, "Solicite uma an\xE1lise", /* @__PURE__ */ React.createElement("br", null), "da sua opera\xE7\xE3o")), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Conte um pouco sobre sua opera\xE7\xE3o. Retornamos em at\xE9 1 dia \xFAtil com uma an\xE1lise inicial e os pr\xF3ximos passos.")), /* @__PURE__ */ React.createElement("div", { className: "contact-grid" }, /* @__PURE__ */ React.createElement(Reveal, { as: "div", className: "contact-card" }, blocked ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "form-error-msg" }, "Este canal \xE9 para opera\xE7\xF5es de com\xE9rcio exterior. Se a sua necessidade for pontual, fale com a equipe pelo WhatsApp."), /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", className: "cta primary", style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement(I.Wpp, { style: { width: 16, height: 16 } }), " Falar no WhatsApp")) : sent ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "success-msg" }, /* @__PURE__ */ React.createElement(I.Shield, { style: { width: 18, height: 18 } }), "Mensagem enviada. Nossa equipe entrar\xE1 em contato em breve."), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "cta ghost",
        style: { marginTop: 22 },
        onClick: resetForm
      },
      "Enviar outra mensagem ",
      /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" })
    )) : /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", name: "botcheck", className: "form-honeypot", tabIndex: -1, autoComplete: "off", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "field-row" }, /* @__PURE__ */ React.createElement("div", { className: `field ${errors.name ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Nome"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.name, onChange: setF("name"), placeholder: "Seu nome" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.name || "")), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.email ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "E-mail"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.email, onChange: setF("email"), placeholder: "voce@empresa.com" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.email || ""))), /* @__PURE__ */ React.createElement("div", { className: "field-row" }, /* @__PURE__ */ React.createElement("div", { className: `field ${errors.company ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Empresa"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.company, onChange: setF("company"), placeholder: "Raz\xE3o social" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.company || "")), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.cnpj ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "CNPJ"), /* @__PURE__ */ React.createElement("input", { type: "text", inputMode: "numeric", value: form.cnpj, onChange: (e) => setForm({ ...form, cnpj: formatCnpj(e.target.value) }), placeholder: "00.000.000/0000-00" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.cnpj || ""))), /* @__PURE__ */ React.createElement("div", { className: "field-row" }, /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Tipo de opera\xE7\xE3o"), /* @__PURE__ */ React.createElement("select", { value: form.topic, onChange: setF("topic") }, /* @__PURE__ */ React.createElement("option", null, "Importa\xE7\xE3o"), /* @__PURE__ */ React.createElement("option", null, "Exporta\xE7\xE3o"), /* @__PURE__ */ React.createElement("option", null, "Assessoria aduaneira"), /* @__PURE__ */ React.createElement("option", null, "Classifica\xE7\xE3o fiscal"), /* @__PURE__ */ React.createElement("option", null, "DUIMP / Cat\xE1logo de Produtos"), /* @__PURE__ */ React.createElement("option", null, "Regimes especiais / Benef\xEDcios fiscais"), /* @__PURE__ */ React.createElement("option", null, "Outro"))), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.product ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Produto"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.product, onChange: setF("product"), placeholder: "Nome da mercadoria" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.product || ""))), /* @__PURE__ */ React.createElement("div", { className: "field-row" }, /* @__PURE__ */ React.createElement("div", { className: `field ${errors.ncm ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "NCM"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.ncm, onChange: setF("ncm"), placeholder: "Ex.: 8471.30.12 ou N\xE3o sei informar" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.ncm || "")), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.volume ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Volume mensal estimado"), /* @__PURE__ */ React.createElement("select", { value: form.volume, onChange: setF("volume") }, VOLUME_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.value || "empty", value: option.value }, option.label))), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.volume || ""))), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.cargo ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Volume da carga"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.cargo, onChange: setF("cargo"), placeholder: "Quantidade da carga" }), /* @__PURE__ */ React.createElement("span", { className: "hint" }, "Sugest\xE3o: 1 cont\xEAiner, 100 caixas, 10 pallets."), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.cargo || "")), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.phone ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "WhatsApp"), /* @__PURE__ */ React.createElement("input", { type: "tel", value: form.phone, onChange: setF("phone"), placeholder: "Opcional, com DDD" }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.phone || "")), /* @__PURE__ */ React.createElement("div", { className: `field ${errors.msg ? "error" : ""}` }, /* @__PURE__ */ React.createElement("label", null, "Conte sobre sua necessidade"), /* @__PURE__ */ React.createElement("textarea", { value: form.msg, onChange: setF("msg"), placeholder: "Origem, destino, prazos e o que mais a equipe precisa saber." }), /* @__PURE__ */ React.createElement("span", { className: "err" }, errors.msg || "")), /* @__PURE__ */ React.createElement("div", { className: "form-foot" }, /* @__PURE__ */ React.createElement("span", { className: "consent" }, "Ao enviar voc\xEA concorda em ser contatado pela equipe VMI."), submitError && /* @__PURE__ */ React.createElement("div", { className: "form-error-msg" }, submitError), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "cta primary", disabled: sending }, sending ? "Enviando..." : "Falar com Especialista", " ", !sending && /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" }))))), /* @__PURE__ */ React.createElement("div", { className: "contact-side" }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("h3", null, "Canais diretos"), /* @__PURE__ */ React.createElement("div", { className: "contact-list" }, /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener" }, /* @__PURE__ */ React.createElement("span", { className: "ico" }, /* @__PURE__ */ React.createElement(I.Phone, null)), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "WhatsApp"), PHONE)), /* @__PURE__ */ React.createElement("a", { href: `mailto:${EMAIL}` }, /* @__PURE__ */ React.createElement("span", { className: "ico" }, /* @__PURE__ */ React.createElement(I.Mail, null)), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "E-mail"), EMAIL)), /* @__PURE__ */ React.createElement("a", { href: LINKEDIN, target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement("span", { className: "ico ico--social" }, /* @__PURE__ */ React.createElement(I.Linkedin, null)), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "LinkedIn"), LINKEDIN_HANDLE)), /* @__PURE__ */ React.createElement("a", { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement("span", { className: "ico ico--social" }, /* @__PURE__ */ React.createElement(I.Instagram, null)), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Instagram"), INSTAGRAM_HANDLE))))))));
  }
  const FOOTER_SERVICES = [
    ["Importa\xE7\xE3o", "/importacao/"],
    ["Exporta\xE7\xE3o", "/exportacao/"],
    ["Despacho aduaneiro", "/despacho-aduaneiro/"],
    ["Log\xEDstica integrada", siteHref("#servicos")]
  ];
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "footer-grid" }, /* @__PURE__ */ React.createElement("div", { className: "footer-brand" }, /* @__PURE__ */ React.createElement(BrandMark, { size: "footer" }), /* @__PURE__ */ React.createElement("p", { className: "footer-blurb" }, "Solu\xE7\xF5es inteligentes em Com\xE9rcio Exterior e Log\xEDstica Internacional."), /* @__PURE__ */ React.createElement("div", { className: "footer-social" }, /* @__PURE__ */ React.createElement("a", { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram" }, /* @__PURE__ */ React.createElement(I.Instagram, null)), /* @__PURE__ */ React.createElement("a", { href: LINKEDIN, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn" }, /* @__PURE__ */ React.createElement(I.Linkedin, null)), /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", "aria-label": "WhatsApp" }, /* @__PURE__ */ React.createElement(I.Wpp, null)))), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Servi\xE7os"), /* @__PURE__ */ React.createElement("ul", null, FOOTER_SERVICES.map(([label, href]) => /* @__PURE__ */ React.createElement("li", { key: label }, /* @__PURE__ */ React.createElement("a", { href }, label))))), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Contato"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer" }, "WhatsApp")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: `mailto:${EMAIL}` }, EMAIL)))), /* @__PURE__ */ React.createElement("div", { className: "footer-col" }, /* @__PURE__ */ React.createElement("h4", null, "Localiza\xE7\xE3o"), /* @__PURE__ */ React.createElement("p", { className: "footer-location" }, HQ_STREET, /* @__PURE__ */ React.createElement("br", null), HQ_CITY), /* @__PURE__ */ React.createElement("h4", { className: "footer-col__sub" }, "Redes Sociais"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: INSTAGRAM, target: "_blank", rel: "noopener noreferrer" }, "Instagram")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: LINKEDIN, target: "_blank", rel: "noopener noreferrer" }, "LinkedIn"))))), /* @__PURE__ */ React.createElement("div", { className: "footer-bottom" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " VMI Assessoria Empresarial LTDA. Todos os direitos reservados."))));
  }
  const SERVICE_PAGES = {
    importacao: {
      kicker: "Importa\xE7\xE3o",
      title: "Importa\xE7\xE3o com seguran\xE7a, do fornecedor \xE0 nacionaliza\xE7\xE3o.",
      lead: "Planejamos a opera\xE7\xE3o, classificamos a mercadoria e conduzimos licen\xE7as, DUIMP e log\xEDstica at\xE9 a entrega no Brasil.",
      points: [
        ["Doc", "Planejamento da opera\xE7\xE3o", "Definimos rota, custos, regime aduaneiro e documentos antes do embarque."],
        ["Calculator", "Classifica\xE7\xE3o fiscal", "Enquadramento de NCM para reduzir risco de multa e recolhimento indevido."],
        ["Stamp", "LI, LPCO e DUIMP", "Tratamento administrativo e registro das declara\xE7\xF5es no Portal \xDAnico."],
        ["Truck", "Log\xEDstica internacional", "Do embarque na origem \xE0 entrega no destino, com acompanhamento da carga."]
      ]
    },
    exportacao: {
      kicker: "Exporta\xE7\xE3o",
      title: "Exporta\xE7\xE3o estruturada para vender no exterior com previsibilidade.",
      lead: "Organizamos a sa\xEDda da mercadoria, a documenta\xE7\xE3o e a log\xEDstica para a opera\xE7\xE3o chegar ao comprador com conformidade.",
      points: [
        ["Plane", "Estrutura\xE7\xE3o da exporta\xE7\xE3o", "Avaliamos produto, destino, documentos e a melhor forma de operar."],
        ["Doc", "DUE e documentos", "Registro da declara\xE7\xE3o \xFAnica de exporta\xE7\xE3o e apoio na documenta\xE7\xE3o comercial."],
        ["Ship", "Log\xEDstica de sa\xEDda", "Cota\xE7\xE3o de frete, embarque e coordena\xE7\xE3o at\xE9 o destino."],
        ["Shield", "Conformidade", "A opera\xE7\xE3o segue a legisla\xE7\xE3o aduaneira e os \xF3rg\xE3os competentes."]
      ]
    },
    "despacho-aduaneiro": {
      kicker: "Despacho aduaneiro",
      title: "Despacho aduaneiro com acompanhamento em cada etapa.",
      lead: "Atuamos junto \xE0 Receita Federal e aos \xF3rg\xE3os anuentes para a mercadoria seguir com documenta\xE7\xE3o correta e menos atraso.",
      points: [
        ["Stamp", "Confer\xEAncia documental", "Revisamos invoice, packing list, conhecimento de carga e licen\xE7as."],
        ["Tag", "Registro de declara\xE7\xF5es", "DI, DUIMP e DUE com os dados certos para evitar exig\xEAncia."],
        ["Shield", "\xD3rg\xE3os anuentes", "Acompanhamento de anu\xEAncias, canais e pend\xEAncias do processo."],
        ["Hands", "Suporte \xE0 opera\xE7\xE3o", "A equipe fica pr\xF3xima do cliente at\xE9 a libera\xE7\xE3o da carga."]
      ]
    }
  };
  function ServicePage({ page }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "service-hero theme-light" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("span", { className: "eyebrow" }, page.kicker), /* @__PURE__ */ React.createElement("h1", null, page.title), /* @__PURE__ */ React.createElement("p", { className: "lede" }, page.lead), /* @__PURE__ */ React.createElement("div", { className: "hero-meta" }, /* @__PURE__ */ React.createElement("a", { href: "#contato", className: "cta primary" }, "Solicitar an\xE1lise ", /* @__PURE__ */ React.createElement(I.Arrow, { className: "arrow" })), /* @__PURE__ */ React.createElement("a", { href: WHATSAPP, target: "_blank", rel: "noopener noreferrer", className: "cta ghost" }, "Falar no WhatsApp")))), /* @__PURE__ */ React.createElement("section", { className: "theme-light alt" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "services" }, page.points.map(([icon, title, desc]) => {
      const Ico = I[icon];
      return /* @__PURE__ */ React.createElement("article", { className: "svc", key: title }, /* @__PURE__ */ React.createElement("span", { className: "svc-icon" }, /* @__PURE__ */ React.createElement(Ico, null)), /* @__PURE__ */ React.createElement("div", { className: "svc-body" }, /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("p", null, desc)));
    })))), /* @__PURE__ */ React.createElement(Contact, null));
  }
  function ConsentBanner() {
    const [choice, setChoice] = useState(() => {
      try {
        return localStorage.getItem("vmi-consent");
      } catch (e) {
        return "denied";
      }
    });
    if (choice) return null;
    const choose = (value) => {
      try {
        localStorage.setItem("vmi-consent", value);
      } catch (e) {
      }
      const granted = value === "granted" ? "granted" : "denied";
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          ad_storage: granted,
          analytics_storage: granted,
          ad_user_data: granted,
          ad_personalization: granted
        });
      }
      trackEvent(value === "granted" ? "consent_granted" : "consent_denied");
      setChoice(value);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "cookie-banner", role: "dialog", "aria-label": "Cookies e medi\xE7\xE3o" }, /* @__PURE__ */ React.createElement("p", null, "Usamos cookies para medir visitas e an\xFAncios. Voc\xEA pode aceitar ou seguir s\xF3 com o essencial."), /* @__PURE__ */ React.createElement("div", { className: "cookie-banner__actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "cta ghost", onClick: () => choose("denied") }, "S\xF3 o essencial"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "cta primary", onClick: () => choose("granted") }, "Aceitar")));
  }
  function TrackClicks() {
    useEffect(() => {
      const onClick = (ev) => {
        const link = ev.target.closest && ev.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href") || "";
        if (href.indexOf("wa.me") !== -1) trackEvent("whatsapp_click", { page: PAGE });
        else if (href.indexOf("mailto:") === 0) trackEvent("email_click", { page: PAGE });
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }, []);
    return null;
  }
  function App() {
    const service = SERVICE_PAGES[PAGE];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), service ? /* @__PURE__ */ React.createElement(ServicePage, { page: service }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(SocialProof, null), /* @__PURE__ */ React.createElement(TrustStrip, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Award, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(HowItWorks, null), /* @__PURE__ */ React.createElement(Segments, null), /* @__PURE__ */ React.createElement(Why, null), /* @__PURE__ */ React.createElement(CtaBlock, null), /* @__PURE__ */ React.createElement(Contact, null)), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement("a", { className: "wa-float", href: WHATSAPP, target: "_blank", rel: "noopener", "aria-label": "Fale conosco pelo WhatsApp" }, /* @__PURE__ */ React.createElement(I.Wpp, null), /* @__PURE__ */ React.createElement("span", { className: "wa-label" }, "Fale conosco")), /* @__PURE__ */ React.createElement(ConsentBanner, null), /* @__PURE__ */ React.createElement(TrackClicks, null));
  }
  window.VMIApp = App;
})();
