# Contributing to GAAKA

Thank you for your interest in contributing to the GAAKA e-commerce website! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/gaaka-website.git
   cd gaaka-website
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠 Development Workflow

### Running the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Code Quality

- **TypeScript**: All new code should be written in TypeScript
- **ESLint**: Run `npm run lint` to check for issues
- **Prettier**: Format your code consistently (recommended to set up in your editor)

### Testing Your Changes

1. Test the website in both German and English
2. Verify responsive design on different screen sizes
3. Check that images load properly
4. Ensure accessibility standards are maintained

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on multiple devices/browsers
3. **Write clear commit messages**:
   ```
   feat: add German translations for product descriptions
   fix: resolve mobile navigation issues
   docs: update setup instructions
   ```
4. **Submit pull request** with:
   - Clear description of changes
   - Screenshots if UI changes
   - Testing steps performed

## 🎨 Design Guidelines

### Brand Colors
- Primary: Orange (#ee7724) - Warmth and craftsmanship
- Secondary: Gray tones - Modern and clean  
- Accent: Green (#10b981) - Growth and sustainability

### Typography
- Headings: Poppins (bold, modern)
- Body: Inter (clean, readable)

### Component Standards
- Use Tailwind CSS classes consistently
- Follow existing component patterns
- Ensure mobile-first responsive design
- Maintain accessibility standards (WCAG 2.1 AA)

## 🌐 Internationalization

When adding new text:

1. **Add to translations**: Update `/src/lib/i18n/translations.ts`
2. **Use translation keys**: Use `t('keyName')` instead of hardcoded text
3. **Test both languages**: Verify German and English versions
4. **Consider cultural context**: German market considerations

## 📸 Images

- **Local storage**: Place images in `/public/images/` subdirectories
- **Optimization**: Use WebP format when possible
- **Alt text**: Always provide descriptive alt text
- **Licensing**: Ensure proper licensing for any new images

## 🐛 Bug Reports

When reporting bugs, please include:

- **Environment**: Browser, OS, device type
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Console errors** if any

## 💡 Feature Requests

For new features:

- **Describe the use case**
- **Explain the business value**
- **Consider German market needs**
- **Think about mobile experience**

## ❓ Questions

- Open an issue for general questions
- Use discussions for broader topics
- Check existing issues before creating new ones

## 🙏 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming community
- Respect different perspectives and experiences

---

Thank you for contributing to GAAKA's mission of supporting African artisans through beautiful, functional design! 🧺