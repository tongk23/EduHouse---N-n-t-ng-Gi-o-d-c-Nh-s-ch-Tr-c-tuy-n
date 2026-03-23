import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface NewsProps {
  isDarkMode: boolean;
}

const NEWS_DATA = [
  {
    id: '1',
    title: 'EduHouse chính thức khai trương chi nhánh mới tại Bắc Ninh',
    content: 'Chúng tôi rất vui mừng thông báo về việc mở rộng hệ thống EduHouse đến với tỉnh Bắc Ninh. Đây là bước tiến quan trọng trong hành trình mang tri thức đến gần hơn với mọi người...',
    image: 'https://picsum.photos/seed/news1/800/400',
    date: '2024-03-20',
    author: 'Admin',
    category: 'Sự kiện'
  },
  {
    id: '2',
    title: 'Top 10 cuốn sách kỹ năng sống đáng đọc nhất năm 2024',
    content: 'Năm 2024 hứa hẹn sẽ có nhiều đầu sách kỹ năng chất lượng. Cùng EduHouse điểm qua danh sách 10 cuốn sách giúp bạn thay đổi tư duy và phát triển bản thân vượt trội...',
    image: 'https://picsum.photos/seed/news2/800/400',
    date: '2024-03-18',
    author: 'Minh Thư',
    category: 'Review Sách'
  },
  {
    id: '3',
    title: 'Chương trình khuyến mãi "Mùa hè rực rỡ" cùng EduHouse',
    content: 'Đón chào mùa hè sôi động, EduHouse mang đến chương trình ưu đãi cực lớn lên đến 50% cho tất cả các đầu sách thiếu nhi và kỹ năng. Đừng bỏ lỡ cơ hội sở hữu những cuốn sách yêu thích...',
    image: 'https://picsum.photos/seed/news3/800/400',
    date: '2024-03-15',
    author: 'Phòng Marketing',
    category: 'Khuyến mãi'
  }
];

export default function News({ isDarkMode }: NewsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin tức & Sự kiện</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Cập nhật những thông tin mới nhất về sách, các sự kiện văn hóa và chương trình khuyến mãi hấp dẫn tại EduHouse.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured News */}
        <div className="lg:col-span-2 space-y-12">
          {NEWS_DATA.map((news, i) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group rounded-[40px] overflow-hidden border transition-all hover:shadow-2xl hover:shadow-orange-600/10",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
              )}
            >
              <div className="aspect-[21/9] overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-6 mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span className="px-3 py-1 bg-orange-600 text-white rounded-full">{news.category}</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    {news.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-600" />
                    {news.author}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                  {news.title}
                </h2>
                <p className="text-zinc-500 leading-relaxed mb-8 line-clamp-3">
                  {news.content}
                </p>
                <button className="flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all">
                  Đọc thêm <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          {/* Categories */}
          <div className={cn(
            "p-8 rounded-[40px] border",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
          )}>
            <h3 className="text-xl font-bold mb-6">Danh mục</h3>
            <ul className="space-y-4">
              {['Sự kiện', 'Review Sách', 'Khuyến mãi', 'Thông báo', 'Kinh nghiệm đọc sách'].map((cat) => (
                <li key={cat}>
                  <button className="flex items-center justify-between w-full text-sm text-zinc-500 hover:text-orange-600 transition-colors group">
                    <span>{cat}</span>
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-orange-600 group-hover:text-white transition-all",
                      isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                    )}>
                      {Math.floor(Math.random() * 10) + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className={cn(
            "p-8 rounded-[40px] border",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
          )}>
            <h3 className="text-xl font-bold mb-6">Tin mới nhất</h3>
            <div className="space-y-6">
              {NEWS_DATA.slice(0, 3).map((news) => (
                <div key={news.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {news.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 mt-2 block uppercase font-bold tracking-wider">
                      {news.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="p-8 rounded-[40px] bg-orange-600 text-white shadow-2xl shadow-orange-600/20">
            <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-orange-100 text-sm mb-6">
              Nhận những thông tin mới nhất và ưu đãi độc quyền từ EduHouse.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Email của bạn"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-orange-100 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors">
                Đăng ký ngay
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
