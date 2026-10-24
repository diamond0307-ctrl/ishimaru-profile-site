import React, {useId} from 'react';
import {motion, MotionConfig, useReducedMotion, useScroll} from 'motion/react';

export function Maru({small=false}) {
  const id=useId();
  return <svg className={small?'maru small':'maru'} viewBox="480 740 1450 1420" role="img" aria-label="せかまる"><defs><clipPath id={id}><ellipse cx="1200" cy="1470" rx="700" ry="640"/><ellipse cx="755" cy="930" rx="145" ry="150"/><ellipse cx="1645" cy="925" rx="145" ry="150"/></clipPath></defs><g clipPath={'url(#'+id+')'}><rect x="480" y="740" width="1450" height="1420" fill="white"/><image href="assets/sekamaru-original.png" width="2481" height="3508"/></g></svg>;
}

const practices=[
  {number:'01',en:'HAIR & MAKEUP',name:'ヘアメイク',description:'一人ひとりが持つ魅力を見つけ、引き出す。表現の原点になった仕事。',href:'about.html',image:null},
  {number:'02',en:'DESIGN',name:'デザイン',description:'ロゴ、アパレル、Web。伝えたい価値を、届くかたちにする。',href:'creative.html',image:'assets/creative-hakataori.jpg',alt:'博多織とのコラボレーションに関連する売場'},
  {number:'03',en:'ART',name:'アート',description:'「世界のまる」として、感じたことを色と形で表現する。',href:'art.html',image:'assets/art-earth.jpg',alt:'世界のまるによる地球と宇宙を描いた作品の一部'},
  {number:'04',en:'EVENT',name:'イベント',description:'表現する人が集まり、参加できる場を企画し、つくる。',href:'projects.html',image:'assets/exhibition-hall.jpg',alt:'100人のアーティスト展の会場'}
];

function Arrow({children,href,className=''}) {
  return <a className={'lp-arrow-link '+className} href={href}><span>{children}</span><span aria-hidden="true">↗</span></a>;
}

export function Home() {
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll();
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">本文へ移動</a>
    <motion.div className="reading-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>
    <main id="main" className="lp">
      <section className="lp-hero" aria-labelledby="lp-title">
        <div className="lp-hero-rule" aria-hidden="true"/>
        <header className="lp-header">
          <a href="index.html" className="lp-brand" aria-label="石丸篤史 トップページ"><span>ATSUSHI ISHIMARU</span><small>Art for Being</small></a>
          <nav aria-label="ページ内の案内"><a href="#philosophy">考え方</a><a href="#practice">活動</a><a href="#ai">AI</a><a href="about.html">プロフィール ↗</a></nav>
        </header>
        <div className="lp-hero-copy">
          <p className="lp-hero-kicker">THIS IS MY WAY OF LIFE.</p>
          <h1 id="lp-title" className="lp-hero-title" aria-label="真剣と書いて、あそびと読む">
            <span className="lp-hero-kanji" aria-hidden="true">真<br/>剣</span>
            <span className="lp-hero-reading" aria-hidden="true">あ<br/>そ<br/>び</span>
          </h1>
        </div>
        <div className="lp-hero-portrait"><img src="assets/ishimaru-hero-cutout.png" alt="石丸篤史" width="1171" height="1343" fetchPriority="high"/></div>
        <div className="lp-hero-bottom"><div><p className="lp-hero-line">それが、僕の仕事です。</p><p className="lp-hero-name">石丸篤史 <span>／ 世界のまる</span></p></div><a href="#philosophy" className="lp-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="lp-philosophy lp-section" id="philosophy" aria-labelledby="philosophy-title">
        <div className="lp-section-head"><span>01 / THE IDEA</span><span>ART FOR BEING</span></div>
        <div className="lp-philosophy-layout">
          <div className="lp-philosophy-copy"><p className="lp-overline">表現する自由。</p><h2 id="philosophy-title">いまの自分を、<br/><em>出していい。</em></h2><p className="lp-body">人目を気にせず、現在の自分を表すこと。<br/>表現の仕方に、決まった正解はありません。<br/>僕は、自分にできる方法で、それを続けてきました。</p><span className="lp-side-note">BE WHO YOU ARE.<br/>MAKE WHAT YOU FEEL.</span></div>
          <figure className="lp-philosophy-image"><img src="assets/artist-making.jpg" alt="石丸篤史が作品を制作している様子" width="1350" height="1800" loading="lazy"/><figcaption>表現することから、場をつくることへ。</figcaption></figure>
        </div>
      </section>

      <section className="lp-practice lp-section" id="practice" aria-labelledby="practice-title">
        <div className="lp-section-head"><span>02 / WHAT I DO</span><span>FOUR WAYS TO EXPRESS</span></div>
        <div className="lp-practice-intro"><h2 id="practice-title">手段は、<br/>ひとつじゃない。</h2><p>ヘアメイクから始まり、デザイン、アート、イベントへ。<br/>表現する対象や方法を変えながら、活動を広げてきました。</p></div>
        <div className="lp-practice-grid">{practices.map((item,i)=><motion.a key={item.number} href={item.href} className={'lp-practice-card lp-practice-card-'+i} whileHover={reduced?undefined:{y:-5}} transition={{duration:.22}}><div className="lp-practice-card-top"><span>{item.number} / {item.en}</span><span aria-hidden="true">↗</span></div>{item.image?<div className="lp-practice-media"><img src={item.image} alt={item.alt} loading="lazy"/></div>:<div className="lp-practice-type" aria-hidden="true">人の<br/>魅力を。</div>}<div className="lp-practice-card-bottom"><h3>{item.name}</h3><p>{item.description}</p></div></motion.a>)}</div>
      </section>

      <section className="lp-event" aria-labelledby="event-title"><div className="lp-event-photo"><img src="assets/portrait-exhibition.jpg" alt="作品が並ぶ100人のアーティスト展の会場にいる石丸篤史" loading="lazy"/></div><div className="lp-event-panel"><span className="lp-event-label">03 / MAKE A PLACE</span><h2 id="event-title">自分が表現する。<br/>その先に、<br/>人が表現できる場を。</h2><p>「100人のアーティスト展」を主催。出展する人たちも運営に参加し、一緒に場をつくっています。</p><div className="lp-event-facts"><div><strong>4</strong><span>開催回数</span></div><div><strong>441</strong><span>累計出展者数</span></div><div><strong>1,530</strong><span>累計来場者数</span></div></div><Arrow href="projects.html">100人のアーティスト展を見る</Arrow><small>2024年8月〜2026年8月の累計</small></div></section>

      <section className="lp-ai lp-section" id="ai" aria-labelledby="ai-title"><div className="lp-section-head"><span>04 / WHAT'S NEXT</span><span>AI & HUMAN TIME</span></div><div className="lp-ai-layout"><div className="lp-ai-symbol" aria-hidden="true">AI<span>×</span>HUMAN</div><div className="lp-ai-copy"><p className="lp-overline">これからの手段。</p><h2 id="ai-title">仕事を、<br/>もっと身軽に。</h2><p>AIを使った仕事の効率化も応援しています。<br/>人が、自分の時間をもっと自分らしく使えるように。</p><Arrow href="creative.html#ai-lecture">AIの活動について見る</Arrow></div></div></section>

      <section className="lp-ending" aria-labelledby="ending-title"><p className="lp-ending-label">ART FOR BEING</p><h2 id="ending-title">生きることを、<br/>表現しよう。</h2><p>企画も、作品も、まだ名前のないアイデアも。<br/>一緒に、かたちにしていきたい。</p><div className="lp-ending-links"><Arrow href="about.html">石丸篤史について</Arrow><Arrow href="contact.html">企画・制作の相談について</Arrow></div><footer><span>© ATSUSHI ISHIMARU</span><a href="#main">BACK TO TOP ↑</a></footer></section>
    </main>
  </MotionConfig>;
}
