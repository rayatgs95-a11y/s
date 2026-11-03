import { PhotoArt, type PhotoArtProps } from "@/components/art";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./WomenKids.module.css";

interface PanelTile {
  href: string;
  label: string;
  kicker: string;
  title: string;
  sub: string;
  variant: "women" | "kids";
  mirrorMobile?: boolean;
  art: Pick<PhotoArtProps, "tones" | "shirts" | "grain">;
}

const TILES: PanelTile[] = [
  {
    href: "#women",
    label: "Shop Women's Collection",
    kicker: "Built for her",
    title: "Women's Collection",
    sub: "Kits made for women, from the labels you rely on.",
    variant: "women",
    // Grey sea-side haze, red/navy half-and-half shirt
    art: {
      tones: ["#8f9294", "#2f3437", "#4d5559"],
      shirts: [{ base: "#c8202a", accent: "#18213a", trim: "#f2f2f2", pattern: "halves" }],
    },
  },
  {
    href: "#kids",
    label: "Shop Kids & Juniors",
    kicker: "For the next generation",
    title: "Kids & Juniors",
    sub: "Ages 4 to 14. Proper kits, proper fit.",
    variant: "kids",
    mirrorMobile: true,
    // Pale studio white fading to shadow, white shirts with navy trim
    art: {
      tones: ["#eeeeee", "#6f7174", "#2a2b2e"],
      shirts: [
        { base: "#f4f4f4", accent: "#c3242e", trim: "#1d2440", pattern: "plain" },
        { base: "#f4f4f4", accent: "#c3242e", trim: "#1d2440", pattern: "plain" },
      ],
      grain: 0.12,
    },
  },
];

export default function WomenKids() {
  return (
    <section className={styles.section} aria-label="Women's and Kids' collections">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {TILES.map((t) => (
            <a
              key={t.href}
              href={t.href}
              aria-label={t.label}
              className={cn(styles.tile, styles[t.variant], t.mirrorMobile && styles.mirrorMobile)}
            >
              <span className={styles.media} aria-hidden>
                <PhotoArt {...t.art} />
              </span>
              <div className={styles.body}>
                <div className={styles.text}>
                  <span className={styles.kicker}>
                    <span className={styles.kickerDot} aria-hidden />
                    {t.kicker}
                  </span>
                  <h2 className={styles.title}>{t.title}</h2>
                  <p className={styles.sub}>{t.sub}</p>
                </div>
                <span className={styles.cta}>
                  Shop
                  <ArrowRightIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
