import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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
  lineHeight: 1.3,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Phone grid of subscription icons, coins flying away ────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 24], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 70 } });
  const coinCount = Math.max(0, Math.floor(interpolate(frame, [70, 190], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const statOpacity = interpolate(frame, [155, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const appColors = ['#E50914', '#1DB954', '#0078FF', '#FF9500', '#6441A4', '#00A8FF', '#FF0050', '#FFFC00', '#1877F2', '#FF4500', '#0088CC', '#25D366'];
  const appLabels = ['VID', 'MUS', 'APP', 'FIT', 'GAM', 'VPN', 'SOC', 'POD', 'NEWS', 'STR', 'CLO', 'EAT'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 110, width: '100%', textAlign: 'center',
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{ ...headline(56, WHITE), padding: '0 40px' }}>YOUR SUBSCRIPTIONS</h1>
          <h1 style={{ ...headline(56, ACCENT), padding: '0 40px', marginTop: 6 }}>ARE ROBBING YOU</h1>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: '#AAAAAA', textAlign: 'center', marginTop: 14, padding: '0 60px', letterSpacing: '0.04em' }}>
            YOU CAN PROBABLY ONLY NAME 4 OF THEM
          </p>
        </div>

        {/* Phone with app icon grid */}
        <div style={{
          position: 'absolute', top: 380, left: '50%',
          transform: `translateX(-50%) scale(${phoneSpring})`,
        }}>
          <svg width="340" height="440">
            <rect x="10" y="10" width="320" height="420" rx="40" fill="#1A1A1A" stroke="#444" strokeWidth="3" />
            <rect x="30" y="55" width="280" height="350" rx="8" fill="#0A0A0A" />
            <rect x="130" y="18" width="80" height="10" rx="5" fill="#333" />
            {appColors.map((color, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const x = 48 + col * 90;
              const y = 68 + row * 82;
              return (
                <g key={`app-${i}`}>
                  <rect x={x} y={y} width="62" height="62" rx="14" fill={color} />
                  <text x={x + 31} y={y + 38} textAnchor="middle" fill={WHITE} fontSize="11" fontWeight="bold" fontFamily={FONT}>{appLabels[i]}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Coins flying away */}
        <svg width="1080" height="200" style={{ position: 'absolute', top: 740 }}>
          {Array.from({ length: coinCount }, (_, i) => {
            const cx = 290 + i * 82;
            const cy = 25 + (i % 3) * 44;
            return (
              <g key={`coin-s1-${i}`}>
                <circle cx={cx} cy={cy} r="20" fill={ACCENT} stroke="#059669" strokeWidth="2" />
                <text x={cx} y={cy + 7} textAnchor="middle" fill={BLACK} fontSize="13" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', bottom: 160, width: '100%', textAlign: 'center', opacity: statOpacity }}>
          <div style={{ display: 'inline-block', background: '#1A1A1A', border: `3px solid ${ACCENT}`, padding: '18px 48px', borderRadius: 16 }}>
            <div style={{ ...headline(20, WHITE), fontFamily: 'Arial,sans-serif' }}>12+ SUBSCRIPTIONS · AVERAGE AMERICAN</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Dollar counter ticking to $219/month then $2,628/year ─────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 70 } });
  const monthCount = Math.floor(interpolate(frame, [30, 155], [0, 219], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const yearOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearCount = Math.floor(interpolate(frame, [100, 185], [0, 2628], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const badgeSpring = spring({ frame: frame - 178, fps, config: { damping: 9, stiffness: 58 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>THE TOTAL</h2>
          <p style={{ ...headline(24, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            WHAT YOU'RE ACTUALLY SPENDING
          </p>
        </div>

        {/* Monthly counter box */}
        <div style={{ position: 'absolute', top: 340, left: '50%', transform: `translateX(-50%) scale(${boxSpring})`, textAlign: 'center' }}>
          <div style={{ background: '#F0FDF4', border: `4px solid ${ACCENT}`, borderRadius: 24, padding: '40px 64px' }}>
            <div style={{ fontFamily: 'Arial,sans-serif', fontSize: 24, color: '#555', letterSpacing: '0.08em', marginBottom: 8 }}>PER MONTH</div>
            <div style={{ fontFamily: FONT, fontSize: 110, color: ACCENT, lineHeight: 1, fontWeight: 900 }}>${monthCount}</div>
          </div>
        </div>

        {/* Annual counter */}
        <div style={{ position: 'absolute', top: 720, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', opacity: yearOpacity }}>
          <div style={{ background: WHITE, border: `3px solid #16A34A`, borderRadius: 16, padding: '24px 52px' }}>
            <div style={{ fontFamily: 'Arial,sans-serif', fontSize: 20, color: '#555', letterSpacing: '0.08em' }}>PER YEAR</div>
            <div style={{ fontFamily: FONT, fontSize: 68, color: '#16A34A', lineHeight: 1 }}>${yearCount.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', transform: `scale(${badgeSpring})` }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '16px 44px', borderRadius: 40 }}>
            <div style={{ ...headline(22, BLACK) }}>MOSTLY STUFF YOU BARELY USE</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Side-by-side bar chart — subscriptions wasted vs invested ───────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subBarProg = interpolate(frame, [25, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const invBarProg = interpolate(frame, [60, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumSpring = spring({ frame: frame - 150, fps, config: { damping: 10, stiffness: 55 } });
  const bigNumOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 440;
  const MAX_H = 300;
  const subH = Math.max(2, subBarProg * MAX_H * 0.12);
  const invH = Math.max(2, invBarProg * MAX_H);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, WHITE), padding: '0 40px' }}>THE REAL COST</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            $219/MONTH FOR 30 YEARS AT 7%
          </p>
        </div>

        <div style={{ position: 'absolute', top: 295, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="880" height="530">
            <line x1="60" y1={BASE_Y} x2="820" y2={BASE_Y} stroke="#333" strokeWidth="3" />

            {/* Subscriptions bar — short/wasted */}
            <rect x="140" y={BASE_Y - subH} width="220" height={subH} rx="8" fill="#EF4444" />
            <text x="250" y={BASE_Y - subH - 20} textAnchor="middle" fill="#EF4444" fontSize="24" fontWeight="bold" fontFamily={FONT} opacity={subBarProg}>WASTED</text>
            <text x="250" y={BASE_Y + 38} textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>SUBSCRIPTIONS</text>
            <text x="250" y={BASE_Y + 64} textAnchor="middle" fill="#888" fontSize="16" fontFamily="Arial">$2,628/yr × 30 yrs</text>

            {/* Invested bar — tall */}
            <rect x="520" y={BASE_Y - invH} width="220" height={invH} rx="8" fill={ACCENT} />
            <text x="630" y={BASE_Y - invH - 20} textAnchor="middle" fill={ACCENT} fontSize="24" fontWeight="bold" fontFamily={FONT} opacity={invBarProg}>$265K</text>
            <text x="630" y={BASE_Y + 38} textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>INVESTED @7%</text>
            <text x="630" y={BASE_Y + 64} textAnchor="middle" fill="#888" fontSize="16" fontFamily="Arial">30-year compound return</text>
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 130, width: '100%', textAlign: 'center',
          opacity: bigNumOpacity, transform: `scale(${bigNumSpring})`,
        }}>
          <div style={{ display: 'inline-block', background: '#1A1A1A', border: `3px solid ${ACCENT}`, padding: '20px 52px', borderRadius: 16 }}>
            <div style={{ ...headline(20, WHITE), fontFamily: 'Arial,sans-serif' }}>OPPORTUNITY COST</div>
            <div style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, lineHeight: 1.1, letterSpacing: '0.08em' }}>$265,000</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Credit card + brain / pain-threshold psychology ────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const priceOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainSpring = spring({ frame: frame - 95, fps, config: { damping: 10, stiffness: 60 } });
  const arrowOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampSpring = spring({ frame: frame - 165, fps, config: { damping: 9, stiffness: 60 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>THE TRAP</h2>
          <p style={{ ...headline(22, '#EF4444'), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            ENGINEERED TO BYPASS YOUR BRAIN
          </p>
        </div>

        {/* Credit card */}
        <div style={{ position: 'absolute', top: 310, left: '50%', transform: `translateX(-50%) scale(${cardSpring})` }}>
          <svg width="680" height="400">
            <rect x="70" y="10" width="540" height="320" rx="28" fill="#1E3A5F" stroke="#2563EB" strokeWidth="3" />
            {/* Chip */}
            <rect x="120" y="80" width="70" height="54" rx="8" fill="#FFD700" />
            <line x1="120" y1="107" x2="190" y2="107" stroke="#B8860B" strokeWidth="2" />
            <line x1="155" y1="80" x2="155" y2="134" stroke="#B8860B" strokeWidth="2" />
            {/* Card number */}
            <text x="340" y="188" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="24" fontFamily="Arial" letterSpacing="8">•••• •••• •••• 7749</text>
            {/* Cardholder */}
            <text x="122" y="280" fill="rgba(255,255,255,0.6)" fontSize="18" fontFamily="Arial">CARD HOLDER</text>
            {/* Price badge */}
            <rect x="330" y="230" width="240" height="58" rx="12" fill="#EF4444" opacity={priceOpacity} />
            <text x="450" y="268" textAnchor="middle" fill={WHITE} fontSize="30" fontWeight="bold" fontFamily={FONT} opacity={priceOpacity}>$14.99/mo</text>
          </svg>
        </div>

        {/* Brain */}
        <div style={{ position: 'absolute', top: 690, left: '50%', transform: `translateX(-50%) scale(${brainSpring})` }}>
          <svg width="420" height="170">
            <ellipse cx="210" cy="76" rx="122" ry="66" fill="#F3E8FF" stroke="#A855F7" strokeWidth="3" />
            <path d="M 100 56 Q 135 26 166 48 Q 188 16 216 38 Q 244 8 284 38 Q 316 28 318 58" fill="none" stroke="#A855F7" strokeWidth="3" />
            <path d="M 92 78 Q 80 108 102 128 Q 132 148 162 138" fill="none" stroke="#A855F7" strokeWidth="2" />
            <path d="M 328 78 Q 340 108 318 128 Q 288 148 258 138" fill="none" stroke="#A855F7" strokeWidth="2" />
            <text x="210" y="82" textAnchor="middle" fill="#7C3AED" fontSize="16" fontWeight="bold" fontFamily="Arial">PAIN THRESHOLD</text>
            <text x="210" y="104" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontFamily="Arial">$14.99 = BELOW RADAR</text>
            {/* Arrow from brain to price label */}
            <line x1="210" y1="10" x2="270" y2="-30" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 4" opacity={arrowOpacity} />
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', transform: `scale(${stampSpring})` }}>
          <div style={{ display: 'inline-block', background: '#EF4444', padding: '18px 48px', borderRadius: 14, border: '4px solid #B91C1C' }}>
            <div style={{ ...headline(26, WHITE) }}>NOT AN ACCIDENT. A STRATEGY.</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Bank statement, recurring charges crossed out one by one ────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statementSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const crossCount = Math.max(0, Math.floor(interpolate(frame, [55, 168], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const savingsSpring = spring({ frame: frame - 162, fps, config: { damping: 9, stiffness: 58 } });
  const savingsOpacity = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const charges = [
    { label: 'STREAMING', amount: '$15.99', color: '#E50914' },
    { label: 'MUSIC', amount: '$9.99', color: '#1DB954' },
    { label: 'FITNESS APP', amount: '$19.99', color: '#F97316' },
    { label: 'CLOUD STORAGE', amount: '$2.99', color: '#3B82F6' },
    { label: 'NEWS SITE', amount: '$14.99', color: '#6B7280' },
    { label: 'GAMING', amount: '$14.99', color: '#7C3AED' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, WHITE), padding: '0 40px' }}>THE AUDIT</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            YOUR BANK STATEMENT RIGHT NOW
          </p>
        </div>

        {/* Bank statement */}
        <div style={{ position: 'absolute', top: 300, left: '50%', transform: `translateX(-50%) scale(${statementSpring})` }}>
          <svg width="860" height="490">
            <rect x="20" y="10" width="820" height="468" rx="16" fill="#1A1A1A" stroke="#333" strokeWidth="2" />
            <rect x="20" y="10" width="820" height="58" rx="16" fill="#2A2A2A" />
            <text x="60" y="48" fill="#888" fontSize="18" fontFamily="Arial" fontWeight="bold">RECURRING CHARGES</text>
            <text x="780" y="48" textAnchor="end" fill="#888" fontSize="16" fontFamily="Arial">APR 2026</text>

            {charges.map((charge, i) => {
              const y = 80 + i * 64;
              const isCrossed = i < crossCount;
              return (
                <g key={`charge-${i}`}>
                  <circle cx="60" cy={y + 20} r="14" fill={charge.color} opacity={isCrossed ? 0.35 : 1} />
                  <text x="90" y={y + 27} fill={isCrossed ? '#444' : WHITE} fontSize="20" fontFamily="Arial" fontWeight="bold">{charge.label}</text>
                  <text x="780" y={y + 27} textAnchor="end" fill={isCrossed ? '#444' : '#EF4444'} fontSize="20" fontFamily="Arial" fontWeight="bold">{charge.amount}</text>
                  {isCrossed && (
                    <line x1="38" y1={y + 20} x2="800" y2={y + 20} stroke={ACCENT} strokeWidth="3" opacity="0.8" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 130, width: '100%', textAlign: 'center',
          opacity: savingsOpacity, transform: `scale(${savingsSpring})`,
        }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '20px 52px', borderRadius: 16 }}>
            <div style={{ ...headline(22, BLACK) }}>CUT $80–$120/MONTH · INSTANTLY</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Piggy bank growing, progress bar, CTA ─────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = interpolate(frame, [30, 130], [0.5, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = interpolate(frame, [45, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinCount = Math.max(0, Math.floor(interpolate(frame, [50, 160], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const ctaSpring = spring({ frame: frame - 170, fps, config: { damping: 9, stiffness: 58 } });
  const ctaOpacity = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barPx = Math.max(0, barProgress * 680);
  const barDollars = Math.floor(barProgress * 100000);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>YOUR MOVE</h2>
          <p style={{ ...headline(20, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            $80/MONTH FREED UP = $100K+ IN 30 YEARS
          </p>
        </div>

        {/* Piggy bank */}
        <div style={{ position: 'absolute', top: 340, left: '50%', transform: `translateX(-50%) scale(${piggyScale})` }}>
          <svg width="320" height="300">
            <ellipse cx="160" cy="198" rx="130" ry="100" fill={ACCENT} />
            <rect x="136" y="98" width="48" height="12" rx="6" fill="#047857" />
            <ellipse cx="50" cy="166" rx="38" ry="28" fill={ACCENT} opacity="0.85" />
            <ellipse cx="270" cy="166" rx="38" ry="28" fill={ACCENT} opacity="0.85" />
            <ellipse cx="160" cy="222" rx="28" ry="20" fill="#047857" />
            <circle cx="150" cy="220" r="5" fill={BLACK} />
            <circle cx="170" cy="220" r="5" fill={BLACK} />
            <circle cx="126" cy="180" r="10" fill={BLACK} />
            <circle cx="194" cy="180" r="10" fill={BLACK} />
            <circle cx="129" cy="177" r="3" fill={WHITE} />
            <circle cx="197" cy="177" r="3" fill={WHITE} />
            <path d="M 140 244 Q 160 258 180 244" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="98" y="284" width="22" height="34" rx="11" fill="#047857" />
            <rect x="130" y="284" width="22" height="34" rx="11" fill="#047857" />
            <rect x="168" y="284" width="22" height="34" rx="11" fill="#047857" />
            <rect x="200" y="284" width="22" height="34" rx="11" fill="#047857" />
            <path d="M 290 190 Q 322 170 314 200 Q 306 230 330 220" stroke="#047857" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Coins raining */}
        <svg width="1080" height="200" style={{ position: 'absolute', top: 560 }}>
          {Array.from({ length: coinCount }, (_, i) => {
            const cx = 310 + i * 100;
            const cy = 28 + (i % 2) * 52;
            return (
              <g key={`coin-s6-${i}`}>
                <circle cx={cx} cy={cy} r="22" fill={ACCENT} stroke="#059669" strokeWidth="2" />
                <text x={cx} y={cy + 8} textAnchor="middle" fill={BLACK} fontSize="14" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 662, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="700" height="78">
            <rect x="10" y="18" width="680" height="36" rx="18" fill="#D1FAE5" />
            <rect x="10" y="18" width={barPx} height="36" rx="18" fill={ACCENT} />
            <text x="350" y="43" textAnchor="middle" fill={BLACK} fontSize="19" fontWeight="bold" fontFamily={FONT}>
              {`$${barDollars.toLocaleString()} TOWARD $100K`}
            </text>
          </svg>
        </div>

        {/* CTA banner */}
        <div style={{
          position: 'absolute', bottom: 76, left: '5%', width: '90%',
          background: ACCENT, padding: '32px 32px', borderRadius: 24, textAlign: 'center',
          opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ fontFamily: FONT, fontSize: 48, color: BLACK, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>DO THE AUDIT TODAY</div>
          <div style={{ fontFamily: 'Arial,sans-serif', fontSize: 20, color: BLACK, marginTop: 12, letterSpacing: '0.06em' }}>
            OPEN BANK APP · FILTER RECURRING · CANCEL
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
