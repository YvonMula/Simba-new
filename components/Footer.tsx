import React, { memo } from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = memo(() => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
               <div className="w-8 h-8 bg-simba-orange rounded flex items-center justify-center text-white text-lg">🦁</div>
               <span className="text-2xl font-extrabold text-white tracking-tight">SIMBA</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rwanda's premium online supermarket. We bring quality, freshness, and convenience directly to your doorstep.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-simba-blue hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-simba-orange hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/catalog" className="hover:text-simba-orange transition-colors flex items-center gap-2 py-2 md:py-1"><ArrowRight size={12}/> All Products</Link></li>
              <li><Link to="/catalog?category=fresh-produce" className="hover:text-simba-orange transition-colors flex items-center gap-2 py-2 md:py-1"><ArrowRight size={12}/> Fresh Produce</Link></li>
              <li><Link to="/catalog?category=bakery" className="hover:text-simba-orange transition-colors flex items-center gap-2 py-2 md:py-1"><ArrowRight size={12}/> Bakery</Link></li>
              <li><Link to="/catalog?flash=true" className="hover:text-simba-orange transition-colors flex items-center gap-2 py-2 md:py-1"><ArrowRight size={12}/> Flash Deals</Link></li>
              <li><Link to="/loyalty" className="hover:text-simba-orange transition-colors flex items-center gap-2 py-2 md:py-1"><ArrowRight size={12}/> Loyalty Program</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/support" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">Help Center</Link></li>
              <li><Link to="/about" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">About Simba</Link></li>
              <li><Link to="/careers" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">Careers</Link></li>
              <li><Link to="/branches" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">Store Locator</Link></li>
              <li><Link to="/profile" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">My Account</Link></li>
              <li><Link to="/track-order" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">Track Order</Link></li>
              <li><Link to="/policy" className="hover:text-simba-orange transition-colors py-2 md:py-1 block">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 py-1">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-simba-orange" />
                <span>Simba Center, KN 2 St,<br/>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 py-1">
                <Phone size={18} className="text-simba-orange" />
                <span className="font-bold text-white">+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3 py-1">
                <Mail size={18} className="text-simba-orange" />
                <Link to="/contact" className="hover:text-simba-orange transition-colors">support@simba.rw</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Simba Supermarket Ltd. All rights reserved.</p>
          <div className="flex gap-4">
             <span>Secure Payment:</span>
             <div className="flex gap-2 opacity-50">
               <div className="w-8 h-5 bg-gray-700 rounded"></div>
               <div className="w-8 h-5 bg-gray-700 rounded"></div>
               <div className="w-8 h-5 bg-gray-700 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
});