import React, {useRef, useState, useEffect, useId} from 'react';
import {motion, MotionConfig, useScroll, useTransform, useReducedMotion, useMotionValue, useMotionValueEvent} from 'motion/react';

export function Maru({small=false}) {
  const id=useId();
  return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><defs><clipPath id={id}><ellipse cx="1200" cy="1470" rx="700" ry="640"/><ellipse cx="755" cy="930" rx="145" ry="150"/><ellipse cx="1645" cy="925" rx="145" ry="150"/></clipPath></defs><g clipPath={'url(#'+id+')'}><rect x="480" y="740" width="1450" height="1420" fill="white"/><image href="assets/sekamaru-original.png" width="2481" height="3508"/></g></svg>;
}

function Guide({children,className=''}) {
  return <div className={'poster-guide '+className}><span className="journey-anchor"><Maru/></span><p>{children}</p></div>;
}

function Companion() {
  const route=useRef([]), obstacles=useRef([]);
  const [ready,setReady]=useState(false);
  const reduced=useReducedMotion();
  const {scrollY}=useScroll();
  const x=useMotionValue(0), y=useMotionValue(0), scale=useMotionValue(1), rotate=useMotionValue(0);
  const update=(scroll)=>{
    const points=route.current;
    if(points.length<2)return;
    let i=0;while(i<points.length-2&&scroll>points[i+1].at)i++;
    const a=points[i],b=points[i+1];
    const t=Math.max(0,Math.min(1,(scroll-a.at)/(b.at-a.at)));
    const ease=t*t*(3-2*t);
    let px=a.x+(b.x-a.x)*ease, py=a.y+(b.y-a.y)*ease, size=a.size+(b.size-a.size)*ease;
    for(const box of obstacles.current) {
      if(px+size>box.left&&px<box.right&&py+size>box.top&&py<box.bottom) { px=8;size=30;break; }
    }
    x.set(px);y.set(py-scroll);scale.set(size/80);rotate.set(Math.sin(t*Math.PI)*(b.x>a.x?10:-10));
  };
  useEffect(()=>{
    if(reduced)return;
    let alive=true;
    const rect=(el)=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top+scrollY.get(),bottom:r.bottom+scrollY.get(),width:r.width};};
    const measure=()=>{
      if(!alive)return;
      const mobile=innerWidth<700, points=[];
      const anchors=[...document.querySelectorAll('.journey-anchor')].map(rect);
      const add=(px,py,size)=>points.push({x:px,y:py,size,at:Math.max(0,py-innerHeight*.58)});
      anchors.forEach((r,i)=>{
        add(r.left,r.top,r.width);
        if(i<anchors.length-1) { add(8,r.bottom+85,mobile?32:46);add(8,anchors[i+1].top-100,mobile?32:46); }
      });
      points.sort((a,b)=>a.at-b.at);
      for(let i=1;i<points.length;i++)points[i].at=Math.max(points[i].at,points[i-1].at+1);
      route.current=points;
      obstacles.current=[...document.querySelectorAll('.poster-main h1 span,.poster-main h2,.poster-main p,.poster-main a,.hero-face-safe')].filter(el=>!el.closest('.poster-guide')).map(rect);
      document.documentElement.classList.add('poster-travelling');setReady(true);update(window.scrollY);
    };
    measure();const observer=new ResizeObserver(measure);observer.observe(document.querySelector('.poster-main'));
    window.addEventListener('resize',measure);document.fonts.ready.then(measure);
    return()=>{alive=false;observer.disconnect();window.removeEventListener('resize',measure);document.documentElement.classList.remove('poster-travelling');};
  },[reduced]);
  useMotionValueEvent(scrollY,'change',update);
  return !reduced&&ready?<motion.div className="poster-companion" aria-hidden="true" style={{x,y,scale,rotate}}><Maru/></motion.div>:null;
}

function Watermark({children,className=''}) {
  const ref=useRef(null),reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const x=useTransform(scrollYProgress,[0,1],['4%','-6%']);
  return <div ref={ref} className={'poster-watermark '+className} aria-hidden="true"><motion.span style={{x:reduced?0:x}}>{children}</motion.span></div>;
}

const services=[
  {name:'アート',detail:'「世界のまる」として、色と形で表現。',href:'art.html'},
  {name:'デザイン',detail:'ロゴ・Web・LPで、想いをかたちに。',href:'creative.html'},
  {name:'イベント企画',detail:'「100人のアーティスト展」を主催。',href:'projects.html'},
  {name:'AI講座',detail:'AIを使い、人間の時間を広げる。',href:'creative.html#ai-lecture'}
];

export function Home() {
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">本文へ移動</a>
    <motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>
    <Companion/>
    <main id="main" className="poster-main">
      <section className="poster-scene poster-hero" aria-labelledby="hero-title">
        <Watermark className="dream-word">DREAM</Watermark>
        <ul className="hero-disciplines" aria-label="石丸篤史の活動領域">{services.map(s=><li key={s.name}><a href={s.href}>{s.name}</a></li>)}</ul>
        <div className="hero-portrait"><img src="assets/ishimaru-hero-cutout.png" alt="石丸篤史" width="1171" height="1343" fetchPriority="high"/><span className="hero-face-safe" aria-hidden="true"/></div>
        <h1 id="hero-title"><span className="hero-title-back">遊びを</span><span className="hero-title-front">仕事にする。</span></h1>
        <p className="hero-invitation">真剣に遊ぼう。</p>
        <div className="hero-identity"><p><strong>石丸篤史</strong><span>Art for Being 代表 / 世界のまる</span></p><a href="about.html" className="poster-link">人物と歩み <span aria-hidden="true">↗</span></a></div>
        <Guide className="hero-guide">どんなことを、つくってる？ <a href="#work" aria-label="仕事と活動を見る">↓</a></Guide>
      </section>

      <section id="work" className="poster-scene poster-work" aria-labelledby="work-title">
        <Watermark className="less-word">LESS IS MORE</Watermark>
        <div className="work-statement"><Guide>「遊び」を、仕事に？</Guide><h2 id="work-title">真剣に、<br/><em>遊ぼう。</em></h2><p className="work-copy">好きなことを、表現する。<br/>人が集まり、体験する場をつくる。<br/>そのために、いろんな方法を使います。</p></div>
        <div className="service-index" aria-label="活動の詳細">{services.map((s,i)=><motion.a key={s.name} href={s.href} className="service-entry" whileHover={reduced?undefined:{x:8}} transition={{type:'spring',stiffness:360,damping:32}}><span className="service-number">0{i+1}</span><span><strong>{s.name}</strong><small>{s.detail}</small></span><span className="service-arrow" aria-hidden="true">↗</span></motion.a>)}</div>
        <a className="project-footnote" href="projects.html"><strong>441</strong><span>人の表現が出会う場。<br/><small>100人のアーティスト展<br/>全4回 / 累計出展者</small></span><span aria-hidden="true">↗</span></a>
      </section>

      <section id="who" className="poster-scene poster-being" aria-labelledby="being-title">
        <Watermark className="being-word">ART FOR BEING</Watermark>
        <a className="art-orbit" href="art.html" aria-label="世界のまるの作品を見る"><img src="assets/art-earth.jpg" alt="地球と宇宙を描いた世界のまるの作品の一部" width="2400" height="1699" loading="lazy"/><span>作品の一部 ↗</span></a>
        <div className="being-copy"><Guide>その根っこに、あるものは？</Guide><h2 id="being-title">ありのまま<br/>生きることが<br/><em>アートになる。</em></h2><p>AIにできることは、AIへ。<br/>人間は、人間にしかできないことを<br/><strong>楽しんで生きる。</strong><br/>そんな社会を、目指しています。</p><a href="contact.html" className="poster-contact">一緒に、何して遊ぼう？ <span aria-hidden="true">↗</span><small>企画・制作・講座・協賛のご相談</small></a></div>
        <footer className="poster-footer"><a href="about.html">石丸篤史について ↗</a><span>Art for Being</span><a href="#main">最初へ ↑</a></footer>
      </section>
    </main>
  </MotionConfig>;
}
