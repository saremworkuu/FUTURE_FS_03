
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

export type ThemeMode = 'dark' | 'light';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const shellClasses =
    theme === 'dark'
      ? 'min-h-screen bg-black text-white transition-colors duration-500'
      : 'min-h-screen bg-[#f5f5f5] text-black transition-colors duration-500';

  return (
    <div className={shellClasses}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />

      <main className="pt-0">
        <Home />
        <div id="about">
          <About theme={theme} />
        </div>
        <div id="gallery">
          <Gallery theme={theme} />
        </div>
        <div id="services">
          <Services theme={theme} />
        </div>
        <div id="contact">
          <Contact theme={theme} />
        </div>
      </main>

      <footer className="pt-12">
        <Footer theme={theme} />
      </footer>
    </div>
  );
};

export default App;
