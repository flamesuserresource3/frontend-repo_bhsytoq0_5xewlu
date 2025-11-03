import { useState } from 'react';
import { Rocket, Search, User, Shield, CreditCard } from 'lucide-react';

export default function ElegantNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
            <Rocket size={22} />
          </div>
          <div className="text-xl font-extrabold tracking-tight">رایجا</div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <a className="hover:text-gray-900" href="#features">مزایا</a>
          <a className="hover:text-gray-900" href="#listings">پیشنهادی</a>
          <a className="hover:text-gray-900" href="#pricing">پرداخت نمایشی</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:shadow md:flex">
            <Search size={16} />
            جستجو
          </button>
          <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-2xl bg-gradient-to-l from-blue-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:brightness-110">
            <User size={16} />
            ورود / ثبت‌نام
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50" dir="rtl">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-extrabold">ورود به رایجا</div>
              <button onClick={() => setOpen(false)} className="rounded-xl px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">بستن</button>
            </div>
            <div className="space-y-3">
              <input className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="شماره موبایل" />
              <input className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="کد تایید (نمایشی)" />
              <button onClick={() => setOpen(false)} className="w-full rounded-2xl bg-gradient-to-l from-blue-600 to-violet-600 px-4 py-3 font-bold text-white shadow hover:brightness-110">ورود</button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield size={14} />
                ورود شما امن و نمایشی است
              </div>
              <div id="pricing" className="mt-4 rounded-2xl border bg-gray-50 p-4 text-xs text-gray-600">
                <div className="mb-1 flex items-center gap-2 font-bold text-gray-800"><CreditCard size={14}/> ارتقای نقش به میزبان</div>
                با پرداخت نمایشی ۴۵٬۰۰۰ تومان، نقش شما به «میزبان» ارتقا می‌یابد.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
