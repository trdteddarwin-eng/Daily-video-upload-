import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const ACCENT_GREEN = '#10B981';
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

// SVG House
const HouseSVG: React.FC<{ scale?: number; strokeColor?: string; fillColor?: string }> = ({
  scale = 1,
  strokeColor = WHITE,
  fillColor = 'none',
}) => (
  <svg width={200 * scale} height={180 * scale} viewBox="0 0 200 180">
    {/* Roof */}
    <polygon
      points="100,10 190,90 10,90"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="8"
      strokeLinejoin="round"
    />
    {/* Body */}
    <rect
      x="25" y="90" width="150" height="80"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="8"
    />
    {/* Door */}
    <rect x="80" y="120" width="40" height="50" fill={strokeColor} opacity={0.6} />
    {/* Window left */}
    <rect x="35" y="100" width="30" height="25" fill="none" stroke={strokeColor} strokeWidth="5" />
    {/* Window right */}
    <rect x="135" y="100" width="30" height="25" fill="none" stroke={strokeColor} strokeWidth="5" />
  </svg>
);

// SVG Document Card
const DocumentCard: React.FC<{
  label: string;
  labelColor: string;
  icon: React.ReactNode;
  bg: string;
  borderColor: string;
}> = ({ label, labelColor, icon, bg, borderColor }) => (
  <div style={{
    width: 280,
    height: 340,
    background: bg,
    border: `6px solid ${borderColor}`,
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 24,
  }}>
    {icon}
    <div style={{
      fontFamily: FONT,
      fontSize: 52,
      color: labelColor,
      fontWeight: 900,
      letterSpacing: '0.1em',
      textAlign: 'center',
    }}>{label}</div>
    <div style={{
      fontFamily: FONT,
      fontSize: 22,
      color: labelColor === ACCENT ? '#888' : '#444',
      textAlign: 'center',
      lineHeight: 1.3,
    }}>
      {label === 'ACV' ? 'Actual Cash\nValue' : 'Replacement\nCost Value'}
    </div>
  </div>
);

// SVG Warning Triangle
const WarningSVG: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg width={80 * scale} height={72 * scale} viewBox="0 0 80 72">
    <polygon
      points="40,4 76,68 4,68"
      fill={ACCENT}
      stroke={ACCENT}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <text
      x="40" y="56"
      textAnchor="middle"
      fontSize="36"
      fontWeight="900"
      fill={WHITE}
      fontFamily="Arial Black, sans-serif"
    >!</text>
  </svg>
);

// SVG X mark
const XMark: React.FC = () => (
  <svg width={60} height={60} viewBox="0 0 60 60">
    <line x1="10" y1="10" x2="50" y2="50" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
    <line x1="50" y1="10" x2="10" y2="50" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// SVG checkmark
const CheckMark: React.FC = () => (
  <svg width={60} height={60} viewBox="0 0 60 60">
    <polyline
      points="8,32 24,48 52,14"
      fill="none"
      stroke={ACCENT_GREEN}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Scene 1: Hook — dark bg, house + warning, "60% UNDERINSURED"
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseY = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const houseTranslate = interpolate(houseY, [0, 1], [80, 0]);

  const barW = interpolate(frame, [20, 90], [0, 540], { extrapolateRight: 'clamp' });

  const warnScale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 10, stiffness: 180 } });

  const pct = Math.round(interpolate(frame, [30, 110], [0, 60], { extrapolateRight: 'clamp' }));

  const subtitleOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        {/* Red accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: barW,
          height: 8,
          background: ACCENT,
        }} />

        {/* House + Warning */}
        <div style={{
          transform: `translateY(${houseTranslate}px)`,
          position: 'relative',
          marginBottom: 32,
          marginTop: 80,
        }}>
          <HouseSVG scale={1.6} strokeColor={WHITE} />
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            transform: `scale(${warnScale})`,
          }}>
            <WarningSVG scale={1.3} />
          </div>
        </div>

        {/* 60% counter */}
        <div style={{ ...headline(120, ACCENT), lineHeight: 1, marginBottom: 4 }}>
          {pct}%
        </div>
        <div style={{ ...headline(38, WHITE), letterSpacing: '0.1em', marginBottom: 32 }}>
          OF HOMES UNDERINSURED
        </div>

        {/* subtitle */}
        <div style={{
          fontFamily: FONT,
          fontSize: 34,
          color: WHITE,
          opacity: subtitleOpacity,
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.4,
          padding: '0 60px',
          fontWeight: 'normal',
        }}>
          Your policy has a hidden word that changes everything.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: ACV vs RCV side by side cards — light bg
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftCard = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 100 } });
  const rightCard = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 100 } });

  const leftX = interpolate(leftCard, [0, 1], [-400, 0]);
  const rightX = interpolate(rightCard, [0, 1], [400, 0]);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const vsOpacity = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 18, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <div style={{ ...headline(36, BLACK), opacity: titleOpacity, maxWidth: 800, textAlign: 'center', padding: '0 60px' }}>
          TWO TYPES OF POLICY.
          <br />
          <span style={{ color: ACCENT }}>YOURS IS PROBABLY THE WRONG ONE.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 48, marginTop: 20 }}>
          {/* ACV Card */}
          <div style={{ transform: `translateX(${leftX}px)` }}>
            <DocumentCard
              label="ACV"
              labelColor={ACCENT}
              icon={<XMark />}
              bg="#FFF0F0"
              borderColor={ACCENT}
            />
          </div>

          {/* VS */}
          <div style={{
            fontFamily: FONT,
            fontSize: 48,
            color: '#999',
            opacity: vsOpacity,
          }}>VS</div>

          {/* RCV Card */}
          <div style={{ transform: `translateX(${rightX}px)` }}>
            <DocumentCard
              label="RCV"
              labelColor={ACCENT_GREEN}
              icon={<CheckMark />}
              bg="#F0FFF8"
              borderColor={ACCENT_GREEN}
            />
          </div>
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 30,
          color: '#555',
          textAlign: 'center',
          maxWidth: 780,
          padding: '0 60px',
          lineHeight: 1.4,
          opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Actual Cash Value pays what it's worth <span style={{ color: ACCENT, fontWeight: 900 }}>today</span>.
          {' '}Replacement Cost pays what it costs to <span style={{ color: ACCENT_GREEN, fontWeight: 900 }}>replace it</span>.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// SVG Television
const TVSVG: React.FC<{ scale?: number; strokeColor?: string }> = ({ scale = 1, strokeColor = WHITE }) => (
  <svg width={160 * scale} height={130 * scale} viewBox="0 0 160 130">
    {/* Screen */}
    <rect x="10" y="10" width="140" height="90" rx="8" fill="none" stroke={strokeColor} strokeWidth="7" />
    {/* Stand neck */}
    <rect x="70" y="100" width="20" height="16" fill={strokeColor} />
    {/* Stand base */}
    <rect x="45" y="116" width="70" height="10" rx="4" fill={strokeColor} />
    {/* Screen inner */}
    <rect x="20" y="20" width="120" height="70" rx="4" fill={strokeColor} opacity={0.12} />
  </svg>
);

// Scene 3: TV cost math — dark bg
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tvSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const tvScale = interpolate(tvSpring, [0, 1], [0.3, 1]);

  const arrowW = interpolate(frame, [30, 80], [0, 140], { extrapolateRight: 'clamp' });

  const bagSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 90 } });
  const bagScale = interpolate(bagSpring, [0, 1], [0, 1]);

  const origOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const strikeProg = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: 'clamp' });
  const payoutOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  const payoutAmt = Math.round(interpolate(frame, [65, 130], [800, 120], { extrapolateRight: 'clamp' }));

  const bottomOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        {/* Label */}
        <div style={{ ...headline(34, WHITE), marginBottom: 40, opacity: origOpacity }}>
          YOUR 5-YEAR-OLD TV
        </div>

        {/* Main row */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 36 }}>
          {/* TV */}
          <div style={{ transform: `scale(${tvScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <TVSVG scale={1.4} strokeColor={WHITE} />
            {/* original price with strikethrough */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ fontFamily: FONT, fontSize: 52, color: WHITE, opacity: origOpacity }}>
                $800
              </div>
              {/* strikethrough line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: `${strikeProg * 100}%`,
                height: 5,
                background: ACCENT,
                transform: 'translateY(-50%)',
              }} />
            </div>
          </div>

          {/* Arrow */}
          <div style={{
            width: arrowW,
            height: 6,
            background: ACCENT,
            position: 'relative',
            borderRadius: 3,
          }}>
            <div style={{
              position: 'absolute',
              right: -2,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '14px solid transparent',
              borderBottom: '14px solid transparent',
              borderLeft: `20px solid ${ACCENT}`,
            }} />
          </div>

          {/* Payout */}
          <div style={{
            transform: `scale(${bagScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            {/* Money bag SVG */}
            <svg width={120} height={130} viewBox="0 0 120 130">
              <ellipse cx="60" cy="90" rx="50" ry="38" fill={ACCENT} />
              <ellipse cx="60" cy="52" rx="26" ry="20" fill={ACCENT} />
              <rect x="44" y="28" width="32" height="18" rx="8" fill="#B91C1C" />
              <text x="60" y="98" textAnchor="middle" fontSize="22" fontWeight="900" fill={WHITE} fontFamily="Arial Black, sans-serif">$$$</text>
            </svg>
            <div style={{
              fontFamily: FONT,
              fontSize: 58,
              color: ACCENT,
              opacity: payoutOpacity,
              lineHeight: 1,
            }}>
              ${payoutAmt}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 24, color: '#aaa', opacity: payoutOpacity }}>
              PAYOUT
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 56,
          fontFamily: FONT,
          fontSize: 32,
          color: WHITE,
          opacity: bottomOpacity,
          textAlign: 'center',
          maxWidth: 720,
          padding: '0 60px',
          lineHeight: 1.4,
        }}>
          <span style={{ color: ACCENT, fontWeight: 900 }}>$680 gone.</span> Your insurance kept the difference.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Flame SVG
const FlameSVG: React.FC<{ x: number; y: number; h: number; seed: number }> = ({ x, y, h, seed }) => {
  const c1x = x + (seed % 5) * 4 - 8;
  const c2x = x - (seed % 3) * 5 + 6;
  return (
    <path
      d={`M ${x},${y} C ${c1x},${y - h * 0.4} ${c2x},${y - h * 0.7} ${x},${y - h} C ${x + 10},${y - h * 0.6} ${x + 14},${y - h * 0.3} ${x},${y}`}
      fill={ACCENT}
      opacity={0.85 - (seed % 3) * 0.12}
    />
  );
};

// Scene 4: House fire + $63,000 counter — light bg
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const houseScale = interpolate(houseSpring, [0, 1], [0.4, 1]);

  const flameH = interpolate(frame, [20, 100], [0, 90], { extrapolateRight: 'clamp' });

  const counterVal = Math.round(
    interpolate(frame, [60, 180], [0, 63000], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    })
  );

  const labelOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });

  const flames = [
    { x: 55, y: 170, h: flameH * 0.7, seed: 1 },
    { x: 100, y: 165, h: flameH, seed: 3 },
    { x: 145, y: 170, h: flameH * 0.85, seed: 5 },
    { x: 78, y: 168, h: flameH * 0.6, seed: 7 },
    { x: 122, y: 168, h: flameH * 0.65, seed: 2 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {/* House with flames */}
        <div style={{ transform: `scale(${houseScale})`, position: 'relative' }}>
          <svg width={260} height={240} viewBox="0 0 200 190">
            {/* Roof */}
            <polygon points="100,10 190,90 10,90" fill="none" stroke={BLACK} strokeWidth="7" strokeLinejoin="round" />
            {/* Body */}
            <rect x="25" y="90" width="150" height="90" fill="none" stroke={BLACK} strokeWidth="7" />
            {/* Door */}
            <rect x="78" y="130" width="44" height="50" fill={BLACK} opacity={0.3} />
            {/* Flames */}
            {flames.map((f, i) => (
              <FlameSVG key={i} x={f.x} y={f.y} h={f.h} seed={f.seed} />
            ))}
          </svg>
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ ...headline(96, ACCENT), lineHeight: 1 }}>
            ${counterVal.toLocaleString()}
          </div>
          <div style={{ ...headline(34, BLACK), opacity: labelOpacity }}>
            AVERAGE CLAIM SHORTFALL
          </div>
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 30,
          color: '#555',
          textAlign: 'center',
          maxWidth: 760,
          padding: '0 60px',
          lineHeight: 1.5,
          opacity: labelOpacity,
        }}>
          That's how much <span style={{ color: ACCENT, fontWeight: 900 }}>you'd owe out of pocket</span> after an ACV claim.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Fix — 33¢/day, dark bg
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const coinSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const coinY = interpolate(coinSpring, [0, 1], [-60, 0]);

  const calSpring = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const calScale = interpolate(calSpring, [0, 1], [0.2, 1]);

  const shieldSpring = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 90 } });
  const shieldScale = interpolate(shieldSpring, [0, 1], [0, 1]);

  const textOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        {/* Top label */}
        <div style={{ ...headline(38, WHITE), opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }) }}>
          THE FIX COSTS...
        </div>

        {/* Row: coin + calendar + shield */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32, marginTop: 16 }}>
          {/* Coin */}
          <div style={{ transform: `translateY(${coinY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width={100} height={100} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill={ACCENT} />
              <text x="50" y="64" textAnchor="middle" fontSize="40" fontWeight="900" fill={WHITE} fontFamily="Arial Black, sans-serif">¢</text>
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, lineHeight: 1 }}>$0.33</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa' }}>PER DAY</div>
          </div>

          {/* = */}
          <div style={{ fontFamily: FONT, fontSize: 60, color: WHITE, opacity: 0.5 }}>=</div>

          {/* Calendar */}
          <div style={{ transform: `scale(${calScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width={110} height={110} viewBox="0 0 100 100">
              <rect x="5" y="15" width="90" height="80" rx="10" fill="none" stroke={WHITE} strokeWidth="6" />
              <rect x="5" y="15" width="90" height="28" rx="10" fill={ACCENT} />
              <rect x="5" y="34" width="90" height="9" fill={ACCENT} />
              {/* Calendar dots */}
              {[0, 1, 2].map(col =>
                [0, 1, 2].map(row => (
                  <circle key={`${col}-${row}`} cx={22 + col * 28} cy={65 + row * 18} r={5} fill={WHITE} opacity={0.6} />
                ))
              )}
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 40, color: WHITE, lineHeight: 1 }}>$120</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa' }}>PER YEAR</div>
          </div>

          {/* → */}
          <div style={{ fontFamily: FONT, fontSize: 60, color: ACCENT }}>→</div>

          {/* Shield */}
          <div style={{ transform: `scale(${shieldScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width={110} height={120} viewBox="0 0 100 110">
              <path d="M50,4 L90,20 L90,60 Q90,95 50,108 Q10,95 10,60 L10,20 Z" fill="none" stroke={ACCENT_GREEN} strokeWidth="7" strokeLinejoin="round" />
              <polyline points="30,55 46,70 72,38" fill="none" stroke={ACCENT_GREEN} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 34, color: ACCENT_GREEN, lineHeight: 1 }}>$63K</div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#aaa' }}>PROTECTED</div>
          </div>
        </div>

        {/* Bottom text */}
        <div style={{
          fontFamily: FONT,
          fontSize: 32,
          color: WHITE,
          opacity: textOpacity,
          textAlign: 'center',
          maxWidth: 780,
          padding: '0 60px',
          lineHeight: 1.5,
        }}>
          That's the <span style={{ color: ACCENT_GREEN, fontWeight: 900 }}>cheapest fix</span> you'll ever make.
          {' '}Most people skip it and find out the hard way.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — light bg, document with magnifying glass, ACV → RCV
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const docY = interpolate(docSpring, [0, 1], [100, 0]);

  const magSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 90 } });
  const magScale = interpolate(magSpring, [0, 1], [0, 1]);

  const acvOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: 'clamp' });
  const strikeW = interpolate(frame, [70, 110], [0, 1], { extrapolateRight: 'clamp' });
  const rcvOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 80 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.6, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        {/* Document + magnifying glass */}
        <div style={{ transform: `translateY(${docY}px)`, position: 'relative' }}>
          <svg width={240} height={280} viewBox="0 0 240 280">
            {/* Document */}
            <rect x="20" y="10" width="160" height="210" rx="12" fill={WHITE} stroke={BLACK} strokeWidth="6" />
            {/* Lines on document */}
            <rect x="40" y="40" width="120" height="10" rx="4" fill="#ccc" />
            <rect x="40" y="62" width="100" height="10" rx="4" fill="#ccc" />
            <rect x="40" y="84" width="110" height="10" rx="4" fill="#ccc" />
            {/* Highlighted ACV text */}
            <rect x="40" y="108" width="80" height="22" rx="4" fill={ACCENT} opacity={acvOpacity * 0.25} />
            <text x="80" y="125" textAnchor="middle" fontSize="18" fontWeight="900" fill={ACCENT} fontFamily="Arial Black, sans-serif" opacity={acvOpacity}>ACV</text>
            {/* Strikethrough on ACV */}
            <line x1="40" y1="119" x2={40 + 80 * strikeW} y2="119" stroke={ACCENT} strokeWidth="4" />
            {/* RCV replacing it */}
            <text x="80" y="148" textAnchor="middle" fontSize="18" fontWeight="900" fill={ACCENT_GREEN} fontFamily="Arial Black, sans-serif" opacity={rcvOpacity}>→ RCV ✓</text>
            {/* More lines */}
            <rect x="40" y="166" width="90" height="10" rx="4" fill="#ccc" />
            <rect x="40" y="188" width="75" height="10" rx="4" fill="#ccc" />
          </svg>
          {/* Magnifying glass */}
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: -10,
            transform: `scale(${magScale})`,
          }}>
            <svg width={90} height={90} viewBox="0 0 90 90">
              <circle cx="38" cy="38" r="28" fill="none" stroke={BLACK} strokeWidth="7" />
              <circle cx="38" cy="38" r="20" fill={BLACK} opacity={0.06} />
              <line x1="60" y1="60" x2="82" y2="82" stroke={BLACK} strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* CTA box */}
        <div style={{
          transform: `scale(${ctaScale})`,
          background: BLACK,
          borderRadius: 20,
          padding: '28px 48px',
          border: `4px solid ${ACCENT}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ ...headline(38, WHITE) }}>CHECK YOUR POLICY</div>
          <div style={{ ...headline(38, ACCENT) }}>TONIGHT</div>
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 28,
          color: '#444',
          textAlign: 'center',
          maxWidth: 740,
          padding: '0 60px',
          lineHeight: 1.5,
          opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Search for <span style={{ color: ACCENT, fontWeight: 900 }}>"ACV"</span> — if you see it,
          {' '}call your agent and ask to switch to <span style={{ color: ACCENT_GREEN, fontWeight: 900 }}>RCV</span>.
          {' '}Share this before someone you know gets blindsided.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

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
