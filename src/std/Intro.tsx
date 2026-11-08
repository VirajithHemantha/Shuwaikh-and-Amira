import { motion } from 'motion/react';

const ease = [0.7, 0, 0.2, 1] as const;

export function Intro({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="intro"
      exit={{ pointerEvents: 'none' }}
      transition={{ duration: 1.6 }}
      onClick={onOpen}
      role="button"
      aria-label="Open invitation"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
    >
      {/* Two paper panels that part like doors */}
      <motion.div
        className="intro-panel intro-panel-left"
        exit={{ x: '-102%' }}
        transition={{ duration: 1.5, ease, delay: 0.35 }}
      />
      <motion.div
        className="intro-panel intro-panel-right"
        exit={{ x: '102%' }}
        transition={{ duration: 1.5, ease, delay: 0.35 }}
      />

      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="intro-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          You have a special message
        </motion.p>

        <motion.div
          className="seal"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, type: 'spring', bounce: 0.35 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="seal-pulse" />
          <img className="seal-img" src="/sa_seal.png" alt="S & A wax seal" draggable={false} />
        </motion.div>

        <motion.p
          className="intro-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
