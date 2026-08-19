import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const willSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const formSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const xSp = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 16 } });
  const checkSp = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14 } });
  const statSp = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 32 }}>

        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [-40, 0])}px)`, textAlign: 'center' }}>
          <p style={headline(54, WHITE)}>Your Beneficiary Form</p>
          <p style={{ ...headline(70, ACCENT), marginTop: 8 }}>Overrides Your Will</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 40 }}>

          {/* WILL document */}
          <div style={{ opacity: willSp, transform: `translateX(${interpolate(willSp, [0, 1], [-300, 0])}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width={280} height={360} viewBox="0 0 280 360">
              <rect x="10" y="10" width="260" height="340" fill="#E5E7EB" rx="10" />
              <rect x="10" y="10" width="260" height="54" fill="#9CA3AF" rx="10" />
              <rect x="10" y="44" width="260" height="20" fill="#9CA3AF" />
              <text x="140" y="45" textAnchor="middle" fontFamily="Arial Black" fontSize="26" fill="white">LAST WILL</text>
              <rect x="28" y="80" width="224" height="10" rx="4" fill="#C4C4C4" />
              <rect x="28" y="102" width="180" height="10" rx="4" fill="#C4C4C4" />
              <rect x="28" y="124" width="210" height="10" rx="4" fill="#C4C4C4" />
              <rect x="28" y="146" width="160" height="10" rx="4" fill="#C4C4C4" />
              <rect x="28" y="168" width="200" height="10" rx="4" fill="#C4C4C4" />
              <circle cx="140" cy="270" r="68" fill="rgba(239,68,68,0.2)" stroke="#EF4444" strokeWidth="6" opacity={xSp} />
              <line x1="96" y1="226" x2="184" y2="314" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" opacity={xSp} />
              <line x1="184" y1="226" x2="96" y2="314" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" opacity={xSp} />
            </svg>
            <p style={headline(26, '#EF4444')}>IGNORED BY LAW</p>
          </div>

          {/* VS */}
          <div style={{ opacity: titleSp, paddingTop: 130 }}>
            <p style={headline(54, WHITE)}>VS</p>
          </div>

          {/* BENEFICIARY FORM */}
          <div style={{ opacity: formSp, transform: `translateX(${interpolate(formSp, [0, 1], [300, 0])}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width={280} height={360} viewBox="0 0 280 360">
              <rect x="10" y="10" width="260" height="340" fill="#1F2937" rx="10" stroke={ACCENT} strokeWidth="4" />
              <rect x="10" y="10" width="260" height="54" fill={ACCENT} rx="10" />
              <rect x="10" y="44" width="260" height="20" fill={ACCENT} />
              <text x="140" y="45" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#111">BENEFICIARY FORM</text>
              <rect x="28" y="80" width="224" height="10" rx="4" fill="#374151" />
              <rect x="28" y="102" width="180" height="10" rx="4" fill="#374151" />
              <rect x="28" y="122" width="224" height="18" rx="4" fill={ACCENT} opacity="0.85" />
              <text x="140" y="135" textAnchor="middle" fontFamily="Arial Black" fontSize="13" fill="#111">PRIMARY: [YOUR NAME]</text>
              <rect x="28" y="152" width="160" height="10" rx="4" fill="#374151" />
              <rect x="28" y="174" width="200" height="10" rx="4" fill="#374151" />
              <circle cx="140" cy="270" r="68" fill="rgba(16,185,129,0.2)" stroke="#10B981" strokeWidth="6" opacity={checkSp} />
              <polyline points="102,270 128,298 184,240" fill="none" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity={checkSp} />
            </svg>
            <p style={headline(26, '#10B981')}>CONTROLS IT ALL</p>
          </div>
        </div>

        {/* 42% stat badge */}
        <div style={{ opacity: statSp, transform: `scale(${interpolate(statSp, [0, 1], [0.8, 1])})`, background: '#EF4444', borderRadius: 16, padding: '20px 50px' }}>
          <p style={headline(50, WHITE)}>42% Have It Wrong</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const ringSp = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 10 } });
  const arrowSp = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14 } });
  const warnSp = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 36 }}>

        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [-40, 0])}px)`, textAlign: 'center' }}>
          <p style={headline(60, BLACK)}>You Got Divorced</p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#6B7280', textAlign: 'center' as const, textTransform: 'none' as const, margin: '8px 0 0 0' }}>but never updated the form</p>
        </div>

        {/* Wedding ring with X */}
        <div style={{ opacity: ringSp, transform: `scale(${interpolate(ringSp, [0, 1], [0.5, 1])})` }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={110} cy={110} r={75} fill="none" stroke="#C9A84C" strokeWidth={28} />
            <line x1={50} y1={50} x2={170} y2={170} stroke="#EF4444" strokeWidth={18} strokeLinecap="round" />
            <line x1={170} y1={50} x2={50} y2={170} stroke="#EF4444" strokeWidth={18} strokeLinecap="round" />
          </svg>
        </div>

        {/* 401k → EX-SPOUSE arrow */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, opacity: arrowSp }}>
          <div style={{ background: '#1F2937', borderRadius: 14, padding: '22px 36px', textAlign: 'center' as const }}>
            <p style={headline(26, ACCENT)}>YOUR 401K</p>
            <p style={{ fontFamily: FONT, fontSize: 48, color: '#10B981', textAlign: 'center' as const, margin: '8px 0 0 0' }}>$487K</p>
          </div>

          <svg width={100} height={40} viewBox="0 0 100 40">
            <line x1={5} y1={20} x2={75} y2={20} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
            <polyline points="68,8 90,20 68,32" fill="none" stroke="#EF4444" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width={90} height={110} viewBox="0 0 90 110">
              <circle cx={45} cy={24} r={20} fill="#EF4444" />
              <path d="M10,108 Q10,62 45,62 Q80,62 80,108" fill="#EF4444" />
            </svg>
            <p style={headline(22, '#EF4444')}>EX-SPOUSE</p>
          </div>
        </div>

        {/* Warning banner */}
        <div style={{ opacity: warnSp, transform: `scale(${interpolate(warnSp, [0, 1], [0.85, 1])})`, background: '#EF4444', borderRadius: 14, padding: '18px 44px' }}>
          <p style={headline(30, WHITE)}>Even If Your Will Says Otherwise</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const buildingSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const gavelSp = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 8 } });
  const stat1Sp = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 14 } });
  const stat2Sp = spring({ frame: Math.max(0, frame - 115), fps, config: { damping: 14 } });

  const gavelAngle = interpolate(gavelSp, [0, 1], [-65, -10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 30 }}>

        <div style={{ opacity: titleSp, textAlign: 'center' }}>
          <p style={headline(62, ACCENT)}>No Beneficiary</p>
          <p style={{ ...headline(62, WHITE), marginTop: 4 }}>= Probate Court</p>
        </div>

        {/* Courthouse SVG */}
        <div style={{ opacity: buildingSp, transform: `translateY(${interpolate(buildingSp, [0, 1], [100, 0])}px)` }}>
          <svg width={500} height={260} viewBox="0 0 500 260">
            <polygon points="20,96 250,18 480,96" fill="#374151" />
            <rect x={20} y={92} width={460} height={22} fill="#4B5563" />
            <rect x={40} y={112} width={420} height={138} fill="#374151" />
            <rect x={66} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={130} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={198} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={270} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={338} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={402} y={112} width={32} height={138} fill="#6B7280" rx={4} />
            <rect x={208} y={198} width={64} height={52} fill="#1F2937" rx={5} />
            <rect x={30} y={248} width={440} height={10} fill="#4B5563" rx={2} />
          </svg>
        </div>

        {/* Gavel */}
        <div style={{ transform: `rotate(${gavelAngle}deg)`, transformOrigin: '50% 75%' }}>
          <svg width={110} height={90} viewBox="0 0 110 90">
            <rect x={36} y={8} width={64} height={30} fill="#C9A84C" rx={6} />
            <rect x={46} y={36} width={14} height={50} fill="#8B6914" rx={4} />
          </svg>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 48, alignItems: 'center' }}>
          <div style={{ opacity: stat1Sp, transform: `scale(${interpolate(stat1Sp, [0, 1], [0.7, 1])})`, textAlign: 'center' as const }}>
            <p style={headline(88, '#EF4444')}>18</p>
            <p style={{ ...headline(28, WHITE), marginTop: -8 }}>MONTHS IN COURT</p>
          </div>
          <div style={{ width: 3, height: 120, background: '#4B5563' }} />
          <div style={{ opacity: stat2Sp, transform: `scale(${interpolate(stat2Sp, [0, 1], [0.7, 1])})`, textAlign: 'center' as const }}>
            <p style={headline(88, '#EF4444')}>$47K</p>
            <p style={{ ...headline(28, WHITE), marginTop: -8 }}>IN LEGAL FEES</p>
          </div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const calSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const barProgress = interpolate(frame, [50, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxSp = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 28 }}>

        <div style={{ opacity: titleSp, textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>The SECURE Act Trap</p>
          <p style={{ ...headline(60, ACCENT), marginTop: 6 }}>10-Year Forced Drain</p>
        </div>

        {/* Calendar grid */}
        <div style={{ opacity: calSp, transform: `scale(${interpolate(calSp, [0, 1], [0.85, 1])})` }}>
          <svg width={680} height={218} viewBox="0 0 680 218">
            <rect x={10} y={10} width={660} height={50} fill="#EF4444" rx={10} />
            <text x={340} y={43} textAnchor="middle" fontFamily="Arial Black" fontSize={24} fill="white">YOUR HEIR HAS 10 YEARS TO DRAIN IT</text>
            {[0,1,2,3,4,5,6,7,8,9].map((i) => {
              const col = i % 5;
              const row = Math.floor(i / 5);
              const filled = i < Math.ceil(barProgress * 10);
              return (
                <g key={i}>
                  <rect
                    x={18 + col * 130}
                    y={70 + row * 72}
                    width={110}
                    height={54}
                    fill={filled ? '#EF4444' : '#F3F4F6'}
                    rx={8}
                    stroke={filled ? '#B91C1C' : '#D1D5DB'}
                    strokeWidth={2}
                  />
                  <text
                    x={73 + col * 130}
                    y={105 + row * 72}
                    textAnchor="middle"
                    fontFamily="Arial Black"
                    fontSize={24}
                    fill={filled ? 'white' : '#6B7280'}
                  >
                    {`Yr ${i + 1}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 37% badge */}
        <div style={{ opacity: taxSp, transform: `scale(${interpolate(taxSp, [0, 1], [0.7, 1])})` }}>
          <div style={{ background: '#EF4444', borderRadius: 20, padding: '22px 60px', textAlign: 'center' as const }}>
            <p style={headline(88, WHITE)}>37%</p>
            <p style={{ ...headline(30, WHITE), marginTop: -8 }}>TAX BRACKET HIT</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#6B7280', textAlign: 'center' as const, textTransform: 'none' as const, margin: '14px 0 0 0' }}>on money you spent 40 years saving</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topSp = spring({ frame, fps, config: { damping: 14 } });
  const barProgress = interpolate(frame, [30, 160], [1, 0.24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vanishSp = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14 } });
  const remainSp = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14 } });

  const displayAmt = Math.round(500000 * barProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 28 }}>

        <div style={{ opacity: topSp, textAlign: 'center' }}>
          <p style={headline(52, WHITE)}>Your $500,000 Account</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#9CA3AF', textAlign: 'center' as const, textTransform: 'none' as const, margin: '8px 0 0 0' }}>handled wrong</p>
        </div>

        {/* Drain bar */}
        <div style={{ width: '100%' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#6B7280', textAlign: 'center' as const, textTransform: 'none' as const, margin: '0 0 12px 0' }}>What your family actually receives</p>
          <div style={{ width: '100%', height: 72, background: '#1F2937', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ width: `${barProgress * 100}%`, height: '100%', background: '#EF4444', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE }}>${displayAmt.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Result stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div style={{ opacity: vanishSp, transform: `translateX(${interpolate(vanishSp, [0, 1], [-80, 0])}px)`, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, background: 'rgba(239,68,68,0.12)', borderRadius: 14, padding: '16px 32px' }}>
            <p style={headline(70, '#EF4444')}>$380K</p>
            <p style={headline(36, '#EF4444')}>VANISHED</p>
          </div>
          <div style={{ opacity: remainSp, transform: `translateX(${interpolate(remainSp, [0, 1], [80, 0])}px)`, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, background: 'rgba(16,185,129,0.12)', borderRadius: 14, padding: '16px 32px' }}>
            <p style={headline(70, '#10B981')}>$120K</p>
            <p style={headline(36, '#10B981')}>WHAT HEIRS KEEP</p>
          </div>
        </div>

        <div style={{ opacity: vanishSp, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center' as const, textTransform: 'none' as const, margin: 0 }}>All because of one outdated form</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame, fps, config: { damping: 14 } });
  const laptopSp = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 11 } });
  const checkSp = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 9 } });
  const ctaSp = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14 } });
  const subSp = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 14 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 28 }}>

        <div style={{ opacity: titleSp, textAlign: 'center' }}>
          <p style={headline(52, BLACK)}>The Fix Takes</p>
          <p style={{ ...headline(88, ACCENT), marginTop: 4 }}>5 Minutes</p>
        </div>

        {/* Laptop SVG */}
        <div style={{ opacity: laptopSp, transform: `scale(${interpolate(laptopSp, [0, 1], [0.7, 1])})` }}>
          <svg width={440} height={296} viewBox="0 0 440 296">
            <rect x={20} y={10} width={400} height={248} fill="#374151" rx={14} />
            <rect x={36} y={26} width={368} height={216} fill="#F0FDF4" rx={8} />
            <rect x={50} y={40} width={340} height={32} fill="#DCFCE7" rx={6} />
            <text x={220} y={62} textAnchor="middle" fontFamily="Arial Black" fontSize={17} fill="#065F46">Update Beneficiary Designation</text>
            <rect x={50} y={82} width={200} height={11} rx={4} fill="#D1D5DB" />
            <rect x={50} y={104} width={260} height={11} rx={4} fill="#D1D5DB" />
            <rect x={50} y={126} width={340} height={20} rx={4} fill="#BBF7D0" stroke="#86EFAC" strokeWidth={2} />
            <text x={220} y={141} textAnchor="middle" fontFamily="Arial Black" fontSize={12} fill="#065F46">Spouse / [NAME] / [DATE OF BIRTH]</text>
            <rect x={50} y={156} width={220} height={11} rx={4} fill="#D1D5DB" />
            <rect x={50} y={184} width={340} height={44} rx={10} fill="#10B981" />
            <text x={220} y={212} textAnchor="middle" fontFamily="Arial Black" fontSize={19} fill="white">SAVE CHANGES</text>
            <rect x={0} y={258} width={440} height={18} fill="#4B5563" rx={6} />
            <rect x={170} y={276} width={100} height={14} fill="#6B7280" rx={4} />
          </svg>
        </div>

        {/* Green checkmark */}
        <div style={{ opacity: checkSp, transform: `scale(${interpolate(checkSp, [0, 1], [0.4, 1])})` }}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            <circle cx={60} cy={60} r={56} fill="#10B981" />
            <polyline points="28,62 50,86 94,38" fill="none" stroke="white" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* CTA button */}
        <div style={{ opacity: ctaSp, transform: `scale(${interpolate(ctaSp, [0, 1], [0.8, 1])})`, background: '#EF4444', borderRadius: 18, padding: '22px 70px' }}>
          <p style={headline(56, WHITE)}>UPDATE NOW</p>
        </div>

        <div style={{ opacity: subSp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#374151', textAlign: 'center' as const, textTransform: 'none' as const, margin: 0 }}>Your family can't afford to wait</p>
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
