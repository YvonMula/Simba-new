import { useState, FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, MapPin, Truck } from 'lucide-react';

export const TrackOrder: FC = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/order-tracking/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
        <div className="w-20 h-20 bg-orange-50 text-simba-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Truck size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Track Your Order</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Enter your Order ID sent to your email or phone to see the current status of your shipment.
        </p>

        <form onSubmit={handleTrack} className="relative mb-8">
          <input 
            type="text" 
            placeholder="e.g. ORD-7829-XJ" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-simba-orange/20 focus:border-simba-orange transition text-lg font-medium placeholder:text-gray-400"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 bg-simba-orange text-white px-6 rounded-lg font-bold hover:bg-orange-600 transition shadow-md flex items-center gap-2"
          >
            Track
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4 text-left text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-simba-blue"/>
            <span>Real-time delivery updates</span>
          </div>
          <div className="flex items-start gap-2">
            <Search size={16} className="mt-0.5 text-simba-blue"/>
            <span>Detailed shipment history</span>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-sm">
        Having trouble? <a href="/help" className="text-simba-orange hover:underline font-bold">Contact Support</a>
      </p>
    </div>
  );
};