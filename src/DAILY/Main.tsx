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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 10, stiffness: 90 } });
  const glowPulse = interpolate(frame % 60, [0, 30, 60], [0.5, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 130,
      }}>
        <p style={{ ...headline(60, WHITE), marginBottom: 0 }}>THE BALANCE</p>
        <p style={{ ...headline(72, ACCENT), marginBottom: 50 }}>TRAP</p>

        {/* Credit card SVG */}
        <svg
          width={480} height={290} viewBox="0 0 480 290"
          style={{ transform: `scale(${cardScale})`, transformOrigin: 'center center' }}
        >
          <rect x={0} y={0} width={480} height={290} rx={24} fill="#1A2E4A" stroke="#2563EB" strokeWidth={3} />
          <rect x={0} y={0} width={480} height={62} rx={24} fill="#0D1B2E" />
          <rect x={0} y={38} width={480} height={24} fill="#0D1B2E" />
          {/* Chip */}
          <rect x={36} y={86} width={60} height={48} rx={8} fill="#D4A017" />
          <line x1={36} y1={101} x2={96} y2={101} stroke="#9A7B0A" strokeWidth={1.5} />
          <line x1={36} y1={116} x2={96} y2={116} stroke="#9A7B0A" strokeWidth={1.5} />
          <line x1={58} y1={86} x2={58} y2={134} stroke="#9A7B0A" strokeWidth={1.5} />
          <line x1={74} y1={86} x2={74} y2={134} stroke="#9A7B0A" strokeWidth={1.5} />
          {/* Card number dots — last group in red */}
          {([0, 1, 2, 3] as number[]).map((g) =>
            ([0, 1, 2, 3] as number[]).map((d) => (
              <circle
                key={`${g}-${d}`}
                cx={44 + g * 106 + d * 14} cy={190} r={5}
                fill={g === 3 ? ACCENT : '#3B5A7A'}
              />
            ))
          )}
          <text x={36} y={258} fontFamily={FONT} fontSize={22} fill="#5A8AB0">BALANCE DUE</text>
          <text x={280} y={258} fontFamily={FONT} fontSize={42} fontWeight="bold" fill={ACCENT}>$50.00</text>
        </svg>

        {/* Pulsing badge */}
        <div style={{
          marginTop: 36,
          background: ACCENT,
          borderRadius: 18,
          padding: '16px 48px',
          transform: `translateY(${(1 - badgeIn) * -30}px)`,
          opacity: badgeIn,
          boxShadow: `0 0 ${Math.round(50 * glowPulse)}px rgba(239,68,68,0.75)`,
        }}>
          <span style={{ fontFamily: FONT, fontSize: 44, color: WHITE, letterSpacing: '0.08em' }}>
            JUST $50 LEFT OVER
          </span>
        </div>

        <div style={{ opacity: subOpacity, marginTop: 44, paddingLeft: 60, paddingRight: 60 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.45, margin: 0 }}>
            That tiny balance just broke a rule
          </p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, textAlign: 'center', lineHeight: 1.45, margin: 0 }}>
            most people never knew existed.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  // 25 calendar cells; animate each crossing out sequentially
  const crossProgress = interpolate(frame, [30, 160], [0, 25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampOpacity = interpolate(frame, [165, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampScale = spring({ frame: Math.max(0, frame - 162), fps, config: { damping: 8, stiffness: 120 } });

  const COLS = 5;
  const ROWS = 5;
  const CELL = 110;
  const GAP = 8;
  const gridW = COLS * CELL + (COLS - 1) * GAP;
  const gridH = ROWS * CELL + (ROWS - 1) * GAP;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 130,
      }}>
        <p style={{ ...headline(52, BLACK), transform: `translateY(${(1 - titleIn) * -20}px)`, opacity: titleIn }}>
          GRACE PERIOD
        </p>
        <p style={{ ...headline(64, ACCENT), marginBottom: 50, transform: `translateY(${(1 - titleIn) * -20}px)`, opacity: titleIn }}>
          GONE
        </p>

        {/* 25-day calendar grid */}
        <svg width={gridW} height={gridH} viewBox={`0 0 ${gridW} ${gridH}`}>
          {Array.from({ length: Math.max(0, Math.floor(ROWS * COLS)) }).map((_, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const x = col * (CELL + GAP);
            const y = row * (CELL + GAP);
            const crossed = i < crossProgress;
            return (
              <g key={i}>
                <rect
                  x={x} y={y} width={CELL} height={CELL} rx={12}
                  fill={crossed ? '#FEE2E2' : '#DCFCE7'}
                  stroke={crossed ? ACCENT : '#16A34A'}
                  strokeWidth={2}
                />
                <text
                  x={x + CELL / 2} y={y + CELL / 2 + 12}
                  fontFamily={FONT} fontSize={28} fontWeight="bold"
                  fill={crossed ? ACCENT : '#16A34A'}
                  textAnchor="middle"
                >
                  {i + 1}
                </text>
                {crossed && (
                  <>
                    <line x1={x + 16} y1={y + 16} x2={x + CELL - 16} y2={y + CELL - 16} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
                    <line x1={x + CELL - 16} y1={y + 16} x2={x + 16} y2={y + CELL - 16} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* GRACE PERIOD ELIMINATED stamp */}
        <div style={{
          marginTop: 50,
          opacity: stampOpacity,
          transform: `scale(${stampScale})`,
          border: `6px solid ${ACCENT}`,
          borderRadius: 14,
          padding: '16px 40px',
          background: '#FEF2F2',
        }}>
          <p style={{ ...headline(38, ACCENT), margin: 0 }}>25-DAY BUFFER: DELETED</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 30, color: '#374151', textAlign: 'center', marginTop: 30, paddingLeft: 60, paddingRight: 60, lineHeight: 1.4 }}>
          Carry <span style={{ color: ACCENT, fontWeight: 'bold' }}>any</span> balance over and your grace period disappears — completely.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cartIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const clockHandAngle = interpolate(frame, [0, 80], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const dollarGrow = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 10, stiffness: 60 } });
  const warningOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const handX = 60 + 40 * Math.sin((clockHandAngle * Math.PI) / 180);
  const handY = 60 - 40 * Math.cos((clockHandAngle * Math.PI) / 180);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 130,
      }}>
        <p style={{ ...headline(52, WHITE) }}>INTEREST</p>
        <p style={{ ...headline(72, ACCENT), marginBottom: 50 }}>STARTS NOW</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 60, transform: `scale(${cartIn})` }}>
          {/* Shopping cart SVG */}
          <svg width={220} height={220} viewBox="0 0 220 220">
            {/* Cart body */}
            <path d="M 40 60 L 50 60 L 70 140 L 180 140 L 200 80 L 60 80 Z" fill="none" stroke={WHITE} strokeWidth={6} strokeLinejoin="round" />
            <rect x={60} y={80} width={140} height={60} rx={6} fill="#1E3A5F" stroke={WHITE} strokeWidth={3} />
            {/* Wheels */}
            <circle cx={90} cy={160} r={18} fill="none" stroke={WHITE} strokeWidth={5} />
            <circle cx={90} cy={160} r={5} fill={WHITE} />
            <circle cx={160} cy={160} r={18} fill="none" stroke={WHITE} strokeWidth={5} />
            <circle cx={160} cy={160} r={5} fill={WHITE} />
            {/* Handle */}
            <path d="M 20 40 Q 30 60 50 60" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" />
            {/* Credit card inside cart */}
            <rect x={75} y={88} width={110} height={44} rx={6} fill="#2563EB" />
            <rect x={75} y={88} width={110} height={14} rx={6} fill="#1D4ED8" />
            <rect x={82} y={107} width={30} height={18} rx={4} fill="#D4A017" />
          </svg>

          {/* Clock */}
          <svg width={120} height={120} viewBox="0 0 120 120">
            <circle cx={60} cy={60} r={55} fill="none" stroke={ACCENT} strokeWidth={5} />
            <circle cx={60} cy={60} r={6} fill={ACCENT} />
            {/* Hour marks */}
            {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as number[]).map((i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={60 + 42 * Math.sin(a)} y1={60 - 42 * Math.cos(a)}
                  x2={60 + 50 * Math.sin(a)} y2={60 - 50 * Math.cos(a)}
                  stroke={WHITE} strokeWidth={i % 3 === 0 ? 3 : 1.5}
                />
              );
            })}
            {/* Minute hand */}
            <line x1={60} y1={60} x2={handX} y2={handY} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
            <text x={60} y={80} fontFamily={FONT} fontSize={16} fill={ACCENT} textAnchor="middle">DAY 0</text>
          </svg>
        </div>

        {/* Growing dollar sign */}
        <div style={{
          marginTop: 30,
          transform: `scale(${dollarGrow})`,
          background: ACCENT,
          borderRadius: 999,
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(239,68,68,0.6)',
        }}>
          <span style={{ fontFamily: FONT, fontSize: 56, color: WHITE }}>$</span>
        </div>

        <div style={{ opacity: warningOpacity, marginTop: 40, paddingLeft: 60, paddingRight: 60 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
            Groceries, gas, dinner — every swipe accrues interest from
            <span style={{ color: ACCENT }}> day one</span>. No buffer. No grace.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const bar1H = interpolate(frame, [20, 100], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const bar2H = interpolate(frame, [40, 160], [0, 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const aprIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 80 } });
  const dollarCount = interpolate(frame, [40, 160], [0, 3200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const BAR_W = 180;
  const MAX_H = 340;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110,
      }}>
        <p style={{ ...headline(48, BLACK), transform: `translateY(${(1 - titleIn) * -16}px)`, opacity: titleIn }}>
          $3,200
        </p>
        <p style={{ ...headline(56, ACCENT), marginBottom: 40, transform: `translateY(${(1 - titleIn) * -16}px)`, opacity: titleIn }}>
          INVISIBLE INTEREST
        </p>

        {/* Bar chart */}
        <svg width={520} height={420} viewBox="0 0 520 420">
          {/* Axes */}
          <line x1={60} y1={20} x2={60} y2={380} stroke="#9CA3AF" strokeWidth={2} />
          <line x1={60} y1={380} x2={480} y2={380} stroke="#9CA3AF" strokeWidth={2} />

          {/* Bar 1: What you think */}
          <rect
            x={90} y={380 - bar1H} width={BAR_W} height={bar1H}
            fill="#16A34A" rx={8}
          />
          <text x={180} y={380 - bar1H - 12} fontFamily={FONT} fontSize={22} fill="#16A34A" textAnchor="middle">$0 EXTRA</text>
          <text x={180} y={408} fontFamily={FONT} fontSize={20} fill={BLACK} textAnchor="middle">WHAT YOU</text>
          <text x={180} y={430} fontFamily={FONT} fontSize={20} fill={BLACK} textAnchor="middle">THINK</text>

          {/* Bar 2: What you actually pay */}
          <rect
            x={290} y={380 - bar2H} width={BAR_W} height={bar2H}
            fill={ACCENT} rx={8}
          />
          <text x={380} y={380 - bar2H - 12} fontFamily={FONT} fontSize={26} fill={ACCENT} textAnchor="middle">
            ${Math.round(dollarCount).toLocaleString()}
          </text>
          <text x={380} y={408} fontFamily={FONT} fontSize={20} fill={BLACK} textAnchor="middle">WHAT YOU</text>
          <text x={380} y={430} fontFamily={FONT} fontSize={20} fill={BLACK} textAnchor="middle">ACTUALLY PAY</text>
        </svg>

        {/* 28% APR badge */}
        <div style={{
          transform: `scale(${aprIn})`,
          background: ACCENT,
          borderRadius: 14,
          padding: '12px 36px',
          boxShadow: '0 4px 24px rgba(239,68,68,0.4)',
        }}>
          <span style={{ fontFamily: FONT, fontSize: 36, color: WHITE, letterSpacing: '0.1em' }}>
            28% APR — TODAY'S AVERAGE
          </span>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 28, color: '#374151', textAlign: 'center', marginTop: 24, paddingLeft: 60, paddingRight: 60, lineHeight: 1.4 }}>
          Extra interest from households that occasionally carry a balance — and they never even saw it coming.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bankIn = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const statIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 80 } });

  // 6 people arranged in a semicircle around the bank
  const people = [
    { x: 100, y: 620 }, { x: 240, y: 540 }, { x: 400, y: 520 },
    { x: 560, y: 540 }, { x: 700, y: 600 }, { x: 820, y: 700 },
  ] as const;
  const bankX = 460;
  const bankY = 900;

  const arrowProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100,
      }}>
        <p style={{ ...headline(52, WHITE) }}>DESIGNED</p>
        <p style={{ ...headline(64, ACCENT), marginBottom: 20 }}>THIS WAY</p>

        <svg width={920} height={1000} viewBox="0 0 920 1000" style={{ transform: `scale(${bankIn * 0.9 + 0.1})` }}>
          {/* Bank building */}
          <rect x={340} y={780} width={240} height={180} fill="#1E3A5F" stroke="#2563EB" strokeWidth={3} />
          <polygon points="340,780 460,700 580,780" fill="#1D4ED8" />
          {/* Bank columns */}
          {([0, 1, 2] as number[]).map((i) => (
            <rect key={i} x={360 + i * 60} y={790} width={18} height={160} rx={4} fill="#3B82F6" />
          ))}
          {/* Bank door */}
          <rect x={430} y={870} width={60} height={90} rx={6} fill="#0F2040" stroke="#3B82F6" strokeWidth={2} />
          {/* Bank label */}
          <text x={460} y={760} fontFamily={FONT} fontSize={22} fill="#93C5FD" textAnchor="middle">BANK</text>

          {/* Person silhouettes */}
          {people.map((p, i) => {
            const arrowDraw = interpolate(arrowProgress, [i * 0.12, i * 0.12 + 0.4], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const midX = (p.x + bankX) / 2;
            const midY = (p.y + bankY) / 2;
            const arrowEndX = p.x + (bankX - p.x) * arrowDraw;
            const arrowEndY = p.y + (bankY - p.y) * arrowDraw;
            return (
              <g key={i}>
                {/* Person head */}
                <circle cx={p.x} cy={p.y - 30} r={22} fill="#60A5FA" />
                {/* Person body */}
                <path
                  d={`M ${p.x - 20} ${p.y} Q ${p.x} ${p.y + 50} ${p.x + 20} ${p.y}`}
                  fill="#3B82F6"
                />
                <rect x={p.x - 20} y={p.y} width={40} height={50} rx={8} fill="#3B82F6" />
                {/* Money arrow */}
                <line
                  x1={p.x} y1={p.y}
                  x2={arrowEndX} y2={arrowEndY}
                  stroke={ACCENT} strokeWidth={3} strokeDasharray="8 4"
                />
                {arrowDraw > 0.9 && (
                  <polygon
                    points={`${bankX - 8},${bankY - 8} ${bankX + 8},${bankY - 8} ${bankX},${bankY + 8}`}
                    fill={ACCENT}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 55% statistic */}
        <div style={{
          position: 'absolute',
          bottom: 120,
          transform: `scale(${statIn})`,
          background: ACCENT,
          borderRadius: 18,
          padding: '18px 50px',
          boxShadow: '0 0 40px rgba(239,68,68,0.5)',
        }}>
          <p style={{ ...headline(52, WHITE), margin: 0 }}>55% SLIP UP ONCE A YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: 0 }}>
            Banks designed the rule for that exact moment.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const stampIn = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 8, stiffness: 110 } });
  const walletIn = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 80 } });
  const savingsCount = interpolate(frame, [90, 180], [0, 3200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampRotate = interpolate(frame, [50, 80], [-15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110,
      }}>
        <p style={{ ...headline(48, BLACK), transform: `translateY(${(1 - titleIn) * -16}px)`, opacity: titleIn }}>
          THE
        </p>
        <p style={{ ...headline(72, '#16A34A'), marginBottom: 40, transform: `translateY(${(1 - titleIn) * -16}px)`, opacity: titleIn }}>
          $3,200 FIX
        </p>

        {/* Calendar with PAID IN FULL stamp */}
        <div style={{ position: 'relative', marginBottom: 30 }}>
          <svg width={460} height={300} viewBox="0 0 460 300">
            {/* Calendar frame */}
            <rect x={0} y={0} width={460} height={300} rx={20} fill="white" stroke="#D1D5DB" strokeWidth={3} />
            {/* Calendar header */}
            <rect x={0} y={0} width={460} height={60} rx={20} fill="#1D4ED8" />
            <rect x={0} y={40} width={460} height={20} fill="#1D4ED8" />
            <text x={230} y={38} fontFamily={FONT} fontSize={26} fill={WHITE} textAnchor="middle">STATEMENT DUE</text>
            {/* Calendar grid — 5×5 small cells */}
            {Array.from({ length: Math.max(0, Math.floor(25)) }).map((_, i) => {
              const col = i % 5;
              const row = Math.floor(i / 5);
              return (
                <g key={i}>
                  <rect x={16 + col * 86} y={72 + row * 44} width={78} height={36} rx={6} fill="#DCFCE7" />
                  <text x={55 + col * 86} y={96 + row * 44} fontFamily={FONT} fontSize={18} fill="#16A34A" textAnchor="middle">{i + 1}</text>
                </g>
              );
            })}
          </svg>

          {/* PAID IN FULL stamp overlay */}
          <div style={{
            position: 'absolute',
            top: 80,
            left: 40,
            transform: `scale(${stampIn}) rotate(${stampRotate}deg)`,
            border: '6px solid #16A34A',
            borderRadius: 12,
            padding: '14px 28px',
            background: 'rgba(220,252,231,0.95)',
          }}>
            <p style={{ ...headline(46, '#16A34A'), margin: 0 }}>PAID IN FULL</p>
          </div>
        </div>

        {/* Wallet with coins */}
        <svg width={220} height={160} viewBox="0 0 220 160" style={{ transform: `scale(${walletIn})` }}>
          {/* Wallet body */}
          <rect x={10} y={30} width={200} height={120} rx={16} fill="#1E3A5F" />
          <rect x={130} y={50} width={80} height={60} rx={12} fill="#2563EB" />
          <circle cx={175} cy={80} r={14} fill="#D4A017" />
          {/* Coin stack */}
          {([0, 1, 2] as number[]).map((i) => (
            <ellipse key={i} cx={70} cy={110 - i * 14} rx={40} ry={10} fill={i === 0 ? '#D4A017' : i === 1 ? '#F59E0B' : '#FCD34D'} />
          ))}
        </svg>

        {/* Savings counter */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 56, color: '#16A34A', textAlign: 'center', margin: 0, letterSpacing: '0.05em' }}>
            ${Math.round(savingsCount).toLocaleString()} SAVED
          </p>
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaOpacity, marginTop: 28, paddingLeft: 50, paddingRight: 50 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#374151', textAlign: 'center', lineHeight: 1.45, margin: 0 }}>
            Pay the <span style={{ color: '#16A34A', fontWeight: 'bold' }}>full statement balance</span> every month.
            Not the minimum. Not 99%. The whole thing.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, textAlign: 'center', lineHeight: 1.45, marginTop: 12 }}>
            Follow for more hidden money traps.
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



