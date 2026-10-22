import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED_PALE = '#FCA5A5';
const RED_DARK = '#B91C1C';
const GREEN = '#10B981';
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

  const iconScale = spring({ frame, fps, config: { stiffness: 80, damping: 16 } });
  const textOp = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [30, 60], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [115, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [115, 145], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 50px' }}>
        {/* Calculator SVG */}
        <svg width={200} height={230} viewBox="0 0 200 230" style={{ transform: `scale(${iconScale})` }}>
          <rect x={20} y={10} width={160} height={210} rx={14} fill="#2A2A2A" />
          <rect x={32} y={22} width={136} height={56} rx={8} fill="#1a1a2e" />
          <text x={100} y={47} textAnchor="middle" fontFamily={FONT} fontSize={16} fill={GREEN}>$40K ÷ 4%</text>
          <text x={100} y={70} textAnchor="middle" fontFamily={FONT} fontSize={19} fontWeight="900" fill={WHITE}>= $1,000,000</text>
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <rect key={i}
                x={32 + col * 36} y={96 + row * 32}
                width={28} height={24} rx={5}
                fill={i === 15 ? ACCENT : '#3A3A3A'}
              />
            );
          })}
        </svg>

        {/* Main headline */}
        <div style={{ opacity: textOp, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>THE 4%</p>
          <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>RULE</p>
        </div>

        {/* Broken label */}
        <div style={{ opacity: crackOp }}>
          <svg width={290} height={68} viewBox="0 0 290 68">
            <rect x={0} y={0} width={290} height={68} rx={12} fill={ACCENT} />
            <text x={145} y={45} textAnchor="middle" fontFamily={FONT} fontSize={34} fontWeight="900" fill={WHITE}>IS BROKEN</text>
            <line x1={88} y1={0} x2={75} y2={68} stroke={WHITE} strokeWidth={2.5} opacity={0.55} />
            <line x1={168} y1={0} x2={155} y2={68} stroke={WHITE} strokeWidth={1.5} opacity={0.35} />
          </svg>
        </div>

        {/* Sub text */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: RED_PALE, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
            you&apos;re $250K short
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calScale = spring({ frame, fps, config: { stiffness: 75, damping: 18 } });
  const bondOp = interpolate(frame, [50, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bondY = interpolate(frame, [50, 82], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProg = interpolate(frame, [95, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yieldVal = (6.8 * barProg).toFixed(1);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 50px' }}>
        <p style={headline(36, BLACK)}>CREATED IN 1994</p>

        {/* Calendar SVG */}
        <svg width={160} height={160} viewBox="0 0 160 160" style={{ transform: `scale(${calScale})` }}>
          <rect x={8} y={26} width={144} height={126} rx={10} fill={ACCENT} />
          <rect x={8} y={26} width={144} height={40} rx={10} fill={RED_DARK} />
          <rect x={8} y={46} width={144} height={20} fill={RED_DARK} />
          <rect x={34} y={14} width={10} height={22} rx={5} fill={BLACK} opacity={0.45} />
          <rect x={116} y={14} width={10} height={22} rx={5} fill={BLACK} opacity={0.45} />
          <text x={80} y={56} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={WHITE}>1994</text>
          <text x={80} y={116} textAnchor="middle" fontFamily={FONT} fontSize={36} fontWeight="900" fill={WHITE}>BENGEN</text>
          <text x={80} y={142} textAnchor="middle" fontFamily={FONT} fontSize={26} fontWeight="900" fill={WHITE} opacity={0.3}>RULE</text>
        </svg>

        {/* Bond yield card */}
        <div style={{ opacity: bondOp, transform: `translateY(${bondY}px)`, background: BLACK, borderRadius: 14, padding: '16px 30px', width: '100%', maxWidth: 460, textAlign: 'center' }}>
          <p style={{ ...headline(18, WHITE), marginBottom: 4 }}>U.S. TREASURY BOND</p>
          <p style={{ fontFamily: FONT, fontSize: 60, fontWeight: 900, color: GREEN, margin: 0, lineHeight: 1 }}>6.8%</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, opacity: 0.55, margin: '4px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>annual yield — it worked then</p>
        </div>

        {/* Animated yield bar */}
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#666', margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Bond Yield 1994</p>
            <p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 900, color: GREEN, margin: 0 }}>{yieldVal}%</p>
          </div>
          <div style={{ height: 14, background: '#E5E7EB', borderRadius: 7 }}>
            <div style={{ height: '100%', width: `${barProg * 100}%`, background: GREEN, borderRadius: 7 }} />
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yieldOldScale = spring({ frame, fps, config: { stiffness: 80, damping: 16 } });
  const arrowOp = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowY = interpolate(frame, [40, 70], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yieldNewScale = spring({ frame: Math.max(0, frame - 70), fps, config: { stiffness: 80, damping: 16 } });
  const lifeOp = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: Math.max(0, frame - 165), fps, config: { stiffness: 100, damping: 14 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '0 50px' }}>
        <div style={{ opacity: titleOp }}>
          <p style={headline(32, WHITE)}>THE WORLD CHANGED</p>
        </div>

        {/* Yield comparison */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%', maxWidth: 480 }}>
          <div style={{ flex: 1, background: '#1E3A2A', borderRadius: 14, padding: '14px', textAlign: 'center', transform: `scale(${yieldOldScale})` }}>
            <p style={{ fontFamily: FONT, fontSize: 13, color: GREEN, margin: '0 0 4px', textTransform: 'uppercase' as const }}>1994 bonds</p>
            <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 900, color: GREEN, margin: 0, lineHeight: 1 }}>6.8%</p>
          </div>
          <div style={{ opacity: arrowOp, transform: `translateY(${arrowY}px)` }}>
            <svg width={44} height={60} viewBox="0 0 44 60">
              <line x1={22} y1={4} x2={22} y2={44} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
              <polygon points="8,36 22,56 36,36" fill={ACCENT} />
            </svg>
          </div>
          <div style={{ flex: 1, background: '#3A1E1E', borderRadius: 14, padding: '14px', textAlign: 'center', transform: `scale(${yieldNewScale})` }}>
            <p style={{ fontFamily: FONT, fontSize: 13, color: ACCENT, margin: '0 0 4px', textTransform: 'uppercase' as const }}>bonds today</p>
            <p style={{ fontFamily: FONT, fontSize: 48, fontWeight: 900, color: ACCENT, margin: 0, lineHeight: 1 }}>3.5%</p>
          </div>
        </div>

        {/* Lifespan bars */}
        <div style={{ opacity: lifeOp, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, color: '#AAA', margin: 0, width: 80, textTransform: 'uppercase' as const, flexShrink: 0 }}>1994</p>
            <div style={{ flex: 1, height: 12, background: GREEN, borderRadius: 6 }} />
            <p style={{ fontFamily: FONT, fontSize: 14, color: GREEN, margin: 0, width: 52, textAlign: 'right' as const }}>age 80</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, color: RED_PALE, margin: 0, width: 80, textTransform: 'uppercase' as const, flexShrink: 0 }}>NOW</p>
            <div style={{ flex: 1, height: 12, background: ACCENT, borderRadius: 6 }} />
            <p style={{ fontFamily: FONT, fontSize: 14, color: ACCENT, margin: 0, width: 52, textAlign: 'right' as const }}>age 90+</p>
          </div>
        </div>

        {/* Warning */}
        <div style={{ transform: `scale(${warnScale})`, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center' }}>
          <p style={headline(26, WHITE)}>1 IN 3 CHANCE</p>
          <p style={{ ...headline(20, WHITE), marginTop: 4, opacity: 0.88 }}>YOUR MONEY RUNS OUT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const col1Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { stiffness: 90, damping: 16 } });
  const col2Scale = spring({ frame: Math.max(0, frame - 70), fps, config: { stiffness: 90, damping: 16 } });
  const labelOp = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 50px' }}>
        <div style={{ opacity: titleOp }}>
          <p style={headline(36, BLACK)}>THE REAL NUMBER</p>
        </div>

        <div style={{ display: 'flex', gap: 16, width: '100%', maxWidth: 520 }}>
          {/* Left: $1M risky */}
          <div style={{ flex: 1, background: WHITE, borderRadius: 18, padding: '20px 16px', textAlign: 'center', transform: `scale(${col1Scale})`, border: `3px solid ${ACCENT}` }}>
            <p style={{ fontFamily: FONT, fontSize: 14, color: ACCENT, margin: '0 0 6px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Old target</p>
            <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 900, color: BLACK, margin: 0, lineHeight: 1 }}>$1M</p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: '#666', margin: '6px 0', textTransform: 'uppercase' as const }}>→ $40K/year</p>
            <svg width={50} height={50} viewBox="0 0 50 50">
              <circle cx={25} cy={25} r={22} fill={ACCENT} opacity={0.12} />
              <line x1={14} y1={14} x2={36} y2={36} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
              <line x1={36} y1={14} x2={14} y2={36} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 900, color: ACCENT, margin: '4px 0 0', textTransform: 'uppercase' as const }}>RISKY</p>
          </div>

          {/* Right: $1.21M safe */}
          <div style={{ flex: 1, background: '#F0FDF4', borderRadius: 18, padding: '20px 16px', textAlign: 'center', transform: `scale(${col2Scale})`, border: `3px solid ${GREEN}` }}>
            <p style={{ fontFamily: FONT, fontSize: 14, color: GREEN, margin: '0 0 6px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>New target</p>
            <p style={{ fontFamily: FONT, fontSize: 38, fontWeight: 900, color: BLACK, margin: 0, lineHeight: 1 }}>$1.21M</p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: '#666', margin: '6px 0', textTransform: 'uppercase' as const }}>→ $40K/year</p>
            <svg width={50} height={50} viewBox="0 0 50 50">
              <circle cx={25} cy={25} r={22} fill={GREEN} opacity={0.15} />
              <polyline points="12,26 22,36 38,16" fill="none" stroke={GREEN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 900, color: GREEN, margin: '4px 0 0', textTransform: 'uppercase' as const }}>SAFE (3.3%)</p>
          </div>
        </div>

        <div style={{ opacity: labelOp, background: BLACK, borderRadius: 12, padding: '12px 24px', textAlign: 'center' }}>
          <p style={headline(24, WHITE)}>MOST CALCULATORS</p>
          <p style={{ ...headline(24, ACCENT), marginTop: 4 }}>STILL USE 4%</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Prog = interpolate(frame, [22, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Prog = interpolate(frame, [55, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [148, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_MAX = 270;
  const bar1H = Math.max(2, BAR_MAX * bar1Prog);
  const bar2H = Math.max(2, BAR_MAX * bar2Prog * 1.21);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 90 }}>
        <div style={{ opacity: titleOp, textAlign: 'center', padding: '0 50px', marginBottom: 8 }}>
          <p style={headline(32, WHITE)}>THE</p>
          <p style={{ ...headline(64, ACCENT), marginTop: 0 }}>$210,000</p>
          <p style={{ ...headline(32, WHITE), marginTop: 0 }}>GAP</p>
        </div>

        <svg width={520} height={390} viewBox="0 0 520 390">
          <line x1={40} y1={366} x2={480} y2={366} stroke={WHITE} strokeWidth={2} opacity={0.2} />

          {/* $1M bar */}
          <rect x={90} y={366 - bar1H} width={110} height={bar1H} rx={6} fill={ACCENT} />
          <text x={145} y={Math.max(22, 366 - bar1H - 8)} textAnchor="middle" fontFamily={FONT} fontSize={18} fontWeight="900" fill={ACCENT}>$1M</text>
          <text x={145} y={384} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={WHITE} opacity={0.6}>WHAT CALC</text>
          <text x={145} y={399} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={WHITE} opacity={0.6}>SHOWS</text>

          {/* $1.21M bar */}
          <rect x={310} y={366 - bar2H} width={110} height={bar2H} rx={6} fill={GREEN} />
          <text x={365} y={Math.max(22, 366 - bar2H - 8)} textAnchor="middle" fontFamily={FONT} fontSize={18} fontWeight="900" fill={GREEN}>$1.21M</text>
          <text x={365} y={384} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={WHITE} opacity={0.6}>WHAT YOU</text>
          <text x={365} y={399} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={WHITE} opacity={0.6}>ACTUALLY NEED</text>

          {/* Gap label */}
          <line x1={200} y1={366 - bar1H} x2={310} y2={366 - bar2H} stroke={WHITE} strokeWidth={1.5} strokeDasharray="5,4" opacity={0.3 * gapOp} />
          <rect x={192} y={48} width={130} height={36} rx={8} fill={ACCENT} opacity={0.9 * gapOp} />
          <text x={257} y={72} textAnchor="middle" fontFamily={FONT} fontSize={17} fontWeight="900" fill={WHITE} opacity={gapOp}>+$210K GAP</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { stiffness: 80, damping: 14 } });
  const s1 = spring({ frame: Math.max(0, frame - 28), fps, config: { stiffness: 100, damping: 18 } });
  const s2 = spring({ frame: Math.max(0, frame - 68), fps, config: { stiffness: 100, damping: 18 } });
  const s3 = spring({ frame: Math.max(0, frame - 108), fps, config: { stiffness: 100, damping: 18 } });
  const ctaOp = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [148, 178], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fixes = [
    { num: '1', label: 'TARGET 3.3%', sub: 'not the old 4%', icon: 'target', scale: s1 },
    { num: '2', label: 'INCOME STREAMS', sub: 'lower your withdrawal rate', icon: 'income', scale: s2 },
    { num: '3', label: 'DELAY SS TO 70', sub: '+32% per check, forever', icon: 'social', scale: s3 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 50px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center' }}>
          <p style={headline(40, BLACK)}>THE FIX</p>
        </div>

        {fixes.map((fix, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            transform: `scale(${fix.scale})`,
            width: '100%', maxWidth: 520,
            background: BLACK, borderRadius: 18, padding: '14px 20px',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 24, fontWeight: 900, color: WHITE }}>{fix.num}</span>
            </div>
            {fix.icon === 'target' && (
              <svg width={42} height={42} viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                <circle cx={21} cy={21} r={19} fill="none" stroke={ACCENT} strokeWidth={3} />
                <circle cx={21} cy={21} r={13} fill="none" stroke={ACCENT} strokeWidth={2.5} opacity={0.7} />
                <circle cx={21} cy={21} r={6} fill={ACCENT} />
              </svg>
            )}
            {fix.icon === 'income' && (
              <svg width={42} height={42} viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                <polygon points="21,5 4,20 38,20" fill={GREEN} />
                <rect x={7} y={20} width={28} height={18} rx={3} fill={GREEN} />
                <rect x={15} y={25} width={12} height={13} rx={2} fill={BLACK} opacity={0.3} />
                <circle cx={33} cy={14} r={7} fill="#3B82F6" />
                <text x={33} y={18} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight="900" fill={WHITE}>$</text>
              </svg>
            )}
            {fix.icon === 'social' && (
              <svg width={42} height={42} viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                <rect x={2} y={9} width={38} height={24} rx={5} fill="#3B82F6" />
                <rect x={2} y={17} width={38} height={5} fill="#2563EB" />
                <text x={21} y={14} textAnchor="middle" fontFamily={FONT} fontSize={7} fill={WHITE} opacity={0.85}>SOCIAL SECURITY</text>
                <text x={21} y={29} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight="900" fill={WHITE}>AGE 70</text>
              </svg>
            )}
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: WHITE, margin: 0, letterSpacing: '0.04em' }}>{fix.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: ACCENT, margin: '2px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{fix.sub}</p>
            </div>
          </div>
        ))}

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, background: ACCENT, borderRadius: 20, padding: '20px 36px', textAlign: 'center', width: '100%', maxWidth: 520 }}>
          <p style={headline(28, WHITE)}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(22, WHITE), marginTop: 6, opacity: 0.88 }}>MONEY MOVES THEY HIDE FROM YOU</p>
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
