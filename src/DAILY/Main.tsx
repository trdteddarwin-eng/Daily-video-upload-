import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

// ─── SCENE 1 ─────────────────────────────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 40], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Piggy bank spring-in
  const pigScale = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 120 } });

  // Three bucket labels appear sequentially
  const bucket1Op = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bucket2Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bucket3Op = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Coin fill animations
  const fill1 = interpolate(frame, [80, 160], [0, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fill2 = interpolate(frame, [90, 150], [0, 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fill3 = interpolate(frame, [100, 145], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(48, WHITE)}>YOUR BRAIN</p>
        <p style={headline(48, ACCENT)}>HAS BUCKETS</p>
      </div>

      {/* Central piggy bank SVG */}
      <div style={{
        position: 'absolute', top: 680, left: '50%',
        transform: `translateX(-50%) scale(${pigScale})`,
        transformOrigin: 'center',
      }}>
        <svg width="200" height="180" viewBox="0 0 200 180">
          {/* Body */}
          <ellipse cx="95" cy="110" rx="75" ry="60" fill="#2a1a00" stroke={ACCENT} strokeWidth="3" />
          {/* Head */}
          <circle cx="160" cy="85" r="38" fill="#2a1a00" stroke={ACCENT} strokeWidth="3" />
          {/* Ear */}
          <ellipse cx="148" cy="52" rx="12" ry="16" fill="#2a1a00" stroke={ACCENT} strokeWidth="2" />
          <ellipse cx="148" cy="52" rx="6" ry="9" fill={ACCENT} opacity="0.4" />
          {/* Eye */}
          <circle cx="172" cy="78" r="5" fill={ACCENT} />
          <circle cx="173" cy="77" r="2" fill={BG_DARK} />
          {/* Nostril */}
          <ellipse cx="185" cy="92" rx="10" ry="7" fill="#1a0e00" stroke={ACCENT} strokeWidth="2" />
          <circle cx="182" cy="92" r="2.5" fill={ACCENT} opacity="0.6" />
          <circle cx="188" cy="92" r="2.5" fill={ACCENT} opacity="0.6" />
          {/* Coin slot */}
          <rect x="80" y="52" width="28" height="6" rx="3" fill={ACCENT} opacity="0.8" />
          {/* Legs */}
          {[30, 55, 105, 130].map((x, i) => (
            <rect key={i} x={x} y="158" width="18" height="20" rx="5" fill="#2a1a00" stroke={ACCENT} strokeWidth="2" />
          ))}
          {/* Tail */}
          <path d="M22 100 Q10 85 18 70 Q26 55 20 45" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bucket 1 — BONUS */}
      <div style={{ position: 'absolute', top: 440, left: 80, opacity: bucket1Op }}>
        <svg width="140" height="120" viewBox="0 0 140 120">
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill="#1a1000" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="25" y="18" width="90" height="18" rx="4" fill={ACCENT} opacity="0.8" />
          {/* Fill */}
          <clipPath id="clip1">
            <rect x="12" y={110 - fill1} width="116" height={fill1} />
          </clipPath>
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill={ACCENT} opacity="0.35" clipPath="url(#clip1)" />
        </svg>
        <p style={{ ...headline(22, ACCENT), marginTop: -8 }}>BONUS</p>
      </div>

      {/* Bucket 2 — PAYCHECK */}
      <div style={{ position: 'absolute', top: 500, left: '50%', transform: 'translateX(-50%)', opacity: bucket2Op }}>
        <svg width="140" height="120" viewBox="0 0 140 120">
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill="#0a0a0a" stroke="#aaaaaa" strokeWidth="2.5" />
          <rect x="25" y="18" width="90" height="18" rx="4" fill="#888" opacity="0.8" />
          <clipPath id="clip2">
            <rect x="12" y={110 - fill2} width="116" height={fill2} />
          </clipPath>
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill="#888" opacity="0.3" clipPath="url(#clip2)" />
        </svg>
        <p style={{ ...headline(20, '#aaaaaa'), marginTop: -8 }}>PAYCHECK</p>
      </div>

      {/* Bucket 3 — GIFT */}
      <div style={{ position: 'absolute', top: 440, right: 80, opacity: bucket3Op }}>
        <svg width="140" height="120" viewBox="0 0 140 120">
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill="#001a0a" stroke={GREEN} strokeWidth="2.5" />
          <rect x="25" y="18" width="90" height="18" rx="4" fill={GREEN} opacity="0.8" />
          <clipPath id="clip3">
            <rect x="12" y={110 - fill3} width="116" height={fill3} />
          </clipPath>
          <path d="M20 30 L10 110 L130 110 L120 30 Z" fill={GREEN} opacity="0.35" clipPath="url(#clip3)" />
        </svg>
        <p style={{ ...headline(22, GREEN), marginTop: -8 }}>GIFT</p>
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 140, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <p style={{ ...headline(30, WHITE), letterSpacing: '0.08em' }}>$6,200/YEAR DRAINED</p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 2 ─────────────────────────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personScale = spring({ frame: frame - 25, fps, config: { damping: 16, stiffness: 110 } });
  const bubbleOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const equalsOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crossOpacity = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nobelOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(44, BLACK)}>MENTAL</p>
        <p style={headline(44, ACCENT)}>ACCOUNTING</p>
      </div>

      {/* Person silhouette */}
      <div style={{
        position: 'absolute', top: 560, left: '50%',
        transform: `translateX(-50%) scale(${personScale})`,
      }}>
        <svg width="120" height="240" viewBox="0 0 120 240">
          {/* Head */}
          <circle cx="60" cy="40" r="36" fill="#333" />
          {/* Body */}
          <rect x="28" y="80" width="64" height="90" rx="10" fill="#333" />
          {/* Arms */}
          <rect x="0" y="85" width="30" height="14" rx="7" fill="#333" />
          <rect x="90" y="85" width="30" height="14" rx="7" fill="#333" />
          {/* Legs */}
          <rect x="30" y="168" width="22" height="65" rx="8" fill="#333" />
          <rect x="68" y="168" width="22" height="65" rx="8" fill="#333" />
        </svg>
      </div>

      {/* Thought bubble */}
      <div style={{
        position: 'absolute', top: 370, left: '50%',
        transform: 'translateX(-18%)',
        opacity: bubbleOpacity,
      }}>
        <svg width="380" height="200" viewBox="0 0 380 200">
          {/* Bubble outline */}
          <ellipse cx="190" cy="90" rx="175" ry="80" fill="white" stroke="#ccc" strokeWidth="2" />
          <circle cx="75" cy="175" r="10" fill="white" stroke="#ccc" strokeWidth="2" />
          <circle cx="55" cy="193" r="6" fill="white" stroke="#ccc" strokeWidth="2" />

          {/* BONUS bill */}
          <rect x="20" y="55" width="140" height="72" rx="8" fill="#fff8e1" stroke={ACCENT} strokeWidth="2.5" />
          <text x="90" y="82" fontFamily="Arial Black, Arial" fontSize="13" fill={ACCENT} textAnchor="middle" fontWeight="bold">$1,000</text>
          <text x="90" y="102" fontFamily="Arial Black, Arial" fontSize="11" fill={ACCENT} textAnchor="middle">BONUS</text>
          <rect x="30" y="60" width="120" height="8" rx="2" fill={ACCENT} opacity="0.15" />
          <rect x="30" y="109" width="120" height="8" rx="2" fill={ACCENT} opacity="0.15" />

          {/* Equals sign */}
          <g opacity={equalsOpacity}>
            <rect x="168" y="78" width="44" height="10" rx="4" fill="#999" />
            <rect x="168" y="100" width="44" height="10" rx="4" fill="#999" />
          </g>

          {/* PAYCHECK bill */}
          <rect x="220" y="55" width="140" height="72" rx="8" fill="#f0f0f0" stroke="#aaa" strokeWidth="2.5" />
          <text x="290" y="82" fontFamily="Arial Black, Arial" fontSize="13" fill="#666" textAnchor="middle" fontWeight="bold">$1,000</text>
          <text x="290" y="102" fontFamily="Arial Black, Arial" fontSize="11" fill="#666" textAnchor="middle">PAYCHECK</text>
          <rect x="230" y="60" width="120" height="8" rx="2" fill="#999" opacity="0.15" />
          <rect x="230" y="109" width="120" height="8" rx="2" fill="#999" opacity="0.15" />

          {/* Red X over equals */}
          <g opacity={crossOpacity}>
            <line x1="160" y1="70" x2="212" y2="125" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
            <line x1="212" y1="70" x2="160" y2="125" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Nobel tag */}
      <div style={{
        position: 'absolute', bottom: 160, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: nobelOpacity,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 12, padding: '14px 36px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <p style={{ ...headline(22, BLACK), letterSpacing: '0.1em' }}>RICHARD THALER</p>
          <p style={{ ...headline(18, BLACK), letterSpacing: '0.08em', opacity: 0.8 }}>NOBEL PRIZE 2017</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 3 ─────────────────────────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Left bar (paycheck) drains slowly
  const leftFill = interpolate(frame, [50, 200], [100, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Right bar (bonus) drains 3x faster
  const rightFill = interpolate(frame, [50, 130], [100, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag3xOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Flying dollar signs from right bar
  const dollarCount = Math.max(0, Math.floor(interpolate(frame, [55, 135], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const dollarOffsets = [
    { dx: 80, dy: -30 }, { dx: 140, dy: -80 }, { dx: 60, dy: -120 },
    { dx: 160, dy: -40 }, { dx: 110, dy: -150 }, { dx: 190, dy: -100 },
  ];

  const freePassOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, ACCENT)}>NUMBER ONE</p>
      </div>

      {/* Left — PAYCHECK bar */}
      <div style={{ position: 'absolute', top: 350, left: 100, opacity: labelOpacity }}>
        <p style={{ ...headline(24, '#aaaaaa'), marginBottom: 12 }}>PAYCHECK</p>
        <div style={{
          width: 160, height: 420, background: '#222', borderRadius: 12,
          border: '2.5px solid #555', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${leftFill}%`, background: '#555',
            borderRadius: '0 0 10px 10px',
            transition: 'none',
          }} />
        </div>
        <p style={{ ...headline(22, '#aaaaaa'), marginTop: 12 }}>{Math.round(leftFill)}%</p>
      </div>

      {/* Right — BONUS bar */}
      <div style={{ position: 'absolute', top: 350, right: 100, opacity: labelOpacity }}>
        <p style={{ ...headline(24, ACCENT), marginBottom: 12 }}>BONUS</p>
        <div style={{
          width: 160, height: 420, background: '#1a1000', borderRadius: 12,
          border: `2.5px solid ${ACCENT}`, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${rightFill}%`, background: ACCENT,
            borderRadius: '0 0 10px 10px',
            transition: 'none',
          }} />
        </div>
        <p style={{ ...headline(22, ACCENT), marginTop: 12 }}>{Math.round(rightFill)}%</p>
      </div>

      {/* Flying dollar signs */}
      <div style={{ position: 'absolute', top: 350, right: 100, pointerEvents: 'none' }}>
        {dollarOffsets.slice(0, dollarCount).map((o, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: o.dx,
            top: o.dy,
            opacity: 0.85,
          }}>
            <p style={{ ...headline(28, ACCENT), margin: 0 }}>$</p>
          </div>
        ))}
      </div>

      {/* 3x FASTER badge */}
      <div style={{
        position: 'absolute', top: 820, left: '50%', transform: 'translateX(-50%)',
        opacity: tag3xOpacity,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14, padding: '12px 40px',
        }}>
          <p style={headline(34, BLACK)}>3× FASTER</p>
        </div>
      </div>

      {/* Free pass text */}
      <div style={{
        position: 'absolute', bottom: 150, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: freePassOpacity,
      }}>
        <p style={{ ...headline(26, WHITE), letterSpacing: '0.08em' }}>BRAIN GIVES IT A FREE PASS</p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 4 ─────────────────────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Height = interpolate(frame, [55, 120], [0, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Height = interpolate(frame, [70, 145], [0, 192], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pct1 = Math.round(interpolate(frame, [65, 130], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const pct2 = Math.round(interpolate(frame, [80, 155], [0, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const houseScale = spring({ frame: frame - 150, fps, config: { damping: 14, stiffness: 100 } });
  const insightOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, BLACK)}>NUMBER TWO</p>
      </div>

      {/* Bar charts */}
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 80,
        opacity: chartOpacity,
      }}>
        {/* Bonus bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={headline(44, ACCENT)}>{pct1}%</p>
          <div style={{
            width: 160, height: bar1Height, background: ACCENT,
            borderRadius: '10px 10px 0 0', minHeight: 4,
          }} />
          <p style={{ ...headline(22, BLACK), marginTop: 8 }}>BONUS</p>
          <p style={{ ...headline(18, '#666'), letterSpacing: '0.06em' }}>SAVED</p>
        </div>

        {/* Paycheck bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={headline(44, GREEN)}>{pct2}%</p>
          <div style={{
            width: 160, height: bar2Height, background: GREEN,
            borderRadius: '10px 10px 0 0', minHeight: 4, position: 'relative',
          }}>
            {/* House icon on top */}
            <div style={{
              position: 'absolute', top: -110, left: '50%',
              transform: `translateX(-50%) scale(${houseScale})`,
            }}>
              <svg width="90" height="100" viewBox="0 0 90 100">
                {/* Roof */}
                <polygon points="45,5 85,45 5,45" fill={GREEN} />
                {/* Body */}
                <rect x="12" y="44" width="66" height="52" fill={GREEN} />
                {/* Door */}
                <rect x="33" y="65" width="24" height="31" rx="4" fill="#006644" />
                {/* Window */}
                <rect x="15" y="52" width="20" height="18" rx="3" fill="#006644" />
                <line x1="25" y1="52" x2="25" y2="70" stroke={GREEN} strokeWidth="2" />
                <line x1="15" y1="61" x2="35" y2="61" stroke={GREEN} strokeWidth="2" />
                {/* Window right */}
                <rect x="55" y="52" width="20" height="18" rx="3" fill="#006644" />
                <line x1="65" y1="52" x2="65" y2="70" stroke={GREEN} strokeWidth="2" />
                <line x1="55" y1="61" x2="75" y2="61" stroke={GREEN} strokeWidth="2" />
              </svg>
            </div>
          </div>
          <p style={{ ...headline(22, BLACK), marginTop: 8 }}>PAYCHECK</p>
          <p style={{ ...headline(18, '#666'), letterSpacing: '0.06em' }}>SAVED</p>
        </div>
      </div>

      {/* Baseline */}
      <div style={{
        position: 'absolute', top: 775, left: 100, right: 100,
        height: 4, background: '#ccc', borderRadius: 2, opacity: chartOpacity,
      }} />

      {/* Insight */}
      <div style={{
        position: 'absolute', bottom: 140, left: 40, right: 40,
        opacity: insightOpacity, display: 'flex', justifyContent: 'center',
      }}>
        <div style={{ background: '#111', borderRadius: 14, padding: '16px 32px' }}>
          <p style={{ ...headline(24, WHITE), letterSpacing: '0.07em' }}>SAME MONEY. DIFFERENT FATE.</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 5 ─────────────────────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bucketScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 115 } });
  const giftCardOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cashOpacity = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const guiltOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOpacity = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, BLACK)}>NUMBER THREE</p>
      </div>

      {/* Central bucket */}
      <div style={{
        position: 'absolute', top: 460, left: '50%',
        transform: `translateX(-50%) scale(${bucketScale})`,
      }}>
        <svg width="220" height="180" viewBox="0 0 220 180">
          <path d="M30 40 L15 165 L205 165 L190 40 Z" fill="#fff8e1" stroke={ACCENT} strokeWidth="3" />
          <rect x="38" y="24" width="144" height="22" rx="5" fill={ACCENT} />
          {/* Fill glow */}
          <path d="M30 40 L15 165 L205 165 L190 40 Z" fill={ACCENT} opacity="0.18" />
          <text x="110" y="100" fontFamily="Arial Black, Arial" fontSize="14" fill={ACCENT} textAnchor="middle" fontWeight="bold">FUN MONEY</text>
          <text x="110" y="122" fontFamily="Arial Black, Arial" fontSize="11" fill={ACCENT} textAnchor="middle">NO RULES</text>
        </svg>
      </div>

      {/* Gift card flying in */}
      <div style={{
        position: 'absolute', top: 340, left: 120,
        opacity: giftCardOpacity,
        transform: `translateY(${interpolate(frame, [50, 75], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
      }}>
        <svg width="130" height="85" viewBox="0 0 130 85">
          <rect x="0" y="0" width="130" height="85" rx="10" fill="#4f46e5" />
          <rect x="0" y="28" width="130" height="4" fill="white" opacity="0.3" />
          <rect x="12" y="50" width="60" height="10" rx="3" fill="white" opacity="0.5" />
          <text x="65" y="20" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle" opacity="0.9">GIFT CARD</text>
          <text x="65" y="72" fontFamily="Arial Black" fontSize="14" fill="white" textAnchor="middle">$100</text>
        </svg>
      </div>

      {/* Cash bills flying in */}
      <div style={{
        position: 'absolute', top: 330, right: 110,
        opacity: cashOpacity,
        transform: `translateY(${interpolate(frame, [70, 95], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
      }}>
        <svg width="110" height="70" viewBox="0 0 110 70">
          <rect x="8" y="8" width="100" height="60" rx="6" fill="#1a5c2e" />
          <rect x="0" y="0" width="100" height="60" rx="6" fill="#2e7d46" />
          <circle cx="50" cy="30" r="16" fill="#1a5c2e" />
          <text x="50" y="35" fontFamily="Arial Black" fontSize="14" fill="#2e7d46" textAnchor="middle">$</text>
          <rect x="8" y="8" width="84" height="6" rx="2" fill="#1a5c2e" opacity="0.4" />
          <rect x="8" y="46" width="84" height="6" rx="2" fill="#1a5c2e" opacity="0.4" />
        </svg>
      </div>

      {/* Guilt-o-meter */}
      <div style={{
        position: 'absolute', top: 690, left: '50%', transform: 'translateX(-50%)',
        opacity: guiltOpacity,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={headline(22, BLACK)}>GUILT LEVEL</p>
          <div style={{
            width: 260, height: 26, background: '#ddd', borderRadius: 13, overflow: 'hidden',
          }}>
            <div style={{ width: '2%', height: '100%', background: GREEN, borderRadius: 13 }} />
          </div>
          <p style={headline(20, GREEN)}>ZERO</p>
        </div>
      </div>

      {/* 73% badge + X */}
      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center',
        opacity: pctOpacity,
      }}>
        <div style={{ background: ACCENT, borderRadius: 12, padding: '12px 32px' }}>
          <p style={headline(30, BLACK)}>73% OF PEOPLE</p>
        </div>
        <p style={headline(26, BLACK)}>DO THIS</p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 6 ─────────────────────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const arrowProgress = interpolate(frame, [45, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankScale = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 110 } });

  // Countdown: 72 → 0 over frames 100–190
  const countdown = Math.round(interpolate(frame, [100, 190], [72, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const countdownOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggyScale = spring({ frame: frame - 185, fps, config: { damping: 12, stiffness: 120 } });
  const savedOpacity = interpolate(frame, [190, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [205, 225], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(44, WHITE)}>THE FIX</p>
        <p style={headline(44, ACCENT)}>IS SIMPLE</p>
      </div>

      {/* Check / bonus icon on left */}
      <div style={{ position: 'absolute', top: 360, left: 80 }}>
        <svg width="130" height="95" viewBox="0 0 130 95">
          <rect x="0" y="10" width="130" height="80" rx="10" fill="#1a1a1a" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="0" y="35" width="130" height="4" fill={ACCENT} opacity="0.3" />
          <text x="65" y="28" fontFamily="Arial" fontSize="11" fill={ACCENT} textAnchor="middle" opacity="0.8">BONUS CHECK</text>
          <text x="65" y="68" fontFamily="Arial Black" fontSize="18" fill={ACCENT} textAnchor="middle">$1,000</text>
          <rect x="10" y="75" width="50" height="8" rx="3" fill={ACCENT} opacity="0.2" />
          <rect x="70" y="75" width="50" height="8" rx="3" fill={ACCENT} opacity="0.2" />
        </svg>
      </div>

      {/* Arrow */}
      <svg width="200" height="60" viewBox="0 0 200 60" style={{
        position: 'absolute', top: 390, left: '50%', transform: 'translateX(-50%)',
        opacity: arrowProgress,
      }}>
        <line x1="10" y1="30" x2={10 + 160 * arrowProgress} y2="30"
          stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
        {arrowProgress > 0.85 && (
          <>
            <line x1="170" y1="30" x2="145" y2="10" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <line x1="170" y1="30" x2="145" y2="50" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </>
        )}
      </svg>

      {/* Bank icon */}
      <div style={{
        position: 'absolute', top: 340, right: 60,
        transform: `scale(${bankScale})`, transformOrigin: 'center',
      }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Base */}
          <rect x="8" y="100" width="124" height="18" rx="4" fill="#1a1a2e" stroke="#3B82F6" strokeWidth="2.5" />
          {/* Columns */}
          {[22, 48, 74, 100].map((x, i) => (
            <rect key={i} x={x} y="45" width="16" height="58" rx="3" fill="#1a1a2e" stroke="#3B82F6" strokeWidth="2" />
          ))}
          {/* Roof */}
          <polygon points="70,5 130,42 10,42" fill="#1a1a2e" stroke="#3B82F6" strokeWidth="2.5" />
          {/* Dollar sign */}
          <text x="70" y="30" fontFamily="Arial Black" fontSize="18" fill="#3B82F6" textAnchor="middle">$</text>
          {/* Steps */}
          <rect x="4" y="118" width="132" height="12" rx="3" fill="#1a1a2e" stroke="#3B82F6" strokeWidth="2" />
          <rect x="0" y="128" width="140" height="12" rx="3" fill="#1a1a2e" stroke="#3B82F6" strokeWidth="2" />
        </svg>
      </div>

      {/* Countdown timer */}
      <div style={{
        position: 'absolute', top: 530, left: '50%', transform: 'translateX(-50%)',
        opacity: countdownOpacity,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        <p style={{ ...headline(22, '#888'), letterSpacing: '0.1em' }}>WAIT</p>
        <p style={{ ...headline(80, ACCENT), lineHeight: 1 }}>{countdown}</p>
        <p style={{ ...headline(22, '#888'), letterSpacing: '0.1em' }}>HOURS</p>
      </div>

      {/* Piggy bank fill */}
      <div style={{
        position: 'absolute', top: 720, left: '50%',
        transform: `translateX(-50%) scale(${piggyScale})`,
        opacity: piggyScale > 0.05 ? 1 : 0,
      }}>
        <svg width="160" height="140" viewBox="0 0 160 140">
          <ellipse cx="75" cy="88" rx="58" ry="46" fill="#1a1000" stroke={ACCENT} strokeWidth="3" />
          <circle cx="126" cy="65" r="29" fill="#1a1000" stroke={ACCENT} strokeWidth="3" />
          <ellipse cx="116" cy="43" rx="9" ry="12" fill="#1a1000" stroke={ACCENT} strokeWidth="2" />
          <ellipse cx="116" cy="43" rx="4" ry="6" fill={ACCENT} opacity="0.4" />
          <circle cx="135" cy="59" r="4" fill={ACCENT} />
          <ellipse cx="147" cy="71" rx="8" ry="5" fill="#120a00" stroke={ACCENT} strokeWidth="1.5" />
          <rect x="64" y="42" width="22" height="5" rx="2.5" fill={ACCENT} opacity="0.8" />
          {[20, 38, 80, 98].map((x, i) => (
            <rect key={i} x={x} y="122" width="14" height="16" rx="4" fill="#1a1000" stroke={ACCENT} strokeWidth="1.5" />
          ))}
          {/* Fill glow */}
          <ellipse cx="75" cy="88" rx="58" ry="46" fill={ACCENT} opacity="0.12" />
        </svg>
      </div>

      {/* $6,200 SAVED */}
      <div style={{
        position: 'absolute', bottom: 170, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: savedOpacity,
      }}>
        <div style={{ background: ACCENT, borderRadius: 14, padding: '14px 40px' }}>
          <p style={headline(34, BLACK)}>$6,200 SAVED</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: ctaOpacity,
      }}>
        <p style={{ ...headline(22, WHITE), letterSpacing: '0.08em' }}>FOLLOW FOR MORE MONEY PSYCHOLOGY</p>
      </div>
    </FadeScene>
  );
};

// ─── EXPORT ──────────────────────────────────────────────────────────────────
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
