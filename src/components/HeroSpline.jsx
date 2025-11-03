import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { MapPin, Search } from 'lucide-react';

export default function HeroSpline({ onSearch }) {
  return (
    <section className="relative h-[68vh] min-h-[540px] w-full overflow-hidden" dir="rtl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8n8Zp0Z0r9Y3m2iG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl text-3xl font-black leading-[1.2] text-gray-900 sm:text-5xl">
          فضاهای خالی شهر را کشف کن و در چند دقیقه رزرو کن
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 max-w-2xl text-gray-700">
          پارکینگ، انبار، فضای کار اشتراکی و بیشتر — همه در یک جا. پرداخت نمایشی و تجربه روان.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 w-full max-w-3xl rounded-3xl border border-white/60 bg-white/80 p-2 shadow-xl backdrop-blur">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2">
              <MapPin className="text-blue-600" size={18} />
              <input className="w-full bg-transparent p-2 outline-none" placeholder="شهر یا محله" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2">
              <Search className="text-violet-600" size={18} />
              <input className="w-full bg-transparent p-2 outline-none" placeholder="نوع فضا (پارکینگ، انبار...)" />
            </div>
            <button onClick={onSearch} className="rounded-2xl bg-gradient-to-l from-blue-600 to-violet-600 px-5 py-3 font-bold text-white shadow-lg hover:brightness-110">
              جستجو
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 flex flex-wrap gap-2">
          {['پارکینگ','انبار','فضای کار','حیاط','سوله','دفتر اشتراکی','میز کار'].map((c) => (
            <button key={c} className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-300 hover:shadow">
              {c}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
