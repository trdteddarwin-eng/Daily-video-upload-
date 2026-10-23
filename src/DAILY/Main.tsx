import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const ACCENT_DARK = '#D97706';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GRAY = '#9CA3AF';
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

  const ringsScale = spring({ frame, fps, config: { stiffness: 80, damping: 16 } });
  const priceOp = interpolate(frame, [35, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceY = interpolate(frame, [35, 62], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [78, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigOp = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigScale = spring({ frame: Math.max(0, frame - 105), fps, config: { stiffness: 90, damping: 14 } });
  const subOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 60px' }}>
        {/* Wedding rings SVG */}
        <div style={{ transform: `scale(${ringsScale})`, transformOrigin: 'center' }}>
          <svg width={320} height={210} viewBox="0 0 320 210">
            {/* Ring 1 — left, amber */}
            <circle cx={128} cy={118} r={74} fill="none" stroke={ACCENT} strokeWidth={22} />
            {/* Ring 2 — right, white */}
            <circle cx={196} cy={118} r={74} fill="none" stroke={WHITE} strokeWidth={22} />
            {/* Diamond top */}
            <polygon points="162,28 140,58 162,68 184,58" fill={ACCENT} />
            <polygon points="162,68 140,58 162,96 184,58" fill={ACCENT_DARK} />
            {/* Sparkle lines */}
            <line x1={130} y1={36} x2={124} y2={26} stroke={WHITE} strokeWidth={2.5} />
            <line x1={194} y1={36} x2={200} y2={26} stroke={WHITE} strokeWidth={2.5} />
            <line x1={162} y1={20} x2={162} y2={10} stroke={WHITE} strokeWidth={2.5} />
          </svg>
        </div>

        {/* Price tag */}
        <div style={{ opacity: priceOp, transform: `translateY(${priceY}px)`, textAlign: 'center' }}>
          <p style={headline(42, WHITE)}>THE AVERAGE WEDDING</p>
          <p style={{ ...headline(88, ACCENT), marginTop: 6 }}>$35,000</p>
        </div>

        {/* Down arrow */}
        <div style={{ opacity: arrowOp }}>
          <svg width={50} height={44} viewBox="0 0 50 44">
            <line x1={25} y1={0} x2={25} y2={26} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
            <polygon points="25,44 10,24 40,24" fill={ACCENT} />
          </svg>
        </div>

        {/* $266K big reveal */}
        <div style={{ opacity: bigOp, transform: `scale(${bigScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(40, WHITE), letterSpacing: '0.06em', textTransform: 'none' as const }}>invested =</p>
          <p style={{ ...headline(108, ACCENT), marginTop: 4 }}>$266K</p>
        </div>

        {/* Sub label */}
        <div style={{ opacity: subOp, textAlign: 'center' }}>
          <p style={headline(34, WHITE)}>BY RETIREMENT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const usBarH = interpolate(frame, [22, 75], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glBarH = interpolate(frame, [52, 105], [0, 82], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calloutOp = interpolate(frame, [118, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [152, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>
        {/* Title */}
        <div style={{ opacity: titleOp }}>
          <p style={headline(44, BLACK)}>US VS. THE WORLD</p>
        </div>

        {/* Bar chart */}
        <svg width={500} height={310} viewBox="0 0 500 310">
          {/* Baseline */}
          <line x1={40} y1={258} x2={460} y2={258} stroke="#CCCCCC" strokeWidth={2} />

          {/* US bar */}
          <rect x={90} y={258 - usBarH} width={110} height={usBarH} fill={ACCENT} rx={8} />
          <text x={145} y={276} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={BLACK}>🇺🇸 USA</text>
          {usBarH > 20 && (
            <text x={145} y={250 - usBarH} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight="900" fill={ACCENT_DARK}>$35,000</text>
          )}

          {/* Global bar */}
          <rect x={300} y={258 - glBarH} width={110} height={glBarH} fill={GRAY} rx={8} />
          <text x={355} y={276} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="900" fill={BLACK}>🌍 GLOBAL</text>
          {glBarH > 20 && (
            <text x={355} y={250 - glBarH} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight="900" fill="#555">$13,000</text>
          )}

          {/* 3X callout */}
          <g opacity={calloutOp}>
            <rect x={174} y={96} width={152} height={52} rx={10} fill={BLACK} />
            <text x={250} y={129} textAnchor="middle" fontFamily={FONT} fontSize={30} fontWeight="900" fill={ACCENT}>3X MORE</text>
          </g>
        </svg>

        {/* Sub message */}
        <div style={{ opacity: subOp, textAlign: 'center' }}>
          <p style={{ ...headline(32, BLACK), letterSpacing: '0.05em', textTransform: 'none' as const }}>for a single day of celebration</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b0H = interpolate(frame, [15, 48], [0, 26], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1H = interpolate(frame, [58, 90], [0, 52], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2H = interpolate(frame, [98, 132], [0, 102], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3H = interpolate(frame, [142, 182], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalOp = interpolate(frame, [186, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 60px' }}>
        {/* Title */}
        <div style={{ opacity: titleOp }}>
          <p style={headline(36, WHITE)}>$35K INVESTED AT 7%</p>
        </div>

        {/* Growing bars */}
        <svg width={500} height={300} viewBox="0 0 500 300">
          <line x1={40} y1={248} x2={470} y2={248} stroke="#444" strokeWidth={2} />

          {/* Year 0 bar */}
          <rect x={55} y={248 - b0H} width={80} height={b0H} fill="#555" rx={6} />
          <text x={95} y={266} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={GRAY}>YR 0</text>
          {b0H > 8 && (
            <text x={95} y={240 - b0H} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={GRAY}>$35K</text>
          )}

          {/* Year 10 bar */}
          <rect x={165} y={248 - b1H} width={80} height={b1H} fill={ACCENT_DARK} rx={6} />
          <text x={205} y={266} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={GRAY}>YR 10</text>
          {b1H > 12 && (
            <text x={205} y={240 - b1H} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={ACCENT_DARK}>$69K</text>
          )}

          {/* Year 20 bar */}
          <rect x={275} y={248 - b2H} width={80} height={b2H} fill={ACCENT} rx={6} />
          <text x={315} y={266} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={GRAY}>YR 20</text>
          {b2H > 18 && (
            <text x={315} y={240 - b2H} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={ACCENT}>$135K</text>
          )}

          {/* Year 30 bar */}
          <rect x={385} y={248 - b3H} width={80} height={b3H} fill={ACCENT} rx={6} />
          <text x={425} y={266} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={GRAY}>YR 30</text>
          {b3H > 24 && (
            <text x={425} y={240 - b3H} textAnchor="middle" fontFamily={FONT} fontSize={24} fontWeight="900" fill={ACCENT}>$266K</text>
          )}
        </svg>

        {/* Final label */}
        <div style={{ opacity: finalOp, textAlign: 'center' }}>
          <p style={{ ...headline(30, WHITE), letterSpacing: '0.06em' }}>exchanged for</p>
          <p style={{ ...headline(30, ACCENT), letterSpacing: '0.06em', marginTop: 4 }}>one day of celebration</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statScale = spring({ frame, fps, config: { stiffness: 80, damping: 16 } });
  const coupleOp = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtY = interpolate(frame, [80, 110], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOp = interpolate(frame, [130, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 70px' }}>
        {/* Big stat */}
        <div style={{ transform: `scale(${statScale})`, textAlign: 'center' }}>
          <p style={headline(40, BLACK)}>1 IN 5 COUPLES</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 4 }}>BORROWS FOR THE WEDDING</p>
        </div>

        {/* Couple silhouettes with debt weight */}
        <div style={{ opacity: coupleOp }}>
          <svg width={340} height={200} viewBox="0 0 340 200">
            {/* Person 1 */}
            <circle cx={130} cy={42} r={28} fill={BLACK} />
            <rect x={108} y={76} width={44} height={62} rx={10} fill={BLACK} />
            <line x1={108} y1={138} x2={96} y2={188} stroke={BLACK} strokeWidth={10} strokeLinecap="round" />
            <line x1={152} y1={138} x2={164} y2={188} stroke={BLACK} strokeWidth={10} strokeLinecap="round" />

            {/* Person 2 */}
            <circle cx={216} cy={42} r={28} fill={BLACK} />
            <rect x={194} y={76} width={44} height={62} rx={10} fill={BLACK} />
            <line x1={194} y1={138} x2={182} y2={188} stroke={BLACK} strokeWidth={10} strokeLinecap="round" />
            <line x1={238} y1={138} x2={250} y2={188} stroke={BLACK} strokeWidth={10} strokeLinecap="round" />

            {/* Chain link between them */}
            <line x1={152} y1={108} x2={194} y2={108} stroke={ACCENT} strokeWidth={6} strokeDasharray="8,4" />
          </svg>
        </div>

        {/* Debt box */}
        <div style={{ opacity: debtOp, transform: `translateY(${debtY}px)`, width: '100%' }}>
          <div style={{ background: BLACK, borderRadius: 14, padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>AVG DEBT</p>
            <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0, fontWeight: 900 }}>$11,700</p>
          </div>
        </div>

        {/* 3 years paying it back */}
        <div style={{ opacity: xOp, display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width={36} height={36} viewBox="0 0 36 36">
            <line x1={4} y1={4} x2={32} y2={32} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
            <line x1={32} y1={4} x2={4} y2={32} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, fontWeight: 900 }}>3 YEARS OF PAYMENTS</p>
        </div>

        {/* Sub text */}
        <div style={{ opacity: subOp, textAlign: 'center' }}>
          <p style={{ ...headline(28, BLACK), letterSpacing: '0.04em', textTransform: 'none' as const }}>while the market runs without them</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Scale = spring({ frame: Math.max(0, frame - 30), fps, config: { stiffness: 80, damping: 14 } });
  const item2Scale = spring({ frame: Math.max(0, frame - 85), fps, config: { stiffness: 80, damping: 14 } });
  const item3Scale = spring({ frame: Math.max(0, frame - 145), fps, config: { stiffness: 80, damping: 14 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 60px' }}>
        {/* Header */}
        <div style={{ opacity: headerOp, textAlign: 'center' }}>
          <p style={{ ...headline(44, ACCENT) }}>$266K =</p>
        </div>

        {/* Item 1: College */}
        <div style={{ transform: `scale(${item1Scale})`, transformOrigin: 'center', width: '100%' }}>
          <div style={{ background: '#1E1E1E', borderRadius: 16, padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width={60} height={60} viewBox="0 0 60 60">
              {/* Graduation cap */}
              <polygon points="30,10 5,24 30,38 55,24" fill={ACCENT} />
              <rect x={42} y={22} width={6} height={22} fill={ACCENT} rx={2} />
              <circle cx={48} cy={46} r={6} fill={ACCENT} />
              <rect x={18} y={36} width={24} height={16} rx={4} fill={ACCENT_DARK} />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0, fontWeight: 900 }}>4 YRS OF COLLEGE</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: 0, marginTop: 4 }}>private university tuition</p>
            </div>
          </div>
        </div>

        {/* Item 2: Home */}
        <div style={{ transform: `scale(${item2Scale})`, transformOrigin: 'center', width: '100%' }}>
          <div style={{ background: '#1E1E1E', borderRadius: 16, padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width={60} height={60} viewBox="0 0 60 60">
              {/* House */}
              <polygon points="30,6 4,28 56,28" fill={ACCENT} />
              <rect x={10} y={28} width={40} height={28} fill={WHITE} />
              <rect x={23} y={38} width={14} height={18} fill="#D1D5DB" />
              <circle cx={37} cy={47} r={2.5} fill={ACCENT} />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0, fontWeight: 900 }}>HOME DOWN PAYMENT</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: 0, marginTop: 4 }}>on a $700K starter home</p>
            </div>
          </div>
        </div>

        {/* Item 3: Retirement */}
        <div style={{ transform: `scale(${item3Scale})`, transformOrigin: 'center', width: '100%' }}>
          <div style={{ background: '#1E1E1E', borderRadius: 16, padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width={60} height={60} viewBox="0 0 60 60">
              {/* Clock */}
              <circle cx={30} cy={30} r={26} fill="none" stroke={ACCENT} strokeWidth={5} />
              <line x1={30} y1={30} x2={30} y2={14} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
              <line x1={30} y1={30} x2={44} y2={36} stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
              <circle cx={30} cy={30} r={3} fill={ACCENT} />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0, fontWeight: 900 }}>4 YEARS EARLY RETIREMENT</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: 0, marginTop: 4 }}>at $65K/year withdrawal</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftOp = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftY = interpolate(frame, [25, 55], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightOp = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightY = interpolate(frame, [65, 95], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 125), fps, config: { stiffness: 75, damping: 14 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 60px' }}>
        {/* Title */}
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <p style={headline(40, BLACK)}>TWO CHOICES</p>
        </div>

        {/* Side by side paths */}
        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          {/* Left: The Party */}
          <div style={{ opacity: leftOp, transform: `translateY(${leftY}px)`, flex: 1, background: '#E5E7EB', borderRadius: 18, padding: '22px 18px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, fontWeight: 900 }}>THE PARTY</p>
            <svg width={80} height={80} viewBox="0 0 80 80" style={{ marginTop: 12 }}>
              {/* Wedding cake */}
              <rect x={20} y={44} width={40} height={26} rx={6} fill="#9CA3AF" />
              <rect x={26} y={28} width={28} height={20} rx={5} fill="#9CA3AF" />
              <rect x={32} y={16} width={16} height={16} rx={4} fill="#9CA3AF" />
              <rect x={38} y={8} width={4} height={10} fill="#6B7280" />
              <circle cx={40} cy={6} r={4} fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: '8px 0 0', fontWeight: 900 }}>$35,000</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#6B7280', margin: '6px 0 0' }}>spent in one day</p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: '#EF4444', margin: '10px 0 0', fontWeight: 900 }}>→ $0</p>
          </div>

          {/* Right: The Investment */}
          <div style={{ opacity: rightOp, transform: `translateY(${rightY}px)`, flex: 1, background: BLACK, borderRadius: 18, padding: '22px 18px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, fontWeight: 900 }}>THE CHOICE</p>
            <svg width={80} height={80} viewBox="0 0 80 80" style={{ marginTop: 12 }}>
              {/* Growth arrow chart */}
              <polyline points="8,64 28,52 48,36 72,12" fill="none" stroke={ACCENT} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={72} cy={12} r={6} fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: '8px 0 0', fontWeight: 900 }}>$35,000</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: '6px 0 0' }}>invested at 7%</p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: '10px 0 0', fontWeight: 900 }}>→ $266K</p>
          </div>
        </div>

        {/* CTA card */}
        <div style={{ transform: `scale(${ctaScale})`, transformOrigin: 'center', width: '100%' }}>
          <div style={{ background: ACCENT, borderRadius: 16, padding: '18px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, fontWeight: 900, letterSpacing: '0.05em' }}>
              SHARE BEFORE THEY SIGN THE CONTRACT
            </p>
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
