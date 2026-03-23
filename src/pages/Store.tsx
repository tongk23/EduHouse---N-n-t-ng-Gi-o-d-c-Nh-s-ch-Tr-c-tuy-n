import { useState, useMemo } from 'react';
import { ChevronRight, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BOOKS, GENRES } from '../constants';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { cn } from '../lib/utils';

interface StoreProps {
  isDarkMode: boolean;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlist: string[];
}

export default function Store({ isDarkMode, onAddToCart, onToggleWishlist, wishlist }: StoreProps) {
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredBooks = useMemo(() => {
    let result = [...BOOKS];

    if (selectedGenre !== 'Tất cả') {
      result = result.filter(b => b.genre === selectedGenre);
    }

    if (searchQuery) {
      result = result.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest
        break;
    }

    return result;
  }, [selectedGenre, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Cửa hàng</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" /> Thể loại
            </h3>
            <div className="space-y-2">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-xl text-sm transition-all",
                    selectedGenre === genre 
                      ? "bg-orange-600 text-white font-bold" 
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-orange-600 text-white">
            <h4 className="font-bold mb-2">Ưu đãi đặc biệt</h4>
            <p className="text-xs text-orange-100 mb-4">Giảm giá lên đến 50% cho các đầu sách kinh tế trong tuần này.</p>
            <button className="w-full py-2 bg-white text-orange-600 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-all">
              Xem ngay
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Toolbar */}
          <div className={cn(
            "p-4 rounded-2xl border flex flex-col md:flex-row gap-4 items-center justify-between",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
          )}>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className={cn(
                  "w-full pl-10 pr-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4" /> Sắp xếp:
              </div>
              <select
                className={cn(
                  "flex-1 md:w-48 px-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-500">Hiển thị <span className="font-bold text-zinc-900 dark:text-zinc-100">{filteredBooks.length}</span> kết quả</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  isDarkMode={isDarkMode}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.includes(book.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredBooks.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold">Không tìm thấy sách</h3>
              <p className="text-zinc-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
              <button 
                onClick={() => { setSelectedGenre('Tất cả'); setSearchQuery(''); }}
                className="text-orange-600 font-bold hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
