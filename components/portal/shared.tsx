import Link from "next/link";
import Image from "next/image";
import { ArrowRight,Crown } from "lucide-react";
import s from "./portal.module.css";
export function Hero({title,description,action,href,image,secondary}: {title:React.ReactNode;description:string;action:string;href:string;image:string;secondary?:boolean}){return <section className={s.hero}><div><p className={s.welcome}><Crown size={17}/>WISE VIP<span>一起关注，也一起复盘</span></p><h1>{title}</h1><p className={s.description}>{description}</p><div className={s.actions}><Link className={s.primary} href={href}>{action}<ArrowRight size={19}/></Link>{secondary&&<Link className={s.secondary} href="/join">了解加入方式<ArrowRight size={18}/></Link>}</div></div><div className={s.heroArt} data-parallax><Image src={image} alt="讨论笔记与研究资料的立体展示" fill sizes="(max-width: 760px) 100vw, 48vw" priority/></div></section>}
export function Footer(){return <footer className={s.footer}><span>WISE VIP · 一起关注，也一起复盘</span><span>认真讨论，持续积累。<a href="https://www.wise-invest.org">前往主站 <ArrowRight size={13}/></a></span></footer>}
