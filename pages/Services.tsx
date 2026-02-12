import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ThemeMode } from '../App';

function MarqueeAndDetails({
  services,
  cardClasses,
  bodyTextClasses,
}: {
  services: { title: string; desc: string; img?: string; short?: string }[];
  cardClasses: string;
  bodyTextClasses: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const baseTrackRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const detailsByTitle: Record<string, string> = {
    'Product & Brand':
      'Showcase your products or brand visually without leaving anyone out. Our photography emphasizes textures, shapes, and contrasts so that details stand out even when colors are challenging. Ideal for e-commerce, catalogs, social media, or promotional campaigns where clarity and accessibility are key.',
    Portrait:
      'From individual headshots to family portraits, we create images that truly represent you. Using careful lighting, contrast, and color adjustments, our portraits are visually striking and inclusive. Every smile, expression, and feature is captured clearly, making these photos ideal for personal keepsakes, professional profiles, or gifts.',
    'Event & Party':
      'Whether it’s a birthday, anniversary, or corporate gathering, we document events with attention to detail and accessibility. Our photos emphasize movement, expressions, and interactions, ensuring that the energy and atmosphere of your event are preserved clearly — even for viewers with color vision differences.',
    'Wedding & Engagement':
      'Capture the magic of your special day with photos that highlight every emotion and detail. Our color-blind-friendly approach ensures that rings, flowers, decorations, and moments between you and your partner are vivid, clear, and memorable — no detail lost due to color limitations. Perfect for couples who want their wedding memories to be beautiful and accessible to everyone.',
  };
  const [items, setItems] = useState(services);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  useEffect(() => {
    const path = window.location.pathname || '';
    const parts = path.split('/').filter(Boolean);
    if (parts.length >= 2 && parts[0] === 'services') setSelected(parts.slice(1).join('/'));

    const onPop = () => {
      const p = window.location.pathname.split('/').filter(Boolean);
      if (p.length >= 2 && p[0] === 'services') setSelected(p.slice(1).join('/'));
      else setSelected(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Ensure the duplicated track covers viewport; we still measure but we animate via RAF below
  useEffect(() => {
    const scroll = scrollRef.current;
    const base = baseTrackRef.current;
    if (!scroll || !base) return;

    const compute = () => {
      // ensure base track measurement exists so the RAF wrap can use it
      const trackW = base.scrollWidth;
      scroll.style.setProperty('--sa-track-width', `${trackW}px`);
    };

    compute();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(compute);
      ro.observe(base);
      ro.observe(scroll);
    } else {
      window.addEventListener('resize', compute);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', compute);
    };
  }, []);

  // Auto carousel: moves horizontally and rotates items like a circle (no manual infinite scroll).
  useEffect(() => {
    const track = baseTrackRef.current;
    if (!track) return;

    const speed = 36; // px per second
    let raf = 0;
    let last = performance.now();
    let offset = 0;

    const computeStep = () => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return 0;
      const rect = first.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(track).gap || '0') || 0;
      return rect.width + gap;
    };

    function tick(now: number) {
      const dt = Math.max(0, (now - last) / 1000);
      last = now;
      const step = computeStep();
      offset += speed * dt;
      if (step > 0 && offset >= step) {
        offset -= step;
        // Rotate first item to the end
        setItems((prev) => {
          if (!prev.length) return prev;
          const [first, ...rest] = prev;
          return [...rest, first];
        });
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      track.style.transform = '';
    };
  }, []);

  const openService = (title: string) => {
    const slug = slugify(title);
    history.pushState({}, '', `/services/${slug}`);
    setSelected(slug);
  };

  const close = () => {
    history.pushState({}, '', '/services');
    setSelected(null);
  };

  if (selected) {
    const svc = services.find((s) => slugify(s.title) === selected);
    if (!svc) return <div className="sa-detail">Service not found</div>;
    return (
      <div className="sa-detail">
        <button className="sa-back" onClick={close} aria-label="Back to services">
          ← Back
        </button>
        <article>
          <h2 className="text-3xl font-bold mb-4">{svc.title}</h2>
          <p className={bodyTextClasses + ' mb-6'}>{svc.desc}</p>
          <div className={bodyTextClasses}>
            <p>{detailsByTitle[svc.title] || ''}</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="sa-auto" aria-hidden="false">
      <div className="sa-marquee" ref={scrollRef}>
        <div className="sa-track sa-track--base" ref={baseTrackRef}>
          {items.map((s) => {
            const imgSrc = s.img || `https://placehold.co/800x600?text=${encodeURIComponent(s.title)}`;
            const short = (s as any).short || s.title.split(' ').slice(0, 2).join(' ');
            return (
              <div key={s.title} className="sa-card-wrap">
                <button
                  className={`sa-card ${cardClasses}`}
                  onClick={() => openService(s.title)}
                  aria-label={s.title}
                >
                  <img className="sa-card-media" src={imgSrc} alt={s.title} />
                </button>
                <div className="sa-card-short">{short}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: 'Wedding & Engagement',
    desc: 'Elegant coverage and storytelling for couples and ceremonies.',
    short: 'Wedding & Engagement',
    img: 'https://i.pinimg.com/1200x/64/8d/fc/648dfc06390e1795c2e52bcba1a16264.jpg'
  },
  {
    title: 'Portrait',
    desc: 'Thoughtful portrait sessions with cinematic tone and pacing.',
    short: 'Portrait',
    img: 'https://i.pinimg.com/736x/85/6e/77/856e77a1e3c17f589d4daf4fd1e7bebe.jpg'
  },
  {
    title: 'Event & Party',
    desc: 'Atmospheric documentation of events, parties and special moments.',
    short: 'Event & Party',
    img: 'https://i.pinimg.com/736x/00/16/33/0016331847bf211df68857efca6db344.jpg'
  },
  {
    title: 'Product & Brand',
    desc: 'Visual storytelling and product features aligned to brand identity.',
    short: 'Product & Brand',
    img: 'https://i.pinimg.com/736x/d1/49/94/d14994ccd31fd76776dd421413745f09.jpg'
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
          Clear, high-contrast photography crafted for everyone. Simple process, meaningful images
        </p>

        {/* Auto-scrolling marquee with click-to-open details (scoped to Services.tsx) */}
        <div className="sa-outer">
          {/* detail view when a service is selected via URL or click */}
          <MarqueeAndDetails
            services={services}
            cardClasses={cardClasses}
            bodyTextClasses={bodyTextClasses}
          />
        </div>

        <style>{`
          /* Marquee & detail scoped styles */
          .sa-outer { width: 100%; }

          /* Auto-scroll container: hide overflow; carousel controls transform, not native scroll */
          .sa-auto { overflow: hidden; }
          .sa-marquee { display: flex; width: 100%; overflow: hidden; align-items: stretch; }
          .sa-marquee::-webkit-scrollbar { display: none; }
          .sa-track { display: flex; gap: 1rem; align-items: stretch; }
          .sa-track--base { padding-left: 0.5rem; will-change: transform; }

          .sa-card-wrap { display: inline-flex; flex-direction: column; align-items: center; }
          .sa-card-media { width: 100%; height: 100%; background: transparent; object-fit: cover; border-radius: inherit; display: block; }
          .sa-card-short { margin-top: 0.75rem; text-align: center; font-weight: 600; }

          /* Base: mobile sizing and subtle gap */
          .sa-card { flex: 0 0 72%; box-sizing: border-box; position: relative; min-height: 220px; transition: box-shadow 260ms cubic-bezier(0.22,1,0.36,1), transform 260ms cubic-bezier(0.22,1,0.36,1); display: inline-flex; padding: 0 !important; }
          .sa-track .sa-card + .sa-card { margin-left: 0; }

          /* Desktop: reduced size and height, maintain spacing */
          @media(min-width: 768px) {
            .sa-card { flex: 0 0 30%; min-height: 260px; }
            .sa-track { gap: 1.25rem; padding-left: 0; }
          }

          /* No CSS keyframe animation — JS RAF controls continuous scroll */

          /* Detail view */
          .sa-detail { padding: 1rem 0; }
          .sa-back { background: transparent; border: none; color: inherit; font-size: 1rem; margin-bottom: 1rem; cursor: pointer; }
        `}</style>
      </div>
    </motion.section>
  );
};

export default Services;
