/* ============================================================
   build-preview.js — 白境空間清潔 本機預覽組裝器
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

/* 預覽專用 SPA router:攔截站內連結、切換頁面 div、觸發 bj:pageshow */
const router = `<script>
(function () {
  var MAP = { '/': 'bj-home', '/services': 'bj-services', '/about': 'bj-about', '/contact': 'bj-contact' };
  var PAGES = ['bj-home', 'bj-services', 'bj-about', 'bj-contact'];
  function setActive(path){ document.querySelectorAll('.bj-nav__link, .bj-nav__mobile a').forEach(function(a){ a.classList.toggle('bj-nav__link--active', a.getAttribute('href')===path); }); }
  function show(path){
    var id=MAP[path]||'bj-home';
    PAGES.forEach(function(p){ var el=document.getElementById(p); if(el) el.style.display=(p===id)?'':'none'; });
    setActive(path);
    var panel=document.querySelector('.bj-nav__mobile'); if(panel) panel.classList.remove('bj-nav__mobile--open');
    var tog=document.querySelector('.bj-nav__toggle'); if(tog) tog.setAttribute('aria-expanded','false');
    window.scrollTo(0,0);
    document.dispatchEvent(new Event('bj:pageshow'));
  }
  document.addEventListener('click', function(e){
    var a=e.target.closest?e.target.closest('a'):null; if(!a) return;
    var href=a.getAttribute('href');
    if(href && href.charAt(0)==='/' && MAP.hasOwnProperty(href)){
      e.preventDefault();
      if(window.bjCurtain){ window.bjCurtain(function(){ show(href); }); } else { show(href); }
    }
  });
  document.addEventListener('DOMContentLoaded', function(){ show('/'); });
})();
<\/script>`;

const html = [
  '<!doctype html>',
  '<html lang="zh-Hant">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>白境空間清潔 — 本機預覽</title>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;900&family=Jost:wght@300;400;500;600&display=swap">',
  '<style>',
  baseCss.trimEnd(),
  '</style>',
  '</head>',
  '<body>',
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
