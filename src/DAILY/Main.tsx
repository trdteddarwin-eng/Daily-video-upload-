import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

// ── Scene 1: Hook — 63% never negotiate ─────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const personIn = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 10, mass: 0.9 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 50), config: { damping: 12, mass: 0.8 } });
  const counterSp = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 20, mass: 1.2 } });

  const counterVal = Math.floor(interpolate(frame, [60, 200], [0, 1500000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, ACCENT), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          63% NEVER NEGOTIATE
        </p>

        {/* Person silhouette at desk */}
        <svg width="280" height="220" viewBox="0 0 280 220" style={{ transform: `scale(${personIn})`, transformOrigin: 'center' }}>
          <rect x="20" y="170" width="240" height="14" rx="6" fill={ACCENT} opacity="0.6" />
          <rect x="40" y="184" width="12" height="36" rx="4" fill={ACCENT} opacity="0.4" />
          <rect x="228" y="184" width="12" height="36" rx="4" fill={ACCENT} opacity="0.4" />
          <circle cx="140" cy="72" r="40" fill={WHITE} opacity="0.9" />
          <rect x="104" y="116" width="72" height="56" rx="20" fill={WHITE} opacity="0.9" />
          <rect x="88" y="138" width="104" height="28" rx="6" fill={ACCENT} opacity="0.3" />
          <rect x="96" y="144" width="60" height="4" rx="2" fill={ACCENT} opacity="0.6" />
          <rect x="96" y="154" width="40" height="4" rx="2" fill={ACCENT} opacity="0.4" />
          <line x1="162" y1="141" x2="180" y2="159" stroke={WHITE} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <line x1="180" y1="141" x2="162" y2="159" stroke={WHITE} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        </svg>

        <p style={{ ...headline(32, WHITE), opacity: subIn }}>THE PRICE OF SILENCE:</p>

        <p style={{
          fontFamily: FONT, fontSize: 88, color: ACCENT, margin: 0,
          transform: `scale(${counterSp})`, transformOrigin: 'center',
        }}>
          ${counterVal.toLocaleString()}
        </p>

        <p style={{ ...headline(28, WHITE), opacity: subIn }}>LIFETIME EARNINGS LOST</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Every offer is a floor ─────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const bar1Sp = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 12, mass: 0.9 } });
  const bar2Sp = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 12, mass: 0.9 } });
  const gapIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 10, mass: 0.7 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 14, mass: 0.8 } });

  const BAR_MAX = 340;
  const bar1H = bar1Sp * BAR_MAX * 0.65;
  const bar2H = bar2Sp * BAR_MAX;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(40, BLACK), opacity: titleIn }}>NUMBER ONE:</p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn }}>EVERY OFFER IS A FLOOR</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 60, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0 }}>$65K</p>
            <div style={{ width: 130, height: bar1H, background: 'rgba(0,0,0,0.25)', borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>THEIR OFFER</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0 }}>$75K</p>
            <div style={{ width: 130, height: bar2H, background: ACCENT, borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0 }}>REAL BUDGET</p>
          </div>
        </div>

        <div style={{
          opacity: gapIn,
          transform: `translateY(${(1 - gapIn) * 20}px)`,
          background: ACCENT, borderRadius: 50, padding: '12px 36px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>$5K–$10K GAP</p>
        </div>

        <p style={{ ...headline(28, BLACK), opacity: labelIn }}>THEY&apos;RE COUNTING ON YOU TO JUST SAY YES</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Raises are percentages — diverging lines ───────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 12, mass: 0.8 } });

  const lineProg = interpolate(frame, [20, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x1End = 40 + lineProg * 460;
  const y1End = 200 - lineProg * 140;
  const x2End = 40 + lineProg * 460;
  const y2End = 240 - lineProg * 30;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 50px', gap: 28,
      }}>
        <p style={{ ...headline(40, WHITE), opacity: titleIn }}>NUMBER TWO:</p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn }}>RAISES ARE PERCENTAGES</p>

        <svg width="540" height="300" viewBox="0 0 540 300">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="40" y1={60 + i * 60} x2="500" y2={60 + i * 60}
              stroke={WHITE} strokeWidth="1" opacity="0.1" />
          ))}
          <line x1="40" y1="40" x2="40" y2="270" stroke={WHITE} strokeWidth="2" opacity="0.4" />
          <line x1="40" y1="270" x2="510" y2="270" stroke={WHITE} strokeWidth="2" opacity="0.4" />
          <line x1="40" y1="200" x2={x1End} y2={y1End} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          <circle cx={x1End} cy={y1End} r="8" fill={ACCENT} />
          <line x1="40" y1="240" x2={x2End} y2={y2End} stroke={WHITE} strokeWidth="5" strokeLinecap="round" opacity="0.45" />
          <circle cx={x2End} cy={y2End} r="8" fill={WHITE} opacity="0.45" />
          <text x="46" y="196" fontSize="17" fill={ACCENT} fontFamily="Arial Black">NEGOTIATED</text>
          <text x="46" y="257" fontSize="17" fill={WHITE} fontFamily="Arial Black" opacity="0.55">SILENT</text>
          <text x="36" y="290" fontSize="14" fill={WHITE} opacity="0.5" fontFamily="Arial">NOW</text>
          <text x="472" y="290" fontSize="14" fill={WHITE} opacity="0.5" fontFamily="Arial">40 YRS</text>
        </svg>

        <p style={{ ...headline(28, WHITE), opacity: labelIn }}>LOW START = LOW FOREVER</p>
        <p style={{ ...headline(26, ACCENT), opacity: labelIn }}>EVERY 3% RAISE STAYS SMALL</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: $5K → $634K compound math ──────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const coinIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const barSp = spring({ fps, frame: Math.max(0, frame - 45), config: { damping: 12, mass: 0.8 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 110), config: { damping: 8, mass: 0.7 } });

  const counterVal = Math.floor(interpolate(frame, [45, 195], [5000, 634000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const barW = interpolate(barSp, [0, 1], [0, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(40, BLACK), opacity: titleIn }}>THAT $5,000 GAP…</p>
        <p style={{ ...headline(32, ACCENT), opacity: titleIn }}>AT 7% OVER 40 YEARS</p>

        <svg width="200" height="180" viewBox="0 0 200 180" style={{ transform: `scale(${coinIn})`, transformOrigin: 'center' }}>
          {[5, 4, 3, 2, 1, 0].map((i) => (
            <g key={i}>
              <ellipse cx="100" cy={140 - i * 14} rx="64" ry="18" fill={i === 0 ? '#059669' : '#047857'} />
              <ellipse cx="100" cy={132 - i * 14} rx="64" ry="18" fill={i === 0 ? ACCENT : '#059669'} />
              <ellipse cx="100" cy={128 - i * 14} rx="64" ry="18" fill={ACCENT} />
              <text x="100" y={133 - i * 14} textAnchor="middle" fontSize="16" fill={WHITE} fontFamily="Arial Black">$</text>
            </g>
          ))}
        </svg>

        <div style={{ width: '100%', background: 'rgba(0,0,0,0.12)', borderRadius: 12, height: 24, overflow: 'hidden' }}>
          <div style={{ width: barW, height: '100%', background: ACCENT, borderRadius: 12 }} />
        </div>

        <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, transform: `scale(${badgeIn})`, transformOrigin: 'center' }}>
          ${counterVal.toLocaleString()}
        </p>

        <p style={{ ...headline(26, BLACK), opacity: badgeIn }}>ONE CONVERSATION. SIX FIGURES.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Two piggy banks — negotiated vs silent ──────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const piggy1In = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const piggy2In = spring({ fps, frame: Math.max(0, frame - 45), config: { damping: 10, mass: 0.9 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 8, mass: 0.7 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 12, mass: 0.8 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 50px', gap: 24,
      }}>
        <p style={{ ...headline(38, WHITE), opacity: titleIn }}>OVER 40 YEARS</p>
        <p style={{ ...headline(34, ACCENT), opacity: titleIn }}>THE GAP IS ENORMOUS</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 48, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="180" height="180" viewBox="0 0 220 200" style={{ transform: `scale(${piggy1In})`, transformOrigin: 'center bottom' }}>
              <ellipse cx="104" cy="118" rx="78" ry="62" fill={ACCENT} />
              <circle cx="168" cy="90" r="38" fill={ACCENT} />
              <ellipse cx="196" cy="103" rx="18" ry="13" fill="#059669" />
              <circle cx="190" cy="103" r="4" fill={BLACK} opacity="0.5" />
              <circle cx="202" cy="103" r="4" fill={BLACK} opacity="0.5" />
              <circle cx="165" cy="76" r="7" fill={WHITE} />
              <circle cx="166" cy="77" r="3" fill={BLACK} />
              <ellipse cx="154" cy="56" rx="11" ry="16" fill="#059669" />
              <rect x="46" y="164" width="24" height="30" rx="9" fill="#059669" />
              <rect x="82" y="168" width="24" height="26" rx="9" fill="#059669" />
              <rect x="118" y="168" width="24" height="26" rx="9" fill="#059669" />
              <rect x="154" y="164" width="24" height="30" rx="9" fill="#059669" />
              <rect x="88" y="54" width="32" height="9" rx="4" fill={BLACK} opacity="0.35" />
              <path d="M28 112 Q10 92 20 70 Q32 48 18 36" stroke="#059669" strokeWidth="7" fill="none" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: 0 }}>NEGOTIATED</p>
            <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>$2.5M+</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg width="100" height="100" viewBox="0 0 220 200" style={{ transform: `scale(${piggy2In})`, transformOrigin: 'center bottom' }}>
              <ellipse cx="104" cy="118" rx="78" ry="62" fill={WHITE} opacity="0.3" />
              <circle cx="168" cy="90" r="38" fill={WHITE} opacity="0.3" />
              <ellipse cx="196" cy="103" rx="18" ry="13" fill={WHITE} opacity="0.2" />
              <circle cx="190" cy="103" r="4" fill={BLACK} opacity="0.3" />
              <circle cx="202" cy="103" r="4" fill={BLACK} opacity="0.3" />
              <circle cx="165" cy="76" r="7" fill={WHITE} opacity="0.5" />
              <circle cx="166" cy="77" r="3" fill={BLACK} opacity="0.4" />
              <ellipse cx="154" cy="56" rx="11" ry="16" fill={WHITE} opacity="0.2" />
              <rect x="46" y="164" width="24" height="30" rx="9" fill={WHITE} opacity="0.2" />
              <rect x="82" y="168" width="24" height="26" rx="9" fill={WHITE} opacity="0.2" />
              <rect x="118" y="168" width="24" height="26" rx="9" fill={WHITE} opacity="0.2" />
              <rect x="154" y="164" width="24" height="30" rx="9" fill={WHITE} opacity="0.2" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, opacity: 0.5 }}>SILENT</p>
            <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, opacity: 0.5 }}>$1M</p>
          </div>
        </div>

        <div style={{ transform: `scale(${badgeIn})`, transformOrigin: 'center', background: ACCENT, borderRadius: 60, padding: '16px 40px' }}>
          <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0, fontWeight: 900 }}>$1.5M DIFFERENCE</p>
        </div>

        <p style={{ ...headline(24, WHITE), opacity: labelIn }}>BONUSES + 401K — ALL OFF THAT NUMBER</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — look up market rate, ask 10% above ───────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const phoneIn = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 10, mass: 0.9 } });
  const card1 = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 12, mass: 0.8 } });
  const card2 = spring({ fps, frame: Math.max(0, frame - 75), config: { damping: 12, mass: 0.8 } });
  const card3 = spring({ fps, frame: Math.max(0, frame - 95), config: { damping: 12, mass: 0.8 } });
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 125), config: { damping: 10, mass: 0.7 } });

  const cards = [
    { text: 'LOOK UP YOUR MARKET RATE', sp: card1, highlight: false },
    { text: 'ASK 10% ABOVE THAT', sp: card2, highlight: false },
    { text: 'WORST THEY SAY IS NO', sp: card3, highlight: true },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 50px', gap: 24,
      }}>
        <p style={{ ...headline(42, BLACK), opacity: titleIn }}>THE FIX IS EASY</p>

        <svg width="200" height="290" viewBox="0 0 200 290" style={{ transform: `scale(${phoneIn})`, transformOrigin: 'center' }}>
          <rect x="8" y="8" width="184" height="274" rx="22" fill={BLACK} />
          <rect x="18" y="22" width="164" height="246" rx="14" fill={WHITE} />
          <text x="100" y="56" textAnchor="middle" fontSize="18" fill={BLACK} fontFamily="Arial Black">MARKET RATE</text>
          <line x1="24" y1="66" x2="176" y2="66" stroke={BLACK} strokeWidth="1.5" opacity="0.18" />
          <text x="24" y="94" fontSize="13" fill={BLACK} fontFamily="Arial">Software Eng III</text>
          <text x="24" y="116" fontSize="13" fill={ACCENT} fontFamily="Arial Black">$95K — $115K</text>
          <text x="24" y="144" fontSize="13" fill={BLACK} fontFamily="Arial">Product Manager</text>
          <text x="24" y="166" fontSize="13" fill={ACCENT} fontFamily="Arial Black">$110K — $135K</text>
          <text x="24" y="194" fontSize="13" fill={BLACK} fontFamily="Arial">Designer</text>
          <text x="24" y="216" fontSize="13" fill={ACCENT} fontFamily="Arial Black">$85K — $105K</text>
          <circle cx="158" cy="232" r="24" fill={ACCENT} />
          <path d="M147 232 L155 241 L172 221" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {cards.map((c, i) => (
          <div key={i} style={{
            width: '100%',
            background: c.highlight ? ACCENT : 'rgba(0,0,0,0.07)',
            borderRadius: 16,
            padding: '14px 24px',
            transform: `translateX(${(1 - c.sp) * 60}px)`,
            opacity: c.sp,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: c.highlight ? WHITE : BLACK, margin: 0 }}>{c.text}</p>
          </div>
        ))}

        <p style={{ ...headline(26, BLACK), opacity: ctaIn }}>SILENCE ALREADY COST YOU ENOUGH</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ──────────────────────────────────────────────────────────────

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
