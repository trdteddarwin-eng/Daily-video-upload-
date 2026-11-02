import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const ACCENT2 = '#DC2626';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GRAY = '#9CA3AF';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_REG = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1 — The Hook: Tax refund = 0% loan
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 20], [60, 0], { extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const envelopeScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1, durationInFrames: 30 });
  const checkSlide = interpolate(frame, [20, 45], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOp = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeScale = spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 150 }, from: 0, to: 1, durationInFrames: 25 });
  const badgeOp = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const xOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <p style={{ ...headline(38, GRAY), letterSpacing: '0.25em' }}>THE TAX REFUND TRAP</p>
      </div>

      {/* Envelope SVG */}
      <div style={{ position: 'absolute', top: 220, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${envelopeScale})` }}>
        <svg width="280" height="200" viewBox="0 0 280 200">
          {/* Envelope body */}
          <rect x="10" y="60" width="260" height="130" rx="10" fill="#1E293B" stroke={ACCENT} strokeWidth="3" />
          {/* Envelope flap */}
          <path d="M10 60 L140 140 L270 60" fill="none" stroke={ACCENT} strokeWidth="3" />
          {/* Envelope bottom folds */}
          <line x1="10" y1="190" x2="100" y2="120" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
          <line x1="270" y1="190" x2="180" y2="120" stroke={ACCENT} strokeWidth="2" opacity="0.5" />

          {/* Check sliding out */}
          <g transform={`translate(0, ${checkSlide})`} opacity={checkOp}>
            <rect x="50" y="20" width="180" height="90" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
            <line x1="70" y1="50" x2="210" y2="50" stroke="#16A34A" strokeWidth="2" />
            <line x1="70" y1="68" x2="160" y2="68" stroke="#9CA3AF" strokeWidth="1.5" />
            <text x="140" y="95" textAnchor="middle" fill="#16A34A" fontSize="18" fontFamily={FONT} fontWeight="900">$2,753</text>
          </g>
        </svg>
      </div>

      {/* 0% INTEREST badge */}
      <div style={{
        position: 'absolute', top: 460, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: badgeOp, transform: `scale(${badgeScale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 16,
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 40,
          paddingRight: 40,
        }}>
          <p style={{ ...headline(52, WHITE), letterSpacing: '0.1em' }}>0% INTEREST</p>
          <p style={{ fontFamily: FONT_REG, fontSize: 24, color: WHITE, textAlign: 'center', margin: '8px 0 0 0' }}>the IRS paid you</p>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', top: 660, left: 60, right: 60, opacity: subOp }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 34, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          73% of workers overpay taxes every year
        </p>
      </div>

      {/* Red X through "WINNING" */}
      <div style={{ position: 'absolute', top: 780, left: 0, right: 0, opacity: xOp, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ ...headline(46, GRAY), margin: 0, opacity: 0.5 }}>WINNING</p>
          <svg style={{ position: 'absolute', top: 0, left: 0 }} width="100%" height="100%" viewBox="0 0 200 60">
            <line x1="0" y1="0" x2="200" y2="60" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <line x1="200" y1="0" x2="0" y2="60" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Bottom stat */}
      <div style={{ position: 'absolute', bottom: 120, left: 60, right: 60 }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 28, color: GRAY, textAlign: 'center', margin: 0 }}>
          A refund = you overpaid all year
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 2 — The W-4: set once, never touched
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const formScale = spring({ frame, fps, config: { damping: 16, stiffness: 100 }, from: 0, to: 1, durationInFrames: 35 });
  const personOp = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calOp = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dustOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearCount = Math.floor(interpolate(frame, [80, 160], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, opacity: titleOp }}>
        <p style={{ ...headline(40, BLACK) }}>HOW WITHHOLDING WORKS</p>
      </div>

      {/* W-4 Form SVG */}
      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${formScale})` }}>
        <svg width="260" height="320" viewBox="0 0 260 320">
          {/* Document */}
          <rect x="20" y="10" width="220" height="280" rx="10" fill="white" stroke="#CBD5E1" strokeWidth="2" />
          {/* Header */}
          <rect x="20" y="10" width="220" height="50" rx="10" fill={ACCENT} />
          <text x="130" y="43" textAnchor="middle" fill="white" fontSize="22" fontFamily={FONT} fontWeight="900">W-4 FORM</text>
          {/* Lines */}
          <line x1="44" y1="90" x2="216" y2="90" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="44" y1="115" x2="190" y2="115" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="44" y1="140" x2="200" y2="140" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="44" y1="165" x2="170" y2="165" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="44" y1="190" x2="210" y2="190" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="44" y1="215" x2="180" y2="215" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Signature line */}
          <line x1="44" y1="265" x2="180" y2="265" stroke="#94A3B8" strokeWidth="2" />
          <text x="44" y="285" fill="#94A3B8" fontSize="11" fontFamily={FONT_REG}>SIGNATURE</text>
          {/* Checkmark in box */}
          <rect x="44" y="232" width="20" height="20" rx="3" fill="none" stroke={ACCENT} strokeWidth="2" />
          <polyline points="48,242 52,248 62,236" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Person signing */}
      <div style={{ position: 'absolute', top: 220, right: 80, opacity: personOp }}>
        <svg width="90" height="120" viewBox="0 0 90 120">
          {/* Head */}
          <circle cx="45" cy="22" r="18" fill="#4B5563" />
          {/* Body */}
          <rect x="28" y="44" width="34" height="50" rx="8" fill="#374151" />
          {/* Arms at desk */}
          <line x1="28" y1="60" x2="8" y2="80" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" />
          <line x1="62" y1="60" x2="82" y2="75" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" />
          {/* Pen */}
          <line x1="78" y1="72" x2="90" y2="60" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Calendar spinning / years passing */}
      <div style={{ position: 'absolute', top: 570, left: 0, right: 0, opacity: calOp, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <svg width="120" height="100" viewBox="0 0 120 100">
          <rect x="5" y="15" width="110" height="80" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <rect x="5" y="15" width="110" height="30" rx="8" fill={ACCENT} />
          <rect x="5" y="38" width="110" height="7" fill={ACCENT} />
          <circle cx="30" cy="15" r="7" fill="#1E293B" stroke={ACCENT} strokeWidth="2" />
          <circle cx="90" cy="15" r="7" fill="#1E293B" stroke={ACCENT} strokeWidth="2" />
          <text x="60" y="72" textAnchor="middle" fill="white" fontSize="26" fontFamily={FONT} fontWeight="900">{yearCount}</text>
          <text x="60" y="90" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily={FONT_REG}>YEARS LATER</text>
        </svg>
      </div>

      {/* Dust / cobwebs */}
      <div style={{ position: 'absolute', top: 680, left: 80, right: 80, opacity: dustOp }}>
        <div style={{ background: '#FEF2F2', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '14px 20px' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, textAlign: 'center', margin: 0, letterSpacing: '0.08em' }}>
            W-4 NEVER UPDATED
          </p>
        </div>
      </div>

      {/* Subtext */}
      <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60 }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 32, color: '#374151', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Most workers set it once and forget it — and it quietly costs them thousands.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 3 — The Numbers: $229/month sitting with the government
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 70], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const bar2H = interpolate(frame, [40, 90], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const label1Op = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardScale = spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 130 }, from: 0, to: 1, durationInFrames: 30 });
  const flameOp = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flameH = interpolate(frame, [140, 220], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, opacity: titleOp }}>
        <p style={{ ...headline(38, WHITE) }}>THE REAL MATH</p>
      </div>

      {/* Bar chart */}
      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 80 }}>
        {/* Bar 1: Refund */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ opacity: label1Op }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: 0 }}>$2,753</p>
            <p style={{ fontFamily: FONT_REG, fontSize: 18, color: GRAY, textAlign: 'center', margin: '4px 0 0 0' }}>YOUR REFUND</p>
          </div>
          <div style={{ width: 90, height: bar1H, background: '#1D4ED8', borderRadius: '8px 8px 0 0' }} />
        </div>
        {/* Bar 2: Credit card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ opacity: label2Op }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center', margin: 0 }}>22% APR</p>
            <p style={{ fontFamily: FONT_REG, fontSize: 18, color: GRAY, textAlign: 'center', margin: '4px 0 0 0' }}>CREDIT CARD</p>
          </div>
          <div style={{ width: 90, height: bar2H, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
        </div>
      </div>

      {/* Credit card with flames */}
      <div style={{ position: 'absolute', top: 580, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${cardScale})` }}>
        <svg width="280" height="160" viewBox="0 0 280 160">
          {/* Card */}
          <rect x="10" y="40" width="260" height="110" rx="14" fill="#1E293B" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="10" y="60" width="260" height="28" fill={ACCENT} opacity="0.3" />
          {/* Chip */}
          <rect x="30" y="74" width="36" height="28" rx="5" fill="#F59E0B" />
          <line x1="48" y1="74" x2="48" y2="102" stroke="#D97706" strokeWidth="1.5" />
          <line x1="30" y1="88" x2="66" y2="88" stroke="#D97706" strokeWidth="1.5" />
          {/* Card number */}
          <text x="30" y="125" fill="#CBD5E1" fontSize="14" fontFamily={FONT_REG} letterSpacing="4">•••• •••• •••• 4821</text>
          {/* 22% label */}
          <text x="220" y="145" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily={FONT} fontWeight="900">22%</text>
        </svg>

        {/* Flames above card */}
        <svg style={{ position: 'absolute', top: -flameH, opacity: flameOp }} width="280" height="80" viewBox="0 0 280 80">
          <path d="M80,80 Q90,40 100,20 Q110,40 120,10 Q130,40 140,0 Q150,40 160,10 Q170,40 180,20 Q190,50 200,80Z" fill={ACCENT} opacity="0.8" />
          <path d="M90,80 Q100,50 110,35 Q120,50 130,25 Q140,50 150,30 Q160,55 170,80Z" fill="#F97316" opacity="0.9" />
        </svg>
      </div>

      {/* Bottom insight */}
      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60 }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 30, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Borrowing at 22% to give the IRS a free loan — wild, right?
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 4 — The Real Cost: $417K in lost growth
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const coinScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, from: 0, to: 1, durationInFrames: 40 });

  const rawCount = interpolate(frame, [30, 180], [2753, 417000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const displayCount = Math.floor(rawCount);

  const barProgress = interpolate(frame, [20, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const arrowOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinStackHeight = Math.floor(interpolate(frame, [10, 140], [0, 7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const safeCount = Math.max(0, Math.floor(coinStackHeight));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, opacity: titleOp }}>
        <p style={{ ...headline(36, BLACK) }}>WHAT IT ACTUALLY COSTS</p>
      </div>

      {/* Coin stack growing */}
      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${coinScale})` }}>
        <svg width="160" height="220" viewBox="0 0 160 220">
          {/* Base coins */}
          {Array.from({ length: safeCount }).map((_, i) => (
            <g key={i} transform={`translate(0, ${190 - i * 26})`}>
              <ellipse cx="80" cy="10" rx="55" ry="12" fill={i % 2 === 0 ? '#F59E0B' : '#D97706'} />
              <rect x="25" y="-4" width="110" height="14" fill={i % 2 === 0 ? '#F59E0B' : '#D97706'} />
              <ellipse cx="80" cy="-4" rx="55" ry="12" fill={i % 2 === 0 ? '#FBBF24' : '#F59E0B'} />
            </g>
          ))}
          {/* Dollar sign on top */}
          {safeCount > 0 && (
            <text x="80" y="40" textAnchor="middle" fill="white" fontSize="28" fontFamily={FONT} fontWeight="900" opacity="0.9">$</text>
          )}
        </svg>
      </div>

      {/* Animated counter */}
      <div style={{ position: 'absolute', top: 450, left: 60, right: 60 }}>
        <p style={{ ...headline(72, BLACK), color: BLACK }}>
          ${displayCount.toLocaleString()}
        </p>
      </div>

      {/* Growth bar */}
      <div style={{ position: 'absolute', top: 570, left: 80, right: 80 }}>
        <div style={{ background: '#E2E8F0', borderRadius: 8, height: 18, overflow: 'hidden' }}>
          <div style={{
            background: `linear-gradient(90deg, #16A34A, #4ADE80)`,
            width: `${barProgress * 100}%`,
            height: '100%',
            borderRadius: 8,
            transition: 'none',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <p style={{ fontFamily: FONT_REG, fontSize: 20, color: '#6B7280', margin: 0 }}>$2,753 today</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#16A34A', margin: 0 }}>$417,000 in 40 yrs</p>
        </div>
      </div>

      {/* Arrow + formula */}
      <div style={{ position: 'absolute', top: 660, left: 60, right: 60, opacity: arrowOp }}>
        <div style={{ background: '#F0FDF4', border: '2px solid #16A34A', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#16A34A', textAlign: 'center', margin: 0 }}>
            8% returns × 40 years
          </p>
        </div>
      </div>

      {/* Sub note */}
      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: subOp }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 30, color: '#374151', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Every year you wait is another $417K left on the table.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5 — The Fix: update W-4 in 5 minutes
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame, fps, config: { damping: 15, stiffness: 110 }, from: 0, to: 1, durationInFrames: 35 });
  const step1Op = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const paycheckGrow = interpolate(frame, [140, 200], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const paycheckOp = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, opacity: titleOp }}>
        <p style={{ ...headline(40, WHITE) }}>THE 5-MINUTE FIX</p>
      </div>

      {/* Phone with IRS logo */}
      <div style={{ position: 'absolute', top: 195, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${phoneScale})` }}>
        <svg width="180" height="280" viewBox="0 0 180 280">
          {/* Phone body */}
          <rect x="15" y="5" width="150" height="270" rx="22" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
          {/* Screen */}
          <rect x="22" y="28" width="136" height="220" rx="10" fill="#0F172A" />
          {/* Screen content */}
          <rect x="22" y="28" width="136" height="40" rx="10" fill={ACCENT} />
          <text x="90" y="55" textAnchor="middle" fill="white" fontSize="14" fontFamily={FONT} fontWeight="900">IRS.GOV</text>
          {/* Content lines */}
          <rect x="30" y="82" width="120" height="10" rx="3" fill="#334155" />
          <rect x="30" y="100" width="100" height="10" rx="3" fill="#334155" />
          <rect x="30" y="118" width="110" height="10" rx="3" fill="#334155" />
          {/* Button */}
          <rect x="35" y="138" width="110" height="30" rx="8" fill={ACCENT} />
          <text x="90" y="158" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>W-4 ESTIMATOR</text>
          {/* Notch */}
          <rect x="62" y="10" width="56" height="12" rx="6" fill="#0F172A" />
        </svg>
      </div>

      {/* 3 steps */}
      <div style={{ position: 'absolute', top: 510, left: 70, right: 70 }}>
        {[
          { num: '1', text: 'IRS Tax Withholding Estimator', op: step1Op },
          { num: '2', text: 'Update your W-4 form', op: step2Op },
          { num: '3', text: 'Submit to HR', op: step3Op },
        ].map((step) => (
          <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20, opacity: step.op }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}>{step.num}</span>
            </div>
            <p style={{ fontFamily: FONT_REG, fontSize: 28, color: WHITE, margin: 0 }}>{step.text}</p>
          </div>
        ))}
      </div>

      {/* Paycheck gets bigger */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: paycheckOp }}>
        <div style={{ background: '#F0FDF4', borderRadius: 14, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="50" viewBox="0 0 60 50">
            <rect x="2" y="2" width="56" height="46" rx="6" fill="white" stroke="#16A34A" strokeWidth="2" />
            <line x1="10" y1="18" x2="50" y2="18" stroke="#16A34A" strokeWidth="2" />
            <line x1="10" y1="28" x2="40" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="30" y="43" textAnchor="middle" fill="#16A34A" fontSize="12" fontFamily={FONT} fontWeight="900">+${Math.floor(paycheckGrow)}</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#16A34A', margin: 0 }}>
            Next paycheck: bigger
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 6 — CTA: Update your W-4 today
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const personScale = spring({ frame, fps, config: { damping: 16, stiffness: 100 }, from: 0, to: 1, durationInFrames: 38 });
  const piggyScale = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1, durationInFrames: 30 });
  const arrowOp = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowY = interpolate(frame, [60, 80], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 160 }, from: 0, to: 1, durationInFrames: 28 });
  const ctaOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fillLevel = interpolate(frame, [50, 190], [0, 0.75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, opacity: titleOp }}>
        <p style={{ ...headline(38, BLACK) }}>STOP GIVING FREE LOANS</p>
      </div>

      {/* Person with coins */}
      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${personScale})` }}>
        <svg width="200" height="220" viewBox="0 0 200 220">
          {/* Person silhouette */}
          <circle cx="100" cy="38" r="30" fill="#374151" />
          <rect x="68" y="72" width="64" height="80" rx="14" fill="#374151" />
          {/* Arms up holding coins */}
          <line x1="68" y1="90" x2="30" y2="55" stroke="#374151" strokeWidth="14" strokeLinecap="round" />
          <line x1="132" y1="90" x2="170" y2="55" stroke="#374151" strokeWidth="14" strokeLinecap="round" />
          {/* Legs */}
          <line x1="82" y1="152" x2="70" y2="200" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
          <line x1="118" y1="152" x2="130" y2="200" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
          {/* Coin in left hand */}
          <circle cx="30" cy="50" r="18" fill="#F59E0B" />
          <text x="30" y="56" textAnchor="middle" fill="white" fontSize="16" fontFamily={FONT} fontWeight="900">$</text>
          {/* Coin in right hand */}
          <circle cx="170" cy="50" r="18" fill="#F59E0B" />
          <text x="170" y="56" textAnchor="middle" fill="white" fontSize="16" fontFamily={FONT} fontWeight="900">$</text>
        </svg>
      </div>

      {/* Piggy bank filling */}
      <div style={{ position: 'absolute', top: 450, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${piggyScale})` }}>
        <svg width="200" height="180" viewBox="0 0 200 180">
          {/* Piggy bank body */}
          <ellipse cx="100" cy="110" rx="72" ry="58" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2.5" />
          {/* Snout */}
          <ellipse cx="160" cy="120" rx="22" ry="16" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          <circle cx="154" cy="118" r="4" fill={ACCENT} />
          <circle cx="164" cy="118" r="4" fill={ACCENT} />
          {/* Eye */}
          <circle cx="130" cy="95" r="6" fill="white" />
          <circle cx="131" cy="95" r="3" fill={ACCENT} />
          {/* Ear */}
          <ellipse cx="72" cy="68" rx="14" ry="18" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          {/* Coin slot */}
          <rect x="88" y="52" width="24" height="6" rx="3" fill={ACCENT} />
          {/* Legs */}
          <rect x="58" y="158" width="20" height="20" rx="5" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          <rect x="84" y="162" width="20" height="18" rx="5" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          <rect x="110" y="162" width="20" height="18" rx="5" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          <rect x="134" y="158" width="20" height="20" rx="5" fill="#FCA5A5" stroke={ACCENT} strokeWidth="2" />
          {/* Fill level */}
          <clipPath id="piggyFill">
            <ellipse cx="100" cy="110" rx="70" ry="56" />
          </clipPath>
          <rect
            x="28"
            y={110 + 56 - fillLevel * 112}
            width="144"
            height={fillLevel * 112}
            fill="#F59E0B"
            opacity="0.5"
            clipPath="url(#piggyFill)"
          />
          {/* Tail */}
          <path d="M28 110 Q10 100 18 88 Q26 76 22 70" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Arrow upward */}
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, opacity: arrowOp, transform: `translateY(${arrowY}px)` }}>
        <svg width="80" height="60" viewBox="0 0 80 60" style={{ display: 'block', margin: '0 auto' }}>
          <line x1="40" y1="55" x2="40" y2="10" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <polyline points="20,28 40,8 60,28" fill="none" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* CTA Button */}
      <div style={{ position: 'absolute', top: 710, left: 60, right: 60, opacity: ctaOp, transform: `scale(${ctaScale})` }}>
        <div style={{ background: ACCENT, borderRadius: 18, padding: '22px 30px' }}>
          <p style={{ ...headline(38, WHITE), letterSpacing: '0.08em' }}>UPDATE YOUR W-4 TODAY</p>
        </div>
      </div>

      {/* Sub text */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: subOp }}>
        <p style={{ fontFamily: FONT_REG, fontSize: 28, color: '#374151', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Free. 5 minutes. Works this pay period.
        </p>
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
