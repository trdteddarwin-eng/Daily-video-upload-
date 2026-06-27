import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  padding: 0,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1: Hook — smartphone with price tag and dollar signs flying up
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });
  const titleOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const DOLLAR_CONFIGS = [
    { dx: -80, delay: 55 },
    { dx: -30, delay: 65 },
    { dx: 20,  delay: 60 },
    { dx: 70,  delay: 70 },
    { dx: -55, delay: 75 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 160, width: '100%', opacity: titleOp }}>
        <p style={headline(56, WHITE)}>YOUR PHONE</p>
        <p style={headline(56, ACCENT)}>UPGRADE HABIT</p>
      </div>

      {/* Phone SVG */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${phoneScale})`,
      }}>
        <svg width="220" height="400" viewBox="0 0 220 400">
          {/* Body */}
          <rect x="4" y="4" width="212" height="392" rx="28" fill="#252525" stroke={ACCENT} strokeWidth="4" />
          {/* Screen */}
          <rect x="17" y="40" width="186" height="310" rx="10" fill="#0d0d0d" />
          {/* Camera area */}
          <rect x="76" y="16" width="68" height="16" rx="8" fill="#1a1a1a" />
          <circle cx="128" cy="24" r="5" fill={ACCENT} opacity={0.7} />
          {/* Home indicator */}
          <rect x="80" y="374" width="60" height="6" rx="3" fill={ACCENT} />
          {/* Price tag on screen */}
          <rect x="40" y="100" width="140" height="80" rx="12" fill={ACCENT} opacity={0.15} />
          <rect x="40" y="100" width="140" height="80" rx="12" fill="none" stroke={ACCENT} strokeWidth="2" />
          <text x="110" y="152" textAnchor="middle" fontFamily="Arial Black, Arial" fontSize="34" fill={ACCENT} fontWeight="900" opacity={tagOp}>$1,000</text>
          {/* Screen subtitle */}
          <text x="110" y="245" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fill="#666" opacity={tagOp}>avg upgrade cost</text>
        </svg>
      </div>

      {/* Dollar signs floating upward */}
      {DOLLAR_CONFIGS.map(({ dx, delay }, i) => {
        const prog = interpolate(frame, [delay, delay + 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const yShift = interpolate(prog, [0, 1], [0, -340]);
        const op = interpolate(prog, [0, 0.12, 0.7, 1], [0, 1, 1, 0]);
        return (
          <div key={i} style={{
            position: 'absolute',
            top: '42%',
            left: `calc(50% + ${dx}px)`,
            transform: `translateY(${yShift}px)`,
            opacity: op,
            fontFamily: FONT,
            fontSize: 54,
            color: ACCENT,
            fontWeight: 900,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>$</div>
        );
      })}

      {/* Bottom stat */}
      <div style={{ position: 'absolute', bottom: 200, width: '100%', opacity: bottomOp }}>
        <p style={headline(44, '#777')}>UPGRADED EVERY</p>
        <p style={headline(100, ACCENT)}>22 MONTHS</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: 75% stat — most phones aren't even broken
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barFill = interpolate(frame, [18, 100], [0, 75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumOp = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phone icon spring
  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 16, stiffness: 90 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, width: '100%', opacity: titleOp }}>
        <p style={headline(54, BLACK)}>PHONES AREN'T</p>
        <p style={headline(54, BLACK)}>EVEN BROKEN</p>
      </div>

      {/* Phone icon */}
      <div style={{
        position: 'absolute',
        top: 430,
        left: '50%',
        transform: `translateX(-50%) scale(${phoneScale})`,
      }}>
        <svg width="100" height="160" viewBox="0 0 100 160">
          <rect x="3" y="3" width="94" height="154" rx="14" fill="#333" stroke={ACCENT} strokeWidth="3" />
          <rect x="11" y="20" width="78" height="112" rx="7" fill="#111" />
          <circle cx="50" cy="11" r="5" fill={ACCENT} opacity={0.6} />
          <rect x="34" y="146" width="32" height="5" rx="3" fill={ACCENT} />
          {/* Battery bars on screen (full = working) */}
          <rect x="22" y="55" width="12" height="40" rx="3" fill={ACCENT} />
          <rect x="40" y="45" width="12" height="50" rx="3" fill={ACCENT} />
          <rect x="58" y="35" width="12" height="60" rx="3" fill={ACCENT} />
          <rect x="76" y="30" width="12" height="65" rx="3" fill={ACCENT} />
          {/* Trash X overlay */}
          <line x1="18" y1="18" x2="82" y2="130" stroke={RED} strokeWidth="6" strokeLinecap="round" />
          <line x1="82" y1="18" x2="18" y2="130" stroke={RED} strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 660, left: 80, right: 80 }}>
        <div style={{ height: 32, background: '#ddd', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{
            width: `${barFill}%`,
            height: '100%',
            background: ACCENT,
            borderRadius: 16,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontFamily: FONT, fontSize: 22, color: '#aaa' }}>0%</span>
          <span style={{ fontFamily: FONT, fontSize: 22, color: ACCENT }}>75%</span>
          <span style={{ fontFamily: FONT, fontSize: 22, color: '#aaa' }}>100%</span>
        </div>
      </div>

      {/* Big 75% */}
      <div style={{ position: 'absolute', top: 760, width: '100%', opacity: bigNumOp }}>
        <p style={{ fontFamily: FONT, fontSize: 220, color: ACCENT, margin: 0, textAlign: 'center' as const, letterSpacing: '-0.04em' }}>75%</p>
      </div>

      <div style={{ position: 'absolute', bottom: 180, width: '100%', opacity: subOp }}>
        <p style={headline(38, BLACK)}>UPGRADE BEFORE IT BREAKS</p>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 30, color: '#777', textAlign: 'center' as const, margin: '16px 60px 0' }}>
          $1,000 for features you'll stop noticing in a week
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 3: The math — $500/yr bar chart
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [150, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_DATA = [
    { label: 'YR 5',  value: '$3K',  h: 68 },
    { label: 'YR 10', value: '$8K',  h: 116 },
    { label: 'YR 20', value: '$32K', h: 196 },
    { label: 'YR 30', value: '$85K', h: 280 },
    { label: 'YR 40', value: '$221K', h: 360 },
  ];

  const BAR_W = 130;
  const BAR_GAP = 40;
  const CHART_Y = 380;
  const START_X = 55;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', opacity: titleOp }}>
        <p style={headline(46, '#777')}>UPGRADE EVERY 2 YRS =</p>
        <p style={headline(110, ACCENT)}>$500/YR</p>
        <p style={headline(42, WHITE)}>LEAVING YOUR POCKET</p>
      </div>

      {/* Bar chart SVG */}
      <svg
        style={{ position: 'absolute', top: 600, left: 30 }}
        width="1020"
        height="460"
        viewBox="0 0 1020 460"
      >
        {/* Axes */}
        <line x1="50" y1="10" x2="50" y2="410" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="410" x2="990" y2="410" stroke="#333" strokeWidth="2" />

        {BAR_DATA.map(({ label, value, h }, i) => {
          const animH = interpolate(frame, [22 + i * 20, 80 + i * 20], [0, h], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const labelOp = interpolate(frame, [75 + i * 20, 100 + i * 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const x = START_X + i * (BAR_W + BAR_GAP);
          return (
            <g key={i}>
              <rect x={x} y={410 - animH} width={BAR_W} height={animH} fill={ACCENT} rx={6} opacity={0.92} />
              <text x={x + BAR_W / 2} y={430} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fill="#666">{label}</text>
              <text x={x + BAR_W / 2} y={410 - animH - 12} textAnchor="middle" fontFamily="Arial Black, Arial" fontSize="22" fill={WHITE} opacity={labelOp}>{value}</text>
            </g>
          );
        })}
      </svg>

      <div style={{ position: 'absolute', bottom: 150, width: '100%', opacity: subOp }}>
        <p style={headline(40, '#777')}>IF INVESTED INSTEAD...</p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Counter — $221,000 animating up
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const count = Math.floor(interpolate(frame, [18, dur - 35], [0, 221000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  const counterScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 70 } });
  const subOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOp = interpolate(frame, [160, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const formatMoney = (n: number) => '$' + n.toLocaleString('en-US');

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, width: '100%', opacity: titleOp }}>
        <p style={headline(46, BLACK)}>INVEST $500/YR AT 10%</p>
        <p style={headline(46, BLACK)}>FOR 40 YEARS AND YOU GET...</p>
      </div>

      {/* Counter */}
      <div style={{
        position: 'absolute',
        top: '44%',
        width: '100%',
        transform: `translateY(-50%) scale(${counterScale})`,
        textAlign: 'center' as const,
      }}>
        <p style={{
          fontFamily: FONT,
          fontSize: 112,
          color: ACCENT,
          margin: 0,
          textAlign: 'center' as const,
          letterSpacing: '-0.02em',
        }}>{formatMoney(count)}</p>
      </div>

      <div style={{ position: 'absolute', bottom: 380, width: '100%', opacity: subOp }}>
        <p style={headline(34, '#999')}>10% MARKET RETURN  •  40 YEARS</p>
      </div>

      <div style={{ position: 'absolute', bottom: 200, width: '100%', opacity: punchOp }}>
        <p style={headline(48, BLACK)}>THAT'S NOT A TYPO.</p>
        <p style={headline(48, ACCENT)}>THAT'S YOUR PHONE BILL.</p>
      </div>
    </FadeScene>
  );
};

// Scene 5: The fix — two comparison cards
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Y = interpolate(frame, [10, 50], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Op = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Y = interpolate(frame, [60, 100], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Op = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOp = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardBase: React.CSSProperties = {
    position: 'absolute' as const,
    left: 60,
    right: 60,
    borderRadius: 28,
    padding: '44px 52px',
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', opacity: titleOp }}>
        <p style={headline(60, WHITE)}>THE SIMPLE FIX</p>
      </div>

      {/* Card 1: 2-year upgrade */}
      <div style={{
        ...cardBase,
        top: 370,
        background: '#1e1212',
        border: `3px solid ${RED}`,
        opacity: card1Op,
        transform: `translateY(${card1Y}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: RED, margin: '0 0 14px 0' }}>UPGRADE EVERY 2 YEARS</p>
        <p style={{ fontFamily: FONT, fontSize: 64, color: WHITE, margin: 0 }}>$221,000 LOST</p>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 26, color: '#777', margin: '14px 0 0 0' }}>in compound growth over 40 years</p>
      </div>

      {/* Card 2: 4-year upgrade */}
      <div style={{
        ...cardBase,
        top: 830,
        background: '#1a1e12',
        border: `3px solid ${ACCENT}`,
        opacity: card2Op,
        transform: `translateY(${card2Y}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: '0 0 14px 0' }}>UPGRADE EVERY 4 YEARS</p>
        <p style={{ fontFamily: FONT, fontSize: 64, color: WHITE, margin: 0 }}>SAVE $110K+</p>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 26, color: '#777', margin: '14px 0 0 0' }}>by investing the difference</p>
      </div>

      <div style={{ position: 'absolute', bottom: 190, width: '100%', opacity: punchOp }}>
        <p style={headline(38, '#666')}>MOST PEOPLE CAN'T EVEN</p>
        <p style={headline(38, ACCENT)}>TELL THE DIFFERENCE</p>
      </div>
    </FadeScene>
  );
};

// Scene 6: CTA — piggy bank + share prompt
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 60 } });
  const amountOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [100, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 75 } });
  const followOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}>
        {/* Top label */}
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 8 }}>
          <p style={headline(42, BLACK)}>YOUR NEXT UPGRADE IS WORTH</p>
        </div>

        {/* Dollar amount */}
        <div style={{ opacity: amountOp, marginBottom: 28 }}>
          <p style={{ fontFamily: FONT, fontSize: 110, color: ACCENT, margin: 0, textAlign: 'center' as const, letterSpacing: '-0.02em' }}>$221,000</p>
        </div>

        {/* Piggy bank SVG */}
        <svg
          width={180}
          height={148}
          viewBox="0 0 136 112"
          style={{ transform: `scale(${piggyScale})`, marginBottom: 28 }}
        >
          {/* Body */}
          <ellipse cx="58" cy="74" rx="42" ry="34" fill={ACCENT} opacity={0.9} />
          {/* Head */}
          <circle cx="100" cy="60" r="21" fill={ACCENT} opacity={0.9} />
          {/* Ear */}
          <ellipse cx="90" cy="44" rx="7" ry="9" fill={ACCENT} />
          <ellipse cx="90" cy="44" rx="4" ry="6" fill="#F3D090" />
          {/* Eye */}
          <circle cx="104" cy="56" r="4" fill="#333" />
          <circle cx="105" cy="55" r="1.5" fill={WHITE} />
          {/* Snout */}
          <ellipse cx="113" cy="66" rx="10" ry="7" fill="#F3D090" />
          <circle cx="108" cy="67" r="2" fill="#D4905A" />
          <circle cx="117" cy="67" r="2" fill="#D4905A" />
          {/* Legs */}
          <rect x="24" y="98" width="14" height="13" rx="4" fill={ACCENT} />
          <rect x="43" y="98" width="14" height="13" rx="4" fill={ACCENT} />
          <rect x="62" y="98" width="14" height="13" rx="4" fill={ACCENT} />
          <rect x="81" y="98" width="14" height="13" rx="4" fill={ACCENT} />
          {/* Coin slot */}
          <rect x="46" y="42" width="24" height="4" rx="2" fill="#333" opacity={0.38} />
        </svg>

        {/* Share CTA */}
        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, textAlign: 'center' as const, marginBottom: 20 }}>
          <p style={headline(52, ACCENT)}>TAP SHARE</p>
          <p style={headline(36, BLACK)}>SOMEONE NEEDS THIS MATH</p>
        </div>

        {/* Follow line */}
        <div style={{ opacity: followOp, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 28, color: '#888', margin: 0 }}>
            Follow for more money moves they never taught you
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
