import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0A1628';
const BG_LIGHT = '#F0F4F8';
const ACCENT = '#10B981';
const WHITE = '#F0F4F8';
const BLACK = '#0A1628';
const GOLD = '#F59E0B';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
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
  return (
    <AbsoluteFill style={{ background: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const amountReveal = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 80 } });
  const bag1 = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 12, stiffness: 70 } });
  const bag2 = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 12, stiffness: 70 } });
  const bag3 = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 12, stiffness: 70 } });
  const subReveal = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 16, stiffness: 85 } });

  const floatY1 = interpolate(frame, [0, 112], [0, -14], { extrapolateRight: 'clamp' });
  const floatY2 = interpolate(frame, [0, 112], [0, 12], { extrapolateRight: 'clamp' });
  const floatY3 = interpolate(frame, [0, 112], [0, -9], { extrapolateRight: 'clamp' });

  const amountScale = interpolate(amountReveal, [0, 1], [0.4, 1]);
  const amountY = interpolate(amountReveal, [0, 1], [50, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>

        <div style={{ ...headline(38, ACCENT), marginBottom: 20, opacity: titleReveal, transform: `translateY(${interpolate(titleReveal, [0, 1], [-24, 0])}px)` }}>
          YOUR JOB IS HIDING
        </div>

        <div style={{
          ...headline(156, WHITE),
          transform: `scale(${amountScale}) translateY(${amountY}px)`,
          textShadow: `0 0 60px ${ACCENT}88`,
          marginBottom: 6,
        }}>
          $3,840
        </div>

        <div style={{ ...headline(34, WHITE), marginBottom: 52, opacity: amountReveal }}>
          FROM YOU EVERY YEAR
        </div>

        {/* Person at desk + floating money bags */}
        <svg width={560} height={340} viewBox="0 0 560 340" style={{ opacity: amountReveal }}>
          {/* Desk surface */}
          <rect x={80} y={240} width={400} height={16} rx={6} fill={ACCENT} />
          <rect x={104} y={256} width={14} height={70} rx={4} fill={ACCENT} opacity={0.55} />
          <rect x={442} y={256} width={14} height={70} rx={4} fill={ACCENT} opacity={0.55} />

          {/* Laptop on desk */}
          <rect x={196} y={170} width={168} height={100} rx={8} fill={`${ACCENT}33`} stroke={ACCENT} strokeWidth={2.5} />
          <rect x={176} y={268} width={208} height={12} rx={5} fill={`${ACCENT}55`} />
          <rect x={218} y={192} width={124} height={58} rx={4} fill={`${ACCENT}22`} />

          {/* Person head */}
          <circle cx={280} cy={118} r={44} fill={WHITE} opacity={0.88} />
          {/* Person body / shirt */}
          <path d="M230 162 Q280 145 330 162 L340 240 L220 240 Z" fill={WHITE} opacity={0.7} />

          {/* Money bag 1 — left */}
          <g style={{ transform: `translate(0, ${floatY1}px)`, opacity: bag1 }}>
            <ellipse cx={68} cy={168} rx={38} ry={40} fill={GOLD} />
            <text x={68} y={176} textAnchor="middle" fontSize={30} fontWeight="bold" fill={BLACK}>$</text>
            <rect x={54} y={124} width={28} height={22} rx={7} fill="#D97706" />
            <rect x={60} y={110} width={16} height={16} rx={4} fill="#B45309" />
          </g>

          {/* Money bag 2 — right */}
          <g style={{ transform: `translate(0, ${floatY2}px)`, opacity: bag2 }}>
            <ellipse cx={492} cy={155} rx={38} ry={40} fill={GOLD} />
            <text x={492} y={163} textAnchor="middle" fontSize={30} fontWeight="bold" fill={BLACK}>$</text>
            <rect x={478} y={111} width={28} height={22} rx={7} fill="#D97706" />
            <rect x={484} y={97} width={16} height={16} rx={4} fill="#B45309" />
          </g>

          {/* Money bag 3 — top */}
          <g style={{ transform: `translate(0, ${floatY3}px)`, opacity: bag3 }}>
            <ellipse cx={280} cy={34} rx={30} ry={32} fill={GOLD} />
            <text x={280} y={41} textAnchor="middle" fontSize={24} fontWeight="bold" fill={BLACK}>$</text>
            <rect x={266} y={0} width={28} height={18} rx={6} fill="#D97706" />
          </g>
        </svg>

        <div style={{ ...headline(28, `${WHITE}CC`), marginTop: 16, opacity: subReveal }}>
          MOST WORKERS NEVER CLAIM IT
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const BENEFIT_LABELS = [
  'Dependent Care FSA',
  'Tuition Reimbursement',
  'HSA Employer Match',
  'Wellness Stipend',
  'Commuter Benefits',
];

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleReveal = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const checkReveal = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 14, stiffness: 80 } });

  const titleY = interpolate(titleReveal, [0, 1], [-30, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 55px' }}>

        <div style={{ ...headline(44, ACCENT), marginBottom: 10, transform: `translateY(${titleY}px)`, opacity: titleReveal }}>
          42% OF WORKERS
        </div>
        <div style={{ ...headline(30, BLACK), marginBottom: 44, transform: `translateY(${titleY}px)`, opacity: titleReveal }}>
          DON'T UNDERSTAND THEIR BENEFITS
        </div>

        {/* Checklist card */}
        <div style={{ background: WHITE, borderRadius: 24, padding: '32px 44px', width: '92%', boxShadow: '0 10px 50px rgba(0,0,0,0.13)' }}>
          {BENEFIT_LABELS.map((label, i) => {
            const itemReveal = spring({ frame: Math.max(0, frame - i * 14), fps, config: { damping: 18, stiffness: 100 } });
            const isChecked = i === 0 && checkReveal > 0.5;
            const itemX = interpolate(itemReveal, [0, 1], [-22, 0]);
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: i < 4 ? 22 : 0,
                  opacity: itemReveal,
                  transform: `translateX(${itemX}px)`,
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: `3px solid ${isChecked ? ACCENT : '#CBD5E0'}`,
                  background: isChecked ? `${ACCENT}22` : 'transparent',
                  marginRight: 22,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {isChecked && (
                    <div style={{
                      width: 14,
                      height: 9,
                      borderBottom: `3px solid ${ACCENT}`,
                      borderLeft: `3px solid ${ACCENT}`,
                      transform: 'rotate(-45deg) translateY(-2px)',
                    }} />
                  )}
                </div>
                <span style={{ fontFamily: FONT, fontSize: 30, color: BLACK, letterSpacing: '0.04em' }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ ...headline(26, BLACK), marginTop: 36, opacity: checkReveal }}>
          THEY'RE LEAVING REAL CASH BEHIND
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerReveal = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const buildingReveal = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 75 } });
  const amountReveal = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 16, stiffness: 85 } });

  const counterVal = Math.round(interpolate(frame, [50, 130], [0, 2000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const buildingScale = interpolate(buildingReveal, [0, 1], [0.5, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>

        <div style={{ ...headline(36, ACCENT), marginBottom: 6, opacity: headerReveal }}>
          NUMBER ONE
        </div>
        <div style={{ ...headline(48, WHITE), marginBottom: 44, opacity: headerReveal }}>
          DEPENDENT CARE FSA
        </div>

        {/* Daycare building SVG */}
        <svg width={420} height={280} viewBox="0 0 420 280" style={{ transform: `scale(${buildingScale})`, opacity: buildingReveal, marginBottom: 28 }}>
          {/* Building body */}
          <rect x={80} y={100} width={260} height={160} rx={6} fill={`${ACCENT}33`} stroke={ACCENT} strokeWidth={3} />
          {/* Roof */}
          <polygon points="60,100 210,20 360,100" fill={ACCENT} opacity={0.85} />
          {/* Door */}
          <rect x={174} y={188} width={72} height={72} rx={6} fill={ACCENT} opacity={0.7} />
          <circle cx={232} cy={224} r={5} fill={BLACK} />
          {/* Windows */}
          <rect x={102} y={124} width={56} height={44} rx={5} fill={`${WHITE}33`} stroke={ACCENT} strokeWidth={2} />
          <rect x={262} y={124} width={56} height={44} rx={5} fill={`${WHITE}33`} stroke={ACCENT} strokeWidth={2} />
          {/* Flag pole */}
          <line x1={210} y1={20} x2={210} y2={0} stroke={WHITE} strokeWidth={3} />
          <polygon points="210,0 240,10 210,20" fill={GOLD} />
          {/* Child figure 1 */}
          <circle cx={340} cy={215} r={20} fill={WHITE} opacity={0.75} />
          <rect x={328} y={235} width={24} height={36} rx={8} fill={WHITE} opacity={0.55} />
          {/* Child figure 2 */}
          <circle cx={78} cy={218} r={18} fill={WHITE} opacity={0.75} />
          <rect x={67} y={236} width={22} height={32} rx={7} fill={WHITE} opacity={0.55} />
        </svg>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: amountReveal,
          transform: `scale(${interpolate(amountReveal, [0, 1], [0.7, 1])})`,
        }}>
          <div style={{ ...headline(100, GOLD), textShadow: `0 0 40px ${GOLD}88` }}>
            ${counterVal.toLocaleString()}
          </div>
          <div style={{ ...headline(32, WHITE), marginTop: 4 }}>
            SAVED ON TAXES / YEAR
          </div>
        </div>

        <div style={{ ...headline(24, `${ACCENT}CC`), marginTop: 24, opacity: amountReveal }}>
          MOST PARENTS SKIP THIS ENTIRELY
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerReveal = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const capReveal = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 72 } });
  const amountReveal = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 16, stiffness: 85 } });
  const barReveal = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 18, stiffness: 80 } });

  const capBounce = interpolate(capReveal, [0, 0.6, 1], [0, -18, 0]);
  const barWidth = interpolate(barReveal, [0, 1], [0, 94]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>

        <div style={{ ...headline(36, ACCENT), marginBottom: 6, opacity: headerReveal }}>
          NUMBER TWO
        </div>
        <div style={{ ...headline(44, BLACK), marginBottom: 40, opacity: headerReveal }}>
          TUITION REIMBURSEMENT
        </div>

        {/* Graduation cap SVG */}
        <svg width={400} height={240} viewBox="0 0 400 240" style={{ transform: `translateY(${capBounce}px)`, opacity: capReveal, marginBottom: 24 }}>
          {/* Cap board */}
          <polygon points="200,50 360,110 200,170 40,110" fill={BLACK} />
          <polygon points="200,50 360,110 200,170 40,110" fill={ACCENT} opacity={0.15} />
          {/* Cap top */}
          <polygon points="200,20 360,110 200,110 40,110" fill={BLACK} stroke={ACCENT} strokeWidth={2} />
          {/* Button on top */}
          <circle cx={200} cy={22} r={10} fill={ACCENT} />
          {/* Tassel string */}
          <line x1={200} y1={22} x2={200} y2={70} stroke={GOLD} strokeWidth={3} />
          <line x1={200} y1={70} x2={226} y2={130} stroke={GOLD} strokeWidth={3} />
          {/* Tassel end */}
          {Array.from({ length: Math.max(0, Math.floor(5)) }).map((_, i) => (
            <line key={i} x1={226} y1={130} x2={220 + i * 3} y2={165} stroke={GOLD} strokeWidth={2} />
          ))}
          {/* Diploma scroll */}
          <rect x={100} y={175} width={200} height={52} rx={10} fill={WHITE} stroke={ACCENT} strokeWidth={2.5} />
          <line x1={130} y1={195} x2={270} y2={195} stroke={`${ACCENT}88`} strokeWidth={2} />
          <line x1={130} y1={208} x2={240} y2={208} stroke={`${ACCENT}55`} strokeWidth={2} />
          <line x1={130} y1={219} x2={210} y2={219} stroke={`${ACCENT}44`} strokeWidth={2} />
        </svg>

        <div style={{ ...headline(96, ACCENT), opacity: amountReveal, transform: `scale(${interpolate(amountReveal, [0, 1], [0.6, 1])})`, textShadow: `0 0 30px ${ACCENT}55` }}>
          $5,250
        </div>
        <div style={{ ...headline(30, BLACK), marginBottom: 32, opacity: amountReveal }}>
          PAID BY YOUR EMPLOYER / YEAR
        </div>

        {/* Bar showing only 2% claim it */}
        <div style={{ width: '88%', opacity: barReveal }}>
          <div style={{ ...headline(22, BLACK), marginBottom: 10 }}>
            ELIGIBLE WORKERS WHO CLAIM IT
          </div>
          <div style={{ width: '100%', height: 28, background: '#E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{
              width: `${barWidth}%`,
              height: '100%',
              background: ACCENT,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 18, color: WHITE, letterSpacing: '0.08em' }}>2%</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerReveal = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const shieldReveal = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 13, stiffness: 75 } });
  const amountReveal = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 16, stiffness: 85 } });
  const barFill = interpolate(frame, [48, 140], [0, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const shieldScale = interpolate(shieldReveal, [0, 1], [0.4, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>

        <div style={{ ...headline(36, ACCENT), marginBottom: 6, opacity: headerReveal }}>
          NUMBER THREE
        </div>
        <div style={{ ...headline(40, WHITE), marginBottom: 38, opacity: headerReveal }}>
          EMPLOYER HSA CONTRIBUTION
        </div>

        {/* HSA Shield SVG */}
        <svg width={340} height={260} viewBox="0 0 340 260" style={{ transform: `scale(${shieldScale})`, opacity: shieldReveal, marginBottom: 22 }}>
          {/* Shield shape */}
          <path d="M170,16 L304,64 L304,158 Q304,220 170,252 Q36,220 36,158 L36,64 Z" fill={`${ACCENT}25`} stroke={ACCENT} strokeWidth={4} />
          {/* Inner shield */}
          <path d="M170,46 L276,84 L276,155 Q276,204 170,230 Q64,204 64,155 L64,84 Z" fill={`${ACCENT}15`} />
          {/* HSA card */}
          <rect x={100} y={95} width={140} height={88} rx={10} fill={ACCENT} opacity={0.85} />
          <rect x={100} y={95} width={140} height={26} rx={10} fill={ACCENT} />
          <rect x={108} y={138} width={56} height={8} rx={3} fill={`${WHITE}88`} />
          <rect x={108} y={154} width={40} height={8} rx={3} fill={`${WHITE}55`} />
          <text x={170} y={116} textAnchor="middle" fontSize={18} fontWeight="bold" fontFamily={FONT} fill={WHITE} letterSpacing="2">HSA</text>
          {/* Plus sign */}
          <rect x={154} y={157} width={32} height={8} rx={3} fill={WHITE} opacity={0.9} />
          <rect x={166} y={145} width={8} height={32} rx={3} fill={WHITE} opacity={0.9} />
        </svg>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: amountReveal,
        }}>
          <div style={{ ...headline(104, GOLD), textShadow: `0 0 40px ${GOLD}77` }}>
            $878
          </div>
          <div style={{ ...headline(30, WHITE) }}>
            FREE FROM YOUR EMPLOYER
          </div>
        </div>

        {/* Fill bar */}
        <div style={{ width: '88%', marginTop: 28, opacity: amountReveal }}>
          <div style={{ ...headline(22, `${WHITE}BB`), marginBottom: 10 }}>
            WORKERS WHO INVEST IT
          </div>
          <div style={{ width: '100%', height: 28, background: `${WHITE}22`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{
              width: `${barFill}%`,
              height: '100%',
              background: ACCENT,
              borderRadius: 14,
            }} />
          </div>
          <div style={{ ...headline(20, `${WHITE}77`), marginTop: 8 }}>
            MOST LEAVE IT SITTING AS CASH
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerReveal = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const laptopReveal = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 78 } });
  const arrowReveal = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 16, stiffness: 85 } });
  const ctaReveal = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 18, stiffness: 90 } });

  const laptopY = interpolate(laptopReveal, [0, 1], [40, 0]);
  const arrowX = interpolate(arrowReveal, [0, 1], [-16, 0]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>

        <div style={{ ...headline(48, BLACK), marginBottom: 8, opacity: headerReveal }}>
          CLAIM WHAT'S YOURS
        </div>
        <div style={{ ...headline(28, ACCENT), marginBottom: 40, opacity: headerReveal }}>
          OPEN YOUR BENEFITS PORTAL
        </div>

        {/* Laptop SVG */}
        <svg width={460} height={300} viewBox="0 0 460 300" style={{ transform: `translateY(${laptopY}px)`, opacity: laptopReveal, marginBottom: 30 }}>
          {/* Laptop base */}
          <rect x={50} y={240} width={360} height={18} rx={6} fill="#94A3B8" />
          <rect x={80} y={232} width={300} height={16} rx={4} fill="#64748B" />
          {/* Laptop screen */}
          <rect x={70} y={40} width={320} height={200} rx={12} fill="#1E293B" stroke="#475569" strokeWidth={3} />
          {/* Screen content — benefits portal */}
          <rect x={82} y={52} width={296} height={176} rx={8} fill="#F8FAFC" />
          {/* Portal header bar */}
          <rect x={82} y={52} width={296} height={36} rx={8} fill={ACCENT} />
          <text x={230} y={74} textAnchor="middle" fontSize={16} fontWeight="bold" fontFamily={FONT} fill={WHITE} letterSpacing="1">MY BENEFITS PORTAL</text>
          {/* Portal rows */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={100} y={104 + i * 38} width={180} height={10} rx={4} fill="#CBD5E0" />
              <rect x={100} y={120 + i * 38} width={120} height={8} rx={3} fill="#E2E8F0" />
              <rect x={302} y={104 + i * 38} width={58} height={24} rx={6} fill={i === 0 ? ACCENT : '#E2E8F0'} />
              {i === 0 && (
                <text x={331} y={120} textAnchor="middle" fontSize={12} fontWeight="bold" fontFamily={FONT} fill={WHITE}>ENROLL</text>
              )}
            </g>
          ))}
          {/* Login button highlight */}
          <rect x={138} y={196} width={184} height={28} rx={8} fill={ACCENT} />
          <text x={230} y={214} textAnchor="middle" fontSize={14} fontWeight="bold" fontFamily={FONT} fill={WHITE} letterSpacing="2">LOG IN NOW</text>
        </svg>

        {/* Arrow + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: arrowReveal, transform: `translateX(${arrowX}px)`, marginBottom: 24 }}>
          <div style={{ fontFamily: FONT, fontSize: 44, color: ACCENT }}>→</div>
          <div style={{ ...headline(32, BLACK) }}>YOU'VE ALREADY EARNED IT</div>
        </div>

        <div style={{
          background: ACCENT,
          borderRadius: 20,
          padding: '20px 40px',
          opacity: ctaReveal,
          transform: `scale(${interpolate(ctaReveal, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{ ...headline(30, WHITE) }}>
            FOLLOW FOR A MONEY TRAP EVERY DAY
          </div>
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
