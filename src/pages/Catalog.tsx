import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List, X, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const flashParam = searchParams.get('flash');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Lock scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFilterOpen]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (flashParam) {
      result = result.filter(p => p.isFlashSale || p.oldPrice);
    }

    if (selectedCategory && selectedCategory !== 'All') {
      const catObj = CATEGORIES.find(c => c.slug === selectedCategory);
      const catName = catObj ? catObj.name : selectedCategory;
      result = result.filter(p => p.category === catName || p.category.toLowerCase().replace(' ', '-') === selectedCategory);
    }

    if (searchParam) {
      const lowerSearch = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.category.toLowerCase().includes(lowerSearch) ||
        p.brand.toLowerCase().includes(lowerSearch)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchParam, priceRange, sortBy, flashParam]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 truncate">
          {searchParam ? `Results for "${searchParam}"` : (flashParam ? "Flash Sales" : "All Products")}
        </h1>
        <p className="text-gray-500 text-sm">Showing {filteredProducts.length} results</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-36">
            <h3 className="font-bold text-lg mb-4 text-simba-dark">Categories</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'All' ? 'bg-orange-50 text-simba-orange font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                All Categories {selectedCategory === 'All' && <Check size={16}/>}
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-orange-50 text-simba-orange font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat.name} {selectedCategory === cat.slug && <Check size={16}/>}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
               <h3 className="font-bold text-lg mb-4 text-simba-dark">Price Range</h3>
               <input 
                 type="range" 
                 min="0" 
                 max="50000" 
                 step="1000"
                 value={priceRange[1]}
                 onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                 className="w-full accent-simba-orange h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
               <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                 <span>0</span>
                 <span>{priceRange[1].toLocaleString()} RWF</span>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle & Sort */}
        <div className="md:hidden flex gap-3 mb-4 sticky top-[110px] z-30 bg-gray-50/95 backdrop-blur-md py-3 -mx-4 px-4 border-b border-gray-200 shadow-sm transition-all">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 shadow-sm active:bg-gray-50 active:scale-95 transition-transform"
          >
            <Filter size={18} /> Filters
          </button>
          <div className="flex-1 relative">
             <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 shadow-sm focus:outline-none focus:border-simba-orange"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
             <div className="absolute inset-x-0 bottom-0 top-16 bg-white rounded-t-3xl p-6 overflow-y-auto animate-fade-in-up shadow-2xl flex flex-col">
                 <div className="flex justify-between items-center mb-6 shrink-0">
                    <h3 className="text-2xl font-extrabold text-gray-900">Filter Products</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                       <X size={24} />
                    </button>
                 </div>

                 <div className="flex-grow space-y-8 overflow-y-auto pb-32">
                    <div>
                       <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2"><Filter size={16} /> Price Range</h4>
                       <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                         <div className="flex justify-between text-base font-bold text-gray-900 mb-6">
                           <span>0 RWF</span>
                           <span className="text-simba-orange">{priceRange[1].toLocaleString()} RWF</span>
                         </div>
                         <input 
                           type="range" 
                           min="0" 
                           max="50000" 
                           step="1000"
                           value={priceRange[1]}
                           onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                           className="w-full accent-simba-orange h-3 bg-gray-200 rounded-lg appearance-none"
                         />
                       </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2"><LayoutGrid size={16} /> Categories</h4>
                      <div className="grid grid-cols-2 gap-3">
                         <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`p-4 rounded-xl text-sm font-bold border text-center transition active:scale-95 ${selectedCategory === 'All' ? 'border-simba-orange text-simba-orange bg-orange-50' : 'border-gray-200 text-gray-600 bg-gray-50'}`}
                         >
                           All Categories
                         </button>
                         {CATEGORIES.map(cat => (
                            <button 
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.slug)}
                              className={`p-4 rounded-xl text-sm font-bold border text-center transition active:scale-95 ${selectedCategory === cat.slug ? 'border-simba-orange text-simba-orange bg-orange-50' : 'border-gray-200 text-gray-600 bg-gray-50'}`}
                            >
                              {cat.name}
                            </button>
                         ))}
                      </div>
                    </div>
                 </div>
                 
                 <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full bg-simba-orange text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition"
                    >
                      Show {filteredProducts.length} Results
                    </button>
                 </div>
             </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-grow">
          {/* Desktop Toolbar */}
          <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <div className="text-sm text-gray-500">
                Found <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
             </div>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-gray-400">
                  <LayoutGrid size={20} className="text-simba-orange" />
                  <List size={20} className="hover:text-gray-600 cursor-pointer"/>
               </div>
               <div className="h-6 w-px bg-gray-200"></div>
               <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer hover:text-simba-orange transition"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
               </div>
             </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="text-5xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md mx-auto px-4">We couldn't find matches for your search. Try adjusting your filters or checking for typos.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setPriceRange([0, 50000]); navigate('/catalog');}}
                className="mt-6 bg-simba-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};