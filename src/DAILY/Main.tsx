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
const ACCENT = '#10B981';
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

// === SCENE 1 — EITC Hook ===
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const envScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 70 },
  });
  const amountIn = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const envY = interpolate(frame, [18, 55], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
        <p style={{ ...headline(40, WHITE), opacity: titleIn, marginBottom: 8 }}>
          THE IRS CREDIT
        </p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn, marginBottom: 44 }}>
          NOBODY CLAIMS
        </p>

        {/* IRS Envelope SVG */}
        <div style={{ transform: `translateY(${envY}px) scale(${envScale})` }}>
          <svg
            viewBox="0 0 300 200"
            width={300}
            height={200}
            style={{ display: 'block', overflow: 'visible' }}
          >
            {/* Envelope body */}
            <rect x={10} y={40} width={280} height={150} rx={14} fill="#163020" stroke={ACCENT} strokeWidth={3} />
            {/* Flap */}
            <polygon points="10,40 150,125 290,40" fill="#0D2018" />
            <polyline points="10,40 150,125 290,40" fill="none" stroke={ACCENT} strokeWidth={3} />
            {/* Fold lines */}
            <line x1={10} y1={190} x2={110} y2={130} stroke={ACCENT} strokeWidth={2} opacity={0.4} />
            <line x1={290} y1={190} x2={190} y2={130} stroke={ACCENT} strokeWidth={2} opacity={0.4} />
            {/* Dollar sign */}
            <text
              x={150}
              y={183}
              textAnchor="middle"
              fill={ACCENT}
              style={{ fontSize: 56, fontFamily: FONT, fontWeight: 900 }}
            >
              $
            </text>
            {/* IRS Stamp */}
            <rect x={232} y={50} width={50} height={30} rx={5} fill={ACCENT} />
            <text
              x={257}
              y={70}
              textAnchor="middle"
              fill={BLACK}
              style={{ fontSize: 15, fontFamily: FONT, fontWeight: 900 }}
            >
              IRS
            </text>
          </svg>
        </div>

        <p style={{ ...headline(80, ACCENT), opacity: amountIn, marginTop: 32 }}>$7,830</p>
        <p style={{ ...headline(24, WHITE), opacity: amountIn * 0.9, marginTop: 8 }}>
          UNCLAIMED — EVERY YEAR
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// --- A ---

// === SCENE 2 — What Is the EITC (Direct Payment) ===
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const arrowIn = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 70 },
  });
  const labelIn = spring({
    frame: Math.max(0, frame - 55),
    fps,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 80 },
  });

  const arrowWidth = interpolate(frame, [18, 95], [0, 280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        <p style={{ ...headline(36, BLACK), opacity: titleIn, marginBottom: 8 }}>
          NOT A DEDUCTION
        </p>
        <p style={{ ...headline(32, ACCENT), opacity: titleIn, marginBottom: 44 }}>
          A DIRECT PAYMENT TO YOU
        </p>

        {/* IRS → Person arrow animation */}
        <svg
          viewBox="0 0 560 200"
          width={560}
          height={200}
          style={{ display: 'block', overflow: 'visible' }}
        >
          {/* IRS building */}
          <rect x={0} y={60} width={100} height={80} fill="#333333" rx={6} />
          <polygon points="0,60 50,20 100,60" fill="#555555" />
          <text
            x={50}
            y={108}
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 18, fontFamily: FONT, fontWeight: 900 }}
          >
            IRS
          </text>
          <rect x={37} y={112} width={26} height={28} fill={BLACK} rx={2} />

          {/* Arrow growing right */}
          <rect x={110} y={93} width={arrowWidth} height={14} fill={ACCENT} rx={4} />
          {/* Arrowhead */}
          <polygon
            points={`${110 + arrowWidth},85 ${110 + arrowWidth + 24},100 ${110 + arrowWidth},115`}
            fill={ACCENT}
            opacity={arrowIn}
          />

          {/* Dollar signs floating above arrow */}
          {[0.3, 0.55, 0.8].map((pct, i) => {
            const xPos = 110 + pct * Math.min(arrowWidth, 280);
            const floatY = interpolate(
              frame,
              [28 + i * 12, 58 + i * 12, 88 + i * 12],
              [0, -22, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const dOpacity = interpolate(
              frame,
              [28 + i * 12, 48 + i * 12],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <text
                key={i}
                x={xPos}
                y={76 + floatY}
                textAnchor="middle"
                fill={ACCENT}
                opacity={dOpacity}
                style={{ fontSize: 24, fontFamily: FONT, fontWeight: 900 }}
              >
                $
              </text>
            );
          })}

          {/* Person silhouette */}
          <circle cx={490} cy={58} r={26} fill={ACCENT} opacity={arrowIn} />
          <rect x={464} y={88} width={52} height={50} fill={ACCENT} rx={12} opacity={arrowIn} />
        </svg>

        <p style={{ ...headline(28, BLACK), opacity: labelIn, marginTop: 30 }}>
          YOU GET IT EVEN IF YOU
        </p>
        <p style={{ ...headline(30, ACCENT), opacity: labelIn, marginTop: 8 }}>
          OWE ZERO IN TAXES
        </p>
        <p style={{ ...headline(20, '#888888'), opacity: labelIn * 0.85, marginTop: 16 }}>
          REFUNDABLE = DIRECT DEPOSIT
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 3 — Who Qualifies (Income Limits) ===
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });

  const groups = [
    { label: 'NO KIDS', limit: '$18,600' },
    { label: '1 CHILD', limit: '$49,000' },
    { label: '2 CHILDREN', limit: '$55,800' },
    { label: '3+ CHILDREN', limit: '$59,900' },
  ];

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
        <p style={{ ...headline(34, WHITE), opacity: titleIn, marginBottom: 8 }}>
          DO YOU QUALIFY?
        </p>
        <p style={{ ...headline(28, ACCENT), opacity: titleIn, marginBottom: 36 }}>
          ANNUAL INCOME UNDER:
        </p>

        <div style={{ width: '100%' }}>
          {groups.map((group, i) => {
            const itemIn = spring({
              frame: Math.max(0, frame - 18 - i * 22),
              fps,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 80 },
            });
            const barW = interpolate(
              frame,
              [18 + i * 22, 58 + i * 22],
              [0, 100],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 26,
                  opacity: itemIn,
                }}
              >
                <div style={{ width: 150, marginRight: 16, flexShrink: 0 }}>
                  <p style={{ ...headline(20, WHITE), textAlign: 'left' as const }}>
                    {group.label}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 34,
                    background: '#222222',
                    borderRadius: 6,
                    overflow: 'hidden' as const,
                  }}
                >
                  <div
                    style={{
                      width: `${barW}%`,
                      height: '100%',
                      background: ACCENT,
                      borderRadius: 6,
                    }}
                  />
                </div>
                <div style={{ width: 110, marginLeft: 16, flexShrink: 0 }}>
                  <p style={{ ...headline(22, ACCENT), textAlign: 'right' as const }}>
                    {group.limit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(18, '#888888'), marginTop: 16 }}>
          GIG WORKERS AND PART-TIMERS QUALIFY TOO
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// --- B ---

// === SCENE 4 — The Dollar Amounts ===
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });

  const tiers = [
    { label: 'NO KIDS', amount: '$632', pct: 8 },
    { label: '1 CHILD', amount: '$3,995', pct: 51 },
    { label: '2 KIDS', amount: '$6,604', pct: 84 },
    { label: '3+ KIDS', amount: '$7,830', pct: 100 },
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
        <p style={{ ...headline(36, BLACK), opacity: titleIn, marginBottom: 8 }}>
          HOW MUCH YOU COULD OWE
        </p>
        <p style={{ ...headline(28, ACCENT), opacity: titleIn, marginBottom: 40 }}>
          DIRECT DEPOSIT EVERY APRIL
        </p>

        <div style={{ width: '100%' }}>
          {tiers.map((tier, i) => {
            const rowIn = spring({
              frame: Math.max(0, frame - 14 - i * 22),
              fps,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 80 },
            });
            const barW = interpolate(
              frame,
              [14 + i * 22, 60 + i * 22],
              [0, tier.pct],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 28,
                  opacity: rowIn,
                }}
              >
                <div style={{ width: 120, marginRight: 16, flexShrink: 0 }}>
                  <p style={{ ...headline(19, BLACK), textAlign: 'left' as const }}>
                    {tier.label}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 38,
                    background: '#E0E0E0',
                    borderRadius: 6,
                    overflow: 'hidden' as const,
                  }}
                >
                  <div
                    style={{
                      width: `${barW}%`,
                      height: '100%',
                      background: ACCENT,
                      borderRadius: 6,
                    }}
                  />
                </div>
                <div style={{ width: 100, marginLeft: 16, flexShrink: 0 }}>
                  <p style={{ ...headline(22, ACCENT), textAlign: 'right' as const }}>
                    {tier.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(20, '#888888'), marginTop: 20 }}>
          MAX CREDIT — 2024 TAX YEAR
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 5 — Why 5M People Miss It ===
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const bigIn = spring({
    frame: Math.max(0, frame - 16),
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 65 },
  });

  const RED = '#EF4444';

  const reasons = [
    'BURIED IN TAX SOFTWARE',
    'GIG WORKERS THINK EXCLUDED',
    'IRS NEVER SENDS A REMINDER',
  ];

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
        <p style={{ ...headline(32, WHITE), opacity: titleIn, marginBottom: 4 }}>
          WHY DO
        </p>
        <p
          style={{
            ...headline(100, RED),
            transform: `scale(${bigIn})`,
            display: 'block',
            marginBottom: 4,
          }}
        >
          5M
        </p>
        <p style={{ ...headline(30, WHITE), opacity: titleIn, marginBottom: 40 }}>
          WORKERS MISS IT?
        </p>

        <div style={{ width: '100%' }}>
          {reasons.map((reason, i) => {
            const itemIn = spring({
              frame: Math.max(0, frame - 52 - i * 20),
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
                  marginBottom: 20,
                  opacity: itemIn,
                  transform: `translateX(${(1 - itemIn) * -44}px)`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: RED,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT,
                    fontSize: 18,
                    fontWeight: 900,
                    color: WHITE,
                    marginRight: 20,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ ...headline(22, WHITE), textAlign: 'left' as const }}>{reason}</p>
              </div>
            );
          })}
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
    frame: Math.max(0, frame - 18),
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

  const steps = [
    'SEARCH "EITC ASSISTANT" AT IRS.GOV',
    'FILL IN YOUR INFO — 2 MINUTES',
    'FILE AMENDED RETURNS UP TO 3 YRS BACK',
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
        <p style={{ ...headline(40, BLACK), opacity: titleIn, marginBottom: 8 }}>
          CHECK RIGHT NOW
        </p>
        <p style={{ ...headline(28, ACCENT), opacity: titleIn, marginBottom: 32 }}>
          FREE. TAKES 2 MINUTES.
        </p>

        {/* Phone SVG */}
        <svg
          viewBox="0 0 200 320"
          width={140}
          height={224}
          style={{ opacity: phoneIn, display: 'block' }}
        >
          {/* Phone body */}
          <rect x={10} y={0} width={180} height={320} rx={22} fill={BLACK} />
          {/* Screen */}
          <rect x={20} y={18} width={160} height={248} rx={10} fill="#1A3A2A" />
          {/* Notch */}
          <rect x={72} y={12} width={56} height={13} rx={6} fill="#333333" />
          {/* EITC label */}
          <text
            x={100}
            y={92}
            textAnchor="middle"
            fill={ACCENT}
            style={{ fontSize: 22, fontFamily: FONT, fontWeight: 900 }}
          >
            EITC
          </text>
          <text
            x={100}
            y={122}
            textAnchor="middle"
            fill={WHITE}
            style={{ fontSize: 14, fontFamily: FONT }}
          >
            ASSISTANT
          </text>
          {/* Dollar */}
          <text
            x={100}
            y={192}
            textAnchor="middle"
            fill={ACCENT}
            style={{ fontSize: 52, fontFamily: FONT, fontWeight: 900 }}
          >
            $
          </text>
          {/* Check circle */}
          <circle cx={100} cy={228} r={16} fill={ACCENT} />
          <polyline
            points="91,228 97,235 111,220"
            fill="none"
            stroke={WHITE}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Home bar */}
          <rect x={75} y={290} width={50} height={6} rx={3} fill="#444444" />
        </svg>

        {/* Action steps */}
        <div style={{ marginTop: 26, width: '100%' }}>
          {steps.map((step, i) => {
            const itemIn = spring({
              frame: Math.max(0, frame - 48 - i * 18),
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
                  marginBottom: 18,
                  opacity: itemIn,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 900,
                    color: WHITE,
                    marginRight: 16,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ ...headline(18, BLACK), textAlign: 'left' as const }}>{step}</p>
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(26, ACCENT), opacity: ctaIn, marginTop: 18 }}>
          FOLLOW FOR MORE HIDDEN MONEY
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
