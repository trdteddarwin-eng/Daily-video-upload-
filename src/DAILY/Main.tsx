import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
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
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Checkout counter — the $34 trap ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const counterSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const counterY = interpolate(counterSpring, [0, 1], [300, 0]);

  const titleOp = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [35, 65], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const savingsOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowW = interpolate(frame, [110, 185], [0, 620], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const subOp = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '80px 60px',
        }}
      >
        {/* Checkout counter SVG */}
        <svg
          width="860"
          height="320"
          viewBox="0 0 860 320"
          style={{ transform: `translateY(${counterY}px)` }}
        >
          {/* Counter surface */}
          <rect x="0" y="180" width="860" height="140" rx="12" fill="#1A2535" stroke="#2D3F52" strokeWidth="2" />
          {/* Register body */}
          <rect x="580" y="80" width="200" height="120" rx="10" fill="#253347" stroke="#374151" strokeWidth="2" />
          <rect x="595" y="95" width="170" height="70" rx="6" fill="#111827" />
          <text x="680" y="120" textAnchor="middle" fill="#EF4444" fontFamily="Arial Black" fontSize="13">TOTAL: $170.00</text>
          <text x="680" y="142" textAnchor="middle" fill="#10B981" fontFamily="Arial Black" fontSize="11">SAVE 20% WITH CARD</text>
          {/* Card reader */}
          <rect x="620" y="200" width="80" height="50" rx="6" fill="#374151" stroke="#4B5563" strokeWidth="2" />
          <rect x="632" y="212" width="56" height="26" rx="3" fill="#1F2937" />
          <text x="660" y="230" textAnchor="middle" fill="#6B7280" fontFamily="Arial" fontSize="9">INSERT CARD</text>
          {/* Cashier silhouette */}
          <circle cx="240" cy="85" r="38" fill="#374151" />
          <rect x="185" y="128" width="110" height="80" rx="8" fill="#374151" />
          {/* Arm extending with card */}
          <line x1="295" y1="155" x2="430" y2="178" stroke="#374151" strokeWidth="18" strokeLinecap="round" />
          {/* Store credit card in cashier hand */}
          <g transform="translate(400, 160) rotate(-12)">
            <rect x="0" y="0" width="115" height="72" rx="7" fill="#EF4444" />
            <rect x="0" y="52" width="115" height="14" fill="#DC2626" />
            <rect x="8" y="8" width="32" height="22" rx="3" fill="#FCA5A5" />
            <text x="57" y="32" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="8">STORE CARD</text>
            <text x="57" y="46" textAnchor="middle" fill="#FEE2E2" fontFamily="Arial Black" fontSize="11">28.9% APR</text>
          </g>
          {/* 20% OFF sign */}
          <rect x="50" y="60" width="190" height="100" rx="10" fill="#EF4444" />
          <text x="145" y="98" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="26">20% OFF</text>
          <text x="145" y="122" textAnchor="middle" fill="#FEE2E2" fontFamily="Arial" fontSize="14">TODAY ONLY</text>
          <text x="145" y="142" textAnchor="middle" fill="#FEE2E2" fontFamily="Arial" fontSize="11">with store card signup</text>
        </svg>

        {/* Title */}
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' as const }}>
          <p style={headline(46, WHITE)}>THE CHECKOUT</p>
          <p style={headline(46, ACCENT)}>TRAP</p>
        </div>

        {/* $34 savings */}
        <div
          style={{
            opacity: savingsOp,
            background: '#1A2535',
            borderRadius: 16,
            padding: '18px 40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <p style={{ ...headline(44, '#10B981'), textDecoration: 'line-through' }}>$34 SAVED</p>
          <p style={headline(30, '#6B7280')}>→</p>
          <p style={headline(44, ACCENT)}>$2,800 OWED</p>
        </div>

        {/* Red threat bar growing */}
        <div style={{ width: 860, background: '#1F2937', borderRadius: 8, height: 14, overflow: 'hidden' }}>
          <div style={{ width: arrowW, height: 14, background: ACCENT, borderRadius: 8 }} />
        </div>

        <p style={{ ...headline(28, '#6B7280'), opacity: subOp }}>THEY ENGINEERED EVERY WORD OF THAT PITCH</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Rate comparison — 28.9% vs 20.7% ──────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSpring = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 14, stiffness: 75 } });
  const rightSpring = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 14, stiffness: 75 } });
  const leftY = interpolate(leftSpring, [0, 1], [400, 0]);
  const rightY = interpolate(rightSpring, [0, 1], [400, 0]);
  const gapOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const storeBarW = interpolate(frame, [110, 185], [0, 530], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const regBarW = interpolate(frame, [130, 195], [0, 395], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 44,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headOp, textAlign: 'center' as const }}>
          <p style={headline(38, BLACK)}>STORE CARDS CHARGE</p>
          <p style={headline(38, ACCENT)}>NEARLY 10% MORE</p>
        </div>

        {/* Two cards */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 60 }}>
          {/* Store card */}
          <div
            style={{
              transform: `translateY(${leftY}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <svg width="280" height="176" viewBox="0 0 280 176">
              <rect x="0" y="0" width="280" height="176" rx="18" fill="#EF4444" />
              <rect x="0" y="126" width="280" height="40" rx="0" fill="#DC2626" />
              <rect x="0" y="136" width="280" height="10" fill="#B91C1C" />
              <rect x="18" y="18" width="56" height="38" rx="6" fill="#FCA5A5" />
              <rect x="18" y="60" width="110" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="18" y="76" width="80" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
              <text x="140" y="112" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="44">28.9%</text>
              <text x="140" y="158" textAnchor="middle" fill="#FEE2E2" fontFamily="Arial" fontSize="16">STORE CARD APR</text>
            </svg>
          </div>

          {/* Gap badge */}
          <div
            style={{
              opacity: gapOp,
              background: ACCENT,
              borderRadius: '50%',
              width: 110,
              height: 110,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ ...headline(32, WHITE), margin: 0 }}>+8.2%</p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: '#FEE2E2', margin: 0 }}>MORE</p>
          </div>

          {/* Regular card */}
          <div
            style={{
              transform: `translateY(${rightY}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <svg width="280" height="176" viewBox="0 0 280 176">
              <rect x="0" y="0" width="280" height="176" rx="18" fill="#374151" />
              <rect x="0" y="126" width="280" height="40" rx="0" fill="#1F2937" />
              <rect x="18" y="18" width="56" height="38" rx="6" fill="#6B7280" />
              <rect x="18" y="60" width="110" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
              <rect x="18" y="76" width="80" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
              <text x="140" y="112" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial Black" fontSize="44">20.7%</text>
              <text x="140" y="158" textAnchor="middle" fill="#6B7280" fontFamily="Arial" fontSize="16">REGULAR CARD APR</text>
            </svg>
          </div>
        </div>

        {/* Bar comparison */}
        <div style={{ opacity: barOp, width: 860, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, width: 130, margin: 0 }}>STORE CARD</p>
            <div style={{ flex: 1, background: '#E5E7EB', borderRadius: 8, height: 30, overflow: 'hidden' }}>
              <div style={{ width: storeBarW, height: 30, background: ACCENT, borderRadius: 8 }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, width: 70, margin: 0 }}>28.9%</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#6B7280', width: 130, margin: 0 }}>REGULAR</p>
            <div style={{ flex: 1, background: '#E5E7EB', borderRadius: 8, height: 30, overflow: 'hidden' }}>
              <div style={{ width: regBarW, height: 30, background: '#9CA3AF', borderRadius: 8 }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#6B7280', width: 70, margin: 0 }}>20.7%</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: 42% carry a balance — the savings evaporate ───────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const numSpring = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 12, stiffness: 100 } });
  const numScale = interpolate(numSpring, [0, 1], [0.3, 1]);

  const subOp = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftSpring = spring({ frame: Math.max(0, frame - 60), fps: 30, config: { damping: 14, stiffness: 80 } });
  const rightSpring = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 14, stiffness: 80 } });
  const leftX = interpolate(leftSpring, [0, 1], [-400, 0]);
  const rightX = interpolate(rightSpring, [0, 1], [400, 0]);

  const clockOp = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Tick animation for clock hand
  const clockAngle = interpolate(frame, [0, 225], [0, 720], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const radians = (clockAngle * Math.PI) / 180;
  const handX = 50 + 28 * Math.sin(radians);
  const handY = 50 - 28 * Math.cos(radians);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
          padding: '80px 60px',
        }}
      >
        <p style={headline(38, '#9CA3AF')}>OF STORE CARD HOLDERS</p>

        <p
          style={{
            ...headline(160, ACCENT),
            transform: `scale(${numScale})`,
            lineHeight: 1,
          }}
        >
          42%
        </p>

        <p style={{ ...headline(38, WHITE), opacity: subOp }}>CARRY A BALANCE</p>

        {/* Before/After panels */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, marginTop: 8 }}>
          {/* Savings strikethrough */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              background: '#1A2535',
              borderRadius: 20,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              width: 310,
            }}
          >
            <svg width="70" height="70" viewBox="0 0 70 70">
              {/* Receipt with checkmark */}
              <rect x="10" y="5" width="50" height="60" rx="5" fill="#1E3A2F" stroke="#10B981" strokeWidth="2" />
              <line x1="20" y1="22" x2="50" y2="22" stroke="#10B981" strokeWidth="2" />
              <line x1="20" y1="32" x2="50" y2="32" stroke="#10B981" strokeWidth="2" />
              <line x1="20" y1="42" x2="40" y2="42" stroke="#10B981" strokeWidth="2" />
              <text x="35" y="56" textAnchor="middle" fill="#10B981" fontFamily="Arial Black" fontSize="11">$34 OFF</text>
            </svg>
            <p style={{ ...headline(36, '#10B981'), textDecoration: 'line-through' }}>$34 SAVED</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: '#6B7280', textAlign: 'center' as const, margin: 0 }}>
              Gone the moment you carry a balance
            </p>
          </div>

          {/* Clock — interest ticking */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              opacity: clockOp,
              background: '#2D1515',
              borderRadius: 20,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              width: 310,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke={ACCENT} strokeWidth="3" />
              {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
                const a = (i * 30 * Math.PI) / 180;
                const x1 = 50 + 36 * Math.sin(a);
                const y1 = 50 - 36 * Math.cos(a);
                const x2 = 50 + 42 * Math.sin(a);
                const y2 = 50 - 42 * Math.cos(a);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth="2" />;
              })}
              <line x1="50" y1="50" x2={handX} y2={handY} stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="50" r="4" fill={ACCENT} />
              <text x="50" y="74" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="11">$$$</text>
            </svg>
            <p style={headline(36, ACCENT)}>INTEREST</p>
            <p style={headline(28, ACCENT)}>TICKING</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: '#9CA3AF', textAlign: 'center' as const, margin: 0 }}>
              28.9% compounding every month
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: The math — $1,200 becomes $2,800 ──────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const calcSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const calcY = interpolate(calcSpring, [0, 1], [-300, 0]);

  const barW = interpolate(frame, [40, 160], [0, 760], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const box1Op = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box3Op = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '80px 60px',
        }}
      >
        {/* Calculator SVG */}
        <svg
          width="320"
          height="180"
          viewBox="0 0 320 180"
          style={{ transform: `translateY(${calcY}px)` }}
        >
          <rect x="0" y="0" width="320" height="180" rx="16" fill="#1F2937" />
          <rect x="14" y="14" width="292" height="72" rx="8" fill="#111827" />
          <text x="300" y="56" textAnchor="end" fill="#9CA3AF" fontFamily="Arial" fontSize="16">$1,200 × 28.9% APR × 2yr</text>
          <text x="300" y="76" textAnchor="end" fill={ACCENT} fontFamily="Arial Black" fontSize="28">= $2,800</text>
          {[0,1,2,3].map((col) =>
            [0,1,2].map((row) => (
              <rect key={`${col}-${row}`} x={14 + col * 78} y={100 + row * 26} width="64" height="18" rx="4" fill="#374151" />
            ))
          )}
        </svg>

        <p style={headline(36, BLACK)}>CARRY $1,200 FOR 2 YEARS</p>

        {/* Progress bar */}
        <div style={{ width: 760, background: '#E5E7EB', borderRadius: 10, height: 28, overflow: 'hidden', position: 'relative' as const }}>
          <div style={{ width: barW, height: 28, background: `linear-gradient(90deg, #374151 0%, #374151 43%, ${ACCENT} 43%, ${ACCENT} 100%)`, borderRadius: 10 }} />
        </div>

        {/* Three boxes */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 28 }}>
          <div
            style={{
              opacity: box1Op,
              background: '#1F2937',
              borderRadius: 18,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              width: 230,
            }}
          >
            <p style={headline(52, WHITE)}>$1,200</p>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#9CA3AF', margin: 0, textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              what you bought
            </p>
          </div>
          <div
            style={{
              opacity: box2Op,
              background: '#2D1515',
              borderRadius: 18,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              width: 230,
            }}
          >
            <p style={headline(52, ACCENT)}>$1,600</p>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#9CA3AF', margin: 0, textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              interest paid
            </p>
          </div>
          <div
            style={{
              opacity: box3Op,
              background: ACCENT,
              borderRadius: 18,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              width: 230,
            }}
          >
            <p style={headline(52, WHITE)}>$2,800</p>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#FEE2E2', margin: 0, textAlign: 'center' as const, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              total paid
            </p>
          </div>
        </div>

        <p style={{ ...headline(30, '#6B7280'), opacity: subOp }}>ALL TO SAVE $34 AT CHECKOUT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Credit score drops — hard inquiries pile up ───────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Needle drops in stages
  const score = interpolate(frame, [30, 160], [720, 690], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const displayScore = Math.round(score);

  // Gauge: 0 = left (bad), 1 = right (good). 720 → 690 in 300-850 range
  const needleAngle = interpolate(displayScore, [300, 850], [-90, 90]);
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleX = 200 + 130 * Math.sin(needleRad);
  const needleY = 200 - 130 * Math.cos(needleRad);

  const inq1Op = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const inq2Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const inq3Op = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: titleOp, textAlign: 'center' as const }}>
          <p style={headline(38, WHITE)}>EVERY YES AT CHECKOUT</p>
          <p style={headline(38, ACCENT)}>COSTS YOUR CREDIT SCORE</p>
        </div>

        {/* Gauge SVG */}
        <svg width="400" height="220" viewBox="0 0 400 220">
          {/* Gauge arcs — colored segments */}
          <path d="M40,200 A160,160 0 0,1 118,55" fill="none" stroke="#EF4444" strokeWidth="26" strokeLinecap="round" />
          <path d="M118,55 A160,160 0 0,1 200,40" fill="none" stroke="#F59E0B" strokeWidth="26" strokeLinecap="round" />
          <path d="M200,40 A160,160 0 0,1 282,55" fill="none" stroke="#10B981" strokeWidth="26" strokeLinecap="round" />
          <path d="M282,55 A160,160 0 0,1 360,200" fill="none" stroke="#10B981" strokeWidth="26" strokeLinecap="round" />
          {/* Needle */}
          <line x1="200" y1="200" x2={needleX} y2={needleY} stroke={WHITE} strokeWidth="5" strokeLinecap="round" />
          <circle cx="200" cy="200" r="12" fill="#374151" stroke={WHITE} strokeWidth="3" />
          {/* Score display */}
          <text x="200" y="175" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="52">{displayScore}</text>
          <text x="200" y="200" textAnchor="middle" fill="#6B7280" fontFamily="Arial" fontSize="16">CREDIT SCORE</text>
        </svg>

        {/* Hard inquiry badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 760 }}>
          <div
            style={{
              opacity: inq1Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              background: '#1F2937',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <div style={{ background: ACCENT, borderRadius: 8, padding: '4px 12px' }}>
              <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: 0 }}>HARD INQUIRY</p>
            </div>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: WHITE, margin: 0, flex: 1 }}>
              Checkout signup #1 — Store A
            </p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>-10 pts</p>
          </div>
          <div
            style={{
              opacity: inq2Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              background: '#1F2937',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <div style={{ background: ACCENT, borderRadius: 8, padding: '4px 12px' }}>
              <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: 0 }}>HARD INQUIRY</p>
            </div>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: WHITE, margin: 0, flex: 1 }}>
              Checkout signup #2 — Store B
            </p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>-10 pts</p>
          </div>
          <div
            style={{
              opacity: inq3Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              background: '#1F2937',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <div style={{ background: ACCENT, borderRadius: 8, padding: '4px 12px' }}>
              <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: 0 }}>HARD INQUIRY</p>
            </div>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: WHITE, margin: 0, flex: 1 }}>
              Checkout signup #3 — Store C
            </p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>-10 pts</p>
          </div>
        </div>

        <p style={{ ...headline(38, ACCENT), opacity: totalOp }}>THREE CHECKOUTS = -30 POINTS</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — say no, use 2% flat card ────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badSpring = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 14, stiffness: 80 } });
  const goodSpring = spring({ frame: Math.max(0, frame - 55), fps: 30, config: { damping: 14, stiffness: 80 } });
  const badX = interpolate(badSpring, [0, 1], [-500, 0]);
  const goodX = interpolate(goodSpring, [0, 1], [500, 0]);

  const step1Op = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [135, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headOp, textAlign: 'center' as const }}>
          <p style={headline(46, BLACK)}>SAY NO AT</p>
          <p style={headline(46, ACCENT)}>THE REGISTER</p>
        </div>

        {/* Two cards comparison */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 50 }}>
          {/* Bad store card with X */}
          <div
            style={{
              transform: `translateX(${badX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ position: 'relative' as const }}>
              <svg width="230" height="144" viewBox="0 0 230 144">
                <rect x="0" y="0" width="230" height="144" rx="14" fill="#DC2626" opacity="0.5" />
                <text x="115" y="64" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="13">STORE CARD</text>
                <text x="115" y="96" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="30">28.9% APR</text>
                {/* Big red X overlay */}
                <line x1="20" y1="20" x2="210" y2="124" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                <line x1="210" y1="20" x2="20" y2="124" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: 0 }}>
              SKIP THIS
            </p>
          </div>

          {/* Arrow */}
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path d="M10,30 L50,30 M38,18 L50,30 L38,42" fill="none" stroke={BLACK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Good flat card */}
          <div
            style={{
              transform: `translateX(${goodX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <svg width="230" height="144" viewBox="0 0 230 144">
              <rect x="0" y="0" width="230" height="144" rx="14" fill="#1D4ED8" />
              <rect x="0" y="104" width="230" height="30" rx="0" fill="#1E3A8A" />
              <rect x="14" y="14" width="44" height="30" rx="5" fill="#93C5FD" />
              <text x="115" y="60" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="13">FLAT CASHBACK CARD</text>
              <text x="115" y="90" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="36">2%</text>
              <text x="115" y="118" textAnchor="middle" fill="#BFDBFE" fontFamily="Arial" fontSize="14">EVERYWHERE, NO CATCHES</text>
              {/* Checkmark badge */}
              <circle cx="196" cy="24" r="18" fill="#10B981" />
              <path d="M186,24 L193,31 L206,17" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#10B981', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: 0 }}>
              USE THIS
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 800 }}>
          <div
            style={{
              opacity: step1Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              background: '#FEE2E2',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, lineHeight: 1 }}>1</span>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: BLACK, margin: 0 }}>
              Say no at the register — no matter the discount
            </p>
          </div>
          <div
            style={{
              opacity: step2Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              background: '#FEE2E2',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, lineHeight: 1 }}>2</span>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: BLACK, margin: 0 }}>
              Use a flat 2% cashback card for every purchase instead
            </p>
          </div>
          <div
            style={{
              opacity: step3Op,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              background: '#FEE2E2',
              borderRadius: 12,
              padding: '14px 24px',
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, lineHeight: 1 }}>3</span>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 19, color: BLACK, margin: 0 }}>
              Never open a card for a one-time discount — ever
            </p>
          </div>
        </div>

        <p style={{ ...headline(30, ACCENT), opacity: ctaOp }}>
          FOLLOW FOR MORE MONEY TRAPS
        </p>
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
