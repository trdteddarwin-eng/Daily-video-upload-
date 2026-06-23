import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
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

// ── Scene 6: CTA — phone with savings calculator, three rules ────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const r1Op = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3Op = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [172, 207], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 172), fps, config: { damping: 12, stiffness: 80 } });

  const btnRows = [0, 1, 2, 3];
  const btnCols = [0, 1, 2, 3];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(56, BLACK)}>RUN YOUR</p>
          <p style={headline(56, ACCENT)}>OWN MATH</p>
        </div>

        {/* Phone SVG */}
        <svg
          width={148}
          height={228}
          viewBox="0 0 148 228"
          style={{ transform: `scale(${phoneScale})`, marginBottom: 30 }}
        >
          <rect x="6" y="4" width="136" height="220" rx="22" fill="#1E1E1E" stroke="#333" strokeWidth="2.5" />
          <rect x="14" y="20" width="120" height="174" rx="8" fill="#2A2A2A" />
          {/* Display */}
          <rect x="20" y="26" width="108" height="44" rx="5" fill="#111" />
          <text x="122" y="54" textAnchor="end" fill={ACCENT} fontSize="22" fontFamily="Arial Black" fontWeight="bold">20%</text>
          <text x="122" y="38" textAnchor="end" fill="#666" fontSize="12" fontFamily="Arial">savings rate</text>
          {/* Calculator buttons */}
          {btnRows.flatMap((row) =>
            btnCols.map((col) => (
              <rect
                key={`b${row}${col}`}
                x={20 + col * 29}
                y={80 + row * 29}
                width={23}
                height={23}
                rx="4"
                fill={row === 3 && col === 3 ? ACCENT : '#333'}
              />
            ))
          )}
          {/* Home bar */}
          <rect x="57" y="202" width="34" height="5" rx="2.5" fill="#555" />
        </svg>

        {/* Three rules */}
        <div style={{ opacity: r1Op, marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>1. Ignore the 30% rule</p>
        </div>
        <div style={{ opacity: r2Op, marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>2. Track your savings rate</p>
        </div>
        <div style={{ opacity: r3Op, marginBottom: 28, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>3. Aim for 15-20% saved</p>
        </div>

        <div
          style={{
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
            textAlign: 'center',
          }}
        >
          <p style={headline(44, ACCENT)}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(22, BLACK), marginTop: 10 }}>FINANCE MYTHS DEBUNKED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ───────────────────────────────────────────────────────────────
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

// ── Scene 4: 52% cost-burdened + savings rate beats rent ratio ───────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 65 } });
  const statOp = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsOp = interpolate(frame, [95, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsScale = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 12, stiffness: 75 } });
  const punchOp = interpolate(frame, [170, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 12, stiffness: 80 } });

  const boxBase: React.CSSProperties = {
    textAlign: 'center',
    borderRadius: 14,
    padding: '18px 22px',
    width: 156,
  };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(48, BLACK)}>BUT HERE'S</p>
          <p style={headline(48, ACCENT)}>WHAT COUNTS</p>
        </div>

        {/* 52% stat */}
        <div
          style={{
            opacity: statOp,
            transform: `scale(${statScale})`,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          <p style={headline(108, ACCENT)}>52%</p>
          <p style={{ ...headline(26, BLACK), marginTop: 2 }}>ALREADY COST-BURDENED</p>
        </div>

        {/* VS comparison boxes */}
        <div
          style={{
            opacity: vsOp,
            transform: `scale(${vsScale})`,
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              ...boxBase,
              background: 'rgba(239,68,68,0.09)',
              border: '2px solid #EF4444',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 28, color: RED, margin: 0 }}>28%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '4px 0' }}>on rent</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#AAA', margin: '6px 0' }}>+</p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: RED, margin: 0 }}>0%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '4px 0' }}>saved</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, margin: 0 }}>VS</p>
          <div
            style={{
              ...boxBase,
              background: 'rgba(16,185,129,0.09)',
              border: '2px solid #10B981',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, margin: 0 }}>35%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '4px 0' }}>on rent</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#AAA', margin: '6px 0' }}>+</p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, margin: 0 }}>20%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '4px 0' }}>saved</p>
          </div>
        </div>

        <div
          style={{
            opacity: punchOp,
            transform: `scale(${punchScale})`,
            textAlign: 'center',
          }}
        >
          <p style={headline(38, GREEN)}>SAVINGS WINS EVERY TIME</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Savings rate is the signal — piggy bank + progress bar ───────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 60 } });
  const barW = interpolate(frame, [60, 160], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barOp = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctVal = Math.round(interpolate(frame, [60, 160], [0, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const signalOp = interpolate(frame, [168, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const signalScale = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 36 }}>
          <p style={headline(52, WHITE)}>WHAT ACTUALLY</p>
          <p style={headline(52, ACCENT)}>MATTERS</p>
        </div>

        {/* Piggy bank SVG */}
        <svg
          width={230}
          height={175}
          viewBox="0 0 230 175"
          style={{ transform: `scale(${piggyScale})`, marginBottom: 32 }}
        >
          {/* Body */}
          <ellipse cx="108" cy="108" rx="78" ry="58" fill={ACCENT} />
          {/* Head */}
          <circle cx="172" cy="78" r="36" fill={ACCENT} />
          {/* Snout */}
          <ellipse cx="196" cy="87" rx="15" ry="11" fill="#D97706" />
          <circle cx="191" cy="85" r="3.5" fill="#92400E" />
          <circle cx="200" cy="85" r="3.5" fill="#92400E" />
          {/* Eye */}
          <circle cx="168" cy="65" r="5" fill={WHITE} />
          <circle cx="168" cy="65" r="2.5" fill={BLACK} />
          {/* Ear */}
          <ellipse cx="157" cy="46" rx="11" ry="15" fill="#D97706" />
          {/* Coin slot */}
          <rect x="96" y="51" width="22" height="6" rx="3" fill="#92400E" />
          {/* Coin entering */}
          <rect x="98" y="38" width="18" height="12" rx="2" fill="#FFD700" />
          {/* Legs */}
          <rect x="46" y="150" width="24" height="22" rx="8" fill="#D97706" />
          <rect x="76" y="154" width="24" height="22" rx="8" fill="#D97706" />
          <rect x="118" y="154" width="24" height="22" rx="8" fill="#D97706" />
          <rect x="148" y="150" width="24" height="22" rx="8" fill="#D97706" />
          {/* Tail */}
          <path d="M32 98 Q16 82 22 66 Q28 50 20 40" fill="none" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Savings rate progress bar */}
        <div style={{ opacity: barOp, width: 460, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em' }}>SAVINGS RATE</span>
            <span style={{ fontFamily: FONT, fontSize: 22, color: ACCENT }}>{pctVal}%</span>
          </div>
          <svg width={460} height={34} viewBox="0 0 460 34">
            <rect x="0" y="5" width="460" height="24" rx="12" fill="#2A2A2A" />
            <rect x="0" y="5" width={barW} height="24" rx="12" fill={ACCENT} />
            <line x1="207" y1="0" x2="207" y2="34" stroke={WHITE} strokeWidth="2" strokeDasharray="4,3" />
            <line x1="276" y1="0" x2="276" y2="34" stroke={GREEN} strokeWidth="2.5" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 14, color: '#666' }}>0%</span>
            <span style={{ fontFamily: FONT, fontSize: 14, color: GREEN }}>TARGET: 15-20%</span>
            <span style={{ fontFamily: FONT, fontSize: 14, color: '#666' }}>100%</span>
          </div>
        </div>

        <div
          style={{
            opacity: signalOp,
            transform: `scale(${signalScale})`,
            textAlign: 'center',
          }}
        >
          <p style={headline(38, ACCENT)}>RENT% = NOISE</p>
          <p style={{ ...headline(26, WHITE), marginTop: 10 }}>SAVINGS RATE = THE SIGNAL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Origin story — house + HUD doc + $200/month tag ─────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 65 } });
  const docOp = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docScale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 70 } });
  const priceOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 14, stiffness: 75 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 36 }}>
          <p style={headline(52, BLACK)}>WHERE IT</p>
          <p style={headline(52, ACCENT)}>CAME FROM</p>
        </div>

        {/* House SVG */}
        <svg
          width={200}
          height={185}
          viewBox="0 0 200 185"
          style={{ transform: `scale(${houseScale})`, marginBottom: 24 }}
        >
          <polygon points="100,8 185,72 15,72" fill="#999" />
          <polygon points="100,16 177,72 23,72" fill="#AAAAAA" />
          <rect x="22" y="72" width="156" height="98" rx="4" fill="#BBBBBB" />
          <rect x="78" y="110" width="44" height="60" rx="5" fill="#666" />
          <circle cx="116" cy="142" r="4" fill="#FFD700" />
          <rect x="32" y="86" width="40" height="34" rx="4" fill="#87CEEB" stroke="#888" strokeWidth="2" />
          <line x1="52" y1="86" x2="52" y2="120" stroke="#888" strokeWidth="1.5" />
          <line x1="32" y1="103" x2="72" y2="103" stroke="#888" strokeWidth="1.5" />
          <rect x="128" y="86" width="40" height="34" rx="4" fill="#87CEEB" stroke="#888" strokeWidth="2" />
          <line x1="148" y1="86" x2="148" y2="120" stroke="#888" strokeWidth="1.5" />
          <line x1="128" y1="103" x2="168" y2="103" stroke="#888" strokeWidth="1.5" />
        </svg>

        {/* HUD document */}
        <div
          style={{
            opacity: docOp,
            transform: `scale(${docScale})`,
            marginBottom: 24,
          }}
        >
          <svg width={320} height={76} viewBox="0 0 320 76">
            <rect x="4" y="4" width="312" height="68" rx="8" fill="#1E1E1E" stroke="#444" strokeWidth="1.5" />
            <text x="160" y="30" textAnchor="middle" fill="#888" fontSize="14" fontFamily="Arial">HUD Housing Act  •  1969</text>
            <text x="160" y="52" textAnchor="middle" fill={ACCENT} fontSize="16" fontFamily="Arial Black" fontWeight="bold">30% INCOME THRESHOLD</text>
            <text x="160" y="66" textAnchor="middle" fill="#666" fontSize="11" fontFamily="Arial">housing assistance eligibility only</text>
          </svg>
        </div>

        {/* Price reveal */}
        <div
          style={{
            opacity: priceOp,
            transform: `scale(${priceScale})`,
            textAlign: 'center',
          }}
        >
          <p style={{ ...headline(30, '#888'), marginBottom: 4 }}>MEDIAN RENT IN 1969</p>
          <p style={headline(88, ACCENT)}>$200/MO</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Math is broken — $56K earned vs $82K needed comparison ───────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r1Op = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r1Y = interpolate(frame, [20, 55], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Y = interpolate(frame, [75, 110], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [135, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapY = interpolate(frame, [135, 170], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rowBase: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 500,
    borderBottom: '1px solid #333',
    paddingBottom: 26,
    marginBottom: 26,
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 56 }}>
          <p style={headline(52, WHITE)}>THE MATH</p>
          <p style={headline(52, ACCENT)}>IS BROKEN</p>
        </div>

        <div style={{ opacity: r1Op, transform: `translateY(${r1Y}px)`, ...rowBase }}>
          <span style={{ fontFamily: FONT, fontSize: 28, color: '#888', letterSpacing: '0.06em' }}>YOU EARN</span>
          <span style={{ fontFamily: FONT, fontSize: 56, color: WHITE, letterSpacing: '0.04em' }}>$56K</span>
        </div>

        <div style={{ opacity: r2Op, transform: `translateY(${r2Y}px)`, ...rowBase }}>
          <span style={{ fontFamily: FONT, fontSize: 28, color: '#888', letterSpacing: '0.06em' }}>RULE NEEDS</span>
          <span style={{ fontFamily: FONT, fontSize: 56, color: ACCENT, letterSpacing: '0.04em' }}>$82K</span>
        </div>

        <div
          style={{
            opacity: gapOp,
            transform: `translateY(${gapY}px)`,
            textAlign: 'center',
            borderTop: `3px solid ${RED}`,
            paddingTop: 20,
            width: 500,
          }}
        >
          <p style={headline(38, RED)}>$26K SHORT FOR MOST RENTERS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 1: Hook — 30% rule origin, person with rent bill, year 1969 ─────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 60 } });
  const personScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 65 } });
  const yearOp = interpolate(frame, [75, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearY = interpolate(frame, [75, 115], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(58, WHITE)}>THE 30% RULE</p>
          <p style={headline(58, ACCENT)}>IS 55 YEARS OLD</p>
        </div>

        {/* Large 30% */}
        <div style={{ transform: `scale(${pctScale})`, marginBottom: 32 }}>
          <p style={{ ...headline(150, ACCENT), lineHeight: 1 }}>30%</p>
        </div>

        {/* Person with rent bill */}
        <svg
          width={260}
          height={170}
          viewBox="0 0 260 170"
          style={{ transform: `scale(${personScale})`, marginBottom: 28 }}
        >
          {/* Person silhouette */}
          <circle cx="60" cy="44" r="24" fill={WHITE} />
          <rect x="42" y="66" width="36" height="52" rx="10" fill={WHITE} />
          <rect x="30" y="74" width="16" height="36" rx="7" fill={WHITE} />
          <rect x="74" y="74" width="16" height="36" rx="7" fill={WHITE} />
          {/* Arm reaching to bill */}
          <line x1="74" y1="92" x2="118" y2="88" stroke={WHITE} strokeWidth="13" strokeLinecap="round" />
          {/* Rent bill */}
          <rect x="118" y="32" width="128" height="110" rx="8" fill="#1E1E1E" stroke={ACCENT} strokeWidth="2.5" />
          <text x="182" y="58" textAnchor="middle" fill={ACCENT} fontSize="13" fontFamily="Arial Black" fontWeight="bold">RENT BILL</text>
          <rect x="130" y="66" width="96" height="4" rx="2" fill="#333" />
          <rect x="130" y="76" width="68" height="4" rx="2" fill="#333" />
          <rect x="130" y="92" width="96" height="1.5" rx="1" fill="#444" />
          <text x="182" y="118" textAnchor="middle" fill={ACCENT} fontSize="26" fontFamily="Arial Black" fontWeight="bold">$2,057</text>
          <text x="182" y="134" textAnchor="middle" fill="#888" fontSize="12" fontFamily="Arial">/month</text>
        </svg>

        <div
          style={{
            opacity: yearOp,
            transform: `translateY(${yearY}px)`,
            textAlign: 'center',
          }}
        >
          <p style={{ ...headline(30, '#888'), marginBottom: 4 }}>CREATED IN</p>
          <p style={headline(88, ACCENT)}>1969</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
