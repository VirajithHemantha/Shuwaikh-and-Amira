import { useMemo, type CSSProperties } from 'react';

const COLORS = ['#9dbba6', '#b9cfc0', '#c8b48e', '#8fae9b', '#d6e2d8'];

/** A few soft watercolor-tone leaves drifting down the screen. */
export function FallingLeaves({ count = 12 }: { count?: number }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 14,
        duration: 14 + Math.random() * 12,
        delay: -Math.random() * 26,
        drift: (Math.random() - 0.5) * 160,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );

  return (
    <div className="falling" aria-hidden>
      {leaves.map((l, i) => (
        <span
          key={i}
          className="falling-leaf"
          style={
            {
              left: `${l.left}%`,
              width: l.size,
              height: l.size * 1.6,
              animationDuration: `${l.duration}s`,
              animationDelay: `${l.delay}s`,
              '--drift': `${l.drift}px`,
              '--leaf': l.color,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 20 32">
            <path d="M10 1 C 18 9, 18 22, 10 31 C 2 22, 2 9, 10 1 Z" fill="var(--leaf)" />
            <path d="M10 4 L10 30" stroke="rgba(255,255,255,.55)" strokeWidth="0.8" />
          </svg>
        </span>
      ))}
    </div>
  );
}
