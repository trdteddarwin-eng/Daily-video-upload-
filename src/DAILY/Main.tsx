import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0E0E0E';
const BG_LIGHT = '#F5F0EB';
const ACCENT = '#EF4444';
const ACCENT_GREEN = '#22C55E';
const WHITE = '#F5F0EB';
const BLACK = '#0E0E0E';
const MUTED = '#9CA3AF';
const MUTED2 = '#6B7280';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
});

const body = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT_BODY,
  fontSize: size,
  color,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.4,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── Scene 1: Hook — Fund Lost + IRS Tax Bill ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProg = spring({ frame, fps, config: { damping: 14, stiffness: 80, mass: 0.9 } });
  const titleY = interpolate(titleProg, [0, 1], [80, 0]);

  const chartProg = interpolate(frame, [18, 90], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const billProg = interpolate(frame, [75, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const billX = interpolate(billProg, [0, 1], [220, 0]);

  const tagProg = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Chart path — descending line across 520px wide, 200px tall
  const W = 520;
  const H = 200;
  const pts = [
    [0, 30], [80, 20], [160, 55], [240, 80], [320, 110], [400, 150], [520, 190],
  ] as [number, number][];

  const totalLen = pts.length - 1;
  const rawIdx = chartProg * totalLen;
  const segIdx = Math.min(Math.floor(rawIdx), totalLen - 1);
  const segT = rawIdx - segIdx;
  const [ax, ay] = pts[segIdx];
  const [bx, by] = pts[segIdx + 1] ?? pts[segIdx];
  const endX = ax + (bx - ax) * segT;
  const endY = ay + (by - ay) * segT;

  const visiblePts = pts.slice(0, segIdx + 1).concat([[endX, endY]]);
  const linePath = visiblePts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const areaPath = `${linePath} L ${endX} ${H} L 0 ${H} Z`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Subtle grid */}
      <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}>
        {[300, 400, 500, 600, 700].map((y) => (
          <line key={y} x1="0" y1={y} x2="1080" y2={y} stroke={MUTED2} strokeWidth="1" />
        ))}
      </svg>

      {/* TAG */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: tagProg,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 10, paddingTop: 10, paddingBottom: 10,
          paddingLeft: 36, paddingRight: 36,
        }}>
          <p style={{ ...headline(30, WHITE), letterSpacing: '0.2em' }}>TAX TRAP</p>
        </div>
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute', top: 220, left: 60, right: 60,
        transform: `translateY(${titleY}px)`,
        opacity: titleProg,
      }}>
        <p style={{ ...headline(84, WHITE) }}>YOUR FUND</p>
        <p style={{ ...headline(100, ACCENT), marginTop: 8 }}>LOST 15%</p>
      </div>

      {/* Chart */}
      <div style={{ position: 'absolute', top: 460, left: 80, right: 80 }}>
        <svg width="920" height="220" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <path d={areaPath} fill={ACCENT} fillOpacity="0.15" />
          <path d={linePath} stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={endX} cy={endY} r="9" fill={ACCENT} opacity={chartProg > 0.05 ? 1 : 0} />
        </svg>
        {/* Down label */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, opacity: chartProg }}>
          <p style={{ ...body(32, ACCENT), fontFamily: FONT, fontWeight: 900 }}>▼ 15%</p>
        </div>
      </div>

      {/* IRS Tax Bill card */}
      <div style={{
        position: 'absolute', top: 760, left: 60, right: 60,
        transform: `translateX(${billX}px)`,
        opacity: billProg,
      }}>
        <div style={{
          background: '#1C1C1C',
          border: `3px solid ${ACCENT}`,
          borderRadius: 24,
          paddingTop: 36, paddingBottom: 36, paddingLeft: 48, paddingRight: 48,
        }}>
          <p style={{ ...headline(34, MUTED), letterSpacing: '0.2em', marginBottom: 10 }}>IRS NOTICE</p>
          <p style={{ ...headline(54, MUTED2), marginBottom: 6 }}>YOU OWE</p>
          <p style={{ ...headline(130, WHITE) }}>$3,200</p>
          <p style={{ ...body(34, MUTED), marginTop: 12 }}>Capital Gains Tax</p>
        </div>
      </div>

      {/* Question subtext */}
      <div style={{
        position: 'absolute', bottom: 200, left: 0, right: 0,
        opacity: billProg,
      }}>
        <p style={{ ...body(38, MUTED), fontStyle: 'italic' }}>But your fund lost money…</p>
      </div>
    </FadeScene>
  );
};

// ── Scene 2: How It Works — Fund Manager Sells Stocks → Tax Passed to You ─
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProg = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const headY = interpolate(headProg, [0, 1], [50, 0]);

  const managerProg = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const investorProg = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelProg = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Arrow line progress
  const arrowW = interpolate(arrowProg, [0, 1], [0, 380]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Headline */}
      <div style={{
        position: 'absolute', top: 140, left: 60, right: 60,
        transform: `translateY(${headY}px)`, opacity: headProg,
      }}>
        <p style={{ ...headline(62, BLACK) }}>How It Works</p>
        <p style={{ ...body(36, MUTED2), marginTop: 16 }}>Fund managers sell stocks all year inside your fund</p>
      </div>

      {/* FUND MANAGER figure */}
      <div style={{
        position: 'absolute', top: 420, left: 80,
        opacity: managerProg,
        transform: `scale(${0.6 + 0.4 * managerProg})`,
      }}>
        <svg width="200" height="260" viewBox="0 0 200 260">
          {/* Head */}
          <circle cx="100" cy="60" r="44" fill={BLACK} />
          {/* Body */}
          <rect x="58" y="110" width="84" height="90" rx="12" fill={BLACK} />
          {/* Legs */}
          <rect x="65" y="196" width="28" height="56" rx="8" fill={BLACK} />
          <rect x="107" y="196" width="28" height="56" rx="8" fill={BLACK} />
          {/* Arms */}
          <rect x="14" y="116" width="46" height="22" rx="10" fill={BLACK} />
          <rect x="140" y="116" width="46" height="22" rx="10" fill={BLACK} />
          {/* Tie */}
          <polygon points="100,110 88,140 100,155 112,140" fill={ACCENT} />
        </svg>
        <p style={{ ...body(28, BLACK), marginTop: 8, fontWeight: 700 }}>FUND MANAGER</p>
        {/* Stock papers */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 60 + i * 14,
            left: 160 + i * 10,
            width: 56,
            height: 44,
            background: WHITE,
            border: `2px solid ${ACCENT}`,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${(i - 1) * 8}deg)`,
            opacity: managerProg,
          }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: ACCENT, margin: 0, fontWeight: 700 }}>$ SELL</p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div style={{ position: 'absolute', top: 540, left: 260 }}>
        <svg width="400" height="40" viewBox="0 0 400 40">
          <line x1="0" y1="20" x2={arrowW} y2="20" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          {arrowProg > 0.85 && (
            <polygon points="380,8 400,20 380,32" fill={ACCENT} />
          )}
        </svg>
        <p style={{ ...body(26, ACCENT), marginTop: 4, opacity: arrowProg, fontWeight: 700 }}>CAPITAL GAINS PASS-THROUGH</p>
      </div>

      {/* INVESTOR figure */}
      <div style={{
        position: 'absolute', top: 420, right: 80,
        opacity: investorProg,
        transform: `scale(${0.6 + 0.4 * investorProg})`,
      }}>
        <svg width="200" height="260" viewBox="0 0 200 260">
          <circle cx="100" cy="60" r="44" fill={BLACK} />
          <rect x="58" y="110" width="84" height="90" rx="12" fill={BLACK} />
          <rect x="65" y="196" width="28" height="56" rx="8" fill={BLACK} />
          <rect x="107" y="196" width="28" height="56" rx="8" fill={BLACK} />
          <rect x="14" y="116" width="46" height="22" rx="10" fill={BLACK} />
          <rect x="140" y="116" width="46" height="22" rx="10" fill={BLACK} />
        </svg>
        <p style={{ ...body(28, BLACK), marginTop: 8, fontWeight: 700 }}>YOU</p>
        {/* Envelope/tax notice */}
        <div style={{
          position: 'absolute', top: 50, right: 150,
          opacity: investorProg,
        }}>
          <svg width="80" height="60" viewBox="0 0 80 60">
            <rect x="2" y="2" width="76" height="56" rx="6" fill={ACCENT} />
            <polyline points="2,2 40,34 78,2" stroke={WHITE} strokeWidth="4" fill="none" />
          </svg>
          <p style={{ ...body(20, ACCENT), fontWeight: 700, marginTop: 2 }}>TAX BILL</p>
        </div>
      </div>

      {/* Bottom Label */}
      <div style={{
        position: 'absolute', bottom: 180, left: 60, right: 60,
        opacity: labelProg,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14,
          paddingTop: 20, paddingBottom: 20, paddingLeft: 40, paddingRight: 40,
        }}>
          <p style={{ ...headline(40, WHITE) }}>CAPITAL GAINS DISTRIBUTION</p>
          <p style={{ ...body(30, WHITE), marginTop: 8 }}>Your fund's trades = your tax bill</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Scene 3: The Number — 8.3% Average Distribution ───────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headY = interpolate(headProg, [0, 1], [60, 0]);

  const barProg = interpolate(frame, [30, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctValue = 8.3 * barProg;

  const dollarProg = interpolate(frame, [110, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarCount = Math.round(8300 * dollarProg);

  const noteProg = interpolate(frame, [165, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_MAX_H = 340;
  const barH = BAR_MAX_H * barProg;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Headline */}
      <div style={{
        position: 'absolute', top: 130, left: 60, right: 60,
        transform: `translateY(${headY}px)`, opacity: headProg,
      }}>
        <p style={{ ...headline(54, WHITE) }}>Average Mutual Fund</p>
        <p style={{ ...headline(54, ACCENT) }}>Capital Gains Distribution</p>
        <p style={{ ...body(34, MUTED), marginTop: 14 }}>2022 — a down year for markets</p>
      </div>

      {/* Bar chart */}
      <div style={{ position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        <div style={{ position: 'relative', width: 200 }}>
          {/* Bar */}
          <div style={{
            width: 200,
            height: barH,
            background: ACCENT,
            borderRadius: '12px 12px 0 0',
          }} />
          {/* % label on bar */}
          <div style={{
            position: 'absolute', top: -60, left: 0, right: 0,
            opacity: barProg > 0.1 ? 1 : 0,
          }}>
            <p style={{ ...headline(70, ACCENT) }}>{pctValue.toFixed(1)}%</p>
          </div>
          {/* Base line */}
          <div style={{ height: 4, background: MUTED2, width: 300, marginLeft: -50 }} />
          <p style={{ ...body(28, MUTED), marginTop: 8, textAlign: 'center' }}>OF PORTFOLIO VALUE</p>
        </div>
      </div>

      {/* Dollar equivalent */}
      <div style={{
        position: 'absolute', bottom: 280, left: 60, right: 60,
        opacity: dollarProg,
      }}>
        <div style={{
          background: '#1C1C1C', border: `2px solid ${ACCENT}`,
          borderRadius: 20,
          paddingTop: 28, paddingBottom: 28, paddingLeft: 40, paddingRight: 40,
        }}>
          <p style={{ ...body(34, MUTED), marginBottom: 10 }}>On a $100,000 portfolio</p>
          <p style={{ ...headline(90, WHITE) }}>${dollarCount.toLocaleString()}</p>
          <p style={{ ...body(32, ACCENT), marginTop: 8 }}>in surprise taxable income</p>
        </div>
      </div>

      {/* Note */}
      <div style={{
        position: 'absolute', bottom: 170, left: 60, right: 60,
        opacity: noteProg,
      }}>
        <p style={{ ...body(28, MUTED2) }}>Money you never touched. Never sold. Never moved.</p>
      </div>
    </FadeScene>
  );
};

// ── Scene 4: The Twist — Fund Drops AND You Owe Taxes ─────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headY = interpolate(headProg, [0, 1], [50, 0]);

  const leftProg = interpolate(frame, [28, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightProg = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const centerProg = interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelProg = interpolate(frame, [155, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftArrowH = interpolate(leftProg, [0, 1], [0, 200]);
  const rightArrowH = interpolate(rightProg, [0, 1], [0, 200]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Headline */}
      <div style={{
        position: 'absolute', top: 130, left: 60, right: 60,
        transform: `translateY(${headY}px)`, opacity: headProg,
      }}>
        <p style={{ ...headline(58, BLACK) }}>Here's the</p>
        <p style={{ ...headline(80, ACCENT) }}>Wild Part</p>
      </div>

      {/* Left side — Fund drops */}
      <div style={{
        position: 'absolute', top: 360, left: 60,
        width: 420,
        opacity: leftProg,
      }}>
        <div style={{
          background: '#FEF2F2', border: `3px solid ${ACCENT}`,
          borderRadius: 20,
          paddingTop: 32, paddingBottom: 32, paddingLeft: 28, paddingRight: 28,
        }}>
          <p style={{ ...body(32, MUTED2), marginBottom: 10 }}>Your fund</p>
          <svg width="80" height={leftArrowH} viewBox={`0 0 80 ${Math.max(4, leftArrowH)}`} style={{ display: 'block', margin: '0 auto' }}>
            <line x1="40" y1="0" x2="40" y2={leftArrowH - 20} stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
            <polygon points={`40,${leftArrowH} 24,${leftArrowH - 24} 56,${leftArrowH - 24}`} fill={ACCENT} />
          </svg>
          <p style={{ ...headline(80, ACCENT), marginTop: 10 }}>-15%</p>
          <p style={{ ...body(28, MUTED2), marginTop: 8 }}>Your portfolio lost value</p>
        </div>
      </div>

      {/* Plus / AND */}
      <div style={{
        position: 'absolute', top: 560, left: 490, right: 490,
        display: 'flex', justifyContent: 'center',
        opacity: centerProg,
        zIndex: 10,
      }}>
        <div style={{
          width: 80, height: 80,
          background: BLACK, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 48, color: WHITE, margin: 0 }}>+</p>
        </div>
      </div>

      {/* Right side — Tax Bill */}
      <div style={{
        position: 'absolute', top: 360, right: 60,
        width: 420,
        opacity: rightProg,
      }}>
        <div style={{
          background: '#FEF2F2', border: `3px solid ${ACCENT}`,
          borderRadius: 20,
          paddingTop: 32, paddingBottom: 32, paddingLeft: 28, paddingRight: 28,
        }}>
          <p style={{ ...body(32, MUTED2), marginBottom: 10 }}>Your tax bill</p>
          <svg width="80" height={rightArrowH} viewBox={`0 0 80 ${Math.max(4, rightArrowH)}`} style={{ display: 'block', margin: '0 auto' }}>
            <line x1="40" y1={rightArrowH} x2="40" y2="20" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
            <polygon points={`40,0 24,24 56,24`} fill={ACCENT} />
          </svg>
          <p style={{ ...headline(80, ACCENT), marginTop: 10 }}>$3,200</p>
          <p style={{ ...body(28, MUTED2), marginTop: 8 }}>IRS capital gains notice</p>
        </div>
      </div>

      {/* Bottom verdict */}
      <div style={{
        position: 'absolute', bottom: 180, left: 60, right: 60,
        opacity: labelProg,
      }}>
        <div style={{ background: ACCENT, borderRadius: 18, paddingTop: 24, paddingBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
          <p style={{ ...headline(48, WHITE) }}>BOTH. AT THE SAME TIME.</p>
          <p style={{ ...body(32, WHITE), marginTop: 12 }}>100% legal. Affects millions every year.</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Scene 5: The Fix — ETF vs Mutual Fund ─────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headY = interpolate(headProg, [0, 1], [50, 0]);

  const card1Prog = interpolate(frame, [30, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Prog = interpolate(frame, [80, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = interpolate(frame, [145, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Headline */}
      <div style={{
        position: 'absolute', top: 130, left: 60, right: 60,
        transform: `translateY(${headY}px)`, opacity: headProg,
      }}>
        <p style={{ ...headline(62, WHITE) }}>The Fix</p>
        <p style={{ ...body(36, MUTED), marginTop: 12 }}>Same stocks. Zero distributions.</p>
      </div>

      {/* Mutual Fund Card */}
      <div style={{
        position: 'absolute', top: 360, left: 50,
        width: 440,
        opacity: card1Prog,
        transform: `translateY(${interpolate(card1Prog, [0, 1], [40, 0])}px)`,
      }}>
        <div style={{
          background: '#1C0000', border: `3px solid ${ACCENT}`,
          borderRadius: 24,
          paddingTop: 36, paddingBottom: 36, paddingLeft: 32, paddingRight: 32,
        }}>
          <p style={{ ...headline(32, MUTED2), marginBottom: 16, letterSpacing: '0.15em' }}>MUTUAL FUND</p>
          {/* Fund icon */}
          <svg width="100" height="80" viewBox="0 0 100 80" style={{ display: 'block', margin: '0 auto 16px' }}>
            <rect x="5" y="30" width="18" height="40" rx="3" fill={ACCENT} />
            <rect x="30" y="15" width="18" height="55" rx="3" fill={ACCENT} />
            <rect x="55" y="20" width="18" height="50" rx="3" fill={ACCENT} />
            <rect x="80" y="5" width="18" height="65" rx="3" fill={ACCENT} />
          </svg>
          <div style={{ marginTop: 8 }}>
            <p style={{ ...headline(58, ACCENT) }}>8.3%</p>
            <p style={{ ...body(28, MUTED), marginTop: 6 }}>avg. capital gains dist.</p>
          </div>
          {/* Red X */}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="32" fill="#3F0000" stroke={ACCENT} strokeWidth="3" />
              <line x1="18" y1="18" x2="52" y2="52" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
              <line x1="52" y1="18" x2="18" y2="52" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ ...body(28, ACCENT), marginTop: 10, fontWeight: 700 }}>Surprise tax every year</p>
        </div>
      </div>

      {/* ETF Card */}
      <div style={{
        position: 'absolute', top: 360, right: 50,
        width: 440,
        opacity: card2Prog,
        transform: `translateY(${interpolate(card2Prog, [0, 1], [40, 0])}px)`,
      }}>
        <div style={{
          background: '#001C0A', border: `3px solid ${ACCENT_GREEN}`,
          borderRadius: 24,
          paddingTop: 36, paddingBottom: 36, paddingLeft: 32, paddingRight: 32,
        }}>
          <p style={{ ...headline(32, MUTED2), marginBottom: 16, letterSpacing: '0.15em' }}>ETF</p>
          {/* ETF icon */}
          <svg width="100" height="80" viewBox="0 0 100 80" style={{ display: 'block', margin: '0 auto 16px' }}>
            <polyline points="5,70 25,50 45,55 65,30 85,10" stroke={ACCENT_GREEN} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="85" cy="10" r="7" fill={ACCENT_GREEN} />
          </svg>
          <div style={{ marginTop: 8 }}>
            <p style={{ ...headline(58, ACCENT_GREEN) }}>0.04%</p>
            <p style={{ ...body(28, MUTED), marginTop: 6 }}>avg. capital gains dist.</p>
          </div>
          {/* Green check */}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="32" fill="#003F15" stroke={ACCENT_GREEN} strokeWidth="3" />
              <polyline points="16,36 28,50 54,22" stroke={ACCENT_GREEN} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ ...body(28, ACCENT_GREEN), marginTop: 10, fontWeight: 700 }}>Almost zero tax drag</p>
        </div>
      </div>

      {/* Arrow pointing to ETF */}
      <div style={{
        position: 'absolute', bottom: 200, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: arrowProg,
      }}>
        <div style={{
          background: ACCENT_GREEN, borderRadius: 14,
          paddingTop: 20, paddingBottom: 20, paddingLeft: 48, paddingRight: 48,
        }}>
          <p style={{ ...headline(44, WHITE) }}>SWITCH TO THE ETF VERSION</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Scene 6: CTA — Check Your Brokerage Account ───────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProg = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const headY = interpolate(headProg, [0, 1], [60, 0]);

  const phoneProg = interpolate(frame, [20, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check1Prog = interpolate(frame, [70, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2Prog = interpolate(frame, [105, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check3Prog = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaProg = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const checks = [
    { label: 'Taxable brokerage account?', prog: check1Prog },
    { label: 'Owns mutual funds (not ETFs)?', prog: check2Prog },
    { label: 'Switch to equivalent ETF version', prog: check3Prog, highlight: true },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Headline */}
      <div style={{
        position: 'absolute', top: 130, left: 60, right: 60,
        transform: `translateY(${headY}px)`, opacity: headProg,
      }}>
        <p style={{ ...headline(62, WHITE) }}>Do This</p>
        <p style={{ ...headline(62, ACCENT_GREEN) }}>Right Now</p>
      </div>

      {/* Phone silhouette */}
      <div style={{
        position: 'absolute', top: 330, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: phoneProg,
        transform: `scale(${0.7 + 0.3 * phoneProg})`,
      }}>
        <svg width="240" height="300" viewBox="0 0 240 300">
          {/* Phone body */}
          <rect x="10" y="10" width="220" height="280" rx="30" fill="#1C1C1C" stroke={MUTED2} strokeWidth="4" />
          {/* Screen */}
          <rect x="24" y="30" width="192" height="242" rx="18" fill="#0D0D0D" />
          {/* App header */}
          <rect x="24" y="30" width="192" height="50" rx="18" fill={ACCENT_GREEN} />
          <text x="120" y="62" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20" fontWeight="900">BROKERAGE</text>
          {/* Notch */}
          <rect x="88" y="10" width="64" height="22" rx="8" fill="#1C1C1C" />
          {/* Screen content bars */}
          <rect x="38" y="100" width="164" height="14" rx="5" fill="#1E1E1E" />
          <rect x="38" y="124" width="120" height="14" rx="5" fill="#1E1E1E" />
          <rect x="38" y="148" width="144" height="14" rx="5" fill="#1E1E1E" />
          <rect x="38" y="190" width="164" height="30" rx="8" fill={ACCENT} fillOpacity="0.7" />
        </svg>
      </div>

      {/* Checklist items */}
      <div style={{ position: 'absolute', top: 680, left: 60, right: 60 }}>
        {checks.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center',
            marginBottom: 22,
            opacity: item.prog,
            transform: `translateX(${interpolate(item.prog, [0, 1], [-40, 0])}px)`,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
              background: item.highlight ? ACCENT_GREEN : '#1E1E1E',
              border: `3px solid ${item.highlight ? ACCENT_GREEN : MUTED2}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: 20,
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28">
                <polyline points="5,14 11,21 23,8" stroke={item.highlight ? WHITE : MUTED} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{
              fontFamily: item.highlight ? FONT : FONT_BODY,
              fontSize: item.highlight ? 36 : 32,
              color: item.highlight ? ACCENT_GREEN : WHITE,
              margin: 0,
              fontWeight: item.highlight ? 900 : 400,
            }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{
        position: 'absolute', bottom: 170, left: 60, right: 60,
        opacity: ctaProg,
        transform: `scale(${0.85 + 0.15 * ctaProg})`,
      }}>
        <div style={{
          background: ACCENT_GREEN, borderRadius: 18,
          paddingTop: 26, paddingBottom: 26, paddingLeft: 40, paddingRight: 40,
        }}>
          <p style={{ ...headline(48, WHITE) }}>TAKES 5 MINUTES</p>
          <p style={{ ...body(30, WHITE), marginTop: 10 }}>Saves thousands every year</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Main Composition ──────────────────────────────────────────────────────
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
