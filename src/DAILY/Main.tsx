import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F2F2F2';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#0A0A0A';
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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSpring = spring({ frame, fps: 30, config: { damping: 20, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const curveProgress = interpolate(frame, [30, dur - 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const numPts = Math.max(0, Math.floor(curveProgress * 60));
  const linearPts = Array.from({ length: numPts }, (_, i) => {
    const t = numPts > 1 ? i / (numPts - 1) : 0;
    return `${(80 + t * 680).toFixed(1)},${(380 - t * 200).toFixed(1)}`;
  });
  const expPts = Array.from({ length: numPts }, (_, i) => {
    const t = numPts > 1 ? i / (numPts - 1) : 0;
    return `${(80 + t * 680).toFixed(1)},${Math.max(30, 380 - Math.pow(t, 1.8) * 340).toFixed(1)}`;
  });

  const yearLabels = ['Yr 0', 'Yr 10', 'Yr 20', 'Yr 30'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 120,
        }}
      >
        <div style={{ ...headline(30, ACCENT), marginBottom: 20 }}>MONEY PSYCHOLOGY</div>
        <div
          style={{
            ...headline(76, WHITE),
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          YOUR BRAIN<br />CAN'T DO<br />COMPOUND<br />INTEREST
        </div>
        <svg width={840} height={380} viewBox="0 0 840 380" style={{ marginTop: 30 }}>
          {[1, 2, 3].map((i) => (
            <line key={i} x1={80} y1={380 - i * 116} x2={760} y2={380 - i * 116} stroke="#1f1f1f" strokeWidth={1} />
          ))}
          <line x1={80} y1={30} x2={80} y2={380} stroke="#444" strokeWidth={2} />
          <line x1={80} y1={380} x2={760} y2={380} stroke="#444" strokeWidth={2} />
          {linearPts.length > 1 && (
            <polyline points={linearPts.join(' ')} fill="none" stroke="#555" strokeWidth={3} strokeDasharray="14,7" />
          )}
          {expPts.length > 1 && (
            <polyline points={expPts.join(' ')} fill="none" stroke={ACCENT} strokeWidth={5} />
          )}
          <rect x={560} y={32} width={16} height={16} fill="#555" />
          <text x={584} y={46} fill="#888" fontSize={22} fontFamily="Arial">What you guess</text>
          <rect x={560} y={60} width={16} height={16} fill={ACCENT} />
          <text x={584} y={74} fill={ACCENT} fontSize={22} fontFamily="Arial">Reality</text>
          {yearLabels.map((label, i) => (
            <text key={label} x={80 + i * (680 / 3)} y={405} fill="#555" fontSize={20} fontFamily="Arial" textAnchor="middle">{label}</text>
          ))}
        </svg>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: FONT,
            fontSize: 34,
            color: '#999',
            textAlign: 'center',
            letterSpacing: '0.04em',
            marginTop: 10,
          }}
        >
          Scientists proved it — and it's<br />costing you a fortune
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const billSpring = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 18, stiffness: 120 } });
  const billScale = interpolate(billSpring, [0, 1], [0.4, 1]);
  const barProgress = interpolate(frame, [60, dur - 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brainBarH = barProgress * 158;
  const realBarH = barProgress * 460;
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 100,
        }}
      >
        <div style={{ opacity: headerOpacity, ...headline(36, BLACK), marginBottom: 20 }}>
          THE $100 COMPOUND TEST
        </div>
        <svg
          width={480}
          height={200}
          viewBox="0 0 480 200"
          style={{ transform: `scale(${billScale})`, transformOrigin: 'center' }}
        >
          <rect x={10} y={10} width={460} height={180} rx={14} fill="#1a6b3c" />
          <rect x={22} y={22} width={436} height={156} rx={8} fill="none" stroke="#2ecc71" strokeWidth={2} />
          <ellipse cx={240} cy={100} rx={68} ry={68} fill="#145a30" />
          <text x={240} y={86} fill={WHITE} fontSize={40} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">$</text>
          <text x={240} y={132} fill={WHITE} fontSize={40} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">100</text>
          <text x={42} y={52} fill="#2ecc71" fontSize={22} fontFamily="Arial Black">100</text>
          <text x={438} y={52} fill="#2ecc71" fontSize={22} fontFamily="Arial Black" textAnchor="end">100</text>
          <text x={42} y={166} fill="#2ecc71" fontSize={22} fontFamily="Arial Black">100</text>
          <text x={438} y={166} fill="#2ecc71" fontSize={22} fontFamily="Arial Black" textAnchor="end">100</text>
          <rect x={10} y={66} width={460} height={18} fill="#145a30" opacity={0.5} />
          <rect x={10} y={116} width={460} height={18} fill="#145a30" opacity={0.5} />
        </svg>
        <div style={{ ...headline(28, '#555'), marginTop: 10, marginBottom: 30 }}>
          10% FOR 30 YEARS...
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(36, '#777'), marginBottom: 10 }}>$600</div>
            <div style={{ width: 110, height: Math.max(4, brainBarH), background: '#aaa', borderRadius: '8px 8px 0 0' }} />
            <div style={{ ...headline(22, '#888'), marginTop: 8 }}>BRAIN GUESS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(36, ACCENT), marginBottom: 10 }}>$1,744</div>
            <div style={{ width: 110, height: Math.max(4, realBarH), background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <div style={{ ...headline(22, ACCENT), marginTop: 8 }}>REALITY</div>
          </div>
        </div>
        <div
          style={{
            opacity: labelOpacity,
            fontFamily: FONT,
            fontSize: 34,
            color: '#c0392b',
            textAlign: 'center',
            marginTop: 24,
            letterSpacing: '0.06em',
          }}
        >
          OFF BY 65% — EVERY TIME
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const piggy1Spring = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 16, stiffness: 100 } });
  const piggy1X = interpolate(piggy1Spring, [0, 1], [-340, 0]);
  const piggy2Spring = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 16, stiffness: 100 } });
  const piggy2X = interpolate(piggy2Spring, [0, 1], [340, 0]);
  const amountOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [155, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 100,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(32, ACCENT), marginBottom: 6 }}>SAME $5,000. SAME 7%. SAME RATE.</div>
        <div style={{ opacity: titleOpacity, ...headline(60, WHITE), marginBottom: 40 }}>TWO OUTCOMES</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 80, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${piggy1X}px)` }}>
            <svg width={210} height={210} viewBox="0 0 220 220">
              <ellipse cx={105} cy={128} rx={90} ry={72} fill={ACCENT} />
              <circle cx={178} cy={98} r={36} fill={ACCENT} />
              <ellipse cx={169} cy={67} rx={13} ry={9} fill="#0d9268" />
              <circle cx={189} cy={94} r={5} fill={BLACK} />
              <ellipse cx={202} cy={106} rx={15} ry={11} fill="#0d9268" />
              <circle cx={198} cy={106} r={3} fill="#222" />
              <circle cx={206} cy={106} r={3} fill="#222" />
              <rect x={90} y={56} width={28} height={6} rx={3} fill="#0d9268" />
              <rect x={44} y={186} width={26} height={22} rx={7} fill="#0d9268" />
              <rect x={82} y={186} width={26} height={22} rx={7} fill="#0d9268" />
              <rect x={124} y={186} width={26} height={22} rx={7} fill="#0d9268" />
              <rect x={158} y={186} width={26} height={22} rx={7} fill="#0d9268" />
              <path d="M 20,118 Q 7,88 20,74 Q 33,60 20,50" fill="none" stroke="#0d9268" strokeWidth={5} strokeLinecap="round" />
            </svg>
            <div style={{ ...headline(26, ACCENT), marginTop: 8 }}>START AT 25</div>
            <div style={{ opacity: amountOpacity, ...headline(58, WHITE), marginTop: 6 }}>$74,000</div>
            <div style={{ ...headline(20, '#666'), marginTop: 4 }}>AT AGE 65</div>
          </div>
          <div style={{ ...headline(48, '#555') }}>VS</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${piggy2X}px)` }}>
            <svg width={130} height={130} viewBox="0 0 220 220">
              <ellipse cx={105} cy={128} rx={90} ry={72} fill="#444" />
              <circle cx={178} cy={98} r={36} fill="#444" />
              <ellipse cx={169} cy={67} rx={13} ry={9} fill="#333" />
              <circle cx={189} cy={94} r={5} fill={BLACK} />
              <ellipse cx={202} cy={106} rx={15} ry={11} fill="#333" />
              <circle cx={198} cy={106} r={3} fill="#222" />
              <circle cx={206} cy={106} r={3} fill="#222" />
              <rect x={90} y={56} width={28} height={6} rx={3} fill="#333" />
              <rect x={44} y={186} width={26} height={22} rx={7} fill="#333" />
              <rect x={82} y={186} width={26} height={22} rx={7} fill="#333" />
              <rect x={124} y={186} width={26} height={22} rx={7} fill="#333" />
              <rect x={158} y={186} width={26} height={22} rx={7} fill="#333" />
              <path d="M 20,118 Q 7,88 20,74 Q 33,60 20,50" fill="none" stroke="#333" strokeWidth={5} strokeLinecap="round" />
            </svg>
            <div style={{ ...headline(26, '#777'), marginTop: 8 }}>START AT 35</div>
            <div style={{ opacity: amountOpacity, ...headline(58, '#666'), marginTop: 6 }}>$37,000</div>
            <div style={{ ...headline(20, '#555'), marginTop: 4 }}>AT AGE 65</div>
          </div>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: FONT,
            fontSize: 34,
            color: '#e74c3c',
            textAlign: 'center',
            marginTop: 36,
            letterSpacing: '0.04em',
          }}
        >
          TEN YEARS = HALF YOUR WEALTH
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brainSpring = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 18, stiffness: 100 } });
  const brainScale = interpolate(brainSpring, [0, 1], [0.2, 1]);
  const boxOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const costOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 90,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(40, BLACK), marginBottom: 20 }}>WHY YOUR BRAIN FAILS</div>
        <svg
          width={260}
          height={200}
          viewBox="0 0 280 220"
          style={{ transform: `scale(${brainScale})`, transformOrigin: 'center', marginBottom: 14 }}
        >
          <path d="M 140,28 C 192,18 244,50 248,92 C 258,134 242,168 222,178 C 212,183 196,180 186,172 C 176,184 161,190 140,187 C 119,190 104,184 94,172 C 84,180 68,183 58,178 C 38,168 22,134 32,92 C 36,50 88,18 140,28 Z" fill="#e8b4b8" stroke="#c09098" strokeWidth={3} />
          <path d="M 140,50 Q 162,72 140,94 Q 118,72 140,50" fill="none" stroke="#c09098" strokeWidth={2} />
          <path d="M 98,80 Q 120,102 98,124 Q 76,102 98,80" fill="none" stroke="#c09098" strokeWidth={2} />
          <path d="M 182,80 Q 204,102 182,124 Q 160,102 182,80" fill="none" stroke="#c09098" strokeWidth={2} />
          <path d="M 140,132 Q 162,154 140,176 Q 118,154 140,132" fill="none" stroke="#c09098" strokeWidth={2} />
          <line x1={218} y1={10} x2={260} y2={52} stroke="#e74c3c" strokeWidth={5} strokeLinecap="round" />
          <line x1={260} y1={10} x2={218} y2={52} stroke="#e74c3c" strokeWidth={5} strokeLinecap="round" />
        </svg>
        <div style={{ ...headline(32, BLACK), marginBottom: 22 }}>WIRED FOR LINEAR THINKING</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 26, marginBottom: 26 }}>
          <div
            style={{
              opacity: boxOpacity,
              background: '#e0e0e0',
              borderRadius: 16,
              padding: '18px 26px',
              textAlign: 'center',
              width: 270,
            }}
          >
            <div style={{ ...headline(20, '#666'), marginBottom: 8 }}>YOUR BRAIN SEES</div>
            <svg width={230} height={72} viewBox="0 0 230 72">
              <line x1={15} y1={56} x2={215} y2={56} stroke="#ccc" strokeWidth={2} />
              <line x1={15} y1={18} x2={215} y2={56} stroke="#888" strokeWidth={4} />
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={15 + i * 50} y1={50} x2={15 + i * 50} y2={64} stroke="#aaa" strokeWidth={2} />
              ))}
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 26, color: '#888' }}>Straight line</div>
          </div>
          <div
            style={{
              opacity: boxOpacity,
              background: ACCENT,
              borderRadius: 16,
              padding: '18px 26px',
              textAlign: 'center',
              width: 270,
            }}
          >
            <div style={{ ...headline(20, WHITE), marginBottom: 8 }}>WHAT MONEY DOES</div>
            <svg width={230} height={72} viewBox="0 0 230 72">
              <line x1={15} y1={62} x2={215} y2={62} stroke={WHITE} strokeWidth={1} opacity={0.4} />
              <path d="M 15,62 Q 90,58 148,38 Q 192,22 215,4" fill="none" stroke={WHITE} strokeWidth={4} />
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>Exponential</div>
          </div>
        </div>
        <div
          style={{
            opacity: costOpacity,
            background: '#fff0f0',
            borderRadius: 16,
            padding: '18px 36px',
            textAlign: 'center',
          }}
        >
          <div style={{ ...headline(24, '#c0392b'), marginBottom: 6 }}>STORES EXPLOIT THIS EVERY DAY</div>
          <div style={{ fontFamily: FONT, fontSize: 28, color: BLACK, letterSpacing: '0.03em' }}>
            <span style={{ color: '#c0392b' }}>$14.99/month</span>{' '}hides{' '}
            <span style={{ color: '#c0392b' }}>$5,400 over 30 years</span>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const phoneSpring = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 18, stiffness: 100 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [220, 0]);
  const counterValue = interpolate(frame, [80, dur - 40], [0, 1100000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const displayVal = `$${Math.floor(counterValue).toLocaleString('en-US')}`;
  const subOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 100,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(36, ACCENT), marginBottom: 8 }}>THE FIX</div>
        <div style={{ opacity: titleOpacity, ...headline(58, WHITE), marginBottom: 30 }}>
          PICTURE THE<br />FINAL NUMBER
        </div>
        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width={300} height={400} viewBox="0 0 300 400">
            <rect x={20} y={10} width={260} height={380} rx={34} fill="#181818" stroke="#333" strokeWidth={3} />
            <rect x={34} y={48} width={232} height={290} rx={12} fill="#111" />
            <rect x={110} y={22} width={80} height={8} rx={4} fill="#333" />
            <rect x={34} y={56} width={232} height={72} rx={8} fill="#0a0a0a" />
            <text x={256} y={105} fill={ACCENT} fontSize={38} fontFamily="Arial Black" textAnchor="end" fontWeight="bold">{displayVal}</text>
            {Array.from({ length: Math.max(0, Math.floor(4 * 4)) }, (_, idx) => {
              const row = Math.floor(idx / 4);
              const col = idx % 4;
              return (
                <rect
                  key={idx}
                  x={40 + col * 55}
                  y={148 + row * 46}
                  width={46}
                  height={36}
                  rx={8}
                  fill={row === 3 && col === 3 ? ACCENT : '#222'}
                />
              );
            })}
            <rect x={110} y={358} width={80} height={8} rx={4} fill="#333" />
          </svg>
        </div>
        <div style={{ ...headline(38, ACCENT), marginTop: 6 }}>$300/MONTH × 1,000</div>
        <div style={{ ...headline(26, '#666'), marginTop: 6 }}>≈ 30-YEAR BALANCE AT 7%</div>
        <div
          style={{
            opacity: subOpacity,
            background: '#0d1f17',
            borderRadius: 16,
            padding: '16px 32px',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, letterSpacing: '0.04em' }}>
            Visualizing your future number<br />
            <span style={{ color: WHITE }}>boosts savings rates 19%</span>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const calSpring = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 18, stiffness: 110 } });
  const calScale = interpolate(calSpring, [0, 1], [0.3, 1]);
  const pulseProg = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaSpring = spring({ frame: Math.max(0, frame - 140), fps: 30, config: { damping: 14, stiffness: 180 } });

  const steps = ['Open your calculator', 'Monthly savings × 1,000', 'That number is real — go get it'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 90,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(36, BLACK), marginBottom: 4 }}>OVERRIDE YOUR BRAIN</div>
        <div style={{ opacity: titleOpacity, ...headline(56, BLACK), marginBottom: 20 }}>START TODAY.</div>
        <svg
          width={380}
          height={350}
          viewBox="0 0 380 350"
          style={{ transform: `scale(${calScale})`, transformOrigin: 'center' }}
        >
          <rect x={20} y={36} width={340} height={294} rx={16} fill={WHITE} stroke="#ddd" strokeWidth={3} />
          <rect x={20} y={36} width={340} height={56} rx={16} fill={ACCENT} />
          <rect x={20} y={76} width={340} height={16} fill={ACCENT} />
          <text x={190} y={74} fill={WHITE} fontSize={26} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">JUNE 2026</text>
          {[90, 190, 290].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy={36} r={13} fill="#ddd" />
              <circle cx={cx} cy={36} r={8} fill={WHITE} />
            </g>
          ))}
          {Array.from({ length: Math.max(0, Math.floor(5 * 7)) }, (_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const x = 32 + col * 46;
            const y = 112 + row * 42;
            const dayNum = i + 1;
            const isToday = dayNum === 28;
            return (
              <g key={i}>
                {isToday && (
                  <circle
                    cx={x + 14}
                    cy={y + 14}
                    r={interpolate(pulseProg, [0, 1], [0, 20])}
                    fill={ACCENT}
                    opacity={pulseProg}
                  />
                )}
                {dayNum <= 30 && (
                  <text
                    x={x + 14}
                    y={y + 20}
                    fill={isToday ? WHITE : '#888'}
                    fontSize={18}
                    fontFamily="Arial"
                    textAnchor="middle"
                    fontWeight={isToday ? 'bold' : 'normal'}
                  >
                    {dayNum}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div style={{ marginTop: 16, width: 780, paddingLeft: 30, paddingRight: 30 }}>
          {steps.map((step, i) => {
            const stepOpacity = interpolate(frame, [80 + i * 24, 110 + i * 24], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={step} style={{ opacity: stepOpacity, display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT,
                    fontSize: 22,
                    color: WHITE,
                    marginRight: 16,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 32, color: BLACK, letterSpacing: '0.04em' }}>{step}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            transform: `scale(${ctaSpring})`,
            background: ACCENT,
            borderRadius: 50,
            padding: '20px 56px',
            marginTop: 20,
          }}
        >
          <div style={{ ...headline(42, WHITE) }}>START TODAY</div>
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
