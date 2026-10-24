import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F8FAFC';
const ACCENT = '#3B82F6';
const ACCENT2 = '#93C5FD';
const WHITE = '#F1F5F9';
const BLACK = '#0F172A';
const GRAY = '#94A3B8';
const RED = '#EF4444';
const GREEN = '#10B981';
const GOLD = '#F59E0B';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─────────────────────────────────────────────────────────────
// SCENE 1: Big locked ROTH IRA door + small glowing BACKDOOR
// ─────────────────────────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY  = interpolate(frame, [8, 28], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const doorSc  = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const bdDelay = Math.max(0, frame - 60);
  const bdSc    = spring({ frame: bdDelay, fps, config: { damping: 12, stiffness: 100 } });
  const bdGlow  = interpolate(frame, [75, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noPulse = interpolate(frame, [30, 45, 60, 75], [1, 1.1, 1, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(58, WHITE), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          Locked Out<br />of a Roth IRA?
        </div>

        <svg width={540} height={500} viewBox="0 0 540 500">
          {/* BIG DOOR — ROTH IRA (locked) */}
          <g transform={`translate(185, 295) scale(${doorSc})`}>
            <path d="M -85,-220 Q -85,-270 0,-270 Q 85,-270 85,-220 L 85,28 L -85,28 Z"
              fill="#1E3A5F" stroke="#2563EB" strokeWidth={4} />
            <path d="M -70,-206 Q -70,-252 0,-252 Q 70,-252 70,-206 L 70,14 L -70,14 Z"
              fill="#1D4ED8" />
            <circle cx={52} cy={-80} r={9} fill={ACCENT2} />
            <text x={0} y={-150} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={22} fontWeight="bold">ROTH IRA</text>
            {/* NO ENTRY sign */}
            <g transform={`translate(0,-66) scale(${noPulse})`}>
              <circle cx={0} cy={0} r={42} fill={RED} />
              <circle cx={0} cy={0} r={34} fill={RED} stroke={WHITE} strokeWidth={5} />
              <rect x={-25} y={-7} width={50} height={14} rx={3} fill={WHITE} />
            </g>
            {/* Padlock */}
            <rect x={-16} y={12} width={32} height={22} rx={4} fill={GOLD} />
            <path d="M -10,12 L -10,-2 Q -10,-14 0,-14 Q 10,-14 10,-2 L 10,12"
              fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" />
          </g>

          {/* BACKDOOR — small, glowing */}
          <g transform={`translate(402, 398) scale(${bdSc})`}>
            <circle cx={0} cy={0} r={65} fill={ACCENT} opacity={bdGlow * 0.22} />
            <circle cx={0} cy={0} r={42} fill={ACCENT} opacity={bdGlow * 0.12} />
            <path d="M -36,-70 Q -36,-95 0,-95 Q 36,-95 36,-70 L 36,28 L -36,28 Z"
              fill="#1E3A5F" stroke={ACCENT} strokeWidth={3} />
            <path d="M -28,-62 Q -28,-83 0,-83 Q 28,-83 28,-62 L 28,20 L -28,20 Z"
              fill={ACCENT} />
            <circle cx={18} cy={-18} r={4} fill={WHITE} />
            <text x={0} y={46} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={15} fontWeight="bold">BACKDOOR</text>
          </g>

          {/* Dashed arrow to backdoor */}
          <g opacity={arrowOp}>
            <line x1={256} y1={358} x2={358} y2={385} stroke={ACCENT} strokeWidth={3} strokeDasharray="7,3" />
            <polygon points="365,379 370,394 356,391" fill={ACCENT} />
          </g>
        </svg>

        <div style={{ ...headline(36, ACCENT), opacity: subOp, marginTop: 28 }}>
          88% of high earners<br />have no idea it exists
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// SCENE 2: Income thermometer crosses $161K → Roth locked out
// ─────────────────────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp   = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProg   = interpolate(frame, [12, 88], [0, 0.85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lockDelay = Math.max(0, frame - 68);
  const lockSc    = spring({ frame: lockDelay, fps, config: { damping: 10, stiffness: 120 } });
  const subOp     = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Track: top y=50, bottom y=370, height=320
  const trackTop = 50;
  const trackH   = 320;
  const filledH  = trackH * barProg;
  // $161K = 161/260 ≈ 0.619 of bar
  const y161  = trackTop + trackH * (1 - 0.619);
  // $240K = 240/260 ≈ 0.923 of bar
  const y240  = trackTop + trackH * (1 - 0.923);

  const incomeVal = Math.floor(260000 * barProg);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(50, BLACK), opacity: titleOp, marginBottom: 45 }}>
          Earn too much?<br />IRS blocks your Roth
        </div>

        <svg width={520} height={460} viewBox="0 0 520 460">
          {/* Person silhouette (left) */}
          <g transform="translate(80, 200)">
            <circle cx={0} cy={-75} r={34} fill="#475569" />
            <rect x={-26} y={-40} width={52} height={68} rx={8} fill="#475569" />
            {/* Dollar signs above person */}
            <text x={0} y={-118} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={26} fontWeight="bold">$$$</text>
          </g>

          {/* Thermometer track */}
          <rect x={220} y={trackTop} width={58} height={trackH} rx={10} fill="#E2E8F0" />
          {/* Thermometer fill */}
          <rect x={220} y={trackTop + trackH - filledH} width={58} height={filledH} rx={10} fill={ACCENT} />
          {/* Bulb at bottom */}
          <circle cx={249} cy={trackTop + trackH + 18} r={28} fill={ACCENT} />
          {/* Income label */}
          <text x={249} y={trackTop + trackH + 24} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={14} fontWeight="bold">
            ${(incomeVal / 1000).toFixed(0)}K
          </text>

          {/* $161K threshold line */}
          <line x1={195} y1={y161} x2={290} y2={y161} stroke={GOLD} strokeWidth={3} strokeDasharray="8,4" />
          <text x={296} y={y161 - 4} fill={GOLD} fontFamily={FONT} fontSize={16} fontWeight="bold">$161K</text>
          <text x={296} y={y161 + 14} fill={GOLD} fontFamily={FONT} fontSize={13}>SINGLE</text>

          {/* $240K threshold line */}
          <line x1={195} y1={y240} x2={290} y2={y240} stroke={RED} strokeWidth={3} strokeDasharray="8,4" />
          <text x={296} y={y240 - 4} fill={RED} fontFamily={FONT} fontSize={16} fontWeight="bold">$240K</text>
          <text x={296} y={y240 + 14} fill={RED} fontFamily={FONT} fontSize={13}>MARRIED</text>

          {/* Piggy bank (right) */}
          <g transform="translate(440, 230)">
            <ellipse cx={0} cy={0} rx={52} ry={43} fill="#F9A8D4" />
            <ellipse cx={38} cy={-9} rx={11} ry={8} fill="#F9A8D4" />
            <circle cx={45} cy={-13} r={3} fill="#9D174D" />
            <rect x={-22} y={35} width={11} height={18} rx={3} fill="#F9A8D4" />
            <rect x={-4} y={37} width={11} height={18} rx={3} fill="#F9A8D4" />
            <rect x={14} y={35} width={11} height={18} rx={3} fill="#F9A8D4" />
            <rect x={-10} y={-41} width={20} height={5} rx={2} fill="#9D174D" />
            <text x={0} y={5} textAnchor="middle" fill="#9D174D" fontFamily={FONT} fontSize={12} fontWeight="bold">ROTH</text>
            {/* Padlock that appears when over limit */}
            <g transform={`scale(${lockSc})`}>
              <rect x={-15} y={-60} width={30} height={20} rx={4} fill={GOLD} />
              <path d="M -9,-60 L -9,-72 Q -9,-82 0,-82 Q 9,-82 9,-72 L 9,-60"
                fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
        </svg>

        <div style={{ ...headline(34, RED), opacity: subOp, marginTop: 18 }}>
          But there's a legal way<br />around this limit
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// SCENE 3: Step 1 — Contribute to Traditional IRA ($7,000)
// ─────────────────────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp  = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeDelay = Math.max(0, frame - 55);
  const badgeSc  = spring({ frame: badgeDelay, fps, config: { damping: 12, stiffness: 100 } });
  const counterV = Math.floor(interpolate(frame, [20, 100], [0, 7000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const subOp    = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 5 coins, each with offset delay falling into left bucket
  const coinData = [
    { cx: -22, delay: 15 },
    { cx:  5,  delay: 28 },
    { cx: -8,  delay: 40 },
    { cx: 18,  delay: 20 },
    { cx: -2,  delay: 52 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(50, WHITE), opacity: titleOp, marginBottom: 45 }}>
          Step 1:<br />Traditional IRA
        </div>

        <svg width={500} height={420} viewBox="0 0 500 420">
          {/* LEFT BUCKET — Traditional IRA */}
          <g transform="translate(130, 240)">
            {/* Bucket body */}
            <path d="M -70,-100 L -78,80 L 78,80 L 70,-100 Z" fill="#1E3A5F" stroke={ACCENT} strokeWidth={3} />
            {/* Bucket rim */}
            <ellipse cx={0} cy={-100} rx={70} ry={12} fill="#2563EB" />
            {/* TRADITIONAL label */}
            <text x={0} y={-62} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={14} fontWeight="bold">TRADITIONAL</text>
            <text x={0} y={-44} textAnchor="middle" fill={ACCENT2} fontFamily={FONT} fontSize={13}>IRA</text>
            {/* Money fill inside bucket */}
            <clipPath id="bucketClip">
              <path d="M -70,-100 L -78,80 L 78,80 L 70,-100 Z" />
            </clipPath>
            <rect x={-78} y={80 - 160 * (counterV / 7000)} width={156} height={160 * (counterV / 7000)}
              fill={GREEN} opacity={0.35} clipPath="url(#bucketClip)" />

            {/* Falling coins */}
            {coinData.map((c, i) => {
              const coinProgress = interpolate(
                Math.max(0, frame - c.delay), [0, 40], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const coinY = -100 - 80 + coinProgress * 100;
              const coinOp = coinProgress < 0.9 ? 1 : interpolate(coinProgress, [0.9, 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <g key={i} transform={`translate(${c.cx}, ${coinY})`} opacity={coinOp}>
                  <circle cx={0} cy={0} r={10} fill={GOLD} />
                  <text x={0} y={4} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={9} fontWeight="bold">$</text>
                </g>
              );
            })}
          </g>

          {/* Counter */}
          <text x={130} y={370} textAnchor="middle" fill={GOLD} fontFamily={FONT} fontSize={30} fontWeight="bold">
            ${counterV.toLocaleString()}
          </text>

          {/* RIGHT BUCKET — Roth IRA (still locked) */}
          <g transform="translate(370, 240)">
            <path d="M -70,-100 L -78,80 L 78,80 L 70,-100 Z" fill="#1E293B" stroke={GRAY} strokeWidth={2} strokeDasharray="6,3" />
            <ellipse cx={0} cy={-100} rx={70} ry={12} fill="#334155" />
            <text x={0} y={-62} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={14} fontWeight="bold">ROTH</text>
            <text x={0} y={-44} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={13}>IRA</text>
            {/* Lock */}
            <rect x={-16} y={-20} width={32} height={22} rx={4} fill={GRAY} />
            <path d="M -10,-20 L -10,-34 Q -10,-46 0,-46 Q 10,-46 10,-34 L 10,-20"
              fill="none" stroke={GRAY} strokeWidth={5} strokeLinecap="round" />
          </g>

          {/* NO INCOME LIMIT badge */}
          <g transform={`translate(250, 105) scale(${badgeSc})`}>
            <rect x={-105} y={-26} width={210} height={52} rx={26} fill={GREEN} />
            <text x={0} y={-6} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={16} fontWeight="bold">✓ NO INCOME LIMIT</text>
            <text x={0} y={14} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={13}>ANYONE CAN DO THIS</text>
          </g>
        </svg>

        <div style={{ ...headline(34, GREEN), opacity: subOp, marginTop: 18 }}>
          No income limit<br />on this step
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// SCENE 4: Step 2 — Convert Traditional → Roth (any income)
// ─────────────────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp  = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = interpolate(frame, [35, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelDelay = Math.max(0, frame - 80);
  const labelSc  = spring({ frame: labelDelay, fps, config: { damping: 12, stiffness: 100 } });
  const badgeDelay = Math.max(0, frame - 105);
  const badgeSc  = spring({ frame: badgeDelay, fps, config: { damping: 10, stiffness: 90 } });
  const subOp    = interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Animated dots along arrow (3 dots, staggered)
  const dotCount = 3;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const t = (arrowProg - i * 0.28) % 1;
    const dotT = Math.max(0, Math.min(1, t));
    const x = 150 + dotT * 200;
    const op = dotT > 0 && dotT < 0.95 ? 1 : 0;
    return { x, op };
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(50, BLACK), opacity: titleOp, marginBottom: 45 }}>
          Step 2:<br />Roth Conversion
        </div>

        <svg width={520} height={400} viewBox="0 0 520 400">
          {/* TRADITIONAL IRA box */}
          <rect x={20} y={140} width={160} height={100} rx={12} fill="#DBEAFE" stroke={ACCENT} strokeWidth={3} />
          <text x={100} y={182} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={15} fontWeight="bold">TRADITIONAL</text>
          <text x={100} y={202} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={14}>IRA</text>
          <text x={100} y={226} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={20} fontWeight="bold">$7,000</text>

          {/* ROTH IRA box */}
          <rect x={340} y={140} width={160} height={100} rx={12} fill="#DBEAFE" stroke={ACCENT} strokeWidth={3} />
          <text x={420} y={182} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={15} fontWeight="bold">ROTH</text>
          <text x={420} y={202} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={14}>IRA</text>
          <text x={420} y={226} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={20} fontWeight="bold">$7,000</text>

          {/* Arrow */}
          <line x1={180} y1={190} x2={332} y2={190} stroke={ACCENT} strokeWidth={4} />
          <polygon points="340,190 324,182 324,198" fill={ACCENT} />

          {/* Animated coins along arrow */}
          {dots.map((d, i) => (
            <g key={i} transform={`translate(${d.x}, 190)`} opacity={d.op}>
              <circle cx={0} cy={0} r={9} fill={GOLD} />
              <text x={0} y={4} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={8} fontWeight="bold">$</text>
            </g>
          ))}

          {/* ROTH CONVERSION label */}
          <g transform={`translate(260, 105) scale(${labelSc})`}>
            <text x={0} y={0} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={26} fontWeight="bold">ROTH CONVERSION</text>
          </g>

          {/* LEGAL AT ANY INCOME badge */}
          <g transform={`translate(260, 320) scale(${badgeSc})`}>
            <rect x={-128} y={-28} width={256} height={56} rx={28} fill={GREEN} />
            <text x={0} y={-6} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={17} fontWeight="bold">✓ LEGAL AT ANY INCOME</text>
            <text x={0} y={16} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={13}>IRS EXPLICITLY ALLOWS IT</text>
          </g>
        </svg>

        <div style={{ ...headline(34, ACCENT), opacity: subOp, marginTop: 18 }}>
          Do it within 1–2 days<br />of contributing
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// SCENE 5: The math — $287K tax-free vs $198K taxable
// ─────────────────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp  = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProg  = interpolate(frame, [20, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeDelay = Math.max(0, frame - 115);
  const badgeSc  = spring({ frame: badgeDelay, fps, config: { damping: 10, stiffness: 80 } });
  const subOp    = interpolate(frame, [138, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rothMax  = 287000;
  const taxMax   = 198000;
  const barMaxH  = 260;
  const rothH    = barMaxH * barProg;
  const taxH     = barMaxH * (taxMax / rothMax) * barProg;
  const rothVal  = Math.floor(rothMax * barProg);
  const taxVal   = Math.floor(taxMax * barProg);
  const baseY    = 370;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(50, WHITE), opacity: titleOp, marginBottom: 45 }}>
          20 years at 7%<br />returns
        </div>

        <svg width={500} height={450} viewBox="0 0 500 450">
          {/* ROTH bar */}
          <rect x={70} y={baseY - rothH} width={130} height={Math.max(0, rothH)} rx={6} fill={ACCENT} />
          <text x={135} y={baseY - rothH - 16} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize={22} fontWeight="bold">
            ${Math.floor(rothVal / 1000)}K
          </text>
          <text x={135} y={baseY + 20} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={14} fontWeight="bold">BACKDOOR</text>
          <text x={135} y={baseY + 38} textAnchor="middle" fill={ACCENT2} fontFamily={FONT} fontSize={13}>ROTH</text>
          <text x={135} y={baseY + 58} textAnchor="middle" fill={GREEN} fontFamily={FONT} fontSize={12}>TAX FREE</text>

          {/* TAXABLE bar */}
          <rect x={300} y={baseY - taxH} width={130} height={Math.max(0, taxH)} rx={6} fill={GRAY} />
          <text x={365} y={baseY - taxH - 16} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={22} fontWeight="bold">
            ${Math.floor(taxVal / 1000)}K
          </text>
          <text x={365} y={baseY + 20} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={14} fontWeight="bold">TAXABLE</text>
          <text x={365} y={baseY + 38} textAnchor="middle" fill={GRAY} fontFamily={FONT} fontSize={13}>ACCOUNT</text>
          <text x={365} y={baseY + 58} textAnchor="middle" fill={RED} fontFamily={FONT} fontSize={12}>31% TAX HIT</text>

          {/* $89K SAVED badge */}
          <g transform={`translate(250, 180) scale(${badgeSc})`}>
            <rect x={-90} y={-34} width={180} height={68} rx={12} fill={GOLD} />
            <text x={0} y={-10} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={28} fontWeight="bold">$89K</text>
            <text x={0} y={16} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize={14}>SAVED IN TAXES</text>
          </g>

          {/* Baseline */}
          <line x1={50} y1={baseY} x2={450} y2={baseY} stroke="#334155" strokeWidth={2} />
        </svg>

        <div style={{ ...headline(34, GOLD), opacity: subOp, marginTop: 18 }}>
          Zero tax at withdrawal.<br />That's the backdoor.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// SCENE 6: CTA — Ask your advisor, follow for more
// ─────────────────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personSc  = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleOp   = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY    = interpolate(frame, [35, 60], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const haloDelay = Math.max(0, frame - 25);
  const haloSc    = spring({ frame: haloDelay, fps, config: { damping: 10, stiffness: 70 } });
  const ctaOp     = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const followBounce = interpolate(
    frame, [120, 140, 160, 180],
    [0, -12, 0, -8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const followOp  = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        {/* Person with checkmark halo */}
        <svg width={280} height={320} viewBox="0 0 280 320" style={{ marginBottom: 30 }}>
          {/* Halo ring */}
          <g transform={`translate(140, 140) scale(${haloSc})`}>
            <circle cx={0} cy={0} r={120} fill="none" stroke={ACCENT} strokeWidth={4} strokeDasharray="12,6" opacity={0.6} />
            <circle cx={0} cy={0} r={100} fill="none" stroke={ACCENT} strokeWidth={2} opacity={0.3} />
          </g>
          {/* Person body */}
          <g transform={`translate(140, 155) scale(${personSc})`}>
            <circle cx={0} cy={-80} r={40} fill="#475569" />
            <rect x={-36} y={-38} width={72} height={90} rx={12} fill="#475569" />
          </g>
          {/* Checkmark above person */}
          <g transform={`translate(140, 50) scale(${haloSc})`}>
            <circle cx={0} cy={0} r={34} fill={ACCENT} />
            <polyline points="-14,2 -4,12 16,-12" fill="none" stroke={WHITE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* BACKDOOR ROTH title */}
        <div style={{ ...headline(52, ACCENT), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          Backdoor Roth
        </div>

        {/* CTA text */}
        <div style={{
          ...headline(30, BLACK),
          opacity: ctaOp,
          maxWidth: 780,
          letterSpacing: '0.04em',
          marginBottom: 20,
        }}>
          If your advisor hasn't<br />mentioned this —<br />ask them why
        </div>

        {/* Follow button */}
        <div style={{
          opacity: followOp,
          transform: `translateY(${followBounce}px)`,
          background: ACCENT,
          color: WHITE,
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 'bold',
          letterSpacing: '0.08em',
          padding: '18px 52px',
          borderRadius: 50,
          marginTop: 18,
        }}>
          FOLLOW ↓
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────────────────────────
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



