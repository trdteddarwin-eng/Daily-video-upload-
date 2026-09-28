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

// === SCENE 1 — PMI Revealed ===
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const badgeIn = spring({
    frame: Math.max(0, frame - 28),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 90 },
  });
  const costIn = spring({
    frame: Math.max(0, frame - 58),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(46, WHITE), opacity: houseIn, marginBottom: 12 }}>
          YOUR MORTGAGE
        </p>
        <p style={{ ...headline(34, ACCENT), opacity: houseIn, marginBottom: 56 }}>
          HIDES A SECRET FEE
        </p>

        {/* House SVG with PMI badge */}
        <svg
          viewBox="0 0 220 210"
          width={320}
          height={305}
          style={{ transform: `scale(${houseIn})`, display: 'block', overflow: 'visible' }}
        >
          {/* Roof */}
          <polygon points="10,102 110,16 210,102" fill={WHITE} />
          {/* Body */}
          <rect x="35" y="100" width="150" height="110" fill={WHITE} rx={4} />
          {/* Door */}
          <rect x="90" y="148" width="40" height="62" fill={BG_DARK} rx={3} />
          {/* Left window */}
          <rect x="50" y="118" width="34" height="26" fill={BG_DARK} rx={3} />
          {/* Right window */}
          <rect x="136" y="118" width="34" height="26" fill={BG_DARK} rx={3} />
          {/* PMI Badge */}
          <circle cx="172" cy="34" r="34" fill={ACCENT} opacity={badgeIn} />
          <text
            x="172"
            y="28"
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 16, fontFamily: FONT, fontWeight: 900 }}
            opacity={badgeIn}
          >
            PMI
          </text>
          <text
            x="172"
            y="50"
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 12, fontFamily: FONT }}
            opacity={badgeIn}
          >
            FEE
          </text>
        </svg>

        <p style={{ ...headline(72, ACCENT), opacity: costIn, marginTop: 44 }}>
          $1,400/YR
        </p>
        <p style={{ ...headline(22, WHITE), opacity: costIn * 0.85, marginTop: 12 }}>
          PROTECTS YOUR BANK — NOT YOU
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// --- A ---

// === SCENE 2 — 7 Years of Payments ===
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });

  const NUM_YEARS = 7;
  const ANNUAL_PMI = 1200;
  const totalCounter = Math.floor(
    interpolate(frame, [18, 168], [0, NUM_YEARS * ANNUAL_PMI], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(34, BLACK), opacity: headerIn, marginBottom: 8 }}>
          AVERAGE PMI DURATION
        </p>
        <p style={{ ...headline(52, ACCENT), opacity: headerIn, marginBottom: 44 }}>
          7+ YEARS
        </p>

        {/* Year bars */}
        <svg viewBox="0 0 560 272" width={560} height={272} style={{ display: 'block' }}>
          {Array.from({ length: Math.max(0, Math.floor(NUM_YEARS)) }).map((_, i) => {
            const barIn = interpolate(
              frame,
              [18 + i * 14, 18 + i * 14 + 30],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const yPos = i * 36;
            return (
              <g key={i} opacity={barIn}>
                <rect x={0} y={yPos} width={340} height={28} fill={ACCENT} rx={4} />
                <text
                  x={354}
                  y={yPos + 19}
                  fill={BLACK}
                  style={{ fontSize: 18, fontFamily: FONT, fontWeight: 900 }}
                >
                  Yr {i + 1} — $1,200
                </text>
              </g>
            );
          })}
        </svg>

        <p style={{ ...headline(76, ACCENT), marginTop: 16 }}>
          ${totalCounter.toLocaleString()}
        </p>
        <p style={{ ...headline(22, BLACK), marginTop: 10, opacity: 0.8 }}>
          PAID TO THE BANK — GONE FOREVER
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 3 — LTV Gauge / Bank Waits ===
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const gaugeIn = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 70 },
  });
  const bankIn = spring({
    frame: Math.max(0, frame - 65),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const ltvValue = interpolate(frame, [30, 148], [95, 80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const BAR_TOTAL = 400;
  const barWidth = (ltvValue / 100) * BAR_TOTAL;
  const thresholdX = (80 / 100) * BAR_TOTAL; // 320px

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(38, WHITE), opacity: titleIn, marginBottom: 8 }}>
          AT 80% EQUITY
        </p>
        <p style={{ ...headline(34, ACCENT), opacity: titleIn, marginBottom: 60 }}>
          PMI MUST BE REMOVED
        </p>

        {/* LTV Gauge */}
        <svg viewBox="0 0 460 180" width={460} height={180} style={{ opacity: gaugeIn }}>
          {/* Track */}
          <rect x={0} y={68} width={BAR_TOTAL} height={44} fill="#2A2A2A" rx={8} />
          {/* Filled bar (current LTV) */}
          <rect x={0} y={68} width={barWidth} height={44} fill={ACCENT} rx={8} />
          {/* Threshold dashed line */}
          <line
            x1={thresholdX}
            y1={52}
            x2={thresholdX}
            y2={124}
            stroke={WHITE}
            strokeWidth={3}
            strokeDasharray="6 4"
          />
          {/* Threshold label */}
          <text
            x={thresholdX}
            y={44}
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 15, fontFamily: FONT }}
          >
            80% — REMOVE PMI
          </text>
          {/* Current LTV label inside bar */}
          <text
            x={barWidth - 44}
            y={95}
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 22, fontFamily: FONT, fontWeight: 900 }}
          >
            {Math.round(ltvValue)}%
          </text>
          {/* Axis labels */}
          <text x={0} y={148} fill="#666666" style={{ fontSize: 14, fontFamily: FONT }}>
            0%
          </text>
          <text
            x={BAR_TOTAL}
            y={148}
            textAnchor="end"
            fill="#666666"
            style={{ fontSize: 14, fontFamily: FONT }}
          >
            100%
          </text>
          <text
            x={200}
            y={170}
            textAnchor="middle"
            fill="#666666"
            style={{ fontSize: 15, fontFamily: FONT }}
          >
            LOAN-TO-VALUE RATIO
          </text>
        </svg>

        <p style={{ ...headline(28, WHITE), opacity: bankIn, marginTop: 44 }}>
          YOUR BANK KNOWS THIS
        </p>
        <p style={{ ...headline(28, ACCENT), opacity: bankIn, marginTop: 10 }}>
          BUT WAITS FOR YOU TO ASK
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// --- B ---

// === SCENE 4 — How to Force Removal ===
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const docIn = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 70 },
  });

  const steps = ['GET AN APPRAISAL', 'VERIFY 80% EQUITY', 'SEND ONE LETTER'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(42, BLACK), opacity: titleIn, marginBottom: 8 }}>
          YOU CAN FORCE REMOVAL
        </p>
        <p style={{ ...headline(30, ACCENT), opacity: titleIn, marginBottom: 44 }}>
          ONE LETTER. THOUSANDS SAVED.
        </p>

        {/* Document SVG */}
        <svg viewBox="0 0 220 260" width={180} height={212} style={{ opacity: docIn, display: 'block' }}>
          {/* Paper */}
          <rect x={0} y={0} width={200} height={260} fill={WHITE} rx={8} stroke="#CCCCCC" strokeWidth={2} />
          {/* Corner fold */}
          <polygon points="150,0 200,0 200,50" fill="#EEEEEE" stroke="#CCCCCC" strokeWidth={2} />
          <polygon points="150,0 200,50 150,50" fill="#CCCCCC" />
          {/* Text lines */}
          {Array.from({ length: Math.max(0, Math.floor(6)) }).map((_, i) => (
            <rect key={i} x={20} y={30 + i * 22} width={110 + (i % 3) * 20} height={7} fill="#DDDDDD" rx={3} />
          ))}
          {/* Highlight line = the important letter */}
          <rect x={20} y={180} width={160} height={16} fill={ACCENT} rx={4} opacity={0.2} />
          <rect x={20} y={183} width={80} height={6} fill={ACCENT} rx={3} />
          {/* Pen icon */}
          <rect x={150} y={220} width={32} height={8} fill={ACCENT} rx={2} style={{ transform: 'rotate(-30deg)', transformOrigin: '166px 224px' }} />
          <polygon points="150,224 142,236 154,232" fill={ACCENT} />
        </svg>

        {/* Three steps */}
        <div style={{ marginTop: 32, width: '100%' }}>
          {steps.map((step, i) => {
            const stepIn = spring({
              frame: Math.max(0, frame - 35 - i * 22),
              fps,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 80 },
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 22,
                  opacity: stepIn,
                  transform: `translateX(${(1 - stepIn) * -40}px)`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT,
                    fontSize: 20,
                    fontWeight: 900,
                    color: WHITE,
                    marginRight: 20,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ ...headline(28, BLACK), textAlign: 'left' as const }}>{step}</p>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 5 — Neighbor Comparison ===
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const leftIn = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });
  const rightIn = spring({
    frame: Math.max(0, frame - 52),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const GREEN = '#10B981';

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <p style={{ ...headline(36, WHITE), opacity: titleIn, marginBottom: 8 }}>
          SAME HOUSE. SAME YEAR.
        </p>
        <p style={{ ...headline(30, ACCENT), opacity: titleIn, marginBottom: 40 }}>
          VERY DIFFERENT OUTCOME
        </p>

        <div style={{ display: 'flex', width: '100%', gap: 24 }}>
          {/* Neighbor A — asked */}
          <div
            style={{
              flex: 1,
              opacity: leftIn,
              background: '#1A1A1A',
              borderRadius: 16,
              padding: '28px 20px',
              border: `3px solid ${GREEN}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg viewBox="0 0 100 90" width={100} height={90}>
              <polygon points="5,50 50,8 95,50" fill={GREEN} />
              <rect x="15" y="48" width="70" height="42" fill={GREEN} opacity={0.85} />
              <rect x="40" y="64" width="20" height="26" fill={BG_DARK} rx={2} />
            </svg>
            <p style={{ ...headline(20, GREEN), marginTop: 16 }}>NEIGHBOR</p>
            <p style={{ ...headline(16, WHITE), marginTop: 10, opacity: 0.85 }}>SENT LETTER</p>
            <p style={{ ...headline(16, WHITE), opacity: 0.85 }}>AT YEAR 3</p>
            <p style={{ ...headline(40, GREEN), marginTop: 16 }}>$11K</p>
            <p style={{ ...headline(18, GREEN) }}>SAVED</p>
          </div>

          {/* You — stayed quiet */}
          <div
            style={{
              flex: 1,
              opacity: rightIn,
              background: '#1A1A1A',
              borderRadius: 16,
              padding: '28px 20px',
              border: `3px solid ${ACCENT}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg viewBox="0 0 100 90" width={100} height={90}>
              <polygon points="5,50 50,8 95,50" fill={ACCENT} />
              <rect x="15" y="48" width="70" height="42" fill={ACCENT} opacity={0.85} />
              <rect x="40" y="64" width="20" height="26" fill={BG_DARK} rx={2} />
            </svg>
            <p style={{ ...headline(20, ACCENT), marginTop: 16 }}>YOU</p>
            <p style={{ ...headline(16, WHITE), marginTop: 10, opacity: 0.85 }}>STAYED</p>
            <p style={{ ...headline(16, WHITE), opacity: 0.85 }}>QUIET</p>
            <p style={{ ...headline(40, ACCENT), marginTop: 16 }}>$11K</p>
            <p style={{ ...headline(18, ACCENT) }}>PAID EXTRA</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// --- C ---

// === SCENE 6 — CTA ===
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const phoneIn = spring({
    frame: Math.max(0, frame - 20),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 70 },
  });
  const ctaIn = spring({
    frame: Math.max(0, frame - 62),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const actions = [
    'FIND YOUR LOAN BALANCE',
    'CALCULATE YOUR LTV',
    'IF NEAR 80% — WRITE THE LETTER',
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(42, BLACK), opacity: titleIn, marginBottom: 8 }}>
          DO THIS TODAY
        </p>
        <p style={{ ...headline(32, ACCENT), opacity: titleIn, marginBottom: 44 }}>
          5 MINUTES. FREE.
        </p>

        {/* Phone SVG */}
        <svg viewBox="0 0 200 320" width={150} height={240} style={{ opacity: phoneIn, display: 'block' }}>
          {/* Phone body */}
          <rect x={10} y={0} width={180} height={320} rx={22} fill={BLACK} />
          {/* Screen */}
          <rect x={20} y={18} width={160} height={248} rx={10} fill="#1A1A1A" />
          {/* Notch */}
          <rect x={70} y={12} width={60} height={14} rx={7} fill="#333333" />
          {/* Dollar sign on screen */}
          <text
            x={100}
            y={126}
            textAnchor="middle"
            fill={ACCENT}
            style={{ fontSize: 76, fontFamily: FONT, fontWeight: 900 }}
          >
            $
          </text>
          <text
            x={100}
            y={188}
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 20, fontFamily: FONT, fontWeight: 900 }}
          >
            CHECK LTV
          </text>
          {/* Home bar */}
          <rect x={75} y={290} width={50} height={6} rx={3} fill="#444444" />
        </svg>

        {/* Action bullets */}
        <div style={{ marginTop: 36, width: '100%' }}>
          {actions.map((action, i) => {
            const itemIn = spring({
              frame: Math.max(0, frame - 58 - i * 18),
              fps,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 80 },
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 22,
                  opacity: itemIn,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: ACCENT,
                    marginRight: 20,
                    flexShrink: 0,
                  }}
                />
                <p style={{ ...headline(22, BLACK), textAlign: 'left' as const }}>{action}</p>
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(28, ACCENT), opacity: ctaIn, marginTop: 20 }}>
          FOLLOW FOR MORE MONEY SECRETS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === COMPOSITION ===
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
