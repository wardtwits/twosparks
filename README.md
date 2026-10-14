# Two Sparks

Static portfolio site for Two Sparks Software. Plain HTML, CSS, and JS with no build step, made for GitHub Pages.

## Structure

```
index.html      Home
work.html       Portfolio / case studies
about.html      About Chris
contact.html    Contact form (opens the visitor's email app; no server needed)
404.html        Not-found page (GitHub Pages serves it automatically)
assets/css/     styles.css: all styles; colour tokens live in :root
assets/js/      main.js: menu, starfield, scroll reveals, contact form
assets/img/     logo mark, favicons, project images
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

- **Contact email:** `Chris@twosparks.app`, set in `contact.html` (form `data-email`, mailto link, and copy button).
- **Add a project:** copy an `<article class="card case">` block in `work.html` (and an `<article class="card project">` on the home page if you want to feature it there).
