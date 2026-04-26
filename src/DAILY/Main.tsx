import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

const SCORE_SEGS = (() => {
  const defs: { pct: number; label: string; color: string }[] = [
    { pct: 35, label: 'PAYMENT HISTORY', color: '#10B981' },
    { pct: 30, label: 'AMOUNTS OWED',    color: '#3B82F6' },
    { pct: 15, label: 'ACCOUNT AGE',     color: ACCENT    },
    { pct: 10, label: 'CREDIT MIX',      color: '#F97316' },
    { pct: 10, label: 'NEW CREDIT',      color: '#8B5CF6' },
  ];
  let cum = 0;
  return defs.map(d => {
    const start = cum;
    cum += (d.pct / 100) * 360;
    return { ...d, startAngle: start, endAngle: cum };
  });
})();

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scoreVal = interpolate(frame, [30, 120], [720, 680], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const arrowY = interpolate(frame, [30, 120], [0, 28], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const badgeOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dashLen = interpolate(scoreVal, [600, 850], [0, 471], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        padding: 60,
      }}>
        <p style={{ ...headline(52, ACCENT), transform: `scale(${titleScale})` }}>
          YOU PAID IT OFF
        </p>

        <svg width={360} height={230} viewBox="0 0 360 230">
          <path d="M 30 200 A 150 150 0 0 1 330 200"
            fill="none" stroke="#2a2a2a" strokeWidth={22} strokeLinecap="round" />
          <path d="M 30 200 A 150 150 0 0 1 330 200"
            fill="none" stroke={ACCENT} strokeWidth={22} strokeLinecap="round"
            strokeDasharray={`${dashLen} 471`} />
          <g transform={`translate(180, ${96 + arrowY})`}>
            <polygon points="0,0 -22,-34 22,-34" fill="#EF4444" />
          </g>
          <text x="180" y="166" textAnchor="middle"
            fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize={70} fontWeight="bold">
            {Math.round(scoreVal)}
          </text>
          <text x="180" y="198" textAnchor="middle"
            fill="#777" fontFamily="Arial Black, sans-serif" fontSize={22}>
            CREDIT SCORE
          </text>
        </svg>

        <div style={{
          background: '#EF4444',
          borderRadius: 14,
          padding: '16px 44px',
          opacity: badgeOpacity,
        }}>
          <p style={{ ...headline(44, WHITE) }}>▼ DOWN 40 PTS</p>
        </div>

        <p style={{
          fontFamily: FONT, fontSize: 28, color: '#888',
          textAlign: 'center', margin: 0, lineHeight: 1.5,
        }}>
          After paying off your loan.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [15, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });

  const hlOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pieSlice = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
    const toRad = (d: number) => (d - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 22, padding: 56,
      }}>
        <p style={{ ...headline(42, BLACK), transform: `translateY(${(1 - titleY) * -48}px)` }}>
          YOUR SCORE HAS 5 PARTS
        </p>

        <svg width={320} height={320} viewBox="0 0 320 320">
          {SCORE_SEGS.map((seg) => {
            const drawn = Math.min(seg.endAngle, progress * 360);
            if (drawn <= seg.startAngle) return null;
            const isAge = seg.label === 'ACCOUNT AGE';
            const r = isAge ? 138 : 128;
            return (
              <path key={seg.label}
                d={pieSlice(160, 160, r, seg.startAngle, drawn)}
                fill={seg.color}
                stroke={BG_LIGHT}
                strokeWidth={4}
                opacity={isAge ? 1 : 0.5}
              />
            );
          })}
          <circle cx={160} cy={160} r={66} fill={BG_LIGHT} />
          <text x="160" y="153" textAnchor="middle"
            fill={BLACK} fontFamily="Arial Black, sans-serif" fontSize={26} fontWeight="bold">15%</text>
          <text x="160" y="178" textAnchor="middle"
            fill="#555" fontFamily="Arial Black, sans-serif" fontSize={17}>ACCOUNT</text>
          <text x="160" y="198" textAnchor="middle"
            fill="#555" fontFamily="Arial Black, sans-serif" fontSize={17}>AGE</text>
        </svg>

        {SCORE_SEGS.map((seg) => {
          const isAge = seg.label === 'ACCOUNT AGE';
          return (
            <div key={seg.label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: isAge ? 1 : 0.38,
              transform: isAge ? 'scale(1.06)' : 'scale(1)',
            }}>
              <div style={{ width: 18, height: 18, background: seg.color, borderRadius: 3, flexShrink: 0 }} />
              <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: 0 }}>
                {seg.pct}% — {seg.label}
              </p>
            </div>
          );
        })}

        <div style={{ opacity: hlOpacity, background: ACCENT, borderRadius: 12, padding: '12px 30px' }}>
          <p style={{ ...headline(26, BLACK) }}>CLOSING OLD ACCOUNTS HURTS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springIn = (delay: number) =>
    spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 90 } });

  const s1 = springIn(10);
  const s2 = springIn(45);
  const s3 = springIn(80);
  const badgeScale = spring({ frame: frame - 140, fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 38, padding: 60,
      }}>
        <p style={{ ...headline(46, ACCENT) }}>CREDIT MIX = 10%</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#aaa', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
          Lenders want to see different types of debt.
        </p>

        <div style={{ display: 'flex', gap: 44, alignItems: 'flex-end' }}>
          {/* Credit Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            transform: `scale(${s1})`, transformOrigin: 'bottom center' }}>
            <svg width={110} height={76} viewBox="0 0 110 76">
              <rect x={2} y={2} width={106} height={72} rx={10} fill="#1e1e2e" stroke={ACCENT} strokeWidth={3} />
              <rect x={2} y={20} width={106} height={18} fill={ACCENT} opacity={0.22} />
              <rect x={10} y={46} width={36} height={8} rx={3} fill="#444" />
              <circle cx={82} cy={54} r={10} fill="#F97316" opacity={0.55} />
              <circle cx={94} cy={54} r={10} fill={ACCENT} opacity={0.8} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#ccc', margin: 0 }}>CREDIT CARD</p>
          </div>

          {/* Car */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            transform: `scale(${s2})`, transformOrigin: 'bottom center' }}>
            <svg width={120} height={80} viewBox="0 0 120 80">
              <rect x={6} y={36} width={108} height={30} rx={6} fill="#2e2e3e" stroke={ACCENT} strokeWidth={2.5} />
              <path d="M 24 36 L 38 16 L 84 16 L 96 36 Z" fill="#2e2e3e" stroke={ACCENT} strokeWidth={2.5} />
              <path d="M 44 34 L 52 20 L 72 20 L 80 34 Z" fill="#1a3050" opacity={0.85} />
              <circle cx={28} cy={66} r={12} fill="#111" stroke={ACCENT} strokeWidth={2.5} />
              <circle cx={92} cy={66} r={12} fill="#111" stroke={ACCENT} strokeWidth={2.5} />
              <circle cx={28} cy={66} r={5} fill={ACCENT} />
              <circle cx={92} cy={66} r={5} fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#ccc', margin: 0 }}>AUTO LOAN</p>
          </div>

          {/* House */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            transform: `scale(${s3})`, transformOrigin: 'bottom center' }}>
            <svg width={96} height={90} viewBox="0 0 96 90">
              <polygon points="48,4 92,42 4,42" fill="#2e2e3e" stroke={ACCENT} strokeWidth={2.5} />
              <rect x={12} y={42} width={72} height={44} fill="#2e2e3e" stroke={ACCENT} strokeWidth={2.5} />
              <rect x={36} y={58} width={24} height={28} rx={3} fill="#111" stroke={ACCENT} strokeWidth={1.5} />
              <rect x={15} y={50} width={18} height={16} rx={2} fill="#1a3050" stroke={ACCENT} strokeWidth={1.5} />
              <rect x={63} y={50} width={18} height={16} rx={2} fill="#1a3050" stroke={ACCENT} strokeWidth={1.5} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 17, color: '#ccc', margin: 0 }}>MORTGAGE</p>
          </div>
        </div>

        <div style={{ transform: `scale(${badgeScale})`, background: '#EF4444', borderRadius: 14, padding: '14px 36px' }}>
          <p style={{ ...headline(30, WHITE) }}>PAY ONE OFF = LOSE THE MIX</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const utilPct = interpolate(frame, [30, 110], [0, 9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const revealOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barWidth = (utilPct / 100) * 300;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 38, padding: 60,
      }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleScale})` }}>
          ZERO ISN'T ALWAYS BETTER
        </p>

        <svg width={320} height={196} viewBox="0 0 320 196">
          <rect x={4} y={4} width={312} height={188} rx={18}
            fill="#1a1a2e" stroke={ACCENT} strokeWidth={4} />
          <rect x={4} y={48} width={312} height={36} fill={ACCENT} opacity={0.18} />
          {/* Chip */}
          <rect x={26} y={88} width={42} height={30} rx={4} fill={ACCENT} opacity={0.75} />
          <line x1="47" y1="88" x2="47" y2="118" stroke="#1a1a2e" strokeWidth={2} />
          <line x1="26" y1="103" x2="68" y2="103" stroke="#1a1a2e" strokeWidth={2} />
          {/* Card number groups */}
          {[0, 1, 2, 3].map(group => (
            <g key={group} transform={`translate(${90 + group * 52}, 106)`}>
              {[0, 1, 2, 3].map(dot => (
                <circle key={dot} cx={dot * 10} cy={0} r={3.5} fill={WHITE} opacity={0.5} />
              ))}
            </g>
          ))}
          <text x="26" y="166" fill={WHITE}
            fontFamily="Arial Black, sans-serif" fontSize={20} opacity={0.75}>
            1–9% UTILIZATION
          </text>
          <text x="26" y="188" fill={ACCENT}
            fontFamily="Arial Black, sans-serif" fontSize={15}>
            SWEET SPOT FOR YOUR SCORE
          </text>
        </svg>

        <div style={{ width: 300 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '0 0 10px 0' }}>
            UTILIZATION: {Math.round(utilPct)}%
          </p>
          <div style={{ width: 300, height: 26, background: '#ddd', borderRadius: 13, overflow: 'hidden' }}>
            <div style={{ width: barWidth, height: 26, background: ACCENT, borderRadius: 13 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#888', margin: 0 }}>0%</p>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#888', margin: 0 }}>100%</p>
          </div>
        </div>

        <div style={{ opacity: revealOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#EF4444', margin: 0, lineHeight: 1.5 }}>
            1–9% SCORES HIGHER<br />
            <span style={{ color: BLACK, fontSize: 22 }}>than a zero balance card</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const iconScale  = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 80 } });

  const check1Opacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const check2Opacity = interpolate(frame, [115, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(frame, [140, 168, 196, 224], [0.65, 1, 0.65, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, padding: 60,
      }}>
        <p style={{ ...headline(44, ACCENT), transform: `scale(${titleScale})` }}>
          THE $50/MONTH TRICK
        </p>

        <div style={{ transform: `scale(${iconScale})` }}>
          <svg width={300} height={188} viewBox="0 0 300 188">
            <rect x={4} y={4} width={292} height={180} rx={16}
              fill="#1e1e2e" stroke={ACCENT} strokeWidth={3} />
            <rect x={4} y={40} width={292} height={30} fill={ACCENT} opacity={0.18} />
            {/* Chip */}
            <rect x={22} y={78} width={38} height={28} rx={4} fill={ACCENT} opacity={0.65} />
            <line x1="41" y1="78" x2="41" y2="106" stroke="#1e1e2e" strokeWidth={2} />
            <line x1="22" y1="92" x2="60" y2="92" stroke="#1e1e2e" strokeWidth={2} />
            {/* Streaming play button */}
            <circle cx={222} cy={92} r={40} fill="#E50914" opacity={0.92} />
            <polygon points="212,76 212,108 244,92" fill={WHITE} />
            {/* $50/month */}
            <text x="22" y="152" fill={ACCENT}
              fontFamily="Arial Black, sans-serif" fontSize={30} fontWeight="bold">
              $50 / MONTH
            </text>
            <text x="22" y="176" fill="#aaa" fontFamily="Arial Black, sans-serif" fontSize={16}>
              TINY RECURRING CHARGE
            </text>
          </svg>
        </div>

        <div style={{ opacity: check1Opacity, background: '#0f2a1a',
          border: '2px solid #10B981', borderRadius: 12, padding: '14px 32px' }}>
          <p style={{ ...headline(28, '#10B981') }}>✓ ACCOUNT STAYS OPEN</p>
        </div>

        <div style={{ opacity: check2Opacity * glowPulse, background: '#2a1e00',
          border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '14px 32px' }}>
          <p style={{ ...headline(28, ACCENT) }}>✓ ACCOUNT AGE PRESERVED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const personScale = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 70 } });
  const ctaScale    = spring({ frame: frame - 105, fps, config: { damping: 10, stiffness: 80 } });

  const ctaOpacity = interpolate(frame, [105, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, padding: 60,
      }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleScale})` }}>
          THE SYSTEM WASN'T BUILT FOR YOU
        </p>

        <svg width={220} height={270} viewBox="0 0 220 270"
          style={{ transform: `scale(${personScale})`, transformOrigin: 'center' }}>
          {/* Person silhouette */}
          <circle cx={110} cy={66} r={36} fill="#333" />
          <path d="M 68 128 Q 70 106 110 106 Q 150 106 152 128 L 158 220 L 62 220 Z" fill="#333" />
          {/* Vertical bars (trap) */}
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={32 + i * 40} y={30} width={14} height={240} rx={6}
              fill="#EF4444" opacity={0.82} />
          ))}
          {/* Top & bottom rails */}
          <rect x={28} y={26} width={164} height={14} rx={5} fill="#EF4444" opacity={0.92} />
          <rect x={28} y={258} width={164} height={14} rx={5} fill="#EF4444" opacity={0.92} />
        </svg>

        <p style={{
          fontFamily: FONT, fontSize: 26, color: '#555',
          textAlign: 'center', margin: 0, lineHeight: 1.6,
        }}>
          It was built to keep you in debt.<br />
          Now you know how to play it.
        </p>

        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          background: ACCENT,
          borderRadius: 16,
          padding: '20px 48px',
        }}>
          <p style={{ ...headline(36, BLACK) }}>FOLLOW FOR MORE<br />MONEY TRAPS</p>
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
