import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragmentGrid } from '../components/FragmentGrid';
import { FilmOverlay } from '../components/FilmOverlay';

export const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full bg-black overflow-hidden pt-16 flex items-stretch justify-center"
    >
      {/* Removed radial gradient so the hero background is solid black */}

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full h-[calc(100vh-4rem)] p-6 md:p-16 lg:p-24"
          >
            <FragmentGrid />
          </motion.div>
        )}
      </AnimatePresence>

      <FilmOverlay />

      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/dust.png')] bg-repeat" />
    </section>
  );
};

export default Home;
