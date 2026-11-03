"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoArt, type PhotoArtProps } from "@/components/art";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./Collections.module.css";

interface CollectionTile {
  href: string;
  kicker: string;
  title: string;
  /** Per-tile gradient placeholder modifier (from the source stylesheet) */
  variant: "wc" | "euro" | "player" | "limited" | "long" | "women";
  art: Pick<PhotoArtProps, "tones" | "shirts" | "grain">;
}

const HERO: CollectionTile = {
  href: "#special-editions",
  kicker: "While stocks last",
  title: "Special editions",
  variant: "wc",
  // Lavender-washed portrait against misty green hills, dark patterned shirt
  art: {
    tones: ["#b49ac4", "#3b3047", "#5d7468"],
    shirts: [{ base: "#2b2532", accent: "#6f6680", trim: "#e5484d", pattern: "sash" }],
  },
};

const ROW: CollectionTile[] = [
  {
    href: "#jackets-tracksuits",
    kicker: "Training & Lifestyle",
    title: "Jackets & Tracksuits",
    variant: "euro",
    // White zip jacket on a near-black studio backdrop
    art: {
      tones: ["#30343b", "#0b0c0f", "#1b1d23"],
      shirts: [{ base: "#ececec", accent: "#1a1a1a", trim: "#131313", pattern: "plain" }],
    },
  },
  {
    href: "#player-editions",
    kicker: "Premium fit",
    title: "Player Editions",
    variant: "player",
    // Deep red backdrop, blue/claret striped shirt
    art: {
      tones: ["#c8171d", "#4f080b", "#86100f"],
      shirts: [{ base: "#1c3c8e", accent: "#9e1030", trim: "#e8c547", pattern: "stripes" }],
    },
  },
  {
    href: "#new-season",
    kicker: "2026/27",
    title: "The Latest New Season Kits",
    variant: "limited",
    // Warm beige interior, red/black striped home shirt
    art: {
      tones: ["#ebe4da", "#b3a796", "#d1c6b7"],
      shirts: [{ base: "#141414", accent: "#d3121b", trim: "#141414", pattern: "stripes" }],
      grain: 0.12,
    },
  },
  {
    href: "#match-balls",
    kicker: "Match Equipment",
    title: "Match Balls",
    variant: "long",
    // Purple-lit stadium tunnel with a green turf plinth
    art: { tones: ["#6a5585", "#1a1326", "#3b6a39"] },
  },
];

const FOOTER: CollectionTile = {
  href: "#boots",
  kicker: "Footwear",
  title: "Boots built for game day",
  variant: "women",
  // Smoky blue-grey studio with a colourful line-up
  art: {
    tones: ["#64707f", "#12161d", "#2d3644"],
    shirts: [
      { base: "#d9dbdf", accent: "#2b6fd6", pattern: "plain" },
      { base: "#e4e4e4", accent: "#9aa0a8", pattern: "pinstripe" },
      { base: "#7a1f2b", accent: "#e8d23a", pattern: "sash" },
      { base: "#3fbf4a", accent: "#7a1f2b", pattern: "halves" },
      { base: "#2a2d33", accent: "#e9e9e9", pattern: "hoops" },
      { base: "#ec3b24", accent: "#ff6a3d", pattern: "plain" },
    ],
  },
};

function Tile({
  tile,
  className,
  badge,
  tileRef,
}: {
  tile: CollectionTile;
  className?: string;
  badge?: string;
  tileRef?: (el: HTMLAnchorElement | null) => void;
}) {
  return (
    <a
      ref={tileRef}
      href={tile.href}
      aria-label={`Shop ${tile.title} collection`}
      className={cn(styles.tile, styles[tile.variant], className)}
    >
      <span className={styles.media} aria-hidden>
        <PhotoArt {...tile.art} />
      </span>
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.body}>
        <div className={styles.text}>
          <span className={styles.kicker}>{tile.kicker}</span>
          <h3 className={styles.tileTitle}>{tile.title}</h3>
        </div>
        <span className={styles.cta}>
          Shop
          <ArrowRightIcon />
        </span>
      </div>
    </a>
  );
}

export default function Collections() {
  const rowRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const updateActiveDot = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const rowRect = row.getBoundingClientRect();
    const rowCenter = rowRect.left + rowRect.width / 2;
    let closestIdx = 0;
    let minDist = Infinity;
    tileRefs.current.forEach((tile, idx) => {
      if (!tile) return;
      const r = tile.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - rowCenter);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    setActive(closestIdx);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveDot();
        rafId = 0;
      });
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    // Initial state
    const initId = window.requestAnimationFrame(updateActiveDot);
    return () => {
      row.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(initId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [updateActiveDot]);

  const goTo = (idx: number) => {
    const tile = tileRefs.current[idx];
    if (!tile) return;
    setActive(idx);
    tile.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className={styles.section} aria-labelledby="collections-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Shop the floor
            </span>
            <h2 id="collections-title" className={styles.title}>
              Featured Collections
            </h2>
          </div>
          <a href="#shop" className={styles.viewall} aria-label="View all collections">
            View all
            <ArrowRightIcon />
          </a>
        </header>

        <div className={styles.grid}>
          <Tile tile={HERO} className={styles.hero} badge="Limited" />

          <div className={styles.row} ref={rowRef}>
            {ROW.map((tile, i) => (
              <Tile
                key={tile.href}
                tile={tile}
                tileRef={(el) => {
                  tileRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <div className={styles.dots}>
            {ROW.map((tile, i) => (
              <button
                key={tile.href}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(styles.dot, i === active && styles.dotOn)}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <Tile tile={FOOTER} className={styles.footer} />
        </div>
      </div>
    </section>
  );
}
