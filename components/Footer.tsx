import React from 'react';
import type { ThemeMode } from '../App';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const textClasses = theme === 'dark' ? 'text-white/60' : 'text-black/60';
  return (
    <footer className={`w-full text-center py-6 text-sm ${textClasses}`}>
      <div className="max-w-6xl mx-auto px-6">© {new Date().getFullYear()} Cinematic Archive — All rights reserved.</div>
    </footer>
  );
};

export default Footer;
