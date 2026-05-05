import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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
// Scene 1: Hook — person at cobweb gym door, credit card, "PAYING FOR NOTHING?"
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 35], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });
  const cardScale = spring({ frame: Math.max(0, frame - 25), fps, from: 0, to: 1, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });
  const webOp = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardPulse = interpolate(frame, [60, 80, 100, 120], [1, 1.08, 1, 1.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <p style={headline(68, ACCENT)}>PAYING FOR</p>
      </div>
      <div style={{ position: 'absolute', top: 205, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <p style={headline(68, WHITE)}>NOTHING?</p>
      </div>

      {/* Person silhouette + gym door */}
      <svg
        viewBox="0 0 540 700"
        width="540"
        height="700"
        style={{ position: 'absolute', left: '50%', top: 340, transform: `translateX(-50%) scale(${personScale})`, transformOrigin: 'center bottom' }}
      >
        {/* Gym building */}
        <rect x="80" y="200" width="380" height="340" rx="8" fill="#1E1E1E" stroke="#333" strokeWidth="3" />
        <text x="270" y="260" textAnchor="middle" fontFamily={FONT} fontSize="28" fill="#555" letterSpacing="4">GYM</text>

        {/* Door */}
        <rect x="190" y="310" width="160" height="230" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="2" />
        {/* Door handle */}
        <circle cx="336" cy="430" r="10" fill="#555" />

        {/* Chain and lock */}
        <g opacity={webOp}>
          <line x1="190" y1="400" x2="350" y2="400" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          <line x1="190" y1="410" x2="350" y2="410" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 5" />
          {/* Padlock */}
          <rect x="255" y="380" width="30" height="24" rx="4" fill={ACCENT} />
          <path d="M261 380 Q270 368 279 380" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* Cobwebs */}
        <g opacity={webOp}>
          <line x1="80" y1="200" x2="140" y2="260" stroke="#666" strokeWidth="1" />
          <line x1="80" y1="200" x2="80" y2="270" stroke="#666" strokeWidth="1" />
          <line x1="80" y1="200" x2="150" y2="200" stroke="#666" strokeWidth="1" />
          <path d="M80 240 Q110 230 140 260" stroke="#666" strokeWidth="1" fill="none" />
          <path d="M80 270 Q100 240 130 230" stroke="#666" strokeWidth="1" fill="none" />
        </g>

        {/* Person silhouette */}
        <g transform="translate(270, 490)">
          {/* Head */}
          <circle cx="0" cy="-120" r="32" fill={WHITE} />
          {/* Body */}
          <rect x="-22" y="-88" width="44" height="70" rx="8" fill={WHITE} />
          {/* Arms */}
          <line x1="-22" y1="-75" x2="-50" y2="-30" stroke={WHITE} strokeWidth="14" strokeLinecap="round" />
          <line x1="22" y1="-75" x2="50" y2="-30" stroke={WHITE} strokeWidth="14" strokeLinecap="round" />
          {/* Legs */}
          <line x1="-10" y1="-18" x2="-15" y2="50" stroke={WHITE} strokeWidth="14" strokeLinecap="round" />
          <line x1="10" y1="-18" x2="15" y2="50" stroke={WHITE} strokeWidth="14" strokeLinecap="round" />
        </g>
      </svg>

      {/* Credit card */}
      <svg
        viewBox="0 0 320 200"
        width="320"
        height="200"
        style={{ position: 'absolute', right: 60, bottom: 280, transform: `scale(${cardScale * cardPulse})`, transformOrigin: 'center center' }}
      >
        <rect x="0" y="0" width="320" height="200" rx="18" fill="#1A1A2E" stroke={ACCENT} strokeWidth="4" />
        <rect x="0" y="55" width="320" height="45" fill="#16213E" />
        <rect x="24" y="115" width="80" height="12" rx="3" fill="#333" />
        <rect x="24" y="135" width="120" height="12" rx="3" fill="#333" />
        {/* Chip */}
        <rect x="24" y="24" width="48" height="36" rx="5" fill="#C9A84C" />
        <line x1="24" y1="38" x2="72" y2="38" stroke="#A07830" strokeWidth="2" />
        <line x1="24" y1="48" x2="72" y2="48" stroke="#A07830" strokeWidth="2" />
        <line x1="44" y1="24" x2="44" y2="60" stroke="#A07830" strokeWidth="2" />
        <line x1="52" y1="24" x2="52" y2="60" stroke="#A07830" strokeWidth="2" />
        {/* Recurring label */}
        <text x="280" y="175" textAnchor="end" fontFamily={FONT} fontSize="18" fill={ACCENT} letterSpacing="2">MONTHLY</text>
      </svg>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <p style={{ ...headline(34, '#888'), fontFamily: FONT }}>sound familiar?</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Sunk cost fallacy label — brain draining coins, 78% counter
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 }, durationInFrames: 35 });
  const pct = interpolate(frame, [40, 120], [0, 78], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [40, 120], [0, 78], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinDrop1 = interpolate(frame, [30, 70], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinDrop2 = interpolate(frame, [50, 90], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinDrop3 = interpolate(frame, [70, 110], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp1 = interpolate(frame, [30, 45, 65, 72], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp2 = interpolate(frame, [50, 65, 85, 92], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp3 = interpolate(frame, [70, 85, 105, 112], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Label */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${labelScale})`, transformOrigin: 'center top' }}>
        <p style={headline(52, BLACK)}>SUNK COST</p>
        <p style={headline(52, ACCENT)}>FALLACY</p>
      </div>

      {/* Brain SVG with draining coins */}
      <svg viewBox="0 0 400 420" width="400" height="420" style={{ position: 'absolute', left: '50%', top: 280, transform: 'translateX(-50%)' }}>
        {/* Brain outline */}
        <ellipse cx="200" cy="160" rx="145" ry="120" fill="#E8E8E8" stroke={BLACK} strokeWidth="4" />
        <path d="M90 160 Q60 100 100 60 Q140 20 180 50" stroke={BLACK} strokeWidth="4" fill="none" />
        <path d="M310 160 Q340 100 300 60 Q260 20 220 50" stroke={BLACK} strokeWidth="4" fill="none" />
        <path d="M120 140 Q160 110 200 140 Q240 110 280 140" stroke={BLACK} strokeWidth="3" fill="none" />
        <path d="M100 180 Q140 160 180 180 Q220 160 260 180 Q290 170 310 180" stroke={BLACK} strokeWidth="3" fill="none" />
        {/* Brain bottom opening */}
        <path d="M155 270 Q200 290 245 270" stroke={BLACK} strokeWidth="4" fill="none" />

        {/* Draining coins */}
        <g opacity={coinOp1}>
          <circle cx="185" cy={270 + coinDrop1} r="18" fill="#C9A84C" />
          <text x="185" y={276 + coinDrop1} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={BLACK}>$</text>
        </g>
        <g opacity={coinOp2}>
          <circle cx="200" cy={270 + coinDrop2} r="18" fill="#C9A84C" />
          <text x="200" y={276 + coinDrop2} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={BLACK}>$</text>
        </g>
        <g opacity={coinOp3}>
          <circle cx="215" cy={270 + coinDrop3} r="18" fill="#C9A84C" />
          <text x="215" y={276 + coinDrop3} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={BLACK}>$</text>
        </g>
      </svg>

      {/* 78% stat */}
      <div style={{ position: 'absolute', bottom: 200, left: 80, right: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <p style={{ ...headline(100, ACCENT), lineHeight: 1 }}>{Math.round(pct)}%</p>
        </div>
        <div style={{ background: '#DDD', borderRadius: 8, height: 20, overflow: 'hidden' }}>
          <div style={{ background: ACCENT, height: '100%', width: `${barW}%`, borderRadius: 8 }} />
        </div>
        <p style={{ ...headline(26, BLACK), marginTop: 16 }}>of people fall for this</p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Gym example — locked gym, calendar X marks, $600/year
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gymScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const statScale = spring({ frame: Math.max(0, frame - 60), fps, from: 0, to: 1, config: { damping: 12, stiffness: 90 }, durationInFrames: 35 });

  const xMarks = [0, 1, 2, 3, 4, 5];
  const calendarOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <p style={headline(72, WHITE)}>THE GYM</p>
      </div>
      <div style={{ position: 'absolute', top: 195, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <p style={headline(72, ACCENT)}>EFFECT</p>
      </div>

      {/* Gym SVG */}
      <svg viewBox="0 0 480 320" width="480" height="320"
        style={{ position: 'absolute', left: '50%', top: 290, transform: `translateX(-50%) scale(${gymScale})`, transformOrigin: 'center bottom' }}>
        {/* Building */}
        <rect x="60" y="60" width="360" height="260" rx="6" fill="#1E1E1E" stroke="#333" strokeWidth="3" />
        {/* Roof triangle */}
        <polygon points="40,60 240,10 440,60" fill="#2A2A2A" stroke="#333" strokeWidth="3" />
        {/* GYM text */}
        <text x="240" y="130" textAnchor="middle" fontFamily={FONT} fontSize="40" fill="#444" letterSpacing="8">GYM</text>
        {/* Door */}
        <rect x="160" y="180" width="160" height="140" rx="4" fill="#252525" stroke="#333" strokeWidth="2" />
        {/* Chain */}
        <line x1="160" y1="240" x2="320" y2="240" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        {/* Lock */}
        <rect x="225" y="225" width="30" height="22" rx="4" fill={ACCENT} />
        <path d="M231 225 Q240 215 249 225" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Calendar with X marks */}
      <svg viewBox="0 0 300 220" width="300" height="220"
        style={{ position: 'absolute', right: 50, top: 580, opacity: calendarOp }}>
        <rect x="0" y="30" width="300" height="190" rx="8" fill="#1E1E1E" stroke="#333" strokeWidth="2" />
        <rect x="0" y="0" width="300" height="38" rx="8" fill={ACCENT} />
        <text x="150" y="26" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={BLACK} letterSpacing="3">MONTHS MISSED</text>
        {xMarks.map((i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const cx = 50 + col * 100;
          const cy = 90 + row * 90;
          const xOp = interpolate(frame, [40 + i * 12, 55 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={xOp}>
              <line x1={cx - 20} y1={cy - 20} x2={cx + 20} y2={cy + 20} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
              <line x1={cx + 20} y1={cy - 20} x2={cx - 20} y2={cy + 20} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            </g>
          );
        })}
      </svg>

      {/* $600/year stat */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${statScale})`, transformOrigin: 'center' }}>
        <p style={headline(96, ACCENT)}>$600</p>
        <p style={headline(36, WHITE)}>per year — gone</p>
        <p style={headline(28, '#888')}>67% of members barely go</p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Stocks — chart down, person gripping it, "60% LONGER"
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartProgress = interpolate(frame, [15, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 80), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 }, durationInFrames: 30 });
  const personOp = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Chart points — descending line with small bumps (seeded)
  const chartPoints = [
    [0, 40], [60, 30], [120, 60], [180, 20], [240, 80], [300, 10], [360, 90], [420, 5],
  ];
  const totalLen = chartPoints.length - 1;
  const visiblePoints = Math.max(2, Math.floor(chartProgress * totalLen) + 1);
  const pts = chartPoints.slice(0, visiblePoints);
  const polyline = pts.map(([x, y]) => `${x + 30},${y + 30}`).join(' ');

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <p style={headline(56, BLACK)}>LOSING STOCKS</p>
      </div>

      {/* Stock chart */}
      <svg viewBox="0 0 490 220" width="490" height="220"
        style={{ position: 'absolute', left: '50%', top: 280, transform: 'translateX(-50%)' }}>
        {/* Axes */}
        <line x1="30" y1="20" x2="30" y2="180" stroke="#CCC" strokeWidth="2" />
        <line x1="30" y1="180" x2="460" y2="180" stroke="#CCC" strokeWidth="2" />
        {/* Grid lines */}
        {[60, 100, 140].map((y) => (
          <line key={y} x1="30" y1={y} x2="460" y2={y} stroke="#EEE" strokeWidth="1" strokeDasharray="6 4" />
        ))}
        {/* Chart line */}
        <polyline points={polyline} fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Red fill under chart */}
        <polygon points={`30,180 ${polyline} ${30 + 420 * chartProgress},180`} fill={ACCENT} fillOpacity="0.12" />
        {/* Down arrow */}
        <g opacity={labelScale}>
          <line x1="430" y1="30" x2="430" y2="160" stroke={ACCENT} strokeWidth="4" />
          <polygon points="430,170 420,145 440,145" fill={ACCENT} />
        </g>
      </svg>

      {/* Person gripping chart */}
      <svg viewBox="0 0 200 260" width="200" height="260"
        style={{ position: 'absolute', left: '50%', top: 480, transform: 'translateX(-100%)', opacity: personOp }}>
        <circle cx="100" cy="40" r="35" fill={BLACK} />
        <rect x="78" y="75" width="44" height="70" rx="8" fill={BLACK} />
        <line x1="78" y1="90" x2="40" y2="140" stroke={BLACK} strokeWidth="16" strokeLinecap="round" />
        <line x1="122" y1="90" x2="160" y2="140" stroke={BLACK} strokeWidth="16" strokeLinecap="round" />
        <line x1="90" y1="145" x2="85" y2="220" stroke={BLACK} strokeWidth="16" strokeLinecap="round" />
        <line x1="110" y1="145" x2="115" y2="220" stroke={BLACK} strokeWidth="16" strokeLinecap="round" />
        {/* Hands holding chart */}
        <circle cx="40" cy="148" r="16" fill={BLACK} />
        <circle cx="160" cy="148" r="16" fill={BLACK} />
      </svg>

      {/* 60% longer stat */}
      <div style={{
        position: 'absolute', bottom: 160, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `scale(${labelScale})`, transformOrigin: 'center',
      }}>
        <p style={headline(90, ACCENT)}>60%</p>
        <p style={headline(38, BLACK)}>LONGER than winners</p>
        <p style={{ ...headline(26, '#888'), marginTop: 10 }}>
          "if I sell, the loss is real"
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5: Add it up — cracked piggy bank, 3 icons, $4,700 counter
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const totalVal = interpolate(frame, [50, 160], [0, 4700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const icons = [
    { label: 'GYM', delay: 60 },
    { label: 'SUBS', delay: 85 },
    { label: 'STOCKS', delay: 110 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <p style={headline(58, WHITE)}>ADD IT ALL UP</p>
      </div>

      {/* Cracked piggy bank */}
      <svg viewBox="0 0 340 300" width="340" height="300"
        style={{ position: 'absolute', left: '50%', top: 270, transform: `translateX(-50%) scale(${piggyScale})`, transformOrigin: 'center bottom' }}>
        {/* Body */}
        <ellipse cx="165" cy="175" rx="130" ry="110" fill="#E8A0B0" stroke="#C07080" strokeWidth="3" />
        {/* Head */}
        <ellipse cx="270" cy="130" rx="65" ry="58" fill="#E8A0B0" stroke="#C07080" strokeWidth="3" />
        {/* Snout */}
        <ellipse cx="312" cy="148" rx="28" ry="22" fill="#D08090" />
        <circle cx="306" cy="148" r="5" fill="#B06070" />
        <circle cx="318" cy="148" r="5" fill="#B06070" />
        {/* Eye */}
        <circle cx="280" cy="115" r="7" fill={BLACK} />
        {/* Ear */}
        <ellipse cx="252" cy="85" rx="16" ry="22" fill="#D08090" stroke="#C07080" strokeWidth="2" />
        {/* Coin slot */}
        <rect x="140" y="68" width="40" height="8" rx="3" fill="#C07080" />
        {/* Cracks */}
        <path d="M120 160 L135 185 L115 200" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M180 200 L195 220 L175 235" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Leaking coins */}
        <circle cx="118" cy="208" r="10" fill="#C9A84C" />
        <circle cx="178" cy="242" r="10" fill="#C9A84C" />
        <circle cx="100" cy="240" r="8" fill="#C9A84C" />
        {/* Legs */}
        <rect x="80" y="268" width="28" height="32" rx="8" fill="#D08090" />
        <rect x="122" y="272" width="28" height="28" rx="8" fill="#D08090" />
        <rect x="175" y="272" width="28" height="28" rx="8" fill="#D08090" />
        <rect x="217" y="268" width="28" height="32" rx="8" fill="#D08090" />
        {/* Tail */}
        <path d="M35 155 Q10 130 20 100 Q30 70 50 90" stroke="#D08090" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>

      {/* Three drain icons */}
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', paddingLeft: 60, paddingRight: 60 }}>
        {icons.map(({ label, delay }) => {
          const iconOp = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const iconY = interpolate(frame, [delay, delay + 20], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: iconOp, transform: `translateY(${iconY}px)` }}>
              <div style={{ width: 80, height: 80, borderRadius: 16, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: 0, letterSpacing: 1 }}>—</p>
              </div>
              <p style={headline(22, WHITE)}>{label}</p>
            </div>
          );
        })}
      </div>

      {/* $4,700 counter */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={headline(110, ACCENT)}>${Math.round(totalVal).toLocaleString()}</p>
        <p style={headline(32, WHITE)}>lost every year</p>
      </div>
    </FadeScene>
  );
};

// Scene 6: The fix — fork road, KEEP vs CUT, CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionOp = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const questionY = interpolate(frame, [10, 35], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftScale = spring({ frame: Math.max(0, frame - 40), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const rightScale = spring({ frame: Math.max(0, frame - 65), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const ctaOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Question */}
      <div style={{
        position: 'absolute', top: 100, left: 60, right: 60,
        opacity: questionOp, transform: `translateY(${questionY}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <p style={headline(38, BLACK)}>ASK YOURSELF:</p>
        <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center', lineHeight: 1.3, margin: '16px 0 0 0' }}>
          "Would I buy this today if I didn't already own it?"
        </p>
      </div>

      {/* Fork road SVG */}
      <svg viewBox="0 0 480 380" width="480" height="380"
        style={{ position: 'absolute', left: '50%', top: 360, transform: 'translateX(-50%)' }}>
        {/* Road stem */}
        <rect x="210" y="280" width="60" height="100" rx="6" fill="#CCC" />
        {/* Left fork */}
        <path d="M240 280 Q180 220 100 180" stroke="#CCC" strokeWidth="50" fill="none" strokeLinecap="round" />
        {/* Right fork */}
        <path d="M240 280 Q300 220 380 180" stroke="#CCC" strokeWidth="50" fill="none" strokeLinecap="round" />
        {/* Person at fork */}
        <circle cx="240" cy="320" r="22" fill={BLACK} />
        <rect x="225" y="342" width="30" height="45" rx="6" fill={BLACK} />
        <line x1="225" y1="355" x2="205" y2="385" stroke={BLACK} strokeWidth="10" strokeLinecap="round" />
        <line x1="255" y1="355" x2="275" y2="385" stroke={BLACK} strokeWidth="10" strokeLinecap="round" />
      </svg>

      {/* Left: KEEP (LOSE) */}
      <div style={{
        position: 'absolute', left: 40, top: 540,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `scale(${leftScale})`, transformOrigin: 'center',
      }}>
        <div style={{ background: ACCENT, borderRadius: 16, padding: '20px 28px', marginBottom: 12 }}>
          <p style={headline(30, WHITE)}>KEEP</p>
        </div>
        <svg viewBox="0 0 60 60" width="60" height="60">
          <line x1="30" y1="10" x2="30" y2="50" stroke={ACCENT} strokeWidth="5" />
          <polygon points="30,56 18,38 42,38" fill={ACCENT} />
        </svg>
        <p style={headline(24, ACCENT)}>LOSE $</p>
      </div>

      {/* Right: CUT (WIN) */}
      <div style={{
        position: 'absolute', right: 40, top: 540,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `scale(${rightScale})`, transformOrigin: 'center',
      }}>
        <div style={{ background: GREEN, borderRadius: 16, padding: '20px 28px', marginBottom: 12 }}>
          <p style={headline(30, WHITE)}>CUT</p>
        </div>
        <svg viewBox="0 0 60 60" width="60" height="60">
          <line x1="30" y1="50" x2="30" y2="10" stroke={GREEN} strokeWidth="5" />
          <polygon points="30,4 18,22 42,22" fill={GREEN} />
        </svg>
        <p style={headline(24, GREEN)}>SAVE $4,700</p>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ctaOp }}>
        <p style={headline(32, BLACK)}>follow for more</p>
        <p style={headline(32, ACCENT)}>money psychology</p>
      </div>
    </FadeScene>
  );
};

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
