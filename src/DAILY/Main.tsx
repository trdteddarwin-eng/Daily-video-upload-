import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

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

// ─── Scene 2: Benefit cards spring in ───────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cards = [
    { label: 'SNAP / GROCERIES', value: '$6,000', delay: 20 },
    { label: 'MEDICAID', value: '$3,200', delay: 55 },
    { label: 'CHILDCARE SUBSIDY', value: '$7,200', delay: 90 },
    { label: 'HOUSING AID', value: '$3,400', delay: 125 },
  ];

  const totalOp = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 0 }}>
        <p style={{ ...headline(38, BLACK), opacity: titleOp, marginBottom: 32, lineHeight: 1.2 }}>
          LOW INCOME = GOVT HELPS YOU
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', maxWidth: 860 }}>
          {cards.map((card, i) => {
            const cardScale = spring({ frame: Math.max(0, frame - card.delay), fps, config: { damping: 14, stiffness: 90 } });
            const cardOp = interpolate(frame, [card.delay, card.delay + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ opacity: cardOp, transform: `scale(${cardScale})`, background: WHITE, border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, letterSpacing: '0.08em' }}>{card.label}</p>
                <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0 }}>{card.value}</p>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: totalOp, transform: `scale(${totalScale})`, marginTop: 28, background: ACCENT, borderRadius: 18, padding: '16px 48px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, letterSpacing: '0.12em' }}>TOTAL PACKAGE</p>
          <p style={{ fontFamily: FONT, fontSize: 56, color: WHITE, margin: 0 }}>$19,800 / YR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: The cliff diagram ──────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bar grows from left to a cliff then drops
  const barProgress = interpolate(frame, [20, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const cliffDrop = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });

  const labelOp = interpolate(frame, [130, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 70 } });

  const subOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barW = 700;
  const cliffX = barW * 0.58;
  const barH = 220;
  const dropH = barH * cliffDrop;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 0 }}>
        <p style={{ ...headline(40, WHITE), opacity: titleOp, marginBottom: 40, lineHeight: 1.2 }}>
          CROSS THE LINE AND IT'S GONE
        </p>

        {/* Cliff chart */}
        <svg width={barW} height={340} viewBox={`0 0 ${barW} 340`}>
          {/* Axes */}
          <line x1="40" y1="280" x2={barW - 20} y2="280" stroke="#444" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="280" stroke="#444" strokeWidth="2" />

          {/* X-axis label */}
          <text x={barW / 2} y="316" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#888">INCOME ➜</text>
          {/* Y-axis label */}
          <text x="22" y="160" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill="#888" transform="rotate(-90 22 160)">NET $</text>

          {/* Threshold line */}
          <line x1={cliffX + 40} y1="30" x2={cliffX + 40} y2="280" stroke={ACCENT} strokeWidth="3" strokeDasharray="8 6" />
          <text x={cliffX + 48} y="50" fontFamily="Arial Black" fontSize="18" fill={ACCENT}>THRESHOLD</text>

          {/* Bar before cliff */}
          {barProgress > 0 && (
            <rect
              x="40"
              y={280 - barH}
              width={Math.max(0, cliffX * barProgress)}
              height={barH}
              rx="6"
              fill="#10B981"
              opacity="0.85"
            />
          )}

          {/* Bar after cliff — shrinks down */}
          {barProgress >= 1 && (
            <rect
              x={40 + cliffX}
              y={280 - (barH - dropH)}
              width={barW - cliffX - 60}
              height={Math.max(4, barH - dropH)}
              rx="6"
              fill={ACCENT}
              opacity="0.9"
            />
          )}

          {/* Green label */}
          {barProgress > 0.4 && (
            <text x={40 + cliffX * 0.4} y={280 - barH - 12} textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#10B981">WITH BENEFITS</text>
          )}
        </svg>

        <div style={{ opacity: labelOp, transform: `scale(${labelScale})`, background: ACCENT, borderRadius: 16, padding: '14px 36px', textAlign: 'center', marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, margin: 0 }}>THE BENEFITS CLIFF</p>
        </div>

        <p style={{ ...headline(28, WHITE), opacity: subOp, marginTop: 20, lineHeight: 1.3 }}>
          $1 OVER THE LINE = ALL OF IT GONE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: The brutal math ────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const row1Op = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Scale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 90 } });

  const row2Op = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Scale = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 14, stiffness: 90 } });

  const dividerOp = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const resultOp = interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const resultScale = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 70 } });

  // Animated counter ticking down
  const netCount = interpolate(frame, [148, 200], [0, -9000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const countOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 70, gap: 0 }}>
        <p style={{ ...headline(38, BLACK), opacity: titleOp, marginBottom: 36, lineHeight: 1.2 }}>
          DO THE MATH
        </p>

        {/* Row 1: Raise */}
        <div style={{ opacity: row1Op, transform: `scale(${row1Scale})`, width: '100%', maxWidth: 820, background: '#E8FDF4', border: '3px solid #10B981', borderRadius: 16, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, letterSpacing: '0.1em' }}>$2/HR RAISE × 40 HRS × 50 WKS</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#10B981', margin: 0, marginTop: 4 }}>EXTRA PAY</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 46, color: '#10B981', margin: 0 }}>+$4,000</p>
        </div>

        {/* Row 2: Benefits lost */}
        <div style={{ opacity: row2Op, transform: `scale(${row2Scale})`, width: '100%', maxWidth: 820, background: '#FEF2F2', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, letterSpacing: '0.1em' }}>SNAP + MEDICAID + CHILDCARE</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0, marginTop: 4 }}>BENEFITS LOST</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 46, color: ACCENT, margin: 0 }}>-$13,000</p>
        </div>

        {/* Divider */}
        <div style={{ opacity: dividerOp, width: '100%', maxWidth: 820, height: 4, background: BLACK, borderRadius: 4, marginBottom: 18 }} />

        {/* Result */}
        <div style={{ opacity: resultOp, transform: `scale(${resultScale})`, width: '100%', maxWidth: 820, background: ACCENT, borderRadius: 16, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>NET RESULT OF RAISE</p>
          <p style={{ fontFamily: FONT, fontSize: 54, color: WHITE, margin: 0, opacity: countOp }}>
            {Math.round(netCount).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: 13 million households ─────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const numOp = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Grid of 15 person icons
  const cols = 5;
  const rows = 3;
  const total = cols * rows;
  const xMarks = [2, 5, 8, 11, 14]; // indices that show red X / refused raise

  const subOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 0 }}>
        <p style={{ ...headline(36, WHITE), opacity: titleOp, marginBottom: 10, lineHeight: 1.2 }}>
          THIS TRAPS
        </p>
        <div style={{ opacity: numOp, transform: `scale(${numScale})`, marginBottom: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, letterSpacing: '0.02em' }}>13 MILLION</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, textAlign: 'center', letterSpacing: '0.12em' }}>HOUSEHOLDS</p>
        </div>

        {/* Person grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', maxWidth: 800 }}>
          {Array(Math.max(0, Math.floor(total))).fill(null).map((_, i) => {
            const personOp = interpolate(frame, [50 + i * 5, 70 + i * 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const isX = xMarks.includes(i);
            return (
              <div key={i} style={{ opacity: personOp, position: 'relative', width: 90, textAlign: 'center' }}>
                <svg width="54" height="72" viewBox="0 0 54 72">
                  <circle cx="27" cy="14" r="12" fill={isX ? '#3A1A1A' : '#2A2A2A'} stroke={isX ? ACCENT : '#555'} strokeWidth="2.5" />
                  <rect x="10" y="28" width="34" height="32" rx="8" fill={isX ? '#3A1A1A' : '#2A2A2A'} stroke={isX ? ACCENT : '#555'} strokeWidth="2.5" />
                  <rect x="11" y="56" width="12" height="14" rx="5" fill={isX ? '#3A1A1A' : '#2A2A2A'} stroke={isX ? ACCENT : '#555'} strokeWidth="2" />
                  <rect x="31" y="56" width="12" height="14" rx="5" fill={isX ? '#3A1A1A' : '#2A2A2A'} stroke={isX ? ACCENT : '#555'} strokeWidth="2" />
                </svg>
                {isX && (
                  <div style={{ position: 'absolute', top: -8, right: -8, background: ACCENT, borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: FONT, fontSize: 16, color: WHITE, lineHeight: 1 }}>✕</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(26, WHITE), opacity: subOp, marginTop: 28, lineHeight: 1.4, maxWidth: 820 }}>
          THEY'RE NOT LAZY. THEY'RE DOING THE MATH.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — check your cliff ─────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titleOp = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const urlOp = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const urlScale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 80 } });

  // Meter fill
  const meterFill = interpolate(frame, [90, 165], [0, 0.58], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const meterOp = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaOp = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 175), fps, config: { damping: 10, stiffness: 70 } });

  const meterW = 480;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 70, gap: 0 }}>

        {/* Phone shape */}
        <div style={{ transform: `scale(${phoneScale})`, marginBottom: 32 }}>
          <svg width="160" height="220" viewBox="0 0 160 220">
            {/* Phone body */}
            <rect x="10" y="4" width="140" height="212" rx="22" fill="#1E1E1E" stroke={ACCENT} strokeWidth="5" />
            {/* Screen */}
            <rect x="20" y="22" width="120" height="164" rx="12" fill="#2A2A2A" />
            {/* Speaker notch */}
            <rect x="54" y="8" width="52" height="9" rx="5" fill="#333" />
            {/* Home bar */}
            <rect x="56" y="200" width="48" height="6" rx="3" fill="#444" />
            {/* Screen text */}
            <text x="80" y="90" textAnchor="middle" fontFamily="Arial Black" fontSize="11" fill={ACCENT} letterSpacing="1">BENEFITS.GOV</text>
            <rect x="28" y="100" width="104" height="8" rx="4" fill="#333" />
            <rect x="28" y="115" width="80" height="8" rx="4" fill="#333" />
            <rect x="28" y="130" width="90" height="8" rx="4" fill="#333" />
            {/* Check icon */}
            <circle cx="80" cy="158" r="16" fill={ACCENT} opacity="0.9" />
            <polyline points="72,158 78,164 90,150" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p style={{ ...headline(44, BLACK), opacity: titleOp, marginBottom: 10, lineHeight: 1.2 }}>
          BEFORE YOU SAY YES
        </p>

        <div style={{ opacity: urlOp, transform: `scale(${urlScale})`, background: ACCENT, borderRadius: 14, padding: '10px 32px', marginBottom: 30 }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0, letterSpacing: '0.08em' }}>BENEFITS.GOV</p>
        </div>

        {/* Threshold meter */}
        <div style={{ opacity: meterOp, width: meterW, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: 0 }}>YOUR INCOME</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: 0 }}>THRESHOLD ▲</p>
          </div>
          <div style={{ width: meterW, height: 28, background: '#E0E0E0', borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: meterW * meterFill, height: '100%', background: '#10B981', borderRadius: 14, transition: 'none' }} />
            {/* Threshold marker */}
            <div style={{ position: 'absolute', left: meterW * 0.58 - 3, top: 0, width: 6, height: 28, background: ACCENT, borderRadius: 3 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', margin: 0, marginTop: 8, textAlign: 'center' }}>HOW CLOSE ARE YOU TO THE CLIFF?</p>
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, background: BLACK, borderRadius: 18, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>KNOW YOUR CLIFF</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Person gets a raise — then money flies away
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const checkScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 80 } });
  const line1Op = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnOp = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 70 } });

  // Floating dollar signs
  const dollarPositions = [
    { x: 80, y: 0, delay: 120 },
    { x: 200, y: -30, delay: 135 },
    { x: 300, y: 10, delay: 148 },
    { x: 700, y: -20, delay: 130 },
    { x: 850, y: 5, delay: 143 },
    { x: 950, y: -10, delay: 157 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 0 }}>

        {/* Floating dollar signs */}
        {dollarPositions.map((pos, i) => {
          const flyOp = interpolate(frame, [pos.delay, pos.delay + 15, pos.delay + 80], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const flyY = interpolate(frame, [pos.delay, pos.delay + 80], [0, -220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ position: 'absolute', left: pos.x + 50, top: 900 + pos.y, opacity: flyOp, transform: `translateY(${flyY}px)`, fontFamily: FONT, fontSize: 36, color: ACCENT, pointerEvents: 'none' }}>
              $
            </div>
          );
        })}

        {/* Person silhouette */}
        <div style={{ transform: `scale(${personScale})`, marginBottom: 24 }}>
          <svg width="120" height="160" viewBox="0 0 120 160">
            {/* Head */}
            <circle cx="60" cy="30" r="26" fill="#2A2A2A" stroke={ACCENT} strokeWidth="4" />
            {/* Body */}
            <rect x="28" y="60" width="64" height="70" rx="14" fill="#2A2A2A" stroke={ACCENT} strokeWidth="4" />
            {/* Legs */}
            <rect x="30" y="124" width="22" height="32" rx="8" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            <rect x="68" y="124" width="22" height="32" rx="8" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            {/* Arms */}
            <rect x="0" y="62" width="24" height="14" rx="7" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            <rect x="96" y="62" width="24" height="14" rx="7" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            {/* Smile */}
            <path d="M48 30 Q60 42 72 30" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Paycheck badge */}
        <div style={{ transform: `scale(${checkScale})`, marginBottom: 32, background: '#1A1A1A', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '14px 28px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>YOU GOT A RAISE</p>
          <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>+ $2 / HR</p>
        </div>

        <p style={{ ...headline(44, WHITE), opacity: line1Op, marginBottom: 10, lineHeight: 1.2 }}>
          YOUR BOSS IS PROUD.
        </p>
        <p style={{ ...headline(44, WHITE), opacity: line2Op, marginBottom: 0, lineHeight: 1.2 }}>
          YOU'RE ABOUT TO LOSE
        </p>

        {/* Warning */}
        <div style={{ opacity: warnOp, transform: `scale(${warnScale})`, marginTop: 18, background: ACCENT, borderRadius: 18, padding: '16px 36px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 58, color: WHITE, margin: 0, letterSpacing: '0.05em' }}>$12,000</p>
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
