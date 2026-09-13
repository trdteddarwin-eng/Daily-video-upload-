import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GOLD = '#F59E0B';
const GREEN_C = '#10B981';
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

  const phoneSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [300, 0]);

  const coin1Op = interpolate(frame, [30, 50, 160, 180], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [45, 65, 160, 180], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Op = interpolate(frame, [55, 75, 160, 180], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Drop = interpolate(frame, [30, 55], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Drop = interpolate(frame, [45, 70], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Drop = interpolate(frame, [55, 80], [0, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const textOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textSlide = interpolate(frame, [85, 110], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Coins */}
      <div style={{ position: 'absolute', left: 160, top: 820 + coin1Drop, opacity: coin1Op }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="29" fill={GOLD} stroke="#D97706" strokeWidth="3" />
          <text x="32" y="40" textAnchor="middle" fill={WHITE} fontSize="26" fontFamily="Arial" fontWeight="bold">¢</text>
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 840, top: 800 + coin2Drop, opacity: coin2Op }}>
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="25" fill={GOLD} stroke="#D97706" strokeWidth="3" />
          <text x="28" y="36" textAnchor="middle" fill={WHITE} fontSize="22" fontFamily="Arial" fontWeight="bold">¢</text>
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 520, top: 740 + coin3Drop, opacity: coin3Op }}>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" fill={GOLD} stroke="#D97706" strokeWidth="3" />
          <text x="24" y="31" textAnchor="middle" fill={WHITE} fontSize="18" fontFamily="Arial" fontWeight="bold">¢</text>
        </svg>
      </div>

      {/* Phone */}
      <div style={{ position: 'absolute', top: 400, left: '50%', transform: `translateX(-50%) translateY(${phoneY}px)` }}>
        <svg width="260" height="460" viewBox="0 0 260 460">
          <rect x="8" y="8" width="244" height="444" rx="36" ry="36" fill="#1E1E1E" stroke={ACCENT} strokeWidth="4" />
          <rect x="22" y="60" width="216" height="330" rx="12" ry="12" fill="#0D0D0D" />
          <rect x="90" y="155" width="80" height="80" rx="18" ry="18" fill={ACCENT} />
          <line x1="130" y1="220" x2="130" y2="178" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
          <polyline points="116,193 130,178 144,193" fill="none" stroke={WHITE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="130" y="275" textAnchor="middle" fill="#888" fontSize="18" fontFamily="Arial">ROUND UP</text>
          <rect x="100" y="452" width="60" height="5" rx="2.5" fill="#444" />
        </svg>
      </div>

      {/* Title */}
      <div style={{ position: 'absolute', bottom: 180, left: 0, right: 0, opacity: textOp, transform: `translateY(${textSlide}px)`, padding: '0 60px' }}>
        <p style={headline(84, WHITE)}>ROUND-UP</p>
        <p style={headline(84, ACCENT)}>TRAP</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#AAAAAA', textAlign: 'center' as const, marginTop: 18, letterSpacing: '0.05em', margin: '18px 0 0 0' }}>
          Paying the app more than you save
        </p>
      </div>
    </FadeScene>
  );
};
// [END-A]

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const feeSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const feeScale = interpolate(feeSpring, [0, 1], [0.3, 1]);

  const calOp = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, transform: `scale(${feeScale})` }}>
        <p style={headline(130, ACCENT)}>$3/MO</p>
        <p style={{ fontFamily: FONT, fontSize: 36, color: '#555', textAlign: 'center' as const, margin: 0, letterSpacing: '0.1em' }}>
          THE APP FEE
        </p>
      </div>

      <div style={{ position: 'absolute', top: 540, left: '50%', transform: 'translateX(-50%)', opacity: calOp }}>
        <svg width="500" height="210" viewBox="0 0 500 210">
          {months.map((m, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = col * 125 + 8;
            const y = row * 66 + 8;
            return (
              <g key={m}>
                <rect x={x} y={y} width="108" height="54" rx="8" ry="8" fill={ACCENT} opacity="0.12" />
                <rect x={x} y={y} width="108" height="54" rx="8" ry="8" fill="none" stroke={ACCENT} strokeWidth="2" />
                <text x={x + 54} y={y + 30} textAnchor="middle" fill={BLACK} fontSize="16" fontFamily="Arial" fontWeight="bold">{m}</text>
                <text x={x + 54} y={y + 47} textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="Arial" fontWeight="bold">$3</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 800, left: 0, right: 0, opacity: totalOp }}>
        <p style={headline(110, BLACK)}>= $36/YEAR</p>
      </div>

      <div style={{ position: 'absolute', top: 960, left: 0, right: 0, opacity: vsOp }}>
        <p style={{ fontFamily: FONT, fontSize: 38, color: '#777', textAlign: 'center' as const, margin: 0 }}>
          VS. ~$30–40 ACTUALLY SAVED
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tiltSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 18, stiffness: 60 } });
  const tiltAngle = interpolate(tiltSpring, [0, 1], [0, -16]);

  const labelOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ratioOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ratioSlide = interpolate(frame, [130, 155], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 260, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="640" height="500" viewBox="0 0 640 500">
          {/* Pillar */}
          <rect x="305" y="380" width="30" height="90" rx="4" fill="#555" />
          <rect x="230" y="462" width="180" height="22" rx="6" fill="#444" />
          {/* Rotating beam group */}
          <g transform={`rotate(${tiltAngle}, 320, 210)`}>
            <rect x="80" y="205" width="480" height="10" rx="5" fill="#888" />
            <circle cx="320" cy="210" r="16" fill="#666" />
            {/* Left chain (fees side) */}
            <line x1="130" y1="210" x2="130" y2="310" stroke="#888" strokeWidth="3" strokeDasharray="8,4" />
            {/* Right chain (savings side) */}
            <line x1="510" y1="210" x2="510" y2="290" stroke="#888" strokeWidth="3" strokeDasharray="8,4" />
            {/* Left pan */}
            <ellipse cx="130" cy="322" rx="76" ry="20" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            <text x="130" y="316" textAnchor="middle" fill={ACCENT} fontSize="28" fontFamily="Arial" fontWeight="bold">$36</text>
            {/* Right pan */}
            <ellipse cx="510" cy="302" rx="76" ry="20" fill="#2A2A2A" stroke={GREEN_C} strokeWidth="3" />
            <text x="510" y="296" textAnchor="middle" fill={GREEN_C} fontSize="28" fontFamily="Arial" fontWeight="bold">$35</text>
          </g>
          {/* Support line */}
          <line x1="320" y1="210" x2="320" y2="382" stroke="#555" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 800, left: 60, opacity: labelOp, textAlign: 'center' as const, width: 320 }}>
        <p style={{ fontFamily: FONT, fontSize: 54, color: ACCENT, margin: 0 }}>FEES</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#AAAAAA', margin: 0 }}>$36/year</p>
      </div>
      <div style={{ position: 'absolute', top: 800, right: 60, opacity: labelOp, textAlign: 'center' as const, width: 320 }}>
        <p style={{ fontFamily: FONT, fontSize: 54, color: GREEN_C, margin: 0 }}>SAVED</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#AAAAAA', margin: 0 }}>~$30–40/yr</p>
      </div>

      <div style={{ position: 'absolute', bottom: 180, left: 0, right: 0, opacity: ratioOp, transform: `translateY(${ratioSlide}px)` }}>
        <p style={headline(72, WHITE)}>100% FEE RATIO</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, textAlign: 'center' as const, marginTop: 12 }}>
          Paying the app more than you save
        </p>
      </div>
    </FadeScene>
  );
};
// [END-B]

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const bar2Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 80 } });

  const bar1H = interpolate(bar1Spring, [0, 1], [0, 185]);
  const bar2H = interpolate(bar2Spring, [0, 1], [0, 335]);

  const feeLineOp = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const valOp = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noteOp = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartBottom = 380;
  const feeLineY = chartBottom - 200;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, left: 0, right: 0 }}>
        <p style={headline(54, BLACK)}>WHO DOES IT</p>
        <p style={headline(54, ACCENT)}>ACTUALLY HELP?</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="580" height="440" viewBox="0 0 580 440">
          <line x1="80" y1="20" x2="80" y2={chartBottom} stroke="#CCC" strokeWidth="2" />
          <line x1="80" y1={chartBottom} x2="540" y2={chartBottom} stroke="#CCC" strokeWidth="2" />

          <rect x="120" y={chartBottom - bar1H} width="150" height={bar1H} rx="8" ry="8" fill={ACCENT} opacity="0.85" />
          <rect x="330" y={chartBottom - bar2H} width="150" height={bar2H} rx="8" ry="8" fill={GREEN_C} opacity="0.85" />

          <line x1="80" y1={feeLineY} x2="540" y2={feeLineY} stroke={ACCENT} strokeWidth="3" strokeDasharray="12,6" opacity={feeLineOp} />
          <text x="548" y={feeLineY + 6} fill={ACCENT} fontSize="15" fontFamily="Arial" fontWeight="bold" opacity={feeLineOp}>$36</text>

          <text x="195" y={chartBottom + 26} textAnchor="middle" fill={BLACK} fontSize="18" fontFamily="Arial" fontWeight="bold">LIGHT</text>
          <text x="405" y={chartBottom + 26} textAnchor="middle" fill={BLACK} fontSize="18" fontFamily="Arial" fontWeight="bold">HEAVY</text>
          <text x="195" y={chartBottom + 46} textAnchor="middle" fill="#666" fontSize="15" fontFamily="Arial">SPENDER</text>
          <text x="405" y={chartBottom + 46} textAnchor="middle" fill="#666" fontSize="15" fontFamily="Arial">SPENDER</text>

          <text x="195" y={chartBottom - bar1H - 12} textAnchor="middle" fill={ACCENT} fontSize="22" fontFamily="Arial" fontWeight="bold" opacity={valOp}>~$35</text>
          <text x="405" y={chartBottom - bar2H - 12} textAnchor="middle" fill={GREEN_C} fontSize="22" fontFamily="Arial" fontWeight="bold" opacity={valOp}>~$120</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 180, left: 60, right: 60, opacity: noteOp }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, textAlign: 'center' as const, margin: 0 }}>
          2/3 of users are light spenders
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#666', textAlign: 'center' as const, marginTop: 12 }}>
          paying more in fees than they ever save
        </p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const leftScale = interpolate(leftSpring, [0, 1], [0, 0.65]);
  const rightSpring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 12, stiffness: 70 } });
  const rightScale = interpolate(rightSpring, [0, 1], [0, 1.2]);
  const labelOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numOp = interpolate(frame, [125, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, opacity: titleOp }}>
        <p style={headline(56, WHITE)}>30 YEARS LATER...</p>
      </div>

      {/* Left: with app */}
      <div style={{ position: 'absolute', top: 360, left: 60, width: 430 }}>
        <div style={{ display: 'flex', justifyContent: 'center' as const, transform: `scale(${leftScale})`, transformOrigin: 'center top' }}>
          <svg width="190" height="190" viewBox="0 0 190 190">
            <ellipse cx="95" cy="112" rx="72" ry="60" fill="#F9A8D4" />
            <circle cx="148" cy="84" r="40" fill="#F9A8D4" />
            <ellipse cx="141" cy="50" rx="14" ry="10" fill="#F472B6" transform="rotate(-20 141 50)" />
            <circle cx="162" cy="74" r="5" fill={BLACK} />
            <ellipse cx="176" cy="88" rx="13" ry="10" fill="#F472B6" />
            <circle cx="173" cy="87" r="3" fill="#C084FC" />
            <circle cx="179" cy="87" r="3" fill="#C084FC" />
            <rect x="45" y="155" width="22" height="28" rx="8" fill="#F9A8D4" />
            <rect x="74" y="157" width="22" height="26" rx="8" fill="#F9A8D4" />
            <rect x="103" y="157" width="22" height="26" rx="8" fill="#F9A8D4" />
            <rect x="132" y="155" width="22" height="28" rx="8" fill="#F9A8D4" />
            <rect x="78" y="54" width="30" height="6" rx="3" fill="#E879A0" />
            <path d="M24 112 Q10 96 20 82 Q30 68 22 55" fill="none" stroke="#F9A8D4" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ opacity: labelOp, textAlign: 'center' as const, marginTop: 14 }}>
          <p style={headline(38, ACCENT)}>WITH APP</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#AAAAAA', margin: 0 }}>Fees ate your gains</p>
        </div>
        <div style={{ opacity: numOp, textAlign: 'center' as const, marginTop: 10 }}>
          <p style={headline(56, ACCENT)}>≈ $0</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: 0 }}>net after fees</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 360, left: 516, width: 4, height: 1000, background: '#2E2E2E' }} />

      {/* Right: direct invest */}
      <div style={{ position: 'absolute', top: 360, right: 60, width: 430 }}>
        <div style={{ display: 'flex', justifyContent: 'center' as const, transform: `scale(${rightScale})`, transformOrigin: 'center top' }}>
          <svg width="210" height="210" viewBox="0 0 210 210">
            <ellipse cx="105" cy="122" rx="80" ry="68" fill="#86EFAC" />
            <circle cx="162" cy="94" r="44" fill="#86EFAC" />
            <ellipse cx="155" cy="56" rx="16" ry="12" fill="#4ADE80" transform="rotate(-20 155 56)" />
            <circle cx="178" cy="83" r="6" fill={BLACK} />
            <ellipse cx="193" cy="99" rx="15" ry="11" fill="#4ADE80" />
            <circle cx="190" cy="98" r="3.5" fill="#16A34A" />
            <circle cx="196" cy="98" r="3.5" fill="#16A34A" />
            <rect x="48" y="170" width="26" height="32" rx="10" fill="#86EFAC" />
            <rect x="82" y="172" width="26" height="30" rx="10" fill="#86EFAC" />
            <rect x="114" y="172" width="26" height="30" rx="10" fill="#86EFAC" />
            <rect x="146" y="170" width="26" height="32" rx="10" fill="#86EFAC" />
            <rect x="88" y="60" width="34" height="7" rx="3.5" fill="#22C55E" />
            <path d="M26 122 Q10 104 22 88 Q34 72 24 56" fill="none" stroke="#86EFAC" strokeWidth="6" strokeLinecap="round" />
            <text x="105" y="132" textAnchor="middle" fill={BLACK} fontSize="38" fontFamily="Arial" fontWeight="bold">$</text>
          </svg>
        </div>
        <div style={{ opacity: labelOp, textAlign: 'center' as const, marginTop: 14 }}>
          <p style={headline(38, GREEN_C)}>DIRECT INVEST</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#AAAAAA', margin: 0 }}>Zero fees, full growth</p>
        </div>
        <div style={{ opacity: numOp, textAlign: 'center' as const, marginTop: 10 }}>
          <p style={headline(56, GREEN_C)}>$4,400</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888', margin: 0 }}>$36/yr × 30 yrs @ 8%</p>
        </div>
      </div>
    </FadeScene>
  );
};
// [END-C]

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const titleScale = interpolate(titleSpring, [0, 1], [0.4, 1]);

  const logoOp = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSpring = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 12, stiffness: 100 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [60, 0]);

  const brokerages = ['FIDELITY', 'SCHWAB', 'VANGUARD'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 180, left: 0, right: 0, transform: `scale(${titleScale})` }}>
        <p style={headline(150, GREEN_C)}>$0</p>
        <p style={headline(80, BLACK)}>IN FEES</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#666', textAlign: 'center' as const, marginTop: 12 }}>
          Every major brokerage charges nothing to auto-invest
        </p>
      </div>

      <div style={{ position: 'absolute', top: 700, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 36, opacity: logoOp }}>
        {brokerages.map((name) => (
          <div key={name} style={{ textAlign: 'center' as const }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="65" fill={BLACK} />
              <text x="70" y="65" textAnchor="middle" fill={WHITE} fontSize="17" fontFamily="Arial" fontWeight="bold">{name}</text>
              <text x="70" y="85" textAnchor="middle" fill={GREEN_C} fontSize="22" fontFamily="Arial" fontWeight="bold">FREE</text>
            </svg>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 180, left: 60, right: 60, opacity: ctaSpring, transform: `translateY(${ctaY}px)` }}>
        <div style={{ background: GREEN_C, borderRadius: 20, padding: '34px 44px', textAlign: 'center' as const }}>
          <p style={headline(50, WHITE)}>DITCH THE MIDDLEMAN</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '16px 0 0 0', letterSpacing: '0.04em' }}>
            Auto-invest free → keep 100% of your gains
          </p>
        </div>
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
