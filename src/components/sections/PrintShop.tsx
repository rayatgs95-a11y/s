"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./PrintShop.module.css";

/** Simple colour-block flag: equal stripes, horizontal or vertical. */
interface FlagSpec {
  dir: "h" | "v";
  colors: string[];
}

interface Player {
  name: string;
  num: string;
  country: string;
  flag: FlagSpec;
}

/** Fictional roster — invented names and invented countries. */
const PLAYERS: Player[] = [
  { name: "OKAFOR", num: "9", country: "Valmora", flag: { dir: "v", colors: ["#1f6b3a", "#ffffff", "#e0a526"] } },
  { name: "LINDQVIST", num: "4", country: "Nordhavn", flag: { dir: "h", colors: ["#2a4fa0", "#f2d23c", "#2a4fa0"] } },
  { name: "MORENO", num: "10", country: "Castelia", flag: { dir: "h", colors: ["#b3202a", "#f1bf00", "#b3202a"] } },
  { name: "HALLORAN", num: "7", country: "Kestria", flag: { dir: "v", colors: ["#0f7a6c", "#f5f1ea", "#d2452c"] } },
  { name: "DUMONT", num: "5", country: "Arvenne", flag: { dir: "h", colors: ["#151515", "#c8102e", "#f2c400"] } },
  { name: "SATO", num: "11", country: "Sunmere", flag: { dir: "v", colors: ["#f5f1ea", "#d62839"] } },
];

const CYCLE_MS = 3200;
const FADE_MS = 320;

function Flag({ spec }: { spec: FlagSpec }) {
  const n = spec.colors.length;
  return (
    <svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden>
      {spec.colors.map((c, i) =>
        spec.dir === "h" ? (
          <rect key={i} x="0" y={(6 / n) * i} width="9" height={6 / n + 0.01} fill={c} />
        ) : (
          <rect key={i} x={(9 / n) * i} y="0" width={9 / n + 0.01} height="6" fill={c} />
        ),
      )}
    </svg>
  );
}

export default function PrintShop() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const arcId = `ps-arc-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timerId: number | null = null;
    const fadeTimers = new Set<number>();

    const cycle = () => {
      setFading(true);
      const t = window.setTimeout(() => {
        fadeTimers.delete(t);
        setIdx((i) => (i + 1) % PLAYERS.length);
        setFading(false);
      }, FADE_MS);
      fadeTimers.add(t);
    };
    const start = () => {
      if (timerId !== null) return;
      timerId = window.setInterval(cycle, CYCLE_MS);
    };
    const stop = () => {
      if (timerId === null) return;
      window.clearInterval(timerId);
      timerId = null;
    };
    // Pause when the tab is backgrounded
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      fadeTimers.forEach((t) => window.clearTimeout(t));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const p = PLAYERS[idx];
  const fade = fading && styles.fade;

  return (
    <section className={styles.section} aria-label="Personalisation">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Personalisation
            </span>
            <h2 className={styles.title}>
              Your name. Your number. <em>On any shirt.</em>
            </h2>
            <p className={styles.sub}>
              Proper heat-press printing that lasts — never iron-on. League lettering for every shirt. Out the door in
              3–5 working days.
            </p>
            <ul className={styles.features}>
              <li className={styles.feature}>
                <span className={styles.featureTick}>
                  <CheckIcon strokeWidth={3} />
                </span>
                <span>
                  <strong>Heat-pressed</strong>, not iron-on
                </span>
              </li>
              <li className={styles.feature}>
                <span className={styles.featureTick}>
                  <CheckIcon strokeWidth={3} />
                </span>
                <span>
                  Authentic fonts <strong>for every league</strong>
                </span>
              </li>
              <li className={styles.feature}>
                <span className={styles.featureTick}>
                  <CheckIcon strokeWidth={3} />
                </span>
                <span>
                  Ships in <strong>3–5 working days</strong>
                </span>
              </li>
            </ul>
            <div className={styles.ctaRow}>
              <a className={styles.cta} href="#">
                Customise my kit
                <ArrowRightIcon strokeWidth={2.5} />
              </a>
            </div>
            <div className={styles.dots} aria-hidden>
              {PLAYERS.map((pl, i) => (
                <span key={pl.name} className={cn(styles.dot, i === idx && styles.dotOn)} />
              ))}
            </div>
          </div>

          <div className={styles.jerseyWrap}>
            <div className={styles.jersey}>
              <div className={styles.jerseyInner}>
                <div className={cn(styles.arcName, fade)}>
                  <svg viewBox="0 0 400 80" aria-label={p.name} role="img">
                    <defs>
                      <path id={arcId} d="M 30 76 Q 200 12 370 76" fill="none" />
                    </defs>
                    <text className={styles.arcText} textAnchor="middle">
                      <textPath href={`#${arcId}`} startOffset="50%">
                        {p.name}
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className={cn(styles.num, fade)}>{p.num}</div>
                <div className={styles.bottom}>
                  <div className={cn(styles.flag, fade)}>
                    <Flag spec={p.flag} />
                  </div>
                  <div className={cn(styles.country, fade)}>{p.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
