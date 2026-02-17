# Phoenix Nest Training & Evaluation Guide

**Progressive Web App (PWA)** — MET-format training and evaluation system for Phoenix Nest LLC production team.

## Features

- **29 MET-format task cards** across 3 tier advancement levels
- **Offline-first** — works without cell signal at the woodyard
- **GO/NO-GO evaluations** with local storage
- **Contractor progress tracking** with per-task certification
- **Search** across all tasks by keyword
- **Safety-critical task** quick reference

## Tier Structure

| Tier | Tasks | Advancement |
|------|-------|-------------|
| 1→2 | 14 tasks | Trainee → Operator |
| 2→3 | 11 tasks | Operator → Skilled Operator |
| 3→4 | 4 tasks | Skilled Operator → Lead |

## Deploy to GitHub Pages

1. Push this folder's contents to your `phoenix-nest-mets` repo
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch**
4. Select **main** branch, **/ (root)** folder
5. Save — site deploys to `https://alex-pennington.github.io/phoenix-nest-mets/`

## Install as App

On Android Chrome:
1. Navigate to the deployed URL
2. Tap the install banner or Menu → "Add to Home Screen"
3. App works fully offline after first load

## Tech Stack

- Vanilla JS (no framework dependencies)
- IndexedDB for local data storage
- Service Worker for offline caching
- PWA manifest for installability

---

**Phoenix Nest LLC** — Premium Seasoned Firewood — Greenup, Kentucky

[firewood.ltd](https://firewood.ltd)
