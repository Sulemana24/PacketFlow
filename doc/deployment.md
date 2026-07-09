# Deployment Guide

## Building for Production

PacketFlow uses Next.js and its built-in build pipeline.

```bash
# Run linting checks first
npm run lint

# Create production build
npm run build

# Start production server locally
npm start
```

The build output is stored in the `.next/` directory. The production server runs on `http://localhost:3000` by default.

## Hosting Options

### Vercel (Recommended)

Next.js apps deploy seamlessly to Vercel with zero configuration.

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from the project root:
   ```bash
   vercel
   ```

3. Or connect your GitHub repo through the Vercel dashboard for automatic deployments.

**Configuration notes:**
- `next.config.ts` has no custom settings, so default Vercel behavior applies
- No environment variables are currently required

### Netlify

1. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

2. Connect GitHub repo and Netlify will auto-detect the Next.js project.

### GitHub Pages

GitHub Pages does not natively support Next.js SSR. You would need to export a static site:

**Note:** Next.js 16 App Router does not currently support `output: 'export'` for all features (can break React Flow and dynamic routes).

For a static export approach, you would need to:
1. Ensure all routes are static
2. Configure `output: 'export'` in `next.config.ts`
3. Verify React Flow's canvas behavior works in static mode
4. Deploy the `out/` folder

## Environment Variables

PacketFlow currently has **no environment variables** required. The `next.config.ts` file is empty with no special configuration.

If you add a real backend in the future, you would add variables to a `.env.local` file:

```env
# Example (not currently used)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
```

## PWA Configuration

PacketFlow is designed to work as a web application. There is no manifest.json for PWA installation currently in the `public/` folder.

To enable PWA features:
1. Add `public/manifest.json`
2. Optionally add `@ducanh2912/next-pwa` for service worker support

## Deployment Checklist

- [ ] Run `npm run lint` and fix all errors
- [ ] Run `npm run build` and verify no build errors
- [ ] Test the production bundle with `npm start`
- [ ] Verify the landing page loads correctly
- [ ] Verify the dashboard loads after login
- [ ] Test drag-and-drop device placement
- [ ] Test cable connection between devices
- [ ] Test packet animation
- [ ] Test console commands in the terminal
- [ ] Remove any `console.log` statements (many exist in development)
- [ ] Verify no hardcoded API keys are committed
- [ ] Set up CI/CD if hosting on Vercel/Netlify

## Known Deployment Issues

- **Large bundle size**: React Flow + Framer Motion significantly increase the initial bundle
- **No SSR optimization**: The app is largely client-side; consider loading React Flow only on client to reduce server bundle
- **Console.log statements**: The codebase contains many `console.log` calls for debugging that should be removed before production
