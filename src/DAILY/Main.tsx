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

// ─── SCENES ──────────────────────────────────────────────────────────────────

// Scene 1: Hook — person silhouette + floating price tags + $31,000 title
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const personS = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const hookOp = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tags = [
    { label: '$47',  x: 155, startY: 680, delay: 18 },
    { label: '$89',  x: 890, startY: 760, delay: 32 },
    { label: '$124', x: 200, startY: 1060, delay: 48 },
    { label: '$220', x: 855, startY: 620, delay: 24 },
    { label: '$67',  x: 120, startY: 870, delay: 40 },
    { label: '$155', x: 910, startY: 1010, delay: 14 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Person silhouette */}
          <g
            transform={`translate(540,950) scale(${personS}) translate(-540,-950)`}
            opacity={0.18}
          >
            <circle cx="540" cy="710" r="78" fill={ACCENT} />
            <rect x="458" y="798" width="164" height="265" rx="22" fill={ACCENT} />
            <rect x="298" y="815" width="162" height="46" rx="23" fill={ACCENT} />
            <rect x="622" y="815" width="162" height="46" rx="23" fill={ACCENT} />
            <rect x="466" y="1058" width="66" height="185" rx="22" fill={ACCENT} />
            <rect x="550" y="1058" width="66" height="185" rx="22" fill={ACCENT} />
          </g>

          {/* Floating price tags */}
          {tags.map((tag, i) => {
            const tagOp = interpolate(frame, [tag.delay, tag.delay + 22], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const ty = interpolate(frame, [tag.delay, dur], [tag.startY, tag.startY - 200], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <g key={i} transform={`translate(${tag.x},${ty})`} opacity={tagOp}>
                <rect x="-54" y="-28" width="108" height="56" rx="8" fill={WHITE} />
                <circle cx="-54" cy="0" r="7" fill={BG_DARK} />
                <line x1="-47" y1="0" x2="-47" y2="-28" stroke={BG_DARK} strokeWidth="1.5" />
                <text
                  x="6"
                  y="9"
                  textAnchor="middle"
                  fontSize="23"
                  fontFamily={FONT}
                  fill={BLACK}
                >
                  {tag.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 110,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: 10,
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [70, 0])}px)`,
          }}
        >
          <p style={headline(108, ACCENT)}>$31,000</p>
          <p style={headline(40, WHITE)}>IMPULSE BUY TRAP</p>
          <p style={{ ...headline(26, WHITE), opacity: 0.55 }}>EVERY DECADE</p>
        </div>

        {/* Hook line */}
        <div
          style={{
            position: 'absolute',
            bottom: 210,
            left: 60,
            right: 60,
            opacity: hookOp,
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 36,
              color: WHITE,
              textAlign: 'center' as const,
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            One simple rule fixes it.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Brain psychology — head with pulsing brain + dopamine sparks + 72h clock
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const sparkProg = interpolate(frame, [25, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockProg = interpolate(frame, [0, dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Brain pulse (looping)
  const brainPulse = interpolate(frame % 50, [0, 25, 50], [1, 1.09, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // 8 dopamine sparks at evenly spaced angles
  const sparkAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Head silhouette */}
          <g transform={`translate(540,800) scale(${headS}) translate(-540,-800)`}>
            <circle cx="540" cy="800" r="210" fill="#2A2A2A" />
            {/* Brain inside */}
            <ellipse
              cx="540"
              cy="770"
              rx={142 * brainPulse}
              ry={112 * brainPulse}
              fill={ACCENT}
              opacity={0.92}
            />
            {/* Brain folds */}
            <path d="M 428 770 Q 484 742 540 770 Q 596 798 652 770" stroke={BLACK} strokeWidth="3" fill="none" opacity="0.4" />
            <path d="M 440 795 Q 490 812 540 795" stroke={BLACK} strokeWidth="2" fill="none" opacity="0.4" />
            <line x1="540" y1="680" x2="540" y2="875" stroke={BLACK} strokeWidth="2" opacity="0.3" />
            {/* Neck */}
            <rect x="494" y="1005" width="92" height="75" rx="10" fill="#2A2A2A" />
          </g>

          {/* Dopamine sparks */}
          {sparkAngles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const r = interpolate(sparkProg, [0, 1], [225, 330 + i * 8]);
            const cx = 540 + Math.cos(rad) * r;
            const cy = 800 + Math.sin(rad) * r;
            const sOp = interpolate(sparkProg, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
            return (
              <circle key={i} cx={cx} cy={cy} r={13 - i * 0.4} fill={ACCENT} opacity={sOp} />
            );
          })}

          {/* Clock */}
          <g transform="translate(540,1380)">
            <circle cx="0" cy="0" r="105" fill="none" stroke={BLACK} strokeWidth="6" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
              const r2 = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={Math.cos(r2) * 88}
                  y1={Math.sin(r2) * 88}
                  x2={Math.cos(r2) * 105}
                  y2={Math.sin(r2) * 105}
                  stroke={BLACK}
                  strokeWidth={i % 3 === 0 ? 5 : 2}
                />
              );
            })}
            {/* Hour hand */}
            <line
              x1="0" y1="0"
              x2={Math.cos(((clockProg * 360 - 90) * Math.PI) / 180) * 58}
              y2={Math.sin(((clockProg * 360 - 90) * Math.PI) / 180) * 58}
              stroke={BLACK} strokeWidth="6" strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
              x1="0" y1="0"
              x2={Math.cos((((clockProg * 360 * 12) % 360 - 90) * Math.PI) / 180) * 82}
              y2={Math.sin((((clockProg * 360 * 12) % 360 - 90) * Math.PI) / 180) * 82}
              stroke={ACCENT} strokeWidth="4" strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="7" fill={BLACK} />
          </g>
        </svg>

        {/* Top label */}
        <div style={{ position: 'absolute', top: 108, left: 60, right: 60, opacity: textOp }}>
          <p style={headline(50, BLACK)}>YOUR BRAIN</p>
          <p style={{ ...headline(50, ACCENT), marginTop: 6 }}>WANTS IT NOW</p>
        </div>

        {/* 72 HRS label */}
        <div style={{ position: 'absolute', bottom: 200, left: 60, right: 60, opacity: textOp }}>
          <p style={headline(78, BLACK)}>72 HOURS</p>
          <p style={{ ...headline(30, BLACK), opacity: 0.55, marginTop: 8 }}>AND THE URGE IS GONE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: The Rule — $30 bill with X + 3-item checklist
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const billS = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const xOp = interpolate(frame, [28, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const item1S = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 14, stiffness: 100 } });
  const item2S = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 14, stiffness: 100 } });
  const item3S = spring({ frame: Math.max(0, frame - 96), fps, config: { damping: 14, stiffness: 100 } });
  const bottomOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* $30 Bill */}
          <g transform={`translate(540,600) scale(${billS}) translate(-540,-600)`}>
            <rect x="230" y="478" width="620" height="244" rx="14" fill="#1a5c2a" />
            <rect x="244" y="492" width="592" height="216" rx="8" fill="none" stroke="#2d8a42" strokeWidth="3" />
            <text x="540" y="626" textAnchor="middle" fontSize="110" fontFamily={FONT} fill="#e8f5e9">$30</text>
            <text x="262" y="612" textAnchor="middle" fontSize="22" fontFamily={FONT} fill="#2d8a42">30</text>
            <text x="818" y="612" textAnchor="middle" fontSize="22" fontFamily={FONT} fill="#2d8a42">30</text>
            <circle cx="540" cy="600" r="58" fill="none" stroke="#2d8a42" strokeWidth="3" />
          </g>

          {/* Red X over bill */}
          <g opacity={xOp}>
            <line x1="230" y1="478" x2="850" y2="722" stroke="#EF4444" strokeWidth="9" strokeLinecap="round" />
            <line x1="850" y1="478" x2="230" y2="722" stroke="#EF4444" strokeWidth="9" strokeLinecap="round" />
          </g>

          {/* Checklist */}
          <g transform="translate(100,870)">
            {/* Item 1 */}
            <g
              opacity={item1S}
              transform={`translate(${interpolate(item1S, [0, 1], [-55, 0])},0)`}
            >
              <rect x="0" y="0" width="44" height="44" rx="8" fill={ACCENT} />
              <text x="22" y="31" textAnchor="middle" fontSize="26" fontFamily={FONT} fill={BLACK}>1</text>
              <text x="62" y="31" fontSize="30" fontFamily={FONT} fill={WHITE}>NON-ESSENTIAL?</text>
            </g>

            {/* Item 2 */}
            <g
              opacity={item2S}
              transform={`translate(${interpolate(item2S, [0, 1], [-55, 0])},80)`}
            >
              <rect x="0" y="0" width="44" height="44" rx="8" fill={ACCENT} />
              <text x="22" y="31" textAnchor="middle" fontSize="26" fontFamily={FONT} fill={BLACK}>2</text>
              <text x="62" y="31" fontSize="30" fontFamily={FONT} fill={WHITE}>OVER $30?</text>
            </g>

            {/* Item 3 */}
            <g
              opacity={item3S}
              transform={`translate(${interpolate(item3S, [0, 1], [-55, 0])},160)`}
            >
              <rect x="0" y="0" width="44" height="44" rx="8" fill={ACCENT} />
              <text x="22" y="31" textAnchor="middle" fontSize="26" fontFamily={FONT} fill={BLACK}>3</text>
              <text x="62" y="31" fontSize="30" fontFamily={FONT} fill={WHITE}>WAIT 72 HOURS</text>
            </g>
          </g>
        </svg>

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 106,
            left: 60,
            right: 60,
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [44, 0])}px)`,
          }}
        >
          <p style={headline(58, ACCENT)}>THE RULE</p>
          <p style={{ ...headline(30, WHITE), marginTop: 8 }}>THAT CHANGES EVERYTHING</p>
        </div>

        {/* Bottom amber label */}
        <div style={{ position: 'absolute', bottom: 195, left: 60, right: 60, opacity: bottomOp }}>
          <p style={headline(52, ACCENT)}>72 HOURS</p>
          <p style={{ ...headline(26, WHITE), opacity: 0.65, marginTop: 6 }}>BEFORE YOU BUY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: The Math — two-bar chart + 87% counter
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barS = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 18, stiffness: 55 } });
  const labelOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctCount = Math.floor(
    interpolate(frame, [45, 170], [0, 87], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const BAR_H = 560;
  const bar1H = barS * BAR_H;
  const bar2H = barS * BAR_H * 0.13;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Baseline */}
          <line x1="80" y1="1130" x2="1000" y2="1130" stroke={BLACK} strokeWidth="3" opacity={0.15} />

          {/* Bar 1 — all impulse buys (amber) */}
          <g transform="translate(290,1130)">
            <rect x="-130" y={-bar1H} width="260" height={bar1H} rx="14" fill={ACCENT} />
            <text x="0" y="52" textAnchor="middle" fontSize="26" fontFamily={FONT} fill={BLACK}>100</text>
            <text x="0" y="82" textAnchor="middle" fontSize="20" fontFamily={FONT} fill="#555">IMPULSE</text>
            <text x="0" y="106" textAnchor="middle" fontSize="20" fontFamily={FONT} fill="#555">BUYS</text>
          </g>

          {/* Bar 2 — actually needed (green) */}
          <g transform="translate(720,1130)">
            <rect x="-130" y={-bar2H} width="260" height={bar2H} rx="14" fill="#10B981" />
            <text x="0" y="52" textAnchor="middle" fontSize="26" fontFamily={FONT} fill={BLACK}>13</text>
            <text x="0" y="82" textAnchor="middle" fontSize="20" fontFamily={FONT} fill="#555">ACTUALLY</text>
            <text x="0" y="106" textAnchor="middle" fontSize="20" fontFamily={FONT} fill="#555">NEEDED</text>
          </g>

          {/* 87% annotation */}
          <g opacity={labelOp}>
            <rect x="160" y="505" width="470" height="62" rx="10" fill="#EF4444" />
            <text x="395" y="544" textAnchor="middle" fontSize="28" fontFamily={FONT} fill={WHITE}>
              87% CANCELLED
            </text>
          </g>

          {/* Counter badge */}
          <g transform="translate(540,1580)" opacity={labelOp}>
            <rect x="-235" y="-58" width="470" height="96" rx="18" fill={ACCENT} />
            <text x="0" y="10" textAnchor="middle" fontSize="52" fontFamily={FONT} fill={BLACK}>
              {pctCount}% AVOIDED
            </text>
          </g>
        </svg>

        {/* Title */}
        <div style={{ position: 'absolute', top: 110, left: 60, right: 60 }}>
          <p style={headline(82, BLACK)}>87%</p>
          <p style={{ ...headline(38, BLACK), marginTop: 4 }}>NEVER BOUGHT</p>
          <p style={{ ...headline(26, ACCENT), marginTop: 12 }}>AFTER WAITING 72 HOURS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Someday List — phone + items appearing + piggy bank with coin
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame, fps, config: { damping: 14, stiffness: 88 } });
  const piggyS = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 78 } });

  const i1S = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 14, stiffness: 100 } });
  const i2S = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 14, stiffness: 100 } });
  const i3S = spring({ frame: Math.max(0, frame - 92), fps, config: { damping: 14, stiffness: 100 } });
  const crossW = interpolate(frame, [140, 182], [0, 185], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Coin drop (looping every 55 frames)
  const coinLoop = frame % 55;
  const coinY = interpolate(coinLoop, [0, 38, 55], [892, 985, 985], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const coinOp = interpolate(coinLoop, [0, 6, 34, 46], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const titleOp = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const hintOp = interpolate(frame, [85, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Phone */}
          <g transform={`translate(290,950) scale(${phoneS}) translate(-290,-950)`}>
            <rect x="90" y="580" width="400" height="760" rx="42" fill="#222222" />
            <rect x="110" y="640" width="360" height="638" rx="14" fill="#0d0d1e" />
            <circle cx="290" cy="622" r="11" fill="#333" />
            <circle cx="290" cy="1308" r="22" fill="#333" />

            {/* Screen header */}
            <text x="145" y="696" fontSize="24" fontFamily={FONT} fill={ACCENT}>SOMEDAY LIST</text>
            <line x1="120" y1="708" x2="460" y2="708" stroke={ACCENT} strokeWidth="1" opacity={0.45} />

            {/* Item 1 */}
            <g opacity={i1S} transform={`translate(${interpolate(i1S, [0, 1], [-40, 0])},0)`}>
              <circle cx="138" cy="742" r="8" fill={ACCENT} opacity={0.7} />
              <text x="156" y="748" fontSize="21" fontFamily="Arial, sans-serif" fill={WHITE}>New running shoes</text>
            </g>

            {/* Item 2 */}
            <g opacity={i2S} transform={`translate(${interpolate(i2S, [0, 1], [-40, 0])},0)`}>
              <circle cx="138" cy="784" r="8" fill={ACCENT} opacity={0.7} />
              <text x="156" y="790" fontSize="21" fontFamily="Arial, sans-serif" fill={WHITE}>Wireless headphones</text>
            </g>

            {/* Item 3 — crossed out */}
            <g opacity={i3S} transform={`translate(${interpolate(i3S, [0, 1], [-40, 0])},0)`}>
              <circle cx="138" cy="826" r="8" fill="#555" />
              <text x="156" y="832" fontSize="21" fontFamily="Arial, sans-serif" fill="#666">Kitchen gadget</text>
              <line x1="156" y1="832" x2={156 + crossW} y2="832" stroke="#EF4444" strokeWidth="2.5" />
            </g>
          </g>

          {/* Piggy Bank */}
          <g transform={`translate(770,950) scale(${piggyS}) translate(-770,-950)`}>
            {/* Body */}
            <ellipse cx="770" cy="980" rx="155" ry="128" fill="#F9A8D4" />
            {/* Head area */}
            <ellipse cx="640" cy="900" rx="82" ry="72" fill="#F9A8D4" />
            {/* Ear */}
            <ellipse cx="670" cy="852" rx="32" ry="26" fill="#F9A8D4" />
            <ellipse cx="670" cy="852" rx="20" ry="16" fill="#FBBF24" />
            {/* Eye */}
            <circle cx="618" cy="892" r="8" fill={BLACK} />
            <circle cx="620" cy="890" r="3" fill={WHITE} />
            {/* Snout */}
            <ellipse cx="592" cy="922" rx="28" ry="20" fill="#F472B6" />
            <circle cx="584" cy="922" r="5.5" fill="#DB2777" />
            <circle cx="600" cy="922" r="5.5" fill="#DB2777" />
            {/* Coin slot */}
            <rect x="748" y="856" width="42" height="9" rx="4.5" fill="#9D174D" />
            {/* Legs */}
            <rect x="655" y="1082" width="48" height="52" rx="12" fill="#F9A8D4" />
            <rect x="722" y="1082" width="48" height="52" rx="12" fill="#F9A8D4" />
            <rect x="792" y="1082" width="48" height="52" rx="12" fill="#F9A8D4" />
            <rect x="859" y="1082" width="48" height="52" rx="12" fill="#F9A8D4" />
            {/* Tail curl */}
            <path d="M 912 975 Q 952 940 934 912 Q 916 882 940 865" stroke="#F9A8D4" strokeWidth="12" fill="none" strokeLinecap="round" />
          </g>

          {/* Falling coin */}
          <g opacity={coinOp}>
            <circle cx="769" cy={coinY} r="16" fill={ACCENT} />
            <text x="769" y={coinY + 6} textAnchor="middle" fontSize="16" fontFamily={FONT} fill={BG_DARK}>$</text>
          </g>
        </svg>

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 116,
            left: 60,
            right: 60,
            opacity: titleOp,
            transform: `translateY(${interpolate(titleOp, [0, 1], [44, 0])}px)`,
          }}
        >
          <p style={headline(54, ACCENT)}>SOMEDAY LIST</p>
          <p style={{ ...headline(30, WHITE), marginTop: 8 }}>NOT A SHOPPING CART</p>
        </div>

        {/* Hint */}
        <div style={{ position: 'absolute', bottom: 185, left: 60, right: 60, opacity: hintOp }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 30,
              color: WHITE,
              textAlign: 'center' as const,
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            Most items disappear on their own.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — phone + pulsing button + savings counter + START TONIGHT
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const phoneS = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 82 } });

  const savings = Math.floor(
    interpolate(frame, [38, 210], [0, 31000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  // Button pulse (looping every 44 frames)
  const btnPulse = interpolate(frame % 44, [0, 22, 44], [1, 1.06, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const ctaOp = interpolate(frame, [145, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [30, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Phone */}
          <g transform={`translate(540,900) scale(${phoneS}) translate(-540,-900)`}>
            <rect x="340" y="595" width="400" height="700" rx="42" fill="#1a1a1a" />
            <rect x="360" y="650" width="360" height="590" rx="14" fill="#0d0d1e" />
            <circle cx="540" cy="630" r="12" fill="#333" />

            {/* Screen content */}
            <text x="540" y="712" textAnchor="middle" fontSize="24" fontFamily={FONT} fill={ACCENT}>SOMEDAY LIST</text>
            <line x1="370" y1="722" x2="710" y2="722" stroke={ACCENT} strokeWidth="1" opacity={0.45} />
            <text x="378" y="762" fontSize="21" fontFamily="Arial, sans-serif" fill={WHITE}>• New running shoes</text>
            <text x="378" y="798" fontSize="21" fontFamily="Arial, sans-serif" fill={WHITE}>• Wireless headphones</text>
            <text x="378" y="834" fontSize="21" fontFamily="Arial, sans-serif" fill="#555">• Kitchen gadget  ✕</text>

            {/* Pulsing ADD TO LIST button */}
            <g transform={`translate(540,1048) scale(${btnPulse}) translate(-540,-1048)`}>
              <rect x="388" y="1018" width="304" height="60" rx="30" fill={ACCENT} />
              <text x="540" y="1055" textAnchor="middle" fontSize="22" fontFamily={FONT} fill={BLACK}>
                + ADD TO LIST
              </text>
            </g>
          </g>

          {/* Savings counter */}
          <g transform="translate(540,1510)" opacity={counterOp}>
            <rect x="-265" y="-62" width="530" height="102" rx="20" fill={ACCENT} />
            <text x="0" y="8" textAnchor="middle" fontSize="50" fontFamily={FONT} fill={BLACK}>
              ${savings.toLocaleString()}
            </text>
            <text x="0" y="46" textAnchor="middle" fontSize="22" fontFamily={FONT} fill={BLACK}>SAVED THIS DECADE</text>
          </g>
        </svg>

        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 108,
            left: 60,
            right: 60,
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [52, 0])}px)`,
          }}
        >
          <p style={headline(66, BLACK)}>ONE PAUSE.</p>
          <p style={{ ...headline(50, ACCENT), marginTop: 6 }}>$31,000 SAVED.</p>
        </div>

        {/* CTA */}
        <div style={{ position: 'absolute', bottom: 150, left: 60, right: 60, opacity: ctaOp }}>
          <p style={headline(68, BLACK)}>START TONIGHT</p>
          <p style={{ ...headline(28, BLACK), opacity: 0.52, marginTop: 10 }}>
            NEXT IMPULSE → THE LIST
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── ROOT COMPOSITION ─────────────────────────────────────────────────────────
export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
