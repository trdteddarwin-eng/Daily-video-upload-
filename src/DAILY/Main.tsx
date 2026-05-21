import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
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

// ── Scene 2: The 19% loyalty penalty bar chart ───────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const barGreen = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 12, mass: 0.9 } });
  const barRed = spring({ fps, frame: Math.max(0, frame - 65), config: { damping: 12, mass: 0.9 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 110), config: { damping: 10, mass: 0.8 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 145), config: { damping: 9, mass: 0.7 } });

  const greenH = interpolate(barGreen, [0, 1], [0, 200]);
  const redH = interpolate(barRed, [0, 1], [0, 238]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 24,
      }}>
        <p style={{ ...headline(46, BLACK), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          THE LOYALTY PENALTY
        </p>

        {/* Bar chart */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-end', height: 280 }}>
          {/* New customer bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN, margin: 0, opacity: barGreen }}>$1,200</p>
            <div style={{
              width: 130, height: greenH, background: GREEN, borderRadius: '12px 12px 0 0',
            }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
              NEW<br />CUSTOMER
            </p>
          </div>

          {/* You bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, margin: 0, opacity: barRed }}>$1,771</p>
            <div style={{
              width: 130, height: redH, background: ACCENT, borderRadius: '12px 12px 0 0',
            }} />
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
              YOU<br />(LOYAL)
            </p>
          </div>
        </div>

        {/* 19% label */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14,
          opacity: labelIn,
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <path d="M22 4 L22 36 M10 24 L22 36 L34 24"
              stroke={ACCENT} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0, letterSpacing: '0.1em' }}>19% MORE THAN STRANGERS</p>
        </div>

        {/* Badge */}
        <div style={{
          transform: `scale(${badgeIn})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 50, padding: '12px 36px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>
            THAT&apos;S THE POLICY
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: The math — $847/year, $8,470/decade ─────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const calIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const counterSp = spring({ fps, frame: Math.max(0, frame - 45), config: { damping: 20, mass: 1.2 } });
  const decadeSp = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 9, mass: 0.7 } });
  const labelIn = spring({ fps, frame: Math.max(0, frame - 160), config: { damping: 12, mass: 0.8 } });

  const counter = Math.floor(interpolate(frame, [45, 175], [0, 847], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>DO THE MATH</p>

        {/* Calendar icon */}
        <svg width="180" height="180" viewBox="0 0 180 180"
          style={{ transform: `scale(${calIn})`, transformOrigin: 'center' }}>
          <rect x="10" y="30" width="160" height="140" rx="16" fill="#1e1e1e" stroke={ACCENT} strokeWidth="4" />
          <rect x="10" y="30" width="160" height="48" rx="16" fill={ACCENT} />
          <rect x="10" y="58" width="160" height="20" fill={ACCENT} />
          {/* Calendar rings */}
          <rect x="46" y="14" width="12" height="32" rx="6" fill={WHITE} />
          <rect x="122" y="14" width="12" height="32" rx="6" fill={WHITE} />
          {/* Grid dots */}
          {[0,1,2,3,4,5,6].map(col =>
            [0,1,2].map(row => (
              <circle key={`${col}-${row}`}
                cx={30 + col * 20} cy={100 + row * 24} r="5"
                fill={col === 5 && row === 2 ? ACCENT : 'rgba(245,245,245,0.35)'} />
            ))
          )}
          <text x="90" y="54" textAnchor="middle" fill={WHITE}
            fontSize="20" fontFamily="Arial Black" letterSpacing="2">EVERY YEAR</text>
        </svg>

        {/* Animated dollar counter */}
        <p style={{ fontFamily: FONT, fontSize: 96, color: ACCENT, margin: 0,
          transform: `scale(${counterSp})`, transformOrigin: 'center' }}>
          ${counter.toLocaleString()}
        </p>
        <p style={{ ...headline(28, WHITE), opacity: counterSp }}>LOYALTY PENALTY / YEAR</p>

        {/* Decade badge */}
        <div style={{
          transform: `scale(${decadeSp})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 50, padding: '14px 40px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, margin: 0 }}>
            $8,470 OVER A DECADE
          </p>
        </div>

        <p style={{ ...headline(24, WHITE), opacity: labelIn }}>FOR DOING NOTHING DIFFERENT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: Why it works — inertia / auto-renew ────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const phoneIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const piggyIn = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 9, mass: 0.8 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 9, mass: 0.7 } });

  const coinDrop = interpolate(frame, [70, 160], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, BLACK), opacity: titleIn }}>WHY THEY GET AWAY WITH IT</p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 50, alignItems: 'center' }}>
          {/* Phone with auto-renew notification */}
          <svg width="200" height="320" viewBox="0 0 200 320"
            style={{ transform: `scale(${phoneIn})`, transformOrigin: 'center' }}>
            <rect x="20" y="10" width="160" height="300" rx="24" fill="#1a1a1a" />
            <rect x="30" y="22" width="140" height="276" rx="16" fill="#f0f0f0" />
            {/* Notification banner */}
            <rect x="36" y="80" width="128" height="70" rx="10" fill={ACCENT} />
            <text x="100" y="105" textAnchor="middle" fill={WHITE}
              fontSize="14" fontFamily="Arial Black">AUTO-RENEWED</text>
            <text x="100" y="128" textAnchor="middle" fill={WHITE}
              fontSize="20" fontFamily="Arial Black">$1,771</text>
            {/* Ok button */}
            <rect x="60" y="168" width="80" height="30" rx="8" fill={BLACK} />
            <text x="100" y="188" textAnchor="middle" fill={WHITE}
              fontSize="14" fontFamily="Arial">OK</text>
            {/* Home bar */}
            <rect x="70" y="302" width="60" height="6" rx="3" fill="#888" />
          </svg>

          {/* Piggy bank with coins falling out */}
          <svg width="220" height="320" viewBox="0 0 220 320"
            style={{ transform: `scale(${piggyIn})`, transformOrigin: 'center' }}>
            {/* Body */}
            <ellipse cx="108" cy="180" rx="90" ry="78" fill="#F9A8A8" stroke="#999" strokeWidth="3" />
            {/* Snout */}
            <ellipse cx="188" cy="188" rx="30" ry="24" fill="#F48080" stroke="#999" strokeWidth="2" />
            <circle cx="181" cy="186" r="6" fill="#C06060" />
            <circle cx="195" cy="186" r="6" fill="#C06060" />
            {/* Ear */}
            <ellipse cx="66" cy="114" rx="20" ry="15" fill="#F9A8A8" stroke="#999" strokeWidth="2" />
            <ellipse cx="66" cy="117" rx="11" ry="8" fill="#F48080" />
            {/* Eye */}
            <circle cx="152" cy="158" r="7" fill="#333" />
            <circle cx="155" cy="155" r="3" fill={WHITE} />
            {/* Legs */}
            <rect x="62" y="244" width="26" height="30" rx="7" fill="#F48080" />
            <rect x="98" y="250" width="26" height="24" rx="7" fill="#F48080" />
            <rect x="134" y="250" width="26" height="24" rx="7" fill="#F48080" />
            <rect x="168" y="244" width="26" height="30" rx="7" fill="#F48080" />
            {/* Coin slot */}
            <rect x="90" y="102" width="36" height="9" rx="4" fill="#999" />
            {/* Falling coins */}
            <ellipse cx="108" cy={108 + coinDrop * 60} rx="18" ry="6"
              fill={ACCENT} opacity={1 - coinDrop * 0.4} />
            <ellipse cx="96" cy={108 + coinDrop * 90} rx="16" ry="5"
              fill={ACCENT} opacity={Math.max(0, 0.8 - coinDrop * 0.6)} />
          </svg>
        </div>

        {/* Badge */}
        <div style={{
          transform: `scale(${badgeIn})`, transformOrigin: 'center',
          background: BLACK, borderRadius: 16, padding: '14px 36px',
          border: `3px solid ${ACCENT}`,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0, textAlign: 'center' as const }}>
            MOST PEOPLE NEVER CALL
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' as const, letterSpacing: '0.1em' }}>
            THAT&apos;S THE WHOLE BUSINESS MODEL
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: The fix — one 15-minute call ────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const phoneIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const paperAIn = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 9, mass: 0.7 } });
  const paperBIn = spring({ fps, frame: Math.max(0, frame - 85), config: { damping: 9, mass: 0.7 } });
  const savedIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 8, mass: 0.7 } });
  const checkIn = spring({ fps, frame: Math.max(0, frame - 160), config: { damping: 9, mass: 0.6 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>THE FIX</p>
        <p style={{ ...headline(36, GREEN), opacity: titleIn }}>ONE 15-MINUTE CALL</p>

        {/* Phone handset */}
        <svg width="120" height="120" viewBox="0 0 120 120"
          style={{ transform: `scale(${phoneIn})`, transformOrigin: 'center' }}>
          <path d="M28 14 C14 14 10 28 14 44 C22 78 42 98 76 106 C92 110 106 106 106 92 L94 76 C90 66 78 66 70 72 L66 76 C56 70 50 64 44 54 L48 50 C54 42 54 30 44 26 Z"
            fill={GREEN} />
          {/* Speech bubble */}
          <rect x="64" y="10" width="52" height="36" rx="10" fill={WHITE} />
          <path d="M70 46 L64 58 L82 46Z" fill={WHITE} />
          <text x="90" y="33" textAnchor="middle" fill={GREEN}
            fontSize="16" fontFamily="Arial Black">$OFF</text>
        </svg>

        {/* Quote comparison papers */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
          <div style={{
            transform: `scale(${paperAIn})`, transformOrigin: 'center',
            background: '#1e1e1e', border: `3px solid #444`, borderRadius: 14,
            padding: '18px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', margin: 0, letterSpacing: '0.08em' }}>YOUR INSURER</p>
            <p style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, margin: 0 }}>$1,771</p>
          </div>

          <div style={{
            transform: `scale(${paperBIn})`, transformOrigin: 'center',
            background: '#0d2e1e', border: `3px solid ${GREEN}`, borderRadius: 14,
            padding: '18px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: GREEN, margin: 0, letterSpacing: '0.08em' }}>COMPETITOR</p>
            <p style={{ fontFamily: FONT, fontSize: 40, color: GREEN, margin: 0 }}>$1,320</p>
          </div>
        </div>

        {/* Savings badge */}
        <div style={{
          transform: `scale(${savedIn})`, transformOrigin: 'center',
          background: GREEN, borderRadius: 50, padding: '14px 40px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 40, color: WHITE, margin: 0 }}>
            $300–$500 OFF INSTANTLY
          </p>
        </div>

        {/* Checkmark */}
        <svg width="72" height="72" viewBox="0 0 72 72"
          style={{ transform: `scale(${checkIn})`, transformOrigin: 'center' }}>
          <circle cx="36" cy="36" r="34" fill={GREEN} />
          <path d="M16 36 L30 50 L56 22"
            stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — $8,470 and follow ────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const personIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.9 } });
  const c0 = spring({ fps, frame: Math.max(0, frame - 50), config: { damping: 11, mass: 0.8 } });
  const c1 = spring({ fps, frame: Math.max(0, frame - 68), config: { damping: 11, mass: 0.8 } });
  const c2 = spring({ fps, frame: Math.max(0, frame - 86), config: { damping: 11, mass: 0.8 } });
  const c3 = spring({ fps, frame: Math.max(0, frame - 104), config: { damping: 11, mass: 0.8 } });
  const c4 = spring({ fps, frame: Math.max(0, frame - 118), config: { damping: 11, mass: 0.8 } });
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 135), config: { damping: 8, mass: 0.7 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 158), config: { damping: 12, mass: 0.8 } });

  const glowPulse = interpolate(frame, [0, 60, 120, 180], [0.15, 0.5, 0.15, 0.5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const coinSprings: number[] = [c0, c1, c2, c3, c4];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 55%, rgba(239,68,68,${glowPulse * 0.22}) 0%, transparent 62%)`,
      }} />
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(44, WHITE), opacity: titleIn }}>$8,470 BACK</p>
        <p style={{ ...headline(34, ACCENT), opacity: titleIn }}>FROM ONE CALL YOU&apos;VE SKIPPED</p>

        {/* Person + coin stack */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
          {/* Standing person */}
          <svg width="160" height="310" viewBox="0 0 160 310"
            style={{ transform: `scale(${personIn})`, transformOrigin: 'center bottom' }}>
            <circle cx="80" cy="52" r="42" fill="#E8C49A" />
            <ellipse cx="80" cy="20" rx="42" ry="18" fill="#5C4033" />
            <rect x="32" y="96" width="96" height="18" rx="9" fill={GREEN} />
            <rect x="44" y="108" width="72" height="86" rx="12" fill={GREEN} />
            <rect x="10" y="98" width="36" height="80" rx="14" fill={GREEN} />
            <rect x="114" y="98" width="36" height="80" rx="14" fill={GREEN} />
            <rect x="46" y="192" width="30" height="92" rx="12" fill="#4a5568" />
            <rect x="84" y="192" width="30" height="92" rx="12" fill="#4a5568" />
            <ellipse cx="61" cy="292" rx="26" ry="10" fill="#4a5568" />
            <ellipse cx="99" cy="292" rx="26" ry="10" fill="#4a5568" />
          </svg>

          {/* Coin stack */}
          <svg width="110" height="310" viewBox="0 0 110 310">
            {coinSprings.map((sp, i) => {
              const cy = 270 - i * 38;
              return (
                <g key={i} transform={`translate(55, ${cy}) scale(${sp}) translate(-55, ${-cy})`}>
                  <ellipse cx="55" cy={cy} rx="46" ry="13" fill="#059669" />
                  <ellipse cx="55" cy={cy - 7} rx="46" ry="13" fill={ACCENT} />
                  <text x="55" y={cy - 2} textAnchor="middle" fill={WHITE}
                    fontSize="13" fontFamily="Arial Black">$</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CTA */}
        <div style={{
          transform: `scale(${ctaIn})`, transformOrigin: 'center',
          background: ACCENT, borderRadius: 50, padding: '16px 48px',
          boxShadow: `0 0 44px rgba(239,68,68,${glowPulse * 0.85})`,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 42, color: WHITE, margin: 0 }}>
            FOLLOW FOR MORE
          </p>
        </div>

        <p style={{ ...headline(24, WHITE), opacity: subIn }}>
          CALL YOUR INSURER THIS WEEK
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 1: Hook — two price tags on a car ──────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const carIn = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 10, mass: 0.9 } });
  const tag1In = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 9, mass: 0.7 } });
  const tag2In = spring({ fps, frame: Math.max(0, frame - 90), config: { damping: 9, mass: 0.7 } });
  const arrowIn = spring({ fps, frame: Math.max(0, frame - 130), config: { damping: 11, mass: 0.8 } });
  const subIn = spring({ fps, frame: Math.max(0, frame - 155), config: { damping: 14, mass: 0.8 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <p style={{ ...headline(52, ACCENT), transform: `scale(${titleIn})`, transformOrigin: 'center' }}>
          LOYALTY TAX
        </p>

        {/* Car SVG */}
        <svg width="540" height="220" viewBox="0 0 540 220"
          style={{ transform: `scale(${carIn})`, transformOrigin: 'center' }}>
          {/* Car body lower */}
          <rect x="30" y="130" width="480" height="70" rx="14" fill="#2a2a2a" />
          {/* Car cabin */}
          <path d="M100 130 Q130 60 220 52 L340 52 Q430 52 460 130Z" fill="#333" />
          {/* Windshield */}
          <path d="M160 130 Q178 76 220 68 L320 68 Q362 68 382 130Z" fill="rgba(100,180,255,0.25)" stroke="#444" strokeWidth="2" />
          {/* Wheels */}
          <circle cx="120" cy="200" r="36" fill="#1a1a1a" stroke="#555" strokeWidth="6" />
          <circle cx="120" cy="200" r="18" fill="#444" />
          <circle cx="420" cy="200" r="36" fill="#1a1a1a" stroke="#555" strokeWidth="6" />
          <circle cx="420" cy="200" r="18" fill="#444" />
          {/* Headlight */}
          <ellipse cx="502" cy="152" rx="18" ry="12" fill="rgba(255,240,100,0.6)" stroke="#666" strokeWidth="2" />
          {/* Door line */}
          <line x1="270" y1="78" x2="270" y2="130" stroke="#444" strokeWidth="2" />
        </svg>

        {/* Price tags row */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center' }}>
          {/* New customer tag — green */}
          <div style={{
            transform: `scale(${tag1In})`, transformOrigin: 'center',
            background: GREEN, borderRadius: 16, padding: '16px 28px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>NEW CUSTOMER</p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0 }}>$1,200</p>
          </div>

          {/* Arrow */}
          <svg width="60" height="44" viewBox="0 0 60 44"
            style={{ opacity: arrowIn }}>
            <path d="M4 22 L48 22 M34 8 L52 22 L34 36"
              stroke={ACCENT} strokeWidth="6" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* You tag — red */}
          <div style={{
            transform: `scale(${tag2In})`, transformOrigin: 'center',
            background: ACCENT, borderRadius: 16, padding: '16px 28px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>YOU</p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: WHITE, margin: 0 }}>$1,771</p>
          </div>
        </div>

        <p style={{ ...headline(30, WHITE), opacity: subIn }}>SAME COVERAGE. DIFFERENT PRICE.</p>
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
