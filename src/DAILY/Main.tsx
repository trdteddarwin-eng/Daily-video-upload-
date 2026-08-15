import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const RED = '#EF4444';
const GREEN = '#10B981';
const GRAY = '#888888';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

  const bigScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const subOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rawCounter = interpolate(frame, [60, 210], [1000000, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.max(0, Math.floor(rawCounter));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 140, width: '100%', textAlign: 'center' }}>
        <p style={headline(44, ACCENT)}>INHERITED WEALTH</p>
      </div>

      {/* Big 70% */}
      <div style={{ position: 'absolute', top: 260, width: '100%', textAlign: 'center' }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 280,
          color: WHITE,
          display: 'inline-block',
          transform: `scale(${bigScale})`,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>70%</span>
      </div>

      {/* "of inherited wealth gone" */}
      <div style={{ position: 'absolute', top: 660, width: '100%', textAlign: 'center', opacity: subOpacity }}>
        <p style={headline(50, RED)}>GONE IN ONE GENERATION</p>
      </div>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 820, width: '100%', textAlign: 'center', opacity: counterOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>Watching $1,000,000 disappear...</p>
        <p style={{ fontFamily: FONT, fontSize: 80, color: RED, margin: '12px 0 0', letterSpacing: '0.02em' }}>
          ${counterVal.toLocaleString()}
        </p>
      </div>

      {/* Not taxes */}
      <div style={{ position: 'absolute', bottom: 220, width: '100%', textAlign: 'center', opacity: bottomOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 38, color: GRAY, margin: 0 }}>Not because of taxes.</p>
        <p style={headline(44, ACCENT)}>Because of psychology.</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const leftBarProgress = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightFull = interpolate(frame, [30, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightShrink = interpolate(frame, [80, 195], [1, 0.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_H = 480;
  const BAR_W = 140;

  const PersonSVG: React.FC<{ color: string }> = ({ color }) => (
    <svg width="80" height="120" viewBox="0 0 80 120">
      <circle cx="40" cy="22" r="20" fill={color} />
      <ellipse cx="40" cy="92" rx="28" ry="32" fill={color} />
    </svg>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', transform: `translateY(${(1 - titleSlide) * -60}px)` }}>
        <p style={headline(40, BLACK)}>The Habit Gap</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: '8px 0 0' }}>What heirs don't inherit</p>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <PersonSVG color={GREEN} />
          <div style={{ width: BAR_W, background: '#E5E7EB', borderRadius: 8, height: BAR_H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', background: GREEN, height: `${leftBarProgress * 100}%`, borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, textAlign: 'center', margin: 0, maxWidth: 200 }}>BUILDER</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: GRAY, textAlign: 'center', margin: 0 }}>30 yrs of habits</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <PersonSVG color={RED} />
          <div style={{ width: BAR_W, background: '#E5E7EB', borderRadius: 8, height: BAR_H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', background: RED, height: `${Math.min(rightFull, rightShrink) * 100}%`, borderRadius: 8 }} />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 28, color: RED, textAlign: 'center', margin: 0, maxWidth: 200 }}>HEIR</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: GRAY, textAlign: 'center', margin: 0 }}>Inherited the balance</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 180, width: '100%', textAlign: 'center', opacity: labelOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: BLACK, margin: 0 }}>Habits aren't inherited.</p>
        <p style={headline(40, ACCENT)}>Only the balance is.</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const carOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carScale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 90 } });
  const vacOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vacScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14, stiffness: 90 } });
  const counterVal = Math.max(0, Math.floor(interpolate(frame, [20, 210], [1000000, 150000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const bottomOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 100, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, margin: 0 }}>Inheritance remaining</p>
        <p style={{ fontFamily: FONT, fontSize: 72, color: RED, margin: '8px 0 0', letterSpacing: '0.02em' }}>
          ${counterVal.toLocaleString()}
        </p>
      </div>

      <div style={{ position: 'absolute', top: 310, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
        <p style={headline(44, ACCENT)}>Year One: Lifestyle Inflation</p>
      </div>

      <div style={{ position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, transform: `scale(${houseScale})` }}>
          <svg width="150" height="150" viewBox="0 0 150 150">
            <polygon points="75,10 5,75 145,75" fill={ACCENT} />
            <rect x="22" y="75" width="106" height="68" fill={WHITE} rx="4" />
            <rect x="60" y="100" width="30" height="43" fill={ACCENT} rx="3" />
            <rect x="30" y="85" width="28" height="22" fill="#93C5FD" rx="3" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>BIGGER HOUSE</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: RED, margin: 0 }}>-$280K</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: carOpacity, transform: `scale(${carScale})` }}>
          <svg width="170" height="95" viewBox="0 0 170 95">
            <rect x="8" y="42" width="154" height="38" fill={ACCENT} rx="8" />
            <polygon points="38,42 48,8 122,8 137,42" fill={WHITE} />
            <polygon points="53,39 60,13 110,13 120,39" fill="#93C5FD" />
            <circle cx="42" cy="83" r="14" fill={BG_DARK} />
            <circle cx="42" cy="83" r="7" fill={GRAY} />
            <circle cx="128" cy="83" r="14" fill={BG_DARK} />
            <circle cx="128" cy="83" r="7" fill={GRAY} />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>LUXURY CAR</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: RED, margin: 0 }}>-$95K</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: vacOpacity, transform: `scale(${vacScale})` }}>
          <svg width="120" height="150" viewBox="0 0 120 150">
            <path d="M42,18 Q42,4 60,4 Q78,4 78,18" fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" />
            <rect x="8" y="18" width="104" height="110" fill={ACCENT} rx="12" />
            <rect x="8" y="64" width="104" height="9" fill={WHITE} opacity={0.35} />
            <rect x="48" y="13" width="24" height="14" fill={WHITE} rx="3" />
            <text x="28" y="55" fontSize="22" fill={WHITE}>✈</text>
            <text x="55" y="100" fontSize="20" fill={WHITE}>☀</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>VACATIONS</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: RED, margin: 0 }}>-$47K</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 180, width: '100%', textAlign: 'center', opacity: bottomOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>All before understanding what they have.</p>
        <p style={headline(38, ACCENT)}>And it only gets worse.</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const gen1Opacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gen2Opacity = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gen3Opacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Piggy bank SVG at different fill levels
  const PiggyBank: React.FC<{ fillPct: number; label: string; pct: string; cracked?: boolean }> = ({ fillPct, label, pct, cracked }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Body */}
        <ellipse cx="78" cy="95" rx="60" ry="52" fill={fillPct > 0.5 ? ACCENT : fillPct > 0.1 ? '#D97706' : '#6B7280'} />
        {/* Fill indicator (darker region at bottom) */}
        <clipPath id={`clip-${label}`}>
          <rect x="18" y={95 + 52 - fillPct * 104} width="120" height={fillPct * 104} />
        </clipPath>
        <ellipse cx="78" cy="95" rx="60" ry="52" fill={fillPct > 0.5 ? '#92400E' : '#374151'} clipPath={`url(#clip-${label})`} />
        {/* Snout */}
        <ellipse cx="130" cy="100" rx="16" ry="12" fill={fillPct > 0.5 ? '#D97706' : '#4B5563'} />
        <circle cx="125" cy="98" r="3" fill={BG_DARK} />
        <circle cx="135" cy="98" r="3" fill={BG_DARK} />
        {/* Ear */}
        <ellipse cx="62" cy="50" rx="14" ry="10" fill={fillPct > 0.5 ? '#D97706' : '#4B5563'} />
        {/* Coin slot */}
        <rect x="70" y="43" width="22" height="5" fill={BG_DARK} rx="2" />
        {/* Eye */}
        <circle cx="100" cy="78" r="5" fill={BG_DARK} />
        {/* Legs */}
        <rect x="35" y="138" width="18" height="20" fill={fillPct > 0.5 ? '#D97706' : '#4B5563'} rx="4" />
        <rect x="58" y="140" width="18" height="18" fill={fillPct > 0.5 ? '#D97706' : '#4B5563'} rx="4" />
        <rect x="88" y="140" width="18" height="18" fill={fillPct > 0.5 ? '#D97706' : '#4B5563'} rx="4" />
        {/* Crack if empty */}
        {cracked && <polyline points="90,55 85,75 95,90 88,110" fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" />}
      </svg>
      <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, textAlign: 'center' }}>{label}</p>
      <p style={{ fontFamily: FONT, fontSize: 40, color: fillPct > 0.5 ? ACCENT : fillPct > 0.1 ? '#D97706' : RED, margin: 0 }}>{pct}</p>
    </div>
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', transform: `scale(${titleScale})` }}>
        <p style={headline(44, WHITE)}>The 3-Generation Rule</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, margin: '8px 0 0' }}>5,000 wealthy families tracked</p>
      </div>

      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ opacity: gen1Opacity }}>
          <PiggyBank fillPct={1} label="GEN 1" pct="100%" />
        </div>
        <div style={{ opacity: gen2Opacity }}>
          <PiggyBank fillPct={0.3} label="GEN 2" pct="30%" />
        </div>
        <div style={{ opacity: gen3Opacity }}>
          <PiggyBank fillPct={0.05} label="GEN 3" pct="10%" cracked />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 200, width: '100%', textAlign: 'center', opacity: statOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: GRAY, margin: 0 }}>90% of fortunes gone by</p>
        <p style={headline(52, RED)}>the third generation</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '10px 0 0' }}>That's not bad luck. That's a pattern.</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const bigNumScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 90 } });
  const arrowOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProgress = interpolate(frame, [50, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crackOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Person silhouette
  const OlderPerson: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="-70" r="28" fill={ACCENT} />
      <rect x="-22" y="-42" width="44" height="55" fill={ACCENT} rx="6" />
      <rect x="-18" y="13" width="16" height="35" fill={ACCENT} rx="4" />
      <rect x="2" y="13" width="16" height="35" fill={ACCENT} rx="4" />
      {/* Cane */}
      <line x1="25" y1="-20" x2="35" y2="48" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
    </g>
  );

  const YoungerPerson: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="-70" r="28" fill={GREEN} />
      <rect x="-22" y="-42" width="44" height="55" fill={GREEN} rx="6" />
      <rect x="-18" y="13" width="16" height="35" fill={GREEN} rx="4" />
      <rect x="2" y="13" width="16" height="35" fill={GREEN} rx="4" />
    </g>
  );

  const arrowEndX = 540 + arrowProgress * 340;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, width: '100%', textAlign: 'center', transform: `scale(${titleScale})` }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>The Great Wealth Transfer</p>
        <p style={{ fontFamily: FONT, fontSize: 100, color: ACCENT, letterSpacing: '-0.02em', margin: '4px 0', lineHeight: 1, transform: `scale(${bigNumScale})`, display: 'inline-block' }}>$84T</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, margin: 0 }}>moving between generations now</p>
      </div>

      {/* Transfer arrow scene */}
      <div style={{ position: 'absolute', top: 520, left: 0, right: 0, opacity: arrowOpacity }}>
        <svg width="1080" height="400" viewBox="0 0 1080 400">
          <OlderPerson x="200" y="200" />
          <YoungerPerson x="870" y="200" />
          {/* Arrow */}
          <line x1="260" y1="200" x2={arrowEndX} y2="200" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
          <polygon points={`${arrowEndX},185 ${arrowEndX + 28},200 ${arrowEndX},215`} fill={ACCENT} />
          {/* Money bags on arrow */}
          <text x="490" y="185" fontSize="48" textAnchor="middle" fill={ACCENT}>💰</text>
          {/* Crack through arrow */}
          <g opacity={crackOpacity}>
            <polyline points="530,180 520,200 535,220 525,240" stroke={RED} strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 200, width: '100%', textAlign: 'center', opacity: statOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: BLACK, margin: 0 }}>Without the right habits,</p>
        <p style={headline(42, RED)}>Most of it won't survive.</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const leftPathProgress = interpolate(frame, [30, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPathProgress = interpolate(frame, [30, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const followOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Growing chart for "habits" path
  const chartH = leftPathProgress * 180;
  const chartY = 360 - chartH;

  // Declining chart for "windfall" path
  const declineH = rightPathProgress * 180;
  const declineY = 180;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, width: '100%', textAlign: 'center', transform: `translateY(${(1 - titleSlide) * -50}px)` }}>
        <p style={headline(44, BLACK)}>The Money Follows</p>
        <p style={headline(44, ACCENT)}>The Mindset</p>
      </div>

      {/* Two paths SVG */}
      <div style={{ position: 'absolute', top: 280, left: 60, right: 60 }}>
        <svg width="960" height="520" viewBox="0 0 960 520">
          {/* Fork point — person */}
          <g transform={`translate(480,260) scale(${personScale})`}>
            <circle cx="0" cy="-80" r="32" fill={ACCENT} />
            <rect x="-26" y="-48" width="52" height="65" fill={ACCENT} rx="8" />
            <rect x="-22" y="17" width="20" height="42" fill={ACCENT} rx="5" />
            <rect x="2" y="17" width="20" height="42" fill={ACCENT} rx="5" />
          </g>

          {/* Left path — HABITS */}
          <line x1="480" y1="260" x2={480 - leftPathProgress * 320} y2={260 - leftPathProgress * 120} stroke={GREEN} strokeWidth="8" strokeLinecap="round" opacity={leftPathProgress} />
          {/* Growing chart on left */}
          <g opacity={leftPathProgress}>
            {[0, 1, 2, 3].map((i) => {
              const bx = 80 + i * 60;
              const bh = (i + 1) * 35 * Math.min(leftPathProgress, 1);
              return <rect key={i} x={bx} y={420 - bh} width={40} height={bh} fill={GREEN} rx={4} />;
            })}
            <text x="160" y="460" fontSize="28" fill={GREEN} textAnchor="middle" fontFamily={FONT}>HABITS</text>
            <text x="160" y="492" fontSize="26" fill={GREEN} textAnchor="middle" fontFamily={FONT_BODY}>+Wealth</text>
          </g>

          {/* Right path — WINDFALL ONLY */}
          <line x1="480" y1="260" x2={480 + rightPathProgress * 320} y2={260 + rightPathProgress * 120} stroke={RED} strokeWidth="8" strokeLinecap="round" opacity={rightPathProgress} />
          {/* Declining chart on right */}
          <g opacity={rightPathProgress}>
            {[0, 1, 2, 3].map((i) => {
              const bx = 680 + i * 60;
              const bh = Math.max(4, (4 - i) * 35 * Math.min(rightPathProgress, 1));
              return <rect key={i} x={bx} y={420 - bh} width={40} height={bh} fill={RED} rx={4} />;
            })}
            <text x="800" y="460" fontSize="22" fill={RED} textAnchor="middle" fontFamily={FONT}>WINDFALL</text>
            <text x="800" y="492" fontSize="22" fill={RED} textAnchor="middle" fontFamily={FONT}>ONLY → $0</text>
          </g>
        </svg>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', bottom: 260, width: '100%', textAlign: 'center', opacity: ctaOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: BLACK, margin: 0 }}>Whether you build it or inherit it —</p>
        <p style={headline(40, ACCENT)}>Habits beat windfalls. Every time.</p>
      </div>

      {/* Follow prompt */}
      <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center', opacity: followOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 38, color: BLACK, letterSpacing: '0.1em', margin: 0 }}>
          FOLLOW for the mindset shift ↑
        </p>
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
