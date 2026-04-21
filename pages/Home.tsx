import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, CheckCircle, Gift, ChevronRight, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';
import { getOptimizedImage, getSrcSet } from '../utils/image';
import { LazyLoad } from '../components/LazyLoad';

export const Home: FC = () => {
  const navigate = useNavigate();
  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale || p.oldPrice).slice(0, 10);
  const heroImage = "https://images.unsplash.com/photo-1542838132-92c53300491e";

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('simba_has_onboarded');
    if (!hasOnboarded) {
      navigate('/onboarding');
    }
  }, [navigate]);

  // Helper to get products for a specific category
  const getCategoryProducts = (catName: string) => {
    return PRODUCTS.filter(p => p.category === catName);
  };

  return (
    <div className="space-y-8 md:space-y-16 pb-20 md:pb-12">
      {/* Immersive Hero Section - Height optimized for mobile/tablet */}
      <section className="relative min-h-[75vh] md:h-[600px] w-full bg-gray-900 overflow-hidden flex items-end md:items-center">
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent z-10"></div>
        {/* Responsive Image with Picture Tag for Mobile Bandwidth Optimization */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 640px)" srcSet={getOptimizedImage(heroImage, 800)} />
          <source media="(min-width: 641px)" srcSet={getOptimizedImage(heroImage, 1920)} />
          <img 
            src={getOptimizedImage(heroImage, 1920)}
            srcSet={getSrcSet(heroImage)}
            sizes="100vw"
            alt="Fresh Market" 
            className="w-full h-full object-cover"
            // @ts-ignore
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full pb-12 md:pb-0 pt-24">
          <div className="animate-fade-in-up">
            <span className="bg-simba-orange text-white font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-4 inline-block text-[10px] md:text-xs uppercase tracking-widest shadow-lg">
              Weekly Specials
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.1] drop-shadow-md">
              Quality Freshness <br/>
              <span className="text-simba-blue">Guaranteed.</span>
            </h1>
            <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none">
              From farm-fresh produce to premium household essentials, experience the new standard of shopping in Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-none">
              <Link 
                to="/catalog" 
                className="bg-simba-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link 
                to="/catalog?category=fresh-produce" 
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all border border-white/30 text-center text-sm md:text-base w-full sm:w-auto"
              >
                Fresh Produce
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Horizontal Scroll on Mobile to save vertical space */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-24 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory no-scrollbar divide-x divide-gray-100">
            <div className="min-w-[85%] md:min-w-0 snap-center p-6 md:p-8 flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-xl text-simba-orange flex-shrink-0"><Truck size={24} className="md:w-7 md:h-7" /></div>
              <div>
                <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-0.5">Express Delivery</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-snug">Delivery within 60 mins in Kigali.</p>
              </div>
            </div>
            <div className="min-w-[85%] md:min-w-0 snap-center p-6 md:p-8 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-simba-blue flex-shrink-0"><ShieldCheck size={24} className="md:w-7 md:h-7" /></div>
              <div>
                <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-0.5">Quality Guaranteed</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-snug">Direct from trusted farmers.</p>
              </div>
            </div>
            <div className="min-w-[85%] md:min-w-0 snap-center p-6 md:p-8 flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-xl text-green-600 flex-shrink-0"><CheckCircle size={24} className="md:w-7 md:h-7" /></div>
              <div>
                <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-0.5">Best Prices</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-snug">Competitive market prices.</p>
              </div>
            </div>
          </div>
          {/* Mobile scroll indicator hint */}
          <div className="md:hidden flex justify-center gap-1.5 pb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Quick Access) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-end mb-6 md:mb-8 gap-2">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold text-gray-900">Shop by Department</h2>
            <p className="text-xs md:text-base text-gray-500 mt-1 hidden sm:block">Explore our wide range of premium products</p>
          </div>
          <Link to="/catalog" className="text-simba-blue font-bold hover:underline flex items-center gap-1 text-xs md:text-sm bg-blue-50 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none transition-colors">
            View All <ArrowRight size={14}/>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] md:aspect-[3/4] shadow-sm md:shadow-md hover:shadow-xl transition-all"
            >
              {cat.image && (
                <img 
                  src={getOptimizedImage(cat.image, 400)} 
                  srcSet={getSrcSet(cat.image)}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full">
                <span className="block text-white font-bold text-sm md:text-lg group-hover:text-simba-orange transition-colors leading-tight">{cat.name}</span>
                <span className="text-gray-300 text-xs hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 mt-1">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sales - Responsive Grid */}
      <section className="bg-simba-dark py-8 md:py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-end justify-between mb-6 md:mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                 <span className="bg-simba-orange text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded animate-pulse">LIVE NOW</span>
                 <span className="text-gray-400 text-[10px] md:text-sm">Ends in 05:23:12</span>
              </div>
              <h2 className="text-xl md:text-4xl font-extrabold"><span className="text-simba-orange">Flash</span> Deals</h2>
            </div>
            <Link to="/catalog?flash=true" className="border border-gray-600 hover:border-white text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full transition text-xs md:text-sm font-bold whitespace-nowrap">See All</Link>
          </div>
          
          <div className="relative group/slider">
             <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x scroll-smooth">
                {flashSaleProducts.map(product => (
                  <div key={product.id} className="min-w-[160px] md:min-w-[220px] snap-start">
                     <ProductCard product={product} />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Category Rows - Rich Display for Each Category */}
      <div className="space-y-8 md:space-y-16">
        {CATEGORIES.map((category) => {
          const products = getCategoryProducts(category.name);
          if (products.length === 0) return null;

          return (
            <LazyLoad key={category.id} height="400px" offset="200px">
              <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-gray-100 pb-2 md:pb-3">
                    <div className="flex items-center gap-2 md:gap-3">
                       <h2 className="text-lg md:text-2xl font-extrabold text-gray-900">{category.name}</h2>
                       <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full hidden sm:inline-block border border-gray-200">
                         {products.length}+ Items
                       </span>
                    </div>
                    <Link 
                      to={`/catalog?category=${category.slug}`} 
                      className="text-simba-orange font-bold text-xs md:text-sm hover:bg-orange-50 px-2 py-1 md:px-3 md:py-2 rounded-lg transition flex items-center gap-1"
                    >
                      View All <ChevronRight size={14} className="md:w-4 md:h-4" />
                    </Link>
                 </div>
                 
                 <div className="relative group/slider">
                    <div className="flex gap-3 md:gap-4 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 snap-x scroll-smooth">
                      {products.map(product => (
                        <div key={product.id} className="min-w-[160px] md:min-w-[220px] snap-start">
                           <ProductCard product={product} />
                        </div>
                      ))}
                      
                      {/* "View All" Card at the end of the row */}
                      <Link 
                        to={`/catalog?category=${category.slug}`} 
                        className="min-w-[140px] md:min-w-[220px] snap-start flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-simba-orange hover:text-simba-orange hover:bg-orange-50/30 transition cursor-pointer group/more"
                      >
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover/more:scale-110 transition duration-300">
                            <ArrowRight size={20} className="md:w-6 md:h-6" />
                         </div>
                         <span className="font-bold text-xs md:text-sm text-center px-4">See all {products.length} products</span>
                      </Link>
                    </div>
                 </div>
              </section>
            </LazyLoad>
          );
        })}
      </div>
      
      {/* Loyalty Teaser */}
      <LazyLoad height="400px">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-12 flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-16 relative overflow-hidden shadow-2xl border border-gray-800">
             {/* Background decorative blobs */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-simba-orange rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-simba-blue rounded-full mix-blend-screen filter blur-[96px] opacity-20 pointer-events-none"></div>

             <div className="w-full lg:w-1/2 z-10 space-y-4 md:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase">
                   <Gift size={14} className="fill-current" /> Simba Rewards
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                   Shop smarter, <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-simba-orange to-yellow-400">
                      save bigger.
                   </span>
                </h2>
                
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                   Join our loyalty program today to unlock a world of exclusive benefits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start w-full">
                   <Link to="/profile" className="px-8 py-3.5 bg-simba-orange hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto">
                      Join Now
                   </Link>
                   <Link to="/loyalty" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl transition flex items-center justify-center gap-2 backdrop-blur-sm text-sm md:text-base w-full sm:w-auto">
                      Learn More <ArrowRight size={18} />
                   </Link>
                </div>
             </div>
             
             <div className="w-full lg:w-1/2 flex justify-center z-10 relative perspective-1000">
                {/* 3D Card Visual - Scaled for mobile */}
                <div className="relative group w-[260px] md:w-full max-w-sm">
                   <div className="absolute inset-0 bg-simba-orange blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                   <div className="aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 shadow-2xl p-4 md:p-6 relative overflow-hidden transform transition-all duration-500 hover:rotate-y-12 hover:rotate-x-12 hover:scale-105">
                      {/* Card Content */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                      <div className="relative z-10 flex flex-col justify-between h-full text-white">
                         <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-simba-orange to-red-500 rounded-lg flex items-center justify-center text-lg md:text-xl shadow-lg">🦁</div>
                               <span className="font-bold text-lg md:text-2xl tracking-tight">SIMBA</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-bold bg-white/10 px-2 md:px-3 py-1 rounded-full backdrop-blur-md border border-white/20">PLATINUM</span>
                         </div>
                         <div>
                            <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                               <div className="h-5 md:h-8 w-8 md:w-12 bg-white/10 rounded-md animate-pulse"></div>
                               <div className="h-5 md:h-8 w-8 md:w-12 bg-white/10 rounded-md animate-pulse delay-75"></div>
                            </div>
                            <div className="font-mono text-sm md:text-xl tracking-widest text-gray-400">4580  ••••  ••••  2219</div>
                            <div className="flex justify-between items-end mt-4">
                               <div>
                                  <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest">Card Holder</div>
                                  <div className="text-xs md:text-sm font-medium">John Doe</div>
                               </div>
                               <div>
                                  <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest text-right">Points</div>
                                  <div className="text-base md:text-lg font-bold text-simba-orange">12,450</div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </LazyLoad>

      {/* Mobile App Banner */}
      <LazyLoad height="300px">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-simba-orange to-orange-500 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center relative">
            <div className="p-8 md:p-16 md:w-1/2 text-white z-10 text-center md:text-left order-2 md:order-1">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">Shop Smarter with the Simba App</h2>
              <p className="text-orange-100 mb-6 md:mb-8 text-sm md:text-lg max-w-md mx-auto md:mx-0">Get exclusive mobile-only discounts, track your delivery in real-time, and reorder your favorites in one tap.</p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                <button className="bg-black text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base w-full sm:w-auto">
                  <span>Download on iOS</span>
                </button>
                <button className="bg-white text-black px-6 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base w-full sm:w-auto">
                  <span>Get on Android</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-48 md:h-auto relative order-1 md:order-2">
               <img 
                 src={getOptimizedImage("https://images.unsplash.com/photo-1512428559087-560fa5ce7d87", 800)} 
                 className="w-full h-full object-cover md:absolute inset-0 mix-blend-overlay opacity-50"
                 alt="App Preview"
                 loading="lazy"
                 decoding="async"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-orange-600 md:bg-gradient-to-l to-transparent"></div>
            </div>
          </div>
        </section>
      </LazyLoad>
    </div>
  );
};