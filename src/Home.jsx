import React, {useRef, useState, useEffect, useId} from 'react';
import {motion, MotionConfig, useScroll, useTransform, useReducedMotion, AnimatePresence, useMotionValue, useMotionValueEvent} from 'motion/react';

export function Maru({small=false}) {
  const id=useId();
  return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><defs><clipPath id={id}><ellipse cx="1200" cy="1470" rx="700" ry="640"/><ellipse cx="755" cy="930" rx="145" ry="150"/><ellipse cx="1645" cy="925" rx="145" ry="150"/></clipPath></defs><g clipPath={'url(#'+id+')'}><rect x="480" y="740" width="1450" height="1420" fill="white"/><image href="assets/sekamaru-original.png" width="2481" height="3508"/></g></svg>;
}
function Question({children,number}) {return <div className="question"><span className="question-home"><Maru/></span><p><span>せかまるから、石丸さんへ / {number}</span>{children}</p></div>}
const chapters=[['.opening','せかまると、石丸さんの話。'],['.who','石丸さんって、何をしている人？'],['.gathering','その「場」って、どんな場所？'],['.expression','石丸さん自身も、表現しているの？'],['.vision','AIを使うのも、そのため？'],['.ask','もう少し、聞いてもいい？'],['.flow-ending','次は、あなたの話も聞かせて。']];
function Companion(){
 const route=useRef([]),obstacles=useRef([]);const [ready,setReady]=useState(false);const reduced=useReducedMotion();const {scrollY}=useScroll();
 const x=useMotionValue(0),y=useMotionValue(0),scale=useMotionValue(1),rotate=useMotionValue(0);
 const update=(s)=>{
  const points=route.current;if(!points.length)return;
  let i=0;while(i<points.length-2&&s>points[i+1].at)i++;
  const a=points[i],b=points[i+1];const t=Math.max(0,Math.min(1,(s-a.at)/(b.at-a.at)));const ease=t*t*(3-2*t);
  let px=a.x+(b.x-a.x)*ease,py=a.y+(b.y-a.y)*ease,sz=a.size+(b.size-a.size)*ease;
  for(const box of obstacles.current){if(px+sz>box.l&&px<box.r&&py+sz>box.t&&py<box.b){px=window.innerWidth<600?7:20;sz=window.innerWidth<600?48:68;break;}}
  x.set(px);y.set(py-s);scale.set(sz/110);rotate.set(Math.sin(t*Math.PI)*((b.x>a.x)?8:-8));
 };
 useEffect(()=>{
  if(reduced){document.documentElement.classList.remove('travelling');return;}
  const measure=()=>{
   const mobile=window.innerWidth<600,vh=window.innerHeight;const rect=(e)=>{const r=e.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top+window.scrollY,b:r.bottom+window.scrollY,w:r.width,h:r.height};};
   const points=[];const add=(px,py,size)=>points.push({x:Math.max(6,Math.min(innerWidth-size-6,px)),y:py,size,at:Math.max(0,py-vh*.43)});
   const first=rect(document.querySelector('.opening-guide'));add(first.l,first.t, mobile?80:125);
   for(let i=1;i<6;i++){
    const section=document.querySelector(chapters[i][0]);const q=rect(section.querySelector('.question-home'));add(q.l,q.t,mobile?78:110);
    const photo=section.querySelector('.flow-photo');
    if(photo){const r=rect(photo);add(mobile?7:20,q.b+190,mobile?48:68);add(r.r-(mobile?32:45),r.t+r.h*.42,mobile?58:85);}
    else{const r=rect(section);add(mobile?7:20,q.b+220,mobile?48:68);add(r.r-(mobile?80:145),r.b-90,mobile?62:85);}
   }
   const end=rect(document.querySelector('.flow-ending>.maru'));add(end.l,end.t,mobile?110:150);points.sort((a,b)=>a.at-b.at);for(let i=1;i<points.length;i++)points[i].at=Math.max(points[i].at,points[i-1].at+1);route.current=points;
   obstacles.current=[...document.querySelectorAll('.flow-main h1,.flow-main h2,.flow-main h3,.flow-main p,.flow-main .flow-link,.ask-options,.answer-panel,.ending-links')].filter(e=>!e.closest('.question')).map(rect);
   document.documentElement.classList.add('travelling');setReady(true);update(window.scrollY);
  };
  measure();const ro=new ResizeObserver(measure);ro.observe(document.querySelector('.flow-main'));window.addEventListener('resize',measure);document.fonts.ready.then(measure);return()=>{ro.disconnect();window.removeEventListener('resize',measure);document.documentElement.classList.remove('travelling');};
 },[reduced]);
 useMotionValueEvent(scrollY,'change',update);
 return !reduced&&ready?<motion.div className="travelling-sekamaru" aria-hidden="true" style={{x,y,scale,rotate}}><Maru/></motion.div>:null;
}
function Photo({src,alt,className='',caption}) {
 const ref=useRef(null); const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,1],[85,-85]);const rotation=useTransform(scrollYProgress,[0,.5,1],[-4,0,3]);const scale=useTransform(scrollYProgress,[0,.4,1],[.9,1,1]);
 return <figure ref={ref} className={'flow-photo '+className}><motion.div style={{y:reduced?0:y,rotate:reduced?0:rotation,scale:reduced?1:scale}}><img src={'assets/'+src} alt={alt} loading="lazy"/></motion.div>{caption&&<figcaption>{caption}</figcaption>}</figure>;
}
const answers=[
 {q:'どんなことを頼めますか？',title:'人が集まる場を、企画から。',text:'イベント企画・プロデュースを軸に、企業とのコラボレーション、ロゴやWeb・LPの制作、AI講座を行っています。何を実現したいか、そこから一緒に考えます。',href:'contact.html',link:'相談できることを見る'},
 {q:'どうして、いろんな活動を？',title:'人の表現に、関わってきました。',text:'美容師、ヘアメイク、デザイン、そしてアートへ。今は、好きなことを表現し、リアルな体験ができる「場」をつくることに力を注いでいます。',href:'about.html',link:'これまでの歩みを読む'},
 {q:'AIで、どんな未来を？',title:'人間にしかできないことを、楽しむ。',text:'AIにできることはAIへ。人間は、人間にしか経験できないことをする。誰もが好きなことを楽しんで生きる社会を目指しています。',href:'creative.html',link:'デザイン・Web・AIの活動を見る'}
];
export function Home(){
 const [answer,setAnswer]=useState(0); const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll(); const rotate=useTransform(scrollYProgress,[0,1],[-18,24]);
 return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">本文へ移動</a>
 <header className="flow-header"><a href="index.html" className="flow-brand">石丸篤史<span>Art for Being</span></a><nav aria-label="メインナビゲーション"><a href="about.html">人物を知る</a><a href="projects.html">場をつくる</a><a href="art.html">アート</a><a href="contact.html">相談する ↗</a></nav></header>
 <motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>
 <Companion/>
 <main id="main" className="flow-main">
 <div className="life-thread" aria-hidden="true"/>
 <section className="opening" aria-labelledby="opening-title"><div className="opening-copy"><p className="eyebrow">石丸篤史 — 企画する人。表現する人。</p><h1 id="opening-title"><span>ありのままに</span><span>生きることが</span><span><em>アート</em>になる。</span></h1><p className="opening-lead">好きなことをし、表現し、リアルに体験する。<br/>そんな生き方ができる場を、つくっています。</p><a className="flow-link" href="#who">僕の話を、少し。<span>↓</span></a></div><figure className="opening-portrait"><img src="assets/portrait-main.jpg" width="1160" height="1800" alt="石丸篤史のポートレート" fetchPriority="high"/><figcaption>ISHIMARU ATSUSHI<br/>Art for Being 代表 / 世界のまる</figcaption></figure><motion.a href="#who" className="opening-guide" style={{rotate:reduced?0:rotate}} aria-label="石丸篤史の自己紹介へ"><Maru/><span>ねえ、石丸さん。</span></motion.a></section>
 <section id="who" className="conversation who"><Question number="01">石丸さんって、何をしている人？</Question><div className="answer-copy"><p className="speaker">石丸篤史</p><h2>人が、自分を<br/>表現できる<span className="hand-circle">場</span>を<br/>つくっています。</h2><p>美容、ヘアメイク、デザイン、アート。<br/>人の魅力を表現する仕事から、<br/>人が集まり、体験する場づくりへ。</p><p>今、いちばん力を注いでいるのは、<br/><strong>イベント企画・プロデュース</strong>です。</p><a href="about.html" className="flow-link">僕の歩みを読む<span>↗</span></a></div><Photo className="who-photo" src="host-speaking.jpg" alt="展示会場でマイクを持ち話す石丸篤史" caption="話す。出会う。場をつくる。"/></section>
 <section className="conversation gathering"><Question number="02">その「場」って、どんな場所？</Question><h2>ひとりの表現が、<br/><span>みんなの体験になる。</span></h2><Photo src="exhibition-audience.jpg" alt="100人のアーティスト展の会場に集まる来場者と石丸篤史" caption="100人のアーティスト展"/><div className="gathering-after"><p>プロも、アマチュアも。大人も、子どもも。<br/>「100人のアーティスト展」は、<br/>人が表現できる場をつくる活動です。<br/>出展者が運営の中心にもなり、展示を一緒につくっています。</p><div className="flow-stat"><strong>441<span>人の表現。</span></strong><p>累計出展者441名 · 累計来場者1,530名<br/>2024年8月〜2026年8月 / 全4回開催</p><a className="flow-link" href="projects.html">場づくりの裏側を見る<span>↗</span></a></div></div></section>
 <section className="conversation expression"><Question number="03">石丸さん自身も、表現しているの？</Question><div className="art-answer"><p className="speaker">世界のまる / セカマル</p><h2>僕も、<br/>つくる人です。</h2><p>2023年3月、アート活動を始めました。<br/>名前は「世界のまる」。<br/>色と形で表現することも、僕の活動のひとつです。</p><a href="art.html" className="flow-link">作品の世界へ<span>↗</span></a></div><a className="art-door" href="art.html" aria-label="世界のまるの作品を見る"><Photo src="art-earth.jpg" alt="石丸篤史が描いた地球と宇宙の作品"/><span>世界のまるの作品を見る ↗</span></a><Photo className="making-note" src="artist-making.jpg" alt="ペインティングナイフで作品を制作する石丸篤史" caption="手を動かす。その時間も、アート。"/></section>
 <section id="vision" className="conversation vision"><Question number="04">AIを使うのも、そのため？</Question><div className="vision-copy"><p className="speaker">僕が目指している社会</p><h2>AIにできることは、AIへ。<br/><span>人間は、</span><br/>人間にしかできないことを<br/><em>楽しんで生きる。</em></h2><p>誰もが好きなことをやっている状況をつくりたい。<br/>日本人の幸福度を高めたい。<br/>AI講座も、バリ島でのリアルな体験につながる企画も、<br/>その想いにつながっています。</p></div><div className="life-words" aria-label="人間にしか経験できないこと"><span>出会う。</span><span>感じる。</span><span>つくる。</span><span>生きる。</span></div></section>
 <section className="conversation ask"><Question number="05">もう少し、聞いてもいい？</Question><div className="ask-layout"><div className="ask-options" role="tablist" aria-label="石丸篤史への質問">{answers.map((item,i)=><button id={'q-'+i} aria-controls="answer-panel" role="tab" aria-selected={answer===i} tabIndex={answer===i?0:-1} key={item.q} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();const n=(i+((e.key==='ArrowUp'||e.key==='ArrowLeft')?-1:1)+answers.length)%answers.length;setAnswer(n);document.getElementById('q-'+n)?.focus();}}} onClick={()=>setAnswer(i)}><span>{item.q}</span><span aria-hidden="true">{answer===i?'−':'＋'}</span></button>)}</div><div role="tabpanel" id="answer-panel" aria-labelledby={'q-'+answer} tabIndex={0} className="answer-panel"><AnimatePresence mode="wait" initial={false}><motion.div key={answer} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:.2}}><h3>{answers[answer].title}</h3><p>{answers[answer].text}</p><a className="flow-link" href={answers[answer].href}>{answers[answer].link}<span>↗</span></a></motion.div></AnimatePresence></div></div></section>
 <section className="flow-ending"><Maru/><p>次は、あなたの話を。</p><h2>どんな場を、<br/>一緒につくりましょう。</h2><a href="contact.html" className="flow-link">企画・協賛・制作の相談について<span>↗</span></a><div className="ending-links"><a href="about.html">人物と歩み</a><a href="projects.html">企画・プロデュース</a><a href="art.html">アート</a><a href="creative.html">デザイン・Web・AI</a></div></section>
 </main><footer className="flow-footer"><span>石丸篤史 / Art for Being</span><span>ありのままに生きることがアートになる</span><a href="#main">最初へ ↑</a></footer></MotionConfig>
}
