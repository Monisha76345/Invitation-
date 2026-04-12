import React from 'react';
import GalleryMarquee from './GalleryMarquee.jsx';
import './GalleryPage.css';

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <header className="gallery-page__header">
        <h1 className="gallery-page__title">Our Moments</h1>
        <p className="gallery-page__subtitle">
          Come celebrate the beginning of our forever with us.
        </p>
      </header>

      <GalleryMarquee />

      <p className="gallery-page__footer">
        <a className="gallery-page__back" href="#/">
          Back to invitation
        </a>
      </p>
    </div>
  );
}
