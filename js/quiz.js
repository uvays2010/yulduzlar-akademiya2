(function () {
  const root = document.querySelector("[data-quiz]");
  if (!root || !window.YA_DATA) return;
  const set = root.getAttribute("data-quiz") || "asosiy";
  const questions = (YA_DATA.quiz[set] || YA_DATA.quiz.asosiy).slice();
  let i = 0, score = 0;
  const qEl = root.querySelector("[data-q]");
  const optEl = root.querySelector("[data-options]");
  const bar = root.querySelector("[data-bar]");
  const meta = root.querySelector("[data-meta]");
  const result = root.querySelector("[data-result]");
  const play = root.querySelector("[data-play]");

  function render() {
    if (i >= questions.length) {
      play.classList.add("hidden");
      result.classList.remove("hidden");
      result.querySelector("[data-score]").textContent = score + " / " + questions.length;
      const p = score / questions.length;
      const msg = result.querySelector("[data-msg]");
      msg.textContent = p === 1 ? "Mukammal! Siz haqiqiy yulduz kuzatuvchisisiz." : p >= 0.7 ? "A’lo natija. Sertifikat sahifasiga o‘ting." : "Yaxshi urinish. Darslarni qayta o‘qib ko‘ring.";
      if (window.YA) {
        const gained = 20 + score * 8;
        YA.addXP(gained, "Viktorina: " + set);
        const s = YA.load();
        s.quizzes = s.quizzes || {};
        s.quizzes[set] = Math.max(s.quizzes[set] || 0, score);
        if (p >= 0.7) {
          s.certs = s.certs || [];
          if (s.certs.indexOf(set) === -1) s.certs.push(set);
        }
        YA.save(s);
        if (window.YA_API && YA_API.ok) {
          YA_API.send("/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: (s.name || "Mehmon"),
              set: set,
              score: score,
              total: questions.length
            })
          }).catch(function () {});
        }
      }
      return;
    }
    const item = questions[i];
    qEl.textContent = item.q;
    meta.textContent = (i + 1) + "-savol / " + questions.length;
    bar.style.width = ((i / questions.length) * 100) + "%";
    optEl.innerHTML = "";
    item.options.forEach(function (text, idx) {
      const b = document.createElement("button");
      b.className = "option";
      b.textContent = text;
      b.addEventListener("click", function () { choose(idx, item.a, b); });
      optEl.appendChild(b);
    });
  }
  function choose(idx, answer, btn) {
    [].forEach.call(optEl.children, function (el, n) {
      el.disabled = true;
      if (n === answer) el.classList.add("correct");
    });
    if (idx === answer) score += 1;
    else btn.classList.add("wrong");
    setTimeout(function () { i += 1; render(); }, 650);
  }
  const again = root.querySelector("[data-again]");
  if (again) again.addEventListener("click", function () {
    i = 0; score = 0;
    result.classList.add("hidden");
    play.classList.remove("hidden");
    render();
  });
  render();
})();
