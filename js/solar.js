(function () {
  function drawSystem(canvas, opts) {
    if (!canvas || !window.YA_DATA) return;
    const interactive = !!(opts && opts.interactive);
    const ctx = canvas.getContext("2d");
    const planets = YA_DATA.planets;
    let t = 0, hover = -1;
    const info = document.querySelector("[data-orbit-info]");

    function resize() {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    const speeds = [4.1, 1.6, 1, 0.53, 0.08, 0.03, 0.011, 0.006];
    const sizes = [3, 5, 6, 4, 14, 12, 8, 8];

    canvas.addEventListener("mousemove", function (e) {
      if (!interactive) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      hover = -1;
      const w = r.width, h = r.height, cx = w / 2, cy = h / 2;
      planets.forEach(function (p, i) {
        const rad = 28 + (i + 1) * (Math.min(w, h) / 20);
        const ang = t * speeds[i];
        const px = cx + Math.cos(ang) * rad;
        const py = cy + Math.sin(ang) * rad * 0.55;
        if (Math.hypot(px - x, py - y) < sizes[i] + 8) hover = i;
      });
      canvas.style.cursor = hover >= 0 ? "pointer" : "default";
    });
    canvas.addEventListener("click", function () {
      if (hover >= 0) location.href = ( /\/pages\//.test(location.pathname) ? "" : "pages/") + "sayyora.html?id=" + planets[hover].id;
    });

    function loop() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      t += (window.YA_PREFS_STATE && YA_PREFS_STATE.orbitSlow==="on") ? 0.004 : 0.01;
      planets.forEach(function (p, i) {
        const rad = 28 + (i + 1) * (Math.min(w, h) / 20);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rad, rad * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hover === i ? "rgba(92,225,255,0.55)" : "rgba(150,190,255,0.16)";
        ctx.stroke();
      });
      const sunR = Math.min(w, h) / 22;
      const g = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, sunR);
      g.addColorStop(0, "#fff6c2");
      g.addColorStop(0.45, "#ffd166");
      g.addColorStop(1, "#ff7a32");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fill();

      planets.forEach(function (p, i) {
        const rad = 28 + (i + 1) * (Math.min(w, h) / 20);
        const ang = t * speeds[i];
        const px = cx + Math.cos(ang) * rad;
        const py = cy + Math.sin(ang) * rad * 0.55;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = hover === i ? 18 : 8;
        ctx.beginPath();
        ctx.arc(px, py, sizes[i] + (hover === i ? 2 : 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (interactive) {
          ctx.fillStyle = "#c9d4ef";
          ctx.font = "12px Manrope, sans-serif";
          ctx.fillText(p.name, px + 8, py - 8);
        }
      });
      if (info) {
        if (hover >= 0) {
          const p = planets[hover];
          info.innerHTML = "<b>" + p.name + "</b> — " + p.distanceText + ", " + p.moons + " yo‘ldosh. " + p.fact;
        } else info.textContent = "Sayyoraga boring: ustiga bosing.";
      }
      requestAnimationFrame(loop);
    }
    loop();
  }
  window.YA_SOLAR = drawSystem;
  const mini = document.getElementById("solar-mini");
  if (mini) drawSystem(mini, { interactive: false });
  const stage = document.getElementById("orbit-stage");
  if (stage) drawSystem(stage, { interactive: true });
})();
