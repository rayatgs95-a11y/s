"use client";

import { useEffect, useRef } from "react";
import { CheckIcon, StarIcon } from "@/components/icons";
import styles from "./Reviews.module.css";

type Review = {
  date: string;
  title: string;
  text: string;
  name: string;
  flag: string;
  country: string;
};

const REVIEWS: Review[] = [
  {
    date: "Oct 2026",
    title: "Shirt matched the photos exactly",
    text: "The shirt was SPOT ON compared to the photos. Only small gripe is the wait — ordered on 14/9 and it landed on 1/10.",
    name: "Oliver Hartley",
    flag: "🇬🇧",
    country: "GB",
  },
  {
    date: "Sep 2026",
    title: "Sorted out without any fuss",
    text: "My first order came in the wrong size, but the support team were brilliant — they told me to keep the first one and posted the right size out free of charge. Easy and stress-free all the way. Would buy again.",
    name: "Siobhan Keane",
    flag: "🇮🇪",
    country: "IE",
  },
  {
    date: "Aug 2026",
    title: "Consistently good kits",
    text: "I've ordered several shirts now for my daughter and each one has been excellent. Any time I've had a question they've replied fast, and parcels normally turn up inside 2 weeks.",
    name: "Liam",
    flag: "🇦🇺",
    country: "AU",
  },
  {
    date: "Jul 2026",
    title: "Brilliant value for the quality",
    text: "Been ordering from them for a couple of seasons and nothing else comes close on quality for what you pay. Dependable, quick and well packed — great value without ever cutting corners. Easy to recommend.",
    name: "Marcus Delaney",
    flag: "🇺🇸",
    country: "US",
  },
  {
    date: "May 2026",
    title: "Solid shirt, helpful team",
    text: "Solid shirt and really helpful team. Shipping took a little longer than expected, which is fair for an international order — it arrived safe and I'm very pleased. Will be back.",
    name: "Jonas Becker",
    flag: "🇩🇪",
    country: "DE",
  },
  {
    date: "Apr 2026",
    title: "Just how I pictured it",
    text: "Ordering from Canada, I picked up two shirts — one printed with a custom name and number. Lovely fabric, and the printing turned out precisely the way I asked for it. Fits perfectly too, very happy overall.",
    name: "Amelie Rousseau-Grant",
    flag: "🇨🇦",
    country: "CA",
  },
  {
    date: "Feb 2026",
    title: "Delighted with my away shirt",
    text: "My Harbour City FC away shirt arrived this week and I'm delighted with it. Fair price, great feel and quicker shipping than I expected for an overseas order. Already planning my next purchase from here.",
    name: "Callum Reid",
    flag: "🇬🇧",
    country: "GB",
  },
  {
    date: "Jan 2026",
    title: "Never had a bad order",
    text: "Placed loads of orders now and the quality is always spot on — shirts, shorts and training tops. I keep returning and they never let me down.",
    name: "Priya",
    flag: "🇬🇧",
    country: "GB",
  },
];

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Desktop mouse drag-to-scroll (touch/trackpad use native horizontal scroll + snap).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        track.classList.add(styles.dragging);
        track.setPointerCapture(e.pointerId);
      }
      if (moved) track.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (moved) {
        if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
        // Re-enable snapping so the row settles on the nearest card.
        const left = track.scrollLeft;
        track.classList.remove(styles.dragging);
        track.scrollLeft = left;
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    track.addEventListener("click", onClick, true);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      track.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Trusted by thousands of fans</p>
          <h2 id="reviews-heading" className={styles.h2}>
            What Our Customers Say
          </h2>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          role="region"
          aria-label="Customer reviews"
          tabIndex={0}
        >
          {REVIEWS.map((r, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.mini} role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={styles.sq}>
                      <StarIcon />
                    </span>
                  ))}
                </span>
                <span className={styles.date}>{r.date}</span>
              </div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.text}>{r.text}</p>
              <div className={styles.who}>
                <span className={styles.av} aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className={styles.name}>{r.name}</span>
                  <br />
                  <span className={styles.loc}>
                    <span aria-hidden="true">{r.flag}</span> {r.country}
                  </span>
                </span>
                <span className={styles.verified}>
                  <CheckIcon width={11} height={11} strokeWidth={2.5} />
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.hint}>&larr; Swipe to see more reviews &rarr;</p>
      </div>
    </section>
  );
}
