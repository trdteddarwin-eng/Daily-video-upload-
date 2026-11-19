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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: 95% Don't Know This Rule ───────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pctScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const lineOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxY = interpolate(frame, [60, 90], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 60px' }}>

        {/* Tax document icon */}
        <svg width="90" height="110" viewBox="0 0 90 110" style={{ marginBottom: 24, opacity: 0.65 }}>
          <rect x="8" y="4" width="74" height="98" rx="6" fill="none" stroke={WHITE} strokeWidth="3" opacity={0.4} />
          <rect x="22" y="22" width="46" height="5" rx="2.5" fill={WHITE} opacity={0.5} />
          <rect x="22" y="36" width="38" height="5" rx="2.5" fill={WHITE} opacity={0.5} />
          <rect x="22" y="50" width="42" height="5" rx="2.5" fill={WHITE} opacity={0.5} />
          <rect x="22" y="64" width="34" height="5" rx="2.5" fill={WHITE} opacity={0.5} />
          <rect x="22" y="78" width="40" height="5" rx="2.5" fill={WHITE} opacity={0.3} />
        </svg>

        {/* 95% springs in */}
        <div style={{ transform: `scale(${pctScale})`, transformOrigin: 'center', textAlign: 'center', marginBottom: 8 }}>
          <span style={{ ...headline(200, ACCENT) }}>95%</span>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: lineOpacity, textAlign: 'center', marginBottom: 48 }}>
          <p style={{ ...headline(30, WHITE), marginBottom: 8 }}>OF AMERICANS HAVE NEVER</p>
          <p style={{ ...headline(30, WHITE) }}>HEARD OF THIS RULE</p>
        </div>

        {/* $19K reveal box */}
        <div style={{
          opacity: boxOpacity,
          transform: `translateY(${boxY}px)`,
          background: ACCENT,
          borderRadius: 16,
          padding: '22px 48px',
          textAlign: 'center',
        }}>
          <span style={{ ...headline(52, BLACK) }}>$19,000 TAX FREE</span>
          <p style={{ ...headline(24, BLACK), marginTop: 10, opacity: 0.75 }}>PER PERSON · PER YEAR</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: Estate Tax Problem ─────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barScale = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, delay: 10 });
  const labelOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctY = interpolate(frame, [70, 100], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const keepH = Math.max(0, 240 * barScale);
  const taxH = Math.max(0, 160 * barScale);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 60px' }}>

        <p style={{ ...headline(30, BLACK), marginBottom: 48, opacity: labelOpacity }}>THE ESTATE TAX REALITY</p>

        {/* Two bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 150, height: keepH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(22, BLACK), marginTop: 12, opacity: labelOpacity }}>YOUR FAMILY</p>
            <p style={{ ...headline(18, '#555555'), marginTop: 4, opacity: labelOpacity }}>KEEPS 60%</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 150, height: taxH, background: '#EF4444', borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(22, '#EF4444'), marginTop: 12, opacity: labelOpacity }}>IRS TAKES</p>
            <p style={{ ...headline(18, '#555555'), marginTop: 4, opacity: labelOpacity }}>40%</p>
          </div>
        </div>

        {/* Threshold note */}
        <div style={{ opacity: labelOpacity, textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...headline(24, BLACK) }}>ON ESTATES OVER $13 MILLION</p>
        </div>

        {/* Big 40% reveal */}
        <div style={{ opacity: pctOpacity, transform: `translateY(${pctY}px)`, textAlign: 'center' }}>
          <span style={{ ...headline(100, '#EF4444') }}>40%</span>
          <p style={{ ...headline(26, BLACK), marginTop: 8 }}>GONE — UNLESS YOU PLAN AHEAD</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: The Annual Gift Tax Exclusion ───────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lidProgress = spring({ frame, fps, config: { damping: 10, stiffness: 60 }, delay: 15 });
  const contentOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3Opacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lidOffset = lidProgress * -60;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 80px' }}>

        <p style={{ ...headline(26, ACCENT), marginBottom: 28 }}>ANNUAL GIFT TAX EXCLUSION</p>

        {/* Gift box SVG */}
        <div style={{ marginBottom: 28 }}>
          <svg width="200" height="210" viewBox="0 0 200 210">
            {/* Box body */}
            <rect x="20" y="82" width="160" height="112" rx="8" fill={ACCENT} />
            {/* Ribbon horizontal on body */}
            <rect x="20" y="128" width="160" height="12" fill="#B45309" />
            {/* Ribbon vertical on body */}
            <rect x="90" y="82" width="20" height="112" fill="#B45309" />
            {/* Dollar sign inside box */}
            <text x="100" y="152" textAnchor="middle" dominantBaseline="middle"
              fontSize="44" fontFamily="Arial Black" fill={BLACK} fontWeight="900"
              opacity={contentOpacity}>$</text>
            {/* Lid group that springs up */}
            <g transform={`translate(0, ${lidOffset})`}>
              <rect x="10" y="56" width="180" height="38" rx="6" fill="#FCD34D" />
              <rect x="88" y="56" width="24" height="38" fill="#B45309" />
              <ellipse cx="76" cy="56" rx="22" ry="14" fill="#FCD34D" />
              <ellipse cx="124" cy="56" rx="22" ry="14" fill="#FCD34D" />
              <circle cx="100" cy="56" r="10" fill="#B45309" />
            </g>
          </svg>
        </div>

        {/* $19,000 */}
        <div style={{ opacity: contentOpacity, textAlign: 'center', marginBottom: 36 }}>
          <span style={{ ...headline(90, WHITE) }}>$19,000</span>
          <p style={{ ...headline(24, ACCENT), marginTop: 4 }}>PER PERSON · PER YEAR</p>
        </div>

        {/* Bullet rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <div style={{ opacity: b1Opacity, background: 'rgba(245,158,11,0.15)', borderRadius: 12, padding: '14px 28px' }}>
            <span style={{ ...headline(28, WHITE) }}>+ ZERO TAXES</span>
          </div>
          <div style={{ opacity: b2Opacity, background: 'rgba(245,158,11,0.15)', borderRadius: 12, padding: '14px 28px' }}>
            <span style={{ ...headline(28, WHITE) }}>+ ZERO PAPERWORK</span>
          </div>
          <div style={{ opacity: b3Opacity, background: 'rgba(245,158,11,0.15)', borderRadius: 12, padding: '14px 28px' }}>
            <span style={{ ...headline(26, WHITE) }}>+ ZERO LIMITS ON RECIPIENTS</span>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Person render helper (no hooks — not a component) ────────────────────────
const renderPerson = (size: number, color: string, label: string): React.ReactNode => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />
    <div style={{ width: Math.round(size * 0.9), height: Math.round(size * 1.3), borderRadius: Math.round(size * 0.25), background: color, opacity: 0.85 }} />
    <span style={{ ...headline(16, BLACK) }}>{label}</span>
  </div>
);

// ─── Scene 4: Married Couple Superpower ──────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const arrowOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const perChildOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOpacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalY = interpolate(frame, [85, 115], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 60px' }}>

        <p style={{ ...headline(28, BLACK), marginBottom: 48 }}>THE MARRIED COUPLE ADVANTAGE</p>

        {/* Family row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 36, marginBottom: 48, transform: `scale(${personScale})`, transformOrigin: 'center' }}>
          {/* Adults */}
          <div style={{ display: 'flex', gap: 20 }}>
            {renderPerson(50, ACCENT, 'YOU')}
            {renderPerson(50, ACCENT, 'SPOUSE')}
          </div>
          {/* Arrow */}
          <div style={{ opacity: arrowOpacity, display: 'flex', alignItems: 'center', paddingTop: 20 }}>
            <svg width="64" height="30" viewBox="0 0 64 30">
              <line x1="0" y1="15" x2="48" y2="15" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
              <polygon points="48,8 64,15 48,22" fill={BLACK} />
            </svg>
          </div>
          {/* Children */}
          <div style={{ display: 'flex', gap: 16, opacity: arrowOpacity }}>
            {renderPerson(36, '#374151', 'KID 1')}
            {renderPerson(36, '#374151', 'KID 2')}
            {renderPerson(36, '#374151', 'KID 3')}
          </div>
        </div>

        {/* Per child box */}
        <div style={{ opacity: perChildOpacity, background: 'rgba(245,158,11,0.12)', borderRadius: 16, padding: '18px 36px', marginBottom: 24, textAlign: 'center', width: '100%' }}>
          <p style={{ ...headline(26, BLACK) }}>$19,000 × 2 PARENTS = $38,000</p>
          <p style={{ ...headline(20, '#555555'), marginTop: 8 }}>PER CHILD · PER YEAR</p>
        </div>

        {/* Total */}
        <div style={{ opacity: totalOpacity, transform: `translateY(${totalY}px)`, background: ACCENT, borderRadius: 16, padding: '22px 48px', textAlign: 'center', width: '100%' }}>
          <span style={{ ...headline(64, BLACK) }}>$114,000</span>
          <p style={{ ...headline(22, BLACK), marginTop: 8, opacity: 0.8 }}>PER YEAR · TAX FREE · 3 KIDS</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: 20-Year Math ────────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countVal = interpolate(frame, [30, 160], [0, 2.28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsVal = interpolate(frame, [110, 195], [0, 912], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 60px' }}>

        <p style={{ ...headline(28, WHITE), marginBottom: 8, opacity: titleOpacity }}>20 YEARS OF GIFTING</p>
        <p style={{ ...headline(22, ACCENT), marginBottom: 44, opacity: titleOpacity }}>$114,000/YEAR × 20 YEARS</p>

        {/* 20 animated bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160, marginBottom: 24, width: '100%', justifyContent: 'center' }}>
          {bars.map((i) => {
            const h = interpolate(frame, [i * 4, i * 4 + 30], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return <div key={i} style={{ width: 34, height: h, background: ACCENT, borderRadius: '4px 4px 0 0' }} />;
          })}
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ ...headline(96, ACCENT) }}>${countVal.toFixed(2)}M</span>
          <p style={{ ...headline(24, WHITE), marginTop: 4 }}>MOVED OUT OF YOUR ESTATE</p>
        </div>

        {/* Savings reveal */}
        <div style={{ opacity: savingsOpacity, background: 'rgba(245,158,11,0.15)', borderRadius: 16, padding: '18px 36px', textAlign: 'center', width: '100%' }}>
          <p style={{ ...headline(24, WHITE) }}>AT 40% TAX RATE YOUR FAMILY SAVES</p>
          <span style={{ ...headline(72, ACCENT) }}>${Math.round(savingsVal)}K</span>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — Start This Holiday Season ────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const treeScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const stepsOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [80, 110], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 60px' }}>

        {/* Holiday tree SVG */}
        <div style={{ transform: `scale(${treeScale})`, transformOrigin: 'center bottom', marginBottom: 24 }}>
          <svg width="200" height="230" viewBox="0 0 200 230">
            <polygon points="100,10 158,88 42,88" fill="#166534" />
            <polygon points="100,52 168,138 32,138" fill="#15803d" />
            <polygon points="100,94 180,186 20,186" fill="#166534" />
            <rect x="88" y="186" width="24" height="28" rx="4" fill="#78350f" />
            <rect x="62" y="168" width="40" height="30" rx="4" fill={ACCENT} />
            <rect x="62" y="175" width="40" height="8" fill="#B45309" />
            <rect x="78" y="168" width="8" height="30" fill="#B45309" />
            <polygon points="100,2 103,11 112,11 105,17 108,26 100,20 92,26 95,17 88,11 97,11" fill="#FCD34D" />
          </svg>
        </div>

        <p style={{ ...headline(30, BLACK), marginBottom: 28 }}>START THIS HOLIDAY SEASON</p>

        {/* Two step cards */}
        <div style={{ opacity: stepsOpacity, width: '100%', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(245,158,11,0.12)', borderRadius: 14, padding: '16px 24px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ ...headline(24, BLACK) }}>1</span>
            </div>
            <span style={{ ...headline(22, BLACK) }}>WRITE A CHECK OR TRANSFER</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(245,158,11,0.12)', borderRadius: 14, padding: '16px 24px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ ...headline(24, BLACK) }}>2</span>
            </div>
            <span style={{ ...headline(22, BLACK) }}>NO TAXES. NO FORMS. DONE.</span>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)`, background: BLACK, borderRadius: 16, padding: '20px 36px', textAlign: 'center', width: '100%' }}>
          <p style={{ ...headline(22, WHITE), marginBottom: 8 }}>FOLLOW FOR MONEY MOVES</p>
          <span style={{ ...headline(26, ACCENT) }}>THE IRS WON'T TELL YOU ABOUT</span>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────
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
