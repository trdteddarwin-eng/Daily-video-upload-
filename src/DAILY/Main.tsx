import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F97316';
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
  lineHeight: 1.3,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const robeScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const arrow1Opacity = interpolate(frame, [32, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const deskOpacity = interpolate(frame, [42, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2Opacity = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chairOpacity = interpolate(frame, [82, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        gap: 20,
      }}>
        <p style={{ ...headline(44, BLACK), opacity: titleOpacity }}>1769 — HOW IT STARTED</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <div style={{ transform: `scale(${robeScale})`, transformOrigin: 'bottom center', textAlign: 'center' as const }}>
            <svg width={120} height={190} viewBox="0 0 120 190">
              <circle cx="60" cy="17" r="15" fill="#F5CBA7" />
              <path d="M 60 32 Q 42 42 26 58 L 12 178 L 60 172 L 108 178 L 94 58 Q 78 42 60 32 Z" fill={ACCENT} />
              <path d="M 60 32 Q 52 46 47 66 L 60 70 L 73 66 Q 68 46 60 32 Z" fill="#E5650A" />
              <text x="60" y="122" textAnchor="middle" fill={WHITE} fontSize="12" fontFamily={FONT} fontWeight="bold">FANCY</text>
              <text x="60" y="140" textAnchor="middle" fill={WHITE} fontSize="12" fontFamily={FONT} fontWeight="bold">ROBE</text>
            </svg>
          </div>

          <svg width={42} height={34} viewBox="0 0 42 34" style={{ opacity: arrow1Opacity, marginBottom: 66 }}>
            <line x1="3" y1="17" x2="31" y2="17" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
            <polyline points="23,8 38,17 23,26" fill="none" stroke={BLACK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ opacity: deskOpacity, textAlign: 'center' as const }}>
            <svg width={138} height={150} viewBox="0 0 138 150">
              <rect x="14" y="52" width="110" height="15" rx="4" fill="#8B5E3C" />
              <rect x="20" y="67" width="12" height="72" rx="4" fill="#7A5230" />
              <rect x="106" y="67" width="12" height="72" rx="4" fill="#7A5230" />
              <rect x="22" y="14" width="94" height="40" rx="4" fill={WHITE} stroke="#CCC" strokeWidth="2" />
              <text x="69" y="114" textAnchor="middle" fill={BLACK} fontSize="12" fontFamily={FONT} fontWeight="bold">NEW DESK</text>
            </svg>
          </div>

          <svg width={42} height={34} viewBox="0 0 42 34" style={{ opacity: arrow2Opacity, marginBottom: 66 }}>
            <line x1="3" y1="17" x2="31" y2="17" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
            <polyline points="23,8 38,17 23,26" fill="none" stroke={BLACK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ opacity: chairOpacity, textAlign: 'center' as const }}>
            <svg width={112} height={150} viewBox="0 0 112 150">
              <rect x="16" y="60" width="80" height="14" rx="5" fill="#8B5E3C" />
              <rect x="28" y="74" width="13" height="50" rx="4" fill="#7A5230" />
              <rect x="71" y="74" width="13" height="50" rx="4" fill="#7A5230" />
              <rect x="16" y="18" width="80" height="44" rx="8" fill={ACCENT} />
              <text x="56" y="136" textAnchor="middle" fill={BLACK} fontSize="12" fontFamily={FONT} fontWeight="bold">NEW CHAIR</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: badgeOpacity, background: BLACK, borderRadius: 20, padding: '16px 44px', textAlign: 'center' as const }}>
          <p style={headline(20, WHITE)}>NAMED AFTER PHILOSOPHER DENIS DIDEROT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const step1Anim = spring({ frame: frame - 42, fps, config: { damping: 14, stiffness: 80 } });
  const step2Anim = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 80 } });
  const step3Anim = spring({ frame: frame - 118, fps, config: { damping: 14, stiffness: 80 } });
  const theoryOpacity = interpolate(frame, [152, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { text: 'BUY SOMETHING NEW', sub: 'Standard purchase', anim: step1Anim },
    { text: 'OLD STUFF LOOKS WRONG', sub: 'Brain detects mismatch', anim: step2Anim },
    { text: 'BUY MORE TO MATCH', sub: 'The cascade begins', anim: step3Anim },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 22,
      }}>
        <p style={{ ...headline(46, WHITE), opacity: titleOpacity }}>WHY YOUR BRAIN DOES IT</p>

        <div style={{ transform: `scale(${brainScale})`, transformOrigin: 'center' }}>
          <svg width={200} height={158} viewBox="0 0 200 158">
            <path d="M 100 22 Q 58 10 36 42 Q 14 68 24 95 Q 34 122 62 132 Q 80 138 100 136 Q 120 138 138 132 Q 166 122 176 95 Q 186 68 164 42 Q 142 10 100 22 Z" fill={ACCENT} opacity={0.92} />
            <line x1="100" y1="22" x2="100" y2="136" stroke="#E5650A" strokeWidth="2" strokeDasharray="7 5" />
            <line x1="36" y1="84" x2="164" y2="84" stroke="#E5650A" strokeWidth="2" strokeDasharray="7 5" />
            <text x="100" y="73" textAnchor="middle" fill={WHITE} fontSize="16" fontFamily={FONT} fontWeight="bold">UNITY</text>
            <text x="100" y="93" textAnchor="middle" fill={WHITE} fontSize="16" fontFamily={FONT} fontWeight="bold">THEORY</text>
          </svg>
        </div>

        <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              opacity: s.anim,
              transform: `translateX(${interpolate(s.anim, [0, 1], [-80, 0])}px)`,
            }}>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: ACCENT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: FONT, fontSize: 27, color: WHITE, fontWeight: 'bold' }}>{i + 1}</span>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.text}</p>
                <p style={{ fontFamily: FONT, fontSize: 18, color: '#888', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ opacity: theoryOpacity, background: ACCENT, borderRadius: 16, padding: '12px 36px' }}>
          <p style={headline(22, WHITE)}>YOUR BRAIN CRAVES HARMONY — AT ANY COST</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sneakerScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const arrowOpacity = interpolate(frame, [28, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bagOpacity = interpolate(frame, [36, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 24,
      }}>
        <p style={{ ...headline(52, WHITE), opacity: titleOpacity }}>THE DIDEROT TRAP</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ transform: `scale(${sneakerScale})`, transformOrigin: 'center' }}>
            <svg width={160} height={130} viewBox="0 0 160 130">
              <ellipse cx="80" cy="95" rx="72" ry="22" fill="#222" />
              <path d="M 20 90 Q 30 55 55 50 L 110 48 Q 135 50 142 70 L 148 90 Z" fill={ACCENT} />
              <path d="M 55 50 Q 65 30 80 28 Q 95 26 105 48 Z" fill="#E5650A" />
              <line x1="62" y1="68" x2="98" y2="68" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
              <line x1="60" y1="78" x2="100" y2="78" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
              <text x="80" y="118" textAnchor="middle" fill={ACCENT} fontSize="13" fontFamily={FONT} fontWeight="bold">NEW SNEAKERS</text>
            </svg>
          </div>

          <svg width={60} height={40} viewBox="0 0 60 40" style={{ opacity: arrowOpacity }}>
            <line x1="5" y1="20" x2="45" y2="20" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
            <polyline points="35,10 50,20 35,30" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ opacity: bagOpacity }}>
            <svg width={140} height={130} viewBox="0 0 140 130">
              <rect x="20" y="45" width="100" height="75" rx="10" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
              <path d="M 42 45 Q 42 18 70 18 Q 98 18 98 45" fill="none" stroke="#555" strokeWidth="6" strokeLinecap="round" />
              <line x1="30" y1="55" x2="110" y2="115" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
              <line x1="110" y1="55" x2="30" y2="115" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
              <text x="70" y="30" textAnchor="middle" fill="#666" fontSize="11" fontFamily={FONT}>OLD BAG — NOW LOOKS WRONG</text>
            </svg>
          </div>
        </div>

        <p style={{ ...headline(84, ACCENT), opacity: counterOpacity }}>$3,000</p>
        <p style={{ ...headline(26, WHITE), opacity: counterOpacity }}>AVERAGE CASCADE COST</p>
        <p style={{ ...headline(22, ACCENT), opacity: subOpacity }}>ONE PURCHASE TRIGGERS THEM ALL</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(
    interpolate(frame, [25, 175], [0, 3000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const counterOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Scale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 80 } });
  const item2Scale = spring({ frame: frame - 52, fps, config: { damping: 14, stiffness: 80 } });
  const item3Scale = spring({ frame: frame - 89, fps, config: { damping: 14, stiffness: 80 } });
  const item4Scale = spring({ frame: frame - 126, fps, config: { damping: 14, stiffness: 80 } });

  const fmtD = (n: number) => n.toLocaleString('en-US');

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 18,
      }}>
        <p style={{ ...headline(50, BLACK), opacity: titleOpacity }}>THE $3,000 SPIRAL</p>

        <p style={{ ...headline(106, ACCENT), opacity: counterOpacity }}>${fmtD(counterVal)}</p>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${item1Scale})`, transformOrigin: 'bottom center', textAlign: 'center' as const }}>
            <svg width={120} height={80} viewBox="0 0 120 80">
              <rect x="4" y="36" width="112" height="34" rx="10" fill={ACCENT} />
              <rect x="4" y="36" width="20" height="40" rx="8" fill="#E5650A" />
              <rect x="96" y="36" width="20" height="40" rx="8" fill="#E5650A" />
              <rect x="24" y="16" width="72" height="32" rx="8" fill="#E5650A" />
              <rect x="26" y="70" width="12" height="8" rx="3" fill="#999" />
              <rect x="82" y="70" width="12" height="8" rx="3" fill="#999" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, textAlign: 'center' as const, margin: 0, textTransform: 'uppercase' as const }}>FURNITURE</p>
          </div>

          <div style={{ transform: `scale(${item2Scale})`, transformOrigin: 'bottom center', textAlign: 'center' as const }}>
            <svg width={68} height={118} viewBox="0 0 68 118">
              <rect x="6" y="4" width="56" height="104" rx="11" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
              <rect x="12" y="16" width="44" height="72" rx="4" fill="#2D4A8A" />
              <circle cx="34" cy="100" r="7" fill="#444" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, textAlign: 'center' as const, margin: 0, textTransform: 'uppercase' as const }}>ELECTRONICS</p>
          </div>

          <div style={{ transform: `scale(${item3Scale})`, transformOrigin: 'bottom center', textAlign: 'center' as const }}>
            <svg width={138} height={88} viewBox="0 0 138 88">
              <rect x="9" y="38" width="120" height="36" rx="8" fill="#2C3E50" />
              <path d="M 37 38 Q 48 16 63 12 L 88 12 Q 103 16 112 38 Z" fill="#34495E" />
              <path d="M 44 38 Q 53 20 65 16 L 86 16 Q 98 20 106 38 Z" fill="#AED6F1" opacity={0.6} />
              <circle cx="30" cy="74" r="15" fill="#1A1A1A" />
              <circle cx="30" cy="74" r="8" fill="#555" />
              <circle cx="108" cy="74" r="15" fill="#1A1A1A" />
              <circle cx="108" cy="74" r="8" fill="#555" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, textAlign: 'center' as const, margin: 0, textTransform: 'uppercase' as const }}>CAR</p>
          </div>

          <div style={{ transform: `scale(${item4Scale})`, transformOrigin: 'bottom center', textAlign: 'center' as const }}>
            <svg width={98} height={108} viewBox="0 0 98 108">
              <path d="M 22 17 L 4 42 L 25 51 L 25 103 L 73 103 L 73 51 L 94 42 L 76 17 Q 63 27 49 27 Q 35 27 22 17 Z" fill={ACCENT} />
              <path d="M 40 17 Q 49 33 58 17" fill="none" stroke="#E5650A" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, textAlign: 'center' as const, margin: 0, textTransform: 'uppercase' as const }}>OUTFIT</p>
          </div>
        </div>

        <p style={{ ...headline(26, BLACK), opacity: titleOpacity }}>AVERAGE COST PER CASCADE</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = interpolate(frame, [20, 162], [0, 73], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personCount = 10;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 20,
      }}>
        <p style={{ ...headline(46, WHITE), opacity: titleOpacity }}>YOU'RE NOT ALONE</p>

        <p style={{ ...headline(148, ACCENT), opacity: bigNumOpacity, lineHeight: 1 }}>73%</p>
        <p style={{ ...headline(26, WHITE), opacity: bigNumOpacity }}>OF PEOPLE FEEL THIS PULL</p>

        <div style={{ width: '80%', maxWidth: 620 }}>
          <div style={{ width: '100%', height: 28, background: '#333', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ width: `${barProgress}%`, height: '100%', background: ACCENT, borderRadius: 14 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 20, color: WHITE }}>0%</span>
            <span style={{ fontFamily: FONT, fontSize: 20, color: ACCENT }}>73%</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center', maxWidth: 600 }}>
          {Array.from({ length: personCount }).map((_, i) => (
            <svg key={i} width={48} height={74} viewBox="0 0 48 74"
              style={{ opacity: interpolate(frame, [28 + i * 7, 48 + i * 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
              <circle cx="24" cy="13" r="12" fill={i < 7 ? ACCENT : '#444'} />
              <rect x="13" y="26" width="22" height="29" rx="6" fill={i < 7 ? ACCENT : '#444'} />
              <line x1="13" y1="38" x2="3" y2="56" stroke={i < 7 ? ACCENT : '#444'} strokeWidth="7" strokeLinecap="round" />
              <line x1="35" y1="38" x2="45" y2="56" stroke={i < 7 ? ACCENT : '#444'} strokeWidth="7" strokeLinecap="round" />
            </svg>
          ))}
        </div>

        <p style={{ ...headline(24, WHITE), opacity: subOpacity }}>IT'S BRAIN WIRING — AND NOW YOU KNOW IT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box1Scale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 70 } });
  const arrowOpacity = interpolate(frame, [44, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const box2Scale = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 70 } });
  const item1Anim = spring({ frame: frame - 98, fps, config: { damping: 14, stiffness: 80 } });
  const item2Anim = spring({ frame: frame - 128, fps, config: { damping: 14, stiffness: 80 } });
  const badgeScale = spring({ frame: frame - 158, fps, config: { damping: 10, stiffness: 60 } });
  const badgeOpacity = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'RESEARCH BEFORE YOU BUY', anim: item1Anim },
    { label: 'ONE IN — ONE OUT — ALWAYS', anim: item2Anim },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        gap: 22,
      }}>
        <p style={{ ...headline(50, BLACK), opacity: titleOpacity }}>BREAK THE SPIRAL</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ transform: `scale(${box1Scale})`, transformOrigin: 'center', textAlign: 'center' as const }}>
            <svg width={148} height={132} viewBox="0 0 148 132">
              <rect x="8" y="26" width="132" height="98" rx="14" fill={ACCENT} />
              <path d="M 8 50 L 140 50" stroke="#E5650A" strokeWidth="3" />
              <path d="M 50 6 L 98 6 L 98 26 L 50 26 Z" fill={ACCENT} />
              <text x="74" y="20" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily={FONT} fontWeight="bold">IN</text>
              <text x="74" y="82" textAnchor="middle" fill={WHITE} fontSize="16" fontFamily={FONT} fontWeight="bold">NEW ITEM</text>
              <polyline points="60,102 72,114 90,96" fill="none" stroke={WHITE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 19, color: ACCENT, textTransform: 'uppercase' as const, margin: 0 }}>ONE IN</p>
          </div>

          <svg width={50} height={36} viewBox="0 0 50 36" style={{ opacity: arrowOpacity }}>
            <line x1="4" y1="18" x2="38" y2="18" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
            <polyline points="28,8 44,18 28,28" fill="none" stroke={BLACK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ transform: `scale(${box2Scale})`, transformOrigin: 'center', textAlign: 'center' as const }}>
            <svg width={148} height={132} viewBox="0 0 148 132">
              <rect x="8" y="26" width="132" height="98" rx="14" fill="#EF4444" />
              <path d="M 8 50 L 140 50" stroke="#CC2222" strokeWidth="3" />
              <path d="M 50 6 L 98 6 L 98 26 L 50 26 Z" fill="#EF4444" />
              <text x="74" y="20" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily={FONT} fontWeight="bold">OUT</text>
              <text x="74" y="82" textAnchor="middle" fill={WHITE} fontSize="16" fontFamily={FONT} fontWeight="bold">OLD ITEM</text>
              <line x1="60" y1="98" x2="88" y2="116" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
              <line x1="88" y1="98" x2="60" y2="116" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 19, color: '#EF4444', textTransform: 'uppercase' as const, margin: 0 }}>ONE OUT</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 680 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 16,
              opacity: item.anim,
              transform: `translateX(${interpolate(item.anim, [0, 1], [-60, 0])}px)`,
            }}>
              <svg width={52} height={52} viewBox="0 0 52 52" style={{ flexShrink: 0 }}>
                <circle cx="26" cy="26" r="24" fill={ACCENT} />
                <polyline points="14,26 22,34 38,18" fill="none" stroke={WHITE} strokeWidth="5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          transformOrigin: 'center',
          background: ACCENT,
          borderRadius: 28,
          padding: '22px 48px',
          textAlign: 'center' as const,
        }}>
          <p style={{ ...headline(26, WHITE), marginBottom: 4 }}>SAVES THE AVERAGE PERSON</p>
          <p style={headline(88, WHITE)}>$2,400</p>
          <p style={{ ...headline(24, WHITE), marginTop: 4 }}>PER YEAR</p>
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
