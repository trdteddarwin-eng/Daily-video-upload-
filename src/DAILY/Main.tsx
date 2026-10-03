import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const BLUE = '#1E3A5C';
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

// ─── Scene 2 & 3 appended below Scene1 ───

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carX = interpolate(frame, [0, 38], [-700, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bubbleOp = interpolate(frame, [50, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagS = spring({ frame: frame - 90, fps: 30, config: { mass: 0.5, damping: 10 } });
  const tagScale = Math.min(tagS, 1.15);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        {/* Title */}
        <g opacity={titleOp}>
          <text x={540} y={155} style={headline(68, ACCENT)} textAnchor="middle">THE MONTHLY</text>
          <text x={540} y={240} style={headline(68, WHITE)} textAnchor="middle">PAYMENT TRAP</text>
        </g>

        {/* Car sliding in from left */}
        <g transform={`translate(${carX}, 0)`}>
          <rect x={100} y={430} width={740} height={175} rx={30} fill={BLUE} />
          <rect x={210} y={300} width={470} height={155} rx={20} fill={BLUE} />
          <rect x={228} y={316} width={172} height={110} rx={10} fill="#87CEEB" opacity={0.72} />
          <rect x={428} y={316} width={172} height={110} rx={10} fill="#87CEEB" opacity={0.72} />
          <circle cx={270} cy={610} r={72} fill="#1A1A1A" />
          <circle cx={270} cy={610} r={48} fill="#2A2A2A" />
          <circle cx={270} cy={610} r={18} fill="#999" />
          <circle cx={720} cy={610} r={72} fill="#1A1A1A" />
          <circle cx={720} cy={610} r={48} fill="#2A2A2A" />
          <circle cx={720} cy={610} r={18} fill="#999" />
          <rect x={100} y={480} width={54} height={26} rx={6} fill="#FFE566" opacity={0.9} />
        </g>

        {/* Salesperson + buyer */}
        <g opacity={bubbleOp}>
          <Person x={820} y={740} scale={1.3} color="#AAAAAA" />
          <Person x={958} y={750} scale={1.15} color="#777777" />
        </g>

        {/* Speech bubble */}
        <g opacity={bubbleOp}>
          <rect x={80} y={855} width={920} height={240} rx={26} fill={WHITE} />
          <text x={540} y={960} style={headline(48, BLACK)} textAnchor="middle">"What monthly payment</text>
          <text x={540} y={1055} style={headline(48, BLACK)} textAnchor="middle">works for you?"</text>
        </g>

        {/* Cost badge springs in */}
        <g transform={`translate(540, 1215) scale(${tagScale})`}>
          <rect x={-450} y={-72} width={900} height={144} rx={22} fill={ACCENT} />
          <text x={0} y={-8} style={headline(44, WHITE)} textAnchor="middle">THIS QUESTION COSTS</text>
          <text x={0} y={58} style={headline(58, WHITE)} textAnchor="middle">YOU $8,700</text>
        </g>

        {/* Price pills: total vs monthly */}
        <g opacity={bubbleOp}>
          <rect x={55} y={1415} width={435} height={155} rx={18} fill="#1E1E1E" />
          <text x={272} y={1466} style={headline(28, "#666")} textAnchor="middle">TOTAL PRICE</text>
          <text x={272} y={1548} style={headline(62, "#555")} textAnchor="middle">$32,500</text>
          <line x1={75} y1={1540} x2={460} y2={1540} stroke="#666" strokeWidth={7} />
          <text x={540} y={1506} style={headline(42, WHITE)} textAnchor="middle">VS</text>
          <rect x={590} y={1415} width={435} height={155} rx={18} fill={ACCENT} />
          <text x={807} y={1466} style={headline(28, WHITE)} textAnchor="middle">MONTHLY</text>
          <text x={807} y={1548} style={headline(62, WHITE)} textAnchor="middle">$399</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainOp = interpolate(frame, [18, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOp = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mS = spring({ frame: frame - 75, fps: 30, config: { mass: 0.5, damping: 9 } });
  const monthlyScale = Math.min(mS, 1.12);
  const arrowOp = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={150} style={headline(54, BLACK)} textAnchor="middle">YOUR BRAIN</text>
          <text x={540} y={228} style={headline(54, ACCENT)} textAnchor="middle">IGNORES THE TOTAL</text>
        </g>

        {/* Brain outline — two lobes */}
        <g opacity={brainOp}>
          <ellipse cx={435} cy={490} rx={148} ry={118} fill="none" stroke="#888" strokeWidth={6} />
          <ellipse cx={605} cy={490} rx={148} ry={118} fill="none" stroke="#888" strokeWidth={6} />
          <path d="M 375 455 Q 395 415 440 440 Q 452 458 432 476" fill="none" stroke="#888" strokeWidth={4} opacity={0.5} />
          <path d="M 648 455 Q 665 415 658 442 Q 648 462 640 478" fill="none" stroke="#888" strokeWidth={4} opacity={0.5} />
          <rect x={500} y={600} width={60} height={68} rx={14} fill="none" stroke="#888" strokeWidth={5} />
          <line x1={516} y1={390} x2={516} y2={598} stroke="#888" strokeWidth={3} strokeDasharray="12 8" opacity={0.4} />
          <circle cx={634} cy={494} r={26} fill={ACCENT} opacity={0.9} />
          <text x={634} y={503} style={{ fontFamily: FONT, fontSize: 26, color: WHITE } as React.CSSProperties} textAnchor="middle">$</text>
        </g>

        {/* Arrows from brain to boxes */}
        <g opacity={arrowOp}>
          <line x1={390} y1={700} x2={285} y2={940} stroke="#AAAAAA" strokeWidth={5} strokeDasharray="16 10" />
          <polygon points="278,962 264,922 306,932" fill="#AAAAAA" />
          <line x1={635} y1={700} x2={762} y2={940} stroke={ACCENT} strokeWidth={7} />
          <polygon points="772,962 752,924 793,928" fill={ACCENT} />
        </g>

        {/* Total price box — faded/struck */}
        <g opacity={totalOp}>
          <rect x={55} y={968} width={440} height={215} rx={18} fill="#DDDDDD" />
          <text x={275} y={1035} style={headline(30, "#999")} textAnchor="middle">TOTAL PRICE</text>
          <text x={275} y={1130} style={headline(66, "#AAA")} textAnchor="middle">$32,500</text>
          <line x1={75} y1={1124} x2={455} y2={1124} stroke="#999" strokeWidth={8} />
          <text x={275} y={1172} style={headline(26, "#AAA")} textAnchor="middle">IGNORED</text>
        </g>

        {/* Monthly box — springs in */}
        <g transform={`translate(790, 1075) scale(${monthlyScale})`}>
          <rect x={-290} y={-125} width={580} height={310} rx={24} fill={ACCENT} />
          <text x={0} y={-50} style={headline(36, WHITE)} textAnchor="middle">MONTHLY</text>
          <text x={0} y={88} style={headline(88, WHITE)} textAnchor="middle">$399</text>
          <text x={0} y={152} style={headline(30, WHITE)} textAnchor="middle">BRAIN FOCUSES HERE</text>
        </g>

        {/* Bottom insight */}
        <g opacity={bottomOp}>
          <rect x={55} y={1360} width={970} height={240} rx={22} fill={BLACK} />
          <text x={540} y={1440} style={headline(42, WHITE)} textAnchor="middle">$399 FEELS SMALL.</text>
          <text x={540} y={1512} style={headline(42, ACCENT)} textAnchor="middle">$32,500 FEELS HUGE.</text>
          <text x={540} y={1578} style={headline(30, WHITE)} textAnchor="middle">DEALERS KNOW THIS. IT'S THE TRAP.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barGrow = interpolate(frame, [22, 115], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const labelOp = interpolate(frame, [118, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffOp = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const base = 1545;
  const barW = 225;
  const principalH = barGrow * 500;
  const int60H = barGrow * 118;
  const int84H = barGrow * 284;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={152} style={headline(54, WHITE)} textAnchor="middle">60 MONTHS</text>
          <text x={540} y={225} style={headline(54, ACCENT)} textAnchor="middle">VS 84 MONTHS</text>
          <text x={540} y={312} style={headline(32, WHITE)} textAnchor="middle">SAME CAR. SAME PRICE. MORE INTEREST.</text>
        </g>

        {/* Legend */}
        <g opacity={labelOp}>
          <rect x={155} y={360} width={46} height={30} rx={5} fill={BLUE} />
          <text x={212} y={382} style={{ fontFamily: FONT, fontSize: 28, color: WHITE } as React.CSSProperties}>PRINCIPAL</text>
          <rect x={565} y={360} width={46} height={30} rx={5} fill={ACCENT} />
          <text x={622} y={382} style={{ fontFamily: FONT, fontSize: 28, color: WHITE } as React.CSSProperties}>INTEREST</text>
        </g>

        {/* 60-month bars (center x=265) */}
        <rect x={153} y={base - principalH} width={barW} height={principalH} rx={12} fill={BLUE} />
        <rect x={153} y={base - principalH - int60H} width={barW} height={int60H} rx={12} fill={ACCENT} />
        <g opacity={labelOp}>
          <text x={265} y={base + 58} style={headline(38, WHITE)} textAnchor="middle">60 MO</text>
          <text x={265} y={base + 114} style={headline(32, '#10B981')} textAnchor="middle">$3,800</text>
          <text x={265} y={base + 158} style={headline(26, WHITE)} textAnchor="middle">INTEREST</text>
          <text x={265} y={base - principalH - int60H - 28} style={headline(32, ACCENT)} textAnchor="middle">$33,800</text>
        </g>

        {/* 84-month bars (center x=817) */}
        <rect x={704} y={base - principalH} width={barW} height={principalH} rx={12} fill={BLUE} />
        <rect x={704} y={base - principalH - int84H} width={barW} height={int84H} rx={12} fill={ACCENT} />
        <g opacity={labelOp}>
          <text x={817} y={base + 58} style={headline(38, WHITE)} textAnchor="middle">84 MO</text>
          <text x={817} y={base + 114} style={headline(32, ACCENT)} textAnchor="middle">$7,000</text>
          <text x={817} y={base + 158} style={headline(26, WHITE)} textAnchor="middle">INTEREST</text>
          <text x={817} y={base - principalH - int84H - 28} style={headline(32, ACCENT)} textAnchor="middle">$37,000</text>
        </g>

        {/* Difference badge */}
        <g opacity={diffOp}>
          <line x1={382} y1={base - principalH - int84H} x2={700} y2={base - principalH - int84H}
            stroke={ACCENT} strokeWidth={4} strokeDasharray="14 7" />
          <g transform={`translate(540, ${base - principalH - int84H - 110})`}>
            <rect x={-178} y={-52} width={356} height={104} rx={18} fill={ACCENT} />
            <text x={0} y={-4} style={headline(48, WHITE)} textAnchor="middle">+$3,200</text>
            <text x={0} y={44} style={headline(26, WHITE)} textAnchor="middle">MORE IN INTEREST</text>
          </g>
        </g>

        <line x1={100} y1={base} x2={980} y2={base} stroke={WHITE} strokeWidth={3} opacity={0.22} />
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carOp = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const loanGrow = interpolate(frame, [42, 112], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const valueGrow = interpolate(frame, [56, 118], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const gapOp = interpolate(frame, [122, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [158, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarW = 750;
  const loanBarW = loanGrow * maxBarW;
  const valueBarW = valueGrow * (maxBarW * 22 / 26);
  const loanDollars = Math.floor(loanGrow * 26000);
  const valueDollars = Math.floor(valueGrow * 22000);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={152} style={headline(52, BLACK)} textAnchor="middle">BY MONTH 18</text>
          <text x={540} y={232} style={headline(52, ACCENT)} textAnchor="middle">YOU'RE UNDERWATER</text>
        </g>

        {/* Car icon */}
        <g opacity={carOp}>
          <rect x={170} y={330} width={620} height={148} rx={26} fill={BLUE} />
          <rect x={258} y={212} width={406} height={138} rx={18} fill={BLUE} />
          <rect x={274} y={226} width={154} height={92} rx={9} fill="#87CEEB" opacity={0.72} />
          <rect x={444} y={226} width={154} height={92} rx={9} fill="#87CEEB" opacity={0.72} />
          <circle cx={268} cy={478} r={62} fill="#1A1A1A" />
          <circle cx={268} cy={478} r={41} fill="#2A2A2A" />
          <circle cx={268} cy={478} r={15} fill="#888" />
          <circle cx={712} cy={478} r={62} fill="#1A1A1A" />
          <circle cx={712} cy={478} r={41} fill="#2A2A2A" />
          <circle cx={712} cy={478} r={15} fill="#888" />
          <rect x={170} y={376} width={48} height={22} rx={5} fill="#FFE566" opacity={0.9} />
          {/* Down arrow on car */}
          <polygon points="540,560 505,515 575,515" fill={ACCENT} opacity={0.85} />
        </g>

        {/* Loan balance bar */}
        <text x={165} y={648} style={headline(32, ACCENT)} textAnchor="start">LOAN BALANCE</text>
        <rect x={165} y={665} width={loanBarW} height={82} rx={12} fill={ACCENT} />
        <text x={165 + loanBarW + 14} y={718} style={headline(42, ACCENT)} textAnchor="start">
          ${loanDollars.toLocaleString()}
        </text>

        {/* Car value bar */}
        <text x={165} y={832} style={headline(32, '#1565C0')} textAnchor="start">CAR VALUE</text>
        <rect x={165} y={848} width={valueBarW} height={82} rx={12} fill="#1565C0" />
        <text x={165 + valueBarW + 14} y={902} style={headline(42, '#1565C0')} textAnchor="start">
          ${valueDollars.toLocaleString()}
        </text>

        {/* Gap bracket */}
        <g opacity={gapOp}>
          <line x1={165 + valueBarW} y1={768} x2={165 + loanBarW} y2={768}
            stroke={ACCENT} strokeWidth={5} strokeDasharray="14 7" />
          <line x1={165 + valueBarW} y1={744} x2={165 + valueBarW} y2={792} stroke={ACCENT} strokeWidth={5} />
          <line x1={165 + loanBarW} y1={744} x2={165 + loanBarW} y2={792} stroke={ACCENT} strokeWidth={5} />
          <g transform={`translate(540, 1020)`}>
            <rect x={-300} y={-72} width={600} height={144} rx={20} fill={ACCENT} />
            <text x={0} y={-12} style={headline(40, WHITE)} textAnchor="middle">UNDERWATER BY</text>
            <text x={0} y={58} style={headline(58, WHITE)} textAnchor="middle">$4,000</text>
          </g>
        </g>

        {/* Bottom label */}
        <g opacity={bottomOp}>
          <rect x={55} y={1250} width={970} height={210} rx={22} fill={BLACK} />
          <text x={540} y={1322} style={headline(38, WHITE)} textAnchor="middle">1 IN 3 NEW CAR BUYERS</text>
          <text x={540} y={1392} style={headline(38, ACCENT)} textAnchor="middle">IS UNDERWATER</text>
          <text x={540} y={1448} style={headline(28, WHITE)} textAnchor="middle">AND ROLLING DEBT INTO THEIR NEXT LOAN</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const receiptOp = interpolate(frame, [22, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = interpolate(frame, [62, 105], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const nS = spring({ frame: frame - 110, fps: 30, config: { mass: 0.5, damping: 9 } });
  const newScale = Math.min(nS, 1.12);
  const bottomOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const arrowX2 = 530 + arrowProg * 430;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={150} style={headline(52, WHITE)} textAnchor="middle">THE TRADE-IN</text>
          <text x={540} y={230} style={headline(52, ACCENT)} textAnchor="middle">CYCLE TRAP</text>
        </g>

        {/* Old car (left, faded) */}
        <g opacity={receiptOp}>
          <g opacity={0.62}>
            <rect x={50} y={308} width={450} height={110} rx={18} fill="#334455" />
            <rect x={118} y={222} width={282} height={100} rx={14} fill="#334455" />
            <rect x={132} y={234} width={102} height={70} rx={7} fill="#87CEEB" opacity={0.5} />
            <rect x={250} y={234} width={102} height={70} rx={7} fill="#87CEEB" opacity={0.5} />
            <circle cx={140} cy={418} r={44} fill="#1A1A1A" />
            <circle cx={140} cy={418} r={28} fill="#2A2A2A" />
            <circle cx={140} cy={418} r={11} fill="#666" />
            <circle cx={420} cy={418} r={44} fill="#1A1A1A" />
            <circle cx={420} cy={418} r={28} fill="#2A2A2A" />
            <circle cx={420} cy={418} r={11} fill="#666" />
          </g>
          <text x={275} y={275} style={headline(28, WHITE)} textAnchor="middle">OLD CAR</text>

          {/* Trade-in receipt */}
          <rect x={50} y={480} width={450} height={360} rx={18} fill="#1C1C1C" />
          <text x={275} y={540} style={headline(28, WHITE)} textAnchor="middle">TRADE-IN VALUE</text>
          <text x={275} y={605} style={headline(50, '#10B981')} textAnchor="middle">$22,000</text>
          <line x1={70} y1={625} x2={480} y2={625} stroke="#333" strokeWidth={2} />
          <text x={275} y={672} style={headline(28, WHITE)} textAnchor="middle">YOU STILL OWE</text>
          <text x={275} y={736} style={headline(50, ACCENT)} textAnchor="middle">$26,000</text>
          <line x1={70} y1={756} x2={480} y2={756} stroke="#444" strokeWidth={3} />
          <rect x={148} y={770} width={254} height={62} rx={12} fill={ACCENT} />
          <text x={275} y={812} style={headline(36, WHITE)} textAnchor="middle">–$4,000</text>
        </g>

        {/* Animated arrow */}
        <line x1={530} y1={650} x2={arrowX2} y2={650} stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
        {arrowProg > 0.88 && (
          <polygon points={`${arrowX2 + 30},650 ${arrowX2 - 6},625 ${arrowX2 - 6},675`} fill={ACCENT} />
        )}
        <g opacity={arrowProg}>
          <rect x={598} y={605} width={268} height={58} rx={10} fill={ACCENT} />
          <text x={732} y={642} style={headline(26, WHITE)} textAnchor="middle">+$4K ROLLED IN</text>
        </g>

        {/* New loan card springs in */}
        <g transform={`translate(840, 680) scale(${newScale})`}>
          <rect x={-218} y={-240} width={436} height={540} rx={20} fill="#162032" stroke={ACCENT} strokeWidth={4} />
          <g opacity={0.7}>
            <rect x={-160} y={-210} width={320} height={80} rx={14} fill={BLUE} />
            <rect x={-100} y={-272} width={200} height={74} rx={10} fill={BLUE} />
            <circle cx={-100} cy={-132} r={28} fill="#1A1A1A" />
            <circle cx={100} cy={-132} r={28} fill="#1A1A1A" />
          </g>
          <text x={0} y={-54} style={headline(24, WHITE)} textAnchor="middle">NEW CAR LOAN</text>
          <text x={0} y={12} style={headline(28, WHITE)} textAnchor="middle">CAR PRICE</text>
          <text x={0} y={70} style={headline(44, WHITE)} textAnchor="middle">$30,000</text>
          <text x={0} y={130} style={headline(28, ACCENT)} textAnchor="middle">+ ROLLED DEBT</text>
          <text x={0} y={186} style={headline(44, ACCENT)} textAnchor="middle">$4,000</text>
          <line x1={-178} y1={208} x2={178} y2={208} stroke={ACCENT} strokeWidth={3} />
          <rect x={-178} y={218} width={356} height={68} rx={12} fill={ACCENT} />
          <text x={0} y={262} style={headline(46, WHITE)} textAnchor="middle">$34,000</text>
        </g>

        {/* Bottom */}
        <g opacity={bottomOp}>
          <rect x={55} y={1540} width={970} height={195} rx={22} fill="#1A0000" />
          <text x={540} y={1612} style={headline(38, WHITE)} textAnchor="middle">MOST PEOPLE DO THIS</text>
          <text x={540} y={1682} style={headline(40, ACCENT)} textAnchor="middle">6–8 TIMES IN THEIR LIFE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wrongOp = interpolate(frame, [22, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rS = spring({ frame: frame - 65, fps: 30, config: { mass: 0.5, damping: 9 } });
  const rightScale = Math.min(rS, 1.12);
  const savingsVal = interpolate(frame, [92, 188], [0, 8700], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const ctaOp = interpolate(frame, [168, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savings = Math.floor(savingsVal);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={150} style={headline(56, BLACK)} textAnchor="middle">THE $8,700 FIX</text>
          <text x={540} y={228} style={headline(40, ACCENT)} textAnchor="middle">ONE QUESTION CHANGES EVERYTHING</text>
        </g>

        {/* Wrong question */}
        <g opacity={wrongOp}>
          <rect x={55} y={308} width={970} height={200} rx={20} fill="#DDDDDD" />
          <circle cx={140} cy={408} r={52} fill="#CC0000" />
          <line x1={113} y1={380} x2={167} y2={436} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          <line x1={167} y1={380} x2={113} y2={436} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          <text x={586} y={386} style={headline(30, '#888')} textAnchor="middle">WRONG QUESTION:</text>
          <text x={586} y={462} style={headline(38, BLACK)} textAnchor="middle">"What's my monthly?"</text>
          <line x1={272} y1={458} x2={922} y2={458} stroke={ACCENT} strokeWidth={7} />
        </g>

        {/* Right question springs in */}
        <g transform={`translate(540, 750) scale(${rightScale})`}>
          <rect x={-490} y={-158} width={980} height={316} rx={26} fill={BLACK} />
          <circle cx={-370} cy={0} r={58} fill="#10B981" />
          <polyline points="-400,-12 -372,24 -318,-34"
            fill="none" stroke={WHITE} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
          <text x={60} y={-38} style={headline(32, '#AAA')} textAnchor="middle">ASK THIS INSTEAD:</text>
          <text x={60} y={58} style={headline(46, WHITE)} textAnchor="middle">"What's the TOTAL price?"</text>
        </g>

        {/* Savings counter */}
        <rect x={90} y={1068} width={900} height={228} rx={26} fill={ACCENT} />
        <text x={540} y={1148} style={headline(44, WHITE)} textAnchor="middle">YOU SAVE UP TO</text>
        <text x={540} y={1262} style={headline(90, WHITE)} textAnchor="middle">
          ${savings.toLocaleString()}
        </text>

        {/* CTA */}
        <g opacity={ctaOp}>
          <rect x={55} y={1390} width={970} height={188} rx={22} fill={BLACK} />
          <text x={540} y={1462} style={headline(40, WHITE)} textAnchor="middle">FOLLOW FOR MORE</text>
          <text x={540} y={1538} style={headline(40, ACCENT)} textAnchor="middle">MONEY TRAPS TO AVOID</text>

          {/* Row of person icons */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Person key={i} x={190 + i * 165} y={1740} scale={0.95} color={i < 3 ? ACCENT : WHITE} />
          ))}
        </g>
      </svg>
    </FadeScene>
  );
};

export default function DAILY() {
  void useVideoConfig;
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
