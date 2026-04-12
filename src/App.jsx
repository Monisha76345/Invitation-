import React from 'react';
import './App.css';
import circleFrame from './assets/circle-frame.png';
import coupleHero from './assets/couple-hero.jpg';
import GalleryMarquee from './GalleryMarquee.jsx';
import ReceptionLetter from './ReceptionLetter.jsx';
import EventTimelineSection from './EventTimelineSection.jsx';
import DressCodeSection from './DressCodeSection.jsx';
import CountdownSection from './CountdownSection.jsx';
import ClosingMessageSection from './ClosingMessageSection.jsx';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      root.style.background = '#ffffff';
      document.body.style.background = '#ffffff';
    } else {
      root.style.background = '';
      document.body.style.background = '';
    }
    return () => {
      root.style.background = '';
      document.body.style.background = '';
    };
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="invitation-container is-open">
        <section className="landing-card" aria-label="Reception invitation">
          <div className="landing-card__text">
            <h1 className="landing-names">Aravind & Bhuvana</h1>
            <p className="landing-lead">We are inviting you to our Marriage!</p>
            <p className="landing-sub">
              Let&apos;s celebrate the best day of our life together!
            </p>
          </div>

          <div className="landing-card__photo">
            <img
              src={coupleHero}
              alt="Aravind and Bhuvana"
              className="landing-card__photo-img"
              decoding="async"
            />
            <div className="landing-card__photo-gradient" aria-hidden="true" />
          </div>

          <div className="landing-after-photo">
            <h2 className="landing-after-photo__title">Our Moments!</h2>
            <p className="landing-after-photo__subtitle">
              Come celebrate the beginning of our forever with us.
            </p>
          </div>

          <div className="landing-marquee-wrap">
            <GalleryMarquee variant="embed" />
          </div>

          <ReceptionLetter />

          <EventTimelineSection />

          <DressCodeSection />

          <CountdownSection />

          <ClosingMessageSection />
        </section>
      </div>
    );
  }

  return (
    <div className="invitation-container is-locked">
      <section className="hero-wrapper hero-wrapper--locked">
        <div className="hero-content">
          <div className="invitation-circle-container">
            <div className="invitation-circle-stack">
              <div className="circle-inner-plate" aria-hidden="true" />
              <img
                className="circle-frame-img"
                src={circleFrame}
                alt=""
                decoding="async"
              />
              <div className="invitation-circle">
                <h2>You're Invited!</h2>
                <p>Join us in making this day unforgettable!</p>
                <button
                  className="discover-btn"
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  Discover the details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
