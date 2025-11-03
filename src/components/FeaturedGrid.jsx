import { motion } from 'framer-motion';
import { Star, BadgeDollarSign, MapPin } from 'lucide-react';

const items = [
  {
    id: 1,
    title: 'استودیوی آفتابگیر در مرکز شهر',
    location: 'تهران، میدان ونک',
    price: '۳۸۰٬۰۰۰ تومان/ساعت',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1600&auto=format&fit=crop',
    tag: 'ویژه'
  },
  {
    id: 2,
    title: 'اتاق جلسه مینیمال با وایت‌بورد',
    location: 'شیراز، معالی‌آباد',
    price: '۱٬۲۰۰٬۰۰۰ تومان/روز',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop',
    tag: 'پرفروش'
  },
  {
    id: 3,
    title: 'روف‌گاردن دنج برای رویداد کوچک',
    location: 'اصفهان، چهارباغ بالا',
    price: '۹٫۵۰۰٬۰۰۰ تومان/ماه',
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop',
    tag: 'جدید'
  },
  {
    id: 4,
    title: 'انبار تمیز و امن در غرب شهر',
    location: 'کرج، گوهردشت',
    price: '۴۵۰٬۰۰۰ تومان/روز',
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2c7d6?q=80&w=1600&auto=format&fit=crop',
    tag: 'اقتصادی'
  }
];

export default function FeaturedGrid({ onSelect }) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">فضاهای پیشنهاد ویژه</h2>
          <p className="text-white/60 text-sm mt-1">بهترین انتخاب‌های امروز برای شما</p>
        </div>
        <button className="text-sm text-white/80 hover:text-white">مشاهده همه</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <motion.div key={it.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -6 }} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={it.img} alt={it.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow">
                {it.tag}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white/90">{it.title}</h3>
                <div className="flex items-center gap-1 text-yellow-300">
                  <Star className="w-4 h-4" />
                  <span className="text-xs text-white/80">{it.rating}</span>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2 text-white/60 text-xs">
                <MapPin className="w-4 h-4" />
                {it.location}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-fuchsia-200">
                  <BadgeDollarSign className="w-5 h-5" />
                  <span className="font-bold">{it.price}</span>
                </div>
                <button onClick={() => onSelect?.(it)} className="px-3 py-1.5 rounded-xl text-sm bg-white/10 hover:bg-white/15 border border-white/10 text-white/90">رزرو</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
