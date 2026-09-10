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
  letterSpacing: '0.15em',
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

// ─── Scene 2: 95% stat + dark pattern intro ──────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const count = Math.floor(
    interpolate(frame, [8, 85], [0, 95], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    })
  );

  const labelOpacity = interpolate(frame, [22, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardScale = spring({
    frame: Math.max(0, frame - 65),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 15, stiffness: 90 },
  });

  const cardOpacity = interpolate(frame, [65, 90], [0, 1], {
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
          padding: '0 54px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
          <span style={{ ...headline(132, ACCENT), lineHeight: 1 }}>{count}</span>
          <span style={{ ...headline(72, ACCENT), lineHeight: 1, paddingBottom: 14 }}>%</span>
        </div>

        <div style={{ ...headline(28, BLACK), opacity: labelOpacity, marginBottom: 56 }}>
          OF TOP APPS USE<br />DARK PATTERNS
        </div>

        <div
          style={{
            transform: `scale(${cardScale})`,
            opacity: cardOpacity,
            background: '#ffffff',
            borderRadius: 26,
            padding: '40px 40px 32px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            width: '100%',
            maxWidth: 510,
            textAlign: 'center' as const,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 22,
              color: '#1a1a1a',
              marginBottom: 28,
              letterSpacing: '0.08em',
            }}
          >
            UPGRADE YOUR PLAN
          </div>
          <div
            style={{
              background: '#22c55e',
              color: WHITE,
              fontFamily: FONT,
              fontSize: 26,
              borderRadius: 14,
              padding: '22px 0',
              marginBottom: 18,
              letterSpacing: '0.1em',
            }}
          >
            YES — $9.99/MO
          </div>
          <div
            style={{
              color: '#c0c0c0',
              fontFamily: '"Arial", sans-serif',
              fontSize: 12,
              letterSpacing: '0.04em',
            }}
          >
            no thanks, maybe later
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Free trial auto-upgrade (#1) ───────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const secondsLeft = Math.max(
    0,
    Math.floor(
      interpolate(frame, [0, 150], [72 * 3600, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    )
  );

  const pad = (n: number) => String(n).padStart(2, '0');
  const hrs = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  const cardSlide = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    from: -300,
    to: 0,
    config: { damping: 20, stiffness: 90 },
  });

  const chargedOpacity = interpolate(frame, [152, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chargedScale = spring({
    frame: Math.max(0, frame - 152),
    fps: 30,
    from: 2.2,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });

  const statOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const timerColor = frame > 140 ? ACCENT : WHITE;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 50px',
        }}
      >
        <div style={{ ...headline(30, WHITE), opacity: labelOpacity, marginBottom: 28 }}>
          #1 — FREE TRIAL AUTO-UPGRADE
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 78,
            color: timerColor,
            letterSpacing: '0.04em',
            textAlign: 'center' as const,
            marginBottom: 48,
            lineHeight: 1,
          }}
        >
          {pad(hrs)}:{pad(mins)}:{pad(secs)}
        </div>

        <div style={{ transform: `translateX(${cardSlide}px)`, position: 'relative' as const }}>
          <svg width="320" height="188" viewBox="0 0 320 188">
            <rect x="0" y="0" width="320" height="188" rx="18" fill="#1e3a5f" />
            <rect x="0" y="56" width="320" height="52" fill="#17305a" />
            <rect x="22" y="68" width="44" height="34" rx="6" fill="#c9960e" />
            <line x1="44" y1="68" x2="44" y2="102" stroke="#a87c0b" strokeWidth="1.5" />
            <line x1="22" y1="85" x2="66" y2="85" stroke="#a87c0b" strokeWidth="1.5" />
            <text x="22" y="146" fill="#dddddd" fontSize="17" fontFamily="monospace" letterSpacing="2">
              •••• •••• •••• 4829
            </text>
            <text x="22" y="172" fill="#aaaaaa" fontSize="12" fontFamily="monospace">
              J. SMITH
            </text>
            <text x="250" y="172" fill="#aaaaaa" fontSize="12" fontFamily="monospace">
              09/28
            </text>
          </svg>

          {frame >= 150 && (
            <div
              style={{
                position: 'absolute' as const,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: chargedOpacity,
                transform: `scale(${chargedScale})`,
              }}
            >
              <div
                style={{
                  background: ACCENT,
                  color: WHITE,
                  fontFamily: FONT,
                  fontSize: 40,
                  padding: '10px 26px',
                  borderRadius: 12,
                  letterSpacing: '0.18em',
                  transform: 'rotate(-10deg)',
                }}
              >
                CHARGED!
              </div>
            </div>
          )}
        </div>

        <div style={{ ...headline(26, ACCENT), opacity: statOpacity, marginTop: 48 }}>
          73% NEVER CANCEL IN TIME
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Confirm shaming (#2) ───────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [8, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bigBtnScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  const shameFadeIn = interpolate(frame, [72, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [112, 138], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelOpacity = interpolate(frame, [145, 170], [0, 1], {
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
          padding: '0 54px',
        }}
      >
        <div style={{ ...headline(40, BLACK), opacity: titleOpacity, marginBottom: 52 }}>
          #2 — CONFIRM SHAMING
        </div>

        <div
          style={{
            transform: `scale(${bigBtnScale})`,
            background: '#22c55e',
            color: WHITE,
            fontFamily: FONT,
            fontSize: 30,
            borderRadius: 18,
            padding: '28px 0',
            width: '100%',
            maxWidth: 540,
            textAlign: 'center' as const,
            letterSpacing: '0.1em',
            marginBottom: 22,
            boxShadow: '0 6px 24px rgba(34,197,94,0.4)',
          }}
        >
          YES, SIGN ME UP!
        </div>

        <div
          style={{
            opacity: shameFadeIn,
            color: '#b0b0b0',
            fontFamily: '"Arial", sans-serif',
            fontSize: 14,
            textAlign: 'center' as const,
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          no thanks, i don't want to save money
        </div>

        <div style={{ opacity: arrowOpacity }}>
          <svg width="44" height="64" viewBox="0 0 44 64">
            <path
              d="M22 64 L22 8 M22 8 L8 24 M22 8 L36 24"
              stroke={ACCENT}
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ ...headline(28, ACCENT), opacity: labelOpacity, marginTop: 14 }}>
          ENGINEERED TO TRIGGER<br />GUILT &amp; SHAME
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Impossible unsubscribe (#3) + EU ban ───────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const steps = ['SETTINGS', 'ACCOUNT', 'MEMBERSHIP', 'CANCEL?', 'CALL US', 'SURVEY'];

  const euOpacity = interpolate(frame, [158, 183], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const euScale = spring({
    frame: Math.max(0, frame - 158),
    fps: 30,
    from: 0.5,
    to: 1,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
        }}
      >
        <div style={{ ...headline(36, WHITE), opacity: titleOpacity, marginBottom: 38 }}>
          #3 — THE IMPOSSIBLE<br />UNSUBSCRIBE
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            width: '100%',
            maxWidth: 430,
            marginBottom: 42,
          }}
        >
          {steps.map((step, i) => {
            const stepOpacity = interpolate(frame, [18 + i * 20, 38 + i * 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const isCancel = step === 'CANCEL?';
            const isLast = i === steps.length - 1;
            return (
              <div
                key={step}
                style={{
                  opacity: stepOpacity,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    background: isCancel ? '#2d1212' : '#252525',
                    border: `2px solid ${isCancel ? ACCENT : '#3a3a3a'}`,
                    borderRadius: 10,
                    padding: '13px 0',
                    width: '100%',
                    textAlign: 'center' as const,
                    fontFamily: FONT,
                    fontSize: 18,
                    color: isCancel ? ACCENT : '#cccccc',
                    letterSpacing: '0.08em',
                  }}
                >
                  {step}
                </div>
                {!isLast && (
                  <div
                    style={{
                      color: '#555555',
                      fontSize: 20,
                      padding: '3px 0',
                      fontFamily: FONT,
                    }}
                  >
                    ↓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: euOpacity,
            transform: `scale(${euScale})`,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            background: '#1a2a3a',
            borderRadius: 18,
            padding: '18px 30px',
          }}
        >
          <svg width="52" height="34" viewBox="0 0 52 34">
            <rect x="0" y="0" width="52" height="34" rx="5" fill="#003399" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const cx = 26 + 12 * Math.cos(angle);
              const cy = 17 + 12 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="2.2" fill="#FFCC00" />;
            })}
          </svg>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 20,
              color: '#22c55e',
              letterSpacing: '0.08em',
            }}
          >
            BANNED IN EU — 2023
          </div>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="13" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            <path
              d="M8 15 L13 20 L22 10"
              stroke="#22c55e"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — audit your bank statement ────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statementLines = [
    { label: 'NETFLIX', amount: '$15.99', flag: false },
    { label: 'SPOTIFY', amount: '$10.99', flag: false },
    { label: 'APP STORE*', amount: '$9.99', flag: true },
    { label: 'UNKNOWN SVC', amount: '$14.99', flag: true },
    { label: 'CLOUD BACKUP?', amount: '$8.99', flag: true },
  ];

  const shieldScale = spring({
    frame: Math.max(0, frame - 122),
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 14, stiffness: 95 },
  });

  const shieldOpacity = interpolate(frame, [122, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaOpacity = interpolate(frame, [162, 186], [0, 1], {
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
          padding: '0 50px',
        }}
      >
        <div style={{ ...headline(38, BLACK), opacity: titleOpacity, marginBottom: 38 }}>
          CHECK YOUR<br />STATEMENT TONIGHT
        </div>

        <div
          style={{
            background: WHITE,
            borderRadius: 22,
            overflow: 'hidden' as const,
            width: '100%',
            maxWidth: 520,
            boxShadow: '0 6px 28px rgba(0,0,0,0.12)',
            marginBottom: 38,
          }}
        >
          {statementLines.map((row, i) => {
            const rowOpacity = interpolate(frame, [18 + i * 18, 38 + i * 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const xOpacity = row.flag
              ? interpolate(frame, [78 + i * 14, 98 + i * 14], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              : 0;
            return (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 26px',
                  borderBottom: i < statementLines.length - 1 ? '1px solid #eeeeee' : 'none',
                  opacity: rowOpacity,
                  background: row.flag ? 'rgba(239,68,68,0.06)' : 'transparent',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Arial", sans-serif',
                    fontSize: 18,
                    color: row.flag ? ACCENT : '#333333',
                    fontWeight: row.flag ? 700 : 400,
                  }}
                >
                  {row.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      fontFamily: '"Arial", sans-serif',
                      fontSize: 18,
                      color: row.flag ? ACCENT : '#666666',
                    }}
                  >
                    {row.amount}
                  </div>
                  {row.flag && (
                    <svg width="22" height="22" viewBox="0 0 22 22" style={{ opacity: xOpacity }}>
                      <path
                        d="M4 4 L18 18 M18 4 L4 18"
                        stroke={ACCENT}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: shieldOpacity,
            transform: `scale(${shieldScale})`,
            marginBottom: 26,
          }}
        >
          <svg width="84" height="96" viewBox="0 0 84 96">
            <path
              d="M42 6 L78 22 L78 52 Q78 78 42 90 Q6 78 6 52 L6 22 Z"
              fill="#22c55e"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <path
              d="M26 46 L36 56 L58 34"
              stroke="#ffffff"
              strokeWidth="5.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ ...headline(30, '#22c55e'), opacity: shieldOpacity, marginBottom: 30 }}>
          $840 RECLAIMED
        </div>

        <div
          style={{
            ...headline(32, WHITE),
            opacity: ctaOpacity,
            background: ACCENT,
            padding: '22px 36px',
            borderRadius: 18,
          }}
        >
          AUDIT YOUR APPS<br />TONIGHT
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 1: Hook — apps stealing $840/year ─────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneY = spring({
    frame,
    fps: 30,
    from: 320,
    to: 0,
    config: { damping: 18, stiffness: 80 },
  });

  const titleOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowOpacity = interpolate(frame % 30, [0, 15, 29], [0.15, 0.5, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dollarXPositions = [55, 88, 110, 68, 98];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
        }}
      >
        <div style={{ ...headline(50, ACCENT), opacity: titleOpacity, marginBottom: 44 }}>
          YOUR APPS ARE<br />STEALING<br />FROM YOU
        </div>

        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width="190" height="330" viewBox="0 0 190 330">
            <ellipse cx="95" cy="165" rx="90" ry="148" fill={ACCENT} opacity={glowOpacity} />
            <rect x="8" y="8" width="174" height="314" rx="24" fill="#1c1c1c" stroke={ACCENT} strokeWidth="3" />
            <rect x="68" y="19" width="54" height="8" rx="4" fill="#2e2e2e" />
            <circle cx="151" cy="23" r="5" fill="#2e2e2e" />
            <rect x="18" y="44" width="154" height="248" rx="8" fill="#0c0c0c" />
            {dollarXPositions.map((dx, i) => {
              const startF = i * 22 + 22;
              const dy = interpolate(frame, [startF, startF + 70], [55, 290], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const dOp = interpolate(
                frame,
                [startF, startF + 10, startF + 58, startF + 70],
                [0, 1, 1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              return (
                <text
                  key={i}
                  x={dx}
                  y={dy}
                  fill={ACCENT}
                  fontSize="24"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="Arial Black, sans-serif"
                  opacity={dOp}
                >
                  $
                </text>
              );
            })}
            <rect x="77" y="304" width="36" height="6" rx="3" fill="#2e2e2e" />
          </svg>
        </div>

        <div style={{ ...headline(38, WHITE), opacity: subOpacity, marginTop: 32 }}>
          $840 / YEAR AVERAGE
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

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
