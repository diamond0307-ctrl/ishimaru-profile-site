import React from 'react';
import {hydrateRoot, createRoot} from 'react-dom/client';
import {motion, MotionConfig, useScroll, useTransform, useReducedMotion} from 'motion/react';
import {Home,Maru} from './Home.jsx';
function ReadingGuide(){const {scrollYProgress}=useScroll();const reduced=useReducedMotion();const rotate=useTransform(scrollYProgress,[0,1],[-15,15]);return <MotionConfig reducedMotion="user"><motion.div className="reading-progress" style={{scaleX:scrollYProgress}}/><motion.a className="return-guide" href="index.html#who" style={{rotate:reduced?0:rotate}} aria-label="石丸篤史の話へ戻る"><Maru small/><span>僕の話へ</span></motion.a></MotionConfig>}
if(document.getElementById('flow-root'))hydrateRoot(document.getElementById('flow-root'),<Home/>);
else {const root=document.createElement('div');document.body.append(root);createRoot(root).render(<ReadingGuide/>);}
