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

// ─── Scene 1: Hook — half of Americans claim at 62 ────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const personIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 25, stiffness: 60 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 58), fps, config: { damping: 30, stiffness: 80 } });
  const statIn = spring({ frame: Math.max(0, frame - 105), fps, config: { damping: 28, stiffness: 70 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 115, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(54, WHITE)}>HALF OF</p>
        <p style={{ ...headline(54, ACCENT), marginTop: 8 }}>AMERICANS</p>
        <p style={{ ...headline(40, WHITE), marginTop: 8 }}>CLAIM AT 62</p>
      </div>

      {/* Person silhouette */}
      <div style={{
        position: 'absolute', top: 390, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: personIn, transform: `scale(${personIn})`, transformOrigin: 'center bottom',
      }}>
        <svg width="155" height="235" viewBox="0 0 155 235">
          <circle cx="77" cy="36" r="31" fill={WHITE} />
          <rect x="43" y="71" width="69" height="85" rx="17" fill={WHITE} />
          <rect x="8" y="76" width="37" height="17" rx="8" fill={WHITE} />
          <rect x="110" y="76" width="37" height="17" rx="8" fill={WHITE} />
          <rect x="44" y="153" width="25" height="68" rx="12" fill={WHITE} />
          <rect x="86" y="153" width="25" height="68" rx="12" fill={WHITE} />
          <text x="77" y="124" textAnchor="middle" fill={ACCENT} fontSize="36" fontFamily="Arial Black">$</text>
        </svg>
      </div>

      {/* Age 62 badge */}
      <div style={{
        position: 'absolute', top: 615, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 55, width: 115, height: 115,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 50, color: WHITE, margin: 0, lineHeight: 1 }}>62</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>AGE</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 120, left: 50, right: 50, textAlign: 'center',
        opacity: statIn,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, lineHeight: 1.45, margin: 0 }}>
          That decision alone could cost them $182,000 — and most never see it coming.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: Monthly amounts — two growing bars ──────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const barProg = interpolate(frame, [20, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 28, stiffness: 70 } });

  const maxH = 320;
  const h1 = Math.max(8, Math.floor(barProg * 0.565 * maxH));
  const h2 = Math.max(8, Math.floor(barProg * maxH));
  const amt1 = Math.round(barProg * 1400);
  const amt2 = Math.round(barProg * 2480);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(42, BLACK)}>THE MONTHLY</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 10 }}>DIFFERENCE</p>
      </div>

      <div style={{
        position: 'absolute', top: 295, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 50, paddingRight: 50,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>${amt1.toLocaleString()}/mo</p>
          <div style={{ width: 170, height: h1, background: ACCENT, borderRadius: '14px 14px 0 0' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>CLAIM AT</p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: ACCENT, margin: 0 }}>62</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: GREEN, margin: 0 }}>${amt2.toLocaleString()}/mo</p>
          <div style={{ width: 170, height: h2, background: GREEN, borderRadius: '14px 14px 0 0' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>WAIT UNTIL</p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: GREEN, margin: 0 }}>70</p>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 105, left: 40, right: 40, textAlign: 'center',
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{ padding: '16px 24px', background: GREEN, borderRadius: 16 }}>
          <p style={{ ...headline(32, WHITE) }}>+77% PAY RAISE FOR LIFE</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, marginTop: 14, lineHeight: 1.45 }}>
          just for waiting eight years.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: Break-even timeline age 62→85 ───────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const lineGrow = interpolate(frame, [18, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxIn = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 26, stiffness: 68 } });
  const textIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 28, stiffness: 72 } });

  const TRACK_W = 820;
  const TRACK_X = 40;
  const BREAK_X = Math.floor(0.739 * TRACK_W) + TRACK_X;
  const lineW = Math.max(0, Math.floor(lineGrow * TRACK_W));
  const showBreak = lineGrow > 0.72;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, WHITE)}>WHEN DOES</p>
        <p style={{ ...headline(40, GREEN), marginTop: 8 }}>WAITING WIN?</p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 30, right: 30 }}>
        <svg width="100%" height="165" viewBox="0 0 900 165">
          <rect x={TRACK_X} y="72" width={TRACK_W} height="16" rx="8" fill="#333" />
          <rect x={TRACK_X} y="72" width={lineW} height="16" rx="4" fill={ACCENT} />
          <circle cx={TRACK_X} cy="80" r="18" fill={ACCENT} />
          <text x={TRACK_X} y="138" textAnchor="middle" fill={WHITE} fontSize="24" fontFamily="Arial Black">62</text>
          <circle cx="860" cy="80" r="18" fill="#555" />
          <text x="860" y="138" textAnchor="middle" fill={WHITE} fontSize="24" fontFamily="Arial Black">85</text>
          {showBreak && (
            <>
              <circle cx={BREAK_X} cy="80" r="22" fill={GREEN} />
              <text x={BREAK_X} y="50" textAnchor="middle" fill={GREEN} fontSize="20" fontFamily="Arial Black">BREAK-EVEN</text>
              <text x={BREAK_X} y="138" textAnchor="middle" fill={GREEN} fontSize="24" fontFamily="Arial Black">79</text>
            </>
          )}
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 630, left: 50, right: 50, textAlign: 'center',
        opacity: boxIn, transform: `scale(${boxIn})`,
      }}>
        <div style={{ padding: '22px 30px', border: `3px solid ${GREEN}`, borderRadius: 18 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>
            Average life expectancy of a 62-year-old today:
          </p>
          <p style={{ fontFamily: FONT, fontSize: 76, color: GREEN, margin: '6px 0 0' }}>84</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 110, left: 50, right: 50, textAlign: 'center',
        opacity: textIn,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, lineHeight: 1.45, margin: 0 }}>
          That's five extra years of $2,480 instead of $1,400. The gap adds up fast.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: Year-by-year bar chart ages 79–85 ───────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const row0 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 28, stiffness: 75 } });
  const row1 = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 28, stiffness: 75 } });
  const row2 = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 28, stiffness: 75 } });
  const row3 = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 28, stiffness: 75 } });
  const row4 = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 28, stiffness: 75 } });
  const row5 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 28, stiffness: 75 } });
  const row6 = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 28, stiffness: 75 } });
  const legendIn = spring({ frame: Math.max(0, frame - 162), fps, config: { damping: 28, stiffness: 70 } });

  const rows = [
    { age: 79, sp: row0 },
    { age: 80, sp: row1 },
    { age: 81, sp: row2 },
    { age: 82, sp: row3 },
    { age: 83, sp: row4 },
    { age: 84, sp: row5 },
    { age: 85, sp: row6 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, BLACK)}>AGES 79 TO 85</p>
        <p style={{ ...headline(40, GREEN), marginTop: 8 }}>EVERY YEAR</p>
      </div>

      <div style={{ position: 'absolute', top: 270, left: 40, right: 40 }}>
        {rows.map(({ age, sp }) => {
          const rowX = interpolate(sp, [0, 1], [-30, 0]);
          const earlyW = Math.max(4, Math.floor(sp * 185));
          const lateW = Math.max(4, Math.floor(sp * 328));
          return (
            <div key={age} style={{
              display: 'flex', alignItems: 'center', marginBottom: 18,
              opacity: sp, transform: `translateX(${rowX}px)`,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, width: 48, margin: 0 }}>{age}</p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: earlyW, height: 26, background: ACCENT, borderRadius: 6 }} />
                  <p style={{ fontFamily: FONT, fontSize: 17, color: ACCENT, margin: 0 }}>$16,800</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: lateW, height: 26, background: GREEN, borderRadius: 6 }} />
                  <p style={{ fontFamily: FONT, fontSize: 17, color: GREEN, margin: 0 }}>$29,760</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: 40, right: 40,
        opacity: legendIn,
      }}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 14, background: ACCENT, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>CLAIMED AT 62</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 14, background: GREEN, borderRadius: 4 }} />
            <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>WAITED TO 70</p>
          </div>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, textAlign: 'center', lineHeight: 1.45, margin: 0 }}>
          That extra $12,960/year piles up — and this is just one side of the math.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: $182K lifetime loss — piggy bank ────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const pigIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 55 } });
  const fillProg = interpolate(frame, [38, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numIn = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 25, stiffness: 65 } });

  const amt = Math.round(fillProg * 182000);
  const fillH = Math.max(0, Math.floor(fillProg * 155));
  const fillY = 295 - fillH;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, WHITE)}>THE LIFETIME</p>
        <p style={{ ...headline(40, ACCENT), marginTop: 8 }}>PRICE TAG</p>
      </div>

      <div style={{
        position: 'absolute', top: 270, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: pigIn, transform: `scale(${pigIn})`, transformOrigin: 'center center',
      }}>
        <svg width="340" height="325" viewBox="0 0 340 325">
          <ellipse cx="160" cy="200" rx="125" ry="108" fill="#e0e0e0" />
          <clipPath id="pigBodyClip">
            <ellipse cx="160" cy="200" rx="125" ry="108" />
          </clipPath>
          <rect x="35" y={fillY} width="250" height={fillH} fill={ACCENT} opacity="0.75" clipPath="url(#pigBodyClip)" />
          <ellipse cx="160" cy="200" rx="125" ry="108" fill="none" stroke={WHITE} strokeWidth="4" />
          <circle cx="268" cy="158" r="50" fill="#d0d0d0" stroke={WHITE} strokeWidth="4" />
          <ellipse cx="302" cy="172" rx="20" ry="14" fill="#bbb" />
          <circle cx="297" cy="170" r="4" fill="#888" />
          <circle cx="307" cy="170" r="4" fill="#888" />
          <circle cx="265" cy="146" r="6" fill={BLACK} />
          <ellipse cx="254" cy="112" rx="12" ry="18" fill="#c8c8c8" stroke={WHITE} strokeWidth="3" />
          <rect x="143" y="96" width="30" height="8" rx="4" fill="#999" />
          <rect x="75" y="286" width="28" height="30" rx="9" fill="#d0d0d0" />
          <rect x="116" y="286" width="28" height="30" rx="9" fill="#d0d0d0" />
          <rect x="157" y="286" width="28" height="30" rx="9" fill="#d0d0d0" />
          <rect x="198" y="286" width="28" height="30" rx="9" fill="#d0d0d0" />
          <path d="M 36 172 Q 14 152 22 132 Q 30 112 42 126" fill="none" stroke="#d0d0d0" strokeWidth="9" strokeLinecap="round" />
          {fillH > 50 && (
            <text x="160" y="228" textAnchor="middle" fill={WHITE} fontSize="44" fontFamily="Arial Black">$</text>
          )}
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 130, left: 40, right: 40, textAlign: 'center',
        opacity: numIn, transform: `scale(${numIn})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 68, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>
          ${amt.toLocaleString()}
        </p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.4, margin: '10px 0 0' }}>
          left on the table by claiming eight years too early.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: The smart play — 3 steps + CTA ─────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const cardIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 25, stiffness: 60 } });
  const step1In = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 30, stiffness: 90 } });
  const step2In = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 30, stiffness: 90 } });
  const step3In = spring({ frame: Math.max(0, frame - 122), fps, config: { damping: 30, stiffness: 90 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 28, stiffness: 70 } });

  const s1X = interpolate(step1In, [0, 1], [-28, 0]);
  const s2X = interpolate(step2In, [0, 1], [-28, 0]);
  const s3X = interpolate(step3In, [0, 1], [-28, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(46, BLACK)}>THE SMART</p>
        <p style={{ ...headline(46, GREEN), marginTop: 10 }}>PLAY</p>
      </div>

      <div style={{
        position: 'absolute', top: 255, left: 50, right: 50,
        background: WHITE, borderRadius: 22, padding: 40,
        border: '3px solid #d0d0d0',
        boxShadow: '0 12px 44px rgba(0,0,0,0.10)',
        opacity: cardIn, transform: `scale(${cardIn})`, transformOrigin: 'center top',
      }}>
        <p style={{
          fontFamily: FONT, fontSize: 22, color: BLACK, margin: '0 0 24px 0',
          borderBottom: '2px solid #ddd', paddingBottom: 18,
        }}>
          IF YOUR HEALTH IS DECENT:
        </p>

        <div style={{ opacity: step1In, transform: `translateX(${s1X}px)`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              background: ACCENT, borderRadius: 50, width: 38, height: 38, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>1</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0, lineHeight: 1.5 }}>
              Delay to <span style={{ color: GREEN }}>age 70</span> — max benefit
            </p>
          </div>
        </div>

        <div style={{ opacity: step2In, transform: `translateX(${s2X}px)`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              background: ACCENT, borderRadius: 50, width: 38, height: 38, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>2</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0, lineHeight: 1.5 }}>
              Keep savings growing those 8 extra years
            </p>
          </div>
        </div>

        <div style={{ opacity: step3In, transform: `translateX(${s3X}px)` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              background: GREEN, borderRadius: 50, width: 38, height: 38, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>3</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 23, color: BLACK, margin: 0, lineHeight: 1.5 }}>
              Lock in <span style={{ color: GREEN }}>$182K more</span> in lifetime income
            </p>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: 40, right: 40, textAlign: 'center',
        opacity: ctaIn,
      }}>
        <p style={{ ...headline(26, BLACK), lineHeight: 1.5 }}>
          It's the closest thing to free money your retirement will ever see.
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#555', margin: '16px 0 0' }}>
          Follow for more wealth math.
        </p>
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
