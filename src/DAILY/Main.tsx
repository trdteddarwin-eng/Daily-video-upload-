import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GRAY = '#6B7280';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENES ──────────────────────────────────────────────────────────────────
// Scene 1: Person + piggy bank with red coins draining out
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const pigSp = spring({ frame: Math.max(0, frame - 18), fps: 30, config: { damping: 14, stiffness: 70 } });
  const pigScale = interpolate(pigSp, [0, 1], [0.3, 1]);

  const drain = interpolate(frame, [45, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const subSp = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 12, stiffness: 60 } });
  const subO = interpolate(subSp, [0, 1], [0, 1]);

  const coinOffsets = [0, 1, 2].map(i => ({
    y: interpolate(drain, [i * 0.15, Math.min(1, i * 0.15 + 0.6)], [115, 115 + 70 + i * 20], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
    o: interpolate(drain, [i * 0.12, Math.min(1, i * 0.12 + 0.4), Math.min(1, i * 0.12 + 0.6)], [0, 1, 0.2], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
  }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          <p style={headline(62, WHITE)}>YOUR EMERGENCY</p>
          <p style={headline(62, ACCENT)}>FUND IS WRONG</p>
        </div>

        <div style={{ transform: `scale(${pigScale})`, transformOrigin: 'center center', marginBottom: 50 }}>
          <svg width="380" height="310" viewBox="0 0 380 310">
            {/* Person silhouette */}
            <circle cx="80" cy="58" r="36" fill={WHITE} />
            <rect x="44" y="96" width="72" height="95" rx="12" fill={WHITE} />
            <rect x="32" y="186" width="28" height="76" rx="8" fill={WHITE} />
            <rect x="92" y="186" width="28" height="76" rx="8" fill={WHITE} />
            {/* Arrow */}
            <path d="M168 155 L200 155 L196 144 L218 162 L196 180 L200 169 L168 169 Z" fill={ACCENT} />
            {/* Piggy bank body */}
            <ellipse cx="295" cy="168" rx="60" ry="54" fill="#F59E0B" />
            {/* Snout */}
            <ellipse cx="347" cy="177" rx="17" ry="13" fill="#D97706" />
            <circle cx="341" cy="175" r="3.5" fill={BLACK} />
            <circle cx="353" cy="175" r="3.5" fill={BLACK} />
            {/* Eye */}
            <circle cx="320" cy="152" r="5" fill={BLACK} />
            {/* Ear */}
            <ellipse cx="278" cy="124" rx="13" ry="17" fill="#D97706" />
            {/* Legs */}
            <rect x="258" y="215" width="17" height="27" rx="6" fill="#D97706" />
            <rect x="283" y="217" width="17" height="27" rx="6" fill="#D97706" />
            <rect x="308" y="217" width="17" height="27" rx="6" fill="#D97706" />
            {/* Coin slot */}
            <rect x="283" y="116" width="22" height="6" rx="3" fill={BLACK} />
            {/* Draining coins */}
            {coinOffsets.map((c, i) => (
              <circle key={i} cx={291 + i * 5} cy={c.y} r="9" fill={RED} opacity={c.o} />
            ))}
          </svg>
        </div>

        <div style={{ opacity: subO }}>
          <p style={{ ...headline(36, GRAY), marginBottom: 8 }}>THREE MONTHS SAVED.</p>
          <p style={headline(36, RED)}>WRONG ACCOUNT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Two bars — tiny red (0.46%) vs tall green (4.5%)
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const leftH = interpolate(frame, [25, 90], [0, 34], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rightH = interpolate(frame, [45, 160], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelSp = spring({ frame: Math.max(0, frame - 80), fps: 30, config: { damping: 12, stiffness: 60 } });
  const labelO = interpolate(labelSp, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 70 }}>
          <p style={headline(50, BLACK)}>INTEREST RATE</p>
          <p style={headline(50, ACCENT)}>COMPARISON</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 90, height: 380, marginBottom: 50 }}>
          {/* Regular savings bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <p style={{ fontFamily: FONT, fontSize: 38, color: RED, margin: 0 }}>0.46%</p>
            <div style={{ width: 130, height: leftH, background: RED, borderRadius: '8px 8px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, textAlign: 'center', lineHeight: 1.3 }}>REGULAR{'\n'}SAVINGS</p>
          </div>
          {/* HYSA bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, margin: 0 }}>4.5%</p>
            <div style={{ width: 130, height: rightH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, textAlign: 'center', lineHeight: 1.3 }}>HIGH-YIELD{'\n'}SAVINGS</p>
          </div>
        </div>

        <div style={{ opacity: labelO, textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>10X MORE INTEREST</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GRAY, margin: '12px 0 0' }}>Same money. Same insurance. Same access.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Two value boxes + counter counting to $3,400
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const box1Sp = spring({ frame: Math.max(0, frame - 22), fps: 30, config: { damping: 14, stiffness: 80 } });
  const box2Sp = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 14, stiffness: 80 } });
  const box1Scale = interpolate(box1Sp, [0, 1], [0, 1]);
  const box2Scale = interpolate(box2Sp, [0, 1], [0, 1]);

  const counter = interpolate(frame, [80, 200], [0, 3400], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const ctaSp = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 12, stiffness: 60 } });
  const ctaO = interpolate(ctaSp, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 60 }}>
          <p style={headline(46, WHITE)}>$20,000 EMERGENCY FUND</p>
          <p style={headline(40, GRAY)}>OVER 5 YEARS</p>
        </div>

        <div style={{ display: 'flex', gap: 40, marginBottom: 50, width: '100%' }}>
          {/* Regular savings box */}
          <div style={{ flex: 1, transform: `scale(${box1Scale})`, transformOrigin: 'center center', background: '#1E1E2E', border: `3px solid ${RED}`, borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: '0 0 12px' }}>REGULAR SAVINGS</p>
            <p style={{ fontFamily: FONT, fontSize: 52, color: RED, margin: 0, lineHeight: 1 }}>$20,460</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: GRAY, margin: '10px 0 0' }}>0.46% / yr</p>
          </div>
          {/* HYSA box */}
          <div style={{ flex: 1, transform: `scale(${box2Scale})`, transformOrigin: 'center center', background: '#0D2818', border: `3px solid ${ACCENT}`, borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: '0 0 12px' }}>HIGH-YIELD SAVINGS</p>
            <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, margin: 0, lineHeight: 1 }}>$23,860</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: GRAY, margin: '10px 0 0' }}>4.5% / yr</p>
          </div>
        </div>

        <div style={{ opacity: ctaO, background: ACCENT, borderRadius: 20, padding: '28px 48px', width: '100%', boxSizing: 'border-box' as const, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: '0 0 8px' }}>YOU'RE MISSING</p>
          <p style={{ fontFamily: FONT, fontSize: 86, color: BLACK, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
            ${Math.round(counter).toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Three feature cards popping in — FREE, FDIC, 10 MIN
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const card1Sp = spring({ frame: Math.max(0, frame - 28), fps: 30, config: { damping: 14, stiffness: 80 } });
  const card2Sp = spring({ frame: Math.max(0, frame - 68), fps: 30, config: { damping: 14, stiffness: 80 } });
  const card3Sp = spring({ frame: Math.max(0, frame - 108), fps: 30, config: { damping: 14, stiffness: 80 } });

  const cards = [
    { sp: card1Sp, badge: 'FREE', label: 'No fees to open', icon: 'dollar' },
    { sp: card2Sp, badge: 'FDIC', label: 'Federally insured', icon: 'shield' },
    { sp: card3Sp, badge: '10 MIN', label: 'Quick to set up', icon: 'clock' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 70 }}>
          <p style={headline(52, BLACK)}>HERE'S THE</p>
          <p style={headline(52, ACCENT)}>WILD PART</p>
        </div>

        {cards.map(({ sp, badge, label, icon }, i) => {
          const sc = interpolate(sp, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              transform: `scale(${sc})`,
              transformOrigin: 'center center',
              display: 'flex',
              alignItems: 'center',
              gap: 36,
              marginBottom: 32,
              background: WHITE,
              borderRadius: 20,
              padding: '24px 40px',
              width: '100%',
              boxSizing: 'border-box' as const,
              boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
              border: `2px solid ${ACCENT}`,
            }}>
              {/* Badge circle */}
              <div style={{ width: 88, height: 88, borderRadius: 44, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon === 'dollar' && (
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <text x="22" y="34" fontSize="36" fill={BLACK} textAnchor="middle" fontFamily="Arial Black">$</text>
                  </svg>
                )}
                {icon === 'shield' && (
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <path d="M22 4 L36 10 L36 22 Q36 34 22 40 Q8 34 8 22 L8 10 Z" fill={BLACK} />
                    <path d="M16 22 L20 26 L28 18" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                )}
                {icon === 'clock' && (
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="16" fill="none" stroke={BLACK} strokeWidth="3" />
                    <line x1="22" y1="22" x2="22" y2="12" stroke={BLACK} strokeWidth="3" strokeLinecap="round" />
                    <line x1="22" y1="22" x2="30" y2="27" stroke={BLACK} strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: '0 0 4px', letterSpacing: '0.08em' }}>{badge}</p>
                <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0 }}>{label}</p>
              </div>
            </div>
          );
        })}

        <p style={{ fontFamily: FONT, fontSize: 28, color: GRAY, textAlign: 'center', marginTop: 16 }}>
          Same money. Same protection. Zero risk.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Dollar signs flow from piggy bank to growing bank building
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const flowP = interpolate(frame, [20, 190], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const bankH = interpolate(flowP, [0, 1], [90, 160]);
  const bankW = interpolate(flowP, [0, 1], [90, 140]);
  const bankY = interpolate(flowP, [0, 1], [220, 150]);

  const labelSp = spring({ frame: Math.max(0, frame - 110), fps: 30, config: { damping: 12, stiffness: 60 } });
  const labelO = interpolate(labelSp, [0, 1], [0, 1]);

  const dollarItems = [0, 1, 2].map(i => {
    const t0 = i * 0.22;
    const t1 = Math.min(1, t0 + 0.5);
    return {
      x: interpolate(flowP, [t0, t1], [140, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      y: 190 + i * 22,
      o: interpolate(flowP, [t0, Math.min(1, t0 + 0.2), t1], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    };
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          <p style={headline(52, WHITE)}>EVERY MONTH</p>
          <p style={headline(52, RED)}>YOU WAIT</p>
        </div>

        <svg width="420" height="320" viewBox="0 0 420 320">
          {/* Piggy bank (left side) */}
          <ellipse cx="95" cy="195" rx="55" ry="50" fill="#F59E0B" opacity={0.85} />
          <ellipse cx="143" cy="204" rx="15" ry="11" fill="#D97706" />
          <circle cx="137" cy="202" r="3" fill={BLACK} />
          <circle cx="148" cy="202" r="3" fill={BLACK} />
          <circle cx="118" cy="180" r="4.5" fill={BLACK} />
          <ellipse cx="79" cy="153" rx="11" ry="15" fill="#D97706" />
          <rect x="58" y="238" width="15" height="24" rx="5" fill="#D97706" />
          <rect x="80" y="240" width="15" height="24" rx="5" fill="#D97706" />
          <rect x="102" y="240" width="15" height="24" rx="5" fill="#D97706" />
          <rect x="79" y="149" width="18" height="5" rx="2" fill={BLACK} />
          {/* Coin slot leaking */}
          <circle cx="90" cy="147" r="7" fill={RED} opacity={interpolate(flowP, [0, 0.5], [0, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />

          {/* Arrow */}
          <text x="193" y="204" fontSize="38" fill={GRAY} textAnchor="middle">→</text>

          {/* Bank building (right side, grows) */}
          <rect x={310} y={bankY} width={bankW} height={bankH} fill={WHITE} rx="4" />
          <rect x={307} y={bankY - 16} width={bankW + 6} height={18} fill={GRAY} rx="3" />
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={315 + i * (bankW - 20) / 3} y={bankY + 4} width={7} height={bankH - 20} rx="2" fill={GRAY} opacity={0.35} />
          ))}
          <rect x={310} y={bankY + bankH - 12} width={bankW} height={12} fill={GRAY} opacity={0.3} rx="2" />
          <text x={310 + bankW / 2} y={bankY + bankH + 22} fontSize="20" fill={WHITE} textAnchor="middle" fontFamily={FONT}>BANK</text>

          {/* Floating dollar signs */}
          {dollarItems.map((d, i) => (
            <text key={i} x={d.x} y={d.y} fontSize="32" fill={RED} opacity={d.o} textAnchor="middle">$</text>
          ))}
        </svg>

        <div style={{ opacity: labelO, marginTop: 20 }}>
          <p style={headline(42, RED)}>YOUR BANK PROFITS</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GRAY, textAlign: 'center', marginTop: 10 }}>
            billions from idle savings every year
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Search bar + rising bar chart + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const searchSp = spring({ frame: Math.max(0, frame - 22), fps: 30, config: { damping: 14, stiffness: 70 } });
  const searchScale = interpolate(searchSp, [0, 1], [0.8, 1]);
  const searchO = interpolate(searchSp, [0, 1], [0, 1]);

  const barGrow = interpolate(frame, [50, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const ctaSp = spring({ frame: Math.max(0, frame - 130), fps: 30, config: { damping: 12, stiffness: 60 } });
  const ctaScale = interpolate(ctaSp, [0, 1], [0.85, 1]);
  const ctaO = interpolate(ctaSp, [0, 1], [0, 1]);

  const barHeights = [0.28, 0.42, 0.36, 0.54, 0.48, 0.65, 0.58, 0.78, 0.72, 1.0];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          <p style={headline(56, BLACK)}>DO THIS</p>
          <p style={headline(56, ACCENT)}>RIGHT NOW</p>
        </div>

        {/* Search bar */}
        <div style={{
          opacity: searchO,
          transform: `scale(${searchScale})`,
          transformOrigin: 'center center',
          background: WHITE,
          borderRadius: 16,
          padding: '20px 32px',
          width: '100%',
          boxSizing: 'border-box' as const,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          marginBottom: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          border: `2px solid ${ACCENT}`,
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle cx="15" cy="15" r="10" fill="none" stroke={GRAY} strokeWidth="3" />
            <line x1="22" y1="22" x2="32" y2="32" stroke={GRAY} strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, letterSpacing: '0.02em' }}>
            high-yield savings account
          </p>
        </div>

        {/* Rising bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 190, marginBottom: 44, width: '100%', justifyContent: 'center' }}>
          {barHeights.map((h, i) => {
            const barH = interpolate(barGrow, [i * 0.06, Math.min(1, i * 0.06 + 0.45)], [0, h * 175], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const isLast = i === barHeights.length - 1;
            return (
              <div key={i} style={{
                width: 42,
                height: barH,
                background: isLast ? ACCENT : `rgba(16,185,129,${0.35 + i * 0.065})`,
                borderRadius: '6px 6px 0 0',
              }} />
            );
          })}
        </div>

        {/* CTA box */}
        <div style={{
          opacity: ctaO,
          transform: `scale(${ctaScale})`,
          transformOrigin: 'center center',
          background: ACCENT,
          borderRadius: 20,
          padding: '30px 44px',
          width: '100%',
          boxSizing: 'border-box' as const,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, margin: 0, lineHeight: 1.3 }}>
            10 MINUTES COULD EARN<br />YOU $3,400
          </p>
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
