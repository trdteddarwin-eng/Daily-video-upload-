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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const screenS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const dealOp = interpolate(frame, [20, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bombS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 8, stiffness: 120 }, from: 0, to: 1 });
  const titleOp = interpolate(frame, [100, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [100, 124], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [152, 176], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <div style={{ transform: `scale(${screenS})`, position: 'relative' }}>
          <svg width="240" height="180" viewBox="0 0 240 180">
            <rect x="10" y="10" width="220" height="160" rx="12" fill="#1A1A2E" stroke="#374151" strokeWidth="2" />
            <rect x="10" y="10" width="220" height="38" rx="12" fill="#1E1E3F" />
            <text x="120" y="34" textAnchor="middle" fontSize="14" fill={WHITE} fontFamily="Arial Black">FINANCING OFFER</text>
            <rect x="24" y="58" width="192" height="52" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" opacity={dealOp} />
            <text x="120" y="81" textAnchor="middle" fontSize="22" fill="#10B981" fontFamily="Arial Black" opacity={dealOp}>0% APR</text>
            <text x="120" y="100" textAnchor="middle" fontSize="13" fill={WHITE} fontFamily="Arial Black" opacity={dealOp}>FOR 12 MONTHS</text>
            <rect x="50" y="122" width="140" height="36" rx="8" fill={ACCENT} />
            <text x="120" y="145" textAnchor="middle" fontSize="14" fill={WHITE} fontFamily="Arial Black">ACCEPT OFFER</text>
          </svg>
          <div style={{ position: 'absolute', right: -28, top: 8, transform: `scale(${bombS})` }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <circle cx="36" cy="40" r="26" fill="#1F1F1F" stroke={ACCENT} strokeWidth="3" />
              <rect x="32" y="10" width="10" height="18" rx="3" fill="#374151" />
              <line x1="38" y1="10" x2="52" y2="4" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="52" cy="4" r="4" fill="#F59E0B" />
              <text x="36" y="46" textAnchor="middle" fontSize="22" fill={ACCENT} fontFamily="Arial Black">!</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(38, WHITE)}>LOOKS LIKE</p>
          <p style={{ ...headline(72, ACCENT), lineHeight: 1 }}>A DEAL</p>
          <p style={{ ...headline(28, WHITE), lineHeight: 1.1 }}>IT'S A TRAP</p>
        </div>

        <div style={{ opacity: statOp, background: ACCENT, borderRadius: 12, padding: '14px 32px' }}>
          <p style={headline(20, WHITE)}>73% OF SHOPPERS GET HIT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const box1S = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const box2S = spring({ frame: Math.max(0, frame - 44), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const labelOp = interpolate(frame, [90, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [152, 176], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>TWO KINDS</p>
        <p style={{ ...headline(20, '#6B7280'), transform: `scale(${titleS})` }}>OF ZERO INTEREST</p>

        <div style={{ display: 'flex', gap: 20, width: '100%' }}>
          <div style={{ flex: 1, transform: `scale(${box1S})`, background: '#ECFDF5', border: '2px solid #10B981', borderRadius: 16, padding: '20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" fill="#10B981" />
              <path d="M16 30 L25 40 L44 20" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={headline(18, '#10B981')}>WAIVED</p>
            <p style={{ ...headline(12, '#374151'), marginTop: 4 }}>INTEREST GONE FOREVER</p>
          </div>

          <div style={{ flex: 1, transform: `scale(${box2S})`, background: '#FEF2F2', border: `2px solid ${ACCENT}`, borderRadius: 16, padding: '20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" fill={ACCENT} />
              <text x="30" y="22" textAnchor="middle" fontSize="10" fill={WHITE} fontFamily="Arial Black">HIDING</text>
              <text x="30" y="46" textAnchor="middle" fontSize="26" fill={WHITE} fontFamily="Arial Black">$$</text>
            </svg>
            <p style={headline(18, ACCENT)}>DEFERRED</p>
            <p style={{ ...headline(12, '#374151'), marginTop: 4 }}>QUIETLY BUILDING</p>
          </div>
        </div>

        <div style={{ opacity: labelOp, width: '100%', background: '#F9FAFB', border: '2px solid #D1D5DB', borderRadius: 14, padding: '16px 20px', textAlign: 'center' }}>
          <p style={headline(18, BLACK)}>MOST STORE OFFERS</p>
          <p style={{ ...headline(24, ACCENT), marginTop: 6 }}>= DEFERRED</p>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 12, padding: '14px 24px' }}>
          <p style={headline(18, WHITE)}>THE INTEREST NEVER DISAPPEARED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const barW = interpolate(frame, [20, 120], [0, 297], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotOp = interpolate(frame, [30, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bombS = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 8, stiffness: 130 }, from: 0, to: 1 });
  const billOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const w = Math.max(0, Math.floor(barW));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <p style={{ ...headline(42, WHITE), transform: `scale(${titleS})` }}>THE TIMELINE</p>
        <p style={{ ...headline(16, '#9CA3AF'), transform: `scale(${titleS})` }}>12 MONTHS, INTEREST QUIETLY BUILDING</p>

        <div style={{ width: '100%', position: 'relative', height: 80 }}>
          <svg width="340" height="80" viewBox="0 0 340 80">
            <rect x="10" y="34" width="300" height="12" rx="6" fill="#374151" />
            {w > 0 && <rect x="10" y="34" width={w} height="12" rx="6" fill={ACCENT} opacity={0.5} />}
            {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
              <g key={i} opacity={dotOp}>
                <circle cx={10 + i * 27} cy="40" r="5" fill="#4B5563" />
                {i % 3 === 0 && (
                  <text x={10 + i * 27} y="64" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Arial Black">
                    {`M${i + 1}`}
                  </text>
                )}
              </g>
            ))}
            <circle cx="307" cy="40" r="8" fill={ACCENT} opacity={dotOp} />
            <text x="307" y="64" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="Arial Black" opacity={dotOp}>M12</text>
          </svg>
          <div style={{ position: 'absolute', right: -4, top: -22, transform: `scale(${bombS})` }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="32" cy="36" r="22" fill="#1F1F1F" stroke={ACCENT} strokeWidth="3" />
              <rect x="29" y="10" width="8" height="14" rx="3" fill="#374151" />
              <line x1="33" y1="10" x2="46" y2="4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="46" cy="4" r="3.5" fill="#F59E0B" />
              <text x="32" y="41" textAnchor="middle" fontSize="18" fill={ACCENT} fontFamily="Arial Black">!</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: billOp, width: '100%', background: '#1A0000', border: `2px solid ${ACCENT}`, borderRadius: 16, padding: '20px 24px', textAlign: 'center' }}>
          <p style={headline(18, '#9CA3AF')}>MISS BY ONE DAY →</p>
          <p style={{ ...headline(52, ACCENT), lineHeight: 1, marginTop: 8 }}>ALL 12</p>
          <p style={headline(22, WHITE)}>MONTHS HIT AT ONCE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const tvS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const plusOp = interpolate(frame, [40, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billS = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 100 }, from: 0, to: 1 });
  const totalS = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 8, stiffness: 90 }, from: 0.6, to: 1 });
  const totalOp = interpolate(frame, [112, 136], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [162, 186], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(42, BLACK), transform: `scale(${titleS})` }}>THE MATH</p>
        <p style={{ ...headline(16, '#6B7280'), transform: `scale(${titleS})` }}>$2,400 TV AT 26.99% APR</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${tvS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg width="90" height="72" viewBox="0 0 90 72">
              <rect x="4" y="4" width="82" height="52" rx="5" fill="#1A1A2E" stroke="#374151" strokeWidth="2" />
              <rect x="10" y="10" width="70" height="40" rx="3" fill="#0F172A" />
              <rect x="28" y="58" width="34" height="6" rx="3" fill="#374151" />
              <rect x="36" y="56" width="18" height="6" rx="3" fill="#4B5563" />
              <text x="45" y="34" textAnchor="middle" fontSize="12" fill="#10B981" fontFamily="Arial Black">$2,400</text>
            </svg>
            <p style={headline(14, BLACK)}>YOUR TV</p>
          </div>

          <p style={{ ...headline(36, ACCENT), opacity: plusOp }}>+</p>

          <div style={{ transform: `scale(${billS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg width="80" height="72" viewBox="0 0 80 72">
              <rect x="6" y="4" width="68" height="60" rx="5" fill="#FEF2F2" stroke={ACCENT} strokeWidth="2" />
              <line x1="14" y1="18" x2="66" y2="18" stroke="#FECACA" strokeWidth="1" />
              <line x1="14" y1="28" x2="66" y2="28" stroke="#FECACA" strokeWidth="1" />
              <line x1="14" y1="38" x2="66" y2="38" stroke="#FECACA" strokeWidth="1" />
              <text x="40" y="15" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="Arial Black">INTEREST BILL</text>
              <text x="40" y="53" textAnchor="middle" fontSize="20" fill={ACCENT} fontFamily="Arial Black">$648</text>
            </svg>
            <p style={headline(14, ACCENT)}>SURPRISE!</p>
          </div>
        </div>

        <div style={{ opacity: totalOp, transform: `scale(${totalS})`, textAlign: 'center' }}>
          <p style={headline(20, '#6B7280')}>REAL TOTAL PAID</p>
          <p style={{ ...headline(80, ACCENT), lineHeight: 1 }}>$3,048</p>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '14px 28px', width: '100%', textAlign: 'center' }}>
          <p style={headline(18, WHITE)}>NOT THE $2,400 YOU PLANNED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const docS = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 12, stiffness: 70 }, from: 0, to: 1 });
  const lineOp = interpolate(frame, [36, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const highlightS = spring({ frame: Math.max(0, frame - 78), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const compareOp = interpolate(frame, [118, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [152, 176], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(40, WHITE), transform: `scale(${titleS})` }}>THE TELL</p>
        <p style={{ ...headline(18, '#9CA3AF'), transform: `scale(${titleS})` }}>FOUR WORDS IN THE FINE PRINT</p>

        <div style={{ transform: `scale(${docS})`, width: '100%', background: '#1E1E1E', borderRadius: 16, padding: '22px 24px' }}>
          <p style={{ ...headline(11, '#6B7280'), marginBottom: 12 }}>TERMS &amp; CONDITIONS</p>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 10, background: '#374151', borderRadius: 5, marginBottom: 10, opacity: lineOp }} />
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, opacity: lineOp }}>
            <div style={{ height: 10, background: '#374151', borderRadius: 5, flex: 1 }} />
            <div style={{ transform: `scaleX(${highlightS})`, transformOrigin: 'left', background: ACCENT, borderRadius: 6, padding: '4px 10px', whiteSpace: 'nowrap' as const }}>
              <p style={headline(11, WHITE)}>IF PAID IN FULL</p>
            </div>
            <div style={{ height: 10, background: '#374151', borderRadius: 5, flex: 1 }} />
          </div>
          {[0, 1].map((i) => (
            <div key={i} style={{ height: 10, background: '#374151', borderRadius: 5, marginBottom: 10, opacity: lineOp }} />
          ))}
        </div>

        <div style={{ opacity: compareOp, width: '100%', display: 'flex', gap: 14 }}>
          <div style={{ flex: 1, background: '#FEF2F2', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <p style={headline(11, ACCENT)}>DEFERRED</p>
            <p style={{ ...headline(10, '#374151'), marginTop: 4 }}>"NO INTEREST IF PAID IN FULL"</p>
          </div>
          <div style={{ flex: 1, background: '#ECFDF5', border: '2px solid #10B981', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <p style={headline(11, '#10B981')}>WAIVED</p>
            <p style={{ ...headline(10, '#374151'), marginTop: 4 }}>"NO INTEREST" (NO IF)</p>
          </div>
        </div>

        <div style={{ opacity: ctaOp, background: '#1E1E1E', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '14px 24px', width: '100%', textAlign: 'center' }}>
          <p style={headline(18, ACCENT)}>SPOT "IF PAID IN FULL"</p>
          <p style={{ ...headline(15, WHITE), marginTop: 4 }}>= DEFERRED. DANGER.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const calS = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const pigS = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 80 }, from: 0, to: 1 });
  const fillH = interpolate(frame, [80, 162], [0, 36], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [180, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fh = Math.max(0, Math.floor(fillH));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <p style={{ ...headline(36, BLACK), transform: `scale(${titleS})` }}>THE ONE MOVE</p>
        <p style={{ ...headline(18, '#6B7280'), transform: `scale(${titleS})` }}>THAT KILLS THE TRAP</p>

        <div style={{ display: 'flex', gap: 28, width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${calS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <rect x="6" y="16" width="88" height="78" rx="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
              <rect x="6" y="16" width="88" height="26" rx="8" fill="#374151" />
              <rect x="26" y="8" width="8" height="18" rx="4" fill="#6B7280" />
              <rect x="66" y="8" width="8" height="18" rx="4" fill="#6B7280" />
              <text x="50" y="34" textAnchor="middle" fontSize="13" fill={WHITE} fontFamily="Arial Black">REMINDER</text>
              {[0,1,2,3,4,5].map((col) =>
                [0,1].map((row) => (
                  <rect
                    key={`${col}-${row}`}
                    x={14 + col * 13}
                    y={52 + row * 16}
                    width="10"
                    height="10"
                    rx="2"
                    fill={col === 4 && row === 0 ? ACCENT : '#D1D5DB'}
                  />
                ))
              )}
              <circle cx="50" cy="76" r="8" fill={ACCENT} />
              <text x="50" y="80" textAnchor="middle" fontSize="10" fill={WHITE} fontFamily="Arial Black">!</text>
            </svg>
            <p style={headline(13, BLACK)}>SET ALARM</p>
            <p style={headline(11, '#6B7280')}>MONTH 11</p>
          </div>

          <div style={{ transform: `scale(${pigS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <ellipse cx="46" cy="62" rx="34" ry="26" fill="#10B981" />
              <circle cx="76" cy="50" r="16" fill="#10B981" />
              <ellipse cx="88" cy="54" rx="8" ry="6" fill="#059669" />
              <circle cx="86" cy="53" r="2" fill="#065F46" />
              <circle cx="90" cy="53" r="2" fill="#065F46" />
              <circle cx="78" cy="44" r="3" fill={WHITE} />
              <circle cx="79" cy="44" r="1.5" fill={BLACK} />
              <ellipse cx="72" cy="36" rx="6" ry="8" fill="#059669" />
              <rect x="38" y="36" width="16" height="5" rx="2" fill="#065F46" />
              {fh > 0 && <rect x="22" y={62 + 10 - fh} width="48" height={fh} rx="3" fill="#059669" opacity={0.7} />}
              <rect x="24" y="84" width="10" height="12" rx="5" fill="#059669" />
              <rect x="38" y="84" width="10" height="12" rx="5" fill="#059669" />
              <rect x="52" y="84" width="10" height="12" rx="5" fill="#059669" />
            </svg>
            <p style={headline(13, '#10B981')}>PAY MONTHLY</p>
            <p style={headline(11, '#6B7280')}>IN EQUAL CHUNKS</p>
          </div>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '16px 36px', width: '100%', textAlign: 'center' }}>
          <p style={headline(22, WHITE)}>ONE REMINDER SAVES</p>
          <p style={{ ...headline(56, WHITE), lineHeight: 1, marginTop: 6 }}>$648</p>
        </div>

        <div style={{ opacity: tagOp, background: BLACK, borderRadius: 14, padding: '12px 36px' }}>
          <p style={headline(20, ACCENT)}>FOLLOW FOR MORE MONEY MATH</p>
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
