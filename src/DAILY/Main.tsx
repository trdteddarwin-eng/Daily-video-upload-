import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
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

// ─── Scene 1: Two retirees — same $1M, opposite outcomes ──────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [-80, 0]);

  const personOp = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badH = interpolate(frame, [80, 170], [160, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  const goodH = interpolate(frame, [80, 170], [160, 290], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOp = interpolate(frame, [155, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOp = interpolate(frame, [180, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badLabel = badH < 50 ? '$0' : '$1M';
  const goodLabel = goodH > 200 ? '$2.1M' : '$1M';

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100 }}>
        <div style={{ ...headline(68, ACCENT), transform: `translateY(${titleY}px)`, marginBottom: 40 }}>
          SAME MONEY.<br />DIFFERENT FATES.
        </div>

        <svg width={980} height={660} viewBox="0 0 980 660" style={{ opacity: personOp }}>
          {/* ── Left: Bad retiree (red) ── */}
          <circle cx={245} cy={65} r={52} fill={RED} />
          <rect x={205} y={122} width={80} height={115} rx={10} fill={RED} />
          <rect x={152} y={130} width={53} height={15} rx={7} fill={RED} />
          <rect x={285} y={130} width={53} height={15} rx={7} fill={RED} />
          <rect x={213} y={232} width={30} height={80} rx={8} fill={RED} />
          <rect x={252} y={232} width={30} height={80} rx={8} fill={RED} />
          {/* Briefcase */}
          <rect x={200} y={308} width={90} height={58} rx={6} fill={RED} opacity={0.85} />
          <rect x={223} y={301} width={44} height={13} rx={5} fill={RED} />
          <line x1={245} y1={308} x2={245} y2={366} stroke={WHITE} strokeWidth={2} opacity={0.6} />

          {/* Money stack bar */}
          <rect x={196} y={640 - badH} width={98} height={badH} rx={6} fill={RED} opacity={0.8} />
          <text x={245} y={640 - badH - 16} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={24} fontWeight="bold">{badLabel}</text>
          <text x={245} y={657} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOp}>RETIRED 2000</text>

          {/* ── Right: Good retiree (green) ── */}
          <circle cx={735} cy={65} r={52} fill={GREEN} />
          <rect x={695} y={122} width={80} height={115} rx={10} fill={GREEN} />
          <rect x={642} y={130} width={53} height={15} rx={7} fill={GREEN} />
          <rect x={775} y={130} width={53} height={15} rx={7} fill={GREEN} />
          <rect x={703} y={232} width={30} height={80} rx={8} fill={GREEN} />
          <rect x={742} y={232} width={30} height={80} rx={8} fill={GREEN} />
          {/* Briefcase */}
          <rect x={690} y={308} width={90} height={58} rx={6} fill={GREEN} opacity={0.85} />
          <rect x={713} y={301} width={44} height={13} rx={5} fill={GREEN} />
          <line x1={735} y1={308} x2={735} y2={366} stroke={WHITE} strokeWidth={2} opacity={0.6} />

          {/* Money stack bar */}
          <rect x={686} y={640 - goodH} width={98} height={goodH} rx={6} fill={GREEN} opacity={0.8} />
          <text x={735} y={640 - goodH - 16} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={24} fontWeight="bold">{goodLabel}</text>
          <text x={735} y={657} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOp}>RETIRED 2010</text>

          {/* VS */}
          <text x={490} y={310} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={60} fontWeight="bold">VS</text>
        </svg>

        <div style={{ ...headline(40, WHITE), opacity: subOp, marginTop: 8 }}>
          BOTH FOLLOWED THE SAME RULE
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: The 4% rule — what it is and where it breaks ────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const piggySp = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 12, stiffness: 85 } });
  const piggyScale = interpolate(piggySp, [0, 1], [0.2, 1]);

  const arrowOp = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleOp = interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const warnSp = spring({ frame: Math.max(0, frame - 130), fps: 30, config: { damping: 10, stiffness: 120 } });
  const warnScale = interpolate(warnSp, [0, 1], [0.7, 1]);
  const warnOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 115 }}>
        <div style={{ ...headline(66, BLACK), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          THE 4% RULE
        </div>

        {/* Piggy bank + arrow */}
        <svg
          width={900}
          height={440}
          viewBox="0 0 900 440"
          style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center center' }}
        >
          {/* Piggy bank body */}
          <ellipse cx={310} cy={270} rx={165} ry={145} fill="#FBCFE8" />
          {/* Head */}
          <circle cx={460} cy={220} r={88} fill="#FBCFE8" />
          {/* Snout */}
          <ellipse cx={530} cy={244} rx={38} ry={28} fill="#F9A8D4" />
          <circle cx={519} cy={244} r={8} fill="#DB2777" />
          <circle cx={541} cy={244} r={8} fill="#DB2777" />
          {/* Eye */}
          <circle cx={487} cy={193} r={11} fill={BLACK} />
          <circle cx={484} cy={190} r={3.5} fill={WHITE} />
          {/* Ear */}
          <ellipse cx={437} cy={145} rx={26} ry={36} fill="#F9A8D4" />
          {/* Legs */}
          <rect x={195} y={385} width={48} height={55} rx={10} fill="#FBCFE8" />
          <rect x={278} y={385} width={48} height={55} rx={10} fill="#FBCFE8" />
          <rect x={352} y={385} width={48} height={55} rx={10} fill="#FBCFE8" />
          <rect x={425} y={400} width={48} height={40} rx={10} fill="#FBCFE8" />
          {/* Coin slot */}
          <rect x={268} y={138} width={48} height={10} rx={4} fill={BLACK} />
          {/* Tail */}
          <path d="M148 262 Q122 232 142 202 Q162 172 138 152" stroke="#FBCFE8" strokeWidth={16} fill="none" strokeLinecap="round" />

          {/* 4% arrow out */}
          <g opacity={arrowOp}>
            <line x1={600} y1={265} x2={810} y2={265} stroke={ACCENT} strokeWidth={8} strokeLinecap="round" />
            <polygon points="820,265 800,252 800,278" fill={ACCENT} />
            <text x={715} y={247} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={32} fontWeight="bold">4%</text>
            <text x={715} y={296} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={20}>$40K / YEAR</text>
          </g>
        </svg>

        {/* Works text */}
        <div style={{ ...headline(46, GREEN), opacity: ruleOp, marginTop: 20 }}>
          WORKS 95% OF THE TIME...
        </div>

        {/* Warning */}
        <div style={{
          ...headline(34, RED),
          opacity: warnOp,
          transform: `scale(${warnScale})`,
          marginTop: 24,
          padding: '22px 44px',
          background: 'rgba(239,68,68,0.1)',
          borderRadius: 18,
          border: `3px solid ${RED}`,
        }}>
          ONLY IF MARKET COOPERATES EARLY
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Two diverging line charts — crash timing ────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartProg = interpolate(frame, [28, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOp = interpolate(frame, [158, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bad path points (x: 50→466, y: top=50 = $1M, bottom=490 = $0)
  const badPts: [number, number][] = [
    [50, 270], [76, 278], [102, 318], [128, 395], [154, 440],
    [180, 425], [206, 400], [232, 410], [258, 418], [284, 428],
    [310, 433], [336, 440], [362, 444], [388, 450], [414, 455],
    [440, 460], [466, 462],
  ];

  // Good path points (x: 530→946, y: declining toward top = growing portfolio)
  const goodPts: [number, number][] = [
    [530, 270], [556, 258], [582, 244], [608, 228], [634, 216],
    [660, 204], [686, 190], [712, 174], [738, 158], [764, 140],
    [790, 122], [816, 104], [842, 86], [868, 68], [894, 52],
    [920, 38], [946, 26],
  ];

  const visibleIdx = Math.max(1, Math.min(Math.floor(chartProg * (badPts.length - 1)), badPts.length - 1));

  const badPath = badPts
    .slice(0, visibleIdx + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`)
    .join(' ');

  const goodPath = goodPts
    .slice(0, visibleIdx + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`)
    .join(' ');

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 105 }}>
        <div style={{ ...headline(54, RED), opacity: titleOp, marginBottom: 38 }}>
          CRASH AT THE WRONG TIME
        </div>

        <svg width={1000} height={620} viewBox="0 0 1000 620">
          {/* ── Left chart: 2000 retiree ── */}
          <text x={258} y={26} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={28} fontWeight="bold">RETIRED 2000</text>
          <rect x={32} y={38} width={452} height={468} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
          <text x={28} y={58} textAnchor="end" fill={WHITE} fontFamily={FONT} fontSize={15}>$1M</text>
          <text x={28} y={500} textAnchor="end" fill={RED} fontFamily={FONT} fontSize={15}>$0</text>
          <text x={258} y={526} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={16}>YEARS IN RETIREMENT →</text>

          {/* Broke line */}
          <line x1={466} y1={38} x2={466} y2={506} stroke={RED} strokeWidth={2} strokeDasharray="7,4" opacity={labelOp} />
          <text x={458} y={548} textAnchor="end" fill={RED} fontFamily={FONT} fontSize={19} fontWeight="bold" opacity={labelOp}>BROKE 2016</text>

          <path d={badPath} stroke={RED} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* ── Right chart: 2010 retiree ── */}
          <text x={738} y={26} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={28} fontWeight="bold">RETIRED 2010</text>
          <rect x={516} y={38} width={452} height={468} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
          <text x={512} y={58} textAnchor="end" fill={GREEN} fontFamily={FONT} fontSize={15}>$2.1M</text>
          <text x={512} y={290} textAnchor="end" fill={WHITE} fontFamily={FONT} fontSize={15}>$1M</text>
          <text x={738} y={526} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={16}>YEARS IN RETIREMENT →</text>

          {/* Growing label */}
          <line x1={946} y1={38} x2={946} y2={506} stroke={GREEN} strokeWidth={2} strokeDasharray="7,4" opacity={labelOp} />
          <text x={958} y={58} textAnchor="start" fill={GREEN} fontFamily={FONT} fontSize={19} fontWeight="bold" opacity={labelOp}>$2.1M</text>

          <path d={goodPath} stroke={GREEN} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{ ...headline(38, WHITE), marginTop: 22 }}>
          SAME AVERAGE RETURNS. DIFFERENT ORDER.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: The hard numbers — bars showing depletion vs growth ─────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numProg = interpolate(frame, [35, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const badVal = interpolate(numProg, [0, 1], [1000000, 0]);
  const goodVal = interpolate(numProg, [0, 1], [1000000, 2100000]);

  const badBarH = interpolate(numProg, [0, 1], [340, 14]);
  const goodBarH = interpolate(numProg, [0, 1], [340, 570]);

  const labelOp = interpolate(frame, [162, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fmt = (n: number): string => {
    if (n < 5000) return '$0';
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
    return `$${Math.round(n / 1000)}K`;
  };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 108 }}>
        <div style={{ ...headline(58, BLACK), opacity: titleOp, marginBottom: 40 }}>
          THE REAL NUMBERS
        </div>

        <svg width={920} height={780} viewBox="0 0 920 780">
          {/* Floor line */}
          <line x1={50} y1={720} x2={870} y2={720} stroke={BLACK} strokeWidth={3} />

          {/* ── Bad retiree bar ── */}
          <rect x={120} y={720 - badBarH} width={190} height={badBarH} rx={8} fill={RED} opacity={0.85} />
          <text x={215} y={Math.max(720 - badBarH - 16, 28)} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={30} fontWeight="bold">
            {fmt(badVal)}
          </text>
          <text x={215} y={750} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={22} fontWeight="bold">2000 RETIREE</text>
          <text x={215} y={778} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOp}>
            BROKE BY 2016
          </text>

          {/* ── VS center ── */}
          <text x={460} y={440} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={52} fontWeight="bold">VS</text>
          <text x={460} y={492} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={20}>SAME 4% RULE</text>

          {/* ── Good retiree bar ── */}
          <rect x={610} y={720 - goodBarH} width={190} height={Math.min(goodBarH, 692)} rx={8} fill={GREEN} opacity={0.85} />
          <text x={705} y={Math.max(720 - goodBarH - 16, 28)} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={30} fontWeight="bold">
            {fmt(goodVal)}
          </text>
          <text x={705} y={750} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={22} fontWeight="bold">2010 RETIREE</text>
          <text x={705} y={778} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOp}>
            STILL GROWING
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Three protection strategies ────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s1Sp = spring({ frame: Math.max(0, frame - 28), fps: 30, config: { damping: 14, stiffness: 90 } });
  const s2Sp = spring({ frame: Math.max(0, frame - 75), fps: 30, config: { damping: 14, stiffness: 90 } });
  const s3Sp = spring({ frame: Math.max(0, frame - 122), fps: 30, config: { damping: 14, stiffness: 90 } });

  const s1Scale = interpolate(s1Sp, [0, 1], [0, 1]);
  const s2Scale = interpolate(s2Sp, [0, 1], [0, 1]);
  const s3Scale = interpolate(s3Sp, [0, 1], [0, 1]);

  const captionOp = interpolate(frame, [158, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 98 }}>
        <div style={{ ...headline(60, ACCENT), opacity: titleOp, marginBottom: 52 }}>
          HOW TO PROTECT YOURSELF
        </div>

        <svg width={1000} height={860} viewBox="0 0 1000 860">
          {/* Shield 1 — top left */}
          <g transform={`translate(168, 195) scale(${s1Scale})`}>
            <path d="M0,-105 L82,-68 L82,38 Q82,98 0,125 Q-82,98 -82,38 L-82,-68 Z" fill={ACCENT} opacity={0.9} />
            {/* Piggy bank icon */}
            <ellipse cx={0} cy={-30} rx={32} ry={28} fill={BLACK} opacity={0.3} />
            <circle cx={22} cy={-35} r={6} fill={BLACK} opacity={0.3} />
            <rect x={-8} y={-62} width={16} height={6} rx={3} fill={BLACK} opacity={0.4} />
            <text y={30} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={20} fontWeight="bold">CASH BUFFER</text>
            <text y={56} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={16}>1-2 YRS EXPENSES</text>
            <text y={-70} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={44} fontWeight="bold">1</text>
          </g>

          {/* Shield 2 — bottom center */}
          <g transform={`translate(500, 530) scale(${s2Scale})`}>
            <path d="M0,-105 L82,-68 L82,38 Q82,98 0,125 Q-82,98 -82,38 L-82,-68 Z" fill={ACCENT} opacity={0.9} />
            {/* Graph icon */}
            <polyline points="-40,10 -15,-20 12,0 38,-38" stroke={BLACK} strokeWidth={5} fill="none" strokeLinejoin="round" opacity={0.4} />
            <text y={30} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={18} fontWeight="bold">FLEX WITHDRAWALS</text>
            <text y={56} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={15}>CUT 10% IN DOWN YEARS</text>
            <text y={-70} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={44} fontWeight="bold">2</text>
          </g>

          {/* Shield 3 — top right */}
          <g transform={`translate(832, 195) scale(${s3Scale})`}>
            <path d="M0,-105 L82,-68 L82,38 Q82,98 0,125 Q-82,98 -82,38 L-82,-68 Z" fill={ACCENT} opacity={0.9} />
            {/* Calendar icon */}
            <rect x={-32} y={-48} width={64} height={52} rx={6} fill={BLACK} opacity={0.3} />
            <rect x={-32} y={-48} width={64} height={14} rx={6} fill={BLACK} opacity={0.35} />
            <line x1={-14} y1={-52} x2={-14} y2={-44} stroke={BLACK} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
            <line x1={14} y1={-52} x2={14} y2={-44} stroke={BLACK} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
            <text y={30} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={20} fontWeight="bold">GUARD YEAR</text>
            <text y={56} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={15}>DELAY IF MARKET CRASHES</text>
            <text y={-70} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={44} fontWeight="bold">3</text>
          </g>

          {/* Connecting dotted lines */}
          <path d="M250,290 Q375,420 418,432" stroke={ACCENT} strokeWidth={2} strokeDasharray="8,5" fill="none" opacity={0.35} />
          <path d="M750,290 Q625,420 582,432" stroke={ACCENT} strokeWidth={2} strokeDasharray="8,5" fill="none" opacity={0.35} />
        </svg>

        <div style={{ ...headline(38, WHITE), opacity: captionOp, marginTop: -26 }}>
          ANY ONE OF THESE SAVES YOUR RETIREMENT
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — timing matters as much as saving ─────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [70, 0]);

  const dartOp = interpolate(frame, [28, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dartSp = spring({ frame: Math.max(0, frame - 28), fps: 30, config: { damping: 12, stiffness: 100 } });
  const dartScale = interpolate(dartSp, [0, 1], [0.4, 1]);

  const statOp = interpolate(frame, [85, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSp = spring({ frame: Math.max(0, frame - 145), fps: 30, config: { damping: 10, stiffness: 100 } });
  const ctaScale = interpolate(ctaSp, [0, 1], [0.75, 1]);
  const ctaOp = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 108 }}>
        <div style={{ ...headline(62, BLACK), transform: `translateY(${titleY}px)`, marginBottom: 42 }}>
          TIMING MATTERS<br />AS MUCH AS SAVING
        </div>

        {/* Dartboard */}
        <svg
          width={500}
          height={500}
          viewBox="0 0 500 500"
          style={{ opacity: dartOp, transform: `scale(${dartScale})`, transformOrigin: 'center center' }}
        >
          <circle cx={250} cy={250} r={230} fill="#1a1a2e" />
          <circle cx={250} cy={250} r={192} fill="#c0392b" />
          <circle cx={250} cy={250} r={154} fill="#1a1a2e" />
          <circle cx={250} cy={250} r={116} fill="#c0392b" />
          <circle cx={250} cy={250} r={78} fill="#1a1a2e" />
          <circle cx={250} cy={250} r={40} fill="#c0392b" />
          <circle cx={250} cy={250} r={16} fill={BLACK} />
          {/* Dart hitting outer ring (wrong zone) */}
          <g transform="translate(380, 78) rotate(132)">
            <rect x={-4} y={-58} width={8} height={76} rx={3} fill="#9CA3AF" />
            <polygon points="0,0 -10,-22 10,-22" fill={ACCENT} />
            <polygon points="0,-58 -14,-88 0,-73" fill={RED} opacity={0.85} />
            <polygon points="0,-58 14,-88 0,-73" fill={RED} opacity={0.85} />
          </g>
          {/* Wrong year label */}
          <text x={385} y={148} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={22} fontWeight="bold">WRONG</text>
          <text x={385} y={174} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={20}>YEAR</text>
        </svg>

        {/* Stats */}
        <div style={{ opacity: statOp, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 28, gap: 10 }}>
          <div style={{ ...headline(38, BLACK) }}>MOST CALCULATORS IGNORE THIS</div>
          <div style={{ fontFamily: FONT, fontSize: 28, color: GRAY, textAlign: 'center' as const, letterSpacing: '0.04em' }}>
            They use averages — not real sequences
          </div>
        </div>

        {/* CTA */}
        <div style={{
          ...headline(44, BLACK),
          opacity: ctaOp,
          transform: `scale(${ctaScale})`,
          marginTop: 44,
          background: ACCENT,
          padding: '26px 56px',
          borderRadius: 20,
        }}>
          FOLLOW FOR RETIREMENT TRUTH
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
