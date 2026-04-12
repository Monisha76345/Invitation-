import React from 'react';
import g1 from './assets/gallery/1.png';
import g2 from './assets/gallery/2.png';
import g3 from './assets/gallery/3.png';
import g4 from './assets/gallery/4.png';
import g5 from './assets/gallery/5.png';
import './GalleryMarquee.css';

const IMAGES = [g1, g2, g3, g4, g5].map((src) => ({
  src,
  alt: 'Aravind and Bhuvana',
}));

export default function GalleryMarquee({ variant = 'page' }) {
  const track = [...IMAGES, ...IMAGES];
  const rootClass =
    variant === 'embed'
      ? 'gallery-marquee gallery-marquee--embed'
      : 'gallery-marquee';

  return (
    <div className={rootClass} role="region" aria-label="Photo gallery">
      <div className="gallery-marquee__inner">
        <div className="gallery-marquee__track">
          {track.map((item, i) => (
            <figure key={`${item.src}-${i}`} className="gallery-marquee__slide">
              <div className="gallery-marquee__frame">
                <img src={item.src} alt={item.alt} decoding="async" />
                <span
                  className="gallery-marquee__overlay"
                  aria-hidden="true"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
