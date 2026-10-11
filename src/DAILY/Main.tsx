import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const textOp1 = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp2 = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill1Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2Op = interpolate(frame, [97, 117], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill3Op = interpolate(frame, [114, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amtOp = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amtScale = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 10, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        {/* House SVG */}
        <div style={{ transform: `scale(${houseScale})`, marginBottom: 28 }}>
          <svg width="160" height="145" viewBox="0 0 160 145">
            <rect x="20" y="70" width="120" height="70" fill="#2A2A2A" stroke={ACCENT} strokeWidth="4" />
            <polygon points="10,70 80,10 150,70" fill={ACCENT} />
            <rect x="60" y="100" width="40" height="40" rx="4" fill={BG_DARK} stroke={ACCENT} strokeWidth="3" />
            <rect x="28" y="80" width="30" height="24" rx="3" fill="#1E2D40" stroke={ACCENT} strokeWidth="2" />
            <rect x="102" y="80" width="30" height="24" rx="3" fill="#1E2D40" stroke={ACCENT} strokeWidth="2" />
            <circle cx="80" cy="118" r="5" fill={ACCENT} />
          </svg>
        </div>

        <p style={{ ...headline(46, WHITE), lineHeight: 1.25, maxWidth: 900, opacity: textOp1, marginBottom: 8 }}>
          YOU CALCULATED THE MORTGAGE.
        </p>
        <p style={{ ...headline(46, ACCENT), lineHeight: 1.25, maxWidth: 900, opacity: textOp2, marginBottom: 36 }}>
          THEN MONTH TWO HIT.
        </p>

        {/* Bills */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
          <div style={{ opacity: bill1Op, background: '#1E1E1E', border: '2px solid #EF4444', borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>REPAIR BILL</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', margin: 0 }}>$4,200</p>
          </div>
          <div style={{ opacity: bill2Op, background: '#1E1E1E', border: '2px solid #EF4444', borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>PROPERTY TAX</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', margin: 0 }}>$3,785</p>
          </div>
          <div style={{ opacity: bill3Op, background: '#1E1E1E', border: '2px solid #EF4444', borderRadius: 12, padding: '12px 18px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>INSURANCE</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', margin: 0 }}>$2,100</p>
          </div>
        </div>

        {/* Big reveal */}
        <div style={{ opacity: amtOp, transform: `scale(${amtScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(38, WHITE), marginBottom: 4 }}>THE HIDDEN</p>
          <p style={{ ...headline(104, ACCENT) }}>$23,400</p>
          <p style={{ ...headline(38, WHITE) }}>A YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseOp = interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const repair1 = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 100 } });
  const repair2 = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 100 } });
  const repair3 = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 100 } });
  const counterProgress = interpolate(frame, [145, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const counterVal = Math.floor(3500 * counterProgress);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(36, BLACK), opacity: titleOp, marginBottom: 4 }}>NUMBER ONE:</p>
        <p style={{ ...headline(52, BLACK), opacity: titleOp, marginBottom: 26 }}>MAINTENANCE</p>

        {/* House */}
        <div style={{ opacity: houseOp, marginBottom: 28 }}>
          <svg width="180" height="160" viewBox="0 0 180 160">
            <rect x="30" y="85" width="120" height="70" fill="#E5E5E5" stroke={BLACK} strokeWidth="4" />
            <polygon points="15,85 90,18 165,85" fill={BLACK} />
            <rect x="70" y="118" width="40" height="37" rx="3" fill="white" stroke={BLACK} strokeWidth="3" />
            <rect x="38" y="95" width="30" height="25" rx="3" fill="white" stroke={BLACK} strokeWidth="2" />
            <rect x="112" y="95" width="30" height="25" rx="3" fill="white" stroke={BLACK} strokeWidth="2" />
          </svg>
        </div>

        {/* Repair icons */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 30 }}>
          <div style={{ transform: `scale(${repair1})`, background: '#FEF3C7', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '14px 18px', textAlign: 'center' }}>
            <svg width="46" height="46" viewBox="0 0 46 46" style={{ display: 'block', margin: '0 auto 6px' }}>
              <path d="M23 4 L38 26 A15 15 0 1 1 8 26 Z" fill={ACCENT} />
              <line x1="19" y1="32" x2="14" y2="43" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <line x1="23" y1="33" x2="23" y2="44" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <line x1="27" y1="32" x2="32" y2="43" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, margin: 0 }}>ROOF LEAK</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: 0 }}>$8K</p>
          </div>
          <div style={{ transform: `scale(${repair2})`, background: '#FEF3C7', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '14px 18px', textAlign: 'center' }}>
            <svg width="46" height="46" viewBox="0 0 46 46" style={{ display: 'block', margin: '0 auto 6px' }}>
              <rect x="6" y="12" width="34" height="22" rx="4" fill="none" stroke={ACCENT} strokeWidth="3" />
              <line x1="13" y1="20" x2="33" y2="20" stroke={ACCENT} strokeWidth="2.5" />
              <line x1="13" y1="27" x2="33" y2="27" stroke={ACCENT} strokeWidth="2.5" />
              <line x1="23" y1="34" x2="23" y2="42" stroke={ACCENT} strokeWidth="3" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, margin: 0 }}>HVAC</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: 0 }}>$6K</p>
          </div>
          <div style={{ transform: `scale(${repair3})`, background: '#FEF3C7', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '14px 18px', textAlign: 'center' }}>
            <svg width="46" height="46" viewBox="0 0 46 46" style={{ display: 'block', margin: '0 auto 6px' }}>
              <rect x="18" y="4" width="10" height="26" rx="4" fill={ACCENT} />
              <ellipse cx="23" cy="34" rx="9" ry="4" fill={ACCENT} />
              <line x1="20" y1="32" x2="16" y2="43" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="23" y1="33" x2="23" y2="44" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="26" y1="32" x2="30" y2="43" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, margin: 0 }}>PLUMBING</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: 0 }}>$3K</p>
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, textAlign: 'center', margin: 0, marginBottom: 6 }}>
          1% RULE = BUDGET MINIMUM
        </p>
        <p style={{ fontFamily: FONT, fontSize: 76, color: ACCENT, textAlign: 'center', margin: 0, letterSpacing: '0.04em' }}>
          ${counterVal.toLocaleString()}/YR
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', margin: 0 }}>
          ON A $350,000 HOME
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 80 } });
  const insScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 80 } });
  const pctOp = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 10, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(36, WHITE), opacity: titleOp, marginBottom: 4 }}>NUMBER TWO:</p>
        <p style={{ ...headline(48, ACCENT), opacity: titleOp, marginBottom: 44 }}>TAXES + INSURANCE</p>

        <div style={{ display: 'flex', gap: 50, marginBottom: 44 }}>
          {/* Tax block */}
          <div style={{ textAlign: 'center', transform: `scale(${taxScale})` }}>
            <svg width="96" height="120" viewBox="0 0 96 120" style={{ display: 'block', margin: '0 auto 10px' }}>
              <rect x="5" y="5" width="86" height="110" rx="6" fill="#1E1E1E" stroke={ACCENT} strokeWidth="4" />
              <line x1="15" y1="28" x2="81" y2="28" stroke={ACCENT} strokeWidth="2.5" />
              <line x1="15" y1="42" x2="81" y2="42" stroke={ACCENT} strokeWidth="2.5" />
              <line x1="15" y1="56" x2="60" y2="56" stroke={ACCENT} strokeWidth="2.5" />
              <rect x="14" y="72" width="68" height="22" rx="4" fill={ACCENT} opacity={0.25} />
              <rect x="20" y="76" width="40" height="14" rx="3" fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>PROPERTY TAX</p>
            <p style={{ fontFamily: FONT, fontSize: 70, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>$3,785</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>/ YEAR</p>
          </div>

          {/* Insurance block */}
          <div style={{ textAlign: 'center', transform: `scale(${insScale})` }}>
            <svg width="96" height="120" viewBox="0 0 96 120" style={{ display: 'block', margin: '0 auto 10px' }}>
              <path d="M48 5 L88 24 L88 62 Q88 95 48 112 Q8 95 8 62 L8 24 Z" fill="#1E1E1E" stroke="#F97316" strokeWidth="4" />
              <path d="M48 20 L74 34 L74 60 Q74 82 48 96 Q22 82 22 60 L22 34 Z" fill="#F97316" opacity={0.28} />
              <line x1="36" y1="57" x2="60" y2="57" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              <line x1="48" y1="45" x2="48" y2="69" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>HOME INSURANCE</p>
            <p style={{ fontFamily: FONT, fontSize: 70, color: '#F97316', margin: 0, letterSpacing: '0.04em' }}>$2,100</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>/ YEAR</p>
          </div>
        </div>

        {/* Kicker */}
        <div style={{ opacity: pctOp, transform: `scale(${pctScale})`, textAlign: 'center', background: '#1E1E1E', border: `3px solid ${ACCENT}`, borderRadius: 20, padding: '16px 38px' }}>
          <p style={{ ...headline(30, WHITE), marginBottom: 2 }}>INSURANCE JUMPED</p>
          <p style={{ ...headline(80, ACCENT) }}>+21%</p>
          <p style={{ ...headline(30, WHITE) }}>IN JUST 2 YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fridgeS = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 100 } });
  const washerS = spring({ frame: Math.max(0, frame - 58), fps, config: { damping: 12, stiffness: 100 } });
  const heaterS = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 12, stiffness: 100 } });
  const hvacS = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 12, stiffness: 100 } });
  const totalOp = interpolate(frame, [158, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 10, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(34, BLACK), opacity: titleOp, marginBottom: 4 }}>NUMBER THREE:</p>
        <p style={{ ...headline(48, BLACK), opacity: titleOp, marginBottom: 34 }}>APPLIANCES EXPIRE</p>

        <div style={{ display: 'flex', gap: 24, marginBottom: 34, justifyContent: 'center' }}>
          {/* Fridge */}
          <div style={{ transform: `scale(${fridgeS})`, textAlign: 'center' }}>
            <svg width="72" height="100" viewBox="0 0 72 100">
              <rect x="8" y="5" width="56" height="90" rx="6" fill="#D1D5DB" stroke={BLACK} strokeWidth="3" />
              <line x1="8" y1="42" x2="64" y2="42" stroke={BLACK} strokeWidth="3" />
              <rect x="28" y="18" width="7" height="14" rx="3" fill={BLACK} />
              <rect x="28" y="56" width="7" height="18" rx="3" fill={BLACK} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>FRIDGE</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>$1,400</p>
          </div>

          {/* Washer */}
          <div style={{ transform: `scale(${washerS})`, textAlign: 'center' }}>
            <svg width="72" height="100" viewBox="0 0 72 100">
              <rect x="8" y="5" width="56" height="90" rx="6" fill="#D1D5DB" stroke={BLACK} strokeWidth="3" />
              <circle cx="36" cy="60" r="20" fill="white" stroke={BLACK} strokeWidth="3" />
              <circle cx="36" cy="60" r="11" fill="#BFDBFE" stroke={BLACK} strokeWidth="2" />
              <rect x="14" y="13" width="12" height="7" rx="3" fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>WASHER</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>$900</p>
          </div>

          {/* Water heater */}
          <div style={{ transform: `scale(${heaterS})`, textAlign: 'center' }}>
            <svg width="72" height="100" viewBox="0 0 72 100">
              <rect x="18" y="14" width="36" height="60" rx="8" fill="#D1D5DB" stroke={BLACK} strokeWidth="3" />
              <line x1="36" y1="5" x2="36" y2="14" stroke={BLACK} strokeWidth="4" />
              <line x1="36" y1="74" x2="36" y2="86" stroke={BLACK} strokeWidth="4" />
              <line x1="24" y1="86" x2="48" y2="86" stroke={BLACK} strokeWidth="4" />
              <circle cx="36" cy="44" r="10" fill={ACCENT} opacity={0.7} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>WATER HTR</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>$1,200</p>
          </div>

          {/* HVAC */}
          <div style={{ transform: `scale(${hvacS})`, textAlign: 'center' }}>
            <svg width="72" height="100" viewBox="0 0 72 100">
              <rect x="5" y="22" width="62" height="46" rx="6" fill="#D1D5DB" stroke={BLACK} strokeWidth="3" />
              <line x1="18" y1="35" x2="54" y2="35" stroke={BLACK} strokeWidth="2.5" />
              <line x1="18" y1="45" x2="54" y2="45" stroke={BLACK} strokeWidth="2.5" />
              <line x1="18" y1="55" x2="54" y2="55" stroke={BLACK} strokeWidth="2.5" />
              <circle cx="36" cy="80" r="9" fill={ACCENT} />
              <line x1="36" y1="68" x2="36" y2="71" stroke={BLACK} strokeWidth="3" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>HVAC</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>$6,000</p>
          </div>
        </div>

        <div style={{ opacity: totalOp, transform: `scale(${totalScale})`, background: '#FEF3C7', border: `3px solid ${ACCENT}`, borderRadius: 20, padding: '18px 44px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0, marginBottom: 4 }}>ADD UTILITIES + HOA =</p>
          <p style={{ fontFamily: FONT, fontSize: 68, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>$5K–$8K/YR</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>JUST IN HIDDEN COSTS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const item1Op = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Op = interpolate(frame, [34, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Op = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item4Op = interpolate(frame, [86, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalProgress = interpolate(frame, [112, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const totalVal = Math.floor(23400 * totalProgress);
  const lifetimeOp = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 10, stiffness: 80 } });

  const lineItems = [
    { label: 'MAINTENANCE (1% RULE)', amount: '$3,500+', op: item1Op },
    { label: 'PROPERTY TAXES', amount: '$3,785', op: item2Op },
    { label: 'HOME INSURANCE', amount: '$2,100', op: item3Op },
    { label: 'UTILITIES + APPLIANCES', amount: '$6,500', op: item4Op },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 24 }}>THE REAL MATH</p>

        <div style={{ width: '100%', maxWidth: 860, marginBottom: 24 }}>
          {lineItems.map(({ label, amount, op }, i) => (
            <div key={i} style={{ opacity: op, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: 12, paddingTop: 12 }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>{label}</p>
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>{amount}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ ...headline(34, WHITE), marginBottom: 6 }}>TOTAL HIDDEN COSTS:</p>
          <p style={{ ...headline(100, ACCENT) }}>${totalVal.toLocaleString()}</p>
          <p style={{ ...headline(34, WHITE) }}>PER YEAR</p>
        </div>

        <div style={{ opacity: lifetimeOp, transform: `scale(${lifetimeScale})`, background: '#1E1E1E', border: '3px solid #EF4444', borderRadius: 16, padding: '14px 34px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>OVER 30 YEARS =</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: '#EF4444', margin: 0, letterSpacing: '0.04em' }}>$700,000</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>NOT IN ANY CALCULATOR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check1 = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 120 } });
  const check2 = spring({ frame: Math.max(0, frame - 58), fps, config: { damping: 14, stiffness: 120 } });
  const check3 = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 14, stiffness: 120 } });
  const check4 = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 14, stiffness: 120 } });
  const ctaOp = interpolate(frame, [152, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 10, stiffness: 80 } });

  const checkItems = [
    { label: '1% for maintenance', s: check1 },
    { label: 'Property taxes', s: check2 },
    { label: 'Home insurance', s: check3 },
    { label: 'Utilities + HOA', s: check4 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
        <p style={{ ...headline(42, BLACK), opacity: titleOp, marginBottom: 6 }}>BEFORE YOU BUY,</p>
        <p style={{ ...headline(42, ACCENT), opacity: titleOp, marginBottom: 36 }}>RUN THE REAL NUMBERS</p>

        <div style={{ width: '100%', maxWidth: 820, marginBottom: 36 }}>
          {checkItems.map(({ label, s }, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginBottom: 20,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px)`,
            }}>
              <div style={{ width: 50, height: 50, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="26" height="26" viewBox="0 0 26 26">
                  <polyline points="3,13 10,21 23,5" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, background: BLACK, borderRadius: 20, padding: '22px 48px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0, marginBottom: 4 }}>ADD $1,950/MONTH</p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0, marginBottom: 4 }}>TO YOUR MORTGAGE</p>
          <p style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, margin: 0 }}>THAT'S YOUR REAL COST</p>
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
