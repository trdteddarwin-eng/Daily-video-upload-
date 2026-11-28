import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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
  lineHeight: 1.1,
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

  const cardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardY = interpolate(cardSpring, [0, 1], [350, 0]);

  const count = Math.floor(
    interpolate(frame, [40, 160], [0, 1200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const tagOpacity = interpolate(frame, [110, 150], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 60px' }}>

        <p style={{ ...headline(30, ACCENT), opacity: textOpacity }}>YOUR CREDIT CARD</p>

        <div style={{ transform: `translateY(${cardY}px)` }}>
          <svg width="380" height="230" viewBox="0 0 380 230">
            <rect x="0" y="0" width="380" height="230" rx="20" fill="#0D2B1E" />
            <rect x="0" y="0" width="380" height="230" rx="20" fill="none" stroke={ACCENT} strokeWidth="3" />
            <rect x="28" y="76" width="58" height="44" rx="8" fill="#D4AF37" />
            <line x1="28" y1="98" x2="86" y2="98" stroke="#B8860B" strokeWidth="2" />
            <line x1="57" y1="76" x2="57" y2="120" stroke="#B8860B" strokeWidth="2" />
            <circle cx="100" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="116" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="132" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="148" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="174" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="190" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="206" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <circle cx="222" cy="168" r="5" fill="rgba(245,245,245,0.6)" />
            <text x="254" y="174" fontFamily="monospace" fontSize="20" fill={WHITE} letterSpacing="2">4821</text>
            <circle cx="316" cy="52" r="24" fill="#F97316" opacity="0.9" />
            <circle cx="344" cy="52" r="24" fill="#EF4444" opacity="0.65" />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(96, ACCENT), margin: 0 }}>${count.toLocaleString()}</p>
          <p style={{ ...headline(32, WHITE), marginTop: 8 }}>IN FREE BENEFITS</p>
        </div>

        <p style={{ ...headline(26, 'rgba(245,245,245,0.6)'), opacity: tagOpacity, lineHeight: 1.4 }}>
          73% OF CARDHOLDERS NEVER CLAIM THEM
        </p>

      </AbsoluteFill>
    </FadeScene>
  );
};
// END_PART_A

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  const shieldFrame = Math.max(0, frame - 50);
  const shieldSpring = spring({ frame: shieldFrame, fps, config: { damping: 12, stiffness: 100 } });
  const shieldY = interpolate(shieldSpring, [0, 1], [100, 0]);

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 60px' }}>

        <div style={{ transform: `scale(${badgeScale})`, transformOrigin: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill={ACCENT} />
            <text x="40" y="53" fontFamily={FONT} fontSize="40" fill={WHITE} textAnchor="middle" fontWeight="bold">1</text>
          </svg>
        </div>

        <svg width="200" height="260" viewBox="0 0 200 260">
          <rect x="20" y="0" width="160" height="260" rx="22" fill={BLACK} />
          <rect x="30" y="10" width="140" height="230" rx="14" fill="#1A1A2E" />
          <circle cx="100" cy="22" r="8" fill="#2A2A2A" />
          <circle cx="100" cy="244" r="14" fill="#2A2A2A" />
          <line x1="65" y1="40" x2="130" y2="130" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="130" y1="130" x2="80" y2="210" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="130" y1="130" x2="168" y2="155" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <line x1="65" y1="40" x2="38" y2="85" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div style={{ transform: `translateY(${shieldY}px)`, marginTop: -50 }}>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <path d="M130 10 L240 55 L240 115 Q240 170 130 200 Q20 170 20 115 L20 55 Z" fill={ACCENT} opacity="0.9" />
            <polyline points="80,105 115,140 185,70" stroke={WHITE} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(42, BLACK), margin: 0 }}>CELL PHONE PROTECTION</p>
          <p style={{ ...headline(68, ACCENT), margin: '12px 0' }}>UP TO $800</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center' as const, margin: 0 }}>
            Just pay your bill with the card
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  const planeX = interpolate(frame, [15, 115], [-60, 240], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const hotelFrame = Math.max(0, frame - 70);
  const hotelSpring = spring({ frame: hotelFrame, fps, config: { damping: 14, stiffness: 100 } });
  const hotelY = interpolate(hotelSpring, [0, 1], [100, 0]);

  const textOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>

        <div style={{ transform: `scale(${badgeScale})`, transformOrigin: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill={ACCENT} />
            <text x="40" y="53" fontFamily={FONT} fontSize="40" fill={WHITE} textAnchor="middle" fontWeight="bold">2</text>
          </svg>
        </div>

        <div style={{ width: 380, height: 140, position: 'relative', overflow: 'hidden' }}>
          <svg width="380" height="140" viewBox="0 0 380 140">
            <line x1="0" y1="70" x2="380" y2="70" stroke="rgba(245,245,245,0.25)" strokeWidth="2" strokeDasharray="10 7" />
            <circle cx="310" cy="70" r="38" fill="none" stroke="#EF4444" strokeWidth="4" />
            <line x1="310" y1="70" x2="310" y2="38" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <line x1="310" y1="70" x2="334" y2="70" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <text x="250" y="128" fontFamily={FONT} fontSize="16" fill="#EF4444">DELAYED 6h+</text>
          </svg>
          <div style={{ position: 'absolute', top: 44, left: planeX }}>
            <svg width="80" height="52" viewBox="0 0 80 52">
              <ellipse cx="38" cy="26" rx="34" ry="10" fill={WHITE} />
              <polygon points="16,26 48,10 48,26" fill={WHITE} />
              <polygon points="2,26 12,18 12,34" fill={WHITE} />
              <ellipse cx="72" cy="26" rx="8" ry="7" fill={WHITE} />
              <circle cx="28" cy="22" r="3" fill={BG_DARK} />
              <circle cx="40" cy="22" r="3" fill={BG_DARK} />
              <circle cx="52" cy="22" r="3" fill={BG_DARK} />
            </svg>
          </div>
        </div>

        <div style={{ transform: `translateY(${hotelY}px)` }}>
          <svg width="200" height="150" viewBox="0 0 200 150">
            <rect x="20" y="50" width="160" height="100" fill="#0D2B1E" stroke={ACCENT} strokeWidth="2" />
            <polygon points="10,50 100,8 190,50" fill={ACCENT} />
            <rect x="36" y="64" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="84" y="64" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="132" y="64" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="36" y="90" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="84" y="90" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="132" y="90" width="22" height="18" rx="3" fill="#D4AF37" opacity="0.8" />
            <rect x="82" y="108" width="36" height="42" rx="4" fill={ACCENT} />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(38, WHITE), margin: 0 }}>TRAVEL DELAY INSURANCE</p>
          <p style={{ ...headline(68, ACCENT), margin: '10px 0' }}>UP TO $350</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: 'rgba(245,245,245,0.7)', textAlign: 'center' as const, margin: 0 }}>Hotel + meals covered</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// END_PART_B

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  const bagSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const bagY = interpolate(bagSpring, [0, 1], [-200, 0]);

  const shieldFrame = Math.max(0, frame - 70);
  const shieldSpring = spring({ frame: shieldFrame, fps, config: { damping: 14, stiffness: 110 } });
  const shieldScale = interpolate(shieldSpring, [0, 1], [0, 1]);

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>

        <div style={{ transform: `scale(${badgeScale})`, transformOrigin: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill={ACCENT} />
            <text x="40" y="53" fontFamily={FONT} fontSize="40" fill={WHITE} textAnchor="middle" fontWeight="bold">3</text>
          </svg>
        </div>

        <div style={{ transform: `translateY(${bagY}px)` }}>
          <svg width="200" height="230" viewBox="0 0 200 230">
            <rect x="20" y="70" width="160" height="150" rx="12" fill="#E5E7EB" stroke={BLACK} strokeWidth="3" />
            <path d="M 68 70 Q 68 24 100 24 Q 132 24 132 70" fill="none" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
            <line x1="62" y1="118" x2="138" y2="158" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <line x1="138" y1="118" x2="62" y2="158" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ transform: `scale(${shieldScale})`, transformOrigin: 'center', marginTop: -50 }}>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <path d="M130 10 L240 55 L240 115 Q240 170 130 200 Q20 170 20 115 L20 55 Z" fill={ACCENT} opacity="0.9" />
            <polyline points="80,105 115,140 185,70" stroke={WHITE} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(42, BLACK), margin: 0 }}>PURCHASE PROTECTION</p>
          <p style={{ ...headline(44, ACCENT), margin: '12px 0' }}>90-DAY COVERAGE</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', textAlign: 'center' as const, margin: 0 }}>Breaks? Card replaces it.</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  const price = Math.round(
    interpolate(frame, [30, 120], [199, 129], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const arrowOpacity = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const refundFrame = Math.max(0, frame - 100);
  const refundSpring = spring({ frame: refundFrame, fps, config: { damping: 12, stiffness: 100 } });
  const refundScale = interpolate(refundSpring, [0, 1], [0, 1]);

  const textOpacity = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 60px' }}>

        <div style={{ transform: `scale(${badgeScale})`, transformOrigin: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill={ACCENT} />
            <text x="40" y="53" fontFamily={FONT} fontSize="40" fill={WHITE} textAnchor="middle" fontWeight="bold">4</text>
          </svg>
        </div>

        <svg width="280" height="150" viewBox="0 0 280 150">
          <path d="M 20 20 L 210 20 L 260 75 L 210 130 L 20 130 Z" fill="#0D2B1E" stroke={ACCENT} strokeWidth="2" />
          <circle cx="228" cy="75" r="10" fill={BG_DARK} />
          <text x="110" y="92" fontFamily={FONT} fontSize="58" fill={WHITE} textAnchor="middle" fontWeight="bold">${price}</text>
        </svg>

        <div style={{ opacity: arrowOpacity }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <line x1="28" y1="4" x2="28" y2="42" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <polyline points="12,30 28,46 44,30" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ transform: `scale(${refundScale})`, transformOrigin: 'center' }}>
          <svg width="260" height="100" viewBox="0 0 260 100">
            <rect x="0" y="0" width="260" height="100" rx="20" fill={ACCENT} />
            <text x="130" y="40" fontFamily={FONT} fontSize="22" fill={BLACK} textAnchor="middle" fontWeight="bold">YOU GET BACK</text>
            <text x="130" y="84" fontFamily={FONT} fontSize="46" fill={BLACK} textAnchor="middle" fontWeight="bold">$70</text>
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(42, WHITE), margin: 0 }}>PRICE PROTECTION</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: 'rgba(245,245,245,0.7)', textAlign: 'center' as const, margin: '8px 0 0' }}>Average claim: $60+ back in 90 days</p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// END_PART_C

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flipProgress = interpolate(frame, [15, 75], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const halfProgress = flipProgress < 0.5
    ? interpolate(flipProgress, [0, 0.5], [1, 0])
    : interpolate(flipProgress, [0.5, 1], [0, 1]);

  const isBackSide = flipProgress >= 0.5;

  const ctaFrame = Math.max(0, frame - 80);
  const ctaSpring = spring({ frame: ctaFrame, fps, config: { damping: 12, stiffness: 100 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [80, 0]);

  const textOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const finalOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>

        <p style={{ ...headline(44, BLACK), opacity: textOpacity, margin: 0 }}>YOUR MOVE</p>

        <div style={{ transform: `scaleX(${halfProgress})`, transformOrigin: 'center' }}>
          {!isBackSide ? (
            <svg width="340" height="210" viewBox="0 0 340 210">
              <rect x="0" y="0" width="340" height="210" rx="18" fill={ACCENT} />
              <rect x="24" y="70" width="52" height="40" rx="7" fill="#D4AF37" />
              <circle cx="285" cy="50" r="22" fill="#F97316" opacity="0.9" />
              <circle cx="313" cy="50" r="22" fill="#EF4444" opacity="0.65" />
            </svg>
          ) : (
            <svg width="340" height="210" viewBox="0 0 340 210">
              <rect x="0" y="0" width="340" height="210" rx="18" fill="#2A2A2A" />
              <rect x="0" y="40" width="340" height="40" fill="#555" />
              <rect x="20" y="94" width="200" height="28" rx="4" fill="#E5E7EB" />
              <text x="120" y="114" fontFamily="monospace" fontSize="16" fill={BLACK} textAnchor="middle">CALL 1-800-VISA-911</text>
              <text x="170" y="168" fontFamily="monospace" fontSize="13" fill="rgba(245,245,245,0.6)" textAnchor="middle">YOUR BENEFITS ARE FREE</text>
            </svg>
          )}
        </div>

        <div style={{ transform: `translateY(${ctaY}px)`, opacity: textOpacity }}>
          <div style={{ background: BLACK, borderRadius: 20, padding: '24px 36px', textAlign: 'center' as const, border: `3px solid ${ACCENT}` }}>
            <p style={{ ...headline(32, WHITE), margin: 0 }}>FLIP YOUR CARD OVER</p>
            <p style={{ ...headline(32, ACCENT), margin: '8px 0 0' }}>CALL THE NUMBER</p>
          </div>
        </div>

        <div style={{ opacity: finalOpacity }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" fill={ACCENT} />
            <path d="M 26 20 C 24 20 20 26 22 36 C 24 44 32 52 42 56 C 50 60 56 58 58 55 L 54 46 C 52 44 48 46 46 44 C 42 40 40 34 42 30 C 44 26 42 22 38 21 Z" fill={WHITE} />
          </svg>
        </div>

        <p style={{ opacity: finalOpacity, fontFamily: FONT, fontSize: 28, color: '#555', textAlign: 'center' as const, margin: 0, lineHeight: 1.3 }}>
          Ask: "What benefits does my card include?"
        </p>

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
