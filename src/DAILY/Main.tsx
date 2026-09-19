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

// ─── Scene 1 — Hook: The "Cancel Anytime" lie ────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [280, 0]);

  const badgeFade = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stepsReveal = interpolate(frame, [75, 160], [0, 7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numSteps = Math.floor(stepsReveal);

  const warningSpring = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 10, stiffness: 120 } });
  const warningScale = interpolate(warningSpring, [0, 1], [0.2, 1]);
  const warningFade = interpolate(frame, [168, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stepLabels = ['1. ACCOUNT', '2. REASONS?', '3. DISCOUNT?', '4. SURVEY', '5. ARE YOU SURE?', '6. CALL US', '7. GIVE UP'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        {/* Phone SVG */}
        <div style={{ transform: `translateY(${phoneY}px)`, marginBottom: 28 }}>
          <svg width={140} height={230} viewBox="0 0 140 230">
            <rect x={8} y={8} width={124} height={214} rx={18} fill="#1E1E1E" stroke="#333" strokeWidth={2} />
            <rect x={16} y={26} width={108} height={172} rx={6} fill="#0D0D0D" />
            <rect x={50} y={12} width={40} height={8} rx={4} fill="#333" />
            <rect x={48} y={218} width={44} height={5} rx={2.5} fill="#333" />
            <rect x={22} y={80} width={96} height={40} rx={8} fill="#16A34A" opacity={badgeFade} />
            <text x={70} y={97} fontFamily={FONT} fontSize="9" fill={WHITE} textAnchor="middle" fontWeight="bold" opacity={badgeFade}>✓ CANCEL</text>
            <text x={70} y={113} fontFamily={FONT} fontSize="9" fill={WHITE} textAnchor="middle" fontWeight="bold" opacity={badgeFade}>ANYTIME</text>
          </svg>
        </div>

        {/* Steps chain building down */}
        <div style={{ width: 340, marginBottom: 20 }}>
          {stepLabels.slice(0, Math.max(0, numSteps)).map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <div style={{
                background: i === 6 ? '#444' : ACCENT,
                borderRadius: 8,
                padding: '6px 16px',
              }}>
                <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BY DESIGN badge */}
        <div style={{
          opacity: warningFade,
          transform: `scale(${warningScale})`,
          background: ACCENT,
          borderRadius: 16,
          padding: '14px 40px',
          textAlign: 'center' as const,
        }}>
          <p style={headline(40, WHITE)}>BY DESIGN</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S1-END

// ─── Scene 2 — The Dark Pattern + FTC $1.2B ──────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const box1Spring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 15, stiffness: 100 } });
  const box1Scale = interpolate(box1Spring, [0, 1], [0, 1]);

  const box2Fade = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box3Fade = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box4Fade = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ftcSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 110 } });
  const ftcScale = interpolate(ftcSpring, [0, 1], [0.3, 1]);
  const ftcFade = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bridgeFade = interpolate(frame, [195, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const connectorStyle: React.CSSProperties = { width: 3, height: 18, background: ACCENT, alignSelf: 'center' as const };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 28, textAlign: 'center' as const }}>
          <p style={headline(28, BLACK)}>THE DESIGN IS DELIBERATE</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{
            transform: `scale(${box1Scale})`,
            border: '3px solid #16A34A',
            borderRadius: 10,
            padding: '10px 24px',
            background: '#DCFCE7',
            textAlign: 'center' as const,
            minWidth: 220,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 16, color: '#166534', margin: 0, letterSpacing: '0.06em' }}>✓ CANCEL ANYTIME</p>
          </div>
          <div style={connectorStyle} />
          <div style={{
            opacity: box2Fade,
            border: `2px solid ${ACCENT}`,
            borderRadius: 10,
            padding: '10px 24px',
            background: WHITE,
            textAlign: 'center' as const,
            minWidth: 220,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: 0 }}>WHY ARE YOU LEAVING?</p>
          </div>
          <div style={{ ...connectorStyle, opacity: box2Fade }} />
          <div style={{
            opacity: box3Fade,
            border: `2px solid ${ACCENT}`,
            borderRadius: 10,
            padding: '10px 24px',
            background: WHITE,
            textAlign: 'center' as const,
            minWidth: 220,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: 0 }}>WANT A DISCOUNT?</p>
          </div>
          <div style={{ ...connectorStyle, opacity: box3Fade }} />
          <div style={{
            opacity: box4Fade,
            background: ACCENT,
            borderRadius: 10,
            padding: '10px 24px',
            textAlign: 'center' as const,
            minWidth: 220,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: 0, letterSpacing: '0.04em' }}>GIVE UP. PAY AGAIN.</p>
          </div>
        </div>

        <div style={{
          opacity: ftcFade,
          transform: `scale(${ftcScale}) rotate(-6deg)`,
          background: ACCENT,
          borderRadius: 16,
          padding: '16px 36px',
          textAlign: 'center' as const,
          border: '4px solid #B91C1C',
        }}>
          <p style={{ ...headline(14, WHITE), marginBottom: 6 }}>FTC DOCUMENTED</p>
          <p style={headline(58, WHITE)}>$1.2B</p>
          <p style={{ ...headline(14, WHITE), marginTop: 4 }}>IN CONSUMER HARM</p>
        </div>

        <div style={{ opacity: bridgeFade, marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center' as const, margin: 0 }}>
            it keeps 15% of users who tried to leave
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S2-END

// ─── Scene 3 — The 15% Retention Trap ────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const gridReveal = interpolate(frame, [15, 110], [0, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const visibleCount = Math.floor(gridReveal);

  const trappedSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 80 } });
  const trappedScale = interpolate(trappedSpring, [0, 1], [0.5, 1]);

  const statFade = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const notesFade = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeFade = interpolate(frame, [192, 212], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const persons = Array.from({ length: 20 }, () => null);
  const trappedSet = new Set([0, 1, 2]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 28, textAlign: 'center' as const }}>
          <p style={headline(26, WHITE)}>FOR EVERY 20 SUBSCRIBERS</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, width: 320, gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {persons.map((_, i) => {
            const isTrapped = trappedSet.has(i);
            const isVisible = i < visibleCount;
            const fill = isTrapped ? ACCENT : '#555';
            return (
              <div key={i} style={{ opacity: isVisible ? 1 : 0, transform: isTrapped ? `scale(${trappedScale})` : 'scale(1)' }}>
                <svg width={42} height={56} viewBox="0 0 42 56">
                  <circle cx={21} cy={13} r={11} fill={fill} />
                  <rect x={7} y={26} width={28} height={30} rx={8} fill={fill} />
                  {isTrapped && (
                    <g>
                      <rect x={13} y={18} width={16} height={20} rx={3} fill="none" stroke={WHITE} strokeWidth={2} />
                      <rect x={17} y={14} width={8} height={10} rx={4} fill="none" stroke={WHITE} strokeWidth={2} />
                    </g>
                  )}
                </svg>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: statFade, textAlign: 'center' as const, marginBottom: 14 }}>
          <p style={headline(76, ACCENT)}>15%</p>
          <p style={{ ...headline(24, WHITE), marginTop: 4 }}>STAY TRAPPED</p>
        </div>

        <div style={{ opacity: notesFade, background: '#1E1E1E', borderRadius: 12, padding: '10px 28px', marginBottom: 10 }}>
          <p style={headline(15, '#999')}>WHO WANTED TO CANCEL</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center' as const, margin: 0 }}>
            multiply that across millions — that's $1.2 billion
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S3-END

// ─── Scene 4 — 4 Forgotten Subs = $1,200/yr ──────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1Spring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const card1X = interpolate(card1Spring, [0, 1], [-600, 0]);
  const card2Spring = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 100 } });
  const card2X = interpolate(card2Spring, [0, 1], [-600, 0]);
  const card3Spring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 100 } });
  const card3X = interpolate(card3Spring, [0, 1], [-600, 0]);
  const card4Spring = spring({ frame: Math.max(0, frame - 125), fps, config: { damping: 14, stiffness: 100 } });
  const card4X = interpolate(card4Spring, [0, 1], [-600, 0]);

  const totalProgress = interpolate(frame, [130, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalAmount = Math.floor(totalProgress * 1200);

  const bridgeFade = interpolate(frame, [205, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subs = [
    { name: 'STREAMING SVC', icon: '▶' },
    { name: 'FITNESS APP',   icon: '♡' },
    { name: 'CLOUD STORAGE', icon: '☁' },
    { name: 'NEWS SERVICE',  icon: '✉' },
  ];
  const cardOffsets = [card1X, card2X, card3X, card4X];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 24, textAlign: 'center' as const }}>
          <p style={headline(26, BLACK)}>4 FORGOTTEN SUBSCRIPTIONS</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {subs.map((sub, i) => (
          <div key={i} style={{
            transform: `translateX(${cardOffsets[i] ?? 0}px)`,
            display: 'flex',
            alignItems: 'center',
            width: 360,
            background: BLACK,
            borderRadius: 14,
            padding: '14px 20px',
            marginBottom: 10,
            gap: 16,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 24, color: WHITE }}>{sub.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ ...headline(14, WHITE), textAlign: 'left' as const }}>{sub.name}</p>
              <p style={{ ...headline(20, ACCENT), textAlign: 'left' as const, marginTop: 2 }}>$25/mo</p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center' as const, marginTop: 16, marginBottom: 6 }}>
          <p style={{ fontFamily: FONT, fontSize: 15, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 4px' }}>drained per year:</p>
          <p style={headline(82, ACCENT)}>${totalAmount.toLocaleString()}</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center' as const, margin: 0 }}>
            and most people give up trying to cancel them
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S4-END

// ─── Scene 5 — 15 Minutes, 40% Give Up ───────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clockSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 16, stiffness: 55 } });
  const minuteAngle = interpolate(clockSpring, [0, 1], [0, 90]);

  const minuteHandX = 130 + 88 * Math.sin((minuteAngle * Math.PI) / 180);
  const minuteHandY = 130 - 88 * Math.cos((minuteAngle * Math.PI) / 180);

  const personFade = interpolate(frame, [55, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stat1Spring = spring({ frame: Math.max(0, frame - 108), fps, config: { damping: 12, stiffness: 90 } });
  const stat1Scale = interpolate(stat1Spring, [0, 1], [0.3, 1]);
  const stat1Fade = interpolate(frame, [108, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const noteFade = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeFade = interpolate(frame, [190, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const hourMarkers = Array.from({ length: 12 }, (_, h) => h);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 20, textAlign: 'center' as const }}>
          <p style={headline(26, WHITE)}>THE QUIT TAX</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            <circle cx={130} cy={130} r={120} fill="#1A1A1A" stroke="#2E2E2E" strokeWidth={3} />
            {hourMarkers.map((h) => {
              const ang = (h * 30 * Math.PI) / 180;
              const x1 = 130 + 100 * Math.sin(ang);
              const y1 = 130 - 100 * Math.cos(ang);
              const x2 = 130 + 112 * Math.sin(ang);
              const y2 = 130 - 112 * Math.cos(ang);
              return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3E3E3E" strokeWidth={h % 3 === 0 ? 3 : 1.5} />;
            })}
            <line x1={130} y1={130} x2={130} y2={58} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={130} y1={130} x2={minuteHandX} y2={minuteHandY} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
            <circle cx={130} cy={130} r={8} fill={ACCENT} />
            <text x={200} y={138} fontFamily={FONT} fontSize="14" fill={ACCENT} textAnchor="middle" fontWeight="bold">15</text>
            <text x={200} y={155} fontFamily={FONT} fontSize="11" fill={ACCENT} textAnchor="middle">MIN</text>
          </svg>
        </div>

        <div style={{ opacity: personFade, marginBottom: 18 }}>
          <svg width={260} height={90} viewBox="0 0 260 90">
            <circle cx={42} cy={26} r={20} fill="#555" />
            <rect x={22} y={48} width={40} height={42} rx={10} fill="#555" />
            <line x1={62} y1={56} x2={80} y2={50} stroke="#555" strokeWidth={12} strokeLinecap="round" />
            <rect x={80} y={24} width={56} height={48} rx={8} fill="#1E1E1E" stroke={ACCENT} strokeWidth={2} />
            <circle cx={108} cy={48} r={14} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeDasharray="30 8" />
            <rect x={150} y={22} width={80} height={34} rx={8} fill="#2A2A2A" stroke="#333" strokeWidth={1.5} />
            <text x={190} y={44} fontFamily={FONT} fontSize="22" fill={WHITE} textAnchor="middle">???</text>
          </svg>
        </div>

        <div style={{
          opacity: stat1Fade,
          transform: `scale(${stat1Scale})`,
          background: ACCENT,
          borderRadius: 16,
          padding: '14px 44px',
          textAlign: 'center' as const,
          marginBottom: 14,
        }}>
          <p style={headline(70, WHITE)}>40%</p>
          <p style={{ ...headline(18, WHITE), marginTop: 4 }}>GIVE UP MID-CANCEL</p>
        </div>

        <div style={{ opacity: noteFade, marginBottom: 8 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center' as const, margin: 0 }}>
            another $25 charge lands next month
          </p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center' as const, margin: 0 }}>
            here's the one move that stops it for good
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S5-END

// ─── Scene 6 — CTA: Check Your Statement ─────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const row1Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 100 } });
  const row1X = interpolate(row1Spring, [0, 1], [600, 0]);
  const row2Spring = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 14, stiffness: 100 } });
  const row2X = interpolate(row2Spring, [0, 1], [600, 0]);
  const row3Spring = spring({ frame: Math.max(0, frame - 81), fps, config: { damping: 14, stiffness: 100 } });
  const row3X = interpolate(row3Spring, [0, 1], [600, 0]);
  const row4Spring = spring({ frame: Math.max(0, frame - 114), fps, config: { damping: 14, stiffness: 100 } });
  const row4X = interpolate(row4Spring, [0, 1], [600, 0]);

  const check1Fade = interpolate(frame, [52, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2Fade = interpolate(frame, [82, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check3Fade = interpolate(frame, [108, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check4Fade = interpolate(frame, [136, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 100 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.4, 1]);
  const badgeFade = interpolate(frame, [155, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaFade = interpolate(frame, [185, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rows = [
    { label: 'STREAMING SVC',  amount: '-$25.00' },
    { label: 'FITNESS APP',    amount: '-$25.00' },
    { label: 'CLOUD STORAGE',  amount: '-$25.00' },
    { label: 'NEWS SERVICE',   amount: '-$25.00' },
  ];
  const rowOffsets = [row1X, row2X, row3X, row4X];
  const checkFades = [check1Fade, check2Fade, check3Fade, check4Fade];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 22, textAlign: 'center' as const }}>
          <p style={headline(28, BLACK)}>CHECK YOUR STATEMENT</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        <div style={{ width: 370, marginBottom: 20 }}>
          {rows.map((row, i) => (
            <div key={i} style={{
              transform: `translateX(${rowOffsets[i] ?? 0}px)`,
              display: 'flex',
              justifyContent: 'space-between' as const,
              alignItems: 'center',
              background: WHITE,
              border: '2px solid #E0E0E0',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 8,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 13, color: BLACK, margin: 0, letterSpacing: '0.04em' }}>{row.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ fontFamily: FONT, fontSize: 15, color: ACCENT, margin: 0, fontWeight: 'bold' }}>{row.amount}</p>
                <div style={{ opacity: checkFades[i] ?? 0 }}>
                  <svg width={26} height={26} viewBox="0 0 26 26">
                    <circle cx={13} cy={13} r={12} fill="#16A34A" />
                    <polyline points="7,13 11,17 19,8" fill="none" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '20px 48px',
          textAlign: 'center' as const,
          marginBottom: 16,
        }}>
          <p style={headline(72, WHITE)}>$1,200</p>
          <p style={{ ...headline(20, WHITE), marginTop: 4 }}>BACK IN YOUR POCKET</p>
        </div>

        <div style={{ opacity: ctaFade, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.05em', margin: '0 0 12px' }}>
            every single year
          </p>
          <p style={headline(20, BLACK)}>FOLLOW FOR MORE MONEY TRAPS</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Composition ─────────────────────────────────────────────────────────────
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
