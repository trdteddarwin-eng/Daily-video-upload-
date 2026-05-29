import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#FEF2F2';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
const WHITE = '#F5F5F5';
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
  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 }, from: 0, to: 1 });
  const limitVal = Math.round(
    interpolate(frame, [25, 115], [5000, 8500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const greenOpacity = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const redOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dots = [
    { cx: 110, baseY: 600, delay: 8 },
    { cx: 340, baseY: 520, delay: 20 },
    { cx: 590, baseY: 680, delay: 5 },
    { cx: 800, baseY: 560, delay: 30 },
    { cx: 250, baseY: 760, delay: 14 },
    { cx: 700, baseY: 640, delay: 24 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }} viewBox="0 0 1080 1920">
        {dots.map((d, i) => {
          const cy = interpolate(frame, [d.delay, d.delay + 85], [d.baseY, d.baseY + 450], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return <circle key={i} cx={d.cx} cy={cy} r={13} fill={i % 2 === 0 ? ACCENT : WHITE} opacity={0.45} />;
        })}
      </svg>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `scale(${cardScale})` }}>
          <svg width={380} height={240} viewBox="0 0 380 240">
            <rect width={380} height={240} rx={20} fill={ACCENT} />
            <rect y={68} width={380} height={48} fill="rgba(0,0,0,0.3)" />
            <rect x={26} y={135} width={80} height={52} rx={8} fill="rgba(255,255,255,0.38)" />
            <text
              x={190}
              y={208}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={22}
              fill="rgba(255,255,255,0.75)"
              letterSpacing={5}
            >
              **** **** **** 4521
            </text>
            <text x={32} y={54} fontFamily={FONT} fontSize={28} fontWeight="bold" fill={WHITE}>
              VISA
            </text>
          </svg>
        </div>
        <p style={{ ...headline(30, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>YOUR NEW CREDIT LIMIT</p>
        <p style={{ ...headline(100, WHITE), lineHeight: 1, margin: 0 }}>${limitVal.toLocaleString()}</p>
        <div
          style={{
            opacity: greenOpacity,
            background: 'rgba(16,185,129,0.18)',
            border: `2px solid ${GREEN}`,
            borderRadius: 12,
            padding: '14px 48px',
          }}
        >
          <p style={{ ...headline(32, GREEN), margin: 0 }}>LIMIT INCREASED</p>
        </div>
        <div
          style={{
            opacity: redOpacity,
            background: 'rgba(239,68,68,0.18)',
            border: `2px solid ${ACCENT}`,
            borderRadius: 12,
            padding: '14px 48px',
          }}
        >
          <p style={{ ...headline(32, ACCENT), margin: 0 }}>OR IS IT A TRAP?</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brainScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const bubbleOpacity = interpolate(frame, [55, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelY = interpolate(frame, [80, 130], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [80, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `scale(${brainScale})` }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            <ellipse cx={130} cy={145} rx={95} ry={80} fill={ACCENT} />
            <line x1={130} y1={67} x2={130} y2={223} stroke="rgba(0,0,0,0.22)" strokeWidth={3} />
            <path d="M 52 125 Q 76 103 100 125 Q 124 147 148 125 Q 172 103 196 125 Q 212 137 208 125" stroke="rgba(0,0,0,0.22)" strokeWidth={4} fill="none" />
            <path d="M 44 158 Q 70 136 96 158 Q 122 180 148 158 Q 174 136 200 158" stroke="rgba(0,0,0,0.22)" strokeWidth={4} fill="none" />
            <circle cx={208} cy={72} r={10} fill={BG_DARK} opacity={bubbleOpacity} />
            <circle cx={226} cy={52} r={14} fill={BG_DARK} opacity={bubbleOpacity} />
            <circle cx={246} cy={32} r={20} fill={BG_DARK} opacity={bubbleOpacity} />
            <text x={246} y={40} textAnchor="middle" fontFamily={FONT} fontSize={20} fill={GREEN} opacity={bubbleOpacity} fontWeight="bold">$</text>
          </svg>
        </div>
        <svg width={100} height={155} viewBox="0 0 100 155">
          <circle cx={50} cy={24} r={22} fill={BG_DARK} />
          <rect x={18} y={54} width={64} height={72} rx={13} fill={BG_DARK} />
          <rect x={6} y={58} width={18} height={58} rx={9} fill={BG_DARK} />
          <rect x={76} y={58} width={18} height={58} rx={9} fill={BG_DARK} />
          <rect x={26} y={118} width={20} height={28} rx={7} fill={BG_DARK} />
          <rect x={54} y={118} width={20} height={28} rx={7} fill={BG_DARK} />
        </svg>
        <div style={{ transform: `translateY(${labelY}px)`, opacity: labelOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(48, BG_DARK), marginBottom: 10 }}>THE WEALTH EFFECT</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#777', textAlign: 'center', margin: 0, letterSpacing: '0.04em' }}>
            Higher limit → brain feels richer
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pct = interpolate(frame, [25, 120], [0, 68], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 110 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(36, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>THE STAT THEY BURY</p>
        <p style={{ ...headline(180, ACCENT), lineHeight: 1, margin: 0 }}>{Math.round(pct)}%</p>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 16, height: 36, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: ACCENT, borderRadius: 16 }} />
        </div>
        <p style={{ ...headline(30, WHITE), lineHeight: 1.35, margin: 0, textAlign: 'center' }}>
          OF PEOPLE SPEND UP TO<br />THEIR NEW LIMIT
        </p>
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: 'rgba(239,68,68,0.18)',
            border: `2px solid ${ACCENT}`,
            borderRadius: 12,
            padding: '16px 40px',
          }}
        >
          <p style={{ ...headline(34, ACCENT), margin: 0 }}>WITHIN 18 MONTHS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bankScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, from: 0, to: 1 });
  const arrowOpacity = interpolate(frame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [125, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const colPositions = [52, 100, 148, 196];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '0 60px',
        }}
      >
        <div style={{ transform: `scale(${bankScale})` }}>
          <svg width={280} height={255} viewBox="0 0 280 255">
            <polygon points="140,18 278,88 2,88" fill={BG_DARK} />
            <rect x={18} y={88} width={244} height={152} fill={BG_DARK} />
            {colPositions.map((x, i) => (
              <rect key={i} x={x} y={88} width={22} height={152} fill="rgba(255,255,255,0.07)" />
            ))}
            <rect x={110} y={190} width={60} height={50} rx={4} fill={ACCENT} />
            <text x={140} y={70} textAnchor="middle" fontFamily={FONT} fontSize={18} fill={WHITE}>BANK</text>
          </svg>
        </div>
        <div style={{ opacity: arrowOpacity, display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width={70} height={28} viewBox="0 0 70 28">
            <line x1={0} y1={14} x2={56} y2={14} stroke={ACCENT} strokeWidth={5} />
            <polygon points="56,3 70,14 56,25" fill={ACCENT} />
          </svg>
          <svg width={100} height={65} viewBox="0 0 100 65">
            <rect width={100} height={65} rx={10} fill={ACCENT} />
            <rect y={20} width={100} height={18} fill="rgba(0,0,0,0.3)" />
            <rect x={10} y={44} width={30} height={16} rx={4} fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
        <div style={{ opacity: labelOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(50, BG_DARK), marginBottom: 8 }}>NOT RANDOM.</p>
          <p style={{ ...headline(50, ACCENT), margin: 0 }}>CALCULATED.</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#666', textAlign: 'center', marginTop: 16, letterSpacing: '0.04em' }}>
            They know your spending patterns
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const debtVal = Math.round(
    interpolate(frame, [20, 115], [0, 2400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const interestVal = Math.round(
    interpolate(frame, [110, 185], [0, 576], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const badgeScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const barTargets = [55, 110, 180, 250, 310];
  const barHeights = barTargets.map((target, i) =>
    interpolate(frame, [25 + i * 16, 85 + i * 16], [0, target], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(32, 'rgba(255,255,255,0.5)'), marginBottom: 0 }}>AVERAGE NEW DEBT ADDED</p>
        <p style={{ ...headline(108, ACCENT), lineHeight: 1, margin: 0 }}>${debtVal.toLocaleString()}</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 316 }}>
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{
                width: 92,
                height: Math.max(0, Math.floor(h)),
                background: i < 4 ? `rgba(239,68,68,${0.3 + i * 0.15})` : ACCENT,
                borderRadius: '8px 8px 0 0',
              }}
            />
          ))}
        </div>
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: 'rgba(239,68,68,0.18)',
            border: `2px solid ${ACCENT}`,
            borderRadius: 12,
            padding: '14px 36px',
            textAlign: 'center',
          }}
        >
          <p style={{ ...headline(26, 'rgba(255,255,255,0.6)'), margin: '0 0 6px 0' }}>AT 24% APR THAT'S</p>
          <p style={{ ...headline(50, WHITE), margin: 0 }}>${interestVal}/YR IN INTEREST</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const checkScale = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 10, stiffness: 110 }, from: 0, to: 1 });
  const ctaOpacity = interpolate(frame, [120, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 60px',
        }}
      >
        <p style={{ ...headline(40, BG_DARK), marginBottom: 0 }}>YOUR COUNTER-MOVE</p>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          <div style={{ transform: `scale(${phoneScale})` }}>
            <svg width={130} height={230} viewBox="0 0 130 230">
              <rect width={130} height={230} rx={20} fill={BG_DARK} />
              <rect x={12} y={18} width={106} height={174} rx={8} fill={ACCENT} opacity={0.85} />
              <rect x={45} y={9} width={40} height={8} rx={4} fill="rgba(255,255,255,0.3)" />
              <line x1={32} y1={84} x2={98} y2={84} stroke={WHITE} strokeWidth={3} />
              <line x1={32} y1={106} x2={80} y2={106} stroke={WHITE} strokeWidth={3} />
              <line x1={32} y1={128} x2={90} y2={128} stroke={WHITE} strokeWidth={3} />
            </svg>
          </div>
          <div style={{ transform: `scale(${checkScale})` }}>
            <svg width={90} height={90} viewBox="0 0 90 90">
              <circle cx={45} cy={45} r={43} fill={GREEN} />
              <polyline points="20,45 38,63 70,27" stroke={WHITE} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ ...headline(36, BG_DARK), marginBottom: 10 }}>CALL YOUR BANK.</p>
          <p style={{ ...headline(36, ACCENT), margin: 0 }}>REQUEST LOWER LIMIT.</p>
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            background: BG_DARK,
            borderRadius: 16,
            padding: '20px 40px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <p style={{ ...headline(28, WHITE), margin: '0 0 8px 0' }}>REMOVE THE CEILING</p>
          <p style={{ ...headline(28, GREEN), margin: 0 }}>REMOVE THE TRAP</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#888', textAlign: 'center', margin: 0, letterSpacing: '0.04em' }}>
          Follow for more money psychology
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
