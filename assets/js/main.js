/* Two Sparks — progressive enhancements. The site works without JS. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  /* ---------- Header: scrolled state + mobile menu ---------- */

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  /* ---------- Footer year ---------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll reveal ---------- */

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Card pointer highlight ---------- */

  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------- Starfield ---------- */

  var canvas = document.querySelector(".sky canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var stars = [];
    var dpr = 1;
    var w = 0;
    var h = 0;
    var palette = ["255,255,255", "255,214,120", "160,190,255"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.round(Math.min(160, (w * h) / 9000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random() * 0.6 + 0.15,
          speed: Math.random() * 0.002 + 0.0005,
          phase: Math.random() * Math.PI * 2,
          color: palette[Math.random() < 0.75 ? 0 : Math.random() < 0.6 ? 1 : 2],
          drift: Math.random() * 0.05 + 0.01
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var alpha = reduceMotion ? s.a : s.a * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        if (!reduceMotion) {
          s.y -= s.drift;
          if (s.y < -2) {
            s.y = h + 2;
            s.x = Math.random() * w;
          }
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + s.color + "," + alpha.toFixed(3) + ")";
        ctx.fill();
      }
    }

    var running = false;
    function loop(t) {
      if (!running) return;
      draw(t);
      requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion) {
        draw(0);
        return;
      }
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    }

    resize();
    start();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        if (reduceMotion) draw(0);
      }, 150);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
      } else {
        start();
      }
    });
  }

  /* ---------- Contact form (static hosting: composes an email) ---------- */

  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var to = form.getAttribute("data-email");

    function setError(field, message) {
      var input = form.elements[field];
      var error = form.querySelector('[data-error-for="' + field + '"]');
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message || "";
      return !message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var about = form.elements.about.value;
      var message = form.elements.message.value.trim();

      var ok = [
        setError("name", name ? "" : "Please add your name."),
        setError("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Please add a valid email."),
        setError("message", message.length >= 10 ? "" : "Tell me a little more (10+ characters).")
      ].every(Boolean);

      if (!ok) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var subject = (about ? about + ": " : "") + "Message from " + name;
      var body = message + "\n\n— " + name + " (" + email + ")" + (about ? "\nAbout: " + about : "");

      window.location.href =
        "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      status.textContent =
        "Opening your email app… If nothing happens, email " + to + " directly.";
    });
  }

  /* ---------- Copy email button ---------- */

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var label = btn.textContent;
      function done(text) {
        btn.textContent = text;
        setTimeout(function () {
          btn.textContent = label;
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () {
            done("Copied!");
          },
          function () {
            done("Copy failed");
          }
        );
      } else {
        done("Copy failed");
      }
    });
  });
})();
