import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "../SiteHeader.module.css";
import type { MegaMenu } from "./data";

/** Desktop full-width mega dropdown (shown via CSS :hover / :focus-within). */
export default function MegaPanel({ label, menu }: { label: string; menu: MegaMenu }) {
  return (
    <div className={styles.mega} aria-label={`${label} menu`}>
      <div className={styles.megaInner}>
        <div className={cn(styles.megaCol, styles.megaColSplit)}>
          <div className={styles.megaColTitle}>{menu.title}</div>
          {menu.columns.length > 0 && (
            <div className={styles.megaSplitGrid}>
              {menu.columns.map((col, ci) => (
                <ul key={ci} className={styles.megaList}>
                  {col.map((g) => (
                    <li key={g.href} className={cn(styles.megaLi, styles.megaLiHasChildren)}>
                      <a className={styles.megaLink} href={g.href}>
                        {g.label}
                        <span className={styles.megaChevron}>
                          <ChevronRightIcon width={10} height={10} />
                        </span>
                      </a>
                      <ul className={styles.megaSub}>
                        {g.children.map((c) => (
                          <li key={c.href}>
                            <a className={styles.megaSublink} href={c.href}>
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
          <ul className={cn(styles.megaList, styles.megaListCtas)}>
            {menu.ctas.map((c) => (
              <li key={c.href} className={styles.megaLi}>
                <a className={cn(styles.megaLink, menu.ctaStyle && styles.megaLinkCta)} href={c.href}>
                  {c.label}
                  {menu.ctaStyle && <span aria-hidden="true">→</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {menu.feature && (
          <a className={styles.megaFeat} href={menu.feature.href}>
            <span className={styles.megaFeatEyebrow}>{menu.feature.eyebrow}</span>
            <span className={styles.megaFeatH}>{menu.feature.heading}</span>
            <span className={styles.megaFeatSub}>{menu.feature.sub}</span>
            <span className={styles.megaFeatCta}>{menu.feature.cta}</span>
          </a>
        )}
      </div>
    </div>
  );
}
