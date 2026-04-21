import { MouseEvent, FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../App';
import { getOptimizedImage, getSrcSet } from '../utils/image';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative block bg-white rounded-xl md:rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-transparent hover:border-gray-100 flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 flex flex-col gap-1.5 md:gap-2">
        {discountPercentage > 0 && (
          <span className="bg-simba-orange text-white text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90">
            -{discountPercentage}%
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shadow-sm flex items-center gap-1">
            ⚡ Flash
          </span>
        )}
      </div>

      {/* Image Area - Full Bleed */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={getOptimizedImage(product.image, 600)} 
          srcSet={getSrcSet(product.image)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        
        {/* Quick Add Button (Visible on Hover/Mobile) */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-white text-simba-orange p-3 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 hover:bg-simba-orange hover:text-white active:scale-95 touch-manipulation z-20 border border-gray-100"
          aria-label="Quick add to cart"
        >
          <Plus size={20} strokeWidth={3} className="w-5 h-5 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-4 flex flex-col flex-grow">
        <div className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 truncate">{product.category}</div>
        <h3 className="font-semibold text-gray-800 text-xs md:text-base leading-tight line-clamp-2 mb-2 group-hover:text-simba-orange transition-colors min-h-[2.5em]">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-auto">
          <Star size={10} className="md:w-3 md:h-3 text-yellow-400 fill-current" />
          <span className="text-[10px] md:text-xs font-bold text-gray-700 ml-1">{product.rating || 4.5}</span>
          <span className="text-[10px] md:text-xs text-gray-400 ml-1">({product.reviews || 0})</span>
        </div>

        {/* Price Section */}
        <div className="flex flex-wrap items-baseline gap-1 md:gap-2 mt-2 md:mt-3">
          <span className="text-base md:text-xl font-extrabold text-simba-dark">
            {product.price.toLocaleString()} <span className="text-lg md:text-xs font-normal text-gray-500">RWF</span>
          </span>
          {product.oldPrice && (
            <span className="text-[10px] md:text-xs text-gray-400 line-through decoration-red-400">
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});