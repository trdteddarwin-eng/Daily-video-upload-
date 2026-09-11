import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
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

// Reusable price tag SVG element (not a React component — no hooks)
function PriceTag({ x, y, price, opacity }: { x: number; y: number; price: string; opacity: number }) {
  return (
    <g opacity={opacity} transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={120} height={80} rx={10} fill={BG_DARK} />
      <circle cx={15} cy={15} r={6} fill={BG_LIGHT} />
      <text x={60} y={54} textAnchor="middle" fontFamily={FONT} fontSize={32} fill={WHITE}>{price}</text>
    </g>
  );
}

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagY = spring({ frame, fps, from: -200, to: 0, config: { damping: 12, stiffness: 100 }, durationInFrames: 40 });
  const box1X = interpolate(frame, [20, 55], [-420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const box2Y = interpolate(frame, [30, 65], [350, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const box3X = interpolate(frame, [40, 75], [420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const freeScale = spring({ frame: Math.max(0, frame - 65), fps, from: 0, to: 1, config: { damping: 8, stiffness: 120 }, durationInFrames: 30 });
  const subtextOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        {/* BOGO tag */}
        <div style={{ transform: `translateY(${tagY}px)` }}>
          <svg width={620} height={110} viewBox="0 0 620 110">
            <rect x={10} y={10} width={600} height={90} rx={16} fill={ACCENT} />
            <text x={310} y={68} textAnchor="middle" fontFamily={FONT} fontSize={46} fontWeight="900" fill={WHITE} letterSpacing="4">BUY 2 GET 1 FREE</text>
          </svg>
        </div>

        {/* Three product boxes */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-end' }}>
          {/* Box 1 */}
          <div style={{ transform: `translateX(${box1X}px)` }}>
            <svg width={165} height={205} viewBox="0 0 165 205">
              <rect x={10} y={20} width={145} height={175} rx={10} fill="#2A2A2A" stroke={WHITE} strokeWidth={2} />
              <rect x={28} y={48} width={109} height={64} rx={6} fill={ACCENT} opacity={0.55} />
              <text x={82} y={90} textAnchor="middle" fontFamily={FONT} fontSize={30} fill={WHITE}>$14</text>
            </svg>
          </div>

          {/* Box 2 */}
          <div style={{ transform: `translateY(${box2Y}px)` }}>
            <svg width={165} height={205} viewBox="0 0 165 205">
              <rect x={10} y={20} width={145} height={175} rx={10} fill="#2A2A2A" stroke={WHITE} strokeWidth={2} />
              <rect x={28} y={48} width={109} height={64} rx={6} fill={ACCENT} opacity={0.55} />
              <text x={82} y={90} textAnchor="middle" fontFamily={FONT} fontSize={30} fill={WHITE}>$14</text>
            </svg>
          </div>

          {/* Box 3 — FREE */}
          <div style={{ transform: `translateX(${box3X}px)` }}>
            <svg width={165} height={205} viewBox="0 0 165 205">
              <rect x={10} y={20} width={145} height={175} rx={10} fill="#2A2A2A" stroke={ACCENT} strokeWidth={4} />
              <rect x={28} y={48} width={109} height={64} rx={6} fill={ACCENT} opacity={0.55} />
              <text x={82} y={90} textAnchor="middle" fontFamily={FONT} fontSize={30} fill={WHITE}>$14</text>
              <g transform={`translate(82,168) scale(${freeScale})`}>
                <rect x={-48} y={-22} width={96} height={44} rx={22} fill={GREEN} />
                <text x={0} y={8} textAnchor="middle" fontFamily={FONT} fontSize={26} fontWeight="900" fill={WHITE}>FREE</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Subtext */}
        <div style={{ opacity: subtextOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(34, WHITE), letterSpacing: '0.1em' }}>73% ONLY WANTED</p>
          <p style={{ ...headline(80, ACCENT) }}>1 ITEM</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 }, durationInFrames: 40 });
  const freeGlow = interpolate(frame, [40, 70, 100, 140], [0, 1, 0.5, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const meterWidth = interpolate(frame, [80, 140], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 70px' }}>
        {/* Brain SVG */}
        <div style={{ transform: `scale(${brainScale})` }}>
          <svg width={200} height={180} viewBox="0 0 200 180">
            <ellipse cx={100} cy={105} rx={72} ry={58} fill="none" stroke={BLACK} strokeWidth={4} />
            <ellipse cx={78} cy={82} rx={36} ry={44} fill="none" stroke={BLACK} strokeWidth={3} />
            <ellipse cx={122} cy={82} rx={36} ry={44} fill="none" stroke={BLACK} strokeWidth={3} />
            <line x1={100} y1={40} x2={100} y2={68} stroke={BLACK} strokeWidth={3} />
            <path d="M 58 85 Q 79 74 100 85 Q 121 96 142 85" fill="none" stroke={BLACK} strokeWidth={2} />
            <path d="M 52 108 Q 76 97 100 108 Q 124 119 148 108" fill="none" stroke={BLACK} strokeWidth={2} />
            <rect x={90} y={158} width={20} height={18} rx={4} fill={BLACK} />
          </svg>
        </div>

        {/* FREE text */}
        <p style={{
          fontFamily: FONT,
          fontSize: 120,
          color: ACCENT,
          margin: 0,
          letterSpacing: '0.12em',
          textShadow: `0 0 ${Math.round(70 * freeGlow)}px ${ACCENT}`,
          textAlign: 'center',
        }}>&ldquo;FREE&rdquo;</p>

        {/* Pain meter */}
        <div style={{ width: 440, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: '0 0 14px 0', letterSpacing: '0.12em' }}>PAIN OF PAYING</p>
          <div style={{ width: '100%', height: 32, background: '#CCCCCC', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ width: `${meterWidth}%`, height: '100%', background: RED, borderRadius: 16 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 22, color: BLACK }}>HURTS</span>
            <span style={{ fontFamily: FONT, fontSize: 22, color: BLACK }}>ZERO</span>
          </div>
        </div>

        <p style={{ ...headline(28, BLACK), opacity: captionOpacity, letterSpacing: '0.08em' }}>RETAILERS FLIP THIS SWITCH ON PURPOSE</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tag1O = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag2O = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag3O = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalO = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savedO = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const overO = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const overScale = spring({ frame: Math.max(0, frame - 155), fps, from: 0.8, to: 1, config: { damping: 10, stiffness: 150 }, durationInFrames: 20 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>
        <p style={{ ...headline(44, WHITE), marginBottom: 0 }}>THE ACTUAL MATH</p>

        {/* Three price tags in SVG */}
        <svg width={540} height={110} viewBox="0 0 540 110">
          <PriceTag x={20} y={15} price="$14" opacity={tag1O} />
          <text x={160} y={72} textAnchor="middle" fontFamily={FONT} fontSize={52} fill={WHITE} opacity={tag2O}>+</text>
          <PriceTag x={200} y={15} price="$14" opacity={tag2O} />
          <text x={340} y={72} textAnchor="middle" fontFamily={FONT} fontSize={52} fill={WHITE} opacity={tag3O}>+</text>
          <PriceTag x={380} y={15} price="$14" opacity={tag3O} />
        </svg>

        {/* Total */}
        <div style={{ opacity: totalO, textAlign: 'center' }}>
          <p style={{ ...headline(34, WHITE), margin: 0 }}>TOTAL SPENT</p>
          <p style={{ ...headline(88, ACCENT), margin: 0 }}>$42</p>
        </div>

        {/* Saved vs Overspent */}
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
          <div style={{ opacity: savedO, textAlign: 'center' }}>
            <p style={{ ...headline(26, GREEN), margin: 0 }}>YOU &ldquo;SAVED&rdquo;</p>
            <p style={{ ...headline(64, GREEN), margin: 0 }}>$14</p>
          </div>
          <div style={{ opacity: overO, transform: `scale(${overScale})`, textAlign: 'center' }}>
            <p style={{ ...headline(26, RED), margin: 0 }}>BUT OVERSPENT</p>
            <p style={{ ...headline(64, RED), margin: 0 }}>$28</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, letterSpacing: '0.08em' }}>MORE THAN PLANNED</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const storeSlide = spring({ frame, fps, from: -320, to: 0, config: { damping: 14, stiffness: 80 }, durationInFrames: 40 });
  const bar1H = interpolate(frame, [50, 95], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const bar2H = interpolate(frame, [70, 125], [0, 245], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const labelO = interpolate(frame, [125, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionO = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 60px' }}>
        {/* Store SVG */}
        <div style={{ transform: `translateX(${storeSlide}px)` }}>
          <svg width={240} height={165} viewBox="0 0 240 165">
            <rect x={20} y={85} width={200} height={80} fill="#555555" />
            <polygon points="10,85 120,22 230,85" fill="#333333" />
            <rect x={48} y={95} width={144} height={30} rx={5} fill={ACCENT} />
            <text x={120} y={117} textAnchor="middle" fontFamily={FONT} fontSize={17} fill={WHITE}>STORE</text>
            <rect x={90} y={125} width={60} height={40} rx={4} fill="#222222" />
            <rect x={28} y={95} width={38} height={26} rx={3} fill="#AAAAAA" />
            <rect x={174} y={95} width={38} height={26} rx={3} fill="#AAAAAA" />
          </svg>
        </div>

        {/* Bar chart */}
        <svg width={440} height={300} viewBox="0 0 440 300">
          <line x1={55} y1={15} x2={55} y2={260} stroke={BLACK} strokeWidth={3} />
          <line x1={55} y1={260} x2={400} y2={260} stroke={BLACK} strokeWidth={3} />

          {/* Bar 1 — regular */}
          <rect x={95} y={260 - bar1H} width={100} height={bar1H} fill="#999999" rx={5} />
          <text x={145} y={278} textAnchor="middle" fontFamily={FONT} fontSize={17} fill={BLACK}>REGULAR</text>

          {/* Bar 2 — BOGO */}
          <rect x={255} y={260 - bar2H} width={100} height={bar2H} fill={ACCENT} rx={5} />
          <text x={305} y={278} textAnchor="middle" fontFamily={FONT} fontSize={17} fill={BLACK}>BOGO</text>

          {/* BOGO profit label */}
          <text x={305} y={260 - bar2H - 12} textAnchor="middle" fontFamily={FONT} fontSize={30} fill={ACCENT} opacity={labelO} fontWeight="900">+40%</text>

          {/* Y label */}
          <text x={18} y={145} textAnchor="middle" fontFamily={FONT} fontSize={15} fill="#777777"
            transform="rotate(-90, 18, 145)">PROFIT</text>
        </svg>

        <p style={{ ...headline(30, BLACK), opacity: captionO }}>THEY'RE NOT BEING GENEROUS</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bagCount = 4;
  const bags = Array.from({ length: Math.max(0, Math.floor(bagCount)) }, (_, i) => i);

  const monthlyCount = Math.floor(interpolate(frame, [100, 145], [0, 136], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const annualCount = Math.floor(interpolate(frame, [155, 210], [0, 1700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const annualO = interpolate(frame, [155, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 60px' }}>
        <p style={{ ...headline(36, WHITE), margin: 0 }}>4 BOGO DEALS A MONTH</p>

        {/* Shopping bags */}
        <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }}>
          {bags.map(i => {
            const bagScale = spring({
              frame: Math.max(0, frame - i * 22),
              fps,
              from: 0,
              to: 1,
              config: { damping: 10, stiffness: 120 },
              durationInFrames: 25,
            });
            return (
              <div key={i} style={{ transform: `scale(${bagScale})` }}>
                <svg width={105} height={125} viewBox="0 0 105 125">
                  <path d="M 16 42 L 6 118 L 99 118 L 89 42 Z" fill={ACCENT} />
                  <rect x={16} y={36} width={73} height={14} rx={5} fill="#C2410C" />
                  <path d="M 32 36 Q 32 10 52 10 Q 72 10 72 36" fill="none" stroke="#C2410C" strokeWidth={7} strokeLinecap="round" />
                  <rect x={24} y={70} width={57} height={26} rx={5} fill={WHITE} />
                  <text x={52} y={88} textAnchor="middle" fontFamily={FONT} fontSize={14} fill={ACCENT} fontWeight="900">BOGO</text>
                </svg>
              </div>
            );
          })}
        </div>

        {/* Monthly */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>MONTHLY OVERSPEND</p>
          <p style={{ ...headline(80, ACCENT), margin: 0 }}>${monthlyCount}</p>
        </div>

        {/* Annual */}
        <div style={{ textAlign: 'center', opacity: annualO }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '4px 0 0 0', letterSpacing: '0.1em' }}>EVERY YEAR</p>
          <p style={{ ...headline(100, RED), margin: 0 }}>${annualCount.toLocaleString()}</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionO = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noScale = spring({ frame: Math.max(0, frame - 50), fps, from: 0, to: 1, config: { damping: 10, stiffness: 100 }, durationInFrames: 30 });
  const arrowO = interpolate(frame, [82, 102], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 105), fps, from: 0, to: 1, config: { damping: 12, stiffness: 90 }, durationInFrames: 35 });
  const finalO = interpolate(frame, [158, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        {/* Question */}
        <div style={{ opacity: questionO, textAlign: 'center' }}>
          <p style={{ ...headline(28, BLACK), margin: '0 0 12px 0', letterSpacing: '0.08em' }}>BEFORE YOU GRAB THAT EXTRA ITEM:</p>
          <p style={{ fontFamily: FONT, fontSize: 46, color: BLACK, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>&ldquo;Would I buy this</p>
          <p style={{ fontFamily: FONT, fontSize: 46, color: BLACK, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>at full price?&rdquo;</p>
        </div>

        {/* NO button */}
        <div style={{ transform: `scale(${noScale})` }}>
          <svg width={230} height={90} viewBox="0 0 230 90">
            <rect x={10} y={10} width={210} height={70} rx={35} fill={RED} />
            <text x={115} y={58} textAnchor="middle" fontFamily={FONT} fontSize={46} fill={WHITE} fontWeight="900">NO</text>
          </svg>
        </div>

        {/* Arrow */}
        <div style={{ opacity: arrowO }}>
          <svg width={60} height={64} viewBox="0 0 60 64">
            <path d="M 30 4 L 30 52 M 14 36 L 30 52 L 46 36" stroke={BLACK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyScale})` }}>
          <svg width={175} height={165} viewBox="0 0 175 165">
            <ellipse cx={78} cy={100} rx={60} ry={50} fill="#F9A8D4" />
            <ellipse cx={126} cy={75} rx={30} ry={26} fill="#F9A8D4" />
            <ellipse cx={114} cy={56} rx={11} ry={8} fill="#F472B6" />
            <ellipse cx={148} cy={79} rx={15} ry={11} fill="#F472B6" />
            <circle cx={144} cy={76} r={3} fill="#9D174D" />
            <circle cx={152} cy={76} r={3} fill="#9D174D" />
            <circle cx={130} cy={67} r={4} fill="#1F2937" />
            <circle cx={131} cy={66} r={1.5} fill={WHITE} />
            <rect x={64} y={54} width={28} height={8} rx={4} fill="#DB2777" />
            <rect x={28} y={142} width={18} height={22} rx={9} fill="#F472B6" />
            <rect x={52} y={142} width={18} height={22} rx={9} fill="#F472B6" />
            <rect x={76} y={142} width={18} height={22} rx={9} fill="#F472B6" />
            <rect x={100} y={142} width={18} height={22} rx={9} fill="#F472B6" />
            <text x={66} y={115} textAnchor="middle" fontFamily={FONT} fontSize={34} fill="#DB2777" fontWeight="900">$</text>
          </svg>
        </div>

        {/* Final message */}
        <div style={{ opacity: finalO, textAlign: 'center' }}>
          <p style={{ ...headline(36, BLACK), margin: 0 }}>WALK AWAY.</p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, textAlign: 'center', margin: '8px 0 0' }}>
            That&rsquo;s <span style={{ color: ACCENT, fontFamily: FONT, fontWeight: 900 }}>$1,700</span> back
          </p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, textAlign: 'center', margin: 0 }}>in your pocket every year.</p>
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
