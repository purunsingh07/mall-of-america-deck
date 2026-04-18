# Mall of America — Interactive Sales Deck

A fully interactive, browser-based sales deck for Mall of America — built as a high-end pitch tool for prospective retail tenants, sponsors, and event partners.

## Live Demo
[View Live →](https://mall-of-america-deck-psi.vercel.app/)

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion (scroll animations)
- Google Fonts (Playfair Display, DM Sans, JetBrains Mono)
- Deployed via Vercel

## Features
- Cinematic hero with animated stat counters
- Scroll-triggered section reveals
- Tabbed retail leasing explorer
- Interactive event type selector
- Contact form with path-based inquiry routing
- Non-linear navigation across all 7 sections
- Fully responsive (desktop + tablet)



## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Design Decisions
- Obsidian/gold palette inspired by luxury fashion brands
- Playfair Display for editorial gravitas
- JetBrains Mono for data/labels — creates editorial tension
- All animations CSS + IntersectionObserver — no heavy libraries
- Modular component architecture — each section is independently expandable
