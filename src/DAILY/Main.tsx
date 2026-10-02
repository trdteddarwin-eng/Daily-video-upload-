import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const GREEN = '#10B981';
const RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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

const Person: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({
  x, y, scale = 1, color = WHITE,
}) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <circle cx={0} cy={-60} r={22} fill={color} />
    <rect x={-18} y={-35} width={36} height={50} rx={8} fill={color} />
    <rect x={-28} y={-30} width={14} height={36} rx={6} fill={color} />
    <rect x={14} y={-30} width={14} height={36} rx={6} fill={color} />
    <rect x={-14} y={18} width={13} height={42} rx={6} fill={color} />
    <rect x={4} y={18} width={13} height={42} rx={6} fill={color} />
  </g>
);

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 20], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fundH = interpolate(frame, [20, 60], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const youH = interpolate(frame, [40, 80], [0, 192], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const labelOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shockOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barBaseY = 1400;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={`translate(0, ${titleY})`} opacity={titleOpacity}>
          <text x={540} y={180} style={headline(52, WHITE)} textAnchor="middle">YOUR FUND</text>
          <text x={540} y={248} style={headline(52, ACCENT)} textAnchor="middle">VS YOU</text>
        </g>
        <rect x={180} y={barBaseY - fundH} width={240} height={fundH} rx={16} fill={GREEN} />
        <rect x={660} y={barBaseY - youH} width={240} height={youH} rx={16} fill={ACCENT} />
        <g opacity={labelOpacity}>
          <text x={300} y={barBaseY - fundH - 24} style={headline(52, GREEN)} textAnchor="middle">10%</text>
          <text x={780} y={barBaseY - youH - 24} style={headline(52, ACCENT)} textAnchor="middle">4%</text>
          <text x={300} y={barBaseY + 60} style={headline(36, WHITE)} textAnchor="middle">FUND</text>
          <text x={780} y={barBaseY + 60} style={headline(36, WHITE)} textAnchor="middle">YOU</text>
        </g>
        <g opacity={shockOpacity}>
          <Person x={540} y={1060} scale={1.4} color={WHITE} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i}
                x1={540 + 80 * Math.cos(rad)} y1={1000 + 80 * Math.sin(rad)}
                x2={540 + 110 * Math.cos(rad)} y2={1000 + 110 * Math.sin(rad)}
                stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
            );
          })}
        </g>
        <line x1={120} y1={barBaseY} x2={960} y2={barBaseY} stroke={WHITE} strokeWidth={3} opacity={0.3} />
      </svg>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const drawProgress = interpolate(frame, [15, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const labelOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartX = 100; const chartY = 500; const chartW = 880; const chartH = 900;
  const steps = Math.max(0, Math.floor(drawProgress * 30));
  const fundPts: string[] = [];
  const youPts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const px = chartX + (i / 30) * chartW;
    const fundFrac = 1 - Math.pow(1.1, i) / Math.pow(1.1, 30);
    const youFrac = 1 - Math.pow(1.068, i) / Math.pow(1.068, 30);
    fundPts.push(`${px},${chartY + chartH * fundFrac + 50}`);
    youPts.push(`${px},${chartY + chartH * youFrac + 50}`);
  }

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOpacity}>
          <text x={540} y={160} style={headline(48, BLACK)} textAnchor="middle">THE BEHAVIOR</text>
          <text x={540} y={220} style={headline(48, RED)} textAnchor="middle">GAP</text>
          <text x={540} y={310} style={{ fontFamily: FONT, fontSize: 34, color: BLACK, letterSpacing: '0.05em' } as React.CSSProperties} textAnchor="middle">30 YEARS OF PROOF</text>
        </g>
        <line x1={chartX} y1={chartY + 50} x2={chartX} y2={chartY + chartH + 50} stroke={BLACK} strokeWidth={3} opacity={0.3} />
        <line x1={chartX} y1={chartY + chartH + 50} x2={chartX + chartW} y2={chartY + chartH + 50} stroke={BLACK} strokeWidth={3} opacity={0.3} />
        {fundPts.length > 1 && <polyline points={fundPts.join(' ')} fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        {youPts.length > 1 && <polyline points={youPts.join(' ')} fill="none" stroke={ACCENT} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        <g opacity={gapOpacity}>
          <text x={540} y={1000} style={headline(54, RED)} textAnchor="middle">3.1% GAP</text>
          <text x={540} y={1075} style={headline(34, BLACK)} textAnchor="middle">EVERY SINGLE YEAR</text>
        </g>
        <g opacity={labelOpacity}>
          <rect x={820} y={chartY + 70} width={160} height={48} rx={8} fill={GREEN} />
          <text x={900} y={chartY + 103} style={headline(28, WHITE)} textAnchor="middle">FUND</text>
          <rect x={820} y={chartY + 290} width={160} height={48} rx={8} fill={ACCENT} />
          <text x={900} y={chartY + 323} style={headline(28, BLACK)} textAnchor="middle">YOU</text>
        </g>
        <text x={chartX} y={chartY + chartH + 110} style={headline(28, BLACK)} textAnchor="middle">0</text>
        <text x={chartX + chartW / 2} y={chartY + chartH + 110} style={headline(28, BLACK)} textAnchor="middle">15 YRS</text>
        <text x={chartX + chartW} y={chartY + chartH + 110} style={headline(28, BLACK)} textAnchor="middle">30 YRS</text>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineProgress = interpolate(frame, [15, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personX = interpolate(frame, [70, 110], [440, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const personOpacity = interpolate(frame, [105, 120], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bounceProgress = interpolate(frame, [100, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const labelOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sellOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cx = 100; const cy = 900;
  const allPoints: [number, number][] = [
    [0, 0], [100, -80], [200, -150], [280, -200], [360, -120],
    [440, 60], [520, 180], [600, 100], [700, -20], [780, -130], [880, -220],
  ];
  const visibleCount = Math.max(0, Math.floor(lineProgress * (allPoints.length - 1)));
  const mainPts = allPoints.slice(0, visibleCount + 1).map(([dx, dy]) => `${cx + dx},${cy + dy}`).join(' ');
  const bouncePts = allPoints.slice(5).slice(0, Math.max(0, Math.floor(bounceProgress * 6))).map(([dx, dy]) => `${cx + dx},${cy + dy}`).join(' ');
  const sellX = cx + allPoints[5][0];
  const sellY = cy + allPoints[5][1];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOpacity}>
          <text x={540} y={160} style={headline(48, WHITE)} textAnchor="middle">CAUSE #1</text>
          <text x={540} y={230} style={headline(58, RED)} textAnchor="middle">PANIC SELLING</text>
        </g>
        {mainPts.length > 1 && <polyline points={mainPts} fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        <g opacity={sellOpacity}>
          <polygon points={`${sellX},${sellY - 20} ${sellX - 24},${sellY - 60} ${sellX + 24},${sellY - 60}`} fill={RED} />
          <rect x={sellX - 60} y={sellY - 100} width={120} height={44} rx={8} fill={RED} />
          <text x={sellX} y={sellY - 68} style={headline(30, WHITE)} textAnchor="middle">SELL!</text>
        </g>
        {bouncePts.length > 1 && <polyline points={bouncePts} fill="none" stroke={GREEN} strokeWidth={8} strokeDasharray="20 10" strokeLinecap="round" strokeLinejoin="round" />}
        <g opacity={personOpacity}>
          <Person x={personX} y={1150} scale={1.2} color={WHITE} />
        </g>
        <g opacity={labelOpacity}>
          <text x={540} y={1360} style={headline(44, WHITE)} textAnchor="middle">MISSED THE</text>
          <text x={540} y={1420} style={headline(44, ACCENT)} textAnchor="middle">BOUNCE</text>
          <text x={540} y={1520} style={headline(34, WHITE)} textAnchor="middle">LOSS LOCKED IN</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineProgress = interpolate(frame, [15, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const personY = interpolate(frame, [75, 100], [600, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const personOpacity = interpolate(frame, [72, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dropProgress = interpolate(frame, [100, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const labelOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buyOpacity = interpolate(frame, [78, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cx = 100; const cy = 1050;
  const risePoints: [number, number][] = [[0, 0], [120, -100], [240, -220], [360, -360], [480, -480]];
  const dropPoints: [number, number][] = [[480, -480], [580, -340], [680, -180], [780, -60], [880, 20]];

  const riseCount = Math.max(0, Math.floor(lineProgress * risePoints.length));
  const risePts = risePoints.slice(0, riseCount).map(([dx, dy]) => `${cx + dx},${cy + dy}`).join(' ');
  const dropCount = Math.max(0, Math.floor(dropProgress * dropPoints.length));
  const dropPts = dropPoints.slice(0, dropCount).map(([dx, dy]) => `${cx + dx},${cy + dy}`).join(' ');
  const peakX = cx + risePoints[risePoints.length - 1][0];
  const peakY = cy + risePoints[risePoints.length - 1][1];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOpacity}>
          <text x={540} y={160} style={headline(48, BLACK)} textAnchor="middle">CAUSE #2</text>
          <text x={540} y={230} style={headline(58, RED)} textAnchor="middle">FOMO BUYING</text>
        </g>
        {risePts.length > 1 && <polyline points={risePts} fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        {riseCount >= risePoints.length && (
          <g>
            <rect x={peakX - 70} y={peakY - 80} width={160} height={60} rx={12} fill={GREEN} />
            <text x={peakX + 10} y={peakY - 38} style={headline(34, WHITE)} textAnchor="middle">+40%</text>
          </g>
        )}
        {dropPts.length > 1 && <polyline points={dropPts} fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        <g opacity={personOpacity}>
          <Person x={peakX - 10} y={personY} scale={1.2} color={BLACK} />
          <g opacity={buyOpacity}>
            <rect x={peakX + 20} y={personY - 140} width={140} height={52} rx={10} fill={ACCENT} />
            <text x={peakX + 90} y={personY - 104} style={headline(30, BLACK)} textAnchor="middle">BUY!</text>
          </g>
        </g>
        <g opacity={labelOpacity}>
          <text x={540} y={1480} style={headline(44, RED)} textAnchor="middle">BOUGHT THE TOP</text>
          <text x={540} y={1560} style={headline(36, BLACK)} textAnchor="middle">DOWN BEFORE IT STARTS</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fillFund = interpolate(frame, [25, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const fillYou = interpolate(frame, [40, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const gapOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fundDollars = Math.floor(fillFund * 540);
  const youDollars = Math.floor(fillYou * 200);

  const PiggyBank: React.FC<{ pcx: number; pcy: number; fillRatio: number; color: string; label: string; amount: string }> = ({
    pcx, pcy, fillRatio, color, label, amount,
  }) => {
    const bodyW = 200; const bodyH = 160;
    const clipH = bodyH * fillRatio;
    const clipY = pcy + bodyH / 2 - clipH;
    const clipId = `clip-${label}`;
    return (
      <g>
        <defs>
          <clipPath id={clipId}>
            <rect x={pcx - bodyW / 2} y={clipY} width={bodyW} height={clipH} />
          </clipPath>
        </defs>
        <ellipse cx={pcx} cy={pcy} rx={bodyW / 2} ry={bodyH / 2} fill={WHITE} stroke={color} strokeWidth={6} />
        <ellipse cx={pcx} cy={pcy} rx={bodyW / 2} ry={bodyH / 2} fill={color} clipPath={`url(#${clipId})`} opacity={0.7} />
        <ellipse cx={pcx + bodyW / 2 - 10} cy={pcy + 10} rx={34} ry={26} fill={WHITE} stroke={color} strokeWidth={5} />
        <circle cx={pcx + bodyW / 2 - 20} cy={pcy + 6} r={7} fill={color} />
        <circle cx={pcx + bodyW / 2 + 2} cy={pcy + 14} r={7} fill={color} />
        <ellipse cx={pcx - 50} cy={pcy - bodyH / 2 + 10} rx={26} ry={20} fill={WHITE} stroke={color} strokeWidth={5} />
        <circle cx={pcx + 30} cy={pcy - 30} r={10} fill={color} />
        {([-70, -30, 30, 70] as number[]).map((lx, i) => (
          <rect key={i} x={pcx + lx - 15} y={pcy + bodyH / 2 - 10} width={28} height={50} rx={10} fill={WHITE} stroke={color} strokeWidth={5} />
        ))}
        <rect x={pcx - 20} y={pcy - bodyH / 2 - 12} width={40} height={14} rx={5} fill={color} />
        <text x={pcx} y={pcy + bodyH / 2 + 90} style={headline(34, color)} textAnchor="middle">{label}</text>
        <text x={pcx} y={pcy + bodyH / 2 + 140} style={headline(48, color)} textAnchor="middle">{amount}</text>
      </g>
    );
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOpacity}>
          <text x={540} y={160} style={headline(46, WHITE)} textAnchor="middle">3% SOUNDS SMALL...</text>
          <text x={540} y={240} style={headline(38, ACCENT)} textAnchor="middle">UNTIL YOU SEE THE MATH</text>
        </g>
        <PiggyBank pcx={280} pcy={820} fillRatio={fillFund} color={GREEN} label="FUND" amount={`$${fundDollars}K`} />
        <PiggyBank pcx={780} pcy={820} fillRatio={fillYou} color={ACCENT} label="YOU" amount={`$${youDollars}K`} />
        <text x={540} y={840} style={headline(52, WHITE)} textAnchor="middle">VS</text>
        <g opacity={gapOpacity}>
          <rect x={260} y={1320} width={560} height={100} rx={20} fill={RED} />
          <text x={540} y={1385} style={headline(48, WHITE)} textAnchor="middle">$340K GONE</text>
          <text x={540} y={1480} style={headline(34, WHITE)} textAnchor="middle">OVER 30 YEARS</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const treeGrow = spring({ frame, fps, config: { stiffness: 40, damping: 14 }, from: 0, to: 1, delay: 20 });
  const treeH = treeGrow * 560;
  const personOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const trunkH = Math.min(treeH * 0.35, 180);
  const foliageH = Math.max(0, treeH - trunkH);

  const coinPositions = [
    { x: 380, baseY: 1180, delay: 30 },
    { x: 540, baseY: 1140, delay: 50 },
    { x: 700, baseY: 1160, delay: 45 },
    { x: 450, baseY: 1100, delay: 65 },
    { x: 630, baseY: 1120, delay: 60 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOpacity}>
          <text x={540} y={140} style={headline(44, BLACK)} textAnchor="middle">THE FIX IS SIMPLE</text>
        </g>
        <rect x={510} y={1300 - trunkH} width={60} height={trunkH} rx={12} fill="#8B4513" />
        {foliageH > 0 && (
          <g>
            <polygon
              points={`540,${1300 - trunkH - Math.min(foliageH * 0.45, 200)} ${540 - Math.min(foliageH * 0.3, 200)},${1300 - trunkH} ${540 + Math.min(foliageH * 0.3, 200)},${1300 - trunkH}`}
              fill={GREEN} opacity={0.9}
            />
            {foliageH > 100 && (
              <polygon
                points={`540,${1300 - trunkH - Math.min(foliageH * 0.7, 360)} ${540 - Math.min(foliageH * 0.22, 155)},${1300 - trunkH - Math.min(foliageH * 0.25, 120)} ${540 + Math.min(foliageH * 0.22, 155)},${1300 - trunkH - Math.min(foliageH * 0.25, 120)}`}
                fill={GREEN} opacity={0.95}
              />
            )}
            {foliageH > 250 && (
              <polygon
                points={`540,${1300 - trunkH - Math.min(foliageH, 520)} ${540 - Math.min(foliageH * 0.14, 90)},${1300 - trunkH - Math.min(foliageH * 0.58, 310)} ${540 + Math.min(foliageH * 0.14, 90)},${1300 - trunkH - Math.min(foliageH * 0.58, 310)}`}
                fill={GREEN}
              />
            )}
          </g>
        )}
        {coinPositions.map((c, i) => {
          const coinY = interpolate(frame, [c.delay, c.delay + 80], [c.baseY, c.baseY - 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const coinOpacity = interpolate(frame, [c.delay, c.delay + 20, c.delay + 70, c.delay + 80], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={coinOpacity}>
              <circle cx={c.x} cy={coinY} r={22} fill={ACCENT} />
              <text x={c.x} y={coinY + 10} style={{ fontFamily: FONT, fontSize: 22, fill: BLACK } as React.CSSProperties} textAnchor="middle">$</text>
            </g>
          );
        })}
        <g opacity={personOpacity}>
          <rect x={460} y={1320} width={120} height={14} rx={7} fill="#555" />
          <rect x={456} y={1334} width={14} height={60} rx={6} fill="#555" />
          <rect x={570} y={1334} width={14} height={60} rx={6} fill="#555" />
          <rect x={446} y={1280} width={14} height={54} rx={6} fill="#555" />
          <rect x={580} y={1280} width={14} height={54} rx={6} fill="#555" />
          <circle cx={540} cy={1260} r={36} fill={BLACK} />
          <rect x={508} y={1296} width={64} height={28} rx={8} fill={BLACK} />
        </g>
        <g opacity={statOpacity}>
          <rect x={200} y={1440} width={680} height={130} rx={24} fill={ACCENT} />
          <text x={540} y={1515} style={headline(62, BLACK)} textAnchor="middle">94% WIN RATE</text>
          <text x={540} y={1580} style={headline(30, BLACK)} textAnchor="middle">FOR BUY-AND-HOLD INVESTORS</text>
        </g>
        <g opacity={ctaOpacity}>
          <text x={540} y={1700} style={headline(36, BLACK)} textAnchor="middle">SET IT. FORGET IT. GET RICH.</text>
          <text x={540} y={1780} style={headline(30, GREEN)} textAnchor="middle">FOLLOW FOR MORE MONEY MOVES</text>
        </g>
      </svg>
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
