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

  const phoneY = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 400, to: 0 });
  const textOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countVal = Math.floor(interpolate(frame, [60, 160], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const cashScale = interpolate(frame, [0, 45, 90, 135], [1, 1.04, 1, 1.04], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: 80 }}>
        <p style={{ ...headline(44, ACCENT), opacity: textOpacity }}>THE WAITING GAME</p>

        {/* Phone SVG */}
        <svg width="200" height="340" viewBox="0 0 200 340" style={{ transform: `translateY(${phoneY}px)` }}>
          <rect x="10" y="10" width="180" height="320" rx="24" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
          <rect x="22" y="42" width="156" height="236" rx="6" fill="#0a0a0a" />
          <text x="100" y="148" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="60" fill={ACCENT} fontWeight="900">$</text>
          <text x="100" y="188" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fill={WHITE}>50,000</text>
          <text x="100" y="216" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#666">WAITING TO INVEST...</text>
          <rect x="80" y="306" width="40" height="6" rx="3" fill="#444" />
        </svg>

        {/* Cash stack */}
        <svg width="260" height="96" viewBox="0 0 260 96" style={{ transform: `scale(${cashScale})` }}>
          <rect x="12" y="46" width="236" height="44" rx="8" fill="#1A3A1A" stroke="#266026" strokeWidth="1.5" />
          <rect x="6" y="28" width="236" height="44" rx="8" fill="#1E4E1E" stroke="#2A8A2A" strokeWidth="1.5" />
          <rect x="0" y="10" width="236" height="44" rx="8" fill="#205C20" stroke="#2DA82D" strokeWidth="1.5" />
          <text x="118" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fill="#7FD07F" fontWeight="bold">$50,000 — IDLE</text>
        </svg>

        {/* Counter */}
        <div style={{ textAlign: 'center', opacity: textOpacity }}>
          <p style={{ ...headline(100, WHITE), lineHeight: 1 }}>{countVal}%</p>
          <p style={{ ...headline(30, '#888888'), marginTop: 8 }}>OF INVESTORS DO THIS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cashX = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: -500, to: 0 });
  const chartX = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 500, to: 0 });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dustOpacity = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dustPositions = [
    { x: 40, y: 28, r: 4 }, { x: 100, y: 18, r: 3 }, { x: 155, y: 32, r: 5 },
    { x: 70, y: 48, r: 3 }, { x: 130, y: 55, r: 4 }, { x: 55, y: 62, r: 3 },
  ];

  const barH1 = interpolate(frame, [30, 90], [0, 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barH2 = interpolate(frame, [50, 115], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barH3 = interpolate(frame, [70, 140], [0, 125], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barH4 = interpolate(frame, [90, 165], [0, 170], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: 80 }}>
        <p style={{ ...headline(60, BLACK), opacity: textOpacity }}>CASH DRAG</p>
        <p style={{ ...headline(28, '#555555'), opacity: textOpacity }}>YOUR MONEY VS. THE MARKET</p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 56, alignItems: 'flex-end' }}>
          {/* Cash pile with dust */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transform: `translateX(${cashX}px)` }}>
            <svg width="190" height="210" viewBox="0 0 190 210">
              {dustPositions.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#AAAAAA" opacity={dustOpacity * 0.6} />
              ))}
              <rect x="12" y="118" width="166" height="44" rx="8" fill="#2A6A2A" stroke="#3A9A3A" strokeWidth="1.5" />
              <rect x="6" y="98" width="166" height="44" rx="8" fill="#2E7A2E" stroke="#40A840" strokeWidth="1.5" />
              <rect x="0" y="78" width="166" height="44" rx="8" fill="#326A32" stroke="#48B848" strokeWidth="1.5" />
              <text x="83" y="104" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fill="white" fontWeight="bold">$50,000</text>
              <rect x="20" y="170" width="130" height="8" rx="4" fill="#CCCCCC" opacity={dustOpacity * 0.5} />
            </svg>
            <p style={{ ...headline(26, BLACK) }}>WAITING</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#EF4444', fontWeight: 900 }}>$0 EARNED</p>
          </div>

          <p style={{ ...headline(44, '#999999'), marginBottom: 96 }}>VS</p>

          {/* Growing bar chart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transform: `translateX(${chartX}px)` }}>
            <svg width="190" height="210" viewBox="0 0 190 210">
              <line x1="18" y1="200" x2="185" y2="200" stroke={BLACK} strokeWidth="2" />
              <line x1="18" y1="10" x2="18" y2="200" stroke={BLACK} strokeWidth="2" />
              <rect x="28" y={200 - barH1} width="30" height={barH1} fill={ACCENT} rx="3" />
              <rect x="66" y={200 - barH2} width="30" height={barH2} fill={ACCENT} rx="3" />
              <rect x="104" y={200 - barH3} width="30" height={barH3} fill={ACCENT} rx="3" />
              <rect x="142" y={200 - barH4} width="30" height={barH4} fill={ACCENT} rx="3" />
            </svg>
            <p style={{ ...headline(26, BLACK) }}>INVESTED</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#10B981', fontWeight: 900 }}>+7% / YEAR</p>
          </div>
        </div>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 30, color: '#333333', textAlign: 'center', maxWidth: 820, opacity: textOpacity, lineHeight: 1.4 }}>
          Researchers measured exactly how much waiting costs. It's more than you think.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 160, to: 0 });
  const textOpacity = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countVal = Math.floor(interpolate(frame, [60, 185], [0, 4100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const barW = interpolate(frame, [60, 175], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const monthsOpacity = interpolate(frame, [85, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calCells = Array.from({ length: Math.max(0, Math.floor(14)) });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: 80 }}>
        <p style={{ ...headline(44, ACCENT), opacity: textOpacity }}>THE MATH</p>

        {/* 14-month calendar */}
        <svg width="340" height="220" viewBox="0 0 340 220" style={{ transform: `translateY(${slideIn}px)`, opacity: textOpacity }}>
          <rect x="8" y="8" width="324" height="204" rx="14" fill="#1E1E1E" stroke="#333333" strokeWidth="2" />
          <rect x="8" y="8" width="324" height="52" rx="14" fill={ACCENT} />
          <rect x="8" y="40" width="324" height="20" fill={ACCENT} />
          <text x="170" y="41" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="22" fill={BLACK} fontWeight="900">14 MONTHS IDLE</text>
          {calCells.map((_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            return (
              <g key={i}>
                <rect x={16 + col * 44} y={70 + row * 64} width="36" height="36" rx="6" fill="#2A2A2A" stroke="#444444" strokeWidth="1" />
                <text x={34 + col * 44} y={92 + row * 64} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#888888">{i + 1}</text>
              </g>
            );
          })}
        </svg>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 32, color: WHITE, textAlign: 'center', maxWidth: 860, opacity: monthsOpacity, lineHeight: 1.4 }}>
          Average investor waits <span style={{ color: ACCENT, fontWeight: 900 }}>14 months</span>. On $50K that's real money.
        </p>

        {/* Progress bar */}
        <div style={{ width: 360, opacity: textOpacity }}>
          <p style={{ ...headline(26, '#888888'), marginBottom: 10 }}>MISSED GROWTH</p>
          <div style={{ background: '#2A2A2A', height: 30, borderRadius: 15, overflow: 'hidden' }}>
            <div style={{ background: '#EF4444', height: '100%', width: barW, borderRadius: 15 }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', opacity: textOpacity }}>
          <p style={{ ...headline(90, '#EF4444'), lineHeight: 1 }}>-${countVal.toLocaleString()}</p>
          <p style={{ ...headline(26, '#888888'), marginTop: 8 }}>IN MISSED RETURNS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, config: { damping: 12, stiffness: 60 }, from: 0, to: 1 });
  const textOpacity = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, padding: 80 }}>
        <p style={{ ...headline(50, BLACK), opacity: textOpacity }}>YOUR BRAIN'S TRAP</p>

        {/* Brain SVG */}
        <svg width="280" height="250" viewBox="0 0 280 250" style={{ transform: `scale(${brainScale})` }}>
          <ellipse cx="95" cy="125" rx="82" ry="100" fill="#FADADD" stroke="#C0392B" strokeWidth="3" />
          <ellipse cx="185" cy="125" rx="82" ry="100" fill="#FADADD" stroke="#C0392B" strokeWidth="3" />
          <line x1="140" y1="25" x2="140" y2="225" stroke="#C0392B" strokeWidth="2" />
          <path d="M40 90 Q80 72 120 90 Q80 108 40 90Z" fill="#F0A0A0" />
          <path d="M40 135 Q80 117 120 135 Q80 153 40 135Z" fill="#F0A0A0" />
          <path d="M40 180 Q80 162 120 180 Q80 198 40 180Z" fill="#F0A0A0" />
          <path d="M160 90 Q200 72 240 90 Q200 108 160 90Z" fill="#F0A0A0" />
          <path d="M160 135 Q200 117 240 135 Q200 153 160 135Z" fill="#F0A0A0" />
          <path d="M160 180 Q200 162 240 180 Q200 198 160 180Z" fill="#F0A0A0" />
          <text x="95" y="138" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="52" fill="#C0392B" fontWeight="900">?</text>
          <text x="185" y="138" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="52" fill="#C0392B" fontWeight="900">!</text>
        </svg>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 32, color: '#333333', textAlign: 'center', maxWidth: 820, opacity: textOpacity, lineHeight: 1.5 }}>
          Your brain evolved to wait for danger to pass. Markets punish that instinct.
        </p>

        {/* Arrow diagram */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, opacity: arrowOpacity }}>
          <div style={{ background: '#EF4444', borderRadius: 14, padding: '14px 26px' }}>
            <p style={{ ...headline(24, WHITE) }}>WAITING = SAFE?</p>
          </div>
          <svg width="60" height="36" viewBox="0 0 60 36">
            <path d="M4 18 L46 18 M36 8 L46 18 L36 28" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ background: ACCENT, borderRadius: 14, padding: '14px 26px' }}>
            <p style={{ ...headline(24, BLACK) }}>COSTLY</p>
          </div>
        </div>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 28, color: '#555555', textAlign: 'center', opacity: arrowOpacity }}>
          Here's the 30-year price tag of that hesitation.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pig1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const pig2Scale = spring({ frame, fps, config: { damping: 14, stiffness: 55 }, from: 0, to: 1 });
  const countVal = Math.floor(interpolate(frame, [85, 205], [0, 163000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const labelOpacity = interpolate(frame, [85, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 80 }}>
        <p style={{ ...headline(44, ACCENT), opacity: textOpacity }}>30-YEAR COST</p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 72, alignItems: 'flex-end', opacity: textOpacity }}>
          {/* Waiter piggy bank — smaller */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="130" height="200" viewBox="0 0 130 200" style={{ transform: `scale(${pig1Scale})`, transformOrigin: 'bottom center' }}>
              <ellipse cx="65" cy="148" rx="58" ry="46" fill="#AA4444" />
              <circle cx="65" cy="96" r="40" fill="#CC5555" />
              <ellipse cx="28" cy="78" rx="12" ry="16" fill="#883333" />
              <circle cx="54" cy="90" r="5" fill="white" />
              <circle cx="54" cy="90" r="2" fill="#333333" />
              <ellipse cx="65" cy="118" rx="16" ry="11" fill="#883333" />
              <circle cx="58" cy="117" r="3" fill="#661111" />
              <circle cx="72" cy="117" r="3" fill="#661111" />
              <rect x="54" y="60" width="22" height="5" rx="2" fill="#661111" />
              <rect x="28" y="182" width="16" height="18" rx="6" fill="#883333" />
              <rect x="50" y="186" width="16" height="14" rx="6" fill="#883333" />
              <rect x="72" y="186" width="16" height="14" rx="6" fill="#883333" />
              <rect x="94" y="182" width="16" height="18" rx="6" fill="#883333" />
            </svg>
            <p style={{ ...headline(26, WHITE) }}>WAITER</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', fontWeight: 900, margin: 0 }}>$837K</p>
          </div>

          <p style={{ ...headline(40, '#666666'), marginBottom: 80 }}>VS</p>

          {/* Investor piggy bank — larger */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="160" height="240" viewBox="0 0 160 240" style={{ transform: `scale(${pig2Scale})`, transformOrigin: 'bottom center' }}>
              <ellipse cx="80" cy="178" rx="70" ry="56" fill="#CC7B00" />
              <circle cx="80" cy="114" r="50" fill={ACCENT} />
              <ellipse cx="34" cy="92" rx="15" ry="20" fill="#CC7B00" />
              <circle cx="66" cy="108" r="6" fill="white" />
              <circle cx="66" cy="108" r="2.5" fill="#333333" />
              <ellipse cx="80" cy="140" rx="20" ry="13" fill="#CC7B00" />
              <circle cx="71" cy="139" r="4" fill="#AA5500" />
              <circle cx="89" cy="139" r="4" fill="#AA5500" />
              <rect x="66" y="70" width="28" height="6" rx="3" fill="#AA5500" />
              <circle cx="80" cy="52" r="16" fill={ACCENT} stroke="#AA5500" strokeWidth="2" />
              <text x="80" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fill={BLACK} fontWeight="900">$</text>
              <rect x="34" y="218" width="20" height="22" rx="7" fill="#CC7B00" />
              <rect x="60" y="224" width="20" height="16" rx="7" fill="#CC7B00" />
              <rect x="86" y="224" width="20" height="16" rx="7" fill="#CC7B00" />
              <rect x="112" y="218" width="20" height="22" rx="7" fill="#CC7B00" />
            </svg>
            <p style={{ ...headline(26, WHITE) }}>INVESTOR</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: '#10B981', fontWeight: 900, margin: 0 }}>$1,000K</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', opacity: labelOpacity }}>
          <p style={{ ...headline(34, '#888888') }}>THE GAP</p>
          <p style={{ ...headline(78, '#EF4444'), lineHeight: 1 }}>-${countVal.toLocaleString()}</p>
        </div>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 28, color: '#888888', textAlign: 'center', opacity: labelOpacity }}>
          Just from the habit of hesitating.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clockAngle = interpolate(frame, [0, dur], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, from: -100, to: 0 });
  const textOpacity = interpolate(frame, [30, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [145, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const hourRad = (clockAngle / 12) * (Math.PI / 180) - Math.PI / 2;
  const minRad = clockAngle * (Math.PI / 180) - Math.PI / 2;

  const hourX = 120 + Math.cos(hourRad) * 58;
  const hourY = 120 + Math.sin(hourRad) * 58;
  const minX = 120 + Math.cos(minRad) * 84;
  const minY = 120 + Math.sin(minRad) * 84;

  const hourMarks = Array.from({ length: Math.max(0, Math.floor(12)) });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: 80 }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(52, BLACK) }}>TIME IN THE MARKET</p>
          <p style={{ ...headline(40, ACCENT), marginTop: 8 }}>BEATS TIMING IT</p>
        </div>

        {/* Clock SVG */}
        <svg width="240" height="240" viewBox="0 0 240 240" style={{ opacity: textOpacity }}>
          <circle cx="120" cy="120" r="112" fill="white" stroke={ACCENT} strokeWidth="6" />
          {hourMarks.map((_, i) => {
            const ang = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1={120 + Math.cos(ang) * 90}
                y1={120 + Math.sin(ang) * 90}
                x2={120 + Math.cos(ang) * 104}
                y2={120 + Math.sin(ang) * 104}
                stroke={BLACK}
                strokeWidth="3"
              />
            );
          })}
          <line x1="120" y1="120" x2={hourX} y2={hourY} stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
          <line x1="120" y1="120" x2={minX} y2={minY} stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          <circle cx="120" cy="120" r="8" fill={ACCENT} />
        </svg>

        <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 30, color: '#333333', textAlign: 'center', maxWidth: 860, opacity: textOpacity, lineHeight: 1.5 }}>
          Vanguard proved lump-sum investing beats waiting 68% of the time. Every month you delay is money your future self will never see.
        </p>

        <div style={{ background: ACCENT, borderRadius: 20, padding: '24px 52px', opacity: ctaOpacity }}>
          <p style={{ ...headline(36, BLACK) }}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(24, BLACK), marginTop: 8 }}>MONEY TRUTHS DAILY</p>
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
