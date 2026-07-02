import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Gift card drawer — $175 in dead money ──────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const drawerSpring = spring({ frame, fps: 30, config: { damping: 16, stiffness: 90 } });
  const drawerY = interpolate(drawerSpring, [0, 1], [500, 0]);

  const headSpring = spring({ frame: Math.max(0, frame - 40), fps: 30, config: { damping: 14, stiffness: 80 } });
  const headY = interpolate(headSpring, [0, 1], [60, 0]);
  const headOp = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '80px 60px',
        }}
      >
        {/* Drawer with 3 gift cards */}
        <svg
          width="680"
          height="340"
          viewBox="0 0 680 340"
          style={{ transform: `translateY(${drawerY}px)` }}
        >
          <ellipse cx="340" cy="328" rx="300" ry="18" fill="rgba(0,0,0,0.35)" />
          <rect x="40" y="80" width="600" height="235" rx="12" fill="#1A2535" stroke={ACCENT} strokeWidth="3" />
          <rect x="275" y="65" width="130" height="26" rx="13" fill="#253347" stroke={ACCENT} strokeWidth="2" />

          {/* Card 1 — purple, tilted left */}
          <g transform="translate(85, 105) rotate(-15)">
            <rect x="0" y="0" width="145" height="90" rx="9" fill="#7C3AED" />
            <rect x="0" y="65" width="145" height="18" fill="#6D28D9" />
            <rect x="8" y="8" width="42" height="28" rx="4" fill="#C4B5FD" />
            <text x="72" y="38" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="10">GIFT CARD</text>
            <text x="72" y="56" textAnchor="middle" fill="#E9D5FF" fontFamily="Arial Black" fontSize="18">$50</text>
          </g>

          {/* Card 2 — red, slight right tilt */}
          <g transform="translate(258, 95) rotate(7)">
            <rect x="0" y="0" width="145" height="90" rx="9" fill="#DC2626" />
            <rect x="0" y="65" width="145" height="18" fill="#B91C1C" />
            <rect x="8" y="8" width="42" height="28" rx="4" fill="#FCA5A5" />
            <text x="72" y="38" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="10">GIFT CARD</text>
            <text x="72" y="56" textAnchor="middle" fill="#FEE2E2" fontFamily="Arial Black" fontSize="18">$25</text>
          </g>

          {/* Card 3 — teal */}
          <g transform="translate(432, 110) rotate(-3)">
            <rect x="0" y="0" width="145" height="90" rx="9" fill="#0D9488" />
            <rect x="0" y="65" width="145" height="18" fill="#0F766E" />
            <rect x="8" y="8" width="42" height="28" rx="4" fill="#99F6E4" />
            <text x="72" y="38" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="10">GIFT CARD</text>
            <text x="72" y="56" textAnchor="middle" fill="#CCFBF1" fontFamily="Arial Black" fontSize="18">$100</text>
          </g>
        </svg>

        {/* Headline */}
        <div
          style={{
            opacity: headOp,
            transform: `translateY(${headY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <p style={headline(52, WHITE)}>YOUR DRAWER HAS</p>
          <p style={{ ...headline(128, ACCENT), lineHeight: 1 }}>$175</p>
          <p style={headline(52, WHITE)}>IN DEAD MONEY</p>
        </div>

        <p style={{ ...headline(28, '#6B7280'), opacity: subOp }}>
          AND RETAILERS PLANNED IT THAT WAY
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Three friction obstacles — designed on purpose ─────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p1Spring = spring({ frame: Math.max(0, frame - 30), fps: 30, config: { damping: 14, stiffness: 80 } });
  const p2Spring = spring({ frame: Math.max(0, frame - 58), fps: 30, config: { damping: 14, stiffness: 80 } });
  const p3Spring = spring({ frame: Math.max(0, frame - 86), fps: 30, config: { damping: 14, stiffness: 80 } });
  const p1Y = interpolate(p1Spring, [0, 1], [260, 0]);
  const p2Y = interpolate(p2Spring, [0, 1], [260, 0]);
  const p3Y = interpolate(p3Spring, [0, 1], [260, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 50,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headOp, textAlign: 'center' as const }}>
          <p style={headline(42, BLACK)}>EVERY OBSTACLE</p>
          <p style={headline(42, '#DC2626')}>WAS DESIGNED ON PURPOSE</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
          {/* Panel 1: Expiration */}
          <div
            style={{
              transform: `translateY(${p1Y}px)`,
              background: '#FEE2E2',
              borderRadius: 20,
              padding: '32px 24px',
              width: 275,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#DC2626" strokeWidth="4" />
              <line x1="40" y1="18" x2="40" y2="40" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
              <line x1="40" y1="40" x2="54" y2="50" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
              <line x1="20" y1="20" x2="60" y2="60" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="20" x2="20" y2="60" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p style={headline(24, '#991B1B')}>EXPIRATION</p>
            <p style={headline(20, '#991B1B')}>FEES</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: '#6B7280', textAlign: 'center' as const }}>
              Inactivity fees drain your balance after 12 months
            </p>
          </div>

          {/* Panel 2: Limited merchants */}
          <div
            style={{
              transform: `translateY(${p2Y}px)`,
              background: '#FEF3C7',
              borderRadius: 20,
              padding: '32px 24px',
              width: 275,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <rect x="18" y="40" width="44" height="30" rx="6" fill="none" stroke="#D97706" strokeWidth="4" />
              <path d="M28 40 V28 Q28 14 40 14 Q52 14 52 28 V40" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
              <circle cx="40" cy="56" r="5" fill="#D97706" />
            </svg>
            <p style={headline(24, '#92400E')}>LIMITED</p>
            <p style={headline(20, '#92400E')}>MERCHANTS</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: '#6B7280', textAlign: 'center' as const }}>
              Only works at one store you rarely visit anyway
            </p>
          </div>

          {/* Panel 3: Checkout friction */}
          <div
            style={{
              transform: `translateY(${p3Y}px)`,
              background: '#EDE9FE',
              borderRadius: 20,
              padding: '32px 24px',
              width: 275,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <rect x="10" y="16" width="60" height="48" rx="5" fill="none" stroke="#7C3AED" strokeWidth="4" />
              <rect x="10" y="16" width="60" height="16" rx="5" fill="#7C3AED" fillOpacity="0.3" />
              <line x1="20" y1="44" x2="60" y2="44" stroke="#7C3AED" strokeWidth="2" />
              <line x1="20" y1="56" x2="45" y2="56" stroke="#7C3AED" strokeWidth="2" />
              <line x1="50" y1="48" x2="63" y2="61" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="63" y1="48" x2="50" y2="61" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p style={headline(24, '#4C1D95')}>CHECKOUT</p>
            <p style={headline(20, '#4C1D95')}>FRICTION</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 17, color: '#6B7280', textAlign: 'center' as const }}>
              Separate entry field discourages every online order
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: "BREAKAGE" — retailer's accounting term for your forgotten money ─
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const wordSpring = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 12, stiffness: 120 } });
  const wordScale = interpolate(wordSpring, [0, 1], [0.3, 1]);

  const subOp = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diagOp = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d1X = interpolate(frame, [65, 155], [220, 710], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2X = interpolate(frame, [90, 180], [220, 710], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3X = interpolate(frame, [115, 205], [220, 710], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '80px 60px',
        }}
      >
        <p style={headline(36, '#6B7280')}>RETAILERS CALL IT</p>
        <p style={{ ...headline(104, ACCENT), transform: `scale(${wordScale})`, lineHeight: 1 }}>
          "BREAKAGE"
        </p>
        <p style={{ ...headline(30, WHITE), opacity: subOp }}>
          their word for your forgotten money
        </p>

        {/* Person → dollars → Store diagram */}
        <svg width="900" height="220" viewBox="0 0 900 220" style={{ opacity: diagOp }}>
          {/* Person silhouette */}
          <circle cx="110" cy="68" r="32" fill="#374151" />
          <path d="M70 103 Q110 86 150 103 L160 190 L60 190 Z" fill="#374151" />
          <text x="110" y="210" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial Black" fontSize="18">YOU</text>

          {/* Dashed arrow track */}
          <line x1="188" y1="118" x2="728" y2="118" stroke="#2D3F52" strokeWidth="3" strokeDasharray="12 6" />

          {/* Animated dollar signs */}
          <text x={d1X} y="108" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="34">$</text>
          <text x={d2X} y="134" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="28">$</text>
          <text x={d3X} y="112" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="30">$</text>

          {/* Store building */}
          <rect x="735" y="52" width="138" height="138" rx="5" fill="#1E3A2F" stroke={ACCENT} strokeWidth="2" />
          <polygon points="735,52 804,12 873,52" fill="#166534" />
          <rect x="762" y="128" width="34" height="62" rx="3" fill={ACCENT} fillOpacity="0.5" />
          <rect x="810" y="128" width="34" height="50" rx="3" fill="#374151" />
          <text x="804" y="210" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial Black" fontSize="18">STORE</text>
        </svg>

        <p style={{ ...headline(52, ACCENT), opacity: numOp }}>$1 BILLION / YEAR</p>
        <p style={{ ...headline(26, '#9CA3AF'), opacity: numOp }}>in pure breakage profit for retailers</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Brain glitch — gift card preferred but spent 40% less ───────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSpring = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 14, stiffness: 80 } });
  const rightSpring = spring({ frame: Math.max(0, frame - 55), fps: 30, config: { damping: 14, stiffness: 80 } });
  const leftX = interpolate(leftSpring, [0, 1], [-400, 0]);
  const rightX = interpolate(rightSpring, [0, 1], [400, 0]);
  const vsOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 50,
          padding: '80px 60px',
        }}
      >
        <div style={{ opacity: headOp, textAlign: 'center' as const }}>
          <p style={headline(52, BLACK)}>THE BRAIN</p>
          <p style={headline(52, ACCENT)}>GLITCH</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 40 }}>
          {/* Left: Prefers gift card */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              background: '#D1FAE5',
              borderRadius: 24,
              padding: '36px 28px',
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width="100" height="110" viewBox="0 0 100 110">
              <circle cx="50" cy="36" r="28" fill={ACCENT} />
              <circle cx="40" cy="28" r="4" fill="white" />
              <circle cx="60" cy="28" r="4" fill="white" />
              <path d="M36 44 Q50 56 64 44" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <rect x="18" y="74" width="64" height="30" rx="5" fill="#7C3AED" />
              <rect x="18" y="90" width="64" height="10" rx="0" fill="#6D28D9" />
              <text x="50" y="85" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="8">$25 GIFT CARD</text>
            </svg>
            <p style={headline(30, '#065F46')}>FEELS BETTER</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 18, color: '#374151', textAlign: 'center' as const }}>
              Brain values gift card above equivalent cash
            </p>
          </div>

          <p style={{ ...headline(52, '#9CA3AF'), opacity: vsOp }}>VS</p>

          {/* Right: Spent less */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              background: '#FEE2E2',
              borderRadius: 24,
              padding: '36px 28px',
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <svg width="100" height="110" viewBox="0 0 100 110">
              <circle cx="50" cy="36" r="28" fill="#DC2626" />
              <circle cx="40" cy="28" r="4" fill="white" />
              <circle cx="60" cy="28" r="4" fill="white" />
              <path d="M36 50 Q50 41 64 50" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <text x="26" y="28" fill="white" fontFamily="Arial Black" fontSize="14">?</text>
              <text x="66" y="28" fill="white" fontFamily="Arial Black" fontSize="14">?</text>
              <rect x="18" y="74" width="64" height="30" rx="5" fill="#9CA3AF" />
              <text x="50" y="93" textAnchor="middle" fill="#D1D5DB" fontFamily="Arial" fontSize="9">FORGOTTEN</text>
            </svg>
            <p style={headline(30, '#991B1B')}>SPENT 40% LESS</p>
            <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 18, color: '#374151', textAlign: 'center' as const }}>
              But actually used far less than equivalent cash
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: $21 billion counter — the scale of the problem ─────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const counterVal = interpolate(frame, [20, 150], [0, 21], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const barWidth = interpolate(frame, [20, 150], [0, 860], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat1Op = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '80px 60px',
        }}
      >
        <p style={{ ...headline(34, '#9CA3AF'), opacity: titleOp }}>UNSPENT GIFT CARDS IN AMERICA</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 20 }}>
          <p style={{ ...headline(144, ACCENT), lineHeight: 1 }}>
            ${Math.floor(counterVal)}
          </p>
          <p style={{ ...headline(56, WHITE), marginBottom: 16 }}>BILLION</p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 860, background: '#1F2937', borderRadius: 12, height: 24, overflow: 'hidden' }}>
          <div style={{ width: barWidth, height: 24, background: ACCENT, borderRadius: 12 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 36 }}>
          <div
            style={{
              opacity: stat1Op,
              background: '#1A2535',
              borderRadius: 16,
              padding: '28px 36px',
              textAlign: 'center' as const,
            }}
          >
            <p style={headline(58, ACCENT)}>$175</p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 20,
                color: '#9CA3AF',
                marginTop: 10,
                textAlign: 'center' as const,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
              }}
            >
              per household, sitting idle
            </p>
          </div>
          <div
            style={{
              opacity: stat2Op,
              background: '#1A2535',
              borderRadius: 16,
              padding: '28px 36px',
              textAlign: 'center' as const,
            }}
          >
            <p style={headline(58, '#EF4444')}>$3B</p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 20,
                color: '#9CA3AF',
                marginTop: 10,
                textAlign: 'center' as const,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
              }}
            >
              expires unused every year
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — check your cards, spend or sell ──────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const step1Op = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '80px 60px',
        }}
      >
        <div style={{ textAlign: 'center' as const }}>
          <p style={headline(52, BLACK)}>DON'T LET</p>
          <p style={headline(52, ACCENT)}>THEM WIN</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 50 }}>
          {/* Phone SVG */}
          <svg
            width="190"
            height="310"
            viewBox="0 0 190 310"
            style={{ transform: `scale(${phoneSpring})` }}
          >
            <rect x="10" y="5" width="170" height="300" rx="20" fill="#1F2937" />
            <rect x="25" y="25" width="140" height="250" rx="10" fill="#111827" />
            <rect x="35" y="35" width="120" height="70" rx="8" fill="#7C3AED" />
            <text x="95" y="58" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="9">GIFT CARD BALANCE</text>
            <text x="95" y="80" textAnchor="middle" fill="#E9D5FF" fontFamily="Arial Black" fontSize="20">$175.00</text>
            <rect x="35" y="115" width="120" height="28" rx="6" fill={ACCENT} />
            <text x="95" y="133" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="11">USE BALANCE</text>
            <rect x="35" y="153" width="55" height="20" rx="4" fill="#1F2937" />
            <text x="62" y="166" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial" fontSize="8">Amazon $50</text>
            <rect x="100" y="153" width="55" height="20" rx="4" fill="#1F2937" />
            <text x="127" y="166" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial" fontSize="8">Target $25</text>
            <circle cx="95" cy="286" r="10" fill="#374151" />
          </svg>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 620 }}>
            <div
              style={{
                opacity: step1Op,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                background: '#F0FDF4',
                borderRadius: 14,
                padding: '18px 24px',
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, lineHeight: 1 }}>1</span>
              <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: BLACK, margin: 0 }}>
                Search your drawer, wallet, and old emails
              </p>
            </div>
            <div
              style={{
                opacity: step2Op,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                background: '#F0FDF4',
                borderRadius: 14,
                padding: '18px 24px',
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, lineHeight: 1 }}>2</span>
              <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: BLACK, margin: 0 }}>
                Use them at checkout before spending any cash
              </p>
            </div>
            <div
              style={{
                opacity: step3Op,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                background: '#F0FDF4',
                borderRadius: 14,
                padding: '18px 24px',
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, lineHeight: 1 }}>3</span>
              <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 20, color: BLACK, margin: 0 }}>
                Sell unwanted cards — get up to 92 cents on the dollar
              </p>
            </div>
          </div>
        </div>

        <p style={{ ...headline(34, ACCENT), opacity: ctaOp }}>
          FOLLOW FOR MORE MONEY PSYCHOLOGY
        </p>
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
