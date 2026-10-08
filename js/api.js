(function () {
  const candidates = [
    (window.YA_API_URL || "").replace(/\/$/, ""),
    location.port === "3000" ? "" : "http://localhost:3000"
  ].filter(function (x, i, a) { return a.indexOf(x) === i; });

  window.YA_API = {
    base: "",
    ok: false,
    url: function (path) {
      return (this.base || "") + path;
    },
    send: function (path, opts) {
      return fetch(this.url(path), opts).then(function (r) {
        return r.json().then(function (data) {
          if (!r.ok || data.ok === false) throw new Error(data.error || "Xato");
          return data;
        });
      });
    }
  };

  (function ping() {
    var i = 0;
    function next() {
      if (i >= candidates.length) return;
      var base = candidates[i++];
      fetch(base + "/api/health").then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.ok) {
          YA_API.base = base;
          YA_API.ok = true;
          document.querySelectorAll("[data-api-state]").forEach(function (el) {
            el.textContent = "Backend ulangan";
          });
        } else next();
      }).catch(next);
    }
    next();
  })();
})();
