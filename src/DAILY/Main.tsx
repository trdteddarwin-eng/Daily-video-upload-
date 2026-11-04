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

  const buildSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const buildingY = interpolate(buildSpring, [0, 1], [300, 0]);

  const bannerX = interpolate(frame, [20, 50], [-900, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const crowdX = interpolate(frame, [30, 70], [-600, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const countVal = Math.floor(
    interpolate(frame, [60, 130], [0, 92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const statOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personXs = [160, 270, 380, 490, 600, 710, 820];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <g transform={`translate(0, ${buildingY})`}>
          <rect x="130" y="480" width="820" height="800" rx="10" fill="#1C1C1C" />
          <rect x="130" y="680" width="820" height="6" fill="#2A2A2A" />
          {[0, 1, 2, 3].map(i => (
            <rect key={`w1-${i}`} x={160 + i * 195} y={510} width={150} height={130} rx={6} fill="#252525" stroke="#333" strokeWidth={2} />
          ))}
          {[0, 1, 2, 3].map(i => (
            <rect key={`w2-${i}`} x={160 + i * 195} y={700} width={150} height={130} rx={6} fill="#252525" stroke="#333" strokeWidth={2} />
          ))}
          <rect x="430" y="1100" width="220" height="180" rx={6} fill="#222" stroke="#444" strokeWidth={2} />
          <rect x="438" y="1108" width="96" height="164" rx={4} fill="#1A1A1A" />
          <rect x="542" y="1108" width="96" height="164" rx={4} fill="#1A1A1A" />
          <circle cx="540" cy="1192" r="10" fill="#555" />
        </g>

        <g transform={`translate(${bannerX}, ${buildingY})`}>
          <rect x="80" y="430" width="920" height="90" rx={8} fill={ACCENT} />
          <text
            x="540"
            y="490"
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={42}
            fill={BLACK}
            fontWeight="900"
            letterSpacing="6"
          >BLACK FRIDAY SALE</text>
        </g>

        <g transform={`translate(${crowdX}, 0)`}>
          {personXs.map((px, i) => {
            const sc = 0.85 + (i % 3) * 0.08;
            return (
              <g key={i} transform={`translate(${px}, 1310) scale(${sc})`}>
                <circle cx={0} cy={-85} r={28} fill="#3A3A3A" />
                <rect x={-23} y={-55} width={46} height={72} rx={10} fill="#3A3A3A" />
                <rect x={-28} y={16} width={20} height={58} rx={8} fill="#303030" />
                <rect x={8} y={16} width={20} height={58} rx={8} fill="#303030" />
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{ position: 'absolute', bottom: 320, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: statOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 220, color: ACCENT, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
          {countVal}%
        </div>
        <div style={{ fontFamily: FONT, fontSize: 42, color: WHITE, letterSpacing: '0.12em', textTransform: 'uppercase' as const, textAlign: 'center' as const, maxWidth: 820, lineHeight: 1.3 }}>
          OF "DEALS" ARE CHEAPER<br />SOMEWHERE ELSE
        </div>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const tagSpring = spring({ frame, fps: 30, config: { damping: 12, stiffness: 90 } });
  const tagScale = interpolate(tagSpring, [0, 1], [0.4, 1]);

  const octOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stickerSpring = spring({ frame: Math.max(0, frame - 80), fps: 30, config: { damping: 10, stiffness: 180 } });
  const stickerScale = interpolate(stickerSpring, [0, 1], [2.2, 1]);
  const stickerOpacity = interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const noteOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={headline(34, '#888')}>THE PRICE INFLATION TRICK</div>
      </div>

      <div style={{ position: 'absolute', top: 260, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          width={500}
          height={560}
          viewBox="0 0 500 560"
          style={{ transform: `scale(${tagScale})`, transformOrigin: 'center' }}
        >
          <rect x="40" y="20" width="420" height="500" rx="20" fill="white" stroke="#DDD" strokeWidth="3" />
          <circle cx="250" cy="60" r="22" fill="#F0F0F0" stroke="#DDD" strokeWidth="2" />
          <circle cx="250" cy="60" r="12" fill="white" stroke="#CCC" strokeWidth="1" />
          <line x1="250" y1="10" x2="250" y2="38" stroke="#BBB" strokeWidth="2" />

          <g opacity={octOpacity}>
            <text x="250" y="185" textAnchor="middle" fontFamily={FONT} fontSize={26} fill="#AAA" letterSpacing="2">INFLATED IN OCTOBER</text>
            <text x="250" y="310" textAnchor="middle" fontFamily={FONT} fontSize={120} fill={BLACK} fontWeight="900">$400</text>
            <text x="250" y="370" textAnchor="middle" fontFamily={FONT} fontSize={26} fill="#AAA">— not the real price</text>
          </g>

          <g
            opacity={stickerOpacity}
            transform={`translate(250, 265) scale(${stickerScale}) translate(-130, -65)`}
          >
            <ellipse cx="130" cy="65" rx="140" ry="95" fill={ACCENT} />
            <text x="130" y="45" textAnchor="middle" fontFamily={FONT} fontSize={36} fill={BLACK} fontWeight="900">50% OFF!</text>
            <text x="130" y="100" textAnchor="middle" fontFamily={FONT} fontSize={58} fill={BLACK} fontWeight="900">$200</text>
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 240, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: noteOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 38, color: BLACK, letterSpacing: '0.08em', textTransform: 'uppercase' as const, textAlign: 'center' as const, lineHeight: 1.4, maxWidth: 860 }}>
          RETAILERS INFLATE PRICES<br />30–45 DAYS BEFORE
        </div>
        <div style={{ fontFamily: FONT, fontSize: 28, color: '#888', marginTop: 18, letterSpacing: '0.06em' }}>
          THEN "DISCOUNT" TO THE ORIGINAL
        </div>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const brainSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const brainScale = interpolate(brainSpring, [0, 1], [0.5, 1]);

  const annotOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pulseAmt = interpolate(
    frame,
    [70, 82, 94, 106, 118, 130, 142, 225],
    [1, 1.06, 1, 1.06, 1, 1.06, 1, 1],
    { extrapolateRight: 'clamp' }
  );
  const warnY = interpolate(frame, [60, 90], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={headline(34, '#888')}>HOW YOUR BRAIN GETS HIJACKED</div>
      </div>

      <div style={{ position: 'absolute', top: 310, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          width={400}
          height={380}
          viewBox="0 0 400 380"
          style={{ transform: `scale(${brainScale})`, transformOrigin: 'center' }}
        >
          <path
            d="M200 340 C95 340 35 272 35 196 C35 154 56 122 88 107 C77 80 88 48 118 43 C112 18 138 8 158 20 C173 8 195 13 200 30 C205 13 227 8 242 20 C262 8 288 18 282 43 C312 48 323 80 312 107 C344 122 365 154 365 196 C365 272 305 340 200 340Z"
            fill="#222"
            stroke={ACCENT}
            strokeWidth={3}
          />
          <path d="M140 105 Q160 85 182 105 Q202 125 222 105 Q242 85 262 105" fill="none" stroke="#333" strokeWidth={4} />
          <path d="M110 162 Q140 142 170 162 Q200 182 230 162 Q260 142 290 162" fill="none" stroke="#333" strokeWidth={4} />
          <path d="M128 222 Q158 202 200 212 Q242 202 272 222" fill="none" stroke="#333" strokeWidth={4} />
          <ellipse cx="200" cy="198" rx="48" ry="36" fill={ACCENT} opacity={0.25} />
          <ellipse cx="200" cy="198" rx="22" ry="16" fill={ACCENT} opacity={0.8} />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 700, width: '100%', display: 'flex', justifyContent: 'center', opacity: annotOpacity }}>
        <div style={{ background: '#1E1E1E', border: `2px solid ${ACCENT}`, borderRadius: 14, padding: '14px 40px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: FONT, fontSize: 48, color: ACCENT, letterSpacing: '0.08em' }}>{'< 300ms'}</span>
          <span style={{ fontFamily: FONT, fontSize: 28, color: '#777' }}>FEAR RESPONSE</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 260,
          left: 70,
          right: 70,
          background: '#1A0808',
          border: `3px solid ${RED}`,
          borderRadius: 18,
          padding: '30px 36px',
          transform: `scale(${pulseAmt}) translateY(${warnY}px)`,
          opacity: warnOpacity,
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 52, color: RED, letterSpacing: '0.08em', textAlign: 'center' as const, textTransform: 'uppercase' as const }}>
          ⚠ ONLY 2 LEFT!
        </div>
        <div style={{ fontFamily: FONT, fontSize: 30, color: '#777', textAlign: 'center' as const, marginTop: 12 }}>
          DEAL ENDS IN 02:47:13
        </div>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 20], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1 = interpolate(frame, [30, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2 = interpolate(frame, [60, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const count1 = Math.floor(interpolate(frame, [30, 100], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const count2 = Math.floor(interpolate(frame, [60, 150], [0, 496], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const sourceOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarH = 560;
  const bar1H = Math.max(4, bar1 * maxBarH * (200 / 496));
  const bar2H = Math.max(4, bar2 * maxBarH);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${titleY}px)` }}>
        <div style={headline(32, '#888')}>WHAT ACTUALLY HAPPENS</div>
        <div style={{ fontFamily: FONT, fontSize: 50, color: BLACK, marginTop: 18, letterSpacing: '0.08em', textTransform: 'uppercase' as const, textAlign: 'center' as const }}>
          YOUR BLACK FRIDAY BUDGET
        </div>
      </div>

      <div style={{ position: 'absolute', top: 460, left: 100, right: 100, display: 'flex', gap: 60, alignItems: 'flex-end', height: maxBarH + 90 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: FONT, fontSize: 58, color: GREEN, letterSpacing: '0.04em', marginBottom: 14 }}>${count1}</div>
          <div style={{ width: '100%', height: bar1H, background: GREEN, borderRadius: '14px 14px 0 0' }} />
          <div style={{ fontFamily: FONT, fontSize: 32, color: '#555', marginTop: 18, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>PLANNED</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: FONT, fontSize: 58, color: ACCENT, letterSpacing: '0.04em', marginBottom: 14 }}>${count2}</div>
          <div style={{ width: '100%', height: bar2H, background: ACCENT, borderRadius: '14px 14px 0 0' }} />
          <div style={{ fontFamily: FONT, fontSize: 32, color: '#555', marginTop: 18, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>ACTUAL</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 150, width: '100%', display: 'flex', justifyContent: 'center', opacity: sourceOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 28, color: '#AAA', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
          NATIONAL RETAIL FEDERATION
        </div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const piggySpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 90 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0.3, 1]);

  const dollarCount = Math.floor(
    interpolate(frame, [40, 170], [0, 1400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const coin1Y = interpolate(frame, [20, 90], [-220, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Y = interpolate(frame, [50, 120], [-220, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Y = interpolate(frame, [80, 150], [-220, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={headline(34, '#888')}>TOTAL HOLIDAY DAMAGE</div>
      </div>

      <svg width="1080" height="400" style={{ position: 'absolute', top: 380 }}>
        <g transform={`translate(390, ${coin1Y})`}>
          <circle cx={0} cy={0} r={34} fill={ACCENT} />
          <text x={0} y={12} textAnchor="middle" fontSize={30} fontFamily={FONT} fill={BLACK} fontWeight="900">$</text>
        </g>
        <g transform={`translate(540, ${coin2Y})`}>
          <circle cx={0} cy={0} r={28} fill="#D97706" />
          <text x={0} y={10} textAnchor="middle" fontSize={24} fontFamily={FONT} fill={BLACK} fontWeight="900">$</text>
        </g>
        <g transform={`translate(690, ${coin3Y})`}>
          <circle cx={0} cy={0} r={22} fill={ACCENT} />
          <text x={0} y={8} textAnchor="middle" fontSize={20} fontFamily={FONT} fill={BLACK} fontWeight="900">$</text>
        </g>
      </svg>

      <div style={{ position: 'absolute', top: 490, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          width={340}
          height={300}
          viewBox="0 0 340 300"
          style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center' }}
        >
          <ellipse cx="162" cy="175" rx="142" ry="112" fill="#222" stroke={ACCENT} strokeWidth={3} />
          <circle cx="284" cy="148" r="66" fill="#222" stroke={ACCENT} strokeWidth={3} />
          <ellipse cx="262" cy="90" rx="22" ry="18" fill="#2E2E2E" stroke={ACCENT} strokeWidth={2} />
          <ellipse cx="336" cy="162" rx="28" ry="22" fill="#2E2E2E" stroke={ACCENT} strokeWidth={2} />
          <circle cx="328" cy="158" r="6" fill="#111" />
          <circle cx="344" cy="158" r="6" fill="#111" />
          <circle cx="293" cy="130" r="8" fill={ACCENT} />
          <rect x="128" y="62" width="60" height="10" rx="4" fill={ACCENT} />
          <rect x="76" y="268" width="30" height="28" rx="8" fill="#222" stroke={ACCENT} strokeWidth={2} />
          <rect x="136" y="271" width="30" height="28" rx="8" fill="#222" stroke={ACCENT} strokeWidth={2} />
          <rect x="196" y="268" width="30" height="28" rx="8" fill="#222" stroke={ACCENT} strokeWidth={2} />
          <rect x="256" y="264" width="30" height="28" rx="8" fill="#222" stroke={ACCENT} strokeWidth={2} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 290, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 170, color: ACCENT, lineHeight: 1, letterSpacing: '-0.01em' }}>
          ${dollarCount.toLocaleString()}
        </div>
        <div style={{ fontFamily: FONT, fontSize: 42, color: WHITE, letterSpacing: '0.12em', textTransform: 'uppercase' as const, opacity: labelOpacity, textAlign: 'center' as const }}>
          EXTRA EVERY HOLIDAY SEASON
        </div>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneSpring = spring({ frame, fps: 30, config: { damping: 12, stiffness: 90 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [200, 0]);

  const arrowOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calSpring = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 12, stiffness: 100 } });
  const calScale = interpolate(calSpring, [0, 1], [0.5, 1]);

  const badgeSpring = spring({ frame: Math.max(0, frame - 110), fps: 30, config: { damping: 10, stiffness: 140 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeOpacity = interpolate(frame, [110, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [148, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const calCols = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={headline(32, '#888')}>THE SIMPLE HACK</div>
        <div style={{ fontFamily: FONT, fontSize: 54, color: BLACK, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: 20, textAlign: 'center' as const, lineHeight: 1.3 }}>
          SCREENSHOT YOUR<br />WISHLIST TODAY
        </div>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 50, right: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36, transform: `translateY(${phoneY}px)` }}>
        <svg width={170} height={310} viewBox="0 0 170 310">
          <rect x={8} y={8} width={154} height={294} rx={22} fill={BLACK} />
          <rect x={18} y={26} width={134} height={258} rx={14} fill="#1A1A1A" />
          <rect x={30} y={56} width={110} height={78} rx={6} fill="#2A2A2A" stroke={ACCENT} strokeWidth={2} strokeDasharray="6 4" />
          <line x1="30" y1="78" x2="140" y2="78" stroke={ACCENT} strokeWidth={1} strokeDasharray="4 3" />
          <rect x="30" y="150" width="80" height="10" rx="3" fill="#333" />
          <rect x="30" y="168" width="60" height="10" rx="3" fill="#333" />
          <circle cx={85} cy={286} r={12} fill="#2A2A2A" />
        </svg>

        <svg width={70} height={50} viewBox="0 0 70 50" style={{ opacity: arrowOpacity }}>
          <path d="M5 25 L52 25 M40 12 L57 25 L40 38" stroke={ACCENT} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <svg
          width={210}
          height={250}
          viewBox="0 0 210 250"
          style={{ transform: `scale(${calScale})`, transformOrigin: 'center' }}
        >
          <rect x={0} y={0} width={210} height={250} rx={16} fill="white" stroke="#E0E0E0" strokeWidth={2} />
          <rect x={0} y={0} width={210} height={58} rx={16} fill={GREEN} />
          <rect x={0} y={30} width={210} height={28} fill={GREEN} />
          <text x={105} y={38} textAnchor="middle" fontFamily={FONT} fontSize={22} fill="white" fontWeight="900" letterSpacing="3">JANUARY</text>
          {calCols.map((c, ci) => (
            <text key={ci} x={15 + ci * 27} y={82} fontFamily={FONT} fontSize={16} fill="#999" textAnchor="middle">{c}</text>
          ))}
          {calDays.map(d => {
            const col = (d - 1) % 7;
            const row = Math.floor((d - 1) / 7);
            return (
              <text key={d} x={15 + col * 27} y={108 + row * 28} fontFamily={FONT} fontSize={16} fill={d <= 7 ? GREEN : '#333'} textAnchor="middle" fontWeight={d <= 7 ? '900' : 'normal'}>
                {d}
              </text>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 300,
          left: '50%',
          transform: `translateX(-50%) scale(${badgeScale})`,
          opacity: badgeOpacity,
          background: GREEN,
          borderRadius: 100,
          padding: '22px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          whiteSpace: 'nowrap' as const,
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 30, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>YOU KEEP</div>
        <div style={{ fontFamily: FONT, fontSize: 88, color: 'white', lineHeight: 1 }}>$800</div>
      </div>

      <div style={{ position: 'absolute', bottom: 155, width: '100%', display: 'flex', justifyContent: 'center', opacity: ctaOpacity }}>
        <div style={{ fontFamily: FONT, fontSize: 30, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' as const, textAlign: 'center' as const }}>
          60% OF ITEMS CHEAPER IN JANUARY
        </div>
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
