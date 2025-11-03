import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';

const cats = [
  { key: 'parking', label: 'پارکینگ' },
  { key: 'storage', label: 'انبار و سوله' },
  { key: 'workshop', label: 'کارگاه‌ها' },
  { key: 'cowork', label: 'فضای کار اشتراکی' },
  { key: 'showcase', label: 'ویترین صنایع دستی' },
  { key: 'house', label: 'خانه و ویلا' },
  { key: 'carseat', label: 'صندلی ماشین' },
];

function makeData(city){
  const data = [];
  cats.forEach(cat => {
    for (let i=0;i<25;i++){
      data.push({
        id: `${cat.key}-${city}-t-${i}`,
        rank: i+1,
        city,
        category: cat.key,
        title: `${cat.label} ممتاز ${i+1}`,
        host: `کاربر ${i+10}`,
        rating: Math.round((Math.random()*2+3)*10)/10,
        reviews: Math.round(Math.random()*200),
        price: Math.round(Math.random()*300+50)*1000,
        img: `https://source.unsplash.com/400x300/?${cat.key},space&sig=${city}-${i}`,
        traits: [
          Math.random()>0.5?'خوش‌برخورد':'وقت‌شناس',
          Math.random()>0.5?'فضای تمیز':'دسترسی خوب',
        ],
      })
    }
  })
  return data;
}

export default function ListingsAndCategories({ city, onBook }){
  const [data, setData] = useState(() => makeData(city));
  const [category, setCategory] = useState('parking');

  useEffect(()=>{ setData(makeData(city)); },[city]);

  const items = useMemo(()=> data.filter(d => d.category===category),[data, category]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" dir="rtl">
      <h3 className="mb-6 text-2xl font-black">دسته‌بندی‌ها و فضاهای نمونه در {city}</h3>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
        {cats.map(c => (
          <button key={c.key} onClick={()=>setCategory(c.key)} className={`rounded-2xl border p-3 text-center text-sm shadow-sm transition ${category===c.key? 'border-blue-600 bg-blue-50 text-blue-700':'hover:bg-gray-50'}`}>
            <div className="font-bold">{c.label}</div>
            <div className="mt-1 text-xs text-gray-500">۲۵ فضای خالی</div>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border shadow-sm">
        <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-bold text-gray-600">
          <div className="col-span-1">رتبه</div>
          <div className="col-span-4">عنوان</div>
          <div className="col-span-2">میزبان</div>
          <div className="col-span-2">امتیاز</div>
          <div className="col-span-2">قیمت</div>
          <div className="col-span-1 text-left">رزرو</div>
        </div>
        <div className="divide-y">
          {items.map(item => (
            <div key={item.id} className="grid grid-cols-12 items-center gap-3 p-3">
              <div className="col-span-1 text-center font-bold">{item.rank}</div>
              <div className="col-span-4 flex items-center gap-3">
                <img src={item.img} alt="" className="h-16 w-24 flex-none rounded-xl object-cover"/>
                <div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.traits.join(' • ')}</div>
                </div>
              </div>
              <div className="col-span-2 text-sm">{item.host}</div>
              <div className="col-span-2 flex items-center gap-1 text-sm">
                <Star size={16} className="text-amber-400"/> {item.rating.toFixed(1)} <span className="text-xs text-gray-400">({item.reviews.toLocaleString('fa-IR')})</span>
              </div>
              <div className="col-span-2 text-sm font-bold text-emerald-600">{item.price.toLocaleString('fa-IR')} تومان</div>
              <div className="col-span-1 text-left">
                <button onClick={()=>onBook && onBook(item)} className="rounded-xl bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700">رزرو</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
