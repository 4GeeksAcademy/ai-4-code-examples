# Semantic HTML Demo Site – Design Document

> **Status**: Living document · **Last updated**: 2026-10-06

---

## 1. Overview

A friendly, uncluttered site demonstrating **semantic HTML** and **modern CSS**, with mild skeuomorphic touches. Designed for beginners learning how to structure web pages with meaningful markup and visual craftsmanship.

---

## 2. Architecture

- **Static files** served from `web/` using `npx http-server`.
- **No build tools** – pure HTML & CSS. Open a file, edit, refresh.
- **Single CSS file**: `/assets/style.css` holds all styles (global, component, utility).
- **No JavaScript dependency** for demonstration content; JS may be added later for form validation or interactive demos.

---

## 3. Sitemap & Page Inventory

| Path          | Page               | Status   |
| ------------- | ------------------ | -------- |
| `/`           | Homepage           | ✅ Built |
| `/portfolio/` | Portfolio gallery  | ✅ Built |
| `/forms/`     | HTML form examples | ✅ Built |
| `/blog/`      | Blog layout mockup | ✅ Built |

### Page Details

#### Homepage (`/`)

Landing page with hero / intro, a visual section (colored squares demonstrating semantic containers), and an image display. Serves as the primary teaching example.

#### Portfolio (`/portfolio/`)

A stripped-back version of the homepage layout, focused on a single article with colored squares. Demonstrates content re-use and page hierarchy.

#### Forms (`/forms/` – planned)

A demonstrations page covering:

- Text inputs, textareas, select menus, checkboxes, radio groups
- Native form validation vs custom error styling
- `fieldset` / `legend` for grouped controls
- Accessible labels and `aria-describedby` hints

#### Blog (`/blog/` – planned)

A multi-article grid layout demonstrating:

- Blog index with cards (title, date, excerpt, image)
- Individual article page (`/blog/article.html`)
- Tag / category filtering via CSS
- Pagination row

---

## 4. Design System

### 4.1 Color Palette

```css
--color-text: rgb(13, 7, 7); /* near-black, warm tint */
--color-bg: rgb(239, 230, 230); /* off-white, warm */
--color-primary: rgb(231, 131, 141); /* rose / salmon */
--color-secondary: rgb(162, 206, 191); /* sage green */
--color-accent: rgb(123, 147, 185); /* steel blue */
--gradient-main: linear-gradient(
  90deg,
  rgb(231, 131, 141),
  /* primary */ rgb(173, 231, 131),
  /* mid-point (yellow-green) */ rgb(162, 206, 191)
); /* secondary */
```

#### Usage Rules

| Token               | Where to use                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `--color-text`      | Body copy, headings, readable text                                                        |
| `--color-bg`        | Page background, card backgrounds (opaque)                                                |
| `--color-primary`   | Buttons, links (default & hover), active nav item, key interactive elements               |
| `--color-secondary` | Card backgrounds with transparency, highlight panels, decorative borders                  |
| `--color-accent`    | Input borders, focus rings, horizontal rules, table borders, blockquote left-bar          |
| `--gradient-main`   | Decorative banners, hero backgrounds, button hover gradients (optional), section dividers |

#### Contrast Ratios

| Pair          | Ratio                           |
| ------------- | ------------------------------- |
| Text on bg    | ~17.5:1 (AAA pass)              |
| Primary on bg | ~6.5:1 (AA pass, large text OK) |
| Accent on bg  | ~4.2:1 (AA for large text)      |

### 4.2 Typography

**Base (body):**

- Font stack: `system-ui`, `Segoe UI`, `Roboto`, `Helvetica`, `Arial`, sans-serif
- Size: `1rem` (16px default)
- Line-height: `1.5`
- Weight: `400`
- Letter-spacing: `normal`

**Headings (`Georgia`, serif):**

| Level | Size     | Weight | Line-height |
| ----- | -------- | ------ | ----------- |
| `h1`  | 2.5rem   | 700    | 1.2         |
| `h2`  | 2.0rem   | 700    | 1.25        |
| `h3`  | 1.5rem   | 700    | 1.3         |
| `h4`  | 1.25rem  | 600    | 1.4         |
| `h5`  | 1.0rem   | 600    | 1.5         |
| `h6`  | 0.875rem | 600    | 1.5         |

**Inline elements:**

- `strong` / `b`: weight 700 (no color change)
- `em` / `i`: italic; no letter-spacing change
- `code` / `pre`: `'Cascadia Code'`, `'Fira Code'`, `Consolas`, monospace; size `0.875em`; background `rgba(0,0,0,0.06)`

### 4.3 Spacing & Sizing Scale

```css
--space-025: 0.25rem; /* tight inline gaps */
--space-05: 0.5rem; /* input padding, element margin */
--space-1: 1rem; /* base unit, container padding */
--space-15: 1.5rem; /* section gap */
--space-2: 2rem; /* major section margin */
--space-3: 3rem; /* page-section spacing */
--space-4: 4rem; /* hero spacing, large break */
```

**Layout container:**

- Max-width: `1200px`
- Centered via `margin-inline: auto`
- Horizontal padding: `1rem` (increases to `2rem` at `>=1024px`)
- Padding uses `clamp(1rem, 4vw, 2rem)` for fluid sizing

### 4.4 Design Tokens (CSS Custom Properties)

All design decisions expressed as custom properties on `:root`:

```css
:root {
  /* borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
  --border-color: var(--color-accent);

  /* shadows */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-card-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-button: 0 2px 4px rgba(0, 0, 0, 0.15);
  --shadow-inset: inset 0 2px 6px rgba(0, 0, 0, 0.12);

  /* transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;

  /* focus */
  --focus-ring: 0 0 0 2px var(--color-accent);
}
```

---

## 5. Components

### 5.1 Buttons

```css
/* Base */
.button,
button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: var(--transition-fast);
}
```

| State            | Visual change                                                               |
| ---------------- | --------------------------------------------------------------------------- |
| **Default**      | Raised via `box-shadow`, primary background, white text                     |
| `:hover`         | `filter: brightness(0.9)` darken; cursor pointer                            |
| `:focus-visible` | `var(--focus-ring)` in addition to default style                            |
| `:active`        | `box-shadow: var(--shadow-inset); transform: translateY(2px); filter: none` |
| `:disabled`      | `opacity: 0.5; cursor: not-allowed; box-shadow: none`                       |

**Variants:**

- `.button-small`: `padding: 0.25rem 0.75rem; font-size: 0.875rem`
- `.button-large`: `padding: 0.75rem 2rem; font-size: 1.125rem`
- `.button-secondary`: `background-color: var(--color-secondary); color: var(--color-text)`
- `.button-ghost`: `background: transparent; border: 2px solid var(--color-primary); color: var(--color-primary)`

### 5.2 Form Inputs

```css
input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  border: 1px solid var(--color-accent);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition-normal);
}
```

| State                                 | Visual change                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| **Default**                           | `1px solid accent` border, subtle inner shadow                                 |
| `:focus`                              | `border-color: var(--color-accent); box-shadow: 0 0 0 2px var(--color-accent)` |
| `:disabled`                           | `opacity: 0.5; cursor: not-allowed; background: rgba(0,0,0,0.03)`              |
| **Error** (`.error`, `:user-invalid`) | `border-color: #c93a3a; box-shadow: 0 0 0 2px #c93a3a`                         |

**Helper text:**

- `.helper-text`: `font-size: 0.875rem; color: var(--color-text); opacity: 0.7; margin-top: 0.25rem`
- `.error-text`: `font-size: 0.875rem; color: #c93a3a; margin-top: 0.25rem`

**Common form patterns:**

- `label` displayed above input (block), not inline
- `fieldset` with `legend` for radio / checkbox groups
- Checkbox / radio: custom `::before` square/circle via `appearance: none`

### 5.3 Blog Cards

**HTML structure:**

```html
<article class="blog-card">
  <header>
    <time datetime="2026-10-06">6 Oct 2026</time>
    <h3><a href="/blog/article.html">Article Title</a></h3>
  </header>
  <section>
    <p>Excerpt text…</p>
  </section>
  <footer>
    <a href="/blog/article.html" class="button button-small">Read more</a>
  </footer>
</article>
```

| State                | Visual                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **Default**          | `box-shadow: var(--shadow-card); border-radius: var(--border-radius-md); padding: 1rem`    |
| `:hover` on card     | `transform: translateY(-2px); box-shadow: var(--shadow-card-hover)`                        |
| **Grid** (>=640px)   | `display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem` |
| **Stacked** (<640px) | Single column, full width                                                                  |

**Card inner decorations:**

- Subtle gradient background (top-to-bottom fade from `--color-secondary` at 10% opacity to transparent)
- Inner `box-shadow: inset 0 1px 0 rgba(255,255,255,0.15)` for a slight lip

### 5.4 Navigation

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/portfolio/">Portfolio</a></li>
    <li><a href="/forms/">Forms</a></li>
    <li><a href="/blog/">Blog</a></li>
  </ul>
</nav>
```

| State                             | Visual                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Default**                       | `padding: 0.5rem 1rem; border-bottom: 2px solid transparent`                                   |
| `:hover`                          | `border-bottom-color: var(--color-primary);` (underline reveal)                                |
| `:focus-visible`                  | `var(--focus-ring)`                                                                            |
| **Active page** (`.active` class) | `background-color: var(--color-primary); color: white; border-radius: var(--border-radius-md)` |
| **Mobile** (<640px)               | Stacked vertical list, full-width touch targets                                                |
| **Desktop** (>=640px)             | Horizontal inline list, `gap: 0.25rem`                                                         |

### 5.5 Page Sections

| Tag                         | Usage                                                |
| --------------------------- | ---------------------------------------------------- |
| `<header id="main-header">` | Site-wide masthead (logo, nav)                       |
| `<main>`                    | Primary page content (one per page)                  |
| `<section>`                 | Thematic grouping within a page                      |
| `<article>`                 | Self-contained content (blog post, card, standalone) |
| `<aside>`                   | Sidebar, complementary info                          |
| `<footer>`                  | Per-page footer (copyright, links)                   |
| `<nav>`                     | Navigation block (with `aria-label`)                 |

---

## 6. Page Layouts

### 6.1 Homepage Wireframe

```
┌─────────────────────────────────────┐
│  #main-header                       │
│  ┌──────────────────────────────┐   │
│  │  [Logo / site title]  [ Nav ]│   │
│  └──────────────────────────────┘   │
├─────────────────────────────────────┤
│  <main>                             │
│  ┌──────────────────────────────┐   │
│  │  <section class="hero">      │   │
│  │  h1 + tagline + CTA button   │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  <section class="demo-grid"> │   │
│  │  ┌──────┐  ┌──────┐         │   │
│  │  │ art. │  │ art. │         │   │
│  │  └──────┘  └──────┘         │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  <section class="media">     │   │
│  │  [img] + caption             │   │
│  └──────────────────────────────┘   │
├─────────────────────────────────────┤
│  <footer>                           │
│  © 2026 · links · social            │
└─────────────────────────────────────┘
```

### 6.2 Blog Index Layout

```
┌─────────────────────────────────────┐
│  #main-header                       │
├─────────────────────────────────────┤
│  <main>                             │
│  h1 "Blog"                          │
│  ┌──────┬──────┬──────┐            │
│  │ card │ card │ card │  ← grid    │
│  ├──────┼──────┼──────┤            │
│  │ card │ card │ card │            │
│  └──────┴──────┴──────┘            │
│  [pagination: ‹ 1 2 3 … ›]         │
├─────────────────────────────────────┤
│  <footer>                           │
└─────────────────────────────────────┘
```

### 6.3 Forms Page Layout

```
┌─────────────────────────────────────┐
│  #main-header                       │
├─────────────────────────────────────┤
│  <main>                             │
│  h1 "Form Examples"                 │
│                                     │
│  ┌─<section class="form-demo">──┐  │
│  │  h2  "Contact Form"          │  │
│  │  ┌─form──────────────┐       │  │
│  │  │  [name]    [email]│       │  │
│  │  │  [subject]        │       │  │
│  │  │  [message]        │       │  │
│  │  │  [checkbox]       │       │  │
│  │  │  [Submit]         │       │  │
│  │  └───────────────────┘       │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌─<section class="form-demo">──┐  │
│  │  h2  "Validation Demo"       │  │
│  │  ┌─form with .error states─┐ │  │
│  │  └─────────────────────────┘ │  │
│  └──────────────────────────────┘  │
├─────────────────────────────────────┤
│  <footer>                           │
└─────────────────────────────────────┘
```

---

## 7. Skeuomorphic Effects

| Element       | Default                                                                                      | Active / Pressed                      |
| ------------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Buttons**   | Raised via `box-shadow: 0 2px 4px rgba(0,0,0,0.15)`                                          | Inset shadow + `translateY(2px)`      |
| **Cards**     | Subtle gradient bg (`--color-secondary` 10% → transparent), `box-shadow: var(--shadow-card)` | Hover lifts card (`translateY(-2px)`) |
| **Inputs**    | Slight inset shadow via `box-shadow: inset 0 1px 3px rgba(0,0,0,0.06)`                       | Focus replaces with accent ring       |
| **Nav links** | Underline reveals on hover, active state is a solid button                                   |

**All interactive elements** use `transition: var(--transition-normal)` (250ms ease) to smooth state changes.

---

## 8. Responsive Breakpoints

| Breakpoint        | Name    | Layout change                                                                                   |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------- |
| **0px** (default) | Mobile  | Single column, stacked nav, full-width inputs                                                   |
| **>= 640px**      | Tablet  | Blog cards → 2-column grid; nav → horizontal; 2-column form layouts possible                    |
| **>= 1024px**     | Desktop | Side nav or wider content area; container padding increases to 2rem; blog cards → 3-column grid |

**Implementation pattern (mobile-first):**

```css
/* Base styles = mobile */
.container {
  padding: 0 var(--space-1);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-15);
  }
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-2);
  }
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 9. CSS Architecture

### File Organization

All styles live in a single file: `web/assets/style.css`

**Structural sections within the file** (separated by clear comments):

1. **Custom properties / design tokens** (`:root`)
2. **Reset / global styles** (`*, *::before, *::after`)
3. **Typography** (body, headings, inline elements)
4. **Layout** (`.container`, grid helpers)
5. **Navigation** (`nav`, `.nav-list`)
6. **Buttons** (`.button`, all variants)
7. **Forms** (`input`, `textarea`, `select`, labels, validation)
8. **Cards** (`.blog-card`, `.card`)
9. **Skeuomorphic utilities** (shadows, transitions)
10. **Utilities** (`.sr-only`, `.skip-link`, `.error`, `.helper-text`)
11. **Media queries** (mobile-first overrides at 640px and 1024px)

### Naming Conventions

- Class names: `kebab-case` (e.g., `.blog-card`, `.helper-text`, `.skip-link`)
- Custom properties: `--double-dash-kebab-case`
- IDs: `kebab-case` as well (e.g., `#main-header`, `#skip-link`)
- States: `.is-active`, `.is-error`, `.is-disabled` (or `:disabled` / `[aria-disabled]` where possible)

---

## 10. Accessibility (A11Y)

| Concern                | Implementation                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| **Skip link**          | `<a href="#main-content" class="skip-link">` – first focusable element, visible on focus     |
| **Landmarks**          | `<header>`, `<nav aria-label="…">`, `<main>`, `<footer>`, `<aside>`                          |
| **Headings**           | Single `h1` per page, hierarchical ordering (`h1` → `h2` → `h3`), no skips                   |
| **Focus**              | `:focus-visible` ring via `--focus-ring`; never `outline: none` without fallback             |
| **Color contrast**     | All text / bg pairs meet WCAG AA (see §4.1 ratios); never rely on color alone to convey info |
| **Form labels**        | Every `input` has a visible `<label>` (or `aria-label` when icon-only)                       |
| **Error announcement** | `aria-describedby` pointing to `.error-text`; `aria-invalid="true"` on errored inputs        |
| **Images**             | Meaningful `alt` text on all `<img>`; decorative images get `alt=""`                         |
| **Motion**             | `prefers-reduced-motion` respected – disable skeuomorphic animations when set                |

---

## 11. Interactive Behaviors

| Action          | Feedback                       | Timing |
| --------------- | ------------------------------ | ------ |
| Button hover    | Darken 10% (brightness filter) | 150ms  |
| Button press    | Inset shadow + dip             | 150ms  |
| Nav link hover  | Underline reveal               | 250ms  |
| Card hover      | Lift 2px + shadow deepen       | 250ms  |
| Input focus     | Accent ring reveal             | 250ms  |
| Skip link focus | Visible block appears          | 100ms  |
| Error appear    | Red border + text fade in      | 300ms  |

**Reduced motion** (`@media (prefers-reduced-motion: reduce)`): all transitions set to `0ms` or `opacity` only.

---

## 12. Content Patterns

### Skip Link

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

CSS: positioned off-screen until focused (`position: absolute; top: 0; left: 0; transform: translateY(-100%);`; on focus `transform: translateY(0)`).

### Social / Footer Links

```html
<footer>
  <p>&copy; 2026 Semantic HTML Demo</p>
  <nav aria-label="Footer links">
    <a href="https://github.com/…">GitHub</a>
  </nav>
</footer>
```

### Breadcrumbs (planned for blog)

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li aria-current="page">Article Title</li>
  </ol>
</nav>
```

---

## 13. Performance Budget

| Metric             | Target                                         |
| ------------------ | ---------------------------------------------- |
| Page weight (HTML) | < 20 KB per page                               |
| CSS file size      | < 15 KB (unminified)                           |
| Images             | Single `.png` ~ 50 KB (web-optimized)          |
| Requests           | ≤ 5 per page (HTML + CSS + 1 image + 0–1 font) |
| No frameworks      | Zero KB from CDN                               |

---

## 14. Development

### Preview

```bash
npx http-server web/
# Opens at http://localhost:8080
```

### Workflow

1. Edit HTML or CSS in VS Code.
2. Refresh browser to see changes (no build step, no hot-reload needed).
3. Commit and push via standard git flow.

### Adding a new page

1. Create `web/new-page/index.html`
2. Link from appropriate `<nav>` element
3. Add to this design doc's sitemap (§3)

---
