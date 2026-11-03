"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/art";
import { CartIcon, ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./SiteHeader.module.css";
import { CURRENCIES, NAV, TOP_LINKS } from "./header/data";
import MegaPanel from "./header/MegaPanel";
import MobileDrawer from "./header/MobileDrawer";

/** The scroll threshold is the announcement bar height (source: s1.offsetHeight; 36px desktop / 34px mobile). */
const ANNOUNCEMENT_SELECTOR = "[data-announcement-bar]";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("GBP");
  const closeRef = useRef<HTMLButtonElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const currency = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];

  /* Sticky shadow once scrolled past the announcement bar */
  useEffect(() => {
    const update = () => {
      const s1 = document.querySelector<HTMLElement>(ANNOUNCEMENT_SELECTOR);
      const threshold = s1 ? s1.offsetHeight : 0;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Mobile drawer: body scroll lock, focus close button, Escape closes */
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  /* Currency dropdown: outside click + Escape close */
  useEffect(() => {
    if (!currencyOpen) return;
    const onDown = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrencyOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [currencyOpen]);

  const currencyLabel = `${currency.flag} ${currency.symbol} ${currency.code}`;

  return (
    <>
      <header className={cn(styles.header, scrolled && styles.isScrolled)}>
        {/* ----- Utility row ----- */}
        <div className={styles.top}>
          <div className={styles.topInner}>
            <div className={styles.topLinks}>
              {TOP_LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className={styles.topRight}>
              <div className={styles.currencyWrapper} ref={currencyRef}>
                <button
                  type="button"
                  className={styles.currency}
                  aria-label="Change currency"
                  aria-haspopup="listbox"
                  aria-expanded={currencyOpen}
                  onClick={() => setCurrencyOpen((o) => !o)}
                >
                  <span aria-hidden="true">{currency.flag}</span>
                  <span>{currency.symbol}</span>
                  <span>{currency.code}</span>
                  <span className={styles.currencyChev} aria-hidden="true">
                    ▾
                  </span>
                </button>
                <ul className={styles.currencyList} hidden={!currencyOpen}>
                  {CURRENCIES.map((c) => {
                    const active = c.code === currencyCode;
                    return (
                      <li key={c.code}>
                        <a
                          className={cn(styles.currencyItem, active && styles.isActive)}
                          href={`?currency=${c.code}`}
                          aria-current={active ? "true" : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrencyCode(c.code);
                            setCurrencyOpen(false);
                          }}
                        >
                          <span className={styles.currencyItemFlag} aria-hidden="true">
                            {c.flag}
                          </span>
                          <span className={styles.currencyItemCode}>{c.code}</span>
                          <span className={styles.currencyItemName}>{c.name}</span>
                          {active && (
                            <span className={styles.currencyItemCheck} aria-hidden="true">
                              ✓
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ----- Main row ----- */}
        <div className={styles.main}>
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="kitroom-mobile-drawer"
            onClick={openDrawer}
          >
            <MenuIcon width={24} height={24} />
          </button>
          <Link className={styles.logo} href="/" aria-label="KITROOM home">
            <Logo className={styles.logoImg} />
          </Link>
          <div className={styles.search}>
            <span className={styles.searchIcon}>
              <SearchIcon width={16} height={16} />
            </span>
            <form className={styles.searchForm} role="search" action="/search" method="get">
              <input
                type="search"
                name="q"
                placeholder="Search for kits, players, teams..."
                aria-label="Search the catalogue"
              />
            </form>
          </div>
          <div className={styles.right}>
            <div className={styles.perks}>
              <span className={styles.perk}>
                <strong>Free</strong> shipping
              </span>
              <span className={styles.perk}>
                <strong>Free</strong> customisation
              </span>
            </div>
            <a className={cn(styles.iconBtn, styles.iconBtnWishlist)} href="/wishlist" aria-label="Wishlist">
              <HeartIcon width={20} height={20} />
            </a>
            <a className={styles.cartPill} href="/cart" aria-label="Open cart">
              <CartIcon width={16} height={16} />
              <span className={styles.cartPillLabel}>
                Cart · <span>0</span>
              </span>
            </a>
          </div>
        </div>

        {/* ----- Black nav bar ----- */}
        <nav className={styles.nav} aria-label="Primary navigation">
          <div className={styles.navInner}>
            {NAV.map((item) => {
              switch (item.kind) {
                case "link":
                  return (
                    <div key={item.label} className={styles.navItem}>
                      <a href={item.href}>{item.label}</a>
                    </div>
                  );
                case "highlight":
                  return (
                    <div key={item.label} className={cn(styles.navItem, styles.navItemWc)}>
                      <a href={item.href}>
                        <span className={styles.navDot} aria-hidden="true" />
                        {/* "Summer Cup" is longer than the original's label; drop the first word on tablets so the bar fits */}
                        <span className={styles.navWcLead}>{item.label.split(" ")[0]} </span>
                        {item.label.split(" ").slice(1).join(" ")}
                      </a>
                    </div>
                  );
                case "mega":
                  return (
                    <div key={item.label} className={cn(styles.navItem, styles.navItemHasMega)}>
                      <button type="button" className={styles.navTrigger} aria-haspopup="true">
                        {item.label}
                        <ChevronDownIcon className={styles.navChev} width={9} height={9} />
                      </button>
                      <MegaPanel label={item.label} menu={item.menu} />
                    </div>
                  );
                case "submenu":
                  return (
                    <div key={item.label} className={cn(styles.navItem, styles.navItemHasSubmenu)}>
                      <button type="button" className={styles.navTrigger} aria-haspopup="true">
                        {item.label}
                        <ChevronDownIcon className={styles.navChev} width={10} height={10} />
                      </button>
                      <ul className={styles.submenu}>
                        {item.items.map((s) => (
                          <li key={s.href}>
                            <a href={s.href}>{s.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
              }
            })}
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} closeRef={closeRef} currencyLabel={currencyLabel} />
    </>
  );
}
