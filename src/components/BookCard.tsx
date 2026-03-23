import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { cn, formatCurrency } from '../lib/utils';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  isWishlisted: boolean;
  isDarkMode: boolean;
  key?: string | number;
}

export default function BookCard({ book, onAddToCart, onToggleWishlist, isWishlisted, isDarkMode }: BookCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden",
        isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm hover:shadow-xl"
      )}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {book.isNew && (
          <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">Mới</span>
        )}
        {book.isBestseller && (
          <span className="px-2 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">Bán chạy</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(book)}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300",
          isWishlisted ? "bg-red-500 text-white" : "bg-white/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-red-500"
        )}
      >
        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
      </button>

      {/* Image Container */}
      <Link to={`/book/${book.id}`} className="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{book.genre}</span>
        </div>
        <Link to={`/book/${book.id}`} className="mb-1">
          <h3 className="text-sm font-bold line-clamp-2 hover:text-orange-600 transition-colors">{book.title}</h3>
        </Link>
        <p className="text-xs text-zinc-500 mb-3">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-zinc-300"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-zinc-400">({book.reviews})</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-orange-600">{formatCurrency(book.price)}</span>
            {book.oldPrice && (
              <span className="text-[10px] text-zinc-400 line-through">{formatCurrency(book.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(book)}
            className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
