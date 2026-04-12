import './DressCodeSection.css';
import look1 from './assets/dress-code-look-1.png';
import look2 from './assets/dress-code-look-2.png';

/**
 * Hand-drawn style swoop like Tilda “Nikkah + KK” row: thin light gray,
 * dips then rises toward the Polaroid; open V arrowhead on the curve end.
 * `toward` is the horizontal direction of the photo from the text block.
 */
function DressCodeArrow({ toward }) {
  const mirror = toward === 'left';
  return (
    <svg
      className="dress-code-arrow"
      viewBox="0 0 138 46"
      aria-hidden="true"
    >
      <g transform={mirror ? 'translate(138 0) scale(-1 1)' : undefined}>
        {/* Slight wobble in handles reads closer to a sketched line */}
        <path
          className="dress-code-arrow__shaft"
          d="M 10 7 C 9 22, 22 38, 52 41 C 82 44, 112 36, 126 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="dress-code-arrow__head"
          d="M 118 24 L 126 28 L 122 33"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

const ROWS = [
  {
    key: 'look-one',
    name: 'Aravind',
    image: look1,
    alt: 'Aravind',
    polaroidClass: 'dress-code-polaroid--cw',
    arrowToward: 'right',
    rowClass: 'dress-code-row--text-first',
  },
  {
    key: 'look-two',
    name: 'Bhuvana',
    image: look2,
    alt: 'Bhuvana',
    polaroidClass: 'dress-code-polaroid--ccw',
    arrowToward: 'left',
    rowClass: 'dress-code-row--photo-first',
  },
];

export default function DressCodeSection() {
  return (
    <section className="dress-code-section" aria-label="Moments">
      <header className="dress-code-section__header">
        <h2 className="dress-code-section__title">Moments</h2>
        {/* <p className="dress-code-section__lede">A little guidance for the camera moments</p> */}
      </header>

      <div className="dress-code-section__rows">
        {ROWS.map((row) => (
          <article
            key={row.key}
            className={`dress-code-row ${row.rowClass}`}
          >
            <div className="dress-code-row__text">
              <p className="dress-code-row__names">
                <span className="dress-code-row__name-line">{row.name}</span>
              </p>
              <div className="dress-code-row__arrow-wrap">
                <DressCodeArrow toward={row.arrowToward} />
              </div>
            </div>

            <figure
              className={`dress-code-polaroid ${row.polaroidClass}`}
            >
              <img src={row.image} alt={row.alt} loading="lazy" decoding="async" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
