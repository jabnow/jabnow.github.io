# jabnow.github.io

A small interactive filing cabinet for past projects and works-in-progress.
Hosted as a static site on GitHub Pages at <https://jabnow.github.io>.

## Features

- **Force-directed graph home view** — every project is a hexagon orbiting a
  center "Jabnow" node. Click a node to edit, drag to rearrange.
- **List view** — search, category folders, and sort (recent / title /
  category) over a clean numbered work-list.
- **Add / Edit / Delete** — quick form persists changes immediately.
- **Browser-local persistence** — entries are saved to `localStorage` under the
  key `jabnow_projects_v1`. No backend, no account.

## Stack

- HTML / CSS (`DM Sans`) — portfolio-inspired aesthetic
- Vanilla JavaScript
- [D3 v7](https://d3js.org/) for the force simulation (loaded from CDN)

## Run locally

It's just static files — open `index.html` directly in a browser, or serve the
folder with any static server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit <http://localhost:8080>.

## Files

```
.
├── index.html   # SPA shell: sidebar + Work / List / Add / About
├── app.js       # State, localStorage adapter, D3 graph, list, form
├── styles.css   # All styles
├── .gitignore
└── README.md
```

## Deploying to GitHub Pages

This repo (`jabnow/jabnow.github.io`) is a [user site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites),
which means anything pushed to the `main` branch root is published at
<https://jabnow.github.io> automatically. No build step, no Pages config.

## Clearing or backing up data

- **Clear**: DevTools → Application → Local Storage → delete the
  `jabnow_projects_v1` key. Next page load reseeds with the default five entries.
- **Back up / move**: copy that key's JSON value somewhere safe; paste it back
  on another device by running `localStorage.setItem("jabnow_projects_v1", "…")`
  in the console.

## Future: adding a real backend

If you ever outgrow localStorage and want multi-device sync, the natural next
step is a small Node + SQLite (or Cloudflare D1, Supabase, etc.) service. Swap
the `store` object in `app.js` for `fetch` calls against an `/api/projects`
endpoint and host the backend separately (Render, Fly.io, Railway). GitHub
Pages would still serve the frontend; the backend would just live elsewhere.
