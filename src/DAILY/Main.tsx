import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

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

// Scene 1: "The Latte Lie" — coffee cup with red X
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cupScale = spring({ frame, fps, config: { damping: 12, stiffness: 150 }, durationInFrames: 45 });

  const xOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xScale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 8, stiffness: 220 }, durationInFrames: 30 });

  const topLabelOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const topLabelY = interpolate(frame, [15, 40], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bottomOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomY = interpolate(frame, [80, 110], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steamOp1 = interpolate(frame % 60, [0, 20, 50, 60], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const steamOp2 = interpolate((frame + 20) % 60, [0, 20, 50, 60], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const steamOp3 = interpolate((frame + 40) % 60, [0, 20, 50, 60], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top label */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: topLabelOpacity,
          transform: `translateY(${topLabelY}px)`,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 36, color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: 0 }}>
          Financial Gurus Say...
        </p>
      </div>

      {/* Coffee cup */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: '50%',
          transform: `translateX(-50%) translateY(-50%) scale(${cupScale})`,
        }}
      >
        <svg width="220" height="240" viewBox="0 0 220 240">
          {/* Steam */}
          <path d="M 72 50 Q 82 28 72 10" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" opacity={steamOp1} />
          <path d="M 110 44 Q 120 22 110 4" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" opacity={steamOp2} />
          <path d="M 148 50 Q 158 28 148 10" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" opacity={steamOp3} />
          {/* Cup rim */}
          <rect x="18" y="58" width="184" height="20" rx="8" fill="#A0522D" />
          {/* Cup body */}
          <rect x="28" y="75" width="164" height="135" rx="10" fill="#8B4513" />
          {/* Handle */}
          <path d="M 192 100 Q 248 100 248 148 Q 248 196 192 196" stroke="#A0522D" strokeWidth="20" fill="none" strokeLinecap="round" />
          {/* Price */}
          <text x="110" y="158" textAnchor="middle" fill={WHITE} fontSize="46" fontWeight="bold" fontFamily="Arial Black, Arial">
            $6
          </text>
          <text x="110" y="196" textAnchor="middle" fill="#ccc" fontSize="22" fontFamily="Arial">
            per day
          </text>
        </svg>

        {/* Red X */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            height: 240,
            opacity: xOpacity,
            transform: `scale(${xScale})`,
          }}
        >
          <svg width="220" height="240" viewBox="0 0 220 240">
            <line x1="20" y1="20" x2="200" y2="220" stroke={RED} strokeWidth="20" strokeLinecap="round" />
            <line x1="200" y1="20" x2="20" y2="220" stroke={RED} strokeWidth="20" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Bottom headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 240,
          left: 50,
          right: 50,
          textAlign: 'center',
          opacity: bottomOpacity,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <p style={{ ...headline(72, WHITE), lineHeight: 1.1 }}>THE</p>
        <p style={{ ...headline(72, ACCENT), lineHeight: 1.1 }}>LATTE LIE</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Bar chart — coffee vs housing overspend
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coffeeBarW = interpolate(frame, [20, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const housingBarW = interpolate(frame, [80, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const coffeeCount = Math.round(interpolate(frame, [20, 90], [0, 2190], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const housingCount = Math.round(interpolate(frame, [80, 160], [0, 4800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const coffeeNumOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const housingNumOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeScale = interpolate(frame, [185, 210], [0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) });
  const badgeOpacity = interpolate(frame, [185, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(44, BLACK) }}>DO THE MATH</p>
      </div>

      {/* Coffee row */}
      <div style={{ position: 'absolute', top: 360, left: 60, right: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
            <rect x="8" y="16" width="38" height="32" rx="5" fill="#8B4513" />
            <rect x="4" y="10" width="48" height="10" rx="4" fill="#A0522D" />
            <path d="M 46 22 Q 58 22 58 32 Q 58 42 46 42" stroke="#A0522D" strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ background: '#ddd', borderRadius: 8, height: 44, overflow: 'hidden' }}>
              <div style={{ background: ACCENT, height: '100%', width: `${coffeeBarW * 55}%`, borderRadius: 8 }} />
            </div>
          </div>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, margin: '4px 0 0 76px', letterSpacing: '0.05em', opacity: coffeeNumOpacity }}>
          ${coffeeCount.toLocaleString()}/YR
        </p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: '4px 0 0 76px', letterSpacing: '0.08em' }}>
          DAILY $6 COFFEE
        </p>
      </div>

      {/* Housing row */}
      <div style={{ position: 'absolute', top: 620, left: 60, right: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
            <polygon points="28,4 4,24 52,24" fill={RED} />
            <rect x="10" y="24" width="36" height="28" fill="#E5E7EB" />
            <rect x="20" y="34" width="16" height="18" rx="2" fill="#8B4513" />
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ background: '#ddd', borderRadius: 8, height: 44, overflow: 'hidden' }}>
              <div style={{ background: RED, height: '100%', width: `${housingBarW * 100}%`, borderRadius: 8 }} />
            </div>
          </div>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 38, color: RED, margin: '4px 0 0 76px', letterSpacing: '0.05em', opacity: housingNumOpacity }}>
          ${housingCount.toLocaleString()}/YR
        </p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: '4px 0 0 76px', letterSpacing: '0.08em' }}>
          HOUSING OVERSPEND
        </p>
      </div>

      {/* MORE THAN 2X badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div style={{ display: 'inline-block', background: RED, borderRadius: 14, padding: '18px 48px' }}>
          <p style={{ ...headline(46, WHITE), margin: 0 }}>MORE THAN 2X</p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 3: House + two percentage bars (28% vs 32%)
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 50 });

  const recBar = interpolate(frame, [40, 90], [0, 0.28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const actBar = interpolate(frame, [85, 150], [0, 0.32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const recLabelOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const actLabelOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const moneyScale = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 8, stiffness: 200 }, durationInFrames: 35 });
  const moneyOpacity = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(38, ACCENT) }}>THE BIG THREE</p>
        <p style={{ ...headline(34, WHITE), marginTop: 10 }}>#1: HOUSING</p>
      </div>

      {/* House */}
      <div style={{ position: 'absolute', top: 340, left: '50%', transform: `translateX(-50%) scale(${houseScale})` }}>
        <svg width="180" height="170" viewBox="0 0 180 170">
          <polygon points="90,8 6,72 174,72" fill={ACCENT} />
          <rect x="20" y="72" width="140" height="90" fill={WHITE} />
          <rect x="60" y="102" width="60" height="60" rx="4" fill="#8B4513" />
          <rect x="26" y="82" width="36" height="28" rx="3" fill="#BFDBFE" />
          <rect x="118" y="82" width="36" height="28" rx="3" fill="#BFDBFE" />
        </svg>
      </div>

      {/* Percentage bars */}
      <div style={{ position: 'absolute', top: 610, left: 70, right: 70 }}>
        {/* Recommended 28% */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: GREEN, margin: '0 0 10px 0', letterSpacing: '0.1em', opacity: recLabelOpacity }}>
            RECOMMENDED: 28%
          </p>
          <div style={{ background: '#2a2a2a', borderRadius: 8, height: 40, overflow: 'hidden' }}>
            <div style={{ background: GREEN, height: '100%', width: `${(recBar / 0.5) * 100}%`, borderRadius: 8 }} />
          </div>
        </div>
        {/* Actual 32% */}
        <div>
          <p style={{ fontFamily: FONT, fontSize: 24, color: RED, margin: '0 0 10px 0', letterSpacing: '0.1em', opacity: actLabelOpacity }}>
            REALITY: 32%
          </p>
          <div style={{ background: '#2a2a2a', borderRadius: 8, height: 40, overflow: 'hidden' }}>
            <div style={{ background: RED, height: '100%', width: `${(actBar / 0.5) * 100}%`, borderRadius: 8 }} />
          </div>
        </div>
      </div>

      {/* $4,800 overspend badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: moneyOpacity,
          transform: `scale(${moneyScale})`,
        }}
      >
        <p style={{ ...headline(52, RED) }}>$4,800/YR OVERSPEND</p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Car driving in + itemized transport cost breakdown
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carX = interpolate(frame, [0, 55], [-380, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const row1Opacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Opacity = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Opacity = interpolate(frame, [135, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOpacity = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = Math.round(interpolate(frame, [165, 210], [0, 11400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  };
  const labelStyle: React.CSSProperties = { fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, letterSpacing: '0.05em' };
  const amtStyle: React.CSSProperties = { fontFamily: FONT, fontSize: 28, color: RED, margin: 0 };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(36, BLACK) }}>THE SNEAKIEST DRAIN</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 10 }}>#2: TRANSPORTATION</p>
      </div>

      {/* Car */}
      <div style={{ position: 'absolute', top: 310, left: '50%', transform: `translateX(calc(-50% + ${carX}px))` }}>
        <svg width="300" height="148" viewBox="0 0 300 148">
          {/* Body */}
          <rect x="8" y="64" width="284" height="62" rx="12" fill="#3B82F6" />
          {/* Roof */}
          <path d="M 52 64 L 82 20 L 218 20 L 248 64" fill="#2563EB" />
          {/* Windows */}
          <rect x="88" y="26" width="52" height="34" rx="4" fill="#BFDBFE" />
          <rect x="152" y="26" width="52" height="34" rx="4" fill="#BFDBFE" />
          {/* Wheels */}
          <circle cx="66" cy="126" r="28" fill="#1F2937" />
          <circle cx="66" cy="126" r="14" fill="#6B7280" />
          <circle cx="234" cy="126" r="28" fill="#1F2937" />
          <circle cx="234" cy="126" r="14" fill="#6B7280" />
          {/* Headlight */}
          <rect x="278" y="76" width="16" height="12" rx="4" fill="#FDE68A" />
          {/* Bumper */}
          <rect x="276" y="90" width="20" height="8" rx="3" fill="#CBD5E1" />
        </svg>
      </div>

      {/* Cost breakdown */}
      <div style={{ position: 'absolute', top: 530, left: 70, right: 70 }}>
        <div style={{ ...rowStyle, opacity: row1Opacity }}>
          <p style={labelStyle}>CAR PAYMENT</p>
          <p style={amtStyle}>$6,000</p>
        </div>
        <div style={{ ...rowStyle, opacity: row2Opacity }}>
          <p style={labelStyle}>GAS + INSURANCE</p>
          <p style={amtStyle}>$3,600</p>
        </div>
        <div style={{ ...rowStyle, opacity: row3Opacity }}>
          <p style={labelStyle}>MAINTENANCE</p>
          <p style={amtStyle}>$1,800</p>
        </div>
        <div style={{ borderTop: `4px solid ${BLACK}`, paddingTop: 20, opacity: totalOpacity }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ ...headline(34, BLACK), textAlign: 'left' as const }}>TOTAL/YEAR</p>
            <p style={{ ...headline(38, RED), textAlign: 'right' as const }}>${totalCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 5: Coffee vs House comparison — VS badge, scale tips
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftX = interpolate(frame, [0, 45], [-280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const rightX = interpolate(frame, [15, 60], [280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const vsScale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 8, stiffness: 220 }, durationInFrames: 30 });
  const vsOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const boxOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxY = interpolate(frame, [120, 150], [35, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(42, WHITE) }}>THE REALITY CHECK</p>
      </div>

      {/* Coffee — left */}
      <div
        style={{
          position: 'absolute',
          top: 310,
          left: 50,
          width: 360,
          textAlign: 'center',
          transform: `translateX(${leftX}px)`,
        }}
      >
        <svg width="120" height="135" viewBox="0 0 120 135">
          <rect x="18" y="36" width="84" height="80" rx="8" fill="#8B4513" />
          <rect x="10" y="24" width="100" height="18" rx="6" fill="#A0522D" />
          <path d="M 102 52 Q 128 52 128 76 Q 128 100 102 100" stroke="#A0522D" strokeWidth="14" fill="none" strokeLinecap="round" />
          <text x="60" y="88" textAnchor="middle" fill={WHITE} fontSize="26" fontWeight="bold" fontFamily="Arial Black, Arial">$6/DAY</text>
        </svg>
        <p style={{ ...headline(36, ACCENT), marginTop: 14 }}>$2,190/YR</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', marginTop: 8, letterSpacing: '0.05em' }}>DAILY COFFEE</p>
      </div>

      {/* VS badge */}
      <div
        style={{
          position: 'absolute',
          top: 390,
          left: '50%',
          transform: `translateX(-50%) scale(${vsScale})`,
          opacity: vsOpacity,
        }}
      >
        <div style={{ width: 88, height: 88, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ ...headline(36, BLACK), margin: 0 }}>VS</p>
        </div>
      </div>

      {/* House — right */}
      <div
        style={{
          position: 'absolute',
          top: 310,
          right: 50,
          width: 360,
          textAlign: 'center',
          transform: `translateX(${rightX}px)`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <polygon points="60,6 6,48 114,48" fill={RED} />
          <rect x="18" y="48" width="84" height="64" fill={WHITE} />
          <rect x="44" y="70" width="32" height="42" rx="3" fill="#8B4513" />
          <rect x="22" y="56" width="26" height="20" rx="2" fill="#BFDBFE" />
          <rect x="72" y="56" width="26" height="20" rx="2" fill="#BFDBFE" />
        </svg>
        <p style={{ ...headline(36, RED), marginTop: 14 }}>$4,800/YR</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', marginTop: 8, letterSpacing: '0.05em' }}>HOUSING OVERSPEND</p>
      </div>

      {/* Bottom callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 50,
          right: 50,
          textAlign: 'center',
          opacity: boxOpacity,
          transform: `translateY(${boxY}px)`,
        }}
      >
        <div style={{ background: '#1a1a1a', borderRadius: 18, padding: '28px 36px', border: `3px solid ${ACCENT}` }}>
          <p style={{ ...headline(34, WHITE), lineHeight: 1.3 as const, margin: 0 }}>5 COFFEE-FREE YEARS</p>
          <p style={{ ...headline(34, ACCENT), lineHeight: 1.3 as const, marginTop: 8, marginBottom: 0 }}>= 1 SMART HOUSING MOVE</p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 6: Fix the Big Three — three icons with checkmarks + $1M badge
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const icon1Scale = spring({ frame, fps, config: { damping: 12, stiffness: 150 }, durationInFrames: 30 });
  const icon2Scale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 150 }, durationInFrames: 30 });
  const icon3Scale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 150 }, durationInFrames: 30 });

  const check1Opacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2Opacity = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check3Opacity = interpolate(frame, [125, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const millionScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 8, stiffness: 190 }, durationInFrames: 40 });
  const millionOpacity = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const CheckBadge: React.FC<{ opacity: number }> = ({ opacity }) => (
    <div style={{ position: 'absolute', top: -14, right: -14, opacity }}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill={GREEN} />
        <path d="M 9 20 L 16 28 L 31 12" stroke={WHITE} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 140, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(38, BLACK) }}>SKIP THE GUILT</p>
        <p style={{ ...headline(34, ACCENT), marginTop: 10 }}>FIX THE BIG THREE</p>
      </div>

      {/* Three icons row */}
      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>

        {/* House */}
        <div style={{ textAlign: 'center', transform: `scale(${icon1Scale})` }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="110" height="110" viewBox="0 0 110 110">
              <polygon points="55,8 8,48 102,48" fill={ACCENT} />
              <rect x="16" y="48" width="78" height="54" fill="#3B82F6" />
              <rect x="36" y="66" width="38" height="36" rx="3" fill="#8B4513" />
            </svg>
            <CheckBadge opacity={check1Opacity} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, marginTop: 12, letterSpacing: '0.05em' }}>HOUSING</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: RED, margin: 0 }}>$4,800</p>
        </div>

        {/* Car */}
        <div style={{ textAlign: 'center', transform: `scale(${icon2Scale})` }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="120" height="86" viewBox="0 0 120 86">
              <rect x="4" y="32" width="112" height="38" rx="8" fill="#3B82F6" />
              <path d="M 18 32 L 32 10 L 88 10 L 102 32" fill="#2563EB" />
              <rect x="36" y="14" width="20" height="16" rx="3" fill="#BFDBFE" />
              <rect x="64" y="14" width="20" height="16" rx="3" fill="#BFDBFE" />
              <circle cx="26" cy="72" r="16" fill="#1F2937" />
              <circle cx="26" cy="72" r="8" fill="#6B7280" />
              <circle cx="94" cy="72" r="16" fill="#1F2937" />
              <circle cx="94" cy="72" r="8" fill="#6B7280" />
            </svg>
            <CheckBadge opacity={check2Opacity} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, marginTop: 12, letterSpacing: '0.05em' }}>TRANSPORT</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: RED, margin: 0 }}>$11,400</p>
        </div>

        {/* Grocery bag */}
        <div style={{ textAlign: 'center', transform: `scale(${icon3Scale})` }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="100" height="115" viewBox="0 0 100 115">
              <rect x="8" y="32" width="84" height="76" rx="8" fill="#10B981" />
              <path d="M 28 32 Q 28 10 50 10 Q 72 10 72 32" stroke="#059669" strokeWidth="9" fill="none" strokeLinecap="round" />
              <rect x="22" y="14" width="11" height="22" rx="3" fill="#EF4444" />
              <rect x="44" y="8" width="11" height="28" rx="3" fill="#84CC16" />
              <rect x="66" y="16" width="11" height="20" rx="3" fill="#F97316" />
            </svg>
            <CheckBadge opacity={check3Opacity} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, marginTop: 12, letterSpacing: '0.05em' }}>GROCERIES</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: RED, margin: 0 }}>$3,000</p>
        </div>
      </div>

      {/* $1M badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 55,
          right: 55,
          textAlign: 'center',
          opacity: millionOpacity,
          transform: `scale(${millionScale})`,
        }}
      >
        <div style={{ background: ACCENT, borderRadius: 18, padding: '24px 40px' }}>
          <p style={{ ...headline(32, BLACK), margin: 0 }}>OVER 40 YEARS</p>
          <p style={{ ...headline(54, BLACK), marginTop: 8, marginBottom: 0 }}>$1M+ SAVED</p>
        </div>
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
