import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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

// ── Scene 1: Hook — tablet springs in, counter climbs to $1,040 ──────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tabletScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const counterVal = Math.round(
    interpolate(frame, [40, 165], [0, 1040], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 40 }}>
          <p style={headline(72, ACCENT)}>THE TIP TRAP</p>
        </div>

        {/* Tablet with tip screen */}
        <svg
          width={200}
          height={280}
          viewBox="0 0 200 280"
          style={{ transform: `scale(${tabletScale})`, marginBottom: 50 }}
        >
          <rect x="10" y="10" width="180" height="260" rx="16" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
          <rect x="22" y="28" width="156" height="200" rx="6" fill="#2A2A2A" />
          <rect x="35" y="45" width="130" height="16" rx="4" fill="#3A3A3A" />
          <rect x="50" y="70" width="100" height="10" rx="3" fill="#444" />
          <rect x="30" y="100" width="42" height="36" rx="6" fill="#3A3A3A" stroke="#555" strokeWidth="1" />
          <rect x="79" y="100" width="42" height="36" rx="6" fill={ACCENT} />
          <rect x="128" y="100" width="42" height="36" rx="6" fill="#3A3A3A" stroke="#555" strokeWidth="1" />
          <text x="51" y="123" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily="Arial" fontWeight="bold">25%</text>
          <text x="100" y="123" textAnchor="middle" fill={BLACK} fontSize="13" fontFamily="Arial" fontWeight="bold">30%</text>
          <text x="149" y="123" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily="Arial" fontWeight="bold">35%</text>
          <rect x="30" y="148" width="140" height="30" rx="6" fill="#252525" stroke="#444" strokeWidth="1" />
          <text x="100" y="168" textAnchor="middle" fill="#888" fontSize="12" fontFamily="Arial">No Tip</text>
          <circle cx="100" cy="254" r="10" fill="#333" stroke="#555" strokeWidth="1" />
        </svg>

        <div style={{ opacity: subOpacity, textAlign: 'center' }}>
          <p style={headline(100, ACCENT)}>${counterVal.toLocaleString()}</p>
          <p style={{ ...headline(28, WHITE), marginTop: 8 }}>TIPS PER YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Default button trap — tip screen with pre-selected 30% ─────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const screenScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 65 } });
  const statScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 80 } });
  const statOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 40 }}>
          <p style={headline(52, BLACK)}>THE DEFAULT</p>
          <p style={headline(52, ACCENT)}>BUTTON TRAP</p>
        </div>

        {/* Full tip screen */}
        <div style={{ transform: `scale(${screenScale})`, marginBottom: 40 }}>
          <svg width={300} height={200} viewBox="0 0 300 200">
            <rect x="5" y="5" width="290" height="190" rx="12" fill="#1E1E1E" stroke="#333" strokeWidth="2" />
            <text x="150" y="40" textAnchor="middle" fill="#AAA" fontSize="16" fontFamily="Arial">How much would you like to tip?</text>
            <rect x="20" y="60" width="78" height="60" rx="8" fill="#2A2A2A" stroke="#444" strokeWidth="1" />
            <rect x="111" y="60" width="78" height="60" rx="8" fill={ACCENT} />
            <rect x="202" y="60" width="78" height="60" rx="8" fill="#2A2A2A" stroke="#444" strokeWidth="1" />
            <text x="59" y="87" textAnchor="middle" fill="#AAA" fontSize="20" fontFamily="Arial Black" fontWeight="bold">25%</text>
            <text x="59" y="107" textAnchor="middle" fill="#666" fontSize="13" fontFamily="Arial">$3.75</text>
            <text x="150" y="87" textAnchor="middle" fill={BLACK} fontSize="20" fontFamily="Arial Black" fontWeight="bold">30%</text>
            <text x="150" y="107" textAnchor="middle" fill="#333" fontSize="13" fontFamily="Arial">$4.50</text>
            <text x="241" y="87" textAnchor="middle" fill="#AAA" fontSize="20" fontFamily="Arial Black" fontWeight="bold">35%</text>
            <text x="241" y="107" textAnchor="middle" fill="#666" fontSize="13" fontFamily="Arial">$5.25</text>
            <rect x="70" y="135" width="160" height="36" rx="6" fill="#252525" stroke="#333" strokeWidth="1" />
            <text x="150" y="158" textAnchor="middle" fill="#666" fontSize="14" fontFamily="Arial">No Tip</text>
          </svg>
        </div>

        <div style={{ opacity: statOpacity, transform: `scale(${statScale})`, textAlign: 'center' }}>
          <p style={headline(68, ACCENT)}>+23%</p>
          <p style={{ ...headline(26, BLACK), marginTop: 8 }}>MORE TIPS FROM DEFAULTS ALONE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Pause of shame — person at counter, crowd behind, timer arc ─────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p1Scale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 70 } });
  const p2Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 70 } });
  const p3Scale = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 70 } });
  const p4Scale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 70 } });
  const timerProgress = interpolate(frame, [60, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [160, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const r = 45;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - timerProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          <p style={headline(56, WHITE)}>THE PAUSE</p>
          <p style={headline(56, ACCENT)}>OF SHAME</p>
        </div>

        {/* Counter scene */}
        <svg width={400} height={220} viewBox="0 0 400 220" style={{ marginBottom: 40 }}>
          {/* Counter bar */}
          <rect x="100" y="108" width="200" height="8" rx="4" fill="#333" />
          {/* Cashier (orange = staff) */}
          <g transform={`translate(200,65) scale(${p1Scale})`}>
            <circle cx="0" cy="-38" r="18" fill={ACCENT} />
            <rect x="-14" y="-20" width="28" height="38" rx="8" fill={ACCENT} />
          </g>
          {/* Customer at screen */}
          <g transform={`translate(200,148) scale(${p2Scale})`}>
            <circle cx="0" cy="-28" r="14" fill={WHITE} />
            <rect x="-11" y="-14" width="22" height="30" rx="6" fill={WHITE} />
          </g>
          {/* Waiting person 2 */}
          <g transform={`translate(260,155) scale(${p3Scale})`}>
            <circle cx="0" cy="-24" r="11" fill="#666" />
            <rect x="-9" y="-13" width="18" height="26" rx="5" fill="#666" />
          </g>
          {/* Waiting person 3 */}
          <g transform={`translate(310,158) scale(${p4Scale})`}>
            <circle cx="0" cy="-20" r="9" fill="#555" />
            <rect x="-7" y="-11" width="14" height="22" rx="4" fill="#555" />
          </g>
          {/* Timer arc */}
          <g transform="translate(65, 108)">
            <circle cx="0" cy="0" r={r} fill="none" stroke="#333" strokeWidth="6" />
            <circle
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90)"
            />
            <text x="0" y="7" textAnchor="middle" fill={WHITE} fontSize="20" fontFamily="Arial Black" fontWeight="bold">8s</text>
          </g>
        </svg>

        <div style={{ opacity: statOpacity, textAlign: 'center' }}>
          <p style={headline(72, ACCENT)}>$360</p>
          <p style={{ ...headline(24, WHITE), marginTop: 8 }}>LOST TO SOCIAL PRESSURE / YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: Tip creep — four location icons spring in ───────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const i1Scale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 70 } });
  const i2Scale = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 12, stiffness: 70 } });
  const i3Scale = spring({ frame: Math.max(0, frame - 66), fps, config: { damping: 12, stiffness: 70 } });
  const i4Scale = spring({ frame: Math.max(0, frame - 94), fps, config: { damping: 12, stiffness: 70 } });
  const i1Op = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const i2Op = interpolate(frame, [38, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const i3Op = interpolate(frame, [66, 86], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const i4Op = interpolate(frame, [94, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 60 }}>
          <p style={headline(52, BLACK)}>TIP SCREENS</p>
          <p style={headline(52, ACCENT)}>ARE EVERYWHERE</p>
        </div>

        <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Coffee cup */}
          <div style={{ opacity: i1Op, transform: `scale(${i1Scale})`, textAlign: 'center' }}>
            <svg width={100} height={120} viewBox="0 0 100 120">
              <path d="M20 32 L80 32 L72 95 L28 95 Z" fill={ACCENT} />
              <rect x="18" y="26" width="64" height="12" rx="4" fill="#D05D00" />
              <path d="M80 42 Q100 42 100 57 Q100 72 80 72" fill="none" stroke="#D05D00" strokeWidth="5" strokeLinecap="round" />
              <path d="M40 16 Q45 8 40 2" fill="none" stroke="#CCC" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M55 16 Q60 8 55 2" fill="none" stroke="#CCC" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{ ...headline(18, BLACK), marginTop: 8 }}>COFFEE</p>
          </div>

          {/* Self-checkout kiosk */}
          <div style={{ opacity: i2Op, transform: `scale(${i2Scale})`, textAlign: 'center' }}>
            <svg width={100} height={120} viewBox="0 0 100 120">
              <rect x="25" y="10" width="50" height="70" rx="6" fill="#333" />
              <rect x="30" y="16" width="40" height="36" rx="3" fill="#1A9BE6" />
              <rect x="35" y="56" width="30" height="6" rx="3" fill="#555" />
              <rect x="30" y="68" width="40" height="8" rx="3" fill="#444" />
              <rect x="35" y="80" width="30" height="12" rx="2" fill="#555" />
              <rect x="20" y="92" width="60" height="8" rx="4" fill="#444" />
            </svg>
            <p style={{ ...headline(18, BLACK), marginTop: 8 }}>KIOSK</p>
          </div>

          {/* Hotel building */}
          <div style={{ opacity: i3Op, transform: `scale(${i3Scale})`, textAlign: 'center' }}>
            <svg width={100} height={120} viewBox="0 0 100 120">
              <rect x="15" y="36" width="70" height="64" rx="3" fill="#888" />
              <polygon points="50,8 10,36 90,36" fill="#666" />
              <rect x="22" y="46" width="16" height="14" rx="2" fill="#FFD700" />
              <rect x="42" y="46" width="16" height="14" rx="2" fill="#FFD700" />
              <rect x="62" y="46" width="16" height="14" rx="2" fill="#FFD700" />
              <rect x="22" y="66" width="16" height="14" rx="2" fill={ACCENT} />
              <rect x="42" y="66" width="16" height="14" rx="2" fill="#FFD700" />
              <rect x="62" y="66" width="16" height="14" rx="2" fill="#FFD700" />
              <rect x="40" y="84" width="20" height="16" rx="2" fill="#555" />
            </svg>
            <p style={{ ...headline(18, BLACK), marginTop: 8 }}>HOTEL</p>
          </div>

          {/* Airplane */}
          <div style={{ opacity: i4Op, transform: `scale(${i4Scale})`, textAlign: 'center' }}>
            <svg width={100} height={120} viewBox="0 0 100 120">
              <path d="M50 12 L58 40 L88 52 L58 58 L62 88 L50 82 L38 88 L42 58 L12 52 L42 40 Z" fill={ACCENT} />
            </svg>
            <p style={{ ...headline(18, BLACK), marginTop: 8 }}>AIRPORT</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: The math — itemized tip breakdown ────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r1Op = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2Op = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3Op = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r4Op = interpolate(frame, [125, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOp = interpolate(frame, [160, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: 500,
    borderBottom: '1px solid #333',
    paddingBottom: 14,
    marginBottom: 14,
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 50 }}>
          <p style={headline(56, ACCENT)}>THE REAL MATH</p>
        </div>

        <div style={{ opacity: r1Op, ...rowStyle }}>
          <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>Lunch tips</span>
          <span style={{ fontFamily: FONT, fontSize: 26, color: ACCENT }}>+$300</span>
        </div>
        <div style={{ opacity: r2Op, ...rowStyle }}>
          <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>Coffee counter</span>
          <span style={{ fontFamily: FONT, fontSize: 26, color: ACCENT }}>+$260</span>
        </div>
        <div style={{ opacity: r3Op, ...rowStyle }}>
          <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>Delivery apps</span>
          <span style={{ fontFamily: FONT, fontSize: 26, color: ACCENT }}>+$280</span>
        </div>
        <div style={{ opacity: r4Op, ...rowStyle }}>
          <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>Dinner &amp; bars</span>
          <span style={{ fontFamily: FONT, fontSize: 26, color: ACCENT }}>+$200</span>
        </div>

        <div
          style={{
            opacity: totalOp,
            borderTop: `3px solid ${ACCENT}`,
            paddingTop: 20,
            width: 500,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: FONT, fontSize: 42, color: WHITE }}>TOTAL</span>
          <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT }}>$1,040</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: The fix — phone with three tip rules ─────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 60 } });
  const rule1Op = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule2Op = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule3Op = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const saveOp = interpolate(frame, [165, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const saveScale = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, marginBottom: 36 }}>
          <p style={headline(64, BLACK)}>THE FIX</p>
        </div>

        {/* Phone SVG */}
        <svg
          width={130}
          height={210}
          viewBox="0 0 130 210"
          style={{ transform: `scale(${phoneScale})`, marginBottom: 36 }}
        >
          <rect x="5" y="5" width="120" height="200" rx="18" fill="#1E1E1E" stroke="#333" strokeWidth="2" />
          <rect x="13" y="20" width="104" height="155" rx="6" fill="#2A2A2A" />
          <rect x="20" y="55" width="90" height="30" rx="5" fill="#333" />
          <text x="65" y="75" textAnchor="middle" fill="#AAA" fontSize="13" fontFamily="Arial">Counter: 15%</text>
          <rect x="20" y="93" width="90" height="30" rx="5" fill="#333" />
          <text x="65" y="113" textAnchor="middle" fill="#AAA" fontSize="13" fontFamily="Arial">Sit-down: 20%</text>
          <rect x="20" y="131" width="90" height="30" rx="5" fill={GREEN} />
          <text x="65" y="151" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily="Arial Black">Self-checkout: $0</text>
          <rect x="48" y="183" width="34" height="5" rx="2" fill="#555" />
        </svg>

        <div style={{ opacity: rule1Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0 }}>Counter service → 15%</p>
        </div>
        <div style={{ opacity: rule2Op, marginBottom: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0 }}>Sit-down → 20%</p>
        </div>
        <div style={{ opacity: rule3Op, marginBottom: 28, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0 }}>Self-checkout → $0</p>
        </div>

        <div style={{ opacity: saveOp, transform: `scale(${saveScale})`, textAlign: 'center' }}>
          <p style={headline(52, GREEN)}>SAVE $1,040 / YEAR</p>
          <p style={{ ...headline(22, BLACK), marginTop: 10 }}>NOBODY IS ACTUALLY WATCHING</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ───────────────────────────────────────────────────────────────
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



