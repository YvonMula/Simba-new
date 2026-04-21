import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Award, Star, Zap, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { getOptimizedImage, getSrcSet } from '../utils/image';

export const Loyalty: React.FC = () => {
  const heroImage = "https://images.unsplash.com/photo-1607082349566-187342175e2f";

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gray-900 text-white py-16 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src={getOptimizedImage(heroImage, 1920)}
            srcSet={getSrcSet(heroImage)}
            sizes="100vw"
            alt="Loyalty" 
            className="w-full h-full object-cover"
            // @ts-ignore
            fetchPriority="high"
            loading="eager"
            decoding="async"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
             <div className="flex items-center gap-2 mb-4">
                <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-1"><Star size={14} fill="black" /> SIMBA REWARDS</span>
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
               Shop More. <br/><span className="text-simba-orange">Get Rewarded.</span>
             </h1>
             <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg md:max-w-none">
               Join the Simba Loyalty Program today. Earn points on every purchase and unlock exclusive deals, free delivery, and special gifts.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
               <button className="bg-simba-orange text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center justify-center gap-2 text-sm md:text-base">
                 Join for Free <Zap size={20} />
               </button>
               <button className="bg-white/10 backdrop-blur border border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/20 transition text-sm md:text-base">
                 Log In to Check Points
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12 md:mb-16">Earning rewards is simple. Just shop as you normally would and watch your points grow.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-blue-50 text-simba-blue rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition">🛒</div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">1. Shop Your Favorites</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">Shop online or in-store. Every 1,000 RWF spent earns you 10 Simba Points.</p>
               </div>
               <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-orange-50 text-simba-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition">📈</div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">2. Earn Points</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">Points are added to your account instantly. Track your progress in the app.</p>
               </div>
               <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition">🎁</div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">3. Redeem Rewards</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">Use points for discounts at checkout, free delivery, or exclusive products.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/2">
                <img 
                  src={getOptimizedImage("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da", 800)} 
                  srcSet={getSrcSet("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da")}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500 w-full h-auto" 
                  alt="Rewards App"
                  loading="lazy"
                  decoding="async"
                />
             </div>
             <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">Unlock Exclusive Benefits</h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="bg-orange-100 p-3 rounded-xl h-fit text-simba-orange"><Gift size={24} /></div>
                      <div>
                         <h4 className="font-bold text-lg">Birthday Surprise</h4>
                         <p className="text-sm md:text-base text-gray-500">Get a special gift or discount during your birthday month.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="bg-blue-100 p-3 rounded-xl h-fit text-simba-blue"><TrendingUp size={24} /></div>
                      <div>
                         <h4 className="font-bold text-lg">Member-Only Discounts</h4>
                         <p className="text-sm md:text-base text-gray-500">Access exclusive prices on selected items every week.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="bg-purple-100 p-3 rounded-xl h-fit text-purple-600"><Award size={24} /></div>
                      <div>
                         <h4 className="font-bold text-lg">Early Access to Sales</h4>
                         <p className="text-sm md:text-base text-gray-500">Shop Black Friday and flash sales 24 hours before everyone else.</p>
                      </div>
                   </div>
                </div>
                
                <Link to="/catalog" className="inline-flex items-center gap-2 mt-8 text-simba-orange font-bold hover:underline">
                  Start Shopping to Earn <ArrowRight size={18}/>
                </Link>
             </div>
          </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-gray-900 text-white">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12">Choose Your Level</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
               {/* Silver */}
               <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
                  <div className="text-gray-400 font-bold mb-2 uppercase tracking-widest text-sm">Silver</div>
                  <div className="text-3xl font-bold mb-4">Free</div>
                  <ul className="space-y-3 mb-8 text-gray-300 text-sm md:text-base">
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-500" /> Earn 1 pt per 100 RWF</li>
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-500" /> Birthday Gift</li>
                  </ul>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold transition">Current Plan</button>
               </div>
               
               {/* Gold */}
               <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border-2 border-simba-orange relative transform md:-translate-y-4 shadow-2xl shadow-orange-900/20">
                  <div className="absolute top-0 right-0 bg-simba-orange text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
                  <div className="text-simba-orange font-bold mb-2 uppercase tracking-widest text-sm">Gold</div>
                  <div className="text-3xl font-bold mb-1">Spend 50k</div>
                  <div className="text-sm text-gray-400 mb-4">per month</div>
                  <ul className="space-y-3 mb-8 text-gray-300 text-sm md:text-base">
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-simba-orange" /> Earn 2 pts per 100 RWF</li>
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-simba-orange" /> Free Delivery (Orders 20k+)</li>
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-simba-orange" /> Priority Support</li>
                  </ul>
                  <button className="w-full bg-simba-orange hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition">Unlock Gold</button>
               </div>

               {/* Platinum */}
               <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl p-6 md:p-8 border border-gray-600">
                  <div className="text-blue-300 font-bold mb-2 uppercase tracking-widest text-sm">Platinum</div>
                  <div className="text-3xl font-bold mb-1">Spend 200k</div>
                  <div className="text-sm text-gray-400 mb-4">per month</div>
                  <ul className="space-y-3 mb-8 text-gray-300 text-sm md:text-base">
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Earn 3 pts per 100 RWF</li>
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Free Unlimited Delivery</li>
                     <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Concierge Service</li>
                  </ul>
                  <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-xl font-bold transition">Unlock Platinum</button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};