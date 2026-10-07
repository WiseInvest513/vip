import {AmbientSurface} from "../vip/ambient-surface";
import {Hero,Footer} from "@/components/portal/shared";
import {Motion} from "@/components/portal/motion";
import {Learning} from "@/components/portal/learning";
import s from "@/components/portal/portal.module.css";
export const metadata={title:"学习资料 · Wise VIP",alternates:{canonical:"/learn"}};
export default function Learn(){return <main className={s.page}><Motion><Hero title={<>把零散的知识，<br/>学成自己的体系。</>} description="从学习路径到书籍与资料，建立可以持续积累的研究方法。" action="开始学习" href="#paths" image="/images/portal/learn-hero.png"/><AmbientSurface className={s.surface}><section id="paths" className={s.section}><h2>学习路径</h2><p className={s.intro}>从基础到实践，循序渐进地建立属于自己的研究体系。</p><Learning/></section></AmbientSurface></Motion><Footer/></main>}
