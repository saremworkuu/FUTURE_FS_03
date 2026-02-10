import React from 'react';
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
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId('hero');
  };

  const isDark = theme === 'dark';
  const headerClasses = isDark
    ? 'fixed top-0 left-0 right-0 z-[70] backdrop-blur-sm bg-black/30 border-b border-white/5'
    : 'fixed top-0 left-0 right-0 z-[70] backdrop-blur-sm bg-white/70 border-b border-black/10';

  const titleClasses = isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-black';

  return (
    <header className={headerClasses}>
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#hero" onClick={handleLogoClick} className={titleClasses}>Cinematic</a>
        </div>

        <div className="flex items-center gap-8">
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
      </nav>
    </header>
  );
};

export default NavBar;
