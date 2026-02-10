import React from 'react';
import { motion } from 'framer-motion';
import type { ThemeMode } from '../App';

interface AboutProps {
  theme: ThemeMode;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const sectionClasses = isDark
    ? 'min-h-screen bg-black text-white pt-28 pb-20'
    : 'min-h-screen bg-[#f5f5f5] text-black pt-28 pb-20';
  const bodyTextClasses = isDark 
    ? 'text-[clamp(0.95rem,1.2vw,1.125rem)] text-white/70 leading-[1.7]'
    : 'text-[clamp(0.95rem,1.2vw,1.125rem)] text-black/70 leading-[1.7]';
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.6 }}
      className={sectionClasses}
    >
      <div className="max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)] grid md:grid-cols-12 gap-[clamp(1rem,3vw,2.5rem)] items-start">
        {/* Left: portrait with outline frame, proportional to layout */}
        <div className="relative md:col-span-5 w-full max-w-[clamp(14rem,36vw,22rem)] mx-auto md:mx-0">
          <div className="relative aspect-[3/4] bg-neutral-900/60 overflow-hidden border border-white/10">
            <img
              src="https://i.pinimg.com/1200x/06/48/09/06480926d7e6bea59d7ce1326ef1732e.jpg"
              alt="Photographer with camera"
              className="w-full h-full object-cover grayscale"
              loading="lazy"
            />
          </div>
          <div className="hidden md:block absolute top-[-0.5rem] left-[-0.5rem] w-full h-full border border-white/40 pointer-events-none z-20" />
        </div>

        {/* Right: heading, copy and lower image */}
        <div className="md:col-span-7 flex flex-col justify-start">
          <div className="mb-6">
            <div className="inline-block">
              <span className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[0.25em] uppercase">
                ABOUT US
              </span>
            </div>
          </div>

          <p className={`${bodyTextClasses} mb-[clamp(0.7rem,1.8vw,0.95rem)]`}>
            My name is Victoria and I am a photographer who is in love with the magic of the moment. For me, photography is more than just images; it is the stories told through the lens, the emotions captured in the frame, and the unforgettable moments that stay with you forever.
          </p>
          <p className={`${bodyTextClasses} mb-[clamp(0.7rem,1.8vw,0.95rem)]`}>
            My journey into the world of photography began 8 years ago when I first picked up a camera and felt there was no way I could ignore the beauty around me. Since then, I haven&apos;t stopped. I bring a calm but clear creative energy, seeking out honest, interesting angles, and light that turns every moment into a story.
          </p>
          <p className={`${bodyTextClasses} mb-[clamp(0.9rem,2.2vw,1.4rem)]`}>
            I believe that every person is beautiful in their own way, and my goal is to show this beauty in every picture. My style is a combination of naturalness, sincerity and warmth that gives your story a unique atmosphere.
          </p>

          <div className="relative mt-[clamp(0.8rem,2vw,1.2rem)] w-full max-w-[clamp(18rem,38vw,28rem)] mx-auto">
            <div className="relative aspect-[4/3] bg-neutral-900/60 overflow-hidden border border-white/10 flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/d2/6e/f4/d26ef479eb4e0301a08ef6eab6cce02d.jpg"
                  alt="Side profile photographer"
                  className="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
            </div>
            <div className="hidden md:block absolute top-[-0.4rem] left-[-0.4rem] w-full h-full border border-white/40 pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
