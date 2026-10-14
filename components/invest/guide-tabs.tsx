"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Building2, CircleDollarSign, UsersRound } from "lucide-react";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { ServiceSymbol } from "@/app/vip/service-symbol";
import vip from "@/app/vip/vip.module.css";
import styles from "./guide-tabs.module.css";

const routes = [
  { value: "dca", number: "01", label: "DCA", title: "持续定投", description: "按计划分批投入，为长期积累打底", action: "试算积累 · 找产品与渠道" },
  { value: "companies", number: "02", label: "BUSINESS", title: "长线持有", description: "研究真实业务，把企业的成长看明白", action: "看历史表现 · 学企业研究" },
  { value: "risk", number: "03", label: "RISK", title: "合约风控", description: "先算清损失，守住预算与退出纪律", action: "算仓位与损失 · 走一笔案例" },
] as const;

type GuideRoute = typeof routes[number]["value"];
type GuideTabsProps = { dca: ReactNode; companies: ReactNode; risk: ReactNode };

function isGuideRoute(value: string): value is GuideRoute {
  return value === "dca" || value === "companies" || value === "risk";
}

const shortcuts = [
  { id: "dca-calculator", route: "dca", label: "定投试算" },
  { id: "company-performance", route: "companies", label: "历史表现" },
  { id: "risk-example", route: "risk", label: "交易算例" },
  { id: "investment-allocation", route: null, label: "资金分配" },
] as const;

/** These are process and allocation diagrams, never performance illustrations. */
function RouteVisual({ route }: { route: GuideRoute }) {
  if (route === "dca") return <span className={`${styles.visual} ${styles.rhythm}`} aria-hidden="true"><ServiceSymbol kind="calendar" /><span className={styles.repeat}><i /><i /><i /><i /></span></span>;
  if (route === "companies") return <span className={`${styles.visual} ${styles.business}`} aria-hidden="true"><span className={styles.businessCore}><Building2 size={34} strokeWidth={1.35} /></span><span className={`${styles.businessNode} ${styles.customer}`}><UsersRound size={17} /></span><span className={`${styles.businessNode} ${styles.revenue}`}><CircleDollarSign size={17} /></span></span>;
  return <span className={`${styles.visual} ${styles.allocation}`} aria-hidden="true"><span className={styles.allocationRing}><span>20<small>%</small></span></span><span className={styles.allocationLabel}>2 万 / 10 万元</span></span>;
}

/** Only the route selection runs on the client; each guide is server-rendered content. */
export function GuideTabs({ dca, companies, risk }: GuideTabsProps) {
  const descriptionId = useId();
  const [active, setActive] = useState<GuideRoute>("dca");

  useEffect(() => {
    let frame = 0;
    const syncFromHash = () => {
      const value = window.location.hash.slice(1);
      const shortcut = shortcuts.find(item => item.id === value);
      if (isGuideRoute(value)) setActive(value);
      else if (shortcut?.route) setActive(shortcut.route);
      else if (!value) setActive("dca");
      if (shortcut) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => document.getElementById(shortcut.id)?.scrollIntoView({ block: "start" }));
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  const selectRoute = (value: string) => {
    if (!isGuideRoute(value)) return;
    setActive(value);
    const hash = `#${value}`;
    if (window.location.hash !== hash) {
      // Preserve Next's history state and the current scroll position.
      window.history.pushState(window.history.state, "", hash);
    }
  };

  const openShortcut = (id: typeof shortcuts[number]["id"]) => {
    const shortcut = shortcuts.find(item => item.id === id);
    if (shortcut?.route) setActive(shortcut.route);
    if (window.location.hash !== `#${id}`) window.history.pushState(window.history.state, "", `#${id}`);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "start" });
    });
  };

  return (
    <Tabs.Root className={styles.root} value={active} onValueChange={selectRoute}>
      <Tabs.List className={`${vip.serviceGrid} ${styles.list}`} aria-label="投资方式">
        {routes.map(({ value, number, label, title, description, action }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className={styles.trigger}
            aria-label={title}
            aria-describedby={`${descriptionId}-${value}`}
          >
            <span className={styles.topline}><span className={styles.number}>{number}<span> / {label}</span></span><span className={styles.selected}>正在查看</span></span>
            <span className={styles.cardBody}><span className={styles.copy}><span className={styles.heading}>{title}</span><span id={`${descriptionId}-${value}`} className={styles.description}>{description}</span></span><RouteVisual route={value} /></span>
            <span className={styles.action}>{action}<ArrowRight size={16} aria-hidden="true" /></span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <p className={styles.routeNote}>点击一个方向，继续看具体产品、参与渠道与算例。刚开始的朋友，建议先完成持续定投部分。</p>
      <nav className={styles.shortcuts} aria-label="投资工具快捷入口"><span>直接查看</span>{shortcuts.map(item => <button key={item.id} type="button" onClick={() => openShortcut(item.id)}>{item.label}<ArrowRight size={12} aria-hidden="true" /></button>)}</nav>
      <AmbientSurface className={styles.surface}>
        <Tabs.Content forceMount hidden={active !== "dca"} value="dca" className={styles.panel} tabIndex={0}>{dca}</Tabs.Content>
        <Tabs.Content forceMount hidden={active !== "companies"} value="companies" className={styles.panel} tabIndex={0}>{companies}</Tabs.Content>
        <Tabs.Content forceMount hidden={active !== "risk"} value="risk" className={styles.panel} tabIndex={0}>{risk}</Tabs.Content>
      </AmbientSurface>
    </Tabs.Root>
  );
}
