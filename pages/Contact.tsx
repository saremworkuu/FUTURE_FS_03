import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ThemeMode } from '../App';

interface ContactProps {
  theme: ThemeMode;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Minimal placeholder behavior; user can wire to endpoint
    alert('Message submitted — integrate a backend to send.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.6 }}
      className={
        theme === 'dark'
          ? 'min-h-screen bg-black text-white pt-28 pb-20'
          : 'min-h-screen bg-[#f5f5f5] text-black pt-28 pb-20'
      }
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact & Location</h1>
          <p className="text-white/70 mb-6">For enquiries, bookings and collaborations, send a brief message below. Responses within 48 hours.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-neutral-900/40 border border-white/5 rounded-md px-4 py-3 text-white outline-none" />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-neutral-900/40 border border-white/5 rounded-md px-4 py-3 text-white outline-none" />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} required className="w-full bg-neutral-900/40 border border-white/5 rounded-md px-4 py-3 text-white outline-none resize-none" />
            </div>

            <div>
              <button className="px-6 py-3 bg-white/6 text-white rounded-md hover:bg-white/10 transition">Send Message</button>
            </div>
          </form>
        </div>

        <div className="w-full h-96 rounded-lg overflow-hidden border border-white/5">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197150751467!2d-122.4194151846811!3d37.77492977975995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5f2f1f1b%3A0x123456789abcdef0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1600000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) brightness(0.6) invert(0.06)' }}
            loading="lazy"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
