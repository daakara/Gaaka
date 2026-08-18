# Namecheap DNS Backup (Saved: 2026-08-18)

Use these values if you ever need to revert your Namecheap DNS records back to their original configuration.

## Original CNAME Records

| Host / Subdomain | Type | TTL | Target / Value | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `www` (`www.gaaka.com.`) | **CNAME** | `14400` (4 Hours) | `gaaka.com` | Aliased www to root domain |
| `ftp` (`ftp.gaaka.com.`) | **CNAME** | `14400` (4 Hours) | `gaaka.com` | FTP access routing |

---

## Original A Record (Root Domain)

| Host | Type | Value / Destination IP | Server |
| :--- | :--- | :--- | :--- |
| `@` (`gaaka.com`) | **A Record** | `162.0.229.127` | Namecheap Shared / LiteSpeed (`premium119-4.web-hosting.com`) |

---

## New Vercel Settings (Option A)

When pointing to Vercel, replace only `www` and `@`:

| Host | Type | Target Value | TTL |
| :--- | :--- | :--- | :--- |
| `@` | **A Record** | `76.76.21.21` | Automatic |
| `www` | **CNAME Record** | `cname.vercel-dns.com.` | Automatic |

*(You can leave `ftp.gaaka.com` as is if you still use FTP for cPanel).*
