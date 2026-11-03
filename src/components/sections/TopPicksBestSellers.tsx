"use client";

import { ShirtArt } from "@/components/art";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useCarousel } from "./carousel/useCarousel";
import styles from "./TopPicksBestSellers.module.css";

/** `backdrop: "mesh"` renders the dark wire-mesh studio wall */
const MESH = "mesh";

const TOP_PICKS: Product[] = [
  { id: "tp-1", name: "Northbridge United Summer Cup 2026 Away Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#2a2a2a", accent: "#3a3a3a", trim: "#9a9a9a", pattern: "pinstripe", backdrop: "#8f8f8f" } },
  { id: "tp-2", name: "Ashford Rovers Summer Cup 2026 Away - Fan Version", price: "£34.99", href: "#", look: { base: "#bfe8d6", accent: "#a9dcc6", trim: "#c9a24a", pattern: "plain", backdrop: "#8f8f8f" } },
  { id: "tp-3", name: "Lakeside Town Summer Cup 2026 Away Kit - Player Version", price: "£39.99", href: "#", look: { base: "#9a7be0", accent: "#c2a8f2", trim: "#3a2a6a", pattern: "sash", backdrop: "#2b2b2b" } },
  { id: "tp-4", name: "Westmere FC 2026 Summer Cup Away Kit – Fan Version", price: "£39.99", href: "#", look: { base: "#16203a", accent: "#22305a", trim: "#c8202a", pattern: "plain", backdrop: MESH } },
  { id: "tp-5", name: "Castleton Albion 2026 Summer Cup Special Kit- Fan Version", price: "£34.99", href: "#", look: { base: "#1e6b45", accent: "#14512f", trim: "#f2f2f2", pattern: "hoops", backdrop: MESH } },
  { id: "tp-6", name: "Redmoor FC Heritage Vintage Edition - Fan Version", price: "£34.99", href: "#", look: { base: "#f4f4f4", accent: "#1a1a1a", trim: "#2e7a3a", pattern: "shoulders", backdrop: "#d6d6d6" } },
  { id: "tp-7", name: "Harbour City 25/26 Away Kit LS - Fan Version", price: "£34.99", href: "#", look: { base: "#f1ead6", accent: "#6b1f2a", trim: "#6b1f2a", pattern: "shoulders", backdrop: "#8f8f8f" } },
  { id: "tp-8", name: "Harbour City 25/26 Away Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#f1ead6", accent: "#2b2b2b", trim: "#6b1f2a", pattern: "shoulders", backdrop: "#8f8f8f" } },
];

const BEST_SELLERS: Product[] = [
  { id: "bs-1", name: "Vale Athletic 22/23 Special Dragon Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#1f3c9a", accent: "#c9a24a", trim: "#f2f2f2", pattern: "sash", backdrop: "#d6d6d6" } },
  { id: "bs-2", name: "Lakeside Town 21/22 Fan Design Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#f2efe6", accent: "#d8d2c2", trim: "#e3762c", pattern: "pinstripe", backdrop: "#2b2b2b" } },
  { id: "bs-3", name: "Ashford Rovers Concept Kit - Fan Version", price: "£39.99", href: "#", look: { base: "#f7f7f7", accent: "#d0202a", trim: "#1d2b4d", pattern: "halves", backdrop: "#8f8f8f" } },
  { id: "bs-4", name: "Northbridge United x Night Owl Kit – Fan Version", price: "£34.99", href: "#", look: { base: "#1a2550", accent: "#c8202a", trim: "#f2c230", pattern: "stripes", backdrop: "#8f8f8f" } },
  { id: "bs-5", name: "Castleton Albion 22/23 Third - Fan Version", price: "£34.99", href: "#", look: { base: "#e9e0c4", accent: "#3a3628", trim: "#3a3628", pattern: "pinstripe", backdrop: MESH } },
  { id: "bs-6", name: "Castleton Albion 23/24 Fan 4th Edition - Fan Version", price: "£34.99", href: "#", look: { base: "#1c1c1c", accent: "#8a8a8a", trim: "#f2f2f2", pattern: "pinstripe", backdrop: MESH } },
  { id: "bs-7", name: "Redmoor FC 23/24 Home Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#d0202a", accent: "#1f3c9a", trim: "#f2f2f2", pattern: "halves", backdrop: MESH } },
  { id: "bs-8", name: "Westmere FC 21/22 Home Kit - Fan Version", price: "£34.99", href: "#", look: { base: "#1a7a3a", accent: "#111111", trim: "#f2f2f2", pattern: "stripes", backdrop: "#d6d6d6" } },
];

interface BlockProps {
  eyebrow: string;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  badge: string;
  badgeClass: string;
  products: Product[];
}

function CarouselBlock({ eyebrow, title, viewAllHref, viewAllLabel, badge, badgeClass, products }: BlockProps) {
  const { scrollerRef, atStart, atEnd, active, prev, next, goTo } = useCarousel<HTMLDivElement>();

  return (
    <div>
      <header className={styles.head}>
        <div>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden />
            {eyebrow}
          </span>
          <h2 className={styles.title}>{title}</h2>
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
          <a className={styles.viewall} href={viewAllHref} aria-label={viewAllLabel}>
            View all
            <ArrowRightIcon />
          </a>
        </div>
      </header>

      <div className={styles.scroller} ref={scrollerRef}>
        {products.map((p) => {
          const mesh = p.look.backdrop === MESH;
          return (
            <a key={p.id} className={styles.card} href={p.href} aria-label={`Shop ${p.name}, ${p.price}`}>
              <div
                className={cn(styles.cardImg, mesh && styles.mesh)}
                style={mesh ? undefined : { background: p.look.backdrop }}
              >
                <span className={cn(styles.cardBadge, badgeClass)}>{badge}</span>
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
          );
        })}
      </div>

      <div className={styles.dots}>
        {products.map((p, i) => (
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
  );
}

export default function TopPicksBestSellers() {
  return (
    <section className={styles.section} aria-label="Top Picks and Best Sellers">
      <div className={styles.inner}>
        <CarouselBlock
          eyebrow="Curated by us"
          title="Top picks."
          viewAllHref="#top-picks"
          viewAllLabel="View all top picks"
          badge="Top pick"
          badgeClass={styles.badgePick}
          products={TOP_PICKS}
        />
        <div className={styles.divider}>
          <div className={styles.dividerMark} />
        </div>
        <CarouselBlock
          eyebrow="What fans are buying"
          title="Best sellers."
          viewAllHref="#best-sellers"
          viewAllLabel="View all best sellers"
          badge="Best seller"
          badgeClass={styles.badgeSeller}
          products={BEST_SELLERS}
        />
      </div>
    </section>
  );
}
