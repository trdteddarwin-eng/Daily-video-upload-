import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN_COL = '#10B981';
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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── Scene 1: Hook — shopping cart + "Add $7 more for free shipping" ──────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const cartScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 90 } });
  const badgeScale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 100 } });
  const barWidth = interpolate(frame, [60, 180], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [100, 130], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 160,
        left: 0,
        right: 0,
        paddingLeft: 60,
        paddingRight: 60,
        transform: `translateY(${(1 - titleSlide) * -80}px)`,
      }}>
        <p style={headline(68, WHITE)}>THE</p>
        <p style={{ ...headline(68, ACCENT), marginTop: 6 }}>FREE SHIPPING</p>
        <p style={headline(68, WHITE)}>TRAP</p>
      </div>

      {/* Shopping cart SVG */}
      <div style={{
        position: 'absolute',
        top: 460,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${cartScale})`,
      }}>
        <svg width="260" height="210" viewBox="0 0 260 210">
          {/* Handle */}
          <line x1="22" y1="30" x2="58" y2="80" stroke={ACCENT} strokeWidth="8" strokeLinecap="round"/>
          {/* Cart body */}
          <path d="M53 80 L53 158 Q53 170 65 170 L205 170 Q217 170 217 158 L238 80 Z"
            fill="none" stroke={ACCENT} strokeWidth="7" strokeLinejoin="round"/>
          {/* Item 1 */}
          <rect x="75" y="96" width="42" height="46" rx="6" fill={WHITE} opacity={0.85}/>
          {/* Item 2 */}
          <rect x="127" y="96" width="42" height="46" rx="6" fill={WHITE} opacity={0.85}/>
          {/* Item 3 (new one being added) */}
          <rect x="162" y="90" width="40" height="38" rx="6" fill={ACCENT} opacity={0.75}/>
          {/* Wheel left */}
          <circle cx="88" cy="195" r="16" fill={ACCENT}/>
          <circle cx="88" cy="195" r="7" fill={BG_DARK}/>
          {/* Wheel right */}
          <circle cx="192" cy="195" r="16" fill={ACCENT}/>
          <circle cx="192" cy="195" r="7" fill={BG_DARK}/>
        </svg>
      </div>

      {/* FREE DELIVERY badge */}
      <div style={{
        position: 'absolute',
        top: 740,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${badgeScale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 18,
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
          <p style={{ ...headline(42, BLACK), margin: 0 }}>ADD $7 MORE</p>
          <p style={{ ...headline(30, BLACK), margin: 0, marginTop: 8 }}>FOR FREE DELIVERY</p>
        </div>
      </div>

      {/* Progress bar toward $35 */}
      <div style={{ position: 'absolute', top: 950, left: 80, right: 80 }}>
        <div style={{ background: '#2a2a2a', borderRadius: 14, height: 22, overflow: 'hidden' }}>
          <div style={{
            background: ACCENT,
            width: barWidth,
            height: '100%',
            borderRadius: 14,
          }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>$28.00</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>$35 FREE</p>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 60,
        right: 60,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          This habit costs you{' '}
          <span style={{ color: ACCENT }}>$890 a year.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 2: Engineered by design — 3-step flow diagram ──────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const box1Scale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 90 } });
  const arrow1Op = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box2Scale = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 14, stiffness: 90 } });
  const arrow2Op = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box3Scale = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 90 } });
  const stampScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 11, stiffness: 110 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 130,
        left: 60,
        right: 60,
        transform: `translateY(${(1 - titleY) * -60}px)`,
      }}>
        <p style={headline(52, BLACK)}>ENGINEERED</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>BY DESIGN</p>
      </div>

      {/* Step 1: Lure badge */}
      <div style={{
        position: 'absolute',
        top: 360,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${box1Scale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 40,
          paddingRight: 40,
          width: 420,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>ADD $7 MORE</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, marginTop: 6, opacity: 0.75 }}>The Lure</p>
        </div>
      </div>

      {/* Arrow 1 */}
      <div style={{
        position: 'absolute',
        top: 530,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: arrow1Op,
      }}>
        <svg width="60" height="40" viewBox="0 0 60 40">
          <line x1="30" y1="0" x2="30" y2="28" stroke={BLACK} strokeWidth="4"/>
          <polygon points="30,40 18,22 42,22" fill={BLACK}/>
        </svg>
      </div>

      {/* Step 2: Brain / loss aversion */}
      <div style={{
        position: 'absolute',
        top: 580,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${box2Scale})`,
      }}>
        <div style={{
          background: '#E5E5E5',
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 40,
          paddingRight: 40,
          width: 420,
          textAlign: 'center',
          border: `3px solid ${BLACK}`,
        }}>
          <svg width="52" height="44" viewBox="0 0 52 44" style={{ display: 'block', margin: '0 auto 8px' }}>
            <ellipse cx="26" cy="22" rx="22" ry="18" fill="none" stroke={BLACK} strokeWidth="3"/>
            <path d="M26 10 Q14 14 14 22 Q14 30 26 34" fill="none" stroke={BLACK} strokeWidth="2.5"/>
            <path d="M26 10 Q38 14 38 22 Q38 30 26 34" fill="none" stroke={BLACK} strokeWidth="2.5"/>
            <line x1="26" y1="10" x2="26" y2="34" stroke={BLACK} strokeWidth="2"/>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>LOSS AVERSION</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#555', margin: 0, marginTop: 6 }}>Your Brain</p>
        </div>
      </div>

      {/* Arrow 2 */}
      <div style={{
        position: 'absolute',
        top: 752,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: arrow2Op,
      }}>
        <svg width="60" height="40" viewBox="0 0 60 40">
          <line x1="30" y1="0" x2="30" y2="28" stroke={BLACK} strokeWidth="4"/>
          <polygon points="30,40 18,22 42,22" fill={BLACK}/>
        </svg>
      </div>

      {/* Step 3: Purchase result */}
      <div style={{
        position: 'absolute',
        top: 800,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${box3Scale})`,
      }}>
        <div style={{
          background: RED,
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 40,
          paddingRight: 40,
          width: 420,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>UNPLANNED PURCHASE</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, marginTop: 6, opacity: 0.85 }}>Every. Single. Time.</p>
        </div>
      </div>

      {/* Amazon patent note */}
      <div style={{
        position: 'absolute',
        bottom: 140,
        left: 60,
        right: 60,
        transform: `scale(${stampScale})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Amazon <span style={{ color: RED }}>patented</span> this trigger.
          <br/>Every retailer copied it.
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 3: Bad Math — bar comparison ───────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const bar1H = interpolate(frame, [30, 100], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [60, 130], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffScale = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 11, stiffness: 100 } });
  const subOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 150,
        left: 60,
        right: 60,
        transform: `translateY(${(1 - titleSlide) * -60}px)`,
      }}>
        <p style={headline(56, WHITE)}>THE MATH</p>
        <p style={{ ...headline(56, ACCENT), marginTop: 4 }}>NOBODY DOES</p>
      </div>

      {/* Bar chart */}
      <div style={{
        position: 'absolute',
        top: 440,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 80,
      }}>
        {/* Left bar: Shipping fee */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: GREEN_COL, margin: 0 }}>$5.99</p>
          <div style={{
            width: 160,
            height: bar1H,
            background: GREEN_COL,
            borderRadius: '12px 12px 0 0',
          }}/>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#aaa', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
            SHIPPING<br/>FEE
          </p>
        </div>

        {/* Right bar: Extra item */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: RED, margin: 0 }}>$7.00</p>
          <div style={{
            width: 160,
            height: bar2H,
            background: RED,
            borderRadius: '12px 12px 0 0',
          }}/>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#aaa', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
            EXTRA<br/>ITEM
          </p>
        </div>
      </div>

      {/* Difference callout */}
      <div style={{
        position: 'absolute',
        top: 1100,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${diffScale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 18,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
          <p style={{ ...headline(44, BLACK), margin: 0 }}>$1.01 WASTED</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, marginTop: 8, textAlign: 'center' }}>
            + something you didn&apos;t need
          </p>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute',
        bottom: 150,
        left: 60,
        right: 60,
        opacity: subOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          You spent <span style={{ color: RED }}>more</span> than the fee
          <br/>every time.
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 4: Scale — 276 orders/year grid of bags ────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const gridOpacity = interpolate(frame, [25, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [60, 160], [0, 276], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 90 } });

  const COLS = 6;
  const ROWS = 4;
  const bagCount = Math.max(0, Math.floor(COLS * ROWS));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 130,
        left: 60,
        right: 60,
        transform: `translateY(${(1 - titleY) * -60}px)`,
      }}>
        <p style={headline(52, BLACK)}>NOW SCALE</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>IT UP</p>
      </div>

      {/* Grid of shopping bags */}
      <div style={{
        position: 'absolute',
        top: 360,
        left: 60,
        right: 60,
        opacity: gridOpacity,
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: 14,
          justifyContent: 'center',
        }}>
          {Array.from({ length: bagCount }).map((_, i) => (
            <svg key={i} width="118" height="100" viewBox="0 0 118 100">
              {/* Bag body */}
              <rect x="12" y="30" width="94" height="62" rx="10" fill={ACCENT} opacity={0.85}/>
              {/* Bag handles */}
              <path d="M35 30 Q35 10 59 10 Q83 10 83 30" fill="none" stroke={ACCENT} strokeWidth="7" strokeLinecap="round"/>
              {/* Dollar sign */}
              <text x="59" y="68" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={BLACK} fontWeight="900">$</text>
            </svg>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#777', textAlign: 'center', marginTop: 16 }}>
          24 orders shown &bull; representing monthly average
        </p>
      </div>

      {/* Counter */}
      <div style={{
        position: 'absolute',
        bottom: 240,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${counterScale})`,
      }}>
        <div style={{
          background: BLACK,
          borderRadius: 20,
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 60,
          paddingRight: 60,
          textAlign: 'center',
        }}>
          <p style={{ ...headline(80, ACCENT), margin: 0 }}>{counterVal}</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, marginTop: 8 }}>
            ORDERS / YEAR
          </p>
        </div>
      </div>

      {/* Sub note */}
      <div style={{ position: 'absolute', bottom: 130, left: 60, right: 60 }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', textAlign: 'center', margin: 0 }}>
          23 orders/month &times; 12 months
        </p>
      </div>
    </FadeScene>
  );
};

// ── Scene 5: Annual total — $890 counter + comparison bars ───────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const bigNumVal = Math.floor(interpolate(frame, [25, 140], [0, 890], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const bar1W = interpolate(frame, [60, 130], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [80, 150], [0, 540], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lossScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 11, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 130,
        left: 60,
        right: 60,
        transform: `translateY(${(1 - titleSlide) * -60}px)`,
      }}>
        <p style={headline(52, WHITE)}>THE ANNUAL</p>
        <p style={{ ...headline(52, RED), marginTop: 4 }}>DAMAGE</p>
      </div>

      {/* Big counter */}
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: FONT, fontSize: 130, color: RED, margin: 0, letterSpacing: '0.05em' }}>
          ${bigNumVal}
        </p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#aaa', margin: 0, marginTop: 4 }}>
          in unplanned spending
        </p>
      </div>

      {/* Comparison bars */}
      <div style={{ position: 'absolute', top: 700, left: 70, right: 70 }}>
        {/* Bar 1: Shipping avoided */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN_COL, margin: 0 }}>SHIPPING AVOIDED</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN_COL, margin: 0 }}>$168</p>
          </div>
          <div style={{ background: '#2a2a2a', borderRadius: 10, height: 28, overflow: 'hidden' }}>
            <div style={{ background: GREEN_COL, width: bar1W, height: '100%', borderRadius: 10 }}/>
          </div>
        </div>

        {/* Bar 2: Extra spending */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: RED, margin: 0 }}>EXTRA SPENDING</p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: RED, margin: 0 }}>$890</p>
          </div>
          <div style={{ background: '#2a2a2a', borderRadius: 10, height: 28, overflow: 'hidden' }}>
            <div style={{ background: RED, width: bar2W, height: '100%', borderRadius: 10 }}/>
          </div>
        </div>
      </div>

      {/* Net loss callout */}
      <div style={{
        position: 'absolute',
        bottom: 170,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${lossScale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 18,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
          <p style={{ ...headline(48, BLACK), margin: 0 }}>$722 NET LOSS</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, marginTop: 8, textAlign: 'center' }}>
            Wild, right?
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

// ── Scene 6: CTA — person choosing + piggy bank ──────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const personScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 80 } });
  const btn1Scale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 90 } });
  const btn2Scale = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 12, stiffness: 90 } });
  const piggyScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 11, stiffness: 85 } });
  const ctaOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: 130,
        left: 60,
        right: 60,
        transform: `translateY(${(1 - titleY) * -60}px)`,
      }}>
        <p style={headline(52, BLACK)}>NEXT TIME</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 4 }}>PAY THE FEE</p>
      </div>

      {/* Person silhouette with phone */}
      <div style={{
        position: 'absolute',
        top: 360,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${personScale})`,
      }}>
        <svg width="160" height="200" viewBox="0 0 160 200">
          {/* Head */}
          <circle cx="80" cy="38" r="30" fill={BLACK}/>
          {/* Body */}
          <rect x="44" y="78" width="72" height="90" rx="14" fill={BLACK}/>
          {/* Arms */}
          <line x1="44" y1="92" x2="14" y2="130" stroke={BLACK} strokeWidth="16" strokeLinecap="round"/>
          <line x1="116" y1="92" x2="146" y2="130" stroke={BLACK} strokeWidth="16" strokeLinecap="round"/>
          {/* Phone in right hand */}
          <rect x="130" y="118" width="30" height="48" rx="6" fill={ACCENT}/>
          <rect x="134" y="123" width="22" height="34" rx="3" fill={BG_DARK}/>
          {/* Legs */}
          <line x1="62" y1="168" x2="52" y2="200" stroke={BLACK} strokeWidth="16" strokeLinecap="round"/>
          <line x1="98" y1="168" x2="108" y2="200" stroke={BLACK} strokeWidth="16" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Button 1: Don't add item (crossed out) */}
      <div style={{
        position: 'absolute',
        top: 630,
        left: 60,
        right: 60,
        transform: `scale(${btn1Scale})`,
      }}>
        <div style={{
          background: '#fde8e8',
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
          border: `3px solid ${RED}`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: RED, margin: 0, textAlign: 'center' }}>
            ADD EXTRA ITEM
          </p>
          {/* X cross-out */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 400 80">
            <line x1="0" y1="0" x2="400" y2="80" stroke={RED} strokeWidth="6" opacity={0.5}/>
            <line x1="400" y1="0" x2="0" y2="80" stroke={RED} strokeWidth="6" opacity={0.5}/>
          </svg>
        </div>
      </div>

      {/* Button 2: Pay shipping (checkmark) */}
      <div style={{
        position: 'absolute',
        top: 760,
        left: 60,
        right: 60,
        transform: `scale(${btn2Scale})`,
      }}>
        <div style={{
          background: GREEN_COL,
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <polyline points="4,18 14,28 32,8" fill="none" stroke={WHITE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>PAY $5.99 SHIPPING</p>
        </div>
      </div>

      {/* Piggy bank growing */}
      <div style={{
        position: 'absolute',
        top: 940,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${piggyScale})`,
      }}>
        <svg width="130" height="110" viewBox="0 0 130 110">
          {/* Body */}
          <ellipse cx="65" cy="62" rx="52" ry="42" fill={ACCENT}/>
          {/* Head */}
          <circle cx="112" cy="50" r="22" fill={ACCENT}/>
          {/* Snout */}
          <ellipse cx="122" cy="55" rx="12" ry="9" fill="#e08b00"/>
          <circle cx="118" cy="55" r="3" fill={BLACK}/>
          <circle cx="126" cy="55" r="3" fill={BLACK}/>
          {/* Eye */}
          <circle cx="109" cy="42" r="4" fill={BLACK}/>
          {/* Ear */}
          <ellipse cx="104" cy="32" rx="8" ry="11" fill="#e08b00"/>
          {/* Coin slot */}
          <rect x="58" y="22" width="22" height="5" rx="2.5" fill={BLACK}/>
          {/* Legs */}
          <rect x="28" y="96" width="18" height="14" rx="5" fill="#e08b00"/>
          <rect x="52" y="96" width="18" height="14" rx="5" fill="#e08b00"/>
          <rect x="76" y="96" width="18" height="14" rx="5" fill="#e08b00"/>
          {/* Tail */}
          <path d="M14 55 Q4 45 10 35 Q16 25 14 55" fill="none" stroke="#e08b00" strokeWidth="4"/>
        </svg>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: 120,
        left: 60,
        right: 60,
        opacity: ctaOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
          Follow for more money moves<br/>
          <span style={{ color: ACCENT }}>that actually add up.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ── Main composition ──────────────────────────────────────────────────────────
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
