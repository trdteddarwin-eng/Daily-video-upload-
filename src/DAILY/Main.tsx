import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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
  lineHeight: 1.3,
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

  const cartScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const counterVal = Math.floor(
    interpolate(frame, [60, 175], [0, 47], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const subOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 32,
      }}>
        {/* Shopping cart SVG */}
        <svg width={280} height={250} viewBox="0 0 280 250"
          style={{ transform: `scale(${cartScale})`, transformOrigin: 'center' }}>
          {/* Handle */}
          <line x1="18" y1="32" x2="54" y2="32" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
          {/* Cart body */}
          <polyline points="54,32 74,32 106,162 244,162 266,82 74,82"
            fill="none" stroke={ACCENT} strokeWidth="10"
            strokeLinecap="round" strokeLinejoin="round" />
          {/* Wheels */}
          <circle cx="126" cy="198" r="22" fill="none" stroke={ACCENT} strokeWidth="10" />
          <circle cx="210" cy="198" r="22" fill="none" stroke={ACCENT} strokeWidth="10" />
          {/* Milk carton in cart */}
          <rect x="116" y="98" width="46" height="58" rx="4" fill={WHITE} opacity={0.9} />
          <polygon points="116,98 139,76 162,98" fill="#E0E0E0" />
          <rect x="122" y="116" width="34" height="14" rx="2" fill={ACCENT} opacity={0.85} />
        </svg>

        <p style={{ ...headline(52, WHITE), opacity: titleOpacity }}>
          YOU CAME IN FOR MILK
        </p>

        <div style={{ opacity: subOpacity, textAlign: 'center' }}>
          <p style={headline(36, ACCENT)}>YOU SPENT</p>
          <p style={headline(128, ACCENT)}>+${counterVal}</p>
          <p style={headline(36, WHITE)}>MORE THAN PLANNED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const outlineProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const milkOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const eggsOpacity = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const breadOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const pathOpacity = interpolate(frame, [125, 155], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const statOpacity = interpolate(frame, [165, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const DASH_LEN = 1200;
  const dashOffset = interpolate(outlineProgress, [0, 1], [DASH_LEN, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 20,
      }}>
        <p style={{ ...headline(46, BLACK), opacity: titleOpacity }}>THE LAYOUT IS A TRAP</p>

        <svg width={680} height={440} viewBox="0 0 680 440">
          {/* Store outline */}
          <rect x="40" y="20" width="600" height="370" rx="6"
            fill="none" stroke={BLACK} strokeWidth="6"
            strokeDasharray={DASH_LEN} strokeDashoffset={dashOffset} />

          {/* Entry arrow bottom-center */}
          <polygon points="340,405 312,388 368,388" fill={ACCENT} opacity={outlineProgress} />
          <text x="340" y="432" textAnchor="middle" fill={BLACK} fontSize="22" fontFamily={FONT}>ENTRY</text>

          {/* MILK — top right */}
          <g opacity={milkOpacity}>
            <rect x="554" y="38" width="52" height="66" rx="4" fill="#4FC3F7" />
            <polygon points="554,44 580,24 606,44" fill="#81D4FA" />
            <text x="580" y="86" textAnchor="middle" fill="white" fontSize="17" fontFamily={FONT} fontWeight="bold">MILK</text>
            <circle cx="580" cy="116" r="14" fill={ACCENT} />
            <text x="580" y="122" textAnchor="middle" fill="white" fontSize="18" fontFamily={FONT} fontWeight="bold">!</text>
          </g>

          {/* EGGS — top left */}
          <g opacity={eggsOpacity}>
            <ellipse cx="88" cy="64" rx="26" ry="34" fill="#FFF8E1" stroke={BLACK} strokeWidth="3" />
            <ellipse cx="110" cy="52" rx="20" ry="26" fill="#FFF8E1" stroke={BLACK} strokeWidth="3" />
            <text x="98" y="108" textAnchor="middle" fill={BLACK} fontSize="17" fontFamily={FONT} fontWeight="bold">EGGS</text>
            <circle cx="98" cy="128" r="14" fill={ACCENT} />
            <text x="98" y="134" textAnchor="middle" fill="white" fontSize="18" fontFamily={FONT} fontWeight="bold">!</text>
          </g>

          {/* BREAD — bottom left */}
          <g opacity={breadOpacity}>
            <rect x="52" y="294" width="88" height="56" rx="12" fill="#D4A574" />
            <rect x="60" y="302" width="72" height="40" rx="8" fill="#C8955F" />
            <text x="96" y="370" textAnchor="middle" fill={BLACK} fontSize="17" fontFamily={FONT} fontWeight="bold">BREAD</text>
            <circle cx="96" cy="390" r="14" fill={ACCENT} />
            <text x="96" y="396" textAnchor="middle" fill="white" fontSize="18" fontFamily={FONT} fontWeight="bold">!</text>
          </g>

          {/* Winding path from entry through whole store */}
          <path d="M 340 385 L 340 290 L 570 290 L 570 90 L 148 90 L 148 300 L 96 300"
            fill="none" stroke={ACCENT} strokeWidth="5"
            strokeDasharray="12 6" strokeLinecap="round"
            opacity={pathOpacity} />
          <polygon points="96,285 76,300 96,315" fill={ACCENT} opacity={pathOpacity} />
        </svg>

        <p style={{ ...headline(32, BLACK), opacity: statOpacity }}>
          WALK PAST $200 OF TEMPTATION FIRST
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shelfScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const bannerOpacity = interpolate(frame, [20, 42], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const strikeProgress = interpolate(frame, [65, 110], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const statOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 28,
      }}>
        <p style={{ ...headline(48, WHITE), opacity: titleOpacity }}>THE END-CAP SCAM</p>

        <svg width={520} height={400} viewBox="0 0 520 400"
          style={{ transform: `scale(${shelfScale})`, transformOrigin: 'center' }}>
          {/* Shelf back panel */}
          <rect x="50" y="40" width="420" height="320" rx="8" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
          {/* Shelf planks */}
          <rect x="50" y="148" width="420" height="10" fill="#555" />
          <rect x="50" y="256" width="420" height="10" fill="#555" />
          {/* Products row 1 */}
          <rect x="170" y="58" width="46" height="84" rx="4" fill="#3A7BD5" />
          <rect x="228" y="66" width="46" height="76" rx="4" fill="#2ECC71" />
          <rect x="286" y="60" width="46" height="82" rx="4" fill="#E74C3C" />
          <rect x="344" y="58" width="46" height="84" rx="4" fill="#9B59B6" />
          <rect x="402" y="64" width="58" height="78" rx="4" fill="#F39C12" />
          {/* Products row 2 */}
          <rect x="170" y="166" width="46" height="84" rx="4" fill="#16A085" />
          <rect x="228" y="174" width="46" height="76" rx="4" fill="#8E44AD" />
          <rect x="286" y="168" width="46" height="82" rx="4" fill="#D35400" />
          <rect x="344" y="166" width="46" height="84" rx="4" fill="#C0392B" />
          <rect x="402" y="172" width="58" height="78" rx="4" fill="#2980B9" />
          {/* Products row 3 */}
          <rect x="170" y="274" width="46" height="78" rx="4" fill="#27AE60" />
          <rect x="228" y="280" width="46" height="72" rx="4" fill="#E91E63" />
          <rect x="286" y="274" width="46" height="78" rx="4" fill="#FF5722" />

          {/* END-CAP SALE overlay on left */}
          <g opacity={bannerOpacity}>
            <rect x="52" y="42" width="110" height="316" rx="6" fill={ACCENT} />
            <text x="107" y="106" textAnchor="middle" fill="white" fontSize="30" fontFamily={FONT} fontWeight="bold">SALE</text>
            <text x="107" y="140" textAnchor="middle" fill="white" fontSize="26" fontFamily={FONT} fontWeight="bold">!</text>
            {/* Price tag */}
            <rect x="66" y="168" width="82" height="64" rx="6" fill="white" />
            <text x="107" y="192" textAnchor="middle" fill="#888" fontSize="14" fontFamily={FONT}>WAS $4.99</text>
            <text x="107" y="216" textAnchor="middle" fill={ACCENT} fontSize="16" fontFamily={FONT} fontWeight="bold">NOW $4.99</text>
            {/* Animated strikethrough on "WAS" price */}
            <line
              x1="66" y1="192"
              x2={66 + 82 * strikeProgress} y2="192"
              stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>

        <p style={{ ...headline(36, ACCENT), opacity: statOpacity }}>
          47% OF END CAPS AREN'T REAL SALES
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shelfSpring = spring({ frame, fps, config: { damping: 12, stiffness: 60 } });
  const shelfY = interpolate(shelfSpring, [0, 1], [80, 0]);
  const highlightOpacity = interpolate(frame, [30, 56], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const labelOpacity = interpolate(frame, [58, 82], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const arrowOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 24,
      }}>
        <p style={{ ...headline(46, BLACK), opacity: titleOpacity }}>EYE LEVEL = BUY LEVEL</p>

        <svg width={640} height={500} viewBox="0 0 640 500"
          style={{ transform: `translateY(${shelfY}px)` }}>
          {/* Shelf back panel */}
          <rect x="40" y="20" width="560" height="460" rx="8" fill="#E8E8E8" stroke="#CCCCCC" strokeWidth="3" />
          {/* Shelf planks */}
          <rect x="40" y="176" width="560" height="12" fill="#BDBDBD" />
          <rect x="40" y="316" width="560" height="12" fill="#BDBDBD" />
          <rect x="40" y="462" width="560" height="12" fill="#BDBDBD" />

          {/* Eye-level row highlight */}
          <rect x="42" y="178" width="556" height="136" rx="4"
            fill={ACCENT}
            opacity={interpolate(highlightOpacity, [0, 1], [0, 0.15])} />
          <rect x="42" y="178" width="556" height="136" rx="4"
            fill="none" stroke={ACCENT} strokeWidth="5"
            opacity={highlightOpacity} />

          {/* EYE LEVEL badge */}
          <g opacity={labelOpacity}>
            <rect x="210" y="232" width="220" height="40" rx="20" fill={ACCENT} />
            <text x="320" y="258" textAnchor="middle" fill="white" fontSize="22" fontFamily={FONT} fontWeight="bold">EYE LEVEL</text>
          </g>

          {/* Premium products at eye level */}
          <g opacity={highlightOpacity}>
            <rect x="68" y="194" width="72" height="110" rx="6" fill="#2C3E50" />
            <text x="104" y="245" textAnchor="middle" fill="white" fontSize="13" fontFamily={FONT}>PREMIUM</text>
            <text x="104" y="268" textAnchor="middle" fill={ACCENT} fontSize="19" fontFamily={FONT} fontWeight="bold">$6.99</text>
            <rect x="154" y="194" width="72" height="110" rx="6" fill="#1A1A2E" />
            <text x="190" y="245" textAnchor="middle" fill="white" fontSize="13" fontFamily={FONT}>BRAND X</text>
            <text x="190" y="268" textAnchor="middle" fill={ACCENT} fontSize="19" fontFamily={FONT} fontWeight="bold">$7.49</text>
            <rect x="240" y="194" width="72" height="110" rx="6" fill="#16213E" />
            <text x="276" y="245" textAnchor="middle" fill="white" fontSize="13" fontFamily={FONT}>DELUXE</text>
            <text x="276" y="268" textAnchor="middle" fill={ACCENT} fontSize="19" fontFamily={FONT} fontWeight="bold">$8.29</text>
          </g>

          {/* Store brand — top row */}
          <g opacity={labelOpacity}>
            <rect x="68" y="38" width="72" height="130" rx="6" fill="#9E9E9E" />
            <text x="104" y="96" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>STORE</text>
            <text x="104" y="112" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>BRAND</text>
            <text x="104" y="142" textAnchor="middle" fill="white" fontSize="19" fontFamily={FONT} fontWeight="bold">$2.99</text>
            <rect x="154" y="50" width="72" height="118" rx="6" fill="#9E9E9E" />
            <text x="190" y="108" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>GENERIC</text>
            <text x="190" y="142" textAnchor="middle" fill="white" fontSize="19" fontFamily={FONT} fontWeight="bold">$3.49</text>
          </g>

          {/* Store brand — bottom row */}
          <g opacity={labelOpacity}>
            <rect x="68" y="332" width="72" height="122" rx="6" fill="#78909C" />
            <text x="104" y="386" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>VALUE</text>
            <text x="104" y="402" textAnchor="middle" fill="white" fontSize="12" fontFamily={FONT}>BRAND</text>
            <text x="104" y="432" textAnchor="middle" fill="white" fontSize="19" fontFamily={FONT} fontWeight="bold">$2.49</text>
          </g>

          {/* Arrow pointing down to value brand */}
          <g opacity={arrowOpacity}>
            <polygon points="500,390 540,366 540,414" fill="#10B981" />
            <text x="490" y="366" textAnchor="end" fill="#10B981" fontSize="20" fontFamily={FONT} fontWeight="bold">LOOK DOWN!</text>
            <text x="490" y="392" textAnchor="end" fill="#10B981" fontSize="18" fontFamily={FONT}>SAME THING</text>
            <text x="490" y="416" textAnchor="end" fill="#10B981" fontSize="18" fontFamily={FONT}>$4.50 LESS</text>
          </g>
        </svg>

        <p style={{ ...headline(30, BLACK), opacity: arrowOpacity }}>
          BRANDS PAY $1,000S/MONTH FOR THAT SPOT
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const cartScale = interpolate(frame, [30, 185], [0.65, 1.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const dollarVal = Math.floor(
    interpolate(frame, [40, 190], [80, 147], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const statOpacity = interpolate(frame, [162, 186], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Seeded note positions — deterministic, no Math.random
  const notes = [
    { x: 120, delay: 0,  swing: 28 },
    { x: 260, delay: 18, swing: -22 },
    { x: 400, delay: 9,  swing: 24 },
    { x: 540, delay: 30, swing: -20 },
    { x: 670, delay: 5,  swing: 26 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Floating music notes layer */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice">
          {notes.map((n, i) => {
            const elapsed = Math.max(0, frame - n.delay);
            const noteY = interpolate(elapsed, [0, 220], [1100, 60], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const noteX = n.x + Math.sin(elapsed * 0.045 + i * 1.3) * n.swing;
            const noteOpacity = interpolate(elapsed, [0, 14, 200, 220], [0, 0.75, 0.75, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <text key={i} x={noteX} y={noteY}
                fontSize="52" fill={ACCENT} opacity={noteOpacity}
                fontFamily="serif" textAnchor="middle">
                ♪
              </text>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 24,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleOpacity }}>
          THE MUSIC IS SLOWING YOU DOWN
        </p>

        {/* Growing cart */}
        <svg width={300} height={260} viewBox="0 0 300 260"
          style={{ transform: `scale(${cartScale})`, transformOrigin: 'center' }}>
          <line x1="18" y1="30" x2="54" y2="30" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
          <polyline points="54,30 74,30 108,160 248,160 270,80 74,80"
            fill="none" stroke={ACCENT} strokeWidth="10"
            strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="128" cy="196" r="23" fill="none" stroke={ACCENT} strokeWidth="10" />
          <circle cx="212" cy="196" r="23" fill="none" stroke={ACCENT} strokeWidth="10" />
          {/* Items piled in cart */}
          <rect x="112" y="96" width="40" height="58" rx="4" fill="#3A7BD5" opacity={0.9} />
          <rect x="158" y="88" width="40" height="66" rx="4" fill="#2ECC71" opacity={0.9} />
          <rect x="204" y="96" width="40" height="58" rx="4" fill="#E74C3C" opacity={0.9} />
        </svg>

        <p style={headline(84, ACCENT)}>${dollarVal}</p>

        <p style={{ ...headline(34, WHITE), opacity: statOpacity }}>
          38% MORE SPENDING WITH SLOW MUSIC
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const item1Spring = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 80 } });
  const item2Spring = spring({ frame: frame - 52, fps, config: { damping: 14, stiffness: 80 } });
  const item3Spring = spring({ frame: frame - 84, fps, config: { damping: 14, stiffness: 80 } });
  const savingsOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const savingsScale = spring({ frame: frame - 140, fps, config: { damping: 10, stiffness: 60 } });

  const items: Array<{ label: string; progress: number }> = [
    { label: 'SHOP THE PERIMETER', progress: item1Spring },
    { label: 'ALWAYS USE A LIST',   progress: item2Spring },
    { label: 'NEVER SHOP HUNGRY',   progress: item3Spring },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        gap: 28,
      }}>
        <p style={{ ...headline(50, BLACK), opacity: titleOpacity }}>THE COUNTER-MOVE</p>

        <div style={{ width: '100%', maxWidth: 720 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginBottom: 26,
              opacity: item.progress,
              transform: `translateX(${interpolate(item.progress, [0, 1], [-90, 0])}px)`,
            }}>
              <svg width={56} height={56} viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
                <circle cx="28" cy="28" r="26" fill={ACCENT} />
                <polyline points="14,28 24,38 42,18"
                  fill="none" stroke="white" strokeWidth="6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{
                fontFamily: FONT,
                fontSize: 36,
                color: BLACK,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                margin: 0,
                lineHeight: 1.2,
              }}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={{
          opacity: savingsOpacity,
          transform: `scale(${savingsScale})`,
          transformOrigin: 'center',
          background: ACCENT,
          borderRadius: 28,
          padding: '26px 64px',
          textAlign: 'center',
        }}>
          <p style={{ ...headline(40, WHITE), marginBottom: 4 }}>SAVES YOU</p>
          <p style={headline(96, WHITE)}>$2,400</p>
          <p style={{ ...headline(34, WHITE), marginTop: 4 }}>PER YEAR</p>
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
