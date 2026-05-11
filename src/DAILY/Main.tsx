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

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const card2Scale = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 14, stiffness: 100 } });
  const card3Scale = spring({ frame: Math.max(0, frame - 44), fps, config: { damping: 14, stiffness: 100 } });
  const xOpacity = interpolate(frame, [68, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noteOpacity = interpolate(frame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 50px' }}>
        <p style={{ ...headline(34, BLACK), opacity: titleOpacity }}>MIT's Economist Study</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, textAlign: 'center', margin: '8px 0 28px', opacity: 0.55 }}>Dan Ariely's landmark experiment</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 520 }}>
          <div style={{ transform: `scale(${card1Scale})`, background: WHITE, border: '2px solid #D1D5DB', borderRadius: 14, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>Web Only</p>
              <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, opacity: 0.45, margin: '4px 0 0' }}>Online access</p>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 34, color: '#10B981', fontWeight: 900 }}>$59</span>
          </div>

          <div style={{ position: 'relative' as const, transform: `scale(${card2Scale})` }}>
            <div style={{ background: '#FEE2E2', border: '2px solid #EF4444', borderRadius: 14, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>Print Only</p>
                <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, opacity: 0.45, margin: '4px 0 0' }}>Physical magazine</p>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 34, color: '#EF4444', fontWeight: 900 }}>$125</span>
            </div>
            <svg width={54} height={54} viewBox="0 0 54 54" style={{ position: 'absolute' as const, right: 18, top: '50%', transform: 'translateY(-50%)', opacity: xOpacity }}>
              <line x1={8} y1={8} x2={46} y2={46} stroke="#EF4444" strokeWidth={7} strokeLinecap="round" />
              <line x1={46} y1={8} x2={8} y2={46} stroke="#EF4444" strokeWidth={7} strokeLinecap="round" />
            </svg>
          </div>

          <div style={{ transform: `scale(${card3Scale})`, background: ACCENT + '18', border: `3px solid ${ACCENT}`, borderRadius: 14, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>Web + Print</p>
              <p style={{ fontFamily: FONT, fontSize: 15, color: ACCENT, margin: '4px 0 0' }}>Best value!</p>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, fontWeight: 900 }}>$125</span>
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, textAlign: 'center', margin: '24px 0 0', lineHeight: 1.55, opacity: noteOpacity }}>
          Print-only was never meant to sell — it just makes web+print look obvious.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar32H = interpolate(frame, [15, 100], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar84H = interpolate(frame, [30, 115], [0, 264], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowScale = spring({ frame: Math.max(0, frame - 108), fps, config: { damping: 14, stiffness: 140 } });
  const labelOpacity = interpolate(frame, [112, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px 80px' }}>
        <p style={{ ...headline(40, ACCENT), opacity: titleOpacity }}>The Shocking Result</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 44px', opacity: 0.65 }}>
          % choosing the expensive bundle:
        </p>

        <div style={{ display: 'flex', gap: 80, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: FONT, fontSize: 54, color: WHITE, letterSpacing: '-0.02em' }}>32%</span>
            <div style={{ position: 'relative' as const, width: 110, height: 270 }}>
              <div style={{ position: 'absolute' as const, bottom: 0, left: 0, right: 0, height: bar32H, background: '#4B5563', borderRadius: '8px 8px 0 0' }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, opacity: 0.55, textAlign: 'center', margin: 0 }}>No<br />decoy</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: FONT, fontSize: 54, color: ACCENT, letterSpacing: '-0.02em' }}>84%</span>
            <div style={{ position: 'relative' as const, width: 110, height: 270 }}>
              <div style={{ position: 'absolute' as const, bottom: 0, left: 0, right: 0, height: bar84H, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, textAlign: 'center', margin: 0 }}>With<br />decoy</p>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, transform: `scale(${arrowScale})`, marginTop: 28, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, lineHeight: 1.5, margin: 0 }}>
            One fake option nearly tripled premium sales — and this trick is everywhere you spend money.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Scale = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const item2Scale = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 16, stiffness: 90 } });
  const item3Scale = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 16, stiffness: 90 } });
  const ctaOpacity = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const services = [
    { name: 'Streaming', tiers: ['Basic $8', 'Standard $14', 'Premium $16'] },
    { name: 'Gym Membership', tiers: ['Silver $25', 'Gold $40', 'Platinum $44'] },
    { name: 'Coffee', tiers: ['Small $3', 'Medium $5', 'Large $5.50'] },
  ];
  const itemScales = [item1Scale, item2Scale, item3Scale];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 50px' }}>
        <p style={{ ...headline(38, BLACK), opacity: headerOpacity }}>It's Everywhere</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 560, marginTop: 28 }}>
          {services.map((s, i) => (
            <div key={s.name} style={{ transform: `scale(${itemScales[i]})`, background: WHITE, border: '2px solid #E5E7EB', borderRadius: 16, padding: '18px 22px' }}>
              <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '0 0 12px' }}>{s.name}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {s.tiers.map((tier, ti) => (
                  <div key={tier} style={{
                    flex: 1,
                    textAlign: 'center' as const,
                    padding: '8px 4px',
                    borderRadius: 10,
                    background: ti === 1 ? '#FEF3C7' : 'transparent',
                    border: ti === 1 ? `2px solid ${ACCENT}` : '2px solid #E5E7EB',
                  }}>
                    <p style={{ fontFamily: FONT, fontSize: 13, color: ti === 1 ? ACCENT : BLACK, margin: 0, opacity: ti === 1 ? 1 : 0.6 }}>{tier}</p>
                    {ti === 1 && <p style={{ fontFamily: FONT, fontSize: 11, color: ACCENT, margin: '3px 0 0' }}>DECOY</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: FONT, fontSize: 25, color: BLACK, textAlign: 'center', margin: '26px 0 0', lineHeight: 1.55, opacity: ctaOpacity }}>
          Three choices, one trap — and next, we'll show you the real dollar cost.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const piggyScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const yearlyAmt = interpolate(frame, [15, 128], [0, 2800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeOpacity = interpolate(frame, [140, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeScale = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={headline(36, WHITE)}>The Real Cost</p>

        <svg width={200} height={196} viewBox="0 0 200 196" style={{ transform: `scale(${piggyScale})`, marginTop: 20 }}>
          <ellipse cx={95} cy={118} rx={72} ry={62} fill={ACCENT} />
          <circle cx={158} cy={88} r={34} fill={ACCENT} />
          <circle cx={168} cy={80} r={5} fill={BLACK} />
          <ellipse cx={185} cy={94} rx={13} ry={10} fill="#F97316" />
          <circle cx={181} cy={94} r={3} fill={BLACK} />
          <circle cx={189} cy={94} r={3} fill={BLACK} />
          <ellipse cx={148} cy={58} rx={10} ry={13} fill="#F97316" />
          <rect x={80} y={54} width={28} height={6} rx={3} fill={BLACK} />
          <rect x={50} y={170} width={18} height={24} rx={7} fill="#F97316" />
          <rect x={75} y={170} width={18} height={24} rx={7} fill="#F97316" />
          <rect x={100} y={170} width={18} height={24} rx={7} fill="#F97316" />
          <rect x={125} y={170} width={18} height={24} rx={7} fill="#F97316" />
          <path d="M26,105 Q10,88 16,72 Q22,56 18,44" fill="none" stroke="#F97316" strokeWidth={5} strokeLinecap="round" />
        </svg>

        <div style={{ marginTop: 26, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, opacity: 0.65, margin: '0 0 6px' }}>Decoy pricing costs you per year:</p>
          <span style={{ fontFamily: FONT, fontSize: 86, color: ACCENT, letterSpacing: '-0.02em' }}>
            ${Math.round(yearlyAmt).toLocaleString()}
          </span>
        </div>

        <div style={{ opacity: lifetimeOpacity, transform: `scale(${lifetimeScale})`, marginTop: 20, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.65, margin: '0 0 6px' }}>Invested over 40 years at 7%:</p>
          <span style={{ fontFamily: FONT, fontSize: 60, color: '#EF4444', letterSpacing: '-0.02em' }}>$588,000</span>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.8, margin: '10px 0 0' }}>
            Gone — to a price never meant to be chosen.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const box2Scale = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 120 } });
  const box3Scale = spring({ frame: Math.max(0, frame - 36), fps, config: { damping: 14, stiffness: 120 } });
  const labelOpacity = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={headline(44, ACCENT)}>The Decoy Effect</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: '12px 0 40px', opacity: 0.8, lineHeight: 1.5 }}>
          One fake price makes you spend more — every time.
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ transform: `scale(${box1Scale})`, background: '#1E1E1E', border: '2px solid #444', borderRadius: 16, padding: '24px 18px', width: 160, textAlign: 'center' as const }}>
            <p style={{ fontFamily: FONT, fontSize: 17, color: WHITE, opacity: 0.55, margin: '0 0 10px' }}>BASIC</p>
            <p style={{ fontFamily: FONT, fontSize: 46, color: WHITE, margin: 0 }}>$9</p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, opacity: 0.45, margin: '8px 0 0' }}>per month</p>
          </div>

          <div style={{ position: 'relative' as const, transform: `scale(${box2Scale})` }}>
            <div style={{ position: 'absolute' as const, top: -16, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: labelOpacity }}>
              <span style={{ background: '#EF4444', fontFamily: FONT, fontSize: 13, color: WHITE, padding: '3px 14px', borderRadius: 20 }}>DECOY</span>
            </div>
            <div style={{ background: '#1E1E1E', border: '2px solid #EF4444', borderRadius: 16, padding: '24px 18px', width: 160, textAlign: 'center' as const }}>
              <p style={{ fontFamily: FONT, fontSize: 17, color: '#EF4444', margin: '0 0 10px' }}>STANDARD</p>
              <p style={{ fontFamily: FONT, fontSize: 46, color: WHITE, margin: 0 }}>$18</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, opacity: 0.45, margin: '8px 0 0' }}>per month</p>
            </div>
          </div>

          <div style={{ transform: `scale(${box3Scale})`, background: ACCENT + '22', border: `3px solid ${ACCENT}`, borderRadius: 16, padding: '24px 18px', width: 160, textAlign: 'center' as const }}>
            <p style={{ fontFamily: FONT, fontSize: 17, color: ACCENT, margin: '0 0 10px' }}>PREMIUM</p>
            <p style={{ fontFamily: FONT, fontSize: 46, color: ACCENT, margin: 0 }}>$20</p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, opacity: 0.45, margin: '8px 0 0' }}>per month</p>
          </div>
        </div>

        <div style={{ opacity: textOpacity, marginTop: 40, maxWidth: 700 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', lineHeight: 1.55, margin: 0 }}>
            MIT proved it can nearly triple premium sales — and next we'll show you the exact experiment.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shieldScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const step1Opacity = interpolate(frame, [22, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Opacity = interpolate(frame, [62, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 12, stiffness: 160 } });
  const checkOffset = interpolate(frame, [18, 82], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px 120px' }}>
        <p style={headline(44, BLACK)}>Your Defense</p>

        <svg width={190} height={215} viewBox="0 0 190 215" style={{ transform: `scale(${shieldScale})`, marginTop: 20 }}>
          <path d="M95,8 L172,42 L172,108 C172,158 137,192 95,207 C53,192 18,158 18,108 L18,42 Z" fill={ACCENT} />
          <path d="M55,108 L80,138 L140,72" fill="none" stroke={BLACK} strokeWidth={13}
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="120" strokeDashoffset={checkOffset} />
        </svg>

        <div style={{ width: '100%', maxWidth: 580, marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ opacity: step1Opacity, display: 'flex', alignItems: 'center', gap: 16, background: ACCENT + '22', borderRadius: 14, padding: '16px 22px' }}>
            <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT, minWidth: 36, textAlign: 'center' as const }}>1</span>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Skip the middle tier</p>
              <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '4px 0 0', opacity: 0.6 }}>It exists only to trick you — ignore it.</p>
            </div>
          </div>

          <div style={{ opacity: step2Opacity, display: 'flex', alignItems: 'center', gap: 16, background: ACCENT + '22', borderRadius: 14, padding: '16px 22px' }}>
            <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT, minWidth: 36, textAlign: 'center' as const }}>2</span>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Compare cheapest vs. priciest</p>
              <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '4px 0 0', opacity: 0.6 }}>Does the gap justify the jump?</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, transform: `scale(${ctaScale})`, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0 }}>
            Two seconds. Saves you <span style={{ color: ACCENT }}>$2,800/year</span>.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '10px 0 0', opacity: 0.5 }}>
            Follow for more money psychology you can actually use.
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
