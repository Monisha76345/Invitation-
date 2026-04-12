import './ReceptionLetter.css';

export default function ReceptionLetter() {
  return (
    <section className="reception-letter" aria-label="Wedding reception message">
      <div className="reception-letter__content">
        <h2 className="reception-letter__heading">Dear friends and family!</h2>
        <p className="reception-letter__body">
          We are thrilled to announce a special event happening in ths joyful season — our
          wedding reception! This day wouldn&apos;t be complete without our
          closest loved ones, so we warmly invite you to join us and celebrate
          this joyful occasion together.
        </p>
        <p className="reception-letter__closing">
          We can&apos;t wait to share this memorable moment with you!
        </p>
      </div>
    </section>
  );
}
