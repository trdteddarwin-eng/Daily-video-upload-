import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const ACCENT_RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

// ── SCENE 2 — Lifestyle creep timeline ───────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const items: Array<{ label: string; sub: string; delay: number; isRed: boolean }> = [
    { label: 'RAISE ARRIVES', sub: '+$500/month', delay: 20, isRed: false },
    { label: 'BIGGER APARTMENT', sub: '+$300/month', delay: 60, isRed: true },
    { label: 'NEWER CAR', sub: '+$180/month', delay: 100, isRed: true },
    { label: 'NICER RESTAURANTS', sub: '+$120/month', delay: 140, isRed: true },
  ];

  const taglineIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 175 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 0 }}>
        <p style={{ ...headline(44, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 6 }}>IT'S CALLED</p>
        <p style={{ ...headline(58, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 44 }}>LIFESTYLE CREEP</p>

        {items.map((item, i) => {
          const itemIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: item.delay });
          const color = item.isRed ? ACCENT_RED : ACCENT;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', marginBottom: 28,
              opacity: itemIn, transform: `translateX(${(1 - itemIn) * -40}px)`, width: '100%',
            }}>
              <div style={{ background: color, borderRadius: 50, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 22 }}>
                <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>{i + 1}</span>
              </div>
              {/* Mini SVG icons */}
              <div style={{ marginRight: 20, flexShrink: 0 }}>
                {i === 0 && (
                  <svg width="52" height="36" viewBox="0 0 52 36">
                    <rect x="2" y="6" width="48" height="24" rx="4" fill={ACCENT} />
                    <rect x="8" y="12" width="36" height="12" rx="2" fill="#0a7a58" />
                    <circle cx="26" cy="18" r="5" fill={ACCENT} />
                    <line x1="8" y1="32" x2="20" y2="32" stroke={ACCENT} strokeWidth="2" />
                  </svg>
                )}
                {i === 1 && (
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <polygon points="26,4 50,22 2,22" fill={ACCENT_RED} />
                    <rect x="8" y="22" width="36" height="26" fill="#ff7070" />
                    <rect x="20" y="30" width="12" height="18" fill={ACCENT_RED} />
                  </svg>
                )}
                {i === 2 && (
                  <svg width="56" height="36" viewBox="0 0 56 36">
                    <rect x="2" y="14" width="52" height="17" rx="5" fill={ACCENT_RED} />
                    <polygon points="10,14 14,6 42,6 46,14" fill="#ff7070" />
                    <circle cx="14" cy="31" r="5" fill="#333" />
                    <circle cx="42" cy="31" r="5" fill="#333" />
                  </svg>
                )}
                {i === 3 && (
                  <svg width="44" height="52" viewBox="0 0 44 52">
                    <ellipse cx="22" cy="30" rx="18" ry="8" fill={ACCENT_RED} />
                    <rect x="10" y="10" width="3" height="20" fill={ACCENT_RED} />
                    <rect x="21" y="10" width="3" height="20" fill={ACCENT_RED} />
                    <rect x="32" y="10" width="3" height="20" fill={ACCENT_RED} />
                    <rect x="17" y="38" width="10" height="12" fill={ACCENT_RED} />
                    <rect x="12" y="48" width="20" height="3" rx="1" fill={ACCENT_RED} />
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, letterSpacing: '0.04em', margin: 0 }}>{item.label}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: 22, color, margin: '4px 0 0 0' }}>{item.sub}</p>
              </div>
            </div>
          );
        })}

        <div style={{ opacity: taglineIn, transform: `translateY(${(1 - taglineIn) * 20}px)`, marginTop: 8 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#666', textAlign: 'center', margin: 0 }}>
            "feel richer for a month — then normal again"
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 3 — 75% upgrade within 90 days, investment account at $0 ────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statCount = Math.floor(interpolate(frame, [10, 90], [0, 75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const statScale = spring({ frame: Math.max(0, frame - 80), fps, from: 1, to: 1.08, config: { damping: 8, stiffness: 120 } });

  const splitOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftShift = interpolate(frame, [100, 140], [0, -1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightShift = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const zeroIn = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 60px', gap: 20 }}>
        <p style={{ ...headline(38, WHITE), marginBottom: 0 }}>OF PEOPLE UPGRADE</p>
        <p style={{ ...headline(36, '#AAA'), marginBottom: 16 }}>WITHIN 90 DAYS OF A RAISE</p>

        {/* Big stat */}
        <div style={{ transform: `scale(${statScale})`, marginBottom: 30 }}>
          <p style={{ fontFamily: FONT, fontSize: 160, color: ACCENT, margin: 0, lineHeight: 1, textAlign: 'center' }}>
            {statCount}%
          </p>
        </div>

        {/* Dollar splitting left/right */}
        <div style={{ opacity: splitOp, display: 'flex', gap: 60, alignItems: 'center', marginBottom: 20 }}>
          {/* Left: spending */}
          <div style={{ transform: `translateX(${leftShift * 40}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="80" height="50" viewBox="0 0 80 50">
              <rect x="2" y="8" width="76" height="34" rx="6" fill={ACCENT_RED} opacity="0.8" />
              <text x="40" y="30" fontSize="22" fill={WHITE} textAnchor="middle" fontFamily="Arial Black" fontWeight="bold">$500</text>
            </svg>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <polygon points="22,2 42,20 2,20" fill={ACCENT_RED} />
              <rect x="6" y="20" width="32" height="22" fill="#ff7070" />
              <rect x="16" y="26" width="12" height="16" fill={ACCENT_RED} />
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: ACCENT_RED, margin: 0, textAlign: 'center' }}>SPENT ON UPGRADES</p>
          </div>

          {/* Arrow divider */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="40" height="60" viewBox="0 0 40 60">
              <line x1="20" y1="5" x2="20" y2="55" stroke="#444" strokeWidth="3" />
              <polyline points="10,20 20,8 30,20" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />
              <polyline points="10,40 20,52 30,40" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Right: investing — stays empty */}
          <div style={{ transform: `translateX(${rightShift * 40}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="80" height="50" viewBox="0 0 80 50">
              <rect x="2" y="8" width="76" height="34" rx="6" fill="#333" />
              <text x="40" y="30" fontSize="22" fill="#666" textAnchor="middle" fontFamily="Arial Black" fontWeight="bold">$0</text>
            </svg>
            {/* Piggy bank */}
            <svg width="50" height="46" viewBox="0 0 50 46">
              <ellipse cx="22" cy="24" rx="18" ry="16" fill="#2a2a2a" stroke="#444" strokeWidth="2" />
              <circle cx="34" cy="20" r="4" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
              <rect x="8" y="34" width="4" height="10" rx="2" fill="#2a2a2a" />
              <rect x="14" y="36" width="4" height="10" rx="2" fill="#2a2a2a" />
              <rect x="24" y="36" width="4" height="10" rx="2" fill="#2a2a2a" />
              <rect x="30" y="34" width="4" height="10" rx="2" fill="#2a2a2a" />
              <path d="M 4 20 Q 0 16 4 12" stroke="#444" strokeWidth="2" fill="none" />
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#666', margin: 0, textAlign: 'center' }}>INVESTMENT ACCOUNT</p>
          </div>
        </div>

        {/* Zero label */}
        <div style={{ opacity: zeroIn, transform: `scale(${zeroIn})`, background: ACCENT_RED, borderRadius: 14, padding: '14px 36px' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>INVESTMENT ACCOUNT: $0</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 4 — $1.4M comparison: spend vs invest the raise delta ───────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const lineGrow = interpolate(frame, [30, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 10, stiffness: 140 } });
  const tagIn = spring({ frame: Math.max(0, frame - 175), fps, config: { damping: 12, stiffness: 100 } });

  const chartW = 860;
  const chartH = 340;

  // Exponential curve points for 35 years (simplified 10 points)
  const pointCount = Math.max(0, Math.floor(11));
  const maxVal = chartH - 20;
  const curvePoints = Array(pointCount).fill(null).map((_, i) => {
    const t = i / (pointCount - 1);
    const x = 30 + t * (chartW - 60);
    const y = (chartH - 10) - maxVal * (Math.pow(2.3, t * 3) - 1) / (Math.pow(2.3, 3) - 1) * lineGrow;
    return `${x},${y}`;
  }).join(' ');

  const flatY = chartH - 10;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 50px', gap: 20 }}>
        <p style={{ ...headline(42, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>THE MATH THAT</p>
        <p style={{ ...headline(42, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 28 }}>CHANGES EVERYTHING</p>

        {/* Chart */}
        <div style={{ position: 'relative', width: chartW, height: chartH }}>
          <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
            {/* Axes */}
            <line x1="30" y1="10" x2="30" y2={chartH - 10} stroke="#CCC" strokeWidth="2" />
            <line x1="30" y1={chartH - 10} x2={chartW - 10} y2={chartH - 10} stroke="#CCC" strokeWidth="2" />

            {/* Flat red line (spent on lifestyle) */}
            <line
              x1="30" y1={flatY}
              x2={30 + (chartW - 60) * lineGrow} y2={flatY}
              stroke={ACCENT_RED} strokeWidth="4" strokeLinecap="round"
              strokeDasharray="12 6"
            />

            {/* Green exponential curve (invested) */}
            <polyline
              points={curvePoints}
              fill="none"
              stroke={ACCENT}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Axis labels */}
            <text x="36" y={chartH - 16} fontSize="22" fill="#999" fontFamily="Arial">AGE 30</text>
            <text x={chartW - 90} y={chartH - 16} fontSize="22" fill="#999" fontFamily="Arial">AGE 65</text>
            <text x="36" y="30" fontSize="22" fill={ACCENT} fontFamily="Arial Black">$1.4M</text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 6, background: ACCENT, borderRadius: 3 }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: ACCENT, margin: 0 }}>INVESTED THE RAISE DELTA</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 6, background: ACCENT_RED, borderRadius: 3 }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: ACCENT_RED, margin: 0 }}>SPENT ON LIFESTYLE</p>
          </div>
        </div>

        {/* Big number */}
        <div style={{ opacity: bigNumIn, transform: `scale(${bigNumIn})`, background: ACCENT, borderRadius: 20, padding: '18px 50px', textAlign: 'center' }}>
          <p style={{ ...headline(80, WHITE) }}>$1,400,000</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: WHITE, margin: '6px 0 0 0' }}>EXTRA AT RETIREMENT — 35 YEARS</p>
        </div>

        <div style={{ opacity: tagIn, transform: `translateY(${(1 - tagIn) * 20}px)` }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#666', textAlign: 'center', margin: 0 }}>
            that's the actual price tag of lifestyle creep
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 5 — Even $200K earners live paycheck to paycheck ────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const salaryBands = [
    { label: '$60K', height: 120 },
    { label: '$80K', height: 170 },
    { label: '$100K', height: 220 },
    { label: '$200K', height: 300 },
  ];

  const barsGrow = interpolate(frame, [20, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifestyleIn = interpolate(frame, [80, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsIn = interpolate(frame, [130, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelIn = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 24 }}>
        <p style={{ ...headline(38, WHITE), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 0 }}>THE WILD PART?</p>
        <p style={{ ...headline(36, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 20 }}>
          MORE MONEY, SAME TRAP
        </p>

        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end', height: 340 }}>
          {salaryBands.map((band, i) => {
            const barH = Math.round(band.height * barsGrow);
            const lifestyleH = Math.round(band.height * lifestyleIn);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                {/* Labels above */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 28, height: Math.max(0, barH), background: ACCENT, borderRadius: '4px 4px 0 0' }} />
                  <div style={{ width: 28, height: Math.max(0, lifestyleH), background: ACCENT_RED, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                </div>
                <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>{band.label}</p>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center', opacity: lifestyleIn }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, background: ACCENT, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: ACCENT, margin: 0 }}>INCOME</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, background: ACCENT_RED, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: ACCENT_RED, margin: 0 }}>LIFESTYLE SPENDING</p>
          </div>
        </div>

        {/* Savings flatline */}
        <div style={{ opacity: savingsIn, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 4, background: '#444', borderRadius: 2 }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: 0 }}>SAVINGS RATE</p>
            <div style={{ flex: 1, height: 4, background: '#444', borderRadius: 2 }} />
          </div>
        </div>

        <div style={{ opacity: labelIn, transform: `scale(${labelIn})`, textAlign: 'center', background: '#1A1A2E', borderRadius: 14, padding: '16px 32px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>
            PAYCHECK-TO-PAYCHECK RATES: NEARLY IDENTICAL
          </p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT_RED, margin: '8px 0 0 0' }}>
            $60K earners vs $200K earners
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 6 — CTA: redirect one upgrade to investments ───────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const itemIn = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 30 });
  const arrowIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 80 });
  const piggyIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 110 });
  const checkIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 160 } });
  const ctaOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [155, 180], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 0 }}>
        <p style={{ ...headline(46, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 6 }}>PICK ONE UPGRADE</p>
        <p style={{ ...headline(36, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 44 }}>REDIRECT IT EVERY RAISE</p>

        {/* Upgrade item circled */}
        <div style={{ opacity: itemIn, transform: `scale(${itemIn})`, marginBottom: 30 }}>
          <div style={{ border: `5px solid ${ACCENT_RED}`, borderRadius: 20, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* Streaming/coffee icon */}
            <svg width="60" height="60" viewBox="0 0 60 60">
              <rect x="4" y="10" width="52" height="34" rx="7" fill={ACCENT_RED} />
              <rect x="10" y="16" width="40" height="22" rx="3" fill="#ff9999" />
              <polygon points="24,20 42,27 24,34" fill={WHITE} />
              <rect x="22" y="44" width="16" height="6" rx="2" fill={ACCENT_RED} />
              <rect x="12" y="50" width="36" height="4" rx="2" fill={ACCENT_RED} />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>STREAMING UPGRADE</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: ACCENT_RED, margin: '4px 0 0 0' }}>$25/month</p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ opacity: arrowIn, marginBottom: 20 }}>
          <svg width="60" height="80" viewBox="0 0 60 80">
            <line x1="30" y1="10" x2="30" y2="60" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <polyline points="14,46 30,64 46,46" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Piggy bank destination */}
        <div style={{ opacity: piggyIn, transform: `scale(${piggyIn})`, marginBottom: 30 }}>
          <svg width="130" height="110" viewBox="0 0 130 110">
            {/* Body */}
            <ellipse cx="60" cy="62" rx="48" ry="42" fill={ACCENT} />
            {/* Head/snout */}
            <circle cx="100" cy="52" rx="18" ry="16" fill={ACCENT} />
            <ellipse cx="103" cy="56" rx="10" ry="7" fill="#0a7a58" />
            <circle cx="100" cy="54" r="4" fill="#0a7a58" />
            {/* Ear */}
            <ellipse cx="68" cy="24" rx="12" ry="9" fill="#0a7a58" />
            {/* Eye */}
            <circle cx="94" cy="45" r="4" fill={WHITE} />
            <circle cx="95" cy="46" r="2" fill={BLACK} />
            {/* Coin slot */}
            <rect x="48" y="20" width="22" height="6" rx="3" fill="#0a7a58" />
            {/* Legs */}
            <rect x="22" y="96" width="14" height="14" rx="4" fill="#0a7a58" />
            <rect x="42" y="96" width="14" height="14" rx="4" fill="#0a7a58" />
            <rect x="62" y="96" width="14" height="14" rx="4" fill="#0a7a58" />
            <rect x="82" y="96" width="14" height="14" rx="4" fill="#0a7a58" />
            {/* Coin flying in */}
            <circle cx="59" cy="14" r="10" fill="#F59E0B" />
            <text x="59" y="19" fontSize="12" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center', margin: '8px 0 0 0' }}>INDEX FUND — AUTO-INVEST</p>
        </div>

        {/* Checkmark */}
        <div style={{ opacity: checkIn, transform: `scale(${checkIn})`, marginBottom: 16 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" fill={ACCENT} />
            <polyline points="18,42 33,57 62,25" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* CTA badge */}
        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center', background: BLACK, borderRadius: 18, padding: '20px 40px' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>ONE REDIRECT =</p>
          <p style={{ fontFamily: FONT, fontSize: 46, color: ACCENT, margin: '6px 0 0 0' }}>$1.4M AT RETIREMENT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 1 — Salary goes up, wallet stays empty ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 5 });
  const personIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 15 });

  const salaryStage = Math.min(3, Math.max(0, Math.floor(
    interpolate(frame, [30, 70, 100, 130, 160], [0, 0, 1, 2, 3], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )));
  const salaries = ['$45K', '$60K', '$80K', '$100K'];

  const walletIn = spring({ frame, fps, config: { damping: 14, stiffness: 90 }, delay: 80 });
  const questionIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 155 });
  const badgeGreen = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px', gap: 0 }}>
        <p style={{ ...headline(50, WHITE), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 8 }}>
          YOU GOT THE
        </p>
        <p style={{ ...headline(60, ACCENT), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 36 }}>
          RAISES.
        </p>

        {/* Person SVG */}
        <svg width="120" height="170" viewBox="0 0 120 170"
          style={{ transform: `scale(${personIn})`, transformOrigin: 'center bottom', marginBottom: 28 }}>
          <circle cx="60" cy="30" r="26" fill={ACCENT} />
          <rect x="38" y="60" width="44" height="62" rx="10" fill={ACCENT} />
          <rect x="8" y="64" width="30" height="13" rx="6" fill={ACCENT} />
          <rect x="82" y="64" width="30" height="13" rx="6" fill={ACCENT} />
          <rect x="40" y="118" width="16" height="46" rx="8" fill={ACCENT} />
          <rect x="64" y="118" width="16" height="46" rx="8" fill={ACCENT} />
        </svg>

        {/* Salary badge */}
        <div style={{ background: ACCENT, borderRadius: 18, padding: '14px 44px', marginBottom: 30, opacity: badgeGreen }}>
          <p style={{ ...headline(72, BLACK), letterSpacing: '0.06em' }}>{salaries[salaryStage]}</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: BLACK, textAlign: 'center', margin: 0 }}>SALARY</p>
        </div>

        {/* Empty wallet */}
        <div style={{ opacity: walletIn, transform: `scale(${walletIn})`, marginBottom: 20 }}>
          <svg width="110" height="70" viewBox="0 0 110 70">
            <rect x="4" y="18" width="102" height="48" rx="9" fill="none" stroke="#444" strokeWidth="3" />
            <rect x="4" y="6" width="102" height="22" rx="7" fill="#2a2a2a" />
            <circle cx="80" cy="42" r="11" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <line x1="18" y1="34" x2="48" y2="34" stroke="#333" strokeWidth="2" />
          </svg>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#666', textAlign: 'center', margin: '6px 0 0 0' }}>
            WALLET: STILL EMPTY
          </p>
        </div>

        {/* Question */}
        <div style={{ opacity: questionIn, transform: `translateY(${(1 - questionIn) * 20}px)` }}>
          <p style={{ ...headline(38, ACCENT_RED) }}>WHERE DOES IT GO?</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── COMPOSITION ───────────────────────────────────────────────────────────────
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
