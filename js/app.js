(function () {
  const IN_PAGES = /\/pages\//.test(location.pathname);
  const R = IN_PAGES ? ".." : ".";
  const P = IN_PAGES ? "" : "pages/";
  const KEY = "ya_academy_v2";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(data) {
    const cur = Object.assign(load(), data);
    localStorage.setItem(KEY, JSON.stringify(cur));
    return cur;
  }
  window.YA = {
    root: R,
    load: load,
    save: save,
    addXP: function (n, reason) {
      const s = load();
      s.xp = (s.xp || 0) + n;
      s.log = s.log || [];
      s.log.unshift({ t: Date.now(), n: n, reason: reason || "Faoliyat" });
      s.log = s.log.slice(0, 20);
      save(s);
      toast("+" + n + " XP — " + (reason || "Faoliyat"));
      document.querySelectorAll("[data-xp]").forEach(function (el) { el.textContent = s.xp + " XP"; });
    },
    mark: function (id) {
      const s = load();
      s.done = s.done || [];
      if (s.done.indexOf(id) === -1) {
        s.done.push(id);
        save(s);
        this.addXP(15, id);
      }
    }
  };

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 2200);
  }
  window.YA.toast = toast;

  function mountChrome() {
    if (!document.querySelector(".nebula")) {
      const n = document.createElement("div");
      n.className = "nebula";
      document.body.prepend(n);
    }
    if (!document.getElementById("star-canvas")) {
      const c = document.createElement("canvas");
      c.id = "star-canvas";
      document.body.prepend(c);
      stars(c);
    }

    const nav = document.querySelector(".nav");
    if (nav) {
      nav.innerHTML = '\
        <div class="nav-video" aria-hidden="true"><video autoplay muted loop playsinline><source src="' + R + '/media/nav-space.mp4" type="video/mp4"></video></div>\
        <div class="nav-inner">\
          <a class="logo" href="' + R + '/index.html"><span class="logo-mark">✦</span> Yulduzlar Akademiyasi</a>\
          <nav class="nav-links" data-nav>\
            <a class="nav-home" href="' + R + '/index.html">Bosh sahifa</a>\
            <div class="nav-drop">\
              <button class="nav-btn" type="button" data-drop>O‘quv ▾</button>\
              <div class="mega-menu">\
                <div><strong>Atlas</strong>\
                  <a href="' + P + 'sayyoralar.html">Sayyoralar</a>\
                  <a href="' + P + 'orbit.html">Orbit</a>\
                  <a href="' + P + 'solishtirish.html">Solishtirish</a>\
                  <a href="' + P + 'quyosh-sistemasi.html">Quyosh sistemasi</a>\
                </div>\
                <div><strong>Dars</strong>\
                  <a href="' + P + 'darslar.html">Mini-kurslar</a>\
                  <a href="' + P + 'tarix.html">Tarix</a>\
                  <a href="' + P + 'lugat.html">Lug‘at</a>\
                  <a href="' + P + 'oy-fazalari.html">Oy fazasi</a>\
                </div>\
                <div><strong>Sinov</strong>\
                  <a href="' + P + 'viktorina.html">Viktorina</a>\
                  <a href="' + P + 'olimpiada.html">Olimpiada</a>\
                  <a href="' + P + 'oyin.html">O‘yin</a>\
                  <a href="' + P + 'sertifikat.html">Sertifikat</a>\
                </div>\
              </div>\
            </div>\
            <a href="' + P + 'viktorina.html">Viktorina</a>\
            <a href="' + P + 'kabinet.html">Kabinet</a>\
            <a href="' + P + 'sozlamalar.html">Sozlamalar</a>\
            <button class="nav-btn" type="button" data-open-search>Qidiruv</button>\
            <span class="xp-pill" data-xp>' + (load().xp || 0) + ' XP</span>\
            <a class="nav-cta" href="' + P + 'aloqa.html">Qo‘shilish</a>\
          </nav>\
          <button class="burger" data-burger aria-label="Menyu">☰</button>\
        </div>';
    }

    const foot = document.querySelector("footer");
    if (foot) {
      foot.innerHTML = '\
        <div class="wrap foot-grid">\
          <div><a class="logo" href="' + R + '/index.html"><span class="logo-mark">✦</span> Yulduzlar Akademiyasi</a>\
          <p>O‘quvchilar uchun to‘liq astronomik portal: atlas, simulyator, testlar, kabinet va vositalar.</p></div>\
          <div><h4>O‘quv</h4>\
            <a href="' + P + 'darslar.html">Darslar</a>\
            <a href="' + P + 'sayyoralar.html">Sayyoralar</a>\
            <a href="' + P + 'orbit.html">Orbit</a>\
            <a href="' + P + 'olimpiada.html">Olimpiada</a>\
            <a href="' + P + 'reyting.html">Reyting</a></div>\
          <div><h4>Vositalar</h4>\
            <a href="' + P + 'vositalar.html">Og‘irlik</a>\
            <a href="' + P + 'konvertor.html">Konvertor</a>\
            <a href="' + P + 'oy-fazalari.html">Oy fazasi</a>\
            <a href="' + P + 'solishtirish.html">Solishtirish</a></div>\
          <div><h4>Portal</h4>\
            <a href="' + P + 'kabinet.html">Kabinet</a>\
            <a href="' + P + 'sozlamalar.html">Sozlamalar</a>\
            <a href="' + P + 'xarita.html">Sayt xaritasi</a>\
            <a href="' + P + 'sertifikat.html">Sertifikat</a>\
            <a href="' + P + 'haqida.html">Haqida</a>\
            <a href="' + P + 'savollar.html">Savollar</a>\
            <a href="' + P + 'klub.html">Klub</a>\
            <a href="' + P + 'boshqaruv.html">Boshqaruv</a>\
            <a href="/panel">Backend panel</a></div>\
        </div>\
        <div class="wrap copy"><span>© ' + new Date().getFullYear() + ' Yulduzlar Akademiyasi · o‘quv loyihasi</span><span>Qidiruv: <span class="kbd">Ctrl</span> + <span class="kbd">K</span></span></div>';
    }

    const burger = document.querySelector("[data-burger]");
    const links = document.querySelector("[data-nav]");
    function setMenu(open) {
      if (!links) return;
      var small = window.matchMedia("(max-width: 1100px)").matches;
      if (open && small) {
        document.body.appendChild(links);
        links.classList.add("nav-sheet");
        links.style.cssText = "display:flex;position:fixed;top:62px;left:0;right:0;bottom:0;z-index:300;flex-direction:column;align-items:stretch;gap:8px;padding:12px 14px 28px;background:#070b18;overflow-y:auto;width:100%;";
        links.querySelectorAll(":scope > a, :scope > button, :scope > span, :scope > .nav-drop").forEach(function (el) {
          el.style.width = "100%";
          el.style.maxWidth = "100%";
          el.style.boxSizing = "border-box";
        });
        var menu = links.querySelector(".mega-menu");
        if (menu) {
          menu.style.position = "static";
          menu.style.width = "100%";
          menu.style.right = "auto";
          menu.style.left = "auto";
          menu.style.gridTemplateColumns = "1fr";
        }
      } else if (!open) {
        links.classList.remove("nav-sheet");
        links.style.cssText = "";
        if (links.parentElement === document.body) {
          var inner = document.querySelector(".nav-inner");
          var burgerBtn = document.querySelector("[data-burger]");
          if (inner && burgerBtn) inner.insertBefore(links, burgerBtn);
        }
      }
      links.classList.toggle("open", open);
      document.body.classList.toggle("nav-lock", open);
      if (burger) burger.textContent = open ? "✕" : "☰";
    }
    if (burger && links) {
      burger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        setMenu(!links.classList.contains("open"));
      });
    }
    const drop = document.querySelector("[data-drop]");
    if (drop) {
      drop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        drop.parentElement.classList.toggle("open");
      });
    }

    const file = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav] a").forEach(function (a) {
      const href = a.getAttribute("href") || "";
      if (href.endsWith(file)) a.classList.add("active");
    });
  }

  function stars(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dots;
    function resize() {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      dots = Array.from({ length: Math.min(180, Math.floor(w * h / 9000)) }, function () {
        return { x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4, a: Math.random(), s: 0.002 + Math.random() * 0.008 };
      });
    }
    resize();
    addEventListener("resize", resize);
    (function loop() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(function (d) {
        d.a += d.s;
        ctx.globalAlpha = 0.25 + Math.abs(Math.sin(d.a)) * 0.75;
        ctx.fillStyle = "#dbe7ff";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  function mountSearch() {
    const box = document.createElement("div");
    box.className = "overlay";
    box.innerHTML = '<div class="cmd-box"><div class="cmd"><input data-cmd placeholder="Sahifa, sayyora, atama qidiring…" /></div><div class="cmd-list" data-cmd-list></div></div>';
    document.body.appendChild(box);
    const input = box.querySelector("[data-cmd]");
    const list = box.querySelector("[data-cmd-list]");
    function items(q) {
      q = (q || "").toLowerCase();
      const out = [];
      (YA_DATA.pages || []).forEach(function (p) {
        if (!q || (p[0] + p[2]).toLowerCase().indexOf(q) > -1) out.push({ t: p[0], s: p[2], href: (IN_PAGES ? (p[1].indexOf("pages/") === 0 ? p[1].slice(6) : "../" + p[1]) : p[1]) });
      });
      (YA_DATA.planets || []).forEach(function (p) {
        if (!q || p.name.toLowerCase().indexOf(q) > -1) out.push({ t: p.name, s: "sayyora", href: P + "sayyora.html?id=" + p.id });
      });
      return out.slice(0, 16);
    }
    function render() {
      list.innerHTML = items(input.value).map(function (i) {
        return '<a class="cmd-item" href="' + i.href + '"><b>' + i.t + '</b> · ' + i.s + "</a>";
      }).join("") || '<div class="cmd-item">Hech narsa topilmadi</div>';
    }
    function open() { box.classList.add("open"); input.value = ""; render(); input.focus(); }
    function close() { box.classList.remove("open"); }
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-search]")) open();
      if (e.target === box) close();
    });
    input.addEventListener("input", render);
  }

  function extras() {
    const factBox = document.querySelector("[data-random-fact]");
    if (factBox && window.YA_DATA) {
      const facts = YA_DATA.facts;
      const pick = function () { return facts[Math.floor(Math.random() * facts.length)]; };
      factBox.textContent = pick();
      const btn = document.querySelector("[data-new-fact]");
      if (btn) btn.addEventListener("click", function () {
        factBox.textContent = pick();
        YA.addXP(2, "Yangi fakt");
      });
    }
    const search = document.querySelector("[data-planet-search]");
    const chips = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-planet-card]");
    function applyFilter() {
      const q = (search ? search.value : "").toLowerCase().trim();
      const active = document.querySelector("[data-filter].active");
      const group = active ? active.dataset.filter : "all";
      cards.forEach(function (card) {
        const name = (card.dataset.name || "").toLowerCase();
        const type = card.dataset.type || "";
        card.style.display = (!q || name.indexOf(q) > -1) && (group === "all" || type === group) ? "" : "none";
      });
    }
    if (search) search.addEventListener("input", applyFilter);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        applyFilter();
      });
    });
    const form = document.querySelector("[data-contact]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const payload = {
          name: (form.name && form.name.value) || "",
          school: (form.school && form.school.value) || "",
          topic: (form.topic && form.topic.value) || "",
          msg: (form.msg && form.msg.value) || ""
        };
        function done() {
          const ok = document.querySelector("[data-form-ok]");
          if (ok) ok.classList.remove("hidden");
          form.reset();
          YA.addXP(10, "Xabar yuborildi");
        }
        if (window.YA_API && YA_API.ok) {
          YA_API.send("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }).then(done).catch(function (err) { toast((err && err.message) || "Xabar yuborilmadi"); });
        } else {
          done();
        }
      });
    }
    document.querySelectorAll("[data-acc]").forEach(function (btn) {
      btn.addEventListener("click", function () { btn.nextElementSibling.classList.toggle("hidden"); });
    });
    const calcBtn = document.querySelector("[data-weight]");
    if (calcBtn) {
      calcBtn.addEventListener("click", function () {
        const kg = parseFloat(document.querySelector("[data-kg]").value);
        const g = parseFloat(document.querySelector("[data-g]").value);
        const out = document.querySelector("[data-weight-out]");
        if (!kg || !g) { out.textContent = "Iltimos, massani va sayyorani tanlang."; return; }
        out.textContent = "Bu sayyorada taxminan " + (kg * g / 9.81).toFixed(1) + " kg og‘irlikdagi ta’sir seziladi (sodda hisob).";
        YA.addXP(5, "Kalkulyator");
      });
    }
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  function visitLesson() {
    const file = location.pathname.split("/").pop() || "index.html";
    if (window.YA_API && YA_API.ok) {
      YA_API.send("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: file })
      }).catch(function () {});
    }
    const map = {
      "sayyoralar.html": "atlas",
      "quyosh-sistemasi.html": "tizim",
      "tarix.html": "tarix",
      "kuzatuv.html": "kuzatuv",
      "lugat.html": "lugat",
      "orbit.html": "orbit"
    };
    if (map[file]) {
      const s = load();
      s.seen = s.seen || [];
      if (s.seen.indexOf(map[file]) === -1) {
        s.seen.push(map[file]);
        save(s);
        YA.addXP(8, "Dars ochildi");
      }
    }
  }

  if (!window.YA_API) {
    var apiScript = document.createElement("script");
    apiScript.src = R + "/js/api.js";
    document.head.appendChild(apiScript);
  }
  function applyLocalPrefs() {
    if (window.YA_PREFS) YA_PREFS.apply();
  }
  function applyServerSettings(cfg) {
    if (!cfg) return;
    window.YA_SETTINGS = cfg;
    document.querySelectorAll(".logo").forEach(function (el) {
      const mark = el.querySelector(".logo-mark");
      el.innerHTML = "";
      if (mark) el.appendChild(mark);
      el.appendChild(document.createTextNode(" " + (cfg.siteName || "Yulduzlar Akademiyasi")));
    });
    if (cfg.welcomeBanner && !document.querySelector("[data-banner]")) {
      const b = document.createElement("div");
      b.className = "notice";
      b.setAttribute("data-banner", "1");
      b.style.margin = "12px auto";
      b.style.width = "min(1240px, calc(100% - 40px))";
      b.style.position = "relative";
      b.style.zIndex = "3";
      b.textContent = cfg.maintenance ? (cfg.maintenanceText || cfg.welcomeBanner) : cfg.welcomeBanner;
      const page = document.querySelector(".page");
      if (page) page.prepend(b);
    }
    if (cfg.footerNote) {
      document.querySelectorAll("footer .copy span:first-child").forEach(function (el) {
        el.textContent = cfg.footerNote;
      });
    }
    document.documentElement.style.fontSize = ((cfg.fontScale || 100) / 100) * 16 + "px";
    const accents = { cyan: "#5ce1ff", gold: "#ffd166", violet: "#8b7cff", green: "#5dffb1" };
    document.documentElement.style.setProperty("--cyan", accents[cfg.accent] || accents.cyan);
    if (cfg.theme === "deeper") document.body.style.background = "#02040a";
    if (cfg.theme === "aurora") document.body.style.background = "radial-gradient(circle at 20% 0%, #16305a, #040712 55%)";
    if (cfg.reduceMotion) {
      const s = document.createElement("style");
      s.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}";
      document.head.appendChild(s);
    }
    if (cfg.showXP === false) document.querySelectorAll(".xp-pill").forEach(function (el) { el.style.display = "none"; });
    if (cfg.allowContact === false) {
      document.querySelectorAll("[data-contact] button, [data-contact] .btn").forEach(function (el) { el.disabled = true; el.textContent = "Forma yopiq"; });
    }
    if (cfg.maintenance) {
      document.querySelectorAll(".btn-primary").forEach(function (el) { el.style.opacity = ".7"; });
    }
  }
  function loadServerSettings() {
    function go() {
      if (!window.YA_API || !YA_API.ok) return;
      YA_API.send("/api/settings").then(function (d) { applyServerSettings(d.item); }).catch(function () {});
    }
    setTimeout(go, 350);
    setTimeout(go, 1200);
  }
  applyLocalPrefs();
  mountChrome();
  mountSearch();
  extras();
  visitLesson();
  loadServerSettings();
  var s = document.createElement("script");
  s.src = R + "/js/anim.js";
  document.body.appendChild(s);
})();
