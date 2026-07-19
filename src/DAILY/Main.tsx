import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F1F5F9';
const ACCENT = '#F97316';
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

// ─── SCENE 1 ─ Hook: Weekend Spending Spike ───────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bar heights animate in
  const weekdayH = interpolate(frame, [20, 52], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const weekendH = interpolate(frame, [52, 88], [0, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: frame - 96, fps, config: { stiffness: 80, damping: 12 } });
  const subOp = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const weekendDays = ['SAT', 'SUN'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 56px' }}>
        <div style={{ opacity: titleOp, marginBottom: 36, textAlign: 'center' as const }}>
          <p style={headline(58, WHITE)}>YOUR BUDGET</p>
          <p style={headline(58, WHITE)}>IGNORES</p>
          <p style={{ ...headline(64, ACCENT), marginTop: 8 }}>THE WORST 2 DAYS</p>
        </div>

        {/* Calendar bar chart */}
        <svg width={960} height={320} viewBox="0 0 960 320" style={{ marginBottom: 28 }}>
          {/* Weekday bars */}
          {days.map((d, i) => (
            <g key={d}>
              <rect
                x={60 + i * 112}
                y={280 - weekdayH}
                width={80}
                height={weekdayH}
                rx={8}
                fill="#334155"
              />
              <text x={100 + i * 112} y={310} fontFamily={FONT} fontSize={20} fill="#94A3B8" textAnchor="middle">{d}</text>
            </g>
          ))}
          {/* Weekend bars — taller and orange */}
          {weekendDays.map((d, i) => (
            <g key={d}>
              <rect
                x={620 + i * 152}
                y={280 - weekendH}
                width={110}
                height={weekendH}
                rx={8}
                fill={ACCENT}
              />
              <text x={675 + i * 152} y={310} fontFamily={FONT} fontSize={22} fill={ACCENT} textAnchor="middle">{d}</text>
            </g>
          ))}
          {/* Baseline */}
          <rect x={40} y={281} width={880} height={4} rx={2} fill="#475569" />
        </svg>

        <p style={{ ...headline(72, ACCENT), transform: `scale(${pctScale})`, transformOrigin: 'center', marginBottom: 28 }}>
          +30% HIGHER
        </p>

        <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          and most budgets never even track it
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2 ─ The Math: $83/weekend × 52 = $4,316/yr ────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyY = interpolate(frame, [10, 38], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countVal = interpolate(frame, [40, 110], [0, 4316], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const perScale = spring({ frame: frame - 116, fps, config: { stiffness: 80, damping: 12 } });
  const subOp = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 32, textAlign: 'center' as const }}>
          <p style={headline(56, BLACK)}>$83 EXTRA</p>
          <p style={{ ...headline(34, '#64748B'), marginTop: 12 }}>EVERY SINGLE WEEKEND</p>
        </div>

        {/* Piggy bank SVG */}
        <svg width={260} height={210} viewBox="0 0 260 210"
          style={{ transform: `translateY(${piggyY}px)`, marginBottom: 28 }}>
          {/* Body */}
          <ellipse cx={120} cy={130} rx={100} ry={76} fill={ACCENT} />
          {/* Head */}
          <circle cx={210} cy={108} r={48} fill={ACCENT} />
          {/* Snout */}
          <ellipse cx={246} cy={118} rx={20} ry={14} fill="#FB923C" />
          <circle cx={241} cy={115} r={4} fill={BLACK} opacity={0.5} />
          <circle cx={251} cy={115} r={4} fill={BLACK} opacity={0.5} />
          {/* Eye */}
          <circle cx={222} cy={96} r={6} fill={WHITE} />
          <circle cx={224} cy={97} r={3} fill={BLACK} />
          {/* Ear */}
          <ellipse cx={196} cy={66} rx={14} ry={18} fill="#FB923C" />
          {/* Coin slot */}
          <rect x={98} y={54} width={44} height={8} rx={4} fill="#EA580C" />
          {/* Legs */}
          <rect x={46} y={192} width={28} height={16} rx={8} fill="#EA580C" />
          <rect x={84} y={192} width={28} height={16} rx={8} fill="#EA580C" />
          <rect x={128} y={192} width={28} height={16} rx={8} fill="#EA580C" />
          <rect x={166} y={192} width={28} height={16} rx={8} fill="#EA580C" />
          {/* Tail */}
          <path d="M22 120 Q4 100 18 80 Q32 60 18 44" stroke="#EA580C" strokeWidth={8} fill="none" strokeLinecap="round" />
        </svg>

        {/* Animated counter */}
        <div style={{ marginBottom: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 96, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>
            ${Math.floor(countVal).toLocaleString()}
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#64748B', margin: '6px 0 0', textAlign: 'center' as const }}>per year</p>
        </div>

        <p style={{ ...headline(50, ACCENT), transform: `scale(${perScale})`, transformOrigin: 'center', marginBottom: 28 }}>
          52 WEEKENDS × $83
        </p>

        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          draining silently while you're just "having fun"
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 ─ The Psychology: Freedom Mode ───────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personY = interpolate(frame, [10, 36], [140, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1Op = interpolate(frame, [44, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Op = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3Op = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: frame - 140, fps, config: { stiffness: 78, damping: 12 } });
  const subOp = interpolate(frame, [168, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bubbles: Array<{ text: string; op: number; x: number; y: number }> = [
    { text: 'TREAT YOURSELF', op: b1Op, x: 480, y: 280 },
    { text: "EVERYONE'S GOING", op: b2Op, x: 700, y: 430 },
    { text: 'I DESERVE IT', op: b3Op, x: 360, y: 550 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(54, WHITE), opacity: titleOp, lineHeight: 1.3, marginBottom: 20 }}>
          YOUR BRAIN SWITCHES<br />INTO FREEDOM MODE
        </p>

        <svg width={960} height={660} viewBox="0 0 960 660"
          style={{ transform: `translateY(${personY}px)` }}>
          {/* Person silhouette */}
          <circle cx={160} cy={120} r={64} fill="#334155" />
          <rect x={96} y={190} width={128} height={180} rx={16} fill="#334155" />
          <rect x={72} y={196} width={40} height={130} rx={16} fill="#334155" />
          <rect x={208} y={196} width={40} height={130} rx={16} fill="#334155" />
          <rect x={98} y={364} width={44} height={110} rx={16} fill="#334155" />
          <rect x={178} y={364} width={44} height={110} rx={16} fill="#334155" />

          {/* Speech bubbles */}
          {bubbles.map((b, i) => (
            <g key={i} opacity={b.op}>
              <rect x={b.x - 10} y={b.y - 40} width={b.text.length * 16 + 20} height={66} rx={16} fill={ACCENT} />
              <polygon points={`${b.x + 20},${b.y + 26} ${b.x},${b.y + 56} ${b.x + 40},${b.y + 26}`} fill={ACCENT} />
              <text x={b.x + (b.text.length * 8)} y={b.y - 2} fontFamily={FONT} fontSize={28} fill={WHITE} textAnchor="middle">{b.text}</text>
            </g>
          ))}
        </svg>

        <p style={{ ...headline(60, ACCENT), transform: `scale(${warnScale})`, transformOrigin: 'center', marginBottom: 24 }}>
          48-HOUR WALLET HIJACK
        </p>

        <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          social pressure and boredom do the rest — every week
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4 ─ The Three Culprits ────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Op = interpolate(frame, [24, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Op = interpolate(frame, [62, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3Op = interpolate(frame, [100, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const culprits = [
    {
      num: '1',
      label: 'RESTAURANTS & BARS',
      icon: (
        <svg width={72} height={72} viewBox="0 0 72 72">
          {/* Fork */}
          <rect x={18} y={8} width={8} height={40} rx={4} fill={WHITE} />
          <rect x={12} y={8} width={6} height={20} rx={3} fill={WHITE} />
          <rect x={26} y={8} width={6} height={20} rx={3} fill={WHITE} />
          <rect x={12} y={8} width={20} height={6} rx={3} fill={WHITE} />
          {/* Knife */}
          <rect x={46} y={8} width={8} height={56} rx={4} fill={WHITE} />
          <path d="M54 8 Q72 24 54 40" fill={WHITE} />
        </svg>
      ),
      op: c1Op,
    },
    {
      num: '2',
      label: 'IMPULSE SHOPPING',
      icon: (
        <svg width={72} height={72} viewBox="0 0 72 72">
          {/* Shopping bag */}
          <rect x={10} y={28} width={52} height={38} rx={8} fill={WHITE} />
          <path d="M22 28 Q22 10 36 10 Q50 10 50 28" stroke={WHITE} strokeWidth={7} fill="none" strokeLinecap="round" />
          <rect x={26} y={42} width={20} height={6} rx={3} fill={ACCENT} />
        </svg>
      ),
      op: c2Op,
    },
    {
      num: '3',
      label: 'ENTERTAINMENT',
      icon: (
        <svg width={72} height={72} viewBox="0 0 72 72">
          {/* Ticket stub */}
          <rect x={6} y={18} width={60} height={36} rx={10} fill={WHITE} />
          <circle cx={6} cy={36} r={8} fill="#F1F5F9" />
          <circle cx={66} cy={36} r={8} fill="#F1F5F9" />
          <line x1={28} y1={18} x2={28} y2={54} stroke="#F1F5F9" strokeWidth={3} strokeDasharray="6,5" />
          <text x={47} y={42} fontFamily={FONT} fontSize={16} fill={ACCENT} textAnchor="middle">★</text>
        </svg>
      ),
      op: c3Op,
    },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(58, BLACK), opacity: titleOp, marginBottom: 44 }}>WHERE IT ALL GOES</p>

        <div style={{ width: '100%', marginBottom: 48 }}>
          {culprits.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 28, opacity: c.op }}>
              <div style={{ width: 80, height: 80, background: ACCENT, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 24, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>{c.num}</span>
              </div>
              <div style={{ width: 88, height: 88, background: '#0F172A', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 28, flexShrink: 0 }}>
                {c.icon}
              </div>
              <p style={{ fontFamily: FONT, fontSize: 40, color: BLACK, margin: 0 }}>{c.label}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: FONT, fontSize: 36, color: '#64748B', opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: 0 }}>
          all three spike hardest Saturday and Sunday — every single week
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 ─ The $425K Retirement Cost ────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const smallH = interpolate(frame, [22, 60], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigH = interpolate(frame, [66, 140], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseScale = spring({ frame: frame - 144, fps, config: { stiffness: 70, damping: 11 } });
  const numOp = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [174, 194], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(52, WHITE), opacity: titleOp, lineHeight: 1.3, marginBottom: 36 }}>
          WHAT THAT $4,316/YR<br />ACTUALLY COSTS YOU
        </p>

        {/* Bar chart comparison */}
        <svg width={700} height={560} viewBox="0 0 700 560" style={{ marginBottom: 16 }}>
          {/* Baseline */}
          <rect x={30} y={521} width={640} height={4} rx={2} fill="#475569" />

          {/* Small bar: spending */}
          <rect x={80} y={520 - smallH} width={160} height={smallH} rx={8} fill="#EF4444" />
          <text x={160} y={540} fontFamily={FONT} fontSize={20} fill="#94A3B8" textAnchor="middle">SPENT</text>
          <text x={160} y={520 - smallH - 12} fontFamily={FONT} fontSize={26} fill="#EF4444" textAnchor="middle">$4,316/yr</text>

          {/* Big bar: invested */}
          <rect x={380} y={520 - bigH} width={240} height={bigH} rx={8} fill={ACCENT} />
          <text x={500} y={540} fontFamily={FONT} fontSize={20} fill="#94A3B8" textAnchor="middle">INVESTED 30 YRS</text>

          {/* House on top of big bar */}
          <g transform={`translate(500, ${520 - bigH - 74}) scale(${houseScale})`} style={{ transformOrigin: '0px 0px' }}>
            <polygon points="0,-56 -68,0 68,0" fill={ACCENT} />
            <rect x={-54} y={0} width={108} height={56} fill="#1E40AF" />
            <rect x={-20} y={18} width={40} height={38} rx={4} fill={BG_DARK} />
          </g>
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, opacity: numOp, margin: 0, letterSpacing: '0.04em', textAlign: 'center' as const }}>
          $425,000
        </p>

        <p style={{ fontFamily: FONT, fontSize: 33, color: WHITE, opacity: subOp, textAlign: 'center' as const, lineHeight: 1.5, margin: '16px 0 0' }}>
          your weekends are quietly stealing your retirement
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6 ─ CTA: The Cash Envelope Fix ────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const envelopeY = interpolate(frame, [10, 38], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Op = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Op = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 154, fps, config: { stiffness: 80, damping: 11 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <p style={{ ...headline(60, BLACK), opacity: titleOp, marginBottom: 36 }}>THE ONE-RULE FIX</p>

        {/* Cash envelope SVG */}
        <svg width={380} height={260} viewBox="0 0 380 260"
          style={{ transform: `translateY(${envelopeY}px)`, marginBottom: 44 }}>
          {/* Envelope body */}
          <rect x={4} y={60} width={372} height={196} rx={16} fill={ACCENT} />
          {/* Envelope flap */}
          <polygon points="4,60 190,160 376,60" fill="#EA580C" />
          {/* Bills inside */}
          <rect x={54} y={100} width={272} height={60} rx={6} fill="#4ADE80" />
          <rect x={62} y={108} width={256} height={44} rx={4} fill="#16A34A" />
          <text x={190} y={138} fontFamily={FONT} fontSize={28} fill={WHITE} textAnchor="middle">WEEKEND CASH</text>
          <rect x={54} y={170} width={272} height={50} rx={6} fill="#86EFAC" opacity={0.7} />
        </svg>

        {/* Two-step checklist */}
        <div style={{ width: '100%', marginBottom: 44 }}>
          {[
            { num: '1', text: 'Pull out your weekend budget in cash — only that', op: c1Op },
            { num: '2', text: "When it's gone, you're done. No card, no app", op: c2Op },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 24, opacity: s.op }}>
              <div style={{ width: 64, height: 64, background: ACCENT, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 24, flexShrink: 0 }}>
                <span style={{ fontFamily: FONT, fontSize: 34, color: WHITE }}>{s.num}</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, margin: 0, lineHeight: 1.4 }}>{s.text}</p>
            </div>
          ))}
        </div>

        <p style={{ ...headline(48, ACCENT), transform: `scale(${ctaScale})`, transformOrigin: 'center' }}>
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
