# GAAKA Sanity CMS Setup Guide

## 🚀 Quick Start

### 1. Create Sanity Project

```bash
cd sanity
npx sanity init
```

Follow the prompts:
- **Create new project**: Yes
- **Project name**: GAAKA E-commerce
- **Dataset**: production
- **Output path**: Use current folder
- **Project template**: Clean project

### 2. Get Your Project ID

After initialization, you'll get a **Project ID**. Copy this ID.

### 3. Configure Environment Variables

Create `.env.local` in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Update Sanity Config

Edit `sanity/sanity.config.ts` and replace `'your-project-id'` with your actual project ID.

### 5. Start Sanity Studio

```bash
cd sanity
npx sanity dev
```

This will start the Sanity Studio at `http://localhost:3333`

### 6. Deploy Sanity Studio (Optional)

```bash
cd sanity
npx sanity deploy
```

This creates a hosted studio at `https://your-project.sanity.studio`

## 📋 Content Management

### Products
Manage your basket products with:
- Name, description, price
- Multiple images
- Categories
- Dimensions and weight
- Stock status
- Featured/Best Seller flags

### Categories
Organize products into:
- Storage Baskets
- Kitchen & Dining
- Wall Baskets
- etc.

### Artisan Stories
Share stories of your Kenyan artisans:
- Name and location
- Profile image
- Personal story
- Specialty and experience

## 🔌 Using Sanity Data in Next.js

### Fetch Products

```typescript
import { sanityClient } from '@/lib/sanity/client'
import { allProductsQuery } from '@/lib/sanity/queries'

const products = await sanityClient.fetch(allProductsQuery)
```

### Display Images

```typescript
import { urlFor } from '@/lib/sanity/client'

<Image 
  src={urlFor(product.images[0]).width(400).url()} 
  alt={product.name}
/>
```

## 🎨 Access Sanity Studio

- **Local**: http://localhost:3333
- **Deployed**: https://your-project.sanity.studio

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URLs](https://www.sanity.io/docs/image-url)

## 🔐 Security

- Never commit `.env.local` to git
- Use environment variables for sensitive data
- Set up proper CORS settings in Sanity dashboard
