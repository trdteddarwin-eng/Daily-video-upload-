import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const AMBER = '#F59E0B';
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

// Scene 6: Alternatives + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const r1Op = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [98, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3Op = interpolate(frame, [141, 171], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12, stiffness: 75 } });

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
          <p style={headline(40, BLACK)}>BEFORE YOU BORROW</p>
          <p style={headline(40, ACCENT)}>TRY THESE FIRST</p>
        </div>

        {/* Piggy bank SVG */}
        <svg
          width={136}
          height={112}
          viewBox="0 0 136 112"
          style={{ transform: `scale(${piggyScale})`, marginBottom: 22 }}
        >
          <ellipse cx="58" cy="74" rx="42" ry="34" fill={AMBER} opacity={0.9} />
          <circle cx="100" cy="60" r="21" fill={AMBER} opacity={0.9} />
          <ellipse cx="90" cy="44" rx="7" ry="9" fill={AMBER} />
          <ellipse cx="90" cy="44" rx="4" ry="6" fill="#F3D090" />
          <circle cx="104" cy="56" r="4" fill="#333" />
          <circle cx="105" cy="55" r="1.5" fill="#FFF" />
          <ellipse cx="113" cy="66" rx="10" ry="7" fill="#F3D090" />
          <circle cx="108" cy="67" r="2" fill="#D4905A" />
          <circle cx="117" cy="67" r="2" fill="#D4905A" />
          <rect x="24" y="98" width="14" height="13" rx="4" fill={AMBER} />
          <rect x="43" y="98" width="14" height="13" rx="4" fill={AMBER} />
          <rect x="62" y="98" width="14" height="13" rx="4" fill={AMBER} />
          <rect x="81" y="98" width="14" height="13" rx="4" fill={AMBER} />
          <rect x="46" y="42" width="24" height="4" rx="2" fill="#333" opacity={0.38} />
        </svg>

        <div style={{ opacity: r1Op, marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0 }}>✓ High-yield emergency fund</p>
        </div>
        <div style={{ opacity: r2Op, marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0 }}>✓ 0% APR credit card offer</p>
        </div>
        <div style={{ opacity: r3Op, marginBottom: 22, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0 }}>✓ Personal loan (low rate)</p>
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={headline(36, ACCENT)}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(20, BLACK), marginTop: 8 }}>MONEY MOVES THEY NEVER TAUGHT YOU</p>
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

// Scene 4: Lost compounding — $20K misses becoming $152K
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [25, 85], [0, 52], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [50, 168], [0, 248], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [88, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [162, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.round(
    interpolate(frame, [50, 168], [20000, 152000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const punchOp = interpolate(frame, [195, 222], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 195), fps, config: { damping: 12, stiffness: 75 } });

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
          <p style={headline(46, BLACK)}>THAT $20K OUT</p>
          <p style={headline(46, ACCENT)}>COSTS YOU $152K</p>
        </div>

        <svg width={300} height={300} viewBox="0 0 300 300" style={{ marginBottom: 16 }}>
          <line x1="40" y1="272" x2="280" y2="272" stroke="#CCC" strokeWidth="2" />
          <line x1="40" y1="18" x2="40" y2="272" stroke="#CCC" strokeWidth="2" />
          {/* borrowed bar */}
          <rect x="62" y={272 - bar1H} width="76" height={bar1H} rx="6" fill={ACCENT} opacity={0.85} />
          {/* lost value bar */}
          <rect x="164" y={272 - bar2H} width="76" height={bar2H} rx="6" fill={AMBER} opacity={0.9} />
          <text x="100" y="288" textAnchor="middle" fill="#888" fontSize={12} fontFamily="Arial">BORROWED</text>
          <text x="202" y="288" textAnchor="middle" fill="#888" fontSize={12} fontFamily="Arial">LOST VALUE</text>
          <text
            x="100"
            y={272 - bar1H - 10}
            textAnchor="middle"
            fill={ACCENT}
            fontSize={14}
            fontFamily="Arial Black"
            fontWeight="bold"
            opacity={label1Op}
          >$20K</text>
          <text
            x="202"
            y={Math.max(30, 272 - bar2H - 10)}
            textAnchor="middle"
            fill={AMBER}
            fontSize={14}
            fontFamily="Arial Black"
            fontWeight="bold"
            opacity={label2Op}
          >${Math.round(counterVal / 1000)}K</text>
        </svg>

        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', margin: '0 0 6px 0' }}>AT 7% FOR 30 YEARS</p>
          <p style={{ fontFamily: FONT, fontSize: 72, color: AMBER, margin: 0, letterSpacing: '-0.02em' }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>

        <div style={{ opacity: punchOp, transform: `scale(${punchScale})`, textAlign: 'center' }}>
          <p style={headline(28, BLACK)}>COMPOUNDING DOESN'T WAIT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Job-loss bomb — full balance due or 10% penalty
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const line1Op = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [108, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Op = interpolate(frame, [151, 181], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 26 }}>
          <p style={headline(46, WHITE)}>IF YOU LOSE</p>
          <p style={headline(46, ACCENT)}>YOUR JOB</p>
        </div>

        {/* Warning triangle */}
        <svg
          width={130}
          height={116}
          viewBox="0 0 130 116"
          style={{ transform: `scale(${warnScale})`, marginBottom: 26 }}
        >
          <polygon points="65,8 124,108 6,108" fill={ACCENT} opacity={0.12} />
          <polygon points="65,8 124,108 6,108" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinejoin="round" />
          <text x="65" y="84" textAnchor="middle" fill={ACCENT} fontSize={56} fontFamily="Arial Black" fontWeight="bold">!</text>
        </svg>

        <div style={{ opacity: line1Op, marginBottom: 16, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>Entire loan balance is due immediately</p>
        </div>
        <div style={{ opacity: line2Op, marginBottom: 16, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>Counted as taxable income if unpaid</p>
        </div>
        <div style={{ opacity: line3Op, marginBottom: 22, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>Plus a 10% early withdrawal penalty</p>
        </div>

        <div style={{ opacity: punchOp, transform: `scale(${punchScale})`, textAlign: 'center' }}>
          <p style={headline(30, AMBER)}>$20K LOAN → $26K+ TAX BILL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Pre-tax in, after-tax repayment — double tax setup
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vaultScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const arrow1Op = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2Op = interpolate(frame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow3Op = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOp = interpolate(frame, [188, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          <p style={headline(50, BLACK)}>THE MONEY</p>
          <p style={headline(50, ACCENT)}>GOES IN TWICE</p>
        </div>

        {/* Vault SVG */}
        <svg
          width={124}
          height={112}
          viewBox="0 0 124 112"
          style={{ transform: `scale(${vaultScale})`, marginBottom: 24 }}
        >
          <rect x="8" y="8" width="108" height="96" rx="10" fill="#D0D0D0" />
          <rect x="8" y="8" width="108" height="96" rx="10" fill="none" stroke="#999" strokeWidth="3" />
          <circle cx="62" cy="56" r="24" fill="#B8B8B8" stroke="#999" strokeWidth="2.5" />
          <circle cx="62" cy="56" r="15" fill="#A0A0A0" />
          <line x1="62" y1="56" x2="62" y2="41" stroke="#777" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="56" x2="75" y2="63" stroke="#777" strokeWidth="3" strokeLinecap="round" />
          <text x="62" y="22" textAnchor="middle" fill="#666" fontSize={11} fontFamily="Arial Black" fontWeight="bold">401(K)</text>
        </svg>

        {/* Flow steps */}
        <div
          style={{
            opacity: arrow1Op,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
          <p style={{ fontFamily: FONT, fontSize: 21, color: BLACK, margin: 0 }}>PRE-TAX DOLLARS GO IN</p>
        </div>
        <div
          style={{
            opacity: arrow2Op,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: AMBER, flexShrink: 0 }} />
          <p style={{ fontFamily: FONT, fontSize: 21, color: BLACK, margin: 0 }}>LOAN COMES OUT UNTAXED</p>
        </div>
        <div
          style={{
            opacity: arrow3Op,
            marginBottom: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
          <p style={{ fontFamily: FONT, fontSize: 21, color: BLACK, margin: 0 }}>YOU REPAY WITH AFTER-TAX $</p>
        </div>

        <div style={{ opacity: punchOp, textAlign: 'center' }}>
          <p style={headline(32, ACCENT)}>SAME MONEY.</p>
          <p style={headline(32, BLACK)}>TAXED TWICE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Double tax stamp at withdrawal
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const stamp1Op = interpolate(frame, [60, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stamp1Scale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 80 } });
  const stamp2Op = interpolate(frame, [118, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stamp2Scale = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 10, stiffness: 80 } });
  const punchOp = interpolate(frame, [178, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchScale = spring({ frame: Math.max(0, frame - 178), fps, config: { damping: 12, stiffness: 75 } });

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
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 26 }}>
          <p style={headline(46, WHITE)}>AT RETIREMENT</p>
          <p style={headline(46, ACCENT)}>TAXED A SECOND TIME</p>
        </div>

        {/* Dollar bill SVG */}
        <svg
          width={230}
          height={100}
          viewBox="0 0 230 100"
          style={{ transform: `scale(${billScale})`, marginBottom: 22 }}
        >
          <rect x="8" y="18" width="214" height="64" rx="8" fill="#1A3A1A" />
          <rect x="8" y="18" width="214" height="64" rx="8" fill="none" stroke="#2D6A4F" strokeWidth="2" />
          <rect x="18" y="26" width="46" height="48" rx="6" fill="#2D6A4F" />
          <circle cx="41" cy="50" r="16" fill="#1A3A1A" />
          <text x="41" y="56" textAnchor="middle" fill="#4CAF72" fontSize={18} fontFamily="Arial Black" fontWeight="bold">$</text>
          <text x="132" y="56" textAnchor="middle" fill="#4CAF72" fontSize={24} fontFamily="Arial Black" fontWeight="bold">$20,000</text>
          <rect x="166" y="26" width="46" height="48" rx="6" fill="#2D6A4F" />
          <circle cx="189" cy="50" r="16" fill="#1A3A1A" />
          <text x="189" y="56" textAnchor="middle" fill="#4CAF72" fontSize={18} fontFamily="Arial Black" fontWeight="bold">$</text>
        </svg>

        {/* Tax stamp 1 */}
        <div
          style={{
            opacity: stamp1Op,
            transform: `scale(${stamp1Scale}) rotate(-7deg)`,
            marginBottom: 16,
          }}
        >
          <svg width={270} height={58} viewBox="0 0 270 58">
            <rect x="4" y="4" width="262" height="50" rx="7" fill="none" stroke={ACCENT} strokeWidth="3.5" />
            <text x="135" y="35" textAnchor="middle" fill={ACCENT} fontSize={18} fontFamily="Arial Black" fontWeight="bold">TAX PAID ON REPAYMENT</text>
          </svg>
        </div>

        {/* Tax stamp 2 */}
        <div
          style={{
            opacity: stamp2Op,
            transform: `scale(${stamp2Scale}) rotate(5deg)`,
            marginBottom: 22,
          }}
        >
          <svg width={270} height={58} viewBox="0 0 270 58">
            <rect x="4" y="4" width="262" height="50" rx="7" fill="none" stroke={ACCENT} strokeWidth="3.5" />
            <text x="135" y="35" textAnchor="middle" fill={ACCENT} fontSize={18} fontFamily="Arial Black" fontWeight="bold">TAX PAID AT WITHDRAWAL</text>
          </svg>
        </div>

        <div
          style={{
            opacity: punchOp,
            transform: `scale(${punchScale})`,
            textAlign: 'center',
          }}
        >
          <p style={headline(30, AMBER)}>MOST PEOPLE NEVER DO THIS MATH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Hook — 1 in 4 people raid their 401k
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const loanOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const loanScale = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 80 } });
  const statOp = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          <p style={headline(46, WHITE)}>1 IN 4 PEOPLE</p>
          <p style={headline(46, ACCENT)}>RAID THEIR 401K</p>
        </div>

        {/* 401k statement document */}
        <svg
          width={270}
          height={200}
          viewBox="0 0 270 200"
          style={{ transform: `scale(${docScale})`, marginBottom: 22 }}
        >
          <rect x="10" y="10" width="250" height="180" rx="10" fill="#1E1E1E" />
          <rect x="10" y="10" width="250" height="42" rx="10" fill="#2A2A2A" />
          <rect x="10" y="38" width="250" height="14" fill="#2A2A2A" />
          <text x="135" y="36" textAnchor="middle" fill="#888" fontSize={13} fontFamily="Arial Black" fontWeight="bold">401(K) STATEMENT</text>
          <text x="30" y="78" fill="#666" fontSize={13} fontFamily="Arial">TOTAL BALANCE</text>
          <text x="240" y="78" textAnchor="end" fill={WHITE} fontSize={19} fontFamily="Arial Black" fontWeight="bold">$80,000</text>
          <line x1="30" y1="92" x2="240" y2="92" stroke="#333" strokeWidth="1" />
          <text x="30" y="118" fill="#666" fontSize={13} fontFamily="Arial">LOAN TAKEN</text>
          <text x="240" y="118" textAnchor="end" fill={AMBER} fontSize={19} fontFamily="Arial Black" fontWeight="bold">$20,000</text>
          <line x1="30" y1="132" x2="240" y2="132" stroke="#333" strokeWidth="1" />
          <text x="30" y="158" fill="#666" fontSize={13} fontFamily="Arial">REMAINING</text>
          <text x="240" y="158" textAnchor="end" fill={WHITE} fontSize={19} fontFamily="Arial Black" fontWeight="bold">$60,000</text>
        </svg>

        {/* LOAN stamp */}
        <div
          style={{
            opacity: loanOp,
            transform: `scale(${loanScale}) rotate(-12deg)`,
            marginBottom: 20,
          }}
        >
          <svg width={190} height={62} viewBox="0 0 190 62">
            <rect x="4" y="4" width="182" height="54" rx="8" fill="none" stroke={ACCENT} strokeWidth="4" />
            <text x="95" y="42" textAnchor="middle" fill={ACCENT} fontSize={34} fontFamily="Arial Black" fontWeight="bold">LOAN</text>
          </svg>
        </div>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 21, color: '#888', margin: 0 }}>BUT HERE'S WHAT NOBODY TELLS YOU</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
