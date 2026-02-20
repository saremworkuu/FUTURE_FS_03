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
            <a aria-label="Instagram" href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7.5 10.5V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M7.5 8.5C8.328 8.5 9 7.828 9 7C9 6.172 8.328 5.5 7.5 5.5C6.672 5.5 6 6.172 6 7C6 7.828 6.672 8.5 7.5 8.5Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M11.5 14.5C11.5 13.12 12.62 12 14 12C15.38 12 16.5 13.12 16.5 14.5V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M11.5 12H16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </a>

            <a aria-label="Facebook" href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54v-2.89h2.54V9.846c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.877h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="currentColor" />
              </svg>
            </a>
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
