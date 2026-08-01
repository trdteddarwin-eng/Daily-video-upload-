import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const BG_DARK = '#0F1923';
const BG_LIGHT = '#F0F4F8';
const ACCENT = '#10B981';
const ACCENT_DARK = '#065F46';
const WHITE = '#F5F5F5';
const BLACK = '#0D1117';
const GRAY = '#64748B';
const DANGER = '#EF4444';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
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
  return (
    <AbsoluteFill style={{ background: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyT = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const labelOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const counterRaw = interpolate(frame, [40, 130], [0, 50000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const counterValue = Math.floor(counterRaw);

  const subOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ opacity: labelOpacity, marginBottom: 36 }}>
          <p style={headline(52, ACCENT)}>YOUR SAVINGS ACCOUNT</p>
        </div>

        <div
          style={{
            transform: `scale(${piggyT})`,
            transformOrigin: 'center center',
            marginBottom: 44,
          }}
        >
          <svg width="520" height="400" viewBox="0 0 520 400">
            {/* Body */}
            <ellipse cx="220" cy="228" rx="185" ry="145" fill="#F4A7B9" stroke={ACCENT} strokeWidth="7" />
            {/* Head */}
            <circle cx="375" cy="183" r="115" fill="#F4A7B9" stroke={ACCENT} strokeWidth="7" />
            {/* Ear outer */}
            <ellipse cx="390" cy="74" rx="40" ry="58" fill="#F4A7B9" stroke={ACCENT} strokeWidth="6" />
            {/* Ear inner */}
            <ellipse cx="390" cy="78" rx="24" ry="38" fill="#F29FB1" />
            {/* Eye */}
            <circle cx="424" cy="160" r="20" fill={BLACK} />
            <circle cx="430" cy="154" r="7" fill={WHITE} />
            {/* Snout */}
            <ellipse cx="460" cy="218" rx="52" ry="42" fill="#F29FB1" stroke={ACCENT} strokeWidth="5" />
            {/* Nostril left */}
            <circle cx="445" cy="224" r="11" fill="#C06075" />
            {/* Nostril right */}
            <circle cx="474" cy="224" r="11" fill="#C06075" />
            {/* Leg front-left */}
            <rect x="75" y="334" width="58" height="56" rx="14" fill="#F4A7B9" stroke={ACCENT} strokeWidth="5" />
            {/* Leg front-right */}
            <rect x="150" y="334" width="58" height="56" rx="14" fill="#F4A7B9" stroke={ACCENT} strokeWidth="5" />
            {/* Leg back-left */}
            <rect x="225" y="334" width="58" height="56" rx="14" fill="#F4A7B9" stroke={ACCENT} strokeWidth="5" />
            {/* Leg back-right */}
            <rect x="295" y="334" width="58" height="56" rx="14" fill="#F4A7B9" stroke={ACCENT} strokeWidth="5" />
            {/* Tail */}
            <path d="M42 198 Q18 153 38 118 Q54 88 42 60" stroke={ACCENT} strokeWidth="9" fill="none" strokeLinecap="round" />
            {/* Coin slot */}
            <rect x="178" y="86" width="75" height="15" rx="7" fill={ACCENT_DARK} />
            {/* Dollar sign */}
            <text x="215" y="254" fontFamily={FONT} fontSize="80" fill={ACCENT} textAnchor="middle" fontWeight="900">$</text>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 108,
              color: WHITE,
              margin: 0,
              letterSpacing: '0.03em',
            }}
          >
            ${counterValue.toLocaleString()}
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 46,
              color: GRAY,
              margin: '18px 0 0',
              fontStyle: 'italic',
              opacity: subOpacity,
            }}
          >
            feels responsible, right?
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 1

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const greenT = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const greenX = interpolate(greenT, [0, 1], [-700, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const redT = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 80 } });
  const redX = interpolate(redT, [0, 1], [700, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 50px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 44 }}>
          <p style={headline(50, BLACK)}>THE RULE EXPERTS AGREE ON</p>
        </div>

        <div style={{ display: 'flex', gap: 32, width: '100%' }}>
          {/* Green panel - keep this */}
          <div
            style={{
              transform: `translateX(${greenX}px)`,
              flex: 1,
              background: ACCENT,
              borderRadius: 28,
              padding: '44px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg width="120" height="128" viewBox="0 0 120 128">
              {/* Coin stack */}
              <ellipse cx="60" cy="112" rx="52" ry="16" fill="#047857" />
              <rect x="8" y="79" width="104" height="36" rx="6" fill="#059669" />
              <ellipse cx="60" cy="79" rx="52" ry="16" fill="#34D399" />
              <ellipse cx="60" cy="57" rx="52" ry="16" fill="#047857" />
              <rect x="8" y="26" width="104" height="34" rx="6" fill="#059669" />
              <ellipse cx="60" cy="26" rx="52" ry="16" fill="#34D399" />
              <text x="60" y="53" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={WHITE} fontWeight="900">$</text>
              <text x="60" y="97" textAnchor="middle" fontFamily={FONT} fontSize="20" fill={WHITE} fontWeight="900">$</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, textAlign: 'center', margin: '16px 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              3–6 MONTHS
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 27, color: WHITE, textAlign: 'center', margin: 0, opacity: 0.9 }}>
              emergency fund
            </p>
            <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.22)', borderRadius: 50, padding: '8px 22px' }}>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>✓ KEEP THIS</p>
            </div>
          </div>

          {/* Red panel - excess cash */}
          <div
            style={{
              transform: `translateX(${redX}px)`,
              flex: 1,
              background: DANGER,
              borderRadius: 28,
              padding: '44px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg width="120" height="128" viewBox="0 0 120 128">
              {/* Draining money circle */}
              <circle cx="60" cy="46" r="40" fill="#B91C1C" stroke={WHITE} strokeWidth="5" />
              <text x="60" y="60" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={WHITE} fontWeight="900">$</text>
              {/* Drip drops */}
              <ellipse cx="40" cy="102" rx="12" ry="18" fill="#FCA5A5" />
              <ellipse cx="60" cy="114" rx="12" ry="18" fill="#FCA5A5" />
              <ellipse cx="80" cy="100" rx="12" ry="18" fill="#FCA5A5" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, textAlign: 'center', margin: '16px 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ABOVE THAT
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 27, color: WHITE, textAlign: 'center', margin: 0, opacity: 0.9 }}>
              dead weight
            </p>
            <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.18)', borderRadius: 50, padding: '8px 22px' }}>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>✗ LOSING VALUE</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: subOpacity, marginTop: 36 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, textAlign: 'center', margin: 0 }}>
            Inflation eats the excess every single year
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 2

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftT = spring({ frame, fps, config: { damping: 18, stiffness: 65 } });
  const rightT = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 18, stiffness: 65 } });

  const MAX_H = 560;
  const SAVINGS_RATIO = 162 / 872;
  const leftH = leftT * MAX_H * SAVINGS_RATIO;
  const rightH = rightT * MAX_H;

  const numOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '80px 60px 50px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 16 }}>
          <p style={headline(52, WHITE)}>30-YEAR MATH</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, textAlign: 'center', margin: '10px 0 0' }}>
            Starting with $50,000
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 80,
            marginTop: 40,
            height: MAX_H + 120,
          }}
        >
          {/* Savings bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: numOpacity, marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 52, color: GRAY, margin: 0 }}>$162K</p>
            </div>
            <div
              style={{
                width: 190,
                height: Math.max(0, leftH),
                background: `linear-gradient(to top, ${ACCENT_DARK}, #6EE7B7)`,
                borderRadius: '12px 12px 0 0',
                opacity: 0.55,
              }}
            />
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: GRAY, margin: 0, textTransform: 'uppercase' }}>SAVINGS</p>
              <p style={{ fontFamily: FONT, fontSize: 26, color: GRAY, margin: '4px 0 0' }}>4% / YEAR</p>
            </div>
          </div>

          {/* Index fund bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: numOpacity, marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, margin: 0 }}>$872K</p>
            </div>
            <div
              style={{
                width: 190,
                height: Math.max(0, rightH),
                background: `linear-gradient(to top, ${ACCENT_DARK}, ${ACCENT})`,
                borderRadius: '12px 12px 0 0',
              }}
            />
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, textTransform: 'uppercase' }}>INDEX FUND</p>
              <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, margin: '4px 0 0' }}>10% AVG / YR</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 3

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const numT = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 80 } });
  const subOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 48 }}>
          <p style={headline(56, BLACK)}>THE GAP IS REAL</p>
        </div>

        <div
          style={{
            transform: `scale(${numT})`,
            transformOrigin: 'center center',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 170,
              color: ACCENT,
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            $710K
          </p>
        </div>

        <div style={{ opacity: subOpacity, marginTop: 44, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 44,
              color: GRAY,
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            Same $50,000 start.
            <br />
            30 years apart.
            <br />
            No extra risk.
          </p>
        </div>

        <div style={{ opacity: arrowOpacity, marginTop: 52 }}>
          <svg width="480" height="90" viewBox="0 0 480 90">
            <circle cx="38" cy="45" r="34" fill="#E2E8F0" />
            <text x="38" y="52" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={GRAY} fontWeight="900">LOW</text>
            <line x1="76" y1="45" x2="368" y2="45" stroke={ACCENT} strokeWidth="6" />
            <polygon points="366,30 412,45 366,60" fill={ACCENT} />
            <circle cx="445" cy="45" r="34" fill={ACCENT} />
            <text x="445" y="52" textAnchor="middle" fontFamily={FONT} fontSize="18" fill={WHITE} fontWeight="900">WIN</text>
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 4

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const figureOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const statT = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 80 } });
  const textOpacity = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 28 }}>
          <p style={headline(50, WHITE)}>WHY WE STAY STUCK</p>
        </div>

        {/* Person clutching money bag + downward market chart */}
        <div style={{ opacity: figureOpacity }}>
          <svg width="500" height="330" viewBox="0 0 500 330">
            {/* Person head */}
            <circle cx="160" cy="66" r="52" fill="#4B5563" stroke={WHITE} strokeWidth="4" />
            {/* Eyes */}
            <circle cx="143" cy="58" r="9" fill={WHITE} />
            <circle cx="177" cy="58" r="9" fill={WHITE} />
            {/* Frown */}
            <path d="M141,88 Q160,80 179,88" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Body */}
            <path d="M113,122 C93,118 79,160 83,208 L237,208 C241,160 227,118 207,122 L160,113 Z" fill="#374151" stroke={WHITE} strokeWidth="3" />
            {/* Left arm */}
            <path d="M87,156 C57,142 35,162 39,194 C39,205 51,211 73,206 L101,176" stroke="#374151" strokeWidth="26" fill="none" strokeLinecap="round" />
            {/* Right arm */}
            <path d="M233,156 C263,142 285,162 281,194 C281,205 269,211 247,206 L219,176" stroke="#374151" strokeWidth="26" fill="none" strokeLinecap="round" />
            {/* Money bag body */}
            <ellipse cx="160" cy="186" rx="72" ry="62" fill="#D97706" stroke={ACCENT} strokeWidth="5" />
            {/* Money bag tie */}
            <path d="M137,125 C137,110 183,110 183,125 L178,134 L142,134 Z" fill="#D97706" stroke={ACCENT} strokeWidth="5" />
            {/* Dollar on bag */}
            <text x="160" y="203" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE} fontWeight="900">$</text>
            {/* Market chart panel */}
            <rect x="300" y="48" width="190" height="234" rx="14" fill="#1E293B" />
            <text x="395" y="80" textAnchor="middle" fontFamily={FONT_BODY} fontSize="20" fill={GRAY}>MARKET</text>
            {/* Downward line */}
            <polyline
              points="315,102 337,112 359,107 381,130 403,144 425,170 447,176 477,204"
              fill="none"
              stroke={DANGER}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Down arrow */}
            <line x1="395" y1="260" x2="395" y2="230" stroke={DANGER} strokeWidth="6" strokeLinecap="round" />
            <polygon points="380,244 395,268 410,244" fill={DANGER} />
          </svg>
        </div>

        {/* 66% stat */}
        <div
          style={{
            transform: `scale(${statT})`,
            transformOrigin: 'center center',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 124, color: DANGER, margin: 0, letterSpacing: '0.02em' }}>
            66%
          </p>
          <p style={{ fontFamily: FONT, fontSize: 33, color: WHITE, margin: '-8px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            OF AMERICANS HOLD TOO MUCH
          </p>
        </div>

        <div style={{ opacity: textOpacity, marginTop: 26 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
            Fear of crashes beats the math — every time.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 5

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const step1T = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 90 } });
  const step2T = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 14, stiffness: 90 } });
  const step3T = spring({ frame: Math.max(0, frame - 78), fps, config: { damping: 14, stiffness: 90 } });
  const ctaOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const steps = [
    { label: 'STEP 1', text: 'Calculate your 3-month expenses', t: step1T },
    { label: 'STEP 2', text: 'Keep only that amount liquid', t: step2T },
    { label: 'STEP 3', text: 'Invest everything above it', t: step3T },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 50px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 32 }}>
          <p style={headline(60, BLACK)}>THE 3-STEP FIX</p>
        </div>

        {/* Person with upward arrow */}
        <div style={{ marginBottom: 32 }}>
          <svg width="180" height="196" viewBox="0 0 180 196">
            {/* Person head */}
            <circle cx="90" cy="42" r="34" fill={ACCENT} />
            {/* Person body */}
            <path d="M54,80 C52,68 128,68 126,80 L130,166 L90,156 L50,166 Z" fill={ACCENT} />
            {/* Arrow up */}
            <line x1="90" y1="182" x2="90" y2="112" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
            <polygon points="70,126 90,98 110,126" fill={ACCENT} />
          </svg>
        </div>

        {/* Step cards */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((step, i) => {
            const xOffset = interpolate(step.t, [0, 1], [-900, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  transform: `translateX(${xOffset}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  background: i === 2 ? ACCENT : '#E0F2ED',
                  borderRadius: 20,
                  padding: '22px 30px',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    background: i === 2 ? WHITE : ACCENT,
                    borderRadius: 50,
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <p style={{ fontFamily: FONT, fontSize: 30, color: i === 2 ? ACCENT : WHITE, margin: 0 }}>
                    {i + 1}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT_DARK, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {step.label}
                  </p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 33, color: i === 2 ? WHITE : BLACK, margin: 0, fontWeight: 700 }}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: ctaOpacity, marginTop: 38 }}>
          <p style={{ fontFamily: FONT, fontSize: 46, color: ACCENT, textAlign: 'center', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            FOLLOW FOR MORE
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, textAlign: 'center', margin: '10px 0 0' }}>
            daily money psychology
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
