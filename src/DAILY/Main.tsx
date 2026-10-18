import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = interpolate(frame, [75, 145], [0, 260], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleOpacity = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const crackOpacity = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const statScale = spring({ frame: frame - 135, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '13%', left: 0, right: 0,
        textAlign: 'center', opacity: titleOpacity, padding: '0 80px',
      }}>
        <p style={headline(48, WHITE)}>THE HIDDEN</p>
        <p style={{ ...headline(112, ACCENT), lineHeight: 0.9, margin: '8px 0' }}>$250K</p>
        <p style={headline(48, WHITE)}>DIVORCE BILL</p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* Left ring — stays */}
        <circle cx={440} cy={990} r={88} fill="none" stroke="#C0C0C0" strokeWidth={26} />
        {/* Diamond on left ring */}
        <polygon points="440,894 460,918 440,934 420,918" fill={ACCENT} />
        <polygon points="440,894 460,918 440,910 420,918" fill="#FF8080" />

        {/* Right ring — slides away */}
        <circle cx={640 + slideX} cy={990} r={88} fill="none" stroke="#C8A848" strokeWidth={26} />

        {/* Crack line */}
        <line
          x1={540} y1={904}
          x2={540} y2={1076}
          stroke={ACCENT}
          strokeWidth={4}
          strokeDasharray="10,5"
          opacity={crackOpacity}
        />
      </svg>

      <div style={{
        position: 'absolute', bottom: '17%', left: 0, right: 0,
        textAlign: 'center', padding: '0 80px',
        transform: `scale(${statScale})`,
        opacity: statScale,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 38, color: '#999', margin: 0, letterSpacing: '0.05em' }}>
          1 in 2 marriages ends in divorce
        </p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#555', margin: '10px 0 0', fontStyle: 'italic' }}>
          Most of the damage happens quietly
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const stack1Scale = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 120 } });
  const stack2Scale = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 120 } });

  const bannerY = interpolate(frame, [145, 205], [0, -220], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const bannerOpacity = interpolate(frame, [144, 180], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bannerAppear = interpolate(frame, [100, 125], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const bills1 = [0, 1, 2, 3, 4];
  const bills2 = [0, 1, 2, 3, 4];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>NUMBER ONE</p>
        <p style={headline(64, ACCENT)}>LEGAL FEES</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#444', marginTop: 14 }}>
          $15,000 per spouse — minimum
        </p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* Left stack */}
        <g transform={`translate(270, 1030) scale(${stack1Scale})`} style={{ transformOrigin: '0 0' }}>
          {bills1.map((i) => (
            <g key={i}>
              <rect x={-110} y={i * -16} width={220} height={54} rx={6}
                fill={i % 2 === 0 ? '#2E7D32' : '#388E3C'} />
              <text x={0} y={i * -16 + 36} textAnchor="middle" fill="white"
                fontFamily={FONT} fontSize={22} fontWeight="bold">$100</text>
            </g>
          ))}
          <text x={0} y={108} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={28} fontWeight="bold">YOUR FEES</text>
          <text x={0} y={148} textAnchor="middle" fill={ACCENT}
            fontFamily={FONT} fontSize={42} fontWeight="bold">$15,000</text>
        </g>

        {/* Right stack */}
        <g transform={`translate(810, 1030) scale(${stack2Scale})`} style={{ transformOrigin: '0 0' }}>
          {bills2.map((i) => (
            <g key={i}>
              <rect x={-110} y={i * -16} width={220} height={54} rx={6}
                fill={i % 2 === 0 ? '#2E7D32' : '#388E3C'} />
              <text x={0} y={i * -16 + 36} textAnchor="middle" fill="white"
                fontFamily={FONT} fontSize={22} fontWeight="bold">$100</text>
            </g>
          ))}
          <text x={0} y={108} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={28} fontWeight="bold">THEIR FEES</text>
          <text x={0} y={148} textAnchor="middle" fill={ACCENT}
            fontFamily={FONT} fontSize={42} fontWeight="bold">$15,000</text>
        </g>

        {/* Plus */}
        <text x={540} y={1060} textAnchor="middle" fill="#888"
          fontFamily={FONT} fontSize={90} fontWeight="bold">+</text>

        {/* Flying banner */}
        <g transform={`translate(0, ${bannerY})`} opacity={bannerOpacity * bannerAppear}>
          <rect x={275} y={1220} width={530} height={84} rx={14} fill={ACCENT} />
          <text x={540} y={1274} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={44} fontWeight="bold">$30,000 GONE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const crackH = interpolate(frame, [55, 130], [0, 300], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const leftX = interpolate(frame, [130, 195], [0, -130], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const rightX = interpolate(frame, [130, 195], [0, 130], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  const coinOffsets: Array<{ dx: number; dy: number; delay: number }> = [
    { dx: -55, dy: 0, delay: 140 },
    { dx: 0,   dy: 0, delay: 148 },
    { dx: 55,  dy: 0, delay: 144 },
  ];

  const badgeScale = spring({ frame: frame - 155, fps, config: { damping: 13, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 4 }}>NUMBER TWO</p>
        <p style={headline(58, ACCENT)}>YOUR RETIREMENT</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#aaa', marginTop: 14 }}>
          Split by court order — taxed on exit
        </p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id="clip-pig-left">
            <rect x={-220} y={-220} width={220} height={440} />
          </clipPath>
          <clipPath id="clip-pig-right">
            <rect x={0} y={-220} width={220} height={440} />
          </clipPath>
        </defs>

        {/* Left half of pig */}
        <g transform={`translate(${540 + leftX}, 960)`}>
          <g clipPath="url(#clip-pig-left)">
            <ellipse cx={0} cy={0} rx={200} ry={170} fill="#F8BBD0" />
            <ellipse cx={-130} cy={-145} rx={38} ry={32} fill="#F48FB1" />
            <circle cx={-70} cy={-60} r={22} fill="#C81454" opacity={0.5} />
          </g>
          <text x={-72} y={20} fill="#AD1457" fontFamily={FONT} fontSize={90} fontWeight="bold">$</text>
        </g>

        {/* Right half of pig */}
        <g transform={`translate(${540 + rightX}, 960)`}>
          <g clipPath="url(#clip-pig-right)">
            <ellipse cx={0} cy={0} rx={200} ry={170} fill="#F8BBD0" />
            <ellipse cx={130} cy={-145} rx={38} ry={32} fill="#F48FB1" />
            <ellipse cx={155} cy={30} rx={44} ry={36} fill="#F48FB1" />
            <circle cx={142} cy={28} r={9} fill="#AD1457" />
            <circle cx={168} cy={28} r={9} fill="#AD1457" />
            <circle cx={70} cy={-60} r={22} fill="#C81454" opacity={0.5} />
          </g>
        </g>

        {/* Crack line */}
        <line
          x1={540} y1={793}
          x2={540} y2={793 + crackH}
          stroke={ACCENT}
          strokeWidth={5}
          strokeDasharray="12,5"
        />

        {/* Falling coins */}
        {coinOffsets.map(({ dx, dy, delay }, i) => {
          const coinY = interpolate(frame, [delay, delay + 70], [dy, 230], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.in(Easing.quad),
          });
          const coinOp = interpolate(frame, [delay - 2, delay + 4], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <g key={i} transform={`translate(${540 + dx}, ${1130 + coinY})`} opacity={coinOp}>
              <circle r={22} fill="#FFD700" />
              <text textAnchor="middle" y={8} fill="#8B6914" fontFamily={FONT} fontSize={20} fontWeight="bold">$</text>
            </g>
          );
        })}

        {/* Badge */}
        <g transform={`scale(${badgeScale})`} style={{ transformOrigin: '540px 1380px' }}>
          <rect x={310} y={1348} width={460} height={80} rx={14} fill={ACCENT} />
          <text x={540} y={1400} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={38} fontWeight="bold">40% LOST TO TAXES</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const house1X = interpolate(frame, [85, 145], [540, 270], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const house2X = interpolate(frame, [85, 145], [540, 810], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const house2Opacity = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelOpacity = interpolate(frame, [150, 175], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const badgeScale = spring({ frame: frame - 155, fps, config: { damping: 12, stiffness: 100 } });

  const House = ({ cx, cy, sz, wallColor }: { cx: number; cy: number; sz: number; wallColor: string }) => (
    <g>
      <rect x={cx - sz * 0.72} y={cy} width={sz * 1.44} height={sz} fill={wallColor} rx={5} />
      <polygon
        points={`${cx - sz * 0.9},${cy} ${cx},${cy - sz * 0.68} ${cx + sz * 0.9},${cy}`}
        fill="#5D4037"
      />
      <rect x={cx - sz * 0.18} y={cy + sz * 0.5} width={sz * 0.36} height={sz * 0.5} fill="#3E2723" rx={3} />
      <rect x={cx - sz * 0.56} y={cy + sz * 0.18} width={sz * 0.34} height={sz * 0.3} fill="#B3E5FC" rx={3} />
      <rect x={cx + sz * 0.22} y={cy + sz * 0.18} width={sz * 0.34} height={sz * 0.3} fill="#B3E5FC" rx={3} />
    </g>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>NUMBER THREE</p>
        <p style={headline(58, ACCENT)}>TWO HOUSEHOLDS</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#444', marginTop: 14 }}>
          Living solo costs 80% more per person
        </p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <House cx={house1X} cy={820} sz={155} wallColor="#90A4AE" />
        <g opacity={house2Opacity}>
          <House cx={house2X} cy={820} sz={155} wallColor="#90A4AE" />
        </g>

        {/* Cost labels */}
        <text x={270} y={1120} textAnchor="middle" fill={ACCENT}
          fontFamily={FONT} fontSize={34} fontWeight="bold"
          opacity={labelOpacity}>$2,100/mo</text>
        <text x={810} y={1120} textAnchor="middle" fill={ACCENT}
          fontFamily={FONT} fontSize={34} fontWeight="bold"
          opacity={labelOpacity * house2Opacity}>$2,100/mo</text>

        <text x={540} y={1200} textAnchor="middle" fill="#888"
          fontFamily={FONT} fontSize={28}
          opacity={labelOpacity}>vs $2,330/mo together</text>

        <g transform={`scale(${badgeScale})`} style={{ transformOrigin: '540px 1320px' }}>
          <rect x={275} y={1285} width={530} height={82} rx={14} fill={ACCENT} />
          <text x={540} y={1339} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={40} fontWeight="bold">80% MORE EXPENSIVE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const chartProgress = interpolate(frame, [40, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const labelOpacity = spring({ frame: frame - 160, fps, config: { damping: 14, stiffness: 100 } });

  const CL = 160;
  const CR = 920;
  const CT = 700;
  const CB = 1280;
  const CW = CR - CL;
  const CH = CB - CT;

  // Points as [tFraction, yFraction] where yFraction 0=top 1=bottom
  const togetherPts: Array<[number, number]> = [[0, 0.92], [0.33, 0.62], [0.66, 0.32], [1, 0.06]];
  const divorcedPts: Array<[number, number]> = [[0, 0.92], [0.33, 0.78], [0.66, 0.60], [1, 0.44]];

  const buildPoints = (pts: Array<[number, number]>, t: number): string => {
    if (t <= 0) return `${CL + pts[0][0] * CW},${CT + pts[0][1] * CH}`;
    const result: string[] = [];
    for (let i = 0; i < pts.length; i++) {
      const seg = i / (pts.length - 1);
      if (seg <= t) {
        result.push(`${CL + pts[i][0] * CW},${CT + pts[i][1] * CH}`);
      } else {
        const prevSeg = (i - 1) / (pts.length - 1);
        const localT = (t - prevSeg) / (seg - prevSeg);
        const px = CL + (pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * localT) * CW;
        const py = CT + (pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * localT) * CH;
        result.push(`${px},${py}`);
        break;
      }
    }
    return result.join(' ');
  };

  const togetherLine = buildPoints(togetherPts, chartProgress);
  const divorcedLine = buildPoints(divorcedPts, chartProgress);

  const gapTopY = CT + togetherPts[3][1] * CH;
  const gapBotY = CT + divorcedPts[3][1] * CH;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '9%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 4 }}>THE REAL COST</p>
        <p style={headline(58, ACCENT)}>WEALTH GAP</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#aaa', marginTop: 14 }}>
          Over 20 years, it compounds to $250K
        </p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* Axes */}
        <line x1={CL} y1={CT - 20} x2={CL} y2={CB} stroke="#444" strokeWidth={3} />
        <line x1={CL} y1={CB} x2={CR + 20} y2={CB} stroke="#444" strokeWidth={3} />

        <text x={CL - 12} y={CB + 4} textAnchor="end" fill="#555" fontFamily={FONT} fontSize={24}>$0</text>
        <text x={(CL + CR) / 2} y={CB + 56} textAnchor="middle" fill="#555" fontFamily={FONT} fontSize={26}>20 YEARS</text>

        {/* Legend */}
        <rect x={CL} y={CT - 70} width={28} height={6} rx={3} fill="#4CAF50" />
        <text x={CL + 40} y={CT - 57} fill="#4CAF50" fontFamily={FONT} fontSize={26}>Together</text>
        <rect x={CL + 230} y={CT - 70} width={28} height={6} rx={3} fill={ACCENT} />
        <text x={CL + 270} y={CT - 57} fill={ACCENT} fontFamily={FONT} fontSize={26}>After divorce</text>

        {/* Lines */}
        {togetherLine.split(' ').length > 1 && (
          <polyline points={togetherLine} fill="none" stroke="#4CAF50" strokeWidth={6}
            strokeLinecap="round" strokeLinejoin="round" />
        )}
        {divorcedLine.split(' ').length > 1 && (
          <polyline points={divorcedLine} fill="none" stroke={ACCENT} strokeWidth={6}
            strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Gap bracket + label */}
        <g opacity={labelOpacity}>
          <line x1={CR + 12} y1={gapTopY} x2={CR + 12} y2={gapBotY}
            stroke="white" strokeWidth={3} />
          <line x1={CR + 6} y1={gapTopY} x2={CR + 18} y2={gapTopY} stroke="white" strokeWidth={3} />
          <line x1={CR + 6} y1={gapBotY} x2={CR + 18} y2={gapBotY} stroke="white" strokeWidth={3} />
          <rect x={CR - 200} y={(gapTopY + gapBotY) / 2 - 38} width={195} height={76} rx={12} fill={ACCENT} />
          <text x={CR - 102} y={(gapTopY + gapBotY) / 2 - 8} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={30} fontWeight="bold">$250K</text>
          <text x={CR - 102} y={(gapTopY + gapBotY) / 2 + 24} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={22}>GAP</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const shieldScale = spring({ frame: frame - 25, fps, config: { damping: 10, stiffness: 120 } });
  const prenupScale = spring({ frame: frame - 75, fps, config: { damping: 12, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [160, 195], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const savingsOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>THE FIX</p>
        <p style={headline(74, ACCENT)}>PROTECT</p>
        <p style={headline(42, BLACK)}>YOURSELF NOW</p>
      </div>

      <svg
        viewBox="0 0 1080 1920"
        width={1080}
        height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* Shield */}
        <g transform={`translate(540, 960) scale(${shieldScale})`} style={{ transformOrigin: '0 0' }}>
          <path
            d="M 0,-185 L 168,-104 L 168,62 Q 168,165 0,228 Q -168,165 -168,62 L -168,-104 Z"
            fill="#4CAF50"
            opacity={0.15}
          />
          <path
            d="M 0,-185 L 168,-104 L 168,62 Q 168,165 0,228 Q -168,165 -168,62 L -168,-104 Z"
            fill="none"
            stroke="#4CAF50"
            strokeWidth={9}
          />
          <text x={0} y={50} textAnchor="middle" fill="#2E7D32"
            fontFamily={FONT} fontSize={106} fontWeight="bold">$</text>
        </g>

        {/* Prenup badge */}
        <g transform={`scale(${prenupScale})`} style={{ transformOrigin: '540px 1280px' }}>
          <rect x={280} y={1248} width={500} height={84} rx={14} fill={BLACK} />
          <text x={540} y={1302} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={40} fontWeight="bold">PRENUP = $2,500</text>
        </g>

        <text x={540} y={1390} textAnchor="middle" fill="#666"
          fontFamily={FONT} fontSize={30}
          opacity={savingsOpacity}>Saves you up to $250,000</text>

        {/* CTA button */}
        <g opacity={ctaOpacity}>
          <rect x={175} y={1485} width={730} height={94} rx={47} fill={ACCENT} />
          <text x={540} y={1542} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={40} fontWeight="bold">FOLLOW FOR MORE</text>
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



