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

// ─── Scene 6 — Add Friction Back (CTA)
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const shieldSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const shieldScale = interpolate(shieldSpring, [0, 1], [0, 1]);

  const check1 = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2 = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const savedSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 80 } });
  const savedScale = interpolate(savedSpring, [0, 1], [0, 1]);

  const ctaFade = interpolate(frame, [158, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="148" textAnchor="middle" fontFamily={FONT}
              fontSize="64" fontWeight="900" fill={BLACK} letterSpacing="8">ADD FRICTION</text>
            <text x="540" y="252" textAnchor="middle" fontFamily={FONT}
              fontSize="64" fontWeight="900" fill={ACCENT} letterSpacing="6">BACK YOURSELF</text>
          </g>

          {/* Person + shield scales in from center */}
          <g transform={`translate(540, 560) scale(${shieldScale})`}>
            {/* Head */}
            <circle cx="0" cy="-175" r="78" fill={BLACK} />
            {/* Body */}
            <rect x="-110" y="-90" width="220" height="250" rx="28" fill={BLACK} />
            {/* Left arm */}
            <rect x="-230" y="-70" width="120" height="44" rx="22" fill={BLACK} />
            {/* Right arm — extended toward shield */}
            <rect x="110" y="-70" width="170" height="44" rx="22" fill={BLACK} />

            {/* Shield held by right arm */}
            <g transform="translate(310, -80)">
              {/* Shield shape */}
              <path d="M 0 -105 L 85 -62 L 85 55 Q 85 100 0 120 Q -85 100 -85 55 L -85 -62 Z"
                fill={ACCENT} stroke={BLACK} strokeWidth="7" />
              {/* NO symbol */}
              <text textAnchor="middle" y="-10" fontFamily={FONT}
                fontSize="38" fontWeight="900" fill={BLACK}>NO</text>
              <text textAnchor="middle" y="36" fontFamily={FONT}
                fontSize="38" fontWeight="900" fill={BLACK}>BUY</text>
            </g>
          </g>

          {/* Checklist item 1 */}
          <g opacity={check1}>
            <rect x="80" y="880" width="920" height="108" rx="18" fill={BLACK} opacity="0.07" />
            <circle cx="138" cy="934" r="30" fill={ACCENT} />
            <text x="138" y="944" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fontWeight="900" fill={BLACK}>✓</text>
            <text x="195" y="940" fontFamily={FONT} fontSize="34" fontWeight="700" fill={BLACK}>
              DELETE SAVED PAYMENT INFO
            </text>
          </g>

          {/* Checklist item 2 */}
          <g opacity={check2}>
            <rect x="80" y="1008" width="920" height="108" rx="18" fill={BLACK} opacity="0.07" />
            <circle cx="138" cy="1062" r="30" fill={ACCENT} />
            <text x="138" y="1072" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fontWeight="900" fill={BLACK}>✓</text>
            <text x="195" y="1068" fontFamily={FONT} fontSize="34" fontWeight="700" fill={BLACK}>
              24-HOUR WISH LIST RULE
            </text>
          </g>

          {/* $1,300 SAVED badge scales in */}
          <g transform={`translate(540, 1270) scale(${savedScale})`}>
            <rect x="-400" y="-75" width="800" height="150" rx="28" fill={ACCENT} />
            <text textAnchor="middle" y="22" fontFamily={FONT}
              fontSize="82" fontWeight="900" fill={BLACK} letterSpacing="4">$1,300 SAVED</text>
          </g>

          {/* CTA */}
          <g opacity={ctaFade}>
            <text x="540" y="1510" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">FOLLOW FOR MORE</text>
            <text x="540" y="1600" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={ACCENT} letterSpacing="4">MONEY TRICKS LIKE THIS</text>
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

// ─── Scene 4 — Cancellation Maze Trap
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const app1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const app2 = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 100 } });
  const app3 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });

  const lockFade = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade = interpolate(frame, [95, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctCount = interpolate(frame, [105, 175], [0, 68], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const appData = [
    { cx: 200, label: 'N', bg: '#E50914' },
    { cx: 540, label: 'A', bg: '#FF9900' },
    { cx: 880, label: 'D', bg: '#FF3008' },
  ];
  const appSprings = [app1, app2, app3];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="150" textAnchor="middle" fontFamily={FONT}
              fontSize="60" fontWeight="900" fill={BLACK} letterSpacing="8">CANCELLATION</text>
            <text x="540" y="258" textAnchor="middle" fontFamily={FONT}
              fontSize="68" fontWeight="900" fill={ACCENT} letterSpacing="6">MAZE TRAP</text>
          </g>

          {/* App icons */}
          {appData.map((app, i) => (
            <g key={i} transform={`translate(${app.cx}, 520) scale(${appSprings[i]})`}>
              <circle r="110" fill={app.bg} />
              <text textAnchor="middle" y="38" fontFamily={FONT}
                fontSize="88" fontWeight="900" fill={WHITE}>{app.label}</text>
            </g>
          ))}

          {/* Padlock overlays on each app icon */}
          {appData.map((app, i) => (
            <g key={`lk${i}`} opacity={lockFade} transform={`translate(${app.cx}, 520)`}>
              {/* Dark circle overlay */}
              <circle r="50" fill={BLACK} opacity="0.75" />
              {/* Padlock body */}
              <rect x="-20" y="4" width="40" height="34" rx="5" fill={WHITE} />
              {/* Padlock shackle */}
              <path d="M -10 6 L -10 -12 Q -10 -30 0 -30 Q 10 -30 10 -12 L 10 6"
                fill="none" stroke={WHITE} strokeWidth="8" strokeLinecap="round" />
              {/* Keyhole */}
              <circle cx="0" cy="17" r="6" fill={BLACK} />
              <rect x="-3" y="17" width="6" height="10" rx="2" fill={BLACK} />
            </g>
          ))}

          {/* Main stat */}
          <g opacity={statFade}>
            <text x="540" y="790" textAnchor="middle" fontFamily={FONT}
              fontSize="42" fontWeight="700" fill={BLACK} letterSpacing="4">HARD TO CANCEL MEANS</text>
            <text x="540" y="1020" textAnchor="middle" fontFamily={FONT}
              fontSize="216" fontWeight="900" fill={ACCENT}>{Math.floor(pctCount)}%</text>
            <text x="540" y="1110" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={BLACK} letterSpacing="4">PAY 3 EXTRA MONTHS</text>
          </g>

          {/* Calendar — 3 unintended months */}
          <g opacity={statFade}>
            <g transform="translate(270, 1220)">
              <rect x="0" y="0" width="150" height="150" rx="18" fill={ACCENT} opacity="0.9" />
              <text x="75" y="90" textAnchor="middle" fontFamily={FONT}
                fontSize="44" fontWeight="900" fill={BLACK}>M1</text>

              <rect x="170" y="0" width="150" height="150" rx="18" fill={ACCENT} opacity="0.9" />
              <text x="245" y="90" textAnchor="middle" fontFamily={FONT}
                fontSize="44" fontWeight="900" fill={BLACK}>M2</text>

              <rect x="340" y="0" width="150" height="150" rx="18" fill={ACCENT} opacity="0.9" />
              <text x="415" y="90" textAnchor="middle" fontFamily={FONT}
                fontSize="44" fontWeight="900" fill={BLACK}>M3</text>
            </g>
            <text x="540" y="1510" textAnchor="middle" fontFamily={FONT}
              fontSize="38" fontWeight="700" fill={BLACK} letterSpacing="2">NEVER INTENDED TO PAY</text>
          </g>

          <g opacity={statFade}>
            <text x="540" y="1730" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="32" fill={BLACK} opacity="0.55">Netflix · Amazon · DoorDash all do this</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5 — Your Annual Total
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const personY = interpolate(personSpring, [0, 1], [-280, 0]);
  const personOp = interpolate(personSpring, [0, 1], [0, 1]);

  const purchaseCount = interpolate(frame, [45, 135], [0, 246], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade1 = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dollarCount = interpolate(frame, [135, 205], [0, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade2 = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const walletOp = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyFly = interpolate(frame, [45, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="155" textAnchor="middle" fontFamily={FONT}
              fontSize="64" fontWeight="900" fill={WHITE} letterSpacing="8">YOUR ANNUAL</text>
            <text x="540" y="265" textAnchor="middle" fontFamily={FONT}
              fontSize="72" fontWeight="900" fill={ACCENT} letterSpacing="6">TOTAL</text>
          </g>

          {/* Person silhouette drops in from top */}
          <g transform={`translate(270, ${personY})`} opacity={personOp}>
            {/* Head */}
            <circle cx="0" cy="420" r="80" fill={WHITE} opacity="0.9" />
            {/* Body */}
            <rect x="-100" y="510" width="200" height="260" rx="28" fill={WHITE} opacity="0.9" />
            {/* Left arm */}
            <rect x="-210" y="530" width="110" height="44" rx="22" fill={WHITE} opacity="0.9" />
            {/* Right arm */}
            <rect x="100" y="530" width="110" height="44" rx="22" fill={WHITE} opacity="0.9" />
          </g>

          {/* Wallet being drained */}
          <g transform="translate(630, 560)" opacity={walletOp}>
            {/* Wallet body */}
            <rect x="0" y="0" width="230" height="160" rx="16" fill={ACCENT} />
            {/* Wallet top flap */}
            <rect x="0" y="0" width="230" height="40" rx="16" fill="#E58B00" />
            {/* Card slot */}
            <rect x="22" y="60" width="186" height="40" rx="8" fill="#E58B00" />
            {/* Dollar */}
            <text x="115" y="132" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="40" fontWeight="900" fill={BLACK}>$</text>

            {/* Money coins flying out */}
            {Array.from({ length: Math.max(0, Math.floor(3)) }).map((_, i) => {
              const angles = [-35, -10, 20];
              const rad = (angles[i] * Math.PI) / 180;
              const dist = moneyFly * 160;
              const cx = Math.cos(rad) * dist + 115;
              const cy = -Math.sin(rad) * dist + 80;
              return (
                <g key={i} transform={`translate(${cx}, ${cy})`}
                  opacity={Math.max(0, 1 - moneyFly * 1.3)}>
                  <circle r="24" fill={ACCENT} stroke={BLACK} strokeWidth="3" />
                  <text textAnchor="middle" y="8" fontFamily="Arial, sans-serif"
                    fontSize="22" fontWeight="900" fill={BLACK}>$</text>
                </g>
              );
            })}
          </g>

          {/* Purchase counter */}
          <g opacity={statFade1}>
            <text x="540" y="1060" textAnchor="middle" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={WHITE} letterSpacing="4">IMPULSE PURCHASES / YEAR</text>
            <text x="540" y="1230" textAnchor="middle" fontFamily={FONT}
              fontSize="200" fontWeight="900" fill={WHITE}>{Math.floor(purchaseCount)}</text>
          </g>

          {/* Dollar total counter */}
          <g opacity={statFade2}>
            <text x="540" y="1430" textAnchor="middle" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={WHITE} letterSpacing="4">TOTAL DRAINED</text>
            <text x="540" y="1640" textAnchor="middle" fontFamily={FONT}
              fontSize="176" fontWeight="900" fill={ACCENT}>
              ${Math.floor(dollarCount) >= 1000
                ? `${Math.floor(Math.floor(dollarCount) / 1000)},${String(Math.floor(dollarCount) % 1000).padStart(3, '0')}`
                : String(Math.floor(dollarCount))}
            </text>
            <text x="540" y="1740" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="32" fill={WHITE} opacity="0.65">246 purchases × 12% overspend = $1,300</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2 — Fewer Steps = More Spending
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const step1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const step2 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 100 } });
  const step3 = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 14, stiffness: 100 } });

  const x1Draw = interpolate(frame, [80, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x2Draw = interpolate(frame, [96, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barFade = interpolate(frame, [108, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [115, 165], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [125, 175], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [135, 185], [0, 290], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="155" textAnchor="middle" fontFamily={FONT}
              fontSize="68" fontWeight="900" fill={BLACK} letterSpacing="8">FEWER STEPS</text>
            <text x="540" y="260" textAnchor="middle" fontFamily={FONT}
              fontSize="60" fontWeight="900" fill={ACCENT} letterSpacing="6">= MORE SPENDING</text>
          </g>

          {/* Step 1 */}
          <g opacity={step1}>
            <rect x="80" y="350" width="920" height="110" rx="18" fill={BLACK} opacity="0.07" />
            <text x="180" y="418" fontFamily={FONT} fontSize="42" fontWeight="700" fill={BLACK}>1. ADD TO CART</text>
          </g>
          {/* Step 2 */}
          <g opacity={step2}>
            <rect x="80" y="485" width="920" height="110" rx="18" fill={BLACK} opacity="0.07" />
            <text x="180" y="553" fontFamily={FONT} fontSize="42" fontWeight="700" fill={BLACK}>2. SHIPPING INFO</text>
          </g>
          {/* Step 3 */}
          <g opacity={step3}>
            <rect x="80" y="620" width="920" height="110" rx="18" fill={BLACK} opacity="0.07" />
            <text x="180" y="688" fontFamily={FONT} fontSize="42" fontWeight="700" fill={BLACK}>3. PAYMENT</text>
          </g>

          {/* X through step 1 */}
          <g opacity={x1Draw}>
            <line x1="90" y1="358" x2="990" y2="452" stroke="#EF4444" strokeWidth="11" strokeLinecap="round" />
            <line x1="990" y1="358" x2="90" y2="452" stroke="#EF4444" strokeWidth="11" strokeLinecap="round" />
          </g>

          {/* X through step 2 */}
          <g opacity={x2Draw}>
            <line x1="90" y1="493" x2="990" y2="587" stroke="#EF4444" strokeWidth="11" strokeLinecap="round" />
            <line x1="990" y1="493" x2="90" y2="587" stroke="#EF4444" strokeWidth="11" strokeLinecap="round" />
          </g>

          {/* Arrow down to 1-click */}
          <g opacity={x2Draw}>
            <line x1="540" y1="760" x2="540" y2="840" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
            <path d="M 490 820 L 540 875 L 590 820" fill="none" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="240" y="895" width="600" height="110" rx="24" fill={ACCENT} />
            <text x="540" y="965" textAnchor="middle" fontFamily={FONT}
              fontSize="60" fontWeight="900" fill={BLACK} letterSpacing="4">1-CLICK</text>
          </g>

          {/* Bar chart */}
          <g opacity={barFade}>
            <text x="540" y="1130" textAnchor="middle" fontFamily={FONT}
              fontSize="40" fontWeight="700" fill={BLACK} letterSpacing="4">SPENDING INCREASE</text>
            {/* Bar 1: 3 steps */}
            <rect x="155" y={1470 - bar1H} width="190" height={bar1H} rx="10" fill={BLACK} opacity="0.25" />
            <text x="250" y="1500" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fill={BLACK}>3 steps</text>
            {/* Bar 2: 2 steps */}
            <rect x="395" y={1470 - bar2H} width="190" height={bar2H} rx="10" fill={BLACK} opacity="0.45" />
            <text x="490" y="1500" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fill={BLACK}>2 steps</text>
            {/* Bar 3: 1-click */}
            <rect x="635" y={1470 - bar3H} width="190" height={bar3H} rx="10" fill={ACCENT} />
            <text x="730" y="1500" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fill={BLACK}>1-click</text>
            {/* Percent label above bar3 */}
            <text x="730" y={1470 - bar3H - 18} textAnchor="middle" fontFamily={FONT}
              fontSize="48" fontWeight="900" fill={ACCENT}>+15%</text>
          </g>

          <g opacity={barFade}>
            <text x="540" y="1720" textAnchor="middle" fontFamily={FONT}
              fontSize="34" fontWeight="700" fill={BLACK} letterSpacing="2">1 EXTRA STEP = 15% LESS IMPULSE BUYING</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3 — The Button Size Trick
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const confirmSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const confirmScale = interpolate(confirmSpring, [0, 1], [0, 1]);

  const cancelFade = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statFade = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <g opacity={titleFade}>
            <text x="540" y="165" textAnchor="middle" fontFamily={FONT}
              fontSize="60" fontWeight="900" fill={WHITE} letterSpacing="8">THE BUTTON</text>
            <text x="540" y="270" textAnchor="middle" fontFamily={FONT}
              fontSize="64" fontWeight="900" fill={ACCENT} letterSpacing="6">SIZE TRICK</text>
          </g>

          {/* Large CONFIRM ORDER button scales in */}
          <g transform={`translate(540, 750) scale(${confirmScale})`}>
            <rect x="-440" y="-140" width="880" height="280" rx="32" fill={ACCENT} />
            <text textAnchor="middle" y="22" fontFamily={FONT}
              fontSize="84" fontWeight="900" fill={BLACK} letterSpacing="4">CONFIRM ORDER</text>
          </g>

          {/* Big label */}
          <g opacity={cancelFade}>
            <text x="540" y="540" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={WHITE} opacity="0.65">↕ 280px tall · Bright amber · Center screen</text>
          </g>

          {/* Tiny "cancel" */}
          <g opacity={cancelFade}>
            <text x="540" y="990" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="38" fill="#444">cancel</text>
            <text x="540" y="1055" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="30" fill="#555">↕ 38px · Gray · Below fold</text>
          </g>

          {/* Divider */}
          <g opacity={statFade}>
            <rect x="80" y="1140" width="920" height="3" rx="2" fill={ACCENT} opacity="0.35" />
          </g>

          {/* Stat */}
          <g opacity={statFade}>
            <text x="540" y="1250" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">THIS DESIGN BOOSTS</text>
            <text x="540" y="1460" textAnchor="middle" fontFamily={FONT}
              fontSize="188" fontWeight="900" fill={ACCENT}>35%</text>
            <text x="540" y="1555" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">MORE CHECKOUTS</text>
            <text x="540" y="1680" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={WHITE} opacity="0.55">it's not an accident</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1 — The $1,300 Button
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const btnY = interpolate(btnSpring, [0, 1], [600, 0]);

  const textFade = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctVal = interpolate(frame, [60, 155], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinOpacity = interpolate(frame, [15, 50, 95, 130], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1x = interpolate(frame, [15, 95], [540, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1y = interpolate(frame, [15, 95], [960, 660], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2x = interpolate(frame, [20, 100], [540, 540], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2y = interpolate(frame, [20, 100], [960, 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3x = interpolate(frame, [25, 105], [540, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3y = interpolate(frame, [25, 105], [960, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          {/* Subtle grid texture */}
          {Array.from({ length: Math.max(0, Math.floor(9)) }).map((_, i) => (
            <line key={i} x1="0" y1={i * 240} x2="1080" y2={i * 240}
              stroke={ACCENT} strokeWidth="0.5" opacity="0.08" />
          ))}

          {/* Headlines */}
          <g opacity={textFade}>
            <text x="540" y="220" textAnchor="middle" fontFamily={FONT}
              fontSize="76" fontWeight="900" fill={WHITE} letterSpacing="12">THE</text>
            <text x="540" y="370" textAnchor="middle" fontFamily={FONT}
              fontSize="128" fontWeight="900" fill={ACCENT} letterSpacing="8">$1,300</text>
            <text x="540" y="490" textAnchor="middle" fontFamily={FONT}
              fontSize="80" fontWeight="900" fill={WHITE} letterSpacing="12">BUTTON</text>
          </g>

          {/* BUY NOW button springs in from below */}
          <g transform={`translate(0, ${btnY})`}>
            <rect x="140" y="860" width="800" height="180" rx="32" fill={ACCENT} />
            <text x="540" y="968" textAnchor="middle" fontFamily={FONT}
              fontSize="88" fontWeight="900" fill={BLACK} letterSpacing="6">BUY NOW</text>
          </g>

          {/* Coins flying from button */}
          <g opacity={coinOpacity}>
            <g transform={`translate(${c1x}, ${c1y})`}>
              <circle r="42" fill={ACCENT} stroke={BLACK} strokeWidth="5" />
              <text textAnchor="middle" y="15" fontFamily="Arial, sans-serif"
                fontSize="38" fontWeight="900" fill={BLACK}>$</text>
            </g>
            <g transform={`translate(${c2x}, ${c2y})`}>
              <circle r="42" fill={ACCENT} stroke={BLACK} strokeWidth="5" />
              <text textAnchor="middle" y="15" fontFamily="Arial, sans-serif"
                fontSize="38" fontWeight="900" fill={BLACK}>$</text>
            </g>
            <g transform={`translate(${c3x}, ${c3y})`}>
              <circle r="42" fill={ACCENT} stroke={BLACK} strokeWidth="5" />
              <text textAnchor="middle" y="15" fontFamily="Arial, sans-serif"
                fontSize="38" fontWeight="900" fill={BLACK}>$</text>
            </g>
          </g>

          {/* Per-step stat */}
          <g opacity={textFade}>
            <text x="540" y="1175" textAnchor="middle" fontFamily={FONT}
              fontSize="46" fontWeight="700" fill={WHITE} letterSpacing="4">EACH STEP REMOVED =</text>
            <text x="540" y="1380" textAnchor="middle" fontFamily={FONT}
              fontSize="192" fontWeight="900" fill={ACCENT}>{Math.floor(pctVal)}%</text>
            <text x="540" y="1465" textAnchor="middle" fontFamily={FONT}
              fontSize="54" fontWeight="700" fill={WHITE} letterSpacing="4">MORE SPENT</text>
          </g>

          {/* Bottom note */}
          <g opacity={textFade}>
            <text x="540" y="1770" textAnchor="middle" fontFamily="Arial, sans-serif"
              fontSize="34" fill={WHITE} opacity="0.5">Amazon defended this patent for 20 years</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};
