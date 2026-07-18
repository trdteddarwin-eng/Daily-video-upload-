import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F1F5F9';
const ACCENT = '#3B82F6';
const WHITE = '#F8FAFC';
const BLACK = '#0F172A';
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

// ─── SCENE 1 ─ Hook: Wrong Day ─────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardY = interpolate(frame, [8, 36], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wrongScale = spring({ frame: frame - 74, fps, config: { stiffness: 90, damping: 12 } });
  const subOp = interpolate(frame, [102, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 44, textAlign: 'center' as const }}>
          <p style={headline(64, WHITE)}>YOU'RE PAYING YOUR</p>
          <p style={headline(64, WHITE)}>CREDIT CARD</p>
          <p style={{ ...headline(68, ACCENT), marginTop: 8 }}>ON THE WRONG DAY</p>
        </div>

        {/* Credit card SVG */}
        <svg width={500} height={310} viewBox="0 0 500 310"
          style={{ transform: `translateY(${cardY}px)`, marginBottom: 36 }}>
          <rect x={0} y={0} width={500} height={310} rx={24} fill="#1E40AF" />
          <rect x={0} y={72} width={500} height={54} fill="#1e1b4b" />
          <rect x={36} y={36} width={72} height={54} rx={6} fill="#FCD34D" />
          <line x1={36} y1={54} x2={108} y2={54} stroke="#D97706" strokeWidth={2} />
          <line x1={36} y1={72} x2={108} y2={72} stroke="#D97706" strokeWidth={2} />
          <line x1={72} y1={36} x2={72} y2={90} stroke="#D97706" strokeWidth={2} />
          {Array.from({ length: Math.max(0, Math.floor(12)) }).map((_, i) => (
            <circle
              key={i}
              cx={44 + Math.floor(i / 4) * 120 + (i % 4) * 26}
              cy={200}
              r={9}
              fill={WHITE}
              opacity={0.7}
            />
          ))}
          <text x={36} y={276} fontFamily={FONT} fontSize={24} fill={WHITE} opacity={0.8}>VALID THRU  12/27</text>
          <text x={326} y={276} fontFamily={FONT} fontSize={22} fill="#FCD34D">DUE: 15th</text>
          {/* Big red X */}
          <line x1={12} y1={12} x2={488} y2={298} stroke="#EF4444" strokeWidth={12} strokeLinecap="round" opacity={xOp} />
          <line x1={488} y1={12} x2={12} y2={298} stroke="#EF4444" strokeWidth={12} strokeLinecap="round" opacity={xOp} />
        </svg>

        <p style={{ ...headline(86, '#EF4444'), transform: `scale(${wrongScale})`, transformOrigin: 'center', marginBottom: 32 }}>
          WRONG DAY
        </p>

        <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          and it's costing you thousands
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// ─── SCENE 2 ─ Utilization Bar ─────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barFill = interpolate(frame, [22, 88], [0, 75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctOp = interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelScale = spring({ frame: frame - 112, fps, config: { stiffness: 80, damping: 12 } });
  const subOp = interpolate(frame, [142, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 40 }}>
          <p style={headline(60, BLACK)}>CREDIT UTILIZATION</p>
          <p style={{ ...headline(34, '#64748B'), marginTop: 14 }}>THE NUMBER THAT MOVES YOUR SCORE</p>
        </div>

        {/* Card showing balance vs limit */}
        <svg width={520} height={178} viewBox="0 0 520 178" style={{ marginBottom: 32 }}>
          <rect x={0} y={0} width={520} height={178} rx={18} fill="#1E40AF" />
          <rect x={0} y={48} width={520} height={42} fill="#1e1b4b" />
          <rect x={24} y={14} width={62} height={46} rx={5} fill="#FCD34D" />
          <text x={24} y={154} fontFamily={FONT} fontSize={26} fill={WHITE} opacity={0.85}>LIMIT: $10,000</text>
          <text x={310} y={154} fontFamily={FONT} fontSize={26} fill="#FCD34D">BAL: $7,500</text>
        </svg>

        {/* Utilization bar */}
        <div style={{ width: '100%', marginBottom: 14 }}>
          <div style={{ width: '100%', height: 44, background: '#CBD5E1', borderRadius: 22, overflow: 'hidden' }}>
            <div style={{ width: `${barFill}%`, height: '100%', background: '#EF4444', borderRadius: 22 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>0%</p>
            <p style={{ fontFamily: FONT, fontSize: 48, color: '#EF4444', margin: 0, opacity: pctOp }}>75% UTILIZED</p>
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>100%</p>
          </div>
        </div>

        <p style={{ ...headline(46, ACCENT), transform: `scale(${labelScale})`, transformOrigin: 'center', marginBottom: 30 }}>
          BUREAUS SNAPSHOT THIS
        </p>

        <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          but only on one specific day — and most people get it wrong
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─ Statement Close Date Timeline ─────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineP = interpolate(frame, [18, 62], [0, 920], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const closeOp = interpolate(frame, [54, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [74, 94], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dueOp = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: frame - 142, fps, config: { stiffness: 72, damping: 11 } });
  const subOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(52, WHITE), opacity: titleOp, lineHeight: 1.3, marginBottom: 48 }}>
          BUREAUS DON'T WAIT<br />FOR YOUR DUE DATE
        </p>

        {/* Timeline */}
        <svg width={960} height={258} viewBox="0 0 960 258" style={{ marginBottom: 40 }}>
          {/* Base line */}
          <rect x={20} y={126} width={lineP} height={6} rx={3} fill="#475569" />
          {/* Statement Close dot */}
          <circle cx={210} cy={128} r={24} fill={ACCENT} opacity={closeOp} />
          <circle cx={210} cy={128} r={14} fill={WHITE} opacity={closeOp} />
          {/* Arrow up */}
          <line x1={210} y1={104} x2={210} y2={50} stroke={ACCENT} strokeWidth={4} opacity={arrowOp} />
          <polygon points="210,26 197,52 223,52" fill={ACCENT} opacity={arrowOp} />
          <text x={210} y={20} fontFamily={FONT} fontSize={19} fill={ACCENT} textAnchor="middle" opacity={arrowOp}>BUREAUS LOOK HERE</text>
          {/* Close date labels */}
          <text x={210} y={178} fontFamily={FONT} fontSize={22} fill={WHITE} textAnchor="middle" opacity={closeOp}>STATEMENT CLOSE</text>
          <text x={210} y={208} fontFamily={FONT} fontSize={26} fill={ACCENT} textAnchor="middle" opacity={closeOp}>e.g. the 5th</text>
          {/* Gap label */}
          <text x={488} y={106} fontFamily={FONT} fontSize={19} fill="#64748B" textAnchor="middle" opacity={dueOp}>10–15 DAYS LATER</text>
          {/* Due date dot */}
          <circle cx={766} cy={128} r={24} fill="#EF4444" opacity={dueOp} />
          <circle cx={766} cy={128} r={14} fill={WHITE} opacity={dueOp} />
          {/* X over due date */}
          <line x1={748} y1={110} x2={784} y2={146} stroke="#EF4444" strokeWidth={6} strokeLinecap="round" opacity={dueOp} />
          <line x1={784} y1={110} x2={748} y2={146} stroke="#EF4444" strokeWidth={6} strokeLinecap="round" opacity={dueOp} />
          {/* Due date labels */}
          <text x={766} y={178} fontFamily={FONT} fontSize={22} fill={WHITE} textAnchor="middle" opacity={dueOp}>DUE DATE</text>
          <text x={766} y={208} fontFamily={FONT} fontSize={26} fill="#EF4444" textAnchor="middle" opacity={dueOp}>e.g. the 20th</text>
        </svg>

        <p style={{ ...headline(50, ACCENT), transform: `scale(${warnScale})`, transformOrigin: 'center', marginBottom: 26 }}>
          MOST PEOPLE NEVER KNEW
        </p>

        <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          pay before the close date — not the due date
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// ─── SCENE 4 ─ Utilization Zones ─────────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const z1Op = interpolate(frame, [20, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const z2Op = interpolate(frame, [56, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const z3Op = interpolate(frame, [92, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const swingScale = spring({ frame: frame - 130, fps, config: { stiffness: 80, damping: 12 } });
  const subOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const zones = [
    { label: '0 – 10%', tag: 'OPTIMAL', color: '#10B981', sub: '+30 to +50 pts possible', op: z1Op },
    { label: '10 – 30%', tag: 'ACCEPTABLE', color: '#F59E0B', sub: 'minimal impact', op: z2Op },
    { label: '30%+', tag: 'DANGER ZONE', color: '#EF4444', sub: '–30 to –60 pts', op: z3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(62, BLACK), opacity: titleOp, marginBottom: 48 }}>THE UTILIZATION ZONES</p>

        <div style={{ width: '100%', marginBottom: 44 }}>
          {zones.map((z, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 24, opacity: z.op }}>
              <div style={{ width: 196, height: 76, background: z.color, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 28, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT, fontSize: 30, color: WHITE }}>{z.label}</span>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, margin: 0 }}>{z.tag}</p>
                <p style={{ fontFamily: FONT, fontSize: 28, color: '#64748B', margin: '4px 0 0' }}>{z.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...headline(70, '#EF4444'), transform: `scale(${swingScale})`, transformOrigin: 'center', marginBottom: 28 }}>
          50-POINT SWING
        </p>

        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          between optimal and danger zones — that gap has a price tag
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─ The $21K Mortgage Math ────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseY = interpolate(frame, [10, 40], [180, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftOp = interpolate(frame, [48, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightOp = interpolate(frame, [78, 102], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffScale = spring({ frame: frame - 118, fps, config: { stiffness: 80, damping: 13 } });
  const subOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(56, WHITE), opacity: titleOp, lineHeight: 1.3, marginBottom: 30 }}>
          THE MORTGAGE<br />MATH IS BRUTAL
        </p>

        {/* House SVG */}
        <svg width={220} height={196} viewBox="0 0 220 196"
          style={{ transform: `translateY(${houseY}px)`, marginBottom: 34 }}>
          <polygon points="110,10 10,100 210,100" fill={ACCENT} />
          <rect x={30} y={98} width={160} height={98} fill="#1E40AF" />
          <rect x={80} y={140} width={60} height={56} rx={6} fill={BG_DARK} />
          <rect x={42} y={116} width={42} height={36} rx={4} fill={ACCENT} opacity={0.45} />
          <rect x={136} y={116} width={42} height={36} rx={4} fill={ACCENT} opacity={0.45} />
        </svg>

        {/* Two score paths */}
        <div style={{ display: 'flex', width: '100%', marginBottom: 36 }}>
          <div style={{ flex: 1, background: '#14532D', borderRadius: 16, padding: 28, opacity: leftOp, marginRight: 18 }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: '#4ADE80', margin: '0 0 10px' }}>SCORE: 760+</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: '0 0 8px' }}>Rate: 6.5%</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>Interest: $412K</p>
          </div>
          <div style={{ flex: 1, background: '#7F1D1D', borderRadius: 16, padding: 28, opacity: rightOp }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: '#FCA5A5', margin: '0 0 10px' }}>SCORE: 700</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, margin: '0 0 8px' }}>Rate: 7.2%</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>Interest: $433K</p>
          </div>
        </div>

        <p style={{ ...headline(76, '#FCD34D'), transform: `scale(${diffScale})`, transformOrigin: 'center', marginBottom: 24 }}>
          $21,000 DIFFERENCE
        </p>

        <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          one wrong payment date, six figures of damage
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// ─── SCENE 6 ─ The Two-Minute Fix / CTA ─────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneY = interpolate(frame, [10, 38], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1Op = interpolate(frame, [48, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Op = interpolate(frame, [112, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 158, fps, config: { stiffness: 80, damping: 11 } });
  const scoreBarH = interpolate(frame, [40, 132], [130, 44], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { num: '1', text: 'Find your statement close date in your card app', op: s1Op },
    { num: '2', text: 'Pay balance DOWN before that date — not the due date', op: s2Op },
    { num: '3', text: 'Score updates within 30 days', op: s3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(62, BLACK), opacity: titleOp, marginBottom: 36 }}>THE TWO-MINUTE FIX</p>

        {/* Phone SVG with rising score */}
        <svg width={188} height={308} viewBox="0 0 188 308"
          style={{ transform: `translateY(${phoneY}px)`, marginBottom: 44 }}>
          <rect x={4} y={4} width={180} height={300} rx={26} fill="#1E293B" />
          <rect x={14} y={26} width={160} height={256} rx={8} fill="#0F172A" />
          <rect x={22} y={34} width={144} height={240} rx={4} fill="#0F172A" />
          <rect x={22} y={scoreBarH} width={144} height={274 - scoreBarH} rx={4} fill={ACCENT} opacity={0.85} />
          <text x={94} y={192} fontFamily={FONT} fontSize={46} fill={WHITE} textAnchor="middle">760</text>
          <text x={94} y={228} fontFamily={FONT} fontSize={18} fill="#94A3B8" textAnchor="middle">CREDIT SCORE</text>
          <circle cx={94} cy={294} r={11} fill="#334155" />
        </svg>

        {/* Three-step checklist */}
        <div style={{ width: '100%', marginBottom: 42 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 22, opacity: s.op }}>
              <div style={{ width: 58, height: 58, background: ACCENT, borderRadius: 29, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 24, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT, fontSize: 30, color: WHITE }}>{s.num}</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 31, color: BLACK, margin: 0, lineHeight: 1.4 }}>{s.text}</p>
            </div>
          ))}
        </div>

        <p style={{ ...headline(50, ACCENT), transform: `scale(${ctaScale})`, transformOrigin: 'center' }}>
          FOLLOW FOR DAILY MONEY HACKS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ────────────────────────────────────────────────────────────

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

