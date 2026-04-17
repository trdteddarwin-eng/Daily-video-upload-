import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

// ─── Scenes ────────────────────────────────────────────────────────────────

// Scene 1: Piggy bank draining coins — hook scene
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 24], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggySpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 70 } });
  const drainProgress = interpolate(frame, [60, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Coin positions draining out bottom
  const drainedCount = Math.max(0, Math.floor(drainProgress * 6));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 110, width: '100%', textAlign: 'center',
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{ ...headline(62, WHITE), padding: '0 40px' }}>YOUR SAVINGS</h1>
          <h1 style={{ ...headline(62, ACCENT), padding: '0 40px', marginTop: 6 }}>ARE SHRINKING</h1>
          <p style={{ fontFamily: 'Arial,sans-serif', fontSize: 22, color: '#AAAAAA', textAlign: 'center', marginTop: 14, padding: '0 60px', letterSpacing: '0.04em' }}>
            AND YOUR BANK IS COUNTING ON YOU NOT NOTICING
          </p>
        </div>

        {/* Piggy bank SVG */}
        <div style={{
          position: 'absolute', top: 400, left: '50%',
          transform: `translateX(-50%) scale(${piggySpring})`,
        }}>
          <svg width="360" height="340">
            {/* Body */}
            <ellipse cx="180" cy="218" rx="148" ry="116" fill={ACCENT} />
            {/* Coin slot on top */}
            <rect x="154" y="103" width="52" height="14" rx="7" fill="#92400E" />
            {/* Ears */}
            <ellipse cx="60" cy="178" rx="42" ry="32" fill={ACCENT} opacity="0.85" />
            <ellipse cx="300" cy="178" rx="42" ry="32" fill={ACCENT} opacity="0.85" />
            {/* Snout */}
            <ellipse cx="180" cy="248" rx="32" ry="24" fill="#B45309" />
            <circle cx="169" cy="246" r="6" fill={BLACK} />
            <circle cx="191" cy="246" r="6" fill={BLACK} />
            {/* Eyes */}
            <circle cx="144" cy="200" r="12" fill={BLACK} />
            <circle cx="216" cy="200" r="12" fill={BLACK} />
            <circle cx="147" cy="196" r="4" fill={WHITE} />
            <circle cx="219" cy="196" r="4" fill={WHITE} />
            {/* Smile */}
            <path d="M 155 268 Q 180 284 205 268" stroke={BLACK} strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Legs */}
            <rect x="108" y="320" width="26" height="40" rx="13" fill="#B45309" />
            <rect x="144" y="320" width="26" height="40" rx="13" fill="#B45309" />
            <rect x="190" y="320" width="26" height="40" rx="13" fill="#B45309" />
            <rect x="226" y="320" width="26" height="40" rx="13" fill="#B45309" />
            {/* Tail */}
            <path d="M 328 200 Q 352 180 344 210 Q 336 240 356 230" stroke="#B45309" strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Draining coins below piggy */}
        <svg width="1080" height="260" style={{ position: 'absolute', top: 700 }}>
          {Array.from({ length: drainedCount }, (_, i) => {
            const cx = 380 + i * 60;
            const cy = 40 + (i % 3) * 50 + i * 8;
            return (
              <g key={`drain-coin-${i}`}>
                <circle cx={cx} cy={cy} r="20" fill="#B45309" stroke="#92400E" strokeWidth="2" />
                <text x={cx} y={cy + 7} textAnchor="middle" fill={WHITE} fontSize="14" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', bottom: 160, width: '100%', textAlign: 'center', opacity: statOpacity }}>
          <div style={{ display: 'inline-block', background: '#1A1A1A', border: `3px solid ${ACCENT}`, padding: '18px 48px', borderRadius: 16 }}>
            <div style={{ ...headline(22, WHITE), fontFamily: 'Arial,sans-serif' }}>THE MATH THEY HIDE FROM YOU</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Two bar charts — bank 0.06% vs inflation 4%
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankBarProg = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const inflBarProg = interpolate(frame, [60, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapSpring = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 55 } });

  const BASE_Y = 460;
  const MAX_H = 340;
  const bankH = Math.max(2, bankBarProg * MAX_H * 0.015); // 0.06% → very tiny
  const inflH = Math.max(2, inflBarProg * MAX_H);          // 4% → full bar

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>THE GAP</h2>
          <p style={{ ...headline(24, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            YOUR BANK VS INFLATION
          </p>
        </div>

        <div style={{ position: 'absolute', top: 300, left: '50%', transform: `translateX(-50%)` }}>
          <svg width="900" height="520">
            {/* Baseline */}
            <line x1="60" y1={BASE_Y} x2="840" y2={BASE_Y} stroke="#CCCCCC" strokeWidth="3" />

            {/* Bank bar — tiny */}
            <rect x="160" y={BASE_Y - bankH} width="200" height={bankH} rx="8" fill="#94A3B8" />
            <text x="260" y={BASE_Y - bankH - 18} textAnchor="middle" fill="#94A3B8" fontSize="28" fontWeight="bold" fontFamily={FONT} opacity={bankBarProg}>0.06%</text>
            <text x="260" y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="bold" fontFamily={FONT}>YOUR BANK</text>
            <text x="260" y={BASE_Y + 66} textAnchor="middle" fill="#777" fontSize="18" fontFamily="Arial">APY</text>

            {/* Inflation bar — tall */}
            <rect x="540" y={BASE_Y - inflH} width="200" height={inflH} rx="8" fill="#EF4444" />
            <text x="640" y={BASE_Y - inflH - 18} textAnchor="middle" fill="#EF4444" fontSize="28" fontWeight="bold" fontFamily={FONT} opacity={inflBarProg}>~4%</text>
            <text x="640" y={BASE_Y + 38} textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="bold" fontFamily={FONT}>INFLATION</text>
            <text x="640" y={BASE_Y + 66} textAnchor="middle" fill="#777" fontSize="18" fontFamily="Arial">EATING YOUR MONEY</text>

            {/* Gap brace */}
            <line x1="370" y1={BASE_Y - inflH} x2="530" y2={BASE_Y - inflH} stroke={ACCENT} strokeWidth="3" strokeDasharray="10 5" opacity={gapSpring} />
            <text x="450" y={BASE_Y - inflH - 16} textAnchor="middle" fill={ACCENT} fontSize="22" fontWeight="bold" fontFamily={FONT} opacity={gapSpring}>GAP: ~3.94%</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center', opacity: labelOpacity }}>
          <div style={{ display: 'inline-block', background: '#EF4444', padding: '18px 48px', borderRadius: 16 }}>
            <div style={{ ...headline(26, WHITE) }}>EVERY YEAR YOU LOSE GROUND</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: $10k → -$400/year evaporation counter
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stackSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const lossCount = Math.floor(interpolate(frame, [80, 185], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const lossOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinFlyCount = Math.max(0, Math.floor(interpolate(frame, [60, 180], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const badgeSpring = spring({ frame: frame - 170, fps, config: { damping: 9, stiffness: 60 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, WHITE), padding: '0 40px' }}>THE REAL COST</h2>
          <p style={{ ...headline(24, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            $10,000 PARKED AT YOUR BIG BANK
          </p>
        </div>

        {/* Money stack */}
        <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translateX(-50%) scale(${stackSpring})` }}>
          <svg width="400" height="240">
            {/* Bills stacked */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={`bill-${i}`} x={10 + i * 4} y={200 - i * 22} width="320" height="60" rx="8"
                fill={i === 4 ? '#16A34A' : '#15803D'} stroke="#14532D" strokeWidth="2" />
            ))}
            <text x="170" y="198" textAnchor="middle" fill={WHITE} fontSize="32" fontWeight="bold" fontFamily={FONT}>$10,000</text>
          </svg>
        </div>

        {/* Flying coins (losing money) */}
        <svg width="1080" height="300" style={{ position: 'absolute', top: 560 }}>
          {Array.from({ length: coinFlyCount }, (_, i) => {
            const cx = 300 + i * 120;
            const cy = 30 + (i % 2) * 60;
            return (
              <g key={`fly-${i}`}>
                <circle cx={cx} cy={cy} r="22" fill="#B45309" stroke="#92400E" strokeWidth="2" />
                <text x={cx} y={cy + 8} textAnchor="middle" fill={WHITE} fontSize="14" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        {/* Loss counter */}
        <div style={{ position: 'absolute', bottom: 200, width: '100%', textAlign: 'center', opacity: lossOpacity }}>
          <div style={{ ...headline(26, '#888'), fontFamily: 'Arial,sans-serif' }}>PURCHASING POWER LOST PER YEAR</div>
          <div style={{ ...headline(96, '#EF4444'), fontWeight: 900, lineHeight: 1 }}>-${lossCount}</div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', transform: `scale(${badgeSpring})` }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '14px 40px', borderRadius: 40 }}>
            <div style={{ ...headline(22, BLACK) }}>EVERY. SINGLE. YEAR.</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Bank building + magnifying glass on fine print
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const glassX = interpolate(frame, [60, 160], [720, 460], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glassY = interpolate(frame, [60, 160], [300, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const revealOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampSpring = spring({ frame: frame - 168, fps, config: { damping: 8, stiffness: 60 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>BY DESIGN</h2>
          <p style={{ ...headline(22, '#EF4444'), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            BANKS COUNT ON YOU NOT LOOKING
          </p>
        </div>

        {/* Bank building */}
        <div style={{ position: 'absolute', top: 300, left: '50%', transform: `translateX(-50%) scale(${bankSpring})` }}>
          <svg width="780" height="500">
            <rect x="140" y="200" width="500" height="280" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
            <polygon points="90,200 390,60 690,200" fill="#94A3B8" stroke="#64748B" strokeWidth="3" />
            {[175, 255, 335, 415, 495, 575].map((x, i) => (
              <rect key={`col-${i}`} x={x} y="200" width="30" height="280" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            ))}
            <rect x="340" y="340" width="100" height="140" rx="8" fill="#64748B" />
            <rect x="175" y="240" width="80" height="60" rx="4" fill="#93C5FD" opacity="0.7" />
            <rect x="295" y="240" width="80" height="60" rx="4" fill="#93C5FD" opacity="0.7" />
            <rect x="435" y="240" width="80" height="60" rx="4" fill="#93C5FD" opacity="0.7" />
            <rect x="555" y="240" width="80" height="60" rx="4" fill="#93C5FD" opacity="0.7" />
            <text x="390" y="160" textAnchor="middle" fill={WHITE} fontSize="32" fontWeight="bold" fontFamily={FONT}>BANK</text>
            <rect x="155" y="420" width="468" height="50" rx="4" fill={WHITE} stroke="#CBD5E1" strokeWidth="1" />
            <text x="389" y="451" textAnchor="middle" fill="#AAAAAA" fontSize="11" fontFamily="Arial">
              annual percentage yield (apy): 0.06% · terms apply · subject to change
            </text>
          </svg>
        </div>

        {/* Magnifying glass */}
        <svg width="1080" height="900" style={{ position: 'absolute', top: 100 }}>
          <circle cx={glassX} cy={glassY} r="70" fill="rgba(254,215,87,0.18)" stroke={ACCENT} strokeWidth="6" />
          <line x1={glassX + 50} y1={glassY + 50} x2={glassX + 90} y2={glassY + 90} stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
        </svg>

        <div style={{ position: 'absolute', top: 820, left: '50%', transform: 'translateX(-50%)', opacity: revealOpacity, textAlign: 'center', whiteSpace: 'nowrap' }}>
          <div style={{ background: '#FFF9C4', border: `3px solid ${ACCENT}`, padding: '14px 36px', borderRadius: 12 }}>
            <div style={{ fontFamily: 'Arial,sans-serif', fontSize: 20, color: BLACK, fontWeight: 'bold' }}>
              BURIED IN FINE PRINT: <span style={{ color: '#EF4444' }}>0.06% APY</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', transform: `scale(${stampSpring})` }}>
          <div style={{ display: 'inline-block', background: '#EF4444', padding: '16px 44px', borderRadius: 12, border: '5px solid #B91C1C' }}>
            <div style={{ ...headline(28, WHITE) }}>THEY KNOW YOU WON'T SWITCH</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: HYSA vs big bank bar comparison + FDIC shield
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankBarProg = interpolate(frame, [25, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hysaBarProg = interpolate(frame, [55, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fdicSpring = spring({ frame: frame - 148, fps, config: { damping: 10, stiffness: 60 } });
  const multOpacity = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 440;
  const MAX_H = 320;
  const bankH = Math.max(2, bankBarProg * MAX_H * 0.015);
  const hysaH = Math.max(2, hysaBarProg * MAX_H);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, WHITE), padding: '0 40px' }}>THE ALTERNATIVE</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            HIGH-YIELD SAVINGS ACCOUNT
          </p>
        </div>

        <div style={{ position: 'absolute', top: 290, left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="900" height="500">
            <line x1="60" y1={BASE_Y} x2="840" y2={BASE_Y} stroke="#333" strokeWidth="3" />
            <rect x="140" y={BASE_Y - bankH} width="220" height={bankH} rx="8" fill="#475569" />
            <text x="250" y={BASE_Y - bankH - 18} textAnchor="middle" fill="#94A3B8" fontSize="26" fontWeight="bold" fontFamily={FONT} opacity={bankBarProg}>0.06%</text>
            <text x="250" y={BASE_Y + 36} textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>BIG BANK</text>
            <text x="250" y={BASE_Y + 60} textAnchor="middle" fill="#888" fontSize="17" fontFamily="Arial">SAVINGS APY</text>
            <rect x="540" y={BASE_Y - hysaH} width="220" height={hysaH} rx="8" fill={ACCENT} />
            <text x="650" y={BASE_Y - hysaH - 18} textAnchor="middle" fill={ACCENT} fontSize="26" fontWeight="bold" fontFamily={FONT} opacity={hysaBarProg}>4–5%</text>
            <text x="650" y={BASE_Y + 36} textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>HYSA</text>
            <text x="650" y={BASE_Y + 60} textAnchor="middle" fill="#888" fontSize="17" fontFamily="Arial">HIGH-YIELD APY</text>
            <text x="450" y="80" textAnchor="middle" fill={ACCENT} fontSize="28" fontWeight="bold" fontFamily={FONT} opacity={multOpacity}>40–80× MORE YIELD</text>
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 170, left: '50%', transform: `translateX(-50%) scale(${fdicSpring})`,
          textAlign: 'center',
        }}>
          <svg width="260" height="120">
            <path d="M 130 10 L 250 50 L 250 80 Q 250 115 130 118 Q 10 115 10 80 L 10 50 Z" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
            <text x="130" y="58" textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>FDIC</text>
            <text x="130" y="82" textAnchor="middle" fill={WHITE} fontSize="15" fontFamily="Arial">INSURED</text>
            <text x="130" y="104" textAnchor="middle" fill="#86EFAC" fontSize="13" fontFamily="Arial">UP TO $250,000</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 80, width: '100%', textAlign: 'center', opacity: multOpacity }}>
          <div style={{ ...headline(20, '#888'), fontFamily: 'Arial,sans-serif' }}>SAME FDIC PROTECTION · WAY MORE MONEY</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Clock + growing piggy bank + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const piggyScale = interpolate(frame, [40, 140], [0.4, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinCount = Math.max(0, Math.floor(interpolate(frame, [50, 160], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const ctaSpring = spring({ frame: frame - 168, fps, config: { damping: 9, stiffness: 58 } });
  const ctaOpacity = interpolate(frame, [168, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Clock hand angle: sweep from 0 to ~300 degrees over the scene
  const handAngle = interpolate(frame, [20, 155], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rad = (handAngle - 90) * (Math.PI / 180);
  const handX = 80 + 56 * Math.cos(rad);
  const handY = 80 + 56 * Math.sin(rad);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
          <h2 style={{ ...headline(54, BLACK), padding: '0 40px' }}>THE SWITCH</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            10 MINUTES. THAT'S ALL IT TAKES.
          </p>
        </div>

        {/* Clock */}
        <div style={{ position: 'absolute', top: 310, left: 120, transform: `scale(${clockSpring})` }}>
          <svg width="160" height="160">
            <circle cx="80" cy="80" r="74" fill={WHITE} stroke={BLACK} strokeWidth="6" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
              const a = (i * 30 - 90) * (Math.PI / 180);
              return (
                <line key={`tick-${i}`}
                  x1={80 + 60 * Math.cos(a)} y1={80 + 60 * Math.sin(a)}
                  x2={80 + 70 * Math.cos(a)} y2={80 + 70 * Math.sin(a)}
                  stroke={BLACK} strokeWidth={i % 3 === 0 ? 4 : 2} />
              );
            })}
            <line x1="80" y1="80" x2={handX} y2={handY} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <circle cx="80" cy="80" r="6" fill={BLACK} />
            <text x="80" y="126" textAnchor="middle" fill={BLACK} fontSize="14" fontWeight="bold" fontFamily={FONT}>10 MIN</text>
          </svg>
        </div>

        {/* Piggy bank growing */}
        <div style={{ position: 'absolute', top: 370, left: '50%', transform: `translateX(-50%) scale(${piggyScale})` }}>
          <svg width="320" height="290">
            <ellipse cx="160" cy="194" rx="130" ry="100" fill={ACCENT} />
            <rect x="136" y="94" width="48" height="12" rx="6" fill="#92400E" />
            <ellipse cx="52" cy="162" rx="38" ry="28" fill={ACCENT} opacity="0.85" />
            <ellipse cx="268" cy="162" rx="38" ry="28" fill={ACCENT} opacity="0.85" />
            <ellipse cx="160" cy="220" rx="28" ry="20" fill="#B45309" />
            <circle cx="150" cy="218" r="5" fill={BLACK} />
            <circle cx="170" cy="218" r="5" fill={BLACK} />
            <circle cx="128" cy="180" r="10" fill={BLACK} />
            <circle cx="192" cy="180" r="10" fill={BLACK} />
            <circle cx="131" cy="177" r="3" fill={WHITE} />
            <circle cx="195" cy="177" r="3" fill={WHITE} />
            <path d="M 140 240 Q 160 254 180 240" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="100" y="280" width="22" height="34" rx="11" fill="#B45309" />
            <rect x="130" y="280" width="22" height="34" rx="11" fill="#B45309" />
            <rect x="168" y="280" width="22" height="34" rx="11" fill="#B45309" />
            <rect x="198" y="280" width="22" height="34" rx="11" fill="#B45309" />
          </svg>
        </div>

        {/* Raining coins */}
        <svg width="1080" height="300" style={{ position: 'absolute', top: 620 }}>
          {Array.from({ length: coinCount }, (_, i) => {
            const cx = 340 + i * 90;
            const cy = 20 + (i % 3) * 55;
            return (
              <g key={`rain-${i}`}>
                <circle cx={cx} cy={cy} r="22" fill={ACCENT} stroke="#D97706" strokeWidth="2" />
                <text x={cx} y={cy + 8} textAnchor="middle" fill={BLACK} fontSize="15" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        {/* CTA banner */}
        <div style={{
          position: 'absolute', bottom: 80, left: '5%', width: '90%',
          background: ACCENT, padding: '36px 32px', borderRadius: 24, textAlign: 'center',
          opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ ...headline(50, BLACK), fontWeight: 900 }}>START TODAY</div>
          <div style={{ fontFamily: 'Arial,sans-serif', fontSize: 20, color: BLACK, marginTop: 12, letterSpacing: '0.06em' }}>
            SEARCH "HIGH-YIELD SAVINGS" · TAKES 10 MIN
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
