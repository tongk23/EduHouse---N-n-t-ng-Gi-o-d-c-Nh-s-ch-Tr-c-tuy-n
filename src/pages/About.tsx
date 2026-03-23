import { motion } from 'motion/react';
import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export default function About({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          Câu chuyện của <span className="text-orange-600">Lumina Books</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-500"
        >
          Chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra thế giới mới. Sứ mệnh của Lumina là kết nối độc giả với những tri thức tinh hoa nhất.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[40px] overflow-hidden aspect-video"
        >
          <img src="https://picsum.photos/seed/about1/800/600" alt="Team" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Tầm nhìn của chúng tôi</h2>
          <p className="text-zinc-500 leading-relaxed">
            Trở thành hệ sinh thái tri thức hàng đầu, nơi mọi người không chỉ mua sách mà còn chia sẻ niềm đam mê đọc và học hỏi không ngừng. Chúng tôi cam kết mang đến những trải nghiệm mua sắm hiện đại, tiện lợi và đầy cảm hứng.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-orange-600">10k+</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Đầu sách</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-orange-600">50k+</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Khách hàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <BookOpen />, title: 'Đa dạng', desc: 'Hàng ngàn thể loại từ khắp nơi trên thế giới.' },
          { icon: <Users />, title: 'Cộng đồng', desc: 'Nơi kết nối những tâm hồn yêu sách.' },
          { icon: <Award />, title: 'Chất lượng', desc: 'Cam kết sách chính hãng, in ấn sắc nét.' },
          { icon: <Globe />, title: 'Toàn quốc', desc: 'Giao hàng nhanh chóng đến mọi miền tổ quốc.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-3xl border text-center",
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100 shadow-sm"
            )}
          >
            <div className="w-12 h-12 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
