import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const ORANGE = '#F97316';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── Scene 2: FSA card burning ──────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(frame, [0, 35], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flameScale = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flameOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [60, 130], [0, 1250], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const xScale = spring({ frame: Math.max(0, frame - 140), fps, from: 0, to: 1, config: { damping: 11, stiffness: 110 } });
  const itemsOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        <p style={{ ...headline(32, BLACK), marginBottom: 24 }}>NUMBER ONE</p>

        {/* Credit card + flame */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <svg width="320" height="190" viewBox="0 0 320 190" style={{ opacity: cardOpacity, transform: `translateY(${cardY}px)` }}>
            {/* Card body */}
            <rect x="20" y="80" width="280" height="100" rx="14" fill="#2563EB" />
            <rect x="20" y="80" width="280" height="30" rx="14" fill="#1D4ED8" />
            <rect x="20" y="94" width="280" height="16" fill="#1D4ED8" />
            <rect x="40" y="110" width="40" height="30" rx="4" fill="#FBBF24" />
            <text x="40" y="128" fill="#000" fontFamily={FONT} fontSize="12" fontWeight="900">FSA</text>
            <text x="90" y="128" fill={WHITE} fontFamily={FONT} fontSize="13">•••• •••• •••• 2026</text>
            <text x="40" y="165" fill={WHITE} fontFamily={FONT} fontSize="12">EXPIRES: JAN 1</text>
            <text x="220" y="165" fill={WHITE} fontFamily={FONT} fontSize="12">FSA CARD</text>
            {/* Flame */}
            <g style={{ transform: `scale(${flameScale})`, transformOrigin: '160px 80px', opacity: flameOpacity }}>
              <path d="M140 80 C135 60 150 40 155 20 C160 40 170 35 165 55 C175 45 178 30 180 15 C188 35 185 55 175 65 C182 60 190 65 185 80 C175 70 165 68 160 75 C155 68 145 70 140 80Z" fill={ORANGE} />
              <path d="M150 80 C148 65 158 50 160 35 C163 50 170 55 167 68 C172 60 174 50 175 40 C180 55 177 70 170 76 C165 72 162 70 160 74 C158 70 155 72 150 80Z" fill="#FEF08A" />
            </g>
          </svg>
        </div>

        {/* Counter */}
        <p style={{ ...headline(80, RED), lineHeight: 1, marginBottom: 4 }}>
          ${counterVal.toLocaleString()}
        </p>
        <p style={{ ...headline(24, BLACK), marginBottom: 20 }}>BURNS JANUARY 1ST</p>

        {/* X mark */}
        <div style={{ transform: `scale(${xScale})`, transformOrigin: 'center', marginBottom: 20 }}>
          <p style={{ ...headline(44, RED) }}>✕ GONE FOREVER</p>
        </div>

        {/* Medicine bottle + glasses */}
        <svg width="220" height="60" viewBox="0 0 220 60" style={{ opacity: itemsOpacity }}>
          {/* Medicine bottle */}
          <rect x="10" y="15" width="30" height="40" rx="5" fill="#3B82F6" />
          <rect x="14" y="8" width="22" height="12" rx="3" fill="#1D4ED8" />
          <text x="25" y="39" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="8">Rx</text>
          {/* Glasses */}
          <circle cx="90" cy="35" r="18" fill="none" stroke={BLACK} strokeWidth="4" />
          <circle cx="130" cy="35" r="18" fill="none" stroke={BLACK} strokeWidth="4" />
          <line x1="108" y1="35" x2="112" y2="35" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
          <line x1="68" y1="32" x2="72" y2="35" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
          <line x1="148" y1="35" x2="155" y2="32" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
          {/* Band-aid */}
          <rect x="168" y="22" width="40" height="20" rx="10" fill="#FCA5A5" />
          <rect x="175" y="27" width="26" height="10" rx="2" fill={WHITE} />
          <circle cx="181" cy="31" r="2" fill="#FCA5A5" />
          <circle cx="197" cy="31" r="2" fill="#FCA5A5" />
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: HSA triple shield ─────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shield1Scale = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const shield2Scale = spring({ frame: Math.max(0, frame - 40), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const shield3Scale = spring({ frame: Math.max(0, frame - 70), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const piggyOpacity = interpolate(frame, [100, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fillWidth = interpolate(frame, [110, 185], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const limitOpacity = interpolate(frame, [160, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ShieldIcon: React.FC<{ x: number; label: string; sc: number }> = ({ x, label, sc }) => (
    <g style={{ transform: `scale(${sc})`, transformOrigin: `${x + 35}px 60px` }}>
      <path d={`M${x + 35} 10 L${x + 65} 25 L${x + 65} 60 Q${x + 65} 85 ${x + 35} 95 Q${x + 5} 85 ${x + 5} 60 L${x + 5} 25 Z`} fill={ACCENT} />
      <path d={`M${x + 35} 20 L${x + 58} 32 L${x + 58} 60 Q${x + 58} 80 ${x + 35} 88 Q${x + 12} 80 ${x + 12} 60 L${x + 12} 32 Z`} fill="#0d7a5f" />
      <text x={x + 35} y={56} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="13" fontWeight="900">✓</text>
      <text x={x + 35} y={115} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="11">{label}</text>
    </g>
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        <p style={{ ...headline(32, WHITE), marginBottom: 10 }}>NUMBER TWO</p>
        <p style={{ ...headline(48, ACCENT), marginBottom: 30, lineHeight: 1.1 }}>TRIPLE TAX FREE</p>

        {/* Three shields */}
        <svg width="380" height="140" viewBox="0 0 380 140">
          <ShieldIcon x={15} label="PRE-TAX IN" sc={shield1Scale} />
          <ShieldIcon x={145} label="TAX-FREE GROWTH" sc={shield2Scale} />
          <ShieldIcon x={275} label="TAX-FREE OUT" sc={shield3Scale} />
        </svg>

        {/* Piggy bank */}
        <svg width="200" height="130" viewBox="0 0 200 130" style={{ opacity: piggyOpacity, marginTop: 10 }}>
          {/* Body */}
          <ellipse cx="100" cy="80" rx="65" ry="45" fill="#F9A8D4" />
          {/* Head */}
          <circle cx="155" cy="65" r="28" fill="#F9A8D4" />
          {/* Ear */}
          <ellipse cx="148" cy="42" rx="10" ry="7" fill="#F472B6" />
          {/* Eye */}
          <circle cx="163" cy="62" r="4" fill={BLACK} />
          <circle cx="164" cy="61" r="1.5" fill={WHITE} />
          {/* Snout */}
          <ellipse cx="175" cy="72" rx="10" ry="7" fill="#F472B6" />
          <circle cx="171" cy="72" r="2" fill="#C2185B" />
          <circle cx="179" cy="72" r="2" fill="#C2185B" />
          {/* Coin slot */}
          <rect x="85" y="37" width="22" height="5" rx="2.5" fill="#BE185D" />
          {/* Legs */}
          <rect x="55" y="115" width="18" height="12" rx="4" fill="#F9A8D4" />
          <rect x="80" y="118" width="18" height="12" rx="4" fill="#F9A8D4" />
          <rect x="105" y="118" width="18" height="12" rx="4" fill="#F9A8D4" />
          <rect x="130" y="115" width="18" height="12" rx="4" fill="#F9A8D4" />
          {/* Fill bar */}
          <rect x="37" y="68" width="Math.max(0,0)" height="24" rx="0" fill="transparent" />
          <clipPath id="piggyClip">
            <rect x="37" y="55" width={Math.max(0, fillWidth)} height="40" />
          </clipPath>
          <ellipse cx="100" cy="80" rx="65" ry="45" fill={ACCENT} fillOpacity="0.35" clipPath="url(#piggyClip)" />
        </svg>

        <p style={{ ...headline(42, ACCENT), marginTop: 8, opacity: limitOpacity }}>$4,150 LIMIT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: Tax-loss harvesting ───────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scissorsX = interpolate(frame, [40, 110], [-80, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scissorsOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsScale = spring({ frame: Math.max(0, frame - 120), fps, from: 0, to: 1, config: { damping: 11, stiffness: 100 } });
  const arrowProgress = interpolate(frame, [150, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        <p style={{ ...headline(32, BLACK), marginBottom: 16 }}>NUMBER THREE</p>
        <p style={{ ...headline(42, BLACK), marginBottom: 24, lineHeight: 1.1 }}>HARVEST YOUR LOSERS</p>

        {/* Stock chart going down */}
        <svg width="360" height="200" viewBox="0 0 360 200" style={{ opacity: chartOpacity }}>
          {/* Axes */}
          <line x1="40" y1="10" x2="40" y2="170" stroke="#999" strokeWidth="2" />
          <line x1="40" y1="170" x2="340" y2="170" stroke="#999" strokeWidth="2" />
          {/* Descending red line */}
          <polyline points="40,30 90,55 130,80 170,105 210,120 250,140 300,158" fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Fill under line */}
          <polygon points="40,30 90,55 130,80 170,105 210,120 250,140 300,158 300,170 40,170" fill={RED} fillOpacity="0.12" />
          {/* Dots */}
          {([[40,30],[90,55],[130,80],[170,105],[210,120],[250,140],[300,158]] as [number,number][]).map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill={RED} />
          ))}
          {/* Y labels */}
          <text x="30" y="34" textAnchor="end" fill="#666" fontFamily={FONT} fontSize="12">$100</text>
          <text x="30" y="162" textAnchor="end" fill="#666" fontFamily={FONT} fontSize="12">$52</text>
          {/* Loss label */}
          <text x="200" y="90" textAnchor="middle" fill={RED} fontFamily={FONT} fontSize="18" fontWeight="900">-48%</text>
          {/* Scissors */}
          <g style={{ transform: `translateX(${scissorsX}px)`, opacity: scissorsOpacity }}>
            <line x1="0" y1="140" x2="30" y2="110" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="110" x2="30" y2="140" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-5" cy="145" r="8" fill="none" stroke="#333" strokeWidth="3" />
            <circle cx="-5" cy="105" r="8" fill="none" stroke="#333" strokeWidth="3" />
          </g>
          {/* Recovery arrow */}
          <line x1="300" y1="158" x2={300 + arrowProgress * 30} y2={158 - arrowProgress * 60} stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Savings counter */}
        <div style={{ transform: `scale(${savingsScale})`, transformOrigin: 'center', marginTop: 16 }}>
          <p style={{ ...headline(70, ACCENT), lineHeight: 1 }}>$1,500</p>
          <p style={{ ...headline(26, BLACK), marginTop: 4 }}>TAX SAVINGS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Charity donation bunching ─────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 70], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [35, 85], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [50, 100], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigBarH = interpolate(frame, [80, 150], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const heartScale = spring({ frame: Math.max(0, frame - 90), fps, from: 0, to: 1, config: { damping: 10, stiffness: 90 } });
  const savedOpacity = interpolate(frame, [155, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        <p style={{ ...headline(32, WHITE), opacity: titleOpacity, marginBottom: 8 }}>NUMBER FOUR</p>
        <p style={{ ...headline(38, ACCENT), opacity: titleOpacity, marginBottom: 20, lineHeight: 1.1 }}>BUNCH DONATIONS</p>

        {/* Bar chart */}
        <svg width="360" height="230" viewBox="0 0 360 230">
          {/* Axis */}
          <line x1="30" y1="200" x2="340" y2="200" stroke="#444" strokeWidth="2" />
          {/* Three small bars */}
          <rect x="40" y={200 - Math.max(0, bar1H)} width="50" height={Math.max(0, bar1H)} rx="4" fill="#444" />
          <text x="65" y="218" textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="11">YR 1</text>
          <text x="65" y={195 - Math.max(0, bar1H)} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="11">$200</text>

          <rect x="100" y={200 - Math.max(0, bar2H)} width="50" height={Math.max(0, bar2H)} rx="4" fill="#444" />
          <text x="125" y="218" textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="11">YR 2</text>
          <text x="125" y={195 - Math.max(0, bar2H)} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="11">$200</text>

          <rect x="160" y={200 - Math.max(0, bar3H)} width="50" height={Math.max(0, bar3H)} rx="4" fill="#444" />
          <text x="185" y="218" textAnchor="middle" fill="#999" fontFamily={FONT} fontSize="11">YR 3</text>
          <text x="185" y={195 - Math.max(0, bar3H)} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="11">$200</text>

          {/* VS */}
          <text x="238" y="130" textAnchor="middle" fill="#666" fontFamily={FONT} fontSize="20" fontWeight="900">VS</text>

          {/* Big bunched bar */}
          <rect x="258" y={200 - Math.max(0, bigBarH)} width="70" height={Math.max(0, bigBarH)} rx="4" fill={ACCENT} />
          <text x="293" y="218" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="11">BUNCHED</text>
          {bigBarH > 10 && (
            <text x="293" y={195 - Math.max(0, bigBarH)} textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="13" fontWeight="900">$600</text>
          )}

          {/* Heart icon in bunched bar */}
          <g style={{ transform: `scale(${heartScale})`, transformOrigin: '293px 150px' }}>
            <path d="M293 162 C293 162 270 148 270 136 C270 128 278 124 285 130 C289 125 293 122 293 122 C293 122 297 125 301 130 C308 124 316 128 316 136 C316 148 293 162 293 162Z" fill={BLACK} fillOpacity="0.4" />
          </g>

          {/* Standard deduction line */}
          <line x1="30" y1={200 - 100} x2="340" y2={200 - 100} stroke="#F59E0B" strokeWidth="2" strokeDasharray="6,4" />
          <text x="32" y={200 - 104} fill="#F59E0B" fontFamily={FONT} fontSize="10">STD DEDUCTION</text>
        </svg>

        <p style={{ ...headline(52, ACCENT), opacity: savedOpacity, marginTop: 4 }}>$400 SAVED</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: Checklist CTA ─────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = ['FSA — Spend It', 'HSA — Top It Off', 'Tax Loss — Harvest', 'Donations — Bunch'];
  const itemScales = items.map((_, i) =>
    spring({ frame: Math.max(0, frame - i * 28), fps, from: 0, to: 1, config: { damping: 12, stiffness: 110 } })
  );
  const totalScale = spring({ frame: Math.max(0, frame - 130), fps, from: 0, to: 1, config: { damping: 10, stiffness: 90 } });
  const ctaOpacity = interpolate(frame, [165, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        <p style={{ ...headline(30, WHITE), marginBottom: 30 }}>YOUR 2026 CHECKLIST</p>

        {/* Checklist items */}
        <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                transform: `scale(${itemScales[i]})`,
                transformOrigin: 'left center',
                opacity: itemScales[i],
              }}
            >
              {/* Checkbox */}
              <svg width="52" height="52" viewBox="0 0 52 52">
                <rect x="2" y="2" width="48" height="48" rx="10" fill={ACCENT} />
                <polyline points="12,26 22,36 40,16" fill="none" stroke={BLACK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: 0, letterSpacing: '0.05em' }}>{item}</p>
            </div>
          ))}
        </div>

        {/* $2,800 total */}
        <div style={{ transform: `scale(${totalScale})`, transformOrigin: 'center' }}>
          <p style={{ ...headline(100, ACCENT), lineHeight: 1 }}>$2,800</p>
          <p style={{ ...headline(28, WHITE), textAlign: 'center' as const }}>TOTAL SAVINGS</p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24, opacity: ctaOpacity, background: ACCENT, borderRadius: 16, padding: '16px 48px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0, letterSpacing: '0.1em' }}>DO IT THIS WEEKEND</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Calendar + countdown + cash pile
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calY = interpolate(frame, [0, 30], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const weeksScale = spring({ frame: Math.max(0, frame - 40), fps, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const cashOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 0 }}>
        {/* Calendar SVG */}
        <svg width="320" height="200" viewBox="0 0 320 200" style={{ opacity: calOpacity, transform: `translateY(${calY}px)`, marginBottom: 10 }}>
          {/* November box */}
          <rect x="10" y="30" width="130" height="150" rx="12" fill="#1E1E1E" stroke={ACCENT} strokeWidth="2" />
          <rect x="10" y="30" width="130" height="40" rx="12" fill={ACCENT} />
          <rect x="10" y="58" width="130" height="12" rx="0" fill={ACCENT} />
          <text x="75" y="58" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="17" fontWeight="900">NOV</text>
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((d, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            return (
              <text key={d} x={22 + col * 17} y={90 + row * 22} textAnchor="middle" fill={d <= 12 ? '#555' : WHITE} fontFamily={FONT} fontSize="12">{d}</text>
            );
          })}
          {/* Arrow */}
          <path d="M148 105 L172 105 L165 97 M172 105 L165 113" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* December box */}
          <rect x="180" y="30" width="130" height="150" rx="12" fill="#1E1E1E" stroke={RED} strokeWidth="3" />
          <rect x="180" y="30" width="130" height="40" rx="12" fill={RED} />
          <rect x="180" y="58" width="130" height="12" rx="0" fill={RED} />
          <text x="245" y="58" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="17" fontWeight="900">DEC</text>
          <text x="245" y="115" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="13">31</text>
          <circle cx="245" cy="130" r="22" fill="none" stroke={RED} strokeWidth="3" />
          <line x1="231" y1="116" x2="259" y2="144" stroke={RED} strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* 7 WEEKS */}
        <div style={{ transform: `scale(${weeksScale})`, transformOrigin: 'center' }}>
          <p style={{ ...headline(110, ACCENT), lineHeight: 1 }}>7 WEEKS</p>
        </div>

        {/* Cash stack */}
        <svg width="200" height="90" viewBox="0 0 200 90" style={{ opacity: cashOpacity, marginTop: 8 }}>
          {[3, 2, 1, 0].map((i) => (
            <rect key={i} x={10 + i * 5} y={15 + i * 5} width="160" height="60" rx="6" fill={i === 0 ? ACCENT : '#0d7a5f'} stroke="#000" strokeWidth="1" />
          ))}
          <text x="100" y="52" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="22" fontWeight="900">$2,800</text>
        </svg>

        <p style={{ ...headline(26, WHITE), opacity: subOpacity, marginTop: 14 }}>THESE DOORS CLOSE DEC 31ST</p>
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
