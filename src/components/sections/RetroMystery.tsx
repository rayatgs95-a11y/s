import { PhotoArt, ShirtArt, type ShirtPattern } from "@/components/art";
import { ArrowRightIcon, ExternalIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./RetroMystery.module.css";

interface WallShirt {
  base: string;
  accent: string;
  pattern?: ShirtPattern;
  num: string;
  /** Use dark numerals on light shirts */
  dark?: boolean;
}

/** A wall of framed vintage shirts (generic colourways, invented numbers). */
const WALL: WallShirt[] = [
  { base: "#c8202a", accent: "#ffffff", num: "9" },
  { base: "#d42a2a", accent: "#ffffff", num: "7" },
  { base: "#f1f1ee", accent: "#1d2f6b", num: "19", dark: true },
  { base: "#b5121b", accent: "#111111", pattern: "stripes", num: "32" },
  { base: "#d81f26", accent: "#ffffff", num: "20" },
  { base: "#e9e9e6", accent: "#0b0b0b", pattern: "stripes", num: "10" },
  { base: "#a3161e", accent: "#e8c45a", num: "14" },
  { base: "#f3f3f0", accent: "#c8202a", num: "8", dark: true },
  { base: "#2453a8", accent: "#ffffff", pattern: "pinstripe", num: "18" },
  { base: "#efefec", accent: "#0b0b0b", pattern: "stripes", num: "10" },
  { base: "#e8752a", accent: "#ffffff", num: "4" },
  { base: "#c8202a", accent: "#ffffff", num: "11" },
  { base: "#4a2a7a", accent: "#ffffff", num: "9" },
  { base: "#c51d27", accent: "#ffffff", num: "7" },
  { base: "#a9d4f0", accent: "#ffffff", pattern: "stripes", num: "19", dark: true },
  { base: "#1f3f8f", accent: "#c8202a", pattern: "stripes", num: "10" },
  { base: "#f1f1ee", accent: "#1d2f6b", num: "6", dark: true },
  { base: "#14301f", accent: "#e0b84a", num: "3" },
  { base: "#1c1c1c", accent: "#e0c040", pattern: "stripes", num: "10" },
  { base: "#f1f1ee", accent: "#1b1b1b", num: "7", dark: true },
  { base: "#1f4fb0", accent: "#f5d23a", num: "10" },
  { base: "#f1f1ee", accent: "#b8202a", num: "6", dark: true },
  { base: "#0f6a3a", accent: "#ffffff", pattern: "hoops", num: "23" },
  { base: "#bf1e2d", accent: "#ffffff", pattern: "shoulders", num: "5" },
];

function ShirtWall() {
  return (
    <div className={styles.wall}>
      {WALL.map((s, i) => (
        <div key={i} className={styles.frame}>
          <ShirtArt base={s.base} accent={s.accent} pattern={s.pattern} className={styles.frameShirt} />
          <span className={cn(styles.frameNum, s.dark && styles.frameNumDark)}>{s.num}</span>
        </div>
      ))}
    </div>
  );
}

/** Half-open sealed box with warm light escaping — stand-in for the product shot. */
function MysteryBox() {
  return (
    <svg className={styles.box} viewBox="0 0 400 300" aria-hidden>
      <defs>
        <linearGradient id="rm-box-front" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a1a14" />
          <stop offset="1" stopColor="#140606" />
        </linearGradient>
        <radialGradient id="rm-box-light" cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#ffb070" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff7a3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glowing opening */}
      <polygon points="70,120 250,95 340,130 160,160" fill="url(#rm-box-light)" />
      {/* flaps */}
      <polygon points="70,120 160,160 120,60" fill="#2a1210" opacity="0.9" />
      <polygon points="250,95 340,130 330,40" fill="#24100e" opacity="0.9" />
      {/* front + side */}
      <polygon points="70,120 160,160 160,290 70,250" fill="#1e0b09" />
      <polygon points="160,160 340,130 340,260 160,290" fill="url(#rm-box-front)" />
      {/* generic stamp */}
      <rect x="235" y="175" width="70" height="70" rx="4" fill="none" stroke="#7a3a30" strokeWidth="3" opacity="0.6" transform="rotate(-8 270 210)" />
      <circle cx="270" cy="210" r="18" fill="none" stroke="#7a3a30" strokeWidth="2.5" opacity="0.6" />
    </svg>
  );
}

export default function RetroMystery() {
  return (
    <section className={styles.section} aria-label="Discover more — retro and mystery">
      <div className={styles.grid}>
        <div className={cn(styles.panel, styles.retro)}>
          <div className={styles.bg} aria-hidden>
            <ShirtWall />
          </div>
          <div className={styles.panelInner}>
            <span className={styles.tag}>The Retro Kit</span>
            <h2 className={styles.title}>
              Classic shirts.
              <em>Modern cult.</em>
            </h2>
            <p className={styles.copy}>
              Real vintage and faithful remakes from more than 200 clubs and 60 nations. The kits from your old
              posters. The kits you always wanted.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statLbl}>Shirts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>1972</span>
                <span className={styles.statLbl}>Earliest</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>200+</span>
                <span className={styles.statLbl}>Clubs</span>
              </div>
            </div>
            <a className={styles.cta} href="#">
              Browse the archive
              <ArrowRightIcon strokeWidth={2.5} />
              <ExternalIcon className={styles.ctaExternal} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <div className={cn(styles.panel, styles.mystery)}>
          <div className={styles.bg} aria-hidden>
            <PhotoArt tones={["#3a0e14", "#12030a", "#4a1a10"]} grain={0.22} style={{ opacity: 0.85 }} />
            <div className={styles.glow} />
            <MysteryBox />
          </div>
          <div className={styles.panelInner}>
            <span className={styles.tag}>Mystery Box</span>
            <h2 className={styles.title}>
              One kit.
              <em>Sealed. Yours.</em>
            </h2>
            <p className={styles.copy}>
              One fixed price. A kit worth about double inside. Every box sealed, every box a surprise — no peeks, no
              swaps, just the luck of the draw.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>£34.99</span>
                <span className={styles.statLbl}>Per box</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>£60–90</span>
                <span className={styles.statLbl}>Real value</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Free</span>
                <span className={styles.statLbl}>Delivery</span>
              </div>
            </div>
            <a className={styles.cta} href="#">
              Open the box
              <ArrowRightIcon strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
