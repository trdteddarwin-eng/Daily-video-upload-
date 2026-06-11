import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1 — Hook: "$3/Day" reveal
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const subSpring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 90 } });
  const calSpring = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 100 } });

  // Annual counter: $1,095 ticks up starting at frame 60
  const annualCount = Math.floor(
    interpolate(frame, [60, 160], [0, 1095], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const taglineOp = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          {/* Accent bars */}
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          {/* Top label */}
          <text x={540} y={110} fontSize={40} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={6}>THE DAILY PRICE TRICK</text>

          {/* Big "$3/DAY" springs in */}
          <g transform={`translate(540 480) scale(${titleSpring}) translate(-540 -480)`}>
            <text x={540} y={380} fontSize={210} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="900">$3</text>
            <text x={540} y={520} fontSize={90} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">/DAY</text>
          </g>

          {/* "sounds harmless" label */}
          <g transform={`translate(540 660) scale(${subSpring}) translate(-540 -660)`}>
            <text x={540} y={668} fontSize={48} fill={WHITE} textAnchor="middle" fontFamily={FONT}>sounds harmless... right?</text>
          </g>

          {/* Calendar icon */}
          <g transform={`translate(540 920) scale(${calSpring}) translate(-540 -920)`}>
            <rect x={340} y={820} width={400} height={320} rx={30} fill="none" stroke={WHITE} strokeWidth={10} />
            <rect x={340} y={820} width={400} height={80} rx={30} fill={WHITE} />
            <rect x={340} y={870} width={400} height={30} fill={WHITE} />
            <rect x={420} y={780} width={30} height={80} rx={14} fill={ACCENT} />
            <rect x={630} y={780} width={30} height={80} rx={14} fill={ACCENT} />
            {/* Calendar day dots */}
            {[0,1,2,3,4,5,6].map((col) =>
              [0,1,2,3].map((row) => (
                <circle
                  key={`${col}-${row}`}
                  cx={380 + col * 50}
                  cy={970 + row * 52}
                  r={12}
                  fill={col + row * 7 < 22 ? ACCENT : WHITE}
                  opacity={0.7}
                />
              ))
            )}
          </g>

          {/* Annual cost counter */}
          <text x={540} y={1410} fontSize={44} fill={WHITE} textAnchor="middle" fontFamily={FONT}>that's</text>
          <text x={540} y={1520} fontSize={130} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="900">${annualCount.toLocaleString()}</text>
          <text x={540} y={1610} fontSize={50} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">PER YEAR</text>

          {/* Tagline */}
          <text x={540} y={1730} fontSize={42} fill={WHITE} textAnchor="middle" fontFamily={FONT} opacity={taglineOp}>and you've got more than one →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 — Brain trick: daily vs annual framing
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const arrowProgress = interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 100 } });
  const boxSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 90 } });

  const arrowEndX = 240 + arrowProgress * 360;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          <text x={540} y={110} fontSize={40} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={6}>HOW YOUR BRAIN SEES IT</text>

          {/* Brain outline */}
          <g transform={`translate(540 580) scale(${brainSpring}) translate(-540 -580)`}>
            <path
              d="M540 360 C480 355 440 380 430 420 C415 420 400 435 405 455 C390 460 380 480 390 500 C375 505 370 525 380 540 C370 550 370 570 385 580 C385 605 400 620 420 618 C430 635 450 642 470 635 C480 655 500 660 520 652 L540 652 L560 652 C580 660 600 655 610 635 C630 642 650 635 660 618 C680 620 695 605 695 580 C710 570 710 550 700 540 C710 525 705 505 690 500 C700 480 690 460 675 455 C680 435 665 420 650 420 C640 380 600 355 540 360Z"
              fill="none"
              stroke={BLACK}
              strokeWidth={12}
            />
            <path d="M480 440 Q500 430 520 445 Q540 460 560 445 Q580 430 600 440" fill="none" stroke={BLACK} strokeWidth={6} strokeLinecap="round" />
            <path d="M460 495 Q490 478 520 495 Q550 512 580 495 Q610 478 635 495" fill="none" stroke={BLACK} strokeWidth={6} strokeLinecap="round" />
            <path d="M455 548 Q490 530 520 548 Q550 566 585 548 Q615 530 638 548" fill="none" stroke={BLACK} strokeWidth={6} strokeLinecap="round" />
          </g>

          {/* "$3/day" small on left */}
          <text x={130} y={570} fontSize={56} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="bold">$3/day</text>
          <text x={130} y={625} fontSize={36} fill={BLACK} textAnchor="middle" fontFamily={FONT}>feels tiny</text>

          {/* Arrow through brain */}
          <line x1={200} y1={580} x2={arrowEndX} y2={580} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" />
          {arrowProgress > 0.88 && (
            <polygon points={`${arrowEndX},560 ${arrowEndX + 32},580 ${arrowEndX},600`} fill={ACCENT} />
          )}

          {/* "$1,095/year" large on right */}
          <g transform={`translate(900 575) scale(${bigNumSpring}) translate(-900 -575)`}>
            <text x={900} y={545} fontSize={54} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="bold">$1,095</text>
            <text x={900} y={605} fontSize={40} fill={BLACK} textAnchor="middle" fontFamily={FONT}>/year</text>
            <text x={900} y={650} fontSize={32} fill={RED} textAnchor="middle" fontFamily={FONT}>reality</text>
          </g>

          {/* Insight box */}
          <g transform={`translate(540 1260) scale(${boxSpring}) translate(-540 -1260)`}>
            <rect x={80} y={1140} width={920} height={240} rx={24} fill={BLACK} />
            <text x={540} y={1228} fontSize={46} fill={WHITE} textAnchor="middle" fontFamily={FONT}>daily framing is a</text>
            <text x={540} y={1298} fontSize={54} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">PSYCHOLOGICAL WEAPON</text>
            <text x={540} y={1360} fontSize={38} fill={WHITE} textAnchor="middle" fontFamily={FONT} opacity={0.8}>invented to hide the annual price</text>
          </g>

          <text x={540} y={1630} fontSize={42} fill={BLACK} textAnchor="middle" fontFamily={FONT}>and most people have</text>
          <text x={540} y={1705} fontSize={48} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold">six of these →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — Stack 6 subscriptions → $14/day total
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { label: 'Streaming',     daily: 3.0,  icon: 'tv'       },
    { label: 'Gym',           daily: 2.3,  icon: 'gym'      },
    { label: 'Music',         daily: 0.9,  icon: 'music'    },
    { label: 'Cloud Storage', daily: 0.7,  icon: 'cloud'    },
    { label: 'Delivery Pass', daily: 3.3,  icon: 'delivery' },
    { label: 'News App',      daily: 0.8,  icon: 'news'     },
  ];

  const totalSpring = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 10, stiffness: 120 } });
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const runningTotal = interpolate(frame, [170, 220], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>STACK THEM UP</text>
          </g>

          {items.map((item, i) => {
            const itemSpring = spring({ frame: Math.max(0, frame - i * 22), fps, config: { damping: 14, stiffness: 90 } });
            const yBase = 220 + i * 195;
            const cx = 120;
            const cy = yBase + 65;

            let iconEl: React.ReactNode = null;
            if (item.icon === 'tv') {
              iconEl = (
                <g>
                  <rect x={cx - 52} y={cy - 42} width={104} height={70} rx={10} fill="none" stroke={ACCENT} strokeWidth={7} />
                  <rect x={cx - 28} y={cy + 30} width={56} height={12} rx={5} fill={ACCENT} opacity={0.6} />
                  <rect x={cx - 14} y={cy + 42} width={28} height={9} rx={4} fill={ACCENT} opacity={0.4} />
                  <rect x={cx - 32} y={cy - 22} width={64} height={36} rx={4} fill={ACCENT} opacity={0.18} />
                </g>
              );
            } else if (item.icon === 'gym') {
              iconEl = (
                <g>
                  <rect x={cx - 55} y={cy - 8} width={110} height={18} rx={8} fill={ACCENT} opacity={0.8} />
                  <rect x={cx - 70} y={cy - 22} width={18} height={46} rx={8} fill={ACCENT} />
                  <rect x={cx - 90} y={cy - 17} width={24} height={36} rx={8} fill={ACCENT} opacity={0.6} />
                  <rect x={cx + 52} y={cy - 22} width={18} height={46} rx={8} fill={ACCENT} />
                  <rect x={cx + 66} y={cy - 17} width={24} height={36} rx={8} fill={ACCENT} opacity={0.6} />
                </g>
              );
            } else if (item.icon === 'music') {
              iconEl = (
                <g>
                  <ellipse cx={cx - 18} cy={cy + 32} rx={20} ry={13} fill={ACCENT} />
                  <ellipse cx={cx + 26} cy={cy + 22} rx={16} ry={11} fill={ACCENT} opacity={0.7} />
                  <rect x={cx + 2} y={cy - 28} width={7} height={60} rx={3} fill={ACCENT} />
                  <rect x={cx + 43} y={cy - 36} width={7} height={58} rx={3} fill={ACCENT} opacity={0.7} />
                  <rect x={cx + 2} y={cy - 33} width={48} height={10} rx={4} fill={ACCENT} opacity={0.5} />
                </g>
              );
            } else if (item.icon === 'cloud') {
              iconEl = (
                <g>
                  <ellipse cx={cx} cy={cy + 8} rx={50} ry={32} fill={ACCENT} opacity={0.7} />
                  <circle cx={cx - 25} cy={cy - 4} r={26} fill={ACCENT} opacity={0.8} />
                  <circle cx={cx + 18} cy={cy - 12} r={32} fill={ACCENT} />
                  <rect x={cx - 50} y={cy + 8} width={100} height={28} rx={0} fill={ACCENT} opacity={0.7} />
                </g>
              );
            } else if (item.icon === 'delivery') {
              iconEl = (
                <g>
                  <rect x={cx - 50} y={cy - 48} width={100} height={84} rx={10} fill="none" stroke={ACCENT} strokeWidth={7} />
                  <path d={`M${cx - 50} ${cy - 16} L${cx + 50} ${cy - 16}`} stroke={ACCENT} strokeWidth={5} />
                  <circle cx={cx - 26} cy={cy + 42} r={13} fill="none" stroke={ACCENT} strokeWidth={7} />
                  <circle cx={cx + 26} cy={cy + 42} r={13} fill="none" stroke={ACCENT} strokeWidth={7} />
                </g>
              );
            } else {
              iconEl = (
                <g>
                  <rect x={cx - 50} y={cy - 50} width={100} height={124} rx={12} fill="none" stroke={ACCENT} strokeWidth={7} />
                  <rect x={cx - 34} y={cy - 36} width={68} height={7} rx={3} fill={ACCENT} opacity={0.6} />
                  <rect x={cx - 34} y={cy - 20} width={68} height={7} rx={3} fill={ACCENT} opacity={0.5} />
                  <rect x={cx - 34} y={cy - 4} width={52} height={7} rx={3} fill={ACCENT} opacity={0.4} />
                  <rect x={cx - 34} y={cy + 12} width={38} height={7} rx={3} fill={ACCENT} opacity={0.3} />
                </g>
              );
            }

            return (
              <g key={i} transform={`translate(540 ${yBase + 65}) scale(${itemSpring}) translate(-540 -${yBase + 65})`}>
                {iconEl}
                <text x={205} y={yBase + 72} fontSize={42} fill={WHITE} fontFamily={FONT} fontWeight="bold">{item.label}</text>
                <text x={1000} y={yBase + 72} fontSize={46} fill={ACCENT} textAnchor="end" fontFamily={FONT} fontWeight="900">${item.daily.toFixed(1)}/d</text>
                <line x1={80} y1={yBase + 168} x2={1000} y2={yBase + 168} stroke={WHITE} strokeWidth={1} opacity={0.12} />
              </g>
            );
          })}

          {/* Running total */}
          <g transform={`translate(540 1800) scale(${totalSpring}) translate(-540 -1800)`}>
            <rect x={60} y={1730} width={960} height={100} rx={20} fill={ACCENT} />
            <text x={280} y={1793} fontSize={44} fill={BLACK} fontFamily={FONT} fontWeight="bold">TOTAL:</text>
            <text x={760} y={1795} fontSize={64} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">${runningTotal.toFixed(1)}/day</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 — Compound loss: $14/day → $51K over 10 years
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const piggySpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 80 } });

  // Bar chart growing for 10 years
  const chartProgress = interpolate(frame, [60, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumSpring = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 8, stiffness: 100 } });

  // Year values at 7% ($5110/yr): roughly compounded
  const yearValues = [5110, 10581, 16424, 22664, 29323, 36425, 44001, 52083, 60706, 70001];
  const maxVal = 70001;
  const chartH = 420;
  const chartW = 860;
  const barW = Math.floor(chartW / 10) - 8;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>THE REAL PRICE TAG</text>
          </g>

          {/* Piggy bank receiving coins */}
          <g transform={`translate(540 380) scale(${piggySpring}) translate(-540 -380)`}>
            {/* Piggy bank body */}
            <ellipse cx={540} cy={400} rx={175} ry={140} fill="#F9A8D4" />
            {/* Head */}
            <circle cx={700} cy={340} r={80} fill="#F9A8D4" />
            {/* Snout */}
            <ellipse cx={758} cy={362} rx={32} ry={22} fill="#EC4899" />
            <circle cx={748} cy={358} r={7} fill="#9D174D" />
            <circle cx={768} cy={358} r={7} fill="#9D174D" />
            {/* Eye */}
            <circle cx={690} cy={316} r={10} fill={BLACK} />
            <circle cx={693} cy={313} r={4} fill={WHITE} />
            {/* Ear */}
            <ellipse cx={700} cy={265} rx={22} ry={30} fill="#EC4899" />
            {/* Coin slot */}
            <rect x={518} y={268} width={44} height={10} rx={5} fill="#9D174D" />
            {/* Legs */}
            <rect x={420} y={520} width={38} height={70} rx={14} fill="#F9A8D4" />
            <rect x={468} y={520} width={38} height={70} rx={14} fill="#F9A8D4" />
            <rect x={574} y={520} width={38} height={70} rx={14} fill="#F9A8D4" />
            <rect x={622} y={520} width={38} height={70} rx={14} fill="#F9A8D4" />
            {/* Tail */}
            <path d="M366 390 Q330 360 345 330 Q360 300 380 320" fill="none" stroke="#EC4899" strokeWidth={10} strokeLinecap="round" />
            {/* Coin falling */}
            <ellipse
              cx={540}
              cy={interpolate(frame, [30, 70], [200, 268], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              rx={20} ry={10}
              fill={ACCENT}
              opacity={interpolate(frame, [30, 65, 72], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            />
            <text
              x={540}
              y={interpolate(frame, [30, 70], [196, 262], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              fontSize={18} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="bold"
              opacity={interpolate(frame, [30, 65, 72], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            >$</text>
          </g>

          {/* Arrow from piggy to chart */}
          <text x={540} y={660} fontSize={50} fill={ACCENT} textAnchor="middle" fontFamily={FONT}>instead → invested</text>

          {/* Bar chart */}
          {yearValues.map((val, i) => {
            const barH = (val / maxVal) * chartH * Math.min(1, Math.max(0, (chartProgress - i / 10) * 10));
            const xPos = 110 + i * (barW + 8);
            return (
              <g key={i}>
                <rect
                  x={xPos}
                  y={1120 - barH}
                  width={barW}
                  height={barH}
                  rx={6}
                  fill={i === 9 ? GREEN : ACCENT}
                  opacity={0.85}
                />
                <text x={xPos + barW / 2} y={1140} fontSize={24} fill={BLACK} textAnchor="middle" fontFamily={FONT}>{i + 1}yr</text>
              </g>
            );
          })}

          {/* $51K highlight */}
          <g transform={`translate(540 1310) scale(${bigNumSpring}) translate(-540 -1310)`}>
            <text x={540} y={1240} fontSize={58} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="bold">after 10 years =</text>
            <text x={540} y={1380} fontSize={200} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="900">$51K</text>
          </g>

          <text x={540} y={1620} fontSize={40} fill={BLACK} textAnchor="middle" fontFamily={FONT}>gone because each charge</text>
          <text x={540} y={1695} fontSize={44} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="bold">felt like pocket change →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — 68% can't estimate their subscriptions
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const personCount = 10;
  const shadedCount = Math.round(personCount * 0.68);

  const numRevealSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 120 } });
  const shockSpring = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 8, stiffness: 100 } });
  const statOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>THE BLIND SPOT</text>
          </g>

          <text x={540} y={230} fontSize={48} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">of people can't estimate</text>
          <text x={540} y={310} fontSize={46} fill={WHITE} textAnchor="middle" fontFamily={FONT}>their annual sub costs</text>
          <text x={540} y={385} fontSize={42} fill={WHITE} textAnchor="middle" fontFamily={FONT} opacity={0.7}>within $500</text>

          {/* 68% stat */}
          <g transform={`translate(540 580) scale(${numRevealSpring}) translate(-540 -580)`}>
            <text x={540} y={620} fontSize={280} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">68%</text>
          </g>

          {/* Row of person silhouettes */}
          {Array.from({ length: personCount }).map((_, i) => {
            const px = 90 + i * 92;
            const py = 900;
            const isShaded = i < shadedCount;
            const pSpring = spring({ frame: Math.max(0, frame - 20 - i * 12), fps, config: { damping: 14, stiffness: 90 } });
            return (
              <g key={i} transform={`translate(${px} ${py}) scale(${pSpring}) translate(-${px} -${py})`}>
                <circle cx={px} cy={py - 32} r={18} fill={isShaded ? ACCENT : WHITE} opacity={isShaded ? 1 : 0.3} />
                <rect x={px - 14} y={py - 14} width={28} height={42} rx={10} fill={isShaded ? ACCENT : WHITE} opacity={isShaded ? 1 : 0.3} />
                <rect x={px - 8} y={py + 28} width={12} height={30} rx={5} fill={isShaded ? ACCENT : WHITE} opacity={isShaded ? 0.9 : 0.3} />
                <rect x={px + 4} y={py + 28} width={12} height={30} rx={5} fill={isShaded ? ACCENT : WHITE} opacity={isShaded ? 0.9 : 0.3} />
              </g>
            );
          })}

          {/* Real number reveal */}
          <g opacity={statOp}>
            <text x={540} y={1070} fontSize={44} fill={WHITE} textAnchor="middle" fontFamily={FONT}>their real annual cost?</text>
          </g>
          <g transform={`translate(540 1230) scale(${numRevealSpring}) translate(-540 -1230)`}>
            <text x={540} y={1200} fontSize={68} fill={WHITE} textAnchor="middle" fontFamily={FONT} opacity={0.6}>they guessed ~$600</text>
            <text x={540} y={1290} fontSize={90} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="900">real: $5,110</text>
          </g>

          {/* Shocked person */}
          <g transform={`translate(540 1540) scale(${shockSpring}) translate(-540 -1540)`}>
            <circle cx={540} cy={1460} r={65} fill={WHITE} />
            <circle cx={516} cy={1444} r={11} fill={BLACK} />
            <circle cx={564} cy={1444} r={11} fill={BLACK} />
            <ellipse cx={540} cy={1484} rx={22} ry={14} fill={BLACK} />
            <rect x={516} y={1525} width={48} height={100} rx={18} fill={WHITE} />
            <rect x={430} y={1540} width={86} height={22} rx={10} fill={WHITE} transform="rotate(-50 473 551)" />
            <rect x={564} y={1530} width={90} height={22} rx={10} fill={WHITE} transform="rotate(50 609 541)" />
          </g>

          <text x={540} y={1730} fontSize={42} fill={WHITE} textAnchor="middle" fontFamily={FONT}>the daily framing is working</text>
          <text x={540} y={1800} fontSize={44} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold">exactly as designed →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 — CTA: audit your bank statement
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const lineReveal = interpolate(frame, [30, 130], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalSpring = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 10, stiffness: 100 } });
  const ctaSpring = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 80 } });
  const arrowOp = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const charges = [
    { name: 'Netflix',        monthly: 15.49 },
    { name: 'Spotify',        monthly: 10.99 },
    { name: 'iCloud',         monthly: 2.99  },
    { name: 'Amazon Prime',   monthly: 14.99 },
    { name: 'Gym',            monthly: 40.00 },
    { name: 'News App',       monthly: 9.99  },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />

          <text x={540} y={110} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>DO THE MATH</text>
          <text x={540} y={210} fontSize={48} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="bold">open your bank app.</text>
          <text x={540} y={280} fontSize={44} fill={BLACK} textAnchor="middle" fontFamily={FONT}>add every recurring charge.</text>

          {/* Phone silhouette */}
          <g transform={`translate(540 760) scale(${phoneSpring}) translate(-540 -760)`}>
            <rect x={360} y={380} width={360} height={720} rx={40} fill={BLACK} />
            <rect x={375} y={400} width={330} height={680} rx={28} fill="#1E1E1E" />
            <rect x={460} y={385} width={100} height={16} rx={8} fill="#333333" />
            {/* Bank statement lines */}
            {charges.map((c, i) => {
              const visible = i < Math.floor(lineReveal);
              if (!visible) return null;
              const ly = 450 + i * 96;
              return (
                <g key={i}>
                  <rect x={388} y={ly} width={304} height={78} rx={10} fill="#2A2A2A" />
                  <text x={404} y={ly + 34} fontSize={24} fill={WHITE} fontFamily={FONT}>{c.name}</text>
                  <text x={404} y={ly + 64} fontSize={22} fill={ACCENT} fontFamily={FONT}>${c.monthly.toFixed(2)}/mo</text>
                  <rect x={600} y={ly + 18} width={82} height={28} rx={6} fill={RED} opacity={0.9} />
                  <text x={641} y={ly + 37} fontSize={20} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">charge</text>
                </g>
              );
            })}
          </g>

          {/* Annual total */}
          <g transform={`translate(540 1330) scale(${totalSpring}) translate(-540 -1330)`}>
            <rect x={100} y={1260} width={880} height={130} rx={20} fill={BLACK} />
            <text x={540} y={1325} fontSize={42} fill={WHITE} textAnchor="middle" fontFamily={FONT}>annual total:</text>
            <text x={540} y={1378} fontSize={72} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">$1,137 / year</text>
          </g>

          {/* Upward arrow */}
          <g opacity={arrowOp}>
            <line x1={540} y1={1470} x2={540} y2={1530} stroke={GREEN} strokeWidth={8} strokeLinecap="round" />
            <polygon points="510,1490 540,1455 570,1490" fill={GREEN} />
          </g>

          {/* CTA box */}
          <g transform={`translate(540 1680) scale(${ctaSpring}) translate(-540 -1680)`}>
            <rect x={60} y={1600} width={960} height={190} rx={24} fill={ACCENT} />
            <text x={540} y={1672} fontSize={46} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="bold">that number will wake you up</text>
            <text x={540} y={1740} fontSize={38} fill={BLACK} textAnchor="middle" fontFamily={FONT}>share this so someone else wakes up too</text>
          </g>
        </svg>
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
