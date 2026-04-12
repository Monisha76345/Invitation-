import React from 'react';
import './CountdownSection.css';

/** Sunday 26 April 2026 — matches invitation start time (local). */
const EVENT_START = new Date(2026, 3, 26, 8, 32, 0);

/** https://youtube.com/shorts/2QUft_duKQU?si=MQYblkaZzlaf5_DH */
const MUSIC_VIDEO_ID = '2QUft_duKQU';

let youtubeApiPromise = null;

function loadYoutubeIframeApi() {
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }
  });
  return youtubeApiPromise;
}

/** Remaining time from the live clock (not tied to music play/pause). */
function getRemaining(target) {
  const now = Date.now();
  const diff = Math.max(0, target.getTime() - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownSection() {
  const [remaining, setRemaining] = React.useState(() =>
    getRemaining(EVENT_START)
  );
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(true);
  const ytHostRef = React.useRef(null);
  const ytPlayerRef = React.useRef(null);
  const isMusicPlayingRef = React.useRef(isMusicPlaying);

  React.useEffect(() => {
    isMusicPlayingRef.current = isMusicPlaying;
  }, [isMusicPlaying]);

  React.useEffect(() => {
    const tick = () => setRemaining(getRemaining(EVENT_START));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const host = ytHostRef.current;
    if (!host) return undefined;

    loadYoutubeIframeApi().then(() => {
      if (cancelled || !ytHostRef.current || !window.YT?.Player) return;

      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      ytPlayerRef.current = null;

      const player = new window.YT.Player(ytHostRef.current, {
        videoId: MUSIC_VIDEO_ID,
        width: '240',
        height: '160',
        playerVars: {
          playsinline: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: MUSIC_VIDEO_ID,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            if (cancelled) {
              try {
                e.target.destroy();
              } catch {
                /* ignore */
              }
              return;
            }
            if (isMusicPlayingRef.current) {
              try {
                e.target.playVideo();
              } catch {
                /* autoplay may be blocked until user taps play */
              }
            }
          },
        },
      });

      ytPlayerRef.current = player;
    });

    return () => {
      cancelled = true;
      const p = ytPlayerRef.current;
      ytPlayerRef.current = null;
      try {
        p?.destroy?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  React.useEffect(() => {
    const p = ytPlayerRef.current;
    if (!p || typeof p.playVideo !== 'function') return;
    try {
      if (isMusicPlaying) p.playVideo();
      else p.pauseVideo();
    } catch {
      /* ignore */
    }
  }, [isMusicPlaying]);

  const pad2 = (n) => String(n).padStart(2, '0');

  return (
    <section
      className="countdown-section"
      aria-label="Countdown to the wedding reception"
    >
      <div
        ref={ytHostRef}
        className="countdown-yt-host"
        aria-hidden="true"
      />

      <button
        type="button"
        className="countdown-play-fab"
        onClick={() => setIsMusicPlaying((v) => !v)}
        aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isMusicPlaying}
      >
        {isMusicPlaying ? (
          <svg
            className="countdown-play-fab__icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="currentColor" />
            <rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="currentColor" />
          </svg>
        ) : (
          <svg
            className="countdown-play-fab__icon countdown-play-fab__icon--play"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              d="M9 6.5v11L18 12 9 6.5z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>

      <p className="countdown-section__header">The event starts in:</p>

      <div className="countdown-section__timer" aria-live="polite">
        <div className="countdown-section__units">
          <div className="countdown-unit">
            <span className="countdown-unit__value">{remaining.days}</span>
            <span className="countdown-unit__label">Days</span>
          </div>
          <span className="countdown-sep" aria-hidden="true">
            :
          </span>
          <div className="countdown-unit">
            <span className="countdown-unit__value">{pad2(remaining.hours)}</span>
            <span className="countdown-unit__label">Hours</span>
          </div>
          <span className="countdown-sep" aria-hidden="true">
            :
          </span>
          <div className="countdown-unit">
            <span className="countdown-unit__value">
              {pad2(remaining.minutes)}
            </span>
            <span className="countdown-unit__label">Minutes</span>
          </div>
          <span className="countdown-sep" aria-hidden="true">
            :
          </span>
          <div className="countdown-unit">
            <span className="countdown-unit__value">
              {pad2(remaining.seconds)}
            </span>
            <span className="countdown-unit__label">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
