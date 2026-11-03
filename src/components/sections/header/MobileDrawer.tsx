"use client";

import { Fragment, useState, type KeyboardEvent, type RefObject } from "react";
import Link from "next/link";
import { Logo } from "@/components/art";
import { ChevronDownIcon, CloseIcon, HeartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "../SiteHeader.module.css";
import { NAV, type LinkItem, type MegaMenu } from "./data";

interface Props {
  open: boolean;
  onClose: () => void;
  closeRef: RefObject<HTMLButtonElement | null>;
  currencyLabel: string;
}

const activate = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

/** Mobile slide-in drawer + dim backdrop. Rendered outside <header> so it stacks above the announcement bar. */
export default function MobileDrawer({ open, onClose, closeRef, currencyLabel }: Props) {
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleSub = (key: string) => setOpenSubs((s) => ({ ...s, [key]: !s[key] }));
  const toggleGroup = (key: string) => setOpenGroups((s) => ({ ...s, [key]: !s[key] }));

  const renderToggle = (key: string, label: string) => {
    const isOpen = !!openSubs[key];
    return (
      <button
        type="button"
        className={cn(styles.drawerToggle, isOpen && styles.isOpen)}
        aria-expanded={isOpen}
        onClick={() => toggleSub(key)}
      >
        {label}
        <ChevronDownIcon className={styles.chev} width={16} height={16} />
      </button>
    );
  };

  const renderGroupedSub = (key: string, menu: MegaMenu) => (
    <ul className={cn(styles.drawerSub, openSubs[key] && styles.isOpen)} data-drawer-scroll="">
      {menu.columns.flat().map((g) => {
        const gKey = `${key}:${g.href}`;
        const gOpen = !!openGroups[gKey];
        return (
          <Fragment key={gKey}>
            <li
              className={cn(styles.drawerSubGroup, gOpen && styles.isOpen)}
              role="button"
              tabIndex={0}
              aria-expanded={gOpen}
              onClick={() => toggleGroup(gKey)}
              onKeyDown={activate(() => toggleGroup(gKey))}
            >
              {g.label}
            </li>
            {g.children.map((c) => (
              <li key={c.href} className={cn(gOpen && styles.isRevealed)}>
                <a href={c.href} onClick={onClose}>
                  {c.label}
                </a>
              </li>
            ))}
          </Fragment>
        );
      })}
      {menu.ctas.map((c) => (
        <li key={c.href} className={styles.drawerSubCtaLi}>
          <a className={styles.drawerSubCta} href={c.href} onClick={onClose}>
            {c.label}
            <span aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
  );

  const renderFlatSub = (key: string, items: LinkItem[]) => (
    <ul className={cn(styles.drawerSub, openSubs[key] && styles.isOpen)}>
      {items.map((c) => (
        <li key={c.href}>
          <a href={c.href} onClick={onClose}>
            {c.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className={cn(styles.drawerBg, open && styles.isOpen)} onClick={onClose} aria-hidden="true" />
      <aside
        className={cn(styles.drawer, open && styles.isOpen)}
        aria-label="Mobile menu"
        aria-hidden={!open}
        id="kitroom-mobile-drawer"
      >
        <div className={styles.drawerHead}>
          <Link className={styles.drawerLogo} href="/" aria-label="KITROOM home" onClick={onClose}>
            <Logo inverted className={styles.drawerLogoImg} />
          </Link>
          <div className={styles.drawerHeadIcons}>
            <a className={styles.drawerWish} href="/wishlist" aria-label="Wishlist" onClick={onClose}>
              <HeartIcon width={22} height={22} />
            </a>
            <button
              ref={closeRef}
              type="button"
              className={styles.drawerClose}
              aria-label="Close menu"
              onClick={onClose}
            >
              <CloseIcon width={22} height={22} />
            </button>
          </div>
        </div>
        <div className={styles.drawerPromo}>SALE IS ON · Buy 2 kits — 1 at 30% OFF</div>
        <ul className={styles.drawerList}>
          {NAV.map((item) => {
            switch (item.kind) {
              case "link":
                return (
                  <li key={item.label}>
                    <a href={item.href} onClick={onClose}>
                      {item.label}
                    </a>
                  </li>
                );
              case "highlight":
                return (
                  <li key={item.label} className={styles.drawerLiWc}>
                    <a href={item.href} onClick={onClose}>
                      <span className={styles.drawerDot} aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                );
              case "mega":
                return item.menu.columns.length > 0 ? (
                  <li key={item.label}>
                    {renderToggle(item.label, item.label)}
                    {renderGroupedSub(item.label, item.menu)}
                  </li>
                ) : (
                  <li key={item.label} className={styles.drawerLiDropdown}>
                    {renderToggle(item.label, item.label)}
                    {renderFlatSub(item.label, item.menu.ctas)}
                  </li>
                );
              case "submenu":
                return (
                  <li key={item.label} className={styles.drawerLiDropdown}>
                    {renderToggle(item.label, item.label)}
                    {renderFlatSub(item.label, item.items)}
                  </li>
                );
            }
          })}
        </ul>
        <div className={styles.drawerFoot}>
          <a href="/account" onClick={onClose}>
            My account
          </a>
          <a href="/track-order" onClick={onClose}>
            Track order
          </a>
          <span>{currencyLabel}</span>
        </div>
      </aside>
    </>
  );
}
