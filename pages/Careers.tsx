import React, { useState, useMemo } from 'react';
import { Briefcase, Users, Heart, Zap, ArrowRight, MapPin, Clock, Search, GraduationCap, Smile, Coffee, DollarSign, Filter } from 'lucide-react';
import { getOptimizedImage } from '../utils/image';

export const Careers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const jobs = [
    { id: 1, title: 'Store Manager', type: 'Full-time', location: 'Kigali (Kimironko)', dept: 'Retail Operations', posted: '2 days ago' },
    { id: 2, title: 'Digital Marketing Specialist', type: 'Full-time', location: 'Kigali (HQ)', dept: 'Marketing', posted: '1 week ago' },
    { id: 3, title: 'Head Baker', type: 'Full-time', location: 'Gishushu Production Center', dept: 'Production', posted: '3 days ago' },
    { id: 4, title: 'Customer Support Agent', type: 'Part-time', location: 'Remote / Hybrid', dept: 'Customer Service', posted: 'Just now' },
    { id: 5, title: 'Inventory Analyst', type: 'Full-time', location: 'Kigali (HQ)', dept: 'Logistics', posted: '2 weeks ago' },
  ];

  const benefits = [
    { icon: Heart, title: 'Comprehensive Health', desc: 'Full medical insurance for you and your direct dependents.' },
    { icon: GraduationCap, title: 'Continuous Learning', desc: 'Access to training programs, workshops, and tuition reimbursement.' },
    { icon: Smile, title: 'Work-Life Balance', desc: 'Flexible shifts and paid time off to recharge.' },
    { icon: DollarSign, title: 'Competitive Pay', desc: 'Market-leading salaries and performance-based bonuses.' },
    { icon: Coffee, title: 'In-Store Perks', desc: 'Employee discounts on groceries and free meals at our bakery.' },
    { icon: Users, title: 'Inclusive Culture', desc: 'A diverse workplace where every voice is heard and valued.' },
  ];

  const departments = ['All Departments', ...Array.from(new Set(jobs.map(j => j.dept)))];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === 'All Departments' || job.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getOptimizedImage("https://images.unsplash.com/photo-1556761175-5973dc0f32e7", 1920)} 
            alt="Simba Team" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white pt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-simba-orange/20 border border-simba-orange/50 text-simba-orange text-xs md:text-sm font-bold tracking-wider mb-4 md:mb-6 backdrop-blur-sm">
            CAREERS AT SIMBA
          </span>
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
            Build the Future of <br/> <span className="text-simba-orange">Retail in Rwanda</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10">
            Join a team of 450+ passionate individuals dedicated to delivering quality, freshness, and smiles to thousands of families every day.
          </p>
          <a 
            href="#openings" 
            className="inline-flex items-center gap-2 bg-simba-orange text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full hover:bg-orange-600 transition transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
          >
            View Open Positions <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-simba-orange text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div>
              <div className="text-3xl md:text-5xl font-extrabold mb-1">450+</div>
              <div className="text-sm font-medium uppercase tracking-wide opacity-90">Employees</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold mb-1">15+</div>
              <div className="text-sm font-medium uppercase tracking-wide opacity-90">Years of Service</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold mb-1">11</div>
              <div className="text-sm font-medium uppercase tracking-wide opacity-90">Branches</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold mb-1">40%</div>
              <div className="text-sm font-medium uppercase tracking-wide opacity-90">Women Leaders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2">
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
                    <img 
                      src={getOptimizedImage("https://images.unsplash.com/photo-1543269865-cbf427effbad", 800)} 
                      alt="Company Culture" 
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                       <p className="text-white font-bold text-lg">Our annual team building retreat, 2023</p>
                    </div>
                 </div>
              </div>
              <div className="lg:w-1/2">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Our Culture</h2>
                 <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    At Simba, we don't just sell groceries; we build community. Our culture is rooted in <span className="font-bold text-simba-orange">Respect</span>, <span className="font-bold text-simba-blue">Service</span>, and <span className="font-bold text-gray-900">Excellence</span>.
                 </p>
                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We foster an environment where innovation is encouraged, hard work is rewarded, and every team member feels like family. Whether you are in the warehouse or the boardroom, your contribution matters.
                 </p>
                 <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div> Collaborative
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Customer-Obsessed
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                       <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Fast-Paced
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Join the Pride?</h2>
            <p className="text-gray-500 text-lg">
              We believe in nurturing talent and providing an environment where you can grow professionally and personally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group hover:-translate-y-1">
                <div className="w-14 h-14 bg-orange-50 text-simba-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span className="text-simba-orange font-bold uppercase tracking-widest text-sm">Join Us</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Current Openings</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <div className="relative flex-grow sm:flex-grow-0 sm:w-48">
                  <select 
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-simba-orange bg-white cursor-pointer"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
               </div>
               
               <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Search jobs..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange"
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
               </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-simba-orange transition cursor-pointer group flex flex-col md:flex-row justify-between md:items-center gap-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-simba-orange transition mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        <Briefcase size={16} className="text-simba-blue"/> {job.dept}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        <MapPin size={16} className="text-simba-blue"/> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        <Clock size={16} className="text-simba-blue"/> {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-between w-full md:w-auto">
                    <div className="text-xs text-gray-400 font-medium md:hidden">Posted {job.posted}</div>
                    <div className="text-xs text-gray-400 font-medium hidden md:block">Posted {job.posted}</div>
                    <button className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl group-hover:bg-simba-orange transition whitespace-nowrap shadow-lg">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                 <Briefcase size={40} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
                 <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

          {/* Unsolicited Application */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-simba-blue rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't see the right role?</h3>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
                We are always looking for talent. If you think you'd be a great fit for Simba, send us your CV and a cover letter.
              </p>
              <a 
                href="mailto:careers@simba.rw" 
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition shadow-lg"
              >
                Email Your CV <Briefcase size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};