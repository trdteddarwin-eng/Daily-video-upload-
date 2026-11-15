import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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
  const phoneScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100 } });
  const glowOp = interpolate(frame, [100, 130, 157, 185], [0, 1, 0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 150, fps, config: { damping: 10, stiffness: 200 } });
  const bottomOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, width: '100%', opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{ ...headline(42, WHITE), lineHeight: 1.2 }}>YOUR COMPANY HID</p>
        <p style={{ ...headline(42, ACCENT), lineHeight: 1.2 }}>FREE MONEY</p>
        <p style={{ ...headline(42, WHITE), lineHeight: 1.2 }}>IN YOUR BENEFITS</p>
      </div>

      <div style={{ position: 'absolute', top: 320, width: '100%', display: 'flex', justifyContent: 'center', transform: `scale(${phoneScale})` }}>
        <svg width={300} height={420} viewBox="0 0 300 420">
          <rect x={10} y={10} width={280} height={400} rx={30} fill="#1E293B" stroke="#374151" strokeWidth={3} />
          <rect x={22} y={28} width={256} height={364} rx={18} fill="#0F172A" />
          <rect x={110} y={18} width={80} height={14} rx={7} fill="#374151" />
          <rect x={22} y={28} width={256} height={56} rx={18} fill="#1D4ED8" />
          <text x={150} y={63} textAnchor="middle" fill="white" fontSize={20} fontFamily="Arial Black">HR BENEFITS</text>
          <rect x={34} y={96} width={232} height={44} rx={8} fill="#1E293B" />
          <circle cx={56} cy={118} r={14} fill="#EF4444" />
          <text x={56} y={124} textAnchor="middle" fill="white" fontSize={14} fontFamily="Arial Black">+</text>
          <text x={78} y={124} fill="#9CA3AF" fontSize={17} fontFamily="Arial">Health Insurance</text>
          <text x={254} y={124} fill="#6B7280" fontSize={14} fontFamily="Arial" textAnchor="end">Enrolled</text>
          <rect x={34} y={148} width={232} height={44} rx={8} fill="#1E293B" />
          <circle cx={56} cy={170} r={14} fill="#3B82F6" />
          <text x={56} y={176} textAnchor="middle" fill="white" fontSize={12} fontFamily="Arial Black">$</text>
          <text x={78} y={176} fill="#9CA3AF" fontSize={17} fontFamily="Arial">401(k)</text>
          <text x={254} y={176} fill="#6B7280" fontSize={14} fontFamily="Arial" textAnchor="end">Enrolled</text>
          <rect x={34} y={200} width={232} height={44} rx={8} fill="#1E293B" />
          <circle cx={56} cy={222} r={14} fill="#8B5CF6" />
          <text x={78} y={228} fill="#9CA3AF" fontSize={17} fontFamily="Arial">Dental / Vision</text>
          <text x={254} y={228} fill="#6B7280" fontSize={14} fontFamily="Arial" textAnchor="end">Enrolled</text>
          <rect x={28} y={254} width={244} height={56} rx={10} fill={`rgba(16,185,129,${glowOp * 0.2})`} stroke={`rgba(16,185,129,${glowOp})`} strokeWidth={2.5} />
          <circle cx={56} cy={282} r={16} fill="#10B981" />
          <text x={56} y={288} textAnchor="middle" fill="white" fontSize={11} fontFamily="Arial Black">$%</text>
          <text x={78} y={287} fill="white" fontSize={18} fontFamily="Arial Black">ESPP</text>
          <text x={254} y={278} fill="#EF4444" fontSize={14} fontFamily="Arial Black" textAnchor="end">NOT</text>
          <text x={254} y={297} fill="#EF4444" fontSize={14} fontFamily="Arial Black" textAnchor="end">ENROLLED</text>
          <rect x={34} y={322} width={232} height={34} rx={6} fill="#1E293B" opacity={0.5} />
          <rect x={34} y={364} width={232} height={34} rx={6} fill="#1E293B" opacity={0.3} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 230, right: 70, background: '#EF4444', borderRadius: 999, width: 130, height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${badgeScale})` }}>
        <p style={{ fontFamily: FONT, fontSize: 42, color: WHITE, margin: 0, lineHeight: 1 }}>40%</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: 0 }}>skip it</p>
      </div>

      <div style={{ position: 'absolute', bottom: 70, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(32, '#9CA3AF'), lineHeight: 1.4 }}>17% GUARANTEED RETURN</p>
        <p style={{ ...headline(32, ACCENT), lineHeight: 1.4 }}>THEY NEVER CLAIMED</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 120 } });
  const arrowProgress = interpolate(frame, [65, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightScale = spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 120 } });
  const badgeScale = spring({ frame: frame - 145, fps, config: { damping: 10, stiffness: 200 } });
  const bottomOpacity = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(42, BLACK), lineHeight: 1.2 }}>WHAT IS AN ESPP?</p>
        <p style={{ ...headline(38, ACCENT), lineHeight: 1.2 }}>HERE'S THE SIMPLE VERSION</p>
      </div>

      <div style={{ position: 'absolute', top: 340, left: 50, transform: `scale(${leftScale})`, transformOrigin: 'center center' }}>
        <svg width={240} height={190} viewBox="0 0 240 190">
          <rect x={0} y={0} width={240} height={190} rx={16} fill="#1E293B" />
          <rect x={0} y={0} width={240} height={48} rx={16} fill="#374151" />
          <rect x={0} y={30} width={240} height={18} fill="#374151" />
          <text x={120} y={30} textAnchor="middle" fill="white" fontSize={15} fontFamily="Arial Black">YOUR CONTRIBUTION</text>
          <text x={18} y={76} fill="#9CA3AF" fontSize={15} fontFamily="Arial">Annual Salary:</text>
          <text x={222} y={76} fill="white" fontSize={15} fontFamily="Arial Black" textAnchor="end">$60,000</text>
          <text x={18} y={102} fill="#9CA3AF" fontSize={15} fontFamily="Arial">ESPP (10%):</text>
          <text x={222} y={102} fill="#EF4444" fontSize={15} fontFamily="Arial Black" textAnchor="end">$6,000</text>
          <line x1={18} y1={114} x2={222} y2={114} stroke="#4B5563" strokeWidth={1.5} />
          <text x={120} y={144} textAnchor="middle" fill="#9CA3AF" fontSize={14} fontFamily="Arial">From your paycheck</text>
          <text x={120} y={170} textAnchor="middle" fill={ACCENT} fontSize={22} fontFamily="Arial Black">$6,000</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 415, left: 320, opacity: arrowProgress }}>
        <svg width={130} height={60} viewBox="0 0 130 60">
          <line x1={0} y1={30} x2={Math.min(arrowProgress * 100, 90)} y2={30} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
          <polygon points="90,12 122,30 90,48" fill={ACCENT} opacity={Math.max(0, (arrowProgress - 0.75) / 0.25)} />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 310, right: 50, transform: `scale(${rightScale})`, transformOrigin: 'center center' }}>
        <svg width={240} height={250} viewBox="0 0 240 250">
          <rect x={0} y={0} width={240} height={250} rx={16} fill="#1E293B" stroke="#10B981" strokeWidth={3} />
          <rect x={8} y={8} width={224} height={234} rx={10} fill="none" stroke="#374151" strokeWidth={1.5} strokeDasharray="6,4" />
          <text x={120} y={50} textAnchor="middle" fill={ACCENT} fontSize={15} fontFamily="Arial Black">COMPANY STOCK</text>
          <circle cx={120} cy={120} r={44} fill="none" stroke={ACCENT} strokeWidth={3} />
          <text x={120} y={112} textAnchor="middle" fill={ACCENT} fontSize={28} fontFamily="Arial Black">$</text>
          <text x={120} y={138} textAnchor="middle" fill={ACCENT} fontSize={16} fontFamily="Arial">ACME INC</text>
          <text x={120} y={190} textAnchor="middle" fill="#9CA3AF" fontSize={15} fontFamily="Arial">Market Value:</text>
          <text x={120} y={215} textAnchor="middle" fill="white" fontSize={22} fontFamily="Arial Black">$7,059</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 285, right: 36, background: '#EF4444', borderRadius: 999, width: 112, height: 112, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${badgeScale})`, boxShadow: '0 4px 20px rgba(239,68,68,0.5)' }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, lineHeight: 1 }}>15%</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: 'rgba(255,255,255,0.9)', margin: 0 }}>OFF</p>
      </div>

      <div style={{ position: 'absolute', bottom: 70, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(36, BLACK), lineHeight: 1.3 }}>YOU PAY $6,000</p>
        <p style={{ ...headline(36, ACCENT), lineHeight: 1.3 }}>YOU RECEIVE $7,059</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftScale = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 120 } });
  const arrowProgress = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightScale = spring({ frame: frame - 100, fps, config: { damping: 14, stiffness: 120 } });
  const gainScale = spring({ frame: frame - 140, fps, config: { damping: 10, stiffness: 220 } });
  const bar1P = interpolate(frame, [60, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2P = interpolate(frame, [80, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3P = interpolate(frame, [100, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [175, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: 'Savings', pct: '0.05%', barH: 8, color: '#6B7280', progress: bar1P },
    { label: 'S&P 500', pct: '~10%', barH: 90, color: '#3B82F6', progress: bar2P },
    { label: 'ESPP', pct: '17.6%', barH: 155, color: ACCENT, progress: bar3P },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2 }}>THE MATH IS</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>EMBARRASSINGLY SIMPLE</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 55, background: '#1E293B', borderRadius: 20, padding: '24px 28px', width: 230, transform: `scale(${leftScale})`, transformOrigin: 'center center' }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#9CA3AF', textAlign: 'center', margin: '0 0 8px' }}>YOU PAY</p>
        <p style={{ fontFamily: FONT, fontSize: 88, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1 }}>85¢</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#6B7280', textAlign: 'center', margin: '8px 0 0' }}>per $1 of stock</p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 310, opacity: arrowProgress }}>
        <svg width={130} height={60} viewBox="0 0 130 60">
          <line x1={0} y1={30} x2={Math.min(arrowProgress * 100, 90)} y2={30} stroke={ACCENT} strokeWidth={6} strokeLinecap="round" />
          <polygon points="90,12 122,30 90,48" fill={ACCENT} opacity={Math.max(0, (arrowProgress - 0.75) / 0.25)} />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 290, right: 55, background: '#1E293B', borderRadius: 20, padding: '24px 28px', width: 230, transform: `scale(${rightScale})`, transformOrigin: 'center center', border: `3px solid rgba(16,185,129,${rightScale})` }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#9CA3AF', textAlign: 'center', margin: '0 0 8px' }}>STOCK WORTH</p>
        <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, textAlign: 'center', margin: 0, lineHeight: 1 }}>$1</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#6B7280', textAlign: 'center', margin: '8px 0 0' }}>instant gain</p>
      </div>

      <div style={{ position: 'absolute', top: 560, width: '100%', display: 'flex', justifyContent: 'center', transform: `scale(${gainScale})` }}>
        <div style={{ background: ACCENT, borderRadius: 16, padding: '14px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 54, color: BLACK, margin: 0, lineHeight: 1 }}>+17.6%</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#1E293B', margin: '4px 0 0' }}>GUARANTEED RETURN</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 170, left: 60, right: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 170 }}>
        {bars.map((bar, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 200 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: bar.color, margin: '0 0 4px', fontWeight: 700 }}>{bar.pct}</p>
            <div style={{ background: bar.color, width: 76, height: Math.max(4, bar.barH * bar.progress), borderRadius: '8px 8px 0 0' }} />
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#9CA3AF', margin: '6px 0 0', textAlign: 'center' }}>{bar.label}</p>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 50, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(30, '#9CA3AF'), lineHeight: 1.3 }}>MARKET HASN'T EVEN OPENED.</p>
        <p style={{ ...headline(30, ACCENT), lineHeight: 1.3 }}>PROFIT IS ALREADY LOCKED IN.</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const baseP = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const splitP = interpolate(frame, [80, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check1 = spring({ frame: frame - 148, fps, config: { damping: 10, stiffness: 220 } });
  const check2 = spring({ frame: frame - 168, fps, config: { damping: 10, stiffness: 220 } });
  const bottomOpacity = interpolate(frame, [175, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const c1 = Math.min(1, check1);
  const c2 = Math.min(1, check2);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(42, BLACK), lineHeight: 1.2 }}>THE LOOKBACK RULE</p>
        <p style={{ ...headline(42, ACCENT), lineHeight: 1.2 }}>MAKES IT EVEN BETTER</p>
      </div>

      <div style={{ position: 'absolute', top: 290, left: 60, right: 60 }}>
        <svg width={960} height={560} viewBox="0 0 960 560">
          <text x={28} y={82} fill="#9CA3AF" fontSize={22} fontFamily="Arial" textAnchor="end">$120</text>
          <text x={28} y={202} fill="#9CA3AF" fontSize={22} fontFamily="Arial" textAnchor="end">$100</text>
          <text x={28} y={382} fill="#9CA3AF" fontSize={22} fontFamily="Arial" textAnchor="end">$80</text>
          <line x1={40} y1={78} x2={940} y2={78} stroke="#D1D5DB" strokeWidth={1.5} />
          <line x1={40} y1={198} x2={940} y2={198} stroke="#9CA3AF" strokeWidth={2} />
          <line x1={40} y1={378} x2={940} y2={378} stroke="#D1D5DB" strokeWidth={1.5} />
          <line x1={40} y1={198} x2={40 + baseP * 310} y2={198} stroke="#374151" strokeWidth={5} strokeLinecap="round" />
          <text x={44} y={232} fill="#9CA3AF" fontSize={18} fontFamily="Arial">START $100</text>
          <line
            x1={350} y1={198}
            x2={350 + splitP * 320}
            y2={198 - splitP * 120}
            stroke="#10B981" strokeWidth={5} strokeLinecap="round" strokeOpacity={splitP > 0.05 ? 1 : 0}
          />
          <line
            x1={350} y1={198}
            x2={350 + splitP * 320}
            y2={198 + splitP * 180}
            stroke="#EF4444" strokeWidth={5} strokeLinecap="round" strokeOpacity={splitP > 0.05 ? 1 : 0}
          />
          <text x={380} y={68} fill="#10B981" fontSize={17} fontFamily="Arial Black" opacity={splitP > 0.4 ? 1 : 0}>Stock UP → Buy at $85 (15% off $100)</text>
          <text x={380} y={420} fill="#EF4444" fontSize={17} fontFamily="Arial Black" opacity={splitP > 0.4 ? 1 : 0}>Stock DOWN → Buy at $68 (15% off $80)</text>
          <circle cx={870} cy={78} r={36} fill="#10B981" opacity={c1} />
          <polyline points="855,78 867,90 886,66" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={c1} />
          <text x={870} y={130} textAnchor="middle" fill="#10B981" fontSize={17} fontFamily="Arial Black" opacity={c1}>YOU WIN</text>
          <circle cx={870} cy={378} r={36} fill="#10B981" opacity={c2} />
          <polyline points="855,378 867,390 886,366" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={c2} />
          <text x={870} y={430} textAnchor="middle" fill="#10B981" fontSize={17} fontFamily="Arial Black" opacity={c2}>YOU WIN</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 70, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(32, BLACK), lineHeight: 1.3 }}>STOCK UP OR DOWN —</p>
        <p style={{ ...headline(32, ACCENT), lineHeight: 1.3 }}>YOU ALWAYS GET 15% OFF</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numPeople = 10;
  const unrolled = 4;
  const countP = interpolate(frame, [100, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayAmount = Math.floor(countP * 1059);
  const mathOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [175, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(42, WHITE), lineHeight: 1.2 }}>4 IN 10 ELIGIBLE WORKERS</p>
        <p style={{ ...headline(42, '#EF4444'), lineHeight: 1.2 }}>SKIP THIS ENTIRELY</p>
      </div>

      <div style={{ position: 'absolute', top: 290, width: '100%', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', paddingLeft: 50, paddingRight: 50 }}>
        {Array.from({ length: Math.max(0, Math.floor(numPeople)) }).map((_, i) => {
          const isSkipping = i < unrolled;
          const pOp = interpolate(frame, [30 + i * 10, 55 + i * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ opacity: pOp, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg width={88} height={114} viewBox="0 0 88 114">
                <circle cx={44} cy={24} r={20} fill={isSkipping ? '#374151' : ACCENT} />
                <path d="M20,54 Q20,98 44,98 Q68,98 68,54 Q56,43 44,43 Q32,43 20,54 Z" fill={isSkipping ? '#374151' : ACCENT} />
                {isSkipping ? (
                  <>
                    <line x1={12} y1={12} x2={76} y2={102} stroke="#EF4444" strokeWidth={6} strokeLinecap="round" />
                    <line x1={76} y1={12} x2={12} y2={102} stroke="#EF4444" strokeWidth={6} strokeLinecap="round" />
                  </>
                ) : (
                  <polyline points="33,55 42,65 60,44" stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
              <p style={{ fontFamily: FONT_BODY, fontSize: 17, textAlign: 'center', color: isSkipping ? '#EF4444' : ACCENT, margin: 0, fontWeight: 700 }}>{isSkipping ? 'SKIP' : 'WIN'}</p>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 230, left: 60, right: 60, background: '#1E293B', borderRadius: 20, padding: '22px 28px', opacity: mathOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#9CA3AF', margin: '0 0 14px', textAlign: 'center' }}>$60K salary → 10% contribution per year</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>$6,000</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 19, color: '#6B7280', margin: '4px 0 0' }}>YOU PAY</p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 44, color: ACCENT, margin: 0 }}>→</p>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0 }}>${(6000 + displayAmount).toLocaleString()}</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 19, color: '#6B7280', margin: '4px 0 0' }}>STOCK VALUE</p>
          </div>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, margin: '14px 0 0', textAlign: 'center' }}>+${displayAmount.toLocaleString()} FREE</p>
      </div>

      <div style={{ position: 'absolute', bottom: 70, width: '100%', opacity: bottomOpacity }}>
        <p style={{ ...headline(32, WHITE), lineHeight: 1.3 }}>LEFT ON THE TABLE</p>
        <p style={{ ...headline(32, '#EF4444'), lineHeight: 1.3 }}>EVERY SINGLE YEAR</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 100 } });
  const checkScale = spring({ frame: frame - 110, fps, config: { damping: 10, stiffness: 200 } });
  const stat1Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Opacity = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 155, fps, config: { damping: 14, stiffness: 150 } });

  const cs = Math.min(1, checkScale);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', opacity: titleOpacity }}>
        <p style={{ ...headline(44, BLACK), lineHeight: 1.2 }}>15 MINUTES.</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2 }}>$1,000+ A YEAR. FREE.</p>
      </div>

      <div style={{ position: 'absolute', top: 285, width: '100%', display: 'flex', justifyContent: 'center', transform: `scale(${phoneScale})` }}>
        <svg width={290} height={410} viewBox="0 0 290 410">
          <rect x={10} y={10} width={270} height={390} rx={28} fill="#1E293B" stroke="#374151" strokeWidth={3} />
          <rect x={22} y={28} width={246} height={354} rx={16} fill="#0F172A" />
          <rect x={110} y={18} width={70} height={14} rx={7} fill="#374151" />
          <rect x={22} y={28} width={246} height={54} rx={16} fill="#1D4ED8" />
          <text x={145} y={62} textAnchor="middle" fill="white" fontSize={19} fontFamily="Arial Black">HR PORTAL</text>
          <rect x={34} y={94} width={222} height={188} rx={12} fill="#1E293B" stroke="#10B981" strokeWidth={2.5} />
          <text x={145} y={124} textAnchor="middle" fill={ACCENT} fontSize={16} fontFamily="Arial Black">EMPLOYEE STOCK</text>
          <text x={145} y={144} textAnchor="middle" fill={ACCENT} fontSize={16} fontFamily="Arial Black">PURCHASE PLAN</text>
          <line x1={48} y1={154} x2={242} y2={154} stroke="#374151" strokeWidth={1.5} />
          <text x={50} y={178} fill="#9CA3AF" fontSize={14} fontFamily="Arial">Contribution:</text>
          <text x={238} y={178} fill="white" fontSize={14} fontFamily="Arial Black" textAnchor="end">10% of salary</text>
          <text x={50} y={202} fill="#9CA3AF" fontSize={14} fontFamily="Arial">Discount:</text>
          <text x={238} y={202} fill={ACCENT} fontSize={14} fontFamily="Arial Black" textAnchor="end">15% OFF</text>
          <text x={50} y={226} fill="#9CA3AF" fontSize={14} fontFamily="Arial">Lookback:</text>
          <text x={238} y={226} fill={ACCENT} fontSize={14} fontFamily="Arial Black" textAnchor="end">Included</text>
          <rect x={52} y={242} width={176} height={26} rx={8} fill={ACCENT} />
          <text x={140} y={261} textAnchor="middle" fill="black" fontSize={14} fontFamily="Arial Black">ENROLL NOW</text>
          <text x={48} y={304} fill="#9CA3AF" fontSize={13} fontFamily="Arial">1. Open HR Portal</text>
          <text x={48} y={324} fill="#9CA3AF" fontSize={13} fontFamily="Arial">2. Find "ESPP" in Benefits</text>
          <text x={48} y={344} fill="#9CA3AF" fontSize={13} fontFamily="Arial">3. Set contribution %</text>
          <text x={48} y={364} fill="#9CA3AF" fontSize={13} fontFamily="Arial">4. Done in 15 minutes</text>
          <circle cx={234} cy={88} r={38} fill="#10B981" opacity={cs} />
          <polyline points="218,88 230,100 252,74" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={cs} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 240, width: '100%', opacity: stat1Opacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: BLACK, textAlign: 'center', margin: 0, fontWeight: 700 }}>Next enrollment: check your HR portal</p>
      </div>
      <div style={{ position: 'absolute', bottom: 185, width: '100%', opacity: stat2Opacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#6B7280', textAlign: 'center', margin: 0 }}>Sell same day. Lock in 17.6%. Done.</p>
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 60, right: 60, background: BLACK, borderRadius: 20, padding: '24px 32px', transform: `scale(${ctaScale})`, transformOrigin: 'center' }}>
        <p style={{ ...headline(38, ACCENT), lineHeight: 1.3 }}>FREE MONEY IS WAITING</p>
        <p style={{ ...headline(38, WHITE), lineHeight: 1.3 }}>GO CLAIM IT TODAY</p>
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
