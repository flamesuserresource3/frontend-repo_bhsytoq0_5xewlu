import { useEffect, useMemo, useState } from 'react';
import { MapPin, Search, Filter, Star } from 'lucide-react';

const cities = {
  'تهران': { lat: 35.701, lon: 51.349 },
  'اصفهان': { lat: 32.653, lon: 51.667 },
  'شیراز': { lat: 29.606, lon: 52.530 },
  'مشهد': { lat: 36.297, lon: 59.605 },
  'تبریز': { lat: 38.070, lon: 46.300 },
};

const categories = [
  { key: 'parking', label: 'پارکینگ' },
  { key: 'storage', label: 'انبار و سوله' },
  { key: 'workshop', label: 'کارگاه‌ها' },
  { key: 'cowork', label: 'فضای کار اشتراکی' },
  { key: 'showcase', label: 'ویترین صنایع دستی' },
  { key: 'house', label: 'خانه و ویلا' },
  { key: 'carseat', label: 'صندلی ماشین' },
];

function randomBetween(min, max) { return Math.random() * (max - min) + min; }

function generateSpaces(city) {
  const res = [];
  const base = cities[city];
  categories.forEach(cat => {
    for (let i = 0; i < 25; i++) {
      const lat = base.lat + randomBetween(-0.05, 0.05);
      const lon = base.lon + randomBetween(-0.08, 0.08);
      res.push({
        id: `${cat.key}-${city}-${i}`,
        city,
        category: cat.key,
        title: `${cat.label} شماره ${i+1} در ${city}`,
        host: `میزبان ${i+1}`,
        rating: Math.round(randomBetween(36, 50)) / 10,
        price: Math.round(randomBetween(50, 400)) * 1000,
        attrs: [
          Math.random()>0.5?'خوش‌برخورد':'پاسخ‌گو',
          Math.random()>0.5?'فضای تمیز':'دسترسی آسان',
          Math.random()>0.5?'امنیت بالا':'منطقه خلوت',
        ],
        lat, lon,
        img: `https://source.unsplash.com/800x600/?${cat.key},${city}&sig=${i+1}`,
      });
    }
  });
  return res;
}

export default function MapExplorer({ city, onSelectSpace }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setSpaces(generateSpaces(city));
  }, [city]);

  const filtered = useMemo(() => {
    return spaces.filter(s => (
      (activeCat === 'all' || s.category === activeCat) &&
      (query.trim()==='' || s.title.includes(query) || s.host.includes(query))
    ));
  }, [spaces, activeCat, query]);

  const center = cities[city];
  const bbox = {
    left: center.lon - 0.12,
    right: center.lon + 0.12,
    top: center.lat + 0.08,
    bottom: center.lat - 0.08,
  };
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.left}%2C${bbox.bottom}%2C${bbox.right}%2C${bbox.top}&layer=mapnik&marker=${center.lat}%2C${center.lon}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black">نقشه هوشمند فضاهای خالی در {city}</h2>
        <div className="text-sm text-gray-500">نتایج: {filtered.length.toLocaleString('fa-IR')}</div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="order-2 md:order-1 md:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border p-3 shadow-sm">
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Search size={18} className="text-gray-500"/>
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="جستجوی عنوان یا میزبان" className="w-full outline-none"/>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={()=>setActiveCat('all')} className={`rounded-xl px-3 py-1 text-sm ${activeCat==='all'?'bg-blue-600 text-white':'bg-gray-100'}`}>همه</button>
                {categories.map(c => (
                  <button key={c.key} onClick={()=>setActiveCat(c.key)} className={`rounded-xl px-3 py-1 text-sm ${activeCat===c.key?'bg-blue-600 text-white':'bg-gray-100'}`}>{c.label}</button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-600"><Filter size={16}/> فضاهای برتر نزدیک شما</div>
              <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
                {filtered.slice(0, 12).map(s => (
                  <button key={s.id} onClick={()=>onSelectSpace && onSelectSpace(s)} className="flex w-full items-center gap-3 rounded-xl p-2 text-right hover:bg-gray-50">
                    <img src={s.img} alt="" className="h-14 w-14 rounded-xl object-cover"/>
                    <div className="flex-1">
                      <div className="line-clamp-1 text-sm font-bold">{s.title}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>میزبان: {s.host}</span>
                        <span className="flex items-center gap-1"><Star size={14} className="text-amber-400"/>{s.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="text-left text-xs font-bold text-emerald-600">{s.price.toLocaleString('fa-IR')} ت</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-2">
          <div className="relative h-[540px] w-full overflow-hidden rounded-2xl border shadow-sm">
            <iframe title="نقشه" src={osm} className="h-full w-full"/>
            {filtered.slice(0, 40).map((s, idx) => {
              // position markers approximately based on lat/lon within bbox
              const x = ((s.lon - bbox.left) / (bbox.right - bbox.left)) * 100;
              const y = (1 - (s.lat - bbox.bottom) / (bbox.top - bbox.bottom)) * 100;
              return (
                <div key={s.id} style={{ left: `${x}%`, top: `${y}%` }} className="absolute -translate-x-1/2 -translate-y-full">
                  <div className="group">
                    <div className="flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 text-[10px] text-white shadow">
                      <MapPin size={12}/> {Math.round(s.price/1000).toLocaleString('fa-IR')} هزارت
                    </div>
                    <div className="pointer-events-none absolute left-1/2 top-6 hidden w-56 -translate-x-1/2 rounded-xl border bg-white p-2 text-right shadow-lg group-hover:block">
                      <img src={s.img} alt="" className="h-24 w-full rounded-lg object-cover"/>
                      <div className="mt-1 text-xs font-bold">{s.title}</div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>میزبان: {s.host}</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-amber-400"/>{s.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
