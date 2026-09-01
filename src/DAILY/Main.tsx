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

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const subOp = interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [50, 90], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowPulse = interpolate(frame, [0, 45, 90, 135, 180], [0.6, 1.0, 0.6, 1.0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const d1Y = interpolate(frame, [30, 150], [0, -220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d1Op = interpolate(frame, [30, 60, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2Y = interpolate(frame, [70, 190], [0, -200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d2Op = interpolate(frame, [70, 100, 170, 190], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3Y = interpolate(frame, [110, 225], [0, -180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const d3Op = interpolate(frame, [110, 140, 210, 225], [0, 1, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '60px' }}>
        <div style={{ ...headline(76, WHITE), transform: `scale(${titleScale})` }}>90% Emotional</div>

        <svg width="480" height="300" viewBox="0 0 480 300">
          {/* Left brain half — Logic, blue */}
          <path
            d="M240,20 C200,10 140,20 110,55 C80,90 70,140 85,190 C100,240 155,270 200,265 L240,265 Z"
            fill="#3B82F6" opacity="0.85"
          />
          <path d="M130,70 Q148,90 140,120 Q130,150 148,172" stroke="#93C5FD" strokeWidth="3" fill="none" />
          <path d="M155,58 Q168,78 162,108" stroke="#93C5FD" strokeWidth="2.5" fill="none" />
          <text x="155" y="220" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="#BFDBFE" textAnchor="middle">LOGIC</text>

          {/* Right brain half — Emotion, orange */}
          <path
            d="M240,20 C280,10 340,20 370,55 C400,90 410,140 395,190 C380,240 325,270 280,265 L240,265 Z"
            fill={ACCENT} opacity={glowPulse}
          />
          <path d="M350,70 Q332,90 340,120 Q350,150 332,172" stroke="#FED7AA" strokeWidth="3" fill="none" />
          <path d="M325,58 Q312,78 318,108" stroke="#FED7AA" strokeWidth="2.5" fill="none" />
          <text x="325" y="220" fontFamily="Arial" fontSize="20" fontWeight="bold" fill={BLACK} textAnchor="middle">EMOTION</text>

          {/* Center divider */}
          <line x1="240" y1="20" x2="240" y2="265" stroke={WHITE} strokeWidth="2" strokeDasharray="8,5" opacity="0.4" />

          {/* Dollar signs floating from emotion side */}
          <text x="360" y={250 + d1Y} opacity={d1Op} fontFamily="Arial Black" fontSize="38" fill={WHITE} textAnchor="middle">$</text>
          <text x="385" y={260 + d2Y} opacity={d2Op} fontFamily="Arial Black" fontSize="30" fill={ACCENT} textAnchor="middle">$</text>
          <text x="340" y={255 + d3Y} opacity={d3Op} fontFamily="Arial Black" fontSize="34" fill={WHITE} textAnchor="middle">$</text>
        </svg>

        <div style={{ opacity: subOp, transform: `translateY(${subY}px)` }}>
          <div style={{ ...headline(40, ACCENT) }}>And You Never Realize It</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSc = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const waveScale = interpolate(frame, [0, 45, 90, 135, 180], [1, 1.25, 1, 1.25, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardX = interpolate(frame, [40, 100], [-260, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardOp = interpolate(frame, [40, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bagX = interpolate(frame, [80, 140], [300, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bagOp = interpolate(frame, [80, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const waves = [0, 1, 2, 3];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '60px' }}>
        <div style={{ ...headline(80, BLACK), transform: `scale(${titleSc})` }}>STRESS = SPEND</div>

        <svg width="520" height="370" viewBox="0 0 520 370">
          {/* Stress ripple circles */}
          {waves.map((i) => {
            const baseR = 72 + i * 26;
            const wOp = interpolate(frame, [i * 18, i * 18 + 50, i * 18 + 100], [0, 0.55 - i * 0.08, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <circle key={i} cx="195" cy="175" r={baseR * waveScale}
                      stroke="#EF4444" strokeWidth="2.5" fill="none"
                      opacity={wOp} strokeDasharray="10,6" />
            );
          })}

          {/* Person head */}
          <circle cx="195" cy="95" r="42" fill={BLACK} />
          {/* Stressed face — frown */}
          <path d="M180,112 Q195,105 210,112" stroke="#EF4444" strokeWidth="3.5" fill="none" />
          <circle cx="185" cy="87" r="5" fill={WHITE} />
          <circle cx="205" cy="87" r="5" fill={WHITE} />
          {/* Sweat drops */}
          <ellipse cx="228" cy="76" rx="5" ry="8" fill="#93C5FD" opacity="0.85" />
          <ellipse cx="240" cy="92" rx="4" ry="7" fill="#93C5FD" opacity="0.65" />
          {/* Body */}
          <rect x="168" y="137" width="54" height="82" rx="10" fill={BLACK} />
          {/* Arms */}
          <line x1="168" y1="157" x2="116" y2="200" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />
          <line x1="222" y1="157" x2="274" y2="205" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />
          {/* Legs */}
          <line x1="184" y1="219" x2="174" y2="295" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />
          <line x1="206" y1="219" x2="216" y2="295" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />

          {/* Credit card at right hand */}
          <g opacity={cardOp} transform={`translate(${cardX}, 0)`}>
            <rect x="268" y="188" width="140" height="88" rx="10" fill={ACCENT} />
            <rect x="268" y="208" width="140" height="22" fill="#C2410C" opacity="0.5" />
            <circle cx="334" cy="250" r="15" fill={WHITE} opacity="0.3" />
            <circle cx="350" cy="250" r="15" fill={WHITE} opacity="0.22" />
            <text x="338" y="204" textAnchor="middle" fontFamily="Arial" fontSize="13" fontWeight="bold" fill={WHITE}>CREDIT</text>
            <text x="298" y="252" fontFamily="Arial" fontSize="11" fill={WHITE} opacity="0.75">●●●● ●●●● 4847</text>
          </g>

          {/* Shopping bag floating in from right */}
          <g opacity={bagOp} transform={`translate(${bagX}, 0)`}>
            <rect x="372" y="75" width="75" height="90" rx="8" fill="#7C3AED" />
            <path d="M387,75 Q387,50 409,50 Q431,50 447,75" stroke="#7C3AED" strokeWidth="7" fill="none" strokeLinecap="round" />
            <line x1="409" y1="95" x2="409" y2="140" stroke={WHITE} strokeWidth="2" strokeDasharray="5,4" opacity="0.6" />
            <line x1="390" y1="118" x2="428" y2="118" stroke={WHITE} strokeWidth="2" opacity="0.5" />
          </g>
        </svg>

        <div style={{ opacity: statOp }}>
          <div style={{ ...headline(42, ACCENT) }}>CORTISOL SPIKES → YOU BUY</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSc = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const trophySc = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 80 } });
  const receiptH = interpolate(frame, [60, 190], [20, 255], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const confOp = interpolate(frame, [20, 60, 160, 200], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarVal = interpolate(frame, [80, 190], [0, 1200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const receiptLineCount = Math.max(0, Math.floor(receiptH / 22));
  const confettiColors = [ACCENT, WHITE, '#EF4444', '#3B82F6', '#10B981', ACCENT, WHITE, '#7C3AED'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '60px' }}>
        <div style={{ ...headline(72, WHITE), transform: `scale(${titleSc})` }}>SELF-GIFTING</div>

        <svg width="520" height="370" viewBox="0 0 520 370">
          {/* Confetti dots */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const cx = 80 + i * 50;
            const cy = 45 + (i % 2) * 38;
            return <circle key={i} cx={cx} cy={cy} r="9" fill={confettiColors[i]} opacity={confOp} />;
          })}

          {/* Person — happy, arms raised */}
          <circle cx="140" cy="125" r="38" fill={WHITE} />
          <path d="M126,140 Q140,155 154,140" stroke={BLACK} strokeWidth="3.5" fill="none" />
          <circle cx="132" cy="116" r="5" fill={BLACK} />
          <circle cx="148" cy="116" r="5" fill={BLACK} />
          <rect x="115" y="163" width="50" height="75" rx="10" fill={WHITE} />
          <line x1="115" y1="180" x2="68" y2="138" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
          <line x1="165" y1="180" x2="212" y2="138" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
          <line x1="130" y1="238" x2="120" y2="308" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
          <line x1="150" y1="238" x2="160" y2="308" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />

          {/* Trophy — springs in around its center point */}
          <g transform={`translate(249, 100) scale(${trophySc}) translate(-249, -100)`}>
            <path d="M248,58 L228,58 L234,138 L264,138 L270,58 Z" fill={ACCENT} />
            <path d="M228,74 Q208,74 208,100 Q208,122 228,122" stroke={ACCENT} strokeWidth="8" fill="none" />
            <path d="M270,74 Q290,74 290,100 Q290,122 270,122" stroke={ACCENT} strokeWidth="8" fill="none" />
            <rect x="236" y="138" width="24" height="16" fill={ACCENT} />
            <rect x="226" y="154" width="44" height="12" rx="4" fill={ACCENT} />
            <text x="249" y="113" textAnchor="middle" fontFamily="Arial" fontSize="26" fill={BLACK}>★</text>
          </g>

          {/* Growing receipt */}
          <rect x="348" y={370 - receiptH} width="88" height={receiptH} rx="4" fill={WHITE} />
          {[...Array(receiptLineCount)].map((_, i) => (
            <line
              key={i}
              x1="358" y1={370 - receiptH + 14 + i * 22}
              x2="428" y2={370 - receiptH + 14 + i * 22}
              stroke="#9CA3AF" strokeWidth="2" opacity="0.55"
            />
          ))}
        </svg>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <div style={{ ...headline(56, ACCENT) }}>${Math.round(dollarVal).toLocaleString()}</div>
          <div style={{ ...headline(32, WHITE) }}>PER MILESTONE</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSc = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cartItems = Math.max(0, Math.floor(interpolate(frame, [60, 200], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const statOp = interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zOp1 = interpolate(frame % 90, [0, 20, 50, 70], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zOp2 = interpolate(frame % 90, [15, 35, 65, 80], [0, 0.6, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zOp3 = interpolate(frame % 90, [30, 50, 80, 90], [0, 0.4, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cartItemCount = Math.max(0, Math.min(cartItems, 5));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '60px' }}>
        <div style={{ ...headline(78, BLACK), transform: `scale(${titleSc})` }}>BOREDOM BUY</div>

        <svg width="540" height="370" viewBox="0 0 540 370">
          {/* Couch */}
          <rect x="55" y="238" width="310" height="82" rx="16" fill="#6B7280" />
          <rect x="55" y="190" width="310" height="58" rx="10" fill="#4B5563" />
          <rect x="35" y="206" width="40" height="116" rx="10" fill="#4B5563" />
          <rect x="345" y="206" width="40" height="116" rx="10" fill="#4B5563" />
          <line x1="215" y1="240" x2="215" y2="318" stroke="#374151" strokeWidth="3" opacity="0.5" />

          {/* Person lounging */}
          <circle cx="170" cy="180" r="36" fill={BLACK} />
          <line x1="158" y1="194" x2="182" y2="194" stroke={WHITE} strokeWidth="3" />
          <circle cx="163" cy="174" r="4" fill={WHITE} />
          <circle cx="177" cy="174" r="4" fill={WHITE} />
          {/* Zzz indicators cycling */}
          <text x="212" y="162" fontFamily="Arial" fontSize="18" fill="#9CA3AF" opacity={zOp1}>z</text>
          <text x="228" y="144" fontFamily="Arial" fontSize="24" fill="#9CA3AF" opacity={zOp2}>z</text>
          <text x="248" y="124" fontFamily="Arial" fontSize="30" fill="#9CA3AF" opacity={zOp3}>z</text>
          {/* Body reclined */}
          <rect x="144" y="216" width="145" height="50" rx="12" fill={BLACK} />
          <line x1="285" y1="232" x2="345" y2="218" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />
          <line x1="285" y1="255" x2="345" y2="252" stroke={BLACK} strokeWidth="18" strokeLinecap="round" />

          {/* Phone */}
          <rect x="342" y="190" width="66" height="110" rx="10" fill="#1F2937" />
          <rect x="348" y="200" width="54" height="90" rx="6" fill="#1E40AF" />
          <rect x="352" y="206" width="46" height="16" rx="3" fill={ACCENT} opacity="0.9" />
          <rect x="352" y="226" width="46" height="16" rx="3" fill="#7C3AED" opacity="0.8" />
          <rect x="352" y="246" width="46" height="16" rx="3" fill={ACCENT} opacity="0.85" />
          <text x="375" y="297" textAnchor="middle" fontFamily="Arial" fontSize="9" fill={WHITE}>CART 🛒</text>

          {/* Shopping cart filling up */}
          <g transform="translate(432, 155)">
            <path d="M-2,32 L8,82 L82,82 L92,32 Z" fill="none" stroke={ACCENT} strokeWidth="4" />
            <path d="M-17,12 L13,12 L-2,32" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="22" cy="90" r="8" fill={ACCENT} />
            <circle cx="72" cy="90" r="8" fill={ACCENT} />
            {[...Array(cartItemCount)].map((_, i) => (
              <rect key={i} x={10 + i * 14} y={56 - i * 3} width="12" height="24" rx="2" fill={WHITE} opacity="0.9" />
            ))}
            <circle cx="88" cy="18" r="14" fill="#EF4444" />
            <text x="88" y="23" textAnchor="middle" fontFamily="Arial Black" fontSize="15" fill={WHITE}>{cartItemCount}</text>
          </g>
        </svg>

        <div style={{ opacity: statOp }}>
          <div style={{ ...headline(42, ACCENT) }}>23% OF ONLINE ORDERS:</div>
          <div style={{ ...headline(42, BLACK) }}>PURE BOREDOM</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSc = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const timerVal = Math.max(1, 7 - Math.max(0, Math.floor(interpolate(frame, [30, 220], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))));
  const timerFontSize = interpolate(frame % 37, [0, 8, 20], [28, 36, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = Math.min(1, spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 20, stiffness: 80 } }));
  const statOp = interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnPulse = interpolate(frame % 50, [0, 15, 30], [1, 1.06, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnW = Math.round(176 * btnPulse);
  const btnX = Math.round(190 - btnW / 2);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '60px' }}>
        <div style={{ ...headline(62, WHITE), transform: `scale(${titleSc})` }}>ENGINEERED URGENCY</div>

        <svg width="380" height="460" viewBox="0 0 380 460">
          {/* Phone shell */}
          <rect x="80" y="10" width="220" height="430" rx="24" fill="#1F2937" />
          <rect x="90" y="20" width="200" height="410" rx="18" fill="#111827" />
          <rect x="155" y="20" width="70" height="14" rx="7" fill="#1F2937" />

          {/* Product image area */}
          <rect x="98" y="40" width="184" height="130" rx="8" fill="#374151" />
          <text x="190" y="96" textAnchor="middle" fontFamily="Arial" fontSize="44">👟</text>
          <text x="190" y="132" textAnchor="middle" fontFamily="Arial" fontSize="12" fill={WHITE}>Premium Runner X</text>

          {/* Pricing */}
          <text x="190" y="200" textAnchor="middle" fontFamily="Arial Black" fontSize="26" fill={WHITE}>$189.99</text>
          <text x="174" y="222" textAnchor="middle" fontFamily="Arial" fontSize="13" fill="#9CA3AF">$299.99</text>
          <line x1="126" y1="218" x2="222" y2="218" stroke="#9CA3AF" strokeWidth="1.5" />
          <text x="230" y="222" textAnchor="middle" fontFamily="Arial" fontSize="13" fill="#10B981">37% OFF</text>

          {/* Only 3 left badge */}
          <rect x="110" y="236" width="160" height="34" rx="17" fill="#EF4444" opacity={badgeOp} />
          <text x="190" y="258" textAnchor="middle" fontFamily="Arial Black" fontSize="15" fill={WHITE} opacity={badgeOp}>⚠ ONLY 3 LEFT!</text>

          {/* Countdown timer */}
          <rect x="102" y="282" width="176" height="52" rx="8" fill="#1E293B" />
          <text x="130" y="313" fontFamily="Arial" fontSize="12" fill="#9CA3AF">OFFER EXPIRES IN</text>
          <text x="255" y="316" textAnchor="middle" fontFamily="Arial Black" fontSize={timerFontSize} fill="#EF4444">{timerVal}s</text>

          {/* Buy now button — pulses */}
          <rect x={btnX} y="346" width={btnW} height="50" rx="12" fill={ACCENT} />
          <text x="190" y="377" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={BLACK}>BUY NOW</text>

          {/* Maybe later */}
          <text x="190" y="415" textAnchor="middle" fontFamily="Arial" fontSize="13" fill="#4B5563">Maybe later...</text>
        </svg>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <div style={{ ...headline(38, ACCENT) }}>$18 BILLION/YEAR</div>
          <div style={{ ...headline(34, WHITE) }}>ENGINEERING YOUR TRIGGERS</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSc = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const piggySc = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 60 } });
  const savedAmt = interpolate(frame, [80, 200], [0, 14000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [165, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [165, 205], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY = interpolate(frame, [80, 140], [0, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp = interpolate(frame, [80, 100, 132, 145], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockAngle = interpolate(frame, [0, 200], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rad = (clockAngle - 90) * (Math.PI / 180);
  const hx = 140 + Math.cos(rad) * 62;
  const hy = 185 + Math.sin(rad) * 62;
  const tickAngles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px' }}>
        <div style={{ ...headline(72, BLACK), transform: `scale(${titleSc})` }}>THE PAUSE RULE</div>

        <svg width="520" height="350" viewBox="0 0 520 350">
          {/* Clock face */}
          <circle cx="140" cy="185" r="95" fill={WHITE} stroke={BLACK} strokeWidth="6" />
          <circle cx="140" cy="185" r="7" fill={BLACK} />
          {/* Tick marks */}
          {tickAngles.map((i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 140 + Math.cos(a) * 80;
            const y1 = 185 + Math.sin(a) * 80;
            const x2 = 140 + Math.cos(a) * 91;
            const y2 = 185 + Math.sin(a) * 91;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLACK} strokeWidth="4" />;
          })}
          {/* Rotating hour hand */}
          <line x1="140" y1="185" x2={hx} y2={hy} stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
          {/* 24 HRS label */}
          <text x="140" y="255" textAnchor="middle" fontFamily="Arial Black" fontSize="15" fill={ACCENT}>24 HRS</text>
          {/* Pause bars overlaid on clock face */}
          <rect x="122" y="148" width="13" height="50" rx="4" fill={ACCENT} />
          <rect x="141" y="148" width="13" height="50" rx="4" fill={ACCENT} />

          {/* Arrow → */}
          <path d="M260,185 L300,185" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
          <path d="M283,170 L302,185 L283,200" stroke={BLACK} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Piggy bank — scales in around (410, 185) */}
          <g transform={`translate(410, 185) scale(${piggySc})`}>
            {/* Body centered at (0, 0) */}
            <ellipse cx="0" cy="0" rx="70" ry="55" fill="#F9A8D4" />
            {/* Head */}
            <circle cx="62" cy="-25" r="28" fill="#F9A8D4" />
            {/* Snout */}
            <ellipse cx="82" cy="-20" rx="13" ry="9" fill="#F472B6" />
            <circle cx="78" cy="-21" r="3" fill="#BE185D" />
            <circle cx="86" cy="-21" r="3" fill="#BE185D" />
            {/* Eye */}
            <circle cx="60" cy="-36" r="5" fill={BLACK} />
            <circle cx="62" cy="-38" r="1.5" fill={WHITE} />
            {/* Ear */}
            <ellipse cx="46" cy="-50" rx="9" ry="7" fill="#F472B6" />
            {/* Coin slot */}
            <rect x="-10" y="-63" width="20" height="7" rx="3.5" fill={BLACK} />
            {/* Falling coin */}
            <circle cx="0" cy={-63 + coinY} r="8" fill={ACCENT} opacity={coinOp} />
            {/* Legs */}
            <rect x="-50" y="42" width="18" height="26" rx="8" fill="#F472B6" />
            <rect x="-23" y="42" width="18" height="26" rx="8" fill="#F472B6" />
            <rect x="4" y="42" width="18" height="26" rx="8" fill="#F472B6" />
            <rect x="31" y="42" width="18" height="26" rx="8" fill="#F472B6" />
            {/* Tail */}
            <path d="M-70,-5 Q-90,-18 -85,8 Q-80,35 -70,25" stroke="#F472B6" strokeWidth="5" fill="none" />
          </g>
        </svg>

        <div style={{ textAlign: 'center' }}>
          <div style={{ ...headline(62, ACCENT) }}>${Math.round(savedAmt).toLocaleString()}</div>
          <div style={{ ...headline(34, BLACK) }}>SAVED PER YEAR</div>
        </div>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, textAlign: 'center' }}>
          <div style={{ ...headline(32, BLACK) }}>FOLLOW FOR MORE MONEY PSYCHOLOGY</div>
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
