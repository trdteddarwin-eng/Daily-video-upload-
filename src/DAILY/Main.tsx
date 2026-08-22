import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1: Loyalty card with disappearing star points
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const titleY = interpolate(frame, [20, 45], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const starData = [
    { x: 160, y: 430, delay: 10 }, { x: 920, y: 350, delay: 28 },
    { x: 130, y: 1060, delay: 22 }, { x: 950, y: 970, delay: 38 },
    { x: 540, y: 300, delay: 48 }, { x: 280, y: 1310, delay: 18 },
    { x: 800, y: 1260, delay: 42 }, { x: 650, y: 510, delay: 32 },
  ];
  const expireIdx = [1, 2, 6];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {starData.map((p, i) => {
          const op = interpolate(frame, [p.delay, p.delay + 18, dur - 50, dur - 20], [0, 0.85, 0.85, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const fy = interpolate(frame, [p.delay, p.delay + 22], [p.y - 55, p.y], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return <text key={i} x={p.x} y={fy} textAnchor="middle" fontSize={38} fill={ACCENT} opacity={op} fontFamily="serif">&#9733;</text>;
        })}
        {expireIdx.map((idx, i) => {
          const p = starData[idx];
          const xOp = interpolate(frame, [95 + i * 14, 112 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={xOp}>
              <line x1={p.x - 24} y1={p.y - 24} x2={p.x + 24} y2={p.y + 24} stroke={RED} strokeWidth={6} strokeLinecap="round" />
              <line x1={p.x + 24} y1={p.y - 24} x2={p.x - 24} y2={p.y + 24} stroke={RED} strokeWidth={6} strokeLinecap="round" />
            </g>
          );
        })}
        {/* Loyalty card */}
        <g transform={`translate(540, 900) scale(${cardScale})`}>
          <rect x={-265} y={-165} width={530} height={330} rx={22} fill="#1a1a2e" stroke={ACCENT} strokeWidth={4} />
          <rect x={-225} y={-120} width={64} height={44} rx={8} fill={ACCENT} />
          <text x={175} y={-104} textAnchor="middle" fontSize={30} fill={ACCENT} fontFamily="serif">&#9733;&#9733;&#9733;</text>
          {[0, 1, 2, 3].map(j => (
            <circle key={j} cx={-200 + j * 26} cy={110} r={7} fill={WHITE} opacity={0.5} />
          ))}
          <text x={0} y={142} textAnchor="middle" fontSize={18} fill={WHITE} opacity={0.65} fontFamily={FONT} letterSpacing={5}>REWARDS CARD</text>
        </g>
      </svg>
      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ transform: `translateY(${titleY}px)`, opacity: titleOp, textAlign: 'center', paddingLeft: 60, paddingRight: 60 }}>
          <p style={{ ...headline(80, ACCENT), lineHeight: 1.05, marginBottom: 14 }}>YOUR POINTS</p>
          <p style={{ ...headline(80, WHITE), lineHeight: 1.05, marginBottom: 14 }}>ARE QUIETLY</p>
          <p style={{ ...headline(80, RED), lineHeight: 1.05 }}>DYING</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 195, left: 60, right: 60, textAlign: 'center', opacity: subOp }}>
        <p style={{ ...headline(36, WHITE), opacity: 0.72, letterSpacing: '0.18em' }}>AND STORES PLANNED IT THAT WAY</p>
      </div>
    </FadeScene>
  );
}; // END Scene1

// Scene 2: $48B counter + piggy bank + $512 box — light bg
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pigScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 16, stiffness: 110 } });
  const countProgress = interpolate(frame, [25, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNum = Math.floor(countProgress * 48);
  const box512Op = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box512Y = interpolate(frame, [105, 130], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [18, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Piggy bank */}
        <g transform={`translate(540, 1150) scale(${pigScale})`}>
          <ellipse cx={0} cy={0} rx={155} ry={135} fill="#F9A8A8" />
          <circle cx={158} cy={-52} r={78} fill="#F9A8A8" />
          <ellipse cx={216} cy={-30} rx={34} ry={27} fill="#E88080" />
          <circle cx={208} cy={-32} r={8} fill={BLACK} />
          <circle cx={226} cy={-32} r={8} fill={BLACK} />
          <circle cx={153} cy={-76} r={12} fill={BLACK} />
          <circle cx={156} cy={-79} r={4} fill={WHITE} />
          <ellipse cx={138} cy={-118} rx={20} ry={28} fill="#E88080" />
          <rect x={-28} y={-148} width={56} height={10} rx={5} fill={BLACK} />
          {[-78, -28, 28, 78].map((lx, i) => (
            <rect key={i} x={lx - 17} y={126} width={34} height={48} rx={10} fill="#F9A8A8" />
          ))}
          <ellipse cx={-80} cy={70} rx={18} ry={18} fill={BLACK} />
        </g>
        {/* Coins leaking from pig hole */}
        {[0, 1, 2].map(i => {
          const cy = interpolate(frame, [80 + i * 18, 165 + i * 18], [1105, 1390], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const cop = interpolate(frame, [80 + i * 18, 96 + i * 18, 155 + i * 18, 170 + i * 18], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={cop}>
              <circle cx={455 + i * 38} cy={cy} r={20} fill={ACCENT} />
              <text x={455 + i * 38} y={cy + 7} textAnchor="middle" fontSize={18} fill={BLACK} fontFamily={FONT} fontWeight="bold">$</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', top: 175, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ ...headline(42, BLACK), opacity: labelOp, marginBottom: 18 }}>UNREDEEMED POINTS</p>
        <p style={{ ...headline(165, ACCENT), lineHeight: 1 }}>${bigNum}B</p>
        <p style={{ ...headline(44, '#555'), marginTop: 8 }}>AND COUNTING</p>
      </div>
      <div style={{ position: 'absolute', top: 640, left: 80, right: 80, opacity: box512Op, transform: `translateY(${box512Y}px)` }}>
        <div style={{ background: ACCENT, borderRadius: 24, padding: '28px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(34, BLACK), marginBottom: 10 }}>YOUR HOUSEHOLD LOSES</p>
          <p style={{ ...headline(116, BLACK), lineHeight: 1 }}>$512</p>
          <p style={{ ...headline(34, BLACK), marginTop: 10 }}>TO EXPIRATION EVERY YEAR</p>
        </div>
      </div>
    </FadeScene>
  );
}; // END Scene2

// Scene 3: 15 loyalty program circles — 7 active (amber), 8 expired (red X) — dark bg
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [14, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const total = 15;
  const active = 7;
  const labels = ['AIR', 'HTL', 'CC', 'GAS', 'GROC', 'TEL', 'STRM', 'CAFE', 'FOOD', 'CAR', 'SHOP', 'RX', 'SPA', 'GYM', 'GAME'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {Array.from({ length: Math.max(0, Math.floor(total)) }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const cx = 210 + col * 330;
          const cy = 700 + row * 215;
          const isActive = i < active;
          const sc = spring({ frame: Math.max(0, frame - i * 9), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
          const xOp = isActive ? 0 : interpolate(frame, [80 + (i - active) * 10, 98 + (i - active) * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} transform={`translate(${cx}, ${cy}) scale(${sc})`}>
              <circle cx={0} cy={0} r={88} fill={isActive ? ACCENT : '#252525'} stroke={isActive ? '#FBBF24' : '#3a3a3a'} strokeWidth={3} />
              <text x={0} y={8} textAnchor="middle" fontSize={20} fill={isActive ? BLACK : '#666'} fontFamily={FONT} fontWeight="bold">{labels[i]}</text>
              {!isActive && (
                <g opacity={xOp}>
                  <line x1={-28} y1={-28} x2={28} y2={28} stroke={RED} strokeWidth={6} strokeLinecap="round" />
                  <line x1={28} y1={-28} x2={-28} y2={28} stroke={RED} strokeWidth={6} strokeLinecap="round" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', top: 175, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: titleOp }}>
        <p style={{ ...headline(48, WHITE), marginBottom: 14 }}>ENROLLED IN</p>
        <p style={{ ...headline(136, ACCENT), lineHeight: 1 }}>14.8</p>
        <p style={{ ...headline(48, WHITE), marginTop: 4 }}>PROGRAMS</p>
      </div>
      <div style={{ position: 'absolute', bottom: 175, left: 60, right: 60, textAlign: 'center', opacity: ctaOp }}>
        <p style={{ ...headline(46, RED) }}>ONLY 6.7 ACTUALLY USED</p>
        <p style={{ ...headline(34, WHITE), marginTop: 12, opacity: 0.7 }}>THE REST ARE QUIETLY DYING</p>
      </div>
    </FadeScene>
  );
}; // END Scene3

// Scene 4: Expiration clocks — airplane / hotel bed / credit card — light bg
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [14, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1 = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const s2 = spring({ frame: Math.max(0, frame - 60), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const s3 = spring({ frame: Math.max(0, frame - 110), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const l1Op = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const l2Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const l3Op = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Airplane */}
        <g transform={`translate(540, 500) scale(${s1})`}>
          <ellipse cx={0} cy={0} rx={125} ry={30} fill="#3B82F6" />
          <polygon points="120,0 165,-14 165,14" fill="#3B82F6" />
          <polygon points="-30,-30 90,-30 110,0 90,30 -30,30" fill="#2563EB" />
          <polygon points="-105,-26 -72,-26 -72,0" fill="#3B82F6" />
          <polygon points="-105,26 -72,26 -72,0" fill="#3B82F6" />
          <polygon points="-72,-26 -105,-14 -88,0" fill="#1D4ED8" />
        </g>
        {/* Hotel bed */}
        <g transform={`translate(540, 960) scale(${s2})`}>
          <rect x={-130} y={-22} width={260} height={82} rx={12} fill="#10B981" />
          <rect x={-130} y={-92} width={30} height={70} rx={6} fill="#10B981" />
          <rect x={100} y={-92} width={30} height={70} rx={6} fill="#10B981" />
          <rect x={-90} y={-86} width={180} height={64} rx={10} fill="#0D9669" />
          <circle cx={-48} cy={-54} r={22} fill={WHITE} opacity={0.3} />
          <circle cx={48} cy={-54} r={22} fill={WHITE} opacity={0.3} />
        </g>
        {/* Credit card */}
        <g transform={`translate(540, 1420) scale(${s3})`}>
          <rect x={-200} y={-125} width={400} height={250} rx={18} fill={RED} />
          <rect x={-200} y={-58} width={400} height={50} fill="#C03030" />
          <rect x={-160} y={22} width={130} height={34} rx={6} fill={WHITE} opacity={0.5} />
          <text x={0} y={82} textAnchor="middle" fontSize={22} fill={WHITE} opacity={0.7} fontFamily={FONT}>FINE PRINT: 47 PAGES</text>
        </g>
      </svg>
      <div style={{ position: 'absolute', top: 175, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(48, BLACK), marginBottom: 8 }}>EXPIRATION CLOCKS</p>
        <p style={{ ...headline(38, '#555') }}>ALREADY TICKING</p>
      </div>
      <div style={{ position: 'absolute', top: 600, left: 0, right: 0, textAlign: 'center', opacity: l1Op }}>
        <p style={{ ...headline(44, '#3B82F6') }}>18 MONTHS INACTIVITY</p>
      </div>
      <div style={{ position: 'absolute', top: 1058, left: 0, right: 0, textAlign: 'center', opacity: l2Op }}>
        <p style={{ ...headline(44, '#10B981') }}>12 MONTHS INACTIVITY</p>
      </div>
      <div style={{ position: 'absolute', top: 1540, left: 0, right: 0, textAlign: 'center', opacity: l3Op }}>
        <p style={{ ...headline(38, RED) }}>BURIED IN THE FINE PRINT</p>
      </div>
    </FadeScene>
  );
}; // END Scene4

// Scene 5: Airline mile value bar chart — declining 2015→2024 — dark bg
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [14, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const trendOp = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barData = [
    { year: '2015', label: '1.5c', maxH: 340, color: '#10B981' },
    { year: '2018', label: '1.2c', maxH: 272, color: ACCENT },
    { year: '2021', label: '1.0c', maxH: 226, color: '#F97316' },
    { year: '2024', label: '0.85c', maxH: 192, color: RED },
  ];
  const baseY = 1600;
  const barW = 160;
  const spacing = 230;
  const startX = 155;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {barData.map((b, i) => {
          const barH = interpolate(frame, [28 + i * 22, 88 + i * 22], [0, b.maxH], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const cx = startX + i * spacing;
          const labelY = baseY - b.maxH - 22;
          return (
            <g key={i}>
              <rect x={cx - barW / 2} y={baseY - barH} width={barW} height={barH} rx={10} fill={b.color} />
              <text x={cx} y={labelY} textAnchor="middle" fontSize={30} fill={b.color} fontFamily={FONT} fontWeight="bold">{b.label}</text>
              <text x={cx} y={baseY + 46} textAnchor="middle" fontSize={28} fill={WHITE} fontFamily={FONT}>{b.year}</text>
            </g>
          );
        })}
        {/* Dashed trend line from tallest bar top to shortest */}
        <line
          x1={startX} y1={baseY - barData[0].maxH - 8}
          x2={startX + 3 * spacing} y2={baseY - barData[3].maxH - 8}
          stroke={RED} strokeWidth={4} strokeDasharray="14,9"
          opacity={trendOp}
        />
        <text x={540} y={baseY - barData[0].maxH - 58} textAnchor="middle" fontSize={38} fill={RED} fontFamily={FONT} fontWeight="bold" opacity={trendOp}>-43% VALUE SINCE 2015</text>
      </svg>
      <div style={{ position: 'absolute', top: 180, left: 60, right: 60, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(50, WHITE), marginBottom: 12 }}>VALUE PER MILE</p>
        <p style={{ ...headline(62, RED) }}>CRASHING</p>
      </div>
      <div style={{ position: 'absolute', bottom: 175, left: 60, right: 60, textAlign: 'center', opacity: trendOp }}>
        <p style={{ ...headline(40, ACCENT) }}>EXPIRING AND LOSING VALUE</p>
      </div>
    </FadeScene>
  );
}; // END Scene5

// Scene 6: CTA — phone loyalty app + three action checkmarks — light bg
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const titleOp = interpolate(frame, [14, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Op = interpolate(frame, [50, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Op = interpolate(frame, [75, 93], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3Op = interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [125, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const checkItems = [
    { text: 'USE YOUR POINTS NOW', op: c1Op },
    { text: 'TRANSFER OR CASH OUT', op: c2Op },
    { text: 'SET EXPIRY REMINDERS', op: c3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Phone silhouette */}
        <g transform={`translate(540, 760) scale(${phoneScale})`}>
          <rect x={-160} y={-300} width={320} height={600} rx={34} fill={BLACK} />
          <rect x={-144} y={-280} width={288} height={560} rx={22} fill="#0f172a" />
          {/* App header */}
          <rect x={-130} y={-265} width={260} height={46} rx={8} fill="#1e3a5f" />
          <text x={0} y={-234} textAnchor="middle" fontSize={20} fill={ACCENT} fontFamily={FONT} fontWeight="bold">LOYALTY TRACKER</text>
          {/* Program rows */}
          <rect x={-130} y={-210} width={260} height={44} rx={8} fill="#1e293b" />
          <text x={-105} y={-182} textAnchor="start" fontSize={17} fill={WHITE} fontFamily={FONT}>AIRLINE</text>
          <text x={105} y={-182} textAnchor="end" fontSize={17} fill={ACCENT} fontFamily={FONT}>18,420 pts</text>
          <rect x={-130} y={-156} width={260} height={44} rx={8} fill="#1e293b" />
          <text x={-105} y={-128} textAnchor="start" fontSize={17} fill={WHITE} fontFamily={FONT}>HOTEL</text>
          <text x={105} y={-128} textAnchor="end" fontSize={17} fill={ACCENT} fontFamily={FONT}>7,300 pts</text>
          <rect x={-130} y={-102} width={260} height={44} rx={8} fill="#1e293b" />
          <text x={-105} y={-74} textAnchor="start" fontSize={17} fill={WHITE} fontFamily={FONT}>CREDIT</text>
          <text x={105} y={-74} textAnchor="end" fontSize={17} fill={ACCENT} fontFamily={FONT}>4,890 pts</text>
          {/* Warning banner */}
          <rect x={-130} y={-46} width={260} height={44} rx={8} fill="#7f1d1d" />
          <text x={0} y={-18} textAnchor="middle" fontSize={16} fill={WHITE} fontFamily={FONT} fontWeight="bold">3 EXPIRING SOON</text>
          {/* Home bar */}
          <rect x={-40} y={258} width={80} height={8} rx={4} fill="#444" />
        </g>
      </svg>
      <div style={{ position: 'absolute', top: 180, left: 60, right: 60, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(62, BLACK), marginBottom: 10 }}>CHECK YOUR</p>
        <p style={{ ...headline(62, BLACK) }}>ACCOUNTS THIS WEEK</p>
      </div>
      <div style={{ position: 'absolute', bottom: 360, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {checkItems.map(({ text, op }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: op }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={28} height={28} viewBox="0 0 28 28">
                <polyline points="5,14 11,20 23,8" fill="none" stroke={WHITE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ ...headline(34, BLACK), textAlign: 'left', letterSpacing: '0.1em' }}>{text}</p>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 175, left: 0, right: 0, textAlign: 'center', opacity: ctaOp }}>
        <p style={{ ...headline(38, ACCENT) }}>FOLLOW FOR MORE MONEY TRAPS</p>
      </div>
    </FadeScene>
  );
}; // END Scene6

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
