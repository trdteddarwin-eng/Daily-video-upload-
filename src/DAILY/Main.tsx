import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
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

  const houseS = spring({ frame, fps, config: { damping: 14, stiffness: 90 }, from: 0, to: 1 });
  const badgeS = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const warnS = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 10, stiffness: 110 }, from: 0, to: 1 });
  const bottomOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(72, BLACK)}>THE REFINANCE</p>
          <p style={headline(72, ACCENT)}>TRAP</p>
        </div>

        <div style={{ transform: `scale(${houseS})` }}>
          <svg width="300" height="260" viewBox="0 0 300 260">
            <rect x="198" y="28" width="28" height="52" rx="4" fill="#9CA3AF" />
            <polygon points="150,18 292,122 8,122" fill={BLACK} />
            <rect x="34" y="122" width="232" height="138" rx="4" fill="#E5E7EB" />
            <rect x="120" y="200" width="60" height="60" rx="5" fill="#92400E" />
            <circle cx="172" cy="232" r="5" fill={ACCENT} />
            <rect x="50" y="142" width="70" height="54" rx="4" fill="#BFDBFE" />
            <line x1="85" y1="142" x2="85" y2="196" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="50" y1="169" x2="120" y2="169" stroke="#9CA3AF" strokeWidth="2" />
            <rect x="180" y="142" width="70" height="54" rx="4" fill="#BFDBFE" />
            <line x1="215" y1="142" x2="215" y2="196" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="180" y1="169" x2="250" y2="169" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        </div>

        <div
          style={{
            transform: `scale(${badgeS})`,
            background: GREEN,
            borderRadius: 16,
            padding: '14px 40px',
          }}
        >
          <p style={{ ...headline(52, WHITE), margin: 0 }}>SAVE $200/MO</p>
        </div>

        <div style={{ transform: `scale(${warnS})` }}>
          <svg width="138" height="122" viewBox="0 0 138 122">
            <polygon points="69,6 132,118 6,118" fill={ACCENT} />
            <text x="69" y="106" textAnchor="middle" fill={WHITE} fontSize="66" fontFamily="Arial Black" fontWeight="bold">!</text>
          </svg>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 32,
            color: '#7C2D12',
            textAlign: 'center',
            opacity: bottomOp,
            lineHeight: 1.4,
            maxWidth: 700,
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          but here's what the bank left out...
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardS = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });

  const items = [
    { label: 'Loan Origination', amount: '$2,100' },
    { label: 'Appraisal Fee', amount: '$600' },
    { label: 'Title Insurance', amount: '$1,800' },
    { label: 'Other Fees', amount: '$1,500' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>CLOSING COSTS</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: GRAY, margin: '8px 0 0' }}>
            day one — out of your pocket
          </p>
        </div>

        <div
          style={{
            transform: `scale(${cardS})`,
            background: WHITE,
            borderRadius: 24,
            padding: '48px 56px',
            width: 820,
            border: `4px solid ${ACCENT}`,
            boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 34,
              color: BLACK,
              textAlign: 'center',
              margin: '0 0 32px',
              letterSpacing: '0.1em',
              borderBottom: `3px solid ${ACCENT}`,
              paddingBottom: 24,
            }}
          >
            REFINANCE STATEMENT
          </p>

          {items.map((item, i) => {
            const itemOp = interpolate(
              frame,
              [30 + i * 22, 52 + i * 22],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                  opacity: itemOp,
                }}
              >
                <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: BLACK, margin: 0 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: ACCENT, margin: 0, fontWeight: 'bold' }}>
                  {item.amount}
                </p>
              </div>
            );
          })}

          <div
            style={{
              borderTop: `3px solid ${BLACK}`,
              paddingTop: 24,
              marginTop: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 44, color: BLACK, margin: 0, letterSpacing: '0.08em' }}>
              TOTAL
            </p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: ACCENT, margin: 0, letterSpacing: '0.08em' }}>
              $6,000
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            color: '#FCA5A5',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 740,
            margin: 0,
          }}
        >
          gone before you save a single dollar...
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxOp = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const resultS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const barProgress = interpolate(frame, [50, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(barProgress, [0, 1], [0, 700]);
  const bottomOp = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_WARM} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, BLACK)}>THE MATH</p>
          <p style={headline(52, ACCENT)}>NOBODY SHOWS YOU</p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            opacity: boxOp,
            background: '#FEE2E2',
            borderRadius: 20,
            padding: '32px 44px',
            border: `3px solid ${ACCENT}`,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: BLACK, margin: '0 0 4px' }}>CLOSING</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: BLACK, margin: '0 0 4px' }}>COSTS</p>
            <p style={{ fontFamily: FONT, fontSize: 62, color: ACCENT, margin: 0, letterSpacing: '0.05em' }}>$6,000</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 72, color: BLACK, margin: '0 8px' }}>÷</p>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: BLACK, margin: '0 0 4px' }}>MONTHLY</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: BLACK, margin: '0 0 4px' }}>SAVINGS</p>
            <p style={{ fontFamily: FONT, fontSize: 62, color: GREEN, margin: 0, letterSpacing: '0.05em' }}>$200</p>
          </div>
        </div>

        <div style={{ transform: `scale(${resultS})`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: '#7C2D12', margin: '0 0 8px' }}>BREAK-EVEN:</p>
          <p style={{ fontFamily: FONT, fontSize: 148, color: ACCENT, margin: 0, letterSpacing: '0.05em', lineHeight: 1 }}>30</p>
          <p style={headline(48, BLACK)}>MONTHS</p>
        </div>

        <div style={{ width: 760 }}>
          <div
            style={{
              background: '#E5E7EB',
              borderRadius: 12,
              height: 32,
              overflow: 'hidden',
            }}
          >
            <div style={{ height: '100%', width: barW, background: ACCENT, borderRadius: 12 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: BLACK, margin: 0 }}>Month 0</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: ACCENT, margin: 0, fontWeight: 'bold' }}>Month 30</p>
          </div>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            color: '#7C2D12',
            textAlign: 'center',
            opacity: bottomOp,
            lineHeight: 1.4,
            maxWidth: 700,
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          two and a half years to break even...
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const truckS = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const statS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>HERE'S THE</p>
          <p style={headline(52, ACCENT)}>WILD PART</p>
        </div>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${houseS})` }}>
            <svg width="230" height="220" viewBox="0 0 230 220">
              <polygon points="115,14 218,92 12,92" fill="#4B5563" />
              <rect x="22" y="92" width="186" height="118" rx="4" fill="#374151" />
              <rect x="88" y="162" width="54" height="48" rx="4" fill="#92400E" />
              <rect x="34" y="104" width="58" height="44" rx="3" fill="#1E40AF" fillOpacity="0.6" />
              <rect x="138" y="104" width="58" height="44" rx="3" fill="#1E40AF" fillOpacity="0.6" />
              <rect x="60" y="142" width="110" height="38" rx="6" fill={ACCENT} />
              <text x="115" y="168" textAnchor="middle" fill={WHITE} fontSize="26" fontFamily="Arial Black" fontWeight="bold">SOLD</text>
              <rect x="110" y="180" width="10" height="30" fill="#9CA3AF" />
            </svg>
          </div>

          <div style={{ transform: `scale(${truckS})` }}>
            <svg width="270" height="162" viewBox="0 0 270 162">
              <rect x="0" y="28" width="182" height="96" rx="6" fill={ACCENT} />
              <rect x="182" y="52" width="80" height="72" rx="6" fill="#B91C1C" />
              <rect x="192" y="62" width="58" height="38" rx="4" fill="#BFDBFE" />
              <text x="88" y="90" textAnchor="middle" fill={WHITE} fontSize="26" fontFamily="Arial Black" fontWeight="bold">MOVING</text>
              <circle cx="52" cy="138" r="24" fill="#1F2937" />
              <circle cx="52" cy="138" r="12" fill="#4B5563" />
              <circle cx="202" cy="138" r="24" fill="#1F2937" />
              <circle cx="202" cy="138" r="12" fill="#4B5563" />
            </svg>
          </div>
        </div>

        <div style={{ transform: `scale(${statS})`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 158, color: ACCENT, margin: 0, lineHeight: 1, letterSpacing: '0.05em' }}>52%</p>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 32,
            color: WHITE,
            textAlign: 'center',
            opacity: subOp,
            lineHeight: 1.4,
            maxWidth: 740,
            margin: 0,
          }}
        >
          of homeowners move within 5 years of refinancing
        </p>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: GRAY,
            textAlign: 'center',
            opacity: subOp,
            lineHeight: 1.4,
            maxWidth: 740,
            margin: 0,
          }}
        >
          — long before they ever break even
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyS = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const piggyTilt = interpolate(frame, [40, 120], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lossProgress = interpolate(frame, [20, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayLoss = Math.floor(interpolate(lossProgress, [0, 1], [0, 18000]));
  const barH = interpolate(lossProgress, [0, 1], [0, 220]);
  const badgeS = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 32,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, BLACK)}>SELL BEFORE</p>
          <p style={headline(52, ACCENT)}>BREAK-EVEN?</p>
        </div>

        <div
          style={{
            transform: `scale(${piggyS}) rotate(${piggyTilt}deg)`,
            transformOrigin: 'center bottom',
          }}
        >
          <svg width="250" height="224" viewBox="0 0 250 224">
            <ellipse cx="110" cy="136" rx="90" ry="72" fill="#F9A8D4" />
            <circle cx="192" cy="106" r="48" fill="#F9A8D4" />
            <ellipse cx="228" cy="116" rx="20" ry="14" fill="#F472B6" />
            <circle cx="222" cy="113" r="4" fill="#9D174D" />
            <circle cx="234" cy="113" r="4" fill="#9D174D" />
            <circle cx="202" cy="90" r="6" fill="#9D174D" />
            <circle cx="204" cy="88" r="2.5" fill={WHITE} />
            <ellipse cx="186" cy="62" rx="12" ry="9" fill="#F472B6" />
            <rect x="92" y="58" width="36" height="7" rx="3" fill="#9D174D" />
            <rect x="38" y="192" width="22" height="30" rx="7" fill="#F9A8D4" />
            <rect x="72" y="196" width="22" height="26" rx="7" fill="#F9A8D4" />
            <rect x="120" y="196" width="22" height="26" rx="7" fill="#F9A8D4" />
            <rect x="154" y="192" width="22" height="30" rx="7" fill="#F9A8D4" />
            <path d="M16,124 C4,106 8,84 20,88" fill="none" stroke="#F472B6" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: BLACK, margin: '0 0 8px' }}>YOU LOSE</p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 112,
              color: ACCENT,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            -${displayLoss.toLocaleString()}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 180, height: 4, background: BLACK }} />
          <div style={{ width: 68, height: barH, background: ACCENT, borderRadius: '0 0 8px 8px' }} />
        </div>

        <div style={{ transform: `scale(${badgeS})`, background: ACCENT, borderRadius: 16, padding: '16px 36px' }}>
          <p style={{ ...headline(44, WHITE), margin: 0 }}>$18K GONE — NOTHING BACK</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checks = [
    'Calculate your break-even date',
    "Compare to your move timeline",
    "Only refi if you'll stay past it",
  ];

  const formulaS = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 90 }, from: 0, to: 1 });
  const ctaOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={headline(56, WHITE)}>BEFORE YOU REFI</p>
          <p style={headline(56, ACCENT)}>DO THIS FIRST</p>
        </div>

        <div style={{ width: '100%' }}>
          {checks.map((check, i) => {
            const itemS = spring({
              frame: Math.max(0, frame - 20 - i * 30),
              fps,
              config: { damping: 14, stiffness: 80 },
              from: 0,
              to: 1,
            });
            const checkOp = interpolate(
              frame,
              [50 + i * 30, 70 + i * 30],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 28,
                  marginBottom: 36,
                  transform: `translateX(${interpolate(itemS, [0, 1], [-200, 0])}px)`,
                }}
              >
                <div style={{ opacity: checkOp, flexShrink: 0 }}>
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" fill={ACCENT} />
                    <text x="32" y="42" textAnchor="middle" fill={WHITE} fontSize="32" fontFamily="Arial Black" fontWeight="bold">
                      {i + 1}
                    </text>
                  </svg>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: WHITE, margin: 0, lineHeight: 1.3 }}>
                  {check}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            transform: `scale(${formulaS})`,
            background: ACCENT,
            borderRadius: 20,
            padding: '28px 44px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <p style={{ ...headline(36, WHITE), margin: '0 0 8px' }}>CLOSING COSTS ÷ MONTHLY SAVINGS</p>
          <p style={{ ...headline(36, WHITE), margin: 0 }}>= MONTHS TO BREAK EVEN</p>
        </div>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            color: '#9CA3AF',
            textAlign: 'center',
            opacity: ctaOp,
            lineHeight: 1.4,
            maxWidth: 720,
            margin: 0,
          }}
        >
          the lower payment only wins if you're there to collect it.
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
