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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const menuOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1 = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2 = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3 = interpolate(frame, [105, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line4 = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eyeOp = interpolate(frame, [155, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [190, 225], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '60px 50px' }}>
        <p style={{ ...headline(50, WHITE), transform: `scale(${titleScale})` }}>THE MENU CHOOSES YOU</p>

        <svg width="380" height="390" viewBox="0 0 380 390" opacity={menuOp}>
          {/* Menu card */}
          <rect x="30" y="10" width="320" height="340" rx="14" ry="14" fill="#1A1A1A" stroke={ACCENT} strokeWidth="2" />
          {/* Header band */}
          <rect x="30" y="10" width="320" height="58" rx="14" ry="14" fill={ACCENT} />
          <rect x="30" y="50" width="320" height="18" fill={ACCENT} />
          <text x="190" y="49" fontFamily="Arial Black" fontSize="24" fill={BLACK} textAnchor="middle" fontWeight="bold">MENU</text>
          {/* Divider */}
          <line x1="60" y1="82" x2="320" y2="82" stroke={ACCENT} strokeWidth="1" opacity="0.4" />

          {/* Menu items */}
          <text x="65" y="122" fontFamily="Arial" fontSize="19" fill={WHITE} fontWeight="bold" opacity={line1}>Salmon Tartare</text>
          <text x="315" y="122" fontFamily="Arial Black" fontSize="19" fill={ACCENT} textAnchor="end" opacity={line1}>28</text>

          <text x="65" y="172" fontFamily="Arial" fontSize="19" fill={WHITE} fontWeight="bold" opacity={line2}>Slow-Roasted Prime Rib</text>
          <text x="315" y="172" fontFamily="Arial Black" fontSize="19" fill={ACCENT} textAnchor="end" opacity={line2}>42</text>

          <text x="65" y="222" fontFamily="Arial" fontSize="19" fill={WHITE} fontWeight="bold" opacity={line3}>Herb-Crusted Halibut</text>
          <text x="315" y="222" fontFamily="Arial Black" fontSize="19" fill={ACCENT} textAnchor="end" opacity={line3}>38</text>

          <text x="65" y="272" fontFamily="Arial" fontSize="19" fill={WHITE} fontWeight="bold" opacity={line4}>Maine Lobster Bisque</text>
          <text x="315" y="272" fontFamily="Arial Black" fontSize="19" fill={ACCENT} textAnchor="end" opacity={line4}>65</text>

          <line x1="60" y1="292" x2="320" y2="292" stroke={ACCENT} strokeWidth="1" opacity="0.3" />

          {/* Eye staring from inside menu */}
          <g opacity={eyeOp}>
            <ellipse cx="190" cy="330" rx="58" ry="26" fill="none" stroke={ACCENT} strokeWidth="2.5" />
            <circle cx="190" cy="330" r="15" fill={ACCENT} />
            <circle cx="190" cy="330" r="7" fill={BLACK} />
            <circle cx="195" cy="326" r="3" fill={WHITE} />
            <line x1="132" y1="330" x2="148" y2="330" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
            <line x1="232" y1="330" x2="248" y2="330" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
          </g>
        </svg>

        <p style={{ ...headline(28, ACCENT), opacity: subOp }}>CORNELL STUDIED HOW IT DRAINS YOU</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const menuOp = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowPulse = interpolate(frame, [0, 60, 120, 180], [0.5, 1.0, 0.5, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eyeX = interpolate(frame, [50, 110, 150, 225], [90, 300, 160, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eyeY = interpolate(frame, [50, 110, 150, 225], [200, 80, 240, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [155, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statY = interpolate(frame, [155, 195], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px 50px' }}>
        <p style={{ ...headline(48, BLACK), opacity: titleOp }}>THE GOLDEN TRIANGLE</p>

        <svg width="400" height="360" viewBox="0 0 400 360" opacity={menuOp}>
          {/* Menu card */}
          <rect x="20" y="10" width="360" height="310" rx="10" ry="10" fill="#FFFFFF" stroke="#DDD" strokeWidth="2" />
          <text x="200" y="48" fontFamily="Arial Black" fontSize="20" fill={BLACK} textAnchor="middle">ENTRÉES</text>
          <line x1="40" y1="58" x2="360" y2="58" stroke="#DDD" strokeWidth="1" />
          {/* Divider between columns */}
          <line x1="200" y1="58" x2="200" y2="290" stroke="#DDD" strokeWidth="1" />

          {/* Left column — lower margin items */}
          <text x="40" y="95" fontFamily="Arial" fontSize="16" fill="#666" fontWeight="bold">Caesar Salad</text>
          <text x="185" y="95" fontFamily="Arial" fontSize="16" fill="#999" textAnchor="end">16</text>
          <text x="40" y="140" fontFamily="Arial" fontSize="16" fill="#666" fontWeight="bold">Chicken Piccata</text>
          <text x="185" y="140" fontFamily="Arial" fontSize="16" fill="#999" textAnchor="end">28</text>
          <text x="40" y="185" fontFamily="Arial" fontSize="16" fill="#666" fontWeight="bold">Pasta Carbonara</text>
          <text x="185" y="185" fontFamily="Arial" fontSize="16" fill="#999" textAnchor="end">24</text>
          <text x="40" y="230" fontFamily="Arial" fontSize="16" fill="#666" fontWeight="bold">Grilled Salmon</text>
          <text x="185" y="230" fontFamily="Arial" fontSize="16" fill="#999" textAnchor="end">32</text>

          {/* Right column — golden triangle, high margin */}
          <rect x="205" y="65" width="165" height="200" rx="8" ry="8" fill={ACCENT} opacity={glowPulse * 0.12} />
          <rect x="205" y="65" width="165" height="200" rx="8" ry="8" fill="none" stroke={ACCENT} strokeWidth="2.5" opacity={glowPulse} />
          <text x="220" y="97" fontFamily="Arial Black" fontSize="16" fill={BLACK}>Prime Filet</text>
          <text x="358" y="97" fontFamily="Arial Black" fontSize="16" fill={ACCENT} textAnchor="end">62</text>
          <text x="220" y="140" fontFamily="Arial Black" fontSize="16" fill={BLACK}>Wagyu Steak</text>
          <text x="358" y="140" fontFamily="Arial Black" fontSize="16" fill={ACCENT} textAnchor="end">85</text>
          <text x="220" y="183" fontFamily="Arial Black" fontSize="16" fill={BLACK}>Lobster Tail</text>
          <text x="358" y="183" fontFamily="Arial Black" fontSize="16" fill={ACCENT} textAnchor="end">72</text>
          <text x="220" y="226" fontFamily="Arial Black" fontSize="16" fill={BLACK}>Duck Confit</text>
          <text x="358" y="226" fontFamily="Arial Black" fontSize="16" fill={ACCENT} textAnchor="end">54</text>

          <text x="288" y="275" fontFamily="Arial Black" fontSize="13" fill={ACCENT} textAnchor="middle">★ GOLDEN TRIANGLE ★</text>

          {/* Eye tracking dot */}
          <circle cx={eyeX} cy={eyeY} r="11" fill="none" stroke="#3B82F6" strokeWidth="2.5" opacity="0.9" />
          <circle cx={eyeX} cy={eyeY} r="4" fill="#3B82F6" opacity="0.9" />
        </svg>

        <div style={{ opacity: statOp, transform: `translateY(${statY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(30, BLACK) }}>YOUR EYES LAND HERE FIRST</p>
          <p style={{ ...headline(22, ACCENT), marginTop: 8 }}>HIGHEST-MARGIN DISHES — BY DESIGN</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strikeW = interpolate(frame, [35, 80], [0, 108], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1W = interpolate(frame, [90, 165], [0, 230], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [110, 185], [0, 248], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [180, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '60px 50px' }}>
        <p style={{ ...headline(50, WHITE), opacity: titleOp }}>REMOVE THE DOLLAR SIGN</p>

        <svg width="440" height="320" viewBox="0 0 440 320">
          {/* Card A — with $ */}
          <rect x="10" y="20" width="190" height="120" rx="12" ry="12" fill="#1E1E1E" stroke="#555" strokeWidth="2" />
          <text x="105" y="58" fontFamily="Arial" fontSize="14" fill="#888" textAnchor="middle">RESTAURANT A</text>
          <text x="105" y="118" fontFamily="Arial Black" fontSize="50" fill={WHITE} textAnchor="middle">$42</text>
          <line x1="28" y1="116" x2={28 + strikeW} y2="116" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <text x="105" y="158" fontFamily="Arial" fontSize="13" fill="#888" textAnchor="middle">FEELS EXPENSIVE</text>

          {/* Card B — no $ */}
          <rect x="240" y="20" width="190" height="120" rx="12" ry="12" fill={ACCENT} />
          <text x="335" y="58" fontFamily="Arial" fontSize="14" fill={BLACK} textAnchor="middle" fontWeight="bold">RESTAURANT B</text>
          <text x="335" y="118" fontFamily="Arial Black" fontSize="50" fill={BLACK} textAnchor="middle">42</text>
          <text x="335" y="158" fontFamily="Arial" fontSize="13" fill={BLACK} textAnchor="middle" fontWeight="bold">FEELS CHEAPER</text>

          <text x="220" y="95" fontFamily="Arial Black" fontSize="20" fill={WHITE} textAnchor="middle">VS</text>

          {/* Spending comparison bars */}
          <text x="10" y="198" fontFamily="Arial" fontSize="14" fill="#888">WITH $ SIGN</text>
          <rect x="10" y="208" width={bar1W} height="24" rx="5" fill="#555" />

          <text x="10" y="252" fontFamily="Arial" fontSize="14" fill={ACCENT} fontWeight="bold">WITHOUT $ SIGN</text>
          <rect x="10" y="262" width={bar2W} height="24" rx="5" fill={ACCENT} />
          <text x={10 + bar2W + 8} y="280" fontFamily="Arial Black" fontSize="18" fill={ACCENT} opacity={statOp}>+8%</text>
        </svg>

        <p style={{ ...headline(38, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>CORNELL PROVED IT</p>
        <p style={{ ...headline(22, WHITE), opacity: statOp }}>SAME FOOD — 8% HEAVIER BILL</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Op = interpolate(frame, [25, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Op = interpolate(frame, [65, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Op = interpolate(frame, [105, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const highlightOp = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [180, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12, stiffness: 150 } });

  const item2Fill = highlightOp > 0.5 ? ACCENT : '#FFFFFF';
  const item2Stroke = highlightOp > 0.5 ? ACCENT : '#DDD';
  const item2TextColor = highlightOp > 0.5 ? BLACK : '#333';
  const item2PriceColor = highlightOp > 0.5 ? BLACK : '#555';

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '60px 50px' }}>
        <p style={{ ...headline(50, BLACK), opacity: titleOp }}>THE DECOY TRICK</p>

        <svg width="440" height="370" viewBox="0 0 440 370">
          {/* Item 1 — cheap option */}
          <g opacity={item1Op}>
            <rect x="10" y="10" width="420" height="90" rx="10" ry="10" fill="#F5F5F5" stroke="#DDD" strokeWidth="1.5" />
            <text x="35" y="52" fontFamily="Arial Black" fontSize="19" fill="#333">Chicken Marsala</text>
            <text x="35" y="82" fontFamily="Arial" fontSize="14" fill="#999">Pan-seared with white wine reduction</text>
            <text x="410" y="62" fontFamily="Arial Black" fontSize="24" fill="#555" textAnchor="end">26</text>
          </g>

          {/* Item 2 — TARGET (decoy makes this look like value) */}
          <g opacity={item2Op}>
            <rect x="10" y="115" width="420" height="90" rx="10" ry="10" fill={item2Fill} stroke={item2Stroke} strokeWidth="2.5" />
            <text x="35" y="157" fontFamily="Arial Black" fontSize="19" fill={item2TextColor}>Prime Filet Mignon</text>
            <text x="35" y="185" fontFamily="Arial" fontSize="14" fill={item2TextColor}>8oz with roasted garlic butter</text>
            <text x="410" y="165" fontFamily="Arial Black" fontSize="26" fill={item2PriceColor} textAnchor="end">38</text>
          </g>

          {/* Item 3 — DECOY */}
          <g opacity={item3Op}>
            <rect x="10" y="220" width="420" height="90" rx="10" ry="10" fill="#FFF5F5" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="7,4" />
            <text x="35" y="260" fontFamily="Arial Black" fontSize="19" fill="#EF4444">Japanese Wagyu A5</text>
            <text x="35" y="288" fontFamily="Arial" fontSize="14" fill="#EF4444">Hand-selected, 12oz, black truffle</text>
            <text x="410" y="268" fontFamily="Arial Black" fontSize="26" fill="#EF4444" textAnchor="end">72</text>
          </g>

          {/* Decoy label */}
          <text x="35" y="325" fontFamily="Arial Black" fontSize="14" fill="#EF4444" opacity={item3Op}>
            ← DECOY — makes $38 feel like a bargain
          </text>
          <text x="35" y="350" fontFamily="Arial Black" fontSize="14" fill={ACCENT} opacity={highlightOp}>
            ← YOU ORDER THIS — exactly as planned
          </text>
        </svg>

        <p style={{ ...headline(38, BLACK), opacity: statOp, transform: `scale(${statScale})` }}>PREMIUM SALES UP 73%</p>
        <p style={{ ...headline(22, ACCENT), opacity: statOp }}>FROM ONE FAKE HIGH PRICE</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const plainOp = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word1Op = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word2Op = interpolate(frame, [88, 123], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word3Op = interpolate(frame, [111, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [148, 205], [0, 204], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceVal = interpolate(frame, [148, 205], [24, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [200, 225], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '60px 50px' }}>
        <p style={{ ...headline(50, WHITE), opacity: titleOp }}>ADJECTIVE = PRICE HIKE</p>

        <svg width="440" height="360" viewBox="0 0 440 360">
          {/* Plain dish card */}
          <g opacity={plainOp}>
            <rect x="10" y="10" width="420" height="78" rx="10" ry="10" fill="#1E1E1E" stroke="#444" strokeWidth="1.5" />
            <text x="35" y="58" fontFamily="Arial Black" fontSize="26" fill={WHITE}>Chicken</text>
            <text x="405" y="58" fontFamily="Arial Black" fontSize="26" fill="#888" textAnchor="end">24</text>
          </g>

          {/* Word bubbles float in */}
          <g opacity={word1Op}>
            <rect x="10" y="108" width="188" height="52" rx="26" fill={ACCENT} />
            <text x="104" y="140" fontFamily="Arial Black" fontSize="17" fill={BLACK} textAnchor="middle">SLOW-ROASTED</text>
          </g>
          <g opacity={word2Op}>
            <rect x="212" y="108" width="158" height="52" rx="26" fill={ACCENT} />
            <text x="291" y="140" fontFamily="Arial Black" fontSize="17" fill={BLACK} textAnchor="middle">FARM-FRESH</text>
          </g>
          <g opacity={word3Op}>
            <rect x="110" y="174" width="170" height="52" rx="26" fill={ACCENT} />
            <text x="195" y="206" fontFamily="Arial Black" fontSize="17" fill={BLACK} textAnchor="middle">HAND-CRAFTED</text>
          </g>

          {/* Upgraded dish card */}
          <rect x="10" y="245" width="420" height="78" rx="10" ry="10" fill="#1E1E1E" stroke={ACCENT} strokeWidth="2.5" opacity={word3Op} />
          <text x="35" y="278" fontFamily="Arial" fontSize="16" fill={WHITE} opacity={word3Op}>Slow-Roasted Farm-Fresh</text>
          <text x="35" y="302" fontFamily="Arial Black" fontSize="18" fill={WHITE} opacity={word3Op}>Hand-Crafted Chicken</text>
          <text x="405" y="292" fontFamily="Arial Black" fontSize="28" fill={ACCENT} textAnchor="end" opacity={word3Op}>{Math.round(priceVal)}</text>

          {/* Price bar */}
          <rect x="10" y="338" width={barW} height="16" rx="5" fill={ACCENT} opacity={word3Op} />
          <text x={10 + barW + 8} y="352" fontFamily="Arial Black" fontSize="16" fill={ACCENT} opacity={word3Op}>+27%</text>
        </svg>

        <p style={{ ...headline(32, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>SAME BIRD. BETTER ADJECTIVES.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const mealsCount = interpolate(frame, [25, 120], [0, 307], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = interpolate(frame, [65, 185], [0, 3000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Op = interpolate(frame, [25, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Op = interpolate(frame, [115, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [140, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [185, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [185, 218], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '60px 50px' }}>
        <p style={{ ...headline(52, WHITE), transform: `scale(${titleScale})` }}>THE REAL PRICE TAG</p>

        <svg width="440" height="310" viewBox="0 0 440 310">
          {/* Row 1 — meals per year */}
          <g opacity={row1Op}>
            <rect x="10" y="10" width="420" height="70" rx="8" ry="8" fill="#1E1E1E" />
            <text x="30" y="52" fontFamily="Arial" fontSize="17" fill={WHITE}>Americans eat out</text>
            <text x="410" y="52" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="end">{Math.round(mealsCount)} meals/yr</text>
          </g>

          {/* Row 2 — extra per meal */}
          <g opacity={row2Op}>
            <rect x="10" y="95" width="420" height="70" rx="8" ry="8" fill="#1E1E1E" />
            <text x="30" y="137" fontFamily="Arial" fontSize="17" fill={WHITE}>Menu tricks add per meal</text>
            <text x="410" y="137" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="end">+$9.75</text>
          </g>

          {/* Divider */}
          <line x1="10" y1="180" x2="430" y2="180" stroke={ACCENT} strokeWidth="2" opacity={row3Op} />

          {/* Row 3 — total */}
          <g opacity={row3Op}>
            <text x="30" y="220" fontFamily="Arial Black" fontSize="22" fill={WHITE}>YEARLY DRAIN</text>
            <text x="410" y="220" fontFamily="Arial Black" fontSize="34" fill={ACCENT} textAnchor="end">{"$" + Math.round(totalCount).toLocaleString()}</text>
          </g>

          {/* Piggy bank */}
          <g opacity={piggyOp}>
            <ellipse cx="220" cy="278" rx="42" ry="26" fill={ACCENT} />
            <circle cx="242" cy="261" r="11" fill={ACCENT} />
            <circle cx="246" cy="258" r="3.5" fill={BLACK} />
            <rect x="204" y="298" width="11" height="14" rx="3" fill={ACCENT} />
            <rect x="222" y="298" width="11" height="14" rx="3" fill={ACCENT} />
            <rect x="218" y="252" width="6" height="16" rx="3" fill={BLACK} />
            <path d="M258,265 Q274,260 272,275" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="220" y="282" fontFamily="Arial Black" fontSize="15" fill={BLACK} textAnchor="middle">$</text>
          </g>
        </svg>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(34, ACCENT), lineHeight: 1.3 }}>NOW YOU KNOW THE TRICKS</p>
          <p style={{ ...headline(22, WHITE), marginTop: 10 }}>FOLLOW FOR MORE MONEY TRAPS</p>
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
