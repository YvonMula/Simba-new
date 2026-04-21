
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, MapPin, Settings, LogOut, ChevronRight, 
  Clock, Truck, CheckCircle, AlertCircle, Search, 
  LayoutDashboard, CreditCard, Smartphone, Home, Briefcase, 
  Plus, Edit2, Trash2, Shield, Bell, Lock, Wallet, XCircle,
  ChevronDown, ChevronUp, Heart, X
} from 'lucide-react';
import { useAppContext } from '../App';
import { PRODUCTS } from '../constants';
import { OrderStatus, Address } from '../types';
import { getOptimizedImage, getThumbnailSrcSet } from '../utils/image';

export const Profile: React.FC = () => {
  const { user, logout, orders, addresses, addAddress, removeAddress, wishlist, toggleWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wallet' | 'addresses' | 'settings' | 'wishlist'>('overview');
  const [orderFilter, setOrderFilter] = useState<'active' | 'history'>('active');
  const [trackIdInput, setTrackIdInput] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '', area: '', phone: '', instructions: '' });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <User size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>
        <p className="text-gray-500 mb-8">View orders, track shipments, and manage your addresses.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-simba-orange text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition w-full mb-4"
        >
          Sign In
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="text-simba-orange font-bold hover:underline"
        >
          Create an Account
        </button>
      </div>
    );
  }

  // --- Derived Data ---
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const loyaltyPoints = Math.floor(totalSpent / 100); 
  const recentOrder = orders[0];

  const displayedOrders = orderFilter === 'active' ? activeOrders : pastOrders;
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const paymentMethods = [
    { id: 1, type: 'MOMO', provider: 'MTN Mobile Money', number: '078 ••• ••• 45', icon: Smartphone, color: 'text-yellow-600 bg-yellow-50' },
    { id: 2, type: 'CARD', provider: 'Visa', number: '•••• •••• •••• 4242', icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
  ];

  // --- Helpers ---
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'out-for-delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addr: Address = {
      id: `addr_${Date.now()}`,
      recipient: user.name,
      phone: newAddress.phone || user.phone,
      label: newAddress.label || 'Home',
      address: newAddress.address,
      area: newAddress.area,
      instructions: newAddress.instructions,
      isDefault: addresses.length === 0
    };
    addAddress(addr);
    setShowAddressForm(false);
    setNewAddress({ label: '', address: '', area: '', phone: '', instructions: '' });
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: Package, count: activeOrders.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'wallet', label: 'My Wallet', icon: Wallet },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // --- Render Sections ---

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Orders</div>
          <div className="text-3xl font-extrabold text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div className="text-gray-500 text-sm font-medium mb-1">Total Spent</div>
           <div className="text-3xl font-extrabold text-simba-orange">{totalSpent.toLocaleString()} <span className="text-sm text-gray-400 font-normal">RWF</span></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-8 -mt-8"></div>
           <div className="text-gray-500 text-sm font-medium mb-1">Loyalty Points</div>
           <div className="text-3xl font-extrabold text-simba-dark flex items-center gap-2">
             {loyaltyPoints.toLocaleString()} <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">GOLD</span>
           </div>
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mt-8">Recent Activity</h3>
      {recentOrder ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm hover:shadow-md transition">
           <div className="flex-grow w-full">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="font-mono font-bold text-lg">{recentOrder.id}</span>
                 <span className={`text-xs font-bold px-2 py-1 rounded-md ${getStatusColor(recentOrder.status)}`}>
                   {getStatusLabel(recentOrder.status)}
                 </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Ordered on {recentOrder.date} • {recentOrder.items.length} Items</p>
              <div className="flex -space-x-3 overflow-hidden">
                 {recentOrder.items.slice(0,4).map((item, i) => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 overflow-hidden">
                      <img src={getOptimizedImage(item.product.image, 100)} className="w-full h-full object-cover" />
                   </div>
                 ))}
                 {recentOrder.items.length > 4 && (
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                     +{recentOrder.items.length - 4}
                   </div>
                 )}
              </div>
           </div>
           <div className="w-full md:w-auto flex flex-col gap-2">
              <button onClick={() => navigate(`/order-tracking/${recentOrder.id}`)} className="bg-simba-orange text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition w-full md:w-auto text-sm">
                Track Order
              </button>
              <button 
                onClick={() => { setActiveTab('orders'); setOrderFilter('active'); }}
                className="bg-white border border-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl hover:bg-gray-50 transition w-full md:w-auto text-sm"
              >
                View All Orders
              </button>
           </div>
        </div>
      ) : (
        <div className="text-gray-500 italic">No recent orders found.</div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-900">My Wishlist ({wishlist.length})</h2>
        {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistProducts.map(product => (
                    <div key={product.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm relative group">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg p-1">
                            <img src={getOptimizedImage(product.image, 150)} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                            <div className="font-bold text-simba-orange">{product.price.toLocaleString()} RWF</div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <button onClick={() => toggleWishlist(product.id)} className="text-red-500 hover:text-red-600 p-1">
                                <Trash2 size={18} />
                            </button>
                            <button onClick={() => addToCart(product)} className="bg-simba-dark text-white p-2 rounded-lg hover:bg-simba-orange transition">
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Heart size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your wishlist is empty.</p>
                <button onClick={() => navigate('/catalog')} className="mt-4 text-simba-orange font-bold">Start Shopping</button>
            </div>
        )}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6 animate-fade-in relative">
      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Add New Address</h3>
                    <button onClick={() => setShowAddressForm(false)}><X size={20} className="text-gray-500"/></button>
                </div>
                <form onSubmit={handleAddAddress} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Label (e.g., Home, Work)</label>
                        <input required type="text" className="w-full border rounded-lg p-3 bg-gray-50" value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Address / Street</label>
                        <input required type="text" className="w-full border rounded-lg p-3 bg-gray-50" value={newAddress.address} onChange={e => setNewAddress({...newAddress, address: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Area / Sector</label>
                            <input required type="text" className="w-full border rounded-lg p-3 bg-gray-50" value={newAddress.area} onChange={e => setNewAddress({...newAddress, area: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                            <input required type="tel" className="w-full border rounded-lg p-3 bg-gray-50" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-simba-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition">Save Address</button>
                </form>
            </div>
        </div>
      )}

      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
         <button onClick={() => setShowAddressForm(true)} className="flex items-center gap-2 text-sm font-bold text-simba-orange hover:bg-orange-50 px-4 py-2 rounded-lg transition">
           <Plus size={18} /> Add New
         </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {addresses.length > 0 ? addresses.map((addr) => (
          <div key={addr.id} className={`p-6 rounded-2xl border-2 transition relative group ${addr.isDefault ? 'border-simba-orange bg-orange-50/10' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
             {addr.isDefault && (
               <span className="absolute top-4 right-4 bg-simba-orange text-white text-[10px] font-bold px-2 py-1 rounded-full">DEFAULT</span>
             )}
             <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${addr.isDefault ? 'bg-orange-100 text-simba-orange' : 'bg-gray-100 text-gray-500'}`}>
                   <MapPin size={20} />
                </div>
                <div>
                   <div className="font-bold text-gray-900">{addr.label}</div>
                   <div className="text-xs text-gray-500">{addr.recipient}</div>
                </div>
             </div>
             <div className="space-y-1 text-sm text-gray-600 mb-6">
                <p>{addr.address}</p>
                <p>{addr.area}</p>
                <p>{addr.phone}</p>
             </div>
             <div className="flex gap-3 border-t border-gray-100 pt-4">
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-simba-blue transition">
                   <Edit2 size={14} /> Edit
                </button>
                <button onClick={() => removeAddress(addr.id)} className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition">
                   <Trash2 size={14} /> Delete
                </button>
             </div>
          </div>
        )) : (
            <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                No addresses saved. Add one to checkout faster.
            </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 text-sm">Track and manage your shipments</p>
          </div>
          <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto overflow-x-auto">
             <button 
               onClick={() => setOrderFilter('active')}
               className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${orderFilter === 'active' ? 'bg-white text-simba-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               Active Orders ({activeOrders.length})
             </button>
             <button 
               onClick={() => setOrderFilter('history')}
               className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${orderFilter === 'history' ? 'bg-white text-simba-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               Past Orders ({pastOrders.length})
             </button>
          </div>
       </div>

       {/* Quick Track Box */}
       {orderFilter === 'active' && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
             <div className="relative flex-grow w-full">
                <input 
                   type="text" 
                   value={trackIdInput}
                   onChange={(e) => setTrackIdInput(e.target.value)}
                   placeholder="Enter specific Order ID to track..."
                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:border-simba-orange text-sm"
                />
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
             </div>
             <button 
                onClick={() => { if(trackIdInput) navigate(`/order-tracking/${trackIdInput}`) }}
                className="w-full md:w-auto bg-gray-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-gray-800 transition text-sm"
             >
                Track
             </button>
          </div>
       )}

       <div className="space-y-6">
          {displayedOrders.length > 0 ? (
             displayedOrders.map(order => {
                const latestUpdate = order.trackingHistory.find(s => s.completed);
                const currentStepIndex = getStepIndex(order.status);
                const isCancelled = order.status === 'cancelled';
                const isDelivered = order.status === 'delivered';
                const isExpanded = expandedOrderId === order.id;
                
                const steps = [
                    { label: 'Placed', icon: Package },
                    { label: 'Processing', icon: Clock },
                    { label: 'Shipped', icon: Truck },
                    { label: 'Delivered', icon: CheckCircle }
                ];

                return (
                   <div key={order.id} className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${orderFilter === 'active' ? 'border-orange-100 shadow-lg shadow-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="p-5 md:p-6">
                         {/* Header */}
                         <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
                            <div>
                               <div className="flex flex-wrap items-center gap-3 mb-1">
                                  <span className="font-mono font-bold text-gray-900 text-base md:text-lg">{order.id}</span>
                                  <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                     {getStatusLabel(order.status)}
                                  </span>
                               </div>
                               <div className="text-xs md:text-sm text-gray-500">Placed on {order.date}</div>
                               
                               {/* Delivery Info */}
                               {!isCancelled && (
                                  <div className={`flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg w-fit border text-xs md:text-sm font-bold ${isDelivered ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-simba-orange border-orange-100'}`}>
                                     {isDelivered ? <CheckCircle size={16} /> : <Clock size={16} className={orderFilter === 'active' ? 'animate-pulse' : ''} />}
                                     {isDelivered 
                                        ? `Delivered on ${order.trackingHistory.find(h => h.status === 'delivered')?.date.split(',')[0] || order.date}`
                                        : `Est. Delivery: ${order.estimatedDelivery || 'Calculating...'}`
                                     }
                                  </div>
                               )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button 
                                   onClick={() => toggleOrderDetails(order.id)}
                                   className="bg-white hover:bg-gray-50 text-gray-700 font-bold px-4 py-2 rounded-lg border border-gray-200 transition text-sm flex items-center justify-center gap-2"
                                >
                                   {isExpanded ? 'Hide Updates' : 'Show Updates'} 
                                   {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                <button 
                                   onClick={() => navigate(`/order-tracking/${order.id}`)}
                                   className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold px-5 py-2 rounded-lg border border-gray-200 transition text-sm flex items-center justify-center gap-2"
                                >
                                   Full Details <ChevronRight size={16} />
                                </button>
                            </div>
                         </div>

                         {/* Visual Stepped Progress Bar */}
                         {!isCancelled ? (
                            <div className="relative flex justify-between items-center w-full mb-8 mt-6 px-2 md:px-6">
                                {/* Connecting Line background */}
                                <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-100 z-0"></div>
                                {/* Active Line */}
                                <div 
                                    className="absolute top-4 left-6 h-0.5 bg-simba-orange z-0 transition-all duration-700 ease-out"
                                    style={{ width: `calc(${Math.min((currentStepIndex / 3) * 100, 100)}% - 3rem)` }}
                                ></div>

                                {steps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;
                                    
                                    return (
                                        <div key={index} className="relative z-10 flex flex-col items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                isCompleted 
                                                    ? 'bg-simba-orange border-simba-orange text-white' 
                                                    : 'bg-white border-gray-200 text-gray-300'
                                            } ${isCurrent ? 'ring-4 ring-orange-100 scale-110' : ''}`}>
                                                <step.icon size={14} strokeWidth={3} />
                                            </div>
                                            <span className={`text-[9px] md:text-xs font-bold uppercase tracking-wide text-center ${
                                                isCompleted ? 'text-gray-900' : 'text-gray-300'
                                            }`}>{step.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                         ) : (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                                <XCircle size={24} />
                                <div>
                                    <div className="font-bold">Order Cancelled</div>
                                    <div className="text-xs">This order has been cancelled. Contact support for help.</div>
                                </div>
                            </div>
                         )}

                         {/* Expanded Shipment Updates */}
                         {isExpanded && !isCancelled && (
                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
                               <h4 className="font-bold text-gray-900 text-sm mb-4">Shipment Updates</h4>
                               <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                  {order.trackingHistory.length > 0 ? (
                                    order.trackingHistory.map((history, idx) => (
                                       <div key={idx} className="relative pl-6">
                                          <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${history.completed ? 'bg-simba-orange border-white shadow-sm' : 'bg-gray-200 border-white'}`}></div>
                                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                             <div>
                                                <div className={`font-bold text-sm ${history.completed ? 'text-gray-900' : 'text-gray-400'}`}>{history.label}</div>
                                                {history.description && (
                                                   <p className="text-xs text-gray-500 mt-1">{history.description}</p>
                                                )}
                                             </div>
                                             {history.date && (
                                                <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{history.date}</span>
                                             )}
                                          </div>
                                       </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500 italic pl-6">No updates available yet.</p>
                                  )}
                               </div>
                            </div>
                         )}

                         {/* Latest Update Summary (shown when not expanded) */}
                         {!isExpanded && latestUpdate && !isDelivered && !isCancelled && (
                            <div className="bg-blue-50/50 rounded-xl p-4 flex items-start gap-3 border border-blue-100/50 animate-fade-in cursor-pointer hover:bg-blue-50 transition" onClick={() => toggleOrderDetails(order.id)}>
                               <div className="bg-white p-2 rounded-full text-simba-blue shadow-sm border border-blue-50 mt-0.5">
                                 <Truck size={16} />
                               </div>
                               <div>
                                  <div className="font-bold text-gray-900 text-sm">Latest Update: {latestUpdate.label}</div>
                                  <div className="text-gray-500 text-xs mt-0.5">{latestUpdate.description || 'Status updated.'}</div>
                                  <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wide">{latestUpdate.date}</div>
                               </div>
                            </div>
                         )}
                      </div>
                      
                      {/* Footer */}
                      <div className="bg-gray-50 px-4 md:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                         <div className="flex gap-2 overflow-hidden max-w-[60%] md:max-w-[70%]">
                            {order.items.slice(0, 5).map((item, idx) => (
                               <div key={idx} className="w-8 h-8 md:w-10 md:h-10 bg-white rounded border border-gray-200 p-0.5 flex-shrink-0">
                                  <img 
                                     src={getOptimizedImage(item.product.image, 100)} 
                                     srcSet={getThumbnailSrcSet(item.product.image, 50)}
                                     className="w-full h-full object-contain mix-blend-multiply" 
                                     loading="lazy" 
                                  />
                               </div>
                            ))}
                            {order.items.length > 5 && (
                               <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-500">
                                  +{order.items.length - 5}
                               </div>
                            )}
                         </div>
                         <div className="text-right">
                            <span className="block text-[10px] md:text-xs text-gray-500 uppercase">Total Amount</span>
                            <span className="font-bold text-gray-900 text-sm md:text-base">{order.total.toLocaleString()} RWF</span>
                         </div>
                      </div>
                   </div>
                );
             })
          ) : (
             <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Package size={32} className="text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">No {orderFilter} orders</h3>
                <p className="text-gray-500 mb-6">You don't have any {orderFilter} shipments.</p>
                <button onClick={() => navigate('/catalog')} className="bg-simba-orange text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition">Start Shopping</button>
             </div>
          )}
       </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-gray-900">My Wallet</h2>
         <button className="text-sm font-bold text-simba-orange hover:underline">Manage Payment Methods</button>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div>
               <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Simba Pay Balance</div>
               <div className="text-4xl font-extrabold mb-4">0 <span className="text-lg text-gray-500 font-normal">RWF</span></div>
               <button className="bg-simba-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition text-sm">Top Up Wallet</button>
            </div>
            <div className="flex flex-col justify-end">
               <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield size={16} /> Secure encrypted payments
               </div>
            </div>
         </div>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mt-8">Saved Payment Methods</h3>
      <div className="space-y-3">
         {paymentMethods.map(method => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition shadow-sm">
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                     <method.icon size={24} />
                  </div>
                  <div>
                     <div className="font-bold text-gray-900">{method.provider}</div>
                     <div className="text-sm text-gray-500">{method.number}</div>
                  </div>
               </div>
               <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
            </div>
         ))}
         <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-simba-orange hover:text-simba-orange transition flex items-center justify-center gap-2">
            <Plus size={18} /> Add New Payment Method
         </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in max-w-2xl">
       <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Account Settings</h2>
       
       {/* Profile Details */}
       <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={18}/> Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input type="text" defaultValue={user.name} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-simba-orange" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <input type="tel" defaultValue={user.phone} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-simba-orange" />
             </div>
             <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <input type="email" defaultValue={user.email} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-simba-orange" />
             </div>
          </div>
       </div>

       {/* Security */}
       <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Lock size={18}/> Security</h3>
          <div className="space-y-4">
             <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-medium text-gray-700">Change Password</span>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
             <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-medium text-gray-700">Two-Factor Authentication</span>
                <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">DISABLED</span>
                   <ChevronRight size={18} className="text-gray-400" />
                </div>
             </button>
          </div>
       </div>

       {/* Notifications */}
       <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Bell size={18}/> Notifications</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <div className="font-medium text-gray-900">Order Updates</div>
                   <div className="text-xs text-gray-500">Receive email updates about your order status</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-simba-orange"></div>
                </label>
             </div>
             <div className="flex items-center justify-between">
                <div>
                   <div className="font-medium text-gray-900">Promotional SMS</div>
                   <div className="text-xs text-gray-500">Get text messages about flash sales</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-simba-orange"></div>
                </label>
             </div>
          </div>
       </div>

       <div className="pt-6">
         <button className="bg-simba-dark text-white font-bold py-3 px-8 rounded-xl hover:bg-black transition w-full md:w-auto">
            Save Changes
         </button>
       </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 lg:sticky lg:top-36">
            <div className="p-6 bg-gradient-to-br from-simba-dark to-gray-800 text-white text-center">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-simba-orange rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto mb-3 border-4 border-white/20">
                 {user.name.charAt(0)}
               </div>
               <h2 className="font-bold text-lg truncate px-2">{user.name}</h2>
               <p className="text-gray-400 text-sm truncate px-2">{user.email}</p>
            </div>
            
            {/* Desktop Vertical Menu */}
            <div className="hidden lg:block p-2 space-y-1">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${activeTab === item.id ? 'bg-orange-50 text-simba-orange font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3 flex-grow">
                     <item.icon size={20} /> {item.label}
                  </div>
                  {item.count && item.count > 0 ? (
                    <span className="bg-simba-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </div>

            {/* Mobile Horizontal Menu */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar p-2 gap-2 snap-x px-4 -mx-4 md:mx-0">
               {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap snap-center border transition-all ${activeTab === item.id ? 'bg-orange-50 text-simba-orange border-orange-100 shadow-sm' : 'bg-white text-gray-600 border-gray-100'}`}
                  >
                     <item.icon size={16} /> 
                     {item.label}
                     {item.count && item.count > 0 ? (
                       <span className="bg-simba-orange text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.count}</span>
                     ) : null}
                  </button>
               ))}
               <button 
                 onClick={() => { logout(); navigate('/'); }}
                 className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap snap-center border border-red-100 text-red-500 bg-red-50"
               >
                 <LogOut size={16} /> Sign Out
               </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow min-w-0">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'wallet' && renderWallet()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'wishlist' && renderWishlist()}
        </div>
      </div>
    </div>
  );
};
