import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
const BLUE = '#3B82F6';
const AMBER = '#F59E0B';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tvScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 120 } });
  const priceVal = Math.round(interpolate(frame, [55, 190], [499, 1554], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const truePayOpacity = interpolate(frame, [52, 78], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const labelOpacity = interpolate(frame, [175, 205], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}>
        <p style={{ ...headline(50, WHITE), marginBottom: 40 }}>RENT-TO-OWN</p>

        <svg
          width={480}
          height={340}
          viewBox="0 0 480 340"
          style={{ transform: `scale(${tvScale})`, transformOrigin: 'center' }}
        >
          {/* TV body */}
          <rect x={10} y={10} width={460} height={268} rx={18} fill="#1E1E1E" stroke={ACCENT} strokeWidth={5} />
          {/* TV screen */}
          <rect x={30} y={28} width={420} height={232} rx={10} fill="#0A0A0A" />
          {/* Screen glare */}
          <rect x={38} y={36} width={55} height={10} rx={5} fill="#FFFFFF" opacity={0.06} />
          {/* Stand neck */}
          <rect x={215} y={278} width={50} height={34} rx={6} fill="#1E1E1E" />
          {/* Stand base */}
          <rect x={162} y={308} width={156} height={18} rx={9} fill="#1E1E1E" />
          {/* Sticker price label */}
          <text x={240} y={98} textAnchor="middle" fill="#555" fontSize={22} fontFamily="Arial, sans-serif">STICKER PRICE</text>
          {/* $499 green */}
          <text x={240} y={158} textAnchor="middle" fill={GREEN} fontSize={60} fontFamily="Arial Black, sans-serif" fontWeight="900">$499</text>
          {/* True cost revealed */}
          <text x={240} y={200} textAnchor="middle" fill={ACCENT} fontSize={20} fontFamily="Arial, sans-serif" opacity={truePayOpacity}>YOU ACTUALLY PAY:</text>
          <text x={240} y={252} textAnchor="middle" fill={RED} fontSize={64} fontFamily="Arial Black, sans-serif" fontWeight="900" opacity={truePayOpacity}>${priceVal.toLocaleString()}</text>
        </svg>

        <p style={{ ...headline(36, ACCENT), marginTop: 44, opacity: labelOpacity }}>
          THE REAL PRICE TAG
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const multOpacity = interpolate(frame, [60, 88], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const totalScale = spring({ frame: Math.max(0, frame - 115), fps, from: 0, to: 1, config: { damping: 12, stiffness: 95 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}>
        <p style={{ ...headline(44, BLACK), marginBottom: 50 }}>THEIR TRICK</p>

        {/* Weekly payment card */}
        <div style={{
          transform: `scale(${cardScale})`,
          transformOrigin: 'center',
          background: ACCENT,
          borderRadius: 24,
          padding: '32px 64px',
          textAlign: 'center' as const,
          marginBottom: 28,
        }}>
          <p style={{ ...headline(26, WHITE), marginBottom: 10 }}>WEEKLY PAYMENT</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: WHITE, margin: 0, lineHeight: 1 }}>$19.99</p>
          <p style={{ ...headline(24, WHITE), marginTop: 10 }}>/WEEK</p>
        </div>

        {/* × 78 weeks */}
        <div style={{ opacity: multOpacity, display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>× 78 WEEKS =</p>
        </div>

        {/* Total */}
        <div style={{ transform: `scale(${totalScale})`, transformOrigin: 'center' }}>
          <div style={{
            background: RED,
            borderRadius: 20,
            padding: '22px 60px',
            textAlign: 'center' as const,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 80, color: WHITE, margin: 0, lineHeight: 1 }}>$1,554</p>
            <p style={{ ...headline(24, WHITE), marginTop: 10 }}>TOTAL</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const countVal = interpolate(frame, [40, 165], [0, 4.8], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const COLS = 8;
  const ROWS = 5;
  const TOTAL = COLS * ROWS;
  const personsVisible = Math.round(interpolate(frame, [20, 155], [0, TOTAL], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const personW = 66;
  const personH = 84;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
      }}>
        <div style={{ transform: `scale(${headerScale})`, transformOrigin: 'center', marginBottom: 28 }}>
          <p style={{ ...headline(54, WHITE), margin: 0 }}>4.8 MILLION</p>
          <p style={{ ...headline(30, ACCENT), margin: '8px 0 0' }}>AMERICANS TRAPPED</p>
        </div>

        {/* Grid of person silhouettes */}
        <svg
          width={COLS * personW}
          height={ROWS * personH}
          viewBox={`0 0 ${COLS * personW} ${ROWS * personH}`}
          style={{ marginBottom: 24 }}
        >
          {Array.from({ length: Math.max(0, Math.floor(TOTAL)) }).map((_, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const cx = col * personW + personW / 2;
            const cy = row * personH + personH / 2;
            const visible = i < personsVisible;
            const pc = visible ? ACCENT : '#2A2A2A';
            return (
              <g key={i} opacity={visible ? 1 : 0.25}>
                {/* Head */}
                <circle cx={cx} cy={cy - 24} r={12} fill={pc} />
                {/* Body */}
                <rect x={cx - 10} y={cy - 10} width={20} height={24} rx={4} fill={pc} />
                {/* Left leg */}
                <rect x={cx - 10} y={cy + 14} width={8} height={18} rx={3} fill={pc} />
                {/* Right leg */}
                <rect x={cx + 2} y={cy + 14} width={8} height={18} rx={3} fill={pc} />
              </g>
            );
          })}
        </svg>

        <p style={{ ...headline(30, WHITE) }}>
          {countVal.toFixed(1)}M IN CONTRACTS RIGHT NOW
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const barProgress = interpolate(frame, [28, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const bars = [
    { label: 'CREDIT CARD', pct: 24, color: GREEN },
    { label: 'PAYDAY LOAN', pct: 150, color: AMBER },
    { label: 'RENT-TO-OWN', pct: 183, color: RED },
  ];
  const maxPct = 183;
  const maxBarH = 300;
  const barW = 120;
  const gap = 50;
  const totalChartW = bars.length * barW + (bars.length - 1) * gap;
  const chartOffsetX = (560 - totalChartW) / 2;
  const baseY = maxBarH + 20;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
      }}>
        <div style={{ transform: `scale(${titleScale})`, transformOrigin: 'center', marginBottom: 24 }}>
          <p style={{ ...headline(44, BLACK) }}>EFFECTIVE APR</p>
        </div>

        <svg width={560} height={maxBarH + 120} viewBox={`0 0 560 ${maxBarH + 120}`}>
          {bars.map((bar, i) => {
            const barH = Math.max(0, (bar.pct / maxPct) * maxBarH * barProgress);
            const x = chartOffsetX + i * (barW + gap);
            const y = baseY - barH;
            const pctOpacity = barH > 4 ? 1 : 0;
            return (
              <g key={i}>
                <rect x={x} y={y} width={barW} height={barH} rx={10} fill={bar.color} />
                <text
                  x={x + barW / 2}
                  y={Math.max(y - 12, 18)}
                  textAnchor="middle"
                  fill={bar.color}
                  fontSize={30}
                  fontFamily="Arial Black, sans-serif"
                  fontWeight="900"
                  opacity={pctOpacity}
                >
                  {bar.pct}%
                </text>
                <text
                  x={x + barW / 2}
                  y={baseY + 30}
                  textAnchor="middle"
                  fill={BLACK}
                  fontSize={17}
                  fontFamily="Arial, sans-serif"
                >
                  {bar.label.split(' ')[0]}
                </text>
                <text
                  x={x + barW / 2}
                  y={baseY + 52}
                  textAnchor="middle"
                  fill={BLACK}
                  fontSize={17}
                  fontFamily="Arial, sans-serif"
                >
                  {bar.label.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
          {/* Baseline */}
          <line x1={chartOffsetX - 10} y1={baseY} x2={chartOffsetX + totalChartW + 10} y2={baseY} stroke="#CCCCCC" strokeWidth={2} />
        </svg>

        <p style={{ ...headline(28, RED), marginTop: 8 }}>
          WORSE THAN PAYDAY LOANS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

interface PriceTagProps {
  price: string;
  label: string;
  sublabel: string;
  color: string;
  tagScale: number;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, label, sublabel, color, tagScale }) => (
  <div style={{
    transform: `scale(${tagScale})`,
    transformOrigin: 'center',
    background: '#1E1E1E',
    border: `4px solid ${color}`,
    borderRadius: 20,
    padding: '22px 36px',
    textAlign: 'center' as const,
    width: '100%',
  }}>
    <p style={{
      fontFamily: FONT,
      fontSize: 18,
      color: '#888',
      margin: '0 0 6px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
    }}>{label}</p>
    <p style={{ fontFamily: FONT, fontSize: 62, color, margin: 0, lineHeight: 1 }}>{price}</p>
    <p style={{
      fontFamily: FONT,
      fontSize: 16,
      color: '#666',
      margin: '6px 0 0',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    }}>{sublabel}</p>
  </div>
);

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tag1Scale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const tag2Scale = spring({ frame: Math.max(0, frame - 40), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const tag3Scale = spring({ frame: Math.max(0, frame - 80), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const footerOpacity = interpolate(frame, [158, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
      }}>
        <p style={{ ...headline(44, WHITE), marginBottom: 44 }}>THE SAME TV</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 460 }}>
          <PriceTag price="$499" label="Retail" sublabel="What it should cost" color={GREEN} tagScale={tag1Scale} />
          <PriceTag price="$898" label="Early Buyout" sublabel="80% over retail" color={ACCENT} tagScale={tag2Scale} />
          <PriceTag price="$1,554" label="Full Term" sublabel="311% of retail price" color={RED} tagScale={tag3Scale} />
        </div>
        <p style={{ ...headline(26, '#888888'), marginTop: 40, opacity: footerOpacity }}>
          NO GOOD DEAL EXISTS IN THESE CONTRACTS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, stiffness: 90 } });
  const box1Scale = spring({ frame: Math.max(0, frame - 22), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const box2Scale = spring({ frame: Math.max(0, frame - 55), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const box3Scale = spring({ frame: Math.max(0, frame - 88), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [158, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
      }}>
        <div style={{ transform: `scale(${headerScale})`, transformOrigin: 'center', marginBottom: 44 }}>
          <p style={{ ...headline(50, BLACK) }}>BETTER OPTIONS</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%', maxWidth: 520 }}>
          {/* Credit Union */}
          <div style={{ transform: `scale(${box1Scale})`, transformOrigin: 'center' }}>
            <div style={{
              background: WHITE,
              border: `4px solid ${GREEN}`,
              borderRadius: 20,
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}>
              <svg width={60} height={60} viewBox="0 0 60 60">
                {/* Building roof/triangle */}
                <polygon points="30,4 2,22 58,22" fill={GREEN} />
                {/* Building body */}
                <rect x={6} y={22} width={48} height={32} rx={2} fill={GREEN} />
                {/* Door */}
                <rect x={22} y={34} width={16} height={20} rx={2} fill={BG_LIGHT} />
                {/* Left window */}
                <rect x={10} y={28} width={10} height={10} rx={2} fill={BG_LIGHT} />
                {/* Right window */}
                <rect x={40} y={28} width={10} height={10} rx={2} fill={BG_LIGHT} />
              </svg>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, fontWeight: 'bold' }}>Credit Union</p>
                <p style={{ fontFamily: FONT, fontSize: 15, color: '#666', margin: '4px 0 0' }}>Low-rate personal loans</p>
              </div>
            </div>
          </div>

          {/* Secondhand */}
          <div style={{ transform: `scale(${box2Scale})`, transformOrigin: 'center' }}>
            <div style={{
              background: WHITE,
              border: `4px solid ${ACCENT}`,
              borderRadius: 20,
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}>
              <svg width={60} height={60} viewBox="0 0 60 60">
                {/* Price tag pentagon */}
                <path d="M6 6 L42 6 L54 30 L42 54 L6 54 Z" fill={ACCENT} />
                {/* Hole at top */}
                <circle cx={40} cy={18} r={5} fill={BG_LIGHT} />
                {/* USED text */}
                <text x={24} y={36} textAnchor="middle" fill="#FFFFFF" fontSize={16} fontFamily="Arial Black, sans-serif" fontWeight="900">USED</text>
              </svg>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, fontWeight: 'bold' }}>Secondhand</p>
                <p style={{ fontFamily: FONT, fontSize: 15, color: '#666', margin: '4px 0 0' }}>Facebook, OfferUp, Craigslist</p>
              </div>
            </div>
          </div>

          {/* Layaway */}
          <div style={{ transform: `scale(${box3Scale})`, transformOrigin: 'center' }}>
            <div style={{
              background: WHITE,
              border: `4px solid ${BLUE}`,
              borderRadius: 20,
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}>
              <svg width={60} height={60} viewBox="0 0 60 60">
                {/* Calendar body */}
                <rect x={4} y={12} width={52} height={44} rx={6} fill={BLUE} />
                {/* Calendar header */}
                <rect x={4} y={12} width={52} height={16} rx={6} fill="#1D4ED8" />
                {/* Top rings */}
                <rect x={16} y={6} width={7} height={14} rx={3} fill="#1D4ED8" />
                <rect x={37} y={6} width={7} height={14} rx={3} fill="#1D4ED8" />
                {/* Day boxes */}
                <rect x={10} y={34} width={10} height={9} rx={2} fill="#FFFFFF" />
                <rect x={25} y={34} width={10} height={9} rx={2} fill="#FFFFFF" />
                <rect x={40} y={34} width={10} height={9} rx={2} fill="#FFFFFF" />
                <rect x={10} y={47} width={10} height={6} rx={2} fill="#FFFFFF" />
                <rect x={25} y={47} width={10} height={6} rx={2} fill="#FFFFFF" />
              </svg>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0, fontWeight: 'bold' }}>Layaway</p>
                <p style={{ fontFamily: FONT, fontSize: 15, color: '#666', margin: '4px 0 0' }}>Pay first, own it after</p>
              </div>
            </div>
          </div>
        </div>

        <p style={{ ...headline(30, ACCENT), marginTop: 36, opacity: ctaOpacity }}>
          FOLLOW FOR MONEY FACTS
        </p>
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
