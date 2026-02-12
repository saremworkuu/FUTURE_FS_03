import React from 'react';
import type { ThemeMode } from '../App';

interface FooterProps {
  theme: ThemeMode;
}

const Icon: React.FC<{ name: 'map' | 'phone' | 'mail'; className?: string }> = ({ name, className }) => {
  const common = 'w-4 h-4';
  if (name === 'map') {
    return (
      <svg className={`${common} ${className ?? ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg className={`${common} ${className ?? ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }
  return (
    <svg className={`${common} ${className ?? ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" fill="none" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
};

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-neutral-900' : 'bg-neutral-100';
  const text = isDark ? 'text-white/80' : 'text-black/80';
  const subtle = isDark ? 'text-white/60' : 'text-black/60';

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 64; // account for fixed header
    window.scrollTo({ top: Math.max(offset, 0), behavior: 'smooth' });
  };

  return (
    <footer className={`w-full ${bg} ${text} pt-12 pb-8`}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Brand + blurb + socials */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 border-l-4 border-t-4 border-white/70" />
            </div>
            <div className="text-sm font-semibold tracking-[0.2em] uppercase">Shadow & Light</div>
          </div>
          <p className={`text-xs ${subtle} max-w-xs mb-4`}>
            Minimal, moody photography captured with editorial restraint. Grain, tone and light — curated in a cinematic archive.
          </p>
          <div className="flex items-center gap-3">
            {['twitter','instagram','youtube'].map((key) => (
              <a key={key} aria-label={key} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition">
                <span className="text-xs">{key === 'youtube' ? '▶' : key === 'instagram' ? '◎' : '✦'}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Middle: Our Store / Links */}
        <div>
          <div className="text-sm font-semibold tracking-[0.18em] uppercase mb-3">Our Store</div>
          <ul className={`text-xs ${subtle} space-y-2`}>
            <li><button className="hover:text-white transition" onClick={() => scrollToId('hero')}>Home</button></li>
            <li><button className="hover:text-white transition" onClick={() => scrollToId('about')}>About</button></li>
            <li><button className="hover:text-white transition" onClick={() => scrollToId('services')}>Service</button></li>
            <li><button className="hover:text-white transition" onClick={() => scrollToId('contact')}>Contact</button></li>
          </ul>
        </div>
        {/* Right: Get In Touch */}
        <div>
          <div className="text-sm font-semibold tracking-[0.18em] uppercase mb-3">Get In Touch</div>
          <ul className={`text-xs ${subtle} space-y-3`}>
            <li className="flex items-center gap-3"><Icon name="map" /><span>2443 Oak Ridge Omaha, QA 45065</span></li>
            <li className="flex items-center gap-3"><Icon name="phone" /><span>207‑8767‑452</span></li>
            <li className="flex items-center gap-3"><Icon name="mail" /><span>ShadowLight@gmail.com</span></li>
          </ul>
        </div>
      </div>

      <div className={`mt-8 text-center text-[11px] ${subtle}`}>
        Copyright © {new Date().getFullYear()} Shadow & Light Archive | Powered by Shadow & Light
      </div>
    </footer>
  );
};

export default Footer;
