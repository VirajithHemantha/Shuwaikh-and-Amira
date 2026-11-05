import { motion } from 'motion/react';
import { Ampersand, HeartDivider } from './Ornaments';
import { still } from './still';

const up = (ready: boolean, delay: number) => ({
  initial: still ? false : { opacity: 0, y: 22, filter: 'blur(6px)' },
  animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { delay, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] as const },
});

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section className="hero">
      <motion.img
        src="/leaves-top.png"
        alt=""
        className="leaf-art leaf-art-top"
        initial={still ? false : { opacity: 0, x: 40, y: -40 }}
        animate={ready ? { opacity: 1, x: 0, y: 0 } : undefined}
        transition={{ delay: 0.6, duration: 2, ease: 'easeOut' }}
      />
      <motion.img
        src="/leaves-bottom.png"
        alt=""
        className="leaf-art leaf-art-bottom"
        initial={still ? false : { opacity: 0, x: -40, y: 40 }}
        animate={ready ? { opacity: 1, x: 0, y: 0 } : undefined}
        transition={{ delay: 0.8, duration: 2, ease: 'easeOut' }}
      />

      <div className="hero-inner">
        <motion.h1 className="script hero-title" {...up(ready, 1.0)}>
          Save the Date
        </motion.h1>
        <motion.div {...up(ready, 1.3)}>
          <HeartDivider />
        </motion.div>
        <motion.p className="caps hero-kicker" {...up(ready, 1.5)}>
          You are invited for the
          <br />
          <span>Wedding Reception of</span>
        </motion.p>

        <motion.h2 className="script hero-name" {...up(ready, 1.8)}>
          Shuwaikh Faleel
        </motion.h2>
        <motion.div {...up(ready, 2.1)}>
          <Ampersand />
        </motion.div>
        <motion.h2 className="script hero-name" {...up(ready, 2.3)}>
          Amira Badawy
        </motion.h2>
      </div>

      <motion.a
        href="#reveal"
        className="scroll-cue"
        initial={still ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="caps">Reveal the date</span>
        <span className="scroll-cue-line" />
      </motion.a>
    </section>
  );
}
