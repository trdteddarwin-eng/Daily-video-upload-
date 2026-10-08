import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
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

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const pile1Scale = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 16, stiffness: 70 } });
  const pile2Scale = spring({ frame: Math.max(0, frame - 44), fps, config: { damping: 16, stiffness: 70 } });
  const arrowOp = interpolate(frame, [68, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buildingOp = interpolate(frame, [84, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleOp = interpolate(frame, [130, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowBounce = interpolate(frame % 36, [0, 18, 36], [0, -10, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '100px 60px 60px',
      }}>
        <p style={{ ...headline(42, ACCENT), transform: `scale(${titleScale})`, marginBottom: 40 }}>
          YOU'RE BETTING TWICE
        </p>

        <svg width="700" height="460" viewBox="0 0 700 460">
          {/* Salary coin stack */}
          <g transform={`translate(115, 230) scale(${pile1Scale})`}>
            <ellipse cx="0" cy="52" rx="62" ry="17" fill="#F59E0B" />
            <rect x="-62" y="0" width="124" height="52" fill="#D97706" />
            <ellipse cx="0" cy="0" rx="62" ry="17" fill="#F59E0B" />
            <ellipse cx="0" cy="-22" rx="62" ry="17" fill="#D97706" />
            <ellipse cx="0" cy="-44" rx="62" ry="17" fill="#F59E0B" />
            <text x="0" y="84" textAnchor="middle" fill={WHITE}
              fontFamily="Arial Black, sans-serif" fontSize="24">SALARY</text>
          </g>

          {/* 401k coin stack */}
          <g transform={`translate(585, 230) scale(${pile2Scale})`}>
            <ellipse cx="0" cy="52" rx="62" ry="17" fill={ACCENT} />
            <rect x="-62" y="0" width="124" height="52" fill="#DC2626" />
            <ellipse cx="0" cy="0" rx="62" ry="17" fill={ACCENT} />
            <ellipse cx="0" cy="-22" rx="62" ry="17" fill="#DC2626" />
            <ellipse cx="0" cy="-44" rx="62" ry="17" fill={ACCENT} />
            <text x="0" y="84" textAnchor="middle" fill={WHITE}
              fontFamily="Arial Black, sans-serif" fontSize="24">401K</text>
          </g>

          {/* Arrows from both stacks to building */}
          <g transform={`translate(0, ${arrowBounce})`} opacity={arrowOp}>
            <line x1="200" y1="234" x2="306" y2="298" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
            <polygon points="300,289 318,307 292,311" fill="#F59E0B" />
            <line x1="500" y1="234" x2="394" y2="298" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <polygon points="400,289 382,307 408,311" fill={ACCENT} />
          </g>

          {/* Company building */}
          <g opacity={buildingOp}>
            <rect x="302" y="308" width="96" height="130" fill="#3a3a3a" />
            <rect x="316" y="323" width="20" height="20" rx="2" fill="#F59E0B" opacity={0.9} />
            <rect x="344" y="323" width="20" height="20" rx="2" fill="#555" />
            <rect x="372" y="323" width="20" height="20" rx="2" fill="#F59E0B" opacity={0.9} />
            <rect x="316" y="357" width="20" height="20" rx="2" fill="#555" />
            <rect x="344" y="357" width="20" height="20" rx="2" fill="#F59E0B" opacity={0.9} />
            <rect x="372" y="357" width="20" height="20" rx="2" fill="#555" />
            <rect x="328" y="408" width="44" height="30" rx="3" fill="#1a1a1a" />
            <polygon points="292,313 350,266 408,313" fill="#4a4a4a" />
            <line x1="350" y1="266" x2="350" y2="240" stroke="#555" strokeWidth="4" />
            <circle cx="350" cy="236" r="7" fill={ACCENT} />
          </g>
        </svg>

        <p style={{
          fontFamily: FONT,
          fontSize: 30,
          color: WHITE,
          textAlign: 'center',
          opacity: subtitleOp,
          lineHeight: 1.3,
          marginTop: 0,
        }}>
          Both bets on the same company
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const bar1W = interpolate(frame, [25, 96], [0, 336], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bar2W = interpolate(frame, [62, 122], [0, 120], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const pct1Op = interpolate(frame, [92, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pct2Op = interpolate(frame, [120, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 12, stiffness: 90 } });
  const badgeOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '110px 80px 60px',
      }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleScale})`, marginBottom: 52 }}>
          THE DANGER ZONE
        </p>

        <div style={{ width: '100%', maxWidth: 640 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, marginBottom: 12, letterSpacing: '0.08em' }}>
            AVERAGE WORKER HOLDS
          </p>
          <div style={{
            position: 'relative', height: 70,
            background: '#e5e7eb', borderRadius: 14, overflow: 'hidden', marginBottom: 8,
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: bar1W, height: 70,
              background: ACCENT, borderRadius: 14,
            }} />
          </div>
          <p style={{
            fontFamily: FONT, fontSize: 42, color: ACCENT,
            textAlign: 'right', margin: '0 0 44px', opacity: pct1Op,
          }}>14%</p>

          <p style={{ fontFamily: FONT, fontSize: 26, color: '#10B981', marginBottom: 12, letterSpacing: '0.08em' }}>
            SAFE LIMIT
          </p>
          <div style={{
            position: 'relative', height: 70,
            background: '#e5e7eb', borderRadius: 14, overflow: 'hidden', marginBottom: 8,
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: bar2W, height: 70,
              background: '#10B981', borderRadius: 14,
            }} />
          </div>
          <p style={{
            fontFamily: FONT, fontSize: 42, color: '#10B981',
            textAlign: 'right', margin: 0, opacity: pct2Op,
          }}>5%</p>
        </div>

        <div style={{
          opacity: badgeOp, transform: `scale(${badgeScale})`,
          background: ACCENT, borderRadius: 24, padding: '22px 48px', marginTop: 48,
        }}>
          <p style={{ ...headline(40, WHITE), margin: 0 }}>$47,000 AT RISK</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const crashProgress = interpolate(frame, [28, 132], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  const stockPts: [number, number][] = [
    [0, 60], [55, 55], [105, 62], [155, 54], [205, 58], [245, 52],
    [280, 55], [305, 52], [328, 58], [348, 88], [368, 140],
    [385, 198], [400, 242], [415, 265], [435, 278], [460, 282],
  ];

  const numVisible = Math.max(1, Math.min(stockPts.length, Math.floor(crashProgress * stockPts.length) + 1));
  const visPts = stockPts.slice(0, numVisible);
  const pathD = visPts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt[0]},${pt[1]}`).join(' ');
  const areaD = visPts.length > 1
    ? pathD + ` L${visPts[visPts.length - 1][0]},300 L0,300 Z`
    : '';
  const lastPt = visPts[visPts.length - 1];

  const piggyOp = interpolate(frame, [110, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOp = interpolate(frame, [156, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackScale = spring({ frame: Math.max(0, frame - 156), fps, config: { damping: 8, stiffness: 120 } });
  const statOp = interpolate(frame, [178, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '110px 60px 40px',
      }}>
        <p style={{ ...headline(38, WHITE), transform: `scale(${titleScale})`, marginBottom: 24 }}>
          ENRON 2001
        </p>

        <svg width="680" height="296" viewBox="-12 0 484 296">
          <line x1="0" y1="80" x2="460" y2="80" stroke="#2a2a2a" strokeWidth="1" />
          <line x1="0" y1="160" x2="460" y2="160" stroke="#2a2a2a" strokeWidth="1" />
          <line x1="0" y1="240" x2="460" y2="240" stroke="#2a2a2a" strokeWidth="1" />
          <text x="-10" y="64" textAnchor="end" fill="#555" fontFamily="Arial, sans-serif" fontSize="18">$90</text>
          <text x="-10" y="166" textAnchor="end" fill="#555" fontFamily="Arial, sans-serif" fontSize="18">$45</text>
          <text x="-10" y="290" textAnchor="end" fill="#555" fontFamily="Arial, sans-serif" fontSize="18">$0</text>
          {areaD && <path d={areaD} fill="#EF444418" />}
          <path d={pathD} fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={lastPt[0]} cy={lastPt[1]} r="9" fill={ACCENT} />
        </svg>

        <svg width="220" height="126" viewBox="0 0 220 126" opacity={piggyOp} style={{ marginTop: -4 }}>
          <ellipse cx="98" cy="76" rx="78" ry="56" fill="#F9A8D4" />
          <ellipse cx="168" cy="84" rx="24" ry="18" fill="#F472B6" />
          <circle cx="163" cy="80" r="5" fill="#DB2777" />
          <circle cx="175" cy="80" r="5" fill="#DB2777" />
          <circle cx="140" cy="58" r="7" fill="white" />
          <circle cx="142" cy="59" r="3.5" fill="#1a1a1a" />
          <ellipse cx="72" cy="26" rx="13" ry="20" fill="#F472B6" />
          <ellipse cx="72" cy="26" rx="8" ry="13" fill="#F9A8D4" />
          <rect x="58" y="118" width="18" height="8" rx="4" fill="#F472B6" />
          <rect x="84" y="118" width="18" height="8" rx="4" fill="#F472B6" />
          <rect x="110" y="118" width="18" height="8" rx="4" fill="#F472B6" />
          <rect x="136" y="118" width="18" height="8" rx="4" fill="#F472B6" />
          <g opacity={crackOp} transform={`translate(98,76) scale(${crackScale}) translate(-98,-76)`}>
            <path d="M98,30 L95,52 L105,66 L98,80 L107,94 L100,116"
              fill="none" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>

        <div style={{
          opacity: statOp, background: '#200000',
          border: `2px solid ${ACCENT}`, borderRadius: 20, padding: '14px 36px', marginTop: 8,
        }}>
          <p style={{ ...headline(34, ACCENT), margin: 0 }}>$2 BILLION LOST</p>
          <p style={{
            fontFamily: FONT, fontSize: 22, color: WHITE, textAlign: 'center', margin: '6px 0 0',
          }}>job AND retirement — gone overnight</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const salaryOp = interpolate(frame, [24, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const salaryY = interpolate(frame, [24, 48], [-28, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badge2Op = interpolate(frame, [50, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badge2Y = interpolate(frame, [50, 74], [28, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const buildingScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 70 } });
  const crackOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleOp = interpolate(frame, [172, 196], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '110px 60px 60px',
      }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleScale})`, marginBottom: 20 }}>
          DOUBLE DAMAGE
        </p>

        <svg width="700" height="500" viewBox="0 0 700 500">
          {/* Salary badge top-left */}
          <g opacity={salaryOp} transform={`translate(0,${salaryY})`}>
            <rect x="30" y="52" width="214" height="70" rx="14" fill="#F59E0B" />
            <text x="137" y="83" textAnchor="middle" fill={BLACK}
              fontFamily="Arial Black, sans-serif" fontSize="20">YOUR SALARY</text>
            <text x="137" y="108" textAnchor="middle" fill={BLACK}
              fontFamily="Arial Black, sans-serif" fontSize="18">STOPS</text>
            <line x1="244" y1="87" x2="294" y2="222" stroke="#F59E0B" strokeWidth="3" strokeDasharray="7 4" />
          </g>

          {/* 401k badge bottom-right */}
          <g opacity={badge2Op} transform={`translate(0,${badge2Y})`}>
            <rect x="456" y="348" width="214" height="70" rx="14" fill={ACCENT} />
            <text x="563" y="379" textAnchor="middle" fill={WHITE}
              fontFamily="Arial Black, sans-serif" fontSize="20">YOUR 401K</text>
            <text x="563" y="404" textAnchor="middle" fill={WHITE}
              fontFamily="Arial Black, sans-serif" fontSize="18">CRASHES</text>
            <line x1="456" y1="383" x2="406" y2="292" stroke={ACCENT} strokeWidth="3" strokeDasharray="7 4" />
          </g>

          {/* Company building center */}
          <g transform={`translate(350,258) scale(${buildingScale})`}>
            <rect x="-60" y="-84" width="120" height="162" fill="#b0b0b0" />
            <rect x="-46" y="-68" width="24" height="24" rx="3" fill="#777" />
            <rect x="-14" y="-68" width="24" height="24" rx="3" fill="#3B82F6" opacity={0.7} />
            <rect x="18" y="-68" width="24" height="24" rx="3" fill="#777" />
            <rect x="-46" y="-36" width="24" height="24" rx="3" fill="#3B82F6" opacity={0.7} />
            <rect x="-14" y="-36" width="24" height="24" rx="3" fill="#777" />
            <rect x="18" y="-36" width="24" height="24" rx="3" fill="#3B82F6" opacity={0.7} />
            <rect x="-22" y="42" width="44" height="36" rx="3" fill="#999" />
            <polygon points="-70,-84 0,-132 70,-84" fill="#c0c0c0" />
            <g opacity={crackOp}>
              <path d="M0,-120 L-4,-72 L8,-42 L2,0 L14,48"
                fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        <p style={{
          fontFamily: FONT, fontSize: 30, color: BLACK,
          textAlign: 'center', opacity: subtitleOp,
          lineHeight: 1.3, maxWidth: 640, marginTop: 0,
        }}>
          One company crisis wipes both out at once
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });

  const pct = interpolate(frame, [80, 172], [14, 4], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const pctDisplay = Math.round(pct);

  const rVal = interpolate(frame, [80, 172], [239, 16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gVal = interpolate(frame, [80, 172], [68, 185], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bVal = interpolate(frame, [80, 172], [68, 129], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctColor = `rgb(${Math.round(rVal)},${Math.round(gVal)},${Math.round(bVal)})`;

  const employerBarW = interpolate(frame, [80, 172], [202, 56], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const indexBarW = interpolate(frame, [80, 172], [0, 202], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const badgeScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12, stiffness: 90 } });
  const badgeOp = interpolate(frame, [180, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '110px 60px 60px',
      }}>
        <p style={{ ...headline(40, WHITE), transform: `scale(${titleScale})`, marginBottom: 40 }}>
          THE 5-MINUTE FIX
        </p>

        <svg width="380" height="480" viewBox="0 0 380 480" style={{ transform: `scale(${phoneScale})` }}>
          <rect x="40" y="10" width="300" height="460" rx="30" fill="#1a1a2e" />
          <rect x="50" y="22" width="280" height="436" rx="22" fill="#0d0d1a" />
          <rect x="148" y="14" width="84" height="10" rx="5" fill="#333" />
          <text x="190" y="66" textAnchor="middle" fill="#777"
            fontFamily="Arial, sans-serif" fontSize="15">MY 401(K) PORTFOLIO</text>
          <text x="190" y="100" textAnchor="middle" fill={WHITE}
            fontFamily="Arial Black, sans-serif" fontSize="28">$84,200</text>
          <rect x="62" y="115" width="256" height="2" fill="#222" />
          <text x="72" y="142" fill="#bbb" fontFamily="Arial, sans-serif" fontSize="15">COMPANY STOCK</text>
          <text x="308" y="142" textAnchor="end" fill={pctColor}
            fontFamily="Arial Black, sans-serif" fontSize="20">{pctDisplay}%</text>
          <rect x="72" y="150" width="256" height="12" rx="6" fill="#222" />
          <rect x="72" y="150" width={employerBarW} height="12" rx="6" fill={pctColor} />
          <text x="72" y="194" fill="#bbb" fontFamily="Arial, sans-serif" fontSize="15">S&P 500 INDEX</text>
          <text x="308" y="194" textAnchor="end" fill="#10B981"
            fontFamily="Arial Black, sans-serif" fontSize="20">60%</text>
          <rect x="72" y="202" width="256" height="12" rx="6" fill="#222" />
          <rect x="72" y="202" width="154" height="12" rx="6" fill="#10B981" />
          <text x="72" y="246" fill="#bbb" fontFamily="Arial, sans-serif" fontSize="15">BOND FUND</text>
          <text x="308" y="246" textAnchor="end" fill="#3B82F6"
            fontFamily="Arial Black, sans-serif" fontSize="20">26%</text>
          <rect x="72" y="254" width="256" height="12" rx="6" fill="#222" />
          <rect x="72" y="254" width="66" height="12" rx="6" fill="#3B82F6" />
          <rect x="62" y="282" width="256" height="2" fill="#222" />
          <rect x="72" y="298" width="236" height="50" rx="14" fill="#10B981" />
          <text x="190" y="330" textAnchor="middle" fill={BLACK}
            fontFamily="Arial Black, sans-serif" fontSize="17">MOVE TO INDEX FUND</text>
          <text x="72" y="382" fill="#555" fontFamily="Arial, sans-serif" fontSize="13">REBALANCING:</text>
          <rect x="72" y="392" width="236" height="12" rx="6" fill="#222" />
          <rect x="72" y="392" width={indexBarW} height="12" rx="6" fill="#10B981" />
        </svg>

        <div style={{
          opacity: badgeOp, transform: `scale(${badgeScale})`,
          background: '#10B981', borderRadius: 24, padding: '18px 44px', marginTop: 8,
        }}>
          <p style={{ ...headline(34, BLACK), margin: 0 }}>DONE IN 5 MINUTES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const personScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const shieldScale = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 80 } });

  const stepOps = [
    interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [98, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [126, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  ];
  const ctaOp = interpolate(frame, [180, 204], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    'Log into your 401k account',
    'Find your company ticker',
    'Move it to an index fund',
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '100px 80px 60px',
      }}>
        <p style={{ ...headline(40, ACCENT), transform: `scale(${titleScale})`, marginBottom: 20 }}>
          PROTECT YOUR FUTURE
        </p>

        <svg width="260" height="210" viewBox="0 0 260 210"
          style={{ marginBottom: 28, transform: `scale(${personScale})` }}>
          <circle cx="96" cy="52" r="36" fill={WHITE} />
          <path d="M34,210 C34,138 54,112 96,112 C138,112 158,138 158,210Z" fill={WHITE} />
          <g transform={`translate(160,62) scale(${shieldScale})`}>
            <path d="M0,-62 L60,-34 L60,10 C60,48 0,70 0,70 C0,70 -60,48 -60,10 L-60,-34Z" fill="#10B981" />
            <path d="M0,-50 L48,-26 L48,12 C48,40 0,56 0,56 C0,56 -48,40 -48,12 L-48,-26Z"
              fill="none" stroke={WHITE} strokeWidth="2" />
            <polyline points="-18,4 -6,18 24,-18" fill="none" stroke={WHITE}
              strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {steps.map((step, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 20,
            marginBottom: 26, opacity: stepOps[i], width: '100%',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: ACCENT, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT, fontSize: 24, color: WHITE,
            }}>
              {i + 1}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>{step}</p>
          </div>
        ))}

        <div style={{
          marginTop: 20, opacity: ctaOp,
          background: ACCENT, borderRadius: 20,
          padding: '22px 40px', width: '100%',
        }}>
          <p style={{ ...headline(32, WHITE) }}>CHECK YOUR 401K TODAY</p>
          <p style={{
            fontFamily: FONT, fontSize: 22, color: WHITE,
            textAlign: 'center', margin: '8px 0 0', opacity: 0.85,
          }}>Follow for more money moves</p>
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
