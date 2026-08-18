import Link from 'next/link';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

interface HeroSectionProps {
  content?: {
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  const { t } = useLanguage();
  
  // Default fallback content
  const headline = content?.headline || 'handcrafted african artistry';
  const subheadline = content?.subheadline || 'where every basket tells a story';
  const ctaText = content?.ctaText || 'discover the collection';
  const ctaLink = content?.ctaLink || '/collections/all';
  
  return (
    <section className="relative min-h-[85vh] bg-amber-50/50 flex items-center py-16 sm:py-24 border-b border-amber-100/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Messaging */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                {t('ethicallyHandwoven')}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight capitalize">
                {headline}
              </h1>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-4 h-4 text-primary-600 fill-current flex-shrink-0" />
                <p className="text-lg italic font-normal">
                  {subheadline}
                </p>
              </div>
            </div>
            
            <div className="border-l-4 border-primary-500 pl-5">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {t('heroDescriptionShort')}
              </p>
            </div>
            
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href={ctaLink}>
                <a className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <span>{ctaText}</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Link>
              <Link href="/about">
                <a className="inline-flex items-center justify-center border-2 border-gray-300 hover:border-primary-600 text-gray-800 hover:text-primary-700 px-8 py-4 rounded-xl font-semibold text-base bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <span>{t('ourStory')}</span>
                </a>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Hero Visual Feature */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 relative">
                <div className="aspect-[4/5] bg-amber-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-amber-200">
                  <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('artisanCrafted')}
                  </h2>
                  <p className="text-sm text-gray-600 max-w-xs">
                    {t('materialDescription')}
                  </p>
                </div>
                
                {/* Floating Authentic Badge */}
                <div className="absolute -top-3 -right-3 bg-primary-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  100% {t('fairTrade')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
