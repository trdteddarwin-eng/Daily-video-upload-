import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
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

// Scene 1: Hook — most people use HSA as a copay card, missing $395K
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const wrongOp = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wrongScale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 80 } });
  const statOp = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 28, textAlign: 'center' }}>
          <p style={headline(48, WHITE)}>YOU'RE USING YOUR</p>
          <p style={headline(48, ACCENT)}>HSA ALL WRONG</p>
        </div>

        {/* HSA card SVG */}
        <svg
          width={280}
          height={170}
          viewBox="0 0 280 170"
          style={{ transform: `scale(${cardScale})`, marginBottom: 24 }}
        >
          <rect x="10" y="20" width="260" height="140" rx="14" fill="#1E1E1E" />
          <rect x="10" y="20" width="260" height="140" rx="14" fill="none" stroke={ACCENT} strokeWidth="3" />
          <rect x="10" y="60" width="260" height="36" fill="#2A2A2A" />
          <rect x="30" y="82" width="48" height="28" rx="4" fill={ACCENT} opacity={0.85} />
          <text x="139" y="48" textAnchor="middle" fill={ACCENT} fontSize={20} fontFamily="Arial Black" fontWeight="bold">HSA</text>
          <text x="139" y="72" textAnchor="middle" fill="#555" fontSize={12} fontFamily="Arial">HEALTH SAVINGS ACCOUNT</text>
          <text x="139" y="130" textAnchor="middle" fill="#888" fontSize={18} fontFamily="Arial">•••• •••• •••• 4150</text>
          <text x="139" y="152" textAnchor="middle" fill="#666" fontSize={13} fontFamily="Arial">YOURS TO KEEP</text>
        </svg>

        <div
          style={{
            opacity: wrongOp,
            transform: `scale(${wrongScale})`,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '0 0 6px 0' }}>MOST PEOPLE USE IT FOR</p>
          <p style={headline(40, RED)}>COPAYS & PRESCRIPTIONS</p>
        </div>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '0 0 4px 0' }}>AND LEAVE</p>
          <p style={headline(52, ACCENT)}>$395,000</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '4px 0 0 0' }}>ON THE TABLE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Triple tax advantage — contribute, grow, withdraw all tax-free
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 65 } });
  const s2Scale = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 14, stiffness: 65 } });
  const s3Scale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 14, stiffness: 65 } });
  const labelOp = interpolate(frame, [155, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 75 } });

  const shields = [
    { label: 'CONTRIBUTE', sublabel: 'Pre-tax dollars in', scale: s1Scale },
    { label: 'GROW', sublabel: 'Zero tax on gains', scale: s2Scale },
    { label: 'WITHDRAW', sublabel: 'Tax-free for medical', scale: s3Scale },
  ];

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
          <p style={headline(52, BLACK)}>THE ONLY ACCOUNT</p>
          <p style={headline(52, ACCENT)}>WITH TRIPLE TAX-FREE</p>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 28 }}>
          {shields.map((sh, i) => (
            <div key={i} style={{ transform: `scale(${sh.scale})`, textAlign: 'center', width: 148 }}>
              <svg width={80} height={88} viewBox="0 0 80 88" style={{ display: 'block', margin: '0 auto 10px' }}>
                <path d="M40 4 L72 18 L72 48 Q72 70 40 84 Q8 70 8 48 L8 18 Z" fill={ACCENT} opacity={0.12} />
                <path d="M40 4 L72 18 L72 48 Q72 70 40 84 Q8 70 8 48 L8 18 Z" fill="none" stroke={ACCENT} strokeWidth="3" />
                <text x="40" y="50" textAnchor="middle" fill={ACCENT} fontSize={26} fontFamily="Arial Black" fontWeight="bold">{i + 1}</text>
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, margin: '0 0 4px 0', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{sh.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 13, color: '#666', margin: 0 }}>{sh.sublabel}</p>
            </div>
          ))}
        </div>

        <div style={{ opacity: labelOp, transform: `scale(${labelScale})`, textAlign: 'center' }}>
          <p style={headline(32, BLACK)}>NO OTHER ACCOUNT</p>
          <p style={headline(32, ACCENT)}>DOES ALL THREE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: 68% leave HSA in cash — invested version is 95x bigger
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [25, 80], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [60, 155], [0, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOp = interpolate(frame, [185, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 12, stiffness: 75 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 24 }}>
          <p style={headline(48, WHITE)}>68% LEAVE THEIR</p>
          <p style={headline(48, RED)}>HSA IN CASH</p>
        </div>

        <svg width={300} height={280} viewBox="0 0 300 280" style={{ marginBottom: 20 }}>
          <line x1="40" y1="260" x2="280" y2="260" stroke="#333" strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="260" stroke="#333" strokeWidth="2" />
          <rect x="70" y={260 - bar1H} width="70" height={bar1H} rx="6" fill={RED} opacity={0.85} />
          <rect x="168" y={260 - bar2H} width="70" height={bar2H} rx="6" fill={ACCENT} opacity={0.9} />
          <text x="105" y="276" textAnchor="middle" fill="#888" fontSize={13} fontFamily="Arial">CASH</text>
          <text x="203" y="276" textAnchor="middle" fill="#888" fontSize={13} fontFamily="Arial">INVESTED</text>
          <text x="105" y={260 - bar1H - 8} textAnchor="middle" fill={RED} fontSize={14} fontFamily="Arial Black" fontWeight="bold" opacity={label1Op}>$4,150</text>
          <text x="203" y={260 - bar2H - 8} textAnchor="middle" fill={ACCENT} fontSize={14} fontFamily="Arial Black" fontWeight="bold" opacity={label2Op}>$395K</text>
        </svg>

        <div style={{ opacity: punchOp, transform: `scale(${punchScale})`, textAlign: 'center' }}>
          <p style={headline(28, ACCENT)}>SAME MONEY. 95X THE RESULT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: $4,150/year for 30 years at 7% = $395K counter + piggy bank
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const counterVal = Math.round(interpolate(frame, [20, 165], [0, 395000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOp = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const detailOp = interpolate(frame, [170, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const detailScale = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 12, stiffness: 75 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 24 }}>
          <p style={headline(48, BLACK)}>$4,150/YEAR</p>
          <p style={headline(48, ACCENT)}>INVESTED FOR 30 YEARS</p>
        </div>

        {/* Piggy bank SVG */}
        <svg
          width={175}
          height={158}
          viewBox="0 0 175 158"
          style={{ transform: `scale(${piggyScale})`, marginBottom: 20 }}
        >
          <ellipse cx="75" cy="100" rx="55" ry="46" fill={ACCENT} opacity={0.9} />
          <circle cx="125" cy="82" r="26" fill={ACCENT} opacity={0.9} />
          <ellipse cx="115" cy="60" rx="9" ry="12" fill={ACCENT} />
          <ellipse cx="115" cy="60" rx="5" ry="7" fill="#F3D090" />
          <circle cx="132" cy="76" r="5" fill="#333" />
          <circle cx="133" cy="75" r="2" fill="#FFF" />
          <ellipse cx="144" cy="88" rx="13" ry="9" fill="#F3D090" />
          <circle cx="139" cy="90" r="2.5" fill="#D4905A" />
          <circle cx="149" cy="90" r="2.5" fill="#D4905A" />
          <rect x="30" y="132" width="18" height="22" rx="5" fill={ACCENT} />
          <rect x="54" y="132" width="18" height="22" rx="5" fill={ACCENT} />
          <rect x="78" y="132" width="18" height="22" rx="5" fill={ACCENT} />
          <rect x="102" y="132" width="18" height="22" rx="5" fill={ACCENT} />
          <rect x="60" y="55" width="30" height="5" rx="2.5" fill="#333" opacity={0.5} />
          <ellipse cx="75" cy="55" rx="13" ry="4.5" fill="#FFD700" />
          <text x="75" y="58" textAnchor="middle" fill="#8B6914" fontSize={8} fontFamily="Arial Black" fontWeight="bold">$</text>
        </svg>

        <div style={{ opacity: counterOp, textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: '0 0 6px 0', letterSpacing: '0.1em' }}>TAX-FREE TOTAL</p>
          <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, margin: 0 }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>

        <div style={{ opacity: detailOp, transform: `scale(${detailScale})`, textAlign: 'center' }}>
          <p style={headline(30, BLACK)}>ALL TAX-FREE</p>
          <p style={{ ...headline(18, '#888'), marginTop: 6 }}>HSA STACKS ON TOP OF YOUR ROTH IRA</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: After 65 HSA becomes a second IRA — withdraw for anything
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const arrowOp = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Op = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Op = interpolate(frame, [122, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Op = interpolate(frame, [154, 184], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOp = interpolate(frame, [188, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 188), fps, config: { damping: 12, stiffness: 75 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 24 }}>
          <p style={headline(48, WHITE)}>THE BONUS</p>
          <p style={headline(48, ACCENT)}>NOBODY MENTIONS</p>
        </div>

        {/* Person silhouette with age 65 badge */}
        <svg
          width={200}
          height={160}
          viewBox="0 0 200 160"
          style={{ transform: `scale(${personScale})`, marginBottom: 18 }}
        >
          <circle cx="70" cy="36" r="26" fill="#3A3A3A" />
          <rect x="44" y="62" width="52" height="64" rx="14" fill="#3A3A3A" />
          <rect x="26" y="66" width="18" height="48" rx="9" fill="#3A3A3A" />
          <rect x="96" y="66" width="18" height="48" rx="9" fill="#3A3A3A" />
          <rect x="44" y="114" width="20" height="40" rx="8" fill="#3A3A3A" />
          <rect x="76" y="114" width="20" height="40" rx="8" fill="#3A3A3A" />
          <circle cx="136" cy="48" r="32" fill={ACCENT} />
          <text x="136" y="43" textAnchor="middle" fill={BLACK} fontSize={14} fontFamily="Arial Black" fontWeight="bold">AGE</text>
          <text x="136" y="62" textAnchor="middle" fill={BLACK} fontSize={22} fontFamily="Arial Black" fontWeight="bold">65</text>
        </svg>

        <div style={{ opacity: arrowOp, textAlign: 'center', marginBottom: 14 }}>
          <p style={headline(28, ACCENT)}>HSA BECOMES A SECOND IRA</p>
        </div>

        <div style={{ opacity: item1Op, marginBottom: 10, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>✓ Groceries</p>
        </div>
        <div style={{ opacity: item2Op, marginBottom: 10, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>✓ Travel</p>
        </div>
        <div style={{ opacity: item3Op, marginBottom: 18, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>✓ Anything at all</p>
        </div>

        <div style={{ opacity: punchOp, transform: `scale(${punchScale})`, textAlign: 'center' }}>
          <p style={headline(30, ACCENT)}>JUST PAY INCOME TAX</p>
          <p style={{ ...headline(18, '#888'), marginTop: 6 }}>NO PENALTY — LIKE A REGULAR IRA</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — pick HSA plan, max it, invest it
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const formScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const r1Op = interpolate(frame, [55, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [95, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3Op = interpolate(frame, [135, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [178, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 178), fps, config: { damping: 12, stiffness: 75 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 20 }}>
          <p style={headline(48, BLACK)}>YOUR MOVE</p>
          <p style={headline(48, ACCENT)}>THIS OPEN ENROLLMENT</p>
        </div>

        {/* Enrollment form SVG */}
        <svg
          width={200}
          height={140}
          viewBox="0 0 200 140"
          style={{ transform: `scale(${formScale})`, marginBottom: 24 }}
        >
          <rect x="20" y="10" width="160" height="120" rx="10" fill="#E0E0E0" />
          <rect x="20" y="10" width="160" height="32" rx="10" fill={ACCENT} />
          <text x="100" y="30" textAnchor="middle" fill={BLACK} fontSize={13} fontFamily="Arial Black" fontWeight="bold">OPEN ENROLLMENT</text>
          <rect x="36" y="56" width="80" height="8" rx="3" fill="#CCC" />
          <rect x="36" y="72" width="100" height="8" rx="3" fill="#CCC" />
          <rect x="36" y="88" width="70" height="8" rx="3" fill="#CCC" />
          <rect x="142" y="50" width="24" height="24" rx="5" fill={ACCENT} />
          <text x="154" y="67" textAnchor="middle" fill={BLACK} fontSize={16} fontFamily="Arial Black" fontWeight="bold">✓</text>
          <text x="100" y="118" textAnchor="middle" fill="#888" fontSize={12} fontFamily="Arial">SELECT: HSA-ELIGIBLE PLAN</text>
        </svg>

        <div style={{ opacity: r1Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>1. Pick an HSA-eligible health plan</p>
        </div>
        <div style={{ opacity: r2Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>2. Max it out — $4,150/year</p>
        </div>
        <div style={{ opacity: r3Op, marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>3. Invest it — don't spend it</p>
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={headline(36, ACCENT)}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(20, BLACK), marginTop: 8 }}>MONEY MOVES THEY DON'T TEACH YOU</p>
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
