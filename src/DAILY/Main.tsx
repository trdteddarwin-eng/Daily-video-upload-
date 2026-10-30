import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const RED = '#EF4444';
const GREEN = '#10B981';
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

  const totalStartSeconds = 587;
  const elapsed = Math.floor(frame / 2);
  const remainingSeconds = Math.max(0, totalStartSeconds - elapsed);
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timerStr = `${mins}:${String(secs).padStart(2, '0')}`;

  const titleY = interpolate(frame, [0, 20], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timerScale = spring({ frame, fps: 30, config: { damping: 12, stiffness: 80 } });
  const pulseOpacity = interpolate(
    frame,
    [0, 15, 30, 45, 60, 75, 90, 225],
    [1, 0.3, 1, 0.3, 1, 0.3, 1, 1],
    { extrapolateRight: 'clamp' }
  );
  const warningY = interpolate(frame, [30, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomY = interpolate(frame, [60, 90], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${titleY}px)` }}>
        <div style={{ ...headline(32, '#888'), letterSpacing: '0.3em' }}>RETAILERS WON'T TELL YOU</div>
      </div>

      <div style={{ position: 'absolute', top: 290, left: 70, right: 70, background: '#1E1E1E', borderRadius: 20, padding: '36px 28px', border: `2px solid ${ACCENT}` }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 28 }}>
          <div style={{ width: 96, height: 96, background: '#2A2A2A', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={60} height={60} viewBox="0 0 60 60">
              <rect x={5} y={20} width={50} height={34} rx={4} fill="#3A3A3A" stroke={ACCENT} strokeWidth={2} />
              <rect x={5} y={14} width={50} height={12} rx={4} fill={ACCENT} opacity={0.85} />
              <line x1={30} y1={20} x2={30} y2={54} stroke="#555" strokeWidth={1} />
              <rect x={10} y={28} width={14} height={8} rx={2} fill="#555" />
              <rect x={10} y={40} width={22} height={6} rx={2} fill="#555" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 20, color: WHITE, marginBottom: 6 }}>WIRELESS HEADPHONES</div>
            <div style={{ fontFamily: FONT, fontSize: 30, color: ACCENT }}>$89.99</div>
            <div style={{ fontFamily: FONT, fontSize: 17, color: '#777', textDecoration: 'line-through' }}>$199.99</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontFamily: FONT, fontSize: 17, color: RED, marginBottom: 6, letterSpacing: '0.08em' }}>⚡ DEAL ENDS IN</div>
          <div style={{ fontFamily: FONT, fontSize: 70, color: RED, transform: `scale(${timerScale})`, lineHeight: 1 }}>{timerStr}</div>
        </div>

        <div style={{ background: RED, borderRadius: 10, padding: '10px 18px', textAlign: 'center', opacity: pulseOpacity, transform: `translateY(${warningY}px)` }}>
          <div style={{ fontFamily: FONT, fontSize: 24, color: WHITE, letterSpacing: '0.08em' }}>⚠ ONLY 2 LEFT IN STOCK</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 150, left: 60, right: 60, textAlign: 'center', transform: `translateY(${bottomY}px)` }}>
        <div style={{ fontFamily: FONT, fontSize: 32, color: WHITE, lineHeight: 1.3 }}>73% OF THESE TIMERS</div>
        <div style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, lineHeight: 1.3 }}>ARE COMPLETELY FAKE</div>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const brainScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const amygdalaGlow = interpolate(frame, [30, 60, 90, 120, 150], [0, 1, 0.5, 1, 0.8], { extrapolateRight: 'clamp' });
  const msCounter = interpolate(frame, [40, 110], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  });
  const textY = interpolate(frame, [70, 100], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [100, 130], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const panicAngles = [0, 60, 120, 180, 240, 300];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center' }}>
        <div style={{ ...headline(40, BLACK) }}>THE SCIENCE</div>
        <div style={{ ...headline(28, '#777'), marginTop: 8 }}>OF FAKE URGENCY</div>
      </div>

      <div style={{ position: 'absolute', top: 290, left: '50%', transform: `translateX(-50%) scale(${brainScale})` }}>
        <svg width={300} height={270} viewBox="0 0 300 270">
          <ellipse cx={125} cy={122} rx={92} ry={102} fill="#E8E0F0" stroke="#9CA3AF" strokeWidth={2} />
          <ellipse cx={182} cy={120} rx={76} ry={96} fill="#EDE9F7" stroke="#9CA3AF" strokeWidth={2} />
          <rect x={128} y={214} width={28} height={42} rx={10} fill="#D1C4E9" />
          <ellipse cx={132} cy={153} rx={30} ry={21} fill={RED} opacity={amygdalaGlow} />
          <ellipse cx={168} cy={151} rx={23} ry={18} fill={RED} opacity={amygdalaGlow * 0.8} />
          <path d="M82,82 Q96,67 112,82" fill="none" stroke="#9CA3AF" strokeWidth={2} />
          <path d="M88,112 Q110,97 132,110" fill="none" stroke="#9CA3AF" strokeWidth={2} />
          <path d="M72,144 Q92,128 118,138" fill="none" stroke="#9CA3AF" strokeWidth={2} />
          <path d="M152,88 Q167,74 183,88" fill="none" stroke="#9CA3AF" strokeWidth={2} />
          <path d="M160,118 Q174,104 190,116" fill="none" stroke="#9CA3AF" strokeWidth={2} />
          <line x1={150} y1={162} x2={228} y2={206} stroke={RED} strokeWidth={1.5} strokeDasharray="4" />
          <text x={230} y={210} fontFamily="Arial" fontSize={13} fill={RED}>AMYGDALA</text>
          <text x={218} y={226} fontFamily="Arial" fontSize={12} fill={RED}>(FEAR CENTER)</text>
          {panicAngles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 148 + Math.cos(rad) * 32;
            const y1 = 152 + Math.sin(rad) * 32;
            const x2 = 148 + Math.cos(rad) * 56;
            const y2 = 152 + Math.sin(rad) * 56;
            const lineOpacity = interpolate(frame, [20 + i * 5, 45 + i * 5], [0, amygdalaGlow], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={RED} strokeWidth={2} opacity={lineOpacity} />;
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 300, width: '100%', textAlign: 'center', transform: `translateY(${textY}px)` }}>
        <div style={{ fontFamily: FONT, fontSize: 25, color: '#555' }}>FEAR TRIGGERS IN JUST</div>
        <div style={{ fontFamily: FONT, fontSize: 86, color: RED, lineHeight: 1 }}>{Math.round(msCounter)}ms</div>
      </div>

      <div style={{ position: 'absolute', bottom: 140, left: 50, right: 50, textAlign: 'center', transform: `translateY(${subY}px)`, opacity: subOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 28, color: BLACK, lineHeight: 1.4 }}>
          RATIONAL BRAIN:
        </div>
        <div style={{ fontFamily: FONT, fontSize: 28, color: RED, lineHeight: 1.4 }}>
          COMPLETELY BYPASSED
        </div>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const boltScale = spring({ frame, fps: 30, config: { damping: 10, stiffness: 80 } });
  const counterVal = interpolate(frame, [40, 190], [0, 12], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const dealOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subLabel = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dealItems = [
    { label: 'FLASH DEAL', time: '04:12' },
    { label: 'LIGHTNING', time: '02:38' },
    { label: 'LIMITED', time: '08:55' },
    { label: 'FLASH DEAL', time: '01:09' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center' }}>
        <div style={{ ...headline(38, WHITE) }}>THE SCALE</div>
        <div style={{ ...headline(26, '#777'), marginTop: 8 }}>OF THE TRAP</div>
      </div>

      <div style={{ position: 'absolute', top: 260, left: '50%', transform: `translateX(-50%) scale(${boltScale})` }}>
        <svg width={110} height={150} viewBox="0 0 110 150">
          <polygon points="66,8 28,74 56,74 44,142 82,64 54,64" fill={ACCENT} />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 430, width: '100%', textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 34, color: '#777' }}>AMAZON GENERATES</div>
        <div style={{ fontFamily: FONT, fontSize: 100, color: ACCENT, lineHeight: 1 }}>${counterVal.toFixed(1)}B</div>
        <div style={{ fontFamily: FONT, fontSize: 34, color: WHITE, lineHeight: 1 }}>FROM FAKE URGENCY</div>
        <div style={{ fontFamily: FONT, fontSize: 24, color: '#555', marginTop: 6 }}>ANNUALLY</div>
      </div>

      <div style={{ position: 'absolute', bottom: 160, left: 40, right: 40, opacity: dealOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 19, color: '#555', textAlign: 'center', marginBottom: 14 }}>
          200,000 DEALS/YEAR — EVERY ONE HAS A CLOCK
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {dealItems.map((d, i) => {
            const itemOpacity = interpolate(frame, [65 + i * 14, 85 + i * 14], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div key={i} style={{ background: '#1E1E1E', borderRadius: 10, padding: '10px 14px', border: `1px solid ${RED}`, opacity: itemOpacity }}>
                <div style={{ fontFamily: FONT, fontSize: 13, color: RED }}>{d.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 20, color: RED }}>{d.time}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 90, width: '100%', textAlign: 'center', opacity: subLabel }}>
        <div style={{ fontFamily: FONT, fontSize: 22, color: '#444' }}>AND YOU FEEL EVERY SECOND</div>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const walletScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const barGrow = interpolate(frame, [40, 170], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  });
  const moneyVal = interpolate(frame, [40, 170], [0, 2800], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  });
  const pctVal = interpolate(frame, [70, 160], [0, 23], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const pctOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const arrowFrames = [0, 1, 2];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center' }}>
        <div style={{ ...headline(38, BLACK) }}>WHAT IT COSTS</div>
        <div style={{ ...headline(28, '#777'), marginTop: 8 }}>EVERY SINGLE YEAR</div>
      </div>

      <div style={{ position: 'absolute', top: 280, left: '50%', transform: `translateX(-50%) scale(${walletScale})` }}>
        <svg width={190} height={148} viewBox="0 0 190 148">
          <rect x={10} y={32} width={165} height={106} rx={14} fill="#374151" stroke={BLACK} strokeWidth={2} />
          <rect x={10} y={22} width={165} height={42} rx={12} fill="#4B5563" />
          <rect x={115} y={58} width={54} height={54} rx={10} fill="#1F2937" />
          <circle cx={142} cy={85} r={20} fill={ACCENT} opacity={0.9} />
          <text x={135} y={91} fontFamily="Arial Black" fontSize={18} fill={BLACK}>$</text>
          <rect x={20} y={68} width={78} height={13} rx={4} fill="#6B7280" />
          <rect x={20} y={86} width={78} height={13} rx={4} fill="#9CA3AF" />
          {arrowFrames.map((i) => {
            const arrowOpacity = interpolate(frame, [20 + i * 20, 50 + i * 20], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const arrowMove = interpolate(frame, [20 + i * 20, 80 + i * 20], [0, 32], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <text key={i} x={148 + arrowMove} y={92} fontFamily="Arial" fontSize={24} fill={RED} opacity={arrowOpacity}>→</text>
            );
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 530, left: 80, right: 80 }}>
        <div style={{ position: 'relative', height: 168, background: '#E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${barGrow * 100}%`,
            background: `linear-gradient(180deg, ${RED} 0%, #991B1B 100%)`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 18,
          }}>
            {barGrow > 0.15 && (
              <div style={{ fontFamily: FONT, fontSize: 46, color: WHITE }}>${Math.round(moneyVal).toLocaleString()}</div>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ fontFamily: FONT, fontSize: 22, color: BLACK }}>UNPLANNED ANNUAL SPEND</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 110, width: '100%', textAlign: 'center', opacity: pctOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 56, color: RED }}>{Math.round(pctVal)}%</div>
        <div style={{ fontFamily: FONT, fontSize: 22, color: '#555' }}>MORE IMPULSE BUYS WHEN URGENCY HITS</div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const xScale = spring({ frame: Math.max(0, frame - 30), fps: 30, config: { damping: 10, stiffness: 200 } });
  const calScale = spring({ frame: Math.max(0, frame - 55), fps: 30, config: { damping: 14, stiffness: 110 } });
  const ruleOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 130), fps: 30, config: { damping: 12, stiffness: 150 } });
  const ruleY = interpolate(frame, [90, 120], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 130, width: '100%', textAlign: 'center' }}>
        <div style={{ ...headline(40, WHITE) }}>THE FIX</div>
        <div style={{ ...headline(26, ACCENT), marginTop: 8 }}>ONE RULE BEATS IT ALL</div>
      </div>

      <div style={{ position: 'absolute', top: 280, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ background: '#1E1E1E', borderRadius: 16, padding: '22px 38px', border: `2px solid ${RED}`, textAlign: 'center', minWidth: 260 }}>
            <div style={{ fontFamily: FONT, fontSize: 24, color: RED, marginBottom: 8 }}>⚡ LIMITED TIME</div>
            <div style={{ fontFamily: FONT, fontSize: 64, color: RED, lineHeight: 1 }}>02:47</div>
            <div style={{ fontFamily: FONT, fontSize: 19, color: RED, marginTop: 6 }}>ONLY 1 LEFT</div>
          </div>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 330 168">
            <line x1={18} y1={18} x2={312} y2={150} stroke={GREEN} strokeWidth={9} strokeLinecap="round" opacity={xScale} />
            <line x1={312} y1={18} x2={18} y2={150} stroke={GREEN} strokeWidth={9} strokeLinecap="round" opacity={xScale} />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 580, left: '50%', transform: `translateX(-50%) scale(${calScale})` }}>
        <svg width={210} height={196} viewBox="0 0 210 196">
          <rect x={10} y={32} width={190} height={154} rx={12} fill="#1E1E1E" stroke={ACCENT} strokeWidth={2} />
          <rect x={10} y={32} width={190} height={42} rx={12} fill={ACCENT} />
          <rect x={10} y={58} width={190} height={16} fill={ACCENT} />
          <circle cx={60} cy={32} r={9} fill={BG_DARK} stroke={ACCENT} strokeWidth={2} />
          <circle cx={150} cy={32} r={9} fill={BG_DARK} stroke={ACCENT} strokeWidth={2} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d) => {
            const col = d % 7;
            const row = Math.floor(d / 7);
            const x = 18 + col * 25;
            const y = 86 + row * 28;
            const isHighlighted = d === 3;
            return <rect key={d} x={x} y={y} width={19} height={19} rx={4} fill={isHighlighted ? ACCENT : '#2A2A2A'} />;
          })}
          <text x={105} y={172} fontFamily="Arial Black" fontSize={30} textAnchor="middle" fill={WHITE}>WAIT 24H</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 55, right: 55, textAlign: 'center', opacity: ruleOpacity, transform: `translateY(${ruleY}px)` }}>
        <div style={{ fontFamily: FONT, fontSize: 28, color: WHITE, lineHeight: 1.4 }}>THE DEAL WILL STILL BE THERE.</div>
        <div style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, lineHeight: 1.4 }}>OR A BETTER ONE WILL.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 55, right: 75, transform: `scale(${checkScale})` }}>
        <svg width={62} height={62} viewBox="0 0 62 62">
          <circle cx={31} cy={31} r={28} fill={GREEN} />
          <polyline points="16,31 26,43 46,19" fill="none" stroke={WHITE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 120 } });
  const followScale = spring({ frame: Math.max(0, frame - 70), fps: 30, config: { damping: 10, stiffness: 150 } });
  const phoneY = interpolate(frame, [20, 55], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flashOpacity = interpolate(frame, [38, 50, 62], [0, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowBounce = interpolate(
    frame,
    [80, 97, 114, 131, 148, 165, 225],
    [0, -14, 0, -14, 0, -14, -14],
    { extrapolateRight: 'clamp' }
  );
  const tipOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 180, width: '100%', textAlign: 'center', transform: `scale(${titleScale})` }}>
        <div style={{ ...headline(54, WHITE) }}>SCREENSHOT</div>
        <div style={{ ...headline(54, ACCENT) }}>THE TIMER</div>
        <div style={{ fontFamily: FONT, fontSize: 26, color: '#666', marginTop: 14, letterSpacing: '0.1em' }}>CHECK BACK IN 24 HOURS</div>
      </div>

      <div style={{ position: 'absolute', top: 430, left: '50%', transform: `translateX(-50%) translateY(${phoneY}px)` }}>
        <svg width={200} height={310} viewBox="0 0 200 310">
          <rect x={18} y={8} width={164} height={294} rx={24} fill="#1E1E1E" stroke="#444" strokeWidth={2} />
          <rect x={28} y={24} width={144} height={254} rx={10} fill="#2A2A2A" />
          <rect x={32} y={28} width={136} height={84} rx={6} fill="#1A1A1A" />
          <text x={100} y={62} fontFamily="Arial Black" fontSize={22} textAnchor="middle" fill={RED}>02:47</text>
          <text x={100} y={85} fontFamily="Arial" fontSize={12} textAnchor="middle" fill={RED}>ONLY 2 LEFT</text>
          <rect x={28} y={24} width={144} height={254} rx={10} fill={WHITE} opacity={flashOpacity} />
          <rect x={32} y={122} width={136} height={38} rx={8} fill={GREEN} opacity={badgeOpacity} />
          <text x={100} y={146} fontFamily="Arial Black" fontSize={14} textAnchor="middle" fill={WHITE}>SCREENSHOT TAKEN ✓</text>
          <rect x={32} y={170} width={136} height={52} rx={8} fill="#1A1A1A" stroke={ACCENT} strokeWidth={1} opacity={badgeOpacity} />
          <text x={100} y={194} fontFamily="Arial Black" fontSize={12} textAnchor="middle" fill={ACCENT}>REMINDER SET</text>
          <text x={100} y={212} fontFamily="Arial" fontSize={11} textAnchor="middle" fill="#777">CHECK IN 24 HOURS</text>
          <rect x={82} y={290} width={36} height={4} rx={2} fill="#444" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 130, width: '100%', textAlign: 'center', transform: `translateY(${arrowBounce}px) scale(${followScale})` }}>
        <div style={{ fontFamily: FONT, fontSize: 38, color: ACCENT }}>↑ FOLLOW</div>
        <div style={{ fontFamily: FONT, fontSize: 22, color: WHITE, marginTop: 6 }}>FOR MORE RETAIL TRICKS</div>
      </div>

      <div style={{ position: 'absolute', bottom: 56, width: '100%', textAlign: 'center', opacity: tipOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 19, color: '#444' }}>THE TRICKS THEY DON'T WANT YOU TO KNOW</div>
      </div>
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
