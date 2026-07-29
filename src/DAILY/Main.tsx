import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GOLD = '#F59E0B';
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

// Scene 1: Person with coins floating away — $58 billion in forgotten cash
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 45 });

  const coinData = [
    { startX: 440, endY: -90, delay: 32, size: 48 },
    { startX: 520, endY: -115, delay: 52, size: 36 },
    { startX: 378, endY: -100, delay: 44, size: 42 },
    { startX: 602, endY: -88, delay: 68, size: 34 },
    { startX: 462, endY: -130, delay: 78, size: 40 },
  ];

  const statOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statY = interpolate(frame, [130, 155], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center',
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <p style={{ ...headline(50, WHITE), lineHeight: 1.15 }}>YOUR FORGOTTEN</p>
        <p style={{ ...headline(50, ACCENT), lineHeight: 1.15 }}>CASH</p>
      </div>

      <div style={{ position: 'absolute', top: 370, left: '50%', transform: `translateX(-50%) scale(${personScale})` }}>
        <svg width="300" height="310" viewBox="0 0 300 310">
          <circle cx="150" cy="68" r="52" fill="#F5CBA7" stroke="#D4A574" strokeWidth="4" />
          <rect x="100" y="120" width="100" height="108" rx="14" fill="#2C5F8A" />
          <rect x="54" y="128" width="46" height="22" rx="11" fill="#F5CBA7" />
          <rect x="200" y="128" width="46" height="22" rx="11" fill="#F5CBA7" />
          <rect x="104" y="228" width="40" height="76" rx="8" fill="#1a1a2e" />
          <rect x="156" y="228" width="40" height="76" rx="8" fill="#1a1a2e" />
          <circle cx="138" cy="58" r="8" fill="#333" />
          <circle cx="162" cy="58" r="8" fill="#333" />
          <ellipse cx="150" cy="82" rx="13" ry="10" fill="none" stroke="#333" strokeWidth="3" />
        </svg>
      </div>

      {coinData.map((coin, i) => {
        const coinY = interpolate(
          frame,
          [coin.delay, coin.delay + 88],
          [370, 370 + coin.endY],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );
        const coinOp = interpolate(
          frame,
          [coin.delay, coin.delay + 12, coin.delay + 76, coin.delay + 92],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const s = coin.size;
        return (
          <div key={i} style={{ position: 'absolute', left: coin.startX - s / 2, top: coinY, opacity: coinOp }}>
            <svg width={s} height={s} viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill={GOLD} />
              <text x="24" y="30" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="22" fontWeight="bold">$</text>
            </svg>
          </div>
        );
      })}

      <div style={{
        position: 'absolute', bottom: 165, left: 40, right: 40, textAlign: 'center',
        opacity: statOp, transform: `translateY(${statY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>States are holding</p>
        <p style={{ ...headline(88, ACCENT), margin: '8px 0' }}>$58B</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#999', margin: 0 }}>in forgotten money</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Four types of unclaimed property spring in
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const itemDelays = [18, 50, 82, 114];
  const footerOp = interpolate(frame, [150, 174], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [150, 174], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BLUE2 = '#3B82F6';
  const PURPLE2 = '#8B5CF6';

  const items = [
    { label: 'Old Bank Accounts', color: BLUE2 },
    { label: 'Uncashed Paychecks', color: ACCENT },
    { label: 'Insurance Refunds', color: PURPLE2 },
    { label: 'Security Deposits', color: GOLD },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(46, BLACK) }}>WHERE IS</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>YOUR MONEY?</p>
      </div>

      <div style={{ position: 'absolute', top: 290, left: 60, right: 60 }}>
        {items.map((item, i) => {
          const sc = spring({ frame: Math.max(0, frame - itemDelays[i]), fps, config: { damping: 12, stiffness: 140 }, durationInFrames: 35 });
          const op = interpolate(frame, [itemDelays[i], itemDelays[i] + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 28, marginBottom: 30,
              opacity: op, transform: `scale(${sc})`, transformOrigin: 'left center',
            }}>
              <div style={{
                width: 84, height: 84, borderRadius: 18, background: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {i === 0 && <>
                    <polygon points="25,4 46,20 4,20" fill={WHITE} />
                    <rect x="8" y="22" width="8" height="20" fill={WHITE} />
                    <rect x="21" y="22" width="8" height="20" fill={WHITE} />
                    <rect x="34" y="22" width="8" height="20" fill={WHITE} />
                    <rect x="4" y="42" width="42" height="5" fill={WHITE} />
                  </>}
                  {i === 1 && <>
                    <rect x="8" y="4" width="34" height="42" rx="4" fill={WHITE} />
                    <rect x="14" y="16" width="22" height="3" rx="1.5" fill={item.color} />
                    <rect x="14" y="24" width="15" height="3" rx="1.5" fill={item.color} />
                    <text x="25" y="38" textAnchor="middle" fill={item.color} fontFamily="Arial Black" fontSize="13" fontWeight="bold">$</text>
                  </>}
                  {i === 2 && <>
                    <path d="M25,4 L44,12 L44,28 Q44,38 25,46 Q6,38 6,28 L6,12 Z" fill={WHITE} />
                    <path d="M 16 26 L 23 33 L 34 16" fill="none" stroke={item.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </>}
                  {i === 3 && <>
                    <polygon points="25,5 46,24 4,24" fill={WHITE} />
                    <rect x="10" y="24" width="30" height="22" fill={WHITE} />
                    <rect x="20" y="32" width="10" height="14" rx="2" fill={item.color} />
                  </>}
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0, fontWeight: 'bold' }}>{item.label}</p>
                <div style={{ height: 4, background: item.color, borderRadius: 2, marginTop: 8, width: '80%' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>
          All of it sitting in <span style={{ color: ACCENT }}>a government database</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Stat cards — 40M accounts, 1 in 10 Americans, $892 average
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card1Sc = spring({ frame, fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 40 });
  const card2Sc = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 40 });
  const card3Sc = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 40 });

  const countNum = Math.floor(interpolate(frame, [20, 100], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const avgNum = Math.floor(interpolate(frame, [80, 160], [0, 892], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const footerOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [160, 185], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(48, WHITE) }}>THE NUMBERS</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>ARE WILD</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 60, right: 60, display: 'flex', flexDirection: 'column' as const, gap: 28 }}>
        <div style={{
          background: '#1E1E1E', borderRadius: 20, padding: '28px 36px',
          border: `3px solid ${ACCENT}`,
          transform: `scale(${card1Sc})`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#999', margin: 0 }}>ACCOUNTS WAITING</p>
          <p style={{ ...headline(50, ACCENT), margin: 0 }}>{countNum}M+</p>
        </div>

        <div style={{
          background: '#1E1E1E', borderRadius: 20, padding: '28px 36px',
          border: `3px solid ${GOLD}`,
          transform: `scale(${card2Sc})`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#999', margin: 0 }}>AMERICANS OWED MONEY</p>
          <p style={{ ...headline(50, GOLD), margin: 0 }}>1 IN 10</p>
        </div>

        <div style={{
          background: '#1E1E1E', borderRadius: 20, padding: '28px 36px',
          border: `3px solid ${WHITE}`,
          transform: `scale(${card3Sc})`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#999', margin: 0 }}>AVERAGE AMOUNT</p>
          <p style={{ ...headline(50, WHITE), margin: 0 }}>${avgNum}</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>
          And it <span style={{ color: ACCENT }}>never expires.</span> It stays there until you claim it.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Three-step claim process
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stepDelays = [8, 68, 128];
  const footerOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [165, 188], [26, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BLUE4 = '#3B82F6';

  const steps = [
    { label: 'Search your name', stepLabel: 'STEP 1', color: ACCENT, icon: 'search' },
    { label: "See what you're owed", stepLabel: 'STEP 2', color: GOLD, icon: 'dollar' },
    { label: 'Claim it — completely free', stepLabel: 'STEP 3', color: BLUE4, icon: 'check' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(46, BLACK) }}>HOW TO CLAIM</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>YOUR MONEY</p>
      </div>

      <div style={{ position: 'absolute', top: 295, left: 60, right: 60 }}>
        {steps.map((step, i) => {
          const sc = spring({ frame: Math.max(0, frame - stepDelays[i]), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 38 });
          const op = interpolate(frame, [stepDelays[i], stepDelays[i] + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 28, marginBottom: 36,
              opacity: op, transform: `scale(${sc})`, transformOrigin: 'left center',
            }}>
              <div style={{
                width: 92, height: 92, borderRadius: 46, background: step.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="52" height="52" viewBox="0 0 52 52">
                  {step.icon === 'search' && <>
                    <circle cx="22" cy="22" r="16" fill="none" stroke={WHITE} strokeWidth="5" />
                    <line x1="34" y1="34" x2="46" y2="46" stroke={WHITE} strokeWidth="5" strokeLinecap="round" />
                  </>}
                  {step.icon === 'dollar' && <>
                    <circle cx="26" cy="26" r="20" fill="none" stroke={WHITE} strokeWidth="4" />
                    <text x="26" y="33" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="24" fontWeight="bold">$</text>
                  </>}
                  {step.icon === 'check' && (
                    <path d="M 10 26 L 22 38 L 42 14" fill="none" stroke={WHITE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 22, color: '#666', margin: '0 0 4px 0', letterSpacing: '0.1em' }}>{step.stepLabel}</p>
                <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0, fontWeight: 'bold' }}>{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>
          Takes <span style={{ color: ACCENT, fontWeight: 'bold' }}>under 5 minutes.</span> And it is 100% free.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5: State grid — check every state you've ever lived in
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stateData = [
    { abbr: 'CA', amount: '$12B', color: '#3B82F6' },
    { abbr: 'NY', amount: '$9B', color: '#8B5CF6' },
    { abbr: 'TX', amount: '$8B', color: GOLD },
    { abbr: 'FL', amount: '$6B', color: '#EF4444' },
    { abbr: 'IL', amount: '$3B', color: ACCENT },
    { abbr: 'OH', amount: '$2.8B', color: '#06B6D4' },
    { abbr: 'PA', amount: '$2.4B', color: '#F97316' },
    { abbr: 'WA', amount: '$1.9B', color: '#EC4899' },
    { abbr: 'GA', amount: '$1.6B', color: '#84CC16' },
  ];

  const footerOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [155, 180], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(44, WHITE) }}>CHECK EVERY STATE</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>YOU'VE EVER LIVED</p>
      </div>

      <div style={{
        position: 'absolute', top: 300, left: 50, right: 50,
        display: 'flex', flexWrap: 'wrap' as const, gap: 20, justifyContent: 'center',
      }}>
        {stateData.map((s, i) => {
          const cardScale = interpolate(frame, [30 + i * 14, 55 + i * 14], [0.4, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.out(Easing.back(1.6)),
          });
          const cardOp = interpolate(frame, [30 + i * 14, 46 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              width: 188, height: 112, borderRadius: 16,
              background: '#1E1E1E', border: `3px solid ${s.color}`,
              display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
              transform: `scale(${cardScale})`, opacity: cardOp,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 40, color: s.color, margin: 0, fontWeight: 'bold' }}>{s.abbr}</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '4px 0 0 0' }}>{s.amount}</p>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>
          Most people find money in <span style={{ color: ACCENT }}>multiple states.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 6: CTA — piggy bank with coin dropping in, missingmoney.com badge
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggyScale = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 12, stiffness: 110 }, durationInFrames: 50 });

  const coinOp = interpolate(frame, [68, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY = interpolate(frame, [68, 90], [0, 36], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const siteOp = interpolate(frame, [112, 136], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const siteScale = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 10, stiffness: 160 }, durationInFrames: 35 });

  const ctaOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [155, 180], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const legXs = [52, 92, 134, 174];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(46, BLACK) }}>CHECK RIGHT NOW</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>IT'S FREE</p>
      </div>

      <div style={{
        position: 'absolute', top: 305, left: '50%',
        transform: `translateX(-50%) scale(${piggyScale})`,
      }}>
        <svg width="290" height="250" viewBox="0 0 290 250">
          <ellipse cx="135" cy="158" rx="112" ry="85" fill="#FFB6C1" stroke={ACCENT} strokeWidth="4" />
          <circle cx="228" cy="110" r="54" fill="#FFB6C1" stroke={ACCENT} strokeWidth="4" />
          <ellipse cx="260" cy="124" rx="26" ry="18" fill="#FF9EBA" stroke={ACCENT} strokeWidth="2" />
          <circle cx="253" cy="124" r="6" fill={ACCENT} />
          <circle cx="267" cy="124" r="6" fill={ACCENT} />
          <circle cx="230" cy="96" r="9" fill={WHITE} />
          <circle cx="232" cy="96" r="5" fill="#222" />
          <ellipse cx="208" cy="70" rx="16" ry="22" fill="#FFB6C1" stroke={ACCENT} strokeWidth="3" />
          <rect x="112" y="68" width="46" height="10" rx="5" fill={ACCENT} />
          {legXs.map((x, idx) => (
            <rect key={idx} x={x} y={226} width={28} height={22} rx={7} fill="#FFB6C1" stroke={ACCENT} strokeWidth="3" />
          ))}
          <path d="M 22 155 Q 2 135 12 112 Q 22 90 36 110" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div style={{
          position: 'absolute', top: -36, left: 104,
          opacity: coinOp, transform: `translateY(${coinY}px)`,
        }}>
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill={GOLD} />
            <text x="25" y="31" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="22" fontWeight="bold">$</text>
          </svg>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 308, left: 60, right: 60, textAlign: 'center',
        opacity: siteOp, transform: `scale(${siteScale})`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '20px 36px' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>missingmoney.com</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: '6px 0 0 0' }}>or search "[your state] unclaimed property"</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center',
        opacity: ctaOp, transform: `translateY(${ctaY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>
          Save this video — then <span style={{ color: ACCENT }}>go check right now.</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 22, color: '#555', margin: '16px 0 0 0', letterSpacing: '0.1em' }}>
          FOLLOW FOR MORE MONEY TRUTHS
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
