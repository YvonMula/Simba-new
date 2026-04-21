import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../App';
import { getOptimizedImage, getThumbnailSrcSet } from '../utils/image';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();
  const navigate = useNavigate();

  const { subtotal, total, deliveryFee } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const fee = sub > 50000 ? 0 : 2000;
    return { subtotal: sub, deliveryFee: fee, total: sub + fee };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="bg-orange-50 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-simba-orange">
          <Trash2 size={40} className="md:w-12 md:h-12" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-base md:text-lg px-4">Looks like you haven't added anything to your cart yet. Browse our categories to find amazing deals.</p>
        <Link 
          to="/catalog" 
          className="bg-simba-orange text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full hover:bg-orange-600 transition shadow-lg inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-gray-900">Shopping Cart <span className="text-base md:text-lg font-normal text-gray-500 ml-2">({cart.length} items)</span></h1>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        {/* Cart Items List */}
        <div className="flex-grow space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-start gap-4 hover:border-gray-200 transition-colors">
              
              {/* Thumbnail Image */}
              <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden p-2 border border-gray-200 shadow-sm self-center md:self-start">
                <img 
                  src={getOptimizedImage(item.product.image, 150)} 
                  srcSet={getThumbnailSrcSet(item.product.image, 150)}
                  alt={item.product.name} 
                  className="w-full h-full object-contain mix-blend-multiply"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Details & Controls Combined for Mobile */}
              <div className="flex-grow min-w-0 flex flex-col justify-between h-full min-h-[5rem]">
                 <div className="flex justify-between items-start gap-2">
                    <div>
                       <h3 className="font-bold text-gray-900 text-sm md:text-lg mb-1 line-clamp-2 leading-tight">{item.product.name}</h3>
                       <p className="text-xs md:text-sm text-gray-500 mb-1">{item.product.weight || 'Unit'} | {item.product.brand}</p>
                    </div>
                    {/* Desktop Price */}
                    <div className="text-simba-orange font-bold text-lg hidden md:block whitespace-nowrap">{item.product.price.toLocaleString()} RWF</div>
                 </div>

                 <div className="flex justify-between items-end mt-2 md:mt-4">
                    {/* Price on Mobile */}
                    <div className="text-simba-orange font-extrabold text-sm md:hidden">{item.product.price.toLocaleString()} RWF</div>

                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Quantity Controls - Optimized for Touch */}
                        <div className="flex items-center border border-gray-200 rounded-lg h-10 bg-gray-50 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-10 h-full flex items-center justify-center hover:text-simba-orange transition active:bg-gray-200 rounded-l-lg touch-manipulation"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} className="md:w-4 md:h-4" />
                          </button>
                          <span className="w-10 text-center text-sm md:text-base font-bold bg-white h-full flex items-center justify-center border-x border-gray-200">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-10 h-full flex items-center justify-center hover:text-simba-orange transition active:bg-gray-200 rounded-r-lg touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} className="md:w-4 md:h-4" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition shadow-sm border border-red-100 active:scale-95"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                 </div>
              </div>
            </div>
          ))}
          
          <button onClick={() => navigate('/catalog')} className="flex items-center gap-2 text-simba-blue font-bold mt-6 hover:underline text-sm md:text-base px-2">
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </div>

        {/* Order Summary - Sticky on Desktop, Static on Mobile */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl lg:sticky lg:top-40">
            <h2 className="text-xl font-bold mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-100">Order Summary</h2>
            
            {/* Added: Mini Items List for Summary */}
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto custom-scrollbar pr-1 hidden lg:block">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                   <div className="w-10 h-10 bg-gray-50 rounded-lg flex-shrink-0 p-0.5 border border-gray-100">
                      <img 
                        src={getOptimizedImage(item.product.image, 100)} 
                        srcSet={getThumbnailSrcSet(item.product.image, 50)}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply" 
                        loading="lazy"
                      />
                   </div>
                   <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold text-gray-700 truncate">{item.product.name}</div>
                      <div className="text-[10px] text-gray-500">Qty: {item.quantity}</div>
                   </div>
                   <div className="text-xs font-bold text-gray-900">{(item.product.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 md:space-y-4 text-gray-600 text-sm mb-6 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{subtotal.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">Free</span> : `${deliveryFee.toLocaleString()} RWF`}</span>
              </div>
              {deliveryFee > 0 && (
                 <div className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg border border-gray-100">Add {(50000 - subtotal).toLocaleString()} RWF more for free shipping.</div>
              )}
            </div>

            <div className="flex justify-between font-extrabold text-xl md:text-2xl text-gray-900 border-t border-gray-100 pt-6 mb-8">
              <span>Total</span>
              <span className="text-simba-orange">{total.toLocaleString()} RWF</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-simba-orange text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition shadow-lg hover:shadow-orange-200 active:scale-[0.98] text-base"
            >
              Proceed to Checkout
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-6 bg-gray-50 py-3 rounded-lg">
              <ShieldCheck size={14} /> Secure SSL Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};