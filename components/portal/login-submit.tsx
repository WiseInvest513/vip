"use client";
import { useFormStatus } from "react-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";
import s from "./portal.module.css";
export function LoginSubmit() {
  const { pending } = useFormStatus();
  return <button className={s.loginSubmit} type="submit" disabled={pending} aria-busy={pending} aria-label={pending ? "正在前往主站" : "通过 Wise 主站登录"}>
    <span role="status">{pending ? "正在前往主站…" : "通过 Wise 主站登录"}</span>
    {pending ? <LoaderCircle className={s.loginSpinner} size={20} aria-hidden="true"/> : <ArrowRight size={20} aria-hidden="true"/>}
  </button>;
}
