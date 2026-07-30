import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GOLD = '#F59E0B';
const RED = '#EF4444';
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

// Scene 1: Person at desk with tiny 3% raise on monitor, new hire badge appearing
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 45 });
  const badgeOp = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeY = interpolate(frame, [72, 92], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardOp = interpolate(frame, [112, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardX = interpolate(frame, [112, 132], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [158, 180], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 128, left: 40, right: 40, textAlign: 'center',
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <p style={{ ...headline(52, WHITE), lineHeight: 1.15 }}>YOUR LOYALTY</p>
        <p style={{ ...headline(52, ACCENT), lineHeight: 1.15, marginTop: 8 }}>HAS A PRICE</p>
      </div>

      <div style={{
        position: 'absolute', top: 350, left: '50%',
        transform: `translateX(-50%) scale(${personScale})`,
      }}>
        <svg width="320" height="280" viewBox="0 0 320 280">
          <circle cx="80" cy="52" r="42" fill="#F5CBA7" stroke="#D4A574" strokeWidth="3" />
          <rect x="44" y="94" width="72" height="76" rx="12" fill="#2C5F8A" />
          <rect x="18" y="102" width="28" height="16" rx="8" fill="#F5CBA7" />
          <rect x="116" y="102" width="28" height="16" rx="8" fill="#F5CBA7" />
          <circle cx="68" cy="44" r="6" fill="#333" />
          <circle cx="92" cy="44" r="6" fill="#333" />
          <ellipse cx="80" cy="66" rx="10" ry="7" fill="none" stroke="#555" strokeWidth="2.5" />
          <rect x="2" y="173" width="316" height="12" rx="5" fill="#5C4033" />
          <rect x="14" y="185" width="10" height="56" rx="4" fill="#4a3328" />
          <rect x="296" y="185" width="10" height="56" rx="4" fill="#4a3328" />
          <rect x="110" y="90" width="188" height="116" rx="8" fill="#1a1a2e" stroke="#444" strokeWidth="2" />
          <rect x="122" y="100" width="164" height="90" rx="4" fill="#0d0d1a" />
          <rect x="188" y="206" width="24" height="12" rx="3" fill="#333" />
          <rect x="174" y="218" width="52" height="6" rx="2" fill="#555" />
          <text x="204" y="150" textAnchor="middle" fill={RED} fontFamily="Arial Black" fontSize="36" fontWeight="bold">+3%</text>
          <text x="204" y="177" textAnchor="middle" fill="#555" fontFamily="Arial" fontSize="14">YOUR ANNUAL RAISE</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 416, left: 52,
        opacity: badgeOp, transform: `translateY(${badgeY}px)`,
      }}>
        <div style={{ background: RED, borderRadius: 14, padding: '8px 18px', fontFamily: FONT, fontSize: 20, color: WHITE }}>
          LOYAL EMPLOYEE
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 472, right: 52,
        opacity: cardOp, transform: `translateX(${cardX}px)`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 14, padding: '8px 18px', fontFamily: FONT, fontSize: 20, color: WHITE }}>
          NEW HIRE: +18%
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 162, left: 40, right: 40, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>
          Same job. Same office. <span style={{ color: RED }}>Different pay.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Two salary budget bars — loyalty budget vs external hire budget
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const CHART_BOTTOM = 800;
  const LEFT_X = 170;
  const RIGHT_X = 600;
  const BAR_W = 200;

  const leftBarH = interpolate(frame, [28, 95], [0, 120], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rightBarH = interpolate(frame, [70, 158], [0, 400], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const leftLabelOp = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightLabelOp = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [174, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerY = interpolate(frame, [174, 198], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(48, BLACK) }}>SAME JOB</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>TWO BUDGETS</p>
      </div>

      {/* Left bar — keep you */}
      <div style={{
        position: 'absolute', left: LEFT_X, top: CHART_BOTTOM - leftBarH,
        width: BAR_W, height: leftBarH, background: RED, borderRadius: '12px 12px 0 0',
      }} />
      <div style={{
        position: 'absolute', left: LEFT_X - 20, top: CHART_BOTTOM - leftBarH - 52,
        width: BAR_W + 40, textAlign: 'center', opacity: leftLabelOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: RED, margin: 0 }}>3%</p>
      </div>
      <div style={{
        position: 'absolute', left: LEFT_X - 30, top: CHART_BOTTOM + 16,
        width: BAR_W + 60, textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>KEEP YOU</p>
        <p style={{ fontFamily: FONT, fontSize: 17, color: '#777', margin: '4px 0 0 0' }}>loyalty budget</p>
      </div>

      {/* Right bar — hire outsider */}
      <div style={{
        position: 'absolute', left: RIGHT_X, top: CHART_BOTTOM - rightBarH,
        width: BAR_W, height: rightBarH, background: ACCENT, borderRadius: '12px 12px 0 0',
      }} />
      <div style={{
        position: 'absolute', left: RIGHT_X - 20, top: CHART_BOTTOM - rightBarH - 52,
        width: BAR_W + 40, textAlign: 'center', opacity: rightLabelOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0 }}>18-20%</p>
      </div>
      <div style={{
        position: 'absolute', left: RIGHT_X - 30, top: CHART_BOTTOM + 16,
        width: BAR_W + 60, textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>HIRE OUTSIDER</p>
        <p style={{ fontFamily: FONT, fontSize: 17, color: '#777', margin: '4px 0 0 0' }}>external budget</p>
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center',
        opacity: footerOp, transform: `translateY(${footerY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>
          They can't pay you more — <span style={{ color: RED }}>but they'll pay a stranger it.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Two salary race bars over 10 years — $147K gap counter
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const MAXW = 860;

  const loyalW = interpolate(frame, [30, 155], [0, (80 / 227) * MAXW], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const hopperW = interpolate(frame, [30, 155], [0, MAXW], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const loyalNum = Math.floor(interpolate(frame, [30, 155], [60000, 80000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const hopperNum = Math.floor(interpolate(frame, [30, 155], [60000, 227000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const gapNum = Math.max(0, hopperNum - loyalNum);

  const gapScale = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 10, stiffness: 160 }, durationInFrames: 30 });
  const gapOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [174, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(46, WHITE) }}>10-YEAR</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>SALARY RACE</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 50, right: 50 }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 24, color: '#aaa', margin: 0 }}>LOYAL EMPLOYEE</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: RED, margin: 0 }}>${loyalNum.toLocaleString()}</p>
          </div>
          <div style={{ background: '#2a2a2a', borderRadius: 10, height: 36, overflow: 'hidden' }}>
            <div style={{ width: loyalW, height: 36, background: RED, borderRadius: 10 }} />
          </div>
        </div>
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 24, color: '#aaa', margin: 0 }}>JOB-HOPPER</p>
            <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: 0 }}>${hopperNum.toLocaleString()}</p>
          </div>
          <div style={{ background: '#2a2a2a', borderRadius: 10, height: 36, overflow: 'hidden' }}>
            <div style={{ width: Math.min(hopperW, MAXW), height: 36, background: ACCENT, borderRadius: 10 }} />
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 620, left: '50%',
        transform: `translateX(-50%) scale(${gapScale})`,
        opacity: gapOp, width: 520,
      }}>
        <div style={{
          background: '#0d1f16', border: `3px solid ${ACCENT}`,
          borderRadius: 22, padding: '22px 36px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#aaa', margin: '0 0 6px 0', letterSpacing: '0.1em' }}>EARNINGS GAP</p>
          <p style={{ ...headline(68, ACCENT), margin: 0 }}>${gapNum.toLocaleString()}</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center', opacity: footerOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>
          That's a <span style={{ color: ACCENT }}>house down payment</span> left on the table.
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Brain with chain and anchor — status quo bias trap, money floating up
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 110 }, durationInFrames: 45 });
  const chainOp = interpolate(frame, [68, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [100, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelX = interpolate(frame, [100, 122], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const moneyItems = [
    { x: 360, delay: 128 },
    { x: 540, delay: 144 },
    { x: 718, delay: 136 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(44, BLACK) }}>WHY YOU STAY</p>
        <p style={{ ...headline(44, RED), marginTop: 8 }}>WHEN IT COSTS YOU</p>
      </div>

      <div style={{
        position: 'absolute', top: 338, left: '50%',
        transform: `translateX(-50%) scale(${brainScale})`,
      }}>
        <svg width="280" height="200" viewBox="0 0 280 200">
          <ellipse cx="140" cy="88" rx="108" ry="76" fill="#FFB3C6" stroke="#E87B9A" strokeWidth="4" />
          <path d="M 60 68 Q 80 43 110 53 Q 130 38 150 53 Q 170 40 196 56 Q 216 68 220 88" fill="none" stroke="#E87B9A" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 54 98 Q 74 118 100 110 Q 120 122 140 110 Q 160 122 180 110 Q 206 118 226 98" fill="none" stroke="#E87B9A" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 80 136 Q 110 146 140 138 Q 170 146 200 136" fill="none" stroke="#E87B9A" strokeWidth="3" strokeLinecap="round" />
          <path d="M 140 22 Q 155 58 140 88 Q 125 118 140 156" fill="none" stroke="#E87B9A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 524, left: '50%', transform: 'translateX(-50%)',
        opacity: chainOp,
      }}>
        <svg width="60" height="128" viewBox="0 0 60 128">
          {[0, 26, 52].map((y, idx) => (
            <ellipse key={idx} cx="30" cy={y + 14} rx="12" ry="8" fill="none" stroke="#888" strokeWidth="4" />
          ))}
          <circle cx="30" cy="96" r="9" fill="none" stroke="#555" strokeWidth="4" />
          <line x1="30" y1="96" x2="30" y2="118" stroke="#555" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="118" x2="48" y2="118" stroke="#555" strokeWidth="4" strokeLinecap="round" />
          <path d="M 12 118 Q 4 110 8 102" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <path d="M 48 118 Q 56 110 52 102" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 652, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', opacity: labelOp,
      }}>
        <div style={{
          background: RED, borderRadius: 16, padding: '10px 28px',
          fontFamily: FONT, fontSize: 22, color: WHITE, whiteSpace: 'nowrap' as const,
          transform: `translateX(${labelX}px)`,
        }}>
          STATUS QUO BIAS
        </div>
      </div>

      {moneyItems.map((m, i) => {
        const mY = interpolate(frame, [m.delay, m.delay + 62], [450, 310], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const mOp = interpolate(frame, [m.delay, m.delay + 12, m.delay + 52, m.delay + 66], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <div key={i} style={{ position: 'absolute', left: m.x - 24, top: mY, opacity: mOp }}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill={ACCENT} />
              <text x="24" y="30" textAnchor="middle" fill={WHITE} fontFamily="Arial Black" fontSize="22" fontWeight="bold">$</text>
            </svg>
          </div>
        );
      })}

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center', opacity: footerOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>
          Comfort is expensive. <span style={{ color: RED }}>Companies know that.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5: Two person figures — YOU (sitting, $65K) vs NEW HIRE (walking in, $79K)
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSc = spring({ frame, fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 45 });
  const rightSc = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 45 });
  const arrowOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [118, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(44, WHITE) }}>HAPPENING RIGHT NOW</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>IN YOUR OFFICE</p>
      </div>

      {/* YOU — seated person */}
      <div style={{
        position: 'absolute', top: 330, left: 84,
        transform: `scale(${leftSc})`, transformOrigin: 'center bottom',
      }}>
        <svg width="196" height="248" viewBox="0 0 196 248">
          <rect x="56" y="182" width="84" height="10" rx="4" fill="#555" />
          <rect x="92" y="192" width="12" height="48" rx="4" fill="#555" />
          <rect x="66" y="238" width="64" height="8" rx="3" fill="#444" />
          <rect x="48" y="130" width="96" height="62" rx="14" fill="#2C5F8A" />
          <rect x="22" y="138" width="28" height="16" rx="8" fill="#F5CBA7" />
          <rect x="144" y="138" width="28" height="16" rx="8" fill="#F5CBA7" />
          <circle cx="96" cy="80" r="44" fill="#F5CBA7" stroke="#D4A574" strokeWidth="3" />
          <circle cx="82" cy="72" r="6" fill="#333" />
          <circle cx="110" cy="72" r="6" fill="#333" />
          <ellipse cx="96" cy="96" rx="11" ry="8" fill="none" stroke="#555" strokeWidth="2.5" />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', textAlign: 'center', margin: '6px 0 0 0', letterSpacing: '0.1em' }}>YOU</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: RED, textAlign: 'center', margin: '4px 0 0 0' }}>$65K</p>
      </div>

      {/* Gap arrow */}
      <div style={{
        position: 'absolute', top: 490, left: '50%', transform: 'translateX(-50%)',
        opacity: arrowOp, display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      }}>
        <svg width="140" height="52" viewBox="0 0 140 52">
          <line x1="10" y1="26" x2="130" y2="26" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          <polygon points="120,14 140,26 120,38" fill={ACCENT} />
          <polygon points="20,14 0,26 20,38" fill={ACCENT} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '4px 0 0 0', opacity: labelOp }}>+$14K GAP</p>
      </div>

      {/* NEW HIRE — walking person */}
      <div style={{
        position: 'absolute', top: 330, right: 84,
        transform: `scale(${rightSc})`, transformOrigin: 'center bottom',
      }}>
        <svg width="196" height="248" viewBox="0 0 196 248">
          <rect x="58" y="198" width="32" height="46" rx="9" fill="#1a1a2e" transform="rotate(-10, 74, 220)" />
          <rect x="106" y="198" width="32" height="46" rx="9" fill="#1a1a2e" transform="rotate(8, 122, 220)" />
          <rect x="48" y="126" width="100" height="78" rx="14" fill={ACCENT} />
          <rect x="22" y="134" width="28" height="16" rx="8" fill="#F5CBA7" />
          <rect x="146" y="134" width="28" height="16" rx="8" fill="#F5CBA7" />
          <circle cx="98" cy="76" r="44" fill="#F5CBA7" stroke="#D4A574" strokeWidth="3" />
          <circle cx="84" cy="68" r="6" fill="#333" />
          <circle cx="112" cy="68" r="6" fill="#333" />
          <ellipse cx="98" cy="90" rx="12" ry="8" fill="none" stroke="#333" strokeWidth="2.5" />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#888', textAlign: 'center', margin: '6px 0 0 0', letterSpacing: '0.1em' }}>NEW HIRE</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, textAlign: 'center', margin: '4px 0 0 0' }}>$79K</p>
      </div>

      <div style={{
        position: 'absolute', bottom: 155, left: 50, right: 50, textAlign: 'center', opacity: footerOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>
          Next year they both get <span style={{ color: RED }}>the same 3%.</span>
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 6: CTA — person walking through open door into green light, negotiate accordingly
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const doorScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 45 });
  const lightOp = interpolate(frame, [55, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOp = interpolate(frame, [78, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personX = interpolate(frame, [78, 100], [-28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [112, 136], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 10, stiffness: 150 }, durationInFrames: 35 });
  const ctaOp = interpolate(frame, [158, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [158, 182], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lightAlpha = lightOp;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center', opacity: titleOp }}>
        <p style={{ ...headline(46, BLACK) }}>YOUR CAREER IS</p>
        <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>A BUSINESS</p>
      </div>

      <div style={{
        position: 'absolute', top: 320, left: '50%',
        transform: `translateX(-50%) scale(${doorScale})`,
      }}>
        <svg width="310" height="340" viewBox="0 0 310 340">
          {/* Door frame outer */}
          <rect x="38" y="8" width="234" height="316" rx="10" fill="#c8956a" stroke="#8B5E3C" strokeWidth="5" />
          {/* Green light fill (animated) */}
          <rect x="44" y="14" width="222" height="304" rx="7" fill={`rgba(16,185,129,${lightAlpha * 0.7})`} />
          {/* Door panel (left, ajar) */}
          <rect x="44" y="14" width="106" height="304" rx="7" fill="#c8956a" stroke="#8B5E3C" strokeWidth="3" />
          {/* Door panel details */}
          <rect x="56" y="30" width="80" height="110" rx="5" fill="none" stroke="#8B5E3C" strokeWidth="2" />
          <rect x="56" y="158" width="80" height="140" rx="5" fill="none" stroke="#8B5E3C" strokeWidth="2" />
          {/* Door knob */}
          <circle cx="132" cy="180" r="10" fill={GOLD} stroke="#d4a017" strokeWidth="2" />
          {/* Floor */}
          <line x1="0" y1="322" x2="310" y2="322" stroke="#aaa" strokeWidth="3" />
          {/* Walking person */}
          <g opacity={personOp} transform={`translate(${148 + personX}, 130)`}>
            <circle cx="36" cy="0" r="28" fill="#F5CBA7" stroke="#D4A574" strokeWidth="2" />
            <circle cx="28" cy="-8" r="5" fill="#333" />
            <circle cx="44" cy="-8" r="5" fill="#333" />
            <ellipse cx="36" cy="12" rx="9" ry="7" fill="none" stroke="#555" strokeWidth="2" />
            <rect x="16" y="28" width="40" height="52" rx="10" fill={ACCENT} />
            <rect x="0" y="33" width="18" height="12" rx="6" fill="#F5CBA7" />
            <rect x="54" y="33" width="18" height="12" rx="6" fill="#F5CBA7" />
            <rect x="18" y="80" width="16" height="38" rx="7" fill="#1a1a2e" transform="rotate(-9, 26, 98)" />
            <rect x="38" y="80" width="16" height="38" rx="7" fill="#1a1a2e" transform="rotate(7, 46, 98)" />
          </g>
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: 675, left: '50%',
        transform: `translateX(-50%) scale(${badgeScale})`,
        opacity: badgeOp, whiteSpace: 'nowrap' as const,
      }}>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '18px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>NEGOTIATE ACCORDINGLY</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 145, left: 50, right: 50, textAlign: 'center',
        opacity: ctaOp, transform: `translateY(${ctaY}px)`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>
          That offer isn't betrayal — <span style={{ color: ACCENT }}>it's math.</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#555', margin: '14px 0 0 0', letterSpacing: '0.1em' }}>
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
