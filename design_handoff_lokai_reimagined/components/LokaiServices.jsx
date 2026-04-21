// Services grid — animated cards with colored glows, hover reveals.

const LOKAI_SERVICES = [
  {
    tag: 'AUTOMATYZACJA',
    title: 'Workflow n8n',
    desc: 'Łączymy CRM, email, faktury i formularze w jeden rytm. 400+ integracji.',
    icon: '⚙',
    color: 'sand',
    metric: { v: '47', l: 'aktywnych workflow' },
  },
  {
    tag: 'CHATBOTY',
    title: 'Asystenci AI na www',
    desc: 'Odpowiadają 24/7, kwalifikują leady, rezerwują terminy.',
    icon: '◎',
    color: 'amber',
    metric: { v: '12ms', l: 'średni czas odpowiedzi' },
  },
  {
    tag: 'AGENCI GŁOSOWI',
    title: 'Voiceboty telefoniczne',
    desc: 'Naturalny polski głos (ElevenLabs). Umawiają wizyty, potwierdzają zamówienia.',
    icon: '◐',
    color: 'rust',
    metric: { v: '24/7', l: 'pełna obsługa' },
  },
  {
    tag: 'RAG',
    title: 'Bazy wiedzy firmy',
    desc: 'AI odpowiada na dokumentach Twojej organizacji, nie na wymyśleniach.',
    icon: '▲',
    color: 'coral',
    metric: { v: '98%', l: 'trafność odpowiedzi' },
  },
  {
    tag: 'DASHBOARDY',
    title: 'Raporty na żywo',
    desc: 'KPI z rozproszonych źródeł spięte w jeden widok.',
    icon: '▦',
    color: 'amber',
    metric: { v: '5min', l: 'częstotliwość odświeżania' },
  },
  {
    tag: 'INTEGRACJE',
    title: 'CRM · ERP · e-commerce',
    desc: 'REST, Webhook, OAuth — łączymy dowolne systemy.',
    icon: '⬡',
    color: 'sand',
    metric: { v: '400+', l: 'gotowych konektorów' },
  },
];

function LokaiServices() {
  const colorMap = { sand: LOKAI.sand, amber: LOKAI.amber, coral: LOKAI.coral, rust: LOKAI.rust };

  return (
    <section style={{ position: 'relative', padding: '100px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 28, height: 1, background: LOKAI.amber }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: LOKAI.amber }}>Co automatyzujemy</span>
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, maxWidth: 680 }}>
            Sześć kierunków, <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, color: LOKAI.amber }}>jeden cel</span>: odzyskać&nbsp;czas.
          </h2>
        </div>
        <a href="#" className="lokai-link mono" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Pełna oferta →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {LOKAI_SERVICES.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <a key={i} href="#" className="lokai-card" style={{ display: 'block', padding: 28, textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden', minHeight: 260 }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: `radial-gradient(circle, ${c}30, transparent 70%)`, filter: 'blur(30px)', transition: 'opacity .3s', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, top: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c}, transparent)`, opacity: 0.6 }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: c }}>{s.tag}</div>
                <div style={{ fontSize: 22, color: c, opacity: 0.7 }}>{s.icon}</div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: LOKAI.textDim, lineHeight: 1.55, margin: 0, marginBottom: 28 }}>{s.desc}</p>
              <div style={{ position: 'absolute', bottom: 20, left: 28, right: 28, paddingTop: 14, borderTop: `1px solid ${LOKAI.border}`, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span className="num" style={{ fontSize: 22, fontWeight: 700, color: c }}>{s.metric.v}</span>
                <span style={{ fontSize: 11, color: LOKAI.textMute }}>{s.metric.l}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, { LokaiServices });
