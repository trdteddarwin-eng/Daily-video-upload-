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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ── Scene 1: The Hook ─────────────────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const calendarPop = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 12, mass: 0.9 } });
  const counterVal = interpolate(frame, [40, 110], [0, 312], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        {/* Title */}
        <div style={{
          transform: `translateY(${interpolate(titleSlide, [0, 1], [-80, 0])}px)`,
          opacity: titleSlide,
          textAlign: 'center',
        }}>
          <p style={headline(50, ACCENT)}>THE "START MONDAY"</p>
          <p style={headline(50, WHITE)}>TRAP</p>
        </div>

        {/* Calendar SVG */}
        <div style={{ transform: `scale(${calendarPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 260 220" width={290} height={245}>
            <rect x={10} y={30} width={240} height={180} rx={12} fill="#1E1E1E" stroke={ACCENT} strokeWidth={4} />
            <rect x={10} y={30} width={240} height={44} rx={12} fill={ACCENT} />
            <rect x={10} y={56} width={240} height={18} fill={ACCENT} />
            <line x1={70} y1={18} x2={70} y2={46} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={130} y1={18} x2={130} y2={46} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={190} y1={18} x2={190} y2={46} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <text x={130} y={57} textAnchor="middle" fontSize={18} fill={BLACK} fontFamily="Arial" fontWeight="bold">NEXT WEEK</text>
            {[1,2,3,4,5,6,7].map((d, i) => (
              <text key={`r1-${d}`} x={30 + i * 32} y={100} textAnchor="middle" fontSize={14} fill={WHITE} fontFamily="Arial" opacity={0.45}>{d}</text>
            ))}
            {[8,9,10,11,12,13,14].map((d, i) => (
              <text key={`r2-${d}`} x={30 + i * 32} y={135} textAnchor="middle" fontSize={14} fill={WHITE} fontFamily="Arial" opacity={0.45}>{d}</text>
            ))}
            {[15,16,17,18,19,20,21].map((d, i) => (
              <text key={`r3-${d}`} x={30 + i * 32} y={170} textAnchor="middle" fontSize={14} fill={WHITE} fontFamily="Arial" opacity={0.45}>{d}</text>
            ))}
            {[22,23,24,25,26,27,28].map((d, i) => (
              <text key={`r4-${d}`} x={30 + i * 32} y={205} textAnchor="middle" fontSize={14} fill={WHITE} fontFamily="Arial" opacity={0.45}>{d}</text>
            ))}
            <line x1={28} y1={78} x2={232} y2={202} stroke="#EF4444" strokeWidth={8} strokeLinecap="round" />
            <line x1={232} y1={78} x2={28} y2={202} stroke="#EF4444" strokeWidth={8} strokeLinecap="round" />
          </svg>
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, margin: 0, lineHeight: 1 }}>
            {Math.floor(counterVal)}
          </p>
          <p style={headline(28, WHITE)}>BROKEN PROMISES TO START</p>
        </div>

        <p style={{
          fontFamily: FONT, fontSize: 27, color: WHITE,
          textAlign: 'center', lineHeight: 1.5, margin: 0,
          maxWidth: 820, opacity: subOpacity,
        }}>
          Each one has a price tag of about $187,000.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: The Science ──────────────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const nowPop = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, mass: 0.7 } });
  const laterPop = spring({ fps, frame: Math.max(0, frame - 35), config: { damping: 12, mass: 0.8 } });
  const arrowOpacity = interpolate(frame, [45, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 36,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(48, BLACK)}>YOUR BRAIN PICKS</p>
          <p style={headline(48, ACCENT)}>NOW. ALWAYS.</p>
        </div>

        {/* NOW vs LATER bubbles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ transform: `scale(${nowPop})`, transformOrigin: 'center', textAlign: 'center' }}>
            <div style={{
              width: 158, height: 158, borderRadius: '50%',
              background: ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 46, color: BLACK, margin: 0 }}>NOW</p>
            </div>
            <p style={{ ...headline(20, BLACK), marginTop: 10 }}>COMFORT</p>
            <p style={headline(20, BLACK)}>TODAY</p>
          </div>

          <div style={{ opacity: arrowOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg viewBox="0 0 70 50" width={70} height={50}>
              <line x1={62} y1={25} x2={8} y2={25} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
              <polygon points="8,14 8,36 -4,25" fill="#EF4444" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 16, color: '#EF4444', margin: 0, textAlign: 'center' }}>BRAIN PICKS</p>
          </div>

          <div style={{ transform: `scale(${laterPop})`, transformOrigin: 'center', textAlign: 'center' }}>
            <div style={{
              width: 104, height: 104, borderRadius: '50%',
              background: '#CCCCCC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 28, color: '#888', margin: 0 }}>LATER</p>
            </div>
            <p style={{ ...headline(20, '#888'), marginTop: 10 }}>$187K</p>
            <p style={headline(20, '#888')}>RICHER</p>
          </div>
        </div>

        {/* 87% stat */}
        <div style={{ opacity: statOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 96, color: ACCENT, margin: 0, lineHeight: 1 }}>87%</p>
          <p style={headline(26, BLACK)}>OF NON-SAVERS SAY THEY'LL</p>
          <p style={headline(26, BLACK)}>"START SOON"</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: The $187K Math ───────────────────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const chartProgress = interpolate(frame, [18, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [88, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pts25: [number, number][] = [
    [0, 112], [28, 100], [56, 86], [84, 68], [112, 48], [140, 26], [168, 6],
  ];
  const pts28: [number, number][] = [
    [0, 112], [28, 108], [56, 100], [84, 88], [112, 74], [140, 58], [168, 42],
  ];

  const vc25 = Math.max(2, Math.round(chartProgress * pts25.length));
  const vc28 = Math.max(2, Math.round(chartProgress * pts28.length));
  const line25 = pts25.slice(0, vc25).map(([x, y]) => `${x},${y}`).join(' ');
  const line28 = pts28.slice(0, vc28).map(([x, y]) => `${x},${y}`).join(' ');
  const area25 = `${line25} ${pts25[vc25 - 1][0]},125 0,125`;
  const area28 = `${line28} ${pts28[vc28 - 1][0]},125 0,125`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 28,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>3 YEARS LATE =</p>
          <p style={headline(46, ACCENT)}>$187,000 GONE</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: 0, opacity: 0.65 }}>
          $400/mo at 7% return to age 65
        </p>

        {/* Dual chart */}
        <svg viewBox="0 0 185 130" width={680} height={478}>
          <line x1={0} y1={42} x2={182} y2={42} stroke={WHITE} strokeWidth={0.5} opacity={0.15} />
          <line x1={0} y1={84} x2={182} y2={84} stroke={WHITE} strokeWidth={0.5} opacity={0.15} />
          <polygon points={area28} fill={WHITE} opacity={0.05} />
          <polyline points={line28} fill="none" stroke={WHITE} strokeWidth={3}
            strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
          <polygon points={area25} fill={ACCENT} opacity={0.14} />
          <polyline points={line25} fill="none" stroke={ACCENT} strokeWidth={4}
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={176} y={10} textAnchor="end" fontSize={13} fill={ACCENT} fontFamily="Arial" fontWeight="bold">AGE 25 ▲</text>
          <text x={176} y={44} textAnchor="end" fontSize={12} fill={WHITE} fontFamily="Arial" opacity={0.7}>AGE 28</text>
        </svg>

        {/* Badge */}
        <div style={{ opacity: badgeOpacity, background: '#1E1E1E', borderRadius: 14, padding: '16px 44px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: '#EF4444', margin: 0, lineHeight: 1 }}>−$187,000</p>
          <p style={headline(24, WHITE)}>THE DELAY PENALTY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: The Per-Year Burn ────────────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const piggyPop = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 12, mass: 0.9 } });
  const statOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarCount = interpolate(frame, [45, 108], [0, 58000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 28,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(48, BLACK)}>EVERY YEAR YOU WAIT</p>
          <p style={headline(48, ACCENT)}>COSTS YOU...</p>
        </div>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 240 200" width={250} height={208}>
            <ellipse cx={115} cy={120} rx={88} ry={70} fill="#FFD700" stroke={BLACK} strokeWidth={4} />
            <ellipse cx={184} cy={94} rx={38} ry={34} fill="#FFD700" stroke={BLACK} strokeWidth={4} />
            <ellipse cx={208} cy={102} rx={17} ry={13} fill="#FFA500" stroke={BLACK} strokeWidth={3} />
            <circle cx={203} cy={102} r={4} fill={BLACK} />
            <circle cx={213} cy={102} r={4} fill={BLACK} />
            <circle cx={188} cy={84} r={5} fill={BLACK} />
            <ellipse cx={174} cy={63} rx={13} ry={17} fill="#FFA500" stroke={BLACK} strokeWidth={3} />
            <rect x={58} y={178} width={22} height={20} rx={6} fill="#FFD700" stroke={BLACK} strokeWidth={3} />
            <rect x={90} y={180} width={22} height={18} rx={6} fill="#FFD700" stroke={BLACK} strokeWidth={3} />
            <rect x={122} y={180} width={22} height={18} rx={6} fill="#FFD700" stroke={BLACK} strokeWidth={3} />
            <rect x={154} y={178} width={22} height={20} rx={6} fill="#FFD700" stroke={BLACK} strokeWidth={3} />
            <rect x={92} y={50} width={30} height={8} rx={4} fill={BLACK} />
            <path d="M30,115 C12,100 12,130 26,124" fill="none" stroke={BLACK} strokeWidth={4} strokeLinecap="round" />
            <line x1={78} y1={98} x2={98} y2={118} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
            <line x1={98} y1={98} x2={78} y2={118} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
          </svg>
        </div>

        {/* Dollar counter */}
        <div style={{ opacity: statOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 100, color: '#EF4444', margin: 0, lineHeight: 1 }}>
            ${Math.floor(dollarCount / 1000)}K
          </p>
          <p style={headline(28, BLACK)}>FUTURE WEALTH BURNED</p>
        </div>

        <div style={{ opacity: badgeOpacity, background: ACCENT, borderRadius: 14, padding: '14px 44px', textAlign: 'center' }}>
          <p style={headline(26, BLACK)}>PER YEAR OF DELAY</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0', opacity: 0.8 }}>at 7% annual return to age 65</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: The Stats ────────────────────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const gridProgress = interpolate(frame, [20, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badge2Opacity = interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const visibleCount = Math.max(0, Math.floor(gridProgress * 10));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 32,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>OUT OF EVERY</p>
          <p style={headline(50, ACCENT)}>10 NON-SAVERS</p>
        </div>

        {/* 10 person silhouettes */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ opacity: i < visibleCount ? 1 : 0 }}>
              <svg viewBox="0 0 50 68" width={62} height={84}>
                <circle cx={25} cy={15} r={13} fill={i < 7 ? ACCENT : '#3A3A3A'} />
                <rect x={6} y={31} width={38} height={37} rx={9} fill={i < 7 ? ACCENT : '#3A3A3A'} />
              </svg>
            </div>
          ))}
        </div>

        {/* 7 IN 10 */}
        <div style={{ opacity: statOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 106, color: ACCENT, margin: 0, lineHeight: 1 }}>7 IN 10</p>
          <p style={headline(26, WHITE)}>SAY THEY'LL "START SOON"</p>
        </div>

        {/* 3.2 years */}
        <div style={{ opacity: badge2Opacity, background: '#1E1E1E', borderRadius: 14, padding: '14px 44px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: '#EF4444', margin: 0, lineHeight: 1 }}>3.2 YRS</p>
          <p style={headline(22, WHITE)}>AVERAGE ACTUAL DELAY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: The Fix + CTA ────────────────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({ fps, frame, config: { damping: 12, mass: 0.9 } });
  const calPop = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 14, mass: 0.8 } });
  const fixOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarPop = spring({ fps, frame: Math.max(0, frame - 58), config: { damping: 10, mass: 0.7 } });
  const ctaOpacity = interpolate(frame, [95, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '70px 60px', gap: 26,
      }}>
        <div style={{ transform: `scale(${titlePop})`, transformOrigin: 'center', textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>THE FIX ISN'T</p>
          <p style={headline(46, BLACK)}>WILLPOWER</p>
        </div>

        {/* Calendar with today circled */}
        <div style={{ transform: `scale(${calPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 260 218" width={268} height={225}>
            <rect x={10} y={28} width={240} height={180} rx={12} fill={WHITE} stroke={BLACK} strokeWidth={4} />
            <rect x={10} y={28} width={240} height={44} rx={12} fill={BLACK} />
            <rect x={10} y={54} width={240} height={18} fill={BLACK} />
            <line x1={70} y1={16} x2={70} y2={44} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
            <line x1={130} y1={16} x2={130} y2={44} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
            <line x1={190} y1={16} x2={190} y2={44} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
            <text x={130} y={54} textAnchor="middle" fontSize={17} fill={WHITE} fontFamily="Arial" fontWeight="bold">MAY 2026</text>
            {[1,2,3,4,5,6,7].map((d, i) => (
              <text key={`s6r1-${d}`} x={30 + i * 32} y={96} textAnchor="middle" fontSize={13} fill="#555" fontFamily="Arial">{d}</text>
            ))}
            {[8,9,10,11,12,13,14].map((d, i) => (
              <text key={`s6r2-${d}`} x={30 + i * 32} y={128} textAnchor="middle" fontSize={13} fill={i === 5 ? BLACK : '#555'} fontFamily="Arial" fontWeight={i === 5 ? 'bold' : 'normal'}>{d}</text>
            ))}
            {[15,16,17,18,19,20,21].map((d, i) => (
              <text key={`s6r3-${d}`} x={30 + i * 32} y={160} textAnchor="middle" fontSize={13} fill="#555" fontFamily="Arial">{d}</text>
            ))}
            {[22,23,24,25,26,27,28].map((d, i) => (
              <text key={`s6r4-${d}`} x={30 + i * 32} y={192} textAnchor="middle" fontSize={13} fill="#555" fontFamily="Arial">{d}</text>
            ))}
            {/* TODAY = 13, index 5 in row 2, x = 30 + 5*32 = 190 */}
            <circle cx={190} cy={122} r={18} fill={ACCENT} opacity={0.92} />
            <text x={190} y={129} textAnchor="middle" fontSize={15} fill={BLACK} fontFamily="Arial" fontWeight="bold">13</text>
          </svg>
        </div>

        {/* The fix box */}
        <div style={{ opacity: fixOpacity, background: ACCENT, borderRadius: 14, padding: '18px 44px', textAlign: 'center', maxWidth: 820 }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: 0, lineHeight: 1.3 }}>
            AUTOMATE $1/DAY
          </p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '8px 0 0', opacity: 0.82 }}>
            Not Monday. Not next month. Today.
          </p>
        </div>

        {/* Dollar circle */}
        <div style={{ transform: `scale(${dollarPop})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 80 80" width={80} height={80}>
            <circle cx={40} cy={40} r={38} fill="#10B981" />
            <text x={40} y={54} textAnchor="middle" fontSize={46} fill={WHITE} fontFamily="Arial" fontWeight="bold">$</text>
          </svg>
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaOpacity, background: BLACK, borderRadius: 14, padding: '18px 52px', textAlign: 'center' }}>
          <p style={headline(32, ACCENT)}>FOLLOW FOR MORE</p>
          <p style={headline(32, ACCENT)}>MONEY PSYCHOLOGY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ───────────────────────────────────────────────────────────────

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
