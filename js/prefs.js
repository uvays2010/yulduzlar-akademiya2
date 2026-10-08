(function () {
  const KEY = "ya_ui_prefs";
  const DEFAULTS = {
    font: "100",
    accent: "cyan",
    theme: "dark",
    motion: "on",
    stars: "on",
    meteors: "on",
    cursorTrail: "on",
    boot: "on",
    compact: "off",
    contrast: "off",
    glow: "on",
    showXP: "on",
    bigButtons: "off",
    showBanner: "on",
    nickname: "",
    radius: "22",
    width: "1240",
    lineHeight: "165",
    letter: "off",
    stickyNav: "on",
    crumbs: "on",
    tags: "on",
    cardHover: "on",
    underlines: "off",
    focusRing: "on",
    footer: "on",
    twoCol: "off",
    dimNight: "off",
    sound: "off",
    orbitSlow: "off",
    hideStats: "off",
    sharp: "off"
  };
  const ACCENT = { cyan: "#5ce1ff", gold: "#ffd166", violet: "#8b7cff", green: "#5dffb1", orange: "#ff9a4a" };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save(prefs) {
    const next = Object.assign(load(), prefs || {});
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.04;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      setTimeout(function () { o.stop(); ctx.close(); }, 120);
    } catch (e) {}
  }
  function apply(prefs) {
    prefs = prefs || load();
    const root = document.documentElement;
    root.style.fontSize = (Number(prefs.font || 100) / 100) * 16 + "px";
    root.style.setProperty("--cyan", ACCENT[prefs.accent] || ACCENT.cyan);
    root.style.setProperty("--radius", (prefs.sharp === "on" ? 8 : Number(prefs.radius || 22)) + "px");
    root.style.setProperty("--max", (prefs.width || 1240) + "px");
    document.body.style.lineHeight = (Number(prefs.lineHeight || 165) / 100).toFixed(2);
    if (prefs.theme === "deeper") document.body.style.background = "#02040a";
    else if (prefs.theme === "aurora") document.body.style.background = "radial-gradient(circle at 18% 0%, #1a3a6a, #040712 58%)";
    else if (prefs.theme === "dusk") document.body.style.background = "radial-gradient(circle at 80% 0%, #3a2048, #07040c 60%)";
    else document.body.style.background = "";

    let box = document.getElementById("ya-pref-style");
    if (!box) { box = document.createElement("style"); box.id = "ya-pref-style"; document.head.appendChild(box); }
    let css = "";
    if (prefs.motion === "off") css += "*,*::before,*::after{animation:none!important;transition:none!important}";
    if (prefs.stars === "off") css += "#star-canvas,.nebula,.nav-video{display:none!important}";
    if (prefs.compact === "on") css += ".card{padding:12px!important}section{padding:36px 0}";
    if (prefs.contrast === "on") css += "body{color:#fff}.lead,.card p,footer p{color:#e4ecff!important}";
    if (prefs.glow === "off") css += ".logo-mark,.btn-primary,.badge-live,.orb{box-shadow:none!important}";
    if (prefs.showXP === "off") css += ".xp-pill{display:none!important}";
    if (prefs.bigButtons === "on") css += ".btn,.chip,.option{padding:16px 22px!important;font-size:1.05rem}";
    if (prefs.showBanner === "off") css += "[data-banner]{display:none!important}";
    if (prefs.letter === "on") css += "body,p,.lead{letter-spacing:.03em}";
    if (prefs.stickyNav === "off") css += ".nav{position:relative!important}";
    if (prefs.crumbs === "off") css += ".breadcrumbs{display:none!important}";
    if (prefs.tags === "off") css += ".tag{display:none!important}";
    if (prefs.cardHover === "off") css += ".card:hover{transform:none!important}";
    if (prefs.underlines === "on") css += "a{text-decoration:underline}";
    if (prefs.focusRing === "on") css += "button:focus,a:focus,input:focus,select:focus{outline:2px solid var(--cyan);outline-offset:3px}";
    if (prefs.footer === "off") css += "footer{display:none!important}";
    if (prefs.twoCol === "on") css += ".grid-3,.grid-4{grid-template-columns:1fr 1fr!important}";
    if (prefs.hideStats === "off") {} else css += ".stats{display:none!important}";
    if (prefs.dimNight === "on") {
      const h = new Date().getHours();
      if (h >= 21 || h < 6) css += "body::after{content:'';position:fixed;inset:0;background:rgba(0,0,20,.28);pointer-events:none;z-index:3}";
    }
    box.textContent = css;
    document.querySelectorAll("[data-nick]").forEach(function (el) {
      el.textContent = prefs.nickname || "o‘quvchi";
    });
    window.YA_PREFS_STATE = prefs;
  }

  window.YA_PREFS = {
    key: KEY,
    defaults: DEFAULTS,
    load: load,
    save: save,
    apply: apply,
    beep: beep,
    set: function (patch) {
      const next = save(patch);
      apply(next);
      if (next.sound === "on") beep();
      return next;
    },
    reset: function () {
      localStorage.removeItem(KEY);
      apply(DEFAULTS);
      return Object.assign({}, DEFAULTS);
    }
  };
  apply(load());
})();
