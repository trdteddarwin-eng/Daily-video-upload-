import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
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

// Scene 1: Person at desk receives termination letter
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personScale = spring({ frame, fps, config: { damping: 16, stiffness: 90 }, durationInFrames: 40 });
  const letterY = interpolate(frame, [30, 70], [-300, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const letterOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [75, 105], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '24px',
        }}
      >
        {/* Person at desk SVG */}
        <svg width={480} height={320} style={{ overflow: 'visible' }}>
          {/* Desk surface */}
          <rect x={60} y={230} width={360} height={16} rx={4} fill="#2a2a2a" />
          {/* Desk legs */}
          <rect x={80} y={246} width={12} height={60} fill="#2a2a2a" />
          <rect x={388} y={246} width={12} height={60} fill="#2a2a2a" />
          {/* Monitor */}
          <rect x={160} y={140} width={160} height={90} rx={6} fill="#1e1e1e" stroke="#333" strokeWidth={3} />
          <rect x={225} y={230} width={30} height={10} fill="#1e1e1e" />
          {/* Monitor screen glow */}
          <rect x={168} y={148} width={144} height={74} rx={3} fill="#1a2a1a" />
          {/* Person body (sitting) */}
          <ellipse cx={240} cy={195} rx={28 * personScale} ry={40 * personScale} fill="#555" />
          {/* Person head */}
          <circle cx={240} cy={140 - 18 * (1 - personScale)} r={26 * personScale} fill="#777" />
          {/* Arms on desk */}
          <rect x={175} y={208} width={50} height={14} rx={7} fill="#555" />
          <rect x={255} y={208} width={50} height={14} rx={7} fill="#555" />

          {/* Termination letter floating down */}
          <g transform={`translate(300, ${letterY})`} opacity={letterOpacity}>
            {/* Envelope body */}
            <rect x={0} y={20} width={100} height={72} rx={4} fill={WHITE} />
            {/* Envelope flap */}
            <polygon points="0,20 50,55 100,20" fill="#ddd" />
            {/* Letter lines */}
            <rect x={14} y={50} width={72} height={6} rx={2} fill="#ccc" />
            <rect x={14} y={62} width={55} height={6} rx={2} fill="#ccc" />
            <rect x={14} y={74} width={65} height={6} rx={2} fill={ACCENT} opacity={0.6} />
            {/* RED X stamp */}
            <text x={50} y={40} textAnchor="middle" fontSize={28} fill={ACCENT} fontFamily={FONT} fontWeight="bold">✕</text>
          </g>
        </svg>

        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <p style={headline(62, WHITE)}>LAID OFF</p>
        </div>
        <div style={{ opacity: subOpacity }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 32,
            color: ACCENT,
            textAlign: 'center',
            letterSpacing: '0.08em',
            margin: 0,
          }}>
            A BILL IS COMING
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: 6 calendars + piggy bank draining to $10,668
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calendarOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 60 }, durationInFrames: 45 });
  const counterProgress = interpolate(frame, [80, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue = Math.floor(10668 * counterProgress);
  const drainLevel = interpolate(frame, [80, 190], [1, 0.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calendarColors = [ACCENT, ACCENT, ACCENT, '#EF4444', '#DC2626', '#B91C1C'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
          gap: '18px',
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <p style={headline(38, BLACK)}>4–6 MONTH JOB SEARCH</p>
        </div>

        {/* 6 calendar icons */}
        <svg width={460} height={120} style={{ overflow: 'visible', opacity: calendarOpacity }}>
          {Array.from({ length: Math.max(0, Math.floor(6)) }).map((_, i) => {
            const x = 20 + i * 72;
            const revealed = frame > 30 + i * 12;
            const calOpacity = interpolate(frame, [30 + i * 12, 50 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <g key={i} opacity={calOpacity}>
                {/* Calendar body */}
                <rect x={x} y={10} width={58} height={70} rx={6} fill={revealed ? calendarColors[i] : '#ddd'} />
                {/* Calendar header */}
                <rect x={x} y={10} width={58} height={18} rx={6} fill={revealed ? '#B91C1C' : '#bbb'} />
                {/* Calendar rings */}
                <rect x={x + 16} y={4} width={7} height={14} rx={3} fill="#888" />
                <rect x={x + 35} y={4} width={7} height={14} rx={3} fill="#888" />
                {/* Month number */}
                <text x={x + 29} y={63} textAnchor="middle" fontSize={26} fill={WHITE} fontFamily={FONT} fontWeight="bold">{i + 1}</text>
              </g>
            );
          })}
        </svg>

        {/* Piggy bank draining */}
        <svg width={200} height={180} style={{ overflow: 'visible', transform: `scale(${piggyScale})` }}>
          {/* Piggy bank body */}
          <ellipse cx={100} cy={110} rx={70} ry={55} fill="#f4a4a4" />
          {/* Piggy head */}
          <circle cx={155} cy={90} r={30} fill="#f4a4a4" />
          {/* Snout */}
          <ellipse cx={170} cy={100} rx={14} ry={10} fill="#e88" />
          <circle cx={166} cy={100} r={3} fill="#c55" />
          <circle cx={174} cy={100} r={3} fill="#c55" />
          {/* Eye */}
          <circle cx={155} cy={82} r={5} fill={BLACK} />
          <circle cx={157} cy={80} r={2} fill={WHITE} />
          {/* Ear */}
          <ellipse cx={148} cy={64} rx={9} ry={14} fill="#f4a4a4" />
          {/* Legs */}
          <rect x={52} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={76} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={110} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={134} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          {/* Tail */}
          <path d="M 32 95 Q 18 85 22 72 Q 28 58 22 50" fill="none" stroke="#f4a4a4" strokeWidth={5} strokeLinecap="round" />
          {/* Coin slot */}
          <rect x={86} y={58} width={28} height={7} rx={3} fill="#d07070" />
          {/* Money level fill (draining) */}
          <clipPath id="piggyClip">
            <ellipse cx={100} cy={110} rx={68} ry={53} />
          </clipPath>
          <rect x={32} y={57 + 106 * (1 - drainLevel)} width={136} height={106 * drainLevel} fill={ACCENT} opacity={0.5} clipPath="url(#piggyClip)" />
        </svg>

        {/* Counter */}
        <p style={{
          fontFamily: FONT,
          fontSize: 64,
          color: ACCENT,
          textAlign: 'center',
          margin: 0,
          letterSpacing: '0.04em',
        }}>
          ${counterValue.toLocaleString()}
        </p>
        <p style={{
          fontFamily: FONT,
          fontSize: 26,
          color: '#555',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '0.06em',
        }}>
          HEALTH INSURANCE ALONE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Hospital ER bills — 65% skip, $30K risk
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, durationInFrames: 40 });
  const crossPulse = interpolate(frame, [0, 60, 120, 180], [1, 1.08, 1, 1.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill1Opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill1Y = interpolate(frame, [50, 80], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2Opacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2Y = interpolate(frame, [85, 115], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOpacity = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '20px',
        }}
      >
        {/* 65% stat */}
        <p style={{
          fontFamily: FONT,
          fontSize: 86 * statScale,
          color: ACCENT,
          margin: 0,
          letterSpacing: '0.04em',
        }}>
          65%
        </p>
        <p style={headline(32, WHITE)}>SKIP COBRA ENTIRELY</p>

        <svg width={460} height={260} style={{ overflow: 'visible' }}>
          {/* Hospital cross */}
          <g transform={`translate(180, 20) scale(${crossPulse})`} style={{ transformOrigin: '50px 60px' }}>
            <rect x={25} y={0} width={50} height={120} rx={8} fill={ACCENT} />
            <rect x={0} y={25} width={100} height={50} rx={8} fill={ACCENT} />
          </g>

          {/* Bill 1 — $2,200 */}
          <g transform={`translate(20, ${150 + bill1Y})`} opacity={bill1Opacity}>
            <rect x={0} y={0} width={180} height={90} rx={6} fill={WHITE} />
            <rect x={0} y={0} width={180} height={24} rx={6} fill="#ddd" />
            <text x={90} y={17} textAnchor="middle" fontSize={13} fill="#555" fontFamily={FONT}>MINOR ER VISIT</text>
            <text x={90} y={68} textAnchor="middle" fontSize={34} fill={ACCENT} fontFamily={FONT} fontWeight="bold">$2,200</text>
          </g>

          {/* Bill 2 — $30,000 */}
          <g transform={`translate(260, ${150 + bill2Y})`} opacity={bill2Opacity}>
            <rect x={0} y={0} width={180} height={90} rx={6} fill={WHITE} />
            <rect x={0} y={0} width={180} height={24} rx={6} fill={ACCENT} />
            <text x={90} y={17} textAnchor="middle" fontSize={13} fill={WHITE} fontFamily={FONT}>SERIOUS INCIDENT</text>
            <text x={90} y={68} textAnchor="middle" fontSize={34} fill={ACCENT} fontFamily={FONT} fontWeight="bold">$30,000</text>
          </g>

          {/* Person in waiting room chair */}
          <g opacity={personOpacity}>
            {/* Chair */}
            <rect x={190} y={218} width={80} height={12} rx={4} fill="#444" />
            <rect x={190} y={190} width={12} height={40} rx={3} fill="#444" />
            <rect x={258} y={190} width={12} height={40} rx={3} fill="#444" />
            {/* Person sitting */}
            <circle cx={230} cy={176} r={18} fill="#777" />
            <rect x={212} y={194} width={36} height={30} rx={6} fill="#666" />
          </g>
        </svg>

        <div style={{ opacity: personOpacity }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 26,
            color: '#aaa',
            textAlign: 'center',
            letterSpacing: '0.06em',
            margin: 0,
          }}>
            UNINSURED & HOPING FOR THE BEST
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — build your COBRA fund, progress bar
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, durationInFrames: 45 });
  const barProgress = interpolate(frame, [55, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [165, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barWidth = 360 * barProgress;
  const monthsFilled = Math.floor(6 * barProgress);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '22px',
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <p style={headline(46, BLACK)}>BUILD YOUR</p>
          <p style={headline(46, ACCENT)}>COBRA FUND</p>
        </div>

        {/* Piggy bank with health cross */}
        <svg width={200} height={180} style={{ overflow: 'visible', transform: `scale(${piggyScale})` }}>
          {/* Piggy body */}
          <ellipse cx={100} cy={110} rx={70} ry={55} fill="#f4a4a4" />
          {/* Piggy head */}
          <circle cx={155} cy={90} r={30} fill="#f4a4a4" />
          {/* Snout */}
          <ellipse cx={170} cy={100} rx={14} ry={10} fill="#e88" />
          <circle cx={166} cy={100} r={3} fill="#c55" />
          <circle cx={174} cy={100} r={3} fill="#c55" />
          {/* Eye */}
          <circle cx={155} cy={82} r={5} fill={BLACK} />
          <circle cx={157} cy={80} r={2} fill={WHITE} />
          {/* Ear */}
          <ellipse cx={148} cy={64} rx={9} ry={14} fill="#f4a4a4" />
          {/* Legs */}
          <rect x={52} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={76} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={110} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          <rect x={134} y={155} width={18} height={28} rx={6} fill="#f4a4a4" />
          {/* Tail */}
          <path d="M 32 95 Q 18 85 22 72 Q 28 58 22 50" fill="none" stroke="#f4a4a4" strokeWidth={5} strokeLinecap="round" />
          {/* Health cross on body */}
          <rect x={82} y={82} width={36} height={56} rx={5} fill={ACCENT} />
          <rect x={68} y={96} width={64} height={28} rx={5} fill={ACCENT} />
          <rect x={88} y={88} width={24} height={44} rx={3} fill={WHITE} opacity={0.3} />
          <rect x={74} y={102} width={52} height={16} rx={3} fill={WHITE} opacity={0.3} />
        </svg>

        {/* 6-month progress bar */}
        <div style={{ opacity: labelOpacity, width: '100%', maxWidth: 400 }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 22,
            color: '#555',
            textAlign: 'center',
            letterSpacing: '0.08em',
            margin: '0 0 12px',
          }}>
            6-MONTH GOAL: $10,668
          </p>
          <svg width={400} height={56} style={{ overflow: 'visible' }}>
            {/* Track */}
            <rect x={0} y={16} width={360} height={24} rx={12} fill="#ddd" />
            {/* Fill */}
            <rect x={0} y={16} width={barWidth} height={24} rx={12} fill={ACCENT} />
            {/* Month tick marks */}
            {Array.from({ length: Math.max(0, Math.floor(6)) }).map((_, i) => (
              <g key={i}>
                <rect x={60 * (i + 1)} y={12} width={2} height={32} fill={WHITE} opacity={0.6} />
                <text
                  x={60 * (i + 1)}
                  y={52}
                  textAnchor="middle"
                  fontSize={14}
                  fill={i < monthsFilled ? ACCENT : '#aaa'}
                  fontFamily={FONT}
                >
                  M{i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div style={{ opacity: ctaOpacity, textAlign: 'center' }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 30,
            color: BLACK,
            textAlign: 'center',
            letterSpacing: '0.06em',
            margin: 0,
            lineHeight: 1.3,
          }}>
            YOUR REAL EMERGENCY NUMBER
          </p>
          <p style={{
            fontFamily: FONT,
            fontSize: 24,
            color: ACCENT,
            textAlign: 'center',
            letterSpacing: '0.06em',
            margin: '8px 0 0',
          }}>
            IS TWICE WHAT YOU THINK
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: COBRA bill — $1,778/month on light background
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const envelopeScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, durationInFrames: 45 });
  const amountOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amountScale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 60 }, durationInFrames: 40 });
  const labelOpacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '20px',
        }}
      >
        {/* COBRA Bill Envelope */}
        <svg width={460} height={280} style={{ overflow: 'visible' }}>
          {/* Envelope body */}
          <rect
            x={(460 - 360 * envelopeScale) / 2}
            y={(280 - 220 * envelopeScale) / 2}
            width={360 * envelopeScale}
            height={220 * envelopeScale}
            rx={8}
            fill={WHITE}
            stroke="#ddd"
            strokeWidth={2}
          />
          {/* Envelope flap open */}
          <polygon
            points={`${(460 - 360 * envelopeScale) / 2},${(280 - 220 * envelopeScale) / 2} 230,${(280 - 220 * envelopeScale) / 2 + 70 * envelopeScale} ${(460 + 360 * envelopeScale) / 2},${(280 - 220 * envelopeScale) / 2}`}
            fill="#eee"
            stroke="#ddd"
            strokeWidth={1}
          />
          {/* Bill contents */}
          <g opacity={amountOpacity}>
            {/* Header bar */}
            <rect x={70} y={60} width={320} height={28} rx={4} fill={ACCENT} />
            <text x={230} y={80} textAnchor="middle" fontSize={16} fill={WHITE} fontFamily={FONT} letterSpacing="0.1em">COBRA INSURANCE PREMIUM</text>
            {/* Lines */}
            <rect x={70} y={100} width={200} height={8} rx={3} fill="#ddd" />
            <rect x={70} y={116} width={160} height={8} rx={3} fill="#ddd" />
            {/* Amount due */}
            <text x={230} y={175} textAnchor="middle" fontSize={72 * amountScale} fill={ACCENT} fontFamily={FONT} fontWeight="bold">$1,778</text>
          </g>
        </svg>

        <div style={{ opacity: labelOpacity }}>
          <p style={headline(42, BLACK)}>PER MONTH</p>
        </div>
        <div style={{ opacity: subOpacity }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 28,
            color: '#666',
            textAlign: 'center',
            letterSpacing: '0.06em',
            margin: 0,
          }}>
            FAMILY OF 4 — NATIONAL AVERAGE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Pie chart — employer 70% disappears, leaving 100% on you
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pieProgress = spring({ frame, fps, config: { damping: 18, stiffness: 60 }, durationInFrames: 50 });
  const disappearOpacity = interpolate(frame, [80, 130], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fullOpacity = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cx = 230;
  const cy = 160;
  const r = 110;

  // Employer 70% arc
  const empAngle = 0.7 * 2 * Math.PI * pieProgress;
  const empX = cx + r * Math.sin(empAngle);
  const empY = cy - r * Math.cos(empAngle);
  const empLargeArc = empAngle > Math.PI ? 1 : 0;

  // You 30% arc — starts where employer ends
  const youAngle = 2 * Math.PI * pieProgress;
  const youStartX = cx + r * Math.sin(empAngle);
  const youStartY = cy - r * Math.cos(empAngle);
  const youEndX = cx;
  const youEndY = cy - r;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '24px',
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <p style={headline(44, WHITE)}>WHO PAID YOUR PREMIUM?</p>
        </div>

        <svg width={460} height={340} style={{ overflow: 'visible' }}>
          {/* Employer slice (70%) — fades out */}
          <g opacity={disappearOpacity}>
            {pieProgress > 0.01 && (
              <path
                d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${empLargeArc} 1 ${empX} ${empY} Z`}
                fill="#555"
              />
            )}
            {/* Employer label */}
            <text x={cx - 70} y={cy - 40} textAnchor="middle" fontSize={20} fill={WHITE} fontFamily={FONT}>70%</text>
            <text x={cx - 70} y={cy - 18} textAnchor="middle" fontSize={16} fill="#aaa" fontFamily={FONT}>EMPLOYER</text>
          </g>

          {/* Your slice (30%) — always visible */}
          {pieProgress > 0.71 && (
            <path
              d={`M ${cx} ${cy} L ${youStartX} ${youStartY} A ${r} ${r} 0 0 1 ${youEndX} ${youEndY} Z`}
              fill={ACCENT}
            />
          )}
          {/* You label */}
          <text x={cx + 75} y={cy - 40} textAnchor="middle" fontSize={20} fill={ACCENT} fontFamily={FONT} opacity={pieProgress > 0.7 ? 1 : 0}>30%</text>
          <text x={cx + 75} y={cy - 18} textAnchor="middle" fontSize={16} fill={ACCENT} fontFamily={FONT} opacity={pieProgress > 0.7 ? 1 : 0}>YOU</text>

          {/* Full circle "now 100% you" */}
          <circle cx={cx} cy={cy} r={r} fill={ACCENT} opacity={fullOpacity} />
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize={36} fill={WHITE} fontFamily={FONT} fontWeight="bold" opacity={fullOpacity}>100%</text>
          <text x={cx} y={cy + 42} textAnchor="middle" fontSize={20} fill={WHITE} fontFamily={FONT} opacity={fullOpacity}>ALL YOU</text>
        </svg>

        <div style={{ opacity: fullOpacity }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 30,
            color: ACCENT,
            textAlign: 'center',
            letterSpacing: '0.06em',
            margin: 0,
          }}>
            EMPLOYER SHARE: GONE
          </p>
        </div>
      </AbsoluteFill>
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
