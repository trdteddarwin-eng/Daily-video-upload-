import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const lineItems = [
    { label: 'FOOD SUBTOTAL', amount: '$18.99', delay: 10 },
    { label: 'DELIVERY FEE', amount: '$3.99', delay: 38 },
    { label: 'SERVICE FEE', amount: '$4.49', delay: 66 },
    { label: 'SMALL ORDER FEE', amount: '$2.00', delay: 94 },
    { label: 'TIP (20%)', amount: '$6.00', delay: 122 },
  ];

  const totalOpacity = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const runningTotal = (() => {
    let t = 0;
    for (const item of lineItems) {
      if (frame >= item.delay + 18) t += parseFloat(item.amount.replace('$', ''));
    }
    return t;
  })();

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 70px' }}>
        <p style={{ ...headline(40, BLACK) }}>ORDER RECEIPT</p>

        <div style={{ width: '100%', background: WHITE, borderRadius: 18, padding: '30px 40px', boxShadow: '0 4px 28px rgba(0,0,0,0.10)' }}>
          {lineItems.map((item, i) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const isExtra = i > 0;
            return (
              <div key={i} style={{ opacity: itemOpacity, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: FONT, fontSize: 22, color: isExtra ? ACCENT : BLACK }}>{item.label}</span>
                <span style={{ fontFamily: FONT, fontSize: 24, color: isExtra ? ACCENT : BLACK }}>{item.amount}</span>
              </div>
            );
          })}
          <div style={{ borderTop: '2px solid #ddd', marginTop: 8, paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ ...headline(26, BLACK) }}>TOTAL</span>
            <span style={{ fontFamily: FONT, fontSize: 30, color: ACCENT }}>${runningTotal.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ opacity: totalOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
            $16.48 extra. <span style={{ color: ACCENT }}>Not for food. For the app.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const arrowOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const receiptSlide = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 90 } });
  const receiptX = interpolate(receiptSlide, [0, 1], [420, 0]);
  const statOpacity = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [130, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 60px' }}>
        <p style={{ ...headline(38, WHITE) }}>FEE BUNDLING TRICK</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36, width: '100%' }}>
          <div style={{ transform: `scale(${brainScale})` }}>
            <svg width={150} height={150} viewBox="0 0 150 150">
              <ellipse cx={75} cy={70} rx={60} ry={58} fill="none" stroke={ACCENT} strokeWidth={5} />
              <path d="M 15 70 Q 1 50 15 34" fill="none" stroke={ACCENT} strokeWidth={4.5} />
              <path d="M 135 70 Q 149 50 135 34" fill="none" stroke={ACCENT} strokeWidth={4.5} />
              <path d="M 33 58 Q 54 46 75 58 Q 96 46 117 58" fill="none" stroke={ACCENT} strokeWidth={3} />
              <path d="M 28 84 Q 51 96 75 84 Q 99 96 122 84" fill="none" stroke={ACCENT} strokeWidth={3} />
              <rect x={62} y={124} width={26} height={20} fill={ACCENT} />
              <ellipse cx={75} cy={144} rx={27} ry={7} fill={ACCENT} />
            </svg>
          </div>

          <div style={{ opacity: arrowOpacity }}>
            <svg width={56} height={36} viewBox="0 0 56 36">
              <path d="M 0 18 L 42 18 M 30 6 L 52 18 L 30 30" stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ transform: `translateX(${receiptX}px)` }}>
            <svg width={160} height={150} viewBox="0 0 160 150">
              <rect x={5} y={5} width={150} height={140} rx={10} fill={WHITE} />
              <rect x={5} y={5} width={150} height={28} rx={10} fill="#e0e0e0" />
              <rect x={5} y={19} width={150} height={14} fill="#e0e0e0" />
              <text x={80} y={24} textAnchor="middle" fill="#555" fontSize={12} fontFamily="Arial Black">ORDER RECEIPT</text>
              <text x={20} y={52} fill="#999" fontSize={9} fontFamily="Arial">Food subtotal.......  $18.99</text>
              <text x={20} y={66} fill={ACCENT} fontSize={9} fontFamily="Arial">Delivery fee..........  $3.99</text>
              <text x={20} y={80} fill={ACCENT} fontSize={9} fontFamily="Arial">Service fee...........  $4.49</text>
              <text x={20} y={94} fill={ACCENT} fontSize={9} fontFamily="Arial">Small order fee..  $2.00</text>
              <text x={20} y={108} fill={ACCENT} fontSize={9} fontFamily="Arial">Tip (20%)................  $6.00</text>
              <line x1={12} y1={116} x2={148} y2={116} stroke="#ccc" strokeWidth={1} />
              <rect x={12} y={122} width={136} height={16} rx={6} fill={ACCENT} opacity={0.2} />
              <text x={80} y={133} textAnchor="middle" fill={BLACK} fontSize={12} fontFamily="Arial Black">TOTAL  $35.47</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: statOpacity, background: ACCENT, borderRadius: 14, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(28, BLACK) }}>40% LESS LIKELY TO NOTICE</p>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.45 }}>
            One total hides five charges. <span style={{ color: ACCENT }}>That's by design.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hasDelivery = [true, true, false, true, true, true, false];

  const gridOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [80, 185], [0, 3120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const captionOpacity = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 60px' }}>
        <p style={{ ...headline(40, BLACK) }}>YOUR TYPICAL WEEK</p>

        <div style={{ opacity: gridOpacity, display: 'flex', gap: 14, justifyContent: 'center' }}>
          {days.map((day, i) => {
            const iconOpacity = interpolate(frame, [10 + i * 8, 28 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ opacity: iconOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <svg width={68} height={68} viewBox="0 0 68 68">
                  <rect x={2} y={2} width={64} height={64} rx={14}
                    fill={hasDelivery[i] ? ACCENT : '#e0e0e0'}
                    stroke={hasDelivery[i] ? '#c2560a' : '#ccc'}
                    strokeWidth={2} />
                  {hasDelivery[i] ? (
                    <>
                      <circle cx={34} cy={22} r={10} fill={BLACK} />
                      <rect x={20} y={32} width={28} height={16} rx={4} fill={BLACK} />
                      <circle cx={24} cy={52} r={6} fill={BLACK} />
                      <circle cx={44} cy={52} r={6} fill={BLACK} />
                      <rect x={18} y={46} width={32} height={5} rx={2} fill={BLACK} />
                    </>
                  ) : (
                    <text x={34} y={42} textAnchor="middle" fill="#aaa" fontSize={28} fontFamily="Arial">—</text>
                  )}
                </svg>
                <span style={{ fontFamily: FONT, fontSize: 13, color: hasDelivery[i] ? ACCENT : '#aaa' }}>{day}</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, 'rgba(0,0,0,0.5)'), marginBottom: 10 }}>5 ORDERS/WEEK × 52 WEEKS IN FEES</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
            That's not a meal. <span style={{ color: ACCENT }}>That's a car payment.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const chartProgress = interpolate(frame, [15, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calloutOpacity = interpolate(frame, [158, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: 'YR 10', value: 43000 },
    { label: 'YR 20', value: 128000 },
    { label: 'YR 30', value: 251000 },
  ];
  const maxVal = 251000;
  const maxBarH = 310;
  const barW = 130;
  const originX = 100;
  const originY = 370;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 50px' }}>
        <p style={{ ...headline(36, WHITE) }}>IF YOU INVESTED IT INSTEAD</p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: 'rgba(255,255,255,0.5)', margin: 0, textAlign: 'center' }}>
          $3,120/yr at 7% annual return
        </p>

        <svg width={700} height={440} viewBox="0 0 700 440">
          <line x1={originX} y1={30} x2={originX} y2={originY} stroke="#333" strokeWidth={2} />
          <line x1={originX} y1={originY} x2={670} y2={originY} stroke="#333" strokeWidth={2} />

          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <g key={i}>
              <line x1={originX - 6} y1={originY - pct * maxBarH} x2={originX} y2={originY - pct * maxBarH} stroke="#444" strokeWidth={1.5} />
              <text x={originX - 10} y={originY - pct * maxBarH + 5} textAnchor="end" fill="#666" fontSize={15} fontFamily="Arial">
                ${(pct * 251).toFixed(0)}K
              </text>
            </g>
          ))}

          {bars.map((bar, i) => {
            const x = originX + 60 + i * (barW + 90);
            const barH = Math.max(0, (bar.value / maxVal) * maxBarH * chartProgress);
            const labelY = Math.max(28, originY - barH - 10);
            return (
              <g key={i}>
                <rect x={x} y={originY - barH} width={barW} height={barH} fill={ACCENT} rx={8} />
                <text x={x + barW / 2} y={originY + 24} textAnchor="middle" fill="#888" fontSize={17} fontFamily="Arial Black">{bar.label}</text>
                {chartProgress > 0.2 && (
                  <text x={x + barW / 2} y={labelY} textAnchor="middle" fill={ACCENT} fontSize={15} fontFamily="Arial Black">
                    ${(bar.value / 1000).toFixed(0)}K
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ opacity: calloutOpacity, background: ACCENT, borderRadius: 16, padding: '18px 52px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>30 YEARS = $251,000</p>
          <p style={{ ...headline(20, BLACK) }}>THE REAL PRICE OF DELIVERY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const col1Scale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 100 } });
  const col2Scale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 100 } });
  const savingsBadgeOpacity = interpolate(frame, [90, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [152, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 56px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(44, BLACK) }}>THE SIMPLE FIX</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: 'rgba(0,0,0,0.5)', textAlign: 'center', margin: '10px 0 0', lineHeight: 1.4 }}>
            Cut delivery to twice a week.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 28, width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${col1Scale})`, flex: 1, background: '#fce8e8', borderRadius: 18, padding: '28px 22px', textAlign: 'center', border: '2px solid #fca5a5' }}>
            <p style={{ ...headline(20, RED), marginBottom: 10 }}>5× / WEEK</p>
            <p style={{ fontFamily: FONT, fontSize: 42, color: RED, margin: 0, lineHeight: 1 }}>$3,120</p>
            <p style={{ ...headline(16, RED), marginTop: 8 }}>PER YEAR IN FEES</p>
          </div>
          <div style={{ transform: `scale(${col2Scale})`, flex: 1, background: '#d1fae5', borderRadius: 18, padding: '28px 22px', textAlign: 'center', border: '2px solid #6ee7b7' }}>
            <p style={{ ...headline(20, GREEN), marginBottom: 10 }}>2× / WEEK</p>
            <p style={{ fontFamily: FONT, fontSize: 42, color: GREEN, margin: 0, lineHeight: 1 }}>$1,250</p>
            <p style={{ ...headline(16, GREEN), marginTop: 8 }}>PER YEAR IN FEES</p>
          </div>
        </div>

        <div style={{ opacity: savingsBadgeOpacity, background: ACCENT, borderRadius: 16, padding: '18px 50px', textAlign: 'center' }}>
          <p style={{ ...headline(24, BLACK), marginBottom: 6 }}>YOU KEEP $1,870/YEAR</p>
          <p style={{ ...headline(19, BLACK) }}>= $150,000 INVESTED OVER 30 YRS</p>
        </div>

        <div style={{ opacity: ctaOpacity, background: BLACK, borderRadius: 18, padding: '18px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(22, WHITE), marginBottom: 8 }}>FOLLOW FOR DAILY MONEY MOVES</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, textAlign: 'center', margin: 0 }}>
            One habit change. Six figures compounded.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [500, 0]);
  const subtitleOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [60, 185], [0, 3100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width={220} height={360} viewBox="0 0 220 360">
            <rect x={4} y={4} width={212} height={352} rx={26} fill="#1a1a1a" stroke={ACCENT} strokeWidth={3} />
            <rect x={13} y={13} width={194} height={334} rx={20} fill="#0d0d0d" />
            <rect x={30} y={45} width={160} height={28} rx={6} fill="#2a2a2a" />
            <text x={110} y={64} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12} fontFamily="Arial">🛵  DELIVERY APP</text>
            <rect x={22} y={88} width={176} height={60} rx={8} fill="#1e1e1e" />
            <text x={110} y={111} textAnchor="middle" fill={WHITE} fontSize={14} fontFamily="Arial Black">Burger + Fries</text>
            <text x={110} y={133} textAnchor="middle" fill={ACCENT} fontSize={20} fontFamily="Arial Black">$18.99</text>
            <line x1={22} y1={160} x2={198} y2={160} stroke="#333" strokeWidth={1} />
            <text x={36} y={180} fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily="Arial">Delivery fee</text>
            <text x={184} y={180} textAnchor="end" fill={ACCENT} fontSize={11} fontFamily="Arial">$3.99</text>
            <text x={36} y={198} fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily="Arial">Service fee</text>
            <text x={184} y={198} textAnchor="end" fill={ACCENT} fontSize={11} fontFamily="Arial">$4.49</text>
            <text x={36} y={216} fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily="Arial">Tip</text>
            <text x={184} y={216} textAnchor="end" fill={ACCENT} fontSize={11} fontFamily="Arial">$6.00</text>
            <line x1={22} y1={228} x2={198} y2={228} stroke="#333" strokeWidth={1} />
            <text x={36} y={248} fill={WHITE} fontSize={13} fontFamily="Arial Black">TOTAL</text>
            <text x={184} y={248} textAnchor="end" fill={ACCENT} fontSize={14} fontFamily="Arial Black">$33.47</text>
            <rect x={30} y={270} width={160} height={38} rx={19} fill={ACCENT} />
            <text x={110} y={294} textAnchor="middle" fill={BLACK} fontSize={14} fontFamily="Arial Black">PLACE ORDER</text>
          </svg>
        </div>

        <div style={{ opacity: subtitleOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, ACCENT), marginBottom: 6 }}>THE HIDDEN SUBSCRIPTION</p>
        </div>

        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.55)'), marginBottom: 10 }}>YOU PAY EXTRA EVERY YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 90, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${counterVal.toLocaleString()}
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
