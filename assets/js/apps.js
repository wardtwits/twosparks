/* Two Sparks — the apps. This list is the single source for the app cards on
   index.html and work.html, and for the app picker and support list on contact.html.
   To add an app, add one object to APPS. Include it with a plain (non-deferred)
   <script> at the end of <main>, so the cards exist before first paint (no layout
   shift) and before main.js wires up reveals and card highlights. */
(function () {
  "use strict";

  var APPS = [
    {
      id: "viisi",
      name: "Viisi",
      icon: "assets/img/viisi-icon.png",
      media: {
        src: "assets/img/viisi.jpg",
        srcset: "assets/img/viisi-800.jpg 800w, assets/img/viisi.jpg 1400w",
        alt: "Viisi website showing the daily word puzzle and a phone preview of the app",
        width: 1400,
        height: 875,
        style: "viisi"
      },
      hook: "Five letters. Five words. One puzzle.",
      description:
        "Viisi is a daily anagram word game for iOS. Everyone gets the same five letters each day, and the goal is to find five words that use them. There are no ads, no account to make, and it works offline.",
      features: [
        ["Daily shared puzzle", "with a new set of letters every morning"],
        ["Hints that unlock gently,", "plus an Expert Mode with no hints at all"],
        ["Stats, streaks & badges", "along with a full archive of past puzzles"],
        ["No ads, no account, works offline", "and optional iCloud sync between your devices"]
      ],
      why: "", // PLACEHOLDER: one sentence on why you built Viisi. Left empty so nothing renders until filled.
      platforms: ["iOS"],
      primary: { label: "Download on the App Store", href: "https://apps.apple.com/app/id6755663622" },
      links: [
        { label: "viisi.app", href: "https://viisi.app" },
        { label: "Support", href: "mailto:support@viisi.app" },
        { label: "Privacy policy", href: "https://viisi.app/privacy.html" }
      ],
      support: { label: "support@viisi.app", href: "mailto:support@viisi.app" }
    },
    {
      id: "castlink",
      name: "CastLink",
      icon: "assets/img/castlink-icon.png",
      media: {
        src: "assets/img/castlink-icon.png",
        alt: "CastLink app icon: a golden film reel wrapped in film strip",
        width: 256,
        height: 256,
        style: "castlink"
      },
      hook: "Where have I seen them before?",
      description:
        "CastLink compares any two movies or TV shows to show the cast they share, or any two actors to show the titles they have both been in. It can also trace the path from a film actor back to Kevin Bacon. Use it on the web or on iOS.",
      features: [
        ["Shared cast", "between any movies or TV shows"],
        ["Shared titles", "between any two actors"],
        ["Degrees of Kevin Bacon", "with movie-only connection paths"],
        ["Powered by TMDB", "for up-to-date film and TV data"]
      ],
      why: "", // PLACEHOLDER: one sentence on why you built CastLink.
      platforms: ["Web", "iOS"],
      primary: { label: "Download on the App Store", href: "https://apps.apple.com/us/app/castlink/id6760738115" },
      links: [
        { label: "Use it on castlink.app", href: "https://castlink.app" },
        { label: "Support", href: "mailto:Support@CastLink.app" },
        { label: "Privacy policy", href: "https://castlink.app/privacy.html" }
      ],
      support: { label: "Support@CastLink.app", href: "mailto:Support@CastLink.app" }
    },
    {
      id: "css-scratchpad",
      name: "CSS Scratchpad",
      icon: "assets/img/css-scratchpad-icon.png",
      media: {
        src: "assets/img/css-scratchpad-icon.png",
        alt: "CSS Scratchpad icon: a code tag between curly braces",
        width: 128,
        height: 128,
        style: "scratchpad"
      },
      hook: "Test CSS on any page without touching the source.",
      description:
        "CSS Scratchpad is a Chrome extension that opens a floating, draggable CSS panel on whatever page you are looking at. Pick an element to pull its styles in, then live-edit them; changes apply without needing !important. The panel sits in a Shadow DOM, so the CSS you test can't break it, and your CSS is saved locally in the browser.",
      features: [
        ["Element picker", "pulls a selected element's styles into the panel"],
        ["Live edit mode", "applies changes without !important"],
        ["Shadow DOM panel", "so the CSS you test can't break the tool"],
        ["Private by design", "no accounts, analytics, tracking, or servers"]
      ],
      why: "", // PLACEHOLDER: one sentence on why you built CSS Scratchpad.
      platforms: ["Chrome extension"],
      primary: {
        label: "Get it on the Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/jdnkfapcdcobhmbhhinhdlhfdgpoodgl"
      },
      links: [
        { label: "Website", href: "https://wardtwits.github.io/css-scratchpad/" },
        { label: "Demo video", href: "https://www.youtube.com/watch?v=yzAQKqkq5pc" },
        { label: "Support", href: "contact.html?about=css-scratchpad" },
        { label: "Privacy policy", href: "https://wardtwits.github.io/css-scratchpad/privacy-policy.html" }
      ],
      support: { label: "Use the form on this page", href: "contact.html?about=css-scratchpad" }
    }
  ];

  var ARROW_OUT =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5"/></svg>';

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isExternal(href) {
    return /^https?:/.test(href);
  }

  function link(item, className) {
    var attrs = isExternal(item.href) ? ' target="_blank" rel="noopener"' : "";
    return (
      '<a class="' + className + '" href="' + esc(item.href) + '"' + attrs + ">" + esc(item.label) +
      (isExternal(item.href) ? ARROW_OUT : "") + "</a>"
    );
  }

  function media(app, className) {
    var m = app.media;
    return (
      '<div class="' + className + " project-media project-media--" + esc(m.style) + '">' +
      '<img src="' + esc(m.src) + '"' +
      (m.srcset ? ' srcset="' + esc(m.srcset) + '" sizes="(max-width: 900px) 100vw, 560px"' : "") +
      ' alt="' + esc(m.alt) + '" width="' + m.width + '" height="' + m.height + '" loading="lazy">' +
      "</div>"
    );
  }

  function heading(app, level) {
    return (
      "<h" + level + ' class="app-name" id="app-' + esc(app.id) + '">' +
      '<img class="app-icon" src="' + esc(app.icon) + '" alt="" width="44" height="44">' +
      esc(app.name) + "</h" + level + ">"
    );
  }

  function platforms(app) {
    return (
      '<ul class="tags platforms" aria-label="Platforms">' +
      app.platforms.map(function (p) {
        return "<li>" + esc(p) + "</li>";
      }).join("") +
      "</ul>"
    );
  }

  function body(app) {
    return (
      '<p class="tagline">' + esc(app.hook) + "</p>" +
      '<p class="app-description">' + esc(app.description) + "</p>"
    );
  }

  function why(app) {
    return app.why ? '<p class="app-why"><strong>Why I built it:</strong> ' + esc(app.why) + "</p>" : "";
  }

  function actions(app) {
    return (
      '<div class="app-actions">' + link(app.primary, "btn btn-primary") + "</div>" +
      '<ul class="app-links" aria-label="More about ' + esc(app.name) + '">' +
      app.links.map(function (l) {
        return "<li>" + link(l, "app-link") + "</li>";
      }).join("") +
      "</ul>"
    );
  }

  function card(app, i) {
    return (
      '<article class="card project reveal" style="--delay:' + (i * 0.08).toFixed(2) + 's" aria-labelledby="app-' + esc(app.id) + '">' +
      media(app, "") +
      '<div class="project-body">' +
      '<div class="project-meta">' + heading(app, 3) + platforms(app) + "</div>" +
      body(app) + why(app) + actions(app) +
      "</div></article>"
    );
  }

  function caseStudy(app) {
    return (
      '<article class="card case reveal" aria-labelledby="app-' + esc(app.id) + '">' +
      media(app, "case-media") +
      '<div class="case-body">' +
      platforms(app) + heading(app, 2) + body(app) +
      '<ul class="features">' +
      app.features.map(function (f) {
        return "<li>" + esc(f[0]) + " <span>" + esc(f[1]) + "</span></li>";
      }).join("") +
      "</ul>" +
      why(app) + actions(app) +
      "</div></article>"
    );
  }

  function render(selector, fn, join) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.innerHTML = APPS.map(fn).join(join || "");
    });
  }

  render('[data-apps="cards"]', card);
  render('[data-apps="cases"]', caseStudy);

  render('[data-apps="support"]', function (app) {
    return "<li><b>" + esc(app.name) + "</b> " + link(app.support, "app-link") + "</li>";
  });

  // Contact form "About" picker: one option per app, before the static "Something else".
  var select = document.querySelector('select[data-apps="options"]');
  if (select) {
    var other = select.querySelector("[data-other]");
    var wanted = new URLSearchParams(window.location.search).get("about");
    APPS.forEach(function (app) {
      var picked = app.id === wanted;
      var option = new Option(app.name, app.name, picked, picked);
      select.insertBefore(option, other);
    });
  }
})();
