import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#EFF6FF';
const ACCENT = '#3B82F6';
const WHITE = '#F0F8FF';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
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

const Door: React.FC<{ label: string; accent: boolean; glow?: number }> = ({ label, accent, glow = 0 }) => {
  const col = accent ? ACCENT : '#4B5563';
  return (
    <svg width={188} height={326} viewBox="0 0 188 326">
      {glow > 0 && (
        <rect x={0} y={0} width={188} height={292} rx={16} fill={ACCENT} opacity={glow * 0.22} />
      )}
      <rect x={5} y={5} width={178} height={282} rx={14} fill="none" stroke={col} strokeWidth={6} />
      <rect x={22} y={22} width={144} height={98} rx={6} fill="none" stroke={col} strokeWidth={3} opacity={0.48} />
      <rect x={22} y={136} width={144} height={100} rx={6} fill="none" stroke={col} strokeWidth={3} opacity={0.48} />
      <circle cx={152} cy={148} r={11} fill={col} opacity={0.85} />
      <text
        x={94}
        y={316}
        textAnchor="middle"
        fill={col}
        fontSize={accent ? 22 : 17}
        fontFamily="Arial Black, sans-serif"
        fontWeight="bold"
        letterSpacing="2"
      >
        {label}
      </text>
    </svg>
  );
};

const PiggyBank: React.FC<{ amount: string; label: string }> = ({ amount, label }) => (
  <svg width={188} height={232} viewBox="0 0 188 232">
    <ellipse cx={90} cy={120} rx={76} ry={66} fill={ACCENT} opacity={0.12} stroke={ACCENT} strokeWidth={4} />
    <circle cx={150} cy={96} r={40} fill={ACCENT} opacity={0.12} stroke={ACCENT} strokeWidth={4} />
    <ellipse cx={154} cy={58} rx={13} ry={19} fill={ACCENT} opacity={0.42} />
    <ellipse cx={177} cy={103} rx={17} ry={13} fill={ACCENT} opacity={0.24} stroke={ACCENT} strokeWidth={3} />
    <circle cx={157} cy={83} r={5} fill={ACCENT} />
    <rect x={76} y={47} width={36} height={8} rx={4} fill={ACCENT} opacity={0.75} />
    <rect x={26} y={178} width={22} height={38} rx={9} fill={ACCENT} opacity={0.35} />
    <rect x={56} y={178} width={22} height={38} rx={9} fill={ACCENT} opacity={0.35} />
    <rect x={100} y={178} width={22} height={38} rx={9} fill={ACCENT} opacity={0.35} />
    <rect x={130} y={178} width={22} height={38} rx={9} fill={ACCENT} opacity={0.35} />
    <path d="M16 107 Q1 92 6 117 Q1 132 15 124" fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
    <text x={90} y={128} textAnchor="middle" fill={ACCENT} fontSize={22} fontFamily="Arial Black, sans-serif" fontWeight="bold">{amount}</text>
    <text x={90} y={224} textAnchor="middle" fill={ACCENT} fontSize={19} fontFamily="Arial Black, sans-serif">{label}</text>
  </svg>
);

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
  const d1y = interpolate(frame, [8, 32], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const d2y = interpolate(frame, [18, 42], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const d3y = interpolate(frame, [28, 52], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const glow = interpolate(frame, [58, 80, 105, 130], [0, 1, 0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amtOp = interpolate(frame, [dur - 85, dur - 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 72 }}>
          <p style={headline(66, WHITE)}>THE THIRD</p>
          <p style={{ ...headline(80, ACCENT), marginTop: 6 }}>DOOR</p>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', marginBottom: 50 }}>
          <div style={{ transform: `translateY(${d1y}px)` }}><Door label="401K" accent={false} /></div>
          <div style={{ transform: `translateY(${d2y}px)` }}><Door label="ROTH IRA" accent={false} /></div>
          <div style={{ transform: `translateY(${d3y}px)` }}><Door label="???" accent glow={glow} /></div>
        </div>
        <div style={{ opacity: amtOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(62, ACCENT), marginBottom: 8 }}>$43,500 / YEAR</p>
          <p style={{ ...headline(28, WHITE), opacity: 0.65 }}>NOBODY TOLD YOU ABOUT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const p1x = interpolate(frame, [8, 38], [-280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const p2x = interpolate(frame, [18, 48], [280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const amt1 = Math.floor(interpolate(frame, [35, 90], [0, 23000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const amt2 = Math.floor(interpolate(frame, [50, 100], [0, 7000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const totalOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wrongOp = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 48 }}>
          <p style={headline(46, '#111827')}>WHAT YOU KNOW</p>
        </div>
        <div style={{ display: 'flex', gap: 66, alignItems: 'center', marginBottom: 46 }}>
          <div style={{ transform: `translateX(${p1x}px)` }}>
            <PiggyBank amount={`$${amt1.toLocaleString()}`} label="401K" />
          </div>
          <p style={{ ...headline(60, '#111827'), marginTop: -28 }}>+</p>
          <div style={{ transform: `translateX(${p2x}px)` }}>
            <PiggyBank amount={`$${amt2.toLocaleString()}`} label="ROTH IRA" />
          </div>
        </div>
        <div style={{ opacity: totalOp }}>
          <p style={{ ...headline(52, ACCENT) }}>= $30,000 MAX?</p>
        </div>
        <div style={{ opacity: wrongOp }}>
          <p style={{ ...headline(38, '#DC2626'), marginTop: 12 }}>NOT EVEN CLOSE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const BucketSVG: React.FC<{ label: string; sublabel: string; dim?: boolean }> = ({ label, sublabel, dim = false }) => {
  const col = dim ? '#4B5563' : ACCENT;
  return (
    <svg width={168} height={212} viewBox="0 0 168 212">
      <path d="M15 57 L25 178 L143 178 L153 57 Z" fill={col} opacity={dim ? 0.12 : 0.15} stroke={col} strokeWidth={4} strokeLinejoin="round" />
      <path d="M44 57 Q84 18 124 57" fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" />
      <rect x={9} y={49} width={150} height={16} rx={8} fill={col} opacity={0.55} />
      <circle cx={84} cy={130} r={18} fill={col} opacity={0.6} />
      <circle cx={59} cy={148} r={14} fill={col} opacity={0.38} />
      <circle cx={111} cy={146} r={14} fill={col} opacity={0.38} />
      <text x={84} y={196} textAnchor="middle" fill={col} fontSize={17} fontFamily="Arial Black, sans-serif" fontWeight="bold">{label}</text>
      <text x={84} y={210} textAnchor="middle" fill={col} fontSize={13} fontFamily="Arial, sans-serif" opacity={0.75}>{sublabel}</text>
    </svg>
  );
};

const Coin: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <circle cx={14} cy={14} r={12} fill="#F59E0B" stroke="#D97706" strokeWidth={2} />
    <text x={14} y={19} textAnchor="middle" fill="#FFF" fontSize={13} fontFamily="Arial Black, sans-serif" fontWeight="bold">$</text>
  </svg>
);

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const barW = 680;
  const empW = interpolate(frame, [10, 45], [0, barW * (23 / 69)], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const gapW = interpolate(frame, [55, 110], [0, barW * (46 / 69)], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const lbl1Op = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl2Op = interpolate(frame, [115, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl3Op = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 76 }}>
          <p style={headline(52, WHITE)}>THE HIDDEN</p>
          <p style={{ ...headline(64, ACCENT), marginTop: 6 }}>GAP</p>
        </div>
        <div style={{ width: barW, marginBottom: 18 }}>
          <div style={{ display: 'flex', height: 80, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ width: empW, background: '#4B5563' }} />
            <div style={{ width: gapW, background: ACCENT }} />
          </div>
        </div>
        <div style={{ display: 'flex', width: barW, justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ opacity: lbl1Op, textAlign: 'left' as const }}>
            <p style={{ ...headline(22, '#9CA3AF'), textAlign: 'left' as const, marginBottom: 4 }}>YOUR 401K</p>
            <p style={{ ...headline(44, WHITE), textAlign: 'left' as const }}>$23,000</p>
          </div>
          <div style={{ opacity: lbl2Op, textAlign: 'right' as const }}>
            <p style={{ ...headline(22, ACCENT), textAlign: 'right' as const, marginBottom: 4 }}>THE GAP</p>
            <p style={{ ...headline(44, ACCENT), textAlign: 'right' as const }}>$46,000</p>
          </div>
        </div>
        <div style={{ opacity: lbl3Op }}>
          <p style={{ ...headline(30, WHITE), opacity: 0.5 }}>TOTAL 401K LIMIT: $69,000</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const b1x = interpolate(frame, [8, 38], [-260, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const b2x = interpolate(frame, [18, 48], [260, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const arrowOp = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1p = interpolate(frame, [80, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const c2p = interpolate(frame, [95, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const c3p = interpolate(frame, [110, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const stampS = spring({ frame: Math.max(0, frame - 155), fps: 30, from: 0, to: 1, config: { damping: 8, stiffness: 200 } });
  const stampOp = interpolate(frame, [160, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 70 }}>
          <p style={headline(52, '#111827')}>THE MOVE</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 60 }}>
          <div style={{ transform: `translateX(${b1x}px)` }}>
            <BucketSVG label="AFTER-TAX" sublabel="401K" dim />
          </div>
          <div style={{ position: 'relative' as const, width: 176, height: 80 }}>
            <svg width={176} height={80} viewBox="0 0 176 80" style={{ opacity: arrowOp }}>
              <line x1={0} y1={40} x2={144} y2={40} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
              <line x1={120} y1={18} x2={144} y2={40} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
              <line x1={120} y1={62} x2={144} y2={40} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
            </svg>
            {([c1p, c2p, c3p] as number[]).map((p, i) => (
              <div key={i} style={{ position: 'absolute' as const, left: p * 144, top: 14 + i * 18, opacity: p < 0.93 ? 1 : 0 }}>
                <Coin size={26} />
              </div>
            ))}
          </div>
          <div style={{ transform: `translateX(${b2x}px)` }}>
            <BucketSVG label="ROTH" sublabel="TAX-FREE" />
          </div>
        </div>
        <div style={{ opacity: stampOp, transform: `scale(${stampS}) rotate(-8deg)` }}>
          <div style={{ border: '6px solid #16A34A', borderRadius: 14, padding: '14px 44px' }}>
            <p style={{ ...headline(52, '#16A34A'), margin: 0 }}>100% LEGAL</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const count = Math.floor(interpolate(frame, [15, 95], [0, 43500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }));
  const perYearOp = interpolate(frame, [98, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const milS = spring({ frame: Math.max(0, frame - 155), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 150 } });
  const milOp = interpolate(frame, [158, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calPages = [0, 1, 2, 3, 4].map((i) => {
    const sf = 28 + i * 20;
    const ef = sf + 28;
    return {
      y: interpolate(frame, [sf, ef], [0, -108], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      op: interpolate(frame, [sf, sf + 6, ef - 5, ef], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      yr: 2025 + i * 6,
    };
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 48 }}>
          <p style={headline(46, WHITE)}>EXTRA ROTH MONEY</p>
        </div>
        <p style={{ ...headline(108, ACCENT), lineHeight: 0.95 }}>
          ${count.toLocaleString()}
        </p>
        <p style={{ ...headline(34, WHITE), marginTop: 14, opacity: perYearOp }}>PER YEAR</p>
        <div style={{ position: 'relative' as const, width: 336, height: 90, marginTop: 28, opacity: calOp }}>
          {calPages.map((p, i) => (
            <div key={i} style={{ position: 'absolute' as const, left: 18 + i * 60, top: 0, transform: `translateY(${p.y}px)`, opacity: p.op }}>
              <svg width={46} height={54} viewBox="0 0 46 54">
                <rect x={0} y={8} width={46} height={46} rx={7} fill="#1E293B" stroke="#334155" strokeWidth={2} />
                <rect x={0} y={0} width={46} height={16} rx={5} fill={ACCENT} />
                <text x={23} y={40} textAnchor="middle" fill={WHITE} fontSize={11} fontFamily="Arial, sans-serif">{p.yr}</text>
              </svg>
            </div>
          ))}
        </div>
        <div style={{ opacity: milOp, transform: `scale(${milS})`, marginTop: 22, textAlign: 'center' as const }}>
          <p style={{ ...headline(30, WHITE), opacity: 0.6, marginBottom: 8 }}>OVER 30 YEARS =</p>
          <p style={{ ...headline(86, ACCENT) }}>$4,000,000+</p>
          <p style={{ ...headline(26, WHITE), opacity: 0.55 }}>TAX-FREE GROWTH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const PhoneSVG: React.FC<{ txt1Op: number }> = ({ txt1Op }) => (
  <svg width={396} height={272} viewBox="0 0 396 272">
    <rect x={56} y={0} width={284} height={272} rx={36} fill="#1E293B" stroke="#334155" strokeWidth={4} />
    <rect x={74} y={20} width={248} height={232} rx={22} fill="#0F172A" />
    <rect x={74} y={20} width={248} height={28} rx={0} fill="#1E293B" />
    <rect x={144} y={20} width={108} height={20} rx={10} fill="#0F172A" />
    <rect x={86} y={66} width={224} height={44} rx={22} fill="#334155" />
    <text x={106} y={93} fill={ACCENT} fontSize={14} fontFamily="Arial, sans-serif" opacity={txt1Op}>after-tax contributions</text>
    <circle cx={290} cy={88} r={10} fill="none" stroke="#64748B" strokeWidth={2.5} />
    <line x1={296} y1={95} x2={306} y2={105} stroke="#64748B" strokeWidth={2.5} strokeLinecap="round" />
    <rect x={86} y={128} width={224} height={22} rx={6} fill={ACCENT} opacity={0.18} />
    <text x={198} y={144} textAnchor="middle" fill={ACCENT} fontSize={13} fontFamily="Arial Black, sans-serif">AFTER-TAX 401K FOUND</text>
    <rect x={86} y={162} width={170} height={16} rx={6} fill="#334155" opacity={0.55} />
    <rect x={86} y={190} width={190} height={16} rx={6} fill="#334155" opacity={0.4} />
    <rect x={86} y={216} width={148} height={16} rx={6} fill="#334155" opacity={0.3} />
  </svg>
);

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleS = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const phoneS = spring({ frame: Math.max(0, frame - 8), fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const txt1Op = interpolate(frame, [52, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const searchOp = interpolate(frame, [82, 102], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaS = spring({ frame: Math.max(0, frame - 140), fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 160 } });
  const ctaOp = interpolate(frame, [145, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleS})`, marginBottom: 52 }}>
          <p style={headline(44, '#111827')}>DOES YOUR PLAN</p>
          <p style={{ ...headline(50, ACCENT), marginTop: 6 }}>ALLOW IT?</p>
        </div>
        <div style={{ transform: `scale(${phoneS})`, marginBottom: 52 }}>
          <PhoneSVG txt1Op={txt1Op} />
        </div>
        <div style={{ opacity: searchOp, textAlign: 'center' as const, marginBottom: 38 }}>
          <p style={{ ...headline(28, '#374151'), marginBottom: 8 }}>SEARCH YOUR PLAN FOR:</p>
          <p style={{ ...headline(30, ACCENT) }}>"IN-PLAN ROTH CONVERSION"</p>
        </div>
        <div style={{ opacity: ctaOp, transform: `scale(${ctaS})` }}>
          <div style={{ background: ACCENT, borderRadius: 16, padding: '22px 58px' }}>
            <p style={{ ...headline(42, WHITE), margin: 0 }}>CHECK TODAY</p>
          </div>
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
