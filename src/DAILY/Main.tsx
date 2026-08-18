import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const card1Sp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const card2Sp = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12 } });
  const card3Sp = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } });

  const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.04, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const cards = [
    { balance: '$2,000', rate: '18% APR', col: '#F59E0B', sp: card1Sp, puls: 1 as number },
    { balance: '$6,000', rate: '22% APR', col: '#F97316', sp: card2Sp, puls: 1 as number },
    { balance: '$3,000', rate: '27% APR', col: ACCENT, sp: card3Sp, puls: pulse },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 36 }}>
        <div style={{
          opacity: titleSp,
          transform: `translateY(${interpolate(titleSp, [0, 1], [-60, 0])}px)`,
          textAlign: 'center',
        }}>
          <p style={headline(58, WHITE)}>DEBT PAYOFF</p>
          <p style={{ ...headline(58, ACCENT), marginTop: 8 }}>ORDER MATTERS</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#777', marginTop: 16, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>most people get this completely backwards</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {cards.map((c, i) => {
            const sc = interpolate(c.sp, [0, 1], [0.3, 1]) * c.puls;
            return (
              <div key={i} style={{
                opacity: c.sp,
                transform: `scale(${sc})`,
                background: 'linear-gradient(135deg, #1C1C1C 0%, #252525 100%)',
                borderRadius: 20,
                padding: '28px 44px',
                border: `3px solid ${c.col}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 48, color: WHITE, fontWeight: 'bold' }}>{c.balance}</div>
                  <div style={{ fontFamily: FONT, fontSize: 24, color: '#666', marginTop: 6 }}>BALANCE</div>
                </div>
                <svg width="48" height="64" viewBox="0 0 48 64">
                  <rect x="4" y="4" width="40" height="26" rx="4" fill={c.col} opacity="0.25" stroke={c.col} strokeWidth="1.5" />
                  <rect x="10" y="10" width="14" height="10" rx="2" fill={c.col} opacity="0.7" />
                  <rect x="8" y="38" width="32" height="3" rx="1" fill={c.col} opacity="0.4" />
                  <rect x="8" y="46" width="32" height="3" rx="1" fill={c.col} opacity="0.4" />
                  <rect x="8" y="54" width="20" height="3" rx="1" fill={c.col} opacity="0.4" />
                </svg>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: FONT, fontSize: 48, color: c.col, fontWeight: 'bold' }}>{c.rate}</div>
                  <div style={{ fontFamily: FONT, fontSize: 24, color: '#666', marginTop: 6 }}>INTEREST</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const ballX = interpolate(frame, [0, dur - 30], [100, 540], { extrapolateRight: 'clamp' });
  const ballR = interpolate(frame, [0, Math.floor(dur * 0.7)], [40, 120], { extrapolateRight: 'clamp' });
  const cardOpacity = interpolate(frame, [50, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkSp = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 10 } });
  const dollarProgress = interpolate(frame, [85, dur - 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 60, paddingTop: 80 }}>
        <div style={{ opacity: titleSp, transform: `scale(${interpolate(titleSp, [0, 1], [0.8, 1])})`, textAlign: 'center', marginBottom: 32 }}>
          <p style={headline(60, BLACK)}>THE SNOWBALL</p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#888', marginTop: 12, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>smallest balance first</p>
        </div>

        <svg width="680" height="300" viewBox="0 0 680 300" style={{ overflow: 'visible' }}>
          <line x1="0" y1="260" x2="680" y2="260" stroke="#CCC" strokeWidth="3" />
          <text x="120" y="285" fontFamily="Arial" fontSize="18" fill="#AAA" textAnchor="middle">$2K — 18%</text>
          <text x="350" y="285" fontFamily="Arial" fontSize="18" fill="#AAA" textAnchor="middle">$3K — 27%</text>
          <text x="560" y="285" fontFamily="Arial" fontSize="18" fill="#AAA" textAnchor="middle">$6K — 22%</text>

          <circle cx={ballX} cy={260 - ballR} r={ballR} fill="#3B82F620" stroke="#3B82F6" strokeWidth="4" />
          <text x={ballX} y={260 - ballR + 8} fontFamily="Arial Black" fontSize="18" fill="#3B82F6" textAnchor="middle">SNOWBALL</text>

          <g opacity={cardOpacity}>
            <rect x="60" y="210" width="120" height="48" rx="8" fill="#F59E0B" />
            <text x="120" y="242" fontFamily="Arial Black" fontSize="20" fill="white" textAnchor="middle">$2,000</text>
          </g>

          <g transform={`translate(120, 236) scale(${checkSp})`} opacity={checkSp}>
            <circle cx="0" cy="0" r="28" fill="#10B981" />
            <polyline points="-12,0 -4,9 14,-11" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {[0, 1, 2, 3, 4].map((i) => {
            const sf = i * 0.14;
            const dy = interpolate(dollarProgress, [sf, sf + 0.45], [0, -85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const dOp = 1 - interpolate(dollarProgress, [sf + 0.25, sf + 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <text key={i} x={400 + i * 32} y={220 + dy} fontFamily="Arial Black" fontSize="30" fill={ACCENT} opacity={dOp} textAnchor="middle">$</text>
            );
          })}
        </svg>

        <div style={{
          opacity: interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          background: `${ACCENT}15`,
          border: `3px solid ${ACCENT}`,
          borderRadius: 20,
          padding: '28px 48px',
          textAlign: 'center',
          marginTop: 20,
          width: '100%',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, margin: 0 }}>FEELS GREAT</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#444', margin: '10px 0 0', textAlign: 'center' }}>but your high-rate debt keeps compounding</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const focusSp = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12 } });
  const arrowSp = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10 } });

  const magX = interpolate(focusSp, [0, 1], [80, 380]);
  const magY = interpolate(focusSp, [0, 1], [80, 355]);
  const pulseBorder = interpolate(frame % 40, [0, 20, 40], [3, 6, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 60, paddingTop: 80 }}>
        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [-50, 0])}px)`, textAlign: 'center', marginBottom: 40 }}>
          <p style={headline(60, WHITE)}>THE AVALANCHE</p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: '#10B981', marginTop: 12, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>highest rate first</p>
        </div>

        <svg width="680" height="420" viewBox="0 0 680 420" style={{ overflow: 'visible' }}>
          <rect x="20" y="20" width="640" height="100" rx="14" fill="#1C1C1C" stroke="#F59E0B" strokeWidth="2" />
          <text x="70" y="78" fontFamily="Arial Black" fontSize="28" fill={WHITE}>$2,000</text>
          <text x="70" y="108" fontFamily="Arial" fontSize="22" fill="#555">18% APR</text>
          <text x="620" y="78" fontFamily="Arial Black" fontSize="22" fill="#F59E0B" textAnchor="end">LAST</text>

          <rect x="20" y="150" width="640" height="100" rx="14" fill="#1C1C1C" stroke="#F97316" strokeWidth="2" />
          <text x="70" y="208" fontFamily="Arial Black" fontSize="28" fill={WHITE}>$6,000</text>
          <text x="70" y="238" fontFamily="Arial" fontSize="22" fill="#555">22% APR</text>
          <text x="620" y="208" fontFamily="Arial Black" fontSize="22" fill="#F97316" textAnchor="end">SECOND</text>

          <rect x="20" y="280" width="640" height="110" rx="14" fill={`${ACCENT}20`} stroke={ACCENT} strokeWidth={pulseBorder} />
          <text x="70" y="345" fontFamily="Arial Black" fontSize="32" fill={ACCENT}>$3,000</text>
          <text x="70" y="375" fontFamily="Arial" fontSize="24" fill="#AAA">27% APR</text>
          <text x="620" y="345" fontFamily="Arial Black" fontSize="26" fill={ACCENT} textAnchor="end">ATTACK FIRST</text>

          <g transform={`translate(${magX}, ${magY}) scale(${interpolate(focusSp, [0, 1], [0.2, 1])})`} opacity={focusSp}>
            <circle cx="0" cy="0" r="52" fill="none" stroke={ACCENT} strokeWidth="6" />
            <line x1="37" y1="37" x2="75" y2="75" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
          </g>

          <g transform={`translate(340, 410) scale(${interpolate(arrowSp, [0, 1], [0, 1])})`} opacity={arrowSp}>
            <text x="0" y="0" fontFamily="Arial Black" fontSize="22" fill="#10B981" textAnchor="middle">↓ THIS ONE FIRST ↓</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const leftSp = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12 } });
  const rightSp = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12 } });
  const counterVal = interpolate(frame, [80, dur - 40], [0, 14000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [78, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 60, paddingTop: 80 }}>
        <div style={{ opacity: titleSp, textAlign: 'center', marginBottom: 36 }}>
          <p style={headline(54, BLACK)}>THE MATH</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#666', marginTop: 12, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>same 3 debts. different order. huge gap.</p>
        </div>

        <div style={{ display: 'flex', gap: 32, width: '100%' }}>
          <div style={{
            flex: 1,
            opacity: leftSp,
            transform: `translateX(${interpolate(leftSp, [0, 1], [-80, 0])}px)`,
            background: `${ACCENT}10`,
            border: `3px solid ${ACCENT}`,
            borderRadius: 20,
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <p style={headline(34, BLACK)}>SNOWBALL</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', marginTop: 8, textAlign: 'center', textTransform: 'none' as const }}>smallest first</p>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center' }}>Total Interest</p>
              <p style={{ fontFamily: FONT, fontSize: 58, color: ACCENT, margin: '8px 0', textAlign: 'center' }}>$22,400</p>
            </div>
            <div style={{ background: ACCENT, borderRadius: 12, padding: '12px 0', marginTop: 12 }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, textAlign: 'center' }}>4.2 YEARS</p>
            </div>
          </div>

          <div style={{
            flex: 1,
            opacity: rightSp,
            transform: `translateX(${interpolate(rightSp, [0, 1], [80, 0])}px)`,
            background: '#10B98110',
            border: '3px solid #10B981',
            borderRadius: 20,
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <p style={headline(34, BLACK)}>AVALANCHE</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', marginTop: 8, textAlign: 'center', textTransform: 'none' as const }}>highest rate first</p>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center' }}>Total Interest</p>
              <p style={{ fontFamily: FONT, fontSize: 58, color: '#10B981', margin: '8px 0', textAlign: 'center' }}>$8,400</p>
            </div>
            <div style={{ background: '#10B981', borderRadius: 12, padding: '12px 0', marginTop: 12 }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, textAlign: 'center' }}>3.8 YEARS</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 36, opacity: counterOp, transform: `scale(${interpolate(counterOp, [0, 1], [0.85, 1])})`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#555', textAlign: 'center', margin: 0 }}>wrong order costs you</p>
          <p style={{ fontFamily: FONT, fontSize: 84, color: ACCENT, margin: '4px 0', textAlign: 'center', letterSpacing: '-0.02em' }}>{fmt(counterVal)}</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#666', textAlign: 'center', margin: 0 }}>MORE in interest</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const brainSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const bankSp = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12 } });
  const arrowOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flowProgress = interpolate(frame, [85, dur - 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dopPulse = interpolate(frame % 45, [0, 22, 45], [1, 1.1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sparkOp = interpolate(frame % 45, [0, 10, 25, 45], [0.3, 1, 0.4, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 60, paddingTop: 80 }}>
        <div style={{ opacity: titleSp, textAlign: 'center', marginBottom: 20 }}>
          <p style={headline(56, WHITE)}>YOUR BRAIN</p>
          <p style={{ ...headline(56, ACCENT), marginTop: 8 }}>LOVES QUICK WINS</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#777', marginTop: 16, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>banks designed it that way</p>
        </div>

        <svg width="680" height="440" viewBox="0 0 680 440" style={{ overflow: 'visible' }}>
          <g transform={`translate(180, 210) scale(${interpolate(brainSp, [0, 1], [0, 1]) * dopPulse})`} opacity={brainSp}>
            <ellipse cx="0" cy="0" rx="130" ry="108" fill="#8B5CF618" />
            <path d="M-85,-18 Q-105,-82 -42,-92 Q0,-112 42,-92 Q105,-82 85,-18 Q108,44 64,66 Q32,84 0,74 Q-32,84 -64,66 Q-108,44 -85,-18 Z"
              fill="none" stroke="#8B5CF6" strokeWidth="4" />
            <path d="M-22,-75 Q0,-48 22,-75" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.6" />
            <path d="M-62,12 Q-30,32 0,12" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.6" />
            <path d="M0,12 Q30,32 62,12" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.6" />
            <text x="0" y="6" fontFamily="Arial Black" fontSize="20" fill="#8B5CF6" textAnchor="middle">DOPAMINE</text>
            <text x="0" y="28" fontFamily="Arial Black" fontSize="16" fill="#8B5CF680" textAnchor="middle">QUICK WIN</text>
            {[0, 1, 2, 3].map((i) => {
              const ang = i * 90 * Math.PI / 180;
              const sr = 148;
              return <circle key={i} cx={Math.cos(ang) * sr} cy={Math.sin(ang) * sr} r="9" fill="#F59E0B" opacity={sparkOp} />;
            })}
          </g>

          <g opacity={arrowOp}>
            <line x1="320" y1="210" x2="430" y2="210" stroke={ACCENT} strokeWidth="4" strokeDasharray="8,6" />
            <polygon points="430,200 452,210 430,220" fill={ACCENT} />
          </g>

          <g transform={`translate(530, 150) scale(${interpolate(bankSp, [0, 1], [0, 1])})`} opacity={bankSp}>
            <rect x="-55" y="10" width="110" height="90" fill="#1C1C1C" stroke="#F59E0B" strokeWidth="3" />
            <polygon points="-65,10 65,10 0,-40" fill="#1C1C1C" stroke="#F59E0B" strokeWidth="3" />
            {[-36, -12, 12, 36].map((cx, i) => (
              <rect key={i} x={cx - 5} y="10" width="10" height="90" fill="#252525" stroke="#F59E0B" strokeWidth="1" />
            ))}
            <rect x="-72" y="100" width="144" height="10" fill="#F59E0B" opacity="0.4" />
            <text x="0" y="62" fontFamily="Arial Black" fontSize="18" fill="#F59E0B" textAnchor="middle">BANK</text>
          </g>

          {[0, 1, 2].map((i) => {
            const sf = i * 0.25;
            const fx = interpolate(flowProgress, [sf, sf + 0.45], [240, 478], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const fOp = flowProgress > sf && flowProgress < sf + 0.65 ? 1 : 0;
            return <text key={i} x={fx} y={195 + i * 18} fontFamily="Arial Black" fontSize="26" fill={ACCENT} opacity={fOp} textAnchor="middle">$</text>;
          })}
        </svg>

        <div style={{
          opacity: interpolate(frame, [105, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          background: '#F59E0B18',
          border: '2px solid #F59E0B',
          borderRadius: 16,
          padding: '20px 40px',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#F59E0B', margin: 0 }}>BANKS PROFIT FROM THIS BIAS</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#666', margin: '8px 0 0', textAlign: 'center', textTransform: 'none' as const }}>your "wins" fund their revenue</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const item1Sp = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12 } });
  const item2Sp = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } });
  const item3Sp = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 12 } });
  const ctaSp = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10 } });
  const itemSps = [item1Sp, item2Sp, item3Sp];

  const debts = [
    { rate: '27% APR', amount: '$3,000', col: ACCENT, label: 'ATTACK NOW' },
    { rate: '22% APR', amount: '$6,000', col: '#F97316', label: '' },
    { rate: '18% APR', amount: '$2,000', col: '#F59E0B', label: '' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 60, paddingTop: 80 }}>
        <div style={{ opacity: titleSp, transform: `scale(${interpolate(titleSp, [0, 1], [0.85, 1])})`, textAlign: 'center', marginBottom: 36 }}>
          <p style={headline(52, BLACK)}>DO THIS TONIGHT</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#555', marginTop: 12, textAlign: 'center', letterSpacing: '0.05em', textTransform: 'none' as const }}>sort by rate. attack the top. save thousands.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {debts.map((d, i) => (
            <div key={i} style={{
              opacity: itemSps[i],
              transform: `translateX(${interpolate(itemSps[i], [0, 1], [-100, 0])}px)`,
              background: i === 0 ? `${d.col}18` : WHITE,
              border: `3px solid ${d.col}`,
              borderRadius: 16,
              padding: '24px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontFamily: FONT, fontSize: 40, color: d.col, width: 40, textAlign: 'center' }}>{i + 1}</div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 40, color: i === 0 ? d.col : BLACK }}>{d.rate}</div>
                  <div style={{ fontFamily: FONT, fontSize: 24, color: '#888', marginTop: 4 }}>{d.amount}</div>
                </div>
              </div>
              {d.label ? (
                <div style={{ background: ACCENT, borderRadius: 10, padding: '10px 18px' }}>
                  <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}>{d.label}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 36,
          opacity: ctaSp,
          transform: `scale(${interpolate(ctaSp, [0, 1], [0.85, 1])})`,
          background: `${ACCENT}14`,
          border: `3px solid ${ACCENT}`,
          borderRadius: 16,
          padding: '28px 40px',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 44, color: ACCENT, margin: 0 }}>SAVE $14,000</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#444', margin: '10px 0 0', textAlign: 'center', textTransform: 'none' as const }}>just by changing the order</p>
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
