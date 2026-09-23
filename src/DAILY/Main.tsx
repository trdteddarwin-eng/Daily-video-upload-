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

const arcPath = (cx: number, cy: number, r: number, startDeg: number, endDeg: number): string => {
  const toRad = (d: number) => (d - 90) * (Math.PI / 180);
  const sx = cx + r * Math.cos(toRad(startDeg));
  const sy = cy + r * Math.sin(toRad(startDeg));
  const ex = cx + r * Math.cos(toRad(endDeg));
  const ey = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`;
};

// ─── Scene 1 — Hook: 72% never change the default ────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-120, 0]);

  const stat1Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d0x = interpolate(frame, [55, 185], [520, 840], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d0y = interpolate(frame, [55, 185], [860, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d0op = interpolate(frame, [55, 75, 165, 185], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d1x = interpolate(frame, [75, 200], [520, 920], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1y = interpolate(frame, [75, 200], [860, 620], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1op = interpolate(frame, [75, 95, 180, 200], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d2x = interpolate(frame, [95, 210], [520, 780], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2y = interpolate(frame, [95, 210], [860, 560], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2op = interpolate(frame, [95, 115, 195, 215], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '0 60px',
      }}>
        <p style={headline(52, WHITE)}>THE DEFAULT</p>
        <p style={headline(82, ACCENT)}>401K TRAP</p>
      </div>

      <svg width="1080" height="960" viewBox="0 0 1080 960"
        style={{ position: 'absolute', top: 330, left: 0, opacity: personOpacity }}>
        {/* Desk */}
        <rect x="180" y="650" width="560" height="28" fill="#2A2A2A" rx="5" />
        <rect x="240" y="678" width="28" height="90" fill="#2A2A2A" rx="4" />
        <rect x="652" y="678" width="28" height="90" fill="#2A2A2A" rx="4" />

        {/* Tablet */}
        <rect x="360" y="460" width="240" height="190" fill="#1A1A1A" stroke={ACCENT} strokeWidth="4" rx="12" />
        <rect x="372" y="472" width="216" height="148" fill="#0A0A0A" rx="7" />
        <text x="480" y="518" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="20" letterSpacing="3">MY 401K</text>
        <text x="480" y="548" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="15">DEFAULT FUND</text>
        <text x="480" y="574" textAnchor="middle" fill="#777" fontFamily={FONT} fontSize="13">Target Date 2055</text>
        <text x="480" y="600" textAnchor="middle" fill="#555" fontFamily={FONT} fontSize="12">Expense: 0.80%</text>

        {/* Person silhouette */}
        <circle cx="480" cy="380" r="50" fill={WHITE} />
        <rect x="438" y="428" width="84" height="96" fill={WHITE} rx="10" />
        <rect x="372" y="436" width="70" height="20" fill={WHITE} rx="8" transform="rotate(15, 372, 436)" />
        <rect x="516" y="436" width="70" height="20" fill={WHITE} rx="8" transform="rotate(-15, 586, 436)" />
        <rect x="448" y="520" width="28" height="80" fill={WHITE} rx="6" />
        <rect x="482" y="520" width="28" height="80" fill={WHITE} rx="6" />

        {/* Dollar signs drift up-right */}
        <text x={d0x} y={d0y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="50" opacity={d0op} fontWeight="bold">$</text>
        <text x={d1x} y={d1y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="42" opacity={d1op} fontWeight="bold">$</text>
        <text x={d2x} y={d2y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="36" opacity={d2op} fontWeight="bold">$</text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 200, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        padding: '0 60px',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, margin: 0, textAlign: 'center', opacity: stat1Opacity }}>
          <span style={{ color: ACCENT, fontSize: 76 }}>72%</span>{' '}NEVER SWITCH
        </p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#888', margin: 0, textAlign: 'center', opacity: stat2Opacity, letterSpacing: '0.06em' }}>
          the default — quietly drains $127K
        </p>
      </div>
    </FadeScene>
  );
};
// END SCENE 1

// ─── Scene 2 — Fee Reveal: 0.80% = $800/year on $100K ───────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const cardY = interpolate(cardSpring, [0, 1], [300, 0]);

  const feeRaw = interpolate(frame, [40, 115], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarDisplay = Math.round(interpolate(frame, [85, 170], [0, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const magScale = spring({ frame: Math.max(0, frame - 110), fps, config: { stiffness: 200, damping: 20 } });
  const magOpacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(68, BLACK)}>THE HIDDEN FEE</p>
        <p style={{ fontFamily: FONT, fontSize: 34, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          hiding in your statement
        </p>
      </div>

      <div style={{
        position: 'absolute', top: 370, left: 90, right: 90,
        transform: `translateY(${cardY}px)`,
        background: WHITE, border: '3px solid #E0E0E0', borderRadius: 24,
        padding: '48px 56px', boxShadow: '0 20px 70px rgba(0,0,0,0.1)',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', textAlign: 'center', margin: '0 0 24px', letterSpacing: '0.12em' }}>
          401K FUND STATEMENT
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: FONT, fontSize: 32, color: BLACK }}>Balance</span>
          <span style={{ fontFamily: FONT, fontSize: 44, color: BLACK }}>$100,000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed #DDD', paddingTop: 20, marginBottom: 20 }}>
          <span style={{ fontFamily: FONT, fontSize: 32, color: ACCENT }}>Expense Ratio</span>
          <span style={{ fontFamily: FONT, fontSize: 60, color: ACCENT }}>{feeRaw.toFixed(2)}%</span>
        </div>
        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: '18px 22px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#92400E', margin: 0 }}>
            That&apos;s{' '}<span style={{ color: ACCENT, fontSize: 44 }}>${dollarDisplay}</span>{' '}drained this year alone
          </p>
        </div>
      </div>

      <svg width="150" height="150" viewBox="0 0 150 150"
        style={{ position: 'absolute', top: 590, right: 80, transform: `scale(${magScale})`, opacity: magOpacity }}>
        <circle cx="60" cy="60" r="48" fill="none" stroke={ACCENT} strokeWidth="10" />
        <line x1="98" y1="98" x2="140" y2="140" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
        <text x="60" y="68" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="18" fontWeight="bold">0.80%</text>
      </svg>
    </FadeScene>
  );
};

// ─── Scene 3 — Comparison: 0.80% bar vs 0.03% bar ────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 145], [0, 560], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [45, 165], [0, 21], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const BASELINE = 880;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity, padding: '0 60px' }}>
        <p style={headline(56, WHITE)}>WHAT'S SITTING</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 8 }}>RIGHT NEXT TO IT</p>
      </div>

      <svg width="1080" height="1100" viewBox="0 0 1080 1100" style={{ position: 'absolute', top: 260, left: 0 }}>
        <line x1="80" y1={BASELINE} x2="1000" y2={BASELINE} stroke="#333" strokeWidth="3" />

        {/* Bar 1 — Target Date */}
        <rect x="140" y={BASELINE - bar1H} width="280" height={bar1H} fill={ACCENT} rx="6" />
        <text x="280" y={BASELINE + 46} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="22" letterSpacing="1">TARGET DATE</text>
        <text x="280" y={BASELINE + 78} textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="20">0.80% / year</text>
        <text x="280" y={BASELINE - bar1H - 22} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="52" fontWeight="bold">0.80%</text>

        {/* Bar 2 — Index Fund */}
        <rect x="660" y={BASELINE - bar2H} width="280" height={Math.max(0, bar2H)} fill="#10B981" rx="6" />
        <text x="800" y={BASELINE + 46} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="22" letterSpacing="1">INDEX FUND</text>
        <text x="800" y={BASELINE + 78} textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="20">0.03% / year</text>
        <text x="800" y={BASELINE - bar2H - 22} textAnchor="middle" fill="#10B981" fontFamily={FONT} fontSize="52" fontWeight="bold">0.03%</text>

        {/* 27x label */}
        <text x="540" y="400" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="34" opacity={labelOpacity}>&#8592; SAME MARKET &#8594;</text>
        <text x="540" y="476" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="80" fontWeight="bold" opacity={labelOpacity}>27&#215; CHEAPER</text>
        <text x="540" y="528" textAnchor="middle" fill="#888" fontFamily={FONT} fontSize="28" opacity={labelOpacity}>your plan already has this fund</text>
      </svg>
    </FadeScene>
  );
};
// END SCENE 3

// ─── Scene 4 — The $127K Gap: diverging compound lines ───────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-100, 0]);

  const progress = interpolate(frame, [25, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearDisplay = Math.round(progress * 25);
  const gapDisplay = Math.round(progress * 127000);

  const CX = 80;
  const CBOTTOM = 740;
  const CW = 900;
  const CSCALE = 92;

  const numPts = Math.max(0, Math.floor(progress * 60 + 1));
  const indexPts: string[] = [];
  const targetPts: string[] = [];
  for (let i = 0; i < numPts; i++) {
    const t = i / 60;
    const x = CX + t * CW;
    const idxVal = Math.pow(1.07, t * 25);
    const tgtVal = Math.pow(1.063, t * 25);
    indexPts.push(`${x},${CBOTTOM - idxVal * CSCALE}`);
    targetPts.push(`${x},${CBOTTOM - tgtVal * CSCALE}`);
  }

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center', padding: '0 60px',
      }}>
        <p style={headline(64, BLACK)}>THE REAL COST</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          $300K over 25 years
        </p>
      </div>

      <svg width="1080" height="880" viewBox="0 0 1080 880" style={{ position: 'absolute', top: 300, left: 0 }}>
        <line x1={CX} y1={CBOTTOM - 520} x2={CX} y2={CBOTTOM} stroke="#CCC" strokeWidth="2" />
        <line x1={CX} y1={CBOTTOM} x2={CX + CW + 20} y2={CBOTTOM} stroke="#CCC" strokeWidth="2" />

        {[1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={CX} y1={CBOTTOM - i * 104} x2={CX + CW} y2={CBOTTOM - i * 104}
            stroke="#EEE" strokeWidth="1" strokeDasharray="8 6" />
        ))}

        {indexPts.length > 1 && (
          <polyline points={indexPts.join(' ')} fill="none" stroke="#10B981" strokeWidth="7"
            strokeLinecap="round" strokeLinejoin="round" />
        )}
        {targetPts.length > 1 && (
          <polyline points={targetPts.join(' ')} fill="none" stroke={ACCENT} strokeWidth="7"
            strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22 10" />
        )}

        <circle cx="100" cy="806" r="10" fill="#10B981" />
        <text x="122" y="813" fill="#10B981" fontFamily={FONT} fontSize="22">INDEX FUND (0.03%)</text>
        <line x1="430" y1="806" x2="476" y2="806" stroke={ACCENT} strokeWidth="6" strokeDasharray="14 6" />
        <text x="490" y="813" fill={ACCENT} fontFamily={FONT} fontSize="22">TARGET DATE (0.80%)</text>

        <text x={CX + CW / 2} y={CBOTTOM + 42} textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="26">
          YEAR {yearDisplay}
        </text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#666', margin: 0, textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          Fee gap costs you
        </p>
        <p style={headline(92, ACCENT)}>${gapDisplay.toLocaleString()}</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5 — Bond Drag: donut chart shows 40% bonds ────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pieSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const pieScale = interpolate(pieSpring, [0, 1], [0.2, 1]);
  const bondGlow = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.14));
  const statOpacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const CX = 540;
  const CY = 680;
  const R = 220;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity, padding: '0 60px' }}>
        <p style={headline(58, WHITE)}>THE SECOND PROBLEM</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 10 }}>YOUR FUND'S BONDS</p>
      </div>

      <svg width="1080" height="1260" viewBox="0 0 1080 1260" style={{ position: 'absolute', top: 270, left: 0 }}>
        <g transform={`translate(${CX} ${CY}) scale(${pieScale}) translate(-${CX} -${CY})`}>
          <path d={arcPath(CX, CY, R, 0, 216)} fill="#10B981" opacity="0.9" />
          <path d={arcPath(CX, CY, R, 216, 360)} fill={ACCENT} opacity={bondGlow} />
          <circle cx={CX} cy={CY} r={R * 0.4} fill={BG_DARK} />
          <text x={CX} y={CY - 12} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="24">YOUR</text>
          <text x={CX} y={CY + 22} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="24">FUND</text>
        </g>

        <rect x="180" y="486" width="24" height="24" fill="#10B981" rx="4" />
        <text x="216" y="506" fill={WHITE} fontFamily={FONT} fontSize="28">STOCKS 60%</text>
        <rect x="180" y="526" width="24" height="24" fill={ACCENT} rx="4" />
        <text x="216" y="546" fill={ACCENT} fontFamily={FONT} fontSize="28">BONDS 40% &#8592; this</text>

        <text x="540" y="1000" textAnchor="middle" fill="#888" fontFamily={FONT} fontSize="28" opacity={statOpacity}>
          bonds underperform stocks over decades
        </text>
        <text x="540" y="1068" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="62" fontWeight="bold" opacity={statOpacity}>
          $40,000 SLOWER
        </text>
        <text x="540" y="1124" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="30" opacity={statOpacity}>
          in growth vs 100% stocks
        </text>
      </svg>
    </FadeScene>
  );
};
// END SCENE 5

// ─── Scene 6 — CTA: switch in 10 minutes, save $127K ────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-100, 0]);

  const card1Spring = spring({ frame, fps, config: { stiffness: 60, damping: 22 } });
  const card1X = interpolate(card1Spring, [0, 1], [-400, 0]);

  const arrowOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card2Spring = spring({ frame: Math.max(0, frame - 50), fps, config: { stiffness: 60, damping: 22 } });
  const card2X = interpolate(card2Spring, [0, 1], [400, 0]);

  const checkSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { stiffness: 160, damping: 22 } });
  const checkOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 145), fps, config: { stiffness: 60, damping: 22 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [120, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 88, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center', padding: '0 60px',
      }}>
        <p style={headline(56, BLACK)}>THE 10-MINUTE FIX</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          that saves six figures
        </p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 40, right: 40, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{
          flex: 1, transform: `translateX(${card1X}px)`,
          border: `5px solid ${ACCENT}`, borderRadius: 28,
          padding: '36px 20px', textAlign: 'center', background: '#FFFBEB',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#999', margin: 0, letterSpacing: '0.1em' }}>CURRENT FUND</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '12px 0 6px' }}>Target Date 2055</p>
          <p style={headline(52, ACCENT)}>0.80%</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#888', margin: '4px 0 0' }}>expense ratio</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: ACCENT, margin: '10px 0 0' }}>+40% bonds drag</p>
        </div>

        <div style={{ opacity: arrowOpacity, color: ACCENT, fontFamily: FONT, fontSize: 56, flexShrink: 0, lineHeight: 1 }}>&#8594;</div>

        <div style={{
          flex: 1, transform: `translateX(${card2X}px)`,
          border: '5px solid #10B981', borderRadius: 28,
          padding: '36px 20px', textAlign: 'center', background: '#ECFDF5',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#999', margin: 0, letterSpacing: '0.1em' }}>SWITCH TO</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '12px 0 6px' }}>S&amp;P 500 Index Fund</p>
          <p style={headline(52, '#10B981')}>0.03%</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#888', margin: '4px 0 0' }}>expense ratio</p>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', transform: `scale(${checkSpring})`, opacity: checkOpacity }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="32" fill="#10B981" />
              <polyline points="16,37 29,50 54,22" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 72, left: 50, right: 50,
        transform: `translateY(${ctaY}px)`,
        background: BLACK, borderRadius: 22, padding: '34px 44px', textAlign: 'center',
      }}>
        <p style={headline(28, WHITE)}>CHECK EXPENSE RATIO</p>
        <p style={{ ...headline(30, ACCENT), marginTop: 8 }}>ABOVE 0.1% &#8594; SWITCH</p>
        <p style={headline(64, WHITE)}>$127,000 SAVED</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', marginTop: 10, textAlign: 'center' }}>
          ten minutes. one login. life-changing math.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────

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
