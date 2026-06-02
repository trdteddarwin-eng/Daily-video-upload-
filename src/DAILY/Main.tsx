import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const personOp = interpolate(frame, [15, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [58, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctVal = interpolate(frame, [65, 165], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [118, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>
        <p style={{ ...headline(52, ACCENT), transform: `scale(${titleS})` }}>RETAIL THERAPY</p>

        <div style={{ opacity: personOp }}>
          <svg width="320" height="228" viewBox="0 0 320 228">
            {/* Couch */}
            <rect x="25" y="148" width="270" height="62" rx="18" fill="#2a2a2a" />
            <rect x="15" y="126" width="54" height="84" rx="14" fill="#333" />
            <rect x="251" y="126" width="54" height="84" rx="14" fill="#333" />
            {/* Person head */}
            <circle cx="160" cy="78" r="30" fill="#4a4a4a" />
            {/* Body */}
            <rect x="126" y="106" width="68" height="68" rx="16" fill="#4a4a4a" />
            {/* Right arm */}
            <rect x="188" y="128" width="14" height="50" rx="7" fill="#4a4a4a" />
            {/* Phone body */}
            <rect x="196" y="148" width="46" height="72" rx="8" fill="#1a1a2e" stroke="#555" strokeWidth="2" />
            <rect x="200" y="155" width="38" height="58" rx="5" fill="#0D1117" />
            {/* Shopping cart on phone screen */}
            <line x1="204" y1="164" x2="208" y2="170" stroke={ACCENT} strokeWidth="2" />
            <rect x="208" y="170" width="20" height="13" rx="2" fill="none" stroke={ACCENT} strokeWidth="2" />
            <circle cx="212" cy="187" r="3" fill={ACCENT} />
            <circle cx="224" cy="187" r="3" fill={ACCENT} />
            <rect x="210" y="173" width="16" height="6" rx="1" fill={ACCENT} opacity="0.6" />
          </svg>
        </div>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#9CA3AF') }}>STRESS MAKES YOU SPEND</p>
          <p style={{ ...headline(100, ACCENT), lineHeight: 1 }}>{Math.floor(pctVal)}%</p>
          <p style={{ ...headline(22, '#9CA3AF') }}>MORE THAN YOU PLANNED</p>
        </div>

        <div style={{ opacity: tagOp, background: ACCENT, borderRadius: 12, padding: '10px 28px' }}>
          <p style={{ ...headline(26, WHITE) }}>$3,200/YEAR TAB</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const brainOp = interpolate(frame, [18, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowR = interpolate(frame, [58, 92, 118, 158, 184, 210], [26, 44, 26, 44, 26, 44], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [82, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [122, 146], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [164, 184], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dots = [0, 1, 2, 3, 4, 5];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 60px' }}>
        <p style={{ ...headline(48, BLACK), transform: `scale(${titleS})` }}>DOPAMINE HIT</p>

        <div style={{ opacity: brainOp }}>
          <svg width="300" height="238" viewBox="0 0 300 238">
            {/* Brain shape */}
            <path d="M150 16 Q118 22 96 50 Q74 80 86 110 Q64 130 76 160 Q90 190 128 200 Q150 206 172 200 Q210 190 224 160 Q236 130 214 110 Q226 80 204 50 Q182 22 150 16Z" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            {/* Center fold */}
            <path d="M150 20 Q148 78 152 118 Q148 158 150 200" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
            {/* Reward center glow */}
            <circle cx="150" cy="124" r={glowR} fill={ACCENT} opacity="0.78" />
            <text x="150" y="119" textAnchor="middle" fill={WHITE} fontSize="9" fontFamily="Arial" fontWeight="bold">REWARD</text>
            <text x="150" y="131" textAnchor="middle" fill={WHITE} fontSize="9" fontFamily="Arial" fontWeight="bold">CENTER</text>
            {/* Dopamine dots spreading */}
            {dots.map(i => {
              const angle = (i / 6) * Math.PI * 2;
              const dist = interpolate(frame, [62 + i * 8, 138 + i * 8], [0, 56], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const dotOp = interpolate(frame, [62 + i * 8, 88 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const px = 150 + Math.cos(angle) * dist;
              const py = 124 + Math.sin(angle) * dist;
              return <circle key={i} cx={px} cy={py} r="5" fill={ACCENT} opacity={dotOp} />;
            })}
          </svg>
        </div>

        <div style={{ opacity: label1Op, background: '#ECFDF5', borderRadius: 10, padding: '10px 22px' }}>
          <p style={{ ...headline(18, '#059669') }}>SAME RUSH AS EATING SUGAR</p>
        </div>

        <div style={{ opacity: label2Op, textAlign: 'center' }}>
          <p style={{ ...headline(30, BLACK) }}>YOUR BRAIN CALLS IT</p>
          <p style={{ ...headline(52, ACCENT) }}>"RELIEF"</p>
        </div>

        <div style={{ opacity: bannerOp, background: '#FEF3C7', borderRadius: 10, padding: '10px 22px' }}>
          <p style={{ ...headline(18, '#92400E') }}>THE BILL COMES NEXT MORNING</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const adFlash = interpolate(frame, [96, 120, 142, 166, 188, 210], [0, 1, 0.15, 1, 0.15, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const triggers = [
    { label: 'STRESSED', color: '#EF4444', startFrame: 36 },
    { label: 'SAD', color: '#8B5CF6', startFrame: 62 },
    { label: 'BORED', color: '#3B82F6', startFrame: 88 },
    { label: 'LATE FRIDAY', color: '#F59E0B', startFrame: 114 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 44px' }}>
        <p style={{ ...headline(52, WHITE), transform: `scale(${titleS})` }}>THEY KNOW</p>

        <div style={{ display: 'flex', gap: 18, alignItems: 'center', width: '100%' }}>
          {/* Trigger tags */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {triggers.map((t, i) => {
              const tagS = spring({ frame: frame - t.startFrame, fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
              return (
                <div key={i} style={{ background: t.color, borderRadius: 10, padding: '12px 16px', transform: `scale(${tagS})` }}>
                  <p style={{ ...headline(18, WHITE) }}>{t.label}</p>
                </div>
              );
            })}
          </div>

          {/* Phone showing targeted ad */}
          <svg width="172" height="298" viewBox="0 0 172 298">
            <rect x="4" y="4" width="164" height="290" rx="22" fill="#1C1C1E" stroke="#444" strokeWidth="3" />
            <rect x="14" y="22" width="144" height="252" rx="14" fill="#0F172A" />
            <rect x="64" y="11" width="44" height="10" rx="5" fill="#1C1C1E" />
            <rect x="14" y="22" width="144" height="36" rx="8" fill="#1E293B" />
            <text x="86" y="44" textAnchor="middle" fill={WHITE} fontSize="11" fontFamily="Arial" fontWeight="bold">Your Feed</text>
            {/* Ad popup */}
            <rect x="20" y="66" width="132" height="158" rx="10" fill="#1a1a2e" stroke={ACCENT} strokeWidth={1 + adFlash * 2.5} />
            <rect x="26" y="72" width="120" height="68" rx="6" fill="#23234a" />
            <text x="86" y="100" textAnchor="middle" fill={ACCENT} fontSize="10" fontFamily="Arial" fontWeight="bold">TARGETED FOR YOU</text>
            <text x="86" y="116" textAnchor="middle" fill={WHITE} fontSize="9" fontFamily="Arial">Limited time only</text>
            <rect x="34" y="152" width="104" height="26" rx="7" fill={ACCENT} />
            <text x="86" y="169" textAnchor="middle" fill={WHITE} fontSize="12" fontFamily="Arial" fontWeight="bold">SHOP NOW</text>
            <text x="86" y="206" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="Arial">Based on your activity</text>
          </svg>
        </div>

        <div style={{ opacity: bannerOp, textAlign: 'center' }}>
          <p style={{ ...headline(22, ACCENT) }}>YOUR MOOD IS THEIR AD SIGNAL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const numOp = interpolate(frame, [18, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [88, 178], [0, 75], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxOp = interpolate(frame, [105, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 60px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})` }}>THE MORNING AFTER</p>

        <div style={{ opacity: numOp, textAlign: 'center' }}>
          <p style={{ ...headline(128, ACCENT), lineHeight: 0.88 }}>75%</p>
          <p style={{ ...headline(22, '#6B7280') }}>OF EMOTIONAL BUYS</p>
        </div>

        {/* Regret bar */}
        <div style={{ width: '100%' }}>
          <div style={{ background: '#E5E7EB', borderRadius: 12, height: 42, overflow: 'hidden' }}>
            <div style={{ background: ACCENT, height: '100%', width: `${barW}%`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14 }}>
              <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE, fontWeight: 'bold', letterSpacing: '0.1em' }}>REGRET</span>
            </div>
          </div>
          <p style={{ ...headline(13, '#9CA3AF'), marginTop: 8 }}>REGRETTED WITHIN 24 HOURS</p>
        </div>

        {/* Package with X */}
        <div style={{ opacity: boxOp }}>
          <svg width="148" height="118" viewBox="0 0 148 118">
            {/* Box body */}
            <rect x="18" y="46" width="112" height="68" rx="5" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2.5" />
            {/* Box flaps */}
            <path d="M18 46 L74 28 L130 46" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2.5" />
            <line x1="74" y1="28" x2="74" y2="46" stroke="#9CA3AF" strokeWidth="2" />
            {/* X mark */}
            <line x1="38" y1="64" x2="110" y2="106" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="64" x2="38" y2="106" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ opacity: bannerOp, background: BLACK, borderRadius: 12, padding: '12px 24px' }}>
          <p style={{ ...headline(20, ACCENT) }}>THE DOPAMINE WAS THE POINT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const counterOp = interpolate(frame, [14, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = interpolate(frame, [28, 158], [0, 3200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chartOp = interpolate(frame, [128, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [168, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rows = [
    { label: '10Y', value: 46000 },
    { label: '20Y', value: 146000 },
    { label: '30Y', value: 363000 },
  ];
  const maxVal = 363000;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 50px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>THE REAL COST</p>

        <div style={{ opacity: counterOp, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#9CA3AF') }}>EMOTIONAL SPENDING / YEAR</p>
          <p style={{ ...headline(104, ACCENT), lineHeight: 1 }}>${Math.floor(counterVal).toLocaleString()}</p>
          <p style={{ ...headline(20, WHITE) }}>AVG. AMERICAN</p>
        </div>

        <div style={{ opacity: chartOp, width: '100%' }}>
          <p style={{ ...headline(15, '#9CA3AF') }}>INVESTED INSTEAD — 8% RETURN</p>
          <div style={{ marginTop: 14 }}>
            {rows.map((row, i) => {
              const barW = interpolate(frame, [142 + i * 14, 196 + i * 14], [0, (row.value / maxVal) * 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: FONT, fontSize: 14, color: '#9CA3AF', width: 38, textAlign: 'center', letterSpacing: '0.08em' }}>{row.label}</span>
                  <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 8, height: 34, overflow: 'hidden' }}>
                    <div style={{ background: ACCENT, height: '100%', width: `${barW}%`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
                      <span style={{ fontFamily: FONT, fontSize: 12, color: WHITE, fontWeight: 'bold' }}>${Math.round(row.value / 1000)}K</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ opacity: bannerOp, background: ACCENT, borderRadius: 12, padding: '10px 28px' }}>
          <p style={{ ...headline(22, WHITE) }}>$363K STOLEN BY FEELINGS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const clockOp = interpolate(frame, [14, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const handAngle = interpolate(frame, [14, 142], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule1Op = interpolate(frame, [72, 96], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule2Op = interpolate(frame, [104, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [144, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const handRad = (handAngle * Math.PI) / 180;
  const hx = 130 + 54 * Math.sin(handRad);
  const hy = 130 - 54 * Math.cos(handRad);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>THE 48-HOUR RULE</p>

        <div style={{ opacity: clockOp }}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="116" fill={WHITE} stroke={BLACK} strokeWidth="5" />
            <circle cx="130" cy="130" r="108" fill="none" stroke="#E5E7EB" strokeWidth="2" />
            {/* Hour tick marks */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
              const a = (i / 12) * Math.PI * 2;
              const x1 = 130 + 94 * Math.sin(a);
              const y1 = 130 - 94 * Math.cos(a);
              const x2 = 130 + 106 * Math.sin(a);
              const y2 = 130 - 106 * Math.cos(a);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLACK} strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
            })}
            {/* Sweep hand */}
            <line x1="130" y1="130" x2={hx} y2={hy} stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <circle cx="130" cy="130" r="7" fill={ACCENT} />
            {/* 48h label */}
            <text x="130" y="176" textAnchor="middle" fill={ACCENT} fontSize="18" fontFamily="Arial" fontWeight="bold">48 HOURS</text>
          </svg>
        </div>

        <div style={{ opacity: rule1Op, background: '#FEF3C7', borderRadius: 12, padding: '13px 24px', width: '100%' }}>
          <p style={{ ...headline(20, '#92400E') }}>FEEL THE URGE TO BUY?</p>
          <p style={{ ...headline(14, '#B45309') }}>CLOSE THE APP. WAIT 48 HOURS.</p>
        </div>

        <div style={{ opacity: rule2Op, background: '#ECFDF5', borderRadius: 12, padding: '13px 24px', width: '100%' }}>
          <p style={{ ...headline(20, '#065F46') }}>70% OF URGES DISAPPEAR</p>
          <p style={{ ...headline(14, '#065F46') }}>THAT'S $2,240 BACK IN YOUR POCKET</p>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center' }}>
          <div style={{ background: ACCENT, borderRadius: 14, padding: '14px 32px', marginBottom: 12 }}>
            <p style={{ ...headline(26, WHITE) }}>FOLLOW FOR MORE TRAPS</p>
          </div>
          <p style={{ ...headline(16, '#6B7280') }}>LIKE THIS ONE</p>
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

