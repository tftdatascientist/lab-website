interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

export default function Logo({ size = 34, showTagline = true }: LogoProps) {
  const scale = size / 40;
  return (
    <div className="flex items-center gap-[11px]">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        style={{ display: "block", filter: "drop-shadow(0 2px 6px rgba(245,184,69,0.28))" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lokai-logo-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f5b845" />
            <stop offset="1" stopColor="#ef7955" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#lokai-logo-fill)" />
        <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="-0.04em"
          fill="#1a0f00"
        >
          LOK
        </text>
        <circle cx="30" cy="10" r="4" fill="none" stroke="#1a0f00" strokeWidth="1" strokeOpacity="0.45" />
        <circle cx="30" cy="10" r="2.4" fill="#1a0f00" />
        <circle cx="30" cy="10" r="1.1" fill="#f5b845" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-bold whitespace-nowrap text-text"
          style={{ fontSize: 17 * scale + "px", letterSpacing: "-0.035em" }}
        >
          lok<span className="text-amber">·</span>ai
        </span>
        {showTagline && (
          <span
            className="font-mono uppercase text-text-mute"
            style={{ fontSize: 9 * scale + "px", letterSpacing: "0.22em", marginTop: 4 }}
          >
            AI lokalnie
          </span>
        )}
      </div>
    </div>
  );
}
