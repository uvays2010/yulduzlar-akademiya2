(function () {
  const field = document.querySelector("[data-game]");
  if (!field) return;
  const catcher = field.querySelector("#catcher");
  const scoreEl = document.querySelector("[data-game-score]");
  const livesEl = document.querySelector("[data-game-lives]");
  let x = 50;
  let score = 0;
  let lives = 5;
  let running = true;

  function setCatcher() {
    catcher.style.left = x + "%";
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") x = Math.max(8, x - 6);
    if (e.key === "ArrowRight") x = Math.min(92, x + 6);
    setCatcher();
  });
  field.addEventListener("mousemove", (e) => {
    const r = field.getBoundingClientRect();
    x = ((e.clientX - r.left) / r.width) * 100;
    x = Math.min(92, Math.max(8, x));
    setCatcher();
  });
  field.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    const r = field.getBoundingClientRect();
    x = ((t.clientX - r.left) / r.width) * 100;
    x = Math.min(92, Math.max(8, x));
    setCatcher();
  }, { passive: true });

  function spawn() {
    if (!running) return;
    const star = document.createElement("div");
    star.className = "star-fall";
    star.style.left = 8 + Math.random() * 84 + "%";
    star.style.top = "-16px";
    field.appendChild(star);
    let y = -16;
    const speed = 2 + Math.random() * 3;
    const id = setInterval(() => {
      y += speed;
      star.style.top = y + "px";
      const fr = field.getBoundingClientRect();
      const sr = star.getBoundingClientRect();
      const cr = catcher.getBoundingClientRect();
      const hit = sr.bottom >= cr.top && sr.left < cr.right && sr.right > cr.left && sr.top < cr.bottom;
      if (hit) {
        score += 1;
        scoreEl.textContent = score;
        star.remove();
        clearInterval(id);
        if (window.YA) YA.addXP(1, "Yulduz tutildi");
      } else if (y > fr.height - 10) {
        lives -= 1;
        livesEl.textContent = lives;
        star.remove();
        clearInterval(id);
        if (lives <= 0) {
          running = false;
          const over = document.querySelector("[data-game-over]");
          if (over) over.classList.remove("hidden");
        }
      }
    }, 16);
    if (running) setTimeout(spawn, 700 + Math.random() * 800);
  }
  spawn();

  const restart = document.querySelector("[data-restart]");
  if (restart) {
    restart.addEventListener("click", () => location.reload());
  }
})();
