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

// ─── Scene 1 — Hook: The missing bill ────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const houseY = interpolate(houseSpring, [0, 1], [300, 0]);

  const calcFade = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const warningSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 120 } });
  const warningScale = interpolate(warningSpring, [0, 1], [0.2, 1]);
  const warningFade = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subtitleFade = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        {/* House SVG */}
        <div style={{ transform: `translateY(${houseY}px)`, marginBottom: 24 }}>
          <svg width={280} height={240} viewBox="0 0 280 240">
            <rect x={40} y={120} width={200} height={120} fill="#1E2A3A" stroke={ACCENT} strokeWidth={3} rx={4} />
            <polygon points="10,120 140,20 270,120" fill={ACCENT} />
            <rect x={108} y={180} width={64} height={60} fill={BG_DARK} rx={4} />
            <circle cx={160} cy={212} r={5} fill={ACCENT} />
            <rect x={55} y={138} width={52} height={46} fill={BG_DARK} rx={3} />
            <line x1={81} y1={138} x2={81} y2={184} stroke={ACCENT} strokeWidth={2} />
            <line x1={55} y1={161} x2={107} y2={161} stroke={ACCENT} strokeWidth={2} />
            <rect x={173} y={138} width={52} height={46} fill={BG_DARK} rx={3} />
            <line x1={199} y1={138} x2={199} y2={184} stroke={ACCENT} strokeWidth={2} />
            <line x1={173} y1={161} x2={225} y2={161} stroke={ACCENT} strokeWidth={2} />
          </svg>
        </div>

        {/* Checklist */}
        <div style={{ opacity: calcFade, marginBottom: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em', margin: 0 }}>
            ✓ MORTGAGE
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em', margin: '6px 0' }}>
            ✓ TAXES
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em', margin: 0 }}>
            ✓ INSURANCE
          </p>
        </div>

        {/* Warning badge */}
        <div style={{
          opacity: warningFade,
          transform: `scale(${warningScale})`,
          background: ACCENT,
          borderRadius: 16,
          padding: '20px 40px',
          marginBottom: 20,
          textAlign: 'center',
        }}>
          <p style={headline(44, BLACK)}>BUT MISSED</p>
          <p style={{ ...headline(44, BLACK), marginTop: 6 }}>ONE BIG BILL</p>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: subtitleFade }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', letterSpacing: '0.08em', textAlign: 'center', margin: 0 }}>
            and it adds up to $90,000
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S1-END

// ─── Scene 2 — The 1% Rule ───────────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const houseSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 15, stiffness: 100 } });
  const houseScale = interpolate(houseSpring, [0, 1], [0.5, 1]);

  const counterProgress = interpolate(frame, [60, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue = Math.floor(counterProgress * 4500);

  const ruleFade = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaFade = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 20, textAlign: 'center' }}>
          <p style={headline(34, BLACK)}>THE 1% RULE</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '12px auto 0' }} />
        </div>

        {/* House + 1% badge */}
        <div style={{ transform: `scale(${houseScale})`, marginBottom: 20 }}>
          <svg width={260} height={240} viewBox="0 0 260 240">
            <rect x={40} y={110} width={180} height={130} fill={ACCENT} rx={4} />
            <polygon points="10,110 130,15 250,110" fill={BLACK} />
            <rect x={98} y={170} width={58} height={70} fill={BG_DARK} rx={4} />
            <rect x={52} y={126} width={46} height={42} fill={BG_DARK} rx={3} />
            <rect x={162} y={126} width={46} height={42} fill={BG_DARK} rx={3} />
            <circle cx={215} cy={32} r={36} fill={BLACK} />
            <text x={215} y={48} fontFamily={FONT} fontSize="26" fill={ACCENT} textAnchor="middle" fontWeight="bold">1%</text>
          </svg>
        </div>

        {/* Rule card */}
        <div style={{
          opacity: ruleFade,
          background: BLACK,
          borderRadius: 16,
          padding: '18px 32px',
          width: 340,
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <p style={{ ...headline(16, '#888'), marginBottom: 8 }}>BUDGET ANNUALLY FOR MAINTENANCE</p>
          <p style={{ ...headline(22, WHITE) }}>1% OF YOUR HOME'S VALUE</p>
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>
            ON A $450,000 HOME:
          </p>
          <p style={headline(80, ACCENT)}>${counterValue.toLocaleString()}</p>
          <p style={{ ...headline(26, BLACK), marginTop: 4 }}>EVERY YEAR</p>
        </div>

        <div style={{ opacity: ctaFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>
            and most buyers never budget for it
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3 — The Major Repairs ─────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const item1Spring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 100 } });
  const item1X = interpolate(item1Spring, [0, 1], [-1200, 0]);

  const item2Spring = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 14, stiffness: 100 } });
  const item2X = interpolate(item2Spring, [0, 1], [-1200, 0]);

  const item3Spring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 14, stiffness: 100 } });
  const item3X = interpolate(item3Spring, [0, 1], [-1200, 0]);

  const bridgeFade = interpolate(frame, [185, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardStyle: React.CSSProperties = {
    width: 360,
    background: '#1E1E1E',
    borderRadius: 16,
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    marginBottom: 18,
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 28, textAlign: 'center' }}>
          <p style={headline(30, WHITE)}>THE REPAIRS ARE REAL</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '12px auto 0' }} />
        </div>

        {/* Roof */}
        <div style={{ transform: `translateX(${item1X}px)`, ...cardStyle }}>
          <svg width={60} height={54} viewBox="0 0 60 54">
            <polygon points="0,54 30,6 60,54" fill={ACCENT} />
            <rect x={8} y={38} width={44} height={16} fill="#7C5323" />
            <line x1={8} y1={44} x2={52} y2={44} stroke={ACCENT} strokeWidth={1.5} />
            <line x1={8} y1={50} x2={52} y2={50} stroke={ACCENT} strokeWidth={1.5} />
          </svg>
          <div>
            <p style={{ ...headline(16, WHITE), textAlign: 'left' as const }}>ROOF REPLACEMENT</p>
            <p style={{ ...headline(26, ACCENT), textAlign: 'left' as const }}>$8,000–$15,000</p>
          </div>
        </div>

        {/* HVAC */}
        <div style={{ transform: `translateX(${item2X}px)`, ...cardStyle }}>
          <svg width={60} height={54} viewBox="0 0 60 54">
            <rect x={4} y={4} width={52} height={46} rx={6} fill="#1A3A4A" stroke={ACCENT} strokeWidth={3} />
            <rect x={14} y={14} width={32} height={10} rx={3} fill={ACCENT} />
            <circle cx={30} cy={40} r={8} fill="none" stroke={ACCENT} strokeWidth={3} />
            <circle cx={30} cy={40} r={3} fill={ACCENT} />
          </svg>
          <div>
            <p style={{ ...headline(16, WHITE), textAlign: 'left' as const }}>HVAC SYSTEM</p>
            <p style={{ ...headline(26, ACCENT), textAlign: 'left' as const }}>$10,000–$12,000</p>
          </div>
        </div>

        {/* Water Heater */}
        <div style={{ transform: `translateX(${item3X}px)`, ...cardStyle, marginBottom: 0 }}>
          <svg width={60} height={54} viewBox="0 0 60 54">
            <rect x={16} y={4} width={28} height={38} rx={8} fill="#1A2A3A" stroke={ACCENT} strokeWidth={3} />
            <rect x={21} y={41} width={18} height={12} rx={3} fill={ACCENT} />
            <circle cx={30} cy={21} r={7} fill={ACCENT} opacity={0.4} />
            <circle cx={30} cy={21} r={4} fill={ACCENT} />
          </svg>
          <div>
            <p style={{ ...headline(16, WHITE), textAlign: 'left' as const }}>WATER HEATER</p>
            <p style={{ ...headline(26, ACCENT), textAlign: 'left' as const }}>$1,500–$3,500</p>
          </div>
        </div>

        <div style={{ opacity: bridgeFade, marginTop: 24 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>
            every house needs all of these — eventually
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S3-END

// ─── Scene 4 — The Math: $90K ─────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterProgress = interpolate(frame, [30, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue = Math.floor(counterProgress * 90000);

  const barWidth = interpolate(frame, [30, 185], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const yearValue = Math.floor(interpolate(frame, [30, 185], [0, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const disclaimerFade = interpolate(frame, [185, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeFade = interpolate(frame, [200, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 24, textAlign: 'center' }}>
          <p style={headline(32, BLACK)}>RUN THE MATH</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '12px auto 0' }} />
        </div>

        {/* Year indicator */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 4px' }}>YEAR</p>
          <p style={headline(90, BLACK)}>{yearValue}</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: 0 }}>OF 20</p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 360, height: 28, background: '#DDD', borderRadius: 14, marginBottom: 28, overflow: 'hidden' }}>
          <div style={{ width: barWidth, height: '100%', background: ACCENT, borderRadius: 14 }} />
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>MAINTENANCE COSTS</p>
          <p style={headline(82, ACCENT)}>${counterValue.toLocaleString()}</p>
        </div>

        <div style={{ opacity: disclaimerFade, background: BLACK, borderRadius: 12, padding: '12px 24px', marginBottom: 12 }}>
          <p style={headline(16, WHITE)}>BEFORE ANY MAJOR EMERGENCY</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>
            most homeowners discover this the hard way
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5 — 64% Blindsided ────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pieProgress = interpolate(frame, [20, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalDeg = pieProgress * 230.4;
  const rad = (totalDeg * Math.PI) / 180;
  const cx = 130;
  const cy = 130;
  const r = 110;
  const startX = cx;
  const startY = cy - r;
  const endX = cx + r * Math.sin(rad);
  const endY = cy - r * Math.cos(rad);
  const largeArc = totalDeg > 180 ? 1 : 0;

  const stat1Fade = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Fade = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat3Fade = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeFade = interpolate(frame, [185, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personSpring = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 14, stiffness: 90 } });
  const personScale = interpolate(personSpring, [0, 1], [0.4, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 20, textAlign: 'center' }}>
          <p style={headline(28, WHITE)}>HERE'S THE WILD PART</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Pie chart + person */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            <circle cx={cx} cy={cy} r={r} fill="#2A2A2A" />
            {totalDeg > 0 && (
              <path
                d={`M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY} L ${cx} ${cy} Z`}
                fill={ACCENT}
              />
            )}
            <circle cx={cx} cy={cy} r={68} fill={BG_DARK} />
            <text x={cx} y={cy - 10} fontFamily={FONT} fontSize="42" fill={ACCENT} textAnchor="middle" fontWeight="bold">64%</text>
            <text x={cx} y={cy + 18} fontFamily={FONT} fontSize="13" fill={WHITE} textAnchor="middle">UNPREPARED</text>
          </svg>

          {/* Shocked person silhouette */}
          <div style={{ transform: `scale(${personScale})` }}>
            <svg width={80} height={130} viewBox="0 0 80 130">
              {/* Head */}
              <circle cx={40} cy={22} r={20} fill="#555" />
              {/* Mouth open = shocked */}
              <ellipse cx={40} cy={27} rx={7} ry={9} fill={BG_DARK} />
              {/* Eyes wide */}
              <circle cx={32} cy={18} r={4} fill={BG_DARK} />
              <circle cx={48} cy={18} r={4} fill={BG_DARK} />
              <circle cx={32} cy={17} r={2} fill={WHITE} />
              <circle cx={48} cy={17} r={2} fill={WHITE} />
              {/* Body */}
              <rect x={22} y={44} width={36} height={52} rx={10} fill="#555" />
              {/* Arms up (shocked) */}
              <line x1={22} y1={52} x2={4} y2={34} stroke="#555" strokeWidth={12} strokeLinecap="round" />
              <line x1={58} y1={52} x2={76} y2={34} stroke="#555" strokeWidth={12} strokeLinecap="round" />
              {/* Legs */}
              <rect x={22} y={92} width={14} height={38} rx={6} fill="#555" />
              <rect x={44} y={92} width={14} height={38} rx={6} fill="#555" />
            </svg>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ opacity: stat1Fade, marginBottom: 10, textAlign: 'center' }}>
          <p style={{ ...headline(20, WHITE) }}>64% OF HOMEOWNERS WERE</p>
          <p style={{ ...headline(20, ACCENT) }}>COMPLETELY BLINDSIDED</p>
        </div>

        <div style={{ opacity: stat2Fade, background: '#1E1E1E', borderRadius: 12, padding: '10px 24px', marginBottom: 8, textAlign: 'center' }}>
          <p style={{ ...headline(15, '#888') }}>BANKS DON'T TELL YOU</p>
        </div>

        <div style={{ opacity: stat3Fade, background: '#1E1E1E', borderRadius: 12, padding: '10px 24px', marginBottom: 12, textAlign: 'center' }}>
          <p style={{ ...headline(15, '#888') }}>AGENTS DON'T TELL YOU</p>
        </div>

        <div style={{ opacity: bridgeFade }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#777', letterSpacing: '0.05em', textAlign: 'center', margin: 0 }}>
            but there's a simple fix
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
}; // S5-END

// ─── Scene 6 — CTA: $375/month ───────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggySpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 80 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0.3, 1]);

  const coinY = interpolate(frame, [40, 80], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOpacity = interpolate(frame, [40, 60, 75, 92], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const step1Fade = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Fade = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 100 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.4, 1]);
  const badgeFade = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaFade = interpolate(frame, [175, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ opacity: titleFade, marginBottom: 16, textAlign: 'center' }}>
          <p style={headline(32, BLACK)}>HERE'S THE FIX</p>
          <div style={{ width: 80, height: 4, background: ACCENT, margin: '10px auto 0' }} />
        </div>

        {/* Piggy bank + animated coin */}
        <div style={{ transform: `scale(${piggyScale})`, position: 'relative' as const, marginBottom: 16 }}>
          <div style={{ position: 'absolute' as const, top: coinY, left: '50%', transform: 'translateX(-50%)', opacity: coinOpacity }}>
            <svg width={30} height={30} viewBox="0 0 30 30">
              <circle cx={15} cy={15} r={14} fill="#F59E0B" stroke="#D97706" strokeWidth={2} />
              <text x={15} y={20} fontFamily={FONT} fontSize="13" fill={BLACK} textAnchor="middle" fontWeight="bold">$</text>
            </svg>
          </div>
          <svg width={180} height={160} viewBox="0 0 180 160">
            <ellipse cx={88} cy={97} rx={70} ry={56} fill={ACCENT} />
            <circle cx={150} cy={76} r={33} fill={ACCENT} />
            <ellipse cx={175} cy={83} rx={13} ry={10} fill="#E86B06" />
            <circle cx={171} cy={81} r={4} fill={BLACK} />
            <circle cx={179} cy={81} r={4} fill={BLACK} />
            <ellipse cx={146} cy={46} rx={11} ry={15} fill="#E86B06" />
            <circle cx={161} cy={66} r={5} fill={BLACK} />
            <circle cx={162} cy={65} r={2} fill={WHITE} />
            <rect x={74} y={38} width={28} height={6} rx={3} fill={BLACK} />
            <rect x={44} y={140} width={20} height={18} rx={5} fill="#E86B06" />
            <rect x={70} y={140} width={20} height={18} rx={5} fill="#E86B06" />
            <rect x={96} y={140} width={20} height={18} rx={5} fill="#E86B06" />
            <path d="M 18 92 Q 5 77 12 64 Q 19 51 10 42" fill="none" stroke="#E86B06" strokeWidth={5} strokeLinecap="round" />
          </svg>
        </div>

        {/* Steps */}
        <div style={{ opacity: step1Fade, marginBottom: 10, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }}>
            Open a separate savings account
          </p>
        </div>
        <div style={{ opacity: step2Fade, marginBottom: 18, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }}>
            Set an auto-transfer for this:
          </p>
        </div>

        {/* $375/month badge */}
        <div style={{
          opacity: badgeFade,
          transform: `scale(${badgeScale})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '20px 44px',
          textAlign: 'center',
          marginBottom: 18,
        }}>
          <p style={headline(78, BLACK)}>$375</p>
          <p style={{ ...headline(24, BLACK), marginTop: 4 }}>EVERY MONTH</p>
        </div>

        <div style={{ opacity: ctaFade, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#777', letterSpacing: '0.05em', margin: '0 0 10px' }}>
            that's 1% of a $450K home ÷ 12
          </p>
          <p style={headline(20, BLACK)}>FOLLOW FOR MORE MONEY TRAPS</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Composition ─────────────────────────────────────────────────────────────
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
