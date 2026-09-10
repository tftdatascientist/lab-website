/**
 * Znak lok-ai: koło zębate z rdzeniem (zachowany charakter z briefu). Obrys proceduralny,
 * kolor przez `currentColor`, wolny obrót 16 s (kontrakt: animowane logo tylko jako mały
 * znak w szynie albo na /o-nas); `prefers-reduced-motion` zatrzymuje go w globals.css.
 */
function cogPath(cx: number, cy: number, teeth: number, rp: number) {
  const m = rp / (teeth / 2);
  const rOut = rp + m * 0.62;
  const rRoot = rp - m * 0.8;
  const P = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const b = i * step;
    d += `${i === 0 ? "M" : "L"}${P(rRoot, b)} L${P(rOut, b + step * 0.22)} L${P(rOut, b + step * 0.4)} L${P(rRoot, b + step * 0.6)} `;
  }
  return d + "Z";
}

const COG = cogPath(18, 18, 9, 12);

export default function Znak({ size = 32, spin = true }: { size?: number; spin?: boolean }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d={COG} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" className={spin ? "znak-spin" : undefined} />
      <circle cx={18} cy={18} r={4.5} stroke="currentColor" strokeWidth={2} />
      <circle cx={18} cy={18} r={2} fill="currentColor" />
    </svg>
  );
}
