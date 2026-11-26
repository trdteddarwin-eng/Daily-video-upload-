import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
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

  const bag1s = spring({ frame, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const bag2s = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const bag3s = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100, mass: 1 } });

  const count = interpolate(frame, [30, 170], [0, 1463], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOp = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bagSprings = [bag1s, bag2s, bag3s];
  const bagColors = ['#F59E0B', '#D97706', '#B45309'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ display: 'flex', gap: 60, marginBottom: 70 }}>
          {bagSprings.map((s, i) => (
            <div key={i} style={{ transform: `scale(${s}) translateY(${(1 - s) * 60}px)`, opacity: s }}>
              <svg width="150" height="170" viewBox="0 0 150 170">
                <rect x="10" y="55" width="130" height="110" rx="12" fill={bagColors[i]} />
                <path d="M38 55 Q38 15 75 15 Q112 15 112 55" fill="none" stroke={bagColors[i]} strokeWidth="14" strokeLinecap="round" />
                <rect x="22" y="72" width="45" height="10" rx="5" fill="rgba(255,255,255,0.4)" />
                <text x="75" y="130" textAnchor="middle" fontSize="38" fill="rgba(255,255,255,0.8)" fontFamily="Arial">★</text>
              </svg>
            </div>
          ))}
        </div>

        <p style={{ ...headline(140, ACCENT), lineHeight: 1 }}>
          ${Math.floor(count).toLocaleString()}
        </p>
        <p style={{ ...headline(32, WHITE), marginTop: 12, letterSpacing: '0.07em', textTransform: 'none' as const }}>
          average holiday gift spend
        </p>

        <p style={{ ...headline(26, '#9CA3AF'), marginTop: 56, opacity: subOp, letterSpacing: '0.04em', textTransform: 'none' as const }}>
          here's the number nobody's ever calculated
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxS = spring({ frame, fps, config: { damping: 12, stiffness: 80, mass: 1.2 } });
  const tag1Op = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag2S = spring({ frame: frame - 70, fps, config: { damping: 10, stiffness: 100, mass: 1 } });
  const textOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${boxS})`, marginBottom: 60 }}>
          <svg width="300" height="290" viewBox="0 0 300 290">
            <rect x="30" y="130" width="240" height="150" rx="10" fill={ACCENT} />
            <rect x="20" y="98" width="260" height="42" rx="8" fill="#D97706" />
            <rect x="128" y="98" width="44" height="182" fill="#B45309" />
            <rect x="20" y="110" width="260" height="18" fill="#B45309" />
            <ellipse cx="110" cy="92" rx="46" ry="28" fill="#92400E" transform="rotate(-20 110 92)" />
            <ellipse cx="190" cy="92" rx="46" ry="28" fill="#92400E" transform="rotate(20 190 92)" />
            <circle cx="150" cy="95" r="20" fill="#D97706" />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'center', marginBottom: 56 }}>
          <div style={{ opacity: tag1Op, textAlign: 'center' }}>
            <p style={{ ...headline(26, '#6B7280'), textTransform: 'none' as const }}>YOU SPEND</p>
            <p style={{ ...headline(90, BLACK), textDecoration: 'line-through' }}>$100</p>
          </div>
          <div style={{ opacity: tag2S }}>
            <svg width="64" height="44" viewBox="0 0 64 44">
              <line x1="0" y1="22" x2="46" y2="22" stroke={ACCENT} strokeWidth="5" />
              <polygon points="46,10 64,22 46,34" fill={ACCENT} />
            </svg>
          </div>
          <div style={{ transform: `scale(${tag2S})`, textAlign: 'center' }}>
            <p style={{ ...headline(26, '#6B7280'), textTransform: 'none' as const }}>THEY VALUE AT</p>
            <p style={{ ...headline(90, ACCENT) }}>$50</p>
          </div>
        </div>

        <p style={{ ...headline(26, BLACK), opacity: textOp, letterSpacing: '0.04em', textTransform: 'none' as const }}>
          Cornell research: 50 cents per dollar spent on gifts
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardS = spring({ frame, fps, config: { damping: 12, stiffness: 80, mass: 1 } });
  const statS = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const barW = interpolate(frame, [80, 165], [0, 36], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${cardS}) rotate(${(1 - cardS) * -12}deg)`, marginBottom: 60 }}>
          <svg width="400" height="250" viewBox="0 0 400 250">
            <rect x="0" y="0" width="400" height="250" rx="22" fill="#1E293B" />
            <rect x="0" y="0" width="400" height="14" rx="12" fill="#EF4444" />
            <rect x="28" y="82" width="68" height="50" rx="8" fill="#D97706" />
            <rect x="40" y="82" width="5" height="50" fill="#B45309" />
            <rect x="54" y="82" width="5" height="50" fill="#B45309" />
            <rect x="68" y="82" width="5" height="50" fill="#B45309" />
            <rect x="28" y="104" width="68" height="5" fill="#B45309" />
            <text x="28" y="180" fontSize="28" fill="#CBD5E1" fontFamily="monospace" letterSpacing="4">•••• •••• •••• 2024</text>
            <text x="28" y="224" fontSize="18" fill="#94A3B8" fontFamily="monospace">HOLIDAY SHOPPER</text>
          </svg>
        </div>

        <div style={{ transform: `scale(${statS})`, textAlign: 'center', marginBottom: 50 }}>
          <p style={{ ...headline(120, '#EF4444') }}>36%</p>
          <p style={{ ...headline(30, WHITE), textTransform: 'none' as const, letterSpacing: '0.06em' }}>
            of Americans go into debt for holiday gifts
          </p>
        </div>

        <div style={{ width: 720 }}>
          <div style={{ background: '#1E293B', borderRadius: 8, height: 24, overflow: 'hidden' }}>
            <div style={{ width: `${barW}%`, height: '100%', background: '#EF4444', borderRadius: 8 }} />
          </div>
          <p style={{ ...headline(22, '#9CA3AF'), marginTop: 14, opacity: textOp, textTransform: 'none' as const, letterSpacing: '0.04em' }}>
            they'll be paying it off in february — with interest
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const growProgress = interpolate(frame, [30, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalCount = interpolate(frame, [100, 195], [1463, 147500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const NUM_BARS = 6;
  const barTargets = [8500, 20200, 38200, 64600, 100800, 147500];
  const barLabels = ['Yr 5', 'Yr 10', 'Yr 15', 'Yr 20', 'Yr 25', 'Yr 30'];
  const maxBar = 147500;
  const chartH = 380;
  const barW = 110;
  const gap = 34;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translateY(${(1 - titleS) * -50}px)`, opacity: titleS, marginBottom: 20 }}>
          <p style={{ ...headline(30, BLACK) }}>$1,463/YEAR AT 7% GROWS TO</p>
        </div>

        <p style={{ ...headline(110, ACCENT), lineHeight: 1 }}>
          ${Math.floor(finalCount).toLocaleString()}
        </p>

        <svg width="900" height="460" viewBox="0 0 900 460" style={{ marginTop: 20 }}>
          {Array.from({ length: Math.max(0, Math.floor(NUM_BARS)) }, (_, i) => {
            const bp = Math.max(0, Math.min(1, growProgress * NUM_BARS - i));
            const h = (barTargets[i] / maxBar) * chartH * bp;
            const bx = 54 + i * (barW + gap);
            return (
              <g key={i}>
                <rect x={bx} y={440 - h} width={barW} height={h} rx={8} fill={ACCENT} opacity={0.6 + (i / NUM_BARS) * 0.4} />
                <text x={bx + barW / 2} y={456} textAnchor="middle" fontSize="22" fill={BLACK} fontFamily={FONT}>
                  {barLabels[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon1S = spring({ frame, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const icon2S = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const icon3S = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const textOp = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...headline(38, ACCENT), opacity: titleOp, marginBottom: 70 }}>$147,500 COULD BE YOUR...</p>

        <div style={{ display: 'flex', gap: 90, marginBottom: 60 }}>
          <div style={{ transform: `scale(${icon1S})`, textAlign: 'center' }}>
            <svg width="170" height="170" viewBox="0 0 170 170">
              <polygon points="85,10 160,70 10,70" fill={ACCENT} />
              <rect x="28" y="70" width="114" height="88" fill="#D97706" />
              <rect x="64" y="102" width="42" height="56" rx="5" fill="#92400E" />
              <rect x="95" y="84" width="28" height="22" rx="4" fill="#FEF3C7" />
            </svg>
            <p style={{ ...headline(26, WHITE), marginTop: 14, textTransform: 'none' as const, letterSpacing: '0.04em' }}>Down Payment</p>
          </div>

          <div style={{ transform: `scale(${icon2S})`, textAlign: 'center' }}>
            <svg width="170" height="170" viewBox="0 0 170 170">
              <rect x="20" y="38" width="130" height="96" rx="10" fill={ACCENT} />
              <line x1="38" y1="64" x2="132" y2="64" stroke="#92400E" strokeWidth="5" />
              <line x1="38" y1="82" x2="132" y2="82" stroke="#92400E" strokeWidth="5" />
              <line x1="38" y1="100" x2="100" y2="100" stroke="#92400E" strokeWidth="5" />
              <circle cx="85" cy="148" r="20" fill="#D97706" />
              <text x="85" y="155" textAnchor="middle" fontSize="22" fill={BLACK} fontFamily="Arial">★</text>
            </svg>
            <p style={{ ...headline(26, WHITE), marginTop: 14, textTransform: 'none' as const, letterSpacing: '0.04em' }}>4 Yrs College</p>
          </div>

          <div style={{ transform: `scale(${icon3S})`, textAlign: 'center' }}>
            <svg width="170" height="170" viewBox="0 0 170 170">
              <path d="M80 160 Q84 110 88 65" stroke="#B45309" strokeWidth="12" fill="none" strokeLinecap="round" />
              <ellipse cx="62" cy="58" rx="44" ry="16" fill="#10B981" transform="rotate(-22 62 58)" />
              <ellipse cx="108" cy="52" rx="44" ry="16" fill="#059669" transform="rotate(22 108 52)" />
              <ellipse cx="85" cy="42" rx="38" ry="13" fill="#10B981" transform="rotate(-4 85 42)" />
              <ellipse cx="85" cy="158" rx="52" ry="10" fill="#D97706" />
            </svg>
            <p style={{ ...headline(26, WHITE), marginTop: 14, textTransform: 'none' as const, letterSpacing: '0.04em' }}>5 Yrs Retired</p>
          </div>
        </div>

        <p style={{ ...headline(26, '#9CA3AF'), opacity: textOp, textTransform: 'none' as const, letterSpacing: '0.04em' }}>
          you gave it away one amazon box at a time
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyS = spring({ frame, fps, config: { damping: 12, stiffness: 80, mass: 1.2 } });
  const coinCount = interpolate(frame, [40, 150], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numCoins = Math.max(0, Math.floor(coinCount));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${piggyS})`, marginBottom: 50 }}>
          <svg width="300" height="260" viewBox="0 0 300 260">
            <ellipse cx="130" cy="155" rx="110" ry="85" fill="#F9A8D4" />
            <ellipse cx="228" cy="135" rx="55" ry="50" fill="#F9A8D4" />
            <ellipse cx="265" cy="147" rx="23" ry="19" fill="#F472B6" />
            <circle cx="259" cy="142" r="5" fill="#BE185D" />
            <circle cx="271" cy="142" r="5" fill="#BE185D" />
            <circle cx="244" cy="122" r="7" fill="white" />
            <circle cx="246" cy="122" r="4" fill="#1E293B" />
            <ellipse cx="216" cy="86" rx="19" ry="23" fill="#F472B6" transform="rotate(-15 216 86)" />
            <rect x="52" y="230" width="30" height="18" rx="6" fill="#F472B6" />
            <rect x="98" y="230" width="30" height="18" rx="6" fill="#F472B6" />
            <rect x="144" y="230" width="30" height="18" rx="6" fill="#F472B6" />
            <rect x="190" y="230" width="30" height="18" rx="6" fill="#F472B6" />
            <rect x="108" y="72" width="44" height="10" rx="5" fill="#BE185D" />
            <path d="M20 162 Q4 145 16 130 Q28 115 12 105" stroke="#F472B6" strokeWidth="9" fill="none" strokeLinecap="round" />
            {Array.from({ length: numCoins }, (_, i) => (
              <circle key={i} cx={98 + i * 10} cy={66 - i * 7} r="11" fill={ACCENT} />
            ))}
          </svg>
        </div>

        <div style={{ opacity: textOp, textAlign: 'center', marginBottom: 44 }}>
          <p style={{ ...headline(44, BLACK) }}>TRY THIS YEAR</p>
          <p style={{ ...headline(38, ACCENT), marginTop: 14 }}>$20 GIFT CAP PER PERSON</p>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center', maxWidth: 820 }}>
          <p style={{ ...headline(26, '#6B7280'), letterSpacing: '0.04em', textTransform: 'none' as const }}>
            propose it to your family — everyone will be relieved
          </p>
          <p style={{ ...headline(26, ACCENT), marginTop: 20, letterSpacing: '0.04em', textTransform: 'none' as const }}>
            follow for more money moves
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
