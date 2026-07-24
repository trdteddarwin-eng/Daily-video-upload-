import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── SCENE 1 — Hook: $80 brand pill vs $4 generic reveal ──────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const leftIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 25 });
  const rightIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 60 });
  const eqIn = spring({ frame, fps, config: { damping: 10, stiffness: 120 }, delay: 95 });
  const labelIn = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 130 });
  const badgeOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px', gap: 0 }}>
        <p style={{ ...headline(52, WHITE), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 4 }}>YOUR $80 PILL</p>
        <p style={{ ...headline(52, ACCENT), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 44 }}>HAS A $4 TWIN</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 32 }}>
          {/* Brand bottle */}
          <div style={{ opacity: leftIn, transform: `translateX(${(1 - leftIn) * -50}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="90" height="140" viewBox="0 0 90 140">
              <rect x="28" y="0" width="34" height="20" rx="6" fill="#E97316" />
              <rect x="14" y="18" width="62" height="100" rx="10" fill="#F97316" />
              <rect x="20" y="34" width="50" height="68" rx="6" fill={WHITE} />
              <ellipse cx="45" cy="56" rx="16" ry="10" fill="#F97316" />
              <text x="45" y="78" fontSize="13" fill={BLACK} textAnchor="middle" fontFamily="Arial Black">BRAND</text>
              <text x="45" y="94" fontSize="10" fill="#888" textAnchor="middle" fontFamily="Arial">name drug</text>
            </svg>
            <div style={{ background: RED, borderRadius: 12, padding: '10px 20px' }}>
              <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>$79.99</p>
            </div>
          </div>
          {/* Equals sign */}
          <div style={{ opacity: eqIn, transform: `scale(${eqIn})` }}>
            <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>≡</p>
          </div>
          {/* Generic bottle */}
          <div style={{ opacity: rightIn, transform: `translateX(${(1 - rightIn) * 50}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="90" height="140" viewBox="0 0 90 140">
              <rect x="28" y="0" width="34" height="20" rx="6" fill="#555" />
              <rect x="14" y="18" width="62" height="100" rx="10" fill="#777" />
              <rect x="20" y="34" width="50" height="68" rx="6" fill={WHITE} />
              <ellipse cx="45" cy="56" rx="16" ry="10" fill="#777" />
              <text x="45" y="78" fontSize="13" fill={BLACK} textAnchor="middle" fontFamily="Arial Black">GENERIC</text>
              <text x="45" y="94" fontSize="10" fill="#888" textAnchor="middle" fontFamily="Arial">same drug</text>
            </svg>
            <div style={{ background: ACCENT, borderRadius: 12, padding: '10px 20px' }}>
              <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>$3.99</p>
            </div>
          </div>
        </div>
        <div style={{ opacity: labelIn, transform: `translateY(${(1 - labelIn) * 20}px)`, marginBottom: 18 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: WHITE, textAlign: 'center', margin: 0 }}>same drug · same dose · same factory</p>
        </div>
        <div style={{ opacity: badgeOp, background: ACCENT, borderRadius: 14, padding: '12px 32px' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>FDA CONFIRMED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 2 — FDA bioequivalence explained ────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const sealIn = spring({ frame, fps, config: { damping: 10, stiffness: 80 }, delay: 20 });
  const items = [
    { label: 'SAME ACTIVE INGREDIENT', delay: 60 },
    { label: 'SAME DOSAGE', delay: 100 },
    { label: 'SAME ABSORPTION RATE', delay: 140 },
  ];
  const badgeIn = spring({ frame: Math.max(0, frame - 175), fps, config: { damping: 10, stiffness: 150 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 0 }}>
        <p style={{ ...headline(42, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>LEGALLY</p>
        <p style={{ ...headline(42, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 28 }}>IDENTICAL</p>
        {/* FDA seal */}
        <div style={{ opacity: sealIn, transform: `scale(${sealIn})`, marginBottom: 22 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="58" fill={ACCENT} />
            <circle cx="60" cy="60" r="50" fill="none" stroke={WHITE} strokeWidth="2" strokeDasharray="6 4" />
            <text x="60" y="52" fontSize="28" fill={WHITE} textAnchor="middle" fontFamily="Arial Black" fontWeight="bold">FDA</text>
            <text x="60" y="72" fontSize="13" fill={WHITE} textAnchor="middle" fontFamily="Arial">APPROVED</text>
            <text x="60" y="88" fontSize="11" fill={WHITE} textAnchor="middle" fontFamily="Arial">BIOEQUIVALENT</text>
          </svg>
        </div>
        {/* Two pills with equals */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <svg width="80" height="36" viewBox="0 0 80 36">
            <ellipse cx="40" cy="18" rx="36" ry="14" fill="#F97316" />
            <line x1="40" y1="4" x2="40" y2="32" stroke={WHITE} strokeWidth="2" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 48, color: BLACK, margin: 0 }}>=</p>
          <svg width="80" height="36" viewBox="0 0 80 36">
            <rect x="4" y="6" width="72" height="24" rx="12" fill="#888" />
            <line x1="40" y1="6" x2="40" y2="30" stroke={WHITE} strokeWidth="2" />
          </svg>
        </div>
        {/* Requirements checklist */}
        {items.map((item, i) => {
          const itemIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: item.delay });
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, opacity: itemIn, transform: `translateX(${(1 - itemIn) * -30}px)`, width: '100%' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polyline points="3,9 7,13 15,5" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, letterSpacing: '0.04em' }}>{item.label}</p>
            </div>
          );
        })}
        <div style={{ opacity: badgeIn, transform: `scale(${badgeIn})`, marginTop: 14, background: BLACK, borderRadius: 16, padding: '14px 34px' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>BIOEQUIVALENT</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: WHITE, margin: '6px 0 0 0', textAlign: 'center' }}>FDA's legal standard</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 3 — Different appearance, same drug, $6B in ads ────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const pill1In = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 25 });
  const pill2In = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 60 });
  const brainIn = spring({ frame, fps, config: { damping: 10, stiffness: 80 }, delay: 90 });
  const adCount = Math.floor(interpolate(frame, [110, 195], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const tagIn = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 12, stiffness: 120 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 60px', gap: 0 }}>
        <p style={{ ...headline(44, WHITE), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>THE TRICK</p>
        <p style={{ ...headline(44, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 32 }}>THEY PLAY</p>
        {/* Three pills: brand, brain, generic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginBottom: 22 }}>
          {/* Brand: round orange */}
          <div style={{ opacity: pill1In, transform: `scale(${pill1In})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="42" fill="#F97316" />
              <line x1="48" y1="6" x2="48" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <text x="48" y="44" fontSize="11" fill={WHITE} textAnchor="middle" fontFamily="Arial">BRAND</text>
              <text x="48" y="58" fontSize="10" fill={WHITE} textAnchor="middle" fontFamily="Arial">NAME</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 19, color: '#F97316', margin: 0 }}>ROUND/ORANGE</p>
          </div>
          {/* Brain with question mark */}
          <div style={{ opacity: brainIn, transform: `scale(${brainIn})` }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <path d="M38 68 Q15 64 10 50 Q4 34 14 22 Q22 10 32 12 Q36 6 38 8 Q40 6 44 12 Q54 10 62 22 Q72 34 66 50 Q61 64 38 68 Z" fill="#1a1a2e" stroke="#444" strokeWidth="2" />
              <path d="M24 28 Q30 22 36 28 Q42 34 36 40" fill="none" stroke="#555" strokeWidth="1.5" />
              <path d="M40 28 Q46 22 52 28 Q58 34 52 40" fill="none" stroke="#555" strokeWidth="1.5" />
              <text x="38" y="56" fontSize="26" fill={RED} textAnchor="middle" fontFamily="Arial Black">?</text>
            </svg>
          </div>
          {/* Generic: oval white */}
          <div style={{ opacity: pill2In, transform: `scale(${pill2In})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="96" height="64" viewBox="0 0 96 64">
              <rect x="4" y="6" width="88" height="52" rx="26" fill="#CCC" />
              <line x1="48" y1="6" x2="48" y2="58" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
              <text x="48" y="28" fontSize="11" fill={BLACK} textAnchor="middle" fontFamily="Arial">GENERIC</text>
              <text x="48" y="44" fontSize="10" fill="#666" textAnchor="middle" fontFamily="Arial">OBLONG</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 19, color: '#CCC', margin: 0 }}>OVAL/WHITE</p>
          </div>
        </div>
        <div style={{ marginBottom: 20, background: '#1a1a2e', borderRadius: 12, padding: '10px 24px' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#AAA', textAlign: 'center', margin: 0 }}>different dyes · different shapes · same drug inside</p>
        </div>
        {/* $6B counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 88, color: RED, margin: 0, lineHeight: 1 }}>${adCount}B</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: WHITE, textAlign: 'center', margin: 0 }}>spent every year on ads to make you doubt generics</p>
        </div>
        <div style={{ opacity: tagIn, transform: `translateY(${(1 - tagIn) * 20}px)` }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, textAlign: 'center', margin: 0 }}>PURE MARKETING PSYCHOLOGY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 4 — The real cost: $600/year and $50B nationally ───────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const indivCount = Math.floor(interpolate(frame, [20, 130], [0, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const countScale = spring({ frame: Math.max(0, frame - 120), fps, from: 1, to: 1.08, config: { damping: 8, stiffness: 120 } });
  const perIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 115 });
  const nationIn = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 10, stiffness: 100 } });
  const tagIn = spring({ frame: Math.max(0, frame - 188), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 0 }}>
        <p style={{ ...headline(44, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>THE REAL</p>
        <p style={{ ...headline(44, RED), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 24 }}>PRICE TAG</p>
        {/* Person icon */}
        <svg width="80" height="108" viewBox="0 0 80 108" style={{ marginBottom: 10 }}>
          <circle cx="40" cy="22" r="18" fill={ACCENT} />
          <rect x="24" y="44" width="32" height="40" rx="8" fill={ACCENT} />
          <rect x="6" y="48" width="20" height="9" rx="4" fill={ACCENT} />
          <rect x="54" y="48" width="20" height="9" rx="4" fill={ACCENT} />
          <rect x="26" y="80" width="11" height="26" rx="5" fill={ACCENT} />
          <rect x="43" y="80" width="11" height="26" rx="5" fill={ACCENT} />
        </svg>
        <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#666', textAlign: 'center', margin: '0 0 6px 0' }}>avg. American overpays</p>
        <div style={{ transform: `scale(${countScale})`, marginBottom: 4 }}>
          <p style={{ fontFamily: FONT, fontSize: 118, color: RED, margin: 0, lineHeight: 1, textAlign: 'center' }}>${indivCount}</p>
        </div>
        <div style={{ opacity: perIn, transform: `translateY(${(1 - perIn) * 15}px)`, marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 27, color: RED, textAlign: 'center', margin: 0 }}>PER YEAR on brand drugs</p>
        </div>
        <div style={{ width: '80%', height: 3, background: '#DDD', borderRadius: 2, marginBottom: 18 }} />
        {/* National figure */}
        <div style={{ opacity: nationIn, transform: `scale(${nationIn})`, textAlign: 'center', marginBottom: 14 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#666', margin: '0 0 4px 0' }}>nationally — every year</p>
          <p style={{ fontFamily: FONT, fontSize: 86, color: BLACK, margin: 0, lineHeight: 1 }}>$50B</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#888', margin: '4px 0 0 0' }}>in unnecessary brand-name spending</p>
        </div>
        <div style={{ opacity: tagIn, transform: `translateY(${(1 - tagIn) * 20}px)`, background: RED, borderRadius: 14, padding: '10px 28px' }}>
          <p style={{ fontFamily: FONT, fontSize: 25, color: WHITE, margin: 0 }}>when generics were available</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 5 — Four words at the pharmacy: Is there a generic? ─────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const personIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 20 });
  const counterIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 50 });
  const bubbleIn = spring({ frame, fps, config: { damping: 10, stiffness: 100 }, delay: 85 });
  const phoneIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 130 });
  const priceIn = spring({ frame: Math.max(0, frame - 168), fps, config: { damping: 10, stiffness: 150 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 55px', gap: 0 }}>
        <p style={{ ...headline(44, WHITE), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>FOUR WORDS</p>
        <p style={{ ...headline(44, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 22 }}>AT THE PHARMACY</p>
        {/* Person at pharmacy counter */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26, marginBottom: 14 }}>
          <div style={{ opacity: personIn, transform: `scale(${personIn})` }}>
            <svg width="68" height="118" viewBox="0 0 68 118">
              <circle cx="34" cy="20" r="16" fill={ACCENT} />
              <rect x="19" y="40" width="30" height="38" rx="7" fill={ACCENT} />
              <rect x="3" y="44" width="18" height="9" rx="4" fill={ACCENT} />
              <rect x="47" y="44" width="18" height="9" rx="4" fill={ACCENT} />
              <rect x="21" y="74" width="10" height="28" rx="5" fill={ACCENT} />
              <rect x="37" y="74" width="10" height="28" rx="5" fill={ACCENT} />
            </svg>
          </div>
          <div style={{ opacity: counterIn, transform: `scale(${counterIn})` }}>
            <svg width="130" height="118" viewBox="0 0 130 118">
              <rect x="0" y="82" width="130" height="8" rx="4" fill="#2a2a2a" />
              <circle cx="65" cy="44" r="16" fill="#555" />
              <rect x="51" y="64" width="28" height="26" rx="5" fill="#555" />
              <rect x="57" y="64" width="14" height="26" rx="3" fill="#666" />
              <rect x="12" y="54" width="14" height="28" rx="4" fill="#F97316" />
              <rect x="32" y="60" width="12" height="22" rx="4" fill={ACCENT} />
              <rect x="86" y="56" width="14" height="26" rx="4" fill="#3B82F6" />
              <rect x="104" y="62" width="12" height="20" rx="4" fill="#F59E0B" />
            </svg>
          </div>
        </div>
        {/* Speech bubble */}
        <div style={{ opacity: bubbleIn, transform: `scale(${bubbleIn})`, marginBottom: 20 }}>
          <div style={{ background: WHITE, borderRadius: 20, padding: '14px 28px' }}>
            <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0, textAlign: 'center' }}>"IS THERE</p>
            <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0, textAlign: 'center' }}>A GENERIC?"</p>
          </div>
        </div>
        {/* Phone showing Cost Plus Drugs */}
        <div style={{ opacity: phoneIn, transform: `scale(${phoneIn})` }}>
          <svg width="138" height="156" viewBox="0 0 138 156">
            <rect x="10" y="4" width="118" height="148" rx="18" fill="#1a1a2e" stroke="#333" strokeWidth="2" />
            <rect x="18" y="16" width="102" height="124" rx="10" fill="#0a0a1a" />
            <rect x="18" y="16" width="102" height="36" rx="10" fill={ACCENT} />
            <text x="69" y="38" fontSize="12" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">COST PLUS DRUGS</text>
            <text x="69" y="74" fontSize="11" fill="#AAA" textAnchor="middle" fontFamily="Arial">atorvastatin 20mg</text>
            <line x1="34" y1="95" x2="104" y2="95" stroke={RED} strokeWidth="1.5" />
            <text x="69" y="98" fontSize="13" fill={RED} textAnchor="middle" fontFamily="Arial Black">$80.00</text>
            <rect x="30" y="106" width="78" height="26" rx="8" fill={ACCENT} />
            <text x="69" y="124" fontSize="18" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$3.80</text>
          </svg>
        </div>
        <div style={{ opacity: priceIn, transform: `scale(${priceIn})` }}>
          <p style={{ fontFamily: FONT, fontSize: 25, color: ACCENT, textAlign: 'center', margin: '10px 0 0 0' }}>SAME PILL · 95% CHEAPER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 6 — CTA: check one prescription today ──────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const bagIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 25 });
  const stepIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 70 });
  const arrowIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 110 });
  const saveIn = spring({ frame, fps, config: { damping: 10, stiffness: 100 }, delay: 145 });
  const ctaOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [170, 195], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 60px', gap: 0 }}>
        <p style={{ ...headline(46, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>CHECK ONE</p>
        <p style={{ ...headline(46, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 26 }}>PRESCRIPTION TODAY</p>
        {/* Pharmacy bag */}
        <div style={{ opacity: bagIn, transform: `scale(${bagIn})`, marginBottom: 18 }}>
          <svg width="120" height="128" viewBox="0 0 120 128">
            <rect x="10" y="40" width="100" height="82" rx="12" fill={ACCENT} />
            <path d="M 36 40 Q 36 16 48 16 Q 60 16 60 28" fill="none" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
            <path d="M 84 40 Q 84 16 72 16 Q 60 16 60 28" fill="none" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
            <text x="60" y="98" fontSize="44" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">Rx</text>
          </svg>
        </div>
        {/* Step card */}
        <div style={{ opacity: stepIn, transform: `translateY(${(1 - stepIn) * 20}px)`, marginBottom: 10, background: '#EEE', borderRadius: 16, padding: '14px 30px' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, textAlign: 'center' }}>PULL OUT ONE PRESCRIPTION</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#666', margin: '6px 0 0 0', textAlign: 'center' }}>any medication you take regularly</p>
        </div>
        {/* Arrow */}
        <div style={{ opacity: arrowIn }}>
          <svg width="50" height="54" viewBox="0 0 50 54">
            <line x1="25" y1="4" x2="25" y2="40" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <polyline points="10,28 25,44 40,28" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Save badge */}
        <div style={{ opacity: saveIn, transform: `scale(${saveIn})`, background: ACCENT, borderRadius: 18, padding: '14px 40px', marginBottom: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, textAlign: 'center' }}>SAVE $600/YEAR</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: WHITE, margin: '4px 0 0 0', textAlign: 'center' }}>with one 30-second question</p>
        </div>
        {/* CTA text */}
        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#555', margin: 0 }}>search it at costplusdrugs.com</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#888', margin: '4px 0 0 0' }}>or just ask your pharmacist</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── COMPOSITION ───────────────────────────────────────────────────────────────
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
