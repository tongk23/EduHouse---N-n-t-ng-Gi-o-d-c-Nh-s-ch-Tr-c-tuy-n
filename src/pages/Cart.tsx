import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CreditCard, Truck, ShieldCheck, User, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, ShippingInfo } from '../types';
import { cn, formatCurrency } from '../lib/utils';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (shippingInfo: ShippingInfo) => void;
  isDarkMode: boolean;
  initialShippingInfo?: ShippingInfo;
}

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onCheckout, isDarkMode, initialShippingInfo }: CartProps) {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(initialShippingInfo || {
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin nhận hàng!');
      return;
    }
    onCheckout(shippingInfo);
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Lumina Books.');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12 text-zinc-400" />
        </div>
        <h2 className="text-3xl font-bold">Giỏ hàng trống</h2>
        <p className="text-zinc-500 max-w-sm mx-auto">Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá hàng ngàn cuốn sách hấp dẫn của chúng tôi.</p>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all"
        >
          Tiếp tục mua sắm <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold mb-10">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {!isCheckingOut ? (
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "p-6 rounded-3xl border flex flex-col sm:flex-row gap-6 items-center",
                    isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
                  )}
                >
                  <Link to={`/book/${item.id}`} className="w-24 h-36 shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </Link>

                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="text-lg font-bold mb-1 hover:text-orange-600 transition-colors">{item.title}</h3>
                    </Link>
                    <p className="text-sm text-zinc-500 mb-4">{item.author}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-xs text-zinc-400">{formatCurrency(item.price)} / cuốn</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-10 rounded-[40px] border",
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
              )}
            >
              <h2 className="text-2xl font-bold mb-8">Thông tin nhận hàng</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tên người nhận</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      required
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className={cn(
                        "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      required
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
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
                      required
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className={cn(
                        "w-full pl-12 pr-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none",
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Ghi chú (tùy chọn)</label>
                  <textarea
                    rows={2}
                    value={shippingInfo.note}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })}
                    placeholder="Ghi chú cho shipper..."
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all resize-none",
                      isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                  >
                    Xác nhận đặt hàng
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className={cn(
            "p-8 rounded-[40px] border sticky top-24",
            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-xl"
          )}>
            <h3 className="text-xl font-bold mb-6">Tổng cộng</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-500">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              {shipping === 0 && (
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Miễn phí vận chuyển cho đơn trên 500k!</p>
              )}
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Tổng tiền</span>
                <span className="text-orange-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {!isCheckingOut && (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-lg hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard className="w-6 h-6" /> Tiến hành đặt hàng
              </button>
            )}

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>Giao hàng từ 2-4 ngày làm việc</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Thanh toán an toàn & bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
