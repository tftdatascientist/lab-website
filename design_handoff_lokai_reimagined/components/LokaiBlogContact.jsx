// Blog preview — magazine layout, one featured post + 3 smaller.

const LOKAI_POSTS = [
  {
    date: '20 KWI 2026',
    tag: 'STARTUPY',
    title: 'MySite AI zebrał 9,25 mln zł pre-seed — 22-letni Polak buduje kolejnego jednorożca',
    excerpt: 'Rekordowa runda pre-seed w polskiej historii AI. Co stoi za MySite AI i dlaczego inwestorzy postawili na tak młody zespół?',
    color: 'amber',
    featured: true,
  },
  {
    date: '19 KWI',
    tag: 'BEZPIECZEŃSTWO',
    title: 'n8n webhooks exploitowane od października — co to znaczy dla Twojej automatyzacji',
    color: 'coral',
  },
  {
    date: '18 KWI',
    tag: 'PRAWO',
    title: 'AI Act — polska ustawa przyjęta przez Radę Ministrów. Checklist dla MŚP',
    color: 'sand',
  },
  {
    date: '17 KWI',
    tag: 'NARZĘDZIA',
    title: 'Claude Opus 4.7 ogólnie dostępny — wprowadzamy task bundle do produkcji',
    color: 'rust',
  },
];

function LokaiBlog() {
  const cMap = { sand: LOKAI.sand, rust: LOKAI.rust, amber: LOKAI.amber, coral: LOKAI.coral };
  const featured = LOKAI_POSTS[0];
  const rest = LOKAI_POSTS.slice(1);

  return (
    <section style={{ padding: '100px 32px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 28, height: 1, background: LOKAI.coral }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: LOKAI.coral }}>Blog · codzienny przegląd AI</span>
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, margin: 0 }}>
            Co się <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: LOKAI.coral }}>naprawdę</span> dzieje w&nbsp;AI w&nbsp;Polsce
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: LOKAI.amber, animation: 'lokai-pulse 2s ease-in-out infinite' }} />
          <span className="mono" style={{ fontSize: 11, color: LOKAI.textDim, letterSpacing: '0.1em' }}>AKTUALIZOWANE 4× DZIENNIE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        {/* Featured */}
        <a href="#" className="lokai-card" style={{ padding: 40, textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden', minHeight: 420, display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, background: `radial-gradient(circle, ${cMap[featured.color]}40, transparent 70%)`, filter: 'blur(50px)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span className="mono" style={{ fontSize: 10, color: cMap[featured.color], letterSpacing: '0.15em' }}>{featured.tag}</span>
            <span style={{ width: 3, height: 3, borderRadius: 2, background: LOKAI.textMute }} />
            <span className="mono" style={{ fontSize: 10, color: LOKAI.textMute, letterSpacing: '0.1em' }}>{featured.date}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <h3 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0, position: 'relative' }}>
              {featured.title}
            </h3>
          </div>
          <p style={{ fontSize: 15, color: LOKAI.textDim, lineHeight: 1.55, margin: '20px 0 24px', maxWidth: 560, position: 'relative' }}>{featured.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: cMap[featured.color], fontSize: 13, fontWeight: 600, position: 'relative' }}>
            Czytaj dalej <span>→</span>
          </div>
        </a>

        {/* Rest */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rest.map((p, i) => (
            <a key={i} href="#" className="lokai-card" style={{ padding: 24, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mono" style={{ fontSize: 10, color: cMap[p.color], letterSpacing: '0.15em' }}>{p.tag}</span>
                <span style={{ width: 3, height: 3, borderRadius: 2, background: LOKAI.textMute }} />
                <span className="mono" style={{ fontSize: 10, color: LOKAI.textMute }}>{p.date}</span>
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.3, margin: 0 }}>{p.title}</h4>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact section ─────────────────────────────────────────────────────────
function LokaiContact() {
  return (
    <section style={{ padding: '100px 32px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 24, overflow: 'hidden', outline: `1px solid ${LOKAI.border}`, position: 'relative' }}>
        {/* Left side - warm accent */}
        <div style={{ padding: '56px 48px', background: `radial-gradient(circle at 20% 0%, ${LOKAI.amberDeep}30, transparent 60%), ${LOKAI.surface}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 240, height: 240, background: `radial-gradient(circle, ${LOKAI.amber}20, transparent 70%)`, filter: 'blur(40px)', animation: 'lokai-orb-float 10s ease-in-out infinite' }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 999, background: 'rgba(252,211,77,0.08)', outline: `1px solid rgba(252,211,77,0.2)`, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: LOKAI.amber, animation: 'lokai-pulse 1.8s ease-in-out infinite' }} />
            <span className="mono" style={{ fontSize: 10, color: LOKAI.amber, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Bezpłatna konsultacja</span>
          </div>

          <h3 style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 20px', maxWidth: 440 }}>
            30 minut, które mogą <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: LOKAI.amber }}>zmienić</span> sposób pracy Twojej firmy
          </h3>

          <ul style={{ margin: '0 0 32px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Audyt procesów — pokazujemy co można zautomatyzować',
              'Szybkie wygrane — gdzie zysk jest natychmiastowy',
              'Szacunek kosztów i oszczędności',
              'Konkretny plan na kolejny krok',
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: LOKAI.textDim, lineHeight: 1.5 }}>
                <span style={{ color: LOKAI.amber, fontWeight: 700, flexShrink: 0 }}>✓</span>
                {t}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: LOKAI.textMute }}>
            <span className="mono">kontakt@lok-ai.pl</span>
            <span>·</span>
            <span className="mono">+48 ___ ___ ___</span>
          </div>
        </div>

        {/* Right side - form */}
        <div style={{ padding: '56px 48px', background: LOKAI.bgSoft, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: LOKAI.textDim, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Imię i firma</label>
            <input placeholder="Anna Kowalska, Kowalscy sp. z o.o." style={{ width: '100%', background: LOKAI.surface, border: 'none', outline: `1px solid ${LOKAI.border}`, borderRadius: 10, padding: '12px 14px', color: LOKAI.text, fontSize: 14, fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: LOKAI.textDim, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email</label>
            <input placeholder="anna@kowalscy.pl" style={{ width: '100%', background: LOKAI.surface, border: 'none', outline: `1px solid ${LOKAI.border}`, borderRadius: 10, padding: '12px 14px', color: LOKAI.text, fontSize: 14, fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: LOKAI.textDim, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontFeatureSettings: "'zero' 0", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Co chcesz zautomatyzować?</label>
            <textarea rows={4} placeholder="Np. umawianie wizyt, obsługa reklamacji, wystawianie faktur…" style={{ width: '100%', background: LOKAI.surface, border: 'none', outline: `1px solid ${LOKAI.border}`, borderRadius: 10, padding: '12px 14px', color: LOKAI.text, fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }} />
          </div>
          <button className="lokai-btn-primary" style={{ marginTop: 8, padding: '14px 22px', borderRadius: 12, fontSize: 15, border: 'none', cursor: 'pointer' }}>
            Umów konsultację →
          </button>
          <p style={{ fontSize: 11, color: LOKAI.textMute, margin: 0 }}>Odpowiadamy w&nbsp;ciągu 24&nbsp;godzin. Bez&nbsp;zobowiązań, bez&nbsp;sprzedawania.</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LokaiBlog, LokaiContact });
