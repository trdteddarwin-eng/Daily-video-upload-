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

// ─── Scene 1: Dark — 36% stat + suited person + empty wallet ─────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 24], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personSpring = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 70 } });
  const badgeOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walletOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walletY = interpolate(frame, [90, 115], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 100, width: '100%', textAlign: 'center',
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{ ...headline(120, ACCENT), lineHeight: 1 }}>36%</h1>
          <h2 style={{ ...headline(44, WHITE), padding: '0 60px', marginTop: 8 }}>OF $250K EARNERS</h2>
          <h2 style={{ ...headline(44, WHITE), padding: '0 60px' }}>STILL BROKE</h2>
        </div>

        <div style={{
          position: 'absolute', top: 430, left: '50%',
          transform: `translateX(-50%) scale(${personSpring})`,
        }}>
          <svg width="220" height="290">
            <circle cx="110" cy="58" r="50" fill={WHITE} />
            <rect x="60" y="114" width="100" height="118" rx="18" fill={WHITE} />
            <rect x="14" y="116" width="46" height="20" rx="9" fill={WHITE} />
            <rect x="160" y="116" width="46" height="20" rx="9" fill={WHITE} />
            <polygon points="110,122 102,152 110,182 118,152" fill={ACCENT} />
            <rect x="72" y="130" width="66" height="26" rx="6" fill={ACCENT} opacity={badgeOpacity} />
            <text x="105" y="148" textAnchor="middle" fill={BLACK} fontSize="13" fontWeight="bold" fontFamily={FONT} opacity={badgeOpacity}>$250K</text>
          </svg>
        </div>

        <div style={{
          position: 'absolute', top: 750, left: '50%',
          transform: `translateX(-50%) translateY(${walletY}px)`,
          opacity: walletOpacity,
        }}>
          <svg width="220" height="118">
            <rect x="10" y="16" width="200" height="88" rx="12" fill="none" stroke={ACCENT} strokeWidth="4" />
            <path d="M10 40 Q110 18 210 40" stroke={ACCENT} strokeWidth="4" fill="none" />
            <circle cx="172" cy="68" r="16" fill="none" stroke={ACCENT} strokeWidth="3" />
            <text x="84" y="76" fill="#666666" fontSize="15" fontFamily={FONT}>EMPTY</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 130, width: '100%', textAlign: 'center', opacity: subOpacity }}>
          <div style={{ display: 'inline-block', background: '#1A1A1A', border: `3px solid ${ACCENT}`, padding: '16px 44px', borderRadius: 16 }}>
            <div style={{ ...headline(22, WHITE), fontFamily: 'Arial,sans-serif' }}>EVEN AT $250K / YEAR</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Light — Parkinson's Law: income + expenses bars in sync ─────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const incomeBarProg = interpolate(frame, [30, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const expBarProg = interpolate(frame, [50, 150], [0, 0.92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 500;
  const MAX_H = 340;
  const incH = Math.max(0, incomeBarProg * MAX_H);
  const expH = Math.max(0, expBarProg * MAX_H);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>PARKINSON'S LAW</h2>
          <p style={{ ...headline(26, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 10 }}>
            OF MONEY
          </p>
        </div>

        <div style={{ position: 'absolute', top: 290, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="800" height="560">
            <line x1="40" y1={BASE_Y} x2="760" y2={BASE_Y} stroke="#CCCCCC" strokeWidth="3" />
            <rect x="100" y={BASE_Y - incH} width="220" height={Math.max(0, incH)} rx="10" fill="#10B981" />
            <text x="210" y={BASE_Y - incH - 16} textAnchor="middle" fill="#10B981" fontSize="24" fontWeight="bold" fontFamily={FONT} opacity={Math.min(1, incomeBarProg * 3)}>INCOME</text>
            <text x="210" y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="bold" fontFamily={FONT}>YOUR PAY</text>
            <rect x="480" y={BASE_Y - expH} width="220" height={Math.max(0, expH)} rx="10" fill="#EF4444" />
            <text x="590" y={BASE_Y - expH - 16} textAnchor="middle" fill="#EF4444" fontSize="24" fontWeight="bold" fontFamily={FONT} opacity={Math.min(1, expBarProg * 3)}>EXPENSES</text>
            <text x="590" y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="bold" fontFamily={FONT}>LIFESTYLE</text>
            <line x1="320" y1={BASE_Y - incH * 0.5} x2="480" y2={BASE_Y - expH * 0.5}
              stroke={ACCENT} strokeWidth="4" strokeDasharray="12 6" opacity={arrowOpacity} />
            <text x="400" y={BASE_Y - incH * 0.5 - 20} textAnchor="middle" fill={ACCENT} fontSize="20" fontWeight="bold" fontFamily={FONT} opacity={arrowOpacity}>ALWAYS FOLLOWS</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 130, width: '100%', textAlign: 'center', opacity: subOpacity }}>
          <div style={{ display: 'inline-block', background: '#EF4444', padding: '16px 44px', borderRadius: 12 }}>
            <div style={{ ...headline(24, WHITE) }}>EXPENSES FILL YOUR INCOME</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Dark — savings rate ~5–7% at every income level ─────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Prog = interpolate(frame, [20, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Prog = interpolate(frame, [60, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3Prog = interpolate(frame, [100, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 460;
  const h1 = Math.max(0, bar1Prog * 160);
  const h2 = Math.max(0, bar2Prog * 270);
  const h3 = Math.max(0, bar3Prog * 370);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 100, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(50, WHITE), padding: '0 40px' }}>SAVINGS RATE:</h2>
          <h1 style={{ ...headline(88, ACCENT), lineHeight: 1 }}>~5–7%</h1>
          <p style={{ ...headline(28, '#888888'), fontFamily: 'Arial,sans-serif', marginTop: 8 }}>AT EVERY INCOME LEVEL</p>
        </div>

        <div style={{ position: 'absolute', top: 390, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="840" height="420">
            <line x1="40" y1={BASE_Y} x2="800" y2={BASE_Y} stroke="#333333" strokeWidth="3" />
            <rect x="80" y={BASE_Y - h1} width="160" height={Math.max(0, h1)} rx="8" fill="#3B82F6" opacity="0.7" />
            <rect x="80" y={BASE_Y - h1} width="160" height={Math.max(0, h1 * 0.07)} rx="8" fill={ACCENT} />
            <text x="160" y={BASE_Y + 32} textAnchor="middle" fill={WHITE} fontSize="18" fontWeight="bold" fontFamily={FONT}>$40K</text>
            <rect x="340" y={BASE_Y - h2} width="160" height={Math.max(0, h2)} rx="8" fill="#3B82F6" opacity="0.7" />
            <rect x="340" y={BASE_Y - h2} width="160" height={Math.max(0, h2 * 0.07)} rx="8" fill={ACCENT} />
            <text x="420" y={BASE_Y + 32} textAnchor="middle" fill={WHITE} fontSize="18" fontWeight="bold" fontFamily={FONT}>$80K</text>
            <rect x="600" y={BASE_Y - h3} width="160" height={Math.max(0, h3)} rx="8" fill="#3B82F6" opacity="0.7" />
            <rect x="600" y={BASE_Y - h3} width="160" height={Math.max(0, h3 * 0.07)} rx="8" fill={ACCENT} />
            <text x="680" y={BASE_Y + 32} textAnchor="middle" fill={WHITE} fontSize="18" fontWeight="bold" fontFamily={FONT}>$160K</text>
            <text x="420" y="26" textAnchor="middle" fill={ACCENT} fontSize="19" fontWeight="bold" fontFamily={FONT} opacity={labelOpacity}>↑ SAVINGS SLIVER STAYS THE SAME</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 130, width: '100%', textAlign: 'center', opacity: labelOpacity }}>
          <div style={{ display: 'inline-block', background: '#1A1A1A', border: `3px solid ${ACCENT}`, padding: '14px 40px', borderRadius: 16 }}>
            <div style={{ ...headline(22, WHITE), fontFamily: 'Arial,sans-serif' }}>INCOME DOUBLED → SAVINGS SAME</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Light — status spending icons with price tags ──────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 70 } });
  const carSpring = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 70 } });
  const dineSpring = spring({ frame: frame - 120, fps, config: { damping: 12, stiffness: 70 } });
  const totalOpacity = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>STATUS</h2>
          <h2 style={{ ...headline(54, ACCENT), padding: '0 40px' }}>SPENDING</h2>
        </div>

        <div style={{
          position: 'absolute', top: 390, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 56, alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center', transform: `scale(${houseSpring})` }}>
            <svg width="150" height="148">
              <rect x="18" y="68" width="114" height="80" rx="6" fill={BLACK} />
              <polygon points="4,72 75,10 146,72" fill={ACCENT} />
              <rect x="56" y="106" width="38" height="42" rx="5" fill={BG_LIGHT} />
              <rect x="24" y="80" width="32" height="24" rx="4" fill={BG_LIGHT} />
              <rect x="94" y="80" width="32" height="24" rx="4" fill={BG_LIGHT} />
            </svg>
            <div style={{ ...headline(20, BLACK), marginTop: 8 }}>+$900/MO</div>
            <div style={{ ...headline(15, '#555555'), marginTop: 4 }}>BIGGER PLACE</div>
          </div>

          <div style={{ textAlign: 'center', transform: `scale(${carSpring})` }}>
            <svg width="160" height="110">
              <rect x="6" y="42" width="148" height="46" rx="12" fill={BLACK} />
              <path d="M22 42 Q36 14 100 14 Q126 14 148 42 Z" fill={BLACK} />
              <path d="M32 40 Q42 20 68 20 L68 40 Z" fill="#87CEEB" opacity="0.7" />
              <path d="M72 40 L72 20 Q98 20 118 40 Z" fill="#87CEEB" opacity="0.7" />
              <circle cx="40" cy="88" r="18" fill="#333333" />
              <circle cx="40" cy="88" r="9" fill="#888888" />
              <circle cx="120" cy="88" r="18" fill="#333333" />
              <circle cx="120" cy="88" r="9" fill="#888888" />
            </svg>
            <div style={{ ...headline(20, BLACK), marginTop: 8 }}>+$450/MO</div>
            <div style={{ ...headline(15, '#555555'), marginTop: 4 }}>NICER CAR</div>
          </div>

          <div style={{ textAlign: 'center', transform: `scale(${dineSpring})` }}>
            <svg width="150" height="148">
              <circle cx="75" cy="76" r="58" fill="none" stroke={BLACK} strokeWidth="6" />
              <circle cx="75" cy="76" r="40" fill="none" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="56" y1="22" x2="56" y2="92" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
              <line x1="48" y1="22" x2="48" y2="52" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
              <line x1="56" y1="22" x2="56" y2="52" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
              <line x1="64" y1="22" x2="64" y2="52" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
              <line x1="96" y1="22" x2="96" y2="92" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
              <path d="M96 22 Q108 38 96 54" fill={BLACK} />
            </svg>
            <div style={{ ...headline(20, BLACK), marginTop: 8 }}>+$350/MO</div>
            <div style={{ ...headline(15, '#555555'), marginTop: 4 }}>DINING OUT</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', opacity: totalOpacity }}>
          <div style={{ ...headline(30, BLACK) }}>TOTAL EXTRA:</div>
          <div style={{ ...headline(78, '#EF4444'), lineHeight: 1 }}>$1,700/MO</div>
          <div style={{ ...headline(28, '#555555'), marginTop: 8 }}>CONSUMED EVERY MONTH</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Dark — pay yourself first flow ──────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const paycheckOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [32, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const firstBadgeSpring = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 60 } });
  const piggySpring = spring({ frame: frame - 85, fps, config: { damping: 12, stiffness: 70 } });
  const thenOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(52, WHITE), padding: '0 40px' }}>PAY YOURSELF</h2>
          <h2 style={{ ...headline(52, ACCENT), padding: '0 40px' }}>FIRST</h2>
        </div>

        <div style={{ position: 'absolute', top: 400, width: '100%', textAlign: 'center', opacity: paycheckOpacity }}>
          <div style={{ ...headline(34, ACCENT) }}>PAYCHECK ARRIVES</div>
        </div>

        <svg width="1080" height="90" style={{ position: 'absolute', top: 462, opacity: arrowOpacity }}>
          <line x1="540" y1="8" x2="540" y2="62" stroke={ACCENT} strokeWidth="6" />
          <polygon points="540,80 520,54 560,54" fill={ACCENT} />
        </svg>

        <div style={{ position: 'absolute', top: 562, width: '100%', textAlign: 'center', transform: `scale(${firstBadgeSpring})` }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '14px 44px', borderRadius: 40 }}>
            <div style={{ ...headline(26, BLACK) }}>SAVINGS — FIRST</div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: 650, left: '50%', transform: `translateX(-50%) scale(${piggySpring})` }}>
          <svg width="260" height="280">
            <ellipse cx="130" cy="168" rx="108" ry="90" fill={ACCENT} />
            <rect x="108" y="78" width="44" height="12" rx="6" fill="#92400E" />
            <ellipse cx="32" cy="142" rx="34" ry="25" fill={ACCENT} opacity="0.85" />
            <ellipse cx="228" cy="142" rx="34" ry="25" fill={ACCENT} opacity="0.85" />
            <ellipse cx="130" cy="192" rx="24" ry="18" fill="#B45309" />
            <circle cx="121" cy="190" r="4" fill={BLACK} />
            <circle cx="139" cy="190" r="4" fill={BLACK} />
            <circle cx="102" cy="152" r="10" fill={BLACK} />
            <circle cx="158" cy="152" r="10" fill={BLACK} />
            <circle cx="105" cy="148" r="3.5" fill={WHITE} />
            <circle cx="161" cy="148" r="3.5" fill={WHITE} />
            <path d="M 114 212 Q 130 226 146 212" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="72" y="252" width="22" height="28" rx="11" fill="#B45309" />
            <rect x="102" y="252" width="22" height="28" rx="11" fill="#B45309" />
            <rect x="136" y="252" width="22" height="28" rx="11" fill="#B45309" />
            <rect x="166" y="252" width="22" height="28" rx="11" fill="#B45309" />
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 200, width: '100%', textAlign: 'center', opacity: thenOpacity }}>
          <div style={{ ...headline(24, '#888888') }}>THEN: SPEND WHATEVER'S LEFT</div>
        </div>

        <div style={{ position: 'absolute', bottom: 120, width: '100%', textAlign: 'center', opacity: ctaOpacity }}>
          <div style={{ ...headline(26, WHITE), padding: '0 80px' }}>AUTOMATE IT — DON'T RELY ON WILLPOWER</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Light — split every raise 50/50 CTA ────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diagramSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 70 } });
  const splitOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsOpacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifestyleOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSpring = spring({ frame: frame - 148, fps, config: { damping: 10, stiffness: 60 } });
  const ctaOpacity = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(50, BLACK), padding: '0 40px' }}>EVERY RAISE:</h2>
          <h2 style={{ ...headline(50, ACCENT), padding: '0 40px' }}>SPLIT IN HALF</h2>
        </div>

        <div style={{ position: 'absolute', top: 330, left: '50%', transform: `translateX(-50%) scale(${diagramSpring})` }}>
          <svg width="820" height="490">
            <line x1="410" y1="24" x2="410" y2="110" stroke={ACCENT} strokeWidth="7" />
            <polygon points="410,12 392,38 428,38" fill={ACCENT} />
            <text x="410" y="140" textAnchor="middle" fill={ACCENT} fontSize="22" fontWeight="bold" fontFamily={FONT}>YOUR RAISE</text>
            <line x1="410" y1="158" x2="410" y2="208" stroke={BLACK} strokeWidth="5" opacity={splitOpacity} />
            <line x1="410" y1="208" x2="180" y2="278" stroke={BLACK} strokeWidth="5" opacity={splitOpacity} />
            <line x1="410" y1="208" x2="640" y2="278" stroke={BLACK} strokeWidth="5" opacity={splitOpacity} />
            <g opacity={savingsOpacity}>
              {[0, 1, 2, 3].map((i) => (
                <rect key={`coin-${i}`} x={100 + i * 4} y={330 - i * 16} width="160" height="46" rx="23"
                  fill={ACCENT} stroke="#92400E" strokeWidth="2" />
              ))}
              <text x="182" y="356" textAnchor="middle" fill={BLACK} fontSize="20" fontWeight="bold" fontFamily={FONT}>$$$</text>
              <text x="182" y="406" textAnchor="middle" fill="#10B981" fontSize="24" fontWeight="bold" fontFamily={FONT}>50% SAVED</text>
            </g>
            <g opacity={lifestyleOpacity}>
              <rect x="572" y="300" width="136" height="104" rx="6" fill="#6B7280" />
              <polygon points="550,304 640,244 730,304" fill="#9CA3AF" />
              <rect x="596" y="340" width="36" height="52" rx="5" fill={BG_LIGHT} />
              <rect x="574" y="316" width="38" height="28" rx="4" fill="#93C5FD" opacity="0.7" />
              <rect x="660" y="316" width="38" height="28" rx="4" fill="#93C5FD" opacity="0.7" />
              <text x="640" y="440" textAnchor="middle" fill="#EF4444" fontSize="24" fontWeight="bold" fontFamily={FONT}>50% SPEND</text>
            </g>
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 110, width: '100%', textAlign: 'center',
          opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ ...headline(32, BLACK) }}>THAT ONE HABIT =</div>
          <div style={{ ...headline(76, ACCENT), lineHeight: 1 }}>7 FIGURES</div>
          <div style={{ ...headline(26, '#555555'), marginTop: 8 }}>FOLLOW FOR MORE</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

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
