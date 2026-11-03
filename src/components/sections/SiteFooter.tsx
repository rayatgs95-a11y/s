"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/art";
import { ArrowRightIcon, ChatIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import s from "./SiteFooter.module.css";

type Currency = { code: string; symbol: string; flag: string; name: string };

const CURRENCIES: Currency[] = [
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "Pound sterling" },
  { code: "AUD", symbol: "$", flag: "🇦🇺", name: "Australian dollar" },
  { code: "CAD", symbol: "$", flag: "🇨🇦", name: "Canadian dollar" },
  { code: "DKK", symbol: "kr", flag: "🇩🇰", name: "Danish krone" },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
  { code: "NOK", symbol: "kr", flag: "🇳🇴", name: "Norwegian krone" },
  { code: "SEK", symbol: "kr", flag: "🇸🇪", name: "Swedish krona" },
  { code: "CHF", symbol: "CHF", flag: "🇨🇭", name: "Swiss franc" },
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "United States (US) dollar" },
];

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["Catalog", "National teams", "Clubs", "Football boots", "Player version", "Special editions", "Tracksuits"],
  },
  { title: "Discover", links: ["Mystery box", "Retro kits", "Women kits", "Kids kits", "Affiliate program"] },
  {
    title: "Help",
    links: ["Track order", "Contact us", "Shipping", "Returns", "Size guide", "FAQ", "Blog", "News", "Wishlist"],
  },
  { title: "Company", links: ["My account", "About us", "Privacy policy", "Terms of service", "Cookies"] },
];

const LEGAL = ["Privacy", "Terms", "Cookies"];

function CurrencyDropdown() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("GBP");
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = CURRENCIES.find((c) => c.code === active) ?? CURRENCIES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={s.currencyWrapper}>
      <button
        type="button"
        className={s.currency}
        aria-label="Change currency"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {current.flag}
        <span>
          {current.symbol} {current.code}
        </span>
        <span className={s.currencyArrow} aria-hidden>
          ▾
        </span>
      </button>
      <ul className={s.currencyList} hidden={!open}>
        {CURRENCIES.map((c) => {
          const isActive = c.code === active;
          return (
            <li key={c.code}>
              <a
                href={`?currency=${c.code}`}
                className={cn(s.currencyItem, isActive && s.isActive)}
                aria-current={isActive || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(c.code);
                  setOpen(false);
                }}
              >
                <span className={s.currencyItemFlag}>{c.flag}</span>
                <span className={s.currencyItemCode}>{c.code}</span>
                <span className={s.currencyItemName}>{c.name}</span>
                {isActive && <span className={s.currencyItemCheck}>✓</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className={s.root}>
      <div className={s.contact}>
        <div className={s.contactRow}>
          <div className={s.contactLeft}>
            <div className={s.contactIcon}>
              <ChatIcon />
            </div>
            <div className={s.contactText}>
              <h3 className={s.contactH}>Need help with your kit?</h3>
              <p className={s.contactSub}>Real people answer within 2 hours, seven days a week.</p>
            </div>
          </div>
          <a className={s.contactCta} href="#">
            Contact us
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.cols}>
            <div className={s.brand}>
              <Link className={s.brandLogo} href="/" aria-label="KITROOM home">
                <Logo inverted />
              </Link>
              <p>Shirts for every supporter, every side, every season. Printed by hand. Sent worldwide.</p>
              <CurrencyDropdown />
            </div>
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className={s.colH}>{col.title}</h4>
                <ul className={s.colList}>
                  {col.links.map((label) => (
                    <li key={label}>
                      <a href="#">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={s.legal}>
        <div className={s.legalRow}>
          <p className={s.copy}>© 2026 KITROOM Ltd</p>
          <div className={s.legalLinks}>
            {LEGAL.map((l) => (
              <a key={l} href="#">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
