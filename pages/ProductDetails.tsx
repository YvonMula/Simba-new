
import { useState, useRef, useEffect, FC, MouseEvent, CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Minus, Plus, ShoppingCart, Truck, ShieldCheck, Star, Heart, 
  Share2, ZoomIn, X, Maximize2, Utensils, FileText, ChevronRight, 
  ThumbsUp, ChevronLeft, CheckCircle, Package, RefreshCw
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useAppContext } from '../App';
import { ProductCard } from '../components/ProductCard';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { getOptimizedImage, getSrcSet } from '../utils/image';

export const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition' | 'reviews'>('description');
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({ transformOrigin: 'center', transform: 'scale(1)' });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find(p => p.id === id);
  // Get more related products for the carousel
  const relatedProducts = product ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8) : [];
  
  const isInWishlist = product ? wishlist.includes(product.id) : false;

  // Scroll to top on mount or id change
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setSelectedImageIndex(0);
    setActiveTab('description');
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/catalog')} className="text-simba-orange hover:underline">Return to Catalog</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate percentage position
    let x = ((e.clientX - left) / width) * 100;
    let y = ((e.clientY - top) / height) * 100;
    
    // Clamp values
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)' 
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)'
    });
    setIsHovering(false);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mock Nutrition Data
  const nutritionData = [
    { label: 'Energy', value: '350 kcal' },
    { label: 'Fat', value: '12g' },
    { label: 'Saturated Fat', value: '3g' },
    { label: 'Carbohydrates', value: '45g' },
    { label: 'Sugars', value: '10g' },
    { label: 'Protein', value: '8g' },
    { label: 'Salt', value: '0.5g' },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 md:pb-12 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <button className="hover:text-simba-orange transition-colors font-medium" onClick={() => navigate('/')}>Home</button> 
          <ChevronRight size={16} className="mx-2 flex-shrink-0 text-gray-300" />
          <button className="hover:text-simba-orange transition-colors font-medium" onClick={() => navigate(`/catalog?category=${product.category.toLowerCase().replace(' ', '-')}`)}>{product.category}</button> 
          <ChevronRight size={16} className="mx-2 flex-shrink-0 text-gray-300" />
          <span className="text-gray-900 font-semibold truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="space-y-6">
            <div 
              ref={imageContainerRef}
              className="aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 relative group shadow-sm z-10"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={getOptimizedImage(product.image, 1000)} 
                srcSet={getSrcSet(product.image)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt={product.name} 
                className={`w-full h-full object-contain mix-blend-multiply p-4 md:p-8 ${isHovering ? 'cursor-none transition-none' : 'cursor-zoom-in transition-transform duration-300 ease-out'}`}
                style={zoomStyle}
                // @ts-ignore
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                 {product.isFlashSale && (
                   <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 w-fit animate-pulse">
                     ⚡ Flash Sale
                   </span>
                 )}
                 {product.oldPrice && (
                   <span className="bg-simba-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm w-fit">
                     -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                   </span>
                 )}
              </div>
              
              <div className={`hidden md:flex absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-600 px-4 py-2 rounded-full text-xs font-bold pointer-events-none transition-opacity duration-300 items-center gap-2 shadow-sm border border-gray-100 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                 <ZoomIn size={16} /> Hover to Zoom
              </div>
              
              <button 
                 className="absolute top-4 right-4 bg-white p-2.5 rounded-full text-gray-600 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-simba-orange hover:text-white shadow-md border border-gray-100 z-20"
                 onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
                 aria-label="View Full Screen"
              >
                 <Maximize2 size={20} />
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x px-1 justify-center lg:justify-start">
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`relative w-20 h-20 flex-shrink-0 bg-white rounded-xl cursor-pointer border-2 transition-all snap-start overflow-hidden ${selectedImageIndex === i ? 'border-simba-orange ring-2 ring-simba-orange/20 shadow-md scale-105' : 'border-transparent hover:border-gray-200 bg-gray-50'}`}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <img 
                    src={getOptimizedImage(product.image, 200)} 
                    srcSet={`${getOptimizedImage(product.image, 200)} 1x, ${getOptimizedImage(product.image, 400)} 2x`}
                    alt={`Thumbnail ${i + 1}`} 
                    className={`w-full h-full object-contain p-2 mix-blend-multiply ${selectedImageIndex === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="inline-block text-simba-blue text-xs font-extrabold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition cursor-pointer">
                      {product.brand}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-3 rounded-full bg-gray-50 transition border border-transparent shadow-sm group ${isInWishlist ? 'text-red-500 bg-red-50 border-red-100' : 'hover:bg-red-50 hover:text-red-500 hover:border-red-100'}`}
                      >
                        <Heart size={20} className="group-hover:scale-110 transition-transform" fill={isInWishlist ? "currentColor" : "none"} />
                      </button>
                      <button className="p-3 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-500 transition border border-transparent hover:border-blue-100 shadow-sm group">
                        <Share2 size={20} className="group-hover:scale-110 transition-transform"/>
                      </button>
                    </div>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-yellow-400">
                        {[1,2,3,4].map(s => <Star key={s} size={18} fill="currentColor" />)}
                        <Star size={18} className="text-gray-200" fill="currentColor" />
                      </div>
                      <span className="font-bold text-gray-900 ml-2 text-lg">{product.rating || 4.5}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="underline cursor-pointer hover:text-simba-orange text-gray-500 font-medium">{product.reviews || 12} Reviews</span>
                    </div>
                    
                    <div className={`font-medium text-sm flex items-center gap-1.5 px-3 py-1 rounded-full ${product.inStock ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {product.inStock ? <CheckCircle size={14}/> : <X size={14}/>}
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
               </div>

               <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Total Price</div>
                    <div className="flex items-baseline gap-3">
                      <div className="text-4xl md:text-5xl font-extrabold text-simba-orange">
                        {product.price.toLocaleString()} <span className="text-lg md:text-xl font-bold text-gray-400">RWF</span>
                      </div>
                      {product.oldPrice && (
                         <span className="text-gray-300 line-through text-xl font-semibold decoration-2">{product.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                 </div>
                 
                 {/* Desktop Quantity & Add */}
                 <div className="hidden md:flex gap-4 items-center">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 h-14 p-1">
                      <button 
                        onClick={decrement} 
                        className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition disabled:opacity-50" 
                        disabled={quantity<=1}
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-12 text-center font-bold text-xl text-gray-900">{quantity}</span>
                      <button 
                        onClick={increment} 
                        className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex items-center justify-center gap-3 h-14 px-8 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                        ${product.inStock ? 'bg-simba-orange text-white hover:bg-orange-600 shadow-orange-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
                      `}
                    >
                      <ShoppingCart size={22} strokeWidth={2.5} />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                 </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition group">
                    <div className="bg-blue-50 p-3 rounded-xl text-simba-blue group-hover:bg-simba-blue group-hover:text-white transition-colors"><Truck size={24} /></div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Fast Delivery</div>
                      <div className="text-sm text-gray-500 leading-snug">Order before 2 PM for same-day delivery in Kigali.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-green-100 hover:shadow-md transition group">
                    <div className="bg-green-50 p-3 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"><ShieldCheck size={24} /></div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Quality Guarantee</div>
                      <div className="text-sm text-gray-500 leading-snug">Verified freshness and authenticity guaranteed.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 hover:shadow-md transition group">
                    <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors"><Package size={24} /></div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Secure Packaging</div>
                      <div className="text-sm text-gray-500 leading-snug">Carefully packed to ensure product safety.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-yellow-100 hover:shadow-md transition group">
                    <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors"><RefreshCw size={24} /></div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Easy Returns</div>
                      <div className="text-sm text-gray-500 leading-snug">Hassle-free returns within 48 hours.</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="mb-20 scroll-mt-24 container mx-auto px-4 sm:px-6 lg:px-8" id="details">
           <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar gap-8">
              <button 
                onClick={() => setActiveTab('description')}
                className={`flex items-center gap-2 pb-4 font-bold text-base md:text-lg border-b-3 transition whitespace-nowrap px-2 ${activeTab === 'description' ? 'border-simba-orange text-simba-orange' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                <FileText size={20} /> Description
              </button>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className={`flex items-center gap-2 pb-4 font-bold text-base md:text-lg border-b-3 transition whitespace-nowrap px-2 ${activeTab === 'nutrition' ? 'border-simba-orange text-simba-orange' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                <Utensils size={20} /> Nutritional Info
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 pb-4 font-bold text-base md:text-lg border-b-3 transition whitespace-nowrap px-2 ${activeTab === 'reviews' ? 'border-simba-orange text-simba-orange' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                <Star size={20} /> Reviews ({product.reviews || 0})
              </button>
           </div>

           <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm min-h-[300px]">
              {activeTab === 'description' && (
                <div className="max-w-4xl animate-fade-in space-y-8">
                   <div>
                       <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h3>
                       <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                   </div>
                   
                   <p className="text-gray-600 leading-relaxed text-lg">
                     Sourced directly from trusted suppliers, this product meets the highest standards of quality and freshness. 
                     Perfect for daily use and suitable for all family members. Store in a cool, dry place away from direct sunlight.
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mt-6">
                      {['Premium Quality', 'Sustainably Sourced', 'Freshness Guaranteed', 'Best Value'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-800 bg-gray-50 p-5 rounded-xl border border-gray-100">
                          <CheckCircle size={24} className="text-green-500" /> 
                          <span className="font-bold">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="max-w-3xl animate-fade-in">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h3>
                   <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 p-5 border-b border-gray-200 flex justify-between font-bold text-gray-700 text-lg">
                         <span>Typical Values</span>
                         <span>Per 100g / Serving</span>
                      </div>
                      <div className="divide-y divide-gray-100 bg-white">
                         {nutritionData.map((row, idx) => (
                           <div key={idx} className="p-5 flex justify-between hover:bg-gray-50 transition text-base md:text-lg">
                              <span className="text-gray-600 font-medium">{row.label}</span>
                              <span className="text-gray-900 font-bold">{row.value}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <p className="text-sm text-gray-500 mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-100 inline-block">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                   <div className="flex flex-col lg:flex-row gap-16">
                      {/* Summary */}
                      <div className="lg:w-1/3 space-y-8">
                         <div className="bg-orange-50 p-10 rounded-3xl text-center border border-orange-100">
                            <div className="text-7xl font-extrabold text-simba-orange mb-4">{product.rating || 4.5}</div>
                            <div className="flex justify-center text-yellow-400 mb-4 gap-1">
                               {[1,2,3,4].map(s => <Star key={s} size={28} fill="currentColor" />)}
                               <Star size={28} className="text-yellow-400/30" fill="currentColor" />
                            </div>
                            <div className="text-gray-700 font-bold text-lg">Based on {product.reviews || 12} Reviews</div>
                         </div>
                         
                         <div className="space-y-4">
                            {[5,4,3,2,1].map(stars => (
                              <div key={stars} className="flex items-center gap-4">
                                 <div className="w-12 font-bold text-gray-600 flex items-center gap-1.5 text-lg">{stars} <Star size={16} fill="currentColor" className="text-gray-400"/></div>
                                 <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-yellow-400 rounded-full" 
                                      style={{ width: stars === 5 ? '70%' : stars === 4 ? '20%' : '5%' }}
                                    ></div>
                                 </div>
                                 <div className="w-12 text-right text-gray-500 font-medium">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</div>
                              </div>
                            ))}
                         </div>
                      </div>
                      
                      {/* Review List */}
                      <div className="lg:w-2/3 space-y-8">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 text-2xl">Customer Reviews</h3>
                            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-simba-orange transition shadow-md">Write a Review</button>
                         </div>
                         <div className="space-y-8">
                            {[1, 2].map((review) => (
                                <div key={review} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-simba-blue border border-gray-200 shadow-sm text-lg">
                                        {review === 1 ? 'JD' : 'AS'}
                                        </div>
                                        <div>
                                        <div className="font-bold text-gray-900 text-lg">{review === 1 ? 'John Doe' : 'Alice Smith'}</div>
                                        <div className="flex text-yellow-400 text-sm gap-0.5 mt-1">
                                            {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                        </div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">2 days ago</span>
                                </div>
                                <p className="text-gray-700 text-base leading-relaxed mb-4">
                                    {review === 1 
                                        ? "Great quality product! Fresh and arrived on time. The packaging was secure and the rider was very polite. Will definitely be buying this again from Simba." 
                                        : "Good value for money. It was exactly as described. Highly recommended for anyone looking for fresh groceries in Kigali."}
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-simba-orange transition">
                                        <ThumbsUp size={16} /> Helpful (12)
                                    </button>
                                </div>
                                </div>
                            ))}
                         </div>
                         <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-simba-orange hover:border-simba-orange hover:bg-orange-50 transition">
                            Load More Reviews
                         </button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-gray-100 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">You May Also Like</h2>
                <div className="flex gap-3">
                    <button 
                    onClick={() => scrollCarousel('left')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-simba-orange hover:text-white hover:border-simba-orange text-gray-600 transition shadow-sm flex items-center justify-center"
                    >
                    <ChevronLeft size={20} />
                    </button>
                    <button 
                    onClick={() => scrollCarousel('right')}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-simba-orange hover:text-white hover:border-simba-orange text-gray-600 transition shadow-sm flex items-center justify-center"
                    >
                    <ChevronRight size={20} />
                    </button>
                </div>
                </div>
                
                <div 
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 scroll-smooth"
                >
                {relatedProducts.map(p => (
                    <div key={p.id} className="min-w-[200px] md:min-w-[260px] snap-start">
                    <ProductCard product={p} />
                    </div>
                ))}
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-40 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
         <div className="flex gap-4 items-center">
            <div className="flex items-center bg-gray-50 rounded-xl h-12 border border-gray-200">
               <button onClick={decrement} className="w-12 h-full flex items-center justify-center hover:text-simba-orange disabled:opacity-50 transition" disabled={quantity<=1}><Minus size={18} /></button>
               <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
               <button onClick={increment} className="w-12 h-full flex items-center justify-center hover:text-simba-orange transition"><Plus size={18} /></button>
            </div>
            <button 
               onClick={handleAddToCart}
               disabled={!product.inStock}
               className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95
                  ${product.inStock ? 'bg-simba-orange text-white' : 'bg-gray-200 text-gray-400'}
               `}
            >
               {product.inStock ? (
                  <>Add • {(product.price * quantity).toLocaleString()}</>
               ) : 'Out of Stock'}
            </button>
         </div>
      </div>

      <FloatingCartButton />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
           className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in p-4 backdrop-blur-sm"
           onClick={() => setIsLightboxOpen(false)}
        >
           <button 
             className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-simba-orange transition z-10 bg-white/10 p-3 rounded-full backdrop-blur-md"
             onClick={() => setIsLightboxOpen(false)}
           >
             <X size={24} className="md:w-8 md:h-8" />
           </button>
           
           <div 
             className="relative w-full h-full flex items-center justify-center" 
             onClick={(e) => e.stopPropagation()}
           >
              <img 
                 src={getOptimizedImage(product.image, 1600)}
                 srcSet={getSrcSet(product.image)}
                 alt={product.name}
                 className="max-w-full max-h-full object-contain"
              />
           </div>
        </div>
      )}
    </div>
  );
};
