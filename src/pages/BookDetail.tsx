import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ChevronRight, Minus, Plus, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKS } from '../constants';
import { Book } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import BookCard from '../components/BookCard';

interface BookDetailProps {
  isDarkMode: boolean;
  onAddToCart: (book: Book, quantity: number) => void;
  onToggleWishlist: (book: Book) => void;
  wishlist: string[];
}

export default function BookDetail({ isDarkMode, onAddToCart, onToggleWishlist, wishlist }: BookDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const book = BOOKS.find(b => b.id === id);
  
  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sách</h2>
        <Link to="/store" className="text-orange-600 font-bold hover:underline">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const relatedBooks = BOOKS.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);
  const isWishlisted = wishlist.includes(book.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-10">
        <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/store" className="hover:text-orange-600 transition-colors">Cửa hàng</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium line-clamp-1">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {book.isNew && <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">MỚI</span>}
            {book.isBestseller && <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">BÁN CHẠY</span>}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2 block">{book.genre}</span>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{book.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-zinc-300")} />
                  ))}
                </div>
                <span className="text-sm font-bold">{book.rating}</span>
                <span className="text-sm text-zinc-500">({book.reviews} đánh giá)</span>
              </div>
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
              <p className="text-sm text-zinc-500">Tác giả: <span className="font-bold text-zinc-900 dark:text-zinc-100">{book.author}</span></p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-3xl font-bold text-orange-600">{formatCurrency(book.price)}</span>
              {book.oldPrice && (
                <span className="text-lg text-zinc-400 line-through">{formatCurrency(book.oldPrice)}</span>
              )}
            </div>
            <p className="text-sm text-green-600 font-bold">Tiết kiệm {formatCurrency((book.oldPrice || book.price) - book.price)}</p>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            {book.description}
          </p>

          {/* Actions */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onToggleWishlist(book)}
                className={cn(
                  "p-4 rounded-full border transition-all duration-300",
                  isWishlisted ? "bg-red-500 border-red-500 text-white" : "border-zinc-200 dark:border-zinc-800 hover:text-red-500"
                )}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
              </button>
              <button className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:text-orange-600 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => onAddToCart(book, quantity)}
              className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" /> Thêm vào giỏ hàng
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Giao hàng nhanh</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Bảo mật 100%</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Đổi trả 7 ngày</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="pt-20 border-t border-zinc-100 dark:border-zinc-800">
          <h2 className="text-3xl font-bold mb-10">Sách cùng thể loại</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBooks.map(b => (
              <BookCard
                key={b.id}
                book={b}
                isDarkMode={isDarkMode}
                onAddToCart={() => onAddToCart(b, 1)}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(b.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
