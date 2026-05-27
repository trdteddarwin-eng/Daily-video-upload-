import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5EFE6';
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

// ─── SCENES ──────────────────────────────────────────────────────────────────

// Scene 2: Two shopping bags — food cost premium
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const leftSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 80 } });
  const leftX = interpolate(leftSpring, [0, 1], [-320, 0]);

  const rightSpring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 80 } });
  const rightX = interpolate(rightSpring, [0, 1], [320, 0]);

  const pct = Math.floor(
    interpolate(frame, [55, 150], [0, 43], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const labelOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(44, BLACK), marginBottom: 6 }}>#1: FOOD COSTS</p>
          <p style={{ ...headline(30, ACCENT) }}>BUY SMALL = PAY MORE</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 50 }}>
          {/* Small bag — corner store */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width={180} height={230} viewBox="0 0 180 230">
              <path d="M 55 62 Q 55 10 90 10 Q 125 10 125 62" fill="none" stroke={'#DC2626'} strokeWidth={12} strokeLinecap="round" />
              <rect x={18} y={60} width={144} height={162} rx={12} fill={ACCENT} />
              <text x={90} y={128} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={36} fontWeight="bold">$3.49</text>
              <text x={90} y={168} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={22}>per oz</text>
            </svg>
            <p style={{ ...headline(22, BLACK), margin: 0 }}>CORNER STORE</p>
            <p style={{ ...headline(18, '#777'), margin: 0 }}>SMALL PACK</p>
          </div>

          <p style={{ ...headline(42, '#aaaaaa'), margin: 0, paddingBottom: 110 }}>VS</p>

          {/* Large bag — bulk store */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width={230} height={290} viewBox="0 0 230 290">
              <path d="M 68 72 Q 68 10 115 10 Q 162 10 162 72" fill="none" stroke={'#059669'} strokeWidth={14} strokeLinecap="round" />
              <rect x={16} y={70} width={198} height={212} rx={14} fill={GREEN} />
              <text x={115} y={158} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={44} fontWeight="bold">$0.99</text>
              <text x={115} y={200} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={26}>per oz</text>
            </svg>
            <p style={{ ...headline(22, BLACK), margin: 0 }}>BULK STORE</p>
            <p style={{ ...headline(18, '#777'), margin: 0 }}>LARGE PACK</p>
          </div>
        </div>

        <div
          style={{
            opacity: labelOpacity,
            background: ACCENT,
            borderRadius: 14,
            padding: '14px 32px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 40, color: WHITE, margin: 0 }}>{pct}% MORE EXPENSIVE</p>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.8)'), marginTop: 8 }}>+$800/YEAR ON GROCERIES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Bank building with flying dollars — banking fees
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const bankSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 70 } });
  const bankY = interpolate(bankSpring, [0, 1], [300, 0]);

  const feeCount = Math.floor(
    interpolate(frame, [70, 190], [0, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const feeOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dollarCount = Math.max(0, Math.floor(5));
  const dollarItems = Array(dollarCount).fill(0).map((_unused, i) => {
    const startFrame = 25 + i * 16;
    const op = interpolate(
      frame,
      [startFrame, startFrame + 12, startFrame + 48, startFrame + 60],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const yOff = interpolate(frame, [startFrame, startFrame + 60], [0, -120], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const xOffsets = [15, 75, -35, 45, -55];
    const xOff = xOffsets[i];
    return { op, yOff, xOff, key: i };
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(44, WHITE), marginBottom: 6 }}>#2: BANKING FEES</p>
          <p style={{ ...headline(28, ACCENT) }}>PAY TO ACCESS YOUR OWN MONEY</p>
        </div>

        <div style={{ transform: `translateY(${bankY}px)`, position: 'relative', width: 340, height: 320 }}>
          <svg width={340} height={320} viewBox="0 0 340 320">
            <rect x={50} y={130} width={240} height={175} rx={4} fill={'#1E3A5F'} stroke={ACCENT} strokeWidth={2} />
            <polygon points="30,130 170,50 310,130" fill={'#2B4F8A'} stroke={ACCENT} strokeWidth={2} />
            {[75, 120, 165, 210, 255].map((x, i) => (
              <rect key={i} x={x} y={130} width={14} height={155} fill={'#2B5EA7'} />
            ))}
            <rect x={30} y={290} width={280} height={16} rx={3} fill={'#162a55'} />
            <rect x={18} y={303} width={304} height={14} rx={3} fill={'#0e1c3a'} />
            <text x={170} y={103} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={20} fontWeight="bold">BANK</text>
            <rect x={148} y={210} width={44} height={95} rx={5} fill={'#0F1F3D'} />
            {[65, 120, 210, 265].map((x, i) => (
              <rect key={i} x={x} y={152} width={30} height={38} rx={4} fill={'#0D1B3E'} />
            ))}
          </svg>

          {dollarItems.map(({ op, yOff, xOff, key }) => (
            <div
              key={key}
              style={{
                position: 'absolute',
                top: 80,
                left: 170 + xOff,
                opacity: op,
                transform: `translateY(${yOff}px)`,
                fontFamily: FONT,
                fontSize: 34,
                color: ACCENT,
                pointerEvents: 'none',
              }}
            >
              $
            </div>
          ))}
        </div>

        <div style={{ opacity: feeOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.5)'), marginBottom: 8 }}>ANNUAL FEES TO STAY BANKED</p>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>${feeCount}</p>
          <p style={{ ...headline(20, 'rgba(255,255,255,0.4)'), marginTop: 8 }}>WITH NO MINIMUM BALANCE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Two storefronts — cost of credit
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const leftSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 80 } });
  const leftX = interpolate(leftSpring, [0, 1], [-320, 0]);

  const rightSpring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 80 } });
  const rightX = interpolate(rightSpring, [0, 1], [320, 0]);

  const aprCount = Math.floor(
    interpolate(frame, [55, 160], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const aprOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
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
          <p style={{ ...headline(44, BLACK), marginBottom: 6 }}>#3: COST OF CREDIT</p>
          <p style={{ ...headline(30, ACCENT) }}>SAME LOAN — DIFFERENT WORLD</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 44 }}>
          {/* Bank building */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width={200} height={230} viewBox="0 0 200 230">
              <rect x={20} y={100} width={160} height={125} rx={6} fill={'#1E3A5F'} />
              <polygon points="10,100 100,28 190,100" fill={'#2B4F8A'} />
              {[38, 72, 106, 140].map((x, i) => (
                <rect key={i} x={x} y={100} width={12} height={105} fill={'#2B5EA7'} />
              ))}
              <rect x={84} y={165} width={32} height={60} rx={4} fill={'#0F1F3D'} />
              <text x={100} y={74} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={16} fontWeight="bold">BANK</text>
              <rect x={22} y={210} width={156} height={12} rx={3} fill={'#162a55'} />
            </svg>
            <div
              style={{
                background: GREEN,
                borderRadius: 10,
                padding: '10px 18px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0 }}>3% APR</p>
            </div>
            <p style={{ ...headline(20, BLACK), margin: 0 }}>TRADITIONAL BANK</p>
          </div>

          <p
            style={{
              ...headline(44, '#aaaaaa'),
              margin: 0,
              paddingTop: 120,
              opacity: vsOpacity,
            }}
          >
            VS
          </p>

          {/* Payday loan storefront */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width={200} height={230} viewBox="0 0 200 230">
              <rect x={20} y={55} width={160} height={170} rx={6} fill={'#7F1D1D'} />
              <rect x={20} y={35} width={160} height={46} rx={6} fill={ACCENT} />
              <text x={100} y={64} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={16} fontWeight="bold">PAYDAY LOANS</text>
              <rect x={28} y={100} width={62} height={52} rx={5} fill={'#3B1414'} />
              <rect x={110} y={100} width={62} height={52} rx={5} fill={'#3B1414'} />
              <rect x={75} y={168} width={50} height={57} rx={4} fill={'#2a0808'} />
            </svg>
            <div
              style={{
                opacity: aprOpacity,
                background: ACCENT,
                borderRadius: 10,
                padding: '10px 18px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0 }}>{aprCount}% APR</p>
            </div>
            <p style={{ ...headline(20, BLACK), margin: 0 }}>PAYDAY LENDER</p>
          </div>
        </div>

        <div
          style={{
            opacity: aprOpacity,
            background: ACCENT,
            borderRadius: 14,
            padding: '14px 32px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>133× MORE INTEREST</p>
          <p style={{ ...headline(20, 'rgba(255,255,255,0.8)'), marginTop: 6 }}>SAME $500 LOAN</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Two houses with zip codes — insurance premium
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const leftSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 80 } });
  const leftX = interpolate(leftSpring, [0, 1], [-300, 0]);

  const rightSpring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 80 } });
  const rightX = interpolate(rightSpring, [0, 1], [300, 0]);

  const penaltyCount = Math.floor(
    interpolate(frame, [55, 158], [0, 500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const penaltyOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          <p style={{ ...headline(44, WHITE), marginBottom: 6 }}>#4: INSURANCE</p>
          <p style={{ ...headline(30, ACCENT) }}>YOUR ZIP CODE = YOUR RATE</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 48 }}>
          {/* Low-income house */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <p style={{ ...headline(20, '#9CA3AF'), margin: 0 }}>ZIP: 60612</p>
            <svg width={200} height={200} viewBox="0 0 200 200">
              <rect x={20} y={92} width={160} height={100} rx={6} fill={'#4B5563'} />
              <polygon points="10,92 100,22 190,92" fill={'#6B7280'} />
              <rect x={82} y={142} width={36} height={50} rx={4} fill={'#374151'} />
              <rect x={28} y={106} width={44} height={38} rx={4} fill={'#1F2937'} />
              <rect x={128} y={106} width={44} height={38} rx={4} fill={'#1F2937'} />
            </svg>
            <div
              style={{
                background: ACCENT,
                borderRadius: 10,
                padding: '10px 20px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>$2,100/yr</p>
              <p style={{ ...headline(16, 'rgba(255,255,255,0.8)'), marginTop: 4 }}>CAR INSURANCE</p>
            </div>
          </div>

          <p style={{ ...headline(42, '#444444'), margin: 0, paddingBottom: 90 }}>VS</p>

          {/* High-income house */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <p style={{ ...headline(20, '#93C5FD'), margin: 0 }}>ZIP: 90210</p>
            <svg width={200} height={200} viewBox="0 0 200 200">
              <rect x={20} y={92} width={160} height={100} rx={6} fill={'#1E3A5F'} />
              <polygon points="10,92 100,22 190,92" fill={'#2B5EA7'} />
              <rect x={82} y={142} width={36} height={50} rx={4} fill={'#162a55'} />
              <rect x={28} y={106} width={44} height={38} rx={4} fill={'#0D1B3E'} />
              <rect x={128} y={106} width={44} height={38} rx={4} fill={'#0D1B3E'} />
            </svg>
            <div
              style={{
                background: GREEN,
                borderRadius: 10,
                padding: '10px 20px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>$1,600/yr</p>
              <p style={{ ...headline(16, 'rgba(255,255,255,0.8)'), marginTop: 4 }}>CAR INSURANCE</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: penaltyOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(24, 'rgba(255,255,255,0.5)'), marginBottom: 6 }}>ZIP CODE PENALTY</p>
          <p style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, margin: 0, lineHeight: 1 }}>+${penaltyCount}/YR</p>
          <p style={{ ...headline(18, 'rgba(255,255,255,0.4)'), marginTop: 8 }}>SAME CAR. SAME DRIVER. DIFFERENT ADDRESS.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Animated bar chart — CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const ctaSpring = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 80 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);

  const totalCount = Math.floor(
    interpolate(frame, [100, 178], [0, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const totalOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const costs = [
    { label: 'FOOD', amount: '$800', delay: 18 },
    { label: 'BANKING', amount: '$600', delay: 38 },
    { label: 'CREDIT', amount: '$700', delay: 58 },
    { label: 'INSURANCE', amount: '$500', delay: 78 },
  ];

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
          <p style={{ ...headline(44, BLACK), marginBottom: 6 }}>THE POVERTY PREMIUM</p>
          <p style={{ ...headline(30, ACCENT) }}>ADDS UP FAST</p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {costs.map(({ label, amount, delay }, i) => {
            const barSpring = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 80 } });
            const barW = interpolate(barSpring, [0, 1], [0, 1]);
            return (
              <div
                key={i}
                style={{
                  opacity: barSpring,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    color: BLACK,
                    width: 120,
                    textAlign: 'right',
                    letterSpacing: '0.08em',
                  }}
                >
                  {label}
                </span>
                <div
                  style={{
                    flex: 1,
                    background: '#E5E7EB',
                    borderRadius: 8,
                    height: 56,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${barW * 100}%`,
                      background: ACCENT,
                      borderRadius: 8,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 26,
                    color: BLACK,
                    width: 86,
                    letterSpacing: '0.05em',
                  }}
                >
                  {amount}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: totalOpacity,
            borderTop: `4px solid #D1D5DB`,
            paddingTop: 20,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 28, color: BLACK, letterSpacing: '0.1em' }}>TOTAL PENALTY:</span>
          <span style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, lineHeight: 1 }}>${totalCount}/YR</span>
        </div>

        <div
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaSpring,
            background: ACCENT,
            borderRadius: 50,
            padding: '18px 50px',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>FOLLOW FOR MORE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Two person silhouettes — the poverty premium hook
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-80, 0]);

  const figSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 80 } });
  const figScale = interpolate(figSpring, [0, 1], [0.5, 1]);

  const count = Math.floor(
    interpolate(frame, [60, 170], [0, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const tagOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '60px 48px',
        }}
      >
        {/* Title */}
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(60, WHITE), marginBottom: 8 }}>THE POVERTY</p>
          <p style={{ ...headline(80, ACCENT) }}>PREMIUM</p>
        </div>

        {/* Two-person comparison */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 40,
            transform: `scale(${figScale})`,
          }}
        >
          {/* Low income person */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                opacity: tagOpacity,
                background: ACCENT,
                borderRadius: 12,
                padding: '8px 22px',
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>+${count}</span>
            </div>
            <svg width={160} height={260} viewBox="0 0 160 260">
              <circle cx={80} cy={45} r={42} fill={ACCENT} />
              <rect x={48} y={92} width={64} height={110} rx={8} fill={ACCENT} />
              <line x1={48} y1={112} x2={10} y2={170} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
              <line x1={112} y1={112} x2={150} y2={170} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
              <line x1={60} y1={202} x2={45} y2={255} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
              <line x1={100} y1={202} x2={115} y2={255} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
            </svg>
            <p style={{ ...headline(26, WHITE), margin: 0 }}>LOW INCOME</p>
          </div>

          {/* VS */}
          <p style={{ ...headline(46, '#555555'), margin: 0 }}>VS</p>

          {/* High income person */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                opacity: tagOpacity,
                background: GREEN,
                borderRadius: 12,
                padding: '8px 22px',
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>$0 EXTRA</span>
            </div>
            <svg width={160} height={260} viewBox="0 0 160 260">
              <circle cx={80} cy={45} r={42} fill={GREEN} />
              <rect x={48} y={92} width={64} height={110} rx={8} fill={GREEN} />
              <line x1={48} y1={112} x2={10} y2={170} stroke={GREEN} strokeWidth={14} strokeLinecap="round" />
              <line x1={112} y1={112} x2={150} y2={170} stroke={GREEN} strokeWidth={14} strokeLinecap="round" />
              <line x1={60} y1={202} x2={45} y2={255} stroke={GREEN} strokeWidth={14} strokeLinecap="round" />
              <line x1={100} y1={202} x2={115} y2={255} stroke={GREEN} strokeWidth={14} strokeLinecap="round" />
            </svg>
            <p style={{ ...headline(26, WHITE), margin: 0 }}>HIGH INCOME</p>
          </div>
        </div>

        {/* Bottom label */}
        <div style={{ opacity: tagOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(28, 'rgba(255,255,255,0.55)'), marginBottom: 8 }}>SAME LIFE. MORE COST.</p>
          <p style={{ fontFamily: FONT, fontSize: 64, color: ACCENT, margin: 0, lineHeight: 1 }}>$1,300/YEAR</p>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.4)'), marginTop: 8 }}>POVERTY PREMIUM</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ─────────────────────────────────────────────────────────────

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
