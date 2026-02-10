
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { GridPanel } from './GridPanel';

export const FragmentGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Very restrained reaction to mouse for delicate parallax
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Soft springs for buttery motion
  const springX = useSpring(mousePos.x, { stiffness: 15, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 15, damping: 30 });

  return (
    <motion.div 
      className="relative w-full h-full matte-finish"
      style={{
        x: springX,
        y: springY,
      }}
    >
      {/* 
          Global Floating Container: 
          The whole grid drifts as one, like a camera on a gimbal.
      */}
      <motion.div 
        className="grid grid-cols-12 grid-rows-12 gap-4 md:gap-8 h-full w-full"
        animate={{
          y: [-5, 5, -5],
          rotate: [-0.2, 0.2, -0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Subtle caption above the central image */}
        <div className="col-start-4 col-span-6 row-start-1 row-span-1 flex items-end justify-center">
          <span className="text-[clamp(0.7rem,1.2vw,0.95rem)] font-light tracking-[0.12em] text-white/70">
            Stories told in light and shadow
          </span>
        </div>

        {/* Central Focus */}
        <GridPanel 
          className="col-start-4 col-span-6 row-start-2 row-span-10 z-20"
          image="https://i.pinimg.com/736x/85/a6/d0/85a6d0fa36c079f4c8b34869273b18d6.jpg"
          parallaxIntensity={1.2}
          isCentral
          delay={0}
        />

        {/* Surrounding Fragments */}
        <GridPanel 
          className="col-start-1 col-span-3 row-start-1 row-span-4"
          image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
          parallaxIntensity={0.8}
          delay={0.2}
        />

        <GridPanel 
          className="col-start-1 col-span-3 row-start-5 row-span-8"
          image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          parallaxIntensity={1.0}
          delay={0.4}
        />

        <GridPanel 
          className="col-start-10 col-span-3 row-start-1 row-span-7"
          image="https://i.pinimg.com/1200x/64/d8/2a/64d82adbd37088db42ead64b82ae2ea6.jpg"
          parallaxIntensity={0.9}
          delay={0.3}
        />

        <GridPanel 
          className="col-start-10 col-span-3 row-start-8 row-span-5"
          image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
          parallaxIntensity={1.1}
          delay={0.5}
        />
      </motion.div>
    </motion.div>
  );
};
