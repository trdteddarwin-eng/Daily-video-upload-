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
  const tagScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const strikeW = interpolate(frame, [50, 110], [0, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [30, 60], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        {/* Price tag */}
        <svg width={340} height={310} viewBox="0 0 340 310" style={{ transform: `scale(${tagScale})` }}>
          <rect x={10} y={30} width={310} height={210} rx={20} fill={ACCENT} />
          <circle cx={170} cy={52} r={20} fill={BG_DARK} />
          <line x1={170} y1={30} x2={170} y2={0} stroke={WHITE} strokeWidth={4} />
          <text x={170} y={185} textAnchor="middle" fontFamily={FONT} fontSize={98} fontWeight="900" fill={BLACK}>$9.99</text>
          {/* Animated red strikethrough */}
          <rect x={28} y={158} width={strikeW} height={11} rx={5} fill="#EF4444" />
          <text x={170} y={272} textAnchor="middle" fontFamily={FONT} fontSize={34} fill={WHITE} opacity={0.7}>Your brain says: ≈ $9</text>
        </svg>

        <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, marginTop: 32 }}>
          <p style={headline(52, ACCENT)}>Charm Pricing</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: '14px 0 0', opacity: 0.85 }}>
            costs you $1,400 every year
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 100, left: 40, right: 40, opacity: textOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', lineHeight: 1.55, margin: 0 }}>
            Every price ending in nine was put there on purpose — and it's working on you right now.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brainScale = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const nineScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 140 } });
  const arrowOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOpacity = interpolate(frame, [55, 85], [0, 0.35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={headline(36, BLACK)}>Left-Digit Anchoring</p>

        {/* Brain SVG */}
        <svg width={240} height={210} viewBox="0 0 240 210" style={{ transform: `scale(${brainScale})`, marginTop: 16 }}>
          <path d="M120,20 C75,20 38,55 38,100 C38,148 72,185 112,190 L120,192 L128,190 C168,185 202,148 202,100 C202,55 165,20 120,20 Z" fill="none" stroke={ACCENT} strokeWidth={5} />
          <line x1={120} y1={28} x2={120} y2={186} stroke={ACCENT} strokeWidth={3} strokeDasharray="8 5" />
          <path d="M65,85 Q90,70 115,85 Q140,100 160,85" fill="none" stroke={ACCENT} strokeWidth={3} />
          <path d="M65,118 Q90,103 115,118 Q140,133 160,118" fill="none" stroke={ACCENT} strokeWidth={3} />
          <path d="M72,152 Q97,137 122,152 Q147,167 172,152" fill="none" stroke={ACCENT} strokeWidth={3} />
        </svg>

        {/* Number breakdown */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 16, gap: 4 }}>
          <span style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, lineHeight: 1, display: 'inline-block', transform: `scale(${nineScale})` }}>$9</span>
          <span style={{ fontFamily: FONT, fontSize: 64, color: BLACK, opacity: fadeOpacity, lineHeight: 1 }}>.99</span>
        </div>

        {/* Arrow + label */}
        <div style={{ opacity: arrowOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <svg width={220} height={36} viewBox="0 0 220 36">
            <path d="M10,18 H188 M174,6 L200,18 L174,30" fill="none" stroke="#EF4444" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#EF4444', margin: '4px 0 0', textAlign: 'center' }}>Brain anchors on the 9 — ignores the rest</p>
        </div>

        <div style={{ marginTop: 28, background: ACCENT + '25', borderRadius: 16, padding: '18px 28px', maxWidth: 520 }}>
          <p style={{ fontFamily: FONT, fontSize: 27, color: BLACK, textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            You read left to right, so your mind registers the price as "close to nine dollars" — even though it's almost ten.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pct = interpolate(frame, [20, 110], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const prices = ['$1.99', '$4.99', '$9.99', '$14.99', '$19.99', '$29.99', '$39.99', '$49.99', '$99.99'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '72px 40px 40px' }}>
        <p style={headline(44, ACCENT)}>60% of All Retail Prices</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: '10px 0 24px', opacity: 0.8 }}>...end in 9. Sound familiar?</p>

        {/* Grid of price tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 14, justifyContent: 'center', maxWidth: 860 }}>
          {prices.map((price, i) => {
            const tagOpacity = interpolate(frame, [10 + i * 10, 28 + i * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const tagScale = spring({ frame: Math.max(0, frame - 10 - i * 10), fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div key={price} style={{ opacity: tagOpacity, transform: `scale(${tagScale})` }}>
                <svg width={148} height={108} viewBox="0 0 148 108">
                  <rect x={4} y={18} width={136} height={82} rx={12} fill={ACCENT} />
                  <circle cx={74} cy={28} r={10} fill={BG_DARK} />
                  <line x1={74} y1={18} x2={74} y2={2} stroke={WHITE} strokeWidth={3} />
                  <text x={74} y={80} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight="900" fill={BLACK}>{price}</text>
                </svg>
              </div>
            );
          })}
        </div>

        {/* Counter */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 76, color: ACCENT, letterSpacing: '-0.02em' }}>{Math.round(pct)}%</span>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: '8px 0 0', opacity: 0.85 }}>
            of prices engineered to feel cheaper — and it's coming for you at checkout.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bar34H = interpolate(frame, [20, 100], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar39H = interpolate(frame, [20, 100], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOffset = interpolate(frame, [90, 150], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dressPath = 'M30,10 L18,42 L8,42 L22,84 L34,84 L34,118 L66,118 L66,84 L78,84 L92,42 L82,42 L70,10 Q50,26 30,10 Z';

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px 80px' }}>
        <p style={headline(36, BLACK)}>MIT Proved It in 1996</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, textAlign: 'center', margin: '10px 0 30px', opacity: 0.65 }}>Same dress. Two prices. Shocking result.</p>

        <div style={{ display: 'flex', gap: 70, alignItems: 'flex-end' }}>
          {/* $34 column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width={100} height={128} viewBox="0 0 100 128">
              <path d={dressPath} fill="#9CA3AF" stroke={BLACK} strokeWidth={2} />
            </svg>
            <div style={{ background: '#9CA3AF', borderRadius: 10, padding: '8px 18px' }}>
              <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE, fontWeight: 900 }}>$34</span>
            </div>
            <div style={{ position: 'relative' as const, width: 80, height: 210 }}>
              <div style={{ position: 'absolute' as const, bottom: 0, left: 0, right: 0, height: bar34H, background: '#9CA3AF', borderRadius: '8px 8px 0 0' }} />
            </div>
          </div>

          <div style={{ paddingBottom: 60, alignSelf: 'flex-end' }}>
            <span style={{ fontFamily: FONT, fontSize: 32, color: BLACK, opacity: 0.4 }}>VS</span>
          </div>

          {/* $39 column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width={100} height={128} viewBox="0 0 100 128">
              <path d={dressPath} fill={ACCENT} stroke={BLACK} strokeWidth={2} />
              <path d="M28,64 L42,80 L72,44" fill="none" stroke={BLACK} strokeWidth={7}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="120" strokeDashoffset={checkOffset} opacity={checkOpacity} />
            </svg>
            <div style={{ background: ACCENT, borderRadius: 10, padding: '8px 18px' }}>
              <span style={{ fontFamily: FONT, fontSize: 38, color: BLACK, fontWeight: 900 }}>$39</span>
            </div>
            <div style={{ position: 'relative' as const, width: 80, height: 210 }}>
              <div style={{ position: 'absolute' as const, bottom: 0, left: 0, right: 0, height: bar39H, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            </div>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, textAlign: 'center', marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#EF4444', margin: 0 }}>$39 outsold $34 by 24%</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: '10px 0 0', opacity: 0.7 }}>
            A higher price sold more — all because of the nine.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const piggyScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const yearlyAmt = interpolate(frame, [15, 130], [0, 1400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeOpacity = interpolate(frame, [138, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lifetimeScale = spring({ frame: Math.max(0, frame - 138), fps, config: { damping: 12, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={headline(36, WHITE)}>The Real Cost</p>

        {/* Piggy bank */}
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

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, opacity: 0.7, margin: '0 0 6px' }}>Charm pricing costs you per year:</p>
          <span style={{ fontFamily: FONT, fontSize: 90, color: ACCENT, letterSpacing: '-0.02em' }}>
            ${Math.round(yearlyAmt).toLocaleString()}
          </span>
        </div>

        <div style={{ opacity: lifetimeOpacity, transform: `scale(${lifetimeScale})`, marginTop: 22, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.7, margin: '0 0 6px' }}>Over 40 working years:</p>
          <span style={{ fontFamily: FONT, fontSize: 66, color: '#EF4444', letterSpacing: '-0.02em' }}>$56,000</span>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.8, margin: '10px 0 0' }}>
            Gone — because of a one-cent trick.
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
  const step1Opacity = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Opacity = interpolate(frame, [60, 86], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 12, stiffness: 160 } });
  const checkOffset = interpolate(frame, [18, 80], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px 120px' }}>
        <p style={headline(44, BLACK)}>Your Defense</p>

        {/* Shield with animated checkmark */}
        <svg width={190} height={215} viewBox="0 0 190 215" style={{ transform: `scale(${shieldScale})`, marginTop: 20 }}>
          <path d="M95,8 L172,42 L172,108 C172,158 137,192 95,207 C53,192 18,158 18,108 L18,42 Z" fill={ACCENT} />
          <path d="M55,108 L80,138 L140,72" fill="none" stroke={BLACK} strokeWidth={13}
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="120" strokeDashoffset={checkOffset} />
        </svg>

        {/* Two steps */}
        <div style={{ width: '100%', maxWidth: 580, marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ opacity: step1Opacity, display: 'flex', alignItems: 'center', gap: 16, background: ACCENT + '22', borderRadius: 14, padding: '16px 22px' }}>
            <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT, minWidth: 36, textAlign: 'center' }}>1</span>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Mentally round UP</p>
              <p style={{ fontFamily: FONT, fontSize: 21, color: BLACK, margin: '4px 0 0', opacity: 0.65 }}>$9.99 → think "$10". Always.</p>
            </div>
          </div>

          <div style={{ opacity: step2Opacity, display: 'flex', alignItems: 'center', gap: 16, background: ACCENT + '22', borderRadius: 14, padding: '16px 22px' }}>
            <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT, minWidth: 36, textAlign: 'center' }}>2</span>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Ask: "Would I pay $10?"</p>
              <p style={{ fontFamily: FONT, fontSize: 21, color: BLACK, margin: '4px 0 0', opacity: 0.65 }}>If yes, worth it. If no, put it back.</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0 }}>
            Two seconds. Saves you <span style={{ color: ACCENT }}>$1,400/year</span>.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '10px 0 0', opacity: 0.55 }}>
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
