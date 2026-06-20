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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── Scene 1: Hook — autopay phone + $1,700 badge ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const phoneIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 60 } });
  const check1 = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 20, stiffness: 140 } });
  const check2 = spring({ frame: Math.max(0, frame - 82), fps, config: { damping: 20, stiffness: 140 } });
  const check3 = spring({ frame: Math.max(0, frame - 109), fps, config: { damping: 20, stiffness: 140 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 20, stiffness: 90 } });
  const numCount = interpolate(frame, [152, 210], [0, 1700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 108, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(62, WHITE)}>AUTOPAY IS</p>
        <p style={{ ...headline(62, ACCENT), marginTop: 4 }}>DRAINING YOU</p>
        <p style={{ ...headline(62, WHITE), marginTop: 4 }}>BLIND</p>
      </div>

      {/* Phone showing autopay charges */}
      <div style={{
        position: 'absolute', top: 420, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: phoneIn, transform: `scale(${phoneIn})`,
      }}>
        <svg width="220" height="300" viewBox="0 0 220 300">
          <rect x="8" y="4" width="204" height="292" rx="26" fill="#1F2937" />
          <rect x="16" y="16" width="188" height="268" rx="18" fill="#111827" />
          <rect x="24" y="30" width="172" height="30" rx="8" fill="#374151" />
          <text x="110" y="51" textAnchor="middle" fontSize="15" fill={WHITE} fontFamily="Arial Black">AUTOPAY ACTIVE</text>
          {/* Row 1 */}
          <rect x="24" y="74" width="172" height="50" rx="10" fill="#1F2937" opacity={check1} />
          <circle cx="52" cy="99" r="14" fill="#10B981" opacity={check1} />
          <path d="M46 99 L51 104 L60 92" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={check1} />
          <text x="74" y="94" fontSize="14" fill={WHITE} fontFamily="Arial Black" opacity={check1}>NETFLIX</text>
          <text x="74" y="112" fontSize="12" fill="#9CA3AF" fontFamily="Arial Black" opacity={check1}>$22.99/mo</text>
          {/* Row 2 */}
          <rect x="24" y="134" width="172" height="50" rx="10" fill="#1F2937" opacity={check2} />
          <circle cx="52" cy="159" r="14" fill="#10B981" opacity={check2} />
          <path d="M46 159 L51 164 L60 152" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={check2} />
          <text x="74" y="154" fontSize="14" fill={WHITE} fontFamily="Arial Black" opacity={check2}>GYM</text>
          <text x="74" y="172" fontSize="12" fill="#9CA3AF" fontFamily="Arial Black" opacity={check2}>$49.99/mo</text>
          {/* Row 3 */}
          <rect x="24" y="194" width="172" height="50" rx="10" fill="#1F2937" opacity={check3} />
          <circle cx="52" cy="219" r="14" fill="#10B981" opacity={check3} />
          <path d="M46 219 L51 224 L60 212" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={check3} />
          <text x="74" y="214" fontSize="14" fill={WHITE} fontFamily="Arial Black" opacity={check3}>CLOUD STORAGE</text>
          <text x="74" y="232" fontSize="12" fill="#9CA3AF" fontFamily="Arial Black" opacity={check3}>$9.99/mo</text>
          <circle cx="110" cy="278" r="8" fill="#374151" />
        </svg>
      </div>

      {/* $1,700 cost badge */}
      <div style={{
        position: 'absolute', bottom: 76, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 18,
          paddingTop: 16, paddingBottom: 16, paddingLeft: 44, paddingRight: 44,
          textAlign: 'center',
        }}>
          <p style={headline(26, WHITE)}>THIS COSTS YOU</p>
          <p style={{ fontFamily: FONT, fontSize: 90, color: WHITE, margin: 0, lineHeight: 1 }}>
            ${Math.floor(numCount).toLocaleString()}
          </p>
          <p style={headline(22, WHITE)}>A YEAR</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Scene 2: Pain of Payment — brain SVG + pain meter comparison ──────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const brainIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 60 } });
  const boxesIn = spring({ frame: Math.max(0, frame - 78), fps, config: { damping: 22, stiffness: 80 } });
  const noteIn = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 24, stiffness: 70 } });

  const painLevel = interpolate(frame, [82, 162], [100, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const painBarH = Math.max(0, Math.floor((painLevel / 100) * 120));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(48, BLACK)}>PAYING BILLS</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 4 }}>USED TO HURT</p>
      </div>

      <div style={{
        position: 'absolute', top: 258, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: brainIn, transform: `scale(${brainIn})`,
      }}>
        <svg width="200" height="176" viewBox="0 0 200 176">
          <ellipse cx="100" cy="82" rx="80" ry="66" fill="#FDE68A" />
          <path d="M46 68 Q36 48 54 30 Q72 14 86 36" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M86 36 Q98 20 112 34 Q126 18 142 32" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M142 32 Q158 18 168 36 Q180 50 168 68" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 94 Q74 74 88 90 Q100 68 114 90 Q128 70 144 94" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M116 36 L106 58 L116 58 L104 82" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 464, left: 30, right: 30,
        display: 'flex', gap: 20,
        opacity: boxesIn, transform: `scale(${boxesIn})`,
      }}>
        <div style={{ flex: 1, background: '#FEE2E2', borderRadius: 18, paddingTop: 20, paddingBottom: 20, paddingLeft: 14, paddingRight: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '0 0 12px' }}>MANUAL PAY</p>
          <div style={{ width: 42, height: 120, background: '#FECACA', borderRadius: 8, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: ACCENT, borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: '10px 0 0' }}>PAIN: HIGH</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.3 }}>Brain stays alert</p>
        </div>

        <div style={{ flex: 1, background: '#D1FAE5', borderRadius: 18, paddingTop: 20, paddingBottom: 20, paddingLeft: 14, paddingRight: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '0 0 12px' }}>AUTOPAY</p>
          <div style={{ width: 42, height: 120, background: '#A7F3D0', borderRadius: 8, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: painBarH, background: '#10B981', borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#10B981', margin: '10px 0 0' }}>
            PAIN: {Math.floor(painLevel)}%
          </p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.3 }}>Brain goes dark</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 96, left: 36, right: 36, textAlign: 'center',
        opacity: noteIn, transform: `translateY(${interpolate(noteIn, [0, 1], [16, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          No pain = <span style={{ color: ACCENT }}>no awareness</span> = no brakes on spending.
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 3: 7 Zombie Subscription Cards ─────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const statIn = spring({ frame: Math.max(0, frame - 186), fps, config: { damping: 24, stiffness: 70 } });

  const items = [
    { label: 'GYM', price: '$49/mo' },
    { label: 'STREAMING', price: '$23/mo' },
    { label: 'CLOUD', price: '$10/mo' },
    { label: 'MUSIC', price: '$11/mo' },
    { label: 'NEWS APP', price: '$15/mo' },
    { label: 'VPN', price: '$8/mo' },
    { label: 'FITNESS APP', price: '$13/mo' },
  ];

  const cardSprings = items.map((_, i) =>
    spring({ frame: Math.max(0, frame - (52 + i * 20)), fps, config: { damping: 20, stiffness: 120 } })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 88, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(54, WHITE)}>YOU HAVE</p>
        <p style={{ ...headline(54, ACCENT), marginTop: 4 }}>7 FORGOTTEN</p>
        <p style={{ ...headline(54, WHITE), marginTop: 4 }}>CHARGES</p>
      </div>

      <div style={{ position: 'absolute', top: 358, left: 28, right: 28, display: 'flex', gap: 12 }}>
        {items.slice(0, 4).map((item, i) => (
          <div key={i} style={{
            flex: 1, background: '#1F2937', borderRadius: 14,
            paddingTop: 16, paddingBottom: 16,
            textAlign: 'center',
            opacity: cardSprings[i], transform: `scale(${cardSprings[i]})`,
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ display: 'block', margin: '0 auto 8px' }}>
              <circle cx="18" cy="18" r="16" fill="#374151" />
              <circle cx="18" cy="18" r="9" fill={ACCENT} />
              <path d="M18 11 L18 25 M11 18 L25 18" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 12, color: WHITE, margin: 0, lineHeight: 1.2 }}>{item.label}</p>
            <p style={{ fontFamily: FONT, fontSize: 15, color: ACCENT, margin: '4px 0 0' }}>{item.price}</p>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 524, left: 28, right: 28, display: 'flex', gap: 12 }}>
        {items.slice(4).map((item, i) => (
          <div key={i} style={{
            flex: 1, background: '#1F2937', borderRadius: 14,
            paddingTop: 16, paddingBottom: 16,
            textAlign: 'center',
            opacity: cardSprings[i + 4], transform: `scale(${cardSprings[i + 4]})`,
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ display: 'block', margin: '0 auto 8px' }}>
              <circle cx="18" cy="18" r="16" fill="#374151" />
              <circle cx="18" cy="18" r="9" fill={ACCENT} />
              <path d="M18 11 L18 25 M11 18 L25 18" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 12, color: WHITE, margin: 0, lineHeight: 1.2 }}>{item.label}</p>
            <p style={{ fontFamily: FONT, fontSize: 15, color: ACCENT, margin: '4px 0 0' }}>{item.price}</p>
          </div>
        ))}
        <div style={{ flex: 1 }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 94, left: 36, right: 36, textAlign: 'center',
        opacity: statIn, transform: `translateY(${interpolate(statIn, [0, 1], [14, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 29, color: WHITE, lineHeight: 1.4, margin: 0 }}>
          <span style={{ color: ACCENT }}>81% of Americans</span> pay for<br />at least one forgotten service.
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 4: Companies raise prices knowing autopay users won't notice ─────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const noteIn = spring({ frame: Math.max(0, frame - 190), fps, config: { damping: 24, stiffness: 70 } });

  const bars = [
    { name: 'NETFLIX', old: 14, newPrice: 23, pct: '+64%' },
    { name: 'SPOTIFY', old: 10, newPrice: 11, pct: '+10%' },
    { name: 'AMAZON', old: 13, newPrice: 15, pct: '+15%' },
  ];

  const barData = bars.map((bar, i) => {
    const start = 22 + i * 56;
    const grayPct = (bar.old / bar.newPrice) * 100;
    const redPct = ((bar.newPrice - bar.old) / bar.newPrice) * 100;
    return {
      ...bar,
      grayPct,
      redPct,
      fadeIn: spring({ frame: Math.max(0, frame - start), fps, config: { damping: 22, stiffness: 70 } }),
      grayW: interpolate(frame, [start, start + 48], [0, grayPct], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
      }),
      redW: interpolate(frame, [start + 52, start + 92], [0, redPct], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
      }),
    };
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>THEY RAISE PRICES</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 4 }}>KNOWING YOU WON&apos;T NOTICE</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 36, right: 36 }}>
        {barData.map((bar, i) => (
          <div key={i} style={{ marginBottom: 44, opacity: bar.fadeIn }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>{bar.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: 0 }}>${bar.old} → ${bar.newPrice}</p>
                <div style={{ background: ACCENT, borderRadius: 8, paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10 }}>
                  <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>{bar.pct}</p>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', height: 56, background: '#E5E7EB', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: `${bar.grayW}%`, height: 56, background: '#9CA3AF', borderRadius: 10 }} />
              <div style={{ position: 'absolute', top: 0, left: `${bar.grayPct}%`, width: `${bar.redW}%`, height: 56, background: ACCENT }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 96, left: 36, right: 36, textAlign: 'center',
        opacity: noteIn, transform: `translateY(${interpolate(noteIn, [0, 1], [14, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          <span style={{ color: ACCENT }}>Autopay customers</span> almost never cancel after a price hike.
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 5: The math — 7 × $20 = $140/mo → $1,680/yr ───────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const eq1In = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 80 } });
  const eq2In = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 22, stiffness: 80 } });
  const totalIn = spring({ frame: Math.max(0, frame - 182), fps, config: { damping: 20, stiffness: 90 } });

  const moCount = interpolate(frame, [35, 100], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yrCount = interpolate(frame, [115, 185], [0, 1680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(52, WHITE)}>DO THE MATH</p>
      </div>

      <div style={{
        position: 'absolute', top: 238, left: 36, right: 36,
        background: '#1F2937', borderRadius: 22,
        paddingTop: 28, paddingBottom: 28, paddingLeft: 32, paddingRight: 32,
        opacity: eq1In, transform: `translateY(${interpolate(eq1In, [0, 1], [20, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: '0 0 12px', textAlign: 'center' }}>
          7 FORGOTTEN CHARGES × $20/MO AVG
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: WHITE, margin: 0 }}>7</p>
          <p style={{ fontFamily: FONT, fontSize: 48, color: '#6B7280', margin: 0 }}>×</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: WHITE, margin: 0 }}>$20</p>
          <p style={{ fontFamily: FONT, fontSize: 48, color: '#6B7280', margin: 0 }}>=</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: ACCENT, margin: 0 }}>${Math.floor(moCount)}</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: '12px 0 0', textAlign: 'right' }}>PER MONTH</p>
      </div>

      <div style={{
        position: 'absolute', top: 560, left: 36, right: 36,
        background: '#1F2937', borderRadius: 22,
        paddingTop: 28, paddingBottom: 28, paddingLeft: 32, paddingRight: 32,
        opacity: eq2In, transform: `translateY(${interpolate(eq2In, [0, 1], [20, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: '0 0 12px', textAlign: 'center' }}>
          $140/MO × 12 MONTHS
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: WHITE, margin: 0 }}>$140</p>
          <p style={{ fontFamily: FONT, fontSize: 48, color: '#6B7280', margin: 0 }}>×</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: WHITE, margin: 0 }}>12</p>
          <p style={{ fontFamily: FONT, fontSize: 48, color: '#6B7280', margin: 0 }}>=</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: ACCENT, margin: 0 }}>${Math.floor(yrCount).toLocaleString()}</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: '12px 0 0', textAlign: 'right' }}>PER YEAR</p>
      </div>

      <div style={{
        position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center',
        opacity: totalIn, transform: `scale(${totalIn})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>THAT&apos;S ROUGHLY</p>
        <p style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, margin: 0, lineHeight: 1 }}>$1,700</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>SILENTLY GONE</p>
      </div>
    </FadeScene>
  );
};

// ── Scene 6: 3-step fix + pulsing CTA ────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const step1In = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 22, stiffness: 100 } });
  const step2In = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 22, stiffness: 100 } });
  const step3In = spring({ frame: Math.max(0, frame - 122), fps, config: { damping: 22, stiffness: 100 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 162), fps, config: { damping: 26, stiffness: 65 } });
  const pulse = interpolate(frame % 38, [0, 19, 38], [1, 1.07, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(50, BLACK)}>THREE MOVES</p>
        <p style={{ ...headline(50, ACCENT), marginTop: 4 }}>TO GET IT BACK</p>
      </div>

      {/* Step 1 */}
      <div style={{
        position: 'absolute', top: 296, left: 36, right: 36,
        opacity: step1In, transform: `translateX(${interpolate(step1In, [0, 1], [-60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingLeft: 22, paddingRight: 22, display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="56" height="64" viewBox="0 0 56 64">
            <rect x="6" y="4" width="44" height="56" rx="9" fill="#374151" />
            <rect x="10" y="12" width="36" height="40" rx="5" fill="#111827" />
            <rect x="16" y="20" width="5" height="18" rx="2" fill={ACCENT} />
            <rect x="25" y="20" width="5" height="18" rx="2" fill={ACCENT} />
            <rect x="34" y="20" width="5" height="18" rx="2" fill={ACCENT} />
            <rect x="14" y="40" width="28" height="4" rx="2" fill={ACCENT} />
            <circle cx="28" cy="56" r="4" fill="#6B7280" />
          </svg>
          <div>
            <p style={headline(28, ACCENT)}>1. OPEN BANK APP</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>Pull up your transaction history.</p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{
        position: 'absolute', top: 466, left: 36, right: 36,
        opacity: step2In, transform: `translateX(${interpolate(step2In, [0, 1], [60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingLeft: 22, paddingRight: 22, display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="4" y="10" width="28" height="5" rx="2" fill="#9CA3AF" />
            <rect x="4" y="22" width="28" height="5" rx="2" fill="#9CA3AF" />
            <rect x="4" y="34" width="20" height="5" rx="2" fill="#9CA3AF" />
            <circle cx="36" cy="30" r="14" fill="none" stroke={ACCENT} strokeWidth="5" />
            <line x1="46" y1="40" x2="54" y2="48" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div>
            <p style={headline(28, BLACK)}>2. FIND AUTOPAYS</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>List every recurring charge.</p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{
        position: 'absolute', top: 636, left: 36, right: 36,
        opacity: step3In, transform: `translateX(${interpolate(step3In, [0, 1], [-60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingLeft: 22, paddingRight: 22, display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="4" y="4" width="48" height="48" rx="12" fill={ACCENT} />
            <line x1="16" y1="16" x2="40" y2="40" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
            <line x1="40" y1="16" x2="16" y2="40" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div>
            <p style={headline(28, ACCENT)}>3. CANCEL TWO TODAY</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>Do it now — not next week.</p>
          </div>
        </div>
      </div>

      {/* Pulsing CTA */}
      <div style={{
        position: 'absolute', bottom: 80, left: 60, right: 60,
        display: 'flex', justifyContent: 'center',
        opacity: ctaIn, transform: `scale(${pulse})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14,
          paddingTop: 18, paddingBottom: 18, paddingLeft: 44, paddingRight: 44,
        }}>
          <p style={headline(32, WHITE)}>FOLLOW FOR MORE</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Root composition ───────────────────────────────────────────────────────────
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
