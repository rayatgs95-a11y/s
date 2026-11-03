"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal product carousel mechanics (ported from the source section JS):
 * - prev/next scroll by one card step (distance between card 1 and card 2)
 * - prev disabled when scrollLeft <= 4, next disabled at the end (4px tolerance)
 * - active dot = card whose left edge is nearest the scroller's left edge
 *   (skipped when the scroller has no horizontal overflow, i.e. mobile grid)
 * - dot click scrolls that card into view (inline: start)
 * Cards are the scroller's direct element children.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>() {
  const scrollerRef = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  const cards = () => Array.from(scrollerRef.current?.children ?? []) as HTMLElement[];

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    if (el.scrollWidth <= el.clientWidth + 4) return;
    const rowLeft = el.getBoundingClientRect().left;
    let closest = 0;
    let minDist = Infinity;
    (Array.from(el.children) as HTMLElement[]).forEach((tile, idx) => {
      const d = Math.abs(tile.getBoundingClientRect().left - rowLeft);
      if (d < minDist) {
        minDist = d;
        closest = idx;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const init = window.requestAnimationFrame(update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.cancelAnimationFrame(init);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [update]);

  const getStep = () => {
    const el = scrollerRef.current;
    const c = cards();
    if (!el) return 0;
    if (c.length < 2) return el.clientWidth;
    return c[1].getBoundingClientRect().left - c[0].getBoundingClientRect().left;
  };

  const prev = () => scrollerRef.current?.scrollBy({ left: -getStep(), behavior: "smooth" });
  const next = () => scrollerRef.current?.scrollBy({ left: getStep(), behavior: "smooth" });
  const goTo = (idx: number) => {
    const tile = cards()[idx];
    if (!tile) return;
    setActive(idx);
    tile.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return { scrollerRef, atStart, atEnd, active, prev, next, goTo };
}
