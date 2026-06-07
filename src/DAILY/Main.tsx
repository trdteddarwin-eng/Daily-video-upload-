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

  const regS = spring({ frame, fps, config: { damping: 16, stiffness: 60 }, from: 0, to: 1 });
  const screenOp = interpolate(frame, [18, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const popupS = spring({ frame: Math.max(0, frame - 38), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const titleOp = interpolate(frame, [64, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [64, 88], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [130, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 70px' }}>
        <div style={{ transform: `scale(${regS})`, position: 'relative' }}>
          <svg width="220" height="190" viewBox="0 0 220 190">
            <rect x="20" y="10" width="180" height="70" rx="8" fill="#0A0A0A" stroke={ACCENT} strokeWidth="3" opacity={screenOp} />
            <text x="110" y="38" textAnchor="middle" fontSize="12" fill={ACCENT} fontFamily="Arial Black" opacity={screenOp}>PROTECTION PLAN?</text>
            <text x="110" y="60" textAnchor="middle" fontSize="14" fill={WHITE} fontFamily="Arial Black" opacity={screenOp}>ADD FOR $399?</text>
            <rect x="10" y="86" width="200" height="90" rx="8" fill="#1E1E1E" stroke="#374151" strokeWidth="2" />
            <rect x="22" y="98" width="24" height="16" rx="3" fill="#374151" />
            <rect x="54" y="98" width="24" height="16" rx="3" fill="#374151" />
            <rect x="86" y="98" width="24" height="16" rx="3" fill="#374151" />
            <rect x="118" y="98" width="24" height="16" rx="3" fill="#374151" />
            <rect x="22" y="120" width="24" height="16" rx="3" fill="#374151" />
            <rect x="54" y="120" width="24" height="16" rx="3" fill="#374151" />
            <rect x="86" y="120" width="24" height="16" rx="3" fill="#374151" />
            <rect x="118" y="120" width="24" height="16" rx="3" fill="#374151" />
            <rect x="22" y="142" width="120" height="16" rx="3" fill={ACCENT} />
            <rect x="10" y="162" width="200" height="14" rx="4" fill="#374151" />
          </svg>
          <div style={{ position: 'absolute', right: -22, top: 4, transform: `scale(${popupS})` }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="33" fill={ACCENT} />
              <text x="36" y="30" textAnchor="middle" fontSize="11" fill={WHITE} fontFamily="Arial Black">YES?</text>
              <text x="36" y="54" textAnchor="middle" fontSize="28" fill={WHITE} fontFamily="Arial Black">!</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>THAT "YES"</p>
          <p style={{ ...headline(76, ACCENT), lineHeight: 1 }}>COSTS YOU</p>
          <p style={{ ...headline(46, WHITE), lineHeight: 1 }}>THOUSANDS</p>
        </div>

        <div style={{ opacity: badgeOp, background: ACCENT, borderRadius: 12, padding: '14px 32px' }}>
          <p style={headline(20, WHITE)}>$40 BILLION SCAM / YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [24, 110], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [40, 120], [0, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [118, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [162, 186], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1 = Math.max(0, Math.floor(bar1H));
  const b2 = Math.max(0, Math.floor(bar2H));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleS})` }}>THE SCALE</p>
        <p style={{ ...headline(18, '#6B7280'), opacity: subOp }}>MORE THAN WE SPEND ON PET FOOD</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48, marginTop: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 120, height: b1, background: ACCENT, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 14 }}>
              {b1 > 50 ? <p style={headline(24, WHITE)}>$40B</p> : null}
            </div>
            <div style={{ width: 120, height: 4, background: ACCENT }} />
            <p style={{ ...headline(15, ACCENT), opacity: labelOp }}>WARRANTIES</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 120, height: b2, background: '#9CA3AF', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 14 }}>
              {b2 > 50 ? <p style={headline(24, WHITE)}>$30B</p> : null}
            </div>
            <div style={{ width: 120, height: 4, background: '#9CA3AF' }} />
            <p style={{ ...headline(15, '#6B7280'), opacity: labelOp }}>PET FOOD</p>
          </div>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '14px 32px', textAlign: 'center' }}>
          <p style={headline(20, WHITE)}>AND 80% IS PURE PROFIT</p>
          <p style={{ ...headline(16, WHITE), marginTop: 4 }}>FOR THE RETAILER</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const circ = 2 * Math.PI * 80;
  const pct = interpolate(frame, [20, 150], [0, 0.12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const centOp = interpolate(frame, [80, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelS = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 100 }, from: 0, to: 1 });
  const usedDash = `${pct * circ} ${circ * (1 - pct)}`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>THE BRUTAL TRUTH</p>
        <p style={{ ...headline(17, '#9CA3AF'), transform: `scale(${titleS})` }}>ONLY 12% OF WARRANTIES ARE EVER USED</p>

        <div style={{ position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="28" />
            <circle
              cx="100" cy="100" r="80"
              fill="none" stroke={ACCENT} strokeWidth="28"
              strokeDasharray={usedDash}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)"
            />
            <text x="100" y="90" textAnchor="middle" fontSize="40" fill={ACCENT} fontFamily="Arial Black">12%</text>
            <text x="100" y="114" textAnchor="middle" fontSize="13" fill={WHITE} fontFamily="Arial Black">EVER USED</text>
          </svg>
        </div>

        <div style={{ opacity: centOp, textAlign: 'center' }}>
          <p style={headline(20, '#9CA3AF')}>THAT MEANS</p>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1 }}>88¢</p>
          <p style={headline(20, WHITE)}>OF EVERY DOLLAR → PROFIT</p>
        </div>

        <div style={{ transform: `scale(${labelS})`, background: '#1E1E1E', border: `2px solid ${ACCENT}`, borderRadius: 14, padding: '12px 28px', textAlign: 'center' }}>
          <p style={headline(18, ACCENT)}>88% ARE NEVER CLAIMED</p>
          <p style={{ ...headline(14, '#9CA3AF'), marginTop: 6 }}>NOT A BUG — IT'S THE BUSINESS MODEL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const personS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const thoughtOp = interpolate(frame, [24, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mathS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const ctaOp = interpolate(frame, [140, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(38, BLACK), transform: `scale(${titleS})` }}>WHY YOU SAY YES</p>
        <p style={{ ...headline(17, '#6B7280'), transform: `scale(${titleS})` }}>LOSS AVERSION — YOUR BRAIN LIES TO YOU</p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', width: '100%' }}>
          <div style={{ flex: 1, transform: `scale(${personS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ opacity: thoughtOp, background: '#FEF2F2', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
              <p style={headline(11, ACCENT)}>WHAT IF</p>
              <p style={headline(11, BLACK)}>IT BREAKS?!</p>
            </div>
            <svg width="80" height="100" viewBox="0 0 80 100">
              <circle cx="40" cy="22" r="18" fill="#374151" />
              <path d="M8 65 Q8 42 40 42 Q72 42 72 65 L72 94 L8 94 Z" fill="#374151" />
              <text x="40" y="76" textAnchor="middle" fontSize="10" fill={ACCENT} fontFamily="Arial Black">FEAR</text>
            </svg>
            <p style={headline(13, '#9CA3AF')}>YOUR BRAIN</p>
          </div>

          <div style={{ flex: 1, transform: `scale(${mathS})`, background: '#F9FAFB', border: '2px solid #D1D5DB', borderRadius: 16, padding: '18px 14px', textAlign: 'center' }}>
            <p style={headline(13, '#6B7280')}>ACTUAL ODDS</p>
            <p style={{ ...headline(68, ACCENT), lineHeight: 1, marginTop: 6 }}>1</p>
            <p style={headline(20, '#374151')}>IN 8</p>
            <p style={{ ...headline(11, '#9CA3AF'), marginTop: 6 }}>CHANCE OF EVER USING IT</p>
            <div style={{ width: '100%', height: 6, background: '#E5E7EB', borderRadius: 3, marginTop: 12 }}>
              <div style={{ width: '12.5%', height: '100%', background: ACCENT, borderRadius: 3 }} />
            </div>
          </div>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center', width: '100%' }}>
          <p style={headline(20, WHITE)}>THEY ENGINEERED THAT FEAR</p>
          <p style={{ ...headline(16, WHITE), marginTop: 4 }}>RIGHT AT CHECKOUT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const cardS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const shieldOp = interpolate(frame, [40, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fundS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 80 }, from: 0, to: 1 });
  const amtOp = interpolate(frame, [100, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [152, 176], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(36, WHITE), transform: `scale(${titleS})` }}>SMARTER MOVES</p>
        <p style={{ ...headline(18, '#9CA3AF'), transform: `scale(${titleS})` }}>WHAT ACTUALLY PROTECTS YOU</p>

        <div style={{ display: 'flex', gap: 20, width: '100%' }}>
          <div style={{ flex: 1, transform: `scale(${cardS})`, background: '#1E1E1E', border: `2px solid ${ACCENT}`, borderRadius: 16, padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <svg width="90" height="60" viewBox="0 0 90 60">
                <rect x="0" y="0" width="90" height="60" rx="7" fill="#374151" />
                <rect x="0" y="15" width="90" height="14" fill="#4B5563" />
                <rect x="8" y="38" width="26" height="12" rx="2" fill="#FCD34D" />
                <circle cx="64" cy="42" r="11" fill={ACCENT} opacity={0.7} />
                <circle cx="76" cy="42" r="11" fill="#F97316" opacity={0.7} />
              </svg>
              <div style={{ position: 'absolute', right: -10, top: -12, opacity: shieldOp }}>
                <svg width="34" height="38" viewBox="0 0 34 38">
                  <path d="M17 2 L32 9 L32 22 Q32 33 17 37 Q2 33 2 22 L2 9 Z" fill={ACCENT} />
                  <path d="M11 19 L15 23 L23 14" fill="none" stroke={WHITE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p style={headline(13, ACCENT)}>YOUR CREDIT CARD</p>
            <p style={{ ...headline(11, '#9CA3AF'), textAlign: 'center' }}>FREE PURCHASE PROTECTION 1-2 YRS</p>
          </div>

          <div style={{ flex: 1, transform: `scale(${fundS})`, background: '#1E1E1E', border: '2px solid #374151', borderRadius: 16, padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="80" height="72" viewBox="0 0 80 72">
              <ellipse cx="38" cy="46" rx="26" ry="20" fill="#4B5563" />
              <ellipse cx="60" cy="48" rx="9" ry="7" fill="#374151" />
              <circle cx="58" cy="46" r="2" fill="#6B7280" />
              <circle cx="63" cy="46" r="2" fill="#6B7280" />
              <ellipse cx="28" cy="28" rx="8" ry="6" fill="#4B5563" />
              <circle cx="48" cy="40" r="3" fill={WHITE} />
              <circle cx="49" cy="40" r="1.5" fill="#1E1E1E" />
              <rect x="24" y="62" width="8" height="8" rx="4" fill="#374151" />
              <rect x="36" y="62" width="8" height="8" rx="4" fill="#374151" />
              <rect x="46" y="62" width="8" height="8" rx="4" fill="#374151" />
              <rect x="30" y="24" width="14" height="5" rx="2" fill="#374151" />
            </svg>
            <p style={headline(13, '#9CA3AF')}>SELF-INSURANCE FUND</p>
            <div style={{ opacity: amtOp, textAlign: 'center' }}>
              <p style={{ ...headline(28, '#10B981'), lineHeight: 1 }}>$400/YR</p>
              <p style={headline(11, '#9CA3AF')}>REDIRECTED = YOURS TO KEEP</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: ctaOp, background: '#1E1E1E', border: `2px solid ${ACCENT}`, borderRadius: 14, padding: '14px 28px', textAlign: 'center', width: '100%' }}>
          <p style={headline(20, ACCENT)}>MOST CARDS PROTECT YOU FREE</p>
          <p style={{ ...headline(16, '#9CA3AF'), marginTop: 4 }}>CHECK YOUR CARD BENEFITS NOW</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const amtS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 80 }, from: 0.5, to: 1 });
  const amtOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personS = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const ctaOp = interpolate(frame, [130, 154], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [165, 188], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(38, BLACK), transform: `scale(${titleS})` }}>LIFETIME SAVINGS</p>
        <p style={{ ...headline(18, '#6B7280'), transform: `scale(${titleS})` }}>IF YOU SKIP EVERY WARRANTY</p>

        <div style={{ opacity: amtOp, transform: `scale(${amtS})`, textAlign: 'center' }}>
          <p style={{ ...headline(96, ACCENT), lineHeight: 1 }}>$8K+</p>
          <p style={headline(22, BLACK)}>BACK IN YOUR POCKET</p>
        </div>

        <div style={{ transform: `scale(${personS})`, display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="70" height="96" viewBox="0 0 70 96">
            <circle cx="35" cy="20" r="16" fill="#374151" />
            <path d="M8 62 Q8 42 35 42 Q62 42 62 62 L62 90 L8 90 Z" fill="#374151" />
          </svg>
          <svg width="54" height="66" viewBox="0 0 54 66">
            <ellipse cx="27" cy="40" rx="22" ry="20" fill="#10B981" />
            <rect x="20" y="16" width="14" height="12" rx="5" fill="#059669" />
            <text x="27" y="45" textAnchor="middle" fontSize="18" fill={WHITE} fontFamily="Arial Black">$</text>
          </svg>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 14, padding: '16px 36px', textAlign: 'center', width: '100%' }}>
          <p style={headline(24, WHITE)}>NEXT TIME THEY ASK:</p>
          <p style={{ ...headline(36, WHITE), lineHeight: 1.1, marginTop: 6 }}>JUST SAY NO</p>
        </div>

        <div style={{ opacity: tagOp, background: BLACK, borderRadius: 14, padding: '12px 36px' }}>
          <p style={headline(20, ACCENT)}>FOLLOW FOR MORE MONEY MATH</p>
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
