import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
const GRAY = '#6B7280';
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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Person holding bag — "I DESERVE THIS" ───────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [90, 0]);

  const personOp = interpolate(frame, [18, 52], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const bagSp = spring({ frame: Math.max(0, frame - 38), fps: 30, config: { damping: 12, stiffness: 88 } });
  const bagScale = interpolate(bagSp, [0, 1], [0, 1]);

  const subOp = interpolate(frame, [162, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 96 }}>
        <div style={{ ...headline(74, ACCENT), transform: `translateY(${titleY}px)`, marginBottom: 30, padding: '0 40px' }}>
          "I DESERVE THIS"
        </div>

        <svg width={960} height={680} viewBox="0 0 960 680" style={{ opacity: personOp }}>
          {/* Person silhouette — centered at x=400 */}
          <circle cx={400} cy={82} r={64} fill={WHITE} />
          <rect x={350} y={150} width={100} height={132} rx={14} fill={WHITE} />
          {/* Right arm extended toward bag */}
          <rect x={448} y={164} width={110} height={20} rx={10} fill={WHITE} transform="rotate(-18 448 174)" />
          {/* Left arm */}
          <rect x={244} y={164} width={106} height={20} rx={10} fill={WHITE} transform="rotate(14 244 174)" />
          {/* Legs */}
          <rect x={358} y={278} width={38} height={96} rx={10} fill={WHITE} />
          <rect x={404} y={278} width={38} height={96} rx={10} fill={WHITE} />

          {/* Shopping bag at right hand */}
          <g transform={`translate(600, 148) scale(${bagScale})`}>
            <rect x={-72} y={32} width={144} height={155} rx={14} fill={ACCENT} />
            <path d="M-40 32 Q-40,-12 0,-12 Q40,-12 40,32" stroke={ACCENT} strokeWidth={13} fill="none" strokeLinecap="round" />
            <rect x={-58} y={52} width={19} height={72} rx={8} fill="rgba(255,255,255,0.22)" />
            <rect x={-30} y={82} width={60} height={36} rx={8} fill={BLACK} opacity={0.35} />
            <text x={0} y={106} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={19} fontWeight="bold">$147</text>
          </g>

          {/* Sparkle effect around bag */}
          <g opacity={bagScale}>
            <circle cx={720} cy={108} r={8} fill={ACCENT} opacity={0.7} />
            <circle cx={745} cy={145} r={5} fill={ACCENT} opacity={0.5} />
            <circle cx={706} cy={168} r={6} fill={ACCENT} opacity={0.6} />
            <line x1={730} y1={90} x2={730} y2={106} stroke={ACCENT} strokeWidth={3} opacity={0.6} />
            <line x1={722} y1={98} x2={738} y2={98} stroke={ACCENT} strokeWidth={3} opacity={0.6} />
          </g>
        </svg>

        <div style={{ ...headline(40, WHITE), opacity: subOp, marginTop: 0 }}>
          THAT PHRASE IS COSTING YOU THOUSANDS
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Brain + moral licensing ────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const brainSp = spring({ frame: Math.max(0, frame - 18), fps: 30, config: { damping: 13, stiffness: 82 } });
  const brainScale = interpolate(brainSp, [0, 1], [0.2, 1]);

  const checkOp = interpolate(frame, [62, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cartOp = interpolate(frame, [98, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowPulse = interpolate(frame % 30, [0, 15, 30], [0.45, 1, 0.45]);
  const statOp = interpolate(frame, [162, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 108 }}>
        <div style={{ ...headline(64, BLACK), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 46 }}>
          MORAL LICENSING
        </div>

        <svg width={960} height={620} viewBox="0 0 960 620">
          {/* Checkmark box — left */}
          <g opacity={checkOp}>
            <rect x={48} y={110} width={200} height={200} rx={20} fill={GREEN} opacity={0.12} stroke={GREEN} strokeWidth={3} />
            <polyline points="88,212 134,258 224,162" stroke={GREEN} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={148} y={346} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={22} fontWeight="bold">GOOD DEED</text>
            <text x={148} y={374} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={22} fontWeight="bold">DONE</text>
          </g>

          {/* Brain — center, springs in */}
          <g transform={`translate(480, 210) scale(${brainScale})`}>
            <path d="M0,-100 Q38,-126 68,-100 Q96,-76 86,-42 Q104,-18 90,16 Q76,50 52,58 Q28,68 0,62 Q-28,68 -52,58 Q-76,50 -90,16 Q-104,-18 -86,-42 Q-96,-76 -68,-100 Q-38,-126 0,-100 Z" fill={BLACK} opacity={0.1} stroke={BLACK} strokeWidth={4} />
            <path d="M0,-76 Q22,-90 42,-74 Q56,-56 48,-34 M-26,-62 Q-8,-84 8,-74" stroke={BLACK} strokeWidth={3} fill="none" opacity={0.35} strokeLinecap="round" />
            <rect x={-40} y={-28} width={80} height={56} rx={8} fill={ACCENT} opacity={0.92} />
            <text y={-10} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={15} fontWeight="bold">PERMISSION</text>
            <text y={12} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={15} fontWeight="bold">SLIP</text>
          </g>

          {/* Shopping cart — right */}
          <g opacity={cartOp}>
            <path d="M696,118 L696,218 L836,218 L852,132 L712,132 Z" fill={ACCENT} opacity={0.2} stroke={ACCENT} strokeWidth={3} />
            <path d="M666,98 L696,118" stroke={ACCENT} strokeWidth={9} strokeLinecap="round" />
            <circle cx={716} cy={240} r={20} fill={ACCENT} />
            <circle cx={816} cy={240} r={20} fill={ACCENT} />
            <text x={764} y={182} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={50} fontWeight="bold">$</text>
            <text x={764} y={318} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={22} fontWeight="bold">REWARD</text>
            <text x={764} y={346} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={22} fontWeight="bold">UNLOCKED</text>
          </g>

          {/* Arrows */}
          <line x1={250} y1={210} x2={360} y2={210} stroke={GREEN} strokeWidth={5} strokeLinecap="round" opacity={checkOp} />
          <polygon points="362,200 382,210 362,220" fill={GREEN} opacity={checkOp} />
          <line x1={598} y1={210} x2={664} y2={210} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" opacity={cartOp * arrowPulse} />
          <polygon points="666,200 686,210 666,220" fill={ACCENT} opacity={cartOp * arrowPulse} />
        </svg>

        <div style={{ ...headline(34, BLACK), opacity: statOp, padding: '18px 42px', background: 'rgba(245,158,11,0.12)', borderRadius: 16, border: `3px solid ${ACCENT}` }}>
          40% MORE LIKELY TO SPLURGE AFTER BEING "GOOD"
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Three triggers — dumbbell, salad, laptop ───────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s1Sp = spring({ frame: Math.max(0, frame - 18), fps: 30, config: { damping: 13, stiffness: 95 } });
  const s2Sp = spring({ frame: Math.max(0, frame - 62), fps: 30, config: { damping: 13, stiffness: 95 } });
  const s3Sp = spring({ frame: Math.max(0, frame - 106), fps: 30, config: { damping: 13, stiffness: 95 } });
  const s1Scale = interpolate(s1Sp, [0, 1], [0, 1]);
  const s2Scale = interpolate(s2Sp, [0, 1], [0, 1]);
  const s3Scale = interpolate(s3Sp, [0, 1], [0, 1]);

  const cartSp = spring({ frame: Math.max(0, frame - 146), fps: 30, config: { damping: 12, stiffness: 85 } });
  const cartScale = interpolate(cartSp, [0, 1], [0, 1]);
  const arrowOp = interpolate(frame, [146, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 96 }}>
        <div style={{ ...headline(60, ACCENT), opacity: titleOp, marginBottom: 48 }}>
          THE 3 TRIGGERS
        </div>

        <svg width={980} height={860} viewBox="0 0 980 860">
          {/* Trigger 1: Dumbbell */}
          <g transform={`translate(155, 295) scale(${s1Scale})`}>
            <circle cx={0} cy={-128} r={44} fill={ACCENT} />
            <text x={0} y={-112} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={38} fontWeight="bold">1</text>
            <rect x={-72} y={-18} width={144} height={36} rx={10} fill={WHITE} />
            <rect x={-104} y={-52} width={36} height={104} rx={12} fill={WHITE} />
            <rect x={-118} y={-62} width={28} height={124} rx={12} fill={WHITE} opacity={0.65} />
            <rect x={68} y={-52} width={36} height={104} rx={12} fill={WHITE} />
            <rect x={90} y={-62} width={28} height={124} rx={12} fill={WHITE} opacity={0.65} />
            <text x={0} y={90} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={22} fontWeight="bold">GYM VISIT</text>
          </g>

          {/* Trigger 2: Salad bowl */}
          <g transform={`translate(490, 295) scale(${s2Scale})`}>
            <circle cx={0} cy={-128} r={44} fill={ACCENT} />
            <text x={0} y={-112} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={38} fontWeight="bold">2</text>
            <path d="M-78,0 Q-78,88 0,98 Q78,88 78,0 Z" fill="#92400E" opacity={0.85} />
            <ellipse cx={0} cy={0} rx={78} ry={24} fill="#78350F" />
            <ellipse cx={0} cy={-8} rx={64} ry={20} fill="#16A34A" />
            <ellipse cx={-20} cy={-14} rx={19} ry={9} fill="#4ADE80" />
            <ellipse cx={18} cy={-16} rx={15} ry={7} fill="#86EFAC" />
            <circle cx={-8} cy={-18} r={7} fill="#DC2626" />
            <circle cx={14} cy={-12} r={5} fill="#FCD34D" />
            <text x={0} y={90} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={22} fontWeight="bold">EATING CLEAN</text>
          </g>

          {/* Trigger 3: Laptop */}
          <g transform={`translate(825, 295) scale(${s3Scale})`}>
            <circle cx={0} cy={-128} r={44} fill={ACCENT} />
            <text x={0} y={-112} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={38} fontWeight="bold">3</text>
            <rect x={-86} y={28} width={172} height={15} rx={8} fill={WHITE} opacity={0.72} />
            <rect x={-76} y={-80} width={152} height={110} rx={10} fill={WHITE} opacity={0.9} />
            <rect x={-66} y={-70} width={132} height={92} rx={6} fill="#1D4ED8" opacity={0.85} />
            <polyline points="-28,-24 -4,12 46,-36" stroke={WHITE} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={0} y={90} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={20} fontWeight="bold">WORK DEADLINE</text>
          </g>

          {/* Converging dashed arrows → central cart */}
          <g opacity={arrowOp}>
            <line x1={155} y1={390} x2={432} y2={565} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" strokeDasharray="11,7" />
            <line x1={490} y1={390} x2={490} y2={568} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" strokeDasharray="11,7" />
            <line x1={825} y1={390} x2={548} y2={565} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" strokeDasharray="11,7" />
          </g>

          {/* Central shopping cart */}
          <g transform={`translate(490, 618) scale(${cartScale})`}>
            <path d="M-96,-20 L-96,92 L96,92 L110,-20 Z" fill={ACCENT} opacity={0.22} stroke={ACCENT} strokeWidth={4} />
            <path d="M-130,-44 L-96,-20" stroke={ACCENT} strokeWidth={10} strokeLinecap="round" />
            <circle cx={-56} cy={118} r={22} fill={ACCENT} />
            <circle cx={56} cy={118} r={22} fill={ACCENT} />
            <text x={0} y={58} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={66} fontWeight="bold">$</text>
          </g>

          <text x={490} y={786} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={26} fontWeight="bold" opacity={arrowOp}>
            ALL 3 FLIP THE SAME BRAIN SWITCH
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: $4,800 counter + monthly bar chart ─────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterProg = interpolate(frame, [38, 162], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const dollarVal = Math.round(counterProg * 4800);

  const barReveal = interpolate(frame, [52, 185], [0, 12], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const visibleBars = Math.max(0, Math.floor(barReveal));

  const statOp = interpolate(frame, [168, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barHeights = [0.85, 0.90, 1.00, 0.95, 0.88, 0.92, 0.97, 0.83, 0.91, 0.87, 0.94, 0.96];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 102 }}>
        <div style={{ ...headline(60, BLACK), opacity: titleOp, marginBottom: 28 }}>
          THE MATH
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 112,
          color: ACCENT,
          letterSpacing: '0.04em',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: 14,
        }}>
          ${dollarVal.toLocaleString()}
        </div>
        <div style={{ ...headline(28, GRAY), marginBottom: 38 }}>PER YEAR ON "SELF-REWARDS"</div>

        <svg width={960} height={360} viewBox="0 0 960 360">
          <line x1={36} y1={310} x2={924} y2={310} stroke={BLACK} strokeWidth={2} opacity={0.28} />
          {months.map((month, i) => {
            const bx = 48 + i * 73;
            const bh = barHeights[i] * 210;
            const visible = i < visibleBars;
            return (
              <g key={i} opacity={visible ? 1 : 0}>
                <rect x={bx} y={310 - bh} width={54} height={bh} rx={6} fill={ACCENT} opacity={0.82} />
                <text x={bx + 27} y={334} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={18}>{month}</text>
                <text x={bx + 27} y={310 - bh - 8} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={14} fontWeight="bold">$400</text>
              </g>
            );
          })}
        </svg>

        <div style={{ ...headline(32, BLACK), opacity: statOp, marginTop: 14 }}>
          73% OF AMERICANS DO THIS EVERY MONTH
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Two bars — spent vs invested ────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const prog = interpolate(frame, [36, 180], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const spentBarH = interpolate(prog, [0, 1], [0, 148]);
  const investBarH = interpolate(prog, [0, 1], [0, 580]);

  const labelOp = interpolate(frame, [168, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const spentVal = Math.round(prog * 4800);
  const investVal = Math.round(prog * 576000);

  const fmtInvest = (n: number): string => {
    if (n >= 1000) return `$${Math.round(n / 1000)}K`;
    return `$${n}`;
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100 }}>
        <div style={{ ...headline(58, WHITE), opacity: titleOp, marginBottom: 36 }}>
          WHAT IT REALLY COSTS
        </div>

        <svg width={920} height={820} viewBox="0 0 920 820">
          <line x1={48} y1={756} x2={872} y2={756} stroke={WHITE} strokeWidth={2} opacity={0.18} />

          {/* Left: spent bar */}
          <rect x={96} y={756 - spentBarH} width={224} height={spentBarH} rx={10} fill={RED} opacity={0.86} />
          <text x={208} y={Math.max(756 - spentBarH - 16, 28)} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={28} fontWeight="bold">
            {spentVal < 50 ? '$0' : `$${spentVal.toLocaleString()}`}
          </text>
          <text x={208} y={784} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={21} fontWeight="bold">SPENT ON</text>
          <text x={208} y={810} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={21} fontWeight="bold">TREATS / YR</text>

          {/* VS */}
          <text x={460} y={420} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={52} fontWeight="bold">VS</text>
          <text x={460} y={470} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={20}>SAME MONEY, INVESTED</text>

          {/* Right: invested bar */}
          <rect x={600} y={756 - Math.min(investBarH, 720)} width={224} height={Math.min(investBarH, 720)} rx={10} fill={GREEN} opacity={0.86} />
          <text x={712} y={Math.max(756 - Math.min(investBarH, 720) - 16, 28)} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={28} fontWeight="bold">
            {investVal < 50 ? '$0' : fmtInvest(investVal)}
          </text>
          <text x={712} y={784} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={21} fontWeight="bold">INVESTED</text>
          <text x={712} y={810} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={21} fontWeight="bold">OVER 30 YRS</text>

          <text x={460} y={648} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={24} fontWeight="bold" opacity={labelOp}>
            YOUR TREATS ARE EATING YOUR RETIREMENT
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: 24-hour rule + CTA ─────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [70, 0]);

  const glassSp = spring({ frame: Math.max(0, frame - 22), fps: 30, config: { damping: 12, stiffness: 88 } });
  const glassScale = interpolate(glassSp, [0, 1], [0.4, 1]);
  const glassOp = interpolate(frame, [22, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const sandProg = interpolate(frame, [38, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const topSandH = interpolate(sandProg, [0, 1], [104, 0]);
  const botSandH = interpolate(sandProg, [0, 1], [0, 104]);

  const statOp = interpolate(frame, [98, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSp = spring({ frame: Math.max(0, frame - 148), fps: 30, config: { damping: 10, stiffness: 100 } });
  const ctaScale = interpolate(ctaSp, [0, 1], [0.75, 1]);
  const ctaOp = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 102 }}>
        <div style={{ ...headline(64, BLACK), transform: `translateY(${titleY}px)`, marginBottom: 36 }}>
          THE 24-HOUR RULE
        </div>

        <svg
          width={420}
          height={490}
          viewBox="0 0 420 490"
          style={{ opacity: glassOp, transform: `scale(${glassScale})`, transformOrigin: 'center center' }}
        >
          {/* Hourglass frame */}
          <path d="M56,18 L364,18 L226,238 L364,458 L56,458 L194,238 Z" fill="rgba(0,0,0,0.06)" stroke={BLACK} strokeWidth={6} strokeLinejoin="round" />
          <rect x={44} y={8} width={332} height={22} rx={9} fill={BLACK} opacity={0.8} />
          <rect x={44} y={460} width={332} height={22} rx={9} fill={BLACK} opacity={0.8} />

          {/* Top sand (draining) */}
          <clipPath id="sandTop">
            <path d="M58,20 L362,20 L224,238 L196,238 Z" />
          </clipPath>
          <rect x={58} y={20} width={304} height={topSandH} fill={ACCENT} clipPath="url(#sandTop)" opacity={0.88} />

          {/* Bottom sand (filling) */}
          <clipPath id="sandBot">
            <path d="M196,238 L224,238 L362,458 L58,458 Z" />
          </clipPath>
          <rect x={58} y={458 - botSandH} width={304} height={botSandH} fill={ACCENT} clipPath="url(#sandBot)" opacity={0.88} />

          <text x={210} y={270} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={52} fontWeight="bold">24</text>
          <text x={210} y={320} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={30} fontWeight="bold">HRS</text>
        </svg>

        <div style={{ opacity: statOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 24 }}>
          <div style={{ ...headline(36, BLACK) }}>WAIT BEFORE YOU BUY</div>
          <div style={{ fontFamily: FONT, fontSize: 28, color: GRAY, textAlign: 'center' as const, letterSpacing: '0.04em' }}>
            Kills 67% of impulse splurges cold
          </div>
        </div>

        <div style={{
          ...headline(42, BLACK),
          opacity: ctaOp,
          transform: `scale(${ctaScale})`,
          marginTop: 40,
          background: ACCENT,
          padding: '24px 52px',
          borderRadius: 20,
        }}>
          FOLLOW FOR MORE MONEY TRUTHS
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



