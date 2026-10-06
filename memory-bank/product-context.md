# Semantic HTML Demo Site – Design Document

## Overview

A friendly, uncluttered site demonstrating semantic HTML and modern CSS, with mild skeuomorphic touches.

## Architecture

- Static files served from `web/` using `npx http-server`.
- No build tools – pure HTML & CSS.

## Sitemap

- `/` – Homepage
- `forms/` – HTML form examples
- `blog/` – Blog layout mockup

## Design System

### Color Palette

- **Text**: rgb(13, 7, 7)
- **Background**: rgb(239, 230, 230)
- **Primary** (buttons, links): rgb(231, 131, 141)
- **Secondary** (cards, highlights): rgb(162, 206, 191)
- **Accent** (borders, focus): rgb(123, 147, 185)
- **Gradient**: linear-gradient(90deg, primary, accent, secondary)

### Typography

- Base: `system-ui`, sans-serif, 1rem / 1.5
- Headings: `Georgia`, serif; h1: 2.5rem, h2: 2rem, h3: 1.5rem
- Font weights: 400 body, 700 headings

### Spacing

- Scale: 0.25, 0.5, 1, 1.5, 2, 3, 4 rem
- Container max-width: 1200px, centered with padding 1rem

### Components

#### Buttons

- Background: primary, white text, border-radius: 0.5rem
- `:hover` – slight darkening (filter brightness 0.9)
- `:active` – inset box-shadow, translateY(2px)
- Transition: 150ms ease

#### Form Inputs

- Border: 1px solid accent, 0.5rem radius
- Focus: accent ring (2px solid)
- Error: red border + helper text

#### Blog Cards

- Each article: `<article>` with header, section, footer
- Box shadow: 0 2px 8px rgba(0,0,0,0.1)
- Hover: lift shadow slightly (transform: translateY(-2px))

#### Navigation

- `<nav>` horizontal list, each `<a>` padded, hover underline
- Active page: primary color background

### Skeuomorphic Effects

- Buttons: raised when idle, pressed when active
- Cards: subtle gradient background, inner shadow
- All interactive elements have 200–300ms transition

### Responsive Breakpoints

- Mobile-first (default single column)
- `@media (min-width: 640px)` – two columns for blog cards
- `@media (min-width: 1024px)` – side nav / wider content

### Accessibility

- All interactive elements focusable and visible
- Sufficient contrast (check with tool)
- Semantic HTML (header, nav, main, footer, article, section)
- Skip-to-content link

## Development

- Run `npx http-server web/` to preview
- Edit files live, CSS hot reload not required (simple refresh)
