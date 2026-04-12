import './EventTimelineSection.css';

const EVENTS = [
  {
    dateLine: 'SATURDAY 25.04.26',
    title: 'RECEPTION (BRIDE)',
    rows: [{ time: '7:30 PM', label: 'Reception' }],
    venue:
      'Sri Maharshi Valmiki Bhavana, Near T.B. Circle, Sunkadakatte Road, Honnali Tq, Davanagere District',
  },
  {
    dateLine: 'SUNDAY 26.04.26',
    title: 'MUHURTAM',
    rows: [{ time: '8:32 AM to 09:05 AM', label: 'Muhurtam' }],
    venue:
      'Sri Maharshi Valmiki Bhavana, Near T.B. Circle, Sunkadakatte Road, Honnali Tq, Davanagere District',
  },
  {
    dateLine: 'TUESDAY 28.04.26',
    title: 'RECEPTION (GROOM)',
    rows: [{ time: '11:00 AM', label: 'Reception' }],
    venue:
      "Groom's Residence, Gandhinagar, Sindhanur Tq, Raichur District",
  },
];

function FrameOrnament() {
  return (
    <div className="timeline-card__ornament" aria-hidden="true">
      <span className="timeline-card__line" />
      <span className="timeline-card__dot" />
      <span className="timeline-card__line" />
    </div>
  );
}

export default function EventTimelineSection() {
  return (
    <section
      className="event-timeline-section"
      aria-label="Wedding event schedule"
    >
      <header className="event-timeline-section__header">
        <p className="event-timeline-section__eyebrow">Event timeline</p>
        <p className="event-timeline-section__names">Aravind & Bhuvana</p>
      </header>

      <div className="event-timeline-section__list">
        {EVENTS.map((ev) => (
          <article key={ev.title} className="timeline-card">
            <FrameOrnament />
            <div className="timeline-card__body">
              <p className="timeline-card__date">{ev.dateLine}</p>
              <h2 className="timeline-card__title">{ev.title}</h2>
              <dl className="timeline-card__schedule">
                {ev.rows.map((row) => (
                  <div key={row.time} className="timeline-card__row">
                    <dt>{row.time}</dt>
                    <dd>{row.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="timeline-card__venue">{ev.venue}</p>
            </div>
            <FrameOrnament />
          </article>
        ))}
      </div>
    </section>
  );
}
