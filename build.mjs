import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import React from 'react';
import {renderToString} from 'react-dom/server';
await mkdir('.build',{recursive:true});
await build({entryPoints:['src/Home.jsx'],outfile:'.build/home.mjs',bundle:true,platform:'node',format:'esm',packages:'external',loader:{'.svg':'text'}});
const {Home}=await import('./.build/home.mjs?'+Date.now());
await build({entryPoints:['src/client.jsx'],outfile:'dist/flow.js',bundle:true,minify:true,format:'esm',define:{'process.env.NODE_ENV':'"production"'},loader:{'.svg':'text'}});
const html=renderToString(React.createElement(Home));
await writeFile('dist/index.html',`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>石丸篤史 — 真剣と書いて、遊びと読む。| Art for Being</title><meta name="description" content="真剣と書いて、遊びと読む。石丸篤史のヘアメイク、デザイン、アート、イベント企画、AIの活動を紹介します。"><meta name="robots" content="noindex,nofollow"><link rel="canonical" href="https://ishimaru-atsushi-profile.sekamaru.chatgpt.site/"><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="flow.css"><script type="module" src="flow.js"></script></head><body class="flow-home"><div id="flow-root">${html}</div></body></html>`);
const homePage=await readFile('dist/index.html','utf8');
await writeFile('dist/index.html',homePage.replace('</head>','<link rel="stylesheet" href="play.css"></head>'));
for(const name of ['about','projects','art','creative','contact']){
 let text=await readFile('dist/'+name+'.html','utf8');
 if(!text.includes('continuity.css'))text=text.replace('</head>','<link rel="stylesheet" href="continuity.css"><script type="module" src="flow.js"></script></head>');
 text=text.replace(/<figcaption class="photo-role">[\s\S]*?<\/figcaption>/g,'').replace(/[ \t]+$/gm,'');
 await writeFile('dist/'+name+'.html',text);
}
console.log('Built six pages, pre-rendered HOME and bundled Motion for React.');
for(const name of ['about','projects','art','creative','contact']) {
 const page=await readFile('dist/'+name+'.html','utf8');
 if(!page.includes('atelier.css')) await writeFile('dist/'+name+'.html',page.replace('</head>','<link rel="stylesheet" href="atelier.css"></head>'));
}
