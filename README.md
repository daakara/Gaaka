# 🧺 GAAKA - Handcrafted African Baskets

A modern e-commerce website for GAAKA, a German SME specializing in handcrafted African storage baskets. Built with Next.js 12, TypeScript, and Tailwind CSS.

## 🌟 Features

- **🎨 Modern Design**: Clean, responsive design optimized for all devices
- **🛒 E-commerce Ready**: Complete product catalog with shopping features
- **🌍 German Market Focus**: Optimized for German customers with local pricing (€)
- **🔍 SEO Optimized**: Structured data, meta tags, and search engine optimization
- **🚀 Performance**: Next.js 12 with optimized images and fast loading
- **♿ Accessibility**: WCAG compliant with semantic HTML and proper contrast
- **🌐 Bilingual**: German/English language switching with persistent preferences
- **📱 Mobile First**: Fully responsive design with touch-friendly interactions

## 🛠 Tech Stack

- **Framework**: Next.js 12 with Pages Router (Node.js 14+ compatible)
- **Language**: TypeScript 4.x
- **Styling**: Tailwind CSS 3.x with custom design system
- **Icons**: Lucide React for consistent iconography
- **Internationalization**: Custom i18n implementation with React Context
- **Image Optimization**: Next.js Image component with Unsplash integration
- **SEO**: Structured data (JSON-LD), Open Graph, Twitter Cards
- **State Management**: React Context for language switching
- **Development**: ESLint for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js 14.17.5+ (tested with Node.js 14.x)
- npm 6+ or yarn 1.x

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gaaka/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── pages/                    # Next.js 12 Pages Router
│   ├── _app.tsx             # App wrapper with LanguageProvider
│   └── index.tsx            # Homepage with all sections
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer with language toggle
│   │   ├── sections/        # Hero, Products, Mission sections
│   │   └── ui/              # LanguageToggle component
│   └── lib/
│       ├── i18n/            # Internationalization system
│       │   ├── index.ts     # Language context and hooks
│       │   └── translations.ts # German/English translations
│       └── seo/             # SEO utilities and structured data
├── public/
│   └── images/              # Local image assets (organized by category)
├── tailwind.config.js       # Custom design system configuration
└── next.config.js           # Next.js config with image domains
```

## 🎨 Design System

### Colors
- **Primary**: Orange tones (#ee7724) - Warmth and craftsmanship
- **Secondary**: Gray tones - Modern and clean
- **Accent**: Green tones (#10b981) - Growth and sustainability

### Typography
- **Headings**: Poppins - Bold and modern
- **Body**: Inter - Clean and readable

## 🌍 SEO & German Market Optimization

- **Structured Data**: Organization, Product, WebSite schemas
- **Meta Tags**: Optimized for German market
- **Hreflang**: Multi-language support
- **Performance**: Optimized Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliance

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Adequate tap targets and spacing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)

## 🚀 Deployment

The site is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Traditional hosting** with Node.js support

### Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://gaaka.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🛒 E-commerce Features

- Product catalog with filtering
- Shopping cart functionality
- Wishlist support
- User accounts and authentication
- Order management
- Payment integration ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- African artisans for their beautiful craftsmanship
- Unsplash photographers for beautiful imagery
- Next.js team for the excellent framework
- Tailwind CSS team for the utility-first CSS framework

---

**GAAKA** - Empowering communities through beautiful, handcrafted design.