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

// ── Scene 1: Hook — split it evenly trap ────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const plateIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 12, mass: 0.8 } });
  const dollar1 = spring({ fps, frame: Math.max(0, frame - 70), config: { damping: 8, mass: 0.7 } });
  const dollar2 = spring({ fps, frame: Math.max(0, frame - 85), config: { damping: 8, mass: 0.7 } });
  const dollar3 = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 8, mass: 0.7 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <p style={{ ...headline(52, ACCENT), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          LET&apos;S JUST
        </p>
        <p style={{ ...headline(96, WHITE), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          SPLIT IT
        </p>

        {/* Restaurant plate with fork and knife */}
        <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: `scale(${plateIn})`, transformOrigin: 'center' }}>
          <circle cx="130" cy="130" r="110" fill="none" stroke={ACCENT} strokeWidth="6" />
          <circle cx="130" cy="130" r="88" fill="none" stroke={ACCENT} strokeWidth="2" opacity="0.4" />
          {/* Fork */}
          <rect x="72" y="60" width="6" height="70" rx="3" fill={WHITE} />
          <rect x="65" y="60" width="4" height="30" rx="2" fill={WHITE} />
          <rect x="79" y="60" width="4" height="30" rx="2" fill={WHITE} />
          <rect x="72" y="130" width="6" height="70" rx="3" fill={WHITE} />
          {/* Knife */}
          <rect x="182" y="60" width="6" height="80" rx="3" fill={WHITE} />
          <path d="M188 60 Q200 80 188 140" fill={WHITE} opacity="0.8" />
          <rect x="182" y="140" width="6" height="60" rx="3" fill={WHITE} />
          {/* Dollar sign on plate */}
          <text x="130" y="150" textAnchor="middle" fontSize="56" fill={ACCENT} fontFamily="Arial Black" fontWeight="900">$</text>
        </svg>

        <p style={{ ...headline(38, WHITE), opacity: subIn, transform: `translateY(${(1 - subIn) * 30}px)` }}>
          THAT ONE PHRASE
        </p>
        <p style={{ ...headline(30, ACCENT), opacity: subIn, transform: `translateY(${(1 - subIn) * 30}px)` }}>
          COSTS YOU $1,100/YEAR
        </p>

        <div style={{ position: 'absolute', top: 200, left: 80, transform: `scale(${dollar1}) rotate(-15deg)`, fontSize: 56, color: ACCENT, fontFamily: FONT, opacity: 0.6 }}>$</div>
        <div style={{ position: 'absolute', top: 170, right: 70, transform: `scale(${dollar2}) rotate(12deg)`, fontSize: 48, color: ACCENT, fontFamily: FONT, opacity: 0.4 }}>$</div>
        <div style={{ position: 'absolute', bottom: 250, left: 100, transform: `scale(${dollar3}) rotate(-6deg)`, fontSize: 40, color: ACCENT, fontFamily: FONT, opacity: 0.3 }}>$</div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Brain recalculates shared costs ────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const brainIn = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 12, mass: 0.9 } });
  const bubble1 = spring({ fps, frame: Math.max(0, frame - 40), config: { damping: 10, mass: 0.8 } });
  const bubble2 = spring({ fps, frame: Math.max(0, frame - 65), config: { damping: 10, mass: 0.8 } });
  const bubble3 = spring({ fps, frame: Math.max(0, frame - 90), config: { damping: 10, mass: 0.8 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 115), config: { damping: 14, mass: 0.7 } });

  const bubbles = [
    { label: 'LOBSTER — ONLY $8 EACH', sp: bubble1 },
    { label: 'COCKTAIL — JUST $4 EACH', sp: bubble2 },
    { label: 'DESSERT — WHY NOT?', sp: bubble3 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 50px', gap: 28,
      }}>
        <p style={{ ...headline(44, BLACK), opacity: titleIn }}>YOUR BRAIN&apos;S</p>
        <p style={{ ...headline(44, ACCENT), opacity: titleIn }}>MATH CHANGES</p>

        {/* Brain SVG */}
        <svg width="180" height="160" viewBox="0 0 180 160" style={{ transform: `scale(${brainIn})`, transformOrigin: 'center' }}>
          <path d="M90 148 C48 148 18 120 18 88 C18 68 30 52 50 46 C50 28 63 14 80 14 C86 7 94 4 102 7 C114 4 127 12 130 25 C147 27 162 42 162 63 C170 72 172 86 167 99 C160 122 132 148 90 148Z" fill="none" stroke={BLACK} strokeWidth="5" />
          <path d="M90 28 C90 50 80 66 70 82 C80 98 90 114 90 132" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M52 62 C64 70 76 72 86 67" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M44 98 C58 90 73 92 83 100" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M117 56 C128 67 134 82 130 98" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>

        {/* Thought bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {bubbles.map((b, i) => (
            <div key={i} style={{
              background: WHITE,
              borderLeft: `6px solid ${ACCENT}`,
              borderRadius: 16,
              padding: '14px 24px',
              transform: `translateX(${(1 - b.sp) * 80}px)`,
              opacity: b.sp,
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>{b.label}</p>
            </div>
          ))}
        </div>

        <p style={{ ...headline(30, BLACK), opacity: labelIn }}>SHARED COST = MORE SPENDING</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: 30% higher bill — bar chart ────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const bar1Sp = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 12, mass: 0.9 } });
  const bar2Sp = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 12, mass: 0.9 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 105), config: { damping: 8, mass: 0.7 } });

  const BAR_MAX = 320;
  const bar1H = bar1Sp * BAR_MAX * 0.774; // $48 / $62 ≈ 77.4%
  const bar2H = bar2Sp * BAR_MAX;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 36,
      }}>
        <p style={{ ...headline(42, WHITE), opacity: titleIn }}>RESEARCHERS FOUND:</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 56, width: '100%' }}>
          {/* Bar 1 — Pay Own */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 40, color: WHITE, margin: 0 }}>$48</p>
            <div style={{ width: 130, height: bar1H, background: WHITE, borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' as const, lineHeight: 1.3 }}>{'PAY\nOWN'}</p>
          </div>
          {/* Bar 2 — Split Equally */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, margin: 0 }}>$62</p>
            <div style={{ width: 130, height: bar2H, background: ACCENT, borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0, textAlign: 'center' as const, lineHeight: 1.3 }}>{'SPLIT\nEQUAL'}</p>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          transform: `scale(${badgeIn})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 60, padding: '18px 44px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 52, color: WHITE, margin: 0, fontWeight: 900 }}>+30% MORE</p>
        </div>

        <p style={{ ...headline(30, WHITE), opacity: badgeIn }}>PER PERSON. EVERY TIME.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: The social trap — nobody wants to look cheap ───────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const person1In = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const person2In = spring({ fps, frame: Math.max(0, frame - 40), config: { damping: 10, mass: 0.9 } });
  const bubble1In = spring({ fps, frame: Math.max(0, frame - 68), config: { damping: 10, mass: 0.8 } });
  const bubble2In = spring({ fps, frame: Math.max(0, frame - 88), config: { damping: 10, mass: 0.8 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 115), config: { damping: 12, mass: 0.7 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 40px', gap: 24,
      }}>
        <p style={{ ...headline(44, BLACK), opacity: titleIn }}>THE SOCIAL TRAP</p>
        <p style={{ ...headline(34, ACCENT), opacity: titleIn }}>NOBODY TALKS ABOUT</p>

        <svg width="540" height="340" viewBox="0 0 540 340">
          {/* Table */}
          <rect x="120" y="216" width="300" height="20" rx="8" fill={BLACK} opacity="0.15" />
          <rect x="100" y="230" width="340" height="12" rx="6" fill={BLACK} opacity="0.1" />

          {/* Person 1 */}
          <g style={{ transform: `scale(${person1In})`, transformOrigin: '148px 180px' }}>
            <circle cx="148" cy="100" r="38" fill={BLACK} opacity="0.8" />
            <rect x="114" y="142" width="68" height="72" rx="22" fill={BLACK} opacity="0.8" />
          </g>

          {/* Person 2 */}
          <g style={{ transform: `scale(${person2In})`, transformOrigin: '392px 180px' }}>
            <circle cx="392" cy="100" r="38" fill={BLACK} opacity="0.8" />
            <rect x="358" y="142" width="68" height="72" rx="22" fill={BLACK} opacity="0.8" />
          </g>

          {/* Thought bubble person 1 */}
          <g opacity={bubble1In} transform={`translate(0, ${(1 - bubble1In) * -24})`}>
            <rect x="8" y="6" width="192" height="56" rx="14" fill={ACCENT} />
            <text x="104" y="40" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black" fontWeight="900">I LOOK CHEAP</text>
          </g>

          {/* Thought bubble person 2 */}
          <g opacity={bubble2In} transform={`translate(0, ${(1 - bubble2In) * -24})`}>
            <rect x="340" y="6" width="192" height="56" rx="14" fill={ACCENT} />
            <text x="436" y="40" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black" fontWeight="900">I LOOK CHEAP</text>
          </g>

          {/* Plate center */}
          <circle cx="270" cy="210" r="34" fill="none" stroke={BLACK} strokeWidth="4" opacity="0.25" />
          <text x="270" y="221" textAnchor="middle" fontSize="28" fill={ACCENT} fontFamily="Arial Black">$</text>
        </svg>

        <p style={{ ...headline(32, BLACK), opacity: labelIn }}>EVERYONE ORDERS MORE</p>
        <p style={{ ...headline(28, ACCENT), opacity: labelIn }}>NOBODY SAYS ANYTHING</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Compound cost — $1,100 → $15,300 piggy bank ───────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const piggyIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const barIn = spring({ fps, frame: Math.max(0, frame - 50), config: { damping: 12, mass: 0.8 } });
  const amountIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 10, mass: 0.7 } });

  const barW = interpolate(barIn, [0, 1], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterVal = Math.floor(interpolate(frame, [50, 190], [0, 15300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <p style={{ ...headline(38, WHITE), opacity: titleIn }}>OVER 10 YEARS</p>
        <p style={{ ...headline(34, ACCENT), opacity: titleIn }}>THAT $1,100 BECOMES…</p>

        {/* Piggy bank SVG */}
        <svg width="220" height="200" viewBox="0 0 220 200" style={{ transform: `scale(${piggyIn})`, transformOrigin: 'center' }}>
          {/* Body */}
          <ellipse cx="104" cy="118" rx="78" ry="62" fill={ACCENT} />
          {/* Head */}
          <circle cx="168" cy="90" r="38" fill={ACCENT} />
          {/* Snout */}
          <ellipse cx="196" cy="103" rx="18" ry="13" fill="#E86F00" />
          <circle cx="190" cy="103" r="4" fill={BLACK} opacity="0.5" />
          <circle cx="202" cy="103" r="4" fill={BLACK} opacity="0.5" />
          {/* Eye */}
          <circle cx="165" cy="76" r="7" fill={WHITE} />
          <circle cx="166" cy="77" r="3" fill={BLACK} />
          {/* Ear */}
          <ellipse cx="154" cy="56" rx="11" ry="16" fill="#E86F00" />
          {/* Legs */}
          <rect x="46" y="164" width="24" height="30" rx="9" fill="#E86F00" />
          <rect x="82" y="168" width="24" height="26" rx="9" fill="#E86F00" />
          <rect x="118" y="168" width="24" height="26" rx="9" fill="#E86F00" />
          <rect x="154" y="164" width="24" height="30" rx="9" fill="#E86F00" />
          {/* Coin slot */}
          <rect x="88" y="54" width="32" height="9" rx="4" fill={BLACK} opacity="0.35" />
          {/* Tail */}
          <path d="M28 112 Q10 92 20 70 Q32 48 18 36" stroke="#E86F00" strokeWidth="7" fill="none" strokeLinecap="round" />
        </svg>

        {/* Progress bar */}
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 12, height: 28, overflow: 'hidden' }}>
          <div style={{ width: barW, height: '100%', background: ACCENT, borderRadius: 12 }} />
        </div>

        {/* Counter */}
        <p style={{ fontFamily: FONT, fontSize: 96, color: ACCENT, margin: 0, transform: `scale(${amountIn})`, transformOrigin: 'center' }}>
          ${counterVal.toLocaleString()}
        </p>
        <p style={{ ...headline(26, WHITE), opacity: amountIn }}>AT 7% ANNUAL RETURN · 10 YEARS</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — split by item, not total ─────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const phoneIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const card1 = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 12, mass: 0.8 } });
  const card2 = spring({ fps, frame: Math.max(0, frame - 75), config: { damping: 12, mass: 0.8 } });
  const card3 = spring({ fps, frame: Math.max(0, frame - 95), config: { damping: 12, mass: 0.8 } });
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 125), config: { damping: 10, mass: 0.7 } });

  const cards = [
    { text: 'SPLIT BY ITEM, NOT TOTAL', sp: card1, highlight: false },
    { text: 'USE SPLITWISE OR VENMO', sp: card2, highlight: false },
    { text: 'SAVE $1,100 A YEAR', sp: card3, highlight: true },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 50px', gap: 24,
      }}>
        <p style={{ ...headline(44, BLACK), opacity: titleIn }}>THE EASY FIX</p>

        {/* Phone with itemized receipt */}
        <svg width="230" height="350" viewBox="0 0 230 350" style={{ transform: `scale(${phoneIn})`, transformOrigin: 'center' }}>
          {/* Phone body */}
          <rect x="8" y="8" width="214" height="334" rx="24" fill={BLACK} />
          <rect x="18" y="24" width="194" height="302" rx="14" fill={WHITE} />
          {/* Receipt header */}
          <text x="115" y="62" textAnchor="middle" fontSize="22" fill={BLACK} fontFamily="Arial Black" fontWeight="900">RECEIPT</text>
          <line x1="28" y1="74" x2="202" y2="74" stroke={BLACK} strokeWidth="2" opacity="0.18" />
          {/* Items */}
          <text x="32" y="102" fontSize="15" fill={BLACK} fontFamily="Arial">Your items:</text>
          <text x="32" y="132" fontSize="15" fill={BLACK} fontFamily="Arial">Pasta .............. $18</text>
          <text x="32" y="158" fontSize="15" fill={BLACK} fontFamily="Arial">Sparkling water .. $4</text>
          <line x1="28" y1="174" x2="202" y2="174" stroke={BLACK} strokeWidth="2" opacity="0.18" />
          <text x="32" y="202" fontSize="18" fill={ACCENT} fontFamily="Arial Black" fontWeight="900">YOU PAY: $22</text>
          {/* Checkmark badge */}
          <circle cx="180" cy="272" r="28" fill={ACCENT} />
          <path d="M167 272 L177 283 L196 260" stroke={WHITE} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Action cards */}
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

        <p style={{ ...headline(26, BLACK), opacity: ctaIn }}>FOLLOW FOR MORE MONEY HACKS</p>
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
