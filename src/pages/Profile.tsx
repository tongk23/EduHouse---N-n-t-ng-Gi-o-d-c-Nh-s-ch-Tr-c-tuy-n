import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { User as UserType } from '../types';
import { cn } from '../lib/utils';

interface ProfileProps {
  user: UserType | null;
  onUpdateUser: (updatedUser: UserType) => void;
  isDarkMode: boolean;
}

export default function Profile({ user, onUpdateUser, isDarkMode }: ProfileProps) {
  const [formData, setFormData] = useState<Partial<UserType>>(user || {});
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateUser({ ...user, ...formData } as UserType);
      setIsSaving(false);
      alert('Cập nhật thông tin thành công!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10">Tài khoản của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Avatar Section */}
        <div className="space-y-6">
          <div className={cn(
            "p-8 rounded-[40px] border flex flex-col items-center text-center",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
          )}>
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-orange-600/10 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-orange-600" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-zinc-500">{user.email}</p>
            <div className="mt-4 px-4 py-1 bg-orange-600/10 text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {user.role === 'admin' ? 'Quản trị viên' : user.isHost ? 'Tài khoản chủ' : 'Khách hàng'}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-10 rounded-[40px] border",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
            )}
          >
            <h2 className="text-2xl font-bold mb-8">Thông tin cá nhân</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    type="email"
                    value={formData.email || ''}
                    disabled
                    className={cn(
                      "w-full pl-12 pr-6 py-4 rounded-2xl border bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 cursor-not-allowed",
                      isDarkMode ? "border-zinc-700" : "border-zinc-200"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0123 456 789"
                    className={cn(
                      "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                      isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Địa chỉ nhận hàng</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-zinc-400" />
                  <textarea
                    rows={3}
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className={cn(
                      "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none",
                      isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                    )}
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
