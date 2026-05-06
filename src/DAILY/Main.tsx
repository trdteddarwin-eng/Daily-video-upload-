import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENES ────────────────────────────────────────────────────────────────────
// Scene 1: Two houses, neighbor's new car vs your old car, envy arrow
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [5, 30], [-80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const newCarScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 14, stiffness: 140 }, durationInFrames: 35 });
  const arrowOp = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagPulse = interpolate(frame, [90, 115, 140, 165], [1, 1.1, 1, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `translateY(${titleY}px)`, opacity: titleOp,
      }}>
        <p style={headline(58, ACCENT)}>THE JONESES</p>
        <p style={headline(58, WHITE)}>EFFECT</p>
      </div>

      {/* Main scene SVG */}
      <svg viewBox="0 0 1080 900" width="1080" height="900"
        style={{ position: 'absolute', left: 0, top: 280 }}>

        {/* ── Neighbor's house (left) ── */}
        <rect x="30" y="320" width="420" height="330" rx="6" fill="#1C1C1C" stroke={ACCENT} strokeWidth="3" />
        {/* Roof */}
        <polygon points="30,320 240,130 450,320" fill="#252525" stroke={ACCENT} strokeWidth="3" />
        {/* Window */}
        <rect x="160" y="360" width="160" height="120" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="2" />
        <line x1="240" y1="360" x2="240" y2="480" stroke="#444" strokeWidth="2" />
        <line x1="160" y1="420" x2="320" y2="420" stroke="#444" strokeWidth="2" />
        {/* Neighbor label */}
        <text x="240" y="520" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#888">NEIGHBOR</text>

        {/* Neighbor's new car */}
        <g transform={`translate(50, 620) scale(${newCarScale})`} style={{ transformOrigin: '185px 50px' }}>
          {/* Car body */}
          <rect x="10" y="25" width="350" height="80" rx="16" fill={ACCENT} />
          {/* Roof */}
          <polygon points="60,25 100,0 280,0 320,25" fill="#D97706" />
          {/* Windshield */}
          <polygon points="65,25 100,4 180,4 190,25" fill="#0D0D0D" opacity="0.7" />
          <polygon points="195,25 270,4 305,4 325,25" fill="#0D0D0D" opacity="0.7" />
          {/* Wheels */}
          <circle cx="75" cy="105" r="30" fill="#1A1A1A" stroke="#555" strokeWidth="6" />
          <circle cx="75" cy="105" r="14" fill="#333" />
          <circle cx="295" cy="105" r="30" fill="#1A1A1A" stroke="#555" strokeWidth="6" />
          <circle cx="295" cy="105" r="14" fill="#333" />
          {/* NEW badge */}
          <rect x="130" y="35" width="110" height="30" rx="6" fill={BLACK} />
          <text x="185" y="56" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={ACCENT} fontWeight="bold">✦ NEW ✦</text>
        </g>

        {/* ── Your house (right) ── */}
        <rect x="630" y="320" width="420" height="330" rx="6" fill="#181818" stroke="#444" strokeWidth="2" />
        <polygon points="630,320 840,130 1050,320" fill="#1E1E1E" stroke="#444" strokeWidth="2" />
        <rect x="750" y="360" width="160" height="120" rx="4" fill="#222" stroke="#333" strokeWidth="2" />
        <line x1="830" y1="360" x2="830" y2="480" stroke="#333" strokeWidth="2" />
        <line x1="750" y1="420" x2="910" y2="420" stroke="#333" strokeWidth="2" />
        <text x="840" y="520" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#555">YOU</text>

        {/* Your old car */}
        <g transform="translate(650, 620)">
          <rect x="10" y="25" width="350" height="80" rx="10" fill="#555" />
          <polygon points="60,25 100,4 280,4 320,25" fill="#444" />
          <polygon points="65,25 100,8 180,8 190,25" fill="#333" opacity="0.7" />
          <polygon points="195,25 270,8 305,8 325,25" fill="#333" opacity="0.7" />
          <circle cx="75" cy="105" r="30" fill="#2A2A2A" stroke="#444" strokeWidth="5" />
          <circle cx="75" cy="105" r="14" fill="#222" />
          <circle cx="295" cy="105" r="30" fill="#2A2A2A" stroke="#444" strokeWidth="5" />
          <circle cx="295" cy="105" r="14" fill="#222" />
        </g>

        {/* Envy arrow */}
        <g opacity={arrowOp}>
          <line x1="460" y1="730" x2="635" y2="730" stroke={RED} strokeWidth="6" strokeDasharray="14,7" />
          <polygon points="635,718 660,730 635,742" fill={RED} />
          <text x="548" y="715" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={RED} letterSpacing="3">ENVY</text>
        </g>

        {/* Dollar drain tag */}
        <g opacity={dollarOp} transform={`scale(${tagPulse})`} style={{ transformOrigin: '840px 810px' }}>
          <rect x="710" y="790" width="260" height="44" rx="10" fill={RED} />
          <text x="840" y="820" textAnchor="middle" fontFamily={FONT} fontSize="26" fill={WHITE}>-$6,200 / YEAR</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── appended below ──

// Scene 2: Two stick figures, comparison arrow, 40% counter, brain icon
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fig1Scale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 140 }, durationInFrames: 30 });
  const fig2Scale = spring({ frame: Math.max(0, frame - 30), fps, from: 0, to: 1, config: { damping: 14, stiffness: 140 }, durationInFrames: 30 });
  const arrowOp = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pct = interpolate(frame, [60, 130], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [60, 130], [0, 440], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp,
      }}>
        <p style={headline(54, BLACK)}>STATUS GAP</p>
        <p style={headline(54, ACCENT)}>SPENDING</p>
      </div>

      <svg viewBox="0 0 1080 1000" width="1080" height="1000"
        style={{ position: 'absolute', left: 0, top: 250 }}>

        {/* Figure 1: neighbor with upgrade star */}
        <g transform={`translate(160, 120) scale(${fig1Scale})`} style={{ transformOrigin: '100px 200px' }}>
          {/* Head */}
          <circle cx="100" cy="60" r="55" fill={ACCENT} />
          {/* Body */}
          <rect x="65" y="115" width="70" height="120" rx="10" fill={ACCENT} />
          {/* Arms */}
          <rect x="20" y="125" width="45" height="18" rx="9" fill={ACCENT} />
          <rect x="115" y="125" width="45" height="18" rx="9" fill={ACCENT} />
          {/* Legs */}
          <rect x="70" y="235" width="25" height="80" rx="8" fill={ACCENT} />
          <rect x="105" y="235" width="25" height="80" rx="8" fill={ACCENT} />
          {/* Star badge */}
          <polygon points="100,0 108,22 132,22 113,36 120,58 100,44 80,58 87,36 68,22 92,22"
            fill="#FFF" stroke={ACCENT} strokeWidth="2" />
          <text x="100" y="280" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={BLACK}>NEIGHBOR</text>
        </g>

        {/* Comparison arrows */}
        <g opacity={arrowOp}>
          <line x1="360" y1="240" x2="620" y2="240" stroke={RED} strokeWidth="6" />
          <polygon points="620,228 648,240 620,252" fill={RED} />
          <text x="490" y="225" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={RED} letterSpacing="2">COMPARISON</text>
        </g>

        {/* Figure 2: you — pulsing red outline */}
        <g transform={`translate(660, 120) scale(${fig2Scale})`} style={{ transformOrigin: '100px 200px' }}>
          <circle cx="100" cy="60" r="55" fill="#DDD" stroke={RED} strokeWidth="5" />
          <rect x="65" y="115" width="70" height="120" rx="10" fill="#CCC" />
          <rect x="20" y="125" width="45" height="18" rx="9" fill="#CCC" />
          <rect x="115" y="125" width="45" height="18" rx="9" fill="#CCC" />
          <rect x="70" y="235" width="25" height="80" rx="8" fill="#CCC" />
          <rect x="105" y="235" width="25" height="80" rx="8" fill="#CCC" />
          {/* Frown */}
          <path d="M76,55 Q100,42 124,55" stroke={RED} strokeWidth="5" fill="none" strokeLinecap="round" />
          <text x="100" y="280" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={BLACK}>YOU</text>
        </g>

        {/* Brain icon */}
        <g opacity={brainOp} transform="translate(390, 420)">
          <ellipse cx="150" cy="80" rx="140" ry="90" fill="none" stroke={BLACK} strokeWidth="5" />
          <line x1="150" y1="0" x2="150" y2="160" stroke={BLACK} strokeWidth="4" strokeDasharray="12,6" />
          <path d="M60,60 Q90,30 120,60 Q90,90 60,60" fill={ACCENT} opacity="0.7" />
          <path d="M180,60 Q210,30 240,60 Q210,90 180,60" fill={ACCENT} opacity="0.7" />
          <text x="150" y="175" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={BLACK}>YOUR BRAIN ON ENVY</text>
        </g>

        {/* 40% counter */}
        <g transform="translate(180, 640)">
          <text x="0" y="70" fontFamily={FONT} fontSize="90" fill={ACCENT}>{Math.round(pct)}%</text>
          <text x="0" y="105" fontFamily={FONT} fontSize="22" fill={BLACK}>MORE LIKELY TO SPLURGE</text>
          {/* Progress bar */}
          <rect x="0" y="115" width="440" height="18" rx="9" fill="#DDD" />
          <rect x="0" y="115" width={barW} height="18" rx="9" fill={ACCENT} />
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 3: Dollar counter $0→$6,200, 30-year bar→$186,000, cracking piggy bank
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearlyAmt = interpolate(frame, [20, 100], [0, 6200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [105, 180], [0, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 130 }, durationInFrames: 30 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp,
      }}>
        <p style={headline(52, WHITE)}>THE REAL</p>
        <p style={headline(52, ACCENT)}>PRICE TAG</p>
      </div>

      <svg viewBox="0 0 1080 1100" width="1080" height="1100"
        style={{ position: 'absolute', left: 0, top: 240 }}>

        {/* Yearly counter */}
        <text x="540" y="130" textAnchor="middle" fontFamily={FONT} fontSize="38" fill="#888">PER YEAR</text>
        <text x="540" y="240" textAnchor="middle" fontFamily={FONT} fontSize="110" fill={RED}>
          ${Math.round(yearlyAmt).toLocaleString()}
        </text>

        {/* Piggy bank */}
        <g transform={`translate(340, 280) scale(${piggyScale})`} style={{ transformOrigin: '200px 160px' }}>
          {/* Body */}
          <ellipse cx="200" cy="160" rx="160" ry="130" fill="#E8A87C" />
          {/* Head */}
          <circle cx="340" cy="130" r="70" fill="#E8A87C" />
          {/* Snout */}
          <ellipse cx="385" cy="148" rx="30" ry="22" fill="#D4856A" />
          <circle cx="378" cy="145" r="7" fill="#C07060" />
          <circle cx="392" cy="145" r="7" fill="#C07060" />
          {/* Eye */}
          <circle cx="358" cy="112" r="8" fill={BLACK} />
          {/* Ear */}
          <ellipse cx="330" cy="72" rx="18" ry="24" fill="#D4856A" />
          {/* Legs */}
          <rect x="100" y="265" width="40" height="55" rx="10" fill="#D4856A" />
          <rect x="160" y="270" width="40" height="50" rx="10" fill="#D4856A" />
          <rect x="230" y="270" width="40" height="50" rx="10" fill="#D4856A" />
          <rect x="290" y="265" width="40" height="55" rx="10" fill="#D4856A" />
          {/* Coin slot */}
          <rect x="175" y="30" width="50" height="10" rx="4" fill="#C07060" />
          {/* Coin falling */}
          <rect x="188" y="0" width="24" height="14" rx="5" fill={ACCENT} />
          {/* Crack */}
          <g opacity={crackOp}>
            <path d="M140,140 L170,180 L150,200 L190,250" stroke={RED} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M260,150 L230,185 L255,205" stroke={RED} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* 30-year bar */}
        <text x="130" y="680" fontFamily={FONT} fontSize="26" fill="#888">30 YEARS INVESTED INSTEAD</text>
        <rect x="130" y="700" width="820" height="40" rx="10" fill="#222" />
        <rect x="130" y="700" width={barW} height="40" rx="10" fill={GREEN} />

        {/* $186,000 total */}
        <g opacity={totalOp}>
          <text x="540" y="810" textAnchor="middle" fontFamily={FONT} fontSize="38" fill="#888">COULD HAVE BEEN</text>
          <text x="540" y="930" textAnchor="middle" fontFamily={FONT} fontSize="130" fill={GREEN}>$186K</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 4: Cascade chain reaction — car→kitchen→sofa→TV→wallet emptying
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'NEW CAR', delay: 10 },
    { label: 'KITCHEN', delay: 45 },
    { label: 'SOFA', delay: 80 },
    { label: 'TV', delay: 115 },
    { label: 'WALLET', delay: 150 },
  ];

  const icons = [
    // Car
    <g key="car">
      <rect x="5" y="25" width="130" height="48" rx="10" fill={ACCENT} />
      <polygon points="20,25 38,8 102,8 120,25" fill="#D97706" />
      <circle cx="28" cy="73" r="16" fill="#1A1A1A" stroke="#888" strokeWidth="4" />
      <circle cx="112" cy="73" r="16" fill="#1A1A1A" stroke="#888" strokeWidth="4" />
    </g>,
    // House / kitchen (house outline)
    <g key="kitchen">
      <rect x="15" y="30" width="110" height="80" rx="4" fill="#DDD" stroke={BLACK} strokeWidth="3" />
      <polygon points="15,30 70,0 125,30" fill="#CCC" stroke={BLACK} strokeWidth="3" />
      <rect x="45" y="55" width="30" height="30" rx="3" fill="#AAA" />
      <rect x="80" y="55" width="30" height="30" rx="3" fill="#AAA" />
    </g>,
    // Sofa
    <g key="sofa">
      <rect x="10" y="40" width="120" height="55" rx="12" fill="#888" />
      <rect x="10" y="30" width="22" height="70" rx="8" fill="#777" />
      <rect x="108" y="30" width="22" height="70" rx="8" fill="#777" />
      <rect x="25" y="28" width="90" height="22" rx="8" fill="#999" />
      <rect x="30" y="88" width="25" height="18" rx="5" fill="#666" />
      <rect x="85" y="88" width="25" height="18" rx="5" fill="#666" />
    </g>,
    // TV
    <g key="tv">
      <rect x="10" y="20" width="120" height="75" rx="6" fill="#222" stroke="#555" strokeWidth="3" />
      <rect x="20" y="28" width="100" height="58" rx="3" fill="#1A3A5C" />
      <rect x="50" y="95" width="40" height="12" rx="3" fill="#333" />
      <rect x="58" y="107" width="24" height="8" rx="3" fill="#444" />
    </g>,
    // Wallet emptying
    <g key="wallet">
      <rect x="20" y="20" width="100" height="75" rx="10" fill="#8B4513" />
      <rect x="80" y="14" width="55" height="40" rx="8" fill="#A0522D" />
      <rect x="85" y="24" width="45" height="22" rx="5" fill="#8B4513" />
      <rect x="25" y="50" width="60" height="8" rx="3" fill="#D4A574" />
      {/* Coins falling */}
      <circle cx="45" cy="100" r="10" fill={ACCENT} />
      <circle cx="70" cy="112" r="8" fill={ACCENT} />
      <circle cx="95" cy="105" r="10" fill={ACCENT} />
    </g>,
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp,
      }}>
        <p style={headline(52, BLACK)}>THE UPGRADE</p>
        <p style={headline(52, ACCENT)}>CASCADE</p>
      </div>

      <svg viewBox="0 0 1080 900" width="1080" height="900"
        style={{ position: 'absolute', left: 0, top: 270 }}>
        {items.map((item, i) => {
          const itemOp = interpolate(frame, [item.delay, item.delay + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const itemY = interpolate(frame, [item.delay, item.delay + 22], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const col = (i % 3) * 320 + 80;
          const row = Math.floor(i / 3) * 320 + 80;

          return (
            <g key={item.label} opacity={itemOp} transform={`translate(${col}, ${row + itemY})`}>
              <rect x="0" y="0" width="200" height="150" rx="16" fill="#FFF" stroke={i === 4 ? RED : ACCENT} strokeWidth={i === 4 ? 5 : 3} />
              <g transform="translate(30, 20)">{icons[i]}</g>
              <text x="100" y="138" textAnchor="middle" fontFamily={FONT} fontSize="19" fill={i === 4 ? RED : BLACK}>{item.label}</text>
              {i < items.length - 1 && (
                <g opacity={interpolate(frame, [item.delay + 25, item.delay + 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                  {i === 1 ? null : (
                    <text x={i < 2 ? 215 : -20} y="85" fontFamily={FONT} fontSize="36" fill={ACCENT}>→</text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* Arrows between items */}
        {[0, 1, 3].map((i) => {
          const arrowOp = interpolate(frame, [items[i].delay + 25, items[i].delay + 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const col = (i % 3) * 320 + 80;
          const row = Math.floor(i / 3) * 320 + 80;
          const nextCol = ((i + 1) % 3) * 320 + 80;
          const nextRow = Math.floor((i + 1) / 3) * 320 + 80;
          const midX = (col + 200 + nextCol) / 2;
          const midY = row + 75;
          return (
            <g key={`arr-${i}`} opacity={arrowOp}>
              {col === nextCol
                ? <polygon points={`${col + 80},${row + 165} ${col + 100},${nextRow - 5} ${col + 120},${row + 165}`} fill={ACCENT} />
                : <polygon points={`${midX - 10},${midY - 14} ${midX + 24},${midY} ${midX - 10},${midY + 14}`} fill={ACCENT} />
              }
            </g>
          );
        })}

        <text x="540" y="830" textAnchor="middle" fontFamily={FONT} fontSize="26" fill={RED}>IT NEVER STOPS — UNLESS YOU DO</text>
      </svg>
    </FadeScene>
  );
};

// Scene 5: Anchor-switching — person in center, up-arrow = broke, down-arrow = rich feeling
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 130 }, durationInFrames: 30 });
  const upOp = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const downOp = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowPulse = interpolate(frame, [100, 140, 180], [0.7, 1, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp,
      }}>
        <p style={headline(50, WHITE)}>ANCHOR</p>
        <p style={headline(50, ACCENT)}>SWITCHING</p>
      </div>

      <svg viewBox="0 0 1080 1200" width="1080" height="1200"
        style={{ position: 'absolute', left: 0, top: 250 }}>

        {/* Center person */}
        <g transform={`translate(440, 380) scale(${personScale})`} style={{ transformOrigin: '100px 160px' }}>
          <circle cx="100" cy="60" r="55" fill={WHITE} />
          <rect x="65" y="115" width="70" height="110" rx="10" fill={WHITE} />
          <rect x="22" y="125" width="43" height="16" rx="8" fill={WHITE} />
          <rect x="115" y="125" width="43" height="16" rx="8" fill={WHITE} />
          <rect x="70" y="225" width="24" height="70" rx="8" fill={WHITE} />
          <rect x="106" y="225" width="24" height="70" rx="8" fill={WHITE} />
          <text x="100" y="320" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={WHITE}>YOU</text>
        </g>

        {/* Up arrow toward mansion */}
        <g opacity={upOp}>
          <line x1="540" y1="365" x2="540" y2="120" stroke={RED} strokeWidth="7" />
          <polygon points="520,125 540,90 560,125" fill={RED} />
          {/* Mansion */}
          <rect x="400" y="30" width="280" height="60" rx="4" fill="#222" stroke={RED} strokeWidth="3" />
          <polygon points="400,30 540,0 680,30" fill="#1A1A1A" stroke={RED} strokeWidth="3" />
          <rect x="500" y="35" width="80" height="50" rx="3" fill="#111" />
          <rect x="420" y="35" width="50" height="35" rx="3" fill="#222" stroke="#333" strokeWidth="1" />
          <rect x="610" y="35" width="50" height="35" rx="3" fill="#222" stroke="#333" strokeWidth="1" />
          <text x="540" y="112" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={RED}>COMPARE UP</text>
        </g>

        {/* Up label */}
        <g opacity={upOp}>
          <rect x="350" y="220" width="380" height="50" rx="10" fill={RED} />
          <text x="540" y="253" textAnchor="middle" fontFamily={FONT} fontSize="24" fill={WHITE}>FEEL BROKE — SPEND MORE</text>
        </g>

        {/* Down arrow toward small house */}
        <g opacity={downOp}>
          <line x1="540" y1="750" x2="540" y2="1020" stroke={ACCENT} strokeWidth="8" opacity={glowPulse} />
          <polygon points="520,1015 540,1055 560,1015" fill={ACCENT} opacity={glowPulse} />
          {/* Small cozy house */}
          <rect x="430" y="1060" width="220" height="100" rx="4" fill="#252525" stroke={ACCENT} strokeWidth="4" />
          <polygon points="430,1060 540,990 650,1060" fill="#1E1E1E" stroke={ACCENT} strokeWidth="4" />
          <rect x="490" y="1080" width="50" height="75" rx="3" fill="#1A1A1A" />
          <rect x="440" y="1085" width="35" height="35" rx="3" fill="#1A3A1A" stroke={ACCENT} strokeWidth="2" />
          <rect x="625" y="1085" width="35" height="35" rx="3" fill="#1A3A1A" stroke={ACCENT} strokeWidth="2" />
          <text x="540" y="1180" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={ACCENT}>COMPARE DOWN</text>
        </g>

        {/* Down label */}
        <g opacity={labelOp}>
          <rect x="280" y="870" width="500" height="50" rx="10" fill={ACCENT} />
          <text x="540" y="903" textAnchor="middle" fontFamily={FONT} fontSize="24" fill={BLACK}>FEEL RICH — SAVE MORE</text>
          <text x="540" y="980" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#888">THE MILLIONAIRE MOVE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 6: CTA — two-path sign FOR THEM vs FOR ME, $186K, follow prompt
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const signScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, config: { damping: 14, stiffness: 140 }, durationInFrames: 35 });
  const amtOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaPulse = interpolate(frame, [150, 180, 210], [1, 1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp,
      }}>
        <p style={headline(48, BLACK)}>ONE QUESTION</p>
        <p style={headline(48, ACCENT)}>WORTH $186K</p>
      </div>

      <svg viewBox="0 0 1080 1200" width="1080" height="1200"
        style={{ position: 'absolute', left: 0, top: 230 }}>

        <text x="540" y="80" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}>AM I SPENDING FOR...</text>

        {/* Signpost */}
        <g transform={`translate(440, 100) scale(${signScale})`} style={{ transformOrigin: '100px 300px' }}>
          <rect x="90" y="60" width="20" height="500" rx="4" fill="#888" />

          {/* FOR THEM sign */}
          <g transform="rotate(-20, 100, 180)">
            <rect x="-160" y="140" width="260" height="72" rx="12" fill={RED} />
            <polygon points="100,140 100,212 130,176" fill={RED} />
            <text x="-30" y="182" textAnchor="middle" fontFamily={FONT} fontSize="26" fill={WHITE}>FOR THEM</text>
            <text x="-30" y="205" textAnchor="middle" fontFamily={FONT} fontSize="16" fill="#FFB3B3">MONEY FLIES AWAY</text>
          </g>

          {/* FOR ME sign */}
          <g transform="rotate(15, 100, 280)">
            <rect x="100" y="240" width="260" height="72" rx="12" fill={ACCENT} />
            <polygon points="100,240 100,312 70,276" fill={ACCENT} />
            <text x="230" y="282" textAnchor="middle" fontFamily={FONT} fontSize="26" fill={BLACK}>FOR ME</text>
            <text x="230" y="305" textAnchor="middle" fontFamily={FONT} fontSize="16" fill={BLACK}>WEALTH GROWS</text>
          </g>
        </g>

        {/* Savings callout */}
        <g opacity={amtOp}>
          <rect x="130" y="720" width="820" height="90" rx="16" fill={ACCENT} />
          <text x="540" y="762" textAnchor="middle" fontFamily={FONT} fontSize="28" fill={BLACK}>THAT ONE QUESTION SAVES YOU</text>
          <text x="540" y="800" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={BLACK}>$186,000 OVER 30 YEARS</text>
        </g>

        {/* Piggy bank */}
        <g opacity={amtOp} transform="translate(390, 840)">
          <ellipse cx="150" cy="100" rx="120" ry="95" fill="#E8A87C" />
          <circle cx="255" cy="80" r="52" fill="#E8A87C" />
          <ellipse cx="292" cy="95" rx="22" ry="16" fill="#D4856A" />
          <circle cx="276" cy="60" r="6" fill={BLACK} />
          <rect x="135" y="20" width="30" height="7" rx="3" fill="#C07060" />
          <rect x="73" y="172" width="30" height="42" rx="8" fill="#D4856A" />
          <rect x="115" y="175" width="30" height="38" rx="8" fill="#D4856A" />
          <rect x="170" y="175" width="30" height="38" rx="8" fill="#D4856A" />
          <rect x="212" y="172" width="30" height="42" rx="8" fill="#D4856A" />
          <circle cx="120" cy="8" r="12" fill={ACCENT} />
          <circle cx="148" cy="2" r="10" fill={ACCENT} />
          <circle cx="170" cy="8" r="12" fill={ACCENT} />
          <text x="150" y="108" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={BLACK}>$186K</text>
        </g>

        {/* Follow CTA */}
        <g opacity={ctaOp} transform={`scale(${ctaPulse})`} style={{ transformOrigin: '540px 1100px' }}>
          <rect x="160" y="1060" width="760" height="90" rx="20" fill={BLACK} />
          <rect x="190" y="1075" width="36" height="58" rx="7" fill={WHITE} />
          <rect x="196" y="1081" width="24" height="42" rx="3" fill={BLACK} />
          <circle cx="208" cy="1128" r="5" fill={WHITE} />
          <text x="560" y="1115" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={WHITE}>FOLLOW FOR 1 TRICK/DAY</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ─── ROOT COMPOSITION ─────────────────────────────────────────────────────────
export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
