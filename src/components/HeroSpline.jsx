import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Search, Map, Calendar, Star } from 'lucide-react';

export default function HeroSpline({ onSearch }) {
  const searchRef = useRef(null);

  return (
    <section className="relative min-h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8oM2Hnq3kWm6N5rL/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-16">
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-center text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          کشف فضاهای خاص برای کار، رویداد و خلاقیت
        </motion.h1>
        <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="mt-4 text-center text-white/80">
          از ساعتی تا ماهانه — جست‌وجو کن، انتخاب کن و همان لحظه رزرو کن.
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mt-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <Search className="w-5 h-5 text-fuchsia-300" />
              <input ref={searchRef} placeholder="شهر، محله یا نوع فضا" className="w-full bg-transparent outline-none placeholder-white/50 text-white" />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <Map className="w-5 h-5 text-indigo-300" />
              <select className="w-full bg-transparent outline-none text-white/90">
                <option className="bg-slate-900">نزدیک‌ترین</option>
                <option className="bg-slate-900">محبوب‌ترین</option>
                <option className="bg-slate-900">ارزان‌ترین</option>
              </select>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
              <Calendar className="w-5 h-5 text-emerald-300" />
              <input type="date" className="w-full bg-transparent outline-none text-white/90 [color-scheme:dark]" />
            </div>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => onSearch?.(searchRef.current?.value || '')} className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-bold py-2">
              جست‌وجو
            </motion.button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {['دفتر اشتراکی','استودیوی عکاسی','اتاق جلسه','روف‌گاردن','پارکینگ','انبار'].map((t, i) => (
              <motion.span key={t} whileHover={{ scale: 1.05 }} className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300"/>امتیاز ۴.۹ از ۵</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300"/>پرداخت امن شبیه‌سازی‌شده</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300"/>پشتیبانی لحظه‌ای</div>
        </div>
      </div>
    </section>
  );
}
