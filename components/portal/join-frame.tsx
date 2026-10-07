import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { Motion } from "./motion";
import { Footer } from "./shared";
import vip from "@/app/vip/vip.module.css";
import styles from "./join-frame.module.css";

/** Shared pages use the same typography, buttons and surfaces as /join. */
export function JoinFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`${vip.page} ${styles.page} ${className}`}><div className={styles.shell}><Motion>{children}</Motion><Footer /></div></main>;
}

export function JoinHero({ title, description, action, href, image, alt, secondary = false }: {
  title: ReactNode;
  description: string;
  action: string;
  href: string;
  image: string;
  alt: string;
  secondary?: boolean;
}) {
  return <section className={vip.hero} aria-labelledby="page-title">
    <div className={vip.heroCopy}>
      <p className={vip.welcome}><Crown size={16} aria-hidden="true" />WISE VIP<span>一起关注，也一起复盘</span></p>
      <h1 id="page-title">{title}</h1>
      <p className={vip.heroDescription}>{description}</p>
      <div className={vip.actions}>
        <Link className={vip.primary} href={href}>{action}<ArrowRight size={16} /></Link>
        {secondary ? <Link className={vip.secondary} href="/join">了解加入方式<ArrowRight size={16} /></Link> : null}
      </div>
    </div>
    <div className={styles.heroImage}><Image src={image} alt={alt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1239px) 46vw, 550px" priority /></div>
  </section>;
}
