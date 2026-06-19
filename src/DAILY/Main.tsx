import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

// ─── Scene 2: DALBAR 30-year bar comparison ───────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const bar1W = interpolate(frame, [20, 100], [0, 290], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const bar2W = interpolate(frame, [60, 155], [0, 750], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const gapIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 22, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>30 YEARS OF</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>INVESTOR DATA</p>
      </div>

      <div style={{ position: 'absolute', top: 315, left: 36, right: 36 }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 24, color: '#6B7280', margin: 0 }}>AVERAGE INVESTOR</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', margin: 0 }}>2.9% / YR</p>
          </div>
          <div style={{ width: '100%', height: 68, background: '#E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: Math.floor(bar1W), height: 68, background: '#EF4444', borderRadius: 10 }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 24, color: '#6B7280', margin: 0 }}>S&amp;P 500 INDEX</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: GREEN, margin: 0 }}>7.5% / YR</p>
          </div>
          <div style={{ width: '100%', height: 68, background: '#E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: Math.floor(bar2W), height: 68, background: GREEN, borderRadius: 10 }} />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 690, left: 36, right: 36, textAlign: 'center' }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: 0 }}>SOURCE: DALBAR 30-YEAR STUDY</p>
      </div>

      <div style={{
        position: 'absolute', bottom: 108, left: 40, right: 40, textAlign: 'center',
        opacity: gapIn, transform: `translateY(${interpolate(gapIn, [0, 1], [18, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          That <span style={{ color: ACCENT }}>4.6% behavior gap</span> is the cost of checking too often.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: $238K vs $840K — the math ───────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const bar1W = interpolate(frame, [18, 110], [0, 288], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const bar2W = interpolate(frame, [55, 155], [0, 750], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const diffIn = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 20, stiffness: 90 } });
  const diffCount = interpolate(frame, [160, 215], [0, 602], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(42, WHITE)}>$100,000 INVESTED</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 6 }}>FOR 30 YEARS</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 36, right: 36 }}>
        <div style={{ marginBottom: 38 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#EF4444', margin: '0 0 10px' }}>
            CHECKING DAILY (2.9%)
          </p>
          <div style={{ width: '100%', height: 72, background: '#333', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              width: Math.floor(bar1W), height: 72, background: '#EF4444', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16,
            }}>
              {bar1W > 120 && <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE }}>$238K</span>}
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: GREEN, margin: '0 0 10px' }}>
            HANDS-OFF INVESTING (7.5%)
          </p>
          <div style={{ width: '100%', height: 72, background: '#333', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              width: Math.floor(bar2W), height: 72, background: GREEN, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16,
            }}>
              {bar2W > 120 && <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE }}>$840K</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center',
        opacity: diffIn, transform: `scale(${diffIn})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>DIFFERENCE:</p>
        <p style={{ fontFamily: FONT, fontSize: 112, color: ACCENT, margin: 0, lineHeight: 1 }}>
          ${Math.floor(diffCount)}K
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: Brain + loss aversion boxes ─────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const brainIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 20, stiffness: 70 } });
  const boxesIn = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 22, stiffness: 100 } });
  const ruleIn = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 22, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>YOUR BRAIN ON</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>A RED DAY</p>
      </div>

      <div style={{
        position: 'absolute', top: 275, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: brainIn, transform: `scale(${brainIn})`,
      }}>
        <svg width="230" height="210" viewBox="0 0 230 210">
          <ellipse cx="115" cy="95" rx="88" ry="74" fill="#FDE68A" />
          <path d="M62 74 Q52 54 67 38 Q82 22 98 42" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M98 42 Q108 26 120 40 Q132 24 146 38" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M146 38 Q162 24 172 42 Q184 55 174 74" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 105 Q88 84 103 100 Q115 78 128 100 Q142 80 158 104" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="90" cy="122" r="7" fill="#D97706" />
          <circle cx="140" cy="122" r="7" fill="#D97706" />
          <path d="M97 148 Q115 138 133 148" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 510, left: 36, right: 36,
        display: 'flex', gap: 20,
        opacity: boxesIn, transform: `scale(${boxesIn})`,
      }}>
        <div style={{ flex: 1, background: '#FEE2E2', borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#EF4444', margin: '0 0 6px' }}>LOSS FEELS</p>
          <p style={{ fontFamily: FONT, fontSize: 72, color: '#EF4444', margin: 0, lineHeight: 1 }}>2X</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#6B7280', margin: '6px 0 0', lineHeight: 1.3 }}>
            WORSE than gains feel good
          </p>
        </div>
        <div style={{ flex: 1, background: '#D1FAE5', borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: GREEN, margin: '0 0 6px' }}>GAIN FEELS</p>
          <p style={{ fontFamily: FONT, fontSize: 72, color: GREEN, margin: 0, lineHeight: 1 }}>1X</p>
          <p style={{ fontFamily: FONT, fontSize: 16, color: '#6B7280', margin: '6px 0 0', lineHeight: 1.3 }}>
            Normal emotional response
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 108, left: 40, right: 40, textAlign: 'center',
        opacity: ruleIn, transform: `translateY(${interpolate(ruleIn, [0, 1], [16, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          So you <span style={{ color: '#EF4444' }}>panic-sell on red days</span> — and miss the rebound every time.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: Monthly calendar + compound advantage bar ───────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const calIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 80 } });
  const statIn = spring({ frame: Math.max(0, frame - 98), fps, config: { damping: 22, stiffness: 100 } });
  const barProg = interpolate(frame, [122, 196], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const barW = Math.max(0, Math.floor(barProg * 740));
  const ctaOp = interpolate(frame, [192, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, WHITE)}>THE FIX IS</p>
        <p style={{ ...headline(44, GREEN), marginTop: 6 }}>DEAD SIMPLE</p>
      </div>

      <div style={{
        position: 'absolute', top: 285, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: calIn, transform: `scale(${calIn})`,
      }}>
        <svg width="240" height="210" viewBox="0 0 240 210">
          <rect x="10" y="34" width="220" height="166" rx="14" fill={WHITE} />
          <rect x="10" y="34" width="220" height="60" rx="14" fill={GREEN} />
          <rect x="10" y="76" width="220" height="18" fill={GREEN} />
          <rect x="58" y="16" width="14" height="28" rx="6" fill="#6B7280" />
          <rect x="168" y="16" width="14" height="28" rx="6" fill="#6B7280" />
          <text x="120" y="62" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black">CHECK ONCE</text>
          <text x="120" y="87" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black">A MONTH</text>
          <circle cx="120" cy="155" r="42" fill="#D1FAE5" />
          <path d="M97 155 L114 172 L145 134" stroke={GREEN} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 535, left: 36, right: 36, textAlign: 'center',
        opacity: statIn, transform: `scale(${statIn})`,
      }}>
        <div style={{ background: '#1E1E1E', borderRadius: 18, paddingTop: 22, paddingBottom: 22, paddingLeft: 28, paddingRight: 28 }}>
          <p style={headline(26, WHITE)}>MONTHLY CHECKERS EARN</p>
          <p style={{ fontFamily: FONT, fontSize: 72, color: GREEN, margin: '6px 0', lineHeight: 1 }}>+2%</p>
          <p style={headline(24, WHITE)}>MORE PER YEAR THAN DAILY</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 162, left: 36, right: 36 }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: '0 0 8px', textAlign: 'center' }}>
          30-YEAR COMPOUNDING ADVANTAGE
        </p>
        <div style={{ width: '100%', height: 48, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            width: barW, height: 48, background: GREEN, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {barW > 80 && <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}>$602K MORE</span>}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 94, left: 40, right: 40, textAlign: 'center', opacity: ctaOp }}>
        <p style={headline(30, WHITE)}>AND THERE&apos;S MORE...</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: Three-step fix + pulsing CTA ────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const step1In = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 22, stiffness: 100 } });
  const step2In = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 22, stiffness: 100 } });
  const step3In = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 22, stiffness: 100 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 162), fps, config: { damping: 26, stiffness: 65 } });
  const pulse = interpolate(frame % 38, [0, 19, 38], [1, 1.07, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(50, BLACK)}>THREE MOVES</p>
        <p style={{ ...headline(50, GREEN), marginTop: 4 }}>THAT CHANGE EVERYTHING</p>
      </div>

      {/* Step 1 */}
      <div style={{
        position: 'absolute', top: 310, left: 36, right: 36,
        opacity: step1In, transform: `translateX(${interpolate(step1In, [0, 1], [-60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="72" viewBox="0 0 56 72">
            <rect x="4" y="4" width="48" height="64" rx="10" fill="#374151" />
            <rect x="12" y="14" width="32" height="38" rx="6" fill="#111827" />
            <circle cx="28" cy="60" r="4" fill="#6B7280" />
            <path d="M16 24 L40 48" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <path d="M40 24 L16 48" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div>
            <p style={headline(28, ACCENT)}>1. DELETE THE APP</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>Or log out. Make checking harder.</p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{
        position: 'absolute', top: 468, left: 36, right: 36,
        opacity: step2In, transform: `translateX(${interpolate(step2In, [0, 1], [60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="62" viewBox="0 0 56 62">
            <rect x="2" y="12" width="52" height="48" rx="8" fill={WHITE} />
            <rect x="2" y="12" width="52" height="20" rx="8" fill={GREEN} />
            <rect x="2" y="24" width="52" height="8" fill={GREEN} />
            <rect x="14" y="4" width="8" height="14" rx="3" fill="#9CA3AF" />
            <rect x="34" y="4" width="8" height="14" rx="3" fill="#9CA3AF" />
            <circle cx="28" cy="44" r="10" fill={GREEN} />
            <path d="M22 44 L27 49 L36 38" stroke={WHITE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div>
            <p style={headline(28, GREEN)}>2. CHECK QUARTERLY</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>4 times a year is plenty.</p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{
        position: 'absolute', top: 626, left: 36, right: 36,
        opacity: step3In, transform: `translateX(${interpolate(step3In, [0, 1], [-60, 0])}px)`,
      }}>
        <div style={{ background: '#F3F4F6', borderRadius: 16, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill={ACCENT} />
            <circle cx="28" cy="28" r="10" fill={WHITE} />
            <rect x="25" y="4" width="6" height="10" rx="3" fill={WHITE} />
            <rect x="25" y="42" width="6" height="10" rx="3" fill={WHITE} />
            <rect x="4" y="25" width="10" height="6" rx="3" fill={WHITE} />
            <rect x="42" y="25" width="10" height="6" rx="3" fill={WHITE} />
            <rect x="10" y="10" width="6" height="6" rx="2" fill={WHITE} />
            <rect x="40" y="10" width="6" height="6" rx="2" fill={WHITE} />
            <rect x="10" y="40" width="6" height="6" rx="2" fill={WHITE} />
            <rect x="40" y="40" width="6" height="6" rx="2" fill={WHITE} />
          </svg>
          <div>
            <p style={headline(28, ACCENT)}>3. AUTOMATE BUYS</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: '4px 0 0' }}>Set it, forget it, compound.</p>
          </div>
        </div>
      </div>

      {/* Pulsing CTA */}
      <div style={{
        position: 'absolute', bottom: 80, left: 60, right: 60,
        display: 'flex', justifyContent: 'center',
        opacity: ctaIn, transform: `scale(${pulse})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14,
          paddingTop: 18, paddingBottom: 18, paddingLeft: 40, paddingRight: 40,
        }}>
          <p style={headline(32, WHITE)}>FOLLOW FOR MORE</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Root composition ──────────────────────────────────────────────────────────
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

// ─── Scene 1: Hook — portfolio app on phone, $47K cost reveal ────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const phoneIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 22, stiffness: 60 } });
  const chartProg = interpolate(frame, [30, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const drawnLength = Math.max(0, Math.floor(chartProg * 240));
  const numIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 20, stiffness: 100 } });
  const numCount = interpolate(frame, [145, 205], [0, 47], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(68, WHITE)}>CHECKING YOUR</p>
        <p style={{ ...headline(68, ACCENT), marginTop: 4 }}>PORTFOLIO</p>
        <p style={{ ...headline(68, WHITE), marginTop: 4 }}>DAILY?</p>
      </div>

      {/* Phone with animated chart */}
      <div style={{
        position: 'absolute', top: 445, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: phoneIn, transform: `scale(${phoneIn})`,
      }}>
        <svg width="220" height="280" viewBox="0 0 220 280">
          <rect x="10" y="4" width="200" height="272" rx="24" fill="#1F2937" />
          <rect x="18" y="18" width="184" height="244" rx="16" fill="#111827" />
          <rect x="26" y="30" width="168" height="26" rx="6" fill="#374151" />
          <text x="110" y="49" textAnchor="middle" fontSize="15" fill={WHITE} fontFamily="Arial Black">PORTFOLIO</text>
          <rect x="26" y="66" width="168" height="110" rx="6" fill="#1F2937" />
          <polyline
            points="30,170 55,138 78,158 102,108 124,132 148,96 168,118 190,84"
            fill="none"
            stroke={ACCENT}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={240}
            strokeDashoffset={Math.max(0, 240 - drawnLength)}
          />
          <text x="110" y="216" textAnchor="middle" fontSize="28" fill={GREEN} fontFamily="Arial Black">$142,830</text>
          <text x="110" y="244" textAnchor="middle" fontSize="13" fill="#6B7280" fontFamily="Arial Black">TODAY</text>
          <circle cx="110" cy="260" r="8" fill="#374151" />
        </svg>
      </div>

      {/* $47K cost badge */}
      <div style={{
        position: 'absolute', bottom: 96, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: numIn, transform: `scale(${numIn})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 18,
          paddingTop: 20, paddingBottom: 20, paddingLeft: 44, paddingRight: 44,
          textAlign: 'center',
        }}>
          <p style={headline(34, WHITE)}>THIS HABIT COSTS YOU</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: WHITE, margin: 0, lineHeight: 1 }}>
            ${Math.floor(numCount)}K
          </p>
        </div>
      </div>
    </FadeScene>
  );
};
