# Two Sparks

Personal site for the apps Chris builds on the side (Two Sparks Software). Plain HTML, CSS, and JS with no build step, made for GitHub Pages.

## Structure

```
index.html      Home
work.html       Apps (nav label "Apps"; filename kept so existing links work)
about.html      About Chris
contact.html    Contact form (opens the visitor's email app; no server needed)
404.html        Not-found page (GitHub Pages serves it automatically)
assets/css/     styles.css: all styles; colour tokens live in :root
assets/js/      apps.js: app data + card rendering; main.js: menu, starfield, scroll reveals, contact form
assets/img/     logo mark, favicons, app icons, og-image.jpg (1200×630 share image)
images/         author illustration (about page)
twosparks.png   Original full logo
```

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Go to **Settings → Pages → Build and deployment**, then set Source to *Deploy from a branch*, Branch to `main`, and folder to `/ (root)`.
3. Optional custom domain: add it under Settings → Pages. GitHub will create a `CNAME` file.

## Editing

- **Contact email:** `Chris@twosparks.software`, set in `contact.html` (form `data-email`, mailto link, and copy button) and `about.html`.
- **Add an app:** add one object to `APPS` in `assets/js/apps.js`. It appears on the home page, the Apps page, and the contact form's "About" picker and support list. Also update the `<noscript>` fallbacks in `index.html` and `work.html`.
