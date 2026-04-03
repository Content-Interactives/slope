# Slope

React + Vite interactive for linear slope as rise/run: coordinate grid or number-line visualization updates from controlled inputs in `Slope.jsx`.

**Live site:** [https://content-interactives.github.io/slope](https://content-interactives.github.io/slope)

Curriculum alignment and placement: [Standards.md](Standards.md).

---

## Stack

| Layer | Notes |
|--------|--------|
| Build | Vite 6, `@vitejs/plugin-react` |
| UI | React 19 |
| Styling | Tailwind 3 |
| Icons | lucide-react |
| Deploy | `gh-pages -d dist`; `predeploy` runs `vite build` |

---

## Layout

```
vite.config.js          # base: '/slope/'
src/
  main.jsx → App.jsx → components/Slope.jsx
  components/ui/
```

---

## `vite.config.js`

`base: '/slope/'` must match the GitHub Pages repository path.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build and push `dist/` to `gh-pages` |

---

## Embedding

Graph region aspect ratio is defined in `Slope.jsx`; size iframe accordingly.
