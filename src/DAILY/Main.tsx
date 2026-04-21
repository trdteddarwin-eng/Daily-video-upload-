import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const GREEN = '#10B981';
const RED = '#EF4444';
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

// Scene 1: Hook — $3,167 counter + 90% spent progress bar
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personSp = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const amountSp = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 90 } });
  const counterVal = Math.round(
    interpolate(frame, [10, 90], [0, 3167], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const barW = interpolate(frame, [40, 130], [0, 810], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const goneOp = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '0 60px',
      }}>
        {/* Person silhouette */}
        <svg width={100} height={150} viewBox="0 0 100 150"
          style={{ transform: `scale(${personSp})`, transformOrigin: 'center bottom', marginBottom: 24 }}>
          <circle cx={50} cy={22} r={20} fill={WHITE} />
          <rect x={20} y={46} width={60} height={58} rx={10} fill={WHITE} />
          <rect x={4} y={50} width={22} height={10} rx={5} fill={WHITE} transform="rotate(25 15 55)" />
          <rect x={74} y={50} width={22} height={10} rx={5} fill={WHITE} transform="rotate(-25 85 55)" />
          <rect x={22} y={100} width={20} height={46} rx={8} fill={WHITE} />
          <rect x={58} y={100} width={20} height={46} rx={8} fill={WHITE} />
        </svg>

        {/* Counting dollar amount */}
        <div style={{ transform: `scale(${amountSp})`, transformOrigin: 'center' }}>
          <p style={headline(108, ACCENT)}>${counterVal.toLocaleString()}</p>
        </div>
        <p style={{ ...headline(28, WHITE), marginTop: 8 }}>AVERAGE TAX REFUND</p>

        {/* 90% spent progress bar */}
        <div style={{ width: 900, marginTop: 56 }}>
          <p style={{ ...headline(24, WHITE), marginBottom: 12 }}>90% GONE IN 30 DAYS</p>
          <div style={{ width: 900, height: 30, background: '#2A2A2A', borderRadius: 15, overflow: 'hidden' }}>
            <div style={{ width: barW, height: 30, background: RED, borderRadius: 15 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, opacity: labelOp }}>
            <span style={headline(22, RED)}>SPENT</span>
            <span style={headline(22, GREEN)}>SAVED</span>
          </div>
        </div>

        <div style={{ opacity: goneOp, marginTop: 40 }}>
          <p style={headline(52, ACCENT)}>WHERE DID IT GO?</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: IRS building + 12-month calendar + zero interest stamp
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buildingSp = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const activeMo = Math.min(12, Math.max(0, Math.floor(
    interpolate(frame, [30, 155], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  )));
  const stampOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOp }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>NOT FREE MONEY</h2>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: '#666', textAlign: 'center', marginTop: 12, letterSpacing: '0.04em' }}>
            IT'S YOUR CASH — HELD ALL YEAR
          </p>
        </div>

        {/* IRS government building */}
        <div style={{ position: 'absolute', top: 280, left: '50%', transform: `translateX(-50%) scale(${buildingSp})` }}>
          <svg width="500" height="300">
            <rect x={60} y={110} width={380} height={190} fill="#CBD5E1" stroke="#94A3B8" strokeWidth={3} />
            <polygon points="40,110 250,20 460,110" fill="#94A3B8" stroke="#64748B" strokeWidth={3} />
            {[90, 150, 210, 270, 330, 390].map((x, i) => (
              <rect key={`col-${i}`} x={x} y={110} width={24} height={190} rx={3} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1} />
            ))}
            <rect x={204} y={230} width={92} height={70} rx={6} fill="#475569" />
            <rect x={84} y={130} width={60} height={48} rx={4} fill="#93C5FD" opacity={0.7} />
            <rect x={356} y={130} width={60} height={48} rx={4} fill="#93C5FD" opacity={0.7} />
            <text x={250} y={80} textAnchor="middle" fill={WHITE} fontSize={26} fontWeight="bold" fontFamily={FONT}>IRS</text>
            <rect x={80} y={285} width={340} height={20} rx={3} fill={WHITE} stroke="#CBD5E1" strokeWidth={1} />
            <text x={250} y={299} textAnchor="middle" fill="#AAA" fontSize={11} fontFamily="Arial">interest earned on your withholding: $0.00</text>
          </svg>
        </div>

        {/* 12-month calendar sweeping amber */}
        <div style={{ position: 'absolute', top: 630, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="936" height="72">
            {months.map((m, i) => (
              <g key={`mo-${i}`}>
                <rect x={i * 78} y={0} width={68} height={52} rx={8}
                  fill={i < activeMo ? ACCENT : '#E5E7EB'} stroke={i < activeMo ? '#D97706' : '#D1D5DB'} strokeWidth={2} />
                <text x={34 + i * 78} y={32} textAnchor="middle"
                  fill={i < activeMo ? BLACK : '#9CA3AF'} fontSize={13} fontWeight="bold" fontFamily={FONT}>{m}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Zero interest stamp */}
        <div style={{ position: 'absolute', bottom: 110, width: '100%', textAlign: 'center', opacity: stampOp }}>
          <div style={{
            display: 'inline-block', border: `4px solid ${RED}`, padding: '12px 36px',
            borderRadius: 8, transform: 'rotate(-4deg)',
          }}>
            <p style={{ ...headline(36, RED), margin: 0 }}>ZERO INTEREST EARNED</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Mental accounting — brain + two buckets springing out
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainSp = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 75 } });
  const leftSp = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 65 } });
  const rightSp = spring({ frame: frame - 90, fps, config: { damping: 10, stiffness: 65 } });
  const labelOp = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOp }}>
          <h2 style={{ ...headline(46, WHITE), padding: '0 40px' }}>MENTAL ACCOUNTING</h2>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: '#888', textAlign: 'center', marginTop: 12 }}>
            WHY YOUR BRAIN TREATS MONEY DIFFERENTLY
          </p>
        </div>

        {/* Brain SVG */}
        <div style={{ position: 'absolute', top: 320, left: '50%', transform: `translateX(-50%) scale(${brainSp})` }}>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <ellipse cx={85} cy={95} rx={68} ry={76} fill="#7C3AED" opacity={0.9} />
            <ellipse cx={175} cy={95} rx={68} ry={76} fill="#6D28D9" opacity={0.9} />
            <ellipse cx={130} cy={75} rx={38} ry={48} fill="#8B5CF6" opacity={0.7} />
            <rect x={115} y={162} width={30} height={36} rx={10} fill="#7C3AED" />
            <path d="M 58 76 Q 85 56 112 76" stroke="#5B21B6" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M 148 76 Q 175 56 202 76" stroke="#5B21B6" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M 66 116 Q 85 98 104 116" stroke="#5B21B6" strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d="M 156 116 Q 175 98 194 116" stroke="#5B21B6" strokeWidth={3} fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Left bucket: PAYCHECK PROTECTED */}
        <div style={{
          position: 'absolute', bottom: 230, left: 50,
          transform: `scale(${leftSp})`, transformOrigin: 'center bottom',
        }}>
          <div style={{
            background: '#064E3B', border: `4px solid ${GREEN}`, borderRadius: 16,
            padding: '20px 22px', textAlign: 'center', width: 370,
          }}>
            <svg width={44} height={52} viewBox="0 0 44 52" style={{ marginBottom: 8 }}>
              <rect x={2} y={20} width={40} height={30} rx={6} fill={GREEN} />
              <path d="M 10 20 L 10 12 Q 10 2 22 2 Q 34 2 34 12 L 34 20" stroke={GREEN} strokeWidth={6} fill="none" />
              <rect x={18} y={32} width={8} height={10} rx={3} fill={WHITE} />
            </svg>
            <p style={{ ...headline(28, GREEN), marginBottom: 4 }}>PAYCHECK</p>
            <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 18, color: '#A7F3D0', letterSpacing: '0.06em' }}>PROTECTED</p>
          </div>
        </div>

        {/* Right bucket: WINDFALL SPEND IT */}
        <div style={{
          position: 'absolute', bottom: 230, right: 50,
          transform: `scale(${rightSp})`, transformOrigin: 'center bottom',
        }}>
          <div style={{
            background: '#450A0A', border: `4px solid ${RED}`, borderRadius: 16,
            padding: '20px 22px', textAlign: 'center', width: 370,
          }}>
            <svg width={44} height={52} viewBox="0 0 44 52" style={{ marginBottom: 8 }}>
              <circle cx={22} cy={26} r={18} fill={RED} opacity={0.3} />
              <circle cx={22} cy={26} r={13} fill={RED} />
              <text x={22} y={32} textAnchor="middle" fill={WHITE} fontSize={17} fontWeight="bold" fontFamily={FONT}>$</text>
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const rad = a * Math.PI / 180;
                return (
                  <line key={`burst-${i}`}
                    x1={22 + 15 * Math.cos(rad)} y1={26 + 15 * Math.sin(rad)}
                    x2={22 + 22 * Math.cos(rad)} y2={26 + 22 * Math.sin(rad)}
                    stroke={ACCENT} strokeWidth={3} />
                );
              })}
            </svg>
            <p style={{ ...headline(28, RED), marginBottom: 4 }}>WINDFALL</p>
            <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 18, color: '#FCA5A5', letterSpacing: '0.06em' }}>SAFE TO SPEND</p>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 80, width: '100%', textAlign: 'center', opacity: labelOp }}>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: '#888', textAlign: 'center' }}>
            SAME MONEY. DIFFERENT BRAIN TREATMENT.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Two stacked bar charts — 5x savings stat
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftProg = interpolate(frame, [25, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightProg = interpolate(frame, [65, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const multSp = spring({ frame: frame - 158, fps, config: { damping: 9, stiffness: 58 } });

  const BASE_Y = 480;
  const MAX_H = 340;

  const leftTotal = leftProg * MAX_H;
  const leftSpent = leftProg * MAX_H * 0.90;
  const leftSaved = leftProg * MAX_H * 0.10;

  const rightTotal = rightProg * MAX_H;
  const rightSpent = rightProg * MAX_H * 0.50;
  const rightSaved = rightProg * MAX_H * 0.50;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOp }}>
          <h2 style={{ ...headline(50, BLACK), padding: '0 40px' }}>SAME MONEY</h2>
          <p style={{ ...headline(28, ACCENT), marginTop: 8 }}>WILDLY DIFFERENT OUTCOMES</p>
        </div>

        <div style={{ position: 'absolute', top: 280, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="900" height="560">
            <line x1={50} y1={BASE_Y} x2={850} y2={BASE_Y} stroke="#CCCCCC" strokeWidth={3} />

            {/* Left: LUMP REFUND — 90% spent (red), 10% saved (green) */}
            <rect x={90} y={BASE_Y - leftSpent} width={240} height={Math.max(0, leftSpent)} rx={8} fill={RED} />
            <rect x={90} y={BASE_Y - leftTotal} width={240} height={Math.max(0, leftSaved)} rx={8} fill={GREEN} />
            <text x={210} y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize={21} fontWeight="bold" fontFamily={FONT}>LUMP REFUND</text>
            <text x={210} y={BASE_Y + 64} textAnchor="middle" fill="#777" fontSize={17} fontFamily="Arial">10% saved</text>

            {/* Right: MONTHLY — 50% spent (red), 50% saved (green) */}
            <rect x={570} y={BASE_Y - rightSpent} width={240} height={Math.max(0, rightSpent)} rx={8} fill={RED} />
            <rect x={570} y={BASE_Y - rightTotal} width={240} height={Math.max(0, rightSaved)} rx={8} fill={GREEN} />
            <text x={690} y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize={21} fontWeight="bold" fontFamily={FONT}>MONTHLY</text>
            <text x={690} y={BASE_Y + 64} textAnchor="middle" fill="#777" fontSize={17} fontFamily="Arial">50% saved</text>

            {/* Legend */}
            <rect x={340} y={22} width={22} height={22} rx={4} fill={GREEN} />
            <text x={370} y={39} fill={BLACK} fontSize={16} fontFamily="Arial">Saved</text>
            <rect x={440} y={22} width={22} height={22} rx={4} fill={RED} />
            <text x={470} y={39} fill={BLACK} fontSize={16} fontFamily="Arial">Spent</text>
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 80, width: '100%', textAlign: 'center',
          transform: `scale(${multSp})`,
        }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '20px 56px', borderRadius: 40 }}>
            <p style={{ ...headline(52, BLACK), margin: 0 }}>5x MORE SAVINGS</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: W-4 form with pencil + before/after comparison
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const formSp = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const pencilX = interpolate(frame, [50, 150], [80, 460], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const beforeOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const afterSp = spring({ frame: frame - 140, fps, config: { damping: 9, stiffness: 60 } });
  const afterOp = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const PENCIL_Y = 184;
  const rowLabels = ['FULL NAME', 'FILING STATUS', 'WITHHOLDING', 'ADJUSTMENTS', 'SIGNATURE'];
  const rowYs = [90, 130, 170, 210, 250];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOp }}>
          <h2 style={{ ...headline(50, WHITE), padding: '0 40px' }}>THE FIX</h2>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: ACCENT, textAlign: 'center', marginTop: 12, letterSpacing: '0.06em' }}>
            ADJUST YOUR W-4 AT WORK
          </p>
        </div>

        {/* W-4 form */}
        <div style={{ position: 'absolute', top: 300, left: '50%', transform: `translateX(-50%) scale(${formSp})` }}>
          <svg width="600" height="320">
            <rect x={0} y={0} width={600} height={320} rx={12} fill={WHITE} stroke="#DDD" strokeWidth={2} />
            <rect x={0} y={0} width={600} height={56} rx={12} fill={RED} />
            <text x={300} y={35} textAnchor="middle" fill={WHITE} fontSize={22} fontWeight="bold" fontFamily={FONT}>W-4 EMPLOYEE WITHHOLDING</text>
            {rowYs.map((y, i) => (
              <g key={`row-${i}`}>
                <text x={20} y={y - 6} fill="#888" fontSize={12} fontFamily="Arial">{rowLabels[i]}</text>
                <rect x={20} y={y} width={560} height={28} rx={4}
                  fill={i === 2 ? '#FEF3C7' : '#F8F9FA'} stroke="#DDD" strokeWidth={1} />
                {i === 2 && (
                  <text x={300} y={y + 19} textAnchor="middle" fill="#92400E" fontSize={14} fontWeight="bold" fontFamily={FONT}>
                    ← ADJUST WITHHOLDING HERE
                  </text>
                )}
              </g>
            ))}
            {/* Animated pencil */}
            <g transform={`translate(${pencilX}, ${PENCIL_Y})`}>
              <rect x={-4} y={-22} width={8} height={26} rx={3} fill={ACCENT} />
              <polygon points="-4,4 4,4 0,12" fill="#92400E" />
            </g>
          </svg>
        </div>

        {/* Before / After comparison */}
        <div style={{ position: 'absolute', bottom: 180, width: '100%', paddingLeft: 60, paddingRight: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', opacity: beforeOp }}>
              <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 18, color: '#888', margin: 0 }}>BEFORE</p>
              <p style={{ ...headline(38, RED), margin: '8px 0' }}>$3,167</p>
              <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 16, color: '#888', margin: 0 }}>ONCE A YEAR</p>
            </div>
            <div style={{ opacity: afterOp }}>
              <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 28, color: '#888', margin: 0 }}>→</p>
            </div>
            <div style={{ textAlign: 'center', opacity: afterOp, transform: `scale(${afterSp})` }}>
              <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 18, color: '#888', margin: 0 }}>AFTER</p>
              <p style={{ ...headline(38, GREEN), margin: '8px 0' }}>$264</p>
              <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 16, color: '#888', margin: 0 }}>EVERY MONTH</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — same-day savings transfer with phone + piggy bank
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneSp = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const pigSp = spring({ frame: frame - 35, fps, config: { damping: 11, stiffness: 65 } });
  const arrowOp = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSp = spring({ frame: frame - 162, fps, config: { damping: 9, stiffness: 58 } });
  const ctaOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={ACCENT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOp }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>SAME DAY RULE</h2>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 24, color: '#7C2D12', textAlign: 'center', marginTop: 12, letterSpacing: '0.04em' }}>
            TRANSFER BEFORE YOUR BRAIN LABELS IT "FREE"
          </p>
        </div>

        {/* Phone with bank transfer UI */}
        <div style={{ position: 'absolute', top: 350, left: 90, transform: `scale(${phoneSp})` }}>
          <svg width="220" height="370">
            <rect x={10} y={0} width={200} height={370} rx={20} fill={BLACK} />
            <rect x={20} y={18} width={180} height={334} rx={12} fill="#1E1E2E" />
            <rect x={30} y={36} width={160} height={28} rx={6} fill="#333" />
            <text x={110} y={55} textAnchor="middle" fill={WHITE} fontSize={14} fontFamily="Arial">BANK TRANSFER</text>
            <rect x={30} y={80} width={160} height={42} rx={6} fill="#16A34A" />
            <text x={110} y={107} textAnchor="middle" fill={WHITE} fontSize={15} fontWeight="bold" fontFamily={FONT}>+ $3,167</text>
            <text x={110} y={140} textAnchor="middle" fill="#888" fontSize={12} fontFamily="Arial">TAX REFUND RECEIVED</text>
            <text x={110} y={172} textAnchor="middle" fill={WHITE} fontSize={13} fontFamily="Arial">TRANSFER TO:</text>
            <rect x={30} y={184} width={160} height={34} rx={6} fill="#1D4ED8" />
            <text x={110} y={206} textAnchor="middle" fill={WHITE} fontSize={13} fontWeight="bold" fontFamily="Arial">HIGH-YIELD SAVINGS</text>
            <rect x={48} y={234} width={124} height={32} rx={16} fill={ACCENT} />
            <text x={110} y={255} textAnchor="middle" fill={BLACK} fontSize={14} fontWeight="bold" fontFamily={FONT}>TRANSFER NOW</text>
          </svg>
        </div>

        {/* Arrow */}
        <div style={{ position: 'absolute', top: 470, left: 322, opacity: arrowOp }}>
          <svg width="110" height="50">
            <line x1={0} y1={25} x2={88} y2={25} stroke={BLACK} strokeWidth={6} strokeLinecap="round" />
            <polygon points="76,12 100,25 76,38" fill={BLACK} />
          </svg>
        </div>

        {/* Piggy bank */}
        <div style={{ position: 'absolute', top: 350, right: 70, transform: `scale(${pigSp})` }}>
          <svg width="250" height="270">
            <ellipse cx={125} cy={178} rx={108} ry={84} fill="#92400E" />
            <rect x={101} y={94} width={48} height={12} rx={6} fill="#7C2D12" />
            <ellipse cx={36} cy={152} rx={32} ry={24} fill="#92400E" opacity={0.85} />
            <ellipse cx={214} cy={152} rx={32} ry={24} fill="#92400E" opacity={0.85} />
            <ellipse cx={125} cy={202} rx={26} ry={18} fill="#7C2D12" />
            <circle cx={115} cy={200} r={4} fill={BLACK} />
            <circle cx={135} cy={200} r={4} fill={BLACK} />
            <circle cx={100} cy={164} r={9} fill={BLACK} />
            <circle cx={150} cy={164} r={9} fill={BLACK} />
            <circle cx={103} cy={161} r={3} fill={WHITE} />
            <circle cx={153} cy={161} r={3} fill={WHITE} />
            <text x={125} y={190} textAnchor="middle" fill={WHITE} fontSize={16} fontWeight="bold" fontFamily={FONT}>SAVINGS</text>
            <rect x={84} y={252} width={18} height={28} rx={9} fill="#7C2D12" />
            <rect x={110} y={252} width={18} height={28} rx={9} fill="#7C2D12" />
            <rect x={142} y={252} width={18} height={28} rx={9} fill="#7C2D12" />
            <rect x={168} y={252} width={18} height={28} rx={9} fill="#7C2D12" />
          </svg>
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute', bottom: 80, left: '5%', width: '90%',
          background: BLACK, padding: '36px 32px', borderRadius: 24, textAlign: 'center',
          opacity: ctaOp, transform: `scale(${ctaSp})`,
        }}>
          <p style={{ ...headline(46, WHITE), margin: 0 }}>FOLLOW FOR MORE</p>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 20, color: ACCENT, marginTop: 12, letterSpacing: '0.06em', margin: '12px 0 0 0' }}>
            MONEY PSYCHOLOGY EVERY DAY
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
