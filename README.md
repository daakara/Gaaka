# 🧺 GAAKA - Handcrafted African Baskets

A modern e-commerce website for GAAKA, a German SME specializing in handcrafted African storage baskets. Built with Next.js 12, TypeScript, and Tailwind CSS.

**🚀 Quick Start**: `git clone https://github.com/daakara/Gaaka.git && cd Gaaka && npm install && npm run dev`

**📱 Live Demo**: Visit [http://localhost:3000](http://localhost:3000) after starting the development server

## 🌟 Features

- **🎨 Modern Design**: Clean, responsive design optimized for all devices
- **🛒 Complete E-commerce**: Full product catalog with collections, gift cards, and shopping features
- **🌍 German Market Focus**: Optimized for German customers with local pricing (€) and shipping
- **🔍 SEO Optimized**: Structured data, meta tags, and search engine optimization
- **🚀 Performance**: Next.js 14 with optimized images and fast loading
- **♿ Accessibility**: WCAG compliant with semantic HTML and proper contrast
- **🌐 Bilingual**: German/English language switching with persistent preferences
- **📱 Mobile First**: Fully responsive design with touch-friendly interactions
- **📄 Complete Pages**: All essential pages including About, Contact, FAQ, Shipping, Returns
- **🎁 Gift Cards**: Digital gift card system with personalization
- **📞 Support**: Comprehensive customer support pages and contact forms

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (Node.js 18+ compatible)
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

- Node.js 18.17.0+ (tested with Node.js 18.x)
- npm 6+ or yarn 1.x

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daakara/Gaaka.git
cd Gaaka
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
│   ├── index.tsx            # Homepage with all sections
│   ├── about.tsx            # Company story and values
│   ├── contact.tsx          # Contact form and company info
│   ├── faq.tsx              # Frequently asked questions
│   ├── gift-cards.tsx       # Digital gift card system
│   ├── mission.tsx          # Mission and impact details
│   ├── blog.tsx             # Blog (coming soon)
│   ├── artisan-stories.tsx  # Artisan profiles (coming soon)
│   ├── shipping.tsx         # Shipping information and rates
│   ├── returns.tsx          # Return and exchange policy
│   ├── privacy-policy.tsx   # Privacy policy
│   ├── terms.tsx            # Terms of service
│   └── collections/         # Product collection pages
│       ├── all.tsx          # All products catalog
│       ├── storage-baskets.tsx # Storage baskets collection
│       ├── kitchen-dining.tsx  # Kitchen & dining collection
│       └── wall-baskets.tsx    # Wall baskets collection
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer with navigation
│   │   ├── sections/        # Hero, Products, Mission sections
│   │   └── ui/              # LanguageToggle component
│   ├── contexts/
│   │   └── CartContext.tsx  # Shopping cart state management
│   └── lib/
│       ├── i18n/            # Internationalization system
│       │   ├── index.ts     # Language context and hooks
│       │   └── translations.ts # German/English translations
│       └── seo/             # SEO utilities and structured data
├── public/
│   └── images/              # Local image assets (organized by category)
├── tailwind.config.js       # Custom design system configuration
├── next.config.js           # Next.js config with image domains
└── jest.config.js           # Testing configuration
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

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

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

### Build Status

- **Node.js Compatibility**: Tested with Node.js 18.x+
- **Next.js Version**: 14.x
- **Production Ready**: All core pages implemented and tested
- **SEO Optimized**: Structured data and meta tags configured
- **Mobile Responsive**: Fully responsive across all device sizes

## 🛒 Current E-commerce Features

### Live Features
- **Product Collections**: Storage baskets, kitchen & dining, wall baskets
- **Product Catalog**: Complete product listings with ratings, colors, and pricing
- **Gift Cards**: Digital gift card system with custom amounts and personalization
- **Shopping Cart**: Real-time cart state and UI integration
- **Multilingual Support**: German/English language switching
- **Customer Support**: Contact forms, FAQ, shipping, and return policies
- **Company Pages**: About, mission, artisan stories (coming soon)

### Ready for Integration
- Checkout payment flow
- Wishlist support
- User accounts and authentication
- Order management system
- Payment gateway integration
- Inventory management

## 🚦 Current Status

### ✅ Completed Features
- [x] Complete website structure with all essential pages
- [x] German/English bilingual support
- [x] Responsive design for all screen sizes
- [x] Product collections (Storage, Kitchen & Dining, Wall Baskets)
- [x] Gift card system with personalization
- [x] Contact forms and customer support pages
- [x] SEO optimization with structured data
- [x] Next.js 14 compatibility (Node.js 18+)
- [x] Shopping cart state and UI

### 🔄 Ready for Integration
- [ ] Checkout flow and Payment Gateway
- [ ] User authentication and accounts
- [ ] Payment gateway (Stripe, PayPal)
- [ ] Inventory management system
- [ ] Order management and tracking
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced filtering and search

## 🤝 Contributing

1. Fork the repository from `https://github.com/daakara/Gaaka.git`
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Ensure German/English translation support
- Test on multiple screen sizes
- Follow existing code style and patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- African artisans for their beautiful craftsmanship
- Unsplash photographers for beautiful imagery
- Next.js team for the excellent framework
- Tailwind CSS team for the utility-first CSS framework

## 📊 Project Stats

- **Total Pages**: 14+ complete pages including collections and legal pages
- **Components**: 10+ reusable React components
- **Languages**: German/English with 80+ translation keys
- **Repository**: `https://github.com/daakara/Gaaka.git`
- **License**: MIT License
- **Last Updated**: October 30, 2025

---

**GAAKA** - Empowering communities through beautiful, handcrafted design.

*Built with ❤️ for African artisans and German customers*