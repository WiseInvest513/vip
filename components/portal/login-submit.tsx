"use client";
import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import s from "./portal.module.css";
export function LoginSubmit({ callbackUrl }: { callbackUrl: string }) {
  const [pending, setPending] = useState(false);
  return <form className={s.loginForm} action="/auth/login" method="get" onSubmit={() => setPending(true)}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <button className={s.loginSubmit} type="submit" aria-busy={pending} aria-label={pending ? "正在前往主站" : "通过 Wise 主站登录"}>
    <span role="status">{pending ? "正在前往主站…" : "通过 Wise 主站登录"}</span>
    {pending ? <LoaderCircle className={s.loginSpinner} size={20} aria-hidden="true"/> : <ArrowRight size={20} aria-hidden="true"/>}
  </button></form>;
}
