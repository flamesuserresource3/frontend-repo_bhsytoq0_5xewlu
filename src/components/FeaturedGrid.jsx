import { Star, MapPin } from 'lucide-react';

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: ['پارکینگ سرپوشیده','انبار کوچک','فضای کار اشتراکی','دفتر روزانه','سوله تمیز','پارکینگ حیاط','میز کار ساعتی','انباری ساختمان'][i % 8],
  city: ['تهران','شیراز','اصفهان','تبریز','مشهد'][i % 5],
  rating: (4 + (i % 2) + Math.random() * 0.5).toFixed(1),
  price: 50000 + i * 15000,
  img: `https://images.unsplash.com/photo-${['1493238792000-8113da705763','1554995207-c18c203602cb','1524758631624-e2822e304c36','1554995207-83ef6a2b6fd7','1519710164239-da123dc03ef4','1522708323590-d24dbb6b0267','1550565118-3a14e8a3d72b','1560448070-4328e2eae24d'][i % 8]}?auto=format&fit=crop&w=1200&q=60`,
}));

export default function FeaturedGrid({ onSelect }) {
  return (
    <section id="listings" className="relative bg-gradient-to-b from-white to-gray-50 py-16" dir="rtl">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">پیشنهادهای داغ امروز</h2>
            <p className="mt-1 text-sm text-gray-600">بر اساس محبوبیت و امتیاز کاربران</p>
          </div>
          <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">مشاهده همه</a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <button key={it.id} onClick={() => onSelect?.(it)} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white text-start shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-44 w-full overflow-hidden">
                <img src={it.img} alt={it.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-800 shadow">
                  {it.price.toLocaleString('fa-IR')} تومان
                </div>
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <div className="line-clamp-1 text-sm font-extrabold">{it.title}</div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs">{it.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin size={14} />
                  {it.city}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
