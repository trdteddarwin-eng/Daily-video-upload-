import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

// ─── Scene 1 — Hook: every free sample has a hidden cost ─────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-120, 0]);

  const handSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { stiffness: 55, damping: 20 } });
  const handY = interpolate(handSpring, [0, 1], [200, 0]);

  const d0x = interpolate(frame, [50, 200], [570, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d0y = interpolate(frame, [50, 200], [900, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d0op = interpolate(frame, [50, 70, 180, 200], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d1x = interpolate(frame, [70, 210], [570, 880], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1y = interpolate(frame, [70, 210], [900, 640], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1op = interpolate(frame, [70, 90, 190, 210], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const d2x = interpolate(frame, [90, 215], [570, 750], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2y = interpolate(frame, [90, 215], [900, 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2op = interpolate(frame, [90, 110, 200, 215], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stat1Opacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '0 60px',
      }}>
        <p style={headline(50, WHITE)}>THAT</p>
        <p style={headline(82, ACCENT)}>FREE SAMPLE</p>
        <p style={headline(46, WHITE)}>ISN&apos;T FREE</p>
      </div>

      <svg width="1080" height="960" viewBox="0 0 1080 960"
        style={{ position: 'absolute', top: 280, left: 0, transform: `translateY(${handY}px)` }}>
        {/* Arm */}
        <rect x="450" y="640" width="80" height="200" fill="#C9956A" rx="16" />
        {/* Hand palm */}
        <ellipse cx="490" cy="630" rx="80" ry="38" fill="#C9956A" />
        {/* Fingers */}
        <rect x="418" y="590" width="32" height="70" fill="#C9956A" rx="16" />
        <rect x="454" y="575" width="30" height="78" fill="#D4A47C" rx="15" />
        <rect x="488" y="572" width="30" height="78" fill="#D4A47C" rx="15" />
        <rect x="522" y="578" width="28" height="72" fill="#C9956A" rx="14" />
        <rect x="555" y="596" width="24" height="58" fill="#C9956A" rx="12" />
        {/* Sample cup on palm */}
        <polygon points="464,505 516,505 508,575 472,575" fill={WHITE} />
        <rect x="462" y="500" width="56" height="12" rx="4" fill="#E0E0E0" />
        {/* Cup label */}
        <rect x="468" y="518" width="44" height="32" rx="3" fill={ACCENT} />
        <text x="490" y="530" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="10" fontWeight="bold">FREE</text>
        <text x="490" y="544" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="10" fontWeight="bold">TRY</text>
        {/* Cup shine */}
        <polygon points="468,514 476,514 472,560 466,560" fill="rgba(255,255,255,0.35)" />
        {/* Dollar signs */}
        <text x={d0x} y={d0y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="56" opacity={d0op} fontWeight="bold">$</text>
        <text x={d1x} y={d1y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="44" opacity={d1op} fontWeight="bold">$</text>
        <text x={d2x} y={d2y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="38" opacity={d2op} fontWeight="bold">$</text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 180, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        padding: '0 60px',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, textAlign: 'center', opacity: stat1Opacity }}>
          <span style={{ color: ACCENT, fontSize: 72 }}>$1,800</span>{' '}PER YEAR
        </p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#888', margin: 0, textAlign: 'center', opacity: stat2Opacity, letterSpacing: '0.06em' }}>
          triggered by free samples — here&apos;s how
        </p>
      </div>
    </FadeScene>
  );
};
// END SCENE 1

// ─── Scene 2 — Reciprocity Principle: Gift → Obligation → Buy ────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const headScale = interpolate(headSpring, [0, 1], [0.3, 1]);

  const arrow1Opacity = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow3Opacity = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const wordSpring = spring({ frame: Math.max(0, frame - 145), fps, config: { stiffness: 160, damping: 18 } });
  const wordOpacity = interpolate(frame, [145, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(62, BLACK)}>HOW THEY</p>
        <p style={{ ...headline(58, ACCENT), marginTop: 8 }}>WIRE YOUR BRAIN</p>
      </div>

      <svg width="1080" height="600" viewBox="0 0 1080 600"
        style={{ position: 'absolute', top: 295, left: 0, transformOrigin: 'center center', transform: `scale(${headScale})` }}>
        {/* Head */}
        <ellipse cx="540" cy="230" rx="145" ry="162" fill="#1E3A5F" />
        {/* Brain folds */}
        <path d="M428,195 Q460,174 492,195 Q524,216 556,195 Q588,174 620,195" stroke={ACCENT} strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M418,238 Q455,216 492,238 Q529,260 566,238 Q603,216 640,238" stroke={ACCENT} strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M428,278 Q470,258 512,278 Q554,298 596,278 Q628,262 648,278" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="498" cy="312" r="15" fill={WHITE} />
        <circle cx="582" cy="312" r="15" fill={WHITE} />
        <circle cx="502" cy="316" r="7" fill={BLACK} />
        <circle cx="586" cy="316" r="7" fill={BLACK} />
        {/* Neck */}
        <rect x="504" y="390" width="72" height="52" fill="#1E3A5F" rx="10" />
      </svg>

      <div style={{
        position: 'absolute', top: 770, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
        padding: '0 80px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: arrow1Opacity }}>
          <div style={{ background: '#10B981', borderRadius: 16, padding: '14px 44px' }}>
            <span style={{ fontFamily: FONT, fontSize: 40, color: WHITE }}>GIFT</span>
          </div>
          <span style={{ fontFamily: FONT, fontSize: 50, color: '#10B981' }}>&#8594;</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: arrow2Opacity }}>
          <div style={{ background: '#EF4444', borderRadius: 16, padding: '14px 44px' }}>
            <span style={{ fontFamily: FONT, fontSize: 40, color: WHITE }}>OBLIGATION</span>
          </div>
          <span style={{ fontFamily: FONT, fontSize: 50, color: '#EF4444' }}>&#8594;</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: arrow3Opacity }}>
          <div style={{ background: ACCENT, borderRadius: 16, padding: '14px 68px' }}>
            <span style={{ fontFamily: FONT, fontSize: 40, color: BLACK }}>BUY</span>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 68, left: 60, right: 60,
        textAlign: 'center', opacity: wordOpacity,
        transform: `scaleX(${Math.min(1, interpolate(wordSpring, [0, 1], [0.6, 1]))})`,
      }}>
        <p style={headline(46, BLACK)}>THE RECIPROCITY TRAP</p>
      </div>
    </FadeScene>
  );
};
// END SCENE 2

// ─── Scene 3 — Costco: 300% purchase boost ───────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const storeSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const storeY = interpolate(storeSpring, [0, 1], [280, 0]);

  const countDisplay = Math.round(interpolate(frame, [50, 168], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const pctSpring = spring({ frame: Math.max(0, frame - 163), fps, config: { stiffness: 200, damping: 18 } });
  const pctScale = interpolate(pctSpring, [0, 1], [0.3, 1]);

  const subOpacity = interpolate(frame, [175, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(56, WHITE)}>COSTCO&apos;S</p>
        <p style={{ ...headline(62, ACCENT), marginTop: 8 }}>SECRET WEAPON</p>
      </div>

      <svg width="1080" height="560" viewBox="0 0 1080 560"
        style={{ position: 'absolute', top: 295, left: 0, transform: `translateY(${storeY}px)` }}>
        {/* Building */}
        <rect x="80" y="60" width="920" height="440" fill="#1E293B" rx="8" />
        <rect x="60" y="48" width="960" height="36" fill="#334155" rx="6" />
        <rect x="160" y="54" width="760" height="28" rx="4" fill={ACCENT} />
        <text x="540" y="74" textAnchor="middle" fontFamily={FONT} fontSize="16" fill={BLACK} letterSpacing="4">WAREHOUSE STORE</text>
        {/* Shelves */}
        <rect x="120" y="130" width="840" height="10" fill="#475569" rx="3" />
        <rect x="120" y="200" width="840" height="10" fill="#475569" rx="3" />
        <rect x="120" y="270" width="840" height="10" fill="#475569" rx="3" />
        <rect x="120" y="340" width="840" height="10" fill="#475569" rx="3" />
        {/* Product boxes row 1 */}
        <rect x="140" y="103" width="48" height="29" rx="3" fill="#3B82F6" />
        <rect x="198" y="103" width="48" height="29" rx="3" fill="#EF4444" />
        <rect x="256" y="103" width="48" height="29" rx="3" fill="#10B981" />
        <rect x="314" y="103" width="48" height="29" rx="3" fill={ACCENT} />
        <rect x="372" y="103" width="48" height="29" rx="3" fill="#8B5CF6" />
        <rect x="430" y="103" width="48" height="29" rx="3" fill="#3B82F6" />
        <rect x="488" y="103" width="48" height="29" rx="3" fill="#EF4444" />
        <rect x="546" y="103" width="48" height="29" rx="3" fill="#10B981" />
        <rect x="604" y="103" width="48" height="29" rx="3" fill={ACCENT} />
        <rect x="662" y="103" width="48" height="29" rx="3" fill="#8B5CF6" />
        <rect x="720" y="103" width="48" height="29" rx="3" fill="#3B82F6" />
        {/* Product boxes row 2 */}
        <rect x="140" y="173" width="48" height="29" rx="3" fill={ACCENT} />
        <rect x="198" y="173" width="48" height="29" rx="3" fill="#10B981" />
        <rect x="256" y="173" width="48" height="29" rx="3" fill="#3B82F6" />
        <rect x="314" y="173" width="48" height="29" rx="3" fill="#EF4444" />
        <rect x="372" y="173" width="48" height="29" rx="3" fill="#8B5CF6" />
        <rect x="430" y="173" width="48" height="29" rx="3" fill={ACCENT} />
        <rect x="488" y="173" width="48" height="29" rx="3" fill="#10B981" />
        {/* Sample station */}
        <rect x="350" y="376" width="380" height="72" fill="#0F172A" rx="6" stroke={ACCENT} strokeWidth="4" />
        <rect x="350" y="368" width="380" height="20" rx="4" fill={ACCENT} />
        <text x="540" y="384" textAnchor="middle" fontFamily={FONT} fontSize="12" fill={BLACK} letterSpacing="2">FREE SAMPLES</text>
        {/* Sample cups */}
        <polygon points="490,358 510,358 506,370 494,370" fill={WHITE} />
        <polygon points="520,358 540,358 536,370 524,370" fill={WHITE} />
        <polygon points="550,358 570,358 566,370 554,370" fill={WHITE} />
        <text x="540" y="430" textAnchor="middle" fontFamily={FONT} fontSize="14" fill="#94A3B8">demo station</text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 196, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: FONT, fontSize: 162, color: ACCENT, lineHeight: 1 }}>{countDisplay}</span>
          <span style={{ fontFamily: FONT, fontSize: 100, color: WHITE, lineHeight: 1, display: 'inline-block', transform: `scale(${pctScale})` }}>%</span>
        </div>
        <p style={{ ...headline(44, WHITE), marginTop: -20 }}>MORE SALES</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#888', margin: '12px 0 0', textAlign: 'center', opacity: subOpacity }}>
          from a single sample station
        </p>
      </div>
    </FadeScene>
  );
};
// END SCENE 3

// ─── Scene 4 — Wine bottle + food tray: $47 impulse buy ─────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bottleSpring = spring({ frame, fps, config: { stiffness: 55, damping: 22 } });
  const bottleY = interpolate(bottleSpring, [0, 1], [320, 0]);

  const traySpring = spring({ frame: Math.max(0, frame - 28), fps, config: { stiffness: 55, damping: 22 } });
  const trayY = interpolate(traySpring, [0, 1], [320, 0]);

  const dollarSpring = spring({ frame: Math.max(0, frame - 90), fps, config: { stiffness: 120, damping: 16 } });
  const dollarScale = interpolate(dollarSpring, [0, 1], [0.3, 1]);

  const subOpacity = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(60, BLACK)}>IT&apos;S EVERYWHERE</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
          wine stores · food courts · grocery demos
        </p>
      </div>

      {/* Wine bottle */}
      <svg width="300" height="680" viewBox="0 0 300 680"
        style={{ position: 'absolute', top: 295, left: 60, transform: `translateY(${bottleY}px)` }}>
        {/* Body */}
        <rect x="95" y="270" width="110" height="370" fill="#1E3A5F" rx="18" />
        {/* Shoulder */}
        <path d="M95,270 Q98,185 122,168 L178,168 Q202,185 205,270 Z" fill="#1E3A5F" />
        {/* Neck */}
        <rect x="128" y="96" width="44" height="78" fill="#1E3A5F" rx="7" />
        {/* Cap */}
        <rect x="134" y="72" width="32" height="30" fill="#6B7280" rx="6" />
        {/* Foil */}
        <rect x="120" y="160" width="60" height="16" fill="#D97706" rx="4" />
        {/* Label */}
        <rect x="108" y="308" width="84" height="110" fill={WHITE} rx="6" />
        <text x="150" y="332" textAnchor="middle" fontFamily={FONT} fontSize="16" fill={BLACK} letterSpacing="2">WINE</text>
        <rect x="112" y="337" width="76" height="3" fill={ACCENT} />
        <text x="150" y="357" textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#555">Free Tasting</text>
        <text x="150" y="374" textAnchor="middle" fontFamily="Arial" fontSize="11" fill="#999">try before you buy</text>
        {/* Wine glass */}
        <path d="M138,530 L162,530 L174,578 L150,578 Z" fill="none" stroke="#94A3B8" strokeWidth="3" />
        <ellipse cx="150" cy="530" rx="13" ry="7" fill="none" stroke="#94A3B8" strokeWidth="3" />
        <ellipse cx="150" cy="530" rx="9" ry="5" fill="rgba(100,0,0,0.35)" />
        <line x1="150" y1="578" x2="150" y2="602" stroke="#94A3B8" strokeWidth="3" />
        <ellipse cx="150" cy="606" rx="18" ry="5" fill="none" stroke="#94A3B8" strokeWidth="3" />
      </svg>

      {/* Sample tray */}
      <svg width="520" height="320" viewBox="0 0 520 320"
        style={{ position: 'absolute', top: 370, left: 540, transform: `translateY(${trayY}px)` }}>
        {/* Tray */}
        <rect x="40" y="160" width="440" height="76" fill="#D97706" rx="6" />
        <ellipse cx="260" cy="236" rx="220" ry="26" fill="#B45309" />
        {/* Dividers */}
        <line x1="150" y1="160" x2="150" y2="236" stroke="#B45309" strokeWidth="2" />
        <line x1="260" y1="160" x2="260" y2="236" stroke="#B45309" strokeWidth="2" />
        <line x1="370" y1="160" x2="370" y2="236" stroke="#B45309" strokeWidth="2" />
        {/* Small cups */}
        <polygon points="68,122 108,122 102,162 74,162" fill={WHITE} />
        <polygon points="178,122 218,122 212,162 184,162" fill={WHITE} />
        <polygon points="288,122 328,122 322,162 294,162" fill={WHITE} />
        <polygon points="398,122 438,122 432,162 404,162" fill={WHITE} />
        {/* Food in cups */}
        <ellipse cx="88" cy="122" rx="18" ry="8" fill="#EF4444" />
        <ellipse cx="198" cy="122" rx="18" ry="8" fill="#10B981" />
        <ellipse cx="308" cy="122" rx="18" ry="8" fill={ACCENT} />
        <ellipse cx="418" cy="122" rx="18" ry="8" fill="#3B82F6" />
        {/* Label */}
        <text x="260" y="282" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={BLACK} letterSpacing="2">FOOD COURT</text>
        <text x="260" y="312" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#666">free samples station</text>
      </svg>

      {/* $47 */}
      <div style={{
        position: 'absolute', bottom: 186, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `scale(${dollarScale})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 140, color: '#EF4444', margin: 0, lineHeight: 1 }}>$47</p>
        <p style={{ ...headline(38, BLACK), marginTop: 4 }}>TRIGGERED PER SAMPLE</p>
      </div>

      <p style={{
        position: 'absolute', bottom: 92, left: 60, right: 60,
        fontFamily: FONT, fontSize: 29, color: '#666', margin: 0,
        textAlign: 'center', opacity: subOpacity, letterSpacing: '0.04em',
      }}>
        avg impulse purchase following a free taste
      </p>
    </FadeScene>
  );
};
// END SCENE 4

// ─── Scene 5 — Person silhouette + $1,800/year counter ───────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personSpring = spring({ frame, fps, config: { stiffness: 55, damping: 20 } });
  const personY = interpolate(personSpring, [0, 1], [200, 0]);

  const countDisplay = Math.round(interpolate(frame, [40, 185], [0, 1800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const d0op = interpolate(frame, [50, 65, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d0y = interpolate(frame, [50, 150], [880, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1op = interpolate(frame, [70, 85, 145, 165], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1y = interpolate(frame, [70, 165], [880, 570], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2op = interpolate(frame, [90, 105, 160, 180], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2y = interpolate(frame, [90, 180], [880, 540], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [188, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 60px' }}>
        <p style={headline(52, WHITE)}>ADD IT ALL UP</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#888', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
          across every store, every year
        </p>
      </div>

      <svg width="1080" height="860" viewBox="0 0 1080 860"
        style={{ position: 'absolute', top: 295, left: 0, transform: `translateY(${personY}px)` }}>
        {/* Head */}
        <circle cx="540" cy="170" r="66" fill={WHITE} />
        {/* Body */}
        <rect x="488" y="234" width="104" height="136" fill={WHITE} rx="14" />
        {/* Left arm */}
        <rect x="404" y="246" width="88" height="26" fill={WHITE} rx="12" transform="rotate(16, 448, 259)" />
        {/* Right arm */}
        <rect x="576" y="246" width="88" height="26" fill={WHITE} rx="12" transform="rotate(-16, 620, 259)" />
        {/* Legs */}
        <rect x="496" y="364" width="38" height="98" fill={WHITE} rx="10" />
        <rect x="546" y="364" width="38" height="98" fill={WHITE} rx="10" />
        {/* Dollar signs floating away */}
        <text x="630" y={d0y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="58" opacity={d0op} fontWeight="bold">$</text>
        <text x="704" y={d1y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="46" opacity={d1op} fontWeight="bold">$</text>
        <text x="578" y={d2y} textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="40" opacity={d2op} fontWeight="bold">$</text>
      </svg>

      <div style={{
        position: 'absolute', bottom: 192, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: FONT, fontSize: 46, color: WHITE }}>$</span>
          <span style={{ fontFamily: FONT, fontSize: 148, color: ACCENT, lineHeight: 1 }}>{countDisplay.toLocaleString()}</span>
        </div>
        <p style={{ ...headline(44, WHITE), marginTop: -20 }}>/YEAR DRAINED</p>
      </div>

      <p style={{
        position: 'absolute', bottom: 90, left: 60, right: 60,
        fontFamily: FONT, fontSize: 29, color: '#888', margin: 0,
        textAlign: 'center', opacity: subOpacity, letterSpacing: '0.04em',
      }}>
        avg unplanned spending triggered by free samples
      </p>
    </FadeScene>
  );
};
// END SCENE 5

// ─── Scene 6 — CTA: one question saves $1,800/year ───────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 70, damping: 22 } });
  const titleY = interpolate(titleSpring, [0, 1], [-100, 0]);

  const shieldSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { stiffness: 55, damping: 20 } });
  const shieldScale = interpolate(shieldSpring, [0, 1], [0.2, 1]);

  const step1Opacity = interpolate(frame, [68, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Opacity = interpolate(frame, [100, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Opacity = interpolate(frame, [132, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 158), fps, config: { stiffness: 60, damping: 20 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [100, 0]);

  const steps = [
    { num: 1, text: 'Accept the sample', color: '#10B981', opacity: step1Opacity },
    { num: 2, text: 'Pause before buying', color: ACCENT, opacity: step2Opacity },
    { num: 3, text: 'Ask: "Did I plan this?"', color: '#EF4444', opacity: step3Opacity },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 88, left: 0, right: 0,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center', padding: '0 60px',
      }}>
        <p style={headline(56, BLACK)}>ONE QUESTION</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#666', margin: '10px 0 0', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          that saves $1,800 a year
        </p>
      </div>

      {/* Shield icon */}
      <svg width="240" height="260" viewBox="0 0 240 260"
        style={{ position: 'absolute', top: 312, left: 420, transform: `scale(${shieldScale})`, transformOrigin: '120px 130px' }}>
        <path d="M120,12 L216,58 L216,140 Q216,210 120,246 Q24,210 24,140 L24,58 Z" fill="#1E3A5F" />
        <path d="M120,28 L198,68 L198,138 Q198,198 120,228 Q42,198 42,138 L42,68 Z" fill={ACCENT} />
        <polyline points="74,130 104,162 166,98" fill="none" stroke={WHITE} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Steps */}
      <div style={{
        position: 'absolute', top: 620, left: 60, right: 60,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {steps.map(({ num, text, color, opacity }) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 24, opacity }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: color, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT, fontSize: 28, color: WHITE,
            }}>
              {num}
            </div>
            <span style={{ fontFamily: FONT, fontSize: 42, color: BLACK }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTA box */}
      <div style={{
        position: 'absolute', bottom: 58, left: 50, right: 50,
        transform: `translateY(${ctaY}px)`,
        background: BLACK, borderRadius: 22, padding: '30px 44px', textAlign: 'center',
      }}>
        <p style={headline(26, WHITE)}>AWARENESS IS THE HACK</p>
        <p style={{ ...headline(64, ACCENT), marginTop: 10 }}>$1,800 SAVED</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', marginTop: 10, textAlign: 'center' }}>
          follow for one money truth a day
        </p>
      </div>
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
