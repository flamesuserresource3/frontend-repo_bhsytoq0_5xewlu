import { useState } from 'react';
import ElegantNavbar from './components/ElegantNavbar';
import HeroSpline from './components/HeroSpline';
import FeaturedGrid from './components/FeaturedGrid';
import AppFooter from './components/AppFooter';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl">
      <ElegantNavbar />
      <HeroSpline onSearch={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />

      <section id="features" className="relative -mt-10 pb-2">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[{
              title: 'رزرو سریع و روان',
              desc: 'کمتر از ۳ دقیقه تا نهایی شدن رزرو (نمایشی)',
              color: 'from-blue-600 to-indigo-600',
            },{
              title: 'پرداخت امن نمایشی',
              desc: 'تجربه پرداخت شبیه‌سازی‌شده با جزئیات واقعی',
              color: 'from-violet-600 to-fuchsia-600',
            },{
              title: 'پوشش شهری گسترده',
              desc: 'تهران، اصفهان، مشهد، تبریز، شیراز و بیشتر',
              color: 'from-emerald-600 to-teal-600',
            }].map((f, i) => (
              <div key={i} className={`rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}>
                <div className={`inline-block rounded-2xl bg-gradient-to-l ${f.color} px-3 py-1 text-xs font-bold text-white`}>{f.title}</div>
                <div className="mt-2 text-sm text-gray-600">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedGrid onSelect={(it) => setSelected(it)} />

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl" dir="rtl">
            <img src={selected.img} alt={selected.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="mb-2 text-lg font-extrabold">{selected.title}</div>
              <div className="text-sm text-gray-600">در {selected.city} — قیمت از {selected.price.toLocaleString('fa-IR')} تومان</div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setSelected(null)} className="rounded-2xl px-4 py-2 text-gray-700 hover:bg-gray-100">بستن</button>
                <button onClick={() => { setSelected(null); alert('رزرو شما با موفقیت (نمایشی) ثبت شد.'); }} className="rounded-2xl bg-gradient-to-l from-blue-600 to-violet-600 px-4 py-2 font-bold text-white">رزرو سریع</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AppFooter />
    </div>
  );
}
