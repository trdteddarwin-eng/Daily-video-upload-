import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#FFF5F5';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.10em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.2,
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

  const titleY = interpolate(frame, [8, 32], [70, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 32], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const cartScale = spring({ frame, fps, from: 0.3, to: 1, config: { damping: 13, stiffness: 100 }, delay: 18 });

  const x1o = interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x2o = interpolate(frame, [72, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x3o = interpolate(frame, [89, 102], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 190, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={headline(60, WHITE)}>YOU THINK YOU'RE</p>
        <p style={{ ...headline(60, ACCENT), marginTop: 8 }}>BAD AT SHOPPING.</p>
        <p style={{ ...headline(40, WHITE), marginTop: 18, opacity: 0.65 }}>YOU'RE NOT.</p>
      </div>

      <div style={{
        position: 'absolute', top: 530, left: 0, right: 0,
        display: 'flex', justifyContent: 'center' as const,
        transform: `scale(${cartScale})`,
      }}>
        <svg width="310" height="290" viewBox="0 0 310 290">
          {/* Handle */}
          <polyline points="18,18 38,52 60,95" fill="none" stroke={WHITE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Cart body */}
          <path d="M60,95 L260,95 L240,205 L80,205 Z" fill="none" stroke={WHITE} strokeWidth="9" strokeLinejoin="round"/>
          {/* Wheels */}
          <circle cx="100" cy="245" r="22" fill="none" stroke={WHITE} strokeWidth="8"/>
          <circle cx="215" cy="245" r="22" fill="none" stroke={WHITE} strokeWidth="8"/>

          {/* Apple */}
          <circle cx="115" cy="148" r="28" fill={ACCENT}/>
          <rect x="113" y="116" width="5" height="14" rx="2" fill={GREEN}/>
          <g opacity={x1o}>
            <line x1="96" y1="128" x2="134" y2="168" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
            <line x1="134" y1="128" x2="96" y2="168" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
          </g>

          {/* Bread loaf */}
          <ellipse cx="168" cy="143" rx="30" ry="20" fill={AMBER}/>
          <rect x="138" y="155" width="60" height="30" rx="8" fill="#D97706"/>
          <g opacity={x2o}>
            <line x1="140" y1="126" x2="197" y2="183" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
            <line x1="197" y1="126" x2="140" y2="183" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
          </g>

          {/* Milk jug */}
          <rect x="215" y="128" width="30" height="15" rx="5" fill={WHITE}/>
          <rect x="210" y="143" width="40" height="46" rx="7" fill={WHITE}/>
          <text x="230" y="173" fontFamily={FONT} fontSize="12" fill={BLACK} textAnchor="middle">MILK</text>
          <g opacity={x3o}>
            <line x1="210" y1="128" x2="250" y2="189" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
            <line x1="250" y1="128" x2="210" y2="189" stroke="#FF0000" strokeWidth="7" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 210, left: 0, right: 0,
        opacity: subOp, padding: '0 80px',
      }}>
        <p style={{ ...headline(35, WHITE), textTransform: 'none', letterSpacing: '0.04em' }}>
          Stores design what you're
        </p>
        <p style={{ ...headline(35, ACCENT), textTransform: 'none', letterSpacing: '0.04em', marginTop: 6 }}>
          about to throw away.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [8, 30], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const eatenH = interpolate(frame, [30, 100], [0, 360], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const wastedH = interpolate(frame, [45, 115], [0, 240], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const dollarCount = Math.floor(interpolate(frame, [75, 190], [0, 1600], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  const labelOp = interpolate(frame, [110, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={headline(48, BLACK)}>THE AVERAGE FAMILY</p>
        <p style={{ ...headline(48, BLACK), marginTop: 6 }}>WASTES</p>
      </div>

      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, textAlign: 'center' as const }}>
        <p style={{ fontFamily: FONT, fontSize: 128, color: ACCENT, margin: 0, letterSpacing: '-0.02em' }}>
          ${dollarCount.toLocaleString()}
        </p>
        <p style={{ ...headline(42, BLACK), opacity: 0.8 }}>PER YEAR IN FOOD</p>
      </div>

      <div style={{ position: 'absolute', top: 680, left: 0, right: 0, display: 'flex', justifyContent: 'center' as const }}>
        <svg width="480" height="430" viewBox="0 0 480 430">
          {/* Eaten bar */}
          <rect x="60" y={400 - eatenH} width="140" height={eatenH} rx="10" fill={GREEN}/>
          <text x="130" y={Math.max(30, 392 - eatenH)} fontFamily={FONT} fontSize="30" fill={GREEN} textAnchor="middle" fontWeight="bold">60%</text>
          <text x="130" y="425" fontFamily={FONT} fontSize="22" fill={BLACK} textAnchor="middle">EATEN</text>
          {/* Wasted bar */}
          <rect x="275" y={400 - wastedH} width="140" height={wastedH} rx="10" fill={ACCENT}/>
          <text x="345" y={Math.max(30, 392 - wastedH)} fontFamily={FONT} fontSize="30" fill={ACCENT} textAnchor="middle" fontWeight="bold">40%</text>
          <text x="345" y="425" fontFamily={FONT} fontSize="22" fill={BLACK} textAnchor="middle">WASTED</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, opacity: labelOp, padding: '0 70px' }}>
        <p style={{ ...headline(32, BLACK), opacity: 0.7 }}>And stores made sure of it.</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [8, 30], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const c1s = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 }, delay: 30 });
  const c2s = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 }, delay: 65 });
  const c3s = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 }, delay: 100 });

  const circleScales = [c1s, c2s, c3s];
  const labels = ['BULK\nPACKS', 'LOSS\nLEADERS', 'EXP.\nDATES'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 190, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={headline(66, WHITE)}>STORES USE</p>
        <p style={{ ...headline(66, ACCENT), marginTop: 10 }}>3 TRICKS</p>
        <p style={{ ...headline(36, WHITE), marginTop: 16, opacity: 0.65 }}>to make you overbuy.</p>
      </div>

      <div style={{
        position: 'absolute', top: 680, left: 0, right: 0,
        display: 'flex', justifyContent: 'center' as const,
        gap: '0px',
      }}>
        {([0, 1, 2] as const).map((i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column' as const,
            alignItems: 'center' as const,
            margin: '0 30px',
            transform: `scale(${circleScales[i]})`,
          }}>
            <div style={{
              width: 118, height: 118, borderRadius: '50%',
              background: i === 0 ? ACCENT : '#2a2a2a',
              border: `4px solid ${ACCENT}`,
              display: 'flex', alignItems: 'center' as const, justifyContent: 'center' as const,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 54, color: i === 0 ? WHITE : ACCENT }}>{i + 1}</span>
            </div>
            <p style={{ ...headline(20, WHITE), marginTop: 14, opacity: 0.8, whiteSpace: 'pre-line' as const }}>
              {labels[i]}
            </p>
          </div>
        ))}
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [8, 30], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const smallBagX = interpolate(frame, [22, 52], [-220, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bigBagX = interpolate(frame, [30, 60], [220, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const bar1W = interpolate(frame, [78, 145], [0, 310], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bar2W = interpolate(frame, [93, 160], [0, 186], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const gapOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={{ ...headline(38, ACCENT) }}>TRICK #1</p>
        <p style={{ ...headline(58, BLACK), marginTop: 8 }}>BULK PACKS</p>
      </div>

      <div style={{
        position: 'absolute', top: 370, left: 0, right: 0,
        display: 'flex', justifyContent: 'center' as const,
        alignItems: 'flex-end' as const,
        gap: '50px',
      }}>
        {/* Small bag */}
        <div style={{ transform: `translateX(${smallBagX}px)`, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const }}>
          <svg width="130" height="165" viewBox="0 0 130 165">
            <path d="M20,55 L20,148 Q20,160 32,160 L98,160 Q110,160 110,148 L110,55 Z" fill="#D97706"/>
            <path d="M40,55 Q40,18 65,18 Q90,18 90,55" fill="none" stroke="#92400E" strokeWidth="8" strokeLinecap="round"/>
          </svg>
          <p style={{ ...headline(26, BLACK), marginTop: 8 }}>NORMAL</p>
        </div>

        {/* Big bag */}
        <div style={{ transform: `translateX(${bigBagX}px)`, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const }}>
          <svg width="178" height="222" viewBox="0 0 178 222">
            <path d="M14,68 L14,204 Q14,216 26,216 L152,216 Q164,216 164,204 L164,68 Z" fill={AMBER}/>
            <path d="M42,68 Q42,22 89,22 Q136,22 136,68" fill="none" stroke="#D97706" strokeWidth="10" strokeLinecap="round"/>
            <text x="89" y="152" fontFamily={FONT} fontSize="18" fill={BLACK} textAnchor="middle">CLUB</text>
            <text x="89" y="176" fontFamily={FONT} fontSize="18" fill={BLACK} textAnchor="middle">PACK</text>
          </svg>
          <p style={{ ...headline(26, BLACK), marginTop: 0 }}>BULK</p>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 780, left: 0, right: 0, padding: '0 85px' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' as const, marginBottom: 8 }}>
            <p style={{ ...headline(28, BLACK), textAlign: 'left' as const }}>BOUGHT</p>
            <p style={headline(28, ACCENT)}>+50%</p>
          </div>
          <div style={{ background: '#E5E7EB', borderRadius: 8, height: 26, overflow: 'hidden' as const }}>
            <div style={{ width: bar1W, height: '100%', background: ACCENT, borderRadius: 8 }}/>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' as const, marginBottom: 8 }}>
            <p style={{ ...headline(28, BLACK), textAlign: 'left' as const }}>EATEN</p>
            <p style={headline(28, GREEN)}>+30%</p>
          </div>
          <div style={{ background: '#E5E7EB', borderRadius: 8, height: 26, overflow: 'hidden' as const }}>
            <div style={{ width: bar2W, height: '100%', background: GREEN, borderRadius: 8 }}/>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, opacity: gapOp, padding: '0 70px' }}>
        <p style={headline(36, ACCENT)}>THE GAP = WASTE</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [8, 30], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const storeScale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 14 }, delay: 20 });

  const item1o = interpolate(frame, [88, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2o = interpolate(frame, [108, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3o = interpolate(frame, [128, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [152, 174], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={{ ...headline(38, ACCENT) }}>TRICK #2</p>
        <p style={{ ...headline(56, WHITE), marginTop: 8 }}>LOSS LEADERS</p>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center' as const, transform: `scale(${storeScale})` }}>
        <svg width="580" height="430" viewBox="0 0 580 430">
          {/* Store roof */}
          <polygon points="55,80 290,14 525,80" fill="#0F172A"/>
          {/* Store body */}
          <rect x="75" y="78" width="430" height="300" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3"/>
          {/* Store sign */}
          <rect x="125" y="96" width="330" height="48" rx="5" fill="#3B82F6"/>
          <text x="290" y="128" fontFamily={FONT} fontSize="26" fill={WHITE} textAnchor="middle">GROCERY MART</text>
          {/* Door */}
          <rect x="235" y="258" width="110" height="120" rx="4" fill="#0EA5E9"/>

          {/* Milk icon with SALE */}
          <g transform="translate(106,196)">
            <rect x="0" y="0" width="56" height="22" rx="4" fill={ACCENT}/>
            <text x="28" y="15" fontFamily={FONT} fontSize="13" fill={WHITE} textAnchor="middle">SALE</text>
            <rect x="8" y="22" width="22" height="18" rx="4" fill={WHITE}/>
            <rect x="4" y="40" width="30" height="44" rx="5" fill={WHITE}/>
            <text x="19" y="68" fontFamily={FONT} fontSize="10" fill={BLACK} textAnchor="middle">MILK</text>
          </g>

          {/* Egg carton with SALE */}
          <g transform="translate(424,196)">
            <rect x="-4" y="0" width="56" height="22" rx="4" fill={ACCENT}/>
            <text x="24" y="15" fontFamily={FONT} fontSize="13" fill={WHITE} textAnchor="middle">SALE</text>
            <rect x="0" y="22" width="46" height="32" rx="4" fill="#F5F0E8"/>
            <ellipse cx="10" cy="22" rx="8" ry="9" fill="#F5F0E8"/>
            <ellipse cx="23" cy="20" rx="8" ry="9" fill="#EDE8D0"/>
            <ellipse cx="36" cy="22" rx="8" ry="9" fill="#F5F0E8"/>
          </g>

          {/* Shopping cart with growing items */}
          <g transform="translate(192,282)">
            <polyline points="10,8 18,22 30,44" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round"/>
            <path d="M30,44 L168,44 L156,92 L42,92 Z" fill="none" stroke="#94A3B8" strokeWidth="4"/>
            <circle cx="58" cy="112" r="10" fill="none" stroke="#94A3B8" strokeWidth="4"/>
            <circle cx="145" cy="112" r="10" fill="none" stroke="#94A3B8" strokeWidth="4"/>
            <rect x="44" y="52" width="24" height="28" rx="3" fill={AMBER} opacity={item1o}/>
            <circle cx="90" cy="67" r="15" fill={ACCENT} opacity={item2o}/>
            <rect x="108" y="50" width="42" height="32" rx="4" fill="#A855F7" opacity={item3o}/>
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 155, left: 0, right: 0, opacity: subOp, padding: '0 70px' }}>
        <p style={{ ...headline(33, WHITE), textTransform: 'none', letterSpacing: '0.04em' }}>
          Cheap milk gets you through the door.
        </p>
        <p style={{ ...headline(33, ACCENT), marginTop: 8 }}>6 UNPLANNED ITEMS. ALL PROFIT.</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [8, 30], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pkgScale = spring({ frame, fps, from: 0.4, to: 1, config: { damping: 13 }, delay: 22 });

  const statOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statY = interpolate(frame, [85, 110], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const ctaOp = interpolate(frame, [142, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [142, 168], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        padding: '0 70px',
        transform: `translateY(${titleY}px)`,
        opacity: titleOp,
      }}>
        <p style={{ ...headline(38, ACCENT) }}>TRICK #3</p>
        <p style={{ ...headline(50, BLACK), marginTop: 8 }}>EXPIRATION DATES</p>
        <p style={{ ...headline(30, BLACK), marginTop: 10, opacity: 0.65 }}>AREN'T SAFETY DEADLINES.</p>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center' as const, transform: `scale(${pkgScale})` }}>
        <svg width="260" height="295" viewBox="0 0 260 295">
          {/* Box body */}
          <rect x="20" y="20" width="220" height="255" rx="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3"/>
          {/* Box header */}
          <rect x="20" y="20" width="220" height="60" rx="12" fill="#64748B"/>
          <text x="130" y="58" fontFamily={FONT} fontSize="22" fill={WHITE} textAnchor="middle">CEREAL</text>
          {/* Expiry label */}
          <rect x="32" y="190" width="196" height="62" rx="8" fill={WHITE} stroke={ACCENT} strokeWidth="3"/>
          <text x="130" y="215" fontFamily={FONT} fontSize="15" fill="#6B7280" textAnchor="middle">BEST BY</text>
          <text x="130" y="243" fontFamily={FONT} fontSize="22" fill={BLACK} textAnchor="middle">OCT 19, 2026</text>
          {/* Trash can */}
          <g transform="translate(182,88)">
            <rect x="-4" y="10" width="52" height="10" rx="4" fill="#DC2626"/>
            <rect x="2" y="20" width="40" height="46" rx="5" fill={ACCENT}/>
            <line x1="14" y1="8" x2="10" y2="0" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
            <line x1="26" y1="8" x2="30" y2="0" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
            <line x1="14" y1="30" x2="14" y2="56" stroke={WHITE} strokeWidth="3" strokeLinecap="round"/>
            <line x1="22" y1="30" x2="22" y2="56" stroke={WHITE} strokeWidth="3" strokeLinecap="round"/>
            <line x1="30" y1="30" x2="30" y2="56" stroke={WHITE} strokeWidth="3" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 780, left: 0, right: 0, opacity: statOp, transform: `translateY(${statY}px)`, padding: '0 70px' }}>
        <p style={headline(46, ACCENT)}>80 BILLION LBS</p>
        <p style={{ ...headline(30, BLACK), marginTop: 6 }}>WASTED EVERY YEAR</p>
        <p style={{ ...headline(24, BLACK), marginTop: 4, opacity: 0.55 }}>based on a date retailers chose</p>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, opacity: ctaOp, transform: `translateY(${ctaY}px)`, padding: '0 70px' }}>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '26px 36px' }}>
          <p style={{ ...headline(32, WHITE), textTransform: 'none', letterSpacing: '0.05em' }}>
            Track your waste for 7 days.
          </p>
          <p style={{ ...headline(26, WHITE), marginTop: 10, opacity: 0.88 }}>
            Average person saves $800 by year-end.
          </p>
        </div>
      </div>
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
