import { useEffect, useRef, useState, FC, RefObject, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Target, Eye, Heart, Award, Users, 
  ShoppingBag, MapPin, Coffee, Gamepad, Truck, 
  CheckCircle, Star 
} from 'lucide-react';
import { getOptimizedImage, getSrcSet } from '../utils/image';

// Simple hook for scroll animations
const useOnScreen = (ref: RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
};

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

const FadeInSection: FC<FadeInSectionProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const About: FC = () => {
  const heroImage = "https://images.unsplash.com/photo-1604719312566-b7cb96634887"; // Supermarket interior
  const historyImage = "https://images.unsplash.com/photo-1578916171728-46686eac8d58"; // Store front/staff

  const milestones = [
    { year: '2008', title: 'Official Launch', desc: 'Simba Supermarket opens its doors on August 8th.' },
    { year: '2013', title: 'Expansion', desc: 'First major branch expansion in Kigali.' },
    { year: '2015', title: 'Bakery Factory', desc: 'Launched our state-of-the-art bakery production.' },
    { year: '2020', title: 'Digital Transformation', desc: 'Introduction of online shopping and delivery services.' },
  ];

  const categories = [
    "Fruits & Vegetables", "Meats", "Frozen Foods", "Wines & Spirits", 
    "Furniture", "Electronics", "Utensils & Ornaments", "Homecare", 
    "Baby Products", "Gym & Sports", "Health & Beauty", "Bakery"
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getOptimizedImage(heroImage, 1920)}
            srcSet={getSrcSet(heroImage)}
            sizes="100vw"
            alt="Simba Supermarket Interior" 
            className="w-full h-full object-cover"
            loading="eager"
            // @ts-ignore
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white pt-20">
          <FadeInSection>
            <span className="bg-simba-orange text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
              Since 2007
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Your One-Stop <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-simba-orange to-yellow-400">
                Shopping Experience
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Quality products, affordable prices, and exceptional service in the heart of Kigali.
            </p>
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-3 bg-simba-orange hover:bg-orange-600 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-orange-500/40 text-base md:text-lg"
            >
              Explore Our Products <ArrowRight size={20} />
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* 2. Company Overview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <FadeInSection>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full z-0"></div>
                  <h2 className="relative z-10 text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Kigali's Leading Destination for <span className="text-simba-blue">Quality & Value</span>
                  </h2>
                </div>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  Founded in December 2007, <span className="font-bold text-gray-900">Simba Supermarket LTD</span> has grown from a single store to a retail powerhouse. We are committed to providing Rwanda with access to premium global brands and fresh local produce at prices that families can afford.
                </p>
                <div className="flex gap-8 mt-8">
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-simba-orange mb-1">15+</div>
                    <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">Years Served</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-simba-blue mb-1">11+</div>
                    <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">Branches</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">450+</div>
                    <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">Employees</div>
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="md:w-1/2 relative">
              <FadeInSection className="delay-200">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={getOptimizedImage(historyImage, 800)} 
                    srcSet={getSrcSet(historyImage)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Simba Store Front" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                    <p className="text-white font-medium text-sm md:text-base">Serving international organizations, NGOs, and government ministries since 2008.</p>
                  </div>
                </div>
                {/* Decorative floating card */}
                <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden lg:block animate-float">
                   <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full text-green-600">
                         <Award size={24} />
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 font-bold uppercase">Award Winning</div>
                         <div className="text-lg font-bold text-gray-900">Retailer of the Year</div>
                      </div>
                   </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
             <FadeInSection>
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full hover:-translate-y-2">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-simba-blue mb-6 group-hover:bg-simba-blue group-hover:text-white transition-colors">
                      <Target size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                   <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                     To meet people’s daily needs in Kigali and provide quality products and services at affordable prices, ensuring customer satisfaction in every transaction.
                   </p>
                </div>
             </FadeInSection>
             <FadeInSection className="delay-100">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full hover:-translate-y-2">
                   <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-simba-orange mb-6 group-hover:bg-simba-orange group-hover:text-white transition-colors">
                      <Eye size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                   <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                     To become the region’s largest retail outlet offering a one-stop shopping experience, setting the standard for quality and convenience in East Africa.
                   </p>
                </div>
             </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Products & Services */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-simba-orange font-bold uppercase tracking-widest text-sm mb-2 block">What We Offer</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Our Departments & Services</h2>
            </div>
          </FadeInSection>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
             {[
               { icon: ShoppingBag, label: "Supermarket", sub: "11 Branches" },
               { icon: Coffee, label: "Coffee Shops", sub: "5 Locations" },
               { icon: Award, label: "Bakery Factory", sub: "Fresh Daily" },
               { icon: Gamepad, label: "Arcade Games", sub: "Family Fun" },
               { icon: Truck, label: "Online Sales", sub: "Home Delivery" }
             ].map((service, idx) => (
               <FadeInSection key={idx} className={`delay-${idx * 100}`}>
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:border-simba-orange hover:shadow-lg transition group h-full">
                    <service.icon size={32} className="mx-auto mb-4 text-gray-400 group-hover:text-simba-orange transition-colors" />
                    <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{service.label}</h4>
                    <p className="text-xs text-gray-500 font-medium">{service.sub}</p>
                 </div>
               </FadeInSection>
             ))}
          </div>

          {/* Categories Grid */}
          <FadeInSection>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
               <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Product Categories</h3>
               <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-simba-blue hover:text-white hover:border-simba-blue transition-colors cursor-default shadow-sm"
                    >
                      {cat}
                    </span>
                  ))}
               </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-20 bg-simba-dark text-white">
        <div className="container mx-auto px-4">
           <FadeInSection>
             <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">Our Core Values</h2>
           </FadeInSection>
           <div className="grid md:grid-cols-3 gap-8">
              <FadeInSection>
                <div className="bg-gray-800 p-8 rounded-2xl text-center border border-gray-700 hover:bg-gray-750 transition h-full">
                   <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-simba-orange">
                      <Users size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4">Respect for the Individual</h3>
                   <p className="text-gray-400 text-sm md:text-base">We treat every customer, employee, and partner with dignity, fairness, and courtesy.</p>
                </div>
              </FadeInSection>
              <FadeInSection className="delay-100">
                <div className="bg-gray-800 p-8 rounded-2xl text-center border border-gray-700 hover:bg-gray-750 transition h-full">
                   <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-simba-blue">
                      <Heart size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4">Service to Customers</h3>
                   <p className="text-gray-400 text-sm md:text-base">Our customers are at the heart of everything we do. We strive to exceed expectations daily.</p>
                </div>
              </FadeInSection>
              <FadeInSection className="delay-200">
                <div className="bg-gray-800 p-8 rounded-2xl text-center border border-gray-700 hover:bg-gray-750 transition h-full">
                   <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400">
                      <Star size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4">Striving for Excellence</h3>
                   <p className="text-gray-400 text-sm md:text-base">We are committed to continuous improvement, quality innovation, and operational excellence.</p>
                </div>
              </FadeInSection>
           </div>
        </div>
      </section>

      {/* 6. Achievements & Timeline */}
      <section className="py-20 md:py-28 overflow-hidden">
         <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 text-center">Our Journey</h2>
            </FadeInSection>
            
            <div className="relative">
               {/* Desktop Line */}
               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>
               {/* Mobile Line */}
               <div className="absolute top-0 bottom-0 left-8 w-1 bg-gray-100 md:hidden z-0"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  {milestones.map((m, idx) => (
                     <FadeInSection key={idx} className={`delay-${idx * 100}`}>
                        <div className="ml-12 md:ml-0 bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-left relative group hover:-translate-y-2 transition-transform duration-300">
                           <div className="w-4 h-4 bg-simba-orange rounded-full absolute top-8 -left-[2.1rem] md:-top-10 md:left-1/2 md:-translate-x-1/2 ring-4 ring-white z-10"></div>
                           <div className="text-4xl font-extrabold text-gray-200 mb-2 group-hover:text-simba-orange transition-colors">{m.year}</div>
                           <h4 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h4>
                           <p className="text-sm text-gray-500">{m.desc}</p>
                        </div>
                     </FadeInSection>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 7. History & Call to Action */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
         <div className="container mx-auto px-4 text-center">
            <FadeInSection>
               <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">Be Part of Our Story</h2>
               <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                  Since our official launch on <span className="font-bold text-gray-900">August 8, 2008</span>, we have created over 450 jobs and served thousands of satisfied customers. Join us as we continue to grow.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/branches" className="bg-white text-gray-900 border border-gray-200 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-2">
                     <MapPin size={18} /> Find a Store
                  </Link>
                  <Link to="/contact" className="bg-simba-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                     Contact Us
                  </Link>
               </div>
            </FadeInSection>
         </div>
      </section>
    </div>
  );
};