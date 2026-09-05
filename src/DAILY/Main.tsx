import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const screenOp = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOp = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 10, stiffness: 200 } });
  const gapOp = interpolate(frame, [148, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapScale = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 12, stiffness: 140 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '60px 50px' }}>
        <p style={{ ...headline(36, WHITE), transform: `scale(${titleScale})` }}>RETIREMENT CALCULATOR</p>

        <svg width="400" height="270" viewBox="0 0 400 270">
          {/* Monitor housing */}
          <rect x="40" y="10" width="320" height="210" rx="10" fill="#222" />
          <rect x="50" y="20" width="300" height="190" rx="6" fill="#0d1117" opacity={screenOp} />
          {/* Stand */}
          <rect x="178" y="220" width="44" height="28" rx="4" fill="#333" />
          <rect x="148" y="244" width="104" height="14" rx="5" fill="#444" />
          {/* Calculator UI on screen */}
          <g opacity={screenOp}>
            <rect x="68" y="34" width="264" height="52" rx="5" fill="#0d2b1a" />
            <text x="324" y="68" textAnchor="end" fill="#10B981" fontSize="26" fontFamily="monospace" fontWeight="bold">ON TRACK &#x2713;</text>
            <rect x="68" y="98" width="264" height="14" rx="4" fill="#1a1a1a" />
            <rect x="68" y="98" width="198" height="14" rx="4" fill="#10B981" />
            <text x="200" y="130" textAnchor="middle" fill="#666" fontSize="13" fontFamily="Arial">75% funded</text>
            <rect x="68" y="144" width="264" height="12" rx="2" fill="#1a1a1a" />
            <rect x="68" y="162" width="220" height="12" rx="2" fill="#1a1a1a" />
            <rect x="68" y="180" width="180" height="12" rx="2" fill="#1a1a1a" />
          </g>
          {/* Red X overlay */}
          <g opacity={xOp} transform={`translate(200, 115) scale(${xScale})`}>
            <line x1="-72" y1="-72" x2="72" y2="72" stroke={ACCENT} strokeWidth="16" strokeLinecap="round" />
            <line x1="72" y1="-72" x2="-72" y2="72" stroke={ACCENT} strokeWidth="16" strokeLinecap="round" />
          </g>
        </svg>

        <div style={{ opacity: gapOp, transform: `scale(${gapScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(30, ACCENT), marginBottom: 8 }}>$847,000 GAP</p>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#aaa', textAlign: 'center', margin: 0, letterSpacing: '0.1em' }}>4 THINGS IT FORGOT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crossScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 120 } });
  const numOp = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [75, 175], [0, 315000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const subOp = interpolate(frame, [180, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(32, BLACK), opacity: titleOp }}>NUMBER ONE: HEALTHCARE</p>

        <svg width="380" height="220" viewBox="0 0 380 220">
          {/* Medical cross centered at (190, 110) */}
          <g transform={`translate(190, 110) scale(${crossScale})`}>
            <rect x="-32" y="-88" width="64" height="176" rx="10" fill={ACCENT} />
            <rect x="-88" y="-32" width="176" height="64" rx="10" fill={ACCENT} />
            <rect x="-24" y="-80" width="48" height="160" rx="6" fill={WHITE} opacity="0.12" />
            <rect x="-80" y="-24" width="160" height="48" rx="6" fill={WHITE} opacity="0.12" />
            <text x="0" y="14" textAnchor="middle" fill={WHITE} fontSize="42" fontFamily="Arial Black">$</text>
          </g>
          {/* Pill bottle right */}
          <g opacity={numOp}>
            <rect x="298" y="48" width="50" height="86" rx="7" fill="#999" />
            <rect x="295" y="40" width="56" height="18" rx="5" fill="#777" />
            <rect x="302" y="64" width="36" height="7" rx="2" fill={WHITE} opacity="0.5" />
            <rect x="302" y="78" width="36" height="7" rx="2" fill={WHITE} opacity="0.5" />
            <rect x="302" y="92" width="36" height="7" rx="2" fill={WHITE} opacity="0.5" />
          </g>
          {/* Stethoscope left */}
          <g opacity={numOp}>
            <circle cx="64" cy="92" r="26" fill="none" stroke={ACCENT} strokeWidth="5" />
            <path d="M 78 75 Q 98 42 106 74" fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <circle cx="106" cy="82" r="8" fill={ACCENT} />
          </g>
        </svg>

        <div style={{ opacity: numOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 15, color: '#666', margin: '0 0 6px', textAlign: 'center', letterSpacing: '0.08em' }}>AVERAGE COUPLE PAYS</p>
          <p style={{ ...headline(52, ACCENT) }}>${counterVal.toLocaleString()}</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#666', margin: '6px 0 0', textAlign: 'center', letterSpacing: '0.08em' }}>OUT-OF-POCKET IN RETIREMENT</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 17, color: '#888', textAlign: 'center', opacity: subOp, margin: 0, letterSpacing: '0.08em' }}>
          YOUR CALCULATOR HAS $0 FOR THIS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const youOp = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const irsOp = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 130 } });
  const subOp = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '60px 50px' }}>
        <p style={{ ...headline(34, WHITE), opacity: titleOp }}>NUMBER TWO: TAX DRAG</p>

        <svg width="380" height="250" viewBox="0 0 380 250">
          {/* YOU slice 78% — from (278,113) large-arc clockwise back to (190,40) */}
          <path
            d="M 190 130 L 278 113 A 90 90 0 1 1 190 40 Z"
            fill="#2d6a4f"
            opacity={youOp}
          />
          {/* IRS slice 22% — from top (190,40) small-arc clockwise to (278,113) */}
          <path
            d="M 190 130 L 190 40 A 90 90 0 0 1 278 113 Z"
            fill={ACCENT}
            opacity={irsOp}
          />
          <circle cx="190" cy="130" r="90" fill="none" stroke="#333" strokeWidth="2" opacity={youOp} />

          {/* YOU label */}
          <g opacity={youOp}>
            <text x="152" y="142" fill={WHITE} fontSize="20" fontFamily="Arial Black">YOU</text>
            <text x="150" y="162" fill="#9be8c8" fontSize="14" fontFamily="Arial">78%</text>
          </g>

          {/* IRS label */}
          <g opacity={irsOp}>
            <text x="244" y="68" fill={ACCENT} fontSize="16" fontFamily="Arial Black">IRS</text>
            <text x="242" y="86" fill={ACCENT} fontSize="13" fontFamily="Arial">22%</text>
            <line x1="240" y1="78" x2="224" y2="92" stroke={ACCENT} strokeWidth="1.5" />
          </g>
        </svg>

        <div style={{ opacity: irsOp, transform: `scale(${pctScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(20, '#aaa'), marginBottom: 6 }}>EVERY $1 SAVED IN YOUR 401K</p>
          <p style={{ ...headline(44, ACCENT) }}>22&#xA2; BELONGS TO THE IRS</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 16, color: '#666', textAlign: 'center', opacity: subOp, margin: 0 }}>
          NOT IN THE CALCULATOR
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chartOp = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Progress = interpolate(frame, [55, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Progress = interpolate(frame, [65, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const goodPoints: number[][] = [
    [0, 160], [30, 148], [60, 178], [90, 192], [120, 186], [150, 202], [180, 218], [210, 212], [240, 232], [270, 242], [300, 252]
  ];
  const badPoints: number[][] = [
    [0, 160], [30, 112], [60, 78], [90, 72], [120, 80], [150, 74], [180, 62], [210, 46], [240, 24], [270, 8], [300, 0]
  ];

  const makePathD = (points: number[][], progress: number): string => {
    const count = Math.max(2, Math.floor(points.length * progress));
    return points.slice(0, count).map((p, i) => `${i === 0 ? 'M' : 'L'} ${40 + p[0]} ${20 + (240 - p[1])}`).join(' ');
  };

  const goodD = makePathD(goodPoints, line1Progress);
  const badD = makePathD(badPoints, line2Progress);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '60px 50px' }}>
        <p style={{ ...headline(28, BLACK), opacity: titleOp }}>NUMBER THREE: SEQUENCE RISK</p>

        <svg width="400" height="300" viewBox="0 0 400 300" opacity={chartOp}>
          <rect x="40" y="20" width="310" height="240" rx="4" fill="#f9f9f9" stroke="#ddd" strokeWidth="1" />
          <line x1="40" y1="80" x2="350" y2="80" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="140" x2="350" y2="140" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="200" x2="350" y2="200" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="20" x2="40" y2="260" stroke="#ccc" strokeWidth="1.5" />
          <line x1="40" y1="260" x2="350" y2="260" stroke="#ccc" strokeWidth="1.5" />
          <text x="40" y="278" textAnchor="middle" fill="#999" fontSize="11" fontFamily="Arial">Year 0</text>
          <text x="195" y="278" textAnchor="middle" fill="#999" fontSize="11" fontFamily="Arial">Year 15</text>
          <text x="350" y="278" textAnchor="middle" fill="#999" fontSize="11" fontFamily="Arial">Year 30</text>
          <path d={goodD} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={badD} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <g opacity={labelOp}>
            <rect x="248" y="28" width="94" height="22" rx="4" fill="#10B981" opacity="0.15" />
            <text x="295" y="43" textAnchor="middle" fill="#10B981" fontSize="12" fontFamily="Arial Black">GOOD START</text>
            <rect x="248" y="196" width="94" height="22" rx="4" fill={ACCENT} opacity="0.15" />
            <text x="295" y="211" textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="Arial Black">BAD START</text>
            <text x="346" y="258" textAnchor="end" fill={ACCENT} fontSize="11" fontFamily="Arial Black">BROKE</text>
          </g>
        </svg>

        <p style={{ ...headline(19, BLACK), opacity: labelOp, margin: 0 }}>SAME SAVINGS. RETIRE 1 YEAR APART.</p>
        <p style={{ fontFamily: FONT, fontSize: 16, color: '#555', textAlign: 'center', opacity: labelOp, margin: 0 }}>ONE RUNS OUT 15 YEARS EARLY</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [22, 92], [0, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [68, 138], [0, 76], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [114, 184], [0, 38], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [138, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [184, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const baseline = 222;
  const bar1TopY = baseline - bar1H;
  const bar2TopY = baseline - bar2H;
  const bar3TopY = baseline - bar3H;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '60px 50px' }}>
        <p style={{ ...headline(26, BLACK), opacity: titleOp }}>NUMBER FOUR: REAL INFLATION</p>

        <svg width="400" height="280" viewBox="0 0 400 280">
          {/* Bar 1 — Today */}
          <rect x="55" y={bar1TopY} width="80" height={bar1H} rx="6" fill={ACCENT} />
          <text x="95" y={bar1TopY - 8} textAnchor="middle" fill={ACCENT} fontSize="15" fontFamily="Arial Black" opacity={labelOp}>$1,000</text>
          {/* Bar 2 — Year 11 */}
          <rect x="160" y={bar2TopY} width="80" height={bar2H} rx="6" fill={ACCENT} opacity="0.65" />
          <text x="200" y={bar2TopY - 8} textAnchor="middle" fill={ACCENT} fontSize="15" fontFamily="Arial Black" opacity={labelOp}>$512</text>
          {/* Bar 3 — Year 22 */}
          <rect x="265" y={bar3TopY} width="80" height={bar3H} rx="6" fill={ACCENT} opacity="0.35" />
          <text x="305" y={bar3TopY - 8} textAnchor="middle" fill={ACCENT} fontSize="15" fontFamily="Arial Black" opacity={labelOp}>$263</text>
          {/* Baseline */}
          <line x1="36" y1={baseline} x2="364" y2={baseline} stroke="#ccc" strokeWidth="2" />
          {/* X labels */}
          <g opacity={labelOp}>
            <text x="95" y={baseline + 22} textAnchor="middle" fill="#555" fontSize="14" fontFamily="Arial">Today</text>
            <text x="200" y={baseline + 22} textAnchor="middle" fill="#555" fontSize="14" fontFamily="Arial">Year 11</text>
            <text x="305" y={baseline + 22} textAnchor="middle" fill="#555" fontSize="14" fontFamily="Arial">Year 22</text>
            <text x="200" y={baseline + 44} textAnchor="middle" fill="#aaa" fontSize="12" fontFamily="Arial">buying power of $1,000 at 7% inflation</text>
          </g>
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 16, color: '#888', textAlign: 'center', opacity: subOp, margin: 0 }}>
          YOUR &#x201C;SAFE WITHDRAWAL&#x201D; GETS CUT IN HALF
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calc1Scale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 120 } });
  const calc2Scale = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 14, stiffness: 120 } });
  const xOp = interpolate(frame, [80, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [90, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [152, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 12, stiffness: 130 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '60px 50px' }}>
        <p style={{ ...headline(28, BLACK), opacity: titleOp }}>GET THE REAL NUMBER</p>

        <svg width="400" height="260" viewBox="0 0 400 260">
          {/* Calculator 1 — "On Track" (wrong), centered at (79, 130) */}
          <g transform={`translate(79, 130) scale(${calc1Scale})`}>
            <rect x="-65" y="-90" width="130" height="162" rx="10" fill="#e8f5e9" stroke="#10B981" strokeWidth="2" />
            <rect x="-52" y="-76" width="104" height="38" rx="4" fill="#c8e6c9" />
            <text x="0" y="-50" textAnchor="middle" fill="#10B981" fontSize="13" fontFamily="Arial Black">ON TRACK &#x2713;</text>
            <rect x="-50" y="-24" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="-12" y="-24" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="26" y="-24" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="-50" y="4" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="-12" y="4" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="26" y="4" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="-50" y="32" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="-12" y="32" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <rect x="26" y="32" width="30" height="22" rx="4" fill="#a5d6a7" opacity="0.5" />
            <text x="0" y="76" textAnchor="middle" fill="#888" fontSize="12" fontFamily="Arial">BASIC</text>
          </g>

          {/* Red X over Calculator 1 */}
          <g opacity={xOp}>
            <line x1="18" y1="44" x2="140" y2="216" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <line x1="140" y1="44" x2="18" y2="216" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Arrow between calculators */}
          <g opacity={arrowOp}>
            <line x1="168" y1="130" x2="228" y2="130" stroke={BLACK} strokeWidth="3" />
            <polygon points="228,122 228,138 242,130" fill={BLACK} />
          </g>

          {/* Calculator 2 — "$847K SHORT" (truth), centered at (315, 130) */}
          <g transform={`translate(315, 130) scale(${calc2Scale})`}>
            <rect x="-65" y="-90" width="130" height="162" rx="10" fill="#fff5f5" stroke={ACCENT} strokeWidth="2" />
            <rect x="-52" y="-76" width="104" height="38" rx="4" fill="#ffcdd2" />
            <text x="0" y="-62" textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="Arial Black">$847K</text>
            <text x="0" y="-48" textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="Arial Black">SHORT</text>
            <rect x="-50" y="-24" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="-12" y="-24" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="26" y="-24" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="-50" y="4" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="-12" y="4" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="26" y="4" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="-50" y="32" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="-12" y="32" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <rect x="26" y="32" width="30" height="22" rx="4" fill="#ffcdd2" opacity="0.5" />
            <text x="0" y="76" textAnchor="middle" fill="#888" fontSize="12" fontFamily="Arial">REAL</text>
          </g>
        </svg>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), marginBottom: 10 }}>FOLLOW FOR MORE</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#555', textAlign: 'center', margin: 0, letterSpacing: '0.08em' }}>
            FINANCIAL TRUTHS THEY DON&#x27;T TEACH
          </p>
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
