import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const BG_DARK = '#0F1923';
const BG_LIGHT = '#FEF2F2';
const ACCENT = '#EF4444';
const ACCENT_DARK = '#991B1B';
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GRAY = '#64748B';
const SUCCESS = '#10B981';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const figureT = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const paycheckOpacity = interpolate(frame, [18, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const inflationSlide = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 80 } });
  const warningY = interpolate(inflationSlide, [0, 1], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const warningOpacity = interpolate(frame, [88, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <p style={headline(48, WHITE)}>YOUR RAISE</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, textAlign: 'center', margin: '8px 0 32px' }}>
          looks like a win...
        </p>

        {/* Celebrating worker */}
        <div style={{ transform: `scale(${figureT})`, transformOrigin: 'center center', marginBottom: 28 }}>
          <svg width="240" height="270" viewBox="0 0 240 270">
            <circle cx="120" cy="52" r="42" fill="#4B5563" stroke={WHITE} strokeWidth="4" />
            <path d="M103,44 Q112,36 121,44" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M125,44 Q134,36 143,44" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M104,66 Q120,80 136,66" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M82,94 C70,86 168,86 158,94 L162,192 L120,182 L78,192 Z" fill="#374151" stroke={WHITE} strokeWidth="3" />
            <path d="M82,116 C60,94 44,68 52,46" stroke="#374151" strokeWidth="26" fill="none" strokeLinecap="round" />
            <rect x="34" y="24" width="38" height="32" rx="9" fill="#4B5563" stroke={WHITE} strokeWidth="3" />
            <path d="M158,116 C180,94 196,68 188,46" stroke="#374151" strokeWidth="26" fill="none" strokeLinecap="round" />
            <rect x="168" y="24" width="38" height="32" rx="9" fill="#4B5563" stroke={WHITE} strokeWidth="3" />
            <rect x="88" y="192" width="36" height="60" rx="9" fill="#374151" stroke={WHITE} strokeWidth="2" />
            <rect x="116" y="192" width="36" height="60" rx="9" fill="#374151" stroke={WHITE} strokeWidth="2" />
          </svg>
        </div>

        {/* Paycheck card */}
        <div style={{ opacity: paycheckOpacity, marginBottom: 22 }}>
          <svg width="440" height="100" viewBox="0 0 440 100">
            <rect x="2" y="2" width="436" height="96" rx="16" fill="#1E293B" stroke={SUCCESS} strokeWidth="4" />
            <text x="32" y="38" fontFamily={FONT_BODY} fontSize="20" fill={GRAY}>PAYCHECK</text>
            <text x="32" y="80" fontFamily={FONT} fontSize="50" fill={SUCCESS} fontWeight="900">+4.0% RAISE</text>
          </svg>
        </div>

        {/* Inflation warning slides in */}
        <div style={{ transform: `translateY(${warningY}px)`, opacity: warningOpacity }}>
          <svg width="440" height="88" viewBox="0 0 440 88">
            <rect x="2" y="2" width="436" height="84" rx="16" fill="#450A0A" stroke={ACCENT} strokeWidth="4" />
            <text x="32" y="34" fontFamily={FONT_BODY} fontSize="20" fill={ACCENT}>BUT INFLATION IN 2022...</text>
            <text x="32" y="72" fontFamily={FONT} fontSize="46" fill={ACCENT} fontWeight="900">7.9% — HIGHER</text>
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 1

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wageT = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 70 } });
  const infT = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 14, stiffness: 70 } });
  const labelOpacity = interpolate(frame, [88, 118], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeT = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 12, stiffness: 100 } });

  const MAX_H = 420;
  const WAGE_H = wageT * MAX_H * (5 / 8);
  const INF_H = infT * MAX_H;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '80px 60px 40px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 16 }}>
          <p style={headline(50, BLACK)}>2022 — THE MATH</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, textAlign: 'center', margin: '8px 0 0' }}>
            Nominal raise vs real inflation
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 80,
            height: MAX_H + 120,
          }}
        >
          {/* Wages bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, marginBottom: 12 }}>
              <p style={{ fontFamily: FONT, fontSize: 56, color: SUCCESS, margin: 0 }}>+5%</p>
            </div>
            <div
              style={{
                width: 175,
                height: Math.max(0, WAGE_H),
                background: `linear-gradient(to top, #065F46, ${SUCCESS})`,
                borderRadius: '14px 14px 0 0',
              }}
            />
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: '16px 0 0', textTransform: 'uppercase' as const }}>
              WAGES
            </p>
          </div>

          {/* Inflation bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, marginBottom: 12 }}>
              <p style={{ fontFamily: FONT, fontSize: 56, color: ACCENT, margin: 0 }}>+7.9%</p>
            </div>
            <div
              style={{
                width: 175,
                height: Math.max(0, INF_H),
                background: `linear-gradient(to top, ${ACCENT_DARK}, ${ACCENT})`,
                borderRadius: '14px 14px 0 0',
              }}
            />
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: '16px 0 0', textTransform: 'uppercase' as const }}>
              INFLATION
            </p>
          </div>
        </div>

        <div style={{ transform: `scale(${badgeT})`, transformOrigin: 'center center' }}>
          <div style={{ background: ACCENT, borderRadius: 20, padding: '18px 44px' }}>
            <p style={{ fontFamily: FONT, fontSize: 48, color: WHITE, margin: 0, textAlign: 'center' as const }}>
              YOU LOST $2,700
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 2

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const salaryT = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 85 } });
  const drainProgress = interpolate(frame, [50, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const labelOpacity = interpolate(frame, [128, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const drainAmount = Math.floor(drainProgress * 2730);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 36 }}>
          <p style={headline(54, WHITE)}>YOUR PAYCHECK</p>
        </div>

        {/* Paycheck with drain overlay */}
        <div style={{ transform: `scale(${salaryT})`, transformOrigin: 'center center', marginBottom: 36 }}>
          <svg width="500" height="210" viewBox="0 0 500 210">
            <rect x="2" y="2" width="496" height="206" rx="20" fill="#1E293B" stroke="#334155" strokeWidth="4" />
            <line x1="32" y1="75" x2="468" y2="75" stroke="#334155" strokeWidth="2" />
            <line x1="32" y1="130" x2="468" y2="130" stroke="#334155" strokeWidth="2" />
            <text x="32" y="52" fontFamily={FONT_BODY} fontSize="22" fill={GRAY}>PAY TO: YOU</text>
            <text x="32" y="114" fontFamily={FONT} fontSize="64" fill={WHITE} fontWeight="900">$70,000</text>
            <text x="32" y="162" fontFamily={FONT_BODY} fontSize="26" fill={GRAY}>ANNUAL SALARY</text>
            <rect
              x="2"
              y={2 + Math.floor(206 * (1 - drainProgress))}
              width="496"
              height={Math.max(0, Math.floor(206 * drainProgress))}
              fill={ACCENT}
              opacity="0.22"
            />
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: '0 0 8px' }}>
            purchasing power drained:
          </p>
          <p style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, margin: 0, letterSpacing: '0.02em' }}>
            -${drainAmount.toLocaleString()}
          </p>
        </div>

        <div style={{ opacity: labelOpacity, marginTop: 22 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, textAlign: 'center', margin: 0 }}>
            every year this keeps happening
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 3

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const deskT = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 16, stiffness: 80 } });
  const textOpacity = interpolate(frame, [62, 98], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeOpacity = interpolate(frame, [130, 162], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 32 }}>
          <p style={headline(52, BLACK)}>HR KNOWS</p>
        </div>

        {/* HR desk scene */}
        <div style={{ transform: `scale(${deskT})`, transformOrigin: 'center center' }}>
          <svg width="500" height="320" viewBox="0 0 500 320">
            <rect x="30" y="238" width="440" height="22" rx="8" fill="#92400E" />
            <rect x="50" y="258" width="28" height="56" rx="6" fill="#78350F" />
            <rect x="422" y="258" width="28" height="56" rx="6" fill="#78350F" />
            <rect x="165" y="110" width="200" height="132" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="4" />
            <rect x="228" y="240" width="74" height="12" rx="4" fill="#334155" />
            <rect x="210" y="250" width="110" height="10" rx="4" fill="#475569" />
            <rect x="175" y="122" width="180" height="110" rx="6" fill="#0F172A" />
            <text x="185" y="144" fontFamily={FONT_BODY} fontSize="13" fill={GRAY}>BUDGET MEMO 2022</text>
            <text x="185" y="166" fontFamily={FONT_BODY} fontSize="13" fill="#64748B">CPI forecast: 7.9%</text>
            <text x="185" y="186" fontFamily={FONT_BODY} fontSize="13" fill={SUCCESS}>Raise budget: 5.0%</text>
            <text x="185" y="206" fontFamily={FONT} fontSize="12" fill={ACCENT}>Real cost to worker: -2.9%</text>
            <text x="185" y="224" fontFamily={FONT_BODY} fontSize="12" fill="#475569">Won&apos;t raise eyebrows</text>
            <circle cx="95" cy="162" r="42" fill="#4B5563" stroke={WHITE} strokeWidth="3" />
            <circle cx="82" cy="154" r="8" fill={WHITE} />
            <circle cx="108" cy="154" r="8" fill={WHITE} />
            <path d="M80,178 Q95,190 110,178" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60,206 C56,196 134,196 136,206 L138,240 L95,232 L52,240 Z" fill="#374151" stroke={WHITE} strokeWidth="2" />
            <path d="M132,224 C150,214 165,214 172,226" stroke="#374151" strokeWidth="22" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, margin: 0, lineHeight: 1.5 }}>
            Raise budgets are built around<br />the same CPI data you ignore.
          </p>
        </div>

        <div style={{ opacity: badgeOpacity, marginTop: 24 }}>
          <div style={{ background: ACCENT, borderRadius: 16, padding: '14px 36px' }}>
            <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              They&apos;re banking on you
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 4

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chartProgress = interpolate(frame, [22, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const gapT = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 90 } });

  const CHART_W = 440;
  const CHART_H = 340;
  const OX = 40;
  const OY = 55;

  const nomPoints = Array.from({ length: 11 }, (_u: unknown, i: number) => ({
    x: OX + (i / 10) * CHART_W,
    y: OY + CHART_H - (i / 10) * CHART_H * 0.84,
  }));
  const realPoints = Array.from({ length: 11 }, (_u: unknown, i: number) => ({
    x: OX + (i / 10) * CHART_W,
    y: OY + CHART_H - (i / 10) * CHART_H * 0.19,
  }));

  const pathFor = (pts: { x: number; y: number }[], prog: number) => {
    const visible = Math.max(2, Math.floor(prog * (pts.length - 1)) + 1);
    const slice = pts.slice(0, Math.min(visible, pts.length));
    return slice.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '70px 40px 40px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 20 }}>
          <p style={headline(52, WHITE)}>10-YEAR DRIFT</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, textAlign: 'center', margin: '8px 0 0' }}>
            What you earn vs. what you can buy
          </p>
        </div>

        <svg width="520" height={CHART_H + OY + 80} viewBox={`0 0 520 ${CHART_H + OY + 80}`}>
          {[0, 1, 2, 3, 4].map((i) => {
            const y = OY + (i / 4) * CHART_H;
            return <line key={i} x1={OX} y1={y} x2={OX + CHART_W} y2={y} stroke="#1E293B" strokeWidth="2" />;
          })}
          <line x1={OX} y1={OY} x2={OX} y2={OY + CHART_H} stroke="#334155" strokeWidth="3" />
          <line x1={OX} y1={OY + CHART_H} x2={OX + CHART_W} y2={OY + CHART_H} stroke="#334155" strokeWidth="3" />
          <text x={OX} y={OY + CHART_H + 28} fontFamily={FONT_BODY} fontSize="22" fill={GRAY} textAnchor="middle">Yr 0</text>
          <text x={OX + CHART_W} y={OY + CHART_H + 28} fontFamily={FONT_BODY} fontSize="22" fill={GRAY} textAnchor="middle">Yr 10</text>
          <path d={pathFor(nomPoints, chartProgress)} fill="none" stroke={SUCCESS} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathFor(realPoints, chartProgress)} fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14,8" />
          <line x1="55" y1={OY + CHART_H + 58} x2="105" y2={OY + CHART_H + 58} stroke={SUCCESS} strokeWidth="5" />
          <text x="114" y={OY + CHART_H + 64} fontFamily={FONT_BODY} fontSize="21" fill={WHITE}>Nominal salary</text>
          <line x1="305" y1={OY + CHART_H + 58} x2="355" y2={OY + CHART_H + 58} stroke={ACCENT} strokeWidth="5" strokeDasharray="10,6" />
          <text x="364" y={OY + CHART_H + 64} fontFamily={FONT_BODY} fontSize="21" fill={WHITE}>Real buying power</text>
        </svg>

        <div style={{ transform: `scale(${gapT})`, transformOrigin: 'center center', marginTop: 8 }}>
          <div style={{ background: ACCENT, borderRadius: 20, padding: '16px 44px' }}>
            <p style={{ fontFamily: FONT, fontSize: 52, color: WHITE, margin: 0, textAlign: 'center' as const }}>
              $18,000 GAP
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: WHITE, margin: '6px 0 0', textAlign: 'center' as const, opacity: 0.9 }}>
              in real purchasing power — vanished
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// END SCENE 5

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tableT = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 16, stiffness: 80 } });
  const card1T = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 14, stiffness: 90 } });
  const card2T = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 14, stiffness: 90 } });
  const ctaOpacity = interpolate(frame, [135, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const card1X = interpolate(card1T, [0, 1], [-900, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const card2X = interpolate(card2T, [0, 1], [-900, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 50px',
        }}
      >
        <div style={{ opacity: titleOpacity, marginBottom: 24 }}>
          <p style={headline(54, BLACK)}>THE FIX</p>
        </div>

        {/* Negotiation table */}
        <div style={{ transform: `scale(${tableT})`, transformOrigin: 'center center', marginBottom: 28 }}>
          <svg width="500" height="230" viewBox="0 0 500 230">
            <rect x="40" y="135" width="420" height="20" rx="7" fill="#92400E" />
            <rect x="62" y="153" width="26" height="60" rx="6" fill="#78350F" />
            <rect x="412" y="153" width="26" height="60" rx="6" fill="#78350F" />
            <circle cx="98" cy="70" r="38" fill="#4B5563" stroke={WHITE} strokeWidth="3" />
            <circle cx="86" cy="62" r="7" fill={WHITE} />
            <circle cx="110" cy="62" r="7" fill={WHITE} />
            <path d="M84,85 Q98,96 112,85" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M68,108 C65,98 130,98 132,108 L134,136 L98,128 L62,136 Z" fill="#374151" stroke={WHITE} strokeWidth="2" />
            <rect x="140" y="28" width="164" height="68" rx="13" fill={SUCCESS} />
            <polygon points="140,70 116,88 154,70" fill={SUCCESS} />
            <text x="222" y="58" textAnchor="middle" fontFamily={FONT} fontSize="22" fill={WHITE} fontWeight="900">CPI + 2%</text>
            <text x="222" y="82" textAnchor="middle" fontFamily={FONT_BODY} fontSize="18" fill={WHITE}>minimum</text>
            <circle cx="404" cy="70" r="38" fill="#374151" stroke={WHITE} strokeWidth="3" />
            <circle cx="392" cy="62" r="7" fill={WHITE} />
            <circle cx="416" cy="62" r="7" fill={WHITE} />
            <path d="M390,84 Q404,72 418,84" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M370,108 C368,98 440,98 442,108 L444,136 L404,128 L364,136 Z" fill="#4B5563" stroke={WHITE} strokeWidth="2" />
            <path d="M195,130 Q250,110 305,130" stroke={ACCENT} strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Action cards */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              transform: `translateX(${card1X}px)`,
              display: 'flex',
              alignItems: 'center',
              background: '#FEE2E2',
              borderRadius: 20,
              padding: '20px 28px',
              gap: 18,
            }}
          >
            <div
              style={{
                background: ACCENT,
                borderRadius: 50,
                width: 58,
                height: 58,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>1</p>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: BLACK, margin: 0, fontWeight: 700 }}>
              Know this year&apos;s CPI before your review
            </p>
          </div>

          <div
            style={{
              transform: `translateX(${card2X}px)`,
              display: 'flex',
              alignItems: 'center',
              background: ACCENT,
              borderRadius: 20,
              padding: '20px 28px',
              gap: 18,
            }}
          >
            <div
              style={{
                background: WHITE,
                borderRadius: 50,
                width: 58,
                height: 58,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>2</p>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: WHITE, margin: 0, fontWeight: 700 }}>
              Ask for inflation plus your actual productivity gains
            </p>
          </div>
        </div>

        <div style={{ opacity: ctaOpacity, marginTop: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 44, color: ACCENT, textAlign: 'center', margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
            FOLLOW FOR MORE
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, textAlign: 'center', margin: '10px 0 0' }}>
            daily money psychology
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

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
