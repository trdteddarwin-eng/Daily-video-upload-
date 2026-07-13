import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

const HouseSVG: React.FC<{ fill: string }> = ({ fill }) => (
  <svg width="160" height="176" viewBox="0 0 160 176">
    <polygon points="80,8 158,88 2,88" fill={fill} />
    <rect x="18" y="88" width="124" height="88" rx="3" fill={fill} />
    <rect x="62" y="128" width="36" height="48" rx="4" fill={BG_DARK} opacity="0.45" />
    <rect x="26" y="98" width="32" height="24" rx="3" fill={BG_DARK} opacity="0.35" />
    <rect x="102" y="98" width="32" height="24" rx="3" fill={BG_DARK} opacity="0.35" />
  </svg>
);

const BankSVG: React.FC<{ fill: string }> = ({ fill }) => (
  <svg width="200" height="180" viewBox="0 0 200 180">
    <polygon points="100,6 195,54 5,54" fill={fill} />
    <rect x="8" y="54" width="184" height="112" rx="2" fill={fill} />
    <rect x="0" y="162" width="200" height="18" rx="2" fill={fill} />
    {([22, 55, 88, 121, 154] as number[]).map((x, i) => (
      <rect key={i} x={x} y="60" width="14" height="92" rx="3" fill={BG_DARK} opacity="0.22" />
    ))}
    <rect x="80" y="120" width="40" height="42" rx="3" fill={BG_DARK} opacity="0.38" />
  </svg>
);

// Scene 1 – Dark – Hook: bank charges $900 for biweekly program
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleY = interpolate(frame, [0, 22], [-90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarSc = spring({ frame: frame - 18, fps, config: { stiffness: 90, damping: 12 } });
  const houseY = interpolate(frame, [30, 58], [260, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagSc = spring({ frame: frame - 60, fps, config: { stiffness: 130, damping: 14 } });
  const subOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, opacity: titleOp, textAlign: 'center', marginBottom: 10 }}>
          <p style={headline(58, WHITE)}>YOUR BANK</p>
          <p style={headline(54, WHITE)}>CHARGES YOU</p>
        </div>
        <div style={{ transform: `scale(${dollarSc})`, marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 130, color: '#EF4444', letterSpacing: '0.05em', textAlign: 'center', margin: 0, lineHeight: 1 }}>$900</p>
        </div>
        <div style={{ transform: `translateY(${houseY}px)`, marginBottom: 28 }}>
          <HouseSVG fill={ACCENT} />
        </div>
        <div style={{
          transform: `scale(${tagSc})`,
          background: 'rgba(239,68,68,0.18)',
          border: '3px solid #EF4444',
          borderRadius: 18,
          padding: '12px 36px',
          marginBottom: 24,
        }}>
          <p style={headline(34, '#EF4444')}>BIWEEKLY PROGRAM</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, textAlign: 'center', margin: 0, opacity: subOp }}>
          for something you can do FREE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 – Light – How biweekly works: 26 half-payments = 13 full
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const headerOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const colOp = interpolate(frame, [20, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eqOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const highlightSc = spring({ frame: frame - 110, fps, config: { stiffness: 100, damping: 14 } });

  const monthlyCount = 12;
  const biweeklyCount = 26;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
      }}>
        <p style={{ ...headline(48, BLACK), opacity: headerOp, marginBottom: 40 }}>HOW IT WORKS</p>

        <div style={{ display: 'flex', gap: 32, opacity: colOp, marginBottom: 36, width: '100%', justifyContent: 'center' }}>
          {/* Monthly column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(26, BLACK)}>MONTHLY</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', maxWidth: 170 }}>
              {Array(Math.max(0, Math.floor(monthlyCount))).fill(0).map((_, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#9CA3AF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <p style={headline(20, '#9CA3AF')}>12 PAYMENTS</p>
          </div>

          {/* Biweekly column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(26, ACCENT)}>BIWEEKLY</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', maxWidth: 190 }}>
              {Array(Math.max(0, Math.floor(biweeklyCount))).fill(0).map((_, i) => (
                <div key={i} style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: i < 24 ? ACCENT : '#F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 10, color: WHITE }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <p style={headline(20, ACCENT)}>26 PAYMENTS</p>
          </div>
        </div>

        <div style={{ opacity: eqOp, textAlign: 'center', marginBottom: 30 }}>
          <p style={headline(34, BLACK)}>= 13 FULL PAYMENTS</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#6B7280', textAlign: 'center', margin: '8px 0 0' }}>(vs 12 normally)</p>
        </div>

        <div style={{
          transform: `scale(${highlightSc})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '18px 36px',
        }}>
          <p style={headline(30, WHITE)}>ONE EXTRA PAYMENT/YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 – Dark – $34,000 savings counter + bar comparison
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const labelOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.round(interpolate(frame, [10, 120], [0, 34000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const bar1W = interpolate(frame, [40, 110], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [60, 130], [0, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const formatted = '$' + counterVal.toLocaleString();

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <p style={{ ...headline(42, WHITE), opacity: labelOp, marginBottom: 6 }}>INTEREST SAVED</p>
        <p style={{ fontFamily: FONT, fontSize: 104, color: ACCENT, letterSpacing: '0.04em', textAlign: 'center', margin: '0 0 6px', lineHeight: 1 }}>{formatted}</p>
        <p style={{ ...headline(30, WHITE), opacity: labelOp, marginBottom: 50 }}>ON A TYPICAL MORTGAGE</p>

        <div style={{ width: '100%', marginBottom: 18 }}>
          <p style={{ ...headline(20, '#9CA3AF'), marginBottom: 8 }}>30-YEAR MORTGAGE (NO TRICK)</p>
          <div style={{ width: '100%', height: 36, background: '#2a2a2a', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${bar1W}%`, height: '100%', background: '#EF4444', borderRadius: 10 }} />
          </div>
        </div>

        <div style={{ width: '100%', marginBottom: 44 }}>
          <p style={{ ...headline(20, ACCENT), marginBottom: 8 }}>WITH BIWEEKLY (~25 YRS)</p>
          <div style={{ width: '100%', height: 36, background: '#2a2a2a', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${bar2W}%`, height: '100%', background: ACCENT, borderRadius: 10 }} />
          </div>
        </div>

        <p style={{ ...headline(40, WHITE), opacity: ctaOp }}>4-5 YEARS EARLIER</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 – Light – Banks sell you back your own trick for $900
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const bankSc = spring({ frame, fps, config: { stiffness: 70, damping: 15 } });
  const tagOp = interpolate(frame, [28, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xSc = spring({ frame: frame - 58, fps, config: { stiffness: 200, damping: 18 } });
  const textOp = interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <p style={{ ...headline(46, BLACK), marginBottom: 32 }}>THE BANK KNOWS</p>

        <div style={{ position: 'relative', transform: `scale(${bankSc})`, marginBottom: 36 }}>
          <BankSVG fill={BLACK} />
          <div style={{
            position: 'absolute',
            top: 14,
            right: -28,
            opacity: tagOp,
            background: '#EF4444',
            borderRadius: 12,
            padding: '8px 18px',
            transform: 'rotate(12deg)',
          }}>
            <p style={headline(26, WHITE)}>$900 FEE</p>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${xSc})`,
          }}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <line x1="18" y1="18" x2="132" y2="132" stroke="#EF4444" strokeWidth="16" strokeLinecap="round" />
              <line x1="132" y1="18" x2="18" y2="132" stroke="#EF4444" strokeWidth="16" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div style={{ opacity: textOp, textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>THEY SELL YOU</p>
          <p style={headline(42, ACCENT)}>YOUR OWN TRICK</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#6B7280', textAlign: 'center', margin: '14px 0 0' }}>for $900</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 – Dark – The free DIY method
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Op = interpolate(frame, [18, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [46, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [74, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exampleSc = spring({ frame: frame - 112, fps, config: { stiffness: 88, damping: 14 } });

  const cardStyle: React.CSSProperties = {
    background: '#1E1E1E',
    borderRadius: 16,
    padding: '18px 28px',
    borderLeft: `6px solid ${ACCENT}`,
    width: '100%',
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <p style={{ ...headline(52, WHITE), opacity: titleOp, marginBottom: 38 }}>THE FREE WAY</p>

        <div style={{ opacity: step1Op, width: '100%', marginBottom: 20 }}>
          <div style={cardStyle}>
            <p style={{ ...headline(20, '#9CA3AF'), marginBottom: 6 }}>STEP 1</p>
            <p style={headline(30, WHITE)}>FIND YOUR MONTHLY</p>
            <p style={headline(30, WHITE)}>MORTGAGE PAYMENT</p>
          </div>
        </div>

        <div style={{ opacity: step2Op, width: '100%', marginBottom: 20 }}>
          <div style={cardStyle}>
            <p style={{ ...headline(20, '#9CA3AF'), marginBottom: 6 }}>STEP 2</p>
            <p style={headline(30, WHITE)}>DIVIDE BY 12</p>
          </div>
        </div>

        <div style={{ opacity: step3Op, width: '100%', marginBottom: 34 }}>
          <div style={cardStyle}>
            <p style={{ ...headline(20, '#9CA3AF'), marginBottom: 6 }}>STEP 3</p>
            <p style={headline(30, WHITE)}>ADD AS EXTRA PRINCIPAL</p>
            <p style={headline(28, WHITE)}>EACH MONTH</p>
          </div>
        </div>

        <div style={{
          transform: `scale(${exampleSc})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '18px 36px',
          textAlign: 'center',
        }}>
          <p style={headline(26, WHITE)}>$1,500 ÷ 12 = $125/MO EXTRA</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 – Light – Payoff + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const houseSc = spring({ frame, fps, config: { stiffness: 80, damping: 14 } });
  const checkSc = spring({ frame: frame - 28, fps, config: { stiffness: 200, damping: 18 } });
  const stat1Op = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSc = spring({ frame: frame - 118, fps, config: { stiffness: 88, damping: 12 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <div style={{ position: 'relative', transform: `scale(${houseSc})`, marginBottom: 24 }}>
          <HouseSVG fill={ACCENT} />
          <div style={{
            position: 'absolute',
            bottom: -14,
            right: -14,
            transform: `scale(${checkSc})`,
            background: ACCENT,
            borderRadius: '50%',
            width: 58,
            height: 58,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="34" height="34" viewBox="0 0 34 34">
              <polyline points="6,17 14,26 28,9" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        <div style={{ background: ACCENT, borderRadius: 14, padding: '10px 30px', marginBottom: 30 }}>
          <p style={headline(42, WHITE)}>PAID OFF EARLY</p>
        </div>

        <div style={{ opacity: stat1Op, marginBottom: 12 }}>
          <p style={headline(50, BLACK)}>SAVE $34,000</p>
        </div>
        <div style={{ opacity: stat2Op, marginBottom: 42 }}>
          <p style={headline(44, ACCENT)}>5 YEARS FASTER</p>
        </div>

        <div style={{
          transform: `scale(${ctaSc})`,
          background: BLACK,
          borderRadius: 20,
          padding: '22px 38px',
          textAlign: 'center',
        }}>
          <p style={headline(26, WHITE)}>FOLLOW FOR MORE TRICKS</p>
          <p style={headline(26, ACCENT)}>THEY PROFIT FROM HIDING</p>
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
