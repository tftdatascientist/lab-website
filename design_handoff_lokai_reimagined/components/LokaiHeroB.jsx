// Hero B — minimal editorial. Huge typography, no chatbot on right, just
// a quiet animated "process" diagram.

function LokaiHeroB() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBottom: 60 }}>
      <LokaiAurora intensity={0.6} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '100px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: LOKAI.amber }} />
          <span className="mono" style={{ fontSize: 11, color: LOKAI.amber, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Studio automatyzacji AI · Bydgoszcz · Toruń
          </span>
        </div>

        <h1 style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.045em', margin: '0 0 24px', maxWidth: 1100 }}>
          Mniej klikania.<br />
          <span className="serif" style={{ fontSize: 112 }}>
            Więcej <span className="lokai-shimmer-text">robienia</span>.
          </span>
        </h1>

        <p style={{ fontSize: 20, color: LOKAI.textDim, maxWidth: 620, lineHeight: 1.55, margin: '0 0 48px' }}>
          Budujemy agentów AI i&nbsp;workflow, które robią za&nbsp;Twój zespół wszystko co nudne — żeby&nbsp;zostało czas na&nbsp;to, co ważne.
        </p>

        <div style={{ display: 'flex', gap: 14, marginBottom: 72 }}>
          <a href="#" className="lokai-btn-primary" style={{ padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 15 }}>
            Umów 30&nbsp;min konsultację →
          </a>
          <a href="#" className="lokai-btn-ghost" style={{ padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 15 }}>
            Jak pracujemy
          </a>
        </div>

        {/* Process strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { step: '01', label: 'Audyt procesów',  hint: '30 min, zdalnie', c: LOKAI.sand },
            { step: '02', label: 'Mapa automatyzacji', hint: 'w 3 dni', c: LOKAI.amber },
            { step: '03', label: 'Wdrożenie + nauka', hint: '48h – 2 tyg.', c: LOKAI.coral },
            { step: '04', label: 'Opieka i&nbsp;rozwój', hint: 'miesięcznie', c: LOKAI.rust },
          ].map((p, i) => (
            <div key={i} style={{ padding: 20, background: LOKAI.surface, borderRadius: 14, outline: `1px solid ${LOKAI.border}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: p.c, opacity: 0.6 }} />
              <div className="mono" style={{ fontSize: 11, color: p.c, marginBottom: 8 }}>{p.step}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }} dangerouslySetInnerHTML={{__html: p.label}} />
              <div style={{ fontSize: 12, color: LOKAI.textMute }}>{p.hint}</div>
            </div>
          ))}
        </div>
      </div>

      <LokaiTicker items={[
        { label: 'Zaoszczędzonych godzin', value: '1 284 / miesiąc', color: LOKAI.amber },
        { label: 'Aktywnych workflow',     value: '47',             color: LOKAI.sand },
        { label: 'Średnie ROI',            value: '312%',           color: LOKAI.coral },
        { label: 'Klienci lokalni',        value: '23 firmy',       color: LOKAI.rust },
      ]} />
    </section>
  );
}

Object.assign(window, { LokaiHeroB });
