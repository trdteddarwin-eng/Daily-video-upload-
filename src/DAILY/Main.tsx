import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#FAFAF5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const GRAY = '#6B7280';
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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 }, from: 0, to: 1 });
  const chartOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barData = [
    { month: 'JAN', target: 180, delay: 85 },
    { month: 'FEB', target: 90, delay: 100 },
    { month: 'MAR', target: 40, delay: 115 },
    { month: 'APR', target: 18, delay: 130 },
    { month: 'MAY', target: 8, delay: 145 },
    { month: 'JUN', target: 4, delay: 160 },
  ];

  const barHeights = barData.map((b) =>
    interpolate(frame, [b.delay, b.delay + 32], [0, b.target], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 60px' }}>
        <div style={{ transform: `scale(${cardScale})` }}>
          <svg width={380} height={220} viewBox="0 0 380 220">
            <rect width={380} height={220} rx={18} fill={ACCENT} />
            <rect y={68} width={380} height={44} fill="rgba(0,0,0,0.28)" />
            <rect x={24} y={120} width={64} height={46} rx={7} fill="rgba(255,255,255,0.35)" />
            <text x={190} y={44} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight="bold" fill={WHITE}>GYM MEMBERSHIP</text>
            <text x={190} y={188} textAnchor="middle" fontFamily={FONT} fontSize={18} fill="rgba(255,255,255,0.7)" letterSpacing={3}>$58 / MONTH</text>
          </svg>
        </div>
        <div style={{ opacity: chartOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
          <p style={{ ...headline(26, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>YOUR VISIT FREQUENCY</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200 }}>
            {barHeights.map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 54,
                  height: Math.max(0, Math.floor(h)),
                  background: i === 0 ? ACCENT : `rgba(245,158,11,${Math.max(0.08, 0.6 - i * 0.1)})`,
                  borderRadius: '6px 6px 0 0',
                }} />
                <span style={{ fontFamily: FONT, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{barData[i].month}</span>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pct = interpolate(frame, [20, 115], [0, 67], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 110 }, from: 0, to: 1 });
  const figuresOpacity = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const persons = [
    { x: 100, active: false },
    { x: 260, active: false },
    { x: 420, active: true },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 80px' }}>
        <p style={{ ...headline(36, '#333'), marginBottom: 0 }}>THE REAL STAT</p>
        <p style={{ ...headline(180, BG_DARK), lineHeight: 1, margin: 0 }}>{Math.round(pct)}%</p>
        <div style={{ width: '100%', background: 'rgba(0,0,0,0.1)', borderRadius: 16, height: 32, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: ACCENT, borderRadius: 16 }} />
        </div>
        <p style={{ ...headline(30, BG_DARK), lineHeight: 1.35, margin: 0 }}>OF GYM MEMBERSHIPS<br />COMPLETELY UNUSED</p>
        <div style={{ opacity: figuresOpacity }}>
          <svg width={340} height={95} viewBox="0 0 520 95">
            {persons.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={22} r={20} fill={p.active ? ACCENT : GRAY} />
                <rect x={p.x - 20} y={48} width={40} height={36} rx={8} fill={p.active ? ACCENT : GRAY} />
              </g>
            ))}
          </svg>
        </div>
        <div style={{ transform: `scale(${badgeScale})`, background: 'rgba(245,158,11,0.15)', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '14px 40px' }}>
          <p style={{ ...headline(32, ACCENT), margin: 0 }}>2 OUT OF 3 PEOPLE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const buildingScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const crowdOpacity = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statsOpacity = interpolate(frame, [115, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const crowdPos = [
    { x: 88, y: 350 }, { x: 148, y: 365 }, { x: 208, y: 348 }, { x: 268, y: 362 },
    { x: 328, y: 350 }, { x: 388, y: 365 }, { x: 448, y: 348 }, { x: 508, y: 360 },
    { x: 568, y: 350 }, { x: 628, y: 365 }, { x: 688, y: 348 }, { x: 748, y: 360 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 60px' }}>
        <p style={{ ...headline(32, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>THE BUSINESS MODEL</p>
        <div style={{ transform: `scale(${buildingScale})` }}>
          <svg width={360} height={260} viewBox="0 0 840 600">
            <rect x={60} y={180} width={720} height={420} fill="#1D1D1D" />
            <polygon points="420,40 820,180 20,180" fill="#2A2A2A" />
            {[130, 280, 430, 580, 710].map((cx, i) => (
              <rect key={i} x={cx} y={180} width={28} height={420} fill="rgba(255,255,255,0.06)" />
            ))}
            <rect x={360} y={420} width={120} height={180} rx={6} fill={ACCENT} opacity={0.75} />
            <text x={420} y={145} textAnchor="middle" fontFamily={FONT} fontSize={60} fill={ACCENT} fontWeight="bold">GYM</text>
            {crowdPos.map((p, i) => (
              <g key={i} opacity={crowdOpacity}>
                <circle cx={p.x} cy={p.y} r={14} fill={i < 9 ? 'rgba(255,255,255,0.3)' : ACCENT} />
                <rect x={p.x - 11} y={p.y + 16} width={22} height={22} rx={5} fill={i < 9 ? 'rgba(255,255,255,0.3)' : ACCENT} />
              </g>
            ))}
          </svg>
        </div>
        <div style={{ opacity: statsOpacity, display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ background: 'rgba(239,68,68,0.18)', border: '2px solid #EF4444', borderRadius: 10, padding: '12px 22px', textAlign: 'center' as const }}>
            <p style={{ ...headline(22, '#EF4444'), margin: 0 }}>6,500 MEMBERS</p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>per location</p>
          </div>
          <p style={{ ...headline(32, WHITE), margin: 0 }}>VS</p>
          <div style={{ background: 'rgba(16,185,129,0.18)', border: '2px solid #10B981', borderRadius: 10, padding: '12px 22px', textAlign: 'center' as const }}>
            <p style={{ ...headline(22, '#10B981'), margin: 0 }}>300 CAPACITY</p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>actual space</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brainScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const meterFill = interpolate(frame, [55, 130], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [125, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 60px' }}>
        <p style={{ ...headline(34, BG_DARK), marginBottom: 0 }}>THE PSYCHOLOGY TRAP</p>
        <div style={{ transform: `scale(${brainScale})` }}>
          <svg width={240} height={210} viewBox="0 0 240 210">
            <ellipse cx={120} cy={128} rx={88} ry={70} fill={ACCENT} />
            <line x1={120} y1={60} x2={120} y2={196} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
            <path d="M 44 114 Q 68 94 92 114 Q 116 134 140 114 Q 164 94 188 114" stroke="rgba(0,0,0,0.2)" strokeWidth={3.5} fill="none" />
            <path d="M 40 146 Q 66 126 92 146 Q 118 166 144 146 Q 170 126 196 146" stroke="rgba(0,0,0,0.2)" strokeWidth={3.5} fill="none" />
            <circle cx={192} cy={60} r={9} fill={BG_DARK} />
            <circle cx={210} cy={42} r={13} fill={BG_DARK} />
            <circle cx={230} cy={24} r={18} fill={BG_DARK} />
            <line x1={220} y1={24} x2={240} y2={24} stroke={ACCENT} strokeWidth={4} />
            <rect x={214} y={19} width={8} height={10} rx={2} fill={ACCENT} />
            <rect x={236} y={19} width={8} height={10} rx={2} fill={ACCENT} />
          </svg>
        </div>
        <div style={{ width: '100%' }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', textAlign: 'center' as const, margin: '0 0 10px 0', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Brain satisfaction just from signing up</p>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.1)', borderRadius: 12, height: 26, overflow: 'hidden' }}>
            <div style={{ width: `${meterFill}%`, height: '100%', background: ACCENT, borderRadius: 12 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, fontWeight: 'bold' }}>{Math.round(meterFill)}% SATISFIED</span>
          </div>
        </div>
        <div style={{ opacity: labelOpacity, textAlign: 'center' as const }}>
          <p style={{ ...headline(40, BG_DARK), marginBottom: 6 }}>BUYING IT</p>
          <p style={{ ...headline(36, ACCENT), margin: 0 }}>= DOING IT (TO YOUR BRAIN)</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const yearlyVal = Math.round(
    interpolate(frame, [18, 105], [0, 696], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const billionOpacity = interpolate(frame, [112, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const barWidth = interpolate(frame, [18, 105], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 80px' }}>
        <p style={{ ...headline(32, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>WHAT YOU'RE ACTUALLY PAYING</p>
        <p style={{ ...headline(120, ACCENT), lineHeight: 1, margin: 0 }}>${yearlyVal}</p>
        <p style={{ ...headline(28, WHITE), margin: 0 }}>PER YEAR. EVERY YEAR.</p>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 12, height: 44, overflow: 'hidden' }}>
          <div style={{ width: `${barWidth}%`, height: '100%', background: ACCENT, borderRadius: 12 }} />
        </div>
        <div style={{ opacity: billionOpacity, textAlign: 'center' as const }}>
          <p style={{ ...headline(42, '#EF4444'), margin: 0 }}>$1.8 BILLION WASTED</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: 'rgba(255,255,255,0.55)', textAlign: 'center' as const, margin: '8px 0 0 0', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>by Americans every year</p>
        </div>
        <div style={{ transform: `scale(${badgeScale})`, background: 'rgba(239,68,68,0.18)', border: '2px solid #EF4444', borderRadius: 12, padding: '14px 36px' }}>
          <p style={{ ...headline(28, WHITE), margin: 0 }}>ON GYMS THEY NEVER USE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const calScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const piggyOpacity = interpolate(frame, [72, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 10, stiffness: 110 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>
        <p style={{ ...headline(38, BG_DARK), marginBottom: 0 }}>YOUR COUNTER-MOVE</p>
        <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          <div style={{ transform: `scale(${calScale})` }}>
            <svg width={155} height={165} viewBox="0 0 155 165">
              <rect width={155} height={165} rx={13} fill={BG_DARK} />
              <rect width={155} height={38} rx={13} fill={ACCENT} />
              <rect y={25} width={155} height={13} fill={ACCENT} />
              <text x={77} y={25} textAnchor="middle" fontFamily={FONT} fontSize={16} fill={WHITE}>LAST 30 DAYS</text>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((cell) => {
                const col = cell % 4;
                const row = Math.floor(cell / 4);
                const cx = 18 + col * 34;
                const cy = 52 + row * 34;
                const hasCheck = cell < 4;
                return (
                  <g key={cell}>
                    <rect x={cx - 10} y={cy - 10} width={25} height={25} rx={4} fill={hasCheck ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'} />
                    {hasCheck && (
                      <polyline
                        points={`${cx - 4},${cy + 3} ${cx + 2},${cy + 9} ${cx + 11},${cy - 3}`}
                        stroke="#10B981"
                        strokeWidth={2.5}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ opacity: piggyOpacity }}>
            <svg width={120} height={120} viewBox="0 0 120 120">
              <ellipse cx={55} cy={72} rx={44} ry={37} fill={ACCENT} />
              <circle cx={88} cy={58} r={24} fill={ACCENT} />
              <ellipse cx={96} cy={67} rx={11} ry={8} fill="rgba(0,0,0,0.2)" />
              <circle cx={92} cy={68} r={2.5} fill="rgba(0,0,0,0.45)" />
              <circle cx={100} cy={68} r={2.5} fill="rgba(0,0,0,0.45)" />
              <circle cx={88} cy={51} r={3.5} fill={BG_DARK} />
              <rect x={20} y={100} width={16} height={20} rx={5} fill={ACCENT} />
              <rect x={42} y={100} width={16} height={20} rx={5} fill={ACCENT} />
              <rect x={64} y={100} width={16} height={20} rx={5} fill={ACCENT} />
              <rect x={34} y={34} width={24} height={5} rx={2.5} fill="rgba(0,0,0,0.3)" />
              <text x={50} y={76} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={WHITE} fontWeight="bold">$58</text>
            </svg>
          </div>
        </div>
        <div style={{ textAlign: 'center' as const }}>
          <p style={{ ...headline(36, BG_DARK), marginBottom: 8 }}>UNDER 4 VISITS/MONTH?</p>
          <p style={{ ...headline(36, ACCENT), margin: 0 }}>CANCEL TODAY.</p>
        </div>
        <div style={{ transform: `scale(${ctaScale})`, background: BG_DARK, borderRadius: 16, padding: '20px 40px', textAlign: 'center' as const, width: '100%' }}>
          <p style={{ ...headline(28, WHITE), margin: '0 0 8px 0' }}>REDIRECT THAT $58</p>
          <p style={{ ...headline(28, '#10B981'), margin: 0 }}>INTO SAVINGS INSTEAD</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#888', textAlign: 'center' as const, margin: 0, letterSpacing: '0.04em' }}>
          Follow for more money psychology
        </p>
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
