import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

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

// Scene 1: Piggy bank + cash flying away + hook text
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const piggyScale = spring({ frame, fps: 30, config: { damping: 16 }, delay: 0 });
  const bill1X = interpolate(frame, [30, 110], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2X = interpolate(frame, [40, 120], [0, -320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill3X = interpolate(frame, [50, 130], [0, 380], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billOpacity = interpolate(frame, [30, 120], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [90, 130], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <text x="540" y="190" fontFamily={FONT} fontSize="82" fill={ACCENT} textAnchor="middle" fontWeight="bold">SAVE</text>
        <text x="540" y="295" fontFamily={FONT} fontSize="78" fill={ACCENT} textAnchor="middle" fontWeight="bold">WHAT'S LEFT?</text>

        {/* Piggy bank centered at (540, 760) */}
        <g transform={`translate(540, 760) scale(${piggyScale})`}>
          {/* Body */}
          <ellipse cx="0" cy="0" rx="220" ry="185" fill="#E8A040" stroke={ACCENT} strokeWidth="6" />
          {/* Head */}
          <circle cx="188" cy="-95" r="118" fill="#E8A040" stroke={ACCENT} strokeWidth="6" />
          {/* Snout */}
          <ellipse cx="280" cy="-65" rx="52" ry="42" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          {/* Nostrils */}
          <circle cx="266" cy="-70" r="11" fill={BLACK} />
          <circle cx="294" cy="-70" r="11" fill={BLACK} />
          {/* Eye */}
          <circle cx="196" cy="-140" r="18" fill={WHITE} />
          <circle cx="200" cy="-134" r="9" fill={BLACK} />
          {/* Ear */}
          <ellipse cx="170" cy="-198" rx="34" ry="46" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          {/* Coin slot on top of body */}
          <rect x="-22" y="-178" width="44" height="10" rx="5" fill={BLACK} stroke={ACCENT} strokeWidth="3" />
          {/* Legs */}
          <rect x="-198" y="148" width="50" height="88" rx="16" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          <rect x="-118" y="162" width="50" height="75" rx="16" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          <rect x="68" y="162" width="50" height="75" rx="16" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          <rect x="148" y="148" width="50" height="88" rx="16" fill="#D08030" stroke={ACCENT} strokeWidth="4" />
          {/* Tail (curly) */}
          <path d="M -220 -30 Q -268 -82 -254 -145 Q -240 -192 -198 -178" stroke="#D08030" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        {/* Flying cash bills */}
        <g opacity={billOpacity}>
          <g transform={`translate(${bill1X}, 0)`}>
            <rect x="395" y="1045" width="155" height="72" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2" />
            <text x="472" y="1093" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">$100</text>
          </g>
          <g transform={`translate(${bill2X}, 0)`}>
            <rect x="432" y="1135" width="155" height="72" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2" />
            <text x="509" y="1183" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">$50</text>
          </g>
          <g transform={`translate(${bill3X}, 0)`}>
            <rect x="400" y="1225" width="155" height="72" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2" />
            <text x="477" y="1273" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">$20</text>
          </g>
        </g>

        {/* Hook text block */}
        <g opacity={textOpacity} transform={`translate(0, ${textY})`}>
          <text x="540" y="1515" fontFamily={FONT} fontSize="52" fill={WHITE} textAnchor="middle">This habit has a</text>
          <text x="540" y="1640" fontFamily={FONT} fontSize="104" fill={ACCENT} textAnchor="middle" fontWeight="bold">$384,000</text>
          <text x="540" y="1720" fontFamily={FONT} fontSize="52" fill={WHITE} textAnchor="middle">price tag</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 2: Brain graphic + spending arrows + icons
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const brainScale = spring({ frame, fps: 30, config: { damping: 16 }, delay: 0 });
  const arrowProgress = interpolate(frame, [55, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const iconOpacity = interpolate(frame, [95, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowLen = arrowProgress * 210;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <text x="540" y="168" fontFamily={FONT} fontSize="62" fill={BLACK} textAnchor="middle">YOUR BRAIN</text>
        <text x="540" y="258" fontFamily={FONT} fontSize="58" fill={ACCENT} textAnchor="middle" fontWeight="bold">IS THE PROBLEM</text>

        {/* Brain centered at (540, 680) */}
        <g transform={`translate(540, 680) scale(${brainScale})`}>
          <ellipse cx="-158" cy="0" rx="150" ry="195" fill="#FFB3B3" stroke={BLACK} strokeWidth="5" />
          <ellipse cx="158" cy="0" rx="150" ry="195" fill="#FFB3B3" stroke={BLACK} strokeWidth="5" />
          <line x1="0" y1="-164" x2="0" y2="164" stroke={BLACK} strokeWidth="4" strokeDasharray="10 7" />
          <path d="M -228 -55 Q -190 -78 -150 -55 Q -112 -32 -150 -10 Q -190 12 -150 34" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 228 -55 Q 190 -78 150 -55 Q 112 -32 150 -10 Q 190 12 150 34" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <text x="0" y="18" fontFamily={FONT} fontSize="40" fill={BLACK} textAnchor="middle">BRAIN</text>
        </g>

        {/* Dashed arrows growing downward from brain bottom */}
        <line x1="270" y1="895" x2="270" y2={895 + arrowLen} stroke={ACCENT} strokeWidth="6" strokeDasharray="14 9" strokeLinecap="round" />
        <polygon points={`270,${895 + arrowLen} 248,${872 + arrowLen} 292,${872 + arrowLen}`} fill={ACCENT} opacity={iconOpacity} />

        <line x1="540" y1="895" x2="540" y2={895 + arrowLen} stroke={ACCENT} strokeWidth="6" strokeDasharray="14 9" strokeLinecap="round" />
        <polygon points={`540,${895 + arrowLen} 518,${872 + arrowLen} 562,${872 + arrowLen}`} fill={ACCENT} opacity={iconOpacity} />

        <line x1="810" y1="895" x2="810" y2={895 + arrowLen} stroke={ACCENT} strokeWidth="6" strokeDasharray="14 9" strokeLinecap="round" />
        <polygon points={`810,${895 + arrowLen} 788,${872 + arrowLen} 832,${872 + arrowLen}`} fill={ACCENT} opacity={iconOpacity} />

        {/* Icons: shopping bag, food plate, phone */}
        <g opacity={iconOpacity}>
          {/* Shopping bag */}
          <rect x="160" y="1110" width="220" height="185" rx="16" fill={ACCENT} />
          <path d="M 200 1110 Q 200 1070 270 1070 Q 340 1070 340 1110" stroke={WHITE} strokeWidth="8" fill="none" strokeLinecap="round" />
          <text x="270" y="1224" fontFamily={FONT} fontSize="44" fill={WHITE} textAnchor="middle">SHOP</text>

          {/* Food plate + fork */}
          <circle cx="540" cy="1208" r="98" fill={ACCENT} />
          <line x1="504" y1="1148" x2="504" y2="1268" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
          <line x1="528" y1="1148" x2="528" y2="1268" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
          <path d="M 558 1148 Q 580 1148 580 1170 Q 580 1192 558 1196 L 558 1268" stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" />
          <text x="540" y="1352" fontFamily={FONT} fontSize="36" fill={ACCENT} textAnchor="middle">FOOD</text>

          {/* Phone / subscriptions */}
          <rect x="700" y="1108" width="218" height="352" rx="28" fill={ACCENT} />
          <rect x="720" y="1145" width="178" height="272" rx="12" fill={WHITE} />
          <rect x="774" y="1116" width="70" height="20" rx="10" fill="#D08030" />
          <rect x="734" y="1160" width="150" height="30" rx="6" fill="#EEE" />
          <rect x="734" y="1204" width="150" height="30" rx="6" fill="#EEE" />
          <rect x="734" y="1248" width="150" height="30" rx="6" fill="#EEE" />
          <text x="809" y="1360" fontFamily={FONT} fontSize="30" fill={ACCENT} textAnchor="middle">SUBS</text>
          <text x="809" y="1484" fontFamily={FONT} fontSize="34" fill={ACCENT} textAnchor="middle">APPS</text>
        </g>

        {/* Explanatory text */}
        <g opacity={textOpacity}>
          <text x="540" y="1612" fontFamily={FONT} fontSize="50" fill={BLACK} textAnchor="middle">Available money =</text>
          <text x="540" y="1692" fontFamily={FONT} fontSize="52" fill={ACCENT} textAnchor="middle" fontWeight="bold">money to spend</text>
          <text x="540" y="1804" fontFamily="Arial, sans-serif" fontSize="38" fill="#555" textAnchor="middle">By the 31st, nothing's left</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 3: Two animated bar charts – SAVE LAST vs SAVE FIRST
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame, [20, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxH = 640;
  const leftH = Math.max(2, barProgress * maxH * (127 / 441));
  const rightH = Math.max(2, barProgress * maxH);
  const baseline = 1490;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <g opacity={titleOpacity}>
          <text x="540" y="168" fontFamily={FONT} fontSize="54" fill={WHITE} textAnchor="middle">AVERAGE MONTHLY</text>
          <text x="540" y="254" fontFamily={FONT} fontSize="56" fill={ACCENT} textAnchor="middle" fontWeight="bold">SAVINGS</text>
        </g>

        {/* Baseline */}
        <line x1="100" y1={baseline} x2="980" y2={baseline} stroke="#444" strokeWidth="4" />

        {/* Left bar: SAVE LAST */}
        <rect x="155" y={baseline - leftH} width="310" height={leftH} rx="12" fill="#555" />

        {/* Right bar: SAVE FIRST */}
        <rect x="615" y={baseline - rightH} width="310" height={rightH} rx="12" fill={ACCENT} />

        {/* Dollar labels above bars */}
        <g opacity={labelOpacity}>
          <text x="310" y={baseline - leftH - 28} fontFamily={FONT} fontSize="68" fill="#888" textAnchor="middle" fontWeight="bold">$127</text>
          <text x="310" y={baseline - leftH + 28} fontFamily="Arial, sans-serif" fontSize="34" fill="#666" textAnchor="middle">per month</text>
          <text x="770" y={baseline - rightH - 28} fontFamily={FONT} fontSize="68" fill={ACCENT} textAnchor="middle" fontWeight="bold">$441</text>
          <text x="770" y={baseline - rightH + 28} fontFamily="Arial, sans-serif" fontSize="34" fill={ACCENT} textAnchor="middle">per month</text>
        </g>

        {/* X-axis category labels */}
        <g opacity={titleOpacity}>
          <text x="310" y={baseline + 72} fontFamily={FONT} fontSize="42" fill="#666" textAnchor="middle">SAVE LAST</text>
          <text x="770" y={baseline + 72} fontFamily={FONT} fontSize="42" fill={ACCENT} textAnchor="middle">SAVE FIRST</text>
        </g>

        {/* Insight below */}
        <g opacity={labelOpacity}>
          <text x="540" y="1700" fontFamily={FONT} fontSize="48" fill={WHITE} textAnchor="middle">Only the</text>
          <text x="540" y="1775" fontFamily={FONT} fontSize="60" fill={ACCENT} textAnchor="middle" fontWeight="bold">ORDER</text>
          <text x="540" y="1848" fontFamily={FONT} fontSize="48" fill={WHITE} textAnchor="middle">is different</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 4: Compound growth curve + rolling counter
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [10, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countValue = interpolate(frame, [30, 185], [0, 384000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const n = Math.round(countValue);
  const thousands = Math.floor(n / 1000);
  const rem = String(n % 1000).padStart(3, '0');
  const formattedCount = n >= 1000 ? `$${thousands},${rem}` : `$${n}`;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <g opacity={labelOpacity}>
          <text x="540" y="168" fontFamily={FONT} fontSize="52" fill={BLACK} textAnchor="middle">$314/MONTH GAP</text>
          <text x="540" y="252" fontFamily="Arial, sans-serif" fontSize="40" fill="#555" textAnchor="middle">30 years @ 7% interest</text>
        </g>

        {/* Chart background */}
        <rect x="100" y="330" width="880" height="820" rx="20" fill="#E8E8E8" />
        {/* Grid lines */}
        <line x1="148" y1="530" x2="940" y2="530" stroke="#CCC" strokeWidth="2" strokeDasharray="8 5" />
        <line x1="148" y1="630" x2="940" y2="630" stroke="#CCC" strokeWidth="2" strokeDasharray="8 5" />
        <line x1="148" y1="730" x2="940" y2="730" stroke="#CCC" strokeWidth="2" strokeDasharray="8 5" />
        <line x1="148" y1="830" x2="940" y2="830" stroke="#CCC" strokeWidth="2" strokeDasharray="8 5" />
        <line x1="148" y1="930" x2="940" y2="930" stroke="#CCC" strokeWidth="2" strokeDasharray="8 5" />
        {/* Axes */}
        <line x1="148" y1="1100" x2="940" y2="1100" stroke="#AAA" strokeWidth="3" />
        <line x1="148" y1="372" x2="148" y2="1104" stroke="#AAA" strokeWidth="3" />

        <g opacity={labelOpacity}>
          <text x="134" y="1105" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="end">$0</text>
          <text x="134" y="935" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="end">$100K</text>
          <text x="134" y="835" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="end">$200K</text>
          <text x="134" y="735" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="end">$300K</text>
          <text x="134" y="540" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="end">$400K</text>
          <text x="148" y="1140" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="middle">0</text>
          <text x="544" y="1140" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="middle">15 yrs</text>
          <text x="940" y="1140" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="middle">30 yrs</text>
        </g>

        {/* Compound growth curve — animated draw */}
        <path
          d="M 148 1100 C 280 1090 360 1050 448 960 S 660 740 770 580 S 895 420 940 372"
          pathLength={1000}
          stroke={ACCENT}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - drawProgress)}
        />
        {drawProgress > 0.9 && (
          <circle cx="940" cy="372" r="16" fill={ACCENT} />
        )}

        {/* Rolling counter */}
        <g opacity={counterOpacity}>
          <text x="540" y="1320" fontFamily={FONT} fontSize="42" fill={BLACK} textAnchor="middle">$314 gap compounds to...</text>
          <text x="540" y="1488" fontFamily={FONT} fontSize="116" fill={ACCENT} textAnchor="middle" fontWeight="bold">{formattedCount}</text>
          <text x="540" y="1574" fontFamily={FONT} fontSize="46" fill={BLACK} textAnchor="middle">over 30 years</text>
          <text x="540" y="1700" fontFamily="Arial, sans-serif" fontSize="38" fill="#555" textAnchor="middle">Just from going first.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 5: Smartphone auto-transfer setup
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneScale = spring({ frame, fps: 30, config: { damping: 20 }, delay: 0 });
  const toggleX = interpolate(frame, [50, 92], [706, 744], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const toggleColor = interpolate(frame, [50, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsGlow = interpolate(frame, [90, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOpacity = interpolate(frame, [138, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [105, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const toggleFill = toggleColor > 0.5 ? ACCENT : '#444';

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <text x="540" y="168" fontFamily={FONT} fontSize="60" fill={WHITE} textAnchor="middle">THE FIX IS</text>
        <text x="540" y="260" fontFamily={FONT} fontSize="64" fill={ACCENT} textAnchor="middle" fontWeight="bold">AUTOMATE IT</text>

        {/* Smartphone */}
        <g transform={`translate(540, 820) scale(${phoneScale}) translate(-540,-820)`}>
          {/* Phone body */}
          <rect x="286" y="310" width="508" height="1006" rx="52" fill="#1E1E1E" stroke={ACCENT} strokeWidth="5" />
          {/* Screen */}
          <rect x="308" y="356" width="464" height="918" rx="32" fill="#0A0A1A" />
          {/* Notch */}
          <rect x="420" y="360" width="240" height="28" rx="14" fill="#111" />
          {/* Home bar */}
          <rect x="462" y="1252" width="156" height="8" rx="4" fill="#444" />

          {/* Screen header */}
          <text x="540" y="432" fontFamily={FONT} fontSize="28" fill={WHITE} textAnchor="middle">AUTO-TRANSFER</text>

          {/* Paycheck row */}
          <rect x="328" y="450" width="424" height="102" rx="14" fill="#111" />
          <text x="368" y="490" fontFamily="Arial, sans-serif" fontSize="23" fill="#888">PAYCHECK</text>
          <text x="368" y="536" fontFamily={FONT} fontSize="40" fill={WHITE}>$4,200</text>

          {/* Arrow down button */}
          <rect x="516" y="556" width="48" height="48" rx="24" fill={ACCENT} />
          <text x="540" y="591" fontFamily="Arial, sans-serif" fontSize="30" fill={BLACK} textAnchor="middle" fontWeight="bold">↓</text>

          {/* Savings row */}
          <rect x="328" y="608" width="424" height="102" rx="14" fill="#0D1A0D" stroke={ACCENT} strokeWidth={savingsGlow * 3} />
          <text x="368" y="648" fontFamily="Arial, sans-serif" fontSize="23" fill={ACCENT}>SAVINGS FIRST</text>
          <text x="368" y="694" fontFamily={FONT} fontSize="40" fill={ACCENT}>+$441</text>

          {/* Toggle row */}
          <text x="368" y="760" fontFamily="Arial, sans-serif" fontSize="22" fill="#888">AUTO-SAVE ON PAYDAY</text>
          <rect x="680" y="732" width="74" height="36" rx="18" fill={toggleFill} />
          <circle cx={toggleX} cy="750" r="15" fill={WHITE} />

          {/* Check mark confirmation */}
          <g opacity={checkOpacity}>
            <circle cx="540" cy="886" r="54" fill={ACCENT} />
            <text x="540" y="910" fontFamily="Arial, sans-serif" fontSize="52" fill={BLACK} textAnchor="middle" fontWeight="bold">✓</text>
            <text x="540" y="982" fontFamily={FONT} fontSize="26" fill={ACCENT} textAnchor="middle">ACTIVATED</text>
          </g>
        </g>

        {/* Text below phone */}
        <g opacity={textOpacity}>
          <text x="540" y="1568" fontFamily={FONT} fontSize="52" fill={WHITE} textAnchor="middle">Your brain can't spend</text>
          <text x="540" y="1658" fontFamily={FONT} fontSize="52" fill={ACCENT} textAnchor="middle">what it never sees</text>
          <text x="540" y="1790" fontFamily="Arial, sans-serif" fontSize="38" fill="#888" textAnchor="middle">Automate on payday. Done.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

// Scene 6: Split screen — sad piggy (SAVE LAST) vs happy piggy (SAVE FIRST) + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftScale = spring({ frame, fps: 30, config: { damping: 18 }, delay: 0 });
  const rightScale = spring({ frame, fps: 30, config: { damping: 18 }, delay: 24 });
  const bigNumOpacity = interpolate(frame, [78, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [138, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <rect x="0" y="0" width="1080" height="14" fill={ACCENT} />
        <rect x="0" y="1906" width="1080" height="14" fill={ACCENT} />

        <text x="540" y="168" fontFamily={FONT} fontSize="60" fill={WHITE} textAnchor="middle">WHICH ONE</text>
        <text x="540" y="258" fontFamily={FONT} fontSize="62" fill={ACCENT} textAnchor="middle" fontWeight="bold">ARE YOU?</text>

        {/* Left panel: SAVE LAST — gray sad piggy */}
        <g transform={`translate(268, 760) scale(${leftScale})`}>
          <rect x="-218" y="-370" width="436" height="718" rx="22" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
          {/* Sad gray piggy body */}
          <ellipse cx="0" cy="-20" rx="142" ry="120" fill="#555" stroke="#777" strokeWidth="5" />
          <circle cx="122" cy="-88" r="76" fill="#555" stroke="#777" strokeWidth="5" />
          <ellipse cx="180" cy="-62" rx="34" ry="28" fill="#444" stroke="#777" strokeWidth="3" />
          <circle cx="172" cy="-66" r="7" fill="#222" />
          <circle cx="188" cy="-66" r="7" fill="#222" />
          <circle cx="130" cy="-108" r="12" fill="#888" />
          <circle cx="132" cy="-106" r="6" fill="#222" />
          {/* Sad frown */}
          <path d="M 116 -64 Q 126 -55 136 -64" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Empty coin slot */}
          <rect x="-16" y="-112" width="32" height="9" rx="4" fill="#222" stroke="#777" strokeWidth="2" />
          {/* Legs */}
          <rect x="-142" y="78" width="36" height="62" rx="10" fill="#444" stroke="#666" strokeWidth="3" />
          <rect x="-88" y="90" width="36" height="52" rx="10" fill="#444" stroke="#666" strokeWidth="3" />
          <rect x="52" y="90" width="36" height="52" rx="10" fill="#444" stroke="#666" strokeWidth="3" />
          <rect x="106" y="78" width="36" height="62" rx="10" fill="#444" stroke="#666" strokeWidth="3" />
          {/* Label inside panel */}
          <text x="0" y="-330" fontFamily={FONT} fontSize="34" fill="#666" textAnchor="middle">SAVE LAST</text>
          <text x="0" y="232" fontFamily={FONT} fontSize="54" fill="#666" textAnchor="middle" fontWeight="bold">$127/mo</text>
        </g>

        {/* Center divider */}
        <line x1="540" y1="350" x2="540" y2="1430" stroke="#333" strokeWidth="3" />

        {/* Right panel: SAVE FIRST — amber happy piggy */}
        <g transform={`translate(812, 760) scale(${rightScale})`}>
          <rect x="-218" y="-370" width="436" height="718" rx="22" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
          {/* Happy amber piggy body */}
          <ellipse cx="0" cy="-20" rx="142" ry="120" fill="#E8A040" stroke={ACCENT} strokeWidth="5" />
          <circle cx="122" cy="-88" r="76" fill="#E8A040" stroke={ACCENT} strokeWidth="5" />
          <ellipse cx="180" cy="-62" rx="34" ry="28" fill="#D08030" stroke={ACCENT} strokeWidth="3" />
          <circle cx="172" cy="-66" r="7" fill={BLACK} />
          <circle cx="188" cy="-66" r="7" fill={BLACK} />
          <circle cx="130" cy="-108" r="12" fill={WHITE} />
          <circle cx="132" cy="-106" r="6" fill={BLACK} />
          {/* Happy smile */}
          <path d="M 114 -68 Q 124 -80 134 -68" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Coin slot with stacked coins */}
          <rect x="-16" y="-112" width="32" height="9" rx="4" fill={BLACK} stroke={ACCENT} strokeWidth="2" />
          <ellipse cx="0" cy="-130" rx="19" ry="7" fill={ACCENT} />
          <ellipse cx="0" cy="-148" rx="19" ry="7" fill="#FFD060" />
          <ellipse cx="0" cy="-166" rx="19" ry="7" fill={ACCENT} />
          {/* Legs */}
          <rect x="-142" y="78" width="36" height="62" rx="10" fill="#D08030" stroke={ACCENT} strokeWidth="3" />
          <rect x="-88" y="90" width="36" height="52" rx="10" fill="#D08030" stroke={ACCENT} strokeWidth="3" />
          <rect x="52" y="90" width="36" height="52" rx="10" fill="#D08030" stroke={ACCENT} strokeWidth="3" />
          <rect x="106" y="78" width="36" height="62" rx="10" fill="#D08030" stroke={ACCENT} strokeWidth="3" />
          {/* Label inside panel */}
          <text x="0" y="-330" fontFamily={FONT} fontSize="34" fill={ACCENT} textAnchor="middle">SAVE FIRST</text>
          <text x="0" y="232" fontFamily={FONT} fontSize="54" fill={ACCENT} textAnchor="middle" fontWeight="bold">$441/mo</text>
        </g>

        {/* Big difference number */}
        <g opacity={bigNumOpacity}>
          <text x="540" y="1462" fontFamily={FONT} fontSize="46" fill={WHITE} textAnchor="middle">Difference over 30 years:</text>
          <text x="540" y="1590" fontFamily={FONT} fontSize="108" fill={ACCENT} textAnchor="middle" fontWeight="bold">+$384K</text>
        </g>

        {/* CTA */}
        <g opacity={ctaOpacity}>
          <text x="540" y="1706" fontFamily={FONT} fontSize="48" fill={WHITE} textAnchor="middle">Follow for more</text>
          <text x="540" y="1786" fontFamily={FONT} fontSize="50" fill={ACCENT} textAnchor="middle">money traps like this</text>
        </g>
      </svg>
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
