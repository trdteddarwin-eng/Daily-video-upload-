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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldS = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, from: 0, to: 1 });
  const crackOp = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [20, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [20, 48], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [60, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [120, 144], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 70px' }}>
        {/* Shield with crack */}
        <div style={{ transform: `scale(${shieldS})` }}>
          <svg width="200" height="240" viewBox="0 0 200 240">
            <path d="M100 12 L176 48 L176 128 Q176 198 100 228 Q24 198 24 128 L24 48 Z"
              fill={ACCENT} opacity={0.18} />
            <path d="M100 12 L176 48 L176 128 Q176 198 100 228 Q24 198 24 128 L24 48 Z"
              fill="none" stroke={ACCENT} strokeWidth={7} strokeLinejoin="round" />
            <text x="100" y="142" textAnchor="middle" fontSize={80} fill={ACCENT} fontFamily="Arial Black" fontWeight="bold">$</text>
            <path d="M102 28 L120 86 L98 108 L126 204"
              stroke={BG_DARK} strokeWidth={7} fill="none" opacity={crackOp} />
            <path d="M102 28 L120 86 L98 108 L126 204"
              stroke="#FF6B6B" strokeWidth={3} fill="none" opacity={crackOp} strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(56, WHITE)}>OVERDRAFT</p>
          <p style={headline(56, ACCENT)}>"PROTECTION"</p>
        </div>

        <p style={{ ...headline(24, '#9CA3AF'), opacity: subOp }}>THE HIDDEN LOAN</p>

        <div style={{ opacity: tagOp, background: ACCENT, borderRadius: 12, padding: '12px 30px' }}>
          <p style={headline(26, WHITE)}>YOUR BANK IS LYING TO YOU</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const barsOp = interpolate(frame, [18, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftH = interpolate(frame, [24, 84], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightH = interpolate(frame, [64, 136], [0, 175], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const aprOp = interpolate(frame, [100, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const aprVal = Math.floor(interpolate(frame, [108, 210], [0, 17000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const noteOp = interpolate(frame, [168, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>THE MATH</p>

        {/* Bar comparison */}
        <div style={{ opacity: barsOp, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(36, BLACK)}>$24</p>
            <div style={{ width: 96, height: leftH, background: '#6B7280', borderRadius: '8px 8px 0 0' }} />
            <p style={headline(18, '#6B7280')}>YOU SPENT</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(36, ACCENT)}>$35</p>
            <div style={{ width: 96, height: rightH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <p style={headline(18, ACCENT)}>BANK FEE</p>
          </div>
        </div>

        {/* APR counter box */}
        <div style={{ opacity: aprOp, background: ACCENT, borderRadius: 16, padding: '20px 44px', textAlign: 'center' }}>
          <p style={headline(24, WHITE)}>EQUIVALENT APR</p>
          <p style={{ ...headline(76, WHITE), lineHeight: 1 }}>{aprVal.toLocaleString()}%</p>
        </div>

        <p style={{ ...headline(20, '#6B7280'), opacity: noteOp }}>ON A LOAN YOU NEVER SIGNED UP FOR</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const statOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bilVal = interpolate(frame, [28, 158], [0, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pieOp = interpolate(frame, [128, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pieDeg = interpolate(frame, [136, 210], [5, 288], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const drops = [
    { x: 100, delay: 0 }, { x: 260, delay: 12 }, { x: 440, delay: 6 },
    { x: 620, delay: 20 }, { x: 800, delay: 8 }, { x: 960, delay: 16 },
  ];

  const pieRad = (pieDeg * Math.PI) / 180;
  const pieX = Math.cos(pieRad - Math.PI / 2) * 100;
  const pieY = Math.sin(pieRad - Math.PI / 2) * 100;
  const largeArc = pieDeg > 180 ? 1 : 0;
  const piePath = `M 0 -100 A 100 100 0 ${largeArc} 1 ${pieX.toFixed(2)} ${pieY.toFixed(2)} L 0 0 Z`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Falling dollar signs */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        {drops.map((d, i) => {
          const y = interpolate(frame - d.delay, [0, dur], [-50, 1970], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ position: 'absolute', left: d.x, top: y, opacity: 0.15, fontSize: 26, color: ACCENT, fontFamily: FONT }}>$</div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>BANKS WIN BIG</p>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={headline(28, '#9CA3AF')}>OVERDRAFT FEES COLLECTED</p>
          <p style={{ ...headline(108, ACCENT), lineHeight: 0.9 }}>${bilVal.toFixed(0)}B</p>
          <p style={headline(26, WHITE)}>LAST YEAR</p>
        </div>

        <div style={{ opacity: pieOp, textAlign: 'center' }}>
          <svg width="220" height="220" viewBox="-110 -110 220 220">
            <circle r="100" fill="#2a2a2a" />
            <path d={piePath} fill={ACCENT} />
            <text y="8" textAnchor="middle" fontSize={26} fill={WHITE} fontFamily="Arial Black" fontWeight="bold">80%</text>
          </svg>
          <p style={{ ...headline(20, WHITE), marginTop: 10 }}>OF FEES FROM JUST</p>
          <p style={headline(36, ACCENT)}>9% OF CUSTOMERS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const bankS = spring({ frame, fps, config: { damping: 18, stiffness: 60 }, from: 0, to: 1 });
  const feeY = interpolate(frame, [80, 150], [480, 920], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flashOp = frame > 150
    ? interpolate(frame % 28, [0, 8, 20, 28], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;
  const bottomOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Bank building */}
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})`, marginBottom: 36 }}>COMPLETELY AUTOMATIC</p>
        <div style={{ transform: `scale(${bankS})` }}>
          <svg width="280" height="260" viewBox="0 0 280 260">
            <rect x="28" y="94" width="224" height="154" fill="#D1D5DB" stroke={BLACK} strokeWidth={3} rx={4} />
            <polygon points="140,16 272,94 8,94" fill="#E5E7EB" stroke={BLACK} strokeWidth={3} />
            {[60, 103, 146, 189].map((cx, i) => (
              <rect key={i} x={cx} y={104} width={22} height={144} fill="#C4C4C4" stroke="#AAA" strokeWidth={1.5} />
            ))}
            <rect x="112" y="196" width="56" height="52" fill="#9CA3AF" stroke={BLACK} strokeWidth={2} rx={3} />
            <text x="140" y="70" textAnchor="middle" fontSize={20} fill={BLACK} fontFamily="Arial Black" fontWeight="bold">BANK</text>
            <rect x="122" y="246" width="36" height="6" fill={ACCENT} rx={2} />
          </svg>
        </div>
      </AbsoluteFill>

      {/* Fee chip falling */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: feeY, transform: 'translateX(-50%)', opacity: feeOp, textAlign: 'center' }}>
          <div style={{ background: ACCENT, borderRadius: 14, padding: '14px 36px' }}>
            <p style={headline(52, WHITE)}>-$35</p>
            <p style={{ ...headline(22, WHITE), opacity: flashOp }}>AUTOMATIC</p>
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom label */}
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 120 }}>
        <p style={{ ...headline(26, '#555'), opacity: bottomOp }}>NO WARNING. NO CHOICE.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const phoneS = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, from: 0, to: 1 });
  const opt1Op = interpolate(frame, [64, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opt2Op = interpolate(frame, [108, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [168, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 60px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>HERE'S THE FIX</p>

        {/* Phone with call icon */}
        <div style={{ transform: `scale(${phoneS})` }}>
          <svg width="112" height="196" viewBox="0 0 112 196">
            <rect x="6" y="4" width="100" height="188" rx={18} fill="#222" stroke={ACCENT} strokeWidth={4} />
            <rect x="16" y="24" width="80" height="140" rx={6} fill="#111" />
            <path d="M34 62 Q32 52 44 48 L54 56 Q57 59 54 64 Q52 68 49 66 Q59 76 57 81 Q55 85 51 83 Q46 86 44 84 Q42 82 34 62 Z"
              fill={ACCENT} />
            <circle cx="56" cy="178" r="7" fill="#444" />
          </svg>
        </div>

        {/* Option cards */}
        <div style={{ opacity: opt1Op, background: '#1E1E1E', borderRadius: 16, padding: '20px 28px', width: '100%' }}>
          <p style={headline(24, ACCENT)}>CALL YOUR BANK</p>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#9CA3AF', textAlign: 'center', letterSpacing: '0.04em', margin: 6 }}>
            Most refund 1 fee per year if you ask
          </p>
        </div>

        <div style={{ opacity: opt2Op, background: '#1E1E1E', borderRadius: 16, padding: '20px 28px', width: '100%' }}>
          <p style={headline(24, ACCENT)}>LINK A SAVINGS ACCOUNT</p>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#9CA3AF', textAlign: 'center', letterSpacing: '0.04em', margin: 6 }}>
            Free overdraft coverage — zero fee
          </p>
        </div>

        <div style={{ opacity: bannerOp, background: ACCENT, borderRadius: 12, padding: '10px 28px' }}>
          <p style={headline(22, WHITE)}>BOTH TAKE 5 MINUTES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldS = spring({ frame, fps, config: { damping: 18, stiffness: 70 }, from: 0, to: 1 });
  const line1Op = interpolate(frame, [18, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [50, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Op = interpolate(frame, [80, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [104, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [128, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { num: '1', text: 'Call your bank. Ask for a refund.', op: step1Op },
    { num: '2', text: 'Opt out of overdraft protection.', op: step2Op },
    { num: '3', text: 'Link your savings account instead.', op: step3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        {/* Shield with X */}
        <div style={{ transform: `scale(${shieldS})` }}>
          <svg width="160" height="200" viewBox="0 0 160 200">
            <path d="M80 8 L148 40 L148 112 Q148 164 80 190 Q12 164 12 112 L12 40 Z"
              fill={ACCENT} opacity={0.18} stroke={ACCENT} strokeWidth={6} strokeLinejoin="round" />
            <line x1="46" y1="68" x2="114" y2="136" stroke={ACCENT} strokeWidth={11} strokeLinecap="round" />
            <line x1="114" y1="68" x2="46" y2="136" stroke={ACCENT} strokeWidth={11} strokeLinecap="round" />
          </svg>
        </div>

        <p style={{ ...headline(44, BLACK), opacity: line1Op }}>TURN IT OFF.</p>
        <p style={{ ...headline(26, '#6B7280'), opacity: line2Op }}>THREE STEPS. FIVE MINUTES.</p>

        {/* Step cards */}
        {steps.map((step) => (
          <div key={step.num} style={{ opacity: step.op, display: 'flex', alignItems: 'center', gap: 18, width: '100%', background: '#EFEFEF', borderRadius: 12, padding: '14px 22px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 20, color: WHITE, fontWeight: 'bold' }}>{step.num}</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 19, color: BLACK, letterSpacing: '0.05em', margin: 0 }}>{step.text}</p>
          </div>
        ))}

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '14px 36px', marginTop: 6 }}>
          <p style={headline(26, WHITE)}>FOLLOW FOR MORE MONEY TRAPS</p>
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
