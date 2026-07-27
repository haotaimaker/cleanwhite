/* ============================================================
   build-cdn.js — 境白空間清潔 CDN 部署產生器
   用法:node build-cdn.js
   1shop 把 CSS / JS 分成兩個欄位,且自訂CSS 上限 15000 字元,
   我們的資產遠超過 → 改成:把 CSS/JS 放公開 repo(jsDelivr),
   1shop 只貼幾行載入器。
   產出:
     dist/site.css        全部 CSS(bj-base + 共用檔的 <style>)→ push 到公開 repo
     dist/site.js         全部 JS(共用檔的 <script> + 假路由)→ push 到公開 repo
     deploy/1-自訂CSS.txt        貼進 1shop「自訂CSS」欄位
     deploy/2-自訂JavaScript.txt  貼進 1shop「自訂JavaScript」欄位
     deploy/3-頁面HTML.html       貼進「那一頁」的自訂 HTML 區塊
     deploy/README.txt            貼上步驟
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* ← 放編譯資產的公開 repo(jsDelivr 只能讀公開 repo)*/
const GH = 'Raffertyxu/baijing-assets';
const CDN = 'https://cdn.jsdelivr.net/gh/' + GH + '@main';

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;600;900&family=Jost:wght@300;400;500;600&display=swap');";

/* 從共用檔抽出 <style> / 無 src 的 <script> / 有 src 的函式庫 URL */
function extractStyles(html) {
  const out = []; const re = /<style>([\s\S]*?)<\/style>/g; let m;
  while ((m = re.exec(html)) !== null) out.push(m[1].trim());
  return out.join('\n');
}
function extractInlineJs(html) {
  const out = []; const re = /<script>([\s\S]*?)<\/script>/g; let m;   // <script> 無屬性 = 內嵌;<script src> 不會被這個抓到
  while ((m = re.exec(html)) !== null) out.push(m[1].trim());
  return out.join('\n');
}
function extractLibSrc(html) {
  const out = []; const re = /<script src="([^"]+)"><\/script>/g; let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

const navFooter = read('shared/nav-footer.html');
const motion    = read('shared/motion.html');
const chat      = read('shared/chat.html');
const router    = read('shared/router.html');

/* ── dist/site.css ── */
const siteCss = [
  FONT_IMPORT,
  read('css/bj-base.css').trim(),
  '/* ===== nav-footer ===== */', extractStyles(navFooter),
  '/* ===== motion ===== */',     extractStyles(motion),
  '/* ===== chat ===== */',       extractStyles(chat),
  '',
].join('\n');

/* ── dist/site.js(順序:nav→motion→chat→router)── */
const siteJs = [
  '/* 境白空間清潔 site.js — 由 build-cdn.js 產生,勿手改 */',
  '/* ===== nav-footer ===== */', extractInlineJs(navFooter),
  '/* ===== motion ===== */',     extractInlineJs(motion),
  '/* ===== chat ===== */',       extractInlineJs(chat),
  '/* ===== router(假頁面)===== */', extractInlineJs(router),
  '',
].join('\n');

const distDir = path.join(ROOT, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
fs.writeFileSync(path.join(distDir, 'site.css'), siteCss);
fs.writeFileSync(path.join(distDir, 'site.js'), siteJs);

/* ── 函式庫清單(motion 的 <script src>)+ 我們的 site.js,依序載入 ── */
const libs = extractLibSrc(motion).concat([CDN + '/site.js']);

/* ── 1shop 三欄位內容 ── */
/* 1shop 專屬修正直接寫在「自訂CSS 欄位」:即時生效、不經 CDN 快取,方便調版型 */
const ONESHOP_FIX = [
  '',
  '/* ── 1shop 版型修正(改這裡即時生效,不必等 CDN;不用 :has 以求相容)── */',
  '/* 藏 1shop 原生頁首/頁尾(我們有自己的 bj-nav / bj-footer,class 不同名不衝突)*/',
  '.head, .footer { display: none !important; }',
  '/* 突破 1shop 內容容器(Bootstrap .container 最大寬 + 內距 + 白底),恢復滿版 */',
  '.page-single, .page-single .container, .customize, .code {',
  '  max-width: 100% !important; width: auto !important;',
  '  padding-left: 0 !important; padding-right: 0 !important;',
  '  margin-left: 0 !important; margin-right: 0 !important;',
  '  background: transparent !important;',
  '}',
  '/* thesis 裝飾星 ✦ 在襯線字體會變豆腐方塊,直接藏掉(源碼已移除,這行是給尚未重貼頁面的即時修正)*/',
  '.bj-pain__thesis-spark { display: none !important; }',
  '',
].join('\n');
const cssField = FONT_IMPORT + "\n@import url('" + CDN + "/site.css');\n" + ONESHOP_FIX;

const jsField =
'/* 境白空間清潔 — 依序載入函式庫與 site.js;改樣式/動效不必動這裡,push GitHub 即可 */\n' +
'(function () {\n' +
'  var urls = ' + JSON.stringify(libs, null, 2).replace(/\n/g, '\n  ') + ';\n' +
'  var i = 0;\n' +
'  (function next() {\n' +
'    if (i >= urls.length) return;\n' +
'    var s = document.createElement("script");\n' +
'    s.src = urls[i++];\n' +
'    s.onload = next; s.onerror = next;  /* 某支失敗也繼續,畫面降級但不整包壞 */\n' +
'    document.head.appendChild(s);\n' +
'  })();\n' +
'})();\n';

/* ── 那一頁的 HTML(4 個假頁面區塊)── */
function cleanPage(file, id) {
  var s = read(file);
  var i = s.indexOf('<script>');
  if (i !== -1) s = s.slice(0, i);
  s = s.trimEnd();
  if (id === 'bj-home') {
    s = s.replace('<div id="bj-home" class="BJ-Base-App" style="display:none">',
                  '<div id="bj-home" class="BJ-Base-App">');
  }
  return s;
}
/* SEO 結構化資料:填好 shared/seo.html 的「請填-」欄位前先不納入,避免佔位資料上線 */
const seoRaw = read('shared/seo.html').trimEnd();
const seoBlock = seoRaw.includes('請填-')
  ? '<!-- SEO 結構化資料:待 shared/seo.html 的商家資料填妥後,重跑 build-cdn 即自動納入 -->'
  : seoRaw;

const onePage = [
  '<!-- 境白空間清潔 · 頁面內容(貼進 1shop「那一頁」的自訂 HTML)。整站在這一頁,靠假路由切換。 -->',
  seoBlock,
  '<div class="BJ-Base-App" id="bj-site-root">',
  [['home/skeleton.html','bj-home'],['services/skeleton.html','bj-services'],
   ['about/skeleton.html','bj-about'],['contact/skeleton.html','bj-contact']]
    .map(p => cleanPage(p[0], p[1])).join('\n\n'),
  '</div>',
  '',
].join('\n');

const outDir = path.join(ROOT, 'deploy');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
/* 清掉舊的單包版檔案 */
['1-global-head.html', '2-one-page.html'].forEach(f => {
  const p = path.join(outDir, f); if (fs.existsSync(p)) fs.unlinkSync(p);
});
fs.writeFileSync(path.join(outDir, '1-自訂CSS.txt'), cssField);
fs.writeFileSync(path.join(outDir, '2-自訂JavaScript.txt'), jsField);
fs.writeFileSync(path.join(outDir, '3-頁面HTML.html'), onePage);

const readme = [
  '境白空間清潔 — 1shop 上線說明(CDN 版 · 三個欄位各貼一次)',
  '=========================================================',
  '',
  '★ 前置(我方做,一次性):dist/site.css 與 dist/site.js 已 push 到公開 repo',
  '  ' + GH + ',由 jsDelivr 提供。以後改樣式/動效只要更新那個 repo,不必再動 1shop。',
  '',
  '在 1shop 後台貼三個地方:',
  '',
  '【1】自訂CSS 欄位',
  '    貼 1-自訂CSS.txt 的內容(只有兩行 @import,遠低於 15000 字上限)',
  '',
  '【2】自訂JavaScript 欄位',
  '    貼 2-自訂JavaScript.txt 的內容(依序載入函式庫與 site.js)',
  '',
  '【3】那一頁的自訂 HTML 區塊',
  '    貼 3-頁面HTML.html 的內容(整站 4 區塊,靠導覽列假路由切換)',
  '',
  '上線前務必改:LINE 連結在 shared/nav-footer.html 的「設定區」,',
  '改完重跑 build-cdn 並 push 公開 repo 即生效(jsDelivr 快取約需數小時或手動 purge)。',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'README.txt'), readme);

/* ── SEO:給 1shop 頁面設定填的標題/描述(貼到 1shop 後台,不是程式)── */
const seoSettings = [
  '境白空間清潔 — 1shop 頁面 SEO 設定(填在 1shop 後台的頁面設定,不是程式碼)',
  '=================================================================',
  '',
  '【頁面標題 title】← 目前是 1shop 預設「首頁 - 境白空間清潔」,沒有關鍵字,請改成:',
  '  境白空間清潔｜台南裝潢後細部清潔・石材美容・水塔清洗',
  '',
  '【頁面描述 description】← 目前沒有,請填(約 70-90 字,含關鍵字與地區):',
  '  境白空間清潔，台南專業裝潢後細部清潔、新屋交屋、石材美容養護、水塔清洗、',
  '  外牆與高空玻璃清潔。職人團隊、近乎苛求的完成標準，為您守護每一寸空間。',
  '  歡迎加 LINE 諮詢與報價。',
  '',
  '【分享縮圖 og:image】建議上傳一張 1200×630 品牌圖(深藍底 + Logo)。',
  '',
  '★ 結構化資料(LocalBusiness / FAQ)已放在「頁面HTML」裡(見 shared/seo.html),',
  '  請先把 seo.html 標「請填-」的真資料填好,再重貼 3-頁面HTML.html。',
  '★ 站外最有效:去 Google「商家檔案」登記/認領(免費),對在地與 AI 搜尋幫助最大。',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'SEO-1shop設定.txt'), seoSettings);

console.log('✅ 產生完成');
console.log('   dist/site.css            ' + (siteCss.length / 1024).toFixed(1) + ' KB');
console.log('   dist/site.js             ' + (siteJs.length / 1024).toFixed(1) + ' KB');
console.log('   deploy/1-自訂CSS.txt      ' + cssField.length + ' 字元 (上限 15000)');
console.log('   deploy/2-自訂JavaScript.txt ' + jsField.length + ' 字元');
console.log('   deploy/3-頁面HTML.html    ' + (onePage.length / 1024).toFixed(1) + ' KB');
console.log('   函式庫載入順序:');
libs.forEach(u => console.log('     - ' + u));
