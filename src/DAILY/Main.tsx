import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftTagSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const rightTagSpring = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 80 } });
  const personOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 28,
      }}>
        <p style={{ ...headline(50, WHITE), opacity: titleOpacity }}>YOUR BRAIN IS BEING PLAYED</p>

        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div style={{ transform: `scale(${leftTagSpring})`, transformOrigin: 'center' }}>
            <svg width={270} height={265} viewBox="0 0 270 265">
              <rect x="10" y="55" width="250" height="200" rx="18" fill="#1E1E1E" stroke="#EF4444" strokeWidth="5" />
              <polygon points="135,10 112,55 158,55" fill="#EF4444" />
              <circle cx="135" cy="14" r="10" fill="#1E1E1E" stroke="#EF4444" strokeWidth="4" />
              <text x="135" y="120" textAnchor="middle" fill="#EF4444" fontSize="24" fontFamily={FONT} fontWeight="bold">ANCHOR</text>
              <text x="135" y="196" textAnchor="middle" fill={WHITE} fontSize="65" fontFamily={FONT} fontWeight="bold">$400</text>
              <text x="135" y="232" textAnchor="middle" fill="#888" fontSize="20" fontFamily={FONT}>BLENDER PRO</text>
            </svg>
          </div>

          <div style={{ transform: `scale(${rightTagSpring})`, transformOrigin: 'center' }}>
            <svg width={270} height={265} viewBox="0 0 270 265">
              <rect x="10" y="55" width="250" height="200" rx="18" fill="#1A2E1A" stroke={ACCENT} strokeWidth="5" />
              <polygon points="135,10 112,55 158,55" fill={ACCENT} />
              <circle cx="135" cy="14" r="10" fill="#1A2E1A" stroke={ACCENT} strokeWidth="4" />
              <text x="135" y="118" textAnchor="middle" fill={ACCENT} fontSize="22" fontFamily={FONT} fontWeight="bold">FEELS CHEAP</text>
              <text x="135" y="196" textAnchor="middle" fill={WHITE} fontSize="65" fontFamily={FONT} fontWeight="bold">$160</text>
              <text x="135" y="232" textAnchor="middle" fill="#888" fontSize="20" fontFamily={FONT}>BLENDER LITE</text>
            </svg>
          </div>
        </div>

        <svg width={120} height={100} viewBox="0 0 120 100" style={{ opacity: personOpacity }}>
          <circle cx="60" cy="18" r="18" fill={WHITE} />
          <rect x="44" y="38" width="32" height="42" rx="6" fill={WHITE} />
          <line x1="44" y1="50" x2="22" y2="72" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
          <line x1="76" y1="50" x2="98" y2="42" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
        </svg>

        <p style={{ ...headline(30, ACCENT), opacity: subOpacity }}>PRICE ANCHORING — EVERY STORE DOES IT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Anim = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 80 } });
  const step2Anim = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });
  const step3Anim = spring({ frame: frame - 95, fps, config: { damping: 14, stiffness: 80 } });
  const badgeOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const steps = [
    { label: 'YOU SEE $400 FIRST', sub: 'BRAIN LOCKS IN THE NUMBER', color: '#EF4444', anim: step1Anim },
    { label: 'YOU SEE $160 NEXT', sub: 'BRAIN COMPARES TO $400', color: ACCENT, anim: step2Anim },
    { label: '$160 FEELS CHEAP', sub: 'DECISION MADE BY ANCHOR', color: '#10B981', anim: step3Anim },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        gap: 28,
      }}>
        <p style={{ ...headline(46, BLACK), opacity: titleOpacity }}>HOW YOUR BRAIN GETS PLAYED</p>

        <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: s.anim,
              transform: `translateX(${interpolate(s.anim, [0, 1], [-80, 0])}px)`,
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: FONT, fontSize: 30, color: WHITE, fontWeight: 'bold' }}>{i + 1}</span>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.label}</p>
                <p style={{ fontFamily: FONT, fontSize: 20, color: '#666', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          opacity: badgeOpacity,
          background: BLACK,
          borderRadius: 20,
          padding: '18px 48px',
          textAlign: 'center',
        }}>
          <p style={headline(22, WHITE)}>DISCOVERED 1974 — KAHNEMAN &amp; TVERSKY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const menuScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const item1Opacity = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Opacity = interpolate(frame, [58, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Opacity = interpolate(frame, [86, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const highlightOpacity = interpolate(frame, [118, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOpacity = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        <p style={{ ...headline(48, WHITE), opacity: titleOpacity }}>THE $95 DECOY STEAK</p>

        <svg width={600} height={390} viewBox="0 0 600 390"
          style={{ transform: `scale(${menuScale})`, transformOrigin: 'center' }}>
          <rect x="20" y="10" width="560" height="370" rx="16" fill="#1E1E1E" stroke="#444" strokeWidth="3" />
          <rect x="20" y="10" width="560" height="58" rx="16" fill="#2A2A2A" />
          <rect x="20" y="48" width="560" height="20" fill="#2A2A2A" />
          <text x="300" y="48" textAnchor="middle" fill={WHITE} fontSize="26" fontFamily={FONT} fontWeight="bold">ENTRÉES</text>

          <g opacity={item1Opacity}>
            <text x="50" y="100" fill="#EF4444" fontSize="22" fontFamily={FONT} fontWeight="bold">WAGYU RIBEYE</text>
            <text x="550" y="100" textAnchor="end" fill="#EF4444" fontSize="26" fontFamily={FONT} fontWeight="bold">$95</text>
            <text x="50" y="122" fill="#666" fontSize="16" fontFamily={FONT}>A5 grade, truffle butter, micro greens</text>
            <text x="550" y="122" textAnchor="end" fill="#555" fontSize="15" fontFamily={FONT}>⚓ ANCHOR</text>
          </g>

          <line x1="40" y1="142" x2="560" y2="142" stroke="#333" strokeWidth="2" opacity={item1Opacity} />

          <rect x="30" y="150" width="540" height="82" rx="8" fill={ACCENT}
            opacity={interpolate(highlightOpacity, [0, 1], [0, 0.18])} />

          <g opacity={item2Opacity}>
            <text x="50" y="188" fill={WHITE} fontSize="22" fontFamily={FONT} fontWeight="bold">ATLANTIC SALMON</text>
            <text x="550" y="188" textAnchor="end" fill={ACCENT} fontSize="26" fontFamily={FONT} fontWeight="bold">$42</text>
            <text x="50" y="212" fill="#888" fontSize="16" fontFamily={FONT}>Lemon caper butter, seasonal vegetables</text>
          </g>

          <g opacity={tagOpacity}>
            <rect x="376" y="157" width="164" height="38" rx="19" fill={ACCENT} />
            <text x="458" y="182" textAnchor="middle" fill={WHITE} fontSize="16" fontFamily={FONT} fontWeight="bold">THE REAL TARGET</text>
          </g>

          <line x1="40" y1="244" x2="560" y2="244" stroke="#333" strokeWidth="2" opacity={item2Opacity} />

          <g opacity={item3Opacity}>
            <text x="50" y="278" fill={WHITE} fontSize="22" fontFamily={FONT} fontWeight="bold">ROAST CHICKEN</text>
            <text x="550" y="278" textAnchor="end" fill={WHITE} fontSize="26" fontFamily={FONT} fontWeight="bold">$36</text>
            <text x="50" y="300" fill="#666" fontSize="16" fontFamily={FONT}>Herb jus, roasted potatoes</text>
          </g>
        </svg>

        <p style={{ ...headline(28, ACCENT), opacity: tagOpacity }}>$95 STEAK MAKES $42 FEEL RESPONSIBLE</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const premiumOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const baseOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const brainOpacity = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        gap: 20,
      }}>
        <p style={{ ...headline(46, BLACK), opacity: titleOpacity }}>THE CAR LOT PLAY</p>

        <svg width={700} height={380} viewBox="0 0 700 380"
          style={{ transform: `scale(${carScale})`, transformOrigin: 'center' }}>
          <line x1="60" y1="310" x2="640" y2="310" stroke="#CCC" strokeWidth="3" />
          <rect x="90" y="210" width="520" height="90" rx="12" fill="#2C3E50" />
          <path d="M 188 210 Q 226 138 282 126 L 418 126 Q 474 138 512 210 Z" fill="#34495E" />
          <path d="M 214 210 Q 242 152 280 140 L 420 140 Q 458 152 486 210 Z" fill="#AED6F1" opacity={0.65} />
          <circle cx="200" cy="310" r="52" fill="#1A1A1A" />
          <circle cx="200" cy="310" r="32" fill="#5A5A5A" />
          <circle cx="200" cy="310" r="12" fill="#888" />
          <circle cx="500" cy="310" r="52" fill="#1A1A1A" />
          <circle cx="500" cy="310" r="32" fill="#5A5A5A" />
          <circle cx="500" cy="310" r="12" fill="#888" />
          <ellipse cx="98" cy="248" rx="20" ry="13" fill="#F39C12" />
          <ellipse cx="602" cy="248" rx="20" ry="13" fill="#E74C3C" />

          <g opacity={premiumOpacity}>
            <rect x="55" y="28" width="236" height="96" rx="14" fill="#EF4444" />
            <text x="173" y="68" textAnchor="middle" fill={WHITE} fontSize="18" fontFamily={FONT} fontWeight="bold">FULLY LOADED</text>
            <text x="173" y="108" textAnchor="middle" fill={WHITE} fontSize="36" fontFamily={FONT} fontWeight="bold">$58,000</text>
            <line x1="200" y1="124" x2="210" y2="208" stroke="#EF4444" strokeWidth="4" strokeDasharray="6 4" />
          </g>

          <g opacity={baseOpacity}>
            <rect x="409" y="28" width="236" height="96" rx="14" fill={ACCENT} />
            <text x="527" y="68" textAnchor="middle" fill={WHITE} fontSize="18" fontFamily={FONT} fontWeight="bold">BASE MODEL</text>
            <text x="527" y="108" textAnchor="middle" fill={WHITE} fontSize="36" fontFamily={FONT} fontWeight="bold">$43,000</text>
            <line x1="500" y1="124" x2="490" y2="208" stroke={ACCENT} strokeWidth="4" strokeDasharray="6 4" />
          </g>
        </svg>

        <div style={{ opacity: brainOpacity, textAlign: 'center' }}>
          <p style={headline(28, '#EF4444')}>YOUR BRAIN: "I'M SAVING $15,000!"</p>
          <p style={{ ...headline(24, BLACK), marginTop: 10 }}>REALITY: YOU'RE SPENDING $43,000</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const counterVal = Math.floor(
    interpolate(frame, [40, 190], [0, 14000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const barProgress = interpolate(frame, [50, 172], [0, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [160, 184], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fmtDollars = (n: number) => n.toLocaleString('en-US');

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
        <p style={{ ...headline(48, WHITE), opacity: titleOpacity }}>THE REAL COST</p>

        <svg width={300} height={260} viewBox="0 0 300 260"
          style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center' }}>
          <ellipse cx="148" cy="152" rx="108" ry="88" fill={ACCENT} />
          <ellipse cx="248" cy="132" rx="52" ry="48" fill={ACCENT} />
          <ellipse cx="244" cy="86" rx="17" ry="13" fill="#E5890A" />
          <circle cx="266" cy="120" r="7" fill={BG_DARK} />
          <ellipse cx="288" cy="140" rx="17" ry="13" fill="#E5890A" />
          <circle cx="283" cy="138" r="4" fill={BG_DARK} />
          <circle cx="293" cy="138" r="4" fill={BG_DARK} />
          <rect x="82" y="228" width="26" height="26" rx="5" fill="#E5890A" />
          <rect x="118" y="228" width="26" height="26" rx="5" fill="#E5890A" />
          <rect x="158" y="228" width="26" height="26" rx="5" fill="#E5890A" />
          <rect x="194" y="228" width="26" height="26" rx="5" fill="#E5890A" />
          <rect x="128" y="62" width="36" height="8" rx="4" fill={BG_DARK} />
          <path d="M 44 142 Q 20 122 30 102 Q 40 82 20 72" fill="none" stroke="#E5890A" strokeWidth="8" strokeLinecap="round" />
        </svg>

        <p style={headline(96, ACCENT)}>${fmtDollars(counterVal)}</p>

        <div style={{ width: '80%', maxWidth: 620 }}>
          <p style={{ ...headline(22, WHITE), marginBottom: 12 }}>28% OVERSPEND FROM ANCHORING</p>
          <div style={{ width: '100%', height: 28, background: '#333', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ width: `${barProgress}%`, height: '100%', background: ACCENT, borderRadius: 14 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 20, color: WHITE }}>0%</span>
            <span style={{ fontFamily: FONT, fontSize: 20, color: ACCENT }}>28%</span>
          </div>
        </div>

        <p style={{ ...headline(26, WHITE), opacity: statOpacity }}>ON $50K SPEND = $14K LOST PER YEAR</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Anim = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 80 } });
  const item2Anim = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });
  const item3Anim = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 80 } });
  const badgeScale = spring({ frame: frame - 140, fps, config: { damping: 10, stiffness: 60 } });
  const badgeOpacity = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'RESEARCH PRICE FIRST', sub: 'Before walking into any store', anim: item1Anim },
    { label: 'SET YOUR OWN ANCHOR', sub: 'Know your target number cold', anim: item2Anim },
    { label: 'IGNORE THE DECOY', sub: "The expensive one is a plant", anim: item3Anim },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 72,
        gap: 28,
      }}>
        <p style={{ ...headline(50, BLACK), opacity: titleOpacity }}>THE COUNTER-MOVE</p>

        <div style={{ width: '100%', maxWidth: 720 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginBottom: 24,
              opacity: item.anim,
              transform: `translateX(${interpolate(item.anim, [0, 1], [-80, 0])}px)`,
            }}>
              <svg width={60} height={60} viewBox="0 0 60 60" style={{ flexShrink: 0 }}>
                <circle cx="30" cy="30" r="28" fill={ACCENT} />
                <polyline points="16,30 26,40 44,20"
                  fill="none" stroke={WHITE} strokeWidth="6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{item.label}</p>
                <p style={{ fontFamily: FONT, fontSize: 19, color: '#666', margin: 0, marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          transformOrigin: 'center',
          background: ACCENT,
          borderRadius: 28,
          padding: '26px 56px',
          textAlign: 'center',
        }}>
          <p style={{ ...headline(34, WHITE), marginBottom: 4 }}>KEEP UP TO</p>
          <p style={headline(92, WHITE)}>$14,000</p>
          <p style={{ ...headline(30, WHITE), marginTop: 4 }}>PER YEAR</p>
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



