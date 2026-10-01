import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0D0D0D';
const BG_LIGHT = '#F7F7F7';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#111111';
const ORANGE_COL = '#F97316';
const GOLD = '#F59E0B';
const GREEN_COL = '#22C55E';
const PINK_COL = '#FFCDD2';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
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

  const calSp = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const calY = interpolate(calSp, [0, 1], [100, 0]);
  const i1 = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 11, stiffness: 110 } });
  const i2 = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 11, stiffness: 110 } });
  const i3 = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 11, stiffness: 110 } });
  const numOp = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numY = interpolate(frame, [115, 140], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 80,
        }}
      >
        <p style={{ ...headline(20, '#666666'), opacity: labelOp, marginBottom: 20 }}>
          TODAY MARKS THE START OF
        </p>

        {/* Calendar */}
        <div
          style={{
            transform: `scale(${calSp}) translateY(${calY}px)`,
            opacity: calSp,
            marginBottom: 52,
          }}
        >
          <svg width="230" height="250" viewBox="0 0 230 250">
            <rect x="4" y="28" width="222" height="214" rx="20" fill="#1E1E2E" stroke={ACCENT} strokeWidth="3.5" />
            <rect x="4" y="28" width="222" height="70" rx="20" fill={ACCENT} />
            <rect x="4" y="82" width="222" height="16" fill={ACCENT} />
            <rect x="68" y="6" width="15" height="38" rx="7.5" fill="#444444" />
            <rect x="148" y="6" width="15" height="38" rx="7.5" fill="#444444" />
            <text x="115" y="84" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="28" fontWeight="900">OCT</text>
            <text x="115" y="205" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="110" fontWeight="900">1</text>
          </svg>
        </div>

        {/* Holiday icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 52, marginBottom: 56 }}>
          {/* Pumpkin */}
          <div style={{ transform: `scale(${i1})`, opacity: i1 }}>
            <svg width="86" height="94" viewBox="0 0 86 94">
              <ellipse cx="43" cy="58" rx="37" ry="32" fill={ORANGE_COL} />
              <rect x="37" y="18" width="12" height="22" rx="6" fill="#2D5A1B" />
              <polygon points="43,4 36,18 50,18" fill="#2D5A1B" />
              <polygon points="20,46 29,38 29,54" fill={BLACK} />
              <polygon points="66,46 57,38 57,54" fill={BLACK} />
              <path d="M 22 68 Q 43 82 64 68" stroke={BLACK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {/* Turkey */}
          <div style={{ transform: `scale(${i2})`, opacity: i2 }}>
            <svg width="86" height="94" viewBox="0 0 86 94">
              <ellipse cx="43" cy="44" rx="36" ry="30" fill="#8B4513" />
              <ellipse cx="43" cy="44" rx="26" ry="22" fill="#CD853F" />
              <ellipse cx="43" cy="66" rx="22" ry="20" fill="#A0522D" />
              <circle cx="43" cy="36" r="13" fill="#CD853F" />
              <polygon points="43,34 50,38 43,42" fill="#FFA500" />
              <circle cx="38" cy="33" r="3" fill={BLACK} />
              <path d="M 42 42 Q 35 50 39 54" stroke="#CC2200" strokeWidth="4" fill="none" strokeLinecap="round" />
              <rect x="35" y="83" width="8" height="11" rx="4" fill="#FFA500" />
              <rect x="47" y="83" width="8" height="11" rx="4" fill="#FFA500" />
            </svg>
          </div>
          {/* Christmas tree */}
          <div style={{ transform: `scale(${i3})`, opacity: i3 }}>
            <svg width="86" height="94" viewBox="0 0 86 94">
              <polygon points="43,4 15,46 71,46" fill="#2D6A2D" />
              <polygon points="43,22 11,66 75,66" fill="#3A8A3A" />
              <polygon points="43,40 7,86 79,86" fill="#2D6A2D" />
              <rect x="36" y="82" width="14" height="12" rx="2" fill="#8B4513" />
              <circle cx="43" cy="4" r="6" fill={GOLD} />
              <circle cx="28" cy="54" r="5" fill={ACCENT} />
              <circle cx="58" cy="48" r="5" fill={GOLD} />
              <circle cx="43" cy="70" r="5" fill={ACCENT} />
            </svg>
          </div>
        </div>

        {/* 92 DAYS */}
        <div
          style={{
            opacity: numOp,
            transform: `translateY(${numY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p style={{ ...headline(92, ACCENT), textShadow: `0 0 40px ${ACCENT}55` }}>92 DAYS</p>
          <p style={{ ...headline(26, WHITE), marginTop: 12 }}>OF RETAIL WARFARE BEGINS NOW</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bankSp = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const numDisp = Math.floor(
    interpolate(frame, [20, 110], [0, 3400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const stat1Op = interpolate(frame, [125, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinData = [
    { angle: 0, delay: 15, dist: 115 },
    { angle: 60, delay: 20, dist: 100 },
    { angle: 120, delay: 18, dist: 110 },
    { angle: 180, delay: 22, dist: 108 },
    { angle: 240, delay: 25, dist: 105 },
    { angle: 300, delay: 17, dist: 112 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ ...headline(88, BLACK), marginBottom: 4 }}>${numDisp.toLocaleString()}</p>
        <p style={{ ...headline(22, ACCENT), marginBottom: 40 }}>DRAINED THIS HOLIDAY SEASON</p>

        {/* Piggy bank with flying coins */}
        <div style={{ position: 'relative', width: 320, height: 280, marginBottom: 28 }}>
          <div
            style={{
              transform: `scale(${bankSp})`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <svg width="300" height="240" viewBox="0 0 300 240">
              <ellipse cx="140" cy="140" rx="108" ry="90" fill={PINK_COL} />
              <ellipse cx="140" cy="132" rx="94" ry="76" fill="#FFEBEE" />
              <circle cx="232" cy="118" r="50" fill="#FFEBEE" />
              <ellipse cx="258" cy="130" rx="22" ry="15" fill={PINK_COL} />
              <circle cx="252" cy="126" r="5" fill="#FF8A9A" />
              <circle cx="262" cy="126" r="5" fill="#FF8A9A" />
              <circle cx="220" cy="106" r="7" fill={BLACK} />
              <circle cx="222" cy="104" r="2.5" fill={WHITE} />
              <ellipse cx="220" cy="74" rx="13" ry="18" fill={PINK_COL} />
              <ellipse cx="220" cy="74" rx="8" ry="12" fill="#FFAABB" />
              <rect x="46" y="206" width="34" height="24" rx="12" fill={PINK_COL} />
              <rect x="88" y="206" width="34" height="24" rx="12" fill={PINK_COL} />
              <rect x="148" y="206" width="34" height="24" rx="12" fill={PINK_COL} />
              <rect x="190" y="206" width="34" height="24" rx="12" fill={PINK_COL} />
              <path d="M 34 110 Q 16 86 24 64 Q 32 42 16 28" stroke={PINK_COL} strokeWidth="10" fill="none" strokeLinecap="round" />
              <rect x="112" y="52" width="34" height="8" rx="4" fill="#CC9999" />
              <path d="M 112 52 L 92 80 L 108 98" stroke="#CC5555" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {Array.from({ length: Math.max(0, Math.floor(6)) }).map((_, idx) => {
            const cd = coinData[idx % coinData.length];
            const rad = (cd.angle * Math.PI) / 180;
            const sp = spring({
              frame: Math.max(0, frame - cd.delay),
              fps,
              config: { damping: 22, stiffness: 55 },
            });
            const loopOp = interpolate(sp, [0, 0.25, 0.8, 1], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const px = 155 + Math.cos(rad) * sp * cd.dist;
            const py = 130 + Math.sin(rad) * sp * cd.dist;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: px - 14,
                  top: py - 14,
                  opacity: loopOp,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: GOLD,
                  border: `2.5px solid #B8740A`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 14, color: '#6B4500', fontWeight: 900 }}>$</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: stat1Op, marginBottom: 10 }}>
          <p style={{ ...headline(28, BLACK) }}>
            ONLY <span style={{ color: ACCENT, fontSize: 48 }}>32%</span> SET A BUDGET
          </p>
        </div>
        <div style={{ opacity: stat2Op }}>
          <p style={{ ...headline(20, '#666666') }}>THE OTHER 68% WING IT — AND OVERSPEND</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pumpSp = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const tagSp = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 90 } });
  const arrowOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowX = interpolate(frame, [90, 115], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const botOp = interpolate(frame, [135, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ ...headline(22, '#666666'), marginBottom: 20 }}>IT STARTS WITH HALLOWEEN</p>

        {/* Large pumpkin */}
        <div style={{ transform: `scale(${pumpSp})`, opacity: pumpSp, marginBottom: 36 }}>
          <svg width="280" height="290" viewBox="0 0 280 290">
            <ellipse cx="140" cy="170" rx="128" ry="108" fill={ORANGE_COL} />
            <ellipse cx="80" cy="160" rx="48" ry="94" fill="#E06000" />
            <ellipse cx="200" cy="160" rx="48" ry="94" fill="#E06000" />
            <ellipse cx="140" cy="162" rx="52" ry="100" fill={ORANGE_COL} />
            <rect x="124" y="52" width="16" height="30" rx="8" fill="#2D5A1B" />
            <path d="M 140 54 Q 162 38 157 22" stroke="#2D5A1B" strokeWidth="8" fill="none" strokeLinecap="round" />
            <polygon points="84,144 104,126 104,162" fill={BLACK} />
            <polygon points="196,144 176,126 176,162" fill={BLACK} />
            <path d="M 76 190 Q 140 232 204 190" stroke={BLACK} strokeWidth="7" fill="none" strokeLinecap="round" />
            <line x1="106" y1="190" x2="106" y2="212" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
            <line x1="140" y1="190" x2="140" y2="218" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
            <line x1="174" y1="190" x2="174" y2="212" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Price tag */}
        <div style={{ transform: `scale(${tagSp})`, opacity: tagSp, marginBottom: 28 }}>
          <svg width="250" height="96" viewBox="0 0 250 96">
            <rect x="8" y="8" width="214" height="80" rx="12" fill={WHITE} stroke={ORANGE_COL} strokeWidth="3" />
            <circle cx="230" cy="48" r="14" fill={ORANGE_COL} />
            <circle cx="230" cy="48" r="5" fill={WHITE} />
            <text x="112" y="58" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="42" fontWeight="900">$108</text>
            <text x="112" y="80" textAnchor="middle" fill="#888888" fontFamily={FONT} fontSize="14" fontWeight="700">PER PERSON</text>
          </svg>
        </div>

        {/* +70% arrow */}
        <div
          style={{
            opacity: arrowOp,
            transform: `translateX(${arrowX}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <polygon points="28,4 52,52 4,52" fill={GREEN_COL} />
          </svg>
          <p style={{ ...headline(52, GREEN_COL), margin: 0 }}>+70%</p>
          <p style={{ ...headline(18, '#888888'), margin: 0 }}>SINCE 2014</p>
        </div>

        <div style={{ opacity: botOp }}>
          <p style={{ ...headline(22, WHITE) }}>RETAILERS DESIGNED THIS ESCALATION</p>
          <p style={{ ...headline(18, '#888888'), marginTop: 8 }}>it only gets bigger from here</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const turkeySp = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const numSp = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 80 } });
  const numY = interpolate(numSp, [0, 1], [30, 0]);
  const meterPct = interpolate(frame, [80, 160], [100, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const botOp4 = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ ...headline(22, '#888888'), marginBottom: 16 }}>THEN THANKSGIVING HITS</p>

        {/* Turkey */}
        <div style={{ transform: `scale(${turkeySp})`, opacity: turkeySp, marginBottom: 28 }}>
          <svg width="260" height="240" viewBox="0 0 260 240">
            <ellipse cx="130" cy="100" rx="118" ry="78" fill="#8B4513" />
            <ellipse cx="130" cy="100" rx="94" ry="60" fill="#CD853F" />
            <ellipse cx="130" cy="100" rx="70" ry="44" fill="#A0522D" />
            <ellipse cx="130" cy="100" rx="46" ry="30" fill="#CD853F" />
            <ellipse cx="130" cy="172" rx="74" ry="56" fill="#8B4513" />
            <ellipse cx="130" cy="164" rx="58" ry="44" fill="#A0522D" />
            <circle cx="130" cy="94" r="36" fill="#CD853F" />
            <polygon points="130,90 148,98 130,106" fill="#FFA500" />
            <circle cx="118" cy="88" r="6" fill={BLACK} />
            <circle cx="120" cy="86" r="2" fill={WHITE} />
            <path d="M 128 104 Q 118 118 122 124" stroke="#CC2200" strokeWidth="6" fill="none" strokeLinecap="round" />
            <rect x="102" y="218" width="22" height="18" rx="8" fill="#FFA500" />
            <rect x="138" y="218" width="22" height="18" rx="8" fill="#FFA500" />
          </svg>
        </div>

        {/* $621 */}
        <div
          style={{
            transform: `scale(${numSp}) translateY(${numY}px)`,
            opacity: numSp,
            marginBottom: 28,
          }}
        >
          <p style={{ ...headline(86, BLACK), margin: 0 }}>$621</p>
          <p style={{ ...headline(20, '#666666'), marginTop: 4 }}>AVERAGE THANKSGIVING COST</p>
        </div>

        {/* Brain sensitivity meter */}
        <div style={{ width: 440, marginBottom: 16 }}>
          <p style={{ ...headline(15, '#888888'), marginBottom: 10 }}>BRAIN SPENDING SENSITIVITY</p>
          <div
            style={{
              width: '100%',
              height: 22,
              background: '#E0E0E0',
              borderRadius: 11,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${meterPct}%`,
                height: '100%',
                background: ACCENT,
                borderRadius: 11,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <p style={{ ...headline(13, '#888888'), margin: 0 }}>NUMB</p>
            <p style={{ ...headline(13, GREEN_COL), margin: 0 }}>ALERT</p>
          </div>
        </div>

        <div style={{ opacity: botOp4 }}>
          <p style={{ ...headline(26, BLACK) }}>WEEK 6 — BRAIN STOPS FEELING IT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const treeSp = spring({ frame, fps, config: { damping: 12, stiffness: 65 } });
  const cardSp = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 90 } });
  const swipeX = interpolate(frame, [45, 90], [-70, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numOp5 = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calOp5 = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calY5 = interpolate(frame, [140, 165], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ ...headline(22, '#666666'), marginBottom: 12 }}>THEN DECEMBER FINISHES YOU</p>

        {/* Tree with gifts */}
        <div style={{ transform: `scale(${treeSp})`, opacity: treeSp, marginBottom: 12 }}>
          <svg width="280" height="256" viewBox="0 0 280 256">
            <polygon points="140,8 90,86 190,86" fill="#2D6A2D" />
            <polygon points="140,38 74,128 206,128" fill="#3A8A3A" />
            <polygon points="140,74 52,186 228,186" fill="#2D6A2D" />
            <rect x="124" y="182" width="32" height="22" rx="4" fill="#8B4513" />
            <circle cx="140" cy="8" r="10" fill={GOLD} />
            <circle cx="104" cy="108" r="7" fill={ACCENT} />
            <circle cx="172" cy="102" r="7" fill={GOLD} />
            <circle cx="136" cy="150" r="7" fill={ACCENT} />
            <circle cx="164" cy="146" r="7" fill={GOLD} />
            <rect x="34" y="200" width="62" height="50" rx="5" fill={ACCENT} />
            <rect x="34" y="220" width="62" height="6" fill="#CC2200" />
            <rect x="61" y="200" width="8" height="50" fill="#CC2200" />
            <path d="M 65 200 Q 54 190 50 198" stroke={WHITE} strokeWidth="2" fill="none" />
            <path d="M 65 200 Q 76 190 80 198" stroke={WHITE} strokeWidth="2" fill="none" />
            <rect x="186" y="208" width="54" height="44" rx="5" fill={GOLD} />
            <rect x="186" y="226" width="54" height="5" fill="#C87E00" />
            <rect x="209" y="208" width="8" height="44" fill="#C87E00" />
          </svg>
        </div>

        {/* Credit card swipe */}
        <div
          style={{
            transform: `translateX(${swipeX}px) scale(${cardSp})`,
            opacity: cardSp,
            marginBottom: 12,
          }}
        >
          <svg width="260" height="88" viewBox="0 0 260 88">
            <rect x="4" y="4" width="252" height="80" rx="14" fill="#1E3A5F" />
            <rect x="4" y="28" width="252" height="22" fill="#16304E" />
            <rect x="20" y="54" width="68" height="12" rx="4" fill="#2D5A8E" />
            <rect x="20" y="70" width="100" height="8" rx="3" fill="#2D5A8E" />
            <text x="218" y="26" textAnchor="middle" fill={GOLD} fontFamily={FONT} fontSize="20" fontWeight="900">VISA</text>
            <circle cx="158" cy="18" r="10" fill="#FF6B6B" opacity="0.8" />
            <circle cx="173" cy="18" r="10" fill="#FFA500" opacity="0.8" />
          </svg>
        </div>

        {/* $1,048 */}
        <div style={{ opacity: numOp5, marginBottom: 12 }}>
          <p style={{ ...headline(76, ACCENT), margin: 0, textShadow: `0 0 30px ${ACCENT}66` }}>$1,048</p>
          <p style={{ ...headline(20, WHITE), marginTop: 4 }}>IN GIFTS ALONE — AUTOPILOT MODE</p>
        </div>

        {/* Jan warning */}
        <div
          style={{
            opacity: calOp5,
            transform: `translateY(${calY5}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '14px 36px',
            background: ACCENT,
            borderRadius: 18,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <rect x="0" y="0" width="48" height="48" rx="10" fill={WHITE} />
            <text x="24" y="30" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="18" fontWeight="900">JAN</text>
          </svg>
          <p style={{ ...headline(26, WHITE), margin: 0 }}>PANIC MODE ACTIVATES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSp = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const headY = interpolate(headSp, [0, 1], [40, 0]);
  const bar1H = interpolate(frame, [30, 110], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [55, 135], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkSp = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 10, stiffness: 100 } });
  const ctaOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 60,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: headSp,
            transform: `translateY(${headY}px)`,
            marginBottom: 44,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p style={{ ...headline(30, BLACK) }}>THE FIX IS ONE SENTENCE</p>
          <p style={{ ...headline(20, '#888888'), marginTop: 8 }}>write a number. that's it.</p>
        </div>

        {/* Bar chart comparison */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 64, marginBottom: 16 }}>
          {/* No Budget bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(20, ACCENT), margin: 0 }}>$3,400</p>
            <div
              style={{
                width: 120,
                height: bar1H,
                background: ACCENT,
                borderRadius: '8px 8px 0 0',
              }}
            />
            <p style={{ ...headline(15, '#888888'), margin: 0 }}>NO BUDGET</p>
          </div>
          {/* With Budget bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(20, GREEN_COL), margin: 0 }}>$1,802</p>
            <div
              style={{
                width: 120,
                height: bar2H,
                background: GREEN_COL,
                borderRadius: '8px 8px 0 0',
              }}
            />
            <p style={{ ...headline(15, '#888888'), margin: 0 }}>WITH BUDGET</p>
          </div>
        </div>

        {/* Baseline */}
        <div style={{ width: 360, height: 3, background: BLACK, marginBottom: 24 }} />

        <p style={{ ...headline(28, GREEN_COL), marginBottom: 8 }}>47% LESS SPENT</p>
        <p style={{ ...headline(17, '#888888'), marginBottom: 28 }}>WITH A WRITTEN HOLIDAY BUDGET</p>

        {/* Checkmark */}
        <div style={{ transform: `scale(${checkSp})`, marginBottom: 20 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" fill={GREEN_COL} />
            <polyline points="20,42 34,56 62,26" stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaOp, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ ...headline(44, BLACK), letterSpacing: '0.12em' }}>START TODAY</p>
          <p style={{ ...headline(18, '#666666'), marginTop: 8 }}>before october ends</p>
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
