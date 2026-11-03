import styles from "./MarqueeSeparator.module.css";

const COPIES = 4;

/** Giant outlined "SUMMER CUP 2026 ·" text scrolling infinitely (CSS keyframes, pauses on hover). */
export default function MarqueeSeparator() {
  return (
    <>
      <div className={styles.marquee} role="marquee" aria-label="Summer Cup 2026">
        <div className={styles.track}>
          {Array.from({ length: COPIES }, (_, i) => (
            <span key={i} className={styles.copy} aria-hidden={i > 0 ? true : undefined}>
              <span className={styles.text}>
                SUMMER CUP <em>2026</em>
              </span>
              <span className={styles.bullet} aria-hidden />
            </span>
          ))}
        </div>
      </div>
      <p className={styles.caption}>Kickoff · June 11 · Three host nations</p>
    </>
  );
}
