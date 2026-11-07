----
title: Adopt React Router for Client-Side Routing
summary: Standardize on React Router for all client-side navigation in the ATP frontend.
status: Accepted
date: 2026-11-07
----

# ADR 1: Adopt React Router for Client-Side Routing

## Status

**Accepted**

## Context

ATP's frontend is a ReactJS application built with Vite and TypeScript. As the product grows beyond a single demo screen, we need a way to navigate between pages (e.g., admin-facing account management and end-user dashboards) without full page reloads.

We evaluated the available options for client-side routing:

- **Ad-hoc state-based rendering** — managing "current screen" in React state with hand-rolled conditionals.
- **React Router** — the de facto standard routing library for React, backed by `@remix-run/router`, with deep browser-history integration.
- **Other routers** (e.g., TanStack Router) — newer and type-safe, but with a smaller ecosystem and less established community support.

We wanted a solution that is predictable, well-documented, and matches what most of the React ecosystem already uses.

## Decision

We will adopt **React Router (v6+)** as the single routing solution for the ATP frontend.

Specifically:

1. All navigation between pages will go through `react-router-dom`'s declarative `<Routes>` / `<Route>` API.
2. Route definitions will live in a dedicated `routes` module (e.g., `src/routes/`), colocated with the pages they render.
3. Deep links and direct URL entry must work for every page; no screen is reachable only through in-app state.
4. We will not introduce a second routing library, and will not layer ad-hoc state-based navigation on top of React Router.
5. Auth-gated routes will wrap protected pages with a guard component (pending a future auth decision), rather than scattering navigation checks across components.

## Consequences

### Positive

- **Standard, well-supported** — massive ecosystem, docs, and community answers for any problem we hit.
- **Declarative and readable** — route structure is visible in one place rather than hidden inside component state.
- **Real URL semantics** — back/forward buttons, bookmarks, and deep links work naturally, which matters for marketing and support.
- **Colocation** — pages can be developed in their own folders, consistent with our [component conventions](../../conventions.md).

### Negative

- **Added dependency** — one more library to keep updated and bundle.
- **Initial migration cost** — existing ad-hoc navigation (if any) must be converted to route declarations.
- **Routing logic in the client** — all route definitions ship to the browser; we'll manage routes in code rather than in a config that non-developers can edit.

### Neutral

- **Bundle size increase** — small and tree-shakeable, but still worth watching in the Vite build output.
- **Training overhead** — new contributors must learn React Router's conventions, which is a minor cost given its ubiquity.

## Alternatives Considered

1. **Ad-hoc state-based rendering** — rejected because it breaks deep-linking, history behavior, and refactorability.
2. **TanStack Router** — rejected for now because React Router's maturity and ecosystem coverage better match ATP's team and timeline; can be revisited if type-safety demands grow.