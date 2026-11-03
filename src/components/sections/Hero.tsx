"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type TouchEvent } from "react";
import { PhotoArt, type ShirtArtProps } from "@/components/art";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./Hero.module.css";

const AUTOPLAY_MS = 3000;
const SWIPE_PX = 50;

type Shirt = Omit<ShirtArtProps, "className" | "style">;

interface HeroSlide {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  variant: string;
  tones: [string, string, string?];
  /** Optional override of the PhotoArt background (layered gradients) */
  backdrop?: string;
  shirts: Shirt[];
}

/* Slide 1 mimics the original line-up poster: pale paper with wavy red / orange / blue
 * cut-out outlines behind five players in different kits. */
const LINEUP_BACKDROP = [
  "radial-gradient(60% 55% at 18% 62%, transparent 0 34%, #c8102e 34% 39%, transparent 39% 43%, #f0901e 43% 48%, transparent 48% 52%, #1d4fb8 52% 57%, transparent 57%)",
  "radial-gradient(55% 60% at 50% 58%, transparent 0 34%, #c8102e 34% 39%, transparent 39% 43%, #f0901e 43% 48%, transparent 48% 52%, #1d4fb8 52% 57%, transparent 57%)",
  "radial-gradient(60% 55% at 82% 60%, transparent 0 34%, #c8102e 34% 39%, transparent 39% 43%, #f0901e 43% 48%, transparent 48% 52%, #1d4fb8 52% 57%, transparent 57%)",
  "radial-gradient(120% 90% at 50% 0%, #e9e6e1 0%, #cfcac2 60%, #b9b3aa 100%)",
].join(", ");

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "2026 / 27 season",
    title: "New Season · New Kits",
    sub: "Every club's latest drop, sorted. Home, away and third shirts — under one roof.",
    cta: "Shop new arrivals",
    href: "#new-arrivals",
    variant: styles.slide2,
    tones: ["#d9d4cc", "#c8102e", "#1d4fb8"],
    backdrop: LINEUP_BACKDROP,
    shirts: [
      { base: "#f2f2f2", accent: "#1a1a1a", trim: "#1a1a1a", pattern: "plain" },
      { base: "#1c1c1e", accent: "#c9a24b", trim: "#c9a24b", pattern: "plain" },
      { base: "#a50f2d", accent: "#1d3f9a", trim: "#f5c542", pattern: "stripes" },
      { base: "#f4efe6", accent: "#b01b2e", trim: "#111111", pattern: "shoulders" },
      { base: "#2f8fd8", accent: "#1f6fb0", trim: "#ffffff", pattern: "plain" },
    ],
  },
  {
    eyebrow: "Retro collection",
    title: "Classics, Reissued",
    sub: "Throwback shirts rebuilt with modern fabric. The eras you remember, ready to wear.",
    cta: "Shop retro kits",
    href: "#retro",
    variant: styles.slide1,
    tones: ["#1f3f7a", "#0f1428", "#c8102e"],
    shirts: [
      { base: "#0b3d91", accent: "#ffffff", trim: "#ffffff", pattern: "hoops" },
      { base: "#ffffff", accent: "#0b3d91", trim: "#0b3d91", pattern: "sash" },
      { base: "#c8102e", accent: "#ffffff", trim: "#ffffff", pattern: "pinstripe" },
      { base: "#111827", accent: "#f5b942", trim: "#f5b942", pattern: "halves" },
    ],
  },
  {
    eyebrow: "Summer Cup 2026",
    title: "Summer Cup Ready",
    sub: "National-style shirts for the big summer tournament. Pick your side before kickoff.",
    cta: "Shop Summer Cup",
    href: "#summer-cup",
    variant: styles.slide3,
    tones: ["#b3202a", "#1a1a1a", "#f0901e"],
    shirts: [
      { base: "#ffffff", accent: "#c8102e", trim: "#c8102e", pattern: "plain" },
      { base: "#c8102e", accent: "#ffffff", trim: "#ffffff", pattern: "stripes" },
      { base: "#f5c542", accent: "#0b6b3a", trim: "#0b6b3a", pattern: "shoulders" },
    ],
  },
];

const pad = (num: number) => String(num).padStart(2, "0");

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}
const getHidden = () => document.hidden;
const serverFalse = () => false;

export default function Hero() {
  const n = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  /** Bumped on manual navigation so the autoplay interval restarts from zero. */
  const [restartKey, setRestartKey] = useState(0);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, serverFalse);
  const tabHidden = useSyncExternalStore(subscribeVisibility, getHidden, serverFalse);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef(0);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + n) % n), [n]);
  const restart = useCallback(() => setRestartKey((k) => k + 1), []);

  // Autoplay every 3s; paused on hover, touch, hidden tab and reduced motion.
  useEffect(() => {
    if (n < 2 || reduced || tabHidden || hovered || touching) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [n, reduced, tabHidden, hovered, touching, restartKey, go]);

  // Arrow keys navigate while the section is within the viewport.
  useEffect(() => {
    if (n < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      go(e.key === "ArrowLeft" ? -1 : 1);
      restart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [n, go, restart]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.changedTouches[0].screenX;
    setTouching(true);
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = touchX.current - e.changedTouches[0].screenX;
    if (Math.abs(dx) > SWIPE_PX) go(dx > 0 ? 1 : -1);
    setTouching(false);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label="Featured collections"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => setTouching(false)}
    >
      <div className={styles.viewport}>
        {SLIDES.map((s, k) => {
          const on = k === index;
          const artStyle: CSSProperties | undefined = s.backdrop ? { background: s.backdrop } : undefined;
          return (
            <div
              key={s.title}
              className={cn(styles.slide, s.variant, on && styles.isOn)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}: ${s.title}`}
              aria-hidden={!on}
            >
              <PhotoArt className={styles.art} tones={s.tones} shirts={s.shirts} style={artStyle} grain={0.22} />
              <div className={styles.body}>
                <span className={styles.eyebrow}>{s.eyebrow}</span>
                <h2 className={styles.title}>{s.title}</h2>
                <p className={styles.sub}>{s.sub}</p>
                <a className={styles.cta} href={s.href} tabIndex={on ? undefined : -1}>
                  {s.cta}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className={styles.controls} role="group" aria-label="Hero slides">
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous slide"
            onClick={() => {
              go(-1);
              restart();
            }}
          >
            <ChevronLeftIcon />
          </button>
          <div className={styles.dots}>
            {SLIDES.map((s, k) => (
              <button
                key={s.title}
                type="button"
                className={cn(styles.dot, k === index && styles.isOn)}
                aria-label={`Go to slide ${k + 1}`}
                aria-current={k === index ? "true" : undefined}
                onClick={() => {
                  setIndex(k);
                  restart();
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next slide"
            onClick={() => {
              go(1);
              restart();
            }}
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}

      <div className={styles.counter}>
        {pad(index + 1)} / {pad(n)}
      </div>
    </section>
  );
}
