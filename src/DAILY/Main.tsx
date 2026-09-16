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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1 — Hook: 22-year trap ───────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const cardY = interpolate(cardSpring, [0, 1], [-300, 0]);

  const statementFade = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statementY = interpolate(frame, [30, 55], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const yearsSpring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 10, stiffness: 80 } });
  const yearsScale = interpolate(yearsSpring, [0, 1], [0.3, 1]);
  const yearsFade = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subtitleFade = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>

        {/* Credit card SVG */}
        <div style={{ transform: `translateY(${cardY}px)`, marginBottom: 24 }}>
          <svg width="340" height="210" viewBox="0 0 340 210">
            <rect x="0" y="0" width="340" height="210" rx="18" fill="#1E1E2E" stroke={ACCENT} strokeWidth="3" />
            <rect x="0" y="52" width="340" height="44" fill="#2A2A3E" />
            <rect x="24" y="118" width="80" height="52" rx="6" fill="#3B3B5A" />
            <rect x="24" y="174" width="120" height="14" rx="4" fill="#3B3B5A" />
            <rect x="200" y="174" width="80" height="14" rx="4" fill="#3B3B5A" />
            <text x="24" y="46" fontFamily={FONT} fontSize="16" fill={ACCENT} letterSpacing="2">CREDIT CARD</text>
            <text x="240" y="46" fontFamily={FONT} fontSize="14" fill={WHITE}>VISA</text>
          </svg>
        </div>

        {/* Statement unfurling */}
        <div style={{ opacity: statementFade, transform: `translateY(${statementY}px)`, background: '#1A1A2E', borderRadius: 12, padding: '18px 32px', width: 320, textAlign: 'center' }}>
          <p style={{ ...headline(13, '#888'), marginBottom: 10 }}>STATEMENT BALANCE</p>
          <p style={{ ...headline(38, WHITE), marginBottom: 14 }}>$5,000</p>
          <div style={{ background: '#2A1A1A', borderRadius: 8, padding: '10px 18px', border: `2px solid ${ACCENT}` }}>
            <p style={{ ...headline(11, '#888'), marginBottom: 4 }}>MINIMUM PAYMENT DUE</p>
            <p style={{ ...headline(28, ACCENT) }}>$100</p>
          </div>
        </div>

        {/* 22 YEARS spring-in */}
        <div style={{ opacity: yearsFade, transform: `scale(${yearsScale})`, marginTop: 28, textAlign: 'center' }}>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1 }}>22</p>
          <p style={{ ...headline(28, WHITE) }}>YEARS TO PAY OFF</p>
        </div>

        {/* Subtitle */}
        <p style={{ ...headline(18, '#AAA'), opacity: subtitleFade, marginTop: 18 }}>
          if you only pay the minimum
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2 — Pie chart: almost all interest ────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const sliceProgress = interpolate(frame, [25, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // 79% interest slice (large red), 21% principal (small green)
  const interestAngle = sliceProgress * 285; // 285 degrees = ~79%
  const principalAngle = sliceProgress * 75;  // 75 degrees = ~21%

  const label1Fade = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Fade = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numFade = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cx = 160; const cy = 160; const r = 130;
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
  const arc = (startDeg: number, endDeg: number, color: string) => {
    if (endDeg - startDeg <= 0) return null;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return (
      <path
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={color}
      />
    );
  };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...headline(22, BLACK), opacity: titleFade, marginBottom: 8 }}>NUMBER ONE</p>
        <p style={{ ...headline(28, BLACK), opacity: titleFade, marginBottom: 32 }}>minimum = mostly interest</p>

        <svg width="320" height="320" viewBox="0 0 320 320">
          {arc(0, interestAngle, ACCENT)}
          {arc(interestAngle, interestAngle + principalAngle, '#10B981')}
          <circle cx={cx} cy={cy} r={55} fill={BG_LIGHT} />
          <text x={cx} y={cy + 8} textAnchor="middle" fontFamily={FONT} fontSize="16" fill={BLACK}>YOUR</text>
          <text x={cx} y={cx + 22} textAnchor="middle" fontFamily={FONT} fontSize="16" fill={BLACK}>PAYMENT</text>
        </svg>

        <div style={{ opacity: label1Fade, display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <div style={{ width: 22, height: 22, background: ACCENT, borderRadius: 4 }} />
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>79% goes to INTEREST</p>
        </div>
        <div style={{ opacity: label2Fade, display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <div style={{ width: 22, height: 22, background: '#10B981', borderRadius: 4 }} />
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>21% reduces PRINCIPAL</p>
        </div>

        <p style={{ ...headline(20, '#555'), opacity: numFade, marginTop: 24 }}>
          you&apos;re barely chipping away at debt
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3 — Bar chart: $5K vs $24K total paid ─────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 70 } });
  const bar1H = interpolate(bar1Spring, [0, 1], [0, 180]);

  const bar2Spring = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14, stiffness: 60 } });
  const bar2H = interpolate(bar2Spring, [0, 1], [0, 560]);

  const label1Fade = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Fade = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const diffFade = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffSpring = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 12, stiffness: 80 } });
  const diffScale = interpolate(diffSpring, [0, 1], [0.5, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100 }}>
        <p style={{ ...headline(22, WHITE), opacity: titleFade }}>NUMBER TWO</p>
        <p style={{ ...headline(26, ACCENT), opacity: titleFade, marginBottom: 40, marginTop: 6 }}>what you really pay</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, height: 600 }}>
          {/* Bar 1: $5,000 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: label1Fade, marginBottom: 8 }}>
              <p style={{ ...headline(28, WHITE), margin: 0 }}>$5,000</p>
              <p style={{ ...headline(14, '#888'), margin: 0 }}>charged</p>
            </div>
            <div style={{ width: 110, height: bar1H, background: WHITE, borderRadius: '8px 8px 0 0' }} />
          </div>

          {/* Bar 2: $24,000 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: label2Fade, marginBottom: 8 }}>
              <p style={{ ...headline(28, ACCENT), margin: 0 }}>$24,000</p>
              <p style={{ ...headline(14, '#888'), margin: 0 }}>total paid</p>
            </div>
            <div style={{ width: 110, height: bar2H, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
          </div>
        </div>

        <div style={{ opacity: diffFade, transform: `scale(${diffScale})`, marginTop: 24, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#888'), margin: 0 }}>that&apos;s</p>
          <p style={{ ...headline(52, ACCENT), margin: 0 }}>$19,000</p>
          <p style={{ ...headline(22, '#888'), margin: 0 }}>in pure interest</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4 — Timeline: minimum shrinks, payoff recedes ─────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lineProgress = interpolate(frame, [25, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 860]);

  const milestones = [
    { label: '5 YRS', x: 215, delay: 55 },
    { label: '10 YRS', x: 430, delay: 80 },
    { label: '15 YRS', x: 645, delay: 105 },
    { label: '22 YRS', x: 860, delay: 130 },
  ];

  const barProgress = interpolate(frame, [45, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const insightFade = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 60, paddingRight: 60 }}>
        <p style={{ ...headline(22, BLACK), opacity: titleFade }}>NUMBER THREE</p>
        <p style={{ ...headline(26, ACCENT), opacity: titleFade, marginBottom: 48, marginTop: 6 }}>the payoff date moves further</p>

        {/* Timeline */}
        <div style={{ position: 'relative', width: 900, height: 100 }}>
          {/* Base line */}
          <div style={{ position: 'absolute', top: 42, left: 0, width: 900, height: 6, background: '#DDD', borderRadius: 3 }} />
          {/* Progress line */}
          <div style={{ position: 'absolute', top: 42, left: 0, width: lineWidth, height: 6, background: ACCENT, borderRadius: 3 }} />

          {milestones.map((m) => {
            const mFade = interpolate(frame, [m.delay, m.delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={m.label} style={{ position: 'absolute', left: m.x - 2, top: 0, opacity: mFade, textAlign: 'center' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: m.label === '22 YRS' ? ACCENT : '#999', marginLeft: -5, marginTop: 36 }} />
                <p style={{ fontFamily: FONT, fontSize: m.label === '22 YRS' ? 20 : 16, color: m.label === '22 YRS' ? ACCENT : BLACK, margin: '10px 0 0 -22px', width: 60 }}>{m.label}</p>
              </div>
            );
          })}
        </div>

        {/* Debt bar barely shrinking */}
        <div style={{ marginTop: 50, width: 860 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#555', marginBottom: 8, textAlign: 'left' }}>balance after 5 years of minimum payments:</p>
          <div style={{ position: 'relative', height: 52, background: '#EEE', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 52, width: `${interpolate(barProgress, [0, 1], [100, 83])}%`, background: ACCENT, borderRadius: 8 }} />
            <p style={{ position: 'absolute', left: 16, top: 14, fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>$4,150 STILL OWED</p>
          </div>
        </div>

        <p style={{ ...headline(19, '#444'), opacity: insightFade, marginTop: 28, maxWidth: 800, lineHeight: 1.4 }}>
          minimum shrinks each month — so it takes even longer
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5 — Convenience check trap ────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const envelopeSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 85 } });
  const envelopeY = interpolate(envelopeSpring, [0, 1], [200, 0]);

  const checkFade = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkY = interpolate(frame, [55, 80], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clockFade = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockSpin = interpolate(frame, [90, dur - 20], [0, 720], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const debtFade = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtSpring = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 70 } });
  const debtScale = interpolate(debtSpring, [0, 1], [0.6, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <p style={{ ...headline(22, WHITE), opacity: titleFade }}>NUMBER FOUR</p>
        <p style={{ ...headline(26, ACCENT), opacity: titleFade, marginBottom: 28, marginTop: 6 }}>the convenience check trap</p>

        {/* Envelope */}
        <div style={{ transform: `translateY(${envelopeY}px)` }}>
          <svg width="260" height="180" viewBox="0 0 260 180">
            <rect x="0" y="0" width="260" height="180" rx="10" fill="#1E1E1E" stroke="#444" strokeWidth="2" />
            <polyline points="0,0 130,90 260,0" fill="none" stroke="#444" strokeWidth="2" />
            <rect x="30" y="40" width="200" height="100" rx="4" fill="#2A2A2A" />
            <text x="50" y="72" fontFamily={FONT} fontSize="11" fill="#888">SPECIAL OFFER FOR YOU</text>
            <text x="50" y="96" fontFamily={FONT} fontSize="18" fill={WHITE}>CONVENIENCE</text>
            <text x="50" y="118" fontFamily={FONT} fontSize="18" fill={WHITE}>CHECK ENCLOSED</text>
          </svg>
        </div>

        {/* Check slipping out */}
        <div style={{ opacity: checkFade, transform: `translateY(${checkY}px)`, marginTop: -20 }}>
          <svg width="300" height="140" viewBox="0 0 300 140">
            <rect x="0" y="0" width="300" height="140" rx="6" fill="#FFFDE7" stroke="#CCC" strokeWidth="2" />
            <text x="20" y="36" fontFamily={FONT} fontSize="12" fill="#555">PAY TO THE ORDER OF</text>
            <text x="20" y="60" fontFamily={FONT} fontSize="20" fill={BLACK}>YOU</text>
            <text x="20" y="96" fontFamily={FONT} fontSize="12" fill="#555">APR</text>
            <text x="20" y="118" fontFamily={FONT} fontSize="22" fill={ACCENT}>29.99%</text>
            <text x="160" y="96" fontFamily={FONT} fontSize="12" fill="#555">AMOUNT</text>
            <text x="160" y="118" fontFamily={FONT} fontSize="22" fill={BLACK}>$2,500</text>
          </svg>
        </div>

        {/* Clock spinning */}
        <div style={{ opacity: clockFade, marginTop: 12 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#444" strokeWidth="4" />
            <line x1="40" y1="40" x2="40" y2="14" stroke={ACCENT} strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockSpin}, 40, 40)`} />
            <line x1="40" y1="40" x2="56" y2="40" stroke={WHITE} strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockSpin * 0.083}, 40, 40)`} />
          </svg>
        </div>

        <div style={{ opacity: debtFade, transform: `scale(${debtScale})`, marginTop: 12, textAlign: 'center' }}>
          <p style={{ ...headline(18, '#888'), margin: 0 }}>resets the clock &amp; adds</p>
          <p style={{ ...headline(44, ACCENT), margin: 0 }}>thousands more</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6 — CTA: $50 extra = 4 years ──────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const road1Spring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 70 } });
  const road1W = interpolate(road1Spring, [0, 1], [0, 340]);

  const road2Spring = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 70 } });
  const road2W = interpolate(road2Spring, [0, 1], [0, 340]);

  const piggySpring = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 80 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0, 1]);

  const savingsSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 75 } });
  const savingsScale = interpolate(savingsSpring, [0, 1], [0.4, 1]);
  const savingsFade = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaFade = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 50, paddingRight: 50 }}>
        <p style={{ ...headline(24, BLACK), opacity: titleFade }}>the $50 fix</p>
        <p style={{ ...headline(18, '#555'), opacity: titleFade, marginBottom: 40, marginTop: 6 }}>add just $50 extra per month</p>

        {/* Road 1: 22 years */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, width: 880 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', width: 180, margin: 0, textAlign: 'right' }}>minimum only</p>
          <div style={{ flex: 1, height: 44, background: '#EEE', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 44, width: road1W, background: '#CCC', borderRadius: 8 }} />
            <p style={{ position: 'absolute', left: 12, top: 10, fontFamily: FONT, fontSize: 18, color: '#666', margin: 0 }}>22 YEARS →→→→→→→→→→→</p>
          </div>
        </div>

        {/* Road 2: 4 years */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, width: 880 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, width: 180, margin: 0, textAlign: 'right', fontWeight: 'bold' }}>+$50/month</p>
          <div style={{ position: 'relative', height: 44, background: '#EEE', borderRadius: 8, overflow: 'hidden', width: road2W / 2.5 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 44, width: road2W / 2.5, background: '#10B981', borderRadius: 8 }} />
            <p style={{ position: 'absolute', left: 12, top: 10, fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0, whiteSpace: 'nowrap' }}>4 YEARS ✓</p>
          </div>
        </div>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyScale})`, marginBottom: 20 }}>
          <svg width="120" height="100" viewBox="0 0 120 100">
            {/* Body */}
            <ellipse cx="55" cy="60" rx="42" ry="32" fill="#F59E0B" />
            {/* Head */}
            <circle cx="90" cy="50" r="20" fill="#F59E0B" />
            {/* Ear */}
            <ellipse cx="88" cy="32" rx="7" ry="5" fill="#F59E0B" stroke="#E07B00" strokeWidth="1.5" />
            {/* Eye */}
            <circle cx="96" cy="45" r="3" fill={BLACK} />
            {/* Nose */}
            <ellipse cx="104" cy="52" rx="6" ry="4" fill="#E07B00" />
            <circle cx="102" cy="52" r="1.5" fill={BLACK} />
            <circle cx="106" cy="52" r="1.5" fill={BLACK} />
            {/* Coin slot */}
            <rect x="44" y="28" width="20" height="4" rx="2" fill="#E07B00" />
            {/* Legs */}
            <rect x="28" y="86" width="12" height="14" rx="4" fill="#F59E0B" />
            <rect x="44" y="86" width="12" height="14" rx="4" fill="#F59E0B" />
            <rect x="60" y="86" width="12" height="14" rx="4" fill="#F59E0B" />
            {/* Tail */}
            <path d="M 13 58 Q 4 50 10 42 Q 16 34 13 28" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ opacity: savingsFade, transform: `scale(${savingsScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(20, '#555'), margin: 0 }}>saves you</p>
          <p style={{ ...headline(62, '#10B981'), margin: 0 }}>$15,000</p>
          <p style={{ ...headline(20, '#555'), margin: 0 }}>in interest</p>
        </div>

        <div style={{ opacity: ctaFade, marginTop: 20, background: ACCENT, borderRadius: 12, padding: '14px 32px' }}>
          <p style={{ ...headline(20, WHITE), margin: 0 }}>follow for more bank traps ↓</p>
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
