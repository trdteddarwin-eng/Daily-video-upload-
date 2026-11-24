import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

  const houseS = spring({ frame, fps, config: { damping: 14, stiffness: 100, mass: 0.9 } });
  const houseY = interpolate(houseS, [0, 1], [80, 0]);
  const equityS = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 12, stiffness: 90 } });
  const chartP = interpolate(frame, [70, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [125, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dotX = 40 + chartP * 870;
  const dotY = 128 - chartP * 108;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #0b2419 0%, #121212 65%)' }} />
      {/* Title */}
      <div style={{ position: 'absolute', top: 110, left: 60, right: 60, textAlign: 'center' }}>
        <p style={headline(44, WHITE)}>YOUR HOME EQUITY</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>ISN'T WHAT</p>
        <p style={{ ...headline(44, WHITE), marginTop: 8 }}>YOU THINK</p>
      </div>
      {/* House */}
      <div style={{ position: 'absolute', top: 350, left: '50%', transform: `translateX(-50%) translateY(${houseY}px) scale(${houseS})` }}>
        <svg width="260" height="234" viewBox="0 0 260 234">
          <polygon points="130,16 8,124 252,124" fill={ACCENT} />
          <rect x="28" y="124" width="204" height="110" fill="#184038" />
          <rect x="102" y="178" width="56" height="56" rx="4" fill={BG_DARK} />
          <rect x="44" y="143" width="48" height="40" rx="3" fill={ACCENT} opacity={0.3} />
          <rect x="168" y="143" width="48" height="40" rx="3" fill={ACCENT} opacity={0.3} />
          <circle cx="153" cy="208" r="4" fill={ACCENT} />
        </svg>
      </div>
      {/* Rising chart */}
      <div style={{ position: 'absolute', top: 640, left: 60, right: 60 }}>
        <svg width="960" height="145" viewBox="0 0 960 145" style={{ width: '100%' }}>
          <clipPath id="c1">
            <rect x="0" y="0" width={40 + chartP * 920} height="145" />
          </clipPath>
          <line x1="40" y1="130" x2="930" y2="130" stroke="#2a2a2a" strokeWidth="2" />
          <polyline
            points="40,126 180,110 380,88 580,62 760,36 910,18"
            fill="none"
            stroke={ACCENT}
            strokeWidth="4"
            strokeLinecap="round"
            clipPath="url(#c1)"
          />
          <circle cx={dotX} cy={dotY} r="7" fill={ACCENT} />
        </svg>
      </div>
      {/* Equity number */}
      <div style={{ position: 'absolute', top: 840, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${equityS})` }}>
        <p style={headline(28, '#777')}>PAPER EQUITY</p>
        <p style={{ ...headline(100, ACCENT), marginTop: 4 }}>$100K</p>
      </div>
      {/* Subtext */}
      <div style={{ position: 'absolute', top: 1095, left: 80, right: 80, textAlign: 'center', opacity: subOp }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: '#cccccc', fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
          But there are 4 cuts waiting<br />when you go to sell.
        </p>
      </div>
      {/* 4 circles */}
      <div style={{ position: 'absolute', top: 1380, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 28, opacity: subOp }}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{ width: 60, height: 60, borderRadius: '50%', border: `3px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>{n}</span>
          </div>
        ))}
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const agentS = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 90 } });
  const amtS = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 80 } });
  const tallyOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Badge + header */}
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${headerS})` }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>1</span>
        </div>
        <p style={{ ...headline(44, BLACK), marginTop: 20 }}>REALTOR</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>COMMISSION</p>
      </div>
      {/* Two agents with money bags */}
      <div style={{ position: 'absolute', top: 440, left: '50%', transform: `translateX(-50%) scale(${agentS})`, display: 'flex', gap: 90 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="80" height="118" viewBox="0 0 80 118">
              <circle cx="40" cy="24" r="22" fill={i === 0 ? '#333' : '#555'} />
              <rect x="14" y="50" width="52" height="60" rx="10" fill={i === 0 ? '#333' : '#555'} />
            </svg>
            <svg width="68" height="78" viewBox="0 0 68 78" style={{ marginTop: 6 }}>
              <ellipse cx="34" cy="54" rx="27" ry="22" fill={ACCENT} />
              <rect x="25" y="20" width="18" height="13" rx="4" fill={ACCENT} />
              <ellipse cx="34" cy="20" rx="10" ry="7" fill="#0d9e70" />
              <text x="34" y="61" textAnchor="middle" fill="white" fontSize="20" fontFamily="Arial Black,Arial">$</text>
            </svg>
          </div>
        ))}
      </div>
      {/* Amount */}
      <div style={{ position: 'absolute', top: 870, left: 0, right: 0, textAlign: 'center', transform: `scale(${amtS})` }}>
        <p style={{ ...headline(30, '#888'), marginBottom: 10 }}>5–6% OF SALE PRICE</p>
        <p style={headline(88, '#EF4444')}>–$23,100</p>
      </div>
      {/* Tally */}
      <div style={{ position: 'absolute', top: 1120, left: 60, right: 60, opacity: tallyOp }}>
        <div style={{ background: '#ebebeb', borderRadius: 24, padding: '28px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 34, color: '#aaa', textDecoration: 'line-through' }}>$100,000</span>
            <span style={{ fontFamily: FONT, fontSize: 26, color: '#888' }}>agent fees</span>
          </div>
          <div style={{ height: 2, background: '#d0d0d0', margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 48, color: BLACK, letterSpacing: '0.05em' }}>$76,900</span>
            <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>remaining</span>
          </div>
        </div>
      </div>
      {/* Footnote */}
      <div style={{ position: 'absolute', top: 1390, left: 80, right: 80, textAlign: 'center', opacity: tallyOp }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#888', fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
          On a $420K median home — before<br />you've packed a single box.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const docsS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 95 } });
  const amtS = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 10, stiffness: 80 } });
  const tallyOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #1a1218 0%, #121212 65%)' }} />
      {/* Badge + header */}
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${headerS})` }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>2</span>
        </div>
        <p style={{ ...headline(44, WHITE), marginTop: 20 }}>CLOSING</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>COSTS</p>
      </div>
      {/* Documents stack */}
      <div style={{ position: 'absolute', top: 420, left: '50%', transform: `translateX(-50%) scale(${docsS})` }}>
        <svg width="260" height="220" viewBox="0 0 260 220">
          <rect x="40" y="30" width="180" height="140" rx="8" fill="#2a2a2a" transform="rotate(-6 130 100)" />
          <rect x="40" y="30" width="180" height="140" rx="8" fill="#333" transform="rotate(-2 130 100)" />
          <rect x="40" y="30" width="180" height="140" rx="8" fill="#3a3a3a" />
          <line x1="65" y1="68" x2="195" y2="68" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="88" x2="195" y2="88" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="108" x2="150" y2="108" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="128" x2="170" y2="128" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <rect x="128" y="138" width="80" height="34" rx="4" fill="none" stroke="#EF4444" strokeWidth="3" transform="rotate(-10 168 155)" />
          <text x="168" y="161" textAnchor="middle" fill="#EF4444" fontSize="18" fontFamily="Arial Black,Arial" fontWeight="bold" transform="rotate(-10 168 155)">FEES</text>
        </svg>
      </div>
      {/* Amount */}
      <div style={{ position: 'absolute', top: 860, left: 0, right: 0, textAlign: 'center', transform: `scale(${amtS})` }}>
        <p style={{ ...headline(30, '#777'), marginBottom: 10 }}>1–3% OF SALE PRICE</p>
        <p style={headline(88, '#EF4444')}>–$8,400</p>
      </div>
      {/* Items */}
      <div style={{ position: 'absolute', top: 1060, left: 80, right: 80, opacity: tallyOp }}>
        {['Transfer taxes', 'Title insurance', 'Attorney & escrow fees'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: ACCENT, marginRight: 18, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT, fontSize: 30, color: '#ccc', fontWeight: 'normal', textTransform: 'none' }}>{item}</span>
          </div>
        ))}
      </div>
      {/* Tally */}
      <div style={{ position: 'absolute', top: 1310, left: 60, right: 60, opacity: tallyOp }}>
        <div style={{ background: '#1e1e1e', borderRadius: 24, padding: '28px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 34, color: '#555', textDecoration: 'line-through' }}>$76,900</span>
            <span style={{ fontFamily: FONT, fontSize: 26, color: '#666' }}>closing costs</span>
          </div>
          <div style={{ height: 2, background: '#333', margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 48, color: WHITE, letterSpacing: '0.05em' }}>$68,500</span>
            <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>remaining</span>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const houseS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 95 } });
  const amtS = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 80 } });
  const tallyOp = interpolate(frame, [115, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Badge + header */}
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${headerS})` }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>3</span>
        </div>
        <p style={{ ...headline(44, BLACK), marginTop: 20 }}>PRE-SALE</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 6 }}>REPAIRS</p>
      </div>
      {/* House with tools */}
      <div style={{ position: 'absolute', top: 400, left: '50%', transform: `translateX(-50%) scale(${houseS})` }}>
        <svg width="300" height="260" viewBox="0 0 300 260">
          <polygon points="150,16 20,120 280,120" fill={ACCENT} opacity={0.7} />
          <rect x="38" y="120" width="224" height="110" fill="#e0e0e0" />
          <rect x="118" y="170" width="64" height="60" rx="4" fill="#bbb" />
          <rect x="52" y="136" width="52" height="44" rx="3" fill="white" />
          <rect x="196" y="136" width="52" height="44" rx="3" fill="white" />
          {/* Hammer handle */}
          <rect x="223" y="88" width="9" height="46" rx="4" fill="#5a3010" transform="rotate(28 227 111)" />
          {/* Hammer head */}
          <rect x="210" y="74" width="30" height="16" rx="4" fill="#444" transform="rotate(28 225 82)" />
          {/* Wrench */}
          <rect x="58" y="92" width="8" height="42" rx="3" fill="#555" transform="rotate(-22 62 113)" />
          <ellipse cx="58" cy="88" rx="11" ry="7" fill="#555" transform="rotate(-22 58 88)" />
        </svg>
      </div>
      {/* Amount */}
      <div style={{ position: 'absolute', top: 860, left: 0, right: 0, textAlign: 'center', transform: `scale(${amtS})` }}>
        <p style={{ ...headline(30, '#888'), marginBottom: 10 }}>AVERAGE SELLER SPEND</p>
        <p style={headline(88, '#EF4444')}>–$14,000</p>
      </div>
      {/* Repair items */}
      <div style={{ position: 'absolute', top: 1060, left: 80, right: 80, opacity: tallyOp }}>
        {['Inspection repairs', 'Painting & staging', 'Curb appeal upgrades'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', marginRight: 18, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT, fontSize: 30, color: '#555', fontWeight: 'normal', textTransform: 'none' }}>{item}</span>
          </div>
        ))}
      </div>
      {/* Tally */}
      <div style={{ position: 'absolute', top: 1310, left: 60, right: 60, opacity: tallyOp }}>
        <div style={{ background: '#ebebeb', borderRadius: 24, padding: '28px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 34, color: '#aaa', textDecoration: 'line-through' }}>$68,500</span>
            <span style={{ fontFamily: FONT, fontSize: 26, color: '#888' }}>repairs</span>
          </div>
          <div style={{ height: 2, background: '#d0d0d0', margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 48, color: BLACK, letterSpacing: '0.05em' }}>$54,500</span>
            <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>remaining</span>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const warningS = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 11, stiffness: 95 } });
  const rateS = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 80 } });
  const bodyOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, #1a1210 0%, #121212 65%)' }} />
      {/* Badge + header */}
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${headerS})` }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>4</span>
        </div>
        <p style={{ ...headline(44, WHITE), marginTop: 20 }}>CAPITAL</p>
        <p style={{ ...headline(44, '#EF4444'), marginTop: 6 }}>GAINS TAX</p>
      </div>
      {/* Warning triangle */}
      <div style={{ position: 'absolute', top: 418, left: '50%', transform: `translateX(-50%) scale(${warningS})` }}>
        <svg width="240" height="210" viewBox="0 0 240 210">
          <polygon points="120,10 10,200 230,200" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinejoin="round" />
          <text x="120" y="158" textAnchor="middle" fill="#F59E0B" fontSize="96" fontFamily="Arial Black,Arial">!</text>
        </svg>
      </div>
      {/* Rate badge */}
      <div style={{ position: 'absolute', top: 700, left: '50%', transform: `translateX(-50%) scale(${rateS})` }}>
        <div style={{ background: '#EF4444', borderRadius: 20, padding: '20px 50px', textAlign: 'center' }}>
          <p style={headline(80, WHITE)}>15–20%</p>
          <p style={{ ...headline(26, 'rgba(255,255,255,0.85)'), marginTop: 8 }}>OF GAINS ABOVE EXCLUSION</p>
        </div>
      </div>
      {/* Explanation */}
      <div style={{ position: 'absolute', top: 970, left: 60, right: 60, opacity: bodyOp }}>
        <div style={{ background: '#1e1e1e', borderRadius: 20, padding: '32px 36px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
            Single filers: gains above<br />
            <span style={{ color: '#F59E0B' }}>$250,000</span> get taxed.<br />
            Married filers: above <span style={{ color: '#F59E0B' }}>$500,000</span>.
          </p>
        </div>
      </div>
      {/* Bottom note */}
      <div style={{ position: 'absolute', top: 1310, left: 80, right: 80, textAlign: 'center', opacity: bodyOp }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#999', fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
          In hot markets, more sellers<br />are hitting this threshold now.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerS = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const item1S = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 90 } });
  const item2S = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 90 } });
  const item3S = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 90 } });
  const item4S = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 12, stiffness: 90 } });
  const finalS = spring({ frame: Math.max(0, frame - 108), fps, config: { damping: 10, stiffness: 75 } });
  const ctaOp = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items: { label: string; amt: string }[] = [
    { label: 'Realtor Commission', amt: '–$23,100' },
    { label: 'Closing Costs', amt: '–$8,400' },
    { label: 'Pre-Sale Repairs', amt: '–$14,000' },
    { label: 'Capital Gains Tax', amt: 'varies' },
  ];
  const scales = [item1S, item2S, item3S, item4S];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${headerS})` }}>
        <p style={{ ...headline(36, '#aaa'), textDecoration: 'line-through' }}>$100,000 EQUITY</p>
        <p style={{ ...headline(42, BLACK), marginTop: 12 }}>THE REAL NUMBER:</p>
      </div>
      {/* Line items */}
      <div style={{ position: 'absolute', top: 310, left: 60, right: 60 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, opacity: scales[i], transform: `translateX(${interpolate(scales[i], [0, 1], [-40, 0])}px)` }}>
            <span style={{ fontFamily: FONT, fontSize: 30, color: '#555', fontWeight: 'normal', textTransform: 'none' }}>{item.label}</span>
            <span style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', letterSpacing: '0.05em' }}>{item.amt}</span>
          </div>
        ))}
        <div style={{ height: 3, background: '#ccc', marginTop: 8 }} />
      </div>
      {/* Final amount */}
      <div style={{ position: 'absolute', top: 820, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${finalS})` }}>
        <p style={headline(32, '#888')}>YOU WALK AWAY WITH</p>
        <p style={{ ...headline(100, ACCENT), marginTop: 8 }}>$54,500</p>
        <p style={{ ...headline(28, '#888'), marginTop: 8 }}>NOT $100,000</p>
      </div>
      {/* CTA */}
      <div style={{ position: 'absolute', top: 1150, left: 60, right: 60, opacity: ctaOp }}>
        <div style={{ background: BLACK, borderRadius: 24, padding: '36px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
            Know your <span style={{ color: ACCENT }}>real number</span><br />before you decide to sell.
          </p>
        </div>
      </div>
      {/* Follow CTA */}
      <div style={{ position: 'absolute', top: 1450, left: 0, right: 0, textAlign: 'center', opacity: ctaOp }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#888', fontWeight: 'normal', lineHeight: 1.5, margin: 0, textTransform: 'none' }}>
          Follow for more money moves<br />they don't teach in school.
        </p>
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
