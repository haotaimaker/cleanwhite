# 白境空間清潔 — 1shop 網站

裝潢後細部清潔品牌官網,藍白清爽風格,共 4 頁 + 一套設計系統。
**全站 CSS 集中在 `css/bj-base.css` 一個檔案**(含各頁區塊樣式);頁面 skeleton 是純 HTML;
導覽列與頁尾由 `shared/nav-footer.html` 自動注入。

---

## 檔案結構

**部署模式:單頁「假頁面」。** 整站其實只放在 **1shop 的一個頁面**;導覽列點「服務/關於/聯絡」時,由 `shared/router.html` 切換 4 個隱藏區塊 + 布幕轉場,做出「跳到另一頁」的錯覺,不需要真的開 4 個 1shop 頁面。

```text
clean/
├─ css/
│  └─ bj-base.css          全站唯一 CSS:設計系統 + 四頁的區塊樣式
├─ shared/
│  ├─ nav-footer.html      共用導覽列 + 頁尾 + 全站設定區(LINE/電話)
│  ├─ motion.html          動態層:GSAP 揭幕/逐字標題 + Lenis + vanilla-tilt + 布幕轉場
│  ├─ chat.html            右下角「小淨」AI 客服(問答資料源=GitHub kb.json)
│  └─ router.html          假頁面路由:切換 4 區塊 + 觸發轉場(正式上線用)
├─ home/skeleton.html      首頁區塊(純 HTML,#bj-home)
├─ services/skeleton.html  服務項目區塊(#bj-services)
├─ about/skeleton.html     關於我們區塊(#bj-about)
├─ contact/skeleton.html   聯絡我們區塊(#bj-contact)
├─ build-preview.js/.bat   預覽組裝器 → preview.html(本機看效果)
├─ build-deploy.js/.bat    上線檔產生器 → deploy/(貼上 1shop 用)
├─ preview.html            本機預覽「產物」— 不要手改
└─ deploy/                 上線「產物」— 不要手改
   ├─ 1-global-head.html   貼進 1shop 全域 head(貼一次)
   ├─ 2-one-page.html      貼進「那一頁」的自訂 HTML
   └─ README.txt           貼上步驟
```

## 開發流程

1. 改來源檔(skeleton / shared / bj-base.css)
2. **看效果**:點兩下 `build-preview.bat` → 瀏覽器開出 preview.html
3. **要上線**:點兩下 `build-deploy.bat` → 產生 `deploy/` 兩個貼上檔

> `preview.html` 與 `deploy/` 用的是**同一份** `shared/router.html`,所以預覽看到的 = 線上,零落差。

---

## ⚠️ 上線前只要改 1 個地方

**`shared/nav-footer.html` 頂端的「設定區」**(搜尋 `設定區` 即可找到):

```js
var LINE_URL = 'https://lin.ee/XXXXXXX';   // ← 換成官方 LINE 連結(必改)
var LINE_OA  = '@白境官方ID';               // ← LINE 官方帳號 ID(小淨帶需求單用,必改)
```

改這兩行就會**自動套用到全站**:導覽列/頁尾/各頁按鈕的 LINE 連結、電話連結、
小淨聊天室的 LINE 按鈕與「帶需求去 LINE」——skeleton 檔案裡的佔位連結不用動,
上線時會由 JS 統一改寫。

> 官方帳號連結格式通常是 `https://lin.ee/xxxxxxx`(LINE Official Account Manager →「加入好友」→ 網址)。

另外確認:`NAV_LINKS`(同一個設定區)預設為 `/`、`/services`、`/about`、`/contact`,
若 1shop 實際頁面網址不同,改成對應網址,導覽列與「當前頁高亮」才會正確。

---

## 小淨 AI 知識庫(唯一來源 = GitHub)

小淨的常見問題按鈕 + 打字問答,**全部**從 GitHub 讀取,站內不留副本:

- **改問答**:到 <https://github.com/Raffertyxu/baijing-kb> 編輯 `kb.json` → Commit → 約 5 分鐘全站生效(格式說明在該 repo 的 README)
- kb.json 格式錯誤或網路抓不到時,小淨仍可開啟,但暫時沒有問答資料(修好 kb.json 即恢復),所以改完建議先用 jsonlint.com 驗證格式再 Commit

---

## 部署到 1shop 步驟(單頁 · 假頁面版)

先點兩下 `build-deploy.bat` 產生 `deploy/`,然後**只貼兩個地方**:

**① 全域 head(整站貼一次)**
打開 `deploy/1-global-head.html` → 全選複製 → 貼進 1shop「全域自訂 head / CSS」欄位。
這份已把 `bj-base.css`(含全部樣式)、字型連結、導覽列/頁尾、動態層、小淨聊天、假頁面路由**全部包在一起**,不用再一個一個貼。

**② 那一頁的內容(貼一次)**
打開 `deploy/2-one-page.html` → 全選複製 → 貼進你**那一個** 1shop 頁面的「自訂 HTML」欄位。
裡面是 4 個區塊(首頁/服務/關於/聯絡),靠導覽列假路由切換 + 布幕轉場;**不需要真的開 4 個 1shop 頁面**。

> - 函式庫(GSAP/Lenis/vanilla-tilt)走 CDN,載入失敗會自動維持靜態可見、不白頁,並已處理 `prefers-reduced-motion` 與手機降載。
> - 小淨問答從 GitHub `kb.json` 載入(見上方「小淨 AI 知識庫」)。
> - 上線前記得改 `deploy/1-global-head.html` 裡的 LINE 設定(搜尋「設定區」)。

---

## SEO / Meta 建議(於 1shop 各頁設定填寫)

| 頁面 | 標題(title) | 描述(description) |
|------|-------------|--------------------|
| 首頁 | 白境空間清潔｜台南裝潢後細部清潔・石材美容 | 台南專業裝潢後細部清潔、新屋交屋清潔、外牆與玻璃無水痕清潔。極致的淨,看不見的細節。 |
| 服務項目 | 服務項目｜白境空間清潔 | 裝潢後細部清潔、新屋交屋、廠房辦公室、外牆清洗、社區大樓、玻璃無水痕、石材美容,7 大專業服務。 |
| 關於我們 | 關於我們｜白境空間清潔 | 由深耕產業多年的職人團隊組成,以近乎苛求的標準,守護您新家的每一寸空間。 |
| 聯絡我們 | 聯絡我們｜白境空間清潔 | 台南市安南區功安三街43號・06-2550811・LINE 線上詢問。歡迎來電或加 LINE 取得報價。 |

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

兩張照片建議**同一角度、同一構圖**(只差髒↔淨),比例約 3:2,效果最好。

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
