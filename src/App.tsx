import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';
import { Intro } from './std/Intro';
import { Hero } from './std/Hero';
import { DateReveal } from './std/DateReveal';
import { Closing } from './std/Closing';
import { FallingLeaves } from './std/FallingLeaves';
import { still } from './std/still';


export default function App() {
  const [opened, setOpened] = useState(still);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/paulyudin-wedding-485932.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const play = () =>
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});

  const handleOpen = () => {
    play();
    setOpened(true);
  };

  const toggleMusic = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  return (
    <div className="std-root">
      <AnimatePresence>{!opened && <Intro key="intro" onOpen={handleOpen} />}</AnimatePresence>

      {opened && (
        <>
          <motion.button
            className="std-music"
            onClick={toggleMusic}
            aria-label={playing ? 'Pause music' : 'Play music'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            {playing ? <Music size={17} /> : <VolumeX size={17} />}
          </motion.button>
          <FallingLeaves />
        </>
      )}

      <main className="std-main" aria-hidden={!opened}>
        <Hero ready={opened} />
        <DateReveal />
        <Closing />
      </main>
    </div>
  );
}
