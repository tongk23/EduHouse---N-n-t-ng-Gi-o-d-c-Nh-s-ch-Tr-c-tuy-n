import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          Liên hệ với <span className="text-orange-600">chúng tôi</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-500"
        >
          Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp và giải đáp mọi thắc mắc của bạn.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "p-10 rounded-[40px] border",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-xl"
          )}
        >
          <h2 className="text-2xl font-bold mb-8">Gửi tin nhắn</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                    isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                    isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Chủ đề</label>
              <input
                type="text"
                placeholder="Hỗ trợ đơn hàng"
                className={cn(
                  "w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Nội dung</label>
              <textarea
                rows={5}
                placeholder="Nhập nội dung tin nhắn của bạn..."
                className={cn(
                  "w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
              />
            </div>
            <button className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
              <Send className="w-5 h-5" /> Gửi tin nhắn
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Thông tin liên hệ</h2>
            <p className="text-zinc-500">Chúng tôi luôn sẵn lòng hỗ trợ bạn qua các kênh liên lạc dưới đây.</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Địa chỉ</h4>
                <p className="text-sm text-zinc-500">123 Đường Sách, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Điện thoại</h4>
                <p className="text-sm text-zinc-500">0123 456 789</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email</h4>
                <p className="text-sm text-zinc-500">contact@luminabooks.com</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Giờ làm việc</h4>
                <p className="text-sm text-zinc-500">Thứ 2 - Chủ nhật: 08:00 - 22:00</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-[40px] overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <img src="https://picsum.photos/seed/map/800/400" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" referrerPolicy="no-referrer" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
