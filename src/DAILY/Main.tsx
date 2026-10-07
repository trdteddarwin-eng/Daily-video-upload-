import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

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
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
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

  const tagScale = spring({ frame, fps, config: { damping: 16, stiffness: 70 } });
  const subOp = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [30, 52], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [62, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowPulse = interpolate(frame % 50, [0, 25, 50], [0, -12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const priceStep = Math.floor(frame / 22);
  const priceList = [4.99, 12.49, 8.99, 15.99, 7.49, 13.99];
  const priceIdx = priceStep % priceList.length;
  const currentPrice = priceList[priceIdx];
  const isHighPrice = currentPrice > 9;
  const priceColor = isHighPrice ? '#EF4444' : '#10B981';

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(34, ACCENT), opacity: subOp, transform: `translateY(${subY}px)`, marginBottom: 40 }}>
          SAME ITEM. RIGHT NOW.
        </p>

        <svg width="320" height="360" viewBox="0 0 320 360" style={{ transform: `scale(${tagScale})`, marginBottom: 20 }}>
          <polygon points="160,12 310,82 310,278 160,348 10,278 10,82" fill={ACCENT} />
          <polygon points="160,26 294,90 294,270 160,334 26,270 26,90" fill="none" stroke={WHITE} strokeWidth="3" />
          <circle cx="160" cy="12" r="12" fill={BG_DARK} stroke={ACCENT} strokeWidth="3" />
          <text
            x="160" y="195"
            textAnchor="middle"
            fill={priceColor}
            fontFamily="Arial Black, sans-serif"
            fontSize="74"
            fontWeight="900"
          >
            ${currentPrice.toFixed(2)}
          </text>
          <text
            x="160" y="250"
            textAnchor="middle"
            fill={BG_DARK}
            fontFamily="Arial Black, sans-serif"
            fontSize="24"
          >
            SAME PRODUCT
          </text>
        </svg>

        <svg width="70" height="80" viewBox="0 0 70 80" style={{ transform: `translateY(${arrowPulse}px)`, marginBottom: 32 }}>
          <polygon points="35,0 70,45 48,45 48,80 22,80 22,45 0,45" fill="#EF4444" />
        </svg>

        <p style={{ ...headline(38, WHITE), opacity: bottomOp }}>DYNAMIC PRICING</p>
        <p style={{
          fontFamily: FONT,
          fontSize: 28,
          color: ACCENT,
          textAlign: 'center',
          margin: '12px 0 0',
          opacity: bottomOp,
        }}>
          is watching you shop
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftX = interpolate(frame, [0, 32], [-300, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rightX = interpolate(frame, [0, 32], [300, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const vsOp = interpolate(frame, [35, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftPriceOp = interpolate(frame, [42, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPriceOp = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 92), fps, config: { damping: 14, stiffness: 80 } });
  const statOp = interpolate(frame, [92, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const SeatSVG: React.FC<{ color: string; dark: string }> = ({ color, dark }) => (
    <svg width="156" height="196" viewBox="0 0 156 196">
      <rect x="18" y="8" width="120" height="118" rx="20" fill={color} />
      <rect x="8" y="118" width="140" height="50" rx="14" fill={color} />
      <rect x="0" y="94" width="18" height="58" rx="8" fill={dark} />
      <rect x="138" y="94" width="18" height="58" rx="8" fill={dark} />
      <rect x="28" y="168" width="14" height="28" rx="4" fill={dark} />
      <rect x="114" y="168" width="14" height="28" rx="4" fill={dark} />
      <rect x="48" y="80" width="60" height="6" rx="3" fill="#fff" opacity={0.4} />
    </svg>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '60px 60px',
      }}>
        <p style={{ ...headline(34, BLACK), marginBottom: 48 }}>SAME FLIGHT. SAME SEAT.</p>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, width: '100%', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${leftX}px)` }}>
            <SeatSVG color="#3B82F6" dark="#1D4ED8" />
            <div style={{ background: '#10B981', borderRadius: 50, padding: '14px 28px', marginTop: 16, opacity: leftPriceOp }}>
              <p style={{ ...headline(44, WHITE), margin: 0 }}>$180</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#10B981', marginTop: 10, textAlign: 'center', opacity: leftPriceOp }}>
              TUESDAY BOOKING
            </p>
          </div>

          <div style={{ opacity: vsOp, paddingTop: 80 }}>
            <p style={{ ...headline(38, BLACK) }}>VS</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${rightX}px)` }}>
            <SeatSVG color="#EF4444" dark="#B91C1C" />
            <div style={{ background: '#EF4444', borderRadius: 50, padding: '14px 28px', marginTop: 16, opacity: rightPriceOp }}>
              <p style={{ ...headline(44, WHITE), margin: 0 }}>$520</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#EF4444', marginTop: 10, textAlign: 'center', opacity: rightPriceOp }}>
              FRIDAY BOOKING
            </p>
          </div>
        </div>

        <div style={{
          opacity: statOp, transform: `scale(${statScale})`,
          background: ACCENT, borderRadius: 24, padding: '18px 40px',
        }}>
          <p style={{ ...headline(36, BG_DARK), margin: 0 }}>73% MORE — SAME SEAT</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, marginTop: 24, textAlign: 'center', opacity: statOp }}>
          Airlines built this system in 1983
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const burgerOp = interpolate(frame, [20, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const burgerY = interpolate(frame, [20, 46], [80, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const priceStep = Math.floor(frame / 26);
  const burgerPrices = [5.99, 7.49, 6.99, 8.99, 5.49];
  const burgerPrice = burgerPrices[priceStep % burgerPrices.length];
  const boardPulse = interpolate(frame % 26, [0, 13, 26], [1, 1.04, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = ['McDonald\'s & Wendy\'s', 'Amazon & Grocery Stores', 'Uber & Lyft', 'Concert Tickets'];
  const itemOps = items.map((_, i) =>
    interpolate(frame, [80 + i * 22, 100 + i * 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '120px 80px 60px',
      }}>
        <p style={{ ...headline(38, WHITE), transform: `scale(${titleScale})`, marginBottom: 40 }}>
          NOW EVERYWHERE
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 36, marginBottom: 48,
          opacity: burgerOp, transform: `translateY(${burgerY}px)`,
        }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <ellipse cx="70" cy="36" rx="60" ry="30" fill="#F59E0B" />
            <ellipse cx="70" cy="32" rx="56" ry="26" fill="#D97706" />
            <ellipse cx="48" cy="26" rx="7" ry="5" fill="#92400E" />
            <ellipse cx="72" cy="22" rx="7" ry="5" fill="#92400E" />
            <ellipse cx="94" cy="26" rx="7" ry="5" fill="#92400E" />
            <ellipse cx="70" cy="62" rx="60" ry="9" fill="#16A34A" />
            <rect x="12" y="55" width="116" height="10" rx="4" fill="#FCD34D" />
            <rect x="14" y="63" width="112" height="20" rx="4" fill="#78350F" />
            <ellipse cx="70" cy="100" rx="60" ry="18" fill="#F59E0B" />
            <ellipse cx="70" cy="103" rx="58" ry="16" fill="#D97706" />
          </svg>

          <div style={{
            background: '#1a1a1a', border: `3px solid ${ACCENT}`,
            borderRadius: 16, padding: '18px 28px',
            transform: `scale(${boardPulse})`,
            boxShadow: `0 0 28px ${ACCENT}55`,
          }}>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: 17, color: '#888', margin: '0 0 6px' }}>
              PRICE RIGHT NOW:
            </p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: 54, color: ACCENT, margin: 0, fontWeight: 900 }}>
              ${burgerPrice.toFixed(2)}
            </p>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: 16, color: '#EF4444', margin: '4px 0 0' }}>
              PEAK DEMAND
            </p>
          </div>
        </div>

        {items.map((label, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 18,
            marginBottom: 16, opacity: itemOps[i], width: '100%', maxWidth: 560,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
            <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>{label}</p>
          </div>
        ))}
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 16, stiffness: 60 } });
  const line1Op = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Op = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const serverX = interpolate(frame, [110, 165], [390, 560], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const serverOp = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [168, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pcx = 350;
  const pcy = 290;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '110px 60px 60px',
      }}>
        <p style={{ ...headline(36, BLACK), marginBottom: 20 }}>
          THE ALGORITHM KNOWS YOU
        </p>

        <svg width="700" height="510" viewBox="0 0 700 510">
          {/* Dashed orbit ring */}
          <circle cx={pcx} cy={pcy} r="175" fill="none" stroke="#ccc" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Lines from icons to phone */}
          <line x1="175" y1="116" x2={pcx} y2={pcy} stroke={ACCENT} strokeWidth="2" strokeDasharray="5 5" opacity={line1Op} />
          <line x1="525" y1="116" x2={pcx} y2={pcy} stroke="#3B82F6" strokeWidth="2" strokeDasharray="5 5" opacity={line2Op} />
          <line x1={pcx} y1="465" x2={pcx} y2={pcy} stroke="#EF4444" strokeWidth="2" strokeDasharray="5 5" opacity={line3Op} />

          {/* Phone body */}
          <g transform={`translate(${pcx},${pcy}) scale(${phoneScale})`}>
            <rect x="-44" y="-78" width="88" height="156" rx="14" fill={BLACK} />
            <rect x="-36" y="-68" width="72" height="130" rx="6" fill="#1c1c2e" />
            <rect x="-14" y="-74" width="28" height="8" rx="4" fill="#333" />
            <rect x="-28" y="-50" width="22" height="22" rx="5" fill={ACCENT} />
            <rect x="6" y="-50" width="22" height="22" rx="5" fill="#3B82F6" />
            <rect x="6" y="-22" width="22" height="22" rx="5" fill="#10B981" />
            <rect x="-28" y="-22" width="22" height="22" rx="5" fill="#EF4444" />
          </g>

          {/* Icon 1: Location pin (top-left) */}
          <g transform="translate(175,116)" opacity={line1Op}>
            <circle r="28" fill={ACCENT} />
            <path d="M0,-18 C-12,-18 -12,0 0,18 C12,0 12,-18 0,-18Z" fill="white" />
            <circle cy="-6" r="5" fill={ACCENT} />
          </g>
          <text x="175" y="160" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, sans-serif" fontSize="15" opacity={line1Op}>LOCATION</text>

          {/* Icon 2: Eye / device (top-right) */}
          <g transform="translate(525,116)" opacity={line2Op}>
            <circle r="28" fill="#3B82F6" />
            <ellipse rx="15" ry="9" fill="white" />
            <circle r="5" fill="#1D4ED8" />
            <circle r="2.5" fill="white" />
          </g>
          <text x="525" y="160" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, sans-serif" fontSize="15" opacity={line2Op}>DEVICE</text>

          {/* Icon 3: Shopping cart (bottom) */}
          <g transform="translate(350,465)" opacity={line3Op}>
            <circle r="28" fill="#EF4444" />
            <path d="M-14,-10 L-8,-10 L-4,8 L10,8 L14,-2 L-4,-2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="-1" cy="13" r="2.5" fill="white" />
            <circle cx="8" cy="13" r="2.5" fill="white" />
          </g>
          <text x="350" y="508" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, sans-serif" fontSize="15" opacity={line3Op}>HISTORY</text>

          {/* Arrow to server */}
          <line x1="394" y1={pcy} x2={serverX} y2={pcy} stroke={ACCENT} strokeWidth="3" strokeLinecap="round" opacity={serverOp} />
          <polygon points={`${serverX},${pcy - 10} ${serverX + 16},${pcy} ${serverX},${pcy + 10}`} fill={ACCENT} opacity={serverOp} />

          {/* Server */}
          <g opacity={serverOp}>
            <rect x="578" y={pcy - 52} width="84" height="104" rx="10" fill={ACCENT} />
            <rect x="587" y={pcy - 43} width="66" height="14" rx="3" fill={BLACK} />
            <rect x="587" y={pcy - 23} width="66" height="14" rx="3" fill={BLACK} />
            <rect x="587" y={pcy - 3} width="66" height="14" rx="3" fill={BLACK} />
            <rect x="587" y={pcy + 17} width="66" height="14" rx="3" fill={BLACK} />
            <text x="620" y={pcy + 72} textAnchor="middle" fill={BLACK} fontFamily="Arial Black, sans-serif" fontSize="13">PRICE ENGINE</text>
          </g>
        </svg>

        <p style={{ ...headline(30, BLACK), textAlign: 'center', maxWidth: 680, opacity: bottomOp, marginTop: 0 }}>
          You're not a customer — you're a target
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 70 } });
  const bar1H = interpolate(frame, [28, 90], [0, 140], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bar2H = interpolate(frame, [58, 134], [0, 420], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badgeScale = spring({ frame: Math.max(0, frame - 102), fps, config: { damping: 12, stiffness: 90 } });
  const badgeOp = interpolate(frame, [102, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = interpolate(frame, [144, 214], [0, 2400], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const counterOp = interpolate(frame, [144, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const floorY = 510;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '120px 60px 60px',
      }}>
        <p style={{ ...headline(38, WHITE), transform: `scale(${titleScale})`, marginBottom: 32 }}>
          THE REAL COST
        </p>

        <svg width="600" height="560" viewBox="0 0 600 560">
          <line x1="80" y1="40" x2="80" y2={floorY} stroke="#444" strokeWidth="2" />
          <line x1="80" y1={floorY} x2="540" y2={floorY} stroke="#444" strokeWidth="2" />

          {/* Normal bar */}
          <rect x="130" y={floorY - bar1H} width="130" height={bar1H} fill="#10B981" rx="6" />
          <text x="195" y={floorY + 38} textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="22">NORMAL</text>
          <text x="195" y={floorY - bar1H - 16} textAnchor="middle" fill="#10B981" fontFamily="Arial Black, sans-serif" fontSize="28">$10</text>

          {/* Peak bar */}
          <rect x="340" y={floorY - bar2H} width="130" height={bar2H} fill="#EF4444" rx="6" />
          <text x="405" y={floorY + 38} textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="22">PEAK</text>
          <text x="405" y={floorY - bar2H - 16} textAnchor="middle" fill="#EF4444" fontFamily="Arial Black, sans-serif" fontSize="28">$30</text>

          {/* 300% badge */}
          <g
            transform={`translate(405,${floorY - bar2H - 72}) scale(${badgeScale})`}
            opacity={badgeOp}
          >
            <rect x="-58" y="-28" width="116" height="52" rx="12" fill={ACCENT} />
            <text x="0" y="9" textAnchor="middle" fill={BG_DARK} fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="900">300%</text>
          </g>
        </svg>

        <div style={{
          opacity: counterOp, background: '#1a1a1a',
          borderRadius: 24, padding: '22px 48px',
          border: `2px solid ${ACCENT}`, marginTop: 0,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '0 0 6px', textAlign: 'center' }}>
            COSTS YOU EVERY YEAR
          </p>
          <p style={{ ...headline(68, ACCENT) }}>
            ${Math.floor(counterVal).toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 20, stiffness: 70 } });
  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 60 } });
  const shieldScale = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 80 } });

  const tipOps = [
    interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [96, 116], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [144, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  ];
  const ctaOp = interpolate(frame, [182, 206], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tips = [
    'Search incognito — clear cookies',
    'Shop off-peak hours',
    'Compare prices before buying',
    'Never rush — urgency is engineered',
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '100px 80px 60px',
      }}>
        <p style={{ ...headline(38, BLACK), transform: `scale(${titleScale})`, marginBottom: 32 }}>
          FIGHT BACK
        </p>

        <svg width="260" height="210" viewBox="0 0 260 210" style={{ marginBottom: 32, transform: `scale(${personScale})` }}>
          {/* Person silhouette */}
          <circle cx="100" cy="54" r="38" fill={BLACK} />
          <path d="M38,210 C38,138 58,114 100,114 C142,114 162,138 162,210Z" fill={BLACK} />
          {/* Shield */}
          <g transform={`translate(158,62) scale(${shieldScale})`}>
            <path d="M0,-68 L68,-38 L68,10 C68,52 0,78 0,78 C0,78 -68,52 -68,10 L-68,-38Z" fill={ACCENT} />
            <path d="M0,-54 L54,-28 L54,12 C54,44 0,62 0,62 C0,62 -54,44 -54,12 L-54,-28Z" fill="none" stroke={WHITE} strokeWidth="2.5" />
            <polyline points="-22,4 -8,20 26,-20" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {tips.map((tip, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 20,
            marginBottom: 20, opacity: tipOps[i], width: '100%',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: ACCENT, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
              fontFamily: FONT, fontSize: 22, fontWeight: 900, color: BG_DARK,
            }}>
              {i + 1}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>{tip}</p>
          </div>
        ))}

        <div style={{
          marginTop: 20, opacity: ctaOp, background: BLACK,
          borderRadius: 20, padding: '20px 40px', width: '100%',
        }}>
          <p style={{ ...headline(30, WHITE), textAlign: 'center' }}>
            FOLLOW FOR MORE MONEY MOVES
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



