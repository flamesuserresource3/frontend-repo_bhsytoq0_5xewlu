import { Shield, Github, Heart } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="mt-16 mb-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <div className="text-lg font-bold">رایجا — آینده رزرو فضا</div>
            <div className="text-sm text-white/60">طراحی با عشق برای فارسی‌زبانان، راست‌چین و امن</div>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <a className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15" href="#" rel="noreferrer">
              <Shield className="w-4 h-4" />
              حریم خصوصی و امنیت
            </a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15" href="#" rel="noreferrer">
              <Github className="w-4 h-4" />
              گیت‌هاب
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-white/60 flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-fuchsia-400" />
          ساخته شده با فونت‌های وزیر و شبنم
        </div>
      </div>
    </footer>
  );
}
