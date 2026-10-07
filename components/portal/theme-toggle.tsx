"use client";
import { Moon, Sun } from "lucide-react";
import s from "./portal.module.css";
export function ThemeToggle() {
  return <button className={s.themeToggle} type="button" aria-label="切换日间或夜间模式" title="切换日间 / 夜间" onClick={() => {
    const dark = document.documentElement.classList.toggle("dark");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    try { localStorage.setItem("wisevip-theme", dark ? "dark" : "light"); } catch {}
  }}><Moon className={s.moon} size={17}/><Sun className={s.sun} size={17}/></button>;
}
