import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RegisterProps {
  onRegister: (name: string, email: string, isHost: boolean) => void;
  isDarkMode: boolean;
}

export default function Register({ onRegister, isDarkMode }: RegisterProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHost, setIsHost] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(name, email, isHost);
    alert('Đăng ký tài khoản thành công!');
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-10 rounded-[40px] border",
          isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-xl"
        )}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Tạo tài khoản mới</h1>
          <p className="text-zinc-500">Tham gia cộng đồng EduHouse ngay hôm nay</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Họ và tên</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className={cn(
                  "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className={cn(
                  "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                  isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isHost}
                  onChange={(e) => setIsHost(e.target.checked)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center",
                  isHost ? "bg-orange-600 border-orange-600" : "border-zinc-300 dark:border-zinc-700"
                )}>
                  {isHost && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-orange-600 transition-colors">
                Tôi muốn đăng ký làm Tài khoản chủ (Host)
              </span>
            </label>
            <p className="text-[10px] text-zinc-500 ml-9">
              * Tài khoản chủ có quyền quản lý sản phẩm và chỉnh sửa thông tin cửa hàng.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            <UserPlus className="w-5 h-5" /> Đăng ký ngay
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
