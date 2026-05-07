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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENES ────────────────────────────────────────────────────────────────────
// Scene 1: Credit card with rewards badge + coins + "23% MORE"
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [5, 28], [-80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 }, durationInFrames: 40 });

  const badgeScale = spring({ frame: Math.max(0, frame - 50), fps, from: 0, to: 1, config: { damping: 10, stiffness: 200 }, durationInFrames: 25 });

  const statOp = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statY = interpolate(frame, [80, 105], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinCount = Math.max(0, Math.floor(5));
  const coinOffsets = [0, 60, 120, 180, 240];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 110, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, ACCENT)}>REWARDS CARD</p>
        <p style={{ ...headline(38, WHITE), marginTop: 8 }}>TRAP</p>
      </div>

      {/* Credit Card SVG */}
      <div style={{
        position: 'absolute', top: 320, left: '50%',
        transform: `translateX(-50%) scale(${cardScale})`,
        transformOrigin: 'center center',
      }}>
        <svg width="480" height="300" viewBox="0 0 480 300">
          {/* Card body */}
          <rect x="4" y="4" width="472" height="292" rx="28" ry="28" fill="#1E293B" stroke={ACCENT} strokeWidth="3" />
          {/* Magnetic stripe top area */}
          <rect x="4" y="60" width="472" height="48" fill="#0F172A" />
          {/* Chip */}
          <rect x="36" y="110" width="60" height="46" rx="8" fill="#F59E0B" />
          <line x1="66" y1="110" x2="66" y2="156" stroke="#B45309" strokeWidth="2" />
          <line x1="36" y1="133" x2="96" y2="133" stroke="#B45309" strokeWidth="2" />
          {/* Card number dots */}
          {[0,1,2,3].map(g => (
            [0,1,2,3].map(d => (
              <circle key={`${g}-${d}`} cx={130 + g * 90 + d * 18} cy={145} r={5} fill={WHITE} opacity={0.6} />
            ))
          ))}
          {/* Cardholder line */}
          <rect x="36" y="210" width="160" height="12" rx="6" fill={WHITE} opacity={0.3} />
          <rect x="36" y="232" width="100" height="10" rx="5" fill={WHITE} opacity={0.2} />
          {/* Contactless symbol */}
          <path d="M400 190 Q420 170 400 150" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M415 197 Q445 170 415 143" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M430 204 Q470 170 430 136" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Star badge */}
      <div style={{
        position: 'absolute', top: 360, left: '50%',
        transform: `translate(100px, -30px) scale(${badgeScale})`,
        transformOrigin: 'center center',
      }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="52" fill={ACCENT} />
          <polygon points="55,15 64,42 93,42 70,58 79,85 55,69 31,85 40,58 17,42 46,42" fill={WHITE} />
        </svg>
      </div>

      {/* Coins arcing up */}
      {coinOffsets.slice(0, coinCount).map((offset, i) => {
        const coinStart = 55 + i * 8;
        const coinOp = interpolate(frame, [coinStart, coinStart + 15, coinStart + 40], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const coinY = interpolate(frame, [coinStart, coinStart + 40], [650, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const coinX = 460 + offset - i * 22;
        return (
          <div key={i} style={{ position: 'absolute', top: coinY, left: coinX, opacity: coinOp }}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLACK}>$</text>
            </svg>
          </div>
        );
      })}

      {/* 23% MORE stat */}
      <div style={{
        position: 'absolute', bottom: 200, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: statOp, transform: `translateY(${statY}px)`,
      }}>
        <p style={headline(96, ACCENT)}>23% MORE</p>
        <p style={{ ...headline(34, WHITE), marginTop: 6 }}>SPENDING WITH REWARDS CARDS</p>
      </div>
    </FadeScene>
  );
};

// Scene 2: Two price tags — cash $21 vs card $42
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 14, stiffness: 130 }, durationInFrames: 30 });
  const rightScale = spring({ frame: Math.max(0, frame - 45), fps, from: 0, to: 1, config: { damping: 14, stiffness: 130 }, durationInFrames: 30 });

  const vsOp = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const studyOp = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={headline(48, BLACK)}>MIT STUDY</p>
        <p style={{ ...headline(32, '#555'), marginTop: 8 }}>SAME ITEM, DIFFERENT PRICE</p>
      </div>

      {/* Left tag — CASH */}
      <div style={{
        position: 'absolute', top: 340, left: 80,
        transform: `scale(${leftScale})`, transformOrigin: 'center center',
      }}>
        <svg width="280" height="340" viewBox="0 0 280 340">
          {/* Dollar bill icon */}
          <rect x="20" y="10" width="240" height="120" rx="10" fill="#10B981" />
          <rect x="35" y="25" width="210" height="90" rx="6" fill="#0D9268" />
          <text x="140" y="82" textAnchor="middle" fontSize="52" fontWeight="bold" fill={WHITE}>$</text>
          {/* Price tag shape */}
          <path d="M20,160 L260,160 L260,310 L140,340 L20,310 Z" fill={WHITE} stroke="#10B981" strokeWidth="4" />
          <circle cx="140" cy="175" r="12" fill="#10B981" />
          <text x="140" y="265" textAnchor="middle" fontSize="72" fontWeight="bold" fill={BLACK}>$21</text>
          <text x="140" y="305" textAnchor="middle" fontSize="26" fill="#555">WITH CASH</text>
        </svg>
      </div>

      {/* VS */}
      <div style={{
        position: 'absolute', top: 490, left: '50%',
        transform: 'translateX(-50%)',
        opacity: vsOp,
      }}>
        <p style={headline(56, BLACK)}>VS</p>
      </div>

      {/* Right tag — CARD */}
      <div style={{
        position: 'absolute', top: 340, right: 80,
        transform: `scale(${rightScale})`, transformOrigin: 'center center',
      }}>
        <svg width="280" height="340" viewBox="0 0 280 340">
          {/* Card icon */}
          <rect x="20" y="10" width="240" height="120" rx="10" fill="#EF4444" />
          <rect x="20" y="45" width="240" height="28" fill="#B91C1C" />
          <rect x="36" y="90" width="50" height="30" rx="4" fill="#FCD34D" />
          {/* Price tag shape */}
          <path d="M20,160 L260,160 L260,310 L140,340 L20,310 Z" fill={WHITE} stroke="#EF4444" strokeWidth="4" />
          <circle cx="140" cy="175" r="12" fill="#EF4444" />
          <text x="140" y="265" textAnchor="middle" fontSize="72" fontWeight="bold" fill="#EF4444">$42</text>
          <text x="140" y="305" textAnchor="middle" fontSize="26" fill="#555">WITH CARD</text>
        </svg>
      </div>

      {/* Study note */}
      <div style={{
        position: 'absolute', bottom: 170, left: 60, right: 60,
        background: BLACK, borderRadius: 18, padding: '20px 24px',
        opacity: studyOp, textAlign: 'center',
      }}>
        <p style={headline(28, ACCENT)}>PAIN OF PAYING SHUTS OFF</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, marginTop: 8, letterSpacing: '0.05em' }}>Your brain stops tracking cost</p>
      </div>
    </FadeScene>
  );
};

// Scene 3: Balance scale — $167 earned vs $2,400 extra
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const scaleAppear = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 }, durationInFrames: 40 });

  // Scale tips right over time
  const tiltAngle = interpolate(frame, [60, 130], [0, 22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftPanY = interpolate(frame, [60, 130], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPanY = interpolate(frame, [60, 130], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={headline(46, WHITE)}>THE REAL MATH</p>
        <p style={{ ...headline(30, ACCENT), marginTop: 8 }}>REWARDS EARNED VS EXTRA SPENDING</p>
      </div>

      {/* Balance scale */}
      <div style={{
        position: 'absolute', top: 340, left: '50%',
        transform: `translateX(-50%) scale(${scaleAppear})`,
        transformOrigin: 'center center',
      }}>
        <svg width="520" height="420" viewBox="0 0 520 420" style={{ transform: `rotate(${tiltAngle}deg)`, transformOrigin: '260px 120px' }}>
          {/* Fulcrum triangle */}
          <polygon points="260,200 230,290 290,290" fill="#555" />
          <rect x="220" y="288" width="80" height="18" rx="6" fill="#444" />
          {/* Beam */}
          <rect x="20" y="112" width="480" height="16" rx="8" fill="#888" />
          {/* Left pan (small $167) */}
          <g transform={`translate(0, ${leftPanY})`}>
            <line x1="60" y1="128" x2="60" y2="175" stroke="#888" strokeWidth="4" />
            <line x1="140" y1="128" x2="140" y2="175" stroke="#888" strokeWidth="4" />
            <path d="M30,175 Q100,185 170,175" stroke="#888" strokeWidth="4" fill="none" />
            {/* Small coin stack */}
            {[0,1,2].map(i => (
              <ellipse key={i} cx="100" cy={168 - i * 12} rx="38" ry="10" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            ))}
          </g>
          {/* Right pan (large $2400) */}
          <g transform={`translate(0, ${rightPanY})`}>
            <line x1="380" y1="128" x2="380" y2="175" stroke="#888" strokeWidth="4" />
            <line x1="460" y1="128" x2="460" y2="175" stroke="#888" strokeWidth="4" />
            <path d="M350,175 Q420,185 490,175" stroke="#888" strokeWidth="4" fill="none" />
            {/* Tall money stack */}
            {[0,1,2,3,4,5,6].map(i => (
              <ellipse key={i} cx="420" cy={168 - i * 14} rx="50" ry="12" fill={ACCENT} stroke="#059669" strokeWidth="1.5" />
            ))}
          </g>
        </svg>
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute', bottom: 220, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around',
        opacity: labelOp,
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, '#F59E0B')}>$167</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.1em' }}>EARNED</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={headline(52, '#EF4444')}>$2,400</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.1em' }}>EXTRA SPENT</p>
        </div>
      </div>

      {/* Net loss banner */}
      <div style={{
        position: 'absolute', bottom: 120, left: 60, right: 60,
        background: '#EF4444', borderRadius: 14, padding: '16px',
        opacity: labelOp, textAlign: 'center',
      }}>
        <p style={headline(36, WHITE)}>NET LOSS: -$2,233/YEAR</p>
      </div>
    </FadeScene>
  );
};

// Scene 4: Phone notification + dopamine loop cycle
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, config: { damping: 13, stiffness: 110 }, durationInFrames: 35 });
  const notifScale = spring({ frame: Math.max(0, frame - 55), fps, from: 0, to: 1, config: { damping: 8, stiffness: 220 }, durationInFrames: 22 });

  const loopOp = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const loopRot = interpolate(frame, [115, dur - 20], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const brainPulse = interpolate(frame, [100, 120, 140, 160, 180], [1, 1.15, 1, 1.15, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={headline(50, BLACK)}>THE DOPAMINE</p>
        <p style={{ ...headline(50, '#EF4444'), marginTop: 4 }}>TRAP</p>
      </div>

      {/* Phone */}
      <div style={{
        position: 'absolute', top: 290, left: '50%',
        transform: `translateX(-50%) scale(${phoneScale})`,
        transformOrigin: 'center top',
      }}>
        <svg width="220" height="380" viewBox="0 0 220 380">
          <rect x="4" y="4" width="212" height="372" rx="32" ry="32" fill="#1E293B" stroke="#334155" strokeWidth="3" />
          <rect x="18" y="50" width="184" height="280" rx="8" fill="#0F172A" />
          {/* Screen content */}
          <rect x="30" y="65" width="160" height="90" rx="8" fill="#1E293B" />
          <text x="110" y="105" textAnchor="middle" fontSize="28" fill="#94A3B8">Visa Rewards</text>
          <text x="110" y="135" textAnchor="middle" fontSize="22" fill={WHITE}>Balance: $847.23</text>
          {/* Home button area */}
          <rect x="80" y="348" width="60" height="8" rx="4" fill="#334155" />
          {/* Camera */}
          <circle cx="110" cy="26" r="8" fill="#334155" />
          <circle cx="110" cy="26" r="4" fill="#1E293B" />
        </svg>
      </div>

      {/* Notification popup */}
      <div style={{
        position: 'absolute', top: 310, left: '50%',
        transform: `translate(-10px, -80px) scale(${notifScale})`,
        transformOrigin: 'left top',
        background: ACCENT, borderRadius: 16, padding: '14px 20px',
        width: 260, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>★ You earned 50 pts!</p>
        <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '4px 0 0', opacity: 0.8 }}>Keep spending to level up</p>
      </div>

      {/* Loop arrows */}
      <div style={{
        position: 'absolute', bottom: 180, left: '50%',
        transform: `translateX(-50%)`,
        opacity: loopOp,
      }}>
        <svg width="400" height="160" viewBox="0 0 400 160">
          {/* Circular arrow */}
          <path d="M 50,80 A 150,55 0 0 1 350,80" stroke={ACCENT} strokeWidth="5" fill="none" strokeDasharray="8 4" markerEnd="url(#arr)" />
          <path d="M 350,80 A 150,55 0 0 1 50,80" stroke="#EF4444" strokeWidth="5" fill="none" strokeDasharray="8 4" />
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={ACCENT} />
            </marker>
          </defs>
          <text x="50" y="42" textAnchor="middle" fontSize="20" fontWeight="bold" fill={ACCENT} fontFamily={FONT}>REWARD</text>
          <text x="350" y="42" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#EF4444" fontFamily={FONT}>SPEND</text>
          <circle cx="200" cy="80" r="28" fill={BLACK} style={{ transform: `rotate(${loopRot}deg)`, transformOrigin: '200px 80px' }} />
          <text x="200" y="86" textAnchor="middle" fontSize="16" fill={WHITE} fontFamily={FONT}>🔁</text>
        </svg>
      </div>

      {/* Brain icon with pulse */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%',
        transform: `translateX(-50%) scale(${brainPulse})`,
        opacity: loopOp,
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <ellipse cx="40" cy="42" rx="34" ry="28" fill="none" stroke="#EF4444" strokeWidth="4" />
          <path d="M40,14 Q28,10 24,22 Q14,20 16,34 Q10,38 16,46" stroke="#EF4444" strokeWidth="3" fill="none" />
          <path d="M40,14 Q52,10 56,22 Q66,20 64,34 Q70,38 64,46" stroke="#EF4444" strokeWidth="3" fill="none" />
          <line x1="40" y1="14" x2="40" y2="70" stroke="#EF4444" strokeWidth="2.5" />
        </svg>
      </div>
    </FadeScene>
  );
};

// Scene 5: Checklist — fixed bills OK, impulse purchases X
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'RENT', good: true, delay: 20 },
    { label: 'ELECTRIC', good: true, delay: 42 },
    { label: 'INTERNET', good: true, delay: 64 },
    { label: 'GROCERIES', good: false, delay: 95 },
    { label: 'SHOPPING', good: false, delay: 117 },
  ];

  const cardOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardY = interpolate(frame, [140, 165], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={headline(46, ACCENT)}>THE FIX</p>
        <p style={{ ...headline(30, WHITE), marginTop: 8 }}>USE CARD ONLY FOR:</p>
      </div>

      {/* Checklist */}
      <div style={{ position: 'absolute', top: 280, left: 80, right: 80 }}>
        {items.map((item, i) => {
          const itemOp = interpolate(frame, [item.delay, item.delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const itemX = interpolate(frame, [item.delay, item.delay + 20], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', marginBottom: 32,
              opacity: itemOp, transform: `translateX(${itemX}px)`,
            }}>
              <svg width="52" height="52" viewBox="0 0 52 52" style={{ flexShrink: 0 }}>
                <circle cx="26" cy="26" r="24" fill={item.good ? ACCENT : '#EF4444'} />
                {item.good
                  ? <path d="M14,26 L22,34 L38,18" stroke={WHITE} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  : <path d="M16,16 L36,36 M36,16 L16,36" stroke={WHITE} strokeWidth="5" strokeLinecap="round" />
                }
              </svg>
              <span style={{
                fontFamily: FONT, fontSize: 44, letterSpacing: '0.12em',
                color: item.good ? ACCENT : '#EF4444',
                marginLeft: 20,
                textDecoration: item.good ? 'none' : 'line-through',
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Card + lock icon */}
      <div style={{
        position: 'absolute', bottom: 120, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24,
        opacity: cardOp, transform: `translateY(${cardY}px)`,
      }}>
        <svg width="90" height="56" viewBox="0 0 90 56">
          <rect x="2" y="2" width="86" height="52" rx="10" fill="#1E293B" stroke={ACCENT} strokeWidth="3" />
          <rect x="2" y="16" width="86" height="14" fill="#0F172A" />
          <rect x="12" y="34" width="30" height="8" rx="3" fill="#F59E0B" opacity={0.7} />
        </svg>
        <svg width="52" height="60" viewBox="0 0 52 60">
          <rect x="8" y="26" width="36" height="30" rx="6" fill={ACCENT} />
          <path d="M14,26 L14,18 Q14,6 26,6 Q38,6 38,18 L38,26" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="26" cy="40" r="5" fill={BLACK} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, letterSpacing: '0.1em' }}>LOCKED TO BILLS</p>
      </div>
    </FadeScene>
  );
};

// Scene 6: Bank building + $189B + follow CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankScale = spring({ frame: Math.max(0, frame - 18), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 }, durationInFrames: 38 });

  const bigNumOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumScale = spring({ frame: Math.max(0, frame - 70), fps, from: 0.4, to: 1, config: { damping: 10, stiffness: 160 }, durationInFrames: 28 });

  const arrowCount = Math.max(0, Math.floor(4));
  const arrowDelays = [30, 45, 60, 75];

  const ctaOp = interpolate(frame, [140, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [140, 168], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: titleOp }}>
        <p style={headline(40, BLACK)}>CARD COMPANIES MADE</p>
      </div>

      {/* $189 BILLION */}
      <div style={{
        position: 'absolute', top: 180, left: 0, right: 0,
        textAlign: 'center',
        opacity: bigNumOp, transform: `scale(${bigNumScale})`,
        transformOrigin: 'center center',
      }}>
        <p style={headline(88, '#EF4444')}>$189B</p>
        <p style={{ ...headline(34, BLACK), marginTop: 4 }}>IN FEES LAST YEAR</p>
      </div>

      {/* Bank building */}
      <div style={{
        position: 'absolute', top: 380, left: '50%',
        transform: `translateX(-50%) scale(${bankScale})`,
        transformOrigin: 'bottom center',
      }}>
        <svg width="340" height="280" viewBox="0 0 340 280">
          {/* Building body */}
          <rect x="30" y="100" width="280" height="175" fill="#1E293B" />
          {/* Roof / pediment */}
          <polygon points="170,20 10,100 330,100" fill="#0F172A" />
          {/* Columns */}
          {[60, 105, 150, 195, 240, 285].map(x => (
            <rect key={x} x={x} y={100} width={16} height={175} rx={4} fill="#334155" />
          ))}
          {/* Windows */}
          {[55, 140, 225].map(x => (
            [115, 175, 225].map(y => (
              <rect key={`${x}-${y}`} x={x} y={y} width={30} height={30} rx={3} fill="#F59E0B" opacity={0.7} />
            ))
          ))}
          {/* Door */}
          <rect x="145" y="225" width="50" height="50" rx="4" fill="#F59E0B" opacity={0.5} />
          {/* $ sign on roof */}
          <text x="170" y="78" textAnchor="middle" fontSize="40" fontWeight="bold" fill={ACCENT}>$</text>
        </svg>
      </div>

      {/* Money arrows flowing in */}
      {arrowDelays.slice(0, arrowCount).map((delay, i) => {
        const aOp = interpolate(frame, [delay, delay + 18, delay + 50], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const aX = interpolate(frame, [delay, delay + 50], [i % 2 === 0 ? -120 : 500, 170], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const aY = 440 + i * 22;
        return (
          <div key={i} style={{ position: 'absolute', top: aY, left: aX, opacity: aOp }}>
            <svg width="44" height="26" viewBox="0 0 44 26">
              <rect x="0" y="6" width="34" height="14" rx="4" fill={ACCENT} />
              <polygon points="32,0 44,13 32,26" fill={ACCENT} />
              <text x="14" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill={BLACK}>$$$</text>
            </svg>
          </div>
        );
      })}

      {/* 2% cashback callout */}
      <div style={{
        position: 'absolute', bottom: 240, left: 60, right: 60,
        textAlign: 'center', opacity: bigNumOp,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', letterSpacing: '0.08em' }}>
          They can afford your <span style={{ color: ACCENT }}>2% cashback</span>
        </p>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 100, left: 60, right: 60,
        background: ACCENT, borderRadius: 20, padding: '22px 24px',
        opacity: ctaOp, transform: `translateY(${ctaY}px)`,
        textAlign: 'center',
      }}>
        <p style={headline(36, BLACK)}>FOLLOW FOR DAILY</p>
        <p style={{ ...headline(36, BLACK), marginTop: 6 }}>MONEY TRICKS</p>
      </div>
    </FadeScene>
  );
};

// ─── COMPOSITION ───────────────────────────────────────────────────────────────
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
