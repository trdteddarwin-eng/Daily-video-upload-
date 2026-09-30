import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

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
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  lineHeight: 1.15,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// === SCENE 1 — IRA Inheritance Hook ===
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pigScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [30, 55], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOpacity = interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${pigScale})`, marginBottom: 36 }}>
          <svg width="300" height="280" viewBox="0 0 300 280">
            {/* Body */}
            <ellipse cx="148" cy="165" rx="110" ry="93" fill="#F59E0B" />
            {/* Head */}
            <circle cx="244" cy="126" r="52" fill="#F59E0B" />
            {/* Ear */}
            <ellipse cx="230" cy="78" rx="15" ry="11" fill="#D97706" transform="rotate(-20 230 78)" />
            {/* Eye */}
            <circle cx="255" cy="113" r="8" fill={BG_DARK} />
            <circle cx="257" cy="111" r="3" fill={WHITE} />
            {/* Snout */}
            <ellipse cx="275" cy="135" rx="17" ry="12" fill="#D97706" />
            <circle cx="269" cy="135" r="4" fill={BG_DARK} />
            <circle cx="281" cy="135" r="4" fill={BG_DARK} />
            {/* Coin slot */}
            <rect x="120" y="68" width="38" height="7" rx="3" fill={BG_DARK} />
            {/* Tail */}
            <path d="M 38 153 Q 15 130 31 108 Q 47 86 37 66" fill="none" stroke="#D97706" strokeWidth="9" strokeLinecap="round" />
            {/* Legs */}
            <rect x="68" y="234" width="26" height="42" rx="9" fill="#D97706" />
            <rect x="110" y="240" width="26" height="36" rx="9" fill="#D97706" />
            <rect x="157" y="240" width="26" height="36" rx="9" fill="#D97706" />
            <rect x="199" y="234" width="26" height="42" rx="9" fill="#D97706" />
            {/* Gift bow */}
            <path d="M 125 63 Q 139 50 153 63" fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <path d="M 125 63 Q 116 53 125 44 Q 134 35 140 44" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <path d="M 153 63 Q 162 53 153 44 Q 144 35 138 44" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            {/* Crack — fades in */}
            <path
              d="M 126 120 L 110 154 L 130 160 L 106 196"
              fill="none"
              stroke={ACCENT}
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity={crackOpacity}
            />
          </svg>
        </div>
        <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(52, WHITE), margin: 0 }}>IRA INHERITANCE</p>
          <p style={{ ...headline(30, ACCENT), margin: '16px 0 0' }}>TAX BOMB HIDDEN INSIDE</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#9CA3AF', textAlign: 'center', margin: '20px 0 0', letterSpacing: '0.04em' }}>
            A 2020 law changed everything.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 2 — Stretch IRA (the old rule) ===
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const baselineW = interpolate(frame, [15, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numBars = 25;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center', marginBottom: 48 }}>
          <p style={{ ...headline(52, '#10B981'), margin: 0 }}>STRETCH IRA</p>
          <p style={{ ...headline(24, BLACK), margin: '12px 0 0' }}>THE OLD RULE: LIFETIME WITHDRAWALS</p>
        </div>

        {/* Person + bar chart row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
          <svg width="40" height="72" viewBox="0 0 40 72">
            <circle cx="20" cy="12" r="11" fill={BLACK} />
            <rect x="11" y="25" width="18" height="26" rx="7" fill={BLACK} />
            <rect x="9" y="50" width="9" height="17" rx="4" fill={BLACK} />
            <rect x="22" y="50" width="9" height="17" rx="4" fill={BLACK} />
          </svg>
          {Array.from({ length: Math.max(0, Math.floor(numBars)) }).map((_, i) => {
            const bp = interpolate(frame, [18 + i * 3, 36 + i * 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 36 * bp,
                  background: '#10B981',
                  borderRadius: '3px 3px 0 0',
                }}
              />
            );
          })}
        </div>

        {/* Baseline */}
        <div style={{ width: `${88 * baselineW}%`, height: 3, background: BLACK, alignSelf: 'flex-start', marginLeft: '6%', marginBottom: 28 }} />

        <p style={{ ...headline(18, '#6B7280'), margin: 0 }}>
          ~30 YEARS — SMALL TAX BITE EACH YEAR
        </p>
        <p style={{ opacity: subOpacity, fontFamily: FONT, fontSize: 22, color: '#10B981', textAlign: 'center', margin: '16px 0 0', letterSpacing: '0.04em' }}>
          The ultimate inheritance hack. Until 2020.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 3 — SECURE Act: 10-Year Rule ===
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [10, 38], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numYears = 10;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...headline(30, ACCENT), margin: 0 }}>SECURE ACT 2020</p>
        </div>

        {/* Calendar */}
        <div style={{ transform: `scale(${calScale})`, position: 'relative', width: 280, height: 256, marginBottom: 36 }}>
          <svg width="280" height="256" viewBox="0 0 280 256" style={{ position: 'absolute' as const, top: 0, left: 0 }}>
            <rect x="10" y="42" width="260" height="204" rx="14" fill="#1F2937" stroke={ACCENT} strokeWidth="3" />
            <rect x="10" y="42" width="260" height="54" rx="14" fill={ACCENT} />
            <rect x="10" y="80" width="260" height="16" fill={ACCENT} />
            <rect x="80" y="22" width="14" height="40" rx="7" fill="#374151" />
            <rect x="186" y="22" width="14" height="40" rx="7" fill="#374151" />
          </svg>
          <div style={{ position: 'absolute' as const, top: 88, left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 108, color: WHITE, lineHeight: 1 }}>10</span>
          </div>
          <div style={{ position: 'absolute' as const, bottom: 14, left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>YEARS</span>
          </div>
        </div>

        {/* Countdown bars */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 28 }}>
          {Array.from({ length: Math.max(0, Math.floor(numYears)) }).map((_, i) => {
            const fill = interpolate(frame, [55 + i * 10, 70 + i * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 10,
                  borderRadius: 5,
                  border: '2px solid #EF4444',
                  background: `rgba(239, 68, 68, ${fill})`,
                }}
              />
            );
          })}
        </div>

        <div style={{ opacity: bottomOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(26, WHITE), margin: 0 }}>DRAIN ENTIRE IRA IN 10 YEARS</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', textAlign: 'center', margin: '12px 0 0', letterSpacing: '0.04em' }}>
            or face massive tax consequences
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 4 — Tax Bracket Trap ===
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const counter = interpolate(frame, [85, 185], [0, 85000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const brackets = [
    { label: '10%', color: '#10B981', h: 48 },
    { label: '12%', color: '#34D399', h: 56 },
    { label: '22%', color: '#FBBF24', h: 66 },
    { label: '24%', color: '#F97316', h: 74 },
    { label: '32%', color: '#EF4444', h: 82 },
    { label: '35%', color: '#DC2626', h: 82 },
    { label: '37%', color: '#7F1D1D', h: 82 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center', marginBottom: 44 }}>
          <p style={{ ...headline(48, BLACK), margin: 0 }}>THE BRACKET TRAP</p>
        </div>

        {/* Bracket bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 36 }}>
          {brackets.map((b, i) => {
            const bp = interpolate(frame, [18 + i * 14, 44 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {i === brackets.length - 1 && (
                  <div style={{ opacity: arrowOpacity, fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center' }}>▲</div>
                )}
                <div style={{ width: 84, height: b.h * bp, background: b.color, borderRadius: '5px 5px 0 0' }} />
                <span style={{ fontFamily: FONT, fontSize: 17, color: BLACK, fontWeight: 700, letterSpacing: '0.03em' }}>{b.label}</span>
              </div>
            );
          })}
        </div>

        {/* Counter */}
        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#374151'), margin: 0 }}>EXTRA TAXES OWED:</p>
          <p style={{ fontFamily: FONT, fontSize: 76, color: ACCENT, textAlign: 'center', margin: '8px 0 0', lineHeight: 1 }}>
            ${Math.floor(counter).toLocaleString()}
          </p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', textAlign: 'center', margin: '12px 0 0', letterSpacing: '0.04em' }}>
            vs. spreading withdrawals over 10 years
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 5 — Wrong Way vs Smart Way ===
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numYears = 10;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center', marginBottom: 40 }}>
          <p style={{ ...headline(42, WHITE), margin: 0 }}>TIMING MATTERS</p>
        </div>

        <div style={{ display: 'flex', gap: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Wrong way chart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(20, ACCENT), margin: 0 }}>WRONG WAY</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
              {Array.from({ length: Math.max(0, Math.floor(numYears)) }).map((_, i) => {
                const isLast = i === numYears - 1;
                const targetH = isLast ? 215 : 16;
                const bp = interpolate(frame, [28 + i * 7, 50 + i * 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: targetH * bp,
                      background: isLast ? ACCENT : '#4B5563',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: Math.max(0, Math.floor(numYears)) }).map((_, i) => (
                <div key={i} style={{ width: 32, textAlign: 'center' }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', textAlign: 'center', margin: '2px 0 0', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>YEAR</p>
          </div>

          {/* Smart way chart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(20, '#10B981'), margin: 0 }}>SMART WAY</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
              {Array.from({ length: Math.max(0, Math.floor(numYears)) }).map((_, i) => {
                const bp = interpolate(frame, [50 + i * 7, 72 + i * 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 78 * bp,
                      background: '#10B981',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: Math.max(0, Math.floor(numYears)) }).map((_, i) => (
                <div key={i} style={{ width: 32, textAlign: 'center' }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#9CA3AF', textAlign: 'center', margin: '2px 0 0', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>YEAR</p>
          </div>
        </div>

        <div style={{ opacity: bottomOpacity, textAlign: 'center', marginTop: 32 }}>
          <p style={{ ...headline(22, WHITE), margin: 0 }}>ONE GIANT SPIKE = ONE GIANT TAX BILL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// === SCENE 6 — The Fix / CTA ===
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const shieldScale = spring({ frame: Math.max(0, frame - 62), fps, config: { damping: 12, stiffness: 90 } });
  const ctaOpacity = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [80, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numBars = 10;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center', marginBottom: 40 }}>
          <p style={{ ...headline(52, BLACK), margin: 0 }}>THE FIX</p>
        </div>

        {/* 10 equal green bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12, justifyContent: 'center' }}>
          {Array.from({ length: Math.max(0, Math.floor(numBars)) }).map((_, i) => {
            const barScale = spring({ frame: Math.max(0, frame - 18 - i * 11), fps, config: { damping: 14, stiffness: 100 } });
            return (
              <div
                key={i}
                style={{
                  width: 58,
                  height: 78 * barScale,
                  background: '#10B981',
                  borderRadius: '6px 6px 0 0',
                }}
              />
            );
          })}
        </div>
        <div style={{ opacity: labelOpacity }}>
          <p style={{ ...headline(18, '#6B7280'), margin: '0 0 36px' }}>
            EQUAL WITHDRAWALS — ALL 10 YEARS
          </p>
        </div>

        {/* Roth IRA shield */}
        <div style={{ transform: `scale(${shieldScale})`, marginBottom: 16, position: 'relative' as const, width: 130, height: 152 }}>
          <svg width="130" height="152" viewBox="0 0 130 152" style={{ position: 'absolute' as const, top: 0, left: 0 }}>
            <path d="M 65 8 L 120 28 L 120 84 Q 120 126 65 148 Q 10 126 10 84 L 10 28 Z" fill="#F59E0B" />
            <path d="M 65 22 L 108 38 L 108 82 Q 108 118 65 136 Q 22 118 22 82 L 22 38 Z" fill="#D97706" />
          </svg>
          <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 50, color: WHITE, lineHeight: 1 }}>$</span>
          </div>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#F59E0B', letterSpacing: '0.1em', textTransform: 'uppercase' as const, textAlign: 'center', margin: '0 0 28px' }}>
          ROTH IRA = 100% TAX FREE
        </p>

        {/* CTA */}
        <div style={{ opacity: ctaOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(30, ACCENT), margin: 0 }}>SPREAD IT. SAVE $85K.</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', textAlign: 'center', margin: '14px 0 0', letterSpacing: '0.03em' }}>
            Follow for more money traps like this.
          </p>
        </div>
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
