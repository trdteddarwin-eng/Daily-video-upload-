import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const CardSVG: React.FC<{ w?: number }> = ({ w = 420 }) => {
  const h = Math.round(w * 0.63);
  return (
    <svg width={w} height={h} viewBox="0 0 420 265">
      <rect x="0" y="0" width="420" height="265" rx="18" fill="#1E1E2E" stroke={ACCENT} strokeWidth="3" />
      <rect x="0" y="48" width="420" height="48" fill="#252535" />
      <rect x="28" y="116" width="52" height="40" rx="6" fill="#F59E0B" />
      <line x1="28" y1="136" x2="80" y2="136" stroke="#A07010" strokeWidth="1.5" />
      <line x1="54" y1="116" x2="54" y2="156" stroke="#A07010" strokeWidth="1.5" />
      <text x="28" y="200" fontFamily="monospace" fontSize="20" fill="#888888" letterSpacing="6">
        {'•••• •••• •••• 4821'}
      </text>
      <text
        x="390"
        y="142"
        fontFamily='"Arial Black", Arial, sans-serif'
        fontSize="30"
        fill={ACCENT}
        textAnchor="end"
        fontWeight="900"
      >
        0% APR
      </text>
      <circle cx="356" cy="234" r="22" fill="#CC0000" opacity="0.85" />
      <circle cx="379" cy="234" r="22" fill="#FF6600" opacity="0.85" />
    </svg>
  );
};

// ─── Scene 2 + 3 helpers ───────────────────────────────────────────────────

const BankSVG: React.FC<{ w?: number }> = ({ w = 120 }) => (
  <svg width={w} height={Math.round(w * 1.1)} viewBox="0 0 120 132">
    <rect x="8" y="90" width="104" height="36" fill="#888888" />
    <rect x="16" y="54" width="14" height="38" fill="#AAAAAA" />
    <rect x="38" y="54" width="14" height="38" fill="#AAAAAA" />
    <rect x="60" y="54" width="14" height="38" fill="#AAAAAA" />
    <rect x="82" y="54" width="14" height="38" fill="#AAAAAA" />
    <polygon points="60,8 8,54 112,54" fill="#CCCCCC" />
    <rect x="4" y="126" width="112" height="6" fill="#888888" />
    <text
      x="60"
      y="42"
      textAnchor="middle"
      fontFamily='"Arial Black", Arial, sans-serif'
      fontSize="22"
      fill={ACCENT}
      fontWeight="900"
    >
      $
    </text>
  </svg>
);

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const cardY = interpolate(frame, [0, 35], [180, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const cardOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [38, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillScale = spring({
    frame: Math.max(0, frame - 85),
    fps: 30,
    config: { damping: 16, stiffness: 100, mass: 1 },
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
        <div style={{ transform: `translateY(${cardY}px)`, opacity: cardOpacity, marginBottom: 44 }}>
          <CardSVG w={440} />
        </div>

        <div style={{ opacity: titleOpacity }}>
          <p style={headline(58, ACCENT)}>THE BALANCE</p>
          <p style={headline(58, ACCENT)}>TRANSFER TRAP</p>
        </div>

        <div
          style={{
            transform: `scale(${pillScale})`,
            background: ACCENT,
            borderRadius: 20,
            padding: '20px 56px',
            marginTop: 40,
          }}
        >
          <p style={headline(82, WHITE)}>$4,600</p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: WHITE,
              textAlign: 'center',
              margin: 0,
            }}
          >
            average hidden cost
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: The Transfer Fee ────────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowProgress = interpolate(frame, [40, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const feeScale = spring({
    frame: Math.max(0, frame - 100),
    fps: 30,
    config: { damping: 14, stiffness: 110, mass: 1 },
  });

  const subOpacity = interpolate(frame, [125, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowW = 260 * arrowProgress;

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
        <div style={{ opacity: titleOpacity, marginBottom: 32 }}>
          <p style={headline(38, ACCENT)}>Number One: The Fee</p>
        </div>

        {/* Transfer row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 0,
          }}
        >
          {/* $8,000 stack */}
          <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
            {Array.from({ length: Math.max(0, Math.floor(5)) }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 118,
                  height: 13,
                  background: '#10B981',
                  borderRadius: 3,
                  marginBottom: 5,
                  marginLeft: i * 3,
                }}
              />
            ))}
            <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: '10px 0 0 0', textAlign: 'center' }}>
              $8,000
            </p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: '#666666', margin: '4px 0 0 0', textAlign: 'center' }}>
              your balance
            </p>
          </div>

          {/* Arrow */}
          <div style={{ position: 'relative', width: 280, height: 40, margin: '0 8px' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: arrowW,
                height: 4,
                background: ACCENT,
                transform: 'translateY(-50%)',
              }}
            />
            {arrowProgress > 0.8 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: arrowW - 14,
                  width: 0,
                  height: 0,
                  borderTop: '11px solid transparent',
                  borderBottom: '11px solid transparent',
                  borderLeft: `18px solid ${ACCENT}`,
                  transform: 'translateY(-50%)',
                }}
              />
            )}
            <p
              style={{
                position: 'absolute',
                top: -26,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: FONT,
                fontSize: 20,
                color: ACCENT,
                margin: 0,
                opacity: arrowProgress,
                whiteSpace: 'nowrap',
              }}
            >
              3% FEE
            </p>
          </div>

          {/* Bank */}
          <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
            <BankSVG w={108} />
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: BLACK, margin: '8px 0 0 0', textAlign: 'center' }}>
              your bank
            </p>
          </div>
        </div>

        {/* Fee badge */}
        <div
          style={{
            transform: `scale(${feeScale})`,
            background: ACCENT,
            borderRadius: 18,
            padding: '18px 52px',
            marginTop: 44,
          }}
        >
          <p style={headline(68, WHITE)}>$240 GONE</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, textAlign: 'center', margin: 0 }}>
            on day one — before saving a cent
          </p>
        </div>

        <p
          style={{
            fontFamily: '"Arial", sans-serif',
            fontSize: 24,
            color: '#555555',
            opacity: subOpacity,
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          And that's just the beginning.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: The Payment Allocation Trick ────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const colsOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const colsY = interpolate(frame, [25, 55], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const paymentOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const interestGrowth = interpolate(frame, [90, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const interestDollar = Math.round(880 * interestGrowth);

  const warnOpacity = interpolate(frame, [150, 178], [0, 1], {
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
          padding: 60,
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 32 }}>
          <p style={headline(36, ACCENT)}>Number Two: The Fine Print</p>
        </div>

        {/* Two columns */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 28,
            opacity: colsOpacity,
            transform: `translateY(${colsY}px)`,
          }}
        >
          {/* 0% column */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 172,
                height: 200,
                background: '#10B981',
                borderRadius: '12px 12px 4px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>0%</p>
              <div style={{ opacity: paymentOpacity }}>
                <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'center' }}>
                  ↓ your payment
                </p>
                <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'center' }}>
                  goes here
                </p>
              </div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: '12px 0 0 0', textAlign: 'center' }}>
              Transfer Balance
            </p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 18, color: '#888888', margin: '4px 0 0 0', textAlign: 'center' }}>
              $8,000
            </p>
          </div>

          {/* 22% column */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 172,
                height: 200,
                background: ACCENT,
                borderRadius: '12px 12px 4px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0 }}>22%</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>+${interestDollar}</p>
              <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: 0, textAlign: 'center' }}>
                interest growing
              </p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: '12px 0 0 0', textAlign: 'center' }}>
              New Purchases
            </p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 18, color: '#888888', margin: '4px 0 0 0', textAlign: 'center' }}>
              no payment going here
            </p>
          </div>
        </div>

        {/* Warning */}
        <div
          style={{
            opacity: warnOpacity,
            background: 'rgba(239,68,68,0.14)',
            border: `2px solid ${ACCENT}`,
            borderRadius: 14,
            padding: '14px 36px',
            marginTop: 32,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
            BURIED IN THE CONTRACT
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: The Behavior Trap ───────────────────────────────────────────────

const PersonSVG: React.FC<{ w?: number; color?: string }> = ({ w = 100, color = '#555555' }) => (
  <svg width={w} height={Math.round(w * 1.6)} viewBox="0 0 100 160">
    <circle cx="50" cy="28" r="26" fill={color} />
    <rect x="22" y="60" width="56" height="64" rx="10" fill={color} />
    <rect x="0" y="62" width="26" height="14" rx="7" fill={color} />
    <rect x="74" y="62" width="26" height="14" rx="7" fill={color} />
    <rect x="22" y="120" width="22" height="40" rx="8" fill={color} />
    <rect x="56" y="120" width="22" height="40" rx="8" fill={color} />
  </svg>
);

const BagSVG: React.FC<{ w?: number }> = ({ w = 80 }) => (
  <svg width={w} height={Math.round(w * 1.2)} viewBox="0 0 80 96">
    <rect x="8" y="28" width="64" height="60" rx="8" fill="#F59E0B" />
    <path d="M24 28 Q24 8 40 8 Q56 8 56 28" stroke="#D97706" strokeWidth="5" fill="none" strokeLinecap="round" />
    <text x="40" y="66" textAnchor="middle" fontFamily='"Arial Black", Arial, sans-serif' fontSize="17" fill={WHITE} fontWeight="900">
      SHOP
    </text>
  </svg>
);

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const personScale = spring({
    frame: Math.max(0, frame - 10),
    fps: 30,
    config: { damping: 20, stiffness: 90, mass: 1 },
  });

  const bagScale = spring({
    frame: Math.max(0, frame - 35),
    fps: 30,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });

  const balanceGrowth = interpolate(frame, [60, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const balanceAmount = Math.round(9640 * balanceGrowth);

  const statScale = spring({
    frame: Math.max(0, frame - 105),
    fps: 30,
    config: { damping: 16, stiffness: 110, mass: 1 },
  });

  const subOpacity = interpolate(frame, [155, 185], [0, 1], {
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
        <div style={{ opacity: titleOpacity, marginBottom: 24 }}>
          <p style={headline(38, ACCENT)}>Number Three: The Behavior Trap</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 20, marginBottom: 28 }}>
          <div style={{ transform: `scale(${personScale})` }}>
            <PersonSVG w={108} color={BLACK} />
          </div>
          <div style={{ transform: `scale(${bagScale})`, marginBottom: 10 }}>
            <BagSVG w={88} />
          </div>
          <div style={{ transform: `scale(${bagScale})`, marginBottom: 10 }}>
            <BagSVG w={68} />
          </div>
        </div>

        {/* Balance counter */}
        <div
          style={{
            background: BLACK,
            borderRadius: 16,
            padding: '16px 48px',
            marginBottom: 24,
          }}
        >
          <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 22, color: '#888888', margin: '0 0 6px 0', textAlign: 'center' }}>
            TOTAL BALANCE
          </p>
          <p style={headline(74, ACCENT)}>${balanceAmount.toLocaleString()}</p>
          <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 18, color: '#888888', margin: '6px 0 0 0', textAlign: 'center' }}>
            going up, not down
          </p>
        </div>

        {/* 73% stat */}
        <div
          style={{
            transform: `scale(${statScale})`,
            background: ACCENT,
            borderRadius: 14,
            padding: '14px 40px',
            marginBottom: 18,
          }}
        >
          <p style={headline(50, WHITE)}>73% Keep Spending</p>
        </div>

        <p
          style={{
            fontFamily: '"Arial", sans-serif',
            fontSize: 26,
            color: '#444444',
            opacity: subOpacity,
            textAlign: 'center',
            margin: 0,
          }}
        >
          Lower balance feels like permission.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: The Rate Spike ──────────────────────────────────────────────────

const ClockSVG: React.FC<{ w?: number; progress?: number }> = ({ w = 140, progress = 0 }) => {
  const cx = 70;
  const cy = 70;
  const r = 52;
  const angle = -90 + progress * 360;
  const rad = (angle * Math.PI) / 180;
  const handX = cx + r * 0.72 * Math.cos(rad);
  const handY = cy + r * 0.72 * Math.sin(rad);
  return (
    <svg width={w} height={w} viewBox="0 0 140 140">
      <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke={ACCENT} strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r} fill="#1E1E2E" />
      {Array.from({ length: Math.max(0, Math.floor(12)) }).map((_, i) => {
        const a = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x1 = cx + r * 0.82 * Math.cos(a);
        const y1 = cy + r * 0.82 * Math.sin(a);
        const x2 = cx + r * 0.95 * Math.cos(a);
        const y2 = cy + r * 0.95 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={WHITE} strokeWidth="2.5" />;
      })}
      <line x1={cx} y1={cy} x2={handX} y2={handY} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill={ACCENT} />
    </svg>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const clockProgress = interpolate(frame, [0, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const month12Opacity = interpolate(frame, [112, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rateValue = interpolate(frame, [122, 165], [0, 17], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const debtGrowth = interpolate(frame, [145, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const debtAmount = Math.round(8560 + 1880 * debtGrowth);

  const finalOpacity = interpolate(frame, [182, 210], [0, 1], {
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
          padding: 60,
        }}
      >
        <ClockSVG w={158} progress={clockProgress} />

        <div
          style={{
            opacity: month12Opacity,
            background: ACCENT,
            borderRadius: 12,
            padding: '10px 36px',
            marginTop: 22,
          }}
        >
          <p style={headline(40, WHITE)}>Month 12</p>
        </div>

        <div style={{ marginTop: 26, textAlign: 'center' }}>
          <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 24, color: '#888888', margin: '0 0 6px 0', textAlign: 'center' }}>
            APR JUMPS TO
          </p>
          <p style={headline(108, ACCENT)}>{Math.round(rateValue)}%</p>
        </div>

        <div
          style={{
            background: 'rgba(239,68,68,0.12)',
            border: `2px solid ${ACCENT}`,
            borderRadius: 14,
            padding: '14px 44px',
            marginTop: 18,
          }}
        >
          <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 22, color: '#AAAAAA', margin: '0 0 4px 0', textAlign: 'center' }}>
            YOU NOW OWE
          </p>
          <p style={headline(60, WHITE)}>${debtAmount.toLocaleString()}</p>
          <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: ACCENT, margin: '4px 0 0 0', textAlign: 'center' }}>
            more than when you started
          </p>
        </div>

        <p
          style={{
            fontFamily: '"Arial", sans-serif',
            fontSize: 26,
            color: WHITE,
            opacity: finalOpacity,
            textAlign: 'center',
            marginTop: 22,
          }}
        >
          That "free" window cost them $4,600.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: The CTA ─────────────────────────────────────────────────────────

const IceCubeSVG: React.FC<{ w?: number }> = ({ w = 140 }) => (
  <svg width={w} height={w} viewBox="0 0 140 140">
    <rect x="14" y="14" width="112" height="112" rx="14" fill="rgba(147,210,255,0.22)" stroke="rgba(147,210,255,0.7)" strokeWidth="3" />
    <line x1="30" y1="42" x2="110" y2="42" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="30" y1="63" x2="110" y2="63" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="30" y1="84" x2="110" y2="84" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="30" y1="105" x2="110" y2="105" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="42" y1="20" x2="42" y2="126" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="70" y1="20" x2="70" y2="126" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="98" y1="20" x2="98" y2="126" stroke="rgba(200,235,255,0.45)" strokeWidth="1.5" />
    <line x1="24" y1="24" x2="50" y2="24" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="34" x2="36" y2="34" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MiniCardSVG: React.FC<{ w?: number }> = ({ w = 118 }) => {
  const h = Math.round(w * 0.63);
  return (
    <svg width={w} height={h} viewBox="0 0 118 74">
      <rect x="0" y="0" width="118" height="74" rx="9" fill="#1E1E2E" stroke={ACCENT} strokeWidth="2.5" />
      <rect x="0" y="17" width="118" height="14" fill="#252535" />
      <rect x="10" y="37" width="18" height="13" rx="3" fill="#F59E0B" />
      <text x="108" y="46" fontFamily='"Arial Black", Arial, sans-serif' fontSize="11" fill={ACCENT} textAnchor="end" fontWeight="900">
        FROZEN
      </text>
    </svg>
  );
};

const TIPS = ['Freeze the card — literally', 'Hammer new purchases first', 'Know your exact payoff date'];

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardIceScale = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    config: { damping: 18, stiffness: 90, mass: 1 },
  });

  const tipOpacities = TIPS.map((_, i) =>
    interpolate(frame, [58 + i * 36, 88 + i * 36], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const tipYs = TIPS.map((_, i) =>
    interpolate(frame, [58 + i * 36, 88 + i * 36], [18, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  const ctaOpacity = interpolate(frame, [182, 210], [0, 1], {
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
        <div style={{ opacity: titleOpacity, marginBottom: 20 }}>
          <p style={headline(42, BLACK)}>The Actual Move:</p>
        </div>

        {/* Card in ice cube */}
        <div
          style={{
            transform: `scale(${cardIceScale})`,
            position: 'relative',
            width: 158,
            height: 158,
            marginBottom: 30,
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 10 }}>
            <IceCubeSVG w={138} />
          </div>
          <div style={{ position: 'absolute', top: 44, left: 18 }}>
            <MiniCardSVG w={118} />
          </div>
        </div>

        {/* Tips */}
        <div style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}>
          {TIPS.map((tip, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                opacity: tipOpacities[i],
                transform: `translateY(${tipYs[i]}px)`,
                marginBottom: 18,
                background: i === 0 ? ACCENT : '#E5E5E5',
                borderRadius: 14,
                padding: '15px 22px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: i === 0 ? WHITE : ACCENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 18,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 20, color: i === 0 ? ACCENT : WHITE }}>
                  {i + 1}
                </span>
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 25,
                  color: i === 0 ? WHITE : BLACK,
                  margin: 0,
                  letterSpacing: '0.04em',
                }}
              >
                {tip}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: '"Arial", sans-serif',
            fontSize: 24,
            color: '#555555',
            opacity: ctaOpacity,
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Follow the money, not the marketing.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

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
