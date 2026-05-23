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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const cardTranslate = interpolate(cardY, [0, 1], [-480, 0]);
  const quoteOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue = Math.floor(interpolate(frame, [55, 175], [0, 6360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 52 }}>
        <div style={{ transform: `translateY(${cardTranslate}px)` }}>
          <svg width={380} height={240} viewBox="0 0 380 240">
            <rect x={0} y={0} width={380} height={240} rx={18} fill={ACCENT} />
            <rect x={0} y={55} width={380} height={48} fill="rgba(0,0,0,0.45)" />
            <rect x={28} y={100} width={58} height={44} rx={5} fill="#FFD700" />
            <rect x={42} y={112} width={30} height={20} rx={2} fill="#DAA520" />
            <text x={190} y={178} textAnchor="middle" fill={WHITE} fontSize={22} fontFamily="'Courier New',monospace" letterSpacing={3}>**** **** **** 2847</text>
            <text x={28} y={220} fill="rgba(255,255,255,0.8)" fontSize={15} fontFamily="monospace">YOUR NAME</text>
            <text x={340} y={220} fill="rgba(255,255,255,0.8)" fontSize={14} fontFamily="monospace">09/28</text>
          </svg>
        </div>

        <div style={{ opacity: quoteOpacity, textAlign: 'center', padding: '0 60px' }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.35 }}>
            "I'll pay it off next month"
          </p>
        </div>

        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(26, 'rgba(255,255,255,0.6)'), marginBottom: 10 }}>AVG CREDIT CARD DEBT</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${counterValue.toLocaleString()}
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dollarData = [
    { x: 80, delay: 0 }, { x: 220, delay: 8 }, { x: 380, delay: 3 },
    { x: 550, delay: 15 }, { x: 700, delay: 6 }, { x: 140, delay: 20 },
    { x: 460, delay: 12 }, { x: 620, delay: 4 }, { x: 300, delay: 18 },
    { x: 40, delay: 10 }, { x: 740, delay: 2 }, { x: 500, delay: 14 },
  ];

  const balanceScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const interestScale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 120 } });
  const captionOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {dollarData.map((d, i) => {
            const fallY = interpolate(frame - d.delay, [0, dur], [-60, 2100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{ position: 'absolute', left: d.x, top: 0, transform: `translateY(${fallY}px)`, fontSize: 38, color: ACCENT, opacity: 0.12 }}>$</div>
            );
          })}
        </div>

        <div style={{ transform: `scale(${balanceScale})`, background: BLACK, borderRadius: 22, padding: '38px 60px', textAlign: 'center', width: '80%' }}>
          <p style={{ ...headline(26, 'rgba(255,255,255,0.6)'), marginBottom: 14 }}>YOUR BALANCE</p>
          <p style={{ fontFamily: FONT, fontSize: 82, color: ACCENT, margin: 0, lineHeight: 1 }}>$6,360</p>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.5)'), marginTop: 12 }}>@ 24% APR</p>
        </div>

        <div style={{ transform: `scale(${interestScale})`, background: ACCENT, borderRadius: 22, padding: '38px 60px', textAlign: 'center', width: '80%' }}>
          <p style={{ ...headline(24, BLACK), marginBottom: 14 }}>YEARLY INTEREST COST</p>
          <p style={{ fontFamily: FONT, fontSize: 82, color: BLACK, margin: 0, lineHeight: 1 }}>$1,527</p>
          <p style={{ ...headline(22, BLACK), marginTop: 12 }}>JUST TO EXIST</p>
        </div>

        <div style={{ opacity: captionOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', margin: 0 }}>
            That's next-month money, gone forever.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const calendarSlide = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 100 } });
  const calendarX = interpolate(calendarSlide, [0, 1], [400, 0]);
  const arrowOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50, padding: '0 60px' }}>
        <p style={{ ...headline(40, WHITE) }}>THE PSYCHOLOGY</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, width: '100%' }}>
          <div style={{ transform: `scale(${brainScale})` }}>
            <svg width={155} height={155} viewBox="0 0 155 155">
              <ellipse cx={77} cy={72} rx={62} ry={60} fill="none" stroke={ACCENT} strokeWidth={5} />
              <path d="M 15 72 Q 0 50 15 35" fill="none" stroke={ACCENT} strokeWidth={5} />
              <path d="M 139 72 Q 154 50 139 35" fill="none" stroke={ACCENT} strokeWidth={5} />
              <path d="M 35 60 Q 55 48 77 60 Q 99 48 119 60" fill="none" stroke={ACCENT} strokeWidth={3.5} />
              <path d="M 30 85 Q 52 97 77 85 Q 102 97 124 85" fill="none" stroke={ACCENT} strokeWidth={3.5} />
              <rect x={64} y={128} width={26} height={22} fill={ACCENT} />
              <ellipse cx={77} cy={150} rx={28} ry={7} fill={ACCENT} />
            </svg>
          </div>

          <div style={{ opacity: arrowOpacity }}>
            <svg width={60} height={40} viewBox="0 0 60 40">
              <path d="M 0 20 L 44 20 M 32 8 L 54 20 L 32 32" stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ transform: `translateX(${calendarX}px)` }}>
            <svg width={155} height={155} viewBox="0 0 155 155">
              <rect x={5} y={18} width={145} height={132} rx={10} fill={BG_LIGHT} />
              <rect x={5} y={18} width={145} height={38} rx={10} fill={ACCENT} />
              <rect x={5} y={42} width={145} height={14} fill={ACCENT} />
              <rect x={40} y={8} width={12} height={24} rx={6} fill={BLACK} />
              <rect x={103} y={8} width={12} height={24} rx={6} fill={BLACK} />
              <text x={77} y={43} textAnchor="middle" fill={WHITE} fontSize={15} fontFamily="Arial Black">NEXT MONTH</text>
              <line x1={5} y1={80} x2={150} y2={80} stroke="#ccc" strokeWidth={1} />
              <line x1={5} y1={108} x2={150} y2={108} stroke="#ccc" strokeWidth={1} />
              <line x1={5} y1={136} x2={150} y2={136} stroke="#ccc" strokeWidth={1} />
              {[1, 2, 3, 4, 5, 6, 7].map((d, i) => (
                <text key={d} x={22 + i * 18} y={97} textAnchor="middle" fill="#666" fontSize={11} fontFamily="Arial">{d}</text>
              ))}
              {[8, 9, 10, 11, 12, 13, 14].map((d, i) => (
                <text key={d} x={22 + i * 18} y={125} textAnchor="middle" fill="#666" fontSize={11} fontFamily="Arial">{d}</text>
              ))}
            </svg>
          </div>
        </div>

        <div style={{ opacity: captionOpacity, textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', margin: 0, lineHeight: 1.45 }}>
            Your brain treats future pain as unreal.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, textAlign: 'center', margin: '14px 0 0', lineHeight: 1.4 }}>
            Scientists call it temporal discounting.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const chartProgress = interpolate(frame, [15, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calloutOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { year: 'NOW', interest: 0 },
    { year: 'YR 4', interest: 2800 },
    { year: 'YR 8', interest: 5600 },
    { year: 'YR 12', interest: 7300 },
    { year: 'YR 16', interest: 8400 },
  ];
  const maxInterest = 8400;
  const barW = 88;
  const barGap = 42;
  const originX = 75;
  const originY = 340;
  const maxBarH = 290;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 50px' }}>
        <p style={{ ...headline(40, BLACK) }}>MINIMUM PAYMENT TRAP</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: 'rgba(0,0,0,0.5)', margin: 0 }}>$6,360 balance @ 24% APR</p>

        <svg width={700} height={420} viewBox="0 0 700 420">
          <line x1={originX} y1={30} x2={originX} y2={originY} stroke="#ccc" strokeWidth={2} />
          <line x1={originX} y1={originY} x2={670} y2={originY} stroke="#ccc" strokeWidth={2} />

          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <g key={i}>
              <line x1={originX - 6} y1={originY - pct * maxBarH} x2={originX} y2={originY - pct * maxBarH} stroke="#bbb" strokeWidth={2} />
              <text x={originX - 10} y={originY - pct * maxBarH + 5} textAnchor="end" fill="#999" fontSize={16} fontFamily="Arial">
                ${(pct * 8.4).toFixed(0)}K
              </text>
            </g>
          ))}

          {bars.map((bar, i) => {
            const x = originX + 20 + i * (barW + barGap);
            const barH = Math.max(0, (bar.interest / maxInterest) * maxBarH * chartProgress);
            return (
              <g key={i}>
                <rect x={x} y={originY - barH} width={barW} height={barH} fill={ACCENT} rx={6} />
                <text x={x + barW / 2} y={originY + 22} textAnchor="middle" fill="#666" fontSize={15} fontFamily="Arial Black">{bar.year}</text>
                {bar.interest > 0 && chartProgress > 0.25 && (
                  <text x={x + barW / 2} y={Math.max(25, originY - barH - 8)} textAnchor="middle" fill={ACCENT} fontSize={14} fontFamily="Arial Black">
                    ${bar.interest >= 1000 ? (bar.interest / 1000).toFixed(1) + 'K' : bar.interest}
                  </text>
                )}
              </g>
            );
          })}

          <text x={370} y={410} textAnchor="middle" fill="#aaa" fontSize={17} fontFamily="Arial">INTEREST PAID OVER TIME</text>
        </svg>

        <div style={{ opacity: calloutOpacity, background: ACCENT, borderRadius: 16, padding: '18px 50px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>16 YEARS TO PAY OFF</p>
          <p style={{ ...headline(22, BLACK) }}>$8,400 IN PURE INTEREST</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp1 = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const sp2 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 100 } });
  const sp3 = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 100 } });

  const card1Y = interpolate(sp1, [0, 1], [350, 0]);
  const card2Y = interpolate(sp2, [0, 1], [350, 0]);
  const card3Y = interpolate(sp3, [0, 1], [350, 0]);
  const totalOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 60px' }}>
        <p style={{ ...headline(36, WHITE) }}>3 CARDS. ONE TRAP.</p>

        <div style={{ position: 'relative', width: 420, height: 280 }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, transform: `translateX(-50%) translateY(${card1Y}px) rotate(-12deg)` }}>
            <svg width={280} height={175} viewBox="0 0 280 175">
              <rect x={0} y={0} width={280} height={175} rx={13} fill="#b91c1c" />
              <rect x={0} y={42} width={280} height={36} fill="rgba(0,0,0,0.4)" />
              <rect x={20} y={78} width={44} height={32} rx={4} fill="#FFD700" />
              <rect x={30} y={87} width={24} height={14} rx={2} fill="#DAA520" />
              <text x={140} y={130} textAnchor="middle" fill={WHITE} fontSize={17} fontFamily="'Courier New',monospace" letterSpacing={2}>**** **** **** ****</text>
              <text x={20} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace">CARD ONE</text>
              <text x={245} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace" textAnchor="end">$2,400</text>
            </svg>
          </div>

          <div style={{ position: 'absolute', left: '50%', top: 30, transform: `translateX(-50%) translateY(${card2Y}px) rotate(3deg)` }}>
            <svg width={280} height={175} viewBox="0 0 280 175">
              <rect x={0} y={0} width={280} height={175} rx={13} fill="#991b1b" />
              <rect x={0} y={42} width={280} height={36} fill="rgba(0,0,0,0.4)" />
              <rect x={20} y={78} width={44} height={32} rx={4} fill="#FFD700" />
              <rect x={30} y={87} width={24} height={14} rx={2} fill="#DAA520" />
              <text x={140} y={130} textAnchor="middle" fill={WHITE} fontSize={17} fontFamily="'Courier New',monospace" letterSpacing={2}>**** **** **** ****</text>
              <text x={20} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace">CARD TWO</text>
              <text x={245} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace" textAnchor="end">$2,100</text>
            </svg>
          </div>

          <div style={{ position: 'absolute', left: '50%', top: 60, transform: `translateX(-50%) translateY(${card3Y}px) rotate(14deg)` }}>
            <svg width={280} height={175} viewBox="0 0 280 175">
              <rect x={0} y={0} width={280} height={175} rx={13} fill={ACCENT} />
              <rect x={0} y={42} width={280} height={36} fill="rgba(0,0,0,0.4)" />
              <rect x={20} y={78} width={44} height={32} rx={4} fill="#FFD700" />
              <rect x={30} y={87} width={24} height={14} rx={2} fill="#DAA520" />
              <text x={140} y={130} textAnchor="middle" fill={WHITE} fontSize={17} fontFamily="'Courier New',monospace" letterSpacing={2}>**** **** **** ****</text>
              <text x={20} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace">CARD THREE</text>
              <text x={245} y={158} fill="rgba(255,255,255,0.7)" fontSize={12} fontFamily="monospace" textAnchor="end">$1,860</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: totalOpacity, textAlign: 'center', marginTop: 20 }}>
          <p style={{ ...headline(28, 'rgba(255,255,255,0.65)'), marginBottom: 10 }}>TOTAL INTEREST ACROSS 3 CARDS</p>
          <p style={{ fontFamily: FONT, fontSize: 92, color: ACCENT, margin: 0, lineHeight: 1 }}>$25K+</p>
          <p style={{ ...headline(24, 'rgba(255,255,255,0.55)'), marginTop: 10 }}>OVER A DECADE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const phoneScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 100 } });
  const savingsValue = Math.floor(interpolate(frame, [60, 185], [0, 8400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const savingsOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '0 60px' }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(44, BLACK) }}>THE FIX IS SIMPLE</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: 'rgba(0,0,0,0.55)', textAlign: 'center', margin: '12px 0 0', lineHeight: 1.4 }}>
            Set autopay above the minimum — today.
          </p>
        </div>

        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width={240} height={380} viewBox="0 0 240 380">
            <rect x={5} y={5} width={230} height={370} rx={28} fill={BLACK} />
            <rect x={14} y={14} width={212} height={352} rx={22} fill="#1c1c2e" />
            <rect x={28} y={50} width={184} height={90} rx={10} fill="#2a2a4a" />
            <text x={120} y={82} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={13} fontFamily="Arial">CREDIT CARD AUTOPAY</text>
            <text x={120} y={112} textAnchor="middle" fill={ACCENT} fontSize={26} fontFamily="Arial Black">$250/month</text>
            <text x={120} y={132} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={11} fontFamily="Arial">(above minimum)</text>
            <rect x={48} y={162} width={144} height={40} rx={20} fill={ACCENT} />
            <text x={120} y={187} textAnchor="middle" fill={BLACK} fontSize={15} fontFamily="Arial Black">SET AUTOPAY</text>
            <circle cx={120} cy={278} r={38} fill="#10B981" />
            <path d="M 102 278 L 116 293 L 142 260" fill="none" stroke={WHITE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <text x={120} y={338} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily="Arial">AUTOPAY ACTIVE</text>
          </svg>
        </div>

        <div style={{ opacity: savingsOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(26, 'rgba(0,0,0,0.6)'), marginBottom: 8 }}>YOU SAVE</p>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>
            ${savingsValue.toLocaleString()}
          </p>
        </div>

        <div style={{ opacity: ctaOpacity, background: BLACK, borderRadius: 18, padding: '18px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(22, WHITE), marginBottom: 8 }}>FOLLOW FOR DAILY MONEY MOVES</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, textAlign: 'center', margin: 0 }}>
            One tip a day that actually moves the needle.
          </p>
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
