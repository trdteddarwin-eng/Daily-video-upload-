import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const cardY = interpolate(frame, [0, 35], [500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame, [40, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mythScale = spring({
    frame: Math.max(0, frame - 100),
    fps: 30,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <p style={{ ...headline(34, ACCENT), marginBottom: 50 }}>THE $92,000 CREDIT MYTH</p>

        {/* Credit card */}
        <div style={{ transform: `translateY(${cardY}px)`, marginBottom: 50 }}>
          <svg width="520" height="300" viewBox="0 0 520 300">
            {/* Card body */}
            <rect x="0" y="0" width="520" height="300" rx="24" fill="#1A2F50" />
            {/* Magnetic strip */}
            <rect x="0" y="54" width="520" height="52" fill="#0D1F38" />
            {/* Chip */}
            <rect x="50" y="118" width="60" height="46" rx="6" fill="#C8A92B" />
            <line x1="80" y1="118" x2="80" y2="164" stroke="#A08020" strokeWidth="2" />
            <line x1="50" y1="141" x2="110" y2="141" stroke="#A08020" strokeWidth="2" />
            {/* Card number */}
            <text x="50" y="222" fill="#999" fontFamily="Arial" fontSize="20">
              {'•••• •••• •••• 1234'}
            </text>
            {/* Balance */}
            <text x="50" y="270" fill={ACCENT} fontFamily="Arial Black" fontSize="32">
              BALANCE: $6,194
            </text>
          </svg>
        </div>

        {/* Question */}
        <div style={{ textAlign: 'center', opacity: textOpacity, marginBottom: 36 }}>
          <p style={{ ...headline(42, WHITE), marginBottom: 10 }}>CARRYING THIS</p>
          <p style={{ ...headline(42, WHITE) }}>BUILDS CREDIT?</p>
        </div>

        {/* MYTH badge */}
        <div
          style={{
            transform: `scale(${mythScale})`,
            background: ACCENT,
            borderRadius: 20,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 52,
            paddingRight: 52,
          }}
        >
          <p style={{ ...headline(72, WHITE), margin: 0 }}>MYTH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const statValue = interpolate(frame, [15, 90], [0, 56], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const barFill = interpolate(frame, [15, 90], [0, 56], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const noteOpacity = interpolate(frame, [92, 118], [0, 1], {
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
          padding: 60,
        }}
      >
        <p style={{ ...headline(36, '#555'), marginBottom: 8 }}>REAL SURVEY DATA</p>

        {/* Big percentage counter */}
        <p style={{ ...headline(180, ACCENT), lineHeight: 1, marginBottom: 8 }}>
          {Math.floor(statValue)}%
        </p>

        <p style={{ ...headline(36, BLACK), marginBottom: 44 }}>OF AMERICANS BELIEVE</p>

        {/* Progress bar */}
        <div
          style={{
            width: 700,
            height: 32,
            background: '#DDD',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 50,
          }}
        >
          <div
            style={{
              width: `${barFill}%`,
              height: '100%',
              background: ACCENT,
              borderRadius: 16,
            }}
          />
        </div>

        <div style={{ opacity: noteOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(34, BLACK), marginBottom: 8 }}>A CREDIT CARD BALANCE</p>
          <p style={{ ...headline(34, BLACK), marginBottom: 18 }}>BUILDS CREDIT FASTER</p>
          <p style={{ ...headline(30, ACCENT) }}>THAT IS 100% FALSE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const highlightPulse = interpolate(
    frame,
    [105, 132, 158, 185],
    [1, 1.04, 1, 1.04],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const noteOpacity = interpolate(frame, [155, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const factors = [
    { label: 'PAYMENT HISTORY', pct: 35, color: '#22C55E' },
    { label: 'AMOUNTS OWED', pct: 30, color: ACCENT },
    { label: 'CREDIT HISTORY', pct: 15, color: '#888' },
    { label: 'NEW CREDIT', pct: 10, color: '#888' },
    { label: 'CREDIT MIX', pct: 10, color: '#888' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <p style={{ ...headline(34, WHITE), opacity: headerOpacity, marginBottom: 44 }}>
          HOW FICO ACTUALLY SCORES YOU
        </p>

        <div style={{ width: '100%' }}>
          {factors.map((f, i) => {
            const delay = i * 14;
            const progress = interpolate(frame, [20 + delay, 80 + delay], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const isHighlight = i === 1;
            return (
              <div
                key={f.label}
                style={{
                  marginBottom: 22,
                  transform: isHighlight ? `scale(${highlightPulse})` : 'scale(1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: FONT, fontSize: 22, color: f.color }}>{f.label}</span>
                  <span style={{ fontFamily: FONT, fontSize: 22, color: f.color }}>{f.pct}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: isHighlight ? 22 : 16,
                    background: '#333',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progress * f.pct * 2.5}%`,
                      height: '100%',
                      background: f.color,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: noteOpacity, textAlign: 'center', marginTop: 24 }}>
          <p style={{ ...headline(26, ACCENT) }}>BALANCE RAISES UTILIZATION — HURTS YOUR SCORE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const balanceVal = interpolate(frame, [10, 72], [0, 6194], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const aprOpacity = interpolate(frame, [72, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resultScale = spring({
    frame: Math.max(0, frame - 112),
    fps: 30,
    config: { damping: 14, stiffness: 180 },
  });

  const drainOpacity = interpolate(frame, [158, 178], [0, 1], {
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
          padding: 60,
        }}
      >
        <p style={{ ...headline(34, BLACK), marginBottom: 52 }}>THE REAL ANNUAL COST</p>

        {/* Step 1: Average balance counter */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <p style={{ ...headline(26, '#888'), marginBottom: 8 }}>AVERAGE U.S. CARD BALANCE</p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 96,
              color: BLACK,
              margin: 0,
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            ${Math.floor(balanceVal).toLocaleString()}
          </p>
        </div>

        {/* Step 2: APR */}
        <div style={{ opacity: aprOpacity, textAlign: 'center', marginBottom: 16 }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 52,
              color: '#555',
              margin: 0,
              textAlign: 'center',
            }}
          >
            × 22% APR
          </p>
        </div>

        {/* Step 3: Result */}
        <div style={{ transform: `scale(${resultScale})`, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 44,
              color: '#555',
              margin: 0,
              textAlign: 'center',
            }}
          >
            =
          </p>
          <p style={{ ...headline(88, ACCENT), marginBottom: 4 }}>$1,362</p>
          <p style={{ ...headline(28, ACCENT) }}>IN WASTED INTEREST / YEAR</p>
        </div>

        {/* Dollar bill graphic */}
        <div style={{ opacity: drainOpacity, marginTop: 32 }}>
          <svg width="280" height="76" viewBox="0 0 280 76">
            <rect x="0" y="0" width="280" height="76" rx="10" fill="#22C55E" />
            <rect x="8" y="8" width="264" height="60" rx="6" fill="none" stroke="#16A34A" strokeWidth="2" />
            <text
              x="140"
              y="49"
              fill={WHITE}
              fontFamily="Arial Black"
              fontSize="28"
              textAnchor="middle"
              fontWeight="bold"
            >
              $1,362 GONE
            </text>
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame, [20, 158], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOpacity = interpolate(frame, [148, 172], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const maxBar = 400;
  const leftH = Math.max(0, maxBar * 0.44 * barProgress);
  const rightH = Math.max(0, maxBar * barProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <p style={{ ...headline(34, WHITE), marginBottom: 46 }}>30-YEAR IMPACT AT 5% RETURN</p>

        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 80, height: maxBar, width: 500 }}>
          {/* Left: interest wasted */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <div style={{ flex: 1 }} />
            <div
              style={{
                width: 200,
                height: leftH,
                background: ACCENT,
                borderRadius: '12px 12px 0 0',
              }}
            />
          </div>
          {/* Right: invested */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <div style={{ flex: 1 }} />
            <div
              style={{
                width: 200,
                height: rightH,
                background: '#4ADE80',
                borderRadius: '12px 12px 0 0',
              }}
            />
          </div>
        </div>

        {/* Baseline */}
        <div style={{ width: 500, height: 2, background: '#444', marginBottom: 18 }} />

        {/* Labels */}
        <div style={{ display: 'flex', gap: 80, width: 500, opacity: labelOpacity }}>
          <div style={{ width: 200, textAlign: 'center' }}>
            <p style={{ ...headline(20, '#AAA'), marginBottom: 4 }}>INTEREST PAID</p>
            <p style={{ ...headline(30, ACCENT) }}>$40,860</p>
          </div>
          <div style={{ width: 200, textAlign: 'center' }}>
            <p style={{ ...headline(20, '#AAA'), marginBottom: 4 }}>INVESTED INSTEAD</p>
            <p style={{ ...headline(30, '#4ADE80') }}>$92,000</p>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, textAlign: 'center', marginTop: 28 }}>
          <p style={{ ...headline(36, WHITE) }}>$51,140 MORE IN YOUR POCKET</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const cardScale = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    config: { damping: 14, stiffness: 150 },
  });

  const checkScale = spring({
    frame: Math.max(0, frame - 62),
    fps: 30,
    config: { damping: 10, stiffness: 220 },
  });

  const text1Opacity = interpolate(frame, [88, 108], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaOpacity = interpolate(frame, [142, 162], [0, 1], {
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
          padding: 60,
        }}
      >
        {/* Credit card with checkmark */}
        <div
          style={{
            position: 'relative',
            marginBottom: 44,
            transform: `scale(${cardScale})`,
          }}
        >
          <svg width="520" height="300" viewBox="0 0 520 300">
            {/* Green card body */}
            <rect x="0" y="0" width="520" height="300" rx="24" fill="#1A4731" />
            <rect x="0" y="54" width="520" height="52" fill="#0D2B1E" />
            {/* Chip */}
            <rect x="50" y="118" width="60" height="46" rx="6" fill="#C8A92B" />
            <line x1="80" y1="118" x2="80" y2="164" stroke="#A08020" strokeWidth="2" />
            <line x1="50" y1="141" x2="110" y2="141" stroke="#A08020" strokeWidth="2" />
            {/* Card number */}
            <text x="50" y="222" fill="#999" fontFamily="Arial" fontSize="20">
              {'•••• •••• •••• 1234'}
            </text>
            {/* PAID IN FULL */}
            <text x="50" y="270" fill="#4ADE80" fontFamily="Arial Black" fontSize="32">
              PAID IN FULL
            </text>
          </svg>

          {/* Checkmark bubble */}
          <div
            style={{
              position: 'absolute',
              top: -28,
              right: -28,
              transform: `scale(${checkScale})`,
              transformOrigin: 'center',
            }}
          >
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="46" fill="#4ADE80" />
              <polyline
                points="22,48 38,64 74,30"
                fill="none"
                stroke={WHITE}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div style={{ opacity: text1Opacity, textAlign: 'center', marginBottom: 28 }}>
          <p style={{ ...headline(48, BLACK), marginBottom: 8 }}>PAY IN FULL</p>
          <p style={{ ...headline(48, BLACK), marginBottom: 20 }}>EVERY MONTH</p>
          <p style={{ ...headline(36, '#16A34A') }}>KEEP YOUR $92,000</p>
        </div>

        <div
          style={{
            opacity: ctaOpacity,
            background: ACCENT,
            borderRadius: 20,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 44,
            paddingRight: 44,
          }}
        >
          <p style={{ ...headline(28, WHITE), margin: 0 }}>DROP 'MYTH' IN THE COMMENTS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
