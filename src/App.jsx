import { useMemo, useState } from 'react'
import NavbarAuth from './components/NavbarAuth'
import MapExplorer from './components/MapExplorer'
import ListingsAndCategories from './components/ListingsAndCategories'
import InteractionPanel from './components/InteractionPanel'
import { motion } from 'framer-motion'

function BookingModal({ open, onClose, space }){
  const [durationType, setDurationType] = useState('hour');
  const [amount, setAmount] = useState(1);
  if (!open || !space) return null;
  const calcPrice = () => {
    const base = space.price || 100000;
    if (durationType==='hour') return Math.round(base/24) * amount;
    if (durationType==='day') return base * amount;
    return base * 30 * amount; // month approx
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" dir="rtl">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-bold">رزرو: {space.title}</div>
          <button onClick={onClose} className="rounded-xl px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">بستن</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">نوع بازه</label>
            <select value={durationType} onChange={(e)=>setDurationType(e.target.value)} className="mt-1 w-full rounded-xl border p-2">
              <option value="hour">ساعتی</option>
              <option value="day">روزانه</option>
              <option value="month">ماهانه</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">تعداد</label>
            <input type="number" min={1} value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||'1'))} className="mt-1 w-full rounded-xl border p-2"/>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-600">توضیحات برای میزبان</label>
            <textarea className="mt-1 w-full rounded-xl border p-2" rows={3} placeholder="جزئیات مورد نیاز خود را بنویسید"/>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">مبلغ نهایی</div>
          <div className="text-lg font-black text-emerald-600">{calcPrice().toLocaleString('fa-IR')} تومان</div>
        </div>
        <div className="mt-4 text-xs text-gray-500">برای تکمیل رزرو، به درگاه زرین‌پال نمایشی منتقل می‌شوید و پس از پرداخت، سفارش ثبت می‌شود.</div>
        <div className="mt-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-100">انصراف</button>
          <button onClick={()=>{ setTimeout(()=>{ alert('پرداخت موفق بود و سفارش شما ثبت شد (نمایشی)'); onClose(); }, 900); }} className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">پرداخت و ثبت سفارش</button>
        </div>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10" dir="rtl">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-3xl font-black sm:text-5xl">
          هر فضای خالی، یک فرصت درآمدی؛ و هر نیاز فوری، در چند کلیک حل می‌شه
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="mt-4 max-w-3xl text-gray-600">
          رایجا پلتفرم هوشمند اشتراک‌گذاری فضاست؛ پارکینگ، انبار، کارگاه، فضای کار اشتراکی و حتی صندلی ماشین! هم میزبان باش و هم اجاره‌کننده.
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="mt-6 grid grid-cols-2 gap-3 sm:w-[480px]">
          <input placeholder="چه فضایی می‌خوای؟" className="col-span-2 rounded-2xl border p-3 outline-none sm:col-span-1"/>
          <input placeholder="مدت (از یک ساعت تا یک‌سال)" className="col-span-2 rounded-2xl border p-3 outline-none sm:col-span-1"/>
          <button className="col-span-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">جستجو</button>
        </motion.div>
        <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-blue-200/40 blur-3xl"/>
        <div className="pointer-events-none absolute left-[-120px] bottom-[-80px] h-[320px] w-[320px] rounded-full bg-violet-200/40 blur-3xl"/>
      </div>
    </section>
  )
}

export default function App() {
  const [city, setCity] = useState('تهران');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookOpen, setBookOpen] = useState(false);

  const handleBook = (item) => {
    setSelectedSpace(item);
    setBookOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl">
      <NavbarAuth currentCity={city} onCityChange={setCity} onPanic={() => alert('گزارش شما ثبت و به پلیس اعلام شد (نمایشی)')}/>
      <Hero/>
      <MapExplorer city={city} onSelectSpace={(s)=>{ setSelectedSpace(s); window.scrollTo({ top: document.body.scrollHeight/3, behavior: 'smooth' }); }}/>
      <ListingsAndCategories city={city} onBook={handleBook}/>
      <InteractionPanel selectedSpace={selectedSpace}/>
      <footer className="border-t bg-gray-50" dir="rtl">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-2 text-lg font-black">اعتماد و امنیت در رایجا</div>
          <p className="max-w-3xl text-sm text-gray-600">اطلاعات کاربران محفوظ است، زنگ خطر برای موقعیت‌های اضطراری تعبیه شده و تیم پشتیبانی در بخش شکایات همراه شماست. این نسخه جهت نمایش قابلیت‌هاست و پرداخت‌ها و داده‌ها نمایشی هستند.</p>
        </div>
      </footer>

      <BookingModal open={bookOpen} onClose={()=>setBookOpen(false)} space={selectedSpace}/>
    </div>
  )
}
