import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const AMBER = '#F59E0B';
const GREEN = '#10B981';
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

// ─── SCENE 1 ─────────────────────────────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = interpolate(frame, [20, 45], [80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftGlow = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightDim = interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        opacity: titleOpacity, transform: `translateY(${titleSlide}px)`,
      }}>
        <p style={headline(52, WHITE)}>YOUR BRAIN</p>
        <p style={headline(52, ACCENT)}>ON BROKE</p>
      </div>

      {/* Brain SVG — split in half */}
      <svg width="480" height="340" viewBox="0 0 480 340" style={{ position: 'absolute', top: 280, left: 300 }}>
        {/* Left brain half — glowing amber */}
        <g opacity={leftGlow}>
          <ellipse cx="195" cy="170" rx="140" ry="115" fill="#1a1000" stroke={AMBER} strokeWidth="3" />
          <path d="M195 55 Q195 170 195 285" stroke={AMBER} strokeWidth="2" fill="none" strokeDasharray="8,4" />
          {/* brain folds left */}
          <path d="M120 120 Q150 100 170 130 Q150 160 120 140 Z" fill={AMBER} opacity="0.3" />
          <path d="M100 160 Q130 145 155 170 Q130 195 100 180 Z" fill={AMBER} opacity="0.3" />
          <path d="M115 200 Q145 185 165 210 Q145 235 115 220 Z" fill={AMBER} opacity="0.3" />
          {/* Gear icon left */}
          <circle cx="150" cy="170" r="22" fill="none" stroke={AMBER} strokeWidth="3" />
          <circle cx="150" cy="170" r="10" fill={AMBER} opacity="0.6" />
          {[0,45,90,135,180,225,270,315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 150 + 22 * Math.cos(rad);
            const y1 = 170 + 22 * Math.sin(rad);
            const x2 = 150 + 30 * Math.cos(rad);
            const y2 = 170 + 30 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AMBER} strokeWidth="4" strokeLinecap="round" />;
          })}
          {/* Lightbulb left */}
          <ellipse cx="150" cy="230" rx="12" ry="16" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <path d="M142 246 Q150 258 158 246" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <line x1="146" y1="258" x2="154" y2="258" stroke={AMBER} strokeWidth="2.5" />
        </g>

        {/* Right brain half — dimmed red */}
        <g opacity={rightDim}>
          <ellipse cx="285" cy="170" rx="140" ry="115" fill="#1a0000" stroke={ACCENT} strokeWidth="3" />
          <path d="M285 55 Q285 170 285 285" stroke={ACCENT} strokeWidth="2" fill="none" strokeDasharray="8,4" />
          {/* brain folds right */}
          <path d="M360 120 Q330 100 310 130 Q330 160 360 140 Z" fill={ACCENT} opacity="0.25" />
          <path d="M380 160 Q350 145 325 170 Q350 195 380 180 Z" fill={ACCENT} opacity="0.25" />
          <path d="M365 200 Q335 185 315 210 Q335 235 365 220 Z" fill={ACCENT} opacity="0.25" />
          {/* Dollar signs scattered */}
          {[[310, 140], [340, 175], [315, 205]].map(([x, y], i) => (
            <text key={i} x={x} y={y} fontSize="22" fill={ACCENT} opacity="0.6" fontFamily="Arial" textAnchor="middle">$</text>
          ))}
          {/* Question marks */}
          {[[355, 155], [330, 210]].map(([x, y], i) => (
            <text key={i} x={x} y={y} fontSize="20" fill={ACCENT} opacity="0.5" fontFamily="Arial" textAnchor="middle">?</text>
          ))}
        </g>

        {/* Dividing line */}
        <line x1="240" y1="55" x2="240" y2="285" stroke={WHITE} strokeWidth="2" opacity="0.4" />
      </svg>

      {/* Labels */}
      <div style={{
        position: 'absolute', top: 650, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 120,
        opacity: labelOpacity,
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={headline(26, AMBER)}>NORMAL</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={headline(26, ACCENT)}>SCARCITY</p>
          <p style={headline(26, ACCENT)}>MODE</p>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute', bottom: 220, left: 60, right: 60,
        opacity: labelOpacity,
      }}>
        <p style={{ ...headline(32, WHITE), lineHeight: 1.3 }}>
          WORRYING ABOUT MONEY<br />
          <span style={{ color: ACCENT }}>MAKES YOU WORSE AT IT</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 2 ─────────────────────────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const needleAngle = interpolate(frame, [30, 90], [-80, -20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight = interpolate(frame, [60, 110], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numDisplay = interpolate(frame, [70, 120], [100, 87], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, opacity: titleIn }}>
        <p style={headline(44, BLACK)}>HARVARD</p>
        <p style={headline(44, ACCENT)}>RESEARCH FOUND:</p>
      </div>

      {/* IQ Meter — semicircle gauge */}
      <svg width="500" height="300" viewBox="0 0 500 300" style={{ position: 'absolute', top: 280, left: 290 }}>
        {/* Gauge arc */}
        <path d="M60 250 A190 190 0 0 1 440 250" fill="none" stroke="#ddd" strokeWidth="28" strokeLinecap="round" />
        <path d="M60 250 A190 190 0 0 1 440 250" fill="none" stroke={ACCENT} strokeWidth="28" strokeLinecap="round"
          strokeDasharray="596" strokeDashoffset={interpolate(frame, [30, 90], [596, 149], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />

        {/* Needle */}
        <g transform={`translate(250,250) rotate(${needleAngle})`}>
          <line x1="0" y1="0" x2="0" y2="-165" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="10" fill={BLACK} />
        </g>

        {/* IQ labels */}
        <text x="55" y="290" fontSize="22" fill="#888" fontFamily="Arial" textAnchor="middle">70</text>
        <text x="250" y="60" fontSize="22" fill="#888" fontFamily="Arial" textAnchor="middle">100</text>
        <text x="445" y="290" fontSize="22" fill="#888" fontFamily="Arial" textAnchor="middle">130</text>

        {/* Current IQ number */}
        <text x="250" y="230" fontSize="72" fill={ACCENT} fontFamily='"Arial Black", Arial' textAnchor="middle" fontWeight="900">
          {Math.floor(numDisplay)}
        </text>
        <text x="250" y="275" fontSize="22" fill="#555" fontFamily="Arial" textAnchor="middle">IQ POINTS</text>
      </svg>

      {/* Stress bar */}
      <div style={{ position: 'absolute', top: 340, left: 80, width: 160 }}>
        <p style={{ ...headline(20, '#555'), marginBottom: 10 }}>STRESS LEVEL</p>
        <div style={{ width: 50, height: 200, background: '#ddd', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: barHeight, background: ACCENT, borderRadius: 8,
          }} />
        </div>
      </div>

      {/* -13 badge */}
      <div style={{
        position: 'absolute', top: 620, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        transform: `scale(${badgeIn})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 20, padding: '20px 50px',
        }}>
          <p style={headline(72, WHITE)}>-13</p>
          <p style={headline(28, WHITE)}>IQ POINTS</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 180, left: 60, right: 60, opacity: titleIn }}>
        <p style={{ ...headline(28, BLACK), lineHeight: 1.4 }}>
          LIKE RUNNING ON<br /><span style={{ color: ACCENT }}>ZERO SLEEP — EVERY DAY</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 3 ─────────────────────────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleIn = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1W = interpolate(frame, [30, 75], [0, 330], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [55, 95], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3W = interpolate(frame, [80, 115], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lab1 = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lab2 = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lab3 = interpolate(frame, [115, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const noteIn = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, opacity: titleIn }}>
        <p style={headline(44, WHITE)}>MENTAL</p>
        <p style={headline(44, ACCENT)}>BANDWIDTH</p>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 80, right: 80 }}>
        <div style={{ width: 550, height: 60, background: '#2a2a2a', borderRadius: 12, overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: bar1W, height: '100%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {bar1W > 80 && <span style={{ ...headline(18, WHITE), letterSpacing: '0.05em' }}>BILL WORRY</span>}
          </div>
          <div style={{ width: bar2W, height: '100%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {bar2W > 50 && <span style={{ ...headline(14, WHITE), letterSpacing: '0.05em' }}>STRESS</span>}
          </div>
          <div style={{ width: bar3W, height: '100%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {bar3W > 50 && <span style={{ ...headline(13, WHITE), letterSpacing: '0.02em' }}>SMART</span>}
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 16, gap: 0 }}>
          <div style={{ width: 330, opacity: lab1, textAlign: 'center' }}>
            <p style={headline(22, ACCENT)}>60%</p>
          </div>
          <div style={{ width: 110, opacity: lab2, textAlign: 'center' }}>
            <p style={headline(22, '#F97316')}>20%</p>
          </div>
          <div style={{ width: 110, opacity: lab3, textAlign: 'center' }}>
            <p style={headline(22, GREEN)}>20%</p>
          </div>
        </div>
      </div>

      <svg width="220" height="180" viewBox="0 0 220 180" style={{ position: 'absolute', top: 430, left: 215, opacity: titleIn }}>
        <ellipse cx="110" cy="90" rx="95" ry="75" fill="none" stroke={WHITE} strokeWidth="3" opacity="0.3" />
        <path d="M110 15 Q110 90 110 165" stroke={WHITE} strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.3" />
        <path d="M55 65 Q80 50 95 75 Q80 100 55 85 Z" fill={ACCENT} opacity="0.4" />
        <path d="M45 100 Q70 88 88 108 Q70 128 45 115 Z" fill={ACCENT} opacity="0.4" />
        <path d="M165 65 Q140 50 125 75 Q140 100 165 85 Z" fill={GREEN} opacity="0.2" />
        <path d="M175 100 Q150 88 132 108 Q150 128 175 115 Z" fill={GREEN} opacity="0.2" />
      </svg>

      <div style={{ position: 'absolute', bottom: 200, left: 60, right: 60, opacity: noteIn }}>
        <p style={{ ...headline(30, WHITE), lineHeight: 1.4 }}>
          NOT LAZINESS —<br /><span style={{ color: ACCENT }}>IT'S BIOLOGY</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 4 ─────────────────────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyIn = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 100 } });
  const crackOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon1In = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 110 } });
  const icon2In = spring({ frame: frame - 115, fps, config: { damping: 14, stiffness: 110 } });
  const icon3In = spring({ frame: frame - 140, fps, config: { damping: 14, stiffness: 110 } });
  const amountIn = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, opacity: titleIn }}>
        <p style={headline(42, BLACK)}>THE REAL</p>
        <p style={headline(42, ACCENT)}>COST OF STRESS</p>
      </div>

      <svg width="300" height="260" viewBox="0 0 300 260"
        style={{ position: 'absolute', top: 260, left: 390, transform: `scale(${piggyIn})`, transformOrigin: 'center' }}>
        <ellipse cx="145" cy="155" rx="110" ry="90" fill="#F9A8D4" stroke="#E879A0" strokeWidth="3" />
        <circle cx="245" cy="125" r="55" fill="#F9A8D4" stroke="#E879A0" strokeWidth="3" />
        <ellipse cx="268" cy="138" rx="22" ry="16" fill="#F472B6" />
        <circle cx="262" cy="136" r="5" fill="#9D174D" />
        <circle cx="274" cy="136" r="5" fill="#9D174D" />
        <circle cx="250" cy="112" r="6" fill="#9D174D" />
        <ellipse cx="237" cy="78" rx="14" ry="20" fill="#F9A8D4" stroke="#E879A0" strokeWidth="2" />
        <rect x="65" y="228" width="30" height="28" rx="8" fill="#F9A8D4" stroke="#E879A0" strokeWidth="2" />
        <rect x="108" y="232" width="30" height="24" rx="8" fill="#F9A8D4" stroke="#E879A0" strokeWidth="2" />
        <rect x="158" y="232" width="30" height="24" rx="8" fill="#F9A8D4" stroke="#E879A0" strokeWidth="2" />
        <rect x="200" y="228" width="30" height="28" rx="8" fill="#F9A8D4" stroke="#E879A0" strokeWidth="2" />
        <path d="M35 140 Q10 120 20 100 Q30 80 45 95" fill="none" stroke="#E879A0" strokeWidth="4" strokeLinecap="round" />
        <rect x="120" y="68" width="38" height="8" rx="4" fill="#9D174D" />
        <g opacity={crackOpacity}>
          <path d="M90 140 L105 125 L95 115 L115 100" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M160 160 L175 145 L165 135" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        {[0, 1, 2, 3, 4].map((i) => {
          const startFrame = 60 + i * 30;
          const coinY = interpolate(frame, [startFrame, startFrame + 40], [80, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const coinOpacity = interpolate(frame, [startFrame, startFrame + 10, startFrame + 35, startFrame + 40], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const xPos = [105, 130, 115, 145, 125][i];
          return <circle key={i} cx={xPos} cy={coinY} r="8" fill={AMBER} opacity={coinOpacity} />;
        })}
      </svg>

      <div style={{ position: 'absolute', top: 570, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50 }}>
        <div style={{ textAlign: 'center', transform: `scale(${icon1In})`, transformOrigin: 'center bottom' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke={ACCENT} strokeWidth="4" />
            <line x1="40" y1="40" x2="40" y2="18" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="40" y1="40" x2="56" y2="52" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="4" fill={ACCENT} />
          </svg>
          <p style={headline(18, BLACK)}>LATE FEES</p>
        </div>
        <div style={{ textAlign: 'center', transform: `scale(${icon2In})`, transformOrigin: 'center bottom' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path d="M15 15 L15 45 L42 72 L68 46 L40 18 Z" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinejoin="round" />
            <circle cx="28" cy="28" r="5" fill={ACCENT} />
            <line x1="35" y1="50" x2="55" y2="30" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p style={headline(18, BLACK)}>MISSED DEALS</p>
        </div>
        <div style={{ textAlign: 'center', transform: `scale(${icon3In})`, transformOrigin: 'center bottom' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="12" y="28" width="56" height="42" rx="6" fill="none" stroke={ACCENT} strokeWidth="4" />
            <path d="M28 28 Q28 14 40 14 Q52 14 52 28" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="42" x2="68" y2="42" stroke={ACCENT} strokeWidth="2.5" />
          </svg>
          <p style={headline(18, BLACK)}>IMPULSE BUYS</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 160, left: 0, right: 0, opacity: amountIn, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={headline(80, ACCENT)}>$1,800</p>
        <p style={headline(32, BLACK)}>LOST EVERY YEAR</p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 5 ─────────────────────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const node1 = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 100 } });
  const node2 = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 100 } });
  const node3 = spring({ frame: frame - 90, fps, config: { damping: 14, stiffness: 100 } });
  const node4 = spring({ frame: frame - 125, fps, config: { damping: 14, stiffness: 100 } });
  const arrow1 = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2 = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow3 = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow4 = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagIn = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const nodeStyle = (scale: number, color: string): React.CSSProperties => ({
    width: 180,
    height: 70,
    background: color,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: `scale(${scale})`,
    transformOrigin: 'center',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, opacity: titleIn }}>
        <p style={headline(44, WHITE)}>THE</p>
        <p style={headline(44, ACCENT)}>SCARCITY LOOP</p>
      </div>

      {/* Loop diagram — 4 nodes arranged in a diamond */}
      <div style={{ position: 'absolute', top: 290, left: 0, right: 0 }}>
        {/* Top node */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={nodeStyle(node1, ACCENT)}>
            <p style={headline(16, WHITE)}>FINANCIAL STRESS</p>
          </div>
        </div>
        {/* Arrow down-right */}
        <div style={{ display: 'flex', justifyContent: 'center', opacity: arrow1 }}>
          <svg width="200" height="40" viewBox="0 0 200 40">
            <line x1="60" y1="5" x2="140" y2="35" stroke={ACCENT} strokeWidth="3" opacity="0.7" />
            <polygon points="135,28 148,38 138,26" fill={ACCENT} opacity="0.7" />
          </svg>
        </div>
        {/* Middle row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 120, marginBottom: 10 }}>
          <div style={nodeStyle(node4, '#7C3AED')}>
            <p style={headline(15, WHITE)}>MORE DEBT</p>
          </div>
          <div style={nodeStyle(node2, '#DC2626')}>
            <p style={headline(13, WHITE)}>REDUCED BANDWIDTH</p>
          </div>
        </div>
        {/* Arrow down-left */}
        <div style={{ display: 'flex', justifyContent: 'center', opacity: arrow3 }}>
          <svg width="200" height="40" viewBox="0 0 200 40">
            <line x1="140" y1="5" x2="60" y2="35" stroke={ACCENT} strokeWidth="3" opacity="0.7" />
            <polygon points="65,28 52,38 62,26" fill={ACCENT} opacity="0.7" />
          </svg>
        </div>
        {/* Arrow down */}
        <div style={{ position: 'absolute', top: 70, right: 185, opacity: arrow2 }}>
          <svg width="40" height="100" viewBox="0 0 40 100">
            <line x1="20" y1="5" x2="20" y2="85" stroke={ACCENT} strokeWidth="3" opacity="0.7" />
            <polygon points="12,78 20,95 28,78" fill={ACCENT} opacity="0.7" />
          </svg>
        </div>
        {/* Bottom node */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div style={nodeStyle(node3, '#B45309')}>
            <p style={headline(14, WHITE)}>WORSE DECISIONS</p>
          </div>
        </div>
        {/* Arrow back up-left */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, opacity: arrow4 }}>
          <svg width="300" height="20" viewBox="0 0 300 20">
            <path d="M150 10 Q80 -20 20 10" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="6,3" opacity="0.6" />
            <polygon points="16,4 14,16 24,8" fill={ACCENT} opacity="0.6" />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 190, left: 60, right: 60, opacity: tagIn }}>
        <p style={{ ...headline(30, WHITE), lineHeight: 1.4 }}>
          NOT A CHARACTER FLAW —<br /><span style={{ color: ACCENT }}>A FEEDBACK LOOP</span>
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 6 ─────────────────────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneIn = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 90 } });
  const toggleMove = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkIn = spring({ frame: frame - 105, fps, config: { damping: 12, stiffness: 130 } });
  const personIn = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 100 } });
  const bulbGlow = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaIn = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const toggleBg = toggleMove > 0.5 ? GREEN : '#ccc';
  const toggleX = interpolate(toggleMove, [0, 1], [4, 34]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, opacity: titleIn }}>
        <p style={headline(40, BLACK)}>BREAK THE LOOP</p>
        <p style={headline(40, GREEN)}>WITH ONE STEP</p>
      </div>

      {/* Phone SVG */}
      <svg width="280" height="460" viewBox="0 0 280 460"
        style={{ position: 'absolute', top: 260, left: 120, transform: `scale(${phoneIn})`, transformOrigin: 'center top' }}>
        {/* Phone body */}
        <rect x="20" y="10" width="240" height="440" rx="30" fill={BG_DARK} stroke="#555" strokeWidth="3" />
        <rect x="30" y="25" width="220" height="410" rx="22" fill="#1e1e1e" />
        {/* Screen content */}
        <text x="140" y="80" fontSize="20" fill={WHITE} fontFamily="Arial" textAnchor="middle" fontWeight="bold">AUTO-PAY</text>
        <line x1="50" y1="95" x2="230" y2="95" stroke="#333" strokeWidth="1" />
        {/* Row 1 */}
        <text x="70" y="135" fontSize="17" fill={WHITE} fontFamily="Arial">Electricity</text>
        <rect x="175" y="115" width="56" height="28" rx="14" fill={toggleBg} />
        <circle cx={175 + toggleX + 10} cy="129" r="11" fill={WHITE} />
        {/* Row 2 */}
        <text x="70" y="178" fontSize="17" fill="#888" fontFamily="Arial">Internet</text>
        <rect x="175" y="158" width="56" height="28" rx="14" fill="#ccc" />
        <circle cx="189" cy="172" r="11" fill={WHITE} />
        {/* Row 3 */}
        <text x="70" y="220" fontSize="17" fill="#888" fontFamily="Arial">Phone</text>
        <rect x="175" y="200" width="56" height="28" rx="14" fill="#ccc" />
        <circle cx="189" cy="214" r="11" fill={WHITE} />
      </svg>

      {/* Checkmark */}
      <svg width="100" height="100" viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 320, left: 380, transform: `scale(${checkIn})`, transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="44" fill={GREEN} />
        <path d="M24 50 L42 68 L76 32" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Person with lightbulb */}
      <svg width="160" height="240" viewBox="0 0 160 240"
        style={{ position: 'absolute', top: 430, left: 560, transform: `scale(${personIn})`, transformOrigin: 'center bottom' }}>
        {/* Bulb glow */}
        <circle cx="80" cy="30" r="35" fill={AMBER} opacity={bulbGlow * 0.2} />
        {/* Lightbulb */}
        <ellipse cx="80" cy="30" rx="22" ry="26" fill="none" stroke={AMBER} strokeWidth="3" opacity={bulbGlow} />
        <path d="M64 56 Q80 68 96 56" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" opacity={bulbGlow} />
        <line x1="72" y1="66" x2="88" y2="66" stroke={AMBER} strokeWidth="3" strokeLinecap="round" opacity={bulbGlow} />
        <line x1="74" y1="73" x2="86" y2="73" stroke={AMBER} strokeWidth="3" strokeLinecap="round" opacity={bulbGlow} />
        {/* Person head */}
        <circle cx="80" cy="120" r="28" fill="#F4A261" />
        {/* Body */}
        <path d="M80 148 L80 210" stroke="#555" strokeWidth="10" strokeLinecap="round" />
        {/* Arms — up in victory */}
        <path d="M80 162 L45 135" stroke="#555" strokeWidth="8" strokeLinecap="round" />
        <path d="M80 162 L115 135" stroke="#555" strokeWidth="8" strokeLinecap="round" />
        {/* Legs */}
        <path d="M80 210 L58 240" stroke="#555" strokeWidth="8" strokeLinecap="round" />
        <path d="M80 210 L102 240" stroke="#555" strokeWidth="8" strokeLinecap="round" />
      </svg>

      {/* CTA */}
      <div style={{ position: 'absolute', bottom: 160, left: 50, right: 50, opacity: ctaIn }}>
        <div style={{ background: BLACK, borderRadius: 20, padding: '22px 30px' }}>
          <p style={headline(30, WHITE)}>AUTOMATE = FREE</p>
          <p style={headline(30, GREEN)}>YOUR BRAIN</p>
          <p style={{ ...headline(22, '#aaa'), marginTop: 12 }}>START WITH ONE BILL TODAY</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── COMPOSITION ─────────────────────────────────────────────────────────────
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
