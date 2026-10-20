import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const arcPolyline = (cx: number, cy: number, r: number, a1: number, a2: number): string => {
  const pts: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    const angle = a1 + (a2 - a1) * t;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy - r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(' ');
};

const gaugeZones: Array<{ a1: number; a2: number; color: string }> = [
  { a1: Math.PI, a2: 0.8 * Math.PI, color: '#EF4444' },
  { a1: 0.8 * Math.PI, a2: 0.6 * Math.PI, color: '#F97316' },
  { a1: 0.6 * Math.PI, a2: 0.4 * Math.PI, color: '#F59E0B' },
  { a1: 0.4 * Math.PI, a2: 0.2 * Math.PI, color: '#10B981' },
  { a1: 0.2 * Math.PI, a2: 0, color: '#22C55E' },
];

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 540;
  const cy = 1060;
  const r = 370;

  const needleSpring = spring({ frame, fps, config: { damping: 18, stiffness: 50 }, durationInFrames: 110 });
  const needleAngle = interpolate(needleSpring, [0, 1], [Math.PI, Math.PI * 0.6]);
  const nx = (cx + 315 * Math.cos(needleAngle)).toFixed(1);
  const ny = (cy - 315 * Math.sin(needleAngle)).toFixed(1);

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="230" textAnchor="middle" fontFamily={FONT} fontSize="82" fill={WHITE} opacity={fade(4)} letterSpacing="4">CREDIT SCORE</text>
          <text x="540" y="330" textAnchor="middle" fontFamily={FONT} fontSize="60" fill={ACCENT} opacity={fade(8)} letterSpacing="2">SECRETLY SETS</text>
          <text x="540" y="420" textAnchor="middle" fontFamily={FONT} fontSize="60" fill={WHITE} opacity={fade(12)} letterSpacing="2">YOUR INSURANCE</text>

          {gaugeZones.map(({ a1, a2, color }) => (
            <polyline key={color} points={arcPolyline(cx, cy, r, a1, a2)} stroke={color} strokeWidth="54" fill="none" strokeLinecap="round" />
          ))}

          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={WHITE} strokeWidth="10" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="22" fill={WHITE} />

          <text x="155" y={cy + 80} textAnchor="middle" fontFamily={FONT} fontSize="38" fill="#EF4444">300</text>
          <text x="925" y={cy + 80} textAnchor="middle" fontFamily={FONT} fontSize="38" fill="#22C55E">850</text>
          <text x={cx} y={cy + 80} textAnchor="middle" fontFamily={FONT} fontSize="38" fill={WHITE} opacity={fade(75)}>520</text>
          <text x={cx} y={cy + 155} textAnchor="middle" fontFamily={FONT} fontSize="52" fill="#F97316" opacity={fade(90)}>POOR CREDIT</text>

          <rect x="290" y="1310" width="500" height="100" rx="50" fill={ACCENT} opacity={fade(100)} />
          <text x="540" y="1375" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={WHITE} opacity={fade(100)}>LEGAL IN 47 STATES</text>

          <text x="540" y="1530" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE} opacity={fade(120)}>$999/YEAR GAP</text>
          <text x="540" y="1640" textAnchor="middle" fontFamily={FONT} fontSize="40" fill={ACCENT} opacity={fade(135)}>AND IT'S COMPLETELY HIDDEN</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barSpring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 20, stiffness: 60 } });
  const poorH = Math.max(0, 400 * (1867 / 2000) * barSpring);
  const goodH = Math.max(0, 400 * (868 / 2000) * barSpring);
  const barBase = 1050;

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const amtFade = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="190" textAnchor="middle" fontFamily={FONT} fontSize="74" fill={BLACK} opacity={fade(4)}>SAME DRIVER.</text>
          <text x="540" y="290" textAnchor="middle" fontFamily={FONT} fontSize="74" fill={BLACK} opacity={fade(7)}>DIFFERENT SCORE.</text>

          <rect x="200" y="440" width="680" height="180" rx="55" fill="#444" opacity={fade(12)} />
          <rect x="310" y="280" width="460" height="185" rx="35" fill="#555" opacity={fade(12)} />
          <rect x="490" y="295" width="255" height="160" rx="10" fill="#7EC8E3"
            opacity={interpolate(frame, [12, 30], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
          <rect x="315" y="295" width="160" height="160" rx="10" fill="#7EC8E3"
            opacity={interpolate(frame, [12, 30], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
          <circle cx="720" cy="630" r="85" fill="#222" opacity={fade(12)} />
          <circle cx="720" cy="630" r="45" fill="#777" opacity={fade(12)} />
          <circle cx="360" cy="630" r="85" fill="#222" opacity={fade(12)} />
          <circle cx="360" cy="630" r="45" fill="#777" opacity={fade(12)} />
          <rect x="858" y="475" width="52" height="36" rx="8" fill="#FFD700" opacity={fade(12)} />
          <rect x="170" y="475" width="52" height="36" rx="8" fill="#EF4444" opacity={fade(12)} />

          <rect x="120" y={barBase - poorH} width="330" height={poorH} rx="14" fill="#EF4444" />
          <rect x="630" y={barBase - goodH} width="330" height={goodH} rx="14" fill="#10B981" />

          <text x="285" y="1100" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={BLACK}>POOR CREDIT</text>
          <text x="795" y="1100" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={BLACK}>GREAT CREDIT</text>

          <text x="285" y={barBase - poorH - 24} textAnchor="middle" fontFamily={FONT} fontSize="58" fill="#EF4444" opacity={amtFade}>$1,867</text>
          <text x="795" y={Math.max(barBase - goodH - 24, 660)} textAnchor="middle" fontFamily={FONT} fontSize="58" fill="#10B981" opacity={amtFade}>$868</text>

          <text x="540" y="1200" textAnchor="middle" fontFamily={FONT} fontSize="36" fill="#555" opacity={fade(100)}>PER YEAR — SAME DRIVING RECORD</text>

          <rect x="265" y="1290" width="550" height="100" rx="50" fill={ACCENT} opacity={fade(110)} />
          <text x="540" y="1356" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={WHITE} opacity={fade(110)}>$999 ANNUAL GAP</text>

          <text x="540" y="1510" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={BLACK} opacity={fade(130)}>OVER TEN YEARS? NEARLY $10,000.</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barBase = 1580;
  const maxBarH = 740;

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterProgress = interpolate(frame, [40, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue = Math.floor(counterProgress * 9990);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="72" fill={WHITE} opacity={fade(3)}>10-YEAR</text>
          <text x="540" y="300" textAnchor="middle" fontFamily={FONT} fontSize="72" fill={ACCENT} opacity={fade(6)}>HIDDEN TAX</text>

          <text x="540" y="470" textAnchor="middle" fontFamily={FONT} fontSize="110" fill={ACCENT} opacity={fade(30)}>
            ${counterValue.toLocaleString()}
          </text>
          <text x="540" y="572" textAnchor="middle" fontFamily={FONT} fontSize="48" fill={WHITE} opacity={fade(30)}>QUIETLY DRAINED</text>

          {Array.from({ length: 10 }, (_, i) => {
            const bsFrame = Math.max(0, frame - i * 10);
            const bSpring = spring({ frame: bsFrame, fps, config: { damping: 20, stiffness: 70 } });
            const val = (i + 1) * 999;
            const bh = Math.max(0, maxBarH * (val / 9990) * bSpring);
            const bx = 60 + i * 98;
            return (
              <g key={i}>
                <rect x={bx} y={barBase - bh} width="72" height={Math.max(0, bh)} rx="8" fill={ACCENT} />
                <text x={bx + 36} y={barBase + 52} textAnchor="middle" fontFamily={FONT} fontSize="28" fill={WHITE}>Y{i + 1}</text>
              </g>
            );
          })}

          <line x1="50" y1={barBase} x2="1030" y2={barBase} stroke="#333" strokeWidth="3" />

          <text x="540" y="1730" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={WHITE} opacity={fade(160)}>YOUR INSURER WON'T TELL YOU THIS.</text>
          <text x="540" y="1825" textAnchor="middle" fontFamily={FONT} fontSize="36" fill={ACCENT} opacity={fade(170)}>BUT YOU CAN FIX IT IN 30 DAYS.</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personSpring = spring({ frame, fps, config: { damping: 20, stiffness: 60 } });
  const personScale = interpolate(personSpring, [0, 1], [0.5, 1]);
  const pCx = 540;
  const pCy = 780;

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 22, stiffness: 80 } });
  const statNum = Math.floor(interpolate(statSpring, [0, 1], [0, 42]));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="66" fill={BLACK} opacity={fade(4)}>CREDIT-BASED</text>
          <text x="540" y="295" textAnchor="middle" fontFamily={FONT} fontSize="66" fill={BLACK} opacity={fade(7)}>INSURANCE SCORE</text>

          <g transform={`translate(${pCx}, ${pCy}) scale(${personScale.toFixed(3)})`} opacity={fade(10)}>
            <circle cx="0" cy="-240" r="110" fill={ACCENT} />
            <ellipse cx="0" cy="60" rx="155" ry="235" fill={ACCENT} />
            <circle cx="165" cy="-345" r="82" fill="#EF4444" />
            <text x="165" y="-315" textAnchor="middle" fontFamily={FONT} fontSize="82" fill={WHITE}>?</text>
          </g>

          <text x="540" y="1240" textAnchor="middle" fontFamily={FONT} fontSize="200" fill={ACCENT} opacity={fade(45)}>{statNum}%</text>
          <text x="540" y="1385" textAnchor="middle" fontFamily={FONT} fontSize="56" fill={BLACK} opacity={fade(60)}>HAD NO IDEA</text>
          <text x="540" y="1462" textAnchor="middle" fontFamily={FONT} fontSize="38" fill="#555" opacity={fade(65)}>IT AFFECTED THEIR INSURANCE</text>

          <rect x="218" y="1560" width="644" height="100" rx="50" fill={ACCENT} opacity={fade(100)} />
          <text x="540" y="1625" textAnchor="middle" fontFamily={FONT} fontSize="42" fill={WHITE} opacity={fade(100)}>47 STATES — IT'S ALL LEGAL</text>

          <text x="540" y="1785" textAnchor="middle" fontFamily={FONT} fontSize="40" fill={BLACK} opacity={fade(130)}>BUT HERE'S HOW YOU FIX IT...</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const utilProgress = interpolate(frame, [50, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const utilizationPct = interpolate(utilProgress, [0, 1], [0.8, 0.1]);
  const barMaxW = 840;
  const barFillW = Math.max(0, barMaxW * utilizationPct);

  const colorProg = interpolate(utilizationPct, [0.1, 0.8], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rVal = Math.floor(interpolate(colorProg, [0, 1], [16, 239]));
  const gVal = Math.floor(interpolate(colorProg, [0, 1], [185, 68]));
  const bVal = Math.floor(interpolate(colorProg, [0, 1], [129, 68]));
  const barColor = `rgb(${rVal},${gVal},${bVal})`;
  const pctDisplay = Math.round(utilizationPct * 100);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="68" fill={WHITE} opacity={fade(4)}>THE FIX IS SIMPLE.</text>
          <text x="540" y="295" textAnchor="middle" fontFamily={FONT} fontSize="68" fill={ACCENT} opacity={fade(7)}>LOWER UTILIZATION.</text>

          <rect x="80" y="380" width="920" height="580" rx="50" fill="#1E3A5F" opacity={fade(12)} />
          <rect x="80" y="480" width="920" height="80" fill="#142840" opacity={fade(12)} />
          <rect x="130" y="600" width="90" height="70" rx="10" fill="#C0A960" opacity={fade(15)} />
          <rect x="148" y="600" width="12" height="70" fill="#A08840" opacity={fade(15)} />
          <rect x="130" y="620" width="90" height="12" fill="#A08840" opacity={fade(15)} />
          <text x="140" y="770" fontFamily="monospace" fontSize="52" fill={WHITE} opacity={fade(18)} letterSpacing="4">&#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; 4721</text>
          <text x="140" y="870" fontFamily={FONT} fontSize="38" fill={WHITE} opacity={fade(20)} letterSpacing="2">CARDHOLDER</text>
          <text x="820" y="870" fontFamily={FONT} fontSize="38" fill={WHITE} opacity={fade(20)}>10/28</text>

          <text x="540" y="1090" textAnchor="middle" fontFamily={FONT} fontSize="52" fill={WHITE} opacity={fade(35)}>YOUR UTILIZATION</text>

          <rect x="120" y="1130" width={barMaxW} height="80" rx="40" fill="#333" opacity={fade(40)} />
          <rect x="120" y="1130" width={barFillW} height="80" rx="40" fill={barColor} />

          <text x="540" y="1290" textAnchor="middle" fontFamily={FONT} fontSize="90" fill={barColor} opacity={fade(40)}>{pctDisplay}%</text>

          <text x="120" y="1385" fontFamily={FONT} fontSize="36" fill="#EF4444" opacity={fade(50)}>80% = HIGH RISK</text>
          <text x="960" y="1385" textAnchor="end" fontFamily={FONT} fontSize="36" fill="#10B981" opacity={fade(170)}>10% = SWEET SPOT</text>

          <text x="540" y="1490" textAnchor="middle" fontFamily={FONT} fontSize="70" fill={ACCENT} opacity={fade(60)}>&#x2193;</text>

          <text x="540" y="1620" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={WHITE} opacity={fade(100)}>SCORE MOVES UP IN 30 DAYS</text>
          <text x="540" y="1720" textAnchor="middle" fontFamily={FONT} fontSize="44" fill={ACCENT} opacity={fade(110)}>NEW RATE ON NEXT RENEWAL</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade = (s: number) =>
    interpolate(frame, [s, s + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinY = interpolate(frame, [30, 72], [560, 642], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const coinOpacity = interpolate(frame, [28, 35, 70, 77], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterSpring = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 25, stiffness: 60 } });
  const counterVal = Math.floor(interpolate(counterSpring, [0, 1], [0, 503]));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <text x="540" y="200" textAnchor="middle" fontFamily={FONT} fontSize="68" fill={BLACK} opacity={fade(3)}>MOVE ONE TIER.</text>
          <text x="540" y="295" textAnchor="middle" fontFamily={FONT} fontSize="68" fill={BLACK} opacity={fade(6)}>SAVE THIS MUCH.</text>

          <ellipse cx="520" cy="790" rx="280" ry="240" fill="#F59E0B" opacity={fade(12)} />
          <circle cx="770" cy="700" r="130" fill="#F59E0B" opacity={fade(12)} />
          <circle cx="750" cy="578" r="48" fill="#E8970A" opacity={fade(12)} />
          <circle cx="800" cy="650" r="16" fill="#1A1A1A" opacity={fade(12)} />
          <ellipse cx="880" cy="738" rx="58" ry="44" fill="#E8970A" opacity={fade(12)} />
          <circle cx="862" cy="738" r="11" fill="#92400E" opacity={fade(12)} />
          <circle cx="898" cy="738" r="11" fill="#92400E" opacity={fade(12)} />
          <rect x="470" y="550" width="100" height="14" rx="7" fill="#92400E" opacity={fade(12)} />
          <rect x="330" y="1000" width="80" height="130" rx="22" fill="#E8970A" opacity={fade(12)} />
          <rect x="450" y="1000" width="80" height="130" rx="22" fill="#E8970A" opacity={fade(12)} />
          <rect x="600" y="1000" width="80" height="130" rx="22" fill="#E8970A" opacity={fade(12)} />
          <rect x="720" y="1000" width="80" height="130" rx="22" fill="#E8970A" opacity={fade(12)} />
          <path d="M 240 770 Q 198 728 218 686 Q 238 644 208 622" stroke="#E8970A" strokeWidth="18" fill="none" strokeLinecap="round" opacity={fade(12)} />

          <ellipse cx="520" cy={coinY} rx="32" ry="18" fill="#FFD700" opacity={coinOpacity} />

          <text x="540" y="1270" textAnchor="middle" fontFamily={FONT} fontSize="130" fill={ACCENT} opacity={fade(55)}>${counterVal}</text>
          <text x="540" y="1375" textAnchor="middle" fontFamily={FONT} fontSize="50" fill={BLACK} opacity={fade(55)}>PER YEAR IN SAVINGS</text>

          <rect x="90" y="1480" width="900" height="110" rx="55" fill={BLACK} opacity={fade(110)} />
          <text x="540" y="1548" textAnchor="middle" fontFamily={FONT} fontSize="40" fill={WHITE} opacity={fade(110)}>CHECK YOUR UTILIZATION TONIGHT</text>

          <text x="540" y="1690" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={BLACK} opacity={fade(130)}>YOUR RENEWAL IS WAITING ON THIS.</text>
          <text x="540" y="1790" textAnchor="middle" fontFamily={FONT} fontSize="38" fill={ACCENT} opacity={fade(140)}>FOLLOW FOR MORE MONEY MOVES.</text>
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
