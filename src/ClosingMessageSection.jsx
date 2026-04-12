import './ClosingMessageSection.css';
import coupleClosing from './assets/couple-closing-card.png';

export default function ClosingMessageSection() {
  return (
    <section className="closing-message-card" aria-label="Closing message">
      <div className="closing-message-card__image-wrap">
        <img
          src={coupleClosing}
          alt="Aravind and Bhuvana"
          className="closing-message-card__image"
          decoding="async"
        />
        <div className="closing-message-card__image-gradient" aria-hidden="true" />
      </div>

      <div className="closing-message-card__panel">
        <p className="closing-message-card__script">Hope to see you there!</p>
        <p className="closing-message-card__script">We Welcome You and your family!</p>
        <p className="closing-message-card__names">Aravind &amp; Bhuvana</p>
        <span className="closing-message-card__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41 1.01 4.5 2.09C11.09 5.01 12.76 4 14.5 4 16.58 4 18 5.42 18 7.5c0 3.78-3.4 6.86-8.55 11.54L12 20.35z"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
