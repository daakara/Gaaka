# 🚀 Deployment Guide

This guide covers deploying the GAAKA e-commerce website to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All translations are complete and tested
- [ ] Images are optimized and properly sized
- [ ] SEO meta tags and structured data are configured
- [ ] Environment variables are set up
- [ ] Performance optimization is complete
- [ ] Cross-browser testing is done
- [ ] Mobile responsiveness is verified

## 🌟 Recommended: Vercel (Easiest)

Vercel is the recommended platform as it's made by the Next.js team.

### 1. Automatic Deployment

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

2. **Environment Variables**:
   ```env
   WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
   WORDPRESS_SITE_URL=https://your-wordpress-site.com
   ```

3. **Custom Domain**:
   - Add your domain in Vercel dashboard
   - Configure DNS records as instructed

### 2. Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

## 🌐 Netlify

### 1. Via Git Integration

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**:
   Set in Netlify dashboard under Site settings > Environment variables

### 2. Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

## ☁️ AWS Amplify

### 1. Via Console

1. **Create App**:
   - Go to AWS Amplify Console
   - Connect GitHub repository

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

3. **Environment Variables**:
   Add in Amplify console under App settings > Environment variables

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

### Deploy with Docker

```bash
# Build image
docker build -t gaaka-website .

# Run container
docker run -p 3000:3000 gaaka-website
```

## 🖥️ Traditional VPS/Server

### Requirements
- Node.js 14.17.5+
- PM2 or similar process manager
- Nginx (recommended)

### Setup Steps

1. **Prepare Server**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/your-username/gaaka-website.git
   cd gaaka-website
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "gaaka" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name gaaka.com www.gaaka.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔒 SSL Certificate

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d gaaka.com -d www.gaaka.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Performance Optimization

### Before Deployment

1. **Image Optimization**:
   - Convert to WebP format
   - Compress images
   - Use appropriate sizes

2. **Code Optimization**:
   ```bash
   # Analyze bundle
   npm install --save-dev @next/bundle-analyzer
   
   # Add to next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   
   # Run analysis
   ANALYZE=true npm run build
   ```

3. **Caching Headers**:
   Configure proper caching in your hosting platform

## 🔍 SEO Configuration

### Sitemap

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gaaka.com</loc>
    <lastmod>2025-10-30</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

### Robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://gaaka.com/sitemap.xml
```

## 🎯 Domain Configuration

### DNS Records

```
Type    Name    Value                   TTL
A       @       your-server-ip          300
A       www     your-server-ip          300
CNAME   www     gaaka.com               300
```

### Subdomain Setup (Optional)

- `shop.gaaka.com` - Main store
- `blog.gaaka.com` - Blog/content
- `api.gaaka.com` - API endpoints

## 📈 Monitoring

### Recommended Tools
- **Vercel Analytics** (if using Vercel)
- **Google Analytics 4**
- **Google Search Console**
- **Uptime monitoring** (UptimeRobot, Pingdom)

### Performance Monitoring
```javascript
// Add to _app.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics
}
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review environment variables

2. **Image Loading Issues**:
   - Verify image paths
   - Check `next.config.js` domains configuration
   - Ensure images are accessible

3. **Performance Issues**:
   - Enable compression
   - Configure proper caching
   - Optimize images
   - Use CDN for static assets

### Support
- Check deployment platform documentation
- Review Next.js deployment guides
- Open GitHub issues for project-specific problems

---

**Ready to launch GAAKA to the world! 🚀**