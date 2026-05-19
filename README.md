# Hotshot Outfitters

Marketing site for [Hotshot Outfitters](https://hotshotoutfitters.com) — Michigan guided hunts and Lake Huron charter fishing out of Port Hope, MI.

Built with Next.js 16 (App Router), Tailwind v4, Framer Motion, and shadcn-style components. Deployed on Netlify.

## Pages
- `/` — home with category tiles
- `/hunts` — guided hunts hub
- `/hunts/[slug]` — 7 species sub-pages (whitetail-deer, wild-turkey, duck, goose, coyote-fox, cottontail-rabbit, crow) — each ~1,800 words of Michigan-targeted SEO
- `/charter-fishing` — Lake Huron charters
- `/about`
- `/contact`

## Dev
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy
Auto-deploys on push to `main` via Netlify (Next.js plugin).
