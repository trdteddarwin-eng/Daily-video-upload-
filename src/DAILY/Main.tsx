import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F0FDF4';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#0D1117';
const GRAY = '#6B7280';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// SVG Credit Card component
const CreditCard: React.FC<{ x: number; y: number; w: number; h: number; glow?: boolean }> = ({ x, y, w, h, glow }) => (
  <g>
    {glow && <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={22} fill="none" stroke={ACCENT} strokeWidth={3} opacity={0.4} />}
    <rect x={x} y={y} width={w} height={h} rx={16} fill="#1E293B" stroke="#334155" strokeWidth={2} />
    <rect x={x} y={y + h * 0.3} width={w} height={h * 0.18} fill="#0F172A" opacity={0.7} />
    <rect x={x + w * 0.06} y={y + h * 0.12} width={w * 0.18} height={h * 0.24} rx={4} fill="#F59E0B" opacity={0.9} />
    <rect x={x + w * 0.06} y={y + h * 0.6} width={w * 0.55} height={h * 0.1} rx={3} fill="#475569" />
    <rect x={x + w * 0.06} y={y + h * 0.75} width={w * 0.3} height={h * 0.08} rx={2} fill="#334155" />
    <text x={x + w * 0.75} y={y + h * 0.22} fontFamily={FONT_BODY} fontSize={h * 0.16} fill={ACCENT} textAnchor="middle" fontWeight="bold">VISA</text>
  </g>
);

// SVG Person silhouette
const Person: React.FC<{ x: number; y: number; size: number; color?: string }> = ({ x, y, size, color = WHITE }) => (
  <g>
    <circle cx={x} cy={y} r={size * 0.22} fill={color} />
    <ellipse cx={x} cy={y + size * 0.55} rx={size * 0.28} ry={size * 0.32} fill={color} />
  </g>
);

// ────────── SCENE 1 ──────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  const titleY = interpolate(frame, [20, 50], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Dollar signs floating away
  const dollarPositions = [
    { startX: 680, startY: 780, angle: -35 },
    { startX: 740, startY: 700, angle: 15 },
    { startX: 660, startY: 860, angle: -55 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Green glow background circle */}
        <circle cx={540} cy={820} r={380} fill={ACCENT} opacity={0.06} />

        {/* Credit card centered */}
        <g transform={`translate(540, 820) scale(${cardScale}) translate(-540, -820)`}>
          <CreditCard x={220} y={650} w={640} h={380} glow />
        </g>

        {/* Scared person */}
        <g opacity={personOpacity}>
          <Person x={290} y={1030} size={110} color="#CBD5E1" />
          {/* Sweat drops */}
          <ellipse cx={330} cy={980} rx={8} ry={14} fill="#60A5FA" opacity={0.7} transform="rotate(-20 330 980)" />
          <ellipse cx={260} cy={990} rx={6} ry={11} fill="#60A5FA" opacity={0.6} transform="rotate(15 260 990)" />
        </g>

        {/* Floating dollar signs */}
        {dollarPositions.map((dp, i) => {
          const t = Math.max(0, frame - 50 - i * 12);
          const dist = interpolate(t, [0, 60], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const dOpacity = interpolate(t, [0, 15, 50, 60], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const dx = dp.startX + dist * Math.sin((dp.angle * Math.PI) / 180);
          const dy = dp.startY - dist * Math.cos((dp.angle * Math.PI) / 180);
          return (
            <text key={i} x={dx} y={dy} fontFamily={FONT} fontSize={52} fill={ACCENT} opacity={dOpacity} textAnchor="middle">$</text>
          );
        })}

        {/* Title */}
        <g opacity={titleOpacity} transform={`translate(0, ${titleY})`}>
          <text x={540} y={480} style={headline(72, WHITE)} textAnchor="middle">BANKS HIDE</text>
          <text x={540} y={570} style={headline(72, WHITE)} textAnchor="middle">THIS TRICK</text>
          <text x={540} y={620} style={{ fontFamily: FONT, fontSize: 44, fill: ACCENT, textAnchor: 'middle' }}>FROM YOU</text>
        </g>

        {/* Sub text */}
        <g opacity={subOpacity}>
          <rect x={180} y={1150} width={720} height={90} rx={12} fill={ACCENT} opacity={0.15} />
          <text x={540} y={1207} style={{ fontFamily: FONT_BODY, fontSize: 38, fill: ACCENT, textAnchor: 'middle' }}>$1,100/YEAR — COMPLETELY LEGAL</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ────────── SCENE 2 ──────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [20, 80], [0, 700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const arcOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calBlockSpring = (i: number) => spring({ frame: Math.max(0, frame - 110 - i * 8), fps, from: 0, to: 1, config: { damping: 12, stiffness: 180 } });

  const timelineY = 900;
  const timelineX1 = 190;
  const timelineX2 = 890;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>

        {/* Title */}
        <g opacity={titleOpacity}>
          <text x={540} y={320} style={headline(80, BLACK)} textAnchor="middle">THE FLOAT</text>
          <text x={540} y={415} style={headline(80, BLACK)} textAnchor="middle">WINDOW</text>
          <rect x={260} y={445} width={560} height={6} rx={3} fill={ACCENT} />
        </g>

        {/* Timeline baseline */}
        <rect x={timelineX1} y={timelineY - 4} width={lineW} height={8} rx={4} fill="#94A3B8" />

        {/* Endpoint dots */}
        <circle cx={timelineX1} cy={timelineY} r={14} fill={BLACK} opacity={lineW > 10 ? 1 : 0} />
        <circle cx={timelineX2} cy={timelineY} r={14} fill={ACCENT} opacity={lineW > 650 ? 1 : 0} />

        {/* Arc above */}
        <g opacity={arcOpacity}>
          <path
            d={`M ${timelineX1} ${timelineY} Q 540 ${timelineY - 220} ${timelineX2} ${timelineY}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={6}
            strokeDasharray="16 8"
          />
          <text x={540} y={680} style={headline(100, ACCENT)} textAnchor="middle">55 DAYS</text>
          <text x={540} y={770} style={headline(48, ACCENT)} textAnchor="middle">ZERO INTEREST</text>
        </g>

        {/* Endpoint labels */}
        <g opacity={labelOpacity}>
          <text x={timelineX1} y={timelineY + 60} style={{ fontFamily: FONT, fontSize: 36, fill: BLACK, textAnchor: 'middle' }}>PURCHASE</text>
          <text x={timelineX1} y={timelineY + 105} style={{ fontFamily: FONT_BODY, fontSize: 28, fill: GRAY, textAnchor: 'middle' }}>Day 0</text>
          <text x={timelineX2} y={timelineY + 60} style={{ fontFamily: FONT, fontSize: 36, fill: ACCENT, textAnchor: 'middle' }}>DUE DATE</text>
          <text x={timelineX2} y={timelineY + 105} style={{ fontFamily: FONT_BODY, fontSize: 28, fill: GRAY, textAnchor: 'middle' }}>Day 55</text>
        </g>

        {/* Calendar blocks */}
        <g opacity={calOpacity}>
          <text x={540} y={1160} style={headline(40, '#374151')} textAnchor="middle">MOST PEOPLE WASTE THIS</text>
          {Array.from({ length: Math.max(0, Math.floor(8)) }).map((_, i) => {
            const s = calBlockSpring(i);
            const col = i % 4;
            const row = Math.floor(i / 4);
            const bx = 200 + col * 170 - s * 0;
            const by = 1220 + row * 120;
            return (
              <g key={i} transform={`scale(${s})`} style={{ transformOrigin: `${200 + col * 170 + 60}px ${1220 + row * 120 + 45}px` }}>
                <rect x={bx} y={by} width={120} height={90} rx={10} fill={i < 5 ? '#E2E8F0' : ACCENT} opacity={0.9} />
                <text x={bx + 60} y={by + 54} style={{ fontFamily: FONT, fontSize: 32, fill: i < 5 ? '#64748B' : WHITE, textAnchor: 'middle' }}>{i + 1}</text>
              </g>
            );
          })}
          <text x={540} y={1510} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: GRAY, textAnchor: 'middle' }}>Free money time — next scene shows why.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ────────── SCENE 3 ──────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardSpring = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const arrowOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowX = interpolate(frame, [40, 75], [430, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const piggySpring = spring({ frame: Math.max(0, frame - 55), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const rateSpring = spring({ frame: Math.max(0, frame - 90), fps, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const subOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinCount = 3;
  const coins = Array.from({ length: Math.max(0, Math.floor(coinCount)) }).map((_, i) => {
    const t = Math.max(0, frame - 45 - i * 18);
    const progress = interpolate(t, [0, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const cx = 360 + progress * 340;
    const coinOpacity = interpolate(t, [0, 8, 42, 50], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return { cx, coinOpacity };
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx={540} cy={960} r={450} fill={ACCENT} opacity={0.04} />

        <g opacity={titleOpacity}>
          <text x={540} y={260} style={headline(72, WHITE)} textAnchor="middle">PARK THAT</text>
          <text x={540} y={350} style={headline(72, WHITE)} textAnchor="middle">MONEY HERE</text>
          <rect x={280} y={378} width={520} height={6} rx={3} fill={ACCENT} />
        </g>

        <g transform={`scale(${cardSpring})`} style={{ transformOrigin: '300px 870px' }}>
          <CreditCard x={120} y={780} w={360} h={220} />
          <text x={300} y={1030} style={{ fontFamily: FONT, fontSize: 30, fill: GRAY, textAnchor: 'middle' }}>CHARGE IT</text>
        </g>

        <g opacity={arrowOpacity}>
          <line x1={430} y1={880} x2={arrowX} y2={880} stroke={ACCENT} strokeWidth={5} strokeDasharray="14 7" />
          <polygon points={`${arrowX},860 ${arrowX + 28},880 ${arrowX},900`} fill={ACCENT} />
        </g>

        {coins.map((c, i) => (
          <circle key={i} cx={c.cx} cy={970} r={18} fill="#F59E0B" opacity={c.coinOpacity} />
        ))}

        <g transform={`scale(${piggySpring})`} style={{ transformOrigin: '770px 870px' }}>
          <ellipse cx={770} cy={880} rx={135} ry={115} fill="#FCA5A5" />
          <circle cx={875} cy={830} r={65} fill="#FCA5A5" />
          <ellipse cx={915} cy={845} rx={28} ry={22} fill="#F87171" />
          <circle cx={908} cy={840} r={7} fill="#DC2626" />
          <circle cx={922} cy={840} r={7} fill="#DC2626" />
          <ellipse cx={862} cy={778} rx={18} ry={24} fill="#F87171" />
          <rect x={735} y={768} width={60} height={10} rx={5} fill="#DC2626" />
          <rect x={670} y={975} width={38} height={55} rx={8} fill="#FCA5A5" />
          <rect x={725} y={975} width={38} height={55} rx={8} fill="#FCA5A5" />
          <rect x={785} y={975} width={38} height={55} rx={8} fill="#FCA5A5" />
          <rect x={840} y={975} width={38} height={55} rx={8} fill="#FCA5A5" />
          <text x={770} y={895} style={{ fontFamily: FONT, fontSize: 28, fill: '#7F1D1D', textAnchor: 'middle' }}>HYSA</text>
        </g>

        <g transform={`scale(${rateSpring})`} style={{ transformOrigin: '770px 690px' }}>
          <rect x={650} y={640} width={240} height={100} rx={16} fill={ACCENT} />
          <text x={770} y={700} style={headline(54, WHITE)} textAnchor="middle">4.5%</text>
          <text x={770} y={730} style={{ fontFamily: FONT_BODY, fontSize: 26, fill: WHITE, textAnchor: 'middle' }}>APY</text>
        </g>

        <g opacity={subOpacity}>
          <rect x={100} y={1100} width={880} height={130} rx={14} fill={ACCENT} opacity={0.12} />
          <text x={540} y={1155} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: ACCENT, textAnchor: 'middle' }}>Money earns interest BEFORE you pay</text>
          <text x={540} y={1200} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: ACCENT, textAnchor: 'middle' }}>the bill. Let's run the math.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ────────── SCENE 4 ──────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const maxBarH = 280;
  const barW = 56;
  const barY = 1300;
  const barSpacing = 74;
  const barStartX = 120;

  const counterVal = interpolate(frame, [60, 200], [0, 1116], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>

        <g opacity={titleOpacity}>
          <text x={540} y={240} style={headline(68, BLACK)} textAnchor="middle">THE MATH</text>
          <text x={540} y={320} style={{ fontFamily: FONT_BODY, fontSize: 38, fill: GRAY, textAnchor: 'middle' }}>$2,500/month spending</text>
          <rect x={240} y={345} width={600} height={6} rx={3} fill={ACCENT} />
        </g>

        <rect x={180} y={400} width={720} height={160} rx={20} fill={BLACK} />
        <text x={540} y={465} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: ACCENT, textAnchor: 'middle', letterSpacing: '0.05em' }}>EARNED THIS YEAR</text>
        <text x={540} y={545} style={headline(110, WHITE)} textAnchor="middle">${Math.round(counterVal).toLocaleString()}</text>

        {months.map((m, i) => {
          const barsVisible = interpolate(frame, [30 + i * 10, 60 + i * 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const bh = maxBarH * barsVisible;
          const bx = barStartX + i * barSpacing;
          const by = barY - bh;
          return (
            <g key={i}>
              <rect x={bx} y={by} width={barW} height={bh} rx={6} fill={ACCENT} opacity={0.85} />
              <text x={bx + barW / 2} y={barY + 38} style={{ fontFamily: FONT_BODY, fontSize: 26, fill: GRAY, textAnchor: 'middle' }}>{m}</text>
              {barsVisible > 0.8 && (
                <text x={bx + barW / 2} y={by - 10} style={{ fontFamily: FONT_BODY, fontSize: 22, fill: ACCENT, textAnchor: 'middle' }}>$93</text>
              )}
            </g>
          );
        })}

        <g opacity={subOpacity}>
          <rect x={120} y={1390} width={840} height={100} rx={14} fill={ACCENT} opacity={0.15} />
          <text x={540} y={1443} style={{ fontFamily: FONT_BODY, fontSize: 38, fill: BLACK, textAnchor: 'middle', fontWeight: 'bold' }}>$1,116 — zero extra work.</text>
          <text x={540} y={1540} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: GRAY, textAnchor: 'middle' }}>There's just one rule you must follow.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ────────── SCENE 5 ──────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calSpring = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const checkSpring = spring({ frame: Math.max(0, frame - 80), fps, from: 0, to: 1, config: { damping: 10, stiffness: 130 } });
  const shieldSpring = spring({ frame: Math.max(0, frame - 110), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const warnOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx={540} cy={960} r={420} fill={ACCENT} opacity={0.05} />

        <g opacity={titleOpacity}>
          <text x={540} y={250} style={headline(80, WHITE)} textAnchor="middle">ONE RULE</text>
          <text x={540} y={345} style={headline(80, WHITE)} textAnchor="middle">ONLY</text>
          <rect x={300} y={372} width={480} height={6} rx={3} fill={ACCENT} />
        </g>

        {/* Calendar */}
        <g transform={`scale(${calSpring})`} style={{ transformOrigin: '540px 720px' }}>
          {/* Calendar body */}
          <rect x={270} y={440} width={540} height={520} rx={20} fill="#1E293B" stroke="#334155" strokeWidth={2} />
          {/* Header */}
          <rect x={270} y={440} width={540} height={90} rx={20} fill={ACCENT} />
          <rect x={270} y={490} width={540} height={40} fill={ACCENT} />
          <text x={540} y={500} style={headline(44, WHITE)} textAnchor="middle">AUTOPAY</text>
          {/* Day grid */}
          {Array.from({ length: Math.max(0, Math.floor(20)) }).map((_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const dx = 300 + col * 100;
            const dy = 560 + row * 90;
            const isActive = i === 14;
            return (
              <g key={i}>
                <rect x={dx} y={dy} width={70} height={62} rx={8} fill={isActive ? ACCENT : '#0F172A'} />
                <text x={dx + 35} y={dy + 40} style={{ fontFamily: FONT_BODY, fontSize: 28, fill: isActive ? WHITE : '#475569', textAnchor: 'middle' }}>{i + 1}</text>
              </g>
            );
          })}
        </g>

        {/* Checkmark */}
        <g transform={`scale(${checkSpring})`} style={{ transformOrigin: '770px 580px' }}>
          <circle cx={770} cy={580} r={60} fill={ACCENT} />
          <polyline points="740,580 762,602 800,558" fill="none" stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Shield */}
        <g transform={`scale(${shieldSpring})`} style={{ transformOrigin: '540px 1070px' }}>
          <path d="M 540 990 L 640 1030 L 640 1090 Q 640 1150 540 1170 Q 440 1150 440 1090 L 440 1030 Z" fill={ACCENT} opacity={0.2} stroke={ACCENT} strokeWidth={3} />
          <text x={540} y={1100} style={headline(52, ACCENT)} textAnchor="middle">SAFE</text>
        </g>

        {/* Warning */}
        <g opacity={warnOpacity}>
          <rect x={80} y={1220} width={920} height={140} rx={16} fill="#7F1D1D" opacity={0.8} />
          <text x={540} y={1275} style={headline(40, '#FCA5A5')} textAnchor="middle">AUTOPAY FULL BALANCE</text>
          <text x={540} y={1330} style={{ fontFamily: FONT_BODY, fontSize: 32, fill: '#FCA5A5', textAnchor: 'middle' }}>Miss once = all gains gone instantly</text>
        </g>

        <text x={540} y={1450} style={{ fontFamily: FONT_BODY, fontSize: 34, fill: GRAY, textAnchor: 'middle' }}>Set it up once. Then collect.</text>
      </svg>
    </FadeScene>
  );
};

// ────────── SCENE 6 ──────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });

  // Coins filling into piggy bank
  const coinCount = 6;
  const coins = Array.from({ length: Math.max(0, Math.floor(coinCount)) }).map((_, i) => {
    const t = Math.max(0, frame - 50 - i * 15);
    const dropY = interpolate(t, [0, 30], [700, 860], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
    const dropX = 500 + (i % 3) * 40 - 40;
    const cOpacity = interpolate(t, [0, 6, 26, 30], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return { dropX, dropY, cOpacity };
  });

  const ctaSpring = spring({ frame: Math.max(0, frame - 120), fps, from: 0, to: 1, config: { damping: 10, stiffness: 90 } });
  const personOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Glow */}
        <circle cx={540} cy={900} r={400} fill={ACCENT} opacity={0.08} />
        <circle cx={540} cy={900} r={250} fill={ACCENT} opacity={0.06} />

        <g opacity={titleOpacity}>
          <text x={540} y={250} style={headline(76, WHITE)} textAnchor="middle">START TODAY</text>
          <rect x={220} y={272} width={640} height={6} rx={3} fill={ACCENT} />
          <text x={540} y={360} style={{ fontFamily: FONT_BODY, fontSize: 38, fill: GRAY, textAnchor: 'middle' }}>Two steps. Free. Permanent.</text>
        </g>

        {/* Coins falling */}
        {coins.map((c, i) => (
          <circle key={i} cx={c.dropX} cy={c.dropY} r={20} fill="#F59E0B" opacity={c.cOpacity} />
        ))}

        {/* Piggy bank */}
        <g transform={`scale(${piggyScale})`} style={{ transformOrigin: '540px 900px' }}>
          <ellipse cx={540} cy={920} rx={200} ry={170} fill="#FCA5A5" />
          <circle cx={690} cy={860} r={100} fill="#FCA5A5" />
          <ellipse cx={760} cy={878} rx={42} ry={34} fill="#F87171" />
          <circle cx={748} cy={870} r={11} fill="#DC2626" />
          <circle cx={772} cy={870} r={11} fill="#DC2626" />
          <ellipse cx={672} cy={775} rx={26} ry={36} fill="#F87171" />
          <rect x={500} y={760} width={88} height={14} rx={7} fill="#DC2626" />
          {/* Legs */}
          <rect x={410} y={1060} width={56} height={80} rx={12} fill="#FCA5A5" />
          <rect x={485} y={1060} width={56} height={80} rx={12} fill="#FCA5A5" />
          <rect x={560} y={1060} width={56} height={80} rx={12} fill="#FCA5A5" />
          <rect x={635} y={1060} width={56} height={80} rx={12} fill="#FCA5A5" />
          <text x={540} y={940} style={{ fontFamily: FONT, fontSize: 34, fill: '#7F1D1D', textAnchor: 'middle' }}>$1,116</text>
        </g>

        {/* Person thumbs up */}
        <g opacity={personOpacity}>
          <circle cx={210} cy={890} r={55} fill="#CBD5E1" />
          <ellipse cx={210} cy={990} rx={70} ry={80} fill="#CBD5E1" />
          {/* Arm up */}
          <rect x={255} y={870} width={30} height={90} rx={12} fill="#CBD5E1" transform="rotate(-30 255 870)" />
          <circle cx={290} cy={850} r={22} fill="#CBD5E1" />
          {/* Thumb up shape */}
          <rect x={278} y={824} width={20} height={34} rx={10} fill="#A8B2C0" />
        </g>

        {/* CTA box */}
        <g transform={`scale(${ctaSpring})`} style={{ transformOrigin: '540px 1300px' }}>
          <rect x={80} y={1220} width={920} height={180} rx={20} fill={ACCENT} />
          <text x={540} y={1295} style={headline(54, WHITE)} textAnchor="middle">OPEN HYSA + SET AUTOPAY</text>
          <text x={540} y={1370} style={{ fontFamily: FONT_BODY, fontSize: 36, fill: WHITE, textAnchor: 'middle', opacity: 0.9 }}>Follow for one move like this daily</text>
        </g>

        <text x={540} y={1490} style={{ fontFamily: FONT_BODY, fontSize: 32, fill: GRAY, textAnchor: 'middle' }}>You just turned the bank's weapon against them.</text>
      </svg>
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
