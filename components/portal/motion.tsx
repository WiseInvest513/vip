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
  let inView=false;
  let lastShift="";
  const active=()=>Boolean(artwork&&inView&&!media.matches&&document.visibilityState==="visible");
  const writeShift=(shift:number)=>{if(!artwork)return;const value=`${shift.toFixed(2)}px`;if(value!==lastShift){artwork.style.setProperty("--art-shift",value);lastShift=value;}};
  const cancelFrame=()=>{cancelAnimationFrame(frame);frame=0;};
  const update=()=>{frame=0;if(!artwork||!active())return;const bounds=artwork.getBoundingClientRect();writeShift(Math.max(-10,Math.min(10,(window.innerHeight/2-bounds.top-bounds.height/2)*.025)));};
  const scroll=()=>{if(active()&&!frame)frame=requestAnimationFrame(update);};
  const syncVisibility=()=>{if(active())scroll();else cancelFrame();};
  const artworkObserver=artwork?new IntersectionObserver(([entry])=>{inView=entry.isIntersecting&&entry.intersectionRect.height>0&&entry.intersectionRect.width>0;syncVisibility();},{threshold:.01}):null;
  if(artwork){
   artworkObserver?.observe(artwork);
   window.addEventListener("scroll",scroll,{passive:true});
   document.addEventListener("visibilitychange",syncVisibility);
  }
  const stop=()=>{if(media.matches){animations.forEach(a=>a.cancel());cancelFrame();writeShift(0);}else scroll();};media.addEventListener("change",stop);
  return()=>{observer.disconnect();artworkObserver?.disconnect();if(artwork){window.removeEventListener("scroll",scroll);document.removeEventListener("visibilitychange",syncVisibility);}cancelFrame();animations.forEach(a=>a.cancel());media.removeEventListener("change",stop);};
 },[]);
 return <div ref={root}>{children}</div>;
}
