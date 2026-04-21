// Hero — primary reimagined version.
// Big editorial headline with Instrument Serif italic accent, live chatbot
// demo on the right, ticker under the fold, subtle aurora background.

function LokaiHeroA() {
  const stats = [
    { v: 400, suffix: '+', label: 'integracji API',       color: LOKAI.sand },
    { v: 24,  suffix: '/7', label: 'chatbot AI',           color: LOKAI.amber },
    { v: 48,  prefix: '<', suffix: 'h', label: 'wdrożenie', color: LOKAI.coral },
    { v: 0,   suffix: ' zł', label: 'konsultacja',         color: LOKAI.rust },
  ];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBottom: 80 }}>
      <LokaiAurora />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '80px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            {/* Animated badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: 'rgba(252,211,77,0.08)', outline: `1px solid rgba(252,211,77,0.2)`, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: LOKAI.amber, animation: 'lokai-pulse 1.8s ease-in-out infinite' }} />
              <span className="mono" style={{ fontSize: 11, color: LOKAI.amber, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Nowa era · kwiecień 2026</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 28px' }}>
              Twoja firma.<br />
              <span className="serif" style={{ color: LOKAI.amber, fontSize: 84 }}>Mądrzejsza</span>{' '}
              <span style={{ display: 'inline-block', position: 'relative' }}>
                o AI.
                <svg style={{ position: 'absolute', left: '-4%', bottom: '-12%', width: '108%', height: 22 }} viewBox="0 0 200 22" preserveAspectRatio="none" fill="none">
                  <path d="M2 12 Q 40 2, 100 10 T 198 8" stroke={LOKAI.coral} strokeWidth="3" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400" style={{ animation: 'lokai-draw 1.8s ease-out .4s forwards' }} />
                </svg>
              </span>
            </h1>

            <p style={{ fontSize: 19, color: LOKAI.textDim, maxWidth: 560, lineHeight: 1.6, margin: '0 0 36px' }}>
              Wdrażamy chatboty, agentów głosowych i&nbsp;integracje procesów dla małych i&nbsp;średnich firm z&nbsp;regionu kujawsko-pomorskiego. Bez kodu, bez&nbsp;teorii — w&nbsp;48&nbsp;godzin.
            </p>

            <div style={{ display: 'flex', gap: 14, marginBottom: 44 }}>
              <a href="#" className="lokai-btn-primary" style={{ padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Przetestuj chatbota AI
                <span>→</span>
              </a>
              <a href="#" className="lokai-btn-ghost" style={{ padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 15 }}>
                Zobacz realizacje
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${LOKAI.border}`, borderBottom: `1px solid ${LOKAI.border}` }}>
              {stats.map((s, i) => (
                <div key={i} style={{ padding: '20px 16px 20px 0', borderRight: i < 3 ? `1px solid ${LOKAI.border}` : 'none', paddingLeft: i === 0 ? 0 : 20 }}>
                  <div className="num" style={{ fontSize: 36, fontWeight: 700, color: s.color }}>
                    <LokaiCounter to={s.v} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                  </div>
                  <div style={{ fontSize: 12, color: LOKAI.textDim, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: chatbot + floating accent */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: `radial-gradient(circle, ${LOKAI.rust}55, transparent 70%)`, filter: 'blur(40px)', animation: 'lokai-orb-float 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, background: `radial-gradient(circle, ${LOKAI.amber}40, transparent 70%)`, filter: 'blur(40px)', animation: 'lokai-orb-float 10s ease-in-out -3s infinite reverse' }} />
            <LokaiChatDemo />

            {/* Floating tag */}
            <div style={{ position: 'absolute', top: 32, left: -28, background: LOKAI.bg, outline: `1px solid ${LOKAI.border}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, color: LOKAI.amber, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", transform: 'rotate(-4deg)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)' }}>
              ★ Realizuje się teraz
            </div>
          </div>
        </div>
      </div>

      {/* Ticker under fold */}
      <LokaiTicker items={[
        { label: 'Bielik v3',    value: 'polski LLM wdrożony',   color: LOKAI.sand },
        { label: 'AI Act',       value: 'zgodność od 02.08',     color: LOKAI.amber },
        { label: 'n8n workflows', value: '2 148 uruchomień / 24h', color: LOKAI.coral },
        { label: 'PARP FENG',    value: 'nabór do 29.04',        color: LOKAI.rust },
        { label: 'Czas odpowiedzi', value: '12ms ±3',             color: LOKAI.sand },
        { label: 'Piast AI',     value: 'Poznań · pierwsza fabryka AI', color: LOKAI.amber },
      ]} />
    </section>
  );
}

// inject one extra keyframe for the drawn underline
if (typeof document !== 'undefined' && !document.getElementById('lokai-hero-a')) {
  const s = document.createElement('style');
  s.id = 'lokai-hero-a';
  s.textContent = `@keyframes lokai-draw { to { stroke-dashoffset: 0; } }`;
  document.head.appendChild(s);
}

Object.assign(window, { LokaiHeroA });
