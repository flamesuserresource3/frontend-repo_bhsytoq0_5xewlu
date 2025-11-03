import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ElegantNavbar from './components/ElegantNavbar';
import HeroSpline from './components/HeroSpline';
import FeaturedGrid from './components/FeaturedGrid';
import AppFooter from './components/AppFooter';
import FontLoader from './components/FontLoader';

function LoginModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative w-[92vw] max-w-md rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-5 shadow-2xl">
        <div className="text-center mb-4">
          <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">ورود / ثبت‌نام</div>
          <div className="text-sm text-white/70 mt-1">با موبایل وارد شو و شروع کن</div>
        </div>
        <div className="space-y-3">
          <input placeholder="شماره موبایل" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none text-white/90" />
          <button className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-bold py-2">دریافت کد</button>
          <button onClick={onClose} className="w-full rounded-xl border border-white/15 text-white/80 hover:bg-white/10 py-2">بستن</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Compose a font stack — FontLoader injects the actual files
  const appFont = useMemo(() => ({ fontFamily: "'Vazirmatn', 'Shabnam', system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Arabic', sans-serif" }), []);

  return (
    <div dir="rtl" style={appFont} className="min-h-screen text-white bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.15),transparent_40%),#0b1220]">
      <FontLoader />

      <div className="mx-auto max-w-7xl px-4">
        <ElegantNavbar onLoginClick={() => setOpen(true)} />

        <main className="mt-6">
          <HeroSpline onSearch={(q) => setQuery(q)} />
          <FeaturedGrid onSelect={(item) => alert(`رزرو «${item.title}» — ${item.price}`)} />

          <AnimatePresence>
            {query && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                <div className="text-sm text-white/80">نتایج برای: «{query}» — در نسخه نمایشی، نتایج نمونه نمایش داده می‌شود.</div>
              </motion.div>
            )}
          </AnimatePresence>

          <AppFooter />
        </main>
      </div>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
