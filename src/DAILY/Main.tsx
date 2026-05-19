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

// ── Scene 1: Hook — scrolling at 9PM ────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const sceneIn = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 11, mass: 0.9 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 14, mass: 0.8 } });
  const bag0Sp = spring({ fps, frame: Math.max(0, frame - 75), config: { damping: 11, mass: 0.7 } });
  const bag1Sp = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 11, mass: 0.7 } });
  const bag2Sp = spring({ fps, frame: Math.max(0, frame - 125), config: { damping: 11, mass: 0.7 } });
  const phoneGlow = interpolate(frame, [30, 65, 100, 135, 170], [0, 1, 0.45, 1, 0.45], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 30,
      }}>
        <p style={{ ...headline(54, ACCENT), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          9PM SPENDING TRAP
        </p>

        {/* Person on couch with phone and clock */}
        <svg width="520" height="280" viewBox="0 0 520 280"
          style={{ transform: `scale(${sceneIn})`, transformOrigin: 'center' }}>
          {/* Couch base */}
          <rect x="10" y="200" width="500" height="65" rx="22" fill="#2a2a2a" />
          {/* Couch back */}
          <rect x="10" y="158" width="500" height="58" rx="16" fill="#333" />
          {/* Left arm */}
          <rect x="0" y="152" width="62" height="113" rx="16" fill="#2a2a2a" />
          {/* Right arm */}
          <rect x="458" y="152" width="62" height="113" rx="16" fill="#2a2a2a" />
          {/* Person head */}
          <circle cx="428" cy="138" r="44" fill="#E8C49A" />
          {/* Hair */}
          <ellipse cx="428" cy="103" rx="44" ry="20" fill="#5C4033" />
          {/* Body horizontal */}
          <rect x="170" y="170" width="278" height="48" rx="24" fill="#4a5568" />
          {/* Legs */}
          <rect x="62" y="170" width="130" height="48" rx="24" fill="#4a5568" />
          {/* Foot */}
          <ellipse cx="44" cy="194" rx="34" ry="22" fill="#E8C49A" />
          {/* Arm holding phone */}
          <rect x="395" y="158" width="26" height="75" rx="13" fill="#E8C49A" />
          {/* Phone body */}
          <rect x="398" y="80" width="60" height="98" rx="12" fill="#1a1a1a" />
          {/* Phone screen */}
          <rect x="404" y="86" width="48" height="86" rx="8"
            fill={`rgba(249,115,22,${0.2 + 0.6 * phoneGlow})`} />
          <rect x="404" y="86" width="48" height="86" rx="8"
            fill="none" stroke={ACCENT} strokeWidth="2.5" opacity={phoneGlow} />
          {/* Cart icon on phone screen */}
          <path d="M412 104 L415 104 L419 117 L432 117 L435 108 L417 108"
            stroke={WHITE} strokeWidth="2.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="422" cy="120" r="2.5" fill={WHITE} />
          <circle cx="430" cy="120" r="2.5" fill={WHITE} />
          {/* Clock */}
          <circle cx="72" cy="68" r="58" fill="none" stroke={ACCENT} strokeWidth="4" />
          <circle cx="72" cy="68" r="50" fill="rgba(249,115,22,0.07)" />
          <text x="72" y="80" textAnchor="middle" fill={WHITE}
            fontSize="30" fontFamily="Arial Black" fontWeight="900">9:00</text>
          <text x="72" y="106" textAnchor="middle" fill={ACCENT}
            fontSize="18" fontFamily="Arial" fontWeight="bold">PM</text>
        </svg>

        {/* Shopping bags row */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          {([bag0Sp, bag1Sp, bag2Sp] as number[]).map((sp, i) => (
            <svg key={i} width="64" height="76" viewBox="0 0 64 76"
              style={{ transform: `scale(${sp})`, transformOrigin: 'center' }}>
              <rect x="4" y="20" width="56" height="50" rx="8" fill={ACCENT} opacity="0.9" />
              <path d="M14 20 Q14 2 32 2 Q50 2 50 20"
                stroke={ACCENT} strokeWidth="6" fill="none" strokeLinecap="round" />
              <text x="32" y="52" textAnchor="middle" fill={BLACK}
                fontSize="24" fontFamily="Arial Black" fontWeight="900">$</text>
            </svg>
          ))}
        </div>

        <p style={{ ...headline(36, WHITE), opacity: subIn }}>NOT WEAK WILLPOWER</p>
        <p style={{ ...headline(36, ACCENT), opacity: subIn }}>YOUR BRAIN&apos;S OUT OF GAS</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Decision fatigue — brain battery draining ──────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const brainIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 11, mass: 0.9 } });
  const counterSp = spring({ fps, frame: Math.max(0, frame - 40), config: { damping: 20, mass: 1.2 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 120), config: { damping: 14, mass: 0.8 } });

  const decisionCount = Math.floor(interpolate(frame, [40, 185], [0, 200], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const batteryW = interpolate(frame, [40, 185], [148, 8], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const depleteRed = interpolate(frame, [140, 185], [0, 0.18], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const batteryColor = frame > 140 ? '#EF4444' : ACCENT;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          DECISION FATIGUE
        </p>

        {/* Brain with battery */}
        <svg width="340" height="300" viewBox="0 0 340 300"
          style={{ transform: `scale(${brainIn})`, transformOrigin: 'center' }}>
          {/* Brain body */}
          <ellipse cx="170" cy="120" rx="110" ry="95" fill="#f0e8d8" stroke={BLACK} strokeWidth="5" />
          {/* Red depletion overlay */}
          <ellipse cx="170" cy="120" rx="110" ry="95" fill={`rgba(239,68,68,${depleteRed})`} />
          {/* Brain fold lines */}
          <path d="M105 88 Q130 64 155 88" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <path d="M155 88 Q180 64 205 88" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <path d="M205 88 Q228 68 238 86" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <path d="M112 120 Q142 96 170 120" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <path d="M170 120 Q198 96 228 120" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <line x1="170" y1="28" x2="170" y2="212" stroke={BLACK} strokeWidth="2" opacity="0.22" />
          {/* Battery outline */}
          <rect x="85" y="234" width="160" height="44" rx="9" fill="none" stroke={BLACK} strokeWidth="4" />
          <rect x="245" y="247" width="12" height="18" rx="4" fill={BLACK} />
          {/* Battery fill */}
          <rect x="89" y="238" width={batteryW} height="36" rx="6" fill={batteryColor} />
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, margin: 0,
          transform: `scale(${counterSp})`, transformOrigin: 'center' }}>
          {decisionCount}+
        </p>
        <p style={{ ...headline(28, BLACK), opacity: counterSp }}>DAILY DECISIONS DRAIN YOU</p>

        <p style={{ ...headline(32, ACCENT), opacity: labelIn }}>BY 9PM YOUR GUARD IS DOWN</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Retailers exploit the window ───────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const cartIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const bellIn = spring({ fps, frame: Math.max(0, frame - 45), config: { damping: 8, mass: 0.7 } });
  const barIn = spring({ fps, frame: Math.max(0, frame - 80), config: { damping: 12, mass: 0.8 } });
  const alertIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 10, mass: 0.7 } });

  const bellAngle = interpolate(frame, [45, 58, 71, 84, 97], [0, 22, -22, 22, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 30,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>RETAILERS KNOW THIS</p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn }}>THEY STRIKE AT 9PM</p>

        {/* Cart + bell row */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 44, alignItems: 'center' }}>
          <svg width="160" height="158" viewBox="0 0 160 158"
            style={{ transform: `scale(${cartIn})`, transformOrigin: 'center' }}>
            <path d="M10 20 L30 20 L50 110 L130 110 L148 50 L42 50"
              stroke={ACCENT} strokeWidth="8" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="58" cy="130" r="14" fill={ACCENT} />
            <circle cx="118" cy="130" r="14" fill={ACCENT} />
            <text x="90" y="90" textAnchor="middle" fill={ACCENT}
              fontSize="34" fontFamily="Arial Black">$</text>
          </svg>

          <svg width="120" height="158" viewBox="0 0 120 158"
            style={{ transform: `scale(${bellIn}) rotate(${bellAngle}deg)`, transformOrigin: '60px 8px' }}>
            {/* Bell body */}
            <path d="M60 10 C60 10 18 32 14 92 L106 92 C102 32 60 10 60 10"
              fill={ACCENT} />
            <rect x="44" y="92" width="32" height="18" rx="4" fill={ACCENT} />
            <ellipse cx="60" cy="116" rx="20" ry="12" fill={ACCENT} />
            <circle cx="60" cy="120" r="9" fill={BG_DARK} />
            {/* Notification dot */}
            <circle cx="96" cy="16" r="16" fill="#EF4444" />
            <text x="96" y="22" textAnchor="middle" fill={WHITE}
              fontSize="18" fontFamily="Arial Black">!</text>
          </svg>
        </div>

        {/* 24-hour bar chart — 8PM–midnight highlighted */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-end',
          opacity: barIn }}>
          {Array.from({ length: 24 }, (_, h) => {
            const isTarget = h >= 20;
            return (
              <div key={h} style={{
                width: 27,
                height: isTarget ? 72 : 28,
                background: isTarget ? ACCENT : 'rgba(245,245,245,0.18)',
                borderRadius: 4,
              }} />
            );
          })}
        </div>
        <p style={{ ...headline(26, ACCENT), opacity: barIn }}>8PM–MIDNIGHT: PEAK ATTACK WINDOW</p>

        {/* Alert badge */}
        <div style={{
          background: '#EF4444', borderRadius: 50, padding: '10px 32px',
          transform: `scale(${alertIn})`, transformOrigin: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>
            !! DEAL ENDS SOON !!
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: $2,100/year late-night cost ────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const piggyIn = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 10, mass: 0.9 } });
  const counterSp = spring({ fps, frame: Math.max(0, frame - 40), config: { damping: 20, mass: 1.2 } });
  const decadeSp = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 10, mass: 0.8 } });

  const counter1 = Math.floor(interpolate(frame, [40, 175], [0, 2100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const crackProg = interpolate(frame, [70, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(40, BLACK), opacity: titleIn }}>THE LATE-NIGHT BILL</p>

        {/* Piggy bank */}
        <svg width="300" height="240" viewBox="0 0 300 240"
          style={{ transform: `scale(${piggyIn})`, transformOrigin: 'center' }}>
          {/* Body */}
          <ellipse cx="148" cy="128" rx="108" ry="94" fill="#F9A8A8" stroke="#888" strokeWidth="3" />
          {/* Snout */}
          <ellipse cx="242" cy="138" rx="36" ry="28" fill="#F48080" stroke="#888" strokeWidth="2" />
          <circle cx="234" cy="136" r="7" fill="#C06060" />
          <circle cx="250" cy="136" r="7" fill="#C06060" />
          {/* Ear */}
          <ellipse cx="100" cy="52" rx="24" ry="18" fill="#F9A8A8" stroke="#888" strokeWidth="2" />
          <ellipse cx="100" cy="55" rx="14" ry="10" fill="#F48080" />
          {/* Eye */}
          <circle cx="196" cy="104" r="8" fill="#333" />
          <circle cx="199" cy="101" r="3" fill={WHITE} />
          {/* Legs */}
          <rect x="82" y="202" width="30" height="36" rx="8" fill="#F48080" />
          <rect x="126" y="208" width="30" height="30" rx="8" fill="#F48080" />
          <rect x="170" y="208" width="30" height="30" rx="8" fill="#F48080" />
          <rect x="210" y="202" width="30" height="36" rx="8" fill="#F48080" />
          {/* Coin slot */}
          <rect x="128" y="36" width="40" height="10" rx="4" fill="#888" />
          {/* Crack animating */}
          <path
            d={`M148 48 L${148 + crackProg * 22} ${48 + crackProg * 38} L${148 + crackProg * 6} ${48 + crackProg * 68}`}
            stroke="#EF4444" strokeWidth="3.5" fill="none" opacity={crackProg}
          />
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0,
          transform: `scale(${counterSp})`, transformOrigin: 'center' }}>
          ${counter1.toLocaleString()}
        </p>
        <p style={{ ...headline(28, BLACK), opacity: counterSp }}>PER YEAR IN IMPULSE BUYS</p>

        <div style={{
          transform: `scale(${decadeSp})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 50, padding: '12px 36px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, margin: 0 }}>
            $21,000 OVER A DECADE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: The fix — block apps after 8PM ─────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const phoneIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const lockIn = spring({ fps, frame: Math.max(0, frame - 65), config: { damping: 8, mass: 0.7 } });
  const savedIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 10, mass: 0.8 } });
  const checkIn = spring({ fps, frame: Math.max(0, frame - 140), config: { damping: 8, mass: 0.6 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>THE FIX</p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn }}>BLOCK APPS AFTER 8PM</p>

        {/* Phone with crossed-out cart + lock */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'center' }}>
          <svg width="180" height="300" viewBox="0 0 180 300"
            style={{ transform: `scale(${phoneIn})`, transformOrigin: 'center' }}>
            {/* Phone body */}
            <rect x="20" y="10" width="140" height="280" rx="22" fill="#1a1a1a" />
            <rect x="28" y="20" width="124" height="260" rx="16" fill="#2a2a2a" />
            {/* Cart (dimmed) */}
            <path d="M52 100 L58 100 L66 130 L108 130 L116 105 L64 105"
              stroke="rgba(245,245,245,0.4)" strokeWidth="6" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="72" cy="140" r="8" fill="rgba(245,245,245,0.4)" />
            <circle cx="102" cy="140" r="8" fill="rgba(245,245,245,0.4)" />
            {/* Red X */}
            <line x1="50" y1="94" x2="120" y2="156"
              stroke="#EF4444" strokeWidth="9" strokeLinecap="round" />
            <line x1="120" y1="94" x2="50" y2="156"
              stroke="#EF4444" strokeWidth="9" strokeLinecap="round" />
            {/* Labels */}
            <text x="90" y="196" textAnchor="middle" fill={ACCENT}
              fontSize="21" fontFamily="Arial Black">BLOCKED</text>
            <text x="90" y="218" textAnchor="middle" fill="rgba(245,245,245,0.55)"
              fontSize="16" fontFamily="Arial">after 8PM</text>
          </svg>

          {/* Lock icon */}
          <svg width="100" height="124" viewBox="0 0 100 124"
            style={{ transform: `scale(${lockIn})`, transformOrigin: 'center' }}>
            <path d="M20 56 Q20 14 50 14 Q80 14 80 56"
              stroke={ACCENT} strokeWidth="10" fill="none" strokeLinecap="round" />
            <rect x="10" y="52" width="80" height="62" rx="14" fill={ACCENT} />
            <circle cx="50" cy="79" r="12" fill={BG_DARK} />
            <rect x="46" y="79" width="8" height="18" rx="3" fill={BG_DARK} />
          </svg>
        </div>

        {/* Saved amount badge */}
        <div style={{
          transform: `scale(${savedIn})`, transformOrigin: 'center',
          background: '#10B981', borderRadius: 50, padding: '14px 40px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0 }}>
            $1,800 SAVED / YEAR
          </p>
        </div>

        {/* Checkmark */}
        <svg width="80" height="80" viewBox="0 0 80 80"
          style={{ transform: `scale(${checkIn})`, transformOrigin: 'center' }}>
          <circle cx="40" cy="40" r="38" fill="#10B981" />
          <path d="M18 40 L34 56 L62 24"
            stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <p style={{ ...headline(24, WHITE), opacity: savedIn }}>NO BUDGET. NO WILLPOWER. JUST A SCHEDULE.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — smarter schedule, follow ─────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const personIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 120), config: { damping: 8, mass: 0.7 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 150), config: { damping: 12, mass: 0.8 } });
  const coin0 = spring({ fps, frame: Math.max(0, frame - 50), config: { damping: 11, mass: 0.8 } });
  const coin1 = spring({ fps, frame: Math.max(0, frame - 68), config: { damping: 11, mass: 0.8 } });
  const coin2 = spring({ fps, frame: Math.max(0, frame - 86), config: { damping: 11, mass: 0.8 } });
  const coin3 = spring({ fps, frame: Math.max(0, frame - 104), config: { damping: 11, mass: 0.8 } });
  const glowPulse = interpolate(frame, [0, 60, 120, 180], [0.2, 0.6, 0.2, 0.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const coinSprings: number[] = [coin0, coin1, coin2, coin3];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Radial glow */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 58%, rgba(249,115,22,${glowPulse * 0.28}) 0%, transparent 62%)`,
      }} />
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>SMARTER SCHEDULE</p>
        <p style={{ ...headline(36, ACCENT), opacity: titleIn }}>BEATS MORE DISCIPLINE</p>

        {/* Person + coins side by side */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-end' }}>
          {/* Standing person */}
          <svg width="180" height="330" viewBox="0 0 180 330"
            style={{ transform: `scale(${personIn})`, transformOrigin: 'center bottom' }}>
            {/* Head */}
            <circle cx="90" cy="55" r="46" fill="#E8C49A" />
            {/* Hair */}
            <ellipse cx="90" cy="22" rx="46" ry="20" fill="#5C4033" />
            {/* Shoulders */}
            <rect x="38" y="104" width="104" height="20" rx="10" fill={ACCENT} />
            {/* Body */}
            <rect x="50" y="118" width="80" height="92" rx="14" fill={ACCENT} />
            {/* Left arm */}
            <rect x="14" y="106" width="38" height="88" rx="16" fill={ACCENT} />
            {/* Right arm */}
            <rect x="128" y="106" width="38" height="88" rx="16" fill={ACCENT} />
            {/* Legs */}
            <rect x="52" y="208" width="34" height="100" rx="14" fill="#4a5568" />
            <rect x="94" y="208" width="34" height="100" rx="14" fill="#4a5568" />
            {/* Feet */}
            <ellipse cx="69" cy="318" rx="28" ry="12" fill="#4a5568" />
            <ellipse cx="111" cy="318" rx="28" ry="12" fill="#4a5568" />
          </svg>

          {/* Coin stack */}
          <svg width="120" height="330" viewBox="0 0 120 330">
            {coinSprings.map((sp, i) => {
              const cy = 290 - i * 42;
              return (
                <g key={i} transform={`translate(60, ${cy}) scale(${sp}) translate(-60, ${-cy})`}>
                  <ellipse cx="60" cy={cy} rx="50" ry="14" fill="#059669" />
                  <ellipse cx="60" cy={cy - 6} rx="50" ry="14" fill={ACCENT} />
                  <text x="60" y={cy - 1} textAnchor="middle" fill={BLACK}
                    fontSize="14" fontFamily="Arial Black">$</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CTA badge */}
        <div style={{
          transform: `scale(${ctaIn})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 50, padding: '16px 48px',
          boxShadow: `0 0 40px rgba(249,115,22,${glowPulse * 0.8})`,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 42, color: BLACK, margin: 0 }}>
            FOLLOW FOR MORE
          </p>
        </div>

        <p style={{ ...headline(26, WHITE), opacity: subIn }}>
          DELETE SHOPPING APPS TONIGHT
        </p>
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
