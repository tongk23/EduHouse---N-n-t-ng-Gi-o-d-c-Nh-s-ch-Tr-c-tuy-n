import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Moon, Sun, Menu, X, User, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { BOOKS } from '../constants';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  user: any;
}

export default function Navbar({ cartCount, wishlistCount, isDarkMode, toggleDarkMode, isAdmin, toggleAdmin, user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  const filteredSuggestions = BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Cửa hàng', path: '/store' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b transition-colors duration-300",
      isDarkMode ? "bg-zinc-950 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group mr-8">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="text-xl font-bold tracking-tight">Edu<span className="text-orange-600">House</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-600",
                  location.pathname === link.path ? "text-orange-600" : "text-zinc-500"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex relative flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm tên sách, tác giả..."
                className={cn(
                  "w-full pl-10 pr-4 py-2 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-transparent"
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "absolute top-full left-0 w-full mt-2 rounded-xl border shadow-xl overflow-hidden",
                      isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
                    )}
                  >
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((book) => (
                        <Link
                          key={book.id}
                          to={`/book/${book.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-orange-600/10 transition-colors"
                        >
                          <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-sm font-medium">{book.title}</p>
                            <p className="text-xs text-zinc-500">{book.author}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-zinc-500">Không tìm thấy kết quả</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile"
                  className={cn(
                    "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    isDarkMode ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-600"
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-[10px] text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </Link>
                <button 
                  onClick={toggleAdmin} // Reusing toggleAdmin as logout for simplicity in App.tsx
                  className={cn(
                    "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500"
                  )}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-orange-600 hover:text-white"
                )}
              >
                <User className="w-4 h-4" />
                Đăng nhập
              </Link>
            )}

            {isAdmin && (
              <Link 
                to="/admin"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-orange-600 text-white transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button 
                  onClick={() => { toggleAdmin(); setIsMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-xl font-medium"
                >
                  {isAdmin ? "Vào Dashboard" : "Đăng nhập"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
