# GAAKA Production Engineering & UX Roadmap (TODO)

## 🎯 Completed Milestones

### 1. UX & UI Modernization (Watermelon UI Suite)
- [x] **Animated Collapsible Accordions** (`src/components/ui/Accordion.tsx`): Integrated into FAQ page (`pages/faq.tsx`) with category filters.
- [x] **Floating Interactive Tabs** (`src/components/ui/Tabs.tsx`): Integrated on FAQ page and product detail pages (`pages/products/[slug].tsx`).
- [x] **Universal Site Directory Drawer** (`src/components/ui/Drawer.tsx`): React Portal-based (`document.body`) full-viewport slide sheet containing all collections, story & impact, customer care policies, legal pages, and EN/DE language toggles.
- [x] **Floating Mobile Dock** (`src/components/ui/MobileDock.tsx`): Sticky thumb-friendly bottom navigation bar for mobile and tablet devices with quick search and live cart counter.
- [x] **Product Quick View Modal** (`src/components/ui/QuickViewModal.tsx`): Accessible portal-based dialog for instant product inspection and cart addition without page reload.
- [x] **Floating Cart Toast Notification** (`src/components/ui/Toast.tsx`): Instant visual feedback with thumbnail, price, and direct "View Cart" action.
- [x] **Impact Metric Stat Counters** (`src/components/ui/StatCounter.tsx`): Integrated on About page (`pages/about.tsx`) highlighting 200+ artisans, fair living wages, and community education reinvestment.
- [x] **Sticky Mobile Product Action Bar** (`src/components/ui/StickyMobileBar.tsx`): Mobile persistent Add-to-Cart bar on product pages.

### 2. Browser Stacking & Containing Block Fixes
- [x] **Portal-Based Overlays**: Re-architected `Drawer.tsx`, `Cart.tsx`, `QuickViewModal.tsx`, and `Toast.tsx` using `createPortal(..., document.body)` to escape parent `backdrop-filter: blur(...)` containing block traps.
- [x] **Body Scroll Locking**: Automated `document.body.style.overflow = 'hidden'` when drawers or modals are open to prevent mobile scroll wobble.
- [x] **Safe Area Spacing**: Added `pb-20 lg:pb-0` footer clearance to prevent fixed bottom dock overlap.

### 3. Cache Invalidation & Instant Deploy Updates
- [x] **Apache / cPanel `.htaccess`** (`public/.htaccess`): Enforced `Cache-Control: no-cache, no-store, must-revalidate, max-age=0` on HTML documents and 1-year immutable caching on versioned static assets.
- [x] **Dynamic Build IDs** (`next.config.js`): Dynamic timestamped build IDs (`gaaka-[timestamp]`) ensuring fresh JS/CSS chunk hashes on every build.
- [x] **Client-Side Cache Flushing** (`pages/_app.tsx`): Auto-clearing legacy service workers and `window.caches` on client mount.

### 4. SEO, GEO & AI Search Infrastructure
- [x] **Schema.org Structured Data**: Rich Product schema with `MerchantReturnPolicy` (30 days) and `OfferShippingDetails`.
- [x] **AI Crawler Indexing** (`public/robots.txt` & `public/llms.txt`): Whitelisted `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`.
- [x] **Sitemap & Hreflang**: 30-route XML sitemap (`public/sitemap.xml`) and canonical `hreflang` tags (`en`, `de`, `x-default`).
- [x] **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

---

## 📋 Upcoming Production Enhancements
- [ ] **Live WooCommerce Webhook Sync**: Real-time stock decrement and inventory reconciliation.
- [ ] **Google Analytics 4 & Meta Pixel**: Automated e-commerce funnel tracking.
- [ ] **Multi-Currency Converter**: Live EUR / USD / GBP price conversion.
