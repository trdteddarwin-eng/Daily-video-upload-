import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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
  const parentOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const capOp = interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [85, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [165, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 140 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '60px 50px' }}>
        <p style={{ ...headline(42, WHITE), transform: `scale(${titleScale})` }}>529 FEE TRAP</p>

        <svg width="420" height="330" viewBox="0 0 420 330">
          {/* Parent silhouette */}
          <g opacity={parentOp}>
            <circle cx="165" cy="78" r="24" fill="#555" />
            <rect x="143" y="102" width="44" height="60" rx="10" fill="#555" />
            <rect x="135" y="162" width="18" height="36" rx="6" fill="#555" />
            <rect x="169" y="162" width="18" height="36" rx="6" fill="#555" />
          </g>
          {/* Child silhouette */}
          <g opacity={parentOp}>
            <circle cx="240" cy="94" r="18" fill="#666" />
            <rect x="222" y="112" width="36" height="48" rx="8" fill="#666" />
            <rect x="214" y="160" width="14" height="30" rx="5" fill="#666" />
            <rect x="244" y="160" width="14" height="30" rx="5" fill="#666" />
          </g>
          {/* Holding-hand connector */}
          <line x1="187" y1="138" x2="222" y2="138" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" opacity={parentOp} />

          {/* Graduation cap floating above */}
          <g opacity={capOp}>
            <polygon points="210,20 262,46 210,60 158,46" fill={ACCENT} />
            <rect x="197" y="12" width="26" height="10" rx="3" fill={ACCENT} />
            <line x1="256" y1="46" x2="256" y2="72" stroke={ACCENT} strokeWidth="2.5" />
            <rect x="248" y="68" width="16" height="12" rx="3" fill={ACCENT} />
          </g>

          {/* Piggy bank with 529 label */}
          <g opacity={piggyOp}>
            <ellipse cx="330" cy="218" rx="56" ry="40" fill={ACCENT} />
            <circle cx="358" cy="192" r="22" fill={ACCENT} />
            <circle cx="365" cy="186" r="6" fill={BLACK} />
            <circle cx="368" cy="185" r="2" fill={WHITE} />
            <rect x="316" y="176" width="16" height="5" rx="2" fill={BLACK} />
            <rect x="290" y="252" width="14" height="24" rx="4" fill={ACCENT} />
            <rect x="310" y="252" width="14" height="24" rx="4" fill={ACCENT} />
            <rect x="330" y="252" width="14" height="24" rx="4" fill={ACCENT} />
            <rect x="350" y="252" width="14" height="24" rx="4" fill={ACCENT} />
            <rect x="295" y="202" width="70" height="34" rx="8" fill={WHITE} opacity="0.92" />
            <text x="330" y="225" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="middle">529</text>
          </g>
        </svg>

        <div style={{ opacity: statOp, transform: `scale(${statScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(28, ACCENT) }}>54 MILLION FAMILIES HAVE A 529</p>
          <p style={{ ...headline(20, WHITE), marginTop: 8 }}>MOST CHOSE THE WRONG ONE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [18, 75], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [50, 148], [0, 268], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsOp = interpolate(frame, [48, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [148, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [185, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 12, stiffness: 150 } });

  const baseY = 316;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '60px 50px' }}>
        <p style={{ ...headline(40, BLACK), opacity: titleOp }}>THE FEE GAP</p>

        <svg width="420" height="368" viewBox="0 0 420 368">
          {/* Low-fee bar (green, tiny) */}
          <rect x="58" y={baseY - bar1H} width="120" height={bar1H} rx="4" fill={GREEN} />
          <text x="118" y={baseY - bar1H - 10} fontFamily="Arial Black" fontSize="16" fill={GREEN} textAnchor="middle" opacity={bar1H > 4 ? 1 : 0}>0.05%</text>
          <text x="118" y={baseY + 24} fontFamily="Arial Black" fontSize="13" fill={BLACK} textAnchor="middle">BEST PLANS</text>
          <text x="118" y={baseY + 42} fontFamily="Arial" fontSize="11" fill="#777" textAnchor="middle">Utah, Nevada</text>

          {/* VS */}
          <text x="210" y="200" fontFamily="Arial Black" fontSize="26" fill={BLACK} textAnchor="middle" opacity={vsOp}>VS</text>

          {/* High-fee bar (red, tall) */}
          <rect x="242" y={baseY - bar2H} width="120" height={bar2H} rx="4" fill={RED} />
          <text x="302" y={baseY - bar2H - 10} fontFamily="Arial Black" fontSize="16" fill={RED} textAnchor="middle" opacity={Math.min(1, bar2H / 12)}>0.93%</text>
          <text x="302" y={baseY + 24} fontFamily="Arial Black" fontSize="13" fill={BLACK} textAnchor="middle">WORST PLANS</text>
          <text x="302" y={baseY + 42} fontFamily="Arial" fontSize="11" fill="#777" textAnchor="middle">16 States</text>

          {/* Baseline */}
          <line x1="38" y1={baseY} x2="382" y2={baseY} stroke="#CCC" strokeWidth="2" />

          {/* 19x badge */}
          <g opacity={badgeOp}>
            <rect x="138" y="42" width="144" height="52" rx="14" fill={RED} />
            <text x="210" y="68" fontFamily="Arial Black" fontSize="24" fill={WHITE} textAnchor="middle">19× HIGHER</text>
            <text x="210" y="87" fontFamily="Arial" fontSize="13" fill={WHITE} textAnchor="middle">FEE RATE</text>
          </g>
        </svg>

        <p style={{ ...headline(26, RED), opacity: statOp, transform: `scale(${statScale})` }}>
          SAME INVESTMENT. 19× THE FEES.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const colLowH = interpolate(frame, [18, 138], [0, 274], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const colHighH = interpolate(frame, [18, 138], [0, 252], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [138, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapCount = interpolate(frame, [138, 212], [0, 23000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [200, 224], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 12, stiffness: 150 } });

  const baseY = 318;
  const midGapY = baseY - (colLowH + colHighH) / 2;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '60px 50px' }}>
        <p style={{ ...headline(40, WHITE), opacity: titleOp }}>THE $23,000 MATH</p>

        <svg width="420" height="368" viewBox="0 0 420 368">
          {/* Low-fee column (green) */}
          <rect x="52" y={baseY - colLowH} width="128" height={colLowH} rx="6" fill={GREEN} />
          <text x="116" y={baseY - colLowH - 12} fontFamily="Arial Black" fontSize="14" fill={GREEN} textAnchor="middle" opacity={Math.min(1, colLowH / 20)}>$323,000</text>
          <text x="116" y={baseY + 24} fontFamily="Arial Black" fontSize="13" fill={GREEN} textAnchor="middle">LOW FEE</text>
          <text x="116" y={baseY + 42} fontFamily="Arial" fontSize="11" fill="#777" textAnchor="middle">0.05% plan</text>

          {/* High-fee column (red) */}
          <rect x="240" y={baseY - colHighH} width="128" height={colHighH} rx="6" fill={RED} />
          <text x="304" y={baseY - colHighH - 12} fontFamily="Arial Black" fontSize="14" fill={RED} textAnchor="middle" opacity={Math.min(1, colHighH / 20)}>$300,000</text>
          <text x="304" y={baseY + 24} fontFamily="Arial Black" fontSize="13" fill={RED} textAnchor="middle">HIGH FEE</text>
          <text x="304" y={baseY + 42} fontFamily="Arial" fontSize="11" fill="#777" textAnchor="middle">0.93% plan</text>

          {/* Baseline */}
          <line x1="32" y1={baseY} x2="388" y2={baseY} stroke="#333" strokeWidth="2" />

          {/* Gap bracket */}
          <g opacity={gapOp}>
            <line x1="180" y1={baseY - colLowH} x2="240" y2={baseY - colLowH} stroke={ACCENT} strokeWidth="2" strokeDasharray="5,3" />
            <line x1="180" y1={baseY - colHighH} x2="240" y2={baseY - colHighH} stroke={ACCENT} strokeWidth="2" strokeDasharray="5,3" />
            <line x1="210" y1={baseY - colLowH} x2="210" y2={baseY - colHighH} stroke={ACCENT} strokeWidth="3" />
            <rect x="155" y={midGapY - 22} width="110" height="44" rx="10" fill={ACCENT} />
            <text x="210" y={midGapY - 5} fontFamily="Arial Black" fontSize="12" fill={WHITE} textAnchor="middle">GAP:</text>
            <text x="210" y={midGapY + 16} fontFamily="Arial Black" fontSize="18" fill={WHITE} textAnchor="middle">{"$" + Math.round(gapCount).toLocaleString()}</text>
          </g>

          <text x="210" y="358" fontFamily="Arial" fontSize="11" fill="#555" textAnchor="middle">$100K start · 18 yrs · 7% avg return</text>
        </svg>

        <p style={{ ...headline(28, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>
          FEES COMPOUND JUST LIKE GAINS DO
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOp = interpolate(frame, [18, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [52, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Op = interpolate(frame, [68, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Op = interpolate(frame, [95, 131], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card3Op = interpolate(frame, [122, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [178, 212], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 178), fps, config: { damping: 12, stiffness: 140 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '60px 50px' }}>
        <p style={{ ...headline(36, BLACK), opacity: titleOp }}>YOU'RE NOT LOCKED IN</p>

        <svg width="420" height="360" viewBox="0 0 420 360">
          {/* Person box */}
          <g opacity={personOp}>
            <rect x="8" y="100" width="118" height="148" rx="12" fill="#E0E0E0" stroke="#CCC" strokeWidth="2" />
            <text x="67" y="124" fontFamily="Arial Black" fontSize="12" fill="#777" textAnchor="middle">YOUR STATE</text>
            <circle cx="67" cy="162" r="20" fill="#888" />
            <rect x="49" y="182" width="36" height="44" rx="8" fill="#888" />
            <rect x="41" y="226" width="14" height="26" rx="4" fill="#888" />
            <rect x="69" y="226" width="14" height="26" rx="4" fill="#888" />
          </g>

          {/* Arrows */}
          <g opacity={arrowOp}>
            <line x1="126" y1="160" x2="192" y2="94" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points={`186,84 200,98 186,102`} fill={ACCENT} />
            <line x1="126" y1="174" x2="192" y2="198" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points={`186,191 200,204 186,208`} fill={ACCENT} />
            <line x1="126" y1="188" x2="192" y2="292" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points={`186,285 200,298 186,302`} fill={ACCENT} />
          </g>

          {/* Card 1 - Utah */}
          <g opacity={card1Op}>
            <rect x="198" y="58" width="214" height="74" rx="10" fill={GREEN} />
            <text x="305" y="86" fontFamily="Arial Black" fontSize="19" fill={WHITE} textAnchor="middle">UTAH</text>
            <text x="305" y="108" fontFamily="Arial" fontSize="13" fill={WHITE} textAnchor="middle">my529 — 0.05% fee</text>
            <rect x="350" y="67" width="50" height="24" rx="8" fill={WHITE} opacity="0.25" />
            <text x="375" y="84" fontFamily="Arial Black" fontSize="12" fill={WHITE} textAnchor="middle">BEST</text>
          </g>

          {/* Card 2 - Nevada */}
          <g opacity={card2Op}>
            <rect x="198" y="158" width="214" height="74" rx="10" fill="#059669" />
            <text x="305" y="186" fontFamily="Arial Black" fontSize="19" fill={WHITE} textAnchor="middle">NEVADA</text>
            <text x="305" y="208" fontFamily="Arial" fontSize="13" fill={WHITE} textAnchor="middle">Vanguard — 0.07% fee</text>
          </g>

          {/* Card 3 - Your State */}
          <g opacity={card3Op}>
            <rect x="198" y="258" width="214" height="74" rx="10" fill="#DDD" stroke="#BBB" strokeWidth="1.5" />
            <text x="305" y="286" fontFamily="Arial Black" fontSize="16" fill="#999" textAnchor="middle">YOUR STATE</text>
            <text x="305" y="308" fontFamily="Arial" fontSize="12" fill="#AAA" textAnchor="middle">Maybe 0.3–0.9%+ fees</text>
          </g>
        </svg>

        <div style={{ opacity: statOp, transform: `scale(${statScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(28, ACCENT) }}>OPEN ANY STATE'S 529</p>
          <p style={{ ...headline(19, BLACK), marginTop: 8 }}>73% OF PARENTS NEVER KNEW THIS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Op = interpolate(frame, [18, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [55, 89], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Op = interpolate(frame, [92, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row4Op = interpolate(frame, [130, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleOp = interpolate(frame, [168, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleScale = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 12, stiffness: 130 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '60px 50px' }}>
        <p style={{ ...headline(38, WHITE), opacity: titleOp }}>THE BEST PLANS</p>

        <svg width="440" height="360" viewBox="0 0 440 360">
          {/* Header */}
          <rect x="10" y="10" width="420" height="44" rx="8" fill="#1E1E1E" />
          <text x="38" y="37" fontFamily="Arial Black" fontSize="14" fill={ACCENT}>STATE / PLAN</text>
          <text x="388" y="37" fontFamily="Arial Black" fontSize="14" fill={ACCENT} textAnchor="end">EXPENSE RATIO</text>

          {/* Row 1 — Utah */}
          <g opacity={row1Op}>
            <rect x="10" y="62" width="420" height="56" rx="8" fill="#1A1A1A" />
            <text x="38" y="90" fontFamily="Arial Black" fontSize="16" fill={GREEN}>Utah — my529</text>
            <text x="38" y="110" fontFamily="Arial" fontSize="12" fill="#666">Most investment options, age-based portfolios</text>
            <rect x="294" y="71" width="126" height="34" rx="8" fill={GREEN} opacity="0.2" />
            <text x="357" y="93" fontFamily="Arial Black" fontSize="19" fill={GREEN} textAnchor="middle">0.05%</text>
          </g>

          {/* Row 2 — Nevada */}
          <g opacity={row2Op}>
            <rect x="10" y="126" width="420" height="56" rx="8" fill="#1A1A1A" />
            <text x="38" y="154" fontFamily="Arial Black" fontSize="16" fill={GREEN}>Nevada — Vanguard</text>
            <text x="38" y="174" fontFamily="Arial" fontSize="12" fill="#666">Pure index fund lineup</text>
            <rect x="294" y="135" width="126" height="34" rx="8" fill={GREEN} opacity="0.2" />
            <text x="357" y="157" fontFamily="Arial Black" fontSize="19" fill={GREEN} textAnchor="middle">0.07%</text>
          </g>

          {/* Row 3 — New York */}
          <g opacity={row3Op}>
            <rect x="10" y="190" width="420" height="56" rx="8" fill="#1A1A1A" />
            <text x="38" y="218" fontFamily="Arial Black" fontSize="16" fill={GREEN}>New York — Direct</text>
            <text x="38" y="238" fontFamily="Arial" fontSize="12" fill="#666">Vanguard index funds, no state tax deduction needed</text>
            <rect x="294" y="199" width="126" height="34" rx="8" fill={GREEN} opacity="0.2" />
            <text x="357" y="221" fontFamily="Arial Black" fontSize="19" fill={GREEN} textAnchor="middle">0.09%</text>
          </g>

          {/* Row 4 — Warning */}
          <g opacity={row4Op}>
            <rect x="10" y="254" width="420" height="56" rx="8" fill="#2A1010" stroke={RED} strokeWidth="1.5" />
            <text x="38" y="282" fontFamily="Arial Black" fontSize="16" fill={RED}>16 States — Beware</text>
            <text x="38" y="302" fontFamily="Arial" fontSize="12" fill="#888">Check your home state's plan carefully</text>
            <rect x="294" y="263" width="126" height="34" rx="8" fill={RED} opacity="0.25" />
            <text x="357" y="285" fontFamily="Arial Black" fontSize="19" fill={RED} textAnchor="middle">0.3%+</text>
          </g>
        </svg>

        <p style={{ ...headline(28, ACCENT), opacity: ruleOp, transform: `scale(${ruleScale})` }}>
          ABOVE 0.3%? TIME TO SWITCH.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const phoneOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const capOp = interpolate(frame, [58, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [105, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 105), fps, config: { damping: 12, stiffness: 140 } });
  const ctaOp = interpolate(frame, [162, 202], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [162, 202], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(36, BLACK), transform: `scale(${titleScale})` }}>CHECK YOURS NOW</p>

        <svg width="420" height="320" viewBox="0 0 420 320">
          {/* Phone */}
          <g opacity={phoneOp}>
            <rect x="38" y="8" width="148" height="252" rx="18" fill="#222" stroke="#444" strokeWidth="2" />
            <rect x="50" y="26" width="124" height="210" rx="8" fill="#1A1A1A" />
            <rect x="90" y="264" width="40" height="6" rx="3" fill="#333" />
            {/* Screen header */}
            <rect x="54" y="30" width="116" height="38" rx="6" fill={ACCENT} opacity="0.85" />
            <text x="112" y="54" fontFamily="Arial Black" fontSize="12" fill={WHITE} textAnchor="middle">529 PLAN FEES</text>
            {/* Search bar */}
            <rect x="54" y="76" width="116" height="22" rx="5" fill="#2A2A2A" />
            <text x="112" y="91" fontFamily="Arial" fontSize="9" fill="#888" textAnchor="middle">529 expense ratio search</text>
            {/* Results */}
            <rect x="54" y="106" width="116" height="22" rx="4" fill="#1E2A1E" />
            <text x="64" y="121" fontFamily="Arial" fontSize="9" fill={GREEN}>Utah my529: 0.05% ✓</text>
            <rect x="54" y="132" width="116" height="22" rx="4" fill="#1E2A1E" />
            <text x="64" y="147" fontFamily="Arial" fontSize="9" fill={GREEN}>Nevada: 0.07% ✓</text>
            <rect x="54" y="158" width="116" height="22" rx="4" fill="#2A1A1A" />
            <text x="64" y="173" fontFamily="Arial" fontSize="9" fill={RED}>My State: 0.72% ✗</text>
            {/* Alert dot */}
            <circle cx="174" cy="42" r="13" fill={RED} />
            <text x="174" y="47" fontFamily="Arial Black" fontSize="15" fill={WHITE} textAnchor="middle">!</text>
          </g>

          {/* Graduation cap */}
          <g opacity={capOp}>
            <polygon points="296,78 356,108 296,126 236,108" fill={ACCENT} />
            <rect x="280" y="70" width="32" height="10" rx="3" fill={ACCENT} />
            <line x1="350" y1="108" x2="350" y2="148" stroke={ACCENT} strokeWidth="2.5" />
            <rect x="342" y="144" width="16" height="12" rx="3" fill={ACCENT} />
            {/* Diploma */}
            <rect x="234" y="154" width="120" height="80" rx="8" fill="#F0E8C8" stroke="#C8B870" strokeWidth="2" />
            <line x1="248" y1="172" x2="340" y2="172" stroke="#C8B870" strokeWidth="1" />
            <line x1="248" y1="186" x2="340" y2="186" stroke="#C8B870" strokeWidth="1" />
            <line x1="248" y1="200" x2="310" y2="200" stroke="#C8B870" strokeWidth="1" />
            <text x="294" y="226" fontFamily="Arial Black" fontSize="11" fill="#9A8040" textAnchor="middle">DIPLOMA</text>
          </g>

          {/* Savings badge */}
          <g opacity={badgeOp} transform={`scale(${badgeScale})`} style={{ transformOrigin: '210px 292px' }}>
            <rect x="128" y="270" width="220" height="48" rx="14" fill={GREEN} />
            <text x="238" y="294" fontFamily="Arial Black" fontSize="16" fill={WHITE} textAnchor="middle">SAVE $23,000</text>
            <text x="238" y="311" fontFamily="Arial" fontSize="12" fill={WHITE} textAnchor="middle">with one free switch</text>
          </g>
        </svg>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(30, ACCENT), lineHeight: 1.3 }}>GOOGLE YOUR STATE'S 529 FEE</p>
          <p style={{ ...headline(20, BLACK), marginTop: 10 }}>FOLLOW FOR MORE MONEY SECRETS</p>
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
