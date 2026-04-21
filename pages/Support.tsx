import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ChevronDown, Package, Truck, 
  CreditCard, RefreshCw, User, HelpCircle, MessageCircle, 
  Phone, Mail, ArrowRight, FileText, ShieldCheck, MapPin 
} from 'lucide-react';

export const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'orders', name: 'Orders', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'delivery', name: 'Delivery', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'payments', name: 'Payments', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'returns', name: 'Returns', icon: RefreshCw, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'account', name: 'Account', icon: User, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'other', name: 'General', icon: HelpCircle, color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  const faqs = [
    {
      question: "Where is my order?",
      answer: "You can track your order status in real-time by visiting the 'My Orders' section in your profile or using the 'Track Order' link in the navigation menu. You'll need your Order ID.",
      category: 'Orders'
    },
    {
      question: "How do I return an item?",
      answer: "If you are not satisfied with a product, you can request a return within 48 hours of delivery. Go to 'My Orders', select the order, and click 'Request Return'. Please ensure the item is in its original packaging.",
      category: 'Returns'
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept MTN Mobile Money, Airtel Money, Visa/Mastercard payments via Flutterwave, and Cash on Delivery (COD) for orders within Kigali.",
      category: 'Payments'
    },
    {
      question: "How much is delivery?",
      answer: "Delivery is flat rate 2,000 RWF for orders under 50,000 RWF. Orders above 50,000 RWF qualify for free delivery within Kigali.",
      category: 'Delivery'
    },
    {
      question: "Can I change my delivery address?",
      answer: "You can change your delivery address before the order is 'Shipped'. Go to your profile addresses or contact support immediately if the order is already placed.",
      category: 'Orders'
    },
    {
      question: "Do you deliver outside Kigali?",
      answer: "Currently, our same-day delivery service covers all districts of Kigali. Upcountry delivery can be arranged via third-party couriers; please contact support for a quote.",
      category: 'Delivery'
    },
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your registered email address, and we will send you instructions to reset your password.",
      category: 'Account'
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6">How can we help you?</h1>
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for answers (e.g., 'delivery', 'refund')" 
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-simba-orange/30 text-lg shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-20">
        
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.name === activeCategory ? 'All' : cat.name)}
              className={`p-6 rounded-2xl shadow-sm border transition-all flex flex-col items-center gap-3 group ${
                activeCategory === cat.name 
                  ? 'bg-white border-simba-orange ring-2 ring-simba-orange ring-opacity-50 transform -translate-y-1' 
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className={`font-bold text-sm ${activeCategory === cat.name ? 'text-gray-900' : 'text-gray-600'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQs List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-simba-orange" />
              {searchQuery ? 'Search Results' : `${activeCategory === 'All' ? 'Top' : activeCategory} Questions`}
            </h2>
            
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:border-gray-300"
                  >
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-bold text-gray-800 text-base md:text-lg pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`flex-shrink-0 transition-transform duration-300 ${
                          openFaqIndex === index ? 'text-simba-orange rotate-180' : 'text-gray-400'
                        }`} 
                        size={20} 
                      />
                    </button>
                    <div 
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900">No answers found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or contact support.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Still need help?</h3>
              
              <div className="space-y-4">
                <Link to="/contact" className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition group border border-transparent hover:border-blue-100">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chat with Us</div>
                    <div className="text-sm text-gray-500">Available 8am - 10pm</div>
                  </div>
                </Link>

                <a href="tel:+250788123456" className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition group border border-transparent hover:border-green-100">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Call Support</div>
                    <div className="text-sm text-gray-500">+250 788 123 456</div>
                  </div>
                </a>

                <a href="mailto:support@simba.rw" className="flex items-center gap-4 p-4 rounded-xl hover:bg-orange-50 transition group border border-transparent hover:border-orange-100">
                  <div className="bg-orange-100 text-simba-orange p-3 rounded-full group-hover:bg-simba-orange group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Email Us</div>
                    <div className="text-sm text-gray-500">Response in 24h</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-simba-dark to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
               <h3 className="text-lg font-bold mb-2">Track an Order</h3>
               <p className="text-gray-300 text-sm mb-6">Enter your order ID to see shipment status.</p>
               <Link to="/track-order" className="inline-flex items-center justify-center w-full bg-simba-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition gap-2">
                 Track Now <ArrowRight size={18} />
               </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="font-bold text-xl text-gray-900 mb-4">Quick Links</h3>
               <ul className="space-y-3">
                  <li>
                    <Link to="/terms" className="flex items-center justify-between text-gray-600 hover:text-simba-orange transition group p-2 hover:bg-orange-50 rounded-lg">
                       <span className="flex items-center gap-3"><RefreshCw size={18} className="text-gray-400 group-hover:text-simba-orange"/> Return Policy</span>
                       <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-simba-orange"/>
                    </Link>
                  </li>
                  <li>
                    <Link to="/policy" className="flex items-center justify-between text-gray-600 hover:text-simba-orange transition group p-2 hover:bg-orange-50 rounded-lg">
                       <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-gray-400 group-hover:text-simba-orange"/> Privacy Policy</span>
                       <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-simba-orange"/>
                    </Link>
                  </li>
                  <li>
                     <Link to="/branches" className="flex items-center justify-between text-gray-600 hover:text-simba-orange transition group p-2 hover:bg-orange-50 rounded-lg">
                       <span className="flex items-center gap-3"><MapPin size={18} className="text-gray-400 group-hover:text-simba-orange"/> Store Locator</span>
                       <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-simba-orange"/>
                    </Link>
                  </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};