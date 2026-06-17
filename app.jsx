/* global React, VMIIcons */
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
const HQ_CITY = "São Paulo - SP";
const WEB3FORMS_ACCESS_KEY = "3368ec52-50c8-4b66-9763-bcedef691c28";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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
  ]
};

// ----- Brand mark (logo) -----
function BrandMark({ size = "nav" }) {
  return (
    <div className={`brand brand--${size}`}>
      <img
        src="assets/logo-vmi.svg"
        alt="VMI"
        className="brand-logo"
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
    ["Quem Somos", "#quem-somos"],
    ["Serviços", "#servicos"],
    ["Diferenciais", "#diferenciais"],
    ["Contato", "#contato"]
  ];
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" aria-label="VMI"><BrandMark /></a>
        <nav className="nav-links">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cta primary">
            Fale agora <I.Arrow className="arrow" />
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
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cta ghost">Falar com Especialista</a>
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
        src="assets/hero-porto.png"
        alt="Navio porta-contêineres no porto ao pôr do sol"
        width="800"
        height="1000"
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
  ["São Paulo", "SP", "Matriz · Av. Paulista"],
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

// ----- Services (14 from portfolio) -----
const SERVICES = [
  ["Exchange", "Importação", "Gestão completa do seu processo de importação, do planejamento à nacionalização."],
  ["Plane", "Exportação", "Estruturação e operação de exportações com segurança e competitividade."],
  ["Stamp", "Assessoria aduaneira", "Suporte técnico junto à Receita Federal e órgãos anuentes em todas as etapas."],
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
          {SERVICES.map(([icon, title, desc], idx) => {
            const Ico = I[icon];
            return (
              <Reveal key={title} as="article" className="svc" delay={(idx % 3) * 60}>
                <span className="svc-icon"><Ico /></span>
                <div className="svc-body">
                  <h3>{title}</h3>
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
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cta primary">
              <I.Wpp style={{ width: 16, height: 16 }} /> Falar com Especialista
            </a>
            <a href="#contato" className="cta ghost">Solicitar proposta por e-mail <I.Arrow className="arrow" /></a>
            <span style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, letterSpacing: "0.04em" }}>
              Atendimento Seg–Sex · 09h–18h
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ----- Contact -----
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "Importação", msg: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Informe seu nome.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.msg.trim() || form.msg.trim().length < 10) e.msg = "Descreva sua necessidade (10+ caracteres).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nova solicitação VMI — ${form.topic}`,
          name: form.name.trim(),
          email: form.email.trim(),
          replyto: form.email.trim(),
          company: form.company.trim() || "Não informada",
          topic: form.topic,
          message: form.msg.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setSubmitError(data.message || "Não foi possível enviar. Tente novamente ou use o WhatsApp.");
      }
    } catch {
      setSubmitError("Erro de conexão. Tente novamente ou fale conosco pelo WhatsApp.");
    } finally {
      setSending(false);
    }
  };
  const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const resetForm = () => {
    setSent(false);
    setSubmitError("");
    setForm({ name: "", email: "", company: "", topic: "Importação", msg: "" });
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
            Conte um pouco sobre sua operação — retornamos em até 1 dia útil com uma
            análise inicial e os próximos passos.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cta primary contact-cta-top">
            Falar com Especialista <I.Arrow className="arrow" />
          </a>
        </Reveal>

        <div className="contact-grid">
          <Reveal as="div" className="contact-card">
            {sent ? (
              <div>
                <div className="success-msg">
                  <I.Shield style={{ width: 18, height: 18 }} />
                  Mensagem enviada. Nossa equipe entrará em contato em breve.
                </div>
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
                <div className="field-row">
                  <div className={`field ${errors.name ? "error" : ""}`}>
                    <label>Nome</label>
                    <input type="text" value={form.name} onChange={setF("name")} placeholder="Seu nome" />
                    <span className="err">{errors.name || ""}</span>
                  </div>
                  <div className={`field ${errors.email ? "error" : ""}`}>
                    <label>E-mail</label>
                    <input type="email" value={form.email} onChange={setF("email")} placeholder="voce@empresa.com" />
                    <span className="err">{errors.email || ""}</span>
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Empresa</label>
                    <input type="text" value={form.company} onChange={setF("company")} placeholder="Razão social" />
                  </div>
                  <div className="field">
                    <label>Tipo de operação</label>
                    <select value={form.topic} onChange={setF("topic")}>
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
                <div className={`field ${errors.msg ? "error" : ""}`}>
                  <label>Conte sobre sua necessidade</label>
                  <textarea value={form.msg} onChange={setF("msg")} placeholder="Volume estimado, origem, produto, prazos..." />
                  <span className="err">{errors.msg || ""}</span>
                </div>
                <div className="form-foot">
                  <span className="consent">Ao enviar você concorda em ser contatado pela equipe VMI.</span>
                  {submitError && <div className="form-error-msg">{submitError}</div>}
                  <button type="submit" className="cta primary" disabled={sending}>
                    {sending ? "Enviando..." : "Falar com Especialista"} {!sending && <I.Arrow className="arrow" />}
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          <div className="contact-side">
            <Reveal>
              <h3>Canais diretos</h3>
              <div className="contact-list">
                <a href={WHATSAPP} target="_blank" rel="noopener">
                  <span className="ico"><I.Phone /></span>
                  <span>
                    <span className="lbl">WhatsApp</span>
                    {PHONE}
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`}>
                  <span className="ico"><I.Mail /></span>
                  <span>
                    <span className="lbl">E-mail</span>
                    {EMAIL}
                  </span>
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  <span className="ico ico--social"><I.Linkedin /></span>
                  <span>
                    <span className="lbl">LinkedIn</span>
                    {LINKEDIN_HANDLE}
                  </span>
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                  <span className="ico ico--social"><I.Instagram /></span>
                  <span>
                    <span className="lbl">Instagram</span>
                    {INSTAGRAM_HANDLE}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Footer -----
const FOOTER_SERVICES = ["Importação", "Exportação", "Assessoria Aduaneira", "Logística Integrada"];

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
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><I.Wpp /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              {FOOTER_SERVICES.map((s) => (
                <li key={s}><a href="#servicos">{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Localização</h4>
            <p className="footer-location">{HQ_STREET}<br />{HQ_CITY}</p>
            <h4 className="footer-col__sub">Redes Sociais</h4>
            <ul>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VMI Assessoria Empresarial LTDA. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

// ----- App -----
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <SocialProof />
      <TrustStrip />
      <About />
      <Services />
      <HowItWorks />
      <Segments />
      <Why />
      <CtaBlock />
      <Contact />
      <Footer />
      <a className="wa-float" href={WHATSAPP} target="_blank" rel="noopener" aria-label="Fale conosco pelo WhatsApp">
        <I.Wpp />
        <span className="wa-label">Fale conosco</span>
      </a>
    </React.Fragment>
  );
}

window.VMIApp = App;
