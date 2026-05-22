import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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

  const tagScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const tagRotate = interpolate(frame, [0, 25], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
        <svg
          width={280}
          height={300}
          viewBox="0 0 280 300"
          style={{ transform: `scale(${tagScale}) rotate(${tagRotate}deg)` }}
        >
          <rect x={20} y={30} width={240} height={230} rx={20} fill={ACCENT} />
          <circle cx={140} cy={55} r={16} fill={BG_DARK} />
          <line x1={140} y1={14} x2={140} y2={39} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
          <text x={140} y={165} textAnchor="middle" fontFamily={FONT} fontSize={64} fontWeight="bold" fill={BG_DARK}>SALE</text>
          <text x={140} y={218} textAnchor="middle" fontFamily={FONT} fontSize={38} fill={BG_DARK}>40% OFF</text>
        </svg>

        <div style={{ opacity: textOpacity, textAlign: 'center', padding: '0 60px' }}>
          <p style={headline(50, WHITE)}>YOU THINK SALES</p>
          <p style={headline(50, ACCENT)}>SAVE MONEY</p>
        </div>

        <div style={{ opacity: subOpacity, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#aaa', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            Science proves the exact opposite is true.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const glowPulse = interpolate(frame % 60, [0, 30, 60], [0.4, 1, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <svg width={300} height={260} viewBox="0 0 300 260" style={{ transform: `scale(${brainScale})` }}>
          <ellipse cx={150} cy={120} rx={115} ry={100} fill="none" stroke={BLACK} strokeWidth={6} />
          <path d="M 35 120 Q 5 80 35 55" fill="none" stroke={BLACK} strokeWidth={6} />
          <path d="M 265 120 Q 295 80 265 55" fill="none" stroke={BLACK} strokeWidth={6} />
          <path d="M 75 100 Q 120 78 165 100 Q 205 122 245 100" fill="none" stroke={BLACK} strokeWidth={4} />
          <path d="M 65 145 Q 110 165 155 145 Q 195 125 235 145" fill="none" stroke={BLACK} strokeWidth={4} />
          <circle cx={150} cy={112} r={52} fill={ACCENT} opacity={glowPulse * 0.5} />
          <circle cx={150} cy={112} r={32} fill={ACCENT} opacity={glowPulse} />
          <text x={150} y={108} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={BG_DARK}>REWARD</text>
          <text x={150} y={126} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={BG_DARK}>CENTER</text>
        </svg>

        <div style={{ opacity: textOpacity, textAlign: 'center', padding: '0 60px' }}>
          <p style={headline(44, BLACK)}>DISCOUNTS HIJACK</p>
          <p style={headline(44, ACCENT)}>YOUR BRAIN</p>
        </div>

        <div style={{ opacity: subOpacity, padding: '0 70px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            "SALE" floods you with dopamine — same hit as gambling. Rational thinking checks out.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barWidth = interpolate(frame, [20, 90], [0, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countedPct = Math.floor(interpolate(frame, [20, 90], [0, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const stat2Opacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countedDollar = Math.floor(interpolate(frame, [60, 140], [0, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const subOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
        <div style={{ opacity: headerOpacity }}>
          <p style={headline(46, WHITE)}>THE REAL NUMBERS</p>
        </div>

        <div style={{ width: 880, padding: '0 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
            <p style={{ fontFamily: FONT, fontSize: 100, color: ACCENT, margin: 0, lineHeight: 1 }}>{countedPct}%</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, lineHeight: 1.4 }}>
              of sale purchases<br />were NOT planned
            </p>
          </div>
          <div style={{ width: '100%', height: 22, background: '#333', borderRadius: 11 }}>
            <div style={{ width: `${barWidth}%`, height: '100%', background: ACCENT, borderRadius: 11 }} />
          </div>
        </div>

        <div style={{ opacity: stat2Opacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0 }}>Average shopper loses</p>
          <p style={{ fontFamily: FONT, fontSize: 110, color: ACCENT, margin: 0, lineHeight: 1 }}>${countedDollar}</p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0 }}>per year on unplanned deals</p>
        </div>

        <div style={{ opacity: subOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#aaa', textAlign: 'center', margin: 0 }}>
            And retailers make this problem even worse...
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tag1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const tag2Scale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 90 } });
  const arrowOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <p style={headline(46, BLACK)}>THE SAVINGS LIE</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ transform: `scale(${tag1Scale})` }}>
            <svg width={180} height={200} viewBox="0 0 180 200">
              <rect x={10} y={20} width={160} height={160} rx={15} fill="#ddd" />
              <circle cx={90} cy={42} r={13} fill={BG_LIGHT} />
              <text x={90} y={118} textAnchor="middle" fontFamily={FONT} fontSize={42} fill="#888">$100</text>
              <line x1={18} y1={98} x2={162} y2={136} stroke="#EF4444" strokeWidth={7} />
            </svg>
          </div>

          <div style={{ opacity: arrowOpacity }}>
            <svg width={60} height={40} viewBox="0 0 60 40">
              <path d="M 0 20 L 44 20 M 32 8 L 54 20 L 32 32" stroke={ACCENT} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ transform: `scale(${tag2Scale})` }}>
            <svg width={180} height={200} viewBox="0 0 180 200">
              <rect x={10} y={20} width={160} height={160} rx={15} fill={ACCENT} />
              <circle cx={90} cy={42} r={13} fill={BG_LIGHT} />
              <text x={90} y={108} textAnchor="middle" fontFamily={FONT} fontSize={44} fill={BG_DARK}>$60</text>
              <text x={90} y={150} textAnchor="middle" fontFamily={FONT} fontSize={24} fill={BG_DARK}>SAVE $40!</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center', padding: '0 70px' }}>
          <p style={headline(42, BLACK)}>YOUR BRAIN FEELS</p>
          <p style={headline(42, ACCENT)}>RICH, NOT POORER</p>
        </div>

        <div style={{ opacity: subOpacity, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            You spent $60 you never planned to — but dopamine says it was a win.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight1 = interpolate(frame, [20, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight2 = interpolate(frame, [80, 120], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const saleOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const saleScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 120 } });
  const subOpacity = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceVal1 = Math.floor(interpolate(frame, [20, 65], [70, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <div style={{ opacity: headerOpacity, textAlign: 'center' }}>
          <p style={headline(44, WHITE)}>THE RETAILER</p>
          <p style={headline(44, ACCENT)}>PLAYBOOK</p>
        </div>

        <div style={{ position: 'relative' }}>
          <svg width={520} height={300} viewBox="0 0 520 300">
            <line x1={60} y1={20} x2={60} y2={255} stroke={WHITE} strokeWidth={3} />
            <line x1={60} y1={255} x2={480} y2={255} stroke={WHITE} strokeWidth={3} />
            <text x={30} y={58} textAnchor="middle" fontFamily={FONT} fontSize={15} fill="#aaa">$140</text>
            <text x={30} y={178} textAnchor="middle" fontFamily={FONT} fontSize={15} fill="#aaa">$70</text>
            <rect x={100} y={255 - barHeight1 * 190} width={90} height={barHeight1 * 190} fill="#EF4444" rx={6} />
            <text x={145} y={Math.max(30, 255 - barHeight1 * 190 - 10)} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={WHITE}>${priceVal1}</text>
            <text x={145} y={278} textAnchor="middle" fontFamily={FONT} fontSize={14} fill="#aaa">INFLATED</text>
            <rect x={300} y={255 - barHeight2 * 190} width={90} height={barHeight2 * 190} fill={ACCENT} rx={6} opacity={saleOpacity} />
            <text x={345} y={255 - barHeight2 * 190 - 10} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={WHITE} opacity={saleOpacity}>$84</text>
            <text x={345} y={278} textAnchor="middle" fontFamily={FONT} fontSize={14} fill="#aaa" opacity={saleOpacity}>"SALE"</text>
          </svg>
          <div style={{ position: 'absolute', top: 10, right: 10, opacity: saleOpacity, transform: `scale(${saleScale})` }}>
            <svg width={110} height={110} viewBox="0 0 110 110">
              <circle cx={55} cy={55} r={50} fill={ACCENT} />
              <text x={55} y={48} textAnchor="middle" fontFamily={FONT} fontSize={17} fontWeight="bold" fill={BG_DARK}>40%</text>
              <text x={55} y={72} textAnchor="middle" fontFamily={FONT} fontSize={17} fontWeight="bold" fill={BG_DARK}>OFF!</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: subOpacity, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 29, color: WHITE, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            Retailers inflate prices up to 83% before the sale — so 40% off was never real.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const listOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check1 = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2 = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check3 = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = ['Make a list BEFORE you shop', 'Wait 48 hours on any deal', 'Never browse without a goal'];
  const checks = [check1, check2, check3];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
        <div style={{ transform: `scale(${headerScale})`, textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>BEAT THE TRAP</p>
          <p style={headline(44, ACCENT)}>3 RULES</p>
        </div>

        <div style={{ opacity: listOpacity, width: 840, padding: '0 40px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 38 }}>
              <svg width={56} height={56} viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
                <rect x={2} y={2} width={52} height={52} rx={10} fill="none" stroke={ACCENT} strokeWidth={4} />
                <path
                  d="M 12 28 L 24 40 L 44 16"
                  stroke={ACCENT}
                  strokeWidth={5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={checks[i]}
                />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 31, color: BLACK, margin: 0, lineHeight: 1.3 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ opacity: ctaOpacity, textAlign: 'center', padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            Save this. Your wallet will thank future you.
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
