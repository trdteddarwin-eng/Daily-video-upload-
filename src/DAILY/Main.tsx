import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

// ── Scene 1: The Hook ─────────────────────────────────────────────────────────


const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const brainPop = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const multiplierVal = interpolate(frame, [35, 95], [1, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        {/* Title */}
        <div style={{
          transform: `translateY(${interpolate(titleSlide, [0, 1], [-80, 0])}px)`,
          opacity: titleSlide,
          textAlign: 'center',
        }}>
          <p style={headline(58, ACCENT)}>THE ENDOWMENT</p>
          <p style={headline(58, ACCENT)}>EFFECT</p>
        </div>

        {/* Brain SVG */}
        <div style={{ transform: `scale(${brainPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 200 160" width={260} height={208}>
            <path
              d="M100,135 C55,135 22,112 18,78 C14,44 38,20 68,16 C84,14 95,24 100,36"
              fill="none" stroke={ACCENT} strokeWidth={5} strokeLinecap="round"
            />
            <path
              d="M100,135 C145,135 178,112 182,78 C186,44 162,20 132,16 C116,14 105,24 100,36"
              fill="none" stroke={ACCENT} strokeWidth={5} strokeLinecap="round"
            />
            <line x1={100} y1={36} x2={100} y2={135} stroke={ACCENT} strokeWidth={3} strokeDasharray="6,4" />
            <path d="M52,62 C62,56 74,66 64,78" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
            <path d="M42,95 C52,89 64,99 54,111" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
            <path d="M148,62 C138,56 126,66 136,78" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
            <path d="M158,95 C148,89 136,99 146,111" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
          </svg>
        </div>

        {/* Multiplier counter ×1 → ×3 */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 140, color: WHITE, margin: 0, lineHeight: 1 }}>
            ×{Math.floor(multiplierVal)}
          </p>
          <p style={headline(34, ACCENT)}>YOUR BRAIN'S MARKUP</p>
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: FONT, fontSize: 28, color: WHITE,
          textAlign: 'center', lineHeight: 1.5, margin: 0,
          maxWidth: 820, opacity: subOpacity,
        }}>
          Own something? Your brain inflates its value. That's the endowment effect.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: The Cornell Mug Study ────────────────────────────────────────────

const MugSVG: React.FC<{ fill: string; strokeColor: string }> = ({ fill, strokeColor }) => (
  <svg viewBox="0 0 130 145" width={155} height={173}>
    {/* Body */}
    <rect x={8} y={18} width={88} height={100} rx={10} fill={fill} stroke={strokeColor} strokeWidth={4} />
    {/* Handle */}
    <path d="M96,38 C126,38 126,92 96,92" fill="none" stroke={strokeColor} strokeWidth={6} strokeLinecap="round" />
    {/* Saucer */}
    <ellipse cx={52} cy={122} rx={64} ry={14} fill={fill} stroke={strokeColor} strokeWidth={3} />
    {/* Steam */}
    <path d="M30,8 C26,-5 34,-5 30,-18" fill="none" stroke={strokeColor} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
    <path d="M52,5 C48,-8 56,-8 52,-21" fill="none" stroke={strokeColor} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
  </svg>
);

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftMug = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const rightMug = spring({ fps, frame: Math.max(0, frame - 25), config: { damping: 14, mass: 0.8 } });
  const pricesOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '60px 60px', gap: 36,
      }}>
        <p style={headline(52, BLACK)}>SAME MUG.</p>
        <p style={headline(52, BLACK)}>DIFFERENT BRAIN.</p>

        {/* Two mugs */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50 }}>
          <div style={{ transform: `scale(${leftMug})`, transformOrigin: 'bottom center', textAlign: 'center' }}>
            <MugSVG fill={ACCENT} strokeColor={BLACK} />
            <p style={headline(28, BLACK)}>OWNER</p>
          </div>

          <p style={{ fontFamily: FONT, fontSize: 44, color: BLACK, marginBottom: 64 }}>VS</p>

          <div style={{ transform: `scale(${rightMug})`, transformOrigin: 'bottom center', textAlign: 'center' }}>
            <MugSVG fill="#E0E0E0" strokeColor={BLACK} />
            <p style={headline(28, BLACK)}>BUYER</p>
          </div>
        </div>

        {/* Prices */}
        <div style={{ opacity: pricesOpacity, display: 'flex', gap: 70, alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, margin: 0, lineHeight: 1 }}>$7.12</p>
            <p style={headline(22, BLACK)}>WANTS TO SELL</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 72, color: BLACK, margin: 0, lineHeight: 1 }}>$2.87</p>
            <p style={headline(22, BLACK)}>WILLING TO PAY</p>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          opacity: badgeOpacity, background: ACCENT,
          borderRadius: 14, padding: '14px 46px',
        }}>
          <p style={headline(44, BLACK)}>+148% MARKUP</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Investing ────────────────────────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const chartProgress = interpolate(frame, [15, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat1Opacity = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Downward-trending chart: y increases (drops in SVG = price falling)
  const allPts: [number, number][] = [
    [0, 20], [28, 36], [56, 26], [84, 52], [112, 42], [140, 68], [168, 56], [196, 82], [224, 72], [252, 96],
  ];
  const visCount = Math.max(2, Math.round(chartProgress * allPts.length));
  const visPts = allPts.slice(0, visCount);
  const lineStr = visPts.map(([x, y]) => `${x},${y}`).join(' ');
  const areaStr = lineStr + ` ${visPts[visPts.length - 1][0]},120 0,120`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 32,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>IN YOUR</p>
          <p style={headline(50, ACCENT)}>BROKERAGE ACCOUNT</p>
        </div>

        {/* Stock chart */}
        <svg viewBox="0 0 270 125" width={680} height={310}>
          <line x1={0} y1={40} x2={260} y2={40} stroke={WHITE} strokeWidth={0.5} opacity={0.2} />
          <line x1={0} y1={80} x2={260} y2={80} stroke={WHITE} strokeWidth={0.5} opacity={0.2} />
          <polygon points={areaStr} fill="#EF4444" opacity={0.15} />
          <polyline
            points={lineStr}
            fill="none" stroke="#EF4444" strokeWidth={4}
            strokeLinecap="round" strokeLinejoin="round"
          />
          <text x={255} y={105} textAnchor="end" fontSize={20} fill="#EF4444" fontFamily="Arial" fontWeight="bold">▼</text>
        </svg>

        {/* Stat 1 — 71% */}
        <div style={{ opacity: stat1Opacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 108, color: '#EF4444', margin: 0, lineHeight: 1 }}>71%</p>
          <p style={headline(28, WHITE)}>HOLD LOSSES 2× LONGER THAN WINS</p>
        </div>

        {/* Stat 2 — $9,200 */}
        <div style={{
          opacity: stat2Opacity, background: '#1E1E1E',
          borderRadius: 14, padding: '16px 44px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 54, color: ACCENT, margin: 0, lineHeight: 1 }}>$9,200</p>
          <p style={headline(24, WHITE)}>AVG STUCK POSITION</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: Real Estate ──────────────────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const housePop = spring({ fps, frame, config: { damping: 12, mass: 0.9 } });
  const tagOpacity = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const daysOpacity = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cutOpacity = interpolate(frame, [88, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '60px 60px', gap: 30,
      }}>
        <p style={headline(52, BLACK)}>HOME SELLERS</p>
        <p style={headline(52, BLACK)}>ARE THE WORST</p>

        {/* House */}
        <div style={{ transform: `scale(${housePop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 280 240" width={320} height={275}>
            {/* Roof */}
            <polygon points="140,10 266,112 14,112" fill={ACCENT} stroke={BLACK} strokeWidth={4} />
            {/* Body */}
            <rect x={36} y={110} width={208} height={118} fill={WHITE} stroke={BLACK} strokeWidth={4} />
            {/* Door */}
            <rect x={110} y={170} width={60} height={58} rx={8} fill={BLACK} />
            <circle cx={163} cy={201} r={5} fill={ACCENT} />
            {/* Left window */}
            <rect x={52} y={132} width={52} height={42} rx={4} fill={ACCENT} stroke={BLACK} strokeWidth={3} />
            <line x1={78} y1={132} x2={78} y2={174} stroke={BLACK} strokeWidth={2} />
            <line x1={52} y1={153} x2={104} y2={153} stroke={BLACK} strokeWidth={2} />
            {/* Right window */}
            <rect x={176} y={132} width={52} height={42} rx={4} fill={ACCENT} stroke={BLACK} strokeWidth={3} />
            <line x1={202} y1={132} x2={202} y2={174} stroke={BLACK} strokeWidth={2} />
            <line x1={176} y1={153} x2={228} y2={153} stroke={BLACK} strokeWidth={2} />
          </svg>
        </div>

        {/* Price tag */}
        <div style={{
          opacity: tagOpacity, background: '#FEF3C7',
          border: `3px solid ${ACCENT}`, borderRadius: 12,
          padding: '10px 34px', textAlign: 'center',
        }}>
          <p style={headline(30, BLACK)}>ASKING PRICE</p>
          <p style={{ fontFamily: FONT, fontSize: 58, color: ACCENT, margin: 0, lineHeight: 1 }}>+22% OVER</p>
          <p style={headline(24, BLACK)}>MARKET VALUE</p>
        </div>

        {/* Days on market */}
        <div style={{ opacity: daysOpacity, display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg viewBox="0 0 58 62" width={58} height={62}>
            <rect x={2} y={10} width={54} height={50} rx={6} fill="none" stroke={BLACK} strokeWidth={3} />
            <rect x={2} y={10} width={54} height={18} rx={6} fill={BLACK} />
            <line x1={17} y1={4} x2={17} y2={18} stroke={BLACK} strokeWidth={4} strokeLinecap="round" />
            <line x1={41} y1={4} x2={41} y2={18} stroke={BLACK} strokeWidth={4} strokeLinecap="round" />
            <text x={29} y={50} textAnchor="middle" fontSize={18} fill={BLACK} fontFamily="Arial" fontWeight="bold">73</text>
          </svg>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 46, color: BLACK, margin: 0, lineHeight: 1 }}>73 DAYS</p>
            <p style={headline(20, '#555')}>EXTRA ON MARKET</p>
          </div>
        </div>

        {/* Price cut */}
        <div style={{ opacity: cutOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#888', margin: 0, textDecoration: 'line-through' }}>$550,000</p>
          <p style={{ fontFamily: FONT, fontSize: 40, color: '#EF4444', margin: 0 }}>→ $449,000 PRICE CUT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Career ───────────────────────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const barProgress = interpolate(frame, [25, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarH = 260;
  const loyalH = Math.round(maxBarH * 0.5 * barProgress);
  const switchH = Math.round(maxBarH * barProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 30,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>AT WORK,</p>
          <p style={headline(50, ACCENT)}>IT GETS SNEAKY</p>
        </div>

        {/* Salary bar comparison */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 70 }}>
          {/* Loyal employee */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {/* Person */}
            <svg viewBox="0 0 60 80" width={60} height={80}>
              <circle cx={30} cy={18} r={14} fill={WHITE} />
              <rect x={8} y={36} width={44} height={44} rx={10} fill={WHITE} />
            </svg>
            {/* Bar */}
            <div style={{
              width: 110, height: loyalH,
              background: WHITE, borderRadius: '8px 8px 0 0',
            }} />
            <p style={headline(20, WHITE)}>LOYAL</p>
            <p style={headline(20, WHITE)}>EMPLOYEE</p>
          </div>

          {/* Job switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 60 80" width={60} height={80}>
              <circle cx={30} cy={18} r={14} fill={ACCENT} />
              <rect x={8} y={36} width={44} height={44} rx={10} fill={ACCENT} />
            </svg>
            <div style={{
              width: 110, height: switchH,
              background: ACCENT, borderRadius: '8px 8px 0 0',
            }} />
            <p style={headline(20, ACCENT)}>JOB</p>
            <p style={headline(20, ACCENT)}>SWITCHER</p>
          </div>
        </div>

        {/* Gap label */}
        <div style={{
          opacity: labelOpacity, background: '#1E1E1E',
          borderRadius: 12, padding: '14px 44px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, margin: 0, lineHeight: 1 }}>50%</p>
          <p style={headline(26, WHITE)}>MORE LIFETIME EARNINGS</p>
          <p style={headline(18, '#888')}>BY SWITCHING EVERY 2 YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: The Fix + CTA ────────────────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionPop = spring({ fps, frame, config: { damping: 12, mass: 0.9 } });
  const boxOpacity = interpolate(frame, [25, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkPop = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 10, mass: 0.7 } });
  const bodyOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [95, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 32,
      }}>
        {/* Question mark */}
        <div style={{ transform: `scale(${questionPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 120 160" width={110} height={146}>
            <path
              d="M38,22 C38,2 82,2 82,28 C82,48 62,54 62,78"
              fill="none" stroke={ACCENT} strokeWidth={10} strokeLinecap="round"
            />
            <circle cx={62} cy={100} r={9} fill={ACCENT} />
          </svg>
        </div>

        {/* The question */}
        <div style={{ opacity: boxOpacity, textAlign: 'center', width: '100%' }}>
          <p style={headline(34, BLACK)}>THE ONE QUESTION</p>
          <p style={headline(34, BLACK)}>THAT BEATS IT:</p>
          <div style={{
            background: ACCENT, borderRadius: 14,
            padding: '22px 36px', marginTop: 24, maxWidth: 820, margin: '24px auto 0',
          }}>
            <p style={{
              fontFamily: FONT, fontSize: 33, color: BLACK, margin: 0,
              lineHeight: 1.45, textAlign: 'center',
            }}>
              "Would I buy this at today's price if I didn't already own it?"
            </p>
          </div>
        </div>

        {/* Checkmark */}
        <div style={{ transform: `scale(${checkPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 80 80" width={80} height={80}>
            <circle cx={40} cy={40} r={38} fill="#10B981" />
            <polyline
              points="20,42 35,58 62,25"
              fill="none" stroke={WHITE} strokeWidth={7}
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Body text */}
        <p style={{
          fontFamily: FONT, fontSize: 28, color: BLACK,
          textAlign: 'center', lineHeight: 1.5, margin: 0,
          maxWidth: 780, opacity: bodyOpacity,
        }}>
          If the answer is no — that's your endowment effect talking. Now you can ignore it.
        </p>

        {/* CTA */}
        <div style={{
          opacity: ctaOpacity, background: BLACK,
          borderRadius: 14, padding: '18px 52px', textAlign: 'center',
        }}>
          <p style={headline(32, ACCENT)}>FOLLOW FOR MORE</p>
          <p style={headline(32, ACCENT)}>MONEY PSYCHOLOGY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ───────────────────────────────────────────────────────────────

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
