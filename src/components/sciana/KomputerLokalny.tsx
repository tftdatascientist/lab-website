/**
 * Jedyny obraz w kierunku B: rysunek techniczny komputera lokalnego (dewiacja #3).
 * Docelowo zdjęcie własne urządzenia na `--paper` bez cienia. Kolory = tokeny, nie dekoracja.
 */
export default function KomputerLokalny() {
  return (
    <svg className="device" viewBox="0 0 320 150" role="img" aria-label="rysunek techniczny komputera lokalnego">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <rect x="20" y="30" width="200" height="90" />
        <rect x="20" y="30" width="200" height="14" fill="var(--plate)" />
        <line x1="20" y1="120" x2="220" y2="120" />
        <rect x="232" y="30" width="68" height="90" />
        <line x1="232" y1="52" x2="300" y2="52" />
        <line x1="232" y1="74" x2="300" y2="74" />
        <line x1="232" y1="96" x2="300" y2="96" />
        <circle cx="205" cy="105" r="4" fill="var(--accent)" stroke="none" />
        <line x1="20" y1="135" x2="220" y2="135" strokeDasharray="2 4" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-2)">
        <text x="30" y="40" fill="var(--bone)">
          MODEL JĘZYKOWY · NA MIEJSCU
        </text>
        <text x="238" y="47">ZASILANIE</text>
        <text x="238" y="69">SIEĆ LOKALNA</text>
        <text x="238" y="91">DYSK</text>
        <text x="20" y="146">DANE NIE OPUSZCZAJĄ FIRMY</text>
      </g>
    </svg>
  );
}
