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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyS = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, from: 0, to: 1 });
  const lockS = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const titleOp = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [30, 55], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [70, 94], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [130, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY = interpolate(frame, [50, 120], [0, -80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp = interpolate(frame, [50, 90, 120, 140], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <div style={{ position: 'relative', transform: `scale(${piggyS})` }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <ellipse cx="95" cy="115" rx="72" ry="62" fill={ACCENT} />
            <circle cx="162" cy="94" r="34" fill={ACCENT} />
            <ellipse cx="175" cy="108" rx="14" ry="10" fill="#D97706" />
            <circle cx="171" cy="108" r="3" fill="#92400E" />
            <circle cx="179" cy="108" r="3" fill="#92400E" />
            <circle cx="160" cy="86" r="4" fill={BLACK} />
            <circle cx="161" cy="85" r="1.5" fill={WHITE} />
            <ellipse cx="154" cy="68" rx="9" ry="12" fill="#D97706" />
            <rect x="80" y="54" width="28" height="6" rx="3" fill="#92400E" />
            <rect x="54" y="166" width="18" height="28" rx="9" fill="#D97706" />
            <rect x="78" y="166" width="18" height="28" rx="9" fill="#D97706" />
            <rect x="102" y="166" width="18" height="28" rx="9" fill="#D97706" />
            <rect x="126" y="166" width="18" height="28" rx="9" fill="#D97706" />
            <path d="M24 110 Q8 96 14 80 Q20 64 30 70 Q22 82 28 90 Q34 100 24 110" fill="none" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', top: -10, right: -10, transform: `scale(${lockS})` }}>
            <svg width="56" height="64" viewBox="0 0 56 64">
              <rect x="8" y="28" width="40" height="32" rx="6" fill={BLACK} stroke={ACCENT} strokeWidth="3" />
              <path d="M16 28 L16 18 Q16 4 28 4 Q40 4 40 18 L40 28" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="round" />
              <path d="M16 28 L16 18 Q16 4 28 4 Q40 4 40 18 L40 28" fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
              <circle cx="28" cy="44" r="6" fill={ACCENT} />
              <rect x="26" y="44" width="4" height="8" rx="2" fill={ACCENT} />
            </svg>
          </div>
          <div style={{ position: 'absolute', top: 50 + coinY, left: 72, opacity: coinOp }}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <circle cx="15" cy="15" r="14" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="15" y="20" textAnchor="middle" fontSize="16" fill="#92400E" fontFamily="Arial Black" fontWeight="bold">$</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>YOUR 401K</p>
          <p style={headline(52, ACCENT)}>MATCH ISN'T</p>
          <p style={headline(52, WHITE)}>YOURS YET</p>
        </div>

        <p style={{ ...headline(22, '#9CA3AF'), opacity: subOp }}>THE VESTING TRAP</p>

        <div style={{ opacity: tagOp, background: ACCENT, borderRadius: 12, padding: '12px 30px' }}>
          <p style={headline(22, BLACK)}>MOST WORKERS NEVER CHECK THIS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const lineW = interpolate(frame, [20, 90], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const unlockS = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 140 }, from: 0, to: 1 });
  const noteOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const yearLabels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
  const isLocked = [true, true, false, false, false, false];
  const pctLabels = ['0%', '0%', '100%', '100%', '100%', '100%'];
  const revealFrames = [20, 38, 56, 74, 92, 110];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 60px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>VESTING SCHEDULE</p>
        <p style={headline(20, '#6B7280')}>CLIFF VESTING — MOST COMMON TYPE</p>

        <div style={{ width: '100%', position: 'relative' }}>
          <div style={{ height: 4, background: '#D1D5DB', borderRadius: 2, width: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${lineW}%`, background: ACCENT, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            {yearLabels.map((label, i) => {
              const itemOp = interpolate(frame, [revealFrames[i], revealFrames[i] + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const unlocked = !isLocked[i];
              const iconScale = unlocked ? unlockS : 1;
              const iconColor = unlocked ? '#10B981' : '#9CA3AF';
              const pctColor = unlocked ? '#10B981' : ACCENT;
              return (
                <div key={i} style={{ opacity: itemOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <svg width="34" height="38" viewBox="0 0 34 38" style={{ transform: `scale(${iconScale})` }}>
                    {unlocked ? (
                      <>
                        <rect x="3" y="17" width="28" height="19" rx="5" fill="#10B981" />
                        <path d="M9 17 L9 10 Q9 2 17 2 Q25 2 25 10" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="17" cy="26" r="3" fill={WHITE} />
                        <rect x="15" y="26" width="4" height="6" rx="2" fill={WHITE} />
                      </>
                    ) : (
                      <>
                        <rect x="3" y="17" width="28" height="19" rx="5" fill="#9CA3AF" />
                        <path d="M9 17 L9 10 Q9 2 17 2 Q25 2 25 10 L25 17" fill="none" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="17" cy="26" r="3" fill="#D1D5DB" />
                        <rect x="15" y="26" width="4" height="5" rx="2" fill="#D1D5DB" />
                      </>
                    )}
                  </svg>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: iconColor, textAlign: 'center', margin: 0, letterSpacing: '0.04em' }}>{label}</p>
                  <p style={{ fontFamily: FONT, fontSize: 18, color: pctColor, fontWeight: 'bold', margin: 0, textAlign: 'center' }}>{pctLabels[i]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ opacity: noteOp, background: ACCENT, borderRadius: 14, padding: '18px 32px', textAlign: 'center' }}>
          <p style={headline(22, BLACK)}>QUIT BEFORE YEAR 3?</p>
          <p style={{ ...headline(44, BLACK), lineHeight: 1 }}>YOU GET $0</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1Grow = interpolate(frame, [20, 80], [0, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Grow = interpolate(frame, [40, 100], [0, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [60, 120], [0, 195], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1Drain = interpolate(frame, [140, 185], [90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Drain = interpolate(frame, [155, 200], [150, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = frame < 140 ? bar1Grow : bar1Drain;
  const bar2H = frame < 155 ? bar2Grow : bar2Drain;

  const bar1Color = frame > 130 ? '#EF4444' : ACCENT;
  const bar2Color = frame > 145 ? '#EF4444' : ACCENT;

  const forfeitOp = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: 'Year 1', val: '$3,500', height: bar1H, color: bar1Color },
    { label: 'Year 2', val: '$7,000', height: bar2H, color: bar2Color },
    { label: 'Year 3', val: '$10,500', height: bar3H, color: '#10B981' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>THE MATH</p>
        <p style={{ ...headline(20, '#9CA3AF'), opacity: subOp }}>AVG EMPLOYER MATCH: $3,500/YEAR</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, marginTop: 8 }}>
          {bars.map((bar, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <p style={headline(22, bar.color)}>{bar.val}</p>
              <div style={{ width: 88, height: Math.max(0, bar.height), background: bar.color, borderRadius: '8px 8px 0 0' }} />
              <p style={headline(15, '#9CA3AF')}>{bar.label}</p>
            </div>
          ))}
        </div>

        <div style={{ opacity: forfeitOp, textAlign: 'center', marginTop: 8 }}>
          <p style={headline(26, '#EF4444')}>QUIT AT YEAR 2 =</p>
          <p style={{ ...headline(88, '#EF4444'), lineHeight: 1 }}>-$7,000</p>
          <p style={headline(22, WHITE)}>BACK TO YOUR EMPLOYER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const stat1Op = interpolate(frame, [18, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [100, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noteOp = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const quitIndices = [2, 5, 8];
  const people = Array.from({ length: Math.max(0, Math.floor(9)) }, (_, i) => i);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 70px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>IT'S WIDESPREAD</p>

        <div style={{ opacity: stat1Op, background: ACCENT, borderRadius: 14, padding: '14px 40px', textAlign: 'center' }}>
          <p style={headline(20, BLACK)}>OF 401K PLANS HAVE VESTING</p>
          <p style={{ ...headline(72, BLACK), lineHeight: 1 }}>57%</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', width: '100%' }}>
          {people.map((i) => {
            const isQuitter = quitIndices.includes(i);
            const personOp = interpolate(frame, [58 + i * 9, 76 + i * 9], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const xOp = isQuitter
              ? interpolate(frame, [118, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              : 0;
            return (
              <div key={i} style={{ opacity: personOp, position: 'relative' }}>
                <svg width="62" height="78" viewBox="0 0 62 78">
                  <circle cx="31" cy="17" r="13" fill={isQuitter ? '#D1D5DB' : ACCENT} />
                  <path d="M10 68 Q10 38 31 38 Q52 38 52 68 Z" fill={isQuitter ? '#D1D5DB' : ACCENT} />
                </svg>
                {isQuitter && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: xOp }}>
                    <svg width="62" height="78" viewBox="0 0 62 78">
                      <line x1="14" y1="14" x2="48" y2="64" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                      <line x1="48" y1="14" x2="14" y2="64" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ opacity: stat2Op, textAlign: 'center' }}>
          <p style={headline(24, '#EF4444')}>1 IN 3 WORKERS QUITS</p>
          <p style={headline(24, BLACK)}>BEFORE FULLY VESTING</p>
        </div>

        <p style={{ ...headline(19, '#6B7280'), opacity: noteOp }}>AND MOST NEVER KNEW THEY LOST IT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const years = [
    { label: 'Year 1', pct: 20, amount: '$700 yours' },
    { label: 'Year 2', pct: 40, amount: '$2,800 yours' },
    { label: 'Year 3', pct: 60, amount: '$6,300 yours' },
    { label: 'Year 4', pct: 80, amount: '$11,200 yours' },
    { label: 'Year 5', pct: 100, amount: '$17,500 yours' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>GRADED VESTING</p>
        <p style={{ ...headline(19, '#9CA3AF'), opacity: subOp }}>THE "NICER" VERSION — STILL A TRAP</p>

        {years.map((yr, i) => {
          const rowOp = interpolate(frame, [24 + i * 20, 44 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const barW = interpolate(frame, [32 + i * 20, 88 + i * 20], [0, yr.pct], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const highlight = i < 2;
          const barColor = highlight ? '#EF4444' : ACCENT;
          const labelColor = highlight ? '#EF4444' : WHITE;
          return (
            <div key={i} style={{ opacity: rowOp, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <p style={headline(17, labelColor)}>{yr.label} — {yr.pct}% vested</p>
                <p style={headline(17, barColor)}>{yr.amount}</p>
              </div>
              <div style={{ width: '100%', height: 20, background: '#2A2A2A', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ width: `${Math.max(0, barW)}%`, height: '100%', background: barColor, borderRadius: 10 }} />
              </div>
            </div>
          );
        })}

        <div style={{ opacity: bannerOp, background: '#EF4444', borderRadius: 14, padding: '14px 32px', textAlign: 'center', marginTop: 6 }}>
          <p style={headline(21, WHITE)}>QUIT YEAR 2 = ONLY 40% VESTED</p>
          <p style={{ ...headline(44, WHITE), lineHeight: 1 }}>LOSE $4,200</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calS = spring({ frame, fps, config: { damping: 18, stiffness: 70 }, from: 0, to: 1 });
  const checkScale = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 200 }, from: 0, to: 1 });
  const line1Op = interpolate(frame, [18, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [50, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Op = interpolate(frame, [80, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [104, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [128, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { num: '1', text: "Look up your vesting schedule in HR docs", op: step1Op },
    { num: '2', text: "Find your exact vest date and mark it", op: step2Op },
    { num: '3', text: "Consider waiting if you're within 90 days", op: step3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <div style={{ transform: `scale(${calS})` }}>
          <svg width="156" height="156" viewBox="0 0 156 156">
            <rect x="6" y="26" width="144" height="124" rx="10" fill={WHITE} stroke="#D1D5DB" strokeWidth="3" />
            <rect x="6" y="26" width="144" height="36" rx="10" fill={ACCENT} />
            <rect x="6" y="50" width="144" height="12" fill={ACCENT} />
            <rect x="40" y="14" width="12" height="26" rx="6" fill="#6B7280" />
            <rect x="104" y="14" width="12" height="26" rx="6" fill="#6B7280" />
            <text x="78" y="47" textAnchor="middle" fontSize="15" fill={BLACK} fontFamily="Arial Black" fontWeight="bold">VEST DATE</text>
            <line x1="6" y1="98" x2="150" y2="98" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="6" y1="122" x2="150" y2="122" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="48" y1="62" x2="48" y2="150" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="78" y1="62" x2="78" y2="150" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="108" y1="62" x2="108" y2="150" stroke="#E5E7EB" strokeWidth="1" />
            <g transform={`translate(123, 110) scale(${checkScale}) translate(-123, -110)`}>
              <circle cx="123" cy="110" r="16" fill="#10B981" />
              <path d="M114 110 L120 116 L132 104" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </div>

        <p style={{ ...headline(42, BLACK), opacity: line1Op }}>CHECK BEFORE YOU QUIT</p>
        <p style={{ ...headline(22, '#6B7280'), opacity: line2Op }}>IT COULD BE WORTH $14,000</p>

        {steps.map((step) => (
          <div key={step.num} style={{ opacity: step.op, display: 'flex', alignItems: 'center', gap: 16, width: '100%', background: '#EFEFEF', borderRadius: 12, padding: '14px 20px' }}>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 20, color: BLACK, fontWeight: 'bold' }}>{step.num}</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, letterSpacing: '0.04em', margin: 0 }}>{step.text}</p>
          </div>
        ))}

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '14px 36px', marginTop: 4 }}>
          <p style={headline(22, BLACK)}>FOLLOW FOR MORE MONEY TRAPS</p>
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
