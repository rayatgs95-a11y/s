/**
 * Stand-in artwork. The original site uses product photography, player photos,
 * club crests and sponsor marks; this clone replaces them with neutral,
 * generated art so the layout can be studied without reusing those assets.
 */
import { useId, type CSSProperties } from "react";

export type ShirtPattern = "plain" | "stripes" | "hoops" | "sash" | "halves" | "pinstripe" | "shoulders";

export interface ShirtArtProps {
  base: string;
  accent: string;
  trim?: string;
  pattern?: ShirtPattern;
  className?: string;
  style?: CSSProperties;
}

const SHIRT_PATH =
  "M70 18 L98 8 Q120 22 142 8 L170 18 L214 46 L196 92 L170 80 L170 222 Q120 230 70 222 L70 80 L44 92 L26 46 Z";

/** A generic football shirt silhouette rendered as SVG. */
export function ShirtArt({ base, accent, trim, pattern = "plain", className, style }: ShirtArtProps) {
  const uid = useId().replace(/:/g, "");
  const clip = `shirt-${uid}`;
  const t = trim ?? accent;
  return (
    <svg viewBox="0 0 240 240" className={className} style={style} aria-hidden>
      <defs>
        <clipPath id={clip}>
          <path d={SHIRT_PATH} />
        </clipPath>
        <linearGradient id={`${clip}-shade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="240" height="240" fill={base} />
        {pattern === "stripes" &&
          [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={52 + i * 28} y="0" width="14" height="240" fill={accent} />)}
        {pattern === "pinstripe" &&
          Array.from({ length: 16 }, (_, i) => <rect key={i} x={30 + i * 12} y="0" width="2" height="240" fill={accent} />)}
        {pattern === "hoops" &&
          [0, 1, 2, 3, 4].map((i) => <rect key={i} x="0" y={40 + i * 40} width="240" height="20" fill={accent} />)}
        {pattern === "sash" && <path d="M40 20 L90 0 L210 220 L160 240 Z" fill={accent} />}
        {pattern === "halves" && <rect x="120" y="0" width="120" height="240" fill={accent} />}
        {pattern === "shoulders" && (
          <>
            <rect x="0" y="0" width="240" height="40" fill={accent} />
            <rect x="0" y="40" width="70" height="60" fill={accent} />
            <rect x="170" y="40" width="70" height="60" fill={accent} />
          </>
        )}
        <rect width="240" height="240" fill={`url(#${clip}-shade)`} />
      </g>
      {/* collar + cuffs */}
      <path d="M98 8 Q120 22 142 8 L136 18 Q120 30 104 18 Z" fill={t} />
      <path d="M26 46 L44 92 L50 89 L33 44 Z" fill={t} opacity="0.9" />
      <path d="M214 46 L196 92 L190 89 L207 44 Z" fill={t} opacity="0.9" />
      {/* generic chest mark (no real crest) */}
      <circle cx="148" cy="62" r="9" fill="none" stroke={t} strokeWidth="2.5" opacity="0.85" />
      <path d={SHIRT_PATH} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1.5" />
    </svg>
  );
}

export interface PhotoArtProps {
  /** Two or three colours that set the mood of the "photo" */
  tones: [string, string, string?];
  /** Optional shirts to stage in the scene (simulates a lifestyle shot) */
  shirts?: Omit<ShirtArtProps, "className" | "style">[];
  className?: string;
  style?: CSSProperties;
  /** Grain overlay strength 0–1 */
  grain?: number;
}

/**
 * Abstract photographic stand-in: layered gradients, a soft vignette and
 * optional shirt silhouettes. Fills its parent (position it absolutely).
 */
export function PhotoArt({ tones, shirts = [], className, style, grain = 0.18 }: PhotoArtProps) {
  const [a, b, c = b] = tones;
  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `radial-gradient(120% 90% at 20% 15%, ${a} 0%, transparent 60%), radial-gradient(90% 80% at 85% 80%, ${c} 0%, transparent 65%), linear-gradient(160deg, ${a} 0%, ${b} 100%)`,
        ...style,
      }}
    >
      {shirts.length > 0 && (
        <div
          style={{
            position: "absolute",
            inset: "8% 4% 0",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "2%",
          }}
        >
          {shirts.map((s, i) => (
            <ShirtArt
              key={i}
              {...s}
              style={{
                width: `${Math.min(34, 92 / shirts.length)}%`,
                height: "auto",
                transform: `translateY(${(i % 2) * 6}%) rotate(${(i - (shirts.length - 1) / 2) * 2}deg)`,
                filter: "drop-shadow(0 18px 24px rgba(0,0,0,.35))",
              }}
            />
          ))}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: grain,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/** Placeholder wordmark replacing the original logo. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  const fg = inverted ? "#fff" : "#131313";
  return (
    <svg viewBox="0 0 120 40" className={className} role="img" aria-label="KITROOM">
      <rect x="0" y="6" width="28" height="28" rx="6" fill={fg} />
      <path d="M8 14 L14 11 Q14 15 20 11 L20 29 L8 29 Z" fill={inverted ? "#131313" : "#fff"} />
      <text x="34" y="27" fontFamily="var(--font-bebas), sans-serif" fontSize="22" letterSpacing="1" fill={fg}>
        KITROOM
      </text>
    </svg>
  );
}
