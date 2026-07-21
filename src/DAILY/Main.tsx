import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#0F0F0F';
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

const PersonIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={100} height={140} viewBox="0 0 100 140">
    <circle cx={50} cy={30} r={28} fill={color} />
    <rect x={18} y={66} width={64} height={74} rx={14} fill={color} />
  </svg>
);

// ─── SCENE 2 ─ Runs out in 17 years ─────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barWidth = interpolate(frame, [20, 170], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const goneOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const years = ['YR 0', 'YR 5', 'YR 10', 'YR 17'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 32,
      }}>
        <div style={{ opacity: titleOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(30, BLACK), marginBottom: 4 }}>YOU SPEND</p>
          <p style={{ ...headline(74, RED), marginBottom: 4 }}>$57,818</p>
          <p style={{ ...headline(30, BLACK) }}>EVERY YEAR IN RETIREMENT</p>
        </div>

        <div style={{ width: 860 }}>
          <p style={{ ...headline(24, BLACK), marginBottom: 12, textAlign: 'left' as const }}>$1,000,000 SAVINGS REMAINING</p>
          <div style={{ width: 860, height: 64, backgroundColor: '#D1D5DB', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${barWidth}%`, height: '100%', backgroundColor: ACCENT, borderRadius: 10 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {years.map((yr, i) => (
              <span key={i} style={{ fontFamily: FONT, fontSize: 22, color: i === 3 ? RED : BLACK, fontWeight: 'bold' }}>{yr}</span>
            ))}
          </div>
        </div>

        <div style={{ opacity: piggyOp, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 12 }}>
          <svg width={150} height={130} viewBox="0 0 150 130">
            <ellipse cx={68} cy={80} rx={60} ry={48} fill="none" stroke={RED} strokeWidth={5} />
            <ellipse cx={120} cy={88} rx={22} ry={16} fill="none" stroke={RED} strokeWidth={4} />
            <circle cx={113} cy={85} r={4} fill={RED} />
            <circle cx={127} cy={85} r={4} fill={RED} />
            <circle cx={85} cy={62} r={6} fill={RED} />
            <ellipse cx={30} cy={40} rx={14} ry={20} fill="none" stroke={RED} strokeWidth={4} />
            <rect x={28} y={120} width={16} height={14} rx={4} fill="none" stroke={RED} strokeWidth={3} />
            <rect x={56} y={120} width={16} height={14} rx={4} fill="none" stroke={RED} strokeWidth={3} />
            <rect x={76} y={120} width={16} height={14} rx={4} fill="none" stroke={RED} strokeWidth={3} />
            <rect x={58} y={26} width={22} height={6} rx={3} fill={RED} />
          </svg>
          <div style={{ opacity: goneOp }}>
            <p style={{ ...headline(52, RED) }}>GONE IN 17 YEARS</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─ Healthcare bomb ───────────────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const crossScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 140 } });
  const bar1H = interpolate(frame, [30, 100], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [50, 120], [0, 250], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [70, 150], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 24,
      }}>
        <svg width={100} height={100} style={{ transform: `scale(${crossScale})` }}>
          <rect x={35} y={5} width={30} height={90} rx={8} fill={RED} />
          <rect x={5} y={35} width={90} height={30} rx={8} fill={RED} />
        </svg>

        <p style={{ ...headline(34, WHITE), marginBottom: 8 }}>HEALTHCARE IN RETIREMENT</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50 }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
            <div style={{ width: 170, height: bar1H, backgroundColor: '#3B82F6', borderRadius: '10px 10px 0 0' }} />
            <p style={{ ...headline(22, WHITE) }}>HOUSING</p>
            <p style={{ ...headline(26, ACCENT) }}>$215K</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
            <div style={{ width: 170, height: bar2H, backgroundColor: '#A78BFA', borderRadius: '10px 10px 0 0' }} />
            <p style={{ ...headline(22, WHITE) }}>FOOD & TRAVEL</p>
            <p style={{ ...headline(26, ACCENT) }}>$230K</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
            <div style={{ width: 170, height: bar3H, backgroundColor: RED, borderRadius: '10px 10px 0 0' }} />
            <p style={{ ...headline(22, RED) }}>HEALTHCARE</p>
            <p style={{ ...headline(26, RED) }}>$315K</p>
          </div>
        </div>

        <div style={{ opacity: footerOp, backgroundColor: '#1F2937', borderRadius: 12, padding: '14px 36px' }}>
          <p style={{ ...headline(24, WHITE) }}>FIDELITY ESTIMATE — PER COUPLE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4 ─ Inflation eats 40% ───────────────────────────────────────────

const MoneyBag: React.FC<{ fill: string; outline: string; scale: number }> = ({ fill, outline, scale }) => (
  <svg width={160} height={180} viewBox="0 0 160 180" style={{ transform: `scale(${scale})` }}>
    <ellipse cx={80} cy={120} rx={70} ry={58} fill={fill} />
    <rect x={54} y={52} width={52} height={44} rx={10} fill={fill} />
    <ellipse cx={80} cy={54} rx={26} ry={14} fill={outline} />
    <circle cx={80} cy={120} r={22} fill={outline} opacity={0.25} />
    <text x={80} y={128} textAnchor="middle" fontFamily={FONT} fontSize={36} fill={outline} fontWeight="bold">$</text>
  </svg>
);

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const leftScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14 } });
  const arrowOp = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightScale = spring({ frame: Math.max(0, frame - 65), fps, from: 0, to: 0.65, config: { damping: 14 } });
  const bannerOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerY = interpolate(frame, [120, 150], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 36,
      }}>
        <p style={{ ...headline(38, BLACK) }}>INFLATION EATS YOUR INCOME</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ transform: `scale(${leftScale})`, textAlign: 'center' as const }}>
            <MoneyBag fill={ACCENT} outline={BLACK} scale={1} />
            <p style={{ ...headline(48, BLACK), marginTop: 8 }}>$40,000</p>
            <p style={{ ...headline(26, '#555'), marginTop: 4 }}>TODAY</p>
          </div>

          <div style={{ opacity: arrowOp, textAlign: 'center' as const, width: 180 }}>
            <p style={{ ...headline(24, RED), marginBottom: 8 }}>20 YEARS</p>
            <svg width={80} height={36} viewBox="0 0 80 36">
              <line x1={4} y1={18} x2={60} y2={18} stroke={RED} strokeWidth={5} />
              <polygon points="58,6 78,18 58,30" fill={RED} />
            </svg>
            <p style={{ ...headline(22, RED), marginTop: 8 }}>2.5% INFLATION</p>
          </div>

          <div style={{ transform: `scale(${rightScale})`, textAlign: 'center' as const }}>
            <MoneyBag fill="#C4C4C4" outline="#6B7280" scale={1} />
            <p style={{ ...headline(48, RED), marginTop: 8 }}>$24,000</p>
            <p style={{ ...headline(26, '#555'), marginTop: 4 }}>REAL VALUE</p>
          </div>
        </div>

        <div style={{
          opacity: bannerOp,
          transform: `translateY(${bannerY}px)`,
          backgroundColor: RED,
          borderRadius: 14,
          padding: '18px 44px',
          textAlign: 'center' as const,
        }}>
          <p style={{ ...headline(26, WHITE) }}>YOU LOSE 40% WITHOUT</p>
          <p style={{ ...headline(26, WHITE), marginTop: 6 }}>SPENDING A DOLLAR MORE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─ Start now vs later ───────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const iconsScale = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: { damping: 14 } });
  const bar1H = interpolate(frame, [40, 130], [0, 290], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [55, 155], [0, 530], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 20,
      }}>
        <div style={{ opacity: titleOp }}>
          <p style={{ ...headline(30, WHITE) }}>TO REACH $2.5 MILLION BY AGE 65</p>
        </div>

        <div style={{ display: 'flex', gap: 120, transform: `scale(${iconsScale})` }}>
          <PersonIcon color={ACCENT} />
          <PersonIcon color="#9CA3AF" />
        </div>

        <div style={{ display: 'flex', gap: 90, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(38, ACCENT) }}>$1,600/MO</p>
            <div style={{ width: 230, height: bar1H, backgroundColor: ACCENT, borderRadius: '12px 12px 0 0' }} />
            <div style={{ backgroundColor: '#1F2937', borderRadius: 10, padding: '10px 24px' }}>
              <p style={{ ...headline(28, ACCENT) }}>START AT 30</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(38, RED) }}>$2,900/MO</p>
            <div style={{ width: 230, height: bar2H, backgroundColor: RED, borderRadius: '12px 12px 0 0' }} />
            <div style={{ backgroundColor: '#1F2937', borderRadius: 10, padding: '10px 24px' }}>
              <p style={{ ...headline(28, RED) }}>START AT 40</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: bottomOp, backgroundColor: '#1F2937', borderRadius: 12, padding: '14px 36px' }}>
          <p style={{ ...headline(26, WHITE) }}>WAITING A DECADE = $1,300 MORE/MONTH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6 ─ CTA: the real number ─────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const fillLevel = interpolate(frame, [15, 150], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numberScale = spring({ frame: Math.max(0, frame - 70), fps, from: 0, to: 1, config: { damping: 12, stiffness: 130 } });
  const ctaOp = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clipY = 290 - (fillLevel / 100) * 290;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 28,
      }}>
        <p style={{ ...headline(36, BLACK) }}>THE REAL TARGET</p>

        <svg width={280} height={290} viewBox="0 0 280 290">
          <defs>
            <clipPath id="piggyClip">
              <rect x={0} y={clipY} width={280} height={290} />
            </clipPath>
          </defs>
          <ellipse cx={126} cy={170} rx={110} ry={88} fill="#D1D5DB" />
          <ellipse cx={126} cy={170} rx={110} ry={88} fill={ACCENT} clipPath="url(#piggyClip)" />
          <ellipse cx={228} cy={182} rx={36} ry={26} fill="#D1D5DB" />
          <ellipse cx={228} cy={182} rx={36} ry={26} fill={ACCENT} clipPath="url(#piggyClip)" />
          <circle cx={218} cy={178} r={5} fill="#6B7280" />
          <circle cx={234} cy={178} r={5} fill="#6B7280" />
          <circle cx={172} cy={148} r={9} fill="#374151" />
          <ellipse cx={72} cy={96} rx={22} ry={30} fill="#D1D5DB" />
          <ellipse cx={72} cy={96} rx={22} ry={30} fill={ACCENT} clipPath="url(#piggyClip)" />
          <rect x={66} y={272} width={26} height={18} rx={6} fill="#D1D5DB" />
          <rect x={104} y={272} width={26} height={18} rx={6} fill="#D1D5DB" />
          <rect x={140} y={272} width={26} height={18} rx={6} fill="#D1D5DB" />
          <rect x={108} y={72} width={38} height={8} rx={4} fill="#374151" />
        </svg>

        <div style={{ transform: `scale(${numberScale})`, textAlign: 'center' as const }}>
          <p style={{ ...headline(96, ACCENT), marginBottom: 6 }}>$2.5M</p>
          <p style={{ ...headline(32, BLACK) }}>NOT $1 MILLION</p>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center' as const, gap: 8, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
          <p style={{ ...headline(28, BLACK) }}>EVERY YEAR YOU WAIT COSTS MORE.</p>
          <p style={{ ...headline(24, '#555') }}>FOLLOW FOR REAL MONEY MATH.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 1 ─ Hook: the $1M myth ────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const coinScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const titleSlide = spring({ frame: Math.max(0, frame - 18), fps, from: 70, to: 0, config: { damping: 14 } });
  const equalsOp = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const equalsScale = spring({ frame: Math.max(0, frame - 60), fps, from: 0.7, to: 1, config: { damping: 14 } });
  const warnOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 20,
      }}>
        <svg width={180} height={180} style={{ transform: `scale(${coinScale})` }}>
          <circle cx={90} cy={90} r={86} fill={ACCENT} />
          <circle cx={90} cy={90} r={72} fill="none" stroke={BLACK} strokeWidth={5} />
          <text x={90} y={112} textAnchor="middle" fontFamily={FONT} fontSize={72} fill={BLACK} fontWeight="bold">$</text>
        </svg>

        <div style={{ transform: `translateY(${titleSlide}px)`, textAlign: 'center' as const }}>
          <p style={{ ...headline(82, WHITE), marginBottom: 6 }}>$1,000,000</p>
          <p style={{ ...headline(28, ACCENT) }}>THE RETIREMENT GOAL</p>
        </div>

        <div style={{ opacity: equalsOp, transform: `scale(${equalsScale})`, textAlign: 'center' as const }}>
          <p style={{ ...headline(30, WHITE), marginBottom: 10 }}>AT 4% WITHDRAWAL =</p>
          <p style={{ ...headline(90, ACCENT), marginBottom: 12 }}>$40,000</p>
          <p style={{ ...headline(28, WHITE) }}>PER YEAR</p>
        </div>

        <div style={{ opacity: warnOp, backgroundColor: RED, borderRadius: 12, padding: '18px 40px' }}>
          <p style={{ ...headline(26, WHITE) }}>BARELY ABOVE POVERTY LEVEL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ─────────────────────────────────────────────────────────────

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
