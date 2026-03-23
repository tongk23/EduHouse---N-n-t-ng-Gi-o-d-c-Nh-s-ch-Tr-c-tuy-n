import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, TrendingUp, Bell, Search, Filter, MoreVertical, CheckCircle, Clock, Truck, Plus, Edit2, Trash2, X, Save, Shield, ShieldCheck, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ORDERS, BOOKS, MOCK_USERS } from '../constants';
import { cn, formatCurrency } from '../lib/utils';
import { Book, User } from '../types';

interface AdminProps {
  isDarkMode: boolean;
}

export default function Admin({ isDarkMode }: AdminProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save logic
    setTimeout(() => {
      setIsSaving(false);
      setEditingBook(null);
      alert('Cập nhật sản phẩm thành công!');
    }, 1000);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save logic
    setTimeout(() => {
      setIsSaving(false);
      setEditingUser(null);
      alert('Cập nhật người dùng thành công!');
    }, 1000);
  };

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Doanh thu', value: '12.500.000₫', trend: '+12.5%', color: 'bg-green-500' },
    { icon: <ShoppingBag className="w-6 h-6" />, label: 'Đơn hàng', value: '1,250', trend: '+8.2%', color: 'bg-blue-500' },
    { icon: <Users className="w-6 h-6" />, label: 'Khách hàng', value: '850', trend: '+5.4%', color: 'bg-purple-500' },
    { icon: <Bell className="w-6 h-6" />, label: 'Thông báo', value: '12', trend: '-2.1%', color: 'bg-orange-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Shipping': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Shipping': return <Truck className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === 'dashboard' ? "bg-orange-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            <LayoutDashboard className="w-5 h-5" /> Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === 'products' ? "bg-orange-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            <ShoppingBag className="w-5 h-5" /> Quản lý sản phẩm
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === 'orders' ? "bg-orange-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            <ShoppingBag className="w-5 h-5" /> Đơn hàng
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === 'customers' ? "bg-orange-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            <Users className="w-5 h-5" /> Khách hàng
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === 'news' ? "bg-orange-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            <Newspaper className="w-5 h-5" /> Quản lý tin tức
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-10">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-6 rounded-3xl border flex flex-col transition-all",
                      isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg", stat.color)}>
                      {stat.icon}
                    </div>
                    <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className={cn("text-xs font-bold", stat.trend.startsWith('+') ? "text-green-500" : "text-red-500")}>
                        {stat.trend}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Analytics (Mock) */}
                <div className={cn(
                  "lg:col-span-2 p-8 rounded-3xl border",
                  isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
                )}>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Phân tích doanh thu</h3>
                    <select className="bg-transparent text-sm font-bold text-zinc-500 focus:outline-none">
                      <option>7 ngày qua</option>
                      <option>30 ngày qua</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end gap-4">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="w-full bg-orange-600/20 hover:bg-orange-600 transition-all rounded-t-lg"
                        />
                        <span className="text-[10px] text-zinc-500 font-bold">T{i+2}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications (Mock) */}
                <div className={cn(
                  "p-8 rounded-3xl border",
                  isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
                )}>
                  <h3 className="text-xl font-bold mb-6">Thông báo mới</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-orange-600/10 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-tight mb-1">Đơn hàng mới #ORD00{i+4}</p>
                          <p className="text-xs text-zinc-500">Khách hàng vừa đặt mua 2 cuốn sách.</p>
                          <span className="text-[10px] text-zinc-400 mt-2 block">2 phút trước</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className={cn(
                "rounded-3xl border overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
              )}>
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h3 className="text-xl font-bold">Đơn hàng gần đây</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Tìm đơn hàng..."
                        className="pl-10 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-600/20"
                      />
                    </div>
                    <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Mã đơn</th>
                        <th className="px-6 py-4">Khách hàng</th>
                        <th className="px-6 py-4">Ngày đặt</th>
                        <th className="px-6 py-4">Tổng cộng</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {ORDERS.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold">#{order.id}</td>
                          <td className="px-6 py-4 text-sm">{order.customerName}</td>
                          <td className="px-6 py-4 text-sm text-zinc-500">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-bold text-orange-600">{formatCurrency(order.total)}</td>
                          <td className="px-6 py-4">
                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit", getStatusColor(order.status))}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 text-center">
                  <button className="text-sm font-bold text-orange-600 hover:underline">Xem tất cả đơn hàng</button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className={cn(
              "p-8 rounded-3xl border",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
            )}>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                  <Plus className="w-5 h-5" /> Thêm sản phẩm
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Sản phẩm</th>
                      <th className="px-6 py-4">Thể loại</th>
                      <th className="px-6 py-4">Giá</th>
                      <th className="px-6 py-4">Đánh giá</th>
                      <th className="px-6 py-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {BOOKS.map((book) => (
                      <tr key={book.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded-lg" referrerPolicy="no-referrer" />
                            <div>
                              <p className="text-sm font-bold line-clamp-1">{book.title}</p>
                              <p className="text-xs text-zinc-500">{book.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {book.genre}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-orange-600">{formatCurrency(book.price)}</td>
                        <td className="px-6 py-4 text-sm">{book.rating} ⭐</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingBook(book)}
                              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className={cn(
              "p-8 rounded-3xl border",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
            )}>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Tìm người dùng..."
                      className="pl-10 pr-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Người dùng</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Vai trò</th>
                      <th className="px-6 py-4">Tài khoản chủ</th>
                      <th className="px-6 py-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-600/10 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <Users className="w-4 h-4 text-orange-600" />
                              )}
                            </div>
                            <span className="text-sm font-bold">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            user.role === 'admin' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                          )}>
                            {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.isHost ? (
                            <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                              <ShieldCheck className="w-4 h-4" /> Đã kích hoạt
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-zinc-400 text-xs font-bold">
                              <Shield className="w-4 h-4" /> Chưa kích hoạt
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingUser(user)}
                              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className={cn(
              "p-8 rounded-3xl border",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
            )}>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Quản lý tin tức</h2>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                  <Plus className="w-5 h-5" /> Thêm tin tức
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Tin tức</th>
                      <th className="px-6 py-4">Danh mục</th>
                      <th className="px-6 py-4">Ngày đăng</th>
                      <th className="px-6 py-4">Tác giả</th>
                      <th className="px-6 py-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {[
                      { id: '1', title: 'EduHouse chính thức khai trương...', date: '2024-03-20', author: 'Admin', category: 'Sự kiện' },
                      { id: '2', title: 'Top 10 cuốn sách kỹ năng sống...', date: '2024-03-18', author: 'Minh Thư', category: 'Review Sách' },
                    ].map((news) => (
                      <tr key={news.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold line-clamp-1">{news.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {news.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{news.date}</td>
                        <td className="px-6 py-4 text-sm font-bold">{news.author}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {editingBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingBook(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-2xl p-8 rounded-[40px] border shadow-2xl overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
              )}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h2>
                <button 
                  onClick={() => setEditingBook(null)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveBook} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tên sách</label>
                    <input
                      required
                      type="text"
                      defaultValue={editingBook.title}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tác giả</label>
                    <input
                      required
                      type="text"
                      defaultValue={editingBook.author}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Giá (₫)</label>
                    <input
                      required
                      type="number"
                      defaultValue={editingBook.price}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Thể loại</label>
                    <select
                      defaultValue={editingBook.genre}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    >
                      <option>Kinh tế</option>
                      <option>Tâm lý</option>
                      <option>Văn học</option>
                      <option>Kỹ năng</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Mô tả</label>
                  <textarea
                    rows={4}
                    defaultValue={editingBook.description}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none",
                      isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className={cn(
                      "flex-1 py-4 rounded-2xl font-bold transition-all",
                      isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-100 hover:bg-zinc-200"
                    )}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-md p-8 rounded-[40px] border shadow-2xl overflow-hidden",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
              )}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Chỉnh sửa người dùng</h2>
                <button 
                  onClick={() => setEditingUser(null)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="w-12 h-12 rounded-full bg-orange-600/10 flex items-center justify-center overflow-hidden">
                      {editingUser.avatar ? (
                        <img src={editingUser.avatar} alt={editingUser.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">{editingUser.name}</p>
                      <p className="text-xs text-zinc-500">{editingUser.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Vai trò</label>
                    <select
                      defaultValue={editingUser.role}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    >
                      <option value="customer">Khách hàng</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-bold">Tài khoản chủ (Host)</p>
                        <p className="text-[10px] text-zinc-500">Cho phép quản lý sản phẩm</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={editingUser.isHost} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className={cn(
                      "flex-1 py-4 rounded-2xl font-bold transition-all",
                      isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-100 hover:bg-zinc-200"
                    )}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
