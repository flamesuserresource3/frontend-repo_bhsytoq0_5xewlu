import { motion } from 'framer-motion';
import { Rocket, User, LogIn, Shield, Sparkles } from 'lucide-react';

export default function ElegantNavbar({ onLoginClick }) {
  return (
    <div className="sticky top-0 z-50">
      <div className="absolute inset-0 h-[140px] bg-gradient-to-b from-fuchsia-500/20 via-transparent to-transparent blur-2xl pointer-events-none" />
      <nav className="relative mx-auto max-w-7xl mt-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -15, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
              <Rocket className="w-5 h-5" />
            </motion.div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600">رایجا</div>
              <div className="text-xs text-white/70">رزرو هوشمند فضاهای بلااستفاده</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {['فضاهای محبوب','نقشه','امکانات','قیمت‌ها'].map((item, idx) => (
              <motion.button key={idx} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="px-3 py-2 text-sm rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition">
                {item}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/15 text-white/90 hover:bg-white/10">
              <Shield className="w-4 h-4" />
              تضمین امنیت
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onLoginClick} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg">
              <LogIn className="w-4 h-4" />
              ورود / ثبت‌نام
            </motion.button>
          </div>
        </div>
        <div className="px-5 pb-4 text-xs text-white/60 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          تجربه‌ای سریع، امن و چشم‌نواز — فارسی و راست‌چین
        </div>
      </nav>
    </div>
  );
}
