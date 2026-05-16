# 🎮 Batch 6: Mobile & Performance Optimization
**PWA, Performance, and Cross-Platform Excellence**

---

## Issue #51: Progressive Web App (PWA) Support

**Complexity: 150 Points**

### Description
Convert the Next.js app to a full PWA with service worker, offline support, and install prompt. Users can install Loot Vault as a standalone app.

### Requirements and context

**Why this matters:**  
PWAs increase accessibility and engagement. Users on slow connections benefit from offline caching, and mobile users can install to their home screen, boosting daily active users.

**What "done" looks like:**
- Service worker configured and caching strategy implemented (network-first for APIs, cache-first for assets)
- Web app manifest with icons, theme colors, and metadata
- Install prompt UI (appears after 2nd visit, dismissible)
- Offline page showing which features are available offline
- Responsive splash screen on app launch
- Works on iOS and Android
- Lighthouse PWA score: 90+

**Design constraints:**
- Cache strategy: cache assets indefinitely, APIs re-validate every request
- Offline mode: show cached data from last session
- Install prompt: non-intrusive banner, can be dismissed
- Responsive across all devices

### Suggested execution

1. Fork and create: `git checkout -b feature/pwa-support`
2. Files to touch:
   - `frontend/public/manifest.json` — web app manifest
   - `frontend/src/app/layout.tsx` — register service worker
   - `frontend/src/lib/serviceWorker.ts` — SW registration
   - `public/service-worker.js` — service worker logic
   - `frontend/public/icons/` — PWA icons (192x192, 512x512)
   - New: `frontend/src/components/InstallPrompt.tsx`
   - New: `frontend/src/pages/offline.tsx` — offline fallback

3. Implementation:
   - Use `next-pwa` package or manual SW setup
   - Define cache partitions (images, API, static)
   - Implement install banner logic

### Test and commit

- DevTools: Lighthouse PWA audit (90+)
- Test offline: disable network, verify cached content loads
- Test install prompt on mobile
- Commit: `feat: add PWA support with offline caching and install prompt`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #51`

---

## Issue #52: Image Optimization & Lazy Loading

**Complexity: 100 Points**

### Description
Optimize all images in the app: convert to WebP, add lazy loading, implement responsive srcset, and use Next.js Image component throughout.

### Requirements and context

**Why this matters:**  
Images are typically 50%+ of page weight. Optimization dramatically improves Core Web Vitals (LCP, CLS) and user experience on mobile networks.

**What "done" looks like:**
- All images converted to WebP (with PNG fallbacks)
- Lazy loading applied to off-screen images
- Responsive images with srcset (mobile, tablet, desktop sizes)
- All images use Next.js `<Image>` component
- Avatar images: 64px, 128px variants
- Hero images: 640px, 1280px variants
- Lighthouse Performance score: 85+ (mobile)

**Design constraints:**
- WebP with PNG fallback for browser compatibility
- Lazy loading threshold: 50px before entering viewport
- Thumbnail sizes: max 10KB
- Full-size: max 150KB

### Suggested execution

1. Fork and create: `git checkout -b feature/image-optimization`
2. Files to touch:
   - `frontend/src/components/**/*.tsx` — replace `<img>` with `<Image>`
   - `frontend/public/images/` — convert all images to WebP
   - `frontend/next.config.js` — configure image optimization

3. Implementation:
   - Audit all images in the app
   - Convert using online tool or ImageMagick
   - Update imports to use Next.js Image
   - Add width, height, priority props

### Test and commit

- Lighthouse audit: verify Performance score 85+
- Test on slow 3G throttle (DevTools)
- Verify lazy loading with Network tab
- Commit: `feat: optimize images and add lazy loading`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #52`

---

## Issue #53: Database Query Optimization & Indexing

**Complexity: 200 Points**

### Description
Audit and optimize all database queries in the backend indexer. Add strategic indexes, implement query result caching, and reduce N+1 queries.

### Requirements and context

**Why this matters:**  
Slow queries kill user experience. As Loot Vault scales to thousands of users, query optimization becomes critical. This prevents performance degradation and reduces infrastructure costs.

**What "done" looks like:**
- Audit all Axum routes for slow queries
- Add database indexes on frequently queried fields (freelancer_id, job_status, created_at)
- Implement Redis caching for expensive queries (leaderboard, aggregate stats)
- Fix N+1 query patterns (batch load related data)
- Query execution plan analysis (EXPLAIN queries)
- Performance benchmark report (before/after query times)
- Caching strategy documented

**Design constraints:**
- Queries must return in <100ms (average)
- Leaderboard queries: cached for 1 hour
- User balance queries: cached for 5 minutes
- Cache invalidation: on deposit/withdrawal events

### Suggested execution

1. Fork and create: `git checkout -b feature/query-optimization`
2. Files to touch:
   - `backend/src/main.rs` — add caching layer
   - `backend/src/db/queries.rs` — optimize queries
   - `backend/src/cache/mod.rs` — new caching module
   - Database migrations: add indexes
   - New: `backend/PERFORMANCE.md` — benchmark results

3. Implementation:
   - Profile queries with `EXPLAIN ANALYZE`
   - Add indexes for WHERE/JOIN conditions
   - Implement simple Redis cache with TTL
   - Batch queries where possible

### Test and commit

- Benchmark queries before and after
- Verify cache hit rates
- Commit: `feat: optimize database queries and add strategic indexing`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #53`

---

## Issue #54: Bundle Size Analysis & Code Splitting

**Complexity: 150 Points**

### Description
Analyze frontend bundle size, implement route-based code splitting for lazy loading, and reduce third-party dependency overhead.

### Requirements and context

**Why this matters:**  
Large bundles increase load time, especially on slow networks. Code splitting ensures users only download code they need immediately, improving First Contentful Paint (FCP).

**What "done" looks like:**
- Bundle analysis report (current bundle size breakdown)
- Route-based code splitting: separate chunks for Dashboard, QuestBoard, Profile, etc.
- Lazy-loaded components for modals, heavy calculations
- Tree-shaking applied to unused exports
- Unused dependencies identified and removed
- Bundle report: <200KB main chunk (gzipped)
- Lighthouse First Input Delay: <100ms on slow 4G

**Design constraints:**
- Main chunk (critical path): <150KB gzipped
- Route chunks: <50KB each (gzipped)
- Don't lazy-load above-the-fold critical content
- Polyfills loaded conditionally

### Suggested execution

1. Fork and create: `git checkout -b feature/bundle-optimization`
2. Files to touch:
   - `frontend/next.config.js` — configure splitting
   - `frontend/src/app/**/*.tsx` — apply dynamic imports
   - `frontend/package.json` — audit dependencies
   - New: `frontend/BUNDLE_ANALYSIS.md` — analysis report

3. Implementation:
   - Use `next/dynamic` for route-based splitting
   - Run `webpack-bundle-analyzer` to visualize
   - Remove unused dependencies
   - Identify code duplication

### Test and commit

- Analyze bundle with `webpack-bundle-analyzer`
- Verify route chunks are separate
- Test lazy loading on slow network (DevTools throttle)
- Commit: `feat: optimize bundle size with code splitting`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #54`

---

## Issue #55: Mobile-First Responsive Design Audit

**Complexity: 150 Points**

### Description
Audit all existing components for mobile responsiveness. Fix layouts that break on small screens, improve touch targets, and test on real devices.

### Requirements and context

**Why this matters:**  
50%+ of users are on mobile. Responsive design is critical for UX and SEO. A mobile-first audit catches layout issues that browser resize can't catch.

**What "done" looks like:**
- Audit all pages on: iPhone SE (375px), iPhone 12 (390px), iPad (768px), Desktop (1440px)
- Fix broken layouts (text overflow, missing responsive breakpoints, etc.)
- Touch targets: all buttons/links ≥48x48px
- Horizontal scroll: eliminated (except intentional, like carousels)
- Form inputs: large enough to tap (16px font size minimum)
- No layout shift on load (CLS <0.1)
- Screenshots showing before/after on 3 devices

**Design constraints:**
- No media queries with magic breakpoints (use Tailwind standard: sm, md, lg, xl)
- Responsive images on all pages
- Text should not be smaller than 16px on mobile
- Padding/margins scale appropriately

### Suggested execution

1. Fork and create: `git checkout -b feature/mobile-responsive-audit`
2. Files to touch:
   - All component files needing responsive fixes
   - `frontend/tailwind.config.ts` — ensure proper breakpoints
   - `frontend/src/globals.css` — add mobile-first base styles
   - New: `frontend/MOBILE_AUDIT.md` — findings and fixes

3. Implementation:
   - Test on actual devices (or DevTools device mode)
   - Fix Tailwind breakpoint usage
   - Increase touch target sizes
   - Add responsive image variants

### Test and commit

- Test on 3+ real devices (or DevTools)
- Verify no horizontal scroll
- Check touch target sizes
- Commit: `feat: comprehensive mobile-first responsive audit and fixes`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #55`

---

## Issue #56: Core Web Vitals Optimization (LCP, FID, CLS)

**Complexity: 200 Points**

### Description
Optimize for Core Web Vitals: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS). Target Google PageSpeed targets.

### Requirements and context

**Why this matters:**  
Core Web Vitals are Google ranking factors. They directly impact SEO and user perception of speed. Good metrics correlate with higher engagement and lower bounce rates.

**What "done" looks like:**
- LCP: <2.5 seconds (target: <1.5s)
- FID: <100ms (target: <50ms)
- CLS: <0.1 (target: <0.05)
- Lighthouse Performance score: 85+ on mobile
- Full report with actionable recommendations
- Before/after performance timeline screenshots
- Implementation of 5+ optimizations

**Design constraints:**
- Optimizations must not degrade UX
- No synthetic delays or tricks
- Real user monitoring data (or Lighthouse sim)
- Test on Slow 4G and mid-tier device (Nexus 5X throttle)

### Suggested execution

1. Fork and create: `git checkout -b feature/core-web-vitals-optimization`
2. Files to touch:
   - `frontend/src/app/layout.tsx` — optimize critical resources
   - `frontend/next.config.js` — performance config
   - `frontend/src/lib/performanceMonitoring.ts` — new metrics
   - New: `frontend/PERFORMANCE_REPORT.md` — detailed findings

3. Implementation:
   - Run Lighthouse and identify bottlenecks
   - Defer non-critical JS
   - Preload critical fonts
   - Optimize LCP image (preload + priority)
   - Remove layout-shifting content (reserve space)

### Test and commit

- Run Lighthouse 5x and report median scores
- Test on actual devices
- Include screenshots of metrics before/after
- Commit: `feat: optimize Core Web Vitals (LCP, FID, CLS)`

**Guidelines:**
- Assignment required before starting
- PR description must include: `Closes #56`

---

## Summary: Batch 6 (Mobile & Performance)

| Issue | Title | Points |
|-------|-------|--------|
| #51 | Progressive Web App (PWA) Support | 150 |
| #52 | Image Optimization & Lazy Loading | 100 |
| #53 | Database Query Optimization | 200 |
| #54 | Bundle Size & Code Splitting | 150 |
| #55 | Mobile-First Responsive Audit | 150 |
| #56 | Core Web Vitals Optimization | 200 |

**Batch 6 Total: 950 Points** (6 issues)

---

