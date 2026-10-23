/* global React, VMIIcons */
const { useState, useEffect, useRef } = React;
const I = window.VMIIcons;

const LINKEDIN = "https://www.linkedin.com/company/vmi-assessoria-empresarial-ltda";
const INSTAGRAM = "https://instagram.com/vmiassessoria";
const HQ_STREET = "Av. Paulista";
const HQ_CITY = "São Paulo, SP";
const CONTACT_API = "/api/contact";
const PAGE = (document.body && document.body.dataset.page) || "home";
const IS_HOME = PAGE === "home";
const HAS_SHELL = !!document.querySelector("[data-shell]");
const SPECIALIST_TOPIC = {
  importacao: "importação",
  exportacao: "exportação",
  "despacho-aduaneiro": "despacho aduaneiro"
};
const SPECIALIST_WHATSAPP = `https://wa.me/5511969287540?text=${encodeURIComponent(
  SPECIALIST_TOPIC[PAGE]
    ? `Olá, vim pelo site da VMI e quero falar sobre ${SPECIALIST_TOPIC[PAGE]}.`
    : "Olá, vim pelo site da VMI e quero falar com um especialista."
)}`;

function siteHref(hash) {
  return IS_HOME ? hash : `/${hash}`;
}

function trackEvent(name, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: name }, params || {}));
}

const VOLUME_OPTIONS = [
  { value: "", label: "Selecione o volume mensal" },
  { value: "pessoal", label: "Compra pessoal ou ainda sem operação" },
  { value: "ate-5", label: "Até US$ 5 mil por mês" },
  { value: "5-20", label: "De US$ 5 mil a US$ 20 mil por mês" },
  { value: "20-100", label: "De US$ 20 mil a US$ 100 mil por mês" },
  { value: "acima-100", label: "Acima de US$ 100 mil por mês" }
];
const TOPIC_BY_PAGE = {
  importacao: "Importação",
  exportacao: "Exportação",
  "despacho-aduaneiro": "Assessoria aduaneira"
};

// ----- Configuração editável (stats, hero, presença) -----
const SITE_CONFIG = {
  stats: [
    { value: "+30", label: "Anos de experiência" },
    { value: "+20", label: "Países atendidos" },
    { value: "+12", label: "Escritórios no Brasil" },
    { value: "100%", label: "Foco em conformidade e segurança" }
  ],
  heroTrust: [
    "Operações nacionais e internacionais",
    "Equipe especializada",
    "Presença em 12 cidades estratégicas",
    "Atendimento personalizado"
  ],
  processSteps: [
    ["Target", "Diagnóstico da operação", "Analisamos sua operação e identificamos oportunidades, riscos e requisitos."],
    ["Doc", "Planejamento estratégico", "Estruturamos a melhor rota aduaneira, fiscal e logística para seu negócio."],
    ["Stamp", "Execução aduaneira e logística", "Operacionalizamos importação, exportação e toda a cadeia com precisão."],
    ["Shield", "Acompanhamento completo", "Monitoramos cada etapa junto à Receita Federal e órgãos anuentes."],
    ["Hands", "Entrega e suporte contínuo", "Garantimos a entrega no destino final com suporte permanente à operação."]
  ],
  awardMedia: [
    {
      type: "video",
      src: "/assets/premiacao/ctf-awards.mp4",
      caption: "Cerimônia do CTF Awards",
      orient: "portrait"
    },
    {
      type: "image",
      src: "/assets/premiacao/ctf-trofeu-800.webp",
      alt: "Equipe da VMI com o troféu do CTF Awards na categoria Innovation",
      caption: "Categoria Innovation",
      orient: "landscape",
      featured: true
    },
    {
      type: "image",
      src: "/assets/premiacao/ctf-entrega.webp",
      alt: "Momento da entrega do CTF Awards no palco",
      caption: "Entrega do prêmio",
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

// ----- Brand mark (logo) -----
function BrandMark({ size = "nav" }) {
  return (
    <div className={`brand brand--${size}`}>
      <img
        src="/assets/logo-vmi.webp"
        alt="VMI"
        className="brand-logo"
        width="128"
        height="96"
      />
    </div>
  );
}

// ----- World map decoration (subtle dot grid simulating continents) -----
function WorldMap() {
  const dots = [];
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 30; j++) {
      const x = j * 24 + (i % 2) * 12;
      const y = i * 24 + 12;
      const inLand =
        (j > 4 && j < 9 && i > 3 && i < 9) ||
        (j > 5 && j < 11 && i > 1 && i < 5) ||
        (j > 13 && j < 17 && i > 1 && i < 4) ||
        (j > 14 && j < 18 && i > 4 && i < 9) ||
        (j > 18 && j < 26 && i > 1 && i < 6) ||
        (j > 22 && j < 26 && i > 7 && i < 10);
      if (inLand) dots.push(<circle key={`${i}-${j}`} cx={x} cy={y} r="2" />);
    }
  }
  return (
    <svg className="world-map" viewBox="0 0 720 280" aria-hidden="true">
      <g fill="var(--accent)">{dots}</g>
    </svg>
  );
}

// ----- Reveal-on-scroll wrapper -----
function Reveal({ children, as: Tag = "div", delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setTimeout(() => setShown(true), delay); obs.unobserve(el); }
      }),
      { rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>{children}</Tag>;
}

// ----- Nav -----
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
    ["Serviços", siteHref("#servicos")],
    ["Diferenciais", siteHref("#diferenciais")]
  ];
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href={IS_HOME ? "#top" : "/"} aria-label="VMI"><BrandMark /></a>
        <nav className="nav-links">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href={siteHref("#contato")} className="cta primary">
            Contato <I.Arrow className="arrow" />
          </a>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <I.Close /> : <I.Menu />}
          </button>
        </div>
      </div>
      <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
        {links.map(([l, h]) => <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>)}
      </div>
    </header>
  );
}

// ----- Hero -----
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="flyer-curve" aria-hidden="true" />
      <div className="container" style={{ position: "relative" }}>
        <WorldMap />
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Comércio Exterior &amp; Logística Internacional</span>
            <h1>
              Habilitamos operações internacionais com <span className="accent">segurança, agilidade e inteligência.</span>
            </h1>
            <p className="lede">
              Assessoria completa em importação, exportação e logística internacional. Da busca por fornecedores até a entrega da mercadoria.
            </p>
            <div className="hero-meta">
              <a href="#contato" className="cta primary">Solicite uma proposta <I.Arrow className="arrow" /></a>
              <a href={SPECIALIST_WHATSAPP} className="cta ghost" target="_blank" rel="noopener noreferrer">Falar com Especialista</a>
            </div>
            <ul className="hero-trust" aria-label="Diferenciais de confiança">
              {SITE_CONFIG.heroTrust.map((item) => (
                <li key={item}><span className="hero-trust-mark" aria-hidden="true">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          <PortVisual />
        </div>
      </div>
    </section>
  );
}

// ----- Hero visual -----
function PortVisual() {
  return (
    <div className="hero-visual hero-visual--photo">
      <img
        src="/assets/hero-porto-720.webp"
        srcSet="/assets/hero-porto-720.webp 720w, /assets/hero-porto.webp 1122w"
        sizes="(max-width: 900px) 92vw, 420px"
        alt="Navio porta-contêineres no porto ao pôr do sol"
        width="720"
        height="900"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-quote">
        <span className="qmark">"</span>
        <p>Especialistas em comércio exterior. Parceiros no crescimento do seu negócio.</p>
      </div>
    </div>
  );
}

// ----- Prova social -----
function SocialProof() {
  return (
    <section className="social-proof" id="resultados">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Resultados</span>
            <h2 style={{ marginTop: 18 }}>Experiência que<br/>gera resultados.</h2>
          </div>
          <p className="lede">
            Números que refletem nossa atuação em comércio exterior e logística internacional.
          </p>
        </Reveal>
        <div className="stats-grid">
          {SITE_CONFIG.stats.map(({ value, label }, i) => (
            <Reveal key={label} as="article" className="stat-card" delay={i * 70}>
              <span className="stat-card__value">{value}</span>
              <span className="stat-card__label">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Trust strip -----
function TrustStrip() {
  return (
    <div className="strip">
      <div className="container strip-row">
        <span>Importação <span className="dot" /> Exportação <span className="dot" /> Logística Integrada <span className="dot" /> DUIMP</span>
        <span className="strip-cta">
          Envie o local do seu interesse para avaliarmos a possibilidade
        </span>
      </div>
    </div>
  );
}

// ----- Quem Somos (About) -----
const OFFICES = [
  ["São Paulo", "SP", "Matriz, Av. Paulista"],
  ["Guarulhos", "SP"], ["Viracopos", "SP"], ["Santos", "SP"], ["Rio de Janeiro", "RJ"],
  ["Curitiba", "PR"], ["Goiânia", "GO"], ["Uruguaiana", "RS"], ["Chuí", "RS"],
  ["Itajaí", "SC"], ["Florianópolis", "SC"], ["Salvador", "BA"]
];

function About() {
  return (
    <section id="quem-somos" className="theme-light">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-copy">
            <span className="eyebrow">Quem Somos</span>
            <h2 style={{ marginTop: 18 }}>Soluções completas,<br/>da origem ao destino final.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              A VMI Assessoria foi criada para oferecer soluções completas em Comércio Exterior,
              desde a busca por fornecedores até a entrega da mercadoria no destino final.
              Atua com excelência, agilidade e segurança em todas as etapas dos processos
              de importação e/ou exportação.
            </p>
            <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6, maxWidth: "56ch" }}>
              Nossa missão é simplificar operações internacionais e gerar resultados para os clientes.
              Presença estratégica nos principais polos logísticos, aeroportos, portos e fronteiras do Brasil.
            </p>
          </Reveal>

          <Reveal as="div" className="about-offices" delay={120}>
            <div className="ao-head">
              <span className="ao-n">12</span>
              <span className="ao-t">escritórios em pontos estratégicos<br/>do território nacional</span>
            </div>
            <div className="ao-chips">
              {OFFICES.map(([c, uf, tag]) => (
                <span className="ao-chip" key={c + uf}>
                  {c} <em>{tag || uf}</em>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ----- Reconhecimento (premiação dos sócios) -----
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
    if (!galleryOpen) return undefined;
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

  return (
    <section id="reconhecimento" className="award">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Reconhecimento</span>
            <h2 style={{ marginTop: 18 }}>Premiados no CTF Awards.</h2>
          </div>
          <p className="lede">
            Na categoria Innovation, a VMI Assessoria foi reconhecida por ser inovadora
            no comércio exterior. É um prêmio que reforça nossa forma de conduzir operações
            internacionais com inteligência e precisão.
          </p>
        </Reveal>
        <div className="award-meta" aria-label="Detalhes da premiação">
          <span>CTF Awards</span>
          <span>Categoria Innovation</span>
        </div>

        <figure className="award-hero">
          <img src={featured.src} alt={featured.alt} width="800" height="533" loading="lazy" decoding="async" />
          <figcaption>{featured.caption}</figcaption>
        </figure>

        <div className="award-controls">
          <button type="button" className="cta ghost" onClick={() => openGallery(featuredIndex)}>
            Ver mais
          </button>
        </div>
      </div>

      {galleryOpen && current && (
        <div className="award-modal" role="dialog" aria-modal="true" aria-label="Galeria CTF Awards">
          <button type="button" className="award-modal__backdrop" onClick={() => setGalleryOpen(false)} aria-label="Fechar" />
          <div className="award-modal__panel">
            <div className="award-modal__head">
              <div>
                <h3>CTF Awards</h3>
                <p>{current.caption}</p>
              </div>
              <button type="button" className="award-modal__close" onClick={() => setGalleryOpen(false)} aria-label="Fechar">
                <I.Close />
              </button>
            </div>

            <div className="award-modal__view">
              <button
                type="button"
                className="award-modal__nav award-modal__nav--prev"
                onClick={() => setViewIndex((i) => (i - 1 + media.length) % media.length)}
                aria-label="Anterior"
              >
                <I.Arrow />
              </button>
              {current.type === "video" ? (
                <video key={current.src} src={current.src} controls playsInline preload="none" title={current.caption}>
                  Seu navegador não reproduz vídeo.
                </video>
              ) : (
                <img src={current.src} alt={current.alt} />
              )}
              <button
                type="button"
                className="award-modal__nav award-modal__nav--next"
                onClick={() => setViewIndex((i) => (i + 1) % media.length)}
                aria-label="Próxima"
              >
                <I.Arrow />
              </button>
            </div>

            <div className="award-modal__thumbs" role="tablist" aria-label="Fotos e vídeo">
              {media.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={i === viewIndex}
                  className={`award-modal__thumb ${i === viewIndex ? "is-active" : ""} ${item.type === "video" ? "is-video" : ""}`}
                  onClick={() => setViewIndex(i)}
                  aria-label={item.caption}
                >
                  {item.type === "video" ? (
                    <span className="award-modal__video-mark">Vídeo</span>
                  ) : (
                    <img src={item.src} alt="" loading="lazy" decoding="async" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ----- Services (14 from portfolio) -----
const SERVICES = [
  ["Exchange", "Importação", "Gestão completa do seu processo de importação, do planejamento à nacionalização.", "/importacao/"],
  ["Plane", "Exportação", "Estruturação e operação de exportações com segurança e competitividade.", "/exportacao/"],
  ["Stamp", "Assessoria aduaneira", "Suporte técnico junto à Receita Federal e órgãos anuentes em todas as etapas.", "/despacho-aduaneiro/"],
  ["Truck", "Logística integrada", "Coordenação de toda a cadeia logística, da origem ao destino final."],
  ["Doc", "Catálogo de Produtos", "Elaboração e gestão do Catálogo de Produtos no Portal Único Siscomex."],
  ["Tag", "Emissão de DI / DUIMP / DUE", "Registro preciso das declarações de importação e exportação."],
  ["Doc", "Emissão de LI / LPCO", "Licenciamento e tratamento administrativo junto aos órgãos competentes."],
  ["Calculator", "Classificação fiscal", "Enquadramento correto de NCM para reduzir custos e evitar riscos."],
  ["Ship", "Agenciamento de cargas", "Cotação e contratação das melhores rotas e modais para sua carga."],
  ["Shield", "Seguro internacional", "Proteção da sua mercadoria durante todo o trajeto internacional."],
  ["Box", "Transporte Nacional", "Movimentação da carga em território nacional com rastreabilidade."],
  ["Dollar", "Ex tarifário", "Redução de alíquotas de importação para bens sem similar nacional."],
  ["Globe", "Regimes especiais", "Aplicação de drawback, Entreposto e demais regimes aduaneiros vantajosos."],
  ["Dollar", "Benefícios fiscais e incentivos", "Identificação de incentivos fiscais estaduais e federais aplicáveis."]
];

function Services() {
  return (
    <section id="servicos" className="services-section theme-light alt">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Nossos Serviços</span>
            <h2 style={{ marginTop: 18 }}>Tudo o que sua operação<br/>internacional precisa.</h2>
          </div>
          <p className="lede">
            Da busca por fornecedores à entrega no destino final, cuidamos de cada etapa
            do seu comércio exterior com precisão técnica e atendimento próximo.
          </p>
        </Reveal>

        <div className="services">
          {SERVICES.map(([icon, title, desc, href], idx) => {
            const Ico = I[icon];
            return (
              <Reveal key={title} as="article" className="svc" delay={(idx % 3) * 60}>
                <span className="svc-icon"><Ico /></span>
                <div className="svc-body">
                  <h3>{href ? <a href={href}>{title}</a> : title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----- Como funciona -----
function HowItWorks() {
  return (
    <section id="como-funciona" className="process-section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Como funciona</span>
            <h2 style={{ marginTop: 18 }}>Como apoiamos sua operação internacional</h2>
          </div>
          <p className="lede">
            Um processo claro e transparente, do diagnóstico inicial ao suporte contínuo da sua operação.
          </p>
        </Reveal>
        <div className="process-steps">
          {SITE_CONFIG.processSteps.map(([icon, title, desc], i) => {
            const Ico = I[icon];
            return (
              <Reveal key={title} as="article" className="process-step" delay={i * 60}>
                <span className="process-step__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="process-step__icon"><Ico /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----- Segmentos atendidos -----
const SEGMENTS = [
  "Máquinas e equipamentos",
  "Produtos eletrônicos",
  "Móveis",
  "Têxtil",
  "Autopeças",
  "Automóveis",
  "Embarcações",
  "Produtos químicos",
  "Cosméticos"
];

function Segments() {
  return (
    <section id="segmentos" className="theme-light alt">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Segmentos atendidos</span>
            <h2 style={{ marginTop: 18 }}>Experiência em diversos<br/>setores da economia.</h2>
          </div>
          <p className="lede">
            Atuamos com empresas de diferentes segmentos, oferecendo soluções personalizadas
            em comércio exterior para cada operação.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="segment-chips">
            {SEGMENTS.map((segment) => (
              <span className="segment-chip" key={segment}>{segment}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ----- Diferenciais (6 from portfolio) -----
const WHY = [
  ["Target", "Foco em resultados", "Estratégias eficientes que impulsionam o crescimento e a lucratividade do seu negócio."],
  ["User", "Equipe especializada", "Profissionais experientes e qualificados prontos para oferecer as melhores soluções."],
  ["Shield", "Segurança e conformidade", "Atuação 100% alinhada às normas e legislações, garantindo segurança e tranquilidade para sua empresa."],
  ["Globe", "Atuação global", "Soluções completas para importação e exportação com abrangência internacional."],
  ["Bars", "Soluções personalizadas", "Projetos sob medida para atender às necessidades específicas do seu negócio."],
  ["Hands", "Parceria e confiança", "Relacionamento transparente e duradouro, baseado em ética, compromisso e resultados."]
];

function Why() {
  return (
    <section id="diferenciais" className="why">
      <div className="container">
        <Reveal className="why-highlight">
          <span className="why-highlight__eyebrow">Diferenciais da VMI</span>
          <h2>Por que empresas escolhem a VMI?</h2>
          <p>Soluções estratégicas e personalizadas que geram resultados reais para o seu negócio.</p>
        </Reveal>

        <div className="why-grid">
          {WHY.map(([ico, t, d], i) => {
            const Ico = I[ico];
            return (
              <Reveal key={t} as="div" className="why-card" delay={(i % 3) * 70}>
                <span className="why-icon"><Ico /></span>
                <h4>{t}</h4>
                <p>{d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----- CTA Block -----
function CtaBlock() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal as="div" className="cta-block">
          <div>
            <span className="ring"><I.Globe /></span>
            <h2 className="cta-headline">VÁ MAIS LONGE.<br/>A GENTE CUIDA <span className="accent-word">DO CAMINHO.</span></h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Deixe a burocracia com quem entende. Foque no que realmente importa:
              fazer seu negócio crescer.
            </p>
          </div>
          <div className="cta-actions">
            <a href={SPECIALIST_WHATSAPP} className="cta primary" target="_blank" rel="noopener noreferrer">Falar com Especialista</a>
            <a href="#contato" className="cta ghost">Solicite uma proposta <I.Arrow className="arrow" /></a>
            <span style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, letterSpacing: "0.04em" }}>
              Atendimento de segunda a sexta, das 9h às 18h
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ----- Contact -----
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
    topic: TOPIC_BY_PAGE[PAGE] || "Importação",
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
  const [sentChannel, setSentChannel] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [sendingChannel, setSendingChannel] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Informe seu nome.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.company.trim()) e.company = "Informe a empresa.";
    if (!isValidCnpj(form.cnpj)) e.cnpj = "Informe um CNPJ válido.";
    if (form.product.trim().length < 2) e.product = "Informe o produto.";
    if (!form.ncm.trim()) e.ncm = "Informe o NCM ou escreva Não sei informar.";
    if (!form.volume) e.volume = "Selecione o volume mensal.";
    if (form.cargo.trim().length > 160) e.cargo = "Resuma o volume da carga.";
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um WhatsApp com DDD.";
    if (!form.msg.trim() || form.msg.trim().length < 10) e.msg = "Descreva sua necessidade (10+ caracteres).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = async (ev) => {
    ev.preventDefault();
    const channel = ev.nativeEvent && ev.nativeEvent.submitter ? ev.nativeEvent.submitter.value : "email";
    if (!validate()) return;
    const formEl = ev.currentTarget;
    if (formEl.botcheck?.checked) return;

    if (form.volume === "pessoal") {
      setBlocked(true);
      trackEvent("lead_unqualified", { volume: form.volume, topic: form.topic, page: PAGE });
      return;
    }

    setSendingChannel(channel);
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
        page: PAGE,
        channel
      };
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
        setSentChannel(channel);
        setWhatsappUrl(data.whatsappUrl || "");
        if (data.whatsappUrl) window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
        trackEvent("generate_lead", { topic: form.topic, volume: form.volume, page: PAGE, channel });
      } else if (data.qualified === false) {
        setBlocked(true);
        trackEvent("lead_unqualified", { volume: form.volume, topic: form.topic, page: PAGE });
      } else {
        setSubmitError(data.message || "Não foi possível enviar. Tente novamente.");
      }
    } catch {
      setSubmitError("Erro de conexão. Tente novamente.");
    } finally {
      setSendingChannel("");
    }
  };
  const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const resetForm = () => {
    setSent(false);
    setSentChannel("");
    setWhatsappUrl("");
    setBlocked(false);
    setSubmitError("");
    setForm(emptyForm());
  };

  return (
    <section id="contato" className="theme-light">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Contato</span>
            <h2 style={{ marginTop: 18 }}>Solicite uma análise<br/>da sua operação</h2>
          </div>
          <p className="lede">
            Conte um pouco sobre sua operação. Retornamos em até 1 dia útil com uma
            análise inicial e os próximos passos.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal as="div" className="contact-card">
            {blocked ? (
              <div>
                <div className="form-error-msg">
                  Este canal é para operações de comércio exterior.
                </div>
              </div>
            ) : sent ? (
              <div>
                <div className="success-msg">
                  <I.Shield style={{ width: 18, height: 18 }} />
                  {sentChannel === "whatsapp"
                    ? "Mensagem enviada. Abrimos o WhatsApp com o resumo da sua operação."
                    : "Mensagem enviada. Nossa equipe entrará em contato em breve."}
                </div>
                {sentChannel === "whatsapp" && whatsappUrl && (
                  <a className="cta primary" style={{ marginTop: 22 }} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Continuar no WhatsApp <I.Arrow className="arrow" />
                  </a>
                )}
                <button
                  className="cta ghost"
                  style={{ marginTop: 22 }}
                  onClick={resetForm}
                >
                  Enviar outra mensagem <I.Arrow className="arrow" />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <p className="form-required-note">Campos com * são obrigatórios.</p>
                <div className="field-row field-row--3">
                  <div className={`field required ${errors.name ? "error" : ""}`}>
                    <label>Nome</label>
                    <input type="text" value={form.name} onChange={setF("name")} placeholder="Seu nome" aria-required="true" />
                    <span className="err">{errors.name || ""}</span>
                  </div>
                  <div className={`field required ${errors.email ? "error" : ""}`}>
                    <label>E-mail</label>
                    <input type="email" value={form.email} onChange={setF("email")} placeholder="voce@empresa.com" aria-required="true" />
                    <span className="err">{errors.email || ""}</span>
                  </div>
                  <div className={`field ${errors.phone ? "error" : ""}`}>
                    <label>WhatsApp</label>
                    <input type="tel" value={form.phone} onChange={setF("phone")} placeholder="Opcional, com DDD" />
                    <span className="err">{errors.phone || ""}</span>
                  </div>
                </div>
                <div className="field-row field-row--3">
                  <div className={`field required ${errors.company ? "error" : ""}`}>
                    <label>Empresa</label>
                    <input type="text" value={form.company} onChange={setF("company")} placeholder="Razão social" aria-required="true" />
                    <span className="err">{errors.company || ""}</span>
                  </div>
                  <div className={`field required ${errors.cnpj ? "error" : ""}`}>
                    <label>CNPJ</label>
                    <input type="text" inputMode="numeric" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: formatCnpj(e.target.value) })} placeholder="00.000.000/0000-00" aria-required="true" />
                    <span className="err">{errors.cnpj || ""}</span>
                  </div>
                  <div className="field required">
                    <label>Tipo de operação</label>
                    <select value={form.topic} onChange={setF("topic")} aria-required="true">
                      <option>Importação</option>
                      <option>Exportação</option>
                      <option>Assessoria aduaneira</option>
                      <option>Classificação fiscal</option>
                      <option>DUIMP / Catálogo de Produtos</option>
                      <option>Regimes especiais / Benefícios fiscais</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>
                <div className="field-row field-row--3">
                  <div className={`field required ${errors.product ? "error" : ""}`}>
                    <label>Produto</label>
                    <input type="text" value={form.product} onChange={setF("product")} placeholder="Nome da mercadoria" aria-required="true" />
                    <span className="err">{errors.product || ""}</span>
                  </div>
                  <div className={`field required ${errors.ncm ? "error" : ""}`}>
                    <label>NCM</label>
                    <input type="text" value={form.ncm} onChange={setF("ncm")} placeholder="8471.30.12 ou Não sei informar" aria-required="true" />
                    <span className="err">{errors.ncm || ""}</span>
                  </div>
                  <div className={`field required ${errors.volume ? "error" : ""}`}>
                    <label>Volume mensal estimado</label>
                    <select value={form.volume} onChange={setF("volume")} aria-required="true">
                      {VOLUME_OPTIONS.map((option) => (
                        <option key={option.value || "empty"} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <span className="err">{errors.volume || ""}</span>
                  </div>
                </div>
                <div className="field-row field-row--2">
                  <div className={`field ${errors.cargo ? "error" : ""}`}>
                    <label>Volume da carga</label>
                    <input type="text" value={form.cargo} onChange={setF("cargo")} placeholder="Quantidade da carga" />
                    <span className="hint">Sugestão: 1 contêiner, 100 caixas, 10 pallets.</span>
                    <span className="err">{errors.cargo || ""}</span>
                  </div>
                  <div className={`field required ${errors.msg ? "error" : ""}`}>
                    <label>Conte sobre sua necessidade</label>
                    <textarea value={form.msg} onChange={setF("msg")} placeholder="Origem, destino, prazos e o que mais a equipe precisa saber." aria-required="true" />
                    <span className="err">{errors.msg || ""}</span>
                  </div>
                </div>
                <div className="form-foot">
                  <span className="consent">Ao enviar você concorda em ser contatado pela equipe VMI.</span>
                  {submitError && <div className="form-error-msg">{submitError}</div>}
                  <div className="form-actions">
                    <button type="submit" value="email" className="cta primary" disabled={!!sendingChannel}>
                      {sendingChannel === "email" ? "Enviando..." : "Enviar por e-mail"}
                    </button>
                    <button type="submit" value="whatsapp" className="cta ghost" disabled={!!sendingChannel}>
                      {sendingChannel === "whatsapp" ? "Enviando..." : "Enviar por WhatsApp"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ----- Footer -----
const FOOTER_SERVICES = [
  ["Importação", "/importacao/"],
  ["Exportação", "/exportacao/"],
  ["Despacho aduaneiro", "/despacho-aduaneiro/"],
  ["Logística integrada", siteHref("#servicos")]
];

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandMark size="footer" />
            <p className="footer-blurb">
              Soluções inteligentes em Comércio Exterior e Logística Internacional.
            </p>
            <div className="footer-social">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><I.Instagram /></a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><I.Linkedin /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              {FOOTER_SERVICES.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Localização</h4>
            <p className="footer-location">{HQ_STREET}<br />{HQ_CITY}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VMI Assessoria Empresarial LTDA. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

const SERVICE_PAGES = {
  importacao: {
    kicker: "Importação",
    title: "Importação com segurança, do fornecedor à nacionalização.",
    lead: "Planejamos a operação, classificamos a mercadoria e conduzimos licenças, DUIMP e logística até a entrega no Brasil.",
    points: [
      ["Doc", "Planejamento da operação", "Definimos rota, custos, regime aduaneiro e documentos antes do embarque."],
      ["Calculator", "Classificação fiscal", "Enquadramento de NCM para reduzir risco de multa e recolhimento indevido."],
      ["Stamp", "LI, LPCO e DUIMP", "Tratamento administrativo e registro das declarações no Portal Único."],
      ["Truck", "Logística internacional", "Do embarque na origem à entrega no destino, com acompanhamento da carga."]
    ]
  },
  exportacao: {
    kicker: "Exportação",
    title: "Exportação estruturada para vender no exterior com previsibilidade.",
    lead: "Organizamos a saída da mercadoria, a documentação e a logística para a operação chegar ao comprador com conformidade.",
    points: [
      ["Plane", "Estruturação da exportação", "Avaliamos produto, destino, documentos e a melhor forma de operar."],
      ["Doc", "DUE e documentos", "Registro da declaração única de exportação e apoio na documentação comercial."],
      ["Ship", "Logística de saída", "Cotação de frete, embarque e coordenação até o destino."],
      ["Shield", "Conformidade", "A operação segue a legislação aduaneira e os órgãos competentes."]
    ]
  },
  "despacho-aduaneiro": {
    kicker: "Despacho aduaneiro",
    title: "Despacho aduaneiro com acompanhamento em cada etapa.",
    lead: "Atuamos junto à Receita Federal e aos órgãos anuentes para a mercadoria seguir com documentação correta e menos atraso.",
    points: [
      ["Stamp", "Conferência documental", "Revisamos invoice, packing list, conhecimento de carga e licenças."],
      ["Tag", "Registro de declarações", "DI, DUIMP e DUE com os dados certos para evitar exigência."],
      ["Shield", "Órgãos anuentes", "Acompanhamento de anuências, canais e pendências do processo."],
      ["Hands", "Suporte à operação", "A equipe fica próxima do cliente até a liberação da carga."]
    ]
  }
};

function ServicePage({ page }) {
  return (
    <React.Fragment>
      {HAS_SHELL ? null : (
      <section className="service-hero theme-light">
        <div className="container">
          <span className="eyebrow">{page.kicker}</span>
          <h1>{page.title}</h1>
          <p className="lede">{page.lead}</p>
          <div className="hero-meta">
            <a href="#contato" className="cta primary">Solicitar análise <I.Arrow className="arrow" /></a>
            <a href={SPECIALIST_WHATSAPP} className="cta ghost" target="_blank" rel="noopener noreferrer">Falar com Especialista</a>
          </div>
        </div>
      </section>
      )}
      <section className="theme-light alt">
        <div className="container">
          <div className="services">
            {page.points.map(([icon, title, desc]) => {
              const Ico = I[icon];
              return (
                <article className="svc" key={title}>
                  <span className="svc-icon"><Ico /></span>
                  <div className="svc-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Contact />
    </React.Fragment>
  );
}

function ConsentBanner() {
  const [choice, setChoice] = useState(() => {
    try { return localStorage.getItem("vmi-consent"); } catch { return "denied"; }
  });
  if (choice) return null;

  const choose = (value) => {
    try { localStorage.setItem("vmi-consent", value); } catch { /* ignore */ }
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

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookies e medição">
      <p>Usamos cookies para medir visitas e anúncios. Você pode aceitar ou seguir só com o essencial.</p>
      <div className="cookie-banner__actions">
        <button type="button" className="cta ghost" onClick={() => choose("denied")}>Só o essencial</button>
        <button type="button" className="cta primary" onClick={() => choose("granted")}>Aceitar</button>
      </div>
    </div>
  );
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

// ----- App -----
function App() {
  const service = SERVICE_PAGES[PAGE];
  return (
    <React.Fragment>
      {HAS_SHELL ? null : <Nav />}
      {service ? <ServicePage page={service} /> : (
        <React.Fragment>
          {HAS_SHELL ? null : <Hero />}
          <SocialProof />
          <TrustStrip />
          <About />
          <Award />
          <Services />
          <HowItWorks />
          <Segments />
          <Why />
          <CtaBlock />
          <Contact />
        </React.Fragment>
      )}
      <Footer />
      <ConsentBanner />
      <TrackClicks />
    </React.Fragment>
  );
}

window.VMIApp = App;
