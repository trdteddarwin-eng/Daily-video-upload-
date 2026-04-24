import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

const PersonSVG: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = '#F5F5F5' }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <circle cx="0" cy="-90" r="36" fill={color} />
    <rect x="-28" y="-54" width="56" height="80" rx="14" fill={color} />
    <rect x="-38" y="26" width="26" height="70" rx="10" fill={color} />
    <rect x="12" y="26" width="26" height="70" rx="10" fill={color} />
  </g>
);

const MoneyBag: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = '#10B981' }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <ellipse cx="0" cy="20" rx="70" ry="80" fill={color} />
    <ellipse cx="0" cy="-52" rx="28" ry="16" fill={color} />
    <rect x="-14" y="-72" width="28" height="24" rx="6" fill="#9CA3AF" />
    <text x="0" y="36" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE}>$</text>
  </g>
);

const PiggyBank: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = '#6EE7B7' }) => (
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const bagScale = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 100 } });

  const pulseOpacity = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.6, 1.0, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const questionOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const returnOpacity = interpolate(frame, [70, 95], [0, 1], { extrapolateRight: 'clamp' });
  const returnScale = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 180 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="210" textAnchor="middle" fontFamily={FONT} fontSize="58" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>FREE MONEY.</text>
        <text x="540" y="300" textAnchor="middle" fontFamily={FONT} fontSize="48" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>MOST PEOPLE SAY NO.</text>

        <g transform={`translate(300, 900) scale(${personScale * 2.0})`}>
          <PersonSVG x={0} y={0} color={WHITE} />
        </g>
        <text x="300" y="600" textAnchor="middle" fontFamily={FONT} fontSize="120" fill="#EF4444"
          opacity={questionOpacity}>?</text>

        <g transform={`translate(760, 860) scale(${bagScale * 1.8})`}>
          <MoneyBag x={0} y={0} color={ACCENT} />
        </g>
        <text x="760" y="1070" textAnchor="middle" fontFamily={FONT} fontSize="46" fill={ACCENT}
          opacity={bagScale > 0.5 ? 1 : 0} letterSpacing="0.05em">$2,820</text>
        <text x="760" y="1120" textAnchor="middle" fontFamily={FONT} fontSize="30" fill="#6EE7B7"
          opacity={bagScale > 0.5 ? 1 : 0} letterSpacing="0.08em">PER YEAR FREE</text>

        <circle cx="760" cy="860" r="140" fill="none" stroke={ACCENT} strokeWidth="6"
          opacity={pulseOpacity * 0.5} />

        <g transform={`translate(540, 1380) scale(${returnScale})`} opacity={returnOpacity}>
          <rect x="-280" y="-70" width="560" height="140" rx="20" fill={ACCENT} />
          <text x="0" y="-6" textAnchor="middle" fontFamily={FONT} fontSize="58" fill={WHITE}
            letterSpacing="0.1em">100% RETURN</text>
          <text x="0" y="54" textAnchor="middle" fontFamily={FONT} fontSize="34" fill={WHITE}
            letterSpacing="0.1em">GUARANTEED</text>
        </g>

        <text x="540" y="1620" textAnchor="middle" fontFamily={FONT} fontSize="32" fill="#9CA3AF"
          letterSpacing="0.08em"
          opacity={interpolate(frame, [140, 165], [0, 1], { extrapolateRight: 'clamp' })}>
          HERE'S HOW IT WORKS
        </text>
      </svg>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const yourBarH = interpolate(frame, [20, 90], [0, 280], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const empBarH = interpolate(frame, [60, 140], [0, 280], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const badgeScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' });

  const barBaseY = 1200;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>THE MATCH</text>
        <text x="540" y="290" textAnchor="middle" fontFamily={FONT} fontSize="42" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>EXPLAINED IN 10 SECONDS</text>

        <rect x="160" y={barBaseY - yourBarH} width="280" height={yourBarH} rx="12" fill="#6B7280" />
        <text x="300" y={barBaseY + 50} textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          opacity={titleOpacity}>YOUR</text>
        <text x="300" y={barBaseY + 88} textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          opacity={titleOpacity}>MONEY</text>
        <text x="300" y={barBaseY - yourBarH - 20} textAnchor="middle" fontFamily={FONT} fontSize="36"
          fill="#6B7280" opacity={yourBarH > 20 ? 1 : 0}>$2,820</text>

        <rect x="640" y={barBaseY - empBarH} width="280" height={empBarH} rx="12" fill={ACCENT} />
        <text x="780" y={barBaseY + 50} textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          opacity={labelOpacity}>EMPLOYER</text>
        <text x="780" y={barBaseY + 88} textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK}
          opacity={labelOpacity}>MATCH</text>
        <text x="780" y={barBaseY - empBarH - 20} textAnchor="middle" fontFamily={FONT} fontSize="36"
          fill={ACCENT} opacity={empBarH > 20 ? 1 : 0}>$2,820</text>

        <text x="540" y={barBaseY - 100} textAnchor="middle" fontFamily={FONT} fontSize="80" fill={BLACK}
          opacity={labelOpacity}>+</text>

        <text x="540" y={barBaseY + 160} textAnchor="middle" fontFamily={FONT} fontSize="38" fill={BLACK}
          letterSpacing="0.08em" opacity={badgeOpacity}>= $5,640 TOTAL</text>

        <g transform={`translate(540, 1630) scale(${badgeScale})`} opacity={badgeOpacity}>
          <rect x="-300" y="-64" width="600" height="128" rx="20" fill={ACCENT} />
          <text x="0" y="-4" textAnchor="middle" fontFamily={FONT} fontSize="46" fill={WHITE}
            letterSpacing="0.1em">100% INSTANT RETURN</text>
          <text x="0" y="52" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={WHITE}
            letterSpacing="0.1em">BEFORE MARKET MOVES</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const barReveal = interpolate(frame, [20, 100], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const sliceReveal = interpolate(frame, [80, 160], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const stampScale = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 8, stiffness: 220 } });
  const stampOpacity = interpolate(frame, [140, 158], [0, 1], { extrapolateRight: 'clamp' });

  const totalBarW = 740;
  const matchSliceW = totalBarW * 0.047 * sliceReveal;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="210" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>ON A $60K SALARY</text>
        <text x="540" y="300" textAnchor="middle" fontFamily={FONT} fontSize="42" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>THE MATH IS WILD</text>

        <rect x="170" y="900" width={totalBarW * barReveal} height="80" rx="12" fill="#374151" />
        <rect x="170" y="900" width={matchSliceW} height="80" rx="12" fill={ACCENT} />

        <text x="170" y="1020" fontFamily={FONT} fontSize="28" fill="#9CA3AF"
          opacity={barReveal > 0.1 ? 1 : 0}>$60,000 SALARY</text>
        <text x="170" y="1060" fontFamily={FONT} fontSize="24" fill={ACCENT}
          opacity={sliceReveal > 0.3 ? 1 : 0}>4.7% MATCH</text>

        {sliceReveal > 0.5 && (
          <g>
            <line x1="170" y1="870" x2={170 + matchSliceW} y2="870"
              stroke={ACCENT} strokeWidth="4" />
            <line x1="170" y1="856" x2="170" y2="884" stroke={ACCENT} strokeWidth="4" />
            <line x1={170 + matchSliceW} y1="856" x2={170 + matchSliceW} y2="884"
              stroke={ACCENT} strokeWidth="4" />
            <text x={170 + matchSliceW / 2} y="846" textAnchor="middle" fontFamily={FONT}
              fontSize="26" fill={ACCENT}>4.7%</text>
          </g>
        )}

        <text x="540" y="1220" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={WHITE}
          letterSpacing="0.06em" opacity={sliceReveal > 0.5 ? 1 : 0}>
          = $2,820 / YEAR
        </text>
        <text x="540" y="1290" textAnchor="middle" fontFamily={FONT} fontSize="34" fill="#9CA3AF"
          letterSpacing="0.06em" opacity={sliceReveal > 0.7 ? 1 : 0}>
          FROM YOUR EMPLOYER
        </text>

        <g transform={`translate(540, 1520) scale(${stampScale})`} opacity={stampOpacity}>
          <rect x="-200" y="-70" width="400" height="140" rx="16" fill="none"
            stroke={ACCENT} strokeWidth="12" />
          <text x="0" y="-8" textAnchor="middle" fontFamily={FONT} fontSize="60" fill={ACCENT}
            letterSpacing="0.2em">FREE</text>
          <text x="0" y="54" textAnchor="middle" fontFamily={FONT} fontSize="34" fill={WHITE}
            letterSpacing="0.1em">EVERY YEAR</text>
        </g>

        <text x="540" y="1720" textAnchor="middle" fontFamily={FONT} fontSize="30" fill="#6B7280"
          letterSpacing="0.06em" opacity={stampOpacity}>
          MOST PEOPLE WALK AWAY FROM IT
        </text>
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const barGrow = interpolate(frame, [20, 170], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const labelOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 160 } });

  const maxBarH = 700;
  const barX = 300;
  const barW = 480;
  const baseY = 1500;
  const yourH = maxBarH * 0.52 * barGrow;
  const matchH = maxBarH * 0.48 * barGrow;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>30 YEARS LATER</text>
        <text x="540" y="290" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>COMPOUNDING KICKS IN</text>

        <rect x={barX} y={baseY - yourH} width={barW} height={yourH} rx="0" fill="#374151" />
        <rect x={barX} y={baseY - yourH - matchH} width={barW} height={matchH} rx="0" fill={ACCENT} />
        <rect x={barX} y={baseY - yourH - matchH} width={barW} height="20" rx="10" fill={ACCENT} />
        <line x1={barX - 20} y1={baseY} x2={barX + barW + 20} y2={baseY}
          stroke="#D1D5DB" strokeWidth="4" />

        <rect x="120" y="460" width="28" height="28" rx="6" fill="#374151" opacity={titleOpacity} />
        <text x="160" y="482" fontFamily={FONT} fontSize="26" fill={BLACK} opacity={titleOpacity}>YOUR CONTRIBUTIONS</text>
        <rect x="120" y="506" width="28" height="28" rx="6" fill={ACCENT} opacity={titleOpacity} />
        <text x="160" y="528" fontFamily={FONT} fontSize="26" fill={BLACK} opacity={titleOpacity}>EMPLOYER MATCH</text>

        <text x={barX} y={baseY + 48} fontFamily={FONT} fontSize="22" fill={BLACK} opacity={titleOpacity}>YR 0</text>
        <text x={barX + barW} y={baseY + 48} textAnchor="end" fontFamily={FONT} fontSize="22"
          fill={BLACK} opacity={titleOpacity}>YR 30</text>

        <text x={barX + barW / 2} y={baseY - yourH - matchH - 30} textAnchor="middle"
          fontFamily={FONT} fontSize="50" fill={ACCENT}
          opacity={barGrow > 0.8 ? 1 : 0}>
          $375,000
        </text>

        <g transform={`translate(540, 1740) scale(${labelScale})`} opacity={labelOpacity}>
          <rect x="-300" y="-60" width="600" height="120" rx="18" fill={ACCENT} />
          <text x="0" y="-4" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={WHITE}
            letterSpacing="0.1em">QUARTER MILLION</text>
          <text x="0" y="52" textAnchor="middle" fontFamily={FONT} fontSize="32" fill={WHITE}
            letterSpacing="0.1em">FROM FREE MATCH ALONE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const p1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const p2Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const p3Scale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 100 } });
  const walkX = interpolate(frame, [80, 200], [0, 120], { extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const cashOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' });
  const statsOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateRight: 'clamp' });
  const statsScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 160 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE}
          letterSpacing="0.1em" opacity={titleOpacity}>1 IN 3 WORKERS</text>
        <text x="540" y="290" textAnchor="middle" fontFamily={FONT} fontSize="42" fill="#EF4444"
          letterSpacing="0.1em" opacity={titleOpacity}>REFUSE THE MATCH</text>

        <g transform={`translate(180, 800) scale(${p1Scale * 1.7})`}>
          <PersonSVG x={0} y={0} color={ACCENT} />
        </g>
        <circle cx="180" cy="1120" r="40" fill={ACCENT}
          opacity={interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' })} />
        <path d="M 158 1120 L 174 1140 L 202 1102" stroke={WHITE} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          opacity={interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' })} />

        <g transform={`translate(540, 800) scale(${p2Scale * 1.7})`}>
          <PersonSVG x={0} y={0} color={ACCENT} />
        </g>
        <circle cx="540" cy="1120" r="40" fill={ACCENT}
          opacity={interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' })} />
        <path d="M 518 1120 L 534 1140 L 562 1102" stroke={WHITE} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          opacity={interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' })} />

        <g transform={`translate(${900 + walkX}, 800) scale(${p3Scale * 1.7})`}>
          <PersonSVG x={0} y={0} color="#EF4444" />
        </g>
        <circle cx={900 + walkX} cy="1120" r="40" fill="#EF4444"
          opacity={interpolate(frame, [90, 110], [0, 1], { extrapolateRight: 'clamp' })} />
        <line x1={878 + walkX} y1="1100" x2={922 + walkX} y2="1140" stroke={WHITE} strokeWidth="8"
          strokeLinecap="round"
          opacity={interpolate(frame, [90, 110], [0, 1], { extrapolateRight: 'clamp' })} />
        <line x1={922 + walkX} y1="1100" x2={878 + walkX} y2="1140" stroke={WHITE} strokeWidth="8"
          strokeLinecap="round"
          opacity={interpolate(frame, [90, 110], [0, 1], { extrapolateRight: 'clamp' })} />

        <g opacity={cashOpacity}>
          <rect x="820" y="1180" width="80" height="50" rx="8" fill="#22C55E" />
          <text x="860" y="1214" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={WHITE}>$$$</text>
          <rect x="840" y="1230" width="80" height="50" rx="8" fill="#22C55E" />
          <text x="880" y="1264" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={WHITE}>$$$</text>
        </g>

        <g transform={`translate(540, 1540) scale(${statsScale})`} opacity={statsOpacity}>
          <rect x="-310" y="-80" width="620" height="160" rx="20" fill="none"
            stroke="#EF4444" strokeWidth="8" />
          <text x="0" y="-14" textAnchor="middle" fontFamily={FONT} fontSize="56" fill="#EF4444"
            letterSpacing="0.08em">1 IN 3</text>
          <text x="0" y="54" textAnchor="middle" fontFamily={FONT} fontSize="34" fill={WHITE}
            letterSpacing="0.08em">FORFEIT THE FULL MATCH</text>
        </g>

        <text x="540" y="1740" textAnchor="middle" fontFamily={FONT} fontSize="30" fill="#9CA3AF"
          letterSpacing="0.06em" opacity={statsOpacity}>
          TENS OF THOUSANDS LEFT BEHIND
        </text>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 160 } });
  const piggyGrow = interpolate(frame, [40, 180], [0.6, 2.2], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const ctaScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 200 } });
  const ctaOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateRight: 'clamp' });
  const ruleOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: 'clamp' });
  const ruleScale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 140 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={BLACK}
          letterSpacing="0.1em" opacity={titleOpacity}>THE RULE:</text>
        <text x="540" y="290" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={ACCENT}
          letterSpacing="0.1em" opacity={titleOpacity}>ALWAYS TAKE THE FULL MATCH</text>

        <g transform={`translate(540, 560) scale(${checkScale})`}>
          <rect x="-320" y="-60" width="640" height="120" rx="18" fill={BLACK} />
          <rect x="-300" y="-40" width="80" height="80" rx="12" fill={ACCENT} />
          <path d="M -280 -0 L -254 28 L -218 -26" stroke={WHITE} strokeWidth="10" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x="30" y="16" fontFamily={FONT} fontSize="32" fill={WHITE}
            letterSpacing="0.06em">CONTRIBUTE TO MATCH</text>
        </g>

        <g transform={`translate(260, 900) scale(1.6)`}>
          <PersonSVG x={0} y={0} color={ACCENT} />
        </g>

        <g transform={`translate(780, 940) scale(${piggyGrow})`}>
          <PiggyBank x={0} y={0} color="#6EE7B7" />
        </g>
        <text x="780" y="1180" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={ACCENT}
          letterSpacing="0.06em"
          opacity={interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' })}>
          GROWING
        </text>

        <g transform={`translate(540, 1380) scale(${ruleScale})`} opacity={ruleOpacity}>
          <rect x="-340" y="-80" width="680" height="160" rx="18" fill="#F0FDF4" />
          <rect x="-340" y="-80" width="680" height="160" rx="18" fill="none"
            stroke={ACCENT} strokeWidth="6" />
          <text x="0" y="-12" textAnchor="middle" fontFamily={FONT} fontSize="34" fill={BLACK}
            letterSpacing="0.08em">ONLY GUARANTEED</text>
          <text x="0" y="50" textAnchor="middle" fontFamily={FONT} fontSize="34" fill={ACCENT}
            letterSpacing="0.08em">100% RETURN ON EARTH</text>
        </g>

        <g transform={`translate(540, 1620) scale(${ctaScale})`} opacity={ctaOpacity}>
          <rect x="-320" y="-80" width="640" height="160" rx="22" fill={ACCENT} />
          <text x="0" y="-8" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE}
            letterSpacing="0.1em">TAKE FREE $2,820</text>
          <text x="0" y="56" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE}
            letterSpacing="0.08em">DON'T LEAVE IT BEHIND</text>
        </g>

        <text x="540" y="1840" textAnchor="middle" fontFamily={FONT} fontSize="28" fill="#6B7280"
          letterSpacing="0.06em" opacity={ctaOpacity}>FOLLOW FOR MORE MONEY MOVES</text>
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
