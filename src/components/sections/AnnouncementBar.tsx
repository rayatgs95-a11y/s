"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./AnnouncementBar.module.css";

interface Message {
  content: ReactNode;
  /** Optional per-message dwell in ms (source: data-tnk-s1-dwell). */
  dwell?: number;
}

const DEFAULT_DWELL = 2600;

const MESSAGES: Message[] = [
  {
    content: (
      <>
        <span className={styles.sep} aria-hidden="true" />
        <strong>SALE IS ON</strong>· Buy<strong>2 kits</strong>— 1 at
        <span className={styles.hot}>30% OFF</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className={styles.sep} aria-hidden="true" />
        <strong>SALE IS ON</strong>· Buy<strong>3 kits</strong>— 1 at
        <span className={styles.hot}>60% OFF</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className={styles.sep} aria-hidden="true" />
        <strong>SALE IS ON</strong>· Buy<strong>4 kits</strong>— get
        <span className={styles.hot}>1 FREE kit</span>
      </>
    ),
  },
  { content: <>Free worldwide shipping on every order</> },
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const n = MESSAGES.length;
    if (n < 2) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let i = 0;

    const schedule = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        i = (i + 1) % n;
        setActive(i);
        schedule();
      }, MESSAGES[i].dwell ?? DEFAULT_DWELL);
    };
    const stop = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else schedule();
    };

    document.addEventListener("visibilitychange", onVisibility);
    schedule();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={styles.bar} aria-label="Site announcements" data-announcement-bar="">
      <div className={styles.inner}>
        <div className={styles.stage} aria-live="polite">
          {MESSAGES.map((m, idx) => (
            <div
              key={idx}
              className={cn(styles.msg, idx === active && styles.isActive)}
              aria-hidden={idx !== active}
            >
              {m.content}
            </div>
          ))}
        </div>
        <a className={styles.cta} href="#track-order">
          Track an order
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
