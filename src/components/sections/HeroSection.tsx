import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Award, Leaf } from 'lucide-react';
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
    <section className="relative min-h-[85vh] bg-gradient-to-b from-amber-50/70 via-[#faf6f0] to-[#f7f2ea] flex items-center py-16 sm:py-24 border-b border-amber-100/70 overflow-hidden">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Messaging (7 cols) */}
          <div className="lg:col-span-7 space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/80 border border-primary-200/60 text-primary-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-primary-700" />
                <span>{t('ethicallyHandwoven')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] capitalize">
                {headline}
              </h1>
              
              <div className="flex items-center gap-2.5 text-primary-800">
                <Heart className="w-4 h-4 text-primary-700 fill-current flex-shrink-0" />
                <p className="text-lg sm:text-xl font-serif italic text-gray-700">
                  {subheadline}
                </p>
              </div>
            </div>
            
            <div className="border-l-4 border-primary-600 pl-5 py-1">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('heroDescriptionShort')}
              </p>
            </div>
            
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href={ctaLink}>
                <a className="btn-primary group text-base">
                  <span>{ctaText}</span>
                  <ArrowRight className="ml-2.5 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
              <Link href="/about">
                <a className="btn-outline text-base">
                  <span>{t('ourStory')}</span>
                </a>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/60">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-700 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-900">100% Fair Trade</p>
                  <p className="text-[11px] text-gray-500">Certified ethics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Natural Fibers</p>
                  <p className="text-[11px] text-gray-500">Sisal & Sweetgrass</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Free Germany Ship</p>
                  <p className="text-[11px] text-gray-500">Orders over €75</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Hero Visual Feature (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl border border-amber-100 relative group">
                <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-amber-200/80 relative overflow-hidden">
                  <div className="w-24 h-24 bg-primary-700 text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-primary-700/20 group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-12 h-12 text-amber-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2.5">
                    {t('artisanCrafted')}
                  </h2>
                  <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                    {t('materialDescription')}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-800 shadow-sm border border-amber-200">
                    <span>Kenya • Handmade with Love</span>
                  </div>
                </div>
                
                {/* Floating Authentic Badge */}
                <div className="absolute -top-3 -right-3 bg-primary-800 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>100% {t('fairTrade')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
