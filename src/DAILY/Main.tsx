import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const AMBER = '#F59E0B';
const GREEN = '#10B981';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
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

  const numVal = interpolate(frame, [15, 85], [0, 500000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fakeOpacity = interpolate(frame, [112, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fakeScale = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 11, stiffness: 220 } });

  const personY = interpolate(frame, [0, 32], [140, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Person at desk */}
        <svg
          width="320" height="270"
          viewBox="0 0 320 270"
          style={{ transform: `translateY(${personY}px)`, marginBottom: 44 }}
        >
          {/* Head */}
          <circle cx="160" cy="62" r="44" fill={WHITE} />
          {/* Body */}
          <rect x="118" y="110" width="84" height="84" rx="16" fill={WHITE} />
          {/* Left arm */}
          <rect x="56" y="126" width="62" height="16" rx="8" fill={WHITE} />
          {/* Right arm */}
          <rect x="202" y="126" width="62" height="16" rx="8" fill={WHITE} />
          {/* Desk */}
          <rect x="8" y="210" width="304" height="14" rx="5" fill="#2a2a2a" />
          {/* Laptop body */}
          <rect x="76" y="162" width="168" height="46" rx="8" fill="#1a1a2e" />
          {/* Screen */}
          <rect x="84" y="168" width="152" height="34" rx="5" fill="#0d1b2a" />
          {/* Value on screen */}
          <text x="90" y="191" fontFamily="Arial Black" fontSize="20" fill={AMBER} fontWeight="900">$500,000</text>
        </svg>

        {/* Counting number */}
        <p style={{ ...headline(96, AMBER) }}>
          ${Math.floor(numVal).toLocaleString()}
        </p>

        <p style={{ ...headline(38, WHITE), opacity: subtitleOpacity, marginTop: 20 }}>
          YOUR NET WORTH
        </p>

        {/* FAKE stamp */}
        <div style={{
          position: 'absolute' as const,
          opacity: fakeOpacity,
          transform: `scale(${fakeScale}) rotate(-13deg)`,
        }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 160,
            color: RED,
            textTransform: 'uppercase' as const,
            textAlign: 'center' as const,
            margin: 0,
            lineHeight: 1,
            textShadow: `0 0 50px ${RED}99`,
            border: `12px solid ${RED}`,
            padding: '0 40px',
            borderRadius: 20,
          }}>
            FAKE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame, fps, config: { damping: 14, stiffness: 150 } });

  const totalBarW = interpolate(frame, [30, 85], [0, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxBarW = interpolate(frame, [105, 155], [0, 495], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxOpacity = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const keepOpacity = interpolate(frame, [165, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        {/* Piggy bank */}
        <svg
          width="190" height="168"
          viewBox="0 0 190 168"
          style={{ transform: `scale(${piggyScale})`, marginBottom: 48 }}
        >
          <ellipse cx="88" cy="98" rx="74" ry="60" fill="#F9A8D4" />
          <circle cx="152" cy="82" rx={36} cy={82} r={36} fill="#F9A8D4" />
          <ellipse cx="141" cy="52" rx="12" ry="15" fill="#F472B6" />
          <ellipse cx="172" cy="89" rx="14" ry="11" fill="#F472B6" />
          <circle cx="167" cy="89" r="4" fill="#9D174D" />
          <circle cx="176" cy="89" r="4" fill="#9D174D" />
          <circle cx="156" cy="70" r="5" fill={BLACK} />
          <circle cx="157" cy="69" r="2" fill={WHITE} />
          <rect x="28" y="144" width="24" height="22" rx="6" fill="#F472B6" />
          <rect x="62" y="147" width="24" height="19" rx="6" fill="#F472B6" />
          <rect x="96" y="147" width="24" height="19" rx="6" fill="#F472B6" />
          <rect x="126" y="144" width="24" height="22" rx="6" fill="#F472B6" />
          <rect x="76" y="30" width="20" height="7" rx="3" fill="#9D174D" />
          <text x="50" y="120" fontFamily="Arial Black" fontSize="38" fill={WHITE} fontWeight="900">401K</text>
        </svg>

        <p style={{ ...headline(38, BLACK), marginBottom: 28 }}>NUMBER ONE: YOUR 401K</p>

        {/* Total bar */}
        <div style={{ width: 900, height: 54, background: '#e5e7eb', borderRadius: 10, marginBottom: 18, overflow: 'hidden' }}>
          <div style={{ width: totalBarW, height: '100%', background: AMBER, borderRadius: 10 }} />
        </div>
        <p style={{ ...headline(48, BLACK), marginBottom: 40 }}>$400,000 BALANCE</p>

        {/* IRS tax bar */}
        <div style={{ opacity: taxOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ width: 900, height: 54, background: '#fecaca', borderRadius: 10, marginBottom: 18, overflow: 'hidden' }}>
            <div style={{ width: taxBarW, height: '100%', background: RED, borderRadius: 10 }} />
          </div>
          <p style={{ ...headline(36, RED), marginBottom: 40 }}>IRS TAKES: $88,000 (22%)</p>
        </div>

        <p style={{ ...headline(52, GREEN), opacity: keepOpacity }}>YOU KEEP: $312,000</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseY = interpolate(frame, [0, 35], [160, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const agentX = interpolate(frame, [65, 118], [700, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crossW = interpolate(frame, [140, 165], [0, 620], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const realOpacity = interpolate(frame, [168, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...headline(38, WHITE), marginBottom: 44 }}>NUMBER TWO: HOME EQUITY</p>

        {/* House */}
        <svg
          width="300" height="256"
          viewBox="0 0 300 256"
          style={{ transform: `translateY(${houseY}px)`, marginBottom: 44 }}
        >
          {/* Roof */}
          <polygon points="150,12 16,128 284,128" fill={AMBER} />
          {/* Chimney */}
          <rect x="196" y="40" width="28" height="60" rx="4" fill="#b45309" />
          {/* Walls */}
          <rect x="36" y="128" width="228" height="108" fill={WHITE} />
          {/* Door */}
          <rect x="118" y="174" width="64" height="62" rx="8" fill="#7c3aed" />
          <circle cx="172" cy="208" r="5" fill={AMBER} />
          {/* Left window */}
          <rect x="54" y="144" width="58" height="52" rx="5" fill="#93C5FD" />
          <line x1="83" y1="144" x2="83" y2="196" stroke={WHITE} strokeWidth="3" />
          <line x1="54" y1="170" x2="112" y2="170" stroke={WHITE} strokeWidth="3" />
          {/* Right window */}
          <rect x="188" y="144" width="58" height="52" rx="5" fill="#93C5FD" />
          <line x1="217" y1="144" x2="217" y2="196" stroke={WHITE} strokeWidth="3" />
          <line x1="188" y1="170" x2="246" y2="170" stroke={WHITE} strokeWidth="3" />
        </svg>

        {/* Equity label with crossout */}
        <div style={{ position: 'relative' as const, marginBottom: 28 }}>
          <p style={{ ...headline(56, AMBER) }}>$180,000 EQUITY</p>
          <div style={{
            position: 'absolute' as const,
            top: '50%',
            left: 0,
            width: crossW,
            height: 7,
            background: RED,
            transform: 'translateY(-50%)',
            borderRadius: 4,
          }} />
        </div>

        {/* Agent walking away with money */}
        <svg
          width="440" height="110"
          viewBox="0 0 440 110"
          style={{ transform: `translateX(${agentX}px)`, marginBottom: 28 }}
        >
          {/* Agent head */}
          <circle cx="42" cy="30" r="20" fill="#6B7280" />
          {/* Agent body */}
          <rect x="24" y="52" width="36" height="40" rx="8" fill="#374151" />
          {/* Briefcase */}
          <rect x="72" y="58" width="52" height="40" rx="7" fill={AMBER} />
          <rect x="83" y="50" width="30" height="12" rx="5" fill={AMBER} />
          <text x="74" y="84" fontFamily="Arial Black" fontSize="18" fill={BLACK} fontWeight="900">$16K</text>
          {/* Arrow + label */}
          <text x="145" y="55" fontFamily="Arial Black" fontSize="30" fill={RED}>←</text>
          <text x="192" y="62" fontFamily="Arial" fontSize="24" fill={WHITE}>agent + closing costs</text>
        </svg>

        <p style={{ ...headline(56, GREEN), opacity: realOpacity }}>REAL VALUE: $164,000</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const carScale = spring({ frame, fps, config: { damping: 12, stiffness: 130 } });

  const displayVal = interpolate(frame, [40, 200], [28000, 15500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yr1Opacity = interpolate(frame, [50, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yr2Opacity = interpolate(frame, [105, 123], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yr3Opacity = interpolate(frame, [160, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const iceOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        <p style={{ ...headline(38, BLACK) }}>NUMBER THREE: YOUR CAR</p>

        {/* Car SVG */}
        <svg
          width="580" height="190"
          viewBox="0 0 580 190"
          style={{ transform: `scale(${carScale})` }}
        >
          {/* Body */}
          <rect x="30" y="88" width="520" height="82" rx="22" fill="#374151" />
          {/* Cabin/roof */}
          <path d="M 148 88 Q 168 22 230 22 L 400 22 Q 452 22 472 88 Z" fill="#4B5563" />
          {/* Windshield */}
          <path d="M 170 86 Q 188 30 230 28 L 378 28 Q 420 30 448 86 Z" fill="#93C5FD" opacity="0.85" />
          {/* Left wheel */}
          <circle cx="148" cy="168" r="42" fill={BLACK} />
          <circle cx="148" cy="168" r="29" fill="#6B7280" />
          <circle cx="148" cy="168" r="13" fill="#9CA3AF" />
          {/* Right wheel */}
          <circle cx="432" cy="168" r="42" fill={BLACK} />
          <circle cx="432" cy="168" r="29" fill="#6B7280" />
          <circle cx="432" cy="168" r="13" fill="#9CA3AF" />
          {/* Headlights */}
          <ellipse cx="548" cy="114" rx="22" ry="15" fill="#FEF08A" />
          <ellipse cx="32" cy="114" rx="22" ry="15" fill="#FEF08A" />
          {/* Door lines */}
          <rect x="185" y="96" width="108" height="62" rx="9" fill="none" stroke="#6B7280" strokeWidth="3" />
          <rect x="307" y="96" width="108" height="62" rx="9" fill="none" stroke="#6B7280" strokeWidth="3" />
        </svg>

        {/* Current value */}
        <p style={{ ...headline(86, RED) }}>
          ${Math.floor(displayVal).toLocaleString()}
        </p>

        {/* Year badges */}
        <div style={{ display: 'flex', gap: 60 }}>
          <div style={{ textAlign: 'center' as const, opacity: yr1Opacity }}>
            <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>YEAR 1</p>
            <p style={{ ...headline(30, RED) }}>-$5,000</p>
          </div>
          <div style={{ textAlign: 'center' as const, opacity: yr2Opacity }}>
            <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>YEAR 2</p>
            <p style={{ ...headline(30, RED) }}>-$4,000</p>
          </div>
          <div style={{ textAlign: 'center' as const, opacity: yr3Opacity }}>
            <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>YEAR 3</p>
            <p style={{ ...headline(30, RED) }}>-$3,500</p>
          </div>
        </div>

        {/* Ice cube label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: iceOpacity }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <polygon points="26,4 48,18 48,34 26,48 4,34 4,18" fill="#93C5FD" opacity="0.9" />
            <polygon points="26,4 48,18 48,34 26,48 4,34 4,18" fill="none" stroke="#60A5FA" strokeWidth="2" />
            <text x="13" y="32" fontFamily="Arial" fontSize="20" fill={BLACK}>❄</text>
          </svg>
          <p style={{ ...headline(34, BLACK) }}>MELTING ICE CUBE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Opacity = interpolate(frame, [22, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Opacity = interpolate(frame, [55, 73], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Opacity = interpolate(frame, [88, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalsOpacity = interpolate(frame, [130, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOpacity = interpolate(frame, [162, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 920,
    padding: '18px 0',
    borderBottom: '2px solid #2a2a2a',
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 70px' }}>
        <p style={{ ...headline(46, WHITE), marginBottom: 44, opacity: titleOpacity }}>THE REAL MATH</p>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 920, marginBottom: 10 }}>
          <p style={{ ...headline(28, '#9CA3AF'), flex: 1 }}>ASSET</p>
          <p style={{ ...headline(28, AMBER), flex: 1, textAlign: 'right' as const }}>ON PAPER</p>
          <p style={{ ...headline(28, GREEN), flex: 1, textAlign: 'right' as const }}>REAL VALUE</p>
        </div>

        <div style={{ ...rowStyle, opacity: row1Opacity }}>
          <p style={{ ...headline(30, WHITE), flex: 1 }}>401K</p>
          <p style={{ ...headline(30, AMBER), flex: 1, textAlign: 'right' as const }}>$400,000</p>
          <p style={{ ...headline(30, GREEN), flex: 1, textAlign: 'right' as const }}>$312,000</p>
        </div>

        <div style={{ ...rowStyle, opacity: row2Opacity }}>
          <p style={{ ...headline(30, WHITE), flex: 1 }}>HOME</p>
          <p style={{ ...headline(30, AMBER), flex: 1, textAlign: 'right' as const }}>$180,000</p>
          <p style={{ ...headline(30, GREEN), flex: 1, textAlign: 'right' as const }}>$164,000</p>
        </div>

        <div style={{ ...rowStyle, opacity: row3Opacity }}>
          <p style={{ ...headline(30, WHITE), flex: 1 }}>CAR</p>
          <p style={{ ...headline(30, AMBER), flex: 1, textAlign: 'right' as const }}>$28,000</p>
          <p style={{ ...headline(30, GREEN), flex: 1, textAlign: 'right' as const }}>$19,000</p>
        </div>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 920, marginTop: 28, opacity: totalsOpacity }}>
          <p style={{ ...headline(36, WHITE), flex: 1 }}>TOTAL</p>
          <p style={{ ...headline(36, AMBER), flex: 1, textAlign: 'right' as const }}>$608,000</p>
          <p style={{ ...headline(36, GREEN), flex: 1, textAlign: 'right' as const }}>$495,000</p>
        </div>

        {/* Gap */}
        <div style={{
          background: RED + '22',
          border: `3px solid ${RED}`,
          borderRadius: 18,
          padding: '22px 64px',
          marginTop: 38,
          opacity: gapOpacity,
        }}>
          <p style={{ ...headline(52, RED) }}>GAP: -$113,000</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 12, stiffness: 130 } });

  const text1Opacity = interpolate(frame, [45, 63], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const text2Opacity = interpolate(frame, [78, 96], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [125, 143], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 125), fps, config: { damping: 10, stiffness: 200 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        {/* Phone with app */}
        <svg
          width="220" height="370"
          viewBox="0 0 220 370"
          style={{ transform: `scale(${phoneScale})` }}
        >
          {/* Phone shell */}
          <rect x="8" y="8" width="204" height="354" rx="28" fill={BLACK} />
          {/* Screen area */}
          <rect x="18" y="28" width="184" height="316" rx="12" fill="#1E293B" />
          {/* Home bar */}
          <rect x="82" y="352" width="56" height="6" rx="3" fill="#334155" />
          {/* App header */}
          <rect x="28" y="42" width="164" height="34" rx="8" fill={RED} />
          <text x="44" y="64" fontFamily="Arial Black" fontSize="14" fill={WHITE} fontWeight="900">NET WORTH TRACKER</text>
          {/* Rows */}
          <rect x="28" y="88" width="164" height="28" rx="5" fill="#0F172A" />
          <text x="36" y="107" fontFamily="Arial" fontSize="13" fill={WHITE}>401k (after-tax)</text>
          <text x="142" y="107" fontFamily="Arial Black" fontSize="13" fill={GREEN} fontWeight="bold">$312k</text>
          <rect x="28" y="122" width="164" height="28" rx="5" fill="#0F172A" />
          <text x="36" y="141" fontFamily="Arial" fontSize="13" fill={WHITE}>Home (net)</text>
          <text x="142" y="141" fontFamily="Arial Black" fontSize="13" fill={GREEN} fontWeight="bold">$164k</text>
          <rect x="28" y="156" width="164" height="28" rx="5" fill="#0F172A" />
          <text x="36" y="175" fontFamily="Arial" fontSize="13" fill={WHITE}>Car (real value)</text>
          <text x="148" y="175" fontFamily="Arial Black" fontSize="13" fill={GREEN} fontWeight="bold">$19k</text>
          {/* Divider */}
          <line x1="28" y1="196" x2="192" y2="196" stroke="#334155" strokeWidth="2" />
          {/* Total */}
          <text x="36" y="222" fontFamily="Arial Black" fontSize="16" fill={WHITE}>REAL TOTAL</text>
          <text x="130" y="222" fontFamily="Arial Black" fontSize="16" fill={GREEN} fontWeight="bold">$495k</text>
          {/* Check icon */}
          <circle cx="110" cy="270" r="28" fill={GREEN} />
          <polyline points="96,270 106,282 124,256" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <p style={{ ...headline(52, BLACK), opacity: text1Opacity }}>TRACK YOUR REAL</p>
        <p style={{ ...headline(68, RED), opacity: text1Opacity }}>NET WORTH</p>

        <p style={{ ...headline(34, BLACK), opacity: text2Opacity }}>NOT THE PAPER NUMBER</p>

        {/* Follow CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          background: BLACK,
          padding: '26px 56px',
          borderRadius: 64,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="22" fill={GREEN} />
            <polyline points="11,22 19,30 33,14" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ ...headline(36, WHITE) }}>FOLLOW FOR MORE</p>
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
