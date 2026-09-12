import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingY = spring({ frame, fps, from: 280, to: 0, config: { damping: 14, stiffness: 70 } });
  const textOpacity = interpolate(frame, [38, 62], [0, 1], {
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
          gap: 50,
          padding: '80px 60px',
        }}
      >
        {/* Bank building */}
        <div style={{ transform: `translateY(${buildingY}px)` }}>
          <svg width="380" height="340" viewBox="0 0 380 340" overflow="visible">
            {/* Pediment */}
            <polygon points="190,20 30,130 350,130" fill={ACCENT} />
            {/* Building body */}
            <rect x={50} y={130} width={280} height={188} fill="#2A2A2A" />
            {/* Columns */}
            {[72, 120, 168, 218, 268].map((x, i) => (
              <rect key={i} x={x} y={130} width={22} height={188} fill={WHITE} opacity={0.14} rx={3} />
            ))}
            {/* Windows */}
            <rect x={72} y={152} width={40} height={36} fill={BG_DARK} rx={4} />
            <rect x={268} y={152} width={40} height={36} fill={BG_DARK} rx={4} />
            <rect x={72} y={206} width={40} height={30} fill={BG_DARK} rx={4} />
            <rect x={268} y={206} width={40} height={30} fill={BG_DARK} rx={4} />
            {/* Door */}
            <rect x={164} y={246} width={52} height={72} fill={BG_DARK} rx={4} />
            {/* Steps */}
            <rect x={30} y={316} width={320} height={12} fill={WHITE} opacity={0.25} rx={3} />
            <rect x={15} y={327} width={350} height={10} fill={WHITE} opacity={0.12} rx={3} />
            {/* Flying dollar bills */}
            {[0, 1, 2, 3].map((i) => {
              const t = Math.max(0, frame - 55 - i * 14);
              const bx = interpolate(t, [0, 70], [190, 50 - i * 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const by = interpolate(t, [0, 70], [100, -55 - i * 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const brot = interpolate(t, [0, 70], [0, -28 + i * 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const bop = interpolate(frame, [55 + i * 14, 68 + i * 14, 185, 210], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <g key={i} transform={`translate(${bx},${by}) rotate(${brot})`} opacity={bop}>
                  <rect x={-26} y={-12} width={52} height={24} fill={GREEN} rx={4} />
                  <rect x={-20} y={-6} width={40} height={12} fill="none" stroke={WHITE} strokeWidth={1} opacity={0.5} rx={2} />
                  <text x={0} textAnchor="middle" y={5} fontFamily="Arial" fontSize={11} fontWeight="bold" fill={WHITE}>$</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Headline text */}
        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(46, WHITE), lineHeight: 1.15, marginBottom: 16 }}>YOUR BANK CHARGES</p>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1, marginBottom: 16 }}>$468/YEAR</p>
          <p style={{ ...headline(34, WHITE), lineHeight: 1.2, opacity: 0.8 }}>TO HOLD YOUR MONEY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const fees = [
    { label: '#1  $15/month maintenance fee', amount: '$180/yr', delay: 12 },
    { label: '#2  $35 overdraft fee × 3 avg', amount: '$105/yr', delay: 55 },
    { label: '#3  $3 ATM fee × 5/month', amount: '$180/yr', delay: 98 },
  ];

  const totalOpacity = interpolate(frame, [138, 160], [0, 1], {
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
          padding: '80px 60px',
        }}
      >
        <p style={{ ...headline(44, BLACK), marginBottom: 50 }}>WHERE IT ALL GOES</p>

        {fees.map((fee, i) => {
          const op = interpolate(frame, [fee.delay, fee.delay + 22], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const sx = interpolate(frame, [fee.delay, fee.delay + 22], [-120, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                opacity: op,
                transform: `translateX(${sx}px)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: 860,
                marginBottom: 24,
                background: WHITE,
                borderRadius: 18,
                padding: '22px 36px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                borderLeft: `8px solid ${ACCENT}`,
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 28, color: BLACK }}>{fee.label}</span>
              <span style={{ fontFamily: FONT, fontSize: 36, color: RED, fontWeight: 900, flexShrink: 0, marginLeft: 20 }}>{fee.amount}</span>
            </div>
          );
        })}

        <div
          style={{
            opacity: totalOpacity,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 860,
            marginTop: 22,
            paddingTop: 28,
            borderTop: `5px solid ${BLACK}`,
          }}
        >
          <span style={{ ...headline(44, BLACK) }}>TOTAL / YEAR</span>
          <span style={{ ...headline(60, RED) }}>$468</span>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, opacity: 0.55, textAlign: 'center', marginTop: 32 }}>
          heavy users pay double
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barGrow = interpolate(frame, [20, 125], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const bigBankH = Math.max(8, barGrow * 9);
  const onlineBankH = barGrow * 400;

  const labelOpacity = interpolate(frame, [80, 110], [0, 1], {
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
          padding: '80px 60px',
          gap: 28,
        }}
      >
        <p style={{ ...headline(44, WHITE), marginBottom: 10 }}>YOUR SAVINGS EARNS</p>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 100, height: 460 }}>
          {/* Big bank */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(30, RED), marginBottom: 14, opacity: labelOpacity }}>0.01%</p>
            <div style={{ width: 130, height: bigBankH, background: RED, borderRadius: '10px 10px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.7, marginTop: 18, textAlign: 'center' }}>Big Bank</p>
          </div>

          {/* Online bank */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(30, GREEN), marginBottom: 14, opacity: labelOpacity }}>4.75%</p>
            <div style={{ width: 130, height: onlineBankH, background: GREEN, borderRadius: '10px 10px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.7, marginTop: 18, textAlign: 'center' }}>Online Bank</p>
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, opacity: 0.8, textAlign: 'center', maxWidth: 720 }}>
          They earn $47 on your money for every $1 they pay you
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, from: 0.2, to: 1, config: { damping: 14, stiffness: 80 } });
  const textOpacity = interpolate(frame, [52, 76], [0, 1], {
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
          padding: '80px 60px',
          gap: 40,
        }}
      >
        <p style={{ ...headline(44, BLACK) }}>THERE'S A FREE ALTERNATIVE</p>

        {/* Phone */}
        <div style={{ transform: `scale(${phoneSpring})`, transformOrigin: 'center center' }}>
          <svg width="260" height="480" viewBox="0 0 260 480">
            {/* Phone shell */}
            <rect x={5} y={5} width={250} height={470} fill={BLACK} rx={34} />
            <rect x={15} y={15} width={230} height={450} fill="#111122" rx={28} />
            {/* Notch */}
            <rect x={95} y={22} width={70} height={18} fill={BLACK} rx={9} />
            {/* Screen */}
            <rect x={25} y={55} width={210} height={370} fill="#0D1117" rx={14} />
            {/* Header bar */}
            <rect x={25} y={55} width={210} height={58} fill={GREEN} rx={0} />
            <rect x={25} y={55} width={210} height={14} fill={GREEN} rx={14} />
            <text x={130} y={91} textAnchor="middle" fontFamily="Arial Black" fontSize={18} fill={WHITE}>OnlineBank</text>
            {/* $0 Fees row */}
            <text x={130} y={148} textAnchor="middle" fontFamily="Arial" fontSize={12} fill={WHITE} opacity={0.55}>MONTHLY FEES</text>
            <text x={130} y={182} textAnchor="middle" fontFamily="Arial Black" fontSize={40} fill={WHITE}>$0</text>
            {/* APY badge */}
            <rect x={50} y={207} width={160} height={55} fill="#132613" rx={12} />
            <text x={130} y={230} textAnchor="middle" fontFamily="Arial" fontSize={11} fill={GREEN} opacity={0.85}>HIGH-YIELD APY</text>
            <text x={130} y={254} textAnchor="middle" fontFamily="Arial Black" fontSize={26} fill={GREEN}>4.75%</text>
            {/* FDIC row */}
            <rect x={50} y={276} width={160} height={44} fill="#1A1A30" rx={10} />
            <text x={130} y={296} textAnchor="middle" fontFamily="Arial" fontSize={10} fill={WHITE} opacity={0.6}>FDIC INSURED UP TO</text>
            <text x={130} y={313} textAnchor="middle" fontFamily="Arial Black" fontSize={18} fill={WHITE}>$250,000</text>
            {/* Bottom bar */}
            <rect x={25} y={382} width={210} height={43} fill="#111122" rx={0} />
            <rect x={25} y={404} width={210} height={21} fill="#111122" rx={14} />
            {/* Home indicator */}
            <rect x={95} y={442} width={70} height={5} fill={WHITE} opacity={0.25} rx={3} />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, opacity: 0.75, maxWidth: 720, lineHeight: 1.5 }}>
            Same FDIC protection. Real customer service. Zero monthly fees.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggySpring = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 65 } });

  const counter = Math.floor(
    interpolate(frame, [40, 185], [0, 2800], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    })
  );

  const coins = [
    { cx: 148, start: 45, end: 82 },
    { cx: 167, start: 82, end: 119 },
    { cx: 154, start: 119, end: 156 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
          gap: 28,
        }}
      >
        <p style={{ ...headline(40, WHITE) }}>WHAT YOU GET BACK</p>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggySpring})`, transformOrigin: 'center center' }}>
          <svg width="320" height="295" viewBox="0 0 320 295" overflow="visible">
            {/* Falling coins */}
            {coins.map((c, i) => {
              const cy = interpolate(frame, [c.start, c.end], [-55, 72], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bounce,
              });
              return (
                <g key={i} transform={`translate(${c.cx},${cy})`}>
                  <circle cx={0} cy={0} r={13} fill={ACCENT} />
                  <text x={0} textAnchor="middle" y={5} fontFamily="Arial" fontSize={12} fontWeight="bold" fill={WHITE}>$</text>
                </g>
              );
            })}
            {/* Pig body */}
            <ellipse cx={155} cy={188} rx={115} ry={93} fill="#F9A8D4" />
            {/* Ear */}
            <ellipse cx={108} cy={98} rx={24} ry={20} fill="#F9A8D4" />
            <ellipse cx={108} cy={98} rx={14} ry={11} fill="#FBCFE8" />
            {/* Head */}
            <circle cx={155} cy={120} r={55} fill="#F9A8D4" />
            {/* Coin slot */}
            <rect x={137} y={72} width={36} height={8} fill="#9D174D" rx={4} />
            {/* Snout */}
            <ellipse cx={184} cy={140} rx={27} ry={22} fill="#FBCFE8" />
            <circle cx={176} cy={136} r={5} fill="#9D174D" />
            <circle cx={192} cy={136} r={5} fill="#9D174D" />
            {/* Eye */}
            <circle cx={160} cy={107} r={9} fill={WHITE} />
            <circle cx={162} cy={105} r={5} fill={BLACK} />
            <circle cx={164} cy={103} r={2} fill={WHITE} />
            {/* Legs */}
            <rect x={68} y={262} width={30} height={28} fill="#F9A8D4" rx={9} />
            <rect x={112} y={262} width={30} height={28} fill="#F9A8D4" rx={9} />
            <rect x={158} y={262} width={30} height={28} fill="#F9A8D4" rx={9} />
            <rect x={202} y={262} width={30} height={28} fill="#F9A8D4" rx={9} />
            {/* Tail */}
            <path d="M 265 178 Q 292 158 287 182 Q 278 204 268 194" stroke="#F9A8D4" strokeWidth={7} fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <p style={{ ...headline(86, ACCENT), lineHeight: 1 }}>${counter.toLocaleString()}</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, opacity: 0.7, marginTop: 4 }}>
          saved over 5 years by switching
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkItems = [
    { text: '$0 monthly fees', delay: 16 },
    { text: '4.75% interest on savings', delay: 52 },
    { text: 'FDIC insured $250K', delay: 88 },
    { text: 'Switch in 20 minutes', delay: 124 },
  ];

  const ctaSpring = spring({ frame: Math.max(0, frame - 148), fps, from: 0.6, to: 1, config: { damping: 10, stiffness: 90 } });
  const personOpacity = interpolate(frame, [5, 26], [0, 1], {
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
          padding: '80px 60px',
          gap: 16,
        }}
      >
        <p style={{ ...headline(42, BLACK), marginBottom: 16 }}>SWITCH TODAY</p>

        {/* Person holding phone */}
        <div style={{ opacity: personOpacity, marginBottom: 16 }}>
          <svg width="155" height="220" viewBox="0 0 155 220">
            {/* Head */}
            <circle cx={77} cy={40} r={34} fill={ACCENT} />
            {/* Body */}
            <rect x={39} y={80} width={76} height={96} fill={ACCENT} rx={22} />
            {/* Arm */}
            <rect x={90} y={106} width={20} height={52} fill={ACCENT} rx={9} />
            {/* Phone */}
            <rect x={104} y={100} width={38} height={64} fill={BLACK} rx={8} />
            <rect x={108} y={105} width={30} height={54} fill="#0D1117" rx={6} />
            <rect x={117} y={152} width={12} height={4} fill={WHITE} opacity={0.3} rx={2} />
            {/* Legs */}
            <rect x={43} y={172} width={28} height={40} fill={ACCENT} rx={10} />
            <rect x={82} y={172} width={28} height={40} fill={ACCENT} rx={10} />
          </svg>
        </div>

        {/* Checklist */}
        {checkItems.map((item, i) => {
          const op = interpolate(frame, [item.delay, item.delay + 22], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const tx = interpolate(frame, [item.delay, item.delay + 22], [-80, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                opacity: op,
                transform: `translateX(${tx}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                width: '100%',
                maxWidth: 720,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: GREEN,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="18" viewBox="0 0 22 18">
                  <polyline points="2,9 8,15 20,2" fill="none" stroke={WHITE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 30, color: BLACK }}>{item.text}</span>
            </div>
          );
        })}

        {/* CTA banner */}
        <div
          style={{
            transform: `scale(${ctaSpring})`,
            transformOrigin: 'center center',
            marginTop: 22,
            background: ACCENT,
            borderRadius: 22,
            padding: '22px 52px',
          }}
        >
          <p style={{ ...headline(32, BLACK) }}>BEST HIGH-YIELD SAVINGS 2025</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
