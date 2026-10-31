import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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

// Scene 1: Zombie debt rising from grave
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stoneRise = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 80, to: 0 });
  const eyeGlow = interpolate(frame, [60, 90, 120, 150], [0, 1, 0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOpacity = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hookScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 120 } });
  const hookOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Ground line */}
      <div style={{ position: 'absolute', bottom: 520, left: 0, right: 0, height: 6, background: '#333' }} />

      {/* Tombstone rising */}
      <div style={{
        position: 'absolute',
        bottom: 516,
        left: '50%',
        transform: `translateX(-50%) translateY(${stoneRise}px)`,
        width: 260,
        textAlign: 'center',
      }}>
        <svg width="260" height="320" viewBox="0 0 260 320">
          {/* Stone body */}
          <rect x="30" y="80" width="200" height="220" rx="8" fill="#555" />
          {/* Rounded top */}
          <ellipse cx="130" cy="80" rx="100" ry="80" fill="#555" />
          {/* Stone highlight */}
          <rect x="50" y="100" width="160" height="180" rx="6" fill="#444" />
          <ellipse cx="130" cy="100" rx="80" ry="60" fill="#444" />

          {/* Cracks */}
          <g opacity={crackOpacity}>
            <line x1="90" y1="120" x2="110" y2="180" stroke={ACCENT} strokeWidth="2" />
            <line x1="110" y1="150" x2="130" y2="140" stroke={ACCENT} strokeWidth="1.5" />
            <line x1="150" y1="130" x2="140" y2="190" stroke={ACCENT} strokeWidth="2" />
          </g>

          {/* RIP text */}
          <text x="130" y="90" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill={WHITE} fontWeight="900">RIP</text>

          {/* Debt label */}
          <text x="130" y="160" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={ACCENT} fontWeight="900">DEBT</text>
          <text x="130" y="195" textAnchor="middle" fontFamily="Arial Black" fontSize="26" fill={WHITE} fontWeight="900">$4,200</text>

          {/* Glowing eyes */}
          <circle cx="105" cy="65" r="10" fill={ACCENT} opacity={eyeGlow} />
          <circle cx="155" cy="65" r="10" fill={ACCENT} opacity={eyeGlow} />
          <circle cx="105" cy="65" r="5" fill={WHITE} opacity={eyeGlow} />
          <circle cx="155" cy="65" r="5" fill={WHITE} opacity={eyeGlow} />
        </svg>
      </div>

      {/* Hook text */}
      <div style={{
        position: 'absolute',
        top: 220,
        left: 60,
        right: 60,
        opacity: hookOpacity,
        transform: `scale(${hookScale})`,
        textAlign: 'center',
      }}>
        <p style={{ ...headline(48, ACCENT), lineHeight: 1.1 }}>YOUR DEBT</p>
        <p style={{ ...headline(48, WHITE), lineHeight: 1.1 }}>ISN'T DEAD</p>
      </div>

      {/* Sub text */}
      <div style={{
        position: 'absolute',
        bottom: 200,
        left: 60,
        right: 60,
        opacity: interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          Collectors buy it for pennies
        </p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          and one word resurrects it
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Debt sold for pennies — light bg
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const billScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 90 } });
  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const priceIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 10, stiffness: 80 } });
  const statOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60, transform: `scale(${titleIn})` }}>
        <p style={{ ...headline(46, BLACK), lineHeight: 1.2 }}>THE ZOMBIE</p>
        <p style={{ ...headline(46, ACCENT), lineHeight: 1.2 }}>DEBT MARKET</p>
      </div>

      {/* Big debt bill */}
      <div style={{
        position: 'absolute',
        top: 340,
        left: '50%',
        transform: `translateX(-50%) scale(${billScale})`,
      }}>
        <svg width="300" height="160" viewBox="0 0 300 160">
          <rect x="0" y="0" width="300" height="160" rx="12" fill="#1a6b2a" />
          <rect x="10" y="10" width="280" height="140" rx="8" fill="#1e7a30" strokeWidth="2" stroke="#155924" />
          <text x="150" y="65" textAnchor="middle" fontFamily="Arial Black" fontSize="42" fill={WHITE} fontWeight="900">$4,200</text>
          <text x="150" y="100" textAnchor="middle" fontFamily="Arial" fontSize="18" fill="#9ef9ac">YOUR OLD DEBT</text>
          <circle cx="40" cy="80" r="28" fill="#155924" />
          <circle cx="260" cy="80" r="28" fill="#155924" />
          <text x="40" y="87" textAnchor="middle" fontFamily="Arial" fontSize="13" fill={WHITE}>$</text>
          <text x="260" y="87" textAnchor="middle" fontFamily="Arial" fontSize="13" fill={WHITE}>$</text>
        </svg>
      </div>

      {/* Arrow + price tag */}
      <div style={{ position: 'absolute', top: 530, left: '50%', transform: 'translateX(-50%)', opacity: arrowOpacity, textAlign: 'center' }}>
        <svg width="60" height="50" viewBox="0 0 60 50">
          <line x1="30" y1="0" x2="30" y2="35" stroke={ACCENT} strokeWidth="4" />
          <polygon points="15,30 30,50 45,30" fill={ACCENT} />
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: 600,
        left: '50%',
        transform: `translateX(-50%) scale(${priceIn})`,
        textAlign: 'center',
      }}>
        <div style={{ background: ACCENT, borderRadius: 16, padding: '20px 40px' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>COLLECTOR PAID</p>
          <p style={{ fontFamily: FONT, fontSize: 64, color: WHITE, margin: 0, letterSpacing: '0.05em' }}>$84</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: 'rgba(255,255,255,0.8)', margin: 0 }}>2 cents on the dollar</p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 160,
        left: 60,
        right: 60,
        opacity: statOpacity,
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>
          <span style={{ color: ACCENT, fontWeight: 900 }}>$88 BILLION</span> zombie debt market
        </p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', margin: '8px 0 0' }}>They come for the full amount</p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Clock resets — dark bg
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const clockRotate = interpolate(frame, [40, 120], [0, -360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) });
  const warningPulse = interpolate(frame, [100, 130, 160, 190], [0.4, 1, 0.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calendarIn = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60, transform: `scale(${titleIn})`, textAlign: 'center' }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>THE</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>TRAP</p>
      </div>

      {/* Clock face */}
      <div style={{
        position: 'absolute',
        top: 310,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r="115" fill="#1e1e1e" stroke={ACCENT} strokeWidth="4" />
          <circle cx="120" cy="120" r="6" fill={ACCENT} />
          {/* Hour markers */}
          {Array.from({ length: Math.max(0, Math.floor(12)) }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 120 + 95 * Math.sin(angle);
            const y1 = 120 - 95 * Math.cos(angle);
            const x2 = 120 + 108 * Math.sin(angle);
            const y2 = 120 - 108 * Math.cos(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={WHITE} strokeWidth="3" />;
          })}
          {/* Minute hand spinning backward */}
          <line
            x1="120" y1="120"
            x2={120 + 80 * Math.sin((clockRotate * Math.PI) / 180)}
            y2={120 - 80 * Math.cos((clockRotate * Math.PI) / 180)}
            stroke={ACCENT} strokeWidth="4" strokeLinecap="round"
          />
          {/* Hour hand */}
          <line x1="120" y1="120" x2={120 + 55 * Math.sin((clockRotate * 0.5 * Math.PI) / 180)} y2={120 - 55 * Math.cos((clockRotate * 0.5 * Math.PI) / 180)} stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Reset label */}
      <div style={{
        position: 'absolute',
        top: 575,
        left: '50%',
        transform: `translateX(-50%) scale(${calendarIn})`,
        background: ACCENT,
        borderRadius: 12,
        padding: '16px 40px',
        textAlign: 'center',
        opacity: warningPulse,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>CLOCK RESETS</p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 220,
        left: 60,
        right: 60,
        opacity: labelOpacity,
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, lineHeight: 1.4 }}>
          One <span style={{ color: ACCENT }}>$5 payment</span> restarts<br />
          the statute of limitations
        </p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#aaa', margin: '12px 0 0' }}>3–7 more years of liability</p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Collector tactics — light bg
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const phoneShake = interpolate(frame, [20, 25, 30, 35, 40, 45, 50], [0, -8, 8, -6, 6, -3, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bubbleIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 100 } });
  const xIn = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 140 } });
  const personIn = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60, transform: `scale(${titleIn})`, textAlign: 'center' }}>
        <p style={{ ...headline(42, BLACK), lineHeight: 1.2 }}>THEIR</p>
        <p style={{ ...headline(42, ACCENT), lineHeight: 1.2 }}>TACTICS</p>
      </div>

      {/* Ringing phone */}
      <div style={{
        position: 'absolute',
        top: 340,
        left: 140,
        transform: `rotate(${phoneShake}deg)`,
      }}>
        <svg width="160" height="260" viewBox="0 0 160 260">
          <rect x="10" y="0" width="140" height="260" rx="24" fill="#333" />
          <rect x="20" y="14" width="120" height="220" rx="14" fill="#222" />
          <rect x="30" y="24" width="100" height="200" rx="8" fill="#111" />
          {/* Screen glow - incoming call */}
          <rect x="30" y="24" width="100" height="200" rx="8" fill={ACCENT} opacity="0.15" />
          <text x="80" y="80" textAnchor="middle" fontFamily="Arial" fontSize="13" fill="#aaa">INCOMING CALL</text>
          <text x="80" y="115" textAnchor="middle" fontFamily="Arial Black" fontSize="16" fill={WHITE}>DEBT COLLECTOR</text>
          {/* Phone button */}
          <circle cx="80" cy="240" r="12" fill="#555" />
          {/* Vibration lines */}
          <line x1="5" y1="80" x2="-10" y2="80" stroke={ACCENT} strokeWidth="3" strokeDasharray="4,3" />
          <line x1="155" y1="80" x2="170" y2="80" stroke={ACCENT} strokeWidth="3" strokeDasharray="4,3" />
          <line x1="5" y1="120" x2="-14" y2="120" stroke={ACCENT} strokeWidth="2" strokeDasharray="3,3" />
          <line x1="155" y1="120" x2="174" y2="120" stroke={ACCENT} strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      </div>

      {/* Speech bubble */}
      <div style={{
        position: 'absolute',
        top: 360,
        right: 40,
        transform: `scale(${bubbleIn})`,
        transformOrigin: 'bottom left',
        background: '#fff',
        border: `3px solid ${ACCENT}`,
        borderRadius: 16,
        padding: '20px 24px',
        maxWidth: 280,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, lineHeight: 1.4 }}>
          "Just pay <span style={{ color: ACCENT }}>$5</span> to show good faith"
        </p>
      </div>

      {/* Big red X */}
      <div style={{
        position: 'absolute',
        top: 560,
        right: 60,
        transform: `scale(${xIn})`,
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="44" fill={ACCENT} />
          <line x1="22" y1="22" x2="68" y2="68" stroke={WHITE} strokeWidth="10" strokeLinecap="round" />
          <line x1="68" y1="22" x2="22" y2="68" stroke={WHITE} strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>

      {/* Warning text */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 60,
        right: 60,
        opacity: interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0, lineHeight: 1.4 }}>
          "Good faith" = <span style={{ color: ACCENT }}>legal restart</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', margin: '10px 0 0' }}>Don't say a word. Don't pay a penny.</p>
      </div>
    </FadeScene>
  );
};

// Scene 5: How to protect yourself — dark bg
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const shieldIn = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 10, stiffness: 80 } });

  const steps = [
    { label: "1. Don't acknowledge", delay: 70 },
    { label: "2. Request in writing", delay: 110 },
    { label: "3. Demand validation", delay: 150 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60, transform: `scale(${titleIn})`, textAlign: 'center' }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>HOW TO</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>PROTECT YOURSELF</p>
      </div>

      {/* Shield */}
      <div style={{
        position: 'absolute',
        top: 310,
        left: '50%',
        transform: `translateX(-50%) scale(${shieldIn})`,
      }}>
        <svg width="180" height="200" viewBox="0 0 180 200">
          <path d="M90 5 L170 40 L170 110 Q170 165 90 195 Q10 165 10 110 L10 40 Z" fill={ACCENT} />
          <path d="M90 22 L155 52 L155 112 Q155 157 90 178 Q25 157 25 112 L25 52 Z" fill="#c0392b" />
          {/* Checkmark */}
          <polyline points="55,100 80,125 130,75" stroke={WHITE} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Steps */}
      <div style={{ position: 'absolute', top: 560, left: 60, right: 60 }}>
        {steps.map((step, i) => {
          const stepIn = spring({ frame: Math.max(0, frame - step.delay), fps, config: { damping: 12, stiffness: 110 } });
          const stepOpacity = interpolate(frame, [step.delay, step.delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              transform: `scale(${stepIn})`,
              opacity: stepOpacity,
              background: '#1e1e1e',
              border: `2px solid ${ACCENT}`,
              borderRadius: 12,
              padding: '18px 24px',
              marginBottom: 18,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>{step.label}</p>
            </div>
          );
        })}
      </div>
    </FadeScene>
  );
};

// Scene 6: Know your rights — CTA — light bg
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const docIn = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 90 } });
  const textIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 80 } });
  const tombIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 90 } });
  const crumbleOpacity = interpolate(frame, [160, 200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, transform: `scale(${titleIn})`, textAlign: 'center' }}>
        <p style={{ ...headline(52, BLACK), lineHeight: 1.1 }}>YOUR</p>
        <p style={{ ...headline(52, ACCENT), lineHeight: 1.1 }}>RIGHTS</p>
      </div>

      {/* FDCPA document */}
      <div style={{
        position: 'absolute',
        top: 330,
        left: '50%',
        transform: `translateX(-50%) scale(${docIn})`,
        textAlign: 'center',
      }}>
        <svg width="220" height="270" viewBox="0 0 220 270">
          <rect x="0" y="0" width="220" height="270" rx="12" fill="#fff" stroke="#ddd" strokeWidth="2" />
          <rect x="0" y="0" width="220" height="60" rx="12" fill={ACCENT} />
          <rect x="0" y="48" width="220" height="12" fill={ACCENT} />
          <text x="110" y="38" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={WHITE} fontWeight="900">FDCPA</text>
          <rect x="20" y="80" width="180" height="8" rx="4" fill="#eee" />
          <rect x="20" y="100" width="160" height="8" rx="4" fill="#eee" />
          <rect x="20" y="120" width="180" height="8" rx="4" fill="#eee" />
          <rect x="20" y="140" width="140" height="8" rx="4" fill="#eee" />
          <rect x="20" y="170" width="180" height="8" rx="4" fill={ACCENT} opacity="0.3" />
          <rect x="20" y="190" width="160" height="8" rx="4" fill={ACCENT} opacity="0.3" />
          <path d="M110 215 L135 228 L135 248 Q135 262 110 268 Q85 262 85 248 L85 228 Z" fill={ACCENT} />
          <polyline points="99,245 108,255 125,238" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Key rights */}
      <div style={{
        position: 'absolute',
        top: 620,
        left: 60,
        right: 60,
        transform: `scale(${textIn})`,
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, lineHeight: 1.5 }}>
          Break the rules → <span style={{ color: ACCENT }}>you can sue them</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#555', margin: '10px 0 0', lineHeight: 1.4 }}>
          Zombie debt dies when you stop being scared
        </p>
      </div>

      {/* Crumbling tombstone */}
      <div style={{
        position: 'absolute',
        bottom: 280,
        right: 60,
        opacity: crumbleOpacity,
        transform: `scale(${tombIn})`,
      }}>
        <svg width="80" height="100" viewBox="0 0 80 100">
          <rect x="10" y="30" width="60" height="70" rx="4" fill="#999" />
          <ellipse cx="40" cy="30" rx="30" ry="26" fill="#999" />
          <text x="40" y="55" textAnchor="middle" fontFamily="Arial Black" fontSize="11" fill={WHITE}>ZOMBIE</text>
          <text x="40" y="72" textAnchor="middle" fontFamily="Arial Black" fontSize="11" fill={WHITE}>DEBT</text>
          <line x1="25" y1="35" x2="35" y2="65" stroke={ACCENT} strokeWidth="2" />
          <line x1="50" y1="40" x2="45" y2="70" stroke={ACCENT} strokeWidth="1.5" />
        </svg>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: 140,
        left: 60,
        right: 60,
        opacity: ctaOpacity,
        textAlign: 'center',
      }}>
        <div style={{ background: ACCENT, borderRadius: 16, padding: '20px 32px' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>
            Check your state's statute of limitations
          </p>
        </div>
      </div>
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
