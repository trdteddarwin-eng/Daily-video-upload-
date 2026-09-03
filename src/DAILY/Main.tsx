import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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
  const storeOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [50, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p1X = interpolate(frame, [60, 130], [-70, 170], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2X = interpolate(frame, [78, 148], [-70, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p3X = interpolate(frame, [96, 166], [-70, 310], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [170, 208], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px 50px' }}>
        <p style={{ ...headline(42, WHITE), transform: `scale(${titleScale})` }}>DOLLAR STORE TRAP</p>

        <svg width="420" height="350" viewBox="0 0 420 350" opacity={storeOp}>
          {/* Badge above store */}
          <g opacity={badgeOp}>
            <rect x="75" y="4" width="270" height="36" rx="18" fill={ACCENT} />
            <text x="210" y="27" fontFamily="Arial Black" fontSize="17" fill={WHITE} textAnchor="middle">36,000 LOCATIONS USA</text>
          </g>

          {/* Store building */}
          <rect x="20" y="54" width="380" height="200" rx="8" fill="#1A1A1A" stroke={ACCENT} strokeWidth="2.5" />
          {/* Roof band */}
          <rect x="20" y="54" width="380" height="52" rx="8" fill={ACCENT} />
          <rect x="20" y="88" width="380" height="18" fill={ACCENT} />
          <text x="210" y="90" fontFamily="Arial Black" fontSize="24" fill={WHITE} textAnchor="middle">DOLLAR DEALS</text>

          {/* Window 1 */}
          <rect x="40" y="124" width="110" height="82" rx="6" fill="#222" stroke="#444" strokeWidth="1" />
          <text x="95" y="168" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="middle">$1.25</text>
          <text x="95" y="194" fontFamily="Arial" fontSize="13" fill="#888" textAnchor="middle">EVERYTHING!</text>

          {/* Window 2 */}
          <rect x="165" y="124" width="110" height="82" rx="6" fill="#222" stroke="#444" strokeWidth="1" />
          <text x="220" y="168" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="middle">$1.25</text>
          <text x="220" y="194" fontFamily="Arial" fontSize="13" fill="#888" textAnchor="middle">SAVE MORE!</text>

          {/* Door */}
          <rect x="296" y="148" width="78" height="106" rx="5" fill="#151515" stroke="#555" strokeWidth="2" />
          <circle cx="308" cy="204" r="5" fill="#777" />

          {/* Sidewalk */}
          <rect x="0" y="254" width="420" height="36" fill="#1C1C1C" />
          <line x1="0" y1="254" x2="420" y2="254" stroke="#333" strokeWidth="2" />

          {/* Person silhouettes walking toward door */}
          {[{ x: p1X, fill: '#555' }, { x: p2X, fill: '#666' }, { x: p3X, fill: '#484848' }].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 216)`}>
              <circle cx="0" cy="-30" r="13" fill={p.fill} />
              <rect x="-10" y="-17" width="20" height="26" rx="5" fill={p.fill} />
              <rect x="-15" y="9" width="9" height="18" rx="3" fill={p.fill} />
              <rect x="6" y="9" width="9" height="18" rx="3" fill={p.fill} />
            </g>
          ))}
        </svg>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={{ ...headline(26, ACCENT) }}>54 MILLION SHOPPERS / WEEK</p>
          <p style={{ ...headline(20, WHITE), marginTop: 8 }}>ALL THINKING THEY'RE SAVING MONEY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1Op = interpolate(frame, [18, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Op = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1W = interpolate(frame, [95, 160], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [125, 190], [0, 58], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [188, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 188), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(42, BLACK), opacity: titleOp }}>THE UNIT PRICE MATH</p>

        <svg width="440" height="370" viewBox="0 0 440 370">
          {/* Dollar Store bottle */}
          <g opacity={b1Op}>
            <text x="100" y="18" fontFamily="Arial Black" fontSize="15" fill={ACCENT} textAnchor="middle">DOLLAR STORE</text>
            <rect x="48" y="32" width="104" height="144" rx="16" fill="#3A72C4" />
            <rect x="66" y="22" width="68" height="22" rx="8" fill="#2556A0" />
            <rect x="52" y="72" width="96" height="82" rx="6" fill={WHITE} opacity="0.92" />
            <text x="100" y="100" fontFamily="Arial Black" fontSize="13" fill={BLACK} textAnchor="middle">CLEAN-X</text>
            <text x="100" y="120" fontFamily="Arial" fontSize="11" fill="#555" textAnchor="middle">Laundry Det.</text>
            <text x="100" y="140" fontFamily="Arial" fontSize="11" fill="#888" textAnchor="middle">5.7 oz</text>
            <rect x="50" y="186" width="100" height="34" rx="8" fill={ACCENT} />
            <text x="100" y="209" fontFamily="Arial Black" fontSize="21" fill={WHITE} textAnchor="middle">$1.25</text>
            <text x="100" y="238" fontFamily="Arial Black" fontSize="15" fill={ACCENT} textAnchor="middle">22¢ per oz</text>
          </g>

          {/* VS */}
          <text x="220" y="130" fontFamily="Arial Black" fontSize="26" fill={BLACK} textAnchor="middle" opacity={b2Op}>VS</text>

          {/* Bulk/Costco bottle */}
          <g opacity={b2Op}>
            <text x="338" y="18" fontFamily="Arial Black" fontSize="15" fill={GREEN} textAnchor="middle">BULK STORE</text>
            <rect x="284" y="28" width="108" height="180" rx="16" fill="#3A72C4" />
            <rect x="302" y="16" width="72" height="24" rx="8" fill="#2556A0" />
            <rect x="288" y="68" width="100" height="112" rx="6" fill={WHITE} opacity="0.92" />
            <text x="338" y="98" fontFamily="Arial Black" fontSize="13" fill={BLACK} textAnchor="middle">CLEAN-X</text>
            <text x="338" y="118" fontFamily="Arial" fontSize="11" fill="#555" textAnchor="middle">Laundry Det.</text>
            <text x="338" y="140" fontFamily="Arial Black" fontSize="14" fill={GREEN} textAnchor="middle">185 oz</text>
            <text x="338" y="162" fontFamily="Arial" fontSize="11" fill="#888" textAnchor="middle">$11.09</text>
            <rect x="284" y="218" width="108" height="34" rx="8" fill={GREEN} />
            <text x="338" y="241" fontFamily="Arial Black" fontSize="21" fill={WHITE} textAnchor="middle">$11.09</text>
            <text x="338" y="268" fontFamily="Arial Black" fontSize="15" fill={GREEN} textAnchor="middle">6¢ per oz</text>
          </g>

          {/* Comparison bars */}
          <text x="10" y="296" fontFamily="Arial Black" fontSize="13" fill={ACCENT} opacity={b1Op}>22¢/oz — DOLLAR STORE</text>
          <rect x="10" y="304" width={bar1W} height="22" rx="5" fill={ACCENT} opacity={b1Op} />

          <text x="10" y="342" fontFamily="Arial Black" fontSize="13" fill={GREEN} opacity={b2Op}>6¢/oz — BULK STORE</text>
          <rect x="10" y="350" width={bar2W} height="22" rx="5" fill={GREEN} opacity={b2Op} />
        </svg>

        <p style={{ ...headline(34, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>
          SAME CLEAN. NEARLY 4X THE PRICE.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pkgOp = interpolate(frame, [18, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigPrice = interpolate(frame, [18, 55], [0, 52], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const smallOz = interpolate(frame, [18, 55], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainOp = interpolate(frame, [88, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blindOp = interpolate(frame, [132, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [162, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [196, 224], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 196), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px 50px' }}>
        <p style={{ ...headline(42, WHITE), opacity: titleOp }}>UNIT PRICE BLINDNESS</p>

        <svg width="440" height="390" viewBox="0 0 440 390">
          {/* Package */}
          <g opacity={pkgOp}>
            <rect x="80" y="10" width="200" height="148" rx="12" fill="#1E3A6E" stroke="#3A5FA0" strokeWidth="2" />
            <text x="180" y="40" fontFamily="Arial" fontSize="14" fill={WHITE} textAnchor="middle">SOAP-O DETERGENT</text>
            <text x="180" y="108" fontFamily="Arial Black" fontSize={Math.round(bigPrice)} fill={ACCENT} textAnchor="middle">$1.25</text>
            <text x="180" y="146" fontFamily="Arial" fontSize={Math.round(smallOz)} fill="#666" textAnchor="middle">net wt 5.7 oz</text>
          </g>

          {/* Arrow */}
          <g opacity={arrowOp}>
            <line x1="300" y1="84" x2="356" y2="84" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <polygon points="348,74 368,84 348,94" fill={ACCENT} />
          </g>

          {/* Brain SVG */}
          <g opacity={brainOp}>
            <ellipse cx="344" cy="84" rx="50" ry="38" fill="#2A2A2A" stroke="#444" strokeWidth="2" />
            <ellipse cx="328" cy="82" rx="24" ry="20" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.5" />
            <ellipse cx="360" cy="82" rx="20" ry="20" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.5" />
            <line x1="344" y1="58" x2="344" y2="110" stroke={ACCENT} strokeWidth="1.5" opacity="0.4" />
            <path d="M316,76 Q324,70 332,76" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.6" />
            <path d="M316,88 Q324,82 332,88" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.6" />
            <path d="M354,76 Q362,70 370,76" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.6" />
          </g>

          {/* Blindfold bar */}
          <g opacity={blindOp}>
            <rect x="296" y="74" width="96" height="22" rx="8" fill={ACCENT} />
            <text x="344" y="89" fontFamily="Arial Black" fontSize="11" fill={WHITE} textAnchor="middle">SEES: $1.25</text>
            <text x="344" y="118" fontFamily="Arial Black" fontSize="10" fill={ACCENT} textAnchor="middle">IGNORES: OZ</text>
          </g>

          {/* Info boxes */}
          <g opacity={box1Op}>
            <rect x="10" y="176" width="420" height="68" rx="10" fill="#1E1E1E" stroke={ACCENT} strokeWidth="1.5" />
            <text x="220" y="205" fontFamily="Arial" fontSize="15" fill={WHITE} textAnchor="middle">Your brain sees $1.25 and stops doing math.</text>
            <text x="220" y="232" fontFamily="Arial Black" fontSize="17" fill={ACCENT} textAnchor="middle">RETAILERS ENGINEER THIS ON PURPOSE.</text>
          </g>

          <g opacity={box1Op}>
            <rect x="10" y="260" width="420" height="100" rx="10" fill="#1A0808" stroke={ACCENT} strokeWidth="2" />
            <text x="220" y="292" fontFamily="Arial" fontSize="14" fill="#CCC" textAnchor="middle">Small packages = hidden unit price</text>
            <text x="220" y="318" fontFamily="Arial Black" fontSize="18" fill={ACCENT} textAnchor="middle">THE GOAL: MAKE YOU STOP THINKING</text>
            <text x="220" y="346" fontFamily="Arial" fontSize="13" fill="#888" textAnchor="middle">This is not an accident. It is strategy.</text>
          </g>
        </svg>

        <p style={{ ...headline(26, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>
          DELIBERATE. ENGINEERED. EXPENSIVE.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mapOp = interpolate(frame, [18, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotsProgress = interpolate(frame, [55, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [170, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 12, stiffness: 120 } });

  const dots = [
    { x: 88, y: 208 }, { x: 112, y: 232 }, { x: 72, y: 248 }, { x: 132, y: 218 },
    { x: 98, y: 264 }, { x: 82, y: 240 }, { x: 118, y: 254 }, { x: 148, y: 238 },
    { x: 62, y: 218 }, { x: 158, y: 258 }, { x: 94, y: 274 }, { x: 114, y: 244 },
    { x: 76, y: 228 }, { x: 142, y: 268 },
    { x: 282, y: 128 }, { x: 342, y: 158 }, { x: 312, y: 78 },
  ];
  const numDots = Math.max(0, Math.floor(dotsProgress * dots.length));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(42, BLACK), opacity: titleOp }}>TARGETED BY DESIGN</p>

        <svg width="440" height="360" viewBox="0 0 440 360" opacity={mapOp}>
          {/* City grid */}
          {[50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => (
            <line key={`v${i}`} x1={x} y1="20" x2={x} y2="310" stroke="#DDD" strokeWidth="1" />
          ))}
          {[60, 110, 160, 210, 260, 310].map((y, i) => (
            <line key={`h${i}`} x1="20" y1={y} x2="420" y2={y} stroke="#DDD" strokeWidth="1" />
          ))}

          {/* Low-income zone highlight */}
          <rect x="20" y="158" width="208" height="172" rx="8" fill={ACCENT} opacity="0.1" />
          <rect x="20" y="158" width="208" height="172" rx="8" fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="8,4" />
          <text x="124" y="184" fontFamily="Arial Black" fontSize="12" fill={ACCENT} textAnchor="middle">LOWER-INCOME ZONE</text>

          {/* Dollar store dots appearing */}
          {dots.slice(0, numDots).map((dot, i) => (
            <g key={i}>
              <circle cx={dot.x} cy={dot.y} r="10" fill={ACCENT} opacity="0.9" />
              <text x={dot.x} y={dot.y + 5} fontFamily="Arial Black" fontSize="11" fill={WHITE} textAnchor="middle">$</text>
            </g>
          ))}

          {/* Legend */}
          <circle cx="30" cy="338" r="10" fill={ACCENT} />
          <text x="30" y="343" fontFamily="Arial Black" fontSize="10" fill={WHITE} textAnchor="middle">$</text>
          <text x="50" y="343" fontFamily="Arial" fontSize="14" fill={BLACK}>= Dollar Store Location</text>
        </svg>

        <div style={{ opacity: statOp, transform: `scale(${statScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(34, ACCENT) }}>73% IN LOW-INCOME AREAS</p>
          <p style={{ ...headline(19, BLACK), marginTop: 8 }}>FEWEST ALTERNATIVES. HIGHEST PRICES.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Op = interpolate(frame, [22, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [65, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Op = interpolate(frame, [108, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const overCount = interpolate(frame, [108, 192], [0, 1400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeCount = interpolate(frame, [140, 215], [0, 140000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [208, 224], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 208), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(42, WHITE), opacity: titleOp }}>THE REAL MATH</p>

        <svg width="440" height="350" viewBox="0 0 440 350">
          <g opacity={row1Op}>
            <rect x="10" y="10" width="420" height="72" rx="10" fill="#1E1E1E" />
            <text x="30" y="45" fontFamily="Arial" fontSize="16" fill={WHITE}>Monthly dollar store spend</text>
            <text x="410" y="45" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="end">$60/mo</text>
            <text x="30" y="70" fontFamily="Arial" fontSize="13" fill="#666">soap, cleaning supplies, snacks, etc.</text>
          </g>

          <g opacity={row2Op}>
            <rect x="10" y="96" width="420" height="72" rx="10" fill="#1E1E1E" />
            <text x="30" y="131" fontFamily="Arial" fontSize="16" fill={WHITE}>Equivalent bulk spend</text>
            <text x="410" y="131" fontFamily="Arial Black" fontSize="22" fill={GREEN} textAnchor="end">$43/mo</text>
            <text x="30" y="156" fontFamily="Arial" fontSize="13" fill="#666">same products, reasonable quantities</text>
          </g>

          <line x1="10" y1="182" x2="430" y2="182" stroke={ACCENT} strokeWidth="2" opacity={row3Op} />

          <g opacity={row3Op}>
            <text x="30" y="212" fontFamily="Arial" fontSize="16" fill={WHITE}>Annual overpayment</text>
            <text x="410" y="212" fontFamily="Arial Black" fontSize="28" fill={ACCENT} textAnchor="end">{"$" + Math.round(overCount).toLocaleString()}</text>
          </g>

          <g opacity={row3Op}>
            <rect x="10" y="236" width="420" height="80" rx="10" fill="#2A0808" stroke={ACCENT} strokeWidth="2" />
            <text x="30" y="270" fontFamily="Arial" fontSize="15" fill={WHITE}>Working life total (40 years)</text>
            <text x="410" y="270" fontFamily="Arial Black" fontSize="26" fill={ACCENT} textAnchor="end">{"$" + Math.round(lifetimeCount).toLocaleString()}</text>
            <text x="30" y="304" fontFamily="Arial" fontSize="13" fill="#888">invested at 7% → even more lost to compound growth</text>
          </g>
        </svg>

        <p style={{ ...headline(32, ACCENT), opacity: statOp, transform: `scale(${statScale})` }}>
          $140K TO FEEL LIKE YOU SAVED
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const frontOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const frontFadeOut = interpolate(frame, [65, 105], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const backOp = interpolate(frame, [85, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [138, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [182, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [182, 218], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const combinedFrontOp = frontOp * frontFadeOut;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px 50px' }}>
        <p style={{ ...headline(42, BLACK), transform: `scale(${titleScale})` }}>FLIP THE PACKAGE</p>

        <svg width="420" height="300" viewBox="0 0 420 300">
          {/* Package front — big price, hidden oz */}
          <g opacity={combinedFrontOp}>
            <rect x="110" y="20" width="200" height="180" rx="12" fill="#1E3A6E" stroke="#3A5FA0" strokeWidth="2" />
            <text x="210" y="52" fontFamily="Arial" fontSize="14" fill={WHITE} textAnchor="middle">SOAP-O DETERGENT</text>
            <text x="210" y="130" fontFamily="Arial Black" fontSize="58" fill={ACCENT} textAnchor="middle">$1.25</text>
            <text x="210" y="170" fontFamily="Arial" fontSize="12" fill="#666" textAnchor="middle">net wt 5.7 oz</text>
            <text x="210" y="190" fontFamily="Arial" fontSize="10" fill="#555" textAnchor="middle">(unit price: see panel D)</text>
          </g>

          {/* Package back — unit price revealed */}
          <g opacity={backOp}>
            <rect x="110" y="20" width="200" height="180" rx="12" fill="#0A2A10" stroke={ACCENT} strokeWidth="2.5" />
            <text x="210" y="52" fontFamily="Arial Black" fontSize="13" fill={WHITE} textAnchor="middle">UNIT PRICE INFO</text>
            <line x1="124" y1="60" x2="296" y2="60" stroke="#2A5A30" strokeWidth="1" />
            <text x="210" y="88" fontFamily="Arial" fontSize="13" fill="#CCC" textAnchor="middle">Price per oz:</text>
            <text x="210" y="130" fontFamily="Arial Black" fontSize="42" fill={ACCENT} textAnchor="middle">22¢/oz</text>
            <text x="210" y="158" fontFamily="Arial" fontSize="13" fill="#CCC" textAnchor="middle">vs. bulk: 6¢/oz</text>
            <text x="210" y="188" fontFamily="Arial Black" fontSize="15" fill={ACCENT} textAnchor="middle">YOU PAY 267% MORE</text>
          </g>

          {/* Flip arrow */}
          <g opacity={backOp}>
            <text x="62" y="115" fontFamily="Arial Black" fontSize="13" fill={ACCENT} textAnchor="middle">FLIP IT!</text>
            <path d="M 62,122 Q 62,155 100,162" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <polygon points="95,157 106,166 110,153" fill={ACCENT} />
          </g>

          {/* Piggy bank */}
          <g opacity={piggyOp}>
            <ellipse cx="350" cy="218" rx="50" ry="32" fill={ACCENT} />
            <circle cx="376" cy="196" r="18" fill={ACCENT} />
            <circle cx="382" cy="191" r="5" fill={BLACK} />
            <rect x="332" y="244" width="13" height="20" rx="4" fill={ACCENT} />
            <rect x="352" y="244" width="13" height="20" rx="4" fill={ACCENT} />
            <rect x="372" y="244" width="13" height="20" rx="4" fill={ACCENT} />
            <rect x="363" y="180" width="7" height="20" rx="3" fill={BLACK} />
            <text x="350" y="224" fontFamily="Arial Black" fontSize="18" fill={BLACK} textAnchor="middle">$</text>
          </g>
        </svg>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(32, ACCENT), lineHeight: 1.3 }}>UNIT PRICE = REAL PRICE</p>
          <p style={{ ...headline(20, BLACK), marginTop: 10 }}>FOLLOW FOR MORE MONEY TRAPS</p>
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
