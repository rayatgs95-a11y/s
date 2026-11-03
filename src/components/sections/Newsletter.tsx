"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import s from "./Newsletter.module.css";

const COUPON_CODE = "kitroom10";
const ERROR_MESSAGE = "Please enter a valid email address.";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 9 10.5 15 8 12.5" />
    </svg>
  );
}

function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    window.prompt("Copy this code:", text);
  }
  document.body.removeChild(ta);
  return ok;
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (!isValidEmail(email.trim())) {
      setError(true);
      inputRef.current?.focus();
      return;
    }
    // No network request: simulate the "Sending..." round-trip, then reveal the coupon locally.
    setSending(true);
    later(() => {
      setSending(false);
      setSuccess(true);
      later(() => {
        successRef.current?.scrollIntoView?.({ behavior: "smooth", block: "center" });
      }, 200);
    }, 450);
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(false);
  };

  const onCopy = () => {
    const done = () => {
      setCopied(true);
      later(() => setCopied(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(COUPON_CODE).then(done).catch(() => {
        if (fallbackCopy(COUPON_CODE)) done();
      });
    } else if (fallbackCopy(COUPON_CODE)) {
      done();
    }
  };

  return (
    <section className={s.root} aria-labelledby="newsletter-title">
      <div className={s.inner}>
        <div>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} aria-hidden />
            Members offer
          </span>
          <h2 id="newsletter-title" className={s.title}>
            Get <em>10% off</em> + weekly drops.
          </h2>
          <p className={s.sub}>
            Join up. Your code lands instantly. First to every release — members-only deals each Sunday.
          </p>
        </div>

        <div className={cn(s.formWrap, success && s.isSuccess)}>
          <form className={s.form} onSubmit={onSubmit} noValidate>
            <input
              ref={inputRef}
              className={cn(s.input, error && s.isInvalid)}
              type="email"
              name="email"
              placeholder="Your email address"
              aria-label="Email address"
              aria-invalid={error || undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
              autoComplete="email"
              value={email}
              onChange={onInput}
            />
            <button className={s.button} type="submit" disabled={sending}>
              {sending ? (
                <span className={s.sending}>Sending...</span>
              ) : (
                <>
                  Get 10%
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          <div className={s.trust}>
            <span className={s.trustItem}>No spam</span>
            <span className={s.trustItem}>Unsubscribe anytime</span>
          </div>

          <p id="newsletter-error" className={cn(s.error, error && s.isVisible)} role="alert">
            {ERROR_MESSAGE}
          </p>

          <p className={s.disclaimer}>
            By signing up you agree to our <a href="#">privacy policy</a>.
          </p>

          <div ref={successRef} className={cn(s.success, success && s.isVisible)} aria-live="polite">
            {success && (
              <>
                <div className={s.successTop}>
                  <SuccessIcon className={s.successIcon} />
                  <span className={s.successTitle}>Your 10% code is ready 🎉</span>
                </div>
                <p className={s.successSub}>Use this code at checkout:</p>
                <div className={s.coupon}>
                  <code className={s.couponCode}>{COUPON_CODE}</code>
                  <button
                    type="button"
                    className={cn(s.couponCopy, copied && s.isCopied)}
                    aria-label={`Copy ${COUPON_CODE}`}
                    onClick={onCopy}
                  >
                    <CopyIcon />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
