import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.3,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Car SVG (side view: body + wheels + windows)
const CarSVG: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = '#6B7280' }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    {/* Body */}
    <rect x="-130" y="-40" width="260" height="80" rx="18" fill={color} />
    {/* Roof */}
    <rect x="-80" y="-90" width="160" height="56" rx="14" fill={color} />
    {/* Windshield */}
    <rect x="-65" y="-85" width="60" height="48" rx="8" fill="#93C5FD" opacity="0.7" />
    {/* Rear window */}
    <rect x="10" y="-85" width="55" height="48" rx="8" fill="#93C5FD" opacity="0.7" />
    {/* Front wheel */}
    <circle cx="80" cy="44" r="30" fill="#1F2937" />
    <circle cx="80" cy="44" r="18" fill="#9CA3AF" />
    <circle cx="80" cy="44" r="6" fill="#374151" />
    {/* Rear wheel */}
    <circle cx="-80" cy="44" r="30" fill="#1F2937" />
    <circle cx="-80" cy="44" r="18" fill="#9CA3AF" />
    <circle cx="-80" cy="44" r="6" fill="#374151" />
    {/* Headlight */}
    <ellipse cx="128" cy="-5" rx="10" ry="16" fill="#FCD34D" opacity="0.8" />
    {/* Grill */}
    <rect x="118" y="-12" width="18" height="6" rx="3" fill="#374151" />
    <rect x="118" y="0" width="18" height="6" rx="3" fill="#374151" />
  </g>
);

// Dealership building SVG
const DealershipSVG: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <rect x="-160" y="-120" width="320" height="160" fill="#1F2937" />
    <rect x="-160" y="-120" width="320" height="36" fill={ACCENT} />
    <text x="0" y="-92" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={WHITE} letterSpacing="0.1em">AUTO DEALER</text>
    <rect x="-100" y="-50" width="80" height="90" rx="4" fill="#93C5FD" opacity="0.4" />
    <rect x="20" y="-50" width="80" height="90" rx="4" fill="#93C5FD" opacity="0.4" />
    <rect x="-20" y="-20" width="40" height="60" rx="4" fill="#374151" />
  </g>
);

// Piggy bank SVG
const PiggyBank: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = '#F9A8D4' }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <ellipse cx="0" cy="0" rx="90" ry="75" fill={color} />
    <circle cx="65" cy="-35" r="28" fill={color} />
    <rect x="-10" y="55" width="20" height="35" rx="6" fill={color} />
    <rect x="30" y="55" width="20" height="35" rx="6" fill={color} />
    <rect x="-50" y="55" width="20" height="35" rx="6" fill={color} />
    <ellipse cx="78" cy="-38" rx="8" ry="6" fill="#F3E8FF" />
    <rect x="-75" y="-8" width="18" height="8" rx="4" fill={color} />
    <rect x="-40" y="-55" width="30" height="10" rx="4" fill="#9CA3AF" />
  </g>
);

// Scene 1: Car rolls off lot, bills fly off, -$9,600 counter
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const carX = interpolate(frame, [0, 80], [-200, 400], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const dealerScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const counterVal = interpolate(frame, [50, 160], [0, 9600], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const counterOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });

  // Dollar bills flying off (seeded positions)
  const billData = [
    { ox: 0, oy: -30, vx: 60, vy: -80, delay: 50 },
    { ox: 40, oy: -20, vx: 100, vy: -60, delay: 60 },
    { ox: -20, oy: -10, vx: -40, vy: -90, delay: 55 },
    { ox: 80, oy: -40, vx: 140, vy: -50, delay: 65 },
    { ox: -60, oy: -30, vx: -80, vy: -70, delay: 70 },
    { ox: 120, oy: 0, vx: 160, vy: -40, delay: 75 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="54" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>DROVE OFF</text>
        <text x="540" y="280" textAnchor="middle" fontFamily={FONT} fontSize="54" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>THE LOT?</text>

        {/* Road */}
        <rect x="0" y="1100" width="1080" height="40" fill="#374151" />
        <rect x="0" y="1112" width="1080" height="6" fill="#9CA3AF" opacity="0.4" />
        {[0, 180, 360, 540, 720, 900].map((lx, i) => (
          <rect key={i} x={lx + (frame * 4 % 180)} y="1128" width="100" height="8" rx="4" fill="#FCD34D" opacity="0.6" />
        ))}

        {/* Dealership */}
        <g transform={`translate(200, 1000) scale(${dealerScale})`}>
          <DealershipSVG x={0} y={0} scale={1} />
        </g>

        {/* Car moving right */}
        <g transform={`translate(${carX}, 1060)`}>
          <CarSVG x={0} y={0} scale={1.6} color="#3B82F6" />
        </g>

        {/* Dollar bills flying off */}
        {billData.map((b, i) => {
          const elapsed = Math.max(0, frame - b.delay);
          const bx = carX + b.ox + b.vx * elapsed * 0.04;
          const by = 1060 + b.oy + b.vy * elapsed * 0.04 - 4 * elapsed * elapsed * 0.002;
          const bop = interpolate(frame, [b.delay, b.delay + 10, b.delay + 60, b.delay + 80], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={bop} transform={`rotate(${elapsed * 3}, ${bx + 25}, ${by + 15})`}>
              <rect x={bx} y={by} width="50" height="26" rx="5" fill="#22C55E" />
              <text x={bx + 25} y={by + 17} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={WHITE}>$$$</text>
            </g>
          );
        })}

        {/* -$9,600 counter */}
        <g opacity={counterOpacity}>
          <text x="540" y="1350" textAnchor="middle" fontFamily={FONT} fontSize="110" fill="#EF4444"
            letterSpacing="0.05em">-${Math.floor(counterVal).toLocaleString()}</text>
          <text x="540" y="1450" textAnchor="middle" fontFamily={FONT} fontSize="40" fill={WHITE}
            letterSpacing="0.1em">INSTANTLY</text>
        </g>

        <text x="540" y="1620" textAnchor="middle" fontFamily={FONT} fontSize="34" fill="#9CA3AF"
          letterSpacing="0.08em"
          opacity={interpolate(frame, [140, 165], [0, 1], { extrapolateRight: 'clamp' })}>
          HERE'S THE MATH
        </text>
      </svg>
    </FadeScene>
  );
};

// Scene 2: $48K car, 20% slice cut out, $9,600 GONE label — light background
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const carScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const sliceReveal = interpolate(frame, [40, 130], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const labelOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 180 } });

  // 20% of $48K = $9,600
  const barTotalW = 700;
  const depreciationW = barTotalW * 0.20 * sliceReveal;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="180" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>20% GONE</text>
        <text x="540" y="260" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>IN YEAR ONE</text>

        {/* Car */}
        <g transform={`translate(540, 700) scale(${carScale * 2.0})`}>
          <CarSVG x={0} y={0} scale={1} color="#3B82F6" />
        </g>

        {/* Price tag */}
        <g opacity={titleOpacity}>
          <rect x="360" y="840" width="360" height="70" rx="14" fill={BLACK} />
          <text x="540" y="886" textAnchor="middle" fontFamily={FONT} fontSize="40" fill={WHITE}
            letterSpacing="0.08em">$48,000</text>
        </g>

        {/* Value bar */}
        <rect x="190" y="1020" width={barTotalW} height="60" rx="10" fill="#D1D5DB" />
        <rect x="190" y="1020" width={depreciationW} height="60" rx="10" fill="#EF4444" />
        <text x="190" y="1110" fontFamily={FONT} fontSize="26" fill="#EF4444" opacity={sliceReveal > 0.1 ? 1 : 0}>
          20% LOST
        </text>
        <text x="890" y="1110" textAnchor="end" fontFamily={FONT} fontSize="26" fill={BLACK} opacity={titleOpacity}>
          $48K VALUE
        </text>

        {/* $9,600 GONE stamp */}
        <g transform={`translate(540, 1350) scale(${labelScale})`} opacity={labelOpacity}>
          <rect x="-240" y="-80" width="480" height="160" rx="20" fill={ACCENT} />
          <text x="0" y="-12" textAnchor="middle" fontFamily={FONT} fontSize="48" fill={WHITE}
            letterSpacing="0.1em">$9,600</text>
          <text x="0" y="52" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={WHITE}
            letterSpacing="0.1em">VANISHED</text>
        </g>

        <text x="540" y="1620" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          letterSpacing="0.08em" opacity={labelOpacity}>
          BEFORE YOUR FIRST OIL CHANGE
        </text>
      </svg>
    </FadeScene>
  );
};

// Scene 3: Timeline Year 0→3, value bar shrinking, $24K loss — dark background
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const lineReveal = interpolate(frame, [20, 120], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const finalOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateRight: 'clamp' });
  const finalScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 160 } });

  const timelineY = 1100;
  const timelineLeft = 120;
  const timelineRight = 960;
  const timelineW = timelineRight - timelineLeft;

  // Value at each year: $48K, $38.4K, $32K, $24K
  const years = [
    { label: 'YR 0', value: 48000, x: timelineLeft },
    { label: 'YR 1', value: 38400, x: timelineLeft + timelineW * 0.33 },
    { label: 'YR 2', value: 32000, x: timelineLeft + timelineW * 0.66 },
    { label: 'YR 3', value: 24000, x: timelineRight },
  ];

  const maxBarH = 380;
  const maxVal = 48000;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="180" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>BY YEAR 3</text>
        <text x="540" y="260" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>HALF IS GONE</text>

        {/* Timeline baseline */}
        <line x1={timelineLeft} y1={timelineY} x2={timelineRight} y2={timelineY}
          stroke="#4B5563" strokeWidth="4"
          opacity={lineReveal} />

        {/* Bars and labels */}
        {years.map((yr, i) => {
          const barH = (yr.value / maxVal) * maxBarH;
          const delay = i * 20;
          const barReveal = interpolate(frame, [20 + delay, 60 + delay], [0, 1], { extrapolateRight: 'clamp' });
          const isLost = i > 0;
          return (
            <g key={i}>
              {/* Bar */}
              <rect
                x={yr.x - 50}
                y={timelineY - barH * barReveal}
                width="100"
                height={barH * barReveal}
                rx="6"
                fill={i === 0 ? '#10B981' : ACCENT}
                opacity={0.85}
              />
              {/* Year label */}
              <text x={yr.x} y={timelineY + 44} textAnchor="middle" fontFamily={FONT} fontSize="28"
                fill={WHITE} opacity={barReveal}>{yr.label}</text>
              {/* Value label */}
              <text x={yr.x} y={timelineY - barH * barReveal - 16} textAnchor="middle" fontFamily={FONT}
                fontSize="24" fill={i === 0 ? '#10B981' : '#FCA5A5'} opacity={barReveal}>
                ${(yr.value / 1000).toFixed(0)}K
              </text>
            </g>
          );
        })}

        {/* Red shading between yr0 bar top and yr3 bar top */}
        <rect x={timelineLeft - 50} y={timelineY - maxBarH} width={timelineW + 100} height={maxBarH - (24000 / maxVal) * maxBarH}
          fill="#EF4444" opacity={lineReveal * 0.12} />

        {/* $24,000 EVAPORATED */}
        <g transform={`translate(540, 1560) scale(${finalScale})`} opacity={finalOpacity}>
          <rect x="-260" y="-70" width="520" height="130" rx="18" fill="none" stroke={ACCENT} strokeWidth="10" />
          <text x="0" y="-6" textAnchor="middle" fontFamily={FONT} fontSize="48" fill={ACCENT}
            letterSpacing="0.08em">$24,000</text>
          <text x="0" y="52" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE}
            letterSpacing="0.1em">EVAPORATED</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 4: Two cars side-by-side, NEW $48K vs CPO $37K, SAVE $11K — light background
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const leftScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const rightScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const badgeScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [100, 118], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="180" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>THE FLIP SIDE</text>

        {/* Left: NEW car */}
        <g transform={`translate(260, 800) scale(${leftScale * 1.3})`}>
          <CarSVG x={0} y={0} scale={1} color="#3B82F6" />
        </g>
        <text x="260" y="960" textAnchor="middle" fontFamily={FONT} fontSize="32" fill={BLACK}
          letterSpacing="0.06em" opacity={titleOpacity}>NEW</text>
        <rect x="100" y="980" width="320" height="60" rx="12" fill="#EF4444" opacity={titleOpacity} />
        <text x="260" y="1020" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE}
          letterSpacing="0.08em" opacity={titleOpacity}>$48,000</text>

        {/* Divider */}
        <line x1="540" y1="600" x2="540" y2="1200" stroke="#D1D5DB" strokeWidth="3" />

        {/* Right: CPO car */}
        <g transform={`translate(820, 800) scale(${rightScale * 1.3})`}>
          <CarSVG x={0} y={0} scale={1} color="#10B981" />
        </g>
        <text x="820" y="960" textAnchor="middle" fontFamily={FONT} fontSize="32" fill={BLACK}
          letterSpacing="0.06em" opacity={titleOpacity}>CPO 2-YR</text>
        <rect x="660" y="980" width="320" height="60" rx="12" fill="#10B981" opacity={titleOpacity} />
        <text x="820" y="1020" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE}
          letterSpacing="0.08em" opacity={titleOpacity}>$37,000</text>

        {/* Green checkmark on right */}
        <g opacity={interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' })}>
          <circle cx="820" cy="1100" r="36" fill="#10B981" />
          <path d="M 800 1100 L 815 1118 L 840 1085" stroke={WHITE} strokeWidth="7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Red X on left */}
        <g opacity={interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' })}>
          <circle cx="260" cy="1100" r="36" fill="#EF4444" />
          <line x1="242" y1="1082" x2="278" y2="1118" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
          <line x1="278" y1="1082" x2="242" y2="1118" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* SAVE $11K badge */}
        <g transform={`translate(540, 1380) scale(${badgeScale})`} opacity={badgeOpacity}>
          <rect x="-240" y="-70" width="480" height="140" rx="20" fill={ACCENT} />
          <text x="0" y="-6" textAnchor="middle" fontFamily={FONT} fontSize="48" fill={WHITE}
            letterSpacing="0.1em">SAVE $11K</text>
          <text x="0" y="52" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={WHITE}
            letterSpacing="0.1em">UPFRONT</text>
        </g>

        <text x="540" y="1610" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          letterSpacing="0.06em" opacity={badgeOpacity}>SOMEONE ELSE TOOK THE HIT</text>
      </svg>
    </FadeScene>
  );
};

// Scene 5: 5 cars lifetime, counter to $80K+, retirement piggy — dark background
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const counterVal = interpolate(frame, [60, 180], [0, 80000], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const counterOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 12, stiffness: 100 } });

  const numCars = 5;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="180" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>BUY NEW</text>
        <text x="540" y="260" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>5 TIMES IN LIFE?</text>

        {/* 5 cars in a row with money stacks draining */}
        {Array(Math.max(0, Math.floor(numCars))).fill(0).map((_, i) => {
          const cx = 130 + i * 170;
          const delay = 10 + i * 18;
          const carOp = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });
          const stackH = interpolate(frame, [delay + 20, delay + 60], [0, 80], { extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={carOp}>
              <g transform={`translate(${cx}, 700) scale(0.85)`}>
                <CarSVG x={0} y={0} scale={1} color="#6B7280" />
              </g>
              {/* Money stack draining below */}
              <rect x={cx - 30} y={760} width="60" height={stackH} rx="6" fill="#EF4444" opacity="0.8" />
              <text x={cx} y={760 + stackH + 24} textAnchor="middle" fontFamily={FONT} fontSize="20" fill="#FCA5A5">
                -$16K
              </text>
            </g>
          );
        })}

        {/* Total counter */}
        <text x="540" y="1100" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={WHITE}
          letterSpacing="0.08em" opacity={counterOpacity}>TOTAL DEPRECIATION LOST:</text>
        <text x="540" y="1220" textAnchor="middle" fontFamily={FONT} fontSize="110" fill={ACCENT}
          letterSpacing="0.05em" opacity={counterOpacity}>
          ${Math.floor(counterVal / 1000)}K+
        </text>

        {/* Retirement piggy comparison */}
        <g transform={`translate(540, 1480) scale(${piggyScale * 1.8})`}>
          <PiggyBank x={0} y={0} scale={1} color="#6EE7B7" />
        </g>
        <text x="540" y="1700" textAnchor="middle" fontFamily={FONT} fontSize="34" fill="#6EE7B7"
          letterSpacing="0.08em"
          opacity={interpolate(frame, [130, 155], [0, 1], { extrapolateRight: 'clamp' })}>
          THAT'S A RETIREMENT ACCOUNT
        </text>
      </svg>
    </FadeScene>
  );
};

// Scene 6: Two paths — BUY NEW (shrinking wallet) vs BUY 2-YR USED (growing piggy), CTA — light bg
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const leftCarScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const rightCarScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 100 } });

  // Left wallet shrinks over time
  const walletScale = interpolate(frame, [0, dur - 30], [1.0, 0.4], { extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  // Right piggy grows
  const piggyGrow = interpolate(frame, [0, dur - 30], [0.8, 2.0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  const ctaScale = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 200 } });
  const ctaOpacity = interpolate(frame, [120, 145], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {/* Title */}
        <text x="540" y="160" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>THE RULE:</text>
        <text x="540" y="250" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>ALWAYS BUY 2-3 YRS USED</text>

        {/* Left path: BUY NEW */}
        <text x="260" y="420" textAnchor="middle" fontFamily={FONT} fontSize="32" fill="#EF4444"
          letterSpacing="0.06em" opacity={titleOpacity}>BUY NEW</text>
        <line x1="260" y1="440" x2="260" y2="1300" stroke="#EF4444" strokeWidth="4" strokeDasharray="16 8" opacity="0.5" />
        <g transform={`translate(260, 760) scale(${leftCarScale * 1.1})`}>
          <CarSVG x={0} y={0} scale={1} color="#9CA3AF" />
        </g>
        {/* Shrinking wallet below */}
        <g transform={`translate(260, 1060) scale(${walletScale})`}>
          <rect x="-60" y="-40" width="120" height="80" rx="12" fill="none" stroke="#EF4444" strokeWidth="6" />
          <path d="M-60 -8 Q 0 -28 60 -8" stroke="#EF4444" strokeWidth="5" fill="none" />
          <circle cx="36" cy="16" r="10" fill="none" stroke="#EF4444" strokeWidth="4" />
        </g>
        <text x="260" y="1200" textAnchor="middle" fontFamily={FONT} fontSize="26" fill="#EF4444"
          letterSpacing="0.04em" opacity={titleOpacity}>WALLET SHRINKS</text>

        {/* Divider */}
        <line x1="540" y1="380" x2="540" y2="1320" stroke="#D1D5DB" strokeWidth="3" />

        {/* Right path: BUY USED */}
        <text x="820" y="420" textAnchor="middle" fontFamily={FONT} fontSize="32" fill="#10B981"
          letterSpacing="0.06em" opacity={titleOpacity}>BUY USED</text>
        <line x1="820" y1="440" x2="820" y2="1300" stroke="#10B981" strokeWidth="4" strokeDasharray="16 8" opacity="0.5" />
        <g transform={`translate(820, 760) scale(${rightCarScale * 1.1})`}>
          <CarSVG x={0} y={0} scale={1} color="#10B981" />
        </g>
        {/* Growing piggy bank */}
        <g transform={`translate(820, 1060) scale(${piggyGrow * 0.7})`}>
          <PiggyBank x={0} y={0} scale={1} color="#6EE7B7" />
        </g>
        <text x="820" y="1200" textAnchor="middle" fontFamily={FONT} fontSize="26" fill="#10B981"
          letterSpacing="0.04em" opacity={titleOpacity}>WEALTH GROWS</text>

        {/* CTA */}
        <g transform={`translate(540, 1500) scale(${ctaScale})`} opacity={ctaOpacity}>
          <rect x="-340" y="-80" width="680" height="160" rx="22" fill={ACCENT} />
          <text x="0" y="-12" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE}
            letterSpacing="0.1em">SAVE $80K+</text>
          <text x="0" y="56" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE}
            letterSpacing="0.08em">OVER YOUR LIFETIME</text>
        </g>

        <text x="540" y="1730" textAnchor="middle" fontFamily={FONT} fontSize="28" fill="#6B7280"
          letterSpacing="0.06em" opacity={ctaOpacity}>LET SOMEONE ELSE PAY THE TAX</text>
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
