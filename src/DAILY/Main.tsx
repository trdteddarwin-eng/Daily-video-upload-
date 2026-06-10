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
const ACCENT = '#F59E0B';
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const personSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 80 } });
  const qSpring = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 8, stiffness: 140 } });

  const d1Y = interpolate(frame, [0, dur], [-80, 2000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2Y = interpolate(frame, [20, dur], [-80, 2000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3Y = interpolate(frame, [40, dur], [-80, 2000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={160} y={d1Y} fontSize={100} fill={ACCENT} opacity={0.12} textAnchor="middle" fontFamily={FONT} fontWeight="bold">$</text>
          <text x={900} y={d2Y} fontSize={80} fill={ACCENT} opacity={0.10} textAnchor="middle" fontFamily={FONT} fontWeight="bold">$</text>
          <text x={540} y={d3Y + 300} fontSize={70} fill={ACCENT} opacity={0.08} textAnchor="middle" fontFamily={FONT} fontWeight="bold">$</text>
          <text x={540} y={108} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={6}>THE RAISE TRAP</text>
          <g transform={`translate(540 430) scale(${titleSpring}) translate(-540 -430)`}>
            <text x={540} y={280} fontSize={138} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="900">TAX</text>
            <text x={540} y={440} fontSize={138} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="900">BRACKET</text>
            <text x={540} y={600} fontSize={138} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">MYTH</text>
          </g>
          <g transform={`translate(540 980) scale(${personSpring}) translate(-540 -980)`}>
            <circle cx={540} cy={860} r={80} fill={WHITE} />
            <rect x={490} y={940} width={100} height={150} rx={20} fill={WHITE} />
            <rect x={395} y={960} width={95} height={26} rx={13} fill={WHITE} transform="rotate(-40 443 973)" />
            <rect x={590} y={960} width={95} height={26} rx={13} fill={WHITE} transform="rotate(40 638 973)" />
            <rect x={500} y={1090} width={36} height={90} rx={14} fill={WHITE} />
            <rect x={544} y={1090} width={36} height={90} rx={14} fill={WHITE} />
            <circle cx={522} cy={848} r={10} fill={BG_DARK} />
            <circle cx={558} cy={848} r={10} fill={BG_DARK} />
            <line x1={508} y1={828} x2={530} y2={836} stroke={BG_DARK} strokeWidth={6} strokeLinecap="round" />
            <line x1={550} y1={836} x2={572} y2={828} stroke={BG_DARK} strokeWidth={6} strokeLinecap="round" />
            <path d="M524 882 Q540 872 556 882" stroke={BG_DARK} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
          <g transform={`translate(660 780) scale(${qSpring}) translate(-660 -780)`}>
            <text x={660} y={800} fontSize={130} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">?</text>
          </g>
          <text x={540} y={1680} fontSize={48} fill={WHITE} textAnchor="middle" fontFamily={FONT}>could a raise actually</text>
          <text x={540} y={1760} fontSize={52} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold">cost you money?</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const xProgress = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wrongSpring = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={110} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={6}>THE MYTH</text>
          <text x={540} y={260} fontSize={54} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="bold">what people THINK:</text>
          <g transform={`translate(560 900) scale(${bubbleSpring}) translate(-560 -900)`}>
            <circle cx={310} cy={1310} r={18} fill="#CCCCCC" />
            <circle cx={336} cy={1258} r={27} fill="#CCCCCC" />
            <circle cx={370} cy={1198} r={40} fill="#CCCCCC" />
            <ellipse cx={610} cy={900} rx={390} ry={295} fill="#CCCCCC" />
            <text x={610} y={808} fontSize={56} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">22% BRACKET</text>
            <text x={610} y={900} fontSize={48} fill={BLACK} textAnchor="middle" fontFamily={FONT}>= ALL income</text>
            <text x={610} y={978} fontSize={48} fill={BLACK} textAnchor="middle" fontFamily={FONT}>taxed at 22%</text>
          </g>
          <g opacity={xOpacity}>
            <line x1={230} y1={625} x2={230 + xProgress * 720} y2={625 + xProgress * 570} stroke={RED} strokeWidth={30} strokeLinecap="round" />
            <line x1={950} y1={625} x2={950 - xProgress * 720} y2={625 + xProgress * 570} stroke={RED} strokeWidth={30} strokeLinecap="round" />
          </g>
          <g transform={`translate(540 1460) scale(${wrongSpring}) translate(-540 -1460)`}>
            <text x={540} y={1490} fontSize={158} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="900">WRONG</text>
          </g>
          <text x={540} y={1680} fontSize={44} fill={BLACK} textAnchor="middle" fontFamily={FONT}>brackets only tax the</text>
          <text x={540} y={1755} fontSize={46} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold">dollars above the line</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar1W = interpolate(frame, [10, 70], [0, 700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [50, 110], [0, 560], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3W = interpolate(frame, [90, 150], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label3Op = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={110} fontSize={40} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>HOW IT ACTUALLY WORKS</text>
          <text x={540} y={250} fontSize={56} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">income gets taxed</text>
          <text x={540} y={330} fontSize={58} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">in LAYERS</text>
          <text x={80} y={520} fontSize={32} fill={WHITE} fontFamily={FONT} opacity={0.6}>$0 – $11,600</text>
          <rect x={80} y={535} width={bar1W} height={70} rx={8} fill={GREEN} />
          <text x={810} y={585} fontSize={44} fill={GREEN} fontFamily={FONT} fontWeight="bold" opacity={label1Op}>10%</text>
          <text x={80} y={710} fontSize={32} fill={WHITE} fontFamily={FONT} opacity={0.6}>$11,601 – $47,150</text>
          <rect x={80} y={725} width={bar2W} height={70} rx={8} fill={ACCENT} />
          <text x={660} y={775} fontSize={44} fill={ACCENT} fontFamily={FONT} fontWeight="bold" opacity={label2Op}>12%</text>
          <text x={80} y={900} fontSize={30} fill={WHITE} fontFamily={FONT} opacity={0.6}>$47,151+ (your raise lands here)</text>
          <rect x={80} y={915} width={bar3W} height={70} rx={8} fill={RED} />
          <text x={440} y={965} fontSize={44} fill={RED} fontFamily={FONT} fontWeight="bold" opacity={label3Op}>22%</text>
          <g opacity={arrowOp}>
            <line x1={500} y1={1080} x2={230} y2={958} stroke={WHITE} strokeWidth={4} strokeDasharray="14 8" />
            <circle cx={500} cy={1080} r={10} fill={WHITE} />
            <text x={520} y={1090} fontSize={38} fill={WHITE} fontFamily={FONT}>only this slice</text>
            <text x={520} y={1140} fontSize={38} fill={RED} fontFamily={FONT} fontWeight="bold">pays 22%</text>
            <text x={520} y={1190} fontSize={36} fill={WHITE} fontFamily={FONT} opacity={0.8}>not all your income</text>
          </g>
          <text x={540} y={1650} fontSize={44} fill={WHITE} textAnchor="middle" fontFamily={FONT}>every layer below stays</text>
          <text x={540} y={1730} fontSize={46} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="bold">at your lower rate</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalBarW = interpolate(frame, [10, 60], [0, 860], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const splitProgress = interpolate(frame, [80, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const keepW = Math.round(672 * splitProgress);
  const taxW = Math.round(188 * splitProgress);
  const keepNum = Math.floor(interpolate(frame, [80, 155], [0, 3900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const taxNum = Math.floor(interpolate(frame, [80, 155], [0, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const labelOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const neverSpring = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 140 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={110} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>THE REAL MATH</text>
          <text x={540} y={280} fontSize={90} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">$5,000</text>
          <text x={540} y={365} fontSize={44} fill={BLACK} textAnchor="middle" fontFamily={FONT}>RAISE — falls entirely in 22%</text>
          <rect x={110} y={440} width={860} height={16} rx={8} fill="#DDDDDD" />
          <rect x={110} y={440} width={totalBarW} height={16} rx={8} fill={BLACK} />
          <rect x={110} y={525} width={keepW} height={130} rx={10} fill={GREEN} />
          <rect x={110 + keepW + 8} y={525} width={taxW} height={130} rx={10} fill={ACCENT} />
          <text x={446} y={715} fontSize={44} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="bold" opacity={labelOp}>YOU KEEP</text>
          <text x={446} y={810} fontSize={108} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="900" opacity={labelOp}>${keepNum.toLocaleString()}</text>
          <text x={884} y={715} fontSize={38} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" opacity={labelOp}>TAXES</text>
          <text x={884} y={795} fontSize={64} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900" opacity={labelOp}>${taxNum.toLocaleString()}</text>
          <text x={540} y={1010} fontSize={42} fill={BLACK} textAnchor="middle" fontFamily={FONT}>even at 22% on the full raise</text>
          <text x={540} y={1075} fontSize={42} fill={BLACK} textAnchor="middle" fontFamily={FONT}>you still walk away with more</text>
          <g transform={`translate(540 1210) scale(${neverSpring}) translate(-540 -1210)`}>
            <rect x={60} y={1130} width={960} height={180} rx={20} fill={BLACK} />
            <text x={540} y={1222} fontSize={48} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">you can NEVER take home</text>
            <text x={540} y={1294} fontSize={50} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="900">less by earning MORE</text>
          </g>
          <text x={540} y={1630} fontSize={42} fill={BLACK} textAnchor="middle" fontFamily={FONT}>so why do workers still</text>
          <text x={540} y={1705} fontSize={44} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="bold">refuse raises? →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bigSpring = spring({ frame, fps, config: { damping: 10, stiffness: 60 } });
  const personSpring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 80 } });
  const moneyBarW = interpolate(frame, [60, 160], [800, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearCount = Math.floor(interpolate(frame, [110, 190], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const decadeSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 14, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={110} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold" letterSpacing={5}>THE REAL COST</text>
          <g transform={`translate(540 420) scale(${bigSpring}) translate(-540 -420)`}>
            <text x={540} y={400} fontSize={240} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="900">$8K</text>
          </g>
          <text x={540} y={520} fontSize={56} fill={WHITE} textAnchor="middle" fontFamily={FONT} fontWeight="bold">LOST PER YEAR</text>
          <text x={540} y={590} fontSize={38} fill={WHITE} textAnchor="middle" fontFamily={FONT} opacity={0.7}>by workers who avoid raises</text>
          <text x={110} y={678} fontSize={34} fill={WHITE} fontFamily={FONT} opacity={0.6}>annual wealth left behind</text>
          <rect x={110} y={693} width={860} height={50} rx={8} fill="#2A2A2A" />
          <rect x={110} y={693} width={moneyBarW} height={50} rx={8} fill={RED} />
          <g transform={`translate(540 960) scale(${personSpring}) translate(-540 -960)`}>
            <circle cx={700} cy={830} r={60} fill={WHITE} />
            <rect x={658} y={890} width={84} height={130} rx={16} fill={WHITE} />
            <rect x={666} y={1020} width={30} height={80} rx={12} fill={WHITE} />
            <rect x={704} y={1020} width={30} height={80} rx={12} fill={WHITE} />
            <rect x={558} y={895} width={100} height={24} rx={12} fill={WHITE} />
            <rect x={742} y={900} width={24} height={80} rx={12} fill={WHITE} />
            <circle cx={684} cy={818} r={8} fill={BG_DARK} />
            <circle cx={716} cy={818} r={8} fill={BG_DARK} />
            <path d="M688 856 Q700 846 712 856" stroke={BG_DARK} strokeWidth={5} fill="none" strokeLinecap="round" />
            <circle cx={420} cy={920} r={70} fill={ACCENT} />
            <text x={420} y={942} fontSize={64} fill={BG_DARK} textAnchor="middle" fontFamily={FONT} fontWeight="900">$</text>
            <rect x={396} y={848} width={48} height={30} rx={10} fill={ACCENT} />
            <ellipse cx={420} cy={852} rx={20} ry={10} fill="#8B6914" />
            <line x1={465} y1={862} x2={558} y2={900} stroke={RED} strokeWidth={10} strokeLinecap="round" />
            <line x1={558} y1={862} x2={465} y2={900} stroke={RED} strokeWidth={10} strokeLinecap="round" />
          </g>
          <g transform={`translate(540 1350) scale(${decadeSpring}) translate(-540 -1350)`}>
            <rect x={80} y={1270} width={920} height={170} rx={20} fill="#1E1E1E" />
            <text x={540} y={1362} fontSize={44} fill={WHITE} textAnchor="middle" fontFamily={FONT}>
              {yearCount} year{yearCount !== 1 ? 's' : ''} × $8,000 = ${(yearCount * 8000).toLocaleString()} lost
            </text>
            <text x={540} y={1425} fontSize={38} fill={ACCENT} textAnchor="middle" fontFamily={FONT}>over a decade: $80,000 gone</text>
          </g>
          <text x={540} y={1650} fontSize={40} fill={WHITE} textAnchor="middle" fontFamily={FONT}>all because of a myth that</text>
          <text x={540} y={1720} fontSize={42} fill={RED} textAnchor="middle" fontFamily={FONT} fontWeight="bold">someone wrong taught you →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const personSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 90 } });

  const confettiDefs = [
    { cx: 120, cy: 280, r: 22, color: ACCENT, delay: 10 },
    { cx: 960, cy: 240, r: 16, color: GREEN, delay: 20 },
    { cx: 200, cy: 580, r: 26, color: RED, delay: 5 },
    { cx: 880, cy: 480, r: 18, color: ACCENT, delay: 15 },
    { cx: 140, cy: 880, r: 20, color: GREEN, delay: 25 },
    { cx: 950, cy: 820, r: 16, color: ACCENT, delay: 8 },
    { cx: 300, cy: 190, r: 14, color: RED, delay: 30 },
    { cx: 800, cy: 170, r: 20, color: GREEN, delay: 12 },
    { cx: 80, cy: 1100, r: 18, color: ACCENT, delay: 35 },
    { cx: 1000, cy: 1050, r: 22, color: GREEN, delay: 18 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          {confettiDefs.map((c, i) => {
            const cs = spring({ frame: Math.max(0, frame - c.delay), fps, config: { damping: 8, stiffness: 120 } });
            return <circle key={i} cx={c.cx} cy={c.cy} r={c.r * cs} fill={c.color} opacity={0.8} />;
          })}
          <g transform={`translate(540 500) scale(${titleSpring}) translate(-540 -500)`}>
            <text x={540} y={360} fontSize={112} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">TAKE</text>
            <text x={540} y={490} fontSize={112} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">THE</text>
            <text x={540} y={620} fontSize={112} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="900">RAISE</text>
          </g>
          <g transform={`translate(540 980) scale(${personSpring}) translate(-540 -980)`}>
            <circle cx={700} cy={880} r={75} fill={ACCENT} />
            <text x={700} y={904} fontSize={68} fill={BLACK} textAnchor="middle" fontFamily={FONT} fontWeight="900">$</text>
            <rect x={674} y={802} width={52} height={32} rx={12} fill={ACCENT} />
            <ellipse cx={700} cy={808} rx={22} ry={11} fill="#8B6914" />
            <circle cx={370} cy={830} r={70} fill={BLACK} />
            <rect x={328} y={900} width={84} height={130} rx={16} fill={BLACK} />
            <rect x={336} y={1030} width={30} height={85} rx={12} fill={BLACK} />
            <rect x={374} y={1030} width={30} height={85} rx={12} fill={BLACK} />
            <rect x={258} y={895} width={70} height={24} rx={12} fill={BLACK} transform="rotate(-50 293 907)" />
            <rect x={412} y={895} width={110} height={24} rx={12} fill={BLACK} transform="rotate(-15 467 907)" />
            <circle cx={352} cy={818} r={9} fill={BG_LIGHT} />
            <circle cx={388} cy={818} r={9} fill={BG_LIGHT} />
            <path d="M348 856 Q370 874 392 856" stroke={BG_LIGHT} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
          <text x={540} y={1430} fontSize={44} fill={BLACK} textAnchor="middle" fontFamily={FONT}>every dollar you earn MORE</text>
          <text x={540} y={1508} fontSize={44} fill={GREEN} textAnchor="middle" fontFamily={FONT} fontWeight="bold">ALWAYS means more in your pocket</text>
          <rect x={80} y={1580} width={920} height={130} rx={20} fill={BLACK} />
          <text x={540} y={1643} fontSize={40} fill={WHITE} textAnchor="middle" fontFamily={FONT}>share this before someone</text>
          <text x={540} y={1698} fontSize={42} fill={ACCENT} textAnchor="middle" fontFamily={FONT} fontWeight="bold">says no to free money today</text>
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
