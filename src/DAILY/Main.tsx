import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
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

// Scene 1: Hook — dealer showing $611/mo lease vs $738/mo buy
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const p1Op = interpolate(frame, [35, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p1Scale = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 70 } });
  const p2Op = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2Scale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 70 } });
  const arrowOp = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(52, WHITE)}>THE DEALER SHOWS</p>
          <p style={headline(52, ACCENT)}>YOU TWO NUMBERS</p>
        </div>

        {/* Car SVG */}
        <svg
          width={280}
          height={130}
          viewBox="0 0 280 130"
          style={{ transform: `scale(${carScale})`, marginBottom: 28 }}
        >
          <rect x="20" y="60" width="240" height="58" rx="14" fill="#2A2A2A" />
          <rect x="58" y="28" width="162" height="50" rx="14" fill="#3A3A3A" />
          <rect x="68" y="35" width="58" height="34" rx="7" fill="#87CEEB" opacity="0.7" />
          <rect x="152" y="35" width="58" height="34" rx="7" fill="#87CEEB" opacity="0.7" />
          <circle cx="72" cy="116" r="22" fill="#1A1A1A" />
          <circle cx="72" cy="116" r="13" fill="#333" />
          <circle cx="72" cy="116" r="5" fill="#555" />
          <circle cx="208" cy="116" r="22" fill="#1A1A1A" />
          <circle cx="208" cy="116" r="13" fill="#333" />
          <circle cx="208" cy="116" r="5" fill="#555" />
          <rect x="22" y="70" width="20" height="12" rx="4" fill="#FFFF88" opacity="0.8" />
          <rect x="238" y="70" width="20" height="12" rx="4" fill="#FF4444" opacity="0.8" />
        </svg>

        {/* Two price options */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 20 }}>
          <div
            style={{
              opacity: p1Op,
              transform: `scale(${p1Scale})`,
              background: 'rgba(249,115,22,0.18)',
              border: `3px solid ${ACCENT}`,
              borderRadius: 14,
              padding: '18px 28px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px 0', letterSpacing: '0.1em' }}>LEASE</p>
            <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, margin: 0 }}>$611</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '4px 0 0 0' }}>/month</p>
          </div>

          <p style={{ fontFamily: FONT, fontSize: 32, color: '#555', margin: 0 }}>vs</p>

          <div
            style={{
              opacity: p2Op,
              transform: `scale(${p2Scale})`,
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid #444',
              borderRadius: 14,
              padding: '18px 28px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#666', margin: '0 0 4px 0', letterSpacing: '0.1em' }}>BUY</p>
            <p style={{ fontFamily: FONT, fontSize: 52, color: '#888', margin: 0 }}>$738</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#666', margin: '4px 0 0 0' }}>/month</p>
          </div>
        </div>

        <div style={{ opacity: arrowOp, textAlign: 'center' }}>
          <p style={headline(28, ACCENT)}>YOUR BRAIN PICKS THE LOWER ONE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: 36 months later — $21,996 paid, zero equity
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.round(interpolate(frame, [20, 140], [0, 21996], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOp = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walletScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 14, stiffness: 60 } });
  const zeroOp = interpolate(frame, [145, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zeroScale = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 24 }}>
          <p style={headline(52, BLACK)}>36 MONTHS LATER</p>
          <p style={headline(52, ACCENT)}>YOU HAND BACK THE KEYS</p>
        </div>

        <div style={{ opacity: counterOp, textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '0 0 6px 0', letterSpacing: '0.1em' }}>TOTAL PAID INTO LEASE</p>
          <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, margin: 0 }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>

        {/* Empty wallet SVG */}
        <svg
          width={200}
          height={130}
          viewBox="0 0 200 130"
          style={{ transform: `scale(${walletScale})`, marginBottom: 24 }}
        >
          <rect x="10" y="28" width="180" height="90" rx="12" fill="#8B7355" />
          <rect x="10" y="28" width="180" height="28" rx="8" fill="#A08060" />
          <rect x="118" y="50" width="62" height="56" rx="10" fill="#6B5535" />
          <circle cx="149" cy="78" r="18" fill="#5A4525" />
          <rect x="22" y="60" width="88" height="50" rx="6" fill="#6B5535" opacity="0.5" />
          <text x="66" y="91" textAnchor="middle" fill="#444" fontSize="14" fontFamily="Arial Black" fontWeight="bold">EMPTY</text>
        </svg>

        <div style={{ opacity: zeroOp, transform: `scale(${zeroScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(26, '#888'), marginBottom: 4 }}>EQUITY BUILT</p>
          <p style={{ fontFamily: FONT, fontSize: 120, color: RED, margin: 0, letterSpacing: '0.08em' }}>$0</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Same 3 years — very different outcome for buyer
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leaseOp = interpolate(frame, [25, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leaseScale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 65 } });
  const buyOp = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buyScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 65 } });
  const labelOp = interpolate(frame, [145, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 12, stiffness: 80 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 36 }}>
          <p style={headline(52, WHITE)}>SAME 3 YEARS</p>
          <p style={headline(52, ACCENT)}>VERY DIFFERENT OUTCOME</p>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', marginBottom: 24 }}>
          <div
            style={{
              opacity: leaseOp,
              transform: `scale(${leaseScale})`,
              background: 'rgba(239,68,68,0.1)',
              border: '2px solid #EF4444',
              borderRadius: 14,
              padding: '22px 28px',
              textAlign: 'center',
              width: 190,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 26, color: RED, margin: '0 0 14px 0', letterSpacing: '0.1em' }}>LEASE</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px 0' }}>paid in</p>
            <p style={{ fontFamily: FONT, fontSize: 36, color: RED, margin: '0 0 20px 0' }}>$21,996</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px 0' }}>you own</p>
            <p style={{ fontFamily: FONT, fontSize: 48, color: RED, margin: 0 }}>$0</p>
          </div>

          <div
            style={{
              opacity: buyOp,
              transform: `scale(${buyScale})`,
              background: 'rgba(16,185,129,0.1)',
              border: '2px solid #10B981',
              borderRadius: 14,
              padding: '22px 28px',
              textAlign: 'center',
              width: 190,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN, margin: '0 0 14px 0', letterSpacing: '0.1em' }}>BUY</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px 0' }}>paid in</p>
            <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: '0 0 20px 0' }}>$26,568</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px 0' }}>car worth</p>
            <p style={{ fontFamily: FONT, fontSize: 48, color: GREEN, margin: 0 }}>$20K</p>
          </div>
        </div>

        <div style={{ opacity: labelOp, transform: `scale(${labelScale})`, textAlign: 'center' }}>
          <p style={headline(36, GREEN)}>THAT'S CALLED EQUITY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Three leases, nine years, $65,988, own nothing
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 65 } });
  const c2Scale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 65 } });
  const c3Scale = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 65 } });
  const totalOp = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 75 } });
  const punchOp = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const scales = [c1Scale, c2Scale, c3Scale];
  const labels = ['LEASE #1', 'LEASE #2', 'LEASE #3'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 32 }}>
          <p style={headline(52, BLACK)}>NOW DO IT AGAIN</p>
          <p style={headline(52, ACCENT)}>AND AGAIN. AND AGAIN.</p>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24 }}>
          {scales.map((sc, i) => (
            <React.Fragment key={i}>
              {i > 0 && <p style={{ fontFamily: FONT, fontSize: 28, color: '#888', margin: 0 }}>+</p>}
              <div
                style={{
                  transform: `scale(${sc})`,
                  background: 'rgba(249,115,22,0.12)',
                  border: `2px solid ${ACCENT}`,
                  borderRadius: 12,
                  padding: '14px 18px',
                  textAlign: 'center',
                  width: 128,
                }}
              >
                <p style={{ fontFamily: FONT, fontSize: 14, color: '#888', margin: '0 0 4px 0', letterSpacing: '0.06em' }}>{labels[i]}</p>
                <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>$21,996</p>
                <p style={{ fontFamily: FONT, fontSize: 13, color: '#666', margin: '4px 0 0 0' }}>3 years</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ opacity: totalOp, transform: `scale(${totalScale})`, textAlign: 'center', marginBottom: 20 }}>
          <p style={{ ...headline(24, '#888'), marginBottom: 6 }}>3 LEASES · 9 YEARS · TOTAL PAID</p>
          <p style={{ fontFamily: FONT, fontSize: 88, color: RED, margin: 0 }}>$65,988</p>
          <p style={{ ...headline(24, BLACK), marginTop: 6 }}>AND YOU OWN NOTHING</p>
        </div>

        <div style={{ opacity: punchOp, textAlign: 'center' }}>
          <p style={headline(32, ACCENT)}>THAT'S THE TRAP</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Hidden costs — mileage overage, fine print
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const odoScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 60 } });
  const needleAngle = interpolate(frame, [15, 80], [-80, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const limitOp = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 75 } });
  const punchOp = interpolate(frame, [165, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 80 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(52, WHITE)}>BUT WAIT</p>
          <p style={headline(52, ACCENT)}>THERE'S MORE FINE PRINT</p>
        </div>

        {/* Odometer gauge SVG */}
        <svg
          width={240}
          height={152}
          viewBox="0 0 240 152"
          style={{ transform: `scale(${odoScale})`, marginBottom: 22 }}
        >
          <circle cx="120" cy="120" r="100" fill="#1E1E1E" />
          <circle cx="120" cy="120" r="90" fill="#2A2A2A" />
          <path d="M30 120 A90 90 0 0 1 210 120" fill="none" stroke="#333" strokeWidth="14" strokeLinecap="round" />
          <path d="M30 120 A90 90 0 0 1 120 30" fill="none" stroke={GREEN} strokeWidth="14" strokeLinecap="round" />
          <path d="M120 30 A90 90 0 0 1 210 120" fill="none" stroke={RED} strokeWidth="14" strokeLinecap="round" />
          <g transform={`rotate(${needleAngle}, 120, 120)`}>
            <line x1="120" y1="120" x2="120" y2="36" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <circle cx="120" cy="120" r="9" fill="#555" />
          <text x="36" y="118" textAnchor="middle" fill="#888" fontSize="14" fontFamily="Arial">0</text>
          <text x="120" y="26" textAnchor="middle" fill="#AAA" fontSize="12" fontFamily="Arial">12K</text>
          <text x="204" y="118" textAnchor="middle" fill={RED} fontSize="14" fontFamily="Arial">15K+</text>
          <text x="120" y="148" textAnchor="middle" fill={RED} fontSize="14" fontFamily="Arial Black" fontWeight="bold">OVER LIMIT</text>
        </svg>

        <div style={{ opacity: limitOp, textAlign: 'center', marginBottom: 16 }}>
          <p style={{ ...headline(26, WHITE), marginBottom: 4 }}>LEASE LIMIT: 12,000 MI/YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', margin: 0 }}>average American drives 15,000+/year</p>
        </div>

        <div style={{ opacity: feeOp, transform: `scale(${feeScale})`, textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', margin: '0 0 4px 0' }}>OVERAGE FEE</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: RED, margin: 0 }}>$0.30/mile</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '6px 0 0 0' }}>= $900 hidden fee per year</p>
        </div>

        <div style={{ opacity: punchOp, transform: `scale(${punchScale})`, textAlign: 'center' }}>
          <p style={headline(28, ACCENT)}>THE FINE PRINT DOES THE REAL DAMAGE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — buy reliable, drive to 150K, invest the difference
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const r1Op = interpolate(frame, [58, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [98, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3Op = interpolate(frame, [138, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsOp = interpolate(frame, [172, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsScale = spring({ frame: Math.max(0, frame - 172), fps, config: { damping: 12, stiffness: 75 } });
  const ctaOp = interpolate(frame, [200, 222], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 20 }}>
          <p style={headline(52, BLACK)}>THE ACTUAL</p>
          <p style={headline(52, ACCENT)}>SMART MOVE</p>
        </div>

        {/* Car with 150K miles badge */}
        <svg
          width={260}
          height={110}
          viewBox="0 0 260 110"
          style={{ transform: `scale(${carScale})`, marginBottom: 20 }}
        >
          <rect x="20" y="42" width="220" height="52" rx="12" fill="#CCCCCC" />
          <rect x="54" y="14" width="148" height="44" rx="12" fill="#BBBBBB" />
          <rect x="62" y="20" width="56" height="30" rx="6" fill="#87CEEB" opacity="0.7" />
          <rect x="136" y="20" width="56" height="30" rx="6" fill="#87CEEB" opacity="0.7" />
          <circle cx="68" cy="94" r="20" fill="#444" />
          <circle cx="68" cy="94" r="11" fill="#666" />
          <circle cx="68" cy="94" r="4" fill="#888" />
          <circle cx="192" cy="94" r="20" fill="#444" />
          <circle cx="192" cy="94" r="11" fill="#666" />
          <circle cx="192" cy="94" r="4" fill="#888" />
          <rect x="82" y="50" width="96" height="26" rx="7" fill={ACCENT} />
          <text x="130" y="68" textAnchor="middle" fill={BLACK} fontSize="14" fontFamily="Arial Black" fontWeight="bold">150,000 MILES</text>
        </svg>

        <div style={{ opacity: r1Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>1. Buy a reliable used car</p>
        </div>
        <div style={{ opacity: r2Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>2. Drive it to 150,000 miles</p>
        </div>
        <div style={{ opacity: r3Op, marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>3. Invest the difference</p>
        </div>

        <div style={{ opacity: savingsOp, transform: `scale(${savingsScale})`, textAlign: 'center', marginBottom: 12 }}>
          <p style={{ ...headline(24, '#888'), marginBottom: 4 }}>OVER A DECADE</p>
          <p style={headline(72, ACCENT)}>$22,000</p>
          <p style={{ ...headline(22, BLACK), marginTop: 4 }}>BACK IN YOUR POCKET</p>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center' }}>
          <p style={headline(36, ACCENT)}>FOLLOW FOR THE MATH</p>
          <p style={{ ...headline(20, BLACK), marginTop: 8 }}>THEY HOPE YOU NEVER SEE</p>
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
