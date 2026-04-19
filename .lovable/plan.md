

## Plan: Swap Hero background to a tree care photo

The Hero currently uses `src/pages/images/tree-workers.jpg` referenced via a CSS class (`.hero-bg-image` in `src/App.css`). I'll switch it to `src/assets/hero-tree-cutting.jpg` — a purpose-made tree care image already in the project — so the Hero visually matches the theme.

### Changes

1. **`src/App.css`** — update `.hero-bg-image`:
   - Replace `background-image: url('../src/pages/images/tree-workers.jpg');` with `background-image: url('../assets/hero-tree-cutting.jpg');`
   - Keep existing opacity/z-index and the dark overlay (`.hero-dark-overlay`) intact for text contrast (per the Hero Contrast memory rule).

2. **`src/components/Hero.tsx`** — small cleanup:
   - Remove the now-unused `heroBg` import (and other unused image imports: `treeCutting1–4`) so Vite doesn't warn about dead imports.
   - No layout/structure changes — the centered content block, overlay, and CTA stay as they are.

### Why this image
`hero-tree-cutting.jpg` was generated specifically as a hero shot of professional tree care work, so it reinforces the brand and pairs well with the existing dark gradient overlay for white headline text.

### Out of scope
- No changes to the Work page gallery.
- No new image generation (an existing themed asset already fits).
- Logo, navigation, and Cloud setup remain untouched.

