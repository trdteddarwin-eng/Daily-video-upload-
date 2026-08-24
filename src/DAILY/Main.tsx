import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
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
  const titleY = interpolate(frame, [5, 45], [-120, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const doorScale = spring({ frame: frame - 25, fps: 30, from: 0.4, to: 1, config: { damping: 14, stiffness: 90 } });
  const badgeScale = spring({ frame: frame - 85, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });
  const badgeOp = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ ...headline(52, WHITE), transform: `translateY(${titleY}px)`, marginBottom: 36, lineHeight: 1.1 }}>
          THE STORAGE<br />UNIT TRAP
        </div>

        <div style={{ transform: `scale(${doorScale})`, marginBottom: 32 }}>
          <svg width="280" height="220" viewBox="0 0 280 220">
            <rect x="20" y="10" width="240" height="190" rx="4" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            <rect x="20" y="28" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="46" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="64" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="82" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="100" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="118" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="136" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="154" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="20" y="172" width="240" height="2" fill={ACCENT} opacity="0.3" />
            <rect x="116" y="192" width="48" height="8" rx="4" fill={ACCENT} />
            <rect x="122" y="96" width="36" height="30" rx="5" fill="#444" stroke={ACCENT} strokeWidth="2" />
            <path d="M130 96 Q130 80 140 80 Q150 80 150 96" fill="none" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="140" cy="110" r="5" fill={ACCENT} />
          </svg>
        </div>

        <div style={{ transform: `scale(${badgeScale})`, opacity: badgeOp, background: ACCENT, borderRadius: 16, padding: '12px 36px', marginBottom: 28 }}>
          <div style={{ ...headline(52, WHITE) }}>$190/mo</div>
        </div>

        <div style={{ opacity: statOp, ...headline(26, '#AAAAAA'), letterSpacing: '0.08em', lineHeight: 1.4 }}>
          1 IN 10 AMERICANS HAS ONE
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarVal = Math.round(interpolate(frame, [30, 145], [0, 2280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const monthsFilled = Math.min(12, Math.floor(interpolate(frame, [50, 165], [0, 12.99], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const labelOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ opacity: titleOp, ...headline(38, BLACK), marginBottom: 36, lineHeight: 1.2 }}>
          "JUST A FEW MONTHS..."
        </div>

        <div style={{ background: BLACK, borderRadius: 20, padding: '20px 40px', marginBottom: 32, minWidth: 320, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 72, color: ACCENT, letterSpacing: '0.05em', margin: 0 }}>
            ${dollarVal.toLocaleString()}
          </div>
          <div style={{ ...headline(22, WHITE), opacity: 0.7, marginTop: 6 }}>SPENT SO FAR</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center', maxWidth: 380, marginBottom: 24 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{
              width: 52, height: 52, borderRadius: 10,
              background: i < monthsFilled ? ACCENT : '#DDDDDD',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: FONT, fontSize: 18, color: i < monthsFilled ? WHITE : '#999', letterSpacing: 0 }}>
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        <div style={{ ...headline(28, BLACK), opacity: labelOp }}>= $2,280 / YEAR</div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [25, 130], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const bar2H = interpolate(frame, [55, 145], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const num1Op = interpolate(frame, [128, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const num2Op = interpolate(frame, [143, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [168, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ ...headline(42, WHITE), opacity: titleOp, marginBottom: 36, lineHeight: 1.1 }}>
          4 YEARS LATER
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 56, marginBottom: 20, height: 340 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ opacity: num1Op, ...headline(30, ACCENT), marginBottom: 10 }}>$9,120</div>
            <div style={{ width: 110, height: bar1H, background: ACCENT, borderRadius: '10px 10px 0 0' }} />
            <div style={{ ...headline(20, WHITE), marginTop: 10, opacity: 0.8 }}>PAID IN</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ opacity: num2Op, ...headline(30, GREEN), marginBottom: 10 }}>~$1,500</div>
            <div style={{ width: 110, height: bar2H, background: GREEN, borderRadius: '10px 10px 0 0' }} />
            <div style={{ ...headline(20, WHITE), marginTop: 10, opacity: 0.8 }}>STUFF WORTH</div>
          </div>
        </div>

        <div style={{ opacity: statOp, background: ACCENT + '22', borderRadius: 14, padding: '14px 28px', borderLeft: `4px solid ${ACCENT}` }}>
          <div style={{ ...headline(24, WHITE), letterSpacing: '0.05em' }}>
            65% PAY MORE THAN IT'S WORTH
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cameraScale = spring({ frame: frame - 20, fps: 30, from: 0, to: 1, config: { damping: 13, stiffness: 90 } });
  const storageScale = spring({ frame: frame - 55, fps: 30, from: 0, to: 1, config: { damping: 13, stiffness: 90 } });
  const vsOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [160, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ ...headline(38, BLACK), opacity: titleOp, marginBottom: 44, lineHeight: 1.1 }}>
          BIGGER THAN<br />HOLLYWOOD
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 36 }}>
          <div style={{ transform: `scale(${cameraScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="96" height="76" viewBox="0 0 96 76">
              <rect x="4" y="18" width="56" height="42" rx="6" fill={BLACK} />
              <polygon points="60,26 88,14 88,62 60,50" fill="#333" />
              <circle cx="30" cy="39" r="13" fill="#555" />
              <circle cx="30" cy="39" r="7" fill={BLACK} />
            </svg>
            <div style={{ ...headline(18, '#666'), marginTop: 4 }}>HOLLYWOOD</div>
            <div style={{ ...headline(28, BLACK) }}>$33B</div>
          </div>

          <div style={{ opacity: vsOp, ...headline(44, ACCENT) }}>VS</div>

          <div style={{ transform: `scale(${storageScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="96" height="76" viewBox="0 0 96 76">
              <rect x="4" y="12" width="88" height="56" rx="4" fill="#333" stroke={ACCENT} strokeWidth="2" />
              <rect x="4" y="21" width="88" height="1.5" fill={ACCENT} opacity="0.45" />
              <rect x="4" y="30" width="88" height="1.5" fill={ACCENT} opacity="0.45" />
              <rect x="4" y="39" width="88" height="1.5" fill={ACCENT} opacity="0.45" />
              <rect x="4" y="48" width="88" height="1.5" fill={ACCENT} opacity="0.45" />
              <rect x="4" y="57" width="88" height="1.5" fill={ACCENT} opacity="0.45" />
              <rect x="36" y="62" width="24" height="6" rx="3" fill={ACCENT} />
            </svg>
            <div style={{ ...headline(18, '#666'), marginTop: 4 }}>SELF-STORAGE</div>
            <div style={{ ...headline(28, ACCENT) }}>$39.5B</div>
          </div>
        </div>

        <div style={{ opacity: statOp, ...headline(26, BLACK), lineHeight: 1.3 }}>
          GREW 700% SINCE 1984
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: frame - 20, fps: 30, from: 0.5, to: 1, config: { damping: 14, stiffness: 80 } });
  const drainProg = interpolate(frame, [50, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const tagOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagScale = spring({ frame: frame - 130, fps: 30, from: 0.5, to: 1, config: { damping: 10, stiffness: 120 } });
  const subOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ ...headline(44, WHITE), opacity: titleOp, marginBottom: 32, lineHeight: 1.1 }}>
          THE REAL<br />TRAP
        </div>

        <div style={{ transform: `scale(${piggyScale})`, marginBottom: 28, position: 'relative' as const }}>
          <svg width="220" height="185" viewBox="0 0 220 185">
            <ellipse cx="105" cy="115" rx="72" ry="60" fill="#E8A87C" />
            <circle cx="162" cy="98" r="34" fill="#E8A87C" />
            <ellipse cx="180" cy="106" rx="14" ry="10" fill="#D4956A" />
            <circle cx="175" cy="103" r="3" fill="#B87040" />
            <circle cx="183" cy="103" r="3" fill="#B87040" />
            <circle cx="167" cy="88" r="4" fill="#333" />
            <circle cx="168" cy="87" r="1.5" fill="white" />
            <ellipse cx="158" cy="68" rx="9" ry="13" fill="#D4956A" />
            <rect x="93" y="53" width="24" height="5" rx="2.5" fill="#B87040" />
            <rect x="56" y="163" width="20" height="22" rx="8" fill="#D4956A" />
            <rect x="80" y="166" width="20" height="19" rx="8" fill="#D4956A" />
            <rect x="104" y="166" width="20" height="19" rx="8" fill="#D4956A" />
            <rect x="128" y="163" width="20" height="22" rx="8" fill="#D4956A" />
            <ellipse cx="105" cy="115" rx="72" ry="60" fill={ACCENT} opacity={drainProg * 0.3} />
          </svg>
          <div style={{ position: 'absolute' as const, top: 44, right: -68, opacity: drainProg }}>
            <svg width="64" height="34" viewBox="0 0 64 34">
              <rect x="2" y="9" width="44" height="16" rx="3" fill={ACCENT} />
              <text x="24" y="21" textAnchor="middle" fill={WHITE} fontSize="11" fontFamily="Arial" fontWeight="bold">$$$</text>
              <line x1="46" y1="17" x2="62" y2="17" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="11" x2="62" y2="17" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="23" x2="62" y2="17" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div style={{ opacity: tagOp, transform: `scale(${tagScale})`, background: ACCENT, borderRadius: 16, padding: '16px 36px', marginBottom: 22 }}>
          <div style={{ ...headline(34, WHITE) }}>SUNK COST TRAP</div>
        </div>

        <div style={{ opacity: subOp, fontFamily: FONT, fontSize: 24, color: '#AAAAAA', lineHeight: 1.5, textAlign: 'center' as const, letterSpacing: '0.05em' }}>
          "I ALREADY PAID $3,000<br />
          <span style={{ color: ACCENT }}>SO I CAN'T STOP NOW"</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const doorOpen = interpolate(frame, [20, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const sellOp = interpolate(frame, [82, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sellY = interpolate(frame, [82, 112], [32, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const donateOp = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const donateY = interpolate(frame, [105, 135], [32, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const ctaOp = interpolate(frame, [152, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 152, fps: 30, from: 0.7, to: 1, config: { damping: 12, stiffness: 90 } });
  const openWidth = 260 * (1 - doorOpen);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ ...headline(44, BLACK), opacity: titleOp, marginBottom: 30, lineHeight: 1.1 }}>
          THE $9,120<br />FIX
        </div>

        <div style={{ marginBottom: 28 }}>
          <svg width="280" height="145" viewBox="0 0 280 145">
            <rect x="10" y="8" width="260" height="130" rx="4" fill="#2A2A2A" />
            <rect x="10" y="8" width={openWidth} height="130" rx="4" fill="#444" stroke={ACCENT} strokeWidth="2" />
            <rect x="10" y="20" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="33" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="46" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="59" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="72" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="85" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="98" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="111" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="124" width={openWidth} height="1.5" fill={ACCENT} opacity="0.35" />
            <rect x="10" y="8" width="260" height="130" rx="4" fill="#FFFDE7" opacity={doorOpen * 0.35} />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
          <div style={{ opacity: sellOp, transform: `translateY(${sellY}px)`, background: GREEN, borderRadius: 14, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="12" fill="rgba(255,255,255,0.2)" />
              <text x="13" y="18" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial" fontWeight="bold">$</text>
            </svg>
            <div style={{ ...headline(28, WHITE) }}>SELL IT</div>
          </div>
          <div style={{ opacity: donateOp, transform: `translateY(${donateY}px)`, background: BLUE, borderRadius: 14, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <path d="M13 22 C13 22 3 15 3 9 C3 6 5 4 8 4 C10.5 4 12 6 13 7.5 C14 6 15.5 4 18 4 C21 4 23 6 23 9 C23 15 13 22 13 22Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5" />
            </svg>
            <div style={{ ...headline(28, WHITE) }}>DONATE</div>
          </div>
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, ...headline(28, BLACK), lineHeight: 1.4 }}>
          FOLLOW FOR MORE MONEY<br />MOVES THAT ACTUALLY WORK
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
