import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const AMBER = '#F59E0B';
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

// ─── Scene 1: Hook — person at laptop, hidden tax warning ────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);

  const personIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 22, stiffness: 60 } });

  const warnIn = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 20, stiffness: 100 } });
  const warnScale = interpolate(warnIn, [0, 1], [0.4, 1]);

  const d1Op = interpolate(frame, [30, 55, 100, 120], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1Y = interpolate(frame, [30, 110], [0, -280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2Op = interpolate(frame, [50, 75, 120, 140], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2Y = interpolate(frame, [50, 130], [0, -260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3Op = interpolate(frame, [70, 95, 140, 160], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3Y = interpolate(frame, [70, 150], [0, -240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(72, WHITE)}>SIDE</p>
        <p style={{ ...headline(72, ACCENT), marginTop: 4 }}>HUSTLE</p>
        <p style={{ ...headline(72, WHITE), marginTop: 4 }}>WARNING</p>
      </div>

      {/* Person at laptop + floating dollar signs */}
      <div style={{
        position: 'absolute', top: 410, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: personIn, transform: `scale(${personIn})`,
      }}>
        <div style={{ position: 'relative', width: 280, height: 230 }}>
          {/* Dollar 1 */}
          <div style={{ position: 'absolute', top: 20, left: 60, opacity: d1Op, transform: `translateY(${d1Y}px)` }}>
            <svg width="54" height="54" viewBox="0 0 54 54">
              <circle cx="27" cy="27" r="26" fill={GREEN} />
              <text x="27" y="37" textAnchor="middle" fontSize="32" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>
          {/* Dollar 2 */}
          <div style={{ position: 'absolute', top: 0, left: 130, opacity: d2Op, transform: `translateY(${d2Y}px)` }}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="23" fill={GREEN} />
              <text x="24" y="33" textAnchor="middle" fontSize="28" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>
          {/* Dollar 3 */}
          <div style={{ position: 'absolute', top: 30, left: 200, opacity: d3Op, transform: `translateY(${d3Y}px)` }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="21" fill={GREEN} />
              <text x="22" y="30" textAnchor="middle" fontSize="26" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>

          {/* Person sitting at laptop */}
          <svg width="280" height="230" viewBox="0 0 280 230">
            {/* Chair */}
            <rect x="90" y="175" width="100" height="10" rx="4" fill="#555" />
            <rect x="100" y="183" width="14" height="38" rx="4" fill="#555" />
            <rect x="166" y="183" width="14" height="38" rx="4" fill="#555" />
            <rect x="86" y="218" width="108" height="10" rx="4" fill="#555" />
            {/* Body */}
            <rect x="105" y="120" width="70" height="60" rx="16" fill="#9CA3AF" />
            {/* Head */}
            <circle cx="140" cy="96" r="34" fill="#F3D5B5" />
            {/* Hair */}
            <path d="M108 88 Q110 56 140 54 Q170 56 172 88 Q162 70 140 68 Q118 70 108 88 Z" fill={BLACK} />
            {/* Laptop base */}
            <rect x="52" y="170" width="176" height="12" rx="4" fill="#6B7280" />
            {/* Laptop screen */}
            <rect x="60" y="124" width="160" height="48" rx="6" fill="#374151" />
            <rect x="66" y="130" width="148" height="36" rx="4" fill="#1E40AF" />
            {/* Screen glow lines */}
            <rect x="74" y="138" width="60" height="5" rx="2" fill="#93C5FD" />
            <rect x="74" y="148" width="80" height="5" rx="2" fill="#93C5FD" />
            {/* Arms on keyboard */}
            <rect x="88" y="162" width="34" height="12" rx="6" fill="#F3D5B5" />
            <rect x="158" y="162" width="34" height="12" rx="6" fill="#F3D5B5" />
          </svg>
        </div>
      </div>

      {/* HIDDEN TAX warning badge */}
      <div style={{
        position: 'absolute', bottom: 148, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: warnIn, transform: `scale(${warnScale})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 16,
          paddingTop: 18, paddingBottom: 18, paddingLeft: 40, paddingRight: 40,
        }}>
          <p style={headline(52, WHITE)}>HIDDEN TAX</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: W2 vs Self-employed — split tax columns ────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const leftIn = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 22, stiffness: 90 } });
  const rightIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 22, stiffness: 90 } });
  const vsOp = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noteIn = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 24, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>WHO PAYS</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>YOUR TAXES?</p>
      </div>

      <div style={{
        position: 'absolute', top: 290, left: 28, right: 28,
        display: 'flex', gap: 18, alignItems: 'flex-start',
      }}>
        {/* W2 column */}
        <div style={{
          flex: 1, background: '#E5E7EB', borderRadius: 18, padding: '24px 16px',
          opacity: leftIn, transform: `translateX(${interpolate(leftIn, [0, 1], [-80, 0])}px)`,
        }}>
          <p style={{ ...headline(28, BLACK), marginBottom: 18 }}>W2 JOB</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <svg width="44" height="56" viewBox="0 0 44 56">
              <circle cx="22" cy="16" r="13" fill="#6B7280" />
              <rect x="6" y="32" width="32" height="22" rx="10" fill="#6B7280" />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#6B7280', margin: 0 }}>EMPLOYER</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>7.65%</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="44" height="56" viewBox="0 0 44 56">
              <circle cx="22" cy="16" r="13" fill="#374151" />
              <rect x="6" y="32" width="32" height="22" rx="10" fill="#374151" />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#374151', margin: 0 }}>YOU</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>7.65%</p>
            </div>
          </div>
          <div style={{ marginTop: 14, background: GREEN, borderRadius: 8, padding: '8px 0' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, textAlign: 'center', margin: 0 }}>TOTAL: 15.3%</p>
          </div>
        </div>

        {/* VS */}
        <div style={{ paddingTop: 90, opacity: vsOp }}>
          <p style={headline(32, BLACK)}>VS</p>
        </div>

        {/* Self-employed column */}
        <div style={{
          flex: 1, background: '#FEE2E2', borderRadius: 18, padding: '24px 16px',
          opacity: rightIn, transform: `translateX(${interpolate(rightIn, [0, 1], [80, 0])}px)`,
        }}>
          <p style={{ ...headline(24, ACCENT), marginBottom: 18 }}>SIDE HUSTLE</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <svg width="44" height="56" viewBox="0 0 44 56">
              <circle cx="22" cy="16" r="13" fill={ACCENT} />
              <rect x="6" y="32" width="32" height="22" rx="10" fill={ACCENT} />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0 }}>YOU PAY</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>BOTH</p>
            </div>
          </div>
          <div style={{ background: ACCENT, borderRadius: 8, padding: '8px 0' }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: 0 }}>15.3%</p>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 120, left: 40, right: 40, textAlign: 'center',
        opacity: noteIn, transform: `translateY(${interpolate(noteIn, [0, 1], [20, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          Self-employed? That&apos;s <span style={{ color: ACCENT }}>15.3% extra</span> before income tax hits.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: $8K income, bars, 37% rate counter ─────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const bar1W = interpolate(frame, [22, 100], [0, 560], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const bar2W = interpolate(frame, [60, 145], [0, 272], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const bar3W = interpolate(frame, [95, 175], [0, 336], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const rateCount = interpolate(frame, [130, 195], [0, 37], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  });
  const rateIn = spring({ frame: Math.max(0, frame - 125), fps, config: { damping: 22, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(42, WHITE)}>ON $8,000</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 6 }}>SIDE HUSTLE INCOME</p>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 36, right: 36 }}>
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: '0 0 8px' }}>INCOME</p>
          <div style={{ width: '100%', height: 56, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: Math.floor(bar1W), height: 56, background: GREEN, borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
              {bar1W > 100 && <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>$8,000</span>}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: '0 0 8px' }}>SE TAX (15.3%)</p>
          <div style={{ width: '100%', height: 56, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: Math.floor(bar2W), height: 56, background: ACCENT, borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
              {bar2W > 100 && <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>$1,224</span>}
            </div>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: '0 0 8px' }}>INCOME TAX (22%)</p>
          <div style={{ width: '100%', height: 56, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: Math.floor(bar3W), height: 56, background: '#F97316', borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
              {bar3W > 100 && <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>$1,760</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center',
        opacity: rateIn, transform: `scale(${rateIn})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 130, color: ACCENT, margin: 0, lineHeight: 1 }}>
          {Math.floor(rateCount)}%
        </p>
        <p style={headline(34, WHITE)}>EFFECTIVE TAX RATE</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: Quarterly deadlines + penalty warning ──────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const q1In = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 130 } });
  const q2In = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 22, stiffness: 130 } });
  const q3In = spring({ frame: Math.max(0, frame - 82), fps, config: { damping: 22, stiffness: 130 } });
  const q4In = spring({ frame: Math.max(0, frame - 114), fps, config: { damping: 22, stiffness: 130 } });
  const penaltyIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 20, stiffness: 120 } });

  const quarters = [
    { label: 'Q1', due: 'APR 15', spring: q1In },
    { label: 'Q2', due: 'JUN 15', spring: q2In },
    { label: 'Q3', due: 'SEP 15', spring: q3In },
    { label: 'Q4', due: 'JAN 15', spring: q4In },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>IRS WANTS</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>QUARTERLY PAYMENTS</p>
      </div>

      <div style={{
        position: 'absolute', top: 300, left: 40, right: 40,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
      }}>
        {quarters.map((q) => (
          <div key={q.label} style={{
            background: '#F3F4F6', borderRadius: 16, padding: '20px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: q.spring, transform: `scale(${q.spring})`,
          }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <rect x="2" y="14" width="68" height="56" rx="8" fill={WHITE} />
              <rect x="2" y="14" width="68" height="22" rx="8" fill={ACCENT} />
              <rect x="2" y="28" width="68" height="8" fill={ACCENT} />
              <rect x="18" y="4" width="10" height="18" rx="4" fill="#9CA3AF" />
              <rect x="44" y="4" width="10" height="18" rx="4" fill="#9CA3AF" />
            </svg>
            <p style={headline(34, ACCENT)}>{q.label}</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>DUE {q.due}</p>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 108, left: 40, right: 40, textAlign: 'center',
        opacity: penaltyIn, transform: `scale(${penaltyIn})`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 14, padding: '16px 24px' }}>
          <p style={headline(28, WHITE)}>45% OF GIG WORKERS</p>
          <p style={{ ...headline(28, WHITE), marginTop: 6 }}>MISS THESE + PAY PENALTIES</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: Two fixes — SE deduction + SEP-IRA ─────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const fix1In = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 22, stiffness: 100 } });
  const fix2In = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 22, stiffness: 100 } });
  const barProg = interpolate(frame, [110, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const barW = Math.floor(barProg * 520);
  const ctaOp = interpolate(frame, [175, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, WHITE)}>TWO MOVES THAT</p>
        <p style={{ ...headline(44, GREEN), marginTop: 6 }}>SAVE THOUSANDS</p>
      </div>

      {/* Fix 1: SE tax deduction */}
      <div style={{
        position: 'absolute', top: 290, left: 36, right: 36,
        background: '#1E1E1E', borderRadius: 18, padding: '24px 24px',
        opacity: fix1In, transform: `translateX(${interpolate(fix1In, [0, 1], [-60, 0])}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="80" viewBox="0 0 72 80">
            <rect x="6" y="4" width="60" height="72" rx="8" fill={WHITE} />
            <rect x="14" y="16" width="30" height="6" rx="3" fill="#9CA3AF" />
            <rect x="14" y="28" width="44" height="6" rx="3" fill="#9CA3AF" />
            <rect x="14" y="40" width="36" height="6" rx="3" fill="#9CA3AF" />
            <circle cx="52" cy="58" r="16" fill={GREEN} />
            <path d="M44 58 L50 64 L62 52" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div>
            <p style={headline(26, GREEN)}>SE TAX DEDUCTION</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '6px 0 0', lineHeight: 1.3 }}>
              Deduct half the 15.3%{'\n'}right on your 1040
            </p>
          </div>
        </div>
      </div>

      {/* Fix 2: SEP-IRA */}
      <div style={{
        position: 'absolute', top: 520, left: 36, right: 36,
        background: '#1E1E1E', borderRadius: 18, padding: '24px 24px',
        opacity: fix2In, transform: `translateX(${interpolate(fix2In, [0, 1], [60, 0])}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Piggy bank */}
          <svg width="80" height="70" viewBox="0 0 80 70">
            <ellipse cx="36" cy="44" rx="28" ry="22" fill={AMBER} />
            <circle cx="60" cy="34" rx="18" r="18" fill={AMBER} />
            <ellipse cx="72" cy="38" rx="10" ry="8" fill="#D97706" />
            <circle cx="69" cy="36" r="2.5" fill={BLACK} />
            <circle cx="75" cy="36" r="2.5" fill={BLACK} />
            <circle cx="58" cy="28" r="3" fill={BLACK} />
            <ellipse cx="57" cy="20" rx="6" ry="8" fill="#D97706" />
            <rect x="26" y="18" width="14" height="4" rx="2" fill={BLACK} />
            <rect x="12" y="62" width="12" height="8" rx="3" fill="#D97706" />
            <rect x="28" y="62" width="12" height="8" rx="3" fill="#D97706" />
            <rect x="44" y="62" width="12" height="8" rx="3" fill="#D97706" />
          </svg>
          <div>
            <p style={headline(26, AMBER)}>SEP-IRA</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '6px 0 0', lineHeight: 1.3 }}>
              Up to 25% of earnings{'\n'}sheltered from all tax
            </p>
          </div>
        </div>
      </div>

      {/* Tax saved bar */}
      <div style={{ position: 'absolute', bottom: 155, left: 36, right: 36 }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '0 0 8px', textAlign: 'center' }}>
          POTENTIAL TAX SAVED
        </p>
        <div style={{ width: '100%', height: 50, background: '#333', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ width: barW, height: 50, background: GREEN, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {barW > 80 && <span style={{ fontFamily: FONT, fontSize: 24, color: WHITE }}>$800+</span>}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 40, right: 40, textAlign: 'center', opacity: ctaOp }}>
        <p style={headline(34, WHITE)}>BUT THERE&apos;S STILL</p>
        <p style={{ ...headline(34, ACCENT), marginTop: 4 }}>ONE MORE RULE...</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: The 30% rule — money jar CTA ───────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const jarIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 20, stiffness: 85 } });

  const fillH = interpolate(frame, [30, 170], [0, 108], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  const coinCount = Math.max(0, Math.floor(interpolate(frame, [30, 155], [0, 5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })));

  const coinYs = [60, 90, 50, 75, 65];
  const coinXs = [90, 130, 160, 100, 145];

  const pulse = interpolate(frame % 38, [0, 19, 38], [1, 1.07, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ctaIn = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 26, stiffness: 65 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 96, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(54, BLACK)}>THE ONE RULE</p>
        <p style={{ ...headline(54, ACCENT), marginTop: 6 }}>THAT SAVES YOU</p>
      </div>

      {/* Mason jar */}
      <div style={{
        position: 'absolute', top: 330, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: jarIn, transform: `scale(${jarIn})`,
      }}>
        <div style={{ position: 'relative', width: 260, height: 300 }}>
          {/* Falling coins */}
          {Array(Math.max(0, coinCount)).fill(0).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: coinYs[i] ?? 60,
              left: coinXs[i] ?? 100,
            }}>
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="17" fill={AMBER} />
                <text x="18" y="24" textAnchor="middle" fontSize="18" fill={WHITE} fontFamily="Arial Black">$</text>
              </svg>
            </div>
          ))}

          {/* Jar SVG */}
          <svg width="260" height="300" viewBox="0 0 260 300" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Jar body */}
            <rect x="48" y="60" width="164" height="210" rx="18" fill="none" stroke="#9CA3AF" strokeWidth="5" />
            {/* Fill (green) */}
            <clipPath id="jarClip">
              <rect x="52" y="64" width="156" height="202" rx="15" />
            </clipPath>
            <rect
              x="52"
              y={Math.max(0, 266 - Math.floor(fillH))}
              width="156"
              height={Math.floor(fillH)}
              fill={GREEN}
              opacity="0.85"
              clipPath="url(#jarClip)"
            />
            {/* Lid */}
            <rect x="38" y="40" width="184" height="26" rx="8" fill="#6B7280" />
            <rect x="58" y="34" width="144" height="14" rx="6" fill="#9CA3AF" />
            {/* 30% label on jar */}
            <text x="130" y="178" textAnchor="middle" fontSize="52" fill={WHITE} fontFamily="Arial Black" opacity="0.95">30%</text>
            <text x="130" y="222" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black" opacity="0.9">OF EVERY $</text>
          </svg>
        </div>
      </div>

      {/* Rule text */}
      <div style={{
        position: 'absolute', bottom: 196, left: 40, right: 40, textAlign: 'center',
        opacity: ctaIn, transform: `translateY(${interpolate(ctaIn, [0, 1], [16, 0])}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, lineHeight: 1.4, margin: 0 }}>
          Set aside <span style={{ color: ACCENT }}>30%</span> the moment it hits your account.
          The IRS never ambushes you again.
        </p>
      </div>

      {/* Pulsing CTA */}
      <div style={{
        position: 'absolute', bottom: 82, left: 60, right: 60,
        display: 'flex', justifyContent: 'center',
        transform: `scale(${pulse})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14,
          paddingTop: 16, paddingBottom: 16, paddingLeft: 36, paddingRight: 36,
        }}>
          <p style={headline(30, WHITE)}>FOLLOW FOR MORE</p>
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
