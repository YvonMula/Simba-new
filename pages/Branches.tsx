import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { BRANCHES } from '../constants';
import { getOptimizedImage, getSrcSet } from '../utils/image';

export const Branches: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Branches</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-auto lg:h-[600px]">
        {/* Branch List - Order 2 on mobile to show below map */}
        <div className="lg:w-1/3 order-2 lg:order-1 lg:overflow-y-auto lg:pr-2 space-y-4">
          {BRANCHES.map(branch => (
            <div 
              key={branch.id} 
              onClick={() => setSelectedBranch(branch)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedBranch.id === branch.id ? 'border-simba-orange bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-200 hover:bg-gray-50'}`}
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">{branch.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-simba-orange" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-simba-orange" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-simba-orange" />
                  <span>{branch.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail/Map Area - Order 1 on mobile to show on top */}
        <div className="lg:w-2/3 order-1 lg:order-2 bg-gray-100 rounded-xl overflow-hidden shadow-inner relative flex flex-col h-[400px] lg:h-auto">
          {/* Simulated Map */}
          <div className="flex-grow bg-blue-50 relative">
             <img 
              src="https://picsum.photos/1000/800?blur=2" 
              alt="Map View" 
              className="w-full h-full object-cover opacity-50 grayscale"
              loading="lazy"
              decoding="async"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                 <MapPin size={48} className="text-simba-orange mx-auto mb-2 animate-bounce" />
                 <span className="bg-white px-3 py-1 rounded shadow text-xs font-bold text-gray-800">{selectedBranch.name}</span>
               </div>
             </div>
             
             {/* Map Controls Simulator */}
             <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-white p-2 rounded shadow hover:bg-gray-50 font-bold">+</button>
                <button className="bg-white p-2 rounded shadow hover:bg-gray-50 font-bold">-</button>
             </div>
          </div>

          {/* Selected Branch Detail Overlay */}
          <div className="bg-white p-4 md:p-6 border-t border-gray-200">
             <div className="flex justify-between items-start gap-4">
               <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{selectedBranch.name}</h2>
                  <p className="text-sm md:text-base text-gray-500 mb-4">{selectedBranch.address}</p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    <button className="bg-simba-orange text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-orange-600 transition text-sm md:text-base">
                      <Navigation size={18} /> Get Directions
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-50 text-sm md:text-base">
                      <Phone size={18} /> Call Branch
                    </button>
                  </div>
               </div>
               <div className="hidden md:block w-32 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                 <img 
                  src={getOptimizedImage(selectedBranch.image, 300)}
                  srcSet={getSrcSet(selectedBranch.image)}
                  sizes="128px"
                  alt="Storefront" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                 />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};