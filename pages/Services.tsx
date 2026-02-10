import React from 'react';
import { motion } from 'framer-motion';
import type { ThemeMode } from '../App';

const services = [
  {
    title: 'Portrait Photography',
    desc: 'Studio and environmental portraits with cinematic lighting and editorial direction.'
  },
  {
    title: 'Commercial Photography',
    desc: 'Brand campaigns, product shoots and lookbooks with a premium visual language.'
  },
  {
    title: 'Event Coverage',
    desc: 'Discrete, atmospheric coverage of launches, openings and private events.'
  },
  {
    title: 'Creative Direction',
    desc: 'Concepting, art direction and on-set creative leadership for cohesive storytelling.'
  },
  {
    title: 'Editing & Retouching',
    desc: 'High-end image finishing to maintain texture, tone and cinematic color.'
  }
];

interface ServicesProps {
  theme: ThemeMode;
}

export const Services: React.FC<ServicesProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const sectionClasses = isDark
    ? 'min-h-screen bg-black text-white pt-28 pb-20'
    : 'min-h-screen bg-[#f5f5f5] text-black pt-28 pb-20';
  const cardClasses = isDark
    ? 'bg-neutral-900/40 border border-white/5 p-8 rounded-lg shadow-xl'
    : 'bg-white border border-black/5 p-8 rounded-lg shadow-xl';
  const bodyTextClasses = isDark ? 'text-white/70' : 'text-black/70';
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.6 }}
      className={sectionClasses}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Services</h1>

        <p className={`text-lg max-w-3xl leading-relaxed mb-12 ${bodyTextClasses}`}>
          A concise suite of services delivered with editorial intent and cinematic craft. Large spacing, considered processes, premium results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((s) => (
            <div key={s.title} className={cardClasses}>
              <h2 className="text-2xl font-semibold mb-3">{s.title}</h2>
              <p className={bodyTextClasses}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
