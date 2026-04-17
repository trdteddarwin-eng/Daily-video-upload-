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

// Scene 6: ATM hand + growing piggy bank + CTA banner
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const atmSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const piggySpring = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 70 } });
  const piggyFill = interpolate(frame, [75, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dayProgress = interpolate(frame, [65, 175], [0, 7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [168, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSpring = spring({ frame: frame - 168, fps, config: { damping: 8, stiffness: 60 } });

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(56, BLACK), padding: '0 40px' }}>THE $200 RULE</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            PULL CASH SUNDAY. GONE MEANS GONE.
          </p>
        </div>

        {/* ATM machine */}
        <div style={{ position: 'absolute', top: 440, left: 72, transform: `scale(${atmSpring})` }}>
          <svg width="280" height="380">
            {/* ATM body */}
            <rect x="10" y="10" width="260" height="360" rx="18" fill="#2A2A2A" stroke="#444" strokeWidth="3" />
            <rect x="30" y="30" width="220" height="140" rx="10" fill="#1A3A4A" />
            <text x="140" y="80" textAnchor="middle" fill={ACCENT} fontSize="18" fontWeight="bold" fontFamily={FONT}>MY BANK</text>
            <text x="140" y="118" textAnchor="middle" fill={WHITE} fontSize="28" fontWeight="bold" fontFamily={FONT}>$200</text>
            <rect x="60" y="200" width="160" height="52" rx="26" fill={ACCENT} />
            <text x="140" y="233" textAnchor="middle" fill={BLACK} fontSize="18" fontWeight="bold" fontFamily={FONT}>WITHDRAW</text>
            <rect x="80" y="278" width="120" height="20" rx="4" fill="#333" />
            <rect x="80" y="308" width="120" height="20" rx="4" fill="#333" />
            {/* Cash slot */}
            <rect x="50" y="340" width="180" height="22" rx="6" fill="#1A1A1A" stroke="#555" strokeWidth="2" />
            {/* Bills coming out */}
            <rect x="72" y="328" width="136" height="24" rx="4" fill="#2E7D32" opacity={interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
            <text x="140" y="346" textAnchor="middle" fill="#A5D6A7" fontSize="16" fontWeight="bold" fontFamily={FONT} opacity={interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>$200 CASH</text>
          </svg>
        </div>

        {/* Piggy bank filling */}
        <div style={{ position: 'absolute', top: 430, right: 55, transform: `scale(${piggySpring})` }}>
          <svg width="280" height="280">
            <ellipse cx="140" cy="175" rx="112" ry="88" fill={ACCENT} opacity="0.2" />
            <ellipse cx="140" cy="160" rx="98" ry="76" fill={ACCENT} opacity="0.45" />
            <ellipse cx="140" cy="152" rx="86" ry="68" fill={ACCENT} />
            {/* Fill level */}
            <clipPath id="piggyClip">
              <ellipse cx="140" cy="152" rx="86" ry="68" />
            </clipPath>
            <rect x="54" y={220 - piggyFill * 136} width="172" height={Math.max(0, piggyFill * 136)} fill="#059669" opacity="0.5" clipPath="url(#piggyClip)" />
            <circle cx="108" cy="135" r="10" fill={BLACK} />
            <circle cx="172" cy="135" r="10" fill={BLACK} />
            <ellipse cx="70" cy="118" rx="30" ry="24" fill={ACCENT} opacity="0.8" />
            <ellipse cx="210" cy="118" rx="30" ry="24" fill={ACCENT} opacity="0.8" />
            <ellipse cx="140" cy="166" rx="22" ry="16" fill="#059669" />
            <circle cx="128" cy="162" r="4" fill={BLACK} />
            <circle cx="152" cy="162" r="4" fill={BLACK} />
            <path d="M 118 182 Q 140 196 162 182" stroke={BLACK} strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="90" y="80" width="100" height="14" rx="7" fill="#059669" />
            <rect x="100" y="226" width="24" height="36" rx="12" fill="#059669" />
            <rect x="156" y="226" width="24" height="36" rx="12" fill="#059669" />
          </svg>
          <div style={{ ...headline(20, ACCENT), textAlign: 'center', marginTop: 10 }}>SAVINGS GROW</div>
        </div>

        {/* Day tracker */}
        <div style={{ position: 'absolute', top: 800, width: '100%', display: 'flex', justifyContent: 'center', gap: 0 }}>
          <svg width="1000" height="80">
            {days.map((d, i) => {
              const active = dayProgress >= i;
              return (
                <g key={`day-${i}`}>
                  <circle cx={80 + i * 125} cy="36" r="28" fill={active ? ACCENT : '#DDD'} />
                  <text x={80 + i * 125} y="44" textAnchor="middle" fill={active ? BLACK : '#999'} fontSize="16" fontWeight="bold" fontFamily={FONT}>{d}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute', bottom: 105, left: '5%', width: '90%',
          background: ACCENT, padding: 44, borderRadius: 24, textAlign: 'center',
          opacity: ctaOpacity, transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ ...headline(52, BLACK), fontWeight: 900 }}>THE $200 SUNDAY RULE</div>
          <div style={{ ...headline(20, BLACK), fontFamily: 'Arial,sans-serif', marginTop: 14, letterSpacing: '0.08em' }}>
            CASH ONLY FOR FUN SPENDING • START THIS WEEK
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

// Scene 4: Credit card surrounded by spending icons totaling $6,200
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const coffee = interpolate(frame, [38, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phone = interpolate(frame, [68, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bag = interpolate(frame, [98, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fork = interpolate(frame, [128, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtCount = Math.floor(interpolate(frame, [158, 205], [0, 6200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const debtOpacity = interpolate(frame, [158, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(48, BLACK), padding: '0 40px' }}>DEATH BY 1,000 TAPS</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            AVG AMERICAN: $6,200 IN CARD DEBT
          </p>
        </div>

        {/* Center card */}
        <div style={{ position: 'absolute', top: 540, left: '50%', transform: `translateX(-50%) scale(${cardSpring})` }}>
          <svg width="340" height="210">
            <rect x="0" y="0" width="340" height="210" rx="22" fill="#1A237E" stroke="#3949AB" strokeWidth="3" />
            <rect x="0" y="70" width="340" height="44" fill="#0D1B6B" />
            <rect x="20" y="116" width="90" height="50" rx="8" fill="#FFD700" />
            <rect x="28" y="124" width="36" height="20" rx="4" fill="#F9A825" />
            <circle cx="200" cy="44" r="22" fill="#E53935" opacity="0.85" />
            <circle cx="225" cy="44" r="22" fill="#FF7F00" opacity="0.7" />
            <text x="135" y="170" fill={WHITE} fontSize="16" fontFamily={FONT} opacity="0.7">•••• •••• •••• 4729</text>
          </svg>
        </div>

        {/* Coffee top-left */}
        <div style={{ position: 'absolute', top: 420, left: 65, opacity: coffee }}>
          <svg width="110" height="120">
            <rect x="18" y="32" width="74" height="78" rx="8" fill="#6D4C41" />
            <path d="M 92 48 Q 112 60 112 76 Q 112 90 92 100" stroke="#6D4C41" strokeWidth="8" fill="none" />
            <ellipse cx="55" cy="32" rx="37" ry="11" fill="#8D6E63" />
          </svg>
          <div style={{ ...headline(18, BLACK), textAlign: 'center', fontSize: 15 }}>COFFEE</div>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', fontSize: 16 }}>$90/mo</div>
        </div>

        {/* Phone top-right */}
        <div style={{ position: 'absolute', top: 420, right: 65, opacity: phone }}>
          <svg width="90" height="150">
            <rect x="8" y="0" width="74" height="136" rx="14" fill="#333" stroke="#555" strokeWidth="3" />
            <rect x="18" y="18" width="54" height="82" rx="4" fill="#1A3A4A" />
            <circle cx="45" cy="118" r="8" fill="#555" />
            <rect x="28" y="0" width="34" height="6" rx="3" fill="#222" />
          </svg>
          <div style={{ ...headline(18, BLACK), textAlign: 'center', fontSize: 15 }}>SUBS</div>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', fontSize: 16 }}>$75/mo</div>
        </div>

        {/* Shopping bag bottom-left */}
        <div style={{ position: 'absolute', top: 720, left: 90, opacity: bag }}>
          <svg width="130" height="140">
            <path d="M 18 52 L 28 126 L 102 126 L 112 52 Z" fill="#E67E22" />
            <path d="M 42 52 Q 42 20 65 20 Q 88 20 88 52" stroke="#E67E22" strokeWidth="8" fill="none" />
          </svg>
          <div style={{ ...headline(18, BLACK), textAlign: 'center', fontSize: 15 }}>CLOTHES</div>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', fontSize: 16 }}>$150/mo</div>
        </div>

        {/* Fork bottom-right */}
        <div style={{ position: 'absolute', top: 720, right: 90, opacity: fork }}>
          <svg width="110" height="140">
            <path d="M 28 18 L 28 76 Q 28 94 46 94 L 46 140" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 28 18 L 28 46" stroke="#333" strokeWidth="11" fill="none" />
            <path d="M 82 18 Q 82 58 64 76 L 64 140" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ ...headline(18, BLACK), textAlign: 'center', fontSize: 15 }}>DINING</div>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', fontSize: 16 }}>$200/mo</div>
        </div>

        {/* Debt counter */}
        <div style={{ position: 'absolute', bottom: 155, width: '100%', textAlign: 'center', opacity: debtOpacity }}>
          <div style={{ ...headline(24, BLACK), fontFamily: 'Arial,sans-serif' }}>AVERAGE DEBT BALANCE:</div>
          <div style={{ ...headline(72, '#EF4444'), fontWeight: 900 }}>${debtCount.toLocaleString()}</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Wallet with cash, savings bar growing to $3,000
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const walletSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const bar1 = interpolate(frame, [40, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2 = interpolate(frame, [80, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3 = interpolate(frame, [115, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar4 = interpolate(frame, [145, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsCount = Math.floor(interpolate(frame, [155, 205], [0, 3000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const savingsOpacity = interpolate(frame, [155, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BARS_Y = 560;
  const MAX_BAR = 220;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <p style={{ ...headline(28, ACCENT), fontFamily: 'Arial,sans-serif', marginBottom: 10 }}>THE #1 FIX</p>
          <h2 style={{ ...headline(52, WHITE), padding: '0 40px' }}>USE CASH FOR SPENDING</h2>
        </div>

        {/* Wallet */}
        <div style={{ position: 'absolute', top: 420, left: '50%', transform: `translateX(-50%) scale(${walletSpring})` }}>
          <svg width="280" height="180">
            <rect x="10" y="28" width="260" height="140" rx="18" fill="#5D4037" stroke="#4E342E" strokeWidth="3" />
            <rect x="10" y="68" width="260" height="60" fill="#4E342E" />
            <circle cx="230" cy="98" r="24" fill="#3E2723" stroke="#5D4037" strokeWidth="2" />
            <circle cx="230" cy="98" r="12" fill="#5D4037" />
            {/* Bills fanning out */}
            <rect x="50" y="10" width="130" height="60" rx="8" fill="#2E7D32" transform="rotate(-8 115 40)" />
            <rect x="60" y="5" width="130" height="60" rx="8" fill="#388E3C" transform="rotate(-3 125 35)" />
            <rect x="65" y="2" width="130" height="60" rx="8" fill="#43A047" />
            <text x="130" y="42" textAnchor="middle" fill="#A5D6A7" fontSize="28" fontWeight="bold" fontFamily={FONT}>$200</text>
          </svg>
          <div style={{ ...headline(20, ACCENT), textAlign: 'center', marginTop: 8 }}>WEEKLY CASH ENVELOPE</div>
        </div>

        {/* Spend reduction bars */}
        <svg width="1080" height="360" style={{ position: 'absolute', top: 470 }}>
          <line x1="80" y1={BARS_Y - 480 + 360} x2="1000" y2={BARS_Y - 480 + 360} stroke="#333" strokeWidth="2" />

          {[
            { label: 'COFFEE', before: 90, color: '#6D4C41', barProg: bar1 },
            { label: 'SUBS', before: 75, color: '#1A237E', barProg: bar2 },
            { label: 'CLOTHES', before: 150, color: '#E67E22', barProg: bar3 },
            { label: 'DINING', before: 200, color: '#EF4444', barProg: bar4 },
          ].map((item, i) => {
            const x = 150 + i * 210;
            const h = item.barProg * MAX_BAR * (item.before / 200);
            return (
              <g key={`bar-${i}`}>
                <rect x={x - 60} y={240 - h} width={120} height={Math.max(0, h)} fill={item.color} rx="8" opacity="0.7" />
                <text x={x} y={262} textAnchor="middle" fill={WHITE} fontSize="18" fontWeight="bold" fontFamily={FONT}>{item.label}</text>
                <text x={x} y={240 - h - 10} textAnchor="middle" fill={ACCENT} fontSize="22" fontWeight="bold" fontFamily={FONT} opacity={item.barProg}>-${Math.floor(item.before * item.barProg * 0.4)}/mo</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', bottom: 160, width: '100%', textAlign: 'center', opacity: savingsOpacity }}>
          <div style={{ ...headline(24, WHITE), fontFamily: 'Arial,sans-serif' }}>ANNUAL SAVINGS:</div>
          <div style={{ ...headline(80, '#4CAF50'), fontWeight: 900 }}>${savingsCount.toLocaleString()}</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Brain insula diagram — cash lights it up, card turns it off
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const cashGlow = interpolate(frame, [45, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelCash = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardAppear = interpolate(frame, [105, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const insulaLabel = interpolate(frame, [155, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>THE INSULA</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            YOUR BRAIN'S PAIN-OF-PAYING SWITCH
          </p>
        </div>

        {/* Brain SVG */}
        <div style={{
          position: 'absolute', top: 420, left: '50%',
          transform: `translateX(-50%) scale(${brainSpring})`,
        }}>
          <svg width="520" height="380">
            {/* Brain body */}
            <ellipse cx="260" cy="200" rx="200" ry="150" fill="#E8D5C4" stroke="#C4A882" strokeWidth="4" />
            <path d="M 100 180 Q 90 140 115 115 Q 140 90 170 100 Q 180 75 210 70 Q 245 65 265 85 Q 290 68 318 82 Q 348 98 350 130 Q 375 148 378 180" stroke="#C4A882" strokeWidth="4" fill="none" />
            <path d="M 150 240 Q 168 220 190 232 Q 210 244 230 228 Q 252 214 270 232 Q 288 250 308 235" stroke="#C4A882" strokeWidth="3" fill="none" />
            <path d="M 130 200 Q 125 185 140 178 Q 155 171 165 182" stroke="#C4A882" strokeWidth="3" fill="none" />
            <path d="M 340 195 Q 352 180 365 188 Q 375 198 368 212" stroke="#C4A882" strokeWidth="3" fill="none" />

            {/* Insula hotspot */}
            <circle cx="220" cy="185" r={`${35 * cashGlow}`} fill={`rgba(239,68,68,${0.3 * cashGlow})`} />
            <circle cx="220" cy="185" r={`${20 * cashGlow}`} fill={`rgba(239,68,68,${0.55 * cashGlow})`} />
            <circle cx="220" cy="185" r={`${10 * cashGlow}`} fill={`rgba(239,68,68,${cashGlow})`} />

            {/* Cash label left */}
            <text x="60" y="185" textAnchor="middle" fill="#2E7D32" fontSize="26" fontWeight="bold" fontFamily={FONT} opacity={cashGlow}>$</text>
            <line x1="85" y1="185" x2="185" y2="185" stroke="#EF4444" strokeWidth="3" strokeDasharray="8 4" opacity={cashGlow} />
            <text x="60" y="215" textAnchor="middle" fill="#2E7D32" fontSize="14" fontFamily={FONT} opacity={labelCash}>CASH</text>

            {/* Card label right */}
            <rect x="360" y="160" width="80" height="44" rx="8" fill="#1A237E" opacity={cardAppear} />
            <text x="400" y="188" textAnchor="middle" fill={WHITE} fontSize="13" fontWeight="bold" fontFamily={FONT} opacity={cardAppear}>CARD</text>
            <line x1="360" y1="182" x2="260" y2="185" stroke="#333" strokeWidth="3" strokeDasharray="8 4" opacity={cardAppear} />
            <text x="400" y="218" textAnchor="middle" fill="#999" fontSize="14" fontFamily={FONT} opacity={cardAppear}>NO SIGNAL</text>
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 165, width: '100%', textAlign: 'center', opacity: insulaLabel,
        }}>
          <div style={{
            display: 'inline-block', background: '#EF4444', padding: '18px 48px', borderRadius: 16,
          }}>
            <div style={{ ...headline(28, WHITE) }}>INSULA = OFFLINE WITH CARDS</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Auction — cash $9 vs card $28
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const podiumSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const cashPersonSpring = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 80 } });
  const cardPersonSpring = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 80 } });

  const cashAmt = Math.floor(interpolate(frame, [65, 105], [0, 9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const cardAmt = Math.floor(interpolate(frame, [100, 155], [0, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const gapOpacity = interpolate(frame, [160, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, WHITE), padding: '0 40px' }}>THE AUCTION STUDY</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', marginTop: 12 }}>
            SAME ITEM. SAME PEOPLE. DIFFERENT PAYMENT.
          </p>
        </div>

        {/* Podium */}
        <div style={{ position: 'absolute', top: 660, left: '50%', transform: `translateX(-50%) scale(${podiumSpring})` }}>
          <svg width="320" height="100">
            <polygon points="160,10 10,100 310,100" fill="#333" stroke="#555" strokeWidth="2" />
            <text x="160" y="70" textAnchor="middle" fill={WHITE} fontSize="20" fontWeight="bold" fontFamily={FONT}>AUCTION</text>
          </svg>
        </div>

        {/* Cash person left */}
        <div style={{ position: 'absolute', top: 400, left: 80, transform: `scale(${cashPersonSpring})` }}>
          <svg width="220" height="280">
            <circle cx="110" cy="44" r="36" fill="#4CAF50" />
            <circle cx="96" cy="38" r="6" fill={BLACK} />
            <circle cx="124" cy="38" r="6" fill={BLACK} />
            <path d="M 94 56 Q 110 68 126 56" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="110" cy="150" rx="50" ry="64" fill="#4CAF50" opacity="0.9" />
            <rect x="82" y="200" width="22" height="50" rx="10" fill="#4CAF50" />
            <rect x="106" y="200" width="22" height="50" rx="10" fill="#4CAF50" />
            {/* Cash bill in hand */}
            <rect x="140" y="130" width="72" height="36" rx="6" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
            <text x="176" y="154" textAnchor="middle" fill="#A5D6A7" fontSize="22" fontWeight="bold" fontFamily={FONT}>$</text>
          </svg>
          <div style={{ ...headline(22, '#4CAF50'), textAlign: 'center' }}>CASH BIDDER</div>
          <div style={{ ...headline(56, '#4CAF50'), textAlign: 'center', fontWeight: 900 }}>${cashAmt}</div>
        </div>

        {/* Card person right */}
        <div style={{ position: 'absolute', top: 400, right: 80, transform: `scale(${cardPersonSpring})` }}>
          <svg width="220" height="280">
            <circle cx="110" cy="44" r="36" fill="#EF4444" />
            <circle cx="96" cy="38" r="6" fill={BLACK} />
            <circle cx="124" cy="38" r="6" fill={BLACK} />
            <path d="M 92 62 Q 110 50 128 62" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="110" cy="150" rx="50" ry="64" fill="#EF4444" opacity="0.9" />
            <rect x="82" y="200" width="22" height="50" rx="10" fill="#EF4444" />
            <rect x="106" y="200" width="22" height="50" rx="10" fill="#EF4444" />
            {/* Card in hand */}
            <rect x="138" y="130" width="72" height="44" rx="8" fill="#1A237E" stroke="#3949AB" strokeWidth="2" />
            <rect x="144" y="148" width="30" height="18" rx="4" fill="#FFD700" />
          </svg>
          <div style={{ ...headline(22, '#EF4444'), textAlign: 'center' }}>CARD BIDDER</div>
          <div style={{ ...headline(56, '#EF4444'), textAlign: 'center', fontWeight: 900 }}>${cardAmt}</div>
        </div>

        <div style={{
          position: 'absolute', bottom: 155, width: '100%', textAlign: 'center', opacity: gapOpacity,
        }}>
          <div style={{ ...headline(32, ACCENT) }}>+$19 EXTRA — SAME ITEM</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 1: Split screen — cash brain pain vs card brain off
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 22], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cashSpring = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 80 } });
  const cardSpring = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });

  const brainGlow = interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        {/* Title */}
        <div style={{
          position: 'absolute', top: 140, width: '100%', textAlign: 'center',
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{ ...headline(72, WHITE), padding: '0 40px' }}>47%</h1>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial,sans-serif', letterSpacing: '0.05em', padding: '0 60px', marginTop: 10 }}>
            MORE SPENDING WITH A CARD
          </p>
        </div>

        {/* Cash side */}
        <div style={{
          position: 'absolute', top: 460, left: 60,
          transform: `scale(${cashSpring})`,
        }}>
          <svg width="380" height="420">
            {/* Cash bill */}
            <rect x="30" y="20" width="320" height="160" rx="14" fill="#2E7D32" stroke="#1B5E20" strokeWidth="3" />
            <rect x="50" y="36" width="280" height="128" rx="8" fill="#388E3C" />
            <circle cx="190" cy="100" r="38" fill="#1B5E20" />
            <text x="190" y="115" textAnchor="middle" fill="#A5D6A7" fontSize="44" fontWeight="bold" fontFamily={FONT}>$</text>
            <text x="52" y="64" fill="#A5D6A7" fontSize="18" fontWeight="bold" fontFamily={FONT}>100</text>
            <text x="328" y="156" textAnchor="end" fill="#A5D6A7" fontSize="18" fontWeight="bold" fontFamily={FONT}>100</text>

            {/* Brain outline */}
            <ellipse cx="190" cy="295" rx="105" ry="80" fill="#1A1A1A" stroke={`rgba(239,68,68,${brainGlow})`} strokeWidth="4" />
            <path d="M 115 270 Q 108 240 125 225 Q 145 210 165 220 Q 175 200 195 198 Q 218 196 228 215 Q 248 208 262 228 Q 278 248 268 275" stroke={`rgba(239,68,68,${brainGlow})`} strokeWidth="3" fill="none" />
            <path d="M 155 295 Q 165 285 180 292 Q 195 300 205 290 Q 218 282 228 295" stroke={`rgba(239,68,68,${brainGlow})`} strokeWidth="3" fill="none" />
            {/* Pain glow */}
            <circle cx="190" cy="265" r={`${20 * brainGlow}`} fill="rgba(239,68,68,0.25)" />
            <circle cx="190" cy="265" r={`${10 * brainGlow}`} fill={`rgba(239,68,68,${0.5 * brainGlow})`} />
          </svg>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', marginTop: 4 }}>CASH = PAIN ACTIVE</div>
        </div>

        {/* Card side */}
        <div style={{
          position: 'absolute', top: 460, right: 60,
          transform: `scale(${cardSpring})`,
        }}>
          <svg width="380" height="420">
            {/* Credit card */}
            <rect x="30" y="20" width="320" height="190" rx="18" fill="#1A237E" stroke="#283593" strokeWidth="3" />
            <rect x="30" y="80" width="320" height="40" fill="#0D1B6B" />
            <rect x="50" y="138" width="80" height="44" rx="6" fill="#FFD700" />
            <rect x="55" y="143" width="30" height="16" rx="3" fill="#F9A825" />
            <circle cx="195" cy="60" r="18" fill="#E53935" opacity="0.8" />
            <circle cx="215" cy="60" r="18" fill="#FF7F00" opacity="0.7" />
            {/* Tap signal */}
            <path d="M 270 30 Q 305 60 305 95 Q 305 130 270 160" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M 282 48 Q 308 72 308 95 Q 308 118 282 142" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Brain - dark/cold */}
            <ellipse cx="190" cy="305" rx="105" ry="80" fill="#1A1A1A" stroke="#333" strokeWidth="4" />
            <path d="M 115 280 Q 108 250 125 235 Q 145 220 165 230 Q 175 210 195 208 Q 218 206 228 225 Q 248 218 262 238 Q 278 258 268 285" stroke="#333" strokeWidth="3" fill="none" />
            <path d="M 155 305 Q 165 295 180 302 Q 195 310 205 300 Q 218 292 228 305" stroke="#333" strokeWidth="3" fill="none" />
          </svg>
          <div style={{ ...headline(18, '#555'), textAlign: 'center', marginTop: 4 }}>CARD = PAIN OFF</div>
        </div>

        {/* MIT stat */}
        <div style={{
          position: 'absolute', bottom: 160, width: '100%', textAlign: 'center', opacity: statOpacity,
        }}>
          <div style={{ ...headline(20, ACCENT), fontFamily: 'Arial,sans-serif' }}>MIT STUDY — YOUR BRAIN IS WIRED AGAINST YOU</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
