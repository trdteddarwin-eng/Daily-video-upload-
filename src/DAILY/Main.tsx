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

  const personSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 80 } });
  const badgeOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeY = interpolate(badgeOpacity, [0, 1], [20, 0]);
  const drainStart = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const trapOpacity = interpolate(frame, [155, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 160, width: '100%', textAlign: 'center' }}>
          <h1 style={{ ...headline(96, WHITE), padding: '0 40px' }}>80%</h1>
          <p style={{ ...headline(26, ACCENT), fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em', padding: '0 60px', marginTop: 12 }}>
            END UP POORER AFTER A RAISE
          </p>
        </div>

        {/* Person silhouette */}
        <div style={{
          position: 'absolute',
          top: 520,
          left: '50%',
          transform: `translateX(-50%) scale(${personSpring})`,
        }}>
          <svg width="180" height="260">
            <circle cx="90" cy="48" r="38" fill={ACCENT} />
            <ellipse cx="90" cy="155" rx="52" ry="68" fill={ACCENT} opacity="0.9" />
            <rect x="62" y="205" width="24" height="52" rx="12" fill={ACCENT} />
            <rect x="94" y="205" width="24" height="52" rx="12" fill={ACCENT} />
            <circle cx="77" cy="43" r="6" fill={BLACK} />
            <circle cx="103" cy="43" r="6" fill={BLACK} />
            <path d="M 72 60 Q 90 74 108 60" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* RAISE badge */}
        <div style={{
          position: 'absolute',
          top: 480,
          left: '56%',
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
        }}>
          <div style={{ background: ACCENT, borderRadius: 16, padding: '14px 24px' }}>
            <div style={{ ...headline(30, BLACK) }}>+RAISE</div>
          </div>
        </div>

        {/* Draining coins */}
        {[...Array(Math.max(0, Math.floor(6)))].map((_, i) => {
          const delay = i * 0.12;
          const prog = Math.max(0, drainStart - delay);
          const coinY = interpolate(prog, [0, 0.8], [760, 1300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const coinOpacity = interpolate(prog, [0.6, 0.8], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (drainStart > delay ? 1 : 0);
          return (
            <svg key={`coin-${i}`} width="44" height="44" style={{
              position: 'absolute',
              left: 448 + (i % 3) * 65,
              top: coinY,
              opacity: coinOpacity,
            }}>
              <circle cx="22" cy="22" r="20" fill={ACCENT} stroke="#059669" strokeWidth="3" />
              <text x="22" y="29" textAnchor="middle" fill={BLACK} fontSize="22" fontWeight="bold">$</text>
            </svg>
          );
        })}

        <div style={{
          position: 'absolute',
          bottom: 210,
          width: '100%',
          textAlign: 'center',
          opacity: trapOpacity,
        }}>
          <div style={{ ...headline(30, '#EF4444') }}>THE RAISE TRAP</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const earnProgress = interpolate(frame, [25, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const spendProgress = interpolate(frame, [75, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const earnAmt = Math.floor(interpolate(frame, [25, 105], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const spendAmt = Math.floor(interpolate(frame, [75, 165], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const warnOpacity = interpolate(frame, [172, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 480;
  const MAX_H = 380;
  const earnH = earnProgress * MAX_H;
  const spendH = spendProgress * MAX_H * 1.2;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 150, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(52, BLACK), padding: '0 40px' }}>LIFESTYLE CREEP</h2>
          <p style={{ ...headline(22, ACCENT), fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em', marginTop: 14 }}>
            FOR EVERY $100 RAISE...
          </p>
        </div>

        <svg width="1080" height="700" style={{ position: 'absolute', top: 340 }}>
          {/* Baseline */}
          <line x1="80" y1={BASE_Y} x2="1000" y2={BASE_Y} stroke="#CCC" strokeWidth="3" />

          {/* Earn bar */}
          <rect x="170" y={BASE_Y - earnH} width="240" height={Math.max(0, earnH)} fill={ACCENT} rx="12" />
          <text x="290" y={BASE_Y - earnH - 18} textAnchor="middle" fill={ACCENT} fontSize="54" fontWeight="bold" fontFamily={FONT}>
            +${earnAmt}
          </text>
          <text x="290" y={BASE_Y + 56} textAnchor="middle" fill={BLACK} fontSize="28" fontWeight="bold" fontFamily={FONT}>
            YOU EARN
          </text>

          {/* Spend bar */}
          <rect x="670" y={BASE_Y - spendH} width="240" height={Math.max(0, spendH)} fill="#EF4444" rx="12" />
          <text x="790" y={BASE_Y - spendH - 18} textAnchor="middle" fill="#EF4444" fontSize="54" fontWeight="bold" fontFamily={FONT}>
            +${spendAmt}
          </text>
          <text x="790" y={BASE_Y + 56} textAnchor="middle" fill={BLACK} fontSize="28" fontWeight="bold" fontFamily={FONT}>
            YOU SPEND
          </text>
        </svg>

        <div style={{
          position: 'absolute',
          bottom: 155,
          left: '7%',
          width: '86%',
          background: '#EF4444',
          padding: 34,
          borderRadius: 20,
          textAlign: 'center',
          opacity: warnOpacity,
        }}>
          <div style={{ ...headline(34, WHITE) }}>YOU'RE FALLING BEHIND</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const carSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const tagSpring = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 80 } });
  const billFlow = interpolate(frame, [85, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wipeOpacity = interpolate(frame, [178, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <p style={{ ...headline(28, ACCENT), fontFamily: 'Arial, sans-serif', marginBottom: 10 }}>TRIGGER #1</p>
          <h2 style={{ ...headline(56, WHITE), padding: '0 40px' }}>THE CAR UPGRADE</h2>
        </div>

        {/* Car */}
        <div style={{
          position: 'absolute',
          top: 510,
          left: '50%',
          transform: `translateX(-50%) scale(${carSpring})`,
        }}>
          <svg width="580" height="290">
            <rect x="40" y="140" width="500" height="100" rx="22" fill="#2A2A2A" />
            <path d="M 140 140 L 195 68 L 385 68 L 440 140 Z" fill="#3A3A3A" />
            <path d="M 200 140 L 240 84 L 370 84 L 410 140 Z" fill="#1A3A4A" opacity="0.8" />
            <circle cx="165" cy="240" r="48" fill="#1A1A1A" stroke="#555" strokeWidth="6" />
            <circle cx="165" cy="240" r="24" fill="#333" />
            <circle cx="415" cy="240" r="48" fill="#1A1A1A" stroke="#555" strokeWidth="6" />
            <circle cx="415" cy="240" r="24" fill="#333" />
            <ellipse cx="532" cy="175" rx="18" ry="13" fill="#FFD700" opacity="0.85" />
            <rect x="42" y="172" width="14" height="22" rx="4" fill="#EF4444" opacity="0.85" />
          </svg>
        </div>

        {/* Price tag */}
        <div style={{
          position: 'absolute',
          top: 468,
          left: '60%',
          transform: `scale(${tagSpring})`,
        }}>
          <div style={{ background: ACCENT, borderRadius: 18, padding: '18px 28px', textAlign: 'center' }}>
            <div style={{ ...headline(16, BLACK), fontSize: 15 }}>MONTHLY PAYMENT</div>
            <div style={{ ...headline(56, BLACK) }}>$400</div>
          </div>
        </div>

        {/* Bills flowing into car */}
        {[...Array(Math.max(0, Math.floor(5)))].map((_, i) => {
          const delay = i * 0.14;
          const prog = Math.max(0, billFlow - delay);
          const bx = interpolate(prog, [0, 0.7], [900, 310], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`bill-${i}`} width="78" height="38" style={{
              position: 'absolute',
              left: bx,
              top: 695 + i * 14,
              opacity: billFlow > delay ? 1 : 0,
            }}>
              <rect x="0" y="0" width="78" height="38" rx="5" fill="#85BB65" stroke="#5A8A45" strokeWidth="2" />
              <text x="39" y="26" textAnchor="middle" fill="#2D5A1B" fontSize="20" fontWeight="bold">$</text>
            </svg>
          );
        })}

        <div style={{
          position: 'absolute',
          bottom: 168,
          width: '100%',
          textAlign: 'center',
          opacity: wipeOpacity,
        }}>
          <div style={{ ...headline(26, '#EF4444') }}>RAISE WIPED OUT IN ONE PAYMENT</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const house1Spring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 70 } });
  const arrowSpring = spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 60 } });
  const house2Spring = spring({ frame: frame - 85, fps, config: { damping: 12, stiffness: 70 } });
  const costCount = Math.floor(interpolate(frame, [115, 178], [0, 180000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const ctaOpacity = interpolate(frame, [182, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <p style={{ ...headline(28, '#EF4444'), fontFamily: 'Arial, sans-serif', marginBottom: 10 }}>TRIGGER #2</p>
          <h2 style={{ ...headline(48, BLACK), padding: '0 40px' }}>THE APARTMENT UPGRADE</h2>
        </div>

        {/* Small house */}
        <div style={{ position: 'absolute', top: 510, left: 55, transform: `scale(${house1Spring})` }}>
          <svg width="330" height="290">
            <polygon points="165,18 18,138 312,138" fill="#888" />
            <rect x="38" y="138" width="254" height="148" fill="#AAAAAA" />
            <rect x="135" y="196" width="76" height="90" rx="8" fill="#666" />
            <rect x="58" y="158" width="68" height="56" rx="6" fill="#1A3A4A" />
            <line x1="58" y1="186" x2="126" y2="186" stroke="#AAA" strokeWidth="2" />
            <line x1="92" y1="158" x2="92" y2="214" stroke="#AAA" strokeWidth="2" />
            <rect x="204" y="158" width="68" height="56" rx="6" fill="#1A3A4A" />
            <line x1="204" y1="186" x2="272" y2="186" stroke="#AAA" strokeWidth="2" />
            <line x1="238" y1="158" x2="238" y2="214" stroke="#AAA" strokeWidth="2" />
          </svg>
          <div style={{ ...headline(20, BLACK), textAlign: 'center' }}>CURRENT PLACE</div>
        </div>

        {/* Arrow */}
        <div style={{ position: 'absolute', top: 660, left: 430, transform: `scale(${arrowSpring})` }}>
          <svg width="160" height="60">
            <path d="M 10 30 L 118 30 L 118 16 L 150 30 L 118 44 L 118 30 Z" fill="#EF4444" />
          </svg>
          <div style={{ ...headline(18, '#EF4444'), textAlign: 'center', marginTop: 8, fontFamily: 'Arial, sans-serif' }}>+$500/MO</div>
        </div>

        {/* Big house */}
        <div style={{ position: 'absolute', top: 445, left: 620, transform: `scale(${house2Spring})` }}>
          <svg width="400" height="355">
            <polygon points="200,18 18,158 382,158" fill="#555" />
            <rect x="280" y="48" width="38" height="78" fill="#666" />
            <rect x="32" y="158" width="336" height="188" fill="#777" />
            <rect x="162" y="240" width="76" height="106" rx="10" fill="#444" />
            <rect x="50" y="178" width="88" height="76" rx="8" fill="#1A3A4A" />
            <line x1="50" y1="216" x2="138" y2="216" stroke="#777" strokeWidth="2" />
            <line x1="94" y1="178" x2="94" y2="254" stroke="#777" strokeWidth="2" />
            <rect x="262" y="178" width="88" height="76" rx="8" fill="#1A3A4A" />
            <line x1="262" y1="216" x2="350" y2="216" stroke="#777" strokeWidth="2" />
            <line x1="306" y1="178" x2="306" y2="254" stroke="#777" strokeWidth="2" />
            <rect x="32" y="275" width="96" height="71" rx="6" fill="#555" />
          </svg>
          <div style={{ ...headline(20, '#EF4444'), textAlign: 'center' }}>THE "UPGRADE"</div>
        </div>

        {/* Cost counter */}
        <div style={{
          position: 'absolute',
          bottom: 210,
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [115, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{ ...headline(22, BLACK), fontFamily: 'Arial, sans-serif' }}>30-YEAR WEALTH COST:</div>
          <div style={{ ...headline(76, '#EF4444'), fontWeight: 900 }}>${costCount.toLocaleString()}</div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
          opacity: ctaOpacity,
        }}>
          <div style={{ ...headline(22, '#EF4444'), fontFamily: 'Arial, sans-serif' }}>$180K YOU'LL NEVER BUILD</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggySpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const item1Opacity = interpolate(frame, [38, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Opacity = interpolate(frame, [68, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Opacity = interpolate(frame, [98, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item4Opacity = interpolate(frame, [128, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const monthsCount = Math.floor(interpolate(frame, [158, 205], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOpacity = interpolate(frame, [158, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <p style={{ ...headline(28, ACCENT), fontFamily: 'Arial, sans-serif', marginBottom: 10 }}>TRIGGER #3</p>
          <h2 style={{ ...headline(48, WHITE), padding: '0 40px' }}>THE INVISIBLE SPLURGE</h2>
        </div>

        {/* Piggy bank center */}
        <div style={{
          position: 'absolute',
          top: 490,
          left: '50%',
          transform: `translateX(-50%) scale(${piggySpring})`,
        }}>
          <svg width="220" height="200">
            <ellipse cx="110" cy="130" rx="95" ry="70" fill={ACCENT} opacity="0.25" />
            <ellipse cx="110" cy="120" rx="82" ry="60" fill={ACCENT} opacity="0.5" />
            <ellipse cx="110" cy="115" rx="72" ry="55" fill={ACCENT} />
            <circle cx="82" cy="100" r="8" fill={BLACK} />
            <circle cx="138" cy="100" r="8" fill={BLACK} />
            <ellipse cx="56" cy="90" rx="26" ry="21" fill={ACCENT} opacity="0.8" />
            <ellipse cx="164" cy="90" rx="26" ry="21" fill={ACCENT} opacity="0.8" />
            <ellipse cx="110" cy="125" rx="17" ry="12" fill="#059669" />
            <circle cx="100" cy="121" r="3" fill={BLACK} />
            <circle cx="120" cy="121" r="3" fill={BLACK} />
            <path d="M 90 138 Q 110 150 130 138" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="80" y="58" width="60" height="10" rx="5" fill="#059669" />
            <rect x="88" y="59" width="26" height="6" rx="3" fill={BLACK} />
            <rect x="82" y="170" width="20" height="26" rx="9" fill="#059669" />
            <rect x="118" y="170" width="20" height="26" rx="9" fill="#059669" />
          </svg>
          <div style={{ ...headline(18, ACCENT), textAlign: 'center', marginTop: 8 }}>YOUR RAISE</div>
        </div>

        {/* Coffee — top left */}
        <div style={{ position: 'absolute', top: 395, left: 55, opacity: item1Opacity }}>
          <svg width="110" height="130">
            <rect x="18" y="38" width="74" height="82" rx="8" fill="#8B4513" />
            <path d="M 92 52 Q 114 64 114 78 Q 114 92 92 102" stroke="#8B4513" strokeWidth="8" fill="none" />
            <ellipse cx="55" cy="38" rx="37" ry="11" fill="#A0522D" />
            <rect x="22" y="116" width="66" height="5" rx="2" fill="#5D2E0C" />
          </svg>
          <div style={{ ...headline(16, WHITE), textAlign: 'center', fontSize: 14 }}>COFFEE</div>
          <div style={{ ...headline(16, '#EF4444'), textAlign: 'center', fontSize: 14 }}>$90/mo</div>
        </div>

        {/* Phone — top right */}
        <div style={{ position: 'absolute', top: 395, right: 55, opacity: item2Opacity }}>
          <svg width="90" height="160">
            <rect x="8" y="0" width="74" height="140" rx="14" fill="#333" stroke="#555" strokeWidth="3" />
            <rect x="18" y="18" width="54" height="84" rx="4" fill="#1A3A4A" />
            <circle cx="45" cy="122" r="8" fill="#555" />
            <rect x="28" y="0" width="34" height="6" rx="3" fill="#222" />
          </svg>
          <div style={{ ...headline(16, WHITE), textAlign: 'center', fontSize: 14 }}>SUBS</div>
          <div style={{ ...headline(16, '#EF4444'), textAlign: 'center', fontSize: 14 }}>$75/mo</div>
        </div>

        {/* Shopping bag — bottom left */}
        <div style={{ position: 'absolute', top: 680, left: 80, opacity: item3Opacity }}>
          <svg width="130" height="148">
            <path d="M 18 56 L 28 130 L 102 130 L 112 56 Z" fill="#E67E22" />
            <path d="M 42 56 Q 42 22 65 22 Q 88 22 88 56" stroke="#E67E22" strokeWidth="8" fill="none" />
            <path d="M 50 90 Q 65 100 80 90" stroke="#C0392B" strokeWidth="3" fill="none" />
          </svg>
          <div style={{ ...headline(16, WHITE), textAlign: 'center', fontSize: 14 }}>CLOTHES</div>
          <div style={{ ...headline(16, '#EF4444'), textAlign: 'center', fontSize: 14 }}>$120/mo</div>
        </div>

        {/* Fork + knife — bottom right */}
        <div style={{ position: 'absolute', top: 680, right: 80, opacity: item4Opacity }}>
          <svg width="110" height="150">
            <path d="M 28 18 L 28 76 Q 28 94 46 94 L 46 150" stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 28 18 L 28 46" stroke={WHITE} strokeWidth="11" fill="none" />
            <path d="M 82 18 Q 82 58 64 76 L 64 150" stroke={WHITE} strokeWidth="7" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ ...headline(16, WHITE), textAlign: 'center', fontSize: 14 }}>DINING</div>
          <div style={{ ...headline(16, '#EF4444'), textAlign: 'center', fontSize: 14 }}>$200/mo</div>
        </div>

        {/* Month counter */}
        <div style={{
          position: 'absolute',
          bottom: 175,
          width: '100%',
          textAlign: 'center',
          opacity: counterOpacity,
        }}>
          <div style={{ ...headline(26, WHITE), fontFamily: 'Arial, sans-serif' }}>RAISE GONE IN:</div>
          <div style={{ ...headline(78, '#EF4444'), fontWeight: 900 }}>{monthsCount} MONTHS</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 70 } });
  const arrowProgress = interpolate(frame, [48, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggySpring = spring({ frame: frame - 58, fps, config: { damping: 12, stiffness: 70 } });
  const piggyFill = interpolate(frame, [78, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSpring = spring({ frame: frame - 162, fps, config: { damping: 8, stiffness: 60 } });
  const ctaOpacity = interpolate(frame, [162, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
          <h2 style={{ ...headline(60, BLACK), padding: '0 40px' }}>THE FIX</h2>
          <p style={{ ...headline(26, ACCENT), fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em', marginTop: 14 }}>
            AUTOMATE ON RAISE DAY
          </p>
        </div>

        {/* Phone */}
        <div style={{ position: 'absolute', top: 490, left: 85, transform: `scale(${phoneSpring})` }}>
          <svg width="210" height="340">
            <rect x="18" y="0" width="174" height="320" rx="22" fill="#333" stroke="#555" strokeWidth="3" />
            <rect x="28" y="28" width="154" height="248" rx="8" fill="#1A3A4A" />
            <text x="105" y="95" textAnchor="middle" fill={WHITE} fontSize="17" fontWeight="bold" fontFamily={FONT}>MY BANK</text>
            <text x="105" y="132" textAnchor="middle" fill={ACCENT} fontSize="22" fontWeight="bold" fontFamily={FONT}>RAISE +$500</text>
            <rect x="46" y="192" width="118" height="38" rx="19" fill={ACCENT} />
            <text x="105" y="217" textAnchor="middle" fill={BLACK} fontSize="15" fontWeight="bold" fontFamily={FONT}>AUTO SAVE</text>
            <circle cx="105" cy="298" r="11" fill="#555" />
            <rect x="72" y="0" width="66" height="14" rx="7" fill="#222" />
          </svg>
          <div style={{ ...headline(18, BLACK), textAlign: 'center', marginTop: 10 }}>RAISE DAY</div>
        </div>

        {/* Transfer arrow */}
        <svg width="380" height="70" style={{ position: 'absolute', top: 668, left: 210 }}>
          <path
            d={`M 20 35 L ${20 + arrowProgress * 300} 35 L ${20 + arrowProgress * 300} 20 L ${20 + arrowProgress * 300 + 30} 35 L ${20 + arrowProgress * 300} 50 L ${20 + arrowProgress * 300} 35`}
            fill={ACCENT}
            opacity={arrowProgress}
          />
        </svg>

        {/* Piggy bank filling */}
        <div style={{ position: 'absolute', top: 490, right: 55, transform: `scale(${piggySpring})` }}>
          <svg width="250" height="230">
            <ellipse cx="125" cy="155" rx="105" ry="80" fill={ACCENT} opacity="0.2" />
            <ellipse cx="125" cy="142" rx="92" ry="70" fill={ACCENT} opacity="0.45" />
            <ellipse cx="125" cy="136" rx="80" ry="62" fill={ACCENT} />
            <rect x="78" y="72" width="94" height="12" rx="6" fill="#059669" />
            <rect x="86" y="117" width="78" height={Math.max(0, piggyFill * 80)} rx="8" fill="#059669" opacity="0.65" />
            <circle cx="96" cy="115" r="9" fill={BLACK} />
            <circle cx="154" cy="115" r="9" fill={BLACK} />
            <ellipse cx="62" cy="104" rx="28" ry="22" fill={ACCENT} opacity="0.8" />
            <ellipse cx="188" cy="104" rx="28" ry="22" fill={ACCENT} opacity="0.8" />
            <ellipse cx="125" cy="148" rx="20" ry="14" fill="#059669" />
            <circle cx="115" cy="144" r="4" fill={BLACK} />
            <circle cx="135" cy="144" r="4" fill={BLACK} />
            <path d="M 104 162 Q 125 175 146 162" stroke={BLACK} strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="94" y="198" width="22" height="30" rx="10" fill="#059669" />
            <rect x="134" y="198" width="22" height="30" rx="10" fill="#059669" />
          </svg>
          <div style={{ ...headline(20, ACCENT), textAlign: 'center', marginTop: 10 }}>SAVINGS GROW</div>
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute',
          bottom: 115,
          left: '5%',
          width: '90%',
          background: ACCENT,
          padding: 44,
          borderRadius: 24,
          textAlign: 'center',
          opacity: ctaOpacity,
          transform: `scale(${ctaSpring})`,
        }}>
          <div style={{ ...headline(52, BLACK), fontWeight: 900 }}>THE 50% RULE</div>
          <div style={{ ...headline(20, BLACK), fontFamily: 'Arial, sans-serif', marginTop: 14, letterSpacing: '0.08em' }}>
            BANK HALF OF EVERY RAISE • START TODAY
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
