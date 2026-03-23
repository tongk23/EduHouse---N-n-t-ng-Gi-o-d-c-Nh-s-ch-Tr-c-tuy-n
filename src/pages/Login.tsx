import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (email: string, role: 'customer' | 'admin', isHost: boolean) => void;
  isDarkMode: boolean;
}

export default function Login({ onLogin, isDarkMode }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    if (email.includes('admin')) {
      onLogin(email, 'admin', true);
    } else if (email.includes('host')) {
      onLogin(email, 'customer', true);
    } else {
      onLogin(email, 'customer', false);
    }
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
          <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại!</h1>
          <p className="text-zinc-500">Đăng nhập vào tài khoản EduHouse của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            <LogIn className="w-5 h-5" /> Đăng nhập
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
