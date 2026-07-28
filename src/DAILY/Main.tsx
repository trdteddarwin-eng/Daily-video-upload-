import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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

// Scene 1: Trading app looks like a game — 97% stat reveal

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const phoneScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 50 });

  const coin1Y = interpolate(frame, [45, 100], [0, -100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Op = interpolate(frame, [45, 58, 98, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coin2Y = interpolate(frame, [62, 120], [0, -120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [62, 75, 116, 128], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statOpacity = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statY = interpolate(frame, [95, 120], [35, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top label */}
      <div style={{
        position: 'absolute', top: 140, left: 40, right: 40, textAlign: 'center',
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={{ ...headline(56, WHITE), lineHeight: 1.15 }}>LOOKS LIKE</p>
        <p style={{ ...headline(56, ACCENT), lineHeight: 1.15 }}>A GAME</p>
      </div>

      {/* Phone */}
      <div style={{
        position: 'absolute', top: 390, left: '50%',
        transform: `translateX(-50%) scale(${phoneScale})`,
      }}>
        <svg width="260" height="400" viewBox="0 0 260 400">
          {/* Phone body */}
          <rect x="6" y="6" width="248" height="388" rx="28" fill="#1E1E2E" stroke={ACCENT} strokeWidth="4" />
          {/* Screen */}
          <rect x="16" y="24" width="228" height="352" rx="18" fill="#0D0D1A" />
          {/* Camera notch */}
          <rect x="100" y="12" width="60" height="14" rx="7" fill="#111" />
          {/* App header */}
          <rect x="16" y="24" width="228" height="50" rx="0" fill="#16213E" />
          <text x="130" y="56" textAnchor="middle" fill={GREEN} fontFamily="Arial Black, Arial" fontSize="19" fontWeight="bold">+$247.80 ▲</text>
          {/* Chart line */}
          <polyline points="28,220 58,198 88,238 120,158 150,208 180,128 210,170 228,108"
            fill="none" stroke={GREEN} strokeWidth="4" strokeLinejoin="round" />
          {/* Stars */}
          <text x="50" y="308" fill="#FFD700" fontSize="30" textAnchor="middle">★</text>
          <text x="105" y="330" fill="#FFD700" fontSize="22" textAnchor="middle">★</text>
          <text x="165" y="304" fill="#FFD700" fontSize="28" textAnchor="middle">★</text>
          {/* Streak badge */}
          <rect x="68" y="342" width="124" height="28" rx="14" fill={ACCENT} />
          <text x="130" y="361" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, Arial" fontSize="13" fontWeight="bold">7 DAY STREAK</text>
        </svg>

        {/* Floating coin 1 */}
        <div style={{
          position: 'absolute', top: 85, left: 25,
          opacity: coin1Op, transform: `translateY(${coin1Y}px)`,
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#FFD700" />
            <text x="22" y="28" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="18" fontWeight="bold">$</text>
          </svg>
        </div>

        {/* Floating coin 2 */}
        <div style={{
          position: 'absolute', top: 65, left: 175,
          opacity: coin2Op, transform: `translateY(${coin2Y}px)`,
        }}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <circle cx="17" cy="17" r="15" fill="#FFD700" />
            <text x="17" y="22" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="13" fontWeight="bold">$</text>
          </svg>
        </div>
      </div>

      {/* Bottom stat */}
      <div style={{
        position: 'absolute', bottom: 190, left: 40, right: 40, textAlign: 'center',
        opacity: statOpacity, transform: `translateY(${statY}px)`,
      }}>
        <p style={{ ...headline(90, ACCENT), lineHeight: 1 }}>97%</p>
        <p style={{ ...headline(38, WHITE), marginTop: 8 }}>LOSE MONEY</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#999', marginTop: 8, letterSpacing: '0.12em' }}>WITHIN 2 YEARS</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Bar chart 97% lose vs 3% profit
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const loseBarH = interpolate(frame, [20, 100], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const winBarH = interpolate(frame, [70, 140], [0, 11], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const loseLabelOp = interpolate(frame, [102, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const winLabelOp = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statsOp = interpolate(frame, [162, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statsY = interpolate(frame, [162, 188], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(46, BLACK) }}>DAY TRADER</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>REALITY CHECK</p>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <svg width="700" height="380" viewBox="0 0 700 380">
          {/* Axes */}
          <line x1="60" y1="10" x2="60" y2="360" stroke={BLACK} strokeWidth="2" />
          <line x1="60" y1="360" x2="660" y2="360" stroke={BLACK} strokeWidth="2" />
          {/* Grid lines */}
          {[25, 50, 75, 100].map((pct, i) => {
            const y = 360 - (pct / 100) * 340;
            return (
              <React.Fragment key={i}>
                <line x1="60" y1={y} x2="660" y2={y} stroke="#CCC" strokeWidth="1" strokeDasharray="6 4" />
                <text x="50" y={y + 5} textAnchor="end" fill="#666" fontFamily="Arial" fontSize="16">{pct}%</text>
              </React.Fragment>
            );
          })}
          {/* Loser bar (97%) */}
          <rect x="120" y={360 - loseBarH} width="160" height={loseBarH} fill={ACCENT} rx="8" />
          <text x="200" y={360 - loseBarH - 14} textAnchor="middle" fill={ACCENT} fontFamily="Arial Black, Arial" fontSize="34" fontWeight="bold" opacity={loseLabelOp}>97%</text>
          <text x="200" y="378" textAnchor="middle" fill={BLACK} fontFamily="Arial" fontSize="18">Lose Money</text>
          {/* Winner bar (3%) */}
          <rect x="420" y={360 - winBarH} width="160" height={winBarH} fill={GREEN} rx="8" />
          <text x="500" y={360 - winBarH - 14} textAnchor="middle" fill={GREEN} fontFamily="Arial Black, Arial" fontSize="34" fontWeight="bold" opacity={winLabelOp}>3%</text>
          <text x="500" y="378" textAnchor="middle" fill={BLACK} fontFamily="Arial" fontSize="18">Profit</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center',
        opacity: statsOp, transform: `translateY(${statsY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>Active traders underperform</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 8 }}>6.5% BELOW MARKET</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#555', margin: '8px 0 0 0' }}>every single year</p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Trading app earns on every trade — coins fly from trader to building
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coin1X = interpolate(frame, [30, 110], [195, 695], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const coin1Op = interpolate(frame, [30, 44, 106, 118], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coin2X = interpolate(frame, [72, 155], [195, 695], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const coin2Op = interpolate(frame, [72, 86, 150, 163], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const footerOp = interpolate(frame, [132, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const winCoords = [
    {x: 757, y: 112}, {x: 803, y: 112}, {x: 849, y: 112},
    {x: 757, y: 162}, {x: 803, y: 162}, {x: 849, y: 162},
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(48, WHITE) }}>THE APP WINS</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>EVERY TRADE</p>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <svg width="900" height="280" viewBox="0 0 900 280">
          {/* Person (trader) */}
          <circle cx="100" cy="54" r="38" fill="#F5CBA7" stroke="#D4A574" strokeWidth="3" />
          <rect x="62" y="93" width="76" height="88" rx="12" fill="#2C5F8A" />
          <rect x="26" y="98" width="36" height="18" rx="9" fill="#F5CBA7" />
          <rect x="138" y="98" width="36" height="18" rx="9" fill="#F5CBA7" />
          <text x="100" y="208" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, Arial" fontSize="22">YOU</text>
          {/* Phone in hand */}
          <rect x="160" y="108" width="30" height="48" rx="5" fill="#1E1E2E" stroke="#4A90D9" strokeWidth="2" />
          <polyline points="164,122 170,118 176,124 182,116 188,122" fill="none" stroke={GREEN} strokeWidth="2.5" />

          {/* Arrow track */}
          <line x1="195" y1="150" x2="718" y2="150" stroke="#444" strokeWidth="4" strokeDasharray="14 8" />
          <polygon points="718,140 718,160 738,150" fill="#555" />

          {/* Animated coin 1 */}
          <g transform={`translate(${coin1X}, 150)`} opacity={coin1Op}>
            <circle r="27" fill="#FFD700" />
            <text y="7" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="20" fontWeight="bold">$</text>
          </g>

          {/* Animated coin 2 */}
          <g transform={`translate(${coin2X}, 150)`} opacity={coin2Op}>
            <circle r="20" fill="#FFD700" />
            <text y="6" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="14" fontWeight="bold">$</text>
          </g>

          {/* Building (platform) */}
          <polygon points="740,95 820,48 900,95" fill="#2C5F8A" />
          <rect x="740" y="95" width="160" height="165" fill="#1E3A5F" stroke="#4A90D9" strokeWidth="3" />
          {winCoords.map((pos, i) => (
            <rect key={i} x={pos.x} y={pos.y} width="30" height="38" rx="3" fill="#87CEEB" opacity={0.75} />
          ))}
          <rect x="800" y="220" width="40" height="40" rx="4" fill="#8B6914" />
          <text x="820" y="278" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, Arial" fontSize="20">APP</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 210, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>
          Win or lose — <span style={{ color: ACCENT }}>they collect.</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#888', margin: '14px 0 0 0' }}>
          More trades = more fees for them.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Hot hand fallacy — luck vs skill
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const diceScale = spring({ frame, fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 40 });

  const bubbleOp = interpolate(frame, [50, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bubbleScale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 140 }, durationInFrames: 30 });

  const arrowOp = interpolate(frame, [118, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowScale = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 8, stiffness: 210 }, durationInFrames: 30 });

  const bottomOp = interpolate(frame, [152, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomY = interpolate(frame, [152, 178], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const diceDots = [
    {cx: 54, cy: 54}, {cx: 126, cy: 54},
    {cx: 54, cy: 90}, {cx: 126, cy: 90},
    {cx: 54, cy: 126}, {cx: 126, cy: 126},
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(46, BLACK) }}>LUCK OR</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>SKILL?</p>
      </div>

      <div style={{
        position: 'absolute', top: 360, left: 60, right: 60,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      }}>
        {/* Dice */}
        <div style={{ transform: `scale(${diceScale})` }}>
          <svg width="200" height="200" viewBox="0 0 180 180">
            <rect x="10" y="10" width="160" height="160" rx="24" fill={ACCENT} stroke="#C0392B" strokeWidth="4" />
            {diceDots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r="14" fill={BLACK} />
            ))}
          </svg>
        </div>

        {/* Person + thought bubble */}
        <div style={{ position: 'relative' }}>
          <svg width="200" height="260" viewBox="0 0 200 260">
            <circle cx="100" cy="60" r="44" fill="#F5CBA7" stroke="#D4A574" strokeWidth="3" />
            <rect x="62" y="104" width="76" height="90" rx="12" fill="#2C5F8A" />
            <rect x="22" y="110" width="40" height="18" rx="9" fill="#F5CBA7" />
            <rect x="138" y="110" width="40" height="18" rx="9" fill="#F5CBA7" />
          </svg>
          {/* Thought bubble */}
          <div style={{
            position: 'absolute', top: -55, left: 90,
            opacity: bubbleOp,
            transform: `scale(${bubbleScale})`,
            transformOrigin: 'bottom left',
          }}>
            <svg width="210" height="110" viewBox="0 0 210 110">
              <ellipse cx="110" cy="52" rx="98" ry="44" fill={WHITE} stroke="#CCC" strokeWidth="2" />
              <circle cx="30" cy="86" r="11" fill={WHITE} stroke="#CCC" strokeWidth="2" />
              <circle cx="16" cy="100" r="7" fill={WHITE} stroke="#CCC" strokeWidth="2" />
              <text x="110" y="42" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, Arial" fontSize="16" fontWeight="bold">I'M GOOD</text>
              <text x="110" y="62" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, Arial" fontSize="16" fontWeight="bold">AT THIS!</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Downward arrow */}
      <div style={{
        position: 'absolute', top: 660, left: '50%',
        transform: `translateX(-50%) scale(${arrowScale})`,
        opacity: arrowOp,
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="42" fill={ACCENT} />
          <polygon points="45,65 22,32 68,32" fill={BLACK} />
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center',
        opacity: bottomOp, transform: `translateY(${bottomY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>Your brain can't tell luck from skill.</p>
        <p style={{ ...headline(34, ACCENT), marginTop: 12 }}>BET BIGGER. LOSE MORE.</p>
      </div>
    </FadeScene>
  );
};

// Scene 5: Same $10k — day trader vs index fund after 1 year
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const traderBarH = interpolate(frame, [20, 95], [0, 198], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const indexBarH = interpolate(frame, [60, 145], [0, 336], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const traderLabelOp = interpolate(frame, [96, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const indexLabelOp = interpolate(frame, [146, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const gapOp = interpolate(frame, [168, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapScale = interpolate(frame, [168, 192], [0.7, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  const yLabels = [
    {val: 0, label: '$0'},
    {val: 5000, label: '$5k'},
    {val: 10000, label: '$10k'},
    {val: 12000, label: '$12k'},
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(42, WHITE) }}>SAME $10,000</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 8 }}>ONE YEAR LATER</p>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <svg width="760" height="420" viewBox="0 0 760 420">
          <line x1="60" y1="18" x2="60" y2="390" stroke="#555" strokeWidth="2" />
          <line x1="60" y1="390" x2="720" y2="390" stroke="#555" strokeWidth="2" />
          {yLabels.map((item, i) => {
            const y = 390 - (item.val / 12000) * 360;
            return (
              <text key={i} x="50" y={y + 5} textAnchor="end" fill="#AAA" fontFamily="Arial" fontSize="16">{item.label}</text>
            );
          })}
          {/* Baseline at $10k */}
          <line x1="60" y1="90" x2="720" y2="90" stroke="#555" strokeWidth="2" strokeDasharray="10 6" />
          <text x="390" y="82" textAnchor="middle" fill="#666" fontFamily="Arial" fontSize="14">Start: $10,000</text>

          {/* Day Trader bar */}
          <rect x="100" y={390 - traderBarH} width="180" height={traderBarH} fill="#7F1D1D" rx="6" />
          <rect x="100" y={390 - traderBarH} width="180" height={traderBarH} fill={ACCENT} rx="6" opacity={0.6} />
          <text x="190" y={390 - traderBarH - 14} textAnchor="middle" fill={ACCENT} fontFamily="Arial Black, Arial" fontSize="26" fontWeight="bold" opacity={traderLabelOp}>$6,600</text>
          <text x="190" y={390 - traderBarH - 38} textAnchor="middle" fill={ACCENT} fontFamily="Arial" fontSize="18" opacity={traderLabelOp}>-$3,400</text>
          <text x="190" y="410" textAnchor="middle" fill="#AAA" fontFamily="Arial" fontSize="17">Day Trader</text>

          {/* Index fund bar */}
          <rect x="480" y={390 - indexBarH} width="180" height={indexBarH} fill={GREEN} rx="6" />
          <text x="570" y={390 - indexBarH - 14} textAnchor="middle" fill={GREEN} fontFamily="Arial Black, Arial" fontSize="26" fontWeight="bold" opacity={indexLabelOp}>$11,200</text>
          <text x="570" y={390 - indexBarH - 38} textAnchor="middle" fill={GREEN} fontFamily="Arial" fontSize="18" opacity={indexLabelOp}>+$1,200</text>
          <text x="570" y="410" textAnchor="middle" fill="#AAA" fontFamily="Arial" fontSize="17">Index Fund</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 148, left: 55, right: 55, textAlign: 'center',
        opacity: gapOp, transform: `scale(${gapScale})`,
      }}>
        <div style={{ background: '#1a1a1a', borderRadius: 18, padding: '22px 36px', border: `3px solid ${ACCENT}` }}>
          <p style={{ ...headline(40, WHITE), margin: 0 }}>$4,600 GAP</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', margin: '10px 0 0 0' }}>compounded for decades</p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 6: Index fund CTA — piggy bank + set it and forget it
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggyScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 110 }, durationInFrames: 50 });

  const checkOp = interpolate(frame, [68, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 68), fps, config: { damping: 8, stiffness: 220 }, durationInFrames: 30 });

  const badgeOp = interpolate(frame, [112, 136], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 10, stiffness: 160 }, durationInFrames: 35 });

  const ctaOp = interpolate(frame, [152, 176], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [152, 176], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const legXs = [52, 92, 134, 174];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ ...headline(46, BLACK) }}>THE BORING MOVE</p>
        <p style={{ ...headline(46, GREEN), marginTop: 8 }}>WINS EVERY TIME</p>
      </div>

      {/* Piggy bank */}
      <div style={{
        position: 'absolute', top: 340, left: '50%',
        transform: `translateX(-50%) scale(${piggyScale})`,
      }}>
        <svg width="290" height="250" viewBox="0 0 290 250">
          {/* Body */}
          <ellipse cx="135" cy="158" rx="112" ry="85" fill="#FFB6C1" stroke="#E91E8C" strokeWidth="4" />
          {/* Head */}
          <circle cx="228" cy="110" r="54" fill="#FFB6C1" stroke="#E91E8C" strokeWidth="4" />
          {/* Snout */}
          <ellipse cx="260" cy="124" rx="26" ry="18" fill="#FF9EBA" stroke="#E91E8C" strokeWidth="2" />
          <circle cx="253" cy="124" r="6" fill="#E91E8C" />
          <circle cx="267" cy="124" r="6" fill="#E91E8C" />
          {/* Eye */}
          <circle cx="230" cy="96" r="9" fill={WHITE} />
          <circle cx="232" cy="96" r="5" fill="#222" />
          {/* Ear */}
          <ellipse cx="208" cy="70" rx="16" ry="22" fill="#FFB6C1" stroke="#E91E8C" strokeWidth="3" />
          {/* Coin slot */}
          <rect x="112" y="68" width="46" height="10" rx="5" fill="#C0392B" />
          {/* Legs */}
          {legXs.map((x, i) => (
            <rect key={i} x={x} y={226} width={28} height={22} rx={7} fill="#FFB6C1" stroke="#E91E8C" strokeWidth="3" />
          ))}
          {/* Tail */}
          <path d="M 22 155 Q 2 135 12 112 Q 22 90 36 110" fill="none" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" />
          {/* Green checkmark overlay */}
          <circle cx="135" cy="158" r="46" fill={GREEN} opacity={checkOp} transform={`scale(${checkScale}) translate(${(1 - checkScale) * 135}, ${(1 - checkScale) * 158})`} />
          <path d="M 113 158 L 129 178 L 158 136" fill="none" stroke={WHITE} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={checkOp} />
        </svg>
      </div>

      {/* Badge */}
      <div style={{
        position: 'absolute', bottom: 318, left: 60, right: 60, textAlign: 'center',
        opacity: badgeOp, transform: `scale(${badgeScale})`,
      }}>
        <div style={{ background: GREEN, borderRadius: 20, padding: '18px 32px' }}>
          <p style={{ ...headline(34, WHITE), margin: 0 }}>SET IT &amp; FORGET IT</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center',
        opacity: ctaOp, transform: `translateY(${ctaY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>
          Index funds beat <span style={{ color: ACCENT }}>92% of pros</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: '6px 0 0 0' }}>
          over 20 years. No trading needed.
        </p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#555', margin: '18px 0 0 0', letterSpacing: '0.1em' }}>
          FOLLOW FOR MORE MONEY TRUTHS
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
