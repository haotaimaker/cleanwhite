白境空間清潔 — 1shop 上線說明(CDN 版 · 三個欄位各貼一次)
=========================================================

★ 前置(我方做,一次性):dist/site.css 與 dist/site.js 已 push 到公開 repo
  Raffertyxu/baijing-assets,由 jsDelivr 提供。以後改樣式/動效只要更新那個 repo,不必再動 1shop。

在 1shop 後台貼三個地方:

【1】自訂CSS 欄位
    貼 1-自訂CSS.txt 的內容(只有兩行 @import,遠低於 15000 字上限)

【2】自訂JavaScript 欄位
    貼 2-自訂JavaScript.txt 的內容(依序載入函式庫與 site.js)

【3】那一頁的自訂 HTML 區塊
    貼 3-頁面HTML.html 的內容(整站 4 區塊,靠導覽列假路由切換)

上線前務必改:LINE 連結在 shared/nav-footer.html 的「設定區」,
改完重跑 build-cdn 並 push 公開 repo 即生效(jsDelivr 快取約需數小時或手動 purge)。
