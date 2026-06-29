import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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
  const checkSpring = spring({ frame: Math.max(0, frame - 60), fps: 30, config: { damping: 16, stiffness: 120 } });
  const checkScale = interpolate(checkSpring, [0, 1], [0.3, 1]);
  const amountOpacity = interpolate(frame, [130, 160], [0, 1], {
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
          paddingTop: 120,
        }}
      >
        <div style={{ ...headline(28, ACCENT), marginBottom: 16 }}>INSURANCE TRUTH</div>
        <div
          style={{
            ...headline(78, WHITE),
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          WHOLE LIFE<br />INSURANCE<br />IS A TRAP
        </div>
        <div style={{ transform: `scale(${checkScale})`, transformOrigin: 'center', marginTop: 36 }}>
          <svg width={700} height={220} viewBox="0 0 700 220">
            <rect x={10} y={10} width={680} height={200} rx={16} fill="#1a1a1a" stroke="#444" strokeWidth={2} />
            <rect x={10} y={10} width={680} height={54} rx={16} fill="#2d1b1b" />
            <rect x={10} y={48} width={680} height={16} fill="#2d1b1b" />
            <text x={40} y={44} fill="#888" fontSize={21} fontFamily="Arial">PAY TO THE ORDER OF:</text>
            <text x={40} y={90} fill={WHITE} fontSize={28} fontFamily="Arial Black">Your Insurance Agent</text>
            <rect x={460} y={65} width={220} height={58} rx={8} fill="#0a0a0a" stroke={ACCENT} strokeWidth={2} />
            <text x={570} y={103} fill={ACCENT} fontSize={36} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">$5,700</text>
            <line x1={40} y1={148} x2={420} y2={148} stroke="#444" strokeWidth={1} />
            <text x={40} y={142} fill="#555" fontSize={17} fontFamily="Arial">MEMO: Day 1 commission — your entire first-year premium</text>
            <line x1={460} y1={148} x2={680} y2={148} stroke="#444" strokeWidth={1} />
            <text x={570} y={142} fill="#666" fontSize={18} fontFamily="Arial" textAnchor="middle">Insurance Company</text>
            <text x={40} y={186} fill="#444" fontSize={16} fontFamily="Arial">WHOLE LIFE POLICY — ISSUED TODAY</text>
          </svg>
        </div>
        <div
          style={{
            opacity: amountOpacity,
            fontFamily: FONT,
            fontSize: 32,
            color: ACCENT,
            textAlign: 'center',
            marginTop: 20,
            letterSpacing: '0.04em',
          }}
        >
          BEFORE YOU EARNED A SINGLE CENT
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
  const box1Spring = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 18, stiffness: 100 } });
  const box1X = interpolate(box1Spring, [0, 1], [-400, 0]);
  const box2Spring = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 18, stiffness: 100 } });
  const box2X = interpolate(box2Spring, [0, 1], [400, 0]);
  const revealOpacity = interpolate(frame, [140, 170], [0, 1], {
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
          paddingTop: 110,
        }}
      >
        <div style={{ opacity: headerOpacity, ...headline(30, '#555'), marginBottom: 8 }}>WHAT AGENTS PITCH</div>
        <div style={{ opacity: headerOpacity, ...headline(64, BLACK), marginBottom: 44 }}>TWO-IN-ONE</div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start' }}>
          <div
            style={{
              transform: `translateX(${box1X}px)`,
              background: WHITE,
              borderRadius: 24,
              padding: '28px 32px',
              width: 280,
              textAlign: 'center',
              border: '2px solid #e0e0e0',
            }}
          >
            <svg width={110} height={130} viewBox="0 0 110 130">
              <path d="M 55,10 L 100,30 L 100,72 C 100,96 78,116 55,123 C 32,116 10,96 10,72 L 10,30 Z" fill={ACCENT} />
              <path d="M 55,22 L 88,38 L 88,72 C 88,90 72,107 55,114 C 38,107 22,90 22,72 L 22,38 Z" fill="#c0392b" />
              <polyline points="38,70 50,84 76,54" fill="none" stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ ...headline(26, BLACK), marginTop: 12 }}>LIFE<br />INSURANCE</div>
            <div style={{ fontFamily: FONT, fontSize: 19, color: '#777', marginTop: 8 }}>Protects your family</div>
          </div>

          <div style={{ ...headline(52, '#bbb'), paddingTop: 60 }}>+</div>

          <div
            style={{
              transform: `translateX(${box2X}px)`,
              background: WHITE,
              borderRadius: 24,
              padding: '28px 32px',
              width: 280,
              textAlign: 'center',
              border: '2px solid #e0e0e0',
            }}
          >
            <svg width={110} height={130} viewBox="0 0 110 130">
              <circle cx={55} cy={62} r={52} fill="#d4af37" />
              <circle cx={55} cy={62} r={44} fill="#c9a227" />
              <text x={55} y={82} fill={WHITE} fontSize={58} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">$</text>
            </svg>
            <div style={{ ...headline(26, BLACK), marginTop: 12 }}>CASH<br />VALUE</div>
            <div style={{ fontFamily: FONT, fontSize: 19, color: '#777', marginTop: 8 }}>Savings that grow</div>
          </div>
        </div>

        <div
          style={{
            opacity: revealOpacity,
            background: '#fff0f0',
            borderRadius: 16,
            padding: '20px 48px',
            marginTop: 48,
            textAlign: 'center',
            border: `3px solid ${ACCENT}`,
          }}
        >
          <div style={{ ...headline(30, ACCENT) }}>SOUNDS SMART. DO THE MATH FIRST.</div>
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
  const barProgress = interpolate(frame, [40, dur - 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wholeBarH = barProgress * 500;
  const termBarH = barProgress * 25;
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gapOpacity = interpolate(frame, [150, 180], [0, 1], {
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
          paddingTop: 110,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(30, ACCENT), marginBottom: 8 }}>SAME $500K COVERAGE</div>
        <div style={{ opacity: titleOpacity, ...headline(64, WHITE), marginBottom: 36 }}>THE PRICE GAP</div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 100 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(44, ACCENT), marginBottom: 10 }}>$500</div>
            <div
              style={{
                width: 160,
                height: Math.max(4, wholeBarH),
                background: ACCENT,
                borderRadius: '10px 10px 0 0',
              }}
            />
            <div style={{ ...headline(22, '#aaa'), marginTop: 10 }}>WHOLE LIFE</div>
            <div style={{ ...headline(18, '#666'), marginTop: 4 }}>PER MONTH</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(44, WHITE), marginBottom: 10 }}>$25</div>
            <div
              style={{
                width: 160,
                height: Math.max(4, termBarH),
                background: '#555',
                borderRadius: '10px 10px 0 0',
              }}
            />
            <div style={{ ...headline(22, '#aaa'), marginTop: 10 }}>TERM LIFE</div>
            <div style={{ ...headline(18, '#666'), marginTop: 4 }}>PER MONTH</div>
          </div>
        </div>

        <div
          style={{
            opacity: gapOpacity,
            background: '#1a0a0a',
            borderRadius: 16,
            padding: '20px 48px',
            marginTop: 40,
            textAlign: 'center',
            border: `2px solid ${ACCENT}`,
          }}
        >
          <div style={{ ...headline(28, '#888'), marginBottom: 6 }}>YOU ARE OVERPAYING</div>
          <div style={{ ...headline(56, ACCENT) }}>$475 / MONTH</div>
          <div style={{ ...headline(22, '#666'), marginTop: 6 }}>EVERY SINGLE MONTH</div>
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
  const agentSpring = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 18, stiffness: 100 } });
  const agentScale = interpolate(agentSpring, [0, 1], [0.3, 1]);
  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const commOpacity = interpolate(frame, [120, 150], [0, 1], {
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
        <div style={{ opacity: titleOpacity, ...headline(32, BLACK), marginBottom: 6 }}>THE HIDDEN INCENTIVE</div>
        <div style={{ opacity: titleOpacity, ...headline(58, BLACK), marginBottom: 36 }}>AGENT COMMISSION</div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={120} height={160} viewBox="0 0 120 160">
              <circle cx={60} cy={38} r={32} fill="#bbb" />
              <path d="M 20,160 C 20,108 40,88 60,84 C 80,88 100,108 100,160 Z" fill="#bbb" />
            </svg>
            <div style={{ ...headline(22, '#888'), marginTop: 8 }}>YOU</div>
          </div>

          <div style={{ opacity: arrowOpacity }}>
            <svg width={160} height={100} viewBox="0 0 160 100">
              <defs>
                <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={ACCENT} />
                </marker>
              </defs>
              <line x1={10} y1={28} x2={144} y2={28} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrowRed)" />
              <line x1={10} y1={66} x2={144} y2={66} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrowRed)" />
              <text x={80} y={20} fill={ACCENT} fontSize={19} fontFamily="Arial Black" textAnchor="middle">$$$</text>
              <text x={80} y={58} fill={ACCENT} fontSize={19} fontFamily="Arial Black" textAnchor="middle">$$$</text>
            </svg>
          </div>

          <div style={{ transform: `scale(${agentScale})`, transformOrigin: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={120} height={160} viewBox="0 0 120 160">
              <circle cx={60} cy={38} r={32} fill="#222" />
              <path d="M 20,160 C 20,108 40,88 60,84 C 80,88 100,108 100,160 Z" fill="#1a1a1a" />
              <path d="M 60,90 L 52,112 L 60,124 L 68,112 Z" fill={ACCENT} />
              <rect x={90} y={108} width={30} height={22} rx={4} fill="#333" />
              <rect x={97} y={104} width={16} height={8} rx={3} fill="none" stroke="#333" strokeWidth={3} />
            </svg>
            <div style={{ ...headline(22, BLACK), marginTop: 8 }}>AGENT</div>
          </div>
        </div>

        <div
          style={{
            opacity: commOpacity,
            background: '#fff0f0',
            borderRadius: 16,
            padding: '18px 40px',
            marginTop: 28,
            textAlign: 'center',
            border: `2px solid ${ACCENT}`,
          }}
        >
          <div style={{ ...headline(24, '#888'), marginBottom: 6 }}>FIRST-YEAR COMMISSION</div>
          <div style={{ ...headline(56, ACCENT) }}>50–110%</div>
          <div style={{ fontFamily: FONT, fontSize: 27, color: BLACK, marginTop: 8, letterSpacing: '0.03em' }}>
            $500/month policy = <span style={{ color: ACCENT }}>$5,700 to them on day one</span>
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
  const barProgress = interpolate(frame, [50, dur - 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wholeBarH = barProgress * 130;
  const investBarH = barProgress * 530;
  const labelOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOpacity = interpolate(frame, [160, 190], [0, 1], {
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
          paddingTop: 110,
        }}
      >
        <div style={{ opacity: titleOpacity, ...headline(26, ACCENT), marginBottom: 8 }}>$475/MONTH × 30 YEARS AT 8%</div>
        <div style={{ opacity: titleOpacity, ...headline(58, WHITE), marginBottom: 36 }}>THE REAL NUMBERS</div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 100 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(38, '#777'), marginBottom: 10 }}>~$80K</div>
            <div
              style={{
                width: 160,
                height: Math.max(4, wholeBarH),
                background: '#444',
                borderRadius: '10px 10px 0 0',
              }}
            />
            <div style={{ ...headline(20, '#666'), marginTop: 10 }}>WHOLE LIFE</div>
            <div style={{ ...headline(16, '#555'), marginTop: 4 }}>CASH VALUE</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ opacity: labelOpacity, ...headline(38, '#10B981'), marginBottom: 10 }}>$695,000</div>
            <div
              style={{
                width: 160,
                height: Math.max(4, investBarH),
                background: '#10B981',
                borderRadius: '10px 10px 0 0',
              }}
            />
            <div style={{ ...headline(20, '#10B981'), marginTop: 10 }}>TERM + INVEST</div>
            <div style={{ ...headline(16, '#0d9268'), marginTop: 4 }}>THE DIFFERENCE</div>
          </div>
        </div>

        <div
          style={{
            opacity: ctaOpacity,
            fontFamily: FONT,
            fontSize: 30,
            color: '#10B981',
            textAlign: 'center',
            marginTop: 36,
            letterSpacing: '0.04em',
          }}
        >
          YOUR AGENT NEVER SHOWED YOU THIS CHART
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
  const personSpring = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 18, stiffness: 100 } });
  const personX = interpolate(personSpring, [0, 1], [-300, 0]);
  const piggySpring = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 16, stiffness: 100 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0.2, 1]);
  const statOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaSpring = spring({ frame: Math.max(0, frame - 150), fps: 30, config: { damping: 14, stiffness: 180 } });

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
        <div style={{ opacity: titleOpacity, ...headline(34, BLACK), marginBottom: 4 }}>THE EXIT STAT</div>
        <div style={{ opacity: titleOpacity, ...headline(60, BLACK), marginBottom: 28 }}>7 IN 10 QUIT</div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 56 }}>
          <div style={{ transform: `translateX(${personX}px)` }}>
            <svg width={170} height={260} viewBox="0 0 170 260">
              <circle cx={85} cy={40} r={34} fill="#333" />
              <rect x={62} y={78} width={46} height={76} rx={10} fill="#333" />
              <path d="M 66,150 L 56,228 L 72,228 L 85,172 Z" fill="#222" />
              <path d="M 104,150 L 110,228 L 126,228 L 112,172 Z" fill="#333" />
              <path d="M 62,86 L 42,144 L 56,148 L 72,94 Z" fill="#333" />
              <path d="M 108,86 L 128,136 L 114,142 L 98,94 Z" fill="#222" />
              <path d="M 138,128 L 158,118 L 138,108" fill="none" stroke="#10B981" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center' }}>
            <svg width={190} height={200} viewBox="0 0 220 220">
              <ellipse cx={105} cy={128} rx={90} ry={72} fill="#10B981" />
              <circle cx={178} cy={98} r={36} fill="#10B981" />
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
              <text x={100} y={138} fill={WHITE} fontSize={46} fontFamily="Arial Black" textAnchor="middle" fontWeight="bold">$</text>
            </svg>
          </div>
        </div>

        <div
          style={{
            opacity: statOpacity,
            background: '#fff0f0',
            borderRadius: 14,
            padding: '16px 36px',
            marginTop: 24,
            textAlign: 'center',
            border: `2px solid ${ACCENT}`,
          }}
        >
          <div style={{ ...headline(22, '#888'), marginBottom: 4 }}>7 IN 10 WHOLE LIFE POLICIES ARE</div>
          <div style={{ ...headline(36, ACCENT) }}>SURRENDERED BEFORE PAYOUT</div>
        </div>

        <div
          style={{
            transform: `scale(${ctaSpring})`,
            background: ACCENT,
            borderRadius: 50,
            padding: '22px 56px',
            marginTop: 24,
          }}
        >
          <div style={{ ...headline(34, WHITE) }}>BUY TERM. INVEST THE REST.</div>
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



