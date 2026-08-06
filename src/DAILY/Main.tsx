import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0D0D14';
const BG_LIGHT = '#F8F8F8';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GRAY = '#888888';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.1em',
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

// 5-pointed star centered at (0,0), outer radius 40, inner radius 17
const STAR_PATH = 'M 0,-40 L 10,-14 L 38,-12 L 16,5 L 24,32 L 0,17 L -24,32 L -16,5 L -38,-12 L -10,-14 Z';

const StarShape: React.FC<{ cx: number; cy: number; r: number; color: string; opacity?: number }> = ({
  cx, cy, r, color, opacity = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${r / 40})`} opacity={opacity}>
    <path d={STAR_PATH} fill={color} />
  </g>
);

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = spring({ frame, fps, from: 500, to: 0, config: { damping: 14, mass: 1, stiffness: 100 } });
  const cardOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: 'clamp' });

  const starOpacity = (i: number) =>
    interpolate(frame, [20 + i * 14, 34 + i * 14], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const arrowOpacity = interpolate(frame, [118, 152], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowY = interpolate(frame, [118, 168], [40, 0], {
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
          gap: 40,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(54, WHITE)}>LAST YEAR'S</p>
          <p style={{ ...headline(54, ACCENT), marginTop: 6 }}>#1 FUND</p>
        </div>

        {/* Fund card */}
        <div
          style={{
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
            background: '#1A1A24',
            border: `4px solid ${ACCENT}`,
            borderRadius: 24,
            padding: '40px 60px',
            textAlign: 'center',
            width: 680,
          }}
        >
          <p style={{ ...headline(26, WHITE), marginBottom: 6 }}>TOP GROWTH FUND 2024</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              color: GRAY,
              letterSpacing: '0.08em',
              marginBottom: 28,
              marginTop: 0,
            }}
          >
            5-YEAR RETURN: +143%
          </p>
          <svg width={322} height={74} viewBox="0 0 322 74">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarShape key={i} cx={33 + i * 64} cy={37} r={29} color="#FBBF24" opacity={starOpacity(i)} />
            ))}
          </svg>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: '#FBBF24',
              letterSpacing: '0.1em',
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            ★★★★★ FIVE STARS
          </p>
        </div>

        {/* Upward arrow + question */}
        <div
          style={{
            opacity: arrowOpacity,
            transform: `translateY(${arrowY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <svg width={100} height={80} viewBox="0 0 100 80">
            <polygon points="50,4 88,44 68,44 68,76 32,76 32,44 12,44" fill={ACCENT} />
          </svg>
          <p style={{ ...headline(28, WHITE), marginTop: 12 }}>HOW COULD YOU GO WRONG?</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });

  const count = Math.floor(
    interpolate(frame, [25, 140], [0, 86], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  // Stars 2-5 fade from gold (#FBBF24) to grey
  const starColor = (i: number): string => {
    if (i === 0) return '#FBBF24';
    const fadeStart = 50 + (i - 1) * 22;
    const t = interpolate(frame, [fadeStart, fadeStart + 30], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const r = Math.round(251 - t * 151);
    const g = Math.round(191 - t * 101);
    const b = Math.round(36 + t * 64);
    return `rgb(${r},${g},${b})`;
  };

  const subtitleOpacity = interpolate(frame, [148, 178], [0, 1], {
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
          gap: 28,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>THE TRUTH ABOUT</p>
          <p style={{ ...headline(46, ACCENT), marginTop: 6 }}>STAR RATINGS</p>
        </div>

        {/* Stars fading to grey */}
        <svg width={354} height={78} viewBox="0 0 354 78">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarShape key={i} cx={35 + i * 71} cy={39} r={31} color={starColor(i)} />
          ))}
        </svg>

        {/* Large percentage counter */}
        <p
          style={{
            fontFamily: FONT,
            fontSize: 168,
            color: ACCENT,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {count}%
        </p>

        <div style={{ opacity: subtitleOpacity, textAlign: 'center' }}>
          <p style={headline(30, BLACK)}>OF TOP-RATED FUNDS DROP OUT</p>
          <p style={{ ...headline(30, BLACK), marginTop: 6 }}>WITHIN 3 YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftOpacity = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftX = interpolate(frame, [10, 60], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightOpacity = interpolate(frame, [55, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightX = interpolate(frame, [55, 110], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [148, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 60px',
          gap: 28,
        }}
      >
        <p style={headline(50, WHITE)}>THE TIMING TRAP</p>

        <div style={{ display: 'flex', width: '100%', gap: 24 }}>
          {/* LEFT: Smart money exits */}
          <div
            style={{
              flex: 1,
              background: '#1A1A1A',
              borderRadius: 20,
              padding: '28px 24px',
              opacity: leftOpacity,
              transform: `translateX(${leftX}px)`,
            }}
          >
            <p style={{ ...headline(22, GRAY), marginBottom: 20 }}>SMART MONEY</p>
            <svg width="100%" height={200} viewBox="0 0 280 200">
              {/* 3 stick figures walking left */}
              {[0, 1, 2].map((i) => {
                const gx = 240 - i * 80;
                const gy = 80;
                return (
                  <g key={i}>
                    <circle cx={gx} cy={gy - 32} r={14} fill={GRAY} />
                    <line x1={gx} y1={gy - 18} x2={gx} y2={gy + 28} stroke={GRAY} strokeWidth={5} strokeLinecap="round" />
                    <line x1={gx - 18} y1={gy - 6} x2={gx + 18} y2={gy - 6} stroke={GRAY} strokeWidth={5} strokeLinecap="round" />
                    <line x1={gx} y1={gy + 28} x2={gx - 16} y2={gy + 58} stroke={GRAY} strokeWidth={5} strokeLinecap="round" />
                    <line x1={gx} y1={gy + 28} x2={gx + 16} y2={gy + 58} stroke={GRAY} strokeWidth={5} strokeLinecap="round" />
                  </g>
                );
              })}
              {/* Left-pointing exit arrow */}
              <polygon points="8,160 52,140 52,152 270,152 270,168 52,168 52,180" fill={GRAY} opacity={0.7} />
            </svg>
            <p style={{ ...headline(18, GRAY), marginTop: 8 }}>&larr; CASHING OUT</p>
          </div>

          {/* RIGHT: You enter */}
          <div
            style={{
              flex: 1,
              background: '#1A0A0A',
              border: `3px solid ${ACCENT}`,
              borderRadius: 20,
              padding: '28px 24px',
              opacity: rightOpacity,
              transform: `translateX(${rightX}px)`,
            }}
          >
            <p style={{ ...headline(30, ACCENT), marginBottom: 20 }}>YOU</p>
            <svg width="100%" height={200} viewBox="0 0 280 200">
              {/* 1 stick figure (you) */}
              <circle cx={80} cy={58} r={22} fill={ACCENT} />
              <line x1={80} y1={80} x2={80} y2={134} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
              <line x1={56} y1={96} x2={104} y2={96} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
              <line x1={80} y1={134} x2={62} y2={168} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
              <line x1={80} y1={134} x2={98} y2={168} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
              {/* Right-pointing enter arrow */}
              <polygon points="272,160 228,140 228,152 18,152 18,168 228,168 228,180" fill={ACCENT} opacity={0.8} />
            </svg>
            <p style={{ ...headline(18, ACCENT), marginTop: 8 }}>GOING IN &rarr;</p>
          </div>
        </div>

        <div style={{ opacity: bottomOpacity }}>
          <p style={headline(36, ACCENT)}>YOU'RE BUYING THEIR EXIT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const barP = interpolate(frame, [20, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const MAX_H = 500;
  const chaserFrac = 476 / 761;
  const BAR_W = 180;
  const chaserH = Math.max(0, barP * MAX_H * chaserFrac);
  const indexH = Math.max(0, barP * MAX_H);
  const BASE_Y = 560;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 20,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>THE 30-YEAR GAP</p>
          <p style={{ ...headline(26, GRAY), marginTop: 8 }}>$100,000 INVESTED</p>
        </div>

        <svg width={780} height={620} viewBox="0 0 780 620">
          {/* Baseline */}
          <line x1={40} y1={BASE_Y} x2={740} y2={BASE_Y} stroke="#CCCCCC" strokeWidth={3} />

          {/* Chaser bar */}
          <rect x={120} y={BASE_Y - chaserH} width={BAR_W} height={chaserH} fill="#AAAAAA" rx={8} />
          <text
            x={120 + BAR_W / 2} y={BASE_Y + 36}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22} fill={BLACK}
          >
            CHASER
          </text>
          <text
            x={120 + BAR_W / 2} y={BASE_Y - chaserH - 14}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={26} fill="#666666"
            opacity={barP > 0.12 ? 1 : 0}
          >
            ${Math.round(476 * barP)}K
          </text>

          {/* Index bar */}
          <rect x={480} y={BASE_Y - indexH} width={BAR_W} height={indexH} fill={ACCENT} rx={8} />
          <text
            x={480 + BAR_W / 2} y={BASE_Y + 36}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22} fill={BLACK}
          >
            INDEX
          </text>
          <text
            x={480 + BAR_W / 2} y={BASE_Y - indexH - 14}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={26} fill={ACCENT}
            opacity={barP > 0.12 ? 1 : 0}
          >
            ${Math.round(761 * barP)}K
          </text>

          {/* Gap indicator */}
          <g opacity={gapOp}>
            <line x1={300} y1={BASE_Y - chaserH} x2={480} y2={BASE_Y - chaserH}
              stroke="#444" strokeWidth={2} strokeDasharray="8,5" />
            <line x1={300} y1={BASE_Y - indexH} x2={480} y2={BASE_Y - indexH}
              stroke="#444" strokeWidth={2} strokeDasharray="8,5" />
            <line x1={390} y1={BASE_Y - chaserH - 10} x2={390} y2={BASE_Y - indexH + 10}
              stroke={ACCENT} strokeWidth={5} />
            <polygon
              points={`390,${BASE_Y - indexH} 380,${BASE_Y - indexH + 22} 400,${BASE_Y - indexH + 22}`}
              fill={ACCENT}
            />
            <polygon
              points={`390,${BASE_Y - chaserH} 380,${BASE_Y - chaserH - 22} 400,${BASE_Y - chaserH - 22}`}
              fill={ACCENT}
            />
            <text
              x={412} y={(BASE_Y - chaserH + BASE_Y - indexH) / 2 + 10}
              textAnchor="start"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={28} fill={ACCENT}
            >
              $285K
            </text>
          </g>
        </svg>

        <p style={{ ...headline(28, BLACK), marginTop: 0 }}>
          1.7% DRAG = <span style={{ color: ACCENT }}>$285,000 GONE</span>
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [112, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [158, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stars scale in around the brain (interpolate, not spring, safe in any context)
  const s0 = interpolate(frame, [15, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1 = interpolate(frame, [30, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2 = interpolate(frame, [45, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3 = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s4 = interpolate(frame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const starScales = [s0, s1, s2, s3, s4];

  const starPositions = [
    { x: 30, y: 30 },
    { x: 275, y: 50 },
    { x: 315, y: 175 },
    { x: 10, y: 180 },
    { x: 158, y: 6 },
  ];

  const brainS = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 12, stiffness: 60 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 32,
        }}
      >
        <p style={headline(46, WHITE)}>YOUR BRAIN'S FATAL FLAW</p>

        {/* Brain SVG with orbiting stars */}
        <svg
          width={340}
          height={260}
          viewBox="0 0 340 260"
          style={{ opacity: brainOpacity, transform: `scale(${brainS})` }}
        >
          {starPositions.map((sp, i) => (
            <g key={i} transform={`translate(${sp.x}, ${sp.y}) scale(${starScales[i]})`}>
              <path d={STAR_PATH} fill="#FBBF24" transform="scale(0.35)" />
            </g>
          ))}

          {/* Left hemisphere */}
          <ellipse cx="148" cy="118" rx="118" ry="92" fill="none" stroke={ACCENT} strokeWidth={4} />
          {/* Right hemisphere */}
          <ellipse cx="192" cy="118" rx="118" ry="92" fill="none" stroke={ACCENT} strokeWidth={4} />
          {/* Brain stem */}
          <rect x="148" y="206" width="44" height="32" rx={10} fill="none" stroke={ACCENT} strokeWidth={4} />
          {/* Left folds */}
          <path d="M 74,103 Q 100,80 118,106" fill="none" stroke={ACCENT} strokeWidth={3} />
          <path d="M 66,133 Q 94,110 114,136" fill="none" stroke={ACCENT} strokeWidth={3} />
          {/* Right folds */}
          <path d="M 222,103 Q 246,80 264,106" fill="none" stroke={ACCENT} strokeWidth={3} />
          <path d="M 226,133 Q 248,110 266,136" fill="none" stroke={ACCENT} strokeWidth={3} />
        </svg>

        {/* PAST ≠ FUTURE */}
        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 82,
              color: ACCENT,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '0.04em',
            }}
          >
            PAST ≠ FUTURE
          </p>
        </div>

        <div style={{ opacity: subOpacity, textAlign: 'center' }}>
          <p style={headline(28, WHITE)}>YOUR BRAIN SEES PATTERNS.</p>
          <p style={{ ...headline(28, GRAY), marginTop: 8 }}>MARKETS DON'T CARE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pigS = spring({ frame: Math.max(0, frame - 80), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const ctaS = spring({ frame: Math.max(0, frame - 152), fps, from: 0, to: 1, config: { damping: 11, stiffness: 100 } });

  const lineLen = 740;
  const lineDash = interpolate(frame, [10, 150], [lineLen, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dotOpacity = interpolate(frame, [148, 168], [0, 1], {
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
          padding: '50px 80px',
          gap: 22,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>THE BORING CHOICE</p>
          <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>IS THE RICH CHOICE</p>
        </div>

        {/* Line chart */}
        <svg width={780} height={320} viewBox="0 0 780 320">
          {[1, 2, 3].map((i) => (
            <line key={i} x1={40} y1={i * 76} x2={740} y2={i * 76} stroke="#DDDDDD" strokeWidth={1} />
          ))}
          <line x1={40} y1={290} x2={740} y2={290} stroke="#CCCCCC" strokeWidth={2} />
          <line x1={40} y1={20} x2={40} y2={290} stroke="#CCCCCC" strokeWidth={2} />
          {/* Steady upward polyline */}
          <polyline
            points="50,278 120,260 190,238 260,246 330,220 400,192 470,166 540,138 610,106 680,76 740,52"
            fill="none"
            stroke={ACCENT}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lineLen}
            strokeDashoffset={lineDash}
          />
          <circle cx={740} cy={52} r={12} fill={ACCENT} opacity={dotOpacity} />
          <text
            x={752} y={47}
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22} fill={ACCENT}
            opacity={dotOpacity}
          >
            $761K
          </text>
          <text x={50} y={308} fontFamily="Arial" fontSize={16} fill={GRAY}>$0</text>
          <text x={390} y={316} textAnchor="middle" fontFamily="Arial" fontSize={16} fill={GRAY}>30 YEARS</text>
        </svg>

        {/* Piggy bank + BORING = RICH */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 44, transform: `scale(${pigS})` }}>
          <svg width={220} height={200} viewBox="0 0 220 200">
            {/* Body */}
            <ellipse cx="100" cy="126" rx="76" ry="55" fill="none" stroke={ACCENT} strokeWidth={5} />
            {/* Head */}
            <circle cx="164" cy="114" r="36" fill="none" stroke={ACCENT} strokeWidth={5} />
            {/* Ear */}
            <ellipse cx="153" cy="82" rx="11" ry="15" fill={ACCENT} />
            {/* Snout */}
            <ellipse cx="188" cy="122" rx="15" ry="11" fill="none" stroke={ACCENT} strokeWidth={4} />
            <circle cx="183" cy="122" r={3} fill={ACCENT} />
            <circle cx="193" cy="122" r={3} fill={ACCENT} />
            {/* Eye */}
            <circle cx="172" cy="103" r={5} fill={ACCENT} />
            {/* Coin slot */}
            <rect x="80" y="72" width="38" height={9} rx={4} fill={ACCENT} />
            {/* Legs */}
            <rect x="46" y="173" width="17" height="22" rx={4} fill="none" stroke={ACCENT} strokeWidth={4} />
            <rect x="74" y="173" width="17" height="22" rx={4} fill="none" stroke={ACCENT} strokeWidth={4} />
            <rect x="108" y="173" width="17" height="22" rx={4} fill="none" stroke={ACCENT} strokeWidth={4} />
            <rect x="136" y="173" width="17" height="22" rx={4} fill="none" stroke={ACCENT} strokeWidth={4} />
            {/* Tail curl */}
            <path d="M 26,122 Q 6,102 24,78 Q 42,54 28,40" fill="none" stroke={ACCENT} strokeWidth={4} />
          </svg>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: FONT, fontSize: 64, color: ACCENT, margin: 0, lineHeight: 1.05 }}>BORING</p>
            <p style={{ fontFamily: FONT, fontSize: 64, color: BLACK, margin: 0, lineHeight: 1.05 }}>=</p>
            <p style={{ fontFamily: FONT, fontSize: 64, color: BLACK, margin: 0, lineHeight: 1.05 }}>RICH</p>
          </div>
        </div>

        <div style={{ transform: `scale(${ctaS})` }}>
          <div
            style={{
              background: ACCENT,
              borderRadius: 50,
              paddingTop: 18,
              paddingBottom: 18,
              paddingLeft: 48,
              paddingRight: 48,
            }}
          >
            <p style={headline(30, WHITE)}>FOLLOW FOR MORE MONEY TRUTHS</p>
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
