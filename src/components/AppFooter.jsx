import { Github, Shield, Heart } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="border-t bg-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} رایجا — همه حقوق محفوظ است.</div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2 text-sm"><Shield size={16}/> امنیت و حریم خصوصی</div>
            <a className="flex items-center gap-2 text-sm hover:text-gray-900" href="#"><Github size={16}/> گیتهاب</a>
            <div className="flex items-center gap-2 text-sm"><Heart size={16} className="text-rose-500"/> ساخته‌شده با عشق</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
