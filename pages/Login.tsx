
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../App';
import { getOptimizedImage, getSrcSet } from '../utils/image';

export const Login: React.FC = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        login(email); // In a real app, validate credentials here
        navigate(-1); // Go back to previous page
      } else {
        setError('Please enter valid credentials.');
      }
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth redirect and callback
    setTimeout(() => {
      setIsLoading(false);
      login('google.user@gmail.com');
      navigate(-1);
    }, 1500);
  };

  const bgImage = "https://images.unsplash.com/photo-1542838132-92c53300491e";

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img 
          src={getOptimizedImage(bgImage, 1200)}
          srcSet={getSrcSet(bgImage)}
          alt="Supermarket Aisle" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col justify-between p-16 h-full text-white">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-simba-orange to-orange-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-lg">🦁</div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">Freshness delivered to your doorstep.</h1>
            <p className="text-xl text-gray-300 max-w-md">Join thousands of happy shoppers in Kigali who save time and money with Simba Online.</p>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="bg-green-500 rounded-full p-1"><CheckCircle size={16} className="text-white"/></div>
                <div>
                   <div className="font-bold">Fast Delivery</div>
                   <div className="text-sm text-gray-300">Within 60 minutes</div>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="bg-blue-500 rounded-full p-1"><CheckCircle size={16} className="text-white"/></div>
                <div>
                   <div className="font-bold">Best Prices</div>
                   <div className="text-sm text-gray-300">Competitive market rates</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-500">Sign in to access your orders, points, and exclusive deals.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-orange/20 focus:border-simba-orange transition font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-simba-orange/20 focus:border-simba-orange transition font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-simba-orange focus:ring-simba-orange border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-simba-orange hover:text-orange-600 transition">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-simba-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-simba-orange transition disabled:opacity-70 disabled:cursor-not-allowed gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition gap-2 disabled:opacity-70"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button 
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition gap-2"
            >
              <img src="https://www.svgrepo.com/show/475647/apple-color.svg" className="w-5 h-5" alt="Apple" />
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-simba-orange hover:text-orange-600 transition">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
