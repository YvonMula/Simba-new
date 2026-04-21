import { useState, useEffect, FC, FormEvent, ChangeEvent, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Search, User, MapPin, Menu, X, Phone, 
  HelpCircle, Award, ArrowRight, Grid, Zap, ChevronRight,
  Truck, Heart, ChevronDown, Home
} from 'lucide-react';
import { useAppContext } from '../App';
import { CATEGORIES } from '../constants';
import { Product, Category } from '../types';
import { getOptimizedImage, getThumbnailSrcSet } from '../utils/image';

export const Navbar: FC = () => {
  const { cart, user } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ products: Product[], categories: Category[] }>({ products: [], categories: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const isActive = (path: string) => location.pathname === path;

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setSuggestions({ products: [], categories: [] });
        return;
      }

      const lowerTerm = searchTerm.toLowerCase();

      const matchedCategories = CATEGORIES.filter(c => 
        c.name.toLowerCase().includes(lowerTerm)
      ).slice(0, 3);

      // Dynamically import PRODUCTS to reduce initial bundle size
      const { PRODUCTS } = await import('../constants');

      const matchedProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        p.brand.toLowerCase().includes(lowerTerm) ||
        p.category.toLowerCase().includes(lowerTerm)
      ).slice(0, 5);

      setSuggestions({ products: matchedProducts, categories: matchedCategories });
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!showSuggestions && e.target.value.length > 1) setShowSuggestions(true);
  };

  const handleSuggestionClick = (path: string) => {
    navigate(path);
    setShowSuggestions(false);
    setSearchTerm('');
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 pt-0' 
          : 'bg-white border-b border-gray-100 pt-0'}`}
      >
        {/* Tier 1: Utility Bar - Smooth collapse */}
        <div 
          className={`bg-gray-900 text-gray-300 text-[11px] font-medium overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 py-2.5 opacity-100'}`}
        >
          <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
             <div className="flex items-center gap-6">
               <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer tracking-wide">
                 <MapPin size={13} className="text-simba-orange"/> 
                 Kigali, Rwanda
               </span>
               <span className="hidden sm:flex items-center gap-2 hover:text-white transition-colors cursor-pointer tracking-wide">
                 <Phone size={13} className="text-simba-orange"/> 
                 +250 788 123 456
               </span>
             </div>
             <div className="flex items-center gap-5">
               <Link to="/branches" className="hover:text-simba-orange transition-colors hidden sm:block">Store Locator</Link>
               <Link to="/track-order" className="hover:text-simba-orange transition-colors hidden sm:block flex items-center gap-1.5">
                 <Truck size={13}/> Track Order
               </Link>
               <div className="h-3 w-px bg-gray-700 hidden sm:block"></div>
               <Link to="/loyalty" className="hover:text-simba-orange transition-colors text-simba-orange font-bold flex items-center gap-1.5">
                 <Award size={13}/> Simba Rewards
               </Link>
             </div>
          </div>
        </div>

        {/* Tier 2: Main Header */}
        <div className={`container mx-auto px-4 lg:px-8 transition-all duration-500 ease-in-out ${isScrolled ? 'h-[70px]' : 'h-24'} flex items-center justify-between gap-6`}>
          
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
              aria-label="Open menu"
            >
              <Menu size={26} strokeWidth={2} />
            </button>
            <Link to="/" className="flex items-center gap-2">
               <div className="w-8 h-8 bg-gradient-to-br from-simba-orange to-orange-600 rounded-lg flex items-center justify-center text-white text-lg shadow-md shadow-orange-500/20">🦁</div>
               <span className="font-extrabold text-gray-900 text-xl tracking-tight">SIMBA</span>
            </Link>
          </div>

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:flex items-center gap-3 group relative z-10 shrink-0 mr-8">
             <div className={`bg-gradient-to-br from-simba-orange to-orange-600 rounded-xl flex items-center justify-center text-white transition-all duration-500 shadow-lg shadow-orange-500/20
               ${isScrolled ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'}`}>
               🦁
             </div>
             <div className="flex flex-col leading-none">
                <span className={`font-black text-gray-900 tracking-tight transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-3xl'}`}>
                  SIMBA
                </span>
                <span className={`text-[10px] font-bold text-simba-blue tracking-[0.25em] uppercase transition-all duration-500 origin-left ${isScrolled ? 'opacity-0 h-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  Market
                </span>
             </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-grow max-w-2xl relative z-30" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative group">
              <div className={`relative flex items-center w-full rounded-full transition-all duration-300 border-2
                ${showSuggestions 
                  ? 'rounded-b-none border-simba-orange bg-white shadow-xl ring-4 ring-orange-50' 
                  : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus-within:bg-white focus-within:border-simba-orange focus-within:ring-4 focus-within:ring-orange-50'
                }`}
              >
                <Search size={20} className={`absolute left-5 transition-colors duration-300 ${showSuggestions ? 'text-simba-orange' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <input
                  type="text"
                  placeholder="Search 5,000+ products..."
                  className="w-full bg-transparent border-none py-3.5 pl-14 pr-32 focus:ring-0 text-base md:text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal h-[52px]"
                  value={searchTerm}
                  onChange={handleSearchInput}
                  onFocus={() => { if (searchTerm.length > 1) setShowSuggestions(true); }}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-simba-orange transition-all duration-300 active:scale-95 text-xs font-bold tracking-wide shadow-md"
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                <div className="absolute top-[calc(100%-2px)] left-0 right-0 bg-white rounded-b-3xl shadow-2xl border-2 border-t-0 border-simba-orange overflow-hidden animate-fade-in origin-top">
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {suggestions.categories.length > 0 && (
                      <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 px-2 tracking-wider">Top Categories</div>
                        <div className="flex flex-wrap gap-2 px-1">
                          {suggestions.categories.map(cat => (
                            <button 
                              key={cat.id}
                              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-simba-orange hover:text-simba-orange rounded-xl cursor-pointer transition-all text-xs font-bold text-gray-700 shadow-sm hover:shadow-md"
                              onClick={() => handleSuggestionClick(`/catalog?category=${cat.slug}`)}
                            >
                              <Grid size={14} /> {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {suggestions.products.length > 0 && (
                      <div className="p-2">
                         <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 px-4 mt-3 tracking-wider">Products</div>
                         <div className="space-y-1">
                            {suggestions.products.map(product => (
                                <div 
                                    key={product.id}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-orange-50 rounded-2xl cursor-pointer group transition-all duration-200"
                                    onClick={() => handleSuggestionClick(`/product/${product.id}`)}
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex-shrink-0 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                                        <img 
                                          src={getOptimizedImage(product.image, 100)} 
                                          srcSet={getThumbnailSrcSet(product.image, 50)}
                                          alt={product.name} 
                                          className="w-full h-full object-contain mix-blend-multiply" 
                                          loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="text-sm font-bold text-gray-900 truncate group-hover:text-simba-orange transition-colors">{product.name}</div>
                                        <div className="text-xs text-gray-500 font-medium">{product.category} • {product.brand}</div>
                                    </div>
                                    <div className="text-sm font-extrabold text-gray-900 group-hover:text-simba-orange">
                                        {product.price.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                         </div>
                      </div>
                    )}
                    
                    <div 
                      className="bg-gray-50 p-4 text-center border-t border-gray-100 cursor-pointer hover:bg-simba-orange hover:text-white transition-colors text-sm font-bold text-simba-blue flex items-center justify-center gap-2 group duration-300"
                      onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
                          setShowSuggestions(false);
                      }}
                    >
                      View all results <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
            <button 
               className="group flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity"
               onClick={() => navigate(user ? '/profile' : '/login')}
            >
              <div className="bg-gray-50 text-gray-600 p-3 rounded-full group-hover:bg-simba-blue group-hover:text-white transition-all shadow-sm border border-transparent group-hover:border-blue-200 duration-300">
                <User size={22} strokeWidth={2} />
              </div>
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-simba-blue transition-colors">Account</span>
                <span className="text-sm font-bold text-gray-900 max-w-[100px] truncate">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </div>
            </button>

            <button 
              className="group flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity"
              onClick={() => navigate('/cart')}
            >
              <div className="relative bg-orange-50 text-simba-orange p-3 rounded-full group-hover:bg-simba-orange group-hover:text-white transition-all shadow-sm border border-orange-100 group-hover:border-orange-300 duration-300">
                <ShoppingCart size={22} strokeWidth={2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-white animate-bounce-subtle shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-simba-orange transition-colors">My Cart</span>
                <span className="text-sm font-bold text-gray-900">
                  {cartTotal.toLocaleString()} RWF
                </span>
              </div>
            </button>
          </div>
          
          {/* Mobile Cart & Search Icons */}
          <div className="flex items-center gap-2 lg:hidden">
             <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gray-800 hover:text-simba-orange transition-colors">
               <Search size={26} strokeWidth={2} />
             </button>
             <button 
                className="relative text-gray-800 p-2 hover:text-simba-orange transition-colors"
                onClick={() => navigate('/cart')}
              >
              <ShoppingCart size={26} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-simba-orange text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tier 3: Category Nav - Desktop Only - Smooth Collapse */}
        <div 
          className={`hidden lg:block border-t border-gray-100 bg-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100'}`}
        >
          <div className="container mx-auto px-8 h-full flex items-center">
            <button 
              onClick={() => navigate('/catalog')}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-simba-orange transition-all duration-300 text-xs font-bold uppercase tracking-wide shadow-md hover:shadow-lg mr-6 active:scale-95"
            >
              <Grid size={14} /> All Departments
            </button>
            
            <ul className="flex items-center gap-1 h-full flex-grow">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/catalog?category=${cat.slug}`} 
                    className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-gray-600 hover:text-simba-orange hover:bg-orange-50 transition-all duration-300"
                  >
                    {cat.name} 
                  </Link>
                </li>
              ))}
              <li>
                 <Link 
                   to="/catalog" 
                   className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                 >
                   More <ChevronDown size={14}/>
                 </Link>
              </li>
            </ul>

            <Link 
              to="/catalog?flash=true" 
              className="flex items-center gap-2 text-simba-orange font-bold px-4 py-2 rounded-full hover:bg-orange-50 transition-all text-xs uppercase tracking-wide border border-orange-100 hover:border-simba-orange shadow-sm hover:shadow-orange-100 ml-auto"
            >
              <Zap size={14} fill="currentColor" className="animate-pulse"/> Flash Sales
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with refined transitions */}
      <div 
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'}`}
      >
         {/* Backdrop */}
         <div 
           className={`absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
           onClick={() => setIsMenuOpen(false)}
         ></div>
         
         {/* Drawer */}
         <div 
           className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
         >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 safe-top">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-simba-orange to-orange-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-orange-500/20">🦁</div>
                  <div className="flex flex-col leading-none">
                     <span className="font-black text-gray-900 text-xl tracking-tight">SIMBA</span>
                     <span className="text-[9px] font-bold text-simba-blue tracking-[0.25em] uppercase">Market</span>
                  </div>
               </div>
               <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-sm border border-gray-100 transition-all active:scale-90">
                  <X size={20} />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
               {/* Search in Menu */}
               <div className="p-6 pb-2 sticky top-0 bg-white z-10">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search essentials..."
                      className="w-full bg-gray-50 border-transparent rounded-2xl py-3.5 px-5 pl-12 text-base focus:ring-2 focus:ring-simba-orange/20 focus:bg-white focus:border-simba-orange transition-all font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
                  </form>
               </div>

               {/* Quick Actions Grid */}
               <div className="grid grid-cols-2 gap-3 px-6 py-4">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-2xl hover:bg-blue-50 hover:text-simba-blue transition border border-gray-100 group">
                     <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform"><User size={22} className="text-gray-500 group-hover:text-simba-blue" /></div>
                     <span className="text-xs font-bold text-gray-700 group-hover:text-simba-blue">Profile</span>
                  </Link>
                  <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-2xl hover:bg-orange-50 hover:text-simba-orange transition border border-gray-100 group">
                     <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform"><Truck size={22} className="text-gray-500 group-hover:text-simba-orange" /></div>
                     <span className="text-xs font-bold text-gray-700 group-hover:text-simba-orange">Orders</span>
                  </Link>
                  <Link to="/loyalty" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-2xl hover:bg-yellow-50 hover:text-yellow-600 transition border border-gray-100 group">
                     <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform"><Award size={22} className="text-gray-500 group-hover:text-yellow-500" /></div>
                     <span className="text-xs font-bold text-gray-700 group-hover:text-yellow-600">Rewards</span>
                  </Link>
                  <Link to="/support" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-2xl hover:bg-purple-50 hover:text-purple-600 transition border border-gray-100 group">
                     <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform"><HelpCircle size={22} className="text-gray-500 group-hover:text-purple-500" /></div>
                     <span className="text-xs font-bold text-gray-700 group-hover:text-purple-600">Support</span>
                  </Link>
               </div>

               <div className="h-2 bg-gray-50 my-2"></div>

               {/* Categories List */}
               <div className="px-6 py-4">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Departments</h3>
                    <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-simba-orange hover:bg-orange-50 px-3 py-1 rounded-full transition-colors">View All</Link>
                  </div>
                  <div className="space-y-1.5">
                    {CATEGORIES.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/catalog?category=${cat.slug}`}
                        className="flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-simba-orange transition-all group active:scale-[0.98]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="flex items-center gap-4">
                           <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-simba-orange group-hover:shadow-sm transition-all">
                              <Grid size={18}/>
                           </div>
                           {cat.name}
                        </span>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-simba-orange transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
               </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
               <div className="flex items-center gap-4 mb-5">
                  <div className="bg-white p-3 rounded-full text-simba-orange shadow-sm border border-orange-100">
                     <Phone size={20} />
                  </div>
                  <div>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Customer Support</p>
                     <p className="text-sm font-bold text-gray-900">+250 788 123 456</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <Link 
                   to="/branches"
                   onClick={() => setIsMenuOpen(false)}
                   className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm"
                 >
                   Locations
                 </Link>
                 <button 
                   onClick={() => {
                     // logout logic here if needed
                     navigate('/');
                     setIsMenuOpen(false);
                   }}
                   className="flex items-center justify-center gap-2 py-3 bg-gray-900 border border-gray-900 rounded-xl text-sm font-bold text-white hover:bg-gray-800 transition shadow-lg"
                 >
                   Log Out
                 </button>
               </div>
            </div>
         </div>
      </div>

      {/* Mobile Bottom Navigation - Sticky */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] px-6 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-all">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-colors p-2 ${isActive('/') ? 'text-simba-orange' : 'text-gray-400'}`}>
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/catalog" className={`flex flex-col items-center gap-1 transition-colors p-2 ${isActive('/catalog') ? 'text-simba-orange' : 'text-gray-400'}`}>
          <Grid size={22} strokeWidth={isActive('/catalog') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Catalog</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center gap-1 relative transition-colors p-2 ${isActive('/cart') ? 'text-simba-orange' : 'text-gray-400'}`}>
          <div className="relative">
            <ShoppingCart size={22} strokeWidth={isActive('/cart') ? 2.5 : 2} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-simba-orange text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce-subtle border border-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors p-2 ${isActive('/profile') ? 'text-simba-orange' : 'text-gray-400'}`}>
          <User size={22} strokeWidth={isActive('/profile') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </>
  );
};