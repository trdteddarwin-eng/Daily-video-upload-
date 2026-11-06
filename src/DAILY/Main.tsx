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
  padding: 0,
  lineHeight: 1.1,
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

  const phoneY = interpolate(frame, [0, 25], [250, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 100 } });
  const billsOpacity = interpolate(frame, [70, 95], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emptyOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const questionOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <p style={{ ...headline(44, ACCENT) }}>THE BENEFIT CLIFF</p>

        <svg width="180" height="300" viewBox="0 0 180 300" style={{ transform: `translateY(${phoneY}px)` }}>
          <rect x="10" y="5" width="160" height="290" rx="22" fill="#1E1E1E" stroke="#444" strokeWidth="2"/>
          <rect x="20" y="25" width="140" height="230" rx="8" fill="#0D0D1A"/>
          <circle cx="90" cy="272" r="10" fill="#2A2A2A"/>
          <g style={{ transform: `scale(${badgeScale})`, transformOrigin: '90px 140px' }}>
            <rect x="25" y="90" width="130" height="90" rx="12" fill="#15803D"/>
            <text x="90" y="116" textAnchor="middle" fill="white" fontFamily="Arial" fontWeight="bold" fontSize="11">YOU GOT A RAISE</text>
            <text x="90" y="143" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="22">+$2,000</text>
            <text x="90" y="166" textAnchor="middle" fill="#86EFAC" fontFamily="Arial" fontSize="11">per year</text>
          </g>
        </svg>

        <svg width="180" height="90" viewBox="0 0 180 90">
          <rect x="5" y="12" width="170" height="73" rx="10" fill="#92400E" stroke="#F59E0B" strokeWidth="2"/>
          <rect x="5" y="8" width="170" height="38" rx="10" fill="#B45309"/>
          <g opacity={billsOpacity}>
            <rect x="18" y="10" width="60" height="9" rx="3" fill="#10B981"/>
            <rect x="26" y="16" width="60" height="9" rx="3" fill="#10B981" opacity={0.7}/>
          </g>
          <text x="90" y="62" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="20" opacity={emptyOpacity}>EMPTY</text>
        </svg>

        <p style={{ ...headline(30, WHITE), opacity: questionOpacity }}>
          MORE PAY = LESS MONEY?
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const personX = interpolate(frame, [5, 60], [80, 345], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cliffOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billsY = interpolate(frame, [65, 160], [0, -200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billsOpacity = interpolate(frame, [65, 170], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cliffEdgeX = 390;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110 }}>
        <p style={{ ...headline(40, BLACK), marginBottom: 8 }}>HOW IT WORKS</p>
        <p style={{ ...headline(28, ACCENT), marginBottom: 24 }}>THE ACA SUBSIDY CLIFF</p>

        <svg width="860" height="440" viewBox="0 0 860 440">
          <rect x="40" y="310" width={cliffEdgeX - 40} height="22" fill="#9CA3AF" opacity={cliffOpacity}/>
          <rect x={cliffEdgeX} y="310" width="20" height="130" fill="#6B7280" opacity={cliffOpacity}/>
          <rect x={cliffEdgeX + 20} y="430" width="400" height="10" fill="#6B7280" opacity={cliffOpacity}/>
          <g opacity={cliffOpacity}>
            <rect x={cliffEdgeX - 95} y="238" width="210" height="64" rx="10" fill={ACCENT}/>
            <text x={cliffEdgeX + 10} y="264" textAnchor="middle" fill="white" fontFamily="Arial Black" fontSize="15">400% FPL</text>
            <text x={cliffEdgeX + 10} y="287" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="13">= $58,320 / yr</text>
          </g>
          <g transform={`translate(${personX}, 212)`}>
            <circle cx="0" cy="0" r="22" fill={BLACK}/>
            <rect x="-14" y="22" width="28" height="48" rx="6" fill={BLACK}/>
            <rect x="-38" y="28" width="24" height="10" rx="4" fill={BLACK}/>
            <rect x="14" y="28" width="24" height="10" rx="4" fill={BLACK}/>
            <rect x="-14" y="68" width="11" height="32" rx="4" fill={BLACK}/>
            <rect x="3" y="68" width="11" height="32" rx="4" fill={BLACK}/>
          </g>
          <g opacity={billsOpacity} transform={`translate(0, ${billsY})`}>
            <text x={cliffEdgeX + 50} y="290" fill="#10B981" fontFamily="Arial Black" fontSize="36">$</text>
            <text x={cliffEdgeX + 120} y="310" fill="#10B981" fontFamily="Arial Black" fontSize="28">$</text>
            <text x={cliffEdgeX + 190} y="275" fill="#10B981" fontFamily="Arial Black" fontSize="32">$</text>
          </g>
        </svg>

        <p style={{ ...headline(26, BLACK), opacity: labelOpacity }}>
          CROSS THE LINE — SUBSIDY GONE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 100 } });
  const arrowOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightScale = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 100 } });
  const textOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <p style={{ ...headline(40, WHITE), marginBottom: 10 }}>THE MATH</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <div style={{
            background: '#052e16',
            border: '3px solid #10B981',
            borderRadius: 16,
            padding: '28px 32px',
            textAlign: 'center' as const,
            transform: `scale(${leftScale})`,
            width: 270,
          }}>
            <p style={{ ...headline(26, '#10B981'), marginBottom: 8 }}>$58,320 / yr</p>
            <p style={{ ...headline(14, WHITE), marginBottom: 16 }}>UNDER THE LIMIT</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#10B981', margin: 0 }}>SUBSIDY</p>
            <p style={{ fontFamily: FONT, fontSize: 36, color: '#10B981', margin: 0, fontWeight: 'bold' }}>+$3,200</p>
          </div>

          <div style={{ opacity: arrowOpacity, textAlign: 'center' as const }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>+$1</p>
            <p style={{ fontFamily: FONT, fontSize: 48, color: ACCENT, margin: 0 }}>&#8594;</p>
          </div>

          <div style={{
            background: '#450a0a',
            border: `3px solid ${ACCENT}`,
            borderRadius: 16,
            padding: '28px 32px',
            textAlign: 'center' as const,
            transform: `scale(${rightScale})`,
            width: 270,
          }}>
            <p style={{ ...headline(26, ACCENT), marginBottom: 8 }}>$58,321 / yr</p>
            <p style={{ ...headline(14, WHITE), marginBottom: 16 }}>OVER THE LIMIT</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0 }}>NO SUBSIDY</p>
            <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0, fontWeight: 'bold' }}>-$3,200</p>
          </div>
        </div>

        <p style={{ ...headline(26, WHITE), opacity: textOpacity, marginTop: 10 }}>
          ONE DOLLAR. THREE THOUSAND GONE.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { label: 'HEALTH', sublabel: 'ACA Subsidies', color: '#EF4444', value: '$3,200' },
    { label: 'FOOD', sublabel: 'SNAP Benefits', color: '#F59E0B', value: '$2,100' },
    { label: 'HOUSING', sublabel: 'Housing Vouchers', color: '#3B82F6', value: '$4,800' },
    { label: 'CHILDCARE', sublabel: 'CCDF Subsidies', color: '#8B5CF6', value: '$2,400' },
  ];

  const totalOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <p style={{ ...headline(40, BLACK), marginBottom: 4 }}>NOT JUST HEALTH</p>
        <p style={{ ...headline(26, ACCENT), marginBottom: 16 }}>FOUR MAJOR BENEFIT CLIFFS</p>

        {benefits.map((b, i) => {
          const cardScale = spring({ frame: frame - i * 25, fps, config: { damping: 14, stiffness: 100 } });
          const lossOpacity = interpolate(frame, [30 + i * 20, 50 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              background: 'white',
              border: `3px solid ${b.color}`,
              borderRadius: 14,
              padding: '16px 28px',
              width: 760,
              transform: `scale(${cardScale})`,
              gap: 20,
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: FONT, fontSize: 22, color: b.color, margin: 0, letterSpacing: '0.08em' }}>{b.label}</p>
                <p style={{ fontFamily: 'Arial', fontSize: 15, color: '#555', margin: 0, marginTop: 2 }}>{b.sublabel}</p>
              </div>
              <div style={{ textAlign: 'right' as const, opacity: lossOpacity }}>
                <p style={{ fontFamily: FONT, fontSize: 13, color: '#777', margin: 0 }}>ANNUAL LOSS</p>
                <p style={{ fontFamily: FONT, fontSize: 30, color: b.color, margin: 0, fontWeight: 'bold' }}>-{b.value}</p>
              </div>
            </div>
          );
        })}

        <div style={{
          background: '#1A1A1A',
          borderRadius: 14,
          padding: '16px 28px',
          width: 760,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: totalOpacity,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>TOTAL POSSIBLE LOSS</p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>-$12,500</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gridOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const highlightOpacity = spring({ frame: frame - 70, fps, config: { damping: 10, stiffness: 80 } });
  const textOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rows = 5;
  const cols = 10;
  const totalPeople = rows * cols;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <p style={{ ...headline(44, WHITE), opacity: titleOpacity }}>50 MILLION AMERICANS</p>
        <p style={{ ...headline(28, ACCENT), opacity: titleOpacity }}>NEAR A BENEFIT CLIFF</p>

        <svg width="900" height="300" viewBox="0 0 900 300" opacity={gridOpacity}>
          {Array.from({ length: Math.max(0, Math.floor(totalPeople)) }, (_, idx) => {
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const cx = 50 + col * 80;
            const cy = 40 + row * 55;
            const isAtRisk = col >= 7;
            const personColor = isAtRisk ? ACCENT : '#4B5563';
            return (
              <g key={idx} transform={`translate(${cx}, ${cy})`}>
                <circle cx="0" cy="0" r="12" fill={personColor}/>
                <rect x="-7" y="12" width="14" height="20" rx="4" fill={personColor}/>
                <rect x="-18" y="14" width="11" height="6" rx="2" fill={personColor}/>
                <rect x="7" y="14" width="11" height="6" rx="2" fill={personColor}/>
              </g>
            );
          })}
          <line x1="720" y1="5" x2="720" y2="295" stroke={ACCENT} strokeWidth="3" strokeDasharray="10,8" opacity={highlightOpacity}/>
          <text x="730" y="22" fill={ACCENT} fontFamily="Arial" fontWeight="bold" fontSize="13" opacity={highlightOpacity}>CLIFF</text>
        </svg>

        <p style={{ ...headline(22, WHITE), opacity: textOpacity }}>
          A RAISE SMALLER THAN YOUR LOSS IS A PAY CUT
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const rawChars = interpolate(frame, [40, 110], [0, 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textChars = Math.max(0, Math.floor(rawChars));
  const ctaOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const resultsOpacity = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const searchText = 'benefit cliff calculator';
  const displayText = searchText.slice(0, textChars);
  const showCursor = frame > 40 && frame < 115;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <p style={{ ...headline(40, BLACK), marginBottom: 4 }}>THE FIX IS FREE</p>
        <p style={{ ...headline(26, ACCENT), marginBottom: 16 }}>KNOW YOUR NUMBER FIRST</p>

        <svg width="300" height="440" viewBox="0 0 300 440" style={{ transform: `scale(${phoneScale})` }}>
          <rect x="10" y="10" width="280" height="420" rx="30" fill="#1A1A1A" stroke="#444" strokeWidth="2"/>
          <rect x="22" y="40" width="256" height="360" rx="10" fill="#F8FAFC"/>
          <circle cx="150" cy="425" r="8" fill="#333"/>
          <rect x="32" y="55" width="236" height="40" rx="20" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
          <text x="52" y="80" fill="#374151" fontFamily="Arial" fontSize="13">
            {displayText}{showCursor ? '|' : ''}
          </text>
          <g opacity={resultsOpacity}>
            <rect x="32" y="108" width="236" height="50" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="42" y="128" fill="#1D4ED8" fontFamily="Arial" fontSize="11" fontWeight="bold">Benefit Cliff Calculator</text>
            <text x="42" y="148" fill="#6B7280" fontFamily="Arial" fontSize="10">benefits.gov — Free Tool</text>
            <rect x="32" y="168" width="236" height="50" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="42" y="188" fill="#1D4ED8" fontFamily="Arial" fontSize="11" fontWeight="bold">ACA Subsidy Calculator</text>
            <text x="42" y="208" fill="#6B7280" fontFamily="Arial" fontSize="10">KFF.org — Free</text>
            <rect x="32" y="228" width="236" height="50" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="42" y="248" fill="#1D4ED8" fontFamily="Arial" fontSize="11" fontWeight="bold">Income Benefit Threshold Finder</text>
            <text x="42" y="268" fill="#6B7280" fontFamily="Arial" fontSize="10">Urban Institute — Free</text>
          </g>
        </svg>

        <div style={{ opacity: ctaOpacity, textAlign: 'center' as const }}>
          <p style={{ ...headline(26, BLACK), marginBottom: 8 }}>SEARCH BEFORE YOU ACCEPT</p>
          <p style={{ ...headline(22, ACCENT) }}>BENEFIT CLIFF CALCULATOR</p>
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
