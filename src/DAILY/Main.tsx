import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1 — Hook: The fake sale tag ───────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const tagY = interpolate(tagSpring, [0, 1], [-300, 0]);

  const personFade = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strikeFade = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.2, 1]);
  const badgeFade = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        {/* Sale tag */}
        <div style={{ transform: `translateY(${tagY}px)`, marginBottom: 28 }}>
          <svg width={290} height={185} viewBox="0 0 290 185">
            <path d="M20,10 L270,10 L270,155 L145,180 L20,155 Z" fill="#1E1E1E" stroke={ACCENT} strokeWidth={3} />
            <circle cx={145} cy={32} r={13} fill={BG_DARK} stroke={ACCENT} strokeWidth={2} />
            <text x={145} y={74} fontFamily={FONT} fontSize="24" fill="#888" textAnchor="middle" fontWeight="bold">WAS $199</text>
            <line x1={55} y1={70} x2={235} y2={70} stroke={ACCENT} strokeWidth={3.5} opacity={strikeFade} />
            <text x={145} y={126} fontFamily={FONT} fontSize="52" fill={WHITE} textAnchor="middle" fontWeight="bold">$97</text>
            <text x={145} y={152} fontFamily={FONT} fontSize="18" fill={ACCENT} textAnchor="middle" fontWeight="bold">NOW</text>
          </svg>
        </div>

        {/* Excited person silhouette */}
        <div style={{ opacity: personFade, marginBottom: 24 }}>
          <svg width={100} height={130} viewBox="0 0 100 130">
            <circle cx={50} cy={20} r={18} fill="#555" />
            <rect x={24} y={40} width={52} height={55} rx={12} fill="#555" />
            <line x1={24} y1={55} x2={4} y2={25} stroke="#555" strokeWidth={14} strokeLinecap="round" />
            <line x1={76} y1={55} x2={96} y2={25} stroke="#555" strokeWidth={14} strokeLinecap="round" />
          </svg>
        </div>

        {/* NEVER REAL badge */}
        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale}) rotate(-8deg)`,
          background: ACCENT,
          borderRadius: 16,
          padding: '14px 44px',
          textAlign: 'center' as const,
        }}>
          <p style={headline(46, WHITE)}>NEVER REAL</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S1-END

// ─── Scene 2 — Reference pricing mechanism ───────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const step1Spring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const step1Scale = interpolate(step1Spring, [0, 1], [0, 1]);

  const step2Fade = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Fade = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bigSpring = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 12, stiffness: 80 } });
  const bigScale = interpolate(bigSpring, [0, 1], [0.5, 1]);
  const bigFade = interpolate(frame, [152, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bridgeFade = interpolate(frame, [198, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const connectorStyle: React.CSSProperties = { width: 3, height: 18, background: ACCENT, alignSelf: 'center' as const };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 20, textAlign: 'center' as const }}>
          <p style={headline(26, BLACK)}>HOW THEY DO IT</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          {/* Step 1 */}
          <div style={{
            transform: `scale(${step1Scale})`,
            width: 340,
            background: WHITE,
            border: '2px solid #E0E0E0',
            borderRadius: 12,
            padding: '12px 20px',
            textAlign: 'center' as const,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#999', letterSpacing: '0.08em', margin: '0 0 4px', textTransform: 'uppercase' as const }}>Step 1 — set the "original" price</p>
            <p style={headline(46, BLACK)}>$199</p>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#999', margin: '4px 0 0', letterSpacing: '0.04em' }}>units sold at this price: 0</p>
          </div>

          <div style={{ ...connectorStyle, opacity: step2Fade }} />

          {/* Step 2 */}
          <div style={{
            opacity: step2Fade,
            width: 340,
            background: WHITE,
            border: `2px solid ${ACCENT}`,
            borderRadius: 12,
            padding: '12px 20px',
            textAlign: 'center' as const,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#999', letterSpacing: '0.08em', margin: '0 0 4px', textTransform: 'uppercase' as const }}>Step 2 — mark it "on sale"</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
              <span style={{ fontFamily: FONT, fontSize: 28, color: '#BBB', textDecoration: 'line-through' }}>$199</span>
              <span style={{ fontFamily: FONT, fontSize: 48, color: ACCENT, fontWeight: 'bold' }}>$97</span>
            </div>
          </div>

          <div style={{ ...connectorStyle, opacity: step3Fade }} />

          {/* Step 3 */}
          <div style={{
            opacity: step3Fade,
            width: 340,
            background: ACCENT,
            borderRadius: 12,
            padding: '12px 20px',
            textAlign: 'center' as const,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: WHITE, letterSpacing: '0.08em', margin: '0 0 4px', textTransform: 'uppercase' as const }}>Step 3 — you feel like you won</p>
            <p style={headline(22, WHITE)}>You didn't.</p>
          </div>
        </div>

        <div style={{ opacity: bigFade, transform: `scale(${bigScale})`, textAlign: 'center' as const, marginBottom: 10 }}>
          <p style={headline(30, BLACK)}>LEGAL. EVERYWHERE.</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.04em', textAlign: 'center' as const, margin: 0 }}>
            the FTC has receipts — 85% of the time
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S2-END

// ─── Scene 3 — FTC evidence / Amazon lawsuit ─────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const gavelSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 80 } });
  const gavelY = interpolate(gavelSpring, [0, 1], [-220, 0]);

  const docFade = interpolate(frame, [55, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statSpring = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 100 } });
  const statScale = interpolate(statSpring, [0, 1], [0.3, 1]);
  const statFade = interpolate(frame, [130, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bridgeFade = interpolate(frame, [192, 212], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 20, textAlign: 'center' as const }}>
          <p style={headline(26, WHITE)}>THE FTC PROVED IT</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Gavel */}
        <div style={{ transform: `translateY(${gavelY}px)`, marginBottom: 16 }}>
          <svg width={150} height={110} viewBox="0 0 150 110">
            <rect x={60} y={8} width={68} height={34} rx={9} fill="#8B7355" />
            <rect x={58} y={6} width={9} height={38} rx={3} fill="#6B5335" />
            <rect x={10} y={50} width={90} height={18} rx={9} fill="#6B5335" transform="rotate(-35 55 59)" />
            <rect x={12} y={76} width={120} height={24} rx={7} fill="#4A3728" />
          </svg>
        </div>

        {/* FTC document card */}
        <div style={{
          opacity: docFade,
          width: 340,
          background: '#1A1A1A',
          border: `2px solid ${ACCENT}`,
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 16,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 11, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>FTC Investigation Findings</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '0 0 8px', lineHeight: 1.4 }}>
            "85% of items listed with a 'compare at' price were never sold at that figure."
          </p>
          <p style={{ fontFamily: FONT, fontSize: 11, color: '#555', margin: 0, letterSpacing: '0.04em' }}>AMAZON CLASS ACTION · SETTLED 2022</p>
        </div>

        {/* 85% stat badge */}
        <div style={{
          opacity: statFade,
          transform: `scale(${statScale})`,
          background: ACCENT,
          borderRadius: 16,
          padding: '16px 44px',
          textAlign: 'center' as const,
        }}>
          <p style={{ ...headline(14, WHITE), marginBottom: 6 }}>REFERENCE PRICES THAT WERE FAKE</p>
          <p style={headline(68, WHITE)}>85%</p>
        </div>

        <div style={{ opacity: bridgeFade, marginTop: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.04em', textAlign: 'center' as const, margin: 0 }}>
            your brain trusts those numbers — and that's why it works
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S3-END

// ─── Scene 4 — Brain anchoring psychology ────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const brainSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 16, stiffness: 60 } });
  const brainScale = interpolate(brainSpring, [0, 1], [0, 1]);

  const bar1Width = interpolate(frame, [72, 130], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Width = interpolate(frame, [105, 163], [0, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelSpring = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 100 } });
  const labelScale = interpolate(labelSpring, [0, 1], [0.5, 1]);
  const labelFade = interpolate(frame, [165, 183], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bridgeFade = interpolate(frame, [196, 216], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 18, textAlign: 'center' as const }}>
          <p style={headline(24, BLACK)}>WHY YOUR BRAIN FALLS FOR IT</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Brain SVG */}
        <div style={{ transform: `scale(${brainScale})`, marginBottom: 20 }}>
          <svg width={100} height={88} viewBox="0 0 100 88">
            <ellipse cx={50} cy={44} rx={44} ry={36} fill="#E8D5C4" stroke="#C9A98A" strokeWidth={2} />
            <path d="M50,14 Q70,20 72,34 Q78,40 70,50 Q76,58 68,66 Q60,72 50,68" fill="none" stroke="#C9A98A" strokeWidth={2} />
            <path d="M50,14 Q30,20 28,34 Q22,40 30,50 Q24,58 32,66 Q40,72 50,68" fill="none" stroke="#C9A98A" strokeWidth={2} />
            <line x1={50} y1={14} x2={50} y2={68} stroke="#C9A98A" strokeWidth={1.5} />
          </svg>
        </div>

        {/* Comparison bars */}
        <div style={{ width: 340, marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 12, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>you see $199 first — anchors your brain</p>
          <div style={{ height: 38, background: '#E0E0E0', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ width: bar1Width, height: '100%', background: '#BBBBBB', borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
              <span style={{ fontFamily: FONT, fontSize: 15, color: BLACK, letterSpacing: '0.06em', fontWeight: 'bold' }}>$199</span>
            </div>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 12, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 8px' }}>then $97 feels tiny — feels safe to buy</p>
          <div style={{ height: 38, background: '#E0E0E0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ width: bar2Width, height: '100%', background: ACCENT, borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
              <span style={{ fontFamily: FONT, fontSize: 15, color: WHITE, letterSpacing: '0.06em', fontWeight: 'bold' }}>$97</span>
            </div>
          </div>
        </div>

        <div style={{ opacity: labelFade, transform: `scale(${labelScale})`, background: ACCENT, borderRadius: 12, padding: '12px 36px', textAlign: 'center' as const, marginBottom: 12 }}>
          <p style={headline(24, WHITE)}>YOUR BRAIN IS HACKED</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.04em', textAlign: 'center' as const, margin: 0 }}>
            and it's costing you thousands a year
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S4-END

// ─── Scene 5 — Annual cost: $2,600 ───────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bag1Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 100 } });
  const bag1Y = interpolate(bag1Spring, [0, 1], [320, 0]);

  const bag2Spring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 100 } });
  const bag2Y = interpolate(bag2Spring, [0, 1], [320, 0]);

  const bag3Spring = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 14, stiffness: 100 } });
  const bag3Y = interpolate(bag3Spring, [0, 1], [320, 0]);

  const totalProgress = interpolate(frame, [108, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalAmount = Math.floor(totalProgress * 2600);

  const bridgeFade = interpolate(frame, [198, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 24, textAlign: 'center' as const }}>
          <p style={headline(26, WHITE)}>THE ANNUAL DAMAGE</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Three shopping bags */}
        <div style={{ display: 'flex', gap: 30, marginBottom: 32, alignItems: 'flex-end' }}>

          {/* Clothing bag */}
          <div style={{ transform: `translateY(${bag1Y}px)`, textAlign: 'center' as const }}>
            <svg width={80} height={100} viewBox="0 0 80 100">
              <rect x={8} y={28} width={64} height={64} rx={8} fill="#1E1E1E" stroke={ACCENT} strokeWidth={2} />
              <path d="M28,28 Q28,10 40,10 Q52,10 52,28" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
              <path d="M24,50 L30,46 L36,52 L36,72 L44,72 L44,52 L50,46 L56,50 L50,56 L50,72 L30,72 L30,56 Z" fill={ACCENT} opacity={0.85} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 10, color: '#666', margin: '4px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Clothing</p>
          </div>

          {/* Electronics bag */}
          <div style={{ transform: `translateY(${bag2Y}px)`, textAlign: 'center' as const }}>
            <svg width={80} height={100} viewBox="0 0 80 100">
              <rect x={8} y={28} width={64} height={64} rx={8} fill="#1E1E1E" stroke={ACCENT} strokeWidth={2} />
              <path d="M28,28 Q28,10 40,10 Q52,10 52,28" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
              <rect x={20} y={48} width={40} height={26} rx={4} fill="none" stroke={ACCENT} strokeWidth={2} />
              <rect x={14} y={74} width={52} height={5} rx={2.5} fill={ACCENT} opacity={0.85} />
              <circle cx={40} cy={61} r={4} fill={ACCENT} opacity={0.85} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 10, color: '#666', margin: '4px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Electronics</p>
          </div>

          {/* Home goods bag */}
          <div style={{ transform: `translateY(${bag3Y}px)`, textAlign: 'center' as const }}>
            <svg width={80} height={100} viewBox="0 0 80 100">
              <rect x={8} y={28} width={64} height={64} rx={8} fill="#1E1E1E" stroke={ACCENT} strokeWidth={2} />
              <path d="M28,28 Q28,10 40,10 Q52,10 52,28" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
              <polygon points="40,44 20,62 60,62" fill={ACCENT} opacity={0.85} />
              <rect x={28} y={62} width={24} height={18} rx={3} fill={ACCENT} opacity={0.85} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 10, color: '#666', margin: '4px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Home</p>
          </div>

        </div>

        {/* Rolling counter */}
        <div style={{ textAlign: 'center' as const, marginBottom: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 4px' }}>drained per year:</p>
          <p style={headline(88, ACCENT)}>${totalAmount.toLocaleString()}</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.04em', textAlign: 'center' as const, margin: 0 }}>
            that "deal" feeling has been costing you
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S5-END

// ─── Scene 6 — CTA: Check the real price ─────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const phoneSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 16, stiffness: 70 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [320, 0]);

  const graphProgress = interpolate(frame, [55, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tip1Fade = interpolate(frame, [135, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tip2Fade = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 182), fps, config: { damping: 12, stiffness: 100 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.4, 1]);
  const ctaFade = interpolate(frame, [182, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Graph points: x from 0 to 176, y values (0=top, 80=bottom within chart)
  // Fake high start (reference price level), then drops to real price
  const allPoints: Array<[number, number]> = [
    [0, 10],
    [44, 12],
    [88, 58],
    [132, 62],
    [176, 60],
  ];
  const clippedX = graphProgress * 176;
  const visiblePoints = allPoints.filter(([x]) => x <= clippedX);
  // Always include interpolated current endpoint
  if (visiblePoints.length > 0 && clippedX < 176) {
    const last = visiblePoints[visiblePoints.length - 1];
    const nextIdx = allPoints.findIndex(([x]) => x > clippedX);
    if (nextIdx > 0) {
      const prev = allPoints[nextIdx - 1];
      const next = allPoints[nextIdx];
      const t = (clippedX - prev[0]) / (next[0] - prev[0]);
      const interpY = prev[1] + t * (next[1] - prev[1]);
      if (last[0] < clippedX) {
        visiblePoints.push([clippedX, interpY]);
      }
    }
  }
  const pointsStr = visiblePoints.map(([x, y]) => `${x + 22},${y + 52}`).join(' ');

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 18, textAlign: 'center' as const }}>
          <p style={headline(24, BLACK)}>CHECK THE REAL PRICE</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Phone with price history chart */}
        <div style={{ transform: `translateY(${phoneY}px)`, marginBottom: 18 }}>
          <svg width={220} height={290} viewBox="0 0 220 290">
            {/* Phone frame */}
            <rect x={4} y={4} width={212} height={282} rx={22} fill="#1A1A1A" stroke="#333" strokeWidth={2} />
            <rect x={12} y={20} width={196} height={248} rx={8} fill={BG_LIGHT} />
            <rect x={78} y={8} width={64} height={8} rx={4} fill="#333" />
            <rect x={84} y={278} width={52} height={6} rx={3} fill="#333" />
            {/* Screen header */}
            <text x={110} y={38} fontFamily={FONT} fontSize="9" fill="#888" textAnchor="middle">PRICE HISTORY</text>
            {/* Chart area */}
            <rect x={20} y={46} width={180} height={100} rx={4} fill="#FAFAFA" stroke="#E8E8E8" strokeWidth={1} />
            {/* Reference price dotted line */}
            <line x1={20} y1={58} x2={200} y2={58} stroke="#DDD" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={202} y={62} fontFamily={FONT} fontSize="7" fill="#CCC" textAnchor="start">$199</text>
            {/* Real price animated line */}
            {visiblePoints.length > 1 && (
              <polyline
                points={pointsStr}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {/* Y label for real price */}
            <text x={110} y={160} fontFamily={FONT} fontSize="8" fill="#999" textAnchor="middle">actual avg ~$97</text>
            {/* Item row */}
            <rect x={20} y={168} width={180} height={36} rx={6} fill="#F0F0F0" />
            <text x={30} y={183} fontFamily={FONT} fontSize="9" fill={BLACK} fontWeight="bold">Listed "was": $199</text>
            <text x={30} y={197} fontFamily={FONT} fontSize="8" fill="#888">Never charged · actual: ~$97</text>
            {/* CTA bar */}
            <rect x={20} y={212} width={180} height={26} rx={5} fill={ACCENT} />
            <text x={110} y={229} fontFamily={FONT} fontSize="9" fill={WHITE} textAnchor="middle" fontWeight="bold">SEARCH PRICE HISTORY FIRST</text>
          </svg>
        </div>

        {/* Tips */}
        <div style={{ width: 340, marginBottom: 8 }}>
          <div style={{ opacity: tip1Fade, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, background: '#EFEFEF', borderRadius: 10, padding: '10px 16px' }}>
            <svg width={26} height={26} viewBox="0 0 26 26">
              <circle cx={13} cy={13} r={12} fill="#16A34A" />
              <polyline points="7,13 11,17 19,8" fill="none" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 13, color: BLACK, margin: 0, letterSpacing: '0.03em' }}>Look up the item's actual price history</p>
          </div>
          <div style={{ opacity: tip2Fade, display: 'flex', alignItems: 'center', gap: 12, background: '#EFEFEF', borderRadius: 10, padding: '10px 16px' }}>
            <svg width={26} height={26} viewBox="0 0 26 26">
              <circle cx={13} cy={13} r={12} fill="#16A34A" />
              <polyline points="7,13 11,17 19,8" fill="none" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 13, color: BLACK, margin: 0, letterSpacing: '0.03em' }}>If the "original" was fake — walk away</p>
          </div>
        </div>

        <div style={{
          opacity: ctaFade,
          transform: `scale(${ctaScale})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '14px 36px',
          textAlign: 'center' as const,
          marginTop: 8,
        }}>
          <p style={headline(20, WHITE)}>FOLLOW FOR MORE MONEY TRAPS</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────
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
