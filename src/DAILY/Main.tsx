import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GRAY = '#9CA3AF';
const RED = '#EF4444';
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

const PersonSVG: React.FC<{ color: string }> = ({ color }) => (
  <svg width="110" height="190" viewBox="0 0 110 190">
    <circle cx="55" cy="36" r="28" fill={color} />
    <path d="M8 190 Q8 125 55 115 Q102 125 102 190 Z" fill={color} />
  </svg>
);

// ─── SCENE 2 ─────────────────────────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const brainIn = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 13, stiffness: 65 } });
  const labelIn = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 60 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 12, stiffness: 55 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const ctaY = interpolate(ctaIn, [0, 1], [24, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(46, BLACK), marginBottom: 44, opacity: titleIn, transform: `translateY(${titleY}px)`, lineHeight: 1.2 }}>
          THE STRANGER<br />IN YOUR HEAD
        </p>

        {/* Brain SVG */}
        <div style={{ transform: `scale(${brainIn})`, marginBottom: 36 }}>
          <svg width="300" height="230" viewBox="0 0 300 230">
            <defs>
              <clipPath id="leftHalf">
                <rect x="0" y="0" width="150" height="230" />
              </clipPath>
              <clipPath id="rightHalf">
                <rect x="150" y="0" width="150" height="230" />
              </clipPath>
            </defs>
            {/* Brain base shape */}
            <path d="M150 18 Q210 28 242 75 Q274 122 254 172 Q234 214 150 214 Q66 214 46 172 Q26 122 58 75 Q90 28 150 18 Z" fill="#E5E7EB" stroke={BLACK} strokeWidth="2" />
            {/* Present half - amber */}
            <path d="M150 18 Q210 28 242 75 Q274 122 254 172 Q234 214 150 214 Q66 214 46 172 Q26 122 58 75 Q90 28 150 18 Z" fill={ACCENT} fillOpacity="0.45" clipPath="url(#leftHalf)" />
            {/* Future half - gray */}
            <path d="M150 18 Q210 28 242 75 Q274 122 254 172 Q234 214 150 214 Q66 214 46 172 Q26 122 58 75 Q90 28 150 18 Z" fill={GRAY} fillOpacity="0.3" clipPath="url(#rightHalf)" />
            {/* Brain folds */}
            <path d="M112 75 Q132 65 150 75 Q168 85 188 75" fill="none" stroke={BLACK} strokeWidth="2" />
            <path d="M94 118 Q122 108 150 118 Q178 128 206 118" fill="none" stroke={BLACK} strokeWidth="2" />
            <path d="M100 158 Q125 148 150 158 Q175 168 200 158" fill="none" stroke={BLACK} strokeWidth="2" />
            {/* Dividing line */}
            <line x1="150" y1="18" x2="150" y2="214" stroke={BLACK} strokeWidth="2" strokeDasharray="6,5" />
          </svg>
        </div>

        {/* Labels */}
        <div style={{ display: 'flex', gap: 56, marginBottom: 36, opacity: labelIn }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0, letterSpacing: '0.08em' }}>PRESENT</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '4px 0 0' }}>Feels real</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 30, color: GRAY, margin: 0, letterSpacing: '0.08em' }}>FUTURE</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: GRAY, margin: '4px 0 0' }}>Feels like a stranger</p>
          </div>
        </div>

        {/* Stanford callout */}
        <div style={{
          opacity: ctaIn,
          transform: `translateY(${ctaY}px)`,
          background: BLACK,
          borderRadius: 16,
          padding: '18px 40px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: 0, textAlign: 'center' }}>
            Stanford MRI scans confirmed it
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─────────────────────────────────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const progress = interpolate(frame, [25, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapIn = spring({ frame: Math.max(0, frame - 115), fps, config: { damping: 12, stiffness: 50 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const gapScale = gapIn;

  const totalBills = Math.max(0, Math.floor(8));
  const stackH = 240;
  const billH = 22;
  const billGap = 30;
  const shrunkStackH = stackH * 0.55;
  const currentH = interpolate(progress, [0, 1], [stackH, shrunkStackH]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(44, WHITE), marginBottom: 8, opacity: titleIn, transform: `translateY(${titleY}px)`, lineHeight: 1.2 }}>
          YOUR BRAIN CUTS<br />YOUR FUTURE IN HALF
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, textAlign: 'center', marginBottom: 44, opacity: titleIn }}>
          40% unconscious discount
        </p>

        {/* Money stacks */}
        <div style={{ display: 'flex', gap: 56, alignItems: 'flex-end', marginBottom: 44 }}>
          {/* Full stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>Should Save</p>
            <svg width="96" height={stackH + 8} viewBox={`0 0 96 ${stackH + 8}`}>
              {Array.from({ length: totalBills }).map((_, i) => (
                <rect key={i} x="8" y={(stackH - billH) - i * billGap} width="80" height={billH} rx="4" fill={ACCENT} opacity={String(0.9 - i * 0.04)} />
              ))}
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, margin: 0 }}>$297K</p>
          </div>

          {/* Shrinking stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: GRAY, margin: 0 }}>Brain Says</p>
            <svg width="96" height={stackH + 8} viewBox={`0 0 96 ${stackH + 8}`}>
              {Array.from({ length: totalBills }).map((_, i) => {
                const billTop = (stackH - billH) - i * billGap;
                const visible = billTop >= (stackH + 8 - currentH);
                return visible ? (
                  <rect key={i} x="8" y={billTop} width="80" height={billH} rx="4" fill={GRAY} opacity="0.55" />
                ) : null;
              })}
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 26, color: GRAY, margin: 0 }}>$119K</p>
          </div>
        </div>

        {/* Gap badge */}
        <div style={{
          opacity: gapScale,
          transform: `scale(${gapScale})`,
          background: '#1A1A1A',
          borderRadius: 20,
          padding: '22px 52px',
          borderTop: `4px solid ${RED}`,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: 0 }}>Retirement Gap</p>
          <p style={{ ...headline(58, RED), marginTop: 4 }}>$178,000</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: GRAY, margin: 0 }}>on a $60K salary</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 1 ─────────────────────────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const leftIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 70 } });
  const rightIn = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 70 } });
  const statIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 55 } });

  const titleY = interpolate(titleIn, [0, 1], [40, 0]);
  const statY = interpolate(statIn, [0, 1], [40, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(50, ACCENT), marginBottom: 56, opacity: titleIn, transform: `translateY(${titleY}px)` }}>
          WHY YOU WON'T SAVE
        </p>

        {/* Two person silhouettes with disconnect */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end', marginBottom: 52 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: leftIn }}>
            <PersonSVG color={ACCENT} />
            <p style={{ ...headline(26, WHITE), letterSpacing: '0.08em' }}>YOU TODAY</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 60, opacity: rightIn }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <line x1="4" y1="32" x2="60" y2="32" stroke={GRAY} strokeWidth="3" strokeDasharray="8,6" />
              <line x1="12" y1="12" x2="52" y2="52" stroke={RED} strokeWidth="5" strokeLinecap="round" />
              <line x1="52" y1="12" x2="12" y2="52" stroke={RED} strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: rightIn }}>
            <PersonSVG color={GRAY} />
            <p style={{ ...headline(26, GRAY), letterSpacing: '0.08em' }}>YOU IN 30 YRS</p>
          </div>
        </div>

        {/* Stat card */}
        <div style={{
          opacity: statIn,
          transform: `translateY(${statY}px)`,
          background: '#1C1C1C',
          borderRadius: 20,
          padding: '28px 52px',
          borderLeft: `6px solid ${ACCENT}`,
          textAlign: 'center',
        }}>
          <p style={{ ...headline(56, ACCENT), marginBottom: 8 }}>55%</p>
          <p style={{ ...headline(22, WHITE), letterSpacing: '0.06em' }}>HAVE UNDER $5K SAVED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4 ─────────────────────────────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const barProgress = interpolate(frame, [20, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 50 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const badgeY = interpolate(badgeIn, [0, 1], [24, 0]);

  const years = [
    { label: 'Y1', pct: 3 },
    { label: 'Y2', pct: 4 },
    { label: 'Y3', pct: 5 },
    { label: 'Y4', pct: 6 },
    { label: 'Y5', pct: 7 },
    { label: 'Y6', pct: 8 },
    { label: 'Y7', pct: 9 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 50px',
      }}>
        <p style={{ ...headline(46, BLACK), marginBottom: 10, opacity: titleIn, transform: `translateY(${titleY}px)` }}>
          AUTO-ESCALATION
        </p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center', marginBottom: 44, letterSpacing: '0.05em', opacity: titleIn }}>
          Bypasses your brain entirely
        </p>

        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 240, marginBottom: 36 }}>
          {years.map((yr, i) => {
            const startPct = i * 0.11;
            const endPct = startPct + 0.35;
            const barH = interpolate(barProgress, [startPct, endPct], [0, yr.pct * 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={yr.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 64,
                  height: barH,
                  background: `linear-gradient(to top, ${ACCENT}, #FDE68A)`,
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: 8,
                  overflow: 'hidden',
                }}>
                  {barH > 32 && (
                    <span style={{ fontFamily: FONT, fontSize: 18, color: BLACK }}>{yr.pct}%</span>
                  )}
                </div>
                <span style={{ fontFamily: FONT, fontSize: 18, color: BLACK }}>{yr.label}</span>
              </div>
            );
          })}
        </div>

        {/* Badge */}
        <div style={{
          opacity: badgeIn,
          transform: `translateY(${badgeY}px)`,
          background: BLACK,
          borderRadius: 16,
          padding: '18px 44px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: 0, textAlign: 'center' }}>
            +1% per year — automatically
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─────────────────────────────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const barProgress = interpolate(frame, [20, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffIn = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 12, stiffness: 50 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const diffScale = diffIn;

  const leftH = interpolate(barProgress, [0, 0.55], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightH = interpolate(barProgress, [0.15, 1], [0, 310], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(44, WHITE), marginBottom: 48, opacity: titleIn, transform: `translateY(${titleY}px)`, lineHeight: 1.2 }}>
          SAME INCOME.<br />TWO FUTURES.
        </p>

        {/* Comparison bars */}
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-end', marginBottom: 44 }}>
          {/* Without */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 118,
              height: leftH,
              background: RED,
              borderRadius: '12px 12px 0 0',
            }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 34, color: RED, margin: 0 }}>$340K</p>
              <p style={{ fontFamily: FONT, fontSize: 20, color: GRAY, margin: '4px 0 0' }}>Without</p>
            </div>
          </div>

          {/* With */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 118,
              height: rightH,
              background: `linear-gradient(to top, ${ACCENT}, #FDE68A)`,
              borderRadius: '12px 12px 0 0',
            }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>$557K</p>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: '4px 0 0' }}>With</p>
            </div>
          </div>
        </div>

        {/* Difference badge */}
        <div style={{
          opacity: diffScale,
          transform: `scale(${diffScale})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '20px 52px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>+$217,000 difference</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0' }}>One automated setting</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6 ─────────────────────────────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const phoneIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 13, stiffness: 65 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 55 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const pulseScale = interpolate(frame % 46, [0, 23, 46], [1, 1.07, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <p style={{ ...headline(48, BLACK), marginBottom: 8, opacity: titleIn, transform: `translateY(${titleY}px)` }}>
          DO THIS TODAY
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: GRAY, textAlign: 'center', marginBottom: 36, opacity: titleIn }}>
          2 minutes. One click.
        </p>

        {/* Phone with HR portal */}
        <div style={{ transform: `scale(${phoneIn})`, marginBottom: 36 }}>
          <svg width="190" height="350" viewBox="0 0 190 350">
            <rect x="8" y="0" width="174" height="350" rx="26" fill={BLACK} />
            <rect x="18" y="10" width="154" height="330" rx="18" fill="#1A1A1A" />
            <rect x="28" y="24" width="134" height="28" rx="6" fill="#2A2A2A" />
            <text x="52" y="43" fontFamily="Arial" fontSize="13" fill={GRAY}>HR Portal</text>
            <rect x="28" y="68" width="134" height="26" rx="5" fill="#242424" />
            <text x="38" y="86" fontFamily="Arial" fontSize="11" fill={GRAY}>My Pay</text>
            <rect x="28" y="104" width="134" height="26" rx="5" fill="#242424" />
            <text x="38" y="122" fontFamily="Arial" fontSize="11" fill={GRAY}>Benefits</text>
            <rect x="28" y="140" width="134" height="26" rx="5" fill="#242424" />
            <text x="38" y="158" fontFamily="Arial" fontSize="11" fill={GRAY}>Time Off</text>
            {/* Highlighted auto-escalation row */}
            <rect x="28" y="176" width="134" height="38" rx="8" fill={ACCENT} />
            <text x="38" y="200" fontFamily="Arial" fontSize="12" fill={BLACK} fontWeight="bold">Auto-Escalation ✓</text>
            {/* Finger indicator */}
            <circle cx="132" cy="195" r="16" fill="white" fillOpacity="0.2" />
            <circle cx="132" cy="195" r="9" fill="white" fillOpacity="0.55" />
          </svg>
        </div>

        {/* Pulsing CTA */}
        <div style={{
          opacity: ctaIn,
          transform: `scale(${pulseScale})`,
          background: ACCENT,
          borderRadius: 20,
          padding: '22px 52px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, letterSpacing: '0.04em' }}>
            WORTH $178,000
          </p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0' }}>
            to your future self
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ─────────────────────────────────────────────────────────────

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
