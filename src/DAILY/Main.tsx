import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
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

// ── Scene 1: Hook — old 401k sitting after job switch ──
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personX = interpolate(frame, [20, 70], [420, 700], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const piggyOp = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const qMarkS = spring({ frame: frame - 85, fps: 30, config: { mass: 0.5, damping: 9 } });
  const qMarkScale = Math.min(qMarkS, 1.1);

  const statS = spring({ frame: frame - 135, fps: 30, config: { mass: 0.5, damping: 10 } });
  const statScale = Math.min(statS, 1.1);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={150} style={headline(62, WHITE)} textAnchor="middle">YOU QUIT YOUR JOB.</text>
          <text x={540} y={232} style={headline(56, ACCENT)} textAnchor="middle">YOUR OLD 401K</text>
          <text x={540} y={308} style={headline(56, ACCENT)} textAnchor="middle">IS SITTING THERE.</text>
        </g>

        {/* Office building */}
        <g opacity={titleOp}>
          <rect x={80} y={400} width={380} height={580} rx={10} fill="#1E1E2E" />
          <rect x={80} y={370} width={380} height={50} rx={6} fill="#2A2A3E" />
          {[0,1,2,3,4].map(row =>
            [0,1,2].map(col => (
              <rect
                key={`w-${row}-${col}`}
                x={115 + col * 115}
                y={450 + row * 95}
                width={68} height={52}
                rx={5}
                fill={row === 2 && col === 1 ? '#FFD700' : '#3A3A5E'}
                opacity={0.85}
              />
            ))
          )}
          <rect x={218} y={870} width={84} height={108} rx={6} fill="#2A2A3E" />
        </g>

        {/* Person walking away */}
        <Person x={personX} y={930} scale={1.4} color="#AAAAAA" />

        {/* Briefcase carried by person */}
        <g transform={`translate(${personX + 38}, 910)`} opacity={titleOp}>
          <rect x={0} y={0} width={48} height={38} rx={8} fill="#888" />
          <rect x={14} y={-10} width={20} height={14} rx={4} fill="none" stroke="#888" strokeWidth={5} />
        </g>

        {/* Piggy bank left behind */}
        <g opacity={piggyOp}>
          <ellipse cx={270} cy={1140} rx={115} ry={95} fill="#F9A8D4" />
          <circle cx={375} cy={1112} r={68} fill="#F9A8D4" />
          <ellipse cx={410} cy={1130} rx={30} ry={22} fill="#F472B6" />
          <circle cx={403} cy={1126} r={7} fill="#BE185D" />
          <circle cx={418} cy={1126} r={7} fill="#BE185D" />
          <ellipse cx={368} cy={1058} rx={20} ry={26} fill="#F472B6" />
          <circle cx={388} cy={1098} r={8} fill={BLACK} />
          <rect x={170} y={1215} width={34} height={52} rx={10} fill="#F9A8D4" />
          <rect x={220} y={1215} width={34} height={52} rx={10} fill="#F9A8D4" />
          <rect x={280} y={1215} width={34} height={52} rx={10} fill="#F9A8D4" />
          <rect x={330} y={1215} width={34} height={52} rx={10} fill="#F9A8D4" />
          <rect x={230} y={1062} width={60} height={12} rx={4} fill="#BE185D" />
          <rect x={155} y={1096} width={168} height={48} rx={10} fill="#BE185D" />
          <text x={239} y={1128} style={headline(26, WHITE)} textAnchor="middle">401K</text>
          <path d="M 158 1150 Q 120 1130 135 1100 Q 148 1075 158 1095" fill="none" stroke="#F9A8D4" strokeWidth={10} strokeLinecap="round" />
        </g>

        {/* Question mark bubble */}
        <g transform={`translate(490, 1080) scale(${qMarkScale})`}>
          <circle cx={0} cy={0} r={58} fill="#2A2A2A" />
          <text x={0} y={22} style={{ fontFamily: FONT, fontSize: 72 } as React.CSSProperties} textAnchor="middle" fill={ACCENT}>?</text>
        </g>

        {/* 35% stat badge */}
        <g transform={`translate(540, 1410) scale(${statScale})`}>
          <rect x={-430} y={-68} width={860} height={136} rx={22} fill={ACCENT} />
          <text x={0} y={-8} style={headline(38, WHITE)} textAnchor="middle">35% OF WORKERS CASH IT OUT</text>
          <text x={0} y={52} style={headline(32, WHITE)} textAnchor="middle">AND REGRET IT FOREVER</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── Scene 2: The 30% immediate tax + penalty hit ──
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOp = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scissorX = interpolate(frame, [50, 105], [1200, 540], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const penaltyOp = interpolate(frame, [110, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const remainS = spring({ frame: frame - 148, fps: 30, config: { mass: 0.5, damping: 10 } });
  const remainScale = Math.min(remainS, 1.1);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={148} style={headline(58, BLACK)} textAnchor="middle">THEY CASH IT OUT.</text>
          <text x={540} y={228} style={headline(52, ACCENT)} textAnchor="middle">WATCH WHAT HAPPENS.</text>
        </g>

        {/* Check for $20,000 */}
        <g opacity={checkOp}>
          <rect x={80} y={290} width={920} height={340} rx={22} fill={WHITE} stroke="#CCCCCC" strokeWidth={4} />
          <rect x={80} y={290} width={920} height={58} rx={22} fill="#1E3A5C" />
          <text x={540} y={335} style={headline(30, WHITE)} textAnchor="middle">FIRST NATIONAL BANK</text>
          <text x={160} y={420} style={{ fontFamily: FONT, fontSize: 26, color: '#888' } as React.CSSProperties}>PAY TO THE ORDER OF:</text>
          <text x={160} y={468} style={{ fontFamily: FONT, fontSize: 38, color: BLACK } as React.CSSProperties}>YOU</text>
          <line x1={140} y1={478} x2={750} y2={478} stroke="#CCCCCC" strokeWidth={3} />
          <text x={820} y={478} style={{ fontFamily: FONT, fontSize: 52, color: BLACK } as React.CSSProperties} textAnchor="middle">$20,000</text>
          <rect x={640} y={540} width={280} height={68} rx={10} fill="#1E3A5C" />
          <text x={780} y={584} style={headline(30, WHITE)} textAnchor="middle">MEMO: 401K CASH</text>
        </g>

        {/* Scissors sliding in */}
        <g transform={`translate(${scissorX}, 380)`} opacity={checkOp}>
          <line x1={0} y1={0} x2={140} y2={-55} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
          <circle cx={0} cy={0} r={18} fill={ACCENT} />
          <line x1={0} y1={0} x2={140} y2={55} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
          <circle cx={0} cy={16} r={18} fill={ACCENT} />
        </g>

        {/* Penalty breakdown */}
        <g opacity={penaltyOp}>
          <rect x={80} y={680} width={420} height={200} rx={18} fill={ACCENT} />
          <text x={290} y={762} style={headline(34, WHITE)} textAnchor="middle">10% PENALTY</text>
          <text x={290} y={838} style={headline(58, WHITE)} textAnchor="middle">−$2,000</text>

          <rect x={580} y={680} width={420} height={200} rx={18} fill="#B91C1C" />
          <text x={790} y={762} style={headline(34, WHITE)} textAnchor="middle">20% TAX</text>
          <text x={790} y={838} style={headline(58, WHITE)} textAnchor="middle">−$4,000</text>

          <rect x={80} y={928} width={920} height={118} rx={18} fill="#1A1A1A" />
          <text x={540} y={988} style={headline(36, ACCENT)} textAnchor="middle">TOTAL TAKEN BY THE IRS:</text>
          <text x={540} y={1034} style={headline(48, ACCENT)} textAnchor="middle">$6,000 GONE INSTANTLY</text>
        </g>

        {/* Remaining amount springs in */}
        <g transform={`translate(540, 1240) scale(${remainScale})`}>
          <rect x={-440} y={-80} width={880} height={160} rx={24} fill={BLACK} />
          <text x={0} y={-12} style={headline(38, WHITE)} textAnchor="middle">YOU WALK AWAY WITH</text>
          <text x={0} y={58} style={headline(72, GREEN)} textAnchor="middle">$14,000</text>
        </g>

        <g opacity={penaltyOp}>
          <text x={540} y={1490} style={headline(36, BLACK)} textAnchor="middle">OUT OF $20,000 YOU SAVED.</text>
          <text x={540} y={1568} style={headline(34, ACCENT)} textAnchor="middle">BUT THAT'S NOT THE WORST PART.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── Scene 3: 3 million people do this every year ──
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gridOp = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const redCount = Math.round(interpolate(frame, [45, 120], [0, 35], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  }));

  const millionS = spring({ frame: frame - 138, fps: 30, config: { mass: 0.6, damping: 10 } });
  const millionScale = Math.min(millionS, 1.1);

  const iconCount = Math.max(0, Math.floor(100));
  const cols = 10;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={148} style={headline(56, WHITE)} textAnchor="middle">3 MILLION WORKERS</text>
          <text x={540} y={228} style={headline(52, ACCENT)} textAnchor="middle">MAKE THIS MISTAKE</text>
          <text x={540} y={300} style={headline(36, WHITE)} textAnchor="middle">EVERY SINGLE YEAR</text>
        </g>

        <g opacity={gridOp}>
          {Array.from({ length: iconCount }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const isRed = i < redCount;
            const cx = 90 + col * 92;
            const cy = 390 + row * 118;
            return (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <circle cx={0} cy={-28} r={14} fill={isRed ? ACCENT : '#444444'} />
                <rect x={-11} y={-12} width={22} height={32} rx={5} fill={isRed ? ACCENT : '#444444'} />
                <rect x={-11} y={22} width={9} height={26} rx={4} fill={isRed ? ACCENT : '#444444'} />
                <rect x={3} y={22} width={9} height={26} rx={4} fill={isRed ? ACCENT : '#444444'} />
              </g>
            );
          })}
        </g>

        <g opacity={gridOp}>
          <rect x={80} y={1560} width={28} height={28} rx={4} fill={ACCENT} />
          <text x={120} y={1582} style={{ fontFamily: FONT, fontSize: 30, color: WHITE } as React.CSSProperties}>CASHED OUT (35%)</text>
          <rect x={540} y={1560} width={28} height={28} rx={4} fill="#444" />
          <text x={580} y={1582} style={{ fontFamily: FONT, fontSize: 30, color: WHITE } as React.CSSProperties}>ROLLED OVER</text>
        </g>

        <g transform={`translate(540, 1720) scale(${millionScale})`}>
          <rect x={-440} y={-72} width={880} height={144} rx={22} fill={ACCENT} />
          <text x={0} y={-8} style={headline(38, WHITE)} textAnchor="middle">THAT'S 3,000,000 PEOPLE</text>
          <text x={0} y={54} style={headline(32, WHITE)} textAnchor="middle">HANDING OVER SIX FIGURES</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── Scene 4: Compound growth you threw away ──
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barGrow = interpolate(frame, [22, 130], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const yearProg = interpolate(frame, [22, 130], [0, 30], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const labelOp = interpolate(frame, [132, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lossS = spring({ frame: frame - 162, fps: 30, config: { mass: 0.5, damping: 10 } });
  const lossScale = Math.min(lossS, 1.1);

  const base = 1530;
  const maxBarH = 780;
  const investedH = barGrow * maxBarH;
  const cashedH = barGrow * (14000 / 152000) * maxBarH;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={145} style={headline(52, WHITE)} textAnchor="middle">HERE'S THE REAL COST.</text>
          <text x={540} y={225} style={headline(48, ACCENT)} textAnchor="middle">$20K OVER 30 YEARS</text>
        </g>

        <g opacity={titleOp}>
          <text x={540} y={308} style={headline(38, '#888')} textAnchor="middle">
            {`YEAR ${Math.round(yearProg)}`}
          </text>
        </g>

        {/* Cashed-out bar (red) */}
        <rect x={140} y={base - cashedH} width={300} height={cashedH} rx={14} fill={ACCENT} opacity={0.85} />
        <g opacity={labelOp}>
          <text x={290} y={base + 52} style={headline(32, WHITE)} textAnchor="middle">CASHED</text>
          <text x={290} y={base + 96} style={headline(32, WHITE)} textAnchor="middle">OUT</text>
          <text x={290} y={base - cashedH - 28} style={headline(36, ACCENT)} textAnchor="middle">$14,000</text>
          <text x={290} y={base - cashedH - 72} style={headline(26, '#888')} textAnchor="middle">(after tax)</text>
        </g>

        {/* Invested bar (green) */}
        <rect x={640} y={base - investedH} width={300} height={investedH} rx={14} fill={GREEN} />
        <g opacity={labelOp}>
          <text x={790} y={base + 52} style={headline(32, WHITE)} textAnchor="middle">KEPT</text>
          <text x={790} y={base + 96} style={headline(32, WHITE)} textAnchor="middle">INVESTED</text>
          <text x={790} y={base - investedH - 28} style={headline(36, GREEN)} textAnchor="middle">$152,000</text>
          <text x={790} y={base - investedH - 72} style={headline(26, '#888')} textAnchor="middle">@ 7% avg</text>
        </g>

        <g transform={`translate(540, 1720) scale(${lossScale})`}>
          <rect x={-440} y={-80} width={880} height={160} rx={24} fill={ACCENT} />
          <text x={0} y={-10} style={headline(36, WHITE)} textAnchor="middle">YOU GAVE UP $138,000</text>
          <text x={0} y={58} style={headline(30, WHITE)} textAnchor="middle">IN FUTURE RETIREMENT MONEY</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── Scene 5: The free five-minute fix — rollover IRA ──
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const oldBoxOp = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = interpolate(frame, [55, 108], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const newBoxOp = interpolate(frame, [112, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkS1 = spring({ frame: frame - 142, fps: 30, config: { mass: 0.5, damping: 10 } });
  const checkS2 = spring({ frame: frame - 162, fps: 30, config: { mass: 0.5, damping: 10 } });
  const checkS3 = spring({ frame: frame - 182, fps: 30, config: { mass: 0.5, damping: 10 } });

  const arrowEndX = 460 + arrowProg * 200;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={145} style={headline(52, BLACK)} textAnchor="middle">THE FIX IS FREE.</text>
          <text x={540} y={225} style={headline(52, GREEN)} textAnchor="middle">5-MINUTE ROLLOVER.</text>
        </g>

        {/* Old employer box */}
        <g opacity={oldBoxOp}>
          <rect x={80} y={300} width={380} height={300} rx={22} fill="#E5E7EB" stroke="#CCCCCC" strokeWidth={4} />
          <rect x={200} y={350} width={140} height={110} rx={12} fill="#6B7280" />
          <rect x={235} y={332} width={70} height={30} rx={8} fill="none" stroke="#6B7280" strokeWidth={8} />
          <line x1={270} y1={350} x2={270} y2={460} stroke="#9CA3AF" strokeWidth={6} />
          <line x1={200} y1={405} x2={340} y2={405} stroke="#9CA3AF" strokeWidth={6} />
          <text x={270} y={512} style={headline(30, '#6B7280')} textAnchor="middle">OLD 401K</text>
          <text x={270} y={558} style={headline(36, BLACK)} textAnchor="middle">$20,000</text>
        </g>

        {/* Animated arrow */}
        <line
          x1={460}
          y1={450}
          x2={arrowEndX}
          y2={450}
          stroke={GREEN}
          strokeWidth={10}
          strokeLinecap="round"
        />
        {arrowProg > 0.5 && (
          <polygon
            points={`${arrowEndX + 2},450 ${arrowEndX - 28},432 ${arrowEndX - 28},468`}
            fill={GREEN}
          />
        )}

        {/* Coins moving along arrow */}
        {[0, 0.3, 0.6].map((offset, idx) => {
          const coinProg = Math.max(0, Math.min(1, arrowProg - offset));
          const coinX = 460 + coinProg * 200;
          return (
            <circle
              key={idx}
              cx={coinX}
              cy={440}
              r={16}
              fill="#FFD700"
              opacity={coinProg > 0 && coinProg < 1 ? 1 : 0}
            />
          );
        })}

        {/* New IRA piggy bank */}
        <g opacity={newBoxOp}>
          <rect x={620} y={300} width={380} height={300} rx={22} fill="#D1FAE5" stroke={GREEN} strokeWidth={5} />
          <ellipse cx={810} cy={430} rx={72} ry={58} fill="#F9A8D4" />
          <circle cx={860} cy={412} r={42} fill="#F9A8D4" />
          <ellipse cx={882} cy={424} rx={18} ry={14} fill="#F472B6" />
          <circle cx={870} cy={404} r={7} fill={BLACK} />
          <rect x={762} y={470} width={22} height={34} rx={7} fill="#F9A8D4" />
          <rect x={794} y={470} width={22} height={34} rx={7} fill="#F9A8D4" />
          <rect x={830} y={470} width={22} height={34} rx={7} fill="#F9A8D4" />
          <rect x={754} y={360} width={108} height={30} rx={8} fill="#BE185D" />
          <text x={808} y={381} style={headline(22, WHITE)} textAnchor="middle">ROLLOVER IRA</text>
          <text x={808} y={564} style={headline(36, GREEN)} textAnchor="middle">$20,000</text>
          <text x={808} y={518} style={headline(28, BLACK)} textAnchor="middle">SAFE!</text>
        </g>

        <g transform={`translate(540, 760) scale(${Math.min(checkS1, 1.05)})`}>
          <rect x={-430} y={-52} width={860} height={104} rx={18} fill={GREEN} />
          <text x={0} y={14} style={headline(34, WHITE)} textAnchor="middle">ZERO TAXES PAID</text>
        </g>
        <g transform={`translate(540, 900) scale(${Math.min(checkS2, 1.05)})`}>
          <rect x={-430} y={-52} width={860} height={104} rx={18} fill={GREEN} />
          <text x={0} y={14} style={headline(34, WHITE)} textAnchor="middle">ZERO 10% PENALTY</text>
        </g>
        <g transform={`translate(540, 1040) scale(${Math.min(checkS3, 1.05)})`}>
          <rect x={-430} y={-52} width={860} height={104} rx={18} fill={GREEN} />
          <text x={0} y={14} style={headline(34, WHITE)} textAnchor="middle">COMPOUNDING CONTINUES</text>
        </g>

        <g opacity={newBoxOp}>
          <text x={540} y={1240} style={headline(38, BLACK)} textAnchor="middle">ONE PHONE CALL.</text>
          <text x={540} y={1320} style={headline(38, BLACK)} textAnchor="middle">YOUR FUTURE SELF</text>
          <text x={540} y={1400} style={headline(38, GREEN)} textAnchor="middle">WILL THANK YOU.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// ── Scene 6: CTA — check for old 401ks right now ──
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneOp = interpolate(frame, [22, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeS = spring({ frame: frame - 90, fps: 30, config: { mass: 0.5, damping: 10 } });
  const badgeScale = Math.min(badgeS, 1.1);
  const ctaOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOp = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.6, 1, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g opacity={titleOp}>
          <text x={540} y={145} style={headline(54, WHITE)} textAnchor="middle">CHECK RIGHT NOW.</text>
          <text x={540} y={225} style={headline(50, ACCENT)} textAnchor="middle">DO YOU HAVE OLD</text>
          <text x={540} y={305} style={headline(50, ACCENT)} textAnchor="middle">401KS SITTING THERE?</text>
        </g>

        {/* Phone */}
        <g opacity={phoneOp}>
          <rect x={310} y={380} width={460} height={820} rx={48} fill="#1E1E1E" stroke="#333" strokeWidth={6} />
          <rect x={328} y={420} width={424} height={742} rx={30} fill="#0F172A" />
          <rect x={450} y={397} width={180} height={28} rx={14} fill="#111" />

          <rect x={348} y={448} width={384} height={68} rx={14} fill="#1E3A5C" />
          <text x={540} y={490} style={headline(28, WHITE)} textAnchor="middle">MY 401K ACCOUNTS</text>

          <rect x={348} y={535} width={384} height={110} rx={14} fill="#1A1A2E" />
          <text x={390} y={579} style={{ fontFamily: FONT, fontSize: 22, color: '#888' } as React.CSSProperties}>ACME CORP (2019-2022)</text>
          <text x={390} y={626} style={{ fontFamily: FONT, fontSize: 36, color: WHITE } as React.CSSProperties}>$20,000</text>
          <circle cx={698} cy={590} r={16} fill={ACCENT} opacity={pulseOp} />
          <text x={698} y={597} style={{ fontFamily: FONT, fontSize: 20, color: WHITE } as React.CSSProperties} textAnchor="middle">!</text>

          <rect x={348} y={668} width={384} height={80} rx={12} fill="#7C3AED" opacity={0.85} />
          <text x={540} y={714} style={headline(26, WHITE)} textAnchor="middle">ACTION NEEDED: ROLL OVER NOW</text>

          <line x1={348} y1={770} x2={732} y2={770} stroke="#2A2A2A" strokeWidth={2} />

          <rect x={348} y={790} width={384} height={110} rx={14} fill="#1A1A2E" />
          <text x={390} y={832} style={{ fontFamily: FONT, fontSize: 22, color: '#888' } as React.CSSProperties}>GLOBEX INC (2016-2019)</text>
          <text x={390} y={879} style={{ fontFamily: FONT, fontSize: 36, color: '#666' } as React.CSSProperties}>$11,400</text>
        </g>

        {/* $100K badge */}
        <g transform={`translate(540, 1300) scale(${badgeScale})`}>
          <rect x={-440} y={-80} width={880} height={160} rx={24} fill={GREEN} />
          <text x={0} y={-10} style={headline(38, WHITE)} textAnchor="middle">5-MIN ROLLOVER TODAY =</text>
          <text x={0} y={58} style={headline(58, WHITE)} textAnchor="middle">$100K+ AT RETIREMENT</text>
        </g>

        {/* CTA */}
        <g opacity={ctaOp}>
          <rect x={80} y={1460} width={920} height={130} rx={22} fill={ACCENT} />
          <text x={540} y={1518} style={headline(38, WHITE)} textAnchor="middle">FOLLOW FOR MORE</text>
          <text x={540} y={1572} style={headline(32, WHITE)} textAnchor="middle">MONEY MOVES LIKE THIS</text>
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
