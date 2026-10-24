import React, {useRef, useState, useEffect} from 'react';
import {motion, MotionConfig, useScroll, useTransform, useReducedMotion, AnimatePresence, useSpring, useMotionValueEvent} from 'motion/react';

export function Maru({small=false}) {
  return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><image href="assets/sekamaru-original.png" width="2481" height="3508"/></svg>;
}
function Question({children,number}) {return <div className="question"><b aria-hidden="true">{number}</b><p><span>せかまるから、石丸さんへ</span>{children}</p></div>}
const chapters=[['.opening','せかまると、石丸さんの話。'],['.who','石丸さんって、何をしている人？'],['.gathering','その「場」って、どんな場所？'],['.expression','石丸さん自身も、表現しているの？'],['.vision','AIを使うのも、そのため？'],['.ask','もう少し、聞いてもいい？'],['.flow-ending','次は、あなたの話も聞かせて。']];
function Companion(){
 const rail=useRef(null), starts=useRef([]), current=useRef(0);const [active,setActive]=useState(0),[travel,setTravel]=useState(0);
 const reduced=useReducedMotion();const {scrollY,scrollYProgress}=useScroll();
 const x=useTransform(scrollYProgress,[0,1],[0,travel]);const smoothX=useSpring(x,{stiffness:150,damping:25});
 const bob=useTransform(()=>Math.sin(scrollY.get()/65)*7);const tilt=useTransform(()=>Math.sin(scrollY.get()/130)*9);
 useEffect(()=>{const measure=()=>{setTravel(Math.max(0,rail.current.clientWidth-rail.current.querySelector('button').offsetWidth));starts.current=chapters.map(([selector])=>document.querySelector(selector).getBoundingClientRect().top+window.scrollY);};measure();const ro=new ResizeObserver(measure);ro.observe(document.body);ro.observe(rail.current);window.addEventListener('resize',measure);return()=>{ro.disconnect();window.removeEventListener('resize',measure);};},[]);
 useMotionValueEvent(scrollY,'change',value=>{let next=0;for(let i=0;i<starts.current.length;i++)if(value+window.innerHeight*.4>=starts.current[i])next=i;if(next!==current.current){current.current=next;setActive(next);}});
 const next=()=>document.querySelector(chapters[Math.min(active+1,chapters.length-1)][0]).scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
 return <aside className="companion" aria-label="せかまると一緒に読む"><div className="companion-copy"><span>せかまると歩く / {String(active+1).padStart(2,'0')}</span><AnimatePresence mode="wait" initial={false}><motion.p key={active} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.15}}>{chapters[active][1]}</motion.p></AnimatePresence></div><div ref={rail} className="companion-rail"><div className="walking-line"/><motion.button className="walking-maru" onClick={next} aria-label="次の問いへ進む" style={{x:reduced?0:smoothX,y:reduced?0:bob,rotate:reduced?0:tilt}}><Maru/><span>つづきへ ↓</span></motion.button></div></aside>;
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
