import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const AMBER = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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

// ─── SCENES ──────────────────────────────────────────────────────────────────

// Scene 1: Bank building + $12B counter
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const buildingY = interpolate(buildingSpring, [0, 1], [500, 0]);

  const titleOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(
    interpolate(frame, [65, 210], [0, 12000000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const dollarOpacity1 = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarY1 = interpolate(frame, [20, 80], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarOpacity2 = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarY2 = interpolate(frame, [35, 95], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarOpacity3 = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarY3 = interpolate(frame, [50, 110], [0, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        {/* Bank building SVG */}
        <div style={{ transform: `translateY(${buildingY}px)`, position: 'relative' }}>
          <svg width={320} height={300} viewBox="0 0 320 300">
            {/* Building base */}
            <rect x={40} y={120} width={240} height={160} rx={4} fill="#1e1e1e" stroke={ACCENT} strokeWidth={3} />
            {/* Roof / pediment */}
            <polygon points="20,120 160,50 300,120" fill="#2a2a2a" stroke={ACCENT} strokeWidth={3} />
            {/* Columns */}
            {[70, 110, 150, 190, 230].map((x, i) => (
              <rect key={i} x={x} y={120} width={14} height={140} fill="#2e2e2e" stroke={ACCENT} strokeWidth={1.5} />
            ))}
            {/* Steps */}
            <rect x={20} y={270} width={280} height={14} rx={2} fill="#1a1a1a" stroke={ACCENT} strokeWidth={2} />
            <rect x={10} y={282} width={300} height={12} rx={2} fill="#151515" stroke={ACCENT} strokeWidth={2} />
            {/* BANK label */}
            <text x={160} y={90} textAnchor="middle" fill={WHITE} fontSize={18} fontFamily="Arial Black" letterSpacing="4">BANK</text>
            {/* Windows */}
            {[80, 135, 190, 245].map((x, i) => (
              <rect key={i} x={x} y={145} width={28} height={36} rx={3} fill={ACCENT} opacity={0.25} />
            ))}
            {[80, 135, 190, 245].map((x, i) => (
              <rect key={i} x={x} y={202} width={28} height={36} rx={3} fill={ACCENT} opacity={0.18} />
            ))}
          </svg>

          {/* Falling dollar signs */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 320, height: 300, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: 80, top: -20, opacity: dollarOpacity1, transform: `translateY(${dollarY1}px)`, fontSize: 36, color: ACCENT, fontFamily: FONT }}>$</div>
            <div style={{ position: 'absolute', left: 150, top: -30, opacity: dollarOpacity2, transform: `translateY(${dollarY2}px)`, fontSize: 28, color: AMBER, fontFamily: FONT }}>$</div>
            <div style={{ position: 'absolute', left: 220, top: -25, opacity: dollarOpacity3, transform: `translateY(${dollarY3}px)`, fontSize: 32, color: ACCENT, fontFamily: FONT }}>$</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: 'center', padding: '0 40px' }}>
          <p style={{ ...headline(28, ACCENT) }}>OVERDRAFT FEE MACHINE</p>
        </div>

        {/* Counter */}
        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(20, 'rgba(255,255,255,0.5)'), marginBottom: 10 }}>DRAINED FROM CUSTOMERS</p>
          <p style={{ fontFamily: FONT, fontSize: 68, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${(counterVal / 1000000000).toFixed(1)}B
          </p>
          <p style={{ ...headline(18, 'rgba(255,255,255,0.4)'), marginTop: 8 }}>IN OVERDRAFT FEES — 2023</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Checking account with 5 normal transactions sliding in
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const headerY = interpolate(headerSpring, [0, 1], [-300, 0]);

  const txns = [
    { label: 'RENT PAYMENT', amount: -180, color: ACCENT },
    { label: 'COFFEE SHOP', amount: -12, color: WHITE },
    { label: 'LUNCH', amount: -8, color: WHITE },
    { label: 'SNACK BAR', amount: -6, color: WHITE },
    { label: 'STREAMING APP', amount: -5, color: WHITE },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 48px' }}>
        {/* Account header */}
        <div style={{ transform: `translateY(${headerY}px)`, width: '100%' }}>
          <div style={{ background: BLACK, borderRadius: 18, padding: '24px 32px', textAlign: 'center', border: `3px solid ${ACCENT}` }}>
            <p style={{ ...headline(18, 'rgba(255,255,255,0.5)'), marginBottom: 6 }}>CHECKING ACCOUNT</p>
            <p style={{ fontFamily: FONT, fontSize: 64, color: WHITE, margin: 0 }}>$200</p>
            <p style={{ ...headline(14, 'rgba(255,255,255,0.35)'), marginTop: 4 }}>AVAILABLE BALANCE</p>
          </div>
        </div>

        {/* Transaction list */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {txns.map((t, i) => {
            const cardSpring = spring({ frame: Math.max(0, frame - 20 - i * 18), fps, config: { damping: 14, stiffness: 100 } });
            const cardX = interpolate(cardSpring, [0, 1], [400, 0]);
            return (
              <div
                key={i}
                style={{
                  transform: `translateX(${cardX}px)`,
                  background: BLACK,
                  borderRadius: 12,
                  padding: '14px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `2px solid ${i === 0 ? ACCENT : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 16, color: WHITE, letterSpacing: '0.08em' }}>{t.label}</span>
                <span style={{ fontFamily: FONT, fontSize: 20, color: t.color }}>{t.amount < 0 ? '-' : ''}${Math.abs(t.amount)}</span>
              </div>
            );
          })}
        </div>

        <div style={{
          opacity: interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          background: ACCENT,
          borderRadius: 12,
          padding: '12px 32px',
        }}>
          <p style={{ ...headline(20, BLACK), margin: 0 }}>LOOKS FINE… RIGHT?</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Transactions reorder largest-first + red X fees stack
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reorderProgress = interpolate(frame, [20, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Original order: 180, 12, 8, 6, 5
  // Reordered: 180 stays top (already biggest). After reorder stamp, show red Xs on 12,8,6,5.
  const stampOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampScale = interpolate(frame, [55, 70], [2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const txns = [
    { label: 'RENT PAYMENT', amount: 180, overdraft: false },
    { label: 'COFFEE SHOP', amount: 12, overdraft: true },
    { label: 'LUNCH', amount: 8, overdraft: true },
    { label: 'SNACK BAR', amount: 6, overdraft: true },
    { label: 'STREAMING APP', amount: 5, overdraft: true },
  ];

  const feeOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 48px' }}>
        {/* Reorder label */}
        <div style={{ opacity: reorderProgress, textAlign: 'center' }}>
          <p style={{ ...headline(22, ACCENT), margin: 0 }}>BANK REORDERS: LARGEST FIRST</p>
        </div>

        {/* Transaction rows with fee badges */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {txns.map((t, i) => {
            const feeDelay = 80 + i * 14;
            const feeRowOpacity = t.overdraft
              ? interpolate(frame, [feeDelay, feeDelay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              : 1;
            return (
              <div
                key={i}
                style={{
                  opacity: feeRowOpacity,
                  background: t.overdraft ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  padding: '12px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `2px solid ${t.overdraft ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 15, color: WHITE, letterSpacing: '0.06em' }}>{t.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: FONT, fontSize: 18, color: t.overdraft ? ACCENT : GREEN }}>-${t.amount}</span>
                  {t.overdraft && (
                    <div style={{ opacity: feeOpacity, background: ACCENT, borderRadius: 8, padding: '3px 10px' }}>
                      <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE }}>+$35 FEE</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* REORDER stamp */}
        <div style={{
          position: 'absolute',
          top: 180,
          right: 48,
          opacity: stampOpacity,
          transform: `scale(${stampScale}) rotate(-18deg)`,
          border: `5px solid ${ACCENT}`,
          borderRadius: 10,
          padding: '8px 18px',
        }}>
          <span style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, letterSpacing: '0.15em' }}>REORDERED</span>
        </div>

        {/* Total fees */}
        <div style={{ opacity: totalOpacity, textAlign: 'center', marginTop: 8 }}>
          <p style={{ ...headline(18, 'rgba(255,255,255,0.5)'), marginBottom: 6 }}>TOTAL FEES CHARGED</p>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>$140</p>
          <p style={{ ...headline(16, 'rgba(255,255,255,0.35)'), marginTop: 4 }}>WHEN YOU WERE ONLY $25 SHORT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Calculator showing 5 × $35 = $175 math
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calcSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const calcY = interpolate(calcSpring, [0, 1], [400, 0]);

  const line1Opacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOpacity = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shortOpacity = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const totalVal = Math.floor(
    interpolate(frame, [100, 160], [0, 175], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 48px' }}>
        {/* Calculator SVG */}
        <div style={{ transform: `translateY(${calcY}px)` }}>
          <svg width={300} height={260} viewBox="0 0 300 260">
            <rect x={10} y={10} width={280} height={240} rx={18} fill={BLACK} stroke={ACCENT} strokeWidth={3} />
            <rect x={24} y={24} width={252} height={70} rx={10} fill="#1a1a1a" />
            {/* Display */}
            <text x={264} y={72} textAnchor="end" fill={WHITE} fontSize={36} fontFamily="Arial Black">5 × $35</text>
            {/* Buttons row 1 */}
            {[7, 8, 9].map((n, i) => (
              <rect key={n} x={24 + i * 72} y={110} width={56} height={40} rx={8} fill="#222" />
            ))}
            <rect x={24 + 3 * 72} y={110} width={56} height={40} rx={8} fill={ACCENT} />
            {/* Buttons row 2 */}
            {[4, 5, 6].map((n, i) => (
              <rect key={n} x={24 + i * 72} y={160} width={56} height={40} rx={8} fill="#222" />
            ))}
            <rect x={24 + 3 * 72} y={160} width={56} height={40} rx={8} fill={ACCENT} />
            {/* = button row */}
            {[1, 2, 3].map((n, i) => (
              <rect key={n} x={24 + i * 72} y={210} width={56} height={40} rx={8} fill="#222" />
            ))}
            <rect x={24 + 3 * 72} y={210} width={56} height={40} rx={8} fill={ACCENT} />
          </svg>
        </div>

        {/* Math breakdown */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <div style={{ opacity: line1Opacity, textAlign: 'center' }}>
            <p style={{ ...headline(26, BLACK), margin: 0 }}>5 OVERDRAFT FEES</p>
          </div>
          <div style={{ opacity: line2Opacity, textAlign: 'center' }}>
            <p style={{ ...headline(24, 'rgba(0,0,0,0.5)'), margin: 0 }}>× $35 EACH</p>
          </div>
          <div style={{ opacity: totalOpacity, width: '100%', background: ACCENT, borderRadius: 16, padding: '18px 0', textAlign: 'center' }}>
            <p style={{ ...headline(20, BLACK), margin: 0, marginBottom: 4 }}>TOTAL FEES</p>
            <p style={{ fontFamily: FONT, fontSize: 80, color: BLACK, margin: 0, lineHeight: 1 }}>${totalVal}</p>
          </div>
        </div>

        {/* Kicker */}
        <div style={{ opacity: shortOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, textAlign: 'center' }}>
            You were only{' '}
            <span style={{ color: ACCENT, fontFamily: FONT }}>$25 short</span>
            {' '}— they turned it into{' '}
            <span style={{ color: ACCENT, fontFamily: FONT }}>$175</span>.
          </p>
          <p style={{ ...headline(16, 'rgba(0,0,0,0.4)'), marginTop: 10 }}>BANKS CALL IT "HIGH-TO-LOW PROCESSING"</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Three bank shield icons, gavel strikes, settlement amount
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-200, 0]);

  const banks = ['WELLS\nFARGO', 'BANK OF\nAMERICA', 'JPMORGAN\nCHASE'];

  const settlementOpacity = interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 48px' }}>
        {/* Title */}
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(26, WHITE), margin: 0 }}>THEY'VE ALL BEEN SUED</p>
        </div>

        {/* Bank shields row */}
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          {banks.map((name, i) => {
            const gavelSpring = spring({ frame: Math.max(0, frame - 30 - i * 28), fps, config: { damping: 8, stiffness: 200 } });
            const gavelScale = interpolate(gavelSpring, [0, 1], [2.5, 1]);
            const strikeOpacity = interpolate(
              frame,
              [30 + i * 28, 50 + i * 28],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                {/* Shield icon */}
                <svg width={100} height={110} viewBox="0 0 100 110">
                  <path d="M50 5 L90 22 L90 58 C90 80 72 98 50 105 C28 98 10 80 10 58 L10 22 Z"
                    fill="none" stroke={ACCENT} strokeWidth={3} />
                  <path d="M50 5 L90 22 L90 58 C90 80 72 98 50 105 C28 98 10 80 10 58 L10 22 Z"
                    fill="rgba(239,68,68,0.08)" />
                  <text x="50" y="52" textAnchor="middle" fill={WHITE} fontSize={10} fontFamily="Arial Black"
                    style={{ whiteSpace: 'pre' }}>
                    {name.split('\n').map((line, li) => (
                      <tspan key={li} x="50" dy={li === 0 ? 0 : 14}>{line}</tspan>
                    ))}
                  </text>
                </svg>
                {/* Gavel strike */}
                <div style={{ opacity: strikeOpacity, transform: `scale(${gavelScale})` }}>
                  <svg width={48} height={48} viewBox="0 0 48 48">
                    {/* Gavel head */}
                    <rect x={10} y={6} width={28} height={14} rx={4} fill={AMBER} />
                    {/* Handle */}
                    <rect x={22} y={18} width={6} height={24} rx={3} fill={AMBER} opacity={0.7} />
                    {/* Strike lines */}
                    <line x1={38} y1={8} x2={44} y2={4} stroke={ACCENT} strokeWidth={2.5} />
                    <line x1={38} y1={14} x2={46} y2={14} stroke={ACCENT} strokeWidth={2.5} />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Settlement amount */}
        <div style={{ opacity: settlementOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(20, 'rgba(255,255,255,0.5)'), marginBottom: 8 }}>SETTLEMENTS PAID OUT</p>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>$1.4B</p>
        </div>

        {/* Still doing it badge */}
        <div style={{
          opacity: badgeOpacity,
          background: ACCENT,
          borderRadius: 14,
          padding: '14px 40px',
          textAlign: 'center',
        }}>
          <p style={{ ...headline(22, WHITE), margin: 0 }}>THEY KEPT DOING IT ANYWAY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Phone notification + piggy bank shield + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 12, stiffness: 75 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [500, 0]);

  const step1Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Opacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Opacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 100 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 52px' }}>
        {/* Phone with alert notification */}
        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width={200} height={240} viewBox="0 0 200 240">
            {/* Phone body */}
            <rect x={20} y={10} width={160} height={220} rx={24} fill={BLACK} stroke={ACCENT} strokeWidth={3} />
            <rect x={28} y={24} width={144} height={190} rx={16} fill="#1a1a1a" />
            {/* Notification banner */}
            <rect x={34} y={36} width={132} height={56} rx={10} fill={ACCENT} opacity={0.9} />
            <text x={100} y={57} textAnchor="middle" fill={BLACK} fontSize={11} fontFamily="Arial Black">LOW BALANCE ALERT</text>
            <text x={100} y={75} textAnchor="middle" fill={BLACK} fontSize={10} fontFamily="Arial">Balance below $50 — saved $35</text>
            {/* Bell icon on phone */}
            <circle cx={100} cy={148} r={28} fill="none" stroke={ACCENT} strokeWidth={3} />
            <path d="M88 148 Q88 136 100 134 Q112 136 112 148 L114 158 L86 158 Z" fill={ACCENT} opacity={0.8} />
            <line x1={96} y1={162} x2={104} y2={162} stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
          </svg>
        </div>

        {/* Three protection steps */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ opacity: step1Opacity, background: BLACK, borderRadius: 14, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 18, color: BLACK }}>1</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>TURN ON LOW BALANCE ALERTS</p>
          </div>

          <div style={{ opacity: step2Opacity, background: BLACK, borderRadius: 14, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 18, color: BLACK }}>2</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>LINK SAVINGS AS BACKUP ($0–$10)</p>
          </div>

          <div style={{ opacity: step3Opacity, background: BLACK, borderRadius: 14, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 18, color: BLACK }}>3</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>SWITCH TO CREDIT UNION</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          background: ACCENT,
          borderRadius: 18,
          padding: '18px 36px',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{ ...headline(20, BLACK), margin: 0 }}>FOLLOW FOR MORE MONEY TRAPS</p>
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
