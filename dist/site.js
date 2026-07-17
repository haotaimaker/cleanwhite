/* 白境空間清潔 site.js — 由 build-cdn.js 產生,勿手改 */
/* ===== nav-footer ===== */
(function () {
  /* ===== 設定區(全站唯一,上線前只改這裡) ========================== */
  var LINE_URL = 'https://lin.ee/XXXXXXX';          // ← 換成官方 LINE 連結
  var LINE_OA  = '@白境官方ID';                      // ← LINE 官方帳號 ID(小淨帶需求單用)
  var PHONE    = '06-2550811';
  var TEL      = 'tel:062550811';
  var EMAIL    = 'bentley0903499936@gmail.com';
  var ADDRESS  = '台南市安南區功安三街43號';
  var BRAND    = '白境空間清潔';
  /* 公開給其他模組(chat.html 的小淨會讀取) */
  window.BJ_CONF = { LINE_URL: LINE_URL, LINE_OA: LINE_OA, PHONE: PHONE, TEL: TEL, EMAIL: EMAIL, ADDRESS: ADDRESS, BRAND: BRAND };
  var NAV_LINKS = [                                  // ← 若 1shop 網址不同請改 href
    { label: '首頁',     href: '/' },
    { label: '服務項目', href: '/services' },
    { label: '關於我們', href: '/about' },
    { label: '聯絡我們', href: '/contact' }
  ];
  /* =============================================================== */

  // 房屋 + 璀璨星 Logo（與站內視覺一致）
  var LOGO = '<svg viewBox="54 34 156 130" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M162 150 L162 98 L120 58" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M120 58 L80 98 L80 150" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M64 140 Q120 116 178 132 Q192 136 198 122" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M84 150 Q132 134 178 132" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M147 50.5 L150.5 59.5 L159.5 63 L150.5 66.5 L147 75.5 L143.5 66.5 L134.5 63 L143.5 59.5 Z" fill="currentColor"/>' +
    '<path d="M164 41 L166.3 46.7 L172 49 L166.3 51.3 L164 57 L161.7 51.3 L156 49 L161.7 46.7 Z" fill="currentColor" opacity="0.85"/>' +
    '<path d="M177 34.5 L178.6 38.4 L182.5 40 L178.6 41.6 L177 45.5 L175.4 41.6 L171.5 40 L175.4 38.4 Z" fill="currentColor" opacity="0.7"/>' +
    '</svg>';

  function isActive(href) {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    if (href === '/') return path === '/';
    return path === href || path.indexOf(href + '/') === 0 || path.indexOf(href) === 0;
  }

  function buildNav() {
    var linksHtml = NAV_LINKS.map(function (l) {
      var cls = 'bj-nav__link' + (isActive(l.href) ? ' bj-nav__link--active' : '');
      return '<a class="' + cls + '" href="' + l.href + '">' + l.label + '</a>';
    }).join('');

    var mobileHtml = NAV_LINKS.map(function (l) {
      var cls = isActive(l.href) ? ' class="bj-nav__link--active"' : '';
      return '<a' + cls + ' href="' + l.href + '">' + l.label + '</a>';
    }).join('');

    var nav = document.createElement('header');
    nav.className = 'bj-nav';
    nav.setAttribute('aria-label', '主要導覽');
    nav.innerHTML =
      '<div class="bj-nav__inner">' +
        '<a class="bj-nav__brand" href="/" aria-label="' + BRAND + ' 首頁">' +
          '<span style="color:var(--bj-spark)">' + LOGO + '</span>' +
          '<span class="bj-nav__brand-name">' + BRAND + '</span>' +
        '</a>' +
        '<nav class="bj-nav__links">' + linksHtml +
          '<a class="bj-nav__cta" href="' + LINE_URL + '" target="_blank" rel="noopener">LINE 詢問</a>' +
        '</nav>' +
        '<button class="bj-nav__toggle" type="button" aria-label="開啟選單" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
      '<div class="bj-nav__mobile">' + mobileHtml +
        '<a class="bj-nav__cta" href="' + LINE_URL + '" target="_blank" rel="noopener">LINE 線上詢問</a>' +
      '</div>';
    return nav;
  }

  function buildFooter() {
    var ft = document.createElement('footer');
    ft.className = 'bj-footer';
    ft.innerHTML =
      '<div class="bj-footer__inner">' +
        '<div class="bj-footer__brand">' +
          '<div class="bj-footer__brand-top">' +
            '<span style="color:var(--bj-spark)">' + LOGO + '</span>' +
            '<span class="bj-footer__name">' + BRAND + '</span>' +
          '</div>' +
          '<p class="bj-footer__tagline">極致的淨,看不見的細節。<br>專業裝潢後細部清潔 · 石材美容 · 玻璃無水痕清潔</p>' +
        '</div>' +
        '<div>' +
          '<p class="bj-footer__col-title">網站導覽</p>' +
          '<nav class="bj-footer__links">' +
            '<a href="/">首頁</a>' +
            '<a href="/services">服務項目</a>' +
            '<a href="/about">關於我們</a>' +
            '<a href="/contact">聯絡我們</a>' +
          '</nav>' +
        '</div>' +
        '<div>' +
          '<p class="bj-footer__col-title">聯絡資訊</p>' +
          '<div class="bj-footer__contact">' +
            '<div class="bj-footer__contact-item"><span class="bj-footer__contact-label">電話</span><a href="' + TEL + '">' + PHONE + '</a></div>' +
            '<div class="bj-footer__contact-item"><span class="bj-footer__contact-label">LINE</span><a href="' + LINE_URL + '" target="_blank" rel="noopener">官方 LINE 線上詢問</a></div>' +
            '<div class="bj-footer__contact-item"><span class="bj-footer__contact-label">電子郵件</span><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></div>' +
            '<div class="bj-footer__contact-item"><span class="bj-footer__contact-label">地址</span><span>' + ADDRESS + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bj-footer__bottom">' +
        '<span class="bj-footer__copy">© ' + BRAND + ' · 版權所有</span>' +
        '<span class="bj-footer__hours">營業時間 週一至週六 08:00–18:00</span>' +
      '</div>';
    return ft;
  }

  function wire(app) {
    // 捲動時導覽列加上底色;下滑收起、上滑滑出(App 手感)
    var nav = app.querySelector('.bj-nav');
    var lastY = window.pageYOffset;
    function onScroll() {
      var y = window.pageYOffset;
      if (y > 24) nav.classList.add('bj-nav--scrolled');
      else nav.classList.remove('bj-nav--scrolled');
      var menuOpen = panel && panel.classList.contains('bj-nav__mobile--open');
      if (y > 320 && y - lastY > 6 && !menuOpen) nav.classList.add('bj-nav--hidden');
      else if (y < lastY - 4 || y <= 320) nav.classList.remove('bj-nav--hidden');
      lastY = y;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 手機選單開合
    var toggle = app.querySelector('.bj-nav__toggle');
    var panel  = app.querySelector('.bj-nav__mobile');
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('bj-nav__mobile--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        panel.classList.remove('bj-nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function inject(app) {
    if (!app || app.querySelector('.bj-nav')) return;   // 防重複注入
    app.insertBefore(buildNav(), app.firstChild);
    app.appendChild(buildFooter());
    wire(app);
  }

  /* 依設定區自動改寫頁面上所有 LINE / 電話連結(skeleton 內保持佔位即可) */
  function applyConf() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://lin.ee/"], a[href^="https://line.me/"]'), function (a) {
      if (a.href.indexOf('line.me/R/oaMessage') !== -1) return;  // 小淨帶單連結由 chat.html 管
      a.href = LINE_URL;
    });
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="tel:"]'), function (a) {
      a.href = TEL;
    });
  }

  function start() {
    var app = document.querySelector('.BJ-Base-App');
    if (app) { inject(app); applyConf(); return; }
    // 若頁面區塊是稍後才載入,觀察 DOM 直到出現
    var obs = new MutationObserver(function () {
      var a = document.querySelector('.BJ-Base-App');
      if (a) { obs.disconnect(); inject(a); applyConf(); }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
/* ===== motion ===== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var REVEAL_SEL = [
    '.bj-sec-hd', '.bj-pain__intro', '.bj-pain__item', '.bj-pain__thesis',
    '.bj-svc-item', '.bj-svc-card', '.bj-flow__step', '.bj-why-item', '.bj-value-item',
    '.bj-story__text', '.bj-story__deco', '.bj-area-inner', '.bj-faq-item', '.bj-process-step',
    '.bj-contact-block', '.bj-contact-map', '.bj-cta__inner', '.bj-svc-cta__inner',
    '.bj-promise-band__inner', '.bj-about-story__deco', '.bj-about-story__content',
    '.bj-tl', '.bj-stat'
  ].join(',');

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* 安全網:把目前在視窗內、卻仍隱藏的揭幕元素顯示出來(切頁後保險) */
  function revealInView(G) {
    if (!G) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    Array.prototype.forEach.call(document.querySelectorAll(REVEAL_SEL), function (el) {
      if (el.offsetParent === null) return;          // 隱藏中的頁面跳過
      if (parseFloat(getComputedStyle(el).opacity) > 0.05) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.95 && r.bottom > 0) {
        G.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', overwrite: true });
      }
    });
    /* 逐字標題:切頁後若仍藏在下方,補跑揭幕 */
    Array.prototype.forEach.call(document.querySelectorAll('[data-bj-split]'), function (el) {
      if (el.offsetParent === null) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.95 && r.bottom > 0) {
        var chars = el.querySelectorAll('.bj-char');
        if (chars.length) G.to(chars, { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.03 });
      }
    });
  }

  ready(function () {
    var G  = window.gsap;
    var ST = G && window.ScrollTrigger;
    if (ST) G.registerPlugin(ScrollTrigger);

    initIntro();   // 進場載入動畫(最先)

    /* ── 絲滑捲動 Lenis ─────────────────────────────── */
    var lenis = null;
    if (window.Lenis && G && !reduce) {
      try {
        lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 1, smoothWheel: true });
        if (ST) lenis.on('scroll', ScrollTrigger.update);
        G.ticker.add(function (t) { lenis.raf(t * 1000); });
        G.ticker.lagSmoothing(0);
        window.__bjLenis = lenis;
      } catch (e) { lenis = null; }
    }

    initHero(G);
    initReveals(G, ST);
    initBA();
    initGallery();
    initProgress();

    /* 跑馬燈隨捲動速度傾斜(Awwwards 動態) */
    if (lenis && G) {
      var mqs = document.querySelectorAll('.bj-marquee');
      if (mqs.length) {
        G.ticker.add(function () {
          var v = lenis.velocity || 0;
          var sk = Math.max(-9, Math.min(9, v * 0.35));
          for (var i = 0; i < mqs.length; i++) mqs[i].style.transform = 'skewX(' + sk.toFixed(2) + 'deg)';
        });
      }
    }

    initHScroll(G);
    initSpotlight();
    initAIReview();
    initCounters();
    initImgFade();
    initSplitTitles(G, ST);
    initTilt();
    window.addEventListener('load', function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); });

    /* 預覽切頁時重算 ScrollTrigger 位置,並把在視窗內的元素顯示出來 */
    document.addEventListener('bj:pageshow', function () {
      if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
      if (ST) ScrollTrigger.refresh();
      revealInView(G);
      setTimeout(function () { revealInView(G); }, 60);
    });
  });

  /* ── 滾動揭幕:模糊→清晰 + 上浮 + 群組錯落 ───────────── */
  function initReveals(G, ST) {
    if (!G || !ST || reduce) return;
    var sel = REVEAL_SEL;

    G.set(sel, { opacity: 0, y: 44, filter: 'blur(8px)' });
    ScrollTrigger.batch(sel, {
      start: 'top 88%',
      onEnter: function (batch) {
        G.to(batch, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.05, ease: 'power3.out', stagger: 0.09, overwrite: true
        });
      }
    });

    /* 內頁標頭光暈視差 */
    G.utils.toArray('.bj-pg-header__bg').forEach(function (el) {
      G.to(el, { yPercent: 30, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top top', end: 'bottom top', scrub: true } });
    });
  }

  /* ── Hero:GSAP 揭幕時序 + 拭淨光暈 ─────────────────── */
  function initHero(G) {
    if (G && !reduce) {
      var has = document.querySelector('.bj-hero__inner');
      if (has) {
        G.set('.bj-hero__logo',            { opacity: 0, scale: 0.82, filter: 'blur(8px)' });
        G.set('.bj-hero__text .bj-eyebrow',{ opacity: 0, y: 16 });
        G.set('.bj-hero__name',            { opacity: 0, y: 34 });
        G.set('.bj-hero__tagline',         { opacity: 0, y: 22 });
        G.set('.bj-hero__actions',         { opacity: 0, y: 22 });
        G.set('.bj-hero__scroll',          { opacity: 0 });

        var tl = G.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 });
        tl.to('.bj-hero__logo',            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5 })
          .to('.bj-hero__text .bj-eyebrow',{ opacity: 0.7, y: 0, duration: 0.9 }, '-=0.9')
          .to('.bj-hero__name',            { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=0.6')
          .to('.bj-hero__tagline',         { opacity: 1, y: 0, duration: 1.0 }, '-=0.8')
          .to('.bj-hero__actions',         { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
          .to('.bj-hero__scroll',          { opacity: 1, duration: 1.0 }, '-=0.3');
      }
    }

    /* 捲動時 Hero 位移縮放、水印反向漂移(Awwwards 視差) */
    if (G && window.ScrollTrigger && !reduce) {
      var hero = document.querySelector('.bj-hero');
      if (hero) {
        G.to('.bj-hero__inner', {
          yPercent: -16, scale: 1.06, opacity: 0.25, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
        });
        G.to('.bj-hero__watermark', {
          yPercent: 26, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
    initPolish();
  }

  /* 拭淨光暈:游標(或閒置時自動)在深色底上「擦」出潔淨亮光 */
  function initPolish() {
    var hero  = document.querySelector('.bj-hero');
    var sheen = document.querySelector('.bj-hero__sheen');
    if (!hero || !sheen) return;

    var cx = 50, cy = 40, tx = 50, ty = 40, lastMove = -1e9, t = 0;
    function apply() {
      sheen.style.setProperty('--mx', cx.toFixed(2) + '%');
      sheen.style.setProperty('--my', cy.toFixed(2) + '%');
    }
    if (reduce) { apply(); return; }

    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      lastMove = (window.performance && performance.now) ? performance.now() : 0;
    }, { passive: true });

    function tick(now) {
      requestAnimationFrame(tick);
      t += 0.016;
      if (now - lastMove > 2200) {          // 閒置/觸控 → 亮光自動緩緩游移
        tx = 50 + Math.cos(t * 0.45) * 24;
        ty = 40 + Math.sin(t * 0.62) * 15;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      apply();
    }
    requestAnimationFrame(tick);
  }

  /* 施作前後對比滑桿 */
  function initBA() {
    var list = document.querySelectorAll('[data-bj-ba]');
    if (!list.length) return;

    list.forEach(function (ba) {
      var range = ba.querySelector('.bj-ba__range');
      if (!range) return;
      function upd() { ba.style.setProperty('--pos', range.value + '%'); }
      range.addEventListener('input', upd);
      upd();
    });

    // 進入視窗時做一次提示性掃動,讓使用者知道可以拖曳
    if (reduce || !window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); setTimeout(function () { nudge(e.target); }, 450); }
      });
    }, { threshold: 0.45 });
    list.forEach(function (ba) { io.observe(ba); });

    function nudge(ba) {
      var range = ba.querySelector('.bj-ba__range');
      if (!range) return;
      var seq = [50, 72, 30, 50], i = 0;
      function next() {
        if (i >= seq.length - 1) return;
        animateTo(ba, range, seq[i], seq[i + 1], function () { i++; setTimeout(next, 110); });
      }
      next();
    }
    function animateTo(ba, range, from, to, done) {
      var start = null, dur = 520;
      function fr(ts) {
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        var v = from + (to - from) * e;
        range.value = v;
        ba.style.setProperty('--pos', v + '%');
        if (k < 1) requestAnimationFrame(fr); else if (done) done();
      }
      requestAnimationFrame(fr);
    }
  }

  /* 頂部閱讀進度條 */
  function initProgress() {
    var bar = document.createElement('div');
    bar.className = 'bj-progress';
    document.body.appendChild(bar);
    function upd() {
      var st = window.pageYOffset || document.documentElement.scrollTop || 0;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    document.addEventListener('bj:pageshow', function () { setTimeout(upd, 60); });
    upd();
  }

  /* AI 口碑分析:進視窗 → 掃描 → 揭曉(百分比跳動 + 長條 + 關鍵詞) */
  function initAIReview() {
    var els = document.querySelectorAll('[data-bj-aireview]');
    if (!els.length || !window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
          io.unobserve(e.target);
          var sec = e.target;
          setTimeout(function () { reveal(sec); }, reduce ? 200 : 1300);
        }
      });
    }, { threshold: [0, 0.3] });
    els.forEach(function (el) { io.observe(el); });

    function reveal(sec) {
      sec.classList.add('is-done');
      var pctEl = sec.querySelector('.bj-aireview__pct');
      if (!pctEl) return;
      var to = parseInt(pctEl.getAttribute('data-to'), 10) || 0;
      if (reduce) { pctEl.textContent = to; return; }
      var start = null, dur = 1100;
      function tick(ts) {
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        pctEl.textContent = Math.round(to * e);
        if (k < 1) requestAnimationFrame(tick); else pctEl.textContent = to;
      }
      requestAnimationFrame(tick);
    }
  }

  /* 數字滾動計數:[data-count] 進視窗 → 0 跳到目標 */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) { io.unobserve(e.target); countUp(e.target); }
      });
    }, { threshold: [0, 0.3] });
    els.forEach(function (el) { io.observe(el); });
    function countUp(el) {
      var to = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reduce) { el.textContent = to.toLocaleString(); return; }
      var start = null, dur = 1400;
      function tick(ts) {
        if (start === null) start = ts;
        var k = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(to * e).toLocaleString();
        if (k < 1) requestAnimationFrame(tick); else el.textContent = to.toLocaleString();
      }
      requestAnimationFrame(tick);
    }
  }

  /* 卡片光暈跟隨游標 */
  function initSpotlight() {
    Array.prototype.forEach.call(document.querySelectorAll('.bj-svc-item, .bj-svc-card'), function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* 橫向捲動服務區:捲動時釘住,水平推進(Awwwards 互動) */
  function initHScroll(G) {
    if (!G || !window.ScrollTrigger || reduce) return;
    if (!window.matchMedia || !matchMedia('(min-width: 760px)').matches) return;  // 手機保留原生橫滑
    Array.prototype.forEach.call(document.querySelectorAll('[data-bj-hscroll]'), function (sec) {
      var track = sec.querySelector('.bj-hsec__track');
      if (!track) return;
      sec.classList.add('is-pinned');
      function dist() { return Math.max(0, track.scrollWidth - window.innerWidth); }
      G.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: function () { return '+=' + dist(); },
          pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
    });
  }

  /* 進場 Loader:品牌 Logo 自我描繪 + 進度條填滿,完成後整片滑開 */
  function initIntro() {
    var seen = false;
    try { seen = sessionStorage.getItem('bj_intro'); } catch (e) {}
    if (!seen) { try { sessionStorage.setItem('bj_intro', '1'); } catch (e) {} }

    var ov = document.createElement('div');
    ov.className = 'bj-trans bj-trans--intro' + (seen ? ' bj-trans--quick' : '');
    ov.innerHTML = '<div class="bj-load"><svg class="bj-broom" viewBox="0 0 24 24" fill="none" stroke="#15273F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" fill="#EAF1FC"/><path d="m8 22 1-4"/></svg><span class="bj-load__floor"></span><span class="bj-load__text">載入中<span class="bj-dot">.</span><span class="bj-dot">.</span><span class="bj-dot">.</span></span></div>';
    document.body.appendChild(ov);

    var killed = false;
    function kill() { if (killed) return; killed = true; if (ov.parentNode) ov.parentNode.removeChild(ov); }
    setTimeout(kill, 4200);                                  // 失效保險

    var hold = reduce ? 250 : (seen ? 600 : 1700);
    setTimeout(function () {
      ov.classList.add('bj-trans--out');
      setTimeout(kill, 900);
    }, hold);
  }

  /* 換頁布幕:覆蓋 → 切換 → 揭開(供路由呼叫) */
  window.bjCurtain = function (cb) {
    var G = window.gsap;
    if (reduce || !G) { if (cb) cb(); return; }
    var c = document.createElement('div');
    c.className = 'bj-trans';
    c.innerHTML = '<div class="bj-load"><svg class="bj-broom" viewBox="0 0 24 24" fill="none" stroke="#15273F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" fill="#EAF1FC"/><path d="m8 22 1-4"/></svg><span class="bj-load__floor"></span><span class="bj-load__text">載入中<span class="bj-dot">.</span><span class="bj-dot">.</span><span class="bj-dot">.</span></span></div>';
    document.body.appendChild(c);
    G.set(c, { yPercent: 100 });
    G.to(c, { yPercent: 0, duration: 0.45, ease: 'power3.inOut', onComplete: function () {
      if (cb) cb();
      G.to(c, { yPercent: -100, duration: 0.6, ease: 'power3.inOut', delay: 0.08, onComplete: function () { if (c.parentNode) c.parentNode.removeChild(c); } });
    } });
  };

  /* 標題逐字揭幕(Awwwards 手法):捲到區段,大標題一個字一個字浮上來 */
  function initSplitTitles(G, ST) {
    if (!G || !ST || reduce) return;
    var titles = document.querySelectorAll('.bj-sec-hd .bj-title, .bj-pg-header .bj-title');
    Array.prototype.forEach.call(titles, function (el) {
      if (el.dataset.bjSplit) return;
      el.dataset.bjSplit = '1';
      var text = el.textContent;
      el.setAttribute('aria-label', text);
      el.textContent = '';
      var frag = document.createDocumentFragment();
      for (var i = 0; i < text.length; i++) {
        var ch = document.createElement('span');
        ch.className = 'bj-char';
        ch.setAttribute('aria-hidden', 'true');
        ch.textContent = text[i] === ' ' ? ' ' : text[i];
        frag.appendChild(ch);
      }
      el.appendChild(frag);
      var chars = el.querySelectorAll('.bj-char');
      G.set(chars, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: function () {
          G.to(chars, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 });
        }
      });
    });
  }

  /* 卡片 3D 傾斜(vanilla-tilt):滑鼠移過去,卡片立體地朝游標傾斜 + 光澤 */
  function initTilt() {
    if (!window.VanillaTilt || reduce) return;
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var els = document.querySelectorAll('.bj-svc-item, .bj-why-item, .bj-value-item, .bj-pain__item, .bj-gallery__item');
    if (!els.length) return;
    VanillaTilt.init(Array.prototype.slice.call(els), {
      max: 5, speed: 700, scale: 1.015, perspective: 900,
      glare: true, 'max-glare': 0.12, gyroscope: false
    });
  }

  /* 圖片絲滑淡入:載入完成才浮現,避免「啪」一下跳出 */
  function initImgFade() {
    var imgs = document.querySelectorAll('.BJ-Base-App img');
    for (var i = 0; i < imgs.length; i++) (function (img) {
      if (img.closest('.bj-nav') || img.closest('.bj-lb')) return; // 導覽列/燈箱不處理
      img.decoding = 'async';
      img.classList.add('bj-imgfade');
      if (img.complete && img.naturalWidth) { img.classList.add('is-ld'); return; }
      img.addEventListener('load',  function () { img.classList.add('is-ld'); }, { once: true });
      img.addEventListener('error', function () { img.classList.add('is-ld'); }, { once: true });
    })(imgs[i]);
  }

  /* 作品集燈箱:點圖放大 + 左右切換 + Esc/方向鍵 */
  function initGallery() {
    var gals = document.querySelectorAll('[data-bj-gallery]');
    if (!gals.length) return;
    var items = [], cur = 0;

    var lb = document.createElement('div');
    lb.className = 'bj-lb';
    lb.innerHTML =
      '<button class="bj-lb__btn bj-lb__close" type="button" aria-label="關閉">✕</button>' +
      '<button class="bj-lb__btn bj-lb__prev" type="button" aria-label="上一張">‹</button>' +
      '<img class="bj-lb__img" alt="">' +
      '<button class="bj-lb__btn bj-lb__next" type="button" aria-label="下一張">›</button>' +
      '<div class="bj-lb__cap"></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector('.bj-lb__img');
    var cap = lb.querySelector('.bj-lb__cap');

    Array.prototype.forEach.call(gals, function (g) {
      Array.prototype.forEach.call(g.querySelectorAll('.bj-gallery__item'), function (fig) {
        var im = fig.querySelector('.bj-gallery__img');
        var capSpan = fig.querySelector('figcaption span');
        if (!im) return;
        var idx = items.length;
        items.push({ src: im.getAttribute('data-full') || im.getAttribute('src'), cap: capSpan ? capSpan.textContent : '' });
        fig.addEventListener('click', function () { open(idx); });
      });
    });

    function render() { img.src = items[cur].src; img.alt = items[cur].cap; cap.textContent = items[cur].cap; }
    function open(i) { cur = i; render(); lb.classList.add('is-open'); if (window.__bjLenis) window.__bjLenis.stop(); }
    function close() { lb.classList.remove('is-open'); if (window.__bjLenis) window.__bjLenis.start(); }
    function go(d) { cur = (cur + d + items.length) % items.length; render(); }

    lb.querySelector('.bj-lb__close').addEventListener('click', close);
    lb.querySelector('.bj-lb__prev').addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
    lb.querySelector('.bj-lb__next').addEventListener('click', function (e) { e.stopPropagation(); go(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    });
  }
})();
/* ===== chat ===== */
(function () {
  /* LINE 設定一律讀 nav-footer.html 頂端的「設定區」(window.BJ_CONF),此處只是保底 */
  var CONF = window.BJ_CONF || {};
  var LINE_URL = CONF.LINE_URL || 'https://lin.ee/XXXXXXX';
  var LINE_OA  = CONF.LINE_OA  || '@白境官方ID';

  /* 常見問題 + 智慧問答:唯一資料源 = GitHub kb.json(見下方 KB_URL) */
  var FAQ = [];

  var IC_CHAT = '<svg class="bj-chat__ic-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var IC_CLOSE = '<svg class="bj-chat__ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  function build() {
    if (document.getElementById('bj-chat')) return;

    /* ── AI 記得你 + 跨頁需求清單(localStorage) ── */
    var RV = { visits: 0, topic: '', items: [] };
    try { var _r = localStorage.getItem('bj_visitor'); if (_r) RV = JSON.parse(_r); } catch (e) {}
    if (!RV.items) RV.items = [];
    var prevTopic = RV.topic || '';
    var returning = (RV.visits || 0) >= 1;      // 之前來過(本次尚未計入)
    RV.visits = (RV.visits || 0) + 1;
    saveRV();
    function saveRV() { try { localStorage.setItem('bj_visitor', JSON.stringify(RV)); } catch (e) {} }
    function addItem(name) {
      if (!name) return;
      RV.topic = name;
      if (RV.items.indexOf(name) === -1) { RV.items.push(name); if (RV.items.length > 6) RV.items.shift(); }
      saveRV(); refreshLine();
    }
    function lineWithItems() {
      var items = RV.items || [];
      var text = items.length
        ? '您好,我想詢問清潔服務:' + items.join('、') + '。想了解報價與可預約時間,謝謝!'
        : '您好,我想詢問清潔服務報價,謝謝!';
      return 'https://line.me/R/oaMessage/' + LINE_OA + '/?' + encodeURIComponent(text);
    }
    function refreshLine() {
      var cart = document.querySelector('#bj-chat .bj-chat__cart');
      var btn = document.querySelector('#bj-chat .bj-chat__line');
      if (!btn) return;
      var items = RV.items || [];
      if (items.length) {
        if (cart) { cart.hidden = false; cart.textContent = '📋 已為您整理:' + items.join('、'); }
        btn.textContent = '帶我的需求去 LINE 報價';
        btn.href = lineWithItems();
      } else {
        if (cart) cart.hidden = true;
        btn.textContent = '改用 LINE 真人客服';
        btn.href = LINE_URL;
      }
    }

    var root = document.createElement('div');
    root.className = 'bj-chat';
    root.id = 'bj-chat';
    root.innerHTML =
      '<div class="bj-chat__panel" role="dialog" aria-label="常見問題">' +
        '<div class="bj-chat__head">' +
          '<div class="bj-chat__brand">' +
            '<span class="bj-chat__avatar">✦</span>' +
            '<div><strong>小淨 · 白境小幫手</strong><span class="bj-chat__status">線上中,隨時為您服務 😊</span></div>' +
          '</div>' +
          '<button class="bj-chat__close" type="button" aria-label="關閉">' + IC_CLOSE + '</button>' +
        '</div>' +
        '<div class="bj-chat__body"></div>' +
        '<div class="bj-chat__quick"></div>' +
        '<form class="bj-chat__inputrow"><input class="bj-chat__input" type="text" placeholder="輸入您的問題,小淨馬上回答…" maxlength="120" autocomplete="off" aria-label="輸入問題"><button class="bj-chat__send" type="submit" aria-label="送出"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></button></form>' +
        '<div class="bj-chat__foot"><div class="bj-chat__cart" hidden></div><a class="bj-chat__line" href="' + LINE_URL + '" target="_blank" rel="noopener">改用 LINE 真人客服</a></div>' +
      '</div>' +
      '<button class="bj-chat__fab" type="button" aria-label="常見問題">' + IC_CHAT + IC_CLOSE + '<span class="bj-chat__badge">?</span></button>';
    document.body.appendChild(root);

    var fab = root.querySelector('.bj-chat__fab');
    var closeBtn = root.querySelector('.bj-chat__close');
    var body = root.querySelector('.bj-chat__body');
    var quick = root.querySelector('.bj-chat__quick');
    var started = false;

    function addChip(item) {
      var chip = document.createElement('button');
      chip.className = 'bj-chat__chip';
      chip.type = 'button';
      chip.textContent = item.q;
      chip.addEventListener('click', function () { ask(item); });
      quick.appendChild(chip);
    }
    FAQ.forEach(addChip);

    function addMsg(text, who) {
      var m = document.createElement('div');
      m.className = 'bj-chat__msg bj-chat__msg--' + who;
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
      return m;
    }
    /* 逐字「生成」出 bot 訊息 + 閃爍游標(假 ChatGPT) */
    function typeMsg(text) {
      var m = document.createElement('div');
      m.className = 'bj-chat__msg bj-chat__msg--bot';
      var span = document.createElement('span');
      var caret = document.createElement('span');
      caret.className = 'bj-chat__caret';
      m.appendChild(span); m.appendChild(caret);
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
      var i = 0;
      (function step() {
        if (i < text.length) {
          i++;
          span.textContent = text.slice(0, i);
          body.scrollTop = body.scrollHeight;
          setTimeout(step, 20 + Math.random() * 34);
        } else if (caret.parentNode) {
          caret.parentNode.removeChild(caret);
        }
      })();
    }
    /* 顯示「思考中」再逐字回答(共用) */
    function respond(answer) {
      var typing = document.createElement('div');
      typing.className = 'bj-chat__typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(function () {
        typing.remove();
        typeMsg(answer);
      }, 650 + Math.random() * 450);
    }
    function ask(item) {
      addMsg(item.q, 'user');
      respond(item.a);
    }

    /* ── 小淨智慧問答:自由輸入 → 關鍵字比對知識庫(內容由 kb.json 載入) ── */
    var KB = [];
    function smartReply(q) {
      var s = q.toLowerCase();
      var best = null, bs = 0;
      KB.forEach(function (e) {
        var sc = 0;
        e.k.forEach(function (kw) { if (s.indexOf(kw.toLowerCase()) !== -1) sc += kw.length; });
        if (sc > bs) { bs = sc; best = e; }
      });
      return best;
    }
    var form = root.querySelector('.bj-chat__inputrow');
    var input = root.querySelector('.bj-chat__input');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var q = (input.value || '').trim();
      if (!q) return;
      input.value = '';
      addMsg(q, 'user');
      var hit = smartReply(q);
      if (hit) {
        if (hit.t) addItem(hit.t);
        respond(hit.a);
      } else {
        respond('這題有點專業,我先幫您記下來了 📝\n點下方 LINE 把問題直接傳給團隊,真人回覆最快;或換個方式問我也可以喔!');
      }
    });

    /* ── 知識庫唯一來源:GitHub kb.json ──
       改問答:https://github.com/Raffertyxu/baijing-kb 編輯 kb.json,約 5 分鐘生效 */
    var KB_URL = 'https://raw.githubusercontent.com/Raffertyxu/baijing-kb/main/kb.json';
    if (window.fetch) {
      fetch(KB_URL, { cache: 'no-cache' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data) return;
          if (data.kb && data.kb.length) KB = data.kb;
          if (data.faq && data.faq.length) {
            FAQ = data.faq;
            quick.innerHTML = '';
            FAQ.forEach(addChip);
          }
        })
        .catch(function () {});
    }
    function open() {
      root.classList.add('is-open');
      refreshLine();
      if (window.innerWidth > 640) setTimeout(function () { input.focus(); }, 420);
      if (!started) {
        started = true;
        setTimeout(function () {
          typeMsg(returning
            ? (prevTopic ? '歡迎回來!😊 我是小淨~上次您看的是「' + prevTopic + '」,需要我接著為您介紹,或直接安排報價嗎?'
                         : '歡迎回來!很高興又見到您 😊 需要我幫您接續上次的諮詢嗎?')
            : '嗨~我是小淨,白境的清潔小幫手 👋\n想了解什麼都可以問我,點下方常見問題也行喔 😊');
        }, 250);
      }
    }
    function toggle() { root.classList.contains('is-open') ? root.classList.remove('is-open') : open(); }

    fab.addEventListener('click', toggle);
    closeBtn.addEventListener('click', function () { root.classList.remove('is-open'); });

    /* ── 主動式智慧客服「小淨」:像真人在旁邊陪您看 ── */
    var SECTION_POPS = [
      { sel: '.bj-pain', msgs: [
        '裝潢後的粉塵殘膠真的超難搞對吧 😣 別擔心,這正是我們最拿手的~要我幫您估個價嗎?',
        '這些藏在細節裡的髒,自己清真的會崩潰 🥲 交給我們就好啦~' ] },
      { sel: '.bj-svc-item', msgs: [
        '在看服務呀~ 想清哪個空間呢?跟我說說,我幫您配最適合的方案 ✨',
        '這幾項都是我們的強項喔!對哪一個有興趣嗎? 😊' ] },
      { sel: '.bj-ba', msgs: [
        '看到這前後差別了嗎?每次完工我都覺得好療癒 🥹 想讓您家也亮成這樣嗎?',
        '左邊滑到右邊~ 是不是差超多 😍 您家也可以變這樣的!' ] },
      { sel: '.bj-gallery', msgs: [
        '這些都是我們實際做過的案場喔 📸 要不要看看您家類型的案例?',
        '喜歡哪一種呢?我可以多傳幾張給您參考~ 😊' ] },
      { sel: '.bj-why', msgs: [
        '說真的,我們對乾淨有點龜毛 😆 但您一定會愛上這種龜毛的~',
        '不達標準我們是不交件的喔!這點超堅持 💪' ] },
      { sel: '.bj-flow', msgs: [
        '流程超簡單的啦,不用擔心 😌 這週還有空檔,要先幫您留嗎?',
        '從詢問到完工我們全程陪著您,放心交給我們 🤝' ] },
      { sel: '.bj-cta', msgs: [
        '聊到這裡~ 要不要直接加個 LINE?有任何問題我都在 💚',
        '準備好的話,點一下就能跟我們聊囉,我等您 😊' ] },
      { sel: '.bj-svc-card', msgs: [
        '想知道這項的細節跟報價嗎?問我最快~ 😊' ] },
      { sel: '.bj-contact-grid', msgs: [
        '想直接預約嗎?加 LINE 最快,我馬上回您!📲' ] }
    ];
    var SMALL_TALK = [
      '慢慢看不用急~ 有問題隨時喊我喔 😊',
      '還在考慮嗎?先問問完全免費的啦~ 🤗',
      '需要我幫您整理一份報價嗎?省得您煩惱 😆',
      '想看更多案例的話,我這邊超多的 📸',
      '對了~ 我們台南全區都有服務哦!',
      '有什麼想清的角落,都可以先跟我說說 👀',
      '我都在線上陪您看~ 別客氣喔 💚'
    ];
    var BOTTOM_TALK = '都看完囉~ 覺得還喜歡嗎?😊 要不要直接問問看?';

    var pop = document.createElement('div');
    pop.className = 'bj-chat__pop';
    pop.innerHTML =
      '<button class="bj-chat__pop-close" type="button" aria-label="關閉">✕</button>' +
      '<div class="bj-chat__pop-av">✦</div>' +
      '<div class="bj-chat__pop-body"><div class="bj-chat__pop-name">小淨 · 線上陪您看</div><div class="bj-chat__pop-text"></div></div>';
    document.body.appendChild(pop);
    var popText = pop.querySelector('.bj-chat__pop-text');

    var triggered = {}, queue = [], busy = false, dismissed = false, hideTimer = null, lastMsg = '';

    function pickVary(arr) {
      if (arr.length === 1) return arr[0];
      var m, t = 0;
      do { m = arr[Math.floor(Math.random() * arr.length)]; t++; } while (m === lastMsg && t < 6);
      lastMsg = m; return m;
    }
    function hidePop() {
      pop.classList.remove('is-show');
      clearTimeout(hideTimer);
      setTimeout(function () { busy = false; pump(); }, 320);
    }
    function showPop(item) {
      if (root.classList.contains('is-open')) { busy = false; return; }
      var msg = (typeof item === 'string') ? item : item.text;
      var cta = (item && typeof item === 'object') ? item.cta : null;
      busy = true;
      pop.classList.add('is-show');
      popText.innerHTML = '<span class="bj-chat__pop-typing"><span></span><span></span><span></span></span>';
      clearTimeout(hideTimer);
      setTimeout(function () {
        if (!pop.classList.contains('is-show')) { busy = false; return; }
        popText.textContent = msg;
        if (cta) {
          var a = document.createElement('a');
          a.className = 'bj-chat__pop-cta';
          a.href = cta.href; a.target = '_blank'; a.rel = 'noopener';
          a.textContent = cta.label;
          a.addEventListener('click', function (ev) { ev.stopPropagation(); });
          popText.appendChild(a);
        }
        hideTimer = setTimeout(hidePop, cta ? 9000 : 5200);
      }, 700);
    }
    function pump() {
      if (dismissed || busy || !queue.length) return;
      if (root.classList.contains('is-open')) return;
      showPop(queue.shift());
    }
    function enqueue(msg) { if (msg && !dismissed && queue.length < 3) { queue.push(msg); pump(); } }
    /* 小淨把跨頁累積的需求整理好,主動提議帶去 LINE */
    function offerLine() {
      var items = (RV.items || []).slice(0, 4);
      enqueue({
        text: '我看您對「' + items.join('、') + '」很有興趣 😊 已幫您整理好需求,點下面直接帶去 LINE 報價!',
        cta: { label: '帶我的需求去 LINE →', href: lineWithItems() }
      });
    }

    pop.querySelector('.bj-chat__pop-close').addEventListener('click', function (e) {
      e.stopPropagation(); dismissed = true; queue = []; hidePop();
    });
    pop.addEventListener('click', function () { pop.classList.remove('is-show'); open(); });
    fab.addEventListener('click', function () { pop.classList.remove('is-show'); });

    /* 區塊觸發:看到哪段就聊那段 */
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.35) {
            var key = e.target.getAttribute('data-bjpopkey');
            var el = e.target;
            if (key && !triggered[key]) {
              triggered[key] = true;
              io.unobserve(el);
              setTimeout(function () { enqueue(pickVary(JSON.parse(el.getAttribute('data-bjpop')))); }, 300);
            }
          }
        });
      }, { threshold: [0, 0.35, 0.6] });
      SECTION_POPS.forEach(function (p, i) {
        var el = document.querySelector(p.sel);
        if (el) { el.setAttribute('data-bjpopkey', 's' + i); el.setAttribute('data-bjpop', JSON.stringify(p.msgs)); io.observe(el); }
      });
    }

    /* 閒置陪聊:停下來沒動,主動關心一下(像有人在旁邊) */
    var idleTimer = null;
    function resetIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        if (!dismissed && !busy && !root.classList.contains('is-open')) enqueue(pickVary(SMALL_TALK));
      }, 8000);
    }
    window.addEventListener('scroll', resetIdle, { passive: true });
    window.addEventListener('mousemove', resetIdle, { passive: true });
    resetIdle();

    /* 開場招呼(回訪者會被「認出」) */
    var opener = returning
      ? (prevTopic ? '歡迎回來!😊 上次您看了「' + prevTopic + '」,要繼續了解,還是直接幫您安排報價?'
                   : '歡迎回來~又見面了 😊 需要我幫您接續上次的諮詢嗎?')
      : '嗨~我是小淨 👋 我會在旁邊陪您看,有任何想問的都可以喊我喔!';
    setTimeout(function () {
      if (!dismissed && !busy && !root.classList.contains('is-open') && !Object.keys(triggered).length)
        enqueue(opener);
    }, returning ? 1800 : 3500);

    /* 看到底:收尾關心一下 */
    var bottomDone = false;
    window.addEventListener('scroll', function () {
      if (bottomDone || dismissed) return;
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 140) {
        bottomDone = true;
        if ((RV.items || []).length) offerLine(); else enqueue(BOTTOM_TALK);
      }
    }, { passive: true });

    /* 記住瀏覽過的服務(供下次回訪認出) */
    Array.prototype.forEach.call(document.querySelectorAll('.bj-svc-item, .bj-svc-card'), function (el) {
      el.addEventListener('mouseenter', function () {
        var n = el.querySelector('.bj-svc-name, .bj-svc-card__title');
        if (n) addItem(n.textContent.replace(/\s+/g, ''));
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
/* ===== router(假頁面)===== */
(function () {
  var MAP   = { '/': 'bj-home', '/services': 'bj-services', '/about': 'bj-about', '/contact': 'bj-contact' };
  var PAGES = ['bj-home', 'bj-services', 'bj-about', 'bj-contact'];
  var current = '';

  function setActive(path) {
    document.querySelectorAll('.bj-nav__link, .bj-nav__mobile a').forEach(function (a) {
      a.classList.toggle('bj-nav__link--active', a.getAttribute('href') === path);
    });
  }
  function closeMenu() {
    var panel = document.querySelector('.bj-nav__mobile'); if (panel) panel.classList.remove('bj-nav__mobile--open');
    var tog   = document.querySelector('.bj-nav__toggle'); if (tog) tog.setAttribute('aria-expanded', 'false');
  }
  function show(path) {
    var id = MAP[path] || 'bj-home';
    PAGES.forEach(function (p) { var el = document.getElementById(p); if (el) el.style.display = (p === id) ? '' : 'none'; });
    setActive(path);
    current = path;
    closeMenu();
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event('bj:pageshow'));  // 讓 motion.html 重算捲動動畫
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null; if (!a) return;
    var href = a.getAttribute('href');
    if (href && href.charAt(0) === '/' && MAP.hasOwnProperty(href)) {
      e.preventDefault();
      if (href === current) { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }  // 已在同頁:不重播轉場
      if (window.bjCurtain) { window.bjCurtain(function () { show(href); }); } else { show(href); }
    }
  });

  function boot() { show('/'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();  // JS 若最後才載入(DOM 已就緒)也要立刻啟動
})();
