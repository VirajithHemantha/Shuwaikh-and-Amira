export function HeartDivider({ width = 'min(46vw, 240px)' }: { width?: string }) {
  return (
    <div className="orn-divider" style={{ width }}>
      <span />
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3.1 5 6.5 5c2 0 3.6 1.1 4.5 2.6C11.9 6.1 13.5 5 15.5 5 18.9 5 21 8.4 19.6 11.7 17.5 16.4 12 21 12 21z"
        />
      </svg>
      <span />
    </div>
  );
}

export function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className="orn-flourish"
      viewBox="0 0 100 20"
      aria-hidden
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M2 12 C 18 4, 30 18, 46 10 S 70 6, 78 11 C 84 14, 90 12, 92 9 C 94 6, 90 4, 87 7 C 85 9, 88 12, 92 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="97" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Ampersand() {
  return (
    <div className="orn-amp-row">
      <Flourish />
      <span className="orn-amp">&amp;</span>
      <Flourish flip />
    </div>
  );
}
