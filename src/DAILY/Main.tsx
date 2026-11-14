import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

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

  const titleOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [15, 40], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xScale = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 180 } });
  const fireOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 100, width: '100%', opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>YOUR LANDLORD'S</p>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>INSURANCE COVERS</p>
      </div>

      {/* Left: Building — COVERED */}
      <div style={{ position: 'absolute', top: 340, left: 60, width: 420, opacity: leftOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          <rect x={30} y={60} width={120} height={100} fill="#4B5563" rx={4} />
          <polygon points="20,60 90,10 160,60" fill="#6B7280" />
          <rect x={72} y={120} width={36} height={40} fill={ACCENT} rx={3} />
          <rect x={40} y={75} width={30} height={25} fill="#93C5FD" rx={2} />
          <rect x={110} y={75} width={30} height={25} fill="#93C5FD" rx={2} />
          <rect x={40} y={110} width={30} height={22} fill="#93C5FD" rx={2} />
          <rect x={110} y={110} width={30} height={22} fill="#93C5FD" rx={2} />
          <circle cx={150} cy={30} r={24} fill="#10B981" />
          <polyline points="140,30 148,38 162,22" stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: '#10B981', fontWeight: 700, marginTop: 12, textAlign: 'center' }}>COVERED</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#9CA3AF', marginTop: 4, textAlign: 'center' }}>The building</p>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 340, left: 525, width: 6, height: 300, background: '#374151', borderRadius: 3, opacity: leftOpacity }} />

      {/* Right: Possessions — NOT COVERED */}
      <div style={{ position: 'absolute', top: 340, right: 60, width: 420, opacity: rightOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          <rect x={15} y={90} width={150} height={55} fill="#6B7280" rx={8} />
          <rect x={15} y={80} width={35} height={70} fill="#4B5563" rx={6} />
          <rect x={130} y={80} width={35} height={70} fill="#4B5563" rx={6} />
          <rect x={20} y={87} width={140} height={20} fill="#9CA3AF" rx={4} />
          <rect x={62} y={30} width={56} height={36} fill="#374151" rx={3} />
          <rect x={66} y={34} width={48} height={28} fill="#60A5FA" rx={2} />
          <rect x={48} y={66} width={84} height={6} fill="#4B5563" rx={3} />
          <line x1={20} y1={20} x2={160} y2={160} stroke="#EF4444" strokeWidth={12} strokeLinecap="round" strokeOpacity={xScale} />
          <line x1={160} y1={20} x2={20} y2={160} stroke="#EF4444" strokeWidth={12} strokeLinecap="round" strokeOpacity={xScale} />
        </svg>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: '#EF4444', fontWeight: 700, marginTop: 12, textAlign: 'center' }}>NOT COVERED</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#9CA3AF', marginTop: 4, textAlign: 'center' }}>Your stuff</p>
      </div>

      {/* Fire */}
      <div style={{ position: 'absolute', bottom: 160, width: '100%', display: 'flex', justifyContent: 'center', opacity: fireOpacity }}>
        <svg width={120} height={80} viewBox="0 0 120 80">
          <ellipse cx={60} cy={70} rx={55} ry={12} fill="#F59E0B" opacity={0.4} />
          <path d="M60,10 C40,20 25,35 30,55 C35,70 50,75 60,75 C70,75 85,70 90,55 C95,35 80,20 60,10 Z" fill="#F97316" />
          <path d="M60,25 C48,33 42,45 45,58 C47,67 54,72 60,72 C66,72 73,67 75,58 C78,45 72,33 60,25 Z" fill="#FCD34D" />
          <path d="M60,38 C55,43 52,51 54,58 C56,64 60,67 60,67 C60,67 64,64 66,58 C68,51 65,43 60,38 Z" fill="white" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 60, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(36, WHITE), lineHeight: 1.3 }}>IF YOUR APARTMENT</p>
        <p style={{ ...headline(36, ACCENT), lineHeight: 1.3 }}>BURNED DOWN TONIGHT</p>
        <p style={{ ...headline(36, WHITE), lineHeight: 1.3 }}>YOU'D LOSE EVERYTHING</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const percentScale = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 150 } });
  const bottomOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numPeople = 10;
  const unprotected = 6;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(42, BLACK), lineHeight: 1.2 }}>OF RENTERS HAVE</p>
        <p style={{ ...headline(42, '#EF4444'), lineHeight: 1.2 }}>ZERO COVERAGE</p>
      </div>

      <div style={{ position: 'absolute', top: 260, width: '100%', display: 'flex', justifyContent: 'center', transform: `scale(${percentScale})` }}>
        <p style={{ fontFamily: FONT, fontSize: 220, color: ACCENT, margin: 0, lineHeight: 1 }}>55%</p>
      </div>

      <div style={{ position: 'absolute', top: 700, width: '100%', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', paddingLeft: 60, paddingRight: 60 }}>
        {Array.from({ length: Math.max(0, Math.floor(numPeople)) }).map((_, i) => {
          const isUnprotected = i < unprotected;
          const pOpacity = interpolate(frame, [60 + i * 8, 80 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ opacity: pOpacity }}>
              <svg width={80} height={110} viewBox="0 0 80 110">
                <circle cx={40} cy={22} r={18} fill={isUnprotected ? '#EF4444' : '#10B981'} />
                <path d="M20,45 Q20,90 40,90 Q60,90 60,45 Q50,38 40,38 Q30,38 20,45 Z" fill={isUnprotected ? '#EF4444' : '#10B981'} />
                {isUnprotected && (
                  <>
                    <line x1={12} y1={12} x2={68} y2={98} stroke="white" strokeWidth={5} strokeLinecap="round" />
                    <line x1={68} y1={12} x2={12} y2={98} stroke="white" strokeWidth={5} strokeLinecap="round" />
                  </>
                )}
              </svg>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(34, BLACK), lineHeight: 1.3 }}>ONE INCIDENT AWAY FROM</p>
        <p style={{ ...headline(34, '#EF4444'), lineHeight: 1.3 }}>LOSING EVERYTHING</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalValue = 35000;
  const countFrame = Math.min(frame, dur - 30);
  const countProgress = interpolate(countFrame, [60, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayCount = Math.floor(countProgress * totalValue);

  const items = [
    { label: 'Furniture', value: 8500 },
    { label: 'Electronics', value: 7200 },
    { label: 'Clothing', value: 5000 },
    { label: 'Jewelry', value: 6300 },
    { label: 'Appliances', value: 5000 },
    { label: 'Other', value: 3000 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>THE AVERAGE RENTER</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>OWNS THIS MUCH STUFF</p>
      </div>

      {items.map((item, i) => {
        const itemOpacity = interpolate(frame, [30 + i * 15, 55 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const barProgress = interpolate(frame, [60 + i * 10, 120 + i * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const barMaxWidth = (item.value / totalValue) * 650;
        return (
          <div key={i} style={{ position: 'absolute', top: 310 + i * 110, left: 60, right: 60, opacity: itemOpacity }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 30, color: WHITE, fontWeight: 600 }}>{item.label}</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 30, color: ACCENT, fontWeight: 700 }}>${item.value.toLocaleString()}</span>
            </div>
            <div style={{ background: '#374151', height: 14, borderRadius: 7 }}>
              <div style={{ background: ACCENT, height: 14, borderRadius: 7, width: barProgress * barMaxWidth }} />
            </div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', bottom: 80, width: '100%', opacity: totalOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 48, color: WHITE, margin: 0, textAlign: 'center', letterSpacing: '0.1em' }}>
          TOTAL: <span style={{ color: ACCENT }}>${displayCount.toLocaleString()}</span>
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSlide = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100 } });
  const rightSlide = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 100 } });
  const vsOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowScale = spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 180 } });
  const bottomOpacity = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, BLACK), lineHeight: 1.2 }}>HOW MUCH DOES IT</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>ACTUALLY COST?</p>
      </div>

      {/* Streaming card */}
      <div style={{ position: 'absolute', top: 360, left: 60, width: 400, background: '#1E293B', borderRadius: 20, padding: '32px 24px', transform: `translateX(${(1 - leftSlide) * -300}px)` }}>
        <svg width={80} height={80} viewBox="0 0 80 80" style={{ display: 'block', margin: '0 auto 16px' }}>
          <circle cx={40} cy={40} r={38} fill="#E50914" />
          <polygon points="30,20 62,40 30,60" fill="white" />
        </svg>
        <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#9CA3AF', textAlign: 'center', margin: '0 0 8px' }}>Streaming</p>
        <p style={{ fontFamily: FONT, fontSize: 52, color: 'white', textAlign: 'center', margin: 0 }}>$16/mo</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#6B7280', textAlign: 'center', marginTop: 8 }}>Covers 0 of your stuff</p>
      </div>

      <div style={{ position: 'absolute', top: 480, left: 490, opacity: vsOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 48, color: '#6B7280', margin: 0 }}>VS</p>
      </div>

      {/* Insurance card */}
      <div style={{ position: 'absolute', top: 360, right: 60, width: 400, background: '#1E293B', borderRadius: 20, padding: '32px 24px', transform: `translateX(${(1 - rightSlide) * 300}px)`, border: `3px solid rgba(245,158,11,${rightSlide})` }}>
        <svg width={80} height={80} viewBox="0 0 80 80" style={{ display: 'block', margin: '0 auto 16px' }}>
          <path d="M40,4 L70,16 L70,40 C70,58 56,70 40,76 C24,70 10,58 10,40 L10,16 Z" fill={ACCENT} />
          <polyline points="26,40 36,50 56,30" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#9CA3AF', textAlign: 'center', margin: '0 0 8px' }}>Renter's Insurance</p>
        <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, textAlign: 'center', margin: 0 }}>$14/mo</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#10B981', textAlign: 'center', marginTop: 8 }}>Covers $35,000+ of stuff</p>
      </div>

      <div style={{ position: 'absolute', bottom: 200, right: 100, transform: `scale(${arrowScale})`, transformOrigin: 'center' }}>
        <svg width={70} height={70} viewBox="0 0 70 70">
          <circle cx={35} cy={35} r={33} fill={ACCENT} />
          <polyline points="18,35 48,35 40,24" stroke="white" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={18} y1={35} x2={52} y2={35} stroke="white" strokeWidth={6} strokeLinecap="round" />
          <line x1={40} y1={46} x2={52} y2={35} stroke="white" strokeWidth={6} strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 70, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(38, BLACK), lineHeight: 1.3 }}>THAT'S $168 A YEAR</p>
        <p style={{ ...headline(38, ACCENT), lineHeight: 1.3 }}>TO PROTECT $35,000</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Scale = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 140 } });
  const card2Scale = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 140 } });
  const card3Scale = spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 140 } });
  const bottomOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coverageItems = [
    {
      title: 'Your Property',
      amount: '$35,000+',
      desc: 'Everything you own',
      color: ACCENT,
      cardScale: card1Scale,
      icon: (
        <svg width={70} height={70} viewBox="0 0 70 70">
          <path d="M35,4 L62,18 L62,45 C62,58 50,66 35,70 C20,66 8,58 8,45 L8,18 Z" fill={ACCENT} />
          <polyline points="22,37 31,46 50,27" stroke="white" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Liability',
      amount: '$100,000',
      desc: 'If someone gets hurt',
      color: '#3B82F6',
      cardScale: card2Scale,
      icon: (
        <svg width={70} height={70} viewBox="0 0 70 70">
          <circle cx={35} cy={22} r={16} fill="#3B82F6" />
          <path d="M12,56 Q12,40 35,40 Q58,40 58,56 L58,65 L12,65 Z" fill="#3B82F6" />
          <text x={35} y={28} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold" fontFamily="Arial">+</text>
        </svg>
      ),
    },
    {
      title: 'Temp Housing',
      amount: 'Included',
      desc: 'Hotel if displaced',
      color: '#10B981',
      cardScale: card3Scale,
      icon: (
        <svg width={70} height={70} viewBox="0 0 70 70">
          <rect x={10} y={28} width={50} height={36} fill="#10B981" rx={4} />
          <polygon points="4,28 35,6 66,28" fill="#059669" />
          <rect x={22} y={38} width={12} height={12} fill="white" rx={2} />
          <rect x={36} y={38} width={12} height={12} fill="white" rx={2} />
          <rect x={28} y={50} width={14} height={14} fill="white" rx={2} />
        </svg>
      ),
    },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>$14 A MONTH ALSO</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>COVERS THIS TOO</p>
      </div>

      {coverageItems.map((item, i) => (
        <div key={i} style={{ position: 'absolute', top: 320 + i * 220, left: 60, right: 60, background: '#1E293B', borderRadius: 20, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 32, transform: `scale(${item.cardScale})`, transformOrigin: 'center', border: `2px solid ${item.color}33` }}>
          <div>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 32, color: item.color, margin: '0 0 4px', letterSpacing: '0.1em' }}>{item.title}</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#9CA3AF', margin: 0 }}>{item.desc}</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 32, color: 'white', margin: 0, textAlign: 'right' }}>{item.amount}</p>
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: 60, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(32, '#9CA3AF'), lineHeight: 1.4 }}>ALL THREE. ONE POLICY.</p>
        <p style={{ ...headline(32, ACCENT), lineHeight: 1.4 }}>FOURTEEN DOLLARS.</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100 } });
  const checkScale = spring({ frame: frame - 90, fps, config: { damping: 10, stiffness: 200 } });
  const stat1Opacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 150, fps, config: { damping: 14, stiffness: 150 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, BLACK), lineHeight: 1.2 }}>TAKES 10 MINUTES</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>STARTS TODAY</p>
      </div>

      <div style={{ position: 'absolute', top: 285, width: '100%', display: 'flex', justifyContent: 'center', transform: `scale(${phoneScale})` }}>
        <svg width={260} height={390} viewBox="0 0 260 390">
          <rect x={10} y={10} width={240} height={370} rx={28} fill="#1E293B" stroke="#374151" strokeWidth={3} />
          <rect x={22} y={28} width={216} height={334} rx={16} fill="#0F172A" />
          <rect x={95} y={18} width={70} height={14} rx={7} fill="#374151" />
          <rect x={22} y={28} width={216} height={52} rx={16} fill="#1D4ED8" />
          <text x={130} y={62} textAnchor="middle" fill="white" fontSize={22} fontFamily="Arial Black">INSURED</text>
          <rect x={34} y={96} width={192} height={48} rx={10} fill="#1E293B" />
          <text x={50} y={126} fill="#9CA3AF" fontSize={18} fontFamily="Arial">Personal Property</text>
          <text x={210} y={126} fill={ACCENT} fontSize={18} fontFamily="Arial Black" textAnchor="end">$35K</text>
          <rect x={34} y={154} width={192} height={48} rx={10} fill="#1E293B" />
          <text x={50} y={184} fill="#9CA3AF" fontSize={18} fontFamily="Arial">Liability</text>
          <text x={210} y={184} fill="#3B82F6" fontSize={18} fontFamily="Arial Black" textAnchor="end">$100K</text>
          <rect x={34} y={212} width={192} height={48} rx={10} fill="#1E293B" />
          <text x={50} y={242} fill="#9CA3AF" fontSize={18} fontFamily="Arial">Monthly Cost</text>
          <text x={210} y={242} fill="#10B981" fontSize={18} fontFamily="Arial Black" textAnchor="end">$14/mo</text>
          <rect x={34} y={278} width={192} height={54} rx={14} fill={ACCENT} />
          <text x={130} y={313} textAnchor="middle" fill="black" fontSize={22} fontFamily="Arial Black">GET COVERED</text>
          <circle cx={190} cy={80} r={36} fill="#10B981" opacity={checkScale} />
          <polyline points="175,80 186,91 206,69" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={checkScale} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 240, width: '100%', opacity: stat1Opacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: BLACK, textAlign: 'center', margin: 0, fontWeight: 700 }}>10 minutes • Same-day coverage</p>
      </div>
      <div style={{ position: 'absolute', bottom: 185, width: '100%', opacity: stat2Opacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#6B7280', textAlign: 'center', margin: 0 }}>No medical exam. No agent required.</p>
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 60, right: 60, background: BLACK, borderRadius: 20, padding: '24px 32px', transform: `scale(${ctaScale})`, transformOrigin: 'center' }}>
        <p style={{ ...headline(38, ACCENT), lineHeight: 1.3 }}>IF YOU RENT</p>
        <p style={{ ...headline(38, WHITE), lineHeight: 1.3 }}>GET THIS TODAY</p>
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
