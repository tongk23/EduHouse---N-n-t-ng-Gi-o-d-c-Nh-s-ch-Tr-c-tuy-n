import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../constants';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { cn } from '../lib/utils';

interface HomeProps {
  isDarkMode: boolean;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlist: string[];
}

export default function Home({ isDarkMode, onAddToCart, onToggleWishlist, wishlist }: HomeProps) {
  const bestsellers = BOOKS.filter(b => b.isBestseller).slice(0, 4);
  const newArrivals = BOOKS.filter(b => b.isNew).slice(0, 4);

  const features = [
    { icon: <Truck className="w-6 h-6" />, title: 'Giao hàng nhanh', desc: 'Miễn phí cho đơn từ 500k' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Thanh toán an toàn', desc: 'Bảo mật thông tin 100%' },
    { icon: <Headphones className="w-6 h-6" />, title: 'Hỗ trợ 24/7', desc: 'Giải đáp mọi thắc mắc' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Sách chính hãng', desc: 'Cam kết chất lượng 100%' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/library/1920/1080?blur=4" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block text-orange-600 font-bold uppercase tracking-widest text-sm mb-4"
            >
              Chào mừng đến với Lumina Books
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            >
              Khám phá thế giới qua những <span className="text-orange-600">trang sách</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-400 mb-10 max-w-lg"
            >
              Hàng ngàn đầu sách từ kinh tế, văn học đến khoa học đang chờ đón bạn. Bắt đầu hành trình tri thức ngay hôm nay.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/store"
                className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all flex items-center gap-2"
              >
                Mua ngay <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Tìm hiểu thêm
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-8 rounded-3xl border flex flex-col items-center text-center transition-all",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
              )}
            >
              <div className="w-12 h-12 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sách bán chạy</h2>
            <p className="text-zinc-500">Những cuốn sách được yêu thích nhất trong tháng qua</p>
          </div>
          <Link to="/store" className="text-orange-600 font-bold flex items-center gap-2 hover:underline">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isDarkMode={isDarkMode}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(book.id)}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sách mới về</h2>
            <p className="text-zinc-500">Cập nhật những đầu sách mới nhất trên kệ</p>
          </div>
          <Link to="/store" className="text-orange-600 font-bold flex items-center gap-2 hover:underline">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isDarkMode={isDarkMode}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(book.id)}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[40px] overflow-hidden bg-orange-600 p-12 md:p-20 text-center text-white">
          <div className="absolute inset-0 opacity-10">
            <img src="https://picsum.photos/seed/pattern/1000/1000" alt="Pattern" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Đăng ký nhận tin</h2>
            <p className="text-orange-100 mb-10">Nhận thông báo về sách mới, chương trình khuyến mãi và quà tặng hấp dẫn mỗi tuần.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="flex-1 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-zinc-100 transition-all">
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
