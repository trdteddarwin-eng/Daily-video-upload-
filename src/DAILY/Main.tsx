import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const AMBER_PALE = '#FCD34D';
const AMBER_DARK = '#D97706';
const RED = '#EF4444';
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
  const textOp = interpolate(frame, [28, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [28, 55], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const qScale = spring({ frame: Math.max(0, frame - 70), fps, config: { stiffness: 200, damping: 14 } });
  const qOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [110, 140], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 50px' }}>
        {/* 529 Document Icon */}
        <svg width={200} height={240} viewBox="0 0 200 240" style={{ transform: `scale(${iconScale})` }}>
          <rect x={15} y={10} width={150} height={200} rx={14} fill={ACCENT} />
          <polygon points="145,10 165,10 165,30" fill={AMBER_DARK} />
          <polygon points="145,30 165,30 145,10" fill={BLACK} opacity={0.15} />
          <text x={90} y={78} textAnchor="middle" fontFamily={FONT} fontSize={54} fontWeight="900" fill={BLACK}>529</text>
          <rect x={28} y={98} width={124} height={8} rx={4} fill={BLACK} opacity={0.22} />
          <rect x={28} y={116} width={100} height={7} rx={4} fill={BLACK} opacity={0.16} />
          <rect x={28} y={133} width={112} height={7} rx={4} fill={BLACK} opacity={0.16} />
          <rect x={28} y={150} width={80} height={7} rx={4} fill={BLACK} opacity={0.16} />
          <text x={90} y={198} textAnchor="middle" fontFamily={FONT} fontSize={34} fill={BLACK} opacity={0.35}>$</text>
        </svg>

        {/* Main headline */}
        <div style={{ opacity: textOp, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>529 MONEY</p>
          <p style={{ ...headline(46, ACCENT), marginTop: 6 }}>LEFT OVER?</p>
        </div>

        {/* Question mark pop */}
        <div style={{ opacity: qOp, transform: `scale(${qScale})`, lineHeight: 1 }}>
          <p style={{ fontFamily: FONT, fontSize: 100, color: AMBER_PALE, margin: 0, lineHeight: 1 }}>?</p>
        </div>

        {/* Subtext */}
        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: 'center', background: ACCENT, borderRadius: 16, padding: '16px 28px' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, fontWeight: 900, color: BLACK, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            $35,000 ESCAPE HATCH
          </p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, opacity: 0.7, margin: '6px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            most parents never hear about
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bagScale = spring({ frame, fps, config: { stiffness: 75, damping: 18 } });
  const warnOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnY = interpolate(frame, [50, 80], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 50px' }}>
        <p style={{ ...headline(40, BLACK), marginBottom: 0 }}>OLD RULE</p>

        {/* Money bag with padlock */}
        <svg width={210} height={240} viewBox="0 0 210 240" style={{ transform: `scale(${bagScale})` }}>
          {/* Bag body */}
          <ellipse cx={105} cy={162} rx={86} ry={74} fill={ACCENT} />
          {/* Bag neck */}
          <rect x={76} y={60} width={58} height={52} rx={10} fill={ACCENT} />
          {/* Knot circle */}
          <ellipse cx={105} cy={64} rx={28} ry={15} fill={AMBER_PALE} />
          {/* $ on bag */}
          <text x={105} y={180} textAnchor="middle" fontFamily={FONT} fontSize={58} fontWeight="900" fill={BLACK} opacity={0.2}>$</text>
          {/* Padlock shackle */}
          <path d="M 79 125 Q 79 104 105 104 Q 131 104 131 125" fill="none" stroke={BLACK} strokeWidth={9} strokeLinecap="round" />
          {/* Padlock body */}
          <rect x={73} y={122} width={64} height={48} rx={9} fill={BLACK} />
          {/* Keyhole circle */}
          <circle cx={105} cy={144} r={8} fill={ACCENT} />
          {/* Keyhole stem */}
          <rect x={101} y={144} width={8} height={14} rx={3} fill={ACCENT} />
        </svg>

        {/* Warning texts */}
        <div style={{ opacity: warnOp, transform: `translateY(${warnY}px)`, textAlign: 'center' }}>
          <p style={headline(32, BLACK)}>EDUCATION ONLY</p>
          <div style={{ background: RED, borderRadius: 12, padding: '10px 28px', marginTop: 14 }}>
            <p style={headline(30, WHITE)}>10% PENALTY TO EXIT</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#555', marginTop: 18, fontStyle: 'italic', textAlign: 'center' }}>
            billions trapped. no way out.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scrollScale = spring({ frame, fps, config: { stiffness: 70, damping: 16 } });
  const arrowProgress = interpolate(frame, [55, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [130, 160], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowX = interpolate(arrowProgress, [0, 1], [175, 360]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 50px' }}>
        <p style={headline(34, ACCENT)}>2024 CHANGED THE GAME</p>

        {/* Law scroll */}
        <svg width={280} height={130} viewBox="0 0 280 130" style={{ transform: `scale(${scrollScale})` }}>
          <rect x={24} y={18} width={232} height={94} rx={6} fill={WHITE} />
          <ellipse cx={24} cy={65} rx={15} ry={47} fill={AMBER_PALE} />
          <ellipse cx={256} cy={65} rx={15} ry={47} fill={AMBER_PALE} />
          <text x={140} y={52} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={BLACK}>SECURE 2.0</text>
          <rect x={44} y={62} width={152} height={6} rx={3} fill={BLACK} opacity={0.18} />
          <rect x={44} y={78} width={130} height={6} rx={3} fill={BLACK} opacity={0.13} />
          <rect x={44} y={94} width={110} height={6} rx={3} fill={BLACK} opacity={0.13} />
        </svg>

        {/* 529 → ROTH IRA diagram */}
        <svg width={520} height={110} viewBox="0 0 520 110">
          {/* 529 box */}
          <rect x={10} y={18} width={155} height={74} rx={12} fill={ACCENT} />
          <text x={87} y={64} textAnchor="middle" fontFamily={FONT} fontSize={34} fontWeight="900" fill={BLACK}>529</text>
          {/* Animated arrow */}
          <line x1={170} y1={55} x2={arrowX} y2={55} stroke={GREEN} strokeWidth={5} strokeLinecap="round" />
          <polygon points={`${arrowX},46 ${arrowX + 18},55 ${arrowX},64`} fill={GREEN} opacity={arrowProgress} />
          {/* ROTH IRA box */}
          <rect x={355} y={18} width={155} height={74} rx={12} fill={GREEN} opacity={arrowProgress} />
          <text x={432} y={50} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={WHITE} opacity={arrowProgress}>ROTH</text>
          <text x={432} y={76} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={WHITE} opacity={arrowProgress}>IRA</text>
        </svg>

        <div style={{ opacity: textOp, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
          <p style={headline(34, GREEN)}>NO TAXES. NO PENALTIES.</p>
          <p style={{ ...headline(26, WHITE), marginTop: 10 }}>COMPLETELY FREE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame, fps, config: { stiffness: 120, damping: 16 } });
  const s2 = spring({ frame: Math.max(0, frame - 48), fps, config: { stiffness: 120, damping: 16 } });
  const s3 = spring({ frame: Math.max(0, frame - 96), fps, config: { stiffness: 120, damping: 16 } });
  const scales = [s1, s2, s3];

  const rules = [
    { num: '1', label: '15-YEAR', sub: 'ACCOUNT MIN AGE', iconType: 'calendar' },
    { num: '2', label: '$7,000/YEAR', sub: 'MAX ROLLOVER', iconType: 'dollar' },
    { num: '3', label: '$35,000', sub: 'LIFETIME LIMIT', iconType: 'trophy' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 50px' }}>
        <p style={{ ...headline(38, BLACK), marginBottom: 4 }}>THE 3 RULES</p>

        {rules.map((rule, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 18,
            transform: `scale(${scales[i]})`,
            width: '100%', maxWidth: 520,
            background: BLACK, borderRadius: 18, padding: '16px 22px',
          }}>
            {/* Number circle */}
            <div style={{
              width: 54, height: 54, borderRadius: '50%', background: ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 900, color: BLACK }}>{rule.num}</span>
            </div>
            {/* Icon */}
            {rule.iconType === 'calendar' && (
              <svg width={46} height={46} viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
                <rect x={2} y={10} width={42} height={34} rx={7} fill={ACCENT} />
                <rect x={2} y={10} width={42} height={16} rx={7} fill={AMBER_PALE} />
                <rect x={2} y={18} width={42} height={8} fill={AMBER_PALE} />
                <rect x={11} y={2} width={7} height={14} rx={3.5} fill={WHITE} />
                <rect x={28} y={2} width={7} height={14} rx={3.5} fill={WHITE} />
                <text x={23} y={38} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight="900" fill={BLACK}>15 YRS</text>
              </svg>
            )}
            {rule.iconType === 'dollar' && (
              <svg width={46} height={46} viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
                <circle cx={23} cy={23} r={21} fill={GREEN} />
                <text x={23} y={32} textAnchor="middle" fontFamily={FONT} fontSize={30} fontWeight="900" fill={WHITE}>$</text>
              </svg>
            )}
            {rule.iconType === 'trophy' && (
              <svg width={46} height={46} viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
                <path d="M 11 6 L 35 6 L 35 22 Q 35 38 23 38 Q 11 38 11 22 Z" fill={ACCENT} />
                <rect x={18} y={38} width={10} height={5} rx={2} fill={AMBER_PALE} />
                <rect x={12} y={41} width={22} height={4} rx={2} fill={AMBER_PALE} />
                <rect x={4} y={6} width={7} height={15} rx={3.5} fill={AMBER_PALE} />
                <rect x={35} y={6} width={7} height={15} rx={3.5} fill={AMBER_PALE} />
              </svg>
            )}
            <div>
              <p style={{ fontFamily: FONT, fontSize: 26, fontWeight: 900, color: WHITE, margin: 0, letterSpacing: '0.05em' }}>{rule.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 16, color: ACCENT, margin: '2px 0 0', letterSpacing: '0.1em' }}>{rule.sub}</p>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = interpolate(frame, [18, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalOp = interpolate(frame, [158, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarH = 350;
  const barH = Math.max(2, maxBarH * barProgress);
  const barY = 490 - barH;
  const currentK = Math.round(35 + (533 - 35) * barProgress);
  const textY = Math.max(20, barY - 14);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110 }}>
        <div style={{ opacity: titleOp, textAlign: 'center', padding: '0 50px' }}>
          <p style={headline(30, WHITE)}>$35,000 AT AGE 25</p>
          <p style={{ ...headline(28, ACCENT), marginTop: 8 }}>GROWS TAX-FREE TO...</p>
        </div>

        <svg width={600} height={540} viewBox="0 0 600 540">
          {/* Baseline */}
          <line x1={60} y1={496} x2={540} y2={496} stroke={WHITE} strokeWidth={2} opacity={0.25} />

          {/* Static start bar (small, $35K) */}
          <rect x={110} y={480} width={110} height={16} rx={5} fill={ACCENT} opacity={0.55} />
          <text x={165} y={474} textAnchor="middle" fontFamily={FONT} fontSize={17} fill={ACCENT} opacity={0.8}>$35K</text>
          <text x={165} y={516} textAnchor="middle" fontFamily={FONT} fontSize={14} fill={WHITE} opacity={0.55}>AGE 25</text>

          {/* Growing bar */}
          <rect x={360} y={barY} width={120} height={barH} rx={6} fill={GREEN} />
          <text x={420} y={textY} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={GREEN}>
            ${currentK}K
          </text>
          <text x={420} y={516} textAnchor="middle" fontFamily={FONT} fontSize={14} fill={WHITE} opacity={0.7}>AGE 65</text>

          {/* Growth arrow decoration */}
          <line x1={235} y1={488} x2={348} y2={barY + 20} stroke={WHITE} strokeWidth={1.5} opacity={0.2} strokeDasharray="5,5" />
        </svg>

        <div style={{ opacity: finalOp, textAlign: 'center', marginTop: -60 }}>
          <p style={headline(50, GREEN)}>$533,000</p>
          <p style={{ ...headline(24, WHITE), marginTop: 8 }}>TAX-FREE FOREVER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame, fps, config: { stiffness: 80, damping: 14 } });
  const arrowOp = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowX = interpolate(frame, [55, 125], [175, 360]);
  const ctaOp = interpolate(frame, [130, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [130, 162], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 50px' }}>
        {/* 90% stat */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ transform: `scale(${numScale})`, display: 'inline-block' }}>
            <p style={{ fontFamily: FONT, fontSize: 130, fontWeight: 900, color: ACCENT, margin: 0, lineHeight: 1 }}>90%</p>
          </div>
          <p style={{ ...headline(30, BLACK), marginTop: 6 }}>OF 529 OWNERS</p>
          <p style={headline(30, BLACK)}>DON'T KNOW THIS</p>
        </div>

        {/* 529 → ROTH IRA arrow */}
        <svg width={520} height={104} viewBox="0 0 520 104" style={{ opacity: arrowOp }}>
          <rect x={10} y={18} width={155} height={68} rx={11} fill={ACCENT} />
          <text x={87} y={61} textAnchor="middle" fontFamily={FONT} fontSize={32} fontWeight="900" fill={BLACK}>529</text>
          <line x1={168} y1={52} x2={arrowX} y2={52} stroke={GREEN} strokeWidth={5} strokeLinecap="round" />
          <polygon points={`${arrowX},43 ${arrowX + 18},52 ${arrowX},61`} fill={GREEN} />
          <rect x={355} y={18} width={155} height={68} rx={11} fill={GREEN} />
          <text x={432} y={46} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={WHITE}>ROTH</text>
          <text x={432} y={71} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={WHITE}>IRA</text>
        </svg>

        {/* CTA card */}
        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, background: BLACK, borderRadius: 22, padding: '24px 36px', textAlign: 'center', width: '100%', maxWidth: 540 }}>
          <p style={headline(28, WHITE)}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(28, ACCENT), marginTop: 6 }}>MONEY MOVES</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, opacity: 0.55, marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            they never taught you
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
