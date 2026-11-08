import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeartDivider } from './Ornaments';
import { still } from './still';

const EVENT = new Date(2026, 11, 27, 19, 30); // Sunday, 27 December 2026, 7:30 PM

const DISCS = [
  { label: 'Month', value: 'Dec' },
  { label: 'Day', value: '27' },
  { label: 'Year', value: '2026' },
];

export function DateReveal() {
  const [revealed, setRevealed] = useState<boolean[]>(() => DISCS.map(() => still));
  const allRevealed = revealed.every(Boolean);

  const reveal = (i: number) =>
    setRevealed((r) => r.map((v, j) => (j === i ? true : v)));

  return (
    <section className="reveal" id="reveal">
      <motion.div
        className="reveal-head"
        initial={still ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
      >
        <p className="caps reveal-kicker">Our special day is</p>
        {!allRevealed && <h3 className="script reveal-title">Tap to reveal</h3>}
      </motion.div>

      <div className="discs">
        {DISCS.map((d, i) => (
          <motion.button
            key={d.label}
            className="disc"
            onClick={() => reveal(i)}
            aria-label={revealed[i] ? `${d.label}: ${d.value}` : `Reveal ${d.label}`}
            initial={still ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, type: 'spring', bounce: 0.4 }}
          >
            <motion.div
              className="disc-flip"
              animate={{ rotateY: revealed[i] ? 180 : 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="disc-face disc-front">
                <span className="disc-shine" />
                <span className="caps disc-tap">Tap</span>
              </div>
              <div className="disc-face disc-back">
                <span className="caps disc-label">{d.label}</span>
                <span className={`disc-value ${d.value.length > 2 ? 'is-long' : ''}`}>
                  {d.value}
                </span>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            className="reveal-details"
            initial={still ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="when">
              <span className="caps">Sunday</span>
              <span className="when-dot" />
              <span className="caps">At 7:30 PM</span>
            </div>

            <Calendar />
            <Countdown />

            <h3 className="script reveal-title reveal-outro">See you there</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <img src="/leaves-bottom.png" alt="" className="leaf-art leaf-art-reveal" />
    </section>
  );
}

function Calendar() {
  const year = EVENT.getFullYear();
  const month = EVENT.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  return (
    <div className="cal">
      <div className="cal-head">
        <span className="script cal-month">December</span>
        <span className="caps cal-year">{year}</span>
      </div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="cal-dow">
            {d}
          </span>
        ))}
        {cells.map((n, i) => (
          <span key={i} className={`cal-day ${n === EVENT.getDate() ? 'is-event' : ''}`}>
            {n}
            {n === EVENT.getDate() && (
              <>
                <svg className="cal-circle" viewBox="0 0 60 60" aria-hidden>
                  <motion.path
                    d="M30 6 C 46 5, 55 17, 54 31 C 53 46, 41 55, 28 54 C 14 53, 5 43, 6 29 C 7 16, 18 7, 33 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={still ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.6, duration: 1.4, ease: 'easeInOut' }}
                  />
                </svg>
                <motion.svg
                  className="cal-heart"
                  viewBox="0 0 24 24"
                  aria-hidden
                  initial={still ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.8, type: 'spring', bounce: 0.6 }}
                >
                  <path
                    fill="currentColor"
                    d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3.1 5 6.5 5c2 0 3.6 1.1 4.5 2.6C11.9 6.1 13.5 5 15.5 5 18.9 5 21 8.4 19.6 11.7 17.5 16.4 12 21 12 21z"
                  />
                </motion.svg>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, EVENT.getTime() - now);
  const parts = [
    { v: Math.floor(diff / 86400000), l: 'Days' },
    { v: Math.floor(diff / 3600000) % 24, l: 'Hours' },
    { v: Math.floor(diff / 60000) % 60, l: 'Minutes' },
    { v: Math.floor(diff / 1000) % 60, l: 'Seconds' },
  ];

  return (
    <div className="countdown">
      <HeartDivider width="min(60vw, 260px)" />
      <div className="countdown-row">
        {parts.map((p) => (
          <div key={p.l} className="countdown-item">
            <span className="countdown-num">{String(p.v).padStart(2, '0')}</span>
            <span className="caps countdown-label">{p.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
