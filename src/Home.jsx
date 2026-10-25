import React,{useId,useRef} from 'react';
import {motion,MotionConfig,useReducedMotion,useScroll,useTransform} from 'motion/react';
import workSvg from './work-poster.svg';

export function Maru({small=false}) {
 const id=useId();
 return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><defs><clipPath id={id}><ellipse cx="1200" cy="1470" rx="700" ry="640"/><ellipse cx="755" cy="930" rx="145" ry="150"/><ellipse cx="1645" cy="925" rx="145" ry="150"/></clipPath></defs><g clipPath={'url(#'+id+')'}><rect x="480" y="740" width="1450" height="1420" fill="white"/><image href="assets/sekamaru-original.png" width="2481" height="3508"/></g></svg>;
}

function Link({children,href}){return <a className="gallery-link" href={href}><span>{children}</span><span aria-hidden="true">↗</span></a>}

function reveal(reduced,y=52,delay=0){
 return {initial:{opacity:.68,y},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.35},transition:{duration:.75,delay,ease:[.2,.8,.2,1]}};
}

function GalleryPhoto({src,alt,className=''}){
 const ref=useRef(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,1],[-48,48]);
 return <div ref={ref} className={'gallery-photo '+className}><motion.img src={src} alt={alt} loading="lazy" style={{y:reduced?0:y,scale:reduced?1:1.16}}/></div>;
}

export function Home(){
 const reduced=useReducedMotion(),{scrollYProgress}=useScroll();
 return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">本文へ移動</a><motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/><main id="main" className="play-lp gallery-lp">
  <section className="play-hero" aria-labelledby="play-title"><header className="play-header"><a className="play-brand" href="index.html" aria-label="石丸篤史 トップページ">ATSUSHI ISHIMARU<span>ART FOR BEING</span></a><nav aria-label="ページ内の案内"><a href="#daruma">自然</a><a href="#exhibition">展覧会</a><a href="#art">アート</a><a href="#design">デザイン</a><a href="#ai">AI講座</a></nav></header><h1 className="sr-only" id="play-title">石丸篤史。真剣と書いて、遊びと読む。ヘアメイク、デザイン、アート、イベント、AIが仕事です。</h1><div className="play-poster" aria-hidden="true"><div className="play-poster-art" dangerouslySetInnerHTML={{__html:workSvg}}/><div className="play-floating"><span>ヘアメイク</span><span>デザイン</span><span>アート</span><span>イベント</span><span>AI</span></div></div><a className="play-mobile-cta" href="https://www.instagram.com/sekai_no_maru/" target="_blank" rel="noopener noreferrer">お仕事の依頼はこちら <span aria-hidden="true">↗</span></a><a className="play-scroll" href="#daruma">SCROLL <span aria-hidden="true">↓</span></a></section>

  <section className="gallery-panel gallery-nature" id="daruma" aria-labelledby="nature-title"><GalleryPhoto className="gallery-nature-photo" src="assets/daruma-bamboo.jpg" alt="だるま農園の竹林"/><motion.div className="gallery-number" {...reveal(reduced,28)}>01 / DIRECTION</motion.div><motion.h2 id="nature-title" className="gallery-display" {...reveal(reduced,88,.08)}>自<span>然</span></motion.h2><motion.div className="gallery-caption" {...reveal(reduced,42,.18)}><p>竹林プロデュース</p><span>竹林で、あそぶ。</span></motion.div><img className="gallery-nature-inset" src="assets/daruma-life.jpg" alt="だるま農園で動物たちと過ごす風景" loading="lazy"/></section>

  <section className="gallery-panel gallery-exhibition" id="exhibition" aria-labelledby="exhibition-title"><GalleryPhoto src="assets/exhibition-hall.jpg" alt="100人のアーティスト展の会場"/><div className="gallery-exhibition-copy"><motion.span className="gallery-number" {...reveal(reduced,24)}>02 / 100 ARTISTS</motion.span><motion.h2 id="exhibition-title" className="gallery-display" {...reveal(reduced,74,.08)}>集<span>う。</span></motion.h2><motion.p {...reveal(reduced,32,.16)}>100人のアーティスト展を主催</motion.p><Link href="projects.html">展覧会を見る</Link></div></section>

  <section className="gallery-art" id="art" aria-labelledby="art-title"><div className="gallery-art-head"><span>03 / SEKAI NO MARU</span><motion.h2 id="art-title" {...reveal(reduced,78)}>アート<span>。</span></motion.h2><Link href="art.html">作品を見る</Link></div><div className="gallery-art-images"><motion.figure {...reveal(reduced,48)}><img src="assets/art-nature.jpg" alt="自然をモチーフにしたアート作品" loading="lazy"/></motion.figure><motion.figure {...reveal(reduced,60,.12)}><img src="assets/art-earth.jpg" alt="地球と宇宙を描いたアート作品" loading="lazy"/></motion.figure></div></section>

  <section className="gallery-panel gallery-design" id="design" aria-labelledby="design-title"><GalleryPhoto src="assets/creative-hakataori.jpg" alt="博多織とのコラボレーションに関連する売場"/><div className="gallery-design-copy"><motion.span className="gallery-number" {...reveal(reduced,26)}>04 / DESIGN</motion.span><motion.h2 id="design-title" className="gallery-display" {...reveal(reduced,84,.08)}>デザイン<span>。</span></motion.h2><motion.p className="gallery-design-services" {...reveal(reduced,28,.16)}>ブランド構築<span>／</span>LP制作<span>／</span>ロゴ制作<span>／</span>アパレルデザイン<span>／</span>HP制作</motion.p><Link href="creative.html">制作を見る</Link></div></section>

  <section className="gallery-ai" id="ai" aria-labelledby="ai-title"><div className="gallery-ai-top"><span>05 / AI & HUMAN</span><span>ART FOR BEING</span></div><div className="gallery-ai-stage"><motion.div className="gallery-ai-message" {...reveal(reduced,60)}><h2 id="ai-title">AIで、<br/>人間の<br/><span>時間をつくる。</span></h2><p>仕事の効率化をお手伝いします。</p></motion.div><motion.img className="gallery-ai-person" src="assets/ishimaru-hero-cutout.png" alt="石丸篤史のポートレート" loading="lazy" {...reveal(reduced,46,.12)}/></div><div className="gallery-ai-bottom"><div className="gallery-ai-work"><p>できること</p><ul><li>事業内容を聞き、効率化できるか診断</li><li>電話予約の自動化構築</li><li>公式LINE構築</li><li>AI×デザイン講座</li><li>AI×SNS講座</li></ul></div><div className="gallery-ai-class"><p>10.31 / 無料オンライン講座</p><a className="gallery-link" href="https://diamond0307-ctrl.github.io/AI_creator/" target="_blank" rel="noopener noreferrer"><span>無料講座を見る</span><span aria-hidden="true">↗</span></a></div></div></section>

  <section className="gallery-outro" aria-labelledby="outro-title"><div className="gallery-outro-top"><span>ATSUSHI ISHIMARU</span><span>ART FOR BEING</span></div><motion.h2 id="outro-title" {...reveal(reduced,76)}>ありのままを<br/>表現しよう。</motion.h2><motion.div className="gallery-outro-links" {...reveal(reduced,30,.12)}><Link href="about.html">石丸篤史について</Link><Link href="creative.html#ai-lecture">AIの活動について</Link><a className="gallery-link" href="https://www.instagram.com/sekai_no_maru/" target="_blank" rel="noopener noreferrer"><span>Instagramで相談する</span><span aria-hidden="true">↗</span></a></motion.div><footer><span>© ATSUSHI ISHIMARU</span><a href="#main">BACK TO TOP ↑</a></footer></section>
 </main></MotionConfig>;
}
