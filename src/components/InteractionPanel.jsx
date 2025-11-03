import { useMemo, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

function ChatModal({ open, onClose, toName }){
  const presets = [
    'سلام، این فضا تخفیف هم داره؟',
    'امکان اجاره ساعتی هست؟',
    'دسترسی پارکینگ چطوره؟',
    'آدرس دقیق رو می‌فرمایید؟',
    'امکان بازدید حضوری هست؟',
  ];
  const [msg, setMsg] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" dir="rtl">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-bold">چت درون برنامه با {toName}</div>
          <button onClick={onClose} className="rounded-xl px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">بستن</button>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {presets.map((p,idx)=> (
            <button key={idx} onClick={()=>setMsg(p)} className="rounded-full bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200">{p}</button>
          ))}
        </div>
        <div className="h-40 w-full rounded-xl border p-2 text-center text-sm text-gray-400">محیط گفتگو (نمونه نمایشی)</div>
        <div className="mt-3 flex items-center gap-2">
          <input value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="پیام خود را بنویسید" className="w-full rounded-xl border p-2"/>
          <button onClick={()=>{ if(msg.trim()) { alert('پیام ارسال شد: '+msg); setMsg(''); } }} className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">ارسال</button>
        </div>
      </div>
    </div>
  );
}

export default function InteractionPanel({ selectedSpace }){
  const [openChat, setOpenChat] = useState(false);
  const phoneNumbers = useMemo(()=> [
    '021-9100-1234', '021-4455-7788', '021-9130-5566'
  ],[]);

  if (!selectedSpace) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12" dir="rtl">
      <div className="rounded-2xl border p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-black">در ارتباط با: {selectedSpace.title}</div>
            <div className="text-sm text-gray-500">میزبان: {selectedSpace.host} • ویژگی‌ها: {selectedSpace.attrs ? selectedSpace.attrs.join('، ') : '—'}</div>
          </div>
          <div className="text-sm font-bold text-emerald-600">{selectedSpace.price?.toLocaleString('fa-IR')} تومان</div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-3">
            <div className="mb-2 text-sm font-bold">تماس تلفنی سریع</div>
            <div className="space-y-2">
              {phoneNumbers.map((p,i)=> (
                <a key={i} href={`tel:${p}`} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm hover:bg-white">
                  <span>{p}</span>
                  <Phone size={16}/>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 p-3">
            <div className="mb-2 text-sm font-bold">چت درون برنامه</div>
            <p className="mb-3 text-xs text-gray-500">با دکمه زیر گفتگو را آغاز کنید و از پرسش‌های آماده مانند «سلام، تخفیف هم داره؟» استفاده کنید.</p>
            <button onClick={()=>setOpenChat(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <MessageCircle size={18}/> شروع گفتگو
            </button>
          </div>
          <div className="rounded-2xl bg-gray-50 p-3">
            <div className="mb-2 text-sm font-bold">راهنما</div>
            <ul className="list-inside list-disc text-xs text-gray-600">
              <li>برای رزرو، ابتدا تاریخ و مدت زمان را در بخش رزرو انتخاب کنید.</li>
              <li>می‌توانید از یک ساعت تا یک سال بازه رزرو تنظیم کنید.</li>
              <li>در صورت بروز مشکل از «زنگ خطر» استفاده کنید.</li>
            </ul>
          </div>
        </div>
      </div>
      <ChatModal open={openChat} onClose={()=>setOpenChat(false)} toName={selectedSpace.host}/>
    </section>
  );
}
