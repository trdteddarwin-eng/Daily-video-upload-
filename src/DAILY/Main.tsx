import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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

// ─── Scene 1 — Hook: 12M Americans walk into the trap ────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-120, 0]);

  const personX = interpolate(frame, [30, 180], [60, 440], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const neon = frame % 50 > 46 ? 0.25 : 1;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '0 60px',
      }}>
        <p style={headline(90, WHITE)}>12 MILLION</p>
        <p style={headline(50, WHITE)}>AMERICANS</p>
        <p style={headline(50, ACCENT)}>TRAPPED YEARLY</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#888', margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
          by a loan designed to keep you paying
        </p>
      </div>

      <svg width="1080" height="860" viewBox="0 0 1080 860"
        style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <rect x="0" y="745" width="1080" height="115" fill="#0A0A0A" />
        <rect x="0" y="743" width="1080" height="4" fill="#2A2A2A" />

        <rect x="480" y="220" width="480" height="525" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="2" />
        <rect x="460" y="195" width="520" height="34" fill="#222" />

        <rect x="492" y="234" width="456" height="98" fill={ACCENT} opacity={neon * 0.85} rx="8" />
        <text x="720" y="298" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="50" fontWeight="bold">PAYDAY LOANS</text>
        <text x="720" y="364" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="28" opacity={neon}>CASH IN MINUTES</text>

        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={510 + i * 135} y="395" width="92" height="78" fill="#0D0D0D" stroke={ACCENT} strokeWidth="2" rx="3" />
            <line x1={556 + i * 135} y1="395" x2={556 + i * 135} y2="473" stroke={ACCENT} strokeWidth="1.5" opacity={0.4} />
            <line x1={510 + i * 135} y1="434" x2={602 + i * 135} y2="434" stroke={ACCENT} strokeWidth="1.5" opacity={0.4} />
          </g>
        ))}

        <rect x="652" y="560" width="104" height="185" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" rx="4" />
        <circle cx="744" cy="655" r="7" fill={ACCENT} />
        <line x1="704" y1="560" x2="704" y2="745" stroke={ACCENT} strokeWidth="2" opacity={0.3} />

        <g transform={`translate(${personX}, 705)`}>
          <circle cx="0" cy="-132" r="28" fill={WHITE} />
          <rect x="-19" y="-102" width="38" height="72" fill={WHITE} rx="6" />
          <rect x="-15" y="-32" width="13" height="56" fill={WHITE} rx="4" transform="rotate(8,-8,-32)" />
          <rect x="2" y="-32" width="13" height="56" fill={WHITE} rx="4" transform="rotate(-8,8,-32)" />
          <rect x="-33" y="-96" width="11" height="48" fill={WHITE} rx="4" />
          <rect x="22" y="-96" width="11" height="48" fill={WHITE} rx="4" />
        </g>
      </svg>
    </FadeScene>
  );
};

// ─── Scene 2 — The Math: $375 loan → $56 fee → 400% APR stamp ────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const receiptSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const receiptY = interpolate(receiptSpring, [0, 1], [280, 0]);

  const feeDisplay = Math.round(interpolate(frame, [40, 100], [0, 56], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const stampFrame = Math.max(0, frame - 90);
  const stampSpring = spring({ frame: stampFrame, fps, config: { stiffness: 180, damping: 24 } });
  const stampScale = interpolate(stampSpring, [0, 1], [3, 1]);
  const stampOpacity = interpolate(frame, [90, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampRotate = interpolate(stampSpring, [0, 1], [24, -6]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(64, BLACK)}>THE MATH</p>
        <p style={{ fontFamily: FONT, fontSize: 38, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>
          sounds simple at first...
        </p>
      </div>

      <div style={{
        position: 'absolute', top: 360, left: 90, right: 90,
        transform: `translateY(${receiptY}px)`,
        background: WHITE, border: '3px solid #E0E0E0', borderRadius: 20,
        padding: '48px 64px', boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
      }}>
        <div style={{ textAlign: 'center', borderBottom: '2px dashed #DDD', paddingBottom: 28, marginBottom: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#AAA', margin: 0, letterSpacing: '0.12em' }}>LOAN RECEIPT</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, margin: 0 }}>Borrowed</p>
          <p style={{ fontFamily: FONT, fontSize: 52, color: BLACK, margin: 0 }}>$375</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, margin: 0 }}>Term</p>
          <p style={{ fontFamily: FONT, fontSize: 42, color: BLACK, margin: 0 }}>2 WEEKS</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed #DDD', paddingTop: 26, marginBottom: 26 }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, margin: 0 }}>Fee</p>
          <p style={{ fontFamily: FONT, fontSize: 60, color: ACCENT, margin: 0 }}>${feeDisplay}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: 0 }}>You repay</p>
          <p style={{ fontFamily: FONT, fontSize: 48, color: BLACK, margin: 0 }}>$431</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 1160, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: stampOpacity,
        transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
      }}>
        <div style={{ border: `8px solid ${ACCENT}`, borderRadius: 16, padding: '22px 64px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0, letterSpacing: '0.1em' }}>THAT IS</p>
          <p style={headline(88, ACCENT)}>400% APR</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3 — Rollover Trap: 80% can't repay on time ────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calSpring = spring({ frame, fps, config: { stiffness: 65, damping: 22 } });
  const calX = interpolate(calSpring, [0, 1], [-420, 0]);

  const arrowRotation = interpolate(frame, [50, 210], [0, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rolloverScale = 1 + 0.06 * Math.sin(frame * 0.18);

  const rollovers = Math.floor(interpolate(frame, [60, 200], [0, 3.99], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity, padding: '0 60px' }}>
        <p style={headline(72, WHITE)}>NUMBER ONE</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 12 }}>80% CAN'T REPAY</p>
        <p style={{ ...headline(36, WHITE), marginTop: 10 }}>ON THE DUE DATE</p>
      </div>

      <div style={{
        position: 'absolute', top: 540, left: 60,
        transform: `translateX(${calX}px)`,
        background: '#1E1E1E', border: `4px solid ${ACCENT}`, borderRadius: 20,
        padding: '28px 36px', width: 390,
      }}>
        <div style={{ background: ACCENT, borderRadius: 10, padding: '10px 18px', marginBottom: 18, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, letterSpacing: '0.08em' }}>DUE DATE — 14 DAYS</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 7 }}>
          {Array.from({ length: Math.max(0, Math.floor(14)) }, (_, i) => (
            <div key={i} style={{
              background: i === 13 ? ACCENT : '#2A2A2A',
              borderRadius: 7, padding: '7px 0', textAlign: 'center',
              fontFamily: FONT, fontSize: 22,
              color: i === 13 ? BLACK : '#666',
            }}>{i + 1}</div>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: '14px 0 0', textAlign: 'center' }}>
          80% miss this day
        </p>
      </div>

      <div style={{ position: 'absolute', top: 520, right: 50, width: 400 }}>
        <svg width="400" height="400" viewBox="0 0 400 400">
          <g transform={`rotate(${arrowRotation}, 200, 200)`}>
            <circle cx="200" cy="200" r="150" fill="none" stroke={ACCENT} strokeWidth="10" strokeDasharray="85 35" />
            <polygon points="200,46 178,90 222,90" fill={ACCENT} />
            <polygon points="200,46 178,90 222,90" fill={ACCENT} transform="rotate(120,200,200)" />
            <polygon points="200,46 178,90 222,90" fill={ACCENT} transform="rotate(240,200,200)" />
          </g>
          <text x="200" y="182" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="28">PAY THE</text>
          <text x="200" y="228" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="58" fontWeight="bold">$56</text>
          <text x="200" y="268" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="26">AGAIN</text>
        </svg>
        <div style={{ textAlign: 'center', transform: `scale(${rolloverScale})` }}>
          <p style={headline(54, ACCENT)}>ROLLOVER</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '6px 0 0', textAlign: 'center' }}>
            {rollovers}x so far this year
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4 — 8 Loans: stacking docs, fee counter climbs to $521 ────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-100, 0]);

  const visibleDocs = Math.min(8, Math.max(0, Math.floor(interpolate(frame, [30, 180], [0, 8.99], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }))));

  const totalFees = Math.round(interpolate(frame, [30, 185], [0, 521], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center', padding: '0 60px',
      }}>
        <p style={headline(72, BLACK)}>NUMBER TWO</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 12 }}>8 LOANS PER YEAR</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          all chasing the first one
        </p>
      </div>

      <div style={{
        position: 'absolute', top: 490, left: 70, right: 70,
        display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center',
      }}>
        {Array.from({ length: Math.max(0, Math.floor(visibleDocs)) }, (_, i) => (
          <div key={i} style={{
            background: WHITE,
            border: `3px solid ${i === visibleDocs - 1 ? ACCENT : '#CCC'}`,
            borderRadius: 14,
            padding: '16px 22px',
            width: 194,
            textAlign: 'center',
            boxShadow: '0 4px 18px rgba(0,0,0,0.09)',
          }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: 0, letterSpacing: '0.08em' }}>LOAN</p>
            <p style={{ fontFamily: FONT, fontSize: 42, color: i === visibleDocs - 1 ? ACCENT : BLACK, margin: '4px 0' }}>{i + 1}</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', margin: 0 }}>+$56 fee</p>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: ACCENT, paddingTop: 36, paddingBottom: 50, textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          Total fees paid
        </p>
        <p style={headline(100, WHITE)}>${totalFees}</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: 'rgba(255,255,255,0.8)', margin: '6px 0 0', textAlign: 'center' }}>
          original loan was $375
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5 — Who Profits: piggy bank drains into the lender ─────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const profitBillions = Math.round(interpolate(frame, [40, 165], [0, 9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const crackLen = interpolate(frame, [30, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const moneyX = interpolate(frame, [50, 200], [280, 740], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyOpacity = interpolate(frame, [50, 70, 185, 205], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bankScale = interpolate(frame, [40, 160], [0.85, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity, padding: '0 60px' }}>
        <p style={headline(72, WHITE)}>NUMBER THREE</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 12 }}>WHO PROFITS?</p>
      </div>

      <svg width="1080" height="960" viewBox="0 0 1080 960" style={{ position: 'absolute', top: 350, left: 0 }}>
        {/* Piggy bank */}
        <g transform="translate(200, 280)">
          <ellipse cx="0" cy="0" rx="145" ry="122" fill="#FFAAAA" />
          <circle cx="120" cy="-62" r="72" fill="#FFAAAA" />
          <ellipse cx="162" cy="-52" rx="30" ry="22" fill="#FF8888" />
          <circle cx="154" cy="-55" r="7" fill="#CC4444" />
          <circle cx="170" cy="-55" r="7" fill="#CC4444" />
          <circle cx="122" cy="-80" r="9" fill={BLACK} />
          <circle cx="124" cy="-82" r="3" fill={WHITE} />
          <ellipse cx="92" cy="-118" rx="17" ry="24" fill="#FFAAAA" />
          <rect x="-14" y="-122" width="28" height="11" fill={BLACK} rx="3" />
          <rect x="-105" y="92" width="34" height="48" fill="#FFAAAA" rx="8" />
          <rect x="-50" y="97" width="34" height="43" fill="#FFAAAA" rx="8" />
          <rect x="16" y="97" width="34" height="43" fill="#FFAAAA" rx="8" />
          <rect x="71" y="92" width="34" height="48" fill="#FFAAAA" rx="8" />
          <line x1="-25" y1="10" x2={-25 + 90 * crackLen} y2={60 * crackLen} stroke={ACCENT} strokeWidth="4" opacity={crackLen} />
          <line x1="-25" y1="10" x2={-25 - 45 * crackLen} y2={42 * crackLen} stroke={ACCENT} strokeWidth="3" opacity={crackLen} />
        </g>

        {/* Money stream arrow */}
        <text x={moneyX} y="330" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="50" opacity={moneyOpacity} fontWeight="bold">$$$</text>
        <line x1="360" y1="355" x2="720" y2="355" stroke={ACCENT} strokeWidth="3" strokeDasharray="22 10" opacity={0.6} />
        <polygon points="740,355 710,340 710,370" fill={ACCENT} />

        {/* Bank building */}
        <g transform={`translate(860, 120) scale(${bankScale})`} style={{ transformOrigin: '0px 200px' }}>
          <rect x="-110" y="0" width="230" height="340" fill="#1C1C1C" stroke={ACCENT} strokeWidth="3" />
          <polygon points="-130,0 150,0 10,-90" fill="#252525" stroke={ACCENT} strokeWidth="2" />
          {[-78, -38, 2, 42, 82].map((x) => (
            <rect key={x} x={x} y="18" width="18" height="300" fill="#2A2A2A" rx="3" />
          ))}
          <text x="10" y="390" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="26" letterSpacing="2">LENDER</text>
        </g>

        {/* Profit counter */}
        <text x="540" y="640" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="38" letterSpacing="4">INDUSTRY PROFIT</text>
        <text x="540" y="740" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="96" fontWeight="bold">${profitBillions}B / YEAR</text>
        <text x="540" y="810" textAnchor="middle" fill="#666" fontFamily={FONT} fontSize="30">built on borrowers who can't escape the cycle</text>
      </svg>
    </FadeScene>
  );
};

// ─── Scene 6 — CTA: Credit union 18% APR vs payday 400% APR ─────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({ frame, fps, config: { stiffness: 60, damping: 22 } });
  const leftX = interpolate(leftSpring, [0, 1], [-520, 0]);

  const rightSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { stiffness: 60, damping: 22 } });
  const rightX = interpolate(rightSpring, [0, 1], [520, 0]);

  const checkScale = spring({ frame: Math.max(0, frame - 95), fps, config: { stiffness: 160, damping: 22 } });
  const checkOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { stiffness: 60, damping: 22 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [120, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(58, BLACK)}>THERE'S AN ALTERNATIVE</p>
        <p style={{ fontFamily: FONT, fontSize: 36, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          before you walk through that door
        </p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 50, right: 50, display: 'flex', gap: 26 }}>
        {/* Payday Loan — bad */}
        <div style={{
          flex: 1, border: `5px solid ${ACCENT}`, borderRadius: 22,
          padding: '38px 28px', textAlign: 'center', background: '#FFF5F5',
          transform: `translateX(${leftX}px)`,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Payday Loan</p>
          <p style={headline(86, ACCENT)}>400%</p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0 }}>APR</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#999', marginTop: 14 }}>$56 fee on $375</p>
          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="34" fill={ACCENT} />
              <line x1="20" y1="20" x2="56" y2="56" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
              <line x1="56" y1="20" x2="20" y2="56" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Credit Union — good */}
        <div style={{
          flex: 1, border: `5px solid ${GREEN}`, borderRadius: 22,
          padding: '38px 28px', textAlign: 'center', background: '#F0FFF8',
          transform: `translateX(${rightX}px)`,
          opacity: checkOpacity,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Credit Union</p>
          <p style={headline(86, GREEN)}>18%</p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: GREEN, margin: 0 }}>APR</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#999', marginTop: 14 }}>same $375</p>
          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', transform: `scale(${checkScale})` }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="34" fill={GREEN} />
              <polyline points="18,40 32,54 58,24" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 80, left: 50, right: 50,
        transform: `translateY(${ctaY}px)`,
        background: BLACK, borderRadius: 22, padding: '38px 48px', textAlign: 'center',
      }}>
        <p style={headline(34, WHITE)}>SEARCH "EMERGENCY LOAN</p>
        <p style={{ ...headline(34, ACCENT), marginTop: 8 }}>CREDIT UNION" FIRST</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#888', marginTop: 14, textAlign: 'center' }}>
          400% vs 18% — the difference is $502 saved
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────

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
