import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

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
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 2: 56% have under $1K — silhouettes + empty piggy bank ───────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerY = interpolate(frame, [0, 25], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barWidth = interpolate(frame, [20, 80], [0, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const countNum = Math.round(
    interpolate(frame, [20, 80], [0, 56], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const piggyScale = spring({ frame: Math.max(0, frame - 100), fps: 30, config: { damping: 12, stiffness: 70 } });

  const labelOpacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const silhouetteFill = (i: number) => (i < 6 ? '#555' : WHITE);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 50,
          padding: '80px 60px',
        }}
      >
        {/* Header */}
        <div style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)`, textAlign: 'center' }}>
          <p style={headline(48, BLACK)}>MOST AMERICANS</p>
          <p style={headline(48, ACCENT)}>ARE NEARLY BROKE</p>
        </div>

        {/* Silhouette row */}
        <svg width="560" height="100" viewBox="0 0 560 100">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} transform={`translate(${i * 56 + 28}, 0)`}>
              {/* Head */}
              <circle cx="0" cy="18" r="14" fill={silhouetteFill(i)} />
              {/* Body */}
              <path d="M-16 40 Q0 30 16 40 L20 90 L-20 90 Z" fill={silhouetteFill(i)} />
            </g>
          ))}
        </svg>

        {/* Bar + counter */}
        <div style={{ width: 560, position: 'relative' }}>
          <div style={{ background: '#DDD', borderRadius: 8, height: 28, width: 560 }}>
            <div
              style={{
                background: ACCENT,
                borderRadius: 8,
                height: 28,
                width: barWidth,
              }}
            />
          </div>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 96,
              color: ACCENT,
              textAlign: 'center',
              margin: '12px 0 0',
              letterSpacing: '0.05em',
            }}
          >
            {countNum}%
          </p>
        </div>

        {/* Piggy bank label */}
        <div style={{ opacity: labelOpacity, transform: `scale(${piggyScale})`, textAlign: 'center' }}>
          <svg width="110" height="100" viewBox="0 0 110 100">
            {/* Body */}
            <ellipse cx="55" cy="58" rx="38" ry="30" fill="#AAA" />
            {/* Head */}
            <circle cx="86" cy="48" r="18" fill="#AAA" />
            {/* Snout */}
            <ellipse cx="96" cy="52" rx="9" ry="7" fill="#999" />
            <circle cx="93" cy="51" r="2" fill="#777" />
            <circle cx="99" cy="51" r="2" fill="#777" />
            {/* Ear */}
            <ellipse cx="80" cy="34" rx="7" ry="5" fill="#999" transform="rotate(-20 80 34)" />
            {/* Coin slot — empty */}
            <rect x="45" y="28" width="18" height="4" rx="2" fill="#888" />
            {/* Legs */}
            <rect x="25" y="82" width="12" height="14" rx="4" fill="#999" />
            <rect x="42" y="82" width="12" height="14" rx="4" fill="#999" />
            <rect x="60" y="82" width="12" height="14" rx="4" fill="#999" />
            <rect x="77" y="82" width="12" height="14" rx="4" fill="#999" />
            {/* Tail */}
            <path d="M17 55 Q8 50 12 44 Q16 38 14 32" stroke="#999" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
          <p style={{ ...headline(26, BLACK), marginTop: 8 }}>UNDER $1,000 SAVED</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#777', textAlign: 'center', letterSpacing: '0.08em', margin: '6px 0 0' }}>
            YOUR BRAIN TREATS FUTURE-YOU LIKE A STRANGER
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: $100 today vs $257 in a year — scale tips left ────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftBoxScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 90 } });
  const rightBoxScale = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 14, stiffness: 90 } });

  const scaleAngle = interpolate(frame, [40, 90], [0, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOpacity = interpolate(frame, [100, 130], [0, 1], {
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
          gap: 44,
          padding: '80px 60px',
        }}
      >
        <p style={headline(46, WHITE)}>YOUR BRAIN'S PRICE</p>
        <p style={headline(46, ACCENT)}>FOR WAITING</p>

        {/* Two option boxes */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', width: '100%' }}>
          <div
            style={{
              transform: `scale(${leftBoxScale})`,
              flex: 1,
              border: `4px solid ${ACCENT}`,
              borderRadius: 20,
              padding: '32px 20px',
              textAlign: 'center',
              background: 'rgba(59,130,246,0.15)',
            }}
          >
            <p style={headline(52, ACCENT)}>$100</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: '10px 0 0', letterSpacing: '0.1em' }}>
              TODAY
            </p>
          </div>

          <p style={{ fontFamily: FONT, fontSize: 40, color: '#555', margin: 0 }}>VS</p>

          <div
            style={{
              transform: `scale(${rightBoxScale})`,
              flex: 1,
              border: `4px solid #444`,
              borderRadius: 20,
              padding: '32px 20px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <p style={headline(52, '#777')}>$257</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: '#666', margin: '10px 0 0', letterSpacing: '0.1em' }}>
              IN 1 YEAR
            </p>
          </div>
        </div>

        {/* Scale SVG tipping left */}
        <svg width="340" height="130" viewBox="0 0 340 130" style={{ transform: `rotate(${scaleAngle}deg)` }}>
          {/* Pole */}
          <line x1="170" y1="10" x2="170" y2="90" stroke="#666" strokeWidth="6" strokeLinecap="round" />
          {/* Beam */}
          <line x1="40" y1="60" x2="300" y2="60" stroke="#888" strokeWidth="6" strokeLinecap="round" />
          {/* Left pan */}
          <line x1="70" y1="60" x2="70" y2="100" stroke="#888" strokeWidth="3" />
          <ellipse cx="70" cy="106" rx="44" ry="10" fill={ACCENT} fillOpacity="0.7" />
          {/* Right pan */}
          <line x1="270" y1="60" x2="270" y2="100" stroke="#888" strokeWidth="3" />
          <ellipse cx="270" cy="106" rx="44" ry="10" fill="#555" fillOpacity="0.6" />
          {/* Fulcrum */}
          <polygon points="170,90 155,120 185,120" fill="#666" />
        </svg>

        {/* 157% return label */}
        <div style={{ opacity: labelOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 30,
              color: ACCENT,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            157% RETURN REQUIRED TO WAIT
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: '8px 0 0', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            NO INVESTMENT PAYS THAT
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Hyperbolic discounting timeline ────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [20, 90], [0, 860], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const arrowOpacity = interpolate(frame, [100, 130], [0, 1], {
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
          gap: 50,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headerOpacity, textAlign: 'center' }}>
          <p style={headline(50, BLACK)}>HYPERBOLIC</p>
          <p style={headline(50, ACCENT)}>DISCOUNTING</p>
        </div>

        {/* Timeline */}
        <svg width="960" height="220" viewBox="0 0 960 220">
          {/* Timeline line */}
          <clipPath id="timelineClip">
            <rect x="0" y="0" width={lineWidth} height="220" />
          </clipPath>
          <g clipPath="url(#timelineClip)">
            {/* Gradient line: full color → faded */}
            <defs>
              <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={ACCENT} />
                <stop offset="60%" stopColor="#AAA" />
                <stop offset="100%" stopColor="#333" />
              </linearGradient>
            </defs>
            <rect x="60" y="100" width="840" height="8" rx="4" fill="url(#timeGrad)" />

            {/* TODAY marker */}
            <circle cx="60" cy="104" r="14" fill={ACCENT} />
            <text x="60" y="150" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="20">TODAY</text>

            {/* Person at TODAY */}
            <circle cx="60" cy="64" r="14" fill={ACCENT} />
            <path d="M44 80 Q60 72 76 80 L80 104 L40 104 Z" fill={ACCENT} />

            {/* 5 years */}
            <circle cx="240" cy="104" r="10" fill="#AAA" />
            <text x="240" y="150" textAnchor="middle" fill="#777" fontFamily="Arial Black" fontSize="18">5 YRS</text>

            {/* 10 years */}
            <circle cx="420" cy="104" r="10" fill="#888" />
            <text x="420" y="150" textAnchor="middle" fill="#777" fontFamily="Arial Black" fontSize="18">10 YRS</text>

            {/* 20 years */}
            <circle cx="660" cy="104" r="8" fill="#555" />
            <text x="660" y="150" textAnchor="middle" fill="#999" fontFamily="Arial Black" fontSize="18">20 YRS</text>

            {/* 30 years - faded */}
            <circle cx="860" cy="104" r="6" fill="#333" />
            <text x="860" y="150" textAnchor="middle" fill="#555" fontFamily="Arial Black" fontSize="18" fillOpacity="0.5">30 YRS</text>
            <text x="860" y="78" textAnchor="middle" fill="#444" fontFamily="Arial Black" fontSize="16" fillOpacity="0.4">RETIREMENT</text>
          </g>
        </svg>

        {/* Arrow label */}
        <div style={{ opacity: arrowOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 30,
              color: ACCENT,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            THE FURTHER AWAY — THE MORE YOUR BRAIN IGNORES IT
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 24,
              color: '#888',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '10px 0 0',
              textAlign: 'center',
            }}
          >
            RETIREMENT FEELS LIKE IT BASICALLY DOESN'T EXIST
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Two investment curves — $312K gap ───────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const growthProgress = interpolate(frame, [20, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bar25H = Math.round(growthProgress * 480);
  const bar30H = Math.round(growthProgress * 310);
  const gapH = bar25H - bar30H;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headerOpacity, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>5-YEAR DELAY</p>
          <p style={headline(46, ACCENT)}>= $312,000 GONE</p>
        </div>

        {/* Bar chart */}
        <svg width="500" height="520" viewBox="0 0 500 520">
          {/* Baseline */}
          <line x1="40" y1="500" x2="460" y2="500" stroke="#444" strokeWidth="3" />

          {/* START AT 25 bar */}
          <rect
            x="60"
            y={500 - bar25H}
            width="140"
            height={bar25H}
            rx="10"
            fill={ACCENT}
            fillOpacity="0.9"
          />
          <text x="130" y="518" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">START 25</text>

          {/* START AT 30 bar */}
          <rect
            x="300"
            y={500 - bar30H}
            width="140"
            height={bar30H}
            rx="10"
            fill="#555"
            fillOpacity="0.9"
          />
          <text x="370" y="518" textAnchor="middle" fill="#888" fontFamily="Arial Black" fontSize="20">START 30</text>

          {/* Gap bracket */}
          {gapH > 10 && (
            <>
              <line x1="220" y1={500 - bar25H} x2="280" y2={500 - bar25H} stroke={ACCENT} strokeWidth="2" strokeDasharray="6 4" />
              <line x1="220" y1={500 - bar30H} x2="280" y2={500 - bar30H} stroke={ACCENT} strokeWidth="2" strokeDasharray="6 4" />
              <line x1="250" y1={500 - bar25H} x2="250" y2={500 - bar30H} stroke={ACCENT} strokeWidth="3" />
              <text
                x="255"
                y={500 - bar30H - gapH / 2}
                fill={ACCENT}
                fontFamily="Arial Black"
                fontSize="22"
                textAnchor="start"
              >
                $312K
              </text>
            </>
          )}
        </svg>

        <div style={{ opacity: labelOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'center',
            }}
          >
            MORE THAN MOST PEOPLE'S HOMES
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Automation fix — phone + auto-transfer arrows ─────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });

  const arrow1Opacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrow2Opacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeScale = spring({
    frame: Math.max(0, frame - 120),
    fps: 30,
    config: { damping: 10, stiffness: 100 },
  });

  const ctaOpacity = interpolate(frame, [150, 175], [0, 1], {
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
          gap: 44,
          padding: '80px 60px',
        }}
      >
        <p style={headline(52, BLACK)}>THE FIX</p>
        <p style={headline(52, ACCENT)}>ISN'T WILLPOWER</p>

        {/* Phone + arrows + piggy bank */}
        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width="540" height="260" viewBox="0 0 540 260">
            {/* Phone */}
            <rect x="40" y="20" width="130" height="220" rx="20" fill="#222" />
            <rect x="55" y="40" width="100" height="160" rx="8" fill="#1A3A5A" />
            {/* Screen: AUTO TRANSFER text */}
            <text x="105" y="95" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="13">AUTO</text>
            <text x="105" y="115" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="11">TRANSFER</text>
            <text x="105" y="135" textAnchor="middle" fill="#4CAF50" fontFamily="Arial Black" fontSize="14">ON</text>
            {/* Home button */}
            <circle cx="105" cy="225" r="10" fill="#333" />

            {/* Arrow 1 */}
            <g style={{ opacity: arrow1Opacity }}>
              <path d="M180 120 L270 120" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" markerEnd="url(#arrowHead)" />
              <text x="225" y="108" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="16">AUTO</text>
            </g>

            {/* Arrow 2 */}
            <g style={{ opacity: arrow2Opacity }}>
              <path d="M310 120 L360 120" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
              <polygon points="360,112 375,120 360,128" fill={ACCENT} />
            </g>

            {/* Arrow marker def */}
            <defs>
              <marker id="arrowHead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={ACCENT} />
              </marker>
            </defs>

            {/* Wallet icon */}
            <rect x="270" y="88" width="50" height="64" rx="8" fill="#555" />
            <rect x="278" y="110" width="36" height="20" rx="4" fill="#777" />
            <circle cx="310" cy="120" r="6" fill="#999" />

            {/* Piggy bank (future you) */}
            <ellipse cx="440" cy="145" rx="56" ry="44" fill="#4CAF50" fillOpacity="0.8" />
            <circle cx="488" cy="130" r="26" fill="#4CAF50" fillOpacity="0.8" />
            <ellipse cx="504" cy="136" rx="12" ry="9" fill="#388E3C" />
            <circle cx="501" cy="134" r="3" fill="#2E7D32" />
            <circle cx="507" cy="134" r="3" fill="#2E7D32" />
            <rect x="428" y="112" width="24" height="5" rx="2" fill="#388E3C" />
            <rect x="406" y="183" width="16" height="20" rx="4" fill="#388E3C" />
            <rect x="428" y="183" width="16" height="20" rx="4" fill="#388E3C" />
            <rect x="450" y="183" width="16" height="20" rx="4" fill="#388E3C" />
            <rect x="472" y="183" width="16" height="20" rx="4" fill="#388E3C" />
            <text x="440" y="155" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="13">FUTURE</text>
            <text x="440" y="172" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="13">YOU</text>
          </svg>
        </div>

        {/* $312K badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: ACCENT,
            borderRadius: 20,
            padding: '22px 48px',
            textAlign: 'center',
          }}
        >
          <p style={headline(46, WHITE)}>$312,000 PROTECTED</p>
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'center',
            }}
          >
            AUTOMATE FIRST — BUDGET LATER
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Brain SVG with TODAY/FUTURE split + PRESENT BIAS label
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const brainScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });

  const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [70, 95], [0, 1], {
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
          gap: 48,
          padding: '80px 60px',
        }}
      >
        {/* Brain SVG */}
        <div style={{ transform: `scale(${brainScale})` }}>
          <svg width="340" height="280" viewBox="0 0 340 280" fill="none">
            {/* Left brain hemisphere (TODAY - bright blue) */}
            <path
              d="M170 240 C80 240 30 190 30 140 C30 90 70 50 120 45 C130 20 155 10 170 10"
              stroke={ACCENT}
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M170 10 C155 10 130 20 120 45 C70 50 30 90 30 140 C30 190 80 240 170 240"
              fill={ACCENT}
              fillOpacity="0.25"
            />
            {/* Folds left */}
            <path d="M80 100 Q100 90 120 100 Q100 110 80 100Z" fill={ACCENT} fillOpacity="0.5" />
            <path d="M70 140 Q95 130 115 140 Q95 150 70 140Z" fill={ACCENT} fillOpacity="0.5" />
            <path d="M85 175 Q110 165 130 175 Q110 185 85 175Z" fill={ACCENT} fillOpacity="0.5" />
            {/* TODAY label */}
            <text x="100" y="135" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="20" fontWeight="900">TODAY</text>

            {/* Right brain hemisphere (FUTURE - dim) */}
            <path
              d="M170 240 C260 240 310 190 310 140 C310 90 270 50 220 45 C210 20 185 10 170 10"
              stroke="#555"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M170 10 C185 10 210 20 220 45 C270 50 310 90 310 140 C310 190 260 240 170 240"
              fill="#333"
              fillOpacity="0.5"
            />
            {/* Folds right */}
            <path d="M260 100 Q240 90 220 100 Q240 110 260 100Z" fill="#555" fillOpacity="0.5" />
            <path d="M265 140 Q243 130 225 140 Q243 150 265 140Z" fill="#555" fillOpacity="0.5" />
            <path d="M255 175 Q230 165 210 175 Q230 185 255 175Z" fill="#555" fillOpacity="0.5" />
            {/* FUTURE label */}
            <text x="240" y="135" textAnchor="middle" fill="#555" fontFamily="Arial Black" fontSize="20" fontWeight="900">FUTURE</text>

            {/* Center divider */}
            <line x1="170" y1="15" x2="170" y2="238" stroke="#444" strokeWidth="3" strokeDasharray="8 5" />
          </svg>
        </div>

        {/* PRESENT BIAS title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <p style={headline(68, ACCENT)}>PRESENT</p>
          <p style={headline(68, WHITE)}>BIAS</p>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: subOpacity }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 28,
              color: '#888',
              textAlign: 'center',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            YOUR BRAIN'S MOST EXPENSIVE BUG
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
