import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../App';

export const FloatingCartButton: React.FC = () => {
  const { cart } = useAppContext();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed z-[60] bottom-24 right-4 md:bottom-8 md:right-8 bg-simba-orange text-white p-3.5 rounded-full shadow-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white ring-4 ring-orange-50 animate-fade-in"
      aria-label="View Cart"
    >
      <ShoppingCart size={22} strokeWidth={2.5} />
      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        {totalItems}
      </span>
    </button>
  );
};