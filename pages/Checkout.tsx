
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, MapPin, Truck, ChevronRight } from 'lucide-react';
import { useAppContext } from '../App';
import { getOptimizedImage, getThumbnailSrcSet } from '../utils/image';
import { Order, OrderStatus } from '../types';

export const Checkout: React.FC = () => {
  const { cart, placeOrder, user, showToast } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    phone: user?.phone || '',
    email: user?.email || '',
    zone: 'Kigali - Gasabo',
    address: '',
    paymentMethod: 'Mobile Money (MTN / Airtel)'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method: string) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    setCreatedOrderId(newOrderId);

    // Create Order Object
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: total,
      status: 'processing',
      items: [...cart],
      deliveryAddress: `${formData.address}, ${formData.zone}`,
      paymentMethod: formData.paymentMethod,
      trackingHistory: [
        { status: 'processing', label: 'Order Placed', date: 'Just now', completed: true, description: 'We have received your order.' },
        { status: 'shipped', label: 'Shipped', date: '', completed: false },
        { status: 'out-for-delivery', label: 'Out for Delivery', date: '', completed: false },
        { status: 'delivered', label: 'Delivered', date: '', completed: false }
      ],
      estimatedDelivery: 'Today, within 2 hours'
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      placeOrder(newOrder);
      setStep(3);
      window.scrollTo(0,0);
      showToast('Order placed successfully!');
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Cart is empty</h2>
        <button onClick={() => navigate('/catalog')} className="text-simba-orange hover:underline font-bold">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Modern Progress Steps */}
      <div className="mb-8 md:mb-12">
         <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-xs md:text-sm border-4 transition-colors ${step >= 1 ? 'bg-simba-orange border-white text-white shadow' : 'bg-gray-200 border-white text-gray-500'}`}>1</div>
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-xs md:text-sm border-4 transition-colors ${step >= 2 ? 'bg-simba-orange border-white text-white shadow' : 'bg-gray-200 border-white text-gray-500'}`}>2</div>
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-xs md:text-sm border-4 transition-colors ${step >= 3 ? 'bg-simba-orange border-white text-white shadow' : 'bg-gray-200 border-white text-gray-500'}`}>3</div>
         </div>
         <div className="flex justify-between max-w-2xl mx-auto mt-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide px-2">
            <span className={step >= 1 ? 'text-simba-dark' : 'invisible'}>Shipping</span>
            <span className={step >= 2 ? 'text-simba-dark' : 'invisible'}>Payment</span>
            <span className={step >= 3 ? 'text-simba-dark' : 'invisible'}>Confirm</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2">
           {step === 1 && (
            <form id="shipping-form" onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-4 text-gray-900"><MapPin className="text-simba-orange" /> Delivery Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                   <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange text-base md:text-sm" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                   <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange text-base md:text-sm" />
                </div>
              </div>
              
              <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                   <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="078..." className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange text-base md:text-sm" />
              </div>
              
              <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                   <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange text-base md:text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Zone</label>
                <select name="zone" value={formData.zone} onChange={handleInputChange} className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:border-simba-orange text-base md:text-sm appearance-none">
                  <option>Kigali - Gasabo</option>
                  <option>Kigali - Kicukiro</option>
                  <option>Kigali - Nyarugenge</option>
                </select>
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Address Instructions</label>
                 <textarea required name="address" value={formData.address} onChange={handleInputChange} placeholder="House number, nearby landmark..." className="bg-gray-50 border border-gray-200 p-3 rounded-lg w-full h-24 focus:outline-none focus:border-simba-orange text-base md:text-sm"></textarea>
              </div>
            </form>
          )}

          {step === 2 && (
            <form id="payment-form" onSubmit={handleSubmitOrder} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2"><CreditCard className="text-simba-orange" /> Payment Method</h2>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-4 border p-4 rounded-xl cursor-pointer hover:border-simba-orange transition bg-gray-50 hover:bg-white shadow-sm group">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-5 h-5 accent-simba-orange flex-shrink-0" 
                    checked={formData.paymentMethod === 'Mobile Money (MTN / Airtel)'} 
                    onChange={() => handlePaymentChange('Mobile Money (MTN / Airtel)')}
                  />
                  <div className="flex-grow">
                    <div className="font-bold text-gray-900 text-sm md:text-base">Mobile Money (MTN / Airtel)</div>
                    <div className="text-xs md:text-sm text-gray-500">Pay securely with your phone. Prompt will be sent.</div>
                  </div>
                  <div className="text-2xl grayscale group-hover:grayscale-0 transition hidden sm:block">📱</div>
                </label>
                
                <label className="flex items-center gap-4 border p-4 rounded-xl cursor-pointer hover:border-simba-orange transition bg-gray-50 hover:bg-white shadow-sm group">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-5 h-5 accent-simba-orange flex-shrink-0" 
                    checked={formData.paymentMethod === 'Credit / Debit Card'} 
                    onChange={() => handlePaymentChange('Credit / Debit Card')}
                  />
                  <div className="flex-grow">
                    <div className="font-bold text-gray-900 text-sm md:text-base">Credit / Debit Card</div>
                    <div className="text-xs md:text-sm text-gray-500">Visa / Mastercard via Flutterwave</div>
                  </div>
                  <div className="text-2xl grayscale group-hover:grayscale-0 transition hidden sm:block">💳</div>
                </label>

                <label className="flex items-center gap-4 border p-4 rounded-xl cursor-pointer hover:border-simba-orange transition bg-gray-50 hover:bg-white shadow-sm group">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-5 h-5 accent-simba-orange flex-shrink-0" 
                    checked={formData.paymentMethod === 'Cash on Delivery'} 
                    onChange={() => handlePaymentChange('Cash on Delivery')}
                  />
                  <div className="flex-grow">
                    <div className="font-bold text-gray-900 text-sm md:text-base">Cash on Delivery</div>
                    <div className="text-xs md:text-sm text-gray-500">Pay when your order arrives</div>
                  </div>
                  <div className="text-2xl grayscale group-hover:grayscale-0 transition hidden sm:block">💵</div>
                </label>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center animate-fade-in-up">
              <div className="bg-green-100 text-green-600 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-xl animate-bounce">
                <CheckCircle size={40} className="md:w-12 md:h-12" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">Order Confirmed!</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                Thank you for shopping with Simba. Your order <span className="font-mono font-bold text-simba-dark">#{createdOrderId}</span> has been placed successfully.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left border border-gray-200 max-w-sm mx-auto">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-simba-dark text-sm"><Truck size={18} className="text-simba-blue"/> Delivery Status</h4>
                <div className="relative pt-6 pb-2">
                   <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-simba-orange h-2 rounded-full w-1/4 relative">
                       <div className="absolute -right-2 -top-1 w-4 h-4 bg-simba-orange rounded-full shadow border-2 border-white"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400">
                     <span className="text-simba-orange">Processing</span>
                     <span>Shipped</span>
                     <span>Delivered</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate(`/order-tracking/${createdOrderId}`)} className="w-full sm:w-auto bg-gray-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gray-800 shadow-lg transition">
                  Track Order
                </button>
                <button onClick={() => navigate('/')} className="w-full sm:w-auto bg-simba-orange text-white font-bold py-3 px-10 rounded-full hover:bg-orange-600 shadow-lg hover:shadow-orange-200 transition">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        {step !== 3 && (
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg lg:sticky lg:top-24">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 max-h-60 lg:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3 text-sm border-b border-gray-50 pb-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 p-1">
                     <img 
                      src={getOptimizedImage(item.product.image, 100)} 
                      srcSet={getThumbnailSrcSet(item.product.image, 50)}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply" 
                      loading="lazy"
                      decoding="async"
                     />
                  </div>
                  <div className="flex-grow min-w-0">
                     <div className="font-medium text-gray-800 line-clamp-1">{item.product.name}</div>
                     <div className="text-gray-500 text-xs">Qty: {item.quantity}</div>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">Free</span> : `${deliveryFee.toLocaleString()} RWF`}</span>
              </div>
              <div className="flex justify-between text-lg md:text-xl font-extrabold text-simba-orange pt-2">
                <span>Total</span>
                <span>{total.toLocaleString()} RWF</span>
              </div>
            </div>

            {step === 1 && (
               <button form="shipping-form" type="submit" className="w-full bg-simba-orange text-white font-bold py-3 mt-6 rounded-xl hover:bg-orange-600 shadow-lg transition flex justify-center items-center gap-2 text-sm md:text-base">
                 Proceed to Payment <ChevronRight size={18} />
               </button>
            )}
             {step === 2 && (
               <button form="payment-form" type="submit" disabled={loading} className="w-full bg-simba-orange text-white font-bold py-3 mt-6 rounded-xl hover:bg-orange-600 shadow-lg transition flex justify-center items-center gap-2 text-sm md:text-base">
                 {loading ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span> : `Pay ${total.toLocaleString()} RWF`}
               </button>
            )}
          </div>
        </div>
        )}

      </div>
    </div>
  );
};
