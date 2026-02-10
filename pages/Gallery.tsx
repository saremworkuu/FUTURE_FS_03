import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ThemeMode } from '../App';

interface GalleryProps {
  theme: ThemeMode;
}

type Category = 'All' | 'Portrait' | 'Editorial' | 'Fashion' | 'Fine Art';

const categories: Category[] = ['All', 'Portrait', 'Editorial', 'Fashion', 'Fine Art'];

// Pinterest reference images supplied by the user (trimmed to remove last row)
const images: { src: string; category: Category }[] = [
  { src: 'https://i.pinimg.com/736x/0b/ae/2e/0bae2e4cfec8c5bfcde1b2b03ce565b6.jpg', category: 'Fashion' },
  { src: 'https://i.pinimg.com/736x/54/53/17/5453177c1853c103787d23d8018c5b79.jpg', category: 'Editorial' },
  { src: 'https://i.pinimg.com/736x/27/f8/23/27f823f8c0e6ca841e3f7e7660f1343c.jpg', category: 'Portrait' },
  { src: 'https://i.pinimg.com/1200x/2c/8d/f5/2c8df52cbf3f21bb2e411cccfe35e5b2.jpg', category: 'Fine Art' },
  { src: 'https://i.pinimg.com/736x/9d/f6/f9/9df6f930ae298d07466849d21d3e3bb6.jpg', category: 'Portrait' },
  { src: 'https://i.pinimg.com/736x/8a/b5/6f/8ab56f37097edc3e7c59522b028361f4.jpg', category: 'Fashion' },
  { src: 'https://i.pinimg.com/736x/1d/22/4b/1d224bcecff038ed1a15137a8d6f40fe.jpg', category: 'Editorial' },
  { src: 'https://i.pinimg.com/736x/7a/db/57/7adb57320b9cb0ff399deddd965c800c.jpg', category: 'Fashion' },
  { src: 'https://i.pinimg.com/1200x/f8/73/fd/f873fd915463d28916a78a9c8fde08eb.jpg', category: 'Fine Art' },
  { src: 'https://i.pinimg.com/736x/e4/85/f3/e485f35e61d50a08184f43c1673f0af6.jpg', category: 'Portrait' },
  { src: 'https://i.pinimg.com/736x/78/18/0f/78180fa2349c0ea340b0551640e759bf.jpg', category: 'Editorial' },
  { src: 'https://i.pinimg.com/736x/cd/b8/2c/cdb82cc105459517cf64758daf8b195b.jpg', category: 'Fashion' },
];

export const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const isDark = theme === 'dark';

  const sectionClasses = isDark
    ? 'bg-black text-white pt-28 pb-20'
    : 'bg-[#f5f5f5] text-black pt-28 pb-20';
  const captionClasses = isDark ? 'text-white/60' : 'text-black/60';

  const pillBase =
    'px-5 py-1.5 rounded-full text-xs tracking-[0.15em] uppercase border transition-colors';

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className={sectionClasses}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-10 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              The Archives
            </h2>
            <p className="text-xs md:text-sm font-medium tracking-[0.18em] uppercase mb-3">
              A CURATION OF HIGH-CONTRAST MOMENTS AND MINIMALIST STUDIES.
            </p>
            <p className={`text-xs md:text-sm max-w-md ${captionClasses}`}>
              A rotating selection of portrait, editorial, fashion and fine art frames.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 md:gap-3 flex-wrap">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              const activeStyles = isActive
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                  ? 'border-white/30 text-white/70 hover:border-white/60 hover:text-white'
                  : 'border-black/20 text-black/70 hover:border-black/60 hover:text-black';

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`${pillBase} ${activeStyles}`}
                >
                  {category.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
          {filteredImages.map(({ src, category }) => (
            <motion.div
              key={src}
              className="relative bg-black overflow-hidden border border-white/5 shadow-xl h-40 md:h-64 lg:h-72 cursor-pointer flex items-center justify-center"
            >
              <img
                src={src}
                alt={`${category} gallery portrait`}
                className="max-w-full max-h-full object-contain grayscale"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
