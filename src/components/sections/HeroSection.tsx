import Link from 'next/link';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-12">
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900 mb-2">handcrafted</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black">
                  african artistry
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-6">
                <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
                <p className="text-xl text-gray-700 italic font-light">
                  where every basket tells a story
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="border-l-4 border-amber-400 pl-6">
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  From the vibrant markets of <span className="font-semibold text-amber-700">Kenya</span> to your home—
                  <br />
                  <span className="text-2xl font-medium text-gray-900">functional art</span> woven with centuries of tradition
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/collections/all">
                <a className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    discover the collection
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </Link>
              <Link href="/about">
                <a className="group border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin" />
                  our artisan story
                </a>
              </Link>
            </div>
          </div>
          
          <div className="relative lg:h-screen flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -top-8 -left-8 w-24 h-24 border-4 border-amber-300 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                <div className="w-96 h-[500px] bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Artisan Crafted</h3>
                    <p className="text-gray-600">Traditional Weaving</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500">
                <span className="text-sm font-bold">Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
