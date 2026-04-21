import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getOptimizedImage } from '../utils/image';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question about an order, a product, or our services? We're here to help you 7 days a week.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-orange-50 p-3 rounded-full text-simba-orange shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm mb-1">General Inquiries & Support</p>
                <a href="tel:+250788123456" className="text-simba-blue font-bold hover:underline block">+250 788 123 456</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-blue-50 p-3 rounded-full text-simba-blue shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                <p className="text-gray-500 text-sm mb-1">We'll respond within 24 hours</p>
                <a href="mailto:support@simba.rw" className="text-simba-orange font-bold hover:underline block">support@simba.rw</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-purple-50 p-3 rounded-full text-purple-600 shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Opening Hours</h3>
                <p className="text-gray-500 text-sm">Mon - Sat: <span className="font-bold text-gray-700">8:00 AM - 10:00 PM</span></p>
                <p className="text-gray-500 text-sm">Sunday: <span className="font-bold text-gray-700">9:00 AM - 9:00 PM</span></p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-green-50 p-3 rounded-full text-green-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Head Office</h3>
                <p className="text-gray-500 text-sm">Simba Center</p>
                <p className="text-gray-500 text-sm">KN 2 St, Kigali, Rwanda</p>
              </div>
            </div>

            {/* Map Visual */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-48 relative border border-gray-300 shadow-inner">
               <img 
                 src={getOptimizedImage("https://images.unsplash.com/photo-1577086664693-894553052526", 600)} 
                 alt="Map Location" 
                 className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-simba-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-bounce">
                     <MapPin size={12} fill="currentColor" /> Simba Center
                  </div>
               </div>
            </div>
            
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">FAQ</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">Find answers to common questions about delivery zones, payment methods, and return policies.</p>
                <Link to="/support" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition w-full justify-center">
                   Visit Help Center <MessageSquare size={16}/>
                </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center animate-fade-in h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-600 text-lg mb-8 max-w-md">Thank you for contacting us. We have received your message and our support team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-green-700 font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
                >
                  Send another message <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange transition text-gray-900"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange transition text-gray-900"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange transition appearance-none text-gray-900"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="">Select a topic</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Corporate Sales">Corporate Sales</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-simba-orange focus:ring-1 focus:ring-simba-orange transition resize-none text-gray-900"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-simba-orange text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-orange-200"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};