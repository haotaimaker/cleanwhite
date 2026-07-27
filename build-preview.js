/* ============================================================
   build-preview.js — 境白空間清潔 本機預覽組裝器
   用法:node build-preview.js
   將 css/ + 各頁 skeleton + shared/ 組成單一 preview.html。
   preview.html 是「產物」,不要手改;要改內容改來源檔再重組。
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const baseCss = read('css/bj-base.css');
const pages = [
  read('home/skeleton.html'),
  read('services/skeleton.html'),
  read('about/skeleton.html'),
  read('contact/skeleton.html'),
];
const navFooter = read('shared/nav-footer.html');
const motion = read('shared/motion.html');
const chat = read('shared/chat.html');

/* 假頁面路由:與正式上線用的是同一份 shared/router.html(預覽 = 線上,零落差) */
const router = read('shared/router.html').trimEnd();

const html = [
  '<!doctype html>',
  '<html lang="zh-Hant">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>境白空間清潔 — 本機預覽</title>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;900&family=Jost:wght@300;400;500;600&display=swap">',
  '<style>',
  baseCss.trimEnd(),
  '#bj-preload-broom{animation:bjpl-sweep .95s ease-in-out infinite;}@keyframes bjpl-sweep{0%,100%{transform:rotate(-11deg)}50%{transform:rotate(11deg)}}#bj-preload{animation:bjpl-safe 0s linear 8s forwards;}@keyframes bjpl-safe{to{opacity:0;visibility:hidden;}}',
  '</style>',
  '</head>',
  '<body>',
  '<div id="bj-preload" style="position:fixed;inset:0;z-index:2147483000;background:linear-gradient(160deg,#EAF2FC,#FFFFFF);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;"><svg id="bj-preload-broom" viewBox="0 0 24 24" fill="none" stroke="#15273F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:56px;height:56px;transform-origin:50% 16%;"><path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" fill="#EAF1FC"/><path d="m8 22 1-4"/></svg><span style="font-family:\'Noto Sans TC\',sans-serif;font-size:14px;font-weight:600;letter-spacing:.25em;color:#15273F;">載入中...</span></div>',
  '<div class="BJ-Base-App" id="bj-preview-root">',
  pages.map(p => p.trimEnd()).join('\n'),
  '</div>',
  navFooter.trimEnd(),
  motion.trimEnd(),
  chat.trimEnd(),
  router,
  '</body>',
  '</html>',
  '',
].join('\n');

fs.writeFileSync(path.join(ROOT, 'preview.html'), html);
console.log('✅ preview.html 已重新組裝 (' + html.split('\n').length + ' 行)');
