import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#FFF8E7';
const ACCENT = '#F59E0B';
const ACCENT_DARK = '#B45309';
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

  const titleY = interpolate(frame, [0, 18], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const envScale = spring({ frame: frame - 15, fps, from: 0.5, to: 1, config: { damping: 13, stiffness: 100 } });
  const counterVal = Math.round(interpolate(frame, [70, 170], [3000, 2340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const arrowOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankScale = spring({ frame: frame - 90, fps, from: 0.4, to: 1, config: { damping: 12, stiffness: 140 } });
  const shockOpacity = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={headline(56, WHITE)}>YOUR BOSS</p>
        <p style={{ ...headline(56, ACCENT), marginTop: 6 }}>JUST GAVE YOU</p>
        <p style={{ ...headline(56, WHITE), marginTop: 6 }}>$3,000</p>
      </div>

      {/* Envelope SVG */}
      <div style={{ position: 'absolute', top: 390, left: '50%', transform: `translateX(-50%) scale(${envScale})`, transformOrigin: 'top center' }}>
        <svg width="320" height="220" viewBox="0 0 320 220">
          <rect x="10" y="60" width="300" height="150" rx="14" fill={ACCENT} />
          <path d="M10,60 L160,145 L310,60 Z" fill={ACCENT_DARK} />
          <circle cx="160" cy="135" r="22" fill={BG_DARK} />
          <text x="160" y="143" textAnchor="middle" fill={ACCENT} fontSize="22" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          <rect x="40" y="170" width="80" height="10" rx="5" fill={BG_DARK} opacity={0.3} />
          <rect x="40" y="188" width="60" height="10" rx="5" fill={BG_DARK} opacity={0.3} />
        </svg>
      </div>

      {/* Down arrow */}
      <div style={{ position: 'absolute', top: 618, left: '50%', transform: 'translateX(-50%)', opacity: arrowOpacity }}>
        <svg width="50" height="60" viewBox="0 0 50 60">
          <line x1="25" y1="4" x2="25" y2="48" stroke={WHITE} strokeWidth="5" strokeLinecap="round" />
          <path d="M10,36 L25,54 L40,36" stroke={WHITE} strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bank display */}
      <div style={{ position: 'absolute', bottom: 180, left: '50%', transform: `translateX(-50%) scale(${bankScale})`, transformOrigin: 'center bottom' }}>
        <div style={{ background: '#1E1E1E', border: `3px solid ${ACCENT}`, borderRadius: 20, padding: '20px 50px', textAlign: 'center' }}>
          <p style={{ ...headline(26, WHITE), marginBottom: 6 }}>DEPOSITED</p>
          <p style={{ ...headline(72, ACCENT), margin: 0 }}>${counterVal.toLocaleString()}</p>
        </div>
      </div>

      {/* Shock label */}
      <div style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', opacity: shockOpacity }}>
        <p style={{ ...headline(32, WHITE), whiteSpace: 'nowrap' }}>WHERE DID $660 GO?</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: frame - 30, fps, from: 0.3, to: 1, config: { damping: 11, stiffness: 120 } });
  const docY = interpolate(frame, [60, 90], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity }}>
        <p style={headline(44, BLACK)}>THE IRS RULE</p>
        <p style={{ ...headline(44, BLACK), marginTop: 6 }}>COMPANIES USE</p>
        <p style={{ ...headline(44, ACCENT_DARK), marginTop: 6 }}>ON BONUSES</p>
      </div>

      {/* Big 22% */}
      <div style={{ position: 'absolute', top: 290, left: '50%', transform: `translateX(-50%) scale(${pctScale})`, transformOrigin: 'center' }}>
        <p style={{ ...headline(190, ACCENT), margin: 0, letterSpacing: '0.05em' }}>22%</p>
      </div>

      {/* Tax document */}
      <div style={{ position: 'absolute', top: 530, left: '50%', transform: `translateX(-50%) translateY(${docY}px)`, opacity: docOpacity }}>
        <svg width="340" height="230" viewBox="0 0 340 230">
          <rect x="20" y="10" width="300" height="210" rx="12" fill={WHITE} />
          <rect x="20" y="10" width="300" height="210" rx="12" fill="none" stroke="#E5E7EB" strokeWidth="2" />
          <rect x="20" y="10" width="300" height="48" rx="12" fill={ACCENT} />
          <rect x="20" y="38" width="300" height="20" fill={ACCENT} />
          <text x="170" y="39" textAnchor="middle" fill={BLACK} fontSize="15" fontWeight="900" fontFamily="Arial Black, sans-serif">SUPPLEMENTAL WAGE TAX</text>
          <rect x="40" y="76" width="260" height="10" rx="5" fill="#E5E7EB" />
          <rect x="40" y="96" width="200" height="10" rx="5" fill="#E5E7EB" />
          <rect x="40" y="122" width="260" height="38" rx="8" fill={ACCENT} opacity={0.15} />
          <text x="60" y="147" fill={ACCENT_DARK} fontSize="15" fontWeight="900" fontFamily="Arial Black, sans-serif">WITHHOLDING RATE:</text>
          <text x="300" y="147" textAnchor="end" fill={ACCENT_DARK} fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">22%</text>
          <rect x="40" y="176" width="180" height="10" rx="5" fill="#E5E7EB" />
          <rect x="40" y="196" width="140" height="10" rx="5" fill="#E5E7EB" />
        </svg>
      </div>

      {/* Bottom text */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: textOpacity }}>
        <p style={{ ...headline(30, BLACK), letterSpacing: '0.08em' }}>FLAT RATE. NO EXCEPTIONS.</p>
        <p style={{ ...headline(30, ACCENT_DARK), marginTop: 8, letterSpacing: '0.08em' }}>REGARDLESS OF YOUR BRACKET.</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftScale = spring({ frame: frame - 20, fps, from: 0.3, to: 1, config: { damping: 12, stiffness: 120 } });
  const rightScale = spring({ frame: frame - 70, fps, from: 0.3, to: 1, config: { damping: 12, stiffness: 120 } });
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity }}>
        <p style={headline(50, WHITE)}>IT GETS WORSE</p>
        <p style={{ ...headline(50, ACCENT), marginTop: 6 }}>IF YOU EARN BIG</p>
      </div>

      {/* Left bag: normal bonus */}
      <div style={{ position: 'absolute', top: 310, left: 60, transform: `scale(${leftScale})`, transformOrigin: 'top left' }}>
        <svg width="200" height="260" viewBox="0 0 200 260">
          <ellipse cx="100" cy="170" rx="80" ry="78" fill={ACCENT} />
          <rect x="70" y="62" width="60" height="78" rx="10" fill={ACCENT} />
          <ellipse cx="100" cy="62" rx="30" ry="18" fill={ACCENT_DARK} />
          <ellipse cx="100" cy="88" rx="18" ry="12" fill={ACCENT_DARK} />
          <text x="100" y="186" textAnchor="middle" fill={BLACK} fontSize="52" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          <rect x="12" y="90" width="176" height="40" rx="10" fill="#EF4444" opacity={0.9} />
          <text x="100" y="118" textAnchor="middle" fill={WHITE} fontSize="24" fontWeight="900" fontFamily="Arial Black, sans-serif">-22%</text>
        </svg>
        <p style={{ ...headline(26, WHITE), textAlign: 'center', marginTop: 10 }}>$3,000</p>
        <p style={{ ...headline(22, ACCENT), textAlign: 'center', marginTop: 4 }}>BONUS</p>
      </div>

      {/* Right bag: mega bonus */}
      <div style={{ position: 'absolute', top: 310, right: 60, transform: `scale(${rightScale})`, transformOrigin: 'top right' }}>
        <svg width="200" height="260" viewBox="0 0 200 260">
          <ellipse cx="100" cy="170" rx="80" ry="78" fill="#6B7280" />
          <rect x="70" y="62" width="60" height="78" rx="10" fill="#6B7280" />
          <ellipse cx="100" cy="62" rx="30" ry="18" fill="#4B5563" />
          <ellipse cx="100" cy="88" rx="18" ry="12" fill="#4B5563" />
          <text x="100" y="186" textAnchor="middle" fill={WHITE} fontSize="52" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          <rect x="12" y="90" width="176" height="40" rx="10" fill="#EF4444" opacity={0.9} />
          <text x="100" y="118" textAnchor="middle" fill={WHITE} fontSize="24" fontWeight="900" fontFamily="Arial Black, sans-serif">-37%</text>
        </svg>
        <p style={{ ...headline(26, WHITE), textAlign: 'center', marginTop: 10 }}>$1M+</p>
        <p style={{ ...headline(22, '#EF4444'), textAlign: 'center', marginTop: 4 }}>MEGA BONUS</p>
      </div>

      <div style={{ position: 'absolute', top: 720, left: 60, right: 60, opacity: labelOpacity }}>
        <p style={{ ...headline(32, WHITE), textAlign: 'center' }}>BOTH RATES AREN'T</p>
        <p style={{ ...headline(32, ACCENT), textAlign: 'center', marginTop: 8 }}>YOUR REAL TAX RATE</p>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: bridgeOpacity }}>
        <p style={{ ...headline(26, WHITE), letterSpacing: '0.08em' }}>SO WHAT CAN</p>
        <p style={{ ...headline(26, ACCENT), marginTop: 6, letterSpacing: '0.08em' }}>YOU DO ABOUT IT?</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numScale = spring({ frame: frame - 10, fps, from: 0.3, to: 1, config: { damping: 11, stiffness: 150 } });
  const checkScale = spring({ frame: frame - 50, fps, from: 0.4, to: 1, config: { damping: 13, stiffness: 120 } });
  const arrowProgress = interpolate(frame, [80, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowWidth = arrowProgress * 580;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity }}>
        <p style={headline(40, BLACK)}>THE LEGAL ESCAPE</p>
        <p style={{ ...headline(40, ACCENT_DARK), marginTop: 6 }}>MOVE NUMBER ONE</p>
      </div>

      <div style={{ position: 'absolute', top: 240, left: '50%', transform: `translateX(-50%) scale(${numScale})`, transformOrigin: 'center' }}>
        <p style={{ ...headline(140, ACCENT), margin: 0 }}>01</p>
      </div>

      {/* Paycheck */}
      <div style={{ position: 'absolute', top: 490, left: 60, transform: `scale(${checkScale})`, transformOrigin: 'left center' }}>
        <svg width="180" height="110" viewBox="0 0 180 110">
          <rect x="4" y="4" width="172" height="102" rx="10" fill={WHITE} stroke="#E5E7EB" strokeWidth="2" />
          <rect x="14" y="14" width="80" height="8" rx="4" fill="#E5E7EB" />
          <rect x="14" y="30" width="50" height="8" rx="4" fill="#E5E7EB" />
          <rect x="90" y="14" width="78" height="28" rx="6" fill={ACCENT} opacity={0.2} />
          <text x="129" y="33" textAnchor="middle" fill={ACCENT_DARK} fontSize="16" fontWeight="900" fontFamily="Arial Black, sans-serif">$3,000</text>
          <rect x="14" y="58" width="152" height="6" rx="3" fill="#E5E7EB" />
          <rect x="14" y="72" width="100" height="6" rx="3" fill="#E5E7EB" />
          <rect x="14" y="90" width="70" height="4" rx="2" fill="#D1D5DB" />
        </svg>
      </div>

      {/* Animated arrow */}
      <div style={{ position: 'absolute', top: 538, left: 248, overflow: 'hidden', width: `${arrowWidth}px` }}>
        <svg width="580" height="34" viewBox="0 0 580 34" style={{ display: 'block' }}>
          <line x1="4" y1="17" x2="570" y2="17" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
          <path d="M560,4 L578,17 L560,30" stroke={ACCENT} strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* Piggy bank */}
      <div style={{ position: 'absolute', top: 490, right: 60, opacity: bankOpacity }}>
        <svg width="180" height="140" viewBox="0 0 180 140">
          <ellipse cx="88" cy="80" rx="68" ry="56" fill={ACCENT} />
          <circle cx="150" cy="60" r="32" fill={ACCENT} />
          <ellipse cx="143" cy="34" rx="12" ry="10" fill={ACCENT_DARK} />
          <circle cx="162" cy="52" r="5" fill={BLACK} />
          <ellipse cx="174" cy="68" rx="12" ry="9" fill={ACCENT_DARK} />
          <circle cx="170" cy="68" r="3" fill={BLACK} />
          <circle cx="178" cy="68" r="3" fill={BLACK} />
          <rect x="68" y="22" width="30" height="6" rx="3" fill={BLACK} opacity={0.4} />
          <circle cx="83" cy="19" r="8" fill={WHITE} opacity={0.9} />
          <text x="83" y="24" textAnchor="middle" fill={ACCENT_DARK} fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          <rect x="38" y="122" width="20" height="28" rx="8" fill={ACCENT_DARK} />
          <rect x="66" y="122" width="20" height="28" rx="8" fill={ACCENT_DARK} />
          <rect x="96" y="122" width="20" height="28" rx="8" fill={ACCENT_DARK} />
          <rect x="124" y="122" width="20" height="28" rx="8" fill={ACCENT_DARK} />
          <rect x="52" y="62" width="68" height="28" rx="8" fill={BLACK} opacity={0.5} />
          <text x="86" y="81" textAnchor="middle" fill={WHITE} fontSize="17" fontWeight="900" fontFamily="Arial Black, sans-serif">401K</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: textOpacity }}>
        <p style={{ ...headline(30, BLACK), letterSpacing: '0.08em' }}>BEFORE TAXES TAKE IT,</p>
        <p style={{ ...headline(30, ACCENT_DARK), marginTop: 8, letterSpacing: '0.08em' }}>REDIRECT TO YOUR 401K.</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numScale = spring({ frame: frame - 10, fps, from: 0.3, to: 1, config: { damping: 11, stiffness: 150 } });
  const formScale = spring({ frame: frame - 40, fps, from: 0.5, to: 1, config: { damping: 13, stiffness: 100 } });
  const arrowProgress = interpolate(frame, [100, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const refundOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowLength = arrowProgress * 580;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity }}>
        <p style={headline(40, WHITE)}>DIDN'T DO THAT?</p>
        <p style={{ ...headline(40, ACCENT), marginTop: 6 }}>MOVE NUMBER TWO</p>
      </div>

      <div style={{ position: 'absolute', top: 240, left: '50%', transform: `translateX(-50%) scale(${numScale})`, transformOrigin: 'center' }}>
        <p style={{ ...headline(140, ACCENT), margin: 0 }}>02</p>
      </div>

      {/* Tax form */}
      <div style={{ position: 'absolute', top: 490, left: 60, transform: `scale(${formScale})`, transformOrigin: 'left center' }}>
        <svg width="168" height="200" viewBox="0 0 168 200">
          <rect x="4" y="4" width="160" height="192" rx="10" fill="#1E1E1E" stroke={ACCENT} strokeWidth="2" />
          <rect x="4" y="4" width="160" height="40" rx="10" fill={ACCENT} />
          <rect x="4" y="30" width="160" height="14" fill={ACCENT} />
          <text x="84" y="28" textAnchor="middle" fill={BLACK} fontSize="13" fontWeight="900" fontFamily="Arial Black, sans-serif">1040 TAX RETURN</text>
          <rect x="16" y="56" width="136" height="8" rx="4" fill="#374151" />
          <rect x="16" y="74" width="100" height="8" rx="4" fill="#374151" />
          <rect x="16" y="100" width="136" height="32" rx="8" fill={ACCENT} opacity={0.2} />
          <text x="30" y="122" fill={ACCENT} fontSize="12" fontWeight="900" fontFamily="Arial Black, sans-serif">REFUND:</text>
          <text x="145" y="122" textAnchor="end" fill={ACCENT} fontSize="14" fontWeight="900" fontFamily="Arial Black, sans-serif">$418</text>
          <rect x="16" y="148" width="100" height="8" rx="4" fill="#374151" />
          <rect x="16" y="164" width="80" height="8" rx="4" fill="#374151" />
          <rect x="16" y="180" width="60" height="8" rx="4" fill="#374151" />
        </svg>
      </div>

      {/* Animated arrow */}
      <div style={{ position: 'absolute', top: 572, left: 240, overflow: 'hidden', width: `${arrowLength}px` }}>
        <svg width="580" height="34" viewBox="0 0 580 34" style={{ display: 'block' }}>
          <line x1="4" y1="17" x2="570" y2="17" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          <path d="M560,4 L578,17 L560,30" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wallet with refund */}
      <div style={{ position: 'absolute', top: 490, right: 60, opacity: refundOpacity }}>
        <svg width="160" height="200" viewBox="0 0 160 200">
          <rect x="10" y="40" width="140" height="110" rx="14" fill={ACCENT} />
          <rect x="10" y="40" width="140" height="30" rx="14" fill={ACCENT_DARK} />
          <rect x="10" y="55" width="140" height="15" fill={ACCENT_DARK} />
          <rect x="80" y="68" width="58" height="52" rx="10" fill={ACCENT_DARK} />
          <circle cx="109" cy="94" r="18" fill={ACCENT} />
          <text x="109" y="101" textAnchor="middle" fill={BLACK} fontSize="18" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          <rect x="20" y="10" width="96" height="30" rx="6" fill="#10B981" />
          <rect x="30" y="4" width="80" height="20" rx="5" fill="#059669" />
          <text x="70" y="19" textAnchor="middle" fill={WHITE} fontSize="11" fontWeight="900" fontFamily="Arial Black, sans-serif">$418 BACK</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: textOpacity }}>
        <p style={{ ...headline(28, WHITE), letterSpacing: '0.07em' }}>IF YOUR REAL RATE IS</p>
        <p style={{ ...headline(28, WHITE), marginTop: 6, letterSpacing: '0.07em' }}>UNDER 22%,</p>
        <p style={{ ...headline(28, ACCENT), marginTop: 8, letterSpacing: '0.07em' }}>THE IRS GIVES IT BACK.</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame: frame - 20, fps, from: 0.4, to: 1, config: { damping: 12, stiffness: 100 } });
  const badgeScale = spring({ frame: frame - 90, fps, from: 0.1, to: 1, config: { damping: 10, stiffness: 180 } });
  const ctaOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const followOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: titleOpacity }}>
        <p style={headline(44, BLACK)}>KNOW YOUR</p>
        <p style={{ ...headline(44, ACCENT_DARK), marginTop: 6 }}>BONUS TAX.</p>
        <p style={{ ...headline(44, BLACK), marginTop: 6 }}>KEEP MORE.</p>
      </div>

      {/* Person with money bag */}
      <div style={{ position: 'absolute', top: 340, left: '50%', transform: `translateX(-50%) scale(${personScale})`, transformOrigin: 'top center' }}>
        <svg width="300" height="380" viewBox="0 0 300 380">
          {/* Head */}
          <circle cx="150" cy="60" r="52" fill={ACCENT} />
          {/* Face */}
          <path d="M132,68 Q150,86 168,68" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="136" cy="52" r="5" fill={BLACK} />
          <circle cx="164" cy="52" r="5" fill={BLACK} />
          {/* Body */}
          <rect x="102" y="114" width="96" height="126" rx="22" fill={ACCENT} />
          {/* Left arm - money bag side */}
          <rect x="44" y="120" width="60" height="22" rx="11" fill={ACCENT} />
          {/* Right arm */}
          <rect x="196" y="120" width="60" height="22" rx="11" fill={ACCENT} />
          {/* Legs */}
          <rect x="110" y="234" width="36" height="100" rx="14" fill={ACCENT_DARK} />
          <rect x="154" y="234" width="36" height="100" rx="14" fill={ACCENT_DARK} />
          {/* Money bag in left hand */}
          <ellipse cx="38" cy="162" rx="30" ry="34" fill="#10B981" />
          <rect x="22" y="112" width="32" height="30" rx="8" fill="#10B981" />
          <ellipse cx="38" cy="112" rx="16" ry="10" fill="#059669" />
          <text x="38" y="170" textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="900" fontFamily="Arial Black, sans-serif">$</text>
          {/* Papers in right hand */}
          <rect x="254" y="110" width="44" height="58" rx="6" fill={WHITE} stroke="#E5E7EB" strokeWidth="2" />
          <rect x="260" y="118" width="32" height="6" rx="3" fill="#E5E7EB" />
          <rect x="260" y="132" width="24" height="6" rx="3" fill="#E5E7EB" />
          <rect x="260" y="146" width="28" height="6" rx="3" fill="#E5E7EB" />
        </svg>
      </div>

      {/* Checkmark badge overlay */}
      <div style={{ position: 'absolute', top: 350, right: 110, transform: `scale(${badgeScale})`, transformOrigin: 'center' }}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="36" fill="#10B981" />
          <path d="M18,36 L30,50 L56,22" stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* CTA box */}
      <div style={{ position: 'absolute', bottom: 160, left: 60, right: 60, opacity: ctaOpacity }}>
        <div style={{ background: ACCENT, borderRadius: 18, padding: '18px 24px', textAlign: 'center' }}>
          <p style={{ ...headline(28, BLACK), margin: 0, letterSpacing: '0.08em' }}>REDIRECT YOUR BONUS</p>
          <p style={{ ...headline(28, BLACK), margin: '8px 0 0', letterSpacing: '0.08em' }}>BEFORE TAXES BITE</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: followOpacity }}>
        <p style={{ ...headline(24, BLACK), letterSpacing: '0.08em' }}>FOLLOW FOR MORE MONEY MOVES</p>
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
