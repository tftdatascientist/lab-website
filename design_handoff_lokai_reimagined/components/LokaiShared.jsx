// Shared bits for the lok-ai reimagined designs.
// Dark-mode aesthetic kept, but with more life: warm amber accent joining the
// violet+mint palette, animated aurora + grid background, live tickers,
// and richer typography mixing Inter with an Instrument Serif display.

// ── Design tokens ───────────────────────────────────────────────────────────
// Warm, harmonised palette — amber/coral/sand/rust family.
// No cyan/magenta; everything sits in the yellow→orange→red→brown arc
// so accents never clash. Violet/mint keys are aliased to warm tones
// so existing component references still render in-palette.
const LOKAI = {
  bg: '#0b0c0e',
  bgSoft: '#121315',
  surface: '#17181b',
  surfaceHi: '#1f2125',
  surfaceHiHi: '#2a2d32',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#ede7dc',
  textDim: '#a8a29e',
  textMute: '#78716c',
  // Primary warm accents
  amber:     '#f5b845',  // primary — warm yellow-gold
  amberDeep: '#c48a1c',
  coral:     '#ef7955',  // secondary — terracotta orange
  coralDeep: '#b84a2a',
  sand:      '#d9b88a',  // neutral warm — replaces mint
  rust:      '#b8542f',  // deep warm — replaces violet
  // Back-compat aliases so old references stay in palette
  violet:     '#d9b88a', // aliased to sand
  violetDeep: '#b8542f', // aliased to rust
  mint:       '#d9b88a', // aliased to sand
  mintDeep:   '#8a6a3c', // aliased to dark sand/brass
};

// ── Fonts + base CSS ────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('lokai-base')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;600&family=Chakra+Petch:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.id = 'lokai-base';
  s.textContent = `
    .lokai * { box-sizing: border-box; }
    .lokai { font-family: 'Inter', system-ui, sans-serif; color: ${LOKAI.text}; background: ${LOKAI.bg}; -webkit-font-smoothing: antialiased; line-height: 1.5; font-feature-settings: 'zero' 0, 'ss01' 0; }
    .lokai .serif { font-family: 'Chakra Petch', 'Inter', system-ui, sans-serif; font-weight: 500; font-style: italic; letter-spacing: -0.01em; text-transform: none; }
    /* IBM Plex Mono has a round open zero (not slashed) and friendly digit shapes */
    .lokai .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-feature-settings: 'zero' 0, 'ss01' 0; font-variant-numeric: tabular-nums; }
    /* Display numbers: Inter-based, not monospace, proportional + tabular so they line up vertically without looking like code */
    .lokai .num { font-family: 'Inter', system-ui, sans-serif; font-variant-numeric: tabular-nums; font-feature-settings: 'zero' 0, 'ss01' 0, 'cv11' 1; letter-spacing: -0.025em; }

    /* Animations */
    @keyframes lokai-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
    @keyframes lokai-aurora {
      0%   { transform: translate(-10%, -10%) rotate(0deg)   scale(1); }
      33%  { transform: translate(15%,  -5%) rotate(120deg)  scale(1.2); }
      66%  { transform: translate(-5%,  10%) rotate(240deg)  scale(0.9); }
      100% { transform: translate(-10%, -10%) rotate(360deg) scale(1); }
    }
    @keyframes lokai-grid-drift {
      0% { background-position: 0 0; }
      100% { background-position: 80px 80px; }
    }
    @keyframes lokai-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
    @keyframes lokai-ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes lokai-fadeup {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes lokai-countup { from { opacity: 0.4; } to { opacity: 1; } }
    @keyframes lokai-orb-float {
      0%,100% { transform: translate(0,0); }
      50%     { transform: translate(20px,-20px); }
    }
    @keyframes lokai-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .lokai-grid-bg {
      background-image:
        linear-gradient(${LOKAI.border} 1px, transparent 1px),
        linear-gradient(90deg, ${LOKAI.border} 1px, transparent 1px);
      background-size: 80px 80px;
      animation: lokai-grid-drift 60s linear infinite;
    }
    .lokai-ghost { outline: 1px solid ${LOKAI.border}; }
    .lokai-ghost-strong { outline: 1px solid ${LOKAI.borderStrong}; }

    .lokai-btn-primary {
      background: linear-gradient(135deg, ${LOKAI.amber} 0%, ${LOKAI.coral} 100%);
      color: #1a0f00; font-weight: 700;
      transition: transform .15s ease, box-shadow .2s ease;
    }
    .lokai-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 40px -10px ${LOKAI.amber}, 0 0 0 1px rgba(252,211,77,0.3); }

    .lokai-btn-ghost {
      background: rgba(255,255,255,0.04); color: ${LOKAI.text};
      outline: 1px solid ${LOKAI.borderStrong};
      transition: background .15s ease, border-color .15s ease;
    }
    .lokai-btn-ghost:hover { background: rgba(255,255,255,0.08); outline-color: ${LOKAI.violet}; }

    .lokai-glow-violet { box-shadow: 0 0 60px -20px ${LOKAI.violet}, inset 0 1px 0 rgba(255,255,255,.05); }
    .lokai-glow-mint   { box-shadow: 0 0 60px -20px ${LOKAI.mint},   inset 0 1px 0 rgba(255,255,255,.05); }
    .lokai-glow-amber  { box-shadow: 0 0 60px -20px ${LOKAI.amber},  inset 0 1px 0 rgba(255,255,255,.05); }

    .lokai-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 999px; font-size: 11px;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase;
      background: rgba(255,255,255,0.04); outline: 1px solid ${LOKAI.border};
    }

    .lokai-card {
      background: ${LOKAI.surface};
      border-radius: 16px;
      outline: 1px solid ${LOKAI.border};
      transition: transform .2s ease, outline-color .2s ease, background .2s ease;
    }
    .lokai-card:hover { transform: translateY(-3px); outline-color: rgba(196,167,255,0.4); background: ${LOKAI.surfaceHi}; }

    .lokai-link { color: ${LOKAI.textDim}; transition: color .15s; }
    .lokai-link:hover { color: ${LOKAI.text}; }

    .lokai-shimmer-text {
      background: linear-gradient(90deg, ${LOKAI.text} 40%, ${LOKAI.violet} 50%, ${LOKAI.text} 60%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: lokai-shimmer 3.5s linear infinite;
    }
  `;
  document.head.appendChild(s);
}

// ── Aurora background ───────────────────────────────────────────────────────
function LokaiAurora({ intensity = 1 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div className="lokai-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 * intensity, maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />
      <div style={{ position: 'absolute', top: '-20%', left: '10%', width: 700, height: 700, background: `radial-gradient(circle, ${LOKAI.rust}55, transparent 60%)`, filter: 'blur(60px)', animation: 'lokai-aurora 28s ease-in-out infinite', opacity: 0.7 * intensity }} />
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 500, height: 500, background: `radial-gradient(circle, ${LOKAI.amberDeep}40, transparent 60%)`, filter: 'blur(60px)', animation: 'lokai-aurora 34s ease-in-out -8s infinite reverse', opacity: 0.55 * intensity }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: 600, height: 600, background: `radial-gradient(circle, ${LOKAI.coralDeep}40, transparent 60%)`, filter: 'blur(80px)', animation: 'lokai-aurora 40s ease-in-out -16s infinite', opacity: 0.5 * intensity }} />
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function LokaiNav({ compact = false }) {
  const links = ['Usługi', 'Technologia', 'Blog', 'Portfolio', 'FAQ'];
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,12,14,0.7)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${LOKAI.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LokaiLogo />
          {!compact && <span style={{ fontSize: 12, color: LOKAI.textDim, fontWeight: 500 }}>Automatyzacja biznesu</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map((l) => (
            <a key={l} href="#" className="lokai-link" style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <a href="#" className="lokai-btn-primary" style={{ fontSize: 13, padding: '9px 16px', borderRadius: 10, textDecoration: 'none' }}>
          Bezpłatna konsultacja
        </a>
      </div>
    </nav>
  );
}

// Proper mark: a rounded tile carrying the "LOK" monogram with the AI
// node sitting on the top-right as a satellite dot — reads as
// "LOK" (lokalnie) orbited by AI. Clear, legible, not a single
// letter with a dot.
function LokaiLogo({ size = 34 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ display: 'block', filter: 'drop-shadow(0 2px 6px rgba(245,184,69,0.28))' }}>
        <defs>
          <linearGradient id="lokai-logo-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={LOKAI.amber} />
            <stop offset="1" stopColor={LOKAI.coral} />
          </linearGradient>
        </defs>
        {/* Tile */}
        <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#lokai-logo-fill)" />
        <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        {/* LOK monogram — compact, bold, dark burn on warm tile */}
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="-0.04em"
          fill="#1a0f00"
        >LOK</text>
        {/* AI satellite: orbit ring + filled dot in the top-right corner */}
        <circle cx="30" cy="10" r="4" fill="none" stroke="#1a0f00" strokeWidth="1" strokeOpacity="0.45" />
        <circle cx="30" cy="10" r="2.4" fill="#1a0f00" />
        <circle cx="30" cy="10" r="1.1" fill={LOKAI.amber} />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.035em', whiteSpace: 'nowrap', color: LOKAI.text }}>lok<span style={{ color: LOKAI.amber }}>·</span>ai</span>
        <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", letterSpacing: '0.22em', textTransform: 'uppercase', color: LOKAI.textMute, marginTop: 4 }}>AI lokalnie</span>
      </div>
    </div>
  );
}

// ── Live ticker (scrolling news/stats bar) ──────────────────────────────────
function LokaiTicker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ borderTop: `1px solid ${LOKAI.border}`, borderBottom: `1px solid ${LOKAI.border}`, overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', gap: 48, padding: '10px 0', whiteSpace: 'nowrap', animation: 'lokai-ticker 40s linear infinite', width: 'max-content' }}>
        {doubled.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: "'Inter', system-ui, sans-serif", fontVariantNumeric: 'tabular-nums', fontFeatureSettings: "'zero' 0, 'ss01' 0", color: LOKAI.textDim, letterSpacing: '-0.005em' }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: it.color || LOKAI.amber }} />
            <span style={{ color: LOKAI.text, fontWeight: 500 }}>{it.label}</span>
            <span style={{ color: it.color || LOKAI.amber, fontWeight: 600 }}>{it.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Animated counter ────────────────────────────────────────────────────────
function LokaiCounter({ to, suffix = '', prefix = '', duration = 1800, decimals = 0 }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span style={{ fontVariantNumeric: 'tabular-nums', fontFeatureSettings: "'zero' 0", fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: '-0.025em' }}>{prefix}{v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{suffix}</span>;
}

// ── Typing animation ────────────────────────────────────────────────────────
function LokaiTyping({ text, speed = 40, startDelay = 200 }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        setI((prev) => {
          if (prev >= text.length) { clearInterval(id); return prev; }
          return prev + 1;
        });
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(t0);
  }, [text, speed, startDelay]);
  return (
    <span>
      {text.slice(0, i)}
      <span style={{ borderRight: `2px solid ${LOKAI.amber}`, marginLeft: 2, animation: 'lokai-blink 1s steps(1) infinite' }}>&nbsp;</span>
    </span>
  );
}

// ── Mini chatbot demo ───────────────────────────────────────────────────────
function LokaiChatDemo() {
  const messages = [
    { role: 'user', text: 'Chciałbym umówić wizytę na przegląd.' },
    { role: 'bot', text: 'Oczywiście! Mam wolne terminy w środę 14:00 i piątek 10:30. Który Panu pasuje?' },
    { role: 'user', text: 'Piątek 10:30.' },
    { role: 'bot', text: 'Zarezerwowane. Potwierdzenie SMS wysłane na Pani numer. ✓' },
  ];
  const [visible, setVisible] = React.useState(0);
  React.useEffect(() => {
    if (visible >= messages.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 400 : 1400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div style={{ background: LOKAI.surface, borderRadius: 18, outline: `1px solid ${LOKAI.border}`, overflow: 'hidden', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LOKAI.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: LOKAI.mint, animation: 'lokai-pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", color: LOKAI.textDim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Asystent · online</span>
        </div>
        <span style={{ fontSize: 11, color: LOKAI.textMute, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0" }}>~12ms</span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 280 }}>
        {messages.slice(0, visible).map((m, idx) => (
          <div key={idx} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', animation: 'lokai-fadeup .4s ease' }}>
            <div style={{
              padding: '10px 14px', borderRadius: 14, fontSize: 13.5, lineHeight: 1.45,
              background: m.role === 'user' ? `linear-gradient(135deg, ${LOKAI.amber}, ${LOKAI.coral})` : LOKAI.surfaceHi,
              color: m.role === 'user' ? '#1a0f00' : LOKAI.text,
              fontWeight: m.role === 'user' ? 600 : 400,
              borderTopRightRadius: m.role === 'user' ? 4 : 14,
              borderTopLeftRadius: m.role === 'user' ? 14 : 4,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {visible < messages.length && (
          <div style={{ alignSelf: messages[visible].role === 'user' ? 'flex-end' : 'flex-start', padding: '10px 14px', borderRadius: 14, background: LOKAI.surfaceHi, display: 'flex', gap: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: LOKAI.textMute, animation: `lokai-pulse 1.2s ease-in-out ${i*0.15}s infinite` }} />
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: 12, borderTop: `1px solid ${LOKAI.border}`, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input readOnly value="Napisz wiadomość…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: LOKAI.textMute, fontSize: 13, fontFamily: 'inherit' }} />
        <button style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${LOKAI.amber}, ${LOKAI.coral})`, border: 'none', cursor: 'pointer', color: '#1a0f00' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ margin: 'auto', display: 'block' }}><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function LokaiFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${LOKAI.border}`, background: LOKAI.bg, position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <LokaiLogo />
            <p style={{ color: LOKAI.textDim, fontSize: 14, marginTop: 16, maxWidth: 300, lineHeight: 1.6 }}>
              Projektujemy i wdrażamy automatyzacje oraz agentów AI dla MŚP z regionu kujawsko-pomorskiego.
            </p>
          </div>
          {[
            { title: 'Produkt', items: ['Usługi', 'Portfolio', 'Cennik', 'FAQ'] },
            { title: 'Zasoby', items: ['Blog', 'Technologia', 'Dziennik', 'Kontakt'] },
            { title: 'Firma', items: ['O nas', 'Polityka prywatności', 'Regulamin'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: LOKAI.amber, marginBottom: 14 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(i => (
                  <a key={i} href="#" className="lokai-link" style={{ fontSize: 13, textDecoration: 'none' }}>{i}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: `1px solid ${LOKAI.border}` }}>
          <span className="mono" style={{ fontSize: 11, color: LOKAI.textMute }}>© 2026 lok-ai · Kujawsko-pomorskie</span>
          <span className="lokai-chip" style={{ color: LOKAI.mint }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: LOKAI.mint, animation: 'lokai-pulse 2s ease-in-out infinite' }} />
            Wszystkie systemy działają
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LOKAI, LokaiAurora, LokaiNav, LokaiLogo, LokaiTicker, LokaiCounter, LokaiTyping, LokaiChatDemo, LokaiFooter });
