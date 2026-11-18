import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene data ───────────────────────────────────────────────────────────────
const FEES = [
  { label: 'Universal Service Fund', amt: '$7.49' },
  { label: 'E911 / Emergency Fee',   amt: '$3.50' },
  { label: 'Administrative Fee',     amt: '$3.99' },
  { label: 'Regulatory Recovery',    amt: '$2.74' },
  { label: 'State & Local Tax',      amt: '$5.28' },
];

// Scene 1: Advertised price vs actual bill
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-80, 0]);

  const phoneIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 50 });
  const phoneScale = interpolate(phoneIn, [0, 1], [0.5, 1]);

  const countProg = interpolate(frame, [40, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayAmt = Math.round(45 + (73 - 45) * countProg);

  const gapOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, #1a0505 0%, #121212 60%)' }} />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(48, WHITE)}>YOUR PHONE</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>BILL IS A LIE</p>
      </div>

      {/* Phone SVG */}
      <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translate(-50%, 0) scale(${phoneScale})` }}>
        <svg width="320" height="560" viewBox="0 0 320 560">
          {/* Phone body */}
          <rect x="0" y="0" width="320" height="560" rx="40" fill="#1a1a2e" stroke="#333" strokeWidth="3" />
          <rect x="10" y="10" width="300" height="540" rx="32" fill="#0d0d1a" />
          {/* Screen area */}
          <rect x="20" y="50" width="280" height="460" rx="16" fill="#0a1628" />
          {/* Notch */}
          <rect x="120" y="10" width="80" height="20" rx="10" fill="#0d0d1a" />

          {/* Ad banner */}
          <rect x="30" y="68" width="260" height="80" rx="10" fill="#1a3a1a" stroke="#2d6e2d" strokeWidth="1.5" />
          <text x="160" y="98" fontFamily="Arial, sans-serif" fontSize="13" fill="#6bcb6b" textAnchor="middle">UNLIMITED PLAN</text>
          <text x="160" y="124" fontFamily="Arial Black, sans-serif" fontSize="26" fill="#6bcb6b" textAnchor="middle" fontWeight="bold">$45/mo</text>

          {/* Divider */}
          <line x1="40" y1="168" x2="280" y2="168" stroke="#222" strokeWidth="1" />

          {/* Real bill */}
          <text x="160" y="210" fontFamily="Arial, sans-serif" fontSize="13" fill="#888" textAnchor="middle">YOUR ACTUAL BILL</text>
          <text x="160" y="262" fontFamily="Arial Black, sans-serif" fontSize="44" fill={ACCENT} textAnchor="middle" fontWeight="bold">${displayAmt}</text>
          <text x="160" y="292" fontFamily="Arial, sans-serif" fontSize="14" fill="#666" textAnchor="middle">per month</text>

          {/* Gap indicator */}
          <rect x="60" y="320" width={Math.round(200 * countProg)} height="8" rx="4" fill={ACCENT} opacity="0.7" />
          <text x="160" y="358" fontFamily="Arial, sans-serif" fontSize="13" fill="#888" textAnchor="middle" opacity={gapOpacity}>+$28 in hidden fees</text>

          {/* Bottom buttons */}
          <circle cx="160" cy="490" r="22" fill="#222" stroke="#444" strokeWidth="2" />
        </svg>
      </div>

      {/* Gap label */}
      <div style={{ position: 'absolute', bottom: 160, left: 0, right: 0, opacity: gapOpacity, padding: '0 60px' }}>
        <p style={{ ...headline(32, ACCENT), letterSpacing: '0.1em' }}>$28 GAP — EVERY MONTH</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Hidden fee line items appearing one by one
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-60, 0]);

  const totalFees = 7.49 + 3.50 + 3.99 + 2.74 + 5.28;
  const runningTotal = [7.49, 10.99, 14.98, 17.72, 23.00];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, BLACK)}>11 FEES</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 6 }}>IN THE FINE PRINT</p>
      </div>

      {/* Fee card */}
      <div style={{ position: 'absolute', top: 320, left: '50%', transform: 'translate(-50%, 0)' }}>
        <svg width="500" height="420" viewBox="0 0 500 420">
          <rect x="0" y="0" width="500" height="420" rx="20" fill="white" stroke="#e0e0e0" strokeWidth="2" />
          <rect x="0" y="0" width="500" height="58" rx="20" fill="#f8f8f8" />
          <rect x="0" y="40" width="500" height="18" fill="#f8f8f8" />
          <text x="250" y="36" fontFamily="Arial Black, sans-serif" fontSize="16" fill={BLACK} textAnchor="middle" fontWeight="bold">MONTHLY WIRELESS FEES</text>

          {FEES.map((fee, i) => {
            const revealFrame = 30 + i * 28;
            const rowOpacity = interpolate(frame, [revealFrame, revealFrame + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const rowX = interpolate(frame, [revealFrame, revealFrame + 18], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const y = 88 + i * 60;
            return (
              <g key={i} opacity={rowOpacity} transform={`translate(${rowX}, 0)`}>
                <rect x="20" y={y} width="460" height="48" rx="8" fill={i % 2 === 0 ? '#fafafa' : 'white'} />
                <circle cx="44" cy={y + 24} r="10" fill="#fee2e2" />
                <text x="44" y={y + 29} fontFamily="Arial, sans-serif" fontSize="12" fill={ACCENT} textAnchor="middle" fontWeight="bold">!</text>
                <text x="66" y={y + 28} fontFamily="Arial, sans-serif" fontSize="15" fill="#333">{fee.label}</text>
                <text x="472" y={y + 28} fontFamily="Arial Black, sans-serif" fontSize="16" fill={ACCENT} textAnchor="end" fontWeight="bold">{fee.amt}</text>
              </g>
            );
          })}

          {/* Running total */}
          {(() => {
            const prog = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const displayTotal = (totalFees * prog).toFixed(2);
            const totalOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <g opacity={totalOpacity}>
                <line x1="20" y1="385" x2="480" y2="385" stroke="#e0e0e0" strokeWidth="1.5" />
                <text x="30" y="408" fontFamily="Arial Black, sans-serif" fontSize="17" fill={BLACK} fontWeight="bold">TOTAL HIDDEN FEES</text>
                <text x="472" y="408" fontFamily="Arial Black, sans-serif" fontSize="20" fill={ACCENT} textAnchor="end" fontWeight="bold">+${displayTotal}</text>
              </g>
            );
          })()}
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, padding: '0 60px' }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center', margin: 0 }}>
          None of these were in the headline price
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Advertised vs actual split comparison
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-60, 0]);

  const leftIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 50 });
  const leftX = interpolate(leftIn, [0, 1], [-200, 0]);

  const rightIn = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 50 });
  const rightX = interpolate(rightIn, [0, 1], [200, 0]);

  const gapIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 40 });
  const gapOpacity = interpolate(gapIn, [0, 1], [0, 1]);
  const gapH = interpolate(gapIn, [0, 1], [0, 180]);

  const fccOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a0505 0%, #121212 65%)' }} />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, WHITE)}>IT'S LEGAL</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 6 }}>AND INTENTIONAL</p>
      </div>

      {/* Left: advertised */}
      <div style={{ position: 'absolute', top: 380, left: 60, width: 280, transform: `translateX(${leftX}px)` }}>
        <svg width="280" height="220" viewBox="0 0 280 220">
          <rect x="0" y="0" width="280" height="220" rx="16" fill="#0a2a0a" stroke="#2d6e2d" strokeWidth="2" />
          <text x="140" y="36" fontFamily="Arial, sans-serif" fontSize="14" fill="#6bcb6b" textAnchor="middle">ADVERTISED</text>
          <text x="140" y="96" fontFamily="Arial Black, sans-serif" fontSize="52" fill="#6bcb6b" textAnchor="middle" fontWeight="bold">$45</text>
          <text x="140" y="124" fontFamily="Arial, sans-serif" fontSize="14" fill="#6bcb6b" textAnchor="middle">per month</text>
          <text x="140" y="166" fontFamily="Arial, sans-serif" fontSize="12" fill="#3a7a3a" textAnchor="middle">what they show you</text>
          <text x="140" y="188" fontFamily="Arial, sans-serif" fontSize="12" fill="#3a7a3a" textAnchor="middle">in the advertisement</text>
        </svg>
      </div>

      {/* Right: actual */}
      <div style={{ position: 'absolute', top: 380, right: 60, width: 280, transform: `translateX(${rightX}px)` }}>
        <svg width="280" height="220" viewBox="0 0 280 220">
          <rect x="0" y="0" width="280" height="220" rx="16" fill="#2a0a0a" stroke={ACCENT} strokeWidth="2" />
          <text x="140" y="36" fontFamily="Arial, sans-serif" fontSize="14" fill={ACCENT} textAnchor="middle">ACTUAL BILL</text>
          <text x="140" y="96" fontFamily="Arial Black, sans-serif" fontSize="52" fill={ACCENT} textAnchor="middle" fontWeight="bold">$73</text>
          <text x="140" y="124" fontFamily="Arial, sans-serif" fontSize="14" fill={ACCENT} textAnchor="middle">per month</text>
          <text x="140" y="166" fontFamily="Arial, sans-serif" fontSize="12" fill="#7a3a3a" textAnchor="middle">what hits your bank</text>
          <text x="140" y="188" fontFamily="Arial, sans-serif" fontSize="12" fill="#7a3a3a" textAnchor="middle">account every month</text>
        </svg>
      </div>

      {/* Gap bar in center */}
      <div style={{ position: 'absolute', top: 380, left: '50%', transform: 'translate(-50%, 0)', opacity: gapOpacity }}>
        <svg width="80" height="220" viewBox="0 0 80 220">
          <rect x="30" y={Math.round((220 - gapH) / 2)} width="20" height={Math.round(gapH)} rx="10" fill={ACCENT} opacity="0.6" />
          <text x="40" y="114" fontFamily="Arial Black, sans-serif" fontSize="14" fill={ACCENT} textAnchor="middle" fontWeight="bold">+28</text>
        </svg>
      </div>

      {/* FCC complaint note */}
      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, opacity: fccOpacity, padding: '0 60px' }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#888', textAlign: 'center', margin: 0 }}>
          FCC gets 100,000+ complaints about this per year
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Scale — 350M Americans × $28 = $12B/yr
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-60, 0]);

  const COLS = 20;
  const ROWS = 10;
  const totalSilhouettes = COLS * ROWS;

  const countProg = interpolate(frame, [20, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayBillions = (12 * countProg).toFixed(1);

  const bigLabelIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 40 });
  const bigLabelScale = interpolate(bigLabelIn, [0, 1], [0.5, 1]);
  const bigLabelOpacity = interpolate(bigLabelIn, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, BLACK)}>350 MILLION</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 6 }}>AMERICANS AFFECTED</p>
      </div>

      {/* Silhouette grid */}
      <div style={{ position: 'absolute', top: 320, left: '50%', transform: 'translate(-50%, 0)' }}>
        <svg width="960" height="380" viewBox="0 0 960 380">
          {Array.from({ length: Math.max(0, Math.floor(totalSilhouettes)) }).map((_, idx) => {
            const col = idx % COLS;
            const row = Math.floor(idx / COLS);
            const x = col * 48 + 24;
            const y = row * 36 + 20;
            const revealProg = interpolate(frame, [20 + idx * 0.6, 30 + idx * 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const fillColor = idx < Math.floor(totalSilhouettes * countProg) ? ACCENT : '#ddd';
            return (
              <g key={idx} opacity={revealProg}>
                {/* Person silhouette: circle head + body */}
                <circle cx={x} cy={y + 6} r="6" fill={fillColor} />
                <path d={`M${x - 7},${y + 14} Q${x},${y + 10} ${x + 7},${y + 14} L${x + 9},${y + 28} L${x - 9},${y + 28} Z`} fill={fillColor} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* $12B label */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 0,
        right: 0,
        opacity: bigLabelOpacity,
        transform: `scale(${bigLabelScale})`,
        padding: '0 60px',
      }}>
        <p style={{ ...headline(80, ACCENT), letterSpacing: '0.08em' }}>${displayBillions}B/YR</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center', margin: '8px 0 0' }}>
          in fees above the advertised price
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5: Solution — prepaid carriers, all-in pricing
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-60, 0]);

  const leftIn = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 110 }, durationInFrames: 50 });
  const leftScale = interpolate(leftIn, [0, 1], [0.6, 1]);

  const rightIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 110 }, durationInFrames: 50 });
  const rightScale = interpolate(rightIn, [0, 1], [0.6, 1]);

  const checkIn = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 35 });
  const checkScale = interpolate(checkIn, [0, 1], [0, 1.4]);
  const checkOpacity = interpolate(checkIn, [0, 0.3, 1], [0, 1, 1]);

  const arrowOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #0a1a0a 0%, #121212 65%)' }} />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, WHITE)}>THE FIX</p>
        <p style={{ ...headline(34, '#10B981'), marginTop: 6 }}>ALL-IN PRICING</p>
      </div>

      {/* Big carrier phone */}
      <div style={{ position: 'absolute', top: 350, left: 60, transform: `scale(${leftScale})`, transformOrigin: 'center top' }}>
        <svg width="260" height="300" viewBox="0 0 260 300">
          <rect x="0" y="0" width="260" height="300" rx="30" fill="#2a0a0a" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="15" y="15" width="230" height="270" rx="22" fill="#1a0505" />
          <rect x="90" y="12" width="80" height="16" rx="8" fill="#2a0a0a" />
          <text x="130" y="80" fontFamily="Arial, sans-serif" fontSize="13" fill="#888" textAnchor="middle">BIG CARRIER</text>
          <text x="130" y="140" fontFamily="Arial Black, sans-serif" fontSize="40" fill={ACCENT} textAnchor="middle" fontWeight="bold">$73</text>
          <text x="130" y="166" fontFamily="Arial, sans-serif" fontSize="13" fill="#666" textAnchor="middle">/month</text>
          <text x="130" y="210" fontFamily="Arial, sans-serif" fontSize="11" fill="#444" textAnchor="middle">$45 base + $28</text>
          <text x="130" y="228" fontFamily="Arial, sans-serif" fontSize="11" fill="#444" textAnchor="middle">in hidden fees</text>
          <circle cx="130" cy="268" r="16" fill="#2a0a0a" stroke="#444" strokeWidth="2" />
        </svg>
      </div>

      {/* Arrow */}
      <div style={{ position: 'absolute', top: 460, left: '50%', transform: 'translate(-50%, 0)', opacity: arrowOpacity }}>
        <svg width="80" height="60" viewBox="0 0 80 60">
          <text x="40" y="40" fontFamily="Arial, sans-serif" fontSize="40" fill="#10B981" textAnchor="middle">→</text>
        </svg>
      </div>

      {/* Prepaid phone */}
      <div style={{ position: 'absolute', top: 350, right: 60, transform: `scale(${rightScale})`, transformOrigin: 'center top' }}>
        <svg width="260" height="300" viewBox="0 0 260 300">
          <rect x="0" y="0" width="260" height="300" rx="30" fill="#0a2a0a" stroke="#10B981" strokeWidth="2.5" />
          <rect x="15" y="15" width="230" height="270" rx="22" fill="#051505" />
          <rect x="90" y="12" width="80" height="16" rx="8" fill="#0a2a0a" />
          <text x="130" y="80" fontFamily="Arial, sans-serif" fontSize="13" fill="#6bcb6b" textAnchor="middle">PREPAID</text>
          <text x="130" y="140" fontFamily="Arial Black, sans-serif" fontSize="40" fill="#10B981" textAnchor="middle" fontWeight="bold">$35</text>
          <text x="130" y="166" fontFamily="Arial, sans-serif" fontSize="13" fill="#6bcb6b" textAnchor="middle">/month</text>
          <text x="130" y="210" fontFamily="Arial, sans-serif" fontSize="11" fill="#3a7a3a" textAnchor="middle">ALL-IN. NO SURPRISES.</text>
          <text x="130" y="228" fontFamily="Arial, sans-serif" fontSize="11" fill="#3a7a3a" textAnchor="middle">Same towers.</text>
          <circle cx="130" cy="268" r="16" fill="#0a2a0a" stroke="#3a7a3a" strokeWidth="2" />
        </svg>

        {/* Checkmark overlay */}
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          opacity: checkOpacity,
          transform: `scale(${checkScale})`,
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" fill="#10B981" />
            <path d="M14 30 L24 42 L46 18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, padding: '0 60px' }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#10B981', textAlign: 'center', margin: 0 }}>
          Save $38/mo — same coverage
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 6: CTA — savings over 10 years, piggy bank
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-60, 0]);

  const piggyIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 100 }, durationInFrames: 60 });
  const piggyScale = interpolate(piggyIn, [0, 1], [0.3, 1]);

  const fillProg = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fillHeight = Math.round(140 * fillProg);

  const stat1Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat3Opacity = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 140 }, durationInFrames: 40 });
  const ctaScale = interpolate(ctaIn, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaIn, [0, 1], [0, 1]);

  const burstIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 8, stiffness: 200 }, durationInFrames: 35 });
  const burstScale = interpolate(burstIn, [0, 1], [0, 1.2]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, BLACK)}>$28/MONTH</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 6 }}>INVESTED INSTEAD</p>
      </div>

      {/* Piggy bank SVG */}
      <div style={{ position: 'absolute', top: 310, left: '50%', transform: `translate(-50%, 0) scale(${piggyScale})` }}>
        <svg width="300" height="260" viewBox="0 0 300 260">
          {/* Piggy bank body */}
          <ellipse cx="148" cy="150" rx="110" ry="95" fill="#ffd6d6" stroke="#f8a0a0" strokeWidth="3" />
          {/* Snout */}
          <ellipse cx="250" cy="162" rx="30" ry="22" fill="#ffb0b0" stroke="#f8a0a0" strokeWidth="2" />
          <circle cx="244" cy="158" r="6" fill="#cc6666" />
          <circle cx="258" cy="158" r="6" fill="#cc6666" />
          {/* Eye */}
          <circle cx="208" cy="118" r="9" fill="white" stroke="#f8a0a0" strokeWidth="2" />
          <circle cx="210" cy="118" r="4" fill="#333" />
          {/* Ear */}
          <ellipse cx="118" cy="66" rx="20" ry="28" fill="#ffb0b0" stroke="#f8a0a0" strokeWidth="2" />
          <ellipse cx="118" cy="70" rx="12" ry="18" fill="#ffd6d6" />
          {/* Legs */}
          <rect x="80" y="230" width="28" height="28" rx="8" fill="#ffb0b0" stroke="#f8a0a0" strokeWidth="2" />
          <rect x="122" y="234" width="28" height="24" rx="8" fill="#ffb0b0" stroke="#f8a0a0" strokeWidth="2" />
          <rect x="168" y="234" width="28" height="24" rx="8" fill="#ffb0b0" stroke="#f8a0a0" strokeWidth="2" />
          {/* Coin slot */}
          <rect x="130" y="60" width="38" height="10" rx="5" fill="#cc6666" />
          {/* Fill level */}
          <clipPath id="piggyClip">
            <ellipse cx="148" cy="150" rx="106" ry="91" />
          </clipPath>
          <rect x="42" y={Math.round(240 - fillHeight)} width="212" height={fillHeight} fill={ACCENT} opacity="0.35" clipPath="url(#piggyClip)" />
          {/* Coin */}
          {fillProg > 0.3 && (
            <circle cx="148" cy={Math.round(150 + (1 - fillProg) * 50)} r="12" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
          )}
        </svg>
      </div>

      {/* Stats */}
      <div style={{ position: 'absolute', top: 620, left: 0, right: 0, padding: '0 70px' }}>
        <div style={{ opacity: stat1Opacity, marginBottom: 18 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', margin: 0, textAlign: 'center' }}>$28/mo saved = <span style={{ color: BLACK, fontWeight: 'bold' }}>$336/year</span></p>
        </div>
        <div style={{ opacity: stat2Opacity, marginBottom: 18 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', margin: 0, textAlign: 'center' }}>Invested at 8% for 10 years</p>
        </div>
        <div style={{ opacity: stat3Opacity }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0, textAlign: 'center', fontWeight: 'bold' }}>= over $5,000</p>
        </div>
      </div>

      {/* CTA burst */}
      <div style={{
        position: 'absolute',
        bottom: 90,
        left: '50%',
        transform: `translate(-50%, 0) scale(${ctaScale})`,
        opacity: ctaOpacity,
        width: 460,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 18,
          padding: '22px 40px',
          position: 'relative',
        }}>
          {/* Burst rays */}
          <div style={{ position: 'absolute', inset: -8, borderRadius: 24, border: `3px solid ${ACCENT}`, opacity: 0.4, transform: `scale(${burstScale})` }} />
          <p style={{ ...headline(32, WHITE), margin: 0, letterSpacing: '0.08em' }}>CHECK YOUR BILL TONIGHT</p>
        </div>
      </div>
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
