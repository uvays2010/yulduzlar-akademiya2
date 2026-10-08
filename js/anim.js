(function () {
  const prefs = (window.YA_PREFS && YA_PREFS.load()) || {};
  if ((window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || prefs.motion === "off") return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = ( /\/pages\//.test(location.pathname) ? "../" : "") + "css/animations.css";
  document.head.appendChild(link);

  if (prefs.boot !== "off" && !sessionStorage.getItem("ya_booted")) {
    const boot = document.createElement("div");
    boot.className = "boot";
    boot.innerHTML = '<div><div class="comet"></div><b>Yulduzlar Akademiyasi</b><p style="color:#9aa8c7;margin-top:8px">portal ochilmoqda…</p></div>';
    document.body.appendChild(boot);
    sessionStorage.setItem("ya_booted", "1");
    setTimeout(function () { boot.remove(); }, 2100);
  }

  const targets = document.querySelectorAll(".card, .stat, section, .page-hero, .sec-head, table, .notice");
  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 8) * 0.06 + "s";
  });
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  document.querySelectorAll(".stat b").forEach(function (el) {
    const raw = el.textContent.trim();
    const num = parseInt(raw, 10);
    if (!num || /[a-zA-Z]/.test(raw)) return;
    const suffix = raw.replace(/[0-9]/g, "");
    let cur = 0;
    const step = Math.max(1, Math.ceil(num / 28));
    const id = setInterval(function () {
      cur += step;
      if (cur >= num) { cur = num; clearInterval(id); }
      el.textContent = cur + suffix;
    }, 40);
  });

  function meteor() {
    const s = document.createElement("div");
    s.className = "shooting";
    s.style.top = 6 + Math.random() * 40 + "vh";
    s.style.left = 30 + Math.random() * 60 + "vw";
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1200);
  }
  if (prefs.meteors !== "off") setInterval(meteor, 2800);
  if (prefs.meteors !== "off") setTimeout(meteor, 600);

  let last = 0;
  if (prefs.cursorTrail === "off") return;
  document.addEventListener("mousemove", function (e) {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;
    const d = document.createElement("i");
    d.className = "cursor-star";
    d.style.left = e.clientX + "px";
    d.style.top = e.clientY + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 700);
  });
})();
