import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

  const cartSc = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 70 } });
  const count = Math.floor(
    interpolate(frame, [20, dur - 50], [0, 2100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const numOp = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 80px',
        }}
      >
        <div style={{ transform: `scale(${cartSc})`, transformOrigin: 'center' }}>
          <svg width={200} height={180} viewBox="0 0 100 90">
            <line x1="5" y1="8" x2="22" y2="8" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <path
              d="M22 8 L32 52 L82 52"
              stroke={ACCENT}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27 24 L88 24 L82 52"
              stroke={ACCENT}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="66" r="7" fill={ACCENT} />
            <circle cx="74" cy="66" r="7" fill={ACCENT} />
          </svg>
        </div>

        <div style={{ opacity: numOp, textAlign: 'center' as const }}>
          <p style={headline(118, ACCENT)}>${count.toLocaleString()}</p>
          <p style={{ ...headline(38, WHITE), marginTop: 10 }}>PER YEAR</p>
        </div>

        <p style={{ ...headline(32, WHITE), opacity: subOp }}>WASTED ON BRAND NAMES</p>

        <p
          style={{
            fontFamily: FONT,
            fontSize: 30,
            color: '#9CA3AF',
            textAlign: 'center' as const,
            margin: 0,
            opacity: tagOp,
            lineHeight: 1.4,
          }}
        >
          The store brand is the same product
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const facSc = spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 80 } });
  const box1Op = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '0 80px',
        }}
      >
        <p style={headline(42, BLACK)}>ONE FACTORY</p>

        <div style={{ transform: `scale(${facSc})`, transformOrigin: 'center' }}>
          <svg width={240} height={170} viewBox="0 0 240 170">
            <rect x="20" y="80" width="200" height="82" fill="#374151" rx="4" />
            <rect x="20" y="72" width="200" height="12" fill="#1F2937" rx="2" />
            <rect x="42" y="26" width="26" height="50" fill="#374151" rx="4" />
            <rect x="90" y="36" width="22" height="40" fill="#374151" rx="4" />
            <rect x="152" y="30" width="24" height="46" fill="#374151" rx="4" />
            <circle cx="55" cy="20" r="10" fill="#6B7280" opacity="0.7" />
            <circle cx="101" cy="30" r="9" fill="#6B7280" opacity="0.6" />
            <circle cx="164" cy="24" r="9" fill="#6B7280" opacity="0.6" />
            <rect x="30" y="92" width="32" height="22" fill={ACCENT} rx="3" opacity="0.9" />
            <rect x="80" y="92" width="32" height="22" fill={ACCENT} rx="3" opacity="0.9" />
            <rect x="140" y="92" width="32" height="22" fill={ACCENT} rx="3" opacity="0.9" />
            <rect x="190" y="92" width="22" height="22" fill={ACCENT} rx="3" opacity="0.9" />
            <rect x="100" y="122" width="40" height="40" fill="#111827" rx="3" />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
          <div
            style={{
              opacity: box1Op,
              background: '#1E293B',
              border: '3px solid #94A3B8',
              borderRadius: 12,
              padding: '24px 28px',
              textAlign: 'center' as const,
              width: 250,
            }}
          >
            <p style={{ ...headline(22, '#94A3B8'), marginBottom: 10 }}>BRAND NAME</p>
            <p style={headline(54, WHITE)}>$10</p>
          </div>

          <div
            style={{
              opacity: box2Op,
              background: ACCENT,
              borderRadius: 12,
              padding: '24px 28px',
              textAlign: 'center' as const,
              width: 250,
            }}
          >
            <p style={{ ...headline(22, WHITE), marginBottom: 10 }}>STORE BRAND</p>
            <p style={headline(54, BLACK)}>$6.50</p>
          </div>
        </div>

        <p style={{ ...headline(34, BLACK), opacity: labelOp }}>~80% SAME MANUFACTURER</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const BAR_MAX = 320;
  const bar1H = Math.max(
    0,
    interpolate(
      spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 60 } }),
      [0, 1],
      [0, BAR_MAX]
    )
  );
  const bar2H = Math.max(
    0,
    interpolate(
      spring({ frame: frame - 45, fps, config: { damping: 20, stiffness: 60 } }),
      [0, 1],
      [0, Math.floor(BAR_MAX * 0.65)]
    )
  );
  const titleOp = interpolate(frame, [5, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(44, WHITE), opacity: titleOp }}>SAME PRODUCT</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, height: BAR_MAX + 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: BAR_MAX - bar1H }} />
            <div
              style={{
                width: 160,
                height: bar1H,
                background: '#6B7280',
                borderRadius: '8px 8px 0 0',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: BAR_MAX - bar2H }} />
            <div
              style={{
                width: 160,
                height: bar2H,
                background: ACCENT,
                borderRadius: '8px 8px 0 0',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 60 }}>
          <div style={{ textAlign: 'center' as const, width: 160 }}>
            <p style={headline(46, WHITE)}>$10</p>
            <p style={{ ...headline(24, '#9CA3AF'), marginTop: 8 }}>BRAND NAME</p>
          </div>
          <div style={{ textAlign: 'center' as const, width: 160 }}>
            <p style={headline(46, ACCENT)}>$6.50</p>
            <p style={{ ...headline(24, ACCENT), marginTop: 8 }}>STORE BRAND</p>
          </div>
        </div>

        <p style={{ ...headline(34, ACCENT), opacity: diffOp }}>35% CHEAPER — SAME THING</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainSc = spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 70 } });
  const adCount = Math.floor(
    interpolate(frame, [30, 130], [0, 13], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const subOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 80px',
        }}
      >
        <div style={{ transform: `scale(${brainSc})`, transformOrigin: 'center' }}>
          <svg width={160} height={150} viewBox="0 0 100 95">
            <path
              d="M50 88 Q18 82 16 60 Q8 46 18 33 Q16 16 32 15 Q40 6 50 10 Q60 6 68 15 Q84 16 82 33 Q92 46 84 60 Q82 82 50 88Z"
              stroke={BLACK}
              strokeWidth="3"
              fill="none"
            />
            <path d="M50 10 Q52 32 50 55 Q48 70 50 88" stroke={BLACK} strokeWidth="2" fill="none" />
            <path d="M16 55 Q30 52 40 60 Q45 65 42 75" stroke={BLACK} strokeWidth="2" fill="none" />
            <path d="M84 55 Q70 52 60 60 Q55 65 58 75" stroke={BLACK} strokeWidth="2" fill="none" />
            <path d="M18 33 Q32 38 35 50" stroke={BLACK} strokeWidth="2" fill="none" />
            <path d="M82 33 Q68 38 65 50" stroke={BLACK} strokeWidth="2" fill="none" />
            <circle cx="50" cy="4" r="5" fill={ACCENT} />
            <circle cx="36" cy="8" r="4" fill={ACCENT} />
            <circle cx="64" cy="8" r="4" fill={ACCENT} />
          </svg>
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <p style={headline(100, BLACK)}>${adCount}B</p>
          <p style={{ ...headline(32, BLACK), marginTop: 8 }}>SPENT ON ADS PER YEAR</p>
        </div>

        <p style={{ ...headline(36, ACCENT), opacity: subOp }}>BUYING YOUR LOYALTY</p>

        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: '#6B7280',
            textAlign: 'center' as const,
            margin: 0,
            opacity: tagOp,
            lineHeight: 1.4,
          }}
        >
          So you'll pay 35% more for the same thing
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalOp = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: 'Yr 1', value: '$2,100', targetH: 38, delay: 15 },
    { label: 'Yr 10', value: '$31K', targetH: 125, delay: 40 },
    { label: 'Yr 20', value: '$104K', targetH: 220, delay: 65 },
    { label: 'Yr 30', value: '$237K', targetH: 340, delay: 90 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 60px',
        }}
      >
        <p style={{ ...headline(38, WHITE), opacity: titleOp }}>INVEST THE DIFFERENCE</p>
        <p style={{ ...headline(26, '#9CA3AF'), opacity: titleOp }}>$2,100/YEAR AT 8% RETURNS</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 380 }}>
          {bars.map((bar, i) => {
            const barH = Math.max(
              0,
              interpolate(
                spring({ frame: frame - bar.delay, fps, config: { damping: 20, stiffness: 60 } }),
                [0, 1],
                [0, bar.targetH]
              )
            );
            const valOp = interpolate(
              frame,
              [bar.delay + 20, bar.delay + 50],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const isLast = i === bars.length - 1;
            return (
              <div
                key={i}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
              >
                <p style={{ ...headline(isLast ? 30 : 24, isLast ? ACCENT : WHITE), opacity: valOp }}>
                  {bar.value}
                </p>
                <div style={{ height: 380 - bar.targetH }} />
                <div
                  style={{
                    width: 140,
                    height: barH,
                    background: isLast ? ACCENT : '#374151',
                    borderRadius: '6px 6px 0 0',
                  }}
                />
                <p style={{ ...headline(22, '#9CA3AF'), opacity: valOp }}>{bar.label}</p>
              </div>
            );
          })}
        </div>

        <p style={{ ...headline(34, ACCENT), opacity: finalOp }}>$237,000 FROM ONE SWAP</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [140, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [168, 196], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    'CANNED GOODS',
    'PASTA & RICE',
    'CLEANING SUPPLIES',
    'FROZEN VEGGIES',
    'CEREALS',
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          padding: '0 90px',
        }}
      >
        <p style={{ ...headline(42, BLACK), opacity: titleOp }}>START WITH THESE</p>

        {items.map((item, i) => {
          const itemOp = interpolate(
            frame,
            [20 + i * 18, 48 + i * 18],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const checkSc = spring({
            frame: frame - (24 + i * 18),
            fps,
            config: { damping: 14, stiffness: 100 },
          });
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                opacity: itemOp,
                width: '100%',
              }}
            >
              <div
                style={{
                  width: Math.max(0, 48 * checkSc),
                  height: Math.max(0, 48 * checkSc),
                  background: ACCENT,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden' as const,
                }}
              >
                <svg width={28} height={28} viewBox="0 0 28 28">
                  <path
                    d="M5 14 L11 20 L23 8"
                    stroke={WHITE}
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 32,
                  color: BLACK,
                  margin: 0,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {item}
              </p>
            </div>
          );
        })}

        <div style={{ opacity: piggyOp, marginTop: 8 }}>
          <svg width={110} height={88} viewBox="0 0 110 88">
            <ellipse cx="52" cy="56" rx="36" ry="28" fill={ACCENT} />
            <circle cx="86" cy="48" r="16" fill={ACCENT} />
            <ellipse cx="96" cy="53" rx="8" ry="6" fill="#059669" />
            <circle cx="93" cy="53" r="2" fill={BLACK} />
            <circle cx="99" cy="53" r="2" fill={BLACK} />
            <ellipse cx="86" cy="33" rx="6" ry="8" fill="#059669" />
            <circle cx="90" cy="44" r="3" fill={BLACK} />
            <rect x="46" y="27" width="14" height="4" rx="2" fill="#059669" />
            <rect x="26" y="78" width="12" height="8" rx="4" fill="#059669" />
            <rect x="44" y="78" width="12" height="8" rx="4" fill="#059669" />
            <rect x="62" y="78" width="12" height="8" rx="4" fill="#059669" />
            <rect x="14" y="52" width="10" height="18" rx="5" fill="#059669" />
          </svg>
        </div>

        <p style={{ ...headline(36, ACCENT), opacity: ctaOp }}>SAVE $2,100 THIS YEAR</p>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: BLACK,
            textAlign: 'center' as const,
            margin: 0,
            opacity: ctaOp,
            lineHeight: 1.4,
          }}
        >
          Follow for more money tricks
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
