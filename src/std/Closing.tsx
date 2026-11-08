import { motion } from 'motion/react';
import { still } from './still';

const rise = (delay: number) => ({
  initial: still ? false : { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { delay, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] as const },
});

export function Closing() {
  return (
    <footer className="closing">
      <motion.p className="script closing-names" {...rise(0)}>
        Shuwaikh &amp; <span className="cap-a">A</span>mira
      </motion.p>
      <motion.p className="caps closing-date" {...rise(0.2)}>
        27 · 12 · 2026
      </motion.p>

      <motion.div className="closing-follow" {...rise(0.5)}>
        <span className="closing-rule" />
        <p className="closing-follow-text">
          Invitation to follow
          <span className="closing-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </p>
        <span className="closing-rule" />
      </motion.div>
    </footer>
  );
}
