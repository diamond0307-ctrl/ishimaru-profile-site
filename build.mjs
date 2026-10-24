import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import React from 'react';
import {renderToString} from 'react-dom/server';
await mkdir('.build',{recursive:true});
await build({entryPoints:['src/Home.jsx'],outfile:'.build/home.mjs',bundle:true,platform:'node',format:'esm',packages:'external'});
const {Home}=await import('./.build/home.mjs?'+Date.now());
await build({entryPoints:['src/client.jsx'],outfile:'dist/flow.js',bundle:true,minify:true,format:'esm',define:{'process.env.NODE_ENV':'"production"'}});
const html=renderToString(React.createElement(Home));
await writeFile('dist/index.html',`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>石丸篤史 — ありのままに生きることがアートになる | Art for Being</title><meta name="description" content="石丸篤史 / Art for Being代表。イベント企画・プロデュース、アート、デザイン、AI。人が好きなことを表現し、人間にしかできない体験を楽しむ場をつくっています。"><meta name="robots" content="noindex,nofollow"><link rel="canonical" href="https://ishimaru-atsushi-profile.sekamaru.chatgpt.site/"><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="flow.css"><script type="module" src="flow.js"></script></head><body class="flow-home"><div id="flow-root">${html}</div></body></html>`);
for(const name of ['about','projects','art','creative','contact']){
 let text=await readFile('dist/'+name+'.html','utf8');
 if(!text.includes('continuity.css'))text=text.replace('</head>','<link rel="stylesheet" href="continuity.css"><script type="module" src="flow.js"></script></head>');
 text=text.replace(/<figcaption class="photo-role">[\s\S]*?<\/figcaption>/g,'').replace(/[ \t]+$/gm,'');
 await writeFile('dist/'+name+'.html',text);
}
console.log('Built six pages, pre-rendered HOME and bundled Motion for React.');
