/* ============================================================
   build-deploy.js — 白境空間清潔 1shop 上線檔產生器(假頁面單頁版)
   用法:node build-deploy.js
   產出 deploy/ 兩份「複製整份、貼進 1shop 欄位」的檔案:
     1-global-head.html  → 貼進 1shop 全域自訂 head(貼一次)
     2-one-page.html     → 貼進「那一頁」的自訂 HTML
   兩份都是產物,勿手改;改內容改 css/skeleton/shared 來源檔再重跑。
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const FONT_LINKS = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;900&family=Jost:wght@300;400;500;600&display=swap">',
].join('\n');

/* ── ① 全域 head:CSS + 共用導覽/動效/聊天/假路由 ── */
const globalHead = [
  '<!-- ═══════════════════════════════════════════════════════════',
  '     白境空間清潔 · 全域 head(貼進 1shop 全域自訂 head,整站貼一次)',
  '     上線前:改下方「設定區」的 LINE 連結(搜尋「設定區」)',
  '     ═══════════════════════════════════════════════════════════ -->',
  FONT_LINKS,
  '<style>',
  read('css/bj-base.css').trimEnd(),
  '</style>',
  read('shared/nav-footer.html').trimEnd(),
  read('shared/motion.html').trimEnd(),
  read('shared/chat.html').trimEnd(),
  read('shared/router.html').trimEnd(),
  '',
].join('\n');

/* ── ② 單一頁面:4 個假頁面區塊(去掉預覽用腳本與識別標籤)── */
function cleanPage(file, id) {
  var s = read(file);
  var i = s.indexOf('<script>');           // 預覽用「顯示腳本 + 識別標籤」都在第一個 <script> 之後
  if (i !== -1) s = s.slice(0, i);
  s = s.trimEnd();
  if (id === 'bj-home') {                   // 首頁區塊預設就顯示(免首屏空白),其餘由路由控制
    s = s.replace('<div id="bj-home" class="BJ-Base-App" style="display:none">',
                  '<div id="bj-home" class="BJ-Base-App">');
  }
  return s;
}
const PAGE_FILES = [
  ['home/skeleton.html', 'bj-home'],
  ['services/skeleton.html', 'bj-services'],
  ['about/skeleton.html', 'bj-about'],
  ['contact/skeleton.html', 'bj-contact'],
];
const onePage = [
  '<!-- ═══════════════════════════════════════════════════════════',
  '     白境空間清潔 · 頁面內容(貼進 1shop「那一頁」的自訂 HTML 區塊)',
  '     整站都在這一頁:4 個區塊靠導覽列假路由切換,做出換頁錯覺',
  '     ═══════════════════════════════════════════════════════════ -->',
  '<div class="BJ-Base-App" id="bj-site-root">',
  PAGE_FILES.map(p => cleanPage(p[0], p[1])).join('\n\n'),
  '</div>',
  '',
].join('\n');

/* ── 產出 ── */
const outDir = path.join(ROOT, 'deploy');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, '1-global-head.html'), globalHead);
fs.writeFileSync(path.join(outDir, '2-one-page.html'), onePage);

const readme = [
  '白境空間清潔 — 1shop 上線說明(單頁 · 假頁面版)',
  '=================================================',
  '',
  '只要貼「兩個地方」,整站就上線:',
  '',
  '【1】全域 head(整站貼一次)',
  '    打開 1-global-head.html → 全選複製',
  '    → 貼進 1shop 後台的「全域自訂 head / CSS」欄位',
  '',
  '【2】那一頁的內容',
  '    打開 2-one-page.html → 全選複製',
  '    → 貼進你那一頁的「自訂 HTML」欄位',
  '',
  '完成後:',
  '  導覽列「服務 / 關於 / 聯絡」點下去會有轉場布幕、像跳到另一頁,',
  '  其實整站都在同一頁(假頁面),不必真的開 4 個 1shop 頁面。',
  '',
  '上線前務必改:',
  '  1-global-head.html 裡搜尋「設定區」→ 換成官方 LINE 連結與 LINE ID。',
  '',
  '注意:這兩個檔都是「自動產生」的,不要手改;',
  '      要改內容改 css / skeleton / shared 來源檔,再重跑 build-deploy。',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'README.txt'), readme);

console.log('✅ deploy/ 產生完成:');
console.log('   1-global-head.html  ' + (globalHead.length / 1024).toFixed(1) + ' KB');
console.log('   2-one-page.html     ' + (onePage.length / 1024).toFixed(1) + ' KB');
console.log('   README.txt');
