import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

// Precomputed for Scene5 — 30-year compound growth lines (avoids per-frame recalculation)
const S5_MAX = Math.pow(1.10, 29) - 1;
const S5_MARKET: string[] = Array.from({ length: 30 }, (_, i) => {
  const x = (i / 29) * 860 + 10;
  const y = 270 - Math.min(250, ((Math.pow(1.10, i) - 1) / S5_MAX) * 250);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
});
const S5_YOU: string[] = Array.from({ length: 30 }, (_, i) => {
  const x = (i / 29) * 860 + 10;
  const y = 270 - Math.min(250, ((Math.pow(1.085, i) - 1) / S5_MAX) * 250);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
});

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

// ─── Scene 1: Two charts — which stock do you sell? ───────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartIn = spring({ frame, fps, config: { damping: 28, stiffness: 60 } });
  const textIn = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personIn = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 22, stiffness: 80 } });

  const riseXY = [[10, 145], [50, 112], [90, 86], [130, 58], [170, 34], [208, 12]];
  const fallXY = [[10, 12], [50, 44], [90, 74], [130, 104], [170, 128], [208, 148]];
  const numPts = Math.max(2, Math.floor(chartIn * 6));
  const riseStr = riseXY.slice(0, numPts).map(p => p.join(',')).join(' ');
  const fallStr = fallXY.slice(0, numPts).map(p => p.join(',')).join(' ');

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: textIn }}>
        <p style={headline(46, WHITE)}>WHICH STOCK</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 10 }}>DO YOU SELL?</p>
      </div>

      <div style={{
        position: 'absolute', top: 265, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around',
        paddingLeft: 28, paddingRight: 28,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 58, color: GREEN, margin: 0 }}>+40%</p>
          <svg width="230" height="170" viewBox="0 0 215 158">
            <rect x="0" y="0" width="215" height="158" rx="14" fill="#1d1d1d" />
            <polyline points={riseStr} fill="none" stroke={GREEN} strokeWidth="5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, marginTop: 12 }}>WINNER</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 58, color: ACCENT, margin: 0 }}>-40%</p>
          <svg width="230" height="170" viewBox="0 0 215 158">
            <rect x="0" y="0" width="215" height="158" rx="14" fill="#1d1d1d" />
            <polyline points={fallStr} fill="none" stroke={ACCENT} strokeWidth="5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, marginTop: 12 }}>LOSER</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        transform: `scale(${personIn})`, transformOrigin: 'center bottom',
      }}>
        <svg width="72" height="115" viewBox="0 0 72 115">
          <circle cx="36" cy="18" r="16" fill={WHITE} />
          <rect x="18" y="36" width="36" height="44" rx="9" fill={WHITE} />
          <rect x="2" y="40" width="17" height="9" rx="4" fill={WHITE} />
          <rect x="53" y="40" width="17" height="9" rx="4" fill={WHITE} />
          <rect x="20" y="77" width="12" height="30" rx="6" fill={WHITE} />
          <rect x="40" y="77" width="12" height="30" rx="6" fill={WHITE} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 105, left: 50, right: 50, textAlign: 'center', opacity: textIn }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, lineHeight: 1.45, margin: 0 }}>
          Your brain picks wrong — every single time.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: The Disposition Effect — brain + two arrows ─────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const brainIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 25, stiffness: 60 } });
  const sellIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 30, stiffness: 90 } });
  const holdIn = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 30, stiffness: 90 } });

  const titleY = interpolate(titleIn, [0, 1], [35, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 90, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(42, BLACK)}>THE DISPOSITION</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 10 }}>EFFECT</p>
      </div>

      <div style={{
        position: 'absolute', top: 285, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: brainIn, transform: `scale(${brainIn})`, transformOrigin: 'center center',
      }}>
        <svg width="250" height="210" viewBox="0 0 250 210">
          <ellipse cx="125" cy="105" rx="96" ry="78" fill="#e0e0e0" stroke={BLACK} strokeWidth="5" />
          <path d="M 56 84 Q 80 62 104 84 Q 128 62 152 84 Q 176 62 194 84"
            fill="none" stroke={BLACK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 110 Q 76 90 104 110 Q 132 90 160 110 Q 184 90 202 110"
            fill="none" stroke={BLACK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 56 136 Q 80 116 104 136 Q 128 116 152 136 Q 176 116 194 136"
            fill="none" stroke={BLACK} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 545, left: 60,
        opacity: sellIn, transform: `translateX(${interpolate(sellIn, [0, 1], [-30, 0])}px)`,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <svg width="46" height="46" viewBox="0 0 46 46">
          <polygon points="23,4 42,42 4,42" fill={GREEN} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 30, color: GREEN, margin: 0 }}>SELL WINNERS</p>
      </div>

      <div style={{
        position: 'absolute', top: 630, left: 60,
        opacity: holdIn, transform: `translateX(${interpolate(holdIn, [0, 1], [-30, 0])}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="46" height="46" viewBox="0 0 46 46">
            <polygon points="23,42 4,4 42,4" fill={ACCENT} />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>HOLD LOSERS</p>
        </div>
        <div style={{ marginTop: 16, padding: '14px 22px', background: ACCENT, borderRadius: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: 0, textAlign: 'center' }}>
            THE EXPENSIVE MISTAKE
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: The 1.7x stat — bar chart comparison ────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const barProg = interpolate(frame, [15, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 25, stiffness: 70 } });

  const maxH = 280;
  const youH = Math.max(8, Math.floor(barProg * 0.85 * maxH));
  const spH = Math.max(8, Math.floor(barProg * maxH));
  const youPct = (barProg * 8.5).toFixed(1);
  const spPct = (barProg * 10.0).toFixed(1);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, WHITE)}>THE NUMBERS</p>
        <p style={{ ...headline(40, ACCENT), marginTop: 8 }}>DON'T LIE</p>
      </div>

      <div style={{
        position: 'absolute', top: 300, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 70, paddingRight: 70,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>+{youPct}%</p>
          <div style={{ width: 165, height: youH, background: ACCENT, borderRadius: '12px 12px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, textAlign: 'center' }}>YOUR RETURNS</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: GREEN, margin: 0 }}>+{spPct}%</p>
          <div style={{ width: 165, height: spH, background: GREEN, borderRadius: '12px 12px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, textAlign: 'center' }}>S&P 500</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 88, left: 40, right: 40, textAlign: 'center',
        opacity: statIn, transform: `scale(${statIn})`,
      }}>
        <p style={{ ...headline(66, ACCENT) }}>1.7×</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.4, margin: '10px 0 0' }}>
          more likely to dump winners — losing 1.5% in returns every single year.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: Loss aversion — two weighted boxes ──────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const gainIn = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 28, stiffness: 65 } });
  const lossIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 28, stiffness: 65 } });
  const midIn = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 28, stiffness: 75 } });
  const labelIn = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 25, stiffness: 70 } });

  const gainH = Math.max(8, Math.floor(gainIn * 115));
  const lossH = Math.max(8, Math.floor(lossIn * 230));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, BLACK)}>WHY YOUR BRAIN</p>
        <p style={{ ...headline(40, ACCENT), marginTop: 10 }}>WON'T SELL</p>
      </div>

      <div style={{
        position: 'absolute', top: 290, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 50, paddingRight: 50,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: gainIn, transform: `scaleY(${gainIn})`, transformOrigin: 'center bottom' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, margin: 0 }}>+$1,000</p>
          <div style={{
            width: 165, height: gainH, background: GREEN, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {gainH > 40 && <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>GAIN</p>}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: midIn }}>
          <p style={{ fontFamily: FONT, fontSize: 56, color: ACCENT, margin: 0 }}>2×</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>heavier</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: lossIn, transform: `scaleY(${lossIn})`, transformOrigin: 'center bottom' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>-$1,000</p>
          <div style={{
            width: 165, height: lossH, background: ACCENT, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {lossH > 40 && <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>LOSS</p>}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 40, right: 40, textAlign: 'center',
        opacity: labelIn, transform: `scale(${labelIn})`,
      }}>
        <div style={{ padding: '18px 24px', background: ACCENT, borderRadius: 16 }}>
          <p style={{ ...headline(34, WHITE) }}>LOSS AVERSION</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 65, left: 40, right: 40, textAlign: 'center', opacity: labelIn }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, lineHeight: 1.5, margin: 0 }}>
          Your brain freezes — hoping it bounces back — instead of cutting and moving on.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: 30-year diverging lines — the $47K price tag ────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const lineProgress = interpolate(frame, [20, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapIn = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 25, stiffness: 70 } });

  const numPts = Math.max(2, Math.floor(lineProgress * 30));
  const marketLine = S5_MARKET.slice(0, numPts).join(' ');
  const youLine = S5_YOU.slice(0, numPts).join(' ');

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(38, WHITE)}>THE 30-YEAR</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 8 }}>PRICE TAG</p>
      </div>

      <div style={{ position: 'absolute', top: 255, left: 20, right: 20 }}>
        <svg width="100%" height="290" viewBox="0 0 880 290">
          <line x1="10" y1="278" x2="870" y2="278" stroke="#444" strokeWidth="2" />
          <text x="10" y="292" fill="#888" fontSize="20" fontFamily="Arial">Yr 1</text>
          <text x="824" y="292" fill="#888" fontSize="20" fontFamily="Arial">Yr 30</text>
          {numPts >= 2 && (
            <polyline points={marketLine} fill="none" stroke={GREEN} strokeWidth="6"
              strokeLinecap="round" strokeLinejoin="round" />
          )}
          {numPts >= 2 && (
            <polyline points={youLine} fill="none" stroke={ACCENT} strokeWidth="6"
              strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12,6" />
          )}
          <rect x="650" y="14" width="18" height="18" rx="3" fill={GREEN} />
          <text x="676" y="29" fill="#F5F5F5" fontSize="18" fontFamily="Arial Black">MARKET</text>
          <rect x="650" y="44" width="18" height="18" rx="3" fill={ACCENT} />
          <text x="676" y="59" fill="#F5F5F5" fontSize="18" fontFamily="Arial Black">YOU</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 88, left: 40, right: 40, textAlign: 'center',
        opacity: gapIn, transform: `scale(${gapIn})`,
      }}>
        <p style={{ ...headline(64, ACCENT), marginBottom: 10 }}>$47,000</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.4, margin: 0 }}>
          in missing wealth — from one behavioral habit compounding for 30 years.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: The fix — stop-loss notepad + CTA ───────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const notepadIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 25, stiffness: 60 } });
  const rule1In = spring({ frame: Math.max(0, frame - 58), fps, config: { damping: 30, stiffness: 90 } });
  const rule2In = spring({ frame: Math.max(0, frame - 92), fps, config: { damping: 30, stiffness: 90 } });
  const checkIn = spring({ frame: Math.max(0, frame - 128), fps, config: { damping: 28, stiffness: 80 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 30, stiffness: 70 } });

  const rule1X = interpolate(rule1In, [0, 1], [-26, 0]);
  const rule2X = interpolate(rule2In, [0, 1], [-26, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(42, BLACK)}>THE FIX IS</p>
        <p style={{ ...headline(42, GREEN), marginTop: 10 }}>SIMPLE</p>
      </div>

      <div style={{
        position: 'absolute', top: 245, left: 55, right: 55,
        background: WHITE, borderRadius: 20, padding: 38,
        border: '3px solid #d0d0d0',
        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
        opacity: notepadIn, transform: `scale(${notepadIn})`, transformOrigin: 'center top',
      }}>
        <p style={{
          fontFamily: FONT, fontSize: 26, color: BLACK, margin: '0 0 18px 0',
          borderBottom: '2px solid #ddd', paddingBottom: 16,
        }}>
          MY RULES
        </p>
        <div style={{ opacity: rule1In, transform: `translateX(${rule1X}px)`, marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, lineHeight: 1.55 }}>
            Set STOP-LOSS at{' '}
            <span style={{ color: ACCENT }}>-15%</span>{' '}
            BEFORE buying — never after.
          </p>
        </div>
        <div style={{ opacity: rule2In, transform: `translateX(${rule2X}px)` }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, lineHeight: 1.55 }}>
            When it hits -15%: sell. No exceptions.
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 775, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: checkIn, transform: `scale(${checkIn})`,
      }}>
        <svg width="112" height="112" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="52" fill={GREEN} />
          <polyline points="28,58 48,78 86,34" fill="none" stroke={WHITE}
            strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 88, left: 40, right: 40, textAlign: 'center',
        opacity: ctaIn,
      }}>
        <p style={{ ...headline(28, BLACK), lineHeight: 1.45 }}>
          Pre-set exit rules keep $47,000 in your pocket.
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#555', margin: '14px 0 0' }}>
          Follow for more wealth psychology.
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
