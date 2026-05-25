import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

  const formSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const formY = interpolate(formSpring, [0, 1], [600, 0]);
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [70, 200], [0, 342000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <div style={{ transform: `translateY(${formY}px)` }}>
          <svg width={440} height={320} viewBox="0 0 440 320">
            <rect x={8} y={8} width={424} height={304} rx={18} fill={WHITE} />
            <rect x={8} y={8} width={424} height={56} rx={18} fill="#e0e0e0" />
            <rect x={8} y={44} width={424} height={20} fill="#e0e0e0" />
            <text x={220} y={44} textAnchor="middle" fill={BLACK} fontSize={17} fontFamily="Arial Black">401(k) ENROLLMENT FORM</text>
            <text x={30} y={94} fill="#888" fontSize={13} fontFamily="Arial">Employee Name: ________________________</text>
            <text x={30} y={132} fill="#888" fontSize={13} fontFamily="Arial">Department: ___________________________</text>
            <text x={30} y={172} fill={BLACK} fontSize={16} fontFamily="Arial Black">Contribution Rate:</text>
            <rect x={228} y={152} width={96} height={36} rx={10} fill={ACCENT} />
            <text x={276} y={178} textAnchor="middle" fill={BLACK} fontSize={24} fontFamily="Arial Black">3%</text>
            <text x={330} y={172} fill="#bbb" fontSize={11} fontFamily="Arial">← DEFAULT</text>
            <text x={30} y={216} fill="#aaa" fontSize={11} fontFamily="Arial">* Default enrollment rate set by employer</text>
            <text x={30} y={234} fill="#aaa" fontSize={11} fontFamily="Arial">  Employees may update contribution at any time</text>
            <rect x={278} y={264} width={138} height={38} rx={8} fill="none" stroke="#ccc" strokeWidth={2} />
            <text x={347} y={288} textAnchor="middle" fill="#bbb" fontSize={13} fontFamily="Arial Black">PROCESSED</text>
          </svg>
        </div>

        <div style={{ opacity: subtitleOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(32, ACCENT) }}>THE DEFAULT TRAP</p>
        </div>

        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.5)'), marginBottom: 8 }}>THIS SETTING COSTS YOU</p>
          <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${counterVal.toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pieScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const legendOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>
        <p style={{ ...headline(38, BLACK) }}>OF ENROLLED WORKERS</p>

        <div style={{ transform: `scale(${pieScale})` }}>
          <svg width={380} height={360} viewBox="0 0 380 360">
            {/* Green slice: 32% — changed their rate. Start at end of amber arc (54,244) clockwise to top (190,30). largeArc=0 */}
            <path d="M 190 180 L 54 244 A 150 150 0 0 1 190 30 Z" fill={GREEN} />
            {/* Amber slice: 68% — never changed. Start at top (190,30) clockwise 244.8deg to (54,244). largeArc=1 */}
            <path d="M 190 180 L 190 30 A 150 150 0 1 1 54 244 Z" fill={ACCENT} />
            {/* Donut hole */}
            <circle cx={190} cy={180} r={62} fill={BG_LIGHT} />
            {/* Amber label centroid at ~32.4deg from top, r=100 → (274,234) */}
            <text x={274} y={234} textAnchor="middle" fill={BLACK} fontSize={28} fontFamily="Arial Black">68%</text>
            {/* Green label centroid at ~212.4deg, r=100 → (106,126) */}
            <text x={106} y={126} textAnchor="middle" fill={WHITE} fontSize={22} fontFamily="Arial Black">32%</text>
          </svg>
        </div>

        <div style={{ opacity: legendOpacity, display: 'flex', gap: 32, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: ACCENT }} />
            <span style={{ fontFamily: FONT, fontSize: 20, color: BLACK }}>NEVER CHANGED</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: GREEN }} />
            <span style={{ fontFamily: FONT, fontSize: 20, color: BLACK }}>CHANGED IT</span>
          </div>
        </div>

        <div style={{ opacity: statOpacity, background: ACCENT, borderRadius: 14, padding: '14px 40px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK) }}>68% STUCK AT 3% FOREVER</p>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: 0, lineHeight: 1.45 }}>
            They trusted HR picked the right number. <span style={{ color: 'rgba(0,0,0,0.4)' }}>HR did not.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const col1Spring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const col2Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 100 } });
  const gapOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [148, 173], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 50px' }}>
        <p style={{ ...headline(34, WHITE) }}>ON A $55K SALARY</p>

        <div style={{ display: 'flex', gap: 24, width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${col1Spring})`, flex: 1, background: '#1f1f1f', borderRadius: 18, padding: '28px 20px', textAlign: 'center', border: `2px solid ${ACCENT}` }}>
            <p style={{ ...headline(20, ACCENT), marginBottom: 8 }}>3% DEFAULT</p>
            <p style={{ fontFamily: FONT, fontSize: 58, color: ACCENT, margin: 0, lineHeight: 1 }}>$138</p>
            <p style={{ ...headline(16, 'rgba(255,255,255,0.5)'), marginTop: 10 }}>PER MONTH</p>
          </div>
          <div style={{ transform: `scale(${col2Spring})`, flex: 1, background: '#0d2818', borderRadius: 18, padding: '28px 20px', textAlign: 'center', border: `2px solid ${GREEN}` }}>
            <p style={{ ...headline(20, GREEN), marginBottom: 8 }}>15% GOAL</p>
            <p style={{ fontFamily: FONT, fontSize: 58, color: GREEN, margin: 0, lineHeight: 1 }}>$687</p>
            <p style={{ ...headline(16, 'rgba(255,255,255,0.5)'), marginTop: 10 }}>PER MONTH</p>
          </div>
        </div>

        <div style={{ opacity: gapOpacity, background: RED, borderRadius: 14, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(24, WHITE) }}>$549 / MONTH GAP</p>
          <p style={{ ...headline(18, WHITE), marginTop: 6 }}>THAT'S YOUR MISSING RETIREMENT</p>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
            The math is brutal — and it compounds every year.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const chartProgress = interpolate(frame, [15, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calloutOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: '3% RATE', value: 170000, color: ACCENT },
    { label: '15% RATE', value: 512000, color: GREEN },
  ];
  const maxVal = 512000;
  const maxBarH = 300;
  const barW = 165;
  const originX = 85;
  const originY = 380;
  const colGap = 205;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 40px' }}>
        <p style={{ ...headline(34, BLACK) }}>30 YEARS AT 7% RETURNS</p>

        <svg width={660} height={440} viewBox="0 0 660 440">
          <line x1={originX} y1={30} x2={originX} y2={originY} stroke="#ccc" strokeWidth={2} />
          <line x1={originX} y1={originY} x2={620} y2={originY} stroke="#ccc" strokeWidth={2} />

          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <g key={i}>
              <line x1={originX - 6} y1={originY - pct * maxBarH} x2={originX} y2={originY - pct * maxBarH} stroke="#ccc" strokeWidth={1.5} />
              <text x={originX - 10} y={originY - pct * maxBarH + 5} textAnchor="end" fill="#999" fontSize={15} fontFamily="Arial">
                ${(pct * 512).toFixed(0)}K
              </text>
            </g>
          ))}

          {bars.map((bar, i) => {
            const x = originX + 55 + i * (barW + colGap);
            const barH = Math.max(0, (bar.value / maxVal) * maxBarH * chartProgress);
            const labelY = Math.max(28, originY - barH - 14);
            return (
              <g key={i}>
                <rect x={x} y={originY - barH} width={barW} height={barH} fill={bar.color} rx={10} />
                <text x={x + barW / 2} y={originY + 26} textAnchor="middle" fill="#888" fontSize={16} fontFamily="Arial Black">{bar.label}</text>
                {chartProgress > 0.15 && (
                  <text x={x + barW / 2} y={labelY} textAnchor="middle" fill={bar.color} fontSize={18} fontFamily="Arial Black">
                    ${(bar.value / 1000).toFixed(0)}K
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ opacity: calloutOpacity, background: BLACK, borderRadius: 16, padding: '16px 48px', textAlign: 'center' }}>
          <p style={{ ...headline(26, GREEN), marginBottom: 4 }}>$342,000 DIFFERENCE</p>
          <p style={{ ...headline(18, 'rgba(255,255,255,0.6)') }}>FROM ONE UNCHANGED NUMBER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const deskScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const stampOpacity = interpolate(frame, [50, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [108, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [148, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 60px' }}>
        <p style={{ ...headline(34, WHITE) }}>WHY 3%?</p>

        <div style={{ transform: `scale(${deskScale})` }}>
          <svg width={420} height={320} viewBox="0 0 420 320">
            {/* Desk surface */}
            <rect x={20} y={230} width={380} height={22} rx={4} fill="#5a3e2b" />
            <rect x={42} y={250} width={28} height={60} rx={4} fill="#7a5a3b" />
            <rect x={350} y={250} width={28} height={60} rx={4} fill="#7a5a3b" />
            {/* Person - head */}
            <circle cx={210} cy={118} r={34} fill="#f4c89a" />
            {/* Hair */}
            <ellipse cx={210} cy={94} rx={34} ry={18} fill="#5a3a1a" />
            {/* Body */}
            <rect x={172} y={150} width={76} height={82} rx={12} fill="#2a3a6a" />
            {/* Arms resting on desk */}
            <rect x={108} y={190} width={66} height={20} rx={10} fill="#2a3a6a" />
            <rect x={246} y={190} width={66} height={20} rx={10} fill="#2a3a6a" />
            {/* Document on desk */}
            <rect x={110} y={196} width={200} height={42} rx={6} fill={WHITE} />
            <text x={210} y={212} textAnchor="middle" fill="#666" fontSize={10} fontFamily="Arial">CONTRIBUTION RATE:  3%</text>
            <text x={210} y={228} textAnchor="middle" fill="#aaa" fontSize={9} fontFamily="Arial">DEFAULT • MIN LEGAL REQUIREMENT</text>
            {/* Stamp approval */}
            <g opacity={stampOpacity}>
              <rect x={136} y={198} width={148} height={36} rx={4} fill="none" stroke={ACCENT} strokeWidth={3} />
              <text x={210} y={221} textAnchor="middle" fill={ACCENT} fontSize={15} fontFamily="Arial Black">APPROVED</text>
            </g>
          </svg>
        </div>

        <div style={{ opacity: badgeOpacity, background: '#1a1a1a', borderRadius: 14, padding: '18px 44px', textAlign: 'center', border: `2px solid ${ACCENT}` }}>
          <p style={{ ...headline(26, ACCENT), marginBottom: 6 }}>MINIMUM = LOW PAPERWORK</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: 'rgba(255,255,255,0.6)', textAlign: 'center', margin: 0 }}>
            Not designed for your retirement
          </p>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 27, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
            Status quo bias does the rest — <span style={{ color: ACCENT }}>you never change it.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [500, 0]);
  const rateProgress = interpolate(frame, [35, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayRate = Math.round(3 + rateProgress * 7);
  const barWidth = interpolate(rateProgress, [0, 1], [44, 148]);
  const badgeOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 56px' }}>
        <p style={{ ...headline(36, BLACK) }}>FIX IT IN 2 MINUTES</p>

        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width={248} height={390} viewBox="0 0 248 390">
            <rect x={4} y={4} width={240} height={382} rx={28} fill="#1a1a1a" stroke={GREEN} strokeWidth={3} />
            <rect x={14} y={14} width={220} height={362} rx={22} fill="#0d0d0d" />
            {/* App header */}
            <rect x={22} y={30} width={204} height={32} rx={8} fill="#1f1f1f" />
            <text x={124} y={52} textAnchor="middle" fill={WHITE} fontSize={13} fontFamily="Arial Black">MY 401(k)</text>
            {/* Balance */}
            <text x={124} y={96} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily="Arial">CURRENT BALANCE</text>
            <text x={124} y={122} textAnchor="middle" fill={GREEN} fontSize={28} fontFamily="Arial Black">$24,815</text>
            <line x1={24} y1={140} x2={224} y2={140} stroke="#2a2a2a" strokeWidth={1} />
            {/* Contribution rate */}
            <text x={30} y={168} fill="rgba(255,255,255,0.6)" fontSize={11} fontFamily="Arial">CONTRIBUTION RATE</text>
            <rect x={158} y={152} width={60} height={26} rx={8} fill={GREEN} />
            <text x={188} y={170} textAnchor="middle" fill={BLACK} fontSize={16} fontFamily="Arial Black">{displayRate}%</text>
            {/* Progress bar */}
            <rect x={30} y={186} width={188} height={10} rx={5} fill="#2a2a2a" />
            <rect x={30} y={186} width={barWidth} height={10} rx={5} fill={GREEN} />
            <line x1={24} y1={208} x2={224} y2={208} stroke="#2a2a2a" strokeWidth={1} />
            {/* Projections */}
            <text x={30} y={232} fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="Arial">PROJECTED AT RETIREMENT</text>
            <text x={30} y={256} fill={WHITE} fontSize={13} fontFamily="Arial Black">10-YR:</text>
            <text x={218} y={256} textAnchor="end" fill={GREEN} fontSize={13} fontFamily="Arial Black">$182K</text>
            <text x={30} y={278} fill={WHITE} fontSize={13} fontFamily="Arial Black">20-YR:</text>
            <text x={218} y={278} textAnchor="end" fill={GREEN} fontSize={13} fontFamily="Arial Black">$356K</text>
            <text x={30} y={300} fill={WHITE} fontSize={13} fontFamily="Arial Black">30-YR:</text>
            <text x={218} y={300} textAnchor="end" fill={GREEN} fontSize={13} fontFamily="Arial Black">$512K</text>
            {/* Save button */}
            <rect x={30} y={322} width={188} height={38} rx={19} fill={GREEN} />
            <text x={124} y={347} textAnchor="middle" fill={BLACK} fontSize={14} fontFamily="Arial Black">SAVE CHANGES</text>
          </svg>
        </div>

        <div style={{ opacity: badgeOpacity, background: GREEN, borderRadius: 16, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(22, BLACK), marginBottom: 4 }}>$200,000 BACK IN YOUR FUTURE</p>
          <p style={{ ...headline(17, BLACK) }}>JUST FROM CHANGING ONE NUMBER</p>
        </div>

        <div style={{ opacity: ctaOpacity, background: BLACK, borderRadius: 16, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(22, WHITE), marginBottom: 8 }}>FOLLOW FOR DAILY MONEY MOVES</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, textAlign: 'center', margin: 0 }}>
            One default setting. Six figures compounded.
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



