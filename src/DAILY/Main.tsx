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
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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

// Scene 1 — You're paying $270 to file taxes
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const amtSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const arrowProgress = interpolate(frame, [50, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleOp = interpolate(frame, [120, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={112} fontSize={40} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" letterSpacing={6}>THE TAX PREP TRAP</text>

          {/* $270 springs in large */}
          <g transform={`translate(540 540) scale(${amtSpring}) translate(-540 -540)`}>
            <text x={540} y={640} fontSize={240} fill={ACCENT} textAnchor="middle"
              fontFamily={FONT} fontWeight="900">$270</text>
          </g>
          <text x={540} y={750} fontSize={46} fill={WHITE} textAnchor="middle"
            fontFamily={FONT}>you pay this just to file your taxes</text>

          {/* Person (YOU) on left */}
          <g transform="translate(200 1100)">
            <circle cx={0} cy={-80} r={50} fill={WHITE} />
            <rect x={-36} y={-30} width={72} height={110} rx={10} fill={WHITE} />
            <rect x={-36} y={80} width={30} height={80} rx={8} fill={WHITE} />
            <rect x={6} y={80} width={30} height={80} rx={8} fill={WHITE} />
            <text x={0} y={190} fontSize={34} fill="#777" textAnchor="middle" fontFamily={FONT}>YOU</text>
          </g>

          {/* Tax preparer on right */}
          <g transform="translate(880 1100)">
            <circle cx={0} cy={-80} r={50} fill="#D4A573" />
            <rect x={-38} y={-30} width={76} height={115} rx={10} fill="#1E3A5F" />
            <polygon points="0,-22 -12,24 0,52 12,24" fill={ACCENT} />
            <rect x={-36} y={85} width={30} height={80} rx={8} fill="#1E3A5F" />
            <rect x={6} y={85} width={30} height={80} rx={8} fill="#1E3A5F" />
            <text x={0} y={200} fontSize={26} fill="#777" textAnchor="middle" fontFamily={FONT}>TAX PREPARER</text>
          </g>

          {/* Arrow with dollar signs from YOU to preparer */}
          <line x1={290} y1={1100} x2={300 + arrowProgress * 460} y2={1100}
            stroke={ACCENT} strokeWidth={8} strokeDasharray="20 10" />
          <text x={290 + arrowProgress * 230} y={1075} fontSize={44} fill={GREEN}
            textAnchor="middle" fontFamily={FONT} fontWeight="bold">$$$</text>

          {/* Subtitle */}
          <text x={540} y={1440} fontSize={52} fill={WHITE} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" opacity={subtitleOp}>every. single. year.</text>
          <text x={540} y={1520} fontSize={44} fill="#888" textAnchor="middle"
            fontFamily={FONT} opacity={subtitleOp}>but you never had to pay a dime →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};
// end-A

// Scene 2 — 60 million Americans pay for tax prep
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const countVal = Math.floor(
    interpolate(frame, [30, 170], [0, 60000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const industrySpring = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 10, stiffness: 90 } });

  const cols = 10;
  const rows = 6;
  const total = cols * rows;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={42} fill={ACCENT} textAnchor="middle"
              fontFamily={FONT} fontWeight="bold" letterSpacing={5}>60 MILLION AMERICANS</text>
          </g>
          <text x={540} y={196} fontSize={44} fill={BLACK} textAnchor="middle"
            fontFamily={FONT}>pay for tax prep every year</text>

          {/* Grid of 60 person icons */}
          {Array.from({ length: Math.max(0, Math.floor(total)) }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const px = 86 + col * 92;
            const py = 370 + row * 150;
            const pSpring = spring({ frame: Math.max(0, frame - 8 - i * 4), fps,
              config: { damping: 14, stiffness: 100 } });
            return (
              <g key={i} transform={`translate(${px} ${py}) scale(${pSpring}) translate(-${px} -${py})`}>
                <circle cx={px} cy={py - 22} r={16} fill={ACCENT} opacity={0.85} />
                <rect x={px - 13} y={py - 6} width={26} height={38} rx={8} fill={ACCENT} opacity={0.85} />
                <rect x={px - 8} y={py + 32} width={11} height={24} rx={4} fill={ACCENT} opacity={0.7} />
                <rect x={px + 4} y={py + 32} width={11} height={24} rx={4} fill={ACCENT} opacity={0.7} />
              </g>
            );
          })}

          {/* Animated counter */}
          <text x={540} y={1340} fontSize={42} fill={BLACK} textAnchor="middle" fontFamily={FONT}>that's</text>
          <text x={540} y={1480} fontSize={105} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="900">{countVal.toLocaleString()}</text>
          <text x={540} y={1560} fontSize={42} fill={BLACK} textAnchor="middle"
            fontFamily={FONT}>people paying unnecessarily</text>

          {/* $16B industry badge */}
          <g transform={`translate(540 1730) scale(${industrySpring}) translate(-540 -1730)`}>
            <rect x={80} y={1650} width={920} height={130} rx={20} fill={BLACK} />
            <text x={540} y={1718} fontSize={44} fill={WHITE} textAnchor="middle" fontFamily={FONT}>$16 billion dollar industry</text>
            <text x={540} y={1770} fontSize={38} fill={ACCENT} textAnchor="middle"
              fontFamily={FONT} fontWeight="bold">built on your ignorance →</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — IRS Free File exists; lobbying killed awareness
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laptopSpring = spring({ frame, fps, config: { damping: 14, stiffness: 75 } });
  const glowPulse = interpolate(frame, [20, 80, 130, 190], [0.35, 1, 0.35, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const moneyX = interpolate(frame, [120, 185], [170, 620], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelOp = interpolate(frame, [55, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={112} fontSize={40} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" letterSpacing={5}>IT'S BEEN FREE ALL ALONG</text>

          {/* Laptop with glowing screen */}
          <g transform={`translate(540 540) scale(${laptopSpring}) translate(-540 -540)`}>
            <rect x={200} y={330} width={680} height={440} rx={22} fill="#1a1a2e" stroke={WHITE} strokeWidth={8} />
            <rect x={222} y={354} width={636} height={394} rx={14} fill="#0a1628" opacity={glowPulse} />
            <text x={540} y={520} fontSize={56} fill={GREEN} textAnchor="middle"
              fontFamily={FONT} fontWeight="900">IRS</text>
            <text x={540} y={600} fontSize={74} fill={GREEN} textAnchor="middle"
              fontFamily={FONT} fontWeight="900">FREE FILE</text>
            <text x={540} y={660} fontSize={34} fill={WHITE} textAnchor="middle"
              fontFamily={FONT} opacity={0.8}>free.irs.gov</text>
            <rect x={165} y={768} width={750} height={56} rx={8} fill="#444" />
            <ellipse cx={540} cy={768} rx={78} ry={10} fill="#333" />
            <rect x={105} y={820} width={870} height={22} rx={11} fill="#555" />
          </g>

          <text x={540} y={970} fontSize={44} fill={WHITE} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" opacity={labelOp}>free for over 20 years</text>
          <text x={540} y={1038} fontSize={36} fill="#888" textAnchor="middle"
            fontFamily={FONT} opacity={labelOp}>so why haven't you heard of it?</text>

          {/* Money bag moving toward Capitol */}
          <g transform={`translate(${moneyX} 1190)`}>
            <ellipse cx={0} cy={0} rx={55} ry={65} fill="#22C55E" />
            <rect x={-20} y={-78} width={40} height={25} rx={10} fill="#16A34A" />
            <text x={0} y={8} fontSize={28} fill={WHITE} textAnchor="middle"
              fontFamily={FONT} fontWeight="bold">$6.6M</text>
          </g>
          <text x={400} y={1160} fontSize={34} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT}>lobbying money →</text>

          {/* Capitol building */}
          <g transform="translate(820 1280)">
            <ellipse cx={0} cy={-90} rx={78} ry={58} fill="#334155" />
            <rect x={-8} y={-148} width={16} height={58} fill="#475569" />
            <rect x={-130} y={-30} width={260} height={110} fill="#475569" />
            {[-88, -58, -28, 2, 32, 62, 88].map((bx, bi) => (
              <rect key={bi} x={bx - 8} y={-30} width={16} height={110} fill="#64748B" />
            ))}
            <rect x={-158} y={80} width={316} height={18} rx={4} fill="#94A3B8" />
            <rect x={-178} y={98} width={356} height={18} rx={4} fill="#94A3B8" />
          </g>

          <text x={540} y={1520} fontSize={42} fill={WHITE} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold">they spent millions to make sure</text>
          <text x={540} y={1592} fontSize={40} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT}>you kept paying them →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};
// end-B

// Scene 4 — $79K threshold: do you qualify?
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const barFill = interpolate(frame, [20, 110], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const thresholdOp = interpolate(frame, [100, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const checkSpring = spring({ frame: Math.max(0, frame - 132), fps, config: { damping: 8, stiffness: 120 } });
  const statSpring = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 90 } });

  const barLeft = 90;
  const barWidth = 900;
  const barY = 1140;
  const barH = 80;
  const threshX = barLeft + barWidth * 0.79;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={46} fill={ACCENT} textAnchor="middle"
              fontFamily={FONT} fontWeight="bold" letterSpacing={5}>DO YOU QUALIFY?</text>
          </g>
          <text x={540} y={224} fontSize={46} fill={BLACK} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold">earn under $79,000?</text>
          <text x={540} y={300} fontSize={42} fill="#555" textAnchor="middle"
            fontFamily={FONT}>IRS Free File is yours. Free.</text>

          {/* Big income threshold number */}
          <text x={540} y={640} fontSize={180} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="900">$79K</text>
          <text x={540} y={725} fontSize={44} fill={BLACK} textAnchor="middle"
            fontFamily={FONT}>income threshold</text>

          {/* Horizontal income bar */}
          <rect x={barLeft} y={barY} width={barWidth} height={barH} rx={barH / 2} fill="#E2E8F0" />
          <rect x={barLeft} y={barY} width={barWidth * barFill} height={barH}
            rx={barH / 2} fill={GREEN} />
          <text x={barLeft} y={barY + barH + 44} fontSize={30} fill={BLACK} fontFamily={FONT}>$0</text>
          <text x={barLeft + barWidth} y={barY + barH + 44} fontSize={30} fill={BLACK}
            textAnchor="end" fontFamily={FONT}>$100K+</text>

          {/* $79K threshold marker */}
          <line x1={threshX} y1={barY - 30} x2={threshX} y2={barY + barH + 30}
            stroke={ACCENT} strokeWidth={6} opacity={thresholdOp} />
          <text x={threshX} y={barY - 46} fontSize={34} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" opacity={thresholdOp}>$79K</text>

          {/* Checkmark */}
          <g transform={`translate(540 1380) scale(${checkSpring}) translate(-540 -1380)`}>
            <circle cx={540} cy={1380} r={68} fill={GREEN} />
            <polyline points="510,1380 533,1405 575,1355"
              fill="none" stroke={WHITE} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* 70% qualify stat */}
          <g transform={`translate(540 1660) scale(${statSpring}) translate(-540 -1660)`}>
            <rect x={80} y={1560} width={920} height={190} rx={24} fill={BLACK} />
            <text x={540} y={1655} fontSize={120} fill={GREEN} textAnchor="middle"
              fontFamily={FONT} fontWeight="900">70%</text>
            <text x={540} y={1732} fontSize={40} fill={WHITE} textAnchor="middle"
              fontFamily={FONT}>of all taxpayers qualify →</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — $270/yr invested → $21,600 over 30 years vs wasted
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const leftFill = interpolate(frame, [15, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightFill = interpolate(frame, [75, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bigNumSpring = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 8, stiffness: 100 } });
  const stealOp = interpolate(frame, [185, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barBottom = 1540;
  const maxBarH = 780;
  const leftBarMaxH = maxBarH * 0.1;
  const barW = 200;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <g transform={`translate(540 100) scale(${titleSpring}) translate(-540 -100)`}>
            <text x={540} y={115} fontSize={42} fill={ACCENT} textAnchor="middle"
              fontFamily={FONT} fontWeight="bold" letterSpacing={4}>THE REAL COST</text>
          </g>
          <text x={540} y={220} fontSize={44} fill={WHITE} textAnchor="middle"
            fontFamily={FONT}>invest that $270 instead...</text>

          {/* Left bar: small — $270/yr wasted */}
          <rect x={160} y={barBottom - leftBarMaxH * leftFill} width={barW}
            height={leftBarMaxH * leftFill} rx={12} fill={ACCENT} />
          <text x={260} y={barBottom + 50} fontSize={32} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold">$270/yr</text>
          <text x={260} y={barBottom + 90} fontSize={26} fill="#888" textAnchor="middle"
            fontFamily={FONT}>given to preparer</text>

          {/* VS label */}
          <text x={540} y={barBottom - maxBarH * 0.5} fontSize={60} fill={WHITE}
            textAnchor="middle" fontFamily={FONT} fontWeight="900">VS</text>

          {/* Right bar: tall — $21,600 if invested */}
          <rect x={720} y={barBottom - maxBarH * rightFill} width={barW}
            height={maxBarH * rightFill} rx={12} fill={GREEN} />
          <text x={820} y={barBottom + 50} fontSize={32} fill={GREEN} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold">$270/yr</text>
          <text x={820} y={barBottom + 90} fontSize={26} fill={GREEN} textAnchor="middle"
            fontFamily={FONT}>invested @ 7%</text>
          <text x={820} y={barBottom + 126} fontSize={24} fill="#888" textAnchor="middle"
            fontFamily={FONT}>for 30 years</text>

          {/* $21,600 springs in at top of right bar */}
          <g transform={`translate(820 ${barBottom - maxBarH - 70}) scale(${bigNumSpring}) translate(-820 -${barBottom - maxBarH - 70})`}>
            <text x={820} y={barBottom - maxBarH - 30} fontSize={90} fill={GREEN}
              textAnchor="middle" fontFamily={FONT} fontWeight="900">$21,600</text>
          </g>

          {/* Baseline */}
          <line x1={100} y1={barBottom} x2={980} y2={barBottom} stroke="#333" strokeWidth={4} />

          <text x={540} y={1830} fontSize={42} fill={WHITE} textAnchor="middle"
            fontFamily={FONT} opacity={stealOp}>quietly stolen from your future →</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};
// end-C

// Scene 6 — CTA: search IRS Free File right now
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const searchOp = interpolate(frame, [25, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const piggySpring = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 10, stiffness: 80 } });
  const badgeSpring = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 8, stiffness: 120 } });
  const ctaOp = interpolate(frame, [162, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={14} fill={ACCENT} />
          <rect x={0} y={1906} width={1080} height={14} fill={ACCENT} />
          <text x={540} y={112} fontSize={40} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" letterSpacing={5}>DO THIS RIGHT NOW</text>

          {/* Phone silhouette */}
          <g transform={`translate(540 500) scale(${phoneSpring}) translate(-540 -500)`}>
            <rect x={355} y={230} width={370} height={660} rx={40} fill={BLACK} />
            <rect x={373} y={250} width={334} height={620} rx={28} fill="#1E1E1E" />
            <rect x={455} y={238} width={110} height={14} rx={7} fill="#333" />
            {/* Search bar */}
            <rect x={390} y={282} width={298} height={54} rx={27} fill={WHITE} opacity={searchOp} />
            <text x={430} y={318} fontSize={24} fill={BLACK} fontFamily={FONT} opacity={searchOp}>IRS Free File</text>
            <circle cx={660} cy={309} r={16} fill="none" stroke="#888" strokeWidth={4} opacity={searchOp} />
            <line x1={671} y1={320} x2={681} y2={330} stroke="#888" strokeWidth={4}
              strokeLinecap="round" opacity={searchOp} />
            {/* Search result card */}
            <rect x={386} y={354} width={306} height={112} rx={12} fill={WHITE} opacity={searchOp} />
            <text x={406} y={390} fontSize={20} fill={GREEN} fontFamily={FONT}
              fontWeight="bold" opacity={searchOp}>freefile.irs.gov</text>
            <text x={406} y={416} fontSize={18} fill={BLACK} fontFamily={FONT} opacity={searchOp}>Free File — Do Your Federal</text>
            <text x={406} y={440} fontSize={18} fill={BLACK} fontFamily={FONT} opacity={searchOp}>Taxes for Free | IRS</text>
            {/* Home indicator */}
            <rect x={480} y={852} width={120} height={8} rx={4} fill="#333" />
          </g>

          {/* Piggy bank */}
          <g transform={`translate(540 1240) scale(${piggySpring}) translate(-540 -1240)`}>
            <ellipse cx={540} cy={1260} rx={105} ry={85} fill="#F9A8D4" />
            <circle cx={635} cy={1225} r={52} fill="#F9A8D4" />
            <ellipse cx={672} cy={1244} rx={22} ry={15} fill="#EC4899" />
            <circle cx={664} cy={1239} r={5} fill="#9D174D" />
            <circle cx={680} cy={1239} r={5} fill="#9D174D" />
            <circle cx={624} cy={1210} r={8} fill={BLACK} />
            <rect x={525} y={1180} width={30} height={8} rx={3} fill="#9D174D" />
            <rect x={484} y={1310} width={24} height={48} rx={9} fill="#F9A8D4" />
            <rect x={516} y={1310} width={24} height={48} rx={9} fill="#F9A8D4" />
            <rect x={556} y={1310} width={24} height={48} rx={9} fill="#F9A8D4" />
            <rect x={588} y={1310} width={24} height={48} rx={9} fill="#F9A8D4" />
          </g>

          {/* $270 SAVED badge */}
          <g transform={`translate(540 1488) scale(${badgeSpring}) translate(-540 -1488)`}>
            <rect x={260} y={1446} width={560} height={88} rx={22} fill={GREEN} />
            <text x={540} y={1505} fontSize={56} fill={WHITE} textAnchor="middle"
              fontFamily={FONT} fontWeight="900">$270 SAVED</text>
          </g>

          {/* CTA text */}
          <text x={540} y={1640} fontSize={46} fill={BLACK} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" opacity={ctaOp}>search: IRS Free File</text>
          <text x={540} y={1710} fontSize={40} fill={BLACK} textAnchor="middle"
            fontFamily={FONT} opacity={ctaOp}>invest that $270 instead.</text>
          <text x={540} y={1800} fontSize={40} fill={ACCENT} textAnchor="middle"
            fontFamily={FONT} fontWeight="bold" opacity={ctaOp}>your future self will thank you.</text>
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
