import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import News from './pages/News';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Book, CartItem, User, ShippingInfo } from './types';
import { cn } from './lib/utils';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle Login
  const handleLogin = (email: string, role: 'customer' | 'admin', isHost: boolean) => {
    const mockUser: User = {
      id: 'USR' + Math.floor(Math.random() * 1000),
      name: email.split('@')[0],
      email: email,
      role: role,
      isHost: isHost
    };
    setUser(mockUser);
    setIsAdmin(role === 'admin' || isHost);
  };

  // Handle Register
  const handleRegister = (name: string, email: string, isHost: boolean) => {
    const mockUser: User = {
      id: 'USR' + Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      role: 'customer',
      isHost: isHost
    };
    setUser(mockUser);
    setIsAdmin(isHost);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  // Add to Cart
  const addToCart = (book: Book, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...book, quantity }];
    });
  };

  // Update Quantity
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Remove Item
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Toggle Wishlist
  const toggleWishlist = (book: Book) => {
    setWishlist(prev => 
      prev.includes(book.id) ? prev.filter(id => id !== book.id) : [...prev, book.id]
    );
  };

  // Checkout
  const handleCheckout = (shippingInfo: ShippingInfo) => {
    console.log('Order placed with shipping info:', shippingInfo);
    console.log('Items:', cart);
    setCart([]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={cn(
        "min-h-screen flex flex-col transition-colors duration-300",
        isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      )}>
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isAdmin={isAdmin}
          toggleAdmin={handleLogout}
          user={user}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <Home 
                  isDarkMode={isDarkMode} 
                  onAddToCart={(b) => addToCart(b, 1)} 
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              } />
              <Route path="/store" element={
                <Store 
                  isDarkMode={isDarkMode} 
                  onAddToCart={(b) => addToCart(b, 1)} 
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              } />
              <Route path="/news" element={<News isDarkMode={isDarkMode} />} />
              <Route path="/book/:id" element={
                <BookDetail 
                  isDarkMode={isDarkMode} 
                  onAddToCart={addToCart} 
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              } />
              <Route path="/cart" element={
                <Cart 
                  cart={cart} 
                  onUpdateQuantity={updateQuantity} 
                  onRemoveItem={removeFromCart}
                  onCheckout={handleCheckout}
                  isDarkMode={isDarkMode}
                  initialShippingInfo={user ? {
                    fullName: user.name,
                    phone: user.phone || '',
                    address: user.address || ''
                  } : undefined}
                />
              } />
              <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
              <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} isDarkMode={isDarkMode} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} isDarkMode={isDarkMode} />} />
              <Route path="/profile" element={
                <Profile 
                  user={user} 
                  onUpdateUser={setUser} 
                  isDarkMode={isDarkMode} 
                />
              } />
              <Route path="/admin" element={<Admin isDarkMode={isDarkMode} />} />
              {/* Fallback for Admin Dashboard access via toggle */}
              {isAdmin && <Route path="*" element={<Admin isDarkMode={isDarkMode} />} />}
            </Routes>
          </AnimatePresence>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}
