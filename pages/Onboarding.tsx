import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Sparkles, Truck, ShoppingBag } from 'lucide-react';
import { getOptimizedImage } from '../utils/image';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1604719312566-b7cb96634887',
    icon: ShoppingBag,
    title: 'Freshness Guaranteed',
    description: 'Experience farm-fresh quality with our hand-picked fruits, vegetables, and premium meats delivered daily.',
    color: 'bg-green-500'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616401784845-180886ba9ca8',
    icon: Truck,
    title: 'Fast Home Delivery',
    description: 'Get your groceries delivered to your doorstep in as little as 60 minutes anywhere in Kigali.',
    color: 'bg-simba-blue'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f',
    icon: Sparkles,
    title: 'Unbeatable Rewards',
    description: 'Join Simba Rewards to earn points on every purchase and unlock exclusive member-only deals.',
    color: 'bg-simba-orange'
  }
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = () => {
    localStorage.setItem('simba_has_onboarded', 'true');
    navigate('/');
  };

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setIsAnimating(true);
      setCurrentSlide(curr => curr + 1);
      setTimeout(() => setIsAnimating(false), 500);
    } else {
      handleComplete();
    }
  };

  const skip = () => handleComplete();

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen w-screen overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={skip}
          className="text-white/80 font-bold text-sm px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition"
        >
          Skip
        </button>
      </div>

      {/* Image Slider */}
      <div className="relative flex-grow h-3/5 md:h-2/3 overflow-hidden bg-gray-900">
        {SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 scale-100 translate-x-0' : 
              index < currentSlide ? 'opacity-0 scale-110 -translate-x-10' : 
              'opacity-0 scale-110 translate-x-10'
            }`}
          >
            <img 
              src={getOptimizedImage(slide.image, 1200)} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-shrink-0 h-2/5 md:h-1/3 bg-white relative -mt-10 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10 flex flex-col items-center justify-between p-8 md:p-12">
        <div className="w-12 h-1 bg-gray-200 rounded-full mb-6"></div>
        
        <div className="text-center max-w-md mx-auto flex-grow flex flex-col justify-center">
          <div className="flex justify-center mb-6">
             {SLIDES.map((slide, idx) => {
               const Icon = slide.icon;
               return (
                 <div 
                   key={idx} 
                   className={`transition-all duration-500 absolute ${idx === currentSlide ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'}`}
                 >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${slide.color} mb-4`}>
                       <Icon size={32} />
                    </div>
                 </div>
               );
             })}
             {/* Spacer for absolute positioning layout */}
             <div className="w-16 h-16 mb-4"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 transition-all duration-300">
            {SLIDES[currentSlide].title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed transition-all duration-300">
            {SLIDES[currentSlide].description}
          </p>
        </div>

        <div className="w-full max-w-md mx-auto mt-8 flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-simba-orange' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-simba-orange transition-all shadow-lg active:scale-95 group"
          >
            {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};