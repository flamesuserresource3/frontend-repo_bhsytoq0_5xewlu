import { useEffect, useMemo, useState } from 'react';
import { LogIn, LogOut, User, ShieldAlert, CreditCard } from 'lucide-react';

const defaultProfile = {
  email: '',
  phone: '',
  name: '',
  role: 'customer', // 'host' | 'customer' | 'both'
  city: 'تهران',
};

function AuthModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || defaultProfile);

  useEffect(() => {
    if (open) setForm(initial || defaultProfile);
  }, [open, initial]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl" dir="rtl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">ورود / ثبت‌نام</h3>
          <button onClick={onClose} className="rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">بستن</button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-gray-600">ایمیل</label>
            <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} type="email" placeholder="example@email.com" className="mt-1 w-full rounded-xl border p-2"/>
          </div>
          <div>
            <label className="text-sm text-gray-600">شماره تلفن (اختیاری)</label>
            <input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} type="tel" placeholder="09xxxxxxxxx" className="mt-1 w-full rounded-xl border p-2"/>
          </div>
          <div>
            <label className="text-sm text-gray-600">نام و نام‌خانوادگی</label>
            <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} type="text" placeholder="نام شما" className="mt-1 w-full rounded-xl border p-2"/>
          </div>
          <div>
            <label className="text-sm text-gray-600">شهر</label>
            <select value={form.city} onChange={(e)=>setForm({...form, city:e.target.value})} className="mt-1 w-full rounded-xl border p-2">
              {['تهران','اصفهان','شیراز','مشهد','تبریز'].map(c=> (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">نقش شما</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                {key:'customer', label:'اجاره‌کننده'},
                {key:'host', label:'میزبان'},
                {key:'both', label:'هردو'},
              ].map(r=> (
                <button key={r.key} onClick={()=>setForm({...form, role:r.key})} className={`rounded-xl border p-2 text-sm ${form.role===r.key? 'border-blue-600 bg-blue-50 text-blue-700':'hover:bg-gray-50'}`}>{r.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-100">انصراف</button>
          <button onClick={()=>onSave(form)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <LogIn size={18}/> ذخیره و ورود
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentModal({ open, amount, description, onClose, onSuccess }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" dir="rtl">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-2 text-lg font-bold">زرین‌پال (شبیه‌سازی پرداخت)</h3>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <div className="mb-4 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <span>مبلغ</span>
            <strong>{amount.toLocaleString('fa-IR')} تومان</strong>
          </div>
          <div className="mt-2 text-xs text-gray-500">پرداخت نمایشی برای تست فرایند</div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button className="rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={onClose}>انصراف</button>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700" onClick={() => { setTimeout(()=>{ onSuccess(); onClose(); }, 800); }}>
            <CreditCard size={18}/> پرداخت با زرین‌پال
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NavbarAuth({ onPanic, onCityChange, currentCity }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  const [openAuth, setOpenAuth] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);

  const roleLabel = useMemo(() => {
    if (!profile) return 'ورود';
    return profile.role === 'host' ? 'میزبان' : profile.role === 'both' ? 'هردو' : 'اجاره‌کننده';
  }, [profile]);

  const saveProfile = (p) => {
    setProfile(p);
    localStorage.setItem('userProfile', JSON.stringify(p));
    setOpenAuth(false);
    if (onCityChange) onCityChange(p.city);
  };

  const changeRole = (role) => {
    if (!profile) { setOpenAuth(true); return; }
    if (profile.role === role) return;
    setPendingRole(role);
    setOpenPay(true);
  };

  const applyRoleChange = () => {
    if (!pendingRole) return;
    const updated = { ...profile, role: pendingRole };
    setProfile(updated);
    localStorage.setItem('userProfile', JSON.stringify(updated));
    setPendingRole(null);
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem('userProfile');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3" dir="rtl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-700">رایجا</span>
            <span className="hidden text-sm text-gray-500 sm:block">بازار هوشمند اشتراک‌گذاری فضاهای خالی</span>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border px-3 py-2 text-sm" value={currentCity} onChange={(e)=>onCityChange && onCityChange(e.target.value)}>
              {['تهران','اصفهان','شیراز','مشهد','تبریز'].map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={onPanic} className="flex items-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-white hover:bg-rose-700">
              <ShieldAlert size={18}/> زنگ خطر
            </button>
            {profile ? (
              <div className="flex items-center gap-2">
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-bold">{profile.name || 'کاربر رایجا'}</div>
                  <div className="text-xs text-gray-500">نقش: {roleLabel}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>changeRole('customer')} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">اجاره‌کننده</button>
                  <button onClick={()=>changeRole('host')} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">میزبان</button>
                  <button onClick={()=>changeRole('both')} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">هردو</button>
                </div>
                <button onClick={logout} className="flex items-center gap-1 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
                  <LogOut size={18}/> خروج
                </button>
              </div>
            ) : (
              <button onClick={()=>setOpenAuth(true)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                <LogIn size={18}/> ورود / ثبت‌نام
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal open={openAuth} onClose={()=>setOpenAuth(false)} onSave={saveProfile} initial={profile || defaultProfile}/>
      <PaymentModal open={openPay} amount={45000} description="هزینه تغییر نقش کاربری" onClose={()=>{ setOpenPay(false); setPendingRole(null); }} onSuccess={applyRoleChange}/>
    </header>
  );
}
