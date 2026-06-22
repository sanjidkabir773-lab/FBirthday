# 💕 Birthday Card

An animated, single-file birthday card for the web. Click the heart, watch it drop, roll across the ground leaving a glowing trail, and bloom into a heart-shaped tree of tiny floating hearts while sweet messages type out beside it.

Built with vanilla HTML + JavaScript + the Canvas API. No frameworks, no build step — just open the file in a browser.

### 🌐 [**Live demo → samiahrafnirob.com/birthdaywish**](https://samiahrafnirob.com/birthdaywish/)

[![live demo](https://img.shields.io/badge/live-demo-ff1493?style=for-the-badge)](https://samiahrafnirob.com/birthdaywish/)
![vanilla js](https://img.shields.io/badge/vanilla-JS-yellow?style=for-the-badge)
![no build](https://img.shields.io/badge/no-build-brightgreen?style=for-the-badge)

---

## ✨ Features

- **Cinematic intro** — heart drops with gravity, rolls across the ground like a wheel (with a small bouncy hop), leaves a glowing pink line trail behind it, then settles and dissolves into a tree.
- **Heart-shaped tree** — branches trace the classic heart parametric curve `(16·sin³t, 13·cos t − 5·cos2t − 2·cos3t − cos4t)` so the silhouette is unmistakably a heart.
- **Blooming canopy** — hundreds of tiny pink hearts bloom inside the tree using `globalCompositeOperation = 'lighter'` for additive glow.
- **Typewriter messages** — Dancing Script cursive font with a soft frosted-glass backdrop and a blinking pink cursor.
- **Ambient love** — 120–200 small hearts drift up gently in the background at all times.
- **Performance** — completed tree and leaves are baked once to offscreen canvases, so the main loop only does a single `drawImage` per frame instead of redrawing hundreds of glowing shapes.
- **Responsive** — text repositions to bottom-center on phones; tree centers itself; particle density adapts to screen area.

---

## 🚀 Use it

Just open `birthday.html` in any modern browser. That's it.

You can see it running live at **[samiahrafnirob.com/birthdaywish](https://samiahrafnirob.com/birthdaywish/)** 💕

### Host your own copy

It's a single self-contained file — works on any static host:

- **GitHub Pages** — push the repo, enable Pages from `main` branch root. Rename `birthday.html` → `index.html` if you want it at the root URL.
- **Netlify / Vercel / Cloudflare Pages** — drag and drop, done.
- **Your own domain** — just upload `birthday.html` to any folder served as static files (that's how the live demo above is hosted).

---

## 🎨 Make it yours

Everything is in `birthday.html`. The bits worth changing:

| What | Where (in `<script>`) |
| --- | --- |
| Messages that type out | `const LINES = [...]` |
| Heart palette | `const COLORS = [...]` |
| Typewriter speed | `setInterval(...,65)` and `setTimeout(next,500)` inside `startTypewriter()` |
| Tree position | `rollToX = (W < 780) ? W*0.5 : W*0.70` inside `startAnimation()` |
| Tree size | `const sc = Math.min(W,H) * .024` inside `buildHeartTree()` |
| Number of leaves | the `for` loops inside `spawnLeaves()` |
| Number of ambient hearts | `Math.min(200, Math.max(120, Math.round(W*H/9500)))` inside `initParticles()` |

The click-me heart text is in the HTML (`<div class="label">`).

---

## 🧠 How it works (quick tour)

The script runs through a small phase machine on click:

```
idle  ──click──▶  drop  ──gravity──▶  roll  ──ease-out──▶  settle  ──fade──▶  grow
```

- **drop**: heart falls from its DOM position (captured via `getBoundingClientRect`) to ground level using `easeInQuad`.
- **roll**: heart slides horizontally with `easeOutCubic`, rotates like a wheel, hops with a damped sine wave.
- **settle**: heart fades and the tree starts growing from the same spot.
- **grow**: branches draw segment-by-segment with delayed timing → leaves bloom → typewriter starts.

The trail is just every frame's heart position pushed into an array and rendered as a two-pass glowing polyline (wide soft glow + crisp light-pink core).

The heart-shaped silhouette comes from sampling the heart parametric curve at 26 points in each direction and connecting them as branches — both spines start at the bottom stem and meet at the top dip.

---

## 📁 File structure

```
.
├── birthday.html     # the whole thing
└── README.md         # you're reading it
```

---

## 📜 License

MIT — do whatever you want with it. If you make someone smile with it, that's enough.

---

> made with love 💕
