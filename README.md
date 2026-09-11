# 境白空間清潔 — 1shop 網站

裝潢後細部清潔品牌官網,藍白清爽風格,共 4 頁 + 一套設計系統。
**全站 CSS 集中在 `css/bj-base.css` 一個檔案**(含各頁區塊樣式);頁面 skeleton 是純 HTML;
導覽列與頁尾由 `shared/nav-footer.html` 自動注入。

---

## 檔案結構

**部署模式:單頁「假頁面」+ CDN。** 整站只放在 **1shop 一個頁面**;導覽列點「服務/關於/聯絡」時由 `shared/router.html` 切換 4 個隱藏區塊 + 布幕轉場,做出「跳到另一頁」的錯覺。因 1shop 自訂CSS 有 15000 字上限,CSS/JS 改放**公開 repo `haotaimaker/cleanwhite`**,由 jsDelivr 載入,1shop 只貼幾行載入器。

```text
clean/
├─ css/
│  └─ bj-base.css          全站唯一 CSS:設計系統 + 四頁的區塊樣式
├─ shared/
│  ├─ nav-footer.html      共用導覽列 + 頁尾 + 全站設定區(LINE/電話)
│  ├─ motion.html          動態層:GSAP 揭幕/逐字標題 + Lenis + vanilla-tilt + 布幕轉場
│  ├─ chat.html            右下角「小淨」客服(問答資料源=GitHub kb.json)
│  └─ router.html          假頁面路由:切換 4 區塊 + 觸發轉場
├─ home|services|about|contact/skeleton.html   四個頁面區塊(純 HTML)
├─ build-preview.js/.bat   預覽組裝器 → preview.html(本機看效果)
├─ build-cdn.js/.bat       CDN 產生器 → dist/(要 push 的資產)+ deploy/(貼 1shop)
├─ preview.html            本機預覽「產物」— 不要手改
├─ dist/                   編譯資產「產物」site.css / site.js(push 到 cleanwhite)
└─ deploy/                 1shop 貼上檔「產物」— 不要手改
   ├─ 1-自訂CSS.txt          貼進 1shop「自訂CSS」欄位(兩行 @import)
   ├─ 2-自訂JavaScript.txt   貼進「自訂JavaScript」欄位(載入器)
   ├─ 3-頁面HTML.html        貼進「那一頁」的自訂 HTML
   └─ README.txt            貼上步驟
```

外部 repo:`haotaimaker/cleanwhite`(公開,放 site.css/site.js,本機 clone 可放在 `C:\Users\user\浩太程式\cleanwhite`)、`Raffertyxu/baijing-kb`(公開,小淨問答)、`haotaimaker/cleanwhite`(私人/公開,本專案源碼)。

## 開發流程

1. 改來源檔(skeleton / shared / bj-base.css)
2. **看效果**:點兩下 `build-preview.bat` → 瀏覽器開出 preview.html
3. **要上線 / 發佈改動**:點兩下 `build-cdn.bat`(重建 dist → 複製到 assets repo → push → purge jsDelivr)

> `preview.html` 與線上用的是**同一份** `shared/*`,預覽看到的 = 線上,零落差。
> CSS/JS 改動只要 `build-cdn.bat`(不必再動 1shop);只有**頁面內容**改動才需要重貼 `deploy/3-頁面HTML.html`。

---

## ⚠️ 上線前只要改 1 個地方

**`shared/nav-footer.html` 頂端的「設定區」**(搜尋 `設定區` 即可找到):

```js
var LINE_URL = 'https://lin.ee/XXXXXXX';   // ← 換成官方 LINE 連結(必改)
var LINE_OA  = '@境白官方ID';               // ← 小淨帶需求單使用(必改)
```

改這兩行就會**自動套用到全站**:導覽列/頁尾/各頁按鈕的 LINE 連結、電話連結、
skeleton 檔案裡的佔位連結不用動,上線時會由 JS 統一改寫。

> 官方帳號連結格式通常是 `https://lin.ee/xxxxxxx`(LINE Official Account Manager →「加入好友」→ 網址)。

另外確認:`NAV_LINKS`(同一個設定區)預設為 `/`、`/services`、`/about`、`/contact`,
若 1shop 實際頁面網址不同,改成對應網址,導覽列與「當前頁高亮」才會正確。

---

## 小淨客服

右下角「小淨」客服已納入預覽與 CDN 建置，常見問題及關鍵字回答從 GitHub `baijing-kb` 載入。1shop 原生的購物／回頂端浮動按鈕由 `body.InWeb > .chat` 規則隱藏，不影響 `#bj-chat`。

---

## 部署到 1shop 步驟(單頁 · 假頁面 · CDN 版)

1shop 把樣式/程式分三個欄位,且**自訂CSS 上限 15000 字**(我們的 CSS 約 70KB 塞不下),
所以 CSS/JS 放公開 repo `cleanwhite`、由 jsDelivr 載入,1shop 只貼「載入器」。
先點兩下 `build-cdn.bat`(產生 `deploy/` 並把資產 push 上去),再貼**三個欄位**:

| 貼到 1shop 哪個欄位 | 貼哪個檔 | 內容 |
|---|---|---|
| **自訂CSS** | `deploy/1-自訂CSS.txt` | 兩行 `@import`(字型 + jsDelivr 的 site.css) |
| **自訂JavaScript** | `deploy/2-自訂JavaScript.txt` | 依序載入函式庫與 site.js 的小載入器 |
| **那一頁的自訂 HTML** | `deploy/3-頁面HTML.html` | 4 個區塊,靠導覽列假路由切換 |

> - CSS/JS 之後要改,**只要重跑 `build-cdn.bat`**(更新 `cleanwhite`),1shop 不用再動。
> - 只有**頁面內容**(skeleton)改動,才需要重貼 `deploy/3-頁面HTML.html`。
> - 函式庫(GSAP/Lenis/vanilla-tilt)走 CDN,載入失敗會自動維持靜態可見、不白頁。
> - 上線前改 LINE 設定:`shared/nav-footer.html` 的「設定區」→ 重跑 `build-cdn.bat`。
> - jsDelivr `@main` 快取數小時;`build-cdn.bat` 會自動請求 purge,通常幾分鐘內更新。

---

## SEO / Meta 建議(於 1shop 各頁設定填寫)

| 頁面 | 標題(title) | 描述(description) |
|------|-------------|--------------------|
| 首頁 | 境白空間清潔｜台南裝潢後細部清潔・石材美容 | 台南專業裝潢後細部清潔、新屋交屋清潔、外牆與玻璃無水痕清潔。極致的淨,看不見的細節。 |
| 服務項目 | 服務項目｜境白空間清潔 | 裝潢後細部清潔、新屋交屋、廠房辦公室、外牆清洗、社區大樓、玻璃無水痕、石材美容,7 大專業服務。 |
| 關於我們 | 關於我們｜境白空間清潔 | 由深耕產業多年的職人團隊組成,以近乎苛求的標準,守護您新家的每一寸空間。 |
| 聯絡我們 | 聯絡我們｜境白空間清潔 | 台南市安南區功安三街43號・06-2550811・LINE 線上詢問。歡迎來電或加 LINE 取得報價。 |

其他建議:
- **OG 圖**:準備 1 張 1200×630 品牌圖(深底 + Logo),於 1shop 社群分享圖欄位上傳。
- **Favicon**:用 Logo 的房屋+星圖示做 32×32 / 180×180。
- **電話/地址**:可加 LocalBusiness 結構化資料(JSON-LD)強化在地搜尋,需要的話我可以補。

---

## 施作前後對比(Before/After)
首頁有一個可拖曳的「施作前 / 施作後」對比滑桿(`bj-ba`)。目前是**示意色塊**,
要換成真實案例照片時,改 `home/skeleton.html` 裡的兩段 CSS 即可:

```
.bj-ba__before { background: url('施作前.jpg') center/cover; }  /* 灰暗那層 */
.bj-ba__after  { background: url('施作後.jpg') center/cover; }  /* 明亮那層 */
```

兩張照片請使用**同一角度、同一構圖**(只差髒↔淨),尺寸建議 1200×900、比例 4:3。

---

## 作品集照片(施作實績牆)
首頁有「施作實績」作品集(`bj-gallery`),點圖會放大成燈箱可左右切換。目前是佔位圖,
換真實照片時,改 `home/skeleton.html` 裡每個 `<img class="bj-gallery__img">` 的 `src`:

```
<img class="bj-gallery__img" src="你的照片網址.jpg" data-full="大圖網址.jpg" alt="...">
```

- `src` 是縮圖(列表顯示)、`data-full` 是點開的大圖(可省略,省略就用 `src`)。
- 圖片比例建議 4:3;`<figcaption>` 內的文字是該張的分類說明,可自由改。
- 要增減張數:複製/刪除整個 `<figure class="bj-gallery__item">…</figure>` 即可,燈箱會自動套用。

---

## 設計重點速覽
- 配色:近黑底(`#070707`)+ 暖白璀璨(`#E6DDD0`),LINE 行動按鈕用 LINE 綠(`#06C755`)。
- 字體:標題 Noto Serif TC、內文 Noto Sans TC、英文標記 Jost(由 `bj-base.css` 載入)。
- 導覽列:固定頂部,捲動後出現半透明毛玻璃底;手機版為漢堡選單。
- 響應式斷點:1024 / 900 / 760 / 560px。
