# NexaFlow Design Assignment

Responsive Next.js + React + TypeScript implementation of the supplied 1440×4100 design exercise.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

## Implementation notes

- Next.js App Router with TypeScript and React 19.
- Responsive layout for desktop, tablet and mobile breakpoints.
- Reusable `Header`, `DashboardMockup`, icon and footer components.
- No external image assets or UI libraries; the dashboard/feature visuals are CSS/SVG for fast loading.
- Semantic sections and anchor navigation are included.
- CTA links are functional; the demo action uses a placeholder email address and can be replaced with the hiring team's endpoint.
