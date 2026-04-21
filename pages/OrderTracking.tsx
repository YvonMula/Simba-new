
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, MapPin, Truck, Phone, MessageSquare, CreditCard } from 'lucide-react';
import { useAppContext } from '../App';
import { getOptimizedImage, getThumbnailSrcSet } from '../utils/image';

export const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useAppContext();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <p className="text-gray-500 mb-6">We couldn't find order #{id}. Please check the ID and try again.</p>
        <button onClick={() => navigate('/profile')} className="text-white bg-simba-orange px-6 py-2 rounded-full font-bold">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate('/profile')} 
        className="flex items-center gap-2 text-gray-500 hover:text-simba-orange mb-6 font-medium transition"
      >
        <ArrowLeft size={20} /> Back to Orders
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Main Tracking Panel */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Track Order</h1>
                  <p className="text-gray-500 font-medium">Order ID: <span className="text-gray-900">{order.id}</span></p>
               </div>
               {order.estimatedDelivery && (
                 <div className="text-right">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Estimated Arrival</div>
                    <div className="text-simba-orange font-bold text-lg">{order.estimatedDelivery}</div>
                 </div>
               )}
            </div>

            {/* Timeline */}
            <div className="relative pl-4 space-y-8 before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
               {order.trackingHistory.map((step, index) => (
                  <div key={index} className="relative flex gap-4 md:gap-6">
                     <div className={`z-10 flex items-center justify-center w-6 h-6 rounded-full border-4 flex-shrink-0 ${step.completed ? 'bg-simba-orange border-orange-100' : 'bg-gray-200 border-white'}`}>
                        {step.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                     </div>
                     <div className={`flex-grow ${!step.completed ? 'opacity-50' : ''}`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                           <h4 className="font-bold text-gray-900 text-sm md:text-base">{step.label}</h4>
                           <span className="text-xs font-bold text-gray-400">{step.date}</span>
                        </div>
                        {step.description && (
                           <p className="text-xs md:text-sm text-gray-500 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block">
                             {step.description}
                           </p>
                        )}
                     </div>
                  </div>
               ))}
            </div>
          </div>
          
          {/* Active Rider Info (Conditional) */}
          {order.status === 'out-for-delivery' && (
             <div className="bg-simba-blue bg-opacity-5 rounded-2xl border border-blue-100 p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow flex-shrink-0">
                   <img 
                     src="https://randomuser.me/api/portraits/men/32.jpg" 
                     className="w-full h-full object-cover" 
                     alt="Driver" 
                     loading="lazy"
                     decoding="async"
                   />
                </div>
                <div className="flex-grow">
                   <h4 className="font-bold text-gray-900 text-sm md:text-base">Jean Paul (Rider)</h4>
                   <p className="text-xs md:text-sm text-gray-500">Is on the way with your order</p>
                </div>
                <div className="flex gap-2">
                   <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-simba-blue shadow-sm hover:bg-blue-50">
                      <Phone size={18} />
                   </button>
                   <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-simba-blue shadow-sm hover:bg-blue-50">
                      <MessageSquare size={18} />
                   </button>
                </div>
             </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">Order Items</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                 {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                       <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 p-1">
                          <img 
                            src={getOptimizedImage(item.product.image, 100)} 
                            srcSet={getThumbnailSrcSet(item.product.image, 50)}
                            className="w-full h-full object-contain mix-blend-multiply" 
                            loading="lazy"
                            decoding="async"
                          />
                       </div>
                       <div className="min-w-0">
                          <div className="text-sm font-bold text-gray-800 line-clamp-1">{item.product.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity} x {item.product.price.toLocaleString()}</div>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center font-bold">
                 <span>Total</span>
                 <span className="text-simba-orange">{order.total.toLocaleString()} RWF</span>
              </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">Delivery Details</h3>
              <div className="space-y-4 text-sm">
                 <div className="flex gap-3">
                    <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">{order.deliveryAddress}</p>
                 </div>
                 <div className="flex gap-3">
                    <CreditCard size={18} className="text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">Paid via {order.paymentMethod}</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
