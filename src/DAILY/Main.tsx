import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } });
  const personX = interpolate(frame, [0, dur * 0.65], [150, 510], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const warnOp = interpolate(
    frame,
    [dur * 0.7, dur * 0.78, dur * 0.85, dur * 0.92],
    [0, 1, 0.3, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const subOp = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Big 68% */}
      <div style={{
        position: 'absolute', top: 230, width: '100%', textAlign: 'center',
        transform: `scale(${numScale})`, transformOrigin: 'center',
      }}>
        <p style={{ ...headline(260, ACCENT), lineHeight: 1 }}>68%</p>
        <p style={{ ...headline(50, WHITE) }}>OF WORKERS</p>
      </div>

      {/* Cliff scene */}
      <svg width={1080} height={500} style={{ position: 'absolute', bottom: 290, left: 0 }}>
        <rect x={0} y={380} width={580} height={120} fill="#1e1e1e" />
        <path d="M 0 380 L 580 380 L 580 200" fill="none" stroke={ACCENT} strokeWidth={6} />
        <line x1={580} y1={200} x2={580} y2={500} stroke="#EF4444" strokeWidth={4} strokeDasharray="18 9" />
        <g transform={`translate(${personX}, 0)`}>
          <circle cx={0} cy={288} r={20} fill={WHITE} />
          <rect x={-11} y={308} width={22} height={48} rx={4} fill={WHITE} />
          <line x1={-5} y1={356} x2={-18} y2={380} stroke={WHITE} strokeWidth={9} strokeLinecap="round" />
          <line x1={5} y1={356} x2={18} y2={374} stroke={WHITE} strokeWidth={9} strokeLinecap="round" />
          <line x1={-11} y1={323} x2={-30} y2={346} stroke={WHITE} strokeWidth={7} strokeLinecap="round" />
          <line x1={11} y1={323} x2={30} y2={342} stroke={WHITE} strokeWidth={7} strokeLinecap="round" />
        </g>
      </svg>

      {/* NO COVERAGE */}
      <div style={{ position: 'absolute', bottom: 225, width: '100%', textAlign: 'center', opacity: warnOp }}>
        <p style={{ ...headline(58, '#EF4444') }}>NO COVERAGE</p>
      </div>

      {/* Subtitle */}
      <div style={{ position: 'absolute', bottom: 115, width: '100%', textAlign: 'center', opacity: subOp }}>
        <p style={{
          fontFamily: FONT, fontSize: 38, color: WHITE, textAlign: 'center',
          margin: 0, padding: '0 80px', lineHeight: 1.4,
        }}>
          THE FINANCIAL CLIFF NOBODY WARNS YOU ABOUT
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const coffScale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 90 } });
  const chairScale = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 90 } });
  const multiScale = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 150 } });
  const statOp = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(54, BLACK) }}>THE REAL RISK</p>
      </div>

      {/* Left: coffin (death) */}
      <div style={{
        position: 'absolute', left: 60, top: 340,
        transform: `scale(${coffScale})`, transformOrigin: 'center',
        textAlign: 'center', width: 220,
      }}>
        <svg width={200} height={220} viewBox="0 0 200 220">
          <polygon points="35,10 165,10 190,60 190,210 10,210 10,60" fill="#777" stroke="#444" strokeWidth={4} />
          <line x1={10} y1={110} x2={190} y2={110} stroke="#444" strokeWidth={3} />
          <rect x={88} y={28} width={24} height={55} rx={4} fill={WHITE} />
          <rect x={65} y={48} width={70} height={18} rx={4} fill={WHITE} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 40, color: BLACK, margin: '8px 0 0' }}>DEATH</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#777', margin: 4 }}>1×</p>
      </div>

      {/* Center 7× */}
      <div style={{
        position: 'absolute', top: 560, width: '100%', textAlign: 'center',
        transform: `scale(${multiScale})`, transformOrigin: 'center',
      }}>
        <p style={{ ...headline(190, ACCENT), lineHeight: 1 }}>7×</p>
        <p style={{ ...headline(44, ACCENT) }}>MORE LIKELY</p>
      </div>

      {/* Right: wheelchair (disability) */}
      <div style={{
        position: 'absolute', right: 60, top: 310,
        transform: `scale(${chairScale})`, transformOrigin: 'center',
        textAlign: 'center', width: 240,
      }}>
        <svg width={220} height={250} viewBox="0 0 220 250">
          <circle cx={110} cy={28} r={24} fill={ACCENT} />
          <line x1={110} y1={52} x2={110} y2={120} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" />
          <line x1={60} y1={120} x2={140} y2={120} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" />
          <line x1={60} y1={80} x2={60} y2={120} stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
          <line x1={60} y1={120} x2={60} y2={170} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
          <line x1={40} y1={170} x2={80} y2={170} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
          <line x1={110} y1={75} x2={150} y2={75} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
          <line x1={150} y1={75} x2={150} y2={120} stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
          <circle cx={95} cy={185} r={55} fill="none" stroke={ACCENT} strokeWidth={9} />
          <circle cx={95} cy={185} r={8} fill={ACCENT} />
          <line x1={95} y1={130} x2={95} y2={185} stroke={ACCENT} strokeWidth={4} />
          <line x1={95} y1={185} x2={148} y2={215} stroke={ACCENT} strokeWidth={4} />
          <line x1={95} y1={185} x2={42} y2={215} stroke={ACCENT} strokeWidth={4} />
          <circle cx={155} cy={200} r={22} fill="none" stroke={ACCENT} strokeWidth={7} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 40, color: BLACK, margin: '8px 0 0' }}>DISABILITY</p>
      </div>

      {/* Bottom stat */}
      <div style={{ position: 'absolute', bottom: 90, width: '100%', textAlign: 'center', opacity: statOp }}>
        <p style={{
          fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center',
          margin: 0, padding: '0 60px',
        }}>
          1 IN 4 WORKERS DISABLED BEFORE RETIREMENT
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const monthsCount = interpolate(frame, [20, 160], [0, 34.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const moneyPct = interpolate(frame, [60, 190], [100, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bigScale = spring({ frame: frame - 165, fps, config: { damping: 12, stiffness: 130 } });
  const titleOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const COLS = 6;
  const ROWS = 6;
  const CELL_W = 130;
  const CELL_H = 68;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(50, WHITE) }}>HOW LONG IT LASTS</p>
      </div>

      {/* Calendar grid */}
      <svg width={1080} height={680} style={{ position: 'absolute', top: 215, left: 0 }}>
        {Array.from({ length: Math.max(0, Math.floor(COLS * ROWS)) }).map((_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const cx = 115 + col * CELL_W;
          const cy = 60 + row * CELL_H;
          const active = i < monthsCount;
          return (
            <g key={i}>
              <rect x={cx} y={cy} width={CELL_W - 12} height={CELL_H - 10} rx={8}
                fill={active ? ACCENT : '#2a2a2a'}
                stroke={active ? ACCENT : '#444'}
                strokeWidth={2}
              />
              {active && (
                <text
                  x={cx + (CELL_W - 12) / 2}
                  y={cy + (CELL_H - 10) / 2 + 8}
                  textAnchor="middle"
                  fill={WHITE}
                  fontSize={20}
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}
        <text x={540} y={660} textAnchor="middle" fill={WHITE} fontSize={42} fontFamily="Arial Black">
          {monthsCount.toFixed(1)} MONTHS AVG
        </text>
      </svg>

      {/* Money drain bar */}
      <div style={{ position: 'absolute', bottom: 230, left: 100, right: 100 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#aaa', margin: '0 0 10px' }}>WAGES LOST:</p>
        <div style={{ background: '#2a2a2a', height: 34, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: '#EF4444', width: `${moneyPct}%`, height: 34, borderRadius: 8 }} />
        </div>
      </div>

      {/* $165K */}
      <div style={{
        position: 'absolute', bottom: 80, width: '100%', textAlign: 'center',
        transform: `scale(${bigScale})`, transformOrigin: 'center',
      }}>
        <p style={{ ...headline(96, '#EF4444'), lineHeight: 1 }}>$165,000</p>
        <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', margin: '6px 0 0' }}>
          GONE FROM YOUR POCKET
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const incomeRatio = interpolate(
    frame,
    [0, 40, 80, 140, 160, 210],
    [1, 1, 0.6, 0.6, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const BAR_H = 320;
  const barH = Math.max(0, incomeRatio * BAR_H);

  const houseScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const lbl1Op = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl2Op = interpolate(frame, [162, 187], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(52, BLACK) }}>THE COVERAGE GAP</p>
      </div>

      {/* Income bar */}
      <div style={{ position: 'absolute', left: 100, top: 300 }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, margin: '0 0 14px' }}>YOUR INCOME:</p>
        <div style={{
          width: 220, height: BAR_H, background: '#ddd', borderRadius: 12,
          overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            width: 220,
            height: barH,
            background: incomeRatio > 0.3 ? ACCENT : '#EF4444',
            borderRadius: 12,
          }} />
        </div>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#888', margin: '12px 0 0' }}>
          {incomeRatio > 0.7 ? '100% FULL PAY' : incomeRatio > 0.05 ? '60% — 6 MONTHS' : '$0'}
        </p>
      </div>

      {/* Stage labels */}
      <div style={{ position: 'absolute', left: 340, top: 430, opacity: lbl1Op }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#555', margin: 0 }}>← 60% salary</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', margin: 0 }}>SHORT-TERM</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#888', margin: '4px 0 0' }}>up to 6 months</p>
      </div>
      <div style={{ position: 'absolute', left: 340, top: 580, opacity: lbl2Op }}>
        <p style={{ fontFamily: FONT, fontSize: 38, color: '#EF4444', margin: 0 }}>← $0</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#EF4444', margin: 0 }}>MONTH 7 ONWARD</p>
      </div>

      {/* House icon */}
      <div style={{
        position: 'absolute', right: 80, top: 370,
        transform: `scale(${houseScale})`, transformOrigin: 'top center',
        textAlign: 'center',
      }}>
        <svg width={240} height={220} viewBox="0 0 240 220">
          <rect x={20} y={110} width={200} height={100} fill="#ccc" stroke={BLACK} strokeWidth={5} />
          <polygon points="0,110 120,20 240,110" fill="#999" stroke={BLACK} strokeWidth={5} />
          <rect x={90} y={155} width={60} height={55} rx={4} fill={BLACK} />
          <rect x={30} y={128} width={50} height={35} rx={4} fill={ACCENT} stroke={BLACK} strokeWidth={3} />
          <rect x={160} y={128} width={50} height={35} rx={4} fill={ACCENT} stroke={BLACK} strokeWidth={3} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: '10px 0 0' }}>
          BILLS DON'T PAUSE
        </p>
      </div>

      {/* Bottom msg */}
      <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', opacity: lbl2Op }}>
        <p style={{
          fontFamily: FONT, fontSize: 40, color: '#EF4444', textAlign: 'center',
          margin: 0, padding: '0 60px', lineHeight: 1.4,
        }}>
          MONTH 7 — YOU'RE COMPLETELY EXPOSED
        </p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 100 } });
  const checkScale = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 140 } });
  const costBarW = interpolate(frame, [80, 160], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const protBarW = interpolate(frame, [80, 160], [0, 700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceOp = interpolate(frame, [130, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(50, WHITE) }}>HOW LITTLE IT COSTS</p>
      </div>

      {/* Shield + checkmark */}
      <div style={{ position: 'absolute', top: 280, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', transform: `scale(${shieldScale})`, transformOrigin: 'center' }}>
          <svg width={200} height={220} viewBox="0 0 200 220">
            <path
              d="M 100 10 L 185 45 L 185 115 Q 185 175 100 210 Q 15 175 15 115 L 15 45 Z"
              fill={ACCENT} stroke="#1e3a5f" strokeWidth={5}
            />
            <text x={100} y={150} textAnchor="middle" fill={WHITE} fontSize={100} fontFamily="Arial Black">$</text>
          </svg>
          <div style={{
            position: 'absolute', top: -10, right: -20,
            transform: `scale(${checkScale})`, transformOrigin: 'center',
          }}>
            <svg width={60} height={60} viewBox="0 0 60 60">
              <circle cx={30} cy={30} r={28} fill="#10B981" />
              <polyline points="12,30 24,44 48,18" fill="none" stroke={WHITE} strokeWidth={7}
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Comparison bars */}
      <div style={{ position: 'absolute', bottom: 380, left: 80, right: 80 }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#aaa', margin: '0 0 8px' }}>COST (1–3% OF SALARY):</p>
          <div style={{ background: '#2a2a2a', height: 34, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#10B981', width: costBarW, height: 34, borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#10B981', margin: '8px 0 0' }}>$50–$150 / MONTH</p>
        </div>
        <div>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#aaa', margin: '0 0 8px' }}>INCOME PROTECTED:</p>
          <div style={{ background: '#2a2a2a', height: 34, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: ACCENT, width: protBarW, height: 34, borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: '8px 0 0' }}>UP TO 60% OF YOUR SALARY</p>
        </div>
      </div>

      {/* Key price */}
      <div style={{ position: 'absolute', bottom: 105, width: '100%', textAlign: 'center', opacity: priceOp }}>
        <p style={{ ...headline(80, '#10B981'), lineHeight: 1 }}>$50/MO</p>
        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, textAlign: 'center', margin: '8px 0 0' }}>
          PROTECTS YOUR ENTIRE INCOME
        </p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laptopScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const ck1 = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ck2 = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ck3 = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 160, fps, config: { damping: 12, stiffness: 120 } });
  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { text: 'Log into your HR / benefits portal', op: ck1 },
    { text: 'Search "Long-Term Disability"', op: ck2 },
    { text: 'Enroll — most employers cover the cost', op: ck3 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(52, BLACK) }}>WHAT TO DO TODAY</p>
      </div>

      {/* Laptop icon */}
      <div style={{
        position: 'absolute', top: 270, width: '100%',
        display: 'flex', justifyContent: 'center',
        transform: `scale(${laptopScale})`, transformOrigin: 'center',
      }}>
        <svg width={340} height={230} viewBox="0 0 340 230">
          <rect x={20} y={10} width={300} height={185} rx={12} fill="#1e1e1e" stroke={BLACK} strokeWidth={5} />
          <rect x={34} y={24} width={272} height={158} rx={6} fill="#2a2a3e" />
          <text x={170} y={58} textAnchor="middle" fill={ACCENT} fontSize={15} fontFamily="Arial" fontWeight="bold">
            EMPLOYEE BENEFITS PORTAL
          </text>
          <rect x={50} y={74} width={20} height={20} rx={3} fill="none" stroke={ACCENT} strokeWidth={2} />
          <text x={80} y={89} fill={WHITE} fontSize={14} fontFamily="Arial">Health Insurance</text>
          <rect x={50} y={104} width={20} height={20} rx={3} fill="none" stroke={ACCENT} strokeWidth={2} />
          <text x={80} y={119} fill={WHITE} fontSize={14} fontFamily="Arial">401(k) Match</text>
          <rect x={50} y={134} width={20} height={20} rx={3} fill={ACCENT} stroke={ACCENT} strokeWidth={2} />
          <polyline points="54,144 59,151 70,138" fill="none" stroke={WHITE} strokeWidth={2.5}
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={80} y={149} fill={ACCENT} fontSize={14} fontFamily="Arial" fontWeight="bold">
            Long-Term Disability
          </text>
          <rect x={0} y={195} width={340} height={20} rx={4} fill="#888" stroke={BLACK} strokeWidth={3} />
          <rect x={130} y={195} width={80} height={10} rx={4} fill="#666" />
        </svg>
      </div>

      {/* Steps */}
      <div style={{ position: 'absolute', top: 565, left: 80, right: 80 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 28, opacity: s.op }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: 20, flexShrink: 0,
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24">
                <polyline points="4,12 9,18 20,6" fill="none" stroke={WHITE} strokeWidth={3}
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0, lineHeight: 1.3 }}>{s.text}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 85, width: '100%', textAlign: 'center',
        transform: `scale(${ctaScale})`, transformOrigin: 'center',
      }}>
        <p style={{ ...headline(50, ACCENT) }}>CHECK YOUR BENEFITS TODAY</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#555', textAlign: 'center', margin: '10px 0 0' }}>
          DON'T WAIT UNTIL IT'S TOO LATE
        </p>
      </div>
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



