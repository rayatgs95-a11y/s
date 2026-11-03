"use client";

import { PhotoArt, ShirtArt } from "@/components/art";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useCarousel } from "./carousel/useCarousel";
import styles from "./NewArrivals.module.css";

const VIEW_ALL_HREF = "#new-arrivals";

const PRODUCTS: Product[] = [
  {
    id: "na-1",
    name: "Northbridge United Midnight Flare Special Edition - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#161616", accent: "#f2a516", trim: "#b3262c", pattern: "shoulders", backdrop: "#f4f4f4" },
  },
  {
    id: "na-2",
    name: "Vale Athletic Jungle Cat Special Edition - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#efe8d4", accent: "#6b5a3a", trim: "#3d3424", pattern: "sash", backdrop: "#f6f6f4" },
  },
  {
    id: "na-3",
    name: "Vale Athletic 26/27 Gilded Crest Special Edition - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#efe2b8", accent: "#c9a24a", trim: "#5b4a2a", pattern: "pinstripe", backdrop: "#f7f6f2" },
  },
  {
    id: "na-4",
    name: "Harbour City 27/28 Home - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#1f2c6b", accent: "#9b1b3a", trim: "#f2c230", pattern: "stripes", backdrop: "#f5f5f5" },
  },
  {
    id: "na-5",
    name: "Redmoor FC 26/27 Blush October - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#fbf4f6", accent: "#f2b8c8", trim: "#e88aa6", pattern: "stripes", backdrop: "#f7f7f7" },
  },
  {
    id: "na-6",
    name: "Lakeside Town 26/27 Home - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#1f5fd0", accent: "#123d94", trim: "#e9ecf5", pattern: "halves", backdrop: "#2e2f33" },
  },
  {
    id: "na-7",
    name: "Castleton Albion 26/27 Third - Player Version",
    price: "£39.99",
    badge: "New",
    href: "#",
    look: { base: "#2547b8", accent: "#c6243a", trim: "#ffffff", pattern: "hoops", backdrop: "#323336" },
  },
  {
    id: "na-8",
    name: "Westmere FC 26/27 Neon Bloom Special Edition Pink - Fan Version",
    price: "£34.99",
    badge: "New",
    href: "#",
    look: { base: "#f0609a", accent: "#4fd6b4", trim: "#1b6b4e", pattern: "halves", backdrop: "#38393c" },
  },
];

export default function NewArrivals() {
  const { scrollerRef, atStart, atEnd, active, prev, next, goTo } = useCarousel<HTMLDivElement>();

  return (
    <section className={styles.section} aria-label="New arrivals">
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Just dropped
            </span>
            <h2 className={styles.title}>New arrivals.</h2>
          </div>
          <div className={styles.headRight}>
            <div className={styles.nav}>
              <button type="button" className={styles.navBtn} aria-label="Previous" disabled={atStart} onClick={prev}>
                <ChevronLeftIcon />
              </button>
              <button type="button" className={styles.navBtn} aria-label="Next" disabled={atEnd} onClick={next}>
                <ChevronRightIcon />
              </button>
            </div>
            <a className={styles.viewall} href={VIEW_ALL_HREF} aria-label="View all new arrivals">
              View all
              <ArrowRightIcon />
            </a>
          </div>
        </header>

        <a className={styles.hero} href={VIEW_ALL_HREF} aria-label="Shop Next Season’s Latest Drops — From £29">
          <div className={styles.heroBg} aria-hidden>
            <PhotoArt
              tones={["#5c6670", "#1d2024", "#7a3a36"]}
              grain={0.22}
              shirts={[
                { base: "#3fc4d4", accent: "#1d4f9a", trim: "#123a7a", pattern: "plain" },
                { base: "#1d2b4d", accent: "#e8742c", trim: "#e8742c", pattern: "halves" },
                { base: "#e2362c", accent: "#b51f1a", trim: "#f2f2f2", pattern: "plain" },
                { base: "#d9b77a", accent: "#2d2a26", trim: "#2d2a26", pattern: "plain" },
                { base: "#f4f4f4", accent: "#d42a2a", trim: "#1d2b4d", pattern: "stripes" },
                { base: "#7a2a22", accent: "#5a1a14", trim: "#e8d7c0", pattern: "plain" },
              ]}
            />
          </div>
          <span className={styles.heroBadge}>2026 / 27</span>
          <div className={styles.heroBody}>
            <div className={styles.heroText}>
              <span className={styles.heroKicker}>
                <span className={styles.heroKickerDot} aria-hidden />
                2026 / 27
              </span>
              <h3 className={styles.heroName}>Next Season’s Latest Drops</h3>
              <p className={styles.heroMeta}>
                From £29
                <strong>From £29</strong>
              </p>
            </div>
            <span className={styles.heroCta}>
              Shop now
              <ArrowRightIcon />
            </span>
          </div>
        </a>

        <div className={styles.scroller} ref={scrollerRef}>
          {PRODUCTS.map((p) => (
            <a key={p.id} className={styles.card} href={p.href} aria-label={`Shop ${p.name}, ${p.price}`}>
              <div className={styles.cardImg} style={{ background: p.look.backdrop }}>
                {p.badge && <span className={styles.cardBadge}>{p.badge}</span>}
                <div className={styles.cardArt}>
                  <ShirtArt base={p.look.base} accent={p.look.accent} trim={p.look.trim} pattern={p.look.pattern} />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardPrice}>{p.price}</p>
                <span className={styles.cardCta}>
                  Shop now
                  <ArrowRightIcon />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.dots}>
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={cn(styles.dot, i === active && styles.dotOn)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
