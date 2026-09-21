import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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

// ─── Scene 2 — The Science: Pain of paying ───────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cashSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 90 } });
  const cashX = interpolate(cashSpring, [0, 1], [-300, 0]);
  const tapSpring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 90 } });
  const tapX = interpolate(tapSpring, [0, 1], [300, 0]);
  const brainSpring = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 70 } });
  const brainScale = interpolate(brainSpring, [0, 1], [0, 1]);

  const pulseFade = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flatFade = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelFade = interpolate(frame, [150, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <p style={{ ...headline(34, BLACK), marginBottom: 36, opacity: titleFade }}>PAIN OF PAYING</p>

        {/* Brain SVG center */}
        <div style={{ transform: `scale(${brainScale})`, marginBottom: 32 }}>
          <svg width="130" height="110" viewBox="0 0 130 110">
            <ellipse cx="65" cy="55" rx="52" ry="42" fill="#E0D4F7" stroke="#9B72E8" strokeWidth="3" />
            <path d="M65 18 Q80 28 82 45 Q90 38 100 44 Q108 52 100 62 Q110 65 108 75 Q100 85 88 80 Q82 92 65 92 Q48 92 42 80 Q30 85 22 75 Q20 65 30 62 Q22 52 30 44 Q40 38 48 45 Q50 28 65 18Z" fill="#C8B4EE" stroke="#9B72E8" strokeWidth="2" />
            <line x1="65" y1="20" x2="65" y2="90" stroke="#9B72E8" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
        </div>

        {/* Two columns */}
        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start' }}>

          {/* Cash side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${cashX}px)` }}>
            {/* Hand holding cash */}
            <svg width="80" height="90" viewBox="0 0 80 90">
              <rect x="18" y="10" width="44" height="28" rx="4" fill="#85C47A" stroke="#4A8A40" strokeWidth="2" />
              <line x1="28" y1="18" x2="52" y2="18" stroke="#4A8A40" strokeWidth="1.5" />
              <line x1="28" y1="24" x2="52" y2="24" stroke="#4A8A40" strokeWidth="1.5" />
              <circle cx="40" cy="24" r="6" fill="#4A8A40" opacity="0.5" />
              <path d="M20 40 Q15 42 15 50 L15 78 Q15 84 22 84 L58 84 Q65 84 65 78 L65 50 Q65 42 60 40 L52 38 L52 34 Q52 30 48 30 Q44 30 44 34 L44 38 L36 38 L36 34 Q36 30 32 30 Q28 30 28 34 L28 38 Z" fill="#FFD580" stroke="#C8A040" strokeWidth="2" />
            </svg>
            {/* Pain pulses */}
            <div style={{ opacity: pulseFade }}>
              <svg width="80" height="40" viewBox="0 0 80 40">
                <path d="M5 20 L15 20 L20 8 L25 32 L30 20 L40 20 L45 10 L50 30 L55 20 L75 20" stroke="#E53E3E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#E53E3E', textAlign: 'center', margin: 0 }}>PAIN</p>
            </div>
          </div>

          {/* Tap side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${tapX}px)` }}>
            <svg width="80" height="90" viewBox="0 0 80 90">
              <rect x="20" y="5" width="40" height="72" rx="10" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
              <rect x="28" y="14" width="24" height="40" rx="4" fill="#2A2A2A" />
              <circle cx="40" cy="65" r="6" fill="#333" />
              <path d="M30 30 Q40 22 50 30" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M25 36 Q40 24 55 36" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
            {/* Flat line */}
            <div style={{ opacity: flatFade }}>
              <svg width="80" height="40" viewBox="0 0 80 40">
                <line x1="5" y1="20" x2="75" y2="20" stroke="#9B9B9B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#9B9B9B', textAlign: 'center', margin: 0 }}>NO SIGNAL</p>
            </div>
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, textAlign: 'center', marginTop: 32, opacity: labelFade, maxWidth: 500 }}>
          CASH HURTS A LITTLE — ON PURPOSE
        </p>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3 — 83% stat visualization ────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cashBarProgress = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cashlessBarProgress = interpolate(frame, [55, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.2, 1]);
  const badgeFade = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarHeight = 320;
  const cashHeight = cashBarProgress * maxBarHeight * 0.54;
  const cashlessHeight = cashlessBarProgress * maxBarHeight;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <p style={{ ...headline(34, WHITE), marginBottom: 50, opacity: titleFade }}>SAME PRODUCT. SAME PERSON.</p>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, height: 360, marginBottom: 20 }}>

          {/* Cash bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: '0 0 10px 0' }}>
              ${Math.round(cashBarProgress * 54)}
            </p>
            <div style={{
              width: 110,
              height: cashHeight,
              background: '#666',
              borderRadius: '8px 8px 0 0',
              minHeight: 4,
            }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', margin: '12px 0 0 0', textAlign: 'center' }}>CASH</p>
          </div>

          {/* Cashless bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, margin: '0 0 10px 0' }}>
              ${Math.round(cashlessBarProgress * 99)}
            </p>
            <div style={{
              width: 110,
              height: cashlessHeight,
              background: ACCENT,
              borderRadius: '8px 8px 0 0',
              minHeight: 4,
            }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '12px 0 0 0', textAlign: 'center' }}>CASHLESS</p>
          </div>

        </div>

        {/* MIT label */}
        <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', textAlign: 'center', margin: 0 }}>MIT CONSUMER RESEARCH</p>

        {/* Badge */}
        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale})`,
          background: ACCENT,
          borderRadius: 12,
          padding: '18px 36px',
          marginTop: 28,
        }}>
          <p style={{ ...headline(36, BLACK) }}>83% MORE SPENDING</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4 — Daily taps add up ─────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const icons = [
    { label: 'COFFEE', price: 5.50, delay: 20, color: '#8B5C2A' },
    { label: 'LUNCH', price: 14.00, delay: 55, color: '#E8A020' },
    { label: 'DELIVERY', price: 22.50, delay: 90, color: '#4A90D9' },
    { label: 'STREAMING', price: 8.99, delay: 125, color: '#9B72E8' },
  ];

  let runningTotal = 0;
  const totalAtFrame = icons.reduce((acc, icon) => {
    if (frame >= icon.delay + 20) return acc + icon.price;
    return acc;
  }, 0);

  const totalFade = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <p style={{ ...headline(32, BLACK), marginBottom: 44, opacity: titleFade }}>YOUR WEEK IN TAPS</p>

        {/* Icons row */}
        <div style={{ display: 'flex', gap: 36, marginBottom: 48 }}>
          {icons.map((icon, i) => {
            const iconFade = interpolate(frame, [icon.delay, icon.delay + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: iconFade }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="32" fill={icon.color} opacity="0.15" />
                  {i === 0 && (
                    <>
                      <path d="M24 46 Q24 28 36 28 Q48 28 48 46 L46 50 L26 50 Z" fill={icon.color} />
                      <path d="M48 34 Q56 32 56 40 Q56 46 48 44" stroke={icon.color} strokeWidth="3" fill="none" />
                      <rect x="28" y="50" width="16" height="4" rx="2" fill={icon.color} />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <circle cx="36" cy="32" r="12" fill={icon.color} />
                      <path d="M20 52 Q22 42 36 42 Q50 42 52 52" fill={icon.color} />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <rect x="18" y="22" width="36" height="28" rx="4" fill={icon.color} />
                      <rect x="24" y="28" width="24" height="16" rx="2" fill={BG_LIGHT} opacity="0.4" />
                      <path d="M26 54 L22 62 L50 62 L46 54" fill={icon.color} />
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <polygon points="28,22 52,36 28,50" fill={icon.color} />
                    </>
                  )}
                </svg>
                <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: '8px 0 2px 0' }}>{icon.label}</p>
                <p style={{ fontFamily: FONT, fontSize: 15, color: icon.color, margin: 0 }}>${icon.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>

        {/* Running total */}
        <div style={{ opacity: totalFade, background: BLACK, borderRadius: 16, padding: '20px 50px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', margin: '0 0 6px 0' }}>TODAY'S TOTAL</p>
          <p style={{ ...headline(52, ACCENT), margin: 0 }}>${totalAtFrame.toFixed(2)}</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 20, color: '#666', marginTop: 24, textAlign: 'center' }}>
          EACH TAP FELT LIKE NOTHING
        </p>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5 — Annual cost: $2,400 ───────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggySpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 80 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0, 1]);

  const crackFade = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterProgress = interpolate(frame, [80, 170], [0, 2400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const icon1Fade = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon2Fade = interpolate(frame, [155, 173], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon3Fade = interpolate(frame, [170, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <p style={{ ...headline(30, WHITE), marginBottom: 32, opacity: titleFade }}>PER YEAR, ON AVERAGE</p>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyScale})`, marginBottom: 24 }}>
          <svg width="160" height="130" viewBox="0 0 160 130">
            {/* Body */}
            <ellipse cx="80" cy="75" rx="55" ry="45" fill="#E8A0B0" stroke="#C06080" strokeWidth="3" />
            {/* Head */}
            <ellipse cx="130" cy="68" rx="26" ry="22" fill="#E8A0B0" stroke="#C06080" strokeWidth="3" />
            {/* Snout */}
            <ellipse cx="150" cy="72" rx="10" ry="8" fill="#F0B0C0" stroke="#C06080" strokeWidth="2" />
            <circle cx="147" cy="71" r="2" fill="#C06080" />
            <circle cx="153" cy="71" r="2" fill="#C06080" />
            {/* Eye */}
            <circle cx="136" cy="62" r="3" fill="#333" />
            {/* Ear */}
            <ellipse cx="122" cy="50" rx="8" ry="5" fill="#E8A0B0" stroke="#C06080" strokeWidth="2" />
            {/* Legs */}
            <rect x="40" y="108" width="18" height="20" rx="6" fill="#E8A0B0" stroke="#C06080" strokeWidth="2" />
            <rect x="65" y="112" width="18" height="16" rx="6" fill="#E8A0B0" stroke="#C06080" strokeWidth="2" />
            <rect x="88" y="112" width="18" height="16" rx="6" fill="#E8A0B0" stroke="#C06080" strokeWidth="2" />
            {/* Coin slot */}
            <rect x="68" y="32" width="24" height="6" rx="3" fill="#C06080" />
            {/* Crack */}
            <path d="M50 60 L60 70 L52 80" stroke="#C06080" strokeWidth="2" strokeDasharray="4 2" opacity={crackFade} fill="none" />
            {/* Tail */}
            <path d="M25 70 Q10 65 12 75 Q14 85 25 80" stroke="#C06080" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Counter */}
        <p style={{ ...headline(72, ACCENT), margin: '0 0 32px 0' }}>
          ${Math.round(counterProgress).toLocaleString()}
        </p>

        {/* Comparison icons */}
        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ opacity: icon1Fade, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <path d="M28 10 L34 22 L48 24 L38 34 L40 48 L28 42 L16 48 L18 34 L8 24 L22 22 Z" fill="none" stroke="#4A90D9" strokeWidth="3" />
              <path d="M20 40 Q22 28 28 22 Q34 28 36 40" fill="#4A90D9" opacity="0.3" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 16, color: '#4A90D9', textAlign: 'center', margin: '6px 0 0 0' }}>FLIGHT TO<br />EUROPE</p>
          </div>
          <div style={{ opacity: icon2Fade, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <rect x="10" y="24" width="36" height="28" rx="4" fill="none" stroke="#85C47A" strokeWidth="3" />
              <path d="M8 26 L28 10 L48 26" stroke="#85C47A" strokeWidth="3" fill="none" />
              <rect x="22" y="36" width="12" height="16" rx="2" fill="#85C47A" opacity="0.5" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 16, color: '#85C47A', textAlign: 'center', margin: '6px 0 0 0' }}>MONTH OF<br />RENT</p>
          </div>
          <div style={{ opacity: icon3Fade, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <rect x="12" y="16" width="32" height="28" rx="4" fill="none" stroke={ACCENT} strokeWidth="3" />
              <line x1="20" y1="25" x2="36" y2="25" stroke={ACCENT} strokeWidth="2" />
              <line x1="20" y1="32" x2="32" y2="32" stroke={ACCENT} strokeWidth="2" />
              <line x1="20" y1="38" x2="28" y2="38" stroke={ACCENT} strokeWidth="2" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 16, color: ACCENT, textAlign: 'center', margin: '6px 0 0 0' }}>INVESTMENT<br />SEED</p>
          </div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6 — Fix: Use cash for one category ────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walletSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const walletScale = interpolate(walletSpring, [0, 1], [0, 1]);

  const arrowFade = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cat1Fade = interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cat2Fade = interpolate(frame, [115, 133], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cat3Fade = interpolate(frame, [130, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 10, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.2, 1]);
  const badgeFade = interpolate(frame, [158, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <p style={{ ...headline(30, BLACK), marginBottom: 28, opacity: titleFade }}>ONE SIMPLE SWITCH</p>

        {/* Wallet SVG */}
        <div style={{ transform: `scale(${walletScale})`, marginBottom: 30 }}>
          <svg width="200" height="130" viewBox="0 0 200 130">
            {/* Wallet body */}
            <rect x="10" y="20" width="180" height="90" rx="12" fill="#8B6040" stroke="#5C3A18" strokeWidth="3" />
            {/* Coin pocket */}
            <rect x="120" y="35" width="58" height="60" rx="8" fill="#6A4820" stroke="#5C3A18" strokeWidth="2" />
            <circle cx="149" cy="65" r="16" fill="#D4A030" stroke="#A07020" strokeWidth="2" />
            <text x="149" y="70" textAnchor="middle" fill="#5C3A18" fontSize="16" fontWeight="bold">$</text>
            {/* Cash bills */}
            <rect x="22" y="38" width="85" height="20" rx="4" fill="#85C47A" stroke="#4A8A40" strokeWidth="1.5" />
            <rect x="22" y="62" width="85" height="20" rx="4" fill="#85C47A" stroke="#4A8A40" strokeWidth="1.5" opacity="0.8" />
            <rect x="22" y="82" width="60" height="14" rx="3" fill="#85C47A" stroke="#4A8A40" strokeWidth="1.5" opacity="0.6" />
            {/* USE CASH label */}
            <text x="64" y="52" textAnchor="middle" fill="#2A6020" fontSize="12" fontFamily="Arial Black, sans-serif" fontWeight="900">USE CASH</text>
          </svg>
        </div>

        {/* Arrow + categories */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: arrowFade }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>FOR:</p>
          <svg width="40" height="30" viewBox="0 0 40 30">
            <path d="M0 15 H30 M22 7 L30 15 L22 23" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', gap: 18 }}>
            {[
              { label: 'FOOD', fade: cat1Fade, color: '#E8A020' },
              { label: 'COFFEE', fade: cat2Fade, color: '#8B5C2A' },
              { label: 'SHOPS', fade: cat3Fade, color: '#4A90D9' },
            ].map((cat, i) => (
              <div key={i} style={{ opacity: cat.fade, background: cat.color, borderRadius: 8, padding: '8px 18px' }}>
                <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>{cat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 20, color: '#555', textAlign: 'center', marginTop: 28, maxWidth: 480 }}>
          THE DISCOMFORT COMES BACK.<br />YOU NATURALLY SPEND LESS.
        </p>

        {/* Badge */}
        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale})`,
          background: ACCENT,
          borderRadius: 12,
          padding: '18px 36px',
          marginTop: 24,
        }}>
          <p style={{ ...headline(30, BLACK) }}>SAVE $200/MONTH</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 1 — Hook: Tap to pay, money flies away ────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [300, 0]);

  const terminalFade = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinCount = Math.max(0, Math.floor(6));
  const coins = Array(coinCount).fill(0);

  const badgeSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.2, 1]);
  const badgeFade = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        {/* Title */}
        <p style={{ ...headline(38, WHITE), marginBottom: 40 }}>TAP TO PAY</p>

        {/* Phone + Terminal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40, transform: `translateY(${phoneY}px)` }}>
          {/* Phone SVG */}
          <svg width="110" height="190" viewBox="0 0 110 190">
            <rect x="5" y="5" width="100" height="180" rx="16" fill="#1E1E1E" stroke={ACCENT} strokeWidth="4" />
            <rect x="20" y="20" width="70" height="120" rx="6" fill="#2A2A2A" />
            <circle cx="55" cy="162" r="10" fill="#333" />
            {/* Wifi/pay icon */}
            <path d="M42 75 Q55 60 68 75" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M36 82 Q55 60 74 82" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="55" cy="88" r="4" fill={ACCENT} />
          </svg>

          {/* Arrow */}
          <svg width="50" height="40" viewBox="0 0 50 40" style={{ opacity: terminalFade }}>
            <path d="M0 20 H40 M30 10 L40 20 L30 30" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Terminal SVG */}
          <svg width="100" height="130" viewBox="0 0 100 130" style={{ opacity: terminalFade }}>
            <rect x="5" y="5" width="90" height="120" rx="10" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
            <rect x="20" y="20" width="60" height="40" rx="4" fill="#2A2A2A" />
            <rect x="30" y="30" width="40" height="20" rx="3" fill="#333" />
            <rect x="20" y="75" width="25" height="18" rx="3" fill="#2A2A2A" />
            <rect x="55" y="75" width="25" height="18" rx="3" fill={ACCENT} />
            <rect x="20" y="102" width="60" height="14" rx="3" fill="#2A2A2A" />
          </svg>
        </div>

        {/* Flying dollar signs */}
        <div style={{ position: 'relative', height: 60, width: 300 }}>
          {coins.map((_, i) => {
            const delay = i * 18 + 55;
            const coinOpacity = interpolate(frame, [delay, delay + 15, delay + 45, delay + 65], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const coinY = interpolate(frame, [delay, delay + 65], [0, -70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const offsets = [-120, -70, -20, 30, 80, 130];
            return (
              <div key={i} style={{ position: 'absolute', left: `calc(50% + ${offsets[i]}px)`, top: 10, opacity: coinOpacity, transform: `translateY(${coinY}px)` }}>
                <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>$</span>
              </div>
            );
          })}
        </div>

        {/* Badge */}
        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale})`,
          background: ACCENT,
          borderRadius: 12,
          padding: '18px 36px',
          marginTop: 20,
        }}>
          <p style={{ ...headline(28, BLACK), letterSpacing: '0.1em' }}>YOUR BRAIN BARELY NOTICES</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────
const DUR = 225;

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={DUR}><Scene1 dur={DUR} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR}><Scene2 dur={DUR} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR}><Scene3 dur={DUR} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR}><Scene4 dur={DUR} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR}><Scene5 dur={DUR} /></Series.Sequence>
        <Series.Sequence durationInFrames={DUR}><Scene6 dur={DUR} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
