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

// Scene 1: Smartphone BNPL checkout + 45% stat
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const statOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statSpring = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 60 } });
  const subOpacity = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 120, width: '100%', textAlign: 'center',
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{ ...headline(64, WHITE), padding: '0 40px' }}>BUY NOW</h1>
          <h1 style={{ ...headline(64, ACCENT), padding: '0 40px', marginTop: 4 }}>PAY LATER</h1>
          <p style={{ ...headline(22, '#AAAAAA'), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', padding: '0 60px', marginTop: 14 }}>
            YOUR BRAIN DOESN'T SEE THE TRUE COST
          </p>
        </div>

        {/* Phone with BNPL checkout screen */}
        <div style={{
          position: 'absolute', top: 430, left: '50%',
          transform: `translateX(-50%) scale(${phoneSpring})`,
        }}>
          <svg width="300" height="500">
            <rect x="5" y="0" width="290" height="490" rx="36" fill="#1A1A2E" stroke="#2A2A4E" strokeWidth="3" />
            <rect x="18" y="22" width="264" height="440" rx="22" fill="#0D0D1A" />
            <rect x="110" y="6" width="80" height="10" rx="5" fill="#111" />
            {/* App header bar */}
            <rect x="18" y="22" width="264" height="56" rx="0" fill="#C0392B" />
            <text x="150" y="60" textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>CHECKOUT</text>
            {/* Product area */}
            <rect x="38" y="94" width="224" height="100" rx="12" fill="#1A1A3A" />
            {/* Shopping bag SVG icon */}
            <path d="M 120 120 L 130 162 L 180 162 L 190 120 Z" fill="#4A4A7A" />
            <path d="M 136 120 Q 136 102 150 102 Q 164 102 164 120" stroke="#6A6AAA" strokeWidth="5" fill="none" />
            <text x="222" y="152" textAnchor="middle" fill={WHITE} fontSize="14" fontFamily="Arial">$100</text>
            {/* BNPL CTA button */}
            <rect x="38" y="214" width="224" height="68" rx="16" fill="#EF4444" />
            <text x="150" y="244" textAnchor="middle" fill={WHITE} fontSize="14" fontWeight="bold" fontFamily="Arial">4 EASY PAYMENTS</text>
            <text x="150" y="270" textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>OF $25</text>
            {/* Pay in full grayed out */}
            <rect x="58" y="302" width="184" height="48" rx="12" fill="#1E1E1E" stroke="#333" strokeWidth="2" />
            <text x="150" y="332" textAnchor="middle" fill="#666" fontSize="14" fontFamily="Arial">PAY $100 IN FULL</text>
            {/* Interest free badge */}
            <rect x="70" y="368" width="160" height="34" rx="17" fill="#1E3A1E" />
            <text x="150" y="391" textAnchor="middle" fill="#4CAF50" fontSize="13" fontWeight="bold" fontFamily="Arial">INTEREST FREE*</text>
            <rect x="115" y="475" width="70" height="6" rx="3" fill="#333" />
          </svg>
        </div>

        {/* 45% stat */}
        <div style={{
          position: 'absolute', top: 490, right: 45,
          opacity: statOpacity, transform: `scale(${statSpring})`,
          textAlign: 'center',
        }}>
          <div style={{ ...headline(96, ACCENT), fontWeight: 900, lineHeight: 1 }}>45%</div>
          <div style={{ ...headline(18, WHITE), fontFamily: 'Arial,sans-serif', marginTop: 6 }}>MORE SPENDING</div>
        </div>

        <div style={{ position: 'absolute', bottom: 155, width: '100%', textAlign: 'center', opacity: subOpacity }}>
          <div style={{ ...headline(20, ACCENT), fontFamily: 'Arial,sans-serif' }}>MIT STUDY: THE PAIN OF PAYING IS ERASED</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Brain mental accounting split — cash $100 pain vs BNPL 4×$25
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const cashGlow = interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bnplGlow = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>MENTAL ACCOUNTING</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            SAME $100. DIFFERENT BRAIN SIGNAL.
          </p>
        </div>

        <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translateX(-50%) scale(${brainSpring})` }}>
          <svg width="600" height="440">
            <ellipse cx="300" cy="240" rx="230" ry="170" fill="#F0E6D8" stroke="#C4A882" strokeWidth="4" />
            <path d="M 105 230 Q 95 185 125 155 Q 155 125 185 140 Q 198 115 228 110 Q 265 104 285 125 Q 312 108 345 125 Q 378 142 380 178 Q 408 195 410 230" stroke="#C4A882" strokeWidth="4" fill="none" />
            <path d="M 155 285 Q 175 268 200 278 Q 222 288 245 272 Q 268 258 290 278 Q 312 298 335 280" stroke="#C4A882" strokeWidth="3" fill="none" />
            <path d="M 130 245 Q 120 230 138 220 Q 155 212 167 225" stroke="#C4A882" strokeWidth="3" fill="none" />
            {/* Dividing line */}
            <line x1="300" y1="90" x2="300" y2="400" stroke="#C4A882" strokeWidth="3" strokeDasharray="10 6" />

            {/* LEFT: CASH = large pain circles */}
            <circle cx="190" cy="230" r={60 * cashGlow} fill={`rgba(239,68,68,${0.18 * cashGlow})`} />
            <circle cx="190" cy="230" r={38 * cashGlow} fill={`rgba(239,68,68,${0.42 * cashGlow})`} />
            <circle cx="190" cy="230" r={20 * cashGlow} fill={`rgba(239,68,68,${cashGlow})`} />
            <text x="190" y="238" textAnchor="middle" fill={WHITE} fontSize={22 * cashGlow} fontWeight="bold" fontFamily={FONT} opacity={cashGlow}>$100</text>

            {/* RIGHT: BNPL = 4 small muted circles */}
            {[0, 1, 2, 3].map((i) => {
              const cx = 340 + (i % 2) * 90;
              const cy = 185 + Math.floor(i / 2) * 90;
              return (
                <g key={`bnpl-${i}`}>
                  <circle cx={cx} cy={cy} r={22 * bnplGlow} fill={`rgba(180,180,180,${0.5 * bnplGlow})`} />
                  <text x={cx} y={cy + 7} textAnchor="middle" fill="#888" fontSize={14 * bnplGlow} fontWeight="bold" fontFamily={FONT} opacity={bnplGlow}>$25</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side labels */}
        <div style={{ position: 'absolute', top: 850, width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 80px', opacity: labelOpacity }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...headline(24, '#EF4444') }}>CASH</div>
            <div style={{ ...headline(16, BLACK), fontFamily: 'Arial,sans-serif', marginTop: 6 }}>BRAIN SCREAMS "OUCH"</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...headline(24, '#888') }}>BNPL</div>
            <div style={{ ...headline(16, BLACK), fontFamily: 'Arial,sans-serif', marginTop: 6 }}>BRAIN BARELY NOTICES</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 145, width: '100%', textAlign: 'center', opacity: labelOpacity }}>
          <div style={{ display: 'inline-block', background: ACCENT, padding: '18px 48px', borderRadius: 16 }}>
            <div style={{ ...headline(26, WHITE) }}>THAT'S HOW THEY GET YOU</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Three BNPL loan cards stacking, balance counter → $940
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Spring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const card2Spring = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 70 } });
  const card3Spring = spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 70 } });
  const totalOpacity = interpolate(frame, [130, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = Math.floor(interpolate(frame, [152, 205], [0, 940], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const cards = [
    { name: 'KLARNA', amount: '$340', color: '#FF85A1', top: 420 },
    { name: 'AFTERPAY', amount: '$280', color: '#80CBC4', top: 680 },
    { name: 'AFFIRM', amount: '$320', color: '#90CAF9', top: 940 },
  ];
  const springs = [card1Spring, card2Spring, card3Spring];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, WHITE), padding: '0 40px' }}>YOUR HIDDEN DEBT</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            3-4 ACTIVE LOANS ACROSS DIFFERENT APPS
          </p>
        </div>

        {cards.map((c, i) => (
          <div key={`card-${i}`} style={{
            position: 'absolute', top: c.top, left: '50%',
            transform: `translateX(-50%) scale(${springs[i]})`,
          }}>
            <svg width="820" height="130">
              <rect x="5" y="5" width="810" height="120" rx="20" fill="#1E1E1E" stroke="#2A2A2A" strokeWidth="2" />
              <rect x="5" y="5" width="14" height="120" rx="7" fill={c.color} />
              <text x="72" y="56" fill={WHITE} fontSize="26" fontWeight="bold" fontFamily={FONT}>{c.name}</text>
              <text x="72" y="94" fill="#777" fontSize="18" fontFamily="Arial">ACTIVE LOAN</text>
              <text x="720" y="76" textAnchor="middle" fill={ACCENT} fontSize="40" fontWeight="bold" fontFamily={FONT}>{c.amount}</text>
            </svg>
          </div>
        ))}

        <div style={{ position: 'absolute', bottom: 145, width: '100%', textAlign: 'center', opacity: totalOpacity }}>
          <div style={{ ...headline(24, WHITE), fontFamily: 'Arial,sans-serif' }}>AVERAGE TOTAL BNPL BALANCE:</div>
          <div style={{ ...headline(88, ACCENT), fontWeight: 900 }}>${totalCount}</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Calendar with missed payment X marks + fee counter
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const missProgress = interpolate(frame, [55, 145], [0, 4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeCount = Math.floor(interpolate(frame, [100, 175], [0, 136], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const feeOpacity = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const missedDays = [3, 10, 17, 24];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>MISSED PAYMENTS</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            34% MISS AT LEAST ONE A YEAR
          </p>
        </div>

        <div style={{ position: 'absolute', top: 370, left: '50%', transform: `translateX(-50%) scale(${calSpring})` }}>
          <svg width="920" height="570">
            <rect x="5" y="5" width="910" height="558" rx="24" fill={WHITE} stroke="#E0E0E0" strokeWidth="2" />
            <rect x="5" y="5" width="910" height="72" rx="24" fill={BLACK} />
            <rect x="5" y="55" width="910" height="22" fill={BLACK} />
            <text x="460" y="52" textAnchor="middle" fill={WHITE} fontSize="28" fontWeight="bold" fontFamily={FONT}>APRIL 2026</text>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
              <text key={`dh-${i}`} x={74 + i * 125} y="112" textAnchor="middle" fill="#888" fontSize="18" fontFamily="Arial" fontWeight="bold">{d}</text>
            ))}
            {Array.from({ length: 28 }, (_, idx) => {
              const day = idx + 1;
              const col = idx % 7;
              const row = Math.floor(idx / 7);
              const cx = 74 + col * 125;
              const cy = 168 + row * 108;
              const isMissed = missedDays.indexOf(day) !== -1;
              const missIdx = missedDays.indexOf(day);
              const showX = isMissed && missProgress >= missIdx + 1;
              return (
                <g key={`day-${day}`}>
                  {isMissed && <circle cx={cx} cy={cy} r="38" fill="rgba(239,68,68,0.12)" />}
                  <text x={cx} y={cy + 8} textAnchor="middle" fill={isMissed ? '#EF4444' : '#333'} fontSize="22" fontFamily="Arial" fontWeight={isMissed ? 'bold' : 'normal'}>{day}</text>
                  {isMissed && <text x={cx + 24} y={cy - 22} textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="Arial">DUE</text>}
                  {showX && (
                    <>
                      <line x1={cx - 18} y1={cy - 18} x2={cx + 18} y2={cy + 18} stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
                      <line x1={cx + 18} y1={cy - 18} x2={cx - 18} y2={cy + 18} stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 130, width: '100%', textAlign: 'center', opacity: feeOpacity }}>
          <div style={{ ...headline(24, BLACK), fontFamily: 'Arial,sans-serif' }}>LATE FEES THIS MONTH:</div>
          <div style={{ ...headline(84, ACCENT), fontWeight: 900 }}>${feeCount}</div>
          <div style={{ ...headline(18, '#888'), fontFamily: 'Arial,sans-serif', marginTop: 4 }}>($34 PER MISSED PAYMENT)</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: APR comparison bar chart — credit card vs BNPL equivalent
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 60 } });
  const ccBarProg = interpolate(frame, [40, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bnplBarProg = interpolate(frame, [65, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strikeOpacity = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const MAX_BAR = 420;
  const ccHeight = Math.max(0, ccBarProg * MAX_BAR * 0.8);
  const bnplHeight = Math.max(0, bnplBarProg * MAX_BAR);
  const BASE_Y = 480;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, WHITE), padding: '0 40px' }}>THE APR REALITY</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            "FREE FINANCING" ISN'T FREE
          </p>
        </div>

        <div style={{ position: 'absolute', top: 370, left: '50%', transform: `translateX(-50%) scale(${containerSpring})` }}>
          <svg width="920" height="560">
            <line x1="80" y1={BASE_Y} x2="840" y2={BASE_Y} stroke="#333" strokeWidth="3" />

            {/* Credit card bar */}
            <rect x="150" y={BASE_Y - ccHeight} width="220" height={ccHeight} rx="10" fill="#3B82F6" />
            <text x="260" y={BASE_Y + 36} textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>CREDIT</text>
            <text x="260" y={BASE_Y + 62} textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>CARD</text>
            <text x="260" y={BASE_Y - ccHeight - 18} textAnchor="middle" fill="#3B82F6" fontSize="30" fontWeight="bold" fontFamily={FONT} opacity={ccBarProg}>~20% APR</text>

            {/* BNPL bar */}
            <rect x="550" y={BASE_Y - bnplHeight} width="220" height={bnplHeight} rx="10" fill={ACCENT} />
            <text x="660" y={BASE_Y + 36} textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>BNPL</text>
            <text x="660" y={BASE_Y + 62} textAnchor="middle" fill={WHITE} fontSize="22" fontWeight="bold" fontFamily={FONT}>+ FEES</text>
            <text x="660" y={BASE_Y - bnplHeight - 18} textAnchor="middle" fill={ACCENT} fontSize="30" fontWeight="bold" fontFamily={FONT} opacity={bnplBarProg}>~25% APR</text>
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center', opacity: strikeOpacity }}>
          <div style={{ ...headline(40, '#666'), textDecoration: 'line-through' }}>FREE FINANCING</div>
          <div style={{ ...headline(36, ACCENT), marginTop: 10 }}>SAME AS HIGH-INTEREST CARD</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Piggy bank + falling coins + CTA banner
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggySpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const coinProgress = interpolate(frame, [40, 140], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [168, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSpring = spring({ frame: frame - 168, fps, config: { damping: 8, stiffness: 60 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(56, BLACK), padding: '0 40px' }}>THE FIX</h2>
          <p style={{ ...headline(24, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            ONE PURCHASE. ONE PAYMENT.
          </p>
        </div>

        {/* Piggy bank */}
        <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translateX(-50%) scale(${piggySpring})` }}>
          <svg width="380" height="360">
            {/* Body */}
            <ellipse cx="190" cy="230" rx="150" ry="118" fill={ACCENT} />
            {/* Coin slot */}
            <rect x="162" y="114" width="56" height="16" rx="8" fill="#B91C1C" />
            {/* Ears */}
            <ellipse cx="68" cy="188" rx="44" ry="34" fill={ACCENT} opacity="0.85" />
            <ellipse cx="312" cy="188" rx="44" ry="34" fill={ACCENT} opacity="0.85" />
            {/* Snout */}
            <ellipse cx="190" cy="258" rx="34" ry="26" fill="#B91C1C" />
            <circle cx="179" cy="256" r="6" fill={BLACK} />
            <circle cx="201" cy="256" r="6" fill={BLACK} />
            {/* Eyes */}
            <circle cx="150" cy="210" r="13" fill={BLACK} />
            <circle cx="230" cy="210" r="13" fill={BLACK} />
            <circle cx="154" cy="206" r="4" fill={WHITE} />
            <circle cx="234" cy="206" r="4" fill={WHITE} />
            {/* Smile */}
            <path d="M 162 278 Q 190 296 218 278" stroke={BLACK} strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Legs */}
            <rect x="118" y="334" width="28" height="44" rx="14" fill="#B91C1C" />
            <rect x="156" y="334" width="28" height="44" rx="14" fill="#B91C1C" />
            <rect x="198" y="334" width="28" height="44" rx="14" fill="#B91C1C" />
            <rect x="236" y="334" width="28" height="44" rx="14" fill="#B91C1C" />
          </svg>
        </div>

        {/* Falling coins */}
        <svg width="1080" height="380" style={{ position: 'absolute', top: 320 }}>
          {Array.from({ length: Math.max(0, Math.floor(coinProgress)) }, (_, i) => {
            const cx = 300 + i * 100;
            const cy = 55 + (i % 3) * 40;
            return (
              <g key={`coin-${i}`}>
                <circle cx={cx} cy={cy} r="24" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
                <text x={cx} y={cy + 9} textAnchor="middle" fill={BLACK} fontSize="18" fontWeight="bold" fontFamily={FONT}>$</text>
              </g>
            );
          })}
        </svg>

        {/* CTA */}
        <div style={{
          position: 'absolute', bottom: 90, left: '5%', width: '90%',
          background: ACCENT, padding: '40px 36px', borderRadius: 24, textAlign: 'center',
          opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ ...headline(50, BLACK), fontWeight: 900 }}>ONE PURCHASE</div>
          <div style={{ ...headline(50, BLACK), fontWeight: 900 }}>ONE PAYMENT</div>
          <div style={{ ...headline(18, BLACK), fontFamily: 'Arial,sans-serif', marginTop: 14, letterSpacing: '0.08em' }}>
            OPEN YOUR APPS. ADD IT UP. START TODAY.
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
