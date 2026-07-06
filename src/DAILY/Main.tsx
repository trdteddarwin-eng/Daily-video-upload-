import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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

// Scene 1: Shopping cart with price going up / package size going down
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const cartSp = spring({ frame: Math.max(0, frame - 22), fps: 30, config: { damping: 14, stiffness: 70 } });
  const cartScale = interpolate(cartSp, [0, 1], [0.4, 1]);

  const priceProg = interpolate(frame, [55, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const priceVal = (7.99 + priceProg * 3.5).toFixed(2);
  const sizeVal = Math.round(64 - priceProg * 12);

  const subOp = interpolate(frame, [162, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(60, ACCENT)}>SHRINKFLATION</p>
          <p style={headline(36, WHITE)}>IS STEALING FROM YOU</p>
        </div>

        <div style={{ transform: `scale(${cartScale})` }}>
          <svg width="240" height="190" viewBox="0 0 240 190">
            <line x1="12" y1="32" x2="48" y2="32" stroke={ACCENT} strokeWidth={9} strokeLinecap="round"/>
            <polyline points="48,32 66,32 90,128 170,128 190,60 66,60"
              stroke={ACCENT} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="102" cy="150" r="14" fill="none" stroke={ACCENT} strokeWidth={8}/>
            <circle cx="160" cy="150" r="14" fill="none" stroke={ACCENT} strokeWidth={8}/>
            <rect x="80" y="70" width="40" height="50" rx="5" fill={WHITE} opacity={0.85}/>
            <rect x="124" y="74" width="34" height="46" rx="5" fill={WHITE} opacity={0.55}/>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={headline(30, GRAY)}>PRICE</p>
            <p style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, margin: 0, lineHeight: 1.1 }}>${priceVal}</p>
            <p style={headline(30, RED)}>↑ UP</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={headline(30, GRAY)}>PACKAGE</p>
            <p style={{ fontFamily: FONT, fontSize: 72, color: GREEN, margin: 0, lineHeight: 1.1 }}>{sizeVal}oz</p>
            <p style={headline(30, RED)}>↓ DOWN</p>
          </div>
        </div>

        <p style={{ ...headline(30, WHITE), opacity: subOp }}>
          $2,900 DRAINED FROM YOUR WALLET EVERY YEAR
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Two OJ cartons side by side — 2020 big vs 2024 smaller, same price
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const leftSp = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 12, stiffness: 70 } });
  const leftScale = interpolate(leftSp, [0, 1], [0, 1]);

  const rightSp = spring({ frame: Math.max(0, frame - 52), fps: 30, config: { damping: 12, stiffness: 70 } });
  const rightScale = interpolate(rightSp, [0, 1], [0, 1]);

  const arrowOp = interpolate(frame, [55, 88], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const subOp = interpolate(frame, [132, 168], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 52, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>SAME PRICE.</p>
          <p style={headline(46, RED)}>LESS PRODUCT.</p>
        </div>

        <div style={{ display: 'flex', gap: 56, alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* 2020 — bigger carton */}
          <div style={{ textAlign: 'center', transform: `scale(${leftScale})`, transformOrigin: 'bottom center' }}>
            <svg width="160" height="220" viewBox="0 0 160 220">
              <rect x="20" y="20" width="120" height="180" rx="10" fill="#FDE68A" stroke={BLACK} strokeWidth={5}/>
              <path d="M20 20 L80 48 L140 20" stroke={BLACK} strokeWidth={3} fill="none"/>
              <circle cx="80" cy="10" r="8" fill={BLACK}/>
              <rect x="22" y="80" width="116" height="118" rx="8" fill="#F97316" opacity={0.45}/>
              <rect x="30" y="90" width="100" height="60" rx="6" fill={WHITE} opacity={0.92}/>
              <text x="80" y="114" textAnchor="middle" fontFamily="Arial Black" fontSize="15" fontWeight="bold" fill={BLACK}>ORANGE</text>
              <text x="80" y="132" textAnchor="middle" fontFamily="Arial Black" fontSize="15" fontWeight="bold" fill={BLACK}>JUICE</text>
              <text x="80" y="150" textAnchor="middle" fontFamily="Arial Black" fontSize="13" fill={GRAY}>64 OZ</text>
            </svg>
            <p style={{ ...headline(24, BLACK), marginTop: 10 }}>2020</p>
            <p style={{ ...headline(36, GREEN), marginTop: 4 }}>$4.99</p>
          </div>

          {/* Arrow */}
          <div style={{ opacity: arrowOp, paddingBottom: 90 }}>
            <p style={{ fontFamily: FONT, fontSize: 56, color: GRAY, margin: 0 }}>→</p>
          </div>

          {/* 2024 — smaller carton */}
          <div style={{ textAlign: 'center', transform: `scale(${rightScale})`, transformOrigin: 'bottom center' }}>
            <svg width="120" height="168" viewBox="0 0 120 168">
              <rect x="15" y="15" width="90" height="143" rx="8" fill="#FDE68A" stroke={BLACK} strokeWidth={5}/>
              <path d="M15 15 L60 38 L105 15" stroke={BLACK} strokeWidth={3} fill="none"/>
              <circle cx="60" cy="7" r="7" fill={BLACK}/>
              <rect x="17" y="62" width="86" height="94" rx="6" fill="#F97316" opacity={0.45}/>
              <rect x="24" y="70" width="72" height="52" rx="5" fill={WHITE} opacity={0.92}/>
              <text x="60" y="91" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fontWeight="bold" fill={BLACK}>ORANGE</text>
              <text x="60" y="106" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fontWeight="bold" fill={BLACK}>JUICE</text>
              <text x="60" y="121" textAnchor="middle" fontFamily="Arial Black" fontSize="11" fill={RED}>52 OZ</text>
            </svg>
            <p style={{ ...headline(24, BLACK), marginTop: 10 }}>2024</p>
            <p style={{ ...headline(36, RED), marginTop: 4 }}>$4.99</p>
          </div>
        </div>

        <p style={{ ...headline(36, BLACK), opacity: subOp }}>
          YOU NEVER EVEN NOTICED
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Bar chart — -15% package size / +26% price / 49% effective hike
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const bar1H = interpolate(frame, [25, 100], [0, 118], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bar2H = interpolate(frame, [75, 155], [0, 182], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bar3H = interpolate(frame, [130, 205], [0, 295], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const lbl1Op = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl2Op = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl3Op = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASELINE = 435;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 30, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(40, WHITE)}>THE MATH THEY</p>
          <p style={headline(40, ACCENT)}>DON'T SHOW YOU</p>
        </div>

        <svg width="860" height="520" viewBox="0 0 860 520">
          <line x1="40" y1={BASELINE} x2="820" y2={BASELINE} stroke={GRAY} strokeWidth={2} opacity={0.3}/>

          {/* Bar 1: Size down 15% */}
          <rect x="80" y={BASELINE - bar1H} width="160" height={bar1H} rx="8" fill={RED} opacity={0.9}/>
          <text x="160" y={Math.max(BASELINE - bar1H - 14, 22)} textAnchor="middle"
            fill={RED} fontFamily="Arial Black" fontSize="34" fontWeight="bold" opacity={lbl1Op}>-15%</text>
          <text x="160" y={BASELINE + 36} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">PACKAGE</text>
          <text x="160" y={BASELINE + 60} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">SIZE</text>

          {/* Bar 2: Price up 26% */}
          <rect x="340" y={BASELINE - bar2H} width="160" height={bar2H} rx="8" fill={ACCENT} opacity={0.9}/>
          <text x="420" y={Math.max(BASELINE - bar2H - 14, 22)} textAnchor="middle"
            fill={ACCENT} fontFamily="Arial Black" fontSize="34" fontWeight="bold" opacity={lbl2Op}>+26%</text>
          <text x="420" y={BASELINE + 36} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">PRICE</text>
          <text x="420" y={BASELINE + 60} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">PAID</text>

          {/* Bar 3: Effective hike 49% */}
          <rect x="600" y={BASELINE - bar3H} width="160" height={bar3H} rx="8" fill={GREEN} opacity={0.9}/>
          <text x="680" y={Math.max(BASELINE - bar3H - 14, 22)} textAnchor="middle"
            fill={GREEN} fontFamily="Arial Black" fontSize="34" fontWeight="bold" opacity={lbl3Op}>49%</text>
          <text x="680" y={BASELINE + 36} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">REAL</text>
          <text x="680" y={BASELINE + 60} textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="20">HIKE</text>
        </svg>

        <p style={headline(34, ACCENT)}>EFFECTIVE PRICE HIKE = 49%</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Three product examples sliding in — OJ, chips, ice cream
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const delays = [20, 80, 140];

  const item0Sp = spring({ frame: Math.max(0, frame - delays[0]), fps: 30, config: { damping: 14, stiffness: 70 } });
  const item1Sp = spring({ frame: Math.max(0, frame - delays[1]), fps: 30, config: { damping: 14, stiffness: 70 } });
  const item2Sp = spring({ frame: Math.max(0, frame - delays[2]), fps: 30, config: { damping: 14, stiffness: 70 } });

  const item0X = interpolate(item0Sp, [0, 1], [-300, 0]);
  const item1X = interpolate(item1Sp, [0, 1], [-300, 0]);
  const item2X = interpolate(item2Sp, [0, 1], [-300, 0]);

  const item0Op = interpolate(item0Sp, [0, 0.4], [0, 1]);
  const item1Op = interpolate(item1Sp, [0, 0.4], [0, 1]);
  const item2Op = interpolate(item2Sp, [0, 0.4], [0, 1]);

  const itemXVals = [item0X, item1X, item2X];
  const itemOpVals = [item0Op, item1Op, item2Op];

  const products = [
    { label: 'ORANGE JUICE', before: '64 OZ', after: '52 OZ' },
    { label: 'POTATO CHIPS', before: '16 OZ', after: '13 OZ' },
    { label: 'ICE CREAM', before: '56 OZ', after: '48 OZ' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 44, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(38, BLACK)}>REAL EXAMPLES</p>
          <p style={headline(38, RED)}>SAME PRICE, LESS INSIDE</p>
        </div>

        {products.map((product, i) => (
          <div
            key={i}
            style={{
              transform: `translateX(${itemXVals[i]}px)`,
              opacity: itemOpVals[i],
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: WHITE,
              borderRadius: 18,
              padding: '20px 36px',
              width: '100%',
              maxWidth: 860,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <p style={{ ...headline(46, ACCENT), minWidth: 60 }}>{String(i + 1)}</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, flex: 1, margin: 0, letterSpacing: '0.06em' }}>
              {product.label}
            </p>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, margin: 0 }}>{product.before}</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: '4px 0' }}>→</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: RED, margin: 0 }}>{product.after}</p>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Annual cost — $9,500 × 49% = $2,900 counter
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const line1Op = interpolate(frame, [28, 65], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const line2Op = interpolate(frame, [80, 118], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const totalProg = interpolate(frame, [126, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const totalVal = Math.round(totalProg * 2900);

  const subOp = interpolate(frame, [200, 220], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 38, padding: '0 70px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(42, WHITE)}>WHAT IT COSTS</p>
          <p style={headline(42, ACCENT)}>YOUR HOUSEHOLD</p>
        </div>

        <div style={{ opacity: line1Op, textAlign: 'center' }}>
          <p style={headline(30, GRAY)}>AVERAGE GROCERY SPEND</p>
          <p style={{ ...headline(60, WHITE), marginTop: 10 }}>$9,500 / YEAR</p>
        </div>

        <div style={{ opacity: line2Op, textAlign: 'center' }}>
          <p style={headline(30, GRAY)}>× 49% EFFECTIVE HIKE</p>
          <p style={{ ...headline(30, WHITE), marginTop: 12 }}>= EXTRA YOU'RE PAYING:</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 110, color: RED, margin: 0, lineHeight: 1 }}>
            ${totalVal.toLocaleString()}
          </p>
          <p style={{ ...headline(34, WHITE), marginTop: 10 }}>PER YEAR</p>
        </div>

        <p style={{ ...headline(26, GRAY), opacity: subOp }}>
          FOR LESS FOOD THAN YOU GOT IN 2020
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — check price per ounce, not per package
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const tagSp = spring({ frame: Math.max(0, frame - 28), fps: 30, config: { damping: 12, stiffness: 70 } });
  const tagScale = interpolate(tagSp, [0, 1], [0.3, 1]);

  const checkSp = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 14, stiffness: 90 } });
  const checkScale = interpolate(checkSp, [0, 1], [0, 1]);

  const ctaOp = interpolate(frame, [144, 182], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const followOp = interpolate(frame, [188, 215], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 42, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>THE FIX IS</p>
          <p style={headline(46, GREEN)}>ONE NUMBER</p>
        </div>

        {/* Price tag showing $/oz */}
        <div style={{ transform: `scale(${tagScale})` }}>
          <svg width="380" height="210" viewBox="0 0 380 210">
            <rect x="10" y="10" width="360" height="190" rx="22" fill={WHITE} stroke={BLACK} strokeWidth={6}/>
            <rect x="10" y="10" width="86" height="190" rx="22" fill={ACCENT}/>
            <rect x="55" y="10" width="41" height="190" fill={ACCENT}/>
            <circle cx="55" cy="36" r="15" fill={BG_LIGHT} stroke={BLACK} strokeWidth={4}/>
            <text x="116" y="82" fontFamily="Arial Black" fontWeight="900" fontSize="24" fill={BLACK}>PRICE PER OZ</text>
            <rect x="108" y="96" width="262" height="3" fill={GRAY} opacity={0.3}/>
            <text x="116" y="152" fontFamily="Arial Black" fontWeight="900" fontSize="52" fill={GREEN}>$0.078</text>
            <text x="116" y="187" fontFamily="Arial" fontSize="21" fill={GRAY}>/oz — not /package</text>
          </svg>
        </div>

        {/* Checkmark + label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          transform: `scale(${checkScale})`, transformOrigin: 'center',
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill={GREEN}/>
            <polyline points="15,32 27,44 49,20" stroke={WHITE} strokeWidth={7} fill="none"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={headline(36, BLACK)}>CHECK $/OZ NOT $/PACK</p>
        </div>

        <p style={{ ...headline(32, RED), opacity: ctaOp }}>SAVES YOU $2,900 A YEAR</p>

        <p style={{ ...headline(28, BLACK), opacity: followOp }}>FOLLOW FOR MORE MONEY TRAPS</p>
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
