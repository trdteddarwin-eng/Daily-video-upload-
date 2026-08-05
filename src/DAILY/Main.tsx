import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#FFFBEB';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GRAY = '#6B7280';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

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
  return (
    <AbsoluteFill style={{ background: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const carX = interpolate(frame, [0, 35], [1200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const counterOp = interpolate(frame, [48, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counter = Math.floor(
    interpolate(frame, [55, 190], [0, 12800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 44,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(62, WHITE)}>YOUR COMMUTE'S</p>
          <p style={headline(62, ACCENT)}>HIDDEN PRICE TAG</p>
        </div>

        {/* Car SVG - slides in from right */}
        <svg
          width="480"
          height="210"
          viewBox="0 0 480 210"
          style={{ transform: `translateX(${carX}px)`, display: 'block' }}
        >
          {/* Car body */}
          <rect x="20" y="110" width="440" height="72" rx="12" fill={ACCENT} />
          {/* Cabin */}
          <rect x="105" y="52" width="230" height="68" rx="14" fill={ACCENT} />
          {/* Windshield */}
          <rect x="120" y="62" width="96" height="48" rx="6" fill="#1A2332" opacity="0.88" />
          {/* Rear window */}
          <rect x="228" y="62" width="93" height="48" rx="6" fill="#1A2332" opacity="0.88" />
          {/* Front wheel */}
          <circle cx="370" cy="182" r="34" fill={BLACK} />
          <circle cx="370" cy="182" r="17" fill="#333" />
          {/* Rear wheel */}
          <circle cx="110" cy="182" r="34" fill={BLACK} />
          <circle cx="110" cy="182" r="17" fill="#333" />
          {/* Headlight */}
          <ellipse cx="454" cy="130" rx="14" ry="9" fill="#FFF9C4" />
          {/* Exhaust pipe */}
          <rect x="22" y="153" width="26" height="9" rx="4" fill="#555" />
          {/* Exhaust puff */}
          <circle cx="16" cy="152" r="7" fill="#888" opacity="0.45" />
          <circle cx="10" cy="145" r="10" fill="#888" opacity="0.22" />
        </svg>

        {/* Dollar counter */}
        <div style={{ opacity: counterOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '0 0 8px' }}>
            draining from you annually
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 102,
              color: ACCENT,
              letterSpacing: '0.04em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            ${counter.toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const calOp = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const xCount = Math.floor(
    interpolate(frame, [40, 165], [0, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const subOp = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const COLS = 7;
  const ROWS = 4;
  const CELL = 68;
  const GAP = 10;
  const totalW = COLS * (CELL + GAP) - GAP;
  const totalH = ROWS * (CELL + GAP) - GAP;
  const cells = Array.from({ length: Math.max(0, Math.floor(COLS * ROWS)) }, (_, i) => i);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 40,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(70, BLACK)}>225 HOURS</p>
          <p style={{ ...headline(34, ACCENT), marginTop: 8 }}>lost to commuting every year</p>
        </div>

        {/* Calendar grid */}
        <div style={{ opacity: calOp }}>
          <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
            {cells.map((i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const cx = col * (CELL + GAP);
              const cy = row * (CELL + GAP);
              const marked = i < xCount;
              return (
                <g key={i}>
                  <rect x={cx} y={cy} width={CELL} height={CELL} rx="8" fill={marked ? ACCENT : '#DDD'} />
                  {marked && (
                    <>
                      <line
                        x1={cx + 14} y1={cy + 14}
                        x2={cx + CELL - 14} y2={cy + CELL - 14}
                        stroke={BLACK} strokeWidth="5" strokeLinecap="round"
                      />
                      <line
                        x1={cx + CELL - 14} y1={cy + 14}
                        x2={cx + 14} y2={cy + CELL - 14}
                        stroke={BLACK} strokeWidth="5" strokeLinecap="round"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ opacity: subOp, textAlign: 'center' }}>
          <p style={headline(42, BLACK)}>= 28 FULL WORK DAYS</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '8px 0 0' }}>
            you'll never get paid for
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pumpS = spring({ frame, fps, config: { damping: 13, stiffness: 80 }, from: 0, to: 1 });
  const labelOp = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counter = Math.floor(
    interpolate(frame, [40, 185], [0, 5360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const barW = interpolate(frame, [40, 185], [0, 680], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOp = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>THEN THERE'S</p>
          <p style={headline(52, ACCENT)}>YOUR CAR</p>
        </div>

        {/* Gas pump SVG */}
        <svg
          width="200"
          height="280"
          viewBox="0 0 200 280"
          style={{ transform: `scale(${pumpS})`, transformOrigin: 'center bottom' }}
        >
          {/* Base */}
          <rect x="30" y="262" width="140" height="16" rx="5" fill="#333" />
          {/* Pump body */}
          <rect x="40" y="50" width="110" height="212" rx="10" fill="#374151" />
          {/* Display screen */}
          <rect x="56" y="72" width="78" height="50" rx="5" fill="#0A2A0A" />
          {/* Fuel level indicator */}
          <rect x="56" y="140" width="78" height="16" rx="4" fill="#1A2A1A" />
          <rect x="58" y="142" width="48" height="12" rx="3" fill={ACCENT} />
          {/* Buttons */}
          <rect x="56" y="168" width="22" height="14" rx="3" fill={ACCENT} />
          <rect x="84" y="168" width="22" height="14" rx="3" fill="#555" />
          <rect x="112" y="168" width="22" height="14" rx="3" fill="#555" />
          {/* Nozzle holder */}
          <rect x="148" y="90" width="18" height="55" rx="5" fill="#4B5563" />
          {/* Hose */}
          <path
            d="M148 115 Q176 115 176 148 Q176 185 152 194"
            stroke="#555"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
          {/* Nozzle */}
          <rect x="136" y="186" width="28" height="14" rx="4" fill="#6B7280" />
          <rect x="122" y="191" width="18" height="8" rx="3" fill="#9CA3AF" />
        </svg>

        <div style={{ opacity: labelOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: GRAY, margin: '0 0 4px' }}>
            32 miles/day × $0.67/mile × 250 days
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 94,
              color: ACCENT,
              letterSpacing: '0.04em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            ${counter.toLocaleString()}
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: WHITE, margin: '6px 0 0' }}>
            in car costs per year
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 760, opacity: labelOp }}>
          <div style={{ height: 18, background: '#2A2A2A', borderRadius: 9, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: barW, background: ACCENT, borderRadius: 9 }} />
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#FCD34D',
            textAlign: 'center',
            opacity: subOp,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          gas, depreciation, insurance, maintenance — before coffee...
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const s1 = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 90 }, from: 0, to: 1 });
  const s2 = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 90 }, from: 0, to: 1 });
  const s3 = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 14, stiffness: 90 }, from: 0, to: 1 });
  const totalOp = interpolate(frame, [115, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 44,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(48, BLACK)}>NOW ADD</p>
          <p style={headline(48, ACCENT)}>THE HIDDEN EXTRAS</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 56, alignItems: 'flex-end' }}>
          {/* Coffee cup */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${s1})`,
              transformOrigin: 'bottom center',
            }}
          >
            <svg width="120" height="148" viewBox="0 0 120 148">
              {/* Steam */}
              <path d="M40 22 Q46 10 40 4" stroke="#BBB" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M60 16 Q66 4 60 -2" stroke="#BBB" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M80 22 Q86 10 80 4" stroke="#BBB" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Cup body */}
              <path d="M18 38 L28 138 Q60 152 92 138 L102 38 Z" fill={ACCENT} />
              {/* Cup rim */}
              <ellipse cx="60" cy="38" rx="43" ry="11" fill="#D97706" />
              {/* Handle */}
              <path d="M100 58 Q128 58 128 85 Q128 112 100 112" stroke="#D97706" strokeWidth="10" fill="none" strokeLinecap="round" />
              {/* Coffee surface */}
              <ellipse cx="60" cy="44" rx="38" ry="8" fill="#92400E" opacity="0.6" />
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: GRAY, margin: '8px 0 2px', textAlign: 'center' }}>
              COMMUTE COFFEE
            </p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>$730/YR</p>
          </div>

          {/* Lunch bag */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${s2})`,
              transformOrigin: 'bottom center',
            }}
          >
            <svg width="120" height="148" viewBox="0 0 120 148">
              {/* Handles */}
              <path d="M36 48 Q36 18 60 18 Q84 18 84 48" stroke="#7C3AED" strokeWidth="9" fill="none" strokeLinecap="round" />
              {/* Bag body */}
              <rect x="14" y="46" width="92" height="96" rx="8" fill="#8B5CF6" />
              {/* Top fold */}
              <rect x="14" y="46" width="92" height="22" rx="4" fill="#7C3AED" />
              {/* Sandwich layers */}
              <rect x="28" y="86" width="64" height="11" rx="5" fill="#FDE68A" />
              <rect x="28" y="100" width="64" height="9" rx="4" fill="#6EE7B7" />
              <rect x="28" y="112" width="64" height="11" rx="5" fill="#FDE68A" />
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: GRAY, margin: '8px 0 2px', textAlign: 'center' }}>
              OFFICE LUNCH
            </p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>$1,100/YR</p>
          </div>

          {/* Briefcase */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${s3})`,
              transformOrigin: 'bottom center',
            }}
          >
            <svg width="120" height="148" viewBox="0 0 120 148">
              {/* Body */}
              <rect x="8" y="52" width="104" height="88" rx="8" fill="#374151" />
              {/* Handle strap */}
              <path d="M40 52 L40 28 Q60 18 80 28 L80 52" stroke="#4B5563" strokeWidth="9" fill="none" strokeLinecap="round" />
              {/* Clasp */}
              <rect x="48" y="88" width="24" height="16" rx="4" fill={ACCENT} />
              {/* Center seam */}
              <line x1="8" y1="96" x2="112" y2="96" stroke="#4B5563" strokeWidth="3" />
              {/* Top stitching */}
              <rect x="18" y="62" width="84" height="5" rx="2" fill="#4B5563" />
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: GRAY, margin: '8px 0 2px', textAlign: 'center' }}>
              WORK CLOTHES
            </p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>$370/YR</p>
          </div>
        </div>

        <div style={{ opacity: totalOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: GRAY, margin: '0 0 6px' }}>invisible extras total</p>
          <p style={headline(72, BLACK)}>$2,200/YEAR</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: GRAY, margin: '6px 0 0' }}>most budgets never count this</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const bar1H = interpolate(frame, [30, 120], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bar2H = interpolate(frame, [65, 200], [0, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label1Op = interpolate(frame, [118, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label2Op = interpolate(frame, [180, 205], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOp = interpolate(frame, [150, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const BAR_W = 190;
  const MAX_H = 560;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 24,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>IF YOU INVESTED IT INSTEAD</p>
          <p style={{ ...headline(30, ACCENT), marginTop: 8 }}>30 years at 10% returns</p>
        </div>

        {/* Fixed-height chart container — bars grow upward from baseline */}
        <div style={{ position: 'relative', width: 560, height: MAX_H + 10 }}>
          {/* Baseline */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 5,
              background: '#555',
            }}
          />
          {/* Bar 1 */}
          <div
            style={{
              position: 'absolute',
              bottom: 5,
              left: 60,
              width: BAR_W,
              height: Math.max(0, bar1H),
              background: '#666',
              borderRadius: '8px 8px 0 0',
            }}
          />
          {/* Bar 2 */}
          <div
            style={{
              position: 'absolute',
              bottom: 5,
              right: 60,
              width: BAR_W,
              height: Math.max(0, Math.min(bar2H, MAX_H)),
              background: ACCENT,
              borderRadius: '8px 8px 0 0',
            }}
          />
        </div>

        {/* Labels below chart */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 560,
            justifyContent: 'space-between',
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          <div style={{ opacity: label1Op, width: BAR_W, textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, letterSpacing: '0.05em' }}>$12,800</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: GRAY, margin: 0 }}>per year</p>
          </div>
          <div style={{ opacity: label2Op, width: BAR_W, textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>$2.2M</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: GRAY, margin: 0 }}>in 30 years</p>
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#FCD34D',
            textAlign: 'center',
            opacity: subOp,
            lineHeight: 1.4,
            maxWidth: 760,
            margin: 0,
          }}
        >
          your commute is the most expensive habit you've never budgeted for.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 70 }, from: 0, to: 1 });
  const text1Op = interpolate(frame, [45, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const text2Op = interpolate(frame, [90, 118], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaS = spring({ frame: Math.max(0, frame - 132), fps, config: { damping: 11, stiffness: 100 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        {/* Person at home desk with laptop */}
        <svg
          width="360"
          height="300"
          viewBox="0 0 360 300"
          style={{ transform: `scale(${personS})`, transformOrigin: 'bottom center' }}
        >
          {/* Desk legs */}
          <rect x="46" y="234" width="14" height="60" rx="4" fill="#78350F" />
          <rect x="300" y="234" width="14" height="60" rx="4" fill="#78350F" />
          {/* Desk top */}
          <rect x="20" y="216" width="320" height="18" rx="6" fill="#92400E" />
          {/* Laptop screen */}
          <rect x="98" y="148" width="164" height="104" rx="6" fill="#374151" />
          <rect x="106" y="155" width="148" height="82" rx="4" fill="#0D1117" />
          {/* Screen content lines */}
          <rect x="114" y="163" width="72" height="8" rx="2" fill={ACCENT} />
          <rect x="114" y="177" width="50" height="5" rx="2" fill="#555" />
          <rect x="114" y="188" width="80" height="5" rx="2" fill="#555" />
          <rect x="114" y="199" width="60" height="5" rx="2" fill="#555" />
          {/* Laptop base */}
          <rect x="80" y="250" width="200" height="10" rx="5" fill="#4B5563" />
          {/* Person head */}
          <circle cx="180" cy="92" r="44" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="168" cy="87" r="6" fill={BLACK} />
          <circle cx="192" cy="87" r="6" fill={BLACK} />
          {/* Smile */}
          <path d="M167 106 Q180 118 193 106" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Body */}
          <rect x="148" y="134" width="64" height="82" rx="10" fill="#3B82F6" />
          {/* Arms resting on desk */}
          <rect x="108" y="190" width="44" height="18" rx="8" fill="#3B82F6" />
          <rect x="208" y="190" width="44" height="18" rx="8" fill="#3B82F6" />
          {/* House icon in corner */}
          <path d="M290 28 L318 52 L310 52 L310 80 L270 80 L270 52 L262 52 Z" fill={ACCENT} opacity="0.32" />
          <rect x="278" y="56" width="14" height="24" rx="3" fill={ACCENT} opacity="0.48" />
        </svg>

        <div style={{ opacity: text1Op, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>YOUR COMMUTE ISN'T</p>
          <p style={headline(46, ACCENT)}>JUST LOST TIME</p>
        </div>

        <div style={{ opacity: text2Op, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 30,
              color: BLACK,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            it's $2.2 million in retirement wealth.
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 26,
              color: GRAY,
              margin: '8px 0 0',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            remote work · move closer · carpool<br />
            every change pays you back in millions.
          </p>
        </div>

        <div style={{ transform: `scale(${ctaS})` }}>
          <div
            style={{
              background: ACCENT,
              borderRadius: 50,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 52,
              paddingRight: 52,
            }}
          >
            <p style={headline(34, BLACK)}>FOLLOW FOR MORE MONEY MATH</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
