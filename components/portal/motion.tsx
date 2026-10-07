"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Motion({children}: {children: ReactNode}) {
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  const nodes=root.current?.querySelectorAll<HTMLElement>("[data-reveal]")??[];
  const animations:Animation[]=[];
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){if(!media.matches) animations.push(e.target.animate([{opacity:.3,transform:"translateY(22px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,easing:"cubic-bezier(.16,1,.3,1)"}));observer.unobserve(e.target);}}},{threshold:.08});
  nodes.forEach(n=>observer.observe(n));
  const artwork=root.current?.querySelector<HTMLElement>("[data-parallax]");
  let frame=0;
  const update=()=>{frame=0;if(!artwork)return;const bounds=artwork.getBoundingClientRect();const shift=media.matches?0:Math.max(-10,Math.min(10,(window.innerHeight/2-bounds.top-bounds.height/2)*.025));artwork.style.setProperty("--art-shift",`${shift}px`);};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener("scroll",scroll,{passive:true});update();
  const stop=()=>{if(media.matches)animations.forEach(a=>a.cancel());update();};media.addEventListener("change",stop);
  return()=>{observer.disconnect();window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());media.removeEventListener("change",stop);};
 },[]);
 return <div ref={root}>{children}</div>;
}
