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
  lineHeight: 1.1,
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

  const cartScale = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, from: 0, to: 1 });
  const badgeScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 220 }, from: 0, to: 1 });
  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [30, 55], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50 }}>
        <div style={{ transform: `scale(${cartScale})` }}>
          <svg width={320} height={300} viewBox="0 0 320 300">
            <line x1={40} y1={50} x2={70} y2={95} stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
            <path d="M 70 50 L 250 50" fill="none" stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
            <rect x={60} y={95} width={200} height={130} rx={14} fill="none" stroke={ACCENT} strokeWidth={8} />
            <rect x={80} y={110} width={45} height={60} rx={6} fill={ACCENT} opacity={0.5} />
            <rect x={138} y={118} width={42} height={52} rx={6} fill={ACCENT} opacity={0.35} />
            <rect x={192} y={105} width={40} height={65} rx={6} fill={ACCENT} opacity={0.6} />
            <circle cx={105} cy={245} r={24} fill="none" stroke={ACCENT} strokeWidth={7} />
            <circle cx={225} cy={245} r={24} fill="none" stroke={ACCENT} strokeWidth={7} />
            <g transform={`translate(265, 55) scale(${badgeScale})`}>
              <circle cx={0} cy={0} r={58} fill={ACCENT} />
              <text x={0} y={-8} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={24} fontWeight="900">70%</text>
              <text x={0} y={22} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={20} fontWeight="900">OFF</text>
            </g>
          </svg>
        </div>

        <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, textAlign: 'center' as const, padding: '0 80px' }}>
          <p style={headline(60, ACCENT)}>CYBER MONDAY</p>
          <p style={{ ...headline(38, WHITE), marginTop: 18 }}>WAS INVENTED</p>
          <p style={{ ...headline(38, WHITE), marginTop: 10 }}>BY MARKETERS</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, opacity: 0.7, marginTop: 32, textAlign: 'center' as const, letterSpacing: '0.05em' }}>
            in 2005. Here's the real cost.
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftTagScale = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, from: 0, to: 1 });
  const rightTagScale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 180 }, from: 0, to: 1 });
  const strikeWidth = interpolate(frame, [60, 90], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 60 }}>
        <p style={headline(44, BLACK)}>THE &quot;SALE&quot; MATH</p>

        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <div style={{ transform: `scale(${leftTagScale})` }}>
            <svg width={240} height={280} viewBox="0 0 240 280">
              <path d="M 20 20 L 200 20 L 220 140 L 120 270 L 20 140 Z" fill={WHITE} stroke="#CCCCCC" strokeWidth={3} />
              <circle cx={120} cy={50} r={14} fill="#CCCCCC" />
              <circle cx={120} cy={50} r={9} fill={BG_LIGHT} />
              <line x1={120} y1={20} x2={120} y2={36} stroke="#CCCCCC" strokeWidth={3} />
              <text x={120} y={120} textAnchor="middle" fill="#888888" fontFamily={FONT} fontSize={18} fontWeight="700">OCTOBER</text>
              <text x={120} y={175} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={42} fontWeight="900">$89</text>
            </svg>
          </div>

          <p style={{ fontFamily: FONT, fontSize: 48, color: BLACK, fontWeight: 900, margin: 0 }}>vs</p>

          <div style={{ transform: `scale(${rightTagScale})` }}>
            <svg width={240} height={280} viewBox="0 0 240 280">
              <path d="M 20 20 L 200 20 L 220 140 L 120 270 L 20 140 Z" fill={ACCENT} />
              <circle cx={120} cy={50} r={14} fill={BLACK} opacity={0.3} />
              <circle cx={120} cy={50} r={9} fill={ACCENT} />
              <line x1={120} y1={20} x2={120} y2={36} stroke={BLACK} strokeWidth={3} opacity={0.3} />
              <text x={120} y={112} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={16} fontWeight="700">CYBER MON.</text>
              <text x={120} y={152} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={28} fontWeight="700" opacity={0.5}>$249</text>
              <line x1={70} y1={146} x2={70 + strikeWidth} y2={146} stroke={BLACK} strokeWidth={4} strokeLinecap="round" opacity={0.8} />
              <text x={120} y={205} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={42} fontWeight="900">$89</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, textAlign: 'center' as const, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, textAlign: 'center' as const, lineHeight: 1.4, margin: 0 }}>
            92% of deals are same price or cheaper outside Cyber Week
          </p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#888888', marginTop: 20, textAlign: 'center' as const }}>
            The original price was never real.
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSecsStart = 4 * 3600 + 23 * 60 + 15;
  const elapsed = Math.floor(frame / fps);
  const remaining = Math.max(0, totalSecsStart - elapsed);
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  const timerScale = spring({ frame, fps, config: { damping: 12, stiffness: 160 }, from: 0, to: 1 });
  const badgePulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.06, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const textOpacity = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50 }}>
        <p style={headline(40, ACCENT)}>THE COUNTDOWN</p>

        <div style={{ transform: `scale(${timerScale})`, background: '#1E1E1E', borderRadius: 24, padding: '40px 60px', border: `3px solid ${ACCENT}` }}>
          <p style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: 90, color: ACCENT, margin: 0, letterSpacing: '0.08em', fontWeight: 900 }}>
            {pad(hours)}:{pad(minutes)}:{pad(secs)}
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, opacity: 0.6, textAlign: 'center' as const, margin: '10px 0 0 0' }}>
            DEAL ENDS IN
          </p>
        </div>

        <div style={{ transform: `scale(${badgePulse})`, background: '#CC0000', borderRadius: 50, padding: '20px 50px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0, fontWeight: 900, letterSpacing: '0.08em' }}>
            ONLY 2 LEFT IN STOCK
          </p>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' as const, padding: '0 80px', marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
            That timer resets when it hits zero.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, textAlign: 'center' as const, lineHeight: 1.5, marginTop: 16 }}>
            Urgency is manufactured.
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, from: 0, to: 1 });
  const notifY = interpolate(frame, [30, 60], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const notifOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50 }}>
        <p style={headline(44, BLACK)}>THE CART TRAP</p>

        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width={280} height={340} viewBox="0 0 280 340">
            <rect x={40} y={20} width={200} height={300} rx={28} fill={BLACK} />
            <rect x={50} y={35} width={180} height={270} rx={20} fill="#1A1A1A" />
            <rect x={115} y={315} width={50} height={6} rx={3} fill="#444444" />
            <rect x={100} y={35} width={80} height={20} rx={10} fill={BLACK} />
            <rect x={68} y={75} width={144} height={105} rx={10} fill="#2A2A2A" />
            <path d="M 68 75 L 140 125 L 212 75" fill="none" stroke={ACCENT} strokeWidth={3} />
            <line x1={68} y1={180} x2={110} y2={148} stroke={ACCENT} strokeWidth={3} />
            <line x1={212} y1={180} x2={170} y2={148} stroke={ACCENT} strokeWidth={3} />
            <rect x={80} y={202} width={120} height={10} rx={5} fill="#333333" />
            <rect x={90} y={222} width={100} height={10} rx={5} fill="#333333" />
            <rect x={80} y={242} width={80} height={10} rx={5} fill={ACCENT} opacity={0.6} />
            <circle cx={212} cy={45} r={18} fill="#CC0000" />
            <text x={212} y={51} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={18} fontWeight="900">1</text>
          </svg>
        </div>

        <div style={{ opacity: notifOpacity, transform: `translateY(${notifY}px)`, background: BLACK, borderRadius: 20, padding: '24px 40px', border: `3px solid ${ACCENT}`, maxWidth: 700 }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: '0 0 8px 0' }}>SHOP.COM</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, lineHeight: 1.4 }}>
            You left something behind... here&apos;s 10% off, just for you.
          </p>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' as const, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
            That discount was always available.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#888888', textAlign: 'center' as const, lineHeight: 1.5, marginTop: 16 }}>
            They were waiting for you to walk away first.
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [20, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const easedProgress = progress * progress;
  const displayAmount = Math.round(400 + (1900 - 400) * easedProgress);
  const barWidth = interpolate(frame, [20, 140], [0, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterScale = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <p style={headline(40, WHITE)}>PLANNED VS ACTUAL</p>

        <div style={{ transform: `scale(${counterScale})`, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, opacity: 0.6, margin: '0 0 10px 0', textAlign: 'center' as const }}>ACTUAL SPEND</p>
          <p style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontSize: 108, color: ACCENT, margin: 0, fontWeight: 900, lineHeight: 1 }}>
            ${displayAmount.toLocaleString()}
          </p>
        </div>

        <div style={{ width: 700, padding: '0 40px' }}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, opacity: 0.7, margin: '0 0 8px 0' }}>PLANNED: $400</p>
            <div style={{ height: 28, background: '#333333', borderRadius: 14, overflow: 'hidden' as const }}>
              <div style={{ width: 150, height: '100%', background: '#888888', borderRadius: 14 }} />
            </div>
          </div>
          <div>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '0 0 8px 0' }}>ACTUAL: $1,900</p>
            <div style={{ height: 28, background: '#333333', borderRadius: 14, overflow: 'hidden' as const }}>
              <div style={{ width: barWidth, height: '100%', background: ACCENT, borderRadius: 14 }} />
            </div>
          </div>
        </div>

        <div style={{ opacity: personOpacity }}>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={50} r={32} fill={WHITE} opacity={0.8} />
            <ellipse cx={90} cy={138} rx={50} ry={58} fill={WHITE} opacity={0.8} />
            <rect x={62} y={102} width={56} height={36} rx={8} fill="#444444" stroke={ACCENT} strokeWidth={3} />
            <rect x={66} y={106} width={48} height={28} rx={6} fill="#222222" />
            <line x1={62} y1={120} x2={118} y2={120} stroke={ACCENT} strokeWidth={2} opacity={0.5} />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' as const, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
            That $1,500 gap isn&apos;t bad math.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, textAlign: 'center' as const, marginTop: 10 }}>
            It&apos;s decades of behavioral engineering.
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const magnifyScale = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, from: 0, to: 1 });

  const steps: Array<{ text: string; sub: string }> = [
    { text: 'Check price history', sub: 'CamelCamelCamel for Amazon' },
    { text: 'Compare on Google Shopping', sub: 'All retailers at once' },
    { text: 'Wait 24 hours', sub: "The deal will still be there" },
  ];

  const ctaOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity2 = interpolate(frame, [125, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <p style={headline(44, BLACK)}>BEAT THE SYSTEM</p>

        <div style={{ transform: `scale(${magnifyScale})` }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={88} cy={88} r={66} fill="none" stroke={ACCENT} strokeWidth={12} />
            <circle cx={88} cy={88} r={56} fill="#EEEEEE" />
            <polyline points="32,100 52,110 68,76 88,96 108,66 128,84 144,58" fill="none" stroke={ACCENT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <line x1={138} y1={138} x2={196} y2={196} stroke={ACCENT} strokeWidth={16} strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ width: 860, display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {steps.map((step, i) => {
            const count = Math.max(0, Math.floor(steps.length));
            void count;
            const stepOpacity = interpolate(frame, [25 + i * 22, 50 + i * 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const stepX = interpolate(frame, [25 + i * 22, 50 + i * 22], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ opacity: stepOpacity, transform: `translateX(${stepX}px)`, display: 'flex', alignItems: 'center', gap: 24, background: WHITE, border: '2px solid #E0E0E0', borderRadius: 20, padding: '20px 32px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width={28} height={28} viewBox="0 0 28 28">
                    <polyline points="5,14 11,21 23,8" fill="none" stroke={BLACK} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, fontWeight: 900 }}>{step.text}</p>
                  <p style={{ fontFamily: FONT, fontSize: 22, color: '#888888', margin: '6px 0 0 0' }}>{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' as const, padding: '0 80px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, textAlign: 'center' as const, lineHeight: 1.5, margin: 0, opacity: ctaOpacity }}>
            The deal ending in 2 hours
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, textAlign: 'center' as const, fontWeight: 900, marginTop: 10, opacity: ctaOpacity2 }}>
            will be back tomorrow. Usually for less.
          </p>
        </div>
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
