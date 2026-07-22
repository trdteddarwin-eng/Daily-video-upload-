import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#0F0F0F';
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
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENE 1 ─ You're doing everything right — but there's a trap ─────────────

// ─── SCENE 4 ─ Calendar: 12 missing pay periods = $4,300 gone ────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [80, 190], [0, 4300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterScale = spring({ frame: Math.max(0, frame - 150), fps, from: 1, to: 1.15, config: { damping: 8, stiffness: 120 } });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 80, gap: 28 }}>
        <div style={{ opacity: titleOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(36, BLACK) }}>MAX OUT BY OCTOBER —</p>
          <p style={{ ...headline(36, RED) }}>12 PAY PERIODS WITH $0 MATCH</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, justifyContent: 'center', width: 940 }}>
          {months.map((m, i) => {
            const isMissed = i >= 9;
            return (
              <div key={i} style={{
                width: 124,
                borderRadius: 12,
                background: isMissed ? '#FEE2E2' : '#DCFCE7',
                border: `3px solid ${isMissed ? RED : ACCENT}`,
                padding: '14px 0',
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{ fontFamily: FONT, fontSize: 20, color: isMissed ? RED : ACCENT }}>{m}</span>
                {isMissed ? (
                  <svg width={28} height={28} viewBox="0 0 28 28">
                    <line x1={4} y1={4} x2={24} y2={24} stroke={RED} strokeWidth={3} strokeLinecap="round" />
                    <line x1={24} y1={4} x2={4} y2={24} stroke={RED} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width={28} height={24} viewBox="0 0 28 24">
                    <polyline points="4,12 11,20 24,4" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                )}
                <span style={{ fontFamily: FONT, fontSize: 16, color: isMissed ? RED : ACCENT }}>
                  {isMissed ? 'NO MATCH' : '+$358'}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ transform: `scale(${counterScale})`, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: '#666', margin: 0 }}>TOTAL MATCH FORFEITED</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: RED, margin: 0, letterSpacing: '0.05em' }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─ The fix: spread contributions evenly ──────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eqOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barsGrow = interpolate(frame, [40, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numBars = Math.max(0, Math.floor(13));
  const barH = 160;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 80, gap: 36 }}>
        {/* Equation */}
        <div style={{ opacity: eqOp, textAlign: 'center' as const, background: '#1A1A1A', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 48, paddingRight: 48 }}>
          <p style={{ ...headline(38, WHITE), marginBottom: 10 }}>THE FIX IS SIMPLE</p>
          <p style={{ ...headline(44, ACCENT) }}>$23,500 ÷ 26 = $904</p>
          <p style={{ ...headline(32, WHITE), marginTop: 10 }}>PER PAYCHECK</p>
        </div>

        {/* Even bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: barH + 40 }}>
          {Array(numBars).fill(null).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
              <div style={{ width: 48, height: Math.round(barH * barsGrow), background: ACCENT, borderRadius: '6px 6px 0 0' }} />
              {/* Match arrow */}
              <svg width={28} height={22} viewBox="0 0 28 22" style={{ opacity: barsGrow }}>
                <line x1={14} y1={18} x2={14} y2={4} stroke={ACCENT} strokeWidth={2.5} />
                <polyline points="7,10 14,2 21,10" fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>

        <div style={{ opacity: labelOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(42, ACCENT) }}>FULL MATCH.</p>
          <p style={{ ...headline(42, WHITE) }}>EVERY PAYCHECK.</p>
          <p style={{ ...headline(32, '#AAA'), marginTop: 16 }}>SAME $23,500 MAX. ZERO MISSED MATCH.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2 ─ Per-paycheck matching — stop contributing, they stop matching ──

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // show 13 pay periods (first half of year) then cut off after frame 110
  const activeCount = Math.max(0, Math.floor(interpolate(frame, [30, 110], [0, 13], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const cutOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 80, gap: 32 }}>
        <div style={{ opacity: titleOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(38, BLACK) }}>EMPLOYER MATCHES</p>
          <p style={{ ...headline(38, ACCENT) }}>PER PAYCHECK</p>
          <p style={{ ...headline(28, BLACK), marginTop: 12 }}>STOP CONTRIBUTING = STOP MATCHING</p>
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 16, justifyContent: 'center', width: 940 }}>
          {months.map((m, i) => {
            const active = i < activeCount;
            const cutoff = i >= 9; // Oct onward
            const bgColor = active && !cutoff ? ACCENT : cutoff ? '#FECACA' : '#E5E7EB';
            const textColor = active && !cutoff ? WHITE : cutoff ? RED : '#9CA3AF';
            return (
              <div key={i} style={{ width: 130, borderRadius: 12, background: bgColor, padding: '18px 0', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: FONT, fontSize: 22, color: textColor }}>{m}</span>
                {active && !cutoff && (
                  <svg width={32} height={20} viewBox="0 0 32 20">
                    <polyline points="4,10 12,18 28,4" fill="none" stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                )}
                {cutoff && (
                  <svg width={28} height={28} viewBox="0 0 28 28">
                    <line x1={4} y1={4} x2={24} y2={24} stroke={RED} strokeWidth={3} strokeLinecap="round" />
                    <line x1={24} y1={4} x2={4} y2={24} stroke={RED} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ opacity: cutOp, background: RED, borderRadius: 14, paddingTop: 18, paddingBottom: 18, paddingLeft: 40, paddingRight: 40 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0 }}>NO CONTRIBUTION = NO MATCH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─ 43% of plans have no true-up ──────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pieGrow = interpolate(frame, [20, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseScale = spring({ frame: Math.max(0, frame - 130), fps, from: 1, to: 1.06, config: { damping: 6, stiffness: 80 } });

  // Pie chart: 57% green (true-up exists), 43% red (no true-up)
  // SVG arc for 57% (green): 0 to 205.2deg, 43% (red): 205.2 to 360deg
  const cx = 200;
  const cy = 200;
  const r = 170;
  const greenAngle = 360 * 0.57 * pieGrow;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const gx = cx + r * Math.sin(toRad(greenAngle));
  const gy = cy - r * Math.cos(toRad(greenAngle));
  const greenLargeArc = greenAngle > 180 ? 1 : 0;
  const redStartX = gx;
  const redStartY = gy;
  const fullRedAngle = 360 * 0.43 * pieGrow;
  const redEndAngle = greenAngle + fullRedAngle;
  const rx = cx + r * Math.sin(toRad(Math.min(redEndAngle, 359.9)));
  const ry = cy - r * Math.cos(toRad(Math.min(redEndAngle, 359.9)));
  const redLargeArc = fullRedAngle > 180 ? 1 : 0;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 80, gap: 40 }}>
        <div style={{ opacity: titleOp, textAlign: 'center' as const }}>
          <p style={{ ...headline(38, WHITE) }}>43% OF 401K PLANS</p>
          <p style={{ ...headline(38, RED) }}>HAVE NO TRUE-UP</p>
        </div>

        {/* Pie chart */}
        <div style={{ transform: `scale(${pulseScale})` }}>
          <svg width={400} height={400} viewBox="0 0 400 400">
            {/* Green slice — true-up exists */}
            <path
              d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${greenLargeArc} 1 ${gx} ${gy} Z`}
              fill={ACCENT}
            />
            {/* Red slice — no true-up */}
            {pieGrow > 0.01 && (
              <path
                d={`M ${cx} ${cy} L ${redStartX} ${redStartY} A ${r} ${r} 0 ${redLargeArc} 1 ${rx} ${ry} Z`}
                fill={RED}
              />
            )}
            {/* Center circle */}
            <circle cx={cx} cy={cy} r={60} fill={BG_DARK} />
          </svg>
        </div>

        {/* Legend */}
        <div style={{ opacity: labelOp, display: 'flex', flexDirection: 'column' as const, gap: 18, width: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: ACCENT, flexShrink: 0 }} />
            <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>57% — TRUE-UP EXISTS (you're safe)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: RED, flexShrink: 0 }} />
            <p style={{ fontFamily: FONT, fontSize: 34, color: RED, margin: 0 }}>43% — NO TRUE-UP (you're losing $)</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
  const barW = interpolate(frame, [20, 130], [0, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: Math.max(0, frame - 140), fps, from: 0, to: 1, config: { damping: 10, stiffness: 180 } });

  const paychecks = Math.max(0, Math.floor(5));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top headline */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${titleScale})` }}>
        <p style={{ ...headline(56, WHITE) }}>YOU'RE DOING</p>
        <p style={{ ...headline(56, ACCENT) }}>EVERYTHING RIGHT</p>
      </div>

      {/* Person at laptop SVG */}
      <div style={{ position: 'absolute', top: 360, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width={260} height={300} viewBox="0 0 260 300">
          {/* Head */}
          <circle cx={130} cy={48} r={44} fill={WHITE} />
          {/* Body */}
          <rect x={90} y={100} width={80} height={90} rx={12} fill={WHITE} />
          {/* Left arm */}
          <rect x={36} y={108} width={54} height={18} rx={9} fill={WHITE} />
          {/* Right arm */}
          <rect x={170} y={108} width={54} height={18} rx={9} fill={WHITE} />
          {/* Desk */}
          <rect x={10} y={200} width={240} height={14} rx={4} fill="#333" />
          {/* Legs */}
          <rect x={100} y={190} width={22} height={55} rx={7} fill={WHITE} />
          <rect x={138} y={190} width={22} height={55} rx={7} fill={WHITE} />
          {/* Laptop base */}
          <rect x={60} y={170} width={140} height={16} rx={4} fill="#444" />
          {/* Laptop screen */}
          <rect x={64} y={100} width={132} height={84} rx={6} fill="#1A2F1A" />
          {/* Screen inner */}
          <rect x={70} y={106} width={120} height={68} rx={3} fill="#0D1F0D" />
          {/* Bar chart on screen */}
          <rect x={80} y={138} width={22} height={30} rx={2} fill={ACCENT} />
          <rect x={108} y={128} width={22} height={40} rx={2} fill={ACCENT} />
          <rect x={136} y={118} width={22} height={50} rx={2} fill={ACCENT} />
          {/* Dollar on screen */}
          <text x={130} y={146} fontSize={16} fill={WHITE} textAnchor="middle" fontFamily="Arial" fontWeight="bold">$</text>
        </svg>
      </div>

      {/* 401k progress bar */}
      <div style={{ position: 'absolute', top: 720, left: 80, right: 80 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#AAA', margin: '0 0 14px 0', textAlign: 'center' as const }}>401K PROGRESS</p>
        <div style={{ background: '#222', borderRadius: 14, height: 34, overflow: 'hidden' }}>
          <div style={{ background: ACCENT, height: '100%', width: barW, borderRadius: 14 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE }}>$0</span>
          <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>MAX $23,500</span>
        </div>
      </div>

      {/* Paycheck row */}
      <div style={{ position: 'absolute', top: 860, left: 80, right: 80, display: 'flex', justifyContent: 'space-between' }}>
        {Array(paychecks).fill(null).map((_, i) => (
          <svg key={i} width={60} height={44} viewBox="0 0 60 44">
            <rect x={2} y={2} width={56} height={40} rx={6} fill="none" stroke={ACCENT} strokeWidth={3} />
            <line x1={10} y1={14} x2={50} y2={14} stroke={ACCENT} strokeWidth={2} />
            <line x1={10} y1={22} x2={40} y2={22} stroke={ACCENT} strokeWidth={2} />
            <text x={30} y={36} fontSize={12} fill={ACCENT} textAnchor="middle" fontFamily="Arial" fontWeight="bold">$</text>
          </svg>
        ))}
      </div>

      {/* Warning badge */}
      <div style={{ position: 'absolute', bottom: 160, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${warnScale})` }}>
        <div style={{ background: RED, borderRadius: 20, paddingTop: 20, paddingBottom: 20, paddingLeft: 48, paddingRight: 48 }}>
          <p style={{ fontFamily: FONT, fontSize: 46, color: WHITE, margin: 0 }}>BUT THERE'S A TRAP</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 6 ─ CTA: check your plan document for "true-up" ───────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const checkScale = spring({ frame: Math.max(0, frame - 100), fps, from: 0, to: 1, config: { damping: 10, stiffness: 180 } });
  const ctaOp = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [140, 170], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 80, gap: 40 }}>
        <div style={{ textAlign: 'center' as const }}>
          <p style={{ ...headline(44, BLACK) }}>DO THIS TONIGHT</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 8 }}>SEARCH "TRUE-UP" IN YOUR PLAN DOC</p>
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'center', transform: `scale(${docScale})` }}>
          <svg width={200} height={260} viewBox="0 0 200 260">
            <rect x={10} y={10} width={180} height={240} rx={12} fill={WHITE} stroke={BLACK} strokeWidth={4} />
            <rect x={28} y={50} width={144} height={10} rx={4} fill="#D1D5DB" />
            <rect x={28} y={72} width={120} height={10} rx={4} fill="#D1D5DB" />
            <rect x={28} y={94} width={140} height={10} rx={4} fill="#D1D5DB" />
            <rect x={28} y={118} width={144} height={22} rx={4} fill="#D1FAE5" />
            <text x={100} y={134} fontSize={16} fill={ACCENT} textAnchor="middle" fontFamily="Arial" fontWeight="bold">TRUE-UP</text>
            <rect x={28} y={152} width={110} height={10} rx={4} fill="#D1D5DB" />
            <rect x={28} y={174} width={130} height={10} rx={4} fill="#D1D5DB" />
            <rect x={28} y={196} width={90} height={10} rx={4} fill="#D1D5DB" />
            <circle cx={156} cy={128} r={22} fill="none" stroke={ACCENT} strokeWidth={4} />
            <line x1={172} y1={144} x2={188} y2={160} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
          </svg>

          <svg width={120} height={220} viewBox="0 0 120 220">
            <rect x={6} y={6} width={108} height={208} rx={20} fill={BG_DARK} stroke="#444" strokeWidth={3} />
            <rect x={16} y={26} width={88} height={158} rx={6} fill="#1A2F1A" />
            <circle cx={60} cy={198} r={8} fill="#333" />
            <text x={60} y={80} fontSize={12} fill={ACCENT} textAnchor="middle" fontFamily="Arial" fontWeight="bold">HR DEPT</text>
            <text x={60} y={100} fontSize={10} fill={WHITE} textAnchor="middle" fontFamily="Arial">CALL NOW</text>
            <rect x={24} y={115} width={72} height={30} rx={8} fill={ACCENT} />
            <text x={60} y={135} fontSize={13} fill={WHITE} textAnchor="middle" fontFamily="Arial" fontWeight="bold">CALL HR</text>
          </svg>
        </div>

        <div style={{ transform: `scale(${checkScale})` }}>
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={48} fill={ACCENT} />
            <polyline points="24,52 42,70 76,32" fill="none" stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' as const, background: ACCENT, borderRadius: 18, paddingTop: 24, paddingBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
          <p style={{ fontFamily: FONT, fontSize: 40, color: WHITE, margin: 0 }}>ONE CALL = $4,300</p>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: '8px 0 0 0' }}>BACK IN YOUR POCKET</p>
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
