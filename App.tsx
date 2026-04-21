import { useState, createContext, useContext, useEffect, useMemo, Suspense, lazy, FC } from 'react';
import { HashRouter, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { CartItem, Product, User as UserType, Order, Address } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loading } from './components/Loading';
import { MOCK_ORDERS } from './constants';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Catalog = lazy(() => import('./pages/Catalog').then(module => ({ default: module.Catalog })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const Branches = lazy(() => import('./pages/Branches').then(module => ({ default: module.Branches })));
const Loyalty = lazy(() => import('./pages/Loyalty').then(module => ({ default: module.Loyalty })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const OrderTracking = lazy(() => import('./pages/OrderTracking').then(module => ({ default: module.OrderTracking })));
const TrackOrder = lazy(() => import('./pages/TrackOrder').then(module => ({ default: module.TrackOrder })));
const Legal = lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Careers = lazy(() => import('./pages/Careers').then(module => ({ default: module.Careers })));
const Support = lazy(() => import('./pages/Support').then(module => ({ default: module.Support })));
const Onboarding = lazy(() => import('./pages/Onboarding').then(module => ({ default: module.Onboarding })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));

// Context Definitions
interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User & Auth
  user: UserType | null;
  login: (email: string) => void;
  logout: () => void;
  
  // Data
  orders: Order[];
  placeOrder: (order: Order) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;

  // UI
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Toast = ({ message, show }: { message: string, show: boolean }) => {
  if (!show) return null;
  return (
    <div className="fixed top-24 right-4 z-[70] bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-down border border-gray-700 mx-4 md:mx-0">
      <div className="bg-green-500 rounded-full p-1 text-black flex-shrink-0">
        <CheckCircle size={16} fill="white" className="text-green-500" />
      </div>
      <span className="font-medium text-sm md:text-base">{message}</span>
    </div>
  );
}

// Inner Layout component to handle router-dependent logic
const AppLayout = () => {
  const location = useLocation();
  const { showToast } = useAppContext();
  
  // Routes where Navbar and Footer should be hidden
  const hideNavAndFooter = ['/onboarding', '/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-simba-text font-sans antialiased">
      <ScrollToTop />
      {!hideNavAndFooter && <Navbar />}
      
      {/* Main content wrapper */}
      <main className={`flex-grow ${!hideNavAndFooter ? 'pt-[140px] md:pt-[180px] pb-24 md:pb-12' : ''} min-h-[80vh] w-full max-w-screen-2xl mx-auto`}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/policy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </main>
      
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

const App: FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserType | null>({ id: 'u1', name: 'Simba Customer', email: 'customer@simba.rw', phone: '0780000000' });
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 'addr1', label: 'Home', recipient: 'Simba Customer', phone: '0780000000', address: 'KG 14 Ave, House 45', area: 'Nyarutarama', isDefault: true }
  ]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToastState, setShowToastState] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('simba_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('simba_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      
      const savedAddresses = localStorage.getItem('simba_addresses');
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));

      const savedWishlist = localStorage.getItem('simba_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }, []);

  useEffect(() => localStorage.setItem('simba_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('simba_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('simba_addresses', JSON.stringify(addresses)), [addresses]);
  useEffect(() => localStorage.setItem('simba_wishlist', JSON.stringify(wishlist)), [wishlist]);

  // --- ACTIONS ---

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setShowToastState(true);
    setTimeout(() => setShowToastState(false), 3000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const login = (email: string) => {
    setUser({ id: 'u1', name: 'Simba Customer', email, phone: '0780000000' });
  };

  const logout = () => setUser(null);

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const addAddress = (address: Address) => {
    setAddresses(prev => {
      // If new address is default, remove default from others
      const newAddresses = address.isDefault 
        ? prev.map(a => ({ ...a, isDefault: false })) 
        : prev;
      return [...newAddresses, address];
    });
    showToast('Address added successfully');
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const value = useMemo(() => ({
    cart, addToCart, removeFromCart, updateQuantity, clearCart,
    user, login, logout, isCartOpen, setIsCartOpen, showToast,
    orders, placeOrder, addresses, addAddress, removeAddress, wishlist, toggleWishlist
  }), [cart, user, isCartOpen, orders, addresses, wishlist]);

  return (
    <AppContext.Provider value={value}>
      <HashRouter>
        <Toast message={toastMessage} show={showToastState} />
        <AppLayout />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;