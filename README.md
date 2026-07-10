# 白境空間清潔 — 1shop 網站

裝潢後細部清潔品牌官網,深色精緻風格,共 4 頁 + 一套設計系統。
所有頁面共用 `css/bj-base.css` 的設計變數,並由 `shared/nav-footer.html` 自動注入導覽列與頁尾。

---

## 檔案結構

```
clean/
├─ css/
│  └─ bj-base.css          設計系統(變數/排版/按鈕/卡片/Grid/內頁標頭) — 全站共用
├─ shared/
│  ├─ nav-footer.html      共用導覽列 + 頁尾(自帶 <style> 與 <script>,全域貼一次)
│  ├─ motion.html          動態層:GSAP 滾動揭幕 + Lenis 絲滑捲動 + 橫向捲動服務 + Hero 拭淨光暈
│  └─ chat.html            右下角常見問題罐頭聊天框(點問題顯示預設答案)
├─ preview.html            本機預覽(由上述檔案自動組合,可直接用瀏覽器開,非正式檔)
├─ home/skeleton.html      首頁
├─ services/skeleton.html  服務項目
├─ about/skeleton.html     關於我們
└─ contact/skeleton.html   聯絡我們
```

---

## ⚠️ 上線前一定要改的 2 件事

### 1. LINE 連結(共 5 處)
目前是佔位連結 `https://lin.ee/XXXXXXX`。
請用編輯器「全部取代」,把 **5 個檔案**裡的 `https://lin.ee/XXXXXXX` 換成你們的官方 LINE 連結:

| 檔案 | 位置 |
|------|------|
| `shared/nav-footer.html` | `var LINE_URL = '...'`(導覽列 + 頁尾共用此變數) |
| `home/skeleton.html` | Hero、服務流程、結尾 CTA(共 3 處) |
| `services/skeleton.html` | 底部 CTA 的「LINE 詢問」按鈕 |
| `contact/skeleton.html` | LINE 聯絡區塊 + 底部「LINE 線上詢問」按鈕(2 處) |

> 官方帳號連結格式通常是 `https://lin.ee/xxxxxxx`(LINE Official Account Manager →「加入好友」→ 網址),或個人帳號 `https://line.me/ti/p/~你的LINEID`。

### 2. 頁面網址要對得上
`shared/nav-footer.html` 的 `NAV_LINKS` 預設為 `/`、`/services`、`/about`、`/contact`。
若 1shop 實際頁面網址不同,請改成對應網址,導覽列與「當前頁高亮」才會正確。

---

## 小淨 AI 知識庫(唯一來源 = GitHub)

小淨的常見問題按鈕 + 打字問答,**全部**從 GitHub 讀取,站內不留副本:

- **改問答**:到 <https://github.com/Raffertyxu/baijing-kb> 編輯 `kb.json` → Commit → 約 5 分鐘全站生效(格式說明在該 repo 的 README)
- kb.json 格式錯誤或網路抓不到時,小淨仍可開啟,但暫時沒有問答資料(修好 kb.json 即恢復),所以改完建議先用 jsonlint.com 驗證格式再 Commit

---

## 部署到 1shop 步驟

1shop 通常分「全域自訂 CSS / 程式碼」與「各頁自訂 HTML 區塊」兩部分:

**① 全域(只做一次,套用到所有頁)**
1. 後台 →「自訂 CSS / head」欄位 → 貼上 `css/bj-base.css` 全部內容。
   - 若該欄位只吃純 CSS,直接貼;若是 head HTML,請用 `<style> … </style>` 包起來。
2. 緊接著 → 貼上 `shared/nav-footer.html` 全部內容(它已自帶 `<style>` 與 `<script>`)。
   - 這段會在每頁自動注入導覽列與頁尾,**不需要**在每頁重複貼。
3. 再貼上 `shared/motion.html` 全部內容(動態層)。
   - 它會載入 GSAP / ScrollTrigger / Lenis(CDN),負責滾動揭幕動畫、絲滑捲動與首頁 Hero 拭淨光暈。
   - 需要對外連網才能載入函式庫;若載入失敗,內容會自動維持靜態可見(不會白頁)。
   - 已內建 `prefers-reduced-motion` 與手機降載處理。
4. 最後貼上 `shared/chat.html`(右下角常見問題罐頭聊天框)。
   - 自帶 `<style>` 與 `<script>`,會自動出現在右下角;`LINE_URL` 同樣記得換成官方 LINE。
   - 答案是預設罐頭內容(非真 AI),要改問答直接編輯檔內的 `FAQ` 陣列。

**② 各頁(對應貼上)**
| 1shop 頁面 | 貼上檔案 |
|-----------|---------|
| 首頁 | `home/skeleton.html` |
| 服務項目 | `services/skeleton.html` |
| 關於我們 | `about/skeleton.html` |
| 聯絡我們 | `contact/skeleton.html` |

每頁底部都有一個「識別標籤」區塊(`#lbl-bj-…`),只是貼錯頁時方便辨認,
它會自動隱藏,不影響上線畫面;確認無誤後可刪除。

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
