import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Music } from 'lucide-react';
import { cn } from '../lib/utils';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={cn(
      "pt-20 pb-10 border-t transition-colors duration-300",
      isDarkMode ? "bg-zinc-950 border-zinc-800 text-zinc-100" : "bg-white border-zinc-100 text-zinc-900"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-orange-600/20">
                E
              </div>
              <span className="text-xl font-bold tracking-tight">Edu<span className="text-orange-600">House</span></span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Hệ thống cung cấp tri thức hàng đầu, mang đến những trải nghiệm học tập và đọc sách tuyệt vời nhất cho cộng đồng.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all" title="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Liên kết nhanh</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link></li>
              <li><Link to="/store" className="hover:text-orange-600 transition-colors">Cửa hàng</Link></li>
              <li><Link to="/news" className="hover:text-orange-600 transition-colors">Tin tức</Link></li>
              <li><Link to="/about" className="hover:text-orange-600 transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-orange-600 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hỗ trợ khách hàng</h3>
            <div className="space-y-4 text-sm text-zinc-500">
              <p className="leading-relaxed">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Nếu có bất kỳ thắc mắc nào về đơn hàng hoặc dịch vụ, vui lòng liên hệ trực tiếp qua hotline hoặc email.
              </p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Chính sách vận chuyển</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Thông tin liên hệ</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                <span>Thôn Tư Thâm, Xã Lục Ngạn, Tỉnh Bắc Ninh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <span>0962388934</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <span>tongk25011999@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>© 2026 EduHouse. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-orange-600 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
