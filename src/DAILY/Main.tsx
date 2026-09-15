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

// ─── Scene 1 — The Hook: Singles Tax
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const tagY = interpolate(tagSpring, [0, 1], [160, 0]);

  const svgFade = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dollarDrift = interpolate(frame, [45, dur - 20], [0, -200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarFade = interpolate(frame, [45, 70, dur - 30, dur - 10], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statSpring = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 12, stiffness: 75, mass: 1.1 } });
  const statScale = interpolate(statSpring, [0, 1], [0.5, 1]);
  const statFade = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const warnFade = interpolate(frame, [150, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">

          {/* TAG: THE SINGLES TAX */}
          <g transform={`translate(0, ${tagY})`}>
            <rect x="140" y="100" width="800" height="96" rx="20" fill={ACCENT} />
            <text x="540" y="165" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="900" fill={BLACK} letterSpacing="6">THE SINGLES TAX</text>
          </g>

          {/* SINGLE person — left */}
          <g opacity={svgFade} transform="translate(150, 290)">
            <circle cx="110" cy="72" r="68" fill={WHITE} />
            <rect x="38" y="147" width="144" height="210" rx="20" fill={WHITE} />
            <rect x="-48" y="162" width="86" height="38" rx="19" fill={WHITE} />
            <rect x="182" y="162" width="86" height="38" rx="19" fill={WHITE} />
            <rect x="44" y="352" width="50" height="116" rx="16" fill={WHITE} />
            <rect x="106" y="352" width="50" height="116" rx="16" fill={WHITE} />
            <text x="110" y="512" textAnchor="middle" fontFamily={FONT}
              fontSize="40" fontWeight="900" fill={ACCENT} letterSpacing="4">SINGLE</text>
            {/* Dollar signs floating up */}
            {[0, 1, 2].map((i) => {
              const xOffsets = [-35, 55, 15];
              const sizes = [60, 46, 36];
              return (
                <text key={i}
                  x={110 + xOffsets[i]}
                  y={55 + dollarDrift - i * 50}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={sizes[i]}
                  fontWeight="900"
                  fill={ACCENT}
                  opacity={dollarFade * (1 - i * 0.28)}>
                  $
                </text>
              );
            })}
          </g>

          {/* VS */}
          <text x="540" y="680" textAnchor="middle" fontFamily={FONT}
            fontSize="84" fontWeight="900" fill="#444" opacity={svgFade}>VS</text>

          {/* COUPLE — right: two people */}
          <g opacity={svgFade} transform="translate(590, 290)">
            <circle cx="80" cy="72" r="58" fill={WHITE} />
            <rect x="28" y="137" width="104" height="190" rx="18" fill={WHITE} />
            <rect x="-44" y="152" width="72" height="34" rx="17" fill={WHITE} />
            <rect x="132" y="152" width="72" height="34" rx="17" fill={WHITE} />
            <circle cx="230" cy="72" r="58" fill={WHITE} />
            <rect x="178" y="137" width="104" height="190" rx="18" fill={WHITE} />
            <rect x="282" y="152" width="72" height="34" rx="17" fill={WHITE} />
            <text x="155" y="512" textAnchor="middle" fontFamily={FONT}
              fontSize="40" fontWeight="900" fill={WHITE} letterSpacing="4">COUPLE</text>
          </g>

          {/* Main stat */}
          <g opacity={statFade} transform={`translate(540, 1100) scale(${statScale})`}>
            <text x="0" y="-65" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="5">LIFETIME COST DIFFERENCE</text>
            <text x="0" y="110" textAnchor="middle" fontFamily={FONT}
              fontSize="188" fontWeight="900" fill={ACCENT} letterSpacing="2">$1M+</text>
            <text x="0" y="215" textAnchor="middle" fontFamily={FONT}
              fontSize="50" fontWeight="700" fill={WHITE} letterSpacing="4">MORE THAN COUPLES PAY</text>
          </g>

          {/* Warning bar */}
          <g opacity={warnFade}>
            <rect x="80" y="1490" width="920" height="90" rx="16" fill="#EF4444" opacity="0.18" />
            <text x="540" y="1547" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="900" fill="#EF4444" letterSpacing="5">AND NOBODY WARNED YOU</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2 — Housing: Paying Alone
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const h1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const h2Spring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 95 } });

  const labelFade = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagFade = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade = interpolate(frame, [138, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapCount = interpolate(frame, [148, 215], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="900" fill={BLACK} letterSpacing="8">NUMBER ONE</text>
            <text x="540" y="260" textAnchor="middle" fontFamily={FONT}
              fontSize="108" fontWeight="900" fill={ACCENT} letterSpacing="6">HOUSING</text>
          </g>

          {/* COUPLE house — left, amber roof */}
          <g transform={`translate(120, 370) scale(${h1Spring})`}>
            <polygon points="135,-175 -15,0 285,0" fill={ACCENT} />
            <rect x="-15" y="0" width="300" height="268" rx="10" fill={BLACK} opacity="0.82" />
            <rect x="105" y="175" width="60" height="93" rx="7" fill={ACCENT} opacity="0.7" />
            <rect x="14" y="55" width="84" height="72" rx="7" fill={ACCENT} opacity="0.45" />
            <rect x="168" y="55" width="84" height="72" rx="7" fill={ACCENT} opacity="0.45" />
          </g>
          <g opacity={labelFade}>
            <text x="255" y="720" textAnchor="middle" fontFamily={FONT}
              fontSize="36" fontWeight="900" fill={BLACK} letterSpacing="4">COUPLE</text>
            <text x="255" y="768" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fill={BLACK} opacity="0.6">splits rent 2 ways</text>
          </g>

          {/* SINGLE house — right, red roof */}
          <g transform={`translate(645, 370) scale(${h2Spring})`}>
            <polygon points="135,-175 -15,0 285,0" fill="#EF4444" />
            <rect x="-15" y="0" width="300" height="268" rx="10" fill={BLACK} opacity="0.82" />
            <rect x="105" y="175" width="60" height="93" rx="7" fill="#EF4444" opacity="0.7" />
            <rect x="14" y="55" width="84" height="72" rx="7" fill="#EF4444" opacity="0.45" />
            <rect x="168" y="55" width="84" height="72" rx="7" fill="#EF4444" opacity="0.45" />
          </g>
          <g opacity={labelFade}>
            <text x="780" y="720" textAnchor="middle" fontFamily={FONT}
              fontSize="36" fontWeight="900" fill="#EF4444" letterSpacing="4">SINGLE</text>
            <text x="780" y="768" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fill={BLACK} opacity="0.6">pays 100% alone</text>
          </g>

          {/* Per-person cost tags */}
          <g opacity={tagFade}>
            <rect x="65" y="820" width="450" height="140" rx="20" fill={ACCENT} opacity="0.14" />
            <text x="290" y="878" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="28" fill={BLACK} opacity="0.65">avg rent ÷ 2 people</text>
            <text x="290" y="936" textAnchor="middle" fontFamily={FONT}
              fontSize="58" fontWeight="900" fill={BLACK}>$1,250/mo</text>
            <rect x="565" y="820" width="450" height="140" rx="20" fill="#EF4444" opacity="0.14" />
            <text x="790" y="878" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="28" fill={BLACK} opacity="0.65">same rent, alone</text>
            <text x="790" y="936" textAnchor="middle" fontFamily={FONT}
              fontSize="58" fontWeight="900" fill="#EF4444">$2,500/mo</text>
          </g>

          {/* 30-year total */}
          <g opacity={statFade}>
            <rect x="80" y="1020" width="920" height="4" rx="2" fill={BLACK} opacity="0.1" />
            <text x="540" y="1130" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">OVER 30 YEARS THAT'S</text>
            <text x="540" y="1390" textAnchor="middle" fontFamily={FONT}
              fontSize="168" fontWeight="900" fill={ACCENT}>${Math.floor(gapCount)}K</text>
            <text x="540" y="1480" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">MORE OUT OF YOUR POCKET</text>
            <text x="540" y="1580" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={BLACK} opacity="0.5">just to keep the same roof over your head</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3 — Tax Penalty
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const c1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const c2Spring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 14, stiffness: 95 } });

  const amtFade = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade = interpolate(frame, [132, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = interpolate(frame, [145, 215], [0, 375], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="900" fill={WHITE} letterSpacing="8">NUMBER TWO</text>
            <text x="540" y="260" textAnchor="middle" fontFamily={FONT}
              fontSize="108" fontWeight="900" fill={ACCENT} letterSpacing="6">TAXES</text>
          </g>

          {/* Married form card — left */}
          <g transform={`translate(55, 340) scale(${c1Spring})`}>
            <rect x="0" y="0" width="440" height="390" rx="24" fill={WHITE} opacity="0.96" />
            <rect x="0" y="0" width="440" height="78" rx="24" fill="#10B981" />
            <rect x="0" y="54" width="440" height="24" fill="#10B981" />
            <text x="220" y="46" textAnchor="middle" fontFamily={FONT}
              fontSize="26" fontWeight="900" fill={WHITE} letterSpacing="2">MARRIED FILING</text>
            <text x="220" y="76" textAnchor="middle" fontFamily={FONT}
              fontSize="26" fontWeight="900" fill={WHITE} letterSpacing="2">JOINTLY</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="22" y={112 + i * 40} width={380 - i * 22} height="14" rx="4" fill={BLACK} opacity="0.08" />
            ))}
            <circle cx="220" cy="316" r="52" fill="#10B981" opacity="0.18" />
            <text x="220" y="334" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="66" fill="#10B981">✓</text>
          </g>

          {/* Single form card — right */}
          <g transform={`translate(585, 340) scale(${c2Spring})`}>
            <rect x="0" y="0" width="440" height="390" rx="24" fill={WHITE} opacity="0.96" />
            <rect x="0" y="0" width="440" height="78" rx="24" fill="#EF4444" />
            <rect x="0" y="54" width="440" height="24" fill="#EF4444" />
            <text x="220" y="46" textAnchor="middle" fontFamily={FONT}
              fontSize="26" fontWeight="900" fill={WHITE} letterSpacing="2">SINGLE</text>
            <text x="220" y="76" textAnchor="middle" fontFamily={FONT}
              fontSize="26" fontWeight="900" fill={WHITE} letterSpacing="2">FILER</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="22" y={112 + i * 40} width={380 - i * 22} height="14" rx="4" fill={BLACK} opacity="0.08" />
            ))}
            <circle cx="220" cy="316" r="52" fill="#EF4444" opacity="0.18" />
            <text x="220" y="336" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="70" fill="#EF4444">✕</text>
          </g>

          {/* Annual amounts */}
          <g opacity={amtFade}>
            <text x="275" y="812" textAnchor="middle" fontFamily={FONT}
              fontSize="36" fontWeight="900" fill="#10B981">$12,500 / YR SAVED</text>
            <text x="805" y="812" textAnchor="middle" fontFamily={FONT}
              fontSize="36" fontWeight="900" fill="#EF4444">$0 SAVED</text>
          </g>

          {/* 30-yr total */}
          <g opacity={statFade}>
            <rect x="80" y="870" width="920" height="4" rx="2" fill={ACCENT} opacity="0.28" />
            <text x="540" y="988" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">OVER 30 YEARS YOU MISS</text>
            <text x="540" y="1230" textAnchor="middle" fontFamily={FONT}
              fontSize="164" fontWeight="900" fill={ACCENT}>${Math.floor(totalCount)}K</text>
            <text x="540" y="1325" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">IN TAX SAVINGS</text>
            <text x="540" y="1445" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={WHITE} opacity="0.5">legally handed to married couples instead</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4 — Insurance Surcharge
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const carSpring = spring({ frame, fps, config: { damping: 13, stiffness: 85, mass: 1.2 } });
  const carY = interpolate(carSpring, [0, 1], [350, 0]);

  const tagFade = interpolate(frame, [58, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const iconFade = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="900" fill={BLACK} letterSpacing="8">NUMBER THREE</text>
            <text x="540" y="260" textAnchor="middle" fontFamily={FONT}
              fontSize="108" fontWeight="900" fill={ACCENT} letterSpacing="6">INSURANCE</text>
          </g>

          {/* Car silhouette — springs up */}
          <g transform={`translate(540, ${580 + carY})`}>
            {/* Lower body */}
            <rect x="-320" y="-65" width="640" height="162" rx="32" fill={BLACK} />
            {/* Cabin */}
            <rect x="-210" y="-180" width="420" height="120" rx="34" fill={BLACK} />
            {/* Windshields */}
            <rect x="-196" y="-166" width="178" height="98" rx="16" fill={ACCENT} opacity="0.38" />
            <rect x="-6" y="-166" width="178" height="98" rx="16" fill={ACCENT} opacity="0.38" />
            {/* Front wheel */}
            <circle cx="-175" cy="104" r="76" fill="#2a2a2a" />
            <circle cx="-175" cy="104" r="46" fill={ACCENT} opacity="0.55" />
            <circle cx="-175" cy="104" r="17" fill={BLACK} />
            {/* Rear wheel */}
            <circle cx="175" cy="104" r="76" fill="#2a2a2a" />
            <circle cx="175" cy="104" r="46" fill={ACCENT} opacity="0.55" />
            <circle cx="175" cy="104" r="17" fill={BLACK} />
            {/* Headlight */}
            <rect x="-318" y="-40" width="52" height="28" rx="8" fill={ACCENT} opacity="0.9" />
            {/* Tail light */}
            <rect x="266" y="-40" width="52" height="28" rx="8" fill="#EF4444" opacity="0.8" />
          </g>

          {/* Price tags */}
          <g opacity={tagFade}>
            <rect x="65" y="740" width="440" height="136" rx="20" fill="#10B981" opacity="0.14" />
            <text x="285" y="798" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fill={BLACK} opacity="0.65">partnered / married</text>
            <text x="285" y="856" textAnchor="middle" fontFamily={FONT}
              fontSize="56" fontWeight="900" fill="#10B981">BASE RATE</text>
            <rect x="575" y="740" width="440" height="136" rx="20" fill="#EF4444" opacity="0.14" />
            <text x="795" y="798" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fill={BLACK} opacity="0.65">single / unmarried</text>
            <text x="795" y="856" textAnchor="middle" fontFamily={FONT}
              fontSize="56" fontWeight="900" fill="#EF4444">+$3,400/YR</text>
          </g>

          {/* Three icons: auto, health, home */}
          <g opacity={iconFade}>
            {/* AUTO */}
            <g transform="translate(180, 1048)">
              <circle r="60" fill={ACCENT} opacity="0.14" />
              {/* Mini car */}
              <rect x="-26" y="-12" width="52" height="22" rx="7" fill={BLACK} opacity="0.75" />
              <rect x="-18" y="-28" width="36" height="18" rx="5" fill={BLACK} opacity="0.75" />
              <circle cx="-13" cy="16" r="10" fill={BLACK} opacity="0.75" />
              <circle cx="13" cy="16" r="10" fill={BLACK} opacity="0.75" />
              <text x="0" y="95" textAnchor="middle" fontFamily={FONT}
                fontSize="26" fontWeight="700" fill={BLACK}>AUTO</text>
            </g>
            {/* HEALTH */}
            <g transform="translate(540, 1048)">
              <circle r="60" fill={ACCENT} opacity="0.14" />
              <rect x="-9" y="-32" width="18" height="64" rx="5" fill="#EF4444" opacity="0.85" />
              <rect x="-32" y="-9" width="64" height="18" rx="5" fill="#EF4444" opacity="0.85" />
              <text x="0" y="95" textAnchor="middle" fontFamily={FONT}
                fontSize="26" fontWeight="700" fill={BLACK}>HEALTH</text>
            </g>
            {/* HOME */}
            <g transform="translate(900, 1048)">
              <circle r="60" fill={ACCENT} opacity="0.14" />
              <polygon points="-28,0 28,0 0,-34" fill={BLACK} opacity="0.8" />
              <rect x="-22" y="0" width="44" height="30" rx="4" fill={BLACK} opacity="0.8" />
              <rect x="-7" y="10" width="14" height="20" rx="3" fill={ACCENT} opacity="0.7" />
              <text x="0" y="95" textAnchor="middle" fontFamily={FONT}
                fontSize="26" fontWeight="700" fill={BLACK}>HOME</text>
            </g>
          </g>

          {/* Stat */}
          <g opacity={statFade}>
            <text x="540" y="1280" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">EVERY SINGLE YEAR</text>
            <text x="540" y="1450" textAnchor="middle" fontFamily={FONT}
              fontSize="118" fontWeight="900" fill="#EF4444">$3,400</text>
            <text x="540" y="1544" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">SINGLES SURCHARGE</text>
            <text x="540" y="1650" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={BLACK} opacity="0.5">across all three insurance categories</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5 — The $1M Total
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleFade = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1H = interpolate(frame, [38, 115], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [52, 129], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [68, 145], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lbl1Fade = interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl2Fade = interpolate(frame, [94, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lbl3Fade = interpolate(frame, [110, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const totalFade = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = interpolate(frame, [150, 218], [0, 1000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const noteFade = interpolate(frame, [185, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 1260;

  const formatDollar = (n: number): string => {
    if (n < 1000) return `$${Math.floor(n)}`;
    if (n < 1000000) return `$${Math.floor(n / 1000)}K`;
    return `$${(n / 1000000).toFixed(1)}M`;
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="900" fill={WHITE} letterSpacing="8">ADD IT ALL UP</text>
            <text x="540" y="255" textAnchor="middle" fontFamily={FONT}
              fontSize="80" fontWeight="900" fill={ACCENT} letterSpacing="4">THE REAL TOTAL</text>
          </g>

          {/* Bar 1: Housing $400K */}
          <rect x="100" y={BASE_Y - bar1H} width="230" height={bar1H} rx="14" fill={ACCENT} />
          <g opacity={lbl1Fade}>
            <text x="215" y={BASE_Y - bar1H - 22} textAnchor="middle" fontFamily={FONT}
              fontSize="38" fontWeight="900" fill={ACCENT}>$400K</text>
            <text x="215" y={BASE_Y + 52} textAnchor="middle" fontFamily={FONT}
              fontSize="28" fontWeight="700" fill={WHITE}>HOUSING</text>
          </g>

          {/* Bar 2: Taxes $375K */}
          <rect x="425" y={BASE_Y - bar2H} width="230" height={bar2H} rx="14" fill={ACCENT} opacity="0.78" />
          <g opacity={lbl2Fade}>
            <text x="540" y={BASE_Y - bar2H - 22} textAnchor="middle" fontFamily={FONT}
              fontSize="38" fontWeight="900" fill={ACCENT}>$375K</text>
            <text x="540" y={BASE_Y + 52} textAnchor="middle" fontFamily={FONT}
              fontSize="28" fontWeight="700" fill={WHITE}>TAXES</text>
          </g>

          {/* Bar 3: Other costs $225K */}
          <rect x="750" y={BASE_Y - bar3H} width="230" height={bar3H} rx="14" fill={ACCENT} opacity="0.55" />
          <g opacity={lbl3Fade}>
            <text x="865" y={BASE_Y - bar3H - 22} textAnchor="middle" fontFamily={FONT}
              fontSize="38" fontWeight="900" fill={ACCENT}>$225K</text>
            <text x="865" y={BASE_Y + 52} textAnchor="middle" fontFamily={FONT}
              fontSize="28" fontWeight="700" fill={WHITE}>OTHER COSTS</text>
          </g>

          {/* Baseline */}
          <rect x="80" y={BASE_Y} width="920" height="4" rx="2" fill={WHITE} opacity="0.18" />

          {/* Total counter */}
          <g opacity={totalFade}>
            <text x="540" y="1460" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">TOTAL SINGLES PENALTY</text>
            <text x="540" y="1690" textAnchor="middle" fontFamily={FONT}
              fontSize="160" fontWeight="900" fill={ACCENT}>{formatDollar(totalCount)}</text>
          </g>

          {/* House note */}
          <g opacity={noteFade}>
            <text x="540" y="1800" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={WHITE} opacity="0.58">= the price of a house. paid in extras.</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6 — Build Around It (CTA)
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggySpring = spring({ frame, fps, config: { damping: 12, stiffness: 72, mass: 1.3 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0, 1]);

  const coin1Y = interpolate(frame, [48, 76], [-140, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Op = interpolate(frame, [48, 68, 76, 86], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Y = interpolate(frame, [72, 100], [-140, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [72, 92, 100, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Y = interpolate(frame, [96, 124], [-140, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Op = interpolate(frame, [96, 116, 124, 134], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const step1 = interpolate(frame, [95, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2 = interpolate(frame, [118, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3 = interpolate(frame, [142, 169], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaFade = interpolate(frame, [168, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const PIGGY_CX = 540;
  const PIGGY_CY = 660;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="56" fontWeight="900" fill={BLACK} letterSpacing="6">YOU CAN'T OPT OUT</text>
            <text x="540" y="255" textAnchor="middle" fontFamily={FONT}
              fontSize="70" fontWeight="900" fill={ACCENT} letterSpacing="4">BUILD AROUND IT</text>
          </g>

          {/* Piggy bank */}
          <g transform={`translate(${PIGGY_CX}, ${PIGGY_CY}) scale(${piggyScale})`}>
            {/* Body */}
            <ellipse cx="0" cy="0" rx="235" ry="198" fill={ACCENT} />
            {/* Head */}
            <circle cx="276" cy="-48" r="104" fill={ACCENT} />
            {/* Ear */}
            <ellipse cx="240" cy="-142" rx="40" ry="29" fill="#E58B00" />
            {/* Snout */}
            <ellipse cx="364" cy="-18" rx="58" ry="44" fill="#E58B00" />
            {/* Nostrils */}
            <circle cx="347" cy="-16" r="11" fill={ACCENT} opacity="0.55" />
            <circle cx="381" cy="-16" r="11" fill={ACCENT} opacity="0.55" />
            {/* Eye */}
            <circle cx="288" cy="-98" r="15" fill={BLACK} />
            <circle cx="293" cy="-104" r="5" fill={WHITE} />
            {/* Coin slot */}
            <rect x="-28" y="-198" width="56" height="16" rx="7" fill={BLACK} opacity="0.58" />
            {/* Legs */}
            <rect x="-168" y="170" width="58" height="88" rx="20" fill="#E58B00" />
            <rect x="-75" y="170" width="58" height="88" rx="20" fill="#E58B00" />
            <rect x="38" y="170" width="58" height="88" rx="20" fill="#E58B00" />
            <rect x="132" y="170" width="58" height="88" rx="20" fill="#E58B00" />
            {/* Tail */}
            <path d="M -235 -28 Q -308 -94 -275 -168 Q -242 -240 -190 -205"
              fill="none" stroke="#E58B00" strokeWidth="24" strokeLinecap="round" />
          </g>

          {/* Coins dropping into slot */}
          <g transform={`translate(${PIGGY_CX}, ${PIGGY_CY - 198})`}>
            <g transform={`translate(0, ${coin1Y})`} opacity={coin1Op}>
              <circle r="32" fill="#F59E0B" stroke={BLACK} strokeWidth="4" />
              <text textAnchor="middle" y="11" fontFamily="Arial, sans-serif"
                fontSize="28" fontWeight="900" fill={BLACK}>$</text>
            </g>
            <g transform={`translate(-18, ${coin2Y - 44})`} opacity={coin2Op}>
              <circle r="27" fill="#F59E0B" stroke={BLACK} strokeWidth="4" />
              <text textAnchor="middle" y="9" fontFamily="Arial, sans-serif"
                fontSize="22" fontWeight="900" fill={BLACK}>$</text>
            </g>
            <g transform={`translate(18, ${coin3Y - 88})`} opacity={coin3Op}>
              <circle r="24" fill="#F59E0B" stroke={BLACK} strokeWidth="4" />
              <text textAnchor="middle" y="8" fontFamily="Arial, sans-serif"
                fontSize="20" fontWeight="900" fill={BLACK}>$</text>
            </g>
          </g>

          {/* Steps */}
          <g opacity={step1}>
            <rect x="80" y="1062" width="920" height="104" rx="18" fill={BLACK} opacity="0.06" />
            <rect x="80" y="1062" width="8" height="104" rx="4" fill={ACCENT} />
            <text x="145" y="1124" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={BLACK}>MAX YOUR 401(K)</text>
          </g>
          <g opacity={step2}>
            <rect x="80" y="1192" width="920" height="104" rx="18" fill={BLACK} opacity="0.06" />
            <rect x="80" y="1192" width="8" height="104" rx="4" fill={ACCENT} />
            <text x="145" y="1254" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={BLACK}>STACK YOUR HSA</text>
          </g>
          <g opacity={step3}>
            <rect x="80" y="1322" width="920" height="104" rx="18" fill={BLACK} opacity="0.06" />
            <rect x="80" y="1322" width="8" height="104" rx="4" fill={ACCENT} />
            <text x="145" y="1384" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={BLACK}>BUILD YOUR OWN NET</text>
          </g>

          {/* CTA */}
          <g opacity={ctaFade}>
            <rect x="80" y="1502" width="920" height="134" rx="26" fill={ACCENT} />
            <text x="540" y="1582" textAnchor="middle" fontFamily={FONT}
              fontSize="60" fontWeight="900" fill={BLACK} letterSpacing="4">FOLLOW FOR MORE</text>
          </g>
          <g opacity={ctaFade}>
            <text x="540" y="1710" textAnchor="middle" fontFamily={FONT}
              fontSize="38" fontWeight="700" fill={BLACK} letterSpacing="2">MONEY FACTS LIKE THIS</text>
          </g>
        </svg>
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
