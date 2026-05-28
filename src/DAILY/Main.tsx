import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#FEF2F2';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 2: Monthly payment breakdown $2,661 → $2,333 interest vs $328 equity
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const paySpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 70 } });
  const payScale = interpolate(paySpring, [0, 1], [0.7, 1]);

  const barProgress = interpolate(frame, [55, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const interestBarW = interpolate(barProgress, [0, 1], [0, 87.7]);
  const principalBarW = interpolate(barProgress, [0, 1], [0, 12.3]);

  const badgeSpring = spring({ frame: Math.max(0, frame - 175), fps, config: { damping: 10, stiffness: 90 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(42, BLACK) }}>YOUR FIRST</p>
          <p style={{ ...headline(54, ACCENT), marginTop: 6 }}>MORTGAGE PAYMENT</p>
        </div>

        <div
          style={{
            transform: `scale(${payScale})`,
            background: BLACK,
            borderRadius: 16,
            padding: '18px 48px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>every month</p>
          <p style={{ ...headline(76, WHITE), margin: '6px 0 0' }}>$2,661</p>
        </div>

        <div style={{ width: '100%', maxWidth: 520 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>To the bank</p>
              <p style={{ ...headline(36, ACCENT) }}>$2,333</p>
            </div>
            <div style={{ background: '#fecaca', borderRadius: 8, height: 44, overflow: 'hidden' }}>
              <div style={{ width: `${interestBarW}%`, height: 44, background: ACCENT, borderRadius: 8 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>Your equity</p>
              <p style={{ ...headline(36, GREEN) }}>$328</p>
            </div>
            <div style={{ background: '#d1fae5', borderRadius: 8, height: 44, overflow: 'hidden' }}>
              <div style={{ width: `${principalBarW}%`, height: 44, background: GREEN, borderRadius: 8 }} />
            </div>
          </div>
        </div>

        <div style={{ transform: `scale(${badgeScale})`, background: ACCENT, borderRadius: 12, padding: '12px 28px' }}>
          <p style={{ ...headline(30, WHITE) }}>87% GOES TO THE BANK</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: 30-year amortization chart — interest front-loaded ──────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const barProgress = interpolate(frame, [45, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const yearData = [
    { label: 'YR 1', interest: 88, principal: 12 },
    { label: 'YR 5', interest: 83, principal: 17 },
    { label: 'YR 10', interest: 78, principal: 22 },
    { label: 'YR 20', interest: 62, principal: 38 },
    { label: 'YR 30', interest: 10, principal: 90 },
  ];

  const maxH = 260;
  const barW = 70;
  const barGap = 28;
  const svgW = Math.max(0, Math.floor(yearData.length)) * (barW + barGap) - barGap;
  const svgH = maxH + 52;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '60px 40px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(40, WHITE) }}>WHERE DOES YOUR PAYMENT GO</p>
          <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>YEAR BY YEAR?</p>
        </div>

        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
          {yearData.map((d, i) => {
            const x = i * (barW + barGap);
            const intH = (d.interest / 100) * maxH * barProgress;
            const prinH = (d.principal / 100) * maxH * barProgress;
            const intY = maxH - intH;
            const prinY = intY - prinH;
            return (
              <g key={d.label}>
                <rect x={x} y={intY} width={barW} height={intH} fill={ACCENT} rx={4} />
                <rect x={x} y={prinY} width={barW} height={prinH} fill={GREEN} rx={4} />
                <text
                  x={x + barW / 2}
                  y={maxH + 34}
                  textAnchor="middle"
                  fill={WHITE}
                  fontSize={20}
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, background: ACCENT, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>INTEREST</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, background: GREEN, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>YOUR EQUITY</p>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, background: ACCENT, borderRadius: 12, padding: '12px 28px' }}>
          <p style={{ ...headline(28, WHITE) }}>80%+ INTEREST FOR 7+ YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Bank building + $558K interest counter ─────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const bankSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 70 } });
  const bankScale = interpolate(bankSpring, [0, 1], [0.5, 1]);

  const counter = Math.floor(
    interpolate(frame, [60, 175], [0, 558000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const counterOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const compOpacity = interpolate(frame, [178, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const colCount = Math.max(0, Math.floor(4));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(40, BLACK) }}>THE BANK KEEPS</p>
          <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>IN INTEREST ALONE</p>
        </div>

        <div style={{ transform: `scale(${bankScale})` }}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            <rect x={20} y={70} width={160} height={120} rx={2} fill="#1e2a3a" stroke={ACCENT} strokeWidth={3} />
            <polygon points="10,70 100,18 190,70" fill={ACCENT} />
            {Array.from({ length: colCount }).map((_, col) => (
              <rect key={col} x={36 + col * 36} y={78} width={16} height={104} rx={2} fill="#374151" />
            ))}
            <rect x={10} y={188} width={180} height={10} rx={2} fill={ACCENT} />
            <text
              x={100}
              y={148}
              textAnchor="middle"
              fontSize={52}
              fontFamily="Arial Black"
              fill={ACCENT}
              fontWeight="bold"
            >
              $
            </text>
          </svg>
        </div>

        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(74, ACCENT) }}>${counter.toLocaleString()}</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: '4px 0 0', textAlign: 'center' }}>
            PAID IN INTEREST
          </p>
        </div>

        <div
          style={{
            opacity: compOpacity,
            borderTop: `3px solid ${ACCENT}`,
            paddingTop: 16,
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, textAlign: 'center' }}>
            your home was worth:{' '}
            <span style={{ color: GREEN, fontFamily: FONT, fontWeight: 'bold', fontSize: 28 }}>$400,000</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Normal path vs one extra payment per year ───────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const barProgress = interpolate(frame, [45, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 10, stiffness: 90 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  const maxBarH = 220;
  const normalBarH = maxBarH * barProgress;
  const extraBarH = (473 / 558) * maxBarH * barProgress;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(42, WHITE) }}>ONE EXTRA PAYMENT</p>
          <p style={{ ...headline(54, GREEN), marginTop: 4 }}>CHANGES EVERYTHING</p>
        </div>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(26, ACCENT), marginBottom: 6 }}>$558K INTEREST</p>
            <div
              style={{
                width: 120,
                height: normalBarH,
                background: ACCENT,
                borderRadius: '8px 8px 0 0',
              }}
            />
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>NORMAL</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, opacity: 0.6, margin: 0, textAlign: 'center' }}>
              30 YEARS
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(26, GREEN), marginBottom: 6 }}>$473K INTEREST</p>
            <div
              style={{
                width: 120,
                height: extraBarH,
                background: GREEN,
                borderRadius: '8px 8px 0 0',
              }}
            />
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>+1/YEAR</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: GREEN, margin: 0, textAlign: 'center' }}>26 YEARS</p>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: GREEN,
            borderRadius: 14,
            padding: '14px 32px',
          }}
        >
          <p style={{ ...headline(34, WHITE) }}>SAVES $85,000 + 4 YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — 3 action cards + follow prompt ───────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const tips = [
    { label: 'SWITCH TO BIWEEKLY', detail: 'saves ~$56K' },
    { label: 'ROUND UP PAYMENTS', detail: 'even $50/mo helps' },
    { label: 'ONE EXTRA/YEAR', detail: 'saves $85K + 4 yrs' },
  ];

  const ctaSpring = spring({ frame: Math.max(0, frame - 178), fps, config: { damping: 10, stiffness: 90 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(44, BLACK) }}>FIGHT BACK WITH</p>
          <p style={{ ...headline(56, ACCENT), marginTop: 4 }}>THESE 3 MOVES</p>
        </div>

        <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tips.map((tip, i) => {
            const tipSpring = spring({
              frame: Math.max(0, frame - 30 - i * 35),
              fps,
              config: { damping: 14, stiffness: 80 },
            });
            const tipX = interpolate(tipSpring, [0, 1], [-140, 0]);
            return (
              <div
                key={tip.label}
                style={{
                  transform: `translateX(${tipX}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: BLACK,
                  borderRadius: 12,
                  padding: '16px 24px',
                  borderLeft: `6px solid ${ACCENT}`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: GREEN,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>✓</p>
                </div>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: 0, fontWeight: 'bold' }}>
                    {tip.label}
                  </p>
                  <p style={{ fontFamily: FONT, fontSize: 20, color: GREEN, margin: '3px 0 0' }}>{tip.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            transform: `scale(${ctaScale})`,
            background: ACCENT,
            borderRadius: 14,
            padding: '14px 36px',
          }}
        >
          <p style={{ ...headline(32, WHITE) }}>FOLLOW FOR MORE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 1: House SVG + counter animates $400K → $958K ─────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-80, 0]);

  const houseSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 70 } });
  const houseScale = interpolate(houseSpring, [0, 1], [0.4, 1]);

  const displayPrice = Math.floor(
    interpolate(frame, [60, 170], [400000, 958000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const priceOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 10, stiffness: 100 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(48, WHITE), marginBottom: 6 }}>YOUR $400K HOME</p>
          <p style={{ ...headline(60, ACCENT) }}>ACTUALLY COSTS</p>
        </div>

        <div style={{ transform: `scale(${houseScale})` }}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            <rect x={30} y={100} width={140} height={90} rx={4} fill="#1e2a3a" stroke={ACCENT} strokeWidth={3} />
            <polygon points="15,100 100,28 185,100" fill={ACCENT} />
            <rect x={80} y={140} width={40} height={50} rx={4} fill={BG_DARK} stroke={WHITE} strokeWidth={1.5} />
            <rect x={38} y={116} width={36} height={28} rx={3} fill="#3B82F6" opacity={0.8} />
            <rect x={126} y={116} width={36} height={28} rx={3} fill="#3B82F6" opacity={0.8} />
            <rect x={128} y={36} width={20} height={36} rx={2} fill="#374151" stroke={ACCENT} strokeWidth={2} />
          </svg>
        </div>

        <div style={{ opacity: priceOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(82, ACCENT) }}>${displayPrice.toLocaleString()}</p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: WHITE,
              opacity: 0.7,
              margin: '4px 0 0',
              textAlign: 'center',
            }}
          >
            TOTAL PAID OVER 30 YEARS
          </p>
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: ACCENT,
            borderRadius: 14,
            padding: '14px 32px',
          }}
        >
          <p style={{ ...headline(32, WHITE) }}>$558K GOES TO INTEREST</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
