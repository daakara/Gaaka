# 📚 GAAKA - Lessons Learned & Architectural Knowledge Base

A consolidated engineering log capturing technical discoveries, architectural decisions, solved failure modes, and best practices across the GAAKA e-commerce platform.

---

## 1. Internationalization (i18n) & Tone Consistency

### Problem
* Hardcoded English text remained embedded in components (`Footer.tsx`, `HeroSection.tsx`, `ProductSections.tsx`, `MissionSection.tsx`, `shipping.tsx`, `about.tsx`, `faq.tsx`, `contact.tsx`).
* When toggling to German (`de`), users saw a mixed "Denglish" interface.
* Some automated translations contained generic AI phrasing rather than organic, artisan-tailored language.

### Solution & Rules
* **100% Dictionary Coverage**: Added ~150 bilingual keys to `src/lib/i18n/translations.ts`.
* **Zero Hardcoded JSX Text**: Every user-facing UI label, badge, form placeholder, error message, and legal disclaimer must go through `t('key')`.
* **Safe Fallback Chain**: `getTranslation(lang, key)` resolves `translations[lang][key] || translations.en[key] || key`.
* **Brand Tone**: Retain authentic artisan terminology (e.g., Sisal, Sweetgrass, Kenya, Fair Trade) with warm, natural phrasing in both German and English.

---

## 2. Headless WordPress / GraphQL Resilience & CORS

### Problem
* Next.js pages or client-side components (`ProductGrid.tsx`, `Search.tsx`) attempting client-side browser POST requests to `https://www.gaaka.com/graphql` triggered browser CORS errors (`No Access-Control-Allow-Origin header`).
* When the WordPress API was sleeping or unreachable, collection pages crashed or displayed jarring red error blocks.

### Solution & Architecture
* **Static Generation First (`getStaticProps`)**: All pages (`storage-baskets.tsx`, `kitchen-dining.tsx`, `wall-baskets.tsx`, `all.tsx`, `[categorySlug].tsx`, `[slug].tsx`) fetch data during build/ISR.
* **Offline Fallback Catalog (`fallbackProducts.ts`)**: Built a rich, curated dataset of authentic Kenyan baskets that seamlessly serves as an offline layer.
* **Client-Side Fetch Elimination**: `ProductGrid` receives products directly via props without executing client-side network queries.
* **Client Search Failover**: `useProductSearch()` searches local catalog matches in memory if the remote GraphQL endpoint is offline.

---

## 3. Scope Management & Feature Deprecation (Gift Cards)

### Problem
* A digital gift card page existed (`pages/gift-cards.tsx`) without a connected payment and card fulfillment infrastructure.

### Solution & Cleanup
* **Complete Removal**: Deleted `pages/gift-cards.tsx` and removed links across `Header.tsx`, `Footer.tsx`, and `returns.tsx`.
* **Redirect Hardening**: Added a 301 permanent redirect from `/gift-cards` to `/` in `next.config.js` to prevent broken 404s for cached or bookmarked URLs.

---

## 4. Frontend Architecture: Next.js vs. Agent Orchestration

### Problem
* Evaluation of whether to add "orchestrator / sub-agents / todo" folder hierarchies into the web app repo.

### Decision
* **Keep Next.js Native Structure**: Gaaka is a customer-facing e-commerce storefront.
* Multi-agent orchestration architectures belong to autonomous backend tools, not frontend web bundles.
* Preserving standard Next.js directory layout (`pages/`, `src/components/`, `src/lib/`, `src/contexts/`) ensures clean builds, fast routing, and seamless deployment on edge networks.

---

## 5. Hosting & Deployment Strategy (Vercel vs. Namecheap)

### Evaluation & Setup
| Platform | Responsibility | Advantages |
| :--- | :--- | :--- |
| **Vercel** (Frontend) | Hosts `gaaka.com` and `www.gaaka.com` | Automated GitHub CI/CD, Edge CDN caching, Instant zero-downtime rollouts, Zero CORS issues |
| **Namecheap** (Backend) | Hosts WordPress / WooCommerce at `https://www.gaaka.com/dev/` | Dedicated database and WooCommerce administration |

### DNS Migration Knowledge
* Root domain (`@`) A Record pointed to Vercel Anycast IP: `76.76.21.21` (or `216.198.79.1`).
* `www` CNAME pointed to `cname.vercel-dns.com.`.
* Original Namecheap DNS configuration backed up in `NAMECHEAP_DNS_BACKUP.md`.
* Local router/ISP DNS caching can take a few minutes to catch up to global DNS; verify with public resolvers (`8.8.8.8`).

---

## 6. Deployment Packaging

* Created clean deployable archive **`gaaka-namecheap-deploy.zip`** excluding `node_modules/`, `.next/`, `.git/`, and previous zips.
* Added `*.zip` to `.gitignore` to maintain a lightweight Git repository.
