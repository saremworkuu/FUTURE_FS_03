import React, { useState } from 'react';
import type { ThemeMode } from '../App';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 64; // navbar height (~16 * 4)
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - offset;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
};

const NavButton: React.FC<{ targetId: string; children: React.ReactNode }> = ({ targetId, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(targetId);
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm tracking-wide text-white/90 hover:text-white transition-colors"
    >
      {children}
    </button>
  );
};

interface NavBarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId('hero');
    setOpen(false);
  };

  const isDark = theme === 'dark';
  const headerClasses = isDark
    ? 'fixed top-0 left-0 right-0 z-[70] backdrop-blur-sm bg-black/30 border-b border-white/5'
    : 'fixed top-0 left-0 right-0 z-[70] backdrop-blur-sm bg-white/70 border-b border-black/10';

  const titleClasses = isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-black';

  return (
    <header className={headerClasses}>
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-6">
          <a href="#hero" onClick={handleLogoClick} className={titleClasses}>Shadow & Light</a>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavButton targetId="hero">Home</NavButton>
          <NavButton targetId="about">About</NavButton>
          <NavButton targetId="gallery">Gallery</NavButton>
          <NavButton targetId="services">Services</NavButton>
          <NavButton targetId="contact">Contact</NavButton>

          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-4 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-colors
              border-white/40 text-white/80 hover:text-white hover:border-white
              md:w-9 md:h-9"
          >
            {isDark ? '☀' : '🌙'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 rounded-md border border-white/10 bg-white/5 flex items-center justify-center"
          >
            {/* Simple hamburger svg */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke={isDark ? '#FFFFFF' : '#111827'} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 12H20" stroke={isDark ? '#FFFFFF' : '#111827'} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 17H20" stroke={isDark ? '#FFFFFF' : '#111827'} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className={`md:hidden absolute top-16 left-0 right-0 z-[80] ${isDark ? 'bg-black/95 border-t border-white/5 text-white' : 'bg-white/95 border-t border-black/10 text-black'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              <button onClick={() => { scrollToId('hero'); setOpen(false); }} className="text-left py-2">Home</button>
              <button onClick={() => { scrollToId('about'); setOpen(false); }} className="text-left py-2">About</button>
              <button onClick={() => { scrollToId('gallery'); setOpen(false); }} className="text-left py-2">Gallery</button>
              <button onClick={() => { scrollToId('services'); setOpen(false); }} className="text-left py-2">Services</button>
              <button onClick={() => { scrollToId('contact'); setOpen(false); }} className="text-left py-2">Contact</button>
              <div className="pt-2">
                <button onClick={() => { onToggleTheme(); setOpen(false); }} className="py-2">{isDark ? 'Switch to Light' : 'Switch to Dark'}</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
