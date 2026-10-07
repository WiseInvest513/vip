"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./home.module.css";

export function HeroScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < 0) return;
      const offset = active ? Math.min(12, Math.max(-12, -bounds.top * .035)) : 0;
      element.style.setProperty("--book-shift", `${offset.toFixed(2)}px`);
    };
    const sync = () => {
      active = enabled && !preference.matches && document.visibilityState === "visible";
      setPlaying(active);
      update();
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    sync();
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return (
    <section ref={root} className={styles.hero} data-playing={playing} aria-labelledby="home-title">
      <div className={styles.art} aria-hidden="true">
        <Image src="/images/portal/home-reading-room.png" alt="" fill priority sizes="100vw" quality={90} />
      </div>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
      {children}
      <button className={styles.motionButton} onClick={() => setEnabled(value => !value)} aria-label={enabled ? "暂停背景动效" : "播放背景动效"} aria-pressed={playing} title={enabled ? "暂停背景动效" : "播放背景动效"}>
        {enabled ? <Pause size={12} /> : <Play size={12} />}
      </button>
    </section>
  );
}
