# finance-dashboard

Personal finance **Overview** MVP modeled on the Figma “Desktop - Home” layout: Next.js App Router, Tailwind v4, TypeScript, and mock data in [`data/finance.json`](data/finance.json).

## Design

The app design is based on the Figma personal finance app design page:
[Desktop - Home](https://www.figma.com/design/rJb9XS7DMeIaTRYtpH1RuK/personal-finance-app?node-id=101-2&p=f&t=GdELEZOVSXOxPx2Z-0).

The overall design system is also housed in Figma and can be found here:
[Design System](https://www.figma.com/design/rJb9XS7DMeIaTRYtpH1RuK/personal-finance-app?node-id=182-285&p=f&t=GdELEZOVSXOxPx2Z-0).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sidebar links route to placeholder pages except **Overview** (`/`), which renders balance cards, pots summary, latest transactions, budgets (donut), and recurring bill stats.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

Typography: **Public Sans** via `next/font`.
