import React,{useId} from 'react';
import {motion,MotionConfig,useReducedMotion,useScroll} from 'motion/react';
import workSvg from './work-poster.svg';

export function Maru({small=false}) {
 const id=useId();
 return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><defs><clipPath id={id}><ellipse cx="1200" cy="1470" rx="700" ry="640"/><ellipse cx="755" cy="930" rx="145" ry="150"/><ellipse cx="1645" cy="925" rx="145" ry="150"/></clipPath></defs><g clipPath={'url(#'+id+')'}><rect x="480" y="740" width="1450" height="1420" fill="white"/><image href="assets/sekamaru-original.png" width="2481" height="3508"/></g></svg>;
}
function Link({children,href}){return <a className="gallery-link" href={href}><span>{children}</span><span aria-hidden="true">↗</span></a>}
export function Home(){
 const reduced=useReducedMotion(),{scrollYProgress}=useScroll();
 return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">本文へ移動</a><motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/><main id="main" className="play-lp gallery-lp">
  <section className="play-hero" aria-labelledby="play-title"><header className="play-header"><a className="play-brand" href="index.html" aria-label="石丸篤史 トップページ">ATSUSHI ISHIMARU<span>ART FOR BEING</span></a><nav aria-label="ページ内の案内"><a href="#daruma">自然</a><a href="#exhibition">展覧会</a><a href="#art">アート</a><a href="#design">デザイン</a></nav></header><h1 className="sr-only" id="play-title">石丸篤史。真剣と書いて、遊びと読む。ヘアメイク、デザイン、アート、イベント、AIが仕事です。</h1><div className="play-poster" aria-hidden="true"><div className="play-poster-art" dangerouslySetInnerHTML={{__html:workSvg}}/>{!reduced&&<div className="play-floating"><span>ヘアメイク</span><span>デザイン</span><span>アート</span><span>イベント</span><span>AI</span></div>}</div><a className="play-scroll" href="#daruma">SCROLL <span aria-hidden="true">↓</span></a></section>

  <section className="gallery-panel gallery-nature" id="daruma" aria-labelledby="nature-title"><div className="gallery-photo gallery-nature-photo"><img src="assets/daruma-bamboo.jpg" alt="だるま農園の竹林" loading="lazy"/></div><div className="gallery-number">01 / DARUMA FARM</div><h2 id="nature-title" className="gallery-display">自<span>然</span></h2><div className="gallery-caption"><p>だるま農園</p><span>竹林で、あそぶ。</span></div><img className="gallery-nature-inset" src="assets/daruma-life.jpg" alt="だるま農園で動物たちと過ごす風景" loading="lazy"/></section>

  <section className="gallery-panel gallery-exhibition" id="exhibition" aria-labelledby="exhibition-title"><div className="gallery-photo"><img src="assets/exhibition-hall.jpg" alt="100人のアーティスト展の会場" loading="lazy"/></div><div className="gallery-exhibition-copy"><span className="gallery-number">02 / 100 ARTISTS</span><h2 id="exhibition-title" className="gallery-display">集<span>う。</span></h2><p>100人のアーティスト展</p><Link href="projects.html">展覧会を見る</Link></div></section>

  <section className="gallery-art" id="art" aria-labelledby="art-title"><div className="gallery-art-head"><span>03 / SEKAI NO MARU</span><h2 id="art-title">アート<span>。</span></h2><Link href="art.html">作品を見る</Link></div><div className="gallery-art-images"><figure><img src="assets/art-nature.jpg" alt="自然をモチーフにしたアート作品" loading="lazy"/></figure><figure><img src="assets/art-earth.jpg" alt="地球と宇宙を描いたアート作品" loading="lazy"/></figure></div></section>

  <section className="gallery-panel gallery-design" id="design" aria-labelledby="design-title"><div className="gallery-photo"><img src="assets/creative-hakataori.jpg" alt="博多織とのコラボレーションに関連する売場" loading="lazy"/></div><div className="gallery-design-copy"><span className="gallery-number">04 / DESIGN</span><h2 id="design-title" className="gallery-display">デザイン<span>。</span></h2><Link href="creative.html">制作を見る</Link></div></section>

  <section className="gallery-outro" aria-labelledby="outro-title"><div className="gallery-outro-top"><span>ATSUSHI ISHIMARU</span><span>ART FOR BEING</span></div><h2 id="outro-title">生きることを、<br/>表現しよう。</h2><div className="gallery-outro-links"><Link href="about.html">石丸篤史について</Link><Link href="creative.html#ai-lecture">AIの活動について</Link><Link href="contact.html">企画・制作の相談</Link></div><footer><span>© ATSUSHI ISHIMARU</span><a href="#main">BACK TO TOP ↑</a></footer></section>
 </main></MotionConfig>;
}
