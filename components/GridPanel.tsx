
import React from 'react';
import { motion } from 'framer-motion';

interface GridPanelProps {
  className: string;
  image: string;
  parallaxIntensity?: number;
  isCentral?: boolean;
  delay?: number;
  isDark?: boolean;
}

export const GridPanel: React.FC<GridPanelProps> = ({ 
  className, 
  image, 
  parallaxIntensity = 1, 
  isCentral = false,
  delay = 0,
  isDark = true
}) => {
  // Randomize durations slightly for organic, non-uniform motion
  // Made a bit faster so the hero motion is clearly visible
  const driftDuration = isCentral ? 14 : 18 + Math.random() * 4;
  const panX = (Math.random() - 0.5) * 40 * parallaxIntensity;
  const panY = (Math.random() - 0.5) * 40 * parallaxIntensity;

  return (
    <motion.div
      className={`relative overflow-hidden ${isDark ? 'bg-neutral-950 border border-white/5 shadow-2xl' : 'bg-neutral-50 border border-black/5 shadow-md'} ${className}`}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 2, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }}
    >
      {/* 
          Liquid Motion: This mimics the "floating" camera work. 
          The image scales slowly while panning in a subtle loop.
      */}
      <motion.div
        className="absolute inset-x-[-15%] inset-y-[-15%] w-[130%] h-[130%]"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, panX, 0],
          y: [0, panY, panY * 0.5, 0],
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{ 
          duration: driftDuration, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <img 
          src={`${image}?grayscale&auto=format&fit=crop&w=1200&q=80`} 
          alt="Cinematic Fragment"
          className={`w-full h-full object-cover filter brightness-[0.8] contrast-[1.2] grayscale saturate-0 ${isDark ? '' : 'brightness-[1.05]'}`}
          loading="lazy"
        />
        
        {/* Soft light sweeps mimicking natural studio light changes */}
        <motion.div 
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-white/[0.05] via-transparent to-black/20' : 'bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.04]'}`}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </motion.div>

      {/* Surface Shadow for extra depth */}
      <div className={`absolute inset-0 pointer-events-none z-10 ${isDark ? 'shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]' : 'shadow-[inset_0_0_40px_rgba(0,0,0,0.08)]'}`} />
      
      {/* Subtle Scanline/Texture Overlay to match video archival feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
    </motion.div>
  );
};
