import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

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

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barH = interpolate(frame, [10, 85], [0, 580], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counter = interpolate(frame, [10, 85], [0, 1.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const c1y = interpolate(frame, [45, 75], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2y = interpolate(frame, [60, 90], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3y = interpolate(frame, [75, 105], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="160" fontFamily={FONT} fontSize="66" fill={BLACK} textAnchor="middle" fontWeight="bold">STOLEN</text>
        <text x="540" y="242" fontFamily={FONT} fontSize="54" fill={ACCENT} textAnchor="middle">EVERY YEAR</text>

        {/* Chart background */}
        <rect x="200" y="340" width="680" height="700" rx="22" fill="#E8E8E8" />
        {/* Grid lines */}
        <line x1="240" y1="460" x2="840" y2="460" stroke="#CCC" strokeWidth="2" />
        <line x1="240" y1="560" x2="840" y2="560" stroke="#CCC" strokeWidth="2" />
        <line x1="240" y1="660" x2="840" y2="660" stroke="#CCC" strokeWidth="2" />
        <line x1="240" y1="760" x2="840" y2="760" stroke="#CCC" strokeWidth="2" />
        <line x1="240" y1="860" x2="840" y2="860" stroke="#CCC" strokeWidth="2" />

        {/* Growing bar */}
        <rect x="370" y={980 - barH} width="340" height={barH} rx="16" fill={ACCENT} />

        {/* Counter above bar */}
        <text
          x="540"
          y={Math.max(970 - barH, 415)}
          fontFamily={FONT}
          fontSize="74"
          fill={ACCENT}
          textAnchor="middle"
          fontWeight="bold"
        >
          ${counter.toFixed(1)}B
        </text>

        {/* Coins landing */}
        <g transform={`translate(300,${c1y})`}>
          <circle cx="0" cy="1060" r="42" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <text x="0" y="1076" fontFamily={FONT} fontSize="38" fill={WHITE} textAnchor="middle" fontWeight="bold">$</text>
        </g>
        <g transform={`translate(540,${c2y})`}>
          <circle cx="0" cy="1060" r="42" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <text x="0" y="1076" fontFamily={FONT} fontSize="38" fill={WHITE} textAnchor="middle" fontWeight="bold">$</text>
        </g>
        <g transform={`translate(780,${c3y})`}>
          <circle cx="0" cy="1060" r="42" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <text x="0" y="1076" fontFamily={FONT} fontSize="38" fill={WHITE} textAnchor="middle" fontWeight="bold">$</text>
        </g>

        {/* Subtext */}
        <g opacity={textOpacity}>
          <text x="540" y="1195" fontFamily={FONT} fontSize="40" fill={BLACK} textAnchor="middle">in P2P payment scams</text>
          <text x="540" y="1250" fontFamily="Arial, sans-serif" fontSize="34" fill="#555" textAnchor="middle">more than all ATM fraud combined</text>
          <text x="540" y="1360" fontFamily={FONT} fontSize="50" fill={ACCENT} textAnchor="middle" fontWeight="bold">$1,900,000,000</text>
          <text x="540" y="1415" fontFamily={FONT} fontSize="34" fill={BLACK} textAnchor="middle">gone. legally.</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftScale = spring({ frame, fps: 30, config: { damping: 22 }, delay: 8 });
  const rightScale = spring({ frame, fps: 30, config: { damping: 22 }, delay: 42 });
  const flashOpacity = interpolate(frame, [110, 125, 140, 155, 170, 185], [0, 1, 0.3, 1, 0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="180" fontFamily={FONT} fontSize="58" fill={WHITE} textAnchor="middle">THE LEGAL</text>
        <text x="540" y="262" fontFamily={FONT} fontSize="60" fill={ACCENT} textAnchor="middle" fontWeight="bold">LOOPHOLE</text>

        {/* Left column: Credit Card */}
        <g transform={`translate(270,960) scale(${leftScale})`}>
          <rect x="-190" y="-290" width="380" height="250" rx="22" fill="#10B981" stroke="#059669" strokeWidth="4" />
          <rect x="-130" y="-248" width="75" height="58" rx="9" fill="#059669" />
          <circle cx="-100" cy="-140" r="9" fill="white" opacity="0.7" />
          <circle cx="-75" cy="-140" r="9" fill="white" opacity="0.7" />
          <circle cx="-50" cy="-140" r="9" fill="white" opacity="0.7" />
          <circle cx="-25" cy="-140" r="9" fill="white" opacity="0.7" />
          <circle cx="120" cy="-200" r="33" fill="#CC2222" opacity="0.85" />
          <circle cx="148" cy="-200" r="33" fill="#FF6600" opacity="0.85" />
          {/* Protected badge */}
          <rect x="-150" y="-42" width="300" height="58" rx="29" fill="#059669" />
          <text x="0" y="-3" fontFamily={FONT} fontSize="26" fill={WHITE} textAnchor="middle">✓ PROTECTED</text>
          <text x="0" y="80" fontFamily={FONT} fontSize="38" fill="#10B981" textAnchor="middle">CREDIT CARD</text>
          <text x="0" y="124" fontFamily={FONT} fontSize="30" fill={WHITE} textAnchor="middle">60-day dispute</text>
          <text x="0" y="162" fontFamily="Arial, sans-serif" fontSize="26" fill="#AAA" textAnchor="middle">Federal Law (Reg E)</text>
        </g>

        {/* VS */}
        <text x="540" y="970" fontFamily={FONT} fontSize="58" fill="#555" textAnchor="middle" fontWeight="bold">VS</text>

        {/* Right column: Zelle phone */}
        <g transform={`translate(810,960) scale(${rightScale})`}>
          <rect x="-135" y="-270" width="270" height="470" rx="28" fill="#2A0A40" stroke="#5B21B6" strokeWidth="3" />
          <rect x="-112" y="-242" width="224" height="400" rx="16" fill="#6B21B0" />
          <text x="0" y="-60" fontFamily={FONT} fontSize="148" fill="white" textAnchor="middle" fontWeight="bold">Z</text>
          {/* X mark */}
          <circle cx="0" cy="90" r="54" fill={ACCENT} />
          <line x1="-28" y1="64" x2="28" y2="116" stroke="white" strokeWidth="11" strokeLinecap="round" />
          <line x1="28" y1="64" x2="-28" y2="116" stroke="white" strokeWidth="11" strokeLinecap="round" />
          <text x="0" y="200" fontFamily={FONT} fontSize="38" fill={ACCENT} textAnchor="middle">ZELLE</text>
          <text x="0" y="242" fontFamily={FONT} fontSize="30" fill={WHITE} textAnchor="middle">ZERO days</text>
          <text x="0" y="280" fontFamily="Arial, sans-serif" fontSize="26" fill="#999" textAnchor="middle">No protection</text>
        </g>

        {/* "AUTHORIZED" explanation flash */}
        <g opacity={flashOpacity}>
          <rect x="175" y="1365" width="730" height="150" rx="22" fill={ACCENT} opacity="0.18" />
          <text x="540" y="1416" fontFamily={FONT} fontSize="46" fill={ACCENT} textAnchor="middle" fontWeight="bold">"AUTHORIZED"</text>
          <text x="540" y="1465" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">YOU sent it = banks owe $0</text>
          <text x="540" y="1502" fontFamily="Arial, sans-serif" fontSize="26" fill="#888" textAnchor="middle">that's the loophole</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneScale = spring({ frame, fps: 30, config: { damping: 24 }, delay: 5 });
  const msg1 = interpolate(frame, [22, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg2 = interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg3 = interpolate(frame, [88, 103], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg4 = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnPulse = interpolate(frame, [155, 170, 185, 200], [1, 1.14, 1, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="160" fontFamily={FONT} fontSize="56" fill={BLACK} textAnchor="middle">THE MOST</text>
        <text x="540" y="242" fontFamily={FONT} fontSize="58" fill={ACCENT} textAnchor="middle" fontWeight="bold">COMMON TRAP</text>

        {/* Phone mockup */}
        <g transform={`translate(540,810) scale(${phoneScale}) translate(-540,-810)`}>
          <rect x="272" y="310" width="536" height="990" rx="48" fill="#1E1E1E" stroke="#333" strokeWidth="4" />
          <rect x="294" y="352" width="492" height="906" rx="32" fill="#F0F0F0" />
          {/* Status bar area */}
          <rect x="294" y="352" width="492" height="56" rx="0" fill="#E0E0E0" />
          <rect x="294" y="352" width="492" height="28" rx="0" fill="#E0E0E0" />
          {/* Notch */}
          <rect x="420" y="356" width="240" height="28" rx="14" fill="#1E1E1E" />
          {/* Header */}
          <rect x="294" y="408" width="492" height="72" fill="#E5E5E5" />
          <text x="540" y="444" fontFamily={FONT} fontSize="24" fill="#333" textAnchor="middle">From: Your Bank Security</text>
          <text x="540" y="472" fontFamily="Arial, sans-serif" fontSize="20" fill="#888" textAnchor="middle">+1 (888) 555-0147</text>

          {/* Message 1 */}
          <g opacity={msg1}>
            <rect x="306" y="498" width="380" height="82" rx="16" fill="#E5E5E5" />
            <text x="322" y="534" fontFamily="Arial, sans-serif" fontSize="22" fill="#333">ALERT: Suspicious login</text>
            <text x="322" y="566" fontFamily="Arial, sans-serif" fontSize="22" fill="#333">detected on your account</text>
          </g>
          {/* Message 2 */}
          <g opacity={msg2}>
            <rect x="306" y="598" width="380" height="82" rx="16" fill="#E5E5E5" />
            <text x="322" y="634" fontFamily="Arial, sans-serif" fontSize="22" fill="#333">Please call us immediately</text>
            <text x="322" y="666" fontFamily="Arial, sans-serif" fontSize="22" fill="#333">to secure your funds</text>
          </g>
          {/* Message 3 — scam instruction */}
          <g opacity={msg3}>
            <rect x="306" y="698" width="390" height="100" rx="16" fill="#FEE2E2" stroke={ACCENT} strokeWidth="2" />
            <text x="322" y="734" fontFamily="Arial, sans-serif" fontSize="21" fill="#333">Transfer $3,247 via Zelle</text>
            <text x="322" y="762" fontFamily="Arial, sans-serif" fontSize="21" fill="#333">to our secure holding</text>
            <text x="322" y="790" fontFamily="Arial, sans-serif" fontSize="21" fill={ACCENT} fontWeight="bold">account right now</text>
          </g>
          {/* Message 4 — result */}
          <g opacity={msg4}>
            <rect x="306" y="816" width="380" height="82" rx="16" fill={ACCENT} />
            <text x="322" y="852" fontFamily="Arial, sans-serif" fontSize="22" fill={WHITE} fontWeight="bold">Your money is gone.</text>
            <text x="322" y="884" fontFamily="Arial, sans-serif" fontSize="22" fill={WHITE}>No refund. It's legal.</text>
          </g>

          {/* Home indicator */}
          <rect x="462" y="1230" width="156" height="7" rx="3" fill="#555" />
        </g>

        {/* Warning triangle */}
        <g transform={`translate(540,1585) scale(${warnPulse}) translate(-540,-1585)`}>
          <polygon points="540,1515 442,1665 638,1665" fill={ACCENT} opacity="0.22" />
          <text x="540" y="1648" fontFamily={FONT} fontSize="62" fill={ACCENT} textAnchor="middle">!</text>
        </g>
        <text x="540" y="1718" fontFamily={FONT} fontSize="36" fill={BLACK} textAnchor="middle">social engineering. banks don't have to care.</text>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const colScale = spring({ frame, fps: 30, config: { damping: 18 }, delay: 8 });
  const st1 = interpolate(frame, [55, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const st2 = interpolate(frame, [80, 97], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const st3 = interpolate(frame, [105, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="165" fontFamily={FONT} fontSize="52" fill={WHITE} textAnchor="middle">WHY SCAMMERS</text>
        <text x="540" y="248" fontFamily={FONT} fontSize="58" fill={ACCENT} textAnchor="middle" fontWeight="bold">LOVE ZELLE</text>

        {/* Left: Credit Card */}
        <g transform={`translate(270,900) scale(${colScale})`}>
          <rect x="-210" y="-395" width="420" height="275" rx="26" fill="#10B981" stroke="#059669" strokeWidth="4" />
          <rect x="-152" y="-355" width="82" height="62" rx="10" fill="#059669" />
          <text x="0" y="-248" fontFamily={FONT} fontSize="26" fill="white" textAnchor="middle" opacity="0.8">•••• •••• •••• 4242</text>
          <circle cx="112" cy="-298" r="34" fill="#CC2222" opacity="0.85" />
          <circle cx="142" cy="-298" r="34" fill="#FF6600" opacity="0.85" />
          {/* Green check circle */}
          <circle cx="0" cy="-68" r="56" fill="#10B981" />
          <polyline points="-26,-68 -6,-44 34,-92" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="52" fontFamily={FONT} fontSize="40" fill="#10B981" textAnchor="middle">CREDIT CARD</text>
          <text x="0" y="96" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">60-day dispute</text>
          <text x="0" y="136" fontFamily="Arial, sans-serif" fontSize="26" fill="#10B981" textAnchor="middle">Federal law protects you</text>
        </g>

        {/* VS */}
        <text x="540" y="935" fontFamily={FONT} fontSize="62" fill="#444" textAnchor="middle" fontWeight="bold">VS</text>

        {/* Right: Zelle */}
        <g transform={`translate(810,900) scale(${colScale})`}>
          <rect x="-142" y="-385" width="284" height="530" rx="30" fill="#2A0A40" stroke="#5B21B6" strokeWidth="3" />
          <rect x="-118" y="-356" width="236" height="454" rx="18" fill="#6B21B0" />
          <text x="0" y="-128" fontFamily={FONT} fontSize="150" fill="white" textAnchor="middle" fontWeight="bold">Z</text>
          <circle cx="0" cy="64" r="54" fill={ACCENT} />
          <line x1="-28" y1="38" x2="28" y2="90" stroke="white" strokeWidth="11" strokeLinecap="round" />
          <line x1="28" y1="38" x2="-28" y2="90" stroke="white" strokeWidth="11" strokeLinecap="round" />
          <text x="0" y="175" fontFamily={FONT} fontSize="40" fill={ACCENT} textAnchor="middle">ZELLE</text>
          <text x="0" y="218" fontFamily={FONT} fontSize="32" fill={WHITE} textAnchor="middle">ZERO days</text>
          <text x="0" y="258" fontFamily="Arial, sans-serif" fontSize="26" fill="#999" textAnchor="middle">No legal protection</text>
        </g>

        {/* Stats */}
        <g opacity={st1}>
          <rect x="130" y="1300" width="820" height="76" rx="20" fill="#1A1A1A" stroke="#333" strokeWidth="2" />
          <text x="540" y="1348" fontFamily="Arial, sans-serif" fontSize="32" fill={WHITE} textAnchor="middle">Scammers request Zelle 87% of the time</text>
        </g>
        <g opacity={st2}>
          <rect x="130" y="1395" width="820" height="76" rx="20" fill="#1A1A1A" stroke="#333" strokeWidth="2" />
          <text x="540" y="1443" fontFamily="Arial, sans-serif" fontSize="32" fill={WHITE} textAnchor="middle">Zelle fraud recovery rate: under 3%</text>
        </g>
        <g opacity={st3}>
          <rect x="130" y="1490" width="820" height="76" rx="20" fill={ACCENT} opacity="0.18" />
          <text x="540" y="1538" fontFamily={FONT} fontSize="34" fill={ACCENT} textAnchor="middle">Credit card fraud: 98% recovery rate</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const shieldScale = spring({ frame, fps: 30, config: { damping: 20 }, delay: 5 });
  const r1 = interpolate(frame, [32, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r2 = interpolate(frame, [68, 86], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r3 = interpolate(frame, [104, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [148, 185], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [148, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="158" fontFamily={FONT} fontSize="62" fill={BLACK} textAnchor="middle">PROTECT</text>
        <text x="540" y="240" fontFamily={FONT} fontSize="64" fill={ACCENT} textAnchor="middle" fontWeight="bold">YOURSELF</text>

        {/* Shield */}
        <g transform={`translate(540,528) scale(${shieldScale})`}>
          <path
            d="M 0 -210 L 180 -132 L 180 18 Q 180 172 0 230 Q -180 172 -180 18 L -180 -132 Z"
            fill="#10B981"
            stroke="#059669"
            strokeWidth="6"
          />
          <path
            d="M 0 -168 L 140 -106 L 140 14 Q 140 138 0 184 Q -140 138 -140 14 L -140 -106 Z"
            fill="#059669"
            opacity="0.4"
          />
          <polyline
            points="-64,22 -18,78 84,-46"
            fill="none"
            stroke="white"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Rule cards */}
        <g opacity={r1}>
          <rect x="96" y="786" width="888" height="112" rx="22" fill="#E8F5E9" stroke="#10B981" strokeWidth="3" />
          <text x="540" y="834" fontFamily={FONT} fontSize="34" fill={BLACK} textAnchor="middle">RULE 1</text>
          <text x="540" y="878" fontFamily="Arial, sans-serif" fontSize="29" fill="#333" textAnchor="middle">Never Zelle someone you haven't met in person</text>
        </g>
        <g opacity={r2}>
          <rect x="96" y="922" width="888" height="112" rx="22" fill="#E8F5E9" stroke="#10B981" strokeWidth="3" />
          <text x="540" y="970" fontFamily={FONT} fontSize="34" fill={BLACK} textAnchor="middle">RULE 2</text>
          <text x="540" y="1014" fontFamily="Arial, sans-serif" fontSize="29" fill="#333" textAnchor="middle">Your real bank will NEVER ask for Zelle</text>
        </g>
        <g opacity={r3}>
          <rect x="96" y="1058" width="888" height="112" rx="22" fill="#E8F5E9" stroke="#10B981" strokeWidth="3" />
          <text x="540" y="1106" fontFamily={FONT} fontSize="34" fill={BLACK} textAnchor="middle">RULE 3</text>
          <text x="540" y="1150" fontFamily="Arial, sans-serif" fontSize="29" fill="#333" textAnchor="middle">Got scammed? File with CFPB immediately</text>
        </g>

        {/* Tip banner */}
        <rect x="96" y="1200" width="888" height="76" rx="20" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <text x="540" y="1250" fontFamily="Arial, sans-serif" fontSize="30" fill="#92400E" textAnchor="middle">Use a credit card for any risky purchase</text>

        {/* CTA */}
        <g transform={`translate(0,${ctaY})`} opacity={ctaOpacity}>
          <rect x="192" y="1398" width="696" height="102" rx="51" fill={BLACK} />
          <text x="540" y="1456" fontFamily={FONT} fontSize="36" fill={WHITE} textAnchor="middle">FOLLOW FOR DAILY</text>
          <text x="540" y="1498" fontFamily={FONT} fontSize="32" fill={ACCENT} textAnchor="middle">MONEY TRAPS ↑</text>
        </g>

        <text x="540" y="1680" fontFamily="Arial, sans-serif" fontSize="32" fill="#AAA" textAnchor="middle">new trap every day</text>
      </svg>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const phoneY = interpolate(frame, [0, 25], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const handX = interpolate(frame, [35, 65], [420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const alertFlash = interpolate(frame, [100, 115, 130, 145], [0, 1, 0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <text x="540" y="200" fontFamily={FONT} fontSize="68" fill={ACCENT} textAnchor="middle" fontWeight="bold" letterSpacing="4">ZELLE TRAP</text>
        <text x="540" y="285" fontFamily={FONT} fontSize="46" fill={WHITE} textAnchor="middle" letterSpacing="2">YOUR BANK OWES YOU NOTHING</text>

        {/* Phone body */}
        <g transform={`translate(0,${phoneY})`}>
          <rect x="340" y="390" width="400" height="780" rx="42" fill="#1E1E2E" stroke="#444" strokeWidth="4" />
          <rect x="362" y="432" width="356" height="694" rx="18" fill="#0D0D1A" />
          <rect x="460" y="440" width="160" height="28" rx="14" fill="#111" />
          {/* Zelle purple screen */}
          <rect x="380" y="478" width="320" height="610" rx="12" fill="#6B21B0" />
          {/* Big Z */}
          <text x="540" y="670" fontFamily={FONT} fontSize="190" fill="white" textAnchor="middle" fontWeight="bold">Z</text>
          {/* Balance */}
          <text x="540" y="762" fontFamily={FONT} fontSize="50" fill="white" textAnchor="middle">$3,247.00</text>
          {/* Send button */}
          <rect x="418" y="800" width="244" height="60" rx="30" fill="white" />
          <text x="540" y="840" fontFamily={FONT} fontSize="27" fill="#6B21B0" textAnchor="middle">SEND MONEY</text>
          {/* Home bar */}
          <rect x="475" y="1135" width="130" height="7" rx="3" fill="#555" />
        </g>

        {/* Thief hand + money bag sliding in from right */}
        <g transform={`translate(${handX},0)`} opacity={frame >= 35 ? 1 : 0}>
          {/* Arm */}
          <rect x="780" y="660" width="320" height="75" rx="38" fill="#C4956A" transform="rotate(-18,940,697)" />
          {/* Fist */}
          <ellipse cx="778" cy="688" rx="58" ry="50" fill="#C4956A" />
          {/* Fingers */}
          <rect x="730" y="628" width="28" height="68" rx="14" fill="#C4956A" />
          <rect x="763" y="622" width="28" height="74" rx="14" fill="#C4956A" />
          <rect x="796" y="625" width="28" height="71" rx="14" fill="#C4956A" />
          <rect x="828" y="632" width="26" height="64" rx="13" fill="#C4956A" />
          {/* Money bag */}
          <ellipse cx="720" cy="692" rx="54" ry="50" fill="#F59E0B" />
          <rect x="706" y="633" width="28" height="32" fill="#F59E0B" />
          <circle cx="720" cy="640" r="14" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
          <text x="720" y="710" fontFamily={FONT} fontSize="44" fill="#7C3500" textAnchor="middle" fontWeight="bold">$</text>
        </g>

        {/* Warning banner */}
        <g opacity={warnOpacity}>
          <rect x="140" y="1230" width="800" height="128" rx="22" fill={ACCENT} opacity="0.18" />
          <text x="540" y="1285" fontFamily={FONT} fontSize="46" fill={ACCENT} textAnchor="middle" fontWeight="bold">NO PROTECTION</text>
          <text x="540" y="1338" fontFamily={FONT} fontSize="36" fill={WHITE} textAnchor="middle">IF YOU GET SCAMMED</text>
        </g>

        {/* Flashing alert badge */}
        <g opacity={alertFlash}>
          <rect x="370" y="1390" width="340" height="72" rx="36" fill={ACCENT} />
          <text x="540" y="1438" fontFamily={FONT} fontSize="36" fill={WHITE} textAnchor="middle" fontWeight="bold">⚠ ALERT</text>
        </g>
      </svg>
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
