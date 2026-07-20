import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F1F5F9';
const ACCENT = '#F97316';
const WHITE = '#F8FAFC';
const BLACK = '#0F172A';
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

// ─── SCENE 1 ─ Hook: Free shipping costs you $978 ────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxScale = spring({ frame: frame - 20, fps, config: { stiffness: 60, damping: 14 } });
  const dollarOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: frame - 120, fps, config: { stiffness: 80, damping: 12 } });

  const dollarPositions = [
    { x: -70, y: -30 },
    { x: 60, y: -50 },
    { x: -40, y: 40 },
    { x: 80, y: 20 },
    { x: 10, y: 60 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ width: 80, height: 6, background: ACCENT, borderRadius: 3, marginBottom: 32, opacity: titleOp }} />

        <p style={{ ...headline(38, ACCENT), marginBottom: 8, opacity: titleOp }}>"FREE" SHIPPING?</p>
        <p style={{ ...headline(30, WHITE), marginBottom: 48, opacity: titleOp, letterSpacing: '0.1em' }}>NOT SO FREE AFTER ALL</p>

        {/* Shipping box with floating dollars */}
        <div style={{ position: 'relative' as const, marginBottom: 40 }}>
          <div style={{ transform: `scale(${boxScale})` }}>
            <svg width="180" height="160" viewBox="0 0 180 160">
              {/* Box body */}
              <rect x="20" y="68" width="140" height="86" rx="6" fill={ACCENT} />
              {/* Box lid */}
              <rect x="14" y="48" width="152" height="24" rx="5" fill="#FB923C" />
              {/* Center tape stripe */}
              <rect x="80" y="48" width="20" height="106" fill="#EA580C" />
              {/* Bow left loop */}
              <ellipse cx="65" cy="44" rx="18" ry="10" fill="#FED7AA" transform="rotate(-20 65 44)" />
              {/* Bow right loop */}
              <ellipse cx="115" cy="44" rx="18" ry="10" fill="#FED7AA" transform="rotate(20 115 44)" />
              {/* Bow knot */}
              <circle cx="90" cy="44" r="8" fill="#FDBA74" />
              {/* Hidden price tag */}
              <rect x="108" y="24" width="56" height="30" rx="5" fill={WHITE} />
              <circle cx="116" cy="39" r="5" fill="#CBD5E1" />
              <text x="125" y="44" fontFamily="Arial Black" fontSize="15" fill="#EF4444" fontWeight="900">$978</text>
            </svg>
          </div>

          {dollarPositions.map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute' as const,
                top: '40%',
                left: '45%',
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: dollarOp,
                color: '#34D399',
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 22,
                pointerEvents: 'none' as const,
              }}
            >
              $
            </div>
          ))}
        </div>

        {/* Big reveal stat */}
        <div style={{ transform: `scale(${statScale})`, textAlign: 'center' as const }}>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1 }}>$978</p>
          <p style={{ ...headline(24, WHITE), marginTop: 10 }}>EXTRA SPENT EVERY YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#94A3B8', marginTop: 8, letterSpacing: '0.05em' }}>just to skip a $5 shipping fee</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2 ─ The Threshold Trap ────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cartScale = spring({ frame: frame - 16, fps, config: { stiffness: 60, damping: 14 } });
  const barW = interpolate(frame, [40, 90], [0, 83], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fillW = interpolate(frame, [135, 180], [83, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: frame - 180, fps, config: { stiffness: 100, damping: 12 } });

  const effectiveW = frame >= 135 ? fillW : barW;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(34, BLACK), marginBottom: 40, opacity: titleOp }}>THE THRESHOLD TRAP</p>

        {/* Shopping cart SVG */}
        <div style={{ transform: `scale(${cartScale})`, marginBottom: 36 }}>
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Cart handle bar */}
            <path d="M10 22 L32 22 L58 105 L168 105" stroke={BLACK} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Cart basket */}
            <path d="M38 46 L180 46 L168 105 L58 105 Z" fill="#E2E8F0" stroke={BLACK} strokeWidth="3" />
            {/* Wheels */}
            <circle cx="80" cy="124" r="14" fill={BLACK} />
            <circle cx="80" cy="124" r="7" fill={WHITE} />
            <circle cx="148" cy="124" r="14" fill={BLACK} />
            <circle cx="148" cy="124" r="7" fill={WHITE} />
            {/* Items in cart */}
            <rect x="56" y="56" width="32" height="40" rx="4" fill={ACCENT} />
            <rect x="96" y="58" width="28" height="38" rx="4" fill="#60A5FA" />
            <rect x="132" y="60" width="30" height="36" rx="4" fill="#34D399" />
            {/* Price label */}
            <text x="100" y="145" fontFamily="Arial Black" fontSize="18" fill={BLACK} textAnchor="middle" fontWeight="900">$29.00 in cart</text>
          </svg>
        </div>

        {/* Progress bar toward $35 */}
        <div style={{ width: '100%', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 22, color: BLACK, letterSpacing: '0.05em' }}>$29 in cart</span>
            <span style={{ fontFamily: FONT, fontSize: 22, color: '#64748B', letterSpacing: '0.05em' }}>$35 threshold</span>
          </div>
          <div style={{ width: '100%', height: 22, background: '#CBD5E1', borderRadius: 11, overflow: 'hidden' as const }}>
            <div style={{ width: `${effectiveW}%`, height: '100%', background: ACCENT, borderRadius: 11 }} />
          </div>
        </div>

        {/* "Just $6 more" banner */}
        <div style={{ opacity: bannerOp, background: ACCENT, borderRadius: 14, padding: '16px 32px', marginBottom: 28, width: '100%' }}>
          <p style={{ ...headline(22, BLACK), margin: 0 }}>JUST $6 MORE FOR FREE SHIPPING!</p>
        </div>

        {/* Checkmark when bar fills */}
        <div style={{ transform: `scale(${checkScale})` }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#34D399" />
            <path d="M16 32 L26 43 L48 20" stroke={WHITE} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─ 70% Add Items + $14 Overspend ─────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 70], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [50, 95], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardScale = spring({ frame: frame - 145, fps, config: { stiffness: 80, damping: 12 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(34, WHITE), marginBottom: 44, opacity: titleOp }}>THE SHOCKING STAT</p>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 48, height: 320, marginBottom: 44 }}>
          {/* 70% bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <p style={{ ...headline(42, ACCENT), margin: 0, opacity: pctOp }}>70%</p>
            <div style={{ width: 110, height: bar1H, background: ACCENT, borderRadius: '10px 10px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, textAlign: 'center' as const, margin: 0, width: 110, letterSpacing: '0.05em' }}>ADD FILLER ITEMS</p>
          </div>
          {/* 30% bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <p style={{ ...headline(42, '#64748B'), margin: 0, opacity: pctOp }}>30%</p>
            <div style={{ width: 110, height: bar2H, background: '#475569', borderRadius: '10px 10px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 16, color: '#94A3B8', textAlign: 'center' as const, margin: 0, width: 110, letterSpacing: '0.05em' }}>DON'T BOTHER</p>
          </div>
        </div>

        {/* $14 stat card */}
        <div style={{ transform: `scale(${cardScale})`, textAlign: 'center' as const, background: '#1E293B', padding: '22px 44px', borderRadius: 18, borderLeft: `6px solid ${ACCENT}` }}>
          <p style={{ ...headline(72, ACCENT), margin: 0 }}>$14</p>
          <p style={{ ...headline(20, WHITE), margin: 0, marginTop: 6 }}>AVG OVERSPEND PER ORDER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4 ─ 46% of Extra Items Go Unused ──────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box1Y = interpolate(frame, [30, 58], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box2Y = interpolate(frame, [55, 83], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box3Y = interpolate(frame, [80, 108], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: frame - 18, fps, config: { stiffness: 55, damping: 14 } });
  const crossOp = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: frame - 162, fps, config: { stiffness: 80, damping: 12 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(30, BLACK), marginBottom: 32, opacity: titleOp }}>THOSE EXTRA ITEMS?</p>

        {/* Items dropping in + piggy bank */}
        <div style={{ position: 'relative' as const, width: 320, height: 280, marginBottom: 32 }}>
          {/* Piggy bank centered at bottom */}
          <div style={{ position: 'absolute' as const, bottom: 0, left: '50%', marginLeft: -60 }}>
            <div style={{ transform: `scale(${piggyScale})` }}>
              <svg width="120" height="100" viewBox="0 0 120 100">
                <ellipse cx="56" cy="62" rx="42" ry="32" fill="#F9A8D4" />
                <circle cx="90" cy="46" r="22" fill="#F9A8D4" />
                <ellipse cx="82" cy="26" rx="9" ry="7" fill="#F472B6" />
                <ellipse cx="106" cy="52" rx="10" ry="8" fill="#F472B6" />
                <circle cx="102" cy="50" r="2.5" fill={BLACK} />
                <circle cx="109" cy="50" r="2.5" fill={BLACK} />
                <circle cx="94" cy="40" r="3" fill={BLACK} />
                <rect x="42" y="28" width="20" height="5" rx="2.5" fill="#9D174D" />
                <rect x="22" y="84" width="14" height="14" rx="4" fill="#F9A8D4" />
                <rect x="42" y="84" width="14" height="14" rx="4" fill="#F9A8D4" />
                <rect x="62" y="84" width="14" height="14" rx="4" fill="#F9A8D4" />
                <rect x="80" y="84" width="14" height="14" rx="4" fill="#F9A8D4" />
                <path d="M14 60 Q2 50 8 40 Q14 30 10 24" stroke="#F9A8D4" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Box 1 */}
          <div style={{ position: 'absolute' as const, left: 20, top: 60, transform: `translateY(${box1Y}px)` }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <rect x="4" y="4" width="60" height="60" rx="8" fill={ACCENT} />
              <rect x="14" y="4" width="12" height="60" rx="4" fill="#EA580C" />
              <rect x="4" y="26" width="60" height="10" rx="4" fill="#EA580C" />
            </svg>
          </div>
          {/* X mark over box 1 */}
          <div style={{ position: 'absolute' as const, left: 20, top: 60, opacity: crossOp }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <line x1="8" y1="8" x2="60" y2="60" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
              <line x1="60" y1="8" x2="8" y2="60" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>

          {/* Box 2 (center — used, no X) */}
          <div style={{ position: 'absolute' as const, left: 126, top: 48, transform: `translateY(${box2Y}px)` }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <rect x="4" y="4" width="60" height="60" rx="8" fill="#60A5FA" />
              <rect x="18" y="4" width="12" height="60" rx="4" fill="#2563EB" />
              <rect x="4" y="28" width="60" height="10" rx="4" fill="#2563EB" />
            </svg>
          </div>

          {/* Box 3 */}
          <div style={{ position: 'absolute' as const, right: 20, top: 60, transform: `translateY(${box3Y}px)` }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <rect x="4" y="4" width="60" height="60" rx="8" fill="#34D399" />
              <rect x="16" y="4" width="12" height="60" rx="4" fill="#059669" />
              <rect x="4" y="26" width="60" height="10" rx="4" fill="#059669" />
            </svg>
          </div>
          {/* X mark over box 3 */}
          <div style={{ position: 'absolute' as const, right: 20, top: 60, opacity: crossOp }}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <line x1="8" y1="8" x2="60" y2="60" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
              <line x1="60" y1="8" x2="8" y2="60" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 46% stat card */}
        <div style={{ transform: `scale(${statScale})`, textAlign: 'center' as const, background: '#FEF2F2', padding: '22px 44px', borderRadius: 18, borderLeft: '6px solid #EF4444' }}>
          <p style={{ ...headline(72, '#EF4444'), margin: 0 }}>46%</p>
          <p style={{ fontFamily: FONT, fontSize: 19, color: BLACK, margin: 0, marginTop: 6, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>OF FILLER ITEMS BARELY USED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─ Stores Win, Not You ───────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame: frame - 18, fps, config: { stiffness: 55, damping: 14 } });
  const storeScale = spring({ frame: frame - 28, fps, config: { stiffness: 55, damping: 14 } });

  const fly1 = interpolate(frame, [75, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fly2 = interpolate(frame, [95, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fly3 = interpolate(frame, [115, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 158, fps, config: { stiffness: 80, damping: 12 } });

  const d1x = interpolate(fly1, [0, 1], [0, 230]);
  const d1y = interpolate(fly1, [0, 1], [0, -20]);
  const d2x = interpolate(fly2, [0, 1], [0, 230]);
  const d2y = interpolate(fly2, [0, 1], [0, 30]);
  const d3x = interpolate(fly3, [0, 1], [0, 230]);
  const d3y = interpolate(fly3, [0, 1], [0, -50]);

  const safeOp = (v: number) => Math.max(0, Math.min(1, v));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(32, WHITE), marginBottom: 44, opacity: titleOp }}>WHO ACTUALLY WINS?</p>

        {/* Person + Store row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' as const, marginBottom: 44 }}>
          {/* Person silhouette */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${personScale})` }}>
            <svg width="110" height="140" viewBox="0 0 110 140">
              <circle cx="55" cy="30" r="26" fill={WHITE} />
              <rect x="26" y="64" width="58" height="68" rx="14" fill={WHITE} />
              <rect x="4" y="68" width="26" height="48" rx="10" fill={WHITE} />
              <rect x="80" y="68" width="26" height="48" rx="10" fill={WHITE} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, marginTop: 10, letterSpacing: '0.1em' }}>YOU</p>
          </div>

          {/* Flying dollar signs */}
          <div style={{ position: 'absolute' as const, left: 115, top: 30 }}>
            <div style={{ position: 'absolute' as const, transform: `translate(${d1x}px, ${d1y}px)`, opacity: safeOp(fly1 < 0.85 ? fly1 / 0.85 : (1 - fly1) / 0.15) }}>
              <span style={{ fontFamily: FONT, fontSize: 32, color: '#34D399', fontWeight: 900 }}>$</span>
            </div>
            <div style={{ position: 'absolute' as const, top: 20, transform: `translate(${d2x}px, ${d2y}px)`, opacity: safeOp(fly2 < 0.85 ? fly2 / 0.85 : (1 - fly2) / 0.15) }}>
              <span style={{ fontFamily: FONT, fontSize: 32, color: '#34D399', fontWeight: 900 }}>$</span>
            </div>
            <div style={{ position: 'absolute' as const, top: -10, transform: `translate(${d3x}px, ${d3y}px)`, opacity: safeOp(fly3 < 0.85 ? fly3 / 0.85 : (1 - fly3) / 0.15) }}>
              <span style={{ fontFamily: FONT, fontSize: 32, color: '#34D399', fontWeight: 900 }}>$</span>
            </div>
          </div>

          {/* Store building */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${storeScale})` }}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <rect x="10" y="54" width="110" height="72" rx="4" fill={ACCENT} />
              <polygon points="0,56 65,10 130,56" fill="#EA580C" />
              <rect x="48" y="80" width="34" height="46" rx="4" fill="#1E293B" />
              <rect x="16" y="66" width="28" height="22" rx="4" fill="#FEF3C7" />
              <rect x="86" y="66" width="28" height="22" rx="4" fill="#FEF3C7" />
              <rect x="22" y="40" width="86" height="20" rx="4" fill={WHITE} />
              <text x="65" y="55" fontFamily="Arial Black" fontSize="11" fill={BLACK} textAnchor="middle" fontWeight="900">STORE</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, marginTop: 10, letterSpacing: '0.1em' }}>RETAILER</p>
          </div>
        </div>

        {/* +30% badge */}
        <div style={{ transform: `scale(${badgeScale})`, textAlign: 'center' as const, background: '#1E293B', padding: '22px 44px', borderRadius: 18, borderLeft: `6px solid ${ACCENT}` }}>
          <p style={{ ...headline(60, ACCENT), margin: 0 }}>+30%</p>
          <p style={{ ...headline(20, WHITE), margin: 0, marginTop: 6 }}>HIGHER ORDER VALUE FOR STORES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6 ─ The Simple Fix + CTA ──────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: frame - 16, fps, config: { stiffness: 55, damping: 14 } });
  const ruleOp = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsPct = interpolate(frame, [100, 178], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 178, fps, config: { stiffness: 80, damping: 12 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(32, BLACK), marginBottom: 32, opacity: titleOp }}>THE SIMPLE FIX</p>

        {/* Phone checkout screen */}
        <div style={{ transform: `scale(${phoneScale})`, marginBottom: 30 }}>
          <svg width="170" height="220" viewBox="0 0 170 220">
            {/* Phone shell */}
            <rect x="8" y="4" width="154" height="212" rx="22" fill={BLACK} />
            <rect x="18" y="16" width="134" height="188" rx="14" fill="#F8FAFC" />
            {/* Header */}
            <text x="85" y="46" fontFamily="Arial Black" fontSize="12" fill={BLACK} textAnchor="middle" fontWeight="900">CHECKOUT</text>
            <line x1="18" y1="54" x2="152" y2="54" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Cart line */}
            <text x="28" y="74" fontFamily="Arial" fontSize="10" fill="#64748B">Items total</text>
            <text x="148" y="74" fontFamily="Arial Black" fontSize="10" fill={BLACK} textAnchor="end" fontWeight="900">$29.00</text>
            {/* Standard shipping - highlighted green */}
            <rect x="20" y="84" width="130" height="28" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
            <text x="85" y="101" fontFamily="Arial Black" fontSize="10" fill="#16A34A" textAnchor="middle" fontWeight="900">STANDARD: $4.99  ✓</text>
            {/* Free shipping option - crossed out */}
            <rect x="20" y="118" width="130" height="28" rx="6" fill="#FEF2F2" />
            <text x="85" y="135" fontFamily="Arial" fontSize="9" fill="#EF4444" textAnchor="middle">FREE (ADD $6 FILLER ITEM)</text>
            <line x1="24" y1="132" x2="146" y2="132" stroke="#EF4444" strokeWidth="2" />
            {/* Divider */}
            <line x1="18" y1="154" x2="152" y2="154" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Total */}
            <text x="28" y="174" fontFamily="Arial Black" fontSize="11" fill={BLACK} fontWeight="900">TOTAL</text>
            <text x="148" y="174" fontFamily="Arial Black" fontSize="11" fill="#16A34A" textAnchor="end" fontWeight="900">$33.99</text>
            {/* Button */}
            <rect x="20" y="184" width="130" height="14" rx="5" fill="#16A34A" />
            <text x="85" y="195" fontFamily="Arial Black" fontSize="8" fill={WHITE} textAnchor="middle" fontWeight="900">PLACE ORDER</text>
          </svg>
        </div>

        {/* The rule */}
        <div style={{ opacity: ruleOp, background: '#ECFDF5', borderRadius: 14, padding: '18px 28px', marginBottom: 22, borderLeft: '5px solid #16A34A', width: '100%' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#166534', margin: 0, textAlign: 'center' as const, letterSpacing: '0.04em', lineHeight: 1.5 }}>
            WOULD YOU DRIVE TO A STORE FOR IT?<br />
            <span style={{ color: '#16A34A', fontSize: 22 }}>IF NOT — JUST PAY THE FEE.</span>
          </p>
        </div>

        {/* Savings bar */}
        <div style={{ width: '100%', marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 17, color: BLACK, letterSpacing: '0.05em' }}>ANNUAL SAVINGS</span>
            <span style={{ fontFamily: FONT, fontSize: 17, color: '#16A34A', fontWeight: 900 }}>${Math.round(savingsPct * 9.78)}</span>
          </div>
          <div style={{ width: '100%', height: 18, background: '#D1FAE5', borderRadius: 9, overflow: 'hidden' as const }}>
            <div style={{ width: `${savingsPct}%`, height: '100%', background: '#16A34A', borderRadius: 9 }} />
          </div>
        </div>

        {/* CTA */}
        <div style={{ transform: `scale(${ctaScale})`, textAlign: 'center' as const }}>
          <p style={{ ...headline(24, BLACK), margin: 0 }}>FOLLOW FOR MORE MONEY TRAPS</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#64748B', marginTop: 8, letterSpacing: '0.05em' }}>LIKE & SHARE IF THIS SHOCKED YOU</p>
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
