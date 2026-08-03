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

const BG_DARK = '#0D1117';
const BG_LIGHT = '#FFFBEB';
const BG_WARM = '#FFF1F2';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GRAY = '#6B7280';
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

  const leftS = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
  const rightS = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
  const arrowOp = interpolate(frame, [50, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [90, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glow = interpolate(frame % 40, [0, 20, 40], [0.6, 1.0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <p style={{ ...headline(54, BLACK), marginBottom: 64 }}>QUICK TEST</p>

        <div style={{ display: 'flex', gap: 44, alignItems: 'center', marginBottom: 52 }}>
          {/* $50 TODAY card */}
          <div
            style={{
              transform: `scale(${leftS})`,
              background: '#064E3B',
              borderRadius: 28,
              padding: '52px 42px',
              width: 265,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: `0 0 ${52 * glow}px rgba(16,185,129,${0.72 * glow})`,
            }}
          >
            <svg width="84" height="54" viewBox="0 0 84 54">
              <rect x="1" y="1" width="82" height="52" rx="7" fill="#10B981" stroke="#34D399" strokeWidth="2" />
              <rect x="8" y="8" width="68" height="38" rx="4" fill="#065F46" />
              <text x="42" y="32" textAnchor="middle" fill="#A7F3D0" fontSize="16" fontWeight="bold" fontFamily="Arial">
                $50 BILL
              </text>
            </svg>
            <p style={{ ...headline(66, '#A7F3D0'), margin: '18px 0 8px' }}>$50</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#6EE7B7', margin: 0 }}>TODAY</p>
          </div>

          <p style={{ ...headline(38, '#78716C'), margin: 0 }}>VS</p>

          {/* $100 NEXT MONTH card */}
          <div
            style={{
              transform: `scale(${rightS})`,
              background: '#3F3F46',
              borderRadius: 28,
              padding: '52px 42px',
              width: 265,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            <svg width="84" height="54" viewBox="0 0 84 54">
              <rect x="1" y="1" width="82" height="52" rx="7" fill="#71717A" stroke="#A1A1AA" strokeWidth="2" />
              <rect x="8" y="8" width="68" height="38" rx="4" fill="#3F3F46" />
              <text x="42" y="32" textAnchor="middle" fill="#D4D4D8" fontSize="13" fontWeight="bold" fontFamily="Arial">
                $100 BILL
              </text>
            </svg>
            <p style={{ ...headline(66, '#D4D4D8'), margin: '18px 0 8px' }}>$100</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#A1A1AA', margin: 0 }}>NEXT MONTH</p>
          </div>
        </div>

        {/* Arrow pointing to $50 card */}
        <div style={{ opacity: arrowOp, marginBottom: 38 }}>
          <svg width="320" height="50" viewBox="0 0 320 50">
            <line x1="205" y1="25" x2="62" y2="25" stroke={ACCENT} strokeWidth="4" />
            <polygon points="42,25 72,10 72,40" fill={ACCENT} />
            <text x="215" y="32" fill={ACCENT} fontSize="19" fontWeight="bold" fontFamily="Arial">
              MOST PICK THIS
            </text>
          </svg>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 31,
            color: '#7C2D12',
            textAlign: 'center',
            opacity: bottomOp,
            lineHeight: 1.4,
            maxWidth: 730,
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          That right there is your brain voting to stay broke.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const nowS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 80 }, from: 0, to: 1 });
  const futureOp = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeS = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <p style={{ ...headline(40, WHITE), marginBottom: 40 }}>HYPERBOLIC DISCOUNTING</p>

        <div style={{ transform: `scale(${brainS})`, marginBottom: 36 }}>
          <svg width="200" height="170" viewBox="0 0 200 170">
            <path
              d="M100,15 C68,15 35,38 30,70 C25,100 38,140 70,158 L100,162 L100,15"
              fill="none"
              stroke={ACCENT}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M100,15 C132,15 165,38 170,70 C175,100 162,140 130,158 L100,162 L100,15"
              fill="none"
              stroke={ACCENT}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M50,65 C62,54 78,60 76,73" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38,98 C52,86 70,91 66,106" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M52,132 C66,120 82,127 78,142" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M150,65 C138,54 122,60 124,73" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M162,98 C148,86 130,91 134,106" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M148,132 C134,120 118,127 122,142" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="15" x2="100" y2="162" stroke={ACCENT} strokeWidth="2" strokeDasharray="5,4" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 36 }}>
          <div style={{ transform: `scale(${nowS})`, textAlign: 'center' }}>
            <p style={{ ...headline(86, ACCENT), margin: '0 0 4px', textShadow: `0 0 28px ${ACCENT}` }}>NOW</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: ACCENT, margin: 0 }}>feels worth $100</p>
          </div>
          <p style={{ ...headline(34, '#4B5563'), margin: 0 }}>vs</p>
          <div style={{ opacity: futureOp, textAlign: 'center' }}>
            <p style={{ ...headline(44, GRAY), margin: '0 0 4px' }}>FUTURE</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: GRAY, margin: 0 }}>feels worth $14</p>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${badgeS})`,
            background: ACCENT,
            borderRadius: 18,
            padding: '20px 44px',
            marginBottom: 24,
          }}
        >
          <p style={{ ...headline(50, WHITE), margin: 0 }}>7X DEVALUED IN YOUR BRAIN</p>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#9CA3AF',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 700,
            margin: 0,
          }}
        >
          It literally cannot feel your future self's needs right now.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const storeS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const arrowOp = interpolate(frame, [38, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeS = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 110 }, from: 0, to: 1 });
  const aprS = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_WARM} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 60px',
        }}
      >
        <p style={{ ...headline(44, BLACK), marginBottom: 36 }}>THE "NOW" PREMIUM</p>

        <div style={{ transform: `scale(${storeS})`, marginBottom: 36 }}>
          <svg width="300" height="220" viewBox="0 0 300 220">
            <rect x="30" y="70" width="240" height="145" fill="#374151" rx="4" />
            <rect x="18" y="58" width="264" height="18" fill="#1F2937" rx="3" />
            <rect x="48" y="18" width="204" height="44" fill={ACCENT} rx="6" />
            <text x="150" y="46" textAnchor="middle" fill={WHITE} fontSize="19" fontWeight="bold" fontFamily="Arial">
              PAYDAY LOANS
            </text>
            <rect x="48" y="90" width="72" height="60" fillOpacity="0.45" fill="#60A5FA" rx="3" />
            <line x1="84" y1="90" x2="84" y2="150" stroke="#374151" strokeWidth="2" />
            <line x1="48" y1="120" x2="120" y2="120" stroke="#374151" strokeWidth="2" />
            <rect x="180" y="90" width="72" height="60" fillOpacity="0.45" fill="#60A5FA" rx="3" />
            <line x1="216" y1="90" x2="216" y2="150" stroke="#374151" strokeWidth="2" />
            <line x1="180" y1="120" x2="252" y2="120" stroke="#374151" strokeWidth="2" />
            <rect x="119" y="135" width="62" height="80" fill="#6B7280" rx="4" />
            <circle cx="172" cy="175" r="5" fill="#D1D5DB" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: arrowOp, marginBottom: 28 }}>
          <div style={{ background: '#064E3B', borderRadius: 14, padding: '16px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#6EE7B7', margin: '0 0 4px' }}>BORROW</p>
            <p style={{ ...headline(44, '#10B981'), margin: 0 }}>$100</p>
          </div>
          <svg width="44" height="32" viewBox="0 0 44 32">
            <line x1="2" y1="16" x2="34" y2="16" stroke={BLACK} strokeWidth="3" />
            <polygon points="30,8 44,16 30,24" fill={BLACK} />
          </svg>
          <div style={{ transform: `scale(${feeS})`, background: '#7F1D1D', borderRadius: 14, padding: '16px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#FCA5A5', margin: '0 0 4px' }}>PAY BACK</p>
            <p style={{ ...headline(44, ACCENT), margin: 0 }}>$115</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#FCA5A5', margin: '4px 0 0' }}>in 2 weeks</p>
          </div>
        </div>

        <div style={{ transform: `scale(${aprS})`, background: ACCENT, borderRadius: 16, padding: '16px 36px', marginBottom: 20 }}>
          <p style={{ ...headline(52, WHITE), margin: 0 }}>391% APR</p>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#7C2D12',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 720,
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          People pay hundreds extra just to get money today, not Friday.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const calOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [50, 140], [0, 0.29], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctOp = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthIdx = Math.min(11, Math.floor(interpolate(frame, [20, 180], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <p style={{ ...headline(44, WHITE), marginBottom: 44 }}>YOU DO THIS EVERY MONTH</p>

        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', marginBottom: 44 }}>
          {/* Piggy bank (empty) */}
          <div style={{ transform: `scale(${piggyS})` }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Body */}
              <ellipse cx="85" cy="108" rx="65" ry="54" fill="#374151" stroke={GRAY} strokeWidth="3" />
              {/* Head */}
              <circle cx="148" cy="88" r="36" fill="#374151" stroke={GRAY} strokeWidth="3" />
              {/* Snout */}
              <ellipse cx="171" cy="100" rx="17" ry="12" fill="#4B5563" stroke={GRAY} strokeWidth="2" />
              <circle cx="166" cy="99" r="4" fill={GRAY} />
              <circle cx="176" cy="99" r="4" fill={GRAY} />
              {/* Eye */}
              <circle cx="152" cy="74" r="6" fill={GRAY} />
              <circle cx="154" cy="72" r="2.5" fill={WHITE} />
              {/* Ear */}
              <ellipse cx="141" cy="58" rx="12" ry="8" fill="#4B5563" stroke={GRAY} strokeWidth="2" />
              {/* Coin slot on top */}
              <rect x="68" y="53" width="34" height="7" rx="3" fill="#1F2937" />
              {/* Legs */}
              <rect x="36" y="152" width="20" height="28" rx="6" fill="#4B5563" />
              <rect x="63" y="152" width="20" height="28" rx="6" fill="#4B5563" />
              <rect x="90" y="152" width="20" height="28" rx="6" fill="#4B5563" />
              <rect x="117" y="152" width="20" height="28" rx="6" fill="#4B5563" />
              {/* Tail */}
              <path d="M22,95 C10,80 14,60 24,65" fill="none" stroke={GRAY} strokeWidth="3" strokeLinecap="round" />
              {/* EMPTY label */}
              <text x="85" y="114" textAnchor="middle" fill={GRAY} fontSize="19" fontWeight="bold" fontFamily="Arial">
                EMPTY
              </text>
            </svg>
          </div>

          {/* Calendar */}
          <div style={{ opacity: calOp }}>
            <svg width="170" height="200" viewBox="0 0 170 200">
              <rect x="5" y="30" width="160" height="160" rx="8" fill="#1F2937" stroke={GRAY} strokeWidth="2" />
              <rect x="5" y="30" width="160" height="44" rx="8" fill="#374151" />
              <rect x="5" y="60" width="160" height="14" fill="#374151" />
              <rect x="38" y="18" width="14" height="22" rx="4" fill="#4B5563" stroke={GRAY} strokeWidth="1.5" />
              <rect x="118" y="18" width="14" height="22" rx="4" fill="#4B5563" stroke={GRAY} strokeWidth="1.5" />
              <text x="85" y="57" textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily="Arial">
                {MONTHS[monthIdx]}
              </text>
              <line x1="5" y1="98" x2="165" y2="98" stroke={GRAY} strokeWidth="1" strokeOpacity="0.35" />
              <line x1="5" y1="130" x2="165" y2="130" stroke={GRAY} strokeWidth="1" strokeOpacity="0.35" />
              <line x1="5" y1="162" x2="165" y2="162" stroke={GRAY} strokeWidth="1" strokeOpacity="0.35" />
              <text x="30" y="90" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
              <text x="65" y="90" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
              <text x="100" y="90" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
              <text x="135" y="90" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
              <text x="30" y="122" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
              <text x="65" y="122" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial">✗</text>
            </svg>
          </div>
        </div>

        {/* Emergency fund bar */}
        <div style={{ width: 800, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: GRAY, margin: 0 }}>
              Americans with a 3-month emergency fund
            </p>
            <p style={{ ...headline(38, ACCENT), opacity: pctOp }}>29%</p>
          </div>
          <div style={{ width: '100%', height: 36, background: '#1F2937', borderRadius: 18 }}>
            <div style={{ width: `${barW * 100}%`, height: 36, background: ACCENT, borderRadius: 18 }} />
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            color: WHITE,
            textAlign: 'center',
            opacity: captionOp,
            lineHeight: 1.4,
            maxWidth: 740,
            margin: 0,
          }}
        >
          Your future self always loses the vote.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const growT = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeS = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });

  const BAR_MAX = 440;
  const SPENT_H = BAR_MAX * (36 / 122);
  const investH = growT * BAR_MAX;
  const valueShown = Math.round(interpolate(frame, [30, 160], [0, 122000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const yearShown = Math.round(interpolate(frame, [30, 160], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div style={{ opacity: titleOp, marginBottom: 28, textAlign: 'center' }}>
          <p style={{ ...headline(44, BLACK), marginBottom: 8 }}>THE REAL PRICE TAG</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 27, color: GRAY, margin: 0 }}>
            $100/month · {yearShown} years · 7% returns
          </p>
        </div>

        {/* Bar chart */}
        <div
          style={{
            display: 'flex',
            gap: 72,
            alignItems: 'flex-end',
            height: BAR_MAX + 60,
            marginBottom: 24,
          }}
        >
          {/* SPENT bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: GRAY, marginBottom: 10 }}>$36K spent</p>
            <div
              style={{
                width: 178,
                height: SPENT_H,
                background: '#9CA3AF',
                borderRadius: '8px 8px 0 0',
              }}
            />
            <div style={{ width: 178, height: 4, background: '#6B7280' }} />
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 22,
                color: GRAY,
                margin: '14px 0 0',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              SPENT
              <br />
              <strong style={{ color: BLACK }}>$0 left</strong>
            </p>
          </div>

          {/* INVESTED bar — grows */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#065F46', marginBottom: 10, fontWeight: 'bold' }}>
              ${valueShown.toLocaleString()}
            </p>
            <div
              style={{
                width: 178,
                height: investH,
                background: 'linear-gradient(to top, #065F46, #34D399)',
                borderRadius: '8px 8px 0 0',
              }}
            />
            <div style={{ width: 178, height: 4, background: '#065F46' }} />
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 22,
                color: '#065F46',
                margin: '14px 0 0',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              INVESTED
              <br />
              <strong>at 7%</strong>
            </p>
          </div>
        </div>

        <div style={{ transform: `scale(${badgeS})`, background: ACCENT, borderRadius: 18, padding: '18px 44px' }}>
          <p style={{ ...headline(46, WHITE), margin: 0 }}>$122,000 — THE COST OF NOW</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const dotX = interpolate(frame, [30, 100], [126, 174], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotOp = interpolate(frame, [30, 42, 95, 105], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkS = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 100 }, from: 0, to: 1 });
  const ctaS = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 14, stiffness: 110 }, from: 0, to: 1 });
  const captionOp = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <p style={{ ...headline(44, WHITE), marginBottom: 36 }}>STOP NEGOTIATING WITH IT</p>

        {/* Phone with auto-transfer UI */}
        <div style={{ transform: `scale(${phoneS})`, marginBottom: 36 }}>
          <svg width="300" height="380" viewBox="0 0 300 380">
            <rect x="20" y="10" width="260" height="360" rx="32" fill="#1F2937" stroke={GRAY} strokeWidth="3" />
            <rect x="30" y="28" width="240" height="324" rx="22" fill="#111827" />
            <rect x="110" y="10" width="80" height="20" rx="10" fill="#1F2937" />
            {/* App header */}
            <rect x="30" y="28" width="240" height="56" rx="8" fill="#374151" />
            <rect x="30" y="68" width="240" height="16" fill="#374151" />
            <text x="150" y="62" textAnchor="middle" fill={WHITE} fontSize="18" fontWeight="bold" fontFamily="Arial">
              AUTO-TRANSFER
            </text>
            {/* Bank box */}
            <rect x="48" y="118" width="78" height="62" rx="8" fill="#374151" />
            <text x="87" y="142" textAnchor="middle" fill={GRAY} fontSize="12" fontFamily="Arial">BANK</text>
            <text x="87" y="162" textAnchor="middle" fill={WHITE} fontSize="14" fontWeight="bold" fontFamily="Arial">
              $1,000
            </text>
            {/* Savings box */}
            <rect x="174" y="118" width="78" height="62" rx="8" fill="#064E3B" />
            <text x="213" y="142" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontFamily="Arial">SAVINGS</text>
            <text x="213" y="162" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold" fontFamily="Arial">
              +$100
            </text>
            {/* Arrow track */}
            <line x1="126" y1="149" x2="174" y2="149" stroke="#4B5563" strokeWidth="3" strokeDasharray="5,3" />
            {/* Moving money dot */}
            <circle cx={dotX} cy="149" r="9" fill="#10B981" fillOpacity={dotOp} />
            {/* Auto toggle */}
            <text x="150" y="228" textAnchor="middle" fill={GRAY} fontSize="14" fontFamily="Arial">
              MONTHLY · AUTOMATIC
            </text>
            <rect x="88" y="240" width="124" height="40" rx="20" fill="#064E3B" />
            <circle cx="192" cy="260" r="17" fill="#10B981" />
            <text x="126" y="265" textAnchor="middle" fill="#A7F3D0" fontSize="16" fontWeight="bold" fontFamily="Arial">
              ON
            </text>
            {/* Bottom pill */}
            <rect x="110" y="346" width="80" height="6" rx="3" fill="#374151" />
          </svg>
        </div>

        {/* Green checkmark */}
        <div style={{ transform: `scale(${checkS})`, marginBottom: 28 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="#065F46" stroke="#10B981" strokeWidth="3" />
            <path
              d="M22,42 L36,56 L58,26"
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* CTA badge */}
        <div
          style={{
            transform: `scale(${ctaS})`,
            background: GREEN,
            borderRadius: 18,
            padding: '20px 48px',
            marginBottom: 24,
          }}
        >
          <p style={{ ...headline(48, WHITE), margin: 0 }}>AUTOMATE TODAY</p>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#9CA3AF',
            textAlign: 'center',
            opacity: captionOp,
            lineHeight: 1.4,
            maxWidth: 720,
            margin: 0,
          }}
        >
          Make the future the path of least resistance.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
